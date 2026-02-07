---
title: Causation and Study Design
description: Learn the critical distinction between correlation and causation, understand lurking and confounding variables, explore Simpson's Paradox, and compare observational studies with experiments
generated_by: claude skill chapter-content-generator
date: 2026-02-06 22:04:21
version: 0.04
---

# Causation and Study Design

## Summary

This chapter addresses the critical distinction between correlation and causation. Students will learn about lurking and confounding variables, Simpson's Paradox, and the differences between observational studies and experiments. Understanding these concepts is essential for properly interpreting statistical findings and designing valid studies.

## Concepts Covered

This chapter covers the following 9 concepts from the learning graph:

106. Lurking Variable
74. Simpson's Paradox
107. Causation
108. Correlation vs Causation
109. Observational Study
110. Experiment
111. Comparing Studies
130. Confounding Variable
131. Identifying Confounding

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Displaying Categorical Data](../02-displaying-categorical-data/index.md)
- [Chapter 6: Scatterplots and Association](../06-scatterplots-and-association/index.md)

---

## The Causation Question

Welcome back, data detectives! In the last few chapters, you've become skilled at spotting relationships between variables using scatterplots and correlation. But here's the thing: just because two variables move together doesn't mean one is causing the other. And that distinction? It's absolutely crucial.

Let me tell you about my cousin Acorn Archie. He noticed that on days when he collected more acorns, he also spotted more birds in the trees. "Birds must love watching me work!" he declared proudly. But Sylvia, being the data-savvy squirrel I am, pointed out the obvious: sunny days bring out both the acorns and the birds. The weather was hiding behind the scenes, making both things happen. Archie wasn't attracting birds. He was just observing them on nice days.

This chapter is all about avoiding Archie's mistake. We'll explore why correlation doesn't equal causation, learn about sneaky variables that hide in our data, and discover how study design determines what conclusions we can actually draw. My tail's tingling already because we're about to crack one of the biggest nuts in all of statistics!

## Causation: What Does It Really Mean?

**Causation** means that changes in one variable directly produce changes in another variable. When we say X causes Y, we mean that if you manipulate X (and nothing else), Y will change as a result. It's a strong claim that requires strong evidence.

Think about it this way:

- Flipping a light switch **causes** the light to turn on
- Dropping a ball **causes** it to fall to the ground
- Taking a medication **causes** your symptoms to improve (hopefully!)

In each case, there's a direct mechanism connecting the action to the outcome. The switch completes an electrical circuit. Gravity pulls the ball down. The medication's active ingredients interact with your body's chemistry.

Establishing causation in real-world situations is surprisingly difficult. Here's why: in the messy world outside laboratory conditions, many things happen simultaneously. When you observe that two variables are related, you need to rule out every other possible explanation before you can claim causation.

| Evidence Level | What It Tells Us | Example |
|----------------|------------------|---------|
| Correlation | Two variables are associated | Ice cream sales and drowning deaths both increase in summer |
| Temporal precedence | One thing happens before another | Exercise happens before improved mood |
| Mechanism | There's a plausible explanation for how X affects Y | Exercise releases endorphins that improve mood |
| Causation | X actually produces changes in Y | Controlled experiment shows exercise causes mood improvement |

## Correlation vs. Causation: The Classic Trap

The phrase **"correlation does not imply causation"** might be the most important sentence in statistics. Correlation tells us that two variables tend to move together. When one goes up, the other goes up (positive correlation) or down (negative correlation). But this co-movement could happen for several reasons:

1. **X causes Y**: The relationship is exactly what it seems
2. **Y causes X**: The causation runs backward from what you assumed
3. **Z causes both X and Y**: A third variable is the real culprit
4. **Coincidence**: Pure chance created an apparent pattern

Let's look at some famously silly correlations to drive this home:

- Nicholas Cage films and swimming pool drownings are correlated. (Do Cage's movies inspire reckless swimming? Obviously not!)
- Per capita cheese consumption correlates with death by bedsheet tangling. (Is cheese making people thrash in their sleep? Come on.)
- The number of pirates in the world correlates negatively with global temperature. (Are pirates cooling the planet? Unlikely, matey.)

These examples are absurd, which makes the lesson obvious. But in real research, the relationships are often more plausible-sounding, making the trap more dangerous.

!!! tip "Acorn for your thoughts?"
    Sylvia says: "Here's my favorite way to spot the correlation-causation trap: ask yourself, 'If I magically changed just one variable, would the other one have to change?' If you're not sure, you might just have correlation on your paws."

#### Diagram: Correlation vs Causation Scenarios

<iframe src="../../sims/correlation-causation-scenarios/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Correlation vs Causation Scenarios Interactive</summary>
Type: MicroSim

Learning objective: Apply (L3) - Students will classify relationship scenarios as correlation only, possible causation, or third variable explanation.

Visual elements:
- Central area showing two variables connected by a line
- Three possible relationship patterns displayed: X causes Y, Y causes X, Z causes both
- Scenario cards that slide in from the side
- Color-coded feedback for correct/incorrect classifications

Interactive controls:
- "Next Scenario" button to load a new real-world example
- Three buttons to classify the relationship: "X causes Y", "Y causes X", "Third Variable"
- Reveal button to show the correct answer with explanation
- Score tracker for practice mode
- Reset button to start over

Behavior:
- Each scenario presents two correlated variables (e.g., "Coffee consumption" and "Heart disease")
- Student selects which relationship type best explains the correlation
- Feedback explains why the answer is correct or what alternative explanation exists
- Visual diagram updates to show the selected causal pathway
- At least 10 different scenarios covering common misconceptions

Canvas size: 700x450px, responsive design
Implementation: p5.js with canvas-based controls
</details>

## Lurking Variables: The Hidden Troublemakers

A **lurking variable** is a variable that is not included in your analysis but affects the relationship you're studying. It lurks in the background, influencing your results without you even measuring it. Lurking variables are one of the main reasons why correlation can masquerade as causation.

Here's a classic example: Studies show that people who own more books tend to have higher incomes. Does buying books make you richer? Probably not. A lurking variable—education level—likely explains both. More educated people tend to both own more books AND earn higher incomes. Education is lurking behind the scenes, creating an apparent relationship between books and income.

Lurking variables are sneaky because:

- You might not think to measure them
- They might be difficult or impossible to measure
- Multiple lurking variables might be at play simultaneously

Common lurking variables to watch for:

| Context | Potential Lurking Variables |
|---------|----------------------------|
| Health studies | Age, socioeconomic status, diet, exercise, genetics |
| Education research | Parent education, school resources, prior achievement |
| Economics | Geographic region, time period, policy changes |
| Technology | User demographics, device type, time of day |

!!! note "Lurking Variable Alert"
    Whenever you see a surprising or convenient correlation, your first question should be: "What lurking variable might explain this relationship?" The more you practice asking this question, the better statistical thinker you'll become.

## Confounding Variables: When Variables Get Tangled

A **confounding variable** is a specific type of lurking variable that's associated with BOTH the explanatory variable and the response variable. This creates a tangled web where you can't tell which variable is actually responsible for the effect you observe.

Here's the formal definition: A confounding variable is related to both the explanatory variable and the response variable, making it impossible to determine whether the explanatory variable, the confounding variable, or both are affecting the response.

Let's walk through an example. Suppose you're studying whether drinking coffee is associated with heart disease. You find that coffee drinkers have higher rates of heart disease. Should coffee lovers be worried?

Not so fast! Consider smoking as a potential confounding variable:

- Smokers are more likely to drink coffee (smoking and coffee are associated)
- Smoking causes heart disease (smoking affects the response)
- If we don't account for smoking, we might falsely blame coffee

In this case, the effect of coffee and the effect of smoking are **confounded**—tangled up together in a way that makes them impossible to separate without careful study design.

#### Diagram: Confounding Variable Visualizer

<iframe src="../../sims/confounding-variable-diagram/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Confounding Variable Visualizer</summary>
Type: MicroSim

Learning objective: Analyze (L4) - Students will analyze how confounding variables create alternative explanations for observed associations.

Visual elements:
- Three nodes representing explanatory variable (X), response variable (Y), and confounding variable (C)
- Arrows showing relationships between variables
- Toggle to show/hide the confounding pathway
- Color coding: observed relationship in blue, confounded pathway in red

Interactive controls:
- Dropdown to select from preset scenarios (coffee/heart disease, ice cream/drowning, etc.)
- Toggle to "reveal confounding" that shows the hidden variable
- Sliders to adjust strength of each relationship (X-Y, C-X, C-Y)
- Animation showing how removing confounding changes the apparent relationship
- Reset button to restore defaults

Behavior:
- Initially shows only X and Y with a strong apparent relationship
- Revealing confounding adds node C and shows arrows to both X and Y
- Adjusting C's relationships visually shows how much of X-Y is explained by C
- Text updates explaining the current confounding situation
- Simulation mode: generate fake data showing confounded vs true relationship

Canvas size: 650x400px, responsive design
Implementation: p5.js with canvas-based controls
</details>

## Identifying Confounding: A Systematic Approach

**Identifying confounding** requires thinking carefully about what variables might be related to both your explanatory and response variables. Here's a systematic approach:

**Step 1: List potential confounders**

For any relationship you're studying, brainstorm variables that might be associated with both the explanatory and response variables. Consider:

- Demographics (age, gender, income, education)
- Behaviors (diet, exercise, sleep)
- Environmental factors (location, season, time period)
- Pre-existing conditions or characteristics

**Step 2: Check the two requirements**

For each potential confounder, ask:

- Is it associated with the explanatory variable?
- Is it associated with the response variable?

If the answer is yes to BOTH questions, you've identified a potential confounder.

**Step 3: Consider the direction**

A true confounder can't be on the causal pathway between your explanatory and response variables. If X causes C and C causes Y, then C is a **mediator**, not a confounder. Confounders are causes of both X and Y, not effects of X.

Let's practice with an example. A study finds that students who eat breakfast have higher test scores. Is this causation?

Potential confounders:

- **Socioeconomic status**: Wealthier families can afford breakfast AND provide other educational advantages. SES is associated with breakfast eating. SES is associated with test scores. Possible confounder!

- **Sleep habits**: Students who sleep well are more likely to wake up with time for breakfast AND to perform well on tests. Sleep is associated with breakfast eating. Sleep is associated with test scores. Possible confounder!

- **Parental involvement**: Parents who ensure their kids eat breakfast might also ensure homework gets done. Parent involvement is associated with breakfast eating. Parent involvement is associated with test scores. Possible confounder!

See how many alternative explanations exist? Without accounting for confounders, we can't conclude that breakfast itself causes better performance.

## Simpson's Paradox: When Data Plays Tricks

Here's where things get really interesting. **Simpson's Paradox** occurs when a trend that appears in several groups of data reverses or disappears when the groups are combined. It's one of the most counterintuitive phenomena in statistics.

Let me illustrate with a famous example. Imagine two hospitals treating patients for a serious condition:

**Hospital A:**
- Treated 900 patients in good condition: 870 survived (97%)
- Treated 100 patients in poor condition: 30 survived (30%)
- Overall: 900 of 1000 survived (90%)

**Hospital B:**
- Treated 100 patients in good condition: 95 survived (95%)
- Treated 900 patients in poor condition: 405 survived (45%)
- Overall: 500 of 1000 survived (50%)

Which hospital is better? If you look at the combined data, Hospital A looks amazing (90% vs 50% survival). But look at the subgroups:

- For good-condition patients: Hospital B is better (95% vs 97%)
- Wait, that should say Hospital A is better. Let me recalculate...

Actually, let's use clearer numbers:

**Hospital A:**
- Easy cases: 90 of 100 survived (90%)
- Hard cases: 10 of 100 survived (10%)
- Overall: 100 of 200 survived (50%)

**Hospital B:**
- Easy cases: 95 of 100 survived (95%)
- Hard cases: 15 of 100 survived (15%)
- Overall: 110 of 200 survived (55%)

Wait, now B looks better overall too. Simpson's Paradox needs the group sizes to be unequal. Let me give you the classic structure:

**Hospital A:**
- Easy cases: 900 patients, 870 survived (96.7%)
- Hard cases: 100 patients, 10 survived (10%)
- Overall: 880 of 1000 (88%)

**Hospital B:**
- Easy cases: 100 patients, 99 survived (99%)
- Hard cases: 900 patients, 180 survived (20%)
- Overall: 279 of 1000 (27.9%)

Now look: Hospital A appears better overall (88% vs 28%), but Hospital B actually has HIGHER survival rates in BOTH subgroups (99% vs 96.7% for easy cases, 20% vs 10% for hard cases)!

The paradox occurs because Hospital B takes on more hard cases. When we aggregate, the hard cases drag down Hospital B's overall rate, even though it performs better in each category.

The lurking variable here is case severity, which affects both the hospital choice (hard cases go to B) and the outcome (hard cases die more often). It's Simpson's Paradox in action!

#### Diagram: Simpson's Paradox Explorer

<iframe src="../../sims/simpsons-paradox-explorer/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Simpson's Paradox Explorer</summary>
Type: MicroSim

Learning objective: Evaluate (L5) - Students will evaluate aggregated vs. disaggregated data to identify when Simpson's Paradox occurs and determine which analysis is more appropriate.

Visual elements:
- Bar charts showing success rates for two groups
- Toggle between "Combined" view and "Separated by subgroup" view
- Animated transition between views to show the reversal
- Clear labels showing percentages for each bar
- Indicator highlighting when paradox is present

Interactive controls:
- Preset scenario selector (hospitals, universities, treatments, etc.)
- Sliders to adjust sample sizes in each subgroup
- Sliders to adjust success rates in each subgroup
- "Reveal Paradox" button that switches from combined to separated view
- Text explanation that updates based on current data
- Reset to classic example button

Behavior:
- Default shows a classic Simpson's Paradox example
- Adjusting sliders shows when paradox appears/disappears
- Color coding: green for higher rate, red for lower rate
- When paradox is active, show warning indicator
- Calculate and display whether the combined conclusion contradicts subgroup conclusions

Canvas size: 700x500px, responsive design
Implementation: p5.js with canvas-based controls
</details>

!!! tip "Let's crack this nut!"
    Sylvia says: "Simpson's Paradox teaches us to always ask: 'What happens when I look at subgroups?' Aggregated data can hide important patterns. And hidden patterns? That's when a statistician's tail really starts to poof up!"

## Observational Studies: Watching Without Interfering

Now that we understand the challenges of establishing causation, let's talk about how data is collected. An **observational study** is a study in which researchers observe and measure variables but do not attempt to influence the responses. They simply watch what happens naturally.

In an observational study:

- Researchers collect data on existing groups
- No treatments are assigned
- People or things are measured as they naturally exist
- The goal is often to discover associations

Examples of observational studies:

- Surveying students about their study habits and grades
- Tracking health outcomes for people who choose to exercise vs. those who don't
- Comparing accident rates for people who use hands-free devices vs. handheld phones
- Measuring pollution levels in cities with different traffic patterns

Observational studies are valuable because:

- They're often the only ethical option (you can't force people to smoke to study cancer)
- They can study rare conditions or behaviors
- They can examine long-term outcomes
- They're often less expensive than experiments

However, observational studies have a fundamental limitation: **they cannot establish causation**. Why not? Because the groups being compared might differ in ways other than the variable of interest. Those differences (confounding variables) might be the real cause of any observed effect.

Consider studying whether drinking wine is associated with heart health. Wine drinkers might also:

- Have higher incomes
- Eat Mediterranean diets
- Have better access to healthcare
- Exercise more regularly

Any of these factors, not the wine itself, could explain better heart health.

## Experiments: Taking Control

An **experiment** deliberately imposes a treatment on individuals to observe their responses. The defining feature of an experiment is that the researcher decides who gets what treatment.

Key features of experiments:

| Feature | What It Means |
|---------|--------------|
| Treatment | Something done to subjects (medication, teaching method, etc.) |
| Control group | Subjects who don't receive the treatment (or receive a placebo) |
| Random assignment | Subjects are randomly placed into treatment or control groups |
| Comparison | Response is measured and compared between groups |

The power of experiments comes from **random assignment**. When subjects are randomly assigned to groups, all those lurking and confounding variables get distributed approximately equally across groups. Smart people end up in both groups. Healthy people end up in both groups. Morning people, night owls, coffee drinkers, vegetarians—they all get randomly mixed.

After random assignment, the only systematic difference between groups is the treatment itself. So if we observe a difference in the response, we can attribute it to the treatment. That's causation!

Here's an example of a well-designed experiment:

**Research question**: Does listening to classical music improve test performance?

**Experimental design**:
1. Recruit 200 students
2. Randomly assign 100 to listen to Mozart for 10 minutes before a test
3. Assign the other 100 to sit in silence for 10 minutes
4. All students take the same test under identical conditions
5. Compare average scores between groups

Because of random assignment, any difference in test scores can be attributed to the music (assuming the experiment was properly controlled).

#### Diagram: Study Type Comparison Tool

<iframe src="../../sims/study-type-comparison/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Study Type Comparison Tool</summary>
Type: MicroSim

Learning objective: Analyze (L4) - Students will analyze study descriptions to classify them as observational studies or experiments and evaluate what conclusions can be drawn.

Visual elements:
- Side-by-side comparison of observational study and experiment
- Animated flowchart showing data collection process for each type
- Icons representing subjects, treatments, and measurements
- "Conclusion strength meter" showing what each study type can claim

Interactive controls:
- Study scenario input or selection from preset examples
- Classification buttons: "Observational" or "Experiment"
- Checklist for identifying key features (random assignment, treatment, control)
- Feedback area showing correct classification and explanation
- Toggle to see same research question as both study types

Behavior:
- Present study descriptions one at a time
- Student identifies whether it's observational or experimental
- Feedback explains key features that determine classification
- Show how conclusions differ based on study type
- Side-by-side simulation showing how same question could be studied both ways

Canvas size: 700x450px, responsive design
Implementation: p5.js with canvas-based controls
</details>

## Comparing Studies: Strengths and Limitations

Let's directly **compare observational studies and experiments** to understand when each is appropriate.

| Aspect | Observational Study | Experiment |
|--------|--------------------| -----------|
| **Who decides treatment** | Subjects self-select | Researcher assigns randomly |
| **Confounding** | Major concern | Controlled by randomization |
| **Causation claims** | Cannot establish causation | Can establish causation |
| **Ethics** | Can study harmful exposures | Cannot expose subjects to harm |
| **Generalizability** | Often more natural settings | May be artificial |
| **Cost** | Often less expensive | Can be very costly |
| **Time** | Can study long-term outcomes | Often shorter duration |

When should you use each?

**Use observational studies when:**

- Randomly assigning treatments would be unethical (smoking, pollution exposure)
- You want to study naturally occurring phenomena
- Long-term follow-up is needed
- Resources for experiments are unavailable
- You're exploring relationships before designing an experiment

**Use experiments when:**

- You need to establish causation
- Random assignment is ethically possible
- You can control the environment
- The treatment is well-defined
- The outcome can be measured in a reasonable timeframe

!!! note "The Ethics of Experimentation"
    Even if an experiment would give us cleaner data, we can't run it if it would be unethical. We can't randomly assign people to smoke to study lung cancer. We can't randomly assign children to be neglected to study child development. When experimentation is impossible, well-designed observational studies become our best option—and we must interpret their results with appropriate caution.

## Randomization: The Great Equalizer

The secret sauce that makes experiments so powerful is **random assignment**. When we randomly assign subjects to treatment groups, we're letting chance decide who gets what. This might seem arbitrary, but it has a profound effect: it tends to equalize all variables—both the ones we know about and the ones we don't—across groups.

Here's why this matters. Imagine you're testing a new tutoring program on 100 students. Without random assignment, you might:

- Let students choose (motivated students might choose tutoring, skewing results)
- Assign the first 50 who sign up to tutoring (early signers might be more eager)
- Put struggling students in tutoring (they'd improve less than average anyway)

Any of these approaches creates a **selection bias** where the groups differ before the treatment even starts.

With random assignment:

- Each student has an equal chance of being in either group
- Motivated and unmotivated students end up in both groups
- High and low achievers end up in both groups
- All lurking variables get balanced out, on average

The result? Any difference we observe between groups at the end can be attributed to the treatment, not to pre-existing differences.

Of course, random assignment doesn't guarantee perfectly balanced groups. By chance, one group might end up slightly smarter or more motivated. But with large enough samples, these random imbalances become negligible. And even with small samples, random differences are equally likely to favor either group—they don't systematically bias our results in one direction.

#### Diagram: Randomization Balance Simulator

<iframe src="../../sims/randomization-balance-sim/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Randomization Balance Simulator</summary>
Type: MicroSim

Learning objective: Apply (L3) - Students will apply random assignment to groups and observe how it balances known and unknown variables across treatment and control groups.

Visual elements:
- Population of subjects with visible characteristics (icons with varying heights, colors)
- Hidden characteristic indicator (shown after randomization)
- Two boxes for Treatment and Control groups
- Statistics panel showing balance of characteristics in each group

Interactive controls:
- "Randomize" button to randomly assign subjects to groups
- Sample size slider (20, 50, 100, 200 subjects)
- Multiple visible characteristics toggles (age, gender, prior experience)
- "Reveal hidden variable" toggle
- Run multiple randomizations to see distribution of imbalances
- Reset button

Behavior:
- Initial state shows mixed population with visible characteristics
- Clicking randomize animates subjects moving to treatment/control
- Statistics update showing percentage of each characteristic in each group
- Multiple randomizations show that balance improves with sample size
- Hidden variable demonstration shows randomization balances even unknown factors

Canvas size: 700x450px, responsive design
Implementation: p5.js with canvas-based controls
</details>

## Putting It All Together: Critical Thinking About Research

Now you have the tools to critically evaluate statistical claims. Let's practice with a systematic approach.

**When you encounter a claim that X causes Y, ask:**

1. **How was the data collected?**
   - Observational study? Be skeptical of causal claims.
   - Experiment with random assignment? Causation is possible.

2. **What are potential confounding variables?**
   - What else might explain this relationship?
   - Were these variables measured and controlled for?

3. **Is there a plausible mechanism?**
   - Can you explain HOW X might cause Y?
   - Does the mechanism make scientific sense?

4. **Does the evidence support the strength of the claim?**
   - Correlation only? Say "is associated with."
   - Causation established? Say "causes."

5. **Would looking at subgroups change the conclusion?**
   - Could Simpson's Paradox be at play?
   - Are important groups being combined?

Here's an example of critical analysis:

**Claim**: "Studies show that people who eat organic food live longer."

**Analysis**:

- This is likely an observational study (researchers didn't randomly assign people to eat organic)
- Confounders: People who buy organic food tend to be wealthier, more educated, more health-conscious, and may exercise more and smoke less
- Without random assignment, we can't separate the effect of organic food from these confounders
- Better claim: "Eating organic food is associated with longer life, though this may reflect other lifestyle factors common among organic food consumers."

Time to squirrel away this knowledge! Being a critical consumer of statistical claims is one of the most valuable skills you'll develop.

## Real-World Applications

Let's look at how these concepts apply in important real-world contexts.

**Medical Research**

The gold standard for testing medical treatments is the **randomized controlled trial (RCT)**. Patients are randomly assigned to receive either the new treatment or a placebo (or standard care). This allows researchers to determine if the treatment actually works.

The placebo control is important because of the **placebo effect**—people often feel better just from believing they're receiving treatment. By comparing to a placebo, researchers isolate the drug's true effect from the psychological effect of taking a pill.

**Social Science**

Many social science questions can't be studied experimentally for ethical reasons. Researchers use sophisticated statistical techniques to try to control for confounders in observational data, but these methods have limitations. When you read that "poverty causes crime" or "video games cause violence," be skeptical and ask about study design.

**Policy Decisions**

Policymakers often face decisions where experiments would be ideal but aren't feasible. Does raising the minimum wage reduce employment? Does stricter gun control reduce violence? These questions involve comparing states or countries with different policies—observational comparisons where many variables differ between groups.

Some clever approaches exist:

- **Natural experiments**: When a policy change or event creates something like random assignment
- **Regression discontinuity**: Comparing people just above and below a threshold
- **Difference-in-differences**: Comparing changes before and after a policy in places with and without the policy

These methods try to approximate the power of experiments using observational data, but they require careful assumptions.

## Common Mistakes to Avoid

Before we wrap up, let's tackle some common pitfalls:

**Mistake 1: Assuming correlation implies causation**
Just because two variables are related doesn't mean one causes the other. Always consider alternative explanations.

**Mistake 2: Ignoring confounding variables**
Before accepting a causal claim, identify what other variables might explain the relationship. Were they measured and controlled?

**Mistake 3: Thinking experiments are always better**
Experiments establish causation, but observational studies are sometimes more ethical, practical, and generalizable. Each has its place.

**Mistake 4: Forgetting about Simpson's Paradox**
Combined data can tell a different story than subgroup data. When possible, look at both levels of analysis.

**Mistake 5: Assuming random assignment eliminates all problems**
Random assignment balances confounders on average, but experiments can still have other problems (people drop out, the setting is artificial, etc.).

**Mistake 6: Confusing statistical association with practical importance**
Even a causal relationship might be tiny in effect size. "Causes" doesn't mean "is a major factor."

## Key Takeaways

Let's squirrel away the big ideas from this chapter:

1. **Causation** means that changes in one variable directly produce changes in another. It's a strong claim requiring strong evidence.

2. **Correlation does not imply causation**. Associated variables might both be caused by a third variable, or the apparent relationship might be coincidental.

3. **Lurking variables** affect the relationship being studied but aren't measured. They can create misleading associations.

4. **Confounding variables** are associated with both the explanatory and response variables, making it impossible to separate their effects from the treatment effect.

5. **Simpson's Paradox** occurs when trends in subgroups reverse when data is combined. Always consider whether aggregation might hide important patterns.

6. **Observational studies** measure variables without imposing treatments. They can find associations but cannot establish causation.

7. **Experiments** randomly assign subjects to treatments. Random assignment balances confounders, allowing causal conclusions.

8. **Random assignment** is the key that makes experiments powerful. By letting chance decide who gets what, it equalizes groups on all variables.

9. **Critical evaluation** of research requires asking about study design, potential confounders, and whether conclusions match the evidence.

---

## Practice Problems

??? question "Problem 1: Identifying Confounders"
    A study finds that children who eat dinner with their families have higher grades than children who don't. A researcher claims that family dinners cause better academic performance.

    a) What type of study is this (observational or experiment)?
    b) Identify at least two potential confounding variables.
    c) Explain how one of these confounders could create the observed association without family dinners actually causing better grades.

    **Answers:**
    a) This is an observational study—researchers observed existing behavior, they didn't randomly assign families to eat together or apart.

    b) Potential confounders include:
    - Parental involvement (parents who prioritize family dinners might also help with homework)
    - Socioeconomic status (wealthier families might have more time for dinners and resources for education)
    - Family stability (stable families might have more regular dinners and less stress affecting grades)
    - Parent work schedules (parents with flexible jobs enabling dinners might also have more time for educational support)

    c) Example: Parental involvement could be the real cause. Parents who are highly involved in their children's lives are more likely to organize family dinners AND more likely to help with homework, check on school progress, and encourage academic success. The family dinners don't cause the better grades—both are effects of parental involvement.

??? question "Problem 2: Simpson's Paradox"
    Two tutoring companies advertise their success rates:

    **Company A**: 600 students total, 480 passed their exams (80%)
    **Company B**: 600 students total, 420 passed their exams (70%)

    But here's the breakdown by student type:

    Company A:
    - 500 well-prepared students: 450 passed (90%)
    - 100 struggling students: 30 passed (30%)

    Company B:
    - 100 well-prepared students: 95 passed (95%)
    - 500 struggling students: 325 passed (65%)

    a) Which company has the higher overall pass rate?
    b) Which company has the higher pass rate for well-prepared students?
    c) Which company has the higher pass rate for struggling students?
    d) Explain why this is Simpson's Paradox and which company is actually better.

    **Answers:**
    a) Company A has the higher overall pass rate (80% vs 70%).

    b) Company B has the higher pass rate for well-prepared students (95% vs 90%).

    c) Company B has the higher pass rate for struggling students (65% vs 30%).

    d) This is Simpson's Paradox because Company B performs better in BOTH subgroups, yet appears worse overall. The paradox occurs because Company A mostly tutors well-prepared students (who pass at high rates anyway), while Company B takes on mostly struggling students (who pass at lower rates). The aggregated data makes Company A look better only because it tutors easier cases. Company B is actually better—it achieves higher success rates regardless of which type of student you consider.

??? question "Problem 3: Study Design"
    A researcher wants to determine whether a new energy drink improves athletic performance.

    a) Design an observational study that could investigate this question. What conclusions could you draw?
    b) Design an experiment that could investigate this question. What conclusions could you draw?
    c) Why would the experiment give stronger evidence for causation?

    **Answers:**
    a) Observational study: Survey 200 athletes about their energy drink consumption and measure their performance metrics (sprint times, strength tests, etc.). Compare performance between those who regularly use energy drinks and those who don't.

    Conclusions: Can only say energy drink use is "associated with" better or worse performance. Cannot claim causation because athletes who choose energy drinks might differ in training intensity, health consciousness, age, or other factors.

    b) Experiment: Recruit 100 athletes, randomly assign 50 to consume the energy drink before testing and 50 to consume a placebo drink (identical taste, no active ingredients). Measure their performance on standardized athletic tests. Compare average performance between groups.

    Conclusions: If the energy drink group performs significantly better, can conclude the drink causes improved performance. The placebo controls for the psychological effect of taking something.

    c) The experiment provides stronger evidence because random assignment ensures that, on average, the two groups are equivalent in all ways (training, motivation, genetics, experience) except for the drink they consumed. Any difference in performance can therefore be attributed to the drink. In the observational study, differences might reflect pre-existing differences between people who choose to use energy drinks.

??? question "Problem 4: Critical Analysis"
    A news article reports: "New study proves that getting more sleep causes better memory. Researchers found that people who slept 8+ hours performed 20% better on memory tests than those who slept less than 6 hours."

    Critically analyze this claim:
    a) Is the word "proves" appropriate? Why or why not?
    b) What information would you need to evaluate this claim properly?
    c) Identify at least two potential confounding variables.
    d) Rewrite the headline to accurately reflect what the study likely showed.

    **Answers:**
    a) "Proves" is not appropriate. This appears to be an observational study (researchers observed existing sleep patterns rather than randomly assigning people to sleep amounts). Observational studies cannot prove causation—they can only show association.

    b) Information needed:
    - Was this an experiment or observational study?
    - If observational, what confounders were controlled for?
    - How were sleep hours measured (self-report vs. objective)?
    - Sample size and how participants were selected
    - Details of the memory tests used

    c) Potential confounders:
    - Overall health (healthier people may both sleep better and have better memory)
    - Age (older people may sleep less and have worse memory)
    - Stress level (stressed people may sleep poorly and have impaired memory)
    - Lifestyle factors (exercise, diet, alcohol use)
    - Mental health conditions (depression affects both sleep and cognition)

    d) Better headline: "Study finds association between longer sleep and better memory performance" or "People who sleep 8+ hours score higher on memory tests, study suggests"

??? question "Problem 5: Identifying Study Types"
    For each scenario, identify whether it's an observational study or an experiment, and explain what conclusions can be drawn:

    a) Researchers randomly assign some classrooms to use a new math curriculum while others continue with the standard curriculum. They compare test scores at the end of the year.

    b) A hospital records which patients choose to have surgery versus medication for back pain, then follows up on their outcomes.

    c) Scientists compare cancer rates between people who live near power lines and those who don't.

    d) A tech company randomly shows half its users a new interface design and the other half the old design, then measures engagement.

    **Answers:**
    a) This is an experiment (random assignment to curricula). Conclusion: If the new curriculum group scores higher, we can conclude the curriculum caused better learning—the random assignment of classrooms balances other factors.

    b) This is an observational study (patients chose their treatment). Conclusion: We can only say treatment choice is associated with outcomes. Patients who choose surgery may differ from those who choose medication in severity, overall health, or willingness to take risks. These differences, not the treatment itself, might explain different outcomes.

    c) This is an observational study (researchers observed existing locations). Conclusion: We can only find associations between location and cancer rates. People living near power lines might differ in socioeconomic status, housing quality, or other factors that affect health. We cannot conclude power lines cause cancer from this study.

    d) This is an experiment (random assignment to interface). Conclusion: If the new interface group shows higher engagement, we can conclude the new design causes better engagement. Random assignment ensures the groups are comparable, so differences must be due to the interface.
