import { Appearance } from 'react-native';
import type { ThemeMode } from '../types/theme';

// Check if the system scheme is valid
export const isValidSystemScheme = (scheme: any): scheme is ThemeMode => {
  return scheme && ['light', 'dark'].includes(scheme);
};

// Get the current system color scheme
export const getSystemColorScheme = (): ThemeMode => {
  const systemScheme = Appearance.getColorScheme();
  return isValidSystemScheme(systemScheme) ? systemScheme : 'light';
};

// Listen to system scheme changes
export const addSystemSchemeListener = (
  callback: (scheme: ThemeMode) => void
): (() => void) => {
  const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    if (isValidSystemScheme(colorScheme)) {
      callback(colorScheme);
    }
  });

  return () => {
    subscription?.remove?.();
  };
}; 