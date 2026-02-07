---
title: Standardization and Normal Distributions
description: Learn to calculate z-scores, understand the normal distribution, apply the Empirical Rule, and use normal tables to find probabilities.
generated_by: claude skill chapter-content-generator
date: 2026-02-06 21:58:33
version: 0.04
---

# Standardization and Normal Distributions

## Summary

This chapter covers standardization using z-scores and the normal distribution, one of the most important probability distributions in statistics. Students will learn to calculate and interpret z-scores, understand the properties of normal curves, apply the Empirical Rule, and use normal tables and technology to find probabilities. These skills are essential for inference procedures later in the course.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

51. Z-Score
52. Calculating Z-Scores
53. Interpreting Z-Scores
54. Standardization
55. Comparing with Z-Scores
56. Normal Distribution
57. Parameters of Normal
58. Empirical Rule
59. 68-95-99.7 Rule
60. Standard Normal Curve
61. Normal Table
62. Finding Normal Probs
63. Inverse Normal Calcs
64. Normal Probability Plot
65. Assessing Normality
66. Density Curve
67. Area Under Curve
68. Technology for Normal

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Numerical Summaries](../04-numerical-summaries/index.md)

---

## Introduction: A Universal Language for Data

Imagine you scored 85 on your statistics exam and 78 on your history exam. Which performance was better? At first glance, the statistics score seems higher—but what if the statistics exam had a class average of 90 while the history exam averaged 65? Suddenly, that 78 in history looks pretty impressive!

This is the fundamental challenge we're solving in this chapter: **how do we compare values from different distributions?** The answer lies in a beautiful mathematical technique called **standardization**, and its partner, the elegant **normal distribution**.

"My tail's tingling—we're onto something big!" Sylvia adjusts her glasses. "When I was comparing acorn counts from different oak species, I had the same problem. A 'good' harvest from a red oak means something totally different than a 'good' harvest from a white oak. Once I learned about z-scores, everything clicked into place. Trust me, this is one of those superpower skills you'll use constantly."

By the end of this chapter, you'll be able to:

- Convert any value into a standardized z-score
- Compare values from completely different contexts
- Work with the normal distribution—one of nature's favorite patterns
- Find probabilities using the famous "bell curve"
- Assess whether your data follows a normal distribution

Let's crack this nut!

---

## Density Curves: Smoothing Out the Histogram

Before we dive into the normal distribution, we need to understand **density curves**. Remember how histograms show the distribution of data using bars? A density curve is like a smoothed-out version of a histogram—an idealized mathematical model of how data is distributed.

A **density curve** has two key properties:

- It's always on or above the horizontal axis (no negative heights)
- The total area under the curve equals exactly 1 (representing 100% of the data)

Think of it this way: if a histogram represents how your actual data is distributed, a density curve represents how the *population* might be distributed if you could collect infinite data. It's a theoretical model, but an incredibly useful one.

| Feature | Histogram | Density Curve |
|---------|-----------|---------------|
| Based on | Actual sample data | Mathematical model |
| Shape | Bars with widths | Smooth curve |
| Total area | Depends on bin width | Always equals 1 |
| Best for | Displaying real data | Calculating probabilities |

### Area Under the Curve

Here's where density curves become powerful: the **area under the curve** between any two values represents the proportion (or probability) of observations falling in that range.

For example, if the area under a density curve between 60 and 80 is 0.45, that means 45% of observations fall between 60 and 80. This connection between area and probability is fundamental to everything we'll do with normal distributions.

#### Diagram: Density Curve Area Explorer

<iframe src="../../sims/density-curve-area/main.html" height="352px" scrolling="no" style="width:100%; border: 1px solid #2E7D32;"></iframe>

[Run MicroSim Fullscreen](../../sims/density-curve-area/main.html){ .md-button .md-button--primary }
[Edit in p5.js Editor](https://editor.p5js.org/){ .md-button }

<details markdown="1">
<summary>Interactive Area Under Curve Visualization</summary>
Type: MicroSim

Learning objective: Students will understand that area under a density curve represents probability by shading regions and observing the corresponding proportions (Bloom: Understanding).

Visual elements:
- Smooth density curve (normal or other shapes available)
- Horizontal axis with numerical scale
- Shaded region between user-selected boundaries
- Area value displayed as decimal and percentage
- Reference lines at mean and standard deviation markers

Interactive controls:
- Two draggable vertical lines to define the shaded region
- Dropdown to select curve type (normal, uniform, skewed)
- Slider to adjust curve parameters (mean, spread)
- "Show full area = 1" toggle demonstrating total area property
- Reset button

Behavior:
- Area calculation updates in real-time as boundaries change
- Shaded region fills with semi-transparent color
- Display shows both exact area and percentage interpretation
- When boundaries encompass full curve, area displays as 1.00 (100%)

Canvas size: 700 x 350 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## Z-Scores: The Great Equalizer

A **z-score** (also called a standard score) tells you how many standard deviations a value is from the mean. It's the key to standardization—converting values from any distribution into a common scale.

The z-score formula is elegantly simple:

\[
z = \frac{x - \mu}{\sigma} \quad \text{(for populations)} \quad \text{or} \quad z = \frac{x - \bar{x}}{s} \quad \text{(for samples)}
\]

Where:

- \( x \) = the individual value you're standardizing
- \( \mu \) (or \( \bar{x} \)) = the mean
- \( \sigma \) (or \( s \)) = the standard deviation

The result tells you: "This value is *z* standard deviations away from the mean."

### Calculating Z-Scores

Let's work through an example. Suppose exam scores have a mean of 75 and a standard deviation of 8. What's the z-score for a student who scored 91?

\[
z = \frac{91 - 75}{8} = \frac{16}{8} = 2
\]

This student's score is **2 standard deviations above the mean**. That's impressive!

Now let's find the z-score for a student who scored 67:

\[
z = \frac{67 - 75}{8} = \frac{-8}{8} = -1
\]

This score is **1 standard deviation below the mean**. The negative sign tells us the value is below average.

| Original Score | Mean | Std Dev | Z-Score | Interpretation |
|----------------|------|---------|---------|----------------|
| 91 | 75 | 8 | +2.0 | 2 SDs above mean |
| 75 | 75 | 8 | 0 | Exactly at mean |
| 67 | 75 | 8 | -1.0 | 1 SD below mean |
| 83 | 75 | 8 | +1.0 | 1 SD above mean |
| 59 | 75 | 8 | -2.0 | 2 SDs below mean |

### Interpreting Z-Scores

Z-scores have intuitive interpretations:

- **z = 0:** The value equals the mean (perfectly average)
- **Positive z:** The value is above the mean
- **Negative z:** The value is below the mean
- **|z| > 2:** The value is somewhat unusual (more than 2 SDs from mean)
- **|z| > 3:** The value is quite rare (more than 3 SDs from mean)

"Here's a pro tip," Sylvia whispers. "When I'm comparing my acorn collections across different seasons, z-scores let me identify my truly exceptional days. Any day with a z-score above 2? That's a day I remember fondly. Below -2? Let's just say I treated myself to extra seeds that evening."

#### Diagram: Z-Score Calculator and Visualizer

<iframe src="../../sims/z-score-calculator/main.html" height="402px" scrolling="no" style="width:100%; border: 1px solid #2E7D32;"></iframe>

[Run MicroSim Fullscreen](../../sims/z-score-calculator/main.html){ .md-button .md-button--primary }
[Edit in p5.js Editor](https://editor.p5js.org/){ .md-button }

<details markdown="1">
<summary>Interactive Z-Score Calculator</summary>
Type: MicroSim

Learning objective: Students will calculate z-scores from raw data and interpret their meaning on a standardized scale (Bloom: Applying).

Visual elements:
- Input fields for: value (x), mean (μ), standard deviation (σ)
- Step-by-step calculation display showing the formula with values substituted
- Number line showing original scale on top, z-score scale below
- Visual indicator connecting the original value to its z-score position
- Color gradient: red for very negative, white for zero, blue for very positive

Interactive controls:
- Text inputs for x, mean, and standard deviation
- "Calculate" button (or real-time calculation)
- Preset examples dropdown: "Exam Scores", "Heights", "Temperatures"
- Toggle to show/hide calculation steps
- Slider to animate z-score changes as x varies

Behavior:
- Z-score updates in real-time as inputs change
- Formula displays with current values substituted
- Visual number line updates to show position
- Interpretation text updates: "This value is [z] standard deviations [above/below] the mean"
- Warning for unrealistic inputs (negative SD, etc.)

Canvas size: 750 x 400 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## Standardization: Creating a Common Scale

**Standardization** is the process of converting all values in a dataset to z-scores. When you standardize a distribution:

- The new mean becomes 0
- The new standard deviation becomes 1
- The shape of the distribution stays exactly the same

This transformation is incredibly powerful because it puts all data on the same scale, regardless of the original units or spread.

### Comparing with Z-Scores

Now we can answer our opening question! Let's say your statistics score was 85 (class mean 90, SD 5) and your history score was 78 (class mean 65, SD 10).

**Statistics z-score:**
\[
z = \frac{85 - 90}{5} = \frac{-5}{5} = -1.0
\]

**History z-score:**
\[
z = \frac{78 - 65}{10} = \frac{13}{10} = +1.3
\]

Even though 85 > 78, the z-scores reveal the truth: you performed 1.3 standard deviations *above* average in history, but 1 standard deviation *below* average in statistics. Your history performance was actually stronger relative to your classmates!

This is the power of z-scores: they enable **apples-to-apples comparisons** across completely different contexts.

| Subject | Raw Score | Class Mean | Class SD | Z-Score | Relative Performance |
|---------|-----------|------------|----------|---------|---------------------|
| Statistics | 85 | 90 | 5 | -1.0 | Below average |
| History | 78 | 65 | 10 | +1.3 | Above average |

"Acorn for your thoughts?" Sylvia asks. "Before z-scores, comparing my spring collection to my fall collection was meaningless—different weather, different tree conditions, different everything. But z-scores showed me that my best *relative* performance actually came during a drought year when I was 2.5 standard deviations above the seasonal average. Context matters!"

---

## The Normal Distribution: Nature's Favorite Curve

Now we meet the star of the show: the **normal distribution** (also called the Gaussian distribution or the "bell curve"). This symmetric, mound-shaped curve appears everywhere in nature and statistics:

- Heights and weights of people
- Measurement errors in scientific instruments
- Test scores on well-designed exams
- Blood pressure readings
- Manufacturing tolerances

The normal distribution is defined by two **parameters**:

- **μ (mu):** The mean, which determines the center
- **σ (sigma):** The standard deviation, which determines the spread

These two numbers completely specify a normal distribution. We write "X follows a normal distribution with mean μ and standard deviation σ" as:

\[
X \sim N(\mu, \sigma)
\]

For example, if adult male heights are normally distributed with mean 70 inches and standard deviation 3 inches, we write: Heights \( \sim N(70, 3) \).

### Properties of the Normal Curve

Every normal distribution shares these characteristics:

- **Symmetric** about the mean (left and right sides are mirror images)
- **Unimodal** (single peak at the mean)
- **Bell-shaped** (highest in the middle, tapering toward the tails)
- **Mean = Median = Mode** (all three measures of center are equal)
- The curve extends infinitely in both directions (theoretically)
- Total area under the curve equals 1

The spread is controlled entirely by σ:

- Larger σ → wider, flatter curve
- Smaller σ → narrower, taller curve

#### Diagram: Normal Distribution Parameter Explorer

<iframe src="../../sims/normal-distribution-explorer/main.html" height="402px" scrolling="no" style="width:100%; border: 1px solid #2E7D32;"></iframe>

[Run MicroSim Fullscreen](../../sims/normal-distribution-explorer/main.html){ .md-button .md-button--primary }
[Edit in p5.js Editor](https://editor.p5js.org/){ .md-button }

<details markdown="1">
<summary>Interactive Normal Curve Visualization</summary>
Type: MicroSim

Learning objective: Students will understand how the parameters μ and σ affect the shape and position of a normal distribution (Bloom: Understanding, Analyzing).

Visual elements:
- Normal curve plotted on coordinate axes
- Shaded area under the curve
- Vertical line marking the mean (μ)
- Horizontal markers showing μ ± σ, μ ± 2σ, μ ± 3σ
- Current parameter values displayed: μ = __, σ = __
- Grid lines for reference

Interactive controls:
- Slider for mean (μ): range -10 to 10, default 0
- Slider for standard deviation (σ): range 0.5 to 5, default 1
- Checkbox: Show μ ± σ markers
- Checkbox: Show μ ± 2σ markers
- Checkbox: Show μ ± 3σ markers
- Button: Reset to standard normal (μ=0, σ=1)
- Button: Overlay second curve for comparison

Behavior:
- Curve updates smoothly as sliders move
- When σ decreases, curve gets taller and narrower
- When σ increases, curve gets shorter and wider
- When μ changes, entire curve slides left or right
- Overlay mode shows two curves in different colors for comparison

Canvas size: 750 x 400 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## The Empirical Rule (68-95-99.7 Rule)

For any normal distribution, we know exactly what percentage of data falls within 1, 2, and 3 standard deviations of the mean. This is called the **Empirical Rule** or the **68-95-99.7 Rule**:

- **68%** of data falls within 1 standard deviation of the mean: \( \mu \pm \sigma \)
- **95%** of data falls within 2 standard deviations of the mean: \( \mu \pm 2\sigma \)
- **99.7%** of data falls within 3 standard deviations of the mean: \( \mu \pm 3\sigma \)

These aren't approximations—for truly normal data, these percentages are exact!

| Range | Percentage | Remaining in Tails |
|-------|------------|-------------------|
| μ ± 1σ | 68% | 32% (16% each tail) |
| μ ± 2σ | 95% | 5% (2.5% each tail) |
| μ ± 3σ | 99.7% | 0.3% (0.15% each tail) |

### Applying the Empirical Rule

**Example:** SAT scores are approximately normal with mean 1060 and standard deviation 195.

Using the Empirical Rule:

- 68% of scores fall between \( 1060 - 195 = 865 \) and \( 1060 + 195 = 1255 \)
- 95% of scores fall between \( 1060 - 2(195) = 670 \) and \( 1060 + 2(195) = 1450 \)
- 99.7% of scores fall between \( 1060 - 3(195) = 475 \) and \( 1060 + 3(195) = 1645 \)

What percentage of students score above 1450?

Since 95% fall between 670 and 1450, the remaining 5% are in the two tails. By symmetry, 2.5% score above 1450.

"Time to squirrel away a memory trick," Sylvia suggests. "I remember 68-95-99.7 by thinking: 68 is like 'six-eight,' which reminds me of one standard deviation. Then 95 for two, and 99.7 (almost all!) for three. It's not perfect, but it works for me!"

#### Diagram: Empirical Rule Interactive Demonstration

<iframe src="../../sims/empirical-rule/main.html" height="402px" scrolling="no" style="width:100%; border: 1px solid #2E7D32;"></iframe>

[Run MicroSim Fullscreen](../../sims/empirical-rule/main.html){ .md-button .md-button--primary }
[Edit in p5.js Editor](https://editor.p5js.org/){ .md-button }

<details markdown="1">
<summary>68-95-99.7 Rule Visualization</summary>
Type: MicroSim

Learning objective: Students will apply the Empirical Rule to find percentages within standard deviation ranges of a normal distribution (Bloom: Applying).

Visual elements:
- Normal curve with mean at center
- Color-coded regions:
  - Dark green: within 1 SD (68%)
  - Medium green: between 1 and 2 SDs (additional 27%)
  - Light green: between 2 and 3 SDs (additional 4.7%)
  - Very light: beyond 3 SDs (0.3%)
- Percentage labels in each region
- Scale showing actual values below, z-scores above

Interactive controls:
- Input fields for mean and standard deviation
- Buttons to highlight: "Within 1 SD", "Within 2 SD", "Within 3 SD"
- Toggle to show cumulative percentages vs. region percentages
- "Quiz me" mode: given a range, student guesses the percentage
- Preset scenarios: SAT scores, heights, temperatures

Behavior:
- When SD range is selected, that region pulses and displays percentage
- Actual values on scale update when mean/SD change
- Quiz mode: reveal answer after student submits guess
- Show running score in quiz mode

Canvas size: 800 x 400 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## The Standard Normal Distribution

The **standard normal distribution** is a special normal distribution with mean 0 and standard deviation 1:

\[
Z \sim N(0, 1)
\]

We use the capital letter Z (rather than X) to indicate a standard normal variable. Any normal distribution can be converted to the standard normal by calculating z-scores—this is why z-scores are so powerful!

The standard normal distribution is our reference. All the tables and technology tools are calibrated to it, so we convert our problems to standard normal form, find the answer, and convert back if needed.

### Using the Normal Table

A **normal table** (also called a z-table) gives the area under the standard normal curve to the *left* of any z-value. This area represents the proportion of observations less than that z-score.

**Reading the table:**
1. Find your z-score (e.g., z = 1.25)
2. Look up the row for 1.2 and the column for .05
3. The table entry is the area to the left of z = 1.25

For z = 1.25, the table shows approximately 0.8944, meaning 89.44% of values in a standard normal distribution are less than z = 1.25.

**Common z-values to memorize:**

| Z-Score | Area to Left | Area to Right |
|---------|--------------|---------------|
| -3 | 0.0013 | 0.9987 |
| -2 | 0.0228 | 0.9772 |
| -1 | 0.1587 | 0.8413 |
| 0 | 0.5000 | 0.5000 |
| +1 | 0.8413 | 0.1587 |
| +2 | 0.9772 | 0.0228 |
| +3 | 0.9987 | 0.0013 |

---

## Finding Normal Probabilities

The process for finding probabilities (areas) under a normal curve follows a consistent pattern:

**Step 1:** Draw and label a normal curve with the given μ and σ

**Step 2:** Mark the value(s) of interest and shade the desired region

**Step 3:** Convert to z-scores using \( z = \frac{x - \mu}{\sigma} \)

**Step 4:** Use a table or technology to find the area

**Step 5:** Interpret in context

### Types of Probability Questions

**Type 1: Find P(X < a) — "less than"**

Shade the region to the left of a. The table gives this directly.

**Type 2: Find P(X > a) — "greater than"**

Shade the region to the right of a. Since the table gives left areas:
\[
P(X > a) = 1 - P(X < a)
\]

**Type 3: Find P(a < X < b) — "between"**

Shade the region between a and b. Find:
\[
P(a < X < b) = P(X < b) - P(X < a)
\]

### Worked Example

Adult women's heights are normally distributed with mean 64.5 inches and standard deviation 2.5 inches. What proportion of women are between 62 and 67 inches tall?

**Step 1-2:** Draw the curve, mark 62 and 67, shade between them.

**Step 3:** Convert to z-scores:
\[
z_{62} = \frac{62 - 64.5}{2.5} = \frac{-2.5}{2.5} = -1.0
\]
\[
z_{67} = \frac{67 - 64.5}{2.5} = \frac{2.5}{2.5} = +1.0
\]

**Step 4:** Find areas:
- P(Z < 1.0) = 0.8413
- P(Z < -1.0) = 0.1587
- P(-1 < Z < 1) = 0.8413 - 0.1587 = 0.6826

**Step 5:** About **68.26%** of women are between 62 and 67 inches tall.

(Notice this matches the Empirical Rule: within 1 SD of the mean contains about 68% of the data!)

#### Diagram: Normal Probability Calculator

<iframe src="../../sims/normal-probability-calc/main.html" height="432px" scrolling="no" style="width:100%; border: 1px solid #2E7D32;"></iframe>

[Run MicroSim Fullscreen](../../sims/normal-probability-calc/main.html){ .md-button .md-button--primary }
[Edit in p5.js Editor](https://editor.p5js.org/){ .md-button }

<details markdown="1">
<summary>Step-by-Step Normal Probability Finder</summary>
Type: MicroSim

Learning objective: Students will calculate probabilities for normal distributions by converting to z-scores and finding areas under the curve (Bloom: Applying, Analyzing).

Visual elements:
- Normal curve with adjustable mean and standard deviation
- Shaded region showing the probability being calculated
- Display of both original scale and z-score scale
- Step-by-step solution panel showing:
  1. Problem setup (μ, σ, target value)
  2. Z-score calculation with formula
  3. Table lookup or area calculation
  4. Final probability with interpretation

Interactive controls:
- Input fields for μ (mean) and σ (standard deviation)
- Input field(s) for boundary values
- Radio buttons: P(X < a), P(X > a), P(a < X < b)
- "Solve step by step" button (shows one step at a time)
- "Show full solution" button
- "New problem" button generating random scenarios

Behavior:
- Curve and shading update as inputs change
- Each step highlights the relevant calculation
- Z-score calculation shows formula with values substituted
- Final answer shown with interpretation sentence
- Option to generate practice problems

Canvas size: 850 x 500 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## Inverse Normal Calculations

Sometimes we work backwards: instead of finding a probability given a value, we find a value given a probability. These are called **inverse normal calculations**.

**Example:** What height separates the tallest 10% of women from the rest?

We want to find x such that P(X > x) = 0.10, which means P(X < x) = 0.90.

**Step 1:** Find the z-score with area 0.90 to its left. Looking in the table body for 0.90, we find z ≈ 1.28.

**Step 2:** Convert z back to x:

Since \( z = \frac{x - \mu}{\sigma} \), we can solve for x:
\[
x = \mu + z \cdot \sigma = 64.5 + (1.28)(2.5) = 64.5 + 3.2 = 67.7 \text{ inches}
\]

Women 67.7 inches (about 5'8") or taller are in the top 10% for height.

### The Inverse Normal Process

1. Identify the probability (area) given in the problem
2. Determine whether the area is to the left or right
3. If area is to the right, convert: area to left = 1 - area to right
4. Find the corresponding z-score from the table (look in the body of the table)
5. Convert z to x using: \( x = \mu + z \cdot \sigma \)

**Common inverse problems:**

| Phrase in Problem | What to Find |
|-------------------|--------------|
| "Top 5%" | z with area 0.95 to left |
| "Bottom 10%" | z with area 0.10 to left |
| "Middle 90%" | z-values at 0.05 and 0.95 |
| "Highest 1%" | z with area 0.99 to left |

---

## Technology for Normal Calculations

While normal tables are important to understand, most real-world calculations use technology. Here's how to use common tools:

**TI-83/84 Calculator:**

- `normalcdf(lower, upper, μ, σ)` — finds P(lower < X < upper)
- `invNorm(area, μ, σ)` — finds x-value for given left-tail area

**For P(X < 65) with μ = 70, σ = 5:**
`normalcdf(-1E99, 65, 70, 5)` returns 0.1587

**For the value at the 90th percentile:**
`invNorm(0.90, 70, 5)` returns 76.41

**Online Tools and Software:**

Most statistical software (R, Python, Excel) has normal distribution functions. The concepts are identical—just the syntax differs.

"Don't worry if tables feel clunky at first," Sylvia reassures. "I still use my calculator for serious calculations. But understanding the table helps you know what the technology is actually doing. Plus, tables don't need batteries!"

---

## Assessing Normality

Before using normal distribution methods, we should check whether our data is approximately normal. There are several approaches:

### Visual Methods

**1. Histogram:** Does it look roughly symmetric and bell-shaped?

**2. Boxplot:** Is the median near the center of the box? Are the whiskers roughly equal length?

**3. Normal Probability Plot:** This is the most reliable visual method.

### Normal Probability Plots

A **normal probability plot** (also called a QQ plot) graphs each data value against the z-score it would have if the data were perfectly normal. If the data is normally distributed, the points will fall approximately along a straight line.

**Reading a normal probability plot:**

- **Points follow a straight line:** Data is approximately normal
- **Points curve upward at ends:** Data is right-skewed (heavier right tail)
- **Points curve downward at ends:** Data is left-skewed (heavier left tail)
- **S-shaped pattern:** Data has lighter tails than normal
- **Scattered points:** Data may not follow any standard distribution

#### Diagram: Normal Probability Plot Explorer

<iframe src="../../sims/normal-probability-plot/main.html" height="402px" scrolling="no" style="width:100%; border: 1px solid #2E7D32;"></iframe>

[Run MicroSim Fullscreen](../../sims/normal-probability-plot/main.html){ .md-button .md-button--primary }
[Edit in p5.js Editor](https://editor.p5js.org/){ .md-button }

<details markdown="1">
<summary>Interactive Normality Assessment Tool</summary>
Type: MicroSim

Learning objective: Students will assess whether data follows a normal distribution by interpreting histograms and normal probability plots (Bloom: Analyzing, Evaluating).

Visual elements:
- Left panel: Histogram of the dataset
- Right panel: Normal probability plot (QQ plot)
- Reference line on QQ plot showing perfect normality
- Summary statistics displayed: mean, SD, skewness
- "Normality verdict" indicator

Interactive controls:
- Dropdown to select dataset type:
  - "Approximately Normal"
  - "Right Skewed"
  - "Left Skewed"
  - "Heavy Tails"
  - "Light Tails"
  - "Uniform"
  - "Bimodal"
- Sample size slider (20 to 200)
- "Generate new sample" button
- Toggle: Show/hide reference line
- Toggle: Show/hide ideal normal overlay on histogram

Behavior:
- Both plots update simultaneously when dataset changes
- For normal data, QQ plot points cluster around the line
- For skewed data, characteristic curved patterns appear
- Verdict updates with explanation: "Data appears [normal/non-normal] because..."
- Multiple samples can be generated to see sampling variation

Canvas size: 900 x 400 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

### When Is "Close Enough" Normal?

Real data is never *perfectly* normal, so we look for "approximately normal" patterns:

- Small samples (n < 30): Look for no extreme skewness or outliers
- Moderate samples (30 ≤ n < 100): Mild skewness is acceptable
- Large samples (n ≥ 100): Normal methods are robust even with moderate non-normality

The Central Limit Theorem (coming in a later chapter!) explains why normal methods work even when individual observations aren't normal, as long as our samples are large enough.

---

## Putting It All Together: Complete Examples

### Example 1: Manufacturing Quality Control

A machine fills bottles with 16.0 oz of soda. The actual amounts are normally distributed with mean 16.1 oz and standard deviation 0.15 oz.

**a) What percentage of bottles contain less than 16.0 oz?**

\[
z = \frac{16.0 - 16.1}{0.15} = \frac{-0.1}{0.15} = -0.67
\]

P(Z < -0.67) ≈ 0.2514

About **25.1%** of bottles are underfilled.

**b) What fill amount separates the lowest 5% of bottles?**

Find z with area 0.05 to left: z ≈ -1.645

\[
x = 16.1 + (-1.645)(0.15) = 16.1 - 0.247 = 15.85 \text{ oz}
\]

The lowest 5% of bottles contain less than **15.85 oz**.

### Example 2: Comparing Standardized Test Scores

Maria scored 680 on the SAT (μ = 1060, σ = 195) and 29 on the ACT (μ = 21, σ = 5). Which score is relatively better?

**SAT z-score:**
\[
z = \frac{680 - 1060}{195} = \frac{-380}{195} = -1.95
\]

**ACT z-score:**
\[
z = \frac{29 - 21}{5} = \frac{8}{5} = +1.60
\]

Maria's ACT score (z = +1.60) is much stronger than her SAT score (z = -1.95). Her ACT performance is 1.6 standard deviations *above* average, while her SAT is nearly 2 standard deviations *below* average.

---

## Key Takeaways

"Time to squirrel away the big ideas!"

- **Z-scores** measure how many standard deviations a value is from the mean: \( z = \frac{x - \mu}{\sigma} \)

- **Standardization** converts any distribution to a common scale (mean 0, SD 1), enabling meaningful comparisons

- **Density curves** are smooth mathematical models; the area under the curve represents probability

- **Normal distributions** are symmetric, bell-shaped curves defined by μ and σ

- The **Empirical Rule (68-95-99.7)** gives exact percentages within 1, 2, and 3 standard deviations for normal distributions

- The **standard normal** (Z ~ N(0,1)) is our reference distribution for calculations

- **Forward problems:** Given x, find probability using \( z = \frac{x - \mu}{\sigma} \) and look up area

- **Inverse problems:** Given probability, find z from table, then calculate \( x = \mu + z \cdot \sigma \)

- **Normal probability plots** help assess whether data follows a normal distribution—look for points along a straight line

- **Technology** makes calculations faster, but understanding the underlying process is essential

---

## Practice Problems

1. The mean score on a psychology exam is 72 with standard deviation 9. Calculate the z-score for a student who scored 63. Interpret this z-score.

2. Adult male heights are normally distributed with μ = 70 inches and σ = 3 inches.
   - What percentage of men are shorter than 67 inches?
   - What percentage are between 67 and 76 inches?
   - How tall must a man be to be in the top 5%?

3. Two students are comparing their performances. Student A scored 85 on a test with mean 78 and SD 6. Student B scored 92 on a different test with mean 85 and SD 10. Who performed better relative to their class?

4. A normal probability plot of exam scores shows a clear curved pattern—the points bend upward at the right end. What does this tell you about the distribution of scores?

5. Use the Empirical Rule: If IQ scores are normally distributed with mean 100 and SD 15, what percentage of people have IQs between 85 and 130?

---

Congratulations! You've mastered one of the most important tools in all of statistics. The normal distribution and z-scores will appear again and again—in sampling distributions, confidence intervals, and hypothesis testing. This foundation will serve you well!

"Now *that's* a data point worth collecting!" Sylvia beams. "You just learned to speak the universal language of statistics. Whether you're analyzing test scores, heights, or—yes—acorn counts, you've got the tools to make meaningful comparisons. Onward to new adventures!"
