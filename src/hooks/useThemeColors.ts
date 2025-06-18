import { getCurrentTheme } from '../store/ThemeStore';
import type { ColorPalette } from '../types/theme';

/**
 * Hook to access the current theme's color palette
 * 
 * @returns The complete color palette for the current theme mode
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const colors = useThemeColors();
 *   
 *   return (
 *     <View style={{ backgroundColor: colors.background }}>
 *       <Text style={{ color: colors.mainText }}>
 *         Themed Text
 *       </Text>
 *     </View>
 *   );
 * };
 * ```
 */
export const useThemeColors = (): ColorPalette => {
  const theme = getCurrentTheme();
  return theme.colors;
};

export default useThemeColors; 