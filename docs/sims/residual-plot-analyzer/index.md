---
title: Residual Plot Analyzer
description: An interactive MicroSim that helps students evaluate whether a linear model is appropriate by analyzing residual plot patterns. Displays side-by-side scatterplot and residual plot with point correspondence.
quality_score: 92
image: /sims/residual-plot-analyzer/residual-plot-analyzer.png
og:image: /sims/residual-plot-analyzer/residual-plot-analyzer.png
twitter:image: /sims/residual-plot-analyzer/residual-plot-analyzer.png
social:
   cards: false
---
# Residual Plot Analyzer

<iframe src="main.html" height="402px" scrolling="no"></iframe>

[Run the Residual Plot Analyzer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Residual Plot Analyzer MicroSim with the p5.js editor](https://editor.p5js.org/)

## Iframe Embed Code

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/residual-plot-analyzer/main.html" height="402px" scrolling="no"></iframe>
```

## Description

This interactive MicroSim helps students develop the critical skill of evaluating whether a linear regression model is appropriate for a given dataset. By displaying a scatterplot with regression line alongside its corresponding residual plot, students can see how patterns in residuals reveal problems with model fit.

**Key features:**

- **Side-by-Side Display**: Scatterplot with regression line (left) and residual plot (right) shown together for direct comparison
- **Horizontal Reference Line**: Clear zero line on the residual plot helps identify systematic patterns
- **Point Correspondence**: Hovering over any point highlights it in both plots, showing how data points map to their residuals
- **Connecting Lines Toggle**: Optional lines between plots to visualize the correspondence between original points and residuals
- **Three Pattern Types**:
  - Random (Good Fit): Residuals randomly scattered around zero
  - Curved Pattern: Systematic curve indicating a nonlinear relationship
  - Fan-Shaped: Increasing spread (heteroscedasticity) suggesting transformation is needed
- **Generate New Data**: Create fresh random variations of each pattern type
- **Quiz Mode**: Test understanding by identifying patterns before revealing the answer
- **Animated Transitions**: Smooth animations when switching between datasets
- **Color-Coded Residuals**: Green for positive residuals, red for negative

## Lesson Plan

### Learning Objective

Students will evaluate (Bloom Level 5) whether a linear model is appropriate by analyzing residual plot patterns and correctly identifying systematic departures from randomness.

**Bloom's Taxonomy Level**: Evaluate (L5)

**Bloom's Verb**: Evaluate

### Prerequisites

- Understanding of scatterplots and regression lines
- Concept of residuals (observed - predicted)
- Basic knowledge of linear regression
- Familiarity with correlation coefficient

### Suggested Duration

20-25 minutes for guided exploration

### Classroom Activities

#### Activity 1: Understanding Residual Plots (7 minutes)

1. Start with the "Random (Good Fit)" dataset
2. Explain that the left plot shows data with a regression line, right plot shows residuals
3. Point out the zero line on the residual plot - residuals should scatter randomly around this line
4. Toggle "Show Connections" to see how each data point corresponds to its residual
5. Ask: "What would a perfect linear relationship look like on the residual plot?"

#### Activity 2: Detecting Curved Patterns (6 minutes)

1. Select "Curved Pattern" dataset
2. Ask students to describe what they see in the residual plot before explaining
3. Point out the systematic curve - residuals are not randomly scattered
4. Discuss: "If residuals show a pattern, what does that tell us about our linear model?"
5. Introduce the concept: patterns in residuals suggest the linear model is missing something

#### Activity 3: Identifying Heteroscedasticity (6 minutes)

1. Select "Fan-Shaped" dataset
2. Focus on the residual plot - notice the spread changes across X values
3. Explain heteroscedasticity: the variability of residuals is not constant
4. Discuss implications: predictions are less reliable where spread is larger
5. Mention that logarithmic or other transformations can sometimes fix this

#### Activity 4: Quiz Mode Practice (6 minutes)

1. Enable Quiz Mode
2. Students see a dataset but don't know which type it is
3. They must examine the residual plot and identify the pattern
4. Click their answer and receive feedback
5. Repeat 3-4 times to build pattern recognition skills

### Discussion Questions

1. Why do we look at residual plots instead of just looking at the scatterplot?
2. What's the difference between a curved pattern and a fan-shaped pattern in residuals?
3. If a residual plot looks random, can we be certain the linear model is perfect?
4. How might you fix a curved residual pattern? A fan-shaped pattern?
5. Why is the zero line on the residual plot important?

### Assessment Opportunities

- Present 4-5 residual plots and ask students to identify the pattern type
- Have students explain in writing why random residuals indicate a good fit
- Ask students to sketch what the residual plot would look like for a given scatterplot
- Use Quiz Mode for formative assessment during class

### Common Misconceptions to Address

- **"A few points away from zero means bad fit"**: Explain that all residual plots will have variation - we're looking for systematic patterns, not individual outliers
- **"Curved residuals mean the data is bad"**: The data isn't bad - it just means a linear model isn't the right choice. A quadratic or other nonlinear model might work better
- **"Fan-shaped means the relationship isn't real"**: There may still be a real relationship, but we need to transform the data or use weighted regression
- **"Random-looking residuals prove causation"**: A good residual plot only tells us the linear model fits well - it says nothing about causation

### Connection to Chapter Content

This MicroSim directly supports the "Residual Analysis" section of Chapter 7: Regression. Students can use it to:

- Develop visual pattern recognition skills for residual plots
- Understand why checking residuals is essential before trusting regression results
- See concrete examples of each major pattern type
- Practice the diagnostic process statisticians use when evaluating models
- Build intuition that guides them to the right modeling approach

## References

- [AP Statistics Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-statistics/course) - Unit 2: Exploring Two-Variable Data
- [Guidelines for Assessment and Instruction in Statistics Education (GAISE)](https://www.amstat.org/education/guidelines-for-assessment-and-instruction-in-statistics-education-(gaise)-reports)
- Anscombe, F.J. (1973). "Graphs in Statistical Analysis". The American Statistician. 27 (1): 17-21.
- Kutner, M.H., Nachtsheim, C.J., & Neter, J. (2004). Applied Linear Regression Models (4th ed.). McGraw-Hill.

## Technical Notes

- Built with p5.js 1.11.10
- Uses canvas-based controls for iframe compatibility
- Width-responsive design adapts to container size
- Drawing height: 300px, Control height: 100px, Total iframe height: 402px
- Points are animated when switching datasets for visual clarity
- Hover detection works on both plots simultaneously

---

**Reminder**: Create a screenshot named `residual-plot-analyzer.png` for social media previews.
