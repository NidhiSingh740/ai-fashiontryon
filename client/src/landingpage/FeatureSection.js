import React from 'react';
import { 
  Shirt, Maximize, Palette, Layers, Rotate3d, Sparkles 
} from 'lucide-react';
import './styles/FeatureSection.css';

const features = [
  {
    title: "Virtual Try-On",
    desc: "Experience clothes in high-fidelity AI-generated previews that match your pose perfectly.",
    icon: <Shirt size={24} />,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Smart Size Engine",
    desc: "Our Neural-Fit™ logic analyzes your body measurements to predict your perfect size with 99% accuracy.",
    icon: <Maximize size={24} />,
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "AI Color Harmony",
    desc: "Get instant skin-tone analysis and discover which palettes make you glow.",
    icon: <Palette size={24} />,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Style Compare",
    desc: "Save multiple looks and compare them side-by-side to make the best fashion choice.",
    icon: <Layers size={24} />,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "360° Perspective",
    desc: "View how garments drape and move from every angle using our advanced warping tech.",
    icon: <Rotate3d size={24} />,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Personal AI Stylist",
    desc: "Receive outfit suggestions for any occasion based on your unique body type and preferences.",
    icon: <Sparkles size={24} />,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
  }
];

const FeaturesSection = () => {
  return (
    <section className="features-container" id="features">
      <div className="features-header">
        {/* <span className="features-badge">Core Capabilities</span> */}
        <h2 className="features-main-title"> What are the  <span className="text-gradient">Features</span></h2>
        <p className="features-subtitle">
          Cutting-edge AI modules designed to eliminate the guesswork from online shopping.
        </p>
      </div>

      <div className="features-grid">
        {features.map((f, index) => (
          <div className="feature-card" key={index}>
            {/* Background Image */}
            <div className="card-image-bg" style={{ backgroundImage: `url(${f.image})` }}></div>
            
            {/* Dark Overlay for text readability */}
            <div className="card-overlay"></div>

            {/* Static Content (Heading at Bottom) */}
            <div className="card-static-content">
              <h3 className="feature-item-title">{f.title}</h3>
            </div>

            {/* Hover Content (Description & Icon) */}
            <div className="card-hover-content">
              <div className="feature-icon-wrapper">{f.icon}</div>
              <h3 className="hover-title">{f.title}</h3>
              <p className="feature-item-desc">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;