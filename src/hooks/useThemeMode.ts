import { getCurrentThemeMode } from '../store/ThemeStore';
import type { ThemeMode } from '../types/theme';

/**
 * Hook to get the current theme mode
 * 
 * @returns Current theme mode ('light', 'dark', or 'system')
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const mode = useThemeMode();
 *   
 *   return (
 *     <Text>Current theme mode: {mode}</Text>
 *   );
 * };
 * ```
 */
export const useThemeMode = (): ThemeMode => {
  // TODO: Implement with Zustand subscription when available
  // const mode = useStore(ThemeStore, (state) => state.mode);
  // return mode;
  
  // For now, return current mode directly
  return getCurrentThemeMode();
};

export default useThemeMode; 