# Quiz: Sampling Distributions

Test your understanding of sampling variability, sampling distributions, the Central Limit Theorem, and statistical inference with these review questions.

---

#### 1. What is sampling variability?

<div class="upper-alpha" markdown>
1. The variation within a single sample
2. The variation in sample statistics from one sample to another
3. The difference between a sample and the population
4. The error made when collecting data
</div>

??? question "Show Answer"
    The correct answer is **B**. Sampling variability refers to the natural fluctuation in sample statistics (like the sample mean or proportion) from one random sample to another. Different random samples from the same population will yield different statistics, and this variation is both expected and predictable.

    **Concept Tested:** Sampling Variability

---

#### 2. A population has a mean μ = 100 and standard deviation σ = 20. What is the standard error of the sample mean for samples of size n = 25?

<div class="upper-alpha" markdown>
1. 0.8
2. 4
3. 5
4. 20
</div>

??? question "Show Answer"
    The correct answer is **B**. The standard error of the sample mean is calculated as σ/√n = 20/√25 = 20/5 = 4. The standard error measures how much sample means typically vary from the population mean. Larger samples have smaller standard errors, indicating more precise estimates.

    **Concept Tested:** SD of Sample Mean

---

#### 3. According to the Central Limit Theorem, which statement is TRUE?

<div class="upper-alpha" markdown>
1. The population distribution becomes approximately normal for large samples
2. The sampling distribution of the sample mean becomes approximately normal for large samples
3. The sample data becomes approximately normal for large samples
4. Large samples always have less variability than small samples in the original data
</div>

??? question "Show Answer"
    The correct answer is **B**. The Central Limit Theorem states that the sampling distribution of the sample mean becomes approximately normal as sample size increases, regardless of the shape of the population distribution. The CLT applies to the distribution of sample statistics, not to the population itself or to individual sample data.

    **Concept Tested:** Central Limit Theorem

---

#### 4. In a large city, 35% of households have solar panels. What is the standard deviation of the sampling distribution of the sample proportion for random samples of 200 households?

<div class="upper-alpha" markdown>
1. 0.0034
2. 0.0337
3. 0.35
4. 0.4769
</div>

??? question "Show Answer"
    The correct answer is **B**. The standard deviation of the sample proportion is σ_p̂ = √[p(1-p)/n] = √[0.35(0.65)/200] = √[0.2275/200] = √0.0011375 ≈ 0.0337. This tells us how much sample proportions typically vary from the true population proportion of 0.35.

    **Concept Tested:** SD of Sample Proportion

---

#### 5. For the normal approximation to apply to a sample proportion, which condition must be satisfied?

<div class="upper-alpha" markdown>
1. The sample size must be at least 30
2. The population must be normally distributed
3. Both np ≥ 10 and n(1-p) ≥ 10 must be true
4. The sample must be at least 10% of the population
</div>

??? question "Show Answer"
    The correct answer is **C**. The Large Counts Condition requires that both np ≥ 10 and n(1-p) ≥ 10 for the sampling distribution of the sample proportion to be approximately normal. This ensures enough successes and failures in the expected sample for the normal approximation to work well.

    **Concept Tested:** Conditions for Proportion SD

---

#### 6. If the true proportion of voters supporting a candidate is 0.52, and a pollster surveys 400 random voters, what is the probability that the sample proportion is less than 0.50?

<div class="upper-alpha" markdown>
1. 0.021
2. 0.212
3. 0.500
4. 0.788
</div>

??? question "Show Answer"
    The correct answer is **B**. First find the standard error: σ_p̂ = √[0.52(0.48)/400] = √0.000624 = 0.025. Then calculate the z-score: z = (0.50 - 0.52)/0.025 = -0.02/0.025 = -0.80. Using the normal distribution, P(Z < -0.80) ≈ 0.212. Even though the true proportion is 52%, there's about a 21% chance a sample shows less than 50% support.

    **Concept Tested:** Normal Approximation

---

#### 7. How does quadrupling the sample size affect the standard error?

<div class="upper-alpha" markdown>
1. It quadruples the standard error
2. It doubles the standard error
3. It cuts the standard error in half
4. It reduces the standard error to one-quarter
</div>

??? question "Show Answer"
    The correct answer is **C**. Since standard error has √n in the denominator (σ/√n for means, √[p(1-p)/n] for proportions), quadrupling n means multiplying the denominator by √4 = 2. This cuts the standard error in half. To reduce the standard error by a factor of 4, you would need to multiply the sample size by 16.

    **Concept Tested:** Sample Size for CI

---

#### 8. Which of the following best describes why the sample mean is an unbiased estimator of the population mean?

<div class="upper-alpha" markdown>
1. Every sample mean exactly equals the population mean
2. The sample mean has no variability
3. The mean of the sampling distribution equals the population mean
4. Larger samples always give sample means closer to the population mean
</div>

??? question "Show Answer"
    The correct answer is **C**. An unbiased estimator is one whose sampling distribution is centered on the true parameter value. For the sample mean, μ_x̄ = μ, meaning that on average across many samples, the sample mean hits the target. Individual sample means vary, but there's no systematic tendency to overestimate or underestimate.

    **Concept Tested:** Mean of Sample Mean

---

#### 9. A population distribution is strongly right-skewed. What is the minimum sample size typically needed for the sampling distribution of the sample mean to be approximately normal?

<div class="upper-alpha" markdown>
1. At least 5
2. At least 15
3. At least 30
4. At least 40
</div>

??? question "Show Answer"
    The correct answer is **D**. For heavily skewed populations, larger samples are needed for the CLT to apply effectively. While n ≥ 30 is a common rule of thumb for moderately skewed distributions, strongly skewed populations typically require n ≥ 40 or even more. The more non-normal the population, the larger the sample needed.

    **Concept Tested:** CLT Conditions

---

#### 10. A researcher wants to estimate a population proportion within 2 percentage points with 95% confidence. Using p = 0.5 for planning, approximately how many people should be surveyed?

<div class="upper-alpha" markdown>
1. 601
2. 1,068
3. 2,401
4. 9,604
</div>

??? question "Show Answer"
    The correct answer is **C**. Using the formula n = (z*/E)² × p(1-p) with z* = 1.96 for 95% confidence, E = 0.02, and p = 0.5: n = (1.96/0.02)² × 0.5(0.5) = (98)² × 0.25 = 9,604 × 0.25 = 2,401. This explains why achieving a small margin of error requires large samples—halving the margin of error requires quadrupling the sample size.

    **Concept Tested:** Sample Size for CI
