/**
 * Ollie Typography System
 * 
 * Readable, gentle, and accessible.
 * Generous sizing and spacing for calm reading.
 */

export const typography = {
  // Font families
  // Using system fonts for now - consider custom fonts later
  // Good options: Nunito, Lato, Source Sans Pro, Poppins
  fonts: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },

  // Font sizes (generous for readability)
  sizes: {
    xs: 12,     // Small labels
    sm: 14,     // Secondary text
    base: 16,   // Body text
    lg: 18,     // Emphasized body
    xl: 20,     // Small headings
    '2xl': 24,  // Section headings
    '3xl': 30,  // Page titles
    '4xl': 36,  // Large display
    '5xl': 48,  // Hero text
  },

  // Line heights (spacious for calm reading)
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Font weights
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Letter spacing
  letterSpacing: {
    tighter: -0.8,
    tight: -0.4,
    normal: 0,
    wide: 0.4,
    wider: 0.8,
  },
} as const;

// Pre-defined text styles
export const textStyles = {
  // Headings
  h1: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.semibold,
    lineHeight: typography.lineHeights.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  h2: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.semibold,
    lineHeight: typography.lineHeights.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  h3: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    lineHeight: typography.lineHeights.snug,
  },
  h4: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    lineHeight: typography.lineHeights.snug,
  },

  // Body text
  body: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.relaxed,
  },
  bodySmall: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.normal,
  },
  bodyLarge: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.relaxed,
  },

  // UI elements
  button: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    lineHeight: typography.lineHeights.none,
    letterSpacing: typography.letterSpacing.wide,
  },
  buttonSmall: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    lineHeight: typography.lineHeights.none,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    lineHeight: typography.lineHeights.normal,
  },
  caption: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.normal,
  },

  // Ollie's voice (slightly larger, gentle)
  companion: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.loose,
  },
} as const;

export type Typography = typeof typography;
export type TextStyles = typeof textStyles;

