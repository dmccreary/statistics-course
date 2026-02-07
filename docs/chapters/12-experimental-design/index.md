---
title: Experimental Design
description: Learn how to design experiments that can establish cause-and-effect relationships through control, randomization, replication, and blinding
generated_by: claude skill chapter-content-generator
date: 2026-02-06 22:24:49
version: 0.04
---

# Experimental Design

## Summary

This chapter covers the principles of designing experiments to establish causal relationships. Students will learn about experimental units, treatments, factors, and levels. Key principles include control, randomization, replication, and blinding. Understanding good experimental design enables students to critically evaluate scientific claims.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

112. Experimental Units
113. Subjects
114. Treatment
115. Factor
116. Levels of a Factor
117. Placebo
118. Placebo Effect
119. Control Group
120. Comparison in Experiments
121. Blinding
122. Single-Blind Experiment
123. Double-Blind Experiment
124. Random Assignment
125. Why Randomize
126. Randomized Block Design
127. Matched Pairs Design
128. Completely Randomized Design
129. Replication

## Prerequisites

This chapter builds on concepts from:

- [Chapter 8: Causation and Study Design](../08-causation-and-study-design/index.md)
- [Chapter 11: Sampling and Bias](../11-sampling-and-bias/index.md)

---

## Introduction: From Observation to Experimentation

Welcome back! In earlier chapters, you learned the difference between observational studies and experiments. You discovered that while observational studies can reveal fascinating associations in data, they can't tell us that one thing *causes* another. That's where experiments come in.

"Alright, here's where things get really exciting," Sylvia says, adjusting her glasses. "Experiments are how we actually prove cause and effect. It's like being a detective, but with data instead of magnifying glasses. Well, okay, sometimes we use magnifying glasses too."

Think about it this way: if you notice that students who eat breakfast tend to get better grades, you might wonder whether eating breakfast *causes* better academic performance. But wait, maybe students who eat breakfast also come from families that emphasize education, or maybe they go to bed earlier, or maybe they're just morning people. These are all **confounding variables** that could explain the relationship without breakfast being the actual cause.

The only way to truly establish that breakfast causes better grades is to run an experiment. And in this chapter, you're going to learn exactly how to do that.

## The Language of Experiments

Before we dive into experimental design, we need to establish some vocabulary. Every field has its own special terms, and experimental design is no exception. Don't worry though; these terms are pretty intuitive once you see them in action.

### Experimental Units and Subjects

An **experimental unit** is the smallest entity to which a treatment is applied. Think of it as the "thing" you're experimenting on. When we're studying people, we typically call experimental units **subjects** or **participants**. But experimental units don't have to be people.

Here are some examples of experimental units:

| Study Focus | Experimental Unit |
|-------------|-------------------|
| Drug effectiveness | Individual patients |
| Fertilizer impact | Plots of land |
| Teaching method | Classroom sections |
| Battery life | Individual batteries |
| Website design | Website visitors |

"I once ran an experiment on acorn storage methods," Sylvia notes. "Each storage container was an experimental unit. Not a single acorn was harmed in the making of that study. Well, maybe one got eaten during a data collection break."

### Treatments, Factors, and Levels

A **treatment** is the specific experimental condition applied to an experimental unit. It's what we're testing. But here's where it gets interesting: treatments are made up of **factors** and **levels**.

A **factor** is an explanatory variable whose effect on the response we want to study. The specific values or categories of a factor are called **levels**. When you combine different levels of different factors, you create treatments.

Let's make this concrete with an example. Suppose you're studying how different study techniques and study durations affect test performance.

- **Factor 1:** Study technique (levels: flashcards, practice problems, reading notes)
- **Factor 2:** Study duration (levels: 30 minutes, 60 minutes)

Each combination of levels creates a different treatment:

| Treatment | Study Technique | Duration |
|-----------|-----------------|----------|
| 1 | Flashcards | 30 min |
| 2 | Flashcards | 60 min |
| 3 | Practice problems | 30 min |
| 4 | Practice problems | 60 min |
| 5 | Reading notes | 30 min |
| 6 | Reading notes | 60 min |

That's 3 levels times 2 levels = 6 treatments total!

#### Diagram: Factors and Levels Tree

<iframe src="../../sims/factors-levels-tree/main.html" width="100%" height="450px" scrolling="no" style="border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

## The Placebo Effect: Why We Need Controls

Here's a fascinating quirk of human psychology: sometimes people get better just because they *believe* they're receiving treatment, even when they're not receiving anything at all. This is called the **placebo effect**.

A **placebo** is an inactive treatment that looks exactly like the real treatment. In drug studies, it might be a sugar pill that looks identical to the medication being tested. In other contexts, it might be a fake procedure or a dummy intervention.

"The placebo effect is wild," Sylvia admits. "Imagine if I told you this acorn was a magic energy acorn and you actually felt more energetic. Your brain is incredibly powerful, for better or worse."

The placebo effect is so powerful that it can produce real, measurable changes in people. Studies have shown that placebo treatments can reduce pain, improve mood, and even affect blood pressure. This is why simply giving people a treatment and watching them improve doesn't prove the treatment works; they might have improved just because they expected to.

### Control Groups: The Foundation of Comparison

This is why experiments need a **control group**. A control group is a group of experimental units that either receives no treatment, a placebo, or the standard existing treatment. The control group provides a baseline for **comparison in experiments**.

Without a control group, you can't tell whether:

- The treatment actually caused the improvement
- The improvement was due to the placebo effect
- The improvement would have happened naturally over time
- Some other factor caused the change

Consider this example: A company claims their new energy drink improves athletic performance because runners who drank it ran faster than before. But wait! Did they run faster because of the drink, or because:

- They had been training and were getting better anyway?
- They were more motivated because they thought the drink would help?
- Weather conditions were better on the second test day?

A proper experiment would randomly assign runners to either receive the energy drink (treatment group) or a similar-looking drink without the active ingredients (control group). Then we could compare the two groups fairly.

#### Diagram: Treatment vs Control Comparison

<iframe src="../../sims/treatment-control-comparison/main.html" width="100%" height="400px" scrolling="no" style="border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

## The Three Principles of Good Experimental Design

Now we arrive at the heart of experimental design. There are three fundamental principles that make experiments valid and trustworthy: **control**, **randomization**, and **replication**. Think of them as the three legs of a stool; remove any one, and your experiment falls over.

### Principle 1: Control

Control means holding constant any extraneous variables that might affect the response. When we control for variables, we eliminate them as possible explanations for any differences we observe between treatment groups.

For example, if you're testing whether a new teaching method improves math scores:

- Give both groups the same amount of instruction time
- Use the same classroom and testing conditions
- Administer tests at the same time of day
- Use the same instructor (or carefully match instructors)

The only thing that should differ between groups is the treatment itself.

### Principle 2: Random Assignment

**Random assignment** means using a chance mechanism to decide which experimental units receive which treatment. This is different from random sampling (which we covered in Chapter 11). Random sampling determines *who* is in your study; random assignment determines *what treatment* each participant receives.

"Don't mix these up!" Sylvia warns, her tail twitching. "Random sampling helps you generalize to a population. Random assignment helps you establish causation. They're both important, but they do different jobs."

Here's a quick comparison:

| Concept | Purpose | Example |
|---------|---------|---------|
| Random Sampling | Select representative participants | Randomly choosing 200 students from all students in the district |
| Random Assignment | Distribute participants to treatment groups | Randomly assigning those 200 students to treatment or control |

### Why Randomize?

So **why randomize**? Random assignment is powerful because it tends to balance out all variables across treatment groups, including ones you haven't even thought of! When you randomly assign, any differences between groups are due to chance rather than some systematic bias.

Consider what could go wrong without random assignment. If you let students choose whether they want the new teaching method or the traditional one:

- More motivated students might choose the new method
- Students who struggle might avoid change
- Students with involved parents might be encouraged toward the "better" option

Any of these factors could create systematic differences between groups that confound your results.

!!! tip "Sylvia's Pro Tip"
    Random assignment doesn't guarantee that groups are identical; it guarantees that any differences are due to chance. With large enough groups, these chance differences become very small. That's why replication (having many subjects) matters too!

### Principle 3: Replication

**Replication** means having enough experimental units in each treatment group to detect real effects and to reduce the impact of individual variation. One data point proves nothing. Even two or three might be coincidence. But when you see the same pattern across dozens or hundreds of experimental units, you can be confident it's real.

Replication reduces the impact of individual variability. Imagine testing a new fertilizer on just one plant. If that plant grows better, was it the fertilizer, or was that particular plant just healthier to begin with? But if you test 50 plants with fertilizer and 50 without, and the fertilized plants consistently grow better, the pattern is much more convincing.

The more experimental units you have, the more likely you are to detect a true treatment effect if one exists. We'll learn more about this concept, called **statistical power**, in later chapters on hypothesis testing.

#### Diagram: Three Principles of Experimental Design

<iframe src="../../sims/three-principles-experiment/main.html" width="100%" height="500px" scrolling="no" style="border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

## Blinding: Protecting Against Bias

Even with control groups and random assignment, experiments can be compromised by a subtle form of bias: the expectations of participants and researchers. This is where **blinding** comes in.

### Single-Blind Experiments

In a **single-blind experiment**, the experimental units (subjects) don't know which treatment they're receiving, but the researchers do know. This prevents subjects from behaving differently based on their expectations.

For example, in a drug trial, patients don't know whether they're taking the real medication or a placebo. They can't unconsciously (or consciously!) behave in ways that might affect the outcome based on knowing which group they're in.

### Double-Blind Experiments

A **double-blind experiment** goes further: neither the subjects nor the researchers who interact with them know which treatment is being administered. This is even better because it prevents researchers from unconsciously treating participants differently or interpreting results based on their expectations.

"Think about it," Sylvia says. "If a researcher knows a patient is getting the real drug, they might be more attentive, more encouraging, or more likely to notice positive changes. Even tiny differences in how researchers act can influence results!"

In a double-blind drug trial:

- Patients don't know if they have the real drug or placebo
- Doctors administering treatments and evaluating patients don't know either
- Only a separate group of researchers who don't interact with patients knows the assignment

Here's a comparison of blinding approaches:

| Type | Who is "blind"? | What it prevents |
|------|-----------------|------------------|
| No blinding | No one | Nothing (most prone to bias) |
| Single-blind | Subjects only | Subject expectation effects |
| Double-blind | Subjects AND researchers | Subject expectations AND researcher bias |

!!! note "When Blinding Isn't Possible"
    Sometimes blinding is impossible due to the nature of the treatment. For example, you can't hide whether someone is exercising or not, or whether a classroom is using laptops or textbooks. In these cases, researchers should acknowledge this limitation and interpret results carefully.

#### Diagram: Blinding Comparison Flowchart

<iframe src="../../sims/blinding-flowchart/main.html" width="100%" height="400px" scrolling="no" style="border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

## Types of Experimental Designs

Now that you understand the principles, let's explore different ways to structure experiments. The design you choose depends on your research question, available resources, and the nature of your experimental units.

### Completely Randomized Design

A **completely randomized design** is the simplest and most straightforward experimental structure. You take all your experimental units and randomly assign each one to a treatment group. That's it!

For example, to test three different fertilizers on plant growth:

1. Get 60 identical seedlings
2. Use a random number generator to assign 20 plants to Fertilizer A, 20 to Fertilizer B, and 20 to Fertilizer C
3. Apply treatments identically
4. Measure growth after a set period
5. Compare results

The completely randomized design works well when your experimental units are relatively homogeneous (similar to each other). But what if there's substantial variation among your units?

### Randomized Block Design

A **randomized block design** groups experimental units into blocks based on a characteristic that might affect the response, then randomly assigns treatments within each block.

"Here's an analogy," Sylvia offers. "Imagine you're testing acorn storage methods, but your acorns come from different tree species. Oak acorns and chestnut acorns might respond differently to storage conditions. So you'd create blocks by species, then randomly assign storage methods within each block."

Why block? Because it allows you to control for a known source of variability. By ensuring each treatment appears equally in each block, you can separate the effect of the blocking variable from the treatment effect.

**Example:** Testing study techniques (flashcards vs. practice problems) on test scores, blocking by prior math ability:

| Block (Prior Ability) | Treatment 1 (Flashcards) | Treatment 2 (Practice Problems) |
|----------------------|--------------------------|--------------------------------|
| High ability | 10 students randomly assigned | 10 students randomly assigned |
| Medium ability | 10 students randomly assigned | 10 students randomly assigned |
| Low ability | 10 students randomly assigned | 10 students randomly assigned |

Now any differences in outcomes can't be attributed to prior ability, because each treatment group has equal representation from all ability levels.

### Matched Pairs Design

A **matched pairs design** is a special type of randomized block design where each block contains exactly two experimental units that are matched based on relevant characteristics. Then one unit in each pair is randomly assigned to each treatment.

Matched pairs are especially useful when:

- You have only two treatments to compare
- There's substantial individual variation
- You can find meaningful ways to match units

**Common matched pairs approaches:**

1. **Same person, different times:** Each subject experiences both treatments (with time gap and random order)
2. **Matched individuals:** Pair similar individuals and assign one to each treatment
3. **Twins or siblings:** Natural matching based on genetics
4. **Before/after with crossover:** Subjects switch treatments partway through

The most common matched pairs design uses each subject as their own control. If you're testing whether caffeine affects reaction time, you might:

1. Measure each person's reaction time without caffeine
2. Measure the same person's reaction time with caffeine
3. Compare the difference for each person

This eliminates individual differences entirely because each person serves as their own baseline.

!!! warning "Order Effects in Matched Pairs"
    When the same subject receives both treatments, you must worry about order effects. Maybe people perform better the second time regardless of treatment because they've had practice. Always randomize the order of treatments!

#### Diagram: Experimental Design Types Comparison

<iframe src="../../sims/experimental-designs-compare/main.html" width="100%" height="550px" scrolling="no" style="border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

## Putting It All Together: Designing an Experiment

Let's walk through how to design a complete experiment from scratch. This will help you synthesize all the concepts we've covered.

**Research Question:** Does listening to classical music while studying improve test performance compared to silence?

### Step 1: Identify the Components

- **Experimental units:** Students (subjects)
- **Factor:** Study environment (music vs. silence)
- **Levels:** Classical music, No music (control)
- **Treatments:** Studying with classical music, Studying in silence
- **Response variable:** Test score

### Step 2: Choose a Design

We need to decide between:

- **Completely randomized:** If students are fairly similar
- **Randomized block:** If there's a known variable (like prior GPA) that affects test performance
- **Matched pairs:** If we can have each student study both ways (with time gap) or if we can pair students by ability

Let's say we choose a **randomized block design**, blocking by prior academic performance (high, medium, low GPA).

### Step 3: Apply the Three Principles

**Control:**

- Same study material for all participants
- Same amount of study time (30 minutes)
- Same testing environment and test
- Same time of day for all sessions
- If using music, same playlist and volume

**Randomization:**

- Within each GPA block, randomly assign half to music and half to silence
- Use a random number generator, not personal choice

**Replication:**

- Include at least 20 students per treatment per block
- Total: 120 students minimum (20 x 2 treatments x 3 blocks)

### Step 4: Consider Blinding

- Students can't be blind to whether music is playing (impossible to hide)
- BUT: we can blind the person grading the tests
- We can also avoid telling students the specific hypothesis

### Step 5: Collect Data and Analyze

After running the experiment, compare test scores between groups, accounting for the blocking variable.

Here's a summary of our experimental design:

| Component | Decision |
|-----------|----------|
| Design type | Randomized Block |
| Blocking variable | Prior GPA (High, Medium, Low) |
| Treatments | Classical music, Silence |
| Sample size | 120 students (20 per cell) |
| Blinding | Single-blind (grader doesn't know group) |
| Controls | Study time, material, testing conditions |
| Random assignment | Random within each block |

#### Diagram: Complete Experiment Planning Flowchart

<iframe src="../../sims/experiment-planning-flowchart/main.html" width="100%" height="500px" scrolling="no" style="border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

## Common Pitfalls in Experimental Design

Even well-intentioned researchers can make mistakes. Here are some common pitfalls to avoid:

### Pitfall 1: Confusing Random Sampling and Random Assignment

Remember: random sampling helps you **generalize** to a population. Random assignment helps you establish **causation**. Many studies have one but not the other.

| Study Characteristic | Generalization? | Causation? |
|---------------------|-----------------|------------|
| Random sample + Random assignment | Yes | Yes |
| Random sample + No random assignment | Yes | No |
| Non-random sample + Random assignment | Limited | Yes |
| Neither random | Very limited | No |

### Pitfall 2: Inadequate Control Group

Sometimes researchers use a "no treatment" control when a placebo control would be more appropriate. If subjects know they're getting nothing, the comparison isn't fair due to placebo effects.

### Pitfall 3: Insufficient Sample Size

Running an experiment with too few subjects means you might miss real effects. It's like trying to hear a whisper in a noisy room. You need enough observations to detect the signal above the noise.

### Pitfall 4: Ignoring Confounding Variables

Even with random assignment, things can go wrong if the experiment isn't run carefully. If one treatment group is always tested in the morning and another in the afternoon, time of day becomes confounded with treatment.

### Pitfall 5: Demand Characteristics

When subjects figure out what the experimenter wants, they might unconsciously (or consciously) behave accordingly. Good blinding and careful experimental protocols help prevent this.

"My biggest mistake?" Sylvia reflects. "Once I didn't randomize which trees I collected acorns from first. Turns out, I was always more thorough in the morning when I had more energy. My data on acorn distribution was totally biased! Lesson learned."

## Reading Research Critically

One of the most valuable skills you'll gain from this chapter is the ability to critically evaluate research claims. When you read about a study in the news or encounter research in your future studies, ask yourself:

**Key Questions for Evaluating Experiments:**

1. Was there a control group? What kind?
2. Were subjects randomly assigned to treatments?
3. Was blinding used? Single or double?
4. How large were the sample sizes?
5. What variables were controlled?
6. What potential confounds might remain?
7. Was the study replicated?

Here's a quick checklist format:

- [ ] Control group present and appropriate
- [ ] Random assignment to treatments
- [ ] Adequate blinding (if possible)
- [ ] Sufficient sample size
- [ ] Major confounds addressed
- [ ] Key variables controlled
- [ ] Results replicated or replicable

## AP Exam Focus: Describing Experimental Designs

On the AP Statistics exam, you'll often need to describe how to design an experiment. Here's a template that will serve you well:

!!! tip "Sylvia's Four-Step Experiment Description"
    1. **Identify experimental units and treatments** - State what you're experimenting on and what treatments you're comparing
    2. **Describe random assignment** - Explain HOW you'll randomly assign units to treatments (be specific about the mechanism)
    3. **Explain what's being compared** - State the response variable and how you'll compare groups
    4. **Mention controls and blinding** - Describe what variables you're holding constant and whether blinding is used

**Example Response:**

"To test whether caffeine improves test scores, randomly assign the 40 student volunteers to two groups of 20 using a random number generator. Group 1 receives a caffeinated beverage; Group 2 receives an identical-looking decaffeinated beverage (placebo). Neither students nor the proctor administering the test know who received caffeine (double-blind). Control for study time, test difficulty, time of day, and testing environment by keeping these constant for all participants. After students study for 30 minutes and take the test, compare the mean test scores between the two groups."

#### Diagram: Random Assignment Simulator

<iframe src="../../sims/random-assignment-simulator/main.html" width="100%" height="450px" scrolling="no" style="border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

## Summary: Key Takeaways

"Time to squirrel away this knowledge!" Sylvia says with a satisfied swish of her tail.

Let's recap the essential concepts from this chapter:

**Experimental Vocabulary:**

- **Experimental units** are the entities receiving treatment (subjects when human)
- **Treatments** are the experimental conditions we apply
- **Factors** are the explanatory variables; **levels** are their specific values
- **Placebo** is an inactive treatment; the **placebo effect** is improvement from belief alone
- **Control groups** provide a baseline for comparison

**Three Principles of Experimental Design:**

- **Control:** Hold extraneous variables constant
- **Randomization:** Use chance to assign treatments
- **Replication:** Use enough experimental units

**Blinding:**

- **Single-blind:** Subjects don't know their treatment
- **Double-blind:** Neither subjects nor researchers know

**Experimental Designs:**

- **Completely randomized:** Randomly assign all units to treatments
- **Randomized block:** Group by a variable, randomize within blocks
- **Matched pairs:** Pair similar units, randomize within pairs

"You've got this," Sylvia encourages. "Every time you see a claim that 'X causes Y,' you now have the tools to ask the right questions. Does the study have a control group? Was there random assignment? That's a superpower right there!"

---

??? question "Practice Question: Identify the Design"
    A researcher wants to test whether a new algebra tutoring method improves test scores. She recruits 60 students and pairs them by their current math grades, creating 30 pairs. Within each pair, she flips a coin to determine which student gets the new method and which gets traditional tutoring. After 8 weeks, she compares test scores.

    What type of experimental design is this?

    **Answer:** This is a **matched pairs design**. Students are paired based on a relevant characteristic (current math grade), and random assignment occurs within each pair. This design controls for prior math ability.

??? question "Practice Question: Design Critique"
    A coffee company claims their new blend increases energy levels because 50 volunteers who drank their coffee reported feeling more energetic than before drinking it.

    What are at least two problems with this study design?

    **Answer:**
    1. **No control group:** Without a control group (or placebo group drinking decaf that looks identical), we can't distinguish between the coffee's effect and the placebo effect.
    2. **No random assignment:** This appears to be an observational before/after study, not a true experiment.
    3. **Self-reported outcomes:** "Feeling energetic" is subjective and susceptible to expectation bias.
    4. **Volunteers only:** Self-selected participants may differ from the general population.

---

## Looking Ahead

In the next chapter, we'll dive into the world of random variables and probability distributions. You'll learn how to mathematically model random processes, which is essential for understanding the inferential statistics that come later in the course.

"The beautiful thing about experiments?" Sylvia muses. "They're how we move from 'I wonder if...' to 'Now I know.' And that's pretty amazing, if you ask me. See you in the next chapter!"
