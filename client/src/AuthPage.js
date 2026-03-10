import React, { useState, useRef } from 'react';
import { Mail, Lock, User, Ruler, Palette, ChevronRight, ChevronLeft, Sparkles, Shirt, Camera, Users } from 'lucide-react';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState({ text: '', type: '' });
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', gender: '',
    height: '', weight: '', skinTone: '',
    chest: '', profileImage: null
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        setMessage({ text: data.message, type: 'success' });
        if (isLogin) localStorage.setItem('token', data.token);
      } else {
        setMessage({ text: data.message, type: 'error' });
      }
    } catch (err) {
      setMessage({ text: "Connection Failed", type: 'error' });
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="auth-fluid-wrapper">
      <div className="auth-ambient-glow"></div>

      <div className="auth-split-layout">
        <div className="auth-brand-side">
          <div className="brand-sticky-content">
            <div className="auth-logo-premium">
              <span className="sparkle-icon"><Sparkles size={32} /></span>
              <span>StyleMirror</span>
            </div>
            <h1 className="brand-statement">
              {isLogin ? "Welcome back to the " : "Define your "}
              <span className="text-gradient">Digital Silhouette.</span>
            </h1>
            <p className="brand-subtext">
              Securely access your Neural-Fit™ profile and explore clothes that actually fit your reality.
            </p>
          </div>
        </div>

        <div className="auth-form-side">
          <div className="form-inner-container">
            <header className="form-nav">
              <button className={isLogin ? "nav-active" : ""} onClick={() => {setIsLogin(true); setStep(1); setMessage({text:'', type:''})}}>Sign In</button>
              <button className={!isLogin ? "nav-active" : ""} onClick={() => {setIsLogin(false); setStep(1); setMessage({text:'', type:''})}}>Register</button>
            </header>

            {message.text && (
              <div className={`auth-alert ${message.type}`}>
                {message.text}
              </div>
            )}

            <form className="fluid-form" onSubmit={handleSubmit}>
              {isLogin ? (
                <div className="form-step-animate">
                  <div className="input-field">
                    <label>Email Address</label>
                    <div className="input-box">
                      <Mail size={18} />
                      <input type="email" name="email" placeholder="name@company.com" onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Password</label>
                    <div className="input-box">
                      <Lock size={18} />
                      <input type="password" name="password" placeholder="••••••••" onChange={handleInputChange} required />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="form-step-animate">
                  {step === 1 ? (
                    <div className="step-content">
                      <div className="profile-upload-section">
                        <div className="image-preview-circle" onClick={() => fileInputRef.current.click()}>
                          {formData.profileImage ? (
                            <img src={formData.profileImage} alt="Preview" />
                          ) : (
                            <Camera size={24} />
                          )}
                        </div>
                        <input type="file" hidden ref={fileInputRef} onChange={handleImageChange} accept="image/*" />
                        <span className="upload-label">Upload Profile Photo</span>
                      </div>

                      <div className="input-field">
                        <label>Full Name</label>
                        <div className="input-box"><User size={18} /><input type="text" name="name" placeholder="John Doe" onChange={handleInputChange} /></div>
                      </div>

                      <div className="input-field">
                        <label>Gender</label>
                        <div className="input-box">
                          <Users size={18} />
                          <select name="gender" onChange={handleInputChange} className="custom-select" value={formData.gender}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="input-field">
                        <label>Email</label>
                        <div className="input-box"><Mail size={18} /><input type="email" name="email" placeholder="john@example.com" onChange={handleInputChange} required /></div>
                      </div>
                      
                      <div className="input-field">
                        <label>Password</label>
                        <div className="input-box"><Lock size={18} /><input type="password" name="password" placeholder="Min. 8 characters" onChange={handleInputChange} required /></div>
                      </div>
                    </div>
                  ) : (
                    <div className="step-content grid-inputs">
                      <div className="input-field">
                        <label>Height (cm)</label>
                        <div className="input-box"><Ruler size={18} /><input type="number" name="height" onChange={handleInputChange} /></div>
                      </div>
                      <div className="input-field">
                        <label>Weight (kg)</label>
                        <div className="input-box"><User size={18} /><input type="number" name="weight" onChange={handleInputChange} /></div>
                      </div>
                      <div className="input-field">
                        <label>Skin Tone</label>
                        <div className="input-box"><Palette size={18} /><input type="text" name="skinTone" placeholder="e.g. Fair" onChange={handleInputChange} autoComplete="off" /></div>
                      </div>
                      <div className="input-field">
                        <label>Chest (cm)</label>
                        <div className="input-box"><Shirt size={18} /><input type="number" name="chest" onChange={handleInputChange} /></div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="form-footer-actions">
                {!isLogin && step === 1 ? (
                  <button type="button" className="btn-fluid-primary" onClick={nextStep}>  
                    Next Step <ChevronRight size={18} />
                  </button>
                ) : (
                  <div className="btn-combo">
                    {!isLogin && <button type="button" className="btn-fluid-outline" onClick={prevStep}><ChevronLeft size={20} /></button>}
                    <button type="submit" className="btn-fluid-primary">
                      {isLogin ? "Authenticate" : "Finalize Profile"}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;