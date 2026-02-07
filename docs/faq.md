# AP Statistics FAQ

Welcome to the Frequently Asked Questions for the AP Statistics course! Whether you're just getting started or deep into hypothesis testing, these questions and answers will help clarify common concepts and guide your learning journey.

## Getting Started Questions

### What is this course about?

This AP Statistics course covers the complete AP Statistics curriculum, preparing you to collect, analyze, and draw conclusions from data. You'll learn exploratory data analysis, sampling and experimental design, probability theory, and statistical inference—skills that help you think critically about information and make evidence-based decisions. See the [Course Description](course-description.md) for complete details.

### Who is this course designed for?

This course is designed for high school juniors and seniors (typically ages 16-18) who want to earn college credit through the AP exam. It's ideal for students planning careers in science, medicine, business, social sciences, psychology, or any field that uses data. You should have completed Algebra II or Integrated Math III, as basic algebraic manipulation is needed throughout. See the [Course Description](course-description.md) for prerequisites.

### How is this course structured?

The course is organized into 19 chapters covering 9 major units that align with the AP Statistics curriculum. Each chapter includes interactive simulations (MicroSims), worked examples, and practice problems. The chapters build on each other—you'll start with describing data visually and numerically, then move to study design, probability, and finally statistical inference. Check the [Chapters](chapters/index.md) page for the complete outline.

### Who is Sylvia the Squirrel?

![](./img/sylvia-square-transparent.png){ width="200", align="right" }

Sylvia is your guide through this textbook! She's a friendly red squirrel who discovered statistics while optimizing her acorn collection strategies. She appears throughout to offer encouragement, crack occasional puns, and make abstract concepts feel more concrete—often using acorn-related examples. Her signature phrases include "Let's crack this nut!" when starting a challenging topic.

### What technology do I need for this course?

You'll just need a web browser for this course.  If you take the AP test, you will need a graphing 
calculator (TI-83/84 or equivalent) for the AP exam, though many concepts in this course are 
illustrated through interactive MicroSims that run in your web browser. The simulations 
help you visualize concepts like sampling distributions and hypothesis testing without 
needing external software.

### How should I use the MicroSims?

MicroSims are interactive simulations embedded throughout the chapters. Experiment with the sliders and controls to see how changing parameters affects outcomes. For example, in the sampling distribution MicroSim, try increasing sample size to watch the distribution become narrower. Active exploration helps concepts stick better than passive reading.

### What's the difference between Statistics and Probability?

Statistics involves collecting, organizing, and interpreting data to make conclusions about populations. Probability is the mathematical study of chance and randomness. In this course, probability serves as the foundation for statistical inference—understanding probability helps us quantify how confident we can be in our conclusions. See the [Glossary](glossary.md) for precise definitions.

### How do I prepare for the AP Statistics exam?

Focus on understanding concepts rather than memorizing formulas. The AP exam emphasizes interpretation—you'll need to explain what results mean in context. Practice with free-response questions, learn to write clear statistical interpretations, and make sure you can use your calculator efficiently. Each chapter includes practice problems aligned with AP exam expectations.

### What if I struggle with a concept?

That's completely normal! Sylvia says, "Don't worry—every statistician drops an acorn sometimes." Use the MicroSims to visualize tricky concepts, review prerequisite chapters if needed, and check the [Glossary](glossary.md) for definitions. The chapters build on each other, so ensuring you understand foundational concepts will help with later material.

### How is this different from other math courses?

Unlike algebra or calculus, statistics focuses on reasoning about data and uncertainty rather than solving equations with exact answers. You'll learn to think about variability, make decisions with incomplete information, and communicate findings clearly. Real-world data is messy, and statistics gives you tools to handle that messiness systematically.

### What are the learning objectives for this course?

By the end of this course, you'll be able to: analyze distributions using graphical and numerical methods, design valid studies that support causal conclusions, calculate and apply probability concepts, construct and interpret confidence intervals, conduct hypothesis tests and interpret results, and communicate statistical findings clearly. These align with the six Bloom's Taxonomy levels—from remembering definitions to creating your own statistical analyses.

### Where can I find definitions of statistical terms?

The [Glossary](glossary.md) contains definitions for all 300 concepts covered in this course. Each definition follows ISO standards for clarity and includes examples where helpful. Use it as a quick reference when you encounter unfamiliar terms.

## Core Concepts Questions

### What is the difference between a population and a sample?

A **population** is the entire group you want to study—every individual or object of interest. A **sample** is a subset of the population that you actually collect data from. For example, if you want to know the average height of all high school students in the US (population), you might measure 500 randomly selected students (sample). We use samples because studying entire populations is usually impractical. See [Chapter 1](chapters/01-introduction-to-statistics/index.md).

### What is the difference between a parameter and a statistic?

A **parameter** is a numerical summary of a population (like the true population mean μ), while a **statistic** is a numerical summary of a sample (like the sample mean x̄). Parameters are usually unknown—we use statistics to estimate them. Memory trick: **P**arameters describe **P**opulations; **S**tatistics describe **S**amples.

### What are categorical and quantitative variables?

**Categorical variables** place individuals into groups or categories (like eye color, major, or yes/no responses). **Quantitative variables** measure numerical values where arithmetic makes sense (like height, temperature, or test scores). Knowing the variable type determines which graphs and summary statistics are appropriate.

### What is the difference between discrete and continuous variables?

**Discrete variables** take on countable values—typically whole numbers with gaps between possible values (like number of siblings: 0, 1, 2, 3...). **Continuous variables** can take any value within a range, including decimals (like height: 5.6 feet, 5.62 feet, etc.). This distinction affects probability calculations later in the course.

### How do I describe the distribution of a quantitative variable?

Use the **SOCS** framework: **S**hape (symmetric, skewed left/right, bimodal), **O**utliers (unusual values far from the pattern), **C**enter (mean or median), and **S**pread (range, IQR, or standard deviation). Always describe distributions in context—don't just say "skewed right," say "the distribution of test scores is skewed right."

### When should I use mean vs. median?

Use the **median** when the distribution is skewed or has outliers—it's resistant to extreme values. Use the **mean** when the distribution is roughly symmetric. If the mean and median are very different, that signals skewness. Sylvia notes: "The median is like a wise old oak that doesn't budge when a few extreme acorns roll by."

### What is standard deviation and why does it matter?

Standard deviation (s) measures how spread out data values are from the mean. A small standard deviation means values cluster close to the average; a large one means they're more dispersed. It's crucial for comparing variability and forms the basis for z-scores and inference procedures. See [Chapter 4](chapters/04-numerical-summaries/index.md).

### What is a z-score and how do I interpret it?

A **z-score** tells you how many standard deviations a value is from the mean. Calculate it as z = (x - mean) / standard deviation. A z-score of +2 means the value is 2 standard deviations above average; a z-score of -1.5 means 1.5 standard deviations below. Z-scores let you compare values from different distributions. See [Chapter 5](chapters/05-standardization-and-normal/index.md).

### What is the normal distribution?

The **normal distribution** (bell curve) is a symmetric, single-peaked distribution defined by its mean (μ) and standard deviation (σ). Many natural phenomena approximate this shape. The **Empirical Rule** states that roughly 68% of values fall within 1 SD of the mean, 95% within 2 SDs, and 99.7% within 3 SDs. It's fundamental to inference procedures.

### What is correlation and what does it tell me?

**Correlation (r)** measures the strength and direction of the linear relationship between two quantitative variables. It ranges from -1 to +1: positive values indicate positive association, negative values indicate negative association, and values near 0 indicate little linear relationship. Remember: r only measures *linear* relationships and is sensitive to outliers. See [Chapter 6](chapters/06-scatterplots-and-association/index.md).

### What is the difference between correlation and causation?

**Correlation** means two variables are associated—they tend to change together. **Causation** means one variable actually causes changes in the other. Correlation alone doesn't prove causation—there might be confounding variables or the relationship might be coincidental. Only well-designed experiments with random assignment can establish causation. See [Chapter 8](chapters/08-causation-and-study-design/index.md).

### What is a least-squares regression line?

A **least-squares regression line** (LSRL) is the line that minimizes the sum of squared residuals—it's the "best fit" line through a scatterplot. The equation ŷ = a + bx lets you predict the response variable (y) from the explanatory variable (x). The slope (b) tells you how much y changes for each unit increase in x. See [Chapter 7](chapters/07-linear-regression/index.md).

### What is a residual and why do we analyze residuals?

A **residual** is the difference between an observed y-value and the predicted y-value: residual = y - ŷ. Positive residuals mean the point is above the line; negative means below. Analyzing residual plots helps check whether a linear model is appropriate—look for random scatter around zero with no patterns.

### What is a sampling distribution?

A **sampling distribution** is the distribution of a statistic (like x̄ or p̂) over all possible samples of a given size from a population. It shows how the statistic varies from sample to sample. Understanding sampling distributions is the key to inference—they tell us how reliable our estimates are. See [Chapter 14](chapters/14-sampling-distributions/index.md).

### What is the Central Limit Theorem?

The **Central Limit Theorem (CLT)** states that for large sample sizes, the sampling distribution of the sample mean is approximately normal, regardless of the population's shape. This is remarkable—it's why we can use normal-based inference procedures even when the population isn't normal. Generally, n ≥ 30 is considered "large enough."

### What is the difference between observational studies and experiments?

In an **observational study**, researchers observe subjects without imposing treatments—they simply record what naturally occurs. In an **experiment**, researchers actively apply treatments to subjects. Only experiments with random assignment can establish cause-and-effect relationships. See [Chapter 12](chapters/12-experimental-design/index.md).

### What is random sampling and why is it important?

**Random sampling** means every member of the population has a known, non-zero probability of being selected. It's important because it reduces bias and allows us to generalize results from the sample to the population. Without randomization, our sample might systematically differ from the population in ways that skew our conclusions. See [Chapter 11](chapters/11-sampling-and-bias/index.md).

### What is a confidence interval?

A **confidence interval** provides a range of plausible values for a population parameter. For example, a 95% confidence interval for a proportion might be (0.52, 0.72). This means if we repeated our sampling process many times, about 95% of the resulting intervals would contain the true parameter. It quantifies our uncertainty about estimates. See [Chapter 15](chapters/15-confidence-intervals/index.md).

### What is a hypothesis test?

A **hypothesis test** is a formal procedure for using sample data to evaluate a claim about a population. You state null and alternative hypotheses, collect data, calculate how unlikely your results would be if the null hypothesis were true (p-value), and then decide whether to reject the null hypothesis. See [Chapter 16](chapters/16-hypothesis-testing/index.md).

### What is a p-value and how do I interpret it?

A **p-value** is the probability of obtaining results at least as extreme as your observed results, assuming the null hypothesis is true. A small p-value (typically < 0.05) suggests your results are unlikely under the null hypothesis, providing evidence against it. A p-value is NOT the probability that the null hypothesis is true!

### What are Type I and Type II errors?

A **Type I error** occurs when you reject a true null hypothesis (false positive—concluding there's an effect when there isn't). A **Type II error** occurs when you fail to reject a false null hypothesis (false negative—missing a real effect). There's a trade-off: reducing one type of error typically increases the other.

## Technical Detail Questions

### How do I calculate the mean and standard deviation?

For the **mean**: sum all values and divide by n. Formula: x̄ = Σxᵢ/n. For **standard deviation**: find deviations from the mean, square them, average (using n-1 for samples), then take the square root. Formula: s = √[Σ(xᵢ - x̄)²/(n-1)]. Your calculator can do this—learn the 1-Var Stats function!

### What is the Empirical Rule (68-95-99.7 Rule)?

For normally distributed data: approximately **68%** of values fall within 1 standard deviation of the mean, **95%** within 2 standard deviations, and **99.7%** within 3 standard deviations. This is useful for quick estimates without needing tables. If a value is more than 2 SDs from the mean, it's unusual; more than 3 SDs is rare.

### How do I use a normal table (z-table)?

The z-table gives the area (probability) to the **left** of a given z-score. To find P(Z < 1.5), look up z = 1.50 and read the value (0.9332). For right-tail probabilities, subtract from 1. For probabilities between two z-values, find both areas and subtract. Your calculator's normalcdf function is often faster.

### What is margin of error?

**Margin of error** is half the width of a confidence interval. For proportions: ME = z* × √(p̂(1-p̂)/n). It represents the "plus or minus" in poll results. A larger sample size decreases the margin of error; higher confidence levels increase it.

### What is the difference between a one-sample and two-sample test?

**One-sample tests** compare a single sample statistic to a hypothesized population value (e.g., "Is the mean exam score different from 75?"). **Two-sample tests** compare statistics from two independent groups (e.g., "Is there a difference in mean scores between two teaching methods?"). See [Chapter 17](chapters/17-inference-for-means/index.md).

### What are the conditions for inference about proportions?

Three conditions must be checked: (1) **Random**: data comes from random sampling or random assignment; (2) **Independence**: sample size is less than 10% of population (10% condition); (3) **Normality**: np ≥ 10 and n(1-p) ≥ 10 (Large Counts condition). State and verify these conditions before conducting inference.

### What are the conditions for inference about means?

Three conditions: (1) **Random**: data from random sample or random assignment; (2) **Independence**: 10% condition; (3) **Normality**: population is normal, OR sample size is large (n ≥ 30 by CLT), OR sample data shows no strong skewness/outliers. Use the t-distribution because we estimate σ with s.

### When do I use z-procedures vs. t-procedures?

Use **z-procedures** for proportions or when σ is known (rare). Use **t-procedures** for means when σ is unknown and must be estimated from the sample. The t-distribution has heavier tails than z to account for the additional uncertainty from estimating σ. The degrees of freedom is n - 1.

### What is the chi-square test used for?

**Chi-square tests** analyze categorical data. The **goodness-of-fit test** compares observed frequencies to expected frequencies for one categorical variable. The **test of independence** determines whether two categorical variables are associated. The **test of homogeneity** compares distributions across multiple populations. See [Chapter 18](chapters/18-chi-square-and-regression-inference/index.md).

### How do I calculate expected counts for chi-square?

For goodness-of-fit: expected = n × (hypothesized proportion). For two-way tables: expected = (row total × column total) / table total. The chi-square statistic sums (observed - expected)² / expected across all cells. Check that all expected counts are at least 5 before proceeding.

### What is statistical power?

**Power** is the probability of correctly rejecting a false null hypothesis—it's 1 minus the Type II error rate. Higher power is better. Power increases with larger sample size, larger effect size, higher significance level (α), and lower variability. A power of 0.80 or higher is typically considered adequate.

### What is the difference between one-tailed and two-tailed tests?

A **two-tailed test** checks for any difference from the hypothesized value (Ha: p ≠ p₀). A **one-tailed test** checks for difference in a specific direction (Ha: p > p₀ or Ha: p < p₀). Choose based on your research question BEFORE seeing the data. Two-tailed tests are more conservative.

### How do I interpret r² (coefficient of determination)?

**r²** represents the proportion of variability in the response variable (y) explained by the linear relationship with the explanatory variable (x). If r² = 0.64, then 64% of the variation in y is explained by x. The remaining 36% is unexplained (residual) variation.

### What is a confounding variable?

A **confounding variable** is associated with both the explanatory and response variables, making it difficult to determine which actually causes the effect. For example, ice cream sales and drowning rates are both higher in summer—but ice cream doesn't cause drowning; temperature is confounding both. Random assignment in experiments helps control confounding.

### What is the difference between significance level and confidence level?

**Significance level (α)** is the probability of Type I error in hypothesis testing—typically 0.05 or 0.01. **Confidence level** is 1 - α, typically 95% or 99%. They're complementary: a 95% confidence interval corresponds to a two-sided test at α = 0.05.

## Common Challenges Questions

### Why is my confidence interval so wide?

Wide confidence intervals usually result from: (1) small sample size—collect more data if possible; (2) high variability in your data—inherent to the population; or (3) high confidence level—using 99% instead of 95% widens the interval. The margin of error decreases with √n, so quadrupling sample size halves the margin.

### Why do I get different p-values for the same data?

Different tests or test versions can yield different p-values. Check that you're using the correct test (z vs. t, one-tailed vs. two-tailed), the correct alternative hypothesis, and that conditions are met. Calculator and table results may differ slightly due to rounding. Also verify you entered data correctly.

### How do I know which test to use?

Ask: What type of data do I have (categorical or quantitative)? How many groups or variables? Am I estimating or testing a hypothesis? For one categorical variable: chi-square goodness-of-fit. For association between two categorical variables: chi-square test of independence. For one quantitative variable: one-sample t-test. For comparing means of two groups: two-sample t-test. Practice with the decision tree in [Chapter 19](chapters/19-communication-and-synthesis/index.md).

### What does "statistically significant" actually mean?

**Statistical significance** means the p-value is below your chosen significance level (α)—the results are unlikely to occur by chance if the null hypothesis is true. It does NOT mean the result is important or practically significant. A huge sample can detect tiny, meaningless differences as "significant." Always consider effect size and context.

### Why do conditions matter for inference?

Conditions ensure that our mathematical procedures give reliable results. If conditions aren't met, our p-values and confidence intervals may be inaccurate. For example, without random sampling, we can't generalize to the population. Without the normality condition, the sampling distribution might not be normal, invalidating our calculations.

### How do I write a good interpretation of a confidence interval?

Use this template: "We are [confidence level]% confident that the true [parameter in context] is between [lower bound] and [upper bound]." Example: "We are 95% confident that the true proportion of students who prefer online learning is between 0.52 and 0.72." Avoid saying "There's a 95% probability that..."—the interval either contains the parameter or it doesn't.

### How do I write a good conclusion for a hypothesis test?

Two parts: (1) Decision about null hypothesis: "Since p-value = [value] is [less/greater] than α = [value], we [reject/fail to reject] the null hypothesis." (2) Conclusion in context: "There [is/is not] convincing evidence that [claim in context]." Never say you "accept" the null hypothesis or that you "proved" anything.

### What's the difference between "no difference" and "fail to reject"?

**Failing to reject** the null hypothesis is NOT the same as proving no difference exists. It means we didn't find sufficient evidence against the null hypothesis. The true parameter could still differ from the null value—we just can't detect it with our data. Maybe our sample was too small or variability was too high.

### Why can't I make causal claims from observational studies?

Observational studies lack random assignment, so we can't rule out confounding variables. If people who drink coffee also exercise more, we can't tell if coffee or exercise (or something else) causes the observed health outcomes. Only randomized experiments, which balance confounders across groups, can establish causation.

### How do I avoid common mistakes with probability?

Common errors include: adding probabilities of non-mutually exclusive events without subtracting the intersection; multiplying probabilities of non-independent events without using conditional probability; confusing P(A|B) with P(B|A); and forgetting that P(A and B) = P(A) × P(B) only works for independent events. Draw tree diagrams or Venn diagrams to organize your thinking. See [Chapter 9](chapters/09-probability-fundamentals/index.md) and [Chapter 10](chapters/10-conditional-probability/index.md).

### Why does my regression prediction seem off?

Check for: (1) **Extrapolation**—predicting beyond your data's range is unreliable; (2) **Non-linearity**—if the residual plot shows a pattern, a linear model isn't appropriate; (3) **Outliers**—influential points can distort the line; (4) **Confounding**—other variables may affect the relationship. Always examine your residual plot!

### What if my data isn't normally distributed?

For means with large samples (n ≥ 30), the Central Limit Theorem usually makes normal procedures valid regardless of population shape. For small samples with clearly non-normal data, consider transformations or non-parametric methods (not covered on AP exam). For proportions, check the Large Counts condition.

## Best Practice Questions

### How should I approach an AP Statistics free-response question?

(1) Read carefully and identify what's being asked. (2) Define notation and parameters in context. (3) State and verify conditions. (4) Show your work with proper notation. (5) State conclusions in context of the problem. (6) Address all parts—partial credit is available. Never give just a numerical answer; interpretation is key.

### How do I effectively use my calculator on the AP exam?

Know where to find inference tests (STAT → TESTS), how to enter data in lists, and how to interpret output. For distributions, use normalcdf, invNorm, tcdf, and χ²cdf. Label your inputs and round appropriately (usually 3-4 decimal places). Practice enough that calculator use is automatic—you need to focus on interpretation.

### What's the best way to study for the AP Statistics exam?

Focus on understanding concepts, not memorizing formulas (they're provided). Practice interpreting output and writing explanations in context. Work through past AP free-response questions—scoring guidelines show exactly what graders expect. Connect ideas across units; inference builds on probability, which builds on data analysis.

### How do I check conditions quickly and efficiently?

Create a mental checklist: Random (how was data collected?), Independence (10% condition—is n < 0.10N?), Normality (Large Counts for proportions; sample size or graphical check for means). State conditions explicitly, then verify each with specific values from the problem. This becomes automatic with practice.

### When should I use technology vs. hand calculations?

Use technology (calculator) for: hypothesis tests, confidence intervals, regression outputs, and probability calculations. Do by hand (or understand the process for): computing basic statistics, interpreting z-scores, reading tables for simple values. On the AP exam, showing correct calculator input earns credit even if you make arithmetic errors.

### How do I set up hypotheses correctly?

The **null hypothesis (H₀)** is always a statement of equality—it represents "no effect" or "no difference" and includes the parameter equals a specific value. The **alternative hypothesis (Ha)** is what you're trying to find evidence for—it can be ≠, <, or > depending on your research question. Determine Ha BEFORE collecting data.

### How detailed should my work be on the AP exam?

Show enough work that a reader can follow your reasoning. For calculations, show the formula and key substitutions, not every arithmetic step. For interpretations, be specific and use context. A good rule: if you're deciding whether to include something, include it. You won't lose points for showing too much work.

### What should I look for in a scatterplot?

Describe the **direction** (positive/negative), **form** (linear/curved), **strength** (weak/moderate/strong), and any **unusual features** (outliers, clusters, distinct groups). Always use context: "There is a moderate, positive, linear association between hours studied and exam score."

### How do I determine if results are practically significant?

Statistical significance tells you the effect is real; practical significance tells you the effect matters. Consider: Is the effect size large enough to be meaningful? What are the consequences of the finding? A medication that statistically significantly reduces blood pressure by 0.5 mmHg might not be practically useful for patient care.

### What common errors do students make on the AP exam?

Common mistakes include: not writing in context, confusing parameter with statistic, interpreting p-value as "probability null is true," concluding "no difference" instead of "insufficient evidence," not checking conditions, extrapolating predictions, confusing correlation with causation, and not addressing all parts of a question. Review these before the exam!

## Advanced Topics Questions

### How do matched pairs differ from two-sample designs?

**Matched pairs** involve natural pairing—like before/after measurements on the same subjects, or matching by a characteristic. You analyze the differences within pairs using one-sample t-procedures. **Two-sample designs** compare independent groups. Matched pairs reduce variability from individual differences, often increasing power.

### When should I use a pooled proportion?

Use a **pooled proportion** when conducting a two-proportion z-test with H₀: p₁ = p₂. Since the null assumes equal proportions, we estimate this common proportion by pooling the data: p̂ = (x₁ + x₂)/(n₁ + n₂). Use the pooled proportion only for hypothesis tests, not confidence intervals.

### What is a Type I vs. Type II error trade-off?

Decreasing α (making it harder to reject H₀) reduces Type I error risk but increases Type II error risk. There's no free lunch—you can't minimize both simultaneously with the same sample size. Choose α based on which error is more serious for your context, then increase power by collecting more data.

### How do I interpret regression inference results?

For the slope: test whether β = 0 (no linear relationship). A small p-value suggests the explanatory variable does help predict the response. Confidence intervals for slope estimate the true rate of change. Check residual plots for linearity and equal spread. See [Chapter 18](chapters/18-chi-square-and-regression-inference/index.md).

### What factors affect the width of confidence intervals?

Three factors: (1) **Sample size** (n)—larger samples give narrower intervals; (2) **Confidence level**—higher confidence means wider intervals; (3) **Variability** (standard error)—more spread in data means wider intervals. To cut margin of error in half, you need 4 times the sample size.

### How do simulation-based inference methods work?

Instead of using formulas assuming normality, simulation methods (like bootstrapping) repeatedly resample from your data to build the sampling distribution empirically. This can work when theoretical conditions aren't met. While not heavily tested on AP, understanding the logic of "if the null were true, how often would we see this result?" is fundamental.

### What is the connection between confidence intervals and hypothesis tests?

They're two sides of the same coin. A 95% confidence interval contains all parameter values that would NOT be rejected at α = 0.05 in a two-sided test. If the null value falls outside your confidence interval, you'd reject it at the corresponding α level.

### How do I determine required sample size?

Work backward from desired margin of error: ME = z* × √(p̂(1-p̂)/n). Solve for n: n = (z*/ME)² × p̂(1-p̂). Use p̂ = 0.5 for a conservative estimate (gives largest sample size). For means: n = (z*σ/ME)². Round up to ensure adequate sample size.

### What are lurking variables and how do they affect studies?

A **lurking variable** is a variable not included in the analysis that affects the relationship you're studying. It can create or hide associations. For example, age might lurk behind the relationship between job experience and salary. Good study design identifies and controls for potential lurking variables.

### How do I communicate statistical findings effectively?

Start with the key finding in plain language, then support with numbers. Avoid jargon or explain it. Use context throughout. Report confidence intervals to show uncertainty. Distinguish between statistical and practical significance. Consider your audience's background. Visual displays can strengthen your message. See [Chapter 19](chapters/19-communication-and-synthesis/index.md) for complete guidance.
