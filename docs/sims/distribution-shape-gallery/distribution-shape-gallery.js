// Distribution Shape Gallery MicroSim
// Chapter 3: Displaying Quantitative Data
// Students will identify characteristics of unimodal, bimodal, and uniform distributions
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

// Distribution types and their properties
let distributions = [
  {
    name: "Unimodal",
    color: [70, 130, 180],       // Steel blue
    lightColor: [135, 180, 220], // Lighter blue for shading
    keyFeature: "Single peak",
    examples: [
      "Test scores in a class",
      "Human heights",
      "Daily temperatures",
      "Reaction times",
      "Birth weights"
    ],
    currentExampleIndex: 0
  },
  {
    name: "Bimodal",
    color: [138, 43, 226],       // Purple
    lightColor: [180, 130, 230], // Lighter purple for shading
    keyFeature: "Two peaks",
    examples: [
      "Old Faithful geyser eruptions",
      "Marathon finish times",
      "Gender-mixed height data",
      "Rush hour traffic times",
      "Seasonal temperatures"
    ],
    currentExampleIndex: 0
  },
  {
    name: "Uniform",
    color: [34, 139, 34],        // Forest green
    lightColor: [100, 180, 100], // Lighter green for shading
    keyFeature: "Flat shape",
    examples: [
      "Dice roll outcomes",
      "Random number generators",
      "Birth months",
      "Card suit draws",
      "Spinner results"
    ],
    currentExampleIndex: 0
  }
];

// UI State
let shuffleButton;
let quizButton;
let quizMode = false;
let quizQuestion = null;
let selectedAnswer = -1;
let showingFeedback = false;
let feedbackTimer = 0;
let correctAnswer = -1;
let hoveredDist = -1;
let clickedDist = -1;
let enlargedDist = -1;

// Generate histogram data for each distribution type
function generateUnimodalData() {
  let data = [];
  for (let i = 0; i < 20; i++) {
    // Bell curve approximation
    let x = (i - 10) / 3;
    let height = Math.exp(-x * x / 2) * 100 + random(-5, 5);
    data.push(max(5, height));
  }
  return data;
}

function generateBimodalData() {
  let data = [];
  for (let i = 0; i < 20; i++) {
    // Two bell curves
    let x1 = (i - 5) / 2;
    let x2 = (i - 15) / 2;
    let height = (Math.exp(-x1 * x1 / 2) + Math.exp(-x2 * x2 / 2)) * 50 + random(-5, 5);
    data.push(max(5, height));
  }
  return data;
}

function generateUniformData() {
  let data = [];
  let baseHeight = 50;
  for (let i = 0; i < 20; i++) {
    data.push(baseHeight + random(-8, 8));
  }
  return data;
}

// Store histogram data
let histogramData = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Generate initial histogram data
  histogramData = [
    generateUnimodalData(),
    generateBimodalData(),
    generateUniformData()
  ];

  // Create buttons using canvas-based controls (will be drawn in draw())

  describe('Distribution Shape Gallery showing three histogram types: unimodal, bimodal, and uniform. Interactive with hover tooltips and quiz mode.', LABEL);
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
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  text('Distribution Shape Gallery', canvasWidth / 2, 10);

  textSize(defaultTextSize);

  // Calculate column dimensions
  let colWidth = (canvasWidth - 40) / 3;
  let colHeight = 280;
  let startY = 45;
  let startX = 20;

  // Check for hover
  hoveredDist = -1;
  for (let i = 0; i < 3; i++) {
    let x = startX + i * (colWidth + 10);
    if (mouseX >= x && mouseX <= x + colWidth && mouseY >= startY && mouseY <= startY + colHeight) {
      hoveredDist = i;
    }
  }

  // Draw each distribution column
  for (let i = 0; i < 3; i++) {
    let x = startX + i * (colWidth + 10);
    let dist = distributions[i];
    let isHovered = (hoveredDist === i);
    let isEnlarged = (enlargedDist === i);

    if (!isEnlarged) {
      drawDistributionColumn(x, startY, colWidth, colHeight, i, isHovered);
    }
  }

  // Draw enlarged view on top if active
  if (enlargedDist >= 0) {
    drawEnlargedView(enlargedDist);
  }

  // Draw quiz question if in quiz mode
  if (quizMode && quizQuestion) {
    drawQuizQuestion();
  }

  // Draw tooltip if hovering and not in quiz mode and not enlarged
  if (hoveredDist >= 0 && !quizMode && enlargedDist < 0) {
    drawTooltip(hoveredDist);
  }

  // Draw canvas-based buttons
  drawButtons();

  // Handle feedback timer
  if (showingFeedback) {
    feedbackTimer--;
    if (feedbackTimer <= 0) {
      showingFeedback = false;
      generateQuizQuestion();
    }
  }
}

function drawDistributionColumn(x, y, w, h, index, isHovered) {
  let dist = distributions[index];

  // Column background with hover effect
  if (isHovered) {
    fill(dist.lightColor[0], dist.lightColor[1], dist.lightColor[2], 80);
    stroke(dist.color[0], dist.color[1], dist.color[2]);
    strokeWeight(3);
  } else {
    fill(255, 255, 255, 200);
    stroke(200);
    strokeWeight(1);
  }
  rect(x, y, w, h, 8);

  // Distribution name
  noStroke();
  fill(dist.color[0], dist.color[1], dist.color[2]);
  textAlign(CENTER, TOP);
  textSize(18);
  textStyle(BOLD);
  text(dist.name, x + w/2, y + 10);

  // Key feature
  textStyle(NORMAL);
  textSize(14);
  fill(80);
  text(dist.keyFeature, x + w/2, y + 35);

  // Draw histogram
  let histY = y + 60;
  let histHeight = 120;
  let histWidth = w - 20;
  let barWidth = histWidth / 20;

  // Shade peak regions
  drawPeakShading(x + 10, histY, histWidth, histHeight, index, dist.lightColor);

  // Draw bars
  let data = histogramData[index];
  let maxVal = max(data);

  for (let j = 0; j < data.length; j++) {
    let barHeight = map(data[j], 0, maxVal, 0, histHeight - 10);
    let barX = x + 10 + j * barWidth;
    let barY = histY + histHeight - barHeight;

    fill(dist.color[0], dist.color[1], dist.color[2]);
    noStroke();
    rect(barX, barY, barWidth - 1, barHeight);
  }

  // Histogram axis
  stroke(100);
  strokeWeight(1);
  line(x + 10, histY + histHeight, x + 10 + histWidth, histY + histHeight);

  // Real-world example
  noStroke();
  fill(60);
  textSize(12);
  textAlign(CENTER, TOP);
  let example = dist.examples[dist.currentExampleIndex];
  text("Example:", x + w/2, histY + histHeight + 15);

  fill(dist.color[0], dist.color[1], dist.color[2]);
  textStyle(ITALIC);
  // Word wrap for longer examples
  let words = example.split(' ');
  let line1 = '';
  let line2 = '';
  for (let word of words) {
    if (textWidth(line1 + word) < w - 20) {
      line1 += (line1 ? ' ' : '') + word;
    } else {
      line2 += (line2 ? ' ' : '') + word;
    }
  }
  text(line1, x + w/2, histY + histHeight + 32);
  if (line2) {
    text(line2, x + w/2, histY + histHeight + 48);
  }
  textStyle(NORMAL);

  // Click hint
  if (isHovered && !quizMode) {
    fill(100);
    textSize(11);
    text("Click to enlarge", x + w/2, y + h - 20);
  }
}

function drawPeakShading(x, y, w, h, index, color) {
  noStroke();
  fill(color[0], color[1], color[2], 60);

  let barWidth = w / 20;

  if (index === 0) {
    // Unimodal - shade center
    rect(x + 6 * barWidth, y, 8 * barWidth, h);
  } else if (index === 1) {
    // Bimodal - shade two peak regions
    rect(x + 2 * barWidth, y, 6 * barWidth, h);
    rect(x + 12 * barWidth, y, 6 * barWidth, h);
  } else {
    // Uniform - no peak shading, it's flat
  }
}

function drawTooltip(index) {
  let dist = distributions[index];
  let colWidth = (canvasWidth - 40) / 3;
  let x = 20 + index * (colWidth + 10) + colWidth / 2;
  let y = 350;

  // Build tooltip text with more examples
  let tooltipWidth = 180;
  let tooltipHeight = 80;

  // Position tooltip to stay on screen
  let tooltipX = x - tooltipWidth / 2;
  if (tooltipX < 10) tooltipX = 10;
  if (tooltipX + tooltipWidth > canvasWidth - 10) tooltipX = canvasWidth - tooltipWidth - 10;

  // Draw tooltip background
  fill(255, 255, 240);
  stroke(dist.color[0], dist.color[1], dist.color[2]);
  strokeWeight(2);
  rect(tooltipX, y - tooltipHeight, tooltipWidth, tooltipHeight, 5);

  // Draw tooltip content
  noStroke();
  fill(50);
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text("More examples:", tooltipX + 8, y - tooltipHeight + 8);
  textStyle(NORMAL);

  // Show 2-3 other examples
  let otherExamples = [];
  for (let i = 0; i < dist.examples.length; i++) {
    if (i !== dist.currentExampleIndex) {
      otherExamples.push(dist.examples[i]);
    }
  }

  textSize(11);
  for (let i = 0; i < min(3, otherExamples.length); i++) {
    text("- " + otherExamples[i], tooltipX + 8, y - tooltipHeight + 26 + i * 16);
  }
}

function drawEnlargedView(index) {
  let dist = distributions[index];

  // Semi-transparent overlay
  fill(0, 0, 0, 150);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Enlarged panel
  let panelWidth = min(350, canvasWidth - 40);
  let panelHeight = 320;
  let panelX = (canvasWidth - panelWidth) / 2;
  let panelY = 40;

  fill(255);
  stroke(dist.color[0], dist.color[1], dist.color[2]);
  strokeWeight(3);
  rect(panelX, panelY, panelWidth, panelHeight, 10);

  // Title
  noStroke();
  fill(dist.color[0], dist.color[1], dist.color[2]);
  textAlign(CENTER, TOP);
  textSize(24);
  textStyle(BOLD);
  text(dist.name + " Distribution", panelX + panelWidth/2, panelY + 15);

  // Key feature
  textStyle(NORMAL);
  textSize(16);
  fill(80);
  text(dist.keyFeature, panelX + panelWidth/2, panelY + 45);

  // Large histogram
  let histX = panelX + 30;
  let histY = panelY + 75;
  let histWidth = panelWidth - 60;
  let histHeight = 140;
  let barWidth = histWidth / 20;

  // Draw bars
  let data = histogramData[index];
  let maxVal = max(data);

  for (let j = 0; j < data.length; j++) {
    let barHeight = map(data[j], 0, maxVal, 0, histHeight - 10);
    let barX = histX + j * barWidth;
    let barY = histY + histHeight - barHeight;

    fill(dist.color[0], dist.color[1], dist.color[2]);
    noStroke();
    rect(barX, barY, barWidth - 1, barHeight);
  }

  // Axis
  stroke(100);
  strokeWeight(1);
  line(histX, histY + histHeight, histX + histWidth, histY + histHeight);

  // All examples
  noStroke();
  fill(50);
  textAlign(LEFT, TOP);
  textSize(14);
  textStyle(BOLD);
  text("Real-world examples:", panelX + 20, panelY + 225);
  textStyle(NORMAL);

  textSize(13);
  for (let i = 0; i < dist.examples.length; i++) {
    fill(dist.color[0], dist.color[1], dist.color[2]);
    text("- " + dist.examples[i], panelX + 25, panelY + 248 + i * 16);
  }

  // Close hint
  fill(100);
  textSize(12);
  textAlign(CENTER, TOP);
  text("Click anywhere to close", panelX + panelWidth/2, panelY + panelHeight - 20);
}

function drawQuizQuestion() {
  // Semi-transparent overlay
  fill(0, 0, 0, 150);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Quiz panel
  let panelWidth = min(320, canvasWidth - 40);
  let panelHeight = 200;
  let panelX = (canvasWidth - panelWidth) / 2;
  let panelY = 80;

  fill(255);
  stroke(100);
  strokeWeight(2);
  rect(panelX, panelY, panelWidth, panelHeight, 10);

  // Question
  noStroke();
  fill(50);
  textAlign(CENTER, TOP);
  textSize(16);
  textStyle(BOLD);
  text("Which type of distribution?", panelX + panelWidth/2, panelY + 15);

  textStyle(ITALIC);
  textSize(14);
  fill(80);
  text('"' + quizQuestion + '"', panelX + panelWidth/2, panelY + 40);

  textStyle(NORMAL);

  // Answer buttons
  let buttonWidth = panelWidth - 40;
  let buttonHeight = 35;
  let buttonX = panelX + 20;
  let buttonY = panelY + 75;

  for (let i = 0; i < 3; i++) {
    let dist = distributions[i];
    let y = buttonY + i * 40;

    // Button background
    if (showingFeedback) {
      if (i === correctAnswer) {
        fill(100, 200, 100); // Green for correct
      } else if (i === selectedAnswer && i !== correctAnswer) {
        fill(220, 100, 100); // Red for wrong selection
      } else {
        fill(230);
      }
    } else if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
               mouseY >= y && mouseY <= y + buttonHeight) {
      fill(dist.lightColor[0], dist.lightColor[1], dist.lightColor[2]);
    } else {
      fill(245);
    }

    stroke(dist.color[0], dist.color[1], dist.color[2]);
    strokeWeight(2);
    rect(buttonX, y, buttonWidth, buttonHeight, 5);

    // Button text
    noStroke();
    fill(dist.color[0], dist.color[1], dist.color[2]);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(dist.name, buttonX + buttonWidth/2, y + buttonHeight/2);
  }

  // Feedback message
  if (showingFeedback) {
    textSize(16);
    textStyle(BOLD);
    if (selectedAnswer === correctAnswer) {
      fill(0, 150, 0);
      text("Correct! Great job!", panelX + panelWidth/2, panelY + panelHeight - 25);
    } else {
      fill(180, 0, 0);
      text("Not quite - the answer is " + distributions[correctAnswer].name, panelX + panelWidth/2, panelY + panelHeight - 25);
    }
    textStyle(NORMAL);
  }
}

function drawButtons() {
  let buttonY = drawHeight + 10;
  let buttonHeight = 30;

  // Shuffle Examples button
  let shuffleX = 20;
  let shuffleWidth = 130;

  if (mouseX >= shuffleX && mouseX <= shuffleX + shuffleWidth &&
      mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
    fill(220, 240, 255);
  } else {
    fill(240);
  }
  stroke(100);
  strokeWeight(1);
  rect(shuffleX, buttonY, shuffleWidth, buttonHeight, 5);

  noStroke();
  fill(50);
  textAlign(CENTER, CENTER);
  textSize(14);
  text("Shuffle Examples", shuffleX + shuffleWidth/2, buttonY + buttonHeight/2);

  // Quiz Mode button
  let quizX = shuffleX + shuffleWidth + 20;
  let quizWidth = 100;

  if (quizMode) {
    fill(100, 180, 100);
  } else if (mouseX >= quizX && mouseX <= quizX + quizWidth &&
             mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
    fill(220, 255, 220);
  } else {
    fill(240);
  }
  stroke(100);
  strokeWeight(1);
  rect(quizX, buttonY, quizWidth, buttonHeight, 5);

  noStroke();
  fill(quizMode ? 255 : 50);
  text(quizMode ? "Exit Quiz" : "Quiz Mode", quizX + quizWidth/2, buttonY + buttonHeight/2);
}

function mousePressed() {
  let buttonY = drawHeight + 10;
  let buttonHeight = 30;

  // Check Shuffle button
  let shuffleX = 20;
  let shuffleWidth = 130;
  if (mouseX >= shuffleX && mouseX <= shuffleX + shuffleWidth &&
      mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
    shuffleExamples();
    return;
  }

  // Check Quiz button
  let quizX = shuffleX + shuffleWidth + 20;
  let quizWidth = 100;
  if (mouseX >= quizX && mouseX <= quizX + quizWidth &&
      mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
    toggleQuizMode();
    return;
  }

  // If enlarged view is showing, close it
  if (enlargedDist >= 0) {
    enlargedDist = -1;
    return;
  }

  // If quiz mode, check answer buttons
  if (quizMode && quizQuestion && !showingFeedback) {
    let panelWidth = min(320, canvasWidth - 40);
    let panelX = (canvasWidth - panelWidth) / 2;
    let panelY = 80;
    let buttonWidth = panelWidth - 40;
    let buttonHeight = 35;
    let buttonX = panelX + 20;
    let buttonYStart = panelY + 75;

    for (let i = 0; i < 3; i++) {
      let y = buttonYStart + i * 40;
      if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
          mouseY >= y && mouseY <= y + buttonHeight) {
        checkAnswer(i);
        return;
      }
    }
    return;
  }

  // Check for distribution column clicks (for enlarged view)
  if (!quizMode && mouseY < drawHeight) {
    let colWidth = (canvasWidth - 40) / 3;
    let startX = 20;
    let startY = 45;
    let colHeight = 280;

    for (let i = 0; i < 3; i++) {
      let x = startX + i * (colWidth + 10);
      if (mouseX >= x && mouseX <= x + colWidth &&
          mouseY >= startY && mouseY <= startY + colHeight) {
        enlargedDist = i;
        return;
      }
    }
  }
}

function shuffleExamples() {
  for (let dist of distributions) {
    dist.currentExampleIndex = floor(random(dist.examples.length));
  }
  // Also regenerate histogram data for visual variety
  histogramData = [
    generateUnimodalData(),
    generateBimodalData(),
    generateUniformData()
  ];
}

function toggleQuizMode() {
  quizMode = !quizMode;
  if (quizMode) {
    generateQuizQuestion();
  } else {
    quizQuestion = null;
    showingFeedback = false;
  }
}

function generateQuizQuestion() {
  // Pick a random distribution and a random example
  correctAnswer = floor(random(3));
  let dist = distributions[correctAnswer];
  let exampleIndex = floor(random(dist.examples.length));
  quizQuestion = dist.examples[exampleIndex];
  selectedAnswer = -1;
  showingFeedback = false;
}

function checkAnswer(answer) {
  selectedAnswer = answer;
  showingFeedback = true;
  feedbackTimer = 90; // About 1.5 seconds at 60fps
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
