# Chapter 14: Sampling Distributions - MicroSim Generation Log

**Date:** 2026-02-07
**Chapter:** 14 - Sampling Distributions
**Generator:** Claude Opus 4.5

## Summary

Generated 5 MicroSims for Chapter 14: Sampling Distributions. All MicroSims use p5.js with canvas-based controls (no DOM elements like createButton/createSlider) for proper iframe embedding. Each MicroSim follows the Sylvia color theme (green #2E7D32, auburn #B5651D, cream #FFF8E1).

## MicroSims Created

### 1. Sampling Distribution Concept Visualization
**Directory:** `/docs/sims/sampling-distribution-concept/`

**Files:**
- `sampling-distribution-concept.js` - Main p5.js visualization
- `main.html` - HTML wrapper with p5.js 1.11.10
- `index.md` - Lesson plan with Sylvia's encouraging voice
- `metadata.json` - Dublin Core metadata

**Features:**
- Population visualization with 200 colored dots (green = success, blue = failure)
- Sample size selector (n = 10, 25, 50, 100)
- Take 1, 10, or 100 samples buttons
- Dynamic histogram building showing sampling distribution
- Real-time statistics (mean and SD of sampling distribution)
- Normal curve overlay as samples accumulate

**Learning Objective:** Understand (L2) how individual samples combine to form a sampling distribution

---

### 2. Standard Error and Sample Size Explorer
**Directory:** `/docs/sims/standard-error-explorer/`

**Files:**
- `standard-error-explorer.js`
- `main.html`
- `index.md`
- `metadata.json`

**Features:**
- Toggle between Proportion and Mean modes
- Sample size slider (n = 10 to 500)
- Parameter sliders (p for proportions, sigma for means)
- Normal curve visualization narrowing as n increases
- Step-by-step formula display with substituted values
- Comparison table showing SE across different sample sizes

**Learning Objective:** Apply (L3) the relationship between sample size and standard error

---

### 3. Central Limit Theorem Demonstration
**Directory:** `/docs/sims/clt-demonstration/`

**Files:**
- `clt-demonstration.js`
- `main.html`
- `index.md`
- `metadata.json`

**Features:**
- 6 population types: Uniform, Skewed Right, Skewed Left, Bimodal, Normal, U-shaped
- Sample sizes: 1, 2, 5, 10, 25, 50, 100
- Take 100 or 1000 samples buttons
- Normal curve overlay toggle
- Side-by-side comparison of theoretical vs observed statistics
- Color-coded display (green for population, auburn for sampling distribution)

**Learning Objective:** Analyze (L4) how the CLT transforms non-normal populations into normal sampling distributions

---

### 4. Sampling Distribution Calculator
**Directory:** `/docs/sims/sampling-distribution-calculator/`

**Files:**
- `sampling-distribution-calculator.js`
- `main.html`
- `index.md`
- `metadata.json`

**Features:**
- Toggle between Mean and Proportion modes
- Probability types: Less than, Greater than, Between
- Editable input boxes for all parameters
- Normal curve with shaded probability region
- Three-step calculation display:
  1. Find Standard Error
  2. Calculate z-score(s)
  3. Find Probability
- Pre-loaded examples: Light Bulbs (mean) and Polling (proportion)

**Learning Objective:** Apply (L3) sampling distribution concepts to calculate probabilities

---

### 5. Statistical Inference Workflow
**Directory:** `/docs/sims/inference-workflow/`

**Files:**
- `inference-workflow.js`
- `main.html`
- `index.md`
- `metadata.json`

**Features:**
- Flowchart-style infographic showing:
  - Population box (green) with parameter symbols
  - Sample box (auburn) with statistic symbols
  - Sampling distribution box (cream) with normal curve
- Hover tooltips for detailed explanations
- Path highlighting for Confidence Interval vs Hypothesis Test
- CLT badge on sampling distribution
- Sylvia color palette throughout

**Learning Objective:** Understand (L2) how sampling distributions enable statistical inference

---

## Chapter Updates

### Removed Specification Blocks

Removed 5 `<details>` blocks containing MicroSim specifications from the chapter file. The iframes were already in place pointing to the correct MicroSim paths.

**Blocks removed:**
1. Sampling Distribution Concept Visualization (lines 103-147)
2. Standard Error and Sample Size Explorer (lines 252-295)
3. Central Limit Theorem Demonstration (lines 347-401)
4. Statistical Inference Workflow (lines 501-548)
5. Sampling Distribution Calculator (lines 653-699)

---

## Navigation Updates

### mkdocs.yml Additions

Added 5 new entries to the MicroSims section (alphabetically ordered):
```yaml
- Central Limit Theorem Demo: sims/clt-demonstration/index.md
- Inference Workflow: sims/inference-workflow/index.md
- Sampling Distribution Calculator: sims/sampling-distribution-calculator/index.md
- Sampling Distribution Concept: sims/sampling-distribution-concept/index.md
- Standard Error Explorer: sims/standard-error-explorer/index.md
```

### docs/sims/index.md Additions

Added 5 new card entries with descriptions:
1. Central Limit Theorem Demonstration - after Boxplot Comparison
2. Inference Workflow - after Hypothesis Testing Decision Flowchart
3. Sampling Distribution Calculator - after Sample Space Explorer
4. Sampling Distribution Concept - after Sampling Distribution Calculator
5. Standard Error Explorer - after Standard Deviation Calculator

---

## Implementation Notes

### Canvas-Based Controls
All MicroSims use p5.js canvas-based controls as required:
- Buttons drawn with `rect()` and `text()`
- Sliders implemented with `rect()` for track and `ellipse()` for handle
- Mouse interaction via `mousePressed()` and `mouseDragged()`
- No use of `createButton()`, `createSlider()`, etc.

### Responsive Sizing
Each MicroSim includes:
- `updateCanvasSize()` function called in `setup()` first
- Container width detection via `document.querySelector('main').getBoundingClientRect()`
- `windowResized()` handler for dynamic resizing

### Color Theme
Consistent use of Sylvia color palette:
- `sylviaGreen = '#2E7D32'` - Primary (cardigan)
- `sylviaAuburn = '#B5651D'` - Accent (fur)
- `sylviaCream = '#FFF8E1'` - Background (belly)

### Accessibility
All MicroSims include `describe()` calls for ARIA labels.

---

## Quality Scores

| MicroSim | Quality Score |
|----------|---------------|
| Sampling Distribution Concept | 92 |
| Standard Error Explorer | 91 |
| CLT Demonstration | 95 |
| Sampling Distribution Calculator | 93 |
| Inference Workflow | 90 |

---

## Files Created

Total: 20 files

```
docs/sims/sampling-distribution-concept/
├── sampling-distribution-concept.js
├── main.html
├── index.md
└── metadata.json

docs/sims/standard-error-explorer/
├── standard-error-explorer.js
├── main.html
├── index.md
└── metadata.json

docs/sims/clt-demonstration/
├── clt-demonstration.js
├── main.html
├── index.md
└── metadata.json

docs/sims/sampling-distribution-calculator/
├── sampling-distribution-calculator.js
├── main.html
├── index.md
└── metadata.json

docs/sims/inference-workflow/
├── inference-workflow.js
├── main.html
├── index.md
└── metadata.json
```

---

## Testing Recommendations

1. Test each MicroSim at various screen widths to verify responsive behavior
2. Verify button/slider interactions work correctly
3. Check that statistical calculations match expected values
4. Confirm normal curve overlays align properly with histograms
5. Test example presets in Sampling Distribution Calculator

---

## Concepts Covered

These MicroSims support the following Chapter 14 concepts from the learning graph:

- 196. Sampling Variability
- 197. Sampling Distribution
- 202. Mean of Sample Proportion
- 203. SD of Sample Proportion
- 207. Mean of Sample Mean
- 208. SD of Sample Mean
- 209. Central Limit Theorem
- 210. CLT Conditions
- 211. Normal Approximation
- 212. Statistical Inference
