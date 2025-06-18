// import { useMemo, useRef, useEffect } from 'react';
import { getCurrentTheme, getCurrentThemeMode, ThemeStore } from '../store/ThemeStore';
import type { Theme, ThemeMode, ThemeSelectionProps, ThemeSelection } from '../types/theme';

// Internal types for theme selection
type InternalThemeSelectionType = 'function' | 'selection' | 'value' | 'undefined';

/**
 * Determine the type of theme selection input
 */
const typeOfThemeSelection = (obj: any): InternalThemeSelectionType => {
  if (typeof obj === 'undefined' || obj === null) return 'undefined';
  if (typeof obj === 'function') return 'function';
  if (typeof obj !== 'object') return 'value';
  
  const keys = Object.keys(obj);
  const themeKeys = ['light', 'dark'];
  
  if (
    keys.length <= themeKeys.length &&
    keys.every(k => themeKeys.includes(k))
  ) {
    return 'selection';
  }
  
  return 'value';
};

/**
 * Get the outcome value based on theme selection type
 */
function getOutcomeValue<T>(
  type: InternalThemeSelectionType,
  input: T,
  mode: ThemeMode,
  theme: Theme
): any {
  switch (type) {
    case 'function': {
      const result = (input as any)({ mode, ...theme });
      return typeOfThemeSelection(result) === 'selection'
        ? (result as ThemeSelection)?.[mode] ?? (result as ThemeSelection)?.light
        : result;
    }
    case 'selection':
      return (input as ThemeSelection)?.[mode] ?? (input as ThemeSelection)?.light;
    default:
      return input;
  }
}

/**
 * Theme-aware value selection hook
 * 
 * Allows selecting different values based on the current theme mode,
 * supporting objects, functions, and direct values.
 * 
 * @param input - The theme selection input (value, object, or function)
 * @returns The resolved value for the current theme mode
 * 
 * @example
 * ```tsx
 * // Object selection
 * const backgroundColor = useThemeSelect({
 *   light: '#ffffff',
 *   dark: '#000000'
 * });
 * 
 * // Function selection
 * const borderColor = useThemeSelect((theme) => ({
 *   light: theme.colors.border,
 *   dark: theme.colors.borderDark
 * }));
 * 
 * // Direct value
 * const staticColor = useThemeSelect('#ff0000');
 * ```
 */
export const useThemeSelect = <T = unknown>(
  input: ThemeSelectionProps<T>
): T => {
  // TODO: Implement with React hooks for reactivity
  // const mode = useStore(ThemeStore, (state) => state.mode);
  // const themeConfig = useStore(ThemeStore, (state) => state.themeConfig);
  // const [lastInput, setLastInput] = useState(input);
  // const [cachedResult, setCachedResult] = useState(() => {
  //   const theme = getCurrentTheme();
  //   const mode = getCurrentThemeMode();
  //   const type = typeOfThemeSelection(input);
  //   return getOutcomeValue(type, input, mode, theme);
  // });
  
  // For now, compute directly
  const theme = getCurrentTheme();
  const mode = getCurrentThemeMode();
  const type = typeOfThemeSelection(input);
  
  return getOutcomeValue(type, input, mode, theme);
};

/**
 * HOC for class components to use theme selection
 * TODO: Implement when React is available
 */
// export function withThemeSelect<P extends object>(
//   Component: React.ComponentType<P>,
//   propKey: keyof P
// ) {
//   return (props: P) => {
//     const val = useThemeSelect(props[propKey]);
//     return React.createElement(Component, { ...props, [propKey]: val });
//   };
// }

/**
 * Render prop component for theme selection
 * TODO: Implement when React is available
 */
// export function ThemeSelectConsumer<T = unknown>({
//   children,
//   value,
// }: {
//   value: ThemeSelectionProps<T>;
//   children: (value: T) => React.ReactNode;
// }) {
//   const val = useThemeSelect(value);
//   // return useMemo(() => children(val), [children, val]);
//   return children(val);
// }

export default useThemeSelect; 