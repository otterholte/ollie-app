# Expo SDK 52 Documentation for Ollie

## Overview

Expo SDK 52 provides a comprehensive set of APIs for building cross-platform mobile applications. This document covers the APIs most relevant to Ollie.

---

## Core APIs

### expo-constants

Access app configuration and environment info.

```typescript
import Constants from 'expo-constants';

// App information
Constants.expoConfig?.name; // "Ollie"
Constants.expoConfig?.version; // "1.0.0"

// Device information
Constants.deviceName; // User's device name
Constants.platform; // { ios: {...} } or { android: {...} }

// Environment
Constants.executionEnvironment; // 'standalone' | 'storeClient' | 'bare'
```

### expo-device

Device information for analytics and compatibility.

```typescript
import * as Device from 'expo-device';

Device.brand; // "Apple" or "Samsung"
Device.modelName; // "iPhone 14"
Device.osName; // "iOS" or "Android"
Device.osVersion; // "16.0"
```

---

## Storage APIs

### @react-native-async-storage/async-storage

For general app data (check-ins, habits, settings).

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
await AsyncStorage.setItem('key', JSON.stringify(data));

// Retrieve data
const value = await AsyncStorage.getItem('key');
const data = value ? JSON.parse(value) : null;

// Remove data
await AsyncStorage.removeItem('key');

// Clear all (for data deletion feature)
await AsyncStorage.clear();

// Get all keys
const keys = await AsyncStorage.getAllKeys();
```

### expo-secure-store

For sensitive data (encrypted storage).

```typescript
import * as SecureStore from 'expo-secure-store';

// Store sensitive data (max 2KB per item)
await SecureStore.setItemAsync('userToken', 'secret-value');

// Retrieve
const token = await SecureStore.getItemAsync('userToken');

// Delete
await SecureStore.deleteItemAsync('userToken');

// Options
await SecureStore.setItemAsync('key', 'value', {
  keychainAccessible: SecureStore.WHEN_UNLOCKED,
});
```

**Use for**: Any sensitive user reflections, personal notes, authentication tokens.

---

## Notifications

### expo-notifications

For gentle reminders (opt-in only).

```typescript
import * as Notifications from 'expo-notifications';

// Configure behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false, // Ollie is calm
    shouldSetBadge: false,
  }),
});

// Request permissions
const { status } = await Notifications.requestPermissionsAsync();

// Schedule local notification
await Notifications.scheduleNotificationAsync({
  content: {
    title: 'Ollie',
    body: 'Just checking in. How are you doing today?',
    data: { screen: 'check-in' },
  },
  trigger: {
    hour: 9,
    minute: 0,
    repeats: true,
  },
});

// Cancel all scheduled
await Notifications.cancelAllScheduledNotificationsAsync();

// Handle notification tap
const subscription = Notifications.addNotificationResponseReceivedListener(
  (response) => {
    const { screen } = response.notification.request.content.data;
    // Navigate to screen
  }
);
```

**Guidelines for Ollie**:
- Always optional and easy to disable
- Never guilt-inducing ("You haven't checked in!")
- Gentle language ("Ollie is here if you need")
- Limit frequency (once daily max)
- No sounds by default

---

## Haptics

### expo-haptics

For subtle tactile feedback.

```typescript
import * as Haptics from 'expo-haptics';

// Selection feedback (light)
await Haptics.selectionAsync();

// Impact feedback
await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

// Notification feedback
await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
```

**Guidelines for Ollie**:
- Use sparingly
- Only Light impacts
- Selection feedback for toggles/pickers
- Success for completing check-ins
- Never use Heavy impact (jarring)

---

## Linking & External

### expo-linking

For crisis hotlines and external resources.

```typescript
import * as Linking from 'expo-linking';

// Open phone dialer (crisis line)
await Linking.openURL('tel:988');

// Open SMS (Crisis Text Line)
await Linking.openURL('sms:741741&body=HOME');

// Open website
await Linking.openURL('https://www.iasp.info/resources/Crisis_Centres/');

// Check if URL can be opened
const canOpen = await Linking.canOpenURL('tel:988');
```

### expo-web-browser

For in-app browser (privacy policy, terms).

```typescript
import * as WebBrowser from 'expo-web-browser';

// Open in-app browser
await WebBrowser.openBrowserAsync('https://ollie.app/privacy');

// With options
await WebBrowser.openBrowserAsync(url, {
  presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
  controlsColor: '#4a7c54', // Match Ollie's primary color
});
```

---

## System Features

### expo-application

For app store requirements.

```typescript
import * as Application from 'expo-application';

Application.applicationName; // "Ollie"
Application.nativeApplicationVersion; // "1.0.0"
Application.nativeBuildVersion; // "1"

// iOS specific
Application.getIosIdForVendorAsync(); // For anonymous analytics if needed
```

### expo-localization

For internationalization.

```typescript
import * as Localization from 'expo-localization';

Localization.locale; // "en-US"
Localization.timezone; // "America/New_York"
Localization.isRTL; // false

// Get all locales
Localization.locales; // ["en-US", "es-ES"]
```

### expo-network

For offline detection.

```typescript
import * as Network from 'expo-network';

const networkState = await Network.getNetworkStateAsync();
networkState.isConnected; // true/false
networkState.isInternetReachable; // true/false
```

---

## Media

### expo-av

For guided meditations and breathing exercises.

```typescript
import { Audio } from 'expo-av';

// Configure audio mode
await Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  staysActiveInBackground: true, // For meditations
  shouldDuckAndroid: true,
});

// Load and play sound
const { sound } = await Audio.Sound.createAsync(
  require('./assets/audio/meditation.mp3'),
  { shouldPlay: true }
);

// Control playback
await sound.playAsync();
await sound.pauseAsync();
await sound.setPositionAsync(0);
await sound.unloadAsync(); // Clean up

// Volume (gentle)
await sound.setVolumeAsync(0.7);
```

### expo-keep-awake

For meditations and timed exercises.

```typescript
import { useKeepAwake } from 'expo-keep-awake';

const MeditationScreen = () => {
  // Keep screen awake during meditation
  useKeepAwake();
  
  return <MeditationContent />;
};
```

---

## Date & Time

### expo-calendar (if needed for scheduling)

```typescript
import * as Calendar from 'expo-calendar';

// Request permission
const { status } = await Calendar.requestCalendarPermissionsAsync();

// Get calendars
const calendars = await Calendar.getCalendarsAsync();

// Create event (e.g., therapy appointment reminder)
const eventId = await Calendar.createEventAsync(calendarId, {
  title: 'Self-care check-in',
  startDate: new Date(),
  endDate: new Date(),
  alarms: [{ relativeOffset: -15 }],
});
```

---

## Configuration (app.json)

```json
{
  "expo": {
    "name": "Ollie",
    "slug": "ollie",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#fafaf9"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.ollie",
      "buildNumber": "1",
      "infoPlist": {
        "NSCalendarsUsageDescription": "Ollie can add self-care reminders to your calendar",
        "NSMicrophoneUsageDescription": "For voice journaling features"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#fafaf9"
      },
      "package": "com.yourcompany.ollie",
      "versionCode": 1,
      "permissions": [
        "NOTIFICATIONS",
        "VIBRATE"
      ]
    },
    "plugins": [
      "expo-router",
      "expo-secure-store",
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#4a7c54"
        }
      ]
    ]
  }
}
```

---

## Best Practices for Ollie

### Performance
- Use `useMemo` and `useCallback` appropriately
- Lazy load screens with Expo Router
- Minimize re-renders in lists

### Privacy
- Default to local storage
- Use SecureStore for sensitive data
- Provide clear data deletion
- No analytics without consent

### Offline Support
- App should work fully offline
- Queue any sync operations
- Clear offline indicators

### Accessibility
- Test with VoiceOver/TalkBack
- Support Dynamic Type
- Respect reduced motion settings


