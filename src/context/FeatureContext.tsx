import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FeatureFlags,
  DEFAULT_FEATURES,
  getFeatureFlags,
  saveFeatureFlags,
  resetFeatureFlags,
  ResumeConfig,
  DEFAULT_RESUME_CONFIG,
  getResumeConfig,
  saveResumeConfig,
  AdminSecurityConfig,
  DEFAULT_ADMIN_SECURITY,
  getAdminSecurityConfig,
  saveAdminSecurityConfig,
  ThemeMode,
  getSavedTheme,
  saveThemeMode,
} from '../config/features';

interface FeatureContextType {
  features: FeatureFlags;
  toggleFeature: (key: keyof FeatureFlags) => void;
  setAllFeatures: (newFlags: FeatureFlags) => void;
  resetAllFeatures: () => void;

  resumeConfig: ResumeConfig;
  updateResumeConfig: (config: Partial<ResumeConfig>) => void;

  adminSecurity: AdminSecurityConfig;
  updateAdminSecurity: (config: Partial<AdminSecurityConfig>) => void;
  isUnlocked: boolean;
  unlockAdmin: (pinInput: string) => boolean;
  lockAdmin: () => void;

  theme: ThemeMode;
  toggleTheme: () => void;
}

const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

export const FeatureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [features, setFeatures] = useState<FeatureFlags>(DEFAULT_FEATURES);
  const [resumeConfig, setResumeConfig] = useState<ResumeConfig>(DEFAULT_RESUME_CONFIG);
  const [adminSecurity, setAdminSecurity] = useState<AdminSecurityConfig>(DEFAULT_ADMIN_SECURITY);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    setFeatures(getFeatureFlags());
    setResumeConfig(getResumeConfig());
    setAdminSecurity(getAdminSecurityConfig());
    const initialTheme = getSavedTheme();
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleFeature = (key: keyof FeatureFlags) => {
    setFeatures((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      saveFeatureFlags(updated);
      return updated;
    });
  };

  const setAllFeatures = (newFlags: FeatureFlags) => {
    setFeatures(newFlags);
    saveFeatureFlags(newFlags);
  };

  const resetAllFeatures = () => {
    const defaults = resetFeatureFlags();
    setFeatures(defaults);
  };

  const updateResumeConfig = (configUpdate: Partial<ResumeConfig>) => {
    setResumeConfig((prev) => {
      const updated = { ...prev, ...configUpdate };
      saveResumeConfig(updated);
      return updated;
    });
  };

  const updateAdminSecurity = (securityUpdate: Partial<AdminSecurityConfig>) => {
    setAdminSecurity((prev) => {
      const updated = { ...prev, ...securityUpdate };
      saveAdminSecurityConfig(updated);
      return updated;
    });
  };

  const unlockAdmin = (pinInput: string): boolean => {
    if (pinInput === adminSecurity.pin) {
      setIsUnlocked(true);
      return true;
    }
    return false;
  };

  const lockAdmin = () => {
    setIsUnlocked(false);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const nextTheme: ThemeMode = prevTheme === 'dark' ? 'light' : 'dark';
      saveThemeMode(nextTheme);
      document.documentElement.setAttribute('data-theme', nextTheme);
      return nextTheme;
    });
  };

  return (
    <FeatureContext.Provider
      value={{
        features,
        toggleFeature,
        setAllFeatures,
        resetAllFeatures,
        resumeConfig,
        updateResumeConfig,
        adminSecurity,
        updateAdminSecurity,
        isUnlocked,
        unlockAdmin,
        lockAdmin,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeatures = (): FeatureContextType => {
  const context = useContext(FeatureContext);
  if (!context) {
    throw new Error('useFeatures must be used within a FeatureProvider');
  }
  return context;
};
