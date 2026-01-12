# Async Storage for Ollie

## Overview

AsyncStorage is the primary local persistence solution for Ollie. Combined with Zustand's persist middleware, it handles all non-sensitive user data.

---

## Installation

```bash
npx expo install @react-native-async-storage/async-storage
```

---

## Basic Usage

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
await AsyncStorage.setItem('key', 'value');

// Store object
await AsyncStorage.setItem('user', JSON.stringify({ name: 'Alex' }));

// Retrieve data
const value = await AsyncStorage.getItem('key');
const user = JSON.parse(await AsyncStorage.getItem('user') || '{}');

// Remove data
await AsyncStorage.removeItem('key');

// Get all keys
const keys = await AsyncStorage.getAllKeys();

// Clear everything
await AsyncStorage.clear();

// Multi operations
await AsyncStorage.multiSet([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);

const values = await AsyncStorage.multiGet(['key1', 'key2']);
```

---

## With Zustand (Recommended)

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface State {
  data: Data[];
  addData: (item: Data) => void;
}

const useStore = create<State>()(
  persist(
    (set) => ({
      data: [],
      addData: (item) => set((state) => ({ 
        data: [...state.data, item] 
      })),
    }),
    {
      name: 'ollie-data', // Key in AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

---

## Ollie Data Storage Schema

### Storage Keys

```typescript
// Zustand persisted stores
'ollie-checkins'    // Check-in history
'ollie-habits'      // Habits and logs
'ollie-settings'    // User preferences
'ollie-tools'       // Tool usage history
'ollie-reflections' // Journal entries (consider SecureStore)

// Direct AsyncStorage
'ollie-onboarding-complete'
'ollie-last-checkin-date'
'ollie-notification-token'
```

### Data Structures

```typescript
// Check-ins storage structure
interface CheckInStorage {
  checkIns: CheckIn[];
  currentCheckIn: Partial<CheckIn> | null;
}

// Habits storage structure
interface HabitStorage {
  habits: Habit[];
  logs: HabitLog[];
}

// Settings storage structure
interface SettingsStorage {
  hasCompletedOnboarding: boolean;
  name?: string;
  focusAreas: string[];
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  accessibility: AccessibilitySettings;
  theme: 'light' | 'dark' | 'system';
}
```

---

## Data Management

### Export User Data

```typescript
export const exportAllData = async (): Promise<string> => {
  const keys = await AsyncStorage.getAllKeys();
  const ollieKeys = keys.filter(k => k.startsWith('ollie-'));
  const data = await AsyncStorage.multiGet(ollieKeys);
  
  const exportObject: Record<string, any> = {
    exportDate: new Date().toISOString(),
    appVersion: '1.0.0',
  };
  
  data.forEach(([key, value]) => {
    if (value) {
      try {
        exportObject[key] = JSON.parse(value);
      } catch {
        exportObject[key] = value;
      }
    }
  });
  
  return JSON.stringify(exportObject, null, 2);
};
```

### Delete All Data (GDPR/CCPA)

```typescript
export const deleteAllData = async (): Promise<void> => {
  const keys = await AsyncStorage.getAllKeys();
  const ollieKeys = keys.filter(k => k.startsWith('ollie-'));
  await AsyncStorage.multiRemove(ollieKeys);
};
```

### Storage Size Check

```typescript
export const getStorageSize = async (): Promise<number> => {
  const keys = await AsyncStorage.getAllKeys();
  const ollieKeys = keys.filter(k => k.startsWith('ollie-'));
  const data = await AsyncStorage.multiGet(ollieKeys);
  
  let totalSize = 0;
  data.forEach(([key, value]) => {
    totalSize += key.length + (value?.length || 0);
  });
  
  return totalSize; // bytes
};
```

---

## Error Handling

```typescript
const safeGetItem = async <T>(key: string, defaultValue: T): Promise<T> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) return defaultValue;
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return defaultValue;
  }
};

const safeSetItem = async <T>(key: string, value: T): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing ${key}:`, error);
    return false;
  }
};
```

---

## Performance Tips

1. **Batch operations** when possible
2. **Don't store large blobs** - consider file system for media
3. **Clean up old data** periodically
4. **Use meaningful key prefixes** for organization

---

## Sensitive Data

For sensitive data (personal reflections, notes), use **expo-secure-store** instead:

```typescript
import * as SecureStore from 'expo-secure-store';

// Encrypted storage (max 2KB per item)
await SecureStore.setItemAsync('sensitive-note', encryptedData);
const data = await SecureStore.getItemAsync('sensitive-note');
```

See `expo-sdk.md` for SecureStore documentation.


