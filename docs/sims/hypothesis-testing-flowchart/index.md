---
title: Hypothesis Testing Decision Flowchart
description: Interactive step-by-step workflow for conducting hypothesis tests with guided decision making.
quality_score: 90
---
# Hypothesis Testing Decision Flowchart

<iframe src="main.html" height="602px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

"Time to squirrel away this crucial point!" Sylvia emphasizes. "Every hypothesis test follows the same logical structure. This flowchart guides you through each step so you never miss anything important!"

Follow the complete hypothesis testing procedure with an interactive decision flowchart.

### How to Use

- Click **Next** and **Previous** to step through the procedure
- **Click any node** to jump directly to that step
- Use **Skip to End** to see the final conclusion
- Click **New Example** to generate a different scenario
- Watch the path highlight to show your progress

### The Eight Steps

1. **State Hypotheses** - Write H0 and Ha in terms of the parameter
2. **Check Conditions** - Verify random, independent, and large counts
3. **Conditions Met?** - Decision point: can we proceed?
4. **Calculate Test Statistic** - Compute the z-score
5. **Find P-Value** - Calculate probability from the test statistic
6. **Compare to Alpha** - Is p-value less than significance level?
7. **Reject H0** - If p-value < alpha
8. **Fail to Reject H0** - If p-value >= alpha

### Color Key

| Shape | Meaning |
|-------|---------|
| Rounded rectangle (green) | Start/End states |
| Rectangle (blue) | Process steps |
| Diamond (yellow) | Decision points |
| Rectangle (green) | Reject H0 outcome |
| Rectangle (orange) | Fail to Reject outcome |

## Lesson Plan

### Learning Objective

Students will follow the complete hypothesis testing procedure, making correct conclusions based on p-values and significance levels (Bloom's Taxonomy: Apply).

### Warmup Activity (5 minutes)

Have students write out the hypothesis testing procedure from memory. Then compare to the flowchart to see what they missed.

### Guided Exploration (10 minutes)

1. Step through the default example together as a class
2. At each decision point, discuss the logic
3. Emphasize the difference between "Reject H0" and "Fail to Reject H0"
4. Generate new examples and predict the outcome before revealing it

### Discussion Questions

1. Why is "Check Conditions" required before calculating the test statistic?
2. What changes in the flowchart for a one-sided test vs. a two-sided test?
3. Why do we never say "Accept H0"?
4. What would happen if we skipped directly from calculating z to the conclusion?

### Common Errors to Avoid

- Forgetting to check conditions before proceeding
- Using sample p-hat instead of hypothesized p0 in the standard error
- Saying "accept H0" instead of "fail to reject H0"
- Omitting the significance level when stating conclusions
