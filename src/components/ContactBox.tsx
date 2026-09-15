import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Copy, Check, ExternalLink, Sparkles, Phone, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactBoxProps {
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  location?: string;
}

export const ContactBox: React.FC<ContactBoxProps> = ({
  email = 'developer.niket@gmail.com',
  phone = '+91 6361939644',
  linkedinUrl = 'https://linkedin.com',
  githubUrl = 'https://github.com',
  location = 'Bangalore, India',
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('6361939644');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card contact-box-card"
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="brand-icon" style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)' }}>
            <Sparkles size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>Direct Contact Details</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Get in touch for Python Backend & AWS roles</p>
          </div>
        </div>

        <span className="badge-pill badge-fullstack" style={{ fontSize: '0.75rem' }}>
          <Award size={13} /> AWS SAA-C03 Certified
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Email Box */}
        <div className="contact-row-email">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.15)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-indigo-light)' }}>
              <Mail size={20} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>
                Email Address
              </span>
              <p style={{ fontSize: '0.92rem', fontFamily: 'var(--font-mono)', color: 'white', fontWeight: 600, userSelect: 'all' }}>
                {email}
              </p>
            </div>
          </div>
          <button
            onClick={handleCopyEmail}
            className="btn-secondary btn-sm"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            {copiedEmail ? (
              <>
                <Check size={14} color="var(--accent-emerald)" />
                <span style={{ color: 'var(--accent-emerald)' }}>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Phone Box */}
        <div className="contact-row-email">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-emerald-light)' }}>
              <Phone size={20} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>
                Phone Number
              </span>
              <p style={{ fontSize: '0.92rem', fontFamily: 'var(--font-mono)', color: 'white', fontWeight: 600 }}>
                {phone}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <a
              href={`tel:6361939644`}
              className="btn-secondary btn-sm"
              style={{ fontSize: '0.8rem', padding: '6px 12px', textDecoration: 'none' }}
            >
              Call
            </a>
            <button
              onClick={handleCopyPhone}
              className="btn-secondary btn-sm"
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              {copiedPhone ? (
                <>
                  <Check size={14} color="var(--accent-emerald)" />
                  <span style={{ color: 'var(--accent-emerald)' }}>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Links Row */}
        <div className="contact-social-grid">
          {/* LinkedIn Button */}
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-social-btn">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '8px', background: 'rgba(6, 182, 212, 0.15)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-cyan)' }}>
                <Linkedin size={20} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>LinkedIn</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white' }}>Professional Profile</span>
              </div>
            </div>
            <ExternalLink size={16} color="var(--text-muted)" />
          </a>

          {/* GitHub Button */}
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="contact-social-btn">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '8px', background: 'rgba(139, 92, 246, 0.15)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-purple)' }}>
                <Github size={20} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>GitHub</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white' }}>Source Repos</span>
              </div>
            </div>
            <ExternalLink size={16} color="var(--text-muted)" />
          </a>
        </div>

        {/* Location & Status Banner */}
        <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={16} color="var(--accent-rose)" />
            <span>{location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)' }} />
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>Available for Hire</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
