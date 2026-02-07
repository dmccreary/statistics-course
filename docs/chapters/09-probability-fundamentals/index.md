---
title: Probability Fundamentals
description: Foundations of probability theory including sample spaces, events, and probability rules
generated_by: claude skill chapter-content-generator
date: 2026-02-06
version: 0.04
---

# Probability Fundamentals

## Summary

This chapter introduces the foundations of probability theory. Students will learn about random phenomena, sample spaces, events, and the basic rules of probability including the addition and multiplication rules. These probability concepts provide the mathematical foundation for statistical inference covered later in the course.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

148. Random Phenomenon
149. Probability
150. Probability Rules
151. Sample Space
152. Event
153. Complement of Event
154. Mutually Exclusive Events
155. Disjoint Events
156. Independent Events
157. Dependent Events
158. Addition Rule
159. General Addition Rule
160. Multiplication Rule
161. General Multiplication Rule
167. Venn Diagram
168. Using Venn Diagrams
169. Simulation
170. Designing Simulations
172. Law of Large Numbers

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to Statistics](../01-introduction-to-statistics/index.md)

---

## Welcome to the World of Chance

Have you ever wondered why the weather forecast says "70% chance of rain" but it still ends up sunny? Or why some poker players consistently win while others always seem to lose? Or what it really means when a medical test is "95% accurate"?

Welcome to probability—the mathematics of uncertainty. This is where statistics gets its superpowers. Everything we've learned so far about collecting and describing data has been building toward this moment: learning to quantify the unknown.

"My tail's tingling—we're onto something!" Sylvia adjusts her spectacles excitedly. "When I first learned probability, it changed how I thought about my acorn stashes. Instead of just hoping I'd have enough for winter, I started calculating the chances. Turns out, understanding uncertainty gives you more control, not less. Let's crack this nut!"

By the end of this chapter, you'll understand:

- What makes a phenomenon "random" and how to define possible outcomes
- How to calculate probabilities using fundamental rules
- When events are independent versus dependent
- How to use Venn diagrams as powerful problem-solving tools
- Why simulations can estimate probabilities we cannot calculate directly
- The remarkable Law of Large Numbers that connects probability to the real world

---

## Random Phenomena: Embracing Uncertainty

A **random phenomenon** is any situation where we know the possible outcomes, but we cannot predict exactly which outcome will occur on any particular trial. The key word here is *uncertainty*—there's no way to know for certain what will happen next.

Examples of random phenomena surround us:

- Flipping a coin (heads or tails?)
- Rolling a die (which number?)
- The weather tomorrow (rain, sun, clouds?)
- Whether a free throw goes in (swish or miss?)
- A student's score on the next exam (which grade?)

Here's what makes these phenomena "random": even though we cannot predict the specific outcome of any single trial, there's a remarkable pattern when we observe many trials. Flip a fair coin 1,000 times, and you'll get close to 500 heads. Roll a die 600 times, and each number appears roughly 100 times.

This predictable long-run behavior is the foundation of probability theory.

| What We Know | What We Don't Know |
|--------------|-------------------|
| All possible outcomes | Which outcome will occur next |
| The pattern over many trials | The result of a single trial |
| Long-run frequencies | Short-run surprises |

---

## What Is Probability?

**Probability** is a number between 0 and 1 that describes how likely an event is to occur. It quantifies our uncertainty about random phenomena.

- Probability 0 means the event is impossible (it never happens)
- Probability 1 means the event is certain (it always happens)
- Probability 0.5 means the event is equally likely to occur or not occur

We can express probability as a decimal, a fraction, or a percentage:

\[
P(\text{event}) = \frac{\text{number of favorable outcomes}}{\text{total number of possible outcomes}}
\]

For a fair coin flip:
\[
P(\text{heads}) = \frac{1}{2} = 0.5 = 50\%
\]

For rolling a 6 on a fair die:
\[
P(\text{rolling a 6}) = \frac{1}{6} \approx 0.167 \approx 16.7\%
\]

There are three ways to interpret probability:

**1. Theoretical Probability:** Based on mathematical reasoning about equally likely outcomes. Example: A fair die has 6 equally likely faces, so P(rolling a 3) = 1/6.

**2. Empirical Probability:** Based on observed data from many trials. Example: If a basketball player made 85 out of 100 free throws, their estimated probability of making the next one is 85/100 = 0.85.

**3. Subjective Probability:** Based on personal judgment or belief. Example: "I think there's a 60% chance I'll finish my homework before dinner."

For AP Statistics, we primarily work with theoretical and empirical probabilities.

---

## Probability Rules: The Foundation

All probabilities must follow these fundamental **probability rules**:

**Rule 1: The probability of any event is between 0 and 1 (inclusive).**
\[
0 \leq P(A) \leq 1
\]

**Rule 2: The sum of probabilities of all possible outcomes equals 1.**
\[
P(\text{all outcomes}) = 1
\]

**Rule 3: The probability that an event does NOT occur equals 1 minus the probability it does occur.**
\[
P(\text{not } A) = 1 - P(A)
\]

These rules might seem simple, but they're remarkably powerful. If someone tells you an event has a probability of 1.5 or -0.3, you know immediately they've made an error. If you're trying to find the probability of something NOT happening, just subtract from 1.

| Probability Value | Interpretation |
|-------------------|----------------|
| 0 | Impossible |
| 0.01 | Very unlikely |
| 0.25 | Unlikely |
| 0.50 | Even odds |
| 0.75 | Likely |
| 0.99 | Very likely |
| 1 | Certain |

"Here's something that tripped me up at first," Sylvia admits. "Probability is about the long run, not individual predictions. A 90% chance of rain doesn't mean it *will* rain—it means that when conditions are similar, it rains 9 out of 10 times. That 1-in-10 sunny day still happens!"

---

## Sample Space and Events

To work with probability, we need precise language for describing outcomes.

### Sample Space

The **sample space** (denoted S or Ω) is the set of all possible outcomes of a random phenomenon. It's the complete list of everything that could happen.

Examples:

- Coin flip: S = {Heads, Tails}
- Single die roll: S = {1, 2, 3, 4, 5, 6}
- Two coin flips: S = {HH, HT, TH, TT}
- Drawing a card: S = {all 52 cards in a standard deck}

When we flip two coins, notice that "HT" and "TH" are different outcomes—the order matters. The sample space has 4 outcomes, not 3.

### Events

An **event** is any collection of outcomes from the sample space—a subset of S. Events are what we calculate probabilities for.

For rolling a die:

- Event A: "Rolling an even number" = {2, 4, 6}
- Event B: "Rolling less than 3" = {1, 2}
- Event C: "Rolling a 7" = {} (empty set—impossible!)

If all outcomes in the sample space are equally likely, then:
\[
P(\text{Event}) = \frac{\text{Number of outcomes in the event}}{\text{Number of outcomes in sample space}}
\]

For Event A above:
\[
P(\text{even}) = \frac{3}{6} = \frac{1}{2} = 0.5
\]

#### Diagram: Sample Space Explorer

<details markdown="1">
<summary>Interactive Sample Space Visualization</summary>
Type: MicroSim

Learning objective: Students will identify sample spaces and events for common random phenomena, calculating probabilities for specified events (Bloom: Understanding, Applying).

Visual elements:
- Main display showing sample space as a grid or collection of icons
- Highlighted subset showing the selected event
- Probability calculation displayed: P(Event) = favorable/total
- Different themes: dice, cards, coins, spinners

Interactive controls:
- Dropdown to select random phenomenon:
  - "Single Die Roll" (6 outcomes)
  - "Two Coin Flips" (4 outcomes)
  - "Two Dice Sum" (36 outcomes shown as grid)
  - "Drawing a Card" (52 outcomes organized by suit)
- Checkboxes or click-to-select to define events
- Event description input field
- "Calculate Probability" button
- "Reset Selection" button

Behavior:
- Sample space displays all possible outcomes visually
- Clicking outcomes adds/removes them from the event
- Count updates in real-time: "Event contains X of Y outcomes"
- Probability updates: P(Event) = X/Y = decimal = percentage
- For two dice, grid shows all 36 ordered pairs

Color scheme:
- Unselected outcomes: light gray
- Selected outcomes (in event): bright green
- Sample space boundary: dark outline

Canvas size: 750 x 450 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## Complement of an Event

The **complement of an event** A (written as A' or Ā or A^c) is the event that A does NOT occur. It consists of all outcomes in the sample space that are not in A.

This is incredibly useful because sometimes it's easier to calculate the probability of something NOT happening.

\[
P(A') = 1 - P(A)
\]

**Example:** What's the probability of rolling at least one 6 when rolling two dice?

The sample space has 36 outcomes. Counting all the ways to get at least one 6 is tedious. Instead:

- P(no sixes) = P(first die isn't 6) × P(second die isn't 6) = (5/6)(5/6) = 25/36
- P(at least one 6) = 1 - P(no sixes) = 1 - 25/36 = 11/36 ≈ 0.306

The complement rule transforms hard problems into easy ones!

| Event | Complement |
|-------|------------|
| Rain tomorrow | No rain tomorrow |
| Pass the exam | Fail the exam |
| At least one head | All tails |
| None defective | At least one defective |

"Acorn for your thoughts?" Sylvia asks. "I use complements all the time. Instead of calculating the probability I'll find at least one oak tree with acorns in a grove, I calculate the probability of striking out completely and subtract from 1. Much easier!"

---

## Mutually Exclusive and Disjoint Events

**Mutually exclusive events** (also called **disjoint events**) are events that cannot happen at the same time. If one occurs, the other cannot.

When rolling a single die:

- Event A: Rolling an even number {2, 4, 6}
- Event B: Rolling an odd number {1, 3, 5}

These are mutually exclusive—a roll cannot be both even AND odd.

When rolling a single die:

- Event C: Rolling an even number {2, 4, 6}
- Event D: Rolling a number less than 4 {1, 2, 3}

These are NOT mutually exclusive—rolling a 2 satisfies both events.

Visually, mutually exclusive events have no overlap in a Venn diagram. Their intersection is empty:
\[
P(A \text{ and } B) = 0 \quad \text{for mutually exclusive events}
\]

This property makes probability calculations much simpler, as we'll see with the addition rule.

---

## Independent and Dependent Events

This distinction is crucial for calculating probabilities of combined events.

### Independent Events

**Independent events** are events where the occurrence of one does NOT affect the probability of the other. The outcome of the first event gives you no information about the second.

Examples of independent events:

- Consecutive coin flips (getting heads first doesn't affect the second flip)
- Rolling two dice (the first die's result doesn't influence the second)
- Whether it rains today and your exam score tomorrow

The mathematical definition: Events A and B are independent if:
\[
P(A \text{ and } B) = P(A) \times P(B)
\]

### Dependent Events

**Dependent events** are events where the occurrence of one DOES affect the probability of the other. Information about the first event changes what we know about the second.

Examples of dependent events:

- Drawing cards without replacement (the first draw changes what's left in the deck)
- A student's grade in Calc I and their grade in Calc II (success in one suggests preparation for the other)
- Rain today and whether the ground is wet tomorrow

For dependent events, we need to adjust the probability of the second event based on what happened first. We'll formalize this with conditional probability in the next chapter.

| Scenario | Independent or Dependent? | Why? |
|----------|---------------------------|------|
| Flipping a coin twice | Independent | Coins have no memory |
| Drawing 2 cards without replacement | Dependent | First draw changes remaining cards |
| Weather on consecutive days | Dependent | Tomorrow's weather relates to today's |
| Rolling two different dice | Independent | One die doesn't affect the other |

---

## The Addition Rule

The **addition rule** helps us find the probability of "A or B" (meaning A occurs, or B occurs, or both occur).

### Addition Rule for Mutually Exclusive Events

When A and B are **mutually exclusive** (can't both happen):
\[
P(A \text{ or } B) = P(A) + P(B)
\]

This works because there's no overlap to worry about.

**Example:** When rolling a die, what's P(rolling a 1 or a 6)?
\[
P(1 \text{ or } 6) = P(1) + P(6) = \frac{1}{6} + \frac{1}{6} = \frac{2}{6} = \frac{1}{3}
\]

### General Addition Rule

When events are NOT mutually exclusive, we need the **general addition rule**:
\[
P(A \text{ or } B) = P(A) + P(B) - P(A \text{ and } B)
\]

Why subtract the intersection? Because outcomes in both A and B get counted twice (once in P(A) and once in P(B)), so we subtract once to correct.

**Example:** In a standard deck, what's P(drawing a heart or a face card)?

- P(heart) = 13/52
- P(face card) = 12/52
- P(heart AND face card) = 3/52 (jack, queen, king of hearts)

\[
P(\text{heart or face}) = \frac{13}{52} + \frac{12}{52} - \frac{3}{52} = \frac{22}{52} = \frac{11}{26} \approx 0.423
\]

#### Diagram: Addition Rule Visualizer

<details markdown="1">
<summary>Interactive Addition Rule Calculator</summary>
Type: MicroSim

Learning objective: Students will apply both the basic and general addition rules to calculate P(A or B), understanding when to subtract the intersection (Bloom: Applying, Analyzing).

Visual elements:
- Two overlapping circles representing events A and B
- Shaded regions showing P(A), P(B), and intersection
- Numerical display of each region's probability
- Formula shown with current values substituted
- Animation highlighting why we subtract the intersection

Interactive controls:
- Slider for P(A): range 0 to 1
- Slider for P(B): range 0 to 1
- Slider for P(A and B): range 0 to min(P(A), P(B))
- Toggle: "Mutually Exclusive" (sets intersection to 0)
- Checkbox: "Show step-by-step calculation"
- Preset scenarios dropdown: "Card Problems", "Dice Problems", "Survey Data"

Behavior:
- Venn diagram circles resize based on probabilities
- Overlap region visually represents P(A and B)
- When adding P(A) + P(B), intersection highlights twice (flashing)
- Subtracting removes the double-count (visual demonstration)
- Final P(A or B) displayed with interpretation
- Error message if P(A and B) exceeds logical maximum

Canvas size: 750 x 450 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## The Multiplication Rule

The **multiplication rule** helps us find the probability of "A and B" (meaning both A and B occur).

### Multiplication Rule for Independent Events

When A and B are **independent**:
\[
P(A \text{ and } B) = P(A) \times P(B)
\]

**Example:** What's the probability of flipping heads twice in a row?
\[
P(H \text{ and } H) = P(H) \times P(H) = \frac{1}{2} \times \frac{1}{2} = \frac{1}{4}
\]

**Example:** What's the probability of rolling a 6 on both of two dice?
\[
P(6 \text{ and } 6) = \frac{1}{6} \times \frac{1}{6} = \frac{1}{36}
\]

### General Multiplication Rule

When events are **dependent**, we use the **general multiplication rule**:
\[
P(A \text{ and } B) = P(A) \times P(B|A)
\]

The notation P(B|A) means "the probability of B given that A has occurred." This conditional probability accounts for how A's occurrence changes B's likelihood.

**Example:** A bag contains 4 red and 6 blue marbles. You draw two marbles without replacement. What's the probability both are red?

- P(first red) = 4/10
- P(second red | first was red) = 3/9 (only 3 red left among 9 total)

\[
P(\text{both red}) = \frac{4}{10} \times \frac{3}{9} = \frac{12}{90} = \frac{2}{15} \approx 0.133
\]

"Don't worry—every statistician drops an acorn sometimes," Sylvia reassures. "The multiplication rule for dependent events trips up everyone at first. Just remember: when you're 'removing' things or when information flows between events, you're dealing with dependence. Slow down and adjust!"

---

## Venn Diagrams: Visual Problem-Solving

A **Venn diagram** is a visual representation of events using overlapping circles. Each circle represents an event, and the overlap represents outcomes in both events.

### Anatomy of a Venn Diagram

- The rectangle represents the entire sample space (S)
- Each circle represents an event
- The overlap (intersection) represents outcomes in both events
- The region outside all circles represents outcomes in neither event

### Using Venn Diagrams

**Venn diagrams** are incredibly useful for:

1. Visualizing relationships between events
2. Solving probability problems systematically
3. Checking your work with the addition rule
4. Understanding complement events

**Strategy for using Venn diagrams:**

1. Draw the rectangle (sample space) and circles (events)
2. Start by filling in the intersection (middle)
3. Work outward, finding each region
4. Verify: all regions should sum to 1 (or the sample space size)

**Example:** In a class of 30 students:
- 18 take Spanish
- 12 take French
- 5 take both languages

Let's find probabilities using a Venn diagram:

- Both Spanish and French: 5 students
- Spanish only: 18 - 5 = 13 students
- French only: 12 - 5 = 7 students
- Neither language: 30 - 13 - 5 - 7 = 5 students

| Region | Count | Probability |
|--------|-------|-------------|
| Spanish only | 13 | 13/30 ≈ 0.433 |
| French only | 7 | 7/30 ≈ 0.233 |
| Both | 5 | 5/30 ≈ 0.167 |
| Neither | 5 | 5/30 ≈ 0.167 |
| Total | 30 | 1.000 |

P(Spanish or French) = (13 + 5 + 7)/30 = 25/30 ≈ 0.833

#### Diagram: Venn Diagram Problem Solver

<details markdown="1">
<summary>Interactive Venn Diagram Tool</summary>
Type: MicroSim

Learning objective: Students will use Venn diagrams to organize information and calculate probabilities for overlapping events (Bloom: Applying, Analyzing).

Visual elements:
- Sample space rectangle with two overlapping circles
- Four distinct regions: A only, B only, A∩B, neither
- Labels showing count or probability in each region
- Running total verification display
- Event labels A and B (user can rename)

Interactive controls:
- Input fields for: Total in sample space, n(A), n(B), n(A and B)
- Alternatively: probability inputs P(A), P(B), P(A and B)
- Toggle between "Counts" and "Probabilities" mode
- "Auto-calculate regions" button
- "Verify totals" button (checks if regions sum correctly)
- Preset scenarios: "Language Classes", "Sports Teams", "Medical Testing"

Behavior:
- As inputs change, regions automatically recalculate
- Visual sizes of regions adjust proportionally
- Impossible combinations trigger error (e.g., intersection larger than event)
- Clicking a region highlights it and shows probability calculation
- Formula panel shows relevant probability calculations
- Quiz mode: given partial information, find missing values

Color scheme:
- Event A: blue
- Event B: orange
- Intersection: purple (blend)
- Neither: light gray

Canvas size: 800 x 500 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## Simulation: Probability in Action

Sometimes probability problems are too complex to solve mathematically. This is where **simulation** comes to the rescue.

A **simulation** uses random processes to model a real situation and estimate probabilities through many repeated trials. Instead of calculating, we experiment—virtually.

Why use simulation?

- Some problems have no clean mathematical solution
- Simulations can verify your calculations
- They build intuition about probability
- Modern computers make millions of trials easy

"Let's crack this nut with a story," Sylvia begins. "I once wondered: if I randomly choose 3 trees from a grove of 10 oaks (where 4 have excellent acorns), what's the probability at least 2 of my picks are excellent? I could calculate it... or I could simulate the selection 10,000 times and count! Both give the same answer, but simulation felt more real."

### Designing Simulations

**Designing simulations** requires careful planning:

**Step 1: Identify the random phenomenon** you're modeling.
What's the question you're trying to answer?

**Step 2: Design a model** that accurately represents the situation.
Choose a random device (random numbers, dice, coins, cards) that matches the probabilities.

**Step 3: Define what counts as a "trial"** and what outcome you're tracking.
What does one simulation run look like? What's your "success" condition?

**Step 4: Run many trials** (typically 1,000 to 10,000).
More trials = more accurate estimates.

**Step 5: Calculate the empirical probability.**
Proportion of trials that achieved the outcome of interest.

### Simulation Example

**Problem:** A basketball player has a 70% free throw percentage. What's the probability they make at least 4 out of 5 free throws?

**Simulation Design:**

1. **Model:** Use random digits 0-9. Let digits 0-6 represent "make" (7 outcomes = 70%) and digits 7-9 represent "miss" (3 outcomes = 30%).

2. **One trial:** Generate 5 random digits and count how many are 0-6.

3. **Success:** The trial is a "success" if 4 or 5 digits are 0-6.

4. **Run 1,000 trials** and count successes.

5. **Estimate:** P(at least 4 makes) ≈ number of successes / 1000

A simulation might yield 528 successes out of 1,000 trials, estimating P(at least 4 makes) ≈ 0.528. The true theoretical probability is approximately 0.528 (calculated using the binomial formula we'll learn later).

#### Diagram: Probability Simulation Lab

<details markdown="1">
<summary>Interactive Simulation Tool</summary>
Type: MicroSim

Learning objective: Students will design and run simulations to estimate probabilities for random phenomena, understanding how more trials leads to more accurate estimates (Bloom: Applying, Creating).

Visual elements:
- Random digit/outcome generator display
- Running count of trials and successes
- Live probability estimate updating
- Histogram showing distribution of outcomes across trials
- Confidence band narrowing as trials increase

Interactive controls:
- Scenario selector: "Free Throws", "Coin Flips", "Dice Rolls", "Custom"
- For custom: input probability of success per trial
- Number of trials per "trial" (e.g., 5 free throws)
- Success condition (e.g., at least 4)
- "Run 1 trial" button (shows details)
- "Run 100 trials" button
- "Run 1000 trials" button
- Speed slider for animation
- Reset button

Behavior:
- Single trial shows step-by-step random outcomes
- Multiple trials animate quickly, updating counters
- Probability estimate converges toward true value
- Display shows: Estimated P = successes/trials
- Compare to theoretical probability (if known)
- Uncertainty decreases visually as trials increase

Canvas size: 800 x 500 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## The Law of Large Numbers

The **Law of Large Numbers** is one of the most important principles in all of probability. It states:

> As the number of trials increases, the empirical probability (observed proportion) gets closer and closer to the true theoretical probability.

In other words, short-run randomness becomes long-run regularity.

### Seeing the Law in Action

Flip a coin 10 times, and you might get 7 heads (70%). Flip it 100 times, and you'll probably be closer to 50%. Flip it 10,000 times, and you'll be very close to 50%.

The Law of Large Numbers does NOT say:

- ❌ "After getting 5 heads in a row, tails is 'due'" (This is the Gambler's Fallacy!)
- ❌ "The next flip will balance things out"
- ❌ "Results must even out in the short run"

The Law of Large Numbers DOES say:

- ✅ "Over thousands of flips, the percentage of heads approaches 50%"
- ✅ "Individual deviations don't matter in the long run"
- ✅ "Probability is about proportions, not counts"

This law is why casinos always win in the long run, why insurance companies can set premiums accurately, and why polls work (when done correctly).

| Number of Coin Flips | Possible Head Proportions |
|---------------------|---------------------------|
| 10 | Could easily be 30% or 70% |
| 100 | Usually between 40% and 60% |
| 1,000 | Usually between 47% and 53% |
| 10,000 | Usually between 49% and 51% |

"Time to squirrel away this wisdom," Sylvia says sagely. "The Law of Large Numbers is why my long-term foraging strategy works. Some days I find almost nothing; other days I hit the jackpot. But over a whole autumn, my collection consistently matches my probability-based predictions. Short-term chaos, long-term order!"

#### Diagram: Law of Large Numbers Demonstrator

<details markdown="1">
<summary>Interactive Law of Large Numbers Visualization</summary>
Type: MicroSim

Learning objective: Students will observe how empirical probability converges to theoretical probability as the number of trials increases, understanding the Law of Large Numbers (Bloom: Understanding, Analyzing).

Visual elements:
- Real-time graph showing proportion vs. number of trials
- Horizontal reference line at true probability
- Running proportion display that bounces around, then stabilizes
- Counter showing current trial number and cumulative successes
- Visual representation of trials (e.g., animated coin flips)

Interactive controls:
- Probability slider: set true P(success) from 0.1 to 0.9
- "Flip 1" button (adds one trial)
- "Flip 10" button (adds 10 trials rapidly)
- "Flip 100" button
- "Flip until stable" button (runs until within 0.01 of true P)
- Speed slider for animation
- "Reset" button to start over

Behavior:
- After each trial, proportion updates and graph extends
- Early in simulation, line jumps wildly
- Later in simulation, line hugs the true probability
- Display shows: "After N trials: Observed = X/N = proportion"
- Color indicates distance from true probability (red = far, green = close)
- Optional: multiple simultaneous sequences to show all converge

Canvas size: 800 x 450 pixels, responsive design
Implementation: p5.js with canvas-based controls
</details>

---

## Common Probability Mistakes

Before we practice, let's address errors that trip up even careful students:

**Mistake 1: The Gambler's Fallacy**
Believing that past random events affect future independent events. "I've gotten tails 5 times in a row, so heads is due!" Wrong—the coin has no memory. Each flip is still 50/50.

**Mistake 2: Confusing Mutually Exclusive with Independent**
These are completely different concepts!
- Mutually exclusive: Cannot happen together (P(A and B) = 0)
- Independent: Occurrence of one doesn't affect the other

In fact, if two events with non-zero probability are mutually exclusive, they CANNOT be independent!

**Mistake 3: Adding Probabilities for Non-Disjoint Events**
Using P(A) + P(B) when events overlap leads to double-counting. You must subtract the intersection.

**Mistake 4: Multiplying Probabilities for Dependent Events Without Adjusting**
Using P(A) × P(B) when events are dependent gives wrong answers. You need P(A) × P(B|A).

**Mistake 5: Probability Greater Than 1**
If your answer exceeds 1, you've made an error. Go back and check!

---

## Putting It All Together: Complete Examples

### Example 1: Cards and Probability Rules

A card is drawn from a standard 52-card deck.

**a) What is P(Queen)?**
\[
P(\text{Queen}) = \frac{4}{52} = \frac{1}{13} \approx 0.077
\]

**b) What is P(not a Queen)?**
\[
P(\text{not Queen}) = 1 - P(\text{Queen}) = 1 - \frac{4}{52} = \frac{48}{52} \approx 0.923
\]

**c) What is P(Queen or Heart)?**
Since some Queens are Hearts, use the general addition rule:
\[
P(\text{Queen or Heart}) = \frac{4}{52} + \frac{13}{52} - \frac{1}{52} = \frac{16}{52} = \frac{4}{13} \approx 0.308
\]

**d) Two cards are drawn with replacement. What is P(both Hearts)?**
With replacement, draws are independent:
\[
P(\text{both Hearts}) = \frac{13}{52} \times \frac{13}{52} = \frac{1}{4} \times \frac{1}{4} = \frac{1}{16} = 0.0625
\]

**e) Two cards are drawn without replacement. What is P(both Hearts)?**
Without replacement, draws are dependent:
\[
P(\text{both Hearts}) = \frac{13}{52} \times \frac{12}{51} = \frac{156}{2652} = \frac{1}{17} \approx 0.059
\]

### Example 2: Using a Venn Diagram

A survey of 100 students finds:
- 62 use Instagram
- 45 use TikTok
- 28 use both

Find the probability that a randomly selected student:

**Setting up the Venn diagram:**

- Both: 28
- Instagram only: 62 - 28 = 34
- TikTok only: 45 - 28 = 17
- Neither: 100 - 34 - 28 - 17 = 21

**a) Uses Instagram or TikTok**
\[
P(\text{I or T}) = \frac{34 + 28 + 17}{100} = \frac{79}{100} = 0.79
\]

**b) Uses exactly one platform**
\[
P(\text{exactly one}) = \frac{34 + 17}{100} = \frac{51}{100} = 0.51
\]

**c) Uses neither platform**
\[
P(\text{neither}) = \frac{21}{100} = 0.21
\]

**d) Uses at least one platform**
\[
P(\text{at least one}) = 1 - P(\text{neither}) = 1 - 0.21 = 0.79
\]

### Example 3: Simulation Design

**Problem:** In a game, you roll two dice and win if the sum is 7 or 11. Design a simulation to estimate your probability of winning.

**Simulation Design:**

1. **Model:** Use a random number generator for two dice (1-6 each)

2. **One trial:** Generate two random integers 1-6, find their sum

3. **Success:** Sum equals 7 or 11

4. **Run 10,000 trials**

5. **Estimate:** P(win) = successes / 10,000

The theoretical probability is P(sum = 7) + P(sum = 11) = 6/36 + 2/36 = 8/36 ≈ 0.222. A good simulation should give a result close to this.

---

## Key Takeaways

"Time to squirrel away the big ideas!"

- A **random phenomenon** has uncertain individual outcomes but predictable long-run patterns

- **Probability** is a number between 0 and 1 measuring how likely an event is to occur

- The **sample space** is the set of all possible outcomes; an **event** is any subset of the sample space

- The **complement** of event A is "not A"; P(A') = 1 - P(A)

- **Mutually exclusive** (disjoint) events cannot occur together; **independent** events don't affect each other's probabilities

- **Addition Rule:** P(A or B) = P(A) + P(B) - P(A and B). For disjoint events, the intersection term is 0

- **Multiplication Rule:** P(A and B) = P(A) × P(B) for independent events; P(A) × P(B|A) for dependent events

- **Venn diagrams** visually organize events and their overlaps, making probability calculations systematic

- **Simulation** estimates probabilities through repeated random trials when mathematical solutions are difficult

- The **Law of Large Numbers** states that observed proportions converge to true probabilities over many trials

---

## Practice Problems

??? question "Check Your Understanding"

    **Problem 1:** A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles. One marble is drawn at random.

    a) What is P(red)?
    b) What is P(not green)?
    c) What is P(red or blue)?
    d) Are "red" and "blue" mutually exclusive? Independent?

    **Problem 2:** Two dice are rolled. Let A = "sum is even" and B = "sum is greater than 7."

    a) List the sample space for the sum (possible totals).
    b) Find P(A).
    c) Find P(B).
    d) Are A and B mutually exclusive? Why or why not?

    **Problem 3:** In a school, 40% of students play a sport, 25% are in band, and 10% do both. Draw a Venn diagram and find:

    a) P(sport only)
    b) P(sport or band)
    c) P(neither sport nor band)

    **Problem 4:** A coin is flipped 4 times. Design a simulation to estimate the probability of getting at least 3 heads. Describe your model, trial definition, and success condition.

    **Problem 5:** Explain the difference between mutually exclusive events and independent events. Give an example of each.

??? answer "Solutions"

    **Problem 1:**
    a) P(red) = 5/10 = 1/2 = 0.5
    b) P(not green) = 1 - P(green) = 1 - 2/10 = 8/10 = 0.8
    c) P(red or blue) = 5/10 + 3/10 = 8/10 = 0.8 (mutually exclusive, so just add)
    d) Yes, mutually exclusive (a marble can't be both red and blue). Not independent—if we know a marble is red, P(blue) = 0, not 3/10.

    **Problem 2:**
    a) S = {2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}
    b) P(even sum) = 18/36 = 1/2 (sums of 2, 4, 6, 8, 10, 12)
    c) P(sum > 7) = 15/36 (sums of 8, 9, 10, 11, 12)
    d) Not mutually exclusive—sums of 8, 10, and 12 are both even AND greater than 7.

    **Problem 3:**
    - Sport only: 40% - 10% = 30%
    - Band only: 25% - 10% = 15%
    - Both: 10%
    - Neither: 100% - 30% - 15% - 10% = 45%

    a) P(sport only) = 0.30
    b) P(sport or band) = 0.30 + 0.10 + 0.15 = 0.55
    c) P(neither) = 0.45

    **Problem 4:**
    - Model: Use digits 0-9, where 0-4 = heads (50%), 5-9 = tails (50%)
    - Trial: Generate 4 random digits
    - Success: 3 or 4 digits are in range 0-4
    - Run 1,000+ trials and calculate proportion of successes
    - Expected result: approximately 0.3125 (theoretical probability using binomial)

    **Problem 5:**
    Mutually exclusive: Events that cannot occur at the same time. Example: On one die roll, "rolling a 1" and "rolling a 6" are mutually exclusive.

    Independent: Events where one occurring doesn't change the probability of the other. Example: Two separate coin flips—getting heads on the first doesn't affect the second flip.

    Key difference: Mutually exclusive events with non-zero probability are always dependent!

---

You've just built the foundation for all the statistical inference to come. Probability isn't just about cards and dice—it's the mathematical framework for drawing conclusions from data when we can't observe everything. In the next chapter, we'll extend these ideas with conditional probability and Bayes' Theorem.

"Now *that's* a data point worth collecting!" Sylvia beams. "You've learned to speak the language of chance. Whether you're predicting weather, analyzing medical tests, or calculating your odds in a board game, probability is your new superpower. Let's keep going!"
