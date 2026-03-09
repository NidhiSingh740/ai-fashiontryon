import React, { useEffect, useRef } from 'react';
import './styles/HowItWork.css';

const HowItWorks = () => {
  const elementsRef = useRef([]);

  // Intersection Observer for smooth, premium scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const stepsData = [
    {
      id: "01",
      title: "Digitize Your Silhouette",
      subtitle: "The AI Body Mapping",
      description: "Upload a simple photo or take a live snap. Our proprietary AI instantly maps your unique body structure, measurements, and skin undertones with pinpoint accuracy.",
      image: "fashion1.jpg",
      alt: "Woman taking a photo"
    },
    {
      id: "02",
      title: "Curate Your Wardrobe",
      subtitle: "Smart Catalog Integration",
      description: "Browse thousands of styles from top brands. Let our AI Stylist analyze current trends and your personal profile to recommend pieces that complement your exact body type.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
      alt: "Curated fashion rack"
    },
    {
      id: "03",
      title: "Experience the Fit",
      subtitle: "Photorealistic Virtual Try-On",
      description: "Watch the magic unfold. See a hyper-realistic simulation of how the fabric drapes, fits, and moves on your actual body. No more guessing—know it fits before you buy.",
      image: "fashion2.jpg",
      alt: "High fashion modeling"
    }
  ];

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section className="premium-how-it-works">
      {/* Decorative background blur elements */}
      <div className="bg-glow glow-pink"></div>
      <div className="bg-glow glow-blue"></div>

      <div className="container">
        <div className="header-content reveal-on-scroll" ref={addToRefs}>
          {/* <span className="eyebrow">The Process</span> */}
          <h2> How It <span> Work</span></h2>
          <p>Experience a frictionless journey from discovery to the perfect fit.</p>
        </div>

        <div className="steps-wrapper">
          {stepsData.map((step, index) => (
            <div 
              className={`step-row ${index % 2 !== 0 ? 'reverse' : ''}`} 
              key={step.id}
            >
              {/* Image Section */}
              <div className="step-image-container reveal-on-scroll" ref={addToRefs}>
                <div className="image-wrapper">
                  <img src={step.image} alt={step.alt} className="step-image" />
                  {/* <div className="glass-badge">
                    <span>AI Powered</span>
                  </div> */}
                </div>
              </div>

              {/* Text Section */}
              <div className="step-text-container reveal-on-scroll" ref={addToRefs}>
                <div className="step-number">{step.id}</div>
                <h4 className="step-subtitle">{step.subtitle}</h4>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;