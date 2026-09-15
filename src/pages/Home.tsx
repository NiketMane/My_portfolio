import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFeatures } from '../context/FeatureContext';
import { ContactBox } from '../components/ContactBox';
import { ContactForm } from '../components/ContactForm';
import { TerminalSimulator } from '../components/TerminalSimulator';
import {
  Code2,
  Sparkles,
  ArrowRight,
  Terminal,
  Cpu,
  Zap,
  Globe,
  Database,
  Layers,
  ChevronRight,
  Cloud,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const { features, resumeConfig } = useFeatures();

  const handleResumeClick = () => {
    if (resumeConfig.mode === 'drive') {
      window.open(resumeConfig.driveUrl, '_blank');
    } else {
      window.open(resumeConfig.fileUrl, '_blank');
    }
  };

  const skills = [
    { name: 'FastAPI & REST API Design', category: 'Backend Framework', level: 'Production Expert', icon: Zap, color: 'var(--accent-emerald-light)', progress: 95 },
    { name: 'Python & SQLAlchemy ORM', category: 'Core Language & ORM', level: 'Senior Specialist', icon: Terminal, color: 'var(--accent-indigo-light)', progress: 94 },
    { name: 'AWS Cloud Ecosystem', category: 'Cloud Architecture', level: 'AWS Certified SAA-C03', icon: Cloud, color: 'var(--accent-cyan-light)', progress: 90 },
    { name: 'Oracle PL/SQL & Migration', category: 'Database Systems', level: '100+ Procedures Migrated', icon: Database, color: 'var(--accent-purple)', progress: 92 },
    { name: 'SQL Query & Latency Tuning', category: 'Performance Tuning', level: 'Advanced Optimization', icon: Cpu, color: 'var(--accent-rose)', progress: 88 },
    { name: 'Pandas & Data Processing', category: 'Data Workflows', level: '25-30% Latency Cut', icon: Layers, color: 'var(--accent-amber)', progress: 86 },
    { name: 'Pytest & Postman Testing', category: 'Testing & Reliability', level: '100+ Endpoints Tested', icon: CheckCircle2, color: 'var(--accent-emerald)', progress: 90 },
    { name: 'React.js & Frontend (Secondary)', category: 'UI Development', level: 'LMS & HRMS Experience', icon: Code2, color: 'var(--accent-cyan)', progress: 80 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '60px' }}>
      {/* Hero Section */}
      <section
        className="hero-wrapper"
        style={{
          position: 'relative',
          padding: '100px 0 60px 0',
          background:
            'radial-gradient(ellipse 75% 60% at 50% 10%, rgba(99, 102, 241, 0.14), transparent 70%), linear-gradient(to bottom, rgba(6, 8, 18, 0.3), rgba(6, 8, 18, 0.75))',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-content">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-pill"
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)' }} />
              <span>Available for Python Backend & AWS Cloud Roles • Bangalore, India</span>
            </motion.div>

            {/* Greeting */}
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: '3rem',
                fontWeight: 300,
                color: '#e2e8f0',
                letterSpacing: '1px',
                margin: 0,
                fontFamily: 'var(--font-sans)',
              }}
            >
              Hello, I'm
            </motion.h3>

            {/* Name Headline */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: '5.5rem',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: '1',
                letterSpacing: '-2px',
                margin: '-8px 0 0 0',
                textShadow: '0 10px 30px rgba(0,0,0,0.8)',
              }}
            >
              Niket Mane
            </motion.h1>

            {/* Subtitle */}
            <motion.h4
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '4px',
                color: 'var(--accent-cyan-light)',
                marginTop: '4px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              PYTHON BACKEND DEVELOPER • AWS CERTIFIED SOLUTIONS ARCHITECT
            </motion.h4>

            {/* Bio Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="hero-subtitle"
              style={{ marginTop: '12px', maxWidth: '760px' }}
            >
              Backend Developer with <strong style={{ color: 'white' }}>~3 years of experience</strong> building APIs with <strong style={{ color: 'white' }}>FastAPI</strong> & <strong style={{ color: 'white' }}>SQLAlchemy</strong>, migrating legacy <strong style={{ color: 'var(--accent-cyan-light)' }}>Oracle PL/SQL to Python</strong>, and deploying on <strong style={{ color: 'white' }}>AWS</strong>—with secondary full-stack capabilities in <strong style={{ color: 'white' }}>React</strong>.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="hero-actions"
            >
              {features.workPage && (
                <NavLink to="/work" className="btn-primary" style={{ padding: '14px 28px' }}>
                  <span>View Project Showcase</span>
                  <ArrowRight size={18} />
                </NavLink>
              )}

              {features.aboutPage && (
                <NavLink to="/about" className="btn-secondary" style={{ padding: '14px 28px' }}>
                  <span>Experience & Background</span>
                </NavLink>
              )}

              <button onClick={handleResumeClick} className="btn-secondary" style={{ padding: '14px 28px' }}>
                <span>{resumeConfig.mode === 'drive' ? 'View Resume' : 'Resume PDF'}</span>
              </button>
            </motion.div>
          </div>

          {/* Terminal Simulator IDE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <TerminalSimulator />
          </motion.div>
        </div>
      </section>

      {/* Metrics Grid */}
      {features.quickStats && (
        <section className="container">
          <div className="stats-grid">
            <div className="glass-card stat-card">
              <span className="stat-number gradient-text">~3 Years</span>
              <span className="stat-label">Backend & Cloud Experience</span>
            </div>
            <div className="glass-card stat-card">
              <span className="stat-number" style={{ color: 'var(--accent-cyan)' }}>100+</span>
              <span className="stat-label">RESTful APIs Built (FastAPI)</span>
            </div>
            <div className="glass-card stat-card">
              <span className="stat-number" style={{ color: 'var(--accent-purple)' }}>100+</span>
              <span className="stat-label">PL/SQL Packages Migrated</span>
            </div>
            <div className="glass-card stat-card">
              <span className="stat-number" style={{ color: 'var(--accent-emerald)' }}>AWS SAA</span>
              <span className="stat-label">Certified Solutions Architect</span>
            </div>
          </div>
        </section>
      )}

      {/* Technical Arsenal Grid */}
      {features.technicalExpertise && (
        <section className="container" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <span className="badge-pill">
              <Cpu size={14} /> Core Competencies
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white' }}>Technical Skillset & Stack</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Specialized in modern Python backend frameworks, database optimization, cloud platforms, and automated testing.
            </p>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card skill-card"
                >
                  <div className="skill-header">
                    <div className="skill-icon-box">
                      <Icon size={22} color={skill.color} />
                    </div>
                    <span className="skill-cat-badge">{skill.category}</span>
                  </div>

                  <div>
                    <h3 className="skill-title">{skill.name}</h3>
                    <p className="skill-level">{skill.level}</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      <span>Proficiency</span>
                      <span>{skill.progress}%</span>
                    </div>
                    <div className="skill-progress-bar">
                      <div className="skill-progress-fill" style={{ width: `${skill.progress}%` }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* Featured Projects Highlight Banner */}
      {features.workPage && (
        <section className="container">
          <div className="glass-panel" style={{ padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '580px' }}>
              <span className="badge-pill" style={{ width: 'fit-content' }}>
                <Code2 size={14} /> Highlighted Engineering Work
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>
                Explore Backend Modernization & Cloud Architecture
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Explore production systems including legacy Oracle PL/SQL to Python migrations, AWS full-stack maintenance systems, and FastAPI microservices.
              </p>
            </div>

            <NavLink to="/work" className="btn-primary">
              <span>View All Projects</span>
              <ChevronRight size={20} />
            </NavLink>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="container" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <span className="badge-pill">
            <Sparkles size={14} /> Direct Inquiries
          </span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white' }}>Let's Discuss Backend & Cloud Engineering</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Available for full-time opportunities, consulting roles, or technical collaborations in Bangalore or Remote.
          </p>
        </div>

        <div className="contact-grid">
          <ContactBox />
          {features.contactForm && <ContactForm />}
        </div>
      </section>
    </div>
  );
};
