import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Theme, ThemeMode, ThemeModeConfig, ThemeSource } from '../types/theme';
import { getThemeByMode, DEFAULT_THEMES, type ThemeConfig } from '../constants/themes';
import { getSystemColorScheme } from '../utils/systemScheme';

// Store state interface
export interface ThemeStoreState {
  config: ThemeModeConfig;
  mode: ThemeMode;
  tabMode?: ThemeMode; // if this exists, it will be used to override mode
  themeConfig?: ThemeConfig; // custom theme configuration
  setThemeMode: (mode: ThemeMode) => void;
  setThemeConfig: (config: ThemeConfig) => void;
  setTabMode: (mode?: ThemeMode) => void;
}

// Persistence configuration
export interface ThemePersistConfig {
  key: string;
  storage: {
    getItem: (key: string) => Promise<string | null> | string | null;
    setItem: (key: string, value: string) => Promise<void> | void;
    removeItem: (key: string) => Promise<void> | void;
  };
}

// Default persistence (no-op)
const defaultPersist: ThemePersistConfig = {
  key: 'theme-store',
  storage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  },
};

// Theme store factory
export const createThemeStore = (persistConfig: ThemePersistConfig = defaultPersist) => {
  const store = create<ThemeStoreState>()(
    subscribeWithSelector((set, get) => ({
      config: 'light' as ThemeModeConfig,
      mode: 'light' as ThemeMode,
      tabMode: undefined,
      themeConfig: undefined,
      setThemeMode: (mode: ThemeMode) => {
        set({ mode });
        // Persist the change
        persistConfig.storage.setItem(
          persistConfig.key,
          JSON.stringify({ mode, config: get().config })
        );
      },
      setThemeConfig: (themeConfig: ThemeConfig) => {
        set({ themeConfig });
      },
      setTabMode: (tabMode?: ThemeMode) => {
        set({ tabMode });
      },
    }))
  );

  // Initialize from persistence
  const initializeFromStorage = async () => {
    try {
      const stored = await persistConfig.storage.getItem(persistConfig.key);
      if (stored) {
        const { mode, config } = JSON.parse(stored);
        let finalMode = mode || 'light';
        
        // Handle system mode
        if (config === 'system') {
          finalMode = getSystemColorScheme();
        }
        
        store.setState({ mode: finalMode, config: config || 'light' });
      }
    } catch (error) {
      console.warn('Failed to initialize theme from storage:', error);
    }
  };

  // Initialize on creation
  initializeFromStorage();

  return store;
};

// Default store instance
export const ThemeStore = createThemeStore();

// Helper functions to get current values
export const getCurrentTheme = (): Theme => {
  const state = ThemeStore.getState();
  return getThemeByMode(state.mode, state.themeConfig);
};

export const getCurrentThemeMode = (): ThemeMode => {
  return ThemeStore.getState().mode;
};

export const getTabThemeMode = (): ThemeMode => {
  const state = ThemeStore.getState();
  return state.tabMode || state.mode;
};

export const getCurrentTabTheme = (): Theme => {
  const state = ThemeStore.getState();
  const mode = state.tabMode || state.mode;
  return getThemeByMode(mode, state.themeConfig);
};

// Theme switching service
export const ThemeService = {
  switchMode: (mode: ThemeMode) => {
    ThemeStore.getState().setThemeMode(mode);
  },
  
  setSystemMode: () => {
    const systemMode = getSystemColorScheme();
    ThemeStore.setState({ config: 'system', mode: systemMode });
  },
  
  setCustomThemeConfig: (config: ThemeConfig) => {
    ThemeStore.getState().setThemeConfig(config);
  },
  
  setTabMode: (mode?: ThemeMode) => {
    ThemeStore.getState().setTabMode(mode);
  },
};

export default ThemeStore; 