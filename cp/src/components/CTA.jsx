import React from 'react';

const CTA = () => {
  return (
    <section className="cta-section" id="cta">
      <div className="cta-bg-glow" aria-hidden="true"></div>
      <div className="container cta-content reveal">
        <h2>Ready to Streamline<br />Your Practice?</h2>
        <p>Join hundreds of professionals who have already switched to PCMS. Start your free trial today — no credit card required.</p>
        <div className="cta-actions">
          <a href="#" className="btn-primary btn-primary-lg">Start Free Trial <i className="fa-solid fa-arrow-right"></i></a>
          <a href="#" className="btn-outline-lg"><i className="fa-regular fa-calendar"></i> Book a Demo</a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
