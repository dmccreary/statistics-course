# Quiz: Inference for Means

Test your understanding of t-distributions, confidence intervals, and hypothesis tests for population means with these review questions.

---

#### 1. Why do we use the t-distribution instead of the normal distribution when making inferences about population means?

<div class="upper-alpha" markdown>
1. The t-distribution is always more accurate than the normal distribution
2. We must estimate the population standard deviation using the sample standard deviation, which introduces extra uncertainty
3. The t-distribution has lighter tails, making it easier to reject the null hypothesis
4. The t-distribution is required by the Central Limit Theorem
</div>

??? question "Show Answer"
    The correct answer is **B**. When making inferences about means, we rarely know the population standard deviation and must estimate it using the sample standard deviation s. This estimation introduces additional uncertainty that the t-distribution accounts for through its heavier tails. The heavier tails mean extreme values are more likely, reflecting our reduced certainty.

    **Concept Tested:** T vs Z Distribution

---

#### 2. A researcher collects a random sample of 16 observations and wants to construct a 95% confidence interval for the population mean. What are the degrees of freedom for this t-interval?

<div class="upper-alpha" markdown>
1. 16
2. 15
3. 17
4. 14
</div>

??? question "Show Answer"
    The correct answer is **B**. For a one-sample t-procedure, the degrees of freedom equals n - 1, where n is the sample size. With n = 16 observations, df = 16 - 1 = 15. We lose one degree of freedom because we use the sample mean in calculating the sample standard deviation.

    **Concept Tested:** Degrees of Freedom

---

#### 3. As the degrees of freedom increase, what happens to the t-distribution?

<div class="upper-alpha" markdown>
1. It becomes more right-skewed
2. The critical values increase
3. It approaches the standard normal distribution
4. The tails become heavier
</div>

??? question "Show Answer"
    The correct answer is **C**. As degrees of freedom increase, the t-distribution becomes less spread out and approaches the standard normal (z) distribution. With 30+ degrees of freedom, the distributions are quite similar; with 100+ degrees of freedom, they are nearly identical. This is why the t critical value of 1.984 for df = 100 is very close to the z critical value of 1.96.

    **Concept Tested:** T-Distribution

---

#### 4. A one-sample t-interval for a population mean is calculated as (24.3, 31.7). Which interpretation is correct?

<div class="upper-alpha" markdown>
1. There is a 95% probability that the population mean falls between 24.3 and 31.7
2. 95% of all sample means fall between 24.3 and 31.7
3. We are confident that 95% of individuals in the population have values between 24.3 and 31.7
4. We are 95% confident that the true population mean is between 24.3 and 31.7
</div>

??? question "Show Answer"
    The correct answer is **D**. A confidence interval provides a range of plausible values for the population parameter. The correct interpretation states our confidence in the method: if we repeatedly took samples and constructed 95% confidence intervals, about 95% of them would contain the true population mean. The probability interpretation in choice A is incorrect because the population mean is fixed, not random.

    **Concept Tested:** One-Sample T-Interval

---

#### 5. Which of the following is NOT a condition that must be checked before performing a t-procedure for inference about means?

<div class="upper-alpha" markdown>
1. The data must come from a random sample or randomized experiment
2. The sample standard deviation must be known exactly
3. Individual observations must be independent
4. The sampling distribution of the sample mean must be approximately normal
</div>

??? question "Show Answer"
    The correct answer is **B**. The three conditions for t-procedures are: Random (data from random sample), Normal/Large Sample (sampling distribution approximately normal), and Independence (observations are independent). The sample standard deviation being known is not a condition; in fact, t-procedures are specifically designed for situations where we do NOT know the population standard deviation and must estimate it from the sample.

    **Concept Tested:** Conditions for T-Procedures

---

#### 6. A sleep study tests whether college students get less than the recommended 8 hours of sleep. The sample of 49 students has a mean of 7.4 hours with SD = 1.4 hours. What is the test statistic?

<div class="upper-alpha" markdown>
1. t = -3.0
2. t = -0.43
3. t = 3.0
4. t = 0.43
</div>

??? question "Show Answer"
    The correct answer is **A**. The test statistic is calculated as t = (sample mean - hypothesized mean) / (s / sqrt(n)) = (7.4 - 8) / (1.4 / sqrt(49)) = -0.6 / 0.2 = -3.0. The negative value indicates the sample mean is below the hypothesized mean of 8 hours, which is consistent with the research hypothesis that students sleep less than recommended.

    **Concept Tested:** One-Sample T-Test

---

#### 7. A researcher wants to compare test scores between two teaching methods. She randomly assigns 25 students to Method A and 30 students to Method B. Which procedure should she use?

<div class="upper-alpha" markdown>
1. Paired t-test
2. One-sample t-test
3. Two-sample t-test
4. Chi-square test
</div>

??? question "Show Answer"
    The correct answer is **C**. Since there are two independent groups (Method A and Method B) with different students in each group, this calls for a two-sample t-test. A paired t-test would be appropriate if the same students were tested under both conditions. Random assignment to groups indicates an experiment comparing two independent samples.

    **Concept Tested:** Two-Sample T-Test

---

#### 8. Students take a pretest, receive tutoring, and then take a posttest. A researcher wants to test whether tutoring improves scores. What type of t-procedure is most appropriate?

<div class="upper-alpha" markdown>
1. One-sample t-test using only posttest scores
2. Two-sample t-test comparing pretest and posttest groups
3. Paired t-test analyzing the differences within each student
4. One-sample t-interval for the posttest mean
</div>

??? question "Show Answer"
    The correct answer is **C**. This is paired data because the same students are measured twice (pretest and posttest). The paired t-test calculates the difference for each student (posttest - pretest) and then performs a one-sample t-test on those differences. This approach controls for individual differences between students, making it more powerful than treating the groups as independent.

    **Concept Tested:** Paired T-Test

---

#### 9. Which scenario would make you most concerned about using t-procedures?

<div class="upper-alpha" markdown>
1. A sample of 50 observations from a slightly skewed distribution
2. A sample of 100 observations with two mild outliers
3. A sample of 10 observations with one extreme outlier
4. A sample of 35 observations from a symmetric distribution
</div>

??? question "Show Answer"
    The correct answer is **C**. T-procedures are fairly robust to violations of normality, especially with larger samples. However, with a very small sample (n = 10), the data must be close to normal with no outliers. An extreme outlier with such a small sample size would seriously affect both the sample mean and standard deviation, making the t-procedure unreliable. Larger samples (n >= 30) can handle skewness and mild outliers due to the Central Limit Theorem.

    **Concept Tested:** Robustness

---

#### 10. In regression inference, we test whether the slope equals zero. Why is this an important hypothesis to test?

<div class="upper-alpha" markdown>
1. If the slope is zero, the regression line is horizontal and there is no linear relationship between x and y
2. If the slope is zero, the y-intercept must also be zero
3. Testing the slope helps us determine if the data is normally distributed
4. A zero slope indicates perfect correlation between the variables
</div>

??? question "Show Answer"
    The correct answer is **A**. When we test H0: beta = 0, we are testing whether there is a significant linear relationship between the explanatory and response variables. If the true population slope is zero, then changes in x are not associated with any predictable change in y, meaning x provides no useful information for predicting y. Rejecting this null hypothesis provides evidence that a genuine linear association exists.

    **Concept Tested:** Slope Parameter
