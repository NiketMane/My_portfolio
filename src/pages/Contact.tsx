import React from 'react';
import { ContactBox } from '../components/ContactBox';
import { ContactForm } from '../components/ContactForm';
import { useFeatures } from '../context/FeatureContext';
import {
  Sparkles,
  Mail,
  Clock,
  MapPin,
  Briefcase,
  Cpu,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const { features } = useFeatures();

  return (
    <div className="container page-container" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 4vw, 48px)' }}>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '780px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span className="badge-pill">
            <Sparkles size={14} /> Contact & Connect
          </span>
          <span className="badge-pill badge-fullstack" style={{ fontSize: '0.78rem' }}>
            <ShieldCheck size={14} /> AWS SAA-C03 Certified
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 800, color: 'white', lineHeight: '1.15' }}>
          Let's Build Resilient <span className="gradient-text">Backend Systems</span> Together
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
          Whether you're looking for a <strong style={{ color: 'white' }}>Python Backend Developer</strong>, need guidance on modernizing legacy Oracle PL/SQL packages, or want to engineer cloud infrastructure on AWS, feel free to reach out directly or send a message below.
        </p>
      </motion.div>

      {/* Main Contact Grid */}
      <div className="contact-grid">
        <ContactBox />
        {features.contactForm && <ContactForm />}
      </div>

      {/* Additional Details & Availability Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="glass-panel about-banner-panel"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '20px' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-indigo-light)' }}>
            <Clock size={20} />
          </div>
          <div>
            <strong style={{ color: 'white', fontSize: '0.95rem', display: 'block', marginBottom: '4px' }}>Quick Turnaround</strong>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Direct inquiries are typically responded to within 24 hours.</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald-light)' }}>
            <Briefcase size={20} />
          </div>
          <div>
            <strong style={{ color: 'white', fontSize: '0.95rem', display: 'block', marginBottom: '4px' }}>Open for Opportunities</strong>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Full-time Python Backend & AWS Cloud engineering positions.</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            <MapPin size={20} />
          </div>
          <div>
            <strong style={{ color: 'white', fontSize: '0.95rem', display: 'block', marginBottom: '4px' }}>Location & Mobility</strong>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Bangalore, India • Open to Remote Worldwide & Hybrid.</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)' }}>
            <Cpu size={20} />
          </div>
          <div>
            <strong style={{ color: 'white', fontSize: '0.95rem', display: 'block', marginBottom: '4px' }}>Core Tech Focus</strong>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Python, FastAPI, SQLAlchemy, AWS, Oracle PL/SQL, PostgreSQL.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
