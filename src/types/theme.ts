export interface ColorPalette {
  // Base colors
  baseBlack: string;
  blackGray: string;
  blackGrayOpacity: (opacity: number) => string;
  
  light: string;
  lightOpacity: (opacity: number) => string;
  black: string;
  blackOpacity: (opacity: number) => string;
  
  // Primary colors
  lightPrimary: string;
  darkPrimary: string;
  primaryOpacity: (opacity: number) => string;
  primary: string;
  highlight: string;
  
  // Secondary colors
  region: string;
  secondary: string;
  pro: string;
  
  // Semantic colors
  dark: string;
  darkOpacity: (opacity: number) => string;
  darkGradient: string[];
  silverGradient: string[];
  
  // Gray scale
  lightGray: string;
  lighterGray: string;
  gray: string;
  grayDark: string;
  grayDarker: string;
  
  // Theme colors
  primaryGradient: string[];
  mainText: string;
  subText: string;
  background: string;
  popupBackground: string;
  breakLine: string;
  headerGradient: string[];
  loadingGradient: string[];
  
  // Status colors
  danger: string;
  success: string;
  warning: string;
  
  // Additional colors
  lightDark: string;
  skeleton: string;
  borderCover: string;
  iconButtonBackground: string;
  
  // Color variants
  proPremiumGradient: string[];
  navy: {
    navy0: string;
    navy1: string;
    navy2: string;
    navy3: string;
    navy4: string;
  };
  grey: {
    grey0: string;
    grey1: string;
    grey2: string;
  };
  white: {
    white100: string;
    white80: string;
    white60: string;
    white40: string;
    white25: string;
    white20: string;
    white15: string;
    white10: string;
    white5: string;
  };
}

export interface TypographySystem {
  fonts: {
    bold: string;
    xbold: string;
    semiBold: string;
    medium: string;
    light: string;
    capitalizeMedium: string;
    capitalizeBold: string;
  };
  textVariants: {
    header: TextVariant;
    heading1: TextVariant;
    heading2: TextVariant;
    title: TextVariant;
    'sub-title': TextVariant;
    h1: TextVariant;
    h2: TextVariant;
    h3: TextVariant;
    h4: TextVariant;
    h5: TextVariant;
    h6: TextVariant;
    h7: TextVariant;
    h8: TextVariant;
    'xxx-large': TextVariant;
    'xx-large': TextVariant;
    'x-large': TextVariant;
    large: TextVariant;
    normal: TextVariant;
    small: TextVariant;
    'x-small': TextVariant;
    'xx-small': TextVariant;
  };
}

export interface TextVariant {
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
}

export interface SpacingSystem {
  xxl: number;
  xl: number;
  l: number;
  ml: number;
  m: number;
  sm: number;
  s: number;
  xs: number;
  xxs: number;
}

export interface ShadowSystem {
  default: ShadowStyle;
  light: ShadowStyle;
  dark: ShadowStyle;
  darker: ShadowStyle;
  blackDark: ShadowStyle;
}

export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowRadius: number;
  elevation: number;
  shadowOpacity: number;
}

export interface BreakpointSystem {
  smallPhone: number;
  phone: number;
  tablet: number;
}

export interface ResponsiveLayoutSystem {
  smallPhone: number;
  phone: number;
  tablet: number;
}

export interface ShadowColorSystem {
  popupBackground: string;
}

export interface Theme {
  colors: ColorPalette;
  typography: TypographySystem;
  spacing: SpacingSystem;
  shadow: ShadowSystem;
  shadowColor: ShadowColorSystem;
  breakpoints: BreakpointSystem;
  responsiveLayout: ResponsiveLayoutSystem;
}

// Theme mode types
export const ThemeModeArray = ['light', 'dark'] as const;
export type ThemeMode = (typeof ThemeModeArray)[number];
export type ThemeModeConfig = ThemeMode | 'system';
export type ThemeSource = 'mode' | 'tabMode';

// Selection types
export type ThemeSelection<T = any> = { [key in ThemeMode]?: T };
export type ThemeSelectionFn<T> = (
  theme: Theme & { mode: ThemeMode }
) => T | ThemeSelection<T>;
export type ThemeSelectionProps<T = unknown> =
  | T
  | ThemeSelection<T>
  | ThemeSelectionFn<T>;

// Utility types
export type Color = keyof ColorPalette;
export type TextType = keyof TypographySystem['textVariants'];
export type ShadowType = keyof ShadowSystem;
export type Spacing = keyof SpacingSystem;
export type BreakPoint = keyof BreakpointSystem; 