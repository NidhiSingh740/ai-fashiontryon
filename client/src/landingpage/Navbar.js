
// client/src/landingpage/Navbar.js
import React from 'react';
import './styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left side: Logo */}
      <div className="nav-logo">
        <svg className="nav-logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
        </svg>
        <span className="logo-text">StyleMirror<span className="logo-wow">AI</span></span>
      </div>
      
      {/* Right side: Links and Button */}
      <div className="nav-menu">
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#why-us">Why Us</a>
          
          <a href="#contact">Contact</a>
        </div>
        <button className="nav-login-btn">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;