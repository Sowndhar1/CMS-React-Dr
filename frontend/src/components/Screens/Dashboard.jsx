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
  Grid,
  Bed
} from 'lucide-react';

// Patient demographics mock data (sourced from friend's dashboard pattern)
const demographics = {
  genderSplit: { male: 58, female: 36, other: 6 },
  totalPatients: 100,
  ageGroups: { children: 12, adults: 68, senior: 20 }
};

// Weekly appointment bar chart mock data
const weeklyData = [
  { day: 'Mon', total: 22, completed: 18 },
  { day: 'Tue', total: 28, completed: 24 },
  { day: 'Wed', total: 20, completed: 15 },
  { day: 'Thu', total: 32, completed: 29 },
  { day: 'Fri', total: 26, completed: 22 },
  { day: 'Sat', total: 14, completed: 12 },
  { day: 'Sun', total: 8, completed: 8 },
];
const maxBar = Math.max(...weeklyData.map(d => d.total));

const Dashboard = () => {
  const { showScreen, setSelectedPatientId, patients } = useApp();
  const [filterTime, setFilterTime] = useState('Today');
  const [activeTab, setActiveTab] = useState('appointments');
  const [expandedAppt, setExpandedAppt] = useState(null);

  // Quick helper to select a patient and view details
  const viewPatientDetails = (id) => {
    setSelectedPatientId(id);
    showScreen('patientdetail');
  };

  const appointmentsList = [
    { id: '#1042', time: '09:00 AM', name: 'Amit Mehta', reason: 'Headache · Follow Up', room: 'OPD - 2', status: 'In Progress', statusColor: 'bg-[#810B38] text-white', age: '42', gender: 'Male', phone: '+91 98765 43210', email: 'amit.mehta@email.com' },
    { id: '#1039', time: '09:30 AM', name: 'Sunita Patel', reason: 'BP Checkup', room: 'OPD - 2', status: 'Waiting', statusColor: 'bg-[#FAF5F0] text-[#D0693B] border border-[#F3D9C9]', age: '55', gender: 'Female', phone: '+91 97654 32109', email: 'sunita.patel@email.com' },
    { id: '#1035', time: '10:00 AM', name: 'Rahul Kumar', reason: 'Diabetes Checkup', room: 'OPD - 2', status: 'Waiting', statusColor: 'bg-[#FAF5F0] text-[#D0693B] border border-[#F3D9C9]', age: '38', gender: 'Male', phone: '+91 96543 21098', email: 'rahul.kumar@email.com' },
    { id: '#1048', time: '10:30 AM', name: 'Priya Desai', reason: 'Thyroid Consultation', room: 'OPD - 2', status: 'Upcoming', statusColor: 'bg-[#EBF3FC] text-[#2F80ED] border border-[#D0E3FA]', age: '29', gender: 'Female', phone: '+91 95432 10987', email: 'priya.desai@email.com' },
    { id: 'lunch-12', time: '12:00 PM', name: 'Lunch Break', reason: '12:00 PM - 01:00 PM', room: '', status: 'Lunch', statusColor: 'bg-orange-50 text-orange-700 border border-orange-100' },
    { id: 'slot-2', time: '02:00 PM', name: 'Available Slot', reason: '02:00 PM - 02:30 PM', room: '', status: 'Available', statusColor: 'bg-emerald-50 text-emerald-700 border border-emerald-100' }
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
    <div className="flex-1 overflow-y-auto p-2 bg-transparent font-sans">
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col gap-4 min-h-full">

        {/* Row 1: Greeting & KPI Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-shrink-0">

          {/* Greeting Card */}
          <div className="xl:col-span-5 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex items-center justify-between min-h-[130px] hover:shadow-md transition-shadow duration-300">
            <div className="z-10 max-w-[62%]">
              <h1 className="text-base font-bold text-slate-800 flex items-center gap-1.5">
                Good Morning, Sowndhar <span className="animate-bounce">👋</span>
              </h1>
              <p className="text-slate-400 text-xs mt-1 font-medium leading-relaxed">
                Here's what's happening in your clinic today.
              </p>
            </div>
            {/* Detailed building illustration */}
            <div className="absolute right-2 bottom-0 z-0 hidden sm:block">
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
                          className="text-xs font-extrabold pb-1.5 transition-all cursor-default border-b-2"
                          style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}
                        >
                          Schedule
                        </button>
                      </div>

                      {/* Appointments List */}
                      <div className="flex flex-col gap-1">
                        {appointmentsList.map((app) => {
                          const isExpanded = expandedAppt === app.id;
                          const isExpandable = !!app.age; // only real patient rows
                          return (
                            <div
                              key={app.id}
                              className="relative"
                              onMouseEnter={() => isExpandable && setExpandedAppt(app.id)}
                              onMouseLeave={() => setExpandedAppt(null)}
                            >
                              <div
                                className={`flex items-center justify-between px-2 py-1.5 -mx-2 rounded-xl transition-all cursor-pointer group hover:shadow-sm border ${isExpanded
                                    ? 'bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] border-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] shadow-sm'
                                    : 'border-transparent hover:bg-slate-50/80 hover:border-slate-100/60'
                                  }`}
                                onClick={() => viewPatientDetails(app.id)}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="font-bold text-xs w-16 flex-shrink-0" style={{ color: 'var(--color-primary)' }}>{app.time}</span>
                                  <div className={`w-1 h-7 rounded-full transition-colors ${isExpanded ? '' : 'bg-slate-100'}`} style={isExpanded ? { background: 'var(--color-primary)' } : {}} onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = 'var(--color-primary-light)'; }} onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = ''; }}></div>
                                  <div>
                                    <p className={`text-xs font-bold ${app.id.startsWith('empty') ? 'text-slate-400 italic' : 'text-slate-800'}`}>{app.name}</p>
                                    {app.reason && <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{app.reason}</p>}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  {app.room ? (
                                    <span className="text-[9px] text-slate-400 font-bold hidden sm:inline">{app.room}</span>
                                  ) : (
                                    <span className="text-[9px] text-transparent font-bold hidden sm:inline select-none pointer-events-none">OPD - 2</span>
                                  )}
                                  {app.status && (
                                    <span className={`px-2 py-0.5 text-[9px] font-black rounded-full shadow-sm leading-tight text-center ${app.statusColor}`} style={{ minWidth: '60px' }}>
                                      {app.status}
                                    </span>
                                  )}
                                  {app.room ? (
                                    <button className="text-slate-400 hover:text-slate-700 p-0.5" onClick={(e) => { e.stopPropagation(); alert('Appointment actions.'); }}>
                                      <MoreVertical size={13} />
                                    </button>
                                  ) : (
                                    <div className="p-0.5 opacity-0 pointer-events-none">
                                      <MoreVertical size={13} />
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* ── Hover expand panel (Tooltip) ── */}
                              {isExpanded && app.age && (
                                <div
                                  className="absolute left-10 md:left-24 top-full mt-1 z-50 w-64 p-3 rounded-xl border shadow-xl animate-fade-up bg-white/95 backdrop-blur-md"
                                  style={{ borderColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)' }}
                                >
                                  <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Patient Details</p>
                                  <div className="grid grid-cols-2 gap-1.5">
                                    {[
                                      { label: 'Age', value: `${app.age} yrs` },
                                      { label: 'Gender', value: app.gender },
                                      { label: 'Phone', value: app.phone },
                                      { label: 'Email', value: app.email },
                                    ].map(f => (
                                      <div key={f.label} className="bg-slate-50/80 rounded-lg p-2 border border-slate-100/60">
                                        <p className="text-[9px] text-slate-400 font-medium">{f.label}</p>
                                        <p className="text-[10px] font-bold text-slate-700 truncate mt-0.5" title={f.value}>{f.value}</p>
                                      </div>
                                    ))}
                                  </div>
                                  <button
                                    className="mt-2 w-full text-[9px] font-extrabold py-1.5 rounded-lg transition-all cursor-pointer hover:opacity-80"
                                    style={{ background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)', color: 'var(--color-primary)' }}
                                    onClick={(e) => { e.stopPropagation(); viewPatientDetails(app.id); }}
                                  >
                                    View Full Record →
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      className="flex items-center justify-center gap-1.5 text-xs font-extrabold hover:underline mt-4 pt-3 border-t border-slate-50 cursor-pointer self-center md:self-start"
                      style={{ color: 'var(--color-primary)' }}
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
                        <span className="text-xs font-extrabold" style={{ color: 'var(--color-primary)' }}>Timeline</span>
                        <span className="text-[9px] font-bold text-slate-400">08:00 - 14:00</span>
                      </div>

                      {/* Vertical Timeline axis list */}
                      <div className="relative flex flex-col gap-3.5">
                        <div className="absolute left-[70px] top-2 bottom-2 w-0.5 bg-slate-100"></div>

                        {/* 08:00 */}
                        {/* Removed no scheduled events */}

                        {/* 09:00 */}
                        <div className="flex gap-3 items-center">
                          <span className="w-12 text-[10px] text-slate-800 font-extrabold text-right flex-shrink-0">09:00</span>
                          <div className="relative flex items-center justify-center w-5 flex-shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full border border-white z-10 shadow-sm animate-pulse" style={{ background: 'var(--color-primary)' }}></div>
                          </div>
                          <div className="flex-grow pl-1">
                            <div className="px-3 py-1.5 rounded-xl flex items-center justify-between shadow-sm" style={{ background: 'color-mix(in srgb, var(--color-primary) 8%, transparent)', borderLeft: '4px solid var(--color-primary)' }}>
                              <div>
                                <p className="text-xs font-extrabold text-slate-800 leading-tight">Amit Mehta</p>
                                <p className="text-[9.5px] text-slate-500 mt-0.5">09:00 AM - 09:30 AM</p>
                              </div>
                              <span className="px-2 py-0.5 text-[8.5px] font-bold bg-white rounded-full shadow-sm" style={{ color: 'var(--color-primary)', border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)' }}>In Progress</span>
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
                        <div className="flex gap-3 items-start">
                          <span className="w-12 text-[10px] text-slate-400 font-bold text-right flex-shrink-0 mt-2">11:00</span>
                          <div className="relative flex items-center justify-center w-5 flex-shrink-0 mt-2.5">
                            <div className="w-2 h-2 rounded-full bg-blue-500 border border-white z-10 shadow-sm"></div>
                          </div>
                          <div className="flex-grow pl-1 flex flex-col gap-1.5">
                            <div className="px-3 py-1 bg-[#EBF3FC]/40 border-l-3 border-[#2F80ED] rounded-xl flex items-center justify-between shadow-sm">
                              <div>
                                <p className="text-xs font-bold text-slate-700">Priya Desai</p>
                                <p className="text-[9px] text-slate-400 mt-0.5">10:30 AM - 11:00 AM</p>
                              </div>
                              <span className="px-1.5 py-0.2 text-[8.5px] font-bold text-blue-600 bg-white rounded-full border border-blue-50 shadow-sm">Upcoming</span>
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
                              <button className="w-5 h-5 rounded-full text-white flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 transition-transform" style={{ background: 'var(--color-primary)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-hover)'} onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'} onClick={() => showScreen('appointments')}>
                                <Plus size={11} />
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    <button
                      className="flex items-center justify-center gap-1.5 text-xs font-extrabold hover:underline mt-4 pt-3 border-t border-slate-50 cursor-pointer self-center md:self-start"
                      style={{ color: 'var(--color-primary)' }}
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
          <div className="lg:col-span-4 flex flex-col gap-4 mt-5 lg:mt-0">

            {/* Available Doctors */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4.5 flex flex-col gap-4">
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
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4.5 flex flex-col gap-4">
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
                    <div key={index} className="flex items-center justify-between gap-2.5 bg-transparent hover:bg-slate-50/70 px-3 py-1.5 rounded-xl border border-slate-100/30 transition-all cursor-pointer group">
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

        {/* Row 4: Bottom Widgets Row (Clinic Overview, Patient Demographics, Revenue Overview, Recent Documents) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch pb-0 flex-shrink-0">

          {/* Column 1: Clinic Overview */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[10.5px] font-extrabold text-slate-400 uppercase tracking-widest">Clinic Overview</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 h-full">
              {/* Doctors Active */}
              <div className="bg-[#FFF5F5]/70 rounded-2xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-700 leading-tight">Doctors Active</span>
                  <UserCheck className="text-rose-500/80" size={16} />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900 mb-0.5">12</div>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                    <span className="text-emerald-600">↑ 2</span> vs yesterday
                  </div>
                </div>
              </div>

              {/* Patients Waiting */}
              <div className="bg-[#F0F7FF]/70 rounded-2xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-700 leading-tight">Patients Waiting</span>
                  <Users className="text-blue-500/80" size={16} />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900 mb-0.5">25</div>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                    <span className="text-emerald-600">↑ 5</span> vs yesterday
                  </div>
                </div>
              </div>

              {/* Rooms Occupied */}
              <div className="bg-[#FFF8F0]/70 rounded-2xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-700 leading-tight">Rooms Occupied</span>
                  <Bed className="text-orange-500/80" size={16} />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900 mb-0.5">3</div>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                    <span className="text-rose-600">↓ 1</span> vs yesterday
                  </div>
                </div>
              </div>

              {/* Emergency Cases */}
              <div className="bg-[#F0FDF4]/70 rounded-2xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-700 leading-tight">Emergency Cases</span>
                  <HeartPulse className="text-emerald-500/80" size={16} />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900 mb-0.5">1</div>
                  <div className="text-[9px] font-bold text-slate-400">
                    Same as yesterday
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Patient Demographics */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4.5 flex flex-col gap-3">
            <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Patient Demographics</h2>

            {/* Gender Split */}
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Gender Split</p>
              <div className="space-y-2">
                {[
                  { label: 'Male', val: demographics.genderSplit.male, color: '#2F80ED', bg: '#EBF3FC' },
                  { label: 'Female', val: demographics.genderSplit.female, color: '#EC4899', bg: '#FDE8F4' },
                  { label: 'Other', val: demographics.genderSplit.other, color: '#D0693B', bg: '#FAF5F0' },
                ].map(({ label, val, color, bg }) => {
                  const pct = Math.round((val / demographics.totalPatients) * 100);
                  return (
                    <div key={label}>
                      <div className="flex justify-between items-center text-[10px] mb-1">
                        <span className="font-bold text-slate-600">{label}</span>
                        <span className="font-extrabold" style={{ color }}>{val} <span className="text-slate-400 font-medium">({pct}%)</span></span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: bg }}>
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, background: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100"></div>

            {/* Age Groups */}
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Age Groups</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '< 18', val: demographics.ageGroups.children, color: '#D0693B', bg: '#FAF5F0', border: '#F3D9C9' },
                  { label: '18–60', val: demographics.ageGroups.adults, color: '#2F80ED', bg: '#EBF3FC', border: '#D0E3FA' },
                  { label: '60+', val: demographics.ageGroups.senior, color: '#810B38', bg: '#FFF0F3', border: '#FFE2E6' },
                ].map(({ label, val, color, bg, border }) => (
                  <div key={label} className="text-center p-2.5 rounded-2xl border" style={{ background: bg, borderColor: border }}>
                    <p className="text-lg font-black leading-none" style={{ color }}>{val}</p>
                    <p className="text-[9px] font-bold text-slate-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100"></div>

            {/* Quick sub-stats: Rooms & Emergencies */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#FAF7F3] p-2.5 rounded-2xl border border-[#F5EFE6] flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-amber-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 14h20M6 8v6" /></svg>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-medium leading-none">Rooms</p>
                  <p className="text-sm font-black text-slate-800 leading-none mt-0.5">3 <span className="text-[9px] font-bold text-rose-500">↓1</span></p>
                </div>
              </div>
              <div className="bg-[#F5FBF7] p-2.5 rounded-2xl border border-[#EEFAF0] flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <HeartPulse size={11} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-medium leading-none">Emergency</p>
                  <p className="text-sm font-black text-slate-800 leading-none mt-0.5">1 <span className="text-[9px] font-bold text-slate-400">same</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Weekly Appointments Chart */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4.5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Weekly Appointments</h2>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">7 Days</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-slate-800">150 <span className="text-xs font-bold text-slate-400">total</span></span>
              <span className="text-[9px] font-bold text-emerald-600">↑ 8% <span className="text-slate-400 font-medium">vs last week</span></span>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--color-primary)' }}></div>
                <span className="text-[9px] font-bold text-slate-500">Total</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400"></div>
                <span className="text-[9px] font-bold text-slate-500">Completed</span>
              </div>
            </div>

            {/* Dual Bar Chart */}
            <div className="flex-grow flex items-end">
              <svg className="w-full" viewBox="0 0 380 110" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                {/* Horizontal Grid Lines */}
                <line x1="0" y1="0" x2="380" y2="0" stroke="#f1f5f9" strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1="0" y1="27" x2="380" y2="27" stroke="#f1f5f9" strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1="0" y1="54" x2="380" y2="54" stroke="#f1f5f9" strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="380" y2="80" stroke="#f1f5f9" strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1="0" y1="100" x2="380" y2="100" stroke="#e2e8f0" strokeWidth="1" />

                {/* Grouped Bars */}
                {weeklyData.map((d, i) => {
                  const slotW = 380 / weeklyData.length; // ~54px per day
                  const barW = 10;
                  const gap = 3;
                  const groupX = slotW * i + (slotW - barW * 2 - gap) / 2;
                  const maxH = 80;
                  const totalH = (d.total / maxBar) * maxH;
                  const completedH = (d.completed / maxBar) * maxH;
                  const dayX = slotW * i + slotW / 2;
                  return (
                    <g key={d.day}>
                      {/* Total bar */}
                      <rect
                        x={groupX}
                        y={100 - totalH}
                        width={barW}
                        height={totalH}
                        rx="3"
                        fill="var(--color-primary)"
                        fillOpacity="0.85"
                      />
                      {/* Completed bar */}
                      <rect
                        x={groupX + barW + gap}
                        y={100 - completedH}
                        width={barW}
                        height={completedH}
                        rx="3"
                        fill="#34d399"
                      />
                      {/* Day label */}
                      <text x={dayX} y={110} textAnchor="middle" fontSize="8" fill="#94a3b8" fontWeight="700">{d.day}</text>
                    </g>
                  );
                })}
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
    </div>
  );
};

export default Dashboard;
