import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  <footer id="contact" className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-col">
          <div className="footer-logo">
            <span className="logo-main">AXM ENTERPRISES</span>
            <span className="logo-dot" />
          </div>
          <p className="footer-description">
            Redefining the art of living with exquisite products that seamlessly blend form and function.
          </p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
            <a href="#" className="social-link" aria-label="Twitter"><i className="fab fa-twitter" /></a>
            <a href="#" className="social-link" aria-label="Instagram"><i className="fab fa-instagram" /></a>
            <a href="#" className="social-link" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
          </div>
        </div>
        <div className="footer-col">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#explore">Explore</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4 className="footer-title">Explore More</h4>
          <ul className="footer-links">
            <li><a href="#">Press</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Connect with Us</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4 className="footer-title">Contact</h4>
          <ul className="footer-contact">
            <li><i className="fas fa-envelope" /><span>hello@axmenterprises.com</span></li>
            <li><i className="fas fa-phone" /><span>+1 (555) 123-4567</span></li>
            <li><i className="fas fa-map-marker-alt" /><span>123 Design Street, Creative City, CC 12345</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 AXM Enterprises, Inc. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
