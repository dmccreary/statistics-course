# Chapter 11 MicroSims Development Log

**Chapter:** 11 - Sampling and Bias
**Date Started:** 2026-02-07
**Date Completed:** 2026-02-07
**Status:** Complete

## Overview

Chapter 11 covers sampling methods, sources of bias, and survey design principles. Six MicroSims were developed to support the chapter concepts:

1. **Bias vs. Variability Target Visualization** - Target diagram showing bias/variability combinations
2. **Random Digit Table Simulator** - Practice using random digit tables for SRS
3. **Stratified vs. Cluster Sampling Comparison** - Visual comparison of sampling methods
4. **Undercoverage Visualization** - Shows how incomplete sampling frames lead to biased estimates
5. **Question Wording Effects Simulator** - Demonstrates how question wording affects responses
6. **Survey Design Checklist Interactive** - Walks through evaluating survey quality

## Concepts Covered (from Chapter 11)

- 132. Bias
- 133. Sources of Bias
- 134. Census
- 135. Simple Random Sample
- 136. Random Number Generator
- 137. Stratified Random Sample
- 138. When to Stratify
- 139. Cluster Sample
- 140. Systematic Sample
- 141. Convenience Sample
- 142. Voluntary Response Sample
- 143. Undercoverage
- 144. Nonresponse Bias
- 145. Response Bias
- 146. Wording of Questions
- 147. Designing Surveys
- 171. Random Digit Table
- 198. Unbiased Estimator
- 199. Biased Estimator

---

## MicroSim 1: Bias vs. Variability Target Visualization

**Directory:** `docs/sims/bias-variability-target/`
**Status:** ✅ Complete

### Specification from Chapter

- Dropdown selector: "Low Bias/Low Variability", "Low Bias/High Variability", "High Bias/Low Variability", "High Bias/High Variability"
- Button to generate new random sample points
- Target with bullseye representing the true population parameter
- Dots representing sample estimates scattered according to the selected bias/variability combination
- Visual explanation text updating based on selection
- Size: 600 x 450 pixels

### Files Created

- `index.md` - Lesson plan and documentation
- `main.html` - HTML wrapper
- `bias-variability-target.js` - p5.js simulation code (canvas-based controls)
- `metadata.json` - Dublin Core metadata

### Implementation Notes

- Uses canvas-based buttons (no p5.js DOM functions)
- Four distinct scenarios with visual and explanatory differences
- Target metaphor for understanding accuracy vs. precision
- Shows mean of estimates to demonstrate bias
- 20 sample points per scenario with Gaussian distribution

---

## MicroSim 2: Random Digit Table Simulator

**Directory:** `docs/sims/random-digit-table/`
**Status:** ✅ Complete

### Specification from Chapter

- Population size input (1-999)
- Sample size input (1-50)
- Starting row and column position in the table
- "Generate New Table" button
- "Step Through Selection" button
- Displayed random digit table (10 rows x 40 digits)
- Highlighted digits as user steps through
- Running list of selected sample members
- Explanation of why each number was accepted/rejected
- Size: 700 x 500 pixels

### Files Created

- `index.md` - Lesson plan and documentation
- `main.html` - HTML wrapper
- `random-digit-table.js` - p5.js simulation code
- `metadata.json` - Dublin Core metadata

### Implementation Notes

- Automatically determines digits needed based on population size (1-3)
- Highlights current reading position in yellow
- Step-by-step log shows accept/reject decisions
- Handles skip conditions: out of range, already selected, zero
- Canvas-based input fields for population/sample size

---

## MicroSim 3: Stratified vs. Cluster Sampling Comparison

**Directory:** `docs/sims/stratified-cluster-compare/`
**Status:** ✅ Complete

### Specification from Chapter

- Toggle between "Stratified" and "Cluster" sampling mode
- Population displayed as a grid of colored dots
- "Select Sample" button
- Visual highlighting of selected individuals
- Count of individuals selected from each group
- Text explanation of the sampling process used
- Size: 650 x 500 pixels

### Files Created

- `index.md` - Lesson plan and documentation
- `main.html` - HTML wrapper
- `stratified-cluster-compare.js` - p5.js simulation code
- `metadata.json` - Dublin Core metadata

### Implementation Notes

- Stratified: horizontal strata, samples FROM each stratum
- Cluster: vertical clusters, samples everyone IN selected clusters
- Color-coded groups (4 groups)
- Shows checkmarks on selected individuals
- Key differences panel highlights method distinctions
- Selection summary shows counts by group

---

## MicroSim 4: Undercoverage Visualization

**Directory:** `docs/sims/undercoverage-viz/`
**Status:** ✅ Complete

### Specification from Chapter

- Population with two groups: "covered" and "undercovered"
- Slider: percentage of population undercovered (0-50%)
- Slider: difference in response between covered/undercovered groups
- "Take Sample" button
- Visual representation of population and sample
- True population proportion
- Sample estimate
- Bias = (sample estimate) - (true proportion)
- Explanation of how undercoverage affected the result
- Size: 600 x 450 pixels

### Files Created

- `index.md` - Lesson plan and documentation
- `main.html` - HTML wrapper
- `undercoverage-viz.js` - p5.js simulation code
- `metadata.json` - Dublin Core metadata

### Implementation Notes

- Canvas-based sliders for undercoverage % and value difference
- Undercovered individuals shown with X marks and faded color
- Calculates and displays true population mean vs sample mean
- Shows bias direction and magnitude
- References 1936 Literary Digest poll as historical example
- Explains when undercoverage causes vs doesn't cause bias

---

## MicroSim 5: Question Wording Effects Simulator

**Directory:** `docs/sims/question-wording-effects/`
**Status:** ✅ Complete

### Specification from Chapter

- Topic selector (e.g., environmental policy, school rules, technology use)
- Three versions of a question on the same topic with different wording (neutral, positively framed, negatively framed)
- Radio button to select which version to "send"
- Simulated response distribution for each question version
- Bar chart comparing support levels across different wordings
- Highlighted words that create the framing effect
- Size: 650 x 500 pixels

### Files Created

- `index.md` - Lesson plan and documentation
- `main.html` - HTML wrapper
- `question-wording-effects.js` - p5.js simulation code
- `metadata.json` - Dublin Core metadata

### Implementation Notes

- Four topics: Environmental Policy, School Rules, Technology Use, Free Speech
- Three framings: Neutral, Positive, Negative
- Shows highlighted keywords that create framing effects
- "Compare All" mode shows all three versions side-by-side
- Calculates swing (difference between positive and negative framing)
- Canvas-based topic and framing buttons

---

## MicroSim 6: Survey Design Checklist Interactive

**Directory:** `docs/sims/survey-design-checklist/`
**Status:** ✅ Complete

### Specification from Chapter

- Display a sample survey scenario with potential problems
- Checklist of survey quality criteria
- Highlighted problems in the survey
- Score based on criteria met
- Suggested improvements
- "Before and After" comparison when fixes are applied
- Present 3-4 different survey scenarios with various flaws
- Size: 700 x 550 pixels

### Files Created

- `index.md` - Lesson plan and documentation
- `main.html` - HTML wrapper
- `survey-design-checklist.js` - p5.js simulation code
- `metadata.json` - Dublin Core metadata

### Implementation Notes

- Four scenarios: Magazine Survey, Teen Social Media, Political Poll, Community Health
- Eight checklist items across three categories (Sampling, Coverage, Wording)
- Canvas-based checkboxes for issue selection
- Feedback shows correct answers and explanations
- "Try Again" option to reset and retry
- Progress dots show scenario navigation

---

## Development Progress

| MicroSim | Files Created | Added to mkdocs.yml | Added to sims/index.md |
|----------|---------------|---------------------|------------------------|
| 1. Bias-Variability Target | ✅ | ✅ | ✅ |
| 2. Random Digit Table | ✅ | ✅ | ✅ |
| 3. Stratified vs Cluster | ✅ | ✅ | ✅ |
| 4. Undercoverage Viz | ✅ | ✅ | ✅ |
| 5. Question Wording | ✅ | ✅ | ✅ |
| 6. Survey Design Checklist | ✅ | ✅ | ✅ |

---

## Session Notes

### 2026-02-07 - Session Complete

All 6 MicroSims for Chapter 11 (Sampling and Bias) have been created.

**Key Design Decisions:**
- All simulations use canvas-based controls (no p5.js DOM functions like createButton, createSlider)
- Each simulation includes updateCanvasSize() for responsive width
- Consistent styling with existing MicroSims (aliceblue backgrounds, silver borders)
- Sylvia's encouraging voice included in all documentation
- Each MicroSim has full lesson plan with learning objectives, activities, and assessment questions

**Files Modified:**
- `mkdocs.yml` - Added 6 new MicroSim entries in nav
- `docs/sims/index.md` - Added 6 new MicroSim cards with descriptions

**New Directories Created:**
- `docs/sims/bias-variability-target/`
- `docs/sims/random-digit-table/`
- `docs/sims/stratified-cluster-compare/`
- `docs/sims/undercoverage-viz/`
- `docs/sims/question-wording-effects/`
- `docs/sims/survey-design-checklist/`

**Next Steps:**
- Screenshots need to be generated for each MicroSim
- Testing in browser to verify functionality
- Consider adding to Chapter 11 content with iframe embeds

**Total Files Created:** 24 files (4 per MicroSim × 6 MicroSims)
