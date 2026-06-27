import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileNav = () => setMobileMenuOpen(false);
  const openMobileNav = () => setMobileMenuOpen(true);

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="container nav-inner">
          <a href="#" className="nav-logo">
            <div className="nav-logo-icon">P</div>
            <span className="nav-logo-text">PCMS</span>
          </a>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#doctor">Doctor</a></li>
            <li><a href="#advocate">Advocate</a></li>
            <li><a href="#ca">CA</a></li>
          </ul>
          <div className="nav-actions">
            <a href="#" className="btn-ghost">Log In</a>
            <a href="#cta" className="btn-primary">Get Started <i className="fa-solid fa-arrow-right"></i></a>
          </div>
          <button className="mobile-toggle" onClick={openMobileNav} aria-label="Open menu">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`} id="mobileNav">
        <div className="mobile-nav-backdrop" onClick={closeMobileNav}></div>
        <div className="mobile-nav-panel">
          <button className="mobile-nav-close" onClick={closeMobileNav} aria-label="Close menu">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <ul className="mobile-nav-links">
            <li><a href="#features" onClick={closeMobileNav}>Features</a></li>
            <li><a href="#doctor" onClick={closeMobileNav}>Doctor Module</a></li>
            <li><a href="#advocate" onClick={closeMobileNav}>Advocate Module</a></li>
            <li><a href="#ca" onClick={closeMobileNav}>CA Module</a></li>
          </ul>
          <div className="mobile-nav-actions">
            <a href="#" className="btn-ghost">Log In</a>
            <a href="#cta" className="btn-primary" onClick={closeMobileNav}>Get Started</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
