# 🦦 Ollie

**A calm companion for hard days.**

Ollie is a therapeutic self-care app that helps you work through self-hatred, shame, and negative thought spirals — not by forcing positivity, but by sitting beside you, helping you understand what's happening, and guiding you toward small, repeatable actions that rebuild self-trust over time.

---

## Why an Otter?

Otters aren't just cute — they're the perfect metaphor for mental health recovery:

| What Otters Do | What It Means for You |
|----------------|----------------------|
| 🌊 **Float on their backs** | Rest without guilt. You don't always have to swim. |
| 🤝 **Hold hands while sleeping** | Connection matters. You're not meant to drift alone. |
| 🔧 **Use tools (rocks to open shells)** | Coping skills are tools. Use what works. |
| 🧼 **Groom constantly** | Self-care is maintenance, not a one-time fix. |
| 🎮 **Play frequently** | Recovery includes lightness, not just work. |

Ollie floats beside you. Never rushing. Never judging. Just... present.

---

## The Problem with Most Mental Health Apps

❌ **"Stay positive!"** — Toxic positivity that dismisses real pain  
❌ **"You've got this!"** — Pressure when you're already overwhelmed  
❌ **"Build a 30-day streak!"** — Shame spirals when you miss a day  
❌ **"Choose your therapy:"** — Overwhelming clinical choices  

**Ollie is different.**

✅ Acknowledges that things are hard  
✅ Never pressures, never guilts  
✅ No streaks — just "days practiced"  
✅ Chooses tools FOR you based on how you're feeling  

---

## How Ollie Works: The 3-Layer Experience

### 🌊 Layer 1: Right Now Mode
**For when you're spiraling. 30 seconds to 5 minutes.**

When everything feels like too much, tap "Need to float?" and Ollie takes over:

1. **No decisions required** — Ollie guides you
2. **Breathing first** — Activates your calm nervous system
3. **Grounding next** — 5-4-3-2-1 sensory anchoring
4. **Holding space** — "You don't have to solve anything right now"

*Tools used: DBT distress tolerance, mindfulness anchors, ACT defusion*

**The key insight:** No cognitive work while dysregulated. Ollie's job here is containment, not insight.

---

### 📅 Layer 2: Daily Mode
**Habit-forming. 5-10 minutes.**

This is where lasting change happens — through tiny, consistent actions:

**Daily Check-in (30 seconds):**
- Mood (not forced happy — just honest)
- Energy level
- Inner voice tone (kind → harsh)

**One Suggested Focus:**
- "Today looks like a self-attack day"
- "Today looks like an avoidance day"

**One Small Task (always optional):**
- Drink water
- Step outside
- Send one message
- Do one values-aligned action

*Tools used: Behavioral activation, DBT skills practice, ACT committed action*

**No streak pressure.** Missed days are expected. Ollie says: *"You came back. That matters."*

---

### 🔍 Layer 3: Reflection Mode
**Weekly. Only when stable.**

This is where deep patterns emerge — but slowly, safely:

- **Pattern Recognition:** "Self-criticism spikes after social comparison"
- **Schema Awareness:** Identifying core beliefs (defectiveness, unlovability)
- **Mentalization:** "What might you have been feeling? What might they have been thinking?"

*Tools used: Schema therapy, MBT, CBT thought records*

**Important:** Reflection is optional. Ollie reminds you: "Only do this when you're stable. Crisis tools are always available."

---

## The Core Principle

> **Observe → Suggest → Adapt**

The user never needs to know which therapy they're using. Ollie does.

- No therapy names shown
- No diagnostic labels
- No long explanations
- Tools are suggested based on current state, not forced menus

Think: **Spotify for coping skills** — personalized, seamless, invisible orchestration.

---

## Who Ollie Helps

Ollie is designed for people dealing with:

- 🧠 **ADHD** — External structure, tiny steps, no guilt about inconsistency
- 💜 **BPD** — Validation first, regulation second, DBT skills
- 🔄 **OCD** — Delay & redirect (never reassurance), uncertainty tolerance
- 🪞 **Body Dysmorphia** — Values over appearance, reduce checking cycles
- 😰 **Anxiety** — Grounding, breathing, worry containment
- 🌧️ **Depression** — Behavioral activation, lowest possible bar for action
- 💔 **Self-Loathing** — Externalize the voice, build self-trust through action

---

## Ollie's Voice

What Ollie **says**:
- "It sounds like you're carrying a lot right now."
- "That makes sense given what you've been through."
- "Would you like to try something that might help?"
- "You showed up today. That's something."

What Ollie **never says**:
- "Stay positive!"
- "You just need to..."
- "Everything happens for a reason!"
- "You should feel better by now."

---

## Evidence-Based, Not Clinical

Ollie draws from proven therapeutic frameworks:

| Framework | How Ollie Uses It |
|-----------|-------------------|
| **CBT** | Thought records, cognitive distortions (without jargon) |
| **DBT** | Distress tolerance, emotion regulation, TIPP skills |
| **ACT** | Values clarification, defusion ("I'm having the thought that...") |
| **MBCT** | Mindfulness, 3-minute breathing space |
| **MBT** | Mentalization, perspective-taking |
| **Schema Therapy** | Core belief identification, mode awareness |
| **Self-Compassion** | Kristin Neff's 3-component model |

But you'll never see these names in the app. Just gentle tools that help.

---

## Progress Without Pressure

Ollie tracks growth differently:

❌ No levels  
❌ No points  
❌ No streaks  
❌ No leaderboards  

✅ **Stability** — Fewer dramatic swings  
✅ **Recovery time** — Faster return to baseline  
✅ **Pattern awareness** — Understanding your triggers  
✅ **Showing up** — Days practiced, not perfection  

---

## Technical Stack

- **Framework:** React Native + Expo
- **Navigation:** Expo Router
- **State:** Zustand
- **Animations:** React Native Reanimated
- **Storage:** Async Storage + Secure Store
- **Platforms:** iOS, Android, Web

---

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on web
npx expo start --web

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android
```

---

## Project Structure

```
src/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigator (Today, Tools, Habits, Reflect)
│   ├── float.tsx          # Right Now mode
│   ├── check-in.tsx       # Daily check-in flow
│   └── tool/[id].tsx      # Individual tool screens
├── components/            # Shared UI components
├── constants/             # Design system (colors, typography, spacing)
├── features/              # Feature modules
├── stores/                # Zustand state management
└── docs/                  # Therapeutic & technical documentation
```

---

## Design Philosophy

**Soft blue theme** — Like calm water. Ollie floats on it.

- Never harsh or jarring
- Generous spacing for breathing room
- Gentle animations (never snappy)
- Touch targets sized for shaky hands

---

## Safety First

- 🆘 Crisis resources always accessible (988, Crisis Text Line)
- 🔒 All data stored locally (privacy-first)
- ⚠️ Clear disclaimers (not a replacement for professional help)
- 🚨 Crisis keyword detection with gentle intervention

---

## The Big Differentiator

Most apps say: **"Change how you think."**

Ollie says: **"Let's understand what's happening — then do one small thing."**

That's why people come back.

---

## Contributing

This is a personal project, but if you're interested in contributing to mental health accessibility, feel free to open an issue or PR.

---

## License

MIT

---

<p align="center">
  <br>
  🦦
  <br>
  <em>Float with Ollie. One moment at a time.</em>
</p>


