---
title: Standard Deviation Visualization
description: Interactive histogram showing how standard deviation affects the spread of experimental data, with regenerate button, SD slider, and 1 SD width indicator.
image: /sims/standard-deviation/standard-deviation.png
og:image: /sims/standard-deviation/standard-deviation.png
twitter:image: /sims/standard-deviation/standard-deviation.png
social:
   cards: false
---

# Standard Deviation Visualization

<iframe src="main.html" height="525" width="100%" scrolling="no"></iframe>

[View Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim demonstrates the concept of **standard deviation** — a measure of how
spread out a set of experimental readings are around the mean. The histogram shows
300 randomly generated data points binned into equal intervals along the
"Experimental Value" axis. The shaded blue band marks the ±1 SD zone (containing
approximately 68% of all readings), and the double-headed arrow on the chart shows
the exact width of 1 standard deviation.

## How to Use

- **Slider** — drag left toward "Low Standard Deviation" to make the data cluster
  tightly around the mean, or drag right toward "High Standard Deviation" to spread
  it out. The "1 SD = X.X" arrow updates immediately.
- **Regenerate Data** button — click to draw a new random sample at the current SD
  setting. Use this to see how the same SD produces different-looking histograms each
  time (sampling variability).
- **Hover** over any bar to see the exact value range and count for that bin.

## Key Concepts

| Term | Meaning |
|------|---------|
| **Mean (μ)** | The center of the distribution (fixed at 50 in this sim) |
| **Standard deviation (σ)** | Average distance of each data point from the mean |
| **±1 SD zone** | The shaded region; contains ~68% of all data points |
| **Bin** | A 5-unit interval on the x-axis; bar height = count of readings in that interval |

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/biology/sims/standard-deviation/main.html"
        height="500"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level

9–12 (AP Biology, AP Statistics, or introductory data analysis)

### Duration

10–15 minutes

### Prerequisites

- Basic understanding of mean and average
- Familiarity with bar graphs and histograms

### Activities

1. **Predict** (2 min): Before moving the slider, ask students — "If every
   experimental reading gave exactly the same result, what would the histogram
   look like?"
2. **Explore low SD** (3 min): Move the slider to the far left. Observe the
   tall, narrow peak. Click Regenerate Data several times — does the shape
   change much?
3. **Explore high SD** (3 min): Move the slider to the far right. Notice how
   the bars flatten and widen. Where does the shaded ±1 SD band extend now?
4. **Connect to biology** (5 min): Discuss examples of low-SD vs. high-SD data
   in biology experiments — e.g., a precise pipette measurement (low SD) vs.
   individual organism body masses in a population (higher SD).

### Assessment

- Describe in one sentence what a large standard deviation tells you about an
  experiment's data.
- If the histogram is very wide and flat, is the standard deviation large or small?
- Why does clicking "Regenerate Data" with the same SD produce a slightly
  different histogram each time?

## References

1. [Standard Deviation — Wikipedia](https://en.wikipedia.org/wiki/Standard_deviation)
2. [Normal Distribution — Wikipedia](https://en.wikipedia.org/wiki/Normal_distribution)
3. [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
