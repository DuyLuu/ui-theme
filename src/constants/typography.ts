import { responsiveFontSize, calculateLineHeight } from '../utils/responsive';

// Default font family configuration
export const DEFAULT_FONT_FAMILIES = {
  XBOLD: 'SVN-GilroyXBold',
  BOLD: 'SVN-GilroyBold',
  SEMI_BOLD: 'SVN-GilroySemiBold',
  MEDIUM: 'SVN-GilroyMedium',
  LIGHT: 'SVN-GilroyLight',
  CAPITALIZE_MEDIUM: 'Bebas Neue Pro Regular',
  CAPITALIZE_BOLD: 'Bebas Neue Pro Bold',
} as const;

// Font family configuration type
export type FontFamilyConfig = typeof DEFAULT_FONT_FAMILIES;

// Create font configuration with optional overrides
export const createFontConfig = (
  fontOverrides: Partial<FontFamilyConfig> = {}
): FontFamilyConfig => ({
  ...DEFAULT_FONT_FAMILIES,
  ...fontOverrides,
});

// Create text variants with given font configuration
export const createTextVariants = (fonts: FontFamilyConfig) => ({
  header: {
    fontSize: responsiveFontSize(36),
    lineHeight: calculateLineHeight(36),
    fontFamily: fonts.BOLD,
  },
  heading1: {
    fontSize: responsiveFontSize(32),
    lineHeight: calculateLineHeight(32),
    fontFamily: fonts.BOLD,
  },
  heading2: {
    fontSize: responsiveFontSize(30),
    lineHeight: calculateLineHeight(30),
    fontFamily: fonts.BOLD,
  },
  title: {
    fontSize: responsiveFontSize(28),
    lineHeight: calculateLineHeight(28),
    fontFamily: fonts.BOLD,
  },
  'sub-title': {
    fontSize: responsiveFontSize(26),
    lineHeight: calculateLineHeight(26),
    fontFamily: fonts.BOLD,
  },
  h1: {
    fontSize: responsiveFontSize(24),
    lineHeight: calculateLineHeight(24),
    fontFamily: fonts.BOLD,
  },
  h2: {
    fontSize: responsiveFontSize(20),
    lineHeight: calculateLineHeight(20),
    fontFamily: fonts.BOLD,
  },
  h3: {
    fontSize: responsiveFontSize(18),
    lineHeight: calculateLineHeight(20),
    fontFamily: fonts.BOLD,
  },
  h4: {
    fontSize: responsiveFontSize(16),
    lineHeight: calculateLineHeight(16),
    fontFamily: fonts.BOLD,
  },
  h5: {
    fontSize: responsiveFontSize(14),
    lineHeight: calculateLineHeight(14),
    fontFamily: fonts.BOLD,
  },
  h6: {
    fontSize: responsiveFontSize(12),
    lineHeight: calculateLineHeight(12),
    fontFamily: fonts.BOLD,
  },
  h7: {
    fontSize: responsiveFontSize(10),
    lineHeight: calculateLineHeight(10),
    fontFamily: fonts.BOLD,
  },
  h8: {
    fontSize: responsiveFontSize(8),
    lineHeight: calculateLineHeight(8),
    fontFamily: fonts.BOLD,
  },
  'xxx-large': {
    fontSize: responsiveFontSize(36),
    lineHeight: calculateLineHeight(36),
    fontFamily: fonts.MEDIUM,
  },
  'xx-large': {
    fontSize: responsiveFontSize(24),
    lineHeight: calculateLineHeight(24),
    fontFamily: fonts.MEDIUM,
  },
  'x-large': {
    fontSize: responsiveFontSize(18),
    lineHeight: calculateLineHeight(20),
    fontFamily: fonts.MEDIUM,
  },
  large: {
    fontSize: responsiveFontSize(16),
    lineHeight: calculateLineHeight(16),
    fontFamily: fonts.MEDIUM,
  },
  normal: {
    fontSize: responsiveFontSize(14),
    lineHeight: calculateLineHeight(14),
    fontFamily: fonts.MEDIUM,
  },
  small: {
    fontSize: responsiveFontSize(12),
    lineHeight: calculateLineHeight(12),
    fontFamily: fonts.MEDIUM,
  },
  'x-small': {
    fontSize: responsiveFontSize(10),
    lineHeight: calculateLineHeight(10),
    fontFamily: fonts.MEDIUM,
  },
  'xx-small': {
    fontSize: responsiveFontSize(8),
    lineHeight: calculateLineHeight(8),
    fontFamily: fonts.MEDIUM,
  },
});

// Default typography system
export const createTypographySystem = (fontConfig?: Partial<FontFamilyConfig>) => {
  const fonts = createFontConfig(fontConfig);
  
  return {
    fonts: {
      bold: fonts.BOLD,
      xbold: fonts.XBOLD,
      semiBold: fonts.SEMI_BOLD,
      medium: fonts.MEDIUM,
      light: fonts.LIGHT,
      capitalizeMedium: fonts.CAPITALIZE_MEDIUM,
      capitalizeBold: fonts.CAPITALIZE_BOLD,
    },
    textVariants: createTextVariants(fonts),
  };
}; 