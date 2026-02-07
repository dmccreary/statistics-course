---
title: Regression Analysis Tool
description: A comprehensive interactive tool for performing complete linear regression analysis, including equation, interpretation, residual plots, and predictions with extrapolation warnings.
quality_score: 95
image: /sims/regression-analysis-tool/regression-analysis-tool.png
og:image: /sims/regression-analysis-tool/regression-analysis-tool.png
twitter:image: /sims/regression-analysis-tool/regression-analysis-tool.png
social:
   cards: false
---
# Regression Analysis Tool

<iframe src="main.html" height="652px" scrolling="no"></iframe>

[Run the Regression Analysis Tool MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Regression Analysis Tool MicroSim with the p5.js editor](https://editor.p5js.org/)

## Iframe Embed Code

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/regression-analysis-tool/main.html" height="652px" scrolling="no"></iframe>
```

## Description

This interactive MicroSim provides a complete regression analysis experience, integrating all key concepts from linear regression into a unified tool. Students can explore the relationship between variables, examine residuals, make predictions, and see auto-generated interpretations that model how statisticians communicate their findings.

**Key features:**

- **Main Scatterplot with Regression Line**: Displays data points and the least-squares regression line, with axes labeled using variable names and units
- **Residual Plot Toggle**: Shows residuals (actual minus predicted values) plotted against x-values to assess model fit
- **Statistics Panel**: Displays the regression equation, correlation coefficient (r), coefficient of determination (R-squared), slope, intercept, and means
- **Prediction Calculator**: Enter an x-value to calculate the predicted y-value, with visual feedback showing the predicted point on the regression line
- **Extrapolation Warnings**: Automatically detects when predictions fall outside the data range and displays a warning
- **Influential Point Detection**: Identifies and highlights points that may have outsized influence on the regression line
- **Auto-Generated Interpretation**: Creates a complete written interpretation using correct statistical language and the context of the current dataset
- **Export Analysis**: Generates a formatted text report of the complete regression analysis
- **Five Real-World Datasets**: Study Hours vs Test Score, Height vs Weight, Temperature vs Ice Cream Sales, Car Age vs Price, and Advertising vs Revenue

## Lesson Plan

### Learning Objective

Students will create a complete regression analysis by integrating all concepts: writing the regression equation, interpreting the slope and R-squared in context, analyzing residuals for model appropriateness, making and evaluating predictions, and identifying influential observations.

**Bloom's Taxonomy Level**: Create (L6)

**Bloom's Verb**: Create

### Prerequisites

- Understanding of scatterplots and correlation
- Familiarity with the least-squares regression line concept
- Basic understanding of residuals as prediction errors
- Experience with slope and y-intercept interpretation

### Suggested Duration

30-40 minutes for comprehensive exploration

### Classroom Activities

#### Activity 1: Explore the Components (8 minutes)

1. Start with the "Study Hours vs Test Score" dataset
2. Identify each component in the statistics panel: equation, r, R-squared, slope, intercept
3. Read the auto-generated interpretation at the bottom
4. Discuss: How does the interpretation connect to the statistics?

#### Activity 2: Residual Analysis (8 minutes)

1. Click "Show Residuals" to reveal the residual plot
2. Observe the pattern of residuals - is it random or systematic?
3. Switch to different datasets and compare residual patterns
4. Discuss: What would a residual plot look like if the linear model was a poor fit?

#### Activity 3: Making Predictions (10 minutes)

1. Choose a value within the data range and enter it in the prediction calculator
2. Observe where the predicted point appears on the regression line
3. Now enter a value well outside the data range
4. Discuss the extrapolation warning: Why is prediction outside the data range problematic?
5. Compare interpolation vs extrapolation predictions

#### Activity 4: Influential Points (7 minutes)

1. Click "Show Influential" to highlight influential observations
2. Identify which points are flagged and discuss why (far from mean x, large residual)
3. Discuss: How might removing an influential point change the regression line?
4. Compare datasets to see which have influential points

#### Activity 5: Complete Analysis Report (7 minutes)

1. Select a dataset your class is analyzing
2. Work through all components: equation, interpretation, residual check, predictions
3. Click "Export" to generate a formatted analysis report
4. Review the report structure as a model for written regression analysis

### Discussion Questions

1. What does the slope tell us in the context of each dataset?
2. Why might a high R-squared value still not indicate a good model?
3. How can residual plots reveal problems that the scatterplot might hide?
4. When is extrapolation acceptable, and when should it be avoided?
5. How do influential points affect our confidence in the regression results?

### Assessment Opportunities

- Have students write their own interpretation paragraph for a dataset, then compare to the auto-generated version
- Present a residual plot and ask whether the linear model is appropriate
- Give students a new dataset and ask them to predict whether it will have influential points before checking
- Ask students to explain why extrapolation to a specific value would or would not be reasonable

### Common Misconceptions to Address

- **"R-squared tells us if the relationship is linear"**: Clarify that R-squared only measures strength of linear fit; residual plots assess linearity
- **"Predictions are equally reliable everywhere"**: Explain that predictions near the mean are more reliable than those at the extremes
- **"Removing influential points is always correct"**: Discuss that influential points may be valid data that reveal important information
- **"The regression line passes through all points"**: Emphasize that the line minimizes residuals but rarely passes through any actual points
- **"A higher slope means a stronger relationship"**: Distinguish between slope (rate of change) and correlation (strength)

### Connection to Chapter Content

This MicroSim directly supports Chapter 7: Linear Regression, integrating concepts from throughout the chapter:

- **Regression Equation**: Students see how the equation is calculated and displayed
- **Slope Interpretation**: The interpretation template models correct slope language
- **R-squared**: Students observe how R-squared varies across datasets
- **Residual Analysis**: The residual plot toggle supports the "checking conditions" section
- **Predictions**: The calculator reinforces prediction and extrapolation concepts
- **Influential Observations**: Highlights connect to the discussion of leverage and influence

## References

- [AP Statistics Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-statistics/course) - Unit 2: Exploring Two-Variable Data
- [Guidelines for Assessment and Instruction in Statistics Education (GAISE)](https://www.amstat.org/education/guidelines-for-assessment-and-instruction-in-statistics-education-(gaise)-reports)
- Chatterjee, S., & Hadi, A. S. (2012). Regression Analysis by Example (5th ed.). Wiley.
- Moore, D. S., McCabe, G. P., & Craig, B. A. (2021). Introduction to the Practice of Statistics (10th ed.). W.H. Freeman.

## Technical Notes

- Built with p5.js 1.11.10
- Uses canvas-based controls for iframe compatibility
- Width-responsive design adapts to container size
- Drawing height: 550px, Control height: 100px, Total iframe height: 652px
- Influential points identified using standardized residuals (>2) and leverage (>3/n)

---

**Reminder**: Create a screenshot named `regression-analysis-tool.png` for social media previews.
