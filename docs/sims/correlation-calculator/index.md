---
title: Correlation Calculator
description: An interactive step-by-step calculator that teaches students how to compute the correlation coefficient from paired data, with real-time scatterplot visualization.
quality_score: 92
image: /sims/correlation-calculator/correlation-calculator.png
og:image: /sims/correlation-calculator/correlation-calculator.png
twitter:image: /sims/correlation-calculator/correlation-calculator.png
social:
   cards: false
---
# Correlation Calculator

<iframe src="main.html" height="502px" scrolling="no"></iframe>

[Run the Correlation Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Correlation Calculator MicroSim with the p5.js editor](https://editor.p5js.org/)

## Iframe Embed Code

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/correlation-calculator/main.html" height="502px" scrolling="no"></iframe>
```

## Description

This interactive MicroSim walks students through the step-by-step calculation of the Pearson correlation coefficient (r). By entering their own data or using preset datasets, students can observe how the formula transforms raw (x, y) pairs into z-scores, multiplies them, and produces a final correlation value.

**Key features:**

- **Editable Data Table**: Enter up to 6 (x, y) pairs directly in the table cells
- **Real-Time Scatterplot**: Watch the scatterplot update instantly as data changes
- **Step-by-Step Calculation**: See each phase of the correlation formula animated on screen
  - Step 1: Calculate means
  - Step 2: Calculate z-scores for x and y
  - Step 3: Multiply z-scores for each point
  - Step 4: Sum the products
  - Step 5: Divide by (n-1) to get r
- **Color-Coded Z-Scores**: Green for positive, red for negative values
- **Quadrant Highlighting**: Scatterplot points colored by whether they contribute positively or negatively to correlation
- **Mean Lines**: Dashed lines showing the mean of x and y on the scatterplot
- **Interpretation Display**: Final r-value with strength and direction interpretation
- **Preset Datasets**: Study Hours (positive), Height/Weight (positive), Negative correlation, and No correlation examples

## Lesson Plan

### Learning Objective

Students will calculate the correlation coefficient step by step and verify their understanding of the formula by entering data and observing how each component of the calculation contributes to the final r-value.

**Bloom's Taxonomy Level**: Apply (L3)

**Bloom's Verb**: Calculate

### Prerequisites

- Understanding of z-scores and how to calculate them
- Familiarity with mean and standard deviation
- Basic understanding of scatterplots and what correlation measures

### Suggested Duration

20-25 minutes for guided exploration

### Classroom Activities

#### Activity 1: Explore the Formula (7 minutes)

1. Start with the "Study Hours" preset data
2. Click "Calculate" then "Next Step" repeatedly to walk through each phase
3. Ask students: "Why do we convert to z-scores before multiplying?"
4. Observe how points in the same quadrant (both above or both below mean) contribute positive products

#### Activity 2: Enter Your Own Data (8 minutes)

1. Click "Clear All" to start fresh
2. Have students enter data from a practice problem or create their own
3. Predict what the correlation will be before clicking "Calculate"
4. Compare prediction to actual value and discuss why it matched or differed

#### Activity 3: Compare Dataset Types (5 minutes)

1. Cycle through all four preset datasets
2. For each, predict whether r will be positive, negative, or near zero
3. Observe how the color-coding of points matches the final correlation sign
4. Discuss: "What visual pattern tells you if correlation will be strong or weak?"

#### Activity 4: Edge Cases (5 minutes)

1. Try entering data where all x-values are the same - what happens?
2. Try entering only 2 points - is the correlation meaningful?
3. Add an outlier to the "Study Hours" data - how does r change?

### Discussion Questions

1. Why does the formula divide by (n-1) instead of n?
2. What does it mean when a z-score product is negative versus positive?
3. How do the mean lines on the scatterplot relate to z-score signs?
4. Why is correlation always between -1 and 1?
5. If you move one point far from the others, what happens to r?

### Assessment Opportunities

- Have students calculate r by hand for a 4-point dataset, then verify with the MicroSim
- Ask students to sketch what a scatterplot with r = 0.7 would look like, then check with a preset
- Present students with a scatterplot and ask them to estimate r before revealing the calculated value

### Common Misconceptions to Address

- **"r = 0 means no relationship"**: Clarify that it means no LINEAR relationship - show the "No Correlation" preset
- **"Bigger r is always better"**: Discuss that the appropriate r depends on context
- **"Correlation proves causation"**: Even with r = 0.99, we cannot conclude causation
- **"I need lots of data"**: Show that even 3-4 points can give a meaningful correlation (though with less reliability)

### Connection to Chapter Content

This MicroSim directly supports the "Calculating Correlation" section of Chapter 6: Scatterplots and Association. Students can use it to:

- Verify hand calculations from practice problems
- Build intuition for what different r-values look like
- Understand why the formula works (z-scores put variables on same scale, products capture co-movement)
- See how outliers affect correlation

## References

- [AP Statistics Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-statistics/course) - Unit 2: Exploring Two-Variable Data
- [Guidelines for Assessment and Instruction in Statistics Education (GAISE)](https://www.amstat.org/education/guidelines-for-assessment-and-instruction-in-statistics-education-(gaise)-reports)
- Pearson, K. (1895). "Note on regression and inheritance in the case of two parents". Proceedings of the Royal Society of London.

## Technical Notes

- Built with p5.js 1.11.10
- Uses canvas-based controls for iframe compatibility
- Width-responsive design adapts to container size
- Drawing height: 400px, Control height: 100px, Total iframe height: 502px

---

**Reminder**: Create a screenshot named `correlation-calculator.png` for social media previews.
