// Standard Deviation Calculator MicroSim
// Step-by-step variance and standard deviation calculation
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Data
let dataPoints = [6, 8, 10, 12, 14];
let dataInput = '';
let mean, variance, stdDev;
let deviations = [];
let squaredDeviations = [];

// UI elements
let stepButton;
let showAllButton;
let resetButton;
let samplePopToggle;
let presetSelect;
let useSample = true;
let currentStep = 0;
let maxSteps = 6;

// Sylvia theme
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    calculateStats();

    // Step button
    stepButton = createButton('Next Step');
    stepButton.position(10, drawHeight + 10);
    stepButton.mousePressed(nextStep);

    // Show all button
    showAllButton = createButton('Show All');
    showAllButton.position(100, drawHeight + 10);
    showAllButton.mousePressed(showAll);

    // Reset button
    resetButton = createButton('Reset');
    resetButton.position(180, drawHeight + 10);
    resetButton.mousePressed(resetCalc);

    // Sample/Population toggle
    samplePopToggle = createButton('Using: Sample (n-1)');
    samplePopToggle.position(250, drawHeight + 10);
    samplePopToggle.mousePressed(toggleSamplePop);

    // Preset select
    presetSelect = createSelect();
    presetSelect.position(canvasWidth - 180, drawHeight + 10);
    presetSelect.option('Quiz Scores', 'quiz');
    presetSelect.option('Heights (in)', 'heights');
    presetSelect.option('Temperatures', 'temps');
    presetSelect.selected('quiz');
    presetSelect.changed(loadPreset);

    describe('Step-by-step calculator showing how variance and standard deviation are calculated', LABEL);
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
    textSize(20);
    text('Calculating Variance & Standard Deviation', canvasWidth / 2, 8);

    // Draw dot plot
    drawDotPlot();

    // Draw calculation steps
    drawCalculationSteps();

    // Draw final result
    if (currentStep >= maxSteps) {
        drawFinalResult();
    }
}

function calculateStats() {
    let n = dataPoints.length;
    mean = dataPoints.reduce((a, b) => a + b, 0) / n;

    deviations = dataPoints.map(x => x - mean);
    squaredDeviations = deviations.map(d => d * d);

    let sumSquared = squaredDeviations.reduce((a, b) => a + b, 0);
    let divisor = useSample ? (n - 1) : n;
    variance = sumSquared / divisor;
    stdDev = Math.sqrt(variance);
}

function drawDotPlot() {
    let plotY = 90;
    let plotLeft = margin + 80;
    let plotRight = canvasWidth / 2 - 20;

    // Number line
    let minVal = Math.min(...dataPoints) - 2;
    let maxVal = Math.max(...dataPoints) + 2;

    stroke(100);
    strokeWeight(2);
    line(plotLeft, plotY, plotRight, plotY);

    // Ticks and labels
    textAlign(CENTER, TOP);
    textSize(10);
    for (let val = Math.ceil(minVal); val <= Math.floor(maxVal); val++) {
        let x = map(val, minVal, maxVal, plotLeft, plotRight);
        stroke(100);
        strokeWeight(1);
        line(x, plotY - 4, x, plotY + 4);
        noStroke();
        fill(100);
        text(val, x, plotY + 8);
    }

    // Mean marker
    if (currentStep >= 1) {
        let meanX = map(mean, minVal, maxVal, plotLeft, plotRight);
        stroke(sylviaAuburn);
        strokeWeight(2);
        line(meanX, plotY - 30, meanX, plotY + 20);
        fill(sylviaAuburn);
        noStroke();
        textAlign(CENTER, BOTTOM);
        textSize(12);
        text('Mean = ' + mean.toFixed(2), meanX, plotY - 32);
    }

    // Data points with deviation lines
    for (let i = 0; i < dataPoints.length; i++) {
        let x = map(dataPoints[i], minVal, maxVal, plotLeft, plotRight);
        let y = plotY - 20;

        // Deviation line
        if (currentStep >= 2) {
            let meanX = map(mean, minVal, maxVal, plotLeft, plotRight);
            stroke(deviations[i] >= 0 ? sylviaGreen : '#E57373');
            strokeWeight(2);
            line(x, y, meanX, y);
        }

        // Point
        fill(sylviaGreen);
        stroke(50);
        strokeWeight(1);
        circle(x, y, 16);

        fill('white');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(9);
        text(dataPoints[i], x, y);
    }

    // Label
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Data (n=' + dataPoints.length + ')', margin, plotY);
}

function drawCalculationSteps() {
    let tableX = canvasWidth / 2 + 10;
    let tableY = 40;
    let rowHeight = 25;
    let colWidths = [50, 80, 100];

    // Table header
    fill(sylviaGreen);
    noStroke();
    rect(tableX, tableY, 230, rowHeight);

    fill('white');
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Value', tableX + colWidths[0]/2, tableY + rowHeight/2);
    text('Deviation', tableX + colWidths[0] + colWidths[1]/2, tableY + rowHeight/2);
    text('Squared Dev', tableX + colWidths[0] + colWidths[1] + colWidths[2]/2, tableY + rowHeight/2);

    // Table rows
    for (let i = 0; i < dataPoints.length; i++) {
        let rowY = tableY + rowHeight * (i + 1);

        // Background
        fill(i % 2 === 0 ? 255 : 245);
        stroke(200);
        strokeWeight(1);
        rect(tableX, rowY, 230, rowHeight);

        fill('black');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(11);

        // Value column
        text(dataPoints[i], tableX + colWidths[0]/2, rowY + rowHeight/2);

        // Deviation column
        if (currentStep >= 2) {
            let dev = deviations[i];
            fill(dev >= 0 ? sylviaGreen : '#E57373');
            text(dev.toFixed(2), tableX + colWidths[0] + colWidths[1]/2, rowY + rowHeight/2);
        }

        // Squared deviation column
        if (currentStep >= 3) {
            fill('black');
            text(squaredDeviations[i].toFixed(2), tableX + colWidths[0] + colWidths[1] + colWidths[2]/2, rowY + rowHeight/2);
        }
    }

    // Calculation steps below table
    let calcY = tableY + rowHeight * (dataPoints.length + 2);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);

    // Step 1: Mean
    if (currentStep >= 1) {
        let sumText = dataPoints.join(' + ');
        let sum = dataPoints.reduce((a, b) => a + b, 0);
        text('Step 1: Calculate Mean', tableX, calcY);
        textSize(12);
        text('x̄ = (' + sumText + ') / ' + dataPoints.length, tableX + 10, calcY + 20);
        text('  = ' + sum + ' / ' + dataPoints.length + ' = ' + mean.toFixed(2), tableX + 10, calcY + 38);
        calcY += 65;
        textSize(14);
    }

    // Step 2: Deviations note
    if (currentStep >= 2) {
        text('Step 2: Calculate Deviations (xᵢ - x̄)', tableX, calcY);
        textSize(12);
        let devSum = deviations.reduce((a, b) => a + b, 0);
        text('Sum of deviations = ' + devSum.toFixed(4) + ' ≈ 0 (always!)', tableX + 10, calcY + 20);
        calcY += 45;
        textSize(14);
    }

    // Step 3: Square deviations
    if (currentStep >= 3) {
        text('Step 3: Square Each Deviation', tableX, calcY);
        calcY += 25;
    }

    // Step 4: Sum squared deviations
    if (currentStep >= 4) {
        let sumSq = squaredDeviations.reduce((a, b) => a + b, 0);
        text('Step 4: Sum of Squared Deviations', tableX, calcY);
        textSize(12);
        text('Σ(xᵢ - x̄)² = ' + sumSq.toFixed(2), tableX + 10, calcY + 20);
        calcY += 45;
        textSize(14);
    }

    // Step 5: Variance
    if (currentStep >= 5) {
        let sumSq = squaredDeviations.reduce((a, b) => a + b, 0);
        let n = dataPoints.length;
        let divisor = useSample ? (n - 1) : n;
        text('Step 5: Calculate Variance', tableX, calcY);
        textSize(12);
        text('s² = ' + sumSq.toFixed(2) + ' / ' + divisor + ' = ' + variance.toFixed(4), tableX + 10, calcY + 20);
        calcY += 45;
        textSize(14);
    }

    // Step 6: Standard Deviation
    if (currentStep >= 6) {
        text('Step 6: Take Square Root', tableX, calcY);
        textSize(12);
        text('s = √' + variance.toFixed(4) + ' = ' + stdDev.toFixed(4), tableX + 10, calcY + 20);
    }
}

function drawFinalResult() {
    let boxX = margin;
    let boxY = 140;
    let boxW = canvasWidth / 2 - 40;
    let boxH = 100;

    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(boxX, boxY, boxW, boxH, 10);

    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Final Results', boxX + boxW/2, boxY + 20);

    textSize(14);
    let n = dataPoints.length;
    let divisor = useSample ? (n - 1) : n;

    text('Variance (s²) = ' + variance.toFixed(4), boxX + boxW/2, boxY + 50);
    text('Standard Deviation (s) = ' + stdDev.toFixed(4), boxX + boxW/2, boxY + 75);

    textSize(11);
    fill(100);
    text('Using ' + (useSample ? 'sample (n-1=' + (n-1) + ')' : 'population (n=' + n + ')'), boxX + boxW/2, boxY + 95);
}

function nextStep() {
    if (currentStep < maxSteps) {
        currentStep++;
    }
}

function showAll() {
    currentStep = maxSteps;
}

function resetCalc() {
    currentStep = 0;
}

function toggleSamplePop() {
    useSample = !useSample;
    samplePopToggle.html('Using: ' + (useSample ? 'Sample (n-1)' : 'Population (n)'));
    calculateStats();
}

function loadPreset() {
    let preset = presetSelect.value();
    if (preset === 'quiz') {
        dataPoints = [6, 8, 10, 12, 14];
    } else if (preset === 'heights') {
        dataPoints = [62, 64, 66, 68, 70, 72];
    } else if (preset === 'temps') {
        dataPoints = [68, 72, 75, 71, 69];
    }
    calculateStats();
    currentStep = 0;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    if (presetSelect) {
        presetSelect.position(canvasWidth - 180, drawHeight + 10);
    }
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
