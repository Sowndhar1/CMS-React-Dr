  import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="nav-logo">
              <div className="nav-logo-icon">P</div>
              <span className="nav-logo-text">PCMS</span>
            </a>
            <p>Professional Client Management System — one platform for healthcare, legal, and finance professionals to manage their practice efficiently.</p>
          </div>

          <div className="footer-col">
            <h4>Modules</h4>
            <ul>
              <li><a href="#doctor">Doctor Module</a></li>
              <li><a href="#advocate">Advocate Module</a></li>
              <li><a href="#ca">CA Module</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Integrations</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} PCMS. All rights reserved.</span>
          <div className="footer-socials">
            <a href="#" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
