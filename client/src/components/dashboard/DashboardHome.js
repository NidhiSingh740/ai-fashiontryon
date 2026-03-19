import React, { useState, useEffect } from 'react';
import { Zap, Heart, CheckCircle, Sparkles, TrendingUp, Loader2, Clock, ChevronRight, Star } from 'lucide-react';
import './styles/DashboardHome.css';

const DashboardHome = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/dashboard/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        if (response.ok) setData(result);
      } catch (error) {
        console.error("Dashboard Sync Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="dash-loader">
      <Loader2 className="spinner" size={40} />
      <p>Syncing Neural Profile...</p>
    </div>
  );

  return (
    <div className="dash-home-container">
      {/* 1. TOP SECTION: WELCOME & METER */}
      <header className="dash-header">
        <div className="welcome-box">
          <h1>Welcome, <span className="text-gradient">{data?.name}</span></h1>
          <p>Your AI Style Profile is 98% complete. Ready for a new look?</p>
        </div>
        
        <div className="style-meter-card">
           <div className="meter-info">
              <Star size={16} className="star-icon" />
              <span>Style Quotient: <b>850</b></span>
           </div>
           <div className="meter-bar"><div className="meter-fill" style={{width: '85%'}}></div></div>
        </div>
      </header>

      {/* 2. STATS GRID */}
      <div className="stats-row">
        <div className="stat-card pink-glow">
          <Zap size={24} className="icon" />
          <div className="stat-meta">
            <h3>{data?.stats?.totalTrials || 0}</h3>
            <p>Total Trials</p>
          </div>
        </div>
        <div className="stat-card purple-glow">
          <Heart size={24} className="icon" />
          <div className="stat-meta">
            <h3>{data?.stats?.savedLooks || 0}</h3>
            <p>Saved Looks</p>
          </div>
        </div>
        <div className="stat-card blue-glow">
          <CheckCircle size={24} className="icon" />
          <div className="stat-meta">
            <h3>{data?.stats?.perfectFits || 0}</h3>
            <p>Perfect Fits</p>
          </div>
        </div>
      </div>

      {/* 3. BENTO GRID: RECENT & TRENDS */}
      <div className="bento-layout">
        <div className="bento-item recent-activity">
          <div className="bento-head">
            <div className="title"><Clock size={18} /> <h3>Recently Tried</h3></div>
            <button className="view-link">History <ChevronRight size={14} /></button>
          </div>
          
          <div className="recent-stack-container">
            {/* Card 1 */}
            <div className="recent-card-wrapper">
              <div className="recent-glass-card">
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300" alt="trial-1" />
                <div className="card-badge">98% Fit</div>
                <div className="card-info">
                  <span>Streetwear Oversized</span>
                  <p>2 hours ago</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="recent-card-wrapper">
              <div className="recent-glass-card">
                <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300" alt="trial-2" />
                <div className="card-badge">92% Fit</div>
                <div className="card-info">
                  <span>Classic Evening Blazer</span>
                  <p>Yesterday</p>
                </div>
              </div>
            </div>

            {/* Add New Trial Card */}
            <div className="recent-card-wrapper add-new-wrapper">
              <div className="recent-glass-card add-card" onClick={() => window.location.href='/try-on'}>
                <div className="plus-circle">
                  <Sparkles size={24} />
                </div>
                <span>Start New Trial</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-column-stack">
          {/* AI Insight Box */}
          <div className="bento-item ai-insight-box">
             <div className="title"><TrendingUp size={18} /> <h3>AI Smart Insight</h3></div>
             <p className="insight-text">
                Based on your <b>{data?.stats?.perfectFits || 0}</b> perfect fits, we noticed you look best in 
                <span className="highlight"> Cool Blue tones</span>.
             </p>
             <button className="action-btn">Generate New Suggestions</button>
          </div>

          {/* Trending Styles */}
          <div className="bento-item trending-now">
             <div className="title"><Sparkles size={18} /> <h3>Trending Styles</h3></div>
             <div className="trend-tags">
                <span className="tag">#Cyberpunk</span>
                <span className="tag">#OldMoney</span>
                <span className="tag">#Minimalist</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;