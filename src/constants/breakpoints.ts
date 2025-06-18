import type { BreakpointSystem, ResponsiveLayoutSystem } from '../types/theme';

// Default breakpoint system
export const createBreakpointSystem = (): BreakpointSystem => ({
  smallPhone: 0,
  phone: 321,
  tablet: 768,
});

// Default responsive layout system
export const createResponsiveLayoutSystem = (): ResponsiveLayoutSystem => ({
  smallPhone: 0,
  phone: 0,
  tablet: 576,
}); 