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
  category?: string;
}

interface HabitSuggestion {
  id: string;
  name: string;
  icon: string;
  description: string;
  forConditions: string[];
  technique?: string;
}

// Current user habits
const sampleHabits: Habit[] = [
  { id: '1', name: 'Drink water', icon: '💧', daysPracticed: 12, todayDone: true, category: 'basics' },
  { id: '2', name: 'Step outside', icon: '🚪', daysPracticed: 8, todayDone: false, category: 'movement' },
  { id: '3', name: 'One small tidy', icon: '🧹', daysPracticed: 5, todayDone: false, category: 'adhd' },
  { id: '4', name: 'Check in with Ollie', icon: '🦦', daysPracticed: 15, todayDone: true, category: 'awareness' },
];

// Suggested habits organized by struggle/technique
const habitSuggestions: HabitSuggestion[] = [
  // === BASICS (Everyone) ===
  { id: 'water', name: 'Drink water', icon: '💧', description: 'One glass when you wake up', forConditions: ['all'], technique: 'behavioral-activation' },
  { id: 'outside', name: 'Step outside', icon: '🚪', description: 'Even for 30 seconds', forConditions: ['all', 'depression'], technique: 'behavioral-activation' },
  { id: 'daylight', name: 'See daylight', icon: '☀️', description: 'Natural light helps your rhythm', forConditions: ['all', 'depression'], technique: 'please-skills' },
  { id: 'sleep-time', name: 'Same sleep time', icon: '🌙', description: 'Consistency over perfection', forConditions: ['all'], technique: 'please-skills' },
  { id: 'one-meal', name: 'Eat one real meal', icon: '🍽️', description: 'Fuel matters', forConditions: ['all', 'depression'], technique: 'please-skills' },
  
  // === ADHD ===
  { id: 'body-double', name: 'Body double time', icon: '👥', description: 'Work alongside someone', forConditions: ['adhd'], technique: 'body-doubling' },
  { id: 'tiny-task', name: 'One tiny task', icon: '✅', description: '2-minute version only', forConditions: ['adhd'], technique: 'behavioral-activation' },
  { id: 'timer', name: 'Work with a timer', icon: '⏱️', description: 'External structure helps', forConditions: ['adhd'], technique: 'external-structure' },
  { id: 'one-tidy', name: 'One small tidy', icon: '🧹', description: 'Just one thing', forConditions: ['adhd'], technique: 'behavioral-activation' },
  { id: 'dopamine', name: 'Healthy dopamine', icon: '🎮', description: 'Choose from your menu', forConditions: ['adhd'], technique: 'dopamine-menu' },
  { id: 'habit-stack', name: 'Stack a habit', icon: '📚', description: 'Attach new to existing', forConditions: ['adhd'], technique: 'habit-stacking' },
  { id: 'brain-dump', name: 'Brain dump', icon: '🧠', description: 'Get it out of your head', forConditions: ['adhd'], technique: 'external-structure' },
  { id: 'movement-break', name: 'Movement break', icon: '🏃', description: 'When stuck, move first', forConditions: ['adhd'], technique: 'behavioral-activation' },
  
  // === DEPRESSION ===
  { id: 'get-dressed', name: 'Get dressed', icon: '👕', description: 'Even if staying home', forConditions: ['depression'], technique: 'behavioral-activation' },
  { id: 'shower', name: 'Shower or wash face', icon: '🚿', description: 'Water helps reset', forConditions: ['depression'], technique: 'behavioral-activation' },
  { id: 'one-message', name: 'Send one message', icon: '💬', description: 'Connection matters', forConditions: ['depression'], technique: 'behavioral-activation' },
  { id: 'pleasant', name: 'One pleasant thing', icon: '🌸', description: 'Tiny joy counts', forConditions: ['depression'], technique: 'behavioral-activation' },
  { id: 'mastery', name: 'One mastery task', icon: '💪', description: 'Something small you can do', forConditions: ['depression'], technique: 'build-mastery' },
  { id: 'leave-bed', name: 'Leave bed once', icon: '🛏️', description: 'Just for a moment', forConditions: ['depression'], technique: 'behavioral-activation' },
  { id: 'open-blinds', name: 'Open blinds', icon: '🪟', description: 'Let light in', forConditions: ['depression'], technique: 'behavioral-activation' },
  
  // === ANXIETY ===
  { id: 'morning-breath', name: 'Morning breathing', icon: '🌬️', description: '3 slow breaths to start', forConditions: ['anxiety'], technique: 'paced-breathing' },
  { id: 'grounding', name: 'Daily grounding', icon: '🌿', description: '5-4-3-2-1 check-in', forConditions: ['anxiety'], technique: 'grounding' },
  { id: 'worry-time', name: 'Worry time', icon: '📋', description: 'Scheduled, contained', forConditions: ['anxiety'], technique: 'worry-containment' },
  { id: 'limit-checking', name: 'Limit checking', icon: '📱', description: 'News/social only at set times', forConditions: ['anxiety', 'ocd'], technique: 'exposure' },
  { id: 'body-check', name: 'Body tension check', icon: '🫁', description: 'Notice and release', forConditions: ['anxiety'], technique: 'body-awareness' },
  { id: 'caffeine', name: 'Monitor caffeine', icon: '☕', description: 'Notice the connection', forConditions: ['anxiety'], technique: 'please-skills' },
  
  // === OCD ===
  { id: 'delay-compulsion', name: 'Delay a compulsion', icon: '⏸️', description: 'Wait 5 minutes', forConditions: ['ocd'], technique: 'erp' },
  { id: 'uncertainty-sit', name: 'Sit with uncertainty', icon: '❓', description: 'Practice not knowing', forConditions: ['ocd'], technique: 'uncertainty-tolerance' },
  { id: 'no-reassurance', name: 'Skip one reassurance', icon: '🚫', description: 'Resist asking "are you sure?"', forConditions: ['ocd'], technique: 'erp' },
  { id: 'exposure-task', name: 'One exposure task', icon: '🎯', description: 'From your hierarchy', forConditions: ['ocd'], technique: 'erp' },
  
  // === BPD / EMOTIONAL INTENSITY ===
  { id: 'dbt-skill', name: 'Practice one DBT skill', icon: '🧰', description: 'Even when calm', forConditions: ['bpd', 'emotion'], technique: 'dbt' },
  { id: 'diary-card', name: 'Diary card', icon: '📓', description: 'Track emotions and urges', forConditions: ['bpd'], technique: 'dbt-diary' },
  { id: 'opposite-action', name: 'Opposite action', icon: '↩️', description: 'When emotion doesn\'t fit facts', forConditions: ['bpd', 'emotion'], technique: 'dbt' },
  { id: 'check-facts', name: 'Check the facts', icon: '🔍', description: 'Before acting on emotion', forConditions: ['bpd', 'emotion'], technique: 'dbt' },
  { id: 'self-soothe', name: 'Self-soothe kit', icon: '🧸', description: 'Use one item from your kit', forConditions: ['bpd', 'emotion'], technique: 'distress-tolerance' },
  
  // === BODY IMAGE / BODY DYSMORPHIA ===
  { id: 'mirror-limit', name: 'Limit mirror time', icon: '🪞', description: 'Functional only', forConditions: ['body-dysmorphia'], technique: 'exposure' },
  { id: 'body-neutral', name: 'Body neutral moment', icon: '🫀', description: 'Thank your body for one thing', forConditions: ['body-dysmorphia'], technique: 'values' },
  { id: 'values-activity', name: 'Values-based activity', icon: '🎨', description: 'Do something not about appearance', forConditions: ['body-dysmorphia'], technique: 'act-values' },
  { id: 'media-limit', name: 'Limit comparison media', icon: '📵', description: 'Less social media scrolling', forConditions: ['body-dysmorphia'], technique: 'behavioral' },
  
  // === SELF-WORTH / SHAME ===
  { id: 'kind-word', name: 'One kind word to self', icon: '💗', description: 'Not affirmations, just not cruel', forConditions: ['self-worth', 'shame'], technique: 'self-compassion' },
  { id: 'notice-critic', name: 'Notice inner critic', icon: '👁️', description: 'Just notice, don\'t fix', forConditions: ['self-worth', 'shame'], technique: 'schema-awareness' },
  { id: 'evidence-against', name: 'Evidence against belief', icon: '📊', description: 'One small counter-example', forConditions: ['self-worth'], technique: 'cbt' },
  { id: 'self-compassion', name: 'Self-compassion break', icon: '🤲', description: 'Suffering, common humanity, kindness', forConditions: ['self-worth', 'shame'], technique: 'cft' },
  { id: 'good-enough', name: 'Good enough moment', icon: '✨', description: 'Notice when something was enough', forConditions: ['self-worth', 'perfectionism'], technique: 'schema' },
  
  // === RELATIONSHIPS / INTERPERSONAL ===
  { id: 'reach-out', name: 'Reach out to someone', icon: '📞', description: 'Connection, not isolation', forConditions: ['interpersonal', 'depression'], technique: 'interpersonal' },
  { id: 'boundary', name: 'Honor a boundary', icon: '🚧', description: 'Say no to one thing', forConditions: ['interpersonal', 'bpd'], technique: 'dbt-interpersonal' },
  { id: 'validation', name: 'Validate someone', icon: '👂', description: 'Practice understanding', forConditions: ['interpersonal'], technique: 'dbt-interpersonal' },
  { id: 'ask-need', name: 'Ask for one need', icon: '🙋', description: 'Practice assertiveness', forConditions: ['interpersonal'], technique: 'dear-man' },
  
  // === MINDFULNESS ===
  { id: 'mindful-meal', name: 'Mindful first bite', icon: '🥄', description: 'One bite, fully present', forConditions: ['mindfulness', 'all'], technique: 'mbct' },
  { id: 'anchor-moment', name: 'Anchor moment', icon: '⚓', description: 'Return to now', forConditions: ['mindfulness', 'anxiety'], technique: 'mbct' },
  { id: 'single-task', name: 'Single-task once', icon: '🎯', description: 'One thing at a time', forConditions: ['mindfulness', 'adhd'], technique: 'mbct' },
  { id: 'three-breaths', name: 'Three conscious breaths', icon: '🌬️', description: 'Pause and notice', forConditions: ['mindfulness', 'all'], technique: 'mbct' },
  
  // === VALUES / ACT ===
  { id: 'values-moment', name: 'Values moment', icon: '🧭', description: 'One action aligned with values', forConditions: ['values', 'depression'], technique: 'act' },
  { id: 'willing-moment', name: 'Willingness practice', icon: '🚪', description: 'Make room for discomfort', forConditions: ['values', 'anxiety'], technique: 'act' },
  { id: 'present-moment', name: 'Present moment', icon: '🎁', description: 'Notice you\'re here', forConditions: ['values', 'mindfulness'], technique: 'act' },
  
  // === GRATITUDE / POSITIVE ===
  { id: 'one-good', name: 'One good thing', icon: '✨', description: 'Not forced positivity, just noticing', forConditions: ['gratitude', 'depression'], technique: 'gratitude' },
  { id: 'savor', name: 'Savor something', icon: '🍵', description: 'Linger on a pleasant moment', forConditions: ['gratitude', 'depression'], technique: 'positive-psychology' },
  { id: 'kind-act', name: 'One kind act', icon: '🌻', description: 'For someone else', forConditions: ['gratitude', 'interpersonal'], technique: 'behavioral-activation' },
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

