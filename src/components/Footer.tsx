import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFeatures } from '../context/FeatureContext';
import { Code2, Github, Linkedin, Mail, Heart, Shield, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { features, adminSecurity } = useFeatures();

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="brand-icon" style={{ width: '36px', height: '36px' }}>
                <Code2 size={20} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'white' }}>
                Niket Mane • Backend & Cloud
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '480px' }}>
              Python Backend Developer (~3 Years Experience) and AWS Certified Solutions Architect (SAA-C03). Specialized in FastAPI, SQLAlchemy ORM, Oracle PL/SQL migration, SQL performance tuning, and AWS cloud engineering.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '8px' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  display: 'flex',
                }}
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  display: 'flex',
                }}
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:developer.niket@gmail.com"
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  display: 'flex',
                }}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '16px', letterSpacing: '0.5px' }}>
              Site Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              {features.homePage && (
                <li>
                  <NavLink to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                    Home Page
                  </NavLink>
                </li>
              )}
              {features.aboutPage && (
                <li>
                  <NavLink to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                    About Me & Experience
                  </NavLink>
                </li>
              )}
              {features.workPage && (
                <li>
                  <NavLink to="/work" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                    Backend Projects
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                  Contact & Connect
                </NavLink>
              </li>
              {/* Only show Admin link if explicitly enabled for public view; otherwise hidden for personal usage */}
              {adminSecurity.showInPublicNav && (
                <li>
                  <NavLink to="/admin" style={{ color: '#fbbf24', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Shield size={14} />
                    Admin Settings
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Tech Stack Badges */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '16px', letterSpacing: '0.5px' }}>
              Core Technology Stack
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              <span className="badge-pill" style={{ color: 'var(--accent-emerald-light)' }}>Python 3</span>
              <span className="badge-pill" style={{ color: 'var(--accent-emerald-light)' }}>FastAPI</span>
              <span className="badge-pill" style={{ color: 'var(--accent-indigo-light)' }}>SQLAlchemy</span>
              <span className="badge-pill badge-fullstack">AWS SAA-C03</span>
              <span className="badge-pill" style={{ color: 'var(--accent-purple)' }}>Oracle PL/SQL</span>
              <span className="badge-pill" style={{ color: 'var(--accent-cyan-light)' }}>PostgreSQL</span>
              <span className="badge-pill" style={{ color: 'var(--accent-rose)' }}>Pytest</span>
              <span className="badge-pill" style={{ color: 'var(--accent-amber)' }}>Pandas</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with secret personal Admin entrance */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Niket Mane. All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <NavLink to="/admin" style={{ color: 'var(--text-dim)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }} title="Personal Admin Portal">
              <Lock size={12} />
              <span>Owner Access</span>
            </NavLink>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Crafted with</span>
              <Heart size={14} color="var(--accent-rose)" fill="var(--accent-rose)" />
              <span>using React & TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
