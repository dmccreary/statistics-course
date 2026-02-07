// Venn Diagram Problem Solver MicroSim
// Students use Venn diagrams to organize information and calculate probabilities
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Input values
let total = 100;
let nA = 40;
let nB = 30;
let nAandB = 10;

// Calculated values
let aOnly, bOnly, neither;

// Mode: 'counts' or 'probabilities'
let mode = 'counts';

// UI elements
let totalInput, nAInput, nBInput, nABInput;
let modeSelect;
let calculateButton;

// Preset scenarios
let presets = {
  'Language Classes': { total: 30, nA: 18, nB: 12, nAandB: 5, labelA: 'Spanish', labelB: 'French' },
  'Sports Teams': { total: 50, nA: 25, nB: 20, nAandB: 8, labelA: 'Soccer', labelB: 'Basketball' },
  'Medical Testing': { total: 1000, nA: 50, nB: 100, nAandB: 45, labelA: 'Has Disease', labelB: 'Tests Positive' }
};

let currentLabels = { A: 'Event A', B: 'Event B' };
let presetSelect;
let highlightedRegion = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  // Create preset selector
  presetSelect = createSelect();
  presetSelect.position(10, drawHeight + 10);
  presetSelect.option('Custom');
  presetSelect.option('Language Classes');
  presetSelect.option('Sports Teams');
  presetSelect.option('Medical Testing');
  presetSelect.changed(loadPreset);
  presetSelect.style('font-size', '14px');

  // Create input fields using HTML
  createInputFields();

  // Calculate button
  calculateButton = createButton('Calculate');
  calculateButton.position(canvasWidth - 100, drawHeight + 10);
  calculateButton.mousePressed(calculateValues);

  calculateValues();

  describe('Interactive Venn diagram solver for calculating probabilities of overlapping events', LABEL);
}

function createInputFields() {
  // We'll use the canvas to draw input-like displays
  // and handle mouse interaction for editing
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
  text('Venn Diagram Problem Solver', canvasWidth / 2, 10);

  // Draw Venn diagram
  drawVennDiagram();

  // Draw input panel
  drawInputPanel();

  // Draw results panel
  drawResultsPanel();

  // Draw control labels
  drawControlLabels();
}

function calculateValues() {
  // Validate inputs
  if (nAandB > nA || nAandB > nB) {
    nAandB = min(nA, nB);
  }

  aOnly = nA - nAandB;
  bOnly = nB - nAandB;
  neither = total - aOnly - bOnly - nAandB;

  if (neither < 0) {
    // Invalid combination
    neither = 0;
  }
}

function drawVennDiagram() {
  let centerX = canvasWidth / 2;
  let centerY = 180;
  let radius = 100;
  let separation = 70;

  let leftX = centerX - separation / 2;
  let rightX = centerX + separation / 2;

  // Draw sample space rectangle
  stroke(100);
  strokeWeight(2);
  fill(240);
  rect(centerX - 180, 60, 360, 240, 10);

  // Label sample space
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('S (Sample Space)', centerX - 170, 65);
  text('n = ' + total, centerX - 170, 82);

  // Draw circles
  strokeWeight(2);

  // Circle A
  stroke(100, 150, 255);
  fill(100, 150, 255, isRegionHighlighted('A') ? 200 : 100);
  ellipse(leftX, centerY, radius * 2, radius * 2);

  // Circle B
  stroke(255, 150, 100);
  fill(255, 150, 100, isRegionHighlighted('B') ? 200 : 100);
  ellipse(rightX, centerY, radius * 2, radius * 2);

  // Values in each region
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);

  // A only
  let aOnlyX = leftX - 45;
  fill(isRegionHighlighted('AOnly') ? 'blue' : 'black');
  text(aOnly, aOnlyX, centerY);
  textSize(12);
  text('A only', aOnlyX, centerY + 20);

  // B only
  textSize(18);
  let bOnlyX = rightX + 45;
  fill(isRegionHighlighted('BOnly') ? 'red' : 'black');
  text(bOnly, bOnlyX, centerY);
  textSize(12);
  text('B only', bOnlyX, centerY + 20);

  // Intersection
  textSize(18);
  fill(isRegionHighlighted('Both') ? 'purple' : 'black');
  text(nAandB, (leftX + rightX) / 2, centerY);
  textSize(12);
  text('A ∩ B', (leftX + rightX) / 2, centerY + 20);

  // Neither
  textSize(18);
  fill(isRegionHighlighted('Neither') ? 'gray' : 'black');
  text(neither, centerX, centerY + 100);
  textSize(12);
  text('Neither', centerX, centerY + 118);

  // Circle labels
  textSize(20);
  fill('black');
  text(currentLabels.A, leftX - 60, centerY - 80);
  text(currentLabels.B, rightX + 60, centerY - 80);

  // Verification
  let verifySum = aOnly + bOnly + nAandB + neither;
  if (verifySum !== total) {
    fill(255, 0, 0);
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text('⚠ Sum (' + verifySum + ') ≠ Total (' + total + ')', centerX, drawHeight - 10);
  } else {
    fill(0, 150, 0);
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text('✓ Verified: ' + aOnly + ' + ' + nAandB + ' + ' + bOnly + ' + ' + neither + ' = ' + total, centerX, drawHeight - 10);
  }
}

function isRegionHighlighted(region) {
  return highlightedRegion === region;
}

function drawInputPanel() {
  let panelX = 20;
  let panelY = 50;

  fill(255, 255, 255, 230);
  stroke(100);
  strokeWeight(1);
  rect(panelX, panelY, 140, 120, 10);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Inputs:', panelX + 10, panelY + 8);

  textSize(13);
  text('Total: ' + total, panelX + 10, panelY + 30);
  text('n(A): ' + nA, panelX + 10, panelY + 50);
  text('n(B): ' + nB, panelX + 10, panelY + 70);
  text('n(A∩B): ' + nAandB, panelX + 10, panelY + 90);
}

function drawResultsPanel() {
  let panelX = canvasWidth - 200;
  let panelY = 50;

  fill(255, 255, 255, 230);
  stroke(100);
  strokeWeight(1);
  rect(panelX, panelY, 180, 150, 10);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Probabilities:', panelX + 10, panelY + 8);

  textSize(13);
  let pA = total > 0 ? (nA / total).toFixed(3) : 0;
  let pB = total > 0 ? (nB / total).toFixed(3) : 0;
  let pAB = total > 0 ? (nAandB / total).toFixed(3) : 0;
  let pAorB = total > 0 ? ((aOnly + bOnly + nAandB) / total).toFixed(3) : 0;
  let pNeither = total > 0 ? (neither / total).toFixed(3) : 0;

  text('P(A) = ' + pA, panelX + 10, panelY + 30);
  text('P(B) = ' + pB, panelX + 10, panelY + 50);
  text('P(A ∩ B) = ' + pAB, panelX + 10, panelY + 70);
  text('P(A ∪ B) = ' + pAorB, panelX + 10, panelY + 90);
  text('P(neither) = ' + pNeither, panelX + 10, panelY + 110);
  text('P(A only) = ' + (total > 0 ? (aOnly / total).toFixed(3) : 0), panelX + 10, panelY + 130);
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);

  // Instructions
  text('Scenario:', 150, drawHeight + 20);

  textSize(12);
  text('Use +/- keys to adjust values. Click regions to highlight.', 10, drawHeight + 55);
  text('Total: [T] | n(A): [A] | n(B): [B] | n(A∩B): [I]', 10, drawHeight + 75);
}

function loadPreset() {
  let selection = presetSelect.value();
  if (selection !== 'Custom' && presets[selection]) {
    let preset = presets[selection];
    total = preset.total;
    nA = preset.nA;
    nB = preset.nB;
    nAandB = preset.nAandB;
    currentLabels.A = preset.labelA;
    currentLabels.B = preset.labelB;
    calculateValues();
  }
}

function keyPressed() {
  let increment = keyIsDown(SHIFT) ? 10 : 1;

  if (key === 't' || key === 'T') {
    if (keyIsDown(UP_ARROW) || keyCode === 187) total += increment;
    else if (keyIsDown(DOWN_ARROW) || keyCode === 189) total = max(1, total - increment);
  }
  if (key === 'a' || key === 'A') {
    if (keyIsDown(UP_ARROW) || keyCode === 187) nA = min(total, nA + increment);
    else if (keyIsDown(DOWN_ARROW) || keyCode === 189) nA = max(0, nA - increment);
  }
  if (key === 'b' || key === 'B') {
    if (keyIsDown(UP_ARROW) || keyCode === 187) nB = min(total, nB + increment);
    else if (keyIsDown(DOWN_ARROW) || keyCode === 189) nB = max(0, nB - increment);
  }
  if (key === 'i' || key === 'I') {
    if (keyIsDown(UP_ARROW) || keyCode === 187) nAandB = min(min(nA, nB), nAandB + increment);
    else if (keyIsDown(DOWN_ARROW) || keyCode === 189) nAandB = max(0, nAandB - increment);
  }

  // Arrow keys for increment/decrement
  if (keyCode === UP_ARROW) {
    if (keyIsDown(84)) total += increment; // T
    else if (keyIsDown(65)) nA = min(total, nA + increment); // A
    else if (keyIsDown(66)) nB = min(total, nB + increment); // B
    else if (keyIsDown(73)) nAandB = min(min(nA, nB), nAandB + increment); // I
  }
  if (keyCode === DOWN_ARROW) {
    if (keyIsDown(84)) total = max(1, total - increment);
    else if (keyIsDown(65)) nA = max(nAandB, nA - increment);
    else if (keyIsDown(66)) nB = max(nAandB, nB - increment);
    else if (keyIsDown(73)) nAandB = max(0, nAandB - increment);
  }

  calculateValues();
}

function mousePressed() {
  // Check if clicking in control area
  if (mouseY > drawHeight) return;

  // Detect region clicks for highlighting
  let centerX = canvasWidth / 2;
  let centerY = 180;
  let separation = 70;
  let leftX = centerX - separation / 2;
  let rightX = centerX + separation / 2;
  let radius = 100;

  let dLeft = dist(mouseX, mouseY, leftX, centerY);
  let dRight = dist(mouseX, mouseY, rightX, centerY);

  if (dLeft < radius && dRight < radius) {
    highlightedRegion = 'Both';
  } else if (dLeft < radius) {
    highlightedRegion = 'AOnly';
  } else if (dRight < radius) {
    highlightedRegion = 'BOnly';
  } else if (mouseX > centerX - 180 && mouseX < centerX + 180 &&
             mouseY > 60 && mouseY < 300) {
    highlightedRegion = 'Neither';
  } else {
    highlightedRegion = null;
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
  canvasWidth = containerWidth;
}
