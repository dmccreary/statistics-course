// Sample Space Explorer MicroSim
// Students explore sample spaces and events for common random phenomena
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 750;
let drawHeight = 350;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

// Phenomenon data
let phenomena = {
  'Single Die': {
    outcomes: [1, 2, 3, 4, 5, 6],
    cols: 6,
    size: 50
  },
  'Two Coins': {
    outcomes: ['HH', 'HT', 'TH', 'TT'],
    cols: 4,
    size: 60
  },
  'Two Dice Sum': {
    outcomes: [],
    cols: 6,
    size: 40
  },
  'Card Suits': {
    outcomes: ['♠', '♥', '♦', '♣'],
    cols: 4,
    size: 60
  }
};

// Generate two dice outcomes
for (let i = 1; i <= 6; i++) {
  for (let j = 1; j <= 6; j++) {
    phenomena['Two Dice Sum'].outcomes.push('(' + i + ',' + j + ')');
  }
}

let currentPhenomenon = 'Single Die';
let selectedOutcomes = new Set();
let phenomenonSelect;
let resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Create phenomenon selector
  phenomenonSelect = createSelect();
  phenomenonSelect.position(120, drawHeight + 10);
  phenomenonSelect.option('Single Die');
  phenomenonSelect.option('Two Coins');
  phenomenonSelect.option('Two Dice Sum');
  phenomenonSelect.option('Card Suits');
  phenomenonSelect.changed(changePhenomenon);
  phenomenonSelect.style('font-size', '14px');
  phenomenonSelect.style('padding', '4px');

  // Create reset button
  resetButton = createButton('Reset Selection');
  resetButton.position(300, drawHeight + 10);
  resetButton.mousePressed(resetSelection);

  describe('Interactive sample space explorer showing outcomes for different random phenomena', LABEL);
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
  text('Sample Space Explorer', canvasWidth / 2, 10);

  // Draw sample space
  drawSampleSpace();

  // Draw probability calculation
  drawProbability();

  // Draw control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Phenomenon:', 10, drawHeight + 20);

  // Instructions
  textSize(14);
  text('Click outcomes to add/remove from event. Selected outcomes shown in green.', 10, drawHeight + 55);
}

function drawSampleSpace() {
  let data = phenomena[currentPhenomenon];
  let outcomes = data.outcomes;
  let cols = data.cols;
  let cellSize = data.size;

  let rows = Math.ceil(outcomes.length / cols);
  let startX = (canvasWidth - cols * cellSize) / 2;
  let startY = 50;

  // Adjust for Two Dice Sum
  if (currentPhenomenon === 'Two Dice Sum') {
    cellSize = Math.min(40, (canvasWidth - 100) / 6);
    startX = (canvasWidth - 6 * cellSize) / 2;
    startY = 60;
  }

  for (let i = 0; i < outcomes.length; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let x = startX + col * cellSize;
    let y = startY + row * cellSize;

    let outcome = outcomes[i];
    let isSelected = selectedOutcomes.has(outcome);

    // Draw cell
    if (isSelected) {
      fill(100, 200, 100);
    } else {
      fill(255);
    }
    stroke(100);
    strokeWeight(1);
    rect(x, y, cellSize - 2, cellSize - 2, 5);

    // Draw outcome text
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);

    if (currentPhenomenon === 'Two Dice Sum') {
      textSize(11);
    } else if (currentPhenomenon === 'Card Suits') {
      textSize(28);
      if (outcome === '♥' || outcome === '♦') {
        fill('red');
      }
    } else {
      textSize(16);
    }

    text(outcome, x + cellSize / 2 - 1, y + cellSize / 2 - 1);
  }

  // Label for Two Dice Sum grid
  if (currentPhenomenon === 'Two Dice Sum') {
    fill('black');
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('(Die 1, Die 2) - All 36 ordered pairs', canvasWidth / 2, startY + rows * cellSize + 10);
  }
}

function drawProbability() {
  let data = phenomena[currentPhenomenon];
  let total = data.outcomes.length;
  let favorable = selectedOutcomes.size;

  let prob = total > 0 ? favorable / total : 0;
  let percent = (prob * 100).toFixed(1);

  // Draw probability box
  let boxX = canvasWidth - 220;
  let boxY = drawHeight - 80;

  fill(255, 255, 255, 230);
  stroke(100);
  strokeWeight(1);
  rect(boxX, boxY, 200, 70, 10);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Event Probability:', boxX + 10, boxY + 8);

  textSize(16);
  text('P(Event) = ' + favorable + '/' + total, boxX + 10, boxY + 28);

  textSize(14);
  text('= ' + prob.toFixed(4) + ' = ' + percent + '%', boxX + 10, boxY + 48);
}

function mousePressed() {
  if (mouseY > drawHeight) return;

  let data = phenomena[currentPhenomenon];
  let outcomes = data.outcomes;
  let cols = data.cols;
  let cellSize = data.size;

  if (currentPhenomenon === 'Two Dice Sum') {
    cellSize = Math.min(40, (canvasWidth - 100) / 6);
  }

  let rows = Math.ceil(outcomes.length / cols);
  let startX = (canvasWidth - cols * cellSize) / 2;
  let startY = currentPhenomenon === 'Two Dice Sum' ? 60 : 50;

  for (let i = 0; i < outcomes.length; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let x = startX + col * cellSize;
    let y = startY + row * cellSize;

    if (mouseX >= x && mouseX < x + cellSize - 2 &&
        mouseY >= y && mouseY < y + cellSize - 2) {
      let outcome = outcomes[i];
      if (selectedOutcomes.has(outcome)) {
        selectedOutcomes.delete(outcome);
      } else {
        selectedOutcomes.add(outcome);
      }
      break;
    }
  }
}

function changePhenomenon() {
  currentPhenomenon = phenomenonSelect.value();
  selectedOutcomes.clear();
}

function resetSelection() {
  selectedOutcomes.clear();
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
