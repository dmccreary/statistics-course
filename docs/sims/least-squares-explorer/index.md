---
title: Least Squares Explorer
description: An interactive visualization showing how the least squares method finds the best-fit regression line by minimizing the sum of squared residuals. Students can drag data points and watch the line and residual squares update in real-time.
quality_score: 92
image: /sims/least-squares-explorer/least-squares-explorer.png
og:image: /sims/least-squares-explorer/least-squares-explorer.png
twitter:image: /sims/least-squares-explorer/least-squares-explorer.png
social:
   cards: false
---
# Least Squares Explorer

<iframe src="main.html" height="452px" scrolling="no"></iframe>

[Run the Least Squares Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Least Squares Explorer MicroSim with the p5.js editor](https://editor.p5js.org/)

## Iframe Embed Code

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/least-squares-explorer/main.html" height="452px" scrolling="no"></iframe>
```

## Description

This interactive MicroSim helps students understand the fundamental concept behind least squares regression: finding the line that minimizes the sum of squared distances (residuals) from each point to the line.

**Key features:**

- **Draggable Data Points**: Click and drag any of the 10 data points to reposition them on the coordinate plane
- **Dynamic Regression Line**: Watch the best-fit line recalculate instantly as points move
- **Residual Visualization**: Vertical lines (in light red) show the distance from each point to the regression line
- **Squared Residuals Display**: Semi-transparent squares drawn at each residual visually show what "squared" means and how each point contributes to the total
- **Real-Time SSR**: The Sum of Squared Residuals updates continuously as you manipulate points
- **Mean Point Indicator**: Dashed crosshairs show the mean point (x, y), demonstrating that the regression line always passes through this point
- **Equation Display**: See the regression equation update as you move points

## How It Works

The least squares method finds the line y = a + bx that minimizes:

\[
SSR = \sum_{i=1}^{n}(y_i - \hat{y}_i)^2
\]

where:

- \(y_i\) is the observed y-value for point i
- \(\hat{y}_i\) is the predicted y-value from the regression line
- The difference \((y_i - \hat{y}_i)\) is called the **residual**

By squaring the residuals, we:

1. Make all contributions positive (no canceling out)
2. Give larger deviations more weight (penalize outliers more heavily)
3. Create a smooth mathematical function that can be minimized using calculus

## Lesson Plan

### Learning Objective

Students will understand how the least squares method finds the best-fit line by minimizing squared residuals, and observe how moving data points affects both the regression line and the total squared error.

**Bloom's Taxonomy Level**: Understand (L2)

**Bloom's Verb**: Explain

### Prerequisites

- Understanding of scatterplots and linear relationships
- Familiarity with the concept of a "line of best fit"
- Basic understanding of residuals (vertical distance from point to line)

### Suggested Duration

15-20 minutes for guided exploration

### Classroom Activities

#### Activity 1: Explore the Default Data (5 minutes)

1. Observe the initial scatterplot with its regression line
2. Notice how the red squares vary in size - what does this mean?
3. Identify which points contribute most to the Sum of Squared Residuals
4. Note that the line passes through the intersection of the dashed lines (the mean point)

#### Activity 2: Manipulate Single Points (5 minutes)

1. Drag one point far away from the line - what happens to SSR?
2. Return the point to its original position
3. Move a point closer to the line - how does SSR change?
4. Try to minimize SSR by repositioning points - can you beat the algorithm?
5. Observe: why can you never get SSR exactly to zero (unless points are perfectly linear)?

#### Activity 3: Understand the Squares (5 minutes)

1. Toggle "Hide Squares" to see just the residual lines
2. Toggle "Show Squares" and observe the visual representation
3. Discuss: why does a point twice as far from the line contribute four times as much to SSR?
4. Find the point with the largest square - this is the most "influential" point

#### Activity 4: Random Data Exploration (5 minutes)

1. Click "Random Points" several times to see different patterns
2. Observe positive correlations, negative correlations, and weak/no correlation
3. For each, note how the line adjusts and what the SSR tells you about fit quality
4. Discuss: what does a low SSR mean? A high SSR?

### Discussion Questions

1. Why do we square the residuals instead of just adding them up?
2. What would happen if we used absolute values instead of squares?
3. Why does the regression line always pass through the mean point (x, y)?
4. If one point has a residual of 10 and another has a residual of 5, how do their contributions to SSR compare?
5. How would an outlier affect the regression line? The SSR?

### Assessment Opportunities

- Have students sketch where they think the regression line should go before revealing it
- Ask students to predict how SSR will change before moving a point, then verify
- Present two different lines and ask which has a lower SSR (test visual intuition)
- Have students explain in writing why least squares uses squared values

### Common Misconceptions to Address

- **"The line should go through as many points as possible"**: Clarify that least squares minimizes total squared distance, not number of points touched
- **"A higher SSR means the line is wrong"**: Explain that SSR depends on data spread, not line quality
- **"All points contribute equally"**: Show how distant points have disproportionate influence due to squaring
- **"The line minimizes vertical and horizontal distances"**: Emphasize that only vertical distances (residuals) matter

### Connection to Chapter Content

This MicroSim directly supports Chapter 7: Least Squares Regression. Students can use it to:

- Build intuition for what "least squares" actually means
- Understand why the regression line is unique for a given dataset
- See the connection between residuals and the regression formula
- Prepare for understanding regression diagnostics and residual plots
- Grasp why outliers can have such a strong effect on the regression line

## References

- [AP Statistics Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-statistics/course) - Unit 2: Exploring Two-Variable Data
- [Guidelines for Assessment and Instruction in Statistics Education (GAISE)](https://www.amstat.org/education/guidelines-for-assessment-and-instruction-in-statistics-education-(gaise)-reports)
- Legendre, A.M. (1805). "Nouvelles methodes pour la determination des orbites des cometes" - First publication of least squares method
- Gauss, C.F. (1809). "Theoria Motus Corporum Coelestium" - Independent development of least squares

## Technical Notes

- Built with p5.js 1.11.10
- Uses canvas-based controls for iframe compatibility
- Width-responsive design adapts to container size
- Drawing height: 350px, Control height: 100px, Total iframe height: 452px
- Regression calculated using standard least squares formulas
- Points are draggable within the plot boundaries

---

**Reminder**: Create a screenshot named `least-squares-explorer.png` for social media previews.
