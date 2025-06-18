// Import types for React hooks (will work when React is available)
// import { useMemo } from 'react';
// import { useStore } from 'zustand';

import { getCurrentTheme } from '../store/ThemeStore';
import type { Theme } from '../types/theme';

/**
 * Hook to get the current theme object
 * 
 * @returns Complete theme object with colors, typography, spacing, etc.
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const theme = useTheme();
 *   
 *   return (
 *     <View style={{ backgroundColor: theme.colors.background }}>
 *       <Text style={{ color: theme.colors.mainText }}>
 *         Hello Theme!
 *       </Text>
 *     </View>
 *   );
 * };
 * ```
 */
export const useTheme = (): Theme => {
  // TODO: Implement with React hooks when dependencies are available
  // const mode = useStore(ThemeStore, (state) => state.mode);
  // const themeConfig = useStore(ThemeStore, (state) => state.themeConfig);
  // return useMemo(() => getCurrentTheme(), [mode, themeConfig]);
  
  // For now, return current theme directly
  return getCurrentTheme();
};

export default useTheme; 