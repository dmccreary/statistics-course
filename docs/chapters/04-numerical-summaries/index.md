---
title: Numerical Summaries
description: Learn to describe distributions using measures of center, spread, and position including mean, median, standard deviation, and the five-number summary.
generated_by: claude skill chapter-content-generator
date: 2026-02-06 21:07:58
version: 0.04
---

# Numerical Summaries

## Summary

This chapter introduces the numerical measures used to describe distributions. Students will learn about measures of center (mean, median, mode), measures of spread (range, IQR, standard deviation, variance), and how to calculate and interpret these statistics. The five-number summary and boxplots provide powerful tools for comparing distributions.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

33. Center of Distribution
34. Spread of Distribution
35. Mean
36. Median
37. Mode
38. Resistant Measure
39. Comparing Mean and Median
40. Range
41. Interquartile Range
42. Quartiles
43. Five-Number Summary
44. Boxplot
45. Modified Boxplot
46. Comparing Distributions
47. Standard Deviation
48. Variance
49. Calculating Variance
50. Percentile

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to Statistics](../01-introduction-to-statistics/index.md)
- [Chapter 3: Displaying Quantitative Data](../03-displaying-quantitative-data/index.md)

---

## Introduction: Beyond Pictures to Numbers

Histograms and stemplots tell a story about your data, but sometimes you need to summarize that story with just a few key numbers. Imagine trying to describe how your class did on a test. You could show everyone a histogram, or you could simply say, "The average was 78, and most scores fell between 65 and 91." Both approaches have value, but numerical summaries give us precision that pictures alone can't provide.

"Let's crack this nut!" as Sylvia would say. In this chapter, we're building your toolkit for describing any distribution with just a handful of carefully chosen numbers. By the end, you'll be able to look at any dataset and quickly communicate its essential features—where the center is, how spread out the values are, and whether any unusual values deserve special attention.

Think of numerical summaries as the vital statistics of your data. Just as a doctor checks your heart rate, blood pressure, and temperature to assess your health, statisticians use measures of center and spread to assess the "health" of a distribution.

---

## The Center of a Distribution

When someone asks, "What's typical?" for a dataset, they're really asking about the **center of the distribution**. The center is a single value that represents where the "middle" of the data falls. But here's the interesting part—there's more than one way to find the middle, and different methods can give you different answers!

The three most common measures of center are the **mean**, **median**, and **mode**. Each one answers the question "What's typical?" in a slightly different way, and choosing the right one depends on the shape of your distribution and what you're trying to communicate.

| Measure | What It Represents | Best Used When |
|---------|-------------------|----------------|
| Mean | The balance point of the data | Distribution is roughly symmetric |
| Median | The middle value when data is ordered | Distribution is skewed or has outliers |
| Mode | The most frequently occurring value | Describing categorical data or identifying peaks |

### The Mean: Adding and Dividing

The **mean** (often called the average) is probably the measure of center you've used most often. To find it, add up all the values and divide by how many values you have. In symbols:

\[
\bar{x} = \frac{\sum x_i}{n}
\]

That \( \bar{x} \) (read as "x-bar") is the symbol for the sample mean. The Greek letter sigma (\( \sum \)) means "add up all of these," and \( n \) is the number of observations.

**Example:** Five students scored 72, 85, 88, 90, and 95 on a quiz.

\[
\bar{x} = \frac{72 + 85 + 88 + 90 + 95}{5} = \frac{430}{5} = 86
\]

The mean score is 86 points. Notice that no one actually scored 86—the mean doesn't have to be a value in your dataset.

Here's a helpful way to think about the mean: imagine your data values are weights placed along a number line on a seesaw. The mean is the point where the seesaw balances perfectly. This "balance point" interpretation explains why the mean is sensitive to extreme values—a really heavy weight far from the center pulls the balance point in its direction.

#### Diagram: Mean as Balance Point

<iframe src="../../sims/mean-balance-point/main.html" height="302px" scrolling="no" style="width:100%; border: 1px solid #2E7D32;"></iframe>

[Run MicroSim Fullscreen](../../sims/mean-balance-point/main.html){ .md-button .md-button--primary }
[Edit in p5.js Editor](https://editor.p5js.org/){ .md-button }

<details markdown="1">
<summary>Interactive Balance Point Visualization</summary>
Type: MicroSim

Learning objective: Students will understand that the mean represents the balance point of a distribution by manipulating data points and observing how the mean shifts in response (Bloom: Understanding).

Visual elements:
- A horizontal number line ranging from 0 to 100
- A triangular fulcrum (balance point) that can slide along the number line
- Circular "weights" representing data points that can be dragged along the number line
- The current mean value displayed prominently
- A "balanced/unbalanced" indicator showing whether the fulcrum is at the mean

Interactive controls:
- Drag individual data points left or right to see the mean update in real-time
- Add new data points by clicking on the number line
- Remove data points by double-clicking them
- Reset button to restore original dataset
- "Show calculation" toggle that displays the sum and division

Behavior:
- When fulcrum is not at the mean, the beam tilts toward the heavier side
- Moving a point farther from center causes larger shift in mean
- Adding an extreme value dramatically shifts the balance point
- Initial dataset: 5 points distributed roughly symmetrically

Canvas size: 700 x 300 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

### The Median: Finding the Middle

The **median** is the middle value when you arrange all observations in order from smallest to largest. If you have an odd number of observations, the median is literally the middle one. If you have an even number, the median is the average of the two middle values.

**Finding the Median:**

1. Arrange all values in order (smallest to largest)
2. Count the observations: \( n \)
3. If \( n \) is odd: median is the value in position \( \frac{n+1}{2} \)
4. If \( n \) is even: median is the average of values in positions \( \frac{n}{2} \) and \( \frac{n}{2}+1 \)

**Example (odd n):** Quiz scores: 72, 85, 88, 90, 95

Already in order. With \( n = 5 \) observations, the median is in position \( \frac{5+1}{2} = 3 \).

The median is **88**.

**Example (even n):** Test scores: 65, 72, 78, 81, 85, 92

With \( n = 6 \) observations, we average positions 3 and 4.

Median \( = \frac{78 + 81}{2} = 79.5 \)

Here's the key insight: the median cares only about position, not about how far away the extreme values are. If we changed that 92 to 192, the median would stay exactly the same at 79.5. This makes the median **resistant** to outliers.

### The Mode: Most Common Value

The **mode** is simply the value that appears most frequently in your dataset. A distribution can have:

- **One mode** (unimodal)
- **Two modes** (bimodal)
- **Multiple modes** (multimodal)
- **No mode** (if all values appear equally often)

The mode is the only measure of center that works for categorical data. You can't calculate the mean or median of eye colors, but you can identify that "brown" is the most common (the mode).

For quantitative data, the mode is less commonly used because many datasets have no repeated values, making the mode undefined or not very meaningful.

---

## The Spread of a Distribution

Knowing the center isn't enough. Consider two classes where the average test score is 80. In Class A, everyone scored between 78 and 82. In Class B, scores ranged from 45 to 100. These are very different situations! The **spread** (or variability) tells us how much the data values differ from one another.

Think of spread as measuring the "width" of your distribution. A small spread means values cluster tightly together; a large spread means values are scattered widely.

| Measure | What It Captures | Resistant? |
|---------|-----------------|------------|
| Range | Distance from min to max | No |
| IQR | Spread of the middle 50% | Yes |
| Standard Deviation | Typical distance from mean | No |
| Variance | Squared distance from mean | No |

### Range: The Simplest Measure

The **range** is the simplest measure of spread:

\[
\text{Range} = \text{Maximum} - \text{Minimum}
\]

For the quiz scores 72, 85, 88, 90, 95:

\[
\text{Range} = 95 - 72 = 23
\]

The range is easy to calculate, but it has a major weakness: it uses only the two most extreme values and ignores everything in between. One outlier can dramatically inflate the range, making it an unreliable measure for many datasets.

---

## Quartiles and the Interquartile Range

To get a more robust picture of spread, we divide the data into four equal parts using **quartiles**.

- **Q1 (First Quartile):** 25% of data falls below this value
- **Q2 (Second Quartile):** 50% of data falls below this value (this is the median!)
- **Q3 (Third Quartile):** 75% of data falls below this value

The **Interquartile Range (IQR)** measures the spread of the middle 50% of the data:

\[
\text{IQR} = Q_3 - Q_1
\]

**Finding Quartiles (by hand):**

1. Order the data and find the median (Q2)
2. Q1 is the median of the lower half (values below Q2)
3. Q3 is the median of the upper half (values above Q2)

**Example:** Data: 12, 15, 18, 22, 25, 28, 30, 35, 42

- Median (Q2) = 25 (the 5th value of 9)
- Lower half: 12, 15, 18, 22 → Q1 = \( \frac{15+18}{2} = 16.5 \)
- Upper half: 28, 30, 35, 42 → Q3 = \( \frac{30+35}{2} = 32.5 \)
- IQR = 32.5 - 16.5 = 16

The IQR tells us that the middle 50% of values spans 16 units. This is far more stable than the range because it's not affected by extreme values at either end.

#### Diagram: Understanding Quartiles

<iframe src="../../sims/quartile-visualization/main.html" height="302px" scrolling="no" style="width:100%; border: 1px solid #2E7D32;"></iframe>

[Run MicroSim Fullscreen](../../sims/quartile-visualization/main.html){ .md-button .md-button--primary }
[Edit in p5.js Editor](https://editor.p5js.org/){ .md-button }

<details markdown="1">
<summary>Quartile Division Visualization</summary>
Type: Interactive Infographic

Learning objective: Students will identify and interpret quartiles as values that divide a distribution into four equal parts (Bloom: Understanding).

Visual elements:
- Horizontal number line with data points displayed as dots
- Color-coded regions:
  - Red (0-25%): Below Q1
  - Orange (25-50%): Q1 to Median
  - Yellow (50-75%): Median to Q3
  - Green (75-100%): Above Q3
- Vertical lines marking Q1, Median (Q2), and Q3 with labels
- Percentage labels showing 25% in each region
- Count of data points in each region

Interactive controls:
- Hover over any region to highlight it and show exact boundaries
- Click on Q1, Median, or Q3 markers to see calculation details
- Slider to change sample size (10 to 50 points)
- "Randomize data" button to generate new dataset
- Toggle between "even spacing" and "realistic data" modes

Behavior:
- Data points smoothly redistribute when sample size changes
- Quartile markers animate to new positions
- Tooltip shows exact value when hovering over any quartile marker

Canvas size: 700 x 250 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## Percentiles: Beyond Quartiles

Quartiles divide data into four parts, but we can be even more precise using **percentiles**. The **p-th percentile** is the value below which p% of the data falls.

- The 25th percentile = Q1
- The 50th percentile = Median = Q2
- The 75th percentile = Q3

Percentiles are everywhere in real life:

- Standardized test scores ("You scored in the 85th percentile")
- Growth charts at the pediatrician ("Your child is in the 60th percentile for height")
- Income distributions ("The top 1%")

If you're in the 85th percentile on a test, it means you scored higher than 85% of test-takers. Note that this says nothing about your actual score—only about how you compare to others.

---

## The Five-Number Summary

The **five-number summary** provides a compact description of a distribution using just five values:

1. **Minimum** – the smallest value
2. **Q1** – the first quartile (25th percentile)
3. **Median** – the middle value (50th percentile)
4. **Q3** – the third quartile (75th percentile)
5. **Maximum** – the largest value

These five numbers capture the center (median), the spread of the middle half (Q1 and Q3), and the full extent of the data (min and max).

**Example:** For the dataset 12, 15, 18, 22, 25, 28, 30, 35, 42:

| Statistic | Value |
|-----------|-------|
| Minimum | 12 |
| Q1 | 16.5 |
| Median | 25 |
| Q3 | 32.5 |
| Maximum | 42 |

"Acorn for your thoughts?" Here's why this summary is so powerful: with just five numbers, you can sketch the entire shape of a distribution. You know where the center is, how spread out the middle half is, and whether the tails stretch equally in both directions.

---

## Boxplots: Visualizing the Five-Number Summary

A **boxplot** (also called a box-and-whisker plot) turns the five-number summary into a picture:

- A box stretches from Q1 to Q3
- A line inside the box marks the median
- "Whiskers" extend from the box to the minimum and maximum

#### Diagram: Anatomy of a Boxplot

<iframe src="../../sims/boxplot-builder/main.html" height="402px" scrolling="no" style="width:100%; border: 1px solid #2E7D32;"></iframe>

[Run MicroSim Fullscreen](../../sims/boxplot-builder/main.html){ .md-button .md-button--primary }
[Edit in p5.js Editor](https://editor.p5js.org/){ .md-button }

<details markdown="1">
<summary>Interactive Boxplot Builder</summary>
Type: MicroSim

Learning objective: Students will construct and interpret boxplots by connecting numerical summary statistics to their visual representation (Bloom: Applying, Creating).

Visual elements:
- Data entry panel showing individual values or editable data points
- Live-updating boxplot that responds to data changes
- Labels for each component: Min, Q1, Median, Q3, Max, IQR
- Horizontal number line with appropriate scale
- Shaded box region from Q1 to Q3
- Vertical line at median within the box
- Whiskers extending to min and max

Interactive controls:
- Drag data points to change values
- Add/remove data points with click
- Toggle labels on/off
- Show/hide the five-number summary table
- "Generate random data" button with distribution type selector (symmetric, right-skewed, left-skewed)
- Animation speed slider for building the boxplot step-by-step

Behavior:
- Boxplot updates in real-time as data changes
- Step-by-step mode shows construction process: sort data → find median → find quartiles → draw box → add whiskers
- Highlighting each component when hovered
- Color scheme: green cardigan color for box, auburn for median line

Canvas size: 750 x 400 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

**Reading a Boxplot:**

- The length of the box (Q3 - Q1) equals the IQR—wider boxes mean more spread in the middle 50%
- The position of the median line within the box reveals skewness:
  - Median closer to Q1? Right-skewed
  - Median closer to Q3? Left-skewed
  - Median in the middle? Roughly symmetric
- The whisker lengths show the range of each tail

---

## Modified Boxplots and Outliers

A **modified boxplot** handles outliers more carefully than a standard boxplot. Instead of always extending whiskers to the min and max, modified boxplots follow the **1.5 × IQR rule**:

1. Calculate fences:
   - Lower fence: \( Q_1 - 1.5 \times \text{IQR} \)
   - Upper fence: \( Q_3 + 1.5 \times \text{IQR} \)

2. Whiskers extend only to the most extreme values *within* the fences

3. Any values beyond the fences are plotted as individual points (outliers)

**Example:** For data with Q1 = 20, Q3 = 40:
- IQR = 40 - 20 = 20
- Lower fence = 20 - 1.5(20) = -10
- Upper fence = 40 + 1.5(20) = 70

Any values below -10 or above 70 would be plotted as outliers.

Why 1.5 × IQR? Statistician John Tukey chose this multiplier because it works well in practice. For normally distributed data, about 0.7% of observations would be flagged as outliers—unusual enough to warrant investigation, but not so rare that we never see them.

#### Diagram: Modified Boxplot Outlier Detection

<iframe src="../../sims/outlier-detection/main.html" height="352px" scrolling="no" style="width:100%; border: 1px solid #2E7D32;"></iframe>

[Run MicroSim Fullscreen](../../sims/outlier-detection/main.html){ .md-button .md-button--primary }
[Edit in p5.js Editor](https://editor.p5js.org/){ .md-button }

<details markdown="1">
<summary>Outlier Detection Visualization</summary>
Type: MicroSim

Learning objective: Students will apply the 1.5 × IQR rule to identify potential outliers in a dataset (Bloom: Applying, Analyzing).

Visual elements:
- Dataset displayed as points along a number line
- Standard boxplot with box and whiskers
- Dashed lines showing fence positions
- Outliers displayed as individual points beyond fences
- Labels showing: Q1, Q3, IQR, Lower Fence, Upper Fence
- Color coding: normal points in green, outliers in red

Interactive controls:
- Drag existing points to change values
- Add new points by clicking on the number line
- Multiplier slider (adjustable from 1.0 to 3.0, default 1.5)
- "Show calculations" toggle displaying fence formulas and values
- Checkbox to toggle between standard and modified boxplot view

Behavior:
- As points are moved, outlier status updates in real-time
- Points crossing fence boundaries change color with animation
- Whiskers adjust to show the most extreme non-outlier values
- Display count of outliers detected

Canvas size: 700 x 350 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## Comparing Distributions with Boxplots

One of the greatest strengths of boxplots is comparing multiple groups side by side. When you place boxplots next to each other on the same scale, differences in center, spread, and shape become immediately visible.

**What to Compare:**

- **Centers:** Are the medians at different positions?
- **Spreads:** Which group has more variability (longer box, longer whiskers)?
- **Shapes:** Are some distributions skewed while others are symmetric?
- **Outliers:** Does one group have more unusual values?

**Example:** Comparing test scores for three different class periods

| Feature | Period 1 | Period 2 | Period 3 |
|---------|----------|----------|----------|
| Median | 78 | 82 | 75 |
| IQR | 15 | 8 | 22 |
| Outliers | None | 1 low | None |

Period 2 has both the highest center and the smallest spread—a high-performing, consistent class. Period 3 has the most variability, suggesting a wider range of preparation levels.

#### Diagram: Side-by-Side Boxplot Comparison

<iframe src="../../sims/boxplot-comparison/main.html" height="402px" scrolling="no" style="width:100%; border: 1px solid #2E7D32;"></iframe>

[Run MicroSim Fullscreen](../../sims/boxplot-comparison/main.html){ .md-button .md-button--primary }
[Edit in p5.js Editor](https://editor.p5js.org/){ .md-button }

<details markdown="1">
<summary>Multi-Group Boxplot Comparison Tool</summary>
Type: MicroSim

Learning objective: Students will compare distributions across multiple groups by analyzing side-by-side boxplots (Bloom: Analyzing, Evaluating).

Visual elements:
- 2-4 parallel boxplots on a common scale
- Shared horizontal axis with clear labels
- Each boxplot with different color (consistent with Sylvia theme)
- Group labels below each boxplot
- Optional horizontal reference lines at key values
- Summary statistics table showing min, Q1, median, Q3, max, IQR for each group

Interactive controls:
- Dropdown to select pre-loaded comparison datasets (e.g., "Test Scores by Period", "Heights by Gender", "Salaries by Department")
- Toggle to show/hide outliers
- Toggle to display connecting lines between medians
- Checkbox to overlay all boxplots (transparency mode)
- "Randomize" button to generate new comparison data

Behavior:
- Hovering over a boxplot highlights it and dims others
- Clicking a boxplot displays its five-number summary prominently
- Animation when switching between datasets
- Written comparison hints appear based on visible differences

Canvas size: 750 x 400 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## Standard Deviation: Measuring Typical Distance from the Mean

While the IQR focuses on the middle 50%, the **standard deviation** considers how far *all* values are from the mean. It answers the question: "On average, how far do data points stray from the center?"

The logic behind standard deviation:

1. Find how far each value is from the mean (these are called **deviations**)
2. Square each deviation (to make them all positive)
3. Average the squared deviations (this gives us **variance**)
4. Take the square root (to return to original units)

**The Variance Formula:**

\[
s^2 = \frac{\sum(x_i - \bar{x})^2}{n-1}
\]

**The Standard Deviation Formula:**

\[
s = \sqrt{\frac{\sum(x_i - \bar{x})^2}{n-1}}
\]

"My tail's tingling—we're onto something!" Here's the key insight: standard deviation tells you the *typical* distance from the mean. If the standard deviation is 10 points, most values are within about 10 points of the average—some closer, some farther, but 10 gives you a reasonable expectation.

### Why Divide by n-1?

You might wonder why we divide by \( n-1 \) instead of \( n \). This is called **Bessel's correction**, and here's the intuition:

When we calculate deviations from \( \bar{x} \), we're using the sample mean as our reference point. But \( \bar{x} \) is calculated from the same data, so it's positioned to minimize the sum of squared deviations. This makes our deviations slightly too small on average. Dividing by \( n-1 \) instead of \( n \) corrects for this underestimation, giving us an unbiased estimate of the true population variance.

Don't worry about this technicality too much—just remember to use \( n-1 \) when calculating variance and standard deviation for sample data.

---

## Calculating Variance and Standard Deviation

Let's work through a complete example to see how variance and standard deviation are calculated.

**Dataset:** Quiz scores of 6, 8, 10, 12, 14

**Step 1:** Calculate the mean

\[
\bar{x} = \frac{6 + 8 + 10 + 12 + 14}{5} = \frac{50}{5} = 10
\]

**Step 2:** Find each deviation from the mean

| Value (\( x_i \)) | Deviation (\( x_i - \bar{x} \)) |
|---------------|----------------------------|
| 6 | 6 - 10 = -4 |
| 8 | 8 - 10 = -2 |
| 10 | 10 - 10 = 0 |
| 12 | 12 - 10 = 2 |
| 14 | 14 - 10 = 4 |

Notice the deviations sum to zero: \( (-4) + (-2) + 0 + 2 + 4 = 0 \). This always happens! That's why we can't just average the deviations directly.

**Step 3:** Square each deviation

| Deviation | Squared Deviation |
|-----------|-------------------|
| -4 | 16 |
| -2 | 4 |
| 0 | 0 |
| 2 | 4 |
| 4 | 16 |

**Step 4:** Sum the squared deviations

\[
\sum(x_i - \bar{x})^2 = 16 + 4 + 0 + 4 + 16 = 40
\]

**Step 5:** Calculate variance

\[
s^2 = \frac{40}{5-1} = \frac{40}{4} = 10
\]

**Step 6:** Calculate standard deviation

\[
s = \sqrt{10} \approx 3.16
\]

The standard deviation is about 3.16 points. This means quiz scores typically differ from the mean of 10 by about 3 points.

#### Diagram: Standard Deviation Calculator

<iframe src="../../sims/std-dev-calculator/main.html" height="452px" scrolling="no" style="width:100%; border: 1px solid #2E7D32;"></iframe>

[Run MicroSim Fullscreen](../../sims/std-dev-calculator/main.html){ .md-button .md-button--primary }
[Edit in p5.js Editor](https://editor.p5js.org/){ .md-button }

<details markdown="1">
<summary>Step-by-Step Variance and Standard Deviation Calculator</summary>
Type: MicroSim

Learning objective: Students will calculate variance and standard deviation by following a systematic procedure and understanding each step's purpose (Bloom: Applying, Understanding).

Visual elements:
- Data input area (editable list of values)
- Step-by-step calculation display:
  1. Mean calculation with formula
  2. Table of values, deviations, and squared deviations
  3. Sum of squared deviations
  4. Division by (n-1)
  5. Square root for standard deviation
- Visual representation: dot plot showing mean and distance to each point
- Highlighting of current calculation step

Interactive controls:
- Editable data values (text input or +/- buttons)
- "Calculate step by step" button (advances one step at a time)
- "Calculate all" button (shows complete solution immediately)
- "Reset" button to start over
- "Generate example" dropdown with preset datasets
- Toggle between population (\( n \)) and sample (\( n-1 \)) formulas

Behavior:
- Each step animates into view with explanatory text
- Deviations shown as colored lines from points to mean on dot plot
- Current step highlighted in the formula
- Running calculations displayed with proper mathematical notation
- Final answer prominently displayed with interpretation

Canvas size: 800 x 500 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## Properties of Standard Deviation

Understanding what standard deviation can and cannot tell you is crucial for interpreting data correctly.

**Key Properties:**

- Standard deviation is always ≥ 0
- Standard deviation = 0 only when all values are identical
- Standard deviation has the same units as the original data
- Standard deviation is not resistant to outliers (it uses the mean and squared deviations)

**Comparing Standard Deviations:**

- Larger s → more spread, more variability
- Smaller s → values cluster more tightly around the mean
- Doubling the spread of data roughly doubles the standard deviation

**A Helpful Rule of Thumb:**

For many distributions, most data (often 68-95%) falls within 2 standard deviations of the mean. If \( \bar{x} = 100 \) and \( s = 15 \), expect most values between \( 100 - 2(15) = 70 \) and \( 100 + 2(15) = 130 \).

---

## Resistant vs. Non-Resistant Measures

A measure is **resistant** if it's not strongly affected by extreme values or outliers. Let's compare:

| Measure | Resistant? | Why? |
|---------|-----------|------|
| Mean | No | Pulled toward outliers (uses all values) |
| Median | Yes | Only depends on middle position(s) |
| Mode | Yes | Only counts frequency |
| Range | No | Uses only extreme values |
| IQR | Yes | Based on quartiles, ignores extremes |
| Standard Deviation | No | Uses squared deviations from mean |

**When to Choose Resistant Measures:**

Use median and IQR when:

- The distribution is strongly skewed
- There are outliers you want to downplay
- You want to describe the "typical" observation

Use mean and standard deviation when:

- The distribution is roughly symmetric
- There are no extreme outliers
- You plan to do further statistical calculations

---

## Comparing Mean and Median: What Shape Tells Us

The relationship between the mean and median reveals information about a distribution's shape:

- **Symmetric distribution:** Mean ≈ Median
- **Right-skewed distribution:** Mean > Median (mean is pulled toward the long right tail)
- **Left-skewed distribution:** Mean < Median (mean is pulled toward the long left tail)

**Example: Income Distributions**

Income is famously right-skewed. Most people earn modest incomes, but a few earn enormous amounts. Those high earners pull the mean up, so the mean income is typically higher than the median income. That's why reports often use median household income—it better represents the "typical" household.

#### Diagram: Mean vs Median in Different Distributions

<iframe src="../../sims/mean-median-skewness/main.html" height="402px" scrolling="no" style="width:100%; border: 1px solid #2E7D32;"></iframe>

[Run MicroSim Fullscreen](../../sims/mean-median-skewness/main.html){ .md-button .md-button--primary }
[Edit in p5.js Editor](https://editor.p5js.org/){ .md-button }

<details markdown="1">
<summary>Skewness and Center Comparison</summary>
Type: MicroSim

Learning objective: Students will predict the relative positions of mean and median based on distribution shape (Bloom: Analyzing, Evaluating).

Visual elements:
- Dynamic histogram that can be reshaped
- Vertical lines marking mean (one color) and median (different color) positions
- Labels showing exact values of mean and median
- Text display: "Mean [<|=|>] Median" updating based on relationship
- Shape label (Symmetric, Right-skewed, Left-skewed)

Interactive controls:
- Preset buttons: "Symmetric", "Right-skewed", "Left-skewed"
- Slider to control degree of skewness
- Drag to reshape the histogram directly
- Sample size slider (50-500)
- "Add outlier" buttons for left and right extremes
- Reset button

Behavior:
- Mean and median lines animate to new positions as shape changes
- Gap between mean and median widens with increased skewness
- Adding outliers visibly pulls the mean while median stays stable
- Sound or visual pulse when relationship changes direction

Canvas size: 700 x 400 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## Choosing the Right Summary Statistics

"Time to squirrel away this knowledge!" Here's a practical guide for choosing your summary statistics:

**For Describing Center:**

| Distribution Shape | Recommended Measure |
|--------------------|---------------------|
| Symmetric, no outliers | Mean |
| Skewed or has outliers | Median |
| Categorical data | Mode |

**For Describing Spread:**

| Distribution Shape | Recommended Measure |
|--------------------|---------------------|
| Symmetric, no outliers | Standard deviation |
| Skewed or has outliers | IQR |
| Need full extent | Range (with caution) |

**The Complete Description:**

For a full numerical description of a single quantitative variable:

- If roughly symmetric: Report mean and standard deviation
- If skewed: Report five-number summary

Always mention sample size (\( n \)) and identify any outliers!

---

## Putting It All Together: A Complete Analysis

Let's analyze a real dataset: The ages of 15 customers at a coffee shop one morning.

**Data:** 19, 21, 22, 23, 24, 25, 27, 28, 32, 35, 38, 42, 45, 55, 72

**Step 1: Calculate measures of center**

- Mean: \( \bar{x} = \frac{508}{15} \approx 33.9 \) years
- Median: The 8th value (middle of 15) = 28 years
- Mode: No repeated values, so no mode

**Step 2: Calculate the five-number summary**

| Statistic | Value |
|-----------|-------|
| Minimum | 19 |
| Q1 | 23 |
| Median | 28 |
| Q3 | 42 |
| Maximum | 72 |

**Step 3: Calculate IQR and check for outliers**

- IQR = 42 - 23 = 19
- Lower fence: 23 - 1.5(19) = -5.5 (no values below this)
- Upper fence: 42 + 1.5(19) = 70.5
- Outlier: 72 exceeds the upper fence!

**Step 4: Calculate standard deviation**

After computing, \( s \approx 14.8 \) years.

**Step 5: Interpret the results**

The distribution of customer ages is right-skewed (mean 33.9 > median 28). This makes sense—there's one elderly customer (72) who raises the average. The typical customer is in their late 20s, with most ages ranging from 23 to 42 (the middle 50%). The 72-year-old is an outlier by the 1.5 × IQR rule.

**Best summary:** Given the skewness and outlier, report the five-number summary: Min = 19, Q1 = 23, Median = 28, Q3 = 42, Max = 72, with IQR = 19. Note one high outlier at 72.

---

## Key Takeaways

"Let's squirrel away the big ideas!"

- **Center** describes where the "middle" of a distribution is. The mean is the balance point; the median is the positional middle; the mode is most frequent.

- **Spread** describes how variable the data is. The range spans min to max; the IQR spans the middle 50%; the standard deviation measures typical distance from the mean.

- **Resistant measures** (median, IQR) aren't affected by outliers. Non-resistant measures (mean, standard deviation, range) are pulled by extreme values.

- **The five-number summary** (min, Q1, median, Q3, max) captures center, spread, and extent in just five values.

- **Boxplots** visualize the five-number summary and make comparing distributions easy. Modified boxplots flag outliers using the 1.5 × IQR rule.

- **Comparing mean and median** reveals skewness: Mean > Median suggests right-skewed; Mean < Median suggests left-skewed.

- **Choose wisely:** Use mean and standard deviation for symmetric distributions; use median and IQR for skewed distributions or when outliers are present.

---

## Practice Problems

1. Calculate the mean, median, and mode for: 15, 18, 18, 20, 22, 25, 30

2. A dataset has Q1 = 45, median = 52, and Q3 = 61. What is the IQR? What values would be considered outliers using the 1.5 × IQR rule?

3. Two classes took the same test. Class A had a mean of 75 with standard deviation 8. Class B had a mean of 78 with standard deviation 15. Which class performed more consistently? Explain.

4. Here are home prices in thousands: 150, 175, 180, 195, 200, 210, 225, 890. Calculate the mean and median. Which better represents a "typical" home price? Why?

5. Create a boxplot for this data and identify any outliers: 12, 15, 17, 19, 22, 23, 25, 26, 28, 45

---

Now you've got the full toolkit for describing distributions numerically. In the next chapter, we'll explore how to standardize values using z-scores and dive into the beautiful, bell-shaped normal distribution!
