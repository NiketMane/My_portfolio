import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { FeatureProvider, useFeatures } from './context/FeatureContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { OpeningIntro } from './components/OpeningIntro';
import { TechBackground } from './components/TechBackground';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Work } from './pages/Work';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { AnimatePresence } from 'framer-motion';

// Route Guard component
const GuardedRoute: React.FC<{ isEnabled: boolean; fallbackPath?: string; children: React.ReactNode }> = ({
  isEnabled,
  fallbackPath = '/',
  children,
}) => {
  if (!isEnabled) {
    return <Navigate to={fallbackPath} replace />;
  }
  return <PageTransition>{children}</PageTransition>;
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const { features } = useFeatures();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <GuardedRoute isEnabled={features.homePage}>
              <Home />
            </GuardedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <GuardedRoute isEnabled={features.aboutPage}>
              <About />
            </GuardedRoute>
          }
        />
        <Route
          path="/work"
          element={
            <GuardedRoute isEnabled={features.workPage}>
              <Work />
            </GuardedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <GuardedRoute isEnabled={features.contactForm}>
              <Contact />
            </GuardedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <GuardedRoute isEnabled={features.adminPage}>
              <Admin />
            </GuardedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export function App() {
  return (
    <FeatureProvider>
      <OpeningIntro />
      <TechBackground />
      <Router>
        <ScrollToTop />
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </FeatureProvider>
  );
}

export default App;
