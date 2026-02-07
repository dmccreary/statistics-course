---
title: Communication and Synthesis
description: Master the art of communicating statistical findings and synthesizing your knowledge for AP Statistics success
generated_by: claude skill chapter-content-generator
date: 2026-02-06 22:35:37
version: 0.04
---

# Communication and Synthesis

## Summary

This final chapter focuses on synthesizing statistical knowledge and communicating results effectively. Students will learn about the distinction between statistical and practical significance, effect sizes, study limitations, and how to write clear statistical reports. The chapter concludes with strategies for success on the AP Statistics exam.

## Concepts Covered

This chapter covers the following 10 concepts from the learning graph:

290. Regression Conclusion
292. Stat vs Practical Sig
293. Effect Size
294. Sample Size Impact
295. Study Limitations
296. Generalizability
297. Statistical Report Writing
298. Communicating Results
299. Four-Step Process
300. AP Exam Strategies

## Prerequisites

This chapter builds on concepts from:

- [Chapter 16: Hypothesis Testing](../16-hypothesis-testing/index.md)
- [Chapter 17: Inference for Means](../17-inference-for-means/index.md)
- [Chapter 18: Chi-Square and Regression Inference](../18-chi-square-and-regression-inference/index.md)

---

## Introduction: The Final Piece of the Statistical Puzzle

Welcome to the final chapter of your AP Statistics journey! You've learned how to collect data, describe it with graphs and numbers, understand probability, and make inferences about populations. But here's the thing—none of that matters if you can't communicate your findings clearly and thoughtfully to others.

Think about it: what good is a brilliant analysis if no one understands it? Sylvia likes to say, "A tree falling in the forest might not make a sound if no one's there, but a statistical result that's never communicated definitely doesn't make an impact." Throughout this chapter, we'll focus on the skills that transform you from someone who *does* statistics to someone who *thinks* statistically and shares insights with the world.

Let's squirrel away the big ideas that will help you synthesize everything you've learned and prepare for success on the AP exam!

## Drawing Conclusions from Regression Analysis

Before we dive into communication and synthesis, let's make sure we can properly conclude a regression analysis. Drawing a regression conclusion means interpreting your t-test for the slope in the context of your research question.

When you perform inference for the slope of a regression line, your conclusion should include:

- A decision about the null hypothesis (reject or fail to reject)
- The evidence that supports your decision (p-value compared to significance level)
- An interpretation in context of the original question
- A statement about the relationship between variables

| Component | What to Include | Example |
|-----------|-----------------|---------|
| Decision | State whether you reject or fail to reject \( H_0 \) | "We reject the null hypothesis" |
| Evidence | Report the p-value and compare to \( \alpha \) | "because the p-value (0.003) is less than \( \alpha = 0.05 \)" |
| Context | Relate to the original variables | "There is convincing evidence of a linear relationship between study hours and exam scores" |
| Direction | State whether slope is positive or negative | "Students who study more tend to score higher on exams" |

Here's a complete example of a regression conclusion:

> "We reject the null hypothesis that there is no linear relationship between hours of sleep and test performance (t = 3.45, df = 28, p = 0.002). Since the p-value is less than our significance level of 0.05, we have convincing evidence that a linear relationship exists. The positive slope (b = 4.2) suggests that students who get more sleep tend to perform better on tests."

!!! tip "Sylvia Says"
    "When writing regression conclusions, I always ask myself: Would someone who hasn't seen my data understand what I found and why it matters? If not, I haven't finished my job yet!"

## Statistical Significance vs. Practical Significance

Here's where things get really interesting—and where many students (and even some professionals!) stumble. Just because a result is *statistically significant* doesn't mean it's actually *important* in the real world.

**Statistical significance** means we have enough evidence to conclude that an effect or relationship exists—it's unlikely our results happened by chance alone. We typically reject the null hypothesis when the p-value falls below our chosen significance level (often 0.05).

**Practical significance** asks a different question: Is this effect large enough to actually matter?

Consider this example: A pharmaceutical company tests a new diet pill and finds that, on average, people taking the pill lose 0.5 pounds more than those taking a placebo over 12 weeks. With a sample size of 10,000 people, this difference is statistically significant (p < 0.001). But would you spend money on a pill that helps you lose only half a pound in three months? Probably not—the effect lacks practical significance.

| Type of Significance | Question It Answers | Depends On |
|---------------------|---------------------|------------|
| Statistical | Is the effect real (not due to chance)? | Sample size, variability, effect size |
| Practical | Is the effect meaningful or useful? | Context, cost, consequences |

The relationship between these two types of significance creates four possible scenarios:

1. **Statistically significant AND practically significant**: The best outcome—you've found a real effect that matters
2. **Statistically significant but NOT practically significant**: The effect is real but too small to care about (common with huge sample sizes)
3. **NOT statistically significant but practically significant**: You might have found something important, but your sample was too small to detect it reliably
4. **Neither statistically nor practically significant**: No real effect, or if there is one, it's too small to matter

#### Diagram: Statistical vs. Practical Significance Decision Matrix

<iframe src="../../sims/stat-practical-sig-matrix/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden; border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

!!! warning "Common Mistake Alert"
    Don't confuse "statistically significant" with "important" or "large." A tiny effect can be statistically significant with a large enough sample, and a large effect might not be statistically significant with a small sample.

## Understanding Effect Size

So how do we measure whether an effect is practically significant? This is where **effect size** comes in. Effect size is a standardized measure of how large an effect is, independent of sample size.

While p-values tell us whether an effect exists, effect sizes tell us how big that effect is. Think of it this way: a p-value is like asking "Did something happen?" while an effect size asks "How much did it happen?"

### Common Effect Size Measures

For comparing two means, we often use **Cohen's d**:

\[
d = \frac{\bar{x}_1 - \bar{x}_2}{s_{\text{pooled}}}
\]

where \( s_{\text{pooled}} \) is the pooled standard deviation. Cohen's d tells us how many standard deviations apart the two groups are.

For correlation and regression, **\( r^2 \)** (coefficient of determination) serves as an effect size, telling us what proportion of the variation in y is explained by x.

Here are general guidelines for interpreting effect sizes:

| Effect Size | Cohen's d | \( r^2 \) | Interpretation |
|-------------|-----------|-----------|----------------|
| Small | 0.2 | 0.01 | Subtle, may need special attention to notice |
| Medium | 0.5 | 0.09 | Noticeable to careful observers |
| Large | 0.8 | 0.25 | Obvious to casual observers |

!!! note "Context Matters"
    These benchmarks are rough guidelines. A "small" effect size might be huge in some contexts (like a drug that prevents heart attacks) and meaningless in others. Always interpret effect sizes in the context of your specific situation.

#### Diagram: Effect Size Visualization MicroSim

<iframe src="../../sims/effect-size-visualizer/main.html" width="100%" height="520px" scrolling="no" style="overflow: hidden; border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

## The Impact of Sample Size

Sample size plays a crucial role in what you can detect and conclude. Understanding its effects helps you interpret results wisely and design better studies.

**Larger samples provide:**

- More statistical power (ability to detect true effects)
- Narrower confidence intervals
- More precise estimates
- Greater ability to detect small effects

**But larger samples also mean:**

- Trivially small effects may become "statistically significant"
- Greater cost and time to collect data
- Potential for detecting differences that don't matter practically

The relationship between sample size and what we can detect creates an important pattern:

| Sample Size | Small Effect | Medium Effect | Large Effect |
|-------------|--------------|---------------|--------------|
| Small (n < 30) | Unlikely to detect | May detect | Likely to detect |
| Medium (n = 30-100) | May detect | Likely to detect | Will detect |
| Large (n > 100) | Likely to detect | Will detect | Will detect |

This is why the distinction between statistical and practical significance becomes especially important with large samples. When you have thousands of observations, even tiny, meaningless differences can produce impressive-looking p-values.

Consider the relationship between sample size and margin of error for a proportion:

\[
\text{Margin of Error} = z^* \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}
\]

Notice that margin of error decreases as \( n \) increases—specifically, you need to quadruple your sample size to cut the margin of error in half!

#### Diagram: Sample Size and Margin of Error Explorer

<iframe src="../../sims/sample-size-margin-error/main.html" width="100%" height="480px" scrolling="no" style="overflow: hidden; border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

## Recognizing Study Limitations

Every study has limitations—and acknowledging them honestly is a sign of good statistical thinking, not weakness. Understanding limitations helps us interpret results appropriately and avoid overgeneralizing our conclusions.

Common study limitations fall into several categories:

### Design Limitations

- **Observational vs. Experimental**: Remember, only randomized experiments can establish causation. If your study is observational, you cannot claim that one variable *causes* changes in another.
- **Sampling Method**: Was the sample truly random? Convenience samples and voluntary response samples introduce bias.
- **Confounding Variables**: Were there variables that could explain the relationship you observed?

### Measurement Limitations

- **Response Bias**: Did respondents answer honestly? Sensitive topics often produce inaccurate responses.
- **Measurement Error**: How precise were your measuring instruments or survey questions?
- **Missing Data**: Did nonresponse bias affect your results?

### Statistical Limitations

- **Sample Size**: Was the sample large enough to detect the effect you were looking for?
- **Multiple Comparisons**: Did you test many hypotheses, increasing the chance of false positives?
- **Assumptions Violated**: Were the conditions for your inference procedure actually met?

Here's a checklist for evaluating study limitations:

- [ ] Was random sampling used? If not, can results generalize to a larger population?
- [ ] Was random assignment used? If not, can we make causal claims?
- [ ] Were confounding variables controlled or acknowledged?
- [ ] Is the sample size adequate for the analysis performed?
- [ ] Were measurement methods reliable and valid?
- [ ] What sources of bias might exist?
- [ ] Were conditions for inference procedures checked and met?

!!! tip "Sylvia's Study Limitation Reminder"
    "I've learned that the best researchers aren't those who claim their studies are perfect—they're the ones who can clearly explain what their studies CAN'T tell us. That kind of honesty builds trust!"

## Generalizability: Who Can We Apply Our Results To?

**Generalizability** refers to the extent to which our findings can be applied to populations or situations beyond our specific study. It's about asking: "Who else does this apply to?"

The scope of your generalization depends on how your data was collected:

| Data Collection Method | Can Generalize To |
|------------------------|-------------------|
| Random sample from population | The entire population |
| Convenience sample | Only the sample itself (with caution) |
| Specific subgroup studied | Only that subgroup |
| Random assignment to treatments | Causal effects in similar populations |

### Factors Affecting Generalizability

1. **Sampling Frame**: Did your sampling method actually reach all members of your target population?

2. **Response Rate**: High nonresponse can limit generalizability if nonresponders differ from responders.

3. **Time and Place**: Results from one time or location may not apply to others. A study of college students in 2025 might not generalize to students in 1995.

4. **Subject Characteristics**: If you studied only one demographic group, be careful generalizing to others.

Consider this example: A researcher studies the effect of a new teaching method on calculus performance using students at a private university. Even with random assignment to treatment groups, we should be cautious about generalizing to:

- Students at public universities
- Students in other countries
- Students learning subjects other than calculus
- Students in future years with different preparation

#### Diagram: Generalizability Target Diagram

<iframe src="../../sims/generalizability-target/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden; border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

## Writing Effective Statistical Reports

Being able to write clear statistical reports is one of the most valuable skills you'll develop in this course. Whether you're writing a lab report, a research paper, or an answer on the AP exam, your goal is to communicate your statistical thinking clearly and completely.

### Components of a Statistical Report

A complete statistical report typically includes:

1. **Introduction**: State the research question and why it matters
2. **Data Description**: Explain how data was collected and describe the variables
3. **Exploratory Analysis**: Present relevant graphs and summary statistics
4. **Methods**: Describe the statistical procedures you'll use and why
5. **Results**: Report numerical findings with appropriate interpretation
6. **Conclusions**: Answer the research question and discuss limitations

### Writing About Results

When presenting statistical results, include:

- The name of the test or procedure used
- The test statistic and its value
- The p-value or confidence interval
- Your conclusion in context
- Any relevant effect size measures

Here's an example of poor vs. good statistical writing:

**Poor**: "The p-value was 0.03 so we reject the null hypothesis."

**Good**: "We performed a two-sample t-test to compare mean test scores between students who used the new study app (n = 45, mean = 82.3, SD = 8.2) and those who did not (n = 48, mean = 76.1, SD = 9.1). The test yielded t = 3.42 with df = 89.7 and p = 0.001. Since p < 0.05, we reject the null hypothesis and conclude that there is convincing evidence of a difference in mean test scores. Students using the app scored an average of 6.2 points higher, with a 95% confidence interval for the difference of (2.6, 9.8) points."

### Key Phrases for AP Statistics

Memorize these phrases for hypothesis testing conclusions:

- "There is (or is not) convincing evidence that..."
- "We reject (or fail to reject) the null hypothesis..."
- "Since the p-value is less than (or greater than) α..."
- "We are X% confident that the true [parameter] is between..."

!!! warning "Avoid These Common Writing Errors"
    - Don't say "accept the null hypothesis"—say "fail to reject"
    - Don't say "the probability that the null hypothesis is true"—that's not what p-value means
    - Don't confuse sample statistics with population parameters
    - Don't forget to state your conclusion in context!

## Communicating Results to Different Audiences

Effective communication means tailoring your message to your audience. The way you explain results to a statistics professor differs from how you'd explain them to a business manager or a newspaper reader.

### Audience-Specific Communication

| Audience | Focus On | Avoid |
|----------|----------|-------|
| Statistical experts | Technical details, methodology, assumptions | Over-explaining basics |
| Professionals in the field | Practical implications, effect sizes | Excessive jargon |
| General public | Real-world meaning, visualizations | Technical terminology |
| AP exam graders | Complete reasoning, correct terminology | Vague or incomplete answers |

### Visual Communication

Graphs and charts can communicate results more effectively than tables of numbers. When presenting results visually:

- Choose the right graph type for your data
- Label axes clearly with units
- Include informative titles
- Highlight the key finding
- Keep designs simple and uncluttered

#### Diagram: Audience Communication Matcher

<iframe src="../../sims/audience-communication-matcher/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden; border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

## The Four-Step Process for Inference

The AP Statistics exam expects you to follow a consistent process when answering inference questions. This **four-step process** ensures you include all required elements and earn full credit.

### The Four Steps

**Step 1: STATE**

- State the hypotheses (for hypothesis tests) OR
- Define the parameter and confidence level (for confidence intervals)
- Name the procedure you will use

**Step 2: PLAN**

- Identify the appropriate inference procedure
- Check conditions:
  - Random: Was the data collected randomly?
  - Independent: Is the sample less than 10% of the population? (or independent groups?)
  - Normal: Is the sampling distribution approximately normal?

**Step 3: DO**

- Calculate the test statistic and p-value (for hypothesis tests) OR
- Calculate the confidence interval
- Show your work with formulas and substitutions

**Step 4: CONCLUDE**

- Make a decision about the hypothesis (for tests)
- Interpret the interval (for confidence intervals)
- Answer in context of the original problem

### Four-Step Process Example

**Problem**: A random sample of 150 customers found that 42 preferred the new product design. Is there convincing evidence that more than 25% of all customers prefer the new design? Use α = 0.05.

**STATE**:
- H₀: p = 0.25 (25% of all customers prefer the new design)
- Hₐ: p > 0.25 (More than 25% prefer the new design)
- We will perform a one-proportion z-test.

**PLAN**:
- Random: ✓ The sample was randomly selected
- Independent: ✓ 150 is less than 10% of all customers (assuming more than 1,500 customers)
- Normal: ✓ np₀ = 150(0.25) = 37.5 ≥ 10 and n(1-p₀) = 150(0.75) = 112.5 ≥ 10

**DO**:
- Sample proportion: \( \hat{p} = \frac{42}{150} = 0.28 \)
- Standard error: \( SE = \sqrt{\frac{0.25(0.75)}{150}} = 0.0354 \)
- Test statistic: \( z = \frac{0.28 - 0.25}{0.0354} = 0.847 \)
- P-value: P(Z > 0.847) = 0.198

**CONCLUDE**:
Since the p-value (0.198) is greater than α = 0.05, we fail to reject the null hypothesis. There is not convincing evidence that more than 25% of all customers prefer the new product design.

#### Diagram: Four-Step Process Interactive Flowchart

<iframe src="../../sims/four-step-process-flowchart/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden; border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

!!! tip "Sylvia's Four-Step Reminder"
    "I remember the four steps with the mnemonic: 'Some People Don't Care'—State, Plan, Do, Conclude. But trust me, AP graders DEFINITELY care if you skip a step! My tail gets all puffy just thinking about losing points for forgetting to check conditions."

## AP Exam Strategies for Success

You've learned the content—now let's make sure you can show what you know on exam day. These strategies have helped countless students maximize their scores.

### General Exam Strategies

1. **Read carefully**: Many mistakes come from misreading the question. Underline key words.

2. **Show your work**: Partial credit exists! Write down formulas before substituting numbers.

3. **Answer in context**: Generic answers lose points. Always refer back to the specific scenario.

4. **Manage your time**: Don't spend too long on any single question. Move on and come back.

5. **Use your calculator wisely**: Know what outputs mean and how to interpret them.

### Multiple Choice Tips

- Eliminate obviously wrong answers first
- Watch for answers that are "close but wrong" (common student errors)
- If stuck, look for patterns in the answer choices
- Never leave a question blank—there's no penalty for guessing

### Free Response Tips

- Read all parts of the question before starting
- Answer what's asked, not what you wish was asked
- Use complete sentences when interpretation is required
- Draw graphs when they help your explanation
- Don't erase work unless you have something better to replace it

### Common Point-Losers to Avoid

| Mistake | Why It Costs Points | How to Avoid |
|---------|---------------------|--------------|
| Saying "accept H₀" | This is statistically incorrect | Always say "fail to reject H₀" |
| Not checking conditions | Can't do inference without them | Always include the Plan step |
| Vague conclusions | Doesn't show understanding | Include specific context |
| Wrong direction of p-value comparison | Shows conceptual confusion | Remember: reject when p < α |
| Forgetting units | Shows incomplete interpretation | Always include units in context |

### Time Management by Section

| Section | Questions | Time | Strategy |
|---------|-----------|------|----------|
| Multiple Choice | 40 | 90 min | ~2 min each, mark difficult ones to return |
| Free Response | 6 | 90 min | ~13 min each, with 5 min review at end |

#### Diagram: AP Exam Preparation Checklist

<iframe src="../../sims/ap-exam-checklist/main.html" width="100%" height="480px" scrolling="no" style="overflow: hidden; border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

## Putting It All Together: A Complete Statistical Investigation

Let's walk through a complete example that demonstrates everything we've covered in this chapter—and throughout the entire course.

**Scenario**: A school administrator wants to know if a new attendance policy has reduced tardiness. Before the policy, the school recorded an average of 45 tardies per day. After implementing the policy for one semester, a random sample of 40 days showed a mean of 38.2 tardies with a standard deviation of 12.4.

### Complete Analysis

**Research Question**: Has the new attendance policy reduced the mean number of daily tardies?

**Exploratory Analysis**:
- The sample mean (38.2) is lower than the previous average (45)
- The difference is 6.8 tardies per day
- With SD = 12.4 and n = 40, we have reasonable sample size

**Four-Step Inference Process**:

**STATE**:
- H₀: μ = 45 (The mean number of daily tardies is still 45)
- Hₐ: μ < 45 (The mean number of daily tardies has decreased)
- We'll use a one-sample t-test at α = 0.05

**PLAN**:
- Random: ✓ Days were randomly sampled
- Independent: ✓ 40 days < 10% of all school days (at least 400 in school history)
- Normal: ✓ n = 40 ≥ 30, so CLT applies

**DO**:
\[
t = \frac{38.2 - 45}{12.4/\sqrt{40}} = \frac{-6.8}{1.96} = -3.47
\]

With df = 39, P-value = P(t < -3.47) ≈ 0.0007

**CONCLUDE**: Since p = 0.0007 < 0.05, we reject H₀. There is convincing evidence that the new attendance policy has reduced the mean number of daily tardies.

**Effect Size and Practical Significance**:

Cohen's d ≈ 6.8/12.4 = 0.55 (medium effect)

A reduction of about 7 tardies per day represents roughly a 15% decrease. Given the minimal cost of implementing the policy, this appears to be both statistically and practically significant.

**Limitations**:
- This is an observational study (no random assignment), so we cannot definitively claim the policy *caused* the reduction
- Other factors may have changed during the semester (weather, time of year)
- Results may not generalize to other schools with different populations

**Communication**: "After implementing the new attendance policy, the school saw a statistically significant reduction in daily tardies, from an average of 45 to about 38 per day (t = -3.47, p < 0.001). This 15% reduction represents a medium-sized effect and appears practically meaningful for improving school climate."

## Chapter Summary

Congratulations—you've reached the end of our statistical journey together! Let's squirrel away the key ideas from this final chapter:

**Key Concepts Covered**:

1. **Regression Conclusions** require stating your decision, providing evidence, and interpreting in context

2. **Statistical vs. Practical Significance** are different questions—statistical significance asks "Is it real?" while practical significance asks "Does it matter?"

3. **Effect Size** measures how large an effect is, independent of sample size

4. **Sample Size** affects what you can detect—larger samples can find smaller effects but may flag trivial differences

5. **Study Limitations** should always be acknowledged honestly—they include design, measurement, and statistical issues

6. **Generalizability** depends on how data was collected—random samples allow broader generalization

7. **Statistical Report Writing** should be clear, complete, and tailored to your audience

8. **Communicating Results** means adjusting your message for who's listening

9. **The Four-Step Process** (State, Plan, Do, Conclude) is essential for AP exam success

10. **AP Exam Strategies** include showing your work, answering in context, and managing time wisely

!!! success "Sylvia's Final Thought"
    "You did it! You've learned to think statistically—to look at data with curiosity, to question claims with healthy skepticism, and to draw conclusions with appropriate confidence. That's a superpower that will serve you well beyond any exam. Now go forth and crunch those numbers! My tail is tingling with pride. 🐿️"

---

## Practice Problems

??? question "Problem 1: Statistical vs. Practical Significance"
    A study of 50,000 participants found that people who drink coffee have blood pressure that averages 0.3 mmHg lower than non-coffee drinkers (p < 0.001).

    a) Is this result statistically significant?

    b) Is this result practically significant? Explain.

    **Answer**:
    a) Yes, the result is statistically significant (p < 0.001 is less than typical α levels).

    b) This result is NOT practically significant. A difference of 0.3 mmHg is far too small to affect health outcomes or medical decisions. Normal blood pressure fluctuates by much more than this throughout the day. The statistical significance is likely due to the very large sample size detecting a trivially small difference.

??? question "Problem 2: Four-Step Process"
    A researcher claims that at least 40% of adults exercise regularly. A random sample of 200 adults found that 72 exercise regularly. Test this claim at the 0.05 significance level.

    **Answer**:

    **STATE**: H₀: p = 0.40; Hₐ: p < 0.40; One-proportion z-test

    **PLAN**: Random ✓ (stated); Independent ✓ (200 < 10% of adults); Normal ✓ (np₀ = 80 ≥ 10, n(1-p₀) = 120 ≥ 10)

    **DO**: p̂ = 72/200 = 0.36; z = (0.36 - 0.40)/√(0.40×0.60/200) = -1.15; P-value = 0.125

    **CONCLUDE**: Since p-value (0.125) > α (0.05), we fail to reject H₀. There is not convincing evidence that less than 40% of adults exercise regularly.

??? question "Problem 3: Generalizability"
    A study of students at three large state universities found that those who study in groups perform better on exams than those who study alone. Discuss the generalizability of this finding.

    **Answer**: The findings may generalize to:

    - Students at similar large state universities
    - Courses similar to those studied

    The findings may NOT generalize to:

    - Students at small colleges or private universities (different culture)
    - K-12 students or graduate students (different developmental stages)
    - Students in very different fields (e.g., if study was in STEM, may not apply to arts)
    - Online/remote learners (different context)

    Additionally, if this was observational, we cannot claim group study *causes* better performance—students who choose group study may differ in other ways from those who study alone.

??? question "Problem 4: Writing a Conclusion"
    Write an appropriate conclusion for a 95% confidence interval of (0.52, 0.68) for the proportion of voters who support a new education policy.

    **Answer**: "We are 95% confident that the true proportion of all voters who support the new education policy is between 0.52 and 0.68 (or 52% and 68%). Since this entire interval is above 0.50, we have evidence that a majority of voters support the policy."
