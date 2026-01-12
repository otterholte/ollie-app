# React Native Reanimated for Ollie

## Overview

Reanimated 3 provides smooth 60fps animations for React Native. For Ollie, animations should be **calm, gentle, and never jarring**.

---

## Installation

```bash
npx expo install react-native-reanimated
```

Add to `babel.config.js`:
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

---

## Core Concepts

### Shared Values

```typescript
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

const MyComponent = () => {
  const opacity = useSharedValue(0);
  
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, []);
  
  return <Animated.View style={animatedStyle} />;
};
```

### Animation Functions

```typescript
// Timing - preferred for Ollie (predictable, calm)
opacity.value = withTiming(1, {
  duration: 300,
  easing: Easing.out(Easing.ease),
});

// Spring - use gentle configs only
scale.value = withSpring(1, {
  damping: 20,    // Higher = less bounce
  stiffness: 90,  // Lower = slower
  mass: 1,
});

// Sequence
opacity.value = withSequence(
  withTiming(0.5, { duration: 200 }),
  withTiming(1, { duration: 300 }),
);

// Delay
opacity.value = withDelay(500, withTiming(1));
```

---

## Ollie Animation Guidelines

### Gentle Timing Configs

```typescript
export const gentleTimingConfig = {
  duration: 400,
  easing: Easing.out(Easing.cubic),
};

export const softTimingConfig = {
  duration: 600,
  easing: Easing.inOut(Easing.ease),
};

export const slowFadeConfig = {
  duration: 800,
  easing: Easing.out(Easing.quad),
};
```

### Gentle Spring Configs

```typescript
// For subtle scale/position changes
export const gentleSpring = {
  damping: 20,
  stiffness: 90,
  mass: 1,
};

// For very soft movements
export const softSpring = {
  damping: 25,
  stiffness: 70,
  mass: 1,
};

// NEVER USE: bouncy spring
// BAD: { damping: 5, stiffness: 200 }
```

---

## Common Patterns for Ollie

### Fade In Component

```typescript
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface FadeInProps {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export const FadeIn = ({ 
  delay = 0, 
  duration = 400, 
  children 
}: FadeInProps) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);
  
  useEffect(() => {
    const timing = {
      duration,
      easing: Easing.out(Easing.cubic),
    };
    
    opacity.value = withDelay(delay, withTiming(1, timing));
    translateY.value = withDelay(delay, withTiming(0, timing));
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
  
  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};
```

### Mood Selector Animation

```typescript
const MoodOption = ({ selected, onSelect, mood }) => {
  const scale = useSharedValue(1);
  const backgroundColor = useSharedValue(0);
  
  useEffect(() => {
    scale.value = withSpring(selected ? 1.1 : 1, gentleSpring);
    backgroundColor.value = withTiming(selected ? 1 : 0, { duration: 300 });
  }, [selected]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(
      backgroundColor.value,
      [0, 1],
      [colors.neutral[100], colors.primary[100]]
    ),
  }));
  
  return (
    <Pressable onPress={onSelect}>
      <Animated.View style={[styles.moodOption, animatedStyle]}>
        <MoodIcon mood={mood} />
      </Animated.View>
    </Pressable>
  );
};
```

### Breathing Exercise Animation

```typescript
const BreathingCircle = ({ phase }: { phase: 'inhale' | 'hold' | 'exhale' }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.6);
  
  useEffect(() => {
    switch (phase) {
      case 'inhale':
        scale.value = withTiming(1.5, { duration: 4000, easing: Easing.inOut(Easing.ease) });
        opacity.value = withTiming(1, { duration: 4000 });
        break;
      case 'hold':
        // Maintain current values
        break;
      case 'exhale':
        scale.value = withTiming(1, { duration: 6000, easing: Easing.inOut(Easing.ease) });
        opacity.value = withTiming(0.6, { duration: 6000 });
        break;
    }
  }, [phase]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
  
  return <Animated.View style={[styles.breathingCircle, animatedStyle]} />;
};
```

### Success Checkmark

```typescript
const SuccessCheck = ({ show }: { show: boolean }) => {
  const scale = useSharedValue(0);
  const rotation = useSharedValue(-45);
  
  useEffect(() => {
    if (show) {
      scale.value = withSpring(1, gentleSpring);
      rotation.value = withSpring(0, gentleSpring);
    }
  }, [show]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));
  
  return (
    <Animated.View style={animatedStyle}>
      <Check size={24} color={colors.success} />
    </Animated.View>
  );
};
```

---

## Accessibility: Reduced Motion

```typescript
import { useReducedMotion } from 'react-native-reanimated';

const AnimatedCard = ({ children }) => {
  const reducedMotion = useReducedMotion();
  const translateY = useSharedValue(reducedMotion ? 0 : 20);
  const opacity = useSharedValue(reducedMotion ? 1 : 0);
  
  useEffect(() => {
    if (!reducedMotion) {
      translateY.value = withTiming(0, { duration: 400 });
      opacity.value = withTiming(1, { duration: 400 });
    }
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
  
  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};
```

---

## Gesture Handling

```typescript
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const SwipeableCard = ({ onDismiss, children }) => {
  const translateX = useSharedValue(0);
  
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      if (Math.abs(e.translationX) > 150) {
        translateX.value = withTiming(
          e.translationX > 0 ? 400 : -400,
          { duration: 300 },
          () => runOnJS(onDismiss)()
        );
      } else {
        translateX.value = withSpring(0, gentleSpring);
      }
    });
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animatedStyle}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};
```

---

## Layout Animations

```typescript
import Animated, { 
  FadeIn, 
  FadeOut, 
  Layout,
  SlideInDown,
} from 'react-native-reanimated';

// Entering animations
<Animated.View entering={FadeIn.duration(400).delay(100)}>
  <Content />
</Animated.View>

// Exiting animations
<Animated.View exiting={FadeOut.duration(300)}>
  <Content />
</Animated.View>

// Layout transitions
<Animated.View layout={Layout.springify().damping(20)}>
  {items.map(item => <Item key={item.id} />)}
</Animated.View>

// Custom entering for Ollie
const gentleEnter = FadeIn
  .duration(500)
  .easing(Easing.out(Easing.cubic))
  .springify()
  .damping(20);
```

---

## Animation DO's and DON'Ts for Ollie

### DO
- Use slow, gentle timing (300-800ms)
- Use ease-out or ease-in-out easing
- Respect reduced motion preferences
- Keep animations subtle (small scale changes, gentle fades)
- Use consistent animation language throughout

### DON'T
- Use bouncy springs (low damping)
- Use fast, snappy animations
- Use linear easing
- Animate multiple things chaotically
- Use jarring color changes
- Animate without purpose

### Animation Durations Guide

| Context | Duration | Notes |
|---------|----------|-------|
| Button press feedback | 100-150ms | Quick but not jarring |
| Content fade in | 300-500ms | Gentle appearance |
| Modal transitions | 400-600ms | Smooth, deliberate |
| Breathing exercises | 4000-8000ms | Match breath pace |
| Page transitions | 300-400ms | Not too slow |
| Success animations | 500-800ms | Satisfying, not rushed |


