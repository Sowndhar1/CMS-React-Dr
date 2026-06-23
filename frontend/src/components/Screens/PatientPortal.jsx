import { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Calendar,
  Lock,
  Download,
  ChevronRight,
  ClipboardList,
  FlaskConical,
  Receipt,
  User,
  Activity,
  CheckCircle,
  QrCode,
  Shield,
  Smartphone,
  Wifi,
  Battery,
  Signal,
  Send,
  MoreVertical,
  Check,
  CheckCheck,
  MessageSquare,
  Copy,
  Clock,
  Paperclip,
  Camera
} from 'lucide-react';

// Secure Portal Link Generator (pure helper outside of component scope)
const getPortalLink = (patientObj) => {
  return `https://cmsportal.com/patient/P${patientObj.id.replace('#', '')}`;
};

// Template Text Resolver (pure helper outside of component scope)
const getInterpolatedTemplate = (templateId, patientObj) => {
  const link = getPortalLink(patientObj);
  const nextFollowUp = patientObj.nextFollowUp || '16 July 2026';
  
  switch (templateId) {
    case 'portal_access':
      return `Hello ${patientObj.name},\nYour patient portal is ready.\nUse the link below to:\n• Book Appointments\n• View Medical Reports\n• Download Documents\n• View Billing Information\n\n${link}\n\nRegards,\nClinic Management System`;
    case 'appointment':
      return `Hello ${patientObj.name},\nYour appointment is confirmed for 16 July 2026 at 10:30 AM with Dr. Rajan.\nSee you soon!\n\nRegards,\nClinic Management System`;
    case 'followup':
      return `Hello ${patientObj.name},\nThis is a friendly reminder for your upcoming follow-up on ${nextFollowUp}.\nPlease contact us if you need to reschedule.\n\nRegards,\nClinic Management System`;
    case 'report':
      return `Hello ${patientObj.name},\nYour lab reports for the test ordered on 26 May are now ready and available in your portal.\n\nYou can view them here: ${link}\n\nRegards,\nClinic Management System`;
    case 'payment':
      return `Hello ${patientObj.name},\nAn invoice of ₹400 is generated for your visit. You can view and pay online via the portal:\n\n${link}\n\nRegards,\nClinic Management System`;
    case 'custom':
      return `Hello ${patientObj.name},\n[Type your custom message here]\n\nRegards,\nClinic Management System`;
    default:
      return '';
  }
};

const PatientPortal = () => {
  const { 
    patients, 
    setSelectedPatientId, 
    selectedPatient, 
    showScreen,
    appointments
  } = useApp();

  // Active patient session (synchronized with AppContext)
  const patient = selectedPatient || patients[0];

  // State Variables
  const [simulatorTab, setSimulatorTab] = useState('whatsapp'); // 'whatsapp', 'mobile', 'qr'
  const [portalTab, setPortalTab] = useState('appointments'); // 'appointments', 'labs', 'billing'
  const [selectedTemplateId, setSelectedTemplateId] = useState('portal_access');
  const [userEditedText, setUserEditedText] = useState(null);
  const [customSentMessages, setCustomSentMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showActivityModal, setShowActivityModal] = useState(false);

  // Ref for WhatsApp chat logs scroll container
  const chatContainerRef = useRef(null);

  // Derive the active message text based on whether the user has edited the text manually
  const messageText = userEditedText !== null ? userEditedText : getInterpolatedTemplate(selectedTemplateId, patient);

  // Template list definitions
  const templates = [
    {
      id: 'portal_access',
      title: 'Portal Access',
      desc: 'Send patient portal link',
      icon: Shield,
      colorClass: 'bg-rose-50 text-[#810B38] border-rose-100/50'
    },
    {
      id: 'appointment',
      title: 'Appointment Confirmation',
      desc: 'Confirm upcoming appointment',
      icon: Calendar,
      colorClass: 'bg-blue-50 text-blue-600 border-blue-100/50'
    },
    {
      id: 'followup',
      title: 'Follow-up Reminder',
      desc: 'Send follow-up reminder',
      icon: Clock,
      colorClass: 'bg-amber-50 text-amber-600 border-amber-100/50'
    },
    {
      id: 'report',
      title: 'Report Ready',
      desc: 'Inform report availability',
      icon: FileText,
      colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100/50'
    },
    {
      id: 'payment',
      title: 'Payment Reminder',
      desc: 'Send payment reminder',
      icon: Receipt,
      colorClass: 'bg-purple-50 text-purple-600 border-purple-100/50'
    },
    {
      id: 'custom',
      title: 'Custom Message',
      desc: 'Send custom message',
      icon: MessageSquare,
      colorClass: 'bg-slate-100 text-slate-600 border-slate-200/50'
    }
  ];

  // Activity log tracking
  const [activity, setActivity] = useState({
    template: 'Portal Access',
    time: 'Today, 10:24 AM',
    status: 'Delivered',
    deliveredOn: 'Today, 10:24 AM',
    readOn: 'Today, 10:25 AM'
  });

  // Sample historical activities for modal audit log
  const initialAuditLogs = [
    { id: 1, patient: 'Amit Mehta', template: 'Portal Access', type: 'System Auto', date: 'Today, 10:24 AM', status: 'Delivered' },
    { id: 2, patient: 'Amit Mehta', template: 'Appointment Confirmation', type: 'Manual Trigger', date: 'Yesterday, 03:15 PM', status: 'Read' },
    { id: 3, patient: 'Sunita Patel', template: 'Follow-up Reminder', type: 'Scheduled Auto', date: '15 May 2026, 11:00 AM', status: 'Read' },
    { id: 4, patient: 'Rahul Kumar', template: 'Report Ready', type: 'System Auto', date: '12 May 2026, 09:30 AM', status: 'Delivered' },
    { id: 5, patient: 'Priya Desai', template: 'Portal Access', type: 'Manual Trigger', date: '10 May 2026, 04:45 PM', status: 'Read' },
    { id: 6, patient: 'Vijay Nair', template: 'Payment Reminder', type: 'Manual Trigger', date: '08 May 2026, 11:20 AM', status: 'Failed' }
  ];

  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);

  // Auto-scroll chat to bottom when custom message is added
  useEffect(() => {
    if (simulatorTab === 'whatsapp' && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [customSentMessages, simulatorTab]);

  // Toast notifier helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Actions
  const handlePatientChange = (e) => {
    setSelectedPatientId(e.target.value);
    setUserEditedText(null); // Reset custom edits to load default patient template
    setCustomSentMessages([]); // Reset simulator chat log for new session
    triggerToast(`Switched active portal session to ${patients.find(p => p.id === e.target.value)?.name}`);
  };

  const handleCopyLink = () => {
    const link = getPortalLink(patient);
    navigator.clipboard.writeText(link);
    triggerToast('Secure patient portal link copied to clipboard!');
  };

  const handleDownloadQR = () => {
    triggerToast(`Initiating download for QR_Access_${patient.name.replace(' ', '_')}.png`);
  };

  const handleSendWhatsApp = () => {
    if (!messageText.trim() || isSending) return;
    setIsSending(true);
    
    // Simulate sending delay
    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setCustomSentMessages(prev => [
        ...prev,
        {
          text: messageText,
          time: timeStr,
          status: 'read'
        }
      ]);
      
      setIsSending(false);
      triggerToast(`Automated WhatsApp template sent to ${patient.name}!`);
      
      const activeTemplateName = templates.find(t => t.id === selectedTemplateId)?.title || 'Custom Message';
      
      // Update footer activity details
      setActivity({
        template: activeTemplateName,
        time: `Today, ${timeStr}`,
        status: 'Delivered',
        deliveredOn: `Today, ${timeStr}`,
        readOn: `Today, ${timeStr}`
      });

      // Add to audit logs
      setAuditLogs(prev => [
        {
          id: Date.now(),
          patient: patient.name,
          template: activeTemplateName,
          type: 'Manual Trigger',
          date: `Today, ${timeStr}`,
          status: 'Delivered'
        },
        ...prev
      ]);
    }, 800);
  };

  const selectTemplate = (templateId) => {
    setSelectedTemplateId(templateId);
    setUserEditedText(null); // Reset user edits to load the chosen template
    setSimulatorTab('whatsapp'); // Switch simulator to WhatsApp to preview the template
  };

  const handleTextareaChange = (e) => {
    setUserEditedText(e.target.value);
  };

  // Filtering appointments for the patient portal view
  const patientAppointments = appointments.filter(a => a.patientId === patient.id);

  return (
    <div className="screen-fade h-full overflow-y-auto lg:overflow-hidden p-4 md:p-6 flex flex-col gap-6 bg-slate-50/50 min-h-0 relative select-none">
      
      {/* Toast alert widget */}
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-slate-900 text-white text-xs font-semibold px-4.5 py-3 rounded-2xl shadow-xl z-50 animate-fadeIn border border-white/10 flex items-center gap-2.5">
          <CheckCircle size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Profile summary selector row */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-4 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-5 flex-shrink-0">
        
        {/* Left Side: Avatar & Details Dropdown */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-[#810B38] border border-rose-100 flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0">
            {patient.name ? patient.name.split(' ').map(n => n[0]).join('') : 'P'}
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="relative flex items-center group">
                <select 
                  value={patient.id} 
                  onChange={handlePatientChange}
                  className="font-black text-slate-800 text-sm md:text-base bg-transparent border-none pr-6 focus:outline-none cursor-pointer appearance-none select-none hover:text-[#810B38] transition-all"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <ChevronRight size={14} className="absolute right-0 text-slate-400 rotate-90 pointer-events-none transition-transform group-hover:text-[#810B38]" />
              </div>
              <span className="badge badge-green text-[9px] font-extrabold uppercase py-0.5 px-2 tracking-wider">Active</span>
            </div>
            
            <p className="text-[11px] text-slate-400 mt-1 font-semibold flex items-center gap-1.5 flex-wrap">
              <span>ID: {patient.id}</span>
              <span>•</span>
              <span>{patient.age} yrs</span>
              <span>•</span>
              <span>{patient.gender}</span>
              <span>•</span>
              <span>+91 {patient.phone}</span>
            </p>
          </div>
        </div>

        {/* Right Side: Status Widgets & Full profile shortcut */}
        <div className="flex flex-wrap items-center gap-3.5 w-full xl:w-auto xl:justify-end">
          
          <button 
            onClick={() => showScreen('patientdetail')}
            className="px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-650 hover:text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 flex-grow xl:flex-grow-0 justify-center"
          >
            <User size={13} />
            <span>View Full Profile</span>
          </button>

          {/* Mini KPI 1: Portal Status */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/50 rounded-xl px-3.5 py-2 text-xs flex-grow sm:flex-grow-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <CheckCircle size={15} />
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Portal Status</p>
              <p className="font-extrabold text-slate-700 mt-1">Active</p>
            </div>
          </div>

          {/* Mini KPI 2: Last Login */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/50 rounded-xl px-3.5 py-2 text-xs flex-grow sm:flex-grow-0">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Smartphone size={15} />
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Last Login</p>
              <p className="font-extrabold text-slate-700 mt-1">Today, 09:15 AM</p>
            </div>
          </div>

          {/* Mini KPI 3: WhatsApp Status */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/50 rounded-xl px-3.5 py-2 text-xs flex-grow sm:flex-grow-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <CheckCheck size={15} />
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">WhatsApp Status</p>
              <p className="font-extrabold text-emerald-600 mt-1">Delivered</p>
            </div>
          </div>

          {/* Extra options */}
          <button className="btn-ghost p-2 rounded-xl text-slate-400 hover:text-slate-650 cursor-pointer hidden sm:block">
            <MoreVertical size={15} />
          </button>
        </div>

      </div>

      {/* Main Grid Content */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-y-auto lg:overflow-hidden">
        
        {/* Left Area: Controls & Configuration (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6 overflow-visible lg:overflow-y-auto pr-0 lg:pr-1 min-h-0">
          
          {/* Card 1: Portal Access */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#810B38]/5 border border-[#810B38]/10 text-[#810B38] flex items-center justify-center flex-shrink-0">
                <Shield size={16} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider leading-none mt-1">Portal Access Link</h3>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-normal">Share this secure link with the patient to grant access to their electronic medical records dashboard.</p>
              </div>
            </div>

            <div className="relative">
              <input 
                type="text" 
                readOnly
                value={getPortalLink(patient)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-11 py-3 text-xs text-slate-700 font-bold focus:outline-none select-all"
              />
              <button 
                onClick={handleCopyLink}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 transition-all cursor-pointer"
                title="Copy secure link"
              >
                <Copy size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                onClick={handleCopyLink}
                className="py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-650 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Copy size={13} />
                <span>Copy Link</span>
              </button>
              <button 
                onClick={() => setSimulatorTab('qr')}
                className="py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-650 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <QrCode size={13} />
                <span>Generate QR</span>
              </button>
              <button 
                onClick={handleSendWhatsApp}
                className="py-2.5 bg-[#810B38] hover:bg-[#6b092e] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <Send size={12} />
                <span>Share WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Sub-grid: QR Access and WhatsApp Composer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-shrink-0">
            
            {/* Box 1: QR Code Access */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col items-center text-center gap-4.5">
              <div className="w-full flex items-center gap-2 text-left self-start">
                <QrCode size={15} className="text-slate-450" />
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">QR Code Access</span>
              </div>
              
              {/* Premium drawn QR Code vector representation */}
              <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-inner flex items-center justify-center w-fit select-none">
                <svg viewBox="0 0 100 100" className="w-28 h-28 text-slate-800">
                  {/* Position detection corners */}
                  <rect x="0" y="0" width="30" height="30" fill="currentColor" rx="2" />
                  <rect x="5" y="5" width="20" height="20" fill="white" rx="1" />
                  <rect x="10" y="10" width="10" height="10" fill="currentColor" rx="1" />
                  
                  <rect x="70" y="0" width="30" height="30" fill="currentColor" rx="2" />
                  <rect x="75" y="5" width="20" height="20" fill="white" rx="1" />
                  <rect x="80" y="10" width="10" height="10" fill="currentColor" rx="1" />
                  
                  <rect x="0" y="70" width="30" height="30" fill="currentColor" rx="2" />
                  <rect x="5" y="75" width="20" height="20" fill="white" rx="1" />
                  <rect x="10" y="80" width="10" height="10" fill="currentColor" rx="1" />

                  <rect x="75" y="75" width="10" height="10" fill="currentColor" rx="1" />
                  <rect x="78" y="78" width="4" height="4" fill="white" />
                  
                  {/* Styled QR Blocks */}
                  <rect x="35" y="0" width="5" height="5" fill="currentColor" />
                  <rect x="45" y="0" width="10" height="5" fill="currentColor" />
                  <rect x="60" y="5" width="5" height="10" fill="currentColor" />
                  <rect x="35" y="15" width="15" height="5" fill="currentColor" />
                  <rect x="55" y="15" width="5" height="5" fill="currentColor" />
                  <rect x="35" y="25" width="5" height="10" fill="currentColor" />
                  <rect x="45" y="25" width="15" height="5" fill="currentColor" />
                  
                  <rect x="0" y="35" width="5" height="15" fill="currentColor" />
                  <rect x="10" y="35" width="10" height="5" fill="currentColor" />
                  <rect x="25" y="35" width="15" height="10" fill="currentColor" />
                  <rect x="45" y="35" width="5" height="5" fill="currentColor" />
                  <rect x="55" y="30" width="10" height="10" fill="currentColor" />
                  <rect x="70" y="35" width="15" height="5" fill="currentColor" />
                  <rect x="90" y="35" width="10" height="15" fill="currentColor" />
                  
                  <rect x="5" y="55" width="15" height="5" fill="currentColor" />
                  <rect x="25" y="50" width="5" height="15" fill="currentColor" />
                  <rect x="35" y="50" width="20" height="5" fill="currentColor" />
                  <rect x="60" y="50" width="5" height="5" fill="currentColor" />
                  <rect x="70" y="45" width="10" height="15" fill="currentColor" />
                  
                  <rect x="35" y="60" width="5" height="20" fill="currentColor" />
                  <rect x="45" y="65" width="15" height="5" fill="currentColor" />
                  <rect x="55" y="60" width="10" height="15" fill="currentColor" />
                  <rect x="75" y="60" width="5" height="5" fill="currentColor" />
                  <rect x="85" y="55" width="15" height="10" fill="currentColor" />
                  
                  <rect x="90" y="70" width="5" height="15" fill="currentColor" />
                  <rect x="45" y="80" width="20" height="5" fill="currentColor" />
                  <rect x="70" y="85" width="5" height="10" fill="currentColor" />
                  <rect x="80" y="80" width="10" height="5" fill="currentColor" />
                  <rect x="35" y="90" width="25" height="5" fill="currentColor" />
                </svg>
              </div>

              <button 
                onClick={handleDownloadQR}
                className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-650 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Download size={13} />
                <span>Download QR Code</span>
              </button>
            </div>

            {/* Box 2: WhatsApp Composer */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <MessageSquare size={15} className="text-[#810B38]" />
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">WhatsApp Message</span>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Select Message Type</label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => selectTemplate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-[#810B38] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="portal_access">Portal Access Link</option>
                  <option value="appointment">Appointment Confirm</option>
                  <option value="followup">Follow-up Reminder</option>
                  <option value="report">Lab Report Ready</option>
                  <option value="payment">Payment Invoice Alert</option>
                  <option value="custom">Custom Text Message</option>
                </select>
              </div>

              <div className="flex-1 flex flex-col min-h-[120px]">
                <textarea
                  value={messageText}
                  onChange={handleTextareaChange}
                  placeholder="Enter message text here..."
                  className="w-full flex-grow bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-650 focus:outline-none focus:border-[#810B38] focus:bg-white leading-relaxed resize-none h-[120px] scrollbar-thin"
                />
              </div>

              <button
                onClick={handleSendWhatsApp}
                disabled={isSending}
                className="w-full py-2.5 bg-[#810B38] hover:bg-[#6b092e] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={12} className={isSending ? 'animate-bounce' : ''} />
                <span>{isSending ? 'Sending message...' : 'Send via WhatsApp'}</span>
              </button>
            </div>

          </div>

        </div>

        {/* Center Area: Smart Device Simulator (4 cols) */}
        <div className="lg:col-span-4 flex flex-col items-center bg-slate-100 rounded-3xl border border-slate-200 shadow-inner p-4 relative min-h-[550px] justify-between">
          
          {/* Header Tab Bar */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-xs w-full max-w-[290px] flex-shrink-0 z-10">
            <button 
              onClick={() => setSimulatorTab('mobile')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                simulatorTab === 'mobile' 
                  ? 'bg-[#FAF5F0] text-[#810B38] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Smartphone size={11} />
              <span>Mobile Portal</span>
            </button>
            
            <button 
              onClick={() => setSimulatorTab('whatsapp')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                simulatorTab === 'whatsapp' 
                  ? 'bg-[#FAF5F0] text-[#810B38] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <MessageSquare size={11} />
              <span>WhatsApp</span>
            </button>

            <button 
              onClick={() => setSimulatorTab('qr')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                simulatorTab === 'qr' 
                  ? 'bg-[#FAF5F0] text-[#810B38] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <QrCode size={11} />
              <span>QR View</span>
            </button>
          </div>

          {/* Smartphone Container Mockup */}
          <div className="relative w-[300px] h-[550px] bg-slate-950 rounded-[44px] shadow-2xl border-[10px] border-slate-900 flex flex-col overflow-hidden ring-[4px] ring-slate-800 ring-offset-4 ring-offset-slate-100 flex-shrink-0 mt-4 mb-2">
            
            {/* Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-50 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900/60 ml-auto mr-3"></div>
            </div>

            {/* Status Bar */}
            <div className="h-10 px-6 bg-[#810B38] text-white flex items-end justify-between pb-1.5 text-[9px] font-extrabold z-40 select-none flex-shrink-0">
              <span>9:41</span>
              <div className="flex items-center gap-1 text-[8px]">
                <Signal size={9} />
                <Wifi size={9} />
                <Battery size={9} />
              </div>
            </div>

            {/* Simulated Display Screen Container */}
            <div className="flex-grow bg-slate-50 flex flex-col overflow-hidden relative">
              
              {/* TAB 1: WhatsApp Screen */}
              {simulatorTab === 'whatsapp' && (
                <div className="flex flex-col h-full bg-[#efeae2]">
                  {/* WhatsApp Chat Header */}
                  <div className="bg-[#075e54] text-white py-2 px-3 flex items-center gap-2 flex-shrink-0 shadow-sm pt-2">
                    <span className="text-[10px] opacity-75">◀</span>
                    
                    {/* Clinic Avatar */}
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[#075e54] font-black text-xs shadow-inner flex-shrink-0">
                      CMS
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-black leading-none truncate">CMS Clinic</span>
                        {/* Verified badge */}
                        <div className="w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center text-white scale-[0.75]">
                          <Check size={9} strokeWidth={4} />
                        </div>
                      </div>
                      <p className="text-[8px] opacity-75 mt-0.5 leading-none">online</p>
                    </div>

                    <div className="flex items-center gap-3 text-white/90">
                      <span className="text-[10px] cursor-pointer">📞</span>
                      <span className="text-[10px] cursor-pointer">⋮</span>
                    </div>
                  </div>

                  {/* Scrollable WhatsApp Chat logs container */}
                  <div 
                    ref={chatContainerRef}
                    className="flex-grow overflow-y-auto p-3 space-y-3 relative"
                    style={{
                      backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
                      backgroundSize: 'cover',
                    }}
                  >
                    <div className="flex justify-center select-none">
                      <span className="bg-white/80 backdrop-blur-xs text-slate-500 text-[8px] font-black px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">Today</span>
                    </div>

                    {/* Sent Template Message bubble */}
                    <div className="flex justify-start animate-fadeIn">
                      <div className="bg-white text-slate-800 text-[10px] rounded-xl rounded-tl-none p-2.5 max-w-[85%] shadow-xs relative leading-relaxed whitespace-pre-wrap">
                        {messageText}
                        <div className="text-right text-[7.5px] text-slate-400 mt-1 select-none">10:24 AM</div>
                      </div>
                    </div>

                    {/* Patient Reply bubble */}
                    <div className="flex justify-end">
                      <div className="bg-[#d9fdd3] text-slate-800 text-[10px] rounded-xl rounded-tr-none p-2.5 max-w-[85%] shadow-xs relative leading-relaxed">
                        Hi, Thank you!
                        <div className="text-right text-[7.5px] text-slate-400 mt-1 flex items-center justify-end gap-0.5 select-none">
                          <span>10:25 AM</span>
                          <CheckCheck size={10} className="text-[#53bdeb]" />
                        </div>
                      </div>
                    </div>

                    {/* Secondary system follow up */}
                    <div className="flex justify-start">
                      <div className="bg-white text-slate-800 text-[10px] rounded-xl rounded-tl-none p-2.5 max-w-[85%] shadow-xs relative leading-relaxed">
                        Your appointment is confirmed for <span className="font-bold">16 July 2026 at 10:30 AM</span> with Dr. Rajan. See you soon!
                        <div className="text-right text-[7.5px] text-slate-400 mt-1 select-none">10:26 AM</div>
                      </div>
                    </div>

                    {/* Custom appends */}
                    {customSentMessages.map((msg, idx) => (
                      <div key={idx} className="flex justify-start animate-fadeIn">
                        <div className="bg-white text-slate-800 text-[10px] rounded-xl rounded-tl-none p-2.5 max-w-[85%] shadow-xs relative leading-relaxed whitespace-pre-wrap">
                          {msg.text}
                          <div className="text-right text-[7.5px] text-slate-400 mt-1 flex items-center justify-end gap-0.5 select-none">
                            <span>{msg.time}</span>
                            <CheckCheck size={10} className="text-[#53bdeb]" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* WhatsApp input bar */}
                  <div className="bg-[#f0f2f5] p-2 flex items-center gap-2 flex-shrink-0">
                    <div className="flex-1 bg-white rounded-full flex items-center px-3.5 py-1.5 shadow-xs gap-2 min-w-0">
                      <span className="text-[10px] text-slate-400">😊</span>
                      <input 
                        type="text" 
                        placeholder="Type a message" 
                        readOnly
                        className="w-full text-[9.5px] text-slate-700 bg-transparent outline-none pointer-events-none select-none"
                      />
                      <Paperclip size={10} className="text-slate-400 flex-shrink-0" />
                      <Camera size={10} className="text-slate-400 flex-shrink-0" />
                    </div>
                    <button 
                      onClick={handleSendWhatsApp}
                      className="w-8 h-8 rounded-full bg-[#00a884] hover:bg-[#008f72] text-white flex items-center justify-center flex-shrink-0 shadow-xs cursor-pointer"
                    >
                      <Send size={11} className="ml-0.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: Mobile Patient Portal Web Simulator */}
              {simulatorTab === 'mobile' && (
                <div className="flex flex-col h-full bg-slate-50 overflow-y-auto pb-6">
                  
                  {/* Redesigned Portal App Header */}
                  <div className="bg-[#810B38] text-white p-4 pt-3 flex flex-col gap-3.5 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Lock size={10} className="text-[#FAF5F0]/80" />
                        <span className="text-[8px] font-black tracking-widest text-[#FAF5F0]/80 uppercase">Secure Patient Link</span>
                      </div>
                      <span className="text-[8px] bg-white/15 px-2 py-0.5 rounded-full font-bold text-[#FAF5F0]">v1.2.4</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs shadow-inner">
                        {patient.name ? patient.name.split(' ').map(n => n[0]).join('') : 'P'}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white leading-tight truncate max-w-[180px]">{patient.name}</h4>
                        <p className="text-[9px] text-[#FAF5F0]/80 mt-1 font-semibold">ID: {patient.id} · Blood: {patient.bloodGroup}</p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Sub-Tabs */}
                  <div className="flex bg-white border-b border-slate-200 flex-shrink-0">
                    <button 
                      onClick={() => setPortalTab('appointments')}
                      className={`flex-1 py-2.5 flex flex-col items-center gap-0.5 border-b-2 text-[9px] font-black transition-all cursor-pointer ${
                        portalTab === 'appointments' 
                          ? 'border-[#810B38] text-[#810B38] bg-[#FAF5F0]/20' 
                          : 'border-transparent text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      <Calendar size={11} />
                      <span>Visits</span>
                    </button>
                    
                    <button 
                      onClick={() => setPortalTab('labs')}
                      className={`flex-1 py-2.5 flex flex-col items-center gap-0.5 border-b-2 text-[9px] font-black transition-all cursor-pointer ${
                        portalTab === 'labs' 
                          ? 'border-[#810B38] text-[#810B38] bg-[#FAF5F0]/20' 
                          : 'border-transparent text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      <FlaskConical size={11} />
                      <span>Lab Reports</span>
                    </button>

                    <button 
                      onClick={() => setPortalTab('billing')}
                      className={`flex-1 py-2.5 flex flex-col items-center gap-0.5 border-b-2 text-[9px] font-black transition-all cursor-pointer ${
                        portalTab === 'billing' 
                          ? 'border-[#810B38] text-[#810B38] bg-[#FAF5F0]/20' 
                          : 'border-transparent text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      <Receipt size={11} />
                      <span>Billing</span>
                    </button>
                  </div>

                  {/* Portal Tab Details */}
                  <div className="p-3.5 flex-1 min-h-0">
                    
                    {/* Portal: Visits */}
                    {portalTab === 'appointments' && (
                      <div className="space-y-3">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Upcoming Appointment</span>
                        
                        <div className="bg-white rounded-xl border border-[#DCC3AA]/50 p-3 shadow-xs flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <span className="text-[7.5px] font-bold uppercase text-[#810B38] bg-[#FAF5F0] border border-[#DCC3AA]/20 px-2 py-0.5 rounded-full">Confirmed</span>
                            <h5 className="text-[10px] font-black text-slate-800 mt-2 truncate">General Consultation</h5>
                            <p className="text-[8.5px] text-slate-400 mt-0.5 font-semibold">Dr. Rajan Kumar</p>
                            <p className="text-[8px] text-slate-400 mt-0.5 truncate">OPD-2, Kolkata Clinic</p>
                          </div>
                          
                          <div className="text-center bg-[#810B38] text-white rounded-lg p-1.5 min-w-[50px] shadow-sm flex-shrink-0 flex flex-col justify-center select-none">
                            <p className="text-[7.5px] font-bold uppercase leading-none">July</p>
                            <p className="text-xs font-black mt-0.5 leading-none">16</p>
                            <p className="text-[7px] font-bold mt-0.5 leading-none opacity-85">10:30 AM</p>
                          </div>
                        </div>

                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block pt-2">Visit History</span>
                        
                        <div className="bg-white rounded-xl border border-slate-200/50 p-3 shadow-xs space-y-2">
                          {patientAppointments.length > 0 ? (
                            patientAppointments.map((apt) => (
                              <div key={apt.id} className="flex items-center justify-between text-[9px] py-1 border-b border-slate-50 last:border-0 last:pb-0">
                                <div>
                                  <p className="font-bold text-slate-700">{apt.reason}</p>
                                  <p className="text-[8px] text-slate-400">{apt.doctor} · {apt.date}</p>
                                </div>
                                <span className={`badge ${
                                  apt.status === 'Completed' ? 'badge-green' : 'badge-amber'
                                } text-[7.5px] py-0.2 px-1.5`}>
                                  {apt.status}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-2 text-[8.5px] text-slate-400 font-semibold">No past records available.</div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Portal: Labs */}
                    {portalTab === 'labs' && (
                      <div className="space-y-2.5">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Lab Records</span>
                        {patient.labs && patient.labs.length > 0 ? (
                          patient.labs.map((lab, index) => (
                            <div key={index} className="bg-white rounded-xl border border-slate-200/50 p-2.5 shadow-xs flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-[#810B38] flex-shrink-0">
                                  <FlaskConical size={13} />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[9.5px] font-bold text-slate-700 truncate">{lab.name}</p>
                                  <p className="text-[7.5px] text-slate-400 font-semibold mt-0.5">
                                    Date: {lab.received} · <span className="text-emerald-600 font-bold">{lab.status}</span>
                                  </p>
                                </div>
                              </div>
                              <button 
                                onClick={() => triggerToast(`Downloading report: ${lab.name}`)}
                                className="w-7 h-7 rounded-lg bg-[#FAF5F0] border border-[#DCC3AA]/30 text-[#810B38] flex items-center justify-center hover:bg-[#F1E2D1] flex-shrink-0 cursor-pointer"
                              >
                                <Download size={10} />
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12 bg-white rounded-xl border border-slate-200/50 text-[9px] text-slate-400 font-bold">
                            No lab documents released.
                          </div>
                        )}
                      </div>
                    )}

                    {/* Portal: Billing */}
                    {portalTab === 'billing' && (
                      <div className="space-y-2.5">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Payment Accounts</span>
                        {patient.billingHistory && patient.billingHistory.length > 0 ? (
                          patient.billingHistory.map((bill, index) => (
                            <div key={index} className="bg-white rounded-xl border border-slate-200/50 p-2.5 shadow-xs flex flex-col gap-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[9.5px] font-bold text-slate-700">{bill.id}</span>
                                  <span className="text-[7px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-1 py-0.2 rounded-full font-bold">Paid</span>
                                </div>
                                <span className="text-[10px] font-black text-slate-800">₹{bill.amount}</span>
                              </div>
                              <div className="flex justify-between items-center border-t border-slate-50 pt-1.5 text-[8px] text-slate-400 font-semibold">
                                <span>Date: {bill.date}</span>
                                <button 
                                  onClick={() => triggerToast(`Showing printable receipt for ${bill.id}`)}
                                  className="text-[8px] font-bold text-[#810B38] hover:underline cursor-pointer"
                                >
                                  Receipt
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12 bg-white rounded-xl border border-slate-200/50 text-[9px] text-slate-400 font-bold">
                            No billing invoice statements.
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                </div>
              )}

              {/* TAB 3: QR Code Simulator View */}
              {simulatorTab === 'qr' && (
                <div className="flex flex-col h-full bg-white items-center justify-center p-6 text-center gap-5">
                  <span className="text-[10px] font-black text-[#810B38] bg-rose-50 border border-rose-100 rounded-full px-3 py-1 uppercase tracking-wider">QR Mobile Gateway</span>
                  
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner flex items-center justify-center select-none animate-pulse">
                    <svg viewBox="0 0 100 100" className="w-40 h-40 text-slate-800">
                      {/* Detailed QR vectors */}
                      <rect x="0" y="0" width="30" height="30" fill="currentColor" rx="2" />
                      <rect x="5" y="5" width="20" height="20" fill="white" rx="1" />
                      <rect x="10" y="10" width="10" height="10" fill="currentColor" rx="1" />
                      
                      <rect x="70" y="0" width="30" height="30" fill="currentColor" rx="2" />
                      <rect x="75" y="5" width="20" height="20" fill="white" rx="1" />
                      <rect x="80" y="10" width="10" height="10" fill="currentColor" rx="1" />
                      
                      <rect x="0" y="70" width="30" height="30" fill="currentColor" rx="2" />
                      <rect x="5" y="75" width="20" height="20" fill="white" rx="1" />
                      <rect x="10" y="80" width="10" height="10" fill="currentColor" rx="1" />

                      <rect x="75" y="75" width="10" height="10" fill="currentColor" rx="1" />
                      <rect x="78" y="78" width="4" height="4" fill="white" />
                      
                      <rect x="35" y="0" width="5" height="5" fill="currentColor" />
                      <rect x="45" y="0" width="10" height="5" fill="currentColor" />
                      <rect x="60" y="5" width="5" height="10" fill="currentColor" />
                      <rect x="35" y="15" width="15" height="5" fill="currentColor" />
                      <rect x="55" y="15" width="5" height="5" fill="currentColor" />
                      <rect x="35" y="25" width="5" height="10" fill="currentColor" />
                      <rect x="45" y="25" width="15" height="5" fill="currentColor" />
                      
                      <rect x="0" y="35" width="5" height="15" fill="currentColor" />
                      <rect x="10" y="35" width="10" height="5" fill="currentColor" />
                      <rect x="25" y="35" width="15" height="10" fill="currentColor" />
                      <rect x="45" y="35" width="5" height="5" fill="currentColor" />
                      <rect x="55" y="30" width="10" height="10" fill="currentColor" />
                      <rect x="70" y="35" width="15" height="5" fill="currentColor" />
                      <rect x="90" y="35" width="10" height="15" fill="currentColor" />
                      
                      <rect x="5" y="55" width="15" height="5" fill="currentColor" />
                      <rect x="25" y="50" width="5" height="15" fill="currentColor" />
                      <rect x="35" y="50" width="20" height="5" fill="currentColor" />
                      <rect x="60" y="50" width="5" height="5" fill="currentColor" />
                      <rect x="70" y="45" width="10" height="15" fill="currentColor" />
                      
                      <rect x="35" y="60" width="5" height="20" fill="currentColor" />
                      <rect x="45" y="65" width="15" height="5" fill="currentColor" />
                      <rect x="55" y="60" width="10" height="15" fill="currentColor" />
                      <rect x="75" y="60" width="5" height="5" fill="currentColor" />
                      <rect x="85" y="55" width="15" height="10" fill="currentColor" />
                      
                      <rect x="90" y="70" width="5" height="15" fill="currentColor" />
                      <rect x="45" y="80" width="20" height="5" fill="currentColor" />
                      <rect x="70" y="85" width="5" height="10" fill="currentColor" />
                      <rect x="80" y="80" width="10" height="5" fill="currentColor" />
                      <rect x="35" y="90" width="25" height="5" fill="currentColor" />
                    </svg>
                  </div>

                  <p className="text-[10px] text-slate-450 leading-relaxed max-w-[200px]">
                    Scan this QR code using a smartphone camera to securely login to {patient.name}'s secure panel.
                  </p>

                  <span className="text-[9.5px] font-black text-slate-650 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 select-all">
                    {getPortalLink(patient)}
                  </span>
                </div>
              )}

              {/* Secure Home Indicator notch bar */}
              <div className="absolute bottom-1 left-0 right-0 h-4 flex items-center justify-center z-50 pointer-events-none select-none flex-shrink-0">
                <div className="w-24 h-1 bg-slate-900/40 rounded-full"></div>
              </div>

            </div>

          </div>

          <p className="text-[10.5px] text-slate-450 font-bold mt-2">Active Simulator Preview</p>
        </div>

        {/* Right Area: Templates List (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-3 overflow-visible lg:overflow-y-auto pr-0 lg:pr-1 min-h-0">
          
          <div className="flex items-center justify-between flex-shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Message Templates</span>
            <button 
              onClick={() => setShowActivityModal(true)}
              className="text-[10px] font-black text-[#810B38] hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          {templates.map((tpl) => {
            const TplIcon = tpl.icon;
            const isSelected = selectedTemplateId === tpl.id;
            return (
              <button
                key={tpl.id}
                onClick={() => selectTemplate(tpl.id)}
                className={`w-full p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-3.5 ${
                  isSelected
                    ? 'bg-rose-50/50 text-[#810B38] border-[#810B38]/30 shadow-xs translate-x-0.5 scale-[1.01]'
                    : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 shadow-xs ${
                  isSelected ? 'bg-white border-[#810B38]/20' : tpl.colorClass
                }`}>
                  <TplIcon size={15} />
                </div>
                
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate leading-tight">{tpl.title}</p>
                  <p className="text-[10px] text-slate-400 mt-1 truncate">{tpl.desc}</p>
                </div>
                
                <ChevronRight size={13} className={`ml-auto flex-shrink-0 transition-transform ${
                  isSelected ? 'translate-x-0.5 text-[#810B38]' : 'text-slate-350'
                }`} />
              </button>
            );
          })}
        </div>

      </div>

      {/* Footer Area: Message delivery activity row */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-5 flex-shrink-0 select-none">
        
        {/* Left Side: Description */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-xs">
            <Activity size={16} className="animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider leading-none mt-0.5">WhatsApp Activity Tracking</h4>
            <p className="text-[11px] text-slate-400 mt-1.5 leading-normal">Track your WhatsApp message delivery logs and engagement real-time details.</p>
          </div>
        </div>

        {/* Middle/Right Side: Log Parameters */}
        <div className="flex flex-wrap items-center gap-6 xl:gap-8 w-full xl:w-auto xl:justify-end">
          
          <div className="text-xs flex-grow sm:flex-grow-0">
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Last Message Sent</p>
            <p className="font-extrabold text-slate-700 mt-1.5 leading-none">{activity.template}</p>
            <p className="text-[9.5px] text-slate-400 mt-1 font-semibold">{activity.time}</p>
          </div>

          <div className="text-xs flex-grow sm:flex-grow-0">
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Status</p>
            <span className="badge badge-green mt-1.5 py-0.5 px-2 text-[9.5px] font-extrabold">{activity.status}</span>
          </div>

          <div className="text-xs flex-grow sm:flex-grow-0">
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Delivered On</p>
            <p className="font-extrabold text-slate-700 mt-1.5 leading-none">{activity.deliveredOn}</p>
          </div>

          <div className="text-xs flex-grow sm:flex-grow-0">
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Read On</p>
            <p className="font-extrabold text-slate-700 mt-1.5 leading-none">{activity.readOn}</p>
          </div>

          <button 
            onClick={() => setShowActivityModal(true)}
            className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-650 hover:text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 flex-grow sm:flex-grow-0 justify-center"
          >
            <span>View All Activity</span>
            <ChevronRight size={13} />
          </button>
        </div>

      </div>

      {/* View All Activity Log Modal */}
      {showActivityModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-[100] animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <ClipboardList size={18} className="text-[#810B38]" />
                <h3 className="font-bold text-slate-800 text-sm md:text-base">WhatsApp Delivery Audit Log</h3>
              </div>
              <button 
                onClick={() => setShowActivityModal(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all cursor-pointer font-bold animate-pulse"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Log List */}
            <div className="p-5 overflow-y-auto flex-grow">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-150 text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50">
                    <th className="py-2.5 px-3">Patient</th>
                    <th className="py-2.5 px-3">Template / Category</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Sent Timestamp</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-650">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/40">
                      <td className="py-3 px-3 font-bold text-slate-800">{log.patient}</td>
                      <td className="py-3 px-3">{log.template}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          log.type.includes('Auto') ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {log.type}
                        </span>
                      </td>
                      <td className="py-3 px-3">{log.date}</td>
                      <td className="py-3 px-3 text-right">
                        <span className={`badge ${
                          log.status === 'Read' ? 'badge-green' :
                          log.status === 'Delivered' ? 'badge-blue' : 'badge-red'
                        } text-[9px] py-0.2 px-2`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/20 flex items-center justify-between text-[11px] text-slate-400 font-bold">
              <span>Showing last {auditLogs.length} activity transactions</span>
              <button 
                onClick={() => {
                  setAuditLogs(initialAuditLogs);
                  triggerToast('Activity logs reset.');
                }}
                className="text-[#810B38] hover:underline font-black cursor-pointer"
              >
                Clear Log
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default PatientPortal;
