import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Configuration interface for responsive behavior
export interface ResponsiveConfig {
  tabletBreakpoint: number;
  scalingFactor: number;
}

// Default configuration
const defaultConfig: ResponsiveConfig = {
  tabletBreakpoint: 768,
  scalingFactor: 1.2,
};

let currentConfig = defaultConfig;

// Configure responsive behavior
export const configureResponsive = (config: Partial<ResponsiveConfig>) => {
  currentConfig = { ...defaultConfig, ...config };
};

// Check if device is tablet based on screen width
export const getIsTablet = (): boolean => {
  return screenWidth >= currentConfig.tabletBreakpoint;
};

// Responsive font size calculation
export const responsiveFontSize = (size: number): number => {
  const isTablet = getIsTablet();
  return isTablet ? Math.round(size * currentConfig.scalingFactor) : size;
};

// Line height calculation
export const calculateLineHeight = (fontSize: number): number => {
  const multiplier = fontSize >= 18 ? 1.25 : 1.5;
  return Math.round(fontSize * multiplier);
};

// Responsive spacing calculation
export const responsiveSpacing = (spacing: number): number => {
  const isTablet = getIsTablet();
  return isTablet ? Math.round(spacing * currentConfig.scalingFactor) : spacing;
};

// Get screen dimensions
export const getScreenDimensions = () => ({
  width: screenWidth,
  height: screenHeight,
  isTablet: getIsTablet(),
});

// Breakpoint utilities
export const getBreakpoint = (breakpoints: Record<string, number>): string => {
  const sortedBreakpoints = Object.entries(breakpoints).sort(
    ([, a], [, b]) => a - b
  );

  for (let i = sortedBreakpoints.length - 1; i >= 0; i--) {
    const [breakpoint, minWidth] = sortedBreakpoints[i];
    if (screenWidth >= minWidth) {
      return breakpoint;
    }
  }

  return sortedBreakpoints[0]?.[0] || 'default';
}; 