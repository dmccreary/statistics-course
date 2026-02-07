// Outlier Detective Game MicroSim
// Students identify outliers in datasets with real-world contexts
// Bloom Level: Analyze (L4) - Students distinguish between outliers and non-outliers
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 380;
let controlHeight = 80; // 2 rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// Game state
let gameState = 'playing'; // 'playing', 'submitted', 'revealed'
let currentRound = 1;
let totalRounds = 10;
let score = 0;
let difficulty = 1; // 0=Easy, 1=Medium, 2=Hard

// View mode
let viewMode = 'dotplot'; // 'dotplot' or 'histogram'

// Current challenge data
let dataPoints = [];
let trueOutliers = []; // indices of actual outliers
let selectedPoints = []; // indices selected by user
let contextDescription = '';

// Controls
let difficultySlider;
let submitButton;
let revealButton;
let nextButton;
let viewToggle;

// Dataset contexts with generators
const contexts = [
  {
    name: "Test Scores",
    description: "Class test scores (one student was absent and got 0)",
    generate: function(diff) {
      let data = [];
      let outlierCount = getOutlierCount(diff);
      let n = 15 + diff * 5;
      // Normal scores around 75
      for (let i = 0; i < n; i++) {
        data.push(Math.round(randomGaussian(75, 10)));
      }
      // Clamp to valid range
      data = data.map(d => constrain(d, 40, 100));
      // Add outliers - absent student(s)
      let outliers = [];
      for (let i = 0; i < outlierCount; i++) {
        let idx = floor(random(data.length));
        data[idx] = 0;
        outliers.push(idx);
      }
      return { data, outliers };
    }
  },
  {
    name: "Birthday Party Ages",
    description: "Ages at a child's birthday party (parent chaperone)",
    generate: function(diff) {
      let data = [];
      let outlierCount = getOutlierCount(diff);
      let n = 12 + diff * 4;
      // Kids ages 7-10
      for (let i = 0; i < n; i++) {
        data.push(Math.round(random(7, 10)));
      }
      // Add outliers - adult parents
      let outliers = [];
      for (let i = 0; i < outlierCount; i++) {
        let idx = floor(random(data.length));
        data[idx] = Math.round(random(32, 45));
        outliers.push(idx);
      }
      return { data, outliers };
    }
  },
  {
    name: "Marathon Times",
    description: "Marathon finish times in hours (elite runner in race)",
    generate: function(diff) {
      let data = [];
      let outlierCount = getOutlierCount(diff);
      let n = 18 + diff * 4;
      // Recreational runners 4-5 hours
      for (let i = 0; i < n; i++) {
        data.push(round(randomGaussian(4.5, 0.5) * 10) / 10);
      }
      // Clamp to reasonable range
      data = data.map(d => constrain(d, 3.5, 6.0));
      // Add outliers - elite runners (~2.2 hours)
      let outliers = [];
      for (let i = 0; i < outlierCount; i++) {
        let idx = floor(random(data.length));
        data[idx] = round(random(2.1, 2.4) * 10) / 10;
        outliers.push(idx);
      }
      return { data, outliers };
    }
  },
  {
    name: "Daily Rainfall",
    description: "Daily rainfall in inches (hurricane day)",
    generate: function(diff) {
      let data = [];
      let outlierCount = getOutlierCount(diff);
      let n = 20 + diff * 5;
      // Normal days 0-0.5 inches
      for (let i = 0; i < n; i++) {
        data.push(round(random(0, 0.5) * 10) / 10);
      }
      // Add outliers - hurricane/storm days
      let outliers = [];
      for (let i = 0; i < outlierCount; i++) {
        let idx = floor(random(data.length));
        data[idx] = round(random(4, 8) * 10) / 10;
        outliers.push(idx);
      }
      return { data, outliers };
    }
  },
  {
    name: "Student Heights",
    description: "Heights in inches (data entry error - meters instead)",
    generate: function(diff) {
      let data = [];
      let outlierCount = getOutlierCount(diff);
      let n = 16 + diff * 4;
      // Normal heights 60-72 inches
      for (let i = 0; i < n; i++) {
        data.push(Math.round(randomGaussian(66, 4)));
      }
      // Clamp to reasonable range
      data = data.map(d => constrain(d, 58, 76));
      // Add outliers - wrong units (1.7 meters = 1.7 instead of 67)
      let outliers = [];
      for (let i = 0; i < outlierCount; i++) {
        let idx = floor(random(data.length));
        data[idx] = round(random(1.5, 1.9) * 10) / 10;
        outliers.push(idx);
      }
      return { data, outliers };
    }
  },
  {
    name: "Coffee Prices",
    description: "Coffee prices in dollars (specialty reserve item)",
    generate: function(diff) {
      let data = [];
      let outlierCount = getOutlierCount(diff);
      let n = 14 + diff * 4;
      // Regular coffees $3-6
      for (let i = 0; i < n; i++) {
        data.push(round(randomGaussian(4.5, 0.8) * 100) / 100);
      }
      data = data.map(d => constrain(d, 2.5, 6.5));
      // Add outliers - specialty reserve
      let outliers = [];
      for (let i = 0; i < outlierCount; i++) {
        let idx = floor(random(data.length));
        data[idx] = round(random(15, 25) * 100) / 100;
        outliers.push(idx);
      }
      return { data, outliers };
    }
  },
  {
    name: "Commute Times",
    description: "Commute times in minutes (traffic accident day)",
    generate: function(diff) {
      let data = [];
      let outlierCount = getOutlierCount(diff);
      let n = 18 + diff * 4;
      // Normal commutes 20-40 minutes
      for (let i = 0; i < n; i++) {
        data.push(Math.round(randomGaussian(30, 6)));
      }
      data = data.map(d => constrain(d, 15, 45));
      // Add outliers - accident delay
      let outliers = [];
      for (let i = 0; i < outlierCount; i++) {
        let idx = floor(random(data.length));
        data[idx] = Math.round(random(90, 150));
        outliers.push(idx);
      }
      return { data, outliers };
    }
  },
  {
    name: "Restaurant Tips",
    description: "Tip percentages (very generous tipper)",
    generate: function(diff) {
      let data = [];
      let outlierCount = getOutlierCount(diff);
      let n = 16 + diff * 4;
      // Normal tips 15-22%
      for (let i = 0; i < n; i++) {
        data.push(Math.round(randomGaussian(18, 3)));
      }
      data = data.map(d => constrain(d, 10, 25));
      // Add outliers - extremely generous
      let outliers = [];
      for (let i = 0; i < outlierCount; i++) {
        let idx = floor(random(data.length));
        data[idx] = Math.round(random(50, 100));
        outliers.push(idx);
      }
      return { data, outliers };
    }
  }
];

function getOutlierCount(diff) {
  // 0-3 outliers based on difficulty and randomness
  if (diff === 0) return floor(random(1, 3)); // Easy: 1-2 obvious outliers
  if (diff === 1) return floor(random(0, 3)); // Medium: 0-2 outliers
  return floor(random(0, 4)); // Hard: 0-3, sometimes none
}

function generateNewChallenge() {
  let contextIndex = floor(random(contexts.length));
  let context = contexts[contextIndex];
  contextDescription = context.description;

  let result = context.generate(difficulty);
  dataPoints = result.data;
  trueOutliers = result.outliers;
  selectedPoints = [];
  gameState = 'playing';
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Row 1: View toggle and difficulty slider
  viewToggle = createButton('Dotplot');
  viewToggle.position(10, drawHeight + 8);
  viewToggle.mousePressed(toggleView);

  difficultySlider = createSlider(0, 2, 1, 1);
  difficultySlider.position(sliderLeftMargin + 100, drawHeight + 8);
  difficultySlider.size(canvasWidth - sliderLeftMargin - 100 - margin);
  difficultySlider.input(onDifficultyChange);

  // Row 2: Game control buttons
  submitButton = createButton('Submit Answer');
  submitButton.position(10, drawHeight + 45);
  submitButton.mousePressed(submitAnswer);

  revealButton = createButton('Reveal Correct');
  revealButton.position(130, drawHeight + 45);
  revealButton.mousePressed(revealAnswer);

  nextButton = createButton('Next Challenge');
  nextButton.position(260, drawHeight + 45);
  nextButton.mousePressed(nextChallenge);

  // Generate first challenge
  generateNewChallenge();

  describe('Outlier Detective Game - Click on data points you think are outliers, then submit your answer to score points', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing region background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control region background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Outlier Detective Game', canvasWidth / 2, 8);

  // Score and round info
  textSize(14);
  textAlign(LEFT, TOP);
  text('Round: ' + currentRound + '/' + totalRounds, 10, 35);
  textAlign(RIGHT, TOP);
  text('Score: ' + score, canvasWidth - 10, 35);

  // Context description
  textAlign(CENTER, TOP);
  textSize(13);
  fill('#555');
  text(contextDescription, canvasWidth / 2, 55);

  // Instructions
  textSize(12);
  fill('#888');
  if (gameState === 'playing') {
    text('Click points to select/deselect outliers, then Submit', canvasWidth / 2, 72);
  } else if (gameState === 'submitted') {
    text('Review your answer, then click Next Challenge', canvasWidth / 2, 72);
  } else {
    text('Correct outliers shown in purple', canvasWidth / 2, 72);
  }

  // Draw the visualization
  if (viewMode === 'dotplot') {
    drawDotplot();
  } else {
    drawHistogram();
  }

  // Draw feedback overlay if submitted
  if (gameState === 'submitted' || gameState === 'revealed') {
    drawFeedback();
  }

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);

  // Difficulty label
  let diffLabels = ['Easy', 'Medium', 'Hard'];
  text('Difficulty: ' + diffLabels[difficultySlider.value()], sliderLeftMargin, drawHeight + 20);

  // Update button states
  if (gameState === 'playing') {
    submitButton.removeAttribute('disabled');
    revealButton.removeAttribute('disabled');
  } else {
    submitButton.attribute('disabled', true);
    revealButton.attribute('disabled', true);
  }
}

function drawDotplot() {
  let plotLeft = margin + 30;
  let plotRight = canvasWidth - margin;
  let plotWidth = plotRight - plotLeft;
  let plotY = 200;

  // Find data range
  let minVal = min(dataPoints);
  let maxVal = max(dataPoints);
  let range = maxVal - minVal;
  if (range === 0) range = 1;

  // Add padding to range
  let padding = range * 0.1;
  minVal -= padding;
  maxVal += padding;
  range = maxVal - minVal;

  // Draw axis
  stroke('#333');
  strokeWeight(2);
  line(plotLeft, plotY + 50, plotRight, plotY + 50);

  // Draw tick marks and labels
  textAlign(CENTER, TOP);
  textSize(11);
  fill('#333');
  noStroke();
  let numTicks = 5;
  for (let i = 0; i <= numTicks; i++) {
    let val = minVal + (i / numTicks) * range;
    let x = plotLeft + (i / numTicks) * plotWidth;
    stroke('#333');
    strokeWeight(1);
    line(x, plotY + 50, x, plotY + 55);
    noStroke();
    text(val.toFixed(1), x, plotY + 58);
  }

  // Stack dots at same values
  let dotRadius = 12;
  let stacks = {};

  for (let i = 0; i < dataPoints.length; i++) {
    let val = dataPoints[i];
    let x = plotLeft + ((val - minVal) / range) * plotWidth;
    let xKey = Math.round(x / (dotRadius * 0.8));

    if (!stacks[xKey]) stacks[xKey] = [];
    stacks[xKey].push(i);
  }

  // Draw dots
  for (let key in stacks) {
    let indices = stacks[key];
    for (let j = 0; j < indices.length; j++) {
      let i = indices[j];
      let val = dataPoints[i];
      let x = plotLeft + ((val - minVal) / range) * plotWidth;
      let y = plotY + 40 - (j * dotRadius * 1.1);

      // Determine dot color based on state
      let isSelected = selectedPoints.includes(i);
      let isOutlier = trueOutliers.includes(i);

      if (gameState === 'playing') {
        if (isSelected) {
          fill('#e74c3c'); // red for selected
          stroke('#c0392b');
        } else {
          fill('#3498db'); // blue for normal
          stroke('#2980b9');
        }
      } else if (gameState === 'submitted') {
        if (isOutlier && isSelected) {
          fill('#27ae60'); // green - correct selection
          stroke('#1e8449');
        } else if (isOutlier && !isSelected) {
          fill('#9b59b6'); // purple - missed outlier
          stroke('#8e44ad');
        } else if (!isOutlier && isSelected) {
          fill('#e74c3c'); // red - false positive
          stroke('#c0392b');
        } else {
          fill('#3498db'); // blue - correct non-selection
          stroke('#2980b9');
        }
      } else { // revealed
        if (isOutlier) {
          fill('#9b59b6'); // purple - true outlier
          stroke('#8e44ad');
        } else {
          fill('#3498db');
          stroke('#2980b9');
        }
      }

      strokeWeight(2);
      circle(x, y, dotRadius * 2);

      // Store position for click detection
      dataPoints[i] = { value: val, x: x, y: y, radius: dotRadius };
    }
  }

  // Reconstruct dataPoints as array of just values for next iteration
  // Actually, let's use a separate array for positions
}

function drawHistogram() {
  let plotLeft = margin + 30;
  let plotRight = canvasWidth - margin;
  let plotWidth = plotRight - plotLeft;
  let plotBottom = 270;
  let plotTop = 110;
  let plotHeight = plotBottom - plotTop;

  // Find data range
  let minVal = min(dataPoints);
  let maxVal = max(dataPoints);
  let range = maxVal - minVal;
  if (range === 0) range = 1;

  // Add padding
  let padding = range * 0.1;
  minVal -= padding;
  maxVal += padding;
  range = maxVal - minVal;

  // Create bins
  let numBins = 10;
  let binWidth = range / numBins;
  let bins = new Array(numBins).fill(0);
  let binIndices = [];
  for (let i = 0; i < numBins; i++) binIndices.push([]);

  for (let i = 0; i < dataPoints.length; i++) {
    let val = typeof dataPoints[i] === 'object' ? dataPoints[i].value : dataPoints[i];
    let binIndex = floor((val - minVal) / binWidth);
    binIndex = constrain(binIndex, 0, numBins - 1);
    bins[binIndex]++;
    binIndices[binIndex].push(i);
  }

  let maxCount = max(bins);
  if (maxCount === 0) maxCount = 1;

  // Draw axes
  stroke('#333');
  strokeWeight(2);
  line(plotLeft, plotBottom, plotRight, plotBottom);
  line(plotLeft, plotBottom, plotLeft, plotTop);

  // Draw bars
  let barWidth = plotWidth / numBins;
  for (let i = 0; i < numBins; i++) {
    let barHeight = (bins[i] / maxCount) * plotHeight;
    let x = plotLeft + i * barWidth;
    let y = plotBottom - barHeight;

    // Determine color based on outlier content
    let hasOutlier = binIndices[i].some(idx => trueOutliers.includes(idx));
    let hasSelected = binIndices[i].some(idx => selectedPoints.includes(idx));

    if (gameState === 'playing') {
      if (hasSelected) {
        fill('#e74c3c');
        stroke('#c0392b');
      } else {
        fill('#3498db');
        stroke('#2980b9');
      }
    } else if (gameState === 'revealed' || gameState === 'submitted') {
      if (hasOutlier) {
        fill('#9b59b6');
        stroke('#8e44ad');
      } else {
        fill('#3498db');
        stroke('#2980b9');
      }
    }

    strokeWeight(1);
    rect(x, y, barWidth - 2, barHeight);
  }

  // X-axis labels
  textAlign(CENTER, TOP);
  textSize(10);
  fill('#333');
  noStroke();
  for (let i = 0; i <= numBins; i++) {
    let val = minVal + i * binWidth;
    let x = plotLeft + i * barWidth;
    text(val.toFixed(1), x, plotBottom + 5);
  }

  // Y-axis labels
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 4; i++) {
    let count = Math.round((i / 4) * maxCount);
    let y = plotBottom - (i / 4) * plotHeight;
    text(count, plotLeft - 5, y);
  }

  // Note about histogram mode
  textAlign(CENTER, BOTTOM);
  textSize(11);
  fill('#888');
  text('(In histogram view, click bars to select bins containing outliers)', canvasWidth / 2, plotBottom + 45);
}

function drawFeedback() {
  // Calculate score for this round
  let correct = 0;
  let falsePos = 0;
  let missed = 0;

  for (let i of selectedPoints) {
    if (trueOutliers.includes(i)) correct++;
    else falsePos++;
  }
  for (let i of trueOutliers) {
    if (!selectedPoints.includes(i)) missed++;
  }

  // Draw feedback panel
  let panelWidth = 180;
  let panelHeight = 80;
  let panelX = canvasWidth - panelWidth - 15;
  let panelY = 90;

  fill(255, 255, 255, 240);
  stroke('#333');
  strokeWeight(1);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);

  fill('#27ae60');
  text('Correct: ' + correct + ' (+' + (correct * 10) + ')', panelX + 10, panelY + 10);

  fill('#e74c3c');
  text('False Positive: ' + falsePos + ' (' + (falsePos * -5) + ')', panelX + 10, panelY + 30);

  fill('#9b59b6');
  text('Missed: ' + missed, panelX + 10, panelY + 50);
}

function mousePressed() {
  if (gameState !== 'playing') return;

  // Check if click is in drawing area
  if (mouseY > drawHeight || mouseY < 0) return;
  if (mouseX < 0 || mouseX > canvasWidth) return;

  if (viewMode === 'dotplot') {
    // Check click on dots
    for (let i = 0; i < dataPoints.length; i++) {
      let point = dataPoints[i];
      if (typeof point === 'object' && point.x !== undefined) {
        let d = dist(mouseX, mouseY, point.x, point.y);
        if (d < point.radius + 5) {
          // Toggle selection
          let idx = selectedPoints.indexOf(i);
          if (idx === -1) {
            selectedPoints.push(i);
          } else {
            selectedPoints.splice(idx, 1);
          }
          return;
        }
      }
    }
  } else {
    // Histogram click - select bins
    let plotLeft = margin + 30;
    let plotRight = canvasWidth - margin;
    let plotWidth = plotRight - plotLeft;

    if (mouseX >= plotLeft && mouseX <= plotRight && mouseY >= 110 && mouseY <= 270) {
      let numBins = 10;
      let binWidth = plotWidth / numBins;
      let clickedBin = floor((mouseX - plotLeft) / binWidth);
      clickedBin = constrain(clickedBin, 0, numBins - 1);

      // Find indices in this bin
      let minVal = min(dataPoints.map(p => typeof p === 'object' ? p.value : p));
      let maxVal = max(dataPoints.map(p => typeof p === 'object' ? p.value : p));
      let range = maxVal - minVal;
      let padding = range * 0.1;
      minVal -= padding;
      range = (maxVal + padding) - minVal;
      let binWidthVal = range / numBins;

      for (let i = 0; i < dataPoints.length; i++) {
        let val = typeof dataPoints[i] === 'object' ? dataPoints[i].value : dataPoints[i];
        let binIndex = floor((val - minVal) / binWidthVal);
        binIndex = constrain(binIndex, 0, numBins - 1);

        if (binIndex === clickedBin) {
          let idx = selectedPoints.indexOf(i);
          if (idx === -1) {
            selectedPoints.push(i);
          } else {
            selectedPoints.splice(idx, 1);
          }
        }
      }
    }
  }
}

function submitAnswer() {
  if (gameState !== 'playing') return;

  // Calculate score
  let correct = 0;
  let falsePos = 0;

  for (let i of selectedPoints) {
    if (trueOutliers.includes(i)) {
      correct++;
      score += 10;
    } else {
      falsePos++;
      score -= 5;
    }
  }

  gameState = 'submitted';
}

function revealAnswer() {
  if (gameState !== 'playing') return;
  gameState = 'revealed';
}

function nextChallenge() {
  if (currentRound >= totalRounds) {
    // Game over - show final score
    alert('Game Over! Final Score: ' + score + ' out of ' + (totalRounds * 10 * 3) + ' possible points');
    currentRound = 1;
    score = 0;
  } else {
    currentRound++;
  }

  generateNewChallenge();
}

function toggleView() {
  if (viewMode === 'dotplot') {
    viewMode = 'histogram';
    viewToggle.html('Histogram');
  } else {
    viewMode = 'dotplot';
    viewToggle.html('Dotplot');
  }
}

function onDifficultyChange() {
  difficulty = difficultySlider.value();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  difficultySlider.size(canvasWidth - sliderLeftMargin - 100 - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
