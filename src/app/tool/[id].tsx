import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
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

const implementedTools = [
  'breathing', 'grounding', 'self-compassion', 'thought-naming', 'crisis',
  'body-scan', 'cold-water', 'tipp', 'stop-skill', 'radical-acceptance',
  'defusion', 'leaves-on-stream', 'check-the-facts', 'opposite-action',
  'name-the-emotion', 'loving-kindness', 'inner-critic', 'values-check',
  'three-minute-space', 'urge-surfing', 'thought-record'
];

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
      {id === 'body-scan' && <BodyScanTool />}
      {id === 'cold-water' && <ColdWaterTool />}
      {id === 'tipp' && <TIPPTool />}
      {id === 'stop-skill' && <STOPTool />}
      {id === 'radical-acceptance' && <RadicalAcceptanceTool />}
      {id === 'defusion' && <DefusionTool />}
      {id === 'leaves-on-stream' && <LeavesOnStreamTool />}
      {id === 'check-the-facts' && <CheckTheFactsTool />}
      {id === 'opposite-action' && <OppositeActionTool />}
      {id === 'name-the-emotion' && <NameTheEmotionTool />}
      {id === 'loving-kindness' && <LovingKindnessTool />}
      {id === 'inner-critic' && <InnerCriticTool />}
      {id === 'values-check' && <ValuesCheckTool />}
      {id === 'three-minute-space' && <ThreeMinuteSpaceTool />}
      {id === 'urge-surfing' && <UrgeSurfingTool />}
      {id === 'thought-record' && <ThoughtRecordTool />}
      {!implementedTools.includes(id || '') && (
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

// Body Scan Tool
const BodyScanTool = () => {
  const [step, setStep] = useState(0);
  
  const bodyParts = [
    { area: 'Feet', instruction: 'Notice any sensations in your feet. Tension? Warmth? Nothing at all? Just notice.' },
    { area: 'Legs', instruction: 'Move your attention up to your legs. Any tightness? Heaviness? Simply observe.' },
    { area: 'Belly', instruction: 'Notice your stomach and lower back. Where does your breath move here?' },
    { area: 'Chest', instruction: 'Bring attention to your chest and upper back. Notice the rhythm of breathing.' },
    { area: 'Hands', instruction: 'Feel your hands. Are they tense or relaxed? Warm or cool?' },
    { area: 'Shoulders', instruction: 'Notice your shoulders. This is where many hold tension. Just observe, no need to change.' },
    { area: 'Face', instruction: 'Notice your jaw, forehead, around your eyes. Any holding? Let it be as it is.' },
    { area: 'Whole body', instruction: 'Now feel your whole body at once. You\'re here. Present. Complete.' },
  ];

  const current = bodyParts[step];
  const isComplete = step >= bodyParts.length;

  if (isComplete) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🫁</Text>
        <Text style={styles.toolTitle}>You listened to your body.</Text>
        <Text style={styles.toolDescription}>
          That connection matters.{'\n'}
          Awareness is the first step.
        </Text>
        <Pressable style={styles.startButton} onPress={() => router.back()}>
          <Text style={styles.startButtonText}>Done</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.stepIndicator}>Part {step + 1} of {bodyParts.length}</Text>
      <Text style={styles.groundingCount}>{current.area}</Text>
      <Text style={styles.toolDescription}>{current.instruction}</Text>
      <Pressable style={styles.startButton} onPress={() => setStep(s => s + 1)}>
        <Text style={styles.startButtonText}>Next</Text>
      </Pressable>
    </View>
  );
};

// Cold Water / TIPP Temperature Tool
const ColdWaterTool = () => {
  const [step, setStep] = useState(0);

  if (step === 0) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🧊</Text>
        <Text style={styles.toolTitle}>Cold Reset</Text>
        <Text style={styles.toolDescription}>
          Cold temperature activates your dive reflex{'\n'}
          and quickly calms your nervous system.{'\n\n'}
          This works fast when emotions are intense.
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(1)}>
          <Text style={styles.startButtonText}>How to do it</Text>
        </Pressable>
      </View>
    );
  }

  if (step === 1) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>💧</Text>
        <Text style={styles.compassionTitle}>Choose an option:</Text>
        <View style={styles.optionsList}>
          <View style={styles.optionCard}>
            <Text style={styles.optionTitle}>Cold water on face</Text>
            <Text style={styles.optionText}>Splash cold water on your face, or hold a cold cloth to your forehead and cheeks for 30 seconds.</Text>
          </View>
          <View style={styles.optionCard}>
            <Text style={styles.optionTitle}>Ice in hands</Text>
            <Text style={styles.optionText}>Hold ice cubes in your hands or against your wrists.</Text>
          </View>
          <View style={styles.optionCard}>
            <Text style={styles.optionTitle}>Cold drink</Text>
            <Text style={styles.optionText}>Drink very cold water slowly, noticing each sip.</Text>
          </View>
        </View>
        <Pressable style={styles.startButton} onPress={() => setStep(2)}>
          <Text style={styles.startButtonText}>I tried it</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.toolEmoji}>✨</Text>
      <Text style={styles.toolTitle}>Notice the shift.</Text>
      <Text style={styles.toolDescription}>
        Your body is calming down.{'\n'}
        The intensity should feel different now.
      </Text>
      <Pressable style={styles.startButton} onPress={() => router.back()}>
        <Text style={styles.startButtonText}>Done</Text>
      </Pressable>
    </View>
  );
};

// TIPP Tool (full DBT skill)
const TIPPTool = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      letter: 'T',
      title: 'Temperature',
      instruction: 'Cold water on your face, ice on wrists, or a cold shower. This activates your dive reflex and calms you fast.',
    },
    {
      letter: 'I',
      title: 'Intense Exercise',
      instruction: 'Get your heart rate up for even 5-10 minutes. Run in place, do jumping jacks, or walk fast. Movement metabolizes stress hormones.',
    },
    {
      letter: 'P',
      title: 'Paced Breathing',
      instruction: 'Slow your exhale. Breathe in for 4, out for 6-8. The long exhale activates your calm system.',
    },
    {
      letter: 'P',
      title: 'Progressive Relaxation',
      instruction: 'Tense each muscle group for 5 seconds, then release. Start with your feet and work up. Notice the difference between tension and release.',
    },
  ];

  if (step === 0) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>⚡</Text>
        <Text style={styles.toolTitle}>TIPP</Text>
        <Text style={styles.toolDescription}>
          When emotions are at a 7+, these skills{'\n'}
          change your body chemistry fast.{'\n\n'}
          You don't have to do all four.{'\n'}
          Try what fits your situation.
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(1)}>
          <Text style={styles.startButtonText}>Show me</Text>
        </Pressable>
      </View>
    );
  }

  const current = steps[step - 1];
  const isComplete = step > steps.length;

  if (isComplete) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🦦</Text>
        <Text style={styles.toolTitle}>Those are your TIPP tools.</Text>
        <Text style={styles.toolDescription}>
          Use any one when emotions feel overwhelming.{'\n'}
          Your body knows how to calm down.{'\n'}
          These skills help it get there faster.
        </Text>
        <Pressable style={styles.startButton} onPress={() => router.back()}>
          <Text style={styles.startButtonText}>Got it</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.tippLetter}>{current.letter}</Text>
      <Text style={styles.compassionTitle}>{current.title}</Text>
      <Text style={styles.toolDescription}>{current.instruction}</Text>
      <Pressable style={styles.startButton} onPress={() => setStep(s => s + 1)}>
        <Text style={styles.startButtonText}>{step < steps.length ? 'Next' : 'Finish'}</Text>
      </Pressable>
    </View>
  );
};

// STOP Skill
const STOPTool = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { letter: 'S', title: 'Stop', instruction: 'Don\'t react. Freeze. Don\'t move a muscle. Just pause.' },
    { letter: 'T', title: 'Take a step back', instruction: 'Take a breath. Don\'t let your feelings make you act impulsively.' },
    { letter: 'O', title: 'Observe', instruction: 'What\'s happening inside and outside of you? What are you feeling? What\'s the situation?' },
    { letter: 'P', title: 'Proceed mindfully', instruction: 'Ask yourself: What action will make this better or worse? What do I want from this situation?' },
  ];

  const current = steps[step];
  const isComplete = step >= steps.length;

  if (isComplete) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🛑</Text>
        <Text style={styles.toolTitle}>You paused.</Text>
        <Text style={styles.toolDescription}>
          That space between stimulus and response{'\n'}
          is where you have power.{'\n\n'}
          What do you want to do now?
        </Text>
        <Pressable style={styles.startButton} onPress={() => router.back()}>
          <Text style={styles.startButtonText}>Done</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.tippLetter}>{current.letter}</Text>
      <Text style={styles.compassionTitle}>{current.title}</Text>
      <Text style={styles.toolDescription}>{current.instruction}</Text>
      <Pressable style={styles.startButton} onPress={() => setStep(s => s + 1)}>
        <Text style={styles.startButtonText}>Next</Text>
      </Pressable>
    </View>
  );
};

// Radical Acceptance Tool
const RadicalAcceptanceTool = () => {
  const [step, setStep] = useState(0);

  if (step === 0) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🕊️</Text>
        <Text style={styles.toolTitle}>Radical Acceptance</Text>
        <Text style={styles.toolDescription}>
          Fighting reality doesn't change it.{'\n'}
          It only adds suffering to pain.{'\n\n'}
          Acceptance isn't approval.{'\n'}
          It's acknowledging what is.
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(1)}>
          <Text style={styles.startButtonText}>Continue</Text>
        </Pressable>
      </View>
    );
  }

  if (step === 1) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.compassionTitle}>What are you struggling to accept?</Text>
        <Text style={styles.toolDescription}>
          This could be:{'\n'}
          • Something that happened{'\n'}
          • How someone acted{'\n'}
          • How you feel{'\n'}
          • A limitation you have{'\n'}
          • An unchangeable situation
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(2)}>
          <Text style={styles.startButtonText}>I have something in mind</Text>
        </Pressable>
      </View>
    );
  }

  if (step === 2) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.compassionTitle}>Try saying:</Text>
        <View style={styles.promptBox}>
          <Text style={styles.promptText}>
            "This is what happened."{'\n\n'}
            "This is how it is right now."{'\n\n'}
            "I can accept this and still work to change what I can."
          </Text>
        </View>
        <Pressable style={styles.startButton} onPress={() => setStep(3)}>
          <Text style={styles.startButtonText}>Continue</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.toolEmoji}>🌊</Text>
      <Text style={styles.toolTitle}>Acceptance is a practice.</Text>
      <Text style={styles.toolDescription}>
        You might need to accept the same thing{'\n'}
        many times. That's normal.{'\n\n'}
        Each time, you're building the muscle.
      </Text>
      <Pressable style={styles.startButton} onPress={() => router.back()}>
        <Text style={styles.startButtonText}>Done</Text>
      </Pressable>
    </View>
  );
};

// Defusion Tool (ACT)
const DefusionTool = () => {
  const [step, setStep] = useState(0);

  const techniques = [
    {
      name: '"I\'m having the thought that..."',
      example: 'Instead of "I\'m worthless," say "I\'m having the thought that I\'m worthless."',
    },
    {
      name: 'Sing the thought',
      example: 'Sing your negative thought to "Happy Birthday" or another tune. Notice how it changes.',
    },
    {
      name: 'Thank your mind',
      example: '"Thanks, mind, for that thought. Very creative." Acknowledge it without buying in.',
    },
    {
      name: 'Name the story',
      example: '"Ah, this is the \'I\'m not good enough\' story again." You know this one.',
    },
  ];

  if (step === 0) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🎈</Text>
        <Text style={styles.toolTitle}>Defusion</Text>
        <Text style={styles.toolDescription}>
          You are not your thoughts.{'\n'}
          You are the one observing them.{'\n\n'}
          Defusion creates distance between{'\n'}
          you and the thought.
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(1)}>
          <Text style={styles.startButtonText}>Show me techniques</Text>
        </Pressable>
      </View>
    );
  }

  const current = techniques[step - 1];
  const isComplete = step > techniques.length;

  if (isComplete) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>✨</Text>
        <Text style={styles.toolTitle}>The thought is still there.</Text>
        <Text style={styles.toolDescription}>
          But you're not fused with it anymore.{'\n'}
          It's just words in your mind.{'\n\n'}
          You don't have to believe everything you think.
        </Text>
        <Pressable style={styles.startButton} onPress={() => router.back()}>
          <Text style={styles.startButtonText}>Done</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.stepIndicator}>Technique {step} of {techniques.length}</Text>
      <Text style={styles.compassionTitle}>{current.name}</Text>
      <View style={styles.promptBox}>
        <Text style={styles.promptText}>{current.example}</Text>
      </View>
      <Pressable style={styles.startButton} onPress={() => setStep(s => s + 1)}>
        <Text style={styles.startButtonText}>Next technique</Text>
      </Pressable>
    </View>
  );
};

// Leaves on a Stream (ACT mindfulness)
const LeavesOnStreamTool = () => {
  const [phase, setPhase] = useState<'intro' | 'practice' | 'done'>('intro');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (phase !== 'practice') return;
    
    const interval = setInterval(() => {
      setSeconds(s => {
        if (s >= 120) { // 2 minutes
          setPhase('done');
          return s;
        }
        return s + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  if (phase === 'intro') {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🍃</Text>
        <Text style={styles.toolTitle}>Leaves on a Stream</Text>
        <Text style={styles.toolDescription}>
          Picture yourself sitting by a gentle stream.{'\n'}
          Leaves float by on the water.{'\n\n'}
          Each thought that comes, place it on a leaf{'\n'}
          and watch it float away downstream.{'\n\n'}
          Don't push the leaves. Don't hold them.{'\n'}
          Just watch.
        </Text>
        <Pressable style={styles.startButton} onPress={() => setPhase('practice')}>
          <Text style={styles.startButtonText}>Begin</Text>
        </Pressable>
      </View>
    );
  }

  if (phase === 'practice') {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🍃</Text>
        <Text style={styles.toolDescription}>
          Watch the stream.{'\n\n'}
          When a thought comes,{'\n'}
          place it on a leaf.{'\n\n'}
          Watch it float away.
        </Text>
        <Text style={styles.cycleCount}>{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</Text>
        <Pressable style={[styles.startButton, { marginTop: 40 }]} onPress={() => setPhase('done')}>
          <Text style={styles.startButtonText}>End early</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.toolEmoji}>🌊</Text>
      <Text style={styles.toolTitle}>The stream keeps flowing.</Text>
      <Text style={styles.toolDescription}>
        Thoughts come and go.{'\n'}
        You are the stream, not the leaves.{'\n\n'}
        How do you feel now compared to before?
      </Text>
      <Pressable style={styles.startButton} onPress={() => router.back()}>
        <Text style={styles.startButtonText}>Done</Text>
      </Pressable>
    </View>
  );
};

// Check the Facts (DBT)
const CheckTheFactsTool = () => {
  const [step, setStep] = useState(0);

  const questions = [
    { q: 'What emotion am I feeling?', hint: 'Name it specifically: anxious, angry, sad, ashamed...' },
    { q: 'What event triggered this emotion?', hint: 'Stick to facts. What actually happened?' },
    { q: 'What am I assuming or interpreting?', hint: 'What story am I adding to the facts?' },
    { q: 'What are other possible interpretations?', hint: 'What else could explain this?' },
    { q: 'Does my emotion fit the facts?', hint: 'Is the intensity level matching reality?' },
    { q: 'Is acting on this emotion effective?', hint: 'Will it help or hurt my goals?' },
  ];

  const current = questions[step];
  const isComplete = step >= questions.length;

  if (isComplete) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🔍</Text>
        <Text style={styles.toolTitle}>Facts checked.</Text>
        <Text style={styles.toolDescription}>
          When emotions fit the facts, feel them fully.{'\n'}
          When they don't, try opposite action.{'\n\n'}
          Either way, you've gained clarity.
        </Text>
        <Pressable style={styles.startButton} onPress={() => router.back()}>
          <Text style={styles.startButtonText}>Done</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.stepIndicator}>Question {step + 1} of {questions.length}</Text>
      <Text style={styles.compassionTitle}>{current.q}</Text>
      <Text style={styles.toolDescription}>{current.hint}</Text>
      <Pressable style={styles.startButton} onPress={() => setStep(s => s + 1)}>
        <Text style={styles.startButtonText}>Next question</Text>
      </Pressable>
    </View>
  );
};

// Opposite Action (DBT)
const OppositeActionTool = () => {
  const [step, setStep] = useState(0);

  const emotions = [
    { emotion: 'Fear/Anxiety', opposite: 'Approach what you\'re avoiding (if safe). Do what you\'re afraid of, over and over.' },
    { emotion: 'Sadness', opposite: 'Get active. Do things that make you feel competent. Avoid isolation.' },
    { emotion: 'Anger', opposite: 'Gently avoid. Take a break. Do something kind. Imagine understanding their perspective.' },
    { emotion: 'Shame', opposite: 'Share what happened with someone you trust. Keep your head up, speak clearly.' },
    { emotion: 'Guilt', opposite: 'If guilt fits facts: repair, apologize, commit to change. If not: approach, don\'t avoid.' },
  ];

  if (step === 0) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>↩️</Text>
        <Text style={styles.toolTitle}>Opposite Action</Text>
        <Text style={styles.toolDescription}>
          When an emotion doesn't fit the facts,{'\n'}
          or acting on it would make things worse,{'\n'}
          do the opposite of what it urges.{'\n\n'}
          All the way. Change your posture,{'\n'}
          face, and actions.
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(1)}>
          <Text style={styles.startButtonText}>What am I feeling?</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.compassionTitle}>Opposite actions by emotion:</Text>
      <View style={styles.emotionList}>
        {emotions.map((e, i) => (
          <View key={i} style={styles.emotionItem}>
            <Text style={styles.emotionTitle}>{e.emotion}</Text>
            <Text style={styles.emotionOpposite}>{e.opposite}</Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.startButton} onPress={() => router.back()}>
        <Text style={styles.startButtonText}>Got it</Text>
      </Pressable>
    </View>
  );
};

// Name the Emotion
const NameTheEmotionTool = () => {
  const [step, setStep] = useState(0);

  const emotionFamilies = [
    { name: 'Anger family', emotions: ['Annoyed', 'Frustrated', 'Irritated', 'Resentful', 'Furious', 'Enraged'] },
    { name: 'Sadness family', emotions: ['Disappointed', 'Lonely', 'Hopeless', 'Grief', 'Despair', 'Melancholy'] },
    { name: 'Fear family', emotions: ['Nervous', 'Anxious', 'Worried', 'Panicked', 'Terrified', 'Dread'] },
    { name: 'Shame family', emotions: ['Embarrassed', 'Humiliated', 'Self-conscious', 'Worthless', 'Defective'] },
    { name: 'Joy family', emotions: ['Content', 'Pleased', 'Grateful', 'Excited', 'Elated', 'Peaceful'] },
  ];

  if (step === 0) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🏷️</Text>
        <Text style={styles.toolTitle}>Name It to Tame It</Text>
        <Text style={styles.toolDescription}>
          Research shows that naming an emotion{'\n'}
          reduces its intensity.{'\n\n'}
          The more specific, the better.{'\n'}
          "Anxious" is good. "Nervous about being judged" is better.
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(1)}>
          <Text style={styles.startButtonText}>Show emotion words</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.compassionTitle}>Find your word:</Text>
      <View style={styles.emotionFamilies}>
        {emotionFamilies.map((family, i) => (
          <View key={i} style={styles.familyItem}>
            <Text style={styles.familyName}>{family.name}</Text>
            <Text style={styles.familyEmotions}>{family.emotions.join(' • ')}</Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.startButton} onPress={() => router.back()}>
        <Text style={styles.startButtonText}>I named it</Text>
      </Pressable>
    </View>
  );
};

// Loving-Kindness Meditation
const LovingKindnessTool = () => {
  const [step, setStep] = useState(0);

  const targets = [
    { target: 'Yourself', phrase: 'May I be safe.\nMay I be healthy.\nMay I live with ease.' },
    { target: 'Someone you love', phrase: 'May you be safe.\nMay you be healthy.\nMay you live with ease.' },
    { target: 'A neutral person', phrase: 'May you be safe.\nMay you be healthy.\nMay you live with ease.' },
    { target: 'All beings', phrase: 'May all beings be safe.\nMay all beings be healthy.\nMay all beings live with ease.' },
  ];

  const current = targets[step];
  const isComplete = step >= targets.length;

  if (isComplete) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>💗</Text>
        <Text style={styles.toolTitle}>Kindness sent.</Text>
        <Text style={styles.toolDescription}>
          It doesn't have to feel genuine yet.{'\n'}
          The practice matters more than the feeling.{'\n\n'}
          You're training your heart.
        </Text>
        <Pressable style={styles.startButton} onPress={() => router.back()}>
          <Text style={styles.startButtonText}>Done</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.stepIndicator}>Step {step + 1} of {targets.length}</Text>
      <Text style={styles.compassionTitle}>Bring to mind: {current.target}</Text>
      <View style={styles.promptBox}>
        <Text style={styles.promptText}>{current.phrase}</Text>
      </View>
      <Pressable style={styles.startButton} onPress={() => setStep(s => s + 1)}>
        <Text style={styles.startButtonText}>Continue</Text>
      </Pressable>
    </View>
  );
};

// Inner Critic Work
const InnerCriticTool = () => {
  const [step, setStep] = useState(0);

  if (step === 0) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🗣️</Text>
        <Text style={styles.toolTitle}>Inner Critic Work</Text>
        <Text style={styles.toolDescription}>
          That harsh voice isn't all of you.{'\n'}
          It's a part that's trying to protect you—{'\n'}
          often in misguided ways.{'\n\n'}
          Let's get to know it.
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(1)}>
          <Text style={styles.startButtonText}>Continue</Text>
        </Pressable>
      </View>
    );
  }

  if (step === 1) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.compassionTitle}>What is the critic saying right now?</Text>
        <Text style={styles.toolDescription}>
          Listen to the exact words.{'\n'}
          "You're so stupid." "You always mess up."{'\n'}
          "Nobody likes you."
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(2)}>
          <Text style={styles.startButtonText}>I hear it</Text>
        </Pressable>
      </View>
    );
  }

  if (step === 2) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.compassionTitle}>Whose voice is that?</Text>
        <Text style={styles.toolDescription}>
          Sometimes the critic sounds like someone{'\n'}
          from our past—a parent, teacher, bully.{'\n\n'}
          Recognizing this can help create distance.
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(3)}>
          <Text style={styles.startButtonText}>Continue</Text>
        </Pressable>
      </View>
    );
  }

  if (step === 3) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.compassionTitle}>What is it trying to protect you from?</Text>
        <Text style={styles.toolDescription}>
          Critics often fear rejection, failure, or pain.{'\n'}
          They attack you before others can.{'\n\n'}
          It's misguided protection.
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(4)}>
          <Text style={styles.startButtonText}>Continue</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.compassionTitle}>Respond to your critic:</Text>
      <View style={styles.promptBox}>
        <Text style={styles.promptText}>
          "I hear you. I know you're trying to help.{'\n\n'}
          But this harshness isn't helping me.{'\n\n'}
          I'm going to try a different way."
        </Text>
      </View>
      <Pressable style={styles.startButton} onPress={() => router.back()}>
        <Text style={styles.startButtonText}>Done</Text>
      </Pressable>
    </View>
  );
};

// Values Check (ACT)
const ValuesCheckTool = () => {
  const [step, setStep] = useState(0);

  const valueAreas = [
    'Relationships & Connection',
    'Work & Achievement',
    'Personal Growth & Learning',
    'Health & Wellbeing',
    'Fun & Recreation',
    'Spirituality & Meaning',
    'Community & Contribution',
  ];

  if (step === 0) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🧭</Text>
        <Text style={styles.toolTitle}>Values Check</Text>
        <Text style={styles.toolDescription}>
          When you're lost, values are your compass.{'\n'}
          Not goals to achieve, but directions to move.{'\n\n'}
          What matters most to you?
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(1)}>
          <Text style={styles.startButtonText}>Explore</Text>
        </Pressable>
      </View>
    );
  }

  if (step === 1) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.compassionTitle}>Which area calls to you today?</Text>
        <View style={styles.valuesList}>
          {valueAreas.map((area, i) => (
            <Pressable key={i} style={styles.valueItem} onPress={() => setStep(2)}>
              <Text style={styles.valueText}>{area}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.compassionTitle}>One small step</Text>
      <Text style={styles.toolDescription}>
        What's one tiny action you could take today{'\n'}
        that moves you toward this value?{'\n\n'}
        It doesn't have to be big.{'\n'}
        Direction matters more than distance.
      </Text>
      <Pressable style={styles.startButton} onPress={() => router.back()}>
        <Text style={styles.startButtonText}>I have something</Text>
      </Pressable>
    </View>
  );
};

// 3-Minute Breathing Space (MBCT)
const ThreeMinuteSpaceTool = () => {
  const [step, setStep] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (step === 0 || step === 4) return;
    
    const interval = setInterval(() => {
      setSeconds(s => {
        if (s >= 60) {
          setStep(prev => prev + 1);
          return 0;
        }
        return s + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  if (step === 0) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🕐</Text>
        <Text style={styles.toolTitle}>3-Minute Breathing Space</Text>
        <Text style={styles.toolDescription}>
          Three steps, one minute each:{'\n\n'}
          1. Awareness — what's here now?{'\n'}
          2. Gathering — focus on breath{'\n'}
          3. Expanding — include the whole body
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(1)}>
          <Text style={styles.startButtonText}>Begin</Text>
        </Pressable>
      </View>
    );
  }

  const phases = [
    { title: 'Awareness', instruction: 'What thoughts are present?\nWhat emotions?\nWhat body sensations?' },
    { title: 'Gathering', instruction: 'Bring attention to your breath.\nJust the breath, nothing else.\nIn and out.' },
    { title: 'Expanding', instruction: 'Expand awareness to your whole body.\nInclude any difficulty.\nHold it all with your breath.' },
  ];

  if (step === 4) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>✨</Text>
        <Text style={styles.toolTitle}>Space created.</Text>
        <Text style={styles.toolDescription}>
          You paused in the middle of your day.{'\n'}
          That space is always available to you.
        </Text>
        <Pressable style={styles.startButton} onPress={() => router.back()}>
          <Text style={styles.startButtonText}>Done</Text>
        </Pressable>
      </View>
    );
  }

  const current = phases[step - 1];

  return (
    <View style={styles.toolContent}>
      <Text style={styles.stepIndicator}>Minute {step} of 3</Text>
      <Text style={styles.compassionTitle}>{current.title}</Text>
      <Text style={styles.toolDescription}>{current.instruction}</Text>
      <Text style={styles.cycleCount}>{seconds}s</Text>
    </View>
  );
};

// Urge Surfing
const UrgeSurfingTool = () => {
  const [step, setStep] = useState(0);

  if (step === 0) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>🌊</Text>
        <Text style={styles.toolTitle}>Surf the Urge</Text>
        <Text style={styles.toolDescription}>
          Urges are like waves.{'\n'}
          They rise, peak, and fall.{'\n\n'}
          You don't have to act on them.{'\n'}
          You can ride them out.
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(1)}>
          <Text style={styles.startButtonText}>Begin</Text>
        </Pressable>
      </View>
    );
  }

  if (step === 1) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.compassionTitle}>Notice the urge</Text>
        <Text style={styles.toolDescription}>
          Where do you feel it in your body?{'\n'}
          What does it feel like?{'\n\n'}
          Tight? Hot? Buzzing?{'\n'}
          Just observe, don't fight.
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(2)}>
          <Text style={styles.startButtonText}>I feel it</Text>
        </Pressable>
      </View>
    );
  }

  if (step === 2) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.compassionTitle}>Breathe with it</Text>
        <Text style={styles.toolDescription}>
          Breathe into the area where you feel it.{'\n\n'}
          The urge is a wave.{'\n'}
          Let it rise. Let it peak.{'\n'}
          Keep breathing.
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(3)}>
          <Text style={styles.startButtonText}>Continue</Text>
        </Pressable>
      </View>
    );
  }

  if (step === 3) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.compassionTitle}>Watch it fall</Text>
        <Text style={styles.toolDescription}>
          Urges typically peak in 20-30 minutes.{'\n'}
          Often much less.{'\n\n'}
          It will pass.{'\n'}
          You're still here.
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(4)}>
          <Text style={styles.startButtonText}>Continue</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.toolEmoji}>🏄</Text>
      <Text style={styles.toolTitle}>You surfed it.</Text>
      <Text style={styles.toolDescription}>
        Every time you ride out an urge,{'\n'}
        it gets a little easier next time.{'\n\n'}
        You're building that muscle.
      </Text>
      <Pressable style={styles.startButton} onPress={() => router.back()}>
        <Text style={styles.startButtonText}>Done</Text>
      </Pressable>
    </View>
  );
};

// Thought Record (CBT)
const ThoughtRecordTool = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { title: 'Situation', prompt: 'What happened? Where were you? Who was there?' },
    { title: 'Emotions', prompt: 'What did you feel? Rate intensity 0-100.' },
    { title: 'Automatic thought', prompt: 'What went through your mind? The hot thought.' },
    { title: 'Evidence FOR', prompt: 'What supports this thought being true?' },
    { title: 'Evidence AGAINST', prompt: 'What suggests this thought isn\'t 100% true?' },
    { title: 'Balanced thought', prompt: 'What\'s a more balanced way to see this?' },
    { title: 'Re-rate emotions', prompt: 'How intense are the emotions now? 0-100.' },
  ];

  if (step === 0) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>📝</Text>
        <Text style={styles.toolTitle}>Thought Record</Text>
        <Text style={styles.toolDescription}>
          A classic CBT tool for examining thoughts.{'\n\n'}
          Not positive thinking—{'\n'}
          realistic thinking.{'\n\n'}
          We'll go through 7 steps.
        </Text>
        <Pressable style={styles.startButton} onPress={() => setStep(1)}>
          <Text style={styles.startButtonText}>Begin</Text>
        </Pressable>
      </View>
    );
  }

  const current = steps[step - 1];
  const isComplete = step > steps.length;

  if (isComplete) {
    return (
      <View style={styles.toolContent}>
        <Text style={styles.toolEmoji}>✨</Text>
        <Text style={styles.toolTitle}>Record complete.</Text>
        <Text style={styles.toolDescription}>
          You examined the thought, not just accepted it.{'\n\n'}
          This skill gets stronger with practice.{'\n'}
          The goal isn't to feel great—{'\n'}
          it's to think more flexibly.
        </Text>
        <Pressable style={styles.startButton} onPress={() => router.back()}>
          <Text style={styles.startButtonText}>Done</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.toolContent}>
      <Text style={styles.stepIndicator}>Step {step} of {steps.length}</Text>
      <Text style={styles.compassionTitle}>{current.title}</Text>
      <Text style={styles.toolDescription}>{current.prompt}</Text>
      <Text style={styles.thoughtHint}>Take a moment to reflect before continuing.</Text>
      <Pressable style={styles.startButton} onPress={() => setStep(s => s + 1)}>
        <Text style={styles.startButtonText}>{step < steps.length ? 'Next step' : 'Finish'}</Text>
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

  // Additional styles for new tools
  optionsList: {
    width: '100%',
    gap: spacing[3],
    marginBottom: spacing[6],
  },
  optionCard: {
    backgroundColor: colors.background.secondary,
    padding: spacing[4],
    borderRadius: borderRadius.md,
  },
  optionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  optionText: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
  },
  tippLetter: {
    fontSize: typography.sizes['4xl'],
    fontWeight: typography.weights.bold,
    color: colors.primary[600],
    marginBottom: spacing[2],
  },
  emotionList: {
    width: '100%',
    gap: spacing[3],
    marginBottom: spacing[6],
    maxHeight: 400,
  },
  emotionItem: {
    backgroundColor: colors.background.secondary,
    padding: spacing[3],
    borderRadius: borderRadius.md,
  },
  emotionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.primary[600],
    marginBottom: spacing[1],
  },
  emotionOpposite: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
  },
  emotionFamilies: {
    width: '100%',
    gap: spacing[3],
    marginBottom: spacing[6],
  },
  familyItem: {
    backgroundColor: colors.background.secondary,
    padding: spacing[3],
    borderRadius: borderRadius.md,
  },
  familyName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.primary[600],
    marginBottom: spacing[1],
  },
  familyEmotions: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
  },
  valuesList: {
    width: '100%',
    gap: spacing[2],
  },
  valueItem: {
    backgroundColor: colors.background.secondary,
    padding: spacing[4],
    borderRadius: borderRadius.md,
  },
  valueText: {
    fontSize: typography.sizes.base,
    color: colors.text.primary,
  },
  thoughtHint: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    fontStyle: 'italic',
    marginTop: spacing[4],
    marginBottom: spacing[6],
  },
});

