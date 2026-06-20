import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Calendar,
  Lock,
  Download,
  Printer,
  ChevronRight,
  ClipboardList,
  FlaskConical,
  Receipt,
  User,
  Activity,
  CheckCircle,
  HelpCircle,
  QrCode,
  Shield,
  Smartphone,
  Wifi,
  Battery,
  Signal,
  RefreshCw,
  Send,
  Eye,
  Settings
} from 'lucide-react';

const PatientPortal = () => {
  const { patients, selectedPatientId, setSelectedPatientId, showScreen } = useApp();
  const [activeTab, setActiveTab] = useState('appointments');

  // Find current portal patient
  const patient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const handlePatientChange = (e) => {
    setSelectedPatientId(e.target.value);
  };

  const tabs = [
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'labs', name: 'Lab Reports', icon: FlaskConical },
    { id: 'billing', name: 'Billing', icon: Receipt }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 flex flex-col items-center justify-start font-sans">
      
      {/* Outer Grid Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Simulator Controls & Access diagnostics (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Card 1: Selector Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Settings size={16} className="text-[#810B38]" />
              <span>Simulator Configuration</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Active Patient Session</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 font-semibold focus:outline-none focus:border-[#810B38] focus:bg-white transition-all cursor-pointer"
                  value={patient.id} 
                  onChange={handlePatientChange}
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                  ))}
                </select>
              </div>

              <div className="bg-[#FAF5F0] border border-[#DCC3AA]/30 rounded-xl p-4 flex items-start gap-3">
                <Activity size={16} className="text-[#810B38] mt-0.5 animate-pulse" />
                <div className="text-xs">
                  <span className="font-bold text-slate-800">Simulating Live Device View:</span>
                  <p className="text-slate-500 mt-1 leading-normal">
                    This simulator shows the secure interface the patient sees on their smartphone. You can interact with the tabs, print/download documents, or trigger actions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Active Patient Profile Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <User size={16} className="text-[#810B38]" />
              <span>Active Patient Profile</span>
            </h3>

            <div className="space-y-4">
              {/* Patient Basic Info */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-[#810B38] border border-rose-100 flex items-center justify-center font-bold text-base shadow-sm">
                  {patient.name ? patient.name.split(' ').map(n => n[0]).join('') : 'P'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">{patient.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">
                    ID: {patient.id} · {patient.age} yrs · {patient.gender}
                  </p>
                </div>
              </div>

              {/* Vitals Grid */}
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Simulated Device Vitals Sync</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">BP</span>
                    <span className="text-sm font-bold text-slate-800 mt-2">
                      {patient.vitals?.bp || '120/80'}
                    </span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Pulse</span>
                    <span className="text-sm font-bold text-slate-800 mt-2">
                      {patient.vitals?.pulse || '72 bpm'}
                    </span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Temp</span>
                    <span className="text-sm font-bold text-slate-800 mt-2">
                      {patient.vitals?.temp || '98.6°F'}
                    </span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">SpO₂</span>
                    <span className="text-sm font-bold text-slate-800 mt-2">
                      {patient.vitals?.spo2 || '98%'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-slate-400 font-semibold">Blood Group</span>
                  <span className="font-bold text-slate-700">{patient.bloodGroup}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400 font-semibold">Conditions</span>
                  <span className="font-bold text-slate-700">{patient.condition}</span>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => showScreen('patientdetail')}
                className="w-full py-2.5 bg-[#FAF5F0] hover:bg-[#F1E2D1] border border-[#DCC3AA]/30 rounded-xl text-xs font-bold text-[#810B38] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View Full Medical Record</span>
                <ChevronRight size={12} />
              </button>
            </div>
          </div>

          {/* Card 3: HIPAA & System Trust */}
          <div className="bg-gradient-to-r from-[#810B38]/5 to-slate-50 rounded-2xl border border-[#810B38]/10 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#810B38] shadow-sm flex-shrink-0">
              <Lock size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">HIPAA Compliant Data Hosting</p>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">
                Patient records are fully tokenized and transmitted using bank-grade AES-256 encryption.
              </p>
            </div>
          </div>

        </div>

        {/* Right Side: High-Fidelity Mobile Device Mockup (lg:col-span-7) */}
        <div className="lg:col-span-7 flex justify-center items-center p-4 lg:p-8 bg-slate-100 rounded-3xl border border-slate-200 shadow-inner">
          
          {/* Smartphone Mockup */}
          <div className="relative w-[360px] h-[720px] bg-slate-950 rounded-[48px] shadow-2xl border-[11px] border-slate-900 flex flex-col overflow-hidden ring-[6px] ring-slate-800 ring-offset-4 ring-offset-slate-100">
            
            {/* Dynamic Island */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-900/60 ml-auto mr-4"></div>
            </div>

            {/* Status Bar */}
            <div className="h-11 px-6 bg-[#810B38] text-white flex items-end justify-between pb-1.5 text-[10px] font-bold z-40 select-none">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <Signal size={10} />
                <Wifi size={10} />
                <Battery size={10} />
              </div>
            </div>

            {/* App Content Frame */}
            <div className="flex-grow bg-slate-50 flex flex-col overflow-hidden h-[calc(100%-44px)] relative select-none">
              
              {/* App Body - Scrollable */}
              <div className="flex-grow overflow-y-auto flex flex-col h-[calc(100%-64px)] pb-12">
                
                {/* Header Profile Section */}
                <div className="bg-[#810B38] text-white p-5 pt-3 flex flex-col gap-4 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock size={11} className="text-[#F1E2D1]" />
                      <span className="text-[9px] font-extrabold tracking-widest text-[#F1E2D1] uppercase">CMS Secure Mobile</span>
                    </div>
                    <span className="text-[9px] bg-white/10 border border-white/20 px-2 py-0.5 rounded-full font-bold text-[#F1E2D1]">
                      V1.2.4
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mt-1">
                    <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-extrabold text-sm text-white shadow-inner">
                      {patient.name ? patient.name.split(' ').map(n => n[0]).join('') : 'P'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{patient.name}</h4>
                      <p className="text-[10px] text-[#F1E2D1]/85 mt-1 font-semibold">
                        ID: {patient.id} · Blood: {patient.bloodGroup}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub Tab Buttons */}
                <div className="flex bg-slate-100 border-b border-slate-200/60 flex-shrink-0">
                  {tabs.map((tab) => {
                    const TabIcon = tab.icon;
                    const isTabActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-3 flex flex-col items-center gap-1 border-b-2 text-[9px] font-bold transition-all duration-200 cursor-pointer ${
                          isTabActive 
                            ? 'border-[#810B38] text-[#810B38] bg-white font-extrabold' 
                            : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <TabIcon size={12} />
                        <span>{tab.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Screen View */}
                <div className="p-4 flex-1">
                  


                  {/* Tab Content: Appointments */}
                  {activeTab === 'appointments' && (
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Your Visits</span>
                      
                      {/* Simulated Upcoming Visit */}
                      <div className="bg-white rounded-xl border-2 border-dashed border-[#DCC3AA] p-3 shadow-sm flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-[8px] font-bold uppercase text-[#810B38] bg-[#F1E2D1] px-2 py-0.5 rounded-full">Next Visit</span>
                          <h5 className="text-[11px] font-bold text-slate-800 mt-2 truncate">General Follow-up</h5>
                          <p className="text-[9px] text-slate-400 mt-0.5 font-semibold">Dr. Rajan · Room OPD-2</p>
                          <p className="text-[8.5px] text-slate-400 mt-0.5 truncate">CMS Clinic, Kolkata</p>
                        </div>
                        <div className="text-center bg-[#810B38] text-white rounded-lg p-2 min-w-[56px] shadow-sm flex-shrink-0 flex flex-col justify-center">
                          <p className="text-[8px] font-extrabold uppercase leading-none">July</p>
                          <p className="text-sm font-black mt-1 leading-none">16</p>
                          <p className="text-[7.5px] font-bold mt-1 leading-none opacity-85">10:30 AM</p>
                        </div>
                      </div>

                      {/* Consultation History */}
                      <div className="bg-white rounded-xl border border-slate-200/60 p-3 shadow-sm">
                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">Past History</p>
                        <div className="divide-y divide-slate-100">
                          <div className="py-2 flex justify-between items-center text-[10px]">
                            <div>
                              <p className="font-bold text-slate-700">Initial Checkup</p>
                              <p className="text-[9px] text-slate-400">Dr. Rajan · Managed</p>
                            </div>
                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Completed</span>
                          </div>
                          <div className="py-2 flex justify-between items-center text-[10px]">
                            <div>
                              <p className="font-bold text-slate-700">Blood Diagnostics</p>
                              <p className="text-[9px] text-slate-400">Complete Labs</p>
                            </div>
                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Completed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab Content: Labs */}
                  {activeTab === 'labs' && (
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Lab Reports</span>

                      {patient.labs && patient.labs.length > 0 ? (
                        patient.labs.map((lab, index) => (
                          <div key={index} className="bg-white rounded-xl border border-slate-200/60 p-3 shadow-sm flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-[#810B38] border border-rose-100 flex-shrink-0">
                                <FlaskConical size={14} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[11px] font-bold text-slate-700 truncate">{lab.name}</p>
                                <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Received: {lab.received} · <span className="text-emerald-600 font-bold">{lab.status}</span></p>
                              </div>
                            </div>
                            <button 
                              className="text-[9px] font-bold text-[#810B38] bg-[#FAF5F0] hover:bg-[#F1E2D1] border border-[#DCC3AA]/30 px-2.5 py-1.5 rounded-lg flex-shrink-0 cursor-pointer"
                              onClick={() => alert(`Initiating download for ${lab.name}...`)}
                            >
                              <Download size={10} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-slate-200/60 text-[10px] text-slate-400 font-bold">
                          No lab reports available.
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab Content: Billing */}
                  {activeTab === 'billing' && (
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Billing & Payments</span>

                      {patient.billingHistory && patient.billingHistory.length > 0 ? (
                        patient.billingHistory.map((bill, index) => (
                          <div key={index} className="bg-white rounded-xl border border-slate-200/60 p-3 shadow-sm flex flex-col gap-2.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-bold text-slate-700">{bill.id}</span>
                                <span className="text-[8px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded-full font-bold">Paid</span>
                              </div>
                              <span className="text-[11px] font-black text-slate-800">₹{bill.amount}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-slate-50 pt-2 text-[9px] text-slate-400 font-semibold">
                              <span>Date: {bill.date}</span>
                              <button 
                                className="text-[9px] font-bold text-[#810B38] hover:underline cursor-pointer"
                                onClick={() => alert(`Opening receipt for ${bill.id}`)}
                              >
                                View Receipt
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-slate-200/60 text-[10px] text-slate-400 font-bold">
                          No billing history found.
                        </div>
                      )}
                    </div>
                  )}

                </div>

              </div>

              {/* Home Navigation Indicator Bar */}
              <div className="absolute bottom-1.5 left-0 right-0 h-4 flex items-center justify-center z-50 pointer-events-none select-none">
                <div className="w-32 h-1 bg-slate-900/40 rounded-full"></div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PatientPortal;
