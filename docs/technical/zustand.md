# Zustand State Management for Ollie

## Overview

Zustand is a lightweight state management library that's perfect for Ollie's needs. It's simple, TypeScript-friendly, and works great with React Native.

---

## Installation

```bash
npm install zustand
```

---

## Basic Store Pattern

```typescript
import { create } from 'zustand';

interface BearState {
  bears: number;
  increase: () => void;
  decrease: () => void;
}

const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  decrease: () => set((state) => ({ bears: state.bears - 1 })),
}));

// Usage in component
const BearCounter = () => {
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increase);
  
  return (
    <Pressable onPress={increase}>
      <Text>Bears: {bears}</Text>
    </Pressable>
  );
};
```

---

## Ollie Store Patterns

### Check-In Store

```typescript
// src/stores/checkInStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId } from '@/utils/id';

// Types
export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export interface Emotion {
  id: string;
  name: string;
  category: 'pleasant' | 'unpleasant' | 'neutral';
}

export interface CheckIn {
  id: string;
  timestamp: string; // ISO string for serialization
  mood: MoodLevel;
  emotions: string[]; // Emotion IDs
  bodyFeelings?: string[];
  thoughts?: string;
  gratitude?: string;
}

interface CheckInState {
  // State
  checkIns: CheckIn[];
  currentCheckIn: Partial<CheckIn> | null;
  
  // Actions
  startCheckIn: () => void;
  setMood: (mood: MoodLevel) => void;
  setEmotions: (emotions: string[]) => void;
  setBodyFeelings: (feelings: string[]) => void;
  setThoughts: (thoughts: string) => void;
  setGratitude: (gratitude: string) => void;
  completeCheckIn: () => CheckIn | null;
  cancelCheckIn: () => void;
  
  // Queries
  getCheckInsByDate: (date: Date) => CheckIn[];
  getRecentCheckIns: (days: number) => CheckIn[];
  getAverageMood: (days: number) => number | null;
}

export const useCheckInStore = create<CheckInState>()(
  persist(
    (set, get) => ({
      checkIns: [],
      currentCheckIn: null,
      
      startCheckIn: () => {
        set({
          currentCheckIn: {
            id: generateId(),
            timestamp: new Date().toISOString(),
          },
        });
      },
      
      setMood: (mood) => {
        set((state) => ({
          currentCheckIn: state.currentCheckIn
            ? { ...state.currentCheckIn, mood }
            : null,
        }));
      },
      
      setEmotions: (emotions) => {
        set((state) => ({
          currentCheckIn: state.currentCheckIn
            ? { ...state.currentCheckIn, emotions }
            : null,
        }));
      },
      
      setBodyFeelings: (bodyFeelings) => {
        set((state) => ({
          currentCheckIn: state.currentCheckIn
            ? { ...state.currentCheckIn, bodyFeelings }
            : null,
        }));
      },
      
      setThoughts: (thoughts) => {
        set((state) => ({
          currentCheckIn: state.currentCheckIn
            ? { ...state.currentCheckIn, thoughts }
            : null,
        }));
      },
      
      setGratitude: (gratitude) => {
        set((state) => ({
          currentCheckIn: state.currentCheckIn
            ? { ...state.currentCheckIn, gratitude }
            : null,
        }));
      },
      
      completeCheckIn: () => {
        const { currentCheckIn } = get();
        if (!currentCheckIn || !currentCheckIn.mood) return null;
        
        const completedCheckIn: CheckIn = {
          id: currentCheckIn.id || generateId(),
          timestamp: currentCheckIn.timestamp || new Date().toISOString(),
          mood: currentCheckIn.mood,
          emotions: currentCheckIn.emotions || [],
          bodyFeelings: currentCheckIn.bodyFeelings,
          thoughts: currentCheckIn.thoughts,
          gratitude: currentCheckIn.gratitude,
        };
        
        set((state) => ({
          checkIns: [...state.checkIns, completedCheckIn],
          currentCheckIn: null,
        }));
        
        return completedCheckIn;
      },
      
      cancelCheckIn: () => {
        set({ currentCheckIn: null });
      },
      
      getCheckInsByDate: (date) => {
        const { checkIns } = get();
        const dateStr = date.toISOString().split('T')[0];
        return checkIns.filter((c) => c.timestamp.startsWith(dateStr));
      },
      
      getRecentCheckIns: (days) => {
        const { checkIns } = get();
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        return checkIns.filter((c) => new Date(c.timestamp) >= cutoff);
      },
      
      getAverageMood: (days) => {
        const recent = get().getRecentCheckIns(days);
        if (recent.length === 0) return null;
        const sum = recent.reduce((acc, c) => acc + c.mood, 0);
        return sum / recent.length;
      },
    }),
    {
      name: 'ollie-checkins',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

### Habit Store

```typescript
// src/stores/habitStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId } from '@/utils/id';

export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  customDays?: number[]; // 0-6 for custom
  reminder?: {
    enabled: boolean;
    time: string; // "09:00"
  };
  createdAt: string;
  archived: boolean;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
  notes?: string;
}

interface HabitState {
  habits: Habit[];
  logs: HabitLog[];
  
  // Habit CRUD
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'archived'>) => Habit;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  archiveHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
  
  // Logging
  logHabit: (habitId: string, date: string, completed: boolean, notes?: string) => void;
  
  // Queries
  getActiveHabits: () => Habit[];
  getHabitLogs: (habitId: string, days: number) => HabitLog[];
  getCompletionRate: (habitId: string, days: number) => number;
  getDaysPracticed: (habitId: string) => number; // Not "streak" - no guilt
  getTodaysHabits: () => { habit: Habit; completed: boolean }[];
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: [],
      logs: [],
      
      addHabit: (habitData) => {
        const habit: Habit = {
          ...habitData,
          id: generateId(),
          createdAt: new Date().toISOString(),
          archived: false,
        };
        set((state) => ({ habits: [...state.habits, habit] }));
        return habit;
      },
      
      updateHabit: (id, updates) => {
        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === id ? { ...h, ...updates } : h
          ),
        }));
      },
      
      archiveHabit: (id) => {
        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === id ? { ...h, archived: true } : h
          ),
        }));
      },
      
      deleteHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id),
          logs: state.logs.filter((l) => l.habitId !== id),
        }));
      },
      
      logHabit: (habitId, date, completed, notes) => {
        const existingLog = get().logs.find(
          (l) => l.habitId === habitId && l.date === date
        );
        
        if (existingLog) {
          set((state) => ({
            logs: state.logs.map((l) =>
              l.id === existingLog.id ? { ...l, completed, notes } : l
            ),
          }));
        } else {
          set((state) => ({
            logs: [
              ...state.logs,
              { id: generateId(), habitId, date, completed, notes },
            ],
          }));
        }
      },
      
      getActiveHabits: () => {
        return get().habits.filter((h) => !h.archived);
      },
      
      getHabitLogs: (habitId, days) => {
        const { logs } = get();
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        const cutoffStr = cutoff.toISOString().split('T')[0];
        
        return logs.filter(
          (l) => l.habitId === habitId && l.date >= cutoffStr
        );
      },
      
      getCompletionRate: (habitId, days) => {
        const logs = get().getHabitLogs(habitId, days);
        if (logs.length === 0) return 0;
        const completed = logs.filter((l) => l.completed).length;
        return completed / days;
      },
      
      getDaysPracticed: (habitId) => {
        const { logs } = get();
        return logs.filter((l) => l.habitId === habitId && l.completed).length;
      },
      
      getTodaysHabits: () => {
        const { habits, logs } = get();
        const today = new Date().toISOString().split('T')[0];
        const dayOfWeek = new Date().getDay();
        
        return habits
          .filter((h) => {
            if (h.archived) return false;
            if (h.frequency === 'daily') return true;
            if (h.frequency === 'custom' && h.customDays) {
              return h.customDays.includes(dayOfWeek);
            }
            return true;
          })
          .map((habit) => {
            const log = logs.find(
              (l) => l.habitId === habit.id && l.date === today
            );
            return { habit, completed: log?.completed || false };
          });
      },
    }),
    {
      name: 'ollie-habits',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

### Settings Store

```typescript
// src/stores/settingsStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NotificationSettings {
  enabled: boolean;
  checkInReminder: {
    enabled: boolean;
    time: string; // "09:00"
  };
  habitReminders: boolean;
  gentleNudges: boolean;
}

interface PrivacySettings {
  analyticsEnabled: boolean;
  crashReportsEnabled: boolean;
}

interface AccessibilitySettings {
  reducedMotion: boolean;
  largeText: boolean;
  highContrast: boolean;
}

interface SettingsState {
  // Onboarding
  hasCompletedOnboarding: boolean;
  
  // User preferences
  name?: string;
  focusAreas: string[]; // e.g., ['anxiety', 'adhd', 'depression']
  
  // Settings
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  accessibility: AccessibilitySettings;
  
  // Theme
  theme: 'light' | 'dark' | 'system';
  
  // Actions
  completeOnboarding: () => void;
  setName: (name: string) => void;
  setFocusAreas: (areas: string[]) => void;
  updateNotifications: (settings: Partial<NotificationSettings>) => void;
  updatePrivacy: (settings: Partial<PrivacySettings>) => void;
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  resetAllSettings: () => void;
}

const defaultSettings: Omit<SettingsState, 'completeOnboarding' | 'setName' | 'setFocusAreas' | 'updateNotifications' | 'updatePrivacy' | 'updateAccessibility' | 'setTheme' | 'resetAllSettings'> = {
  hasCompletedOnboarding: false,
  name: undefined,
  focusAreas: [],
  notifications: {
    enabled: false,
    checkInReminder: {
      enabled: false,
      time: '09:00',
    },
    habitReminders: false,
    gentleNudges: false,
  },
  privacy: {
    analyticsEnabled: false,
    crashReportsEnabled: true,
  },
  accessibility: {
    reducedMotion: false,
    largeText: false,
    highContrast: false,
  },
  theme: 'system',
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      
      setName: (name) => set({ name }),
      
      setFocusAreas: (focusAreas) => set({ focusAreas }),
      
      updateNotifications: (settings) =>
        set((state) => ({
          notifications: { ...state.notifications, ...settings },
        })),
      
      updatePrivacy: (settings) =>
        set((state) => ({
          privacy: { ...state.privacy, ...settings },
        })),
      
      updateAccessibility: (settings) =>
        set((state) => ({
          accessibility: { ...state.accessibility, ...settings },
        })),
      
      setTheme: (theme) => set({ theme }),
      
      resetAllSettings: () => set(defaultSettings),
    }),
    {
      name: 'ollie-settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

---

## Advanced Patterns

### Computed Values (Selectors)

```typescript
// Efficient selectors to prevent unnecessary re-renders
const useCheckInCount = () => 
  useCheckInStore((state) => state.checkIns.length);

const useTodaysMood = () =>
  useCheckInStore((state) => {
    const today = new Date().toISOString().split('T')[0];
    const todaysCheckIns = state.checkIns.filter(
      (c) => c.timestamp.startsWith(today)
    );
    return todaysCheckIns[todaysCheckIns.length - 1]?.mood;
  });

// With shallow comparison for objects/arrays
import { shallow } from 'zustand/shallow';

const useRecentCheckIns = () =>
  useCheckInStore(
    (state) => state.getRecentCheckIns(7),
    shallow
  );
```

### Async Actions

```typescript
interface AsyncState {
  data: Data | null;
  isLoading: boolean;
  error: Error | null;
  
  fetchData: () => Promise<void>;
}

const useAsyncStore = create<AsyncState>((set) => ({
  data: null,
  isLoading: false,
  error: null,
  
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.fetchData();
      set({ data, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },
}));
```

### Combining Stores

```typescript
// Access one store from another
const useCombinedState = () => {
  const checkIns = useCheckInStore((s) => s.checkIns);
  const habits = useHabitStore((s) => s.habits);
  const settings = useSettingsStore((s) => s.focusAreas);
  
  return { checkIns, habits, settings };
};
```

### Middleware

```typescript
import { devtools, subscribeWithSelector } from 'zustand/middleware';

const useStore = create<State>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set, get) => ({
          // ... state and actions
        }),
        { name: 'store-name' }
      )
    ),
    { name: 'StoreName' }
  )
);

// Subscribe to specific state changes
useStore.subscribe(
  (state) => state.checkIns.length,
  (checkInCount, prevCount) => {
    if (checkInCount > prevCount) {
      // New check-in added
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }
);
```

---

## Data Management for Ollie

### Data Export

```typescript
// src/utils/dataExport.ts
import { useCheckInStore } from '@/stores/checkInStore';
import { useHabitStore } from '@/stores/habitStore';

export const exportUserData = async () => {
  const checkInState = useCheckInStore.getState();
  const habitState = useHabitStore.getState();
  
  const exportData = {
    exportDate: new Date().toISOString(),
    version: '1.0.0',
    checkIns: checkInState.checkIns,
    habits: habitState.habits,
    habitLogs: habitState.logs,
  };
  
  return JSON.stringify(exportData, null, 2);
};
```

### Data Deletion (GDPR/CCPA Compliance)

```typescript
// src/utils/dataManagement.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { useCheckInStore } from '@/stores/checkInStore';
import { useHabitStore } from '@/stores/habitStore';
import { useSettingsStore } from '@/stores/settingsStore';

export const deleteAllUserData = async () => {
  // Clear all Zustand persisted stores
  useCheckInStore.persist.clearStorage();
  useHabitStore.persist.clearStorage();
  useSettingsStore.persist.clearStorage();
  
  // Clear AsyncStorage completely
  await AsyncStorage.clear();
  
  // Clear SecureStore items
  try {
    await SecureStore.deleteItemAsync('userToken');
    // Add any other secure items
  } catch (e) {
    // Item might not exist
  }
  
  // Reset in-memory state
  useCheckInStore.setState({ checkIns: [], currentCheckIn: null });
  useHabitStore.setState({ habits: [], logs: [] });
  useSettingsStore.getState().resetAllSettings();
};
```

---

## Best Practices for Ollie

### 1. Keep Stores Focused
- One store per domain (check-ins, habits, settings)
- Don't create one massive store

### 2. Use Selectors
- Select only what you need
- Use `shallow` for object/array comparisons
- Memoize computed values

### 3. Handle Persistence Carefully
- Use AsyncStorage for general data
- Use SecureStore for sensitive notes/reflections
- Implement proper error handling for storage

### 4. TypeScript Everything
- Define all types explicitly
- Use discriminated unions for states
- Type all actions and selectors

### 5. Test State Logic
```typescript
// Store can be tested independently
import { useCheckInStore } from '@/stores/checkInStore';

describe('CheckIn Store', () => {
  beforeEach(() => {
    useCheckInStore.setState({ checkIns: [], currentCheckIn: null });
  });
  
  it('starts a new check-in', () => {
    useCheckInStore.getState().startCheckIn();
    expect(useCheckInStore.getState().currentCheckIn).not.toBeNull();
  });
  
  it('completes a check-in with mood', () => {
    const { startCheckIn, setMood, completeCheckIn } = useCheckInStore.getState();
    startCheckIn();
    setMood(3);
    const completed = completeCheckIn();
    expect(completed?.mood).toBe(3);
    expect(useCheckInStore.getState().checkIns).toHaveLength(1);
  });
});
```


