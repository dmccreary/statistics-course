# Chapter 19 MicroSims Development Log

**Chapter:** 19 - Communication and Synthesis
**Date Started:** 2026-02-07
**Date Completed:** 2026-02-07
**Status:** Complete

## Overview

Chapter 19 focuses on synthesizing statistical knowledge and communicating results effectively. This final chapter covers statistical vs. practical significance, effect sizes, study limitations, generalizability, report writing, the four-step inference process, and AP exam strategies. Seven MicroSims were developed to support these concepts:

1. **Statistical vs Practical Significance Matrix** - 2x2 decision matrix with clickable quadrants
2. **Effect Size Visualizer** - Two overlapping distributions with Cohen's d slider
3. **Sample Size and Margin of Error Explorer** - Relationship between n and ME with curve
4. **Generalizability Target Diagram** - Concentric circles showing generalization levels
5. **Audience Communication Matcher** - Drag-and-drop matching game for audiences
6. **Four-Step Process Flowchart** - Interactive inference workflow guide
7. **AP Exam Preparation Checklist** - Progress-tracked study checklist

## Concepts Covered (from Chapter 19)

- 290. Regression Conclusion
- 292. Stat vs Practical Sig
- 293. Effect Size
- 294. Sample Size Impact
- 295. Study Limitations
- 296. Generalizability
- 297. Statistical Report Writing
- 298. Communicating Results
- 299. Four-Step Process
- 300. AP Exam Strategies

---

## MicroSim 1: Statistical vs Practical Significance Matrix

**Directory:** `docs/sims/stat-practical-sig-matrix/`
**Status:** Complete

### Specification from Chapter

- 2x2 matrix grid with four quadrants
- X-axis: "Practically Significant?" (No | Yes)
- Y-axis: "Statistically Significant?" (Yes on top | No on bottom)
- Click quadrants to reveal detailed explanations
- Color coding: Green (meaningful), Yellow (promising), Orange (trivial), Gray (nothing)

### Files Created

- `index.md` - Lesson plan and documentation
- `main.html` - HTML wrapper
- `stat-practical-sig-matrix.js` - p5.js simulation code
- `metadata.json` - Dublin Core metadata

### Implementation Notes

- Canvas-based interactive matrix
- Four quadrants with hover and click states
- Detail panel shows explanation when quadrant selected
- Real-world examples for each scenario
- Reset button to clear selection

---

## MicroSim 2: Effect Size Visualizer

**Directory:** `docs/sims/effect-size-visualizer/`
**Status:** Complete

### Specification from Chapter

- Two overlapping normal distribution curves
- Slider for Cohen's d (0 to 2.0)
- Shows overlap percentage
- Labels effect size interpretation (small, medium, large)
- Displays calculation breakdown

### Files Created

- `index.md` - Lesson plan and documentation
- `main.html` - HTML wrapper
- `effect-size-visualizer.js` - p5.js simulation code
- `metadata.json` - Dublin Core metadata

### Implementation Notes

- Group 1: Blue curve, mean = 100, SD = 15 (fixed)
- Group 2: Orange curve, mean shifts based on d
- Shaded overlap region updates in real-time
- Statistics panel shows d value, overlap %, interpretation
- Interpretation changes at d = 0.2, 0.5, 0.8 thresholds

---

## MicroSim 3: Sample Size and Margin of Error Explorer

**Directory:** `docs/sims/sample-size-margin-error/`
**Status:** Complete

### Specification from Chapter

- Sample size slider (logarithmic scale, 10-2000)
- Sample proportion slider (0.1-0.9)
- Confidence level buttons (90%, 95%, 99%)
- Curve showing ME vs n relationship
- Confidence interval visualization

### Files Created

- `index.md` - Lesson plan and documentation
- `main.html` - HTML wrapper
- `sample-size-margin-error.js` - p5.js simulation code
- `metadata.json` - Dublin Core metadata

### Implementation Notes

- Logarithmic slider for sample size (better UX for wide range)
- ME curve shows diminishing returns visually
- Current point highlighted on curve
- Formula displayed with live substituted values
- CI bar updates width based on margin of error

---

## MicroSim 4: Generalizability Target Diagram

**Directory:** `docs/sims/generalizability-target/`
**Status:** Complete

### Specification from Chapter

- Concentric circles representing levels of generalization
- Five rings: Sample, Sampling Frame, Target Population, Broader Population, Universal Claims
- Color gradient from green (strong) to red (weak)
- Toggle between different study scenarios
- Click rings for detailed explanations

### Files Created

- `index.md` - Lesson plan and documentation
- `main.html` - HTML wrapper
- `generalizability-target.js` - p5.js simulation code
- `metadata.json` - Dublin Core metadata

### Implementation Notes

- Three scenarios: Random Sample from District, Convenience Sample, National Random Sample
- Rings grayed out when unreachable based on scenario
- Arrow shows how far generalization can reach
- Dashed line and X mark for unreachable rings
- Info panel shows scenario details and ring explanations

---

## MicroSim 5: Audience Communication Matcher

**Directory:** `docs/sims/audience-communication-matcher/`
**Status:** Complete

### Specification from Chapter

- Four audience types: Statistics Professor, Business Manager, Newspaper Reader, AP Exam Grader
- Draggable explanation cards
- Match explanations to appropriate audiences
- Check button for verification
- Feedback with correct/incorrect highlighting
- Multiple rounds with different scenarios

### Files Created

- `index.md` - Lesson plan and documentation
- `main.html` - HTML wrapper
- `audience-communication-matcher.js` - p5.js simulation code
- `metadata.json` - Dublin Core metadata

### Implementation Notes

- True drag-and-drop functionality
- Cards snap to audience drop zones
- Green/red highlighting for feedback
- Three different statistical scenarios
- Score tracking across rounds
- Reset and Next Round buttons

---

## MicroSim 6: Four-Step Process Flowchart

**Directory:** `docs/sims/four-step-process-flowchart/`
**Status:** Complete

### Specification from Chapter

- Vertical flowchart with four main boxes
- STATE (Green), PLAN (Blue), DO (Orange), CONCLUDE (Purple)
- Click each step for detailed guidance
- Toggle between Hypothesis Test and Confidence Interval modes
- Checklist for each step

### Files Created

- `index.md` - Lesson plan and documentation
- `main.html` - HTML wrapper
- `four-step-process-flowchart.js` - p5.js simulation code
- `metadata.json` - Dublin Core metadata

### Implementation Notes

- Color-coded steps matching Sylvia Green theme
- Expandable detail panel when step clicked
- Different content for hypothesis test vs CI modes
- Sylvia's tips at bottom of each step detail
- Mnemonic reminder: "Some People Don't Care"

---

## MicroSim 7: AP Exam Preparation Checklist

**Directory:** `docs/sims/ap-exam-checklist/`
**Status:** Complete

### Specification from Chapter

- Categorized accordion-style checklist
- Categories: Essential Formulas, Condition Checks, Key Phrases, Calculator Skills, Common Mistakes
- Check boxes for completion tracking
- Progress bar showing overall readiness
- localStorage persistence for progress

### Files Created

- `index.md` - Lesson plan and documentation
- `main.html` - HTML wrapper
- `ap-exam-checklist.js` - p5.js simulation code
- `metadata.json` - Dublin Core metadata

### Implementation Notes

- Five categories with color coding
- Expandable/collapsible category sections
- Checkbox state saved to localStorage
- Progress bar with color gradient (red to green)
- Reset All and Check All buttons
- Scrollable content area

---

## Development Progress

| MicroSim | Files Created | Added to mkdocs.yml | Added to sims/index.md | Chapter Updated |
|----------|---------------|---------------------|------------------------|-----------------|
| 1. Stat-Practical Sig Matrix | Complete | Complete | Complete | Complete |
| 2. Effect Size Visualizer | Complete | Complete | Complete | Complete |
| 3. Sample Size Margin Error | Complete | Complete | Complete | Complete |
| 4. Generalizability Target | Complete | Complete | Complete | Complete |
| 5. Audience Communication Matcher | Complete | Complete | Complete | Complete |
| 6. Four-Step Process Flowchart | Complete | Complete | Complete | Complete |
| 7. AP Exam Checklist | Complete | Complete | Complete | Complete |

---

## Chapter Updates

The chapter file `docs/chapters/19-communication-and-synthesis/index.md` already had iframe embeds in place. The `<details>` blocks containing the MicroSim specifications were removed, leaving only the iframes.

---

## Session Notes

### 2026-02-07 - Session Complete

All 7 MicroSims for Chapter 19 (Communication and Synthesis) have been created.

**Key Design Decisions:**

- All simulations use canvas-based controls (no p5.js DOM functions like createButton, createSlider)
- Each simulation includes updateCanvasSize() for responsive width
- Consistent styling with existing MicroSims (aliceblue backgrounds, silver borders)
- Sylvia's encouraging voice included in all documentation
- Each MicroSim has full lesson plan with learning objectives, activities, and assessment questions
- AP Exam Checklist uses localStorage for progress persistence
- Audience Communication Matcher features true drag-and-drop functionality
- Four-Step Process Flowchart supports both hypothesis test and confidence interval modes

**Files Modified:**

- `docs/chapters/19-communication-and-synthesis/index.md` - Removed 7 `<details>` blocks
- `mkdocs.yml` - Added 7 new MicroSim entries in nav (alphabetically)
- `docs/sims/index.md` - Added 7 new MicroSim cards with descriptions

**New Directories Created:**

- `docs/sims/stat-practical-sig-matrix/`
- `docs/sims/effect-size-visualizer/`
- `docs/sims/sample-size-margin-error/`
- `docs/sims/generalizability-target/`
- `docs/sims/audience-communication-matcher/`
- `docs/sims/four-step-process-flowchart/`
- `docs/sims/ap-exam-checklist/`

**Total Files Created:** 28 files (4 per MicroSim x 7 MicroSims)

**Next Steps:**

- Screenshots need to be generated for each MicroSim
- Testing in browser to verify functionality
- All MicroSims are embedded in Chapter 19 content

---

## MicroSim Details Summary

| MicroSim | Type | Bloom Level | Key Interactive Feature |
|----------|------|-------------|-------------------------|
| Stat-Practical Sig Matrix | Infographic | Analyze (L4) | Click quadrants for details |
| Effect Size Visualizer | MicroSim | Understand (L2) | Slider adjusts distribution separation |
| Sample Size Margin Error | MicroSim | Apply (L3) | Logarithmic slider, curve plot |
| Generalizability Target | Infographic | Evaluate (L5) | Scenario toggle, ring click |
| Audience Communication Matcher | MicroSim | Analyze (L4) | Drag-and-drop matching |
| Four-Step Process Flowchart | Workflow | Apply (L3) | Mode toggle, step expansion |
| AP Exam Checklist | Infographic | Remember (L1) | Checkbox tracking, localStorage |
