---
title: Confounding Variable Visualizer
description: Interactive causal diagram and simulated scatterplot showing how a confounding variable creates an apparent relationship between X and Y, and what remains when the confounder is held constant.
image: /sims/confounding-variable-diagram/confounding-variable-diagram.png
og:image: /sims/confounding-variable-diagram/confounding-variable-diagram.png
twitter:image: /sims/confounding-variable-diagram/confounding-variable-diagram.png
social:
   cards: false
quality_score: 98
---

# Confounding Variable Visualizer

<iframe src="main.html" height="532px" width="100%" scrolling="no"></iframe>

[Run the Confounding Variable Visualizer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A confounding variable is associated with both the explanatory variable and the response variable, so its effect gets tangled up with the relationship you are studying. This MicroSim pairs a causal diagram (X, Y, and a hidden confounder C) with a scatterplot of simulated data.

At first you see only X and Y moving together. Reveal the confounder and the points are colored by the level of C. Then hold C constant and watch the points slide to their adjusted positions: the slope that is left is the direct effect of X on Y. The numbers on screen are computed from the simulated sample, so the adjusted slope is close to, but not exactly, the direct effect you set.

The scenario strengths are illustrative settings for a simulation. They are not estimates from real studies.

## How to Use

1. Choose a scenario from the dropdown, such as **Coffee & Heart Disease**.
2. Look at the scatterplot and the observed slope and correlation. Would you conclude that X causes Y?
3. Click **Reveal Confounder**. Node C appears with red arrows to both X and Y, and the dots are colored by the level of C.
4. Click **Hold C Constant**. The dots move to their positions with C's influence removed, and the regression line shows the relationship that remains.
5. Drag the three sliders to change the direct effect of X on Y and the strength of C's link to X and to Y. Try setting one of the C strengths to 0.
6. Click **New Data** for a fresh simulated sample or **Reset** to restore the scenario defaults.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/confounding-variable-diagram/main.html"
        height="532px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Analyze how a variable associated with both X and Y creates an alternative explanation for an observed association (Analyze)
2. Compare the observed relationship with the relationship that remains after the confounder is held constant (Analyze)
3. Explain why a confounder must be associated with both the explanatory and the response variable (Understand)

### Bloom's Taxonomy Level

**Analyze** - students analyze.

### Grade Level

9-12 (AP Statistics)

### Duration

15-25 minutes

### Prerequisites

- Scatterplots, correlation, and least-squares slope (Chapters 6 and 7)
- Lurking variables

### Activities

1. **Predict (5 min):** With the confounder hidden, students write down whether they think coffee causes heart disease and how confident they are.
2. **Reveal and Adjust (10 min):** Students reveal the confounder, hold it constant, and record the observed and adjusted slopes for three scenarios.
3. **Explore (10 min):** Students set C to X strength to 0, then C to Y strength to 0, and explain why the confounding disappears in each case. Then they add a direct effect of 0.3 and describe how the two sources of association combine.

### Discussion Questions

- Why does the confounding vanish when either C arrow has strength 0?
- With the direct effect at 0, the adjusted slope is small but not exactly 0. Why?
- In the Breakfast & Test Scores scenario, part of the relationship is real. How would a headline writer overstate it?

### Assessment

- Student states both requirements for a confounder and demonstrates each with the sliders
- Student correctly predicts the direction of change in slope before clicking Hold C Constant
- Student explains the difference between the observed slope and the direct effect in context

### Common Misconceptions

- Any lurking variable is automatically a confounder, even if it is unrelated to X
- Finding a confounder means X has no effect on Y at all
- A larger sample removes confounding

## References

1. [Chapter 8: Causation and Study Design](../../chapters/08-causation-and-study-design/index.md) - sections on lurking and confounding variables
2. [Confounding](https://en.wikipedia.org/wiki/Confounding) - Wikipedia article with causal diagrams of confounded relationships
3. [Partial correlation](https://en.wikipedia.org/wiki/Partial_correlation) - Wikipedia article on the correlation that remains after controlling for a third variable
