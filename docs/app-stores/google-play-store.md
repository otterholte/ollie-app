# Google Play Store Requirements for Ollie

## Overview

This document covers Google Play Store requirements for mental health apps, with specific guidance for Ollie's submission.

---

## Google Play Policies (Relevant)

### Health Apps Policy

Mental health apps must:
- Not make misleading claims
- Not claim to diagnose or treat without qualification
- Provide crisis resources prominently
- Handle sensitive content appropriately

### Sensitive Events Policy

- Don't exploit sensitive topics
- Provide appropriate resources
- Don't glorify self-harm

### User Data Policy

- Transparent data collection
- Data Safety section required
- Handle health data with care
- Encryption required for sensitive data

---

## Required Before Submission

### 1. Privacy Policy

**Must include**:
- Types of data collected
- How data is used
- Data sharing (third parties)
- Data security measures
- User rights (deletion, access)
- Contact information

**Location**:
- In-app (Settings)
- Play Store listing
- Developer website

**Requirements**:
- Must be publicly accessible
- Must be on valid URL
- Must be relevant to app

### 2. Data Safety Section

**Required declarations**:

**Data Collection**:
- What data types are collected
- Whether data is required or optional

**Data Sharing**:
- Whether data is shared with third parties
- Purpose of sharing

**Security Practices**:
- Encryption in transit
- Data deletion available
- Security review compliance

**For Ollie (privacy-first)**:
- Minimal data collection
- No third-party sharing
- Local storage default
- Data deletion available

### 3. Target API Level

**Current requirement**: API level 34 (Android 14)
- Must target current API
- Update regularly (annual requirement)

### 4. 64-bit Requirement

- All apps must include 64-bit version
- React Native/Expo handles this automatically

---

## Mental Health App Requirements

### No Medical/Therapeutic Claims

**Cannot say**:
- "Treats depression"
- "Clinically proven"
- "Therapeutic outcomes"
- "Medical treatment"

**Can say**:
- "Mental wellness tools"
- "Self-help resources"
- "Evidence-based techniques"
- "Supportive companion"

### Crisis Resources

**Must include**:
- Prominent access to crisis hotlines
- Easy to find (not buried)
- Working links/phone numbers

**Implementation**:
- Always accessible in app
- 988 Lifeline (US)
- International resources

### Disclaimers

**Required somewhere visible**:
> "This app is not a substitute for professional mental health care. If you are in crisis, please contact emergency services or a mental health professional."

### Content Guidelines

- No detailed methods of self-harm
- No glorification of suicide
- Appropriate handling of sensitive topics
- Age-appropriate content

---

## Play Store Listing Requirements

### App Details

**Title**: Max 30 characters
- "Ollie - Mental Wellness"
- "Ollie - Self-Care Companion"

**Short description**: Max 80 characters
- "A calm companion for your mental wellness journey"

**Full description**: Max 4000 characters
- Features and benefits
- What the app does
- Disclaimer included
- No keyword stuffing

### Graphics

**App Icon**:
- 512 x 512 PNG
- 32-bit with alpha
- Follow Material Design guidelines

**Feature Graphic**:
- 1024 x 500 PNG or JPG
- Required for featuring
- Represents app visually

**Screenshots**:
- Minimum 2, maximum 8
- Phone: 16:9 or 9:16 aspect ratio
- Minimum 320px, maximum 3840px
- Actual app screenshots

**Video (Optional)**:
- YouTube link
- 30 seconds - 2 minutes
- Shows actual app

### Content Rating

**IARC questionnaire**:
- Answer honestly about content
- Mental health likely: Teen (13+) or Mature (17+)
- Depends on content handling

**Ollie likely rating**: Teen (13+)
- Reference to difficult emotions
- Self-harm/suicide discussion (if crisis resources)
- Not explicit or graphic

### Category

**Primary**: Health & Fitness
**Tags**: Mental health, Self-care, Mindfulness, Wellness

---

## Data Safety Section Details

### Data Types to Consider

**Health info**:
- Mood data
- Symptom tracking
- Mental health status

**Personal info**:
- Name (if collected)
- Email (if collected)

**App activity**:
- App interactions
- In-app search history

**Device info**:
- Device ID (if used)
- Crash logs

### Ollie's Likely Declarations

**For local-only version**:
- Health info: Collected, not shared, deletion available
- App activity: Collected for functionality, not shared
- No data shared with third parties

**Practices**:
- Data encrypted in transit: Yes
- Data can be deleted: Yes (required)
- Committed to Play Families Policy: No (adult app)

---

## Technical Requirements

### Target SDK

- Must target latest Android SDK
- Currently: API 34 (Android 14)
- Update annually

### Minimum SDK

- Recommend: API 24 (Android 7.0)
- Expo default is usually appropriate

### Permissions

**Declare only what's needed**:
- INTERNET (for future sync)
- VIBRATE (for haptics)
- POST_NOTIFICATIONS (for reminders)

**Don't request unnecessarily**:
- CAMERA (unless needed)
- LOCATION (unless needed)
- CONTACTS (unless needed)

### App Bundles

- AAB format required (not APK)
- Play App Signing required
- Expo handles this with EAS Build

---

## In-App Purchases

### Google Play Billing

- All purchases through Google Play Billing
- Clear pricing
- Restore purchases available

### Mental Health Considerations

- **Never** paywall crisis resources
- Free tier should be substantial
- No exploitative monetization

---

## Testing Requirements

### Internal Testing

- Use internal testing track first
- Test on multiple devices
- Test minimum SDK version

### Closed/Open Testing (Optional)

- Gather feedback before launch
- Fix issues before wide release

### Pre-launch Report

- Google automated testing
- Check for crashes, security issues
- Review before full launch

---

## Common Rejection Reasons

### Policy Violations

1. **Misleading claims**: Health claims without evidence
2. **Privacy issues**: Data collection not disclosed
3. **Sensitive content**: Improper handling of mental health topics
4. **Missing functionality**: App doesn't work as described

### Technical Issues

1. **Crashes**: App crashes on startup
2. **Permissions**: Requesting unnecessary permissions
3. **API level**: Not targeting current API
4. **64-bit**: Missing 64-bit support

### Content Issues

1. **Inappropriate content**: Not matching rating
2. **Misleading description**: Doesn't match app
3. **Missing privacy policy**: Required for all apps
4. **Bad graphics**: Wrong size, poor quality

---

## Submission Checklist

### Before Submitting

- [ ] Privacy policy URL working and complete
- [ ] Data Safety section filled accurately
- [ ] Crisis resources in app and accessible
- [ ] Disclaimer present in app
- [ ] No medical claims in description
- [ ] App bundle (AAB) generated
- [ ] Targets API 34+
- [ ] 64-bit support included
- [ ] Tested on minimum SDK version
- [ ] Tested on multiple screen sizes

### Play Console

- [ ] App details complete
- [ ] Store listing complete
- [ ] Graphics uploaded (icon, feature, screenshots)
- [ ] Content rating questionnaire complete
- [ ] Data Safety section complete
- [ ] Pricing set (free or paid)
- [ ] Countries/regions selected
- [ ] Contact details provided

### Testing

- [ ] Internal testing passed
- [ ] Pre-launch report reviewed
- [ ] No critical issues
- [ ] Permissions justified

---

## Review Process

### Timeline

- Initial review: Hours to days
- First submission typically longer
- Updates usually faster

### If Rejected

1. Read policy feedback carefully
2. Address all issues
3. Resubmit with explanation
4. Can appeal if disagree

### Post-Launch

- Respond to reviews (optional but good)
- Monitor crash reports
- Update for policy changes
- Keep target API current

---

## Ongoing Requirements

### Annual Updates

- Target SDK must be current
- Update when Google changes requirements
- Usually have grace period

### Policy Changes

- Google updates policies regularly
- Monitor for relevant changes
- Update app if needed

### Data Safety Accuracy

- Keep Data Safety section current
- Update if app changes
- Accurate declarations required

---

## Resources

- [Google Play Console](https://play.google.com/console)
- [Google Play Policy Center](https://play.google.com/about/developer-content-policy/)
- [Data Safety Documentation](https://support.google.com/googleplay/android-developer/answer/10787469)
- [Content Rating](https://support.google.com/googleplay/android-developer/answer/9898843)


