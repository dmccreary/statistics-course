// Skewness Explorer MicroSim
// Students classify distributions as symmetric, skewed left, or skewed right
// Learning Objective: Students will classify distributions as symmetric, skewed left, or skewed right
// Bloom Level: Understand (L2), Verb: classify
// MicroSim template version 2026.02

// ===== CANVAS DIMENSIONS =====
let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 80; // 2 rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 420;
let defaultTextSize = 16;

// ===== LAYOUT CONSTANTS =====
// Histogram area (left 70%)
let histAreaX = 15;
let histAreaY = 50;
let histAreaWidth;
let histAreaHeight = 300;

// Classification panel (right 30%)
let panelWidth = 180;
let panelX;
let panelY = 50;
let panelHeight = 300;

// ===== DISTRIBUTION DATA =====
let data = [];
let numBins = 15;
let currentSkewness = 0;
let targetSkewness = 0;

// Real-world contexts with their skewness values
let realWorldContexts = [
  { name: "Household Income", skewness: 1.5, description: "Most earn moderate wages, few earn millions" },
  { name: "Easy Exam Scores", skewness: -1.3, description: "Most students scored high, few struggled" },
  { name: "Adult Heights", skewness: 0, description: "Heights cluster around the average" },
  { name: "DMV Wait Times", skewness: 1.4, description: "Most wait briefly, some wait forever" },
  { name: "Retirement Age", skewness: -1.2, description: "Most retire around 65, few retire very early" }
];

let currentContext = null;
let isRealWorldMode = true;

// ===== GAME STATE =====
let showHint = false;
let showAnswer = false;
let userAnswer = null;
let isCorrect = null;
let streak = 0;

// ===== UI ELEMENTS =====
// Using canvas-based controls instead of DOM elements

// Button definitions
let buttons = [];
let skewnessSlider = { x: 0, y: 0, width: 200, value: 0, min: -2, max: 2, dragging: false };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Initialize layout
  updateLayout();

  // Generate initial distribution
  generateNewExample();

  describe('Interactive skewness explorer where students classify distributions as skewed left, symmetric, or skewed right by examining histograms with real-world contexts.', LABEL);
}

function updateLayout() {
  panelX = canvasWidth - panelWidth - 15;
  histAreaWidth = panelX - histAreaX - 20;

  // Update button positions
  let btnY1 = drawHeight + 12;
  let btnY2 = drawHeight + 47;
  let btnWidth = 90;
  let btnHeight = 28;
  let btnSpacing = 5;

  buttons = [
    // Row 1: Classification buttons + Show Hint
    { x: 10, y: btnY1, w: btnWidth, h: btnHeight, label: "Skewed Left", action: "left", row: 1 },
    { x: 10 + btnWidth + btnSpacing, y: btnY1, w: btnWidth, h: btnHeight, label: "Symmetric", action: "symmetric", row: 1 },
    { x: 10 + 2*(btnWidth + btnSpacing), y: btnY1, w: btnWidth, h: btnHeight, label: "Skewed Right", action: "right", row: 1 },
    { x: 10 + 3*(btnWidth + btnSpacing), y: btnY1, w: 80, h: btnHeight, label: "Show Hint", action: "hint", row: 1 },

    // Row 2: Show Answer, Next Example, Mode Toggle
    { x: 10, y: btnY2, w: 95, h: btnHeight, label: "Show Answer", action: "answer", row: 2 },
    { x: 115, y: btnY2, w: 95, h: btnHeight, label: "Next Example", action: "next", row: 2 },
    { x: 220, y: btnY2, w: 100, h: btnHeight, label: isRealWorldMode ? "Real-World" : "Random", action: "toggle", row: 2 }
  ];

  // Slider position
  skewnessSlider.x = sliderLeftMargin;
  skewnessSlider.y = btnY2 + 5;
  skewnessSlider.width = canvasWidth - sliderLeftMargin - margin - 10;
}

function generateNewExample() {
  // Reset state
  showHint = false;
  showAnswer = false;
  userAnswer = null;
  isCorrect = null;

  if (isRealWorldMode) {
    // Pick a random real-world context
    currentContext = random(realWorldContexts);
    targetSkewness = currentContext.skewness;
  } else {
    // Use slider value for custom skewness
    targetSkewness = skewnessSlider.value;
    currentContext = null;
  }

  currentSkewness = targetSkewness;

  // Generate skewed normal distribution
  data = generateSkewedData(200, currentSkewness);
}

function generateSkewedData(n, skew) {
  let result = [];

  // Use skew-normal approximation
  // For positive skew: right tail is longer
  // For negative skew: left tail is longer

  for (let i = 0; i < n; i++) {
    let x;
    if (abs(skew) < 0.3) {
      // Approximately symmetric - use standard normal
      x = randomGaussian(50, 15);
    } else if (skew > 0) {
      // Right-skewed (positive skew)
      // Use exponential-modified normal or log-normal approach
      let base = randomGaussian(0, 1);
      let skewFactor = abs(skew) * 0.5;
      if (base > 0) {
        x = 30 + base * 10 + pow(base, 2) * skewFactor * 8;
      } else {
        x = 30 + base * 8;
      }
    } else {
      // Left-skewed (negative skew) - mirror of right-skewed
      let base = randomGaussian(0, 1);
      let skewFactor = abs(skew) * 0.5;
      if (base < 0) {
        x = 70 + base * 10 - pow(base, 2) * skewFactor * 8;
      } else {
        x = 70 + base * 8;
      }
    }

    // Clamp to reasonable range
    x = constrain(x, 0, 100);
    result.push(x);
  }

  return result;
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
  textSize(22);
  text('Skewness Explorer', canvasWidth / 2 - panelWidth / 2, 12);

  // Draw histogram
  drawHistogram();

  // Draw classification panel
  drawClassificationPanel();

  // Draw buttons
  drawButtons();

  // Draw slider (only in random mode)
  if (!isRealWorldMode) {
    drawSlider();
  }

  // Draw slider label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  if (!isRealWorldMode) {
    text('Skewness: ' + skewnessSlider.value.toFixed(1), 335, drawHeight + 60);
  }
}

function drawHistogram() {
  // Histogram background
  fill(245, 250, 255);
  stroke(200, 210, 220);
  strokeWeight(2);
  rect(histAreaX, histAreaY, histAreaWidth, histAreaHeight, 8);

  // Calculate histogram bins
  let bins = new Array(numBins).fill(0);
  let binWidth = 100 / numBins;

  for (let val of data) {
    let binIndex = floor(val / binWidth);
    binIndex = constrain(binIndex, 0, numBins - 1);
    bins[binIndex]++;
  }

  // Find max bin for scaling
  let maxBin = max(bins);

  // Draw bars
  let barWidth = (histAreaWidth - 40) / numBins;
  let barAreaHeight = histAreaHeight - 60;
  let barStartY = histAreaY + histAreaHeight - 30;

  for (let i = 0; i < numBins; i++) {
    let barHeight = (bins[i] / maxBin) * barAreaHeight;
    let barX = histAreaX + 20 + i * barWidth;

    // Bar color - highlight tails if hint is shown
    if (showHint) {
      if (currentSkewness > 0.3 && i > numBins * 0.7) {
        // Right tail highlighted for right-skewed
        fill(255, 200, 100);
        stroke(255, 150, 50);
      } else if (currentSkewness < -0.3 && i < numBins * 0.3) {
        // Left tail highlighted for left-skewed
        fill(255, 200, 100);
        stroke(255, 150, 50);
      } else {
        fill(100, 150, 200);
        stroke(70, 120, 170);
      }
    } else {
      fill(100, 150, 200);
      stroke(70, 120, 170);
    }

    strokeWeight(1);
    rect(barX, barStartY - barHeight, barWidth - 2, barHeight, 2, 2, 0, 0);
  }

  // Draw axis line
  stroke(100);
  strokeWeight(2);
  line(histAreaX + 15, barStartY, histAreaX + histAreaWidth - 15, barStartY);

  // Draw direction arrows if hint shown
  if (showHint) {
    drawTailArrows(barStartY);
  }

  // Draw peak indicator
  let peakBin = bins.indexOf(maxBin);
  let peakX = histAreaX + 20 + peakBin * barWidth + barWidth / 2;
  fill(50, 100, 50);
  noStroke();
  triangle(peakX - 8, histAreaY + 35, peakX + 8, histAreaY + 35, peakX, histAreaY + 45);
  textAlign(CENTER, BOTTOM);
  textSize(11);
  text('Peak', peakX, histAreaY + 33);

  // Context label
  if (currentContext) {
    fill(60, 80, 100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text(currentContext.name, histAreaX + histAreaWidth / 2, histAreaY + 8);

    textSize(11);
    fill(100, 120, 140);
    text(currentContext.description, histAreaX + histAreaWidth / 2, histAreaY + 25);
  }
}

function drawTailArrows(barStartY) {
  let arrowY = barStartY + 15;

  // Left arrow
  stroke(150, 50, 50);
  strokeWeight(2);
  let leftArrowX = histAreaX + 40;
  line(leftArrowX, arrowY, leftArrowX + 50, arrowY);
  line(leftArrowX, arrowY, leftArrowX + 10, arrowY - 5);
  line(leftArrowX, arrowY, leftArrowX + 10, arrowY + 5);

  // Right arrow
  let rightArrowX = histAreaX + histAreaWidth - 90;
  line(rightArrowX, arrowY, rightArrowX + 50, arrowY);
  line(rightArrowX + 50, arrowY, rightArrowX + 40, arrowY - 5);
  line(rightArrowX + 50, arrowY, rightArrowX + 40, arrowY + 5);

  // Labels
  noStroke();
  fill(150, 50, 50);
  textSize(10);
  textAlign(CENTER, TOP);
  text('Left Tail', leftArrowX + 25, arrowY + 8);
  text('Right Tail', rightArrowX + 25, arrowY + 8);

  // Highlight longer tail
  if (currentSkewness > 0.3) {
    fill(255, 100, 50);
    textSize(12);
    text('LONGER', rightArrowX + 25, arrowY + 20);
  } else if (currentSkewness < -0.3) {
    fill(255, 100, 50);
    textSize(12);
    text('LONGER', leftArrowX + 25, arrowY + 20);
  }
}

function drawClassificationPanel() {
  // Panel background
  fill(250, 250, 255);
  stroke(180, 190, 210);
  strokeWeight(2);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  // Panel title
  fill(60, 70, 90);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text('Classification', panelX + panelWidth / 2, panelY + 10);

  // Visual direction aid
  let aidY = panelY + 40;
  drawDirectionAid(panelX + 20, aidY, panelWidth - 40, 60);

  // Feedback area
  let feedbackY = panelY + 120;

  if (userAnswer !== null) {
    // Show feedback
    if (isCorrect) {
      fill(50, 150, 50);
      textSize(18);
      textAlign(CENTER, TOP);
      text('Correct!', panelX + panelWidth / 2, feedbackY);

      fill(70, 130, 70);
      textSize(12);
      text('Streak: ' + streak, panelX + panelWidth / 2, feedbackY + 25);
    } else {
      fill(180, 50, 50);
      textSize(16);
      textAlign(CENTER, TOP);
      text('Not quite...', panelX + panelWidth / 2, feedbackY);

      fill(100, 80, 80);
      textSize(12);
      text('Try again or', panelX + panelWidth / 2, feedbackY + 22);
      text('Show Answer', panelX + panelWidth / 2, feedbackY + 36);
    }
  } else if (showAnswer) {
    // Show the correct answer
    fill(50, 100, 150);
    textSize(14);
    textAlign(CENTER, TOP);
    text('Answer:', panelX + panelWidth / 2, feedbackY);

    textSize(16);
    fill(30, 80, 130);
    let answerText = getCorrectAnswer();
    text(answerText, panelX + panelWidth / 2, feedbackY + 20);
  } else {
    // Instructions
    fill(100, 110, 130);
    textSize(12);
    textAlign(CENTER, TOP);
    text('Examine the', panelX + panelWidth / 2, feedbackY);
    text('histogram shape.', panelX + panelWidth / 2, feedbackY + 16);
    text('Which direction is', panelX + panelWidth / 2, feedbackY + 36);
    text('the longer tail?', panelX + panelWidth / 2, feedbackY + 52);
  }

  // Hint reminder
  if (showHint) {
    fill(200, 150, 50);
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text('Hint: Tails highlighted', panelX + panelWidth / 2, panelY + panelHeight - 40);
    text('in orange', panelX + panelWidth / 2, panelY + panelHeight - 26);
  }

  // Stats display at bottom
  fill(80, 90, 110);
  textSize(11);
  textAlign(CENTER, BOTTOM);
  if (!isRealWorldMode) {
    text('Skewness: ' + currentSkewness.toFixed(2), panelX + panelWidth / 2, panelY + panelHeight - 8);
  }
}

function drawDirectionAid(x, y, w, h) {
  // Draw a visual showing skew directions
  let midX = x + w / 2;

  // Left skew example
  fill(220, 230, 240);
  stroke(180, 190, 200);
  strokeWeight(1);

  // Simplified distribution shapes
  let shapeH = 25;

  // Left-skewed shape
  noStroke();
  fill(180, 200, 220);
  beginShape();
  vertex(x + 5, y + shapeH);
  vertex(x + 15, y + 10);
  vertex(x + 35, y + 5);
  vertex(x + 50, y + shapeH);
  endShape(CLOSE);

  fill(100, 120, 140);
  textSize(9);
  textAlign(CENTER, TOP);
  text('Left', x + 27, y + shapeH + 3);

  // Symmetric shape
  fill(180, 200, 220);
  beginShape();
  vertex(midX - 25, y + shapeH);
  vertex(midX - 15, y + 8);
  vertex(midX, y + 3);
  vertex(midX + 15, y + 8);
  vertex(midX + 25, y + shapeH);
  endShape(CLOSE);

  fill(100, 120, 140);
  text('Symmetric', midX, y + shapeH + 3);

  // Right-skewed shape
  fill(180, 200, 220);
  beginShape();
  vertex(x + w - 50, y + shapeH);
  vertex(x + w - 35, y + 5);
  vertex(x + w - 15, y + 10);
  vertex(x + w - 5, y + shapeH);
  endShape(CLOSE);

  fill(100, 120, 140);
  text('Right', x + w - 27, y + shapeH + 3);

  // Arrow labels
  textSize(8);
  fill(150, 100, 100);
  text('tail <-', x + 12, y + shapeH + 14);
  text('-> tail', x + w - 12, y + shapeH + 14);
}

function getCorrectAnswer() {
  if (currentSkewness > 0.3) {
    return "Skewed Right";
  } else if (currentSkewness < -0.3) {
    return "Skewed Left";
  } else {
    return "Symmetric";
  }
}

function checkAnswer(answer) {
  userAnswer = answer;
  let correct = getCorrectAnswer();

  if (answer === "left" && correct === "Skewed Left") {
    isCorrect = true;
    streak++;
  } else if (answer === "symmetric" && correct === "Symmetric") {
    isCorrect = true;
    streak++;
  } else if (answer === "right" && correct === "Skewed Right") {
    isCorrect = true;
    streak++;
  } else {
    isCorrect = false;
    streak = 0;
  }
}

function drawButtons() {
  for (let btn of buttons) {
    // Update toggle button label
    if (btn.action === "toggle") {
      btn.label = isRealWorldMode ? "Real-World" : "Random";
    }

    // Button background
    let isHovered = mouseX > btn.x && mouseX < btn.x + btn.w &&
                    mouseY > btn.y && mouseY < btn.y + btn.h;

    // Special coloring for classification buttons after answer
    if (showAnswer || userAnswer !== null) {
      let correct = getCorrectAnswer();
      if ((btn.action === "left" && correct === "Skewed Left") ||
          (btn.action === "symmetric" && correct === "Symmetric") ||
          (btn.action === "right" && correct === "Skewed Right")) {
        fill(100, 180, 100);
        stroke(70, 140, 70);
      } else if (btn.action === "left" || btn.action === "symmetric" || btn.action === "right") {
        fill(isHovered ? 230 : 220);
        stroke(180);
      } else {
        fill(isHovered ? 230 : 240);
        stroke(200);
      }
    } else {
      if (btn.action === "left") {
        fill(isHovered ? '#FFD0D0' : '#FFE0E0');
        stroke('#E0A0A0');
      } else if (btn.action === "symmetric") {
        fill(isHovered ? '#D0FFD0' : '#E0FFE0');
        stroke('#A0E0A0');
      } else if (btn.action === "right") {
        fill(isHovered ? '#D0D0FF' : '#E0E0FF');
        stroke('#A0A0E0');
      } else if (btn.action === "next") {
        fill(isHovered ? '#B0D0FF' : '#C0E0FF');
        stroke('#80A0D0');
      } else {
        fill(isHovered ? 230 : 240);
        stroke(200);
      }
    }

    strokeWeight(1);
    rect(btn.x, btn.y, btn.w, btn.h, 5);

    // Button text
    fill(40);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
  }
}

function drawSlider() {
  let sl = skewnessSlider;

  // Slider track
  stroke(180);
  strokeWeight(4);
  line(sl.x, sl.y + 10, sl.x + sl.width, sl.y + 10);

  // Slider filled portion
  let handleX = map(sl.value, sl.min, sl.max, sl.x, sl.x + sl.width);
  stroke(100, 150, 200);
  line(sl.x, sl.y + 10, handleX, sl.y + 10);

  // Slider handle
  fill(80, 130, 180);
  stroke(60, 100, 150);
  strokeWeight(2);
  ellipse(handleX, sl.y + 10, 18, 18);

  // Value label
  fill(50);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(10);
  text(sl.value.toFixed(1), handleX, sl.y + 22);
}

function mousePressed() {
  // Check button clicks
  for (let btn of buttons) {
    if (mouseX > btn.x && mouseX < btn.x + btn.w &&
        mouseY > btn.y && mouseY < btn.y + btn.h) {
      handleButtonClick(btn.action);
      return;
    }
  }

  // Check slider click (only in random mode)
  if (!isRealWorldMode) {
    let sl = skewnessSlider;
    let handleX = map(sl.value, sl.min, sl.max, sl.x, sl.x + sl.width);
    if (dist(mouseX, mouseY, handleX, sl.y + 10) < 15) {
      sl.dragging = true;
    }
  }
}

function mouseDragged() {
  if (!isRealWorldMode && skewnessSlider.dragging) {
    let sl = skewnessSlider;
    let newVal = map(mouseX, sl.x, sl.x + sl.width, sl.min, sl.max);
    sl.value = constrain(newVal, sl.min, sl.max);
    // Round to 0.1
    sl.value = round(sl.value * 10) / 10;
  }
}

function mouseReleased() {
  skewnessSlider.dragging = false;
}

function handleButtonClick(action) {
  if (action === "left" || action === "symmetric" || action === "right") {
    if (userAnswer === null && !showAnswer) {
      checkAnswer(action);
    }
  } else if (action === "hint") {
    showHint = !showHint;
  } else if (action === "answer") {
    showAnswer = true;
    streak = 0;
  } else if (action === "next") {
    generateNewExample();
  } else if (action === "toggle") {
    isRealWorldMode = !isRealWorldMode;
    generateNewExample();
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
