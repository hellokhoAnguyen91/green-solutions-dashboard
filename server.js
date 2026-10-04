const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 10000;
const BASE_DIR = __dirname;
const DATA_FILE = path.join(BASE_DIR, 'dashboard_data.json');
const INDEX_FILE = path.join(BASE_DIR, 'index.html');

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.htm': 'text/html; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf'
};

// In-memory cache for ultra-fast response and backup persistence
let inMemoryData = null;
try {
    if (fs.existsSync(DATA_FILE)) {
        inMemoryData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        console.log('Loaded initial dataset from disk, updatedAt:', inMemoryData.updatedAt);
    }
} catch (e) {
    console.warn('Initial data load warning:', e.message);
}

const server = http.createServer((req, res) => {
    // Enable CORS for all devices & origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Max-Age', '86400');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    let reqPath = decodeURIComponent(req.url.split('?')[0]);

    // 1. Health check & status
    if (reqPath === '/api/health' || reqPath === '/healthz') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ status: 'ok', time: Date.now() }));
        return;
    }

    // 2. Data Synchronization API
    if (reqPath === '/api/data') {
        if (req.method === 'GET') {
            if (inMemoryData) {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                });
                res.end(JSON.stringify(inMemoryData));
                return;
            }

            fs.readFile(DATA_FILE, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'application/json; charset=UTF-8' });
                    res.end(JSON.stringify({ error: 'Chưa có dữ liệu trên máy chủ' }));
                    return;
                }
                try {
                    inMemoryData = JSON.parse(data);
                } catch (e) {}
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                });
                res.end(data);
            });
            return;
        }

        if (req.method === 'POST' || req.method === 'PUT') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    const now = Date.now();
                    const payload = {
                        version: '2.0',
                        updatedAt: parsed.updatedAt || now,
                        updatedBy: parsed.updatedBy || 'Đồng bộ Render',
                        data: parsed.data || parsed
                    };

                    inMemoryData = payload;

                    // Persist to disk asynchronously
                    fs.writeFile(DATA_FILE, JSON.stringify(payload, null, 2), 'utf8', err => {
                        if (err) console.warn('Ghi disk error:', err.message);
                    });

                    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
                    res.end(JSON.stringify({ success: true, updatedAt: payload.updatedAt }));
                } catch (e) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
                    res.end(JSON.stringify({ error: 'JSON không hợp lệ: ' + e.message }));
                }
            });
            return;
        }
    }

    // 3. Serve Frontend (SPA)
    if (reqPath === '/' || reqPath === '/index.html' || reqPath === '/dashboard') {
        fs.readFile(INDEX_FILE, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
                res.end('Server Error: ' + err.message);
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end(data);
        });
        return;
    }

    // Serve other static files
    const filePath = path.join(BASE_DIR, reqPath);
    if (!filePath.startsWith(path.resolve(BASE_DIR))) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            // SPA fallback to index.html
            fs.readFile(INDEX_FILE, (err2, data2) => {
                if (err2) {
                    res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
                    res.end('Not Found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
                    res.end(data2);
                }
            });
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`Render Server is running on port ${PORT}`);
    console.log(`Data API available at: http://localhost:${PORT}/api/data`);
});
