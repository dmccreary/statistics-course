---
title: Question Wording Effects Simulator
description: Interactive simulation demonstrating how question wording dramatically affects survey responses.
image: /sims/question-wording-effects/question-wording-effects.png
---

# Question Wording Effects Simulator

<iframe src="main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Question Wording Effects Simulator Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"My tail's tingling—we're onto something important here!"* Sylvia exclaims. *"The exact same policy question can get wildly different results depending on how you phrase it. Watch closely!"*

This interactive simulation demonstrates **response bias** caused by question wording. Students explore how the same underlying topic can generate very different "public opinion" results based solely on word choice.

### The Power of Framing

| Framing Type | Strategy | Effect on Responses |
|--------------|----------|---------------------|
| **Neutral** | Plain, factual language | Baseline response |
| **Positive** | Appeals to shared values | Increases support |
| **Negative** | Highlights downsides, uses loaded terms | Decreases support |

## How to Use

1. **Select a Topic** (Environmental Policy, School Rules, Technology Use, or Free Speech)
2. **Choose a Framing** (Neutral, Positive, or Negative)
3. **Click "Send Survey"** to see simulated results
4. **Compare** the same question with different framings
5. **Click "Compare All"** to see all three versions side-by-side

### What to Notice

- The **highlighted keywords** show which words create the framing effect
- The **swing** between positive and negative framing can be 40+ percentage points!
- The underlying opinion doesn't change—only how we asked

## Key Concepts

### Types of Problematic Questions

| Type | Problem | Example |
|------|---------|---------|
| **Leading** | Suggests an answer | "Don't you agree that...?" |
| **Loaded** | Emotionally charged words | "Wasteful spending" |
| **Double-barreled** | Asks two things at once | "Do you support X and Y?" |
| **Confusing** | Uses jargon | "Pedagogical methodologies" |

*"Watch how the words shift responses,"* Sylvia explains:

- "**Protecting** children" vs. "**Restricting** freedom"
- "**Safeguards**" vs. "**Burdensome regulations**"
- "**Managing** distractions" vs. "**Banning** devices"

### Real-World Impact

Classic examples of wording effects:

| Topic | Version A | Version B | Difference |
|-------|-----------|-----------|------------|
| Welfare | "Aid to the poor" (68% support) | "Welfare" (48% support) | 20 points |
| Abortion | "Woman's right to choose" | "Unborn child's right to life" | Varies widely |
| Immigration | "Undocumented immigrants" | "Illegal aliens" | Significant |

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/question-wording-effects/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Identify leading, loaded, and double-barreled questions
2. Explain how word choice affects survey responses
3. Rewrite biased questions in neutral form
4. Critically evaluate survey questions for potential bias

### Target Audience

- AP Statistics students (high school)
- Introductory statistics college students
- Research methods and survey design courses
- Media literacy education

### Prerequisites

- Understanding of response bias concept
- Awareness that surveys can be manipulated
- Basic critical thinking skills

### Classroom Activities

**Activity 1: Spot the Bias (10 minutes)**

For each pair, identify which is more neutral:

1. "Do you support reducing class sizes?" vs. "Do you support wasting taxpayer money on smaller classes?"

2. "Should the government restrict free speech?" vs. "Should harmful content be regulated online?"

3. "Do you support gun safety measures?" vs. "Do you support gun control laws?"

**Activity 2: Rewrite Workshop (15 minutes)**

Students rewrite biased questions neutrally:

1. "Don't you agree the new policy is unfair?"
2. "Should we ban dangerous junk food in schools?"
3. "Do you support helping struggling families and reducing child poverty?"

**Activity 3: Design Your Own (15 minutes)**

Students create three versions of a question on a school topic:
- Neutral version
- Version designed to increase support
- Version designed to decrease support

### Discussion Questions

1. Why might a pollster intentionally use biased wording?
2. How can you identify bias when reading poll results in the news?
3. Should there be standards for how political polls are worded?
4. Is it possible to write a completely neutral question?

### Assessment Questions

1. A poll asks: "Should the government eliminate wasteful programs and reduce the bloated federal bureaucracy?" Identify two examples of loaded language.

2. Rewrite this double-barreled question as two separate neutral questions: "Do you support increasing teacher pay and reducing administrative costs?"

3. Why might the same polling organization get different results on the same topic depending on who commissioned the poll?

4. A news headline says "78% of Americans support environmental protection." What information would you need to evaluate this claim?

## References

- Chapter 11: Sampling and Bias - Concepts: Wording of Questions, Response Bias
- [Pew Research: Question Wording](https://www.pewresearch.org/our-methods/u-s-surveys/writing-survey-questions/) - Best practices
- [AAPOR Guidelines](https://www.aapor.org/) - Professional survey standards
