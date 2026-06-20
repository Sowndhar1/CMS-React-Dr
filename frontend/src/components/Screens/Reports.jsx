import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Users,
  Receipt,
  Clock,
  TrendingUp,
  Calendar,
  Download
} from 'lucide-react';

const Reports = () => {
  const { goBack } = useApp();
  const [timeframe, setTimeframe] = useState('Monthly');

  // Doughnut Chart segment calculators
  // R = 36, C = 2 * PI * R = 226.19
  const radius = 36;
  const circumference = 2 * Math.PI * radius; // 226.2
  
  const diagnoses = [
    { name: 'Hypertension', percentage: 40, color: '#24b1b1', offset: 0 },
    { name: 'Diabetes', percentage: 30, color: '#10b981', offset: 40 },
    { name: 'Asthma', percentage: 15, color: '#f59e0b', offset: 70 },
    { name: 'Cardiac Risk', percentage: 10, color: '#ef4444', offset: 85 },
    { name: 'Others', percentage: 5, color: '#64748b', offset: 95 }
  ];

  return (
    <div className="screen-fade h-full overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50/50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            className="btn-ghost p-1 rounded-lg text-slate-500 hover:text-slate-800 cursor-pointer"
            onClick={goBack}
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-base font-bold text-slate-800">Reports & Analytics</h1>
        </div>

        <div className="flex items-center gap-3">
          <select
            className="form-input py-1.5 text-xs bg-white border-slate-200"
            style={{ width: '110px' }}
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>

          <button className="btn-secondary text-xs flex items-center gap-1.5 py-2 cursor-pointer">
            <Download size={13} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-shrink-0">
        <div className="stat-card flex items-center gap-4 py-3.5 px-4">
          <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
            <Users size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Consultations</p>
            <p className="text-xl font-bold text-slate-800 mt-0.5">2,840</p>
            <span className="text-[9px] text-green-500 font-bold block mt-0.5">↑ 12% vs last month</span>
          </div>
        </div>

        <div className="stat-card flex items-center gap-4 py-3.5 px-4">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
            <Receipt size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
            <p className="text-xl font-bold text-slate-800 mt-0.5">₹14.20 L</p>
            <span className="text-[9px] text-green-500 font-bold block mt-0.5">↑ 8.4% vs last month</span>
          </div>
        </div>

        <div className="stat-card flex items-center gap-4 py-3.5 px-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg. Wait Time</p>
            <p className="text-xl font-bold text-slate-800 mt-0.5">12.5m</p>
            <span className="text-[9px] text-green-500 font-bold block mt-0.5">↓ 15% improvement</span>
          </div>
        </div>

        <div className="stat-card flex items-center gap-4 py-3.5 px-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Diagnosis Accuracy</p>
            <p className="text-xl font-bold text-slate-800 mt-0.5">99.2%</p>
            <span className="text-[9px] text-slate-400 block mt-0.5">Clinical QA target met</span>
          </div>
        </div>
      </div>

      {/* Row 2: Visual Dashboard Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Chart 1: Patient Visits Trend */}
        <div className="section-card p-5 bg-white flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Patient Visits Trend</h3>
            <p className="text-[10.5px] text-slate-400 mt-0.5">Visits over the last 6 months</p>
          </div>
          
          <div className="h-48 w-full mt-4 flex items-end relative">
            <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
              {/* Grids */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="300" y2="50" stroke="#f1f5f9" strokeWidth="0.5" />
              <line x1="0" y1="80" x2="300" y2="80" stroke="#f1f5f9" strokeWidth="0.5" />
              <line x1="0" y1="110" x2="300" y2="110" stroke="#f1f5f9" strokeWidth="0.5" />

              {/* Area Under Curve */}
              <path
                d="M 10 110 L 10 80 Q 40 40 70 65 T 130 30 T 190 70 T 250 20 T 290 10 L 290 110 Z"
                fill="url(#visits-gradient)"
                opacity="0.15"
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="visits-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#24b1b1" />
                  <stop offset="100%" stopColor="#24b1b1" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Line path */}
              <path
                d="M 10 80 Q 40 40 70 65 T 130 30 T 190 70 T 250 20 T 290 10"
                fill="none"
                stroke="#24b1b1"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Glowing Dots */}
              <circle cx="10" cy="80" r="3.5" fill="white" stroke="#24b1b1" strokeWidth="2" />
              <circle cx="70" cy="65" r="3.5" fill="white" stroke="#24b1b1" strokeWidth="2" />
              <circle cx="130" cy="30" r="3.5" fill="white" stroke="#24b1b1" strokeWidth="2" />
              <circle cx="190" cy="70" r="3.5" fill="white" stroke="#24b1b1" strokeWidth="2" />
              <circle cx="250" cy="20" r="3.5" fill="white" stroke="#24b1b1" strokeWidth="2" />
              <circle cx="290" cy="10" r="3.5" fill="white" stroke="#24b1b1" strokeWidth="2" />
            </svg>
          </div>
          
          <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-2 px-1">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>

        {/* Chart 2: Revenue Breakdown */}
        <div className="section-card p-5 bg-white flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Monthly Revenue</h3>
            <p className="text-[10.5px] text-slate-400 mt-0.5">Earnings in ₹ Lakhs</p>
          </div>

          <div className="h-48 w-full mt-4 flex items-end justify-between relative px-2">
            {/* Grid Line Guides */}
            <div className="absolute inset-x-0 top-0 border-t border-slate-50"></div>
            <div className="absolute inset-x-0 top-1/4 border-t border-slate-50"></div>
            <div className="absolute inset-x-0 top-2/4 border-t border-slate-50"></div>
            <div className="absolute inset-x-0 top-3/4 border-t border-slate-50"></div>
            
            {/* Bar elements */}
            <div className="flex flex-col items-center gap-1.5 w-8">
              <span className="text-[9px] font-bold text-slate-400">1.8L</span>
              <div className="w-5 bg-primary-100 rounded-t-md hover:bg-primary-300 transition-colors" style={{ height: '55px' }}></div>
            </div>
            <div className="flex flex-col items-center gap-1.5 w-8">
              <span className="text-[9px] font-bold text-slate-400">2.1L</span>
              <div className="w-5 bg-primary-100 rounded-t-md hover:bg-primary-300 transition-colors" style={{ height: '70px' }}></div>
            </div>
            <div className="flex flex-col items-center gap-1.5 w-8">
              <span className="text-[9px] font-bold text-slate-400">2.4L</span>
              <div className="w-5 bg-primary-100 rounded-t-md hover:bg-primary-300 transition-colors" style={{ height: '85px' }}></div>
            </div>
            <div className="flex flex-col items-center gap-1.5 w-8">
              <span className="text-[9px] font-bold text-slate-400">2.9L</span>
              <div className="w-5 bg-primary-100 rounded-t-md hover:bg-primary-300 transition-colors" style={{ height: '100px' }}></div>
            </div>
            <div className="flex flex-col items-center gap-1.5 w-8">
              <span className="text-[9px] font-bold text-slate-400">3.2L</span>
              <div className="w-5 bg-primary-100 rounded-t-md hover:bg-primary-300 transition-colors" style={{ height: '115px' }}></div>
            </div>
            <div className="flex flex-col items-center gap-1.5 w-8">
              <span className="text-[9px] font-bold text-primary-600">4.2L</span>
              <div className="w-5 bg-primary-500 rounded-t-md shadow-sm" style={{ height: '140px' }}></div>
            </div>
          </div>

          <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-2 px-1">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>

      </div>

      {/* Row 3: Diagnosis Doughnut Breakdown & Top Ailments List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Diagnosis Doughnut Chart */}
        <div className="section-card p-5 bg-white md:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Diagnosis Profile</h3>
            <p className="text-[10.5px] text-slate-400 mt-0.5">Most common cases handled</p>
          </div>

          <div className="flex items-center justify-center py-6">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
                <circle cx="45" cy="45" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                
                {diagnoses.map((diag, index) => {
                  const strokeDash = (diag.percentage / 100) * circumference;
                  const strokeOffset = circumference - strokeDash;
                  // Cumulative offset calculation:
                  let prevPercentSum = 0;
                  for (let i = 0; i < index; i++) {
                    prevPercentSum += diagnoses[i].percentage;
                  }
                  const startOffset = circumference - (prevPercentSum / 100) * circumference;

                  return (
                    <circle
                      key={diag.name}
                      cx="45"
                      cy="45"
                      r={radius}
                      fill="transparent"
                      stroke={diag.color}
                      strokeWidth="8"
                      strokeDasharray={`${strokeDash} ${circumference}`}
                      strokeDashoffset={startOffset}
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-slate-500 uppercase leading-none">Top Case</span>
                <span className="text-base font-bold text-slate-800 mt-1 leading-none">40%</span>
              </div>
            </div>
          </div>

          <div className="space-y-1 text-[10px] text-slate-500 font-semibold px-2">
            {diagnoses.map(diag => (
              <div key={diag.name} className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: diag.color }}></span>
                  <span>{diag.name}</span>
                </div>
                <span>{diag.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnosis Trends List */}
        <div className="section-card p-5 bg-white md:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Monthly Clinical Breakdown</h3>
            <p className="text-[10.5px] text-slate-400 mt-0.5">Top primary diagnostic profiles recorded</p>
          </div>

          <div className="divide-y divide-slate-50 flex-grow mt-4">
            <div className="flex justify-between items-center py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Diagnosis Class</span>
              <div className="flex gap-16">
                <span>Cases</span>
                <span>Revenue Share</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-2.5 text-xs text-slate-700">
              <span className="font-semibold">Essential Hypertension</span>
              <div className="flex gap-16 font-medium text-slate-600">
                <span className="w-10 text-right">1,136</span>
                <span className="w-20 text-right">₹5.68 Lakh</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-2.5 text-xs text-slate-700">
              <span className="font-semibold">Type 2 Diabetes Mellitus</span>
              <div className="flex gap-16 font-medium text-slate-600">
                <span className="w-10 text-right">852</span>
                <span className="w-20 text-right">₹4.26 Lakh</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-2.5 text-xs text-slate-700">
              <span className="font-semibold">Bronchial Asthma</span>
              <div className="flex gap-16 font-medium text-slate-600">
                <span className="w-10 text-right">426</span>
                <span className="w-20 text-right">₹2.13 Lakh</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-2.5 text-xs text-slate-700">
              <span className="font-semibold">Ischemic Heart Disease Risk</span>
              <div className="flex gap-16 font-medium text-slate-600">
                <span className="w-10 text-right">284</span>
                <span className="w-20 text-right">₹1.42 Lakh</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Reports;
