// import { useMemo } from 'react';
import { getCurrentTheme, getCurrentThemeMode } from '../store/ThemeStore';
import type { Theme, ThemeMode } from '../types/theme';

// Define style types for React Native compatibility
type ViewStyle = Record<string, any>;
type TextStyle = Record<string, any>;
type ImageStyle = Record<string, any>;
type Style = ViewStyle | TextStyle | ImageStyle;

/**
 * Type for single style creation function
 */
type UseThemeStyleFunction = (theme: Theme & { mode: ThemeMode }) => Style;

/**
 * Type for multiple styles creation function
 */
type UseThemeStylesFunction<T = any> = (theme: Theme & { mode: ThemeMode }) => T;

/**
 * Mock StyleSheet for non-React Native environments
 */
const StyleSheet = {
  create: <T>(styles: T): T => styles,
  flatten: (style: any) => style,
};

/**
 * Hook to create a single themed style
 * 
 * @param styleFunction - Function that receives theme and returns a style object
 * @param deps - Dependencies array for memoization
 * @returns Flattened style object
 * 
 * @example
 * ```tsx
 * const containerStyle = useThemeStyle(
 *   (theme) => ({
 *     backgroundColor: theme.colors.background,
 *     padding: theme.spacing.md,
 *   }),
 *   []
 * );
 * ```
 */
export const useThemeStyle = (
  styleFunction: UseThemeStyleFunction,
  deps: any[] = []
): Style => {
  // TODO: Implement with React useMemo when available
  // const mode = useStore(ThemeStore, (state) => state.mode);
  // const themeConfig = useStore(ThemeStore, (state) => state.themeConfig);
  // 
  // return useMemo(
  //   () => StyleSheet.flatten(styleFunction({ ...getCurrentTheme(), mode })),
  //   [mode, themeConfig, ...deps]
  // );
  
  // For now, compute directly
  const theme = getCurrentTheme();
  const mode = getCurrentThemeMode();
  
  return StyleSheet.flatten(styleFunction({ ...theme, mode }));
};

/**
 * Hook to create multiple themed styles
 * 
 * @param stylesFunction - Function that receives theme and returns styles object
 * @param deps - Dependencies array for memoization
 * @returns StyleSheet created styles
 * 
 * @example
 * ```tsx
 * const styles = useThemeStyles(
 *   (theme) => ({
 *     container: {
 *       backgroundColor: theme.colors.background,
 *       flex: 1,
 *     },
 *     text: {
 *       color: theme.colors.mainText,
 *       fontSize: theme.typography.bodyLarge.fontSize,
 *     },
 *   }),
 *   []
 * );
 * ```
 */
export const useThemeStyles = <T = any>(
  stylesFunction: UseThemeStylesFunction<T>,
  deps: any[] = []
): T => {
  // TODO: Implement with React useMemo when available
  // const mode = useStore(ThemeStore, (state) => state.mode);
  // const themeConfig = useStore(ThemeStore, (state) => state.themeConfig);
  // 
  // return useMemo(
  //   () => StyleSheet.create(stylesFunction({ ...getCurrentTheme(), mode })),
  //   [mode, themeConfig, ...deps]
  // );
  
  // For now, compute directly
  const theme = getCurrentTheme();
  const mode = getCurrentThemeMode();
  
  return StyleSheet.create(stylesFunction({ ...theme, mode }));
};

export { StyleSheet };
export default useThemeStyles; 