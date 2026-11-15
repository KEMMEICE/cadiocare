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

## 👥 Danh sách Tài khoản Mẫu Kiểm tra Phân quyền (RBAC Demo)

Để thầy cô và hội đồng thuận tiện kiểm tra các phân hệ chức năng tương ứng với từng vai trò tác nhân, hệ thống thiết lập sẵn 3 tài khoản mẫu sau:

### 1. Phân hệ Bệnh nhân (Patient Portal)
* **Vai trò:** `PATIENT` (Bệnh nhân ngoại trú)
* **Tên đăng nhập:** minhquantran
* **Mật khẩu:** `Lamvlog06`
* **Chức năng kiểm tra:** Cổng thông tin cá nhân, tự nhập chỉ số sinh hiệu tại nhà (cân nặng, huyết áp), theo dõi lịch sử cảnh báo quá tải dịch và xem lịch hẹn tái khám.

### 2. Phân hệ Bác sĩ / Lâm sàng (Doctor Dashboard)
* **Vai trò:** `DOCTOR` (Bác sĩ điều trị khoa Tim mạch)
* **Tên đăng nhập:** `minhquantran06`
* **Mật khẩu:** `Lamvlog06`
* **Chức năng kiểm tra:** Quản lý hồ sơ bệnh án, theo dõi chỉ số LVEF, phân độ NYHA, kiểm tra luồng tích hợp ETL (HL7/FHIR), và phê duyệt/điều chỉnh phác đồ 4 trụ cột từ AI-CDSS (*Human-in-the-Loop* với cơ chế lưu vết Audit Log)[cite: 1].

### 3. Phân hệ Quản trị hệ thống (Admin Dashboard)
* **Vai trò:** `ADMIN` (Quản trị viên hệ thống IT)[cite: 4]
* **Tên đăng nhập:** `minhquantran2006`
* **Mật khẩu:** `Lamvlog06`
* **Chức năng kiểm tra:** Quản lý danh sách tài khoản người dùng, khóa/mở khóa tài khoản, xem ma trận phân quyền RBAC toàn hệ thống, và tra cứu nhật ký kiểm toán y tế (*Audit Logs*)[cite: 1, 4].

---
