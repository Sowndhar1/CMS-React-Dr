import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Analytics } from '@vercel/analytics/react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Screens/Dashboard';
import Patients from './components/Screens/Patients';
import PatientDetail from './components/Screens/PatientDetail';
import Appointments from './components/Screens/Appointments';
import Billing from './components/Screens/Billing';
import MedicalRecords from './components/Screens/MedicalRecords';
import LabReports from './components/Screens/LabReports';
import Reports from './components/Screens/Reports';
import Doctors from './components/Screens/Doctors';
import PatientPortal from './components/Screens/PatientPortal';
import Documents from './components/Screens/Documents';
import FollowUps from './components/Screens/FollowUps';
import Settings from './components/Screens/Settings';

const MainLayout = () => {
  const { currentScreen, isSidebarCollapsed, setIsSidebarCollapsed } = useApp();

  // Screen router map
  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <Patients />;
      case 'patientdetail':
        return <PatientDetail />;
      case 'appointments':
        return <Appointments />;
      case 'billing':
        return <Billing />;
      case 'medical-records':
        return <MedicalRecords />;
      case 'labs':
        return <LabReports />;
      case 'reports':
        return <Reports />;
      case 'doctors':
        return <Doctors />;
      case 'portal':
        return <PatientPortal />;
      case 'documents':
        return <Documents />;
      case 'follow-ups':
        return <FollowUps />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans relative">
      {/* Backdrop overlay for mobile when sidebar is open */}
      {!isSidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarCollapsed(true)}
        />
      )}

      {/* Sidebar Layout */}
      <Sidebar />

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Dynamic Screen View container */}
        <main className="flex-1 overflow-hidden relative bg-slate-100 flex flex-col min-h-0">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <MainLayout />
      <Analytics />
    </AppProvider>
  );
};

export default App;
