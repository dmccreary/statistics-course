---
title: Chi-Square and Regression Inference
description: Master chi-square tests for categorical data and inference techniques for regression slopes
generated_by: claude skill chapter-content-generator
date: 2026-02-06 22:35:38
version: 0.04
---

# Chi-Square and Regression Inference

## Summary

This chapter covers chi-square tests and inference for regression. Students will learn to perform goodness-of-fit tests, tests for homogeneity, and tests for independence using chi-square distributions. The chapter also covers inference for the slope of a regression line, including conditions and interpretation.

## Concepts Covered

This chapter covers the following 22 concepts from the learning graph:

265. Chi-Square Distribution
266. Chi-Square Statistic
267. Goodness-of-Fit Test
268. GOF Hypotheses
269. Expected Counts
270. Observed Counts
271. Calculating Chi-Square
272. Conditions for Chi-Square
273. GOF Conclusion
274. Test for Homogeneity
275. Homogeneity Setup
276. Test for Independence
277. Independence Setup
278. Chi-Square Conclusion
279. Inference for Slope
282. T-Interval for Slope
283. T-Test for Slope
285. Conditions for Regression
286. Linearity Condition
287. Independence Condition
288. Normality of Residuals
289. Equal Variance Condition

## Prerequisites

This chapter builds on concepts from:

- [Chapter 7: Linear Regression](../07-linear-regression/index.md)
- [Chapter 16: Hypothesis Testing](../16-hypothesis-testing/index.md)
- [Chapter 17: Inference for Means](../17-inference-for-means/index.md)

---

## Introduction: Two Powerful Inference Tools

Welcome to what might be the most versatile chapter in your AP Statistics journey! We're going to explore two incredibly useful inference techniques that you'll encounter constantly in real research: chi-square tests for categorical data and inference for regression slopes. These tools let us answer questions that our previous methods simply couldn't handle.

Think about it this way: up until now, we've been working with quantitative data and proportions. But what happens when you want to test whether the distribution of M&M colors in a bag matches what the company claims? Or whether there's a relationship between political party affiliation and opinion on climate change? Or whether the slope of a regression line is significantly different from zero? That's where chi-square tests and regression inference come to the rescue.

As Sylvia likes to say, "My tail's tingling—we're onto something!" These techniques open up a whole new world of statistical analysis. Let's crack this nut!

## Part 1: The Chi-Square Distribution

Before we can run chi-square tests, we need to understand the distribution that makes them possible. The **chi-square distribution** (pronounced "ky-square" and written \(\chi^2\)) is a probability distribution that arises naturally when we work with categorical data.

### What Makes Chi-Square Special?

The chi-square distribution has some distinctive properties that set it apart from the normal and t-distributions we've worked with before:

- It only takes non-negative values (you can't have a negative chi-square statistic)
- It's right-skewed, with a long tail extending toward larger values
- Its shape depends on a parameter called **degrees of freedom** (df)
- As degrees of freedom increase, the distribution becomes more symmetric and approaches a normal distribution

| Degrees of Freedom | Shape | Mean | Spread |
|-------------------|-------|------|--------|
| 1 | Highly right-skewed | 1 | Narrow |
| 5 | Moderately right-skewed | 5 | Medium |
| 10 | Slightly right-skewed | 10 | Wider |
| 30+ | Nearly symmetric | df | Wide |

The mean of a chi-square distribution equals its degrees of freedom, which gives us a handy reference point. If we calculate a chi-square statistic that's much larger than the degrees of freedom, that suggests our observed data differs substantially from what we'd expect.

#### Diagram: Chi-Square Distribution Shapes

<iframe src="../../sims/chi-square-distribution-shapes/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden; border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

<details markdown="1">
<summary>Chi-Square Distribution Shapes Interactive Visualization</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Compare, contrast

Learning Objective: Students will compare how the chi-square distribution's shape changes with different degrees of freedom, helping them understand why larger chi-square values are more extreme.

Instructional Rationale: Comparing multiple distributions side-by-side helps students understand the parameter's effect on shape. A slider allows exploration without overwhelming animation.

Visual Elements:
- Single coordinate system showing chi-square distributions
- X-axis: Chi-square values from 0 to 30
- Y-axis: Probability density
- Multiple colored curves showing df = 2, 5, 10, 15, 20
- Vertical dashed line showing the mean for selected df
- Shaded critical region in the right tail

Interactive Controls:
- Slider: Degrees of freedom (1 to 30)
- Dropdown: Show single distribution or multiple for comparison
- Checkbox: Show/hide critical value shading (alpha = 0.05)
- Display: Current mean and critical value

Canvas Layout:
- Drawing area: 500px width, 350px height
- Controls below the graph
- Legend showing color coding for each df value

Default Parameters:
- Degrees of freedom: 5
- Show multiple distributions: enabled
- Critical value shading: enabled

Implementation: p5.js with canvas-based controls
</details>

### When Do We Use Chi-Square?

Chi-square tests are our go-to tools when we're working with **categorical data**—data that falls into distinct groups or categories rather than being measured on a numerical scale. We'll use chi-square tests for three main purposes:

1. **Goodness-of-fit tests**: Does our observed distribution match an expected distribution?
2. **Tests for homogeneity**: Are the distributions the same across different populations?
3. **Tests for independence**: Are two categorical variables related or independent?

!!! tip "Sylvia's Study Tip"
    Here's a quick way to remember when to use chi-square: if you're counting things in categories (like M&M colors or survey responses), chi-square is probably your friend!

## Part 2: Observed and Expected Counts

At the heart of every chi-square test is a comparison between what we **observed** in our data and what we **expected** to observe if some hypothesis were true.

### Observed Counts

**Observed counts** are simply the actual counts we collect from our data. If you survey 200 students about their favorite pizza topping and count how many chose pepperoni, cheese, veggie, or other, those are your observed counts. Nothing fancy here—just counting what you see.

### Expected Counts

**Expected counts** are the counts we would expect to see if our null hypothesis were true. This is where things get interesting! The way we calculate expected counts depends on which type of chi-square test we're running:

For a goodness-of-fit test:

\[
\text{Expected count} = n \times p_i
\]

where \(n\) is the total sample size and \(p_i\) is the hypothesized proportion for category \(i\).

For tests of homogeneity and independence:

\[
\text{Expected count} = \frac{\text{(row total)} \times \text{(column total)}}{\text{grand total}}
\]

Let's look at a concrete example. Suppose a candy company claims their bags contain 20% red, 25% orange, 20% yellow, 15% green, and 20% blue candies. You buy a bag with 100 candies and find: 24 red, 20 orange, 18 yellow, 22 green, and 16 blue.

| Color | Observed | Expected (100 × proportion) |
|-------|----------|---------------------------|
| Red | 24 | 20 |
| Orange | 20 | 25 |
| Yellow | 18 | 20 |
| Green | 22 | 15 |
| Blue | 16 | 20 |
| **Total** | **100** | **100** |

The expected counts represent what a "perfect" bag would look like if it exactly matched the company's claimed proportions. Our observed counts deviate from these expectations—but is this deviation due to random chance, or is something more going on?

## Part 3: The Chi-Square Statistic

The **chi-square statistic** measures how far our observed counts are from our expected counts. The formula is:

\[
\chi^2 = \sum \frac{(O - E)^2}{E}
\]

where:
- \(O\) = observed count for each category
- \(E\) = expected count for each category
- The sum is taken over all categories

Let's break down why this formula makes sense:

1. **(O - E)**: We find the difference between observed and expected
2. **(O - E)²**: We square it so negative and positive differences don't cancel out
3. **÷ E**: We divide by expected to standardize (a difference of 5 means more when we expected 10 than when we expected 100)
4. **∑**: We add up all these standardized squared differences

#### Diagram: Chi-Square Calculation Breakdown

<iframe src="../../sims/chi-square-calculation/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden; border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

<details markdown="1">
<summary>Chi-Square Calculation Step-by-Step Visualization</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Calculate, demonstrate

Learning Objective: Students will practice calculating chi-square statistics by working through each component of the formula with visual feedback.

Instructional Rationale: Breaking down the calculation into visible steps with concrete numbers helps students understand what each part of the formula contributes to the final statistic.

Data Visibility Requirements:
- Stage 1: Show observed and expected counts side by side in a table
- Stage 2: Show (O - E) for each category with color coding (positive = green, negative = red)
- Stage 3: Show (O - E)² for each category
- Stage 4: Show (O - E)²/E for each category
- Stage 5: Show sum of all contributions = final chi-square statistic

Visual Elements:
- Bar chart comparing observed (solid) vs expected (striped) counts
- Calculation table showing each step
- Running total accumulator for chi-square statistic
- Color-coded contributions (larger contributions highlighted)

Interactive Controls:
- Input fields for observed counts (editable)
- Button: "Calculate Step by Step"
- Button: "Reset to Example"
- Slider: Animation speed for step-through

Canvas Layout:
- Top: Bar chart (400px height)
- Bottom: Calculation table
- Right: Running total display

Default Parameters:
- Pre-loaded with candy color example
- Animation speed: medium

Implementation: p5.js with canvas-based controls and step-through animation
</details>

### A Worked Example

Using our candy data, let's calculate the chi-square statistic:

| Color | O | E | O - E | (O - E)² | (O - E)²/E |
|-------|---|---|-------|----------|------------|
| Red | 24 | 20 | 4 | 16 | 0.80 |
| Orange | 20 | 25 | -5 | 25 | 1.00 |
| Yellow | 18 | 20 | -2 | 4 | 0.20 |
| Green | 22 | 15 | 7 | 49 | 3.27 |
| Blue | 16 | 20 | -4 | 16 | 0.80 |

\[
\chi^2 = 0.80 + 1.00 + 0.20 + 3.27 + 0.80 = 6.07
\]

Notice that green contributed the most to our chi-square statistic (3.27 out of 6.07). This tells us the green category had the largest departure from expectations—we observed 22 when we expected only 15.

## Part 4: Conditions for Chi-Square Tests

Before we can trust the results of any chi-square test, we need to verify that certain conditions are met. These conditions ensure that our chi-square statistic actually follows a chi-square distribution.

### The Three Conditions

1. **Random**: The data must come from a random sample or randomized experiment
   - This ensures our sample is representative and results can be generalized

2. **Independent**: Observations must be independent of each other
   - For sampling without replacement, check the 10% condition: sample size should be less than 10% of the population

3. **Large Counts**: All expected counts must be at least 5
   - This ensures the chi-square approximation is valid
   - Check EVERY expected count, not just the observed counts

!!! warning "Common Mistake Alert"
    Sylvia has seen many students check the observed counts instead of the expected counts for the large counts condition. Don't make this mistake! The condition specifically requires **expected** counts ≥ 5.

### What If Conditions Aren't Met?

If the large counts condition isn't satisfied, you have several options:

- Combine categories that are conceptually similar
- Collect more data (if possible)
- Use an alternative test like Fisher's exact test (beyond AP Statistics)
- Acknowledge the limitation in your conclusion

## Part 5: Goodness-of-Fit Test

The **goodness-of-fit test** (often abbreviated as GOF test) determines whether a sample distribution matches a claimed or hypothesized distribution. It's called "goodness-of-fit" because we're testing how well our observed data "fits" the expected pattern.

### Setting Up GOF Hypotheses

The hypotheses for a goodness-of-fit test are:

- **H₀**: The population distribution matches the claimed/hypothesized distribution
- **Hₐ**: The population distribution does NOT match the claimed/hypothesized distribution

For our candy example:
- **H₀**: The color proportions are 20% red, 25% orange, 20% yellow, 15% green, 20% blue
- **Hₐ**: At least one of these proportions is different

Notice that the alternative hypothesis is always two-sided in a goodness-of-fit test—we're looking for ANY departure from the expected distribution, not a specific direction of change.

### Degrees of Freedom for GOF

For a goodness-of-fit test:

\[
\text{df} = (\text{number of categories}) - 1
\]

Why subtract 1? Because once we know the counts for all but one category, the last count is determined (they must sum to n). In our candy example with 5 colors, df = 5 - 1 = 4.

### Completing the GOF Test

Let's finish our candy example. We calculated \(\chi^2 = 6.07\) with df = 4.

Using a chi-square table or calculator, we find the p-value:
- P(\(\chi^2\) > 6.07 | df = 4) ≈ 0.194

Since 0.194 > 0.05 (using α = 0.05), we fail to reject the null hypothesis.

**Conclusion**: We do not have convincing evidence that the candy company's claimed color distribution is incorrect. The differences we observed could reasonably be due to random variation.

#### Diagram: Goodness-of-Fit Test Simulator

<iframe src="../../sims/gof-test-simulator/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden; border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

<details markdown="1">
<summary>Interactive Goodness-of-Fit Test Simulator</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Execute, practice

Learning Objective: Students will conduct complete goodness-of-fit tests by entering observed counts and hypothesized proportions, then interpreting the results.

Instructional Rationale: An interactive simulator allows students to practice the complete GOF test workflow with immediate feedback on their calculations and conclusions.

Visual Elements:
- Input table for observed counts (3-8 categories)
- Input fields for hypothesized proportions
- Bar chart showing observed vs expected
- Chi-square distribution with test statistic marked
- Shaded p-value region
- Results panel showing chi-square, df, p-value

Interactive Controls:
- Dropdown: Number of categories (3 to 8)
- Text inputs: Category names
- Number inputs: Observed counts
- Number inputs: Hypothesized proportions (must sum to 1)
- Button: "Run Test"
- Radio buttons: Significance level (0.01, 0.05, 0.10)
- Button: "Load Example" with preset scenarios

Canvas Layout:
- Left panel: Data entry (300px)
- Right panel: Visualization and results (400px)
- Bottom: Written conclusion template

Default Parameters:
- 5 categories
- Pre-loaded with candy example
- Significance level: 0.05

Example Scenarios to Load:
1. Candy colors (company claim)
2. Dice fairness test
3. Birth day of week distribution
4. Mendel's pea genetics

Implementation: p5.js with canvas-based controls
</details>

## Part 6: Tests for Homogeneity

While goodness-of-fit tests compare one sample to a hypothesized distribution, **tests for homogeneity** compare distributions across multiple populations or groups. The question becomes: "Do these different groups have the same distribution of responses?"

### Homogeneity Setup

A homogeneity test typically involves:
- Multiple populations or groups (the columns)
- One categorical variable with multiple outcomes (the rows)
- Independent random samples from each population

For example, we might survey students from three different high schools and ask whether they plan to attend a 4-year college, community college, vocational school, or not pursue higher education. The test for homogeneity would tell us whether the distribution of educational plans is the same across all three schools.

### The Two-Way Table

Data for homogeneity tests is organized in a **two-way table** (also called a contingency table):

| Educational Plan | School A | School B | School C | Row Total |
|-----------------|----------|----------|----------|-----------|
| 4-year college | 85 | 72 | 91 | 248 |
| Community college | 42 | 58 | 39 | 139 |
| Vocational | 15 | 25 | 12 | 52 |
| No higher ed | 8 | 15 | 8 | 31 |
| **Column Total** | **150** | **170** | **150** | **470** |

### Hypotheses for Homogeneity

- **H₀**: The distribution of [response variable] is the same across all [populations]
- **Hₐ**: The distribution of [response variable] is NOT the same across all [populations]

For our example:
- **H₀**: The distribution of educational plans is the same for students at all three schools
- **Hₐ**: The distribution of educational plans differs among the three schools

### Calculating Expected Counts

For each cell in a two-way table:

\[
E = \frac{(\text{row total}) \times (\text{column total})}{\text{grand total}}
\]

This formula works because under the null hypothesis (same distribution for all groups), the expected proportion in each row should be the same for every column.

For the "4-year college, School A" cell:

\[
E = \frac{248 \times 150}{470} = 79.15
\]

### Degrees of Freedom for Two-Way Tables

\[
\text{df} = (\text{rows} - 1) \times (\text{columns} - 1)
\]

For our table with 4 rows and 3 columns: df = (4 - 1)(3 - 1) = 3 × 2 = 6

## Part 7: Tests for Independence

The **test for independence** looks superficially similar to the homogeneity test—it also uses a two-way table and the same chi-square formula. However, there's a crucial conceptual difference:

| Feature | Homogeneity Test | Independence Test |
|---------|------------------|-------------------|
| Sampling | Separate samples from each population | One sample, two variables measured |
| Question | Same distribution across groups? | Are the two variables related? |
| Design | Compare predetermined groups | Explore relationship |

### Independence Setup

For an independence test, we take ONE random sample and measure TWO categorical variables on each subject. We then test whether these variables are associated or independent.

For example, surveying 500 randomly selected adults about:
- Their exercise frequency (daily, weekly, rarely, never)
- Their self-reported stress level (low, moderate, high)

### Hypotheses for Independence

- **H₀**: There is no association between [Variable 1] and [Variable 2] in the population (the variables are independent)
- **Hₐ**: There is an association between [Variable 1] and [Variable 2] in the population

For our example:
- **H₀**: Exercise frequency and stress level are independent
- **Hₐ**: Exercise frequency and stress level are associated

The calculations for expected counts, chi-square statistic, and degrees of freedom are identical to the homogeneity test. The interpretation, however, focuses on association rather than comparing distributions.

#### Diagram: Homogeneity vs Independence Comparison

<iframe src="../../sims/homogeneity-vs-independence/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden; border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

<details markdown="1">
<summary>Comparing Homogeneity and Independence Tests</summary>
Type: infographic

Bloom Level: Analyze (L4)
Bloom Verb: Differentiate, distinguish

Learning Objective: Students will distinguish between tests for homogeneity and tests for independence by comparing their setups, hypotheses, and interpretations.

Purpose: Help students understand when to use each test type based on study design

Layout: Side-by-side comparison with interactive elements

Left Panel - Homogeneity:
- Visual: Multiple groups shown as separate boxes, each sampled independently
- Arrow pointing to same categorical variable measured in each
- Example: "3 schools, asking each about college plans"
- Key phrase: "Same distribution across groups?"

Right Panel - Independence:
- Visual: One population box, two variables branching out
- Shows single sample with two questions asked
- Example: "One sample, asking about exercise AND stress"
- Key phrase: "Are variables associated?"

Interactive Elements:
- Hover over each element for detailed explanations
- Click examples to see hypothesis statements
- Toggle between visual and text descriptions
- Quiz mode: Given a scenario, identify which test applies

Color Coding:
- Blue: Homogeneity test elements
- Green: Independence test elements
- Orange: Shared elements (chi-square formula, expected count formula)

Implementation: HTML/CSS/JavaScript with hover interactions
</details>

## Part 8: Chi-Square Conclusions

Regardless of which chi-square test you're performing, the conclusion follows the same pattern. Let's walk through how to draw and communicate your conclusions effectively.

### The Four-Step Process

1. **State the test and check conditions**
   - Identify: "I will perform a chi-square test for [GOF/homogeneity/independence]"
   - Verify: Random, Independent, Large Counts (all expected ≥ 5)

2. **Calculate the test statistic and p-value**
   - Compute all expected counts
   - Calculate \(\chi^2 = \sum \frac{(O-E)^2}{E}\)
   - Find p-value using df = (k-1) for GOF or df = (r-1)(c-1) for two-way tables

3. **Make a decision**
   - If p-value ≤ α: Reject H₀
   - If p-value > α: Fail to reject H₀

4. **State conclusion in context**
   - Use language appropriate to your decision
   - Connect back to the original question
   - Mention practical implications if relevant

### Template Conclusions

**When rejecting H₀ (significant result):**
> "Because the p-value of [p-value] is less than α = [significance level], we reject the null hypothesis. We have convincing evidence that [restate Hₐ in context]."

**When failing to reject H₀:**
> "Because the p-value of [p-value] is greater than α = [significance level], we fail to reject the null hypothesis. We do not have convincing evidence that [restate Hₐ in context]."

### Follow-Up Analysis

When you reject H₀ in a chi-square test, it's often helpful to examine which categories contributed most to the chi-square statistic. Calculate the individual components \(\frac{(O-E)^2}{E}\) and identify the largest contributors—these indicate where the observed data departed most dramatically from expectations.

!!! note "Acorn for Your Thoughts"
    Sylvia reminds you: "A significant chi-square result tells you THAT something differs, but not exactly WHAT or WHY. Always follow up with exploratory analysis to understand the nature of the difference!"

## Part 9: Inference for Regression Slope

Now we shift gears from categorical data to regression. In Chapter 7, you learned how to find the least-squares regression line \(\hat{y} = a + bx\). But how do we know if the slope \(b\) we calculated reflects a real relationship in the population, or if it could have occurred by chance?

**Inference for slope** answers this question by constructing confidence intervals and hypothesis tests for the population slope parameter \(\beta\).

### The Regression Model

When we perform inference for regression, we assume the following model:

\[
y = \alpha + \beta x + \varepsilon
\]

where:
- \(\alpha\) = population y-intercept
- \(\beta\) = population slope (the true slope we're trying to estimate)
- \(\varepsilon\) = random error term (normally distributed with mean 0)

Our sample statistics \(a\) and \(b\) are estimates of the population parameters \(\alpha\) and \(\beta\).

### Why Test the Slope?

The slope \(b\) tells us how much y changes, on average, for each one-unit increase in x. If \(\beta = 0\), that means x has no linear relationship with y—knowing x tells us nothing about y. So our typical hypotheses are:

- **H₀**: \(\beta = 0\) (no linear relationship)
- **Hₐ**: \(\beta \neq 0\) (there IS a linear relationship)

We can also test one-sided alternatives (\(\beta > 0\) or \(\beta < 0\)) when we have directional predictions.

#### Diagram: Sample Slope Variability

<iframe src="../../sims/slope-sampling-distribution/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden; border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

<details markdown="1">
<summary>Visualizing Sampling Distribution of the Slope</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain, interpret

Learning Objective: Students will understand that the sample slope varies from sample to sample and follows a t-distribution under repeated sampling.

Instructional Rationale: Seeing multiple samples and their regression lines helps students viscerally understand sampling variability and why we need inference procedures.

Data Visibility Requirements:
- Stage 1: Show population regression line (true slope β)
- Stage 2: Draw one random sample, show sample regression line
- Stage 3: Record sample slope b
- Stage 4: Repeat many times, build histogram of sample slopes
- Stage 5: Show t-distribution overlay on histogram

Visual Elements:
- Left panel: Scatterplot with population line and current sample
- Right panel: Histogram of sample slopes accumulating
- Display: Current sample slope, mean of sample slopes, SE of sample slopes
- True population slope marked on histogram

Interactive Controls:
- Button: "Take One Sample"
- Button: "Take 100 Samples"
- Slider: Sample size (10 to 100)
- Slider: Population slope (-2 to 2)
- Slider: Error standard deviation (affects scatter)
- Button: "Reset"

Canvas Layout:
- Split view: Scatterplot (left), Histogram (right)
- Controls at bottom
- Statistics display at top

Default Parameters:
- Sample size: 30
- Population slope: 0.5
- Error SD: 2

Implementation: p5.js with canvas-based controls
</details>

## Part 10: Conditions for Regression Inference

Before performing inference on the slope, we must verify four important conditions, often remembered by the acronym **LINE**:

### L - Linearity Condition

The relationship between x and y must be linear in the population.

**How to check**: Create a residual plot (residuals vs. x or residuals vs. predicted values). If the relationship is linear, the residuals should scatter randomly around zero with no curved pattern.

### I - Independence Condition

The observations must be independent of each other.

**How to check**:
- Know how the data was collected (random sampling or experiment)
- For time series data, check for patterns in residuals over time
- When sampling without replacement, verify the 10% condition

### N - Normality of Residuals

For any given value of x, the y-values should be normally distributed around the regression line.

**How to check**:
- Create a histogram or normal probability plot of the residuals
- Look for roughly symmetric, bell-shaped distribution
- This condition is less critical with larger sample sizes (n ≥ 30) due to the Central Limit Theorem

### E - Equal Variance Condition

The standard deviation of y should be the same for all values of x (also called homoscedasticity).

**How to check**: In the residual plot, look for consistent vertical spread. Watch out for "fan shapes" or "megaphones" where spread increases or decreases across the x-axis.

| Condition | What to Check | Red Flags |
|-----------|---------------|-----------|
| Linearity | Residual plot | Curved pattern |
| Independence | Data collection method | Time order patterns |
| Normality | Histogram of residuals | Strong skewness, outliers |
| Equal Variance | Residual plot spread | Fan or megaphone shape |

#### Diagram: Checking Regression Conditions

<iframe src="../../sims/regression-conditions-checker/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden; border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

<details markdown="1">
<summary>Interactive Regression Conditions Checker</summary>
Type: microsim

Bloom Level: Evaluate (L5)
Bloom Verb: Assess, judge

Learning Objective: Students will evaluate whether regression conditions are met by analyzing residual plots and histograms, identifying violations.

Instructional Rationale: Learning to "read" residual plots is a critical skill. This simulator shows good and problematic patterns with immediate classification feedback.

Visual Elements:
- Main scatterplot with regression line
- Residual plot (residuals vs x)
- Histogram of residuals
- Normal probability plot of residuals
- Checklist of conditions with pass/fail indicators

Interactive Controls:
- Dropdown: Select scenario type
  - "Linear relationship, conditions met"
  - "Curved relationship (nonlinear)"
  - "Increasing variance (fan shape)"
  - "Non-normal residuals (skewed)"
  - "Outliers present"
  - "Random scatter (good)"
- Button: "Generate New Data" for selected scenario
- Checkboxes: Student self-assessment for each condition
- Button: "Check My Answers"

Scenario Data:
Each scenario generates data with specific properties
- Good: Random normal errors, constant variance
- Curved: Quadratic relationship
- Fan: SD proportional to x
- Skewed: Chi-square errors
- Outliers: Normal plus 2-3 extreme points

Canvas Layout:
- 2x2 grid of diagnostic plots
- Condition checklist on right side
- Scenario selector at top

Implementation: p5.js with canvas-based controls
</details>

## Part 11: T-Test for Slope

When conditions are met, we use a **t-test for the slope** to test hypotheses about \(\beta\).

### The Test Statistic

\[
t = \frac{b - \beta_0}{SE_b}
\]

where:
- \(b\) = sample slope (from regression output)
- \(\beta_0\) = hypothesized slope (usually 0)
- \(SE_b\) = standard error of the slope (from regression output)

This follows a t-distribution with **df = n - 2** (we subtract 2 because we estimated two parameters: the slope and intercept).

### Reading Computer Output

Most calculators and software provide the standard error of the slope and often the t-statistic and p-value directly. Here's what typical regression output looks like:

```
Predictor    Coef     SE Coef    T        P
Constant    12.43     1.87       6.65    0.000
Hours        2.31     0.42       5.50    0.000

S = 4.125   R-sq = 73.2%   R-sq(adj) = 71.8%
```

From this output:
- Sample slope \(b = 2.31\)
- Standard error \(SE_b = 0.42\)
- t-statistic = 5.50
- p-value ≈ 0.000 (very small)

### Completing the T-Test

**Example**: A researcher wants to know if study hours predict exam scores.

**Hypotheses**:
- H₀: \(\beta = 0\) (study hours have no linear relationship with exam scores)
- Hₐ: \(\beta \neq 0\) (study hours have a linear relationship with exam scores)

**From output**: t = 5.50, p-value ≈ 0.000

**Conclusion**: Because the p-value is essentially 0 (much less than α = 0.05), we reject H₀. We have very strong evidence that there is a linear relationship between study hours and exam scores.

## Part 12: T-Interval for Slope

We can also construct a **confidence interval for the slope** to estimate the range of plausible values for \(\beta\).

### The Formula

\[
b \pm t^* \times SE_b
\]

where:
- \(b\) = sample slope
- \(t^*\) = critical t-value for desired confidence level with df = n - 2
- \(SE_b\) = standard error of the slope

### Interpreting the Interval

Using our study hours example with b = 2.31, SE_b = 0.42, and n = 25:

For a 95% confidence interval with df = 23:
- \(t^* = 2.069\)
- Interval: \(2.31 \pm 2.069(0.42) = 2.31 \pm 0.87 = (1.44, 3.18)\)

**Interpretation**: We are 95% confident that the true slope of the population regression line is between 1.44 and 3.18. This means we're 95% confident that each additional hour of studying is associated with an increase of between 1.44 and 3.18 points on the exam, on average.

### Confidence Interval vs. Hypothesis Test

Notice that our 95% confidence interval (1.44, 3.18) does not contain 0. This is consistent with rejecting H₀: \(\beta = 0\) at α = 0.05. In fact:

- If the CI does NOT contain 0 → Reject H₀ at the corresponding α
- If the CI DOES contain 0 → Fail to reject H₀

This provides a nice connection between the two inference methods!

#### Diagram: Confidence Interval for Slope Visualization

<iframe src="../../sims/slope-confidence-interval/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden; border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

<details markdown="1">
<summary>Building Confidence Intervals for Slope</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Calculate, construct

Learning Objective: Students will construct and interpret confidence intervals for the regression slope, understanding how sample size and confidence level affect interval width.

Instructional Rationale: Manipulating parameters and seeing immediate visual feedback helps students understand the relationships between sample size, confidence level, and interval precision.

Visual Elements:
- Scatterplot with regression line
- "Plausible slopes" shown as a band of possible regression lines
- Number line below showing confidence interval
- Marker at 0 on number line (for hypothesis test connection)
- Display of interval bounds and width

Interactive Controls:
- Slider: Sample size (10 to 200)
- Dropdown: Confidence level (90%, 95%, 99%)
- Slider: True population slope (for simulation)
- Button: "Generate New Sample"
- Button: "Take 100 Samples" (shows coverage)
- Checkbox: Show individual intervals from repeated sampling

Data Visibility:
- Sample slope b
- Standard error SE_b
- Critical value t*
- Margin of error
- Final interval

Canvas Layout:
- Top: Scatterplot with regression line band
- Bottom: Number line with interval
- Right panel: Calculations shown step by step

Default Parameters:
- Sample size: 30
- Confidence level: 95%
- Population slope: 2

Implementation: p5.js with canvas-based controls
</details>

## Part 13: Putting It All Together

Let's work through a complete example that ties together everything we've learned about regression inference.

### Complete Regression Inference Example

**Context**: A coffee shop owner collects data on daily temperature (°F) and number of iced drinks sold. She wants to know if temperature is a useful predictor of iced drink sales.

**Data Summary** (n = 40 days):
- Sample slope: b = 3.2 drinks per degree
- Sample intercept: a = -85
- Standard error of slope: SE_b = 0.58
- R² = 0.67

**Step 1: Check Conditions**

*Linearity*: Residual plot shows random scatter around zero—no curved pattern. ✓

*Independence*: Data collected on 40 randomly selected days over 6 months. The 10% condition is satisfied (40 < 10% of all days). ✓

*Normality*: Histogram of residuals is approximately bell-shaped and symmetric. ✓

*Equal Variance*: Residual plot shows consistent spread across all temperature values. ✓

All conditions for regression inference are met.

**Step 2: State Hypotheses**

- H₀: \(\beta = 0\) (Temperature has no linear relationship with iced drink sales)
- Hₐ: \(\beta > 0\) (Higher temperatures are associated with more iced drink sales)

Note: We use a one-sided test because the owner has a clear directional prediction.

**Step 3: Calculate Test Statistic**

\[
t = \frac{b - 0}{SE_b} = \frac{3.2 - 0}{0.58} = 5.52
\]

With df = 40 - 2 = 38

**Step 4: Find P-Value**

Using technology: P(t > 5.52 | df = 38) ≈ 0.0000015

**Step 5: Conclusion**

Because the p-value (≈ 0.0000015) is much less than α = 0.05, we reject H₀. We have very strong evidence that higher temperatures are associated with increased iced drink sales.

**Step 6: Confidence Interval**

For a 95% CI with df = 38, t* ≈ 2.024:

\[
3.2 \pm 2.024(0.58) = 3.2 \pm 1.17 = (2.03, 4.37)
\]

We are 95% confident that for each 1°F increase in temperature, the average number of iced drinks sold increases by between 2.03 and 4.37 drinks.

## Chapter Summary: Key Takeaways

Let's squirrel away the essential knowledge from this chapter!

### Chi-Square Tests

| Test Type | Purpose | Hypotheses | df |
|-----------|---------|------------|-----|
| Goodness-of-Fit | Does data match claimed distribution? | H₀: Distribution matches | k - 1 |
| Homogeneity | Same distribution across groups? | H₀: Same distribution | (r-1)(c-1) |
| Independence | Are two variables associated? | H₀: Variables independent | (r-1)(c-1) |

**Chi-Square Formula**:
\[
\chi^2 = \sum \frac{(O - E)^2}{E}
\]

**Conditions**: Random, Independent, Large Counts (all expected ≥ 5)

### Regression Inference

**Conditions (LINE)**:
- **L**inearity: Check residual plot for no pattern
- **I**ndependence: Random sample, 10% condition
- **N**ormality: Residuals approximately normal
- **E**qual variance: Consistent spread in residual plot

**T-Test for Slope**:
\[
t = \frac{b - \beta_0}{SE_b}, \quad df = n - 2
\]

**Confidence Interval for Slope**:
\[
b \pm t^* \times SE_b
\]

!!! success "You Did It!"
    Congratulations! You've now mastered two of the most powerful tools in inferential statistics. Chi-square tests let you work with categorical data in ways that weren't possible before, and regression inference lets you make formal claims about relationships between quantitative variables. As Sylvia would say, "That's a data point worth collecting!"

## Practice Problems

Test your understanding with these practice scenarios:

??? question "Practice 1: M&M Colors"
    A student counts 52 brown, 23 red, 20 yellow, 18 orange, 18 blue, and 19 green M&Ms in a large bag. The company claims the percentages should be 13% brown, 13% red, 14% yellow, 20% orange, 24% blue, and 16% green. Is there evidence that the distribution differs from the company's claim?

    **Solution**: This is a goodness-of-fit test. Calculate expected counts (n = 150), compute chi-square, find p-value with df = 5. The chi-square statistic is approximately 25.8, giving a p-value < 0.001. Reject H₀—there is convincing evidence the distribution differs from the claim.

??? question "Practice 2: Study Design"
    Researchers survey 400 randomly selected adults, asking about their education level (high school, some college, bachelor's, graduate) and their primary news source (TV, online, print, social media). They want to know if education level and news source preference are related.

    Which test should they use: homogeneity or independence?

    **Solution**: This is a test for independence. There is ONE sample of 400 adults, and TWO categorical variables (education level and news source) are measured on each person. A homogeneity test would require separate samples from each education level.

??? question "Practice 3: Regression Conditions"
    A residual plot shows that residuals have larger spread for larger x-values (a "megaphone" shape). Which condition is violated, and what are the implications?

    **Solution**: The Equal Variance (homoscedasticity) condition is violated. This means the standard error of the slope may be incorrect, making our t-tests and confidence intervals unreliable. Consider transforming the response variable (like taking a log) or using weighted least squares regression.

---

*"Time to squirrel away this knowledge! You've learned some incredibly powerful tools in this chapter. Chi-square tests and regression inference will serve you well on the AP exam and beyond. Remember: always check your conditions, interpret your results in context, and never let the math obscure the meaning of your analysis."* —Sylvia

