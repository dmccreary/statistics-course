// Random Digit Table Simulator MicroSim
// Demonstrates how to use a random digit table for simple random sampling
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 15;
let defaultTextSize = 14;

// Random digit table (10 rows x 40 digits, displayed in groups of 5)
let digitTable = [];
let numRows = 10;
let numCols = 40;

// Sampling parameters
let populationSize = 50;
let sampleSize = 5;
let startRow = 0;
let startCol = 0;

// Current position in table
let currentRow = 0;
let currentCol = 0;

// Selection state
let selectedMembers = [];
let stepsHistory = [];
let isComplete = false;
let digitsNeeded = 2; // How many digits to read at once

// UI state
let stepping = false;

// Button positions
let buttonY;
let generateButtonX, stepButtonX, resetButtonX;
let buttonWidth = 90;
let buttonHeight = 28;

// Input areas for population/sample size
let popInputActive = false;
let sampleInputActive = false;
let popInputValue = "50";
let sampleInputValue = "5";

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    // Generate initial random digit table
    generateTable();

    describe('Interactive random digit table simulator for practicing simple random sampling. Students step through the table to select sample members while learning to skip invalid numbers.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    fill(252, 252, 255);
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill(245, 245, 250);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    textStyle(BOLD);
    text('Random Digit Table Simulator', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Draw parameter inputs
    drawParameterInputs();

    // Draw the digit table
    drawDigitTable();

    // Draw selection panel
    drawSelectionPanel();

    // Draw step history
    drawStepHistory();

    // Draw controls
    drawControls();
}

function drawParameterInputs() {
    let inputY = 35;
    let inputWidth = 50;
    let inputHeight = 22;

    // Population size
    fill(60);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Population Size (1-999):', margin, inputY + inputHeight / 2);

    // Population input box
    fill(popInputActive ? 255 : 245);
    stroke(popInputActive ? 'steelblue' : 150);
    strokeWeight(1);
    rect(margin + 145, inputY, inputWidth, inputHeight, 3);

    fill(30);
    noStroke();
    textAlign(CENTER, CENTER);
    text(popInputValue, margin + 145 + inputWidth / 2, inputY + inputHeight / 2);

    // Sample size
    fill(60);
    textAlign(LEFT, CENTER);
    text('Sample Size (1-50):', margin + 220, inputY + inputHeight / 2);

    // Sample input box
    fill(sampleInputActive ? 255 : 245);
    stroke(sampleInputActive ? 'steelblue' : 150);
    strokeWeight(1);
    rect(margin + 350, inputY, inputWidth, inputHeight, 3);

    fill(30);
    noStroke();
    textAlign(CENTER, CENTER);
    text(sampleInputValue, margin + 350 + inputWidth / 2, inputY + inputHeight / 2);

    // Digits needed info
    fill(100);
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Reading ' + digitsNeeded + ' digits at a time (for population 1-' + populationSize + ')', margin + 420, inputY + inputHeight / 2);
}

function drawDigitTable() {
    let tableTop = 70;
    let tableLeft = margin;
    let cellWidth = 12;
    let cellHeight = 20;
    let groupSpacing = 8;

    // Table title
    fill(30, 60, 100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Random Digit Table', tableLeft, tableTop - 15);
    textStyle(NORMAL);

    // Row numbers
    fill(100);
    textSize(10);
    textAlign(RIGHT, CENTER);
    for (let r = 0; r < numRows; r++) {
        text('Row ' + (r + 1) + ':', tableLeft + 35, tableTop + r * cellHeight + cellHeight / 2);
    }

    // Draw digits
    textAlign(CENTER, CENTER);
    textSize(11);

    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            let x = tableLeft + 45 + c * cellWidth + floor(c / 5) * groupSpacing;
            let y = tableTop + r * cellHeight;

            // Determine cell highlighting
            let isCurrentRead = false;
            let isPartOfCurrentRead = false;

            // Check if this digit is part of the current read position
            if (r === currentRow) {
                for (let d = 0; d < digitsNeeded; d++) {
                    if (c === currentCol + d) {
                        isPartOfCurrentRead = true;
                        if (d === 0) isCurrentRead = true;
                    }
                }
            }

            // Check if this digit was already processed
            let wasProcessed = false;
            if (r < currentRow || (r === currentRow && c < currentCol)) {
                wasProcessed = true;
            }

            // Cell background
            if (isPartOfCurrentRead) {
                fill(255, 255, 150);
                noStroke();
                rect(x - cellWidth / 2, y, cellWidth, cellHeight);
            } else if (wasProcessed) {
                fill(230, 230, 230);
                noStroke();
                rect(x - cellWidth / 2, y, cellWidth, cellHeight);
            }

            // Digit text
            if (isPartOfCurrentRead) {
                fill(180, 60, 60);
                textStyle(BOLD);
            } else if (wasProcessed) {
                fill(150);
                textStyle(NORMAL);
            } else {
                fill(30);
                textStyle(NORMAL);
            }

            text(digitTable[r][c], x, y + cellHeight / 2);
        }
    }

    textStyle(NORMAL);
}

function drawSelectionPanel() {
    let panelX = canvasWidth - 200 - margin;
    let panelY = 70;
    let panelWidth = 200;
    let panelHeight = 150;

    // Panel background
    fill(255, 255, 255, 250);
    stroke(150);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    // Panel title
    fill(30, 100, 60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Selected Sample Members', panelX + 10, panelY + 8);
    textStyle(NORMAL);

    // Progress
    fill(80);
    textSize(11);
    text('Progress: ' + selectedMembers.length + ' / ' + sampleSize, panelX + 10, panelY + 28);

    // Selected members
    textSize(14);
    fill(30, 80, 50);
    let membersText = selectedMembers.length > 0 ? selectedMembers.join(', ') : '(none yet)';

    // Word wrap if needed
    textAlign(LEFT, TOP);
    text(membersText, panelX + 10, panelY + 50, panelWidth - 20, panelHeight - 60);

    // Completion message
    if (isComplete) {
        fill(20, 100, 50);
        textSize(12);
        textStyle(BOLD);
        text('Sample Complete!', panelX + 10, panelY + panelHeight - 25);
        textStyle(NORMAL);
    }
}

function drawStepHistory() {
    let historyX = margin;
    let historyY = 280;
    let historyWidth = canvasWidth - 220 - margin * 2;
    let historyHeight = drawHeight - historyY - 10;

    // Panel background
    fill(255, 255, 255, 250);
    stroke(150);
    strokeWeight(1);
    rect(historyX, historyY, historyWidth, historyHeight, 5);

    // Panel title
    fill(30, 60, 100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Step-by-Step Log', historyX + 10, historyY + 8);
    textStyle(NORMAL);

    // History entries (show last 6)
    let visibleHistory = stepsHistory.slice(-6);
    textSize(11);

    for (let i = 0; i < visibleHistory.length; i++) {
        let step = visibleHistory[i];
        let y = historyY + 28 + i * 22;

        // Number read
        fill(80);
        textAlign(LEFT, TOP);
        text('Read: ' + step.number.toString().padStart(digitsNeeded, '0'), historyX + 10, y);

        // Action taken
        if (step.action === 'selected') {
            fill(30, 120, 60);
            text('→ Select #' + step.number, historyX + 80, y);
        } else if (step.action === 'skip-range') {
            fill(180, 100, 40);
            text('→ Skip (out of range)', historyX + 80, y);
        } else if (step.action === 'skip-duplicate') {
            fill(180, 100, 40);
            text('→ Skip (already selected)', historyX + 80, y);
        } else if (step.action === 'skip-zero') {
            fill(180, 100, 40);
            text('→ Skip (zero not valid)', historyX + 80, y);
        }
    }

    // Show "more above" indicator
    if (stepsHistory.length > 6) {
        fill(150);
        textSize(10);
        text('(' + (stepsHistory.length - 6) + ' more steps above...)', historyX + 10, historyY + historyHeight - 18);
    }
}

function drawControls() {
    buttonY = drawHeight + 11;

    // Calculate button positions
    generateButtonX = margin;
    stepButtonX = margin + buttonWidth + 10;
    resetButtonX = margin + (buttonWidth + 10) * 2;

    // Generate New Table button
    fill(100, 130, 180);
    stroke(70, 100, 150);
    strokeWeight(1);
    rect(generateButtonX, buttonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('New Table', generateButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);

    // Step Through button
    if (isComplete) {
        fill(180, 180, 180);
        stroke(150);
    } else {
        fill(80, 150, 80);
        stroke(60, 120, 60);
    }
    strokeWeight(1);
    rect(stepButtonX, buttonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text('Step →', stepButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);

    // Reset Selection button
    fill(180, 100, 80);
    stroke(150, 80, 60);
    strokeWeight(1);
    rect(resetButtonX, buttonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text('Reset', resetButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);

    // Instructions
    fill(80);
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Click "Step →" to read digits and build your sample', resetButtonX + buttonWidth + 20, buttonY + buttonHeight / 2);
}

function mousePressed() {
    // Check parameter input clicks
    let inputY = 35;
    let inputWidth = 50;
    let inputHeight = 22;

    // Population input
    if (mouseX >= margin + 145 && mouseX <= margin + 145 + inputWidth &&
        mouseY >= inputY && mouseY <= inputY + inputHeight) {
        popInputActive = true;
        sampleInputActive = false;
        return;
    }

    // Sample input
    if (mouseX >= margin + 350 && mouseX <= margin + 350 + inputWidth &&
        mouseY >= inputY && mouseY <= inputY + inputHeight) {
        sampleInputActive = true;
        popInputActive = false;
        return;
    }

    // Deactivate inputs if clicking elsewhere
    popInputActive = false;
    sampleInputActive = false;

    // Check control button clicks
    if (mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
        // Generate New Table
        if (mouseX >= generateButtonX && mouseX <= generateButtonX + buttonWidth) {
            generateTable();
            resetSelection();
            return;
        }

        // Step Through
        if (mouseX >= stepButtonX && mouseX <= stepButtonX + buttonWidth) {
            if (!isComplete) {
                stepThrough();
            }
            return;
        }

        // Reset Selection
        if (mouseX >= resetButtonX && mouseX <= resetButtonX + buttonWidth) {
            resetSelection();
            return;
        }
    }
}

function keyPressed() {
    if (popInputActive) {
        if (key >= '0' && key <= '9' && popInputValue.length < 3) {
            popInputValue += key;
        } else if (keyCode === BACKSPACE && popInputValue.length > 0) {
            popInputValue = popInputValue.slice(0, -1);
        } else if (keyCode === ENTER) {
            popInputActive = false;
            updateParameters();
        }
        return false;
    }

    if (sampleInputActive) {
        if (key >= '0' && key <= '9' && sampleInputValue.length < 2) {
            sampleInputValue += key;
        } else if (keyCode === BACKSPACE && sampleInputValue.length > 0) {
            sampleInputValue = sampleInputValue.slice(0, -1);
        } else if (keyCode === ENTER) {
            sampleInputActive = false;
            updateParameters();
        }
        return false;
    }

    // Spacebar to step
    if (key === ' ' && !isComplete) {
        stepThrough();
        return false;
    }
}

function updateParameters() {
    let newPop = parseInt(popInputValue) || 50;
    let newSample = parseInt(sampleInputValue) || 5;

    // Constrain values
    populationSize = constrain(newPop, 1, 999);
    sampleSize = constrain(newSample, 1, min(50, populationSize));

    popInputValue = populationSize.toString();
    sampleInputValue = sampleSize.toString();

    // Calculate digits needed
    if (populationSize <= 9) {
        digitsNeeded = 1;
    } else if (populationSize <= 99) {
        digitsNeeded = 2;
    } else {
        digitsNeeded = 3;
    }

    resetSelection();
}

function generateTable() {
    digitTable = [];
    for (let r = 0; r < numRows; r++) {
        let row = [];
        for (let c = 0; c < numCols; c++) {
            row.push(floor(random(10)));
        }
        digitTable.push(row);
    }
}

function resetSelection() {
    currentRow = 0;
    currentCol = 0;
    selectedMembers = [];
    stepsHistory = [];
    isComplete = false;
    updateParameters();
}

function stepThrough() {
    if (isComplete) return;

    // Read the current number
    let numStr = '';
    for (let d = 0; d < digitsNeeded; d++) {
        let col = currentCol + d;
        if (col >= numCols) {
            // Wrap to next row
            numStr += digitTable[(currentRow + 1) % numRows][col - numCols];
        } else {
            numStr += digitTable[currentRow][col];
        }
    }

    let num = parseInt(numStr);

    // Determine action
    let action = '';
    if (num === 0) {
        action = 'skip-zero';
    } else if (num > populationSize) {
        action = 'skip-range';
    } else if (selectedMembers.includes(num)) {
        action = 'skip-duplicate';
    } else {
        action = 'selected';
        selectedMembers.push(num);
    }

    // Record step
    stepsHistory.push({
        number: num,
        action: action
    });

    // Move to next position
    currentCol += digitsNeeded;
    if (currentCol >= numCols) {
        currentCol = currentCol - numCols;
        currentRow++;
        if (currentRow >= numRows) {
            currentRow = 0; // Wrap around
        }
    }

    // Check if sample is complete
    if (selectedMembers.length >= sampleSize) {
        isComplete = true;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = min(containerWidth, 850);
    if (canvasWidth < 700) canvasWidth = 700;
}
