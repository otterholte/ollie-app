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
}

const patterns: Pattern[] = [
  {
    id: '1',
    insight: 'Self-criticism spikes after social situations',
    frequency: 'Noticed 4 times',
    emoji: '🔍',
  },
  {
    id: '2',
    insight: 'Better days tend to follow outdoor time',
    frequency: 'Noticed 6 times',
    emoji: '🌳',
  },
  {
    id: '3',
    insight: 'Rumination increases on low-sleep nights',
    frequency: 'Noticed 3 times',
    emoji: '😴',
  },
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

