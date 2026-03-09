import React from 'react';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import './styles/CTASection.css';

const CTASection = () => {
  return (
    <section className="cta-fluid-container">
      {/* Massive Background Decorative Text */}
      <div className="cta-bg-text">STYLE</div>

      <div className="cta-inner-content">
        <div className="cta-left">
          <div className="cta-eyebrow">
            <Sparkles size={16} className="sparkle-icon" />
            <span>AI-POWERED PRECISION</span>
          </div>
          <h2 className="cta-main-heading">
            Your Perfect Fit is <br />
            <span className="gradient-text">Just One Click</span> Away.
          </h2>
        </div>

        <div className="cta-right">
          <p className="cta-lead-text">
            Join the fashion revolution. Experience the world's most advanced 
            neural try-on technology and never doubt your size again.
          </p>
          
          <div className="cta-action-row">
            <button className="cta-prime-btn">
              Start Free Trial
              <div className="btn-icon-circle">
                <ArrowRight size={20} />
              </div>
            </button>
            
            <button className="cta-video-btn">
              <div className="play-ring">
                <Play size={14} fill="currentColor" />
              </div>
              How it works
            </button>
          </div>
          
          <div className="cta-trust-badges">
            <span className="trust-item">No credit card required</span>
            <span className="trust-divider">|</span>
            <span className="trust-item">Cancel anytime</span>
          </div>
        </div>
      </div>

      {/* Abstract Shapes (No Cards) */}
      <div className="cta-orb orb-pink"></div>
      <div className="cta-orb orb-purple"></div>
    </section>
  );
};

export default CTASection;