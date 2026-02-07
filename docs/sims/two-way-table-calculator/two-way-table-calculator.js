// Two-Way Table Distribution Calculator
// Students calculate marginal and conditional distributions from a two-way table
// Bloom Level: Apply (L3) - Calculate, execute
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 500;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

// Table data - 2x4 table (2 rows, 4 columns of data)
// Row labels: Freshman, Sophomore
// Column labels: Fall, Winter, Spring, Summer
let tableData = [
  [25, 18, 22, 15],  // Freshman
  [30, 25, 28, 20]   // Sophomore
];

// Labels
let rowLabels = ['Freshman', 'Sophomore'];
let colLabels = ['Fall', 'Winter', 'Spring', 'Summer'];

// UI state
let selectedCell = null; // {row, col} for editing
let inputBuffer = '';
let distributionType = 0; // 0=Marginal Row, 1=Marginal Col, 2=Conditional Row1, 3=Conditional Row2
let showSteps = true;

// Button dimensions
let buttonWidth = 100;
let buttonHeight = 30;

// Distribution type button areas (radio-like buttons)
let distButtons = [];
let exampleButton = { x: 0, y: 0, w: 100, h: 30 };
let stepsButton = { x: 0, y: 0, w: 100, h: 30 };

// Table layout
let tableX, tableY, cellWidth, cellHeight;
let resultTableY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);
  textFont('Arial');

  // Initialize distribution type buttons
  let distLabels = ['Marginal Row', 'Marginal Col', 'Cond|Row1', 'Cond|Row2'];
  for (let i = 0; i < 4; i++) {
    distButtons.push({
      label: distLabels[i],
      x: 0, y: 0, w: 85, h: 28,
      selected: i === 0
    });
  }

  describe('Interactive two-way table calculator for computing marginal and conditional distributions', LABEL);
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
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Two-Way Table Distribution Calculator', canvasWidth / 2, 8);

  // Calculate table dimensions
  let availableWidth = canvasWidth - 2 * margin - 80; // 80 for row labels
  let availableHeight = 120;
  cellWidth = availableWidth / 5; // 4 data columns + 1 total column
  cellHeight = 32;
  tableX = margin + 80;
  tableY = 45;

  // Draw the two-way table
  drawTable();

  // Draw calculation display
  drawCalculationDisplay();

  // Draw result table
  drawResultTable();

  // Draw controls
  drawControls();
}

function drawTable() {
  let x = tableX;
  let y = tableY;

  // Calculate totals
  let rowTotals = [0, 0];
  let colTotals = [0, 0, 0, 0];
  let grandTotal = 0;

  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      rowTotals[r] += tableData[r][c];
      colTotals[c] += tableData[r][c];
      grandTotal += tableData[r][c];
    }
  }

  textSize(14);

  // Draw header row (column labels)
  fill(220, 230, 240);
  stroke('gray');
  strokeWeight(1);
  rect(x, y, cellWidth * 4, cellHeight);
  rect(x + cellWidth * 4, y, cellWidth, cellHeight);

  noStroke();
  fill('black');
  textAlign(CENTER, CENTER);
  for (let c = 0; c < 4; c++) {
    text(colLabels[c], x + c * cellWidth + cellWidth / 2, y + cellHeight / 2);
  }
  fill(100, 100, 150);
  text('Total', x + 4 * cellWidth + cellWidth / 2, y + cellHeight / 2);

  // Draw row label header
  fill(220, 230, 240);
  stroke('gray');
  rect(margin, y, 80, cellHeight);
  noStroke();
  fill('black');
  textAlign(CENTER, CENTER);
  text('Grade', margin + 40, y + cellHeight / 2);

  // Draw data rows
  y += cellHeight;
  for (let r = 0; r < 2; r++) {
    // Row label
    fill(220, 230, 240);
    stroke('gray');
    rect(margin, y, 80, cellHeight);
    noStroke();
    fill('black');
    textAlign(CENTER, CENTER);
    text(rowLabels[r], margin + 40, y + cellHeight / 2);

    // Data cells
    for (let c = 0; c < 4; c++) {
      let cellX = x + c * cellWidth;
      let cellY = y;

      // Highlight based on distribution type
      let isHighlighted = shouldHighlightCell(r, c);

      if (selectedCell && selectedCell.row === r && selectedCell.col === c) {
        fill(255, 255, 200); // Editing
      } else if (isHighlighted) {
        fill(180, 220, 255); // Highlighted for calculation
      } else {
        fill('white');
      }

      stroke('gray');
      rect(cellX, cellY, cellWidth, cellHeight);

      noStroke();
      fill('black');
      textAlign(CENTER, CENTER);
      if (selectedCell && selectedCell.row === r && selectedCell.col === c) {
        text(inputBuffer + '_', cellX + cellWidth / 2, cellY + cellHeight / 2);
      } else {
        text(tableData[r][c], cellX + cellWidth / 2, cellY + cellHeight / 2);
      }
    }

    // Row total
    let isTotalHighlighted = (distributionType === 0) ||
                             (distributionType === 2 && r === 0) ||
                             (distributionType === 3 && r === 1);
    fill(isTotalHighlighted ? 180 : 230, isTotalHighlighted ? 220 : 230, isTotalHighlighted ? 255 : 240);
    stroke('gray');
    rect(x + 4 * cellWidth, y, cellWidth, cellHeight);
    noStroke();
    fill(100, 100, 150);
    textAlign(CENTER, CENTER);
    text(rowTotals[r], x + 4 * cellWidth + cellWidth / 2, y + cellHeight / 2);

    y += cellHeight;
  }

  // Draw total row
  fill(220, 230, 240);
  stroke('gray');
  rect(margin, y, 80, cellHeight);
  noStroke();
  fill(100, 100, 150);
  textAlign(CENTER, CENTER);
  text('Total', margin + 40, y + cellHeight / 2);

  // Column totals
  for (let c = 0; c < 4; c++) {
    let isColTotalHighlighted = (distributionType === 1);
    fill(isColTotalHighlighted ? 180 : 230, isColTotalHighlighted ? 220 : 230, isColTotalHighlighted ? 255 : 240);
    stroke('gray');
    rect(x + c * cellWidth, y, cellWidth, cellHeight);
    noStroke();
    fill(100, 100, 150);
    textAlign(CENTER, CENTER);
    text(colTotals[c], x + c * cellWidth + cellWidth / 2, y + cellHeight / 2);
  }

  // Grand total
  let isGrandHighlighted = (distributionType === 0) || (distributionType === 1);
  fill(isGrandHighlighted ? 180 : 200, isGrandHighlighted ? 220 : 200, isGrandHighlighted ? 255 : 220);
  stroke('gray');
  rect(x + 4 * cellWidth, y, cellWidth, cellHeight);
  noStroke();
  fill(80, 80, 120);
  textAlign(CENTER, CENTER);
  text(grandTotal, x + 4 * cellWidth + cellWidth / 2, y + cellHeight / 2);
}

function shouldHighlightCell(row, col) {
  switch (distributionType) {
    case 0: // Marginal Row - highlight all cells
      return true;
    case 1: // Marginal Col - highlight all cells
      return true;
    case 2: // Conditional given Row 1 (Freshman)
      return row === 0;
    case 3: // Conditional given Row 2 (Sophomore)
      return row === 1;
  }
  return false;
}

function drawCalculationDisplay() {
  let calcY = tableY + 4 * cellHeight + 20;

  // Calculate totals
  let rowTotals = [0, 0];
  let colTotals = [0, 0, 0, 0];
  let grandTotal = 0;

  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      rowTotals[r] += tableData[r][c];
      colTotals[c] += tableData[r][c];
      grandTotal += tableData[r][c];
    }
  }

  // Background for calculation area
  fill(250, 250, 255);
  stroke(200);
  strokeWeight(1);
  rect(margin, calcY, canvasWidth - 2 * margin, showSteps ? 80 : 40, 8);

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);

  let distTypeNames = [
    'Marginal Distribution of Grade Level (rows)',
    'Marginal Distribution of Season (columns)',
    'Conditional Distribution given Freshman',
    'Conditional Distribution given Sophomore'
  ];

  text('Calculation: ' + distTypeNames[distributionType], margin + 10, calcY + 8);

  if (showSteps) {
    textSize(12);
    fill(80, 80, 120);
    let formulaY = calcY + 28;

    switch (distributionType) {
      case 0: // Marginal Row
        text('Formula: P(row) = (row total) / (grand total)', margin + 10, formulaY);
        text('P(Freshman) = ' + rowTotals[0] + ' / ' + grandTotal + ' = ' + (rowTotals[0] / grandTotal).toFixed(3), margin + 10, formulaY + 18);
        text('P(Sophomore) = ' + rowTotals[1] + ' / ' + grandTotal + ' = ' + (rowTotals[1] / grandTotal).toFixed(3), margin + 10, formulaY + 36);
        break;
      case 1: // Marginal Col
        text('Formula: P(column) = (column total) / (grand total)', margin + 10, formulaY);
        let colFormulas = [];
        for (let c = 0; c < 4; c++) {
          colFormulas.push('P(' + colLabels[c] + ')=' + (colTotals[c] / grandTotal).toFixed(2));
        }
        text(colFormulas.join('   '), margin + 10, formulaY + 18);
        break;
      case 2: // Conditional Row 1
        text('Formula: P(column | Freshman) = (cell value) / (Freshman total)', margin + 10, formulaY);
        let condFormulas1 = [];
        for (let c = 0; c < 4; c++) {
          condFormulas1.push('P(' + colLabels[c] + '|Fr)=' + (tableData[0][c] / rowTotals[0]).toFixed(2));
        }
        text(condFormulas1.join('  '), margin + 10, formulaY + 18);
        break;
      case 3: // Conditional Row 2
        text('Formula: P(column | Sophomore) = (cell value) / (Sophomore total)', margin + 10, formulaY);
        let condFormulas2 = [];
        for (let c = 0; c < 4; c++) {
          condFormulas2.push('P(' + colLabels[c] + '|So)=' + (tableData[1][c] / rowTotals[1]).toFixed(2));
        }
        text(condFormulas2.join('  '), margin + 10, formulaY + 18);
        break;
    }
  }
}

function drawResultTable() {
  // Calculate totals
  let rowTotals = [0, 0];
  let colTotals = [0, 0, 0, 0];
  let grandTotal = 0;

  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      rowTotals[r] += tableData[r][c];
      colTotals[c] += tableData[r][c];
      grandTotal += tableData[r][c];
    }
  }

  resultTableY = tableY + 4 * cellHeight + (showSteps ? 115 : 75);
  let resultCellWidth = (canvasWidth - 2 * margin - 80) / 5;
  let resultCellHeight = 28;

  textSize(14);
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  text('Result: Distribution (proportions)', margin, resultTableY - 12);

  // Header
  fill(200, 220, 255);
  stroke('gray');
  let rx = margin + 80;

  if (distributionType === 0) {
    // Marginal row - show row labels and proportions
    rect(margin, resultTableY, 80, resultCellHeight);
    rect(rx, resultTableY, resultCellWidth * 2, resultCellHeight);
    noStroke();
    fill('black');
    textAlign(CENTER, CENTER);
    text('Grade', margin + 40, resultTableY + resultCellHeight / 2);
    text('Proportion', rx + resultCellWidth, resultTableY + resultCellHeight / 2);

    // Data rows
    for (let r = 0; r < 2; r++) {
      let ry = resultTableY + (r + 1) * resultCellHeight;
      fill(230, 240, 255);
      stroke('gray');
      rect(margin, ry, 80, resultCellHeight);
      rect(rx, ry, resultCellWidth * 2, resultCellHeight);
      noStroke();
      fill('black');
      textAlign(CENTER, CENTER);
      text(rowLabels[r], margin + 40, ry + resultCellHeight / 2);
      text((rowTotals[r] / grandTotal).toFixed(3), rx + resultCellWidth, ry + resultCellHeight / 2);
    }
    // Total row
    let ry = resultTableY + 3 * resultCellHeight;
    fill(200, 210, 230);
    stroke('gray');
    rect(margin, ry, 80, resultCellHeight);
    rect(rx, ry, resultCellWidth * 2, resultCellHeight);
    noStroke();
    fill(80, 80, 120);
    textAlign(CENTER, CENTER);
    text('Total', margin + 40, ry + resultCellHeight / 2);
    text('1.000', rx + resultCellWidth, ry + resultCellHeight / 2);

  } else if (distributionType === 1) {
    // Marginal col - show column labels and proportions
    rect(margin, resultTableY, 80, resultCellHeight);
    for (let c = 0; c < 4; c++) {
      rect(rx + c * resultCellWidth, resultTableY, resultCellWidth, resultCellHeight);
    }
    rect(rx + 4 * resultCellWidth, resultTableY, resultCellWidth, resultCellHeight);
    noStroke();
    fill('black');
    textAlign(CENTER, CENTER);
    text('Season', margin + 40, resultTableY + resultCellHeight / 2);
    for (let c = 0; c < 4; c++) {
      text(colLabels[c], rx + c * resultCellWidth + resultCellWidth / 2, resultTableY + resultCellHeight / 2);
    }
    fill(80, 80, 120);
    text('Total', rx + 4 * resultCellWidth + resultCellWidth / 2, resultTableY + resultCellHeight / 2);

    // Proportion row
    let ry = resultTableY + resultCellHeight;
    fill(230, 240, 255);
    stroke('gray');
    rect(margin, ry, 80, resultCellHeight);
    for (let c = 0; c < 4; c++) {
      rect(rx + c * resultCellWidth, ry, resultCellWidth, resultCellHeight);
    }
    fill(200, 210, 230);
    rect(rx + 4 * resultCellWidth, ry, resultCellWidth, resultCellHeight);
    noStroke();
    fill('black');
    textAlign(CENTER, CENTER);
    text('Prop.', margin + 40, ry + resultCellHeight / 2);
    for (let c = 0; c < 4; c++) {
      text((colTotals[c] / grandTotal).toFixed(3), rx + c * resultCellWidth + resultCellWidth / 2, ry + resultCellHeight / 2);
    }
    fill(80, 80, 120);
    text('1.000', rx + 4 * resultCellWidth + resultCellWidth / 2, ry + resultCellHeight / 2);

  } else {
    // Conditional distributions
    let condRow = distributionType === 2 ? 0 : 1;
    let condLabel = distributionType === 2 ? 'Freshman' : 'Sophomore';

    rect(margin, resultTableY, 80, resultCellHeight);
    for (let c = 0; c < 4; c++) {
      rect(rx + c * resultCellWidth, resultTableY, resultCellWidth, resultCellHeight);
    }
    rect(rx + 4 * resultCellWidth, resultTableY, resultCellWidth, resultCellHeight);
    noStroke();
    fill('black');
    textAlign(CENTER, CENTER);
    text('Season', margin + 40, resultTableY + resultCellHeight / 2);
    for (let c = 0; c < 4; c++) {
      text(colLabels[c], rx + c * resultCellWidth + resultCellWidth / 2, resultTableY + resultCellHeight / 2);
    }
    fill(80, 80, 120);
    text('Total', rx + 4 * resultCellWidth + resultCellWidth / 2, resultTableY + resultCellHeight / 2);

    // Conditional proportion row
    let ry = resultTableY + resultCellHeight;
    fill(230, 240, 255);
    stroke('gray');
    rect(margin, ry, 80, resultCellHeight);
    for (let c = 0; c < 4; c++) {
      rect(rx + c * resultCellWidth, ry, resultCellWidth, resultCellHeight);
    }
    fill(200, 210, 230);
    rect(rx + 4 * resultCellWidth, ry, resultCellWidth, resultCellHeight);
    noStroke();
    fill('black');
    textAlign(CENTER, CENTER);
    text('P|' + condLabel.substring(0, 2), margin + 40, ry + resultCellHeight / 2);
    for (let c = 0; c < 4; c++) {
      let prop = tableData[condRow][c] / rowTotals[condRow];
      text(prop.toFixed(3), rx + c * resultCellWidth + resultCellWidth / 2, ry + resultCellHeight / 2);
    }
    fill(80, 80, 120);
    text('1.000', rx + 4 * resultCellWidth + resultCellWidth / 2, ry + resultCellHeight / 2);
  }
}

function drawControls() {
  let y = drawHeight + 10;
  textSize(12);

  // Example Data button
  exampleButton.x = margin;
  exampleButton.y = y;
  exampleButton.w = 75;
  exampleButton.h = 28;

  fill(isMouseOverButton(exampleButton) ? 200 : 230);
  stroke(100);
  strokeWeight(1);
  rect(exampleButton.x, exampleButton.y, exampleButton.w, exampleButton.h, 5);
  noStroke();
  fill('black');
  textAlign(CENTER, CENTER);
  text('Example', exampleButton.x + exampleButton.w / 2, exampleButton.y + exampleButton.h / 2);

  // Distribution type buttons
  let btnStartX = margin + 90;
  for (let i = 0; i < 4; i++) {
    distButtons[i].x = btnStartX + i * 88;
    distButtons[i].y = y;

    if (distributionType === i) {
      fill(100, 150, 220);
    } else if (isMouseOverButton(distButtons[i])) {
      fill(200, 210, 230);
    } else {
      fill(230);
    }
    stroke(100);
    rect(distButtons[i].x, distButtons[i].y, distButtons[i].w, distButtons[i].h, 5);
    noStroke();
    fill(distributionType === i ? 'white' : 'black');
    textAlign(CENTER, CENTER);
    text(distButtons[i].label, distButtons[i].x + distButtons[i].w / 2, distButtons[i].y + distButtons[i].h / 2);
  }

  // Show Steps toggle
  stepsButton.x = canvasWidth - margin - 80;
  stepsButton.y = y;
  stepsButton.w = 70;
  stepsButton.h = 28;

  fill(showSteps ? 100 : 180, showSteps ? 180 : 180, showSteps ? 100 : 180);
  stroke(100);
  rect(stepsButton.x, stepsButton.y, stepsButton.w, stepsButton.h, 5);
  noStroke();
  fill(showSteps ? 'white' : 'black');
  textAlign(CENTER, CENTER);
  text(showSteps ? 'Steps On' : 'Steps Off', stepsButton.x + stepsButton.w / 2, stepsButton.y + stepsButton.h / 2);
}

function isMouseOverButton(btn) {
  return mouseX >= btn.x && mouseX <= btn.x + btn.w &&
         mouseY >= btn.y && mouseY <= btn.y + btn.h;
}

function mousePressed() {
  // Check Example button
  if (isMouseOverButton(exampleButton)) {
    loadExampleData();
    return;
  }

  // Check distribution type buttons
  for (let i = 0; i < 4; i++) {
    if (isMouseOverButton(distButtons[i])) {
      distributionType = i;
      return;
    }
  }

  // Check Steps toggle
  if (isMouseOverButton(stepsButton)) {
    showSteps = !showSteps;
    return;
  }

  // Check table cells for editing
  let x = tableX;
  let y = tableY + cellHeight; // Skip header row

  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      let cellX = x + c * cellWidth;
      let cellY = y + r * cellHeight;

      if (mouseX >= cellX && mouseX < cellX + cellWidth &&
          mouseY >= cellY && mouseY < cellY + cellHeight) {
        selectedCell = { row: r, col: c };
        inputBuffer = tableData[r][c].toString();
        return;
      }
    }
  }

  // Click outside cells - deselect
  if (selectedCell) {
    commitEdit();
  }
}

function keyPressed() {
  if (!selectedCell) return;

  if (keyCode === ENTER || keyCode === TAB) {
    commitEdit();
    // Move to next cell
    if (keyCode === TAB) {
      let nextCol = selectedCell.col + 1;
      let nextRow = selectedCell.row;
      if (nextCol >= 4) {
        nextCol = 0;
        nextRow = (nextRow + 1) % 2;
      }
      selectedCell = { row: nextRow, col: nextCol };
      inputBuffer = tableData[nextRow][nextCol].toString();
    } else {
      selectedCell = null;
    }
    return false;
  }

  if (keyCode === ESCAPE) {
    selectedCell = null;
    inputBuffer = '';
    return false;
  }

  if (keyCode === BACKSPACE) {
    inputBuffer = inputBuffer.slice(0, -1);
    return false;
  }

  // Allow digits only
  if (key >= '0' && key <= '9') {
    if (inputBuffer.length < 3) { // Max 3 digits (0-100)
      inputBuffer += key;
    }
    return false;
  }

  return true;
}

function commitEdit() {
  if (selectedCell && inputBuffer !== '') {
    let value = parseInt(inputBuffer);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      tableData[selectedCell.row][selectedCell.col] = value;
    }
  }
  selectedCell = null;
  inputBuffer = '';
}

function loadExampleData() {
  // Season preferences by grade level
  tableData = [
    [25, 18, 22, 15],  // Freshman
    [30, 25, 28, 20]   // Sophomore
  ];
  selectedCell = null;
  inputBuffer = '';
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
