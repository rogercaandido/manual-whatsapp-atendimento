# Mobile Viewport Optimization - Testing Checklist

**Feature**: Mobile Layout Optimization - Eliminate Unnecessary Scroll
**Implementation Date**: 2025-10-28
**Status**: Ready for Testing

---

## Quick Testing Guide

### 🔴 CRITICAL Tests (Must Pass)

#### Test 1: Mobile Viewport (375px) - iPhone SE
**Goal**: Verify all CTAs visible without scroll

**Steps**:
1. Open `index.html` in Chrome
2. Press F12 to open DevTools
3. Toggle device toolbar (Ctrl+Shift+M)
4. Select "iPhone SE" (375x667) from device dropdown
5. Reload page (Ctrl+R)

**Pass Criteria**:
- [ ] Hero title "MANDA NO" + WhatsApp icon visible
- [ ] Hero subtitle visible
- [ ] Features pills visible (may wrap to 2 lines)
- [ ] **PRIMARY CTA "Começar agora" visible WITHOUT SCROLL**
- [ ] **SECONDARY CTA "Preciso de ajuda" visible WITHOUT SCROLL**
- [ ] Disclaimer visible or just below (small scroll acceptable)
- [ ] No horizontal overflow
- [ ] Spacing doesn't feel cramped

**If ANY CTA not visible without scroll**: ❌ FAIL - Implementation needs adjustment

---

#### Test 2: Desktop Viewport (1440px) - Regression Check
**Goal**: Verify ZERO visual changes from before optimization

**Steps**:
1. In DevTools, switch to "Responsive" mode
2. Set width: 1440px, height: 900px
3. Reload page (Ctrl+R)
4. Compare visually with previous version (if screenshot available)

**Pass Criteria**:
- [ ] Layout IDENTICAL to before optimization
- [ ] Hero vertically centered in viewport
- [ ] Gaps between sections look generous (80px)
- [ ] Hover effects on CTAs work correctly
- [ ] Hover effects on feature pills work correctly
- [ ] No layout shifts or jumps

**Inspect Computed Styles** (Right-click .header → Inspect):
- [ ] `min-height: 800px` applied
- [ ] `gap: 80px` applied
- [ ] `padding-bottom: 80px` applied

**If ANY visual difference detected**: 🚨 BLOCKER - Rollback immediately

---

## Extended Testing

### Test 3: iPhone 12/13 (390px)
**Device**: iPhone 12/13 (390x844)

**Pass Criteria**:
- [ ] All elements visible without scroll
- [ ] Layout has comfortable breathing room
- [ ] Spacing feels balanced

---

### Test 4: iPhone 14 Pro Max (430px)
**Device**: iPhone 14 Pro Max (430x932)

**Pass Criteria**:
- [ ] All elements visible without scroll
- [ ] Layout has generous breathing room
- [ ] Visual hierarchy clear

---

### Test 5: Tablet (768px)
**Device**: iPad Mini (768x1024)

**Pass Criteria**:
- [ ] No regression vs. before optimization
- [ ] Moderate spacing applied correctly
- [ ] `min-height: 700px` applied (inspect computed styles)
- [ ] Gaps are 40px between sections

---

## Accessibility Testing

### Test 6: Touch Targets (Mobile)
**Viewport**: 375px

**Steps**:
1. Right-click Primary CTA → Inspect
2. Check "Computed" tab → Box Model
3. Verify height

**Pass Criteria**:
- [ ] Primary CTA height ≥ 44px (actual should be ~52px with padding)
- [ ] Secondary CTA height ≥ 44px
- [ ] Gap between CTAs ≥ 8px (actual is 16px)
- [ ] Both buttons easily tappable

---

### Test 7: Font Legibility
**Viewport**: 375px

**Pass Criteria**:
- [ ] Hero title: 48px (readable without zoom)
- [ ] Hero subtitle: 18px (readable without zoom)
- [ ] CTA text: 16px (readable without zoom)
- [ ] Disclaimer: 16px (readable without zoom)

---

### Test 8: Lighthouse Audit
**Browser**: Chrome DevTools

**Steps**:
1. Open DevTools → Lighthouse tab
2. Select "Mobile" device
3. Select "Accessibility" category only
4. Click "Analyze page load"

**Pass Criteria**:
- [ ] Accessibility score ≥ 95
- [ ] No new accessibility errors introduced
- [ ] Performance score not degraded

---

### Test 9: Contrast Ratios
**Tool**: Chrome DevTools or WebAIM Contrast Checker

**Pass Criteria**:
- [ ] Hero title (zinc-100 #f4f4f5) vs dark background: WCAG AA pass
- [ ] Primary CTA text (black) vs green (#74d200): WCAG AA pass
- [ ] Secondary CTA text (zinc-500) vs black: WCAG AA pass

---

## Cross-Browser Testing

### Test 10: Chrome
**Viewports**: 375px, 768px, 1440px

**Pass Criteria**:
- [ ] All viewports render correctly
- [ ] CSS filters work (if any)
- [ ] Flexbox layout works
- [ ] No console errors

---

### Test 11: Firefox
**Viewports**: 375px, 768px, 1440px

**Steps**:
1. Open index.html in Firefox
2. Press F12 → Toggle responsive design mode
3. Test same viewports as Chrome

**Pass Criteria**:
- [ ] Layout matches Chrome
- [ ] No Firefox-specific rendering issues
- [ ] No console errors

---

### Test 12: Edge (Optional)
**Viewports**: 375px, 1440px

**Pass Criteria**:
- [ ] Layout matches Chrome
- [ ] No Edge-specific issues

---

## Physical Device Testing (Optional but Recommended)

### Test 13: Real Smartphone
**Device**: Any smartphone (iPhone, Android)

**Steps**:
1. Host site locally or deploy to test server
2. Open on actual phone
3. Test touch interactions

**Pass Criteria**:
- [ ] All elements visible without forced scroll
- [ ] Touch interactions on CTAs work smoothly
- [ ] No rendering glitches
- [ ] No horizontal scroll

---

## CSS Validation

### Test 14: W3C CSS Validator
**Tool**: https://jigsaw.w3.org/css-validator/

**Steps**:
1. Open W3C CSS Validator
2. Upload `styles/variables.css`
3. Upload `styles/main.css`
4. Check for errors

**Pass Criteria**:
- [ ] Zero CSS errors
- [ ] Zero CSS warnings (or only minor warnings)

---

## Constitution Compliance

### Test 15: Mobile-First Verification
**File**: styles/main.css

**Checklist**:
- [ ] Base `.header` styles use mobile values (min-height: auto, gaps 24px/16px)
- [ ] Desktop restoration uses `@media (min-width: 768px)` and `(min-width: 1024px)`
- [ ] No mobile overrides in `max-width` queries
- [ ] CSS variables used consistently (no hardcoded px values in new code)

---

## Test Results Summary

### Critical Tests
- [ ] Test 1 (Mobile 375px): PASS / FAIL
- [ ] Test 2 (Desktop 1440px): PASS / FAIL / 🚨 BLOCKER

### Extended Tests
- [ ] Test 3 (iPhone 12): PASS / FAIL
- [ ] Test 4 (iPhone 14 Pro Max): PASS / FAIL
- [ ] Test 5 (Tablet 768px): PASS / FAIL

### Accessibility
- [ ] Test 6 (Touch Targets): PASS / FAIL
- [ ] Test 7 (Font Legibility): PASS / FAIL
- [ ] Test 8 (Lighthouse): PASS / FAIL (Score: ___)
- [ ] Test 9 (Contrast): PASS / FAIL

### Cross-Browser
- [ ] Test 10 (Chrome): PASS / FAIL
- [ ] Test 11 (Firefox): PASS / FAIL
- [ ] Test 12 (Edge): PASS / FAIL / SKIPPED

### Validation
- [ ] Test 14 (W3C CSS): PASS / FAIL
- [ ] Test 15 (Constitution): PASS / FAIL

---

## Rollback Instructions

### If Test 1 (Mobile) FAILS:
```bash
# Option A: Reduce gaps further
# Edit styles/variables.css:
--space-mobile-gap-section: 20px;  /* down from 24px */
--space-mobile-gap-elements: 12px;  /* down from 16px */
```

### If Test 2 (Desktop) FAILS - 🚨 IMMEDIATE ROLLBACK:
```bash
# Restore previous version
git restore styles/variables.css styles/main.css

# OR if not in git yet:
# Manually revert changes or restore from backup
```

---

## Sign-Off

**Tested By**: ___________________
**Date**: ___________________
**Overall Status**: PASS / FAIL / BLOCKED

**Notes**:
```
[Add any observations, issues, or recommendations here]
```

---

## Next Steps After Testing

### If All Tests Pass:
1. Mark all tasks T008-T021 as complete in tasks.md
2. Proceed to Task T022: W3C CSS validation
3. Proceed to Task T024: Git commit preparation
4. Proceed to Task T026: Commit to master branch

### If Critical Tests Fail:
1. Document failure in this checklist
2. Review rollback plan section
3. Implement fixes or rollback
4. Re-test before proceeding

---

**Document Version**: 1.0
**Created**: 2025-10-28
**Last Updated**: 2025-10-28
