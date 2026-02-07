---
title: Conditional Probability and Independence
description: Conditional probability, tree diagrams, and Bayes' theorem intuition
generated_by: claude skill chapter-content-generator
date: 2026-02-06
version: 0.04
---

# Conditional Probability and Independence

## Summary

This chapter deepens students' understanding of probability by focusing on conditional probability and independence. Students will learn to calculate conditional probabilities, use tree diagrams to solve complex probability problems, and develop intuition for Bayes' theorem. These concepts are essential for understanding statistical inference.

## Concepts Covered

This chapter covers the following 5 concepts from the learning graph:

162. Conditional Probability
163. Calculating Conditionals
164. Bayes Intuition
165. Tree Diagram
166. Using Tree Diagrams

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Displaying Categorical Data](../02-displaying-categorical-data/index.md)
- [Chapter 9: Probability Fundamentals](../09-probability-fundamentals/index.md)

---

## When Context Changes Everything

Welcome back! I hope you've been practicing those probability fundamentals, because now we're going to take things up a notch. Today we're exploring a question that comes up constantly in real life: how does knowing something change what else we expect to happen?

Think about it. The probability that you'll ace tomorrow's test depends on whether you studied. The chance that your package arrives today changes once you get a "shipped" notification. The likelihood that it will rain shifts dramatically when you look out the window and see dark clouds. In each case, new information changes the probabilities. This is the essence of **conditional probability**, and my tail's tingling because this concept is genuinely powerful.

Let me share a quick story. When I was organizing my acorn stash last autumn, I noticed something interesting. The probability that an acorn was good (not rotten) was about 85% overall. But when I sorted them by which tree they came from, the probabilities changed dramatically! Acorns from the oak by the stream were good 95% of the time, while ones from the oak near the parking lot were only good 70% of the time. Knowing which tree the acorn came from changed my expectations completely. That's conditional probability in action.

## What Is Conditional Probability?

**Conditional probability** is the probability of an event occurring given that another event has already occurred. The key word here is "given." We're not asking about probabilities in general; we're asking about probabilities in a specific context or condition.

We write conditional probability using a vertical bar notation:

\[
P(A \mid B) = \text{"the probability of A given B"}
\]

That vertical bar is read as "given" or "knowing that." So \(P(\text{Rain} \mid \text{Cloudy})\) means "the probability of rain given that it's cloudy."

Here are some examples to make this concrete:

| Conditional Probability | What It Means |
|------------------------|---------------|
| \(P(\text{Pass} \mid \text{Studied})\) | Probability of passing given that you studied |
| \(P(\text{Heart} \mid \text{Red Card})\) | Probability of drawing a heart given it's a red card |
| \(P(\text{Late} \mid \text{Traffic})\) | Probability of being late given there's traffic |
| \(P(\text{Win} \mid \text{Home Game})\) | Probability of winning given it's a home game |

The condition (the event after the bar) essentially narrows down our sample space. Instead of considering all possible outcomes, we only consider outcomes where the condition is true.

!!! tip "Acorn for your thoughts?"
    Sylvia says: "Here's how I think about it. The probability that any random tree in the forest has great acorns is maybe 20%. But the probability that the old oak behind the library has great acorns, given that my grandmother collected from it for 15 years and always came back with a full stash? Much higher! Context matters."

## Visualizing Conditional Probability

Let's use a two-way table to see how conditional probability works. Suppose we surveyed 200 students about whether they eat breakfast and whether they feel alert in their morning classes:

| | Alert | Not Alert | Total |
|---|:---:|:---:|:---:|
| Ate Breakfast | 72 | 18 | 90 |
| No Breakfast | 33 | 77 | 110 |
| Total | 105 | 95 | 200 |

Now let's calculate some probabilities.

**Overall probability of being alert:**
\[
P(\text{Alert}) = \frac{105}{200} = 0.525 = 52.5\%
\]

**Probability of being alert given that you ate breakfast:**
\[
P(\text{Alert} \mid \text{Ate Breakfast}) = \frac{72}{90} = 0.80 = 80\%
\]

**Probability of being alert given no breakfast:**
\[
P(\text{Alert} \mid \text{No Breakfast}) = \frac{33}{110} = 0.30 = 30\%
\]

Look at that difference! The overall probability of being alert is 52.5%, but knowing whether someone ate breakfast dramatically changes our expectation. For breakfast-eaters, the probability jumps to 80%; for breakfast-skippers, it drops to 30%.

#### Diagram: Conditional Probability Two-Way Table Explorer

<iframe src="../../sims/conditional-probability-table/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Conditional Probability Two-Way Table Explorer</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: calculate

Learning Objective: Students will calculate conditional probabilities from a two-way table by selecting conditions and observing how the relevant subset changes.

Data Visibility Requirements:
- Stage 1: Display a two-way table with counts for two categorical variables
- Stage 2: User selects a condition (row or column) which highlights the relevant subset
- Stage 3: User selects an outcome, and the conditional probability is calculated

Instructional Rationale: Interactive selection from a table allows students to see how conditioning restricts the sample space. Highlighting the "given" row/column makes the denominator visible.

Visual elements:
- Two-way table with editable or preset values
- Left side: Table with row and column headers clearly labeled
- Right side: Visual representation showing the conditional probability as a fraction
- Highlighted cells when condition is selected
- Calculation shown step-by-step: "Given [condition], P([outcome]) = [numerator]/[denominator]"

Interactive controls:
- Dropdown or click to select the "given" condition (which row or column)
- Dropdown or click to select the outcome
- Toggle between different example datasets (breakfast/alert, sports/grades, etc.)
- Reset button

Default parameters:
- Start with breakfast/alertness data from the text
- No condition selected initially
- Both rows and columns selectable as conditions

Behavior:
- When user selects a condition, highlight that entire row or column
- Dim the rest of the table to show the restricted sample space
- When user selects an outcome within the condition, highlight that cell
- Display the calculation: P(outcome | condition) = cell count / row or column total
- Show comparison to unconditional probability

Color scheme:
- Unselected cells: light gray
- Condition selected: light blue background
- Outcome cell: bright orange highlight
- Text showing calculation in green

Canvas size: Responsive, approximately 700x450px
Implementation: p5.js with mouse click detection for cell/header selection
</details>

## The Conditional Probability Formula

Now let's formalize how to calculate conditional probability. The formula connects conditional probability to the probabilities we already know:

\[
P(A \mid B) = \frac{P(A \text{ and } B)}{P(B)}
\]

In words: the probability of A given B equals the probability of both A and B happening, divided by the probability of B.

Why does this formula work? Think about it this way. When we're given that B occurred, we're restricting our attention to only those outcomes where B happens. The denominator \(P(B)\) represents this restricted universe. The numerator \(P(A \text{ and } B)\) captures the outcomes that satisfy both conditions.

Let's verify with our breakfast example:

- \(P(\text{Ate Breakfast}) = \frac{90}{200} = 0.45\)
- \(P(\text{Alert and Ate Breakfast}) = \frac{72}{200} = 0.36\)
- \(P(\text{Alert} \mid \text{Ate Breakfast}) = \frac{0.36}{0.45} = 0.80\)

That matches what we calculated directly from the table.

!!! note "The Multiplication Rule Revisited"
    You might recognize this formula rearranged. The **General Multiplication Rule** states:
    \[
    P(A \text{ and } B) = P(B) \times P(A \mid B)
    \]
    This tells us the probability of both events equals the probability of the first event times the conditional probability of the second given the first. We'll use this extensively with tree diagrams.

## Calculating Conditional Probabilities

Let's work through several examples to build your skills with conditional probability calculations.

**Example 1: Card Drawing**

A standard deck has 52 cards: 26 red (13 hearts, 13 diamonds) and 26 black (13 clubs, 13 spades). What is the probability of drawing a heart given that the card is red?

Given: The card is red (26 cards)
Finding: Probability it's a heart (13 of the red cards are hearts)

\[
P(\text{Heart} \mid \text{Red}) = \frac{13}{26} = \frac{1}{2} = 0.50
\]

Alternatively, using the formula:
\[
P(\text{Heart} \mid \text{Red}) = \frac{P(\text{Heart and Red})}{P(\text{Red})} = \frac{13/52}{26/52} = \frac{13}{26} = 0.50
\]

**Example 2: Medical Testing**

In a population of 10,000 people, 200 have a certain disease. A test correctly identifies 95% of people with the disease and correctly identifies 90% of people without the disease.

| | Has Disease | No Disease | Total |
|---|:---:|:---:|:---:|
| Tests Positive | 190 | 980 | 1,170 |
| Tests Negative | 10 | 8,820 | 8,830 |
| Total | 200 | 9,800 | 10,000 |

Let's calculate \(P(\text{Disease} \mid \text{Positive Test})\):

\[
P(\text{Disease} \mid \text{Positive Test}) = \frac{190}{1170} \approx 0.162 = 16.2\%
\]

Wait, only 16.2%? Even with a positive test, there's only about a 1 in 6 chance of actually having the disease! This counterintuitive result happens because the disease is rare, so even a small percentage of false positives among the healthy population outnumbers the true positives. This is a crucial insight for interpreting medical tests.

**Example 3: Weather Patterns**

Historical data shows that in Seattle, it rains on 150 days per year, and 200 days are cloudy. On 140 days, it's both cloudy and raining.

\[
P(\text{Rain} \mid \text{Cloudy}) = \frac{P(\text{Rain and Cloudy})}{P(\text{Cloudy})} = \frac{140/365}{200/365} = \frac{140}{200} = 0.70
\]

So if it's cloudy in Seattle, there's a 70% chance of rain. But notice:

\[
P(\text{Rain}) = \frac{150}{365} \approx 0.41
\]

The unconditional probability of rain is only 41%, but knowing it's cloudy increases this to 70%.

#### Diagram: Conditional Probability Calculator

<iframe src="../../sims/conditional-probability-calculator/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Conditional Probability Calculator</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: calculate

Learning Objective: Students will calculate conditional probabilities by entering counts or probabilities and seeing the formula applied step by step.

Data Visibility Requirements:
- Stage 1: Input fields for P(A), P(B), and P(A and B)
- Stage 2: Show the formula with values substituted
- Stage 3: Display the calculated result with explanation

Instructional Rationale: A calculator with visible steps helps students connect the abstract formula to concrete numbers, reinforcing procedural understanding.

Visual elements:
- Three input fields for probabilities or two-way table counts
- Toggle between "probability input" and "count input" modes
- Step-by-step calculation display
- Visual representation using a Venn diagram or area model
- Result displayed prominently

Interactive controls:
- Input fields for P(A and B), P(B) [for calculating P(A|B)]
- Or input fields for P(A and B), P(A) [for calculating P(B|A)]
- Toggle to switch which conditional probability to calculate
- Preset examples button (cards, medical test, weather)
- Clear/reset button

Default parameters:
- Start with blank inputs
- Example presets available
- Show Venn diagram representation

Behavior:
- As user types values, update the formula display in real-time
- Validate inputs (probabilities between 0 and 1, P(A and B) ≤ min(P(A), P(B)))
- Show error messages for invalid inputs
- Display result with interpretation ("Given B occurs, A has a [X]% chance of occurring")

Color scheme:
- Input fields: white with green border
- Formula: black text with colored variables
- Result: large orange text
- Venn diagram: blue for A, orange for B, green for intersection

Canvas size: Responsive, approximately 650x400px
Implementation: p5.js with text input handling
</details>

## Independence: When Knowing Doesn't Help

Sometimes knowing that one event occurred doesn't change the probability of another event at all. When this happens, we say the events are **independent**.

Formally, events A and B are **independent** if and only if:

\[
P(A \mid B) = P(A)
\]

In words: knowing B occurred doesn't change the probability of A. The condition gives you no new information.

Equivalently, A and B are independent if:

\[
P(A \text{ and } B) = P(A) \times P(B)
\]

This is the multiplication rule for independent events. The probability of both happening is just the product of their individual probabilities.

Here are some examples of independent events:

- Flipping a coin and rolling a die (the coin doesn't affect the die)
- The weather in Tokyo and your grade on tomorrow's test
- Drawing a card, replacing it, and drawing again

And here are dependent events (NOT independent):

- Drawing two cards without replacement (first draw changes what's left)
- Whether you study and whether you pass the test
- Being cloudy and raining

!!! warning "Common Misconception"
    Don't confuse independent with mutually exclusive! Mutually exclusive events CAN'T happen together (like rolling a 3 AND rolling a 5 on one die). Independent events CAN happen together, and knowing one occurred doesn't change the probability of the other. In fact, if two events are mutually exclusive and both have nonzero probability, they cannot be independent!

**Testing for Independence**

To check if events are independent, verify that \(P(A \mid B) = P(A)\). Let's check with our breakfast data:

- \(P(\text{Alert}) = \frac{105}{200} = 0.525\)
- \(P(\text{Alert} \mid \text{Ate Breakfast}) = \frac{72}{90} = 0.80\)

Since \(0.80 \neq 0.525\), alertness and eating breakfast are NOT independent. Knowing someone ate breakfast changes (increases!) our expectation of them being alert.

Let's crack this nut with a different example. Suppose we flip a fair coin twice. Let A = "first flip is heads" and B = "second flip is heads."

- \(P(A) = 0.5\)
- \(P(B) = 0.5\)
- \(P(A \mid B) = \) ?

The first flip's result doesn't depend on the second flip, so \(P(A \mid B) = P(A) = 0.5\). These events are independent.

## Tree Diagrams: Organizing Complex Probabilities

When probability problems involve sequences of events, **tree diagrams** become your best friend. A tree diagram is a visual tool that shows all possible outcomes and their probabilities in a branching structure.

Here's how to build a tree diagram:

1. Start with a single point (the root)
2. Draw branches for each possible outcome of the first event
3. Label each branch with its probability
4. From each branch, draw new branches for the next event
5. Label these with conditional probabilities
6. Multiply along paths to get joint probabilities
7. Add probabilities of paths that lead to the same final outcome

Let's create a tree diagram for a medical testing scenario. Suppose 2% of people have Disease D. The test is 95% accurate for people with the disease and 90% accurate for people without.

```
                    Disease Status        Test Result

                         /--- Test+ (0.95)  → P(D and +) = 0.02 × 0.95 = 0.019
                        /
            D (0.02) ---
                        \
                         \--- Test- (0.05)  → P(D and -) = 0.02 × 0.05 = 0.001
Start ---
                         /--- Test+ (0.10)  → P(No D and +) = 0.98 × 0.10 = 0.098
                        /
          No D (0.98) ---
                        \
                         \--- Test- (0.90)  → P(No D and -) = 0.98 × 0.90 = 0.882
```

From this tree, we can calculate any probability we need:

- \(P(\text{Positive Test}) = 0.019 + 0.098 = 0.117\)
- \(P(\text{Disease} \mid \text{Positive}) = \frac{0.019}{0.117} \approx 0.162\)

Tree diagrams make the logic visible. You can see exactly how probabilities flow through the branches and combine.

#### Diagram: Interactive Tree Diagram Builder

<iframe src="../../sims/tree-diagram-builder/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Interactive Tree Diagram Builder</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: construct

Learning Objective: Students will construct tree diagrams by specifying events and probabilities, then use the diagram to calculate joint and conditional probabilities.

Data Visibility Requirements:
- Stage 1: Show the tree structure with labeled branches
- Stage 2: Display probability labels on each branch
- Stage 3: Calculate and show joint probabilities at leaf nodes

Instructional Rationale: Building tree diagrams interactively helps students understand how conditional probabilities multiply along paths and how outcomes combine.

Visual elements:
- Tree starting from left side, branching right
- Nodes as circles, branches as lines
- Probability labels on branches
- Joint probability calculations at leaf nodes
- Summary panel showing all possible outcomes and their probabilities

Interactive controls:
- Input field for number of initial branches (2-4)
- Input fields for branch probabilities (must sum to 1)
- Option to add second level of branches
- Input fields for conditional probabilities on second level
- "Calculate" button to show all results
- Preset examples (medical test, weather forecast, defective products)
- Reset button

Default parameters:
- Start with medical testing example
- Two-level tree (disease status → test result)
- Branch probabilities editable

Behavior:
- Tree redraws as user changes probabilities
- Validate that probabilities sum to 1 at each branch point
- Calculate joint probabilities by multiplying along paths
- Highlight paths when user hovers over a leaf node
- Show formula: P(path) = P(branch1) × P(branch2)
- Bottom panel summarizes: "P(Disease AND Positive) = 0.019"

Color scheme:
- First level branches: shades of blue (disease) and green (no disease)
- Second level branches: shades of orange (positive) and purple (negative)
- Leaf nodes: colored by final outcome
- Path highlighting: bright yellow

Canvas size: Responsive, approximately 750x500px
Implementation: p5.js with interactive input fields
</details>

## Using Tree Diagrams to Solve Problems

Tree diagrams are especially powerful for multi-step probability problems. Let's work through a complete example.

**Problem: Quality Control**

A factory has two machines. Machine A produces 60% of all items and has a 3% defect rate. Machine B produces 40% of items and has a 5% defect rate.

**(a) What's the probability that a randomly selected item is defective?**

Let's build the tree:

```
                Machine              Quality

                     /--- Defective (0.03)   → P(A and Def) = 0.60 × 0.03 = 0.018
                    /
          A (0.60) ---
                    \
                     \--- Good (0.97)        → P(A and Good) = 0.60 × 0.97 = 0.582
Start ---
                     /--- Defective (0.05)   → P(B and Def) = 0.40 × 0.05 = 0.020
                    /
          B (0.40) ---
                    \
                     \--- Good (0.95)        → P(B and Good) = 0.40 × 0.95 = 0.380
```

\[
P(\text{Defective}) = 0.018 + 0.020 = 0.038 = 3.8\%
\]

**(b) Given that an item is defective, what's the probability it came from Machine A?**

This is a conditional probability! We need:

\[
P(A \mid \text{Defective}) = \frac{P(A \text{ and Defective})}{P(\text{Defective})} = \frac{0.018}{0.038} \approx 0.474 = 47.4\%
\]

Even though Machine A has a lower defect rate (3% vs 5%), it still produces about 47% of the defective items because it produces more items overall (60% of production).

!!! tip "My tail's tingling!"
    Sylvia says: "This is exactly how I figured out which trees to avoid! I knew 70% of acorns in my area came from the big oaks and 30% from the smaller maples. Even though maples had a lower percentage of good acorns, most of my good acorns still came from oaks because there were so many of them. The tree diagram made it clear!"

## Bayes' Theorem: Reversing the Condition

You've now seen several examples where we calculate \(P(A \mid B)\) when we know \(P(B \mid A)\). This "flipping" of the condition is formalized in **Bayes' Theorem**:

\[
P(A \mid B) = \frac{P(B \mid A) \times P(A)}{P(B)}
\]

In the medical testing example:
- We knew \(P(\text{Positive} \mid \text{Disease}) = 0.95\) (the test's sensitivity)
- We wanted \(P(\text{Disease} \mid \text{Positive})\) (what a positive test means)

Bayes' theorem lets us convert one to the other.

The key insight is that these two conditional probabilities are often very different! \(P(\text{Disease} \mid \text{Positive})\) was only about 16%, even though \(P(\text{Positive} \mid \text{Disease})\) was 95%.

**Why Does This Happen?**

The difference comes from the **base rate**, which is how common the condition is in the first place. When disease is rare (2%), even a good test produces many false positives among the huge number of healthy people.

Here's an intuitive way to think about it. Imagine 10,000 people:

- 200 have the disease → 190 test positive (true positives)
- 9,800 don't have disease → 980 test positive (false positives)

Total positives: 190 + 980 = 1,170

Proportion who actually have disease: 190/1170 ≈ 16%

The false positives swamp the true positives because there are so many more healthy people.

#### Diagram: Bayes' Theorem Visualizer

<iframe src="../../sims/bayes-theorem-visualizer/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Bayes' Theorem Visualizer</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: analyze

Learning Objective: Students will analyze how prior probability (base rate), sensitivity, and specificity affect the posterior probability using Bayes' theorem.

Data Visibility Requirements:
- Stage 1: Show population split by disease status (prior probability)
- Stage 2: Show test results within each group
- Stage 3: Calculate and display the posterior probability with visual representation

Instructional Rationale: An interactive visualization showing populations and test results helps students build intuition for why base rates matter so much in Bayesian reasoning.

Visual elements:
- Icon array or area diagram showing population of 1000 people
- Color coding: disease (red icons) vs healthy (blue icons)
- Second layer showing test results: positive (highlighted) vs negative (dimmed)
- Calculation panel showing Bayes' theorem with current values
- Sliders clearly connected to the visualization

Interactive controls:
- Slider for prior probability P(Disease): 1% to 50%
- Slider for sensitivity P(Positive|Disease): 70% to 99%
- Slider for specificity P(Negative|No Disease): 70% to 99%
- Toggle between icon array and tree diagram view
- Reset to default values button

Default parameters:
- Prior: 2% (disease prevalence)
- Sensitivity: 95%
- Specificity: 90%
- Show 1000-person population

Behavior:
- As sliders change, population visualization updates in real-time
- Count and percentage of each category displayed
- Final calculation shows P(Disease|Positive) prominently
- Animation showing which positive tests are true vs false positives
- Comparison statement: "X% of positive tests are actually true positives"

Color scheme:
- Disease: red/salmon
- Healthy: blue/teal
- Positive test: bright border
- Negative test: faded/dimmed
- True positive: gold star
- False positive: orange warning

Canvas size: Responsive, approximately 750x500px
Implementation: p5.js with slider controls
</details>

## Common Patterns and Pitfalls

As you work with conditional probability, watch out for these common issues:

**The Prosecutor's Fallacy**

Don't confuse \(P(\text{Evidence} \mid \text{Innocent})\) with \(P(\text{Innocent} \mid \text{Evidence})\). A rare match (like DNA) might have \(P(\text{Match} \mid \text{Innocent}) = 0.0001\), but \(P(\text{Innocent} \mid \text{Match})\) depends on how many people could be suspects!

**Base Rate Neglect**

People often ignore how common or rare the underlying condition is. Even a very accurate test produces unreliable results when testing for something rare. Always consider the base rate.

**Confusing Independence with Unrelated**

Independence is a precise mathematical property. Two events might seem "unrelated" but still not be independent. Always check the numbers.

**Forgetting to Update**

When you condition on new information, you must use that information. The sample space shrinks. Old probabilities may no longer apply.

## Putting It All Together

Let's work through a comprehensive example that uses all our tools.

**Problem: Weather and Commuting**

Data from a commuter's log:

| | On Time | Late | Total |
|---|:---:|:---:|:---:|
| Rain | 15 | 45 | 60 |
| No Rain | 180 | 60 | 240 |
| Total | 195 | 105 | 300 |

**(a) Are being late and rain independent?**

Check if \(P(\text{Late} \mid \text{Rain}) = P(\text{Late})\):

- \(P(\text{Late}) = \frac{105}{300} = 0.35\)
- \(P(\text{Late} \mid \text{Rain}) = \frac{45}{60} = 0.75\)

Since \(0.75 \neq 0.35\), these events are NOT independent. Rain more than doubles the probability of being late!

**(b) Given that the commuter was late, what's the probability it was raining?**

\[
P(\text{Rain} \mid \text{Late}) = \frac{45}{105} \approx 0.429 = 42.9\%
\]

**(c) Draw a tree diagram for this situation.**

```
                    Weather             Arrival

                         /--- On Time (0.25)  → P(Rain, On Time) = 0.20 × 0.25 = 0.05
                        /
         Rain (0.20) ---
                        \
                         \--- Late (0.75)     → P(Rain, Late) = 0.20 × 0.75 = 0.15
Start ---
                         /--- On Time (0.75)  → P(No Rain, On Time) = 0.80 × 0.75 = 0.60
                        /
       No Rain (0.80) ---
                        \
                         \--- Late (0.25)     → P(No Rain, Late) = 0.80 × 0.25 = 0.20
```

Notice how the conditional probabilities for "Late" change depending on the weather: 75% when raining versus only 25% when not raining.

## Key Takeaways

Let's squirrel away the big ideas from this chapter:

1. **Conditional probability** \(P(A \mid B)\) is the probability of A occurring given that B has occurred. The condition restricts our sample space.

2. The **conditional probability formula** is:
\[
P(A \mid B) = \frac{P(A \text{ and } B)}{P(B)}
\]

3. Events are **independent** if knowing one doesn't change the probability of the other: \(P(A \mid B) = P(A)\). For independent events, \(P(A \text{ and } B) = P(A) \times P(B)\).

4. **Tree diagrams** organize sequential probabilities. Multiply along branches to get joint probabilities; add probabilities of paths leading to the same outcome.

5. **Bayes' theorem** lets us reverse conditional probabilities:
\[
P(A \mid B) = \frac{P(B \mid A) \times P(A)}{P(B)}
\]

6. **Base rate** matters enormously! Even accurate tests can give misleading results when the condition being tested for is rare.

---

## Practice Problems

??? question "Problem 1: Cards"
    Two cards are drawn from a standard deck without replacement.

    (a) What is the probability the second card is a king given that the first card was a king?

    (b) What is the probability both cards are kings?

    **Solutions:**

    (a) After drawing one king, 51 cards remain with 3 kings among them:
    \[P(\text{2nd King} \mid \text{1st King}) = \frac{3}{51} = \frac{1}{17} \approx 0.059\]

    (b) Using the multiplication rule:
    \[P(\text{Both Kings}) = P(\text{1st King}) \times P(\text{2nd King} \mid \text{1st King}) = \frac{4}{52} \times \frac{3}{51} = \frac{12}{2652} = \frac{1}{221} \approx 0.0045\]

??? question "Problem 2: Student Activities"
    At a high school, 40% of students play sports, 30% are in band, and 15% do both.

    (a) What is the probability a student is in band given they play sports?

    (b) Are playing sports and being in band independent?

    **Solutions:**

    (a) \[P(\text{Band} \mid \text{Sports}) = \frac{P(\text{Band and Sports})}{P(\text{Sports})} = \frac{0.15}{0.40} = 0.375 = 37.5\%\]

    (b) Check if \(P(\text{Band} \mid \text{Sports}) = P(\text{Band})\):
    - \(P(\text{Band}) = 0.30\)
    - \(P(\text{Band} \mid \text{Sports}) = 0.375\)

    Since \(0.375 \neq 0.30\), these events are NOT independent. Being an athlete makes it more likely a student is also in band.

??? question "Problem 3: Disease Screening"
    A disease affects 1% of a population. A screening test has 90% sensitivity (correctly identifies those with disease) and 95% specificity (correctly identifies those without disease).

    (a) Draw a tree diagram for this situation.

    (b) What is the probability of a positive test result?

    (c) If someone tests positive, what is the probability they have the disease?

    **Solutions:**

    (a) Tree diagram:
    ```
                      /--- Positive (0.90)  → 0.01 × 0.90 = 0.009
         Disease (0.01)
                      \--- Negative (0.10)  → 0.01 × 0.10 = 0.001
    Start
                      /--- Positive (0.05)  → 0.99 × 0.05 = 0.0495
       No Disease (0.99)
                      \--- Negative (0.95)  → 0.99 × 0.95 = 0.9405
    ```

    (b) \(P(\text{Positive}) = 0.009 + 0.0495 = 0.0585 = 5.85\%\)

    (c) \[P(\text{Disease} \mid \text{Positive}) = \frac{0.009}{0.0585} \approx 0.154 = 15.4\%\]

    Even with a positive test, there's only about a 15% chance of actually having the disease because the disease is rare.

??? question "Problem 4: Manufacturing"
    Factory A produces 55% of a company's widgets and 3% of Factory A's widgets are defective. Factory B produces the rest and 4% of Factory B's widgets are defective.

    (a) What percentage of all widgets are defective?

    (b) A widget is found to be defective. What is the probability it came from Factory A?

    **Solutions:**

    (a) Factory B produces 45% of widgets.
    \[P(\text{Defective}) = 0.55 \times 0.03 + 0.45 \times 0.04 = 0.0165 + 0.0180 = 0.0345 = 3.45\%\]

    (b) \[P(\text{Factory A} \mid \text{Defective}) = \frac{0.0165}{0.0345} \approx 0.478 = 47.8\%\]

    Even though Factory A has a lower defect rate, it still produces about 48% of defective items because it produces more widgets overall.

---

Now that's a data point worth collecting! You've learned how new information changes probabilities, how to use tree diagrams to organize complex problems, and why base rates matter so much in Bayesian reasoning. These tools are essential for the statistical inference we'll explore in upcoming chapters.
