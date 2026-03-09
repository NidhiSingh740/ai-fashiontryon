// client/src/landingpage/HeroSection.js
import React from 'react';
import './styles/HeroSection.css';
import Navbar from './Navbar'; // Ensure Navbar is imported so it sits inside the hero background

const HeroSection = () => {
  return (
    <div className="hero-container">
      {/* We place the Navbar here so it shares the same gradient background */}
      <Navbar />

      {/* Main Hero Area */}
      <main className="hero-content">
        
        {/* Left Side: Text Content */}
        <div className="hero-text-col">
          <h1 className="hero-title">
            StyleMirror AI <span className="highlight-pink">Try Before You Buy —</span> Powered by AI Fashion Intelligence
          </h1>
          
          <p className="hero-subtitle">
            Upload your photo and instantly see how clothes look on you. AI analyzes your body shape, size, and skin tone to recommend the perfect outfit before you buy.
          </p>
          
          <div className="hero-actions">
            <button className="btn-primary">Start Free Trial</button>
            <button className="btn-outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Login
            </button>
          </div>
          
          <div className="hero-social-proof">
            <div className="avatar-group">
              <img src="https://i.pravatar.cc/100?img=1" alt="Customer 1" className="avatar" />
              <img src="https://i.pravatar.cc/100?img=2" alt="Customer 2" className="avatar" />
              <img src="https://i.pravatar.cc/100?img=3" alt="Customer 3" className="avatar" />
            </div>
            <span className="social-text">Join 10,000+ happy customers</span>
          </div>
        </div>

        {/* Right Side: Image Placeholder */}
        <div className="hero-image-col">
          <div className="image-wrapper">
            <img 
              src="/fashion.jpg" 
              alt="Fashion shopping" 
              className="hero-main-img" 
            />
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default HeroSection;