# Usage Examples

This document provides comprehensive examples of how to use `@duyluu/ui-theme` in different scenarios.

## 🚀 Basic Usage

### Simple Component with Theme

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme, useThemeColors } from '@duyluu/ui-theme';

const WelcomeCard = () => {
  const theme = useTheme();
  const colors = useThemeColors();
  
  return (
    <View style={{
      backgroundColor: colors.surface,
      padding: theme.spacing.lg,
      borderRadius: theme.spacing.sm,
      margin: theme.spacing.md,
    }}>
      <Text style={{
        color: colors.mainText,
        fontSize: theme.typography.headingMedium.fontSize,
        fontFamily: theme.typography.fonts.primary.bold,
        marginBottom: theme.spacing.sm,
      }}>
        Welcome!
      </Text>
      <Text style={{
        color: colors.subText,
        fontSize: theme.typography.bodyMedium.fontSize,
        lineHeight: theme.typography.bodyMedium.lineHeight,
      }}>
        This card adapts to your theme preferences automatically.
      </Text>
    </View>
  );
};
```

### Theme-Aware Button Component

```tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useThemeStyles, useThemeSelect } from '@duyluu/ui-theme';

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary',
  size = 'medium' 
}) => {
  const styles = useThemeStyles((theme) => ({
    button: {
      borderRadius: theme.spacing.sm,
      paddingHorizontal: size === 'small' ? theme.spacing.md : 
                        size === 'large' ? theme.spacing.xl : theme.spacing.lg,
      paddingVertical: size === 'small' ? theme.spacing.xs :
                      size === 'large' ? theme.spacing.md : theme.spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    text: {
      fontSize: size === 'small' ? theme.typography.labelMedium.fontSize :
               size === 'large' ? theme.typography.titleMedium.fontSize : theme.typography.labelLarge.fontSize,
      fontFamily: theme.typography.fonts.primary.medium,
    },
    primaryText: {
      color: theme.colors.light,
    },
    secondaryText: {
      color: theme.colors.light,
    },
    outlineText: {
      color: theme.colors.primary,
    },
  }));
  
  return (
    <TouchableOpacity 
      style={[styles.button, styles[variant]]}
      onPress={onPress}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
```

## 🎨 Advanced Theme Selection

### Conditional Styling with useThemeSelect

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useThemeSelect, useThemeColors } from '@duyluu/ui-theme';

const StatusCard = ({ status }: { status: 'online' | 'offline' | 'away' }) => {
  const colors = useThemeColors();
  
  // Theme-aware status colors
  const statusColor = useThemeSelect({
    light: {
      online: '#10B981',
      offline: '#EF4444', 
      away: '#F59E0B'
    },
    dark: {
      online: '#34D399',
      offline: '#F87171',
      away: '#FBBF24'
    }
  })[status];
  
  // Theme-aware background with function
  const backgroundColor = useThemeSelect((theme) => ({
    light: theme.colors.background,
    dark: theme.colors.surface
  }));
  
  return (
    <View style={{
      backgroundColor,
      padding: 16,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      <View style={{
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: statusColor,
        marginRight: 8,
      }} />
      <Text style={{ color: colors.mainText }}>
        Status: {status}
      </Text>
    </View>
  );
};
```

### Complex Theme Selection Logic

```tsx
import React from 'react';
import { View } from 'react-native';
import { useThemeSelect } from '@duyluu/ui-theme';

const AdaptiveLayout = ({ children }: { children: React.ReactNode }) => {
  // Complex selection based on theme and other factors
  const containerStyle = useThemeSelect((theme) => {
    const isDark = theme.colors.background === '#1A1C20';
    
    return {
      light: {
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.breakLine,
        shadowColor: theme.shadow.default.shadowColor,
        shadowOffset: theme.shadow.default.shadowOffset,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      dark: {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.grayDarker,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
      }
    };
  });
  
  return (
    <View style={[
      containerStyle,
      {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
      }
    ]}>
      {children}
    </View>
  );
};
```

## 📱 Complete Screen Examples

### Settings Screen with Theme Toggle

```tsx
import React from 'react';
import { View, Text, Switch, ScrollView } from 'react-native';
import { useThemeStyles, useThemeMode, getCurrentThemeMode } from '@duyluu/ui-theme';
import { createThemeService } from '@duyluu/ui-theme';

const themeService = createThemeService({
  persistKey: 'app-theme',
  storage: {
    getItem: async (key) => {
      // Your storage implementation
      return localStorage.getItem(key);
    },
    setItem: async (key, value) => {
      localStorage.setItem(key, value);
    },
    removeItem: async (key) => {
      localStorage.removeItem(key);
    },
  }
});

const SettingsScreen = () => {
  const mode = useThemeMode();
  const isDarkMode = mode === 'dark';
  
  const styles = useThemeStyles((theme) => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.xl,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.breakLine,
    },
    headerTitle: {
      fontSize: theme.typography.headingLarge.fontSize,
      fontFamily: theme.typography.fonts.primary.bold,
      color: theme.colors.mainText,
    },
    section: {
      padding: theme.spacing.lg,
    },
    sectionTitle: {
      fontSize: theme.typography.titleMedium.fontSize,
      fontFamily: theme.typography.fonts.primary.medium,
      color: theme.colors.mainText,
      marginBottom: theme.spacing.md,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.breakLine,
    },
    settingLabel: {
      fontSize: theme.typography.bodyLarge.fontSize,
      color: theme.colors.mainText,
    },
    settingDescription: {
      fontSize: theme.typography.bodySmall.fontSize,
      color: theme.colors.subText,
      marginTop: theme.spacing.xs,
    },
  }));
  
  const handleThemeToggle = (value: boolean) => {
    themeService.setMode(value ? 'dark' : 'light');
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        
        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Text style={styles.settingDescription}>
              Switch between light and dark theme
            </Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={handleThemeToggle}
          />
        </View>
      </View>
    </ScrollView>
  );
};
```

### Product Card with Theme

```tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useThemeStyles, useThemeSelect } from '@duyluu/ui-theme';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}

const ProductCard: React.FC<{ product: Product; onPress: () => void }> = ({ 
  product, 
  onPress 
}) => {
  const styles = useThemeStyles((theme) => ({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.spacing.md,
      padding: theme.spacing.md,
      margin: theme.spacing.sm,
      shadowColor: theme.shadow.default.shadowColor,
      shadowOffset: theme.shadow.default.shadowOffset,
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: theme.spacing.sm,
      marginBottom: theme.spacing.sm,
    },
    name: {
      fontSize: theme.typography.titleMedium.fontSize,
      fontFamily: theme.typography.fonts.primary.medium,
      color: theme.colors.mainText,
      marginBottom: theme.spacing.xs,
    },
    price: {
      fontSize: theme.typography.headingSmall.fontSize,
      fontFamily: theme.typography.fonts.primary.bold,
      color: theme.colors.primary,
      marginBottom: theme.spacing.sm,
    },
    rating: {
      fontSize: theme.typography.bodySmall.fontSize,
      color: theme.colors.subText,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.spacing.sm,
      marginTop: theme.spacing.md,
      alignItems: 'center',
    },
    buttonText: {
      color: theme.colors.light,
      fontSize: theme.typography.labelLarge.fontSize,
      fontFamily: theme.typography.fonts.primary.medium,
    },
  }));
  
  // Theme-aware star color
  const starColor = useThemeSelect({
    light: '#FFC107',
    dark: '#FFD54F'
  });
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.rating}>
        {'★'.repeat(Math.floor(product.rating))} {product.rating}/5
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
```

## 🎨 Custom Theme Creation

### Brand Theme Example

```tsx
import { createLightTheme, createDarkTheme } from '@duyluu/ui-theme';

// Custom brand colors
const brandColors = {
  primary: '#6366F1',      // Indigo
  secondary: '#EC4899',    // Pink
  success: '#10B981',      // Emerald
  warning: '#F59E0B',      // Amber
  danger: '#EF4444',       // Red
};

// Custom light theme
export const customLightTheme = createLightTheme({
  colors: {
    primary: brandColors.primary,
    secondary: brandColors.secondary,
    success: brandColors.success,
    warning: brandColors.warning,
    danger: brandColors.danger,
    // Override other colors as needed
    background: '#FAFAFA',
    surface: '#FFFFFF',
    mainText: '#1F2937',
    subText: '#6B7280',
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
export const customDarkTheme = createDarkTheme({
  colors: {
    primary: '#818CF8',      // Light indigo for dark mode
    secondary: '#F472B6',    // Light pink for dark mode
    success: '#34D399',      // Light emerald
    warning: '#FBBF24',      // Light amber
    danger: '#F87171',       // Light red
    background: '#111827',   // Dark background
    surface: '#1F2937',      // Dark surface
    mainText: '#F9FAFB',     // Light text
    subText: '#D1D5DB',      // Light gray text
  },
  fonts: {
    primary: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      bold: 'Inter-Bold',
    }
  }
});
```

### Using Custom Themes

```tsx
import React from 'react';
import { createThemeService } from '@duyluu/ui-theme';
import { customLightTheme, customDarkTheme } from './customThemes';

// Create theme service with custom themes
const themeService = createThemeService({
  persistKey: 'custom-app-theme',
  storage: AsyncStorage,
});

// Set custom themes
themeService.setThemeConfig({
  lightTheme: customLightTheme,
  darkTheme: customDarkTheme,
});

// Your app components will now use the custom themes
const App = () => {
  return (
    <SystemSchemeListener>
      <YourAppContent />
    </SystemSchemeListener>
  );
};
```

## 🔧 Performance Optimization

### Optimized Component with Selective Updates

```tsx
import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useThemeColors, useThemeSelect } from '@duyluu/ui-theme';

// Memoized component that only re-renders when props change
const OptimizedCard = memo<{ title: string; subtitle: string }>(({ title, subtitle }) => {
  // Use specific hooks for better performance
  const colors = useThemeColors(); // Only subscribes to color changes
  
  // Cache theme-aware values
  const shadowStyle = useThemeSelect((theme) => ({
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    dark: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    }
  }));
  
  return (
    <View style={[
      {
        backgroundColor: colors.surface,
        padding: 16,
        borderRadius: 12,
        margin: 8,
      },
      shadowStyle
    ]}>
      <Text style={{
        color: colors.mainText,
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
      }}>
        {title}
      </Text>
      <Text style={{
        color: colors.subText,
        fontSize: 14,
      }}>
        {subtitle}
      </Text>
    </View>
  );
});
```

### Custom Hook for Repeated Patterns

```tsx
import { useThemeStyles } from '@duyluu/ui-theme';

// Custom hook for card styles
const useCardStyles = () => {
  return useThemeStyles((theme) => ({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.spacing.md,
      padding: theme.spacing.lg,
      marginVertical: theme.spacing.sm,
      shadowColor: theme.shadow.default.shadowColor,
      shadowOffset: theme.shadow.default.shadowOffset,
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      fontSize: theme.typography.titleLarge.fontSize,
      fontFamily: theme.typography.fonts.primary.bold,
      color: theme.colors.mainText,
      marginBottom: theme.spacing.sm,
    },
    content: {
      fontSize: theme.typography.bodyMedium.fontSize,
      color: theme.colors.subText,
      lineHeight: theme.typography.bodyMedium.lineHeight,
    }
  }));
};

// Usage in components
const InfoCard = ({ title, content }: { title: string; content: string }) => {
  const styles = useCardStyles();
  
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};
```

## 🧪 Testing with Themes

### Testing Theme-Aware Components

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { createLightTheme, createDarkTheme } from '@duyluu/ui-theme';
import { MyThemedComponent } from './MyThemedComponent';

// Mock theme service for testing
jest.mock('@duyluu/ui-theme', () => ({
  ...jest.requireActual('@duyluu/ui-theme'),
  useTheme: () => createLightTheme(),
  useThemeColors: () => createLightTheme().colors,
  useThemeMode: () => 'light',
}));

describe('MyThemedComponent', () => {
  it('renders with light theme', () => {
    const { getByText } = render(<MyThemedComponent />);
    // Test component with light theme
  });
  
  it('renders with dark theme', () => {
    // Mock dark theme
    jest.doMock('@duyluu/ui-theme', () => ({
      ...jest.requireActual('@duyluu/ui-theme'),
      useTheme: () => createDarkTheme(),
      useThemeColors: () => createDarkTheme().colors,
      useThemeMode: () => 'dark',
    }));
    
    const { getByText } = render(<MyThemedComponent />);
    // Test component with dark theme
  });
});
```

This comprehensive example collection should help you understand how to effectively use `@duyluu/ui-theme` in real-world scenarios! 🎉 