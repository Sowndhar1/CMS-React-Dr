import React from 'react';

const Features = () => {
  return (
    <section className="section-pad" id="features">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">Platform Features</span>
          <h2>Everything You Need, Built In</h2>
          <p>A powerful foundation that every module shares — enterprise-grade tools designed for modern professional workflows.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card reveal">
            <div className="feature-icon"><i className="fa-solid fa-gauge-high"></i></div>
            <h3>Enterprise Dashboard</h3>
            <p>A unified command center with real-time analytics, KPIs, and actionable insights at a glance.</p>
          </div>

          <div className="feature-card reveal reveal-delay-1">
            <div className="feature-icon"><i className="fa-solid fa-shield-halved"></i></div>
            <h3>Role-Based Access</h3>
            <p>Granular permissions ensure each team member sees only what they need — no more, no less.</p>
          </div>

          <div className="feature-card reveal reveal-delay-2">
            <div className="feature-icon"><i className="fa-solid fa-vault"></i></div>
            <h3>Document Vault</h3>
            <p>Securely store, organize, and share documents with version control and audit trails.</p>
          </div>

          <div className="feature-card reveal reveal-delay-1">
            <div className="feature-icon"><i className="fa-solid fa-calendar-days"></i></div>
            <h3>Calendar & Scheduling</h3>
            <p>Smart scheduling with conflict detection, reminders, and sync across your entire organization.</p>
          </div>

          <div className="feature-card reveal reveal-delay-2">
            <div className="feature-icon"><i className="fa-solid fa-qrcode"></i></div>
            <h3>QR Client Access</h3>
            <p>Generate QR codes for instant client onboarding, check-ins, and document retrieval.</p>
          </div>

          <div className="feature-card reveal reveal-delay-3">
            <div className="feature-icon"><i className="fa-brands fa-whatsapp"></i></div>
            <h3>WhatsApp Integration</h3>
            <p>Send appointment reminders, updates, and documents directly through WhatsApp Business API.</p>
          </div>

          <div className="feature-card reveal reveal-delay-2">
            <div className="feature-icon"><i className="fa-solid fa-bell"></i></div>
            <h3>Smart Notifications</h3>
            <p>Contextual alerts for deadlines, follow-ups, payments, and critical updates across all modules.</p>
          </div>

          <div className="feature-card reveal reveal-delay-3">
            <div className="feature-icon"><i className="fa-solid fa-mobile-screen-button"></i></div>
            <h3>Responsive Design</h3>
            <p>Fully responsive web application that works flawlessly on desktop, tablet, and mobile devices.</p>
          </div>

          <div className="feature-card reveal reveal-delay-4">
            <div className="feature-icon"><i className="fa-solid fa-share-nodes"></i></div>
            <h3>Secure Sharing</h3>
            <p>Share documents and reports with clients through encrypted, expiring links with access logs.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
