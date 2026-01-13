import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { spacing, borderRadius, shadows, layout } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface Pattern {
  id: string;
  insight: string;
  frequency: string;
  emoji: string;
  category?: string;
}

interface ReflectionPrompt {
  id: string;
  prompt: string;
  category: string;
  forConditions?: string[];
}

// Patterns Ollie has noticed
const patterns: Pattern[] = [
  // === MOOD PATTERNS ===
  {
    id: '1',
    insight: 'Self-criticism spikes after social situations',
    frequency: 'Noticed 4 times',
    emoji: '🔍',
    category: 'mood',
  },
  {
    id: '2',
    insight: 'Better days tend to follow outdoor time',
    frequency: 'Noticed 6 times',
    emoji: '🌳',
    category: 'mood',
  },
  {
    id: '3',
    insight: 'Rumination increases on low-sleep nights',
    frequency: 'Noticed 3 times',
    emoji: '😴',
    category: 'mood',
  },
  {
    id: '4',
    insight: 'Mornings are usually harder than afternoons',
    frequency: 'Noticed 5 times',
    emoji: '🌅',
    category: 'mood',
  },
  {
    id: '5',
    insight: 'Mood lifts after movement, even brief',
    frequency: 'Noticed 7 times',
    emoji: '🏃',
    category: 'mood',
  },
  
  // === TRIGGER PATTERNS ===
  {
    id: '6',
    insight: 'Comparison thoughts spike after social media',
    frequency: 'Noticed 4 times',
    emoji: '📱',
    category: 'triggers',
  },
  {
    id: '7',
    insight: 'Anxiety rises before uncertain situations',
    frequency: 'Noticed 6 times',
    emoji: '❓',
    category: 'triggers',
  },
  {
    id: '8',
    insight: 'Self-attack follows perceived mistakes',
    frequency: 'Noticed 5 times',
    emoji: '⚡',
    category: 'triggers',
  },
  {
    id: '9',
    insight: 'Isolation urges increase when overwhelmed',
    frequency: 'Noticed 3 times',
    emoji: '🚪',
    category: 'triggers',
  },
  
  // === RECOVERY PATTERNS ===
  {
    id: '10',
    insight: 'Recovery time is getting shorter',
    frequency: 'Over past 2 weeks',
    emoji: '📈',
    category: 'progress',
  },
  {
    id: '11',
    insight: 'Grounding tools are being used earlier',
    frequency: 'Noticed 4 times',
    emoji: '🌿',
    category: 'progress',
  },
  {
    id: '12',
    insight: 'You\'re catching spirals sooner',
    frequency: 'Noticed 3 times',
    emoji: '🎯',
    category: 'progress',
  },
  
  // === RELATIONSHIP PATTERNS ===
  {
    id: '13',
    insight: 'Connection helps even when hard to initiate',
    frequency: 'Noticed 4 times',
    emoji: '💬',
    category: 'relationships',
  },
  {
    id: '14',
    insight: 'Rejection sensitivity highest when tired',
    frequency: 'Noticed 3 times',
    emoji: '💔',
    category: 'relationships',
  },
];

// Reflection prompts by category and condition
const reflectionPrompts: ReflectionPrompt[] = [
  // === GENERAL ===
  { id: 'r1', prompt: 'When did you last feel okay, even briefly? What was different?', category: 'general' },
  { id: 'r2', prompt: 'What does your inner critic sound like? Whose voice is it?', category: 'general' },
  { id: 'r3', prompt: 'What would you tell a friend feeling what you feel right now?', category: 'general' },
  { id: 'r4', prompt: 'What\'s one thing you did this week that took effort?', category: 'general' },
  { id: 'r5', prompt: 'What do you need that you haven\'t been asking for?', category: 'general' },
  
  // === SELF-COMPASSION ===
  { id: 'r6', prompt: 'What would change if you believed you were doing your best?', category: 'compassion', forConditions: ['self-worth', 'shame'] },
  { id: 'r7', prompt: 'How old do you feel when you\'re hardest on yourself?', category: 'compassion', forConditions: ['self-worth', 'schema'] },
  { id: 'r8', prompt: 'What would it mean to be enough, exactly as you are?', category: 'compassion', forConditions: ['self-worth'] },
  { id: 'r9', prompt: 'Can you find compassion for the part of you that\'s struggling?', category: 'compassion' },
  { id: 'r10', prompt: 'What does the harshest part of you think it\'s protecting you from?', category: 'compassion', forConditions: ['self-worth', 'schema'] },
  
  // === SCHEMA / CORE BELIEFS ===
  { id: 'r11', prompt: 'What did you learn about yourself growing up that might not be true?', category: 'schema', forConditions: ['schema', 'self-worth'] },
  { id: 'r12', prompt: 'When you feel "not enough," what specific evidence comes to mind?', category: 'schema', forConditions: ['schema'] },
  { id: 'r13', prompt: 'What would your life look like if your worst belief about yourself wasn\'t true?', category: 'schema', forConditions: ['schema'] },
  { id: 'r14', prompt: 'Who first made you feel like you had to earn love?', category: 'schema', forConditions: ['schema', 'bpd'] },
  { id: 'r15', prompt: 'What pattern keeps showing up in your relationships?', category: 'schema', forConditions: ['schema', 'bpd', 'interpersonal'] },
  
  // === ANXIETY ===
  { id: 'r16', prompt: 'What\'s the worst case your mind is predicting? How likely is it, really?', category: 'anxiety', forConditions: ['anxiety'] },
  { id: 'r17', prompt: 'What would you do differently if you weren\'t afraid?', category: 'anxiety', forConditions: ['anxiety'] },
  { id: 'r18', prompt: 'What has worry protected you from? What has it cost you?', category: 'anxiety', forConditions: ['anxiety'] },
  { id: 'r19', prompt: 'What does your body feel like when anxiety is present?', category: 'anxiety', forConditions: ['anxiety'] },
  { id: 'r20', prompt: 'What would it mean to tolerate uncertainty?', category: 'anxiety', forConditions: ['anxiety', 'ocd'] },
  
  // === DEPRESSION ===
  { id: 'r21', prompt: 'What tiny action felt hard but you did anyway?', category: 'depression', forConditions: ['depression'] },
  { id: 'r22', prompt: 'What used to bring you joy? When did that change?', category: 'depression', forConditions: ['depression'] },
  { id: 'r23', prompt: 'What would you do tomorrow if energy wasn\'t a barrier?', category: 'depression', forConditions: ['depression'] },
  { id: 'r24', prompt: 'What\'s one area of life you\'re neglecting? What\'s the smallest step?', category: 'depression', forConditions: ['depression'] },
  { id: 'r25', prompt: 'What connection have you avoided that might help?', category: 'depression', forConditions: ['depression'] },
  
  // === ADHD ===
  { id: 'r26', prompt: 'What task are you avoiding? What\'s the 2-minute version?', category: 'adhd', forConditions: ['adhd'] },
  { id: 'r27', prompt: 'When do you find it easiest to focus? What\'s different then?', category: 'adhd', forConditions: ['adhd'] },
  { id: 'r28', prompt: 'What system have you tried that actually worked, even briefly?', category: 'adhd', forConditions: ['adhd'] },
  { id: 'r29', prompt: 'Where does shame about productivity come from?', category: 'adhd', forConditions: ['adhd', 'self-worth'] },
  { id: 'r30', prompt: 'What would change if you accepted your brain works differently?', category: 'adhd', forConditions: ['adhd'] },
  
  // === OCD ===
  { id: 'r31', prompt: 'What would it mean to live with uncertainty in this area?', category: 'ocd', forConditions: ['ocd'] },
  { id: 'r32', prompt: 'What does the compulsion promise? Does it deliver?', category: 'ocd', forConditions: ['ocd'] },
  { id: 'r33', prompt: 'What values are being crowded out by rituals?', category: 'ocd', forConditions: ['ocd'] },
  { id: 'r34', prompt: 'What if the thought is just a thought, not a command?', category: 'ocd', forConditions: ['ocd'] },
  
  // === BPD / EMOTIONAL INTENSITY ===
  { id: 'r35', prompt: 'What triggered this emotion? What about it felt threatening?', category: 'emotion', forConditions: ['bpd', 'emotion'] },
  { id: 'r36', prompt: 'What might the other person have been thinking or feeling?', category: 'emotion', forConditions: ['bpd', 'interpersonal'] },
  { id: 'r37', prompt: 'When emotions feel like facts, how do you check the facts?', category: 'emotion', forConditions: ['bpd', 'emotion'] },
  { id: 'r38', prompt: 'What does the intense emotion want to protect you from?', category: 'emotion', forConditions: ['bpd', 'emotion'] },
  { id: 'r39', prompt: 'Who do you feel most like yourself around?', category: 'emotion', forConditions: ['bpd'] },
  
  // === BODY IMAGE ===
  { id: 'r40', prompt: 'If your body could talk, what would it want you to know?', category: 'body', forConditions: ['body-dysmorphia'] },
  { id: 'r41', prompt: 'What has your body done for you today?', category: 'body', forConditions: ['body-dysmorphia'] },
  { id: 'r42', prompt: 'When did you first learn your body wasn\'t acceptable?', category: 'body', forConditions: ['body-dysmorphia', 'schema'] },
  { id: 'r43', prompt: 'What would you do if appearance wasn\'t taking up mental space?', category: 'body', forConditions: ['body-dysmorphia'] },
  
  // === VALUES / MEANING ===
  { id: 'r44', prompt: 'What matters most to you, beyond how you feel day-to-day?', category: 'values' },
  { id: 'r45', prompt: 'What kind of person do you want to be in this situation?', category: 'values' },
  { id: 'r46', prompt: 'What small action would align with what you value?', category: 'values' },
  { id: 'r47', prompt: 'What would make this hard day meaningful anyway?', category: 'values' },
  { id: 'r48', prompt: 'If you could only work on one area of life, which would matter most?', category: 'values' },
  
  // === RELATIONSHIPS ===
  { id: 'r49', prompt: 'What need are you hoping someone else will meet?', category: 'relationships', forConditions: ['interpersonal', 'bpd'] },
  { id: 'r50', prompt: 'What boundary have you been afraid to set?', category: 'relationships', forConditions: ['interpersonal'] },
  { id: 'r51', prompt: 'What do you assume others think of you? How do you know?', category: 'relationships', forConditions: ['interpersonal', 'anxiety'] },
  { id: 'r52', prompt: 'Who makes you feel safe? What\'s different about that connection?', category: 'relationships', forConditions: ['interpersonal', 'bpd'] },
];

const PatternCard = ({ pattern }: { pattern: Pattern }) => (
  <View style={styles.patternCard}>
    <Text style={styles.patternEmoji}>{pattern.emoji}</Text>
    <View style={styles.patternContent}>
      <Text style={styles.patternInsight}>{pattern.insight}</Text>
      <Text style={styles.patternFrequency}>{pattern.frequency}</Text>
    </View>
  </View>
);

export default function ReflectScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Reflect</Text>
          <Text style={styles.subtitle}>
            Patterns, not judgments.
          </Text>
        </View>

        {/* Ollie's observation */}
        <View style={styles.ollieCard}>
          <Text style={styles.ollieEmoji}>🦦</Text>
          <Text style={styles.ollieText}>
            Ollie notices things over time. Not to fix you — just to help you see.
          </Text>
        </View>

        {/* Patterns */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patterns Ollie noticed</Text>
          <View style={styles.patternsList}>
            {patterns.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} />
            ))}
          </View>
        </View>

        {/* Mood over time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mood this week</Text>
          <View style={styles.moodChart}>
            {[3, 2, 3, 4, 3, 2, 3].map((level, i) => (
              <View key={i} style={styles.moodBar}>
                <View 
                  style={[
                    styles.moodFill, 
                    { height: `${level * 20}%` },
                    { backgroundColor: colors.mood[level as 1|2|3|4|5] }
                  ]} 
                />
              </View>
            ))}
          </View>
          <View style={styles.moodLabels}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <Text key={i} style={styles.moodLabel}>{day}</Text>
            ))}
          </View>
          <Text style={styles.moodNote}>
            Ups and downs are normal. You're tracking, and that matters.
          </Text>
        </View>

        {/* Journal prompt */}
        <View style={styles.journalCard}>
          <Text style={styles.journalTitle}>Something to sit with</Text>
          <Text style={styles.journalPrompt}>
            "When did you last feel okay, even briefly? What was different?"
          </Text>
          <Pressable style={styles.journalButton}>
            <Text style={styles.journalButtonText}>Write about this</Text>
          </Pressable>
        </View>

        {/* Gentle reminder */}
        <View style={styles.reminder}>
          <Text style={styles.reminderText}>
            Reflection is optional. Only do this when you're stable.
            Crisis tools are always available.
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

  // Ollie card
  ollieCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[6],
  },
  ollieEmoji: {
    fontSize: 32,
    marginRight: spacing[3],
  },
  ollieText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    color: colors.primary[700],
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
  },

  // Section
  section: {
    marginBottom: spacing[8],
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing[4],
  },

  // Patterns
  patternsList: {
    gap: spacing[3],
  },
  patternCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    padding: spacing[4],
  },
  patternEmoji: {
    fontSize: 24,
    marginRight: spacing[3],
  },
  patternContent: {
    flex: 1,
  },
  patternInsight: {
    fontSize: typography.sizes.base,
    color: colors.text.primary,
    lineHeight: typography.sizes.base * typography.lineHeights.normal,
  },
  patternFrequency: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    marginTop: spacing[1],
  },

  // Mood chart
  moodChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 100,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing[3],
    paddingBottom: 0,
  },
  moodBar: {
    width: 24,
    height: '100%',
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.sm,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  moodFill: {
    width: '100%',
    borderRadius: borderRadius.sm,
  },
  moodLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing[3],
    marginTop: spacing[2],
  },
  moodLabel: {
    width: 24,
    textAlign: 'center',
    fontSize: typography.sizes.xs,
    color: colors.text.tertiary,
  },
  moodNote: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing[3],
  },

  // Journal
  journalCard: {
    backgroundColor: colors.accent[50],
    borderRadius: borderRadius.lg,
    padding: spacing[5],
    marginBottom: spacing[6],
  },
  journalTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.accent[600],
    marginBottom: spacing[2],
  },
  journalPrompt: {
    fontSize: typography.sizes.lg,
    color: colors.accent[800],
    fontStyle: 'italic',
    lineHeight: typography.sizes.lg * typography.lineHeights.relaxed,
    marginBottom: spacing[4],
  },
  journalButton: {
    backgroundColor: colors.accent[600],
    borderRadius: borderRadius.md,
    padding: spacing[3],
    alignItems: 'center',
  },
  journalButtonText: {
    color: colors.text.inverse,
    fontWeight: typography.weights.medium,
    fontSize: typography.sizes.base,
  },

  // Reminder
  reminder: {
    padding: spacing[4],
  },
  reminderText: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
  },
});

