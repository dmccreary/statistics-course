// Interactive Bar Graph Builder MicroSim
// Students construct bar graphs from categorical data
// Uses canvas-based UI controls (no DOM elements)
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 800;
let canvasHeight = 500;
let margin = 20;
let defaultTextSize = 16;

// Layout: Left 60% for graph, Right 40% for controls
let graphPanelWidth;
let controlPanelX;
let controlPanelWidth;

// Category data - default: Spring(8), Summer(22), Fall(14), Winter(6)
let categories = [
  { name: 'Spring', value: 8 },
  { name: 'Summer', value: 22 },
  { name: 'Fall', value: 14 },
  { name: 'Winter', value: 6 }
];
const MAX_CATEGORIES = 6;
const MAX_VALUE = 100;

// Display options
let isVertical = true;
let showRelativeFrequency = false;
let barColor;

// Input field states
let activeField = null; // 'name-0', 'value-0', etc.
let inputBuffer = '';
let cursorBlink = 0;

// Color picker state
let colorPickerOpen = false;
let colorOptions = [
  '#4682B4', // steelblue (default)
  '#CD5C5C', // indianred
  '#3CB371', // mediumseagreen
  '#9370DB', // mediumpurple
  '#FF8C00', // darkorange
  '#20B2AA', // lightseagreen
  '#DC143C', // crimson
  '#6B8E23'  // olivedrab
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  barColor = color('#4682B4'); // steelblue default
  textFont('Arial');

  describe('Interactive bar graph builder where students enter category names and frequencies to construct bar graphs. Supports vertical and horizontal orientations, frequency and relative frequency views.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Calculate panel dimensions
  graphPanelWidth = canvasWidth * 0.6;
  controlPanelX = graphPanelWidth;
  controlPanelWidth = canvasWidth * 0.4;

  // Background
  background(255);

  // Draw graph panel
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, graphPanelWidth, canvasHeight);

  // Draw control panel
  fill(248, 248, 248);
  rect(controlPanelX, 0, controlPanelWidth, canvasHeight);

  // Draw the bar graph
  drawBarGraph();

  // Draw control panel UI
  drawControlPanel();

  // Cursor blink for active input
  cursorBlink = (cursorBlink + 1) % 60;
}

function drawBarGraph() {
  let graphMargin = 60;
  let graphLeft = graphMargin;
  let graphRight = graphPanelWidth - 40;
  let graphTop = 60;
  let graphBottom = canvasHeight - 60;
  let graphWidth = graphRight - graphLeft;
  let graphHeight = graphBottom - graphTop;

  // Title
  fill(0);
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  text('Bar Graph Builder', graphPanelWidth / 2, 15);

  // Calculate max value for scaling
  let maxVal = 0;
  let total = 0;
  for (let cat of categories) {
    if (cat.value > maxVal) maxVal = cat.value;
    total += cat.value;
  }
  if (maxVal === 0) maxVal = 10; // Prevent division by zero
  if (total === 0) total = 1;

  // Draw grid lines
  stroke(220);
  strokeWeight(1);
  let numGridLines = 5;

  if (isVertical) {
    // Vertical bars: Y-axis for values, X-axis for categories

    // Y-axis grid lines and labels
    textSize(12);
    textAlign(RIGHT, CENTER);
    fill(100);
    noStroke();

    for (let i = 0; i <= numGridLines; i++) {
      let y = graphBottom - (i / numGridLines) * graphHeight;
      stroke(220);
      line(graphLeft, y, graphRight, y);
      noStroke();

      let labelVal;
      if (showRelativeFrequency) {
        labelVal = (i / numGridLines * 100).toFixed(0) + '%';
      } else {
        labelVal = (i / numGridLines * maxVal).toFixed(0);
      }
      text(labelVal, graphLeft - 5, y);
    }

    // Y-axis label
    push();
    translate(15, graphTop + graphHeight / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(showRelativeFrequency ? 'Relative Frequency (%)' : 'Frequency', 0, 0);
    pop();

    // Draw axes
    stroke(0);
    strokeWeight(2);
    line(graphLeft, graphTop, graphLeft, graphBottom);
    line(graphLeft, graphBottom, graphRight, graphBottom);

    // Draw bars
    let barSpacing = graphWidth / categories.length;
    let barWidth = barSpacing * 0.7;

    for (let i = 0; i < categories.length; i++) {
      let cat = categories[i];
      let barHeight;
      if (showRelativeFrequency) {
        barHeight = (cat.value / total) * graphHeight;
      } else {
        barHeight = (cat.value / maxVal) * graphHeight;
      }

      let x = graphLeft + i * barSpacing + (barSpacing - barWidth) / 2;
      let y = graphBottom - barHeight;

      // Bar
      fill(barColor);
      stroke(0);
      strokeWeight(1);
      rect(x, y, barWidth, barHeight);

      // Category label
      fill(0);
      noStroke();
      textSize(12);
      textAlign(CENTER, TOP);
      text(cat.name, x + barWidth / 2, graphBottom + 5);

      // Value label on bar
      textAlign(CENTER, BOTTOM);
      if (showRelativeFrequency) {
        let pct = total > 0 ? (cat.value / total * 100).toFixed(1) : '0.0';
        text(pct + '%', x + barWidth / 2, y - 2);
      } else {
        text(cat.value, x + barWidth / 2, y - 2);
      }
    }

    // X-axis label
    textSize(14);
    textAlign(CENTER, TOP);
    text('Category', graphLeft + graphWidth / 2, graphBottom + 35);

  } else {
    // Horizontal bars: X-axis for values, Y-axis for categories

    // X-axis grid lines and labels
    textSize(12);
    textAlign(CENTER, TOP);
    fill(100);

    for (let i = 0; i <= numGridLines; i++) {
      let x = graphLeft + (i / numGridLines) * graphWidth;
      stroke(220);
      line(x, graphTop, x, graphBottom);
      noStroke();

      let labelVal;
      if (showRelativeFrequency) {
        labelVal = (i / numGridLines * 100).toFixed(0) + '%';
      } else {
        labelVal = (i / numGridLines * maxVal).toFixed(0);
      }
      text(labelVal, x, graphBottom + 5);
    }

    // X-axis label
    textSize(14);
    textAlign(CENTER, TOP);
    text(showRelativeFrequency ? 'Relative Frequency (%)' : 'Frequency', graphLeft + graphWidth / 2, graphBottom + 25);

    // Draw axes
    stroke(0);
    strokeWeight(2);
    line(graphLeft, graphTop, graphLeft, graphBottom);
    line(graphLeft, graphBottom, graphRight, graphBottom);

    // Draw bars
    let barSpacing = graphHeight / categories.length;
    let barHeight = barSpacing * 0.7;

    for (let i = 0; i < categories.length; i++) {
      let cat = categories[i];
      let barWidth;
      if (showRelativeFrequency) {
        barWidth = (cat.value / total) * graphWidth;
      } else {
        barWidth = (cat.value / maxVal) * graphWidth;
      }

      let x = graphLeft;
      let y = graphTop + i * barSpacing + (barSpacing - barHeight) / 2;

      // Bar
      fill(barColor);
      stroke(0);
      strokeWeight(1);
      rect(x, y, barWidth, barHeight);

      // Category label
      fill(0);
      noStroke();
      textSize(12);
      textAlign(RIGHT, CENTER);
      text(cat.name, graphLeft - 5, y + barHeight / 2);

      // Value label on bar
      textAlign(LEFT, CENTER);
      if (showRelativeFrequency) {
        let pct = total > 0 ? (cat.value / total * 100).toFixed(1) : '0.0';
        text(pct + '%', x + barWidth + 3, y + barHeight / 2);
      } else {
        text(cat.value, x + barWidth + 3, y + barHeight / 2);
      }
    }
  }
}

function drawControlPanel() {
  let panelMargin = 15;
  let x = controlPanelX + panelMargin;
  let y = 15;
  let fieldWidth = controlPanelWidth - panelMargin * 2;

  // Panel title
  fill(0);
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  text('Data Input', x, y);
  y += 30;

  // Category inputs
  textSize(14);
  text('Categories:', x, y);
  y += 22;

  let nameFieldWidth = (fieldWidth - 20) * 0.6;
  let valueFieldWidth = (fieldWidth - 20) * 0.35;

  // Column headers
  textSize(12);
  fill(100);
  text('Name', x, y);
  text('Freq', x + nameFieldWidth + 10, y);
  y += 18;

  // Draw input fields for each category
  for (let i = 0; i < categories.length; i++) {
    drawInputField(x, y, nameFieldWidth, 24, 'name-' + i, categories[i].name);
    drawInputField(x + nameFieldWidth + 10, y, valueFieldWidth, 24, 'value-' + i, categories[i].value.toString());
    y += 30;
  }

  y += 10;

  // Add/Remove category buttons
  let btnWidth = (fieldWidth - 10) / 2;
  drawButton(x, y, btnWidth, 28, 'Add Category', categories.length < MAX_CATEGORIES);
  drawButton(x + btnWidth + 10, y, btnWidth, 28, 'Remove', categories.length > 1);
  y += 45;

  // Separator line
  stroke(200);
  line(x, y, x + fieldWidth, y);
  y += 15;

  // Display options section
  fill(0);
  noStroke();
  textSize(14);
  text('Display Options:', x, y);
  y += 25;

  // Frequency type radio buttons
  textSize(12);
  drawRadioButton(x, y, 'Frequency', !showRelativeFrequency, 'freq');
  drawRadioButton(x + 100, y, 'Relative Freq', showRelativeFrequency, 'relfreq');
  y += 30;

  // Orientation radio buttons
  drawRadioButton(x, y, 'Vertical', isVertical, 'vertical');
  drawRadioButton(x + 100, y, 'Horizontal', !isVertical, 'horizontal');
  y += 35;

  // Color picker
  textSize(12);
  fill(100);
  text('Bar Color:', x, y + 8);

  // Color swatch button
  let swatchX = x + 70;
  let swatchSize = 24;
  fill(barColor);
  stroke(0);
  strokeWeight(1);
  rect(swatchX, y, swatchSize, swatchSize);

  // Color picker dropdown
  if (colorPickerOpen) {
    y += 30;
    let colorSize = 28;
    let cols = 4;
    for (let i = 0; i < colorOptions.length; i++) {
      let cx = x + (i % cols) * (colorSize + 5);
      let cy = y + floor(i / cols) * (colorSize + 5);
      fill(colorOptions[i]);
      stroke(colorOptions[i] === barColor.toString('#rrggbb') ? 0 : 150);
      strokeWeight(colorOptions[i] === barColor.toString('#rrggbb') ? 3 : 1);
      rect(cx, cy, colorSize, colorSize, 3);
    }
  }
}

function drawInputField(x, y, w, h, fieldId, value) {
  let isActive = activeField === fieldId;

  // Field background
  fill(isActive ? 255 : 250);
  stroke(isActive ? '#4682B4' : 180);
  strokeWeight(isActive ? 2 : 1);
  rect(x, y, w, h, 3);

  // Text content
  fill(0);
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);

  let displayText = isActive ? inputBuffer : value;
  let textX = x + 5;
  let textY = y + h / 2;

  // Clip text if too long
  let maxChars = floor(w / 8);
  if (displayText.length > maxChars) {
    displayText = displayText.substring(0, maxChars - 1) + '...';
  }

  text(displayText, textX, textY);

  // Cursor when active
  if (isActive && cursorBlink < 30) {
    let cursorX = textX + textWidth(inputBuffer);
    stroke(0);
    strokeWeight(1);
    line(cursorX, y + 4, cursorX, y + h - 4);
  }
}

function drawButton(x, y, w, h, label, enabled) {
  // Button background
  if (enabled) {
    fill(mouseInRect(x, y, w, h) ? '#5a9bd4' : '#4682B4');
  } else {
    fill(180);
  }
  noStroke();
  rect(x, y, w, h, 4);

  // Button text
  fill(255);
  textSize(12);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
}

function drawRadioButton(x, y, label, selected, id) {
  let radius = 8;

  // Outer circle
  stroke(100);
  strokeWeight(1);
  fill(255);
  circle(x + radius, y + radius, radius * 2);

  // Inner circle if selected
  if (selected) {
    fill('#4682B4');
    noStroke();
    circle(x + radius, y + radius, radius);
  }

  // Label
  fill(0);
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  text(label, x + radius * 2 + 6, y + radius);
}

function mouseInRect(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

function mousePressed() {
  let panelMargin = 15;
  let x = controlPanelX + panelMargin;
  let y = 15 + 30 + 22 + 18; // Skip title and headers
  let fieldWidth = controlPanelWidth - panelMargin * 2;
  let nameFieldWidth = (fieldWidth - 20) * 0.6;
  let valueFieldWidth = (fieldWidth - 20) * 0.35;

  // Check category input fields
  for (let i = 0; i < categories.length; i++) {
    // Name field
    if (mouseInRect(x, y, nameFieldWidth, 24)) {
      if (activeField !== 'name-' + i) {
        saveActiveField();
        activeField = 'name-' + i;
        inputBuffer = categories[i].name;
      }
      return;
    }

    // Value field
    if (mouseInRect(x + nameFieldWidth + 10, y, valueFieldWidth, 24)) {
      if (activeField !== 'value-' + i) {
        saveActiveField();
        activeField = 'value-' + i;
        inputBuffer = categories[i].value.toString();
      }
      return;
    }

    y += 30;
  }

  y += 10;

  // Add/Remove buttons
  let btnWidth = (fieldWidth - 10) / 2;
  if (mouseInRect(x, y, btnWidth, 28) && categories.length < MAX_CATEGORIES) {
    saveActiveField();
    categories.push({ name: 'New', value: 10 });
    return;
  }

  if (mouseInRect(x + btnWidth + 10, y, btnWidth, 28) && categories.length > 1) {
    saveActiveField();
    categories.pop();
    return;
  }

  y += 45 + 15 + 25; // Skip separator and Display Options header

  // Frequency type radio buttons
  if (mouseInRect(x, y, 90, 20)) {
    showRelativeFrequency = false;
    return;
  }
  if (mouseInRect(x + 100, y, 100, 20)) {
    showRelativeFrequency = true;
    return;
  }

  y += 30;

  // Orientation radio buttons
  if (mouseInRect(x, y, 80, 20)) {
    isVertical = true;
    return;
  }
  if (mouseInRect(x + 100, y, 90, 20)) {
    isVertical = false;
    return;
  }

  y += 35;

  // Color swatch toggle
  let swatchX = x + 70;
  if (mouseInRect(swatchX, y, 24, 24)) {
    colorPickerOpen = !colorPickerOpen;
    return;
  }

  // Color options
  if (colorPickerOpen) {
    y += 30;
    let colorSize = 28;
    let cols = 4;
    for (let i = 0; i < colorOptions.length; i++) {
      let cx = x + (i % cols) * (colorSize + 5);
      let cy = y + floor(i / cols) * (colorSize + 5);
      if (mouseInRect(cx, cy, colorSize, colorSize)) {
        barColor = color(colorOptions[i]);
        colorPickerOpen = false;
        return;
      }
    }
  }

  // Click outside input fields - save and deselect
  saveActiveField();
  activeField = null;
  colorPickerOpen = false;
}

function saveActiveField() {
  if (activeField === null) return;

  let parts = activeField.split('-');
  let type = parts[0];
  let index = parseInt(parts[1]);

  if (type === 'name') {
    categories[index].name = inputBuffer || 'Category';
  } else if (type === 'value') {
    let val = parseInt(inputBuffer);
    if (isNaN(val)) val = 0;
    val = constrain(val, 0, MAX_VALUE);
    categories[index].value = val;
  }
}

function keyPressed() {
  if (activeField === null) return;

  if (keyCode === ENTER || keyCode === TAB) {
    saveActiveField();

    // Move to next field
    let parts = activeField.split('-');
    let type = parts[0];
    let index = parseInt(parts[1]);

    if (keyCode === TAB) {
      if (type === 'name') {
        activeField = 'value-' + index;
        inputBuffer = categories[index].value.toString();
      } else {
        if (index < categories.length - 1) {
          activeField = 'name-' + (index + 1);
          inputBuffer = categories[index + 1].name;
        } else {
          activeField = null;
        }
      }
      return false; // Prevent default tab behavior
    } else {
      activeField = null;
    }
    return;
  }

  if (keyCode === BACKSPACE) {
    if (inputBuffer.length > 0) {
      inputBuffer = inputBuffer.slice(0, -1);
    }
    return false;
  }

  if (keyCode === ESCAPE) {
    activeField = null;
    return;
  }
}

function keyTyped() {
  if (activeField === null) return;

  let parts = activeField.split('-');
  let type = parts[0];

  // For value fields, only allow digits
  if (type === 'value') {
    if (key >= '0' && key <= '9') {
      if (inputBuffer.length < 3) { // Max 3 digits (0-100)
        inputBuffer += key;
      }
    }
  } else {
    // For name fields, allow letters, numbers, spaces
    if (inputBuffer.length < 15) {
      inputBuffer += key;
    }
  }

  return false; // Prevent default
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    containerWidth = container.offsetWidth;
    canvasWidth = containerWidth;
  }
}
