# CADIOCARE - Hệ thống Quản lý & Giám sát Bệnh nhân Suy tim
*Đồ án Môn học / Tốt nghiệp • Bệnh viện Hữu Nghị*

---

## 📋 Giới thiệu tổng quan
**CADIOCARE** là hệ thống phần mềm hỗ trợ quản lý, theo dõi và phân tích dữ liệu lâm sàng dành cho bệnh nhân suy tim. Hệ thống cung cấp các tính năng cốt lõi:
- Quản lý hồ sơ bệnh án và lịch sử khám chữa bệnh ngoại trú.
- Tích hợp và chuẩn hóa dữ liệu từ các hệ thống viện (HIS/EMR, LIS, PACS) sang mô hình chuẩn 211 biến.
- Cảnh báo tự động các chỉ số sinh hiệu nguy cấp (huyết áp cao, nguy cơ quá tải dịch).
- Phân quyền người dùng theo mô hình bảo mật RBAC (Bác sĩ, Điều dưỡng, Quản trị viên, Bệnh nhân).

---

## 🛠️ Công nghệ sử dụng
- **Backend:** FastAPI (Python), SQLAlchemy, PostgreSQL, PyJWT, bcrypt.
- **Frontend:** React, Tailwind CSS, Lucide Icons.
- **Cơ sở dữ liệu:** PostgreSQL 17 (quản lý qua pgAdmin).

---

## 🚀 Hướng dẫn Cài đặt & Chạy Dự án

### 1. Cấu hình Cơ sở dữ liệu (Database)
1. Mở phần mềm **pgAdmin 4** và tạo một cơ sở dữ liệu mới với tên: `Cadiocare_db`.
2. Tạo bảng `users` với cấu trúc tương ứng để lưu thông tin tài khoản đăng nhập/đăng ký.

### 2. Khởi động Backend (FastAPI) và Frontend
Mở terminal tại thư mục chứa mã nguồn backend (`cadiocare-backend`), chạy các lệnh sau:
```bash
# Cài đặt các thư viện phụ thuộc cần thiết
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic bcrypt python-jose python-multipart

# Chạy server FastAPI ở chế độ phát triển
uvicorn main:app --reload

## Khởi động Frontend (React)
# Cài đặt các gói thư viện Node.js
npm install

# Khởi động ứng dụng giao diện web
npm start

