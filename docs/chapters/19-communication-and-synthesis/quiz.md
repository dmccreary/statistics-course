# Quiz: Communication and Synthesis

Test your understanding of statistical communication, practical significance, study limitations, and AP exam strategies with these review questions.

---

#### 1. A study with 50,000 participants finds that a new drug lowers blood pressure by 0.5 mmHg (p < 0.001). Which statement best describes this result?

<div class="upper-alpha" markdown>
1. The result is both statistically significant and practically significant
2. The result is statistically significant but likely not practically significant
3. The result is practically significant but not statistically significant
4. The result is neither statistically nor practically significant
</div>

??? question "Show Answer"
    The correct answer is **B**. With such a large sample size, even tiny effects can achieve statistical significance. While p < 0.001 indicates the effect is statistically significant (unlikely due to chance), a blood pressure reduction of only 0.5 mmHg is far too small to have any meaningful health impact. Normal blood pressure fluctuates more than this throughout the day, making this result practically insignificant despite its statistical significance.

    **Concept Tested:** Stat vs Practical Sig

---

#### 2. Cohen's d is a measure of effect size. If Cohen's d = 0.8, what does this indicate?

<div class="upper-alpha" markdown>
1. A small effect that is barely noticeable
2. A medium effect that is noticeable to careful observers
3. A large effect that is obvious to casual observers
4. No effect between the groups being compared
</div>

??? question "Show Answer"
    The correct answer is **C**. According to Cohen's guidelines, d = 0.2 represents a small effect, d = 0.5 represents a medium effect, and d = 0.8 or greater represents a large effect. A d of 0.8 means the two group means are separated by 0.8 standard deviations, which is typically noticeable without careful measurement. However, context always matters when interpreting effect sizes.

    **Concept Tested:** Effect Size

---

#### 3. A researcher wants to reduce the margin of error for a proportion from 4% to 2%. By what factor must the sample size increase?

<div class="upper-alpha" markdown>
1. 2 times the original sample size
2. 4 times the original sample size
3. 8 times the original sample size
4. 16 times the original sample size
</div>

??? question "Show Answer"
    The correct answer is **B**. The margin of error formula includes 1/sqrt(n), so to cut the margin of error in half (from 4% to 2%), you need to quadruple the sample size. This is because if you multiply n by 4, sqrt(n) is multiplied by 2, which divides the margin of error by 2. This demonstrates the diminishing returns of increasing sample size.

    **Concept Tested:** Sample Size Impact

---

#### 4. A study concludes that drinking green tea causes improved memory. The study surveyed 500 adults about their tea consumption and gave them memory tests. What is the primary limitation of this conclusion?

<div class="upper-alpha" markdown>
1. The sample size is too small to detect an effect
2. This is an observational study, so causation cannot be established
3. Memory tests are not reliable measures of cognitive function
4. The study did not use a confidence interval
</div>

??? question "Show Answer"
    The correct answer is **B**. Since this is an observational study (surveying existing habits) rather than a randomized experiment, we cannot establish that green tea causes memory improvement. There could be confounding variables, such as people who drink green tea also having healthier lifestyles, more education, or other factors that independently affect memory. Only randomized experiments can establish causation.

    **Concept Tested:** Study Limitations

---

#### 5. A researcher studies the effect of a tutoring program on test scores using students at one suburban high school. To which population can the results most confidently be generalized?

<div class="upper-alpha" markdown>
1. All students in the United States
2. All high school students
3. Students at similar suburban high schools
4. All students who receive tutoring
</div>

??? question "Show Answer"
    The correct answer is **C**. Generalizability depends on how representative the sample is of the broader population. Since the study was conducted at one suburban high school, the results most directly apply to students at similar suburban schools. Generalizing to all high school students or all students nationwide would be a stretch, as urban schools, rural schools, or schools with different demographics may show different results.

    **Concept Tested:** Generalizability

---

#### 6. When writing a statistical report for a general audience (non-statisticians), what should you emphasize?

<div class="upper-alpha" markdown>
1. Technical details about methodology and mathematical formulas
2. Exact p-values and test statistics with many decimal places
3. Real-world meaning, practical implications, and clear visualizations
4. Assumptions about the sampling distribution
</div>

??? question "Show Answer"
    The correct answer is **C**. When communicating with non-statistical audiences, the focus should be on what the results mean in practical terms, not technical details. Use clear visualizations, explain implications in plain language, and avoid jargon. Save the technical methodology discussion for statistical experts who need to evaluate the rigor of your analysis.

    **Concept Tested:** Communicating Results

---

#### 7. In the four-step process for inference, what should be included in the PLAN step?

<div class="upper-alpha" markdown>
1. Calculate the test statistic and p-value
2. State the hypotheses and define parameters
3. Identify the procedure and check conditions (Random, Independent, Normal)
4. Make a decision about the null hypothesis and interpret in context
</div>

??? question "Show Answer"
    The correct answer is **C**. The PLAN step involves identifying the appropriate inference procedure (such as one-proportion z-test or two-sample t-test) and verifying that the conditions for that procedure are met. The three main conditions to check are: Random (was data collected randomly?), Independent (is the sample less than 10% of population?), and Normal (is the sampling distribution approximately normal?).

    **Concept Tested:** Four-Step Process

---

#### 8. Which statement about hypothesis test conclusions is correct for AP Statistics?

<div class="upper-alpha" markdown>
1. If p-value is small, we accept the alternative hypothesis
2. We should say "accept the null hypothesis" when p-value is large
3. We should say "fail to reject the null hypothesis" when p-value exceeds alpha
4. A small p-value proves the null hypothesis is false
</div>

??? question "Show Answer"
    The correct answer is **C**. The correct language for hypothesis testing is to either "reject H0" or "fail to reject H0." We never "accept" the null hypothesis because failing to find evidence against it is not the same as proving it true. Similarly, we never "prove" anything with hypothesis testing; we only find evidence that is convincing or not convincing. Using "accept H0" is a common point-loser on the AP exam.

    **Concept Tested:** Statistical Report Writing

---

#### 9. A researcher concludes from regression analysis: "Since p = 0.02 < 0.05, we reject H0 and conclude there is convincing evidence of a linear relationship between study time and test scores. Each additional hour of studying is associated with approximately 3.5 more points on the exam." What is missing from this conclusion?

<div class="upper-alpha" markdown>
1. The sample size
2. The direction of the relationship (positive or negative slope)
3. Nothing; this is a complete conclusion
4. A statement about causation
</div>

??? question "Show Answer"
    The correct answer is **C**. This conclusion includes all essential elements: a decision about H0 (reject), the evidence supporting the decision (p = 0.02 < 0.05), interpretation in context (study time and test scores), and the effect direction and size (3.5 points per hour). Adding causation would actually be incorrect unless this was a randomized experiment, and sample size is helpful but not required in the conclusion statement.

    **Concept Tested:** Regression Conclusion

---

#### 10. On the AP Statistics exam, a student loses points for stating "There is a 95% probability that the true mean is in this interval." What should the student have said instead?

<div class="upper-alpha" markdown>
1. "There is a 95% probability that the sample mean is in this interval"
2. "We are 95% confident that the true population mean is in this interval"
3. "95% of all sample means fall within this interval"
4. "The true mean has a 95% chance of being equal to the sample mean"
</div>

??? question "Show Answer"
    The correct answer is **B**. The population mean is a fixed (though unknown) value, not a random variable, so we cannot assign a probability to it being in any particular interval. The correct interpretation is about confidence in the method: if we repeatedly constructed 95% confidence intervals from different samples, about 95% of them would contain the true population mean. We express this as confidence in our particular interval.

    **Concept Tested:** AP Exam Strategies
