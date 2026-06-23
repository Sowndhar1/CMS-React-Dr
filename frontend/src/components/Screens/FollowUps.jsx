import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Search,
  Filter,
  Plus,
  Phone,
  MessageSquare,
  Trash2,
  ChevronDown,
  MoreVertical,
  X,
  User,
  Activity
} from 'lucide-react';

const FollowUps = () => {
  const { goBack } = useApp();

  // Local Database of Follow-ups with current dates around June 2026
  const [followUps, setFollowUps] = useState([
    { id: '#1042', name: 'Amit Mehta', date: '2026-06-04', time: '10:00 AM', reason: 'Hypertension BP Checkup', phone: '98765 43210', doctor: 'Dr. Priya Sharma', status: 'Overdue', notes: 'Check if headache has subsided. BP needs monitoring.' },
    { id: '#1039', name: 'Sunita Patel', date: '2026-06-10', time: '11:30 AM', reason: 'Diabetes T2 Sugar Review', phone: '87654 32109', doctor: 'Dr. Neha Kapoor', status: 'Overdue', notes: 'Review blood sugar levels log and adjust insulin.' },
    { id: '#1035', name: 'Rahul Kumar', date: '2026-06-15', time: '02:00 PM', reason: 'Asthma Inhaler Post-check', phone: '76543 21098', doctor: 'Dr. Sandeep Rao', status: 'Pending', notes: 'Assess wheezing severity and inhaler usage.' },
    { id: '#1048', name: 'Priya Desai', date: '2026-06-12', time: '09:00 AM', reason: 'New Patient Onboarding', phone: '65432 10987', doctor: 'Dr. Priya Sharma', status: 'Pending', notes: 'Confirm routine lab test reports availability.' },
    { id: '#1021', name: 'Vijay Nair', date: '2026-06-05', time: '04:30 PM', reason: 'Cardiac Risk Level Review', phone: '54321 09876', doctor: 'Dr. Priya Sharma', status: 'Completed', notes: 'Patient reported normal levels; statins adjusted.' },
    { id: '#1019', name: 'Meera Ghosh', date: '2026-06-10', time: '12:00 PM', reason: 'Skin Allergy Lotion Follow Up', phone: '43210 98765', doctor: 'Dr. Amit Verma', status: 'Completed', notes: 'Itchiness cleared after contact allergy lotion course.' },
    { id: '#1015', name: 'Kavita Sharma', date: '2026-06-08', time: '11:00 AM', reason: 'Thyroid TSH Level Review', phone: '32109 87654', doctor: 'Dr. Neha Kapoor', status: 'Completed', notes: 'Thyroxine dosage maintained. Next follow-up in 3 months.' }
  ]);

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);

  // New Follow-up fields
  const [newFollowUp, setNewFollowUp] = useState({
    name: '',
    id: '',
    date: '2026-06-12',
    time: '10:00 AM',
    reason: '',
    phone: '',
    doctor: 'Dr. Priya Sharma',
    notes: ''
  });

  const doctorsList = [
    'Dr. Priya Sharma',
    'Dr. Amit Verma',
    'Dr. Neha Kapoor',
    'Dr. Sandeep Rao'
  ];

  // Dynamic counts based on full db
  const totalCount = followUps.length;
  const completedCount = followUps.filter(f => f.status === 'Completed').length;
  const pendingCount = followUps.filter(f => f.status === 'Pending').length;
  const overdueCount = followUps.filter(f => f.status === 'Overdue').length;

  // Handlers
  const handleMarkComplete = (index) => {
    const updated = [...followUps];
    updated[index].status = 'Completed';
    setFollowUps(updated);
    showActionToast(`Marked follow-up for ${updated[index].name} as completed!`);
  };

  const handleCall = (name, phone) => {
    showActionToast(`📞 Simulating call to ${name} at +91 ${phone}...`);
  };

  const handleSendSMS = (name, phone) => {
    showActionToast(`💬 Simulating SMS dispatch to ${name} (+91 ${phone}): "Hi ${name}, this is a reminder for your upcoming follow-up visit..."`);
  };

  const handleDelete = (index) => {
    const updated = followUps.filter((_, i) => i !== index);
    setFollowUps(updated);
    showActionToast(`Follow-up log deleted.`);
  };

  const showActionToast = (msg) => {
    setActionMessage(msg);
    setTimeout(() => {
      setActionMessage(null);
    }, 4500);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!newFollowUp.name || !newFollowUp.phone || !newFollowUp.reason) {
      alert('Please fill out Name, Phone, and Reason.');
      return;
    }

    const calculatedId = newFollowUp.id ? (newFollowUp.id.startsWith('#') ? newFollowUp.id : `#${newFollowUp.id}`) : `#${Math.floor(1000 + Math.random() * 9000)}`;
    const todayStr = '2026-06-12';
    const status = newFollowUp.date < todayStr ? 'Overdue' : 'Pending';

    const newItem = {
      id: calculatedId,
      name: newFollowUp.name,
      date: newFollowUp.date,
      time: newFollowUp.time,
      reason: newFollowUp.reason,
      phone: newFollowUp.phone,
      doctor: newFollowUp.doctor,
      status: status,
      notes: newFollowUp.notes || 'No notes added.'
    };

    setFollowUps([newItem, ...followUps]);
    setShowModal(false);
    showActionToast(`Successfully scheduled new follow-up for ${newFollowUp.name}!`);

    // reset form
    setNewFollowUp({
      name: '',
      id: '',
      date: '2026-06-12',
      time: '10:00 AM',
      reason: '',
      phone: '',
      doctor: 'Dr. Priya Sharma',
      notes: ''
    });
  };

  // Filter lists
  const filteredFollowUps = followUps.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="screen-fade h-full overflow-y-auto p-5 flex flex-col gap-5 bg-slate-50/70">

      {/* Action Simulation Toast Notification */}
      {actionMessage && (
        <div className="fixed top-4 right-4 bg-slate-900 text-white text-xs font-semibold px-4 py-3.5 rounded-2xl shadow-xl z-50 animate-fadeIn max-w-sm flex items-center gap-3 border border-white/10">
          <Activity size={16} className="text-[#F1E2D1] animate-pulse" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Header Row */}
      <div className="flex flex-row items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            className="btn-ghost p-1 rounded-lg text-slate-500 hover:text-slate-800 cursor-pointer"
            onClick={goBack}
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-800">Patient Follow Ups</h1>
            <p className="text-[11px] text-slate-400 mt-0.5">Post-consultation tracking</p>
          </div>
        </div>

        <button
          className="btn-primary text-xs py-2 flex items-center gap-1.5 text-white shadow-sm font-semibold rounded-lg flex-shrink-0 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <Plus size={14} />
          <span>Schedule Follow Up</span>
        </button>
      </div>

      {/* Metric Cards Row — Premium Sparkline Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-shrink-0">

        {/* Total Active */}
        <div className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl pt-3 px-3.5 pb-1 flex flex-col justify-between shadow-xs h-[105px] group hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex items-start gap-2.5">
            <div className="w-8.5 h-8.5 rounded-xl bg-slate-100/80 flex items-center justify-center text-slate-600 flex-shrink-0 mt-0.5">
              <Clock size={15} />
            </div>
            <div className="min-w-0 leading-none">
              <p className="text-2xl font-black text-slate-800 leading-none">{totalCount}</p>
              <p className="text-[10.5px] font-bold text-slate-500 mt-1 select-none leading-tight">Total Follow-Ups</p>
              <p className="text-[8.5px] text-slate-500 font-semibold leading-none mt-0.5">Overall records</p>
            </div>
          </div>
          <svg className="absolute bottom-0 left-0 right-0 h-5 w-full pointer-events-none overflow-hidden" viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fu-sparkline-total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#64748b" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#64748b" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0 26 C 18 20 35 28 52 18 C 68 10 82 22 100 16" fill="none" stroke="#64748b" strokeWidth="2" />
            <path d="M 0 26 C 18 20 35 28 52 18 C 68 10 82 22 100 16 L 100 40 L 0 40 Z" fill="url(#fu-sparkline-total)" />
          </svg>
        </div>

        {/* Completed */}
        <div className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl pt-3 px-3.5 pb-1 flex flex-col justify-between shadow-xs h-[105px] group hover:border-emerald-400 hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex items-start gap-2.5">
            <div className="w-8.5 h-8.5 rounded-xl bg-emerald-50/80 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
              <CheckCircle size={15} />
            </div>
            <div className="min-w-0 leading-none">
              <p className="text-2xl font-black text-slate-800 leading-none">{completedCount}</p>
              <p className="text-[10.5px] font-bold text-slate-500 mt-1 select-none leading-tight">Completed</p>
              <p className="text-[8.5px] text-emerald-600 font-extrabold leading-none mt-0.5">
                {totalCount ? Math.round((completedCount / totalCount) * 100) : 0}% completion rate
              </p>
            </div>
          </div>
          <svg className="absolute bottom-0 left-0 right-0 h-5 w-full pointer-events-none overflow-hidden" viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fu-sparkline-completed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0 28 C 22 24 40 16 58 20 C 74 24 88 12 100 10" fill="none" stroke="#10b981" strokeWidth="2" />
            <path d="M 0 28 C 22 24 40 16 58 20 C 74 24 88 12 100 10 L 100 40 L 0 40 Z" fill="url(#fu-sparkline-completed)" />
          </svg>
        </div>

        {/* Pending */}
        <div className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl pt-3 px-3.5 pb-1 flex flex-col justify-between shadow-xs h-[105px] group hover:border-amber-400 hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex items-start gap-2.5">
            <div className="w-8.5 h-8.5 rounded-xl bg-amber-50/80 flex items-center justify-center text-amber-600 flex-shrink-0 mt-0.5">
              <Calendar size={15} />
            </div>
            <div className="min-w-0 leading-none">
              <p className="text-2xl font-black text-slate-800 leading-none">{pendingCount}</p>
              <p className="text-[10.5px] font-bold text-slate-500 mt-1 select-none leading-tight">Pending</p>
              <p className="text-[8.5px] text-amber-600 font-extrabold leading-none mt-0.5">Needs call / reminder</p>
            </div>
          </div>
          <svg className="absolute bottom-0 left-0 right-0 h-5 w-full pointer-events-none overflow-hidden" viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fu-sparkline-pending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0 18 C 20 24 38 16 55 22 C 72 28 86 18 100 20" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <path d="M 0 18 C 20 24 38 16 55 22 C 72 28 86 18 100 20 L 100 40 L 0 40 Z" fill="url(#fu-sparkline-pending)" />
          </svg>
        </div>

        {/* Overdue */}
        <div className="relative overflow-hidden bg-white border border-rose-200 rounded-2xl pt-3 px-3.5 pb-1 flex flex-col justify-between shadow-xs h-[105px] group hover:border-rose-400 hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex items-start gap-2.5">
            <div className="w-8.5 h-8.5 rounded-xl bg-rose-50/80 flex items-center justify-center text-rose-600 flex-shrink-0 mt-0.5">
              <AlertCircle size={15} />
            </div>
            <div className="min-w-0 leading-none">
              <p className="text-2xl font-black text-rose-600 leading-none">{overdueCount}</p>
              <p className="text-[10.5px] font-bold text-slate-500 mt-1 select-none leading-tight">Overdue</p>
              <p className="text-[8.5px] text-rose-600 font-extrabold leading-none mt-0.5 animate-pulse">⚠ Needs immediate action</p>
            </div>
          </div>
          <svg className="absolute bottom-0 left-0 right-0 h-5 w-full pointer-events-none overflow-hidden" viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fu-sparkline-overdue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0 12 C 15 20 30 14 48 22 C 64 30 80 18 100 24" fill="none" stroke="#f43f5e" strokeWidth="2" />
            <path d="M 0 12 C 15 20 30 14 48 22 C 64 30 80 18 100 24 L 100 40 L 0 40 Z" fill="url(#fu-sparkline-overdue)" />
          </svg>
        </div>

      </div>

      {/* Main Table Container */}
      <div className="section-card bg-white flex flex-col flex-1 overflow-hidden rounded-2xl border border-slate-200 shadow-sm min-h-0">

        {/* Table Filters Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/30 flex-shrink-0">

          {/* Search box */}
          <div className="relative w-full sm:w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={13} style={{ pointerEvents: 'none' }} />
            </span>
            <input
              type="text"
              className="form-input text-slate-700 bg-white font-semibold border-slate-200 hover:border-slate-300 transition text-xs py-2 shadow-sm rounded-lg"
              style={{ paddingLeft: '32px' }}
              placeholder="Search by Patient name, ID, or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[10px]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Tab Filter switcher */}
          <div className="bg-slate-200/60 p-0.5 rounded-lg flex gap-0.5 flex-shrink-0">
            {['All', 'Pending', 'Overdue', 'Completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`text-xs py-1.5 px-3 rounded-md font-semibold transition flex-shrink-0 cursor-pointer ${statusFilter === tab
                    ? 'bg-white text-primary-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

        </div>

        {/* Table Body Area */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Patient ID & Name</th>
                <th className="py-3 px-4">Phone Number</th>
                <th className="py-3 px-4">Follow-up Reason</th>
                <th className="py-3 px-4">Scheduled Date</th>
                <th className="py-3 px-4">Assigned Specialist</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFollowUps.length > 0 ? (
                filteredFollowUps.map((item, idx) => {
                  // Find index in main database list to manage operations
                  const dbIndex = followUps.findIndex(f => f.id === item.id && f.date === item.date);

                  return (
                    <tr key={idx} className="hover:bg-slate-50/40 text-xs text-slate-700 transition-colors group">
                      {/* Patient profile column */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-[#810B38] font-bold flex items-center justify-center text-[10px]">
                            {item.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{item.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Phone column */}
                      <td className="py-3 px-4 font-semibold font-sans text-slate-650">
                        +91 {item.phone}
                      </td>

                      {/* Reason & Notes column */}
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-bold text-slate-750">{item.reason}</p>
                          <p className="text-[10px] text-slate-400 truncate max-w-xs mt-0.5" title={item.notes}>
                            {item.notes}
                          </p>
                        </div>
                      </td>

                      {/* Date & Time column */}
                      <td className="py-3 px-4 font-semibold text-slate-700">
                        <div>
                          <p>{item.date}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{item.time}</p>
                        </div>
                      </td>

                      {/* Doctor column */}
                      <td className="py-3 px-4 text-slate-600 font-medium">
                        {item.doctor}
                      </td>

                      {/* Status badges */}
                      <td className="py-3 px-4 text-center">
                        <span className={`badge ${item.status === 'Completed' ? 'badge-green' :
                            item.status === 'Overdue' ? 'badge-red' : 'badge-amber'
                          }`}>
                          {item.status}
                        </span>
                      </td>

                      {/* Quick action buttons */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">

                          {/* Call Button */}
                          <button
                            onClick={() => handleCall(item.name, item.phone)}
                            className="p-1.5 hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700 rounded-lg cursor-pointer"
                            title="Call Patient"
                          >
                            <Phone size={13.5} />
                          </button>

                          {/* SMS Button */}
                          <button
                            onClick={() => handleSendSMS(item.name, item.phone)}
                            className="p-1.5 hover:bg-blue-50 text-blue-600 hover:text-blue-700 rounded-lg cursor-pointer"
                            title="Send SMS Reminder"
                          >
                            <MessageSquare size={13.5} />
                          </button>

                          {/* Mark Complete Button (only if not completed) */}
                          {item.status !== 'Completed' && (
                            <button
                              onClick={() => handleMarkComplete(dbIndex)}
                              className="p-1.5 hover:bg-[#F1E2D1] text-[#810B38] rounded-lg cursor-pointer"
                              title="Mark Complete"
                            >
                              <CheckCircle size={13.5} />
                            </button>
                          )}

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(dbIndex)}
                            className="p-1.5 hover:bg-rose-50 text-red-500 hover:text-red-700 rounded-lg cursor-pointer"
                            title="Remove Log"
                          >
                            <Trash2 size={13.5} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-slate-400 text-xs font-semibold">
                    No matching follow ups found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer data counter */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between text-[11px] text-slate-400 font-bold flex-shrink-0">
          <span>Showing {filteredFollowUps.length} of {followUps.length} records</span>
          <span>Filtered: {statusFilter}</span>
        </div>

      </div>

      {/* Schedule Follow-up Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 animate-fadeIn backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col border border-slate-100">

            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-[#810B38] text-white">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#F1E2D1]" />
                <h3 className="text-sm font-extrabold tracking-tight">Schedule Patient Follow Up</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-lg cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleScheduleSubmit} className="p-5 flex flex-col gap-3.5">

              <div>
                <label className="form-label">Patient Name *</label>
                <input
                  type="text"
                  required
                  className="form-input text-xs"
                  placeholder="e.g. Amit Mehta"
                  value={newFollowUp.name}
                  onChange={(e) => setNewFollowUp({ ...newFollowUp, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Patient ID (Optional)</label>
                  <input
                    type="text"
                    className="form-input text-xs"
                    placeholder="e.g. #1042"
                    value={newFollowUp.id}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, id: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="text"
                    required
                    className="form-input text-xs"
                    placeholder="e.g. 98765 43210"
                    value={newFollowUp.phone}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Scheduled Date *</label>
                  <input
                    type="date"
                    required
                    className="form-input text-xs"
                    value={newFollowUp.date}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Time Slot *</label>
                  <input
                    type="text"
                    required
                    className="form-input text-xs"
                    placeholder="e.g. 10:00 AM"
                    value={newFollowUp.time}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, time: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="form-label">Assigned Doctor</label>
                  <select
                    className="form-input form-select text-xs"
                    value={newFollowUp.doctor}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, doctor: e.target.value })}
                  >
                    {doctorsList.map(doc => (
                      <option key={doc} value={doc}>{doc}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Follow-up Reason *</label>
                  <input
                    type="text"
                    required
                    className="form-input text-xs"
                    placeholder="e.g. BP Tracking, Asthmatic post check"
                    value={newFollowUp.reason}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, reason: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Special Notes</label>
                <textarea
                  rows="2"
                  className="form-input text-xs py-2 h-14 resize-none"
                  placeholder="e.g. Adjust medicine dose if patient complains of headache."
                  value={newFollowUp.notes}
                  onChange={(e) => setNewFollowUp({ ...newFollowUp, notes: e.target.value })}
                />
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3.5 mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary text-xs py-2 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#810B38] hover:bg-[#6B082D] text-white rounded-xl text-xs font-bold shadow-sm transition-all duration-200 cursor-pointer"
                >
                  Log Follow Up
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default FollowUps;
