import React from 'react';
import { Sparkles, Instagram, Twitter, Linkedin, Github, ArrowUp } from 'lucide-react';
import { animateScroll as scroll } from 'react-scroll';
import './styles/Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <footer className="footer-master">
      <div className="footer-glow"></div>
      
      <div className="footer-content">
        {/* Brand & Newsletter Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <Sparkles size={28} className="logo-sparkle" />
              <span className="logo-text">Style<span className="text-pink">Mirror</span></span>
            </div>
            <p className="footer-tagline">
              Redefining the digital shopping experience through Neural-Fit™ AI technology.
            </p>
            <div className="social-links">
              <a href="#instagram" className="social-icon"><Instagram size={20} /></a>
              <a href="#twitter" className="social-icon"><Twitter size={20} /></a>
              <a href="#linkedin" className="social-icon"><Linkedin size={20} /></a>
              <a href="#github" className="social-icon"><Github size={20} /></a>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>Join the Revolution</h4>
            <p>Get the latest AI fashion trends & beta updates.</p>
            <div className="newsletter-box">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Links & Bottom Info */}
        <div className="footer-bottom">
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
          </div>
          
          <div className="copyright">
            © 2026 StyleMirror AI. Crafted for trendsetters.
          </div>

          <button className="back-to-top" onClick={scrollToTop}>
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;