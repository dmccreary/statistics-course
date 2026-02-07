# Quiz: Chi-Square and Regression Inference

Test your understanding of chi-square tests for categorical data and inference techniques for regression slopes with these review questions.

---

#### 1. Which of the following best describes the chi-square distribution?

<div class="upper-alpha" markdown>
1. It is symmetric and bell-shaped like the normal distribution
2. It takes only non-negative values and is right-skewed
3. It is left-skewed with a mean of zero
4. It is identical to the t-distribution with the same degrees of freedom
</div>

??? question "Show Answer"
    The correct answer is **B**. The chi-square distribution only takes non-negative values (you cannot have a negative chi-square statistic) and is right-skewed with a long tail extending toward larger values. Unlike the normal and t-distributions, it is not symmetric. As degrees of freedom increase, the distribution becomes more symmetric and approaches a normal distribution, but it never becomes left-skewed.

    **Concept Tested:** Chi-Square Distribution

---

#### 2. A student wants to test whether a die is fair. She rolls it 120 times and records how many times each face appears. What are the degrees of freedom for this goodness-of-fit test?

<div class="upper-alpha" markdown>
1. 119
2. 6
3. 5
4. 120
</div>

??? question "Show Answer"
    The correct answer is **C**. For a goodness-of-fit test, the degrees of freedom equals (number of categories) - 1. A die has 6 faces (categories), so df = 6 - 1 = 5. We subtract 1 because once we know the counts for 5 of the faces, the 6th count is determined (they must sum to 120). This is different from the sample size minus one formula used for t-procedures.

    **Concept Tested:** Goodness-of-Fit Test

---

#### 3. When calculating expected counts for a chi-square test involving a two-way table, which formula is correct?

<div class="upper-alpha" markdown>
1. Expected = (row total) + (column total) - (grand total)
2. Expected = (observed count) / (grand total)
3. Expected = (row total) x (column total) / (grand total)
4. Expected = (grand total) / (number of cells)
</div>

??? question "Show Answer"
    The correct answer is **C**. For each cell in a two-way table, the expected count is calculated as (row total x column total) / grand total. This formula represents what we would expect if the null hypothesis were true, distributing counts proportionally based on the row and column totals. This applies to both tests for homogeneity and tests for independence.

    **Concept Tested:** Expected Counts

---

#### 4. What is the key difference between a chi-square test for homogeneity and a chi-square test for independence?

<div class="upper-alpha" markdown>
1. Homogeneity tests use observed counts while independence tests use expected counts
2. Homogeneity tests compare distributions across multiple populations; independence tests examine whether two variables are related in one sample
3. Homogeneity tests require larger sample sizes than independence tests
4. Independence tests can only be used with two categories, while homogeneity tests work with any number
</div>

??? question "Show Answer"
    The correct answer is **B**. The fundamental difference is in the study design. A homogeneity test takes separate random samples from each of several populations and compares the distribution of a single categorical variable across these groups. An independence test takes one random sample from a single population and measures two categorical variables on each subject to see if they are associated. The calculations are identical; only the setup and interpretation differ.

    **Concept Tested:** Test for Homogeneity, Test for Independence

---

#### 5. Which condition for chi-square tests is being checked when we verify that all expected counts are at least 5?

<div class="upper-alpha" markdown>
1. The Random condition
2. The Independence condition
3. The Large Counts condition
4. The Normality condition
</div>

??? question "Show Answer"
    The correct answer is **C**. The Large Counts condition requires that all expected counts (not observed counts) be at least 5. This ensures that the chi-square approximation is valid. This is a common source of errors; students often mistakenly check observed counts instead. If expected counts are too small, the chi-square distribution may not adequately approximate the true sampling distribution of the test statistic.

    **Concept Tested:** Conditions for Chi-Square

---

#### 6. A chi-square test for a two-way table with 4 rows and 5 columns has how many degrees of freedom?

<div class="upper-alpha" markdown>
1. 20
2. 12
3. 8
4. 19
</div>

??? question "Show Answer"
    The correct answer is **B**. For a two-way table, degrees of freedom equals (rows - 1) x (columns - 1). With 4 rows and 5 columns: df = (4 - 1)(5 - 1) = 3 x 4 = 12. This formula applies to both homogeneity and independence tests. The degrees of freedom represent the number of cells whose values can vary freely once we fix the row and column totals.

    **Concept Tested:** Chi-Square Statistic

---

#### 7. In inference for regression, what does the standard error of the slope measure?

<div class="upper-alpha" markdown>
1. How far the observed y-values are from the regression line
2. How much the sample slope would vary from sample to sample
3. The average distance between x-values in the sample
4. The correlation between x and y
</div>

??? question "Show Answer"
    The correct answer is **B**. The standard error of the slope (SE_b) measures the typical amount of variation we would expect in the sample slope b if we repeatedly took samples from the same population. Smaller standard errors indicate more precise estimates of the true population slope. This value is used in both the t-test for slope and the confidence interval for slope.

    **Concept Tested:** Standard Error of Slope

---

#### 8. The conditions for regression inference are often remembered by the acronym LINE. What does the E stand for?

<div class="upper-alpha" markdown>
1. Expected values are correct
2. Errors are minimized
3. Equal variance of residuals for all x-values
4. Exact normality of x-values
</div>

??? question "Show Answer"
    The correct answer is **C**. LINE stands for: Linearity (relationship is linear), Independence (observations are independent), Normality (residuals are approximately normally distributed), and Equal variance (the spread of residuals is consistent across all x-values, also called homoscedasticity). A "fan" or "megaphone" shape in the residual plot indicates violation of the equal variance condition.

    **Concept Tested:** Equal Variance Condition

---

#### 9. Regression output shows a slope of 2.4 with SE = 0.6 and n = 27. What is the test statistic for testing whether the population slope differs from zero?

<div class="upper-alpha" markdown>
1. t = 4.0
2. t = 0.25
3. t = 1.44
4. t = 2.4
</div>

??? question "Show Answer"
    The correct answer is **A**. The test statistic for the slope is t = b / SE_b = 2.4 / 0.6 = 4.0. This measures how many standard errors the sample slope is from the hypothesized value of zero. With df = n - 2 = 25, a t-value of 4.0 would give a very small p-value, providing strong evidence of a linear relationship between the variables.

    **Concept Tested:** T-Test for Slope

---

#### 10. A 95% confidence interval for a regression slope is (1.8, 5.2). What can we conclude about testing H0: beta = 0 at alpha = 0.05?

<div class="upper-alpha" markdown>
1. We cannot determine the test result from the confidence interval
2. We would fail to reject H0 because the interval is wide
3. We would reject H0 because the interval does not contain zero
4. We would reject H0 only if the interval is centered on zero
</div>

??? question "Show Answer"
    The correct answer is **C**. There is a direct connection between confidence intervals and hypothesis tests. If a 95% confidence interval does not contain the null hypothesis value (0 in this case), then we would reject H0 at the 0.05 significance level. Since (1.8, 5.2) does not include 0, we have evidence at alpha = 0.05 that the true slope differs from zero, indicating a significant linear relationship.

    **Concept Tested:** T-Interval for Slope
