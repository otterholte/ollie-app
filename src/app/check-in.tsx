import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import Animated, { 
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { colors } from '@/constants/colors';
import { spacing, borderRadius, layout } from '@/constants/spacing';
import { typography } from '@/constants/typography';

type CheckInStep = 'mood' | 'energy' | 'self-talk' | 'complete';

export default function CheckInScreen() {
  const [step, setStep] = useState<CheckInStep>('mood');
  const [mood, setMood] = useState<number | null>(null);
  const [energy, setEnergy] = useState<number | null>(null);
  const [selfTalk, setSelfTalk] = useState<string | null>(null);

  const handleMoodSelect = (value: number) => {
    setMood(value);
    setTimeout(() => setStep('energy'), 300);
  };

  const handleEnergySelect = (value: number) => {
    setEnergy(value);
    setTimeout(() => setStep('self-talk'), 300);
  };

  const handleSelfTalkSelect = (value: string) => {
    setSelfTalk(value);
    setTimeout(() => setStep('complete'), 300);
  };

  const handleComplete = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Check in</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Progress dots */}
      <View style={styles.progress}>
        {['mood', 'energy', 'self-talk', 'complete'].map((s, i) => (
          <View 
            key={s}
            style={[
              styles.progressDot,
              (step === s || 
                (step === 'energy' && i === 0) ||
                (step === 'self-talk' && i <= 1) ||
                (step === 'complete' && i <= 2)
              ) && styles.progressDotActive,
            ]}
          />
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {step === 'mood' && (
          <Animated.View 
            entering={FadeIn.duration(300)} 
            exiting={FadeOut.duration(200)}
            style={styles.stepContent}
          >
            <Text style={styles.question}>How are you feeling?</Text>
            <Text style={styles.hint}>No right answer.</Text>
            <View style={styles.moodGrid}>
              {[1, 2, 3, 4, 5].map((value) => (
                <Pressable
                  key={value}
                  onPress={() => handleMoodSelect(value)}
                  style={[
                    styles.moodOption,
                    mood === value && styles.moodOptionSelected,
                  ]}
                >
                  <Text style={styles.moodEmoji}>
                    {['😔', '😕', '😐', '🙂', '😊'][value - 1]}
                  </Text>
                  <Text style={styles.moodLabel}>
                    {['Rough', 'Low', 'Okay', 'Good', 'Great'][value - 1]}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        )}

        {step === 'energy' && (
          <Animated.View 
            entering={FadeIn.duration(300)} 
            exiting={FadeOut.duration(200)}
            style={styles.stepContent}
          >
            <Text style={styles.question}>What's your energy like?</Text>
            <Text style={styles.hint}>Physical and mental.</Text>
            <View style={styles.energyOptions}>
              {[
                { value: 1, emoji: '🪫', label: 'Depleted' },
                { value: 2, emoji: '🔋', label: 'Low' },
                { value: 3, emoji: '⚡', label: 'Okay' },
                { value: 4, emoji: '✨', label: 'Good' },
              ].map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => handleEnergySelect(option.value)}
                  style={[
                    styles.energyOption,
                    energy === option.value && styles.energyOptionSelected,
                  ]}
                >
                  <Text style={styles.energyEmoji}>{option.emoji}</Text>
                  <Text style={styles.energyLabel}>{option.label}</Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        )}

        {step === 'self-talk' && (
          <Animated.View 
            entering={FadeIn.duration(300)} 
            exiting={FadeOut.duration(200)}
            style={styles.stepContent}
          >
            <Text style={styles.question}>How's your inner voice today?</Text>
            <Text style={styles.hint}>The way you talk to yourself.</Text>
            <View style={styles.selfTalkOptions}>
              {[
                { value: 'kind', label: 'Kind', color: colors.primary[100] },
                { value: 'neutral', label: 'Neutral', color: colors.neutral[100] },
                { value: 'critical', label: 'Critical', color: colors.secondary[100] },
                { value: 'harsh', label: 'Harsh', color: colors.error + '20' },
              ].map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => handleSelfTalkSelect(option.value)}
                  style={[
                    styles.selfTalkOption,
                    { backgroundColor: option.color },
                    selfTalk === option.value && styles.selfTalkOptionSelected,
                  ]}
                >
                  <Text style={styles.selfTalkLabel}>{option.label}</Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        )}

        {step === 'complete' && (
          <Animated.View 
            entering={FadeIn.duration(400)} 
            style={styles.stepContent}
          >
            <Text style={styles.completeEmoji}>🦦</Text>
            <Text style={styles.completeTitle}>Noted.</Text>
            <Text style={styles.completeText}>
              {selfTalk === 'harsh' || selfTalk === 'critical' 
                ? "Ollie noticed the inner critic is active today. That's information, not failure."
                : mood && mood <= 2
                ? "Hard day. Ollie's here. No fixing needed."
                : "Thanks for checking in. Every data point helps."}
            </Text>
            
            {(selfTalk === 'harsh' || selfTalk === 'critical') && (
              <View style={styles.suggestion}>
                <Text style={styles.suggestionTitle}>Something that might help:</Text>
                <Pressable 
                  style={styles.suggestionButton}
                  onPress={() => {
                    router.back();
                    setTimeout(() => router.push('/tool/self-compassion'), 100);
                  }}
                >
                  <Text style={styles.suggestionButtonText}>
                    🤲 Self-compassion break (3 min)
                  </Text>
                </Pressable>
              </View>
            )}

            <Pressable 
              style={styles.doneButton}
              onPress={handleComplete}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  cancelText: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
  },
  headerTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  },

  // Progress
  progress: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing[2],
    padding: spacing[4],
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neutral[200],
  },
  progressDotActive: {
    backgroundColor: colors.primary[500],
  },

  // Content
  content: {
    flex: 1,
    padding: layout.screenPaddingHorizontal,
  },
  stepContent: {
    flex: 1,
    paddingTop: spacing[8],
  },
  question: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  hint: {
    fontSize: typography.sizes.base,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginBottom: spacing[8],
  },

  // Mood
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing[3],
  },
  moodOption: {
    width: 80,
    paddingVertical: spacing[4],
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
  },
  moodOptionSelected: {
    backgroundColor: colors.primary[100],
    borderWidth: 2,
    borderColor: colors.primary[400],
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: spacing[2],
  },
  moodLabel: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
  },

  // Energy
  energyOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing[3],
  },
  energyOption: {
    width: '45%',
    paddingVertical: spacing[5],
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
  },
  energyOptionSelected: {
    backgroundColor: colors.primary[100],
    borderWidth: 2,
    borderColor: colors.primary[400],
  },
  energyEmoji: {
    fontSize: 32,
    marginBottom: spacing[2],
  },
  energyLabel: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
  },

  // Self-talk
  selfTalkOptions: {
    gap: spacing[3],
  },
  selfTalkOption: {
    padding: spacing[5],
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  selfTalkOptionSelected: {
    borderWidth: 2,
    borderColor: colors.primary[400],
  },
  selfTalkLabel: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
  },

  // Complete
  completeEmoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  completeTitle: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  completeText: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
    marginBottom: spacing[6],
  },
  suggestion: {
    backgroundColor: colors.primary[50],
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[6],
  },
  suggestionTitle: {
    fontSize: typography.sizes.sm,
    color: colors.primary[700],
    marginBottom: spacing[3],
  },
  suggestionButton: {
    backgroundColor: colors.primary[600],
    borderRadius: borderRadius.md,
    padding: spacing[3],
    alignItems: 'center',
  },
  suggestionButtonText: {
    color: colors.text.inverse,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
  },
  doneButton: {
    backgroundColor: colors.neutral[800],
    borderRadius: borderRadius.md,
    padding: spacing[4],
    alignItems: 'center',
  },
  doneButtonText: {
    color: colors.text.inverse,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
  },
});

