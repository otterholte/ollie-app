import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
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
  forStruggles: string[];
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
    forStruggles: ['anxiety', 'panic', 'overwhelm', 'anger', 'all'],
  },
  {
    id: 'grounding',
    name: 'Ground',
    description: '5-4-3-2-1 sensory anchor',
    emoji: '🌿',
    duration: '2 min',
    category: 'grounding',
    forStruggles: ['anxiety', 'panic', 'dissociation', 'overwhelm', 'all'],
  },
  {
    id: 'body-scan',
    name: 'Body scan',
    description: 'Notice where tension lives',
    emoji: '🫁',
    duration: '5 min',
    category: 'grounding',
    forStruggles: ['anxiety', 'stress', 'disconnection', 'all'],
  },
  {
    id: 'cold-water',
    name: 'Cold reset',
    description: 'TIPP skill: cold water to calm fast',
    emoji: '🧊',
    duration: '30 sec',
    category: 'grounding',
    forStruggles: ['panic', 'intense-emotions', 'anger', 'overwhelm'],
  },
  
  // === DISTRESS TOLERANCE ===
  {
    id: 'urge-surfing',
    name: 'Surf the urge',
    description: 'Watch it rise and fall',
    emoji: '🌊',
    duration: '5-10 min',
    category: 'distress',
    forStruggles: ['self-harm', 'addiction', 'compulsions', 'binge', 'ocd'],
  },
  {
    id: 'tipp',
    name: 'TIPP',
    description: 'Temperature, intense exercise, paced breathing, relaxation',
    emoji: '⚡',
    duration: '5-10 min',
    category: 'distress',
    forStruggles: ['panic', 'intense-emotions', 'crisis', 'bpd'],
  },
  {
    id: 'stop-skill',
    name: 'STOP',
    description: 'Stop, take a step back, observe, proceed',
    emoji: '🛑',
    duration: '1 min',
    category: 'distress',
    forStruggles: ['impulsivity', 'anger', 'bpd', 'adhd'],
  },
  {
    id: 'radical-acceptance',
    name: 'Radical acceptance',
    description: 'Fighting reality makes pain worse',
    emoji: '🕊️',
    duration: '5 min',
    category: 'distress',
    forStruggles: ['grief', 'loss', 'unchangeable', 'chronic', 'bpd'],
  },
  {
    id: 'pros-cons',
    name: 'Pros & cons',
    description: 'Acting on urge vs. resisting it',
    emoji: '⚖️',
    duration: '3-5 min',
    category: 'distress',
    forStruggles: ['impulsivity', 'self-harm', 'addiction', 'bpd'],
  },
  
  // === THOUGHT WORK ===
  {
    id: 'thought-naming',
    name: 'Name the thought',
    description: 'Label it, don\'t fight it',
    emoji: '💭',
    duration: '3 min',
    category: 'thought-work',
    forStruggles: ['rumination', 'anxiety', 'depression', 'ocd', 'all'],
  },
  {
    id: 'thought-record',
    name: 'Thought record',
    description: 'Examine the evidence',
    emoji: '📝',
    duration: '5-10 min',
    category: 'thought-work',
    forStruggles: ['depression', 'anxiety', 'self-worth', 'negative-thinking'],
  },
  {
    id: 'defusion',
    name: 'Defusion',
    description: '"I\'m having the thought that..."',
    emoji: '🎈',
    duration: '2 min',
    category: 'thought-work',
    forStruggles: ['anxiety', 'ocd', 'rumination', 'self-attack', 'all'],
  },
  {
    id: 'leaves-on-stream',
    name: 'Leaves on a stream',
    description: 'Watch thoughts float by',
    emoji: '🍃',
    duration: '5 min',
    category: 'thought-work',
    forStruggles: ['anxiety', 'rumination', 'ocd', 'overwhelm'],
  },
  {
    id: 'check-the-facts',
    name: 'Check the facts',
    description: 'Is my emotion fitting the facts?',
    emoji: '🔍',
    duration: '5 min',
    category: 'thought-work',
    forStruggles: ['bpd', 'anxiety', 'jealousy', 'paranoia', 'intense-emotions'],
  },
  
  // === EMOTION REGULATION ===
  {
    id: 'opposite-action',
    name: 'Opposite action',
    description: 'Do what the emotion doesn\'t want',
    emoji: '↩️',
    duration: '5 min',
    category: 'emotion',
    forStruggles: ['depression', 'anxiety', 'shame', 'anger', 'bpd'],
  },
  {
    id: 'emotion-wave',
    name: 'Ride the wave',
    description: 'Emotions peak then pass',
    emoji: '🌊',
    duration: '5-10 min',
    category: 'emotion',
    forStruggles: ['bpd', 'intense-emotions', 'panic', 'grief'],
  },
  {
    id: 'name-the-emotion',
    name: 'Name the emotion',
    description: 'Name it to tame it',
    emoji: '🏷️',
    duration: '2 min',
    category: 'emotion',
    forStruggles: ['alexithymia', 'confusion', 'bpd', 'all'],
  },
  {
    id: 'please-skills',
    name: 'PLEASE check',
    description: 'Physical care for emotional health',
    emoji: '💊',
    duration: '2 min',
    category: 'emotion',
    forStruggles: ['depression', 'anxiety', 'mood-swings', 'all'],
  },
  
  // === BEHAVIORAL ===
  {
    id: 'one-small-thing',
    name: 'One small thing',
    description: 'The tiniest action you can take',
    emoji: '👣',
    duration: '2-5 min',
    category: 'behavioral',
    forStruggles: ['depression', 'overwhelm', 'adhd', 'paralysis', 'all'],
  },
  {
    id: 'dopamine-menu',
    name: 'Dopamine menu',
    description: 'Healthy things that feel good',
    emoji: '🍽️',
    duration: '3 min',
    category: 'behavioral',
    forStruggles: ['adhd', 'depression', 'anhedonia', 'boredom'],
  },
  {
    id: 'body-doubling',
    name: 'Body doubling',
    description: 'Presence helps you start',
    emoji: '👥',
    duration: 'varies',
    category: 'behavioral',
    forStruggles: ['adhd', 'paralysis', 'procrastination', 'isolation'],
  },
  
  // === COMPASSION ===
  {
    id: 'self-compassion',
    name: 'Self-compassion break',
    description: 'Not affirmations. Just kindness.',
    emoji: '🤲',
    duration: '3 min',
    category: 'compassion',
    forStruggles: ['self-worth', 'shame', 'self-attack', 'perfectionism', 'all'],
  },
  {
    id: 'inner-critic',
    name: 'Inner critic work',
    description: 'Recognize and respond to the harsh voice',
    emoji: '🗣️',
    duration: '5 min',
    category: 'compassion',
    forStruggles: ['self-worth', 'self-attack', 'shame', 'perfectionism'],
  },
  {
    id: 'loving-kindness',
    name: 'Loving-kindness',
    description: 'May I be safe, healthy, at ease',
    emoji: '💗',
    duration: '5 min',
    category: 'compassion',
    forStruggles: ['self-worth', 'isolation', 'anger', 'resentment'],
  },
  {
    id: 'letter-to-self',
    name: 'Letter to yourself',
    description: 'What would a friend say?',
    emoji: '✉️',
    duration: '5-10 min',
    category: 'compassion',
    forStruggles: ['self-worth', 'shame', 'failure', 'self-attack'],
  },
  
  // === VALUES ===
  {
    id: 'values-check',
    name: 'Values check',
    description: 'What matters most right now?',
    emoji: '🧭',
    duration: '3 min',
    category: 'values',
    forStruggles: ['depression', 'lost', 'meaninglessness', 'decisions'],
  },
  {
    id: 'committed-action',
    name: 'Committed action',
    description: 'One values-aligned step',
    emoji: '🎯',
    duration: '5 min',
    category: 'values',
    forStruggles: ['depression', 'avoidance', 'stuck', 'meaninglessness'],
  },
  
  // === MINDFULNESS ===
  {
    id: 'three-minute-space',
    name: '3-minute breathing space',
    description: 'Awareness, gathering, expanding',
    emoji: '🕐',
    duration: '3 min',
    category: 'mindfulness',
    forStruggles: ['overwhelm', 'stress', 'autopilot', 'all'],
  },
  {
    id: 'mindful-moment',
    name: 'Mindful moment',
    description: 'One thing, fully present',
    emoji: '🧘',
    duration: '1-2 min',
    category: 'mindfulness',
    forStruggles: ['adhd', 'overwhelm', 'dissociation', 'all'],
  },
  {
    id: 'anchor-breath',
    name: 'Anchor breath',
    description: 'Return to now, again and again',
    emoji: '⚓',
    duration: '2 min',
    category: 'mindfulness',
    forStruggles: ['anxiety', 'rumination', 'dissociation', 'all'],
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

const struggles = [
  { id: 'all', name: 'All', emoji: '🌟' },
  { id: 'anxiety', name: 'Anxious', emoji: '😰' },
  { id: 'depression', name: 'Low', emoji: '😔' },
  { id: 'overwhelm', name: 'Overwhelmed', emoji: '🌀' },
  { id: 'self-worth', name: 'Self-attack', emoji: '💔' },
  { id: 'anger', name: 'Angry', emoji: '😤' },
  { id: 'panic', name: 'Panicking', emoji: '😱' },
  { id: 'bpd', name: 'Intense emotions', emoji: '🌊' },
  { id: 'adhd', name: 'Can\'t focus', emoji: '🧠' },
  { id: 'ocd', name: 'Intrusive thoughts', emoji: '🔄' },
  { id: 'shame', name: 'Shame', emoji: '😣' },
  { id: 'rumination', name: 'Stuck in head', emoji: '💭' },
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStruggle, setSelectedStruggle] = useState('all');

  // Filter tools based on category and struggle
  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesStruggle = selectedStruggle === 'all' || 
      tool.forStruggles.includes(selectedStruggle) || 
      tool.forStruggles.includes('all');
    return matchesCategory && matchesStruggle;
  });

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

        {/* What are you struggling with? */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>What's coming up for you?</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.struggles}
            contentContainerStyle={styles.strugglesContent}
          >
            {struggles.map((struggle) => (
              <Pressable
                key={struggle.id}
                onPress={() => setSelectedStruggle(struggle.id)}
                style={[
                  styles.strugglePill,
                  selectedStruggle === struggle.id && styles.strugglePillActive,
                ]}
              >
                <Text style={styles.struggleEmoji}>{struggle.emoji}</Text>
                <Text style={[
                  styles.struggleText,
                  selectedStruggle === struggle.id && styles.struggleTextActive,
                ]}>
                  {struggle.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Category pills */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Or browse by type</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categories}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((cat) => (
              <Pressable
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                style={[
                  styles.categoryPill,
                  selectedCategory === cat.id && styles.categoryPillActive,
                ]}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === cat.id && styles.categoryTextActive,
                ]}>
                  {cat.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Results count */}
        {(selectedCategory !== 'all' || selectedStruggle !== 'all') && (
          <View style={styles.resultsInfo}>
            <Text style={styles.resultsText}>
              {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found
            </Text>
            {(selectedCategory !== 'all' || selectedStruggle !== 'all') && (
              <Pressable onPress={() => { setSelectedCategory('all'); setSelectedStruggle('all'); }}>
                <Text style={styles.clearFilters}>Clear filters</Text>
              </Pressable>
            )}
          </View>
        )}

        {/* Tool cards */}
        <View style={styles.toolList}>
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🦦</Text>
              <Text style={styles.emptyText}>No tools match this combination.</Text>
              <Pressable onPress={() => { setSelectedCategory('all'); setSelectedStruggle('all'); }}>
                <Text style={styles.clearFilters}>Show all tools</Text>
              </Pressable>
            </View>
          )}
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

  // Section
  section: {
    marginTop: spacing[5],
  },
  sectionLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text.tertiary,
    paddingHorizontal: layout.screenPaddingHorizontal,
    marginBottom: spacing[2],
  },

  // Struggles
  struggles: {
    flexGrow: 0,
  },
  strugglesContent: {
    paddingHorizontal: layout.screenPaddingHorizontal,
    gap: spacing[2],
  },
  strugglePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.divider,
    gap: spacing[1],
  },
  strugglePillActive: {
    backgroundColor: colors.accent[500],
    borderColor: colors.accent[500],
  },
  struggleEmoji: {
    fontSize: 14,
  },
  struggleText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text.secondary,
  },
  struggleTextActive: {
    color: colors.text.inverse,
  },

  // Categories
  categories: {
    flexGrow: 0,
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

  // Results info
  resultsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: layout.screenPaddingHorizontal,
    marginTop: spacing[4],
  },
  resultsText: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
  },
  clearFilters: {
    fontSize: typography.sizes.sm,
    color: colors.primary[600],
    fontWeight: typography.weights.medium,
  },

  // Tool list
  toolList: {
    padding: layout.screenPaddingHorizontal,
    paddingTop: spacing[4],
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

  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing[8],
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: spacing[3],
  },
  emptyText: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    marginBottom: spacing[3],
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
