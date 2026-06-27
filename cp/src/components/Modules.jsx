import React from 'react';

const Modules = () => {
  return (
    <>
      {/* Doctor Module Deep Dive */}
      <section className="module-section" id="doctor">
        <div className="container">
          <div className="module-layout">
            <div className="module-visual module-visual--doctor reveal">
              <div className="module-visual-inner">
                <div className="mock-bar">
                  <div className="mock-dot"></div>
                  <div className="mock-dot"></div>
                  <div className="mock-dot"></div>
                </div>
                <div className="mock-body">
                  <div className="mock-sidebar">
                    <div className="mock-sidebar-item active"></div>
                    <div className="mock-sidebar-item"></div>
                    <div className="mock-sidebar-item"></div>
                    <div className="mock-sidebar-item"></div>
                  </div>
                  <div className="mock-rows">
                    <div className="mock-row">
                      <div className="mock-avatar"></div>
                      <div className="mock-lines"><div className="mock-line medium"></div><div className="mock-line short"></div></div>
                      <div className="mock-badge"></div>
                    </div>
                    <div className="mock-row">
                      <div className="mock-avatar"></div>
                      <div className="mock-lines"><div className="mock-line long"></div><div className="mock-line medium"></div></div>
                      <div className="mock-badge"></div>
                    </div>
                    <div className="mock-row">
                      <div className="mock-avatar"></div>
                      <div className="mock-lines"><div className="mock-line medium"></div><div className="mock-line short"></div></div>
                      <div className="mock-badge"></div>
                    </div>
                    <div className="mock-row">
                      <div className="mock-avatar"></div>
                      <div className="mock-lines"><div className="mock-line long"></div><div className="mock-line short"></div></div>
                      <div className="mock-badge"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="glow-spot"></div>
            </div>

            <div className="module-info reveal reveal-delay-2">
              <div className="module-tag-row">
                <div className="module-icon-sm mod-doctor-color"><i className="fa-solid fa-stethoscope"></i></div>
                <span className="module-label" style={{ color: 'var(--doctor)' }}>Doctor Module</span>
              </div>
              <h2>Built for Clinics & Hospitals</h2>
              <p>Streamline patient workflows from registration to follow-up. Manage appointments, medical records, billing, and patient communication in one place.</p>
              <ul className="feature-list">
                <li><i className="fa-solid fa-check mod-doctor-color"></i>Patient Management</li>
                <li><i className="fa-solid fa-check mod-doctor-color"></i>Appointment Scheduling</li>
                <li><i className="fa-solid fa-check mod-doctor-color"></i>Follow-up Tracking</li>
                <li><i className="fa-solid fa-check mod-doctor-color"></i>Medical Documents</li>
                <li><i className="fa-solid fa-check mod-doctor-color"></i>Reports & Analytics</li>
                <li><i className="fa-solid fa-check mod-doctor-color"></i>Billing & Invoicing</li>
                <li><i className="fa-solid fa-check mod-doctor-color"></i>Patient Portal</li>
                <li><i className="fa-solid fa-check mod-doctor-color"></i>QR & WhatsApp</li>
              </ul>
              <a href="#cta" className="btn-primary">Explore Doctor Module <i className="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </section>

      {/* Advocate Module Deep Dive */}
      <section className="module-section" id="advocate">
        <div className="container">
          <div className="module-layout reversed">
            <div className="module-visual module-visual--advocate reveal">
              <div className="module-visual-inner">
                <div className="mock-bar">
                  <div className="mock-dot"></div>
                  <div className="mock-dot"></div>
                  <div className="mock-dot"></div>
                </div>
                <div className="mock-body">
                  <div className="mock-sidebar">
                    <div className="mock-sidebar-item"></div>
                    <div className="mock-sidebar-item active"></div>
                    <div className="mock-sidebar-item"></div>
                    <div className="mock-sidebar-item"></div>
                  </div>
                  <div className="mock-rows">
                    <div className="mock-row">
                      <div className="mock-avatar"></div>
                      <div className="mock-lines"><div className="mock-line long"></div><div className="mock-line short"></div></div>
                      <div className="mock-badge"></div>
                    </div>
                    <div className="mock-row">
                      <div className="mock-avatar"></div>
                      <div className="mock-lines"><div className="mock-line medium"></div><div className="mock-line medium"></div></div>
                      <div className="mock-badge"></div>
                    </div>
                    <div className="mock-row">
                      <div className="mock-avatar"></div>
                      <div className="mock-lines"><div className="mock-line long"></div><div className="mock-line short"></div></div>
                      <div className="mock-badge"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="glow-spot"></div>
            </div>

            <div className="module-info reveal reveal-delay-2">
              <div className="module-tag-row">
                <div className="module-icon-sm mod-advocate-color"><i className="fa-solid fa-scale-balanced"></i></div>
                <span className="module-label" style={{ color: 'var(--advocate)' }}>Advocate Module</span>
              </div>
              <h2>Designed for Law Firms</h2>
              <p>Track cases from filing to resolution. Manage hearing dates, legal documents, evidence, and client communication with full timeline visibility.</p>
              <ul className="feature-list">
                <li><i className="fa-solid fa-check mod-advocate-color"></i>Client Management</li>
                <li><i className="fa-solid fa-check mod-advocate-color"></i>Case Tracking</li>
                <li><i className="fa-solid fa-check mod-advocate-color"></i>Hearing Schedule</li>
                <li><i className="fa-solid fa-check mod-advocate-color"></i>Legal Documents</li>
                <li><i className="fa-solid fa-check mod-advocate-color"></i>Evidence Management</li>
                <li><i className="fa-solid fa-check mod-advocate-color"></i>Court Calendar</li>
                <li><i className="fa-solid fa-check mod-advocate-color"></i>Case Timeline</li>
                <li><i className="fa-solid fa-check mod-advocate-color"></i>Client Portal</li>
              </ul>
              <a href="#cta" className="btn-primary" style={{ background: 'linear-gradient(135deg, var(--advocate), #E09930)', boxShadow: '0 4px 16px -4px rgba(255,181,71,0.3)' }}>Explore Advocate Module <i className="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </section>

      {/* CA Module Deep Dive */}
      <section className="module-section" id="ca">
        <div className="container">
          <div className="module-layout">
            <div className="module-visual module-visual--ca reveal">
              <div className="module-visual-inner">
                <div className="mock-bar">
                  <div className="mock-dot"></div>
                  <div className="mock-dot"></div>
                  <div className="mock-dot"></div>
                </div>
                <div className="mock-body">
                  <div className="mock-sidebar">
                    <div className="mock-sidebar-item"></div>
                    <div className="mock-sidebar-item"></div>
                    <div className="mock-sidebar-item active"></div>
                    <div className="mock-sidebar-item"></div>
                  </div>
                  <div className="mock-rows">
                    <div className="mock-row">
                      <div className="mock-avatar"></div>
                      <div className="mock-lines"><div className="mock-line medium"></div><div className="mock-line long"></div></div>
                      <div className="mock-badge"></div>
                    </div>
                    <div className="mock-row">
                      <div className="mock-avatar"></div>
                      <div className="mock-lines"><div className="mock-line long"></div><div className="mock-line short"></div></div>
                      <div className="mock-badge"></div>
                    </div>
                    <div className="mock-row">
                      <div className="mock-avatar"></div>
                      <div className="mock-lines"><div className="mock-line medium"></div><div className="mock-line medium"></div></div>
                      <div className="mock-badge"></div>
                    </div>
                    <div className="mock-row">
                      <div className="mock-avatar"></div>
                      <div className="mock-lines"><div className="mock-line long"></div><div className="mock-line short"></div></div>
                      <div className="mock-badge"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="glow-spot"></div>
            </div>

            <div className="module-info reveal reveal-delay-2">
              <div className="module-tag-row">
                <div className="module-icon-sm mod-ca-color"><i className="fa-solid fa-chart-line"></i></div>
                <span className="module-label" style={{ color: 'var(--ca)' }}>CA Module</span>
              </div>
              <h2>Tailored for CA Firms</h2>
              <p>Handle tax filing, GST compliance, audits, and financial document management with precision. Keep every client's financial health on track.</p>
              <ul className="feature-list">
                <li><i className="fa-solid fa-check mod-ca-color"></i>Client Management</li>
                <li><i className="fa-solid fa-check mod-ca-color"></i>Tax Filing</li>
                <li><i className="fa-solid fa-check mod-ca-color"></i>GST Management</li>
                <li><i className="fa-solid fa-check mod-ca-color"></i>Financial Documents</li>
                <li><i className="fa-solid fa-check mod-ca-color"></i>Audit Tracking</li>
                <li><i className="fa-solid fa-check mod-ca-color"></i>Compliance Calendar</li>
                <li><i className="fa-solid fa-check mod-ca-color"></i>Invoice Management</li>
                <li><i className="fa-solid fa-check mod-ca-color"></i>Client Portal</li>
              </ul>
              <a href="#cta" className="btn-primary">Explore CA Module <i className="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Modules;
