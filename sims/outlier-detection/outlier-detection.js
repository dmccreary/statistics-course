// Outlier Detection MicroSim
// Demonstrates the 1.5 × IQR rule for identifying outliers
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 300;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 200;
let defaultTextSize = 16;

// Data
let dataPoints = [];
let min, max, q1, median, q3, iqr;
let lowerFence, upperFence;

// UI elements
let multiplierSlider;
let showCalcCheckbox;
let modifiedCheckbox;
let showCalculations = true;
let showModified = true;
let multiplier = 1.5;

// Interaction
let selectedPoint = -1;
let isDragging = false;

// Sylvia theme
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    // Initial data with one potential outlier
    dataPoints = [15, 22, 25, 28, 30, 32, 35, 38, 42, 45, 48, 72];

    // Multiplier slider
    multiplierSlider = createSlider(1.0, 3.0, 1.5, 0.1);
    multiplierSlider.position(sliderLeftMargin, drawHeight + 10);
    multiplierSlider.size(canvasWidth - sliderLeftMargin - 200);

    // Show calculations checkbox
    showCalcCheckbox = createCheckbox(' Show Calculations', true);
    showCalcCheckbox.position(10, drawHeight + 10);
    showCalcCheckbox.changed(() => showCalculations = showCalcCheckbox.checked());

    // Modified boxplot checkbox
    modifiedCheckbox = createCheckbox(' Modified Boxplot', true);
    modifiedCheckbox.position(canvasWidth - 180, drawHeight + 10);
    modifiedCheckbox.changed(() => showModified = modifiedCheckbox.checked());

    describe('Interactive outlier detection using the 1.5 IQR rule with adjustable multiplier and modified boxplot view', LABEL);
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
    text('Outlier Detection (1.5 × IQR Rule)', canvasWidth / 2, 8);

    // Get multiplier value
    multiplier = multiplierSlider.value();

    // Calculate statistics
    calculateStatistics();

    // Draw visualization
    let lineY = 150;
    let lineStartX = margin + 40;
    let lineEndX = canvasWidth - margin - 40;

    drawNumberLine(lineY, lineStartX, lineEndX);
    drawFences(lineY, lineStartX, lineEndX);
    drawBoxplot(lineY, lineStartX, lineEndX);
    drawDataPoints(lineY, lineStartX, lineEndX);

    // Show calculations
    if (showCalculations) {
        drawCalculations();
    }

    // Draw outlier count
    drawOutlierCount();

    // Instructions
    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Drag points to move | Click to add | Double-click to remove', canvasWidth / 2, drawHeight - 5);

    // Control labels
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text('Multiplier: ' + multiplier.toFixed(1), sliderLeftMargin - 80, drawHeight + 25);
}

function calculateStatistics() {
    if (dataPoints.length < 4) return;

    let sorted = [...dataPoints].sort((a, b) => a - b);
    min = sorted[0];
    max = sorted[sorted.length - 1];

    let n = sorted.length;

    // Median
    if (n % 2 === 0) {
        median = (sorted[n/2 - 1] + sorted[n/2]) / 2;
    } else {
        median = sorted[Math.floor(n/2)];
    }

    // Q1
    let lowerHalf = sorted.slice(0, Math.floor(n/2));
    let lowerN = lowerHalf.length;
    if (lowerN % 2 === 0) {
        q1 = (lowerHalf[lowerN/2 - 1] + lowerHalf[lowerN/2]) / 2;
    } else {
        q1 = lowerHalf[Math.floor(lowerN/2)];
    }

    // Q3
    let upperStart = n % 2 === 0 ? n/2 : Math.floor(n/2) + 1;
    let upperHalf = sorted.slice(upperStart);
    let upperN = upperHalf.length;
    if (upperN % 2 === 0) {
        q3 = (upperHalf[upperN/2 - 1] + upperHalf[upperN/2]) / 2;
    } else {
        q3 = upperHalf[Math.floor(upperN/2)];
    }

    iqr = q3 - q1;
    lowerFence = q1 - multiplier * iqr;
    upperFence = q3 + multiplier * iqr;
}

function drawNumberLine(lineY, lineStartX, lineEndX) {
    stroke(100);
    strokeWeight(2);
    line(lineStartX, lineY, lineEndX, lineY);

    // Dynamic scale based on data
    let dataMin = Math.min(...dataPoints, lowerFence) - 5;
    let dataMax = Math.max(...dataPoints, upperFence) + 5;
    dataMin = Math.floor(dataMin / 10) * 10;
    dataMax = Math.ceil(dataMax / 10) * 10;

    textAlign(CENTER, TOP);
    textSize(10);
    for (let val = dataMin; val <= dataMax; val += 10) {
        let x = map(val, dataMin, dataMax, lineStartX, lineEndX);
        stroke(100);
        strokeWeight(1);
        line(x, lineY - 5, x, lineY + 5);
        noStroke();
        fill(100);
        text(val, x, lineY + 8);
    }
}

function drawFences(lineY, lineStartX, lineEndX) {
    let dataMin = Math.min(...dataPoints, lowerFence) - 5;
    let dataMax = Math.max(...dataPoints, upperFence) + 5;
    dataMin = Math.floor(dataMin / 10) * 10;
    dataMax = Math.ceil(dataMax / 10) * 10;

    // Lower fence
    let lowerFenceX = map(lowerFence, dataMin, dataMax, lineStartX, lineEndX);
    stroke(255, 100, 100);
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]);
    line(lowerFenceX, lineY - 60, lowerFenceX, lineY + 30);
    drawingContext.setLineDash([]);

    fill(255, 100, 100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Lower Fence', lowerFenceX, lineY - 62);
    text(lowerFence.toFixed(1), lowerFenceX, lineY - 72);

    // Upper fence
    let upperFenceX = map(upperFence, dataMin, dataMax, lineStartX, lineEndX);
    stroke(255, 100, 100);
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]);
    line(upperFenceX, lineY - 60, upperFenceX, lineY + 30);
    drawingContext.setLineDash([]);

    fill(255, 100, 100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    text('Upper Fence', upperFenceX, lineY - 62);
    text(upperFence.toFixed(1), upperFenceX, lineY - 72);
}

function drawBoxplot(lineY, lineStartX, lineEndX) {
    let dataMin = Math.min(...dataPoints, lowerFence) - 5;
    let dataMax = Math.max(...dataPoints, upperFence) + 5;
    dataMin = Math.floor(dataMin / 10) * 10;
    dataMax = Math.ceil(dataMax / 10) * 10;

    let boxY = lineY + 60;
    let boxHeight = 30;

    let q1X = map(q1, dataMin, dataMax, lineStartX, lineEndX);
    let q3X = map(q3, dataMin, dataMax, lineStartX, lineEndX);
    let medianX = map(median, dataMin, dataMax, lineStartX, lineEndX);

    // Box
    let boxColor = color(sylviaGreen);
    boxColor.setAlpha(180);
    fill(boxColor);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(q1X, boxY - boxHeight/2, q3X - q1X, boxHeight);

    // Median line
    stroke(sylviaAuburn);
    strokeWeight(3);
    line(medianX, boxY - boxHeight/2, medianX, boxY + boxHeight/2);

    // Whiskers
    if (showModified) {
        // Modified boxplot: whiskers go to most extreme non-outliers
        let sorted = [...dataPoints].sort((a, b) => a - b);
        let leftWhiskerVal = sorted.find(v => v >= lowerFence) || q1;
        let rightWhiskerVal = sorted.slice().reverse().find(v => v <= upperFence) || q3;

        let leftWhiskerX = map(leftWhiskerVal, dataMin, dataMax, lineStartX, lineEndX);
        let rightWhiskerX = map(rightWhiskerVal, dataMin, dataMax, lineStartX, lineEndX);

        stroke(50);
        strokeWeight(2);
        line(leftWhiskerX, boxY, q1X, boxY);
        line(leftWhiskerX, boxY - 10, leftWhiskerX, boxY + 10);
        line(q3X, boxY, rightWhiskerX, boxY);
        line(rightWhiskerX, boxY - 10, rightWhiskerX, boxY + 10);
    } else {
        // Standard boxplot: whiskers go to min and max
        let minX = map(min, dataMin, dataMax, lineStartX, lineEndX);
        let maxX = map(max, dataMin, dataMax, lineStartX, lineEndX);

        stroke(50);
        strokeWeight(2);
        line(minX, boxY, q1X, boxY);
        line(minX, boxY - 10, minX, boxY + 10);
        line(q3X, boxY, maxX, boxY);
        line(maxX, boxY - 10, maxX, boxY + 10);
    }

    // Labels
    fill(50);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(9);
    text('Q1: ' + q1.toFixed(1), q1X, boxY + boxHeight/2 + 5);
    text('Q3: ' + q3.toFixed(1), q3X, boxY + boxHeight/2 + 5);
}

function drawDataPoints(lineY, lineStartX, lineEndX) {
    let dataMin = Math.min(...dataPoints, lowerFence) - 5;
    let dataMax = Math.max(...dataPoints, upperFence) + 5;
    dataMin = Math.floor(dataMin / 10) * 10;
    dataMax = Math.ceil(dataMax / 10) * 10;

    for (let i = 0; i < dataPoints.length; i++) {
        let val = dataPoints[i];
        let x = map(val, dataMin, dataMax, lineStartX, lineEndX);
        let isOutlier = val < lowerFence || val > upperFence;

        if (i === selectedPoint && isDragging) {
            fill(isOutlier ? '#FF5252' : sylviaAuburn);
            stroke(50);
        } else if (isOutlier) {
            fill('#FF5252');
            stroke(100);
        } else {
            fill(sylviaGreen);
            stroke(50);
        }
        strokeWeight(1);
        circle(x, lineY - 30, 14);

        // Value label
        fill('white');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(8);
        text(Math.round(val), x, lineY - 30);
    }
}

function drawCalculations() {
    let boxX = 10;
    let boxY = 35;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(boxX, boxY, 160, 85, 5);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(10);

    text('IQR = Q3 - Q1', boxX + 10, boxY + 8);
    text('    = ' + q3.toFixed(1) + ' - ' + q1.toFixed(1) + ' = ' + iqr.toFixed(1), boxX + 10, boxY + 22);
    text('Lower Fence = Q1 - ' + multiplier.toFixed(1) + '×IQR', boxX + 10, boxY + 40);
    text('    = ' + q1.toFixed(1) + ' - ' + (multiplier * iqr).toFixed(1) + ' = ' + lowerFence.toFixed(1), boxX + 10, boxY + 54);
    text('Upper Fence = Q3 + ' + multiplier.toFixed(1) + '×IQR', boxX + 10, boxY + 68);
    text('    = ' + q3.toFixed(1) + ' + ' + (multiplier * iqr).toFixed(1) + ' = ' + upperFence.toFixed(1), boxX + 10, boxY + 82);
}

function drawOutlierCount() {
    let outliers = dataPoints.filter(v => v < lowerFence || v > upperFence);

    fill(outliers.length > 0 ? '#FF5252' : sylviaGreen);
    noStroke();
    textAlign(RIGHT, TOP);
    textSize(14);
    text('Outliers detected: ' + outliers.length, canvasWidth - 20, 35);
}

function mousePressed() {
    let lineY = 150;
    let lineStartX = margin + 40;
    let lineEndX = canvasWidth - margin - 40;
    let dataMin = Math.min(...dataPoints, lowerFence) - 5;
    let dataMax = Math.max(...dataPoints, upperFence) + 5;
    dataMin = Math.floor(dataMin / 10) * 10;
    dataMax = Math.ceil(dataMax / 10) * 10;

    // Check data points
    for (let i = 0; i < dataPoints.length; i++) {
        let x = map(dataPoints[i], dataMin, dataMax, lineStartX, lineEndX);
        if (dist(mouseX, mouseY, x, lineY - 30) < 10) {
            selectedPoint = i;
            isDragging = true;
            return;
        }
    }

    // Add point
    if (mouseY > lineY - 50 && mouseY < lineY + 10) {
        let newVal = map(mouseX, lineStartX, lineEndX, dataMin, dataMax);
        if (newVal >= 0 && newVal <= 100) {
            dataPoints.push(newVal);
        }
    }
}

function mouseDragged() {
    if (isDragging && selectedPoint >= 0) {
        let lineStartX = margin + 40;
        let lineEndX = canvasWidth - margin - 40;
        let dataMin = Math.min(...dataPoints, lowerFence || 0) - 5;
        let dataMax = Math.max(...dataPoints, upperFence || 100) + 5;
        dataMin = Math.floor(dataMin / 10) * 10;
        dataMax = Math.ceil(dataMax / 10) * 10;

        let newVal = map(mouseX, lineStartX, lineEndX, dataMin, dataMax);
        dataPoints[selectedPoint] = constrain(newVal, 0, 100);
    }
}

function mouseReleased() {
    isDragging = false;
    selectedPoint = -1;
}

function doubleClicked() {
    let lineY = 150;
    let lineStartX = margin + 40;
    let lineEndX = canvasWidth - margin - 40;
    let dataMin = Math.min(...dataPoints, lowerFence) - 5;
    let dataMax = Math.max(...dataPoints, upperFence) + 5;
    dataMin = Math.floor(dataMin / 10) * 10;
    dataMax = Math.ceil(dataMax / 10) * 10;

    for (let i = 0; i < dataPoints.length; i++) {
        let x = map(dataPoints[i], dataMin, dataMax, lineStartX, lineEndX);
        if (dist(mouseX, mouseY, x, lineY - 30) < 10 && dataPoints.length > 4) {
            dataPoints.splice(i, 1);
            return;
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    if (multiplierSlider) {
        multiplierSlider.size(canvasWidth - sliderLeftMargin - 200);
    }
    if (modifiedCheckbox) {
        modifiedCheckbox.position(canvasWidth - 180, drawHeight + 10);
    }
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
