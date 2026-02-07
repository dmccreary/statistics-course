---
title: Stratified vs. Cluster Sampling Comparison
description: Interactive visualization comparing stratified and cluster sampling methods.
image: /sims/stratified-cluster-compare/stratified-cluster-compare.png
---

# Stratified vs. Cluster Sampling Comparison

<iframe src="main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Stratified vs. Cluster Comparison Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Acorn for your thoughts?"* Sylvia asks. *"Students often mix up stratified and cluster sampling—they both involve groups! But watch carefully, and you'll see they work in opposite directions."*

This interactive visualization shows the fundamental difference between two probability sampling methods:

| Method | Groups | Selection Process |
|--------|--------|-------------------|
| **Stratified** | Called "strata" | Use ALL strata, sample FROM each |
| **Cluster** | Called "clusters" | Use SOME clusters, sample everyone IN them |

## How to Use

1. **Click "Stratified" or "Cluster"** to switch between sampling modes
2. **Observe how the groups are arranged** (horizontal strata vs. vertical clusters)
3. **Click "Select Sample"** to perform the sampling
4. **Compare the results** in the Selection Summary panel
5. **Click "Reset"** to start over with fresh random selections

### What to Notice

**In Stratified Mode:**
- Groups run horizontally (strata)
- 2 individuals are randomly selected from EACH stratum
- All 4 strata are represented in the sample
- Total sample: 8 individuals (2 per stratum)

**In Cluster Mode:**
- Groups run vertically (clusters)
- 2 entire clusters are randomly selected
- Everyone in those clusters is included
- Total sample: 40 individuals (everyone in 2 clusters)

## Key Concepts

### The Core Difference

*"Here's the secret,"* Sylvia explains. *"Think about what you're trying to do:"*

| If you want to... | Use... | Because... |
|-------------------|--------|------------|
| Guarantee representation of all groups | Stratified | You sample from EACH stratum |
| Reduce travel/cost | Cluster | You go to fewer locations |
| Compare subgroups | Stratified | Each group has its own sample |
| Handle large populations | Cluster | You don't need a full population list |

### When Each Works Best

**Stratified Sampling** works best when:
- Groups differ from each other (between-group variation is high)
- Individuals within groups are similar (within-group variation is low)
- You want to ensure all subpopulations are represented
- Example: Surveying by grade level (freshmen, sophomores, juniors, seniors)

**Cluster Sampling** works best when:
- Groups are similar to each other
- Individuals within groups are diverse
- Creating a full population list is impractical
- Example: Surveying by school (each school is a mini-population)

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/stratified-cluster-compare/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Distinguish between stratified and cluster sampling visually
2. Explain why stratified sampling guarantees representation
3. Explain why cluster sampling reduces costs
4. Identify when each method is appropriate
5. Recognize the key phrase differences: "from each" vs. "in selected"

### Target Audience

- AP Statistics students (high school)
- Introductory statistics college students
- Research methods courses

### Prerequisites

- Understanding of simple random sampling
- Concept of population subgroups
- Why representation matters in sampling

### Classroom Activities

**Activity 1: Side-by-Side Comparison (10 minutes)**

1. Run the simulation in Stratified mode and perform sampling
2. Note the total sample size and group representation
3. Switch to Cluster mode and perform sampling
4. Compare: Which method gives larger samples? More representation?

**Activity 2: Memory Aid Creation (10 minutes)**

Have students create mnemonics:
- **Strat**ified = **Strad**dle all groups (touch each one)
- **Clust**er = **Clump** together (select whole groups)

**Activity 3: Real-World Matching (15 minutes)**

For each scenario, determine the better method:

1. Surveying opinions across 4 age groups at a company → Stratified
2. Testing water quality at randomly selected lakes → Cluster
3. Studying voting patterns across income levels → Stratified
4. Surveying households in randomly selected neighborhoods → Cluster

### Common Misconceptions

1. **"Cluster and stratified are basically the same"** — No! Stratified uses ALL groups; cluster uses SOME.

2. **"Cluster sampling is biased"** — Not if clusters are randomly selected and internally diverse.

3. **"Stratified sampling is always better"** — Not always practical when you can't list the whole population.

### Assessment Questions

1. A researcher divides a state into counties, randomly selects 5 counties, and surveys all residents in those counties. Is this stratified or cluster sampling?

2. Why might cluster sampling give a less precise estimate than stratified sampling of the same size?

3. A school wants to survey student satisfaction. They decide to survey 10 students from each grade level (9-12). What sampling method is this? Why is it appropriate?

4. What's the key phrase difference between stratified ("from each") and cluster ("in selected")?

## References

- Chapter 11: Sampling and Bias - Concepts: Stratified Random Sample, Cluster Sample, When to Stratify
- [Khan Academy: Sampling Methods](https://www.khanacademy.org/math/statistics-probability/designing-studies)
- [STAT 200: Stratified vs Cluster](https://online.stat.psu.edu/stat200/)
