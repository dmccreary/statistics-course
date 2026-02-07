// Law of Large Numbers Demonstrator MicroSim
// Students observe how empirical probability converges to theoretical probability
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 800;
let drawHeight = 350;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Simulation state
let trials = 0;
let successes = 0;
let proportionHistory = [];
let maxDisplayPoints = 500;

// True probability (adjustable)
let trueProb = 0.5;

// Last few results for animation
let lastResults = [];
let maxLastResults = 20;

// UI elements
let probSlider;
let flip1Button, flip10Button, flip100Button, flipUntilStableButton;
let resetButton;
let speedSlider;

// Animation state
let runQueue = 0;
let flipUntilStable = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  // Probability slider
  probSlider = createSlider(0.1, 0.9, 0.5, 0.05);
  probSlider.position(100, drawHeight + 10);
  probSlider.size(120);
  probSlider.input(resetSimulation);

  // Flip buttons
  flip1Button = createButton('Flip 1');
  flip1Button.position(280, drawHeight + 10);
  flip1Button.mousePressed(() => { runQueue += 1; });

  flip10Button = createButton('Flip 10');
  flip10Button.position(340, drawHeight + 10);
  flip10Button.mousePressed(() => { runQueue += 10; });

  flip100Button = createButton('Flip 100');
  flip100Button.position(410, drawHeight + 10);
  flip100Button.mousePressed(() => { runQueue += 100; });

  flipUntilStableButton = createButton('Flip Until Stable');
  flipUntilStableButton.position(490, drawHeight + 10);
  flipUntilStableButton.mousePressed(() => { flipUntilStable = true; });

  resetButton = createButton('Reset');
  resetButton.position(canvasWidth - 70, drawHeight + 10);
  resetButton.mousePressed(resetSimulation);

  // Speed slider
  speedSlider = createSlider(1, 100, 20);
  speedSlider.position(100, drawHeight + 45);
  speedSlider.size(120);

  describe('Law of Large Numbers demonstrator showing how observed proportions converge to true probability', LABEL);
}

function draw() {
  updateCanvasSize();

  // Draw background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  text('Law of Large Numbers', canvasWidth / 2, 10);

  // Update probability from slider
  trueProb = probSlider.value();

  // Process queue
  let speed = speedSlider.value();

  if (flipUntilStable) {
    let proportion = trials > 0 ? successes / trials : 0;
    if (trials >= 100 && abs(proportion - trueProb) < 0.01) {
      flipUntilStable = false;
    } else {
      runQueue += speed;
    }
  }

  if (runQueue > 0) {
    let toRun = min(runQueue, speed);
    for (let i = 0; i < toRun; i++) {
      runSingleTrial();
    }
    runQueue -= toRun;
  }

  // Draw components
  drawConvergenceGraph();
  drawCoinDisplay();
  drawStatistics();
  drawControlLabels();
}

function runSingleTrial() {
  trials++;
  let success = random() < trueProb;
  if (success) successes++;

  // Store result for display
  lastResults.push(success);
  if (lastResults.length > maxLastResults) {
    lastResults.shift();
  }

  // Store proportion for graph
  let proportion = successes / trials;

  // Sample points for graph (can't show all if too many)
  if (trials <= maxDisplayPoints || trials % ceil(trials / maxDisplayPoints) === 0) {
    proportionHistory.push({ trial: trials, proportion: proportion });
    if (proportionHistory.length > maxDisplayPoints) {
      // Resample to keep graph manageable
      let newHistory = [];
      for (let i = 0; i < proportionHistory.length; i += 2) {
        newHistory.push(proportionHistory[i]);
      }
      proportionHistory = newHistory;
    }
  }
}

function resetSimulation() {
  trials = 0;
  successes = 0;
  proportionHistory = [];
  lastResults = [];
  runQueue = 0;
  flipUntilStable = false;
}

function drawConvergenceGraph() {
  let graphX = 30;
  let graphY = 45;
  let graphWidth = canvasWidth - 280;
  let graphHeight = 260;

  // Background
  fill(255);
  stroke(100);
  strokeWeight(1);
  rect(graphX, graphY, graphWidth, graphHeight);

  // Grid lines
  stroke(230);
  strokeWeight(1);
  for (let i = 1; i < 10; i++) {
    let y = map(i / 10, 0, 1, graphY + graphHeight - 5, graphY + 5);
    line(graphX, y, graphX + graphWidth, y);
  }

  // True probability line
  stroke(0, 180, 0);
  strokeWeight(3);
  let trueProbY = map(trueProb, 0, 1, graphY + graphHeight - 5, graphY + 5);
  line(graphX, trueProbY, graphX + graphWidth, trueProbY);

  // Label
  fill(0, 150, 0);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('True P = ' + trueProb.toFixed(2), graphX + 5, trueProbY - 12);

  // Draw proportion line with color coding
  if (proportionHistory.length > 1) {
    strokeWeight(2);
    noFill();
    for (let i = 1; i < proportionHistory.length; i++) {
      let x1 = map(i - 1, 0, proportionHistory.length - 1, graphX + 5, graphX + graphWidth - 5);
      let y1 = map(proportionHistory[i - 1].proportion, 0, 1, graphY + graphHeight - 5, graphY + 5);
      let x2 = map(i, 0, proportionHistory.length - 1, graphX + 5, graphX + graphWidth - 5);
      let y2 = map(proportionHistory[i].proportion, 0, 1, graphY + graphHeight - 5, graphY + 5);

      // Color based on distance from true probability
      let dist = abs(proportionHistory[i].proportion - trueProb);
      let r = map(dist, 0, 0.3, 0, 255, true);
      let g = map(dist, 0, 0.3, 200, 50, true);
      stroke(r, g, 50);

      line(x1, y1, x2, y2);
    }
  }

  // Current proportion marker
  if (trials > 0) {
    let currentProp = successes / trials;
    let markerY = map(currentProp, 0, 1, graphY + graphHeight - 5, graphY + 5);
    let dist = abs(currentProp - trueProb);
    let r = map(dist, 0, 0.3, 0, 255, true);
    let g = map(dist, 0, 0.3, 200, 50, true);

    fill(r, g, 50);
    noStroke();
    ellipse(graphX + graphWidth - 5, markerY, 12, 12);
  }

  // Axes
  stroke(100);
  strokeWeight(1);
  line(graphX, graphY + graphHeight, graphX + graphWidth, graphY + graphHeight);
  line(graphX, graphY, graphX, graphY + graphHeight);

  // Y-axis labels
  fill('black');
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(10);
  text('1.0', graphX - 3, graphY + 5);
  text('0.5', graphX - 3, graphY + graphHeight / 2);
  text('0.0', graphX - 3, graphY + graphHeight - 5);

  // X-axis label
  textAlign(CENTER, TOP);
  textSize(12);
  text('Number of Trials', graphX + graphWidth / 2, graphY + graphHeight + 5);

  if (trials > 0) {
    textSize(10);
    textAlign(LEFT, TOP);
    text('0', graphX, graphY + graphHeight + 3);
    textAlign(RIGHT, TOP);
    text(trials, graphX + graphWidth, graphY + graphHeight + 3);
  }
}

function drawCoinDisplay() {
  let boxX = canvasWidth - 235;
  let boxY = 45;
  let boxWidth = 220;
  let boxHeight = 80;

  fill(255, 255, 255, 230);
  stroke(100);
  strokeWeight(1);
  rect(boxX, boxY, boxWidth, boxHeight, 10);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Recent Flips:', boxX + 10, boxY + 8);

  // Draw last results as mini coins
  let cols = 10;
  let coinSize = 16;
  for (let i = 0; i < lastResults.length; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let x = boxX + 15 + col * (coinSize + 4);
    let y = boxY + 30 + row * (coinSize + 4);

    if (lastResults[i]) {
      fill(100, 200, 100);
    } else {
      fill(200, 100, 100);
    }
    ellipse(x + coinSize / 2, y + coinSize / 2, coinSize, coinSize);

    fill('white');
    textAlign(CENTER, CENTER);
    textSize(10);
    text(lastResults[i] ? 'H' : 'T', x + coinSize / 2, y + coinSize / 2);
  }
}

function drawStatistics() {
  let boxX = canvasWidth - 235;
  let boxY = 140;
  let boxWidth = 220;
  let boxHeight = 170;

  fill(255, 255, 255, 230);
  stroke(100);
  strokeWeight(1);
  rect(boxX, boxY, boxWidth, boxHeight, 10);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Statistics:', boxX + 10, boxY + 8);

  textSize(13);
  text('Trials: ' + trials, boxX + 10, boxY + 32);
  text('Successes: ' + successes, boxX + 10, boxY + 52);

  let proportion = trials > 0 ? successes / trials : 0;
  let diff = trials > 0 ? abs(proportion - trueProb) : trueProb;

  // Color code the proportion
  let dist = abs(proportion - trueProb);
  let r = map(dist, 0, 0.3, 0, 255, true);
  let g = map(dist, 0, 0.3, 200, 50, true);

  fill(r, g, 50);
  textSize(18);
  text('Observed: ' + proportion.toFixed(4), boxX + 10, boxY + 78);

  fill(0, 150, 0);
  textSize(14);
  text('True P: ' + trueProb.toFixed(2), boxX + 10, boxY + 105);

  fill('black');
  textSize(13);
  text('Difference: ' + diff.toFixed(4), boxX + 10, boxY + 128);

  // Status message
  fill(100);
  textSize(12);
  if (trials === 0) {
    text('Click "Flip" to begin!', boxX + 10, boxY + 150);
  } else if (diff < 0.01) {
    fill(0, 150, 0);
    text('✓ Within 0.01 of true P!', boxX + 10, boxY + 150);
  } else if (diff < 0.05) {
    fill(150, 150, 0);
    text('Getting closer...', boxX + 10, boxY + 150);
  } else {
    text('Keep flipping!', boxX + 10, boxY + 150);
  }
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('P(H):', 10, drawHeight + 20);
  text(trueProb.toFixed(2), 225, drawHeight + 20);

  text('Speed:', 10, drawHeight + 55);
  text(speedSlider.value(), 225, drawHeight + 55);

  // Instructions
  textSize(11);
  fill(80);
  text('Watch the observed proportion converge to the true probability as trials increase!', 280, drawHeight + 55);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  probSlider.size(min(120, canvasWidth / 6));
  speedSlider.size(min(120, canvasWidth / 6));
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
