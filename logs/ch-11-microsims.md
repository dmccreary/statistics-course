# Chapter 11 MicroSims Development Log

**Chapter:** 11 - Sampling and Bias
**Date Started:** 2026-02-07
**Status:** In Progress

## Overview

Chapter 11 covers sampling methods, sources of bias, and survey design principles. The chapter content specifies 6 MicroSims to be developed:

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
**Status:** Creating...

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
- `bias-variability-target.js` - p5.js simulation code
- `metadata.json` - Dublin Core metadata

### Implementation Notes

- Canvas-based controls (no DOM elements like createButton)
- Four distinct scenarios with visual and explanatory differences
- Target metaphor for understanding accuracy vs. precision

---

## MicroSim 2: Random Digit Table Simulator

**Directory:** `docs/sims/random-digit-table/`
**Status:** Pending

### Specification from Chapter

- Population size input (1-999)
- Sample size input (1-50)
- Starting row and column position in the table
- "Generate New Table" button
- "Step Through Selection" button
- Displayed random digit table (10 rows x 20 digits)
- Highlighted digits as user steps through
- Running list of selected sample members
- Explanation of why each number was accepted/rejected
- Size: 700 x 500 pixels

---

## MicroSim 3: Stratified vs. Cluster Sampling Comparison

**Directory:** `docs/sims/stratified-cluster-compare/`
**Status:** Pending

### Specification from Chapter

- Toggle between "Stratified" and "Cluster" sampling mode
- Population displayed as a grid of colored dots
- "Select Sample" button
- Visual highlighting of selected individuals
- Count of individuals selected from each group
- Text explanation of the sampling process used
- Size: 650 x 500 pixels

---

## MicroSim 4: Undercoverage Visualization

**Directory:** `docs/sims/undercoverage-viz/`
**Status:** Pending

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

---

## MicroSim 5: Question Wording Effects Simulator

**Directory:** `docs/sims/question-wording-effects/`
**Status:** Pending

### Specification from Chapter

- Topic selector (e.g., environmental policy, school rules, technology use)
- Three versions of a question on the same topic with different wording (neutral, positively framed, negatively framed)
- Radio button to select which version to "send"
- Simulated response distribution for each question version
- Bar chart comparing support levels across different wordings
- Highlighted words that create the framing effect
- Size: 650 x 500 pixels

---

## MicroSim 6: Survey Design Checklist Interactive

**Directory:** `docs/sims/survey-design-checklist/`
**Status:** Pending

### Specification from Chapter

- Display a sample survey scenario with potential problems
- Checklist of survey quality criteria
- Text field for student suggestions (Note: will use canvas-based approach)
- Highlighted problems in the survey
- Score based on criteria met
- Suggested improvements
- "Before and After" comparison when fixes are applied
- Present 3-4 different survey scenarios with various flaws
- Size: 700 x 550 pixels

---

## Development Progress

| MicroSim | Files Created | Tested | Screenshot | Added to mkdocs.yml |
|----------|---------------|--------|------------|---------------------|
| 1. Bias-Variability Target | ⏳ | ⬜ | ⬜ | ⬜ |
| 2. Random Digit Table | ⬜ | ⬜ | ⬜ | ⬜ |
| 3. Stratified vs Cluster | ⬜ | ⬜ | ⬜ | ⬜ |
| 4. Undercoverage Viz | ⬜ | ⬜ | ⬜ | ⬜ |
| 5. Question Wording | ⬜ | ⬜ | ⬜ | ⬜ |
| 6. Survey Design Checklist | ⬜ | ⬜ | ⬜ | ⬜ |

---

## Session Notes

### 2026-02-07 - Session Start

Beginning development of Chapter 11 MicroSims. Starting with MicroSim 1: Bias vs. Variability Target Visualization.

Key design principles being followed:
- Canvas-based controls (no p5.js DOM functions like createButton, createSlider)
- Responsive width using updateCanvasSize()
- Consistent styling with existing MicroSims
- Sylvia's encouraging voice in documentation

