import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Shirt, Maximize, Palette, 
  Sparkles, Heart, History, User, LogOut
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  
  // Initialize with fallback values
  const [userData, setUserData] = useState({ 
    name: "Guest User", 
    profileImage: "https://i.pravatar.cc/150?u=guest" 
  });

  useEffect(() => {
    // Pull the user data saved during login/registration
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/'); // Redirect to landing/login page
  };

  const menuItems = [
    { name: "Dashboard Home", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Virtual Try-On", icon: <Shirt size={20} />, path: "/try-on" },
    { name: "Size Recommendation", icon: <Maximize size={20} />, path: "/size-guide" },
    { name: "Color Analysis", icon: <Palette size={20} />, path: "/color-analysis" },
    { name: "AI Stylist", icon: <Sparkles size={20} />, path: "/ai-stylist" },
    { name: "Saved Outfits", icon: <Heart size={20} />, path: "/wishlist" },
    { name: "History", icon: <History size={20} />, path: "/history" },
    { name: "My Profile", icon: <User size={20} />, path: "/profile" },
  ];

  return (
    <aside className="sidebar-master">
      <div className="sidebar-header">
        <div className="user-profile">
          <div className="avatar-wrapper">
            {/* Uses profileImage from backend, or a placeholder if empty */}
            <img 
              src={userData.profileImage || "https://i.pravatar.cc/150?u=placeholder"} 
              alt="User" 
            />
            <div className="status-indicator"></div>
          </div>
          <div className="user-meta">
            <span className="user-name">{userData.name}</span>
            <span className="user-status">Pro Member</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink 
            to={item.path} 
            key={index} 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <div className="link-icon">{item.icon}</div>
            <span className="link-text">{item.name}</span>
            {item.name === "Saved Outfits" && <span className="badge-count">6</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <div className="logout-icon-box">
            <LogOut size={18} />
          </div>
          <span>Logout</span>
        </button>
      </div>
      
      {/* Decorative Glow */}
      <div className="sidebar-blur-glow"></div>
    </aside>
  );
};

export default Sidebar;