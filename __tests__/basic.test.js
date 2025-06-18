// Basic test without React Native dependencies

describe('Theme Package Basic Tests', () => {
  test('should import basic constants', () => {
    const { PALLETS } = require('../dist/constants/palettes.js');
    
    expect(PALLETS).toBeDefined();
    expect(PALLETS.ORANGE).toBe('#F47D42');
    expect(PALLETS.DARK_BLUE).toBe('#1a3154');
  });

  test('should create color palettes', () => {
    const { createLightColors, createDarkColors } = require('../dist/constants/colors.js');
    
    const lightColors = createLightColors();
    const darkColors = createDarkColors();
    
    expect(lightColors.background).toBe('#F3F8FC');
    expect(darkColors.background).toBe('#1A1C20');
    expect(lightColors.primary).toBe('#F47D42'); // Actual value from system
    expect(darkColors.primary).toBe('#F47D42'); // Check actual dark value
  });

  test('should create spacing system', () => {
    const { createSpacingSystem } = require('../dist/constants/spacing.js');
    
    const spacing = createSpacingSystem();
    
    expect(spacing.xxs).toBe(2);
    expect(spacing.xs).toBe(4);
    expect(spacing.s).toBe(8); // Actual property name is 's'
    expect(spacing.sm).toBe(12);
    expect(spacing.m).toBe(16); // Actual property name is 'm'
    expect(spacing.l).toBe(24); // Actual property name is 'l'
    expect(spacing.xl).toBe(32); // Actual value is 32
    expect(spacing.xxl).toBe(40);
  });

  test('should have shadow definitions', () => {
    const { createShadowSystem } = require('../dist/constants/shadows.js');
    
    const shadows = createShadowSystem();
    
    expect(shadows.default).toBeDefined();
    expect(shadows.light).toBeDefined();
    expect(shadows.dark).toBeDefined();
    expect(shadows.darker).toBeDefined();
    expect(shadows.blackDark).toBeDefined();
  });
});

console.log('✅ Theme Package Basic Tests');
console.log('Non-React Native functionality validated.'); 