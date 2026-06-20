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

  const tableColWidths = { gridTemplateColumns: '1fr 2.2fr 1.6fr 1.6fr 1fr 1.5fr 1.2fr 1fr' };

  return (
    <div className="screen-fade h-full overflow-hidden p-4 flex flex-col gap-4 bg-slate-50/50 min-h-0">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            className="btn-ghost p-1 rounded-lg text-slate-500 hover:text-slate-800 cursor-pointer"
            onClick={goBack}
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-base font-bold text-slate-800">Doctors</h1>
        </div>

        <button className="btn-primary text-xs flex items-center gap-1.5 py-2 cursor-pointer font-bold">
          <Plus size={14} />
          <span>Add Doctor</span>
        </button>
      </div>

      {/* Row 2: Search and Select Filters Toolbar */}
      <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
        {/* Search */}
        <div className="relative flex-1 min-w-[150px] max-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} style={{ pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search doctors..."
            className="form-input text-slate-700 bg-white font-semibold border-slate-200 hover:border-slate-300 transition text-xs py-2 shadow-sm rounded-lg"
            style={{ paddingLeft: '32px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Departments */}
        <select
          className="form-input form-select text-slate-700 bg-white font-semibold border-slate-200 hover:border-slate-300 transition text-xs py-2 shadow-sm rounded-lg"
          style={{ width: '150px' }}
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="General Medicine">General Medicine</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Radiology">Radiology</option>
          <option value="Gynecology">Gynecology</option>
        </select>

        {/* Specialization */}
        <select
          className="form-input form-select text-slate-700 bg-white font-semibold border-slate-200 hover:border-slate-300 transition text-xs py-2 shadow-sm rounded-lg"
          style={{ width: '165px' }}
          value={specFilter}
          onChange={(e) => setSpecFilter(e.target.value)}
        >
          <option value="All">All Specializations</option>
          <option value="General Physician">General Physician</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Radiologist">Radiologist</option>
          <option value="Gynecologist">Gynecologist</option>
        </select>

        {/* Status */}
        <select
          className="form-input form-select text-slate-700 bg-white font-semibold border-slate-200 hover:border-slate-300 transition text-xs py-2 shadow-sm rounded-lg"
          style={{ width: '120px' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="In Consultation">In Consultation</option>
          <option value="On Break">On Break</option>
          <option value="Off Duty">Off Duty</option>
        </select>

        {/* Availability */}
        <select
          className="form-input form-select text-slate-700 bg-white font-semibold border-slate-200 hover:border-slate-300 transition text-xs py-2 shadow-sm rounded-lg"
          style={{ width: '145px' }}
          value={availFilter}
          onChange={(e) => setAvailFilter(e.target.value)}
        >
          <option value="All">All Availability</option>
          <option value="Available">Available Now</option>
        </select>

        {/* View toggles segment */}
        <div className="bg-slate-200/60 p-0.5 rounded-lg flex gap-0.5 flex-shrink-0">
          <button 
            className={`text-xs py-1.5 px-3 rounded-md font-semibold transition flex-shrink-0 flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'table' ? 'bg-white text-primary-700 shadow-xs' : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setViewMode('table')}
          >
            <Table size={13} />
            <span>Table View</span>
          </button>
          <button 
            className={`text-xs py-1.5 px-3 rounded-md font-semibold transition flex-shrink-0 flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'card' ? 'bg-white text-primary-700 shadow-xs' : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setViewMode('card')}
          >
            <LayoutGrid size={13} />
            <span>Card View</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'card' ? (
        // Card Grid View
        <>
          <div className="flex-grow overflow-y-auto pr-1 min-h-0">
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-2">
                {filteredDoctors.map((doc, idx) => (
                  <div key={doc.id} className="section-card bg-white p-5 flex flex-col items-center hover:border-slate-300 hover:shadow-md transition-all relative">
                    
                    {/* Top-Right Ellipsis Option */}
                    <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 btn-ghost p-1 rounded">
                      <MoreVertical size={14} />
                    </button>

                    {/* Circle Avatar & Status Indicator Overlay */}
                    <div className="relative">
                      <DoctorAvatar name={doc.name} specialty={doc.specialty} index={idx} />
                      <span 
                        className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: getStatusColor(doc.status) }}
                      ></span>
                    </div>

                    {/* Name and Titles */}
                    <h3 className="font-bold text-slate-800 text-sm mt-3">{doc.name}</h3>
                    <span className="text-[11.5px] text-primary-500 font-semibold mt-1">{doc.specialty}</span>
                    <span className="text-[10px] text-slate-400 font-medium mt-0.5">{doc.dept}</span>

                    {/* Stars Rating */}
                    <div className="flex items-center gap-1 mt-2 text-amber-400">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill={i < 5 ? '#f59e0b' : 'transparent'} stroke="#f59e0b" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 mt-0.5">{doc.rating} ({doc.ratingsCount})</span>
                    </div>

                    {/* Bordered Stats Panel */}
                    <div className="w-full grid grid-cols-3 border border-slate-100 rounded-xl mt-4 py-2 px-1 text-center bg-slate-50/30 items-center justify-center">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">{doc.exp}</span>
                        <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider block mt-0.5">Years Exp.</span>
                      </div>
                      <div className="border-x border-slate-100 px-1">
                        <span className={`badge border ${getStatusBg(doc.status)} text-[8.5px] px-1 py-0.5 font-bold inline-block truncate w-full text-center`}>
                          {doc.status === 'In Consultation' ? 'Consulting' : doc.status}
                        </span>
                        <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider block mt-1">Status</span>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">{doc.patients}</span>
                        <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider block mt-0.5">Patients Today</span>
                      </div>
                    </div>

                    {/* Bottom Actions Row */}
                    <div className="w-full flex items-center justify-between border-t border-slate-100 mt-4 pt-3 text-[10.5px] text-slate-500 font-semibold px-2">
                      <button className="flex items-center gap-1 text-slate-500 hover:text-primary-600 transition-colors cursor-pointer">
                        <Eye size={12} />
                        <span>View</span>
                      </button>
                      <button className="flex items-center gap-1 text-slate-500 hover:text-primary-600 transition-colors cursor-pointer">
                        <Calendar size={12} />
                        <span>Schedule</span>
                      </button>
                      <button className="flex items-center gap-1 text-slate-500 hover:text-primary-600 transition-colors cursor-pointer">
                        <Edit size={12} />
                        <span>Edit</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs bg-white border border-slate-200 rounded-xl">No doctors match the filter criteria.</div>
            )}
          </div>
          
          {/* Card View Pagination Footer */}
          <div className="p-4 border border-slate-200 bg-white rounded-2xl flex items-center justify-between text-[11px] text-slate-400 font-extrabold flex-shrink-0 shadow-xs">
            <span>Showing 1 to {filteredDoctors.length} of 128 doctors</span>
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
              <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
                <ChevronLeft size={14} />
              </button>
              <button className="w-6 h-6 bg-[#810B38] text-white rounded-lg flex items-center justify-center font-bold text-xs">1</button>
              <button className="w-6 h-6 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-center font-bold text-xs">2</button>
              <button className="w-6 h-6 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-center font-bold text-xs">3</button>
              <span className="px-1 text-slate-350">...</span>
              <button className="w-6 h-6 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-center font-bold text-xs">16</button>
              <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </>
      ) : (
        // Table View
        <div className="section-card flex-grow flex flex-col overflow-hidden bg-white min-h-0">
          <div className="table-head text-[10.5px] items-center flex-shrink-0" style={tableColWidths}>
            <span>Avatar</span>
            <span>Name</span>
            <span>Department</span>
            <span>Specialization</span>
            <span>Experience</span>
            <span>Availability Status</span>
            <span>Patients Today</span>
            <span className="text-right pr-4">Actions</span>
          </div>
          <div className="divide-y divide-slate-50 overflow-y-auto flex-grow scrollbar-hide min-h-0">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doc, idx) => (
                <div
                  key={doc.id}
                  className="table-row items-center py-3 hover:bg-slate-50/50"
                  style={tableColWidths}
                >
                  <div className="flex items-center">
                    <div className="scale-75 origin-left">
                      <DoctorAvatar name={doc.name} specialty={doc.specialty} index={idx} />
                    </div>
                  </div>
                  <span className="text-slate-800 text-xs font-bold">{doc.name}</span>
                  <span className="text-slate-500 text-xs">{doc.dept}</span>
                  <span className="text-primary-600 text-xs font-semibold">{doc.specialty}</span>
                  <span className="text-slate-600 text-xs">{doc.exp} Years</span>
                  <div>
                    <span className={`badge border ${getStatusBg(doc.status)} text-[9px] font-semibold w-fit`}>
                      {doc.status}
                    </span>
                  </div>
                  <span className="text-slate-700 text-xs font-bold">{doc.patients} Patients</span>
                  <div className="flex items-center justify-end gap-1.5 pr-2">
                    <button className="btn-ghost p-1 text-slate-400 hover:text-slate-700 cursor-pointer" title="View Profile">
                      <Eye size={13} />
                    </button>
                    <button className="btn-ghost p-1 text-slate-400 hover:text-slate-700 cursor-pointer" title="Schedule">
                      <Calendar size={13} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">No doctors match the filter criteria.</div>
            )}
          </div>
          
          {/* Table pagination footer controls */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/20 flex items-center justify-between text-[11px] text-slate-400 font-extrabold flex-shrink-0">
            <span>Showing 1 to {filteredDoctors.length} of 128 doctors</span>
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
              <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
                <ChevronLeft size={14} />
              </button>
              <button className="w-6 h-6 bg-[#810B38] text-white rounded-lg flex items-center justify-center font-bold text-xs">1</button>
              <button className="w-6 h-6 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-center font-bold text-xs">2</button>
              <button className="w-6 h-6 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-center font-bold text-xs">3</button>
              <span className="px-1 text-slate-350">...</span>
              <button className="w-6 h-6 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-center font-bold text-xs">16</button>
              <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Doctors;
