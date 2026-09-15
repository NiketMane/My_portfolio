import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useFeatures } from '../context/FeatureContext';
import { Shield, Menu, X, Code2, Sparkles, FileText, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { features, adminSecurity, resumeConfig, theme, toggleTheme } = useFeatures();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (resumeConfig.mode === 'drive') {
      window.open(resumeConfig.driveUrl, '_blank');
    } else {
      window.open(resumeConfig.fileUrl, '_blank');
    }
  };

  const navLinks = [
    { name: 'HOME', path: '/', enabled: features.homePage },
    { name: 'PORTFOLIO', path: '/work', enabled: features.workPage },
    { name: 'RESUME', path: '#resume', isAction: true, action: handleResumeClick, enabled: true },
    { name: 'ABOUT', path: '/about', enabled: features.aboutPage },
    { name: 'CONTACT', path: '/contact', enabled: true },
    { name: 'ADMIN', path: '/admin', enabled: features.adminPage && adminSecurity.showInPublicNav, isAdmin: true },
  ].filter((link) => link.enabled);

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <NavLink to="/" className="nav-brand">
          <div className="brand-icon">
            <Code2 size={24} />
          </div>
          <div className="brand-info">
            <div className="brand-name-row">
              <span className="brand-title">Niket Mane</span>
              {features.fullStackBadge && (
                <span className="badge-pill badge-fullstack" title="AWS SAA-C03 Certified">
                  <Sparkles size={12} /> AWS Certified
                </span>
              )}
            </div>
            <span className="brand-subtitle">Python Backend & Cloud Developer</span>
          </div>
        </NavLink>

        {/* Desktop Navigation Bar */}
        <nav className="nav-menu-desktop" style={{ gap: '12px', padding: '6px 16px' }}>
          {navLinks.map((link) => {
            if (link.isAction) {
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={link.action}
                  className="nav-link-item"
                  style={{ letterSpacing: '1px', fontSize: '0.82rem' }}
                >
                  <FileText size={14} />
                  <span>{link.name}</span>
                </a>
              );
            }
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? 'active' : ''} ${link.isAdmin ? 'nav-link-admin' : ''}`
                }
                style={{ letterSpacing: '1px', fontSize: '0.82rem' }}
              >
                {link.isAdmin && <Shield size={14} />}
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle & Get In Touch CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Dark / Light Theme Toggle Switch */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme Mode"
          >
            {theme === 'dark' ? (
              <Sun size={20} color="#f59e0b" />
            ) : (
              <Moon size={20} color="#6366f1" />
            )}
          </button>

          <NavLink to="/contact" className="btn-primary btn-sm" style={{ letterSpacing: '0.5px' }}>
            <span>Get In Touch</span>
          </NavLink>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle-btn"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-drawer open"
          >
            <div className="mobile-drawer-links">
              {navLinks.map((link) => {
                if (link.isAction) {
                  return (
                    <a
                      key={link.name}
                      href={link.path}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        link.action(e);
                      }}
                      className="nav-link-item"
                      style={{ width: '100%', justifyContent: 'flex-start', padding: '12px 16px', letterSpacing: '1px' }}
                    >
                      <FileText size={16} />
                      <span>{link.name}</span>
                    </a>
                  );
                }
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `nav-link-item ${isActive ? 'active' : ''} ${link.isAdmin ? 'nav-link-admin' : ''}`
                    }
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '12px 16px', letterSpacing: '1px' }}
                  >
                    {link.isAdmin && <Shield size={18} />}
                    <span>{link.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
