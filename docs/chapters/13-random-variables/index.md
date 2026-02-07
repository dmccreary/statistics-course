---
title: Random Variables
description: Introduction to random variables, probability distributions, expected value, and the binomial and geometric distributions
generated_by: claude skill chapter-content-generator
date: 2026-02-06 22:24:48
version: 0.04
---

# Random Variables

## Summary

This chapter introduces random variables and probability distributions. Students will learn about discrete random variables, expected value, variance, and standard deviation. The binomial and geometric distributions are covered in depth as key examples of discrete probability models used throughout statistics.

## Concepts Covered

This chapter covers the following 23 concepts from the learning graph:

173. Random Variable
174. Discrete Random Variable
175. Probability Distribution
176. Valid Distribution
177. Expected Value
178. Calculating Expected Value
179. Variance of Random Variable
180. Standard Deviation of RV
181. Linear Transformation
182. Combining Random Variables
183. Sum of Random Variables
184. Difference of RVs
185. Binomial Setting
186. Binomial Conditions
187. Binomial Distribution
188. Binomial Probability
189. Binomial Formula
190. Binomial Mean
191. Binomial Standard Dev
192. Geometric Setting
193. Geometric Distribution
194. Geometric Probability
195. Geometric Mean

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Numerical Summaries](../04-numerical-summaries/index.md)
- [Chapter 9: Probability Fundamentals](../09-probability-fundamentals/index.md)

---

## Introduction: Putting Numbers on Chance

Welcome back! Sylvia here, and I have to tell you, this is one of my favorite chapters. Why? Because we're about to take everything you've learned about probability and supercharge it with some seriously powerful mathematical tools.

Think about it: probability tells us that something is "likely" or "unlikely," but what if we could be more precise? What if we could calculate the *average* outcome of a random process, or measure how much variability to expect? That's exactly what random variables let us do.

Here's a real-world example. Imagine you're running a carnival game where players pay $2 to spin a wheel. Sometimes they win $5, sometimes $1, sometimes nothing. How do you know if your game will make money over hundreds of spins? Random variables give you the answer.

!!! tip "Sylvia Says"
    Random variables are like translating the unpredictable language of chance into the precise language of numbers. Once you've made that translation, a whole world of calculations opens up!

## What Is a Random Variable?

A **random variable** is a variable whose value is determined by the outcome of a random process. It's like a rule that assigns a number to every possible outcome of an experiment.

Let's make this concrete. When you flip two coins, the possible outcomes are:

- HH (both heads)
- HT (head, then tail)
- TH (tail, then head)
- TT (both tails)

If we let X = "the number of heads," then X is a random variable that assigns these values:

| Outcome | Value of X |
|---------|-----------|
| HH | 2 |
| HT | 1 |
| TH | 1 |
| TT | 0 |

Notice what we've done: we've converted word descriptions of outcomes into numbers. That's the magic of random variables.

### Discrete vs. Continuous Random Variables

Random variables come in two flavors:

- **Discrete random variables** take on a countable number of values (like counting things: 0, 1, 2, 3...)
- **Continuous random variables** take on any value in an interval (like measuring: 5.2, 5.21, 5.217...)

In this chapter, we focus on **discrete random variables**. You'll meet continuous random variables when we explore normal distributions more deeply.

Here are some examples to help you distinguish between them:

| Variable | Type | Reason |
|----------|------|--------|
| Number of texts you send today | Discrete | You count texts (0, 1, 2, ...) |
| Time spent studying | Continuous | Could be 45.3 minutes, 45.37 minutes, etc. |
| Number of heads in 10 coin flips | Discrete | You count heads (0, 1, 2, ..., 10) |
| Height of a randomly selected student | Continuous | Measured values can be infinitely precise |
| Number of cars in a parking lot | Discrete | You count cars |

---

## Probability Distributions

A **probability distribution** tells you all possible values of a random variable and how likely each value is. Think of it as a complete picture of what might happen and the chances of each possibility.

For a discrete random variable, we can display the probability distribution as a table, a graph, or a formula.

### Example: Rolling a Die

Let X = the number showing when you roll a fair six-sided die.

| Value of X | 1 | 2 | 3 | 4 | 5 | 6 |
|------------|---|---|---|---|---|---|
| P(X = x) | 1/6 | 1/6 | 1/6 | 1/6 | 1/6 | 1/6 |

Each outcome has equal probability, so this is a **uniform distribution**.

#### Diagram: Probability Distribution Bar Chart

<iframe src="../../sims/probability-distribution-bar/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden; border: 2px solid var(--sylvia-green); border-radius: 8px;"></iframe>

<details markdown="1">
<summary>Probability Distribution Bar Chart</summary>
Type: chart

Purpose: Visualize the probability distribution for rolling a die, showing equal probabilities for each outcome

Bloom Level: Understand (L2)
Bloom Verb: Interpret

Learning Objective: Students will interpret a probability distribution by examining a bar chart where each bar's height represents the probability of that outcome.

Chart Type: Bar chart with interactive elements

Visual Elements:
- X-axis: Values 1, 2, 3, 4, 5, 6
- Y-axis: Probability from 0 to 0.3 (or fraction scale showing 1/6)
- Six equal-height bars at height 1/6 (approximately 0.167)
- Each bar labeled with its probability value
- Grid lines for easy reading

Interactive Features:
- Hover over any bar to see exact probability value
- Display shows P(X = value) = 1/6 on hover
- Option to toggle between fraction (1/6) and decimal (0.167) display

Color Scheme: Use Sylvia's green (--sylvia-green: #2E7D32) for bars

Canvas Size: Responsive, approximately 600x400px

Implementation: p5.js with canvas-based controls
</details>

### What Makes a Valid Distribution?

Not every table of numbers is a valid probability distribution. A distribution is **valid** if and only if:

1. **Every probability is between 0 and 1:** For all values, \( 0 \leq P(X = x) \leq 1 \)
2. **The probabilities sum to 1:** \( \sum P(X = x) = 1 \)

These rules make sense. A probability can't be negative (that would mean something is "less than impossible"), and it can't be greater than 1 (that would mean something is "more than certain"). And since something has to happen, the total probability must equal 1.

!!! warning "Check Your Work"
    Always verify that your probabilities sum to 1. If they don't, you've made an error somewhere. This is a common mistake on the AP exam!

### Practice: Valid or Invalid?

Consider this distribution for X:

| x | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| P(X = x) | 0.3 | 0.3 | 0.2 | 0.2 |

Is this valid? Let's check:

- All probabilities are between 0 and 1: 0.3, 0.3, 0.2, 0.2 all pass
- Sum: 0.3 + 0.3 + 0.2 + 0.2 = 1.0

Yes, this is a valid probability distribution.

---

## Expected Value: The Long-Run Average

Here's where things get really useful. The **expected value** of a random variable is what you'd expect the average outcome to be if you repeated the random process many, many times.

The notation is \( E(X) \) or \( \mu_X \) (read as "mu sub X").

### The Formula for Expected Value

For a discrete random variable X with possible values \( x_1, x_2, ..., x_n \), the expected value is:

\[
E(X) = \mu_X = \sum x_i \cdot P(X = x_i)
\]

In words: multiply each value by its probability, then add them all up.

### Example: Expected Value of a Die Roll

For rolling a fair die:

\[
E(X) = 1 \cdot \frac{1}{6} + 2 \cdot \frac{1}{6} + 3 \cdot \frac{1}{6} + 4 \cdot \frac{1}{6} + 5 \cdot \frac{1}{6} + 6 \cdot \frac{1}{6}
\]

\[
E(X) = \frac{1 + 2 + 3 + 4 + 5 + 6}{6} = \frac{21}{6} = 3.5
\]

Wait, 3.5? But you can't roll a 3.5! That's exactly right. The expected value doesn't have to be a possible outcome. It's the long-run average. If you rolled a die 1,000 times and averaged all your rolls, you'd get something very close to 3.5.

!!! note "Acorn for Your Thoughts"
    I once tried to figure out how many acorns I'd collect on average each day. Some days were great (12 acorns!), some were terrible (just 2). By calculating the expected value, I knew my long-run average was about 7 acorns per day. That helped me plan my winter storage perfectly!

### Example: Insurance Premiums

Insurance companies use expected value constantly. Suppose a company sells a $100,000 life insurance policy to a 30-year-old for $250/year. Based on mortality tables, there's a 0.001 probability this person dies during the year.

Let X = the company's profit from this policy.

| Outcome | X (Profit) | Probability |
|---------|------------|-------------|
| Person lives | $250 | 0.999 |
| Person dies | $250 - $100,000 = -$99,750 | 0.001 |

\[
E(X) = 250(0.999) + (-99,750)(0.001)
\]

\[
E(X) = 249.75 - 99.75 = \$150
\]

On average, the company profits $150 per policy. With thousands of policies, this adds up significantly!

#### Diagram: Expected Value Calculator

<iframe src="../../sims/expected-value-calculator/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden; border: 2px solid var(--sylvia-green); border-radius: 8px;"></iframe>

<details markdown="1">
<summary>Expected Value Calculator MicroSim</summary>
Type: microsim

Purpose: Allow students to create custom probability distributions and calculate expected value interactively

Bloom Level: Apply (L3)
Bloom Verb: Calculate

Learning Objective: Students will calculate expected value by entering values and probabilities, observing how the weighted average is computed step-by-step.

Instructional Rationale: An interactive calculator supports the Apply level by letting students practice the expected value formula with immediate feedback. Students can experiment with different distributions and see how changing probabilities affects the expected value.

Canvas Layout:
- Main area: Input table for values and probabilities
- Side panel: Running calculation display
- Bottom: Expected value result with visual bar

Visual Elements:
- Editable table with columns: Value (x), Probability P(X=x), Contribution (x * P)
- Start with 4 rows, button to add more (up to 8)
- Running total of probabilities shown (must equal 1.0)
- Visual indicator (green checkmark or red X) showing if distribution is valid
- Bar chart showing the distribution updates in real-time
- Final expected value displayed prominently

Interactive Controls:
- Text inputs for values (numbers)
- Text inputs for probabilities (0-1)
- "Add Row" button
- "Clear All" button
- "Calculate E(X)" button
- Toggle between fraction and decimal input

Default Parameters:
- Pre-loaded with die roll example: values 1-6, each with probability 1/6

Behavior:
- As user enters probabilities, probability sum updates
- If sum exceeds 1 or any probability is negative, show error
- Contribution column auto-calculates as user types
- Expected value shown with calculation breakdown

Data Visibility:
- Stage 1: Show input values and probabilities
- Stage 2: Show each x * P(X=x) contribution
- Stage 3: Show sum of contributions = E(X)

Color Scheme: Sylvia's green for valid states, auburn for errors

Implementation: p5.js with canvas-based input controls
</details>

---

## Variance and Standard Deviation of Random Variables

Expected value tells us the center, but we also need to know about spread. How much variability should we expect?

### Variance of a Random Variable

The **variance** of X measures the average squared distance from the mean:

\[
Var(X) = \sigma_X^2 = \sum (x_i - \mu_X)^2 \cdot P(X = x_i)
\]

There's also a computational formula that's often easier to use:

\[
Var(X) = E(X^2) - [E(X)]^2
\]

In words: the variance equals "the expected value of X squared" minus "the expected value of X, quantity squared."

### Standard Deviation of a Random Variable

The **standard deviation** is simply the square root of variance:

\[
\sigma_X = \sqrt{Var(X)}
\]

Standard deviation is in the same units as X, which makes it easier to interpret.

### Example: Calculating Variance for a Die Roll

We already know \( E(X) = 3.5 \). Now let's find \( E(X^2) \):

\[
E(X^2) = 1^2 \cdot \frac{1}{6} + 2^2 \cdot \frac{1}{6} + 3^2 \cdot \frac{1}{6} + 4^2 \cdot \frac{1}{6} + 5^2 \cdot \frac{1}{6} + 6^2 \cdot \frac{1}{6}
\]

\[
E(X^2) = \frac{1 + 4 + 9 + 16 + 25 + 36}{6} = \frac{91}{6} \approx 15.17
\]

\[
Var(X) = E(X^2) - [E(X)]^2 = 15.17 - (3.5)^2 = 15.17 - 12.25 = 2.92
\]

\[
\sigma_X = \sqrt{2.92} \approx 1.71
\]

This means die rolls typically deviate from the mean of 3.5 by about 1.71 points.

---

## Transforming Random Variables

What happens when we add a constant to a random variable, or multiply it by something? Understanding these **linear transformations** is crucial.

### Adding a Constant

If we define \( Y = X + a \) (add a constant a to every value):

- \( E(Y) = E(X) + a \) (the mean shifts by a)
- \( Var(Y) = Var(X) \) (the spread stays the same)
- \( \sigma_Y = \sigma_X \) (standard deviation unchanged)

Think about it: if everyone in a class gets 5 bonus points on a test, the class average goes up by 5, but the spread of scores doesn't change.

### Multiplying by a Constant

If we define \( Y = bX \) (multiply every value by constant b):

- \( E(Y) = b \cdot E(X) \) (the mean is multiplied by b)
- \( Var(Y) = b^2 \cdot Var(X) \) (variance is multiplied by b squared)
- \( \sigma_Y = |b| \cdot \sigma_X \) (standard deviation is multiplied by |b|)

### General Linear Transformation

For \( Y = a + bX \):

\[
E(Y) = a + b \cdot E(X)
\]

\[
\sigma_Y = |b| \cdot \sigma_X
\]

| Operation | Effect on Mean | Effect on SD |
|-----------|---------------|--------------|
| Add constant a | Mean + a | No change |
| Multiply by b | Mean × b | SD × \|b\| |
| Y = a + bX | a + b(Mean) | \|b\| × SD |

!!! example "Currency Conversion"
    If X is the price in dollars with \( E(X) = \$50 \) and \( \sigma_X = \$10 \), and you convert to euros where Y = 0.85X:

    - \( E(Y) = 0.85 \times 50 = 42.50 \) euros
    - \( \sigma_Y = 0.85 \times 10 = 8.50 \) euros

---

## Combining Random Variables

Often we need to work with sums or differences of random variables. This is where things get really interesting!

### Sum of Random Variables

For \( T = X + Y \):

\[
E(X + Y) = E(X) + E(Y)
\]

The expected value of a sum is always the sum of expected values. This works no matter what!

But for variance, we need to be careful:

\[
Var(X + Y) = Var(X) + Var(Y) \quad \text{(only if X and Y are independent)}
\]

If X and Y are **independent** (knowing one tells you nothing about the other), variances add. If they're dependent, we need more information.

### Difference of Random Variables

For \( D = X - Y \):

\[
E(X - Y) = E(X) - E(Y)
\]

And here's the surprise for many students:

\[
Var(X - Y) = Var(X) + Var(Y) \quad \text{(if X and Y are independent)}
\]

Wait, variances still ADD even when we're subtracting? Yes! Variability comes from both sources, regardless of whether we're adding or subtracting.

!!! warning "Common Mistake Alert"
    Students often think Var(X - Y) = Var(X) - Var(Y). But that's wrong! Variability doesn't cancel out when you subtract. Variance always adds for independent variables.

### Standard Deviation Rules

Since \( \sigma = \sqrt{Var} \), and we add variances for independent variables:

\[
\sigma_{X+Y} = \sqrt{\sigma_X^2 + \sigma_Y^2}
\]

\[
\sigma_{X-Y} = \sqrt{\sigma_X^2 + \sigma_Y^2}
\]

Notice these are the same! Standard deviations don't add directly, they add "Pythagorean style" under a square root.

### Example: Combining Test Scores

Suppose scores on Quiz 1 have \( \mu = 75 \), \( \sigma = 10 \), and Quiz 2 has \( \mu = 80 \), \( \sigma = 12 \). If the quizzes are independent:

**Total score T = Quiz1 + Quiz2:**

- \( E(T) = 75 + 80 = 155 \)
- \( Var(T) = 10^2 + 12^2 = 100 + 144 = 244 \)
- \( \sigma_T = \sqrt{244} \approx 15.6 \)

**Difference D = Quiz2 - Quiz1:**

- \( E(D) = 80 - 75 = 5 \)
- \( Var(D) = 10^2 + 12^2 = 244 \) (same as for sum!)
- \( \sigma_D = \sqrt{244} \approx 15.6 \)

#### Diagram: Combining Random Variables Visualizer

<iframe src="../../sims/combining-random-variables/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden; border: 2px solid var(--sylvia-green); border-radius: 8px;"></iframe>

<details markdown="1">
<summary>Combining Random Variables Visualizer</summary>
Type: microsim

Purpose: Demonstrate how means and variances combine when adding or subtracting independent random variables

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will explain why variances add for both sums and differences of independent random variables, and why standard deviations don't simply add.

Instructional Rationale: Visual representation with concrete examples helps students overcome the common misconception that Var(X-Y) = Var(X) - Var(Y). The step-by-step display shows exactly how the formulas work.

Data Visibility Requirements:
- Stage 1: Display X distribution with mean and SD
- Stage 2: Display Y distribution with mean and SD
- Stage 3: Show calculation for E(X+Y) and E(X-Y)
- Stage 4: Show Var(X) + Var(Y) calculation
- Stage 5: Show final SD calculation with square root

Visual Elements:
- Two normal curve representations for X and Y
- Sliders to adjust mean and SD of each
- Toggle switch: "Sum (X+Y)" vs "Difference (X-Y)"
- Result display showing combined distribution
- Step-by-step calculation panel

Interactive Controls:
- Slider for E(X): range 0-100, default 50
- Slider for SD(X): range 1-20, default 10
- Slider for E(Y): range 0-100, default 50
- Slider for SD(Y): range 1-20, default 10
- Toggle: Sum / Difference
- Button: "Show Calculation Steps"

Behavior:
- As sliders move, combined distribution updates
- Calculation shows E(X+Y) = E(X) + E(Y)
- Variance calculation explicitly shows addition
- SD calculation shows square root of sum of squared SDs
- Visual emphasis that SD(X+Y) < SD(X) + SD(Y)

Color Scheme:
- X distribution: Sylvia's green
- Y distribution: Sylvia's auburn
- Combined: Sylvia's hazel

Implementation: p5.js with canvas-based sliders and toggle
</details>

---

## The Binomial Distribution

Now we're ready for one of the most important distributions in statistics: the **binomial distribution**. You'll use this constantly in AP Statistics and beyond.

### The Binomial Setting

A binomial setting has four conditions (remember **BINS**):

1. **B**inary outcomes: Each trial has exactly two outcomes (success/failure)
2. **I**ndependent trials: The outcome of one trial doesn't affect others
3. **N**umber of trials is fixed: We know n ahead of time
4. **S**ame probability: The probability of success p is constant

| Condition | What It Means | Example That Fits | Example That Doesn't |
|-----------|--------------|-------------------|---------------------|
| Binary | Only 2 outcomes | Coin flip (H/T) | Die roll (1,2,3,4,5,6) |
| Independent | Trials don't affect each other | Multiple coin flips | Drawing without replacement |
| Fixed n | Know total trials | Flip exactly 10 coins | Flip until you get heads |
| Same p | Constant probability | Fair coin (p=0.5) | Getting harder as you go |

### Examples of Binomial Settings

These ARE binomial:

- Flip a coin 20 times, count heads
- Survey 100 people, count those who approve (if population is large)
- Answer 15 multiple-choice questions by guessing, count correct

These are NOT binomial:

- Draw 5 cards without replacement, count aces (not independent)
- Flip until you get 3 heads (n not fixed)
- Shoot free throws until you miss (n not fixed, and maybe p changes as you tire)

!!! tip "Sylvia's BINS Check"
    Before using binomial formulas, always verify all four conditions. I write "BINS" in the margin and check each one. It's saved my bushy tail on many exams!

### The Binomial Distribution

If X counts the number of successes in n independent trials with success probability p, then X has a **binomial distribution**:

\[
X \sim \text{Binomial}(n, p)
\]

The possible values are X = 0, 1, 2, ..., n.

### The Binomial Probability Formula

The probability of getting exactly k successes in n trials is:

\[
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}
\]

Where:

- \( \binom{n}{k} = \frac{n!}{k!(n-k)!} \) is the binomial coefficient ("n choose k")
- \( p^k \) is the probability of k successes
- \( (1-p)^{n-k} \) is the probability of (n-k) failures

Let's break this down:

- **\( \binom{n}{k} \)**: How many ways can k successes occur among n trials?
- **\( p^k \)**: Probability of success happening k times
- **\( (1-p)^{n-k} \)**: Probability of failure happening (n-k) times

### Example: Coin Flips

What's the probability of getting exactly 3 heads in 5 coin flips?

Here \( n = 5 \), \( k = 3 \), and \( p = 0.5 \).

\[
P(X = 3) = \binom{5}{3} (0.5)^3 (0.5)^2
\]

\[
= 10 \cdot 0.125 \cdot 0.25 = 10 \cdot 0.03125 = 0.3125
\]

There's a 31.25% chance of getting exactly 3 heads.

#### Diagram: Binomial Probability Explorer

<iframe src="../../sims/binomial-probability-explorer/main.html" width="100%" height="600px" scrolling="no" style="overflow: hidden; border: 2px solid var(--sylvia-green); border-radius: 8px;"></iframe>

<details markdown="1">
<summary>Binomial Probability Explorer MicroSim</summary>
Type: microsim

Purpose: Allow students to explore how n and p affect the shape of the binomial distribution

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students will analyze how changing the number of trials (n) and probability of success (p) affects the shape, center, and spread of the binomial distribution.

Instructional Rationale: Parameter exploration supports the Analyze level by helping students discover patterns and relationships. Students can observe that larger n makes the distribution more symmetric and that p determines skewness.

Canvas Layout:
- Main area (70%): Bar chart showing P(X = k) for all k from 0 to n
- Control panel (30%): Sliders and displays

Visual Elements:
- Probability histogram with bars for each k value
- Highlighted bar showing P(X = selected k)
- Overlay showing mean (vertical line)
- Display of calculated probabilities P(X = k), P(X <= k), P(X >= k)

Interactive Controls:
- Slider for n: range 1-50, default 10
- Slider for p: range 0-1, step 0.05, default 0.5
- Slider for k: range 0-n, default 5
- Checkboxes: Show mean line, Show cumulative region
- Button: "Calculate P(X = k)"

Default Parameters:
- n = 10
- p = 0.5
- k = 5

Behavior:
- Distribution updates in real-time as n or p changes
- Mean marker μ = np moves with parameters
- For k selection, show step-by-step formula calculation
- Display P(X = k) with full formula breakdown
- Color region for P(X <= k) or P(X >= k) based on toggle

Key Insights to Highlight:
- When p = 0.5, distribution is symmetric
- When p < 0.5, distribution is right-skewed
- When p > 0.5, distribution is left-skewed
- Larger n → more bell-shaped

Color Scheme:
- Bars: Sylvia's green with auburn highlight for selected k
- Mean line: Sylvia's hazel
- Cumulative region: Light green fill

Implementation: p5.js with canvas-based sliders, include binomial coefficient calculation display

Canvas Size: Responsive, minimum 700x500px
</details>

### Binomial Mean and Standard Deviation

For a binomial distribution with parameters n and p:

\[
\mu_X = np
\]

\[
\sigma_X = \sqrt{np(1-p)}
\]

These formulas are wonderfully simple and very useful!

**Example:** For n = 100 coin flips with p = 0.5:

- \( \mu = 100 \times 0.5 = 50 \) heads expected
- \( \sigma = \sqrt{100 \times 0.5 \times 0.5} = \sqrt{25} = 5 \)

So in 100 flips, we expect about 50 heads, give or take about 5.

### Using Technology for Binomial Probabilities

Calculating binomial probabilities by hand is tedious for large n. Use your calculator!

**TI-83/84:**

- **binompdf(n, p, k)**: Calculates P(X = k)
- **binomcdf(n, p, k)**: Calculates P(X ≤ k)

**Examples with n = 10, p = 0.3:**

- P(X = 4): binompdf(10, 0.3, 4) = 0.200
- P(X ≤ 4): binomcdf(10, 0.3, 4) = 0.850
- P(X ≥ 5): 1 - binomcdf(10, 0.3, 4) = 0.150

---

## The Geometric Distribution

The **geometric distribution** answers a different question: "How many trials until the first success?"

### The Geometric Setting

Like the binomial, but with one key difference:

1. **B**inary outcomes: Each trial has two outcomes (success/failure)
2. **I**ndependent trials: Trials don't affect each other
3. **T**rials continue until first success: We keep going until we succeed
4. **S**ame probability: The probability p is constant

Notice we don't have a fixed n because we stop when we get our first success.

### Geometric Distribution

If X = number of trials until first success, then X has a **geometric distribution**:

\[
X \sim \text{Geometric}(p)
\]

The possible values are X = 1, 2, 3, ... (infinitely many, but probabilities get tiny)

### Geometric Probability Formula

\[
P(X = k) = (1-p)^{k-1} \cdot p
\]

This makes sense:

- \( (1-p)^{k-1} \): Fail (k-1) times
- \( p \): Then succeed on trial k

### Example: First Head

You flip a coin until you get heads. What's P(X = 4), the probability that the first head is on the 4th flip?

You need: TTTH

\[
P(X = 4) = (0.5)^3 \cdot (0.5) = 0.125 \cdot 0.5 = 0.0625
\]

There's a 6.25% chance the first head appears on flip 4.

### Geometric Mean

The expected number of trials until first success is:

\[
\mu_X = \frac{1}{p}
\]

This formula is beautifully intuitive. If p = 0.5 (coin flip), you expect 1/0.5 = 2 flips to get your first head. If p = 0.1 (rare event), you expect 1/0.1 = 10 trials.

| Probability of Success (p) | Expected Trials Until Success (1/p) |
|---------------------------|-------------------------------------|
| 0.5 | 2 |
| 0.25 | 4 |
| 0.1 | 10 |
| 0.05 | 20 |
| 0.01 | 100 |

!!! note "Sylvia's Acorn Hunt"
    When I'm searching for the perfect acorn, I might have a 1 in 5 chance (p = 0.2) of finding one under any given tree. On average, I expect to check 1/0.2 = 5 trees before finding my perfect acorn. Some days I get lucky on tree 1; other days it takes 10 or more!

#### Diagram: Geometric Distribution Simulator

<iframe src="../../sims/geometric-distribution-sim/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden; border: 2px solid var(--sylvia-green); border-radius: 8px;"></iframe>

<details markdown="1">
<summary>Geometric Distribution Simulator</summary>
Type: microsim

Purpose: Simulate trials until first success and build up the geometric distribution empirically

Bloom Level: Apply (L3)
Bloom Verb: Demonstrate

Learning Objective: Students will demonstrate understanding of the geometric distribution by running simulations and comparing empirical results to theoretical probabilities.

Instructional Rationale: Simulation supports the Apply level by letting students practice concepts through experimentation. Seeing many trials accumulate into the theoretical distribution reinforces the connection between individual trials and probability.

Canvas Layout:
- Top: Trial animation area showing sequence of successes/failures
- Middle: Building histogram of "trials until success"
- Bottom: Controls and statistics

Visual Elements:
- Animated sequence showing S/F outcomes
- Growing bar chart of trial counts
- Display of running average vs theoretical mean (1/p)
- Comparison of empirical vs theoretical P(X = k)

Interactive Controls:
- Slider for p: range 0.05-0.95, step 0.05, default 0.3
- "Run 1 Trial" button
- "Run 10 Trials" button
- "Run 100 Trials" button
- "Reset" button
- Speed slider for animation

Default Parameters:
- p = 0.3
- Animation speed: Medium

Behavior:
- Each trial shows sequence: F, F, F, ..., S (animation)
- Record number of trials until S
- Add to histogram
- Update running average
- Show theoretical mean line
- After many trials, empirical distribution matches geometric

Statistics Display:
- Total experiments run
- Empirical mean
- Theoretical mean (1/p)
- Empirical P(X = 1), P(X = 2), etc.

Color Scheme:
- Success (S): Sylvia's green
- Failure (F): Sylvia's auburn
- Bars: Green with intensity based on frequency
- Theoretical line: Hazel

Implementation: p5.js with canvas-based buttons and animation

Canvas Size: Responsive, minimum 650x450px
</details>

### Comparing Binomial and Geometric

| Feature | Binomial | Geometric |
|---------|----------|-----------|
| Question | How many successes in n trials? | How many trials until first success? |
| Fixed? | n is fixed | n is random |
| Random variable | Number of successes | Number of trials |
| Possible values | 0, 1, 2, ..., n | 1, 2, 3, ... (infinite) |
| Mean formula | μ = np | μ = 1/p |
| When to use | "Out of n trials, how many..." | "How long until..." |

---

## Putting It All Together

Random variables are the bridge between probability and the statistical inference you'll learn soon. Let's recap the key formulas:

### Summary of Formulas

**Expected Value:**
\[
E(X) = \sum x_i \cdot P(X = x_i)
\]

**Variance:**
\[
Var(X) = \sum (x_i - \mu)^2 \cdot P(X = x_i) = E(X^2) - [E(X)]^2
\]

**Linear Transformation (Y = a + bX):**
\[
E(Y) = a + b \cdot E(X), \quad \sigma_Y = |b| \cdot \sigma_X
\]

**Combining Independent Variables:**
\[
E(X \pm Y) = E(X) \pm E(Y)
\]
\[
Var(X \pm Y) = Var(X) + Var(Y) \text{ (both add!)}
\]

**Binomial Distribution (X ~ Binomial(n, p)):**
\[
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}
\]
\[
\mu = np, \quad \sigma = \sqrt{np(1-p)}
\]

**Geometric Distribution (X ~ Geometric(p)):**
\[
P(X = k) = (1-p)^{k-1} p
\]
\[
\mu = \frac{1}{p}
\]

### Decision Guide: Which Distribution?

Use this flowchart thinking:

1. **Are you counting successes in fixed trials?** → Binomial
2. **Are you counting trials until first success?** → Geometric
3. **Is it neither of these special cases?** → General discrete distribution (use table)

#### Diagram: Random Variable Concept Map

<iframe src="../../sims/random-variable-concept-map/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden; border: 2px solid var(--sylvia-green); border-radius: 8px;"></iframe>

<details markdown="1">
<summary>Random Variable Concept Map</summary>
Type: infographic

Purpose: Show the relationships between all random variable concepts covered in this chapter

Bloom Level: Analyze (L4)
Bloom Verb: Organize

Learning Objective: Students will organize their understanding of random variable concepts by exploring an interactive concept map showing how definitions, formulas, and distributions connect.

Visual Layout: Network/mind map with "Random Variable" at center

Main Nodes:
- Center: Random Variable
- Level 1: Discrete RV, Probability Distribution, Expected Value, Variance
- Level 2: Valid Distribution, Calculating E(X), SD of RV, Linear Transformation
- Level 3: Combining RVs, Binomial Distribution, Geometric Distribution

Connections with Labels:
- Random Variable → "has a" → Probability Distribution
- Probability Distribution → "must be" → Valid Distribution
- Random Variable → "is summarized by" → Expected Value
- Random Variable → "has spread" → Variance
- Variance → "square root gives" → Standard Deviation
- Expected Value → "changes by" → Linear Transformation
- Combining RVs → "uses" → Sum/Difference formulas
- Binomial → "special case of" → Discrete RV
- Geometric → "special case of" → Discrete RV

Interactive Features:
- Hover over any node to see definition/formula
- Click node to expand details panel
- Highlight all connected concepts on click
- Zoom in/out capability
- Different colors for concept types (definitions, formulas, distributions)

Color Scheme:
- Core concepts: Sylvia's green
- Formulas/calculations: Sylvia's auburn
- Special distributions: Sylvia's hazel
- Connections: Light gray with labels

Implementation: vis-network or p5.js with force-directed layout

Canvas Size: Responsive, minimum 700x500px
</details>

---

## Chapter Review

Let's squirrel away the key ideas from this chapter!

### Key Takeaways

1. **Random variables** translate random outcomes into numbers, enabling mathematical analysis.

2. **Probability distributions** show all possible values and their probabilities. Valid distributions have probabilities between 0 and 1 that sum to 1.

3. **Expected value** is the long-run average outcome: \( E(X) = \sum x \cdot P(X = x) \)

4. **Variance** measures spread around the mean. Standard deviation is its square root.

5. **Linear transformations**: Adding shifts the mean; multiplying scales both mean and SD.

6. **Combining independent random variables**: Means add/subtract as expected, but variances ALWAYS add.

7. **Binomial distribution** (BINS): Count successes in n trials. Mean = np, SD = √np(1-p).

8. **Geometric distribution**: Count trials until first success. Mean = 1/p.

### Common Mistakes to Avoid

- Thinking expected value must be a possible outcome
- Subtracting variances when combining random variables
- Forgetting to check BINS conditions before using binomial formulas
- Adding standard deviations directly instead of using the square root formula
- Confusing P(X = k) with P(X ≤ k)

!!! success "You've Got This!"
    Random variables might seem abstract at first, but they're the foundation for everything coming next: sampling distributions, confidence intervals, and hypothesis tests. You've just learned the language that makes all of that possible. My tail's tingling with excitement for what's ahead!

---

??? question "Practice Problem: Test Your Understanding"
    A basketball player makes 70% of her free throws. She shoots 10 free throws in a game.

    (a) What distribution describes the number of free throws she makes?

    (b) What is the expected number of made free throws?

    (c) What is the probability she makes exactly 8?

    (d) What is the probability she makes at least 8?

    **Click to reveal answers:**

    (a) Binomial(n=10, p=0.7) - because BINS conditions are met: Binary (make/miss), Independent shots, n=10 fixed, Same probability p=0.7

    (b) E(X) = np = 10(0.7) = 7 made free throws

    (c) P(X = 8) = C(10,8)(0.7)^8(0.3)^2 = 45(0.0576)(0.09) = 0.233 or about 23.3%

    (d) P(X ≥ 8) = P(X=8) + P(X=9) + P(X=10) = 0.233 + 0.121 + 0.028 = 0.382 or about 38.2%
