---
title: Chi-Square Distribution Shapes
description: Interactive visualization comparing chi-square distribution shapes across different degrees of freedom.
quality_score: 90
---
# Chi-Square Distribution Shapes

<iframe src="main.html" height="460px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Explore how the chi-square distribution's shape changes with different **degrees of freedom (df)**. This visualization helps you understand why larger chi-square values become more extreme as df changes.

### How to Use

- Adjust the **Degrees of Freedom slider** to see how the distribution shape changes
- Click **Multiple DFs** to compare several distributions (df = 2, 5, 10, 15, 20) side-by-side
- Toggle **Critical: ON/OFF** to show or hide the right-tail critical region
- Select different **significance levels** (0.01, 0.05, 0.10) to see how critical values change

### Key Insights

- Chi-square distributions are always **right-skewed** (no negative values possible)
- As df increases, the distribution becomes **more symmetric** and shifts right
- The **mean equals the degrees of freedom** (df)
- The **variance equals 2 times the degrees of freedom** (2df)
- Critical values increase as df increases (for the same alpha level)

## Lesson Plan

### Learning Objective

Students will compare how the chi-square distribution's shape changes with different degrees of freedom, helping them understand why larger chi-square values are more extreme (Bloom's Taxonomy: Understanding).

### Warmup Activity (3 minutes)

Have students predict: "If we increase the degrees of freedom from 5 to 20, will the distribution become more or less symmetric?" Then use the simulation to verify.

### Main Activity (10 minutes)

1. Start with **Single DF** mode and df = 2. Note the extreme right skew.
2. Slowly increase df using the slider, observing changes at df = 5, 10, 15, 20.
3. Switch to **Multiple DFs** mode to see all curves simultaneously.
4. Enable **Critical** shading and observe how critical values change.

### Discussion Questions

- Why does the chi-square distribution only have positive values?
- Why does the distribution become more symmetric as df increases?
- How does understanding the shape help interpret chi-square test results?

### Connection to Chi-Square Tests

- **Goodness-of-fit tests**: df = (number of categories) - 1
- **Independence/Homogeneity tests**: df = (rows - 1)(columns - 1)
- Larger chi-square statistics indicate greater departure from expected values
