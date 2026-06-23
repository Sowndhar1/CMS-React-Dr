import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Bell, Plus, Calendar, Menu, Palette } from 'lucide-react';

const Header = () => {
  const { currentScreen, showScreen, isSidebarCollapsed, setIsSidebarCollapsed, theme, setTheme } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    // Let's write a simple correct mapping
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const w = weekdays[date.getDay()];
    const d = date.getDate();
    const m = monthNames[date.getMonth()];
    const y = date.getFullYear();
    
    let hrs = date.getHours();
    const mins = String(date.getMinutes()).padStart(2, '0');
    const secs = String(date.getSeconds()).padStart(2, '0');
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;
    
    return `${w}, ${d} ${m} ${y} · ${hrs}:${mins}:${secs} ${ampm}`;
  };

  return (
    <header className="bg-white border-b border-slate-150 px-6 py-3.5 flex items-center justify-between gap-4 flex-shrink-0">
      {/* Left Search Bar and Menu Icon */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors duration-200 cursor-pointer"
          onClick={() => setIsSidebarCollapsed(prev => !prev)}
        >
          <Menu size={20} />
        </button>
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input
            type="text"
            placeholder={currentScreen === 'documents' ? "Search patients, documents, categories…" : "Search patients, appointments, doctors…"}
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-[#810B38] focus:bg-white transition-all duration-200"
          />
        </div>
      </div>

      {/* Right User Actions */}
      <div className="flex items-center gap-2 sm:gap-4.5">
        {/* New Appointment or Upload Document Button */}
        {currentScreen === 'documents' ? (
          <button 
            className="flex items-center gap-1.5 px-2.5 py-2 sm:px-4.5 sm:py-2.5 bg-[#810B38] hover:bg-[#6B082D] text-white rounded-xl text-xs font-bold shadow-sm transition-all duration-200 cursor-pointer"
            onClick={() => window.dispatchEvent(new CustomEvent('trigger-document-upload'))}
          >
            <Plus size={14} className="flex-shrink-0" />
            <span className="hidden sm:inline">Upload Document</span>
          </button>
        ) : (
          <button 
            className="flex items-center gap-1.5 px-2.5 py-2 sm:px-4 sm:py-2 bg-[#810B38] text-white hover:bg-[#6B082D] rounded-full text-xs font-bold shadow-sm transition-all duration-200 cursor-pointer"
            onClick={() => showScreen('appointments')}
          >
            <Plus size={14} className="flex-shrink-0" />
            <span className="hidden sm:inline">New Appointment</span>
          </button>
        )}

        {/* Notifications Icon */}
        <button className="relative p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors duration-200 cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-[#810B38] text-white rounded-full flex items-center justify-center font-bold text-[9px] border-2 border-white">
            3
          </span>
        </button>

        {/* Theme Toggle Button */}
        <button 
          onClick={() => {
            const presets = ['classic', 'healthcare', 'blue', 'green', 'purple', 'custom'];
            const nextIndex = (presets.indexOf(theme) + 1) % presets.length;
            setTheme(presets[nextIndex]);
          }}
          className="p-2 rounded-full text-slate-500 hover:bg-slate-50 transition-all duration-200 cursor-pointer group flex items-center justify-center"
          title={`Active Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)} (Click to cycle presets)`}
        >
          <Palette 
            size={18} 
            className="transition-transform duration-300 group-hover:rotate-12 text-[var(--color-primary)]" 
          />
        </button>

        <div className="w-px h-5 bg-slate-200 hidden lg:block"></div>

        {/* Calendar Date Display */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-600 font-bold bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-sans">
          <Calendar size={14} className="text-slate-500" />
          <span>{formatDateTime(currentTime)}</span>
        </div>

        <div className="w-px h-5 bg-slate-200 hidden lg:block"></div>

        {/* Admin profile pill */}
        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" 
            alt="Admin" 
            className="w-9 h-9 rounded-full border-2 border-slate-200 object-cover shadow-sm flex-shrink-0"
          />
          <div className="text-left hidden md:block">
            <p className="text-xs font-bold text-slate-800" style={{ lineHeight: 1.1 }}>Admin</p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5" style={{ lineHeight: 1 }}>System Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
