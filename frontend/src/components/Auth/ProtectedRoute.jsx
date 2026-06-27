import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Login from '../Screens/Login';
import { Lock } from 'lucide-react';

/**
 * ProtectedRoute
 * – If not authenticated, renders Login
 * – If authenticated but screen is restricted, renders an Access Denied overlay
 * – Otherwise renders children
 */
const ProtectedRoute = ({ children, screen }) => {
  const { currentUser, canAccess } = useAuth();

  // Not logged in → show Login
  if (!currentUser) {
    return <Login />;
  }

  // Logged in but screen is restricted
  if (screen && !canAccess(screen)) {
    return (
      <div className="access-denied-container">
        <div className="access-denied-card">
          <div className="access-denied-icon">
            <Lock size={32} />
          </div>
          <h2 className="access-denied-title">Access Restricted</h2>
          <p className="access-denied-desc">
            This section is not available for your role ({currentUser.specialty}).
          </p>
          <p className="access-denied-hint">
            Please contact your administrator if you believe this is a mistake.
          </p>
        </div>
        <style>{`
          .access-denied-container {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8fafc;
            padding: 2rem;
          }
          .access-denied-card {
            background: white;
            border-radius: 20px;
            padding: 2.5rem 2rem;
            text-align: center;
            max-width: 380px;
            width: 100%;
            box-shadow: 0 8px 32px rgba(0,0,0,0.08);
            border: 1px solid #f1f5f9;
          }
          .access-denied-icon {
            width: 68px; height: 68px;
            background: linear-gradient(135deg, #fff1f2, #ffe4e6);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.25rem;
            color: #e11d48;
          }
          .access-denied-title {
            font-size: 1.25rem;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 0.5rem;
          }
          .access-denied-desc {
            font-size: 0.85rem;
            color: #475569;
            font-weight: 500;
            margin-bottom: 0.5rem;
          }
          .access-denied-hint {
            font-size: 0.77rem;
            color: #94a3b8;
          }
        `}</style>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
