/**
 * Ollie Type Definitions
 */

// Mood levels (1-5 scale)
export type MoodLevel = 1 | 2 | 3 | 4 | 5;

// Energy levels
export type EnergyLevel = 1 | 2 | 3 | 4 | 5;

// Self-talk tone
export type SelfTalkTone = 'kind' | 'neutral' | 'critical' | 'harsh';

// Emotion categories
export type EmotionCategory = 'pleasant' | 'unpleasant' | 'neutral';

// Check-in data
export interface CheckIn {
  id: string;
  timestamp: string;
  mood: MoodLevel;
  energy?: EnergyLevel;
  selfTalkTone?: SelfTalkTone;
  emotions?: string[];
  bodyFeelings?: string[];
  thoughts?: string;
  gratitude?: string;
}

// Habit definition
export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  customDays?: number[];
  reminder?: {
    enabled: boolean;
    time: string;
  };
  createdAt: string;
  archived: boolean;
}

// Habit log entry
export interface HabitLog {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
  notes?: string;
}

// Tool categories
export type ToolCategory = 
  | 'grounding'
  | 'breathing'
  | 'defusion'
  | 'distress-tolerance'
  | 'emotion-regulation'
  | 'values'
  | 'self-compassion'
  | 'behavioral-activation';

// Tool definition
export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  duration?: number; // in seconds
  forConditions?: string[];
  therapy?: string[]; // CBT, DBT, ACT, etc.
}

// Focus areas (conditions)
export type FocusArea = 
  | 'adhd'
  | 'anxiety'
  | 'depression'
  | 'bpd'
  | 'ocd'
  | 'body-dysmorphia'
  | 'self-loathing';

// App mode (from Product Vision)
export type AppMode = 'right-now' | 'daily' | 'reflection';

// Result pattern for async operations
export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };


