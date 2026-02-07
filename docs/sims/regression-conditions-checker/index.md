---
title: Regression Conditions Checker
description: Interactive tool for evaluating LINE conditions for regression inference using diagnostic plots.
quality_score: 92
---
# Regression Conditions Checker

<iframe src="main.html" height="560px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Practice evaluating the LINE conditions for regression inference! This tool generates different types of data and asks you to identify which conditions are met or violated by examining diagnostic plots.

### How to Use

1. **Select a Scenario**: Choose from different data patterns (good, curved, fan, skewed, outliers)
2. **Examine the Plots**: Look at the scatterplot, residual plot, and histogram
3. **Make Your Assessment**: Click "Met" or "Not" for each LINE condition
4. **Check Your Answers**: Click "Check Answers" to see how you did
5. **Generate New Data**: Click to see new random data with the same pattern

### The LINE Conditions

| Condition | What to Check | Look For |
|-----------|---------------|----------|
| **L**inearity | Residual plot | No curved pattern |
| **I**ndependence | Data collection | Random sample, 10% condition |
| **N**ormality | Histogram of residuals | Roughly symmetric, bell-shaped |
| **E**qual Variance | Residual plot | Consistent spread across x |

### Pattern Recognition Tips

- **Curved residuals** = Linearity violated (need different model)
- **Fan shape** = Equal variance violated (spread changes with x)
- **Skewed histogram** = Normality violated (non-normal errors)
- **Random scatter** = Good! Conditions likely met

## Lesson Plan

### Learning Objective

Students will evaluate whether regression conditions are met by analyzing residual plots and histograms, identifying violations (Bloom's Taxonomy: Evaluating).

### Reading Residual Plots

The residual plot is your most powerful diagnostic tool:

1. **Linearity**: Points should scatter randomly around zero with no pattern
2. **Equal Variance**: The vertical spread should be consistent from left to right

Common violations:
- U-shaped or curved pattern = nonlinear relationship
- Megaphone/fan shape = unequal variance

### Warmup Activity (3 minutes)

Start with "Good Data" scenario. Have students identify:
- What does random scatter look like?
- What does a symmetric histogram look like?

### Main Activity (15 minutes)

1. Work through each scenario as a class
2. For each scenario:
   - Examine all three plots
   - Discuss what patterns you see
   - Complete the checklist
   - Check answers and discuss any surprises

### Discussion Questions

- Why is the residual plot more useful than the original scatterplot for checking linearity?
- What should you do if conditions aren't met?
- Why is the normality condition less critical for large samples?

### Common Misconceptions

1. "The scatterplot looks linear, so linearity is met" - Always check residual plot!
2. "A few outliers violate all conditions" - Outliers mainly affect normality
3. "Independence is easy to check visually" - It's about study design, not plots
