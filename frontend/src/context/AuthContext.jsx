import React, { createContext, useState, useContext, useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// ──────────────────────────────────────────────
// Mock user database
// ──────────────────────────────────────────────
const MOCK_USERS = [
  {
    username: 'doctor',
    password: 'doctor123',
    name: 'Dr. Rajan Kumar',
    role: 'doctor',
    specialty: 'General Physician',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=RajanKumar&backgroundColor=dbeafe',
  },
  {
    username: 'sowndhar',
    password: 'recept123',
    name: 'Sowndhar',
    role: 'receptionist',
    specialty: 'Receptionist',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sowndhar&backgroundColor=f1f5f9',
  },
];

// ──────────────────────────────────────────────
// Role → allowed screen IDs
// ──────────────────────────────────────────────
export const ROLE_PERMISSIONS = {
  doctor: [
    'dashboard',
    'patients',
    'patientdetail',
    'appointments',
    'medical-records',
    'labs',
    'reports',
    'doctors',
    'documents',
    'follow-ups',
    'settings',
  ],
  receptionist: [
    'dashboard',
    'patients',
    'patientdetail',
    'appointments',
    'billing',
    'documents',
    'follow-ups',
    'portal',
    'settings',
  ],
};

export const canAccess = (role, screen) => {
  const perms = ROLE_PERMISSIONS[role] || [];
  return perms.includes(screen);
};

// ──────────────────────────────────────────────
// Provider
// ──────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('cms-auth-user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((username, password) => {
    const user = MOCK_USERS.find(
      (u) => u.username === username.trim().toLowerCase() && u.password === password
    );
    if (!user) {
      throw new Error('Invalid username or password. Please try again.');
    }
    const { password: _pwd, ...safeUser } = user;
    sessionStorage.setItem('cms-auth-user', JSON.stringify(safeUser));
    setCurrentUser(safeUser);
    return safeUser;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('cms-auth-user');
    setCurrentUser(null);
  }, []);

  const isDoctor = currentUser?.role === 'doctor';
  const isReceptionist = currentUser?.role === 'receptionist';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isDoctor,
        isReceptionist,
        canAccess: (screen) => canAccess(currentUser?.role, screen),
        ROLE_PERMISSIONS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
