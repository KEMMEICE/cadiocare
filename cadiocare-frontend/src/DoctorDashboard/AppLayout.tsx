import React, { useState } from 'react';
import {
  Users,
  Database,
  ShieldCheck,
  Bell,
  Search,
  Menu,
  X,
  HeartPulse,
  ChevronDown,
  LogOut
} from 'lucide-react';

// Import chính xác 3 phân hệ chức năng (Mục 1, Mục 2, Mục 6)
import PatientRecordManagement from './PatientRecordManagement';
import HospitalDataIntegration from './HospitalDataIntegration';
import AdminSystemDashboard from './AdminSystemDashboard';

type TabId = 'reception' | 'integration' | 'admin';

interface NavItem {
  id: TabId;
  name: string;
  numberTag: string;
  icon: React.ElementType;
  description: string;
}

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabId>('reception');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems: NavItem[] = [
    { 
      id: 'reception', 
      name: 'Quản lý hồ sơ bệnh án & lượt khám', 
      numberTag: '1', 
      icon: Users,
      description: 'Tiếp đón, tra cứu hồ sơ và theo dõi lâm sàng'
    },
    { 
      id: 'integration', 
      name: 'Tích hợp và tiền xử lý dữ liệu', 
      numberTag: '2', 
      icon: Database,
      description: 'ETL Pipeline, đồng bộ HIS/EMR, LIS, PACS'
    },
    { 
      id: 'admin', 
      name: 'Quản trị hệ thống & dữ liệu dùng chung', 
      numberTag: '6', 
      icon: ShieldCheck,
      description: 'Phân quyền RBAC, quản lý tài khoản & Audit Logs'
    },
  ];

  const handleOpenDoctorDashboard = (patientCode: string) => {
    alert(`Đang mở Doctor Dashboard chi tiết của bệnh nhân: ${patientCode}`);
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden">
      
      {/* 1. SIDEBAR BÊN TRÁI */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-900 text-slate-100 shadow-xl 
        transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-600/30">
              <HeartPulse className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <span className="text-base font-bold tracking-wider text-white block leading-tight">CADIOCARE</span>
              <span className="text-[11px] text-slate-400 font-medium">BV Hữu Nghị • Quản lý Suy tim</span>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Trạng thái HL7/FHIR Gateway */}
        <div className="mx-4 my-3 rounded-xl bg-slate-800/50 p-3 border border-slate-700/60 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">HL7/FHIR Gateway</span>
          </div>
          <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800">
            Online
          </span>
        </div>

        {/* Menu Điều hướng (Mục 1, 2, 6) */}
        <nav className="flex-1 space-y-2 px-4 py-3 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Phân hệ chức năng</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  group flex w-full items-start space-x-3 rounded-xl px-3.5 py-3 text-left transition-all
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 font-semibold' 
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'}
                `}
              >
                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-blue-400'
                }`}>
                  {item.numberTag}
                </div>
                <div>
                  <div className="text-xs leading-snug font-semibold">{item.name}</div>
                  <div className={`text-[10px] mt-0.5 line-clamp-1 ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-800 p-4 bg-slate-950/40 text-xs text-slate-400">
          <div className="flex justify-between items-center mb-1">
            <span>Khoa: <strong className="text-slate-200">Tim mạch</strong></span>
            <span className="text-[10px] bg-blue-950 text-blue-400 px-1.5 py-0.5 rounded border border-blue-900">Trực chính</span>
          </div>
        </div>
      </aside>

      {/* 2. KHU VỰC CHÍNH BÊN PHẢI (TOPBAR + MAIN CONTENT) */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* Topbar */}
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm z-30">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="relative hidden sm:block w-80 md:w-96">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tra cứu nhanh mã BN, CCCD, Họ tên..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* 1. NÚT CHUÔNG THÔNG BÁO */}
            <button 
              onClick={() => alert('Trung tâm cảnh báo: Có 2 ca Cảnh báo Đỏ quá tải dịch và 1 ca Cảnh báo Vàng.')}
              className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow ring-2 ring-white animate-bounce">
                3
              </span>
            </button>

            <div className="h-8 w-px bg-slate-200" />

            {/* 2. KHU VỰC TÊN BÁC SĨ & ĐĂNG XUẤT */}
            <div className="relative">
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 cursor-pointer group p-1.5 rounded-xl hover:bg-slate-100 transition-all"
              >
                <img
                  className="h-10 w-10 rounded-xl object-cover ring-2 ring-blue-500/20"
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=256&auto=format&fit=crop"
                  alt="Avatar Bác sĩ"
                />
                <div className="hidden text-left md:block">
                  <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    BS.CKII Nguyễn Văn An
                  </p>
                  <p className="text-xs text-slate-500">Mã NV: BS-0428 • Khoa Tim Mạch</p>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>

              {/* MENU THẢ XUỐNG ĐĂNG XUẤT */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-800">
                    <p className="text-xs text-slate-400">Phiên làm việc</p>
                    <p className="text-sm font-semibold text-white">Đang hoạt động</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      localStorage.clear(); // Xóa sạch token xác thực
                      window.location.reload(); // Tải lại trang để về màn hình Login
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2.5 text-xs font-bold text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Đăng xuất hệ thống</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header> {/* <-- ĐÃ THÊM THẺ ĐÓNG HEADER CHUẨN XÁC Ở ĐÂY */}

        {/* 3. VÙNG RENDER NỘI DUNG TƯƠNG ỨNG VỚI TAB ĐANG CHỌN */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50">
          {activeTab === 'reception' && (
            <PatientRecordManagement onOpenDoctorDashboard={handleOpenDoctorDashboard} />
          )}

          {activeTab === 'integration' && (
            <HospitalDataIntegration />
          )}

          {activeTab === 'admin' && (
            <AdminSystemDashboard />
          )}
        </main>

      </div>
    </div>
  );
}