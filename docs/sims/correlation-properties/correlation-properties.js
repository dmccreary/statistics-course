// Correlation Properties Explorer MicroSim
// Students investigate how changing data affects the correlation coefficient
// Learning Objective: Analyze (Bloom Level 4) - Students will investigate how
// changing data affects the correlation coefficient and develop intuition for correlation properties.
// MicroSim template version 2026.02

// ===== CANVAS DIMENSIONS =====
let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

// ===== PLOT LAYOUT =====
let plotX = 50;
let plotY = 50;
let plotWidth, plotHeight;
let axisLabelPadding = 30;

// ===== DATA =====
let dataPoints = [];
let outlierPoint = null;
let showOutlier = false;
let isDragging = false;
let draggedIndex = -1;
let pointRadius = 10;

// ===== UNITS =====
let unitOptions = [
  { name: "Original (0-100)", xLabel: "X Value", yLabel: "Y Value", xScale: 1, xOffset: 0, yScale: 1, yOffset: 0 },
  { name: "Scaled x2", xLabel: "X Value (x2)", yLabel: "Y Value (x2)", xScale: 2, xOffset: 0, yScale: 2, yOffset: 0 },
  { name: "Shifted +50", xLabel: "X Value (+50)", yLabel: "Y Value (+50)", xScale: 1, xOffset: 50, yScale: 1, yOffset: 50 },
  { name: "Celsius/Fahrenheit", xLabel: "Temp (C)", yLabel: "Score", xScale: 1.8, xOffset: 32, yScale: 1, yOffset: 0 }
];
let currentUnitIndex = 0;

// ===== AXES SWAP =====
let axesSwapped = false;

// ===== BEFORE/AFTER COMPARISON =====
let beforeR = null;
let lastAction = "";

// ===== BUTTON DEFINITIONS =====
let buttons = [];

// ===== THEME COLORS =====
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Initialize with sample data showing moderate positive correlation
  initializeData();

  // Calculate initial correlation for comparison
  beforeR = calculateCorrelation();

  describe('Interactive correlation properties explorer. Drag points to see how r-value changes. Toggle outlier, swap axes, and change units to explore correlation properties.', LABEL);
}

function initializeData() {
  dataPoints = [];

  // Create 8 points with moderate positive correlation
  let baseX = [15, 25, 35, 45, 55, 65, 75, 85];
  let baseY = [20, 30, 35, 50, 55, 60, 75, 80];

  // Add some noise
  for (let i = 0; i < baseX.length; i++) {
    dataPoints.push({
      x: baseX[i] + random(-5, 5),
      y: baseY[i] + random(-5, 5)
    });
  }

  // Create outlier point (but not shown by default)
  outlierPoint = { x: 80, y: 20 }; // Low y, high x - will reduce positive correlation
}

function updateLayout() {
  plotWidth = canvasWidth - plotX - margin - 180; // Leave room for info panel
  plotHeight = drawHeight - plotY - 50;

  // Button layout
  let btnY1 = drawHeight + 12;
  let btnY2 = drawHeight + 52;
  let btnHeight = 30;
  let btnSpacing = 8;

  buttons = [
    // Row 1
    { x: 10, y: btnY1, w: 100, h: btnHeight, label: showOutlier ? "Hide Outlier" : "Add Outlier", action: "outlier" },
    { x: 118, y: btnY1, w: 90, h: btnHeight, label: "Swap Axes", action: "swap" },
    { x: 216, y: btnY1, w: 100, h: btnHeight, label: "Reset Points", action: "reset" },
    { x: 324, y: btnY1, w: 110, h: btnHeight, label: "Add Random Pt", action: "addRandom" },

    // Row 2 - Unit buttons
    { x: 10, y: btnY2, w: 100, h: btnHeight, label: "Original", action: "unit0", unitIndex: 0 },
    { x: 118, y: btnY2, w: 90, h: btnHeight, label: "Scale x2", action: "unit1", unitIndex: 1 },
    { x: 216, y: btnY2, w: 100, h: btnHeight, label: "Shift +50", action: "unit2", unitIndex: 2 },
    { x: 324, y: btnY2, w: 110, h: btnHeight, label: "C to F", action: "unit3", unitIndex: 3 }
  ];
}

function draw() {
  updateCanvasSize();
  updateLayout();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Correlation Properties Explorer', (canvasWidth - 180) / 2, 10);

  // Draw scatterplot
  drawPlot();

  // Draw info panel
  drawInfoPanel();

  // Draw buttons
  drawButtons();

  // Draw instructions
  fill('#666');
  textSize(11);
  textAlign(LEFT, BOTTOM);
  text('Drag points to explore how r changes. Toggle outlier to see its impact on correlation.', 10, drawHeight - 5);
}

function drawPlot() {
  // Plot background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(plotX, plotY, plotWidth, plotHeight);

  // Get current unit transformation
  let unit = unitOptions[currentUnitIndex];

  // Draw grid lines
  stroke(230);
  strokeWeight(1);
  for (let i = 0; i <= 5; i++) {
    let x = plotX + (i / 5) * plotWidth;
    let y = plotY + (i / 5) * plotHeight;
    line(x, plotY, x, plotY + plotHeight);
    line(plotX, y, plotX + plotWidth, y);
  }

  // Draw axes
  stroke(100);
  strokeWeight(2);
  line(plotX, plotY + plotHeight, plotX + plotWidth, plotY + plotHeight); // x-axis
  line(plotX, plotY, plotX, plotY + plotHeight); // y-axis

  // Axis labels with current units
  fill(80);
  noStroke();
  textSize(12);

  let xLabel = axesSwapped ? unit.yLabel : unit.xLabel;
  let yLabel = axesSwapped ? unit.xLabel : unit.yLabel;

  textAlign(CENTER, TOP);
  text(xLabel, plotX + plotWidth / 2, plotY + plotHeight + 5);

  push();
  translate(plotX - 25, plotY + plotHeight / 2);
  rotate(-PI / 2);
  textAlign(CENTER, BOTTOM);
  text(yLabel, 0, 0);
  pop();

  // Draw tick marks and labels
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = 0; i <= 5; i++) {
    let rawVal = i * 20;
    let displayVal = rawVal * unit.xScale + unit.xOffset;
    if (axesSwapped) displayVal = rawVal * unit.yScale + unit.yOffset;

    let x = plotX + (i / 5) * plotWidth;
    stroke(100);
    line(x, plotY + plotHeight, x, plotY + plotHeight + 3);
    noStroke();
    fill(80);
    text(displayVal.toFixed(0), x, plotY + plotHeight + 5);
  }

  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 5; i++) {
    let rawVal = (5 - i) * 20;
    let displayVal = rawVal * unit.yScale + unit.yOffset;
    if (axesSwapped) displayVal = rawVal * unit.xScale + unit.xOffset;

    let y = plotY + (i / 5) * plotHeight;
    stroke(100);
    line(plotX - 3, y, plotX, y);
    noStroke();
    fill(80);
    text(displayVal.toFixed(0), plotX - 5, y);
  }

  // Calculate correlation for color gradient
  let r = calculateCorrelation();
  let contributions = calculateContributions();

  // Draw data points
  for (let i = 0; i < dataPoints.length; i++) {
    let pt = dataPoints[i];
    let px = axesSwapped ? pt.y : pt.x;
    let py = axesSwapped ? pt.x : pt.y;

    let screenX = map(px, 0, 100, plotX, plotX + plotWidth);
    let screenY = map(py, 0, 100, plotY + plotHeight, plotY);

    // Color based on contribution to r
    let contrib = contributions[i] || 0;
    let pointColor;
    if (contrib > 0.1) {
      // Strong positive contribution - green
      let intensity = map(abs(contrib), 0.1, 1, 100, 255);
      pointColor = color(50, intensity, 50);
    } else if (contrib < -0.1) {
      // Strong negative contribution - red
      let intensity = map(abs(contrib), 0.1, 1, 100, 255);
      pointColor = color(intensity, 50, 50);
    } else {
      // Neutral - blue
      pointColor = color(100, 150, 200);
    }

    // Highlight if being dragged
    if (i === draggedIndex && isDragging) {
      stroke(sylviaAuburn);
      strokeWeight(3);
    } else {
      stroke(80);
      strokeWeight(1);
    }

    fill(pointColor);
    circle(screenX, screenY, pointRadius * 2);
  }

  // Draw outlier if visible
  if (showOutlier && outlierPoint) {
    let px = axesSwapped ? outlierPoint.y : outlierPoint.x;
    let py = axesSwapped ? outlierPoint.x : outlierPoint.y;

    let screenX = map(px, 0, 100, plotX, plotX + plotWidth);
    let screenY = map(py, 0, 100, plotY + plotHeight, plotY);

    stroke(200, 50, 50);
    strokeWeight(2);
    fill(255, 100, 100);
    circle(screenX, screenY, pointRadius * 2);

    // Label it
    noStroke();
    fill(200, 50, 50);
    textSize(10);
    textAlign(LEFT, CENTER);
    text("Outlier", screenX + pointRadius + 3, screenY);
  }
}

function drawInfoPanel() {
  let panelX = canvasWidth - 175;
  let panelY = 45;
  let panelW = 165;
  let panelH = drawHeight - 55;

  // Panel background
  fill(250, 252, 255);
  stroke(200, 210, 220);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  // Current r-value
  let r = calculateCorrelation();

  fill(40);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text("Correlation", panelX + panelW / 2, panelY + 10);

  // Large r display
  textSize(36);
  let rColor = r > 0 ? color(50, 150, 50) : color(150, 50, 50);
  if (abs(r) < 0.1) rColor = color(100, 100, 100);
  fill(rColor);
  text("r = " + r.toFixed(3), panelX + panelW / 2, panelY + 30);

  // Strength interpretation
  textSize(12);
  fill(80);
  let strength = getStrengthInterpretation(r);
  text(strength, panelX + panelW / 2, panelY + 75);

  // Before/After comparison
  if (beforeR !== null && abs(beforeR - r) > 0.001) {
    textSize(11);
    fill(100);
    textAlign(LEFT, TOP);
    text("Before: " + beforeR.toFixed(3), panelX + 10, panelY + 105);
    text("After:  " + r.toFixed(3), panelX + 10, panelY + 120);

    let delta = r - beforeR;
    fill(delta > 0 ? color(50, 150, 50) : color(150, 50, 50));
    text("Change: " + (delta > 0 ? "+" : "") + delta.toFixed(3), panelX + 10, panelY + 135);

    if (lastAction) {
      fill(sylviaAuburn);
      textSize(10);
      text("(" + lastAction + ")", panelX + 10, panelY + 150);
    }
  }

  // Properties reminder
  textAlign(CENTER, TOP);
  fill(70);
  textSize(11);
  let propY = panelY + panelH - 120;

  text("Properties of r:", panelX + panelW / 2, propY);

  textAlign(LEFT, TOP);
  fill(90);
  textSize(10);
  text("- Always between -1 and 1", panelX + 8, propY + 18);
  text("- Unitless (units don't", panelX + 8, propY + 32);
  text("  change r)", panelX + 8, propY + 44);
  text("- Symmetric (swap axes,", panelX + 8, propY + 58);
  text("  same r)", panelX + 8, propY + 70);
  text("- Sensitive to outliers", panelX + 8, propY + 84);

  // Point count
  textAlign(CENTER, BOTTOM);
  fill(100);
  textSize(10);
  let n = dataPoints.length + (showOutlier ? 1 : 0);
  text("n = " + n + " points", panelX + panelW / 2, panelY + panelH - 5);
}

function drawButtons() {
  for (let btn of buttons) {
    let isHovered = mouseX > btn.x && mouseX < btn.x + btn.w &&
                    mouseY > btn.y && mouseY < btn.y + btn.h;

    // Button styling
    if (btn.action === "outlier") {
      fill(isHovered ? '#FFD0D0' : '#FFE0E0');
      stroke('#D0A0A0');
      if (showOutlier) {
        fill(isHovered ? '#FFCCCC' : '#FFDDDD');
      }
    } else if (btn.action.startsWith("unit")) {
      let idx = btn.unitIndex;
      if (idx === currentUnitIndex) {
        fill(isHovered ? '#C0E0C0' : '#D0F0D0');
        stroke('#90C090');
      } else {
        fill(isHovered ? '#E8E8E8' : '#F0F0F0');
        stroke('#C0C0C0');
      }
    } else if (btn.action === "reset") {
      fill(isHovered ? '#D0D0FF' : '#E0E0FF');
      stroke('#A0A0D0');
    } else if (btn.action === "addRandom") {
      fill(isHovered ? '#D0FFD0' : '#E0FFE0');
      stroke('#A0D0A0');
    } else if (btn.action === "swap") {
      fill(isHovered ? '#FFE8D0' : '#FFF0E0');
      stroke('#D0C0A0');
      if (axesSwapped) {
        fill(isHovered ? '#FFE0C0' : '#FFE8D0');
      }
    } else {
      fill(isHovered ? '#E0E0E0' : '#F0F0F0');
      stroke('#C0C0C0');
    }

    strokeWeight(1);
    rect(btn.x, btn.y, btn.w, btn.h, 5);

    // Button text
    fill(40);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
  }

  // Labels for button groups
  fill(80);
  textSize(10);
  textAlign(LEFT, BOTTOM);
  text("Units:", 10, drawHeight + 50);
}

function calculateCorrelation() {
  let allPoints = [...dataPoints];
  if (showOutlier && outlierPoint) {
    allPoints.push(outlierPoint);
  }

  if (allPoints.length < 2) return 0;

  let n = allPoints.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

  for (let pt of allPoints) {
    let x = axesSwapped ? pt.y : pt.x;
    let y = axesSwapped ? pt.x : pt.y;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
    sumY2 += y * y;
  }

  let numerator = n * sumXY - sumX * sumY;
  let denominator = sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  if (denominator === 0) return 0;
  return numerator / denominator;
}

function calculateContributions() {
  let allPoints = [...dataPoints];
  if (showOutlier && outlierPoint) {
    allPoints.push(outlierPoint);
  }

  if (allPoints.length < 2) return [];

  // Calculate means
  let meanX = 0, meanY = 0;
  for (let pt of allPoints) {
    let x = axesSwapped ? pt.y : pt.x;
    let y = axesSwapped ? pt.x : pt.y;
    meanX += x;
    meanY += y;
  }
  meanX /= allPoints.length;
  meanY /= allPoints.length;

  // Calculate standard deviations
  let varX = 0, varY = 0;
  for (let pt of allPoints) {
    let x = axesSwapped ? pt.y : pt.x;
    let y = axesSwapped ? pt.x : pt.y;
    varX += (x - meanX) * (x - meanX);
    varY += (y - meanY) * (y - meanY);
  }
  let sdX = sqrt(varX / (allPoints.length - 1));
  let sdY = sqrt(varY / (allPoints.length - 1));

  if (sdX === 0 || sdY === 0) return [];

  // Calculate z-score products for each point (contribution to r)
  let contributions = [];
  for (let i = 0; i < dataPoints.length; i++) {
    let pt = dataPoints[i];
    let x = axesSwapped ? pt.y : pt.x;
    let y = axesSwapped ? pt.x : pt.y;
    let zx = (x - meanX) / sdX;
    let zy = (y - meanY) / sdY;
    contributions.push(zx * zy / (allPoints.length - 1));
  }

  return contributions;
}

function getStrengthInterpretation(r) {
  let absR = abs(r);
  let direction = r > 0 ? "Positive" : "Negative";
  if (abs(r) < 0.1) direction = "No";

  if (absR >= 0.8) return "Strong " + direction.toLowerCase();
  if (absR >= 0.5) return "Moderate " + direction.toLowerCase();
  if (absR >= 0.3) return "Weak " + direction.toLowerCase();
  return "Little to no linear relationship";
}

function mousePressed() {
  // Check if clicking in plot area
  if (mouseX > plotX && mouseX < plotX + plotWidth &&
      mouseY > plotY && mouseY < plotY + plotHeight) {

    // Check for point dragging
    for (let i = 0; i < dataPoints.length; i++) {
      let pt = dataPoints[i];
      let px = axesSwapped ? pt.y : pt.x;
      let py = axesSwapped ? pt.x : pt.y;

      let screenX = map(px, 0, 100, plotX, plotX + plotWidth);
      let screenY = map(py, 0, 100, plotY + plotHeight, plotY);

      if (dist(mouseX, mouseY, screenX, screenY) < pointRadius + 5) {
        isDragging = true;
        draggedIndex = i;
        beforeR = calculateCorrelation();
        lastAction = "Moved point";
        return;
      }
    }

    // Check if clicking on outlier
    if (showOutlier && outlierPoint) {
      let px = axesSwapped ? outlierPoint.y : outlierPoint.x;
      let py = axesSwapped ? outlierPoint.x : outlierPoint.y;

      let screenX = map(px, 0, 100, plotX, plotX + plotWidth);
      let screenY = map(py, 0, 100, plotY + plotHeight, plotY);

      if (dist(mouseX, mouseY, screenX, screenY) < pointRadius + 5) {
        isDragging = true;
        draggedIndex = -2; // Special index for outlier
        beforeR = calculateCorrelation();
        lastAction = "Moved outlier";
        return;
      }
    }
  }

  // Check button clicks
  for (let btn of buttons) {
    if (mouseX > btn.x && mouseX < btn.x + btn.w &&
        mouseY > btn.y && mouseY < btn.y + btn.h) {
      handleButtonClick(btn.action);
      return;
    }
  }
}

function mouseDragged() {
  if (!isDragging) return;

  // Convert screen coordinates to data coordinates
  let dataX = map(mouseX, plotX, plotX + plotWidth, 0, 100);
  let dataY = map(mouseY, plotY + plotHeight, plotY, 0, 100);

  // Clamp to plot bounds
  dataX = constrain(dataX, 0, 100);
  dataY = constrain(dataY, 0, 100);

  // Handle axes swap
  if (axesSwapped) {
    [dataX, dataY] = [dataY, dataX];
  }

  if (draggedIndex === -2 && outlierPoint) {
    // Dragging outlier
    outlierPoint.x = dataX;
    outlierPoint.y = dataY;
  } else if (draggedIndex >= 0 && draggedIndex < dataPoints.length) {
    // Dragging regular point
    dataPoints[draggedIndex].x = dataX;
    dataPoints[draggedIndex].y = dataY;
  }
}

function mouseReleased() {
  isDragging = false;
  draggedIndex = -1;
}

function handleButtonClick(action) {
  beforeR = calculateCorrelation();

  if (action === "outlier") {
    showOutlier = !showOutlier;
    lastAction = showOutlier ? "Added outlier" : "Removed outlier";
    // Update button label
    for (let btn of buttons) {
      if (btn.action === "outlier") {
        btn.label = showOutlier ? "Hide Outlier" : "Add Outlier";
      }
    }
  } else if (action === "swap") {
    axesSwapped = !axesSwapped;
    lastAction = "Swapped axes";
    // Note: correlation should remain the same!
  } else if (action === "reset") {
    initializeData();
    showOutlier = false;
    axesSwapped = false;
    currentUnitIndex = 0;
    beforeR = null;
    lastAction = "";
  } else if (action === "addRandom") {
    // Add a random point
    let newPt = {
      x: random(10, 90),
      y: random(10, 90)
    };
    dataPoints.push(newPt);
    lastAction = "Added point";
  } else if (action.startsWith("unit")) {
    let idx = parseInt(action.charAt(4));
    if (idx >= 0 && idx < unitOptions.length) {
      currentUnitIndex = idx;
      lastAction = "Changed units";
      // Note: correlation should remain the same!
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayout();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
