# Migration Guide

This guide helps you migrate from existing theme systems to `@duyluu/ui-theme`.

## 🎯 Overview

The `@duyluu/ui-theme` package provides a modern, type-safe theme system that can replace most existing theme implementations. This guide covers common migration scenarios.

## 📋 Migration Checklist

- [ ] Install `@duyluu/ui-theme` package
- [ ] Update theme imports across your codebase
- [ ] Replace theme provider setup
- [ ] Update hook usage patterns
- [ ] Migrate style creation functions
- [ ] Test theme switching functionality
- [ ] Update TypeScript types if needed
- [ ] Remove old theme dependencies

## 🚀 Quick Migration

### Step 1: Install Package

```bash
npm install @duyluu/ui-theme
# or
yarn add @duyluu/ui-theme
```

### Step 2: Update Imports

Replace your existing theme imports:

```tsx
// Before - Existing theme system
import { useTheme } from 'Components/Theme';
import { Theme } from 'Components/Theme/constants';
import { useThemeSelect } from 'Components/Theme/Hooks/useThemeSelect';

// After - New theme package
import { 
  useTheme, 
  useThemeSelect, 
  getCurrentTheme 
} from '@duyluu/ui-theme';
```

### Step 3: Update Hook Usage

Most hook APIs remain compatible:

```tsx
// Before
const theme = useThemeSelect(Theme);
const colors = theme.colors;

// After
const theme = useTheme();
const colors = useThemeColors(); // More efficient
```

### Step 4: Update Provider Setup

```tsx
// Before
import { ThemeProvider } from 'Components/Theme';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

// After
import { SystemSchemeListener } from '@duyluu/ui-theme';

function App() {
  return (
    <SystemSchemeListener>
      <YourApp />
    </SystemSchemeListener>
  );
}
```

## 🔄 Detailed Migration Scenarios

### From Custom Theme Context

If you have a custom theme context:

```tsx
// Before - Custom context
const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

// After - Use package hooks
import { useTheme } from '@duyluu/ui-theme';
// No context setup needed, works out of the box
```

### From styled-components/emotion

If you're using CSS-in-JS libraries:

```tsx
// Before - styled-components
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.medium}px;
`;

// After - Theme hooks with StyleSheet
import { useThemeStyles } from '@duyluu/ui-theme';

const MyComponent = () => {
  const styles = useThemeStyles((theme) => ({
    container: {
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
    }
  }));
  
  return <View style={styles.container} />;
};
```

### From React Native Paper

If you're migrating from React Native Paper:

```tsx
// Before - React Native Paper
import { useTheme } from 'react-native-paper';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Hello</Text>
    </View>
  );
};

// After - @duyluu/ui-theme
import { useThemeColors } from '@duyluu/ui-theme';

const MyComponent = () => {
  const colors = useThemeColors();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.mainText }}>Hello</Text>
    </View>
  );
};
```

### From NativeBase

If you're migrating from NativeBase:

```tsx
// Before - NativeBase
import { useColorModeValue } from 'native-base';

const MyComponent = () => {
  const bgColor = useColorModeValue('white', 'black');
  
  return <View style={{ backgroundColor: bgColor }} />;
};

// After - @duyluu/ui-theme
import { useThemeSelect } from '@duyluu/ui-theme';

const MyComponent = () => {
  const bgColor = useThemeSelect({
    light: 'white',
    dark: 'black'
  });
  
  return <View style={{ backgroundColor: bgColor }} />;
};
```

## 🎨 Theme Configuration Migration

### Custom Colors

Map your existing colors to the new system:

```tsx
// Before - Custom colors
const colors = {
  primary: '#007AFF',
  secondary: '#FF3B30',
  background: '#FFFFFF',
  text: '#000000',
};

// After - Theme configuration
import { createLightTheme } from '@duyluu/ui-theme';

const customTheme = createLightTheme({
  colors: {
    primary: '#007AFF',
    secondary: '#FF3B30',
    background: '#FFFFFF',
    mainText: '#000000',
  }
});
```

### Custom Typography

Migrate your typography system:

```tsx
// Before - Custom fonts
const fonts = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  bold: 'Inter-Bold',
};

// After - Theme typography
const customTheme = createLightTheme({
  fonts: {
    primary: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      bold: 'Inter-Bold',
    }
  }
});
```

### Custom Spacing

Map your spacing values:

```tsx
// Before - Custom spacing
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// After - Use existing spacing or customize
import { createLightTheme } from '@duyluu/ui-theme';

// Option 1: Use existing spacing (recommended)
const theme = useTheme();
const spacing = theme.spacing; // { xxs: 2, xs: 4, s: 8, sm: 12, m: 16, l: 24, xl: 32, xxl: 40 }

// Option 2: Create custom spacing (advanced)
// Extend the theme with custom spacing if needed
```

## 🔧 Advanced Migration

### Custom Theme Store

If you have complex theme state management:

```tsx
// Before - Custom store
const themeStore = createStore({
  mode: 'light',
  customColors: {},
  setMode: (mode) => set({ mode }),
  setCustomColors: (colors) => set({ customColors: colors }),
});

// After - Use theme service
import { createThemeService } from '@duyluu/ui-theme';

const themeService = createThemeService({
  persistKey: 'app-theme',
  storage: AsyncStorage,
});

// Set theme mode
themeService.setMode('dark');

// Set custom theme
themeService.setThemeConfig({
  colors: { primary: '#custom' }
});
```

### Theme Persistence

Migrate theme persistence logic:

```tsx
// Before - Manual persistence
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveTheme = async (theme) => {
  await AsyncStorage.setItem('theme', JSON.stringify(theme));
};

const loadTheme = async () => {
  const saved = await AsyncStorage.getItem('theme');
  return saved ? JSON.parse(saved) : defaultTheme;
};

// After - Built-in persistence
const themeService = createThemeService({
  persistKey: 'theme',
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
    removeItem: AsyncStorage.removeItem,
  }
});
```

## 🐛 Common Migration Issues

### Issue 1: Missing Color Properties

**Problem**: Theme colors don't match your existing system.

**Solution**: Create a mapping or use theme customization:

```tsx
// Map old color names to new ones
const useOldColors = () => {
  const colors = useThemeColors();
  
  return {
    primaryColor: colors.primary,
    textColor: colors.mainText,
    backgroundColor: colors.background,
    // ... map other colors
  };
};
```

### Issue 2: Different Spacing Values

**Problem**: Spacing values don't match your existing system.

**Solution**: Create a spacing adapter:

```tsx
const useOldSpacing = () => {
  const theme = useTheme();
  
  return {
    xs: theme.spacing.xs,    // 4
    sm: theme.spacing.s,     // 8  
    md: theme.spacing.sm,    // 12
    lg: theme.spacing.m,     // 16
    xl: theme.spacing.l,     // 24
  };
};
```

### Issue 3: Different Hook Signatures

**Problem**: Hook APIs are different from your existing system.

**Solution**: Create adapter hooks:

```tsx
// Adapter for different API
const useOldTheme = () => {
  const theme = useTheme();
  
  return {
    colors: theme.colors,
    spacing: theme.spacing,
    // ... adapt to old structure
  };
};
```

## ✅ Validation

After migration, verify these areas:

### 1. Theme Switching
```tsx
// Test theme mode changes
const TestComponent = () => {
  const mode = useThemeMode();
  const colors = useThemeColors();
  
  return (
    <View>
      <Text>Mode: {mode}</Text>
      <Text style={{ color: colors.mainText }}>
        Text color should change with theme
      </Text>
    </View>
  );
};
```

### 2. Style Creation
```tsx
// Test style hooks
const TestStyles = () => {
  const styles = useThemeStyles((theme) => ({
    container: {
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
    }
  }));
  
  return <View style={styles.container} />;
};
```

### 3. Theme Selection
```tsx
// Test theme-aware values
const TestSelection = () => {
  const iconColor = useThemeSelect({
    light: '#000000',
    dark: '#FFFFFF'
  });
  
  return <Icon color={iconColor} />;
};
```

## 🎉 Cleanup

After successful migration:

1. **Remove old theme dependencies**:
   ```bash
   npm uninstall old-theme-package
   ```

2. **Delete old theme files**:
   ```bash
   rm -rf src/theme/
   ```

3. **Update package.json** to remove unused dependencies

4. **Run tests** to ensure everything works

5. **Update documentation** to reflect new theme system

## 🆘 Getting Help

If you encounter issues during migration:

1. **Check the troubleshooting section** in the main README
2. **Review the TypeScript types** for correct usage
3. **Look at the examples** in the documentation
4. **Open an issue** on GitHub with migration details

## 📝 Migration Checklist Summary

- [ ] Package installed and building successfully
- [ ] All theme imports updated
- [ ] Provider setup migrated  
- [ ] Hook usage patterns updated
- [ ] Style creation functions working
- [ ] Theme switching functional
- [ ] Custom colors/fonts configured
- [ ] Persistence working (if needed)
- [ ] TypeScript types resolved
- [ ] Tests passing
- [ ] Old dependencies removed
- [ ] Documentation updated

Happy migrating! 🚀 