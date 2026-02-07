---
title: Residual Calculator
description: An interactive visualization for computing and understanding regression residuals, showing the vertical distance between actual data points and predicted values on a regression line.
quality_score: 92
image: /sims/residual-calculator/residual-calculator.png
og:image: /sims/residual-calculator/residual-calculator.png
twitter:image: /sims/residual-calculator/residual-calculator.png
social:
   cards: false
---
# Residual Calculator

<iframe src="main.html" height="502px" scrolling="no"></iframe>

[Run the Residual Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Residual Calculator MicroSim with the p5.js editor](https://editor.p5js.org/)

## Iframe Embed Code

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/residual-calculator/main.html" height="502px" scrolling="no"></iframe>
```

## Description

This interactive MicroSim helps students understand residuals, one of the most fundamental concepts in regression analysis. A residual is the vertical distance between an actual data point and the predicted value from the regression line. Mathematically: \( e = y - \hat{y} \).

**Key features:**

- **Interactive Scatterplot**: Click any of the 8 data points to select it and see detailed calculations
- **Regression Line**: Automatically fitted least-squares regression line with equation displayed
- **Color-Coded Residuals**:
  - Green lines and points indicate positive residuals (actual value above the line)
  - Red lines and points indicate negative residuals (actual value below the line)
- **Animated Selection**: When you select a point, the residual line animates from the regression line to the actual point
- **Detailed Calculation Panel**: Shows step-by-step calculation of \( \hat{y} \) and the residual for the selected point
- **Show All Residuals Toggle**: View residual lines for all points simultaneously
- **Add New Point**: Click to add custom points and watch the regression line recalculate
- **Remove Selected**: Remove a selected point to see how it affects the regression
- **Sum of Residuals**: When showing all residuals, displays the sum (which should be approximately zero)

## Lesson Plan

### Learning Objective

Students will apply residual calculations by computing \( e = y - \hat{y} \) for individual data points and visualizing how residuals relate to the regression line.

**Bloom's Taxonomy Level**: Apply (L3)

**Bloom's Verb**: Compute, Visualize

### Prerequisites

- Understanding of scatterplots and what they represent
- Familiarity with the equation of a line: \( y = mx + b \)
- Basic understanding of what a regression line represents

### Suggested Duration

15-20 minutes for guided exploration

### Classroom Activities

#### Activity 1: Understanding Residuals Visually (5 minutes)

1. Start with the default dataset (Study Hours vs Test Scores)
2. Click on Point 1 and observe the calculation panel
3. Ask students: "What does the dashed line represent?"
4. Click "Show All Residuals" to see the full picture
5. Discuss: "Why are some residuals green and some red?"

#### Activity 2: The Residual Formula (5 minutes)

1. Select Point 4 and walk through the calculation panel step by step
2. Have students calculate \( \hat{y} \) by hand using the regression equation
3. Verify their answer matches the display
4. Calculate the residual and confirm

#### Activity 3: Sum of Residuals Property (4 minutes)

1. Turn on "Show All Residuals"
2. Observe the Sum of Residuals display (should be near zero)
3. Discuss: "Why does the sum of residuals equal zero for least-squares regression?"
4. Add a new point that's far from the line and observe how the regression updates

#### Activity 4: Impact of Outliers (5 minutes)

1. Click "Add Point" and place a point far above the regression line
2. Observe how the regression line tilts toward the new point
3. Note how all the residuals change
4. Discuss: "How do outliers affect the regression line?"
5. Remove the outlier using "Remove Selected" and compare

### Discussion Questions

1. What does a positive residual tell you about the data point?
2. If a point has a residual of zero, where is it located?
3. Why might the sum of residuals not be exactly zero (hint: rounding)?
4. Which point has the largest residual? What does this mean?
5. If you removed the point with the largest residual, how would the regression line change?

### Assessment Opportunities

- Give students a regression equation and data point, ask them to calculate the residual by hand
- Present a scatterplot with residual lines and ask students to identify which points are overpredicted vs underpredicted
- Ask students to predict whether adding a specific point would increase or decrease the slope

### Common Misconceptions to Address

- **"Residual is the horizontal distance"**: Emphasize that residuals are always vertical distances, measuring error in the y-direction
- **"Bigger residuals are always bad"**: Context matters; some datasets naturally have more variation
- **"The regression line goes through most points"**: The line minimizes squared residuals; points rarely fall exactly on it
- **"Positive residual means the point is good"**: Positive/negative just indicates above/below the line, not quality

### Connection to Chapter Content

This MicroSim directly supports Chapter 7: Linear Regression by helping students:

- Visualize what residuals represent geometrically
- Practice calculating \( \hat{y} \) using the regression equation
- Understand the relationship between residuals and prediction error
- See why sum of residuals equals zero for least-squares regression
- Observe how outliers affect the regression line

## How Residuals Work

The residual for a data point \( (x_i, y_i) \) is:

\[
e_i = y_i - \hat{y}_i
\]

Where:

- \( y_i \) is the actual (observed) y-value
- \( \hat{y}_i = b_0 + b_1 x_i \) is the predicted y-value from the regression line
- \( e_i \) is the residual (prediction error)

**Interpretation:**

- \( e > 0 \): Actual value is above the line (model underpredicted)
- \( e < 0 \): Actual value is below the line (model overpredicted)
- \( e = 0 \): Point lies exactly on the regression line

**Important Property:** For the least-squares regression line, the sum of all residuals equals zero:

\[
\sum_{i=1}^{n} e_i = 0
\]

## References

- [AP Statistics Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-statistics/course) - Unit 2: Exploring Two-Variable Data
- [Guidelines for Assessment and Instruction in Statistics Education (GAISE)](https://www.amstat.org/education/guidelines-for-assessment-and-instruction-in-statistics-education-(gaise)-reports)
- [Khan Academy: Residuals](https://www.khanacademy.org/math/statistics-probability/describing-relationships-quantitative-data/more-on-regression/v/residual-plots)

## Technical Notes

- Built with p5.js 1.11.10
- Uses canvas-based controls for iframe compatibility
- Width-responsive design adapts to container size
- Drawing height: 400px, Control height: 100px, Total iframe height: 502px

---

**Reminder**: Create a screenshot named `residual-calculator.png` for social media previews.
