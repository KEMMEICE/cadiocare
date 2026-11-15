import React, { useState } from 'react';
import { HeartPulse, Calendar, Activity, Bell, LogOut, CheckCircle2 } from 'lucide-react';

export default function PatientPortal() {
  const [weight, setWeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Lấy thông tin bệnh nhân đang đăng nhập từ localStorage
  const patientName = localStorage.getItem('username') || 'Trần Văn Mạnh';
  const patientId = 'BN-2026-0891';

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleVitalsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight) {
      alert('Vui lòng nhập cân nặng hôm nay!');
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header bệnh nhân */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
            <HeartPulse className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900">CADIOCARE • Cổng Bệnh nhân Ngoại trú</h1>
            <p className="text-xs text-slate-500">Mã BN: {patientId} • Xin chào, {patientName}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Đăng xuất</span>
        </button>
      </header>

      {/* Nội dung chính */}
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Banner cảnh báo / nhắc nhở */}
        <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs bg-blue-500 px-2.5 py-1 rounded-md font-semibold">Nhắc nhở từ Bác sĩ điều trị</span>
            <h2 className="text-lg font-bold">Lịch hẹn tái khám tiếp theo: 15/11/2026</h2>
            <p className="text-xs text-blue-100">Vui lòng đo cân nặng và huyết áp mỗi sáng trước khi ăn để hệ thống tự động đồng bộ về Khoa Tim Mạch.</p>
          </div>
          <Calendar className="h-12 w-12 text-blue-200 hidden sm:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form tự nhập chỉ số sinh hiệu tại nhà */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b pb-3">
              <Activity className="h-5 w-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Ghi nhận Chỉ số Sức khỏe Hàng ngày</h3>
            </div>

            {submitted && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>Đã gửi dữ liệu thành công lên hệ thống bệnh viện qua HL7/FHIR Gateway!</span>
              </div>
            )}

            <form onSubmit={handleVitalsSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cân nặng sáng nay (kg):</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                  placeholder="VD: 65.5" 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Huyết áp (mmHg - Tâm thu/Tâm trương):</label>
                <input 
                  type="text" 
                  value={bloodPressure} 
                  onChange={(e) => setBloodPressure(e.target.value)} 
                  placeholder="VD: 120/80" 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Gửi chỉ số cho Bác sĩ
              </button>
            </form>
          </div>

          {/* Lịch sử chỉ số cá nhân */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b pb-3">
              <Bell className="h-5 w-5 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">Lịch sử Cân nặng & Cảnh báo Dịch</h3>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800">Ngày 31/10/2026</p>
                  <p className="text-slate-500">Cân nặng: <strong>66.4 kg</strong> • HA: 125/80</p>
                </div>
                <span className="px-2 py-1 bg-rose-100 text-rose-700 font-bold rounded-md">Tăng nhanh (+2.4kg)</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800">Ngày 29/10/2026</p>
                  <p className="text-slate-500">Cân nặng: <strong>65.5 kg</strong> • HA: 120/78</p>
                </div>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-md">Ổn định</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}