# Chapter 15: Confidence Intervals - MicroSim Generation Log

**Date:** 2026-02-07
**Chapter:** 15 - Confidence Intervals
**Generator:** Claude Code

## Summary

Generated 6 interactive MicroSims for Chapter 15 on Confidence Intervals. All MicroSims use p5.js with canvas-based controls (no DOM elements) and follow the established patterns in the codebase.

## MicroSims Created

### 1. Point vs Interval Estimate

**Location:** `/docs/sims/point-vs-interval-estimate/`

**Files Created:**
- `point-vs-interval-estimate.js` - Main p5.js simulation
- `main.html` - HTML wrapper with p5.js 1.11.10
- `index.md` - Lesson plan with Sylvia's encouraging voice
- `metadata.json` - Dublin Core metadata

**Bloom Level:** Understand (L2)
**Learning Objective:** Help students visualize the difference between point estimates and interval estimates through repeated sampling.

**Features:**
- Number line visualization (0 to 1 for proportions)
- "New Sample" button generates random samples
- "Add 10" button for quick batch generation
- Toggle to reveal true population parameter
- Green/red coloring when truth is shown
- Capture rate counter

**Implementation Notes:**
- True population proportion set at p = 0.65
- Sample size n = 100
- 95% confidence level
- Maximum 25 intervals displayed (oldest removed when exceeded)

---

### 2. Margin of Error Explorer

**Location:** `/docs/sims/margin-of-error-explorer/`

**Files Created:**
- `margin-of-error-explorer.js`
- `main.html`
- `index.md`
- `metadata.json`

**Bloom Level:** Analyze (L4)
**Learning Objective:** Students analyze how changes in confidence level, sample size, and sample proportion affect margin of error.

**Features:**
- Three interactive sliders (confidence level, sample size, proportion)
- Real-time CI visualization on number line
- Step-by-step formula breakdown with current values
- z* value display for selected confidence level
- Margin of error arrows showing +/- from point estimate

**Implementation Notes:**
- Confidence level range: 80% to 99%
- Sample size range: 20 to 500
- Sample proportion range: 0.1 to 0.9
- Interpolated z* values for non-standard confidence levels

---

### 3. Confidence Level Simulator

**Location:** `/docs/sims/confidence-level-simulator/`

**Files Created:**
- `confidence-level-simulator.js`
- `main.html`
- `index.md`
- `metadata.json`

**Bloom Level:** Understand (L2)
**Learning Objective:** Students understand the true meaning of confidence level through repeated sampling.

**Features:**
- Vertical true parameter line (p = 0.60)
- Up to 100 horizontal confidence intervals stacked
- Green intervals capture true parameter, red miss
- Running counter with capture rate percentage
- "Generate 1", "Generate 10", "Generate 100" buttons
- Confidence level selector (90%, 95%, 99%)

**Implementation Notes:**
- True population proportion: p = 0.60
- Sample size: n = 50
- Intervals colored based on capture status
- Statistics panel shows captured count and rate

---

### 4. Critical Value Visualizer

**Location:** `/docs/sims/critical-value-visualizer/`

**Files Created:**
- `critical-value-visualizer.js`
- `main.html`
- `index.md`
- `metadata.json`

**Bloom Level:** Remember (L1)
**Learning Objective:** Students identify how critical values correspond to areas under the standard normal curve.

**Features:**
- Standard normal distribution curve
- Shaded middle region (confidence level)
- Shaded tail regions (alpha/2 each)
- Vertical dashed lines at -z* and +z*
- Preset buttons for 90%, 95%, 99%
- Custom slider for 80% to 99.9%
- Info panel with z*, alpha, tail areas

**Implementation Notes:**
- Uses rational approximation for inverse normal CDF
- Smooth transitions between confidence levels
- Area percentages displayed on curve

---

### 5. CI Construction Walkthrough

**Location:** `/docs/sims/ci-construction-walkthrough/`

**Files Created:**
- `ci-construction-walkthrough.js`
- `main.html`
- `index.md`
- `metadata.json`

**Bloom Level:** Apply (L3)
**Learning Objective:** Students practice constructing confidence intervals step-by-step.

**Features:**
- Input panel for x (successes) and n (sample size)
- Confidence level selector (90%, 95%, 99%)
- 6-step calculation display:
  1. Check conditions (np >= 10, n(1-p) >= 10)
  2. Calculate p-hat
  3. Find z* critical value
  4. Calculate standard error
  5. Calculate margin of error
  6. Construct final interval
- "Next" and "Previous" navigation buttons
- "Show All" to reveal complete solution
- "Random Data" generates practice problems
- Number line visualization at step 6

**Implementation Notes:**
- Default values: x = 124, n = 200
- Clickable input fields for custom data
- Progress indicator shows current step

---

### 6. Sample Size Calculator

**Location:** `/docs/sims/sample-size-calculator/`

**Files Created:**
- `sample-size-calculator.js`
- `main.html`
- `index.md`
- `metadata.json`

**Bloom Level:** Apply (L3)
**Learning Objective:** Students determine required sample size to achieve a desired margin of error.

**Features:**
- Desired margin of error slider (1% to 10%)
- Confidence level buttons (90%, 95%, 99%)
- Toggle for conservative (p=0.5) vs. custom proportion
- Custom proportion slider when not using conservative
- Step-by-step calculation display
- Comparison bar chart showing n for different ME values
- Quick preset buttons for common ME values (1%, 2%, 3%, 4%, 5%)

**Implementation Notes:**
- Formula: n = (z*/ME)^2 * p(1-p)
- Always rounds UP for sample size
- Demonstrates quadrupling rule (halving ME requires 4x n)

---

## Chapter Updates

The chapter file `/docs/chapters/15-confidence-intervals/index.md` was updated to:
1. Remove all `<details>` blocks containing MicroSim specifications
2. Keep the existing iframe embeds that point to the new MicroSims

## Navigation Updates

### mkdocs.yml

Added to MicroSims nav section (alphabetically):
- `CI Construction Walkthrough: sims/ci-construction-walkthrough/index.md`
- `Confidence Level Simulator: sims/confidence-level-simulator/index.md`
- `Critical Value Visualizer: sims/critical-value-visualizer/index.md`
- `Margin of Error Explorer: sims/margin-of-error-explorer/index.md`
- `Point vs Interval Estimate: sims/point-vs-interval-estimate/index.md`
- `Sample Size Calculator: sims/sample-size-calculator/index.md`

### docs/sims/index.md

Added entries with descriptions for all 6 MicroSims in alphabetical order.

---

## Design Decisions

1. **Sylvia Theme Colors**: All MicroSims use the Sylvia color scheme:
   - Green (`#2E7D32`) for primary actions and captured intervals
   - Auburn/Orange (`#B5651D`) for accents and secondary actions
   - Cream (`#FFF8E1`) for backgrounds

2. **Canvas-Based Controls**: Following project guidelines, all controls (buttons, sliders, toggles) are drawn directly on the canvas using p5.js primitives rather than DOM elements.

3. **Responsive Width**: All MicroSims use `updateCanvasSize()` in setup() and windowResized() to adapt to container width.

4. **Consistent UI Patterns**:
   - Control area at bottom (50px height)
   - Instructions at bottom of drawing area
   - Reset buttons in bottom-right corner
   - Sylvia-themed button colors

5. **Educational Focus**: Each MicroSim targets specific Bloom's Taxonomy levels and includes lesson plans with Sylvia's encouraging voice.

---

## Files Created Summary

| Directory | Files |
|-----------|-------|
| `/docs/sims/point-vs-interval-estimate/` | 4 files |
| `/docs/sims/margin-of-error-explorer/` | 4 files |
| `/docs/sims/confidence-level-simulator/` | 4 files |
| `/docs/sims/critical-value-visualizer/` | 4 files |
| `/docs/sims/ci-construction-walkthrough/` | 4 files |
| `/docs/sims/sample-size-calculator/` | 4 files |

**Total: 24 new files**

---

## Testing Notes

All MicroSims should be tested for:
- [ ] Responsive width behavior
- [ ] Button/slider interactions
- [ ] Calculation accuracy
- [ ] Display at different window sizes
- [ ] Integration with chapter iframes

---

## Token Usage Estimate

Based on similar chapter MicroSim generations:
- Input: ~15,000 tokens (chapter content, patterns, specs)
- Output: ~40,000 tokens (6 MicroSims x 4 files each + updates)
- Total: ~55,000 tokens
