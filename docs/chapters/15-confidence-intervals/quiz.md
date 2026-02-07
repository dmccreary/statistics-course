# Quiz: Confidence Intervals

Test your understanding of confidence intervals, margin of error, confidence levels, and interval estimation with these review questions.

---

#### 1. What does a 95% confidence level mean?

<div class="upper-alpha" markdown>
1. There is a 95% probability that the true parameter is in this specific interval
2. 95% of the sample data falls within this interval
3. If we repeated the sampling process many times, about 95% of the intervals would contain the true parameter
4. We are 95% certain that our sample statistic equals the population parameter
</div>

??? question "Show Answer"
    The correct answer is **C**. The confidence level describes the long-run reliability of the interval-building method. If we constructed confidence intervals from many random samples, about 95% of those intervals would capture the true population parameter. Once a specific interval is calculated, the parameter is either in it or not—we just don't know which.

    **Concept Tested:** Interpreting Confidence

---

#### 2. In a random sample of 400 adults, 240 support a new policy. What is the point estimate for the population proportion?

<div class="upper-alpha" markdown>
1. 0.40
2. 0.50
3. 0.60
4. 240
</div>

??? question "Show Answer"
    The correct answer is **C**. The point estimate for a population proportion is the sample proportion p̂ = x/n = 240/400 = 0.60. This single value is our best guess for the true population proportion before we add the margin of error to create an interval estimate.

    **Concept Tested:** Point Estimate

---

#### 3. Which critical value (z*) is used for a 99% confidence interval?

<div class="upper-alpha" markdown>
1. 1.645
2. 1.960
3. 2.326
4. 2.576
</div>

??? question "Show Answer"
    The correct answer is **D**. For 99% confidence, we need to capture the middle 99% of the standard normal distribution, leaving 0.5% in each tail. The z-score with 0.5% above it is 2.576. Common critical values are 1.645 (90%), 1.96 (95%), and 2.576 (99%).

    **Concept Tested:** Z Critical Values

---

#### 4. A 95% confidence interval for a proportion is (0.42, 0.58). What is the margin of error?

<div class="upper-alpha" markdown>
1. 0.04
2. 0.08
3. 0.16
4. 0.50
</div>

??? question "Show Answer"
    The correct answer is **B**. The margin of error is half the width of the confidence interval. Width = 0.58 - 0.42 = 0.16, so ME = 0.16/2 = 0.08. Alternatively, the point estimate is (0.42 + 0.58)/2 = 0.50, and the margin of error is 0.58 - 0.50 = 0.08.

    **Concept Tested:** Margin of Error

---

#### 5. Which of the following would result in a NARROWER confidence interval?

<div class="upper-alpha" markdown>
1. Increasing the confidence level from 95% to 99%
2. Decreasing the sample size from 500 to 200
3. Increasing the sample size from 200 to 500
4. Having a sample proportion closer to 0.5
</div>

??? question "Show Answer"
    The correct answer is **C**. A larger sample size decreases the standard error, which decreases the margin of error and narrows the interval. Increasing confidence level widens the interval (larger z*). Decreasing sample size widens it. A proportion closer to 0.5 maximizes the standard error, also widening the interval.

    **Concept Tested:** CI Width Factors

---

#### 6. What is the standard error for a sample proportion when p̂ = 0.40 and n = 225?

<div class="upper-alpha" markdown>
1. 0.0011
2. 0.0327
3. 0.0489
4. 0.4000
</div>

??? question "Show Answer"
    The correct answer is **B**. The standard error for a sample proportion is SE = √[p̂(1-p̂)/n] = √[0.40(0.60)/225] = √[0.24/225] = √0.001067 ≈ 0.0327. This measures how much sample proportions typically vary from sample to sample.

    **Concept Tested:** Standard Error

---

#### 7. Which condition must be checked BEFORE constructing a confidence interval for a proportion?

<div class="upper-alpha" markdown>
1. The sample mean must be normally distributed
2. The population must be at least 10 times the sample size
3. Both np̂ ≥ 10 and n(1-p̂) ≥ 10 must be satisfied
4. The confidence level must be exactly 95%
</div>

??? question "Show Answer"
    The correct answer is **C**. The Large Counts Condition (also called the success/failure condition) requires at least 10 successes and 10 failures in the sample for the normal approximation to be valid. Option B describes the 10% condition for independence, which is also checked, but the question asks about the large counts condition.

    **Concept Tested:** Conditions for CI Proportion

---

#### 8. A researcher constructs a 95% confidence interval for the difference in proportions between two groups and obtains (-0.12, 0.04). What conclusion is appropriate?

<div class="upper-alpha" markdown>
1. The first group definitely has a lower proportion
2. The second group definitely has a higher proportion
3. There is no statistically significant difference between the groups
4. The sample sizes were too small
</div>

??? question "Show Answer"
    The correct answer is **C**. When a confidence interval for a difference contains zero, we cannot conclude there is a significant difference between the groups. The interval spans from negative to positive values, meaning the true difference could be in either direction or could be zero. We fail to reject the hypothesis of no difference.

    **Concept Tested:** CI for Difference in Props

---

#### 9. A poll reports that 52% of voters support a candidate with a margin of error of 3 percentage points. Which statement is a correct interpretation?

<div class="upper-alpha" markdown>
1. Exactly 52% of all voters support the candidate
2. We are 95% confident that between 49% and 55% of all voters support the candidate
3. 3% of voters are undecided
4. The poll has a 3% chance of being wrong
</div>

??? question "Show Answer"
    The correct answer is **B**. The confidence interval is 52% ± 3%, which gives (49%, 55%). Assuming this is a 95% confidence interval (most common for polls), we are 95% confident the true proportion of supporters falls in this range. The margin of error is not about being "wrong"—it quantifies sampling uncertainty.

    **Concept Tested:** Interpreting CI

---

#### 10. When is the pooled proportion used?

<div class="upper-alpha" markdown>
1. When constructing a confidence interval for one proportion
2. When constructing a confidence interval for the difference in two proportions
3. When conducting a hypothesis test assuming the two proportions are equal
4. When the sample sizes of two groups are equal
</div>

??? question "Show Answer"
    The correct answer is **C**. The pooled proportion is calculated by combining successes from both samples and is used ONLY in hypothesis testing when the null hypothesis assumes the two population proportions are equal (H₀: p₁ = p₂). For confidence intervals estimating the difference, we use the individual sample proportions because we're not assuming equality.

    **Concept Tested:** Pooled Proportion
