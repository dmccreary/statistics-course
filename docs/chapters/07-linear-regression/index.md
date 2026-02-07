---
title: Linear Regression
description: Master least squares regression to model linear relationships, interpret slope and intercept, make predictions, analyze residuals, and identify influential points.
generated_by: claude skill chapter-content-generator
date: 2026-02-06 22:04:21
version: 0.04
---

# Linear Regression

## Summary

This chapter covers least squares regression, the most important technique for modeling linear relationships between variables. Students will learn to interpret slope and y-intercept, make predictions, calculate and analyze residuals, understand the coefficient of determination (R²), and identify influential points and outliers in regression.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

90. Least Squares Regression
91. Regression Line
92. Regression Equation
93. Slope Interpretation
94. Y-Intercept Interpretation
95. Making Predictions
96. Extrapolation Dangers
97. Residual
98. Calculating Residuals
99. Residual Plot
100. Interpreting Residuals
101. Coefficient of Determination
102. R-Squared Interpretation
103. Influential Point
104. Leverage
105. Outliers in Regression

## Prerequisites

This chapter builds on concepts from:

- [Chapter 6: Scatterplots and Association](../06-scatterplots-and-association/index.md)

---

## Introduction: From Patterns to Predictions

Welcome back! In Chapter 6, you learned to spot linear relationships in scatterplots and measure their strength with correlation. But here's the thing—knowing that height and shoe size are correlated is interesting, but wouldn't it be more useful to actually *predict* someone's shoe size from their height? That's exactly where regression comes in.

Regression is one of the most powerful tools in statistics. It lets you draw a line through your data and use that line to make predictions about new observations. Doctors use it to predict health outcomes, economists use it to forecast trends, and yes, Sylvia uses it to estimate acorn yields from tree measurements.

> 🐿️ *"Let's crack this nut! Regression is where statistics gets really practical—we're not just describing data anymore, we're predicting the future!"*

## The Least Squares Regression Line

When you have a scatterplot showing a linear relationship, you want to draw a line that best captures the pattern. But what makes one line "better" than another? The answer involves minimizing errors—specifically, we want to minimize how far our data points fall from the line.

### What Is Least Squares Regression?

**Least squares regression** is a method for finding the line that minimizes the sum of the squared vertical distances from each data point to the line. These vertical distances are called residuals (more on those soon), and by squaring them before adding, we accomplish two things:

1. Negative and positive distances don't cancel out
2. Large errors are penalized more heavily than small ones

The result is called the **regression line** or **least squares regression line (LSRL)**—the single best-fitting straight line for your data.

| Term | Definition |
|------|------------|
| Least Squares Regression | Method that minimizes the sum of squared residuals |
| Regression Line | The best-fit line through a scatterplot |
| Predicted Value | The y-value on the regression line for a given x |

### The Regression Equation

The **regression equation** describes the relationship between your explanatory variable \( x \) and your response variable \( y \). It takes this familiar form:

\[
\hat{y} = a + bx
\]

Here's what each piece means:

- \( \hat{y} \) (read "y-hat") is the **predicted value** of y
- \( a \) is the **y-intercept**—the predicted y-value when \( x = 0 \)
- \( b \) is the **slope**—how much \( \hat{y} \) changes for each one-unit increase in \( x \)
- \( x \) is the value of the explanatory variable

Notice that little hat symbol over the y. It's crucial! Regular \( y \) represents actual observed values, while \( \hat{y} \) represents predicted values from your regression line. Keeping these straight will save you many headaches on the AP exam.

#### MicroSim: Least Squares Regression Explorer

<iframe src="../../sims/least-squares-explorer/main.html" width="100%" height="452px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Interactive Least Squares Visualization</summary>
Type: MicroSim

Learning objective: Understand (Bloom Level 2) how the least squares method finds the best-fit line by minimizing squared residuals

Visual elements:
- Coordinate plane with grid (400x400 pixels)
- 8-12 draggable data points displayed as circles
- Regression line that updates dynamically as points move
- Vertical lines from each point to regression line (residuals) in light red
- Squares drawn at each residual to visualize "squared" distances
- Display of sum of squared residuals, updating in real-time

Interactive controls:
- Draggable data points (click and drag to reposition)
- "Reset Points" button to restore default configuration
- "Random Points" button to generate new dataset
- Toggle to show/hide residual squares

Behavior:
- As user drags points, regression line recalculates instantly
- Sum of squared residuals updates in real-time
- Residual squares resize dynamically to show their contribution
- Line always passes through the point \( (\bar{x}, \bar{y}) \)

Canvas size: 500x450, responsive design
Implementation: p5.js with canvas-based controls
</details>

### Calculating Slope and Intercept

While you'll typically use technology to find regression equations, understanding the formulas helps you grasp what's happening:

The slope \( b \) is calculated as:

\[
b = r \cdot \frac{s_y}{s_x}
\]

Where:
- \( r \) is the correlation coefficient
- \( s_y \) is the standard deviation of y
- \( s_x \) is the standard deviation of x

The y-intercept \( a \) is:

\[
a = \bar{y} - b\bar{x}
\]

These formulas reveal something beautiful: the regression line always passes through the point \( (\bar{x}, \bar{y}) \). It's like the line is anchored at the center of your data.

## Interpreting Slope and Y-Intercept

Finding the regression equation is just the beginning. The real skill lies in interpreting what the slope and y-intercept tell us about the relationship between variables.

### Slope Interpretation

The **slope** tells you the rate of change—specifically, how much the predicted y-value changes for each one-unit increase in x. Here's the template for interpretation:

> "For each additional [one unit of x], the predicted [y variable] increases/decreases by [slope value] [units of y]."

**Example:** Suppose you're studying the relationship between hours of study and exam score, and you find \( \hat{y} = 45 + 5.2x \).

Interpretation: "For each additional hour of studying, the predicted exam score increases by 5.2 points."

Notice we say "predicted" because regression gives us estimates, not guarantees. We also say "increases by" because the slope (5.2) is positive. If the slope were negative, we'd say "decreases by."

> 🐿️ *"Acorn for your thoughts? When I measured tree circumference (x) and acorn yield (y), my slope was 12.3. That means for every additional inch of circumference, I predicted 12.3 more acorns. Now THAT'S data worth collecting!"*

### Y-Intercept Interpretation

The **y-intercept** is the predicted value of y when x equals zero. Here's the interpretation template:

> "When [x variable] is zero, the predicted [y variable] is [intercept value] [units of y]."

**Example:** Using the same equation \( \hat{y} = 45 + 5.2x \):

Interpretation: "When study time is zero hours, the predicted exam score is 45 points."

**Important caveat:** The y-intercept often doesn't make practical sense! In our example, students who study zero hours still have some baseline knowledge, so a score of 45 might be reasonable. But if you're predicting weight from height and get a negative y-intercept, that's meaningless—people can't have negative weight.

| Situation | Y-Intercept Interpretation |
|-----------|---------------------------|
| x = 0 is within data range | Interpret literally |
| x = 0 is outside data range | Often has no practical meaning |
| x = 0 is impossible | State that interpretation isn't meaningful |

Always ask yourself: "Does x = 0 make sense in this context?" If not, acknowledge that the y-intercept is just the mathematical starting point of your line, not a meaningful prediction.

#### MicroSim: Slope and Intercept Explorer

<iframe src="../../sims/slope-intercept-explorer/main.html" width="100%" height="452px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Interactive Slope and Intercept Manipulation</summary>
Type: MicroSim

Learning objective: Analyze (Bloom Level 4) how changes to slope and y-intercept affect the regression line and predictions

Visual elements:
- Coordinate plane with labeled axes (400x400 pixels)
- Regression line displayed prominently
- 5-7 static data points for reference context
- Current equation displayed in form \( \hat{y} = a + bx \)
- Predicted value marker that follows mouse x-position on line
- Annotations showing rise/run for slope visualization

Interactive controls:
- Slider for slope (range -3 to 3, step 0.1)
- Slider for y-intercept (range -50 to 150, step 1)
- "Show Best Fit" toggle to display actual LSRL
- Text display showing current prediction at mouse position

Behavior:
- Line updates instantly as sliders change
- Prediction point moves along line following mouse x-coordinate
- When "Show Best Fit" is on, displays comparison between user line and LSRL
- Displays sum of squared residuals for current line position

Canvas size: 550x450, responsive design
Implementation: p5.js with canvas-based controls
</details>

## Making Predictions

One of the primary uses of regression is making predictions. Once you have a regression equation, you can plug in any x-value to predict the corresponding y-value.

### The Prediction Process

**Making predictions** involves substituting values into your regression equation:

1. Identify the x-value you want to use for prediction
2. Substitute it into the equation \( \hat{y} = a + bx \)
3. Calculate to find \( \hat{y} \)

**Example:** Using \( \hat{y} = 45 + 5.2x \), predict the exam score for a student who studies 6 hours.

\[
\hat{y} = 45 + 5.2(6) = 45 + 31.2 = 76.2
\]

The predicted exam score is 76.2 points.

### The Dangers of Extrapolation

Here's where things get tricky. **Extrapolation** means making predictions outside the range of your original data—and it's dangerous business.

Why? Because you have no evidence that the linear pattern continues beyond your data. The relationship might curve, level off, or change direction entirely. Your regression line is only trustworthy within the range of x-values you actually observed.

**Example of extrapolation danger:** Suppose your study time data ranged from 1 to 8 hours. Predicting for 6 hours? Perfectly fine—that's interpolation (within your data range). Predicting for 20 hours? That's extrapolation, and your equation might give you a predicted score of 149 points—which is impossible on a 100-point exam!

> 🐿️ *"Trust me, I learned this the hard way. My regression predicted that a 50-inch circumference tree would yield 600 acorns. The largest tree I'd measured was 20 inches. Turns out, massive trees have other issues—squirrel traffic jams, for instance—and my prediction was way off!"*

| Term | Definition | Risk Level |
|------|------------|------------|
| Interpolation | Predicting within the x-range of data | Low risk |
| Extrapolation | Predicting outside the x-range of data | High risk |
| Near extrapolation | Predicting just outside the range | Moderate risk |

## Understanding Residuals

Now let's dive into one of the most important concepts in regression analysis: residuals. Understanding residuals is key to evaluating whether your regression line is doing a good job.

### What Is a Residual?

A **residual** is the difference between an actual observed value and the predicted value from your regression line:

\[
\text{Residual} = y - \hat{y} = \text{Observed} - \text{Predicted}
\]

Think of residuals as prediction errors. They tell you how far off your prediction was for each data point.

- **Positive residual:** The actual value is *above* the regression line (you underestimated)
- **Negative residual:** The actual value is *below* the regression line (you overestimated)
- **Residual of zero:** The point falls exactly on the line (perfect prediction!)

### Calculating Residuals

**Calculating residuals** is straightforward:

1. Use the regression equation to find \( \hat{y} \) for each x-value
2. Subtract the predicted value from the actual observed value

**Example:** Given the equation \( \hat{y} = 45 + 5.2x \), calculate the residual for a student who studied 4 hours and scored 68.

Step 1: Find the predicted value

\[
\hat{y} = 45 + 5.2(4) = 45 + 20.8 = 65.8
\]

Step 2: Calculate the residual

\[
\text{Residual} = 68 - 65.8 = 2.2
\]

The residual is 2.2, meaning this student scored 2.2 points higher than predicted. The actual point is above the regression line.

Here's a sample calculation table:

| Student | Hours (x) | Actual Score (y) | Predicted \( \hat{y} \) | Residual |
|---------|-----------|------------------|------------------------|----------|
| A | 2 | 54 | 55.4 | -1.4 |
| B | 4 | 68 | 65.8 | 2.2 |
| C | 6 | 75 | 76.2 | -1.2 |
| D | 7 | 85 | 81.4 | 3.6 |

> 🐿️ *"Here's a fun fact: if you add up all your residuals, they'll equal zero (or really close to zero due to rounding). The least squares line is balanced—the overestimates and underestimates cancel out!"*

#### MicroSim: Residual Calculator

<iframe src="../../sims/residual-calculator/main.html" width="100%" height="502px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Interactive Residual Visualization Tool</summary>
Type: MicroSim

Learning objective: Apply (Bloom Level 3) residual calculations by computing and visualizing residuals for individual data points

Visual elements:
- Scatterplot with 8-10 data points (400x400 pixels)
- Regression line fitted to data
- Vertical lines from each point to line showing residuals
- Color-coded residuals (green for positive, red for negative)
- Selected point highlighted with larger circle
- Calculation display showing y, ŷ, and residual for selected point

Interactive controls:
- Click on any data point to select it
- Display panel showing detailed calculation for selected point
- "Show All Residuals" toggle
- "Add New Point" button allowing user to click to add point

Behavior:
- Clicking a point shows detailed residual calculation
- Residual lines animate when point is selected
- Adding a new point recalculates regression and all residuals
- Running sum of residuals displayed (showing it equals zero)

Canvas size: 550x500, responsive design
Implementation: p5.js with canvas-based controls
</details>

## Residual Plots: Your Diagnostic Tool

Calculating individual residuals is useful, but the real power comes from looking at all residuals together in a **residual plot**.

### Creating Residual Plots

A **residual plot** displays residuals on the vertical axis versus either:
- The x-values (explanatory variable), or
- The predicted values \( \hat{y} \)

Both approaches work, but plotting against x-values is most common.

### Interpreting Residual Plots

**Interpreting residuals** through a residual plot tells you whether your linear model is appropriate. Here's what to look for:

**Good residual plot (linear model is appropriate):**
- Points scattered randomly above and below the horizontal line at zero
- No obvious patterns, curves, or clusters
- Relatively consistent spread across all x-values

**Problematic residual plot (linear model may be inappropriate):**
- Curved pattern suggests a nonlinear relationship
- Funnel shape (residuals fanning out) indicates changing variability
- Clusters or groups suggest subpopulations in your data

| Pattern in Residual Plot | What It Suggests |
|-------------------------|------------------|
| Random scatter | Linear model is appropriate |
| Curved pattern | Relationship is nonlinear |
| Funnel shape | Variability changes with x |
| Distinct clusters | Possible subgroups in data |

> 🐿️ *"My tail's tingling—we're onto something important here! A good residual plot should look like static on an old TV—just random noise. If you see a pattern, that pattern is telling you something your line missed!"*

#### MicroSim: Residual Plot Analyzer

<iframe src="../../sims/residual-plot-analyzer/main.html" width="100%" height="402px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Interactive Residual Plot Diagnostic Tool</summary>
Type: MicroSim

Learning objective: Evaluate (Bloom Level 5) whether a linear model is appropriate by analyzing residual plot patterns

Visual elements:
- Side-by-side display: scatterplot with line (left) and residual plot (right)
- Horizontal reference line at y = 0 on residual plot
- Points connected between both plots (highlighting correspondence)
- Pattern indicator showing diagnosis (good fit, curved, fan-shaped, etc.)
- Zoom capability on residual plot

Interactive controls:
- Dataset selector dropdown (linear data, quadratic data, heteroscedastic data)
- "Generate New Data" button for random variations
- Toggle to show/hide connecting lines between plots
- Pattern identification quiz mode

Behavior:
- Selecting different datasets shows corresponding residual patterns
- Hovering over point in one plot highlights it in both
- Quiz mode asks user to identify the pattern before revealing answer
- Animated transition when switching datasets

Canvas size: 650x400, responsive design
Implementation: p5.js with canvas-based controls
</details>

## The Coefficient of Determination (R²)

You've already learned about correlation \( r \), which measures the strength and direction of a linear relationship. Now meet its close relative: \( R^2 \), the **coefficient of determination**.

### What Is R-Squared?

The **coefficient of determination**, written as \( R^2 \), tells you how much of the variability in y is explained by the linear relationship with x. It's simply the correlation coefficient squared:

\[
R^2 = r^2
\]

For example, if \( r = 0.8 \), then \( R^2 = 0.64 \), meaning 64% of the variability in y is explained by the linear relationship with x.

### Interpreting R-Squared

Here's the template for **R-squared interpretation**:

> "R² = [value] means that [percentage]% of the variability in [y variable] can be explained by the linear relationship with [x variable]."

**Example:** In our study time and exam score data, suppose \( r = 0.85 \). Then \( R^2 = 0.72 \).

Interpretation: "72% of the variability in exam scores can be explained by the linear relationship with study time."

The remaining 28%? That's variability from other factors—natural ability, test anxiety, sleep quality, whether you had a good breakfast... all things not captured by study time alone.

| R² Value | Strength | Interpretation |
|----------|----------|----------------|
| 0.90 - 1.00 | Very strong | x explains 90%+ of y's variability |
| 0.70 - 0.89 | Strong | x explains most of y's variability |
| 0.50 - 0.69 | Moderate | x explains a substantial portion |
| 0.25 - 0.49 | Weak | x explains some variability |
| 0.00 - 0.24 | Very weak | x explains little variability |

**Important notes about R²:**

1. R² is always between 0 and 1 (or 0% and 100%)
2. R² doesn't tell you direction—you lose the sign when you square r
3. A high R² doesn't mean the relationship is linear (always check residual plots!)
4. R² doesn't prove causation

> 🐿️ *"Time to squirrel away this knowledge: R² is like a grade for your regression line. An R² of 0.80 is like getting a B—your line explains most of what's happening, but there's still room for improvement!"*

## Influential Points and Outliers

Not all data points are created equal. Some points have an outsized impact on your regression line, and it's crucial to identify them.

### Influential Points

An **influential point** is a data point that substantially changes the regression line when it's removed from the dataset. Influential points can:

- Change the slope dramatically
- Shift the y-intercept
- Alter the correlation and R²

How do you know if a point is influential? Remove it, recalculate the regression, and see if the equation changes substantially. If it does, that point is influential.

### Leverage

**Leverage** refers to how extreme a point's x-value is compared to the other x-values in your dataset. Points with high leverage are far from \( \bar{x} \) in the horizontal direction.

Here's the key insight: points with high leverage *have the potential* to be influential, but they aren't automatically influential. It depends on whether they follow the pattern of the other data or deviate from it.

| Scenario | High Leverage? | Influential? |
|----------|---------------|--------------|
| Point far from \( \bar{x} \), follows pattern | Yes | Usually no |
| Point far from \( \bar{x} \), off pattern | Yes | Yes |
| Point near \( \bar{x} \), far from line | No | Usually no |

Think of leverage like a seesaw. A person at the end of the seesaw (high leverage) can tip the balance easily, but only if they're on the wrong side of where they "should" be.

### Outliers in Regression

An **outlier in regression** is a point with an unusually large residual—it falls far from the regression line vertically. Outliers can be:

- **Near the center (low leverage):** These rarely affect the regression much because they're balanced by points on both sides
- **At the extremes (high leverage):** These can be highly influential because there's less data to counterbalance them

When you find an outlier, investigate it:

1. Is it a data entry error? (Fix it)
2. Is it from a different population? (Consider removing it or analyzing separately)
3. Is it a genuine but unusual observation? (Report results with and without it)

> 🐿️ *"One year, I recorded a tree that yielded 847 acorns—way more than any other. Turned out it was actually TWO trees whose branches had grown together! That's an outlier worth investigating. Never just delete outliers without understanding why they're unusual."*

#### MicroSim: Influential Points Explorer

<iframe src="../../sims/influential-points-explorer/main.html" width="100%" height="502px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Interactive Influential Point Investigation Tool</summary>
Type: MicroSim

Learning objective: Evaluate (Bloom Level 5) how individual points affect regression by manipulating high-leverage and outlier points

Visual elements:
- Scatterplot with 10-12 data points and regression line (450x400 pixels)
- One special point highlighted in different color (the "test" point)
- Secondary regression line (dashed) showing fit without the special point
- Display of both equations and R² values (with and without point)
- Leverage indicator bar showing x-distance from mean

Interactive controls:
- Draggable "test" point that can be moved anywhere
- Toggle to show/hide comparison regression line
- "Reset to Original" button
- Slider to adjust number of background points
- Display showing: current residual, leverage score, influence measure

Behavior:
- As test point moves, both regression lines update
- Color coding indicates influence level (green = low, yellow = moderate, red = high)
- Moving point far horizontally increases leverage indicator
- Moving point vertically away from pattern increases residual
- Comparison statistics update in real-time

Canvas size: 600x500, responsive design
Implementation: p5.js with canvas-based controls
</details>

## Putting It All Together: Complete Regression Analysis

Now that you've learned all the components, let's walk through a complete regression analysis from start to finish.

### The Regression Analysis Workflow

1. **Examine the scatterplot** - Verify the relationship appears linear
2. **Calculate the regression equation** - Find slope and y-intercept
3. **Interpret the slope** - In context of the problem
4. **Interpret the y-intercept** - If meaningful
5. **Check R²** - How much variability is explained?
6. **Create and analyze the residual plot** - Is the linear model appropriate?
7. **Look for influential points and outliers** - Any concerns?
8. **Make predictions** - For x-values within the data range

**Example: Complete Analysis**

A researcher collected data on the relationship between daily temperature (°F) and ice cream sales ($) at a beach stand over 20 summer days. Temperature ranged from 72°F to 94°F.

Results:
- Regression equation: \( \hat{y} = -152.3 + 4.7x \)
- \( r = 0.92 \), so \( R^2 = 0.85 \)

**Interpretation of slope:** For each additional degree Fahrenheit, predicted ice cream sales increase by $4.70.

**Interpretation of y-intercept:** The y-intercept of -$152.30 represents predicted sales when temperature is 0°F. This is extrapolation far outside our data range (and also, no one's buying ice cream when it's 0°F), so this value has no practical meaning.

**R² interpretation:** 85% of the variability in ice cream sales can be explained by the linear relationship with temperature.

**Prediction:** What are predicted sales when the temperature is 85°F?

\[
\hat{y} = -152.3 + 4.7(85) = -152.3 + 399.5 = 247.2
\]

Predicted sales are $247.20.

#### MicroSim: Complete Regression Analysis Tool

<iframe src="../../sims/regression-analysis-tool/main.html" width="100%" height="652px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Full Regression Analysis Dashboard</summary>
Type: MicroSim

Learning objective: Create (Bloom Level 6) a complete regression analysis by integrating all concepts: equation, interpretation, residuals, and predictions

Visual elements:
- Main scatterplot with data and regression line (400x350 pixels)
- Residual plot below scatterplot (400x200 pixels)
- Statistics panel showing: equation, r, R², mean x, mean y, slope, intercept
- Prediction calculator panel
- Interpretation template fills with current values

Interactive controls:
- Dataset selector (5+ pre-loaded real-world datasets)
- Prediction input field with calculate button
- "Show Residual Plot" toggle
- "Highlight Influential Points" toggle
- "Export Analysis" button (generates text summary)

Behavior:
- Selecting dataset updates all visualizations and statistics
- Entering prediction value shows point on line and calculation
- Influential points automatically identified and flagged
- Warnings display for extrapolation attempts
- Text interpretations auto-generate with correct context and values

Canvas size: 500x650, responsive design
Implementation: p5.js with canvas-based controls
</details>

## Common Mistakes and Misconceptions

Before we wrap up, let's address some common pitfalls:

**Mistake 1: Confusing r and R²**
Remember: r ranges from -1 to 1 and includes direction; R² ranges from 0 to 1 and doesn't indicate direction. If r = -0.7, then R² = 0.49.

**Mistake 2: Forgetting the hat on ŷ**
The hat matters! When writing predictions, always write \( \hat{y} \), not y. This distinguishes predicted values from actual observed values.

**Mistake 3: Interpreting slope without context**
Always interpret slope in the units of your variables. "The slope is 4.7" means nothing. "For each additional degree, predicted sales increase by $4.70" tells the whole story.

**Mistake 4: Ignoring extrapolation**
Just because you can plug numbers into an equation doesn't mean you should. Always note the range of your original data.

**Mistake 5: High R² means good predictions**
A high R² means your line fits the data well, but it doesn't guarantee accurate predictions for new data, especially if conditions change.

**Mistake 6: Assuming causation**
Even a perfect R² of 1.0 doesn't prove that x causes y. Correlation and regression describe relationships—they don't establish causation.

> 🐿️ *"Every statistician drops an acorn sometimes. The key is learning to catch yourself before making these mistakes on the AP exam. Read each question carefully and think about what's really being asked!"*

---

## Key Takeaways

Time to squirrel away the big ideas from this chapter:

1. **Least squares regression** finds the line that minimizes the sum of squared residuals, creating the best-fit line for your data.

2. **The regression equation** \( \hat{y} = a + bx \) allows you to predict y-values from x-values, where \( a \) is the y-intercept and \( b \) is the slope.

3. **Slope interpretation** describes how much the predicted y changes for each one-unit increase in x—always include units and context.

4. **Y-intercept interpretation** gives the predicted y when x = 0, but this often has no practical meaning if 0 is outside your data range.

5. **Residuals** measure prediction errors: Residual = Observed - Predicted. Positive means underestimation; negative means overestimation.

6. **Residual plots** help diagnose model fit. Random scatter = good; patterns = the linear model may not be appropriate.

7. **R² (coefficient of determination)** tells you what percentage of y's variability is explained by the linear relationship with x.

8. **Extrapolation** is dangerous—only make predictions within the range of your original x-values.

9. **Influential points** substantially change the regression line when removed. They often have high leverage (extreme x-values).

10. **Outliers in regression** have unusually large residuals. Investigate them before deciding how to handle them.

---

## Practice Problems

Test your understanding with these problems. Try them on your own before checking your work!

### Problem 1: Basic Calculations
A researcher finds the regression equation \( \hat{y} = 23.4 + 1.8x \) for predicting test score (y) from hours of sleep (x).

a) Predict the test score for someone who slept 7 hours.
b) Calculate the residual if someone who slept 7 hours actually scored 38.

### Problem 2: Interpretation
The regression equation for predicting weight (in pounds) from height (in inches) is \( \hat{y} = -150 + 4.5x \), with \( r = 0.78 \).

a) Interpret the slope in context.
b) Interpret the y-intercept. Does it make sense?
c) Calculate and interpret R².

### Problem 3: Extrapolation
Using data from cars manufactured between 2010-2020, a regression equation predicts fuel efficiency (mpg) from engine size (liters): \( \hat{y} = 42.3 - 5.1x \). Engine sizes in the dataset ranged from 1.5 to 4.0 liters.

a) Predict fuel efficiency for a 2.5 liter engine.
b) Would it be appropriate to predict for a 6.0 liter engine? Explain.
c) The model predicts 42.3 mpg for a 0 liter engine. Why is this problematic?

### Problem 4: Residual Analysis
Given the data below and regression equation \( \hat{y} = 10 + 3x \):

| x | y |
|---|---|
| 2 | 17 |
| 4 | 23 |
| 6 | 27 |
| 8 | 35 |

a) Calculate the residual for each point.
b) What is the sum of the residuals?
c) Which point has the largest residual?

### Problem 5: Influential Points
A dataset of 50 students shows the relationship between GPA and SAT scores. One student has a GPA of 1.2 (the lowest) but an SAT score of 1580 (near the highest).

a) Does this point have high leverage? Explain.
b) Is this point likely to be influential? Why or why not?
c) What would you recommend doing about this data point?

### Problem 6: Complete Analysis
For a dataset examining the relationship between advertising spending (thousands of dollars) and product sales (thousands of units):
- Equation: \( \hat{y} = 2.5 + 0.15x \)
- r = 0.73
- Advertising ranged from $10,000 to $100,000
- Residual plot shows random scatter

a) Interpret the slope.
b) Interpret R² (you'll need to calculate it first).
c) Predict sales for $50,000 in advertising spending.
d) Is the linear model appropriate? How do you know?
e) Would it be reasonable to predict sales for $150,000 in advertising? Explain.

---

*Great work completing this chapter! Linear regression is one of the most widely used statistical techniques, and you've just built a strong foundation. In the next chapter, we'll explore how to apply these concepts in more complex settings and examine the conditions required for regression inference.*
