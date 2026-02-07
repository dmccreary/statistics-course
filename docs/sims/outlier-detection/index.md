---
title: Outlier Detection
description: Interactive visualization of the 1.5 × IQR rule for identifying potential outliers in a dataset.
quality_score: 90
---
# Outlier Detection

<iframe src="main.html" height="352px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Explore how the **1.5 × IQR rule** identifies potential outliers. The fences define boundaries, and any points beyond them are flagged as outliers.

### How to Use
- **Drag** points to change their values and see outlier status update in real-time
- Adjust the **Multiplier** slider (default 1.5) to see how fence positions change
- Toggle **Show Calculations** to see the fence formulas
- Toggle **Modified Boxplot** to compare standard vs. modified whisker placement

### Key Insights
- Outliers are values below Q1 - 1.5×IQR or above Q3 + 1.5×IQR
- The 1.5 multiplier is a convention, not a law
- Modified boxplots show outliers as individual points

## Lesson Plan

### Learning Objective
Students will apply the 1.5 × IQR rule to identify potential outliers in a dataset (Bloom's Taxonomy: Applying, Analyzing).
