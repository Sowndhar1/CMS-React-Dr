import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Users,
  Receipt,
  Clock,
  TrendingUp,
  Download,
  CalendarDays,
  MoreHorizontal
} from 'lucide-react';

const Reports = () => {
  const { goBack } = useApp();
  const [timeframe, setTimeframe] = useState('Monthly');

  // Doughnut Chart Configuration
  const radius = 36;
  const circumference = 2 * Math.PI * radius; // ~226.2
  
  const diagnoses = [
    { name: 'Hypertension', percentage: 40, color: '#0ea5e9', gradient: 'url(#grad-hyper)', shadow: 'rgba(14, 165, 233, 0.5)' },
    { name: 'Diabetes', percentage: 30, color: '#10b981', gradient: 'url(#grad-diab)', shadow: 'rgba(16, 185, 129, 0.5)' },
    { name: 'Asthma', percentage: 15, color: '#f59e0b', gradient: 'url(#grad-asthma)', shadow: 'rgba(245, 158, 11, 0.5)' },
    { name: 'Cardiac Risk', percentage: 10, color: '#f43f5e', gradient: 'url(#grad-cardiac)', shadow: 'rgba(244, 63, 94, 0.5)' },
    { name: 'Others', percentage: 5, color: '#8b5cf6', gradient: 'url(#grad-others)', shadow: 'rgba(139, 92, 246, 0.5)' }
  ];

  return (
    <div className="reports-root h-full overflow-y-auto bg-transparent p-2 font-sans relative">
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col gap-4 min-h-full max-w-[1400px] mx-auto">
        
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              className="btn-ghost p-1 rounded-lg text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 transition-all cursor-pointer"
              onClick={goBack}
            >
              <ArrowLeft size={16} />
            </button>
            <h1 className="text-base font-bold text-slate-800">Reports & Analytics</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <CalendarDays size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                className="pl-8 pr-6 py-1.5 text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/10 transition-all cursor-pointer appearance-none shadow-sm"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="8" height="5" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <button className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white text-[11px] font-bold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer">
              <Download size={13} strokeWidth={2} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* ── KPI Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
          
          {/* Consultations Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start mb-3 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Users size={16} strokeWidth={2.5} />
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-extrabold rounded-full flex items-center gap-1">
                <TrendingUp size={10} /> +12%
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Consultations</h3>
              <p className="text-2xl font-black text-slate-800">2,840</p>
            </div>
            
            {/* Ambient background sparkline */}
            <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 pointer-events-none" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d="M 0 30 C 15 25 30 28 45 18 C 60 10 75 22 90 12 L 100 8 L 100 40 L 0 40 Z" fill="url(#grad-violet-spark)" />
              <defs>
                <linearGradient id="grad-violet-spark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Revenue Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start mb-3 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Receipt size={16} strokeWidth={2.5} />
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-extrabold rounded-full flex items-center gap-1">
                <TrendingUp size={10} /> +8.4%
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Revenue</h3>
              <p className="text-2xl font-black text-slate-800">₹14.2L</p>
            </div>
            <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 pointer-events-none" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d="M 0 32 C 20 28 38 20 55 16 C 72 12 85 18 100 10 L 100 40 L 0 40 Z" fill="url(#grad-emerald-spark)" />
              <defs>
                <linearGradient id="grad-emerald-spark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Wait Time Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start mb-3 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Clock size={16} strokeWidth={2.5} />
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-extrabold rounded-full flex items-center gap-1">
                <TrendingUp size={10} className="rotate-180" /> -15%
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Avg. Wait Time</h3>
              <p className="text-2xl font-black text-slate-800">12.5m</p>
            </div>
            <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 pointer-events-none" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d="M 0 10 C 18 18 35 25 50 20 C 65 15 80 24 100 28 L 100 40 L 0 40 Z" fill="url(#grad-rose-spark)" />
              <defs>
                <linearGradient id="grad-rose-spark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="1" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Accuracy Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start mb-3 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                <TrendingUp size={16} strokeWidth={2.5} />
              </div>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-extrabold rounded-full flex items-center gap-1">
                Target Met
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Diagnosis Accuracy</h3>
              <p className="text-2xl font-black text-slate-800">99.2%</p>
            </div>
            <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 pointer-events-none" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d="M 0 22 C 25 18 45 24 65 14 C 80 8 90 12 100 8 L 100 40 L 0 40 Z" fill="url(#grad-cyan-spark)" />
              <defs>
                <linearGradient id="grad-cyan-spark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

        </div>

        {/* ── Main Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Patient Visits Trend (Area Chart) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col h-56 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">Patient Visits Trend</h3>
                <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Visits over the last 6 months</p>
              </div>
              <button className="w-6 h-6 rounded-md hover:bg-slate-50 flex items-center justify-center text-slate-400 transition-colors">
                <MoreHorizontal size={14} />
              </button>
            </div>

            <div className="flex-1 relative w-full flex items-end">
              <svg className="w-full h-full chart-anim" viewBox="0 0 400 160" preserveAspectRatio="none">
                <defs>
                  {/* Subtle Grid Pattern */}
                  <pattern id="grid" width="400" height="32" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="32" x2="400" y2="32" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                  </pattern>
                  {/* Premium Area Gradient */}
                  <linearGradient id="visits-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                  {/* Line Drop Shadow */}
                  <filter id="line-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#06b6d4" floodOpacity="0.3" />
                  </filter>
                </defs>

                {/* Grid */}
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Area under curve */}
                <path
                  d="M 10 130 C 50 130, 50 80, 100 100 C 150 120, 180 40, 230 50 C 280 60, 310 110, 350 70 C 370 50, 380 30, 390 20 L 390 160 L 10 160 Z"
                  fill="url(#visits-area)"
                  className="area-path"
                />

                {/* Main Line */}
                <path
                  d="M 10 130 C 50 130, 50 80, 100 100 C 150 120, 180 40, 230 50 C 280 60, 310 110, 350 70 C 370 50, 380 30, 390 20"
                  fill="none"
                  stroke="url(#line-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="url(#line-shadow)"
                  className="line-path"
                />
                
                <defs>
                  <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>

                {/* Interactive Data Points */}
                {[
                  {cx: 10, cy: 130}, {cx: 100, cy: 100}, {cx: 230, cy: 50}, 
                  {cx: 350, cy: 70}, {cx: 390, cy: 20}
                ].map((pt, i) => (
                  <g key={i} className="data-point group/pt cursor-pointer">
                    <circle cx={pt.cx} cy={pt.cy} r="12" fill="transparent" /> {/* Hit area */}
                    <circle cx={pt.cx} cy={pt.cy} r="4" fill="#fff" stroke="#06b6d4" strokeWidth="2.5" className="transition-all duration-300 group-hover/pt:r-[6px] group-hover/pt:stroke-[3px]" shadow="0" />
                  </g>
                ))}
              </svg>
            </div>
            
            <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-3 px-1">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>

          {/* Monthly Revenue (Bar Chart) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col h-56 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">Monthly Revenue</h3>
                <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Earnings in ₹ Lakhs</p>
              </div>
              <button className="w-6 h-6 rounded-md hover:bg-slate-50 flex items-center justify-center text-slate-400 transition-colors">
                <MoreHorizontal size={14} />
              </button>
            </div>

            <div className="flex-1 w-full flex items-end justify-between relative px-3 chart-anim-bars">
              {/* Horizontal grid lines */}
              <div className="absolute inset-x-0 top-0 border-t border-slate-100/60 border-dashed"></div>
              <div className="absolute inset-x-0 top-1/4 border-t border-slate-100/60 border-dashed"></div>
              <div className="absolute inset-x-0 top-2/4 border-t border-slate-100/60 border-dashed"></div>
              <div className="absolute inset-x-0 top-3/4 border-t border-slate-100/60 border-dashed"></div>
              <div className="absolute inset-x-0 bottom-0 border-t border-slate-200"></div>

              {/* Data Bars */}
              {[
                { val: '1.8L', h: '35%' },
                { val: '2.1L', h: '45%' },
                { val: '2.4L', h: '55%' },
                { val: '2.9L', h: '65%' },
                { val: '3.2L', h: '75%' },
                { val: '4.2L', h: '95%', active: true }
              ].map((bar, i) => (
                <div key={i} className="relative flex flex-col items-center group/bar cursor-pointer w-8 z-10 h-full justify-end">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-7 bg-slate-800 text-white text-[9px] font-bold px-2 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none transform -translate-y-1 group-hover/bar:-translate-y-0">
                    ₹{bar.val}
                  </div>
                  
                  {/* Background Track (Hover) */}
                  <div className="absolute bottom-0 w-6 h-full bg-slate-50 rounded-t-lg opacity-0 group-hover/bar:opacity-100 transition-opacity -z-10"></div>
                  
                  {/* The Bar */}
                  <div 
                    className={`w-6 rounded-t-lg transition-all duration-500 ease-out group-hover/bar:w-7 ${
                      bar.active 
                        ? 'bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                        : 'bg-gradient-to-t from-slate-200 to-slate-100 group-hover/bar:from-cyan-300 group-hover/bar:to-cyan-200'
                    }`} 
                    style={{ height: bar.h, transformOrigin: 'bottom' }}
                  ></div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-3 px-3">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span className="text-cyan-600">Jun</span>
            </div>
          </div>
        </div>

        {/* ── Detail Row (Doughnut & Table) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Diagnosis Profile (Doughnut Chart) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 lg:col-span-1 flex flex-col">
            <h3 className="text-sm font-extrabold text-slate-800 mb-0.5">Diagnosis Profile</h3>
            <p className="text-[10px] font-semibold text-slate-400 mb-4">Distribution of primary cases</p>

            <div className="flex-1 flex flex-col items-center justify-center relative">
              
              <svg width="140" height="140" viewBox="0 0 100 100" className="transform -rotate-90 chart-anim-donut">
                <defs>
                  <linearGradient id="grad-hyper" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0ea5e9"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient>
                  <linearGradient id="grad-diab" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#059669"/></linearGradient>
                  <linearGradient id="grad-asthma" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fcd34d"/><stop offset="100%" stopColor="#f59e0b"/></linearGradient>
                  <linearGradient id="grad-cardiac" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f43f5e"/><stop offset="100%" stopColor="#e11d48"/></linearGradient>
                  <linearGradient id="grad-others" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#c4b5fd"/><stop offset="100%" stopColor="#8b5cf6"/></linearGradient>
                </defs>

                {/* Background track */}
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="10" />

                {/* Segments */}
                {diagnoses.map((diag, index) => {
                  const gap = 1.5; // pixel gap
                  const segmentPercent = diag.percentage / 100;
                  const strokeDash = Math.max(0, (segmentPercent * circumference) - gap);
                  
                  let prevPercentSum = 0;
                  for (let i = 0; i < index; i++) {
                    prevPercentSum += diagnoses[i].percentage;
                  }
                  const startOffset = circumference - (prevPercentSum / 100) * circumference;

                  return (
                    <circle
                      key={diag.name}
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke={diag.gradient}
                      strokeWidth="10"
                      strokeDasharray={`${strokeDash} ${circumference}`}
                      strokeDashoffset={startOffset}
                      strokeLinecap="round"
                      className="transition-all duration-300 hover:stroke-[12px] cursor-pointer"
                    />
                  );
                })}
              </svg>
              
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Top Case</span>
                <span className="text-2xl font-black text-slate-800 tracking-tighter">40<span className="text-sm">%</span></span>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-4">
              {diagnoses.map(diag => (
                <div key={diag.name} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: diag.color }}></div>
                    <span className="text-[10px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors truncate">{diag.name}</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-800 pl-1">{diag.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Breakdown (Rich Data Table) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 lg:col-span-2 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">Monthly Clinical Breakdown</h3>
                <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Top primary diagnostic profiles & revenue generation</p>
              </div>
              <button className="text-[10px] font-bold text-cyan-600 hover:text-cyan-700 hover:underline cursor-pointer">
                View Detailed Report
              </button>
            </div>

            <div className="flex-1 w-full">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-100 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                <div className="col-span-5">Diagnosis Class</div>
                <div className="col-span-3 text-right pr-2">Total Cases</div>
                <div className="col-span-4 text-right">Revenue Generated</div>
              </div>

              {/* Table Rows */}
              <div className="flex flex-col mt-1">
                {[
                  { name: 'Essential Hypertension', cases: '1,136', rev: '₹5.68 Lakh', percent: 85, color: '#0ea5e9', bg: 'bg-sky-50/50' },
                  { name: 'Type 2 Diabetes Mellitus', cases: '852', rev: '₹4.26 Lakh', percent: 65, color: '#10b981', bg: 'bg-emerald-50/50' },
                  { name: 'Bronchial Asthma', cases: '426', rev: '₹2.13 Lakh', percent: 45, color: '#f59e0b', bg: 'bg-amber-50/50' },
                  { name: 'Ischemic Heart Disease', cases: '284', rev: '₹1.42 Lakh', percent: 25, color: '#f43f5e', bg: 'bg-rose-50/50' },
                  { name: 'Acute Pharyngitis', cases: '142', rev: '₹0.71 Lakh', percent: 10, color: '#8b5cf6', bg: 'bg-violet-50/50' }
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-12 gap-2 items-center py-2 px-2 rounded-lg hover:${row.bg} transition-colors group cursor-pointer`}>
                    
                    {/* Diagnosis Name */}
                    <div className="col-span-5 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: row.color }}></div>
                      <span className="text-[11px] font-bold text-slate-700 group-hover:text-slate-900 truncate">{row.name}</span>
                    </div>
                    
                    {/* Cases Badge */}
                    <div className="col-span-3 flex justify-end">
                      <span className="px-2 py-0.5 bg-slate-50 text-slate-600 text-[10px] font-extrabold rounded-md border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-colors">
                        {row.cases}
                      </span>
                    </div>
                    
                    {/* Revenue Progress */}
                    <div className="col-span-4 flex items-center gap-2 justify-end">
                      <span className="text-[11px] font-extrabold text-slate-800 w-16 text-right">{row.rev}</span>
                      <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${row.percent}%`, backgroundColor: row.color }}></div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        /* Embedded animations for the premium dashboard feel */
        @keyframes drawLine {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeInArea {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes growBar {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes spinDonut {
          from { stroke-dashoffset: 226; } 
        }

        .chart-anim .line-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawLine 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .chart-anim .area-path {
          opacity: 0;
          animation: fadeInArea 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards;
        }

        .chart-anim .data-point {
          opacity: 0;
          animation: fadeInArea 0.5s ease 1s forwards;
        }

        .chart-anim-bars > div > div:last-child {
          transform: scaleY(0);
          animation: growBar 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .chart-anim-bars > div:nth-child(1) > div:last-child { animation-delay: 0.1s; }
        .chart-anim-bars > div:nth-child(2) > div:last-child { animation-delay: 0.2s; }
        .chart-anim-bars > div:nth-child(3) > div:last-child { animation-delay: 0.3s; }
        .chart-anim-bars > div:nth-child(4) > div:last-child { animation-delay: 0.4s; }
        .chart-anim-bars > div:nth-child(5) > div:last-child { animation-delay: 0.5s; }
        .chart-anim-bars > div:nth-child(6) > div:last-child { animation-delay: 0.6s; }

        .chart-anim-donut circle:not(:first-child) {
          animation: spinDonut 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
      `}</style>
    </div>
  );
};

export default Reports;
