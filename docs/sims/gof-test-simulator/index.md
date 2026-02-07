---
title: Goodness-of-Fit Test Simulator
description: Interactive simulator for conducting complete chi-square goodness-of-fit tests with multiple example datasets.
quality_score: 92
---
# Goodness-of-Fit Test Simulator

<iframe src="main.html" height="560px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Conduct complete goodness-of-fit tests by entering observed counts and hypothesized proportions, then interpreting the results! This simulator lets you practice the entire GOF test workflow with immediate visual feedback.

### How to Use

1. **Enter Data**: Click on observed counts or proportions in the table to edit them
2. **Choose Categories**: Select 3-8 categories using the number buttons
3. **Load Examples**: Click preset buttons (Candy, Dice, Birthdays, Mendel) for classic examples
4. **Run Test**: Click the "Run Test" button to perform the chi-square test
5. **Interpret**: View the chi-square distribution, p-value, and conclusion

### Key Features

- **Editable data table** - Click any cell to modify values
- **Automatic expected count calculation** - E = n x p for each category
- **Visual comparison** - Bar chart shows observed vs expected
- **Chi-square distribution** - Shows test statistic on the distribution curve
- **Condition checking** - Verifies all expected counts are at least 5
- **Clear conclusions** - Plain-language interpretation of results

## Lesson Plan

### Learning Objective

Students will conduct complete goodness-of-fit tests by entering observed counts and hypothesized proportions, then interpreting the results (Bloom's Taxonomy: Applying).

### Classic Example: Mendel's Peas

Gregor Mendel crossed pea plants and observed the offspring phenotypes. His genetic theory predicted a 9:3:3:1 ratio for round yellow, round green, wrinkled yellow, and wrinkled green peas.

Load the **Mendel** preset to test whether his observed data matches the predicted proportions!

### Warmup Activity (5 minutes)

1. Load the **Candy** preset
2. Ask: "Based on the bar chart, do the observed counts seem close to expected?"
3. Predict whether we'll reject or fail to reject H0
4. Run the test to verify

### Main Activity (15 minutes)

1. Work through each preset example as a class
2. For each:
   - State the null and alternative hypotheses
   - Verify conditions are met
   - Run the test and interpret the p-value
   - State the conclusion in context

### Discussion Questions

- Why must all expected counts be at least 5?
- How does changing the significance level affect the conclusion?
- What would make a small p-value even without rejecting H0?

### Extension Activity

Have students create their own data:
1. Collect data from the class (favorite colors, birth months, etc.)
2. Enter observed counts
3. Choose hypothesized proportions (equal? different?)
4. Run and interpret the test
