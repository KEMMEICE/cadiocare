import React, { useState } from 'react';
import { ShieldCheck, Users, Shield, FileText, LogOut, CheckCircle2, Lock, Unlock, Server } from 'lucide-react';

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<'users' | 'rbac' | 'logs'>('users');
  const adminName = localStorage.getItem('username') || 'Quản trị viên IT';

  // Danh sách tài khoản giả lập trong hệ thống
  const [usersList, setUsersList] = useState([
    { id: 1, name: 'BS.CKII Nguyễn Văn An', username: 'bs.an', role: 'DOCTOR', status: 'ACTIVE' },
    { id: 2, name: 'ĐD. Trần Thị Mai', username: 'dd.mai', role: 'NURSE', status: 'ACTIVE' },
    { id: 3, name: 'Trần Văn Mạnh', username: 'bn.manh', role: 'PATIENT', status: 'ACTIVE' },
    { id: 4, name: 'Kỹ sư Quản trị hệ thống', username: 'admin.it', role: 'ADMIN', status: 'ACTIVE' },
  ]);

  const handleToggleStatus = (id: number) => {
    setUsersList(usersList.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE' };
      }
      return u;
    }));
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header Admin */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white shadow-lg">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">CADIOCARE • Trung tâm Quản trị Hệ thống (Admin)</h1>
            <p className="text-xs text-slate-400">Xin chào, {adminName} • Phân quyền RBAC & Bảo mật</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 bg-rose-950/50 text-rose-400 hover:bg-rose-900/50 border border-rose-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Đăng xuất</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Thống kê nhanh hệ thống */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Tổng tài khoản</p>
              <h3 className="text-xl font-bold text-white mt-1">4 hoạt động</h3>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">HL7/FHIR Gateway</p>
              <h3 className="text-xl font-bold text-emerald-400 mt-1">Online (42ms)</h3>
            </div>
            <Server className="h-8 w-8 text-emerald-500" />
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Cơ chế bảo mật</p>
              <h3 className="text-xl font-bold text-purple-400 mt-1">RBAC + JWT</h3>
            </div>
            <Shield className="h-8 w-8 text-purple-500" />
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Audit Logs</p>
              <h3 className="text-xl font-bold text-amber-400 mt-1">Đang ghi vết</h3>
            </div>
            <FileText className="h-8 w-8 text-amber-500" />
          </div>
        </div>

        {/* Thanh Tabs Quản trị */}
        <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex space-x-2">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'users' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            1. Quản lý Người dùng & Cấp quyền
          </button>
          <button
            onClick={() => setActiveTab('rbac')}
            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'rbac' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            2. Ma trận Phân quyền RBAC
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'logs' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            3. Nhật ký Kiểm toán (Audit Logs)
          </button>
        </div>

        {/* Nội dung Tab 1: Quản lý người dùng */}
        {activeTab === 'users' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Danh sách Tài khoản & Phân quyền Người dùng trong Bệnh viện</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3">Họ tên & Định danh</th>
                    <th className="pb-3">Tên đăng nhập</th>
                    <th className="pb-3">Vai trò (Role)</th>
                    <th className="pb-3">Trạng thái</th>
                    <th className="pb-3 text-right">Thao tác bảo mật</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/50">
                      <td className="py-3 font-semibold text-white">{u.name}</td>
                      <td className="py-3 text-slate-400 font-mono">{u.username}</td>
                      <td className="py-3">
                        <span className={`px-2.5 py-1 rounded-md font-bold text-[10px] ${
                          u.role === 'DOCTOR' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                          u.role === 'ADMIN' ? 'bg-purple-950 text-purple-400 border border-purple-800' :
                          u.role === 'NURSE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                          'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          u.status === 'ACTIVE' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                        }`}>
                          {u.status === 'ACTIVE' ? 'Đang hoạt động' : 'Đã khóa'}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleToggleStatus(u.id)}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                            u.status === 'ACTIVE' 
                              ? 'bg-rose-950/60 text-rose-400 hover:bg-rose-900 border border-rose-800' 
                              : 'bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900 border border-emerald-800'
                          }`}
                        >
                          {u.status === 'ACTIVE' ? 'Khóa tài khoản' : 'Mở khóa'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Nội dung Tab 2: Ma trận phân quyền RBAC */}
        {activeTab === 'rbac' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Ma trận Phân quyền Truy cập (Role-Based Access Control)</h3>
            <p className="text-xs text-slate-400">Xác định quyền hạn thao tác của từng nhóm tác nhân trên hệ thống Cadiocare.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3">Phân hệ / Chức năng hệ thống</th>
                    <th className="pb-3 text-center">Bác sĩ (Doctor)</th>
                    <th className="pb-3 text-center">Bệnh nhân (Patient)</th>
                    <th className="pb-3 text-center">Quản trị viên (Admin)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="py-3 font-medium">Quản lý hồ sơ bệnh án & Lượt khám</td>
                    <td className="py-3 text-center text-emerald-400 font-bold">Toàn quyền (CRUD)</td>
                    <td className="py-3 text-center text-rose-400">Không có quyền</td>
                    <td className="py-3 text-center text-amber-400">Chỉ xem</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Kê đơn & Phê duyệt phác đồ AI-CDSS</td>
                    <td className="py-3 text-center text-emerald-400 font-bold">Phê duyệt / Override</td>
                    <td className="py-3 text-center text-rose-400">Không có quyền</td>
                    <td className="py-3 text-center text-rose-400">Không có quyền</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Tự nhập sinh hiệu tại nhà (Home Telemonitoring)</td>
                    <td className="py-3 text-center text-amber-400">Chỉ theo dõi</td>
                    <td className="py-3 text-center text-emerald-400 font-bold">Được phép nhập</td>
                    <td className="py-3 text-center text-rose-400">Không có quyền</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Quản lý tài khoản & Nhật ký kiểm toán (Audit Logs)</td>
                    <td className="py-3 text-center text-rose-400">Không có quyền</td>
                    <td className="py-3 text-center text-rose-400">Không có quyền</td>
                    <td className="py-3 text-center text-emerald-400 font-bold">Toàn quyền (Full Access)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Nội dung Tab 3: Nhật ký kiểm toán */}
        {activeTab === 'logs' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Nhật ký Kiểm toán Hệ thống Y tế (Audit Logs)</h3>
            <p className="text-xs text-slate-400">Ghi vết toàn bộ hành vi đăng nhập, thay đổi y lệnh và can thiệp phác đồ điều trị.</p>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">[LOGIN_SUCCESS] Bác sĩ Nguyễn Văn An đăng nhập thành công.</p>
                  <p className="text-slate-400 text-[11px]">IP: 192.168.1.50 • Token JWT cấp lúc: 11:30:15</p>
                </div>
                <span className="px-2 py-1 bg-blue-950 text-blue-400 font-bold rounded">Bảo mật</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">[AI_CDSS_OVERRIDE] BS. An từ chối phác đồ AI cho bệnh nhân BN-2026-115.</p>
                  <p className="text-slate-400 text-[11px]">Lý do: Bệnh nhân có tiền sử tụt huyết áp tư thế, giữ nguyên liều thấp.</p>
                </div>
                <span className="px-2 py-1 bg-amber-950 text-amber-400 font-bold rounded">Lâm sàng</span>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}