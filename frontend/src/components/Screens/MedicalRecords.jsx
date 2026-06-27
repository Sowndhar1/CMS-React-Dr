import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  FolderHeart,
  FileText,
  ScanLine,
  Clock,
  Eye,
  Download,
  Trash2,
  Calendar,
  User
} from 'lucide-react';

const MedicalRecords = () => {
  const { goBack } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Mock data for medical records
  const initialRecords = [
    { id: 'REC-2026-001', patientName: 'Amit Mehta', patientId: '#1042', docName: 'Discharge Summary - Cardiac Care', category: 'Discharge', date: '04 Jun 2026', doctor: 'Dr. Menon', status: 'Signed' },
    { id: 'REC-2026-002', patientName: 'Priya Desai', patientId: '#1048', docName: 'Lipid Profile Report', category: 'Lab Reports', date: '03 Jun 2026', doctor: 'Dr. Rajan', status: 'Signed' },
    { id: 'REC-2026-003', patientName: 'Rahul Kumar', patientId: '#1035', docName: 'Chest X-Ray Post-OP', category: 'Imaging', date: '01 Jun 2026', doctor: 'Dr. Sharma', status: 'Pending Review' },
    { id: 'REC-2026-004', patientName: 'Sunita Patel', patientId: '#1039', docName: 'Immunization Record', category: 'General', date: '28 May 2026', doctor: 'Dr. Rajan', status: 'Signed' },
    { id: 'REC-2026-005', patientName: 'Vilas Nair', patientId: '#1021', docName: 'Hypertension Clinical Summary', category: 'General', date: '25 May 2026', doctor: 'Dr. Menon', status: 'Signed' },
    { id: 'REC-2026-006', patientName: 'Meera Ghosh', patientId: '#1019', docName: 'MRI Brain Scan Report', category: 'Imaging', date: '20 May 2026', doctor: 'Dr. Iyer', status: 'Pending Review' },
    { id: 'REC-2026-007', patientName: 'Kavita Sharma', patientId: '#1015', docName: 'HbA1c Blood Sugar Log', category: 'Lab Reports', date: '18 May 2026', doctor: 'Dr. Rajan', status: 'Signed' }
  ];

  const [records, setRecords] = useState(initialRecords);

  const filteredRecords = records.filter(rec => {
    const matchesSearch = 
      rec.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.docName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || rec.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this record?')) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  return (
    <div className="screen-fade h-full overflow-hidden p-2 bg-transparent">
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
          <div>
            <h1 className="text-base font-bold text-slate-800">Medical Records</h1>

          </div>
        </div>

        <button className="btn-primary text-xs flex items-center gap-1.5 py-2 px-4 rounded-xl shadow-sm font-bold cursor-pointer">
          <Plus size={13} />
          <span>Upload Document</span>
        </button>
      </div>

      {/* KPI Cards Row — Premium Sparkline Style */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-shrink-0">

        {/* Total Records */}
        <div className="relative overflow-hidden bg-white ring-1 ring-slate-200 ring-inset border-0 rounded-2xl pt-3 px-3.5 pb-1 flex flex-col justify-between shadow-md hover:shadow-lg h-[105px] group hover:ring-cyan-400 hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex items-start gap-2.5">
            <div className="w-8.5 h-8.5 rounded-xl bg-cyan-50/80 flex items-center justify-center text-cyan-600 flex-shrink-0 mt-0.5">
              <FolderHeart size={15} />
            </div>
            <div className="min-w-0 leading-none">
              <p className="text-2xl font-black text-slate-800 leading-none">4,820</p>
              <p className="text-[10.5px] font-bold text-slate-500 mt-1 select-none leading-tight">Total Records</p>
              <p className="text-[8.5px] text-cyan-600 font-extrabold leading-none mt-0.5">+248 this month</p>
            </div>
          </div>
          <svg className="absolute bottom-0 left-0 right-0 h-5 w-full pointer-events-none overflow-hidden" viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mr-sparkline-total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0 28 C 15 22 30 30 45 18 C 60 8 75 20 90 12 L 100 10" fill="none" stroke="#06b6d4" strokeWidth="2" />
            <path d="M 0 28 C 15 22 30 30 45 18 C 60 8 75 20 90 12 L 100 10 L 100 40 L 0 40 Z" fill="url(#mr-sparkline-total)" />
          </svg>
        </div>

        {/* Added Today */}
        <div className="relative overflow-hidden bg-white ring-1 ring-slate-200 ring-inset border-0 rounded-2xl pt-3 px-3.5 pb-1 flex flex-col justify-between shadow-md hover:shadow-lg h-[105px] group hover:ring-teal-400 hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex items-start gap-2.5">
            <div className="w-8.5 h-8.5 rounded-xl bg-teal-50/80 flex items-center justify-center text-teal-600 flex-shrink-0 mt-0.5">
              <FileText size={15} />
            </div>
            <div className="min-w-0 leading-none">
              <p className="text-2xl font-black text-slate-800 leading-none">18</p>
              <p className="text-[10.5px] font-bold text-slate-500 mt-1 select-none leading-tight">Added Today</p>
              <p className="text-[8.5px] text-teal-600 font-extrabold leading-none mt-0.5">↑ vs 14 yesterday</p>
            </div>
          </div>
          <svg className="absolute bottom-0 left-0 right-0 h-5 w-full pointer-events-none overflow-hidden" viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mr-sparkline-today" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0 30 C 20 28 35 18 50 22 C 65 26 80 10 100 8" fill="none" stroke="#14b8a6" strokeWidth="2" />
            <path d="M 0 30 C 20 28 35 18 50 22 C 65 26 80 10 100 8 L 100 40 L 0 40 Z" fill="url(#mr-sparkline-today)" />
          </svg>
        </div>

        {/* Imaging & Scans */}
        <div className="relative overflow-hidden bg-white ring-1 ring-slate-200 ring-inset border-0 rounded-2xl pt-3 px-3.5 pb-1 flex flex-col justify-between shadow-md hover:shadow-lg h-[105px] group hover:ring-indigo-400 hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex items-start gap-2.5">
            <div className="w-8.5 h-8.5 rounded-xl bg-indigo-50/80 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5">
              <ScanLine size={15} />
            </div>
            <div className="min-w-0 leading-none">
              <p className="text-2xl font-black text-slate-800 leading-none">1,142</p>
              <p className="text-[10.5px] font-bold text-slate-500 mt-1 select-none leading-tight">Imaging & Scans</p>
              <p className="text-[8.5px] text-indigo-600 font-extrabold leading-none mt-0.5">23.7% of total</p>
            </div>
          </div>
          <svg className="absolute bottom-0 left-0 right-0 h-5 w-full pointer-events-none overflow-hidden" viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mr-sparkline-imaging" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0 22 C 18 30 35 12 55 20 C 72 28 85 14 100 16" fill="none" stroke="#6366f1" strokeWidth="2" />
            <path d="M 0 22 C 18 30 35 12 55 20 C 72 28 85 14 100 16 L 100 40 L 0 40 Z" fill="url(#mr-sparkline-imaging)" />
          </svg>
        </div>

        {/* Pending Review */}
        <div className="relative overflow-hidden bg-white ring-1 ring-slate-200 ring-inset border-0 rounded-2xl pt-3 px-3.5 pb-1 flex flex-col justify-between shadow-md hover:shadow-lg h-[105px] group hover:ring-orange-400 hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex items-start gap-2.5">
            <div className="w-8.5 h-8.5 rounded-xl bg-orange-50/80 flex items-center justify-center text-orange-600 flex-shrink-0 mt-0.5">
              <Clock size={15} />
            </div>
            <div className="min-w-0 leading-none">
              <p className="text-2xl font-black text-orange-600 leading-none">7</p>
              <p className="text-[10.5px] font-bold text-slate-500 mt-1 select-none leading-tight">Pending Review</p>
              <p className="text-[8.5px] text-orange-600 font-extrabold leading-none mt-0.5 animate-pulse">Needs attention</p>
            </div>
          </div>
          <svg className="absolute bottom-0 left-0 right-0 h-5 w-full pointer-events-none overflow-hidden" viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mr-sparkline-pending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0 15 C 20 25 40 10 60 20 C 78 30 88 18 100 22" fill="none" stroke="#f97316" strokeWidth="2" />
            <path d="M 0 15 C 20 25 40 10 60 20 C 78 30 88 18 100 22 L 100 40 L 0 40 Z" fill="url(#mr-sparkline-pending)" />
          </svg>
        </div>

      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} style={{ pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search records or patient name..."
            className="form-input py-2 bg-white text-xs rounded-xl border-slate-200"
            style={{ paddingLeft: '36px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">Category:</span>
          <select
            className="form-input form-select py-1.5 text-xs bg-white rounded-xl border-slate-200"
            style={{ width: '170px' }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Discharge">Discharge Summaries</option>
            <option value="Lab Reports">Lab Reports</option>
            <option value="Imaging">Imaging & Scans</option>
            <option value="General">General Records</option>
          </select>
        </div>
      </div>

      {/* Records Table Card */}
      <div className="section-card flex-1 flex flex-col overflow-hidden bg-white rounded-2xl ring-1 ring-slate-200 ring-inset border-0 shadow-md hover:shadow-lg min-h-0">
        <div className="overflow-x-auto flex-grow flex flex-col min-w-full">
          <div className="min-w-[850px] flex flex-col flex-1">
            <div className="table-head text-[10.5px] items-center flex-shrink-0" style={{ gridTemplateColumns: '1.2fr 2fr 1.2fr 1.2fr 1.2fr 1fr 1fr' }}>
              <span>Record ID</span>
              <span>Patient</span>
              <span>Document Name</span>
              <span>Category</span>
              <span>Date Added</span>
              <span>Status</span>
              <span className="text-right pr-4">Actions</span>
            </div>

            <div className="divide-y divide-slate-50 overflow-y-auto flex-grow">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((rec) => (
                  <div
                    key={rec.id}
                    className="table-row items-center py-3 hover:bg-slate-50/50"
                    style={{ gridTemplateColumns: '1.2fr 2fr 1.2fr 1.2fr 1.2fr 1fr 1fr' }}
                  >
                    <span className="text-slate-400 font-semibold text-xs">{rec.id}</span>
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="avatar bg-blue-50 text-blue-700 font-bold flex-shrink-0" style={{ width: '28px', height: '28px', fontSize: '10px' }}>
                        {rec.patientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="truncate">
                        <div className="font-semibold text-slate-800 text-xs truncate">{rec.patientName}</div>
                        <div className="text-[10px] text-slate-400">{rec.patientId}</div>
                      </div>
                    </div>
                    <span className="text-slate-700 text-xs font-medium truncate pr-2">{rec.docName}</span>
                    <span className={`badge ${
                      rec.category === 'Discharge' ? 'badge-red' :
                      rec.category === 'Lab Reports' ? 'badge-teal' :
                      rec.category === 'Imaging' ? 'badge-purple' :
                      'badge-gray'
                    } text-[9px] w-fit`}>
                      {rec.category}
                    </span>
                    <span className="text-slate-500 text-xs">{rec.date}</span>
                    <span className={`badge ${
                      rec.status === 'Signed' ? 'badge-green' : 'badge-amber'
                    } text-[9px] w-fit`}>
                      {rec.status}
                    </span>
                    <div className="flex items-center justify-end gap-1.5 pr-2">
                      <button className="btn-ghost p-1 text-slate-400 hover:text-slate-700 cursor-pointer" title="View Document">
                        <Eye size={14} />
                      </button>
                      <button className="btn-ghost p-1 text-slate-400 hover:text-slate-700 cursor-pointer" title="Download Document">
                        <Download size={14} />
                      </button>
                      <button 
                        className="btn-ghost p-1 text-slate-400 hover:text-red-600 cursor-pointer" 
                        title="Delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(rec.id);
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs">No medical records match the filter criteria.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MedicalRecords;
