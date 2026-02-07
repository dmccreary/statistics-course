# Chapter 13: Random Variables - MicroSim Generation Log

## Date: 2026-02-07

## Overview

Generated 6 MicroSims for Chapter 13: Random Variables based on the diagram specifications in the chapter's `<details>` blocks.

## MicroSims Created

### 1. Probability Distribution Bar Chart
- **Directory**: `docs/sims/probability-distribution-bar/`
- **Purpose**: Visualize the probability distribution for rolling a fair die, showing equal probabilities for each outcome
- **Bloom Level**: Understand (L2)
- **Features**:
  - Interactive bar chart with 6 bars (one for each die value)
  - Hover to see exact probability
  - Toggle between fractions (1/6) and decimals (0.167)
  - Reference line at 1/6
- **Files**:
  - `probability-distribution-bar.js` (p5.js code with canvas-based controls)
  - `main.html` (HTML wrapper with p5.js 1.11.10)
  - `index.md` (Lesson plan with Sylvia's voice)
  - `metadata.json` (Dublin Core metadata)

### 2. Expected Value Calculator
- **Directory**: `docs/sims/expected-value-calculator/`
- **Purpose**: Allow students to create custom probability distributions and calculate expected value interactively
- **Bloom Level**: Apply (L3)
- **Features**:
  - Editable table for values and probabilities
  - Real-time contribution calculation (x * P)
  - Probability sum validation
  - Step-by-step E(X) calculation display
  - Pre-loaded die roll example
  - Add/remove rows (2-8)
- **Files**:
  - `expected-value-calculator.js`
  - `main.html`
  - `index.md`
  - `metadata.json`

### 3. Combining Random Variables Visualizer
- **Directory**: `docs/sims/combining-random-variables/`
- **Purpose**: Demonstrate how means and variances combine when adding or subtracting independent random variables
- **Bloom Level**: Understand (L2)
- **Features**:
  - Two normal curve displays for X and Y
  - Sliders for mean and SD of each
  - Toggle between Sum (X+Y) and Difference (X-Y)
  - Combined distribution display
  - Step-by-step calculation panel
  - KEY INSIGHT: Variances always add, even for differences
- **Files**:
  - `combining-random-variables.js`
  - `main.html`
  - `index.md`
  - `metadata.json`

### 4. Binomial Probability Explorer
- **Directory**: `docs/sims/binomial-probability-explorer/`
- **Purpose**: Allow students to explore how n and p affect the shape of the binomial distribution
- **Bloom Level**: Analyze (L4)
- **Features**:
  - Probability histogram for all k values (0 to n)
  - Sliders for n (1-50), p (0.01-0.99), k (0-n)
  - Mean line overlay
  - Statistics panel (mean = np, SD = sqrt(np(1-p)))
  - Formula panel with step-by-step calculation
  - Preset buttons: Fair Coin, Skewed Left, Skewed Right
  - Hover tooltips with exact probabilities
- **Files**:
  - `binomial-probability-explorer.js`
  - `main.html`
  - `index.md`
  - `metadata.json`

### 5. Geometric Distribution Simulator
- **Directory**: `docs/sims/geometric-distribution-sim/`
- **Purpose**: Simulate trials until first success and build up the geometric distribution empirically
- **Bloom Level**: Apply (L3)
- **Features**:
  - Trial animation showing S/F sequence
  - Building histogram of "trials until success"
  - Empirical vs theoretical probability comparison
  - Running average vs theoretical mean (1/p)
  - Slider for p (0.05-0.95)
  - Run 1/10/100 buttons, Reset button
- **Files**:
  - `geometric-distribution-sim.js`
  - `main.html`
  - `index.md`
  - `metadata.json`

### 6. Random Variable Concept Map
- **Directory**: `docs/sims/random-variable-concept-map/`
- **Purpose**: Show the relationships between all random variable concepts covered in the chapter
- **Bloom Level**: Analyze (L4)
- **Features**:
  - Network diagram with 14 interconnected nodes
  - Click nodes to see definitions
  - Draggable nodes for custom layout
  - Color-coded by type: core (green), formulas (auburn), distributions (hazel)
  - Edge labels showing relationships
- **Files**:
  - `random-variable-concept-map.js`
  - `main.html`
  - `index.md`
  - `metadata.json`

## Files Modified

### Chapter File
- **File**: `docs/chapters/13-random-variables/index.md`
- **Changes**: Replaced 6 `<details>` blocks with links to MicroSim lesson pages
- **Note**: iframes were already present above each `<details>` block

### mkdocs.yml
- **Added entries** (in alphabetical order):
  - `Binomial Probability Explorer: sims/binomial-probability-explorer/index.md`
  - `Combining Random Variables: sims/combining-random-variables/index.md`
  - `Expected Value Calculator: sims/expected-value-calculator/index.md`
  - `Geometric Distribution Simulator: sims/geometric-distribution-sim/index.md`
  - `Probability Distribution Bar: sims/probability-distribution-bar/index.md`
  - `Random Variable Concept Map: sims/random-variable-concept-map/index.md`

### docs/sims/index.md
- **Added 6 new entries** (in alphabetical order):
  - Binomial Probability Explorer
  - Combining Random Variables Visualizer
  - Expected Value Calculator
  - Geometric Distribution Simulator
  - Probability Distribution Bar Chart
  - Random Variable Concept Map

## Implementation Notes

### Canvas-Based Controls
All MicroSims use canvas-based controls per CLAUDE.md requirements:
- Buttons drawn with `rect()` and `text()`
- Sliders implemented with `rect()` and `ellipse()` for handle
- Mouse interaction via `mousePressed()` and `mouseDragged()`
- No p5.js DOM functions (`createButton`, `createSlider`, etc.)

### Responsive Design
All MicroSims use `updateCanvasSize()` as first step in `setup()`:
```javascript
function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
```

### Sylvia Color Theme
All MicroSims use the Sylvia theme colors:
- `sylviaGreen = '#2E7D32'` - Primary/buttons
- `sylviaGreenDark = '#1B5E20'` - Borders
- `sylviaGreenLight = '#4CAF50'` - Hover states
- `sylviaAuburn = '#B5651D'` - Accents/highlights
- `sylviaCream = '#FFF8E1'` - Backgrounds
- `sylviaHazel = '#8B7355'` - Secondary accents

### Canvas Heights
- Probability Distribution Bar: 450px (drawHeight: 350, controlHeight: 100)
- Expected Value Calculator: 550px (drawHeight: 450, controlHeight: 100)
- Combining Random Variables: 500px (drawHeight: 400, controlHeight: 100)
- Binomial Probability Explorer: 600px (drawHeight: 500, controlHeight: 100)
- Geometric Distribution Simulator: 500px (drawHeight: 400, controlHeight: 100)
- Random Variable Concept Map: 500px (no control area)

## Concepts Covered

The 6 MicroSims support the following concepts from Chapter 13:

1. **Probability Distribution Bar** - Concepts 174, 175, 176
2. **Expected Value Calculator** - Concepts 177, 178
3. **Combining Random Variables** - Concepts 181, 182, 183, 184
4. **Binomial Probability Explorer** - Concepts 185, 186, 187, 188, 189, 190, 191
5. **Geometric Distribution Simulator** - Concepts 192, 193, 194, 195
6. **Random Variable Concept Map** - All 23 concepts (overview/synthesis)

## Testing Recommendations

1. Load each MicroSim's `main.html` directly in browser
2. Test slider interactions and button clicks
3. Verify keyboard input works in Expected Value Calculator
4. Check responsive behavior at different window widths
5. Verify iframe embedding in chapter page

## Screenshot Reminders

The following screenshots should be captured for social media previews:
- `probability-distribution-bar.png`
- `expected-value-calculator.png`
- `combining-random-variables.png`
- `binomial-probability-explorer.png`
- `geometric-distribution-sim.png`
- `random-variable-concept-map.png`

## Summary

- **Total MicroSims created**: 6
- **Total files created**: 24 (4 files per MicroSim)
- **Total files modified**: 3 (chapter index.md, mkdocs.yml, sims/index.md)
- **All MicroSims use canvas-based controls**: Yes
- **All MicroSims are responsive**: Yes
- **Sylvia theme applied**: Yes
