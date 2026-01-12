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
    id: 'thought-naming',
    name: 'Name the thought',
    description: 'Label it, don\'t fight it',
    emoji: '💭',
    duration: '3 min',
    category: 'thought-work',
  },
  {
    id: 'opposite-action',
    name: 'Opposite action',
    description: 'Do the next small thing',
    emoji: '↩️',
    duration: '5 min',
    category: 'behavioral',
  },
  {
    id: 'self-compassion',
    name: 'Self-compassion break',
    description: 'Not affirmations. Just kindness.',
    emoji: '🤲',
    duration: '3 min',
    category: 'compassion',
  },
  {
    id: 'urge-surfing',
    name: 'Surf the urge',
    description: 'Watch it rise and fall',
    emoji: '🌊',
    duration: '5-10 min',
    category: 'distress',
  },
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'grounding', name: 'Grounding' },
  { id: 'thought-work', name: 'Thoughts' },
  { id: 'behavioral', name: 'Action' },
  { id: 'compassion', name: 'Compassion' },
  { id: 'distress', name: 'Distress' },
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

