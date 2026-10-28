import React, { useEffect } from 'react';
import { useFeatures } from '../context/FeatureContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  ExternalLink,
  X,
  Layers,
  Terminal,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  FolderDown,
} from 'lucide-react';

export const ResumeModal: React.FC = () => {
  const { isResumeModalOpen, closeResumeModal, resumeConfig } = useFeatures();

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isResumeModalOpen) {
        closeResumeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isResumeModalOpen, closeResumeModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isResumeModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isResumeModalOpen]);

  if (!isResumeModalOpen) return null;

  const fullStackPdfUrl = resumeConfig.fullStackFileUrl || '/Niket_Mane_Resume_Full_Stack.pdf';
  const backendPdfUrl = resumeConfig.backendFileUrl || '/Niket_Mane_Resume_Python_Backend.pdf';

  const handleDownloadBoth = () => {
    // Trigger download for both files
    const a1 = document.createElement('a');
    a1.href = fullStackPdfUrl;
    a1.download = 'Niket_Mane_Resume_Full_Stack.pdf';
    document.body.appendChild(a1);
    a1.click();
    document.body.removeChild(a1);

    setTimeout(() => {
      const a2 = document.createElement('a');
      a2.href = backendPdfUrl;
      a2.download = 'Niket_Mane_Resume_Python_Backend.pdf';
      document.body.appendChild(a2);
      a2.click();
      document.body.removeChild(a2);
    }, 400);
  };

  return (
    <AnimatePresence>
      <div
        className="resume-modal-overlay"
        onClick={closeResumeModal}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(3, 7, 18, 0.78)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(16px, 4vw, 32px)',
          overflowY: 'auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="resume-modal-card glass-panel"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '860px',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(99, 102, 241, 0.2)',
            padding: 'clamp(24px, 4vw, 36px)',
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
          }}
        >
          {/* Close button */}
          <button
            onClick={closeResumeModal}
            className="resume-modal-close-btn"
            aria-label="Close resume dialog"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <X size={20} />
          </button>

          {/* Modal Header */}
          <div style={{ marginBottom: '28px', paddingRight: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge-pill" style={{ color: 'var(--accent-cyan-light)', borderColor: 'rgba(6, 182, 212, 0.35)' }}>
                <Sparkles size={13} /> Updated October 2026
              </span>
              <span className="badge-pill badge-fullstack">
                <ShieldCheck size={13} /> AWS SAA-C03 Certified
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2rem)', fontWeight: 800, margin: '6px 0 8px', letterSpacing: '-0.5px' }}>
              Select Resume Version
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.5', margin: 0 }}>
              Niket Mane is specialized across both full-stack engineering and dedicated backend systems. Choose the profile that best matches your opportunity:
            </p>
          </div>

          {/* Dual Profile Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '20px',
              marginBottom: '26px',
            }}
          >
            {/* CARD 1: Full Stack Developer */}
            <div
              className="glass-card resume-option-card"
              style={{
                padding: '24px',
                borderRadius: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '18px',
                border: '1px solid rgba(99, 102, 241, 0.35)',
                background: 'rgba(99, 102, 241, 0.06)',
                position: 'relative',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: 'rgba(99, 102, 241, 0.2)',
                      color: 'var(--accent-indigo-light)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                    }}
                  >
                    <Layers size={13} /> Full Stack Profile
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>PDF • 185 KB</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  Full Stack Developer
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--accent-cyan-light)', fontWeight: 600, marginBottom: '14px' }}>
                  React.js • Python • FastAPI • SQL • AWS
                </p>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '14px' }}>
                  3 years building applications across React.js frontends and FastAPI backends. Role-based LMS/HRMS modules, 100+ REST APIs, and end-to-end AWS cloud architecture.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                  {['React.js', 'FastAPI', 'Python', 'Tailwind', 'SQLAlchemy', 'AWS SAA-C03'].map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: '0.72rem',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href={fullStackPdfUrl}
                  download="Niket_Mane_Resume_Full_Stack.pdf"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px 18px', fontSize: '0.92rem' }}
                >
                  <Download size={16} />
                  <span>Download Full Stack Resume</span>
                </a>
                <a
                  href={fullStackPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', padding: '10px 18px', fontSize: '0.88rem' }}
                >
                  <ExternalLink size={15} />
                  <span>Preview in New Tab</span>
                </a>
              </div>
            </div>

            {/* CARD 2: Python Backend Developer */}
            <div
              className="glass-card resume-option-card"
              style={{
                padding: '24px',
                borderRadius: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '18px',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                background: 'rgba(16, 185, 129, 0.06)',
                position: 'relative',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: 'var(--accent-emerald-light)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                    }}
                  >
                    <Terminal size={13} /> Backend Specialist
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>PDF • 185 KB</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  Python Backend Developer
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--accent-emerald-light)', fontWeight: 600, marginBottom: '14px' }}>
                  FastAPI • SQLAlchemy • Oracle PL/SQL • AWS
                </p>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '14px' }}>
                  Specialized in REST APIs, migrating 100+ Oracle PL/SQL packages into FastAPI & SQLAlchemy (30% speedup), and SQL/Pandas dataset latency tuning.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                  {['Python 3', 'FastAPI', 'SQLAlchemy', 'PL/SQL', 'Pandas', 'AWS Lambda'].map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: '0.72rem',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href={backendPdfUrl}
                  download="Niket_Mane_Resume_Python_Backend.pdf"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '12px 18px',
                    fontSize: '0.92rem',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderColor: '#10b981',
                  }}
                >
                  <Download size={16} />
                  <span>Download Backend Resume</span>
                </a>
                <a
                  href={backendPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', padding: '10px 18px', fontSize: '0.88rem' }}
                >
                  <ExternalLink size={15} />
                  <span>Preview in New Tab</span>
                </a>
              </div>
            </div>
          </div>

          {/* Modal Footer Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              paddingTop: '18px',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
              <CheckCircle2 size={16} color="var(--accent-emerald-light)" />
              <span>Both resumes certified and verified by Niket Mane</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={handleDownloadBoth}
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.84rem', gap: '8px' }}
                title="Download both Full Stack & Backend resumes"
              >
                <FolderDown size={15} />
                <span>Download Both (PDFs)</span>
              </button>

              {resumeConfig.driveUrl && (
                <a
                  href={resumeConfig.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.82rem',
                    color: 'var(--accent-cyan-light)',
                    textDecoration: 'none',
                    padding: '6px 10px',
                  }}
                >
                  <ExternalLink size={13} />
                  <span>Google Drive Link</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
