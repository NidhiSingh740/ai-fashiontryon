import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Navbar from './Navbar';
import './styles/HeroSection.css';

const HeroSection = () => {
  return (
    <div id = "hero" className="hero-master-wrapper">
      <Navbar />
      
      {/* Dynamic Background Particles */}
      <div className="hero-bg-glow"></div>
      
      <main className="hero-main">
        <div className="hero-left-content">
          <div className="hero-status-tag">
            <div className="pulse-dot"></div>
            <span>V3.0 NEURAL ENGINE ACTIVE</span>
          </div>
          
          <h1 className="hero-main-title">
            The Mirror <br /> 
            <span className="hero-gradient-text">That Knows Your Style.</span>
          </h1>
          
          <p className="hero-description">
            Experience the world’s first <strong>Neural-Fit™</strong> virtual fitting room. 
            Upload a photo, and let AI map your physique with 99.8% precision for a perfect 
            style match—instantly.
          </p>

          <div className="hero-cta-group">
            <button className="hero-primary-btn">
              Start Virtual Fitting <ArrowRight size={20} />
            </button>
            <button className="hero-secondary-btn">
              <Zap size={18} fill="currentColor" />
              Explore Lookbook
            </button>
          </div>

          <div className="hero-trust-row">
            <div className="trust-item">
              <ShieldCheck size={18} />
              <span>Secure Data Encryption</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <Sparkles size={18} />
              <span>AI-Driven Accuracy</span>
            </div>
          </div>
        </div>

        <div className="hero-right-visual">
          <div className="hero-image-container">
            {/* The AI Scanner Effect Overlay */}
            <div className="scanner-line"></div>
            <div className="ui-element-floating ui-1">📏 Perfect Fit: M</div>
            <div className="ui-element-floating ui-2">🎨 Skin Tone: Warm</div>
            
            <img 
              src="fashion.jpg" 
              alt="AI Fashion Analysis" 
              className="hero-display-img"
            />
            
            {/* Decorative Glass Card behind the image */}
            <div className="hero-glass-backing"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;