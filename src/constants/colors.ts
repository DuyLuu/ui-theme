import { PALLETS } from './palettes';
import type { ColorPalette } from '../types/theme';

// Create light theme colors
export const createLightColors = (): ColorPalette => ({
  baseBlack: PALLETS.BASE_BLACK,
  blackGray: PALLETS.BLACK_GRAY,
  blackGrayOpacity: PALLETS.BLACK_GRAY_OPACITY,

  light: PALLETS.WHITE,
  lightOpacity: PALLETS.WHITE_OPACITY,

  black: PALLETS.BLACK,
  blackOpacity: PALLETS.BLACK_OPACITY,

  lightPrimary: PALLETS.LIGHT_ORANGE,
  darkPrimary: PALLETS.DARK_ORANGE,
  primaryOpacity: PALLETS.ORANGE_OPACITY,

  region: PALLETS.REGION,
  secondary: PALLETS.SEA_GREEN,
  proPremiumGradient: [...PALLETS.PRO_PREMIUM_GRADIENT],
  pro: PALLETS.PRO,

  dark: PALLETS.DARK_BLUE,
  darkOpacity: PALLETS.DARK_BLUE_OPACITY,
  darkGradient: [...PALLETS.GRADIENT_DARK_BLUE],
  silverGradient: [...PALLETS.GRADIENT_SILVER],

  lightGray: PALLETS.LIGHT_GRAY,
  lighterGray: PALLETS.LIGHTER_GRAY,
  gray: PALLETS.GRAY,
  grayDark: PALLETS.GRAY_DARK,
  grayDarker: PALLETS.GRAY_DARKER,

  lightDark: PALLETS.LIGHT_DARK,
  skeleton: '#E1E8EB',

  // Theme colors
  primaryGradient: [...PALLETS.GRADIENT_ORANGE],
  mainText: PALLETS.DARK_BLUE,
  subText: PALLETS.GRAY_DARK,
  background: PALLETS.LIGHT_BLUE,
  popupBackground: PALLETS.WHITE,
  breakLine: 'rgba(26, 49, 84, 0.1)',
  headerGradient: ['#779ECB', '#2B3D5F'],
  loadingGradient: ['rgba(225, 232, 235, 0.5)', 'rgba(225, 232, 235, 0.1)'],
  primary: PALLETS.ORANGE,
  highlight: '#F47D42',
  danger: 'rgba(249, 98, 98, 1)',
  success: '#FFF4E0',
  warning: PALLETS.YELLOW,
  borderCover: 'rgba(26, 49, 84, 0.1)',
  iconButtonBackground: 'rgba(255, 255, 255, 0.1)',
  navy: {
    navy0: '#1A3154',
    navy1: '#2B3E60',
    navy2: '#6B80A0',
    navy3: '#D6E4F3',
    navy4: '#EBF2FA',
  },
  grey: {
    grey0: 'rgba(110, 127, 157, 0.5)',
    grey1: '#747F9F',
    grey2: '#DDE6F1',
  },
  white: {
    white100: 'rgba(255, 255, 255, 1)',
    white80: 'rgba(255, 255, 255, 0.8)',
    white60: 'rgba(255, 255, 255, 0.6)',
    white40: 'rgba(255, 255, 255, 0.4)',
    white25: 'rgba(255, 255, 255, 0.25)',
    white20: 'rgba(255, 255, 255, 0.2)',
    white15: 'rgba(255, 255, 255, 0.15)',
    white10: 'rgba(255, 255, 255, 0.1)',
    white5: 'rgba(255, 255, 255, 0.05)',
  },
});

// Create dark theme colors (override specific colors)
export const createDarkColors = (): ColorPalette => {
  const lightColors = createLightColors();
  
  return {
    ...lightColors,
    mainText: PALLETS.WHITE,
    subText: PALLETS.LIGHTER_GRAY,
    background: PALLETS.DARK_BLACK_BLUE,
    popupBackground: '#272E35',
    breakLine: '#D2E7FF33',
    headerGradient: ['#1E252B', '#303B4D'],
    loadingGradient: ['rgba(225, 232, 235, 0.2)', 'rgba(225, 232, 235, 0.1)'],
    grayDark: 'rgba(255, 255, 255, 0.6)',
    skeleton: lightColors.white.white15,
    borderCover: '#D2E7FF33',
    iconButtonBackground: 'rgba(255, 255, 255, 0.1)',
    success: '#463F33',
  };
}; 