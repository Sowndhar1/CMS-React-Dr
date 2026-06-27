import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Download, CheckCircle, Plus, Trash2, Printer } from 'lucide-react';

const Billing = () => {
  const { selectedPatient, addInvoice, showScreen, goBack } = useApp();
  
  // local states for builder
  const [invoiceId] = useState('INV-2025-058');
  const [invoiceDate] = useState('02 Jun 2025');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  
  // Invoice items state
  const [items, setItems] = useState([
    { desc: 'OPD Consultation Fee', hsn: '998311', qty: 1, rate: 400 },
    { desc: 'Lab Test — CBC', hsn: '998311', qty: 1, rate: 250 },
    { desc: 'Medicines dispensed', hsn: '30049099', qty: 1, rate: 185 }
  ]);

  // Actions for items
  const handleAddItem = () => {
    setItems([...items, { desc: '', hsn: '', qty: 1, rate: 0 }]);
  };

  const handleUpdateItem = (index, field, value) => {
    const updated = [...items];
    if (field === 'qty') {
      updated[index][field] = parseInt(value) || 0;
    } else if (field === 'rate') {
      updated[index][field] = parseFloat(value) || 0;
    } else {
      updated[index][field] = value;
    }
    setItems(updated);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Computations
  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  // Save/pay actions
  const handleMarkAsPaid = () => {
    setPaymentStatus('Paid');
    const newInvoice = {
      id: invoiceId,
      date: invoiceDate,
      amount: total,
      status: 'Paid'
    };
    addInvoice(selectedPatient.id, newInvoice);
    alert('Invoice marked as Paid and added to billing records!');
    showScreen('patientdetail');
  };

  return (
    <div className="screen-fade h-full overflow-y-auto p-2 bg-transparent">
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col gap-4 min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            className="btn-ghost p-1 rounded-lg text-slate-500 hover:text-slate-800 cursor-pointer"
            onClick={goBack}
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-base font-bold text-slate-800">
            Billing: <span className="text-slate-500 font-normal">{selectedPatient.name} ({selectedPatient.id})</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary" onClick={() => window.print()}>
            <Download size={14} />
            <span>Download PDF</span>
          </button>
          <button className="btn-primary" onClick={handleMarkAsPaid}>
            <CheckCircle size={14} />
            <span>Mark as Paid</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Invoice Builder */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-4">
          
          {/* Patient + Doctor info */}
          <div className="section-card p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs text-slate-400 font-600 uppercase tracking-wide mb-2" style={{ fontWeight: 600 }}>
                  Bill To
                </p>
                <p className="font-600 text-slate-800 text-sm" style={{ fontWeight: 600 }}>{selectedPatient.name}</p>
                <p className="text-sm text-slate-500">Patient ID: {selectedPatient.id}</p>
                <p className="text-sm text-slate-500">+{selectedPatient.phone}</p>
                <p className="text-sm text-slate-500">{selectedPatient.email}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-600 uppercase tracking-wide mb-2" style={{ fontWeight: 600 }}>
                  Bill From
                </p>
                <p className="font-600 text-slate-800 text-sm" style={{ fontWeight: 600 }}>MedFlow Clinic</p>
                <p className="text-sm text-slate-500">Dr. Rajan Kumar, MBBS MD</p>
                <p className="text-sm text-slate-500 font-sans">GST: 27AABCU9603R1ZP</p>
                <p className="text-sm text-slate-500 font-sans">Reg: MH-12345</p>
              </div>
            </div>
          </div>

          {/* Invoice lines */}
          <div className="section-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <h3 className="text-sm font-600 text-slate-700" style={{ fontWeight: 600 }}>Invoice Items</h3>
              <button
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12px' }}
                onClick={handleAddItem}
              >
                <Plus size={13} />
                <span>Add Item</span>
              </button>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <div className="min-w-[600px] pb-2">
                  <div className="grid text-xs font-600 text-slate-400 uppercase tracking-wide mb-3"
                    style={{ gridTemplateColumns: '3fr 1fr 1fr 1fr auto', gap: '8px' }}>
                    <span>Description</span>
                    <span>HSN/SAC</span>
                    <span>Qty</span>
                    <span>Amount</span>
                    <span></span>
                  </div>
                  
                  <div className="space-y-2">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="grid items-center gap-2"
                        style={{ gridTemplateColumns: '3fr 1fr 1fr 1fr auto' }}
                      >
                        <input
                          type="text"
                          className="form-input text-sm py-2"
                          placeholder="Consultation, medicine name etc."
                          value={item.desc}
                          onChange={(e) => handleUpdateItem(index, 'desc', e.target.value)}
                        />
                        <input
                          type="text"
                          className="form-input text-sm py-2"
                          placeholder="HSN"
                          value={item.hsn}
                          onChange={(e) => handleUpdateItem(index, 'hsn', e.target.value)}
                        />
                        <input
                          type="number"
                          className="form-input text-sm py-2"
                          placeholder="Qty"
                          value={item.qty}
                          onChange={(e) => handleUpdateItem(index, 'qty', e.target.value)}
                        />
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" style={{ pointerEvents: 'none' }}>₹</span>
                          <input
                            type="number"
                            className="form-input text-sm py-2"
                            style={{ paddingLeft: '26px' }}
                            placeholder="Rate"
                            value={item.rate}
                            onChange={(e) => handleUpdateItem(index, 'rate', e.target.value)}
                          />
                        </div>
                        <button
                          className="btn-ghost text-red-400 p-1.5 hover:text-red-600"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Totals computation */}
              <div className="mt-5 ml-auto max-w-xs border-t border-slate-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="text-slate-700 font-500">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">GST (18%)</span>
                  <span className="text-slate-700 font-500">₹{gst}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Discount</span>
                  <span className="text-green-600 font-500">− ₹0</span>
                </div>
                <div className="flex justify-between text-base font-700 border-t border-slate-200 pt-2 mt-2"
                  style={{ fontWeight: 700 }}>
                  <span className="text-slate-800">Total</span>
                  <span className="text-primary-700">₹{total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment config */}
          <div className="section-card p-4">
            <h3 className="text-sm font-600 text-slate-700 mb-3" style={{ fontWeight: 600 }}>Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Payment Mode</label>
                <select
                  className="form-input form-select text-sm py-2"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Insurance">Insurance</option>
                </select>
              </div>
              <div>
                <label className="form-label">Amount Paid</label>
                <input type="text" className="form-input" value={`₹${total}`} readOnly />
              </div>
              <div>
                <label className="form-label">Payment Status</label>
                <select
                  className="form-input form-select text-sm py-2"
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Partial">Partial</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right side Invoice preview + History */}
        <div className="flex flex-col gap-4">
          {/* Invoice Live Preview */}
          <div className="section-card flex-1">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 flex-shrink-0">
              <h3 className="text-sm font-600 text-slate-700" style={{ fontWeight: 600 }}>Invoice Preview</h3>
              <div className="flex items-center gap-2">
                <span className={`badge ${
                  paymentStatus === 'Paid' ? 'badge-green' : 'badge-amber'
                }`}>{paymentStatus}</span>
                <button 
                  className="btn-ghost text-xs text-primary-600 hover:bg-primary-50 px-2 py-1 rounded flex items-center gap-1 cursor-pointer"
                  onClick={() => window.print()}
                >
                  <Printer size={13} />
                  <span>Print</span>
                </button>
              </div>
            </div>
            
            <div className="p-4 text-xs space-y-3 printable-area bg-white">
              <div className="text-center border-b border-slate-100 pb-3 flex flex-col items-center justify-center">
                <img src="/Ref Pics/Apollo.png" alt="Apollo Hospitals" className="h-10 object-contain mb-2" />
                <p className="font-700 text-slate-800 text-sm font-sans" style={{ fontWeight: 700 }}>MedFlow Partner Clinic</p>
                <p className="text-slate-400 font-sans mt-0.5">{invoiceId} · {invoiceDate}</p>
              </div>

              {items.filter(item => item.desc.trim()).map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-slate-400">
                    {item.desc} {item.qty > 1 ? `x${item.qty}` : ''}
                  </span>
                  <span className="text-slate-700 font-medium">₹{item.qty * item.rate}</span>
                </div>
              ))}
              
              <div className="flex justify-between text-slate-400 pt-2 border-t border-dashed border-slate-100">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>GST (18%)</span>
                <span>₹{gst}</span>
              </div>
              
              <div className="flex justify-between font-700 text-sm border-t border-slate-200 pt-2" style={{ fontWeight: 700 }}>
                <span className="text-slate-800">Total</span>
                <span className="text-primary-700">₹{total}</span>
              </div>
              
              <div className={`mt-3 rounded-xl p-3 text-center transition ${
                paymentStatus === 'Paid' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
              }`}>
                <p className="font-500 text-xs">
                  {paymentStatus === 'Paid' ? '✓ Payment Received' : '⏳ Payment Pending'}
                </p>
              </div>
            </div>
          </div>

          {/* Billing history list */}
          <div className="section-card">
            <div className="px-4 py-3 border-b border-slate-100">
              <h3 className="text-sm font-600 text-slate-700" style={{ fontWeight: 600 }}>Billing History</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {selectedPatient.billingHistory && selectedPatient.billingHistory.length > 0 ? (
                selectedPatient.billingHistory.map((bill, index) => (
                  <div key={index} className="flex items-center justify-between px-4 py-3 text-xs">
                    <div>
                      <p className="font-500 text-slate-700">{bill.id}</p>
                      <p className="text-slate-400 font-sans">{bill.date} · ₹{bill.amount}</p>
                    </div>
                    <span className={`badge ${
                      bill.status === 'Paid' ? 'badge-green' : 'badge-amber'
                    }`}>{bill.status}</span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-slate-400 text-xs">No invoices on file</div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Billing;
