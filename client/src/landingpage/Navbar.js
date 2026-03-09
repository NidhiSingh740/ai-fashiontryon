import React, { useState, useEffect } from 'react';
import { Sparkles, User, Menu, X } from 'lucide-react';
import { Link } from 'react-scroll'; // npm install react-scroll
import './styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Effect to change background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 // Inside Navbar.js
const navLinks = [
  { name: 'Home', to: 'hero' },           // Matches id="hero"
  { name: 'Process', to: 'how-it-works' }, // Matches id="how-it-works"
  { name: 'Features', to: 'features' },   // Matches id="features"
  { name: 'Why Us', to: 'why-us' },       // Matches id="why-us"
  { name: 'Reviews', to: 'testimonials' },// Matches id="testimonials"
];

  return (
    <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Left Side: Logo */}
        <div className="nav-logo">
          <div className="logo-icon-box">
            <Sparkles size={22} className="logo-icon" />
          </div>
          <span className="logo-text">Style<span className="text-pink">Mirror</span></span>
        </div>

        {/* Center: Navigation Links */}
        <ul className={`nav-links ${mobileMenu ? 'nav-active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.to}>
             <Link
  to={link.to}
  smooth={true}
  duration={800}
  offset={-100} // Increase this number to leave more space for the navbar
  className="nav-item"
>
  {link.name}
</Link>
            </li>
          ))}
        </ul>

        {/* Right Side: Login Button */}
        <div className="nav-actions">
          <button className="nav-login-btn" onClick={() => window.location.href='/login'}>
            <User size={18} />
            <span>Login</span>
          </button>
          
          {/* Mobile Toggle */}
          <div className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;