import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { colors } from '@/constants/colors';
import { spacing, borderRadius, shadows, layout } from '@/constants/spacing';
import { typography, textStyles } from '@/constants/typography';

// Ollie the Otter component
const OllieCompanion = () => {
  const floatY = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    // Gentle floating animation
    floatY.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
    
    // Subtle rotation
    rotate.value = withRepeat(
      withSequence(
        withTiming(-2, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(2, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: floatY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View style={[styles.ollieContainer, animatedStyle]}>
      <Text style={styles.ollieEmoji}>🦦</Text>
      <View style={styles.ollieWater}>
        <Text style={styles.waterWave}>〰️</Text>
      </View>
    </Animated.View>
  );
};

// Quick action button component
const QuickAction = ({ 
  title, 
  subtitle, 
  onPress, 
  variant = 'default' 
}: { 
  title: string; 
  subtitle: string; 
  onPress: () => void;
  variant?: 'default' | 'primary' | 'urgent';
}) => {
  const bgColor = {
    default: colors.background.secondary,
    primary: colors.primary[50],
    urgent: colors.accent[50],
  }[variant];

  const borderColor = {
    default: colors.divider,
    primary: colors.primary[200],
    urgent: colors.accent[200],
  }[variant];

  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.quickAction,
        { backgroundColor: bgColor, borderColor },
        pressed && styles.quickActionPressed,
      ]}
    >
      <Text style={styles.quickActionTitle}>{title}</Text>
      <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
    </Pressable>
  );
};

// Daily task item
const DailyTask = ({ 
  task, 
  completed, 
  onToggle 
}: { 
  task: string; 
  completed: boolean; 
  onToggle: () => void;
}) => (
  <Pressable 
    onPress={onToggle}
    style={[styles.taskItem, completed && styles.taskItemCompleted]}
  >
    <View style={[styles.taskCheckbox, completed && styles.taskCheckboxChecked]}>
      {completed && <Text style={styles.checkmark}>✓</Text>}
    </View>
    <Text style={[styles.taskText, completed && styles.taskTextCompleted]}>
      {task}
    </Text>
  </Pressable>
);

export default function TodayScreen() {
  const greeting = getGreeting();
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Ollie */}
        <View style={styles.header}>
          <OllieCompanion />
          <View style={styles.greeting}>
            <Text style={styles.greetingText}>{greeting}</Text>
            <Text style={styles.ollieMessage}>
              Ollie's here. No rush.
            </Text>
          </View>
        </View>

        {/* Right Now Button - Most prominent */}
        <Pressable 
          onPress={() => router.push('/float')}
          style={({ pressed }) => [
            styles.floatButton,
            pressed && styles.floatButtonPressed,
          ]}
        >
          <Text style={styles.floatButtonEmoji}>🌊</Text>
          <View style={styles.floatButtonText}>
            <Text style={styles.floatButtonTitle}>Need to float?</Text>
            <Text style={styles.floatButtonSubtitle}>
              For overwhelming moments
            </Text>
          </View>
        </Pressable>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick actions</Text>
          <View style={styles.quickActions}>
            <QuickAction
              title="Check in"
              subtitle="How are you?"
              onPress={() => router.push('/check-in')}
              variant="primary"
            />
            <QuickAction
              title="Breathe"
              subtitle="2 minutes"
              onPress={() => router.push('/tool/breathing')}
            />
          </View>
        </View>

        {/* Today's small tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Something small</Text>
          <Text style={styles.sectionSubtitle}>
            Not goals. Just options.
          </Text>
          <View style={styles.taskList}>
            <DailyTask 
              task="Drink some water" 
              completed={false} 
              onToggle={() => {}} 
            />
            <DailyTask 
              task="Step outside for a moment" 
              completed={false} 
              onToggle={() => {}} 
            />
            <DailyTask 
              task="Send one message to someone" 
              completed={false} 
              onToggle={() => {}} 
            />
          </View>
        </View>

        {/* Gentle insight */}
        <View style={styles.insightCard}>
          <Text style={styles.insightEmoji}>💭</Text>
          <Text style={styles.insightText}>
            You showed up today. That's something.
          </Text>
        </View>

        {/* Crisis resources - always visible */}
        <Pressable 
          onPress={() => router.push('/tool/crisis')}
          style={styles.crisisLink}
        >
          <Text style={styles.crisisText}>Need immediate support?</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: layout.screenPaddingHorizontal,
    paddingBottom: 40,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[8],
    marginTop: spacing[4],
  },
  ollieContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ollieEmoji: {
    fontSize: 56,
  },
  ollieWater: {
    position: 'absolute',
    bottom: 0,
  },
  waterWave: {
    fontSize: 24,
    opacity: 0.3,
  },
  greeting: {
    flex: 1,
    marginLeft: spacing[4],
  },
  greetingText: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  },
  ollieMessage: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },

  // Float button
  floatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent[50],
    borderRadius: borderRadius.xl,
    padding: spacing[5],
    marginBottom: spacing[8],
    borderWidth: 1,
    borderColor: colors.accent[200],
    ...shadows.base,
  },
  floatButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  floatButtonEmoji: {
    fontSize: 32,
    marginRight: spacing[4],
  },
  floatButtonText: {
    flex: 1,
  },
  floatButtonTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.accent[700],
  },
  floatButtonSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.accent[600],
    marginTop: spacing[0.5],
  },

  // Sections
  section: {
    marginBottom: spacing[8],
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  sectionSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    marginBottom: spacing[4],
  },

  // Quick actions
  quickActions: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  quickAction: {
    flex: 1,
    padding: spacing[4],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
  },
  quickActionPressed: {
    opacity: 0.8,
  },
  quickActionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
  },
  quickActionSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },

  // Tasks
  taskList: {
    gap: spacing[2],
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    padding: spacing[4],
    borderRadius: borderRadius.md,
  },
  taskItemCompleted: {
    backgroundColor: colors.primary[50],
  },
  taskCheckbox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.neutral[300],
    marginRight: spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskCheckboxChecked: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  checkmark: {
    color: colors.text.inverse,
    fontSize: 14,
    fontWeight: typography.weights.bold,
  },
  taskText: {
    fontSize: typography.sizes.base,
    color: colors.text.primary,
    flex: 1,
  },
  taskTextCompleted: {
    color: colors.text.secondary,
    textDecorationLine: 'line-through',
  },

  // Insight card
  insightCard: {
    backgroundColor: colors.secondary[50],
    borderRadius: borderRadius.lg,
    padding: spacing[5],
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  insightEmoji: {
    fontSize: 24,
    marginBottom: spacing[2],
  },
  insightText: {
    fontSize: typography.sizes.base,
    color: colors.secondary[700],
    textAlign: 'center',
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
  },

  // Crisis link
  crisisLink: {
    alignItems: 'center',
    padding: spacing[4],
  },
  crisisText: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    textDecorationLine: 'underline',
  },
});

