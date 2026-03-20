import React, { useState, useEffect, useRef } from 'react';
import { Ruler, Palette, Camera, Trash2, Save, CheckCircle, ShieldCheck } from 'lucide-react';
import './styles/ProfileSection.css';

const ProfileSection = () => {
  const [formData, setFormData] = useState({
    name: '', gender: '', height: '', weight: '', skinTone: '',
    chest: '', waist: '', hips: '', fullBodyImage: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ text: '', type: '' });
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/profile', {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        }
      });
      
      const data = await res.json();
      console.log("SUCCESS: Received Profile Data:", data); 
      
      if (res.ok) {
        // Set data and handle the "0" case by converting to empty string for better UI editing
        setFormData({
          name: data.name || '',
          gender: data.gender || '',
          height: data.height || '',
          weight: data.weight || '',
          skinTone: data.skinTone || '',
          chest: data.chest || '',
          waist: data.waist || '',
          hips: data.hips || '',
          fullBodyImage: data.fullBodyImage || ''
        });
      }
    } catch (error) {
      console.error("Network error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      setStatus({ text: 'Syncing...', type: 'info' });

      const res = await fetch('http://localhost:5000/api/profile/update', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus({ text: 'Neural Profile Synchronized!', type: 'success' });
        // Re-fetch to ensure state matches DB perfectly
        fetchProfile();
        setTimeout(() => setStatus({ text: '', type: '' }), 3000);
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      setStatus({ text: 'Update Failed. Check connection.', type: 'error' });
      setTimeout(() => setStatus({ text: '', type: '' }), 3000);
    }
  };

  if (loading) return <div className="dash-loader"><p>Fetching Neural Biometrics...</p></div>;

  return (
    <div className="profile-container animate-in">
      <header className="profile-header">
        <div className="title-area">
          <h1>Neural <span className="text-gradient">Fit Profile</span></h1>
          <p>Your digital silhouette is synced and ready for AI Try-On.</p>
        </div>
        <button className="save-btn" onClick={handleSave}>
          <Save size={18} /> Update Profile
        </button>
      </header>

      {status.text && <div className={`status-msg ${status.type}`}>{status.text}</div>}

      <div className="profile-grid">
        <div className="profile-card photo-card">
          <div className="card-label"><Camera size={16} /> Virtual Model Photo</div>
          <div className="full-body-preview">
            {formData.fullBodyImage ? (
              <>
                <img src={formData.fullBodyImage} alt="Neural Model" />
                <button className="delete-photo-btn" onClick={() => setFormData({...formData, fullBodyImage: ''})}><Trash2 size={18} /></button>
              </>
            ) : (
              <div className="upload-placeholder" onClick={() => fileInputRef.current.click()}>
                <Camera size={40} />
                <span>Upload Full-Body Photo</span>
              </div>
            )}
            <input type="file" hidden ref={fileInputRef} onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => setFormData({...formData, fullBodyImage: reader.result});
              if(file) reader.readAsDataURL(file);
            }} accept="image/*" />
          </div>
        </div>

        <div className="profile-card data-card">
          <div className="card-label"><Ruler size={16} /> Live Biometrics</div>
          <div className="biometrics-form">
            <div className="input-row">
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} className="profile-select">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Skin Tone</label>
                <input type="text" name="skinTone" value={formData.skinTone} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>Height (cm)</label>
                <input type="number" name="height" value={formData.height} onChange={handleInputChange} />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Weight (kg)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} />
              </div>
              <div className="input-group highlight-pink">
                <label>Chest (inch)</label>
                <input type="number" name="chest" value={formData.chest} onChange={handleInputChange} />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group highlight-pink">
                <label>Waist (inch)</label>
                <input type="number" name="waist" value={formData.waist} onChange={handleInputChange} />
              </div>
              <div className="input-group highlight-pink">
                <label>Hips (inch)</label>
                <input type="number" name="hips" value={formData.hips} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <div className="ai-status-box">
             <CheckCircle size={20} className="glow-icon" />
             <div>
                <h4>Biometric Sync Active</h4>
                <p>Edit any value above to update your virtual model.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;