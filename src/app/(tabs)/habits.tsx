import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { spacing, borderRadius, shadows, layout } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface Habit {
  id: string;
  name: string;
  icon: string;
  daysPracticed: number;
  todayDone: boolean;
}

const sampleHabits: Habit[] = [
  { id: '1', name: 'Drink water', icon: '💧', daysPracticed: 12, todayDone: true },
  { id: '2', name: 'Step outside', icon: '🚪', daysPracticed: 8, todayDone: false },
  { id: '3', name: 'One small tidy', icon: '🧹', daysPracticed: 5, todayDone: false },
  { id: '4', name: 'Check in with Ollie', icon: '🦦', daysPracticed: 15, todayDone: true },
];

const HabitRow = ({ habit, onToggle }: { habit: Habit; onToggle: () => void }) => (
  <View style={styles.habitRow}>
    <Pressable
      onPress={onToggle}
      style={[styles.habitCheckbox, habit.todayDone && styles.habitCheckboxDone]}
    >
      {habit.todayDone && <Text style={styles.checkmark}>✓</Text>}
    </Pressable>
    <View style={styles.habitInfo}>
      <Text style={styles.habitName}>
        {habit.icon} {habit.name}
      </Text>
      <Text style={styles.habitStats}>
        {habit.daysPracticed} days practiced
      </Text>
    </View>
  </View>
);

export default function HabitsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Habits</Text>
          <Text style={styles.subtitle}>
            No streaks. No pressure. Just practice.
          </Text>
        </View>

        {/* Philosophy note */}
        <View style={styles.philosophyCard}>
          <Text style={styles.philosophyText}>
            These aren't goals to achieve — they're anchors for hard days.
            Miss one? That's expected. Come back when you can.
          </Text>
        </View>

        {/* Habits list */}
        <View style={styles.habitsList}>
          {sampleHabits.map((habit) => (
            <HabitRow 
              key={habit.id} 
              habit={habit} 
              onToggle={() => {}}
            />
          ))}
        </View>

        {/* Add habit button */}
        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add a small habit</Text>
        </Pressable>

        {/* Weekly view placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This week</Text>
          <View style={styles.weekView}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <View key={i} style={styles.weekDay}>
                <Text style={styles.weekDayLabel}>{day}</Text>
                <View style={[
                  styles.weekDot,
                  i < 3 && styles.weekDotFilled,
                  i === 3 && styles.weekDotToday,
                ]} />
              </View>
            ))}
          </View>
          <Text style={styles.weekNote}>
            You've shown up 3 times this week. That's real.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
  header: {
    paddingTop: spacing[4],
    marginBottom: spacing[6],
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },

  // Philosophy card
  philosophyCard: {
    backgroundColor: colors.secondary[50],
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[6],
  },
  philosophyText: {
    fontSize: typography.sizes.sm,
    color: colors.secondary[700],
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
  },

  // Habits list
  habitsList: {
    gap: spacing[2],
    marginBottom: spacing[6],
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    padding: spacing[4],
  },
  habitCheckbox: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.neutral[300],
    marginRight: spacing[4],
    alignItems: 'center',
    justifyContent: 'center',
  },
  habitCheckboxDone: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  checkmark: {
    color: colors.text.inverse,
    fontSize: 16,
    fontWeight: typography.weights.bold,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
  },
  habitStats: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    marginTop: spacing[0.5],
  },

  // Add button
  addButton: {
    borderWidth: 2,
    borderColor: colors.divider,
    borderStyle: 'dashed',
    borderRadius: borderRadius.md,
    padding: spacing[4],
    alignItems: 'center',
    marginBottom: spacing[8],
  },
  addButtonText: {
    fontSize: typography.sizes.base,
    color: colors.text.tertiary,
  },

  // Section
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing[4],
  },

  // Week view
  weekView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
  },
  weekDay: {
    alignItems: 'center',
    gap: spacing[2],
  },
  weekDayLabel: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    fontWeight: typography.weights.medium,
  },
  weekDot: {
    width: 12,
    height: 12,
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral[200],
  },
  weekDotFilled: {
    backgroundColor: colors.primary[400],
  },
  weekDotToday: {
    backgroundColor: colors.neutral[200],
    borderWidth: 2,
    borderColor: colors.primary[400],
  },
  weekNote: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

