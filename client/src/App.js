import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HeroSection from "./landingpage/HeroSection";
import HowItWorks from "./landingpage/HowItWork";
import FeatureSection from "./landingpage/FeatureSection";
import WhyChooseUs from "./landingpage/WhyChooseUs";
import Testimonials from "./landingpage/Testimonials";
import CTA from "./landingpage/CTASection";
import Footer from "./landingpage/Footer";
import AuthPage from "./AuthPage";

function LandingPage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeatureSection />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </>
  );
}
function App() {
  return (
    <Router>
      <div className="App"> 
        <main> 
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
     
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;