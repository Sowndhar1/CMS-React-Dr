import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserCircle,
  CalendarDays,
  FileText,
  FolderHeart,
  Receipt,
  TrendingUp,
  Files,
  Clock,
  Settings,
  HelpCircle,
  Headphones,
  ChevronRight,
  QrCode,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const { currentScreen, showScreen, isSidebarCollapsed } = useApp();
  const { currentUser, logout, canAccess } = useAuth();

  const allNavItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', name: 'Patients', icon: Users },
    { id: 'doctors', name: 'Doctors', icon: UserCircle },
    { id: 'appointments', name: 'Appointments', icon: CalendarDays },
    { id: 'medical-records', name: 'Medical Records', icon: FolderHeart },
    { id: 'billing', name: 'Billing', icon: Receipt },
    { id: 'reports', name: 'Reports', icon: TrendingUp },
    { id: 'documents', name: 'Documents', icon: Files },
    { id: 'follow-ups', name: 'Follow Ups', icon: Clock },
    { id: 'portal', name: 'Patient Portal', icon: QrCode },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  // Filter nav items based on current user's role permissions
  const navItems = allNavItems.filter((item) => canAccess(item.id));

  return (
    <aside 
      className={`fixed md:static inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'w-20 -translate-x-full md:translate-x-0' : 'w-60 translate-x-0'
      } flex flex-col flex-shrink-0 text-white h-full overflow-hidden`}
      style={{ backgroundColor: 'var(--color-primary)' }} // Primary Theme Background
    >
      {/* Brand Logo Header */}
      <div className={`py-4 flex items-center ${isSidebarCollapsed ? 'justify-center px-4' : 'gap-3 px-5'}`}>
        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-md">
          {/* White Cross Shield Icon */}
          <svg className="w-6 h-6 text-[#810B38]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7z" fill="white" />
          </svg>
        </div>
        {!isSidebarCollapsed && (
          <div className="flex flex-col select-none animate-fadeIn leading-tight">
            <span className="text-sm font-extrabold tracking-wide text-white font-sans uppercase">
              CMS
            </span>
            <span className="text-[9.5px] font-bold tracking-widest text-[#F1E2D1] font-sans" style={{ opacity: 0.9 }}>
              PORTAL
            </span>
          </div>
        )}
      </div>

      {/* Main Nav */}
      <nav className="flex-grow px-2 py-2 space-y-0.5 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <div
              key={item.id}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl cursor-pointer text-xs font-bold transition-all duration-200 ${
                isActive 
                  ? 'bg-[#F1E2D1] text-[#810B38] shadow-sm' 
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
              } ${isSidebarCollapsed ? 'justify-center sidebar-tooltip' : ''}`}
              onClick={() => {
                showScreen(item.id);
                if (window.innerWidth < 768) {
                  setIsSidebarCollapsed(true);
                }
              }}
              data-tip={isSidebarCollapsed ? item.name : undefined}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!isSidebarCollapsed && <span className="animate-fadeIn">{item.name}</span>}
            </div>
          );
        })}
      </nav>

      {/* Help Banner Widget */}
      {!isSidebarCollapsed && (
        <div className="mx-3 my-2 p-3 rounded-xl bg-white/10 border border-white/5 flex items-center justify-between hover:bg-white/15 transition-all duration-200 cursor-pointer" onClick={() => alert('Contacting support: 1800-APOLLO (276556)')}>
          <div className="flex items-center gap-2.5">
            <div className="w-7.5 h-7.5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <Headphones size={13} className="text-[#F1E2D1]" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-white leading-none">Need Help?</p>
              <p className="text-[9px] text-[#F1E2D1]/80 mt-0.5">Contact Support</p>
            </div>
          </div>
          <ChevronRight size={12} className="text-[#F1E2D1]/80" />
        </div>
      )}

      {/* User profile card + Logout */}
      <div className="p-3 border-t border-white/10 bg-[#541A1A]/40">
        <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center sidebar-tooltip' : 'gap-2.5 p-0.5'} rounded-xl`}
             data-tip={isSidebarCollapsed ? `${currentUser?.name} (${currentUser?.specialty})` : undefined}>
          <img 
            src={currentUser?.avatar || 'https://api.dicebear.com/7.x/notionists/svg?seed=User&backgroundColor=f1f5f9'}
            alt={currentUser?.name}
            className="w-9 h-9 rounded-full border border-white/20 object-cover flex-shrink-0"
          />
          {!isSidebarCollapsed && (
            <>
              <div className="flex-1 min-w-0 animate-fadeIn text-left">
                <div className="text-xs font-bold text-white leading-tight truncate">{currentUser?.name}</div>
                <div className="text-[10px] text-[#F1E2D1]/75 truncate mt-0.5">{currentUser?.specialty}</div>
              </div>
              <button
                onClick={logout}
                title="Sign out"
                className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/15 text-[#F1E2D1]/70 hover:text-white transition-all duration-150 cursor-pointer"
              >
                <LogOut size={13} />
              </button>
            </>
          )}
        </div>
        {/* Logout icon when collapsed */}
        {isSidebarCollapsed && (
          <button
            onClick={logout}
            title="Sign out"
            className="mt-2 w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/15 text-[#F1E2D1]/70 hover:text-white transition-all duration-150 cursor-pointer"
          >
            <LogOut size={13} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
