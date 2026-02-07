// Pattern Recognition Gallery MicroSim
// Chapter 6: Scatterplots and Correlation
// Students will classify scatterplots by their form (linear positive, linear negative, nonlinear, no association)
// Learning objective: Analyze (Bloom Level 4)
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 750;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 10;
let defaultTextSize = 14;

// Scatterplot types and their generation parameters
const PLOT_TYPES = {
  LINEAR_POS: { name: "Linear (Positive)", color: [46, 125, 50] },      // Green
  LINEAR_NEG: { name: "Linear (Negative)", color: [198, 40, 40] },      // Red
  NONLINEAR: { name: "Nonlinear", color: [106, 27, 154] },              // Purple
  NO_ASSOC: { name: "No Association", color: [66, 66, 66] }             // Gray
};

// Gallery state
let scatterplots = [];  // Array of 6 scatterplot objects
let selectedPlot = -1;  // Currently selected thumbnail index (-1 = none)
let score = 0;
let hintsRemaining = 3;
let showingHint = false;
let feedbackMessage = "";
let feedbackColor = [0, 0, 0];
let feedbackTimer = 0;
let allCorrect = false;
let completedSets = 0;

// Button definitions (calculated in setup)
let classifyButtons = [];
let nextSetButton = {};
let hintButton = {};

// Difficulty level (affects noise in scatterplots)
let difficulty = 1;  // 1 = easy, 2 = medium, 3 = hard

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Generate initial set of scatterplots
  generateNewSet();

  describe('Pattern Recognition Gallery for classifying scatterplots by their form: linear positive, linear negative, nonlinear, or no association. Features a 2x3 thumbnail grid, preview area, and classification buttons.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Draw background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title and score
  drawHeader();

  // Draw the two main areas
  drawThumbnailGrid();
  drawPreviewArea();

  // Draw control buttons
  drawControlButtons();

  // Draw feedback message if active
  if (feedbackTimer > 0) {
    drawFeedback();
    feedbackTimer--;
  }

  // Draw hint overlay if showing
  if (showingHint && selectedPlot >= 0) {
    drawHintOverlay();
  }

  // Check for completion
  if (allCorrect) {
    drawCompletionMessage();
  }
}

function drawHeader() {
  noStroke();
  fill(50);
  textAlign(LEFT, TOP);
  textSize(18);
  textStyle(BOLD);
  text("Scatterplot Pattern Gallery", 15, 8);
  textStyle(NORMAL);

  // Score display
  textAlign(RIGHT, TOP);
  textSize(14);
  fill(46, 125, 50);
  text("Score: " + score, canvasWidth - 15, 8);

  // Hints remaining
  fill(100);
  textSize(12);
  text("Hints: " + hintsRemaining, canvasWidth - 15, 26);
}

function drawThumbnailGrid() {
  let gridX = 15;
  let gridY = 40;
  let thumbWidth = 100;
  let thumbHeight = 80;
  let gap = 10;

  // Grid is 2 columns x 3 rows
  for (let i = 0; i < 6; i++) {
    let col = i % 2;
    let row = Math.floor(i / 2);
    let x = gridX + col * (thumbWidth + gap);
    let y = gridY + row * (thumbHeight + gap);

    let plot = scatterplots[i];
    let isSelected = (selectedPlot === i);
    let isHovered = mouseX >= x && mouseX <= x + thumbWidth &&
                    mouseY >= y && mouseY <= y + thumbHeight;

    // Thumbnail background
    if (plot.classified) {
      if (plot.correct) {
        fill(220, 255, 220);  // Light green for correct
        stroke(46, 125, 50);
      } else {
        fill(255, 220, 220);  // Light red for incorrect
        stroke(198, 40, 40);
      }
    } else if (isSelected) {
      fill(255, 248, 225);  // Light yellow for selected
      stroke(255, 152, 0);
    } else if (isHovered) {
      fill(240, 248, 255);
      stroke(100, 149, 237);
    } else {
      fill(255);
      stroke(180);
    }
    strokeWeight(isSelected ? 3 : 1);
    rect(x, y, thumbWidth, thumbHeight, 4);

    // Draw miniature scatterplot
    drawMiniScatterplot(x + 5, y + 5, thumbWidth - 10, thumbHeight - 10, plot.points);

    // Draw checkmark or X for classified plots
    if (plot.classified) {
      textSize(20);
      noStroke();
      if (plot.correct) {
        fill(46, 125, 50);
        text("\u2713", x + thumbWidth - 20, y + 5);  // Checkmark
      }
    }

    // Index number
    noStroke();
    fill(100);
    textSize(10);
    textAlign(LEFT, TOP);
    text((i + 1).toString(), x + 4, y + 2);
  }
}

function drawMiniScatterplot(x, y, w, h, points) {
  // Draw axes
  stroke(200);
  strokeWeight(1);
  line(x, y + h, x + w, y + h);  // x-axis
  line(x, y, x, y + h);          // y-axis

  // Draw points
  noStroke();
  fill(70, 130, 180, 180);  // Steel blue with transparency
  for (let pt of points) {
    let px = map(pt.x, 0, 100, x + 2, x + w - 2);
    let py = map(pt.y, 0, 100, y + h - 2, y + 2);
    ellipse(px, py, 4, 4);
  }
}

function drawPreviewArea() {
  let previewX = 240;
  let previewY = 40;
  let previewWidth = canvasWidth - previewX - 15;
  let previewHeight = 280;

  // Preview background
  fill(255);
  stroke(150);
  strokeWeight(1);
  rect(previewX, previewY, previewWidth, previewHeight, 6);

  if (selectedPlot >= 0) {
    let plot = scatterplots[selectedPlot];

    // Title
    noStroke();
    fill(50);
    textAlign(CENTER, TOP);
    textSize(14);
    textStyle(BOLD);
    text("Scatterplot " + (selectedPlot + 1), previewX + previewWidth / 2, previewY + 8);
    textStyle(NORMAL);

    // Draw larger scatterplot
    let plotX = previewX + 40;
    let plotY = previewY + 35;
    let plotW = previewWidth - 60;
    let plotH = previewHeight - 50;

    drawLargeScatterplot(plotX, plotY, plotW, plotH, plot.points);

    // If already classified, show the answer
    if (plot.classified) {
      let typeInfo = PLOT_TYPES[plot.type];
      textAlign(CENTER, TOP);
      textSize(12);
      fill(typeInfo.color[0], typeInfo.color[1], typeInfo.color[2]);
      textStyle(BOLD);
      text("Type: " + typeInfo.name, previewX + previewWidth / 2, previewY + previewHeight - 18);
      textStyle(NORMAL);
    }
  } else {
    // No selection message
    noStroke();
    fill(150);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("Click a thumbnail to select", previewX + previewWidth / 2, previewY + previewHeight / 2 - 10);
    textSize(12);
    text("Then classify the pattern", previewX + previewWidth / 2, previewY + previewHeight / 2 + 15);
  }

  // Classification buttons (only show if plot selected and not classified)
  if (selectedPlot >= 0 && !scatterplots[selectedPlot].classified) {
    drawClassificationButtons(previewX, previewY + previewHeight + 5, previewWidth);
  }
}

function drawLargeScatterplot(x, y, w, h, points) {
  // Draw axes
  stroke(100);
  strokeWeight(1);
  line(x, y + h, x + w, y + h);  // x-axis
  line(x, y, x, y + h);          // y-axis

  // Axis labels
  noStroke();
  fill(100);
  textSize(10);
  textAlign(CENTER, TOP);
  text("X", x + w / 2, y + h + 2);

  push();
  translate(x - 8, y + h / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM);
  text("Y", 0, 0);
  pop();

  // Grid lines (subtle)
  stroke(230);
  strokeWeight(1);
  for (let i = 1; i < 5; i++) {
    let gx = x + (w * i / 5);
    let gy = y + (h * i / 5);
    line(gx, y, gx, y + h);  // vertical
    line(x, gy, x + w, gy);  // horizontal
  }

  // Draw points
  noStroke();
  fill(70, 130, 180);  // Steel blue
  for (let pt of points) {
    let px = map(pt.x, 0, 100, x + 5, x + w - 5);
    let py = map(pt.y, 0, 100, y + h - 5, y + 5);
    ellipse(px, py, 8, 8);
  }
}

function drawClassificationButtons(baseX, baseY, areaWidth) {
  let buttonWidth = (areaWidth - 30) / 2;
  let buttonHeight = 28;
  let gap = 10;

  let types = Object.keys(PLOT_TYPES);

  for (let i = 0; i < 4; i++) {
    let col = i % 2;
    let row = Math.floor(i / 2);
    let x = baseX + col * (buttonWidth + gap);
    let y = baseY + row * (buttonHeight + 5);

    let typeKey = types[i];
    let typeInfo = PLOT_TYPES[typeKey];

    // Store button bounds for click detection
    classifyButtons[i] = { x: x, y: y, w: buttonWidth, h: buttonHeight, type: typeKey };

    // Check hover
    let isHovered = mouseX >= x && mouseX <= x + buttonWidth &&
                    mouseY >= y && mouseY <= y + buttonHeight;

    // Button background
    if (isHovered) {
      fill(typeInfo.color[0], typeInfo.color[1], typeInfo.color[2], 40);
      stroke(typeInfo.color[0], typeInfo.color[1], typeInfo.color[2]);
    } else {
      fill(250);
      stroke(typeInfo.color[0], typeInfo.color[1], typeInfo.color[2], 150);
    }
    strokeWeight(2);
    rect(x, y, buttonWidth, buttonHeight, 4);

    // Button text
    noStroke();
    fill(typeInfo.color[0], typeInfo.color[1], typeInfo.color[2]);
    textAlign(CENTER, CENTER);
    textSize(12);
    text(typeInfo.name, x + buttonWidth / 2, y + buttonHeight / 2);
  }
}

function drawControlButtons() {
  let buttonY = drawHeight + 15;
  let buttonHeight = 32;

  // Next Set button
  let nextX = 20;
  let nextWidth = 100;
  nextSetButton = { x: nextX, y: buttonY, w: nextWidth, h: buttonHeight };

  let nextHovered = mouseX >= nextX && mouseX <= nextX + nextWidth &&
                    mouseY >= buttonY && mouseY <= buttonY + buttonHeight;

  if (nextHovered) {
    fill(220, 240, 255);
  } else {
    fill(240);
  }
  stroke(100);
  strokeWeight(1);
  rect(nextX, buttonY, nextWidth, buttonHeight, 5);

  noStroke();
  fill(50);
  textAlign(CENTER, CENTER);
  textSize(13);
  text("Next Set", nextX + nextWidth / 2, buttonY + buttonHeight / 2);

  // Hint button
  let hintX = nextX + nextWidth + 15;
  let hintWidth = 80;
  hintButton = { x: hintX, y: buttonY, w: hintWidth, h: buttonHeight };

  let hintHovered = mouseX >= hintX && mouseX <= hintX + hintWidth &&
                    mouseY >= buttonY && mouseY <= buttonY + buttonHeight;

  if (hintsRemaining <= 0) {
    fill(220);
    stroke(180);
  } else if (hintHovered) {
    fill(255, 248, 225);
    stroke(255, 152, 0);
  } else {
    fill(240);
    stroke(100);
  }
  strokeWeight(1);
  rect(hintX, buttonY, hintWidth, buttonHeight, 5);

  noStroke();
  fill(hintsRemaining > 0 ? 50 : 150);
  text("Hint (" + hintsRemaining + ")", hintX + hintWidth / 2, buttonY + buttonHeight / 2);

  // Difficulty selector
  let diffX = hintX + hintWidth + 30;
  noStroke();
  fill(80);
  textAlign(LEFT, CENTER);
  textSize(12);
  text("Difficulty:", diffX, buttonY + buttonHeight / 2);

  let diffButtonWidth = 55;
  let diffLabels = ["Easy", "Medium", "Hard"];
  for (let i = 0; i < 3; i++) {
    let bx = diffX + 65 + i * (diffButtonWidth + 5);
    let isActive = (difficulty === i + 1);
    let isHovered = mouseX >= bx && mouseX <= bx + diffButtonWidth &&
                    mouseY >= buttonY && mouseY <= buttonY + buttonHeight;

    if (isActive) {
      fill(70, 130, 180);
      stroke(50, 100, 150);
    } else if (isHovered) {
      fill(220, 235, 250);
      stroke(100);
    } else {
      fill(240);
      stroke(150);
    }
    strokeWeight(1);
    rect(bx, buttonY, diffButtonWidth, buttonHeight, 5);

    noStroke();
    fill(isActive ? 255 : 80);
    textAlign(CENTER, CENTER);
    textSize(12);
    text(diffLabels[i], bx + diffButtonWidth / 2, buttonY + buttonHeight / 2);
  }

  // Progress indicator
  let correctCount = scatterplots.filter(p => p.classified && p.correct).length;
  let classifiedCount = scatterplots.filter(p => p.classified).length;

  textAlign(RIGHT, TOP);
  textSize(12);
  fill(80);
  noStroke();
  text("Progress: " + correctCount + "/6 correct", canvasWidth - 20, drawHeight + 60);

  // Sets completed
  if (completedSets > 0) {
    text("Sets completed: " + completedSets, canvasWidth - 20, drawHeight + 78);
  }
}

function drawFeedback() {
  let feedbackY = drawHeight - 35;

  noStroke();
  fill(feedbackColor[0], feedbackColor[1], feedbackColor[2]);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(feedbackMessage, canvasWidth / 2, feedbackY);
  textStyle(NORMAL);
}

function drawHintOverlay() {
  if (selectedPlot < 0) return;

  let plot = scatterplots[selectedPlot];
  let previewX = 240;
  let previewY = 40;
  let previewWidth = canvasWidth - previewX - 15;
  let previewHeight = 280;

  let plotX = previewX + 40;
  let plotY = previewY + 35;
  let plotW = previewWidth - 60;
  let plotH = previewHeight - 50;

  // Draw trend line or curve based on type
  stroke(255, 152, 0);
  strokeWeight(3);
  noFill();

  if (plot.type === 'LINEAR_POS') {
    // Positive slope line
    line(plotX + 10, plotY + plotH - 20, plotX + plotW - 10, plotY + 20);
  } else if (plot.type === 'LINEAR_NEG') {
    // Negative slope line
    line(plotX + 10, plotY + 20, plotX + plotW - 10, plotY + plotH - 20);
  } else if (plot.type === 'NONLINEAR') {
    // Curved line (parabola or exponential)
    beginShape();
    for (let i = 0; i <= 20; i++) {
      let t = i / 20;
      let x = plotX + 10 + t * (plotW - 20);
      let y;
      if (plot.curveType === 'parabola') {
        // U-shaped or inverted U
        let normalized = (t - 0.5) * 2;
        y = plotY + plotH / 2 + (plot.curveDirection * normalized * normalized * plotH * 0.4);
      } else {
        // Exponential-ish curve
        y = plotY + plotH - 20 - (1 - Math.exp(-3 * t)) * (plotH - 40);
      }
      curveVertex(x, y);
    }
    endShape();
  } else {
    // No association - draw horizontal line through middle
    setLineDash([5, 5]);
    line(plotX + 10, plotY + plotH / 2, plotX + plotW - 10, plotY + plotH / 2);
    setLineDash([]);
  }

  // Hint label
  fill(255, 152, 0);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text("Look at the overall trend", previewX + previewWidth / 2, previewY + previewHeight - 35);
}

function setLineDash(pattern) {
  drawingContext.setLineDash(pattern);
}

function drawCompletionMessage() {
  // Semi-transparent overlay
  fill(0, 0, 0, 100);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Completion panel
  let panelWidth = 300;
  let panelHeight = 150;
  let panelX = (canvasWidth - panelWidth) / 2;
  let panelY = (drawHeight - panelHeight) / 2;

  fill(255);
  stroke(46, 125, 50);
  strokeWeight(3);
  rect(panelX, panelY, panelWidth, panelHeight, 10);

  noStroke();
  fill(46, 125, 50);
  textAlign(CENTER, CENTER);
  textSize(20);
  textStyle(BOLD);
  text("Excellent Work!", panelX + panelWidth / 2, panelY + 35);

  textStyle(NORMAL);
  fill(60);
  textSize(14);
  text("You classified all 6 scatterplots!", panelX + panelWidth / 2, panelY + 65);
  text("Your score: " + score, panelX + panelWidth / 2, panelY + 90);

  // Continue button
  let btnWidth = 120;
  let btnHeight = 30;
  let btnX = panelX + (panelWidth - btnWidth) / 2;
  let btnY = panelY + panelHeight - 45;

  let isHovered = mouseX >= btnX && mouseX <= btnX + btnWidth &&
                  mouseY >= btnY && mouseY <= btnY + btnHeight;

  fill(isHovered ? 46 : 76, isHovered ? 125 : 155, isHovered ? 50 : 80);
  stroke(46, 125, 50);
  strokeWeight(1);
  rect(btnX, btnY, btnWidth, btnHeight, 5);

  noStroke();
  fill(255);
  textSize(13);
  text("Try New Set", btnX + btnWidth / 2, btnY + btnHeight / 2);
}

function generateNewSet() {
  scatterplots = [];
  selectedPlot = -1;
  allCorrect = false;
  showingHint = false;

  // Create array of types (ensure at least one of each, random for remaining)
  let types = ['LINEAR_POS', 'LINEAR_NEG', 'NONLINEAR', 'NO_ASSOC'];
  let plotTypes = [...types];  // Start with one of each

  // Add 2 more random types
  for (let i = 0; i < 2; i++) {
    plotTypes.push(types[Math.floor(Math.random() * types.length)]);
  }

  // Shuffle the array
  for (let i = plotTypes.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [plotTypes[i], plotTypes[j]] = [plotTypes[j], plotTypes[i]];
  }

  // Generate scatterplots
  for (let i = 0; i < 6; i++) {
    scatterplots.push(generateScatterplot(plotTypes[i]));
  }
}

function generateScatterplot(type) {
  let points = [];
  let numPoints = 25 + Math.floor(Math.random() * 15);  // 25-40 points

  // Noise level based on difficulty
  let noiseLevel = [15, 25, 35][difficulty - 1];

  let curveType = '';
  let curveDirection = 1;

  for (let i = 0; i < numPoints; i++) {
    let x = Math.random() * 100;
    let y;

    switch (type) {
      case 'LINEAR_POS':
        // y = mx + b with positive slope
        let slope = 0.6 + Math.random() * 0.4;  // 0.6 to 1.0
        y = slope * x + 10 + (Math.random() - 0.5) * noiseLevel * 2;
        break;

      case 'LINEAR_NEG':
        // y = -mx + b with negative slope
        let negSlope = 0.6 + Math.random() * 0.4;
        y = 100 - negSlope * x + (Math.random() - 0.5) * noiseLevel * 2;
        break;

      case 'NONLINEAR':
        // Quadratic or exponential relationship
        if (Math.random() < 0.5) {
          // Parabola (U-shaped or inverted)
          curveType = 'parabola';
          curveDirection = Math.random() < 0.5 ? 1 : -1;
          let centered = (x - 50) / 50;  // -1 to 1
          y = 50 + curveDirection * centered * centered * 40 + (Math.random() - 0.5) * noiseLevel;
        } else {
          // Exponential-ish
          curveType = 'exponential';
          y = 10 + (1 - Math.exp(-x / 30)) * 80 + (Math.random() - 0.5) * noiseLevel;
        }
        break;

      case 'NO_ASSOC':
        // Random scatter
        y = Math.random() * 100;
        break;
    }

    // Clamp y to valid range
    y = Math.max(5, Math.min(95, y));
    points.push({ x: x, y: y });
  }

  return {
    type: type,
    points: points,
    classified: false,
    correct: false,
    curveType: curveType,
    curveDirection: curveDirection
  };
}

function mousePressed() {
  // Check completion panel continue button
  if (allCorrect) {
    let panelWidth = 300;
    let panelHeight = 150;
    let panelX = (canvasWidth - panelWidth) / 2;
    let panelY = (drawHeight - panelHeight) / 2;
    let btnWidth = 120;
    let btnHeight = 30;
    let btnX = panelX + (panelWidth - btnWidth) / 2;
    let btnY = panelY + panelHeight - 45;

    if (mouseX >= btnX && mouseX <= btnX + btnWidth &&
        mouseY >= btnY && mouseY <= btnY + btnHeight) {
      completedSets++;
      generateNewSet();
      return;
    }
    return;  // Don't process other clicks when completion panel is showing
  }

  // Check thumbnail grid clicks
  let gridX = 15;
  let gridY = 40;
  let thumbWidth = 100;
  let thumbHeight = 80;
  let gap = 10;

  for (let i = 0; i < 6; i++) {
    let col = i % 2;
    let row = Math.floor(i / 2);
    let x = gridX + col * (thumbWidth + gap);
    let y = gridY + row * (thumbHeight + gap);

    if (mouseX >= x && mouseX <= x + thumbWidth &&
        mouseY >= y && mouseY <= y + thumbHeight) {
      selectedPlot = i;
      showingHint = false;
      return;
    }
  }

  // Check classification button clicks
  if (selectedPlot >= 0 && !scatterplots[selectedPlot].classified) {
    for (let btn of classifyButtons) {
      if (btn && mouseX >= btn.x && mouseX <= btn.x + btn.w &&
          mouseY >= btn.y && mouseY <= btn.y + btn.h) {
        classifyPlot(btn.type);
        return;
      }
    }
  }

  // Check Next Set button
  if (mouseX >= nextSetButton.x && mouseX <= nextSetButton.x + nextSetButton.w &&
      mouseY >= nextSetButton.y && mouseY <= nextSetButton.y + nextSetButton.h) {
    generateNewSet();
    return;
  }

  // Check Hint button
  if (hintsRemaining > 0 && selectedPlot >= 0 && !scatterplots[selectedPlot].classified) {
    if (mouseX >= hintButton.x && mouseX <= hintButton.x + hintButton.w &&
        mouseY >= hintButton.y && mouseY <= hintButton.y + hintButton.h) {
      showingHint = true;
      hintsRemaining--;
      return;
    }
  }

  // Check difficulty buttons
  let diffX = hintButton.x + hintButton.w + 30 + 65;
  let diffButtonWidth = 55;
  let buttonY = drawHeight + 15;
  let buttonHeight = 32;

  for (let i = 0; i < 3; i++) {
    let bx = diffX + i * (diffButtonWidth + 5);
    if (mouseX >= bx && mouseX <= bx + diffButtonWidth &&
        mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
      difficulty = i + 1;
      generateNewSet();
      return;
    }
  }
}

function classifyPlot(guessType) {
  if (selectedPlot < 0) return;

  let plot = scatterplots[selectedPlot];
  plot.classified = true;
  plot.correct = (guessType === plot.type);
  showingHint = false;

  if (plot.correct) {
    score++;
    feedbackMessage = "Correct! This is a " + PLOT_TYPES[plot.type].name + " pattern.";
    feedbackColor = [46, 125, 50];  // Green
  } else {
    feedbackMessage = "Not quite. This is actually a " + PLOT_TYPES[plot.type].name + " pattern.";
    feedbackColor = [198, 40, 40];  // Red
  }
  feedbackTimer = 120;  // About 2 seconds at 60fps

  // Check if all 6 are correctly classified
  let correctCount = scatterplots.filter(p => p.classified && p.correct).length;
  if (correctCount === 6) {
    allCorrect = true;
  }

  // Auto-select next unclassified plot
  for (let i = 0; i < 6; i++) {
    if (!scatterplots[i].classified) {
      selectedPlot = i;
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = Math.min(containerWidth, 750);  // Max width 750px
}
