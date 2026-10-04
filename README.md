# 🌿 Giải pháp Xanh 2026 - EPR Challenge Project Dashboard

Hệ thống Quản lý Dự án & Báo cáo Tác động Môi trường (EPR & ESG) chuyên nghiệp, tích hợp **Máy chủ Đồng bộ Đa thiết bị (Render Web Service & Realtime API)**.

## 🚀 Live Demo & Deployment
- **🌐 Render Web Service (Đồng bộ thời gian thực hai chiều)**: [https://green-solutions-dashboard-swmo.onrender.com](https://green-solutions-dashboard-swmo.onrender.com)
- **🌐 GitHub Pages (Trực tiếp)**: [https://hellokhoanguyen91.github.io/green-solutions-dashboard/](https://hellokhoanguyen91.github.io/green-solutions-dashboard/)
- **⚡ Deploy lên Render (1-Click)**:
  
  [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/hellokhoAnguyen91/green-solutions-dashboard)

---

## 🔑 Thông tin Đăng nhập Quản trị viên
- **Mật khẩu quản trị (Admin Password)**: `admin123`

---

## 🌟 Tính năng Nổi bật
- **🔄 Đồng bộ Đa thiết bị & Đám mây (Live Cloud Sync)**:
  - Máy chủ Node.js trên Render đóng vai trò cơ sở dữ liệu trung tâm (`/api/data`).
  - Mọi người ở xa, máy tính khác hay điện thoại cùng truy cập vào link Render sẽ tự động cập nhật công việc, tiến độ, chi phí cho nhau theo thời gian thực mà không cần F5!
  - Hỗ trợ lưu trữ bền vững với bộ nhớ đệm `inMemoryData` + ghi file `dashboard_data.json` + `localStorage` ngoại tuyến.
- **⚡ Tối ưu hiệu năng 100%**: Sử dụng React 18 UMD tiền biên dịch (đã loại bỏ Babel runtime nặng nề), tải ngay lập tức.
- **📊 Bảng điều khiển Thời gian thực**:
  - Giám sát tiến độ tổng thể, ngân sách đã giải ngân, nhà tài trợ (INSEE, UTE...), giao dịch thu/chi.
- **📋 Quản lý Công việc & 5 Giai đoạn (Kanban / List)**:
  - Khởi động, Sơ khảo, Trải nghiệm, Chung kết, Tổng kết.
  - Phân công nhiệm vụ chi tiết và subtasks (BTC, P.QTTT, BGK, INSEE...).
- **🛡️ Quản trị Rủi ro Toàn diện**: Ma trận rủi ro phân cấp kèm phương án ứng phó.
- **💾 Lưu trữ & Sao lưu**:
  - Tự động đồng bộ Đám mây và `localStorage`.
  - Hỗ trợ xuất / nhập file dữ liệu sao lưu định dạng `.json`.

---

## 🛠️ Hướng dẫn Triển khai (Deployment)

### 1. Render.com (Khuyên dùng - Có Server Đồng bộ)
1. Đăng nhập [dashboard.render.com](https://dashboard.render.com).
2. Vào Blueprint hoặc chọn **New +** -> **Web Service**.
3. Kết nối với repository `hellokhoAnguyen91/green-solutions-dashboard`.
4. Render sẽ tự động đọc `render.yaml` (`Start Command: node server.js`, `Port: 10000`).
5. Bấm **Apply / Create Web Service**. Khi trang web hoàn tất, mọi người cùng vào link `https://green-solutions-dashboard-swmo.onrender.com` sẽ tự động đồng bộ 100%!

### 2. GitHub Pages
Trang web cũng chạy song song trên GitHub Pages tại:
```text
https://hellokhoanguyen91.github.io/green-solutions-dashboard/
```

---

## 📄 Bản quyền & Tác giả
- Phát triển bởi: **hellokhoAnguyen91**
- Dự án: **Giải pháp Xanh 2026**
