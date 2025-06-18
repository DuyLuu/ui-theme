import type { Theme, ThemeMode } from '../types/theme';
import { createLightColors, createDarkColors } from './colors';
import { createTypographySystem, type FontFamilyConfig } from './typography';
import { createSpacingSystem } from './spacing';
import { createShadowSystem, createLightShadowColors, createDarkShadowColors } from './shadows';
import { createBreakpointSystem, createResponsiveLayoutSystem } from './breakpoints';

// Theme configuration interface
export interface ThemeConfig {
  fonts?: Partial<FontFamilyConfig>;
}

// Create light theme
export const createLightTheme = (config: ThemeConfig = {}): Theme => ({
  colors: createLightColors(),
  typography: createTypographySystem(config.fonts),
  spacing: createSpacingSystem(),
  shadow: createShadowSystem(),
  shadowColor: createLightShadowColors(),
  breakpoints: createBreakpointSystem(),
  responsiveLayout: createResponsiveLayoutSystem(),
});

// Create dark theme
export const createDarkTheme = (config: ThemeConfig = {}): Theme => ({
  colors: createDarkColors(),
  typography: createTypographySystem(config.fonts),
  spacing: createSpacingSystem(),
  shadow: createShadowSystem(),
  shadowColor: createDarkShadowColors(),
  breakpoints: createBreakpointSystem(),
  responsiveLayout: createResponsiveLayoutSystem(),
});

// Default theme configurations
export const DEFAULT_THEMES = {
  light: createLightTheme(),
  dark: createDarkTheme(),
} as const;

// Get theme by mode
export const getThemeByMode = (mode: ThemeMode, config?: ThemeConfig): Theme => {
  switch (mode) {
    case 'light':
      return createLightTheme(config);
    case 'dark':
      return createDarkTheme(config);
    default:
      return createLightTheme(config);
  }
};

// Merge theme with overrides
export const mergeTheme = (baseTheme: Theme, overrides: Partial<Theme>): Theme => ({
  ...baseTheme,
  ...overrides,
  colors: { ...baseTheme.colors, ...overrides.colors },
  typography: { ...baseTheme.typography, ...overrides.typography },
  spacing: { ...baseTheme.spacing, ...overrides.spacing },
  shadow: { ...baseTheme.shadow, ...overrides.shadow },
  shadowColor: { ...baseTheme.shadowColor, ...overrides.shadowColor },
  breakpoints: { ...baseTheme.breakpoints, ...overrides.breakpoints },
  responsiveLayout: { ...baseTheme.responsiveLayout, ...overrides.responsiveLayout },
}); 