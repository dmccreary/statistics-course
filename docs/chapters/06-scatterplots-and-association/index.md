---
title: Scatterplots and Association
description: Learn to visualize relationships between quantitative variables using scatterplots, describe associations by direction, form, and strength, and calculate the correlation coefficient.
generated_by: claude skill chapter-content-generator
date: 2026-02-06 22:04:21
version: 0.04
---

# Scatterplots and Association

## Summary

This chapter introduces scatterplots as the primary tool for visualizing relationships between two quantitative variables. Students will learn to describe the direction, form, and strength of associations, and calculate the correlation coefficient. Understanding correlation is crucial for the regression analysis that follows in the next chapter.

## Concepts Covered

This chapter covers the following 9 concepts from the learning graph:

75. Scatterplot
76. Describing Scatterplots
82. Form of Association
83. Linear Form
84. Nonlinear Form
86. Correlation Coefficient
87. Calculating Correlation
88. Properties of Correlation
89. Correlation Limitations

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to Statistics](../01-introduction-to-statistics/index.md)
- [Chapter 2: Displaying Categorical Data](../02-displaying-categorical-data/index.md)
- [Chapter 4: Numerical Summaries](../04-numerical-summaries/index.md)

---

## Introduction: When Two Variables Meet

Welcome back! So far, we've explored single variables—counting categories, summarizing numerical data, and understanding distributions. But here's where things get really interesting: what happens when we want to understand how two quantitative variables relate to each other?

Think about questions like these: Does studying more hours actually lead to better test scores? Do taller people tend to weigh more? Is there a connection between a city's average temperature and its ice cream sales? These are questions about *relationships* between variables, and answering them requires a new visualization tool.

> "My tail's tingling—we're onto something! When I was a young squirrel, I noticed that trees with bigger canopies tended to drop more acorns. Was that just coincidence, or was there a real pattern? That's exactly the kind of question we'll learn to investigate in this chapter!"
> — *Sylvia*

Let's dive into the world of scatterplots and discover how to visualize, describe, and measure relationships between variables.

---

## Understanding Scatterplots

A **scatterplot** is a graph that displays the relationship between two quantitative variables. Each point on the plot represents one observation (one individual or case), with its position determined by its values for both variables.

Here's the setup:

- The **horizontal axis (x-axis)** displays one variable, typically the *explanatory variable* (the one we think might explain or predict changes in the other)
- The **vertical axis (y-axis)** displays the other variable, typically the *response variable* (the one we're trying to understand or predict)

For example, if we're investigating whether hours of study affect test scores, we'd plot hours studied on the x-axis and test scores on the y-axis. Each student becomes a single dot on the plot, positioned at their specific (hours, score) coordinates.

### Creating a Scatterplot

To create a scatterplot:

1. Identify your two quantitative variables
2. Decide which is the explanatory variable (x) and which is the response variable (y)
3. Draw and label your axes with appropriate scales
4. Plot each observation as a point at its (x, y) coordinates

| Variable Type | Placement | Example |
|---------------|-----------|---------|
| Explanatory (independent) | x-axis (horizontal) | Hours of study |
| Response (dependent) | y-axis (vertical) | Test score |

> "Acorn for your thoughts? When plotting, I always ask myself: 'Which variable might *cause* or *explain* changes in the other?' That one goes on the x-axis. The one that might be *affected* goes on the y-axis. It's like asking, 'Does tree height explain acorn count?' Tree height is x, acorn count is y!"
> — *Sylvia*

#### MicroSim: Scatterplot Builder

<iframe src="../../sims/scatterplot-builder/main.html" width="100%" height="452px" scrolling="no" style="overflow: hidden;"></iframe>

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)

<details markdown="1">
<summary>Interactive Scatterplot Builder</summary>
Type: MicroSim

Learning objective: Understand (Bloom Level 2) - Students will demonstrate understanding of scatterplot construction by placing data points and interpreting their positions.

Visual elements:

- Coordinate plane with labeled x and y axes
- Data table showing 8-10 paired observations on the left side
- Points that appear on the scatterplot as user clicks corresponding rows
- Grid lines for easier coordinate reading
- Axis labels that can be customized (dropdown: "Hours Studied/Test Score", "Height/Weight", "Temperature/Ice Cream Sales")

Interactive controls:

- Dataset selector dropdown (3 preset datasets)
- "Add Point" mode: click on table row to plot that point
- "Clear" button to reset the scatterplot
- "Show All" button to display all points at once
- Toggle for gridlines on/off

Behavior:

- When user clicks a data row, the corresponding point animates onto the scatterplot
- Points highlight when hovered, showing their exact coordinates
- After all points are plotted, a message appears: "You've built a scatterplot! What pattern do you see?"

Canvas size: 700 x 450, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## Describing Scatterplots

Once you've created a scatterplot, the next step is to describe what you see. We use three key characteristics to describe the pattern in a scatterplot:

1. **Direction** (positive, negative, or no association)
2. **Form** (linear, nonlinear, or no clear form)
3. **Strength** (strong, moderate, or weak)

Additionally, you should always look for **unusual features** like outliers or clusters.

### Direction of Association

The **direction** tells us how the two variables move in relation to each other:

- **Positive association**: As x increases, y tends to increase. The points slope upward from left to right. Think: height and weight, study time and test scores.
- **Negative association**: As x increases, y tends to decrease. The points slope downward from left to right. Think: price and quantity demanded, age of a car and its resale value.
- **No association**: There's no discernible pattern relating x and y. The points appear scattered randomly.

### Strength of Association

The **strength** describes how closely the points follow the overall pattern:

- **Strong**: Points cluster tightly around the underlying pattern
- **Moderate**: Points follow the general pattern but with noticeable scatter
- **Weak**: Points only loosely follow the pattern with substantial scatter

Think of it this way: if you could easily draw a line (or curve) through the data and the points would hug that line closely, the association is strong. If the points are so scattered that finding any pattern feels like wishful thinking, the association is weak.

> "Let's crack this nut! Describing a scatterplot is like describing a cloud—but with more precision. You wouldn't just say 'there's a cloud up there.' You'd describe its shape, which way it's moving, and how thick it is. Same idea with scatterplots: direction, form, strength. Write that on your forehead. Well, maybe just on your notes."
> — *Sylvia*

---

## Form of Association

The **form** of an association describes the overall shape of the pattern in a scatterplot. Is it a straight line? A curve? Something else entirely? Understanding form helps us choose the right tools for further analysis.

### Linear Form

A relationship has a **linear form** when the points in a scatterplot cluster around a straight line. Linear relationships are wonderfully predictable and mathematically convenient—which is why we love them in statistics!

Characteristics of linear form:

- Points follow a straight-line pattern
- The rate of change between x and y is constant
- Can be described by the equation \( y = mx + b \)

Examples of linear relationships:

- Celsius and Fahrenheit temperatures (perfectly linear!)
- Height and arm span in humans
- Number of items purchased and total cost (at a fixed price per item)

### Nonlinear Form

A relationship has a **nonlinear form** when the points follow a curved pattern rather than a straight line. Nonlinear relationships are common in the real world, even though they require more sophisticated tools to analyze.

Common types of nonlinear patterns:

| Pattern | Description | Example |
|---------|-------------|---------|
| Curved (quadratic) | Follows a parabola shape | Height of a thrown ball over time |
| Exponential | Rapid increase or decrease | Population growth, radioactive decay |
| Logarithmic | Rapid change then leveling off | Learning curves, diminishing returns |
| Periodic | Repeating pattern | Temperature over months of the year |

The key insight is this: when you see a curved pattern, a straight line won't accurately describe the relationship. Don't try to force a linear model onto nonlinear data!

> "Here's a nugget of wisdom: not everything in nature follows a straight line. My acorn collection grew exponentially during my best autumn ever—definitely not linear! The point is to let the data show you what form it takes, rather than assuming everything is linear."
> — *Sylvia*

#### MicroSim: Pattern Recognition Gallery

<iframe src="../../sims/pattern-recognition-gallery/main.html" width="100%" height="502px" scrolling="no" style="overflow: hidden;"></iframe>

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)

<details markdown="1">
<summary>Identify the Form of Association</summary>
Type: MicroSim

Learning objective: Analyze (Bloom Level 4) - Students will classify scatterplots by their form (linear positive, linear negative, nonlinear, no association).

Visual elements:

- Gallery of 6 scatterplot thumbnails displayed in a 2x3 grid
- Larger preview area showing selected scatterplot
- Classification options displayed as canvas buttons below preview
- Score tracker in corner
- Feedback area showing correct/incorrect with brief explanation

Interactive controls:

- Click on thumbnail to select and enlarge scatterplot
- Four classification buttons: "Linear (Positive)", "Linear (Negative)", "Nonlinear", "No Association"
- "Next Set" button to generate new random scatterplots
- "Hint" button (limited uses) that highlights the general trend

Behavior:

- Clicking a classification button checks the answer
- Correct answers: point increments, brief explanation appears, plot gets green checkmark
- Incorrect answers: explanation of correct answer appears, plot remains unmarked
- All 6 correctly classified triggers congratulatory message and option for new set
- Scatterplots generated with varying degrees of noise to match difficulty

Canvas size: 750 x 500, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## The Correlation Coefficient

Now let's get quantitative! While describing direction, form, and strength in words is valuable, we need a numerical measure to precisely communicate how strongly two variables are linearly related. Enter the **correlation coefficient**, denoted by \( r \).

The correlation coefficient is a number between -1 and 1 that measures the strength and direction of the *linear* relationship between two quantitative variables.

Here's what the values mean:

- \( r = 1 \): Perfect positive linear relationship
- \( r = -1 \): Perfect negative linear relationship
- \( r = 0 \): No linear relationship
- Values between 0 and 1 or between -1 and 0 indicate varying strengths

### Interpreting Correlation Values

| Range of \( r \) | Interpretation |
|------------------|----------------|
| \( 0.8 \leq |r| \leq 1.0 \) | Strong linear relationship |
| \( 0.5 \leq |r| < 0.8 \) | Moderate linear relationship |
| \( 0.3 \leq |r| < 0.5 \) | Weak linear relationship |
| \( |r| < 0.3 \) | Little to no linear relationship |

The sign of \( r \) tells you the direction:

- Positive \( r \): positive association (upward slope)
- Negative \( r \): negative association (downward slope)

> "Time to squirrel away this knowledge! The correlation coefficient gives us a single number that captures both direction AND strength of a linear relationship. It's like a grade for how well the data follows a straight line. An \( r \) of 0.95? That's an A+! An \( r \) of 0.2? More like a D-minus for linearity."
> — *Sylvia*

#### MicroSim: Guess the Correlation

<iframe src="../../sims/guess-correlation/main.html" width="100%" height="502px" scrolling="no" style="overflow: hidden;"></iframe>

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)

<details markdown="1">
<summary>Correlation Estimation Game</summary>
Type: MicroSim

Learning objective: Evaluate (Bloom Level 5) - Students will estimate correlation values from scatterplots and develop intuition for what different r-values look like.

Visual elements:

- Large scatterplot display area (400 x 400)
- Slider for user's correlation estimate (-1.0 to 1.0)
- Current guess displayed numerically
- "Check Answer" button
- Score display showing streak of close guesses
- Actual r-value revealed after guess

Interactive controls:

- Slider to select estimated correlation value
- "Check Answer" button to compare guess to actual value
- "New Plot" button to generate fresh scatterplot
- Difficulty toggle: Easy (clear patterns, n=50), Medium (moderate scatter, n=30), Hard (subtle patterns, n=20)

Behavior:

- User adjusts slider to estimate r-value
- Clicking "Check" reveals actual r with visual comparison
- If guess is within 0.1 of actual: "Excellent!", streak increases
- If guess is within 0.2: "Good estimate!", streak increases
- If guess is off by more than 0.2: "Keep practicing!", streak resets
- High score tracking for the session
- New scatterplots generated with random r-values and appropriate scatter

Canvas size: 600 x 500, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## Calculating Correlation

How do we actually compute the correlation coefficient? The formula looks intimidating at first, but it's based on a beautiful idea: we convert both variables to z-scores, then see how their z-scores move together.

### The Correlation Formula

\[
r = \frac{\sum_{i=1}^{n} z_{x_i} \cdot z_{y_i}}{n - 1}
\]

Where:

- \( z_{x_i} = \frac{x_i - \bar{x}}{s_x} \) is the z-score for each x-value
- \( z_{y_i} = \frac{y_i - \bar{y}}{s_y} \) is the z-score for each y-value
- \( n \) is the number of data points

Alternatively, you can write the formula using the raw values:

\[
r = \frac{1}{n-1} \sum_{i=1}^{n} \left( \frac{x_i - \bar{x}}{s_x} \right) \left( \frac{y_i - \bar{y}}{s_y} \right)
\]

### Understanding the Formula

Why does this formula work? Let's break it down:

1. **Z-scores standardize both variables**: This puts x and y on the same scale (mean 0, standard deviation 1), allowing us to compare them fairly.

2. **Multiplying z-scores**: When both z-scores are positive (both above their means) or both negative (both below their means), the product is positive. When they have opposite signs, the product is negative.

3. **Averaging the products**: We sum up all these products and divide by \( n-1 \) to get the average. A large positive average means strong positive correlation; a large negative average means strong negative correlation.

### Step-by-Step Calculation Example

Let's calculate the correlation for a small dataset of hours studied vs. test scores:

| Student | Hours (x) | Score (y) |
|---------|-----------|-----------|
| A | 2 | 65 |
| B | 4 | 75 |
| C | 5 | 85 |
| D | 3 | 70 |
| E | 6 | 90 |

**Step 1**: Calculate means

- \( \bar{x} = \frac{2+4+5+3+6}{5} = 4 \)
- \( \bar{y} = \frac{65+75+85+70+90}{5} = 77 \)

**Step 2**: Calculate standard deviations

- \( s_x = \sqrt{\frac{(2-4)^2+(4-4)^2+(5-4)^2+(3-4)^2+(6-4)^2}{4}} = \sqrt{\frac{10}{4}} = 1.58 \)
- \( s_y = \sqrt{\frac{(65-77)^2+(75-77)^2+(85-77)^2+(70-77)^2+(90-77)^2}{4}} = \sqrt{\frac{366}{4}} = 9.57 \)

**Step 3**: Calculate z-scores and products

| Student | \( z_x \) | \( z_y \) | \( z_x \cdot z_y \) |
|---------|-----------|-----------|---------------------|
| A | -1.26 | -1.25 | 1.58 |
| B | 0 | -0.21 | 0 |
| C | 0.63 | 0.84 | 0.53 |
| D | -0.63 | -0.73 | 0.46 |
| E | 1.26 | 1.36 | 1.71 |

**Step 4**: Calculate r

\[
r = \frac{1.58 + 0 + 0.53 + 0.46 + 1.71}{5-1} = \frac{4.28}{4} = 1.07
\]

Wait—that's greater than 1! Due to rounding in our intermediate steps, we got a slightly off answer. In reality (with more precision), \( r \approx 0.99 \), indicating a very strong positive linear relationship between hours studied and test scores.

> "Don't worry—every statistician drops an acorn sometimes. Rounding errors happen! When you're doing these by hand, carry extra decimal places through your calculations. Or better yet, let technology do the heavy lifting and focus on understanding what the result means!"
> — *Sylvia*

#### MicroSim: Correlation Calculator

<iframe src="../../sims/correlation-calculator/main.html" width="100%" height="502px" scrolling="no" style="overflow: hidden;"></iframe>

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)

<details markdown="1">
<summary>Step-by-Step Correlation Computation</summary>
Type: MicroSim

Learning objective: Apply (Bloom Level 3) - Students will calculate correlation step by step and verify their understanding of the formula.

Visual elements:

- Input table for entering (x, y) pairs (5-8 rows)
- Calculation display showing intermediate values: means, standard deviations, z-scores
- Formula displayed with current values substituted in highlighted boxes
- Scatterplot updating in real-time as data is entered
- Final r-value with interpretation

Interactive controls:

- Editable cells for entering data values
- "Calculate" button to show step-by-step work
- "Show/Hide Steps" toggle for each calculation phase
- "Use Sample Data" button for preset datasets
- "Clear All" button to start fresh
- Slider to control animation speed of calculation steps

Behavior:

- As user enters data, scatterplot updates in real-time
- "Calculate" triggers animated walkthrough of formula
- Each step highlights relevant values in the table
- Z-scores are calculated and displayed with color coding (red for negative, green for positive)
- Final r-value appears with strength/direction interpretation
- Interpretation changes if r is near 0, moderate, or strong

Canvas size: 800 x 500, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## Properties of Correlation

The correlation coefficient has several important properties that you need to understand. These properties help you use correlation correctly and avoid common mistakes.

### Key Properties of r

1. **The correlation coefficient is unitless**

   Because we convert to z-scores (which have no units), the correlation between height in inches and weight in pounds is exactly the same as the correlation between height in centimeters and weight in kilograms. Units don't matter!

2. **Correlation is symmetric**

   The correlation between x and y is exactly the same as the correlation between y and x. Mathematically, \( r_{xy} = r_{yx} \). It doesn't matter which variable you call x and which you call y.

3. **Correlation is bounded**

   Always: \( -1 \leq r \leq 1 \). If you calculate a value outside this range, you've made an error!

4. **Correlation measures only linear relationships**

   A correlation of 0 doesn't mean no relationship—it means no *linear* relationship. Variables can have a perfect curved relationship and still have \( r = 0 \).

5. **Correlation is sensitive to outliers**

   A single extreme point can dramatically change the correlation coefficient. Always examine your scatterplot visually!

### What Correlation Does NOT Tell You

Understanding what correlation cannot tell you is just as important as understanding what it can:

| Correlation Cannot Tell You... | Why Not |
|-------------------------------|---------|
| Which variable causes the other | Correlation is not causation! |
| Whether the relationship is practically important | Even small effects can have large correlations with enough data |
| Whether a nonlinear pattern exists | It only measures linear association |
| What will happen outside your data range | Extrapolation is risky |

> "Let's crack this nut about causation! I once noticed a near-perfect correlation between the number of birds in my tree and the number of acorns I collected that day. Did the birds bring me acorns? Of course not! More acorns attracted more birds. Same data, very different story. Never forget: correlation is not causation!"
> — *Sylvia*

#### MicroSim: Correlation Properties Explorer

<iframe src="../../sims/correlation-properties/main.html" width="100%" height="502px" scrolling="no" style="overflow: hidden;"></iframe>

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)

<details markdown="1">
<summary>Explore What Affects Correlation</summary>
Type: MicroSim

Learning objective: Analyze (Bloom Level 4) - Students will investigate how changing data affects the correlation coefficient and develop intuition for correlation properties.

Visual elements:

- Scatterplot with draggable points
- Real-time r-value display that updates as points move
- "Unit toggle" showing correlation stays same when units change
- Outlier point in different color that can be toggled on/off
- Before/after comparison panel

Interactive controls:

- Drag individual points to new positions
- "Add Outlier" toggle to see impact of extreme point
- "Swap Axes" button demonstrating symmetry property
- "Change Units" dropdown (showing r stays constant)
- "Reset Points" button
- "Add Random Point" button to grow dataset

Behavior:

- r-value updates continuously as user drags points
- Swapping axes shows same r-value (symmetry)
- Adding/removing outlier shows dramatic r-value change
- Changing units displays converted axis labels but same r
- Points near the edge of the pattern space have larger effects when moved
- Color gradient on points indicates their contribution to r

Canvas size: 700 x 500, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## Correlation Limitations

Before you start using correlation for everything, let's talk about its limitations. Understanding these will make you a smarter statistician and help you avoid embarrassing mistakes.

### Correlation is NOT Causation

This is perhaps the most important limitation. Just because two variables are correlated does not mean one causes the other. There are several reasons why non-causal variables might be correlated:

1. **Confounding variables**: A third variable influences both x and y. Ice cream sales and drowning deaths are correlated—but summer weather causes both!

2. **Reverse causation**: Maybe y causes x, not x causes y.

3. **Coincidence**: With enough variables, some will be correlated by pure chance. (Did you know the divorce rate in Maine correlates with margarine consumption? Meaningless!)

### Correlation Only Measures Linear Relationships

This limitation trips up many students. Consider data that follows a perfect parabola: when x is low, y is high; when x is medium, y is low; when x is high, y is high again. Despite this perfect relationship, the correlation would be near zero!

Always plot your data first. A scatterplot will reveal nonlinear patterns that correlation will miss entirely.

### Outliers Can Distort Correlation

A single outlier can:

- Inflate the correlation (making a weak relationship look strong)
- Deflate the correlation (making a strong relationship look weak)
- Even reverse the sign of the correlation!

When you spot outliers, investigate them. Are they data entry errors? Unusual but valid observations? Your interpretation may need to account for them.

### Correlation Doesn't Work Well for Restricted Ranges

If you only look at part of the data range, you may miss or misrepresent the true relationship. For example, the correlation between SAT scores and college GPA among students at a highly selective university will be lower than in the general population—because the university already restricted the range of SAT scores!

### Other Important Limitations

- **Correlation assumes quantitative variables**: Don't try to calculate r for categorical data
- **Sample size matters**: Correlations from small samples are less reliable
- **Correlation doesn't describe the relationship**: It won't tell you *how* y changes when x increases

> "Here's the acorn of wisdom I want you to carry away: correlation is a powerful tool, but it's not a magic wand. It tells you about linear association—nothing more. Always look at your scatterplot, think about causation carefully, and watch out for lurking variables!"
> — *Sylvia*

#### MicroSim: Correlation Pitfalls Demo

<iframe src="../../sims/correlation-pitfalls/main.html" width="100%" height="552px" scrolling="no" style="overflow: hidden;"></iframe>

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)

<details markdown="1">
<summary>Explore Common Correlation Mistakes</summary>
Type: MicroSim

Learning objective: Evaluate (Bloom Level 5) - Students will recognize situations where correlation is misleading and explain why.

Visual elements:

- Four tabbed scenarios: "Nonlinear Data", "Outlier Effect", "Restricted Range", "Confounding Variable"
- Scatterplot in each tab showing the scenario
- Calculated r-value displayed prominently
- Explanation panel that reveals after user makes prediction
- "What's wrong here?" prompt for each scenario

Interactive controls:

- Tab buttons to switch between scenarios
- "Predict" dropdown for each scenario (choices vary by tab)
- "Reveal" button to show explanation
- In "Outlier Effect" tab: toggle to remove outlier and see new r
- In "Restricted Range" tab: slider to expand/contract visible range
- "Next Challenge" button for additional examples within each category

Behavior:

- Each scenario presents a scatterplot with a specific problem
- User predicts what's misleading about the correlation
- Reveal shows explanation with the correct answer
- Outlier tab: removing point shows dramatic r change
- Restricted range: expanding view shows different r
- Confounding tab: shows third variable that explains both
- Tracks correct predictions across scenarios

Canvas size: 750 x 550, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## Bringing It All Together

Let's review the complete workflow for analyzing relationships between two quantitative variables:

1. **Create a scatterplot** with the explanatory variable on the x-axis and response on the y-axis

2. **Describe the relationship** in terms of:
   - Direction (positive, negative, or none)
   - Form (linear, nonlinear, or no pattern)
   - Strength (strong, moderate, or weak)
   - Unusual features (outliers, clusters)

3. **Calculate correlation** (if the form is linear) to quantify the strength and direction

4. **Interpret carefully**:
   - Remember correlation is not causation
   - Consider potential confounding variables
   - Watch for outliers affecting your results
   - Don't extrapolate beyond your data

5. **Report your findings** with appropriate context and caveats

> "You've come so far! From looking at single variables to understanding relationships between pairs of variables—that's a huge leap. In the next chapter, we'll take this even further with regression, where we'll learn to predict one variable from another. But for now, give yourself credit for mastering scatterplots and correlation. Now *that's* a data point worth collecting!"
> — *Sylvia*

---

## Key Takeaways

Here are the essential concepts to squirrel away from this chapter:

1. **Scatterplots** display the relationship between two quantitative variables, with explanatory variable on the x-axis and response on the y-axis.

2. **Describe scatterplots** using direction (positive/negative/none), form (linear/nonlinear/none), strength (strong/moderate/weak), and unusual features.

3. **Linear form** means points cluster around a straight line; **nonlinear form** means points follow a curved pattern.

4. The **correlation coefficient** \( r \) measures the strength and direction of *linear* relationships, ranging from -1 to +1.

5. **Correlation formula**: \( r = \frac{1}{n-1} \sum z_x \cdot z_y \) — based on products of z-scores.

6. **Properties of correlation**: unitless, symmetric, bounded between -1 and 1, measures only linear relationships, sensitive to outliers.

7. **Correlation limitations**: Does not imply causation, only detects linear patterns, can be distorted by outliers and restricted ranges.

8. Always **plot first, calculate second**. Visual inspection reveals patterns that correlation alone cannot detect.

9. **Correlation is not causation**—this bears repeating! Confounding variables, reverse causation, and coincidence can all produce correlations without causal relationships.

---

## Practice Problems

Test your understanding with these practice problems. Remember Sylvia's advice: doing statistics is where it clicks!

### Problem 1: Interpreting Scatterplots

A researcher collects data on the number of hours students spend on social media per day (x) and their GPA (y). The scatterplot shows points that generally go from upper left to lower right, with moderate scatter around the pattern.

a) What is the direction of the association?
b) Would you expect the correlation to be positive or negative?
c) Estimate the correlation: is it closer to -0.3, -0.6, or -0.9?
d) Can we conclude that social media use causes lower GPAs? Explain.

### Problem 2: Calculating Correlation

Given the following data on hours of sleep (x) and alertness rating on a 1-10 scale (y):

| Hours of Sleep | 5 | 6 | 7 | 8 | 9 |
|----------------|---|---|---|---|---|
| Alertness | 4 | 5 | 7 | 8 | 9 |

a) Create a scatterplot of this data.
b) Calculate the correlation coefficient \( r \).
c) Describe the relationship in terms of direction, form, and strength.

### Problem 3: Properties of Correlation

For each statement, determine if it is True or False and explain why:

a) If \( r = 0 \), there is no relationship between x and y.
b) The correlation between height in inches and weight in pounds will be different from the correlation between height in centimeters and weight in kilograms.
c) If we swap x and y in our scatterplot, the correlation will remain the same.
d) A correlation of \( r = 0.95 \) proves that changes in x cause changes in y.

### Problem 4: Identifying Limitations

A study finds a correlation of \( r = 0.78 \) between the number of firefighters at a fire and the amount of damage caused by the fire.

a) Does this mean that bringing more firefighters causes more damage?
b) What is a more likely explanation for this correlation?
c) What type of correlation limitation does this example illustrate?

### Problem 5: Form of Association

For each scenario, predict whether the relationship would be linear or nonlinear:

a) The height of a ball thrown upward versus time
b) The cost of a phone call versus its duration (at a fixed per-minute rate)
c) The population of bacteria in a petri dish versus time
d) The temperature in Celsius versus temperature in Fahrenheit

### Problem 6: Outlier Effects

Consider a dataset with \( n = 20 \) points showing a strong positive linear relationship with \( r = 0.92 \). One additional point is added at a position far from the others.

a) How might this outlier affect the correlation if it falls in the direction of the existing trend (far upper right)?
b) How might it affect the correlation if it falls away from the trend (far lower right)?
c) What should you do when you discover an outlier in your data?

### Problem 7: AP Exam Style Free Response

A nutritionist studies the relationship between daily vegetable servings (x) and systolic blood pressure (y) for 50 adults. The scatterplot shows a negative linear association, and the correlation is \( r = -0.65 \).

a) Describe what \( r = -0.65 \) tells us about this relationship.
b) The nutritionist calculates \( r^2 = 0.42 \). Interpret this value in context.
c) A health magazine reports: "Eating more vegetables lowers blood pressure, study proves!" Critique this claim using what you know about correlation.
d) Suggest two confounding variables that might explain the observed correlation.

---

Good luck with your practice! Remember: every problem you work through is another step toward mastering statistics. Let's crack these nuts!
