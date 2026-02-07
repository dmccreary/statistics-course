---
title: Correlation Pitfalls Demo
description: An interactive demonstration where students explore four scenarios where correlation can be misleading - nonlinear data, outlier effects, restricted range, and confounding variables.
quality_score: 94
image: /sims/correlation-pitfalls/correlation-pitfalls.png
og:image: /sims/correlation-pitfalls/correlation-pitfalls.png
twitter:image: /sims/correlation-pitfalls/correlation-pitfalls.png
social:
   cards: false
---
# Correlation Pitfalls Demo

<iframe src="main.html" height="552px" scrolling="no"></iframe>

[Run the Correlation Pitfalls Demo Fullscreen](./main.html){ .md-button .md-button--primary }

## Embedding This MicroSim

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/correlation-pitfalls/main.html" height="552px" scrolling="no"></iframe>
```

## About This MicroSim

The Correlation Pitfalls Demo is designed to help students develop critical thinking about the correlation coefficient. While correlation is a powerful tool, it has important limitations that every statistics student must understand. This interactive simulation presents four distinct scenarios where relying solely on the correlation value can lead to incorrect conclusions.

> "Let's crack this nut about correlation! Just because two variables dance together doesn't mean one is leading. Understanding these pitfalls is what separates casual data observers from true statistical thinkers!"
> -- *Sylvia*

### The Four Scenarios

**1. Nonlinear Data**
Students encounter perfect mathematical relationships (parabolas, sine waves, exponential curves) that have correlation values near zero. This demonstrates that r only measures *linear* association, not the strength of the relationship overall.

**2. Outlier Effect**
A single extreme point can dramatically change the correlation - inflating it to make no relationship look strong, deflating it to hide a true pattern, or even reversing its direction entirely. Students can toggle the outlier on and off to see its impact.

**3. Restricted Range**
When data is collected from a limited portion of the true range, correlation appears weaker than it really is. Students can expand the range to reveal the true relationship hiding beneath.

**4. Confounding Variables**
Classic examples like ice cream sales and drowning deaths show how a third variable (summer temperature) can create apparent correlations between unrelated variables. This reinforces the essential lesson: correlation is not causation.

### Controls

| Control | Function |
|---------|----------|
| **Tab Buttons** | Switch between the four pitfall scenarios |
| **Prediction Buttons** | Select what you think is misleading about the correlation |
| **Reveal Answer** | Check your prediction and see the explanation |
| **Remove/Show Outlier** | Toggle the outlier in the Outlier Effect tab |
| **Show Full Range** | Expand the data range in the Restricted Range tab |
| **Next Challenge** | Generate a new example within the current category |

### Key Takeaways

- A correlation near 0 does NOT mean no relationship exists
- A single outlier can completely distort the correlation
- Restricted samples underestimate the true correlation
- Correlated variables may both be caused by a third factor

## Lesson Plan

### Learning Objective

Students will recognize situations where correlation is misleading and explain why the correlation coefficient alone provides an incomplete or incorrect picture of the relationship between variables.

### Bloom's Taxonomy Level

**Evaluate (Level 5)** - Students evaluate specific scatterplots to determine whether the correlation value accurately represents the underlying relationship, and they justify their reasoning with statistical principles.

### Prerequisites

- Understanding of scatterplots and how to interpret them
- Knowledge of the correlation coefficient (r) and what values mean
- Familiarity with linear vs. nonlinear patterns
- Basic understanding of outliers

### Suggested Activities

**Exploration Phase (15 minutes)**

1. Have students work through each of the four tabs, making predictions before revealing answers
2. Encourage them to try at least 2-3 challenges in each category
3. Ask students to take notes on patterns they notice

**Class Discussion (10 minutes)**

Project the simulation and work through one example from each tab:

- **Nonlinear**: "Why would a perfect parabola have r near 0? What does r actually measure?"
- **Outlier**: Remove and add the outlier several times. "How much did r change? Is that scary?"
- **Restricted Range**: "Why might a university find low correlation between SAT and GPA?"
- **Confounding**: "What's the third variable here? How can we tell correlation from causation?"

**Application Exercise (15 minutes)**

Present these real-world scenarios and have students identify which pitfall(s) might apply:

1. "A study finds people who eat breakfast have higher test scores. Conclusion: breakfast causes better grades." (Confounding - motivation, sleep habits, socioeconomic factors)

2. "Among Olympic sprinters, there's almost no correlation between training hours and race times." (Restricted range - all elite athletes train extensively)

3. "The relationship between dose of medication and symptom relief shows r = 0.2." (Could be nonlinear - might have diminishing returns or an optimal dose)

4. "A single data entry error (1000 instead of 100) completely changed our research conclusions." (Outlier effect)

### Assessment

**Formative Assessment**

The built-in scoring system tracks correct predictions across scenarios. Students can self-assess their understanding by noting which pitfall types they find most challenging.

**Summative Assessment Questions**

1. Explain why a dataset with r = 0.15 might actually have a very strong, predictable relationship. What type of relationship would this be?

2. A researcher reports r = 0.82 between X and Y based on 50 observations. Describe two different ways this correlation could be misleading, and what you would want to check in the original data.

3. Draw a scatterplot where adding one carefully placed point would change r from approximately 0 to approximately 0.7. Label the outlier.

4. A school district finds that schools with more computers have lower test scores. A journalist writes "Computers Hurt Learning!" Critique this conclusion using correlation limitations.

### Differentiation

- **Struggling students**: Focus on the Outlier Effect tab first, as the visual impact of toggling is most dramatic and intuitive. Use concrete examples ("Imagine one student scored 1000% on a test...")

- **Advanced students**: Challenge them to calculate the correlation before and after removing an outlier by hand for a small dataset. Have them research real examples of spurious correlations.

- **Visual learners**: Emphasize the "toggle" features that let them see the same data with and without the problematic element.

- **Mathematical learners**: Discuss how the z-score formula for correlation makes it sensitive to outliers and blind to nonlinearity.

### Common Misconceptions

| Misconception | Correction |
|--------------|------------|
| "r = 0 means no relationship" | r = 0 means no *linear* relationship. Strong curved patterns can have r = 0. |
| "High correlation means causation" | Correlation never proves causation. Confounding variables can create spurious correlations. |
| "Outliers should always be removed" | Outliers should be investigated, not automatically removed. They may be valid data points. |
| "Larger r is always better" | The goal is accurate r, not large r. Context determines what's meaningful. |

## References

- [AP Statistics: Exploring Bivariate Data](https://apstudents.collegeboard.org/courses/ap-statistics)
- [Correlation Coefficient Properties](https://en.wikipedia.org/wiki/Pearson_correlation_coefficient#Mathematical_properties)
- [Anscombe's Quartet](https://en.wikipedia.org/wiki/Anscombe%27s_quartet) - Famous examples showing datasets with identical correlations but very different patterns
- [Spurious Correlations](https://www.tylervigen.com/spurious-correlations) - Entertaining examples of meaningless correlations
- Chapter 6: Scatterplots and Association

---

*Note: Remember to capture a screenshot of this MicroSim and save it as `correlation-pitfalls.png` in this folder for social media previews.*
