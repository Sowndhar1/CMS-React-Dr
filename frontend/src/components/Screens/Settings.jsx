import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Settings as SettingsIcon, 
  Sliders, 
  User, 
  ShieldCheck, 
  BellRing, 
  Laptop, 
  FileText, 
  Cpu, 
  Construction, 
  Sparkles,
  Palette
} from 'lucide-react';

const Settings = () => {
  const { goBack, theme, setTheme, customColor, setCustomColor } = useApp();
  const [activeTab, setActiveTab] = useState('system');
  const [showToast, setShowToast] = useState(false);

  const themesList = [
    { id: 'classic', name: 'Classic Burgundy', colors: ['#810B38', '#DCC3AA', '#FAF5F0'], desc: 'The traditional clinical burgundy and warm gold accent palette.' },
    { id: 'healthcare', name: 'Healthcare Blue', colors: ['#2563EB', '#60A5FA', '#F8FAFC'], desc: 'Professional clinical blue color scheme designed for comfort and readability.' },
    { id: 'blue', name: 'Slate Blue', colors: ['#2563EB', '#1D4ED8', '#EFF6FF'], desc: 'Vibrant tech-inspired deep blue palette with slate outlines.' },
    { id: 'green', name: 'Emerald Wellness', colors: ['#10B981', '#A7F3D0', '#F0FDF4'], desc: 'Eco-friendly healing green tones for calming patient-centric interfaces.' },
    { id: 'purple', name: 'Amethyst Care', colors: ['#8B5CF6', '#EDE9FE', '#F5F3FF'], desc: 'Modern and premium amethyst purple palette for specialized clinics.' },
    { id: 'custom', name: 'Custom Accent', colors: [customColor, '#94A3B8', '#F8FAFC'], desc: 'Create your own branding palette. Choose a custom primary accent.' }
  ];

  const presetColors = [
    '#2563EB', // Blue
    '#6366F1', // Indigo
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#EF4444', // Red
    '#F97316', // Orange
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#0D9488', // Teal
    '#06B6D4'  // Cyan
  ];

  const settingsTabs = [
    { id: 'general', name: 'General Preferences', icon: Sliders },
    { id: 'profile', name: 'My Profile', icon: User },
    { id: 'security', name: 'Security & Access', icon: ShieldCheck },
    { id: 'notifications', name: 'Notification Rules', icon: BellRing },
    { id: 'system', name: 'Clinic Branding', icon: Laptop },
    { id: 'about', name: 'System Info', icon: Cpu }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId !== 'system') {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <div className="screen-fade h-full overflow-y-auto lg:overflow-hidden p-2 bg-transparent min-h-0 relative select-none">
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col gap-6 min-h-full lg:h-full lg:overflow-hidden lg:min-h-0">
      
      {/* Toast alert widget */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-slate-900 text-white text-xs font-semibold px-4.5 py-3 rounded-2xl shadow-xl z-50 animate-fadeIn border border-white/10 flex items-center gap-2.5">
          <Sparkles size={14} className="text-[#FAF5F0] animate-pulse" />
          <span>Configuring live system sandbox settings...</span>
        </div>
      )}

      {/* Title Header Block */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          className="btn-ghost p-1 rounded-lg text-slate-500 hover:text-slate-800 cursor-pointer"
          onClick={goBack}
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-base font-bold text-slate-800">Settings</h1>

        </div>
      </div>

      {/* Main Settings Panel Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:overflow-hidden lg:min-h-0">
        
        {/* Left Side: Navigation Tabs List (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col p-4 gap-2 h-fit">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Configuration Groups</h2>
          
          <div className="flex flex-col gap-1.5">
            {settingsTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left text-xs font-black transition-all cursor-pointer border ${
                    isActive 
                      ? 'bg-[#FAF5F0] text-[#810B38] border-[#DCC3AA]/30 shadow-xs scale-[1.01]' 
                      : 'bg-transparent text-slate-550 border-transparent hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <TabIcon size={15} className={isActive ? 'text-[#810B38]' : 'text-slate-400'} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Tab Details Panel & Construction Template View (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col flex-grow min-h-0 relative">
          
          {/* Subtle Decorative Gradient Header Area */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#810B38] via-[#DCC3AA] to-slate-400"></div>
          
          {/* Settings Tab Content Area */}
          {activeTab === 'system' ? (
            <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-slate-50/10 gap-6 select-none">
              <div>
                <h3 className="text-sm font-black text-slate-850">Clinic Branding & Visual Theme</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Customize the interface theme, colors, and design tokens across the healthcare dashboard.</p>
              </div>

              <div className="w-full h-px bg-slate-200/60"></div>

              {/* Preset Themes Section */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Theme Presets</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {themesList.map((t) => {
                    const isActive = theme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`flex flex-col gap-2.5 p-4 rounded-xl text-left border transition-all cursor-pointer bg-white relative ${
                          isActive
                            ? 'border-[var(--color-primary)] shadow-sm scale-[1.01]'
                            : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50/30'
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="text-xs font-extrabold text-slate-855">{t.name}</span>
                          {isActive && (
                            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
                          )}
                        </div>
                        <div className="flex gap-1.5 items-center">
                          {t.colors.map((c, i) => (
                            <span
                              key={i}
                              className="w-4.5 h-4.5 rounded-full border border-slate-100 shadow-xs"
                              style={{ backgroundColor: c }}
                            ></span>
                          ))}
                        </div>
                        <p className="text-[10px] text-slate-450 font-semibold leading-relaxed">{t.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Accent Picker */}
              {theme === 'custom' && (
                <div className="flex flex-col gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs animate-fadeIn">
                  <div>
                    <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Custom Identity Accent Color</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Select a brand highlight color. All system UI elements, navigation states, and action buttons will dynamically render in this shade.</p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 items-center">
                    {presetColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setCustomColor(color)}
                        className={`w-7.5 h-7.5 rounded-full transition-all cursor-pointer flex items-center justify-center border-2 ${
                          customColor.toLowerCase() === color.toLowerCase()
                            ? 'border-slate-800 scale-110 shadow-md'
                            : 'border-transparent hover:scale-105 hover:shadow-sm'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      >
                        {customColor.toLowerCase() === color.toLowerCase() && (
                          <span className="w-2 h-2 rounded-full bg-white shadow-xs"></span>
                        )}
                      </button>
                    ))}

                    {/* Palette Native Selector */}
                    <div className="relative flex items-center justify-center w-7.5 h-7.5 rounded-full border border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer overflow-hidden shadow-xs">
                      <Palette size={13} className="text-slate-500 pointer-events-none" />
                      <input
                        type="color"
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        title="Pick Custom Color"
                      />
                    </div>

                    <div className="w-px h-6 bg-slate-200 mx-1"></div>

                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1 shadow-inner">
                      {customColor.toUpperCase()}
                    </span>
                  </div>
                </div>
              )}

              {/* Branding Live Preview */}
              <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">Live Element Preview</h4>
                <div className="flex flex-wrap gap-4 items-center p-4.5 rounded-xl bg-slate-50/50 border border-slate-200/50">
                  <button className="px-4 py-2 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] text-xs font-bold rounded-xl transition-all shadow-sm">
                    Primary Button
                  </button>
                  <button className="px-4 py-2 bg-white text-slate-600 border border-[var(--color-primary-border)] hover:bg-[var(--color-primary-light)] text-xs font-bold rounded-xl transition-all shadow-xs">
                    Secondary Button
                  </button>
                  <span className="text-xs font-bold text-[var(--color-primary)] hover:underline cursor-pointer">
                    Interactive Accent Text Link
                  </span>
                  <div className="px-3 py-1 rounded-full bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] text-[var(--color-primary)] text-[10px] font-black shadow-xs">
                    Status Indicator Tag
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/10 overflow-y-auto">
              
              {/* Spinning Settings & Construction SVG Icon Group */}
              <div className="relative flex items-center justify-center mb-6">
                
                {/* Outer Pulsing Glow */}
                <div className="absolute w-24 h-24 rounded-full bg-[#FAF5F0] border border-[#DCC3AA]/20 animate-ping opacity-60"></div>
                
                {/* Inner Circle Container */}
                <div className="relative w-20 h-20 rounded-full bg-[#FAF5F0] border-2 border-[#DCC3AA]/20 shadow-md flex items-center justify-center text-[#810B38]">
                  
                  {/* Construction Warning Indicator */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#810B38] text-white flex items-center justify-center shadow-md animate-bounce">
                    <Construction size={12} />
                  </div>
                  
                  {/* Large Spinning Settings Icon */}
                  <SettingsIcon size={34} className="animate-spin text-[#810B38]" style={{ animationDuration: '6s' }} />
                </div>
              </div>

              {/* Warning / Development Status Details */}
              <span className="text-[10px] font-black uppercase tracking-widest text-[#810B38] bg-[#FAF5F0] px-3 py-1 rounded-full border border-[#DCC3AA]/20 mb-3.5">
                Panel Under Active Development
              </span>
              
              <h3 className="text-base font-extrabold text-slate-800 tracking-tight max-w-md">
                Configure Clinic & Access Controls
              </h3>
              
              <p className="text-xs text-slate-450 leading-relaxed max-w-sm mt-2">
                Our engineering team is building a secure, customizable configuration layer. Once launched, you will be able to customize notifications, change clinic information, and secure portal configurations.
              </p>

              {/* Progress Bar Widget */}
              <div className="w-full max-w-xs mt-6">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                  <span>Database Sync Status</span>
                  <span className="text-emerald-600 font-extrabold">85% Compiled</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 shadow-inner">
                  <div className="h-full bg-emerald-500 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                </div>
              </div>

              {/* Back to Dashboard Button Shortcut */}
              <button 
                onClick={goBack}
                className="mt-8 px-5 py-2.5 bg-[#810B38] hover:bg-[#6B082D] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft size={13} />
                <span>Back to Dashboard</span>
              </button>

            </div>
          )}

          {/* Connected Page Footer - Sits flush at the bottom of the card, matching documents footer style */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/20 flex items-center justify-between text-[11px] text-slate-400 font-extrabold flex-shrink-0">
            <span>Settings Engine v1.0.4 Sandbox</span>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 bg-white border border-slate-200 rounded-xl px-3 py-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Staging Environment</span>
            </div>
          </div>

        </div>

      </div>

      </div>
    </div>
  );
};

export default Settings;
