// Stemplot Constructor MicroSim
// Students interpret how data values decompose into stems and leaves
// Bloom Level: Understand (L2), Verb: interpret
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

// Layout regions
let stemplotLeft = 0;
let stemplotWidth;
let controlPanelLeft;
let controlPanelWidth;

// Stemplot data
let dataValues = [];
let stems = {};
let sortedStems = [];

// Animation state
let animationState = 'idle'; // 'idle', 'decomposing', 'placing', 'autobuild'
let currentValueIndex = -1;
let currentValue = null;
let decompositionPhase = 0; // 0: show value, 1: split, 2: place
let animationTimer = 0;
let animationSpeed = 1000; // ms

// Input field state
let inputValue = '';
let inputActive = false;

// Sample datasets
let sampleDatasets = {
  'Quiz Scores': [72, 85, 91, 78, 83, 95, 88, 76, 82, 89, 94, 77, 81, 86, 92, 79, 84, 90, 75, 87],
  'Ages': [23, 31, 45, 28, 52, 19, 37, 42, 25, 33, 48, 21, 39, 55, 27, 34, 41, 29, 36, 44],
  'Heights': [58, 62, 71, 65, 68, 59, 73, 67, 64, 70, 61, 66, 69, 63, 72, 60, 74, 57, 68, 65]
};
let datasetNames = ['Quiz Scores', 'Ages', 'Heights'];
let currentDatasetIndex = 0;
let dropdownOpen = false;

// Button definitions
let buttons = [];
let inputBox = {};

// Queue for step-through mode
let pendingValues = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');

  // Initialize layout
  updateLayout();

  describe('Interactive stemplot constructor showing how data values decompose into stems and leaves', LABEL);
}

function updateLayout() {
  stemplotWidth = canvasWidth * 0.6;
  controlPanelLeft = stemplotWidth;
  controlPanelWidth = canvasWidth - stemplotWidth;

  // Define buttons (canvas-based)
  let btnY1 = drawHeight + 10;
  let btnY2 = drawHeight + 45;
  let btnY3 = drawHeight + 80;
  let btnWidth = 90;
  let btnHeight = 28;
  let btnGap = 10;

  // Input box
  inputBox = {
    x: margin,
    y: btnY1,
    w: 80,
    h: 28
  };

  buttons = [
    { label: 'Add Value', x: inputBox.x + inputBox.w + btnGap, y: btnY1, w: btnWidth, h: btnHeight, action: 'add' },
    { label: 'Step Through', x: inputBox.x + inputBox.w + btnGap + btnWidth + btnGap, y: btnY1, w: btnWidth + 10, h: btnHeight, action: 'step' },
    { label: 'Auto-Build', x: margin, y: btnY2, w: btnWidth, h: btnHeight, action: 'auto' },
    { label: 'Clear', x: margin + btnWidth + btnGap, y: btnY2, w: 70, h: btnHeight, action: 'clear' },
    { label: 'Dataset:', x: margin + btnWidth + 70 + btnGap * 2, y: btnY2, w: 120, h: btnHeight, action: 'dropdown', isDropdown: true }
  ];
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

  // Draw title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  text('Stemplot Constructor', canvasWidth * 0.3, 10);

  // Draw stemplot region
  drawStemplot();

  // Draw control panel (right side)
  drawControlPanel();

  // Draw canvas-based controls
  drawCanvasControls();

  // Handle animation
  updateAnimation();
}

function drawStemplot() {
  let plotX = margin;
  let plotY = 50;
  let plotWidth = stemplotWidth - margin * 2;
  let plotHeight = drawHeight - 70;

  // Stemplot background
  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(plotX, plotY, plotWidth, plotHeight, 5);

  // Draw stem column header
  fill(50);
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  text('Stem', plotX + 35, plotY + 8);
  text('Leaves', plotX + 100, plotY + 8);

  // Dividing line
  stroke(100);
  strokeWeight(2);
  line(plotX + 55, plotY + 28, plotX + 55, plotY + plotHeight - 10);

  // Draw stem-leaf rows
  let rowY = plotY + 35;
  let rowHeight = 22;

  textSize(16);

  if (sortedStems.length > 0) {
    for (let i = 0; i < sortedStems.length; i++) {
      let stem = sortedStems[i];
      let leaves = stems[stem] || [];

      // Sort leaves
      leaves.sort((a, b) => a - b);

      // Draw stem
      fill(50);
      noStroke();
      textAlign(RIGHT, CENTER);
      text(stem, plotX + 45, rowY + rowHeight / 2);

      // Draw leaves
      textAlign(LEFT, CENTER);
      let leafX = plotX + 65;
      for (let j = 0; j < leaves.length; j++) {
        let leaf = leaves[j];

        // Highlight current leaf being placed
        if (animationState === 'placing' &&
            currentValue !== null &&
            Math.floor(currentValue / 10) === stem &&
            j === leaves.length - 1) {
          fill(255, 255, 100);
          noStroke();
          rect(leafX - 2, rowY + 2, 14, rowHeight - 4, 3);
          fill(50);
        }

        fill(50);
        text(leaf, leafX, rowY + rowHeight / 2);
        leafX += 14;
      }

      rowY += rowHeight;
    }
  } else {
    // Empty state message
    fill(150);
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Add values to build the stemplot', plotX + plotWidth / 2, plotY + plotHeight / 2);
  }

  // Draw key at bottom
  fill(80);
  noStroke();
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text('Key: 8 | 5 means 85', plotX + 10, plotY + plotHeight - 5);
}

function drawControlPanel() {
  let panelX = controlPanelLeft + 10;
  let panelY = 50;
  let panelWidth = controlPanelWidth - 20;
  let panelHeight = drawHeight - 70;

  // Panel background
  fill(248, 250, 252);
  stroke(200);
  strokeWeight(1);
  rect(controlPanelLeft, panelY, controlPanelWidth, panelHeight, 5);

  // Panel title
  fill(50);
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  text('Data Entry', controlPanelLeft + controlPanelWidth / 2, panelY + 10);

  // Show decomposition animation
  if (animationState !== 'idle' && currentValue !== null) {
    drawDecompositionAnimation(panelX, panelY + 40, panelWidth);
  }

  // Show pending values
  if (pendingValues.length > 0) {
    fill(100);
    textSize(12);
    textAlign(LEFT, TOP);
    text('Queue: ' + pendingValues.slice(0, 8).join(', ') +
         (pendingValues.length > 8 ? '...' : ''),
         panelX + 5, panelY + panelHeight - 60);
  }

  // Show current dataset
  fill(80);
  textSize(11);
  textAlign(LEFT, BOTTOM);
  text('Values: ' + dataValues.length, panelX + 5, panelY + panelHeight - 5);
}

function drawDecompositionAnimation(x, y, w) {
  let centerX = x + w / 2;

  // Value being decomposed
  fill(50);
  noStroke();
  textSize(28);
  textAlign(CENTER, TOP);

  if (decompositionPhase === 0) {
    // Show whole value highlighted
    fill(255, 255, 100);
    noStroke();
    rect(centerX - 30, y - 5, 60, 40, 5);
    fill(50);
    text(currentValue, centerX, y);
  } else if (decompositionPhase >= 1) {
    // Show split
    let stem = Math.floor(currentValue / 10);
    let leaf = currentValue % 10;

    // Arrow
    fill(100);
    textSize(20);
    text('\u2192', centerX, y + 5);

    // Stem box
    fill(200, 230, 255);
    noStroke();
    rect(centerX - 70, y - 5, 40, 40, 5);
    fill(50);
    textSize(20);
    text(stem, centerX - 50, y + 5);

    // Stem label
    fill(100);
    textSize(10);
    text('stem', centerX - 50, y + 38);

    // Leaf box
    fill(200, 255, 200);
    noStroke();
    rect(centerX + 30, y - 5, 40, 40, 5);
    fill(50);
    textSize(20);
    text(leaf, centerX + 50, y + 5);

    // Leaf label
    fill(100);
    textSize(10);
    text('leaf', centerX + 50, y + 38);

    if (decompositionPhase >= 2) {
      // Show placement instruction
      fill(80);
      textSize(12);
      textAlign(CENTER, TOP);
      text('Placing leaf ' + leaf + ' in stem ' + stem + ' row', centerX, y + 60);
    }
  }
}

function drawCanvasControls() {
  let btnY1 = drawHeight + 10;
  let btnY3 = drawHeight + 80;

  // Draw input box
  fill(inputActive ? 255 : 245);
  stroke(inputActive ? '#2196F3' : 180);
  strokeWeight(inputActive ? 2 : 1);
  rect(inputBox.x, inputBox.y, inputBox.w, inputBox.h, 4);

  // Input text
  fill(50);
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  if (inputValue === '' && !inputActive) {
    fill(150);
    text('Enter #', inputBox.x + 8, inputBox.y + inputBox.h / 2);
  } else {
    fill(50);
    text(inputValue + (inputActive && frameCount % 60 < 30 ? '|' : ''),
         inputBox.x + 8, inputBox.y + inputBox.h / 2);
  }

  // Draw buttons
  for (let btn of buttons) {
    let isHover = isMouseOver(btn);
    let isDisabled = false;

    // Check if button should be disabled
    if (btn.action === 'step' && pendingValues.length === 0 && animationState === 'idle') {
      isDisabled = true;
    }
    if ((btn.action === 'auto' || btn.action === 'step') && animationState !== 'idle') {
      isDisabled = true;
    }

    // Button background
    if (isDisabled) {
      fill(220);
      stroke(180);
    } else if (isHover) {
      fill('#e3f2fd');
      stroke('#2196F3');
    } else {
      fill(255);
      stroke(180);
    }
    strokeWeight(1);
    rect(btn.x, btn.y, btn.w, btn.h, 4);

    // Button text
    fill(isDisabled ? 150 : 50);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);

    if (btn.isDropdown) {
      // Dropdown shows current dataset
      textAlign(LEFT, CENTER);
      text(datasetNames[currentDatasetIndex], btn.x + 8, btn.y + btn.h / 2);

      // Dropdown arrow
      textAlign(RIGHT, CENTER);
      text('\u25BC', btn.x + btn.w - 8, btn.y + btn.h / 2);
    } else {
      text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
    }
  }

  // Draw dropdown menu if open
  if (dropdownOpen) {
    let dropBtn = buttons.find(b => b.isDropdown);
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(dropBtn.x, dropBtn.y + dropBtn.h, dropBtn.w, datasetNames.length * 28, 4);

    for (let i = 0; i < datasetNames.length; i++) {
      let itemY = dropBtn.y + dropBtn.h + i * 28;
      let isItemHover = mouseX > dropBtn.x && mouseX < dropBtn.x + dropBtn.w &&
                        mouseY > itemY && mouseY < itemY + 28;

      if (isItemHover) {
        fill('#e3f2fd');
        noStroke();
        rect(dropBtn.x + 2, itemY + 2, dropBtn.w - 4, 24, 2);
      }

      fill(50);
      noStroke();
      textSize(12);
      textAlign(LEFT, CENTER);
      text(datasetNames[i], dropBtn.x + 10, itemY + 14);
    }
  }

  // Speed slider (drawn manually)
  let sliderX = margin;
  let sliderY = btnY3;
  let sliderW = 200;

  fill(50);
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Speed: ' + animationSpeed + 'ms', sliderX, sliderY + 14);

  // Slider track
  let trackX = sliderX + 110;
  let trackW = canvasWidth - trackX - margin - 60;
  fill(220);
  noStroke();
  rect(trackX, sliderY + 10, trackW, 8, 4);

  // Slider fill
  let sliderPos = map(animationSpeed, 2000, 500, 0, trackW);
  fill('#2196F3');
  rect(trackX, sliderY + 10, sliderPos, 8, 4);

  // Slider handle
  fill(255);
  stroke('#2196F3');
  strokeWeight(2);
  ellipse(trackX + sliderPos, sliderY + 14, 16, 16);

  // Fast/Slow labels
  fill(100);
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  text('Slow', trackX + trackW + 5, sliderY + 14);
}

function isMouseOver(btn) {
  return mouseX > btn.x && mouseX < btn.x + btn.w &&
         mouseY > btn.y && mouseY < btn.y + btn.h;
}

function updateAnimation() {
  if (animationState === 'idle') return;

  animationTimer += deltaTime;

  if (animationTimer >= animationSpeed / 3) {
    animationTimer = 0;

    if (animationState === 'decomposing') {
      decompositionPhase++;
      if (decompositionPhase > 1) {
        animationState = 'placing';
      }
    } else if (animationState === 'placing') {
      decompositionPhase++;
      if (decompositionPhase > 2) {
        // Add value to stemplot
        addValueToStemplot(currentValue);

        // Check for more values in autobuild mode
        if (pendingValues.length > 0) {
          currentValue = pendingValues.shift();
          decompositionPhase = 0;
          animationState = 'decomposing';
        } else {
          animationState = 'idle';
          currentValue = null;
        }
      }
    }
  }
}

function addValueToStemplot(value) {
  if (value < 0 || value > 99) return;

  dataValues.push(value);

  let stem = Math.floor(value / 10);
  let leaf = value % 10;

  if (!stems[stem]) {
    stems[stem] = [];
    sortedStems = Object.keys(stems).map(Number).sort((a, b) => a - b);
  }
  stems[stem].push(leaf);
}

function mousePressed() {
  // Check input box
  if (mouseX > inputBox.x && mouseX < inputBox.x + inputBox.w &&
      mouseY > inputBox.y && mouseY < inputBox.y + inputBox.h) {
    inputActive = true;
    dropdownOpen = false;
    return;
  } else {
    inputActive = false;
  }

  // Check dropdown items first (if open)
  if (dropdownOpen) {
    let dropBtn = buttons.find(b => b.isDropdown);
    for (let i = 0; i < datasetNames.length; i++) {
      let itemY = dropBtn.y + dropBtn.h + i * 28;
      if (mouseX > dropBtn.x && mouseX < dropBtn.x + dropBtn.w &&
          mouseY > itemY && mouseY < itemY + 28) {
        currentDatasetIndex = i;
        dropdownOpen = false;
        return;
      }
    }
    dropdownOpen = false;
    return;
  }

  // Check buttons
  for (let btn of buttons) {
    if (isMouseOver(btn)) {
      if (btn.action === 'add') {
        addInputValue();
      } else if (btn.action === 'step') {
        stepThrough();
      } else if (btn.action === 'auto') {
        autoBuild();
      } else if (btn.action === 'clear') {
        clearAll();
      } else if (btn.action === 'dropdown') {
        dropdownOpen = !dropdownOpen;
      }
      return;
    }
  }

  // Check speed slider
  let sliderX = margin + 110;
  let sliderY = drawHeight + 80;
  let sliderW = canvasWidth - sliderX - margin - 60;

  if (mouseX > sliderX && mouseX < sliderX + sliderW &&
      mouseY > sliderY && mouseY < sliderY + 28) {
    let newSpeed = map(mouseX - sliderX, 0, sliderW, 2000, 500);
    animationSpeed = constrain(Math.round(newSpeed / 100) * 100, 500, 2000);
  }
}

function mouseDragged() {
  // Speed slider drag
  let sliderX = margin + 110;
  let sliderY = drawHeight + 80;
  let sliderW = canvasWidth - sliderX - margin - 60;

  if (mouseY > sliderY && mouseY < sliderY + 28) {
    let newSpeed = map(mouseX - sliderX, 0, sliderW, 2000, 500);
    animationSpeed = constrain(Math.round(newSpeed / 100) * 100, 500, 2000);
  }
}

function keyPressed() {
  if (!inputActive) return;

  if (key >= '0' && key <= '9' && inputValue.length < 2) {
    inputValue += key;
  } else if (keyCode === BACKSPACE) {
    inputValue = inputValue.slice(0, -1);
  } else if (keyCode === ENTER) {
    addInputValue();
  }
}

function addInputValue() {
  let value = parseInt(inputValue);
  if (!isNaN(value) && value >= 0 && value <= 99) {
    pendingValues.push(value);
    inputValue = '';

    // Start animation if idle
    if (animationState === 'idle') {
      currentValue = pendingValues.shift();
      decompositionPhase = 0;
      animationState = 'decomposing';
      animationTimer = 0;
    }
  }
  inputValue = '';
}

function stepThrough() {
  if (animationState !== 'idle') return;

  if (pendingValues.length === 0) {
    // Load sample dataset into queue
    let dataset = sampleDatasets[datasetNames[currentDatasetIndex]];
    pendingValues = [...dataset];
  }

  if (pendingValues.length > 0) {
    currentValue = pendingValues.shift();
    decompositionPhase = 0;
    animationState = 'decomposing';
    animationTimer = 0;
  }
}

function autoBuild() {
  if (animationState !== 'idle') return;

  // Load sample dataset into queue
  let dataset = sampleDatasets[datasetNames[currentDatasetIndex]];
  pendingValues = [...dataset];

  if (pendingValues.length > 0) {
    currentValue = pendingValues.shift();
    decompositionPhase = 0;
    animationState = 'decomposing';
    animationTimer = 0;
  }
}

function clearAll() {
  dataValues = [];
  stems = {};
  sortedStems = [];
  pendingValues = [];
  currentValue = null;
  animationState = 'idle';
  decompositionPhase = 0;
  inputValue = '';
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
