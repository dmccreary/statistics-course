# Quiz: Hypothesis Testing

Test your understanding of hypothesis testing, p-values, significance levels, Type I and II errors, and statistical inference with these review questions.

---

#### 1. The null hypothesis (H₀) always contains which type of statement?

<div class="upper-alpha" markdown>
1. An inequality (< or >)
2. An equality (=)
3. A range of values
4. The sample statistic
</div>

??? question "Show Answer"
    The correct answer is **B**. The null hypothesis always contains an equality statement, representing the status quo or "no effect" claim. Examples include H₀: p = 0.5 or H₀: p₁ - p₂ = 0. The alternative hypothesis (Hₐ) contains the inequality. Hypotheses are about population parameters, never sample statistics.

    **Concept Tested:** Null Hypothesis

---

#### 2. A researcher suspects that more than 60% of adults exercise regularly. What is the appropriate alternative hypothesis?

<div class="upper-alpha" markdown>
1. Hₐ: p = 0.60
2. Hₐ: p ≠ 0.60
3. Hₐ: p > 0.60
4. Hₐ: p < 0.60
</div>

??? question "Show Answer"
    The correct answer is **C**. The researcher suspects the proportion is greater than 60%, so this is a one-sided test with Hₐ: p > 0.60. The phrase "more than" indicates a right-tailed test. If the researcher wanted to test whether the proportion differs from 60% in either direction, then Hₐ: p ≠ 0.60 would be appropriate.

    **Concept Tested:** Alternative Hypothesis

---

#### 3. What does a p-value of 0.03 mean?

<div class="upper-alpha" markdown>
1. There is a 3% probability that the null hypothesis is true
2. There is a 3% probability of obtaining results at least as extreme as observed, if H₀ is true
3. The treatment is 97% effective
4. 3% of the sample showed the effect
</div>

??? question "Show Answer"
    The correct answer is **B**. The p-value is the probability of obtaining sample results at least as extreme as those observed, assuming the null hypothesis is true. A p-value of 0.03 means that if H₀ were true, we would see results this extreme only 3% of the time. It is NOT the probability that H₀ is true.

    **Concept Tested:** Interpreting P-Values

---

#### 4. If α = 0.05 and the p-value = 0.08, what is the correct conclusion?

<div class="upper-alpha" markdown>
1. Reject H₀; the result is statistically significant
2. Accept H₀; the null hypothesis is proven true
3. Fail to reject H₀; there is not sufficient evidence against H₀
4. The test is inconclusive and must be repeated
</div>

??? question "Show Answer"
    The correct answer is **C**. Since p-value (0.08) > α (0.05), we fail to reject the null hypothesis. There is not sufficient evidence to conclude that the alternative hypothesis is true. We never "accept" H₀—we simply don't have enough evidence to reject it. Failing to reject does not prove H₀ is true.

    **Concept Tested:** Making Conclusions

---

#### 5. A Type I error occurs when we:

<div class="upper-alpha" markdown>
1. Fail to reject a false null hypothesis
2. Reject a true null hypothesis
3. Correctly reject a false null hypothesis
4. Correctly fail to reject a true null hypothesis
</div>

??? question "Show Answer"
    The correct answer is **B**. A Type I error (false positive) occurs when we reject the null hypothesis even though it is actually true. The probability of a Type I error equals α, the significance level. In a medical context, this is like diagnosing a healthy patient with a disease.

    **Concept Tested:** Type I Error

---

#### 6. In a hypothesis test with H₀: p = 0.50, a sample of 200 yields 90 successes. What is the test statistic?

<div class="upper-alpha" markdown>
1. z = -1.41
2. z = -0.71
3. z = 0.71
4. z = 1.41
</div>

??? question "Show Answer"
    The correct answer is **A**. First, calculate p̂ = 90/200 = 0.45. The test statistic is z = (p̂ - p₀)/√[p₀(1-p₀)/n] = (0.45 - 0.50)/√[0.50(0.50)/200] = -0.05/√0.00125 = -0.05/0.0354 ≈ -1.41. The sample proportion of 0.45 is about 1.41 standard errors below the hypothesized value of 0.50.

    **Concept Tested:** Test Statistic

---

#### 7. Which of the following increases the power of a hypothesis test?

<div class="upper-alpha" markdown>
1. Decreasing the sample size
2. Using a smaller significance level (α)
3. Increasing the sample size
4. Making the test two-sided instead of one-sided
</div>

??? question "Show Answer"
    The correct answer is **C**. Larger sample sizes increase power because they provide more information and reduce sampling variability, making it easier to detect real effects. Decreasing α, decreasing sample size, or switching from one-sided to two-sided tests all decrease power.

    **Concept Tested:** Power of a Test

---

#### 8. A study finds that a new medication produces a statistically significant reduction in blood pressure (p < 0.001) of 1 mmHg. Which statement best describes this result?

<div class="upper-alpha" markdown>
1. The medication is highly effective and should be prescribed
2. The result is statistically significant but may lack practical significance
3. The p-value must be calculated incorrectly
4. The sample size was probably too small
</div>

??? question "Show Answer"
    The correct answer is **B**. Statistical significance (small p-value) indicates the effect is unlikely due to chance, but practical significance considers whether the effect is meaningful in the real world. A 1 mmHg reduction in blood pressure, while statistically detectable with a large sample, is clinically negligible. The very small p-value likely results from a large sample size, not a large effect.

    **Concept Tested:** Practical Significance

---

#### 9. When comparing two proportions, the pooled proportion is calculated as:

<div class="upper-alpha" markdown>
1. (p̂₁ + p̂₂)/2
2. (x₁ + x₂)/(n₁ + n₂)
3. (p̂₁ × p̂₂)
4. (n₁p̂₁ + n₂p̂₂)/(n₁ + n₂)
</div>

??? question "Show Answer"
    The correct answer is **B**. The pooled proportion combines the successes and sample sizes from both groups: p̂_pooled = (x₁ + x₂)/(n₁ + n₂), where x₁ and x₂ are the number of successes. This is equivalent to the weighted average in option D. The pooled proportion is used in hypothesis testing when H₀ assumes equal proportions.

    **Concept Tested:** Test for Two Proportions

---

#### 10. Which condition must be verified before conducting a z-test for proportions?

<div class="upper-alpha" markdown>
1. The population standard deviation must be known
2. The sample mean must be at least 30
3. np₀ ≥ 10 and n(1-p₀) ≥ 10
4. The samples must be paired
</div>

??? question "Show Answer"
    The correct answer is **C**. The Large Counts condition requires that both np₀ ≥ 10 and n(1-p₀) ≥ 10 for the sampling distribution to be approximately normal. Note that for hypothesis tests, we use p₀ (the hypothesized value) rather than p̂ (the sample proportion) when checking this condition, because we calculate probabilities assuming H₀ is true.

    **Concept Tested:** Conditions for Z-Test
