import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Public Pages
import HeroSection from "./landingpage/HeroSection";
import HowItWorks from "./landingpage/HowItWork";
import FeatureSection from "./landingpage/FeatureSection";
import WhyChooseUs from "./landingpage/WhyChooseUs";
import Testimonials from "./landingpage/Testimonials";
import CTA from "./landingpage/CTASection";
import Footer from "./landingpage/Footer";
import AuthPage from "./AuthPage";

// Dashboard Components
import Sidebar from "./components/dashboard/Sidebar";
import DashboardHome from "./components/dashboard/DashboardHome"; // <-- NEW IMPORT
import ProfileSection from "./components/dashboard/ProfileSection";
// Landing Page Grouping
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

function AppContent() {
  const location = useLocation();
  
  // Define which routes should show the Sidebar
  const isDashboardRoute = 
    location.pathname.startsWith('/dashboard') || 
    location.pathname.startsWith('/profile') ||

    location.pathname.startsWith('/try-on') ||
    location.pathname.startsWith('/size-guide') ||
    location.pathname.startsWith('/color-analysis') ||
    location.pathname.startsWith('/ai-stylist') ||
    location.pathname.startsWith('/wishlist') ||
    location.pathname.startsWith('/history');

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Main Layout Wrapper */}
      <div style={{ 
        display: 'flex', 
        flex: 1, 
        flexDirection: isDashboardRoute ? 'row' : 'column',
        background: isDashboardRoute ? '#020617' : 'inherit' 
      }}>
        
        {/* Sidebar only appears on Dashboard Routes */}
        {isDashboardRoute && <Sidebar />}

        {/* Content Area */}
        <main style={{ 
          flex: 1, 
          padding: isDashboardRoute ? '40px' : '0', 
          width: '100%',
          background: isDashboardRoute ? '#020617' : 'transparent'
        }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* Dashboard Routes - NOW USING REAL COMPONENTS */}
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/profile" element={<ProfileSection />} />
           

            <Route path="/try-on" element={<div style={{color: 'white'}}>AI Virtual Try-On Module (Coming Soon)</div>} />
            <Route path="/size-guide" element={<div style={{color: 'white'}}>Size Recommendation Module</div>} />
            <Route path="/color-analysis" element={<div style={{color: 'white'}}>Color Analysis Module</div>} />
            <Route path="/ai-stylist" element={<div style={{color: 'white'}}>AI Stylist Module</div>} />
            <Route path="/wishlist" element={<div style={{color: 'white'}}>Saved Outfits</div>} />
            <Route path="/history" element={<div style={{color: 'white'}}>View History</div>} />
          </Routes>
        </main>
      </div>

      {/* Footer visible on every page */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;