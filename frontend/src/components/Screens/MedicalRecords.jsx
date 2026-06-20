import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  FolderHeart,
  FileText,
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
    <div className="screen-fade h-full overflow-hidden p-4 flex flex-col gap-4 bg-slate-50/50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            className="btn-ghost p-1 rounded-lg text-slate-500 hover:text-slate-800 cursor-pointer"
            onClick={goBack}
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-base font-bold text-slate-800">Medical Records</h1>
        </div>

        <button className="btn-primary text-xs flex items-center gap-1.5 py-2 cursor-pointer">
          <Plus size={13} />
          <span>Upload Document</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-shrink-0">
        <div className="stat-card flex items-center gap-4 py-3 px-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
            <FolderHeart size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Records</p>
            <p className="text-lg font-bold text-slate-800 mt-0.5">4,820</p>
          </div>
        </div>

        <div className="stat-card flex items-center gap-4 py-3 px-4">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Added Today</p>
            <p className="text-lg font-bold text-slate-800 mt-0.5">18</p>
          </div>
        </div>

        <div className="stat-card flex items-center gap-4 py-3 px-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
            <Eye size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Imaging & Scans</p>
            <p className="text-lg font-bold text-slate-800 mt-0.5">1,142</p>
          </div>
        </div>

        <div className="stat-card flex items-center gap-4 py-3 px-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Review</p>
            <p className="text-lg font-bold text-slate-800 mt-0.5">7</p>
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} style={{ pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search records or patient name..."
            className="form-input py-2 bg-white text-xs"
            style={{ paddingLeft: '36px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Category:</span>
          <select
            className="form-input form-select py-1.5 text-xs bg-white"
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
      <div className="section-card flex-1 flex flex-col overflow-hidden bg-white">
        <div className="table-head text-[10.5px] items-center" style={{ gridTemplateColumns: '1.2fr 2fr 1.2fr 1.2fr 1.2fr 1fr 1fr' }}>
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
                    <Eye size={13} />
                  </button>
                  <button className="btn-ghost p-1 text-slate-400 hover:text-slate-700 cursor-pointer" title="Download Document">
                    <Download size={13} />
                  </button>
                  <button 
                    className="btn-ghost p-1 text-slate-400 hover:text-red-600 cursor-pointer" 
                    title="Delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(rec.id);
                    }}
                  >
                    <Trash2 size={13} />
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
  );
};

export default MedicalRecords;
