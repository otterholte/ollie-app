# Ollie Product Vision & System Design

> **This is the source of truth for how Ollie works.**  
> Reference this document for all feature decisions, UX flows, and therapeutic tool implementation.

---

## The Core Principle (This Matters Most)

**The app should NOT ask the user to choose a therapy.**

That's exhausting and alienating.

Instead, the app should:

```
Observe → Suggest → Adapt
```

The user never needs to know which therapy they're using.  
**The app does.**

---

## The 3-Layer Experience Model

### 1️⃣ RIGHT NOW MODE
**Acute help: 30 seconds – 5 minutes**

#### Goal
Get the nervous system out of danger mode.  
No insight required.

#### Triggered By
- "I'm spiraling"
- "I hate myself"
- Panic, urges, obsessive loops, body checking, shame floods

#### What Happens

1. User taps **"I'm having a hard moment"**
2. App asks **ONE question only**:
   > "What's loud right now?"
   - Thoughts
   - Urges
   - Emotions
   - Body
   - Everything
3. App immediately serves **one tool, not a menu**

#### Tools Used Here (By Therapy)

| Source | Tools |
|--------|-------|
| **DBT** | Distress tolerance (temperature, paced breathing, grounding), urge surfing |
| **MBCT / Mindfulness** | Short sensory anchors, "name and notice" practices |
| **ACT** | Defusion ("I'm having the thought that…"), values reminder without positivity |
| **OCD-safe** | Delay + redirect (NOT reassurance) |
| **BPD-safe** | Validation first, regulation second |

#### Critical Rule
> **No cognitive work while dysregulated.**

Ollie's role here is **containment, not insight.**

---

### 2️⃣ DAILY MODE
**5–10 minutes, habit-forming**

#### Goal
Stabilize behavior + build self-trust through consistency.

This is where habit mechanics shine — but adult.

#### Daily Flow (Simple, Repeatable)

**Step 1: Check-in (10 seconds)**
- Mood slider
- Energy slider  
- Self-talk tone (neutral → harsh)

**Step 2: One suggested focus**
> "Today looks like a self-attack day."  
> "Today looks like an avoidance day."

**Step 3: One small task**

Always achievable. Always optional.

Examples:
- Drink water
- Step outside
- Eat something
- Send one message
- Stop body checking for 10 minutes
- Delay a compulsion
- Do one values-aligned action

#### Therapies Embedded Here
- Behavioral activation (depression)
- DBT skills practice
- ACT committed action
- Habit science
- Self-compassion (not affirmations)

#### No Streak Pressure
Missed days are expected.

Ollie says:
> "You came back. That matters."

---

### 3️⃣ REFLECTION MODE
**Weekly / Optional**

#### Goal
Address core beliefs and patterns **only when stable**.

This is where deep change happens — but slowly.

#### What The App Does

Surfaces **patterns, not judgments**:
> "Self-hate spikes after social comparison"  
> "Body checking increases with poor sleep"

Asks **curious questions**, not "why" questions.

#### Therapies Used Here

| Therapy | Application |
|---------|-------------|
| **Schema Therapy** | Identify schemas (Defectiveness, Unlovability, Failure), track when they activate |
| **MBT** | "What might you have been feeling?" "What might they have been thinking?" Reduces black-and-white thinking |
| **Body Dysmorphia Tools** | Reduce checking/avoidance cycles, shift from appearance to function, values-based attention |
| **CBT (lightweight)** | Thought → emotion → behavior mapping. No "challenge every thought" nonsense |

---

## How The App Stays SIMPLE (Critical)

### The User NEVER Sees
- ❌ Therapy names
- ❌ Diagnostic labels
- ❌ Long explanations
- ❌ Tool libraries
- ❌ Choice paralysis

### The App DOES
- ✅ Choose tools for them
- ✅ Rotate approaches based on response
- ✅ Learn what helps this user
- ✅ Make decisions invisible

**Think: Spotify for coping skills**

---

## How It Becomes Fun (Without Being Childish)

### Ollie Reacts Subtly
- Posture changes
- Small animations
- Environment shifts

### Progress Is Shown As
- Stability
- Fewer spikes
- Faster recovery
- **NOT** "levels" or "points"

**Fun = gentle reward, not gamification pressure**

---

## Long-Term Growth Tracking (Quiet, Powerful)

Instead of "success," track:

| Metric | What It Measures |
|--------|------------------|
| Time to calm | How quickly you recover from spirals |
| Self-attack frequency | How often the inner critic takes over |
| Compulsion delay length | Building tolerance (OCD) |
| Self-compassion attempts | Trying kindness, not perfecting it |
| Values-based actions | Living aligned with what matters |

**Growth = resilience, not happiness.**

---

## Why This Works For All Conditions

| Condition | Why This Model Helps |
|-----------|---------------------|
| **BPD** | Regulation first, validation, MBT for mentalization |
| **OCD** | No reassurance, delay & refocus, uncertainty tolerance |
| **Body Dysmorphia** | Reduces checking, shifts attention to function/values |
| **Anxiety** | Nervous system tools + ACT acceptance |
| **Depression** | Behavioral activation, tiny achievable actions |
| **Self-loathing** | Externalizes the critical voice, builds trust slowly |
| **Core Beliefs** | Schema work only when stable, not during crisis |

---

## The Big Differentiator

Most apps say:
> "Change how you think."

**Ollie says:**
> "Let's understand what's happening — then do one small thing."

That's why people will come back.

---

## Tool Selection Logic

### Right Now Mode Selection

```
IF user selects "Thoughts" → Defusion, Grounding
IF user selects "Urges" → Urge surfing, TIPP, Delay
IF user selects "Emotions" → Validation, Naming, Breathing
IF user selects "Body" → Body scan, Temperature, Movement
IF user selects "Everything" → Simplest grounding first
```

### Daily Mode Selection

```
IF self-talk = harsh → Self-compassion focus
IF energy = low → Behavioral activation (tiny)
IF mood = low + pattern of avoidance → Gentle exposure prompt
IF user has OCD focus → Delay-based task
IF user has body dysmorphia focus → Values/function task
```

### Reflection Mode Triggers

```
ONLY show reflection prompts when:
- User has been stable for 3+ days
- User is not in acute distress
- User has completed at least 5 check-ins
- User opts in to deeper work
```

---

## Implementation Priorities

### Phase 1: Core Loop
1. Right Now Mode (crisis support)
2. Daily Check-in (simple)
3. One tool per category
4. Basic pattern surfacing

### Phase 2: Intelligence
1. Tool effectiveness tracking per user
2. Pattern detection algorithms
3. Personalized suggestions
4. Time-of-day patterns

### Phase 3: Depth
1. Schema identification (opt-in)
2. Core belief work
3. Relationship pattern tracking (MBT)
4. Long-term growth visualization

---

## What Ollie Never Does

- ❌ Diagnoses users
- ❌ Promises outcomes
- ❌ Uses streak guilt
- ❌ Offers reassurance (OCD-unsafe)
- ❌ Pushes cognitive work during crisis
- ❌ Makes users feel behind
- ❌ Compares users to others
- ❌ Uses toxic positivity
- ❌ Requires long sessions
- ❌ Overwhelms with choices

---

## What Ollie Always Does

- ✅ Validates first
- ✅ Keeps it simple
- ✅ Matches tool to state
- ✅ Celebrates showing up
- ✅ Respects bad days
- ✅ Provides crisis resources
- ✅ Learns from the user
- ✅ Stays calm and grounded
- ✅ Makes progress visible but gentle
- ✅ Works offline

---

## The User's Internal Experience

**Before Ollie:**
> "I'm broken. I don't know what to do. Everything is too much."

**During Ollie (Right Now):**
> "I just need to do this one thing. I can do this one thing."

**After Ollie (Daily Use):**
> "I'm starting to notice my patterns. I recovered faster that time."

**Long-term with Ollie:**
> "I understand myself better. I have tools that actually work for me."

---

*This document is the north star. Every feature, every screen, every word of copy should align with this vision.*


