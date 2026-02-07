// Expected Value Calculator MicroSim
// Interactive calculator for computing expected value of discrete random variables
// Students can enter values and probabilities to see step-by-step calculation
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 14;

// Data table
let rows = [];
let maxRows = 8;
let minRows = 2;

// Selected cell for editing
let selectedRow = -1;
let selectedCol = -1; // 0 = value, 1 = probability
let inputBuffer = '';

// Calculation results
let expectedValue = 0;
let probSum = 0;
let isValidDist = false;

// UI elements
let buttons = [];

// Display mode
let showContributions = true;

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaGreenDark = '#1B5E20';
let sylviaGreenLight = '#4CAF50';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';
let sylviaHazel = '#8B7355';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textFont('Arial');
    textSize(defaultTextSize);

    // Initialize with die roll example
    initializeDieRoll();

    describe('Expected value calculator where students can enter values and probabilities to compute the expected value (mean) of a discrete random variable.', LABEL);
}

function initializeDieRoll() {
    rows = [];
    for (let i = 1; i <= 6; i++) {
        rows.push({
            value: i,
            probability: 1/6
        });
    }
    calculateExpectedValue();
}

function initializeEmpty() {
    rows = [];
    for (let i = 0; i < 4; i++) {
        rows.push({
            value: 0,
            probability: 0
        });
    }
    calculateExpectedValue();
}

function calculateExpectedValue() {
    expectedValue = 0;
    probSum = 0;

    for (let row of rows) {
        let contribution = row.value * row.probability;
        expectedValue += contribution;
        probSum += row.probability;
    }

    // Check if valid distribution
    isValidDist = Math.abs(probSum - 1) < 0.001 &&
                  rows.every(r => r.probability >= 0 && r.probability <= 1);
}

function draw() {
    updateCanvasSize();

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    stroke('silver');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('Expected Value Calculator', canvasWidth / 2, 10);

    // Draw components
    drawTable();
    drawCalculation();
    drawBarChart();
    drawControls();
}

function drawTable() {
    let tableX = 20;
    let tableY = 45;
    let colWidth = 90;
    let rowHeight = 28;
    let headerHeight = 32;

    // Headers
    fill(sylviaGreen);
    stroke(sylviaGreenDark);
    strokeWeight(1);
    rect(tableX, tableY, colWidth, headerHeight);
    rect(tableX + colWidth, tableY, colWidth, headerHeight);
    rect(tableX + colWidth * 2, tableY, colWidth + 10, headerHeight);

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('Value (x)', tableX + colWidth / 2, tableY + headerHeight / 2);
    text('P(X = x)', tableX + colWidth * 1.5, tableY + headerHeight / 2);
    text('x * P(X = x)', tableX + colWidth * 2.5 + 5, tableY + headerHeight / 2);

    // Data rows
    for (let i = 0; i < rows.length; i++) {
        let y = tableY + headerHeight + i * rowHeight;
        let row = rows[i];

        // Value cell
        let isSelected = selectedRow === i && selectedCol === 0;
        fill(isSelected ? sylviaCream : 'white');
        stroke(isSelected ? sylviaAuburn : 150);
        strokeWeight(isSelected ? 2 : 1);
        rect(tableX, y, colWidth, rowHeight);

        fill('black');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(14);
        if (isSelected && inputBuffer !== '') {
            text(inputBuffer + '_', tableX + colWidth / 2, y + rowHeight / 2);
        } else {
            text(row.value.toString(), tableX + colWidth / 2, y + rowHeight / 2);
        }

        // Probability cell
        isSelected = selectedRow === i && selectedCol === 1;
        fill(isSelected ? sylviaCream : 'white');
        stroke(isSelected ? sylviaAuburn : 150);
        strokeWeight(isSelected ? 2 : 1);
        rect(tableX + colWidth, y, colWidth, rowHeight);

        // Color red if invalid
        if (row.probability < 0 || row.probability > 1) {
            fill('#FF5252');
        } else {
            fill('black');
        }
        noStroke();
        textSize(14);
        if (isSelected && inputBuffer !== '') {
            text(inputBuffer + '_', tableX + colWidth * 1.5, y + rowHeight / 2);
        } else {
            text(row.probability.toFixed(4), tableX + colWidth * 1.5, y + rowHeight / 2);
        }

        // Contribution cell (read-only)
        fill('#f0f0f0');
        stroke(150);
        strokeWeight(1);
        rect(tableX + colWidth * 2, y, colWidth + 10, rowHeight);

        let contribution = row.value * row.probability;
        fill(sylviaGreenDark);
        noStroke();
        textSize(13);
        text(contribution.toFixed(4), tableX + colWidth * 2.5 + 5, y + rowHeight / 2);
    }

    // Sum row
    let sumY = tableY + headerHeight + rows.length * rowHeight;
    fill(sylviaGreen + '30');
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(tableX, sumY, colWidth * 3 + 10, rowHeight);

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(13);
    text('Sum:', tableX + 10, sumY + rowHeight / 2);

    textAlign(CENTER, CENTER);

    // Probability sum with validation color
    if (Math.abs(probSum - 1) < 0.001) {
        fill(sylviaGreen);
    } else {
        fill('#FF5252');
    }
    text(probSum.toFixed(4), tableX + colWidth * 1.5, sumY + rowHeight / 2);

    // Expected value
    fill(sylviaGreenDark);
    textSize(14);
    text(expectedValue.toFixed(4), tableX + colWidth * 2.5 + 5, sumY + rowHeight / 2);

    // Validation message
    let msgY = sumY + rowHeight + 8;
    textAlign(LEFT, TOP);
    textSize(11);
    if (isValidDist) {
        fill(sylviaGreen);
        text('Valid distribution (probabilities sum to 1)', tableX, msgY);
    } else if (probSum > 1.001) {
        fill('#FF5252');
        text('Invalid: Probabilities sum to more than 1', tableX, msgY);
    } else if (probSum < 0.999) {
        fill('#FF5252');
        text('Invalid: Probabilities sum to less than 1', tableX, msgY);
    }

    // Click instruction
    fill(80);
    textSize(10);
    text('Click any cell to edit. Type numbers and press Enter.', tableX, msgY + 16);
}

function drawCalculation() {
    let calcX = 310;
    let calcY = 50;
    let calcWidth = canvasWidth - calcX - 20;
    let calcHeight = 160;

    fill(255);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(calcX, calcY, calcWidth, calcHeight, 8);

    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);
    text('Expected Value Formula:', calcX + 12, calcY + 10);

    textSize(13);
    fill('black');
    text('E(X) = Sum of [x * P(X = x)]', calcX + 12, calcY + 32);

    // Show calculation breakdown
    textSize(12);
    let lineY = calcY + 58;

    if (rows.length <= 4) {
        text('E(X) = ', calcX + 12, lineY);

        let terms = [];
        for (let i = 0; i < rows.length; i++) {
            terms.push('(' + rows[i].value + ')(' + rows[i].probability.toFixed(3) + ')');
        }
        let termStr = terms.join(' + ');
        if (termStr.length > 35) {
            termStr = terms.slice(0, 2).join(' + ') + ' + ...';
        }
        text(termStr, calcX + 55, lineY);
    }

    lineY += 22;
    fill(sylviaGreenDark);
    textSize(16);
    text('E(X) = ' + expectedValue.toFixed(4), calcX + 12, lineY);

    // Interpretation
    lineY += 30;
    fill(80);
    textSize(11);
    text('This is the "long-run average" value of X.', calcX + 12, lineY);
    text('If you repeated this random process many', calcX + 12, lineY + 14);
    text('times, the average would approach ' + expectedValue.toFixed(2) + '.', calcX + 12, lineY + 28);
}

function drawBarChart() {
    let chartX = 310;
    let chartY = 220;
    let chartWidth = canvasWidth - chartX - 20;
    let chartHeight = 180;

    fill(255);
    stroke(150);
    strokeWeight(1);
    rect(chartX, chartY, chartWidth, chartHeight);

    // Find max probability for scaling
    let maxProb = Math.max(...rows.map(r => r.probability), 0.5);

    // Draw bars
    let barWidth = (chartWidth - 40) / rows.length;
    let barMaxHeight = chartHeight - 50;

    for (let i = 0; i < rows.length; i++) {
        let x = chartX + 20 + i * barWidth;
        let barHeight = (rows[i].probability / maxProb) * barMaxHeight;
        let y = chartY + chartHeight - 30 - barHeight;

        fill(sylviaGreen);
        stroke(sylviaGreenDark);
        strokeWeight(1);
        rect(x + 2, y, barWidth - 4, barHeight, 2, 2, 0, 0);

        // X-axis label
        fill('black');
        noStroke();
        textAlign(CENTER, TOP);
        textSize(10);
        text(rows[i].value, x + barWidth / 2, chartY + chartHeight - 25);
    }

    // Draw expected value marker
    if (rows.length > 0) {
        let minVal = Math.min(...rows.map(r => r.value));
        let maxVal = Math.max(...rows.map(r => r.value));

        if (maxVal > minVal) {
            let evX = map(expectedValue, minVal, maxVal,
                         chartX + 20 + barWidth / 2,
                         chartX + 20 + (rows.length - 1) * barWidth + barWidth / 2);

            stroke(sylviaAuburn);
            strokeWeight(3);
            line(evX, chartY + 10, evX, chartY + chartHeight - 30);

            fill(sylviaAuburn);
            noStroke();
            textSize(10);
            textAlign(CENTER, TOP);
            text('E(X)=' + expectedValue.toFixed(2), evX, chartY + 5);
        }
    }

    // Chart title
    fill('black');
    textAlign(CENTER, TOP);
    textSize(12);
    text('Distribution', chartX + chartWidth / 2, chartY + chartHeight - 10);
}

function drawControls() {
    buttons = [];

    let btnY = drawHeight + 15;
    let btnHeight = 30;
    let btnSpacing = 10;
    let x = 20;

    // Die Roll preset button
    drawButton(x, btnY, 85, btnHeight, 'Die Roll', 'dieRoll');
    x += 85 + btnSpacing;

    // Clear button
    drawButton(x, btnY, 70, btnHeight, 'Clear All', 'clear');
    x += 70 + btnSpacing;

    // Add Row button
    if (rows.length < maxRows) {
        drawButton(x, btnY, 80, btnHeight, 'Add Row', 'addRow');
        x += 80 + btnSpacing;
    }

    // Remove Row button
    if (rows.length > minRows) {
        drawButton(x, btnY, 100, btnHeight, 'Remove Row', 'removeRow');
        x += 100 + btnSpacing;
    }

    // Instructions
    fill(80);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    text('Enter values and probabilities. Probabilities must sum to 1 for a valid distribution.', 20, drawHeight + 55);

    // Sylvia quote
    fill(sylviaGreenDark);
    textSize(11);
    text('"Expected value is your best prediction for the long-run average!" - Sylvia', 20, drawHeight + 75);
}

function drawButton(x, y, w, h, label, action) {
    let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

    fill(isHover ? sylviaGreenLight : sylviaGreen);
    stroke(sylviaGreenDark);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(label, x + w / 2, y + h / 2);

    buttons.push({x, y, w, h, action});
}

function mousePressed() {
    // First, finalize any current edit
    if (selectedRow >= 0 && selectedCol >= 0) {
        finalizeEdit();
    }

    // Check buttons
    for (let btn of buttons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            handleButtonClick(btn.action);
            return;
        }
    }

    // Check table cells for editing
    let tableX = 20;
    let tableY = 45;
    let colWidth = 90;
    let rowHeight = 28;
    let headerHeight = 32;

    for (let i = 0; i < rows.length; i++) {
        let y = tableY + headerHeight + i * rowHeight;

        // Value cell
        if (mouseX >= tableX && mouseX <= tableX + colWidth &&
            mouseY >= y && mouseY <= y + rowHeight) {
            selectedRow = i;
            selectedCol = 0;
            inputBuffer = '';
            return;
        }

        // Probability cell
        if (mouseX >= tableX + colWidth && mouseX <= tableX + colWidth * 2 &&
            mouseY >= y && mouseY <= y + rowHeight) {
            selectedRow = i;
            selectedCol = 1;
            inputBuffer = '';
            return;
        }
    }

    // Clicked elsewhere - deselect
    selectedRow = -1;
    selectedCol = -1;
    inputBuffer = '';
}

function keyPressed() {
    if (selectedRow >= 0 && selectedCol >= 0) {
        if (keyCode === ENTER || keyCode === RETURN) {
            finalizeEdit();
            // Move to next cell
            if (selectedCol === 0) {
                selectedCol = 1;
                inputBuffer = '';
            } else {
                selectedRow = (selectedRow + 1) % rows.length;
                selectedCol = 0;
                inputBuffer = '';
            }
        } else if (keyCode === ESCAPE) {
            inputBuffer = '';
            selectedRow = -1;
            selectedCol = -1;
        } else if (keyCode === BACKSPACE) {
            inputBuffer = inputBuffer.slice(0, -1);
        } else if (keyCode === TAB) {
            finalizeEdit();
            if (selectedCol === 0) {
                selectedCol = 1;
            } else {
                selectedRow = (selectedRow + 1) % rows.length;
                selectedCol = 0;
            }
            inputBuffer = '';
            return false; // Prevent default tab behavior
        }
    }
}

function keyTyped() {
    if (selectedRow >= 0 && selectedCol >= 0) {
        // Allow numbers, decimal point, and minus sign
        if ((key >= '0' && key <= '9') || key === '.' || key === '-') {
            inputBuffer += key;
        }
    }
}

function finalizeEdit() {
    if (selectedRow >= 0 && selectedCol >= 0 && inputBuffer !== '') {
        let value = parseFloat(inputBuffer);
        if (!isNaN(value)) {
            if (selectedCol === 0) {
                rows[selectedRow].value = value;
            } else {
                rows[selectedRow].probability = value;
            }
            calculateExpectedValue();
        }
    }
    inputBuffer = '';
}

function handleButtonClick(action) {
    selectedRow = -1;
    selectedCol = -1;
    inputBuffer = '';

    switch(action) {
        case 'dieRoll':
            initializeDieRoll();
            break;
        case 'clear':
            initializeEmpty();
            break;
        case 'addRow':
            if (rows.length < maxRows) {
                rows.push({value: 0, probability: 0});
                calculateExpectedValue();
            }
            break;
        case 'removeRow':
            if (rows.length > minRows) {
                rows.pop();
                calculateExpectedValue();
            }
            break;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
