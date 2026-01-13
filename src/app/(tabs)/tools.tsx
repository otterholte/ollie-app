import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { spacing, borderRadius, shadows, layout } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface Tool {
  id: string;
  name: string;
  description: string;
  emoji: string;
  duration?: string;
  category: string;
}

const tools: Tool[] = [
  // === GROUNDING ===
  {
    id: 'breathing',
    name: 'Breathe',
    description: 'Slow down with paced breathing',
    emoji: '🌬️',
    duration: '2-5 min',
    category: 'grounding',
  },
  {
    id: 'grounding',
    name: 'Ground',
    description: '5-4-3-2-1 sensory anchor',
    emoji: '🌿',
    duration: '2 min',
    category: 'grounding',
  },
  {
    id: 'body-scan',
    name: 'Body scan',
    description: 'Notice where tension lives',
    emoji: '🫁',
    duration: '5 min',
    category: 'grounding',
  },
  {
    id: 'cold-water',
    name: 'Cold reset',
    description: 'TIPP skill: cold water to calm fast',
    emoji: '🧊',
    duration: '30 sec',
    category: 'grounding',
  },
  
  // === DISTRESS TOLERANCE ===
  {
    id: 'urge-surfing',
    name: 'Surf the urge',
    description: 'Watch it rise and fall',
    emoji: '🌊',
    duration: '5-10 min',
    category: 'distress',
  },
  {
    id: 'tipp',
    name: 'TIPP',
    description: 'Temperature, intense exercise, paced breathing, progressive relaxation',
    emoji: '⚡',
    duration: '5-10 min',
    category: 'distress',
  },
  {
    id: 'stop-skill',
    name: 'STOP',
    description: 'Stop, take a step back, observe, proceed mindfully',
    emoji: '🛑',
    duration: '1 min',
    category: 'distress',
  },
  {
    id: 'radical-acceptance',
    name: 'Radical acceptance',
    description: 'Fighting reality makes pain worse',
    emoji: '🕊️',
    duration: '5 min',
    category: 'distress',
  },
  {
    id: 'pros-cons',
    name: 'Pros & cons',
    description: 'Acting on urge vs. resisting it',
    emoji: '⚖️',
    duration: '3-5 min',
    category: 'distress',
  },
  
  // === THOUGHT WORK ===
  {
    id: 'thought-naming',
    name: 'Name the thought',
    description: 'Label it, don\'t fight it',
    emoji: '💭',
    duration: '3 min',
    category: 'thought-work',
  },
  {
    id: 'thought-record',
    name: 'Thought record',
    description: 'Examine the evidence',
    emoji: '📝',
    duration: '5-10 min',
    category: 'thought-work',
  },
  {
    id: 'defusion',
    name: 'Defusion',
    description: '"I\'m having the thought that..."',
    emoji: '🎈',
    duration: '2 min',
    category: 'thought-work',
  },
  {
    id: 'leaves-on-stream',
    name: 'Leaves on a stream',
    description: 'Watch thoughts float by',
    emoji: '🍃',
    duration: '5 min',
    category: 'thought-work',
  },
  {
    id: 'check-the-facts',
    name: 'Check the facts',
    description: 'Is my emotion fitting the facts?',
    emoji: '🔍',
    duration: '5 min',
    category: 'thought-work',
  },
  
  // === EMOTION REGULATION ===
  {
    id: 'opposite-action',
    name: 'Opposite action',
    description: 'Do what the emotion doesn\'t want',
    emoji: '↩️',
    duration: '5 min',
    category: 'emotion',
  },
  {
    id: 'emotion-wave',
    name: 'Ride the wave',
    description: 'Emotions peak then pass',
    emoji: '🌊',
    duration: '5-10 min',
    category: 'emotion',
  },
  {
    id: 'name-the-emotion',
    name: 'Name the emotion',
    description: 'Name it to tame it',
    emoji: '🏷️',
    duration: '2 min',
    category: 'emotion',
  },
  {
    id: 'please-skills',
    name: 'PLEASE check',
    description: 'Physical care for emotional health',
    emoji: '💊',
    duration: '2 min',
    category: 'emotion',
  },
  
  // === BEHAVIORAL ===
  {
    id: 'one-small-thing',
    name: 'One small thing',
    description: 'The tiniest action you can take',
    emoji: '👣',
    duration: '2-5 min',
    category: 'behavioral',
  },
  {
    id: 'dopamine-menu',
    name: 'Dopamine menu',
    description: 'Healthy things that feel good',
    emoji: '🍽️',
    duration: '3 min',
    category: 'behavioral',
  },
  {
    id: 'body-doubling',
    name: 'Body doubling',
    description: 'Presence helps you start',
    emoji: '👥',
    duration: 'varies',
    category: 'behavioral',
  },
  
  // === COMPASSION ===
  {
    id: 'self-compassion',
    name: 'Self-compassion break',
    description: 'Not affirmations. Just kindness.',
    emoji: '🤲',
    duration: '3 min',
    category: 'compassion',
  },
  {
    id: 'inner-critic',
    name: 'Inner critic work',
    description: 'Recognize and respond to the harsh voice',
    emoji: '🗣️',
    duration: '5 min',
    category: 'compassion',
  },
  {
    id: 'loving-kindness',
    name: 'Loving-kindness',
    description: 'May I be safe, healthy, at ease',
    emoji: '💗',
    duration: '5 min',
    category: 'compassion',
  },
  {
    id: 'letter-to-self',
    name: 'Letter to yourself',
    description: 'What would a friend say?',
    emoji: '✉️',
    duration: '5-10 min',
    category: 'compassion',
  },
  
  // === VALUES ===
  {
    id: 'values-check',
    name: 'Values check',
    description: 'What matters most right now?',
    emoji: '🧭',
    duration: '3 min',
    category: 'values',
  },
  {
    id: 'committed-action',
    name: 'Committed action',
    description: 'One values-aligned step',
    emoji: '🎯',
    duration: '5 min',
    category: 'values',
  },
  
  // === MINDFULNESS ===
  {
    id: 'three-minute-space',
    name: '3-minute breathing space',
    description: 'Awareness, gathering, expanding',
    emoji: '🕐',
    duration: '3 min',
    category: 'mindfulness',
  },
  {
    id: 'mindful-moment',
    name: 'Mindful moment',
    description: 'One thing, fully present',
    emoji: '🧘',
    duration: '1-2 min',
    category: 'mindfulness',
  },
  {
    id: 'anchor-breath',
    name: 'Anchor breath',
    description: 'Return to now, again and again',
    emoji: '⚓',
    duration: '2 min',
    category: 'mindfulness',
  },
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'grounding', name: 'Grounding' },
  { id: 'distress', name: 'Distress' },
  { id: 'thought-work', name: 'Thoughts' },
  { id: 'emotion', name: 'Emotions' },
  { id: 'behavioral', name: 'Action' },
  { id: 'compassion', name: 'Compassion' },
  { id: 'values', name: 'Values' },
  { id: 'mindfulness', name: 'Mindfulness' },
];

const ToolCard = ({ tool }: { tool: Tool }) => (
  <Pressable
    onPress={() => router.push(`/tool/${tool.id}`)}
    style={({ pressed }) => [
      styles.toolCard,
      pressed && styles.toolCardPressed,
    ]}
  >
    <Text style={styles.toolEmoji}>{tool.emoji}</Text>
    <View style={styles.toolContent}>
      <Text style={styles.toolName}>{tool.name}</Text>
      <Text style={styles.toolDescription}>{tool.description}</Text>
    </View>
    {tool.duration && (
      <Text style={styles.toolDuration}>{tool.duration}</Text>
    )}
  </Pressable>
);

export default function ToolsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Tools</Text>
          <Text style={styles.subtitle}>
            Evidence-based. No fluff.
          </Text>
        </View>

        {/* Category pills */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((cat) => (
            <Pressable
              key={cat.id}
              style={[
                styles.categoryPill,
                cat.id === 'all' && styles.categoryPillActive,
              ]}
            >
              <Text style={[
                styles.categoryText,
                cat.id === 'all' && styles.categoryTextActive,
              ]}>
                {cat.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Tool cards */}
        <View style={styles.toolList}>
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </View>

        {/* Footer note */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            These tools are from CBT, DBT, ACT, and self-compassion research.
            They're not magic — they're practice.
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
    paddingBottom: 40,
  },
  header: {
    padding: layout.screenPaddingHorizontal,
    paddingTop: spacing[4],
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

  // Categories
  categories: {
    marginTop: spacing[4],
  },
  categoriesContent: {
    paddingHorizontal: layout.screenPaddingHorizontal,
    gap: spacing[2],
  },
  categoryPill: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  categoryPillActive: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  categoryText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text.secondary,
  },
  categoryTextActive: {
    color: colors.text.inverse,
  },

  // Tool list
  toolList: {
    padding: layout.screenPaddingHorizontal,
    paddingTop: spacing[6],
    gap: spacing[3],
  },
  toolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    ...shadows.sm,
  },
  toolCardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
  toolEmoji: {
    fontSize: 28,
    marginRight: spacing[4],
  },
  toolContent: {
    flex: 1,
  },
  toolName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  },
  toolDescription: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginTop: spacing[0.5],
  },
  toolDuration: {
    fontSize: typography.sizes.xs,
    color: colors.text.tertiary,
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
  },

  // Footer
  footer: {
    padding: layout.screenPaddingHorizontal,
    paddingTop: spacing[6],
  },
  footerText: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
  },
});

