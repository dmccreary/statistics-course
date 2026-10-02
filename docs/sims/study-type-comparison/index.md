---
title: Study Type Comparison Tool
description: Students classify study descriptions as observational studies or experiments, check key design features, and compare what each design can conclude.
image: /sims/study-type-comparison/study-type-comparison.png
og:image: /sims/study-type-comparison/study-type-comparison.png
twitter:image: /sims/study-type-comparison/study-type-comparison.png
social:
   cards: false
quality_score: 98
---

# Study Type Comparison Tool

<iframe src="main.html" height="532px" width="100%" scrolling="no"></iframe>

[Run the Study Type Comparison Tool MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Whether a study can support a cause-and-effect conclusion depends on how the data were collected. This MicroSim presents 12 study descriptions, most taken from the chapter and its practice problems. For each one you check the design features you can find, classify the study as an **observational study** or an **experiment**, and see what kind of conclusion the study can support on the conclusion strength meter.

After you answer, **Compare Both Designs** shows the same research question studied both ways. In the observational version, subjects with a lurking trait mostly choose the same group. In the experiment, a real random assignment of 24 subjects is carried out each time you press Replay, so the groups usually come out similar and occasionally come out uneven.

## How to Use

1. Read the study description on the card.
2. Use the checklist to mark the features you see: a treatment imposed by the researchers, random assignment, and groups being compared.
3. Click **Observational Study** or **Experiment**. The feedback explains the correct classification, the checklist shows the actual features, and the meter shows how strong a conclusion the study supports.
4. Click **Compare Both Designs** to see the same question as an observational study and as an experiment. Click **Replay** to run the assignment again.
5. Click **Next Study** to continue. After 12 studies, review your score and click **Reset** to start over in a new order.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/study-type-comparison/main.html"
        height="532px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Analyze a study description to classify it as an observational study or an experiment (Analyze)
2. Identify the design features that determine the classification: imposed treatment, random assignment, comparison groups (Analyze)
3. Evaluate whether a study supports a claim of association only or of cause and effect (Evaluate)

### Bloom's Taxonomy Level

**Analyze** - students classify.

### Grade Level

9-12 (AP Statistics)

### Duration

15-25 minutes

### Prerequisites

- Explanatory and response variables
- Lurking and confounding variables

### Activities

1. **Warm-Up (5 min):** As a class, classify the first two studies. For each, ask: "Who decided which subjects got the treatment?"
2. **Independent Practice (10 min):** Students classify all 12 studies, using the checklist before each answer, and record their score.
3. **Compare Designs (10 min):** For three studies, students open Compare Both Designs, press Replay several times, and record the share of the lurking trait in each group. They explain why the experiment supports a stronger conclusion.

### Discussion Questions

- Two of the studies have experiments that would be unethical or impractical. Which ones, and why?
- After pressing Replay several times, how often were the experimental groups badly unbalanced? What would reduce that?
- Rewrite one observational study so that it becomes an experiment.

### Assessment

- Score of at least 10 out of 12 on classification
- Student justifies each classification by naming who assigned the treatment
- Student writes an appropriately worded conclusion ("is associated with" versus "causes") for a new study

### Common Misconceptions

- Any study that compares two groups is an experiment
- A large observational study can prove causation
- Experiments are always the better choice, even when assigning the treatment would be unethical

## References

1. [Chapter 8: Causation and Study Design](../../chapters/08-causation-and-study-design/index.md) - sections on observational studies, experiments, and comparing studies
2. [Observational study](https://en.wikipedia.org/wiki/Observational_study) - Wikipedia overview of studies in which the researcher does not assign treatments
3. [Randomized controlled trial](https://en.wikipedia.org/wiki/Randomized_controlled_trial) - Wikipedia article on experiments that use random assignment
