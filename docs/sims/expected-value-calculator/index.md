---
title: Expected Value Calculator
description: An interactive calculator for computing the expected value of discrete random variables, with step-by-step calculation display and real-time validation.
image: /sims/expected-value-calculator/expected-value-calculator.png
---

# Expected Value Calculator

<iframe src="main.html" height="552px" scrolling="no"></iframe>

[Run the Expected Value Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Ready to crack this nut? This interactive calculator helps you compute the expected value (also called the mean) of a discrete random variable. Enter your own values and probabilities, or use the pre-loaded die roll example to see how the calculation works step-by-step.

The expected value tells you what you'd expect the average outcome to be if you repeated the random process many, many times. It's your best prediction for the long-run average!

## How to Use

1. **Click any cell** in the table to edit it
2. **Type a number** and press **Enter** to confirm
3. **Tab** to move to the next cell
4. Watch the **contribution column** update automatically (x * P(X=x))
5. Check that your probabilities sum to 1 (valid distribution indicator)
6. See the expected value calculated at the bottom

### Preset Buttons

- **Die Roll**: Load the standard fair die distribution (values 1-6, each with probability 1/6)
- **Clear All**: Start fresh with empty cells
- **Add Row**: Add another outcome (up to 8 total)
- **Remove Row**: Remove the last row

## Key Concepts

- **Expected Value E(X)**: The weighted average of all possible values, where each value is weighted by its probability
- **Formula**: E(X) = Sum of [x * P(X = x)]
- **Valid Distribution**: Probabilities must be between 0 and 1, and must sum to exactly 1
- **Long-Run Average**: Expected value is what you'd expect the average to be over many trials

## Learning Objectives

After using this MicroSim, you'll be able to:

- Calculate expected value using the formula E(X) = Sum of [x * P(X=x)]
- Verify that a probability distribution is valid
- Understand that expected value represents a long-run average
- Recognize that expected value doesn't have to equal any possible outcome

## Example: Insurance Company Profit

Try entering this example:

| Value (x) | P(X = x) |
|-----------|----------|
| 250 | 0.999 |
| -99750 | 0.001 |

This represents an insurance company's profit from a $250 policy with a 0.1% chance of paying out $100,000. What's the expected profit per policy?

!!! tip "Sylvia Says"
    "The expected value is like a balance point - it's the center of your probability distribution. For a fair die, E(X) = 3.5, which isn't even a possible roll! That's okay - it's the long-run average, not a prediction for any single roll."

## Lesson Plan

### Introduction (5 minutes)

Ask: "If you play a game many times, how much would you expect to win on average?" Introduce the idea that we can calculate this precisely using expected value.

### Guided Exploration (10 minutes)

1. Start with the die roll example - verify E(X) = 3.5
2. Modify probabilities to create an unfair die - how does E(X) change?
3. Create a simple game: win $10 with P=0.4, lose $5 with P=0.6
4. Calculate expected value - is this a fair game?

### Practice Activities

1. **Insurance Problem**: Model an insurance policy and find expected profit
2. **Lottery Problem**: Model a lottery ticket (cost $2, win $1M with P=0.000001, etc.)
3. **Design a Fair Game**: Create a game where E(X) = 0

### Assessment Questions

1. A game costs $5 to play. You win $20 with probability 0.2 and $0 otherwise. What is E(X) for your net winnings? Should you play?
2. Why can the expected value of rolling a die be 3.5 when you can't actually roll a 3.5?
3. If E(X) = 0 for a game, what does that tell you about the game?

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/expected-value-calculator/main.html" height="552px" scrolling="no"></iframe>
```

## Technical Notes

- Built with p5.js 1.11.10
- Uses canvas-based controls for iframe compatibility
- Keyboard input for editing cells
- Real-time validation of probability distribution
- Drawing height: 450px, Control height: 100px

## References

- Chapter 13: Random Variables
- Concepts: Expected Value, Calculating Expected Value, Probability Distribution, Valid Distribution
