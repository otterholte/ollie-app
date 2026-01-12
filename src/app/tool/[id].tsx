import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { colors } from '@/constants/colors';
import { spacing, borderRadius, layout } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export default function ToolScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.closeText}>✕</Text>
        </Pressable>
      </View>

      {id === 'breathing' && <BreathingTool />}
      {id === 'grounding' && <GroundingTool />}
      {id === 'self-compassion' && <SelfCompassionTool />}
      {id === 'thought-naming' && <ThoughtNamingTool />}
      {id === 'crisis' && <CrisisResources />}
      {!['breathing', 'grounding', 'self-compassion', 'thought-naming', 'crisis'].includes(id || '') && (
        <ComingSoon toolId={id} />
      )}
    </SafeAreaView>
  );
}

// Breathing Tool
const BreathingTool = () => {
  const [phase, setPhase] = useState<'ready' | 'breathing' | 'done'>('ready');
  const [breathPhase, setBreathPhase] = useState<'in' | 'hold' | 'out'>('in');
  const [count, setCount] = useState(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (phase !== 'breathing') return;

    const cycleTime = 12000; // 4s in, 4s hold, 4s out
    
    scale.value = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.5, { duration: 4000 }), // hold
        withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false
    );

    const phaseInterval = setInterval(() => {
      setCount(c => {
        const newCount = c + 1;
        const cyclePosition = newCount % 12;
        if (cyclePosition < 4) setBreathPhase('in');
        else if (cyclePosition < 8) setBreathPhase('hold');
        else setBreathPhase('out');
        
        if (newCount >= 36) { // 3 full cycles
          setPhase('done');
        }
        return newCount;
      });
    }, 1000);

    return () => clearInterval(phaseInterval);
  }, [phase]);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (phase === 'ready') {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🌬️</Text>
        <Text style={styles.toolTitle}>Paced Breathing</Text>
        <Text style={styles.toolDescription}>
          4 seconds in, 4 seconds hold, 4 seconds out.{'\n'}
          Slowing the exhale activates your calm system.
        </Text>
        <Pressable 
          style={styles.startButton}
          onPress={() => setPhase('breathing')}
        >
          <Text style={styles.startButtonText}>Start</Text>
        </Pressable>
      </View>
    );
  }

  if (phase === 'done') {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🦦</Text>
        <Text style={styles.toolTitle}>Nice work.</Text>
        <Text style={styles.toolDescription}>
          Three cycles. That's something.{'\n'}
          How do you feel compared to before?
        </Text>
        <Pressable 
          style={styles.startButton}
          onPress={() => router.back()}
        >
          <Text style={styles.startButtonText}>Done</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.breathingContent}>
      <Animated.View style={[styles.breathCircle, circleStyle]}>
        <Text style={styles.breathText}>
          {breathPhase === 'in' ? 'Breathe in' : breathPhase === 'hold' ? 'Hold' : 'Breathe out'}
        </Text>
      </Animated.View>
      <Text style={styles.breathCount}>{(count % 4) + 1}</Text>
      <Text style={styles.cycleCount}>
        Cycle {Math.floor(count / 12) + 1} of 3
      </Text>
    </View>
  );
};

// Self-Compassion Tool
const SelfCompassionTool = () => {
  const [step, setStep] = useState(0);
  
  const steps = [
    {
      title: "This is a moment of suffering.",
      instruction: "Acknowledge what you're going through. Say it simply.",
      prompt: "\"This is hard.\"\n\"I'm struggling right now.\"",
    },
    {
      title: "Suffering is part of being human.",
      instruction: "You're not alone in this. Many people feel this way.",
      prompt: "\"Others have felt this too.\"\n\"I'm not broken for feeling this.\"",
    },
    {
      title: "May I be kind to myself.",
      instruction: "Not because you deserve it. Because you're suffering.",
      prompt: "\"May I give myself compassion.\"\n\"May I be patient with myself.\"",
    },
  ];

  const current = steps[step];
  const isComplete = step >= steps.length;

  if (isComplete) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🤲</Text>
        <Text style={styles.toolTitle}>That's the practice.</Text>
        <Text style={styles.toolDescription}>
          It might feel awkward. That's normal.{'\n'}
          Self-compassion is a skill, not a feeling.
        </Text>
        <Pressable 
          style={styles.startButton}
          onPress={() => router.back()}
        >
          <Text style={styles.startButtonText}>Done</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.stepIndicator}>Step {step + 1} of 3</Text>
      <Text style={styles.compassionTitle}>{current.title}</Text>
      <Text style={styles.compassionInstruction}>{current.instruction}</Text>
      <View style={styles.promptBox}>
        <Text style={styles.promptText}>{current.prompt}</Text>
      </View>
      <Pressable 
        style={styles.startButton}
        onPress={() => setStep(s => s + 1)}
      >
        <Text style={styles.startButtonText}>
          {step < steps.length - 1 ? 'Continue' : 'Finish'}
        </Text>
      </Pressable>
    </View>
  );
};

// Grounding Tool (5-4-3-2-1)
const GroundingTool = () => {
  const [step, setStep] = useState(0);
  
  const steps = [
    { sense: '👁️', count: 5, text: "things you can see" },
    { sense: '👂', count: 4, text: "things you can hear" },
    { sense: '✋', count: 3, text: "things you can touch" },
    { sense: '👃', count: 2, text: "things you can smell" },
    { sense: '👅', count: 1, text: "thing you can taste" },
  ];

  const current = steps[step];
  const isComplete = step >= steps.length;

  if (isComplete) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🌿</Text>
        <Text style={styles.toolTitle}>You're here.</Text>
        <Text style={styles.toolDescription}>
          Present in this moment.{'\n'}
          That's grounding.
        </Text>
        <Pressable 
          style={styles.startButton}
          onPress={() => router.back()}
        >
          <Text style={styles.startButtonText}>Done</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.groundingEmoji}>{current.sense}</Text>
      <Text style={styles.groundingCount}>{current.count}</Text>
      <Text style={styles.groundingText}>{current.text}</Text>
      <Text style={styles.groundingHint}>
        Take your time. Name them out loud or in your head.
      </Text>
      <Pressable 
        style={styles.startButton}
        onPress={() => setStep(s => s + 1)}
      >
        <Text style={styles.startButtonText}>Done</Text>
      </Pressable>
    </View>
  );
};

// Thought Naming Tool
const ThoughtNamingTool = () => {
  const [step, setStep] = useState(0);

  if (step === 0) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>💭</Text>
        <Text style={styles.toolTitle}>Name the Thought</Text>
        <Text style={styles.toolDescription}>
          When a thought is loud, naming it creates distance.{'\n'}
          You're not your thoughts. You're the one noticing them.
        </Text>
        <Pressable 
          style={styles.startButton}
          onPress={() => setStep(1)}
        >
          <Text style={styles.startButtonText}>Try it</Text>
        </Pressable>
      </View>
    );
  }

  if (step === 1) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.thoughtStep}>
          What's the thought that's bothering you?
        </Text>
        <Text style={styles.thoughtExample}>
          Example: "I'm useless"
        </Text>
        <View style={styles.thoughtLabels}>
          <Text style={styles.thoughtLabelTitle}>This thought is probably:</Text>
          {['Self-attack', 'Prediction', 'Mind-reading', 'Should statement', 'Something else'].map((label) => (
            <Pressable 
              key={label}
              style={styles.thoughtLabel}
              onPress={() => setStep(2)}
            >
              <Text style={styles.thoughtLabelText}>{label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.toolEmoji}>✨</Text>
      <Text style={styles.thoughtComplete}>
        "I'm having the thought that..."
      </Text>
      <Text style={styles.toolDescription}>
        Adding those words creates space.{'\n'}
        The thought isn't you. It's just a thought.
      </Text>
      <Pressable 
        style={styles.startButton}
        onPress={() => router.back()}
      >
        <Text style={styles.startButtonText}>Got it</Text>
      </Pressable>
    </View>
  );
};

// Crisis Resources
const CrisisResources = () => (
  <View style={styles.toolContent}>
    <Text style={styles.crisisTitle}>You're not alone.</Text>
    <Text style={styles.crisisSubtitle}>
      If you're in crisis, please reach out.
    </Text>
    
    <View style={styles.crisisResources}>
      <View style={styles.crisisResource}>
        <Text style={styles.resourceName}>988 Suicide & Crisis Lifeline</Text>
        <Text style={styles.resourceDetail}>Call or text 988 (US)</Text>
      </View>
      <View style={styles.crisisResource}>
        <Text style={styles.resourceName}>Crisis Text Line</Text>
        <Text style={styles.resourceDetail}>Text HOME to 741741</Text>
      </View>
      <View style={styles.crisisResource}>
        <Text style={styles.resourceName}>Emergency Services</Text>
        <Text style={styles.resourceDetail}>Call 911 (US)</Text>
      </View>
    </View>

    <Text style={styles.crisisNote}>
      Ollie is here for support, but these professionals are trained to help in crisis moments.
    </Text>

    <Pressable 
      style={styles.startButton}
      onPress={() => router.back()}
    >
      <Text style={styles.startButtonText}>Back</Text>
    </Pressable>
  </View>
);

// Coming Soon placeholder
const ComingSoon = ({ toolId }: { toolId: string | undefined }) => (
  <View style={styles.toolContent}>
    <Text style={styles.toolEmoji}>🚧</Text>
    <Text style={styles.toolTitle}>Coming soon</Text>
    <Text style={styles.toolDescription}>
      This tool ({toolId}) is being built.{'\n'}
      Check back later.
    </Text>
    <Pressable 
      style={styles.startButton}
      onPress={() => router.back()}
    >
      <Text style={styles.startButtonText}>Back</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    padding: spacing[4],
    alignItems: 'flex-end',
  },
  closeText: {
    fontSize: 24,
    color: colors.text.secondary,
  },

  // Tool content
  toolContent: {
    flex: 1,
    padding: layout.screenPaddingHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolEmoji: {
    fontSize: 64,
    marginBottom: spacing[4],
  },
  toolTitle: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  toolDescription: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
    marginBottom: spacing[8],
  },
  startButton: {
    backgroundColor: colors.primary[600],
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[4],
    borderRadius: borderRadius.md,
  },
  startButtonText: {
    color: colors.text.inverse,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
  },

  // Breathing
  breathingContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.accent[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathText: {
    fontSize: typography.sizes.xl,
    color: colors.accent[800],
    fontWeight: typography.weights.medium,
  },
  breathCount: {
    fontSize: typography.sizes['4xl'],
    color: colors.text.primary,
    fontWeight: typography.weights.semibold,
    marginTop: spacing[8],
  },
  cycleCount: {
    fontSize: typography.sizes.base,
    color: colors.text.tertiary,
    marginTop: spacing[2],
  },

  // Self-compassion
  stepIndicator: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    marginBottom: spacing[4],
  },
  compassionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  compassionInstruction: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing[6],
  },
  promptBox: {
    backgroundColor: colors.primary[50],
    borderRadius: borderRadius.lg,
    padding: spacing[5],
    marginBottom: spacing[8],
    width: '100%',
  },
  promptText: {
    fontSize: typography.sizes.lg,
    color: colors.primary[700],
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: typography.sizes.lg * typography.lineHeights.relaxed,
  },

  // Grounding
  groundingEmoji: {
    fontSize: 64,
    marginBottom: spacing[2],
  },
  groundingCount: {
    fontSize: typography.sizes['4xl'],
    fontWeight: typography.weights.bold,
    color: colors.primary[600],
    marginBottom: spacing[2],
  },
  groundingText: {
    fontSize: typography.sizes.xl,
    color: colors.text.primary,
    marginBottom: spacing[4],
  },
  groundingHint: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    marginBottom: spacing[8],
  },

  // Thought naming
  thoughtStep: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  thoughtExample: {
    fontSize: typography.sizes.base,
    color: colors.text.tertiary,
    marginBottom: spacing[6],
  },
  thoughtLabels: {
    width: '100%',
  },
  thoughtLabelTitle: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginBottom: spacing[3],
  },
  thoughtLabel: {
    backgroundColor: colors.background.secondary,
    padding: spacing[4],
    borderRadius: borderRadius.md,
    marginBottom: spacing[2],
  },
  thoughtLabelText: {
    fontSize: typography.sizes.base,
    color: colors.text.primary,
  },
  thoughtComplete: {
    fontSize: typography.sizes.xl,
    color: colors.primary[600],
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: spacing[4],
  },

  // Crisis
  crisisTitle: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  crisisSubtitle: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    marginBottom: spacing[8],
  },
  crisisResources: {
    width: '100%',
    gap: spacing[3],
    marginBottom: spacing[6],
  },
  crisisResource: {
    backgroundColor: colors.background.secondary,
    padding: spacing[4],
    borderRadius: borderRadius.md,
  },
  resourceName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  },
  resourceDetail: {
    fontSize: typography.sizes.sm,
    color: colors.primary[600],
    marginTop: spacing[1],
  },
  crisisNote: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginBottom: spacing[6],
  },
});

