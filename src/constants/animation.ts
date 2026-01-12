/**
 * Ollie Animation System
 * 
 * All animations should be:
 * - SLOW and gentle (never snappy or bouncy)
 * - EASE-OUT or ease-in-out (never linear)
 * - SUBTLE (small movements, gentle fades)
 * - Respect reduced motion settings
 * 
 * NEVER use:
 * - Bouncy springs
 * - Fast/snappy animations
 * - Jarring transitions
 * - Excessive motion
 */

import { Easing } from 'react-native-reanimated';

// Durations (milliseconds)
export const duration = {
  instant: 100,    // Immediate feedback (button press)
  fast: 200,       // Quick but not jarring
  normal: 300,     // Standard transitions
  slow: 400,       // Deliberate movements
  gentle: 500,     // Gentle transitions
  relaxed: 600,    // Relaxed pace
  calm: 800,       // Very calm, meditative
  breathing: 4000, // Breathing exercise pace
} as const;

// Easing functions (prefer ease-out for calming effect)
export const easing = {
  // Standard easings
  easeOut: Easing.out(Easing.ease),           // Default for most animations
  easeInOut: Easing.inOut(Easing.ease),       // For reversible animations
  easeOutCubic: Easing.out(Easing.cubic),     // Smooth deceleration
  easeInOutCubic: Easing.inOut(Easing.cubic), // Smooth both ways
  
  // Gentle easings
  gentle: Easing.bezier(0.4, 0, 0.2, 1),      // Very gentle ease out
  soft: Easing.bezier(0.22, 1, 0.36, 1),      // Soft, expo-style
  smooth: Easing.bezier(0.4, 0, 0.6, 1),      // Smooth in-out
  
  // Special purpose
  breatheIn: Easing.inOut(Easing.ease),       // Breathing in
  breatheOut: Easing.inOut(Easing.ease),      // Breathing out
} as const;

// Spring configurations for Reanimated
// All springs are gentle - NO bouncy springs
export const spring = {
  // Standard gentle spring
  gentle: {
    damping: 20,
    stiffness: 90,
    mass: 1,
  },
  // Very soft spring
  soft: {
    damping: 25,
    stiffness: 70,
    mass: 1,
  },
  // Responsive but calm
  responsive: {
    damping: 18,
    stiffness: 100,
    mass: 1,
  },
  // For heavy elements
  heavy: {
    damping: 30,
    stiffness: 60,
    mass: 1.5,
  },
} as const;

// Timing configurations
export const timing = {
  // Default timing config
  default: {
    duration: duration.normal,
    easing: easing.easeOut,
  },
  // Gentle fade
  fade: {
    duration: duration.gentle,
    easing: easing.gentle,
  },
  // Slow, deliberate
  slow: {
    duration: duration.relaxed,
    easing: easing.soft,
  },
  // Quick feedback
  quick: {
    duration: duration.fast,
    easing: easing.easeOut,
  },
} as const;

// Pre-built animation configurations
export const animations = {
  // Fade in from slight translate
  fadeInUp: {
    from: { opacity: 0, translateY: 10 },
    to: { opacity: 1, translateY: 0 },
    duration: duration.gentle,
    easing: easing.gentle,
  },
  
  // Gentle scale for selections
  scaleSelect: {
    from: { scale: 1 },
    to: { scale: 1.05 },
    duration: duration.fast,
    easing: easing.easeOut,
  },
  
  // Button press
  buttonPress: {
    from: { scale: 1 },
    to: { scale: 0.97 },
    duration: duration.instant,
    easing: easing.easeOut,
  },
  
  // Card appear
  cardAppear: {
    from: { opacity: 0, translateY: 20 },
    to: { opacity: 1, translateY: 0 },
    duration: duration.slow,
    easing: easing.soft,
  },
  
  // Modal
  modalEnter: {
    from: { opacity: 0, translateY: 50 },
    to: { opacity: 1, translateY: 0 },
    duration: duration.slow,
    easing: easing.easeOutCubic,
  },
  
  // Breathing circle expand
  breatheExpand: {
    duration: duration.breathing,
    easing: easing.breatheIn,
  },
  
  // Breathing circle contract
  breatheContract: {
    duration: duration.breathing * 1.5, // Exhale longer
    easing: easing.breatheOut,
  },
} as const;

// Animation delays for staggered animations
export const stagger = {
  fast: 50,
  normal: 100,
  slow: 150,
} as const;

// Reduced motion alternatives
export const reducedMotion = {
  // For users with reduced motion preference
  // Replace animations with instant changes or very subtle fades
  duration: 0,
  fade: {
    duration: duration.fast,
    easing: easing.easeOut,
  },
} as const;

export type Duration = typeof duration;
export type Easing = typeof easing;
export type Spring = typeof spring;
export type Timing = typeof timing;

