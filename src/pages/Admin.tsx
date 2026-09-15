import React, { useState, useEffect } from 'react';
import { useFeatures } from '../context/FeatureContext';
import { FeatureFlags } from '../config/features';
import {
  Shield,
  RotateCcw,
  Inbox,
  Mail,
  Trash2,
  User,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  Lock,
  Unlock,
  Upload,
  Link,
  FileText,
  Save,
  CheckCircle2,
  KeyRound,
  EyeOff,
} from 'lucide-react';

interface StoredMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: string;
}

export const Admin: React.FC = () => {
  const {
    features,
    toggleFeature,
    resetAllFeatures,
    resumeConfig,
    updateResumeConfig,
    adminSecurity,
    updateAdminSecurity,
    isUnlocked,
    unlockAdmin,
    lockAdmin,
  } = useFeatures();

  // Personal Security Lock state
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Admin Dashboard Tabs
  const [activeTab, setActiveTab] = useState<'toggles' | 'resume' | 'inbox' | 'security'>('toggles');

  // Resume state
  const [driveUrlInput, setDriveUrlInput] = useState(resumeConfig.driveUrl);
  const [resumeMode, setResumeMode] = useState<'drive' | 'file'>(resumeConfig.mode);
  const [fileFileName, setFileFileName] = useState('');
  const [resumeToast, setResumeToast] = useState(false);

  // Messages state
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<StoredMessage | null>(null);

  // Security pin update state
  const [newPinInput, setNewPinInput] = useState(adminSecurity.pin);
  const [pinUpdateToast, setPinUpdateToast] = useState(false);

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (res.ok && data.success) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.log('Using local memory storage for admin inbox');
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (isUnlocked) {
      fetchMessages();
    }
  }, [isUnlocked]);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = unlockAdmin(pinInput);
    if (!success) {
      setPinError(true);
      setTimeout(() => setPinError(false), 3000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileFileName(file.name);
      // Create local object URL for preview/download
      const objectUrl = URL.createObjectURL(file);
      updateResumeConfig({ fileUrl: objectUrl, mode: 'file' });
      setResumeMode('file');
      setResumeToast(true);
      setTimeout(() => setResumeToast(false), 3000);
    }
  };

  const handleSaveResumeSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateResumeConfig({
      mode: resumeMode,
      driveUrl: driveUrlInput,
    });
    setResumeToast(true);
    setTimeout(() => setResumeToast(false), 3000);
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    }
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.trim()) {
      updateAdminSecurity({ pin: newPinInput.trim() });
      setPinUpdateToast(true);
      setTimeout(() => setPinUpdateToast(false), 3000);
    }
  };

  const featureList: { key: keyof FeatureFlags; label: string; description: string; category: 'pages' | 'sections' }[] = [
    { key: 'homePage', label: 'Home Page', description: 'Enable or hide the main Landing & Hero page.', category: 'pages' },
    { key: 'aboutPage', label: 'About Me Page', description: 'Enable or hide the About Me, Bio, Experience & Academic page.', category: 'pages' },
    { key: 'workPage', label: 'Work Page (GitHub Showcase)', description: 'Enable or hide the Work & GitHub Projects Showcase page.', category: 'pages' },
    { key: 'contactForm', label: 'Contact Form & Nodemailer Dispatch', description: 'Enable or hide the interactive contact form across About & Home.', category: 'sections' },
    { key: 'githubApiFeed', label: 'Live GitHub API Fetch', description: 'Enable real-time GitHub REST API repository sync on the Work Page.', category: 'sections' },
    { key: 'experienceTimeline', label: 'Work Experience Timeline (~3 YEO)', description: 'Show or hide the detailed experience timeline card (Turnberry Solutions, Schreiber Foods, Proiuvo).', category: 'sections' },
    { key: 'academicBackground', label: 'Academic Credentials & AWS Certifications', description: 'Show or hide formal degrees (MCA/BCA) and AWS certifications.', category: 'sections' },
    { key: 'technicalExpertise', label: 'Technical Arsenal & Skill Matrix', description: 'Show or hide core skill chips and breakdown cards.', category: 'sections' },
    { key: 'quickStats', label: 'Quick Metrics Counter Grid', description: 'Show or hide key statistics counters on the Home Page.', category: 'sections' },
    { key: 'fullStackBadge', label: 'AWS Certified Header Badge', description: 'Show or hide the AWS SAA-C03 badge next to logo.', category: 'sections' },
  ];

  // -------------------------------------------------------------
  // SECURITY LOCK SCREEN (Personal Usage Only)
  // -------------------------------------------------------------
  if (!isUnlocked) {
    return (
      <div className="container" style={{ padding: '80px 24px', display: 'flex', justifyContent: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '440px', width: '100%', padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="brand-icon" style={{ width: '64px', height: '64px', margin: '0 auto', background: 'linear-gradient(135deg, var(--accent-amber), var(--accent-indigo))' }}>
            <Lock size={32} />
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Personal Admin Access</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              This page is hidden from public view. Please enter your personal owner PIN to unlock settings.
            </p>
          </div>

          {pinError && (
            <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#fca5a5', fontSize: '0.85rem' }}>
              Incorrect PIN. (Default PIN: 1234)
            </div>
          )}

          <form onSubmit={handleUnlockSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter 4-digit PIN (Default: 1234)"
                required
                className="form-input"
                style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '4px', fontFamily: 'var(--font-mono)' }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px' }}>
              <Unlock size={18} />
              <span>Unlock Admin Panel</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // UNLOCKED PERSONAL ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="container" style={{ padding: '48px 24px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Admin Title Header */}
      <div className="glass-panel" style={{ padding: '36px', borderColor: 'rgba(245, 158, 11, 0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge-pill badge-amber">
                <Shield size={14} /> Personal Owner Dashboard
              </span>
              <span className="badge-pill badge-fullstack" style={{ fontSize: '0.75rem' }}>
                <Unlock size={12} /> Authenticated Session
              </span>
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white' }}>Website Administration Center</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '640px' }}>
              Manage website feature flags, upload/link your resume, inspect received contact messages, and configure personal access.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={resetAllFeatures} className="btn-secondary btn-sm">
              <RotateCcw size={14} color="#fbbf24" />
              <span>Reset Toggles</span>
            </button>
            <button onClick={lockAdmin} className="btn-secondary btn-sm" style={{ color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.4)' }}>
              <Lock size={14} />
              <span>Lock Panel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', overflowX: 'auto' }}>
          <button
            onClick={() => setActiveTab('toggles')}
            className={`btn-secondary ${activeTab === 'toggles' ? 'btn-primary' : ''}`}
            style={{ padding: '10px 18px', fontSize: '0.88rem' }}
          >
            <SlidersHorizontal size={16} />
            <span>Feature Flags</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            className={`btn-secondary ${activeTab === 'resume' ? 'btn-primary' : ''}`}
            style={{ padding: '10px 18px', fontSize: '0.88rem' }}
          >
            <FileText size={16} />
            <span>Resume Uploader & Drive Link</span>
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`btn-secondary ${activeTab === 'inbox' ? 'btn-primary' : ''}`}
            style={{ padding: '10px 18px', fontSize: '0.88rem' }}
          >
            <Inbox size={16} />
            <span>Submissions Inbox ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`btn-secondary ${activeTab === 'security' ? 'btn-primary' : ''}`}
            style={{ padding: '10px 18px', fontSize: '0.88rem' }}
          >
            <KeyRound size={16} />
            <span>Personal Security & Visibility</span>
          </button>
        </div>

        {/* TAB 1: FEATURE TOGGLES */}
        {activeTab === 'toggles' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-indigo-light)', textTransform: 'uppercase' }}>
                Page-Level Visibility Controls
              </h2>
              <div className="admin-grid">
                {featureList
                  .filter((f) => f.category === 'pages')
                  .map((item) => {
                    const isEnabled = features[item.key];
                    return (
                      <div key={item.key} className="glass-card toggle-card">
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'white' }}>{item.label}</span>
                            <span className={`badge-pill ${isEnabled ? 'badge-fullstack' : ''}`} style={{ fontSize: '0.7rem' }}>
                              {isEnabled ? 'ACTIVE' : 'HIDDEN'}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item.description}</p>
                        </div>
                        <label className="toggle-switch">
                          <input type="checkbox" checked={isEnabled} onChange={() => toggleFeature(item.key)} />
                          <span className="slider" />
                        </label>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-cyan-light)', textTransform: 'uppercase' }}>
                Feature & Component Section Controls
              </h2>
              <div className="admin-grid">
                {featureList
                  .filter((f) => f.category === 'sections')
                  .map((item) => {
                    const isEnabled = features[item.key];
                    return (
                      <div key={item.key} className="glass-card toggle-card">
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'white' }}>{item.label}</span>
                            <span className={`badge-pill ${isEnabled ? 'badge-fullstack' : ''}`} style={{ fontSize: '0.7rem' }}>
                              {isEnabled ? 'ENABLED' : 'DISABLED'}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item.description}</p>
                        </div>
                        <label className="toggle-switch">
                          <input type="checkbox" checked={isEnabled} onChange={() => toggleFeature(item.key)} />
                          <span className="slider" />
                        </label>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RESUME MANAGER (Google Drive Link vs Direct File Upload) */}
        {activeTab === 'resume' && (
          <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '4px' }}>Resume Dispatch Settings</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Configure whether visitors view your Google Drive link or download a direct PDF uploaded file when clicking "Resume".
              </p>
            </div>

            {resumeToast && (
              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: 'var(--accent-emerald-light)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} />
                <span>Resume configuration updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveResumeSettings} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Select Mode */}
              <div className="form-group">
                <label className="form-label">Active Resume Mode</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div
                    onClick={() => setResumeMode('drive')}
                    className="glass-card"
                    style={{
                      padding: '20px',
                      cursor: 'pointer',
                      borderColor: resumeMode === 'drive' ? 'var(--accent-indigo)' : 'var(--border-subtle)',
                      background: resumeMode === 'drive' ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-surface)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <Link size={20} color="var(--accent-indigo-light)" />
                      <strong style={{ color: 'white', fontSize: '1rem' }}>Google Drive Link</strong>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Opens your shared Google Drive view URL in a new browser tab.
                    </p>
                  </div>

                  <div
                    onClick={() => setResumeMode('file')}
                    className="glass-card"
                    style={{
                      padding: '20px',
                      cursor: 'pointer',
                      borderColor: resumeMode === 'file' ? 'var(--accent-indigo)' : 'var(--border-subtle)',
                      background: resumeMode === 'file' ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-surface)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <Upload size={20} color="var(--accent-cyan-light)" />
                      <strong style={{ color: 'white', fontSize: '1rem' }}>Direct PDF File Upload</strong>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Serves a direct uploaded PDF file directly from the website.
                    </p>
                  </div>
                </div>
              </div>

              {/* Option A: Google Drive Link Input */}
              <div className="form-group">
                <label className="form-label">Google Drive View URL</label>
                <input
                  type="url"
                  value={driveUrlInput}
                  onChange={(e) => setDriveUrlInput(e.target.value)}
                  placeholder="https://drive.google.com/file/d/your-id/view?usp=sharing"
                  className="form-input"
                />
              </div>

              {/* Option B: Direct File Uploader */}
              <div className="form-group">
                <label className="form-label">Direct PDF File Upload</label>
                <div style={{ padding: '24px', border: '2px dashed var(--border-subtle)', borderRadius: 'var(--radius-md)', textAlign: 'center', background: 'rgba(9, 13, 26, 0.6)' }}>
                  <Upload size={32} color="var(--accent-cyan-light)" style={{ margin: '0 auto 8px auto' }} />
                  <p style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600, marginBottom: '4px' }}>
                    Select a PDF Resume file from your computer
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    {fileFileName ? `Selected: ${fileFileName}` : 'Supports .pdf files up to 10MB'}
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    id="resume-upload-input"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="resume-upload-input" className="btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                    Browse PDF File
                  </label>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>
                <Save size={18} />
                <span>Save Resume Settings</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: INBOX */}
        {activeTab === 'inbox' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>Stored Contact Messages</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Stored locally in <code style={{ color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>server/data/messages.json</code>
                </p>
              </div>
              <button onClick={fetchMessages} className="btn-secondary btn-sm">
                <RefreshCw size={14} className={loadingMessages ? 'animate-spin' : ''} />
                <span>Refresh Messages</span>
              </button>
            </div>

            {messages.length > 0 ? (
              <div className="inbox-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => setSelectedMessage(msg)}
                      className="glass-card"
                      style={{
                        padding: '16px',
                        cursor: 'pointer',
                        borderColor: selectedMessage?.id === msg.id ? 'var(--accent-indigo)' : 'var(--border-subtle)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <User size={14} color="var(--accent-indigo-light)" />
                          <strong style={{ color: 'white', fontSize: '0.92rem' }}>{msg.name}</strong>
                        </div>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="badge-pill" style={{ fontSize: '0.7rem', marginBottom: '8px' }}>{msg.subject}</span>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  {selectedMessage ? (
                    <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
                        <div>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>{selectedMessage.subject}</h3>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>From: <strong style={{ color: 'white' }}>{selectedMessage.name}</strong> ({selectedMessage.email})</p>
                        </div>
                        <button onClick={() => handleDeleteMessage(selectedMessage.id)} className="btn-secondary btn-sm" style={{ color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                        {selectedMessage.message}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px' }}>
                        <a href={`mailto:${selectedMessage.email}`} className="btn-primary btn-sm">
                          <Mail size={16} />
                          <span>Reply via Email</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      <Eye size={36} style={{ margin: '0 auto 12px auto' }} />
                      <p style={{ fontWeight: 600, color: 'white' }}>Select a message to view details</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Inbox size={40} color="var(--accent-indigo-light)" style={{ margin: '0 auto 16px auto' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', marginBottom: '8px' }}>Inbox is Empty</h3>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PERSONAL SECURITY & VISIBILITY SETTINGS */}
        {activeTab === 'security' && (
          <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '4px' }}>Personal Security & Visibility</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Configure your personal admin access PIN and navbar link visibility settings.
              </p>
            </div>

            {pinUpdateToast && (
              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: 'var(--accent-emerald-light)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} />
                <span>Security PIN updated successfully!</span>
              </div>
            )}

            {/* Public Navigation Link Visibility Toggle */}
            <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ color: 'white', fontSize: '1rem', display: 'block', marginBottom: '4px' }}>
                  Show Admin Link in Public Navigation Bar
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Default is <strong style={{ color: 'var(--accent-rose)' }}>DISABLED (Hidden)</strong> for personal usage. When hidden, access the admin panel via direct URL `/admin` or footer lock icon.
                </p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={adminSecurity.showInPublicNav}
                  onChange={() => updateAdminSecurity({ showInPublicNav: !adminSecurity.showInPublicNav })}
                />
                <span className="slider" />
              </label>
            </div>

            {/* Update Personal Access PIN */}
            <form onSubmit={handleSavePin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
              <div className="form-group">
                <label className="form-label">Personal Access PIN</label>
                <input
                  type="text"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  placeholder="Enter new 4-digit PIN"
                  className="form-input"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>
                <Save size={18} />
                <span>Update Access PIN</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
