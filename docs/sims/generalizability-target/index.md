---
title: Generalizability Target Diagram
description: Interactive concentric circle diagram visualizing the levels of generalizability from a specific sample outward to broader populations.
image: /sims/generalizability-target/generalizability-target.png
---

# Generalizability Target Diagram

<iframe src="main.html" height="452px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Generalizability Target Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Acorn for your thoughts?"* Sylvia muses. *"Just because you found something in YOUR sample doesn't mean it applies to everyone everywhere. Understanding generalizability helps you make honest claims about what your data really shows."*

This interactive visualization uses a **target diagram** to show how far you can reasonably extend your findings beyond your immediate sample:

### The Five Rings (Center to Edge)

| Ring | Color | Strength | Description |
|------|-------|----------|-------------|
| Your Sample | Green | Strongest | What you actually observed |
| Sampling Frame | Light Green | Strong | Population from which you selected |
| Target Population | Yellow | Moderate | Who you wanted to study |
| Broader Population | Orange | Weak | Related but different groups |
| Universal Claims | Red | Weakest | "Everyone everywhere" |

## How to Use

1. **Click each ring** to see detailed explanations
2. **Select different scenarios** to see how sampling method affects reach
3. **Notice the arrows** showing how far you can generalize
4. **Look for warning symbols** on unreachable rings

## Key Insights

*"Here's the golden rule,"* Sylvia explains with emphasis. *"Random sampling lets you generalize to the sampling frame. Anything beyond that requires careful justification!"*

### What Determines Generalizability?

1. **Random sampling** from a defined population → Can generalize to that population
2. **Convenience sampling** → Can only describe your actual sample
3. **Random assignment** (in experiments) → Can make causal claims within similar populations

### Common Overgeneralizations

- Studying college students and claiming results apply to "all adults"
- Research in one country generalized to "humans everywhere"
- Studies from 2020 assumed to apply to 2030
- Results from volunteers assumed to apply to non-volunteers

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/generalizability-target/main.html" height="452px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Define generalizability as the extent to which findings can be applied beyond the study sample
2. Identify the levels of generalization from sample to universal claims
3. Assess how sampling method determines the scope of valid generalization
4. Recognize common overgeneralization errors in research reports
5. Write appropriately limited conclusions based on study design

### Target Audience

- AP Statistics students (high school)
- Introductory statistics college students
- Research methods students
- Anyone evaluating research claims

### Prerequisites

- Understanding of sampling methods (random, convenience, stratified)
- Concept of population vs. sample
- Basic study design principles

### Classroom Activities

**Activity 1: Scenario Comparison (10 minutes)**

1. Toggle through all three scenarios
2. For each, identify: What's the farthest ring you can reach?
3. Discuss: Why does random sampling extend your reach?

**Activity 2: Critique Real Studies (15 minutes)**

Present headlines from actual research:

1. "Study of 500 Harvard students shows meditation improves grades"
   - What's the sample? What's the claimed generalization?
   - Is this overgeneralization?

2. "National survey finds 70% of Americans support policy X"
   - If this used random sampling of 1,500 adults, which ring can they reach?

3. "My classroom experiment suggests students learn better with music"
   - Which ring is appropriate for this finding?

**Activity 3: Write Limited Conclusions (10 minutes)**

Given a study design, write conclusions that:

- Stay within the appropriate ring
- Acknowledge limitations
- Suggest what would be needed to generalize further

*"Don't worry—every statistician drops an acorn sometimes,"* Sylvia reassures. *"The best researchers are honest about what their studies CAN'T tell us!"*

### Assessment Questions

1. A researcher randomly samples 200 customers from a company's email list and surveys their satisfaction. To whom can the researcher generalize the results?

2. A psychology study uses volunteers from an introductory course. What's the maximum ring the findings can claim without additional justification?

3. What sampling method would allow generalization to "all AP Statistics students in the country"?

4. A study done in 2015 found that 80% of teens used Facebook daily. Explain why generalizing this to 2026 teens would be problematic.

5. What's the difference between saying "we found" versus "this suggests" when reporting results?

## References

- Chapter 19: Communication and Synthesis - Concept: Generalizability
- Chapter 11: Sampling and Bias - Sampling methods and bias
- [Wikipedia: External validity](https://en.wikipedia.org/wiki/External_validity)
- [Wikipedia: Generalizability theory](https://en.wikipedia.org/wiki/Generalizability_theory)
