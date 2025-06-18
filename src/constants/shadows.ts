import { PALLETS } from './palettes';
import type { ShadowSystem, ShadowColorSystem } from '../types/theme';

// Create shadow system
export const createShadowSystem = (): ShadowSystem => ({
  default: {
    shadowColor: PALLETS.DARK_BLUE,
    shadowOffset: {
      width: 0.5,
      height: 2,
    },
    shadowRadius: 5,
    elevation: 2,
    shadowOpacity: 0.15,
  },
  light: {
    shadowColor: PALLETS.DARK_BLUE,
    shadowOffset: {
      width: 0.25,
      height: 1,
    },
    shadowRadius: 2,
    elevation: 1,
    shadowOpacity: 0.125,
  },
  dark: {
    shadowColor: PALLETS.DARK_BLUE,
    shadowOffset: {
      width: 0.25,
      height: 2,
    },
    shadowRadius: 2,
    elevation: 4,
    shadowOpacity: 0.25,
  },
  darker: {
    shadowColor: PALLETS.DARK_BLUE,
    shadowOffset: { width: 0.5, height: 6 },
    shadowRadius: 8,
    elevation: 4,
    shadowOpacity: 0.25,
  },
  blackDark: {
    shadowColor: PALLETS.BASE_BLACK,
    shadowOffset: { width: 0.5, height: 6 },
    shadowRadius: 8,
    elevation: 9,
    shadowOpacity: 1,
  },
});

// Create shadow color system for light theme
export const createLightShadowColors = (): ShadowColorSystem => ({
  popupBackground: '#E8EAEE',
});

// Create shadow color system for dark theme
export const createDarkShadowColors = (): ShadowColorSystem => ({
  popupBackground: '#39414A',
}); 