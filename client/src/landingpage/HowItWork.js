import React from 'react';
import { Camera, Shirt, Sparkles, ArrowRight } from 'lucide-react';
import './styles/HowItWork.css';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Upload Your Photo",
      desc: "Simply snapshot or upload a full-body picture. Our neural engine instantly maps your unique physique and posture.",
      icon: <Camera className="step-icon" />,
      color: "pink",
      bgImage: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop"
    },
    {
      number: "02",
      title: "Choose Your Outfit",
      desc: "Browse hundreds of styles from top brands. Select any garment, and our AI will digitally warp and drape it onto your photo.",
      icon: <Shirt className="step-icon" />,
      color: "purple",
      bgImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop"
    },
    {
      number: "03",
      title: "Instant Virtual Fit",
      desc: "Get a hyper-realistic Before/After view. Analyze size predictions, color suitability, and receive AI styling suggestions.",
      icon: <Sparkles className="step-icon" />,
      color: "blue",
      bgImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <section id="how-it-works" className="how-section">
      <div className="how-header">
        {/* <span className="how-badge">Process</span> */}
        <h2 className="how-title">The Future of Fitting, <span className="text-gradient">Simplified.</span></h2>
      </div>

      <div className="how-timeline-container">
        {/* The Vertical Connection Line */}
        <div className="timeline-line"></div>

        {steps.map((step, index) => (
          <div className={`how-step-card card-${step.color}`} key={index}>
            {/* The Step Number (Floating and Large) */}
            <div className="step-number-wrapper">
              <span className="step-number">{step.number}</span>
              <div className="step-dot"></div>
            </div>

            {/* Content Side */}
            <div className="step-content">
              <div className="step-icon-box">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              <button className="step-learn-btn">
                Learn More <ArrowRight size={16} />
              </button>
            </div>

            {/* Image/Visual Side */}
            <div className="step-visual">
              <div className="step-image-wrapper">
                <img src={step.bgImage} alt={step.title} className="step-img" />
                <div className="step-overlay"></div>
                {/* Decorative floating UI elements */}
                <div className="step-ui-tag ui-top">NEURAL_MAP://ACTIVE</div>
                <div className="step-ui-tag ui-bottom">FIT_CONFIDENCE: 98.7%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;