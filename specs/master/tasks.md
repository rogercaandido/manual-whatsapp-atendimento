# Implementation Tasks: Video Background & Typography Updates

**Feature**: Video Background Integration & Hero Subtitle Font Weight Update
**Feature ID**: style-refinement-v1-video-typography
**Created**: 2025-10-27
**Branch**: master
**Status**: Ready for Implementation

---

## Task Summary

**Total Tasks**: 20
**Estimated Time**: 45 minutes
**Parallelizable Tasks**: 4
**Risk Level**: 🟢 LOW

---

## Phase 1: Setup & Prerequisites

**Goal**: Prepare project structure for video background integration

**Independent Test Criteria**:
- [ ] videos/ directory exists in project root
- [ ] background-hero.mp4 file exists and is playable
- [ ] File size is reasonable (<10MB preferred)

### Tasks

- [X] T001 Create videos/ directory in project root at C:\Users\roger\OneDrive\Área de Trabalho\Work\New year shit\projeto_b\videos
- [X] T002 Copy video file from C:\Users\roger\OneDrive\Área de Trabalho\Work\Trash\video-ia-.mp4 to videos/background-hero.mp4 using Windows copy command

**Dependencies**: None
**Estimated Time**: 2 minutes

---

## Phase 2: User Story 1 - Video Background Integration

**User Story**: US-1 Design Fidelity
**Priority**: P1 (Critical)

> Como designer, quero que a landing page tenha um vídeo background local funcional, para que a experiência visual seja imersiva e corresponda ao design pretendido.

**Goal**: Replace placeholder video with local video background using relative path

**Independent Test Criteria**:
- [ ] Video loads and plays automatically
- [ ] Video loops seamlessly without visible gaps
- [ ] Video remains muted (autoplay requirement)
- [ ] Content remains visible over video with 0.2 opacity overlay
- [ ] Accessibility attributes properly set (preload, aria-hidden)

### Implementation Tasks

- [X] T003 [US1] Update video source path in index.html line 29 from src="/_videos/v1/1147b903a6da790fcd8f61c410a7f0e3191a14a3" to src="videos/background-hero.mp4"
- [X] T004 [US1] Add preload="auto" attribute to video element in index.html line 26
- [X] T005 [US1] Add aria-hidden="true" attribute to video element in index.html line 27
- [X] T006 [US1] Update fallback text to "Seu navegador não suporta vídeos em HTML5" in index.html line 30

**Dependencies**: T001, T002 (video file must exist)
**Estimated Time**: 4 minutes

**Testing**:
```bash
# Open index.html in browser
# Verify video plays automatically
# Verify video loops seamlessly
# Verify opacity overlay (0.2) renders correctly
# Check DevTools console for errors (should be none)
```

---

## Phase 3: User Story 1 - Accessibility Enhancement

**Goal**: Add reduced motion support for video background (WCAG 2.2.2 compliance)

**Independent Test Criteria**:
- [ ] Users with reduced motion preference see static background instead of video
- [ ] Background maintains visual consistency
- [ ] No layout shift when video is hidden

### Implementation Tasks

- [X] T007 [US1] Add prefers-reduced-motion media query at end of styles/main.css file (after line 409)
- [X] T008 [US1] Hide video element with display: none for reduced motion users in styles/main.css
- [X] T009 [US1] Add fallback background (gradient + solid color) for .header in styles/main.css

**Dependencies**: T003-T006 (video element must be properly configured)
**Estimated Time**: 5 minutes

**Testing**:
```bash
# Enable "Reduce Motion" in OS settings (Windows: Settings > Accessibility > Visual Effects)
# Refresh browser
# Verify video doesn't play
# Verify gradient/solid background displays instead
# Verify layout remains intact
```

---

## Phase 4: User Story 2 - Typography Update

**User Story**: US-2 Consistência Visual
**Priority**: P1 (Critical)

> Como usuário, quero ver uma tipografia refinada no hero subtitle, para que a hierarquia visual seja clara e corresponda ao design Figma.

**Goal**: Update hero subtitle font weight to match Figma specification (300 Light)

**Independent Test Criteria**:
- [ ] Hero subtitle uses font-weight 300 (Light) instead of 400 (Regular)
- [ ] Text remains crisp and readable at 18px
- [ ] Font rendering optimized for light weights on dark backgrounds
- [ ] 17.96:1 contrast ratio maintained (WCAG AAA compliance)
- [ ] Color (#e4e4e7) remains correct

### Implementation Tasks

- [X] T010 [P] [US2] Change hero subtitle font-weight from var(--font-weight-regular) to var(--font-weight-light) in styles/main.css line 97
- [X] T011 [P] [US2] Add -webkit-font-smoothing: antialiased property to .hero__subtitle in styles/main.css after line 102
- [X] T012 [P] [US2] Add -moz-osx-font-smoothing: grayscale property to .hero__subtitle in styles/main.css after line 102

**Dependencies**: None (font-weight-light variable already exists in variables.css line 38)
**Parallel Execution**: T010-T012 can all be done in a single edit (same CSS block)
**Estimated Time**: 3 minutes

**Testing**:
```bash
# Open index.html in browser
# Verify hero subtitle appears visibly lighter than before
# DevTools: Inspect element, check computed font-weight: 300
# Test on macOS if available (antialiasing most visible)
# Verify color remains #e4e4e7 (zinc-200)
```

---

## Phase 5: Verification & Quality Assurance

**Goal**: Verify all changes work correctly across browsers and breakpoints

**Independent Test Criteria**:
- [ ] Video background verified working in Chrome and Firefox
- [ ] Typography verified lighter and readable
- [ ] Colors verified matching Figma node 2019-47
- [ ] All 4 responsive breakpoints tested
- [ ] Cross-browser compatibility confirmed

### Visual Verification Tasks

- [ ] T013 Manual visual verification of video background: plays automatically, loops seamlessly, muted, opacity 0.2 correct, content visible over video
- [ ] T014 Manual visual verification of typography: font-weight 300 visible, text readable at 18px, antialiasing crisp, color #e4e4e7 correct
- [ ] T015 [P] Manual color verification against Figma node 2019-47: feature pill border #71717a (zinc-500), feature pill text #d4d4d8 (zinc-300)

**Dependencies**: T001-T012 (all implementation tasks complete)
**Estimated Time**: 13 minutes

### Responsive Testing

- [ ] T016 [P] Test 480px breakpoint (mobile): video scales with object-fit cover, subtitle readable, no horizontal scroll, layout intact
- [ ] T017 [P] Test 768px breakpoint (tablet): video scales correctly, subtitle readable, layout intact
- [ ] T018 [P] Test 1024px breakpoint (desktop): video scales correctly, subtitle readable, layout intact
- [ ] T019 [P] Test 1440px+ breakpoint (large desktop): video scales correctly, subtitle readable, layout intact

**Dependencies**: T001-T012 (all implementation tasks complete)
**Parallel Execution**: All 4 breakpoint tests can be done in sequence during one testing session
**Estimated Time**: 10 minutes

### Cross-Browser Testing

- [ ] T020 [P] Test in Chrome: video autoplay works, font-weight 300 renders correctly, no console errors, layout correct
- [ ] T021 [P] Test in Firefox: video autoplay works, font-weight 300 renders correctly, no console errors, layout correct
- [ ] T022 [P] Test in Safari (if available): video autoplay works, font-smoothing renders correctly on macOS, layout correct

**Dependencies**: T001-T012 (all implementation tasks complete)
**Parallel Execution**: Can test browsers in parallel using different devices/VMs
**Estimated Time**: 10 minutes

---

## Task Dependencies

### Sequential Dependencies

```
Setup Phase:
T001 (Create directory)
  └─→ T002 (Copy video file)
       └─→ T003 (Update HTML source)
            └─→ T004 (Add preload attribute)
                 └─→ T005 (Add aria-hidden attribute)
                      └─→ T006 (Update fallback text)
                           └─→ T007 (Add reduced motion media query)
                                └─→ T008 (Hide video for reduced motion)
                                     └─→ T009 (Add fallback background)
```

### Parallel Tasks

**Typography Tasks (T010-T012)** can run 100% in parallel with Video Tasks (T001-T009):
```
T010 (Font weight change)    ──┐
T011 (Webkit smoothing)       ──┼─→ All in same .hero__subtitle block
T012 (Moz smoothing)          ──┘
```

**Verification Tasks** can run after implementation is complete:
```
After T001-T012 complete:

T013 (Video verification)     ──┐
T014 (Typography verification)──┤
T015 (Color verification)     ──┼─→ Can test in parallel
T016-T019 (Responsive tests)  ──┤
T020-T022 (Browser tests)     ──┘
```

---

## Parallel Execution Examples

### Example 1: Maximum Parallelization

**Session 1** (Video Implementation):
```
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009
Time: ~11 minutes
```

**Session 2** (Typography - runs parallel with Session 1):
```
T010, T011, T012 (all in single edit of .hero__subtitle block)
Time: ~3 minutes
Can start immediately, no dependencies on video tasks
```

**Session 3** (Verification - after both sessions complete):
```
T013, T014, T015, T016, T017, T018, T019, T020, T021, T022
Time: ~33 minutes
Manual testing, can be done all at once or incrementally
```

**Total Time with Parallelization**: ~33 minutes (vs 45 sequential)

### Example 2: Incremental Delivery (MVP First)

**Iteration 1: Video Background MVP** (5 minutes)
```
T001 → T002 → T003 → T013 (Quick validation)
Deliverable: Working video background
```

**Iteration 2: Complete Video Feature** (6 minutes)
```
T004 → T005 → T006 → T007 → T008 → T009
Deliverable: Accessible video with reduced motion support
```

**Iteration 3: Typography Update** (3 minutes)
```
T010 → T011 → T012 → T014
Deliverable: Lighter hero subtitle font weight
```

**Iteration 4: Color Verification** (3 minutes)
```
T015
Deliverable: Confirmed colors match Figma
```

**Iteration 5: Full QA** (20 minutes)
```
T016 → T017 → T018 → T019 → T020 → T021 → T022
Deliverable: Production-ready, tested across devices
```

---

## Implementation Strategy

### MVP Scope (Minimal Viable Product)

**Goal**: Get video background working as quickly as possible

**Tasks**: T001 → T002 → T003
**Time**: ~5 minutes
**Deliverable**: Working video background (basic functionality)

**Test**: Open index.html, verify video plays

### Full Feature Scope

**Goal**: Complete all requirements with accessibility and polish

**Tasks**: T001 → T022
**Time**: ~45 minutes (or ~33 with parallelization)
**Deliverable**: Production-ready implementation

**Test**: All 22 tasks verified passing

### Recommended Approach: Incremental with Validation

1. **Video MVP** (T001-T003) → Quick test → Proceed
2. **Video Polish** (T004-T009) → Accessibility test → Proceed
3. **Typography** (T010-T012) → Visual test → Proceed
4. **Full QA** (T013-T022) → Comprehensive testing → Deploy

Each increment delivers value and is independently testable.

---

## File Modifications Summary

### Files to Modify

| File | Tasks | Changes | Risk | Lines |
|------|-------|---------|------|-------|
| index.html | T003, T004, T005, T006 | Update video src, add accessibility attributes, update fallback text | Low | 4 changes (lines 26-30) |
| styles/main.css | T007, T008, T009, T010, T011, T012 | Add reduced motion support (3 lines), update hero subtitle font-weight and smoothing (3 lines) | Low | ~15 lines total |

### New Files/Directories

| Path | Task | Purpose | Size |
|------|------|---------|------|
| videos/ | T001 | Directory for video assets | N/A |
| videos/background-hero.mp4 | T002 | Local video file | TBD (optimize to <5MB if possible) |

### No Changes Required

| Component | Reason | Verification Task |
|-----------|--------|-------------------|
| styles/variables.css | Font-weight-light (300) already exists at line 38 | None needed |
| Feature pill colors | Already match Figma node 2019-47 exactly | T015 verifies |
| HTML structure | No structural changes needed | None |
| Other CSS | No other style changes needed | None |

---

## Quality Gates

### Gate 1: Video Setup Complete (After Phase 1)

**Criteria**:
- [ ] videos/ directory exists
- [ ] background-hero.mp4 file exists and playable
- [ ] File size acceptable (<10MB)

**Blocker**: YES - Cannot proceed without video file
**Tasks**: T001, T002

---

### Gate 2: Video Implementation Complete (After Phase 2)

**Criteria**:
- [ ] Video source path updated to relative path
- [ ] Video plays automatically in browser
- [ ] Video loops seamlessly
- [ ] Accessibility attributes present

**Blocker**: NO - Can proceed to typography in parallel
**Tasks**: T003, T004, T005, T006

---

### Gate 3: Accessibility Complete (After Phase 3)

**Criteria**:
- [ ] Reduced motion media query implemented
- [ ] Video hidden for users with motion preference
- [ ] Fallback background displays correctly

**Blocker**: NO - Can proceed to verification
**Tasks**: T007, T008, T009

---

### Gate 4: Typography Complete (After Phase 4)

**Criteria**:
- [ ] Hero subtitle font-weight changed to 300
- [ ] Font-smoothing properties added
- [ ] Text remains readable

**Blocker**: NO - Can proceed to verification
**Tasks**: T010, T011, T012

---

### Gate 5: Verification Complete (After Phase 5)

**Criteria**:
- [ ] Visual verification passed (video, typography, colors)
- [ ] Responsive testing passed (4 breakpoints)
- [ ] Cross-browser testing passed (Chrome, Firefox minimum)
- [ ] No console errors
- [ ] No visual regressions

**Blocker**: YES - Must pass before deployment
**Tasks**: T013-T022

---

## Acceptance Criteria

### AC-1: Video Background (US-1)

- [ ] Video file copied to project (videos/background-hero.mp4)
- [ ] Video source uses relative path (videos/background-hero.mp4)
- [ ] Video plays automatically on page load
- [ ] Video loops infinitely without gaps
- [ ] Video remains muted (autoplay works in all browsers)
- [ ] Opacity overlay (0.2) renders correctly
- [ ] Content visible and readable over video
- [ ] Accessibility attributes present (preload, aria-hidden)
- [ ] Reduced motion users see fallback background

### AC-2: Typography (US-2)

- [ ] Hero subtitle uses font-weight 300 (Light)
- [ ] Font appears visibly lighter than previous 400 weight
- [ ] Text remains readable at 18px
- [ ] Font-smoothing properties render correctly (especially macOS)
- [ ] Color (#e4e4e7) unchanged from before
- [ ] 17.96:1 contrast ratio maintained (WCAG AAA)

### AC-3: Colors (Verification)

- [ ] Feature pill border color: #71717a (zinc-500) - no changes
- [ ] Feature pill text color: #d4d4d8 (zinc-300) - no changes
- [ ] Colors verified against Figma node 2019-47

### AC-4: Responsive (All Breakpoints)

- [ ] 480px (mobile): Video scales, subtitle readable, layout intact
- [ ] 768px (tablet): Video scales, subtitle readable, layout intact
- [ ] 1024px (desktop): Video scales, subtitle readable, layout intact
- [ ] 1440px+ (large): Video scales, subtitle readable, layout intact
- [ ] No horizontal scroll at any breakpoint
- [ ] Video doesn't break responsive behavior

### AC-5: Cross-Browser (Compatibility)

- [ ] Chrome: Video autoplay works, font-weight renders
- [ ] Firefox: Video autoplay works, font-weight renders
- [ ] Safari (if tested): Video autoplay works, font-smoothing works
- [ ] No console errors in any browser
- [ ] Consistent visual appearance across browsers

---

## Definition of Done

### Code Complete

- [ ] All 22 tasks (T001-T022) marked complete
- [ ] videos/ directory created
- [ ] background-hero.mp4 copied to project
- [ ] index.html updated with new video source and attributes
- [ ] styles/main.css updated with reduced motion and typography changes
- [ ] No syntax errors in HTML or CSS

### Testing Complete

- [ ] Video background verified working (T013)
- [ ] Typography verified lighter and readable (T014)
- [ ] Colors verified matching Figma (T015)
- [ ] All 4 responsive breakpoints tested (T016-T019)
- [ ] Cross-browser testing complete (T020-T022 minimum Chrome + Firefox)
- [ ] Reduced motion accessibility tested
- [ ] No visual regressions detected

### Documentation Complete

- [ ] tasks.md updated with all tasks
- [ ] plan.md reflects actual implementation
- [ ] Git commit message prepared (see template below)
- [ ] No blockers or open questions

### Deployment Ready

- [ ] All quality gates passed
- [ ] No console errors in browser
- [ ] Visual fidelity matches design intent
- [ ] Accessibility maintained (WCAG AAA)
- [ ] Performance acceptable (video loads progressively)

---

## Rollback Plan

### Scenario 1: Video file too large or won't load

**Symptoms**: Slow page load, video doesn't play, browser hangs

**Rollback**:
```bash
git checkout HEAD -- index.html styles/main.css
rm -rf videos/
```

**Alternative**: Optimize video with FFmpeg and retry

### Scenario 2: Font weight too light / unreadable

**Symptoms**: Users report hero subtitle hard to read

**Quick Fix**:
```css
/* In styles/main.css line 97 */
font-weight: var(--font-weight-regular);  /* Revert to 400 */
```

**Note**: 17.96:1 contrast provides large buffer, unlikely to occur

### Scenario 3: Video breaks layout on specific device

**Symptoms**: Video overlaps content, z-index issues

**Quick Fix**:
```css
/* In styles/main.css */
.header__video {
  z-index: -1;  /* Ensure video stays behind content */
}
```

### Scenario 4: Complete rollback needed

**Commands**:
```bash
git reset --hard HEAD~1  # Undo last commit
rm -rf videos/           # Remove video directory if needed
```

---

## Commit Message Template

When all tasks complete and tests pass, use this commit message:

```
feat: integra vídeo background local e ajusta tipografia hero

- Cria diretório videos/ e adiciona background-hero.mp4
- Atualiza source path do vídeo de placeholder para caminho relativo (videos/background-hero.mp4)
- Adiciona atributos de acessibilidade ao vídeo (preload="auto", aria-hidden="true")
- Implementa suporte a prefers-reduced-motion com fallback background
- Muda hero subtitle font-weight de 400 (Regular) para 300 (Light)
- Adiciona font-smoothing para renderização otimizada em macOS/iOS
- Verifica cores do Figma node 2019-47 (já implementadas corretamente)

Testes realizados:
- Chrome e Firefox: vídeo autoplay funcional, tipografia renderizada
- Breakpoints: 480px, 768px, 1024px, 1440px todos funcionais
- Acessibilidade: WCAG AAA mantido (17.96:1 contrast), reduced motion testado
- Sem erros no console, sem regressões visuais

Vídeo fonte: C:\Users\roger\OneDrive\Área de Trabalho\Work\Trash\video-ia-.mp4
Figma node: 2019-47 (feature pills colors verified)
Tasks: T001-T022
Tempo de implementação: ~45 minutos
Risco: BAIXO (mudanças isoladas, não-destrutivas)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Notes for Implementation

### Video File Considerations

**Source**: `C:\Users\roger\OneDrive\Área de Trabalho\Work\Trash\video-ia-.mp4`
**Destination**: `videos/background-hero.mp4`

**Optional Optimization** (using FFmpeg):
```bash
ffmpeg -i "C:\Users\roger\OneDrive\Área de Trabalho\Work\Trash\video-ia-.mp4" \
  -c:v libx264 \
  -crf 23 \
  -preset slow \
  -movflags +faststart \
  -vf scale=1920:1080 \
  -an \
  "C:\Users\roger\OneDrive\Área de Trabalho\Work\New year shit\projeto_b\videos\background-hero.mp4"
```

**Benefits**:
- Smaller file size (2-5MB vs potentially 10MB+)
- Progressive loading (FastStart enabled)
- No audio track (saves ~20% bandwidth)
- Optimized for web delivery

### Typography Considerations

**Font Already Loaded**:
```html
<!-- In index.html, Google Fonts already includes weight 300 -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap">
```

**CSS Variable Already Defined**:
```css
/* In styles/variables.css line 38 */
--font-weight-light: 300;
```

**No additional font loading needed** ✅

### Color Verification (T015)

**Expected Values** (from Figma node 2019-47):
- Feature pill border: `#71717a` (zinc-500) ✅ Already implemented correctly
- Feature pill text: `#d4d4d8` (zinc-300) ✅ Already implemented correctly

**This is verification only** - no code changes needed for colors

### Constitution Compliance

All changes comply with project constitution:
- ✅ Mobile-first approach maintained (existing media queries unchanged)
- ✅ CSS variables used consistently
- ✅ No structural HTML changes (only attribute additions)
- ✅ Accessibility enhanced (reduced motion, aria attributes)
- ✅ Organized file structure (videos/ directory mirrors assets/)

---

## Appendix: Research References

### Video Background Implementation

**Source**: research.md Phase 0 findings

**Key Decisions**:
- Use relative path (videos/background-hero.mp4) for portability
- HTML5 video with autoplay, loop, muted, playsinline attributes
- Add preload="auto" for above-the-fold content
- Add aria-hidden="true" for decorative video (WCAG)
- Implement prefers-reduced-motion fallback (WCAG 2.2.2)

**Browser Compatibility**: Excellent (98%+ modern browsers)

### Typography Update

**Source**: research.md Phase 0 findings

**Key Decisions**:
- Font-weight 300 (Light) matches Figma specification
- 17.96:1 contrast ratio exceeds WCAG AAA by 2.5× (buffer for light weight)
- Add font-smoothing for optimal rendering on macOS/iOS
- 18px font size exceeds minimum (16px) for light weights

**Accessibility**: WCAG AAA compliant (contrast ratio verified)

### Color Verification

**Source**: Figma MCP extraction of node 2019-47

**Findings**:
- Feature pill border: var(--color-zinc-500) = #71717a ✅ Match
- Feature pill text: var(--color-zinc-300) = #d4d4d8 ✅ Match

**No changes required** - verification task only

---

**Task List Version**: 2.0 (Video & Typography Update)
**Last Updated**: 2025-10-27
**Ready for Execution**: ✅ YES

**Next Step**: Begin with T001 (Create videos directory)
**Estimated Total Time**: 45 minutes (or 33 with parallelization)
**Risk Level**: 🟢 LOW
