---
title: Parameter vs Statistic Comparison
description: An interactive MicroSim demonstrating the difference between population parameters and sample statistics, showing how statistics vary while parameters remain fixed.
quality_score: 85
image: /sims/parameter-statistic-compare/parameter-statistic-compare.png
og:image: /sims/parameter-statistic-compare/parameter-statistic-compare.png
twitter:image: /sims/parameter-statistic-compare/parameter-statistic-compare.png
social:
   cards: false
---
# Parameter vs Statistic Comparison

<iframe src="main.html" height="402px" width="100%" scrolling="no"></iframe>

[Run the Parameter vs Statistic MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/parameter-statistic-compare/main.html" height="402px" width="100%" scrolling="no"></iframe>
```

## About This MicroSim

This interactive simulation helps students understand one of the most fundamental distinctions in statistics: the difference between a **parameter** (a fixed value describing a population) and a **statistic** (a calculated value from a sample that varies from sample to sample).

The simulation displays:

- **Left Panel (Population)**: A histogram showing all 200 values in the population, with the population mean (parameter, shown as the Greek letter mu) marked with a red vertical line. This value never changes.

- **Middle Panel (Sample)**: A histogram of the current random sample drawn from the population, with the sample mean (statistic, shown as x-bar) marked with an orange vertical line. This value changes each time you draw a new sample.

- **Right Panel (Comparison & History)**: Shows the difference between the current sample mean and population mean, plus a dot plot tracking all previous sample means so students can see the variability of statistics around the fixed parameter.

### How to Use

1. **Draw New Sample**: Click this button to randomly select a new sample from the population and calculate its mean
2. **Sample Size Slider**: Adjust to see how sample size affects how close statistics tend to be to the parameter (larger samples produce less variable statistics)
3. **Reset**: Generate a fresh population and clear the history to start over

### Key Insights

- The population mean (parameter) is fixed at 70 and never changes
- Each sample mean (statistic) varies depending on which individuals happen to be selected
- As you draw more samples, the dot plot builds up showing the sampling distribution of the mean
- Larger sample sizes produce sample means that cluster more tightly around the true population mean

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Define and distinguish between a parameter and a statistic
2. Explain why statistics vary from sample to sample while parameters remain fixed
3. Predict how sample size affects the variability of sample statistics
4. Use proper notation (mu for population mean, x-bar for sample mean)

### Target Audience

- AP Statistics students (high school)
- Introductory statistics college students
- Anyone learning the foundations of statistical inference

### Prerequisites

- Understanding of mean (average)
- Basic familiarity with histograms
- Concept of a sample vs. a population

### Classroom Activities

**Activity 1: Predict and Observe (10 minutes)**

1. Before drawing any samples, ask students: "If the population mean is 70, what do you predict the sample mean will be?"
2. Have students draw 5 samples and record each sample mean
3. Discuss: Why are the sample means different each time?

**Activity 2: Sample Size Investigation (15 minutes)**

1. Set sample size to 10 and draw 10 samples, observing the spread of dots
2. Reset and repeat with sample size 50
3. Reset and repeat with sample size 100
4. Compare the three dot plots: What pattern do you notice?

**Activity 3: Real-World Connection (10 minutes)**

Discuss: "Imagine the population is all students at your school and the variable is height. Why would surveying 10 students give a different average than surveying 100 students? Which would you trust more to estimate the true average height of all students?"

### Assessment Questions

1. What is the difference between a parameter and a statistic?
2. If you drew two random samples of size 25 from the same population, would you expect them to have the same mean? Explain.
3. How does increasing sample size affect the variability of the sample mean?
4. In this simulation, which symbol represents the parameter? Which represents the statistic?

## References

1. [Wikipedia: Statistical Parameter](https://en.wikipedia.org/wiki/Statistical_parameter) - Comprehensive overview of statistical parameters and their role in probability distributions and statistical inference

2. [Khan Academy: Population Parameters vs Sample Statistics](https://www.khanacademy.org/math/statistics-probability/summarizing-quantitative-data) - Interactive lessons and practice problems on distinguishing parameters from statistics

3. [OpenIntro Statistics](https://www.openintro.org/book/os/) - Free open-source textbook with extensive coverage of sampling distributions and statistical inference

4. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used to build this interactive simulation
