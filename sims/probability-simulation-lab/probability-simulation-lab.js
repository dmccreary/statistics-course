// Probability Simulation Lab MicroSim
// Students run simulations to estimate probabilities
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Simulation state
let trials = 0;
let successes = 0;
let results = [];
let maxHistoryPoints = 500;
let proportionHistory = [];

// Scenario settings
let scenarios = {
  'Free Throws': { prob: 0.7, trials: 5, condition: 4, label: 'At least 4 makes out of 5' },
  'Coin Flips': { prob: 0.5, trials: 3, condition: 2, label: 'At least 2 heads out of 3' },
  'Dice Rolls': { prob: 1/6, trials: 6, condition: 1, label: 'At least 1 six in 6 rolls' },
  'Custom': { prob: 0.5, trials: 5, condition: 3, label: 'At least 3 successes out of 5' }
};

let currentScenario = 'Free Throws';
let successProb = 0.7;
let trialsPerTrial = 5;
let successCondition = 4;

// Last trial display
let lastTrialResults = [];

// UI elements
let scenarioSelect;
let run1Button, run100Button, run1000Button, resetButton;
let speedSlider;
let isRunning = false;
let runQueue = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  // Scenario selector
  scenarioSelect = createSelect();
  scenarioSelect.position(10, drawHeight + 10);
  scenarioSelect.option('Free Throws');
  scenarioSelect.option('Coin Flips');
  scenarioSelect.option('Dice Rolls');
  scenarioSelect.changed(changeScenario);
  scenarioSelect.style('font-size', '14px');

  // Buttons
  run1Button = createButton('Run 1');
  run1Button.position(150, drawHeight + 10);
  run1Button.mousePressed(() => runTrials(1));

  run100Button = createButton('Run 100');
  run100Button.position(210, drawHeight + 10);
  run100Button.mousePressed(() => runTrials(100));

  run1000Button = createButton('Run 1000');
  run1000Button.position(285, drawHeight + 10);
  run1000Button.mousePressed(() => runTrials(1000));

  resetButton = createButton('Reset');
  resetButton.position(370, drawHeight + 10);
  resetButton.mousePressed(resetSimulation);

  // Speed slider
  speedSlider = createSlider(1, 50, 10);
  speedSlider.position(500, drawHeight + 10);
  speedSlider.size(100);

  loadScenario();

  describe('Probability simulation lab for estimating probabilities through repeated trials', LABEL);
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
  text('Probability Simulation Lab', canvasWidth / 2, 10);

  // Process queued trials
  if (runQueue > 0) {
    let speed = speedSlider.value();
    let toRun = min(runQueue, speed);
    for (let i = 0; i < toRun; i++) {
      runSingleTrial();
    }
    runQueue -= toRun;
  }

  // Draw components
  drawScenarioInfo();
  drawLastTrial();
  drawStatistics();
  drawConvergenceGraph();
  drawControlLabels();
}

function runTrials(n) {
  runQueue += n;
}

function runSingleTrial() {
  let trialSuccesses = 0;
  lastTrialResults = [];

  for (let i = 0; i < trialsPerTrial; i++) {
    let outcome = random() < successProb;
    lastTrialResults.push(outcome);
    if (outcome) trialSuccesses++;
  }

  trials++;
  let success = trialSuccesses >= successCondition;
  if (success) successes++;
  results.push(success);

  // Update proportion history
  let proportion = successes / trials;
  if (trials <= maxHistoryPoints || trials % ceil(trials / maxHistoryPoints) === 0) {
    proportionHistory.push({ trial: trials, proportion: proportion });
  }
}

function loadScenario() {
  let scenario = scenarios[currentScenario];
  successProb = scenario.prob;
  trialsPerTrial = scenario.trials;
  successCondition = scenario.condition;
}

function changeScenario() {
  currentScenario = scenarioSelect.value();
  loadScenario();
  resetSimulation();
}

function resetSimulation() {
  trials = 0;
  successes = 0;
  results = [];
  proportionHistory = [];
  lastTrialResults = [];
  runQueue = 0;
}

function drawScenarioInfo() {
  let boxX = 20;
  let boxY = 50;

  fill(255, 255, 255, 230);
  stroke(100);
  strokeWeight(1);
  rect(boxX, boxY, 200, 100, 10);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Scenario: ' + currentScenario, boxX + 10, boxY + 10);
  textSize(12);
  text('P(success) = ' + successProb.toFixed(3), boxX + 10, boxY + 32);
  text('Trials per experiment: ' + trialsPerTrial, boxX + 10, boxY + 50);
  text('Success: ≥' + successCondition + ' successes', boxX + 10, boxY + 68);

  let scenario = scenarios[currentScenario];
  textSize(11);
  fill(80);
  text(scenario.label, boxX + 10, boxY + 85);
}

function drawLastTrial() {
  let boxX = 20;
  let boxY = 160;

  fill(255, 255, 255, 230);
  stroke(100);
  strokeWeight(1);
  rect(boxX, boxY, 200, 70, 10);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Last Trial:', boxX + 10, boxY + 10);

  if (lastTrialResults.length > 0) {
    let y = boxY + 35;
    for (let i = 0; i < lastTrialResults.length; i++) {
      let x = boxX + 15 + i * 30;
      if (lastTrialResults[i]) {
        fill(100, 200, 100);
      } else {
        fill(200, 100, 100);
      }
      ellipse(x + 10, y, 22, 22);
      fill('white');
      textAlign(CENTER, CENTER);
      textSize(12);
      text(lastTrialResults[i] ? '✓' : '✗', x + 10, y);
    }

    let trialSuccesses = lastTrialResults.filter(x => x).length;
    let isSuccess = trialSuccesses >= successCondition;
    fill(isSuccess ? 'green' : 'red');
    textAlign(LEFT, TOP);
    textSize(12);
    text(trialSuccesses + '/' + trialsPerTrial + (isSuccess ? ' ✓ Success!' : ' ✗ Failure'), boxX + 10, boxY + 52);
  } else {
    fill(100);
    textSize(12);
    text('Click "Run" to start', boxX + 10, boxY + 35);
  }
}

function drawStatistics() {
  let boxX = 20;
  let boxY = 240;

  fill(255, 255, 255, 230);
  stroke(100);
  strokeWeight(1);
  rect(boxX, boxY, 200, 100, 10);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Results:', boxX + 10, boxY + 10);

  textSize(13);
  text('Trials: ' + trials, boxX + 10, boxY + 32);
  text('Successes: ' + successes, boxX + 10, boxY + 50);

  let proportion = trials > 0 ? successes / trials : 0;
  textSize(16);
  fill(0, 100, 200);
  text('P̂ = ' + proportion.toFixed(4), boxX + 10, boxY + 72);

  // Calculate theoretical probability (binomial)
  let theoreticalP = 0;
  for (let k = successCondition; k <= trialsPerTrial; k++) {
    theoreticalP += binomial(trialsPerTrial, k) * Math.pow(successProb, k) * Math.pow(1 - successProb, trialsPerTrial - k);
  }

  fill(100);
  textSize(11);
  text('Theoretical: ' + theoreticalP.toFixed(4), boxX + 10, boxY + 88);
}

function binomial(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 0; i < k; i++) {
    result *= (n - i) / (i + 1);
  }
  return result;
}

function drawConvergenceGraph() {
  let graphX = 240;
  let graphY = 50;
  let graphWidth = canvasWidth - graphX - 30;
  let graphHeight = 280;

  // Background
  fill(255);
  stroke(100);
  strokeWeight(1);
  rect(graphX, graphY, graphWidth, graphHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text('Proportion Over Time (Convergence)', graphX + graphWidth / 2, graphY + 5);

  // Calculate theoretical probability
  let theoreticalP = 0;
  for (let k = successCondition; k <= trialsPerTrial; k++) {
    theoreticalP += binomial(trialsPerTrial, k) * Math.pow(successProb, k) * Math.pow(1 - successProb, trialsPerTrial - k);
  }

  // Draw theoretical line
  stroke(0, 150, 0);
  strokeWeight(2);
  let theoreticalY = map(theoreticalP, 0, 1, graphY + graphHeight - 20, graphY + 25);
  line(graphX + 5, theoreticalY, graphX + graphWidth - 5, theoreticalY);

  // Label
  fill(0, 150, 0);
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(11);
  text('True P = ' + theoreticalP.toFixed(3), graphX + graphWidth - 5, theoreticalY - 12);

  // Draw proportion line
  if (proportionHistory.length > 1) {
    stroke(0, 100, 200);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < proportionHistory.length; i++) {
      let x = map(i, 0, proportionHistory.length - 1, graphX + 10, graphX + graphWidth - 10);
      let y = map(proportionHistory[i].proportion, 0, 1, graphY + graphHeight - 20, graphY + 25);
      vertex(x, y);
    }
    endShape();
  }

  // Axes labels
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Number of Trials', graphX + graphWidth / 2, graphY + graphHeight - 15);

  push();
  translate(graphX - 5, graphY + graphHeight / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM);
  text('Proportion', 0, 0);
  pop();

  // Y-axis scale
  textAlign(RIGHT, CENTER);
  textSize(10);
  text('1.0', graphX - 2, graphY + 25);
  text('0.5', graphX - 2, graphY + graphHeight / 2);
  text('0.0', graphX - 2, graphY + graphHeight - 20);

  // X-axis scale
  textAlign(CENTER, TOP);
  text('0', graphX + 10, graphY + graphHeight - 30);
  if (trials > 0) {
    text(trials, graphX + graphWidth - 10, graphY + graphHeight - 30);
  }
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Speed: ' + speedSlider.value(), 450, drawHeight + 20);

  textSize(12);
  text('Watch the estimated probability converge to the theoretical value as trials increase!', 10, drawHeight + 55);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  speedSlider.size(min(100, canvasWidth - 510));
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
