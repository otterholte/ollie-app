/**
 * Ollie Spacing System
 * 
 * Based on 4px unit. Generous spacing creates calm, breathing room.
 * More space = less visual stress = calmer experience.
 */

// Base spacing scale (4px base unit)
export const spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
} as const;

// Border radius
export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
} as const;

// Common layout values
export const layout = {
  // Screen padding
  screenPaddingHorizontal: spacing[5], // 20px
  screenPaddingVertical: spacing[6],   // 24px
  
  // Card padding
  cardPadding: spacing[5],            // 20px
  cardPaddingSmall: spacing[4],       // 16px
  cardPaddingLarge: spacing[6],       // 24px
  
  // Gap between elements
  gap: {
    xs: spacing[1],   // 4px
    sm: spacing[2],   // 8px
    md: spacing[4],   // 16px
    lg: spacing[6],   // 24px
    xl: spacing[8],   // 32px
  },
  
  // Touch targets (accessibility)
  minTouchTarget: 48, // Minimum 48x48 for accessibility
  
  // Icon sizes
  iconSize: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
  },
  
  // Button heights
  buttonHeight: {
    sm: 36,
    md: 48,
    lg: 56,
  },
  
  // Input heights
  inputHeight: {
    sm: 40,
    md: 48,
    lg: 56,
  },
} as const;

// Shadows (soft, subtle - never harsh)
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Layout = typeof layout;
export type Shadows = typeof shadows;

