---
title: Guess the Correlation
description: An interactive MicroSim that challenges students to estimate correlation coefficients from scatterplots, developing intuition for what different r-values look like visually.
image: /sims/guess-correlation/guess-correlation.png
og:image: /sims/guess-correlation/guess-correlation.png
twitter:image: /sims/guess-correlation/guess-correlation.png
quality_score: 90
bloom_level: Evaluate
bloom_verb: Estimate
social:
   cards: false
---

# Guess the Correlation

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Guess the Correlation MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive game helps you develop intuition for the correlation coefficient r by challenging you to estimate its value from scatterplots. The more you practice, the better you will become at recognizing patterns that indicate strong, moderate, weak, or no correlation.

### What You Will Learn

- How to visually estimate the **strength** of a linear relationship
- The difference between **positive and negative** correlations
- What scatterplots look like for different **r-values** (-1 to +1)
- How **sample size** affects the apparent clarity of correlation

### How to Use This MicroSim

1. **Examine the scatterplot** carefully. Look at the overall pattern and spread of points.
2. **Adjust the slider** to select your estimate of the correlation coefficient r (from -1 to +1).
3. **Click "Check Answer"** to see how close your guess was to the actual r-value.
4. **Click "New Plot"** to generate a fresh scatterplot and try again.
5. **Change difficulty** to practice with different sample sizes:
   - **Easy**: 50 points (clearer patterns)
   - **Medium**: 30 points (moderate scatter)
   - **Hard**: 20 points (subtle patterns, more challenging)

### Scoring

- **Excellent!** Your guess is within 0.1 of the actual r-value. Streak increases!
- **Good estimate!** Your guess is within 0.2 of the actual r-value. Streak increases!
- **Keep practicing!** Your guess is off by more than 0.2. Streak resets to 0.

Track your current streak and try to beat your high score!

## Iframe Embed Code

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/guess-correlation/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Concepts Illustrated

### The Correlation Coefficient (r)

The correlation coefficient r measures the strength and direction of the linear relationship between two quantitative variables:

- **r = +1**: Perfect positive linear relationship
- **r = 0**: No linear relationship
- **r = -1**: Perfect negative linear relationship

### Visual Patterns to Look For

| r-value Range | Visual Pattern |
|---------------|----------------|
| 0.8 to 1.0 | Points tightly clustered along a line |
| 0.5 to 0.8 | Clear trend with moderate scatter |
| 0.2 to 0.5 | Weak trend, substantial scatter |
| -0.2 to 0.2 | No obvious pattern, cloud of points |
| -0.5 to -0.2 | Weak downward trend |
| -0.8 to -0.5 | Clear downward trend |
| -1.0 to -0.8 | Tight negative linear pattern |

### Sample Size Effects

With smaller samples, the correlation can appear more or less extreme than the true relationship. This is why the "Hard" difficulty (n=20) is more challenging. Points naturally cluster in ways that can be misleading.

## Key Insights

!!! tip "Sylvia Says"
    "Here is a trick I use: imagine drawing an ellipse around all the points. The skinnier that ellipse, the stronger the correlation! A nearly circular cloud means r is close to zero, while a long, thin cigar shape means r is close to +1 or -1. My tail is shaped kind of like a strong correlation, actually!"

1. **Direction is easy, strength is tricky**: Most people can quickly tell if a correlation is positive or negative, but estimating the exact strength takes practice.

2. **Outliers can fool you**: A single outlier can make r appear weaker than the main pattern suggests.

3. **Sample size matters**: Fewer points mean more uncertainty in your visual estimate.

4. **Perfect correlation is rare**: In real data, you almost never see r = 1 or r = -1.

## Lesson Plan

### Learning Objective

Students will be able to **evaluate** (Bloom Level 5) scatterplots and estimate correlation values, developing intuition for what different r-values look like visually.

### Grade Level

High School (AP Statistics) / Introductory College Statistics

### Duration

20-25 minutes

### Warm-Up Activity (3 minutes)

Ask students: "If I showed you a scatterplot, what visual features would tell you whether two variables are strongly related?"

### Guided Exploration (10 minutes)

1. Start on Easy difficulty. Generate a plot and think aloud about your estimation process.
2. Point out the slope (positive vs. negative) and the spread (tight vs. scattered).
3. Make a guess, check the answer, and discuss the feedback.
4. Repeat with 3-4 more plots, gradually involving students in the estimation.
5. Switch to Medium difficulty and discuss how the smaller sample size affects perception.

### Practice Activity (8 minutes)

Have students work individually or in pairs:

- Each student aims to build a streak of at least 3 correct guesses (within 0.2).
- Challenge: Can anyone reach a streak of 5 on Hard difficulty?
- Encourage students to verbalize their reasoning: "I think this is about 0.6 because..."

### Assessment Questions

1. A scatterplot shows points forming a loose downward trend. You estimate r = -0.4. The actual r = -0.55. Was your estimate reasonable? Why?

2. Why is it harder to estimate r accurately with only 20 data points compared to 50?

3. Two students look at the same scatterplot. One guesses r = 0.7, the other guesses r = 0.3. What visual features might they be interpreting differently?

4. Can a scatterplot with r = 0 still show a strong pattern? Explain.

### Extension Activities

1. **Create Your Own Challenge**: Have students describe a scatterplot in words (without seeing it) and have a partner guess the r-value based on the description.

2. **Real Data Practice**: Find real scatterplots online and have students estimate r before looking up the actual value.

3. **Discussion**: Why do statisticians calculate r precisely rather than just estimating visually?

## Technical Notes

This MicroSim generates correlated bivariate normal data using the Cholesky decomposition method:

\[
y = r \cdot x + \sqrt{1 - r^2} \cdot z
\]

where x and z are independent standard normal variables. This ensures the generated data has approximately the target correlation.

The actual r-value displayed is calculated from the generated data using the Pearson correlation formula, so it may differ slightly from the target due to random sampling.

## References

- [Pearson Correlation Coefficient - Wikipedia](https://en.wikipedia.org/wiki/Pearson_correlation_coefficient)
- Moore, D. S., & Notz, W. I. (2020). *Statistics: Concepts and Controversies* (10th ed.). W.H. Freeman.
- De Veaux, R. D., Velleman, P. F., & Bock, D. E. (2021). *Stats: Data and Models* (5th ed.). Pearson.
- [Guess the Correlation Game](https://www.guessthecorrelation.com/) - Inspiration for this educational MicroSim
