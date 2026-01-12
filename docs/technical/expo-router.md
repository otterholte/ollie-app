# Expo Router Documentation for Ollie

## Overview

Expo Router is a file-based routing system for React Native and Expo apps. It provides native navigation with the simplicity of web-like file-system routing.

---

## Installation

```bash
npx expo install expo-router expo-linking expo-constants expo-status-bar
```

## Setup

### Entry Point (index.ts)

```typescript
import 'expo-router/entry';
```

### app.json Configuration

```json
{
  "expo": {
    "scheme": "ollie",
    "web": {
      "bundler": "metro"
    },
    "plugins": ["expo-router"]
  }
}
```

---

## File Structure

```
src/app/
├── _layout.tsx          # Root layout
├── index.tsx            # Home screen (/)
├── (tabs)/              # Tab group
│   ├── _layout.tsx      # Tab navigator config
│   ├── index.tsx        # First tab (Today)
│   ├── tools.tsx        # Tools tab
│   ├── habits.tsx       # Habits tab
│   └── reflect.tsx      # Reflect tab
├── check-in/
│   ├── _layout.tsx      # Check-in flow layout
│   ├── index.tsx        # Start check-in
│   ├── mood.tsx         # Mood selection
│   ├── feelings.tsx     # Feelings detail
│   └── complete.tsx     # Completion screen
├── tool/
│   ├── [id].tsx         # Dynamic tool screen
│   └── _layout.tsx
├── settings/
│   ├── index.tsx        # Settings main
│   ├── notifications.tsx
│   ├── data.tsx         # Data management
│   └── about.tsx        # About & disclaimers
├── crisis.tsx           # Crisis resources (always accessible)
└── +not-found.tsx       # 404 screen
```

---

## Core Concepts

### Layouts (_layout.tsx)

Layouts wrap child routes and persist across navigation.

```typescript
// app/_layout.tsx (Root Layout)
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/providers/ThemeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fafaf9' },
          animation: 'fade', // Gentle transition
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="check-in"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="crisis"
          options={{
            presentation: 'modal',
            gestureEnabled: false, // Don't accidentally dismiss
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
```

### Tab Navigation

```typescript
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Home, Wrench, Calendar, BookOpen } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.neutral[400],
        tabBarStyle: {
          backgroundColor: colors.background.primary,
          borderTopColor: colors.neutral[200],
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: 'Tools',
          tabBarIcon: ({ color, size }) => (
            <Wrench size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: 'Habits',
          tabBarIcon: ({ color, size }) => (
            <Calendar size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reflect"
        options={{
          title: 'Reflect',
          tabBarIcon: ({ color, size }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

---

## Navigation

### Using Link Component

```typescript
import { Link } from 'expo-router';

// Basic link
<Link href="/check-in">Start Check-in</Link>

// With styling
<Link href="/tools" asChild>
  <Pressable>
    <Text>View Tools</Text>
  </Pressable>
</Link>

// With params
<Link href={`/tool/${toolId}`}>Open Tool</Link>
```

### Programmatic Navigation

```typescript
import { router } from 'expo-router';

// Navigate to route
router.push('/check-in');

// Navigate with params
router.push({
  pathname: '/tool/[id]',
  params: { id: 'thought-record' },
});

// Replace (no back)
router.replace('/check-in/complete');

// Go back
router.back();

// Go to specific route in history
router.navigate('/');

// Dismiss modal
router.dismiss();

// Check if can go back
router.canGoBack();
```

### Getting Route Params

```typescript
// app/tool/[id].tsx
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';

export default function ToolScreen() {
  // Local params (from this route only)
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Global params (from entire URL)
  const globalParams = useGlobalSearchParams();
  
  return <Tool id={id} />;
}
```

---

## Screen Options

### Static Options

```typescript
// Set options in the screen file
export default function CheckInScreen() {
  return <View />;
}

// Static configuration
CheckInScreen.options = {
  title: 'Check In',
  headerShown: true,
};
```

### Dynamic Options with useNavigation

```typescript
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

export default function ToolScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: getToolName(id),
    });
  }, [navigation, id]);
  
  return <Tool id={id} />;
}
```

### Stack.Screen Options

```typescript
<Stack.Screen
  name="check-in"
  options={{
    // Presentation
    presentation: 'modal', // 'card' | 'modal' | 'transparentModal'
    
    // Animation
    animation: 'slide_from_bottom', // 'default' | 'fade' | 'slide_from_right' | etc.
    animationDuration: 300,
    
    // Header
    headerShown: true,
    title: 'Check In',
    headerStyle: { backgroundColor: '#fafaf9' },
    headerTintColor: '#2e2e2c',
    headerTitleStyle: { fontWeight: '600' },
    headerBackTitle: 'Back',
    
    // Gestures
    gestureEnabled: true,
    gestureDirection: 'vertical',
    
    // Status bar (iOS)
    statusBarStyle: 'dark',
    statusBarAnimation: 'fade',
  }}
/>
```

---

## Groups and Layouts

### Route Groups

Groups organize routes without affecting URLs.

```typescript
// (tabs) - Grouped routes share tab layout
src/app/(tabs)/index.tsx     // URL: /
src/app/(tabs)/tools.tsx     // URL: /tools

// (auth) - Auth flow group
src/app/(auth)/login.tsx     // URL: /login
src/app/(auth)/signup.tsx    // URL: /signup
```

### Nested Layouts

```typescript
// app/check-in/_layout.tsx
import { Stack } from 'expo-router';

export default function CheckInLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#fafaf9' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Check In' }} />
      <Stack.Screen name="mood" options={{ title: 'How are you feeling?' }} />
      <Stack.Screen name="feelings" options={{ title: 'What\'s present?' }} />
      <Stack.Screen name="complete" options={{ headerShown: false }} />
    </Stack>
  );
}
```

---

## Error Handling

### Not Found Screen

```typescript
// app/+not-found.tsx
import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>This screen doesn't exist.</Text>
        <Link href="/" style={{ marginTop: 16 }}>
          <Text>Go home</Text>
        </Link>
      </View>
    </>
  );
}
```

### Error Boundary

```typescript
// app/_layout.tsx
import { ErrorBoundary } from 'expo-router';

export { ErrorBoundary };

// Or custom error boundary
export function ErrorBoundary({ error, retry }) {
  return (
    <View>
      <Text>Something went wrong</Text>
      <Text>{error.message}</Text>
      <Button onPress={retry} title="Try again" />
    </View>
  );
}
```

---

## Deep Linking

### Configure in app.json

```json
{
  "expo": {
    "scheme": "ollie",
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [{ "scheme": "ollie" }],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    },
    "ios": {
      "associatedDomains": ["applinks:ollie.app"]
    }
  }
}
```

### Handle Deep Links

```typescript
// Deep link: ollie://crisis
// Opens: /crisis

// Deep link: ollie://tool/breathing
// Opens: /tool/breathing

// From notification
Notifications.addNotificationResponseReceivedListener((response) => {
  const { screen } = response.notification.request.content.data;
  router.push(screen); // e.g., '/check-in'
});
```

---

## Navigation Patterns for Ollie

### Modal Flow (Check-in)

```typescript
// Start check-in (modal)
router.push('/check-in');

// Progress through steps
router.push('/check-in/mood');
router.push('/check-in/feelings');

// Complete (replace to prevent back)
router.replace('/check-in/complete');

// Dismiss modal when done
router.dismiss();
```

### Tool Deep Navigation

```typescript
// From tools list to specific tool
router.push({
  pathname: '/tool/[id]',
  params: { 
    id: 'thought-record',
    category: 'cbt'
  },
});
```

### Crisis Resource (Always Accessible)

```typescript
// Crisis button available everywhere
const CrisisButton = () => (
  <Pressable
    onPress={() => router.push('/crisis')}
    accessibilityLabel="Access crisis resources"
    accessibilityHint="Opens crisis support information and hotlines"
  >
    <Text>Need help now?</Text>
  </Pressable>
);
```

### Preventing Accidental Back Navigation

```typescript
// In sensitive screens (e.g., crisis, mid-check-in)
<Stack.Screen
  name="crisis"
  options={{
    gestureEnabled: false, // Disable swipe back
    headerBackVisible: false, // Hide back button
  }}
/>
```

---

## Performance Tips

### Lazy Loading

Routes are lazy loaded by default. For large screens:

```typescript
// Defer heavy components
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('@/components/HeavyChart'));

export default function ReflectScreen() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyChart />
    </Suspense>
  );
}
```

### Prefetching

```typescript
// Prefetch likely next routes
import { router } from 'expo-router';

// On tool list screen, prefetch tool detail
useEffect(() => {
  router.prefetch('/tool/thought-record');
}, []);
```

---

## Testing Navigation

```typescript
import { renderRouter } from 'expo-router/testing-library';

test('navigates to check-in', async () => {
  const { getByText } = renderRouter({
    index: () => <HomeScreen />,
    'check-in/index': () => <CheckInScreen />,
  });
  
  fireEvent.press(getByText('Start Check-in'));
  
  expect(getByText('How are you feeling?')).toBeVisible();
});
```


