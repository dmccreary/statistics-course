---
title: Token Prediction Analysis
description: Interactive analysis comparing which factors best predict token usage during chapter content generation - concepts, words, or MicroSims.
---

# Token Prediction Analysis

Which factor best predicts how many tokens are needed to generate a chapter? This interactive MicroSim compares three potential predictors: number of concepts, word count, and number of MicroSims.

<iframe src="main.html" width="100%" height="740" style="border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

[View Fullscreen](main.html){ .md-button .md-button--primary }

## Regression Comparison Results

| Predictor | R² | Interpretation |
|-----------|---:|----------------|
| **Concepts** | 1.6% | Very weak predictor |
| **Words** | 0.3% | Essentially no relationship |
| **MicroSims** | 5.6% | Weak but best of the three |

## Key Finding

**None of these variables are good predictors of token usage.**

Even the best predictor (MicroSims) explains only 5.6% of the variance. This means ~94% of the variation in token usage is explained by other factors not captured in these metrics.

## What This Tells Us

The analysis reveals that token consumption during chapter generation is driven by factors beyond simple metrics:

1. **Context loading overhead** - The skill loads course descriptions, learning graphs, and reference files regardless of chapter size
2. **Agent reasoning complexity** - Some topics require more "thinking" even with fewer concepts
3. **Example generation** - Worked examples vary in complexity independent of concept count
4. **Parallel vs sequential execution** - Agent behavior differs based on execution mode

## Interesting Observations

Looking at specific outliers:

- **Chapter 9** (Probability Fundamentals): 69,200 tokens for 19 concepts and 5,591 words - highest token usage
- **Chapter 17** (Inference for Means): Only 25,000 tokens for 18 concepts and 7,028 words - very efficient
- **Chapter 10** (Conditional Probability): 55,700 tokens for just 5 concepts - highest tokens-per-concept ratio

## Features

- **Interactive toggle** - Switch between Concepts, Words, and MicroSims views
- **Side-by-side R² comparison** - See all three R² values at once
- **Dynamic regression line** - Updates with each predictor selection
- **Rich tooltips** - Hover over points to see all chapter metrics

## Data Source

Data extracted from chapter generation logs (`/logs/ch-*.md`) for chapters 6-19, excluding chapters with estimated values.

## References

- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [Linear Regression](https://en.wikipedia.org/wiki/Linear_regression)
- [Coefficient of Determination (R²)](https://en.wikipedia.org/wiki/Coefficient_of_determination)
