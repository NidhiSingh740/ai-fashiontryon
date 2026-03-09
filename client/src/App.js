// client/src/App.js
import React from 'react';
import HeroSection from './landingpage/HeroSection';
import HowItWorks from './landingpage/HowItWork';
import FeatureSection from './landingpage/FeatureSection';
function App() {
  return (
    <div>
      <HeroSection />
      <HowItWorks/>
      <FeatureSection/>
      {/* Other components like your footer or features section would go here */}
    </div>
  );
}

export default App;