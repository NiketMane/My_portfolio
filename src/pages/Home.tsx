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
  const { features, openResumeModal } = useFeatures();

  const handleResumeClick = () => {
    openResumeModal();
  };

  const skills = [
    { name: 'FastAPI & REST API Design', category: 'Backend Framework', level: 'Production Expert', icon: Zap, color: 'var(--accent-emerald-light)' },
    { name: 'Python & SQLAlchemy ORM', category: 'Core Language & ORM', level: 'Senior Specialist', icon: Terminal, color: 'var(--accent-indigo-light)' },
    { name: 'Oracle PL/SQL & Migration', category: 'Database Systems', level: '100+ Procedures Migrated', icon: Database, color: 'var(--accent-purple)' },
    { name: 'SQL Query & Latency Tuning', category: 'Performance Tuning', level: 'Advanced Optimization', icon: Cpu, color: 'var(--accent-rose)' },
    { name: 'Pandas & Data Processing', category: 'Data Workflows', level: '25-30% Latency Cut', icon: Layers, color: 'var(--accent-amber)' },
    { name: 'Pytest & Postman Testing', category: 'Testing & Reliability', level: '100+ Endpoints Tested', icon: CheckCircle2, color: 'var(--accent-emerald)' },
    { name: 'React.js & Frontend Development', category: 'UI Development', level: 'LMS & HRMS Experience', icon: Code2, color: 'var(--accent-cyan)' },
    { name: 'AWS Cloud Architecture', category: 'Solutions Architect (SAA-C03)', level: 'Lambda, EC2, S3, RDS, Cognito', icon: Cloud, color: 'var(--accent-amber)' },
  ];

  return (
    <div className="home-container" style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '60px' }}>
      {/* Hero Section */}
      <section className="hero-wrapper">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-content">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-pill hero-status-pill"
            >
              <span className="status-dot-pulse">
                <span className="status-dot-core" />
                <span className="status-dot-ring" />
              </span>
              <span>Available for Python Backend & Full Stack Developer Roles (with AWS)</span>
              <span className="hero-status-divider">|</span>
              <span>Bangalore, India</span>
            </motion.div>

            {/* Greeting */}
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="hero-greeting-title"
            >
              Hello, I'm
            </motion.h3>

            {/* Name Headline */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hero-name-title"
            >
              Niket Mane
            </motion.h1>

            {/* Subtitle */}
            <motion.h4
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hero-subtitle-badge"
            >
              PYTHON BACKEND & FULL STACK DEVELOPER • AWS CERTIFIED SOLUTIONS ARCHITECT
            </motion.h4>

            {/* Bio Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="hero-subtitle"
              style={{ marginTop: '12px', maxWidth: '760px' }}
            >
              Backend & Full Stack Developer with <strong style={{ color: 'var(--text-primary)' }}>3 years of experience</strong> building APIs with <strong style={{ color: 'var(--text-primary)' }}>FastAPI</strong> & <strong style={{ color: 'var(--text-primary)' }}>SQLAlchemy</strong>, migrating legacy <strong style={{ color: 'var(--text-primary)' }}>Oracle PL/SQL to Python</strong>, and deploying with <strong style={{ color: 'var(--text-primary)' }}>AWS</strong>—paired with full-stack capabilities in <strong style={{ color: 'var(--text-primary)' }}>React</strong>.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="hero-actions"
            >
              {features.workPage && (
                <NavLink to="/work" className="btn-primary hero-btn-main">
                  <span className="btn-text-desktop">View Project Showcase</span>
                  <span className="btn-text-mobile">View Projects</span>
                  <ArrowRight size={18} className="btn-icon-desktop" />
                  <ArrowRight size={14} className="btn-icon-mobile" />
                </NavLink>
              )}

              {features.aboutPage && (
                <NavLink to="/about" className="btn-secondary hero-btn-main">
                  <span className="btn-text-desktop">Experience & Background</span>
                  <span className="btn-text-mobile">Experience</span>
                </NavLink>
              )}

              <button onClick={handleResumeClick} className="btn-secondary hero-btn-main">
                <span className="btn-text-desktop">Resumes (Full Stack / Backend)</span>
                <span className="btn-text-mobile">Resumes</span>
              </button>
            </motion.div>
          </div>

          {/* Terminal Simulator IDE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ width: '100%', maxWidth: '100%' }}
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
              <span className="stat-number gradient-text">3 Years</span>
              <span className="stat-label">Backend & Full Stack Experience</span>
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
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)' }}>Technical Skillset & Stack</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Specialized in modern Python backend frameworks, database optimization, full stack development with React, and automated testing.
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
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* Featured Projects Highlight Banner */}
      {features.workPage && (
        <section className="container">
          <div className="glass-panel about-banner-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '580px' }}>
              <span className="badge-pill" style={{ width: 'fit-content' }}>
                <Code2 size={14} /> Highlighted Engineering Work
              </span>
              <h2 style={{ fontSize: 'clamp(1.35rem, 3.5vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
                Explore Backend Modernization & Cloud Architecture
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Explore production systems including legacy Oracle PL/SQL to Python migrations, AWS full-stack maintenance systems, and FastAPI microservices.
              </p>
            </div>

            <NavLink to="/work" className="btn-primary" style={{ flexShrink: 0 }}>
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
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)' }}>Let's Discuss Backend & Full Stack Engineering</h2>
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
