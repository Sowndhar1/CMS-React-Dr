import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  ShieldAlert,
  Users,
  HeartPulse,
  TrendingUp,
  FileText,
  Clock,
  MoreVertical,
  Plus,
  ChevronDown,
  UserPlus,
  Upload,
  CheckSquare,
  AlertTriangle,
  Download,
  ArrowRight,
  UserCheck,
  Grid
} from 'lucide-react';

const Dashboard = () => {
  const { showScreen, setSelectedPatientId, patients } = useApp();
  const [filterTime, setFilterTime] = useState('Today');
  const [activeTab, setActiveTab] = useState('appointments');

  // Quick helper to select a patient and view details
  const viewPatientDetails = (id) => {
    setSelectedPatientId(id);
    showScreen('patientdetail');
  };

  const appointmentsList = [
    { id: '#1042', time: '09:00 AM', name: 'Amit Mehta', reason: 'Headache · Follow Up', room: 'OPD - 2', status: 'In Progress', statusColor: 'bg-[#810B38] text-white' },
    { id: '#1039', time: '09:30 AM', name: 'Sunita Patel', reason: 'BP Checkup', room: 'OPD - 2', status: 'Waiting', statusColor: 'bg-[#FAF5F0] text-[#D0693B] border border-[#F3D9C9]' },
    { id: '#1035', time: '10:00 AM', name: 'Rahul Kumar', reason: 'Diabetes Checkup', room: 'OPD - 2', status: 'Waiting', statusColor: 'bg-[#FAF5F0] text-[#D0693B] border border-[#F3D9C9]' },
    { id: '#1048', time: '10:30 AM', name: 'Priya Desai', reason: 'Thyroid Consultation', room: 'OPD - 2', status: 'Upcoming', statusColor: 'bg-[#EBF3FC] text-[#2F80ED] border border-[#D0E3FA]' },
    { id: '#1021', time: '11:00 AM', name: 'Vijay Nair', reason: 'Chest Pain', room: 'OPD - 2', status: 'Upcoming', statusColor: 'bg-[#EBF3FC] text-[#2F80ED] border border-[#D0E3FA]' }
  ];

  const doctorsList = [
    { name: 'Dr. Priya Sharma', specialty: 'Cardiologist', status: 'Available', statusClass: 'bg-green-150 text-green-700', initials: 'PS', initialsBg: 'bg-rose-50 text-[#810B38] border border-rose-100' },
    { name: 'Dr. Amit Verma', specialty: 'Neurologist', status: 'In OPD', statusClass: 'bg-orange-100 text-orange-700', initials: 'AV', initialsBg: 'bg-blue-50 text-blue-700 border border-blue-100' },
    { name: 'Dr. Neha Kapoor', specialty: 'Pediatrician', status: 'Available', statusClass: 'bg-green-150 text-green-700', initials: 'NK', initialsBg: 'bg-green-50 text-green-700 border border-green-100' },
    { name: 'Dr. Sandeep Rao', specialty: 'Dermatologist', status: 'On Break', statusClass: 'bg-red-100 text-red-700', initials: 'SR', initialsBg: 'bg-amber-50 text-amber-700 border border-amber-100' }
  ];

  const tasksList = [
    { text: 'Follow ups due today', count: 5, icon: Clock, badgeClass: 'bg-rose-50 text-red-600 border border-rose-100' },
    { text: 'Lab reports pending', count: 3, icon: FileText, badgeClass: 'bg-amber-50 text-amber-600 border border-amber-100' },
    { text: 'Insurance approvals', count: 2, icon: CheckSquare, badgeClass: 'bg-blue-50 text-blue-600 border border-blue-100' },
    { text: 'Critical patient follow up', count: 1, icon: AlertTriangle, badgeClass: 'bg-rose-50 text-red-600 border border-rose-100' }
  ];

  const documentsList = [
    { name: 'Amit_Mehta_CBC_Report.pdf', date: '16 Jun 2026', size: '2.4 MB', type: 'PDF' },
    { name: 'Rahul_Kumar_Xray.jpg', date: '15 Jun 2026', size: '1.8 MB', type: 'IMG' },
    { name: 'Priya_Desai_Visit_Summary.pdf', date: '15 Jun 2026', size: '320 KB', type: 'PDF' }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-5 pb-4 bg-[#FCFBFB] flex flex-col gap-5 font-sans">

      {/* Row 1: Greeting & KPI Cards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-shrink-0">

        {/* Greeting Card */}
        <div className="xl:col-span-5 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex items-center justify-between min-h-[130px] hover:shadow-md transition-shadow duration-300">
          <div className="z-10 max-w-[62%]">
            <h1 className="text-lg font-extrabold text-slate-800 flex items-center gap-1.5">
              Good Morning, Admin <span className="animate-bounce">👋</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1 font-medium leading-relaxed">
              Here's what's happening in your clinic today.
            </p>
          </div>
          {/* Detailed building illustration */}
          <div className="absolute right-2 bottom-0 z-0">
            <svg viewBox="0 0 200 150" className="w-40 h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Cloud in background */}
              <path d="M150 45 C150 38, 165 38, 170 43 C173 38, 188 40, 188 48 C188 55, 150 55, 150 45 Z" fill="#F8FAFC" fillOpacity="0.6" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.3" />

              {/* Main Building */}
              <rect x="50" y="55" width="80" height="65" rx="4" stroke="#94A3B8" strokeWidth="1" strokeOpacity="0.8" fill="#FFFFFF" />
              <rect x="70" y="32" width="40" height="23" rx="3" stroke="#94A3B8" strokeWidth="1" strokeOpacity="0.8" fill="#FFFFFF" />
              <rect x="78" y="20" width="24" height="12" rx="1.5" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.8" fill="#FFFFFF" />

              {/* Blue Cross */}
              <path d="M86 26H94M90 22V30" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />

              {/* Windows Top */}
              <rect x="76" y="38" width="8" height="8" rx="1.5" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.5" fill="#F8FAFC" />
              <rect x="96" y="38" width="8" height="8" rx="1.5" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.5" fill="#F8FAFC" />

              {/* Windows Row 1 */}
              <rect x="60" y="65" width="10" height="10" rx="1.5" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.5" fill="#F8FAFC" />
              <rect x="76" y="65" width="10" height="10" rx="1.5" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.5" fill="#F8FAFC" />
              <rect x="94" y="65" width="10" height="10" rx="1.5" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.5" fill="#F8FAFC" />
              <rect x="110" y="65" width="10" height="10" rx="1.5" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.5" fill="#F8FAFC" />

              {/* Windows Row 2 */}
              <rect x="60" y="81" width="10" height="10" rx="1.5" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.5" fill="#F8FAFC" />
              <rect x="76" y="81" width="10" height="10" rx="1.5" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.5" fill="#F8FAFC" />
              <rect x="94" y="81" width="10" height="10" rx="1.5" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.5" fill="#F8FAFC" />
              <rect x="110" y="81" width="10" height="10" rx="1.5" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.5" fill="#F8FAFC" />

              {/* Door */}
              <path d="M85 120V97H95V120" stroke="#94A3B8" strokeWidth="1" strokeOpacity="0.8" fill="#F1F5F9" />
              <line x1="90" y1="97" x2="90" y2="120" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.5" />

              {/* Ground Line */}
              <line x1="15" y1="120" x2="185" y2="120" stroke="#94A3B8" strokeWidth="1" strokeOpacity="0.8" />

              {/* Trees Left */}
              <line x1="26" y1="120" x2="26" y2="105" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.8" />
              <circle cx="26" cy="101" r="5" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.8" fill="#DCFCE7" />

              <line x1="36" y1="120" x2="36" y2="109" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.8" />
              <circle cx="36" cy="106" r="4" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.8" fill="#DCFCE7" />

              {/* Trees Right */}
              <line x1="148" y1="120" x2="148" y2="109" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.8" />
              <circle cx="148" cy="106" r="4.5" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.8" fill="#DCFCE7" />

              <line x1="158" y1="120" x2="158" y2="104" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.8" />
              <circle cx="158" cy="99" r="6.5" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.8" fill="#DCFCE7" />
            </svg>
          </div>
        </div>

        {/* 4 Stats Cards Grid */}
        <div className="xl:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4">

          {/* Appointments Today */}
          <div className="bg-[#FFF0F3] p-4 rounded-3xl border border-[#FFE2E6] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-3">
              <div className="w-8.5 h-8.5 rounded-2xl bg-[#FFD9E2] flex items-center justify-center text-[#810B38] flex-shrink-0">
                <Calendar size={15} />
              </div>
              <div>
                <p className="text-xl font-black text-slate-800 leading-tight">18</p>
                <p className="text-[10px] text-slate-500 font-bold mt-0.5">Appointments Today</p>
              </div>
            </div>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-1 mt-3.5">
              <span>↑ 12%</span> <span className="text-slate-400 font-medium">vs yesterday</span>
            </span>
          </div>

          {/* Follow Ups Pending */}
          <div className="bg-[#E8F4FD] p-4 rounded-3xl border border-[#D0E3FA] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-3">
              <div className="w-8.5 h-8.5 rounded-2xl bg-[#D0E7FC] flex items-center justify-center text-[#1A56DB] flex-shrink-0">
                <UserPlus size={15} />
              </div>
              <div>
                <p className="text-xl font-black text-slate-800 leading-tight">5</p>
                <p className="text-[10px] text-slate-500 font-bold mt-0.5">Follow Ups Pending</p>
              </div>
            </div>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-1 mt-3.5">
              <span>↑ 8%</span> <span className="text-slate-400 font-medium">vs yesterday</span>
            </span>
          </div>

          {/* Critical Patients */}
          <div className="bg-[#FEF6E9] p-4 rounded-3xl border border-[#FBEAD2] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-3">
              <div className="w-8.5 h-8.5 rounded-2xl bg-[#FDE7C9] flex items-center justify-center text-[#D0693B] flex-shrink-0">
                <AlertTriangle size={15} />
              </div>
              <div>
                <p className="text-xl font-black text-slate-800 leading-tight">3</p>
                <p className="text-[10px] text-slate-500 font-bold mt-0.5">Critical Patients</p>
              </div>
            </div>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-1 mt-3.5">
              <span>↑ 20%</span> <span className="text-slate-400 font-medium">vs yesterday</span>
            </span>
          </div>

          {/* Revenue Today */}
          <div className="bg-[#EAF8F2] p-4 rounded-3xl border border-[#CBEFDF] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-3">
              <div className="w-8.5 h-8.5 rounded-2xl bg-[#D1F5E5] flex items-center justify-center text-[#10B981] flex-shrink-0">
                <span className="text-xs font-black">₹</span>
              </div>
              <div>
                <p className="text-xl font-black text-slate-800 leading-tight">₹1.28L</p>
                <p className="text-[10px] text-slate-500 font-bold mt-0.5">Revenue Today</p>
              </div>
            </div>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-1 mt-3.5">
              <span>↑ 16%</span> <span className="text-slate-400 font-medium">vs yesterday</span>
            </span>
          </div>

        </div>

      </div>

      {/* Row 2: Quick Actions horizontal bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 flex-shrink-0">

        {/* Action: New Appointment */}
        <button
          className="p-3.5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center gap-3 transition-all duration-200 cursor-pointer shadow-sm group text-left"
          onClick={() => showScreen('appointments')}
        >
          <div className="w-8 h-8 rounded-xl bg-[#FFF0F3] text-[#810B38] flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <Calendar size={14} />
          </div>
          <span className="text-xs font-bold text-slate-800">New Appointment</span>
        </button>

        {/* Action: Add Patient */}
        <button
          className="p-3.5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center gap-3 transition-all duration-200 cursor-pointer shadow-sm group text-left"
          onClick={() => showScreen('patients')}
        >
          <div className="w-8 h-8 rounded-xl bg-[#FEF6E9] text-[#D0693B] flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <UserPlus size={14} />
          </div>
          <span className="text-xs font-bold text-slate-800">Add Patient</span>
        </button>

        {/* Action: Upload Document */}
        <button
          className="p-3.5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center gap-3 transition-all duration-200 cursor-pointer shadow-sm group text-left"
          onClick={() => showScreen('documents')}
        >
          <div className="w-8 h-8 rounded-xl bg-[#EAF8F2] text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <Upload size={14} />
          </div>
          <span className="text-xs font-bold text-slate-800">Upload Document</span>
        </button>

        {/* Action: Generate Invoice */}
        <button
          className="p-3.5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center gap-3 transition-all duration-200 cursor-pointer shadow-sm group text-left"
          onClick={() => showScreen('billing')}
        >
          <div className="w-8 h-8 rounded-xl bg-[#EFE8FC] text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <FileText size={14} />
          </div>
          <span className="text-xs font-bold text-slate-800">Generate Invoice</span>
        </button>

        {/* Action: More Actions */}
        <button
          className="p-3.5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center gap-3 transition-all duration-200 cursor-pointer shadow-sm group text-left col-span-2 sm:col-span-1 lg:col-span-1"
          onClick={() => alert('More clinical actions menu.')}
        >
          <div className="w-8 h-8 rounded-xl bg-[#FFF0F3] text-[#810B38] flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <Grid size={14} />
          </div>
          <span className="text-xs font-bold text-slate-800">More Actions</span>
        </button>

      </div>

      {/* Row 3: Today's Operations Card (Left) & Available Doctors + Tasks (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-shrink-0">

        {/* Left column - Today's Operations (col-span-8) */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 h-full flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Today's Operations</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Appointments Column */}
                <div className="md:col-span-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100 pb-5 md:pb-0 md:pr-6">
                  <div>
                    {/* Tabs */}
                    <div className="flex gap-4 border-b border-slate-100 pb-2 mb-3.5 select-none">
                      <button
                        className={`text-xs font-extrabold pb-1.5 transition-all cursor-pointer ${activeTab === 'appointments'
                            ? 'text-[#810B38] border-b-2 border-[#810B38]'
                            : 'text-slate-400 hover:text-slate-600'
                          }`}
                        onClick={() => setActiveTab('appointments')}
                      >
                        Appointments
                      </button>
                      <button
                        className={`text-xs font-extrabold pb-1.5 transition-all cursor-pointer ${activeTab === 'schedule'
                            ? 'text-[#810B38] border-b-2 border-[#810B38]'
                            : 'text-slate-400 hover:text-slate-600'
                          }`}
                        onClick={() => setActiveTab('schedule')}
                      >
                        Schedule
                      </button>
                    </div>

                    {/* Appointments List */}
                    <div className="flex flex-col gap-2.5">
                      {appointmentsList.map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center justify-between hover:bg-slate-50/50 p-1 rounded-xl transition-all cursor-pointer group"
                          onClick={() => viewPatientDetails(app.id)}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[#810B38] font-bold text-xs w-16 flex-shrink-0">{app.time}</span>
                            <div className="w-1 h-7 bg-slate-100 group-hover:bg-[#810B38]/30 rounded-full transition-colors"></div>
                            <div>
                              <p className="text-xs font-bold text-slate-800">{app.name}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{app.reason}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-slate-400 font-bold hidden sm:inline">{app.room}</span>
                            <span className={`px-2 py-0.5 text-[9px] font-black rounded-full shadow-sm leading-tight ${app.statusColor}`}>
                              {app.status}
                            </span>
                            <button className="text-slate-400 hover:text-slate-700 p-0.5" onClick={(e) => { e.stopPropagation(); alert('Appointment actions.'); }}>
                              <MoreVertical size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-[#810B38] hover:underline mt-4 pt-3 border-t border-slate-50 cursor-pointer self-center md:self-start"
                    onClick={() => showScreen('appointments')}
                  >
                    <span>View All Appointments</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                {/* Timeline Schedule Column */}
                <div className="md:col-span-6 flex flex-col justify-between md:pl-2">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-50">
                      <span className="text-xs font-extrabold text-slate-700">Timeline</span>
                      <span className="text-[9px] font-bold text-slate-400">08:00 - 14:00</span>
                    </div>

                    {/* Vertical Timeline axis list */}
                    <div className="relative flex flex-col gap-3.5 scrollbar-hide max-h-[280px] overflow-y-auto">
                      <div className="absolute left-[70px] top-2 bottom-2 w-0.5 bg-slate-100"></div>

                      {/* 08:00 */}
                      <div className="flex gap-3 items-center">
                        <span className="w-12 text-[10px] text-slate-400 font-bold text-right flex-shrink-0">08:00</span>
                        <div className="relative flex items-center justify-center w-5 flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-slate-200 border border-white z-10 shadow-sm"></div>
                        </div>
                        <span className="text-[10.5px] text-slate-400 italic font-medium flex-1">No scheduled events</span>
                      </div>

                      {/* 09:00 */}
                      <div className="flex gap-3 items-center">
                        <span className="w-12 text-[10px] text-slate-800 font-extrabold text-right flex-shrink-0">09:00</span>
                        <div className="relative flex items-center justify-center w-5 flex-shrink-0">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#810B38] border border-white z-10 shadow-sm animate-pulse"></div>
                        </div>
                        <div className="flex-grow pl-1">
                          <div className="px-3 py-1.5 bg-[#810B38]/5 border-l-4 border-[#810B38] rounded-xl flex items-center justify-between shadow-sm">
                            <div>
                              <p className="text-xs font-extrabold text-slate-800 leading-tight">Amit Mehta</p>
                              <p className="text-[9.5px] text-slate-500 mt-0.5">09:00 AM - 09:30 AM</p>
                            </div>
                            <span className="px-2 py-0.5 text-[8.5px] font-bold text-[#810B38] bg-white rounded-full border border-[#810B38]/20 shadow-sm">In Progress</span>
                          </div>
                        </div>
                      </div>

                      {/* 10:00 */}
                      <div className="flex gap-3 items-start">
                        <span className="w-12 text-[10px] text-slate-600 font-bold text-right flex-shrink-0 mt-2">10:00</span>
                        <div className="relative flex items-center justify-center w-5 flex-shrink-0 mt-2.5">
                          <div className="w-2 h-2 rounded-full bg-[#FAF5F0] border border-[#D0693B] z-10 shadow-sm"></div>
                        </div>
                        <div className="flex-grow pl-1 flex flex-col gap-1.5">
                          <div className="px-3 py-1 bg-[#FAF5F0]/60 border-l-3 border-[#DCC3AA] rounded-xl flex items-center justify-between shadow-sm">
                            <div>
                              <p className="text-xs font-bold text-slate-700">Sunita Patel</p>
                              <p className="text-[9px] text-slate-400">09:30 AM - 10:00 AM</p>
                            </div>
                            <span className="px-1.5 py-0.2 text-[8.5px] font-bold text-orange-600 bg-white rounded-full border border-orange-100 shadow-sm">Waiting</span>
                          </div>
                          <div className="px-3 py-1 bg-[#FAF5F0]/60 border-l-3 border-[#DCC3AA] rounded-xl flex items-center justify-between shadow-sm">
                            <div>
                              <p className="text-xs font-bold text-slate-700">Rahul Kumar</p>
                              <p className="text-[9px] text-slate-400">10:00 AM - 10:30 AM</p>
                            </div>
                            <span className="px-1.5 py-0.2 text-[8.5px] font-bold text-orange-600 bg-white rounded-full border border-orange-100 shadow-sm">Waiting</span>
                          </div>
                        </div>
                      </div>

                      {/* 11:00 */}
                      <div className="flex gap-3 items-center">
                        <span className="w-12 text-[10px] text-slate-400 font-bold text-right flex-shrink-0">11:00</span>
                        <div className="relative flex items-center justify-center w-5 flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-blue-500 border border-white z-10 shadow-sm"></div>
                        </div>
                        <div className="flex-grow pl-1">
                          <div className="px-3 py-1.5 bg-[#EBF3FC]/40 border-l-3 border-[#2F80ED] rounded-xl flex items-center justify-between shadow-sm">
                            <div>
                              <p className="text-xs font-bold text-slate-700">Priya Desai</p>
                              <p className="text-[9px] text-slate-400 mt-0.5">10:30 AM - 11:00 AM</p>
                            </div>
                            <span className="px-2 py-0.5 text-[8.5px] font-bold text-blue-600 bg-white rounded-full border border-blue-50 shadow-sm">Upcoming</span>
                          </div>
                        </div>
                      </div>

                      {/* 12:00 */}
                      <div className="flex gap-3 items-center">
                        <span className="w-12 text-[10px] text-slate-400 font-bold text-right flex-shrink-0">12:00</span>
                        <div className="relative flex items-center justify-center w-5 flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-orange-450 border border-white z-10 shadow-sm"></div>
                        </div>
                        <div className="flex-grow pl-1">
                          <div className="py-1.5 px-3 bg-orange-50/70 border border-orange-100 rounded-xl text-center font-bold text-orange-700 text-xs shadow-sm">
                            Lunch Break · 12:00 PM - 01:00 PM
                          </div>
                        </div>
                      </div>

                      {/* 02:00 */}
                      <div className="flex gap-3 items-center">
                        <span className="w-12 text-[10px] text-slate-400 font-bold text-right flex-shrink-0">02:00</span>
                        <div className="relative flex items-center justify-center w-5 flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 border border-white z-10 shadow-sm"></div>
                        </div>
                        <div className="flex-grow pl-1">
                          <div className="py-1.5 px-3 border border-dashed border-slate-200 bg-white rounded-xl flex items-center justify-between text-slate-450 font-bold text-[11px] shadow-sm">
                            <span>Available Slot (02:00 PM - 02:30 PM)</span>
                            <button className="w-5 h-5 rounded-full bg-[#810B38] text-white flex items-center justify-center hover:bg-[#6B082D] cursor-pointer shadow-sm hover:scale-105 transition-transform" onClick={() => showScreen('appointments')}>
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  <button
                    className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-[#810B38] hover:underline mt-4 pt-3 border-t border-slate-50 cursor-pointer self-center md:self-start"
                    onClick={() => showScreen('appointments')}
                  >
                    <span>View Full Schedule</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Right column - Available Doctors + Tasks stacked (col-span-4) */}
        <div className="lg:col-span-4 flex flex-col justify-between">

          {/* Available Doctors */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4.5 flex flex-col justify-between h-[47.5%]">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Available Doctors</h2>
              <button
                className="text-[10px] font-extrabold text-[#810B38] hover:underline cursor-pointer"
                onClick={() => showScreen('doctors')}
              >
                View all
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {doctorsList.map((doc, index) => (
                <div key={index} className="flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105 ${doc.initialsBg}`}>
                      {doc.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">{doc.name}</p>
                      <p className="text-[9px] text-slate-400 font-medium mt-0.5">{doc.specialty}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 text-[8.5px] font-black rounded-full shadow-sm leading-tight ${doc.status === 'Available' ? 'bg-emerald-50 text-emerald-700' :
                      doc.status === 'In OPD' ? 'bg-[#FAF5F0] text-[#D0693B]' : 'bg-rose-50 text-red-700'
                    }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks & Reminders */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4.5 flex flex-col justify-between h-[47.5%]">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Tasks & Reminders</h2>
              <button className="text-[10px] font-extrabold text-[#810B38] hover:underline cursor-pointer" onClick={() => alert('Tasks and reminders filter')}>
                View all
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {tasksList.map((task, index) => {
                const TaskIcon = task.icon;
                return (
                  <div key={index} className="flex items-center justify-between gap-2.5 bg-slate-50/30 hover:bg-slate-50/70 px-3 py-1.5 rounded-xl border border-slate-100/30 transition-all cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-rose-50/50 text-[#810B38] flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        <TaskIcon size={12} />
                      </div>
                      <span className="text-xs font-extrabold text-slate-705 group-hover:text-slate-900 transition-colors">{task.text}</span>
                    </div>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black ${task.badgeClass}`}>
                      {task.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Row 4: Bottom Widgets Row (Clinic Overview, Revenue Overview, Recent Documents side-by-side in equal column sizes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch pb-0 flex-shrink-0">

        {/* Column 1: Clinic Overview */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4.5 flex flex-col justify-between gap-4">
          <div>
            <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Clinic Overview</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 flex-grow">
            {/* Doctors Active */}
            <div className="bg-[#FCF6F7] p-3 rounded-2xl border border-[#FAEDEE] flex flex-col justify-between hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Doctors Active</span>
                <div className="w-6.5 h-6.5 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <UserCheck size={13} />
                </div>
              </div>
              <div className="mt-2.5">
                <p className="text-lg font-black text-slate-800 leading-none">12</p>
                <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
                  <span>↑ 2</span> <span className="text-slate-400 font-medium">vs yesterday</span>
                </span>
              </div>
            </div>

            {/* Patients Waiting */}
            <div className="bg-[#F6FAFE] p-3 rounded-2xl border border-[#EEF5FC] flex flex-col justify-between hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Patients Waiting</span>
                <div className="w-6.5 h-6.5 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users size={13} />
                </div>
              </div>
              <div className="mt-2.5">
                <p className="text-lg font-black text-slate-800 leading-none">25</p>
                <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
                  <span>↑ 5</span> <span className="text-slate-400 font-medium">vs yesterday</span>
                </span>
              </div>
            </div>

            {/* Rooms Occupied */}
            <div className="bg-[#FAF7F3] p-3 rounded-2xl border border-[#F5EFE6] flex flex-col justify-between hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Rooms Occupied</span>
                <div className="w-6.5 h-6.5 rounded-xl bg-amber-50 text-orange-600 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 14h20M6 8v6" />
                  </svg>
                </div>
              </div>
              <div className="mt-2.5">
                <p className="text-lg font-black text-slate-800 leading-none">3</p>
                <span className="text-[9px] font-bold text-rose-600 flex items-center gap-0.5 mt-1">
                  <span>↓ 1</span> <span className="text-slate-400 font-medium">vs yesterday</span>
                </span>
              </div>
            </div>

            {/* Emergency Cases */}
            <div className="bg-[#F5FBF7] p-3 rounded-2xl border border-[#EEFAF0] flex flex-col justify-between hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Emergency Cases</span>
                <div className="w-6.5 h-6.5 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <HeartPulse size={13} />
                </div>
              </div>
              <div className="mt-2.5">
                <p className="text-lg font-black text-slate-800 leading-none">1</p>
                <span className="text-[9px] font-bold text-slate-450 flex items-center gap-0.5 mt-1">
                  <span className="text-slate-400 font-medium">Same as yesterday</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Revenue Overview */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4.5 flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Revenue Overview</h2>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 cursor-pointer select-none">
                <span>This Week</span>
                <ChevronDown size={11} />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-lg font-extrabold text-slate-805">₹8,46,200</span>
              <span className="text-[9px] font-bold text-emerald-600">↑ 12.5% <span className="text-slate-400 font-medium">vs last week</span></span>
            </div>
          </div>

          {/* Spline Area Chart SVG */}
          <div className="w-full select-none flex-grow flex items-end">
            <svg className="w-full h-[115px]" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="25" y1="15" x2="385" y2="15" stroke="#f8fafc" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="25" y1="45" x2="385" y2="45" stroke="#f8fafc" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="25" y1="75" x2="385" y2="75" stroke="#f8fafc" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="25" y1="105" x2="385" y2="105" stroke="#f1f5f9" strokeWidth="1" />

              {/* Y Axis Grid values */}
              <text x="5" y="18" className="text-[9px] fill-slate-400 font-bold font-sans">₹1.5L</text>
              <text x="5" y="48" className="text-[9px] fill-slate-400 font-bold font-sans">₹1.0L</text>
              <text x="5" y="78" className="text-[9px] fill-slate-400 font-bold font-sans">₹0.5L</text>
              <text x="12" y="108" className="text-[9px] fill-slate-400 font-bold font-sans">₹0</text>

              {/* Spline Area Fill */}
              <path
                d="M 40 90 C 67.5 90, 67.5 105, 95 105 C 122.5 105, 122.5 70, 150 70 C 177.5 70, 177.5 80, 205 80 C 232.5 80, 232.5 55, 260 55 C 287.5 55, 287.5 70, 315 70 C 342.5 70, 342.5 30, 370 30 L 370 105 L 40 105 Z"
                fill="url(#revGrad)"
              />

              {/* Spline Outline Line */}
              <path
                d="M 40 90 C 67.5 90, 67.5 105, 95 105 C 122.5 105, 122.5 70, 150 70 C 177.5 70, 177.5 80, 205 80 C 232.5 80, 232.5 55, 260 55 C 287.5 55, 287.5 70, 315 70 C 342.5 70, 342.5 30, 370 30"
                stroke="var(--color-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Highlighted dots on coordinates */}
              <circle cx="40" cy="90" r="4" fill="#ffffff" stroke="var(--color-primary)" strokeWidth="2" />
              <circle cx="95" cy="105" r="4" fill="#ffffff" stroke="var(--color-primary)" strokeWidth="2" />
              <circle cx="150" cy="70" r="4" fill="#ffffff" stroke="var(--color-primary)" strokeWidth="2" />
              <circle cx="205" cy="80" r="4" fill="#ffffff" stroke="var(--color-primary)" strokeWidth="2" />
              <circle cx="260" cy="55" r="4" fill="#ffffff" stroke="var(--color-primary)" strokeWidth="2" />
              <circle cx="315" cy="70" r="4" fill="#ffffff" stroke="var(--color-primary)" strokeWidth="2" />
              <circle cx="370" cy="30" r="4" fill="#ffffff" stroke="var(--color-primary)" strokeWidth="2" />

              {/* Axis Labels */}
              <text x="40" y="118" textAnchor="middle" className="text-[9px] fill-slate-400 font-bold">Mon</text>
              <text x="95" y="118" textAnchor="middle" className="text-[9px] fill-slate-400 font-bold">Tue</text>
              <text x="150" y="118" textAnchor="middle" className="text-[9px] fill-slate-400 font-bold">Wed</text>
              <text x="205" y="118" textAnchor="middle" className="text-[9px] fill-slate-400 font-bold">Thu</text>
              <text x="260" y="118" textAnchor="middle" className="text-[9px] fill-slate-400 font-bold">Fri</text>
              <text x="315" y="118" textAnchor="middle" className="text-[9px] fill-slate-400 font-bold">Sat</text>
              <text x="370" y="118" textAnchor="middle" className="text-[9px] fill-slate-400 font-bold">Sun</text>
            </svg>
          </div>
        </div>

        {/* Column 3: Recent Documents */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4.5 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Recent Documents</h2>
            <button
              className="text-[10px] font-extrabold text-[#810B38] hover:underline cursor-pointer"
              onClick={() => showScreen('documents')}
            >
              View all
            </button>
          </div>

          <div className="flex flex-col gap-2 flex-grow justify-center">
            {documentsList.map((doc, index) => (
              <div key={index} className="flex items-center justify-between gap-3 hover:bg-slate-50/60 p-1.5 rounded-2xl transition-all cursor-pointer group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-[8px] flex-shrink-0 border transition-transform duration-200 group-hover:scale-105 ${doc.type === 'PDF' ? 'bg-rose-50 text-red-700 border-rose-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                    {doc.type}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-705 truncate group-hover:text-[#810B38] transition-colors">{doc.name}</p>
                    <p className="text-[9.5px] text-slate-400 font-medium mt-0.5">{doc.date} · {doc.size}</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-[#810B38] p-1 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0" onClick={(e) => { e.stopPropagation(); alert(`Downloading file: ${doc.name}`); }}>
                  <Download size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
