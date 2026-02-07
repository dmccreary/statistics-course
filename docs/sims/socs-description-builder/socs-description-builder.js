// SOCS Description Builder MicroSim
// Students compose complete distribution descriptions using the SOCS framework
// (Shape, Outliers, Center, Spread)
// Bloom Level: Create (L6) - compose
// MicroSim template version 2026.02

// ===== CANVAS DIMENSIONS =====
let containerWidth;
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// ===== LAYOUT CONSTANTS =====
// Left panel (histogram) - 55%
let histPanelX = 15;
let histPanelY = 45;
let histPanelWidth;
let histPanelHeight = 280;

// Right panel (SOCS builder) - 45%
let socsPanelX;
let socsPanelWidth;
let socsPanelY = 45;
let socsPanelHeight = 440;

// Preview area (bottom left)
let previewPanelX = 15;
let previewPanelY = 340;
let previewPanelWidth;
let previewPanelHeight = 145;

// ===== DATA AND STATE =====
let currentDataset = [];
let currentContext = {};
let expertDescription = "";

// Dataset contexts with their characteristics
let contexts = [
  {
    name: "Coffee wait times",
    unit: "minutes",
    trueShape: "Skewed right",
    trueModality: "Unimodal",
    trueOutliers: "High",
    trueCenter: 3.5,
    trueSpread: 2.1,
    description: "Wait times at a busy coffee shop during morning rush"
  },
  {
    name: "Easy exam scores",
    unit: "points",
    trueShape: "Skewed left",
    trueModality: "Unimodal",
    trueOutliers: "Low",
    trueCenter: 85,
    trueSpread: 12,
    description: "Test scores from a relatively easy statistics exam"
  },
  {
    name: "Mixed heights",
    unit: "inches",
    trueShape: "Symmetric",
    trueModality: "Bimodal",
    trueOutliers: "None",
    trueCenter: 66,
    trueSpread: 4,
    description: "Heights of adults in a co-ed fitness class"
  },
  {
    name: "Commute times",
    unit: "minutes",
    trueShape: "Skewed right",
    trueModality: "Unimodal",
    trueOutliers: "High",
    trueCenter: 25,
    trueSpread: 15,
    description: "Daily commute times for office workers"
  },
  {
    name: "Product ratings",
    unit: "stars",
    trueShape: "Skewed left",
    trueModality: "Unimodal",
    trueOutliers: "Low",
    trueCenter: 4.2,
    trueSpread: 0.8,
    description: "Customer ratings for a popular product"
  },
  {
    name: "Uniform random",
    unit: "value",
    trueShape: "Symmetric",
    trueModality: "Uniform",
    trueOutliers: "None",
    trueCenter: 50,
    trueSpread: 28,
    description: "Random numbers from a fair lottery"
  }
];

// User selections
let selectedShape = "";
let selectedModality = "";
let selectedOutliers = "";
let userCenter = "";
let userSpread = "";
let showExpertComparison = false;
let feedbackMessage = "";
let feedbackColor;

// ===== UI ELEMENTS =====
let newDatasetBtn;
let generateBtn;
let compareBtn;

// Dropdown states
let dropdowns = {
  shape: { open: false, options: ["", "Symmetric", "Skewed left", "Skewed right"], selected: 0 },
  modality: { open: false, options: ["", "Unimodal", "Bimodal", "Uniform"], selected: 0 },
  outliers: { open: false, options: ["", "None", "Low", "High", "Both"], selected: 0 }
};

// Input fields for center and spread
let centerInput = "";
let spreadInput = "";
let activeInput = null; // 'center' or 'spread' or null

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  updateLayout();
  generateNewDataset();

  // Create control buttons
  newDatasetBtn = createButton('New Dataset');
  newDatasetBtn.position(10, drawHeight + 12);
  newDatasetBtn.mousePressed(generateNewDataset);

  generateBtn = createButton('Generate Description');
  generateBtn.position(110, drawHeight + 12);
  generateBtn.mousePressed(generateDescription);

  compareBtn = createButton('Compare to Expert');
  compareBtn.position(255, drawHeight + 12);
  compareBtn.mousePressed(compareToExpert);

  describe('SOCS Description Builder: Students analyze a histogram and compose a complete distribution description using Shape, Outliers, Center, and Spread components. Select characteristics from dropdowns, enter values, and compare your description to an expert response.', LABEL);
}

function updateLayout() {
  histPanelWidth = (canvasWidth - 45) * 0.55;
  socsPanelX = histPanelX + histPanelWidth + 15;
  socsPanelWidth = canvasWidth - socsPanelX - 15;
  previewPanelWidth = histPanelWidth;
}

function generateNewDataset() {
  // Pick a random context
  let contextIndex = floor(random(contexts.length));
  currentContext = contexts[contextIndex];

  // Generate data based on context characteristics
  currentDataset = generateDataForContext(currentContext);

  // Reset user selections
  dropdowns.shape.selected = 0;
  dropdowns.modality.selected = 0;
  dropdowns.outliers.selected = 0;
  centerInput = "";
  spreadInput = "";
  selectedShape = "";
  selectedModality = "";
  selectedOutliers = "";
  userCenter = "";
  userSpread = "";
  showExpertComparison = false;
  feedbackMessage = "";

  // Generate expert description
  expertDescription = generateExpertDescription();
}

function generateDataForContext(ctx) {
  let data = [];
  let n = 50 + floor(random(30));

  if (ctx.trueShape === "Skewed right") {
    // Generate right-skewed data using exponential-like distribution
    for (let i = 0; i < n; i++) {
      let val = ctx.trueCenter + (-log(random()) * ctx.trueSpread * 0.5);
      data.push(val);
    }
    // Add high outliers if specified
    if (ctx.trueOutliers === "High" || ctx.trueOutliers === "Both") {
      for (let i = 0; i < 3; i++) {
        data.push(ctx.trueCenter + ctx.trueSpread * (3 + random()));
      }
    }
  } else if (ctx.trueShape === "Skewed left") {
    // Generate left-skewed data
    let maxVal = ctx.trueCenter + ctx.trueSpread * 0.8;
    for (let i = 0; i < n; i++) {
      let val = maxVal - (-log(random()) * ctx.trueSpread * 0.4);
      data.push(val);
    }
    // Add low outliers if specified
    if (ctx.trueOutliers === "Low" || ctx.trueOutliers === "Both") {
      for (let i = 0; i < 3; i++) {
        data.push(ctx.trueCenter - ctx.trueSpread * (2 + random()));
      }
    }
  } else if (ctx.trueModality === "Bimodal") {
    // Generate bimodal data
    let mode1 = ctx.trueCenter - ctx.trueSpread * 0.8;
    let mode2 = ctx.trueCenter + ctx.trueSpread * 0.8;
    for (let i = 0; i < n; i++) {
      if (random() < 0.5) {
        data.push(mode1 + randomGaussian() * ctx.trueSpread * 0.3);
      } else {
        data.push(mode2 + randomGaussian() * ctx.trueSpread * 0.3);
      }
    }
  } else if (ctx.trueModality === "Uniform") {
    // Generate uniform data
    let minVal = ctx.trueCenter - ctx.trueSpread;
    let maxVal = ctx.trueCenter + ctx.trueSpread;
    for (let i = 0; i < n; i++) {
      data.push(random(minVal, maxVal));
    }
  } else {
    // Symmetric unimodal (normal-like)
    for (let i = 0; i < n; i++) {
      data.push(ctx.trueCenter + randomGaussian() * ctx.trueSpread * 0.5);
    }
  }

  return data;
}

function generateExpertDescription() {
  let ctx = currentContext;
  let stats = calculateStats(currentDataset);

  let shapeDesc = ctx.trueShape.toLowerCase();
  let modalDesc = ctx.trueModality.toLowerCase();
  let centerVal = stats.median.toFixed(1);
  let spreadVal = stats.iqr.toFixed(1);

  let outlierDesc = "";
  if (ctx.trueOutliers === "High") {
    outlierDesc = "with a few high outliers";
  } else if (ctx.trueOutliers === "Low") {
    outlierDesc = "with some low outliers";
  } else if (ctx.trueOutliers === "Both") {
    outlierDesc = "with outliers on both ends";
  } else {
    outlierDesc = "with no apparent outliers";
  }

  return `The distribution of ${ctx.name.toLowerCase()} is ${shapeDesc} and ${modalDesc}, ${outlierDesc}. The center (median) is approximately ${centerVal} ${ctx.unit}, with a spread (IQR) of about ${spreadVal} ${ctx.unit}.`;
}

function calculateStats(data) {
  let sorted = [...data].sort((a, b) => a - b);
  let n = sorted.length;

  let median = sorted[floor(n / 2)];
  let q1 = sorted[floor(n / 4)];
  let q3 = sorted[floor(3 * n / 4)];
  let iqr = q3 - q1;
  let mean = data.reduce((a, b) => a + b, 0) / n;
  let min = sorted[0];
  let max = sorted[n - 1];

  return { median, q1, q3, iqr, mean, min, max };
}

function generateDescription() {
  selectedShape = dropdowns.shape.options[dropdowns.shape.selected];
  selectedModality = dropdowns.modality.options[dropdowns.modality.selected];
  selectedOutliers = dropdowns.outliers.options[dropdowns.outliers.selected];
  userCenter = centerInput;
  userSpread = spreadInput;

  if (!selectedShape || !selectedModality || !selectedOutliers || !userCenter || !userSpread) {
    feedbackMessage = "Please complete all SOCS components before generating.";
    feedbackColor = color(200, 100, 50);
  } else {
    feedbackMessage = "Description generated! Click 'Compare to Expert' to see how you did.";
    feedbackColor = color(50, 150, 50);
  }
  showExpertComparison = false;
}

function compareToExpert() {
  if (!selectedShape || !selectedModality || !selectedOutliers) {
    feedbackMessage = "Please complete your SOCS description first!";
    feedbackColor = color(200, 100, 50);
    return;
  }

  showExpertComparison = true;

  // Score the response
  let score = 0;
  let feedback = [];

  // Check shape
  if (selectedShape.toLowerCase() === currentContext.trueShape.toLowerCase()) {
    score += 25;
    feedback.push("Shape: Correct!");
  } else {
    feedback.push("Shape: Not quite - look at the symmetry.");
  }

  // Check modality
  if (selectedModality.toLowerCase() === currentContext.trueModality.toLowerCase()) {
    score += 25;
    feedback.push("Modality: Correct!");
  } else {
    feedback.push("Modality: Count the peaks carefully.");
  }

  // Check outliers
  if (selectedOutliers.toLowerCase() === currentContext.trueOutliers.toLowerCase()) {
    score += 25;
    feedback.push("Outliers: Correct!");
  } else {
    feedback.push("Outliers: Check for values far from the main group.");
  }

  // Check center (within 20% of median)
  let stats = calculateStats(currentDataset);
  let userCenterNum = parseFloat(userCenter);
  if (!isNaN(userCenterNum) && abs(userCenterNum - stats.median) < stats.median * 0.2) {
    score += 12.5;
    feedback.push("Center: Good estimate!");
  } else {
    feedback.push("Center: Check the median value.");
  }

  // Check spread (within 30% of IQR)
  let userSpreadNum = parseFloat(userSpread);
  if (!isNaN(userSpreadNum) && abs(userSpreadNum - stats.iqr) < stats.iqr * 0.3) {
    score += 12.5;
    feedback.push("Spread: Good estimate!");
  } else {
    feedback.push("Spread: Consider using IQR.");
  }

  feedbackMessage = "Score: " + score.toFixed(0) + "/100";
  feedbackColor = score >= 75 ? color(50, 150, 50) : (score >= 50 ? color(200, 150, 50) : color(200, 100, 50));
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
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('SOCS Description Builder', canvasWidth * 0.35, 10);

  // Draw histogram panel
  drawHistogramPanel();

  // Draw SOCS builder panel
  drawSOCSPanel();

  // Draw preview panel
  drawPreviewPanel();

  // Draw progress indicator
  drawProgressIndicator();

  // Reset text settings
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawHistogramPanel() {
  // Panel background
  fill(240, 248, 255);
  stroke(180, 200, 220);
  strokeWeight(2);
  rect(histPanelX, histPanelY, histPanelWidth, histPanelHeight, 8);

  // Context label
  fill(60, 80, 100);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text('Dataset: ' + currentContext.name, histPanelX + histPanelWidth / 2, histPanelY + 8);
  textSize(11);
  fill(100, 120, 140);
  text(currentContext.description, histPanelX + histPanelWidth / 2, histPanelY + 26);

  // Draw histogram
  if (currentDataset.length > 0) {
    drawHistogram();
  }
}

function drawHistogram() {
  let stats = calculateStats(currentDataset);
  let histX = histPanelX + 50;
  let histY = histPanelY + 50;
  let histW = histPanelWidth - 70;
  let histH = histPanelHeight - 80;

  // Create bins
  let numBins = 12;
  let minVal = stats.min;
  let maxVal = stats.max;
  let binWidth = (maxVal - minVal) / numBins;
  let bins = new Array(numBins).fill(0);

  for (let val of currentDataset) {
    let binIndex = floor((val - minVal) / binWidth);
    binIndex = constrain(binIndex, 0, numBins - 1);
    bins[binIndex]++;
  }

  let maxCount = max(bins);
  let barWidth = histW / numBins;

  // Draw bars
  for (let i = 0; i < numBins; i++) {
    let barHeight = map(bins[i], 0, maxCount, 0, histH - 20);
    let x = histX + i * barWidth;
    let y = histY + histH - barHeight - 20;

    // Bar fill with gradient effect
    fill(70, 130, 180);
    stroke(50, 100, 150);
    strokeWeight(1);
    rect(x + 1, y, barWidth - 2, barHeight, 2, 2, 0, 0);
  }

  // X-axis
  stroke(100);
  strokeWeight(1);
  line(histX, histY + histH - 18, histX + histW, histY + histH - 18);

  // X-axis labels
  fill(80);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(10);
  for (let i = 0; i <= 4; i++) {
    let val = minVal + (maxVal - minVal) * (i / 4);
    let x = histX + histW * (i / 4);
    text(val.toFixed(1), x, histY + histH - 14);
  }

  // Unit label
  textSize(11);
  text(currentContext.unit, histX + histW / 2, histY + histH - 2);

  // Y-axis label
  push();
  translate(histX - 25, histY + histH / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Frequency', 0, 0);
  pop();
}

function drawSOCSPanel() {
  // Panel background
  fill(255, 250, 240);
  stroke(230, 200, 160);
  strokeWeight(2);
  rect(socsPanelX, socsPanelY, socsPanelWidth, socsPanelHeight, 8);

  // Panel title
  fill(120, 90, 50);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(16);
  text('SOCS Components', socsPanelX + socsPanelWidth / 2, socsPanelY + 8);

  // SOCS letter indicators
  let startY = socsPanelY + 40;
  let rowHeight = 65;
  let letterX = socsPanelX + 20;
  let labelX = socsPanelX + 45;
  let dropdownX = socsPanelX + 15;
  let dropdownW = socsPanelWidth - 30;

  // S - Shape
  drawSOCSLetter('S', 'Shape', letterX, startY, dropdowns.shape, dropdownX, startY + 22, dropdownW);

  // O - Outliers
  drawSOCSLetter('O', 'Outliers', letterX, startY + rowHeight, dropdowns.outliers, dropdownX, startY + rowHeight + 22, dropdownW);

  // C - Center
  drawSOCSLetter('C', 'Center', letterX, startY + rowHeight * 2, null, dropdownX, startY + rowHeight * 2 + 22, dropdownW);
  drawInputField('center', dropdownX, startY + rowHeight * 2 + 22, dropdownW - 60, currentContext.unit);

  // S - Spread
  drawSOCSLetter('S', 'Spread', letterX, startY + rowHeight * 3, null, dropdownX, startY + rowHeight * 3 + 22, dropdownW);
  drawInputField('spread', dropdownX, startY + rowHeight * 3 + 22, dropdownW - 60, currentContext.unit);

  // Modality (bonus)
  fill(100, 80, 60);
  textAlign(LEFT, TOP);
  textSize(13);
  text('Modality:', socsPanelX + 15, startY + rowHeight * 4 + 5);
  drawDropdown(dropdowns.modality, socsPanelX + 15, startY + rowHeight * 4 + 22, dropdownW);

  // Feedback message
  if (feedbackMessage) {
    fill(feedbackColor);
    textAlign(CENTER, TOP);
    textSize(12);
    text(feedbackMessage, socsPanelX + socsPanelWidth / 2, startY + rowHeight * 5 + 15);
  }
}

function drawSOCSLetter(letter, label, x, y, dropdown, ddX, ddY, ddW) {
  // Draw the big letter
  fill(200, 150, 100);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(28);
  textStyle(BOLD);
  text(letter, x, y - 5);
  textStyle(NORMAL);

  // Draw the label
  fill(100, 80, 60);
  textAlign(LEFT, TOP);
  textSize(13);
  text(label + ':', x + 25, y + 5);

  // Draw dropdown if provided
  if (dropdown) {
    drawDropdown(dropdown, ddX, ddY, ddW);
  }
}

function drawDropdown(dropdown, x, y, w) {
  let h = 24;

  // Dropdown box
  if (dropdown.open) {
    fill(255);
    stroke(100, 140, 180);
  } else {
    fill(250);
    stroke(180, 180, 180);
  }
  strokeWeight(1);
  rect(x, y, w, h, 4);

  // Selected text
  fill(dropdown.selected === 0 ? color(150) : color(50));
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  let displayText = dropdown.options[dropdown.selected] || "Select...";
  text(displayText, x + 8, y + h / 2);

  // Arrow
  fill(100);
  let arrowX = x + w - 15;
  let arrowY = y + h / 2;
  if (dropdown.open) {
    triangle(arrowX - 4, arrowY + 2, arrowX + 4, arrowY + 2, arrowX, arrowY - 4);
  } else {
    triangle(arrowX - 4, arrowY - 2, arrowX + 4, arrowY - 2, arrowX, arrowY + 4);
  }

  // Dropdown options if open
  if (dropdown.open) {
    for (let i = 0; i < dropdown.options.length; i++) {
      let optY = y + h + i * h;
      fill(i === dropdown.selected ? color(230, 240, 250) : color(255));
      stroke(180);
      strokeWeight(1);
      rect(x, optY, w, h);

      fill(dropdown.options[i] === "" ? color(150) : color(50));
      noStroke();
      textAlign(LEFT, CENTER);
      text(dropdown.options[i] || "Select...", x + 8, optY + h / 2);
    }
  }

  // Store dropdown bounds for click detection
  dropdown.bounds = { x, y, w, h };
}

function drawInputField(fieldName, x, y, w, unit) {
  let h = 24;
  let value = fieldName === 'center' ? centerInput : spreadInput;
  let isActive = activeInput === fieldName;

  // Input box
  fill(isActive ? 255 : 250);
  stroke(isActive ? color(100, 140, 180) : color(180));
  strokeWeight(isActive ? 2 : 1);
  rect(x, y, w, h, 4);

  // Value text
  fill(value ? color(50) : color(150));
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text(value || "Enter value...", x + 8, y + h / 2);

  // Cursor if active
  if (isActive && frameCount % 60 < 30) {
    let cursorX = x + 8 + textWidth(value);
    stroke(50);
    strokeWeight(1);
    line(cursorX, y + 4, cursorX, y + h - 4);
  }

  // Unit label
  fill(100);
  noStroke();
  textAlign(LEFT, CENTER);
  text(unit, x + w + 5, y + h / 2);

  // Store bounds
  if (fieldName === 'center') {
    window.centerBounds = { x, y, w, h };
  } else {
    window.spreadBounds = { x, y, w, h };
  }
}

function drawPreviewPanel() {
  // Panel background
  fill(248, 255, 248);
  stroke(180, 220, 180);
  strokeWeight(2);
  rect(previewPanelX, previewPanelY, previewPanelWidth, previewPanelHeight, 8);

  // Panel title
  fill(60, 100, 60);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  textStyle(BOLD);
  text('Your Description:', previewPanelX + 10, previewPanelY + 8);
  textStyle(NORMAL);

  // Build preview text
  let previewText = buildPreviewText();

  fill(50, 80, 50);
  textSize(11);
  textAlign(LEFT, TOP);
  textLeading(16);
  text(previewText, previewPanelX + 10, previewPanelY + 28, previewPanelWidth - 20, 50);

  // Expert comparison if showing
  if (showExpertComparison) {
    fill(80, 60, 100);
    textStyle(BOLD);
    textSize(13);
    text('Expert Description:', previewPanelX + 10, previewPanelY + 80);
    textStyle(NORMAL);

    fill(60, 40, 80);
    textSize(11);
    text(expertDescription, previewPanelX + 10, previewPanelY + 98, previewPanelWidth - 20, 50);
  }
}

function buildPreviewText() {
  let shape = dropdowns.shape.options[dropdowns.shape.selected];
  let modality = dropdowns.modality.options[dropdowns.modality.selected];
  let outliers = dropdowns.outliers.options[dropdowns.outliers.selected];

  let parts = [];
  parts.push("The distribution of " + currentContext.name.toLowerCase());

  if (shape) {
    parts.push(" is " + shape.toLowerCase());
  }
  if (modality) {
    parts.push(" and " + modality.toLowerCase());
  }

  if (outliers) {
    if (outliers === "None") {
      parts.push(", with no apparent outliers");
    } else if (outliers === "Low") {
      parts.push(", with some low outliers");
    } else if (outliers === "High") {
      parts.push(", with some high outliers");
    } else if (outliers === "Both") {
      parts.push(", with outliers on both ends");
    }
  }

  if (centerInput) {
    parts.push(". The center is approximately " + centerInput + " " + currentContext.unit);
  }

  if (spreadInput) {
    parts.push(", with a spread of about " + spreadInput + " " + currentContext.unit);
  }

  parts.push(".");

  return parts.join("");
}

function drawProgressIndicator() {
  let x = socsPanelX + socsPanelWidth - 80;
  let y = socsPanelY + socsPanelHeight - 30;

  // Count completed items
  let completed = 0;
  if (dropdowns.shape.selected > 0) completed++;
  if (dropdowns.outliers.selected > 0) completed++;
  if (centerInput) completed++;
  if (spreadInput) completed++;

  // Progress circles
  fill(100, 80, 60);
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(11);
  text('Progress:', x - 5, y + 8);

  for (let i = 0; i < 4; i++) {
    let cx = x + 10 + i * 18;
    if (i < completed) {
      fill(100, 180, 100);
    } else {
      fill(220);
    }
    stroke(150);
    strokeWeight(1);
    circle(cx, y + 8, 12);
  }

  // SOCS letters under circles
  noStroke();
  fill(100);
  textAlign(CENTER, TOP);
  textSize(9);
  let letters = ['S', 'O', 'C', 'S'];
  for (let i = 0; i < 4; i++) {
    let cx = x + 10 + i * 18;
    text(letters[i], cx, y + 18);
  }
}

function mousePressed() {
  // Check dropdown clicks
  checkDropdownClick(dropdowns.shape);
  checkDropdownClick(dropdowns.modality);
  checkDropdownClick(dropdowns.outliers);

  // Check input field clicks
  if (window.centerBounds) {
    let b = window.centerBounds;
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      activeInput = 'center';
      return;
    }
  }
  if (window.spreadBounds) {
    let b = window.spreadBounds;
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      activeInput = 'spread';
      return;
    }
  }

  // Click outside inputs deactivates them
  if (!isInsideDropdown()) {
    activeInput = null;
  }
}

function checkDropdownClick(dropdown) {
  if (!dropdown.bounds) return;

  let b = dropdown.bounds;
  let h = 24;

  // Click on dropdown header
  if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + h) {
    // Close other dropdowns
    for (let key in dropdowns) {
      if (dropdowns[key] !== dropdown) {
        dropdowns[key].open = false;
      }
    }
    dropdown.open = !dropdown.open;
    return;
  }

  // Click on dropdown option
  if (dropdown.open) {
    for (let i = 0; i < dropdown.options.length; i++) {
      let optY = b.y + h + i * h;
      if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= optY && mouseY <= optY + h) {
        dropdown.selected = i;
        dropdown.open = false;
        return;
      }
    }
  }
}

function isInsideDropdown() {
  for (let key in dropdowns) {
    let dropdown = dropdowns[key];
    if (dropdown.bounds) {
      let b = dropdown.bounds;
      let totalH = 24 * (dropdown.open ? dropdown.options.length + 1 : 1);
      if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + totalH) {
        return true;
      }
    }
  }
  return false;
}

function keyPressed() {
  if (activeInput) {
    if (keyCode === BACKSPACE) {
      if (activeInput === 'center') {
        centerInput = centerInput.slice(0, -1);
      } else {
        spreadInput = spreadInput.slice(0, -1);
      }
      return false;
    } else if (keyCode === TAB) {
      activeInput = activeInput === 'center' ? 'spread' : 'center';
      return false;
    } else if (keyCode === ENTER || keyCode === RETURN) {
      activeInput = null;
      return false;
    }
  }
  return true;
}

function keyTyped() {
  if (activeInput) {
    // Allow numbers, decimal point, and minus sign
    if ((key >= '0' && key <= '9') || key === '.' || key === '-') {
      if (activeInput === 'center') {
        centerInput += key;
      } else {
        spreadInput += key;
      }
    }
    return false;
  }
  return true;
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
