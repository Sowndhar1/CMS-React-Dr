import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="grid-overlay"></div>
        <div className="orb orb--1"></div>
        <div className="orb orb--2"></div>
        <div className="orb orb--3"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-badge">
          <span className="pulse-dot"></span>
          Professional Client Management System
        </div>
        <h1>One Platform.<br /><span className="accent-word">Multiple Professions.</span><br />Infinite Possibilities.</h1>
        <p className="hero-sub">A centralized SaaS platform that adapts to your profession. Manage clients, appointments, documents, and operations through specialized modules built for healthcare, legal, and finance professionals.</p>

        <div className="hero-ctas">
          <a href="#cta" className="btn-primary btn-primary-lg">Start Free Trial <i className="fa-solid fa-arrow-right"></i></a>
          <a href="#features" className="btn-outline-lg"><i className="fa-regular fa-circle-play"></i> See How It Works</a>
        </div>

        <div className="module-cards">
          {/* Doctor Card */}
          <div className="module-card module-card--doctor">
            <div className="module-icon"><i className="fa-solid fa-stethoscope"></i></div>
            <h3>Doctor Module</h3>
            <p>Patient care, appointments, reports, and follow-ups — built for clinics and hospitals.</p>
            <div className="module-features">
              <span className="module-tag">Patient Mgmt</span>
              <span className="module-tag">Scheduling</span>
              <span className="module-tag">Billing</span>
              <span className="module-tag">QR Access</span>
              <span className="module-tag">WhatsApp</span>
            </div>
          </div>

          {/* Advocate Card */}
          <div className="module-card module-card--advocate">
            <div className="module-icon"><i className="fa-solid fa-scale-balanced"></i></div>
            <h3>Advocate Module</h3>
            <p>Case tracking, hearing schedules, legal documents, and client communication for law firms.</p>
            <div className="module-features">
              <span className="module-tag">Case Tracking</span>
              <span className="module-tag">Hearings</span>
              <span className="module-tag">Documents</span>
              <span className="module-tag">Evidence</span>
              <span className="module-tag">Timeline</span>
            </div>
          </div>

          {/* CA Card */}
          <div className="module-card module-card--ca">
            <div className="module-icon"><i className="fa-solid fa-chart-line"></i></div>
            <h3>CA Module</h3>
            <p>GST management, tax filing, audits, compliance, and financial records for CA firms.</p>
            <div className="module-features">
              <span className="module-tag">Tax Filing</span>
              <span className="module-tag">GST</span>
              <span className="module-tag">Audits</span>
              <span className="module-tag">Compliance</span>
              <span className="module-tag">Invoicing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
