import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Check, 
  Stethoscope, ClipboardList, Plus, HeartPulse, ShieldCheck, 
  BarChart3, Users, Waypoints
} from 'lucide-react';

const DEMO_CREDS = {
  doctor: { username: 'doctor', password: 'doctor123' },
  receptionist: { username: 'sowndhar', password: 'recept123' },
};

const Login = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mouse-tracker spotlight
  const rhsPanelRef = useRef(null);
  const spotRef = useRef(null);

  useEffect(() => {
    const panel = rhsPanelRef.current;
    const spot = spotRef.current;
    if (!panel || !spot) return;

    const onMove = (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Use CSS custom properties for zero-lag positioning
      spot.style.left = `${x}px`;
      spot.style.top = `${y}px`;
      spot.style.opacity = '1';
    };

    const onLeave = () => {
      spot.style.opacity = '0';
    };

    panel.addEventListener('mousemove', onMove);
    panel.addEventListener('mouseleave', onLeave);
    return () => {
      panel.removeEventListener('mousemove', onMove);
      panel.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const fillDemo = (role) => {
    const creds = DEMO_CREDS[role];
    setUsername(creds.username);
    setPassword(creds.password);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    setIsLoading(true);

    // Simulate a short network delay for UX polish
    await new Promise((r) => setTimeout(r, 1200));

    try {
      login(username, password);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="login-root">
      
      {/* ── Left Side: Hero Image & Branding ── */}
      <div className="login-left">
        {/* Background Image */}
        <img
          className="hero-image"
          src="/images/clinic_login_bg.png"
          alt="Clinic Background"
        />
        {/* Semi-transparent white overlay to ensure text readability */}
        <div className="hero-overlay"></div>

        <div className="left-content">
          {/* Logo */}
          <div className="brand-logo">
            <div className="logo-icon-wrap">
              <Plus size={20} strokeWidth={3} color="#fff" />
            </div>
            <div className="logo-text">
              <span className="logo-text-bold">CMS</span>
              <span className="logo-text-light">PORTAL</span>
            </div>
          </div>

          <div className="hero-text-area">
            {/* NavaNala Badge */}
            <div className="brand-badge">
              <HeartPulse size={14} strokeWidth={2.5} />
              <span>NavaNala Health</span>
            </div>

            <h1 className="hero-title">
              Modern Care,<br />
              <span className="text-teal">Elevated.</span>
            </h1>
            <p className="hero-subtitle">
              Experience the next generation of clinical management<br />
              systems designed for healthcare professionals.
            </p>

            {/* Feature Grid */}
            <div className="feature-card">
              <div className="feature-item">
                <div className="feature-icon bg-cyan-light">
                  <Waypoints size={16} color="#0096B4" />
                </div>
                <div className="feature-text">
                  <h4>Smart Workflows</h4>
                  <p>Streamline daily operations</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon bg-green-light">
                  <ShieldCheck size={16} color="#10B981" />
                </div>
                <div className="feature-text">
                  <h4>Secure & Compliant</h4>
                  <p>Enterprise-grade security</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon bg-purple-light">
                  <BarChart3 size={16} color="#8B5CF6" />
                </div>
                <div className="feature-text">
                  <h4>Better Outcomes</h4>
                  <p>Data-driven patient care</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon bg-orange-light">
                  <Users size={16} color="#F59E0B" />
                </div>
                <div className="feature-text">
                  <h4>Connected Care</h4>
                  <p>Seamless collaboration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Left Footer */}
          <div className="left-footer">
            <div className="footer-check">
              <Check size={12} strokeWidth={3} color="#fff" />
            </div>
            <span>© 2026 CMS Portal · NavaNala Health Systems</span>
          </div>
        </div>
      </div>

      {/* ── Right Side: Login Form ── */}
      <div className="login-right" ref={rhsPanelRef}>

        {/* ── Animated Background Layer ── */}
        <div className="rhs-bg" aria-hidden="true">
          {/* Mouse spotlight */}
          <div className="rhs-spotlight" ref={spotRef}></div>
          {/* Gradient blobs */}
          <div className="rhs-blob rhs-blob-1"></div>
          <div className="rhs-blob rhs-blob-2"></div>
          <div className="rhs-blob rhs-blob-3"></div>

          {/* Subtle dot-grid SVG */}
          <svg className="rhs-grid" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="dot-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#0096B4" fillOpacity="0.09" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid)" />
          </svg>

          {/* Floating medical cross icons */}
          <svg className="rhs-float rhs-float-1" viewBox="0 0 24 24" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" fill="#0096B4" fillOpacity="0.12" />
          </svg>
          <svg className="rhs-float rhs-float-2" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" fill="#10B981" fillOpacity="0.15" />
          </svg>
          <svg className="rhs-float rhs-float-3" viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" fill="#0096B4" fillOpacity="0.1" />
          </svg>

          {/* Floating rings */}
          <div className="rhs-ring rhs-ring-1"></div>
          <div className="rhs-ring rhs-ring-2"></div>

          {/* Heartbeat line SVG */}
          <svg className="rhs-ecg" viewBox="0 0 300 50" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 25 L50 25 L65 10 L75 40 L85 5 L95 40 L105 25 L300 25"
              stroke="#0096B4" strokeWidth="1.5" strokeOpacity="0.12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="login-wrapper">
          <div className="login-card">
            
            {/* Header */}
            <header className="login-header">
              <div className="login-icon">
                <Lock size={20} strokeWidth={2.5} color="#0096B4" />
              </div>
              <h2>Welcome Back</h2>
              <p>Sign in to access your workspace</p>
            </header>

            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              {/* Global Error */}
              {error && (
                <div className="global-error" role="alert">
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}

              {/* Username */}
              <div className="form-group">
                <label className="form-label" htmlFor="username">USERNAME</label>
                <div className="input-wrap">
                  <User size={16} className="field-icon" />
                  <input
                    className={`form-input ${error && !username ? 'error' : ''}`}
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError('');
                    }}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label className="form-label" htmlFor="password">PASSWORD</label>
                <div className="input-wrap">
                  <Lock size={16} className="field-icon" />
                  <input
                    className={`form-input ${error && !password ? 'error' : ''}`}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember / Forgot */}
              <div className="form-row">
                <label className="checkbox-wrap">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <div className="custom-checkbox">
                    <Check size={12} strokeWidth={3} className="check-icon" />
                  </div>
                  <span className="checkbox-label">Remember me</span>
                </label>
                <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button type="submit" className={`btn-submit ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                <span className="btn-text">
                  Sign In
                  <ArrowRight size={16} />
                </span>
                <div className="spinner"></div>
              </button>
            </form>

            {/* Divider */}
            <div className="divider"><span>DEMO AUTO-FILL</span></div>

            {/* Role Auto-fill Buttons */}
            <div className="demo-row">
              <button
                type="button"
                className="btn-demo"
                onClick={() => fillDemo('doctor')}
              >
                <Stethoscope size={16} className="demo-icon" />
                <span>Doctor</span>
              </button>
              <button
                type="button"
                className="btn-demo"
                onClick={() => fillDemo('receptionist')}
              >
                <ClipboardList size={16} className="demo-icon" />
                <span>Receptionist</span>
              </button>
            </div>

            <footer className="login-footer">
              © 2026 CMS Portal · NavaNala Health Systems
            </footer>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        /* ── Root & Resets ── */
        .login-root {
          --teal-primary: #0096B4;
          --teal-hover: #007C96;
          --teal-light: #E0F2F5;
          --navy-dark: #1E293B;
          --slate-text: #64748B;
          --slate-light: #94A3B8;
          --bg-right: #F8FAFC;
          --error: #EF4444;
          --radius: 12px;
          --font-ui: 'Plus Jakarta Sans', sans-serif;
          
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          display: flex;
          font-family: var(--font-ui);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          background: var(--bg-right);
        }

        .login-root *, .login-root *::before, .login-root *::after {
          box-sizing: border-box;
        }

        /* ── Left Container ── */
        .login-left {
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
          z-index: 10;
        }

        .hero-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.2) 100%);
          z-index: 2;
        }

        .left-content {
          position: relative;
          z-index: 15;
          padding: 40px 60px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon-wrap {
          width: 40px;
          height: 40px;
          background: var(--teal-primary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .logo-text-bold {
          font-size: 16px;
          font-weight: 800;
          color: var(--navy-dark);
          letter-spacing: 0.5px;
        }

        .logo-text-light {
          font-size: 13px;
          font-weight: 600;
          color: var(--teal-primary);
          letter-spacing: 1px;
          margin-top: 2px;
        }

        .hero-text-area {
          max-width: 550px;
          margin-top: -60px;
        }

        .brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(0, 150, 180, 0.2);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          color: var(--teal-primary);
          backdrop-filter: blur(8px);
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: 64px;
          line-height: 1.1;
          font-weight: 800;
          color: var(--navy-dark);
          margin: 0 0 16px 0;
          letter-spacing: -1.5px;
        }

        .text-teal {
          color: var(--teal-primary);
        }

        .hero-subtitle {
          font-size: 16px;
          line-height: 1.5;
          color: var(--slate-text);
          margin: 0 0 40px 0;
          font-weight: 500;
        }

        /* Feature Card */
        .feature-card {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255,255,255, 0.5);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bg-cyan-light { background: #E0F2FE; }
        .bg-green-light { background: #D1FAE5; }
        .bg-purple-light { background: #EDE9FE; }
        .bg-orange-light { background: #FEF3C7; }

        .feature-text h4 {
          margin: 0 0 2px 0;
          font-size: 13px;
          font-weight: 700;
          color: var(--navy-dark);
        }

        .feature-text p {
          margin: 0;
          font-size: 11px;
          font-weight: 500;
          color: var(--slate-text);
        }

        .left-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 600;
          color: var(--slate-text);
        }

        .footer-check {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--teal-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Right Container (Form) ── */
        .login-right {
          width: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-right);
          z-index: 20;
          position: relative;
          overflow: hidden;
          padding: 40px;
        }

        /* ── Animated Background (Right Panel) ── */

        /* Full-coverage background container */
        .rhs-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        /* Dot grid fills entire panel */
        .rhs-grid {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        /* ── Mouse Spotlight ── */
        .rhs-spotlight {
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          /* Centred on cursor via left/top set by JS */
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle,
            rgba(0, 150, 180, 0.13) 0%,
            rgba(0, 150, 180, 0.05) 40%,
            transparent 70%
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
          will-change: left, top, opacity;
          z-index: 2;
        }

        /* Soft gradient blobs */
        .rhs-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          will-change: transform, opacity;
        }

        .rhs-blob-1 {
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(0,150,180,0.12) 0%, transparent 70%);
          top: -80px; right: -80px;
          animation: blobDrift1 14s ease-in-out infinite alternate;
        }

        .rhs-blob-2 {
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%);
          bottom: -60px; left: -60px;
          animation: blobDrift2 18s ease-in-out infinite alternate;
        }

        .rhs-blob-3 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%);
          top: 45%; right: 10%;
          animation: blobDrift3 22s ease-in-out infinite alternate;
        }

        @keyframes blobDrift1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(-30px, 30px) scale(1.06); }
          100% { transform: translate(20px, -20px) scale(0.95); }
        }
        @keyframes blobDrift2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(30px, -25px) scale(1.08); }
          100% { transform: translate(-15px, 20px) scale(0.96); }
        }
        @keyframes blobDrift3 {
          0%   { transform: translate(0px, 0px) scale(1); opacity: 1; }
          60%  { transform: translate(20px, 30px) scale(1.1); opacity: 0.7; }
          100% { transform: translate(-25px, -20px) scale(0.9); opacity: 1; }
        }

        /* Floating medical cross icons */
        .rhs-float {
          position: absolute;
          will-change: transform;
        }
        .rhs-float-1 {
          top: 12%; left: 8%;
          animation: floatCross 9s ease-in-out infinite;
        }
        .rhs-float-2 {
          bottom: 18%; right: 10%;
          animation: floatCross 12s ease-in-out infinite reverse;
        }
        .rhs-float-3 {
          top: 60%; left: 12%;
          animation: floatCross 7s ease-in-out 2s infinite;
        }

        @keyframes floatCross {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-14px) rotate(12deg); }
        }

        /* Floating rings / circles */
        .rhs-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid rgba(0, 150, 180, 0.1);
          will-change: transform, opacity;
        }

        .rhs-ring-1 {
          width: 160px; height: 160px;
          top: 8%; right: 6%;
          animation: ringPulse 8s ease-in-out infinite;
        }

        .rhs-ring-2 {
          width: 90px; height: 90px;
          bottom: 12%; left: 6%;
          border-color: rgba(16, 185, 129, 0.12);
          animation: ringPulse 11s ease-in-out 3s infinite reverse;
        }

        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.15); opacity: 0.5; }
        }

        /* ECG Heartbeat line */
        .rhs-ecg {
          position: absolute;
          bottom: 60px;
          left: 0;
          width: 100%;
          height: 50px;
          animation: ecgSlide 6s linear infinite;
        }

        @keyframes ecgSlide {
          0%   { transform: translateX(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        /* Ensure the login wrapper floats above background layer */
        .login-wrapper {
          width: 100%;
          max-width: 440px;
          position: relative;
          z-index: 10;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 24px;
          padding: 48px;
          width: 100%;
          box-shadow: 0 8px 32px -8px rgba(0, 150, 180, 0.08), 0 2px 12px rgba(0,0,0,0.04);
          border: 1px solid rgba(255, 255, 255, 0.55);
        }

        @media (max-width: 1024px) {
          .login-root {
            flex-direction: column;
            position: relative;
            height: auto;
            min-height: 100vh;
            overflow-y: auto;
          }
          .login-left {
            display: none;
          }
          .login-right {
            width: 100%;
            height: auto;
            min-height: 100vh;
            padding: 24px;
            padding-bottom: 40px; /* Extra padding for mobile keyboards */
          }
          .login-card {
            padding: 32px 24px;
            margin: auto 0; /* Vertically centers the card within the scroll area */
          }
        }

        /* ── Header ── */
        .login-header {
          text-align: center;
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-icon {
          width: 48px;
          height: 48px;
          background: var(--teal-light);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .login-header h2 {
          font-size: 24px;
          font-weight: 800;
          color: var(--navy-dark);
          margin: 0 0 6px 0;
          letter-spacing: -0.5px;
        }

        .login-header p {
          font-size: 14px;
          color: var(--slate-text);
          margin: 0;
          font-weight: 500;
        }

        /* ── Form ── */
        .global-error {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: var(--error);
          background: #FEF2F2;
          border: 1px solid #FCA5A5;
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: var(--slate-light);
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }

        .input-wrap {
          position: relative;
        }

        .input-wrap .field-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--slate-light);
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px 14px 44px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius);
          color: var(--navy-dark);
          font-family: var(--font-ui);
          font-size: 14px;
          font-weight: 500;
          outline: none;
          transition: all 0.2s ease;
        }

        .form-input::placeholder {
          color: #94A3B8;
        }

        .form-input:focus {
          border-color: var(--teal-primary);
          box-shadow: 0 0 0 3px rgba(0, 150, 180, 0.1);
        }

        .form-input.error {
          border-color: var(--error);
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .toggle-password {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--slate-light);
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toggle-password:hover {
          color: var(--slate-text);
        }

        /* ── Remember / Forgot ── */
        .form-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .checkbox-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          user-select: none;
        }

        .checkbox-wrap input[type="checkbox"] {
          display: none;
        }

        .custom-checkbox {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 1px solid #CBD5E1;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .custom-checkbox .check-icon {
          color: #FFFFFF;
          opacity: 0;
          transform: scale(0.5);
          transition: all 0.2s ease;
        }

        .checkbox-wrap input:checked + .custom-checkbox {
          background: var(--teal-primary);
          border-color: var(--teal-primary);
        }

        .checkbox-wrap input:checked + .custom-checkbox .check-icon {
          opacity: 1;
          transform: scale(1);
        }

        .checkbox-label {
          font-size: 13px;
          color: var(--slate-text);
          font-weight: 500;
        }

        .forgot-link {
          font-size: 13px;
          color: var(--teal-primary);
          text-decoration: none;
          font-weight: 600;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        /* ── Submit Button ── */
        .btn-submit {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: var(--radius);
          background: var(--teal-primary);
          color: #FFFFFF;
          font-family: var(--font-ui);
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .btn-submit:hover:not(:disabled) {
          background: var(--teal-hover);
        }

        .btn-submit .btn-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-submit .spinner {
          display: none;
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .btn-submit.loading .btn-text { visibility: hidden; }
        .btn-submit.loading .spinner {
          display: block;
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        }

        @keyframes spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* ── Divider ── */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 28px 0;
        }

        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #E2E8F0;
        }

        .divider span {
          font-size: 11px;
          color: var(--slate-light);
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        /* ── Social / Role Buttons ── */
        .demo-row {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
        }

        .btn-demo {
          flex: 1;
          padding: 12px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          font-family: var(--font-ui);
          font-size: 13px;
          font-weight: 700;
          color: var(--navy-dark);
          transition: all 0.2s;
        }

        .btn-demo:hover {
          background: #F8FAFC;
          border-color: #CBD5E1;
        }

        .demo-icon {
          color: var(--teal-primary);
        }

        .login-footer {
          text-align: center;
          font-size: 12px;
          color: var(--slate-light);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default Login;
