# Chapter Content Generation Report

**Generated:** 2026-02-06
**Skill Version:** Chapter Content Generator v0.04
**Target Audience:** High school students preparing for AP Statistics
**Reading Level:** Senior High (Grades 10-12)

## Summary

This report summarizes the chapter content generation sessions for the AP Statistics course. All chapters were generated using the Chapter Content Generator skill with Sylvia the Statistical Squirrel as the narrative anchor.

## Chapter Generation Details

| Ch | Chapter Name | Concepts | Words | Tokens | Time | Notes |
|:--:|:-------------|:--------:|------:|-------:|-----:|:------|
| 4 | Numerical Summaries | 18 | 5,135 | ~40,000* | 2:48 | 7 MicroSim specs |
| 5 | Standardization and Normal Distributions | 18 | 4,867 | ~40,000* | 2:53 | 6 MicroSim specs |
| 6 | Scatterplots and Association | 9 | 4,880 | 24,500 | 5:29** | Parallel batch 1 |
| 7 | Linear Regression | 16 | 4,959 | 24,600 | 5:29** | Parallel batch 1 |
| 8 | Causation and Study Design | 9 | 6,069 | 56,500 | 5:29** | Parallel batch 1 |
| 9 | Probability Fundamentals | 19 | 5,591 | 69,200 | 8:00** | Parallel batch 2 |
| 10 | Conditional Probability and Independence | 5 | 4,683 | 55,700 | 8:00** | Parallel batch 2 |
| 11 | Sampling and Bias | 19 | 4,800 | 24,500 | 8:00** | Parallel batch 2 |
| 12 | Experimental Design | 18 | 5,858 | 45,500 | 3:44 | 7 diagram/MicroSim specs |
| 13 | Random Variables | 23 | 5,636 | 38,500 | 3:06 | BINS mnemonic included |
| 14 | Sampling Distributions | 17 | 5,408 | 42,500 | 2:57 | 5 MicroSim specs |
| 15 | Confidence Intervals | 16 | 6,109 | 47,500 | 3:30 | 6 MicroSim specs, 11 tables |
| 16 | Hypothesis Testing | 22 | 8,484 | 55,000 | 4:30 | Extended length for 22 concepts |
| 17 | Inference for Means | 18 | 7,028 | 25,000 | 3:56 | 6 MicroSim specs |
| 18 | Chi-Square and Regression Inference | 22 | 6,062 | 45,500 | 3:23 | Chi-square + regression |
| 19 | Communication and Synthesis | 10 | 6,356 | 45,000 | 3:36 | AP exam strategies |

\* Estimated - token usage not recorded in original log

\** Batch time - parallel chapters recorded total batch elapsed time, not individual chapter time

## Totals

| Metric | Total |
|:-------|------:|
| **Chapters Generated** | 16 |
| **Concepts Covered** | 259 |
| **Total Words** | 91,925 |
| **Total Tokens** | ~679,500 |
| **Total Wall-Clock Time** | ~48 minutes*** |

\*** Sequential chapters: ~35 min; Parallel batch 1 (Ch 6-8): ~5.5 min; Parallel batch 2 (Ch 9-11): ~8 min

## Token Prediction Analysis

Can we predict token usage based on chapter characteristics? This interactive analysis compares three potential predictors.

<iframe src="../../sims/token-prediction/main.html" width="100%" height="620" style="border: 2px solid #2E7D32; border-radius: 8px;"></iframe>

### Regression Comparison

| Predictor | Formula | R² |
|-----------|---------|---:|
| **Concepts** | Tokens = 331 × Concepts + 37.4k | 1.6% |
| **Words** | Tokens = 1.1 × Words + 36.6k | 0.3% |
| **MicroSims** | Tokens = -4.4k × MicroSims + 67.7k | 5.6% |

### Key Finding

**None of these variables are good predictors of token usage.**

Even the best predictor (MicroSims) explains only 5.6% of the variance. Interestingly, the MicroSims relationship is *negative* - chapters with more MicroSim specifications actually used fewer tokens on average.

### What Actually Drives Token Usage?

The analysis suggests token consumption is driven by factors not captured in these metrics:

- **Context loading overhead** - Fixed cost regardless of chapter size
- **Agent reasoning complexity** - Some topics require more "thinking"
- **Execution mode** - Parallel vs sequential agent behavior differs
- **Example generation** - Worked examples vary in complexity

## Concept Coverage

All chapters achieved 100% concept coverage from their respective learning graph sections.

| Coverage | Chapters |
|:---------|:---------|
| 100% | All 16 chapters |

## Content Elements Summary

Based on log file data, typical chapter content includes:

- **Markdown Tables:** 8-18 per chapter
- **Markdown Lists:** 15-25 per chapter
- **MicroSim Specifications:** 4-7 per chapter
- **LaTeX Equations:** 15-50 per chapter
- **Admonitions:** 4-8 per chapter
- **Practice Problems:** 3-7 per chapter

## Execution Modes

| Mode | Chapters |
|:-----|:---------|
| Sequential (single chapter) | 4, 5, 12, 13, 14, 15, 16, 17, 18, 19 |
| Parallel (3 chapters) | 6-7-8, 9-10-11 |

## Notes

1. **Chapters 1-3:** No generation logs found - these chapters may have been created manually or through a different process.

2. **Token Estimates:** Chapters 4 and 5 did not include token usage in their logs; estimates (~40,000 each) are based on comparable chapters.

3. **LaTeX Formatting:** All chapters use backslash delimiters (`\(` `\)` for inline, `\[` `\]` for display) as required by project conventions.

4. **Sylvia Integration:** All chapters include Sylvia the Statistical Squirrel with signature phrases and encouraging tone.

5. **MicroSim Specifications:** Chapters include detailed specifications for interactive visualizations that require implementation using the microsim-generator skill.

---

*Report generated from session logs in `/logs/ch-*.md`*
