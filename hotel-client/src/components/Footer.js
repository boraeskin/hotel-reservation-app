import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Footer() {

  // Scrolls to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Brand & Socials */}
        <div className="footer-section brand">
          <h2 className="footer-logo">
            <span className="logo-icon">🏨</span> Hotel Paradise
          </h2>
          <p>Experience luxury and comfort in every stay.</p>
          <div className="socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">📸</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">🐦</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">📘</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon">💼</a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
            <li><Link to="/login" onClick={scrollToTop}>Login</Link></li>
            <li><Link to="/register" onClick={scrollToTop}>Sign Up</Link></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>📍 123 Paradise Ave, Holiday City</p>
          <p>📞 +1 (555) 123-4567</p>
          <p>✉️ info@hotelparadise.com</p>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; 2025 Hotel Paradise. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;