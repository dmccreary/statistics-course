// Pie Chart vs Bar Graph Comparison MicroSim
// Students compare the effectiveness of pie charts vs bar graphs for different data scenarios
// Bloom Level: Analyze (L4), Verb: Compare, contrast
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 350;
let controlHeight = 190;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// Chart colors - colorblind-safe palette
let chartColors = ['#4e79a7', '#f28e2b', '#59a14f', '#e15759', '#76b7b2', '#edc948'];

// Category data
let categories = [
  { name: 'Cat A', value: 30 },
  { name: 'Cat B', value: 25 },
  { name: 'Cat C', value: 15 },
  { name: 'Cat D', value: 20 }
];

// UI elements
let presetDropdown;
let showPercentCheckbox;
let showValuesCheckbox;
let sliders = [];

// Presets
let presets = {
  'Easy to compare': [10, 25, 40, 15],
  'Similar values': [24, 26, 25, 25],
  'Many categories': [15, 12, 18, 10, 20, 25],
  'One dominant': [5, 8, 7, 80]
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Row 1: Preset dropdown and checkboxes
  presetDropdown = createSelect();
  presetDropdown.position(10, drawHeight + 8);
  presetDropdown.option('Custom');
  presetDropdown.option('Easy to compare');
  presetDropdown.option('Similar values');
  presetDropdown.option('Many categories');
  presetDropdown.option('One dominant');
  presetDropdown.selected('Custom');
  presetDropdown.changed(applyPreset);

  showPercentCheckbox = createCheckbox(' Show %', true);
  showPercentCheckbox.position(150, drawHeight + 8);
  showPercentCheckbox.style('font-size', '14px');

  showValuesCheckbox = createCheckbox(' Values', false);
  showValuesCheckbox.position(240, drawHeight + 8);
  showValuesCheckbox.style('font-size', '14px');

  // Rows 2-5: Category sliders
  for (let i = 0; i < 4; i++) {
    let slider = createSlider(0, 50, categories[i].value, 1);
    slider.position(sliderLeftMargin, drawHeight + 45 + i * 35);
    slider.size(canvasWidth - sliderLeftMargin - margin);
    slider.input(() => {
      presetDropdown.selected('Custom');
    });
    sliders.push(slider);
  }

  describe('Interactive comparison of pie chart and bar graph showing the same data. Adjust category values using sliders or select presets to see which chart type is easier to read.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Update categories from sliders
  for (let i = 0; i < sliders.length; i++) {
    categories[i].value = sliders[i].value();
  }

  // Calculate total
  let total = categories.reduce((sum, cat) => sum + cat.value, 0);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Pie Chart vs Bar Graph Comparison', canvasWidth / 2, 8);

  // Draw subtitle with data insight
  textSize(14);
  fill('#666');
  let insight = getDataInsight();
  text(insight, canvasWidth / 2, 32);

  // Calculate chart areas
  let chartAreaWidth = (canvasWidth - margin * 3) / 2;
  let chartAreaHeight = drawHeight - 80;
  let leftChartX = margin;
  let rightChartX = margin * 2 + chartAreaWidth;
  let chartY = 55;

  // Draw pie chart on left
  drawPieChart(leftChartX, chartY, chartAreaWidth, chartAreaHeight, total);

  // Draw bar graph on right
  drawBarGraph(rightChartX, chartY, chartAreaWidth, chartAreaHeight, total);

  // Draw legend at bottom of drawing area
  drawLegend(margin, drawHeight - 25, canvasWidth - margin * 2);

  // Draw slider labels
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(14);
  for (let i = 0; i < sliders.length; i++) {
    text(categories[i].name + ': ' + categories[i].value, 10, drawHeight + 60 + i * 35);
  }

  // Draw preset label
  textSize(12);
  fill('#666');
  text('Preset:', 10, drawHeight + 22);
}

function drawPieChart(x, y, w, h, total) {
  let centerX = x + w / 2;
  let centerY = y + h / 2;
  let radius = min(w, h) / 2 - 20;

  // Chart title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(16);
  text('Pie Chart', centerX, y);

  if (total === 0) {
    fill('#999');
    textSize(14);
    textAlign(CENTER, CENTER);
    text('No data', centerX, centerY);
    return;
  }

  let startAngle = -HALF_PI;
  let showPercent = showPercentCheckbox.checked();
  let showValues = showValuesCheckbox.checked();

  for (let i = 0; i < categories.length; i++) {
    let sweepAngle = (categories[i].value / total) * TWO_PI;

    // Draw wedge
    fill(chartColors[i]);
    stroke('white');
    strokeWeight(2);
    arc(centerX, centerY, radius * 2, radius * 2, startAngle, startAngle + sweepAngle, PIE);

    // Draw label if wedge is large enough
    if (sweepAngle > 0.15) {
      let labelAngle = startAngle + sweepAngle / 2;
      let labelRadius = radius * 0.65;
      let labelX = centerX + cos(labelAngle) * labelRadius;
      let labelY = centerY + sin(labelAngle) * labelRadius;

      noStroke();
      fill('white');
      textAlign(CENTER, CENTER);
      textSize(12);

      let label = '';
      if (showPercent) {
        let percent = ((categories[i].value / total) * 100).toFixed(0);
        label = percent + '%';
      }
      if (showValues) {
        if (label) label += '\n';
        label += categories[i].value;
      }
      if (label) {
        // Draw background for readability
        let lines = label.split('\n');
        for (let j = 0; j < lines.length; j++) {
          text(lines[j], labelX, labelY + (j - (lines.length - 1) / 2) * 14);
        }
      }
    }

    startAngle += sweepAngle;
  }
}

function drawBarGraph(x, y, w, h, total) {
  let chartX = x + 30;
  let chartY = y + 25;
  let chartWidth = w - 40;
  let chartHeight = h - 50;

  // Chart title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(16);
  text('Bar Graph', x + w / 2, y);

  if (total === 0) {
    fill('#999');
    textSize(14);
    textAlign(CENTER, CENTER);
    text('No data', x + w / 2, y + h / 2);
    return;
  }

  // Find max value for scaling
  let maxValue = max(categories.map(c => c.value));
  if (maxValue === 0) maxValue = 1;

  // Draw axes
  stroke('#999');
  strokeWeight(1);
  line(chartX, chartY, chartX, chartY + chartHeight);
  line(chartX, chartY + chartHeight, chartX + chartWidth, chartY + chartHeight);

  // Draw y-axis labels
  noStroke();
  fill('#666');
  textAlign(RIGHT, CENTER);
  textSize(10);
  for (let i = 0; i <= 4; i++) {
    let yVal = (maxValue * i / 4);
    let yPos = chartY + chartHeight - (chartHeight * i / 4);
    text(yVal.toFixed(0), chartX - 5, yPos);
    stroke('#ddd');
    strokeWeight(0.5);
    line(chartX, yPos, chartX + chartWidth, yPos);
    noStroke();
  }

  // Draw bars
  let barWidth = (chartWidth - 20) / categories.length - 10;
  let showPercent = showPercentCheckbox.checked();
  let showValues = showValuesCheckbox.checked();

  for (let i = 0; i < categories.length; i++) {
    let barHeight = (categories[i].value / maxValue) * chartHeight;
    let barX = chartX + 15 + i * (barWidth + 10);
    let barY = chartY + chartHeight - barHeight;

    // Draw bar
    fill(chartColors[i]);
    noStroke();
    rect(barX, barY, barWidth, barHeight);

    // Draw category label
    fill('#333');
    textAlign(CENTER, TOP);
    textSize(11);
    text(categories[i].name, barX + barWidth / 2, chartY + chartHeight + 5);

    // Draw value/percent on bar
    if (barHeight > 30) {
      fill('white');
      textAlign(CENTER, BOTTOM);
      textSize(11);
      let label = '';
      if (showValues) {
        label = categories[i].value.toString();
      }
      if (showPercent) {
        let percent = ((categories[i].value / total) * 100).toFixed(0);
        if (label) label += ' (' + percent + '%)';
        else label = percent + '%';
      }
      if (label) {
        text(label, barX + barWidth / 2, barY + barHeight - 5);
      }
    } else if (barHeight > 0) {
      // Draw above bar if too short
      fill('#333');
      textAlign(CENTER, BOTTOM);
      textSize(10);
      if (showValues || showPercent) {
        let label = showValues ? categories[i].value.toString() : '';
        if (showPercent) {
          let percent = ((categories[i].value / total) * 100).toFixed(0);
          label = label ? label + ' (' + percent + '%)' : percent + '%';
        }
        text(label, barX + barWidth / 2, barY - 2);
      }
    }
  }
}

function drawLegend(x, y, w) {
  let legendItemWidth = w / categories.length;

  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);

  for (let i = 0; i < categories.length; i++) {
    let itemX = x + i * legendItemWidth;

    // Color box
    fill(chartColors[i]);
    rect(itemX, y - 6, 12, 12, 2);

    // Label
    fill('#333');
    text(categories[i].name, itemX + 16, y);
  }
}

function getDataInsight() {
  let total = categories.reduce((sum, cat) => sum + cat.value, 0);
  if (total === 0) return 'Add values to compare charts';

  let values = categories.map(c => c.value);
  let maxVal = max(values);
  let minVal = min(values);
  let range = maxVal - minVal;
  let avgDiff = range / (total / categories.length);

  if (maxVal > total * 0.6) {
    return 'Dominant category - Both charts show this clearly';
  } else if (range < total * 0.1) {
    return 'Similar values - Bar graph easier to compare small differences';
  } else if (avgDiff > 0.5) {
    return 'Varied values - Bar graph better for precise comparison';
  } else {
    return 'Moderate differences - Compare which feels easier to read';
  }
}

function applyPreset() {
  let selected = presetDropdown.value();
  if (selected === 'Custom') return;

  let values = presets[selected];

  // Update number of categories if needed
  while (categories.length < values.length) {
    categories.push({ name: 'Cat ' + String.fromCharCode(65 + categories.length), value: 0 });
    if (sliders.length < categories.length) {
      let i = sliders.length;
      let slider = createSlider(0, 50, values[i], 1);
      slider.position(sliderLeftMargin, drawHeight + 45 + i * 35);
      slider.size(canvasWidth - sliderLeftMargin - margin);
      slider.input(() => {
        presetDropdown.selected('Custom');
      });
      sliders.push(slider);
    }
  }

  // Update slider values
  for (let i = 0; i < values.length && i < sliders.length; i++) {
    sliders[i].value(values[i]);
    categories[i].value = values[i];
  }

  // Hide extra sliders if fewer categories
  for (let i = values.length; i < sliders.length; i++) {
    sliders[i].value(0);
    categories[i].value = 0;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);

  // Resize all sliders
  for (let i = 0; i < sliders.length; i++) {
    sliders[i].size(canvasWidth - sliderLeftMargin - margin);
  }

  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
