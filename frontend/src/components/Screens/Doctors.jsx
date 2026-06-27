import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  UserCircle,
  Eye,
  Calendar,
  Edit,
  Table,
  LayoutGrid,
  MoreVertical,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Custom initials-based geometric SVG avatar component (glowing AI avatar style)
const DoctorAvatar = ({ name, specialty, index }) => {
  const initials = name.replace('Dr. ', '').split(' ').map(n => n[0]).join('');
  
  // Curated premium gradients matching specialties
  const gradients = [
    { from: '#3b82f6', to: '#1d4ed8' }, // Blue
    { from: '#10b981', to: '#047857' }, // Emerald
    { from: '#8b5cf6', to: '#6d28d9' }, // Purple
    { from: '#f59e0b', to: '#b45309' }, // Amber
    { from: '#ec4899', to: '#be185d' }, // Pink
    { from: '#06b6d4', to: '#0891b2' }, // Cyan
    { from: '#14b8a6', to: '#0f766e' }, // Teal
    { from: '#ef4444', to: '#b91c1c' }  // Red
  ];
  
  const grad = gradients[index % gradients.length];
  const gradId = `avatar-grad-${name.replace(/[^a-zA-Z]/g, '')}`;

  return (
    <div className="relative w-20 h-20 rounded-full shadow-md flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-white bg-slate-50">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={grad.from} stopOpacity="0.12" />
            <stop offset="100%" stopColor={grad.to} stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id={`${gradId}-circle`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={grad.from} />
            <stop offset="100%" stopColor={grad.to} />
          </linearGradient>
        </defs>
        
        {/* Geometric background grid */}
        <circle cx="50" cy="50" r="50" fill={`url(#${gradId})`} />
        <line x1="10" y1="50" x2="90" y2="50" stroke="#cbd5e1" strokeWidth="0.25" opacity="0.3" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="#cbd5e1" strokeWidth="0.25" opacity="0.3" />
        <circle cx="50" cy="50" r="38" stroke="#cbd5e1" strokeWidth="0.25" strokeDasharray="3 3" opacity="0.4" />
        
        {/* Glow rings */}
        <circle cx="50" cy="50" r="45" stroke={`url(#${gradId}-circle)`} strokeWidth="1.5" opacity="0.2" />
      </svg>
      
      {/* Initials Text */}
      <span 
        className="relative z-10 font-sans font-extrabold text-2xl tracking-wider select-none"
        style={{ 
          background: `linear-gradient(135deg, ${grad.from} 0%, ${grad.to} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        {initials}
      </span>
    </div>
  );
};

const Doctors = () => {
  const { goBack } = useApp();
  const [viewMode, setViewMode] = useState('table'); // Defaults to 'table' to match user preference
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [specFilter, setSpecFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [availFilter, setAvailFilter] = useState('All');

  // Static Doctors Data matching mockups exactly
  const initialDoctors = [
    { id: 'DOC-101', name: 'Dr. Rajan Kumar', specialty: 'General Physician', dept: 'General Medicine', exp: '12', status: 'Available', patients: '18', rating: '4.8', ratingsCount: '128' },
    { id: 'DOC-102', name: 'Dr. Priya Sharma', specialty: 'Cardiologist', dept: 'Cardiology', exp: '10', status: 'Available', patients: '22', rating: '4.9', ratingsCount: '96' },
    { id: 'DOC-103', name: 'Dr. Amit Verma', specialty: 'Neurologist', dept: 'Neurology', exp: '15', status: 'In Consultation', patients: '15', rating: '4.7', ratingsCount: '88' },
    { id: 'DOC-104', name: 'Dr. Neha Kapoor', specialty: 'Pediatrician', dept: 'Pediatrics', exp: '8', status: 'On Break', patients: '8', rating: '4.6', ratingsCount: '74' },
    { id: 'DOC-105', name: 'Dr. Vikram Singh', specialty: 'Orthopedic Surgeon', dept: 'Orthopedics', exp: '14', status: 'Available', patients: '20', rating: '4.8', ratingsCount: '112' },
    { id: 'DOC-106', name: 'Dr. Anjali Mehta', specialty: 'Dermatologist', dept: 'Dermatology', exp: '9', status: 'In Consultation', patients: '12', rating: '4.7', ratingsCount: '63' },
    { id: 'DOC-107', name: 'Dr. Sandeep Rao', specialty: 'Radiologist', dept: 'Radiology', exp: '11', status: 'Available', patients: '16', rating: '4.9', ratingsCount: '98' },
    { id: 'DOC-108', name: 'Dr. Kavya Nair', specialty: 'Gynecologist', dept: 'Gynecology', exp: '7', status: 'Off Duty', patients: '0', rating: '4.6', ratingsCount: '57' }
  ];

  const [doctors] = useState(initialDoctors);

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || doc.dept === deptFilter;
    const matchesSpec = specFilter === 'All' || doc.specialty === specFilter;
    const matchesStatus = statusFilter === 'All' || doc.status === statusFilter;
    const matchesAvail = availFilter === 'All' || (availFilter === 'Available' && doc.status === 'Available');

    return matchesSearch && matchesDept && matchesSpec && matchesStatus && matchesAvail;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return '#10b981'; // Green
      case 'In Consultation': return '#f59e0b'; // Amber
      case 'On Break': return '#ef4444'; // Red
      default: return '#94a3b8'; // Slate
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-50 text-green-600 border-green-200';
      case 'In Consultation': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'On Break': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  };

  const tableColWidths = { gridTemplateColumns: '2.5fr 1.5fr 1.5fr 1fr 1.2fr 1.5fr 1fr' };

  return (
    <div className="screen-fade h-full overflow-hidden p-2 bg-transparent min-h-0">
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col gap-5 h-full min-h-full overflow-hidden min-h-0">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            className="btn-ghost p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer transition-all"
            onClick={goBack}
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold text-slate-800">Doctors Directory</h1>
        </div>

        <button className="btn-primary px-4.5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2">
          <Plus size={16} />
          <span>Add Doctor</span>
        </button>
      </div>

      {/* Row 2: Search and Select Filters Toolbar */}
      <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-[280px] group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#810B38] transition-colors" size={15} style={{ pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search doctors..."
            className="w-full text-slate-700 bg-white font-semibold border border-slate-200 hover:border-slate-300 focus:border-[#810B38] focus:ring-2 focus:ring-[#810B38]/20 transition-all text-xs py-2.5 shadow-sm rounded-xl outline-none"
            style={{ paddingLeft: '36px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filters */}
        {[
          { value: deptFilter, setter: setDeptFilter, defaultText: "All Departments", options: ["General Medicine", "Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Dermatology", "Radiology", "Gynecology"], width: '155px' },
          { value: specFilter, setter: setSpecFilter, defaultText: "All Specializations", options: ["General Physician", "Cardiologist", "Neurologist", "Pediatrician", "Orthopedic Surgeon", "Dermatologist", "Radiologist", "Gynecologist"], width: '170px' },
          { value: statusFilter, setter: setStatusFilter, defaultText: "All Status", options: ["Available", "In Consultation", "On Break", "Off Duty"], width: '135px' },
          { value: availFilter, setter: setAvailFilter, defaultText: "All Availability", options: ["Available"], width: '150px' }
        ].map((filter, idx) => (
          <div key={idx} className="relative group">
            <select
              className="appearance-none w-full text-slate-700 bg-white font-semibold border border-slate-200 hover:border-slate-300 focus:border-[#810B38] focus:ring-2 focus:ring-[#810B38]/20 transition-all text-xs py-2.5 pl-3.5 pr-8 shadow-sm rounded-xl outline-none cursor-pointer"
              style={{ width: filter.width }}
              value={filter.value}
              onChange={(e) => filter.setter(e.target.value)}
            >
              <option value="All">{filter.defaultText}</option>
              {filter.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-slate-600" />
          </div>
        ))}

        {/* View toggles segment */}
        <div className="ml-auto bg-slate-200/50 p-1 rounded-xl flex gap-1 flex-shrink-0 border border-slate-200/50 shadow-inner">
          <button 
            className={`text-[11px] py-1.5 px-3.5 rounded-lg font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'table' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/60'
            }`}
            onClick={() => setViewMode('table')}
          >
            <Table size={13} className={viewMode === 'table' ? 'text-[#810B38]' : ''} />
            <span>Table View</span>
          </button>
          <button 
            className={`text-[11px] py-1.5 px-3.5 rounded-lg font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'card' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/60'
            }`}
            onClick={() => setViewMode('card')}
          >
            <LayoutGrid size={13} className={viewMode === 'card' ? 'text-[#810B38]' : ''} />
            <span>Card View</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'card' ? (
        // Card Grid View
        <>
          <div className="flex-grow overflow-y-auto pr-2 min-h-0 pb-4">
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredDoctors.map((doc, idx) => {
                  const patientsCount = parseInt(doc.patients) || 0;
                  const maxPatients = 30; // Assuming 30 is a very busy day
                  const loadPercentage = Math.min((patientsCount / maxPatients) * 100, 100);
                  let loadColor = "bg-emerald-400";
                  if (patientsCount > 15) loadColor = "bg-amber-400";
                  if (patientsCount > 25) loadColor = "bg-red-500";

                  return (
                  <div key={doc.id} className="bg-white rounded-2xl p-5 flex flex-col items-center border border-slate-200 hover:border-[#810B38]/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                    
                    {/* Top Accent Gradient Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:via-[#810B38]/50 transition-colors duration-300"></div>

                    {/* Top-Right Ellipsis Option */}
                    <button className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-1.5 rounded-full transition-colors">
                      <MoreVertical size={16} />
                    </button>

                    {/* Circle Avatar & Status Indicator Overlay */}
                    <div className="relative mt-2 mb-4 transform group-hover:scale-105 transition-transform duration-300">
                      <DoctorAvatar name={doc.name} specialty={doc.specialty} index={idx} />
                      <span 
                        className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
                        style={{ backgroundColor: getStatusColor(doc.status) }}
                      >
                        {/* Inner dot pulse for 'Available' */}
                        {doc.status === 'Available' && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>}
                      </span>
                    </div>

                    {/* Name and Titles */}
                    <h3 className="font-extrabold text-slate-900 text-base">{doc.name}</h3>
                    <span className="text-[11px] text-[#810B38] bg-rose-50 px-2.5 py-0.5 rounded-md font-bold mt-2 uppercase tracking-wide">{doc.specialty}</span>
                    <span className="text-[11px] text-slate-500 font-semibold mt-1.5">{doc.dept}</span>

                    {/* Stars Rating */}
                    <div className="flex items-center gap-1.5 mt-3 text-amber-400 bg-amber-50/50 px-3 py-1 rounded-full border border-amber-100">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill={i < Math.round(parseFloat(doc.rating)) ? '#f59e0b' : 'transparent'} stroke="#f59e0b" />
                        ))}
                      </div>
                      <span className="text-[10px] font-extrabold text-amber-700">{doc.rating} <span className="text-amber-500/70">({doc.ratingsCount})</span></span>
                    </div>

                    {/* Bordered Stats Panel */}
                    <div className="w-full grid grid-cols-3 border border-slate-100 rounded-xl mt-5 py-3 px-1 text-center bg-slate-50 items-center justify-center shadow-inner">
                      <div>
                        <span className="text-sm font-black text-slate-800 block">{doc.exp}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mt-1">Exp Yrs</span>
                      </div>
                      <div className="border-x border-slate-200 px-1 flex flex-col items-center justify-center h-full">
                        <span className={`w-2 h-2 rounded-full mb-1`} style={{ backgroundColor: getStatusColor(doc.status) }}></span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block text-center leading-tight">
                          {doc.status === 'In Consultation' ? 'Consult' : doc.status}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-black text-slate-800 block">{doc.patients}</span>
                        <div className="w-8 h-1.5 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                           <div className={`h-full ${loadColor} transition-all duration-500`} style={{ width: `${loadPercentage}%`}}></div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions Row */}
                    <div className="w-full grid grid-cols-2 gap-2 mt-5">
                      <button className="flex items-center justify-center gap-1.5 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 py-2 rounded-xl transition-all cursor-pointer font-bold text-[11px] shadow-sm">
                        <Eye size={13} />
                        <span>Profile</span>
                      </button>
                      <button className="flex items-center justify-center gap-1.5 text-white bg-slate-800 hover:bg-slate-900 py-2 rounded-xl transition-all cursor-pointer font-bold text-[11px] shadow-md">
                        <Calendar size={13} />
                        <span>Schedule</span>
                      </button>
                    </div>

                  </div>
                )})}
              </div>
            ) : (
              <div className="p-12 flex flex-col items-center justify-center text-slate-400 text-sm font-medium bg-white rounded-2xl border border-slate-200 h-full">
                <UserCircle size={64} className="text-slate-200 mb-4" />
                No doctors match the filter criteria.
              </div>
            )}
          </div>
          
          {/* Card View Pagination Footer */}
          <div className="p-4 border border-slate-200 bg-white rounded-2xl flex items-center justify-between text-[11px] text-slate-500 font-bold flex-shrink-0 shadow-sm mt-1">
            <span>Showing <span className="text-slate-800">{filteredDoctors.length > 0 ? 1 : 0}</span> to <span className="text-slate-800">{filteredDoctors.length}</span> of 128 doctors</span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors border border-transparent hover:border-slate-200">
                <ChevronLeft size={15} />
              </button>
              <div className="flex items-center gap-1 mx-1">
                <button className="w-7 h-7 bg-gradient-to-br from-[#810B38] to-[#6B082D] text-white rounded-lg flex items-center justify-center font-black text-xs shadow-md shadow-[#810B38]/20">1</button>
                <button className="w-7 h-7 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg flex items-center justify-center font-bold text-xs transition-colors border border-transparent hover:border-slate-200">2</button>
                <button className="w-7 h-7 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg flex items-center justify-center font-bold text-xs transition-colors border border-transparent hover:border-slate-200">3</button>
                <span className="px-1 text-slate-300">...</span>
                <button className="w-7 h-7 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg flex items-center justify-center font-bold text-xs transition-colors border border-transparent hover:border-slate-200">16</button>
              </div>
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors border border-transparent hover:border-slate-200">
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </>
      ) : (
        // Table View
        <div className="section-card flex-grow flex flex-col overflow-hidden bg-white min-h-0 border border-slate-100 rounded-2xl shadow-sm">
          <div className="overflow-x-auto flex-grow flex flex-col min-w-full">
            <div className="min-w-[950px] flex flex-col flex-1">
              {/* Modern Table Head */}
              <div className="grid items-center bg-slate-50/80 border-b border-slate-100 px-4 py-3.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider sticky top-0 z-10 flex-shrink-0" style={tableColWidths}>
                <span>Doctor</span>
                <span>Department</span>
                <span>Specialization</span>
                <span>Experience</span>
                <span>Status</span>
                <span>Daily Load</span>
                <span className="text-right pr-2">Actions</span>
              </div>
              <div className="divide-y divide-slate-100 overflow-y-auto flex-grow min-h-0 bg-white">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doc, idx) => {
                    const patientsCount = parseInt(doc.patients) || 0;
                    const maxPatients = 30; // Assuming 30 is a very busy day
                    const loadPercentage = Math.min((patientsCount / maxPatients) * 100, 100);
                    let loadColor = "bg-emerald-400";
                    if (patientsCount > 15) loadColor = "bg-amber-400";
                    if (patientsCount > 25) loadColor = "bg-red-500";

                    return (
                    <div
                      key={doc.id}
                      className="grid items-center px-4 py-3 hover:bg-slate-50/80 transition-all duration-200 group cursor-default"
                      style={tableColWidths}
                    >
                      <div className="flex items-center gap-2">
                        <div className="scale-[0.6] origin-left group-hover:scale-[0.65] transition-transform duration-300 w-12 flex-shrink-0">
                          <DoctorAvatar name={doc.name} specialty={doc.specialty} index={idx} />
                        </div>
                        <div className="flex flex-col -ml-1">
                          <span className="text-slate-900 text-[13px] font-extrabold group-hover:text-[#810B38] transition-colors">{doc.name}</span>
                          <span className="text-slate-400 text-[10px] font-semibold mt-0.5">{doc.id}</span>
                        </div>
                      </div>
                      <span className="text-slate-500 text-xs font-semibold">{doc.dept}</span>
                      <span className="text-slate-700 bg-slate-100/80 border border-slate-200/60 px-2.5 py-1 rounded-lg text-[11px] font-bold w-fit shadow-xs">{doc.specialty}</span>
                      <span className="text-slate-700 text-[13px] font-extrabold">{doc.exp} <span className="text-slate-400 font-semibold text-[10px]">Yrs</span></span>
                      <div>
                        {/* Rich Status Badge */}
                        <span className={`flex items-center gap-1.5 w-fit border ${getStatusBg(doc.status)} px-2.5 py-1.5 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-xs`}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getStatusColor(doc.status) }}></span>
                          {doc.status}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1.5 pr-6">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-800 text-xs font-extrabold">{doc.patients} <span className="text-[9.5px] text-slate-400 font-semibold">/ 30 pts</span></span>
                        </div>
                        {/* Load Progress Bar */}
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden shadow-inner">
                          <div className={`h-full rounded-full ${loadColor} transition-all duration-500`} style={{ width: `${loadPercentage}%` }}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-1.5 pr-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors cursor-pointer" title="View Profile">
                          <Eye size={15} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors cursor-pointer" title="Schedule">
                          <Calendar size={15} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer" title="More Options">
                          <MoreVertical size={15} />
                        </button>
                      </div>
                    </div>
                  )})
                ) : (
                  <div className="p-12 flex flex-col items-center justify-center text-slate-400 text-sm font-medium">
                    <UserCircle size={48} className="text-slate-200 mb-3" />
                    No doctors match the filter criteria.
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Table pagination footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-[11px] text-slate-500 font-bold flex-shrink-0">
            <span>Showing <span className="text-slate-800">{filteredDoctors.length > 0 ? 1 : 0}</span> to <span className="text-slate-800">{filteredDoctors.length}</span> of 128 doctors</span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white cursor-pointer transition-colors border border-transparent hover:border-slate-200 hover:shadow-sm">
                <ChevronLeft size={15} />
              </button>
              <div className="flex items-center gap-1 mx-1">
                <button className="w-7 h-7 bg-gradient-to-br from-[#810B38] to-[#6B082D] text-white rounded-lg flex items-center justify-center font-black text-xs shadow-md shadow-[#810B38]/20">1</button>
                <button className="w-7 h-7 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg flex items-center justify-center font-bold text-xs transition-all border border-transparent hover:border-slate-200 hover:shadow-sm">2</button>
                <button className="w-7 h-7 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg flex items-center justify-center font-bold text-xs transition-all border border-transparent hover:border-slate-200 hover:shadow-sm">3</button>
                <span className="px-1 text-slate-300">...</span>
                <button className="w-7 h-7 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg flex items-center justify-center font-bold text-xs transition-all border border-transparent hover:border-slate-200 hover:shadow-sm">16</button>
              </div>
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white cursor-pointer transition-colors border border-transparent hover:border-slate-200 hover:shadow-sm">
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default Doctors;
