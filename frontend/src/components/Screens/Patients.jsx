import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Filter,
  UserPlus,
  Users,
  User,
  Shield,
  Search,
  Eye,
  EyeOff,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Printer,
  MoreVertical,
  X,
  Mail,
  Droplets,
  MapPin,
  Calendar,
  SlidersHorizontal,
  Table,
  LayoutGrid,
  FileText,
  Clock,
  CalendarCheck,
  Phone
} from 'lucide-react';

// Sparkline Component for Stats Cards
const Sparkline = ({ data, color, fill }) => {
  return (
    <svg className="w-full h-6 mt-1" viewBox="0 0 100 30" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-pat-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity="0.2" />
          <stop offset="100%" stopColor={fill} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path
        d={data}
        fill={`url(#grad-pat-${color.replace('#','')})`}
      />
      <path
        d={data.replace(/ L [0-9\s.]+ Z$/, '')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Patients = () => {
  const { patients, setPatients, showScreen, goBack, setSelectedPatientId } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [conditionFilter, setConditionFilter] = useState('All Conditions');
  const [doctorFilter, setDoctorFilter] = useState('All Doctors');
  const [sortBy, setSortBy] = useState('Newest First');
  
  // View mode state (defaults to 'table' as requested)
  const [viewMode, setViewMode] = useState('table');
  
  // Stats visibility state (defaults to false to prevent visual clutter and noise on load)
  const [showStats, setShowStats] = useState(false);
  
  // Accordion state for collapsible cards (empty by default so no card is expanded initially)
  const [expandedIds, setExpandedIds] = useState([]);
  
  // Selection and Checkbox States (for table view)
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Registration Modal State
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState('');
  const [newPatientGender, setNewPatientGender] = useState('Male');
  const [newPatientPhone, setNewPatientPhone] = useState('');
  const [newPatientEmail, setNewPatientEmail] = useState('');
  const [newPatientCondition, setNewPatientCondition] = useState('New Patient');
  const [newPatientRisk, setNewPatientRisk] = useState('Low');

  // Mappings to match screenshot details
  const doctorMap = {
    '#1052': 'Dr. Singh, Orthopedic Surgeon',
    '#1055': 'Dr. Nair, Gynecologist',
    '#1042': 'Dr. Rajan, General Physician',
    '#1039': 'Dr. Rajan, General Physician',
    '#1035': 'Dr. Sharma, Pulmonologist',
    '#1048': 'Dr. Menon, Cardiologist',
    '#1021': 'Dr. Menon, Cardiologist',
    '#1019': 'Dr. Iyer, Dermatologist',
    '#1015': 'Dr. Rajan, General Physician',
  };

  const riskMap = {
    '#1052': 'Low',
    '#1055': 'Low',
    '#1042': 'Low',
    '#1039': 'Medium',
    '#1035': 'Low',
    '#1048': 'Low',
    '#1021': 'High',
    '#1019': 'Low',
    '#1015': 'Medium',
  };

  const addressMap = {
    '#1052': '45 Galaxy Towers, Sector V, Salt Lake, Kolkata, WB',
    '#1055': '88 Palms Residency, Banjara Hills, Hyderabad, TS',
    '#1042': '124 Park Street, Kolkata, WB',
    '#1039': '45 Lake View Road, Mumbai, MH',
    '#1035': '78 Hill Ridge Avenue, Pune, MH',
    '#1048': '202 Emerald Court, Chennai, TN',
    '#1021': '56 Orchid Lane, Bengaluru, KA',
    '#1019': '12 Royal Boulevard, Delhi, DL',
    '#1015': '99 Rose Gardens, Hyderabad, TS',
  };

  const toggleExpand = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(item => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredPatients.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id, checked) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(item => item !== id));
    }
  };

  // Filter & Sort patients
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All Status' ||
      patient.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesCondition =
      conditionFilter === 'All Conditions' ||
      patient.condition.toLowerCase().includes(conditionFilter.toLowerCase());

    const docName = doctorMap[patient.id] || 'Dr. Rajan, General Physician';
    const matchesDoctor =
      doctorFilter === 'All Doctors' ||
      docName.toLowerCase().includes(doctorFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesCondition && matchesDoctor;
  }).sort((a, b) => {
    if (sortBy === 'Newest First') {
      return b.id.localeCompare(a.id); // Simple mock newest sort by ID
    } else if (sortBy === 'Name A-Z') {
      return a.name.localeCompare(b.name);
    } else {
      return a.id.localeCompare(b.id);
    }
  });

  const handleViewPatient = (id) => {
    setSelectedPatientId(id);
    showScreen('patientdetail');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!newPatientName.trim() || !newPatientPhone.trim()) {
      alert('Please fill in Name and Phone Number.');
      return;
    }

    const nextId = `#${1000 + patients.length + 1}`;
    const newPatient = {
      id: nextId,
      name: newPatientName,
      email: newPatientEmail || `${newPatientName.toLowerCase().replace(/ /g, '.')}@email.com`,
      age: parseInt(newPatientAge) || 30,
      gender: newPatientGender,
      phone: newPatientPhone,
      emergencyPhone: newPatientPhone,
      bloodGroup: 'O+',
      condition: newPatientCondition,
      status: 'New',
      lastVisit: 'Today, 11:20 AM',
      nextFollowUp: 'Today',
      registeredDate: '04 Jun 2026',
      vitals: { bp: '120/80', pulse: '76 bpm', temp: '98.4°F', spo2: '98%', weight: '65 kg' },
      complaints: "Self-registered new patient.",
      allergies: ['None'],
      history: [],
      surgeries: [],
      familyHistory: {},
      prescriptions: [],
      labs: [],
      billingHistory: []
    };

    // Update mappings
    doctorMap[nextId] = 'Dr. Rajan, General Physician';
    riskMap[nextId] = newPatientRisk;
    addressMap[nextId] = '100 Galaxy Circle, Kolkata, WB';

    setPatients([newPatient, ...patients]);
    setIsRegModalOpen(false);

    // Reset fields
    setNewPatientName('');
    setNewPatientAge('');
    setNewPatientPhone('');
    setNewPatientEmail('');
    setNewPatientCondition('New Patient');
    setNewPatientRisk('Low');

    alert(`Patient ${newPatientName} registered successfully! (ID: ${nextId})`);
  };

  const tableColWidths = { gridTemplateColumns: '40px 80px 2.2fr 0.7fr 1.4fr 1.4fr 2.2fr 1.6fr 1fr 1fr 1fr' };

  return (
    <div className="screen-fade h-full overflow-hidden p-2 bg-transparent min-h-0">
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col gap-4 h-full min-h-full overflow-hidden min-h-0">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            className="btn-ghost p-1 rounded-lg text-slate-500 hover:text-slate-800 cursor-pointer"
            onClick={goBack}
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-base font-bold text-slate-800">Patients</h1>
        </div>

        <button 
          className="btn-primary text-xs flex items-center gap-1.5 py-2 cursor-pointer font-bold" 
          onClick={() => setIsRegModalOpen(true)}
        >
          <Plus size={14} />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Row 1: 5 Statistics Cards with Sparklines */}
      {showStats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 transition-all duration-300 flex-shrink-0">
          {/* Total Patients */}
          <div className="stat-card flex flex-col justify-between py-2.5 px-3.5 h-26">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Total Patients</p>
                  <p className="text-xl font-bold text-slate-800 mt-0.5" style={{ fontWeight: 700 }}>1,248</p>
                </div>
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Users className="text-blue-500" size={14} />
                </div>
              </div>
              <span className="text-[9px] text-slate-400 mt-0.5 block truncate">All registered patients</span>
            </div>
            <Sparkline
              data="M 0 25 Q 25 18 50 22 T 100 12 L 100 30 L 0 30 Z"
              color="#3b82f6"
              fill="#3b82f6"
            />
          </div>

          {/* Active Patients */}
          <div className="stat-card flex flex-col justify-between py-2.5 px-3.5 h-26">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Active Patients</p>
                  <p className="text-xl font-bold text-slate-800 mt-0.5" style={{ fontWeight: 700 }}>982</p>
                </div>
                <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-green-500" size={14} />
                </div>
              </div>
              <span className="text-[9px] text-slate-400 mt-0.5 block truncate">78.8% of total patients</span>
            </div>
            <Sparkline
              data="M 0 20 Q 25 24 50 15 T 100 18 L 100 30 L 0 30 Z"
              color="#10b981"
              fill="#10b981"
            />
          </div>

          {/* Follow-up Due */}
          <div className="stat-card flex flex-col justify-between py-2.5 px-3.5 h-26">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Follow-up Due</p>
                  <p className="text-xl font-bold text-slate-800 mt-0.5" style={{ fontWeight: 700 }}>143</p>
                </div>
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <CalendarCheck className="text-amber-500" size={14} />
                </div>
              </div>
              <span className="text-[9px] text-slate-400 mt-0.5 block truncate">Require follow-up</span>
            </div>
            <Sparkline
              data="M 0 15 Q 25 12 50 20 T 100 15 L 100 30 L 0 30 Z"
              color="#f59e0b"
              fill="#f59e0b"
            />
          </div>

          {/* New This Week */}
          <div className="stat-card flex flex-col justify-between py-2.5 px-3.5 h-26">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">New This Week</p>
                  <p className="text-xl font-bold text-slate-800 mt-0.5" style={{ fontWeight: 700 }}>27</p>
                </div>
                <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <Plus className="text-purple-500" size={14} />
                </div>
              </div>
              <span className="text-[9px] text-slate-400 mt-0.5 block truncate">New patients registered</span>
            </div>
            <Sparkline
              data="M 0 22 Q 25 25 50 12 T 100 10 L 100 30 L 0 30 Z"
              color="#8b5cf6"
              fill="#8b5cf6"
            />
          </div>

          {/* High Risk (New card) */}
          <div className="stat-card flex flex-col justify-between py-2.5 px-3.5 h-26 col-span-2 sm:col-span-1 lg:col-span-1">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">High Risk</p>
                  <p className="text-xl font-bold text-red-600 mt-0.5" style={{ fontWeight: 700 }}>12</p>
                </div>
                <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                  <SlidersHorizontal className="text-red-500" size={14} />
                </div>
              </div>
              <span className="text-[9px] text-slate-400 mt-0.5 block truncate">High risk patients</span>
            </div>
            <Sparkline
              data="M 0 10 Q 25 6 50 20 T 100 2 L 100 30 L 0 30 Z"
              color="#ef4444"
              fill="#ef4444"
            />
          </div>
        </div>
      )}

      {/* Row 2: Search and Select Filters Toolbar */}
      <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
        {/* Search */}
        <div className="relative flex-1 min-w-[150px] max-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} style={{ pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search patients..."
            className="form-input text-slate-700 bg-white font-semibold border-slate-200 hover:border-slate-300 transition text-xs py-2 shadow-sm rounded-lg"
            style={{ paddingLeft: '32px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Conditions */}
        <select
          className="form-input form-select text-slate-700 bg-white font-semibold border-slate-200 hover:border-slate-300 transition text-xs py-2 shadow-sm rounded-lg"
          style={{ width: '130px' }}
          value={conditionFilter}
          onChange={(e) => setConditionFilter(e.target.value)}
        >
          <option value="All Conditions">All Conditions</option>
          <option value="Diabetes">Diabetes</option>
          <option value="Hypertension">Hypertension</option>
          <option value="Asthma">Asthma</option>
          <option value="Cardiac">Cardiac</option>
          <option value="Thyroid">Thyroid</option>
        </select>

        {/* Doctors */}
        <select
          className="form-input form-select text-slate-700 bg-white font-semibold border-slate-200 hover:border-slate-300 transition text-xs py-2 shadow-sm rounded-lg"
          style={{ width: '130px' }}
          value={doctorFilter}
          onChange={(e) => setDoctorFilter(e.target.value)}
        >
          <option value="All Doctors">All Doctors</option>
          <option value="Dr. Rajan">Dr. Rajan</option>
          <option value="Dr. Sharma">Dr. Sharma</option>
          <option value="Dr. Menon">Dr. Menon</option>
          <option value="Dr. Iyer">Dr. Iyer</option>
        </select>

        {/* Status */}
        <select
          className="form-input form-select text-slate-700 bg-white font-semibold border-slate-200 hover:border-slate-300 transition text-xs py-2 shadow-sm rounded-lg"
          style={{ width: '110px' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All Status">All Status</option>
          <option value="Active">Active</option>
          <option value="Follow-up">Follow-up</option>
          <option value="New">New</option>
        </select>

        {/* Export Button */}
        <button className="btn-secondary text-xs py-2 shadow-sm rounded-lg hover:bg-slate-50 font-semibold flex items-center gap-1.5 flex-shrink-0 cursor-pointer" onClick={() => alert('Exporting records...')}>
          <Download size={13} className="text-slate-500" />
          <span>Export</span>
        </button>

        {/* Filters Button */}
        <button className="btn-secondary text-xs py-2 shadow-sm rounded-lg hover:bg-slate-50 font-semibold flex items-center gap-1.5 flex-shrink-0 cursor-pointer" onClick={() => setShowStats(!showStats)}>
          <Filter size={13} className="text-slate-500" />
          <span>Filters</span>
        </button>

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

        {/* Sort by */}
        <div className="flex items-center gap-1.5 ml-auto text-xs text-slate-500">
          <span>Sort by:</span>
          <select
            className="form-input text-slate-700 bg-white font-semibold border-slate-200 hover:border-slate-300 transition text-xs py-2 shadow-sm rounded-lg"
            style={{ width: '120px' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Newest First">Newest First</option>
            <option value="Name A-Z">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Row 3: Card View (Collapsible Accordions) or Table View */}
      {viewMode === 'card' ? (
        // Collapsible Card View List
        <>
          <div className="flex flex-col gap-3 flex-grow overflow-y-auto pr-1 min-h-0">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => {
                const docName = doctorMap[patient.id] || 'Dr. Rajan, General Physician';
                const riskLevel = riskMap[patient.id] || 'Low';
                const address = addressMap[patient.id] || '124 Park Street, Kolkata, WB';
                const isExpanded = expandedIds.includes(patient.id);

                return (
                  <div 
                    key={patient.id} 
                    className="section-card transition duration-150 border border-slate-200 bg-white flex-shrink-0"
                  >
                    {/* Card Header (Collapsed View) */}
                    <div 
                      className="p-4 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 items-center cursor-pointer select-none hover:bg-slate-50/40 transition-colors"
                      onClick={() => toggleExpand(patient.id)}
                    >
                      <div className="flex items-center gap-3 col-span-2 md:col-span-3 lg:col-span-3 min-w-0">
                        {/* Accordion Chevron */}
                        <button className="text-slate-400 hover:text-slate-600 mr-1 flex-shrink-0">
                          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>

                        {/* Avatar */}
                        <div className="avatar bg-blue-100 text-blue-700 font-bold flex-shrink-0" style={{ width: '34px', height: '34px', fontSize: '12px' }}>
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>

                        {/* Name, Status & Subtitle */}
                        <div className="truncate">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-800 truncate">{patient.name}</span>
                            <span className={`badge ${
                              patient.status.toLowerCase() === 'active' ? 'badge-green' :
                              patient.status.toLowerCase() === 'follow-up' ? 'badge-amber' :
                              'badge-blue'
                            } text-[9px] px-1.5 py-0.5 leading-none`}>
                              {patient.status}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            ID: {patient.id} • {patient.gender} • {patient.age} Yrs
                          </div>
                        </div>
                      </div>

                      {/* Contact (Phone) */}
                      <div className="hidden md:flex items-center gap-2 text-xs text-slate-600 md:col-span-2 lg:col-span-2 min-w-0">
                        <Phone size={12} className="text-slate-400 flex-shrink-0" />
                        <span className="truncate">{patient.phone}</span>
                      </div>

                      {/* Last Visit */}
                      <div className="hidden lg:flex items-center gap-2 text-xs text-slate-600 lg:col-span-2 min-w-0">
                        <Calendar size={12} className="text-slate-400" />
                        <div className="truncate">
                          <span className="text-slate-400 font-bold text-[9px] uppercase block leading-none">Last Visit</span>
                          <span className="text-xs text-slate-600 font-semibold truncate mt-0.5 block">{patient.lastVisit.split(',')[0]}</span>
                        </div>
                      </div>

                      {/* Doctor */}
                      <div className="hidden lg:flex items-center gap-2 text-xs text-slate-600 lg:col-span-2 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[9px] text-primary-600 border border-slate-200 flex-shrink-0">
                          DR
                        </div>
                        <div className="truncate">
                          <span className="text-xs text-slate-700 font-bold block leading-none truncate">{docName.split(',')[0]}</span>
                          <span className="text-[9.5px] text-slate-400 leading-none truncate mt-0.5 block">{docName.split(',')[1] || 'Physician'}</span>
                        </div>
                      </div>

                      {/* Condition badge */}
                      <div className="hidden md:block md:col-span-1 lg:col-span-1">
                        <span className={`badge ${
                          patient.condition.toLowerCase().includes('hypertension') ? 'badge-blue' :
                          patient.condition.toLowerCase().includes('diabetes') ? 'badge-teal' :
                          patient.condition.toLowerCase().includes('asthma') ? 'badge-gray' :
                          patient.condition.toLowerCase().includes('new') ? 'badge-blue' :
                          patient.condition.toLowerCase().includes('cardiac') ? 'badge-red' :
                          'badge-teal'
                        } text-[9.5px] w-full text-center justify-center truncate`}>
                          {patient.condition}
                        </span>
                      </div>

                      {/* Risk Badge */}
                      <div className="col-span-1 md:col-span-1 lg:col-span-1 flex justify-center">
                        <span className={`badge ${
                          riskLevel === 'High' ? 'badge-red' :
                          riskLevel === 'Medium' ? 'badge-amber' : 'badge-green'
                        } text-[9px] font-bold w-full text-center justify-center`}>
                          {riskLevel} Risk
                        </span>
                      </div>

                      {/* Ellipsis Menu */}
                      <div className="col-span-1 md:col-span-1 lg:col-span-1 flex justify-end" onClick={(e) => e.stopPropagation()}>
                        <button className="btn-ghost p-1 text-slate-400 hover:text-slate-700">
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content Drawer Panel */}
                    {isExpanded && (
                      <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/30 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs animate-slideDown">
                        {/* Column 1: Vitals & Key stats */}
                        <div className="space-y-2.5">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Patient Vitals</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white p-2.5 rounded-xl border border-slate-150">
                              <span className="text-[9px] text-slate-400 font-semibold uppercase block">Blood Pressure</span>
                              <span className="text-xs font-bold text-slate-700 block mt-0.5">{patient.vitals?.bp || '120/80'}</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-xl border border-slate-150">
                              <span className="text-[9px] text-slate-400 font-semibold uppercase block">Heart Pulse</span>
                              <span className="text-xs font-bold text-slate-700 block mt-0.5">{patient.vitals?.pulse || '72 bpm'}</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-xl border border-slate-150">
                              <span className="text-[9px] text-slate-400 font-semibold uppercase block">SpO2 Oxygen</span>
                              <span className="text-xs font-bold text-slate-700 block mt-0.5">{patient.vitals?.spo2 || '98%'}</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-xl border border-slate-150">
                              <span className="text-[9px] text-slate-400 font-semibold uppercase block">Body Weight</span>
                              <span className="text-xs font-bold text-slate-700 block mt-0.5">{patient.vitals?.weight || '72 kg'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Column 2: Clinical Details */}
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Chief Complaint</h4>
                            <p className="text-slate-650 font-medium leading-relaxed bg-white border border-slate-150 p-3 rounded-xl">
                              {patient.complaints || 'No active complaints listed.'}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Known Allergies</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {patient.allergies && patient.allergies.length > 0 ? (
                                patient.allergies.map((alg, index) => (
                                  <span key={index} className="px-2 py-0.5 bg-red-50 text-red-650 border border-red-100 rounded text-[10px] font-semibold">
                                    {alg}
                                  </span>
                                ))
                              ) : (
                                <span className="text-slate-400 italic text-[11px]">No known drug allergies</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Column 3: Contact & Actions Shortcut */}
                        <div className="flex flex-col justify-between">
                          <div className="space-y-1.5">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Details</h4>
                            <p className="text-slate-600 font-medium"><strong className="text-slate-400">Email:</strong> {patient.email}</p>
                            <p className="text-slate-600 font-medium"><strong className="text-slate-400">Phone:</strong> {patient.phone}</p>
                            <p className="text-slate-600 font-medium leading-tight mt-1">
                              <strong className="text-slate-400">Address:</strong> {address}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mt-4">
                            <button 
                              className="btn-primary justify-center text-xs py-1.5 cursor-pointer font-bold"
                              onClick={() => handleViewPatient(patient.id)}
                            >
                              <Eye size={12} />
                              <span>View Profile</span>
                            </button>
                            
                            <button 
                              className="btn-secondary justify-center text-xs py-1.5 cursor-pointer hover:bg-slate-100"
                              onClick={() => {
                                setSelectedPatientId(patient.id);
                                showScreen('appointments');
                              }}
                            >
                              <Calendar size={12} />
                              <span>Book Appointment</span>
                            </button>
                          </div>

                        </div>

                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs bg-white border border-slate-200 rounded-xl">No patients match the filter criteria.</div>
            )}
          </div>
          
          {/* Card View Pagination Footer */}
          <div className="p-4 border border-slate-200 bg-white rounded-2xl flex items-center justify-between text-[11px] text-slate-400 font-extrabold flex-shrink-0 shadow-xs">
            <span>Showing 1 to {filteredPatients.length} of {filteredPatients.length} patients</span>
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
              <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
                <ChevronLeft size={14} />
              </button>
              <button className="w-6 h-6 bg-[#810B38] text-white rounded-lg flex items-center justify-center font-bold text-xs">1</button>
              <button className="w-6 h-6 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-center font-bold text-xs">2</button>
              <button className="w-6 h-6 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-center font-bold text-xs">3</button>
              <span className="px-1 text-slate-350">...</span>
              <button className="w-6 h-6 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-center font-bold text-xs">250</button>
              <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </>
      ) : (
        // Table View
        <div className="section-card flex-1 flex flex-col overflow-hidden bg-white min-h-0">
          <div className="overflow-x-auto flex-grow flex flex-col min-w-full">
            <div className="min-w-[1000px] flex flex-col flex-1">
              <div className="table-head text-[10.5px] items-center flex-shrink-0" style={tableColWidths}>
                <input
                  type="checkbox"
                  className="cursor-pointer rounded border-slate-300"
                  checked={selectedIds.length > 0 && selectedIds.length === filteredPatients.length}
                  onChange={handleSelectAll}
                />
                <span>ID</span>
                <span>Patient</span>
                <span>Age</span>
                <span>Phone</span>
                <span>Last Visit</span>
                <span>Last Doctor</span>
                <span>Condition</span>
                <span>Risk</span>
                <span>Status</span>
                <span className="text-right pr-4">Actions</span>
              </div>
              <div className="divide-y divide-slate-50 overflow-y-auto flex-grow scrollbar-hide min-h-0">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => {
                    const docName = doctorMap[patient.id] || 'Dr. Rajan, General Physician';
                    const riskLevel = riskMap[patient.id] || 'Low';
                    const isChecked = selectedIds.includes(patient.id);
                    
                    return (
                      <div
                        key={patient.id}
                        className={`table-row items-center py-3 hover:bg-slate-50/50 ${isChecked ? 'bg-slate-50/70' : ''}`}
                        style={tableColWidths}
                        onClick={() => handleViewPatient(patient.id)}
                      >
                        <input
                          type="checkbox"
                          className="cursor-pointer rounded border-slate-300"
                          checked={isChecked}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleSelectOne(patient.id, e.target.checked)}
                        />
                        <span className="text-slate-400 text-xs font-semibold">{patient.id}</span>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="avatar bg-blue-100 text-blue-700 font-bold flex-shrink-0" style={{ width: '28px', height: '28px', fontSize: '10.5px' }}>
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="truncate">
                            <div className="font-semibold text-slate-800 text-xs truncate">{patient.name}</div>
                            <div className="text-[10px] text-slate-400 truncate">{patient.email}</div>
                          </div>
                        </div>
                        <span className="text-slate-600 text-xs">{patient.age}</span>
                        <span className="text-slate-600 text-xs truncate">{patient.phone}</span>
                        <span className="text-slate-600 text-xs truncate">{patient.lastVisit.split(',')[0]}</span>
                        
                        {/* Premium Doctor Column layout */}
                        <div className="flex items-center gap-2 min-w-0 pr-1">
                          <div className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center font-bold text-[9px] text-primary-600 border border-primary-100 flex-shrink-0">
                            {docName.split(',')[0].replace('Dr. ', '').substring(0, 2).toUpperCase()}
                          </div>
                          <div className="truncate">
                            <span className="text-xs text-slate-700 font-semibold block leading-none truncate">{docName.split(',')[0]}</span>
                            <span className="text-[9.5px] text-slate-400 leading-none truncate mt-0.5 block">{docName.split(',')[1] || 'Physician'}</span>
                          </div>
                        </div>

                        <span className={`badge ${
                          patient.condition.toLowerCase().includes('hypertension') ? 'badge-blue' :
                          patient.condition.toLowerCase().includes('diabetes') ? 'badge-teal' :
                          patient.condition.toLowerCase().includes('asthma') ? 'badge-gray' :
                          patient.condition.toLowerCase().includes('new') ? 'badge-blue' :
                          patient.condition.toLowerCase().includes('cardiac') ? 'badge-red' :
                          'badge-teal'
                        } text-[9.5px] w-fit`}>
                          {patient.condition}
                        </span>
                        <span className="text-xs font-semibold flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            riskLevel === 'High' ? 'bg-red-500' :
                            riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                          }`}></span>
                          <span className={
                            riskLevel === 'High' ? 'text-red-500' :
                            riskLevel === 'Medium' ? 'text-amber-500' : 'text-green-500'
                          }>{riskLevel}</span>
                        </span>
                        <span className={`badge ${
                          patient.status.toLowerCase() === 'active' ? 'badge-green' :
                          patient.status.toLowerCase() === 'follow-up' ? 'badge-amber' :
                          'badge-blue'
                        } text-[9.5px] w-fit`}>
                          {patient.status}
                        </span>
                        <div className="flex items-center justify-end gap-1.5 pr-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            className="btn-ghost p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                            onClick={() => handleViewPatient(patient.id)}
                          >
                            <Eye size={13} />
                          </button>

                          <button className="btn-ghost p-1 text-slate-400 hover:text-slate-700">
                            <MoreVertical size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-slate-400 text-xs">No patients match the filter criteria.</div>
                )}
              </div>
            </div>
          </div>
          
          {/* Table pagination footer controls */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/20 flex items-center justify-between text-[11px] text-slate-400 font-extrabold flex-shrink-0">
            <span>Showing 1 to {filteredPatients.length} of {filteredPatients.length} patients</span>
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
              <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
                <ChevronLeft size={14} />
              </button>
              <button className="w-6 h-6 bg-[#810B38] text-white rounded-lg flex items-center justify-center font-bold text-xs">1</button>
              <button className="w-6 h-6 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-center font-bold text-xs">2</button>
              <button className="w-6 h-6 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-center font-bold text-xs">3</button>
              <span className="px-1 text-slate-350">...</span>
              <button className="w-6 h-6 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-center font-bold text-xs">250</button>
              <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal Overlay */}
      {isRegModalOpen && (
        <div className="modal-overlay" onClick={() => setIsRegModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-sm tracking-wide">Register New Patient</h3>
              <button className="btn-ghost p-1 text-slate-400 hover:text-slate-600 rounded-lg" onClick={() => setIsRegModalOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4">
              <div>
                <label className="form-label text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} style={{ pointerEvents: 'none' }} />
                  <input
                    type="text"
                    required
                    className="form-input text-xs border-slate-200"
                    style={{ paddingLeft: '38px' }}
                    placeholder="e.g. John Doe"
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Age</label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} style={{ pointerEvents: 'none' }} />
                    <input
                      type="number"
                      className="form-input text-xs border-slate-200"
                      style={{ paddingLeft: '38px' }}
                      placeholder="e.g. 34"
                      value={newPatientAge}
                      onChange={(e) => setNewPatientAge(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Gender</label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} style={{ pointerEvents: 'none' }} />
                    <select
                      className="form-input form-select text-xs border-slate-200"
                      style={{ paddingLeft: '38px' }}
                      value={newPatientGender}
                      onChange={(e) => setNewPatientGender(e.target.value)}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} style={{ pointerEvents: 'none' }} />
                    <input
                      type="text"
                      required
                      className="form-input text-xs border-slate-200"
                      style={{ paddingLeft: '38px' }}
                      placeholder="e.g. 98765 43210"
                      value={newPatientPhone}
                      onChange={(e) => setNewPatientPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} style={{ pointerEvents: 'none' }} />
                    <input
                      type="email"
                      className="form-input text-xs border-slate-200"
                      style={{ paddingLeft: '38px' }}
                      placeholder="e.g. john@email.com"
                      value={newPatientEmail}
                      onChange={(e) => setNewPatientEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Chronic Condition</label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} style={{ pointerEvents: 'none' }} />
                    <select
                      className="form-input form-select text-xs border-slate-200"
                      style={{ paddingLeft: '38px' }}
                      value={newPatientCondition}
                      onChange={(e) => setNewPatientCondition(e.target.value)}
                    >
                      <option value="New Patient">New Patient</option>
                      <option value="Hypertension">Hypertension</option>
                      <option value="Diabetes T2">Diabetes T2</option>
                      <option value="Asthma">Asthma</option>
                      <option value="Cardiac Risk">Cardiac Risk</option>
                      <option value="Thyroid">Thyroid</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="form-label text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Risk Level</label>
                  <div className="relative">
                    <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} style={{ pointerEvents: 'none' }} />
                    <select
                      className="form-input form-select text-xs border-slate-200"
                      style={{ paddingLeft: '38px' }}
                      value={newPatientRisk}
                      onChange={(e) => setNewPatientRisk(e.target.value)}
                    >
                      <option value="Low">Low (Green)</option>
                      <option value="Medium">Medium (Orange)</option>
                      <option value="High">High (Red)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  className="btn-secondary text-xs font-bold py-2 px-4.5 rounded-xl cursor-pointer"
                  onClick={() => setIsRegModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs font-bold py-2 px-4.5 rounded-xl cursor-pointer"
                >
                  Save Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Patients;
