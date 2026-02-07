// Chi-Square Calculation Step-by-Step MicroSim
// Shows how to calculate the chi-square statistic step by step
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

let margin = 15;
let defaultTextSize = 16;

// Default candy example data
let categories = ['Red', 'Orange', 'Yellow', 'Green', 'Blue'];
let observed = [24, 20, 18, 22, 16];
let expectedProportions = [0.20, 0.25, 0.20, 0.15, 0.20];
let expected = [];

// Calculation stages
let currentStage = 0; // 0-5 for animation stages
let animationProgress = 0;
let animationSpeed = 0.05;
let isAnimating = false;
let autoStep = false;

// Category colors
let categoryColors = ['#E53935', '#FB8C00', '#FFEB3B', '#4CAF50', '#2196F3'];

// Sylvia theme
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';

// Editing state
let editingCell = -1;
let inputBuffer = '';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);
    calculateExpected();

    describe('Step-by-step chi-square calculation visualization with interactive data entry', LABEL);
}

function calculateExpected() {
    let total = observed.reduce((a, b) => a + b, 0);
    expected = expectedProportions.map(p => total * p);
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
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    text('Chi-Square Calculation: Step by Step', canvasWidth / 2, 8);

    // Draw bar chart
    drawBarChart();

    // Draw calculation table
    drawCalculationTable();

    // Draw chi-square total
    drawChiSquareTotal();

    // Draw controls
    drawControls();

    // Handle animation
    if (isAnimating) {
        animationProgress += animationSpeed;
        if (animationProgress >= 1) {
            animationProgress = 0;
            if (autoStep && currentStage < 5) {
                currentStage++;
            } else {
                isAnimating = false;
            }
        }
    }
}

function drawBarChart() {
    let chartLeft = margin + 10;
    let chartRight = canvasWidth / 2 - 20;
    let chartTop = 40;
    let chartBottom = 170;
    let chartWidth = chartRight - chartLeft;

    // Chart title
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text('Observed (solid) vs Expected (striped)', (chartLeft + chartRight) / 2, chartTop - 15);

    let numBars = categories.length;
    let barWidth = (chartWidth - (numBars + 1) * 8) / numBars / 2;
    let maxVal = Math.max(...observed, ...expected) * 1.2;

    // Draw bars
    for (let i = 0; i < numBars; i++) {
        let x = chartLeft + 8 + i * (barWidth * 2 + 16);

        // Observed bar (solid)
        let obsHeight = map(observed[i], 0, maxVal, 0, chartBottom - chartTop - 20);
        fill(categoryColors[i]);
        noStroke();
        rect(x, chartBottom - obsHeight, barWidth, obsHeight);

        // Expected bar (striped pattern simulation)
        let expHeight = map(expected[i], 0, maxVal, 0, chartBottom - chartTop - 20);
        fill(255, 255, 255, 180);
        stroke(categoryColors[i]);
        strokeWeight(2);
        rect(x + barWidth + 2, chartBottom - expHeight, barWidth, expHeight);

        // Draw stripes
        for (let sy = chartBottom - expHeight + 4; sy < chartBottom - 4; sy += 8) {
            stroke(categoryColors[i]);
            strokeWeight(1);
            line(x + barWidth + 4, sy, x + barWidth * 2, sy);
        }

        // Category label
        fill(80);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(9);
        text(categories[i], x + barWidth, chartBottom + 4);
    }

    // Axis
    stroke(100);
    strokeWeight(1);
    line(chartLeft, chartBottom, chartRight, chartBottom);
}

function drawCalculationTable() {
    let tableLeft = margin + 10;
    let tableTop = 185;
    let colWidth = (canvasWidth - margin * 2 - 20) / 7;
    let rowHeight = 28;

    // Headers
    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);

    let headers = ['Category', 'Observed (O)', 'Expected (E)', 'O - E', '(O - E)^2', '(O-E)^2/E', 'Contribution'];
    for (let i = 0; i < headers.length; i++) {
        fill(i === 0 ? sylviaGreen : (currentStage >= getColumnStage(i) ? sylviaGreen : '#aaa'));
        let x = tableLeft + i * colWidth + colWidth / 2;
        text(headers[i], x, tableTop + 12);
    }

    // Draw header underline
    stroke(sylviaGreen);
    strokeWeight(1);
    line(tableLeft, tableTop + 25, tableLeft + colWidth * 7, tableTop + 25);

    // Data rows
    for (let r = 0; r < categories.length; r++) {
        let y = tableTop + 26 + r * rowHeight;
        let diff = observed[r] - expected[r];
        let diffSq = diff * diff;
        let contribution = diffSq / expected[r];

        // Highlight largest contributor
        let maxContrib = Math.max(...categories.map((_, i) =>
            Math.pow(observed[i] - expected[i], 2) / expected[i]));
        let isMax = contribution === maxContrib && currentStage >= 5;

        // Row background
        if (isMax) {
            fill(255, 243, 224);
            noStroke();
            rect(tableLeft, y - 2, colWidth * 7, rowHeight - 2);
        }

        textSize(11);

        // Category name
        fill(categoryColors[r]);
        textAlign(CENTER, CENTER);
        text(categories[r], tableLeft + colWidth / 2, y + 10);

        // Observed (editable)
        if (editingCell === r) {
            fill(255, 255, 200);
            stroke(sylviaAuburn);
            strokeWeight(2);
            rect(tableLeft + colWidth + 5, y - 2, colWidth - 10, rowHeight - 4, 3);
            fill('black');
            noStroke();
            text(inputBuffer + '_', tableLeft + colWidth + colWidth / 2, y + 10);
        } else {
            fill(80);
            noStroke();
            text(observed[r], tableLeft + colWidth + colWidth / 2, y + 10);
        }

        // Expected
        fill(currentStage >= 1 ? 80 : '#ccc');
        text(expected[r].toFixed(1), tableLeft + colWidth * 2 + colWidth / 2, y + 10);

        // O - E
        if (currentStage >= 2) {
            fill(diff > 0 ? sylviaGreen : (diff < 0 ? '#C62828' : 80));
            text((diff > 0 ? '+' : '') + diff.toFixed(1), tableLeft + colWidth * 3 + colWidth / 2, y + 10);
        }

        // (O - E)^2
        if (currentStage >= 3) {
            fill(80);
            text(diffSq.toFixed(1), tableLeft + colWidth * 4 + colWidth / 2, y + 10);
        }

        // (O - E)^2 / E
        if (currentStage >= 4) {
            fill(80);
            text(contribution.toFixed(3), tableLeft + colWidth * 5 + colWidth / 2, y + 10);
        }

        // Contribution indicator
        if (currentStage >= 5) {
            let barWidth = map(contribution, 0, maxContrib, 0, colWidth - 15);
            fill(isMax ? sylviaAuburn : categoryColors[r]);
            noStroke();
            rect(tableLeft + colWidth * 6 + 5, y + 2, barWidth, rowHeight - 8, 2);
        }
    }
}

function getColumnStage(colIndex) {
    const stageMap = [0, 0, 1, 2, 3, 4, 5];
    return stageMap[colIndex];
}

function drawChiSquareTotal() {
    let y = 345;

    // Calculate totals
    let chiSquare = 0;
    for (let i = 0; i < categories.length; i++) {
        let diff = observed[i] - expected[i];
        chiSquare += (diff * diff) / expected[i];
    }

    // Box for final answer
    if (currentStage >= 5) {
        fill(255, 248, 225);
        stroke(sylviaAuburn);
        strokeWeight(2);
        rect(canvasWidth / 2 - 150, y - 5, 300, 55, 8);

        fill(sylviaAuburn);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(14);
        text('Chi-Square Statistic', canvasWidth / 2, y + 2);

        textSize(22);
        text('\u03C7\u00B2 = ' + chiSquare.toFixed(3), canvasWidth / 2, y + 22);
    } else {
        fill(200);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        text('Complete all steps to see the chi-square statistic', canvasWidth / 2, y + 20);
    }

    // Stage indicator
    fill(80);
    textAlign(LEFT, TOP);
    textSize(10);
    let stageLabels = [
        'Stage 1: Enter observed counts',
        'Stage 2: Calculate expected counts (n x proportion)',
        'Stage 3: Find differences (O - E)',
        'Stage 4: Square the differences (O - E)^2',
        'Stage 5: Divide by expected (O - E)^2 / E',
        'Stage 6: Sum all contributions = chi-square!'
    ];
    text(stageLabels[Math.min(currentStage, 5)], margin + 10, y + 50);
}

function drawControls() {
    let y = drawHeight + 8;

    // Step buttons
    textSize(10);
    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    text('Calculate:', 10, y + 12);

    // Previous step
    fill(currentStage > 0 ? sylviaGreen : '#ccc');
    rect(80, y + 2, 50, 22, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    text('\u25C0 Back', 105, y + 13);

    // Next step
    fill(currentStage < 5 ? sylviaGreen : '#ccc');
    rect(140, y + 2, 50, 22, 4);
    fill('white');
    text('Next \u25B6', 165, y + 13);

    // Auto step
    fill(autoStep ? sylviaAuburn : '#888');
    rect(200, y + 2, 60, 22, 4);
    fill('white');
    text(autoStep ? 'Auto: ON' : 'Auto: OFF', 230, y + 13);

    // Reset
    fill(100);
    rect(270, y + 2, 50, 22, 4);
    fill('white');
    text('Reset', 295, y + 13);

    // Example presets
    textSize(9);
    fill(80);
    textAlign(LEFT, CENTER);
    text('Presets:', 340, y + 12);

    // Candy example
    fill('#F48FB1');
    rect(390, y + 2, 60, 22, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    text('Candy', 420, y + 13);

    // Dice example
    fill('#90CAF9');
    rect(460, y + 2, 60, 22, 4);
    fill('white');
    text('Dice', 490, y + 13);

    // Second row - instructions
    let y2 = y + 32;
    fill(100);
    textAlign(LEFT, CENTER);
    textSize(9);
    text('Click observed values to edit. Color bars show each category\'s contribution to the total chi-square.', 10, y2 + 10);

    // Speed slider
    textAlign(LEFT, CENTER);
    text('Speed:', canvasWidth - 150, y2 + 10);
    fill(220);
    rect(canvasWidth - 100, y2 + 4, 80, 12, 3);
    let speedPos = map(animationSpeed, 0.02, 0.15, canvasWidth - 100, canvasWidth - 20);
    fill(sylviaGreen);
    ellipse(speedPos, y2 + 10, 12, 12);
}

function mousePressed() {
    let y = drawHeight + 8;

    // Check control buttons
    // Previous step
    if (mouseX >= 80 && mouseX <= 130 && mouseY >= y + 2 && mouseY <= y + 24) {
        if (currentStage > 0) currentStage--;
        return;
    }

    // Next step
    if (mouseX >= 140 && mouseX <= 190 && mouseY >= y + 2 && mouseY <= y + 24) {
        if (currentStage < 5) currentStage++;
        return;
    }

    // Auto toggle
    if (mouseX >= 200 && mouseX <= 260 && mouseY >= y + 2 && mouseY <= y + 24) {
        autoStep = !autoStep;
        if (autoStep) isAnimating = true;
        return;
    }

    // Reset
    if (mouseX >= 270 && mouseX <= 320 && mouseY >= y + 2 && mouseY <= y + 24) {
        currentStage = 0;
        autoStep = false;
        isAnimating = false;
        return;
    }

    // Candy preset
    if (mouseX >= 390 && mouseX <= 450 && mouseY >= y + 2 && mouseY <= y + 24) {
        categories = ['Red', 'Orange', 'Yellow', 'Green', 'Blue'];
        observed = [24, 20, 18, 22, 16];
        expectedProportions = [0.20, 0.25, 0.20, 0.15, 0.20];
        categoryColors = ['#E53935', '#FB8C00', '#FFEB3B', '#4CAF50', '#2196F3'];
        calculateExpected();
        currentStage = 0;
        return;
    }

    // Dice preset
    if (mouseX >= 460 && mouseX <= 520 && mouseY >= y + 2 && mouseY <= y + 24) {
        categories = ['1', '2', '3', '4', '5', '6'];
        observed = [8, 12, 15, 11, 18, 16];
        expectedProportions = [1/6, 1/6, 1/6, 1/6, 1/6, 1/6];
        categoryColors = ['#5C6BC0', '#42A5F5', '#26C6DA', '#66BB6A', '#FFCA28', '#FF7043'];
        calculateExpected();
        currentStage = 0;
        return;
    }

    // Speed slider
    let y2 = y + 32;
    if (mouseY >= y2 && mouseY <= y2 + 20 && mouseX >= canvasWidth - 110 && mouseX <= canvasWidth - 10) {
        animationSpeed = map(mouseX, canvasWidth - 100, canvasWidth - 20, 0.02, 0.15);
        animationSpeed = constrain(animationSpeed, 0.02, 0.15);
        return;
    }

    // Check for clicking on observed values to edit
    let tableLeft = margin + 10;
    let tableTop = 185;
    let colWidth = (canvasWidth - margin * 2 - 20) / 7;
    let rowHeight = 28;

    for (let r = 0; r < categories.length; r++) {
        let cellX = tableLeft + colWidth;
        let cellY = tableTop + 26 + r * rowHeight;
        if (mouseX >= cellX && mouseX <= cellX + colWidth && mouseY >= cellY - 2 && mouseY <= cellY + rowHeight - 2) {
            editingCell = r;
            inputBuffer = observed[r].toString();
            return;
        }
    }

    // Click elsewhere to finish editing
    if (editingCell >= 0) {
        let val = parseInt(inputBuffer);
        if (!isNaN(val) && val >= 0) {
            observed[editingCell] = val;
            calculateExpected();
        }
        editingCell = -1;
        inputBuffer = '';
    }
}

function keyPressed() {
    if (editingCell >= 0) {
        if (keyCode === ENTER || keyCode === RETURN) {
            let val = parseInt(inputBuffer);
            if (!isNaN(val) && val >= 0) {
                observed[editingCell] = val;
                calculateExpected();
            }
            editingCell = -1;
            inputBuffer = '';
        } else if (keyCode === BACKSPACE) {
            inputBuffer = inputBuffer.slice(0, -1);
        } else if (key >= '0' && key <= '9' && inputBuffer.length < 4) {
            inputBuffer += key;
        } else if (keyCode === ESCAPE) {
            editingCell = -1;
            inputBuffer = '';
        }
        return false;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
