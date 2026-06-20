import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Search,
  Plus,
  FlaskConical,
  Clock,
  CalendarCheck,
  Eye,
  Printer,
  Calendar,
  AlertTriangle,
  Check
} from 'lucide-react';

const LabReports = () => {
  const { goBack } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Mock data for lab reports
  const initialLabTests = [
    { id: 'LAB-2026-101', patientName: 'Amit Mehta', patientId: '#1042', testName: 'HbA1c (Glycated Hemoglobin)', value: '8.4 %', refRange: '4.0 - 5.6 %', flag: 'High', date: '04 Jun 2026', doctor: 'Dr. Rajan', status: 'Completed' },
    { id: 'LAB-2026-102', patientName: 'Priya Desai', patientId: '#1048', testName: 'Lipid Profile (Cholesterol)', value: '235 mg/dL', refRange: '< 200 mg/dL', flag: 'High', date: '03 Jun 2026', doctor: 'Dr. Menon', status: 'Completed' },
    { id: 'LAB-2026-103', patientName: 'Rahul Kumar', patientId: '#1035', testName: 'CBC (Complete Blood Count)', value: 'Pending', refRange: 'N/A', flag: 'Normal', date: '02 Jun 2026', doctor: 'Dr. Sharma', status: 'Pending' },
    { id: 'LAB-2026-104', patientName: 'Sunita Patel', patientId: '#1039', testName: 'Thyroid Panel (TSH)', value: '4.2 uIU/mL', refRange: '0.4 - 4.5 uIU/mL', flag: 'Normal', date: '28 May 2026', doctor: 'Dr. Rajan', status: 'Completed' },
    { id: 'LAB-2026-105', patientName: 'Vilas Nair', patientId: '#1021', testName: 'Serum Potassium', value: '6.1 mEq/L', refRange: '3.5 - 5.0 mEq/L', flag: 'Critical', date: '25 May 2026', doctor: 'Dr. Menon', status: 'Completed' },
    { id: 'LAB-2026-106', patientName: 'Meera Ghosh', patientId: '#1019', docName: 'Liver Function Test', testName: 'ALT/AST Panel', value: '45 U/L', refRange: '7 - 56 U/L', flag: 'Normal', date: '20 May 2026', doctor: 'Dr. Iyer', status: 'Completed' },
    { id: 'LAB-2026-107', patientName: 'Kavita Sharma', patientId: '#1015', testName: 'Renal Function Test (Creatinine)', value: '1.2 mg/dL', refRange: '0.6 - 1.2 mg/dL', flag: 'Normal', date: '18 May 2026', doctor: 'Dr. Rajan', status: 'Completed' }
  ];

  const [labTests, setLabTests] = useState(initialLabTests);

  const filteredTests = labTests.filter(test => {
    const matchesSearch = 
      test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'All' || 
      test.status === statusFilter || 
      (statusFilter === 'Critical' && test.flag === 'Critical');

    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-base font-bold text-slate-800">Lab Reports</h1>
        </div>

        <button className="btn-primary text-xs flex items-center gap-1.5 py-2 cursor-pointer">
          <Plus size={13} />
          <span>New Lab Order</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-shrink-0">
        <div className="stat-card flex items-center gap-4 py-3 px-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
            <FlaskConical size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Tests</p>
            <p className="text-lg font-bold text-slate-800 mt-0.5">1,489</p>
          </div>
        </div>

        <div className="stat-card flex items-center gap-4 py-3 px-4">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
            <CalendarCheck size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed</p>
            <p className="text-lg font-bold text-slate-800 mt-0.5">1,412</p>
          </div>
        </div>

        <div className="stat-card flex items-center gap-4 py-3 px-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Results</p>
            <p className="text-lg font-bold text-slate-800 mt-0.5">53</p>
          </div>
        </div>

        <div className="stat-card flex items-center gap-4 py-3 px-4 bg-red-50/20 border-red-100">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-red-700/60 uppercase tracking-wider">Critical Values</p>
            <p className="text-lg font-bold text-red-600 mt-0.5">24</p>
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} style={{ pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search test name or patient name..."
            className="form-input py-2 bg-white text-xs"
            style={{ paddingLeft: '36px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Filter Status:</span>
          <select
            className="form-input form-select py-1.5 text-xs bg-white"
            style={{ width: '150px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Tests</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Critical">Critical Alerts</option>
          </select>
        </div>
      </div>

      {/* Lab Reports Table Card */}
      <div className="section-card flex-1 flex flex-col overflow-hidden bg-white">
        <div className="table-head text-[10.5px] items-center" style={{ gridTemplateColumns: '1.2fr 2fr 2fr 1.2fr 1.2fr 1.2fr 1fr' }}>
          <span>Report ID</span>
          <span>Patient</span>
          <span>Test Name</span>
          <span>Result Value</span>
          <span>Reference Range</span>
          <span>Status / Alert</span>
          <span className="text-right pr-4">Actions</span>
        </div>

        <div className="divide-y divide-slate-50 overflow-y-auto flex-grow">
          {filteredTests.length > 0 ? (
            filteredTests.map((test) => (
              <div
                key={test.id}
                className="table-row items-center py-3 hover:bg-slate-50/50"
                style={{ gridTemplateColumns: '1.2fr 2fr 2fr 1.2fr 1.2fr 1.2fr 1fr' }}
              >
                <span className="text-slate-400 font-semibold text-xs">{test.id}</span>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="avatar bg-blue-50 text-blue-700 font-bold flex-shrink-0" style={{ width: '28px', height: '28px', fontSize: '10px' }}>
                    {test.patientName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="truncate">
                    <div className="font-semibold text-slate-800 text-xs truncate">{test.patientName}</div>
                    <div className="text-[10px] text-slate-400">{test.patientId}</div>
                  </div>
                </div>
                <span className="text-slate-700 text-xs font-semibold truncate pr-2">{test.testName}</span>
                <span className={`text-xs font-bold ${
                  test.flag === 'Critical' ? 'text-red-600' :
                  test.flag === 'High' ? 'text-amber-600' : 'text-slate-700'
                }`}>{test.value}</span>
                <span className="text-slate-500 text-xs">{test.refRange}</span>
                <span className={`badge ${
                  test.flag === 'Critical' ? 'badge-red' :
                  test.status === 'Pending' ? 'badge-amber' :
                  test.flag === 'High' ? 'badge-amber' : 'badge-green'
                } text-[9px] w-fit font-bold`}>
                  {test.flag === 'Critical' ? 'Critical' : test.status}
                </span>
                <div className="flex items-center justify-end gap-1.5 pr-2">
                  <button className="btn-ghost p-1 text-slate-400 hover:text-slate-700 cursor-pointer" title="View Report">
                    <Eye size={13} />
                  </button>
                  <button className="btn-ghost p-1 text-slate-400 hover:text-slate-700 cursor-pointer" title="Print Report">
                    <Printer size={13} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">No lab reports match the filter criteria.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabReports;
