import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  ChevronRight,
  FilePlus,
  CalendarPlus,
  Receipt,
  Download,
  Eye,
  FlaskConical,
  Droplets,
  Plus,
  Printer
} from 'lucide-react';

const PatientDetail = () => {
  const { selectedPatient, showScreen, goBack } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [activePrintRx, setActivePrintRx] = useState(null);
  const [activePrintBill, setActivePrintBill] = useState(null);

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'history', name: 'Medical History' },
    { id: 'labs', name: 'Lab Reports' },
    { id: 'billing-tab', name: 'Billing' }
  ];

  return (
    <div className="screen-fade h-full overflow-y-auto p-4 flex flex-col gap-3">
      {/* Breadcrumb + actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            className="btn-ghost p-1 rounded-lg text-slate-500 hover:text-slate-800 cursor-pointer"
            onClick={goBack}
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <button className="hover:text-primary-600 cursor-pointer" onClick={() => showScreen('patients')}>Patients</button>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-slate-800 font-bold">{selectedPatient.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary" onClick={() => alert('Follow-up scheduler coming soon!')}>
            <CalendarPlus size={14} />
            <span>Schedule Follow-up</span>
          </button>
          <button className="btn-primary" onClick={() => showScreen('billing')}>
            <Receipt size={14} />
            <span>Create Bill</span>
          </button>
        </div>
      </div>

      {/* Patient Header Card */}
      <div className="section-card p-5">
        <div className="flex flex-col md:flex-row items-start gap-5">
          <div className="avatar bg-blue-100 text-blue-700" style={{ width: '56px', height: '56px', fontSize: '18px', flexShrink: 0 }}>
            {selectedPatient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-lg font-700 text-slate-800" style={{ fontWeight: 700 }}>{selectedPatient.name}</h2>
              <p className="text-sm text-slate-500 mt-0.5">Patient ID: {selectedPatient.id} · Registered {selectedPatient.registeredDate}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="badge badge-green">{selectedPatient.status}</span>
                <span className="badge badge-blue">{selectedPatient.condition}</span>
                <span className="badge badge-amber">Follow-up due</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-600" style={{ fontWeight: 600 }}>AGE / GENDER</p>
              <p className="text-sm text-slate-700 font-500 mt-1">{selectedPatient.age} years · {selectedPatient.gender}</p>
              <p className="text-xs text-slate-400 mt-2 font-600" style={{ fontWeight: 600 }}>BLOOD GROUP</p>
              <p className="text-sm text-slate-700 font-500 mt-1">{selectedPatient.bloodGroup}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-600" style={{ fontWeight: 600 }}>CONTACT</p>
              <p className="text-sm text-slate-700 font-500 mt-1">+{selectedPatient.phone}</p>
              <p className="text-xs text-slate-400 mt-2 font-600" style={{ fontWeight: 600 }}>EMERGENCY</p>
              <p className="text-sm text-slate-700 font-500 mt-1">+{selectedPatient.emergencyPhone}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-600" style={{ fontWeight: 600 }}>LAST VISIT</p>
              <p className="text-sm text-slate-700 font-500 mt-1">{selectedPatient.lastVisit}</p>
              <p className="text-xs text-slate-400 mt-2 font-600" style={{ fontWeight: 600 }}>NEXT FOLLOW-UP</p>
              <p className="text-sm text-primary-600 font-500 mt-1">{selectedPatient.nextFollowUp}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="section-card flex-1">
        <div className="flex border-b border-slate-100 px-4 gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </div>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="p-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="col-span-1 lg:col-span-2 space-y-5">
                {/* Vitals */}
                <div>
                  <h3 className="text-sm font-600 text-slate-700 mb-3" style={{ fontWeight: 600 }}>
                    Latest Vitals <span className="badge badge-gray ml-2">Today, 9:05 AM</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-400 font-600" style={{ fontWeight: 600 }}>BP</p>
                      <p className="text-lg font-700 text-slate-800 mt-1" style={{ fontWeight: 700 }}>
                        {selectedPatient.vitals?.bp || '120/80'}
                      </p>
                      <p className="text-xs text-amber-600 mt-0.5">High</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-400 font-600" style={{ fontWeight: 600 }}>Pulse</p>
                      <p className="text-lg font-700 text-slate-800 mt-1" style={{ fontWeight: 700 }}>
                        {selectedPatient.vitals?.pulse || '72 bpm'}
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">Normal</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-400 font-600" style={{ fontWeight: 600 }}>Temp</p>
                      <p className="text-lg font-700 text-slate-800 mt-1" style={{ fontWeight: 700 }}>
                        {selectedPatient.vitals?.temp || '98.6°F'}
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">Normal</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-400 font-600" style={{ fontWeight: 600 }}>SpO₂</p>
                      <p className="text-lg font-700 text-slate-800 mt-1" style={{ fontWeight: 700 }}>
                        {selectedPatient.vitals?.spo2 || '98%'}
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">Normal</p>
                    </div>
                  </div>
                </div>

                {/* Today's Complaints */}
                <div>
                  <h3 className="text-sm font-600 text-slate-700 mb-2" style={{ fontWeight: 600 }}>Today's Complaints</h3>
                  <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
                    {selectedPatient.complaints || 'No active complaints logged.'}
                  </div>
                </div>

                {/* Allergies */}
                <div>
                  <h3 className="text-sm font-600 text-slate-700 mb-2" style={{ fontWeight: 600 }}>Known Allergies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPatient.allergies && selectedPatient.allergies.length > 0 ? (
                      selectedPatient.allergies.map((allergy, index) => (
                        <span
                          key={index}
                          className={`badge ${
                            allergy.toLowerCase().includes('no') ? 'badge-gray' : 'badge-red'
                          }`}
                        >
                          {allergy}
                        </span>
                      ))
                    ) : (
                      <span className="badge badge-gray">No allergies recorded</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right column - QR Portal and recent activity */}
              <div className="space-y-5">
                
                {/* QR Patient Portal Card */}
                <div className="bg-[#FAF5F0] border border-[#DCC3AA] rounded-2xl p-5 flex flex-col items-center text-center shadow-sm">
                  <div className="flex items-center gap-1.5 text-[#810B38] font-bold text-xs uppercase tracking-wider mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Secure Patient Portal</span>
                  </div>
                  
                  {/* Custom SVG QR Code */}
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-inner mb-3 cursor-pointer hover:scale-105 transition-transform duration-200" onClick={() => showScreen('portal')}>
                    <svg className="w-32 h-32 text-slate-800" viewBox="0 0 100 100" fill="currentColor">
                      {/* Quiet Zone */}
                      <rect width="100" height="100" fill="white" />
                      
                      {/* Top-Left Finder Pattern */}
                      <rect x="5" y="5" width="30" height="30" fill="black" />
                      <rect x="10" y="10" width="20" height="20" fill="white" />
                      <rect x="15" y="15" width="10" height="10" fill="black" />

                      {/* Top-Right Finder Pattern */}
                      <rect x="65" y="5" width="30" height="30" fill="black" />
                      <rect x="70" y="10" width="20" height="20" fill="white" />
                      <rect x="75" y="15" width="10" height="10" fill="black" />

                      {/* Bottom-Left Finder Pattern */}
                      <rect x="5" y="65" width="30" height="30" fill="black" />
                      <rect x="10" y="70" width="20" height="20" fill="white" />
                      <rect x="15" y="75" width="10" height="10" fill="black" />

                      {/* Bottom-Right Alignment Pattern */}
                      <rect x="70" y="70" width="15" height="15" fill="black" />
                      <rect x="75" y="75" width="5" height="5" fill="white" />

                      {/* Random Data Blocks */}
                      <rect x="40" y="5" width="5" height="10" fill="black" />
                      <rect x="50" y="15" width="10" height="5" fill="black" />
                      <rect x="40" y="25" width="15" height="5" fill="black" />
                      
                      <rect x="5" y="40" width="10" height="5" fill="black" />
                      <rect x="20" y="45" width="15" height="10" fill="black" />
                      <rect x="5" y="55" width="5" height="5" fill="black" />

                      <rect x="45" y="45" width="10" height="10" fill="black" />
                      <rect x="50" y="65" width="5" height="15" fill="black" />
                      <rect x="40" y="80" width="15" height="5" fill="black" />

                      <rect x="65" y="40" width="15" height="5" fill="black" />
                      <rect x="80" y="45" width="5" height="15" fill="black" />
                      <rect x="65" y="55" width="10" height="5" fill="black" />
                      
                      {/* Red cross inside the middle for medical feel */}
                      <rect x="45" y="40" width="10" height="20" fill="#810B38" />
                      <rect x="40" y="45" width="20" height="10" fill="#810B38" />
                    </svg>
                  </div>

                  <p className="text-[11px] text-slate-500 font-medium px-2 leading-relaxed">
                    Scan this unique QR code to access medical records, invoices, and follow-ups.
                  </p>
                  
                  <button 
                    className="w-full mt-4 py-2 bg-[#810B38] text-white rounded-xl text-xs font-bold hover:bg-[#6B082D] transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    onClick={() => showScreen('portal')}
                  >
                    <span>Simulate Mobile Scan</span>
                  </button>
                </div>

                {/* Recent Activity Timeline */}
                <div>
                  <h3 className="text-sm font-600 text-slate-700 mb-3" style={{ fontWeight: 600 }}>Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="timeline-dot bg-primary-400 mt-1.5 flex-shrink-0"></div>
                      <div>
                        <p className="text-xs font-500 text-slate-700">Consultation</p>
                        <p className="text-xs text-slate-400">Today · Dr. Rajan</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="timeline-dot bg-teal-400 mt-1.5 flex-shrink-0"></div>
                      <div>
                        <p className="text-xs font-500 text-slate-700">Lab report received</p>
                        <p className="text-xs text-slate-400">28 May · CBC</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="timeline-dot bg-slate-300 mt-1.5 flex-shrink-0"></div>
                      <div>
                        <p className="text-xs font-500 text-slate-700">Bill paid</p>
                        <p className="text-xs text-slate-400 font-sans">22 May · ₹400</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Medical History */}
        {activeTab === 'history' && (
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h3 className="text-sm font-600 text-slate-700 mb-3" style={{ fontWeight: 600 }}>Chronic Conditions</h3>
                <div className="space-y-2">
                  {selectedPatient.history && selectedPatient.history.length > 0 ? (
                    selectedPatient.history.map((hist, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
                        <div>
                          <p className="text-sm font-500 text-slate-700">{hist.condition}</p>
                          <p className="text-xs text-slate-400">Diagnosed {hist.date}</p>
                        </div>
                        <span className={`badge ${
                          hist.status === 'Managed' ? 'badge-amber' : 'badge-green'
                        }`}>{hist.status}</span>
                      </div>
                    ))
                  ) : (
                    <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-500 text-center">No chronic conditions on record</div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-600 text-slate-700 mb-3" style={{ fontWeight: 600 }}>Past Surgeries</h3>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-500 text-center">
                  {selectedPatient.surgeries && selectedPatient.surgeries.length > 0
                    ? selectedPatient.surgeries.join(', ')
                    : 'No surgeries on record'}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="text-sm font-600 text-slate-700 mb-3" style={{ fontWeight: 600 }}>Family History</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Father</p>
                  <p className="text-sm text-slate-700 font-500 mt-1">
                    {selectedPatient.familyHistory?.father || 'No known conditions'}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Mother</p>
                  <p className="text-sm text-slate-700 font-500 mt-1">
                    {selectedPatient.familyHistory?.mother || 'No known conditions'}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Siblings</p>
                  <p className="text-sm text-slate-700 font-500 mt-1">
                    {selectedPatient.familyHistory?.siblings || 'No known conditions'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Tab 4: Lab Reports */}
        {activeTab === 'labs' && (
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-600">Latest lab reports</p>
              <button className="btn-secondary" onClick={() => alert('Lab order manager coming soon!')}>
                <Plus size={13} />
                <span>Order Test</span>
              </button>
            </div>
            <div className="space-y-2">
              {selectedPatient.labs && selectedPatient.labs.length > 0 ? (
                selectedPatient.labs.map((lab, index) => (
                  <div key={index} className="flex items-center gap-4 border border-slate-200 rounded-xl p-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      lab.name.includes('Count') ? 'bg-blue-50' : 'bg-amber-50'
                    }`}>
                      {lab.name.includes('Count') ? (
                        <FlaskConical className="text-blue-600" size={18} />
                      ) : (
                        <Droplets className="text-amber-600" size={18} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-500 text-slate-800 text-sm">{lab.name}</p>
                      <p className="text-xs text-slate-400">Ordered {lab.ordered} · Result received {lab.received}</p>
                    </div>
                    <span className={`badge ${
                      lab.status === 'Normal' ? 'badge-green' : 'badge-amber'
                    }`}>{lab.status}</span>
                    <button className="btn-ghost text-xs">
                      <Eye size={14} />
                      <span>View</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-500 text-center">No lab reports found.</div>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: Billing */}
        {activeTab === 'billing-tab' && (
          <div className="p-5">
            <div className="space-y-3">
              {selectedPatient.billingHistory && selectedPatient.billingHistory.length > 0 ? (
                selectedPatient.billingHistory.map((bill, index) => (
                  <div key={index} className="flex items-center gap-4 bg-slate-50 rounded-xl p-4">
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 text-sm">
                      <div>
                        <p className="text-xs text-slate-400">Invoice</p>
                        <p className="font-500 text-slate-800">{bill.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Date</p>
                        <p className="font-500 text-slate-800">{bill.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Amount</p>
                        <p className="font-500 text-slate-800">₹{bill.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Status</p>
                        <span className={`badge ${
                          bill.status === 'Paid' ? 'badge-green' : 'badge-amber'
                        }`}>{bill.status}</span>
                      </div>
                    </div>
                    <button className="btn-ghost text-xs cursor-pointer text-primary-600 hover:bg-primary-50 px-2 py-1 rounded flex items-center gap-1" onClick={() => setActivePrintBill(bill)}>
                      <Printer size={13} />
                      <span>View/Print</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-500 text-center">No billing history found.</div>
              )}
            </div>
          </div>
        )}
      </div>


      {/* Print Bill Modal */}
      {activePrintBill && (
        <div className="modal-overlay print:hidden" onClick={() => setActivePrintBill(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50 flex-shrink-0">
              <h3 className="font-bold text-slate-700 text-sm">Invoice Print View</h3>
              <div className="flex items-center gap-2">
                <button 
                  className="btn-primary cursor-pointer animate-none" 
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                  onClick={() => window.print()}
                >
                  <Printer size={13} />
                  <span>Print Invoice</span>
                </button>
                <button 
                  className="btn-secondary cursor-pointer" 
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                  onClick={() => setActivePrintBill(null)}
                >
                  Close
                </button>
              </div>
            </div>
            <div className="p-8 overflow-y-auto printable-area bg-white text-xs space-y-4">
              <div className="text-center border-b border-slate-100 pb-3 flex flex-col items-center justify-center">
                <img src="/Ref Pics/Apollo.png" alt="Apollo Hospitals" className="h-10 object-contain mb-2" />
                <p className="font-700 text-slate-800 text-sm font-sans" style={{ fontWeight: 700 }}>MedFlow Partner Clinic</p>
                <p className="text-slate-400 font-sans mt-0.5">{activePrintBill.id} · {activePrintBill.date}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100 font-sans">
                <div>
                  <p className="text-xs text-slate-400 font-semibold mb-1">BILL TO</p>
                  <p className="font-semibold text-slate-800">{selectedPatient.name}</p>
                  <p className="text-slate-500 font-sans">Patient ID: {selectedPatient.id}</p>
                </div>
                <div className="text-right font-sans">
                  <p className="text-xs text-slate-400 font-semibold mb-1">BILL FROM</p>
                  <p className="font-semibold text-slate-800">Dr. Rajan Kumar</p>
                  <p className="text-slate-500">MedFlow Clinic Partner</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 font-sans">
                <div className="flex justify-between font-semibold text-slate-500 text-[10px] uppercase">
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div className="border-t border-slate-100 my-1"></div>
                <div className="flex justify-between">
                  <span>OPD Consultation Fee</span>
                  <span className="font-semibold">₹{activePrintBill.amount - Math.round(activePrintBill.amount * 0.15)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Medicines dispensed & others</span>
                  <span className="font-semibold">₹{Math.round(activePrintBill.amount * 0.15)}</span>
                </div>
                <div className="border-t border-dashed border-slate-100 my-2"></div>
                <div className="flex justify-between text-slate-400 text-[10px]">
                  <span>GST (18% inclusive)</span>
                  <span>₹{Math.round(activePrintBill.amount * 0.18)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm border-t border-slate-200 pt-2">
                  <span className="text-slate-800 font-bold">Total Paid</span>
                  <span className="text-primary-700 font-bold">₹{activePrintBill.amount}</span>
                </div>
              </div>

              <div className="bg-green-50 text-green-700 rounded-xl p-3 text-center mt-4 font-sans">
                <p className="font-semibold text-xs">✓ Payment Received via Card/Cash/UPI</p>
              </div>

              <div className="text-center text-[10px] text-slate-400 pt-4 mt-6 border-t border-slate-100 font-sans">
                <p>Thank you for choosing Apollo Hospitals & MedFlow Partner network.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetail;
