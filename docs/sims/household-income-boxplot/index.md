---
title: Household Income Boxplot Explorer
description: Interactive MicroSim that uses a boxplot to summarize household incomes and highlight right-skew.
quality_score: 92
image: /sims/household-income-boxplot/household-income-boxplot.png
og:image: /sims/household-income-boxplot/household-income-boxplot.png
twitter:image: /sims/household-income-boxplot/household-income-boxplot.png
social:
   cards: false
---
# Household Income Boxplot Explorer

<iframe src="main.html" height="620px" scrolling="no"></iframe>

[Run the Household Income Boxplot Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## Iframe Embed Code

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/household-income-boxplot/main.html" height="620px" scrolling="no"></iframe>
```

## About This MicroSim

Sylvia says: "I love a boxplot because it tells the whole story without making me count every acorn. The long whisker here is a big clue that a few households earn way more than most."

This MicroSim simulates household incomes in a city (in thousands of dollars). The distribution is intentionally right-skewed, so the median sits closer to Q1 than Q3, and the mean typically sits above the median. Toggle the high-income outlier to see how a long upper whisker highlights inequality.

**Key features:**

- **Right-skewed income data** generated each time you click “New city sample”
- **Five-number summary** shown beneath the plot
- **Mean marker** to compare mean vs median
- **Outlier toggle** to emphasize long upper whiskers
- **Individual points** overlay to reveal household-level variation

## Lesson Plan

### Learning Objective

Students will interpret a right-skewed boxplot by identifying the five-number summary and comparing mean and median.

**Bloom's Taxonomy Level**: Analyze (L4)

**Bloom's Verb**: Interpret

### Prerequisites

- Understanding of quartiles and median
- Familiarity with boxplots

### Suggested Duration

10-15 minutes for guided exploration

### Classroom Activities

#### Activity 1: Spot the Skew (5 minutes)

1. Load the default view and ask students: "Which whisker is longer?"
2. Have them explain what the long upper whisker implies about very high incomes.
3. Ask: "Where is the median compared to Q1 and Q3?"

#### Activity 2: Mean vs Median (5 minutes)

1. Keep the mean marker visible.
2. Ask: "Is the mean above or below the median? Why?"
3. Increase the inequality slider and observe how the mean moves.

#### Activity 3: Inequality Without Raw Data (3 minutes)

1. Hide the individual points.
2. Ask: "What can we say about inequality just from the boxplot?"
3. Toggle the outlier and discuss the change in the maximum.

### Discussion Questions

1. Why does the median stay closer to Q1 in a right-skewed distribution?
2. How does a single high-income outlier affect the maximum and whisker length?
3. What does the distance between Q1 and Q3 tell you about typical households?

### Assessment Opportunities

- Quick write: "Describe the distribution using center and spread."
- Compare two boxplots (before/after higher inequality) and interpret the change.

### Common Misconceptions to Address

- **The mean equals the median**: Show how skew pushes the mean upward.
- **Whiskers are averages**: Clarify they show data ranges, not means.
- **Small box means low values**: Emphasize that box size shows spread, not level.

## Technical Notes

- Built with Plotly.js
- Responsive layout for iframe embedding
- Incomes generated from a log-normal model and clamped to realistic bounds

---

**Reminder**: Create a screenshot named `household-income-boxplot.png` for social media previews.
