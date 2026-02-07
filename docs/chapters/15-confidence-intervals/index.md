---
title: Confidence Intervals
description: Learn to construct and interpret confidence intervals for proportions, understanding margin of error, confidence levels, and sample size determination
generated_by: claude skill chapter-content-generator
date: 2026-02-06 22:24:48
version: 0.04
---

# Confidence Intervals

## Summary

This chapter introduces confidence intervals as a method of estimation in statistical inference. Students will learn to construct and interpret confidence intervals for proportions, understand margin of error and confidence level, and determine appropriate sample sizes. Confidence intervals quantify the uncertainty inherent in using sample data to estimate population parameters.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

213. Point Estimate
214. Interval Estimate
215. Confidence Interval
216. Margin of Error
217. Confidence Level
218. Interpreting Confidence
219. Critical Value
220. Z Critical Values
221. Standard Error
222. CI for One Proportion
223. Conditions for CI Proportion
224. Interpreting CI
225. CI Width Factors
227. CI for Difference in Props
228. Pooled Proportion
247. Factors Affecting Power

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Standardization and Normal Distributions](../05-standardization-and-normal/index.md)
- [Chapter 14: Sampling Distributions](../14-sampling-distributions/index.md)

---

## Introduction: From Sample to Population

Welcome back, statistics explorers! In the last chapter, we discovered something remarkable: when you take many random samples from a population, the sample proportions form a beautiful, predictable pattern called a sampling distribution. Now we're going to use that knowledge for something incredibly practical: making educated guesses about an entire population based on just one sample.

Think about it this way. Imagine you're trying to figure out what percentage of students at your school prefer online learning. You can't ask all 2,000 students (that would take forever!), so you survey 100 randomly selected students and find that 62% prefer online learning. But here's the million-dollar question: Is the true proportion for the whole school exactly 62%? Probably not exactly, right? So what is it?

This is where confidence intervals come to the rescue. Instead of claiming a single number, we'll learn to say something like: "We're 95% confident that between 52% and 72% of all students prefer online learning." That interval captures the uncertainty in our estimate while still giving us useful information.

!!! note "Sylvia Says"
    "Let's crack this nut! Confidence intervals are one of the most powerful tools in statistics. They help us be honest about what we don't know while still making meaningful claims about what we've learned. My tail's tingling - we're onto something big here!"

---

## Point Estimates: Your Best Single Guess

When we use sample data to estimate a population parameter, we call that estimate a **point estimate**. It's a single value that represents our best guess about the true population value.

For proportions, the point estimate is simply the sample proportion, denoted \(\hat{p}\) (read as "p-hat"). If 62 out of 100 surveyed students prefer online learning, then:

\[
\hat{p} = \frac{62}{100} = 0.62
\]

The sample proportion \(\hat{p}\) is our best single guess for the true population proportion \(p\).

Here are common point estimates you'll encounter:

| Population Parameter | Point Estimate | Symbol |
|---------------------|----------------|--------|
| Population proportion | Sample proportion | \(\hat{p}\) |
| Population mean | Sample mean | \(\bar{x}\) |
| Population standard deviation | Sample standard deviation | \(s\) |

Point estimates are useful, but they have a significant limitation: they give us no information about how accurate they might be. That 62% could be spot-on, or it could be quite far from the truth. We need something more.

---

## Interval Estimates: Embracing Uncertainty

An **interval estimate** provides a range of plausible values for the population parameter. Instead of a single number, we give a lower bound and an upper bound that we believe captures the true parameter value.

The key insight here is that interval estimates acknowledge the reality of sampling variability. Every random sample gives slightly different results, so rather than pretending we know the exact truth, we embrace uncertainty by providing a range.

Think of it like estimating your arrival time for a road trip. You could say "I'll arrive at 3:47 PM" (a point estimate), but it's more realistic to say "I'll arrive between 3:30 and 4:00 PM" (an interval estimate). The interval acknowledges that traffic, weather, and other factors create uncertainty.

#### Diagram: Point Estimate vs Interval Estimate

<iframe src="../../sims/point-vs-interval-estimate/main.html" width="100%" height="400px" scrolling="no" style="border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

---

## Confidence Intervals: The Complete Package

A **confidence interval** is a specific type of interval estimate that comes with a stated **confidence level** (usually 90%, 95%, or 99%). The confidence level tells us how confident we are that our interval-building method will capture the true parameter.

The general formula for a confidence interval is:

\[
\text{Point Estimate} \pm \text{Margin of Error}
\]

Or equivalently:

\[
(\text{Point Estimate} - \text{Margin of Error}, \text{Point Estimate} + \text{Margin of Error})
\]

For a population proportion, this becomes:

\[
\hat{p} \pm z^* \cdot \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}
\]

Let's break down each piece of this formula:

- **\(\hat{p}\)** is the sample proportion (our point estimate)
- **\(z^*\)** is the critical value (we'll discuss this soon)
- **\(\sqrt{\frac{\hat{p}(1-\hat{p})}{n}}\)** is the standard error of the sample proportion
- **\(z^* \cdot \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}\)** is the margin of error

!!! tip "Sylvia's Study Tip"
    "I like to think of confidence intervals as putting a 'safety net' around my point estimate. The margin of error is the width of that net - wider nets catch more fish (or in our case, are more likely to catch the true parameter), but they're also less precise!"

---

## Understanding Margin of Error

The **margin of error** quantifies the maximum expected difference between the point estimate and the true population parameter. It represents the "plus or minus" part of our confidence interval.

Margin of error depends on three factors:

1. **Confidence level**: Higher confidence = larger margin of error
2. **Sample size**: Larger sample = smaller margin of error
3. **Variability in the data**: More variability = larger margin of error

For a proportion, the margin of error formula is:

\[
\text{ME} = z^* \cdot \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}
\]

When you hear poll results like "The candidate has 48% support with a margin of error of 3 percentage points," that means the confidence interval is 48% +/- 3%, or roughly 45% to 51%.

#### Diagram: Margin of Error Components

<iframe src="../../sims/margin-of-error-explorer/main.html" width="100%" height="450px" scrolling="no" style="border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

---

## Confidence Level: What Does 95% Really Mean?

The **confidence level** is one of the most misunderstood concepts in statistics. Let's make sure you understand it correctly.

When we say we have a "95% confidence interval," we do NOT mean:

- There's a 95% chance the true parameter is in this specific interval
- 95% of the data falls within this interval
- We're 95% sure we're right

What we DO mean:

If we were to repeat our sampling process many, many times and construct a confidence interval each time, approximately 95% of those intervals would contain the true population parameter.

It's about the reliability of the METHOD, not the probability for any single interval.

Here's an analogy: Imagine a basketball player who makes 95% of their free throws. Before they shoot any particular free throw, we're confident in their ability (the method), but we can't say there's a 95% chance THIS specific shot goes in - it either will or it won't. Similarly, our confidence interval either contains the true parameter or it doesn't. The 95% describes how often the method works in the long run.

| Confidence Level | Meaning |
|-----------------|---------|
| 90% | 90 out of 100 intervals would capture the true parameter |
| 95% | 95 out of 100 intervals would capture the true parameter |
| 99% | 99 out of 100 intervals would capture the true parameter |

#### Diagram: Confidence Level Demonstration

<iframe src="../../sims/confidence-level-simulator/main.html" width="100%" height="500px" scrolling="no" style="border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

!!! note "Sylvia Says"
    "Acorn for your thoughts? Here's the key insight: once you've calculated a specific confidence interval, the true parameter is either in there or it isn't - we just don't know which! The confidence level tells us about the reliability of our interval-building process, not the probability for any single interval. Every statistician drops an acorn sometimes, and about 5% of 95% confidence intervals miss the mark!"

---

## Critical Values: The z* Factor

The **critical value** (often written as \(z^*\)) is the number of standard errors we extend from our point estimate to create the desired confidence level. It comes from the standard normal distribution.

For common confidence levels, the critical values are:

| Confidence Level | Critical Value \(z^*\) | Interpretation |
|-----------------|------------------------|----------------|
| 90% | 1.645 | Extend 1.645 standard errors each direction |
| 95% | 1.960 | Extend 1.960 standard errors each direction |
| 99% | 2.576 | Extend 2.576 standard errors each direction |

Where do these numbers come from? They're the z-scores that capture the middle portion of the standard normal distribution:

- For 95% confidence, we want the middle 95% of the normal curve
- This leaves 2.5% in each tail
- The z-score that has 2.5% above it is 1.96

You can find critical values using a z-table (looking for the z-score with the appropriate tail area) or using technology.

#### Diagram: Critical Values on the Normal Curve

<iframe src="../../sims/critical-value-visualizer/main.html" width="100%" height="420px" scrolling="no" style="border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

---

## Standard Error: Measuring Sampling Variability

The **standard error** is the standard deviation of the sampling distribution. It measures how much we expect sample statistics to vary from sample to sample.

For a sample proportion, the standard error is:

\[
SE_{\hat{p}} = \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}
\]

Notice that we use \(\hat{p}\) (the sample proportion) in this formula because we typically don't know the true population proportion \(p\). This is slightly different from the standard deviation of the sampling distribution formula you learned in Chapter 14, which used \(p\).

The standard error decreases as sample size increases, which makes intuitive sense: larger samples give us more information about the population and thus more reliable estimates.

Here's how sample size affects standard error (assuming \(\hat{p} = 0.5\)):

| Sample Size (n) | Standard Error |
|----------------|----------------|
| 25 | 0.100 |
| 100 | 0.050 |
| 400 | 0.025 |
| 1600 | 0.0125 |

Notice that to cut the standard error in half, you need to quadruple the sample size. This is because of the square root in the formula.

!!! tip "Quick Tip"
    The standard error is largest when \(\hat{p} = 0.5\) and decreases as \(\hat{p}\) moves toward 0 or 1. This is because variability is maximized when outcomes are evenly split.

---

## Constructing a Confidence Interval for One Proportion

Now let's put it all together! To construct a confidence interval for a population proportion, follow these steps:

**Step 1: Check the conditions** (we'll cover these in detail next)

**Step 2: Calculate the point estimate**
\[
\hat{p} = \frac{x}{n}
\]
where \(x\) is the number of successes and \(n\) is the sample size.

**Step 3: Find the critical value \(z^*\)** based on your confidence level

**Step 4: Calculate the standard error**
\[
SE = \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}
\]

**Step 5: Calculate the margin of error**
\[
ME = z^* \cdot SE
\]

**Step 6: Construct the interval**
\[
(\hat{p} - ME, \hat{p} + ME)
\]

**Example:** A random sample of 200 registered voters found that 124 support a new tax proposal. Construct a 95% confidence interval for the true proportion of all registered voters who support the proposal.

**Solution:**

- \(\hat{p} = \frac{124}{200} = 0.62\)
- For 95% confidence, \(z^* = 1.96\)
- \(SE = \sqrt{\frac{0.62(1-0.62)}{200}} = \sqrt{\frac{0.62(0.38)}{200}} = \sqrt{0.001178} \approx 0.0343\)
- \(ME = 1.96 \times 0.0343 \approx 0.0672\)
- CI: \((0.62 - 0.0672, 0.62 + 0.0672) = (0.553, 0.687)\)

We are 95% confident that between 55.3% and 68.7% of all registered voters support the new tax proposal.

#### Diagram: CI Construction Step-by-Step

<iframe src="../../sims/ci-construction-walkthrough/main.html" width="100%" height="520px" scrolling="no" style="border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

---

## Conditions for Constructing a CI for Proportions

Before constructing a confidence interval for a proportion, we must verify that certain conditions are met. These conditions ensure that the sampling distribution of \(\hat{p}\) is approximately normal, which is necessary for our interval to be valid.

**The Three Conditions:**

1. **Random Sample**: The data must come from a random sample or randomized experiment. This ensures the sample is representative of the population.

2. **Independence (10% Condition)**: When sampling without replacement, the sample size should be no more than 10% of the population size. This ensures that selecting one individual doesn't noticeably affect the probability of selecting another.
   \[
   n \leq 0.10N
   \]
   where \(n\) is sample size and \(N\) is population size.

3. **Large Counts (Success/Failure Condition)**: Both the number of successes and failures in the sample must be at least 10:
   \[
   n\hat{p} \geq 10 \quad \text{and} \quad n(1-\hat{p}) \geq 10
   \]

The large counts condition ensures the sampling distribution is approximately normal. If this condition fails, the normal approximation doesn't work well, and our confidence interval won't be reliable.

**Example Check:** For our voter example with \(n = 200\) and \(\hat{p} = 0.62\):

- Random sample? Assume yes (stated in problem)
- Independence? If there are at least 2,000 registered voters, then 200 is at most 10% of the population. Check!
- Large counts?
  - Successes: \(200 \times 0.62 = 124 \geq 10\) Check!
  - Failures: \(200 \times 0.38 = 76 \geq 10\) Check!

All conditions are satisfied.

!!! warning "Condition Check Required"
    On the AP exam, you must always verify conditions before constructing a confidence interval. Simply stating "conditions met" without showing the checks will cost you points!

---

## Interpreting Confidence Intervals Correctly

How you interpret a confidence interval matters - a lot! Let's look at correct and incorrect interpretations.

**Correct Interpretation Template:**
"We are [confidence level]% confident that the true [parameter in context] is between [lower bound] and [upper bound]."

**For our voter example:**
"We are 95% confident that the true proportion of all registered voters who support the new tax proposal is between 0.553 and 0.687 (or 55.3% and 68.7%)."

**Common Mistakes to Avoid:**

| Incorrect Statement | Why It's Wrong |
|--------------------|----------------|
| "There is a 95% probability that the true proportion is in this interval" | The true proportion is fixed; it's either in the interval or not. Probability doesn't apply. |
| "95% of voters support the proposal between 55.3% and 68.7%" | This describes individual voters, not the parameter. |
| "95% of all samples will give proportions in this interval" | The interval is about the parameter, not future sample statistics. |
| "We are 95% confident the sample proportion is between..." | The sample proportion is known exactly - it's 0.62! The interval estimates the population proportion. |

The key is to always mention:

- The confidence level
- That you're estimating the population parameter (not the sample statistic)
- The context (what the proportion represents)
- The actual interval bounds

!!! note "Sylvia Says"
    "Time to squirrel away this knowledge! Remember: confidence intervals are about the POPULATION parameter, not the sample statistic. I've seen many students mix these up. The sample proportion is 0.62 - we know that for certain! What we're uncertain about is the population proportion, which is why we need the interval."

---

## Factors That Affect Confidence Interval Width

The width of a confidence interval tells us how precise our estimate is. Narrower intervals are more useful because they give a tighter range of plausible values.

The width of a confidence interval is:

\[
\text{Width} = 2 \times \text{Margin of Error} = 2 \times z^* \times SE
\]

Three factors affect CI width:

**1. Confidence Level**

Higher confidence level = Larger \(z^*\) = Wider interval

This is the trade-off between confidence and precision. If you want to be more confident, you pay for it with a wider interval.

| Confidence Level | z* | Relative Width |
|-----------------|-----|----------------|
| 90% | 1.645 | Narrowest |
| 95% | 1.960 | Medium |
| 99% | 2.576 | Widest |

**2. Sample Size**

Larger sample size = Smaller standard error = Narrower interval

This is because \(SE = \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}\), and \(n\) is in the denominator under the square root.

**Important:** To cut the margin of error in half, you must quadruple the sample size!

**3. Sample Proportion**

The standard error is maximized when \(\hat{p} = 0.5\) and decreases as \(\hat{p}\) approaches 0 or 1.

| Sample Proportion | SE (assuming n=100) | Relative Width |
|------------------|---------------------|----------------|
| 0.5 | 0.050 | Widest |
| 0.7 or 0.3 | 0.046 | Medium |
| 0.9 or 0.1 | 0.030 | Narrower |

This makes sense: when opinions are evenly split, there's more variability (and uncertainty) than when they're lopsided.

---

## Determining Sample Size

Sometimes you need to plan a study and want to achieve a specific margin of error. You can work backward from the margin of error formula to determine the required sample size.

Starting with:
\[
ME = z^* \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}
\]

Solving for \(n\):
\[
n = \left(\frac{z^*}{ME}\right)^2 \hat{p}(1-\hat{p})
\]

**The Problem:** Before collecting data, we don't know \(\hat{p}\)!

**Two Solutions:**

1. **Use a prior estimate** if you have one from previous research or a pilot study
2. **Use \(\hat{p} = 0.5\)** for a conservative estimate (this maximizes the required sample size)

**Example:** A pollster wants to estimate the proportion of adults who support a policy with a margin of error of 3 percentage points at 95% confidence. How many people should be surveyed?

Using \(\hat{p} = 0.5\) for the conservative approach:
\[
n = \left(\frac{1.96}{0.03}\right)^2 (0.5)(0.5) = (65.33)^2 (0.25) = 4268.44 (0.25) \approx 1067
\]

The pollster should survey at least 1,067 people.

**Always round UP** when determining sample size to ensure the margin of error is at most the desired amount.

#### Diagram: Sample Size Calculator

<iframe src="../../sims/sample-size-calculator/main.html" width="100%" height="400px" scrolling="no" style="border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

---

## Confidence Interval for the Difference in Two Proportions

Sometimes we want to compare two populations. For example: Is there a difference in the proportion of teens vs. adults who use social media daily?

When comparing two proportions from independent samples, we construct a confidence interval for \(p_1 - p_2\), the difference between the two population proportions.

The formula is:

\[
(\hat{p}_1 - \hat{p}_2) \pm z^* \sqrt{\frac{\hat{p}_1(1-\hat{p}_1)}{n_1} + \frac{\hat{p}_2(1-\hat{p}_2)}{n_2}}
\]

The standard error for the difference combines the variability from both samples:

\[
SE_{\hat{p}_1 - \hat{p}_2} = \sqrt{\frac{\hat{p}_1(1-\hat{p}_1)}{n_1} + \frac{\hat{p}_2(1-\hat{p}_2)}{n_2}}
\]

**Conditions for Two-Proportion CI:**

1. **Random samples**: Both samples must be random (or from randomized experiments)
2. **Independence**:
   - The two samples are independent of each other
   - Each sample is no more than 10% of its population
3. **Large counts**: All four counts must be at least 10:
   - \(n_1\hat{p}_1 \geq 10\) and \(n_1(1-\hat{p}_1) \geq 10\)
   - \(n_2\hat{p}_2 \geq 10\) and \(n_2(1-\hat{p}_2) \geq 10\)

**Interpretation:** If the interval contains 0, there's no statistically significant difference between the two proportions. If the entire interval is positive, \(p_1 > p_2\). If the entire interval is negative, \(p_1 < p_2\).

**Example:** In a survey, 156 of 200 teens use social media daily, compared to 98 of 180 adults.

- \(\hat{p}_1 = 156/200 = 0.78\) (teens)
- \(\hat{p}_2 = 98/180 = 0.544\) (adults)
- \(\hat{p}_1 - \hat{p}_2 = 0.78 - 0.544 = 0.236\)

For 95% confidence:
\[
SE = \sqrt{\frac{0.78(0.22)}{200} + \frac{0.544(0.456)}{180}} = \sqrt{0.000858 + 0.001378} = \sqrt{0.002236} \approx 0.0473
\]

\[
ME = 1.96 \times 0.0473 \approx 0.0927
\]

\[
CI: (0.236 - 0.093, 0.236 + 0.093) = (0.143, 0.329)
\]

We are 95% confident that the true difference in proportions (teens minus adults) who use social media daily is between 0.143 and 0.329. Since the entire interval is positive, we can conclude that a higher proportion of teens use social media daily compared to adults.

---

## Understanding Pooled Proportion

The **pooled proportion** is used in hypothesis testing (which we'll cover in the next chapter) when we assume two populations have the same proportion. It combines data from both samples to get a single estimate.

\[
\hat{p}_{\text{pooled}} = \frac{x_1 + x_2}{n_1 + n_2}
\]

where \(x_1\) and \(x_2\) are the number of successes in each sample.

**Important:** We do NOT use the pooled proportion when constructing confidence intervals for the difference in proportions. The pooled proportion is only used in hypothesis testing when we assume \(H_0: p_1 = p_2\).

For confidence intervals, we use the individual sample proportions \(\hat{p}_1\) and \(\hat{p}_2\) because we're not assuming the proportions are equal - we're trying to estimate their difference!

| Situation | Use | Reason |
|-----------|-----|--------|
| CI for difference | Individual \(\hat{p}_1\) and \(\hat{p}_2\) | Not assuming equality |
| Hypothesis test with \(H_0: p_1 = p_2\) | Pooled \(\hat{p}_{\text{pooled}}\) | Assuming equality under null |

---

## Factors Affecting Statistical Power (Preview)

While we'll study hypothesis testing in detail next chapter, it's worth previewing how confidence intervals connect to **power** - the ability to detect a real difference or effect when one exists.

**Statistical power** is the probability of correctly rejecting a false null hypothesis. In the context of confidence intervals, higher power means narrower intervals that are more likely to exclude false values.

Factors that increase power (and narrow confidence intervals):

1. **Larger sample size**: More data = more precision = more power
2. **Larger effect size**: Bigger differences are easier to detect
3. **Lower confidence level**: 90% CI is narrower than 99% CI (but less confident)
4. **Lower variability**: Less noise in the data makes patterns clearer

The relationship between sample size and power is particularly important when designing studies. If you need to detect small differences with high confidence, you'll need a large sample size.

| Change | Effect on CI Width | Effect on Power |
|--------|-------------------|-----------------|
| Increase sample size | Decreases (narrows) | Increases |
| Increase confidence level | Increases (widens) | Decreases |
| Increase effect size | No direct effect | Increases |
| Decrease variability | Decreases (narrows) | Increases |

---

## Common Mistakes and How to Avoid Them

Let's wrap up by reviewing the most common errors students make with confidence intervals.

**Mistake 1: Incorrect interpretation of confidence level**

- Wrong: "There's a 95% probability the true proportion is in this interval"
- Right: "If we repeated this process many times, 95% of the intervals would contain the true proportion"

**Mistake 2: Forgetting to check conditions**

Always verify:

- Random sample
- Independence (10% condition)
- Large counts (at least 10 successes and 10 failures)

**Mistake 3: Using the wrong formula**

- For one proportion: \(\hat{p} \pm z^* \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}\)
- For difference in proportions: \((\hat{p}_1 - \hat{p}_2) \pm z^* \sqrt{\frac{\hat{p}_1(1-\hat{p}_1)}{n_1} + \frac{\hat{p}_2(1-\hat{p}_2)}{n_2}}\)

**Mistake 4: Confusing standard error and standard deviation**

- Standard deviation describes spread within a sample
- Standard error describes variability of sample statistics across samples

**Mistake 5: Not interpreting in context**

Always mention what the proportion represents! Don't just say "between 0.55 and 0.69" - say "between 55% and 69% of registered voters."

**Mistake 6: Using pooled proportion for confidence intervals**

Pooled proportion is for hypothesis tests only, not for CIs for the difference in proportions.

---

## Chapter Summary

Congratulations! You've learned one of the most powerful tools in statistics. Let's review the key concepts.

**Key Takeaways:**

- A **point estimate** is a single value used to estimate a parameter (\(\hat{p}\) estimates \(p\))
- An **interval estimate** provides a range of plausible values
- A **confidence interval** = point estimate \(\pm\) margin of error
- **Margin of error** = \(z^* \times SE\)
- **Confidence level** describes the long-run capture rate of the interval-building method
- **Critical values** (\(z^*\)) come from the normal distribution: 1.645 (90%), 1.96 (95%), 2.576 (99%)
- **Standard error** measures sampling variability: \(SE = \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}\)

**Conditions for CI for proportions:**

1. Random sample
2. Independence (10% condition)
3. Large counts (at least 10 successes and failures)

**Factors affecting CI width:**

- Confidence level (higher = wider)
- Sample size (larger = narrower)
- Sample proportion (closer to 0.5 = wider)

**Correct interpretation template:**
"We are [C]% confident that the true [parameter in context] is between [lower] and [upper]."

!!! note "Sylvia's Final Thought"
    "Look at you go! You just learned how to quantify uncertainty - something that took statisticians centuries to figure out. Confidence intervals let us be honest about what we don't know while still making meaningful claims. That's a superpower right there. Now *that's* a data point worth collecting! In the next chapter, we'll use these same ideas to test hypotheses. Time to squirrel away this knowledge!"

---

## Practice Problems

??? question "Problem 1: Constructing a CI"
    A random sample of 150 college students found that 87 use streaming services as their primary source of entertainment. Construct a 95% confidence interval for the proportion of all college students who use streaming as their primary entertainment source.

    **Solution:**

    First, check conditions:
    - Random sample: Given
    - Independence: Assume the college has at least 1,500 students
    - Large counts: 87 successes and 63 failures, both > 10

    Calculate:
    - \(\hat{p} = 87/150 = 0.58\)
    - \(z^* = 1.96\)
    - \(SE = \sqrt{0.58(0.42)/150} = \sqrt{0.001624} = 0.0403\)
    - \(ME = 1.96 \times 0.0403 = 0.079\)
    - CI: (0.58 - 0.079, 0.58 + 0.079) = (0.501, 0.659)

    We are 95% confident that between 50.1% and 65.9% of all college students use streaming services as their primary entertainment source.

??? question "Problem 2: Interpreting a CI"
    A 99% confidence interval for the proportion of adults who exercise regularly is (0.35, 0.45). Which of the following is a correct interpretation?

    A) 99% of adults exercise between 35% and 45% of the time
    B) There is a 99% probability that the true proportion is between 0.35 and 0.45
    C) We are 99% confident that between 35% and 45% of all adults exercise regularly
    D) 99% of samples will have proportions between 0.35 and 0.45

    **Solution:** C is correct. The confidence interval estimates the population proportion, and the confidence level describes the reliability of the method, not the probability for this specific interval.

??? question "Problem 3: Sample Size Determination"
    A researcher wants to estimate the proportion of high school students who have part-time jobs with a margin of error of 4 percentage points at 90% confidence. What sample size is needed?

    **Solution:**

    Using the conservative approach (\(\hat{p} = 0.5\)):
    - \(z^* = 1.645\) for 90% confidence
    - \(ME = 0.04\)

    \[
    n = \left(\frac{1.645}{0.04}\right)^2 (0.5)(0.5) = (41.125)^2 (0.25) = 1691.27 (0.25) = 422.8
    \]

    Round up: The researcher needs at least 423 students.

---

## Key Formulas Reference

| Formula | Purpose |
|---------|---------|
| \(\hat{p} = \frac{x}{n}\) | Sample proportion (point estimate) |
| \(SE = \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}\) | Standard error of proportion |
| \(ME = z^* \cdot SE\) | Margin of error |
| \(\hat{p} \pm ME\) | Confidence interval for one proportion |
| \(n = \left(\frac{z^*}{ME}\right)^2 \hat{p}(1-\hat{p})\) | Sample size for desired ME |
| \(SE_{\hat{p}_1-\hat{p}_2} = \sqrt{\frac{\hat{p}_1(1-\hat{p}_1)}{n_1} + \frac{\hat{p}_2(1-\hat{p}_2)}{n_2}}\) | SE for difference in proportions |
| \(\hat{p}_{\text{pooled}} = \frac{x_1 + x_2}{n_1 + n_2}\) | Pooled proportion (for hypothesis testing only) |
