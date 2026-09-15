/**
 * Website Feature Flags & Configuration
 * Includes feature toggles, secret admin settings, Resume management configuration, and Theme mode.
 */

export interface FeatureFlags {
  // Page level toggles
  homePage: boolean;
  aboutPage: boolean;
  workPage: boolean;
  adminPage: boolean;

  // Functionality & Section toggles
  contactForm: boolean;
  githubApiFeed: boolean;
  experienceTimeline: boolean;
  academicBackground: boolean;
  technicalExpertise: boolean;
  quickStats: boolean;
  fullStackBadge: boolean;
}

export interface ResumeConfig {
  mode: 'drive' | 'file';
  driveUrl: string;
  fileUrl: string;
}

export interface AdminSecurityConfig {
  pin: string;
  showInPublicNav: boolean; // Set to false by default for personal usage
}

export type ThemeMode = 'dark' | 'light';

export const DEFAULT_FEATURES: FeatureFlags = {
  homePage: true,
  aboutPage: true,
  workPage: true,
  adminPage: true,

  contactForm: true,
  githubApiFeed: true,
  experienceTimeline: true,
  academicBackground: true,
  technicalExpertise: true,
  quickStats: true,
  fullStackBadge: true,
};

export const DEFAULT_RESUME_CONFIG: ResumeConfig = {
  mode: 'drive',
  driveUrl: 'https://drive.google.com/file/d/1eVmtq5CV1kfB6ciq0I9PvwG8xB2GhKaF/view?usp=sharing',
  fileUrl: '/resume.pdf',
};

export const DEFAULT_ADMIN_SECURITY: AdminSecurityConfig = {
  pin: '1234',
  showInPublicNav: false,
};

const FEATURES_KEY = 'portfolio_feature_flags_v1';
const RESUME_KEY = 'portfolio_resume_config_v1';
const SECURITY_KEY = 'portfolio_admin_security_v1';
const THEME_KEY = 'portfolio_theme_mode_v1';

export function getFeatureFlags(): FeatureFlags {
  if (typeof window === 'undefined') return DEFAULT_FEATURES;
  try {
    const saved = localStorage.getItem(FEATURES_KEY);
    if (saved) return { ...DEFAULT_FEATURES, ...JSON.parse(saved) };
  } catch (err) {
    console.error('Failed to load feature flags:', err);
  }
  return DEFAULT_FEATURES;
}

export function saveFeatureFlags(flags: FeatureFlags): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(FEATURES_KEY, JSON.stringify(flags));
  } catch (err) {
    console.error('Failed to save feature flags:', err);
  }
}

export function getResumeConfig(): ResumeConfig {
  if (typeof window === 'undefined') return DEFAULT_RESUME_CONFIG;
  try {
    const saved = localStorage.getItem(RESUME_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.driveUrl && parsed.driveUrl.includes('1234567890')) {
        parsed.driveUrl = DEFAULT_RESUME_CONFIG.driveUrl;
        saveResumeConfig({ ...DEFAULT_RESUME_CONFIG, ...parsed });
      }
      return { ...DEFAULT_RESUME_CONFIG, ...parsed };
    }
  } catch (err) {
    console.error('Failed to load resume config:', err);
  }
  return DEFAULT_RESUME_CONFIG;
}

export function saveResumeConfig(config: ResumeConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(RESUME_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save resume config:', err);
  }
}

export function getAdminSecurityConfig(): AdminSecurityConfig {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_SECURITY;
  try {
    const saved = localStorage.getItem(SECURITY_KEY);
    if (saved) return { ...DEFAULT_ADMIN_SECURITY, ...JSON.parse(saved) };
  } catch (err) {
    console.error('Failed to load security config:', err);
  }
  return DEFAULT_ADMIN_SECURITY;
}

export function saveAdminSecurityConfig(config: AdminSecurityConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SECURITY_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save security config:', err);
  }
}

export function getSavedTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (err) {
    console.error('Failed to load theme mode:', err);
  }
  return 'dark';
}

export function saveThemeMode(theme: ThemeMode): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (err) {
    console.error('Failed to save theme mode:', err);
  }
}

export function resetFeatureFlags(): FeatureFlags {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(FEATURES_KEY);
  }
  return DEFAULT_FEATURES;
}
