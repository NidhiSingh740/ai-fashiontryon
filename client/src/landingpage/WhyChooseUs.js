import React from 'react';
import { Leaf, Wallet, UserCheck, ArrowRight } from 'lucide-react';
import './styles/WhyChooseUs.css';

const WhyChooseUs = () => {
  const reasons = [
    {
      id: "01",
      title: "Reduce Returns",
      desc: "Stop the guessing game. By seeing exactly how a garment fits your unique body shape, we help reduce online shopping returns by up to 40%, saving the planet and your time.",
      icon: <Leaf className="reason-icon" />,
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "02",
      title: "Save Money",
      desc: "Invest in pieces you actually wear. Avoid 'closet clutter' and expensive shipping fees by making informed decisions before you ever hit the checkout button.",
      icon: <Wallet className="reason-icon" />,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "03",
      title: "Personalized Styling",
      desc: "Our AI doesn't just show you clothes; it understands your skin tone and body type to suggest outfits that make you look your absolute best.",
      icon: <UserCheck className="reason-icon" />,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section id="why-us" className="why-section">
      <div className="why-container">
        {/* Sticky Left Side: The "Crazy" Visuals */}
        <div className="why-visual-side">
          <div className="visual-wrapper">
            <div className="experience-tag">The StyleMirror Experience</div>
            <img 
              src="fashion3.jpg" 
              alt="Fashion Future" 
              className="main-sticky-img"
            />
            <div className="floating-stat">
              <span className="stat-number">98%</span>
              <span className="stat-label">Fit Accuracy</span>
            </div>
          </div>
        </div>

        {/* Scrolling Right Side: The Content */}
        <div className="why-content-side">
          <div className="content-header">
            <h2 className="why-title">Why Choose <span className="text-gradient">Us</span></h2>
          </div>

          <div className="reasons-list">
            {reasons.map((reason) => (
              <div className="reason-item" key={reason.id}>
                <div className="reason-number">{reason.id}</div>
                <div className="reason-info">
                  <div className="reason-header">
                    {reason.icon}
                    <h3>{reason.title}</h3>
                  </div>
                  <p>{reason.desc}</p>
                  <button className="learn-more-btn">
                    Explore Feature <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;