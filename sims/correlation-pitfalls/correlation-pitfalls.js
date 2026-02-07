// Correlation Pitfalls Demo MicroSim
// Students recognize situations where correlation is misleading and explain why
// Bloom Level: Evaluate (L5) - Students evaluate when correlation can be misleading
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 750;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 16;

// Tab system
let tabs = ['Nonlinear Data', 'Outlier Effect', 'Restricted Range', 'Confounding'];
let currentTab = 0;

// Button dimensions
let tabButtonWidth = 140;
let tabButtonHeight = 30;
let controlButtonWidth = 120;
let controlButtonHeight = 32;

// State tracking
let userPrediction = -1;  // Index of selected prediction
let showExplanation = false;
let correctPredictions = 0;
let totalAttempts = 0;
let challengeIndex = [0, 0, 0, 0];  // Challenge index for each tab

// Outlier tab specific
let outlierRemoved = false;

// Restricted range tab specific
let rangeExpanded = false;
let rangeSliderValue = 0.3;  // 0.3 = restricted, 1.0 = full range

// Prediction options per tab
let predictionOptions = [
  ['Strong linear (r~0.9)', 'Moderate linear (r~0.6)', 'No relationship (r~0)', 'Cannot tell'],
  ['Outlier inflates r', 'Outlier deflates r', 'Outlier reverses r', 'Outlier has no effect'],
  ['True r is higher', 'True r is lower', 'True r is the same', 'Range doesn\'t matter'],
  ['X causes Y', 'Y causes X', 'Third variable (Z) causes both', 'Pure coincidence']
];

// Correct answers per tab (index in predictionOptions)
let correctAnswers = [
  [2, 2, 2],  // Nonlinear: always "No relationship" for quadratic/sine patterns
  [0, 1, 2],  // Outlier: inflates, deflates, reverses depending on scenario
  [0, 0, 0],  // Restricted: true r is always higher when full range shown
  [2, 2, 2]   // Confounding: always third variable
];

// Scenario data - will be generated for each challenge
let currentData = [];
let currentR = 0;
let fullRangeR = 0;  // For restricted range tab
let withoutOutlierR = 0;  // For outlier tab

// Confounding variable scenarios
let confoundingScenarios = [
  {
    xLabel: 'Ice Cream Sales',
    yLabel: 'Drowning Deaths',
    zLabel: 'Summer Temperature',
    explanation: 'Hot weather causes both more ice cream sales AND more swimming (leading to more drownings). Ice cream doesn\'t cause drowning!'
  },
  {
    xLabel: 'Shoe Size',
    yLabel: 'Reading Level',
    zLabel: 'Age',
    explanation: 'As children grow older, both their shoe size and reading ability increase. Shoe size doesn\'t cause better reading!'
  },
  {
    xLabel: 'Firefighters at Scene',
    yLabel: 'Fire Damage ($)',
    zLabel: 'Fire Severity',
    explanation: 'More severe fires require more firefighters AND cause more damage. Firefighters don\'t cause damage - they prevent it!'
  }
];

// Explanations for each scenario type
let explanations = {
  nonlinear: [
    'This is a perfect parabola (U-shape). Even though there\'s an exact mathematical relationship between X and Y, the correlation r is near 0 because correlation only measures LINEAR patterns!',
    'This data follows a sine wave pattern. The correlation is close to 0, yet the relationship is perfectly predictable. Correlation completely misses nonlinear patterns!',
    'This exponential curve shows a clear pattern, but correlation underestimates the strength because it\'s designed for straight lines only.'
  ],
  outlier: [
    'The single outlier in the upper-right pulls the correlation toward positive. Without it, the remaining points show little to no relationship.',
    'The outlier in the lower-right corner is fighting against the upward trend. Removing it reveals the true strong positive correlation.',
    'This outlier is so extreme it actually reverses the apparent relationship! The true pattern without it is the opposite direction.'
  ],
  restricted: [
    'Looking at only the middle range hides the true relationship. When you see the full range, the correlation is much stronger.',
    'Selective universities face this problem: among admitted students, SAT and GPA may show weak correlation because the range is restricted.',
    'Always consider whether your sample represents the full range of possible values, or just a subset.'
  ],
  confounding: []  // Filled dynamically from confoundingScenarios
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Generate initial data for all tabs
  generateData();

  describe('Correlation Pitfalls Demo - Explore four scenarios where correlation can be misleading: nonlinear data, outlier effects, restricted range, and confounding variables. Make predictions and learn why correlation has important limitations.', LABEL);
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
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Correlation Pitfalls: When r is Misleading', canvasWidth / 2, 8);

  // Draw tabs
  drawTabs();

  // Draw current scenario
  drawScenario();

  // Draw controls
  drawControls();

  // Draw score
  drawScore();
}

function drawTabs() {
  let tabY = 35;
  let totalTabWidth = tabs.length * tabButtonWidth + (tabs.length - 1) * 5;
  let startX = (canvasWidth - totalTabWidth) / 2;

  textSize(12);

  for (let i = 0; i < tabs.length; i++) {
    let x = startX + i * (tabButtonWidth + 5);

    // Tab button
    if (i === currentTab) {
      fill('#2E7D32');  // Sylvia green for active
      stroke('#1B5E20');
    } else {
      fill('#e0e0e0');
      stroke('#999');
    }
    strokeWeight(1);
    rect(x, tabY, tabButtonWidth, tabButtonHeight, 5, 5, 0, 0);

    // Tab label
    fill(i === currentTab ? 'white' : '#333');
    noStroke();
    textAlign(CENTER, CENTER);
    text(tabs[i], x + tabButtonWidth / 2, tabY + tabButtonHeight / 2);
  }
}

function drawScenario() {
  // Scatterplot area
  let plotLeft = margin + 50;
  let plotRight = canvasWidth * 0.55;
  let plotTop = 75;
  let plotBottom = drawHeight - 70;
  let plotWidth = plotRight - plotLeft;
  let plotHeight = plotBottom - plotTop;

  // Draw scatterplot background
  fill('white');
  stroke('#ccc');
  strokeWeight(1);
  rect(plotLeft, plotTop, plotWidth, plotHeight);

  // Draw axes
  stroke('#333');
  strokeWeight(2);
  line(plotLeft, plotBottom, plotRight, plotBottom);  // x-axis
  line(plotLeft, plotBottom, plotLeft, plotTop);       // y-axis

  // Axis labels
  fill('#333');
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('X Variable', (plotLeft + plotRight) / 2, plotBottom + 5);

  push();
  translate(plotLeft - 25, (plotTop + plotBottom) / 2);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text('Y Variable', 0, 0);
  pop();

  // For confounding tab, show specific labels
  if (currentTab === 3) {
    let scenario = confoundingScenarios[challengeIndex[3] % confoundingScenarios.length];
    textSize(11);
    textAlign(CENTER, TOP);
    text(scenario.xLabel, (plotLeft + plotRight) / 2, plotBottom + 5);
    push();
    translate(plotLeft - 25, (plotTop + plotBottom) / 2);
    rotate(-PI / 2);
    text(scenario.yLabel, 0, 0);
    pop();
  }

  // Get data range
  let displayData = getDisplayData();
  let xMin = Math.min(...displayData.map(p => p.x));
  let xMax = Math.max(...displayData.map(p => p.x));
  let yMin = Math.min(...displayData.map(p => p.y));
  let yMax = Math.max(...displayData.map(p => p.y));

  // Add padding
  let xPad = (xMax - xMin) * 0.1 || 1;
  let yPad = (yMax - yMin) * 0.1 || 1;
  xMin -= xPad;
  xMax += xPad;
  yMin -= yPad;
  yMax += yPad;

  // Draw grid lines
  stroke('#eee');
  strokeWeight(1);
  for (let i = 1; i < 5; i++) {
    let x = plotLeft + (i / 5) * plotWidth;
    let y = plotTop + (i / 5) * plotHeight;
    line(x, plotTop, x, plotBottom);
    line(plotLeft, y, plotRight, y);
  }

  // Draw points
  for (let i = 0; i < displayData.length; i++) {
    let p = displayData[i];
    let x = map(p.x, xMin, xMax, plotLeft + 10, plotRight - 10);
    let y = map(p.y, yMin, yMax, plotBottom - 10, plotTop + 10);

    // Different styling for outlier
    if (currentTab === 1 && p.isOutlier) {
      if (outlierRemoved) {
        // Draw as ghosted
        fill(200, 100, 100, 100);
        stroke(150, 50, 50, 100);
      } else {
        fill('#e74c3c');
        stroke('#c0392b');
      }
      strokeWeight(2);
      circle(x, y, 16);
    } else {
      fill('#3498db');
      stroke('#2980b9');
      strokeWeight(1);
      circle(x, y, 10);
    }
  }

  // Draw correlation value
  let displayR = getCurrentR();
  fill('#333');
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  text('r = ' + displayR.toFixed(3), plotLeft + 10, plotTop + 10);

  // Show "What's wrong here?" prompt
  textSize(14);
  fill('#B5651D');  // Sylvia auburn
  textAlign(CENTER, TOP);
  text("What's misleading about this correlation?", (plotLeft + plotRight) / 2, plotTop + 35);

  // Draw right panel with prediction options
  drawPredictionPanel(plotRight + 20, plotTop, canvasWidth - plotRight - 30, plotHeight);

  // Draw explanation if revealed
  if (showExplanation) {
    drawExplanationPanel(margin, drawHeight - 60, canvasWidth - margin * 2, 55);
  }
}

function getDisplayData() {
  if (currentTab === 2) {
    // Restricted range - filter based on slider
    let fullData = currentData;
    if (!rangeExpanded) {
      // Show only middle portion
      let xValues = fullData.map(p => p.x);
      let xMin = Math.min(...xValues);
      let xMax = Math.max(...xValues);
      let range = xMax - xMin;
      let cutoff = range * rangeSliderValue;
      let midpoint = (xMin + xMax) / 2;
      return fullData.filter(p =>
        p.x >= midpoint - cutoff / 2 && p.x <= midpoint + cutoff / 2
      );
    }
    return fullData;
  }
  return currentData;
}

function getCurrentR() {
  if (currentTab === 1 && outlierRemoved) {
    return withoutOutlierR;
  }
  if (currentTab === 2) {
    return rangeExpanded ? fullRangeR : currentR;
  }
  return currentR;
}

function drawPredictionPanel(x, y, w, h) {
  let options = predictionOptions[currentTab];
  let buttonHeight = 35;
  let buttonSpacing = 10;
  let startY = y + 40;

  // Panel title
  fill('#333');
  noStroke();
  textSize(13);
  textAlign(CENTER, TOP);
  text('Your Prediction:', x + w / 2, y + 10);

  // Draw option buttons
  for (let i = 0; i < options.length; i++) {
    let by = startY + i * (buttonHeight + buttonSpacing);

    // Button background
    if (userPrediction === i) {
      if (showExplanation) {
        let correct = i === correctAnswers[currentTab][challengeIndex[currentTab] % correctAnswers[currentTab].length];
        fill(correct ? '#27ae60' : '#e74c3c');
        stroke(correct ? '#1e8449' : '#c0392b');
      } else {
        fill('#2E7D32');  // Selected
        stroke('#1B5E20');
      }
    } else {
      fill('#f5f5f5');
      stroke('#ccc');
    }
    strokeWeight(1);
    rect(x, by, w, buttonHeight, 5);

    // Button text
    fill(userPrediction === i ? 'white' : '#333');
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text(options[i], x + w / 2, by + buttonHeight / 2);
  }

  // Reveal button
  let revealY = startY + options.length * (buttonHeight + buttonSpacing) + 15;
  if (!showExplanation && userPrediction >= 0) {
    fill('#B5651D');
    stroke('#8B4513');
    strokeWeight(1);
    rect(x + w / 4, revealY, w / 2, buttonHeight, 5);
    fill('white');
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text('Reveal Answer', x + w / 2, revealY + buttonHeight / 2);
  }

  // Special controls for Outlier and Restricted Range tabs
  if (currentTab === 1 && showExplanation) {
    // Toggle outlier button
    let toggleY = revealY + buttonHeight + 10;
    fill(outlierRemoved ? '#27ae60' : '#3498db');
    stroke(outlierRemoved ? '#1e8449' : '#2980b9');
    rect(x, toggleY, w, buttonHeight, 5);
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    text(outlierRemoved ? 'Show Outlier' : 'Remove Outlier', x + w / 2, toggleY + buttonHeight / 2);
  }

  if (currentTab === 2 && showExplanation) {
    // Range slider representation
    let sliderY = revealY + buttonHeight + 15;
    fill('#333');
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    text('Expand Range to See Full Picture:', x + w / 2, sliderY);

    let toggleY = sliderY + 20;
    fill(rangeExpanded ? '#27ae60' : '#3498db');
    stroke(rangeExpanded ? '#1e8449' : '#2980b9');
    strokeWeight(1);
    rect(x, toggleY, w, buttonHeight, 5);
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    text(rangeExpanded ? 'Restrict Range' : 'Show Full Range', x + w / 2, toggleY + buttonHeight / 2);
  }
}

function drawExplanationPanel(x, y, w, h) {
  // Semi-transparent overlay
  fill(255, 255, 255, 245);
  stroke('#2E7D32');
  strokeWeight(2);
  rect(x, y, w, h, 8);

  // Get explanation text
  let explanationText = '';
  let ci = challengeIndex[currentTab] % 3;

  if (currentTab === 0) {
    explanationText = explanations.nonlinear[ci];
  } else if (currentTab === 1) {
    explanationText = explanations.outlier[ci];
  } else if (currentTab === 2) {
    explanationText = explanations.restricted[ci];
  } else {
    let scenario = confoundingScenarios[ci];
    explanationText = scenario.explanation;
  }

  // Draw explanation text
  fill('#333');
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);

  // Word wrap
  let words = explanationText.split(' ');
  let line = '';
  let lineY = y + 10;
  let maxWidth = w - 20;

  for (let word of words) {
    let testLine = line + word + ' ';
    if (textWidth(testLine) > maxWidth) {
      text(line.trim(), x + 10, lineY);
      line = word + ' ';
      lineY += 16;
    } else {
      line = testLine;
    }
  }
  text(line.trim(), x + 10, lineY);
}

function drawControls() {
  let controlY = drawHeight + 20;

  // Next Challenge button
  let nextX = canvasWidth - controlButtonWidth - margin;
  fill('#2E7D32');
  stroke('#1B5E20');
  strokeWeight(1);
  rect(nextX, controlY, controlButtonWidth, controlButtonHeight, 5);
  fill('white');
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Next Challenge', nextX + controlButtonWidth / 2, controlY + controlButtonHeight / 2);

  // Instructions
  fill('#666');
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  let instruction = '';
  if (!showExplanation) {
    if (userPrediction < 0) {
      instruction = 'Select your prediction about what\'s misleading, then click Reveal';
    } else {
      instruction = 'Click Reveal Answer to check your prediction';
    }
  } else {
    instruction = 'Read the explanation, then try Next Challenge';
    if (currentTab === 1) {
      instruction += ' (try removing the outlier!)';
    } else if (currentTab === 2) {
      instruction += ' (try expanding the range!)';
    }
  }
  text(instruction, margin, controlY + controlButtonHeight / 2);

  // Challenge counter
  textAlign(LEFT, CENTER);
  text('Challenge: ' + (challengeIndex[currentTab] + 1), margin, controlY + controlButtonHeight + 20);
}

function drawScore() {
  fill('#333');
  noStroke();
  textSize(12);
  textAlign(RIGHT, TOP);
  text('Score: ' + correctPredictions + '/' + totalAttempts, canvasWidth - margin, 12);
}

function mousePressed() {
  // Check tab clicks
  let tabY = 35;
  let totalTabWidth = tabs.length * tabButtonWidth + (tabs.length - 1) * 5;
  let startX = (canvasWidth - totalTabWidth) / 2;

  for (let i = 0; i < tabs.length; i++) {
    let x = startX + i * (tabButtonWidth + 5);
    if (mouseX >= x && mouseX <= x + tabButtonWidth &&
        mouseY >= tabY && mouseY <= tabY + tabButtonHeight) {
      if (currentTab !== i) {
        currentTab = i;
        resetScenario();
        generateData();
      }
      return;
    }
  }

  // Check prediction option clicks
  let plotRight = canvasWidth * 0.55;
  let panelX = plotRight + 20;
  let panelW = canvasWidth - plotRight - 30;
  let plotTop = 75;
  let options = predictionOptions[currentTab];
  let buttonHeight = 35;
  let buttonSpacing = 10;
  let startY = plotTop + 40;

  if (!showExplanation) {
    for (let i = 0; i < options.length; i++) {
      let by = startY + i * (buttonHeight + buttonSpacing);
      if (mouseX >= panelX && mouseX <= panelX + panelW &&
          mouseY >= by && mouseY <= by + buttonHeight) {
        userPrediction = i;
        return;
      }
    }

    // Check reveal button
    let revealY = startY + options.length * (buttonHeight + buttonSpacing) + 15;
    if (userPrediction >= 0 &&
        mouseX >= panelX + panelW / 4 && mouseX <= panelX + 3 * panelW / 4 &&
        mouseY >= revealY && mouseY <= revealY + buttonHeight) {
      showExplanation = true;
      totalAttempts++;
      let correct = userPrediction === correctAnswers[currentTab][challengeIndex[currentTab] % correctAnswers[currentTab].length];
      if (correct) correctPredictions++;
      return;
    }
  }

  // Check outlier toggle (when explanation shown, outlier tab)
  if (currentTab === 1 && showExplanation) {
    let toggleY = startY + options.length * (buttonHeight + buttonSpacing) + buttonHeight + 25;
    if (mouseX >= panelX && mouseX <= panelX + panelW &&
        mouseY >= toggleY && mouseY <= toggleY + buttonHeight) {
      outlierRemoved = !outlierRemoved;
      return;
    }
  }

  // Check range toggle (when explanation shown, restricted range tab)
  if (currentTab === 2 && showExplanation) {
    let toggleY = startY + options.length * (buttonHeight + buttonSpacing) + buttonHeight + 50;
    if (mouseX >= panelX && mouseX <= panelX + panelW &&
        mouseY >= toggleY && mouseY <= toggleY + buttonHeight) {
      rangeExpanded = !rangeExpanded;
      return;
    }
  }

  // Check Next Challenge button
  let controlY = drawHeight + 20;
  let nextX = canvasWidth - controlButtonWidth - margin;
  if (mouseX >= nextX && mouseX <= nextX + controlButtonWidth &&
      mouseY >= controlY && mouseY <= controlY + controlButtonHeight) {
    nextChallenge();
    return;
  }
}

function nextChallenge() {
  challengeIndex[currentTab]++;
  resetScenario();
  generateData();
}

function resetScenario() {
  userPrediction = -1;
  showExplanation = false;
  outlierRemoved = false;
  rangeExpanded = false;
}

function generateData() {
  currentData = [];

  switch (currentTab) {
    case 0:  // Nonlinear data
      generateNonlinearData();
      break;
    case 1:  // Outlier effect
      generateOutlierData();
      break;
    case 2:  // Restricted range
      generateRestrictedRangeData();
      break;
    case 3:  // Confounding variable
      generateConfoundingData();
      break;
  }

  // Calculate correlation
  currentR = calculateCorrelation(getDisplayData());
}

function generateNonlinearData() {
  let scenario = challengeIndex[0] % 3;
  let n = 40;

  if (scenario === 0) {
    // Parabola (U-shape)
    for (let i = 0; i < n; i++) {
      let x = random(-5, 5);
      let y = x * x + random(-1, 1);
      currentData.push({ x: x, y: y });
    }
  } else if (scenario === 1) {
    // Sine wave
    for (let i = 0; i < n; i++) {
      let x = random(0, 4 * PI);
      let y = 3 * sin(x) + random(-0.5, 0.5);
      currentData.push({ x: x, y: y });
    }
  } else {
    // Exponential
    for (let i = 0; i < n; i++) {
      let x = random(0, 3);
      let y = exp(x) + random(-0.5, 0.5);
      currentData.push({ x: x, y: y });
    }
  }

  currentR = calculateCorrelation(currentData);
}

function generateOutlierData() {
  let scenario = challengeIndex[1] % 3;
  let n = 25;

  currentData = [];

  if (scenario === 0) {
    // Outlier inflates r - originally no correlation, outlier creates apparent positive
    for (let i = 0; i < n; i++) {
      let x = random(0, 5);
      let y = random(2, 8);
      currentData.push({ x: x, y: y, isOutlier: false });
    }
    // Add inflating outlier
    currentData.push({ x: 12, y: 18, isOutlier: true });

  } else if (scenario === 1) {
    // Outlier deflates r - originally strong positive, outlier weakens it
    for (let i = 0; i < n; i++) {
      let x = random(0, 8);
      let y = x * 1.2 + 2 + random(-1, 1);
      currentData.push({ x: x, y: y, isOutlier: false });
    }
    // Add deflating outlier (high x, low y)
    currentData.push({ x: 10, y: 1, isOutlier: true });

  } else {
    // Outlier reverses r - originally negative, outlier makes it positive
    for (let i = 0; i < n; i++) {
      let x = random(0, 5);
      let y = 10 - x * 0.8 + random(-0.8, 0.8);
      currentData.push({ x: x, y: y, isOutlier: false });
    }
    // Add reversing outlier (extreme upper right)
    currentData.push({ x: 15, y: 25, isOutlier: true });
  }

  currentR = calculateCorrelation(currentData);
  let dataWithoutOutlier = currentData.filter(p => !p.isOutlier);
  withoutOutlierR = calculateCorrelation(dataWithoutOutlier);
}

function generateRestrictedRangeData() {
  // Generate data with strong linear relationship
  let n = 50;
  currentData = [];

  for (let i = 0; i < n; i++) {
    let x = random(0, 100);
    let y = x * 0.8 + 10 + random(-10, 10);
    currentData.push({ x: x, y: y });
  }

  // Calculate r for full range
  fullRangeR = calculateCorrelation(currentData);

  // Calculate r for restricted range (middle 30%)
  let restrictedData = getDisplayData();
  currentR = calculateCorrelation(restrictedData);
}

function generateConfoundingData() {
  // Generate data that looks correlated but is due to confounding
  let n = 35;
  currentData = [];

  for (let i = 0; i < n; i++) {
    // The "confounding" variable Z drives both X and Y
    let z = random(0, 10);
    let x = z * 1.5 + random(-1, 1);
    let y = z * 2 + random(-1.5, 1.5);
    currentData.push({ x: x, y: y, z: z });
  }

  currentR = calculateCorrelation(currentData);
}

function calculateCorrelation(data) {
  if (data.length < 3) return 0;

  let n = data.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

  for (let p of data) {
    sumX += p.x;
    sumY += p.y;
    sumXY += p.x * p.y;
    sumX2 += p.x * p.x;
    sumY2 += p.y * p.y;
  }

  let numerator = n * sumXY - sumX * sumY;
  let denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  if (denominator === 0) return 0;
  return numerator / denominator;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
