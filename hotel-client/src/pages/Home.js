import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  return (
    <div className="home-container">
      
      {/* --- Video Background Section --- */}
      <div className="video-background-wrapper">
        <div className="video-overlay"></div>
        <video className="video-bg" autoPlay loop muted playsInline>
          {/* Video source URL */}
          <source src="https://www.pexels.com/download/video/9432022/" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* --- Hero Section --- */}
      <div className="home-hero">
        <h1 className="home-title">Welcome to Hotel Paradise</h1>
        <p className="home-subtitle">Experience luxury and comfort in every stay</p>
        <div className="home-actions">
          <Link to="/register" className="home-btn home-btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="home-btn home-btn-secondary">
            Sign In
          </Link>
        </div>
      </div>

      {/* --- Features Section --- */}
      <div className="home-features">
        <div className="feature-card">
          <div className="feature-icon">🏨</div>
          <h3>Luxury Rooms</h3>
          <p>Comfortable and elegantly designed rooms for your perfect stay</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>Easy Booking</h3>
          <p>Book your room in just a few clicks with our simple system</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⭐</div>
          <h3>Best Service</h3>
          <p>Experience world-class hospitality and exceptional service</p>
        </div>
      </div>
      
    </div>
  );
}

export default Home;