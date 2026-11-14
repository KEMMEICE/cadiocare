import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  FileText, 
  Activity, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  AlertTriangle,
  HeartPulse,
  Stethoscope,
  Calendar,
  Filter
} from 'lucide-react';

// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU ---
export type HeartFailureType = 'HFrEF' | 'HFmrEF' | 'HFpEF';
export type NYHALevel = 'I' | 'II' | 'III' | 'IV';
export type VisitStatus = 'Chờ khám' | 'Đang khám' | 'Đã hoàn tất' | 'Cấp cứu';

export interface PatientRecord {
  id: string;
  patientCode: string;
  fullName: string;
  age: number;
  gender: 'Nam' | 'Nữ';
  cccd: string;
  hfType: HeartFailureType;
  lvefValue: number; // %
  nyha: NYHALevel;
  status: VisitStatus;
  doctorInCharge: string;
  lastUpdated: string;
}

// --- DỮ LIỆU MẪU (MOCK DATA) ---
const INITIAL_PATIENTS: PatientRecord[] = [
  {
    id: 'p-1',
    patientCode: 'BN-2026-0891',
    fullName: 'Trần Văn Mạnh',
    age: 72,
    gender: 'Nam',
    cccd: '001054002341',
    hfType: 'HFrEF',
    lvefValue: 32,
    nyha: 'III',
    status: 'Đang khám',
    doctorInCharge: 'BS.CKII Nguyễn Văn An',
    lastUpdated: 'Hôm nay, 08:15',
  },
  {
    id: 'p-2',
    patientCode: 'BN-2026-0642',
    fullName: 'Lê Thị Hòa',
    age: 68,
    gender: 'Nữ',
    cccd: '001158004123',
    hfType: 'HFpEF',
    lvefValue: 54,
    nyha: 'II',
    status: 'Chờ khám',
    doctorInCharge: 'ThS.BS Trần Thị Mai',
    lastUpdated: 'Hôm qua, 14:30',
  },
  {
    id: 'p-3',
    patientCode: 'BN-2026-0115',
    fullName: 'Nguyễn Đình Phúc',
    age: 65,
    gender: 'Nam',
    cccd: '001061009876',
    hfType: 'HFmrEF',
    lvefValue: 44,
    nyha: 'I',
    status: 'Đã hoàn tất',
    doctorInCharge: 'BS.CKI Lê Hoàng Nam',
    lastUpdated: '28/10/2026',
  },
];

interface Props {
  onOpenDoctorDashboard: (patientCode: string) => void;
}

// KHAI BÁO EXPORT DEFAULT Ở ĐẦU HÀM CHÍNH NHƯ THẾ NÀY:
export default function PatientRecordManagement({ onOpenDoctorDashboard }: Props) {
  const [patients, setPatients] = useState<PatientRecord[]>(INITIAL_PATIENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newGender, setNewGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [newCccd, setNewCccd] = useState('');
  const [newHfType, setNewHfType] = useState<HeartFailureType>('HFrEF');
  const [newLvef, setNewLvef] = useState('');
  const [newNyha, setNewNyha] = useState<NYHALevel>('II');

  const filteredPatients = patients.filter(p => {
    const matchSearch = 
      p.patientCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cccd.includes(searchTerm);
    const matchStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newAge || !newCccd) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    const newRecord: PatientRecord = {
      id: `p-${Date.now()}`,
      patientCode: `BN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: newFullName,
      age: parseInt(newAge, 10),
      gender: newGender,
      cccd: newCccd,
      hfType: newHfType,
      lvefValue: parseInt(newLvef, 10) || 50,
      nyha: newNyha,
      status: 'Chờ khám',
      doctorInCharge: 'BS.CKII Nguyễn Văn An',
      lastUpdated: 'Vừa tạo',
    };

    setPatients([newRecord, ...patients]);
    setIsModalOpen(false);
    setNewFullName('');
    setNewAge('');
    setNewCccd('');
    setNewLvef('');
  };

  return (
    <div className="space-y-6 font-sans text-slate-800 antialiased">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-xs">
              01
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Quản lý Hồ sơ Bệnh án & Lượt Khám
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Tra cứu thông tin hành chính, theo dõi chỉ số phân loại suy tim và mở lượt khám lâm sàng tại Bệnh viện Hữu Nghị[cite: 18].
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          + Tạo hồ sơ bệnh án mới
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo Mã BN, Họ tên hoặc CCCD..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">Tất cả trạng thái khám</option>
              <option value="Chờ khám">Chờ khám</option>
              <option value="Đang khám">Đang khám</option>
              <option value="Đã hoàn tất">Đã hoàn tất</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-800">
              Danh sách bệnh nhân suy tim ({filteredPatients.length} hồ sơ)
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">Khoa Tim mạch Can thiệp</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100/70 text-xs font-bold uppercase text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Mã BN & Họ Tên</th>
                <th className="px-4 py-3.5">Tuổi / Giới</th>
                <th className="px-4 py-3.5">Phân loại Suy tim</th>
                <th className="px-4 py-3.5">Chỉ số LVEF</th>
                <th className="px-4 py-3.5">Phân độ NYHA</th>
                <th className="px-4 py-3.5 text-center">Trạng thái khám</th>
                <th className="px-6 py-3.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Không tìm thấy bệnh nhân nào phù hợp với từ khóa tìm kiếm.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-sm">{patient.fullName}</div>
                      <div className="font-mono text-blue-600 font-semibold mt-0.5">{patient.patientCode}</div>
                      <div className="text-[10px] text-slate-400">CCCD: {patient.cccd}</div>
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-700">
                      {patient.age} tuổi • {patient.gender}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                        patient.hfType === 'HFrEF' 
                          ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                          : patient.hfType === 'HFpEF'
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'bg-amber-100 text-amber-700 border border-amber-200'
                      }`}>
                        {patient.hfType}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-mono font-bold text-slate-800">
                      {patient.lvefValue}%
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border">
                        NYHA {patient.nyha}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        patient.status === 'Đang khám'
                          ? 'bg-purple-100 text-purple-700 animate-pulse'
                          : patient.status === 'Chờ khám'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => onOpenDoctorDashboard(patient.patientCode)}
                        className="inline-flex items-center rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
                      >
                        <Stethoscope className="mr-1 h-3.5 w-3.5" />
                        <span>Mở lượt khám</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Tạo Hồ Sơ Bệnh Án Mới</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePatient} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Họ và Tên Bệnh Nhân <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="VD: Nguyễn Văn A"
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm font-semibold focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tuổi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={newAge}
                    onChange={(e) => setNewAge(e.target.value)}
                    placeholder="70"
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Giới tính</label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as 'Nam' | 'Nữ')}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Số CCCD / Định danh <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newCccd}
                  onChange={(e) => setNewCccd(e.target.value)}
                  placeholder="001054xxxxxx"
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kiểu hình EF</label>
                  <select
                    value={newHfType}
                    onChange={(e) => setNewHfType(e.target.value as HeartFailureType)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="HFrEF">HFrEF</option>
                    <option value="HFmrEF">HFmrEF</option>
                    <option value="HFpEF">HFpEF</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chỉ số LVEF (%)</label>
                  <input
                    type="number"
                    value={newLvef}
                    onChange={(e) => setNewLvef(e.target.value)}
                    placeholder="35"
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phân độ NYHA</label>
                  <select
                    value={newNyha}
                    onChange={(e) => setNewNyha(e.target.value as NYHALevel)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700"
                >
                  Lưu & Cấp Mã Bệnh Án
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}