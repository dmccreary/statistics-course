# Chapter 18 MicroSims Development Log

**Date:** 2026-02-07
**Chapter:** Chi-Square and Regression Inference
**Status:** Complete

## Summary

Created 7 interactive MicroSims for Chapter 18 covering chi-square tests for categorical data and inference for regression slopes.

## MicroSims Created

### 1. Chi-Square Distribution Shapes
- **Directory:** `/docs/sims/chi-square-distribution-shapes/`
- **Files Created:**
  - `chi-square-distribution-shapes.js` - p5.js visualization code
  - `main.html` - HTML wrapper with p5.js 1.11.10
  - `index.md` - Lesson plan with Sylvia's voice
  - `metadata.json` - Dublin Core metadata
- **Features:**
  - Compare multiple chi-square distributions (df = 2, 5, 10, 15, 20)
  - Adjustable degrees of freedom slider (1-30)
  - Toggle between single and multiple distribution view
  - Critical region shading for significance levels (0.01, 0.05, 0.10)
  - Mean and critical value display
- **Bloom Level:** Understand (L2)

### 2. Chi-Square Calculation Step-by-Step
- **Directory:** `/docs/sims/chi-square-calculation/`
- **Files Created:**
  - `chi-square-calculation.js`
  - `main.html`
  - `index.md`
  - `metadata.json`
- **Features:**
  - Step-through calculation stages (O, E, O-E, (O-E)^2, (O-E)^2/E)
  - Editable observed counts
  - Bar chart comparing observed vs expected
  - Color-coded contribution indicators
  - Preset examples (Candy, Dice)
  - Auto-step animation option
- **Bloom Level:** Apply (L3)

### 3. Goodness-of-Fit Test Simulator
- **Directory:** `/docs/sims/gof-test-simulator/`
- **Files Created:**
  - `gof-test-simulator.js`
  - `main.html`
  - `index.md`
  - `metadata.json`
- **Features:**
  - Complete GOF test workflow
  - Editable observed counts and proportions
  - 3-8 category support
  - Chi-square distribution visualization with p-value shading
  - Automatic conditions checking (expected counts >= 5)
  - Four preset examples (Candy, Dice, Birthdays, Mendel)
  - Clear conclusion with interpretation
- **Bloom Level:** Apply (L3)

### 4. Homogeneity vs Independence Comparison
- **Directory:** `/docs/sims/homogeneity-vs-independence/`
- **Files Created:**
  - `homogeneity-vs-independence.js`
  - `main.html`
  - `index.md`
  - `metadata.json`
- **Features:**
  - Side-by-side comparison panels
  - Visual sampling diagrams for each test type
  - Key differences highlighted
  - Interactive practice quiz with 5 scenarios
  - Immediate feedback with explanations
  - Toggle between comparison and quiz modes
- **Bloom Level:** Analyze (L4)

### 5. Slope Sampling Distribution
- **Directory:** `/docs/sims/slope-sampling-distribution/`
- **Files Created:**
  - `slope-sampling-distribution.js`
  - `main.html`
  - `index.md`
  - `metadata.json`
- **Features:**
  - Left panel: scatterplot with true and sample regression lines
  - Right panel: histogram of sample slopes building up
  - Adjustable population slope, error SD, and sample size
  - Take 1 or 100 samples at a time
  - Statistics display: mean of slopes, SE of slopes
  - Visual comparison to true slope
- **Bloom Level:** Understand (L2)

### 6. Regression Conditions Checker
- **Directory:** `/docs/sims/regression-conditions-checker/`
- **Files Created:**
  - `regression-conditions-checker.js`
  - `main.html`
  - `index.md`
  - `metadata.json`
- **Features:**
  - 2x2 grid of diagnostic plots (scatterplot, residual plot, histogram, checklist)
  - Five scenario types (good, curved, fan, skewed, outliers)
  - Student self-assessment for each LINE condition
  - Check answers with feedback
  - Generate new data for same scenario type
- **Bloom Level:** Evaluate (L5)

### 7. Slope Confidence Interval
- **Directory:** `/docs/sims/slope-confidence-interval/`
- **Files Created:**
  - `slope-confidence-interval.js`
  - `main.html`
  - `index.md`
  - `metadata.json`
- **Features:**
  - Scatterplot with plausible slope band
  - Number line showing confidence interval
  - Calculation breakdown (b, SE_b, t*, margin of error)
  - Hypothesis test connection (does CI contain 0?)
  - Coverage simulation mode (100 intervals)
  - Adjustable sample size and confidence level
- **Bloom Level:** Apply (L3)

## Files Updated

### mkdocs.yml
Added 7 new entries to MicroSims navigation (alphabetically ordered):
- Chi-Square Calculation
- Chi-Square Distribution Shapes
- GOF Test Simulator
- Homogeneity vs Independence
- Regression Conditions Checker
- Slope Confidence Interval
- Slope Sampling Distribution

### docs/sims/index.md
Added 7 new entries to the MicroSims list page with descriptions.

### docs/chapters/18-chi-square-and-regression-inference/index.md
Chapter already had iframe embeds in correct locations before the `<details>` blocks. No changes needed to chapter file.

## Technical Notes

### Pattern Followed
- All MicroSims use p5.js 1.11.10 via CDN
- Canvas-based controls only (no createButton, createSlider, etc.)
- updateCanvasSize() called first in setup() for responsive width
- Sylvia theme colors (#2E7D32 green, #B5651D auburn)
- Controls drawn on canvas with mousePressed/mouseDragged handlers

### Chi-Square PDF Calculation
Implemented Lanczos approximation for gamma function to calculate chi-square probability density. Used regularized incomplete gamma function approximation for CDF/p-value calculations.

### Regression Calculations
Standard least squares formulas with residual analysis. Calculated standard error of slope using residual standard error and sum of squared x deviations.

## Quality Checks

- All JavaScript files use canvas-based controls only
- All HTML files reference p5.js 1.11.10
- All index.md files include Sylvia's encouraging voice
- All metadata.json files follow Dublin Core format
- All entries added to mkdocs.yml in alphabetical order
- All entries added to sims/index.md with descriptions

## Concepts Covered

From Chapter 18 learning graph:
- Chi-Square Distribution (265)
- Chi-Square Statistic (266)
- Goodness-of-Fit Test (267)
- GOF Hypotheses (268)
- Expected Counts (269)
- Observed Counts (270)
- Calculating Chi-Square (271)
- Conditions for Chi-Square (272)
- GOF Conclusion (273)
- Test for Homogeneity (274)
- Homogeneity Setup (275)
- Test for Independence (276)
- Independence Setup (277)
- Chi-Square Conclusion (278)
- Inference for Slope (279)
- T-Interval for Slope (282)
- T-Test for Slope (283)
- Conditions for Regression (285)
- Linearity Condition (286)
- Independence Condition (287)
- Normality of Residuals (288)
- Equal Variance Condition (289)
