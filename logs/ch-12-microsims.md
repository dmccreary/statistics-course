# Chapter 12 MicroSims Implementation Log

**Date:** 2026-02-07
**Chapter:** 12 - Experimental Design
**Status:** Completed

## Summary

Created 7 interactive MicroSims for Chapter 12: Experimental Design. All MicroSims use p5.js with canvas-based controls (no DOM elements) and follow the established patterns in the codebase.

## MicroSims Created

### 1. Factors and Levels Tree
- **Directory:** `/docs/sims/factors-levels-tree/`
- **Files Created:**
  - `factors-levels-tree.js` - Interactive tree diagram
  - `main.html` - HTML wrapper with p5.js 1.11.10
  - `index.md` - Lesson plan with learning objectives
  - `metadata.json` - Dublin Core metadata
- **Purpose:** Visualizes how factors and levels combine to create treatments in a 2-factor experiment
- **Bloom Level:** Understand (L2)
- **Key Features:**
  - Hierarchical tree showing experiment -> factors -> levels -> treatments
  - Hover over treatments to highlight path
  - Click to select and see details
  - Color-coded nodes (green=root, blue=factor1, orange=factor2, auburn=treatments)

### 2. Treatment vs Control Comparison
- **Directory:** `/docs/sims/treatment-control-comparison/`
- **Files Created:**
  - `treatment-control-comparison.js` - Step-through visualization
  - `main.html` - HTML wrapper
  - `index.md` - Lesson plan
  - `metadata.json` - Metadata
- **Purpose:** Demonstrates why control groups are necessary for valid experimental conclusions
- **Bloom Level:** Understand (L2)
- **Key Features:**
  - 4-stage progressive reveal
  - Shows treatment group before/after
  - Reveals control group improvement
  - Calculates true treatment effect (8 - 6 = 2 points)
  - Optional confounds panel

### 3. Three Principles of Experimental Design
- **Directory:** `/docs/sims/three-principles-experiment/`
- **Files Created:**
  - `three-principles-experiment.js` - Interactive infographic
  - `main.html` - HTML wrapper
  - `index.md` - Lesson plan
  - `metadata.json` - Metadata
- **Purpose:** Interactive visualization of Control, Randomization, and Replication
- **Bloom Level:** Understand (L2)
- **Key Features:**
  - Three clickable principle cards with icons
  - Click to see visual demonstrations
  - Toggle to show "what goes wrong without"
  - Custom icons (lock, dice, people figures)
  - Color-coded by principle

### 4. Blinding Flowchart
- **Directory:** `/docs/sims/blinding-flowchart/`
- **Files Created:**
  - `blinding-flowchart.js` - Comparison visualization
  - `main.html` - HTML wrapper
  - `index.md` - Lesson plan
  - `metadata.json` - Metadata
- **Purpose:** Compares no blinding, single-blind, and double-blind experimental designs
- **Bloom Level:** Analyze (L4)
- **Key Features:**
  - Three parallel setups showing who knows what
  - Visual figures with eyes open/blindfolded
  - Bias risk indicators (high/medium/low)
  - Hover for advantages/disadvantages
  - Toggle to show real-world examples

### 5. Experimental Designs Comparison
- **Directory:** `/docs/sims/experimental-designs-compare/`
- **Files Created:**
  - `experimental-designs-compare.js` - Tabbed comparison
  - `main.html` - HTML wrapper
  - `index.md` - Lesson plan
  - `metadata.json` - Metadata
- **Purpose:** Compare completely randomized, randomized block, and matched pairs designs
- **Bloom Level:** Analyze (L4)
- **Key Features:**
  - Three tabs for different design types
  - Animated random assignment visualization
  - Shows units as circles with IDs
  - Treatment groups color-coded
  - Toggle to show advantages
  - Statistics panel

### 6. Experiment Planning Flowchart
- **Directory:** `/docs/sims/experiment-planning-flowchart/`
- **Files Created:**
  - `experiment-planning-flowchart.js` - Decision flowchart
  - `main.html` - HTML wrapper
  - `index.md` - Lesson plan
  - `metadata.json` - Metadata
- **Purpose:** Guides students through experiment design decisions
- **Bloom Level:** Create (L6)
- **Key Features:**
  - Interactive flowchart with decision nodes
  - Click nodes for detailed explanations
  - Decision diamonds (orange) and process boxes (green)
  - Follows path from research question to final design
  - Covers design selection and blinding decisions

### 7. Random Assignment Simulator
- **Directory:** `/docs/sims/random-assignment-simulator/`
- **Files Created:**
  - `random-assignment-simulator.js` - Assignment simulation
  - `main.html` - HTML wrapper
  - `index.md` - Lesson plan
  - `metadata.json` - Metadata
- **Purpose:** Practice random assignment of experimental units to treatment groups
- **Bloom Level:** Apply (L3)
- **Key Features:**
  - Pool of numbered units
  - Random number generator display
  - Animated step-by-step assignment
  - Configurable units (1-30) and groups (2-3)
  - Statistics panel showing group balance
  - Spacebar shortcut for quick assignment

## Chapter Updates

### Updated `/docs/chapters/12-experimental-design/index.md`
- Removed all 7 `<details>` blocks containing MicroSim specifications
- Kept existing iframe embeds that were already in place
- The chapter now has clean iframe embeds without specification blocks

### Updated `/mkdocs.yml`
Added 7 new MicroSim entries in alphabetical order:
- Blinding Flowchart (after Binomial Probability Explorer)
- Experiment Planning Flowchart (after Empirical Rule)
- Experimental Designs Comparison (after Experiment Planning Flowchart)
- Factors and Levels Tree (after Expected Value Calculator)
- Random Assignment Simulator (after Question Wording Effects, before Random Digit Table)
- Three Principles of Experiment (after Test Statistic Calculator)
- Treatment Control Comparison (after Token Prediction)

### Updated `/docs/sims/index.md`
**Note:** Updates to add the 7 new MicroSim card entries are pending due to file modification conflicts. The entries to add are:

1. **Blinding Flowchart** - Interactive comparison of no blinding, single-blind, and double-blind experimental designs showing information flow and bias risk.

2. **Experiment Planning Flowchart** - Interactive decision flowchart guiding students through the process of designing a complete experiment.

3. **Experimental Designs Comparison** - Interactive comparison of completely randomized, randomized block, and matched pairs experimental designs with animated random assignment.

4. **Factors and Levels Tree** - Interactive tree diagram showing how factors and levels combine to create experimental treatments.

5. **Random Assignment Simulator** - Interactive simulation for practicing random assignment of experimental units to treatment groups.

6. **Three Principles of Experiment** - Interactive infographic showing Control, Randomization, and Replication as foundational principles.

7. **Treatment Control Comparison** - Step-through visualization demonstrating why control groups are essential for valid conclusions.

## Technical Notes

### Canvas Controls
All MicroSims use canvas-based controls per project requirements:
- Buttons drawn with `rect()` and `text()`
- Click detection in `mousePressed()`
- Keyboard input in `keyPressed()`
- No p5.js DOM functions (createButton, createSlider, etc.)

### Responsive Design
All MicroSims use `updateCanvasSize()` as the first step in `setup()` to get container width and resize appropriately.

### Color Scheme
Used consistent Sylvia-themed colors:
- `#2E7D32` - Sylvia green (primary)
- `#B5651D` - Sylvia auburn (accent)
- `#FFF8E1` - Sylvia cream (background)
- `#8B7355` - Sylvia hazel (decorative)

### Library Version
All MicroSims use p5.js version 1.11.10 from CDN.

## File Count Summary

- **Total files created:** 28 (4 files per MicroSim x 7 MicroSims)
- **Directories created:** 7
- **Files modified:** 2 (chapter index.md, mkdocs.yml)
- **Pending updates:** 1 (docs/sims/index.md - need to add card entries)

## Concepts Covered

The MicroSims support teaching these Chapter 12 concepts:
- Experimental Units and Subjects
- Treatment, Factor, Levels of a Factor
- Placebo and Placebo Effect
- Control Group and Comparison in Experiments
- Blinding, Single-Blind, Double-Blind Experiment
- Random Assignment and Why Randomize
- Completely Randomized Design
- Randomized Block Design
- Matched Pairs Design
- Replication
