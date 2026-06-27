import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { Analytics } from '@vercel/analytics/react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import ProtectedRoute from './components/Auth/ProtectedRoute';
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
        return <ProtectedRoute screen="dashboard"><Dashboard /></ProtectedRoute>;
      case 'patients':
        return <ProtectedRoute screen="patients"><Patients /></ProtectedRoute>;
      case 'patientdetail':
        return <ProtectedRoute screen="patientdetail"><PatientDetail /></ProtectedRoute>;
      case 'appointments':
        return <ProtectedRoute screen="appointments"><Appointments /></ProtectedRoute>;
      case 'billing':
        return <ProtectedRoute screen="billing"><Billing /></ProtectedRoute>;
      case 'medical-records':
        return <ProtectedRoute screen="medical-records"><MedicalRecords /></ProtectedRoute>;
      case 'labs':
        return <ProtectedRoute screen="labs"><LabReports /></ProtectedRoute>;
      case 'reports':
        return <ProtectedRoute screen="reports"><Reports /></ProtectedRoute>;
      case 'doctors':
        return <ProtectedRoute screen="doctors"><Doctors /></ProtectedRoute>;
      case 'portal':
        return <ProtectedRoute screen="portal"><PatientPortal /></ProtectedRoute>;
      case 'documents':
        return <ProtectedRoute screen="documents"><Documents /></ProtectedRoute>;
      case 'follow-ups':
        return <ProtectedRoute screen="follow-ups"><FollowUps /></ProtectedRoute>;
      case 'settings':
        return <ProtectedRoute screen="settings"><Settings /></ProtectedRoute>;
      default:
        return <ProtectedRoute screen="dashboard"><Dashboard /></ProtectedRoute>;
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
    <AuthProvider>
      <ProtectedRoute>
        <AppProvider>
          <MainLayout />
          <Analytics />
        </AppProvider>
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default App;
