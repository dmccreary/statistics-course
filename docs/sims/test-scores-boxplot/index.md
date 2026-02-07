---
title: Test Scores Boxplot Explorer
description: Interactive MicroSim that uses boxplots to summarize exam scores and compare two class sections.
quality_score: 92
image: /sims/test-scores-boxplot/test-scores-boxplot.png
og:image: /sims/test-scores-boxplot/test-scores-boxplot.png
twitter:image: /sims/test-scores-boxplot/test-scores-boxplot.png
social:
   cards: false
---
# Test Scores Boxplot Explorer

<iframe src="main.html" height="620px" scrolling="no"></iframe>

[Run the Test Scores Boxplot Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## Iframe Embed Code

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/test-scores-boxplot/main.html" height="620px" scrolling="no"></iframe>
```

## About This MicroSim

Sylvia says: "Acorn for your thoughts? A boxplot is like a snack-sized summary. You get the center and spread all at once, plus those extremes that make you go, 'Wait, who scored a 5?'"

This MicroSim models test scores from a 100-point exam. It shows the full five-number summary in a single boxplot, making the minimum, Q1, median, Q3, and maximum easy to spot. Toggle Section B to compare two classes or two versions of the same exam.

**Key features:**

- **Five-number summary** displayed in real time
- **Low outlier toggle** to show how the minimum can shift
- **Individual scores** overlay for student-level context
- **Section comparison** to highlight differences between classes
- **Randomized class scores** for repeated practice

## Lesson Plan

### Learning Objective

Students will interpret a boxplot by identifying the minimum, Q1, median, Q3, and maximum and comparing two class sections.

**Bloom's Taxonomy Level**: Analyze (L4)

**Bloom's Verb**: Interpret

### Prerequisites

- Understanding of quartiles and median
- Familiarity with boxplots

### Suggested Duration

10-15 minutes for guided exploration

### Classroom Activities

#### Activity 1: Five-Number Scavenger Hunt (5 minutes)

1. Start with the default class scores and point to each part of the boxplot.
2. Ask students to identify the minimum, Q1, median, Q3, and maximum.
3. Toggle the low outlier and ask: "Which summary value changed the most?"

#### Activity 2: Section Face-Off (5 minutes)

1. Enable Section B and adjust the averages.
2. Ask: "Which class has the higher typical score? Which is more spread out?"
3. Have students justify their answer using quartiles and the median.

#### Activity 3: Real-World Connection (3 minutes)

1. Ask students to imagine two different exam versions.
2. Adjust the spreads so one section has more variability.
3. Discuss: "Which exam seems harder? Why?"

### Discussion Questions

1. If the median is higher but the spread is larger, how would you describe the class performance?
2. How does a low outlier affect the minimum without changing the median much?
3. Why might two sections have similar medians but different Q1 values?

### Assessment Opportunities

- Quick exit ticket: "Circle the median on a drawn boxplot and explain what it means."
- Compare two boxplots and write a 2-sentence interpretation of center and spread.

### Common Misconceptions to Address

- **The box is the average**: Clarify that the box spans the middle 50% of scores, not the mean.
- **Outliers change the median**: Show how the median can stay stable even with a very low minimum.
- **Wider box means higher scores**: Emphasize that width (or length) shows spread, not performance.

## Technical Notes

- Built with Plotly.js
- Responsive layout for iframe embedding
- Default scores generated from a normal distribution and clamped to 0-100

---

**Reminder**: Create a screenshot named `test-scores-boxplot.png` for social media previews.
