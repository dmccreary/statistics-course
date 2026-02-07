// Correlation Calculator MicroSim
// Step-by-step correlation coefficient calculation with real-time scatterplot
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout
let margin = 20;
let defaultTextSize = 14;

// Data table dimensions
let tableLeft = 15;
let tableTop = 45;
let tableWidth = 280;
let cellHeight = 28;
let numRows = 6;

// Scatterplot dimensions
let plotLeft, plotTop, plotWidth, plotHeight;

// Data storage
let xData = [];
let yData = [];
let editingCell = null; // {row, col} or null
let inputBuffer = '';

// Calculated values
let meanX = 0, meanY = 0;
let stdX = 0, stdY = 0;
let zScoresX = [];
let zScoresY = [];
let zProducts = [];
let correlation = 0;

// Animation state
let currentStep = 0;
let maxSteps = 5;
let animating = false;
let animationSpeed = 1;

// Preset datasets
let presets = {
    'Study Hours': {
        x: [2, 4, 5, 3, 6, 7],
        y: [65, 75, 85, 70, 90, 92]
    },
    'Height/Weight': {
        x: [62, 65, 68, 70, 72, 74],
        y: [120, 135, 155, 160, 175, 185]
    },
    'Negative': {
        x: [1, 2, 3, 4, 5, 6],
        y: [95, 85, 70, 65, 50, 40]
    },
    'No Correlation': {
        x: [2, 4, 3, 5, 1, 6],
        y: [50, 70, 45, 75, 60, 55]
    }
};
let currentPreset = 'Study Hours';

// Button definitions
let buttons = [];
let speedSlider = { x: 0, y: 0, width: 100, height: 16 };
let showStepsToggle = true;

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaGreenDark = '#1B5E20';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textFont('Arial');
    textSize(defaultTextSize);

    // Initialize with preset data
    loadPreset(currentPreset);

    describe('Step-by-step correlation calculator showing how the correlation coefficient is calculated from paired data. Students can enter data, see the scatterplot, and watch the formula being applied.', LABEL);
}

function loadPreset(name) {
    currentPreset = name;
    xData = [...presets[name].x];
    yData = [...presets[name].y];
    // Pad to numRows
    while (xData.length < numRows) {
        xData.push(null);
        yData.push(null);
    }
    calculateAll();
    currentStep = 0;
}

function calculateAll() {
    // Get valid pairs
    let validX = [];
    let validY = [];
    for (let i = 0; i < numRows; i++) {
        if (xData[i] !== null && yData[i] !== null && !isNaN(xData[i]) && !isNaN(yData[i])) {
            validX.push(xData[i]);
            validY.push(yData[i]);
        }
    }

    if (validX.length < 2) {
        meanX = meanY = stdX = stdY = correlation = 0;
        zScoresX = [];
        zScoresY = [];
        zProducts = [];
        return;
    }

    // Calculate means
    meanX = validX.reduce((a, b) => a + b, 0) / validX.length;
    meanY = validY.reduce((a, b) => a + b, 0) / validY.length;

    // Calculate standard deviations (sample)
    let sumSqX = validX.reduce((sum, x) => sum + (x - meanX) ** 2, 0);
    let sumSqY = validY.reduce((sum, y) => sum + (y - meanY) ** 2, 0);
    stdX = Math.sqrt(sumSqX / (validX.length - 1));
    stdY = Math.sqrt(sumSqY / (validY.length - 1));

    // Calculate z-scores
    zScoresX = validX.map(x => stdX > 0 ? (x - meanX) / stdX : 0);
    zScoresY = validY.map(y => stdY > 0 ? (y - meanY) / stdY : 0);

    // Calculate products of z-scores
    zProducts = zScoresX.map((zx, i) => zx * zScoresY[i]);

    // Calculate correlation
    let sumProducts = zProducts.reduce((a, b) => a + b, 0);
    correlation = sumProducts / (validX.length - 1);

    // Clamp to valid range (handles floating point errors)
    correlation = Math.max(-1, Math.min(1, correlation));
}

function draw() {
    updateCanvasSize();

    // Calculate scatterplot dimensions dynamically
    plotLeft = tableLeft + tableWidth + 30;
    plotTop = tableTop;
    plotWidth = canvasWidth - plotLeft - 20;
    plotHeight = 200;

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
    text('Correlation Calculator', canvasWidth / 2, 10);

    // Draw components
    drawDataTable();
    drawScatterplot();
    drawCalculationSteps();
    drawControls();
}

function drawDataTable() {
    let colWidths = [35, 60, 60, 55, 55, 55];
    let headers = ['Row', 'X', 'Y', 'Zx', 'Zy', 'Zx*Zy'];

    // Table header
    fill(sylviaGreen);
    noStroke();
    rect(tableLeft, tableTop, tableWidth, cellHeight);

    fill('white');
    textAlign(CENTER, CENTER);
    textSize(12);
    let x = tableLeft;
    for (let c = 0; c < headers.length; c++) {
        text(headers[c], x + colWidths[c] / 2, tableTop + cellHeight / 2);
        x += colWidths[c];
    }

    // Table rows
    let validCount = 0;
    for (let r = 0; r < numRows; r++) {
        let rowY = tableTop + cellHeight * (r + 1);

        // Row background
        fill(r % 2 === 0 ? 255 : 245);
        stroke(200);
        strokeWeight(1);
        rect(tableLeft, rowY, tableWidth, cellHeight);

        x = tableLeft;

        // Row number
        fill('black');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(11);
        text(r + 1, x + colWidths[0] / 2, rowY + cellHeight / 2);
        x += colWidths[0];

        // X value (editable)
        drawEditableCell(x, rowY, colWidths[1], r, 0, xData[r]);
        x += colWidths[1];

        // Y value (editable)
        drawEditableCell(x, rowY, colWidths[2], r, 1, yData[r]);
        x += colWidths[2];

        // Z-scores and product (calculated, shown conditionally)
        let hasValidPair = xData[r] !== null && yData[r] !== null && !isNaN(xData[r]) && !isNaN(yData[r]);

        if (hasValidPair && currentStep >= 2 && validCount < zScoresX.length) {
            // Zx
            let zx = zScoresX[validCount];
            fill(zx >= 0 ? sylviaGreen : '#E57373');
            textAlign(CENTER, CENTER);
            text(zx.toFixed(2), x + colWidths[3] / 2, rowY + cellHeight / 2);
            x += colWidths[3];

            // Zy
            let zy = zScoresY[validCount];
            fill(zy >= 0 ? sylviaGreen : '#E57373');
            text(zy.toFixed(2), x + colWidths[4] / 2, rowY + cellHeight / 2);
            x += colWidths[4];

            // Zx * Zy
            if (currentStep >= 3) {
                let prod = zProducts[validCount];
                fill(prod >= 0 ? sylviaGreen : '#E57373');
                text(prod.toFixed(3), x + colWidths[5] / 2, rowY + cellHeight / 2);
            }

            validCount++;
        }
    }

    // Summary row
    let summaryY = tableTop + cellHeight * (numRows + 1);
    fill(240);
    stroke(200);
    rect(tableLeft, summaryY, tableWidth, cellHeight);

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);

    if (currentStep >= 1) {
        text('Mean:', tableLeft + 5, summaryY + cellHeight / 2);
        textAlign(CENTER, CENTER);
        text(meanX.toFixed(2), tableLeft + colWidths[0] + colWidths[1] / 2, summaryY + cellHeight / 2);
        text(meanY.toFixed(2), tableLeft + colWidths[0] + colWidths[1] + colWidths[2] / 2, summaryY + cellHeight / 2);
    }

    if (currentStep >= 4) {
        let sumProd = zProducts.reduce((a, b) => a + b, 0);
        textAlign(RIGHT, CENTER);
        fill(sylviaAuburn);
        text('Sum=' + sumProd.toFixed(3), tableLeft + tableWidth - 5, summaryY + cellHeight / 2);
    }
}

function drawEditableCell(x, y, w, row, col, value) {
    let isEditing = editingCell && editingCell.row === row && editingCell.col === col;

    // Cell background
    fill(isEditing ? '#FFFDE7' : 'white');
    stroke(isEditing ? sylviaAuburn : 200);
    strokeWeight(isEditing ? 2 : 1);
    rect(x + 2, y + 2, w - 4, cellHeight - 4, 3);

    // Cell value
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);

    if (isEditing) {
        // Show input buffer with cursor
        text(inputBuffer + '|', x + w / 2, y + cellHeight / 2);
    } else if (value !== null && !isNaN(value)) {
        text(value.toString(), x + w / 2, y + cellHeight / 2);
    }
}

function drawScatterplot() {
    // Plot background
    fill('white');
    stroke(200);
    strokeWeight(1);
    rect(plotLeft, plotTop, plotWidth, plotHeight, 5);

    // Get valid data for plotting
    let validX = [];
    let validY = [];
    for (let i = 0; i < numRows; i++) {
        if (xData[i] !== null && yData[i] !== null && !isNaN(xData[i]) && !isNaN(yData[i])) {
            validX.push(xData[i]);
            validY.push(yData[i]);
        }
    }

    if (validX.length === 0) {
        fill(150);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(14);
        text('Enter data to see scatterplot', plotLeft + plotWidth / 2, plotTop + plotHeight / 2);
        return;
    }

    // Calculate axis ranges
    let xMin = Math.min(...validX);
    let xMax = Math.max(...validX);
    let yMin = Math.min(...validY);
    let yMax = Math.max(...validY);

    // Add padding
    let xPad = (xMax - xMin) * 0.1 || 1;
    let yPad = (yMax - yMin) * 0.1 || 1;
    xMin -= xPad;
    xMax += xPad;
    yMin -= yPad;
    yMax += yPad;

    let innerLeft = plotLeft + 40;
    let innerRight = plotLeft + plotWidth - 15;
    let innerTop = plotTop + 20;
    let innerBottom = plotTop + plotHeight - 30;

    // Draw axes
    stroke(100);
    strokeWeight(1);
    line(innerLeft, innerBottom, innerRight, innerBottom); // X axis
    line(innerLeft, innerTop, innerLeft, innerBottom); // Y axis

    // Axis labels
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    text('X', (innerLeft + innerRight) / 2, innerBottom + 12);

    push();
    translate(plotLeft + 12, (innerTop + innerBottom) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    text('Y', 0, 0);
    pop();

    // Tick marks and values
    textSize(9);
    textAlign(CENTER, TOP);
    for (let i = 0; i <= 4; i++) {
        let xVal = xMin + (xMax - xMin) * i / 4;
        let xPos = map(xVal, xMin, xMax, innerLeft, innerRight);
        stroke(200);
        line(xPos, innerBottom, xPos, innerBottom + 4);
        noStroke();
        fill(100);
        text(xVal.toFixed(0), xPos, innerBottom + 5);
    }

    textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 4; i++) {
        let yVal = yMin + (yMax - yMin) * i / 4;
        let yPos = map(yVal, yMin, yMax, innerBottom, innerTop);
        stroke(200);
        line(innerLeft - 4, yPos, innerLeft, yPos);
        noStroke();
        fill(100);
        text(yVal.toFixed(0), innerLeft - 6, yPos);
    }

    // Draw mean lines if step >= 1
    if (currentStep >= 1 && validX.length >= 2) {
        stroke(sylviaAuburn);
        strokeWeight(1);
        setLineDash([5, 5]);

        let meanXPos = map(meanX, xMin, xMax, innerLeft, innerRight);
        let meanYPos = map(meanY, yMin, yMax, innerBottom, innerTop);

        line(meanXPos, innerTop, meanXPos, innerBottom);
        line(innerLeft, meanYPos, innerRight, meanYPos);

        setLineDash([]);

        // Label means
        fill(sylviaAuburn);
        noStroke();
        textSize(9);
        textAlign(CENTER, BOTTOM);
        text('x=' + meanX.toFixed(1), meanXPos, innerTop - 2);
        textAlign(LEFT, CENTER);
        text('y=' + meanY.toFixed(1), innerRight + 2, meanYPos);
    }

    // Draw data points
    for (let i = 0; i < validX.length; i++) {
        let px = map(validX[i], xMin, xMax, innerLeft, innerRight);
        let py = map(validY[i], yMin, yMax, innerBottom, innerTop);

        // Color based on z-score quadrant if step >= 2
        if (currentStep >= 2 && zScoresX.length > i) {
            let zx = zScoresX[i];
            let zy = zScoresY[i];
            if ((zx >= 0 && zy >= 0) || (zx < 0 && zy < 0)) {
                fill(sylviaGreen); // Positive contribution
            } else {
                fill('#E57373'); // Negative contribution
            }
        } else {
            fill(100, 149, 237);
        }

        stroke(50);
        strokeWeight(1);
        circle(px, py, 14);

        // Point label
        fill('white');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(8);
        text(i + 1, px, py);
    }

    // Show correlation value
    if (currentStep >= 5 && validX.length >= 2) {
        let interpretation = getCorrelationInterpretation(correlation);

        fill(255, 255, 255, 230);
        stroke(sylviaGreen);
        strokeWeight(2);
        rect(plotLeft + plotWidth - 130, plotTop + 5, 125, 50, 8);

        fill(sylviaGreen);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(14);
        text('r = ' + correlation.toFixed(4), plotLeft + plotWidth - 67, plotTop + 12);

        textSize(10);
        fill(100);
        text(interpretation, plotLeft + plotWidth - 67, plotTop + 32);
    }
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function getCorrelationInterpretation(r) {
    let absR = Math.abs(r);
    let direction = r >= 0 ? 'Positive' : 'Negative';
    let strength;

    if (absR >= 0.8) strength = 'Strong';
    else if (absR >= 0.5) strength = 'Moderate';
    else if (absR >= 0.3) strength = 'Weak';
    else strength = 'Little/No';

    return strength + ' ' + direction;
}

function drawCalculationSteps() {
    let stepsY = plotTop + plotHeight + 15;
    let stepsHeight = drawHeight - stepsY - 10;

    // Steps background
    fill(255, 255, 255, 200);
    stroke(200);
    strokeWeight(1);
    rect(plotLeft, stepsY, plotWidth, stepsHeight, 5);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);

    let validN = zScoresX.length;
    let lineY = stepsY + 8;
    let lineHeight = 16;

    if (validN < 2) {
        fill(150);
        text('Need at least 2 data points to calculate correlation.', plotLeft + 10, lineY);
        return;
    }

    // Step 1: Means
    if (currentStep >= 1) {
        fill(currentStep === 1 ? sylviaGreen : 'black');
        textSize(11);
        text('Step 1: Calculate means: x = ' + meanX.toFixed(2) + ', y = ' + meanY.toFixed(2), plotLeft + 10, lineY);
        lineY += lineHeight;
    }

    // Step 2: Standard deviations and z-scores
    if (currentStep >= 2) {
        fill(currentStep === 2 ? sylviaGreen : 'black');
        text('Step 2: Calculate z-scores: Zx = (x - x) / Sx, Zy = (y - y) / Sy', plotLeft + 10, lineY);
        lineY += lineHeight;
        textSize(10);
        fill(100);
        text('   Sx = ' + stdX.toFixed(3) + ', Sy = ' + stdY.toFixed(3), plotLeft + 10, lineY);
        lineY += lineHeight;
    }

    // Step 3: Products of z-scores
    if (currentStep >= 3) {
        fill(currentStep === 3 ? sylviaGreen : 'black');
        textSize(11);
        text('Step 3: Multiply z-scores for each point: Zx * Zy', plotLeft + 10, lineY);
        lineY += lineHeight;
    }

    // Step 4: Sum of products
    if (currentStep >= 4) {
        let sumProd = zProducts.reduce((a, b) => a + b, 0);
        fill(currentStep === 4 ? sylviaGreen : 'black');
        text('Step 4: Sum of products = ' + sumProd.toFixed(4), plotLeft + 10, lineY);
        lineY += lineHeight;
    }

    // Step 5: Calculate r
    if (currentStep >= 5) {
        fill(sylviaGreen);
        textSize(12);
        text('Step 5: r = Sum / (n-1) = ' + correlation.toFixed(4), plotLeft + 10, lineY);
    }
}

function drawControls() {
    buttons = [];
    let btnY = drawHeight + 15;
    let btnHeight = 28;
    let btnSpacing = 8;
    let x = 15;

    // Calculate button
    drawButton(x, btnY, 80, btnHeight, 'Calculate', 'calculate');
    x += 80 + btnSpacing;

    // Next Step button
    drawButton(x, btnY, 80, btnHeight, 'Next Step', 'nextStep');
    x += 80 + btnSpacing;

    // Show All button
    drawButton(x, btnY, 70, btnHeight, 'Show All', 'showAll');
    x += 70 + btnSpacing;

    // Reset button
    drawButton(x, btnY, 60, btnHeight, 'Reset', 'reset');
    x += 60 + btnSpacing;

    // Clear All button
    drawButton(x, btnY, 70, btnHeight, 'Clear All', 'clearAll');
    x += 70 + btnSpacing * 3;

    // Speed slider
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Speed:', x, btnY + btnHeight / 2);
    x += 50;

    speedSlider.x = x;
    speedSlider.y = btnY + btnHeight / 2 - 8;
    speedSlider.width = 80;

    // Slider track
    fill(220);
    stroke(180);
    strokeWeight(1);
    rect(speedSlider.x, speedSlider.y, speedSlider.width, speedSlider.height, 8);

    // Slider fill
    let fillWidth = map(animationSpeed, 0.5, 3, 0, speedSlider.width);
    fill(100, 149, 237);
    noStroke();
    rect(speedSlider.x, speedSlider.y, fillWidth, speedSlider.height, 8);

    // Slider handle
    fill(255);
    stroke(100);
    strokeWeight(2);
    circle(speedSlider.x + fillWidth, speedSlider.y + speedSlider.height / 2, 14);

    // Row 2: Preset buttons
    let btnY2 = drawHeight + 55;
    x = 15;

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Sample Data:', x, btnY2 + btnHeight / 2);
    x += 90;

    for (let preset of Object.keys(presets)) {
        let isActive = currentPreset === preset;
        drawPresetButton(x, btnY2, preset.length * 7 + 20, btnHeight - 4, preset, isActive);
        x += preset.length * 7 + 28;
    }

    // Instructions
    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(11);
    text('Click cells to edit data. Click Calculate to see step-by-step correlation formula.', canvasWidth / 2, drawHeight + controlHeight - 5);
}

function drawButton(x, y, w, h, label, action) {
    let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

    fill(isHover ? sylviaGreen : 240);
    stroke(isHover ? sylviaGreenDark : 180);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    fill(isHover ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(label, x + w / 2, y + h / 2);

    buttons.push({ x, y, w, h, action });
}

function drawPresetButton(x, y, w, h, label, isActive) {
    let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

    if (isActive) {
        fill(sylviaGreen);
        stroke(sylviaGreenDark);
    } else {
        fill(isHover ? 230 : 250);
        stroke(180);
    }
    strokeWeight(1);
    rect(x, y, w, h, 4);

    fill(isActive ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(label, x + w / 2, y + h / 2);

    buttons.push({ x, y, w, h, action: 'preset', preset: label });
}

function mousePressed() {
    // Check speed slider
    if (mouseY >= speedSlider.y && mouseY <= speedSlider.y + speedSlider.height + 5 &&
        mouseX >= speedSlider.x && mouseX <= speedSlider.x + speedSlider.width) {
        updateSpeedSlider();
        return;
    }

    // Check buttons
    for (let btn of buttons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w && mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            handleButtonClick(btn);
            return;
        }
    }

    // Check data table cells
    let colWidths = [35, 60, 60];
    let xCol = tableLeft + colWidths[0];
    let yCol = tableLeft + colWidths[0] + colWidths[1];

    for (let r = 0; r < numRows; r++) {
        let rowY = tableTop + cellHeight * (r + 1);

        // X cell
        if (mouseX >= xCol && mouseX <= xCol + colWidths[1] &&
            mouseY >= rowY && mouseY <= rowY + cellHeight) {
            startEditing(r, 0);
            return;
        }

        // Y cell
        if (mouseX >= yCol && mouseX <= yCol + colWidths[2] &&
            mouseY >= rowY && mouseY <= rowY + cellHeight) {
            startEditing(r, 1);
            return;
        }
    }

    // Click elsewhere - stop editing
    if (editingCell) {
        finishEditing();
    }
}

function mouseDragged() {
    if (mouseY >= speedSlider.y - 5 && mouseY <= speedSlider.y + speedSlider.height + 10 &&
        mouseX >= speedSlider.x - 10 && mouseX <= speedSlider.x + speedSlider.width + 10) {
        updateSpeedSlider();
    }
}

function updateSpeedSlider() {
    let newSpeed = map(mouseX, speedSlider.x, speedSlider.x + speedSlider.width, 0.5, 3);
    animationSpeed = constrain(newSpeed, 0.5, 3);
}

function handleButtonClick(btn) {
    if (editingCell) {
        finishEditing();
    }

    switch (btn.action) {
        case 'calculate':
            currentStep = 0;
            calculateAll();
            break;
        case 'nextStep':
            if (currentStep < maxSteps) {
                currentStep++;
            }
            break;
        case 'showAll':
            currentStep = maxSteps;
            break;
        case 'reset':
            loadPreset(currentPreset);
            break;
        case 'clearAll':
            xData = Array(numRows).fill(null);
            yData = Array(numRows).fill(null);
            calculateAll();
            currentStep = 0;
            break;
        case 'preset':
            loadPreset(btn.preset);
            break;
    }
}

function startEditing(row, col) {
    if (editingCell) {
        finishEditing();
    }
    editingCell = { row, col };
    let currentValue = col === 0 ? xData[row] : yData[row];
    inputBuffer = currentValue !== null && !isNaN(currentValue) ? currentValue.toString() : '';
}

function finishEditing() {
    if (!editingCell) return;

    let value = parseFloat(inputBuffer);
    if (isNaN(value) || inputBuffer === '') {
        value = null;
    }

    if (editingCell.col === 0) {
        xData[editingCell.row] = value;
    } else {
        yData[editingCell.row] = value;
    }

    editingCell = null;
    inputBuffer = '';
    calculateAll();
}

function keyPressed() {
    if (!editingCell) return;

    if (keyCode === ENTER || keyCode === TAB) {
        finishEditing();
        // Move to next cell
        if (keyCode === TAB) {
            let nextRow = editingCell ? editingCell.row : 0;
            let nextCol = editingCell ? (editingCell.col + 1) % 2 : 0;
            if (nextCol === 0 && nextRow < numRows - 1) {
                nextRow++;
            }
            startEditing(nextRow, nextCol);
        }
        return false;
    }

    if (keyCode === ESCAPE) {
        editingCell = null;
        inputBuffer = '';
        return false;
    }

    if (keyCode === BACKSPACE) {
        inputBuffer = inputBuffer.slice(0, -1);
        return false;
    }

    return true;
}

function keyTyped() {
    if (!editingCell) return true;

    // Allow numbers, decimal point, and minus sign
    if ((key >= '0' && key <= '9') || key === '.' || key === '-') {
        // Prevent multiple decimals
        if (key === '.' && inputBuffer.includes('.')) return false;
        // Minus only at start
        if (key === '-' && inputBuffer.length > 0) return false;

        inputBuffer += key;
        return false;
    }

    return true;
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
