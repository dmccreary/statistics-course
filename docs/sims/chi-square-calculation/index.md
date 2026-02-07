---
title: Chi-Square Calculation Step-by-Step
description: Interactive step-by-step visualization of chi-square statistic calculation with editable data.
quality_score: 90
---
# Chi-Square Calculation Step-by-Step

<iframe src="main.html" height="510px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Practice calculating chi-square statistics step by step! This visualization breaks down the formula into its component parts with visual feedback showing how each category contributes to the final statistic.

### How to Use

- Click **Next** and **Back** buttons to move through calculation stages
- Toggle **Auto** to automatically step through the calculation
- Click on any **observed count** in the table to edit it
- Use **Preset** buttons to load example datasets (Candy, Dice)
- Color bars show which categories contribute most to the chi-square value

### The Chi-Square Formula

The chi-square statistic measures how far observed counts are from expected counts:

\[
\chi^2 = \sum \frac{(O - E)^2}{E}
\]

Where:
- **O** = observed count for each category
- **E** = expected count for each category
- The sum is taken over all categories

### Key Insights

- **Positive and negative differences both matter** - squaring removes the sign
- **Larger departures from expected contribute more** to the chi-square
- **Dividing by E standardizes** - a difference of 5 matters more when E is small
- The **largest contributor** shows where data differs most from expectations

## Lesson Plan

### Learning Objective

Students will practice calculating chi-square statistics by working through each component of the formula with visual feedback (Bloom's Taxonomy: Applying).

### Warmup Activity (3 minutes)

Load the Candy preset. Ask: "Looking at the bar chart, which category seems to have the biggest difference between observed and expected?" Then step through to verify.

### Main Activity (12 minutes)

1. Step through the Candy example one stage at a time
2. At each stage, have students predict the next value before revealing
3. Discuss: Which category contributes most? Why?
4. Load the Dice example and repeat

### Discussion Questions

- Why do we square the differences?
- Why do we divide by the expected count?
- If two categories have the same absolute difference (O - E), which contributes more - the one with larger E or smaller E?

### Practice Problems

Have students edit the observed values to create:
1. A case with chi-square very close to 0 (all O close to E)
2. A case with a very large chi-square (extreme departures)
