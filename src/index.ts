// Types
export * from './types';

// Constants and utilities
export * from './constants';
export * from './utils';

// Store and services
export * from './store';

// Hooks and components
export * from './hooks';
export * from './components';

// Main theme API
export {
  createLightTheme,
  createDarkTheme,
  getThemeByMode,
  mergeTheme,
  DEFAULT_THEMES
} from './constants/themes';

export {
  ThemeService,
  getCurrentTheme,
  getCurrentThemeMode,
  type ThemePersistConfig
} from './store';

// Legacy compatibility (can be implemented later)
export { PALLETS } from './constants/palettes'; 