// client/src/components/dashboard/VirtualTryOn.js

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Upload, RefreshCw, Download, Loader2, Shirt, CheckCircle, AlertCircle } from 'lucide-react';
import './styles/VirtualTryOn.css';

const VirtualTryOn = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const [garmentImage, setGarmentImage] = useState(null);
  const [garmentPreview, setGarmentPreview] = useState(null);

  const [resultImage, setResultImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [error, setError] = useState('');

  const garmentInputRef = useRef(null);

  // ─── Fetch user profile ────────────────────────────────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Guard: make sure response is JSON before parsing
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          throw new Error(`Profile API returned non-JSON (status ${res.status}). Check server is running on port 5000.`);
        }

        const data = await res.json();
        if (res.ok) setUserProfile(data);
      } catch (err) {
        console.error('Profile fetch error:', err.message);
        setError(err.message);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ─── Handle garment image upload ──────────────────────────────────────────
  const handleGarmentUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResultImage(null);
    setError('');
    setGarmentPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => setGarmentImage(reader.result);
    reader.readAsDataURL(file);
  };

  // ─── Main Try-On ───────────────────────────────────────────────────────────
  const handleTryOn = async () => {
    if (!userProfile?.fullBodyImage) {
      setError('Please upload your full-body photo in Profile Settings first.');
      return;
    }
    if (!garmentImage) {
      setError('Please upload a garment/outfit image.');
      return;
    }

    setIsProcessing(true);
    setError('');
    setResultImage(null);
    setStatusText('Uploading images to AI...');

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/tryon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          personImage: userProfile.fullBodyImage,
          garmentImage: garmentImage,
        }),
      });

      setStatusText('AI is generating your look...');

      // ── CRITICAL: Check content-type before JSON.parse ──
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        // Server returned HTML (crash/404) — get raw text to help debug
        const rawText = await res.text();
        console.error('Server returned non-JSON:', rawText.substring(0, 300));
        throw new Error(
          `Server error (status ${res.status}). Most likely causes:\n` +
          `1. Route not registered — make sure app.use('/api/tryon', tryonRoute) is in your server/index.js\n` +
          `2. REPLICATE_API_TOKEN missing in .env\n` +
          `3. Server crashed — check terminal for error logs`
        );
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server error ${res.status}`);
      }

      setResultImage(data.resultImage);
      setStatusText('');

    } catch (err) {
      console.error('Try-on error:', err);
      setError(err.message);
      setStatusText('');
    } finally {
      setIsProcessing(false);
    }
  };

  // ─── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setGarmentImage(null);
    setGarmentPreview(null);
    setResultImage(null);
    setError('');
    setStatusText('');
    if (garmentInputRef.current) garmentInputRef.current.value = '';
  };

  // ─── Download ──────────────────────────────────────────────────────────────
  const handleDownload = async () => {
    if (!resultImage) return;
    try {
      const response = await fetch(resultImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'my-virtual-tryon.png';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(resultImage, '_blank');
    }
  };

  // ─── Loading ───────────────────────────────────────────────────────────────
  if (profileLoading) {
    return (
      <div className="vto-loader">
        <Loader2 className="spin-icon" size={32} />
        <p>Loading your profile...</p>
      </div>
    );
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="vto-container">

      {/* Header */}
      <div className="vto-header">
        <div>
          <h1>Virtual <span className="pink">Try-On</span></h1>
          <p>Upload any outfit — AI will dress you in it instantly.</p>
        </div>
        {(garmentPreview || resultImage) && (
          <button className="reset-btn" onClick={handleReset}>
            <RefreshCw size={16} /> Start Over
          </button>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="error-banner">
          <AlertCircle size={16} />
          <pre className="error-text">{error}</pre>
        </div>
      )}

      {/* 3-panel layout */}
      <div className="vto-panels">

        {/* Panel 1: Your Photo */}
        <div className="vto-panel">
          <div className="panel-label">
            <span className="dot pink-dot" /> Your Photo
          </div>
          <div className="panel-img-box">
            {userProfile?.fullBodyImage ? (
              <img src={userProfile.fullBodyImage} alt="Your full body" className="panel-img" />
            ) : (
              <div className="panel-empty">
                <Shirt size={36} />
                <p>No photo found.</p>
                <small>Upload in Profile Settings</small>
              </div>
            )}
          </div>
          <div className="upload-section">
            <input
              type="file"
              accept="image/*"
              hidden
              ref={garmentInputRef}
              onChange={handleGarmentUpload}
            />
            <button
              className="upload-btn"
              onClick={() => garmentInputRef.current.click()}
              disabled={isProcessing}
            >
              <Upload size={16} />
              {garmentPreview ? 'Change Outfit' : 'Upload Outfit'}
            </button>
          </div>
        </div>

        {/* Panel 2: Outfit */}
        <div className="vto-panel">
          <div className="panel-label">
            <span className="dot purple-dot" /> Outfit to Try
          </div>
          <div className="panel-img-box garment-box">
            {garmentPreview ? (
              <img src={garmentPreview} alt="Garment" className="panel-img garment-img" />
            ) : (
              <div className="panel-empty dashed" onClick={() => garmentInputRef.current?.click()}>
                <Upload size={36} />
                <p>Upload outfit image</p>
                <small>JPG, PNG supported</small>
              </div>
            )}
          </div>
          <button
            className={`tryon-btn ${isProcessing ? 'processing' : ''}`}
            onClick={handleTryOn}
            disabled={isProcessing || !garmentPreview || !userProfile?.fullBodyImage}
          >
            {isProcessing ? (
              <>
                <Loader2 size={18} className="spin-icon" />
                {statusText || 'Processing...'}
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Try It On
              </>
            )}
          </button>
        </div>

        {/* Panel 3: Result */}
        <div className="vto-panel result-panel">
          <div className="panel-label">
            <span className="dot green-dot" /> AI Result
            {resultImage && (
              <button className="download-btn" onClick={handleDownload}>
                <Download size={14} /> Save
              </button>
            )}
          </div>
          <div className="panel-img-box result-box">
            {isProcessing ? (
              <div className="processing-overlay">
                <div className="scan-bar" />
                <div className="proc-content">
                  <div className="pulse-ring" />
                  <Sparkles size={28} className="proc-icon" />
                  <p className="proc-text">{statusText || 'AI Processing...'}</p>
                  <small>This takes 15–30 seconds</small>
                </div>
              </div>
            ) : resultImage ? (
              <>
                <img src={resultImage} alt="Try-on result" className="panel-img result-img" />
                <div className="result-badge">
                  <CheckCircle size={14} /> Generated
                </div>
              </>
            ) : (
              <div className="panel-empty">
                <Sparkles size={36} />
                <p>Result appears here</p>
                <small>Upload outfit & click Try It On</small>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VirtualTryOn;