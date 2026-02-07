---
title: Slope-Intercept Explorer
description: An interactive MicroSim for exploring how changes to slope and y-intercept affect the regression line and predictions, with real-time visualization of the sum of squared residuals.
quality_score: 92
image: /sims/slope-intercept-explorer/slope-intercept-explorer.png
og:image: /sims/slope-intercept-explorer/slope-intercept-explorer.png
twitter:image: /sims/slope-intercept-explorer/slope-intercept-explorer.png
social:
   cards: false
---
# Slope-Intercept Explorer

<iframe src="main.html" height="452px" scrolling="no"></iframe>

[Run the Slope-Intercept Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Slope-Intercept Explorer MicroSim with the p5.js editor](https://editor.p5js.org/)

## Iframe Embed Code

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/slope-intercept-explorer/main.html" height="452px" scrolling="no"></iframe>
```

## Description

This interactive MicroSim helps students understand how the slope and y-intercept parameters control a regression line's position and predictions. By adjusting sliders and watching the line respond in real-time, students develop intuition for the relationship between the equation and the visual representation.

**Key features:**

- **Coordinate Plane**: A 400x400 pixel scatterplot with labeled axes showing study hours vs. exam scores
- **Interactive Sliders**: Adjust slope (-3 to 3, step 0.1) and y-intercept (-50 to 150, step 1) in real-time
- **7 Reference Data Points**: Static points provide context for fitting the line
- **Live Equation Display**: Shows the current equation in form y = a + bx
- **Prediction Tracker**: Mouse position on the plot shows predicted y-value for any x
- **Rise/Run Annotation**: Visual representation of slope as rise over run
- **Best Fit Toggle**: Compare your line to the actual Least Squares Regression Line (LSRL)
- **Sum of Squared Residuals**: Real-time SSR calculation shows how well your line fits the data

## How It Works

The MicroSim displays a scatterplot with seven data points representing the relationship between study hours and exam scores. Students manipulate two parameters:

1. **Slope (b)**: Controls how steeply the line rises or falls. A slope of 5 means for each additional study hour, the predicted score increases by 5 points.

2. **Y-intercept (a)**: Controls where the line crosses the y-axis (at x=0). This represents the predicted score for someone who studied zero hours.

As you adjust these parameters, the Sum of Squared Residuals (SSR) updates to show the total squared distance between your line and the actual data points. Lower SSR values indicate a better fit.

## Lesson Plan

### Learning Objective

Students will analyze how changes to slope and y-intercept affect the regression line and predictions, demonstrating their understanding by minimizing the sum of squared residuals.

**Bloom's Taxonomy Level**: Analyze (L4)

**Bloom's Verb**: Analyze

### Prerequisites

- Understanding of coordinate planes and plotting points
- Familiarity with slope as "rise over run"
- Basic understanding of the regression equation form y = a + bx
- Conceptual understanding of residuals (predicted - actual)

### Suggested Duration

20-25 minutes for guided exploration

### Classroom Activities

#### Activity 1: Explore Slope (6 minutes)

1. Set the y-intercept to 40 and keep it fixed
2. Move the slope slider from -3 to +3, observing the line
3. Ask: "What happens to predictions when slope is negative?"
4. Notice how the rise/run triangle changes with slope
5. Challenge: Find a slope that makes the line pass through most data points

#### Activity 2: Explore Y-Intercept (5 minutes)

1. Set the slope to 5.0 and keep it fixed
2. Move the intercept slider from -50 to 150
3. Ask: "Does changing the intercept affect how steep the line is?"
4. Observe: The line shifts up/down but maintains the same angle
5. Discuss: What does a negative y-intercept mean in this context?

#### Activity 3: Find the Best Fit (7 minutes)

1. Reset both sliders to their starting values
2. Challenge students to minimize the SSR using only the sliders
3. Record their best SSR value
4. Click "Show Best Fit" to reveal the actual LSRL
5. Compare: How close did your parameters come to the best fit?
6. Discuss: Why is minimizing squared residuals the goal?

#### Activity 4: Prediction Practice (5 minutes)

1. Set slope = 6 and intercept = 35
2. Without looking at the MicroSim, predict the score for 5 study hours
3. Move mouse to x = 5 on the plot to verify
4. Repeat for different x-values
5. Challenge: What score would you predict for 0 hours? 12 hours?

### Discussion Questions

1. Why does changing the slope affect predictions more at high x-values than low x-values?
2. What real-world meaning does a slope of 6 have in this study hours example?
3. If two lines have the same SSR, are they equally good fits? Why or why not?
4. Why do we square the residuals instead of just adding them?
5. What would happen if we had a data point very far from the others (an outlier)?

### Assessment Opportunities

- Have students write the equation for a line with slope 4.5 and intercept 38
- Given an equation, ask students to predict the y-value for a specific x
- Present two different lines and ask which has lower SSR (without calculating)
- Ask students to sketch a scatterplot where the best-fit line would have negative slope

### Common Misconceptions to Address

- **"Higher slope is always better"**: The best slope depends on the data pattern
- **"The line should pass through all points"**: Regression finds the best overall fit, not necessarily through any specific point
- **"Y-intercept is where the line starts"**: Clarify it's where x=0, which may be outside our data range
- **"Lower SSR always means better predictions"**: Discuss overfitting and the importance of the data itself

### Connection to Chapter Content

This MicroSim directly supports Chapter 7: Least Squares Regression. Students can use it to:

- Visualize the relationship between the regression equation and the line
- Develop intuition for how slope affects predictions
- Understand why minimizing squared residuals produces the "best" line
- Compare their intuitive line placement to the mathematically optimal LSRL
- See how residuals contribute to the sum of squared errors

## References

- [AP Statistics Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-statistics/course) - Unit 2: Exploring Two-Variable Data
- [Guidelines for Assessment and Instruction in Statistics Education (GAISE)](https://www.amstat.org/education/guidelines-for-assessment-and-instruction-in-statistics-education-(gaise)-reports)
- Moore, D. S., McCabe, G. P., & Craig, B. A. (2021). Introduction to the Practice of Statistics (10th ed.). W.H. Freeman.

## Technical Notes

- Built with p5.js 1.11.10
- Uses canvas-based controls for iframe compatibility
- Width-responsive design adapts to container size
- Drawing height: 350px, Control height: 100px, Total iframe height: 452px

---

**Reminder**: Create a screenshot named `slope-intercept-explorer.png` for social media previews.
