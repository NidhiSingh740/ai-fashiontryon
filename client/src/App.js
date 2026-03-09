// client/src/App.js
import React from 'react';
import HeroSection from './landingpage/HeroSection';
import HowItWorks from './landingpage/HowItWork';
import FeatureSection from './landingpage/FeatureSection';
import WhyChooseUs from './landingpage/WhyChooseUs';
import Testimonials from './landingpage/Testimonials';
import CTA from './landingpage/CTASection';
import Footer from './landingpage/Footer';


function App() {
  return (
    <div>
      <HeroSection />
      <HowItWorks/>
      <FeatureSection/>
      <WhyChooseUs/>
      <Testimonials/>
      <CTA/>
      <Footer/>
      {/* Other components like your footer or features section would go here */}
    </div>
  );
}

export default App;