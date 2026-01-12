/**
 * Ollie Color Palette
 * 
 * Soft light blue theme - calming like water, perfect for an otter.
 * Actual blue tones, not just tinted whites.
 */

export const colors = {
  // Primary - Ocean blue
  primary: {
    50: '#e0f2fe',
    100: '#bae6fd',
    200: '#7dd3fc',
    300: '#38bdf8',
    400: '#0ea5e9',
    500: '#0284c7', // Main primary
    600: '#0369a1',
    700: '#075985',
    800: '#0c4a6e',
    900: '#082f49',
  },

  // Secondary - Teal
  secondary: {
    50: '#ccfbf1',
    100: '#99f6e4',
    200: '#5eead4',
    300: '#2dd4bf',
    400: '#14b8a6',
    500: '#0d9488', // Main secondary
    600: '#0f766e',
    700: '#115e59',
    800: '#134e4a',
    900: '#042f2e',
  },

  // Accent - Soft purple
  accent: {
    50: '#ede9fe',
    100: '#ddd6fe',
    200: '#c4b5fd',
    300: '#a78bfa',
    400: '#8b5cf6',
    500: '#7c3aed', // Main accent
    600: '#6d28d9',
    700: '#5b21b6',
    800: '#4c1d95',
    900: '#3b0764',
  },

  // Neutrals - Blue-tinted grays
  neutral: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Semantic colors
  success: '#22c55e',
  successLight: '#bbf7d0',
  warning: '#f59e0b',
  warningLight: '#fde68a',
  error: '#ef4444',
  errorLight: '#fecaca',
  info: '#3b82f6',
  infoLight: '#bfdbfe',

  // Background colors - Actual light blue!
  background: {
    primary: '#bae6fd',   // Light sky blue
    secondary: '#e0f2fe', // Softer blue
    tertiary: '#7dd3fc',  // More saturated blue for highlights
  },

  // Text colors
  text: {
    primary: '#0c4a6e',   // Deep ocean blue
    secondary: '#075985', // Medium blue
    tertiary: '#0369a1',  // Softer blue
    inverse: '#f0f9ff',   // Text on dark backgrounds
    link: '#0284c7',      // Links
  },

  // Special purpose
  overlay: 'rgba(12, 74, 110, 0.5)',      // Modal overlays
  overlayLight: 'rgba(12, 74, 110, 0.2)', // Light overlays
  divider: '#7dd3fc',                      // Divider lines
  
  // Mood colors (water-inspired)
  mood: {
    1: '#94a3b8', // Very low (gray)
    2: '#7dd3fc', // Low (light blue)
    3: '#38bdf8', // Neutral (sky blue)
    4: '#2dd4bf', // Good (teal)
    5: '#22c55e', // Very good (green)
  },
} as const;

// Type for accessing color values
export type Colors = typeof colors;
export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
