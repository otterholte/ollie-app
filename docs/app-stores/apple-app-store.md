# Apple App Store Requirements for Ollie

## Overview

This document covers Apple App Store requirements for mental health apps, with specific guidance for Ollie's submission.

---

## App Store Review Guidelines (Relevant Sections)

### 1.4 Physical Harm

- Apps providing medical advice require professional involvement
- Crisis resources must be prominently displayed
- Cannot make medical/diagnostic claims without proper credentials

### 1.5 Developer Information

- Accurate contact information required
- Support URL must be functional
- Privacy policy must be accessible

### 5.1 Privacy

- Privacy policy URL required
- Describe all data collection
- App Privacy "nutrition labels" in App Store Connect
- Handle sensitive data appropriately (health data)

### 5.6 Developer Code of Conduct

- Cannot exploit vulnerable users
- Honest about app capabilities

---

## Required Before Submission

### 1. Privacy Policy

**Must include**:
- What data is collected
- How data is used
- Data storage (local vs. cloud)
- Third-party sharing (none for Ollie ideally)
- User rights (access, delete)
- Contact information

**Location**: 
- Link in app (Settings)
- Link in App Store listing
- Accessible without login

### 2. Support URL

**Requirements**:
- Valid, working URL
- Contains support information
- How to contact for issues
- FAQ helpful but not required

### 3. Crisis Resources

**For mental health apps, Apple expects**:
- Prominent crisis hotline information
- Easy access (not buried)
- Localized if possible

**Ollie implementation**:
- Accessible from any screen (2 taps max)
- 988 Suicide & Crisis Lifeline
- Crisis Text Line
- International resources link

### 4. Age Rating

**Options**:
- 4+ (unlikely for mental health app)
- 9+ (possible if very light content)
- **12+ (most likely for Ollie)** — "Infrequent/Mild" mature themes
- 17+ (if discussion of self-harm, suicide is explicit)

**Recommendation**: Start with 12+ unless content requires 17+

### 5. App Category

**Primary**: Health & Fitness
**Secondary**: Lifestyle (optional)

---

## Mental Health App Specific Requirements

### No Medical Claims

**Cannot say**:
- "Treats anxiety"
- "Cures depression"
- "Clinically proven to..."
- "Therapeutic treatment for..."

**Can say**:
- "Tools for managing difficult emotions"
- "Self-help resources"
- "Supportive companion for mental wellness"
- "Based on evidence-based practices"

### Disclaimer Requirements

**Must include somewhere accessible** (e.g., About screen, onboarding):
> "This app is not a substitute for professional mental health treatment. If you're experiencing a mental health emergency, please contact emergency services or a crisis hotline."

### Crisis Intervention

Apple may reject apps that discuss suicide/self-harm without:
- Clear crisis resources
- Appropriate content handling
- No detailed methods or glorification

---

## App Privacy Nutrition Labels

### Required in App Store Connect

You'll need to declare:

**Data Linked to You** (if any):
- Health & Fitness (mood, etc.)
- User Content (journal entries)

**Data Not Linked to You** (if anonymous):
- Usage Data
- Crash Data

**For Ollie (privacy-first)**:
- Most data should be "Data Not Collected" or "Data Not Linked to You"
- If local-only, minimal declarations needed
- If cloud sync added later, more declarations

---

## App Store Listing Requirements

### Screenshots

**Required sizes**:
- iPhone 6.7" (1290 x 2796)
- iPhone 6.5" (1284 x 2778 or 1242 x 2688)
- iPhone 5.5" (1242 x 2208)
- iPad Pro 12.9" (2048 x 2732) — if supporting iPad

**Content guidelines**:
- Show actual app screens
- Can add device frames, backgrounds
- Text overlays allowed
- Must accurately represent app

### App Preview Video (Optional but Recommended)

- 15-30 seconds
- Show app in action
- No misleading content
- Same sizes as screenshots

### Description

**Maximum**: 4000 characters

**Should include**:
- What app does
- Key features
- Disclaimer about not being therapy
- Mention of crisis resources

**Example opening**:
> "Ollie is a calm, supportive companion for your mental wellness journey. Using evidence-based tools from cognitive behavioral therapy, mindfulness, and other approaches, Ollie helps you understand your thoughts and emotions, build healthy habits, and develop self-compassion — without pressure or judgment."

### Keywords

**100 characters max**

**Suggestions**:
`mental health, self-care, anxiety, depression, mindfulness, CBT, DBT, mood tracker, journal, therapy, wellness, self-help`

### What's New (for updates)

- Clear description of changes
- Bug fixes and improvements

---

## Technical Requirements

### iOS Version Support

- Minimum: iOS 14+ (recommended for React Native/Expo)
- Current iOS support expected

### Device Support

- All iPhone sizes
- iPad optional but recommended
- No Apple Watch required initially

### Performance

- App should not crash
- Reasonable load times
- Memory efficient
- Works offline

### Accessibility

- VoiceOver support
- Dynamic Type support
- Sufficient contrast

---

## In-App Purchases (If Any)

### Considerations for Mental Health Apps

- **Never** paywall crisis resources
- Free tier should be substantial
- Don't exploit vulnerable users
- Clear what's free vs. paid

### App Store Rules

- All purchases through Apple IAP
- Clear pricing
- Restore purchases function
- Subscription terms clear

**Ollie recommendation**: Start free, no IAP initially

---

## Common Rejection Reasons

### 1. Bugs or Crashes
- Test thoroughly before submission
- Test on multiple devices

### 2. Incomplete Information
- All metadata required
- Screenshots must be current
- Description must be accurate

### 3. Privacy Policy Issues
- Must be accessible
- Must accurately describe practices
- Must have valid URL

### 4. Guideline 1.4 (Health Apps)
- Medical claims without credentials
- Missing crisis resources
- Inappropriate mental health content

### 5. Guideline 5.1 (Privacy)
- Data collection not disclosed
- Privacy nutrition labels incomplete

---

## Submission Checklist

### Before Submitting

- [ ] Privacy policy URL working
- [ ] Support URL working
- [ ] Crisis resources accessible in app
- [ ] Disclaimer present
- [ ] All screenshots correct sizes
- [ ] Description doesn't make medical claims
- [ ] Age rating appropriate
- [ ] App Privacy labels filled out
- [ ] Tested on multiple devices
- [ ] Tested on minimum iOS version
- [ ] VoiceOver tested

### App Store Connect

- [ ] App Information complete
- [ ] Pricing and Availability set
- [ ] App Privacy answered
- [ ] Age Rating questionnaire complete
- [ ] Build uploaded
- [ ] Screenshots uploaded
- [ ] App Preview (optional) uploaded
- [ ] Keywords set
- [ ] Description complete
- [ ] What's New (for updates)

### Build Requirements

- [ ] Production signing
- [ ] Bundle ID matches App Store Connect
- [ ] Version number correct
- [ ] Build number incremented

---

## Review Process

### Timeline

- Initial review: 24-48 hours typically
- Can be faster or slower
- Rejections get feedback

### If Rejected

1. Read feedback carefully
2. Address all points
3. Re-submit with notes explaining changes
4. Can appeal if disagree

### Expedited Review

- Available for critical bug fixes
- Not for initial submission
- Use sparingly

---

## Post-Launch Requirements

### Maintaining Compliance

- Keep URLs working
- Update privacy policy if data practices change
- Keep crisis resources current
- Respond to user reviews (optional but good)

### Updates

- Follow same guidelines
- Update What's New
- Don't remove existing features without notice

---

## Resources

- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)


