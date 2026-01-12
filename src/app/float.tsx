import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  withSequence,
  Easing,
  withDelay,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { colors } from '@/constants/colors';
import { spacing, borderRadius, layout } from '@/constants/spacing';
import { typography } from '@/constants/typography';

type FloatPhase = 'landing' | 'breathing' | 'grounding' | 'holding';

export default function FloatScreen() {
  const [phase, setPhase] = useState<FloatPhase>('landing');
  
  // Floating animation
  const floatY = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    // Gentle floating
    floatY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Breathing pulse
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const ollieStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  const breatheStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: 0.3,
  }));

  return (
    <SafeAreaView style={styles.container}>
      {/* Close button */}
      <Pressable 
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Text style={styles.closeText}>×</Text>
      </Pressable>

      {/* Background breathing circle */}
      <Animated.View style={[styles.breatheCircle, breatheStyle]} />

      {/* Ollie floating */}
      <Animated.View style={[styles.ollieContainer, ollieStyle]}>
        <Text style={styles.ollie}>🦦</Text>
      </Animated.View>

      {/* Water effect */}
      <View style={styles.water}>
        <Text style={styles.wave}>〰️〰️〰️〰️〰️〰️</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {phase === 'landing' && (
          <LandingPhase onContinue={() => setPhase('breathing')} />
        )}
        {phase === 'breathing' && (
          <BreathingPhase onContinue={() => setPhase('grounding')} />
        )}
        {phase === 'grounding' && (
          <GroundingPhase onContinue={() => setPhase('holding')} />
        )}
        {phase === 'holding' && (
          <HoldingPhase onDone={() => router.back()} />
        )}
      </View>

      {/* Crisis link */}
      <Pressable style={styles.crisisLink}>
        <Text style={styles.crisisText}>Need more support?</Text>
      </Pressable>
    </SafeAreaView>
  );
}

// Phase components
const LandingPhase = ({ onContinue }: { onContinue: () => void }) => (
  <View style={styles.phaseContent}>
    <Text style={styles.phaseTitle}>Ollie's here.</Text>
    <Text style={styles.phaseText}>
      You don't have to solve anything right now.{'\n'}
      Let's just float for a bit.
    </Text>
    <View style={styles.options}>
      <Pressable 
        style={styles.primaryButton}
        onPress={onContinue}
      >
        <Text style={styles.primaryButtonText}>Start with breathing</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>I just want to sit here</Text>
      </Pressable>
    </View>
  </View>
);

const BreathingPhase = ({ onContinue }: { onContinue: () => void }) => {
  const [count, setCount] = useState(0);
  const [instruction, setInstruction] = useState('Breathe in...');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => {
        const next = c + 1;
        if (next % 8 < 4) {
          setInstruction('Breathe in...');
        } else {
          setInstruction('Breathe out...');
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const cycles = Math.floor(count / 8);

  return (
    <View style={styles.phaseContent}>
      <Text style={styles.instruction}>{instruction}</Text>
      <Text style={styles.breatheCount}>{(count % 4) + 1}</Text>
      
      {cycles >= 3 && (
        <Pressable 
          style={styles.primaryButton}
          onPress={onContinue}
        >
          <Text style={styles.primaryButtonText}>I'm ready for more</Text>
        </Pressable>
      )}
      {cycles >= 1 && cycles < 3 && (
        <Text style={styles.phaseHint}>
          Take a few more breaths...
        </Text>
      )}
    </View>
  );
};

const GroundingPhase = ({ onContinue }: { onContinue: () => void }) => {
  const [step, setStep] = useState(0);
  
  const prompts = [
    { sense: '👁️', text: "Name 5 things you can see" },
    { sense: '👂', text: "Name 4 things you can hear" },
    { sense: '✋', text: "Name 3 things you can touch" },
    { sense: '👃', text: "Name 2 things you can smell" },
    { sense: '👅', text: "Name 1 thing you can taste" },
  ];

  const current = prompts[step];
  const isComplete = step >= prompts.length;

  return (
    <View style={styles.phaseContent}>
      {!isComplete ? (
        <>
          <Text style={styles.groundingEmoji}>{current.sense}</Text>
          <Text style={styles.groundingText}>{current.text}</Text>
          <Text style={styles.groundingHint}>
            Take your time. No rush.
          </Text>
          <Pressable 
            style={styles.primaryButton}
            onPress={() => setStep(s => s + 1)}
          >
            <Text style={styles.primaryButtonText}>Done</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.phaseTitle}>You're here.</Text>
          <Text style={styles.phaseText}>
            Present in this moment.{'\n'}
            That took something.
          </Text>
          <Pressable 
            style={styles.primaryButton}
            onPress={onContinue}
          >
            <Text style={styles.primaryButtonText}>Continue</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

const HoldingPhase = ({ onDone }: { onDone: () => void }) => (
  <View style={styles.phaseContent}>
    <Text style={styles.phaseTitle}>How are you now?</Text>
    <Text style={styles.phaseText}>
      Not better or worse — just checking.
    </Text>
    <View style={styles.moodOptions}>
      {['😔', '😐', '🙂'].map((emoji, i) => (
        <Pressable 
          key={i}
          style={styles.moodButton}
          onPress={onDone}
        >
          <Text style={styles.moodEmoji}>{emoji}</Text>
        </Pressable>
      ))}
    </View>
    <Pressable 
      style={styles.skipButton}
      onPress={onDone}
    >
      <Text style={styles.skipText}>I'd rather not say</Text>
    </Pressable>
    <Text style={styles.holdingNote}>
      Whatever you're feeling, that's valid.{'\n'}
      You showed up for yourself.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[100],
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 28,
    color: colors.primary[700],
    lineHeight: 28,
  },

  // Breathing circle
  breatheCircle: {
    position: 'absolute',
    top: '20%',
    alignSelf: 'center',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.primary[300],
  },

  // Ollie
  ollieContainer: {
    position: 'absolute',
    top: '25%',
    alignSelf: 'center',
  },
  ollie: {
    fontSize: 100,
  },

  // Water
  water: {
    position: 'absolute',
    top: '42%',
    width: '100%',
    alignItems: 'center',
  },
  wave: {
    fontSize: 28,
    color: colors.primary[400],
    opacity: 0.6,
  },

  // Content
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: layout.screenPaddingHorizontal,
    paddingBottom: 40,
  },
  phaseContent: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: borderRadius.xl,
    padding: spacing[6],
    alignItems: 'center',
  },
  phaseTitle: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  phaseText: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
    marginBottom: spacing[6],
  },
  phaseHint: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    marginTop: spacing[4],
  },

  // Buttons
  options: {
    width: '100%',
    gap: spacing[3],
  },
  primaryButton: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.md,
    padding: spacing[4],
    alignItems: 'center',
    width: '100%',
  },
  primaryButtonText: {
    color: colors.text.inverse,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
  },
  secondaryButton: {
    borderRadius: borderRadius.md,
    padding: spacing[4],
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.text.secondary,
    fontSize: typography.sizes.base,
  },

  // Breathing
  instruction: {
    fontSize: typography.sizes.xl,
    color: colors.primary[700],
    fontWeight: typography.weights.medium,
    marginBottom: spacing[2],
  },
  breatheCount: {
    fontSize: typography.sizes['4xl'],
    color: colors.primary[500],
    fontWeight: typography.weights.semibold,
    marginBottom: spacing[6],
  },

  // Grounding
  groundingEmoji: {
    fontSize: 48,
    marginBottom: spacing[4],
  },
  groundingText: {
    fontSize: typography.sizes.lg,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  groundingHint: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    marginBottom: spacing[6],
  },

  // Mood selection
  moodOptions: {
    flexDirection: 'row',
    gap: spacing[4],
    marginBottom: spacing[4],
  },
  moodButton: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodEmoji: {
    fontSize: 32,
  },
  skipButton: {
    padding: spacing[3],
  },
  skipText: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
  },
  holdingNote: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
    marginTop: spacing[4],
  },

  // Crisis
  crisisLink: {
    padding: spacing[4],
    alignItems: 'center',
  },
  crisisText: {
    fontSize: typography.sizes.sm,
    color: colors.primary[600],
    textDecorationLine: 'underline',
  },
});

