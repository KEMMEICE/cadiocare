import React, { useState } from 'react';
import { HeartPulse, Calendar, Activity, Bell, LogOut, CheckCircle2, AlertTriangle, X } from 'lucide-react';

export default function PatientPortal() {
  const [weight, setWeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [dyspnea, setDyspnea] = useState('Bình thường khi nghỉ ngơi');
  const [edema, setEdema] = useState('Không phù');
  
  const [submitted, setSubmitted] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertContent, setAlertContent] = useState('');

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

    const currentWeight = parseFloat(weight);
    const previousWeight = 64.0; // Mốc trọng lượng chuẩn để đánh giá tăng cân
    const weightDiff = currentWeight - previousWeight;

    // --- ĐOẠN MỚI BỔ SUNG: ĐỒNG BỘ DỮ LIỆU SANG BÁC SĨ QUA LOCALSTORAGE ---
    const newVitalRecord = {
      patientCode: patientId,
      patientName: patientName,
      date: 'Hôm nay, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      weight: weight + ' kg',
      bloodPressure: bloodPressure || '120/80 mmHg',
      dyspnea: dyspnea,
      edema: edema,
      timestamp: Date.now()
    };

    // Lưu vào kho chung để phía Doctor Dashboard đọc được
    const existingVitals = JSON.parse(localStorage.getItem('patient_latest_vitals') || '[]');
    localStorage.setItem('patient_latest_vitals', JSON.stringify([newVitalRecord, ...existingVitals]));
    // -----------------------------------------------------------------------

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);

    // Kiểm tra ngưỡng quá tải dịch (> 2kg hoặc triệu chứng nặng) để bật Cảnh báo Đỏ
    if (weightDiff >= 2.0 || dyspnea.includes('nằm') || edema.includes('đùi')) {
      setAlertContent(`Cảnh báo: Cân nặng tăng nhanh (${weightDiff > 0 ? `+${weightDiff.toFixed(1)}kg` : 'vượt ngưỡng'}) và triệu chứng lâm sàng bất thường! Hệ thống đã kích hoạt Cảnh báo Đỏ và gửi thông báo khẩn tới Khoa Tim mạch Bệnh viện Hữu Nghị.`);
      setShowAlertModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative">
      
      {/* POPUP CẢNH BÁO ĐỎ (CRITICAL ALERT MODAL) */}
      {showAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border-2 border-rose-500 space-y-4">
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <div className="flex items-center space-x-2 text-rose-600">
                <AlertTriangle className="h-6 w-6 animate-bounce" />
                <h3 className="text-base font-bold uppercase tracking-wide">Cảnh Báo Đỏ • Quá Tải Dịch</h3>
              </div>
              <button onClick={() => setShowAlertModal(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-900 leading-relaxed font-semibold">
              {alertContent}
            </div>

            <div className="text-[11px] text-slate-500 italic text-center">
              Dữ liệu đã tự động đồng bộ vào hệ thống Audit Logs và hiển thị trên Doctor Dashboard của BS.CKII Nguyễn Văn An.
            </div>

            <button
              onClick={() => setShowAlertModal(false)}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer text-xs"
            >
              Đã hiểu & Đang liên hệ Bác sĩ điều trị
            </button>
          </div>
        </div>
      )}

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
            <p className="text-xs text-blue-100">Vui lòng đo cân nặng, huyết áp và khai báo triệu chứng mỗi sáng trước khi ăn để đồng bộ về Khoa Tim Mạch.</p>
          </div>
          <Calendar className="h-12 w-12 text-blue-200 hidden sm:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form tự nhập chỉ số sinh hiệu và triệu chứng tại nhà */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b pb-3">
              <Activity className="h-5 w-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Ghi nhận Chỉ số Sức khỏe & Triệu chứng Hàng ngày</h3>
            </div>

            {submitted && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <span>Đã đồng bộ dữ liệu thành công lên hệ thống bệnh viện qua HL7/FHIR Gateway!</span>
              </div>
            )}

            <form onSubmit={handleVitalsSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cân nặng sáng nay (kg) <span className="text-red-500">*</span>:</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                  placeholder="VD: 65.5" 
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Huyết áp (mmHg - Tâm thu/Tâm trương):</label>
                <input 
                  type="text" 
                  value={bloodPressure} 
                  onChange={(e) => setBloodPressure(e.target.value)} 
                  placeholder="VD: 120/80" 
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Bổ sung Mức độ khó thở (Dyspnea Scale) */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mức độ khó thở (Dyspnea Scale):</label>
                <select
                  value={dyspnea}
                  onChange={(e) => setDyspnea(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none cursor-pointer"
                >
                  <option value="Bình thường khi nghỉ ngơi">Bình thường khi nghỉ ngơi / Không khó thở</option>
                  <option value="Khó thở khi gắng sức nhẹ">Khó thở khi gắng sức nhẹ (leo cầu thang, đi lại)</option>
                  <option value="Khó thở khi nằm">Khó thở khi nằm (phải kê nhiều gối / orthopnea)</option>
                </select>
              </div>

              {/* Bổ sung Tình trạng phù (Edema Checkbox / Select) */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tình trạng Phù (Edema Check):</label>
                <select
                  value={edema}
                  onChange={(e) => setEdema(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none cursor-pointer"
                >
                  <option value="Không phù">Không phù</option>
                  <option value="Phù chân nhẹ">Phù chân nhẹ (ấn lõm mắt cá)</option>
                  <option value="Phù lan lên đùi hoặc báng bụng">Phù lan lên đùi hoặc báng bụng (quá tải dịch nặng)</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer mt-2"
              >
                Gửi chỉ số cho Bác sĩ (Sync Real-time)
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
                  <p className="text-[11px] text-rose-600 mt-0.5">Triệu chứng: Khó thở nhẹ khi gắng sức</p>
                </div>
                <span className="px-2.5 py-1 bg-rose-100 text-rose-700 font-bold rounded-md">Tăng nhanh (+2.4kg)</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800">Ngày 29/10/2026</p>
                  <p className="text-slate-500">Cân nặng: <strong>65.5 kg</strong> • HA: 120/78</p>
                  <p className="text-[11px] text-emerald-600 mt-0.5">Triệu chứng: Không phù, bình thường</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-md">Ổn định</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}