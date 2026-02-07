---
title: Random Digit Table Simulator
description: Interactive simulation for practicing simple random sampling using a random digit table.
image: /sims/random-digit-table/random-digit-table.png
---

# Random Digit Table Simulator

<iframe src="main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Random Digit Table Simulator Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Let's crack this nut!"* Sylvia exclaims. *"Random digit tables were the OG random number generators—and while we have fancy computers now, understanding how they work teaches you exactly what 'random selection' means!"*

This interactive simulation lets students practice using a **random digit table** to select a simple random sample. The step-by-step approach shows exactly why certain numbers are accepted or rejected, building deep understanding of the sampling process.

### What You'll Learn

- How to read multi-digit numbers from a random digit table
- When to **skip** numbers (out of range, already selected, or zero)
- How the process ensures every population member has an equal chance of selection
- Why starting position doesn't matter (as long as it's random)

## How to Use

1. **Set your population size** (1-999) by clicking the input box and typing
2. **Set your sample size** (1-50) similarly
3. **Click "New Table"** to generate a fresh random digit table
4. **Click "Step →"** (or press spacebar) to read the next number
5. **Watch the log** to see why each number was selected or skipped
6. **Continue until** your sample is complete

### Understanding the Display

| Element | Meaning |
|---------|---------|
| Yellow highlight | Current digits being read |
| Gray digits | Already processed |
| Green panel | Selected sample members |
| Step log | Explains each decision |

## Key Concepts

### Reading Two-Digit Numbers (Population ≤ 99)

For a population of 50 students (numbered 01-50):
- Read: 15 → **Select student 15**
- Read: 02 → **Select student 02**
- Read: 83 → **Skip** (greater than 50)
- Read: 47 → **Select student 47**

### Reading Three-Digit Numbers (Population ≤ 999)

For a population of 250 members (numbered 001-250):
- Read: 150 → **Select member 150**
- Read: 028 → **Select member 28**
- Read: 392 → **Skip** (greater than 250)

*"Acorn for your thoughts?"* Sylvia asks. *"Notice how we skip numbers that are out of range—but that doesn't bias our sample! Every valid number still has an equal chance of appearing."*

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/random-digit-table/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Use a random digit table to select a simple random sample
2. Determine how many digits to read based on population size
3. Apply the three skip rules: out of range, already selected, starts with zero
4. Explain why this process produces an unbiased sample

### Target Audience

- AP Statistics students (high school)
- Introductory statistics college students
- Research methods courses

### Prerequisites

- Understanding of simple random sampling
- Concept of population and sample
- What it means for selection to be "random"

### Classroom Activities

**Activity 1: Manual Practice (15 minutes)**

1. Give students a printed random digit table
2. Have them select a sample of 8 from a population of 75
3. Compare results—each student should have different samples!
4. Verify using the simulator

**Activity 2: Efficiency Investigation (10 minutes)**

1. Set population to 30 and observe how often you skip
2. Set population to 90 and compare skip frequency
3. Set population to 10 and compare again
4. Discuss: Why are some population sizes more "efficient"?

**Activity 3: What If? Scenarios (10 minutes)**

Discuss these questions:
- "What if two students start at the same position?" (Same sample!)
- "What if I always start at row 1, column 1?" (Predictable—not truly random)
- "What if my population is 1000?" (Use 4 digits: 0001-1000)

### Common Mistakes to Address

1. **Reusing numbers**: Once selected, skip duplicates
2. **Inconsistent digit reading**: Always read the same number of digits
3. **Starting at the same place**: Starting position should vary randomly
4. **Including 00 or 000**: Zero is typically not a valid member number

### Assessment Questions

1. You have a population of 200 students. How many digits should you read at a time from the random digit table?

2. While selecting a sample from a population of 45, you read the digits 6-2-0-3-8. Which of these would you select: 62, 03, 38?

3. Explain why skipping numbers greater than the population size doesn't introduce bias.

4. A researcher always starts reading from row 1, column 1 of the same random digit table. Is this appropriate for multiple studies? Why or why not?

## References

- Chapter 11: Sampling and Bias - Concepts: Simple Random Sample, Random Digit Table, Random Number Generator
- [Random.org](https://www.random.org/) - True random number generation
- [NIST Random Number Tables](https://www.nist.gov/) - Historical context
