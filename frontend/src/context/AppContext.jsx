import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

const hexToRgb = (hex) => {
  const bigint = parseInt(hex.replace('#', ''), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
};

const rgbToHex = (r, g, b) => {
  return '#' + [r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

const adjustColorBrightness = (hex, percent) => {
  try {
    const { r, g, b } = hexToRgb(hex);
    const amount = Math.round(2.55 * percent);
    return rgbToHex(r + amount, g + amount, b + amount);
  } catch (e) {
    return hex;
  }
};

const applyCustomColor = (primaryHex) => {
  const root = document.documentElement;
  const hoverHex = adjustColorBrightness(primaryHex, -15);
  const lightHex = adjustColorBrightness(primaryHex, 90);
  const borderHex = adjustColorBrightness(primaryHex, 75);
  const secondaryHex = adjustColorBrightness(primaryHex, 80);
  const darkHex = adjustColorBrightness(primaryHex, -50);
  
  root.style.setProperty('--color-primary', primaryHex);
  root.style.setProperty('--color-primary-hover', hoverHex);
  root.style.setProperty('--color-primary-light', lightHex);
  root.style.setProperty('--color-primary-border', borderHex);
  root.style.setProperty('--color-primary-secondary', secondaryHex);
  root.style.setProperty('--color-primary-dark', darkHex);
  root.style.setProperty('--color-bg-main', '#F8FAFC');
};

export const AppProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [screenHistory, setScreenHistory] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('#1042');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('hms-theme') || 'classic');
  const [customColor, setCustomColorState] = useState(() => localStorage.getItem('hms-custom-color') || '#2563EB');

  const setCustomColor = (color) => {
    localStorage.setItem('hms-custom-color', color);
    setCustomColorState(color);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('hms-theme', theme);
    
    // Remove all previous theme classes
    const classesToRemove = Array.from(document.body.classList).filter(c => c.startsWith('theme-'));
    classesToRemove.forEach(c => document.body.classList.remove(c));
    
    // Add new theme class
    document.body.classList.add(`theme-${theme}`);
    
    if (theme !== 'classic') {
      document.body.classList.add('theme-customized');
    } else {
      document.body.classList.remove('theme-customized');
    }
    
    if (theme === 'custom') {
      applyCustomColor(customColor);
    } else {
      const customProps = [
        '--color-primary',
        '--color-primary-hover',
        '--color-primary-light',
        '--color-primary-border',
        '--color-primary-secondary',
        '--color-primary-dark',
        '--color-bg-main'
      ];
      customProps.forEach(prop => document.documentElement.style.removeProperty(prop));
    }
  }, [theme, customColor]);
  
  // Mock patients database
  const [patients, setPatients] = useState([
    {
      id: '#1052',
      name: 'Rohan Das',
      email: 'rohan.das@email.com',
      age: 34,
      gender: 'Male',
      phone: '98765 43210',
      emergencyPhone: '98765 00000',
      bloodGroup: 'O+',
      condition: 'Knee Pain',
      status: 'Active',
      lastVisit: '05 Jun',
      nextFollowUp: '20 Jun 2025',
      registeredDate: '15 Jan 2024',
      vitals: { bp: '125/82', pulse: '78 bpm', temp: '98.6°F', spo2: '99%', weight: '74 kg' },
      complaints: "Persistent left knee pain for 2 weeks. Pain worsens after walking or climbing stairs.",
      allergies: ['None'],
      history: [{ condition: 'Patellar Tendonitis', date: 'Jan 2024', status: 'Active' }],
      surgeries: [],
      familyHistory: { father: 'None', mother: 'Arthritis', siblings: 'None' },
      prescriptions: [],
      labs: [],
      billingHistory: []
    },
    {
      id: '#1055',
      name: 'Ananya Rao',
      email: 'ananya.r@email.com',
      age: 29,
      gender: 'Female',
      phone: '87654 12345',
      emergencyPhone: '87654 00000',
      bloodGroup: 'A+',
      condition: 'Pregnancy',
      status: 'New',
      lastVisit: 'Today',
      nextFollowUp: 'Today',
      registeredDate: 'Today',
      vitals: { bp: '110/70', pulse: '68 bpm', temp: '98.1°F', spo2: '98%', weight: '62 kg' },
      complaints: "Routine prenatal checkup. Experiencing mild morning sickness and fatigue.",
      allergies: ['Penicillin'],
      history: [],
      surgeries: [],
      familyHistory: { father: 'Diabetes', mother: 'None', siblings: 'None' },
      prescriptions: [],
      labs: [],
      billingHistory: []
    },
    {
      id: '#1042',
      name: 'Amit Mehta',
      email: 'amit.m@email.com',
      age: 34,
      gender: 'Male',
      phone: '98765 43210',
      emergencyPhone: '98765 00000',
      bloodGroup: 'B+',
      condition: 'Hypertension',
      status: 'Active',
      lastVisit: 'Today, 9:00 AM',
      nextFollowUp: '4 Jun 2025',
      registeredDate: '12 Jan 2024',
      vitals: { bp: '140/90', pulse: '82 bpm', temp: '98.6°F', spo2: '98%', weight: '74 kg' },
      complaints: "Patient presents with persistent headache for 3 days, mild fever (99.2°F), and fatigue. No nausea or vomiting. Headache is dull, frontal, aggravated by exertion.",
      allergies: ['Penicillin', 'Aspirin', 'No food allergies'],
      history: [
        { condition: 'Essential Hypertension', date: 'Jan 2024', status: 'Managed' },
        { condition: 'Migraine', date: 'Mar 2023', status: 'Stable' }
      ],
      surgeries: [],
      familyHistory: { father: 'Hypertension, Diabetes T2', mother: 'Thyroid disorder', siblings: 'No known conditions' },
      prescriptions: [],
      labs: [
        { name: 'Complete Blood Count (CBC)', ordered: '26 May', received: '28 May', status: 'Normal' },
        { name: 'Lipid Profile', ordered: '10 Feb', received: '12 Feb', status: 'Borderline' }
      ],
      billingHistory: [
        { id: 'INV-2025-047', date: '22 May 2025', amount: 400, status: 'Paid' },
        { id: 'INV-2025-031', date: '10 Feb 2025', amount: 600, status: 'Paid' },
        { id: 'INV-2025-008', date: '12 Jan 2024', amount: 400, status: 'Paid' }
      ]
    },
    {
      id: '#1039',
      name: 'Sunita Patel',
      email: 's.patel@email.com',
      age: 52,
      gender: 'Female',
      phone: '87654 32109',
      emergencyPhone: '87654 00000',
      bloodGroup: 'O+',
      condition: 'Diabetes T2',
      status: 'Follow-up',
      lastVisit: '28 May',
      nextFollowUp: '10 Jun 2025',
      registeredDate: '05 Mar 2023',
      vitals: { bp: '130/80', pulse: '76 bpm', temp: '98.4°F', spo2: '97%', weight: '68 kg' },
      complaints: "Regular follow-up for diabetes management. Complaining of slight dryness of mouth.",
      allergies: ['Sulfa Drugs'],
      history: [{ condition: 'Type 2 Diabetes', date: 'Mar 2023', status: 'Managed' }],
      surgeries: [],
      familyHistory: { father: 'Diabetes', mother: 'None', siblings: 'None' },
      prescriptions: [],
      labs: [],
      billingHistory: []
    },
    {
      id: '#1035',
      name: 'Rahul Kumar',
      email: 'rahul.k@email.com',
      age: 28,
      gender: 'Male',
      phone: '76543 21098',
      emergencyPhone: '76543 00000',
      bloodGroup: 'A+',
      condition: 'Asthma',
      status: 'Active',
      lastVisit: '22 May',
      nextFollowUp: '15 Jun 2025',
      registeredDate: '10 Feb 2024',
      vitals: { bp: '120/75', pulse: '72 bpm', temp: '98.2°F', spo2: '99%', weight: '70 kg' },
      complaints: "Mild wheezing during early morning. Uses inhaler as needed.",
      allergies: ['Dust', 'Pollen'],
      history: [{ condition: 'Bronchial Asthma', date: 'Feb 2024', status: 'Active' }],
      surgeries: [],
      familyHistory: { father: 'Asthma', mother: 'None', siblings: 'None' },
      prescriptions: [],
      labs: [],
      billingHistory: []
    },
    {
      id: '#1048',
      name: 'Priya Desai',
      email: 'priya.d@email.com',
      age: 41,
      gender: 'Female',
      phone: '65432 10987',
      emergencyPhone: '65432 00000',
      bloodGroup: 'AB-',
      condition: 'New Patient',
      status: 'New',
      lastVisit: 'Today',
      nextFollowUp: 'Today',
      registeredDate: '02 Jun 2025',
      vitals: { bp: '115/70', pulse: '80 bpm', temp: '98.8°F', spo2: '98%', weight: '58 kg' },
      complaints: "First consultation. Needs routine health checkup and blood tests advice.",
      allergies: ['None'],
      history: [],
      surgeries: [],
      familyHistory: { father: 'None', mother: 'Breast Cancer (survivor)', siblings: 'None' },
      prescriptions: [],
      labs: [],
      billingHistory: []
    },
    {
      id: '#1021',
      name: 'Vijay Nair',
      email: 'v.nair@email.com',
      age: 60,
      gender: 'Male',
      phone: '54321 09876',
      emergencyPhone: '54321 00000',
      bloodGroup: 'O-',
      condition: 'Cardiac Risk',
      status: 'Follow-up',
      lastVisit: '15 May',
      nextFollowUp: '05 Jun 2025',
      registeredDate: '15 Nov 2022',
      vitals: { bp: '150/95', pulse: '88 bpm', temp: '98.6°F', spo2: '96%', weight: '82 kg' },
      complaints: "Occasional chest tightness when climbing stairs. High cholesterol on file.",
      allergies: ['Statins'],
      history: [{ condition: 'Hyperlipidemia', date: 'Nov 2022', status: 'Managed' }],
      surgeries: [],
      familyHistory: { father: 'Heart Attack at age 55', mother: 'Stroke', siblings: 'Coronary artery disease' },
      prescriptions: [],
      labs: [],
      billingHistory: []
    },
    {
      id: '#1019',
      name: 'Meera Ghosh',
      email: 'meera.g@email.com',
      age: 35,
      gender: 'Female',
      phone: '43210 98765',
      emergencyPhone: '43210 00000',
      bloodGroup: 'B-',
      condition: 'Skin Allergy',
      status: 'Active',
      lastVisit: '10 May',
      nextFollowUp: '12 Jun 2025',
      registeredDate: '20 Aug 2023',
      vitals: { bp: '118/72', pulse: '74 bpm', temp: '98.4°F', spo2: '98%', weight: '54 kg' },
      complaints: "Red itchy patches on arms. Started after contact with new detergent.",
      allergies: ['Fragrances', 'Certain Detergents'],
      history: [{ condition: 'Contact Dermatitis', date: 'Aug 2023', status: 'Active' }],
      surgeries: [],
      familyHistory: { father: 'None', mother: 'None', siblings: 'Eczema' },
      prescriptions: [],
      labs: [],
      billingHistory: []
    },
    {
      id: '#1015',
      name: 'Kavita Sharma',
      email: 'kavita.s@email.com',
      age: 45,
      gender: 'Female',
      phone: '32109 87654',
      emergencyPhone: '32109 00000',
      bloodGroup: 'AB+',
      condition: 'Thyroid',
      status: 'Active',
      lastVisit: '5 May',
      nextFollowUp: '10 Jun 2025',
      registeredDate: '14 May 2023',
      vitals: { bp: '122/78', pulse: '68 bpm', temp: '98.0°F', spo2: '99%', weight: '65 kg' },
      complaints: "Feeling cold constantly. Fatigued and mild hair fall.",
      allergies: ['None'],
      history: [{ condition: 'Hypothyroidism', date: 'May 2023', status: 'Managed' }],
      surgeries: [],
      familyHistory: { father: 'None', mother: 'Hypothyroidism', siblings: 'None' },
      prescriptions: [],
      labs: [],
      billingHistory: []
    }
  ]);

  // Appointments database state
  const [appointments, setAppointments] = useState([
    // Completed earlier
    { id: 'apt-c1', patientId: '#1010', patientName: 'Ananya Rao', time: '07:00 - 07:20', startTime: '07:00', endTime: '07:20', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'Routine general health', type: 'Consultation', status: 'Completed' },
    { id: 'apt-c2', patientId: '#1011', patientName: 'Rohan Joshi', time: '07:20 - 07:40', startTime: '07:20', endTime: '07:40', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'Fever checkup', type: 'Follow-up', status: 'Completed' },
    { id: 'apt-c3', patientId: '#1012', patientName: 'Vikram Seth', time: '07:40 - 08:00', startTime: '07:40', endTime: '08:00', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'Stomach ache', type: 'Consultation', status: 'Completed' },
    { id: 'apt-c4', patientId: '#1013', patientName: 'Sneha Reddy', time: '08:00 - 08:20', startTime: '08:00', endTime: '08:20', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'Acidity checkup', type: 'Consultation', status: 'Completed' },
    { id: 'apt-c5', patientId: '#1014', patientName: 'Arjun Sen', time: '08:20 - 08:40', startTime: '08:20', endTime: '08:40', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'Eye infection', type: 'Consultation', status: 'Completed' },
    { id: 'apt-c6', patientId: '#1016', patientName: 'Divya Paul', time: '08:40 - 09:00', startTime: '08:40', endTime: '09:00', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'Post surgery review', type: 'Follow-up', status: 'Completed' },
    { id: 'apt-c7', patientId: '#1022', patientName: 'Sanjay Gupta', time: '01:30 - 01:50', startTime: '13:30', endTime: '13:50', duration: 20, date: '2026-06-08', doctor: 'Dr. Mehta', room: 'Room 101', reason: 'Cardio checkup', type: 'Consultation', status: 'Completed' },
    { id: 'apt-c8', patientId: '#1023', patientName: 'Asha Kiran', time: '01:50 - 02:10', startTime: '13:50', endTime: '14:10', duration: 20, date: '2026-06-08', doctor: 'Dr. Mehta', room: 'Room 101', reason: 'BP tracking', type: 'Follow-up', status: 'Completed' },
    { id: 'apt-c9', patientId: '#1024', patientName: 'Rajesh Nair', time: '02:10 - 02:30', startTime: '14:10', endTime: '14:30', duration: 20, date: '2026-06-08', doctor: 'Dr. Sharma', room: 'Room 102', reason: 'Knee joint consultation', type: 'Consultation', status: 'Completed' },
    
    // In Progress
    { id: 'apt-1', patientId: '#1042', patientName: 'Amit Mehta', time: '09:00 - 09:20', startTime: '09:00', endTime: '09:20', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'Headache, fever • OPD', type: 'Follow-up', status: 'In Progress' },
    
    // Waiting
    { id: 'apt-2', patientId: '#1039', patientName: 'Sunita Patel', time: '09:30 - 09:50', startTime: '09:30', endTime: '09:50', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'BP follow-up', type: 'Follow-up', status: 'Waiting' },
    { id: 'apt-3', patientId: '#1035', patientName: 'Rahul Kumar', time: '10:00 - 10:20', startTime: '10:00', endTime: '10:20', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'Diabetes checkup • OPD', type: 'Consultation', status: 'Waiting' },
    { id: 'apt-w3', patientId: '#1025', patientName: 'Karan Malhotra', time: '01:00 - 01:20', startTime: '13:00', endTime: '13:20', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'Cough & cold', type: 'Consultation', status: 'Waiting' },
    { id: 'apt-w4', patientId: '#1026', patientName: 'Neha Sen', time: '01:20 - 01:40', startTime: '13:20', endTime: '13:40', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'Migraine followup', type: 'Follow-up', status: 'Waiting' },
    { id: 'apt-w5', patientId: '#1027', patientName: 'Gaurav Jain', time: '02:30 - 02:50', startTime: '14:30', endTime: '14:50', duration: 20, date: '2026-06-08', doctor: 'Dr. Sharma', room: 'Room 102', reason: 'Back pain followup', type: 'Follow-up', status: 'Waiting' },

    // Scheduled
    { id: 'apt-4', patientId: '#1048', patientName: 'Priya Desai', time: '10:30 - 10:50', startTime: '10:30', endTime: '10:50', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'New patient registration', type: 'New Patient', status: 'Scheduled' },
    { id: 'apt-6', patientId: '#1019', patientName: 'Meera Ghosh', time: '11:30 - 11:50', startTime: '11:30', endTime: '11:50', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'Skin allergy consultation', type: 'Consultation', status: 'Scheduled' },
    { id: 'apt-7', patientId: '#1015', patientName: 'Kavita Sharma', time: '02:00 - 02:20', startTime: '14:00', endTime: '14:20', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'Thyroid follow-up', type: 'Follow-up', status: 'Scheduled' },

    // Urgent
    { id: 'apt-5', patientId: '#1021', patientName: 'Vijay Nair', time: '11:00 - 11:20', startTime: '11:00', endTime: '11:20', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'Chest pain • priority', type: 'Emergency', status: 'Urgent' },

    // No Shows
    { id: 'apt-n1', patientId: '#1028', patientName: 'Suresh Kumar', time: '08:50 - 09:10', startTime: '08:50', endTime: '09:10', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'Viral fever check', type: 'Consultation', status: 'No Show' },
    { id: 'apt-n2', patientId: '#1029', patientName: 'Preeti Shah', time: '09:10 - 09:30', startTime: '09:10', endTime: '09:30', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'Diabetes regular testing', type: 'Follow-up', status: 'No Show' },
    { id: 'apt-n3', patientId: '#1030', patientName: 'Ritu Verma', time: '11:40 - 12:00', startTime: '11:40', endTime: '12:00', duration: 20, date: '2026-06-08', doctor: 'Dr. Rajan Kumar', room: 'Room 203', reason: 'Allergy test', type: 'Consultation', status: 'No Show' }
  ]);

  // Active Screen Navigation state
  const showScreen = (name, saveToHistory = true) => {
    if (saveToHistory && currentScreen !== name) {
      setScreenHistory((prev) => [...prev, currentScreen]);
    }
    setCurrentScreen(name);
  };

  const goBack = () => {
    if (screenHistory.length > 0) {
      const prev = screenHistory[screenHistory.length - 1];
      setScreenHistory((prevStack) => prevStack.slice(0, -1));
      setCurrentScreen(prev);
    } else {
      setCurrentScreen('dashboard');
    }
  };

  // Selected Patient Details Object
  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  // Global actions to modify patients
  const updatePatientVitals = (patientId, newVitals) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, vitals: { ...p.vitals, ...newVitals } } : p))
    );
  };

  const addInvoice = (patientId, invoice) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId
          ? { ...p, billingHistory: [invoice, ...p.billingHistory] }
          : p
      )
    );
  };

  // Appointments Actions
  const addAppointment = (appt) => {
    setAppointments((prev) => [...prev, appt]);
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const deleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        screenHistory,
        showScreen,
        goBack,
        selectedPatientId,
        setSelectedPatientId,
        selectedPatient,
        patients,
        setPatients,
        updatePatientVitals,
        addInvoice,
        appointments,
        setAppointments,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        theme,
        setTheme,
        customColor,
        setCustomColor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
