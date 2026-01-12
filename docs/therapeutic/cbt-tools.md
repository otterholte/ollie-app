# CBT (Cognitive Behavioral Therapy) Tools for Ollie

## Overview

Cognitive Behavioral Therapy focuses on the relationship between thoughts, feelings, and behaviors. By identifying and challenging unhelpful thought patterns, people can change how they feel and act.

---

## Core Concepts

### The CBT Triangle

```
        Thoughts
           /\
          /  \
         /    \
        /      \
   Feelings----Behaviors
```

- **Thoughts** influence how we feel
- **Feelings** influence how we behave
- **Behaviors** reinforce our thoughts
- Changing any one affects the others

### Automatic Thoughts

Spontaneous thoughts that pop into our minds, often:
- Quick and habitual
- Taken as true without questioning
- Negative when we're struggling
- Based on core beliefs formed earlier in life

---

## Cognitive Distortions

Help users identify these unhelpful thinking patterns:

### 1. All-or-Nothing Thinking
**Pattern**: Seeing things in black and white categories
**Example**: "If I'm not perfect, I'm a total failure"
**Reframe prompt**: "What's in the middle ground?"

### 2. Catastrophizing
**Pattern**: Expecting the worst possible outcome
**Example**: "If I make a mistake, everything will fall apart"
**Reframe prompt**: "What's more likely to happen?"

### 3. Mind Reading
**Pattern**: Assuming you know what others think
**Example**: "They think I'm stupid"
**Reframe prompt**: "What evidence do I actually have?"

### 4. Fortune Telling
**Pattern**: Predicting negative outcomes
**Example**: "I know I'll fail this"
**Reframe prompt**: "Can I really predict the future?"

### 5. Emotional Reasoning
**Pattern**: "I feel it, so it must be true"
**Example**: "I feel worthless, so I am worthless"
**Reframe prompt**: "Feelings aren't facts. What would I say to a friend?"

### 6. Should Statements
**Pattern**: Rigid rules about how things must be
**Example**: "I should be able to handle this"
**Reframe prompt**: "Says who? What if I replaced 'should' with 'could'?"

### 7. Labeling
**Pattern**: Attaching negative labels to self/others
**Example**: "I'm such an idiot"
**Reframe prompt**: "Is this label fair and complete?"

### 8. Discounting Positives
**Pattern**: Dismissing positive experiences
**Example**: "That doesn't count"
**Reframe prompt**: "What if I let this positive thing stand?"

### 9. Personalization
**Pattern**: Blaming yourself for things outside your control
**Example**: "It's all my fault"
**Reframe prompt**: "What factors were outside my control?"

### 10. Overgeneralization
**Pattern**: Drawing broad conclusions from single events
**Example**: "This always happens to me"
**Reframe prompt**: "Is this really always, or is it sometimes?"

---

## Tools for Ollie

### 1. Thought Record

**Purpose**: Capture and examine automatic thoughts

**Implementation Flow**:
1. **Situation**: What happened? Where? When?
2. **Emotions**: What did you feel? (1-10 intensity)
3. **Automatic Thought**: What went through your mind?
4. **Cognitive Distortion**: Which pattern fits? (optional)
5. **Evidence For**: What supports this thought?
6. **Evidence Against**: What contradicts it?
7. **Balanced Thought**: What's a more helpful perspective?
8. **Outcome**: How do you feel now? (1-10)

**App UX Guidelines**:
- Make each step optional after situation/emotion
- Use gentle prompts, not demands
- Allow quick entries (just situation + thought)
- Offer distortion suggestions, don't force identification
- Save partial entries

**Example prompts**:
- "What was going through your mind?"
- "If a friend had this thought, what might you say to them?"
- "What's another way to look at this?"

### 2. Cognitive Distortion Identifier

**Purpose**: Learn to recognize thinking patterns

**Implementation**:
- User inputs a thought
- App suggests possible distortions
- Shows examples and alternatives
- Not diagnostic, educational

**UX Guidelines**:
- Present as "This might be..." not "This is..."
- Multiple distortions can apply
- Focus on curiosity, not correction

### 3. Behavioral Experiment Planner

**Purpose**: Test beliefs through action

**Implementation Flow**:
1. **Belief to Test**: What do you believe will happen?
2. **Prediction**: What specifically do you expect? (0-100% confidence)
3. **Experiment**: What will you do to test this?
4. **Outcome**: What actually happened?
5. **Learning**: What does this tell you about the belief?

**Example**:
- Belief: "If I speak up in the meeting, everyone will judge me"
- Prediction: "People will look annoyed" (80% sure)
- Experiment: "Share one idea in tomorrow's meeting"
- Outcome: "Two people nodded, one asked a follow-up question"
- Learning: "My prediction wasn't accurate this time"

### 4. Activity Scheduling

**Purpose**: Plan activities to improve mood (Behavioral Activation)

**Implementation**:
- Schedule activities that provide:
  - **Mastery**: Sense of accomplishment
  - **Pleasure**: Enjoyment
- Rate activities afterward (1-10)
- Identify patterns

**UX Guidelines**:
- Start very small (make bed, not clean house)
- Focus on "doing" not "feeling like doing"
- No judgment for missed activities

### 5. Core Belief Worksheet

**Purpose**: Identify and work with deeper beliefs

**Implementation Flow**:
1. **Identify**: What belief comes up repeatedly?
2. **Origin**: Where might this have started?
3. **Evidence supporting**: What seems to confirm it?
4. **Evidence against**: What contradicts it?
5. **Alternative belief**: What's a more balanced view?
6. **Action**: What would you do differently with the new belief?

**Common Core Beliefs**:
- "I'm not good enough"
- "I'm unlovable"
- "I'm incompetent"
- "The world is dangerous"
- "I can't trust anyone"

**UX Guidelines**:
- This is deeper work - not for crisis moments
- Progress slowly over time
- Validate that beliefs feel true even when examining them

---

## Implementation Notes

### Tone Guidelines
- "Let's explore this thought together"
- "It's normal for our minds to do this"
- "What do you notice about this pattern?"
- Never: "You're being irrational"

### Progress Without Pressure
- Track patterns gently over time
- "You've been noticing your thoughts more this week"
- Not: "You've completed 5 thought records!"

### Integration with Other Modalities
- Pair with mindfulness for acceptance of difficult thoughts
- Use ACT defusion when thoughts are sticky
- Combine with behavioral activation for depression
- Add DBT skills for emotional intensity

---

## When to Use vs. Other Approaches

| Situation | Best Approach |
|-----------|---------------|
| Repetitive negative thoughts | CBT thought records |
| Overwhelming emotions | DBT distress tolerance |
| Stuck in thoughts despite evidence | ACT defusion |
| Low motivation, withdrawal | Behavioral activation |
| Deep shame patterns | Schema therapy |
| Need to just breathe | Mindfulness |

---

## Sample Ollie Prompts

**Starting a thought record**:
"Something's on your mind. Would you like to write it out? Sometimes getting thoughts on paper helps us see them more clearly."

**Identifying distortions**:
"I notice this thought might be doing some 'mind reading' - assuming you know what others think. Does that resonate?"

**Offering balanced perspective**:
"You found some evidence against this thought. If a friend was in your shoes, what might you tell them?"

**Completing exercise**:
"You took time to look at this thought from different angles. That takes courage. How are you feeling now?"


