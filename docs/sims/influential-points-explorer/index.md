---
title: Influential Points Explorer
description: An interactive MicroSim for exploring how individual points affect regression lines. Students drag a test point to see real-time changes in leverage, residuals, and influence measures.
quality_score: 92
image: /sims/influential-points-explorer/influential-points-explorer.png
og:image: /sims/influential-points-explorer/influential-points-explorer.png
twitter:image: /sims/influential-points-explorer/influential-points-explorer.png
social:
   cards: false
---
# Influential Points Explorer

<iframe src="main.html" height="502px" scrolling="no"></iframe>

[Run the Influential Points Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Influential Points Explorer MicroSim with the p5.js editor](https://editor.p5js.org/)

## Iframe Embed Code

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/influential-points-explorer/main.html" height="502px" scrolling="no"></iframe>
```

## Description

This interactive MicroSim helps students understand how individual data points can influence a regression line. By dragging a special "test point" around the scatterplot, students observe in real time how the regression line shifts and how statistical measures of influence change.

**Key features:**

- **Draggable Test Point**: Click and drag the highlighted test point (marked "T") anywhere on the scatterplot
- **Dual Regression Lines**: See both the regression line with the test point (solid green) and without it (dashed gray)
- **Real-Time Statistics**: Watch leverage, residual, and influence update as you move the point
- **Color-Coded Influence**: The test point changes color based on its influence level:
  - Green = Low influence
  - Yellow/Amber = Moderate influence
  - Red = High influence
- **Leverage Indicator Bar**: Visual display showing the test point's x-distance from the mean of the other points
- **Equation Comparison**: See both regression equations and R-squared values side by side
- **Adjustable Dataset**: Change the number of background points (5-15) to explore how sample size affects influence

## Lesson Plan

### Learning Objective

Students will evaluate how individual points affect regression by manipulating high-leverage and outlier points, demonstrating understanding of why some points are more influential than others.

**Bloom's Taxonomy Level**: Evaluate (L5)

**Bloom's Verb**: Evaluate

### Prerequisites

- Understanding of scatterplots and linear regression
- Familiarity with residuals (vertical distance from regression line)
- Basic understanding of mean and how data spread affects analysis

### Suggested Duration

20-30 minutes for full exploration

### Key Concepts

**Leverage** measures how far a point's x-value is from the mean of all x-values. Points with high leverage have more potential to influence the regression line.

**Residual** is the vertical distance between a point and the regression line. Large residuals indicate points that don't fit the overall pattern.

**Influence** combines leverage and residual. A point is highly influential when it has both high leverage AND a large residual. Such points pull the regression line toward themselves.

### Classroom Activities

#### Activity 1: Discover Leverage (7 minutes)

1. Start with the default dataset (test point at moderate position)
2. Move the test point horizontally (left and right) while keeping y relatively constant
3. Observe how the leverage indicator bar changes
4. Notice: "Moving the point far from the center increases leverage, but doesn't necessarily change the regression line much if the point follows the pattern."
5. Discussion: Why does x-position matter more than y-position for leverage?

#### Activity 2: Explore Residuals (7 minutes)

1. Position the test point near the center horizontally (low leverage)
2. Move it vertically up and down, away from the regression line
3. Watch the residual value change in the statistics panel
4. Notice: "Even with a large residual, a central point has limited influence because it has low leverage."
5. Discussion: What does the residual tell us about how well a point fits the pattern?

#### Activity 3: Create Maximum Influence (8 minutes)

1. Challenge: "Find the position that creates the HIGHEST influence (red color)"
2. Students should discover: Move the point far to the right AND far above or below the pattern
3. Toggle the comparison line on/off to see how much the regression changes
4. Notice: "High influence = high leverage + large residual"
5. Discussion: What real-world situations might create influential points?

#### Activity 4: Sample Size Effects (5 minutes)

1. Set the points slider to 5 (minimum)
2. Move the test point to an extreme position
3. Observe the large change in the regression line
4. Increase to 15 points and repeat
5. Discussion: "Why are influential points more problematic in small datasets?"

### Discussion Questions

1. Why do we need both leverage AND residual to determine if a point is influential?
2. Can a point with low leverage ever be highly influential? Why or why not?
3. What should a researcher do if they identify a highly influential point in their data?
4. How does sample size affect the potential influence of a single point?
5. Can an influential point improve or harm a regression model?

### Assessment Opportunities

- Have students sketch where they would place a point to maximize/minimize influence
- Present scenarios and ask students to predict which point would be most influential
- Ask students to explain in their own words the relationship between leverage, residual, and influence

### Common Misconceptions to Address

- **"Outliers are always bad"**: Not all outliers are influential, and some influential points may represent valid data
- **"High leverage means high influence"**: A point can have high leverage but low influence if it follows the pattern (small residual)
- **"Just remove influential points"**: Influential points should be investigated, not automatically removed; they may reveal important information
- **"Influence is only about y-distance"**: Both x-position (leverage) and y-deviation (residual) contribute to influence

### Connection to Chapter Content

This MicroSim directly supports Chapter 7: Fitting a Line to Data. Students can use it to:

- Visualize the concepts of leverage and influence introduced in the chapter
- Develop intuition about why certain points affect regression more than others
- Understand the importance of checking for influential points before trusting regression results
- Explore the relationship between outliers, high-leverage points, and influential points

## References

- [AP Statistics Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-statistics/course) - Unit 2: Exploring Two-Variable Data
- [Guidelines for Assessment and Instruction in Statistics Education (GAISE)](https://www.amstat.org/education/guidelines-for-assessment-and-instruction-in-statistics-education-(gaise)-reports)
- Cook, R.D. (1977). "Detection of Influential Observation in Linear Regression". Technometrics.
- Chatterjee, S. & Hadi, A.S. (1986). "Influential Observations, High Leverage Points, and Outliers in Linear Regression". Statistical Science.

## Technical Notes

- Built with p5.js 1.11.10
- Uses canvas-based controls for iframe compatibility
- Width-responsive design adapts to container size
- Drawing height: 400px, Control height: 100px, Total iframe height: 502px
- Influence is calculated as a normalized measure of regression change when the test point is removed

---

**Reminder**: Create a screenshot named `influential-points-explorer.png` for social media previews.
