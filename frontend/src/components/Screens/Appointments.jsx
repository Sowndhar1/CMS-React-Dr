import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar,
  Download,
  MoreVertical,
  Clock,
  MapPin,
  Coffee,
  Check,
  Search,
  Trash2,
  User,
  AlertCircle,
  X
} from 'lucide-react';

const Appointments = () => {
  const {
    patients,
    showScreen,
    goBack,
    setSelectedPatientId,
    appointments,
    addAppointment,
    updateAppointmentStatus,
    deleteAppointment
  } = useApp();

  // Local navigation & view states
  const [scheduleView, setScheduleView] = useState('Day'); // Day, Week, Month
  const [selectedDoctor, setSelectedDoctor] = useState('All Doctors');
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 5, 8)); // Mon, 8 Jun 2026
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  // Date Picker visibility state
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    patientId: '',
    guestName: '',
    doctor: 'Dr. Rajan Kumar',
    date: '2026-06-08',
    timeSlot: '10:30',
    visitType: 'Consultation',
    reason: ''
  });

  const menuRef = useRef(null);

  // Close card actions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format date utility
  const formatDateStr = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const selectedDateStr = formatDateStr(selectedDate);
  const todayStr = formatDateStr(new Date());

  // Date formatted for Header display (e.g. "Mon, 8 Jun 2026")
  const getHeaderDateLabel = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Shift date actions
  const handlePrevDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleSetToday = () => {
    setSelectedDate(new Date(2026, 5, 8)); // Mockup standard date June 8, 2026, or use actual new Date()
  };

  // Filter appointments by Doctor and Date
  const filteredAppointments = (appointments || []).filter((apt) => {
    const matchesDate = apt.date === selectedDateStr;
    const matchesDoctor = selectedDoctor === 'All Doctors' || apt.doctor === selectedDoctor;
    return matchesDate && matchesDoctor;
  });

  // Calculate top horizontal statistics dynamically
  const statsTotal = filteredAppointments.length;
  const statsCompleted = filteredAppointments.filter((a) => a.status === 'Completed').length;
  const statsWaiting = filteredAppointments.filter((a) => a.status === 'Waiting').length;
  const statsUrgent = filteredAppointments.filter((a) => a.status === 'Urgent').length;
  const statsNoShows = filteredAppointments.filter((a) => a.status === 'No Show').length;

  // Patient detail redirection helper
  const handleViewPatient = (id) => {
    if (id && id.startsWith('#')) {
      setSelectedPatientId(id);
      showScreen('patientdetail');
    }
  };

  // Generate CSV download
  const handleExportCSV = () => {
    if (filteredAppointments.length === 0) {
      alert('No appointments to export for the current filters.');
      return;
    }
    const headers = ['Appointment ID', 'Patient ID', 'Patient Name', 'Date', 'Time Slot', 'Doctor', 'Room', 'Visit Type', 'Reason', 'Status'];
    const rows = filteredAppointments.map((a) => [
      a.id,
      a.patientId || 'N/A',
      a.patientName,
      a.date,
      a.startTime,
      a.doctor,
      a.room,
      a.type,
      a.reason.replace(/,/g, ' ·'),
      a.status
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Appointments_${selectedDateStr}_${selectedDoctor.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Action status changes
  const handleUpdateStatus = (id, status) => {
    updateAppointmentStatus(id, status);
    setActiveMenuId(null);
  };

  const handleDeleteApt = (id) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      deleteAppointment(id);
      setActiveMenuId(null);
    }
  };

  // Booking Modal Logic
  const openBookingModal = (prefilledTime = null) => {
    setBookingForm({
      patientId: patients && patients.length > 0 ? patients[0].id : '',
      guestName: '',
      doctor: selectedDoctor !== 'All Doctors' ? selectedDoctor : 'Dr. Rajan Kumar',
      date: selectedDateStr,
      timeSlot: prefilledTime || '10:30',
      visitType: 'Consultation',
      reason: ''
    });
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    let name = '';
    let pId = bookingForm.patientId;
    
    if (pId === 'guest') {
      name = bookingForm.guestName.trim() || 'Guest Patient';
      pId = `#G${Math.floor(1000 + Math.random() * 9000)}`;
    } else {
      const selectedPt = patients.find((p) => p.id === pId);
      name = selectedPt ? selectedPt.name : 'Unknown Patient';
    }

    const doctorRooms = {
      'Dr. Rajan Kumar': 'Room 203',
      'Dr. Mehta': 'Room 101',
      'Dr. Sharma': 'Room 102'
    };

    const newApt = {
      id: `apt-${Math.floor(100000 + Math.random() * 900000)}`,
      patientId: pId,
      patientName: name,
      time: `${bookingForm.timeSlot} - ${(() => {
        const [h, m] = bookingForm.timeSlot.split(':').map(Number);
        const total = h * 60 + m + 20; // 20 min slot
        const fh = Math.floor(total / 60);
        const fm = total % 60;
        return `${String(fh).padStart(2, '0')}:${String(fm).padStart(2, '0')}`;
      })()}`,
      startTime: bookingForm.timeSlot,
      endTime: (() => {
        const [h, m] = bookingForm.timeSlot.split(':').map(Number);
        const total = h * 60 + m + 20;
        const fh = Math.floor(total / 60);
        const fm = total % 60;
        return `${String(fh).padStart(2, '0')}:${String(fm).padStart(2, '0')}`;
      })(),
      duration: 20,
      date: bookingForm.date,
      doctor: bookingForm.doctor,
      room: doctorRooms[bookingForm.doctor] || 'Room 203',
      reason: bookingForm.reason || 'Consultation',
      type: bookingForm.visitType,
      status: 'Scheduled'
    };

    addAppointment(newApt);
    setIsBookingModalOpen(false);
  };

  // Find next upcoming patient details for Right Sidebar
  // Sorted chronologically, status is In Progress, Waiting, or Scheduled
  const todaySorted = [...filteredAppointments].sort((a, b) => a.startTime.localeCompare(b.startTime));
  
  const upcomingAppointment = todaySorted.find(
    (a) => a.status === 'In Progress' || a.status === 'Waiting' || a.status === 'Scheduled'
  );

  // Available Slots configuration (9:00 AM to 5:00 PM, excluding lunch hour 12:00–14:00)
  const standardSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:50',
    '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  // Helper to check if slot is booked for the currently filtered/selected doctor
  const isSlotBooked = (slotTime) => {
    return filteredAppointments.some((apt) => apt.startTime === slotTime && apt.status !== 'Completed');
  };

  // Render initials badge helper
  const getInitials = (name) => {
    if (!name) return 'PT';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Color helper functions based on visit type
  const getBadgeColorClass = (type) => {
    switch (type) {
      case 'New Patient': return 'bg-purple-100 text-purple-700';
      case 'Follow-up': return 'bg-blue-100 text-blue-700';
      case 'Consultation': return 'bg-emerald-100 text-emerald-700';
      case 'Emergency': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getBorderColorClass = (status) => {
    switch (status) {
      case 'In Progress': return 'border-blue-500';
      case 'Waiting': return 'border-amber-500';
      case 'Scheduled': return 'border-slate-300';
      case 'Urgent': return 'border-rose-500';
      case 'Completed': return 'border-emerald-500';
      case 'No Show': return 'border-purple-400';
      default: return 'border-slate-200';
    }
  };

  const getAvatarColorClass = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-600';
      case 'Waiting': return 'bg-amber-100 text-amber-600';
      case 'Scheduled': return 'bg-slate-100 text-slate-500';
      case 'Urgent': return 'bg-rose-100 text-rose-600';
      case 'Completed': return 'bg-emerald-100 text-emerald-600';
      case 'No Show': return 'bg-purple-100 text-purple-600';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  const getCardBgColorClass = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-50/40 hover:bg-blue-50/70 border border-blue-100';
      case 'Waiting': return 'bg-amber-50/40 hover:bg-amber-50/70 border border-amber-100';
      case 'Urgent': return 'bg-rose-50/40 hover:bg-rose-50/70 border border-rose-100';
      case 'Completed': return 'bg-emerald-50/20 hover:bg-emerald-50/40 border border-emerald-100/40';
      case 'No Show': return 'bg-purple-50/30 hover:bg-purple-50/50 border border-purple-100/35';
      default: return 'bg-slate-50/30 hover:bg-slate-50/60 border border-slate-100';
    }
  };

  // Convert "09:00" to "09:00 AM" for display
  const formatTimeLabel = (timeStr) => {
    if (!timeStr) return '';
    if (timeStr.includes('AM') || timeStr.includes('PM')) return timeStr;
    const [h, m] = timeStr.split(':');
    const hr = parseInt(h);
    const ampm = hr >= 12 ? 'PM' : 'AM';
    const formattedHr = hr % 12 === 0 ? 12 : hr % 12;
    return `${String(formattedHr).padStart(2, '0')}:${m} ${ampm}`;
  };

  // Prepare chronological list of Day Schedule elements
  const timelineItems = [];
  
  // Add appointments to timeline
  todaySorted.forEach((apt) => {
    timelineItems.push({
      type: 'appointment',
      timeLabel: formatTimeLabel(apt.startTime),
      timeVal: apt.startTime,
      data: apt
    });
  });

  // Add Lunch Break item (between 12:00 PM and 01:00 PM)
  timelineItems.push({
    type: 'lunch',
    timeLabel: '12:00 PM',
    timeVal: '12:00',
    data: { label: 'Lunch Break (12:00 PM – 01:00 PM)' }
  });

  // Sort all timeline items chronologically
  timelineItems.sort((a, b) => a.timeVal.localeCompare(b.timeVal));

  // Determine current timeline insertion (mockup or live current indicator line at 10:45 AM)
  const isMockDate = selectedDateStr === '2026-06-08';
  const isRealToday = selectedDateStr === todayStr;

  let insertTimeVal = null;
  let insertTimeLabel = '';

  if (isMockDate) {
    insertTimeVal = '10:45';
    insertTimeLabel = '10:45 AM';
  } else if (isRealToday) {
    const now = new Date();
    const curHour = String(now.getHours()).padStart(2, '0');
    const curMin = String(now.getMinutes()).padStart(2, '0');
    insertTimeVal = `${curHour}:${curMin}`;
    
    const displayHr = now.getHours() % 12 === 0 ? 12 : now.getHours() % 12;
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    insertTimeLabel = `${String(displayHr).padStart(2, '0')}:${curMin} ${ampm}`;
  }

  // Insert red indicator if applicable
  if (insertTimeVal) {
    timelineItems.push({
      type: 'time-indicator',
      timeLabel: insertTimeLabel,
      timeVal: insertTimeVal,
      data: null
    });
    // Sort again to place the red line at the chronologically correct spot
    timelineItems.sort((a, b) => a.timeVal.localeCompare(b.timeVal));
  }

  return (
    <div className="screen-fade h-full overflow-y-auto p-5 flex flex-col gap-5 bg-slate-50/50">
      
      {/* 1. Header Row */}
      <div className="flex flex-row items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            className="btn-ghost p-1 rounded-lg text-slate-500 hover:text-slate-800 cursor-pointer"
            onClick={goBack}
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-base font-bold text-slate-800">Appointments</h1>
        </div>

        <button
          className="btn-primary text-xs py-2 flex items-center gap-1.5 text-white shadow-sm font-semibold rounded-lg flex-shrink-0 cursor-pointer"
          onClick={() => openBookingModal()}
        >
          <Plus size={14} />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* 2. Search and Select Filters Toolbar */}
      <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
        {/* Doctor filter dropdown */}
        <div className="relative flex-shrink-0">
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="form-input form-select text-slate-700 bg-white font-semibold pr-9 border-slate-200 hover:border-slate-300 transition text-xs py-2 shadow-sm rounded-lg"
            style={{ width: '150px' }}
          >
            <option value="All Doctors">All Doctors</option>
            <option value="Dr. Rajan Kumar">Dr. Rajan Kumar</option>
            <option value="Dr. Mehta">Dr. Mehta</option>
            <option value="Dr. Sharma">Dr. Sharma</option>
          </select>
        </div>

        {/* Date Picker Button */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="btn-secondary flex items-center gap-2 text-xs py-2 shadow-sm rounded-lg hover:bg-slate-50 font-semibold flex-shrink-0"
          >
            <Calendar size={14} className="text-slate-400" />
            <span>{getHeaderDateLabel(selectedDate)}</span>
          </button>
          
          {showDatePicker && (
            <div className="absolute top-10 left-0 z-50 bg-white p-3 border border-slate-200 rounded-xl shadow-xl flex flex-col gap-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select Date</p>
              <input
                type="date"
                value={selectedDateStr}
                onChange={(e) => {
                  if (e.target.value) {
                    const [y, m, d] = e.target.value.split('-').map(Number);
                    setSelectedDate(new Date(y, m - 1, d));
                  }
                  setShowDatePicker(false);
                }}
                className="form-input text-xs"
              />
            </div>
          )}
        </div>

        {/* View Tab Selector */}
        <div className="bg-slate-200/60 p-0.5 rounded-lg flex gap-0.5 flex-shrink-0">
          {['Day', 'Week', 'Month'].map((tab) => (
            <button
              key={tab}
              className={`text-xs py-1.5 px-3 rounded-md font-semibold transition flex-shrink-0 cursor-pointer ${
                scheduleView === tab ? 'bg-white text-primary-700 shadow-xs' : 'text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => setScheduleView(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-slate-200 flex-shrink-0"></div>

        {/* Action buttons */}
        <button
          className="btn-secondary text-xs py-2 shadow-sm flex items-center gap-1.5 font-semibold text-slate-600 rounded-lg flex-shrink-0 cursor-pointer"
          onClick={handleExportCSV}
        >
          <Download size={14} />
          <span>Export</span>
        </button>

        <button
          className="btn-secondary text-xs py-2 shadow-sm font-semibold rounded-lg text-slate-600 flex-shrink-0 cursor-pointer"
          onClick={handlePrevDate}
        >
          &lt; Prev
        </button>
        
        <button
          className="btn-secondary text-xs py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 shadow-sm font-semibold rounded-lg flex-shrink-0 cursor-pointer"
          onClick={handleSetToday}
        >
          Today
        </button>

        <button
          className="btn-secondary text-xs py-2 shadow-sm font-semibold rounded-lg text-slate-600 flex-shrink-0 cursor-pointer"
          onClick={handleNextDate}
        >
          Next &gt;
        </button>
      </div>

      {/* 2. Top KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-shrink-0">
        
        {/* Total Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50/60 flex items-center justify-center text-blue-600">
            <Calendar size={18} />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800 leading-tight">{statsTotal}</p>
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mt-0.5">Total</p>
            <p className="text-[9px] text-slate-400 leading-none">Today's Appointments</p>
          </div>
        </div>

        {/* Completed Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50/60 flex items-center justify-center text-emerald-600">
            <Check size={18} />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800 leading-tight">{statsCompleted}</p>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mt-0.5">Completed</p>
            <p className="text-[9px] text-slate-400 leading-none">Done</p>
          </div>
        </div>

        {/* Waiting Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-50/60 flex items-center justify-center text-amber-600">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800 leading-tight">{statsWaiting}</p>
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wider mt-0.5">Waiting</p>
            <p className="text-[9px] text-slate-400 leading-none">In Queue</p>
          </div>
        </div>

        {/* Urgent Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-rose-50/60 flex items-center justify-center text-rose-600">
            <AlertCircle size={18} />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800 leading-tight">{statsUrgent}</p>
            <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mt-0.5">Urgent</p>
            <p className="text-[9px] text-slate-400 leading-none">High Priority</p>
          </div>
        </div>

        {/* No Shows Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-50/60 flex items-center justify-center text-purple-600">
            <X size={18} />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800 leading-tight">{statsNoShows}</p>
            <p className="text-[10px] font-bold text-purple-500 uppercase tracking-wider mt-0.5">No Shows</p>
            <p className="text-[9px] text-slate-400 leading-none">Today</p>
          </div>
        </div>
      </div>

      {/* 3. Main Views Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-start min-h-0">
        
        {/* Left Section: Day Schedule Timeline / Week Grid / Month Grid */}
        <div className="lg:col-span-8 section-card h-full flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden min-h-[550px] shadow-sm">
          
          {scheduleView === 'Day' && (
            <>
              {/* Day View Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
                <h2 className="font-bold text-slate-800 text-sm">Day Schedule</h2>
                <span className="text-[10.5px] text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                  {filteredAppointments.length} Active Records for {selectedDoctor}
                </span>
              </div>

              {/* Day View Timeline List */}
              <div className="flex-1 overflow-y-auto p-5 scrollbar-hide flex flex-col gap-0 relative">
                
                {timelineItems.length > 0 ? (
                  <div className="relative border-l border-slate-100 ml-20 pl-6 space-y-4 py-2">
                    
                    {timelineItems.map((item, idx) => {
                      
                      // Scenario A: Red Live Time Indicator
                      if (item.type === 'time-indicator') {
                        return (
                          <div key="indicator" className="relative flex items-center h-0 z-20" style={{ margin: '14px 0' }}>
                            {/* Absolute Time badge on left axis */}
                            <div className="absolute -left-[108px] w-20 text-right">
                              <span className="bg-rose-500 text-white text-[9.5px] font-bold px-2 py-0.5 rounded shadow-sm border border-rose-600/10">
                                {item.timeLabel}
                              </span>
                            </div>
                            {/* Line node connector */}
                            <div className="absolute -left-[30px] w-3 h-3 rounded-full bg-rose-500 border-2 border-white shadow-sm ring-4 ring-rose-100"></div>
                            {/* Horizontal Line across */}
                            <div className="w-full h-0.5 bg-rose-500/80 dashed border-t border-rose-400"></div>
                          </div>
                        );
                      }

                      // Scenario B: Lunch Break Dotted Block
                      if (item.type === 'lunch') {
                        return (
                          <div key="lunch" className="relative flex min-h-[48px] items-center">
                            {/* Axis Label */}
                            <div className="absolute -left-[108px] w-20 text-right text-xs text-slate-400 font-semibold">
                              {item.timeLabel}
                            </div>
                            
                            {/* Connect dot */}
                            <div className="absolute -left-[30px] w-2 h-2 rounded-full bg-slate-300 border-2 border-white shadow-xs"></div>
                            
                            {/* Dotted panel container */}
                            <div className="w-full border border-dashed border-slate-200 rounded-xl p-3 flex items-center justify-center gap-2 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
                              <Coffee size={14} className="text-slate-400" />
                              <span className="text-xs text-slate-400 font-semibold">{item.data.label}</span>
                            </div>
                          </div>
                        );
                      }

                      // Scenario C: Appointment Card Block
                      const apt = item.data;
                      const initials = getInitials(apt.patientName);
                      const borderClass = getBorderColorClass(apt.status);
                      const avatarClass = getAvatarColorClass(apt.status);
                      const cardBgClass = getCardBgColorClass(apt.status);

                      return (
                        <div key={apt.id} className="relative flex items-start min-h-[92px]">
                          
                          {/* Axis Label */}
                          <div className="absolute -left-[108px] w-20 text-right text-xs text-slate-400 font-bold mt-1">
                            {item.timeLabel}
                          </div>

                          {/* Node Dot on Timeline */}
                          <div className={`absolute -left-[30px] w-2 h-2 rounded-full bg-white border-2 ${
                            apt.status === 'Completed' ? 'border-emerald-500' :
                            apt.status === 'In Progress' ? 'border-blue-500' :
                            apt.status === 'Waiting' ? 'border-amber-500' :
                            apt.status === 'Urgent' ? 'border-rose-500' :
                            apt.status === 'No Show' ? 'border-purple-400' :
                            'border-slate-300'
                          } shadow-xs z-10 mt-3`}></div>

                          {/* Interactive Card Body */}
                          <div className={`w-full rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition shadow-xs border-l-4 ${borderClass} ${cardBgClass}`}>
                            
                            {/* Left details side */}
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              {/* Avatar box */}
                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs select-none flex-shrink-0 cursor-pointer ${avatarClass}`}
                                onClick={() => handleViewPatient(apt.patientId)}
                              >
                                {initials}
                              </div>
                              
                              {/* Name, symptoms, and doctor label */}
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 
                                    className="font-bold text-slate-800 text-xs hover:text-primary-600 cursor-pointer truncate"
                                    onClick={() => handleViewPatient(apt.patientId)}
                                  >
                                    {apt.patientName}
                                  </h3>
                                  <span className="text-[10px] text-slate-400 font-semibold">{apt.patientId}</span>
                                  {apt.type && (
                                    <span className={`text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-full ${getBadgeColorClass(apt.type)}`}>
                                      {apt.type}
                                    </span>
                                  )}
                                </div>

                                <p className="text-[11.5px] text-slate-500 mt-1 font-semibold truncate max-w-[280px]">
                                  {apt.reason}
                                </p>
                                
                                <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1.5 font-semibold">
                                  <span className="flex items-center gap-1">
                                    <User size={10} />
                                    <span className="text-slate-500">{apt.doctor}</span>
                                  </span>
                                  <span className="text-slate-300">·</span>
                                  <span className="text-slate-400">{apt.room}</span>
                                </div>
                              </div>
                            </div>

                            {/* Right status & controls side */}
                            <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                              
                              <div className="flex flex-col items-end gap-1">
                                {/* Time slots */}
                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white/70 px-2 py-0.5 rounded border border-slate-100">
                                  <Clock size={11} className="text-slate-400" />
                                  <span>{apt.startTime} - {apt.endTime}</span>
                                </div>
                                
                                <span className="text-[9.5px] text-slate-400 font-semibold mr-1">{apt.duration} mins</span>
                              </div>

                              {/* Status indicator pill */}
                              <div className="flex items-center gap-2">
                                <span className={`badge text-[9.5px] py-0.5 px-2.5 flex items-center gap-1 rounded-full ${
                                  apt.status === 'Completed' ? 'badge-green' :
                                  apt.status === 'In Progress' ? 'badge-blue' :
                                  apt.status === 'Waiting' ? 'badge-amber text-amber-800' :
                                  apt.status === 'Urgent' ? 'badge-red' :
                                  apt.status === 'No Show' ? 'badge-gray text-purple-700 bg-purple-50 border border-purple-100' :
                                  'badge-gray text-slate-600'
                                }`}>
                                  <span className={`w-1 h-1 rounded-full ${
                                    apt.status === 'Completed' ? 'bg-green-600' :
                                    apt.status === 'In Progress' ? 'bg-blue-600' :
                                    apt.status === 'Waiting' ? 'bg-amber-600' :
                                    apt.status === 'Urgent' ? 'bg-red-600' :
                                    apt.status === 'No Show' ? 'bg-purple-600' :
                                    'bg-slate-400'
                                  }`}></span>
                                  {apt.status}
                                </span>

                                {/* Actions ellipsis dropdown triggers */}
                                <div className="relative">
                                  <button
                                    onClick={() => setActiveMenuId(activeMenuId === apt.id ? null : apt.id)}
                                    className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100/50 cursor-pointer"
                                  >
                                    <MoreVertical size={14} />
                                  </button>

                                  {activeMenuId === apt.id && (
                                    <div
                                      ref={menuRef}
                                      className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-40 text-xs font-semibold"
                                    >
                                      <button
                                        onClick={() => handleUpdateStatus(apt.id, 'In Progress')}
                                        className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                        In Progress
                                      </button>
                                      <button
                                        onClick={() => handleUpdateStatus(apt.id, 'Waiting')}
                                        className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                        Waiting
                                      </button>
                                      <button
                                        onClick={() => handleUpdateStatus(apt.id, 'Completed')}
                                        className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        Completed
                                      </button>
                                      <button
                                        onClick={() => handleUpdateStatus(apt.id, 'Urgent')}
                                        className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                        Urgent
                                      </button>
                                      <button
                                        onClick={() => handleUpdateStatus(apt.id, 'No Show')}
                                        className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                        No Show
                                      </button>
                                      <button
                                        onClick={() => handleUpdateStatus(apt.id, 'Scheduled')}
                                        className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                        Scheduled
                                      </button>
                                      <div className="border-t border-slate-100 my-1"></div>
                                      <button
                                        onClick={() => handleDeleteApt(apt.id)}
                                        className="w-full text-left px-3 py-1.5 hover:bg-rose-50 text-rose-600 flex items-center gap-1.5"
                                      >
                                        <Trash2 size={11} />
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>

                              </div>

                            </div>

                          </div>

                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center gap-2">
                    <AlertCircle size={28} className="text-slate-300" />
                    <p className="text-xs font-bold text-slate-500">No appointments scheduled for this date</p>
                    <p className="text-[10px] text-slate-400">Change date filters or book a slot to get started.</p>
                  </div>
                )}

              </div>

              {/* Day View Legend Footer */}
              <div className="flex flex-wrap items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex-shrink-0 text-[10px] font-semibold text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span> New Patient
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Follow-up
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Consultation
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span> Emergency
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={11} className="text-slate-400" />
                  <span>All timings are in local time</span>
                </div>
              </div>
            </>
          )}

          {scheduleView === 'Week' && (
            <div className="flex-1 flex flex-col p-5 overflow-hidden">
              <h2 className="font-bold text-slate-800 text-sm mb-4">Weekly Overview Grid</h2>
              <div className="grid grid-cols-7 gap-3 flex-1 overflow-y-auto">
                {Array.from({ length: 7 }).map((_, i) => {
                  // Generate days of current week based on selectedDate
                  const currDayNum = selectedDate.getDay() || 7; // sunday = 0 -> 7
                  const distance = i + 1 - currDayNum;
                  const date = new Date(selectedDate);
                  date.setDate(selectedDate.getDate() + distance);
                  
                  const isDaySelected = date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth();
                  const dStr = formatDateStr(date);
                  
                  // Filter apths for that date
                  const dayApts = appointments.filter((a) => a.date === dStr && (selectedDoctor === 'All Doctors' || a.doctor === selectedDoctor));
                  const complCount = dayApts.filter((a) => a.status === 'Completed').length;
                  const waitCount = dayApts.filter((a) => a.status === 'Waiting' || a.status === 'Urgent').length;
                  const schedCount = dayApts.filter((a) => a.status === 'Scheduled' || a.status === 'In Progress').length;
                  
                  const daysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                  
                  return (
                    <div
                      key={i}
                      className={`border rounded-xl p-3 flex flex-col justify-between hover:border-primary-400 transition cursor-pointer min-h-[200px] ${
                        isDaySelected ? 'border-primary-500 bg-primary-50/10 ring-1 ring-primary-500' : 'border-slate-200 bg-white'
                      }`}
                      onClick={() => {
                        setSelectedDate(date);
                        setScheduleView('Day');
                      }}
                    >
                      <div className="text-center pb-2 border-b border-slate-100">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">{daysNames[date.getDay()]}</p>
                        <p className="text-sm font-extrabold text-slate-700 mt-0.5">{date.getDate()}</p>
                      </div>
                      
                      <div className="flex-1 flex flex-col gap-1.5 py-3 text-[10px] font-bold">
                        <div className="flex justify-between items-center text-slate-500">
                          <span>Total</span>
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{dayApts.length}</span>
                        </div>
                        {complCount > 0 && (
                          <div className="flex justify-between items-center text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">
                            <span>Done</span>
                            <span>{complCount}</span>
                          </div>
                        )}
                        {waitCount > 0 && (
                          <div className="flex justify-between items-center text-amber-700 bg-amber-50 px-1 py-0.5 rounded">
                            <span>Queue</span>
                            <span>{waitCount}</span>
                          </div>
                        )}
                        {schedCount > 0 && (
                          <div className="flex justify-between items-center text-blue-600 bg-blue-50 px-1 py-0.5 rounded">
                            <span>Booked</span>
                            <span>{schedCount}</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDate(date);
                          openBookingModal();
                        }}
                        className="w-full text-center text-[9px] font-extrabold text-primary-600 hover:text-white hover:bg-primary-500 transition py-1 rounded border border-primary-200"
                      >
                        + Book Day
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {scheduleView === 'Month' && (
            <div className="flex-1 flex flex-col p-5 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-800 text-sm">Monthly Calendar (June 2026)</h2>
                <span className="text-xs text-slate-400 font-semibold">Click any cell to inspect schedule</span>
              </div>
              
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 text-center font-bold text-slate-400 text-[10.5px] uppercase tracking-wider mb-2">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>

              {/* Day cells (starts on Monday June 1st, 2026) */}
              <div className="grid grid-cols-7 gap-1 flex-1 overflow-y-auto">
                {Array.from({ length: 30 }).map((_, i) => {
                  const dayVal = i + 1;
                  const date = new Date(2026, 5, dayVal); // June is Month index 5
                  const isDaySelected = date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth();
                  const dStr = formatDateStr(date);
                  
                  // Filter appointments for this date
                  const dayApts = appointments.filter((a) => a.date === dStr && (selectedDoctor === 'All Doctors' || a.doctor === selectedDoctor));
                  const types = [...new Set(dayApts.map((a) => a.type))];

                  return (
                    <div
                      key={i}
                      className={`border rounded-lg p-2 hover:border-primary-400 transition cursor-pointer min-h-[75px] flex flex-col justify-between ${
                        isDaySelected ? 'border-primary-500 bg-primary-50/10' : 'border-slate-100 bg-white'
                      }`}
                      onClick={() => {
                        setSelectedDate(date);
                        setScheduleView('Day');
                      }}
                    >
                      <span className="text-[10px] font-extrabold text-slate-500">{dayVal}</span>
                      
                      {dayApts.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] font-extrabold text-slate-700 bg-slate-100 px-1 rounded w-fit self-end">
                            {dayApts.length} slots
                          </span>
                          
                          {/* Dot legends */}
                          <div className="flex gap-0.5 justify-end">
                            {types.map((type) => (
                              <span
                                key={type}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  type === 'New Patient' ? 'bg-purple-500' :
                                  type === 'Follow-up' ? 'bg-blue-500' :
                                  type === 'Consultation' ? 'bg-emerald-500' :
                                  type === 'Emergency' ? 'bg-rose-500' :
                                  'bg-slate-400'
                                }`}
                              ></span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Right Section: Panel info */}
        <div className="lg:col-span-4 flex flex-col gap-5 h-full">
          
          {/* A. Today's Summary (4 squares grid) */}
          <div className="section-card p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Today's Summary</h3>
            <div className="grid grid-cols-2 gap-3">
              
              {/* Total Box */}
              <div className="bg-blue-50/40 rounded-xl p-3 border border-blue-50 text-center flex flex-col justify-center">
                <p className="text-lg font-extrabold text-blue-600">{statsTotal}</p>
                <p className="text-[10px] font-bold text-slate-500 mt-0.5">Total</p>
                <p className="text-[8.5px] text-slate-400 leading-tight">Appointments</p>
              </div>

              {/* Completed Box */}
              <div className="bg-emerald-50/40 rounded-xl p-3 border border-emerald-50 text-center flex flex-col justify-center">
                <p className="text-lg font-extrabold text-emerald-600">{statsCompleted}</p>
                <p className="text-[10px] font-bold text-slate-500 mt-0.5">Completed</p>
                <p className="text-[8.5px] text-slate-400 leading-tight">Done</p>
              </div>

              {/* Waiting Box */}
              <div className="bg-amber-50/40 rounded-xl p-3 border border-amber-50 text-center flex flex-col justify-center">
                <p className="text-lg font-extrabold text-amber-600">{statsWaiting}</p>
                <p className="text-[10px] font-bold text-slate-500 mt-0.5">Waiting</p>
                <p className="text-[8.5px] text-slate-400 leading-tight">In Queue</p>
              </div>

              {/* Urgent Box */}
              <div className="bg-rose-50/40 rounded-xl p-3 border border-rose-50 text-center flex flex-col justify-center">
                <p className="text-lg font-extrabold text-rose-600">{statsUrgent}</p>
                <p className="text-[10px] font-bold text-slate-500 mt-0.5">Urgent</p>
                <p className="text-[8.5px] text-slate-400 leading-tight">High Priority</p>
              </div>

            </div>
          </div>

          {/* B. Upcoming Patient Focus Panel */}
          <div className="section-card p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Upcoming Patient</h3>
            
            {upcomingAppointment ? (
              <div className="flex flex-col gap-4">
                
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl font-bold flex items-center justify-center text-sm ${getAvatarColorClass(upcomingAppointment.status)}`}>
                    {getInitials(upcomingAppointment.patientName)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">{upcomingAppointment.patientName}</h4>
                    <p className="text-[10.5px] text-slate-400 font-semibold mt-0.5">{upcomingAppointment.patientId}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className={`badge text-[8px] py-0.5 px-2 rounded-full ${getBadgeColorClass(upcomingAppointment.type)}`}>
                        {upcomingAppointment.type}
                      </span>
                      <span className={`badge text-[8px] py-0.5 px-2 rounded-full ${
                        upcomingAppointment.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {upcomingAppointment.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-[11.5px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-semibold">
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase tracking-wide">Symptoms / Complaint</span>
                  {upcomingAppointment.reason}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500">
                  <div className="flex items-center gap-1.5 bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                    <Clock size={12} className="text-slate-400" />
                    <span>{formatTimeLabel(upcomingAppointment.startTime)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                    <MapPin size={12} className="text-slate-400" />
                    <span>{upcomingAppointment.room}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleViewPatient(upcomingAppointment.patientId)}
                  className="btn-secondary w-full py-2.5 text-xs font-extrabold justify-center text-primary-600 border border-primary-100 hover:bg-primary-50/20 rounded-xl"
                >
                  View Patient
                </button>

              </div>
            ) : (
              <div className="text-center text-xs text-slate-400 py-10 font-bold bg-slate-50/40 rounded-xl border border-slate-100">
                No upcoming appointments today
              </div>
            )}
          </div>

          {/* C. Available Slots Selector Grid */}
          <div className="section-card p-4 bg-white border border-slate-200 rounded-2xl flex-1 shadow-xs flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Available Slots</h3>
              <button onClick={() => alert('Viewing all active doctors slot directories...')} className="text-[10.5px] text-primary-500 font-bold hover:underline">
                View All
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {standardSlots.map((slot) => {
                const booked = isSlotBooked(slot);
                return (
                  <button
                    key={slot}
                    disabled={booked}
                    onClick={() => openBookingModal(slot)}
                    className={`text-center text-xs py-2.5 rounded-xl font-bold transition ${
                      booked
                        ? 'bg-slate-50 text-slate-350 border border-slate-100 line-through cursor-not-allowed'
                        : 'bg-emerald-50/65 text-emerald-700 border border-emerald-100 hover:bg-emerald-500 hover:text-white cursor-pointer hover:border-emerald-500'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => openBookingModal()}
              className="mt-auto btn-secondary w-full py-2.5 text-xs font-extrabold justify-center text-primary-600 border border-primary-100 hover:bg-primary-50/20 rounded-xl"
            >
              + Book Slot
            </button>
          </div>

        </div>

      </div>

      {/* 4. Booking Modal Dialog Overlay */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-100 animate-fadeIn">
            
            {/* Modal Header */}
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-150 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-sm">Book Appointment Slot</h3>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:bg-slate-200 hover:text-slate-700 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleBookingSubmit} className="p-5 flex flex-col gap-4">
              
              {/* Select Patient Dropdown */}
              <div>
                <label className="form-label text-[11px] font-bold text-slate-500 uppercase tracking-wide">Select Patient</label>
                <select
                  value={bookingForm.patientId}
                  onChange={(e) => setBookingForm({ ...bookingForm, patientId: e.target.value })}
                  className="form-input text-xs"
                  required
                >
                  {patients && patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.id})
                    </option>
                  ))}
                  <option value="guest">+ Register New Guest Patient</option>
                </select>
              </div>

              {/* Guest name field (conditionally shown) */}
              {bookingForm.patientId === 'guest' && (
                <div>
                  <label className="form-label text-[11px] font-bold text-slate-500 uppercase tracking-wide">Guest Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={bookingForm.guestName}
                    onChange={(e) => setBookingForm({ ...bookingForm, guestName: e.target.value })}
                    className="form-input text-xs"
                    required
                  />
                </div>
              )}

              {/* Visit Type selector */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label text-[11px] font-bold text-slate-500 uppercase tracking-wide">Visit Type</label>
                  <select
                    value={bookingForm.visitType}
                    onChange={(e) => setBookingForm({ ...bookingForm, visitType: e.target.value })}
                    className="form-input text-xs"
                  >
                    <option value="Consultation">Consultation</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="New Patient">New Patient</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="form-label text-[11px] font-bold text-slate-500 uppercase tracking-wide">Doctor</label>
                  <select
                    value={bookingForm.doctor}
                    onChange={(e) => setBookingForm({ ...bookingForm, doctor: e.target.value })}
                    className="form-input text-xs"
                  >
                    <option value="Dr. Rajan Kumar">Dr. Rajan Kumar (OPD)</option>
                    <option value="Dr. Mehta">Dr. Mehta (Cardio)</option>
                    <option value="Dr. Sharma">Dr. Sharma (Ortho)</option>
                  </select>
                </div>
              </div>

              {/* Date & Time slot input */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label text-[11px] font-bold text-slate-500 uppercase tracking-wide">Date</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="form-input text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="form-label text-[11px] font-bold text-slate-500 uppercase tracking-wide">Time Slot</label>
                  <input
                    type="time"
                    value={bookingForm.timeSlot}
                    onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                    className="form-input text-xs"
                    required
                  />
                </div>
              </div>

              {/* Symptoms / Reason */}
              <div>
                <label className="form-label text-[11px] font-bold text-slate-500 uppercase tracking-wide">Reason / Symptoms</label>
                <textarea
                  rows="3"
                  placeholder="Describe patient concern (e.g. Cough, checkup, chest pain)"
                  value={bookingForm.reason}
                  onChange={(e) => setBookingForm({ ...bookingForm, reason: e.target.value })}
                  className="form-input text-xs resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="btn-secondary text-xs rounded-xl px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs text-white rounded-xl px-5 py-2 font-bold cursor-pointer"
                >
                  Book Slot
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Appointments;
