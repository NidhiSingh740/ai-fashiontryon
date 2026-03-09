
import React from 'react';
import { Quote, Star } from 'lucide-react';
import './styles/Testimonials.css';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Fashion Influencer",
    text: "StyleMirror changed how I shop. The AI fit is so accurate, I haven't returned a single item in months!",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Marcus Chen",
    role: "Tech Professional",
    text: "The skin tone analysis is a game-changer. I finally know which colors actually make me look professional.",
    image: "https://i.pravatar.cc/150?u=marcus"
  },
  {
    name: "Elena Rodriguez",
    role: "Boutique Owner",
    text: "I recommend this to all my clients. It's the closest thing to having a personal stylist in your pocket.",
    image: "https://i.pravatar.cc/150?u=elena"
  },
  {
    name: "David Kim",
    role: "Daily User",
    text: "Simply the best virtual try-on I've used. The way the clothes drape over my photo is incredibly realistic.",
    image: "https://i.pravatar.cc/150?u=david"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="testi-section">
      <div className="testi-header">
        {/* <div className="testi-badge">Social Proof</div> */}
        <h2 className="testi-title">Voices of the <span className="text-gradient">Style Revolution</span></h2>
      </div>

      <div className="testi-marquee-container">
        {/* Row 1: Moving Left */}
        <div className="marquee-row">
          <div className="marquee-content">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div className="testi-card" key={i}>
                <div className="quote-icon"><Quote size={20} fill="currentColor" /></div>
                <div className="star-rating">
                  {[...Array(5)].map((_, s) => <Star key={s} size={14} fill="#fb3e8d" color="#fb3e8d" />)}
                </div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-user">
                  <img src={t.image} alt={t.name} className="user-avatar" />
                  <div className="user-info">
                    <h4 className="user-name">{t.name}</h4>
                    <span className="user-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moving Right */}
        <div className="marquee-row row-reverse">
          <div className="marquee-content">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div className="testi-card" key={i}>
                <div className="quote-icon"><Quote size={20} fill="currentColor" /></div>
                <div className="star-rating">
                  {[...Array(5)].map((_, s) => <Star key={s} size={14} fill="#fb3e8d" color="#fb3e8d" />)}
                </div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-user">
                  <img src={t.image} alt={t.name} className="user-avatar" />
                  <div className="user-info">
                    <h4 className="user-name">{t.name}</h4>
                    <span className="user-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="testi-glow"></div>
    </section>
  );
};

export default Testimonials;