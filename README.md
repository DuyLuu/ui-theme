# @duyluu/ui-theme

A comprehensive, type-safe theme system for React Native applications. Extracted from the Fonos mobile app for reusability across multiple projects.

## 🚀 Features

- **🎨 Complete Theme System** - Colors, typography, spacing, shadows, and breakpoints
- **🌓 Dark/Light Mode** - Automatic system theme detection with manual override
- **⚡ React Hooks** - Modern hook-based API for theme access
- **📱 React Native Ready** - Optimized for mobile development
- **🔒 Type Safe** - Full TypeScript support with comprehensive types
- **🌳 Tree Shakeable** - Import only what you need
- **⚙️ Configurable** - Customize themes to match your brand
- **🔄 Zero Dependencies** - Works standalone or with React

## 📦 Installation

```bash
npm install @duyluu/ui-theme
# or
yarn add @duyluu/ui-theme
```

## 🎯 Quick Start

### Basic Usage

```tsx
import { useTheme, useThemeColors, useThemeSelect } from '@duyluu/ui-theme';

const MyComponent = () => {
  const theme = useTheme();
  const colors = useThemeColors();
  
  // Theme-aware value selection
  const backgroundColor = useThemeSelect({
    light: colors.background,
    dark: colors.surface
  });
  
  return (
    <View style={{ backgroundColor, padding: theme.spacing.md }}>
      <Text style={{ color: colors.mainText }}>
        Hello Theme!
      </Text>
    </View>
  );
};
```

### Style Creation

```tsx
import { useThemeStyles } from '@duyluu/ui-theme';

const MyComponent = () => {
  const styles = useThemeStyles((theme) => ({
    container: {
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
      borderRadius: theme.spacing.sm,
    },
    title: {
      color: theme.colors.mainText,
      fontSize: theme.typography.headingMedium.fontSize,
      fontFamily: theme.typography.fonts.primary.bold,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.spacing.sm,
    }
  }));
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TouchableOpacity style={styles.button}>
        <Text>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## 📚 API Reference

### Hooks

#### `useTheme(): Theme`
Returns the complete theme object with all systems.

```tsx
const theme = useTheme();
console.log(theme.colors.primary);     // '#F47D42'
console.log(theme.spacing.lg);         // 16
console.log(theme.typography.fonts);   // Font families
```

#### `useThemeColors(): ColorPalette`
Returns the current theme's color palette.

```tsx
const colors = useThemeColors();
return <View style={{ backgroundColor: colors.background }} />;
```

#### `useThemeMode(): ThemeMode`
Returns the current theme mode ('light', 'dark', or 'system').

```tsx
const mode = useThemeMode();
return <Text>Current mode: {mode}</Text>;
```

#### `useThemeSelect<T>(input: ThemeSelectionProps<T>): T`
Smart theme-aware value selection supporting multiple input types.

```tsx
// Object selection
const textColor = useThemeSelect({
  light: '#000000',
  dark: '#FFFFFF'
});

// Function selection  
const borderColor = useThemeSelect((theme) => ({
  light: theme.colors.border,
  dark: theme.colors.borderDark
}));

// Direct value
const staticColor = useThemeSelect('#FF0000');
```

#### `useThemeStyles<T>(styleFunction: (theme: Theme) => T): T`
Creates theme-aware styles with automatic updates on theme changes.

```tsx
const styles = useThemeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  }
}));
```

#### `useThemeStyle(styleFunction: (theme: Theme) => Style): Style`
Creates a single theme-aware style object.

```tsx
const containerStyle = useThemeStyle((theme) => ({
  backgroundColor: theme.colors.surface,
  borderColor: theme.colors.border,
}));
```

### Theme Creation

#### `createLightTheme(config?: Partial<ThemeConfig>): Theme`
Creates a light theme with optional customizations.

```tsx
const customLightTheme = createLightTheme({
  colors: {
    primary: '#YOUR_BRAND_COLOR',
  },
  fonts: {
    primary: {
      regular: 'CustomFont-Regular',
      bold: 'CustomFont-Bold',
    }
  }
});
```

#### `createDarkTheme(config?: Partial<ThemeConfig>): Theme`
Creates a dark theme with optional customizations.

#### `getThemeByMode(mode: ThemeMode): Theme`
Get a theme by mode ('light' or 'dark').

#### `mergeTheme(base: Theme, override: Partial<Theme>): Theme`
Merge theme configurations for customization.

### Store Management

#### `createThemeService(config: ThemePersistConfig): ThemeService`
Create a theme service with persistence.

```tsx
const themeService = createThemeService({
  persistKey: 'app-theme',
  storage: AsyncStorage, // or your storage implementation
});

// Set theme mode
themeService.setMode('dark');

// Set custom theme
themeService.setThemeConfig({
  colors: { primary: '#custom' }
});
```

#### `getCurrentTheme(): Theme`
Get the current active theme.

#### `getCurrentThemeMode(): ThemeMode`
Get the current theme mode.

## 🎨 Theme Structure

### Colors
```typescript
interface ColorPalette {
  // Primary colors
  primary: string;           // '#F47D42'
  secondary: string;         // '#00f3c5'
  background: string;        // '#F3F8FC' | '#1A1C20'
  surface: string;
  
  // Text colors
  mainText: string;          // '#1a3154' | '#FFFFFF'
  subText: string;           // '#6B80A0' | '#A8B5C7'
  
  // Semantic colors
  success: string;
  warning: string;
  danger: string;
  
  // Opacity functions
  primaryOpacity: (opacity: number) => string;
  // ... more colors and utilities
}
```

### Typography
```typescript
interface TypographySystem {
  fonts: {
    primary: {
      regular: string;       // 'System'
      medium: string;        // 'System'
      bold: string;          // 'System'
    };
  };
  
  // Text variants
  displayLarge: TextVariant;     // 57px
  displayMedium: TextVariant;    // 45px
  headingLarge: TextVariant;     // 32px
  headingMedium: TextVariant;    // 28px
  headingSmall: TextVariant;     // 24px
  titleLarge: TextVariant;       // 22px
  titleMedium: TextVariant;      // 16px
  titleSmall: TextVariant;       // 14px
  labelLarge: TextVariant;       // 14px
  labelMedium: TextVariant;      // 12px
  labelSmall: TextVariant;       // 11px
  bodyLarge: TextVariant;        // 16px
  bodyMedium: TextVariant;       // 14px
  bodySmall: TextVariant;        // 12px
  caption: TextVariant;          // 12px
  overline: TextVariant;         // 10px
}
```

### Spacing
```typescript
interface SpacingSystem {
  xxs: 2;    // 2px
  xs: 4;     // 4px  
  s: 8;      // 8px
  sm: 12;    // 12px
  m: 16;     // 16px
  l: 24;     // 24px
  xl: 32;    // 32px
  xxl: 40;   // 40px
}
```

### Shadows
```typescript
interface ShadowSystem {
  default: ShadowStyle;
  light: ShadowStyle;
  dark: ShadowStyle;
  darker: ShadowStyle;
  blackDark: ShadowStyle;
}
```

## 🔧 Configuration

### Custom Theme Creation

```tsx
import { createLightTheme, createDarkTheme } from '@duyluu/ui-theme';

// Custom light theme
const myLightTheme = createLightTheme({
  colors: {
    primary: '#6366F1',      // Indigo
    secondary: '#EC4899',    // Pink
  },
  fonts: {
    primary: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium', 
      bold: 'Inter-Bold',
    }
  }
});

// Custom dark theme
const myDarkTheme = createDarkTheme({
  colors: {
    primary: '#818CF8',      // Light indigo
    background: '#111827',   // Custom dark background
  }
});
```

### Theme Service Setup

```tsx
import { createThemeService } from '@duyluu/ui-theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const themeService = createThemeService({
  persistKey: 'my-app-theme',
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
    removeItem: AsyncStorage.removeItem,
  }
});

// Initialize theme
themeService.setMode('system'); // or 'light' | 'dark'
```

## 🚀 Migration Guide

### From Existing Theme System

If you're migrating from an existing theme system:

#### 1. Replace Theme Imports

```tsx
// Before
import { useTheme } from 'Components/Theme';
import { Theme } from 'Components/Theme/constants';

// After  
import { useTheme, getCurrentTheme } from '@duyluu/ui-theme';
```

#### 2. Update Hook Usage

```tsx
// Before
const theme = useThemeSelect(Theme);

// After
const theme = useTheme();
```

#### 3. Update Style Creation

```tsx
// Before
const styles = useThemeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
  }
}));

// After - Same API!
const styles = useThemeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
  }
}));
```

#### 4. Theme Provider Setup

```tsx
// Before
import { ThemeProvider } from 'Components/Theme';

// After
import { SystemSchemeListener } from '@duyluu/ui-theme';

// Wrap your app
<SystemSchemeListener>
  <App />
</SystemSchemeListener>
```

## 💡 Best Practices

### 1. Use Semantic Colors
```tsx
// ✅ Good - semantic meaning
backgroundColor: colors.surface
textColor: colors.mainText

// ❌ Avoid - specific values
backgroundColor: '#FFFFFF'
textColor: colors.navy.navy0
```

### 2. Leverage Theme Selection
```tsx
// ✅ Good - theme-aware
const iconColor = useThemeSelect({
  light: colors.mainText,
  dark: colors.surface
});

// ❌ Avoid - manual checks
const iconColor = mode === 'dark' ? '#FFF' : '#000';
```

### 3. Use Spacing System
```tsx
// ✅ Good - consistent spacing
paddingHorizontal: theme.spacing.lg,
marginVertical: theme.spacing.md,

// ❌ Avoid - magic numbers
paddingHorizontal: 24,
marginVertical: 16,
```

### 4. Optimize Re-renders
```tsx
// ✅ Good - specific data access
const colors = useThemeColors();

// ❌ Less optimal - full theme object
const theme = useTheme();
const colors = theme.colors;
```

## 🐛 Troubleshooting

### TypeScript Errors

If you encounter TypeScript errors:

1. **Ensure proper imports**:
   ```tsx
   import type { Theme, ColorPalette } from '@duyluu/ui-theme';
   ```

2. **Check theme selection types**:
   ```tsx
   const value = useThemeSelect<string>({
     light: '#000',
     dark: '#FFF'
   });
   ```

### React Native Compatibility

For React Native projects:

1. **Install peer dependencies** if needed
2. **Configure fonts** in your theme configuration
3. **Use React Native StyleSheet** for better performance

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📞 Support

- 📧 Email: duyluu.bui@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/DuyLuu/ui-theme/issues)
