// Mean as Balance Point MicroSim
// Demonstrates that the mean represents the balance point of a distribution
// Students can manipulate data points and observe how the mean shifts
// MicroSim template version 2026.02

// Global variables for canvas dimensions
let containerWidth;
let canvasWidth = 700;
let drawHeight = 250;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Data points array - each point has x position (value) and can be dragged
let dataPoints = [];
let selectedPoint = -1;
let isDragging = false;

// Number line parameters
let numberLineY = 180;
let numberLineMin = 0;
let numberLineMax = 100;
let pointRadius = 15;

// Fulcrum and beam
let fulcrumX;
let beamTilt = 0;
let targetTilt = 0;

// UI elements
let resetButton;
let showCalcCheckbox;
let showCalculation = false;

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);

    // Initialize with 5 roughly symmetric points
    resetData();

    // Create Reset button
    resetButton = createButton('Reset');
    resetButton.position(10, drawHeight + 10);
    resetButton.mousePressed(resetData);

    // Create Show Calculation checkbox
    showCalcCheckbox = createCheckbox(' Show Calculation', false);
    showCalcCheckbox.position(80, drawHeight + 10);
    showCalcCheckbox.changed(() => showCalculation = showCalcCheckbox.checked());

    describe('Interactive visualization showing the mean as the balance point of data. Drag points to see how the mean shifts. Click to add points, double-click to remove.', LABEL);
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
    textSize(24);
    text('Mean as Balance Point', canvasWidth / 2, 10);

    // Draw number line
    drawNumberLine();

    // Calculate and display mean
    let mean = calculateMean();
    fulcrumX = valueToX(mean);

    // Calculate beam tilt based on imbalance
    targetTilt = calculateTilt(mean);
    beamTilt = lerp(beamTilt, targetTilt, 0.1);

    // Draw beam (seesaw)
    drawBeam(mean);

    // Draw fulcrum
    drawFulcrum();

    // Draw data points
    drawDataPoints();

    // Draw mean indicator and value
    drawMeanIndicator(mean);

    // Show calculation if enabled
    if (showCalculation) {
        drawCalculation(mean);
    }

    // Draw instructions
    drawInstructions();

    // Control area labels
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text('n = ' + dataPoints.length, canvasWidth - 80, drawHeight + 25);
}

function drawNumberLine() {
    stroke(100);
    strokeWeight(2);
    let lineStartX = margin + 30;
    let lineEndX = canvasWidth - margin - 30;
    line(lineStartX, numberLineY, lineEndX, numberLineY);

    // Draw tick marks and labels
    textAlign(CENTER, TOP);
    textSize(12);
    fill(100);
    noStroke();
    for (let val = 0; val <= 100; val += 10) {
        let x = valueToX(val);
        stroke(100);
        strokeWeight(1);
        line(x, numberLineY - 5, x, numberLineY + 5);
        noStroke();
        text(val, x, numberLineY + 8);
    }
}

function drawBeam(mean) {
    push();
    translate(fulcrumX, numberLineY - 30);
    rotate(beamTilt);

    // Beam
    stroke(sylviaAuburn);
    strokeWeight(4);
    let beamHalfWidth = 150;
    line(-beamHalfWidth, 0, beamHalfWidth, 0);

    pop();
}

function drawFulcrum() {
    // Triangle fulcrum
    fill(sylviaGreen);
    noStroke();
    triangle(
        fulcrumX - 15, numberLineY - 10,
        fulcrumX + 15, numberLineY - 10,
        fulcrumX, numberLineY - 35
    );
}

function drawDataPoints() {
    for (let i = 0; i < dataPoints.length; i++) {
        let x = valueToX(dataPoints[i]);
        let y = numberLineY - 55;

        // Highlight if being dragged
        if (i === selectedPoint && isDragging) {
            fill(sylviaAuburn);
            stroke(100);
            strokeWeight(2);
        } else {
            fill(sylviaGreen);
            stroke(50);
            strokeWeight(1);
        }

        circle(x, y, pointRadius * 2);

        // Show value inside point
        fill('white');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        text(Math.round(dataPoints[i]), x, y);
    }
}

function drawMeanIndicator(mean) {
    // Mean value display
    fill(sylviaAuburn);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(18);
    text('Mean = ' + mean.toFixed(1), fulcrumX, numberLineY - 40);

    // Balance status
    let balanced = abs(beamTilt) < 0.01;
    textSize(14);
    if (balanced) {
        fill(sylviaGreen);
        text('Balanced!', fulcrumX, numberLineY + 35);
    } else {
        fill(sylviaAuburn);
        let side = beamTilt > 0 ? 'right' : 'left';
        text('Tilting ' + side, fulcrumX, numberLineY + 35);
    }
}

function drawCalculation(mean) {
    // Draw calculation box
    let boxX = canvasWidth - 200;
    let boxY = 45;
    let boxW = 180;
    let boxH = 80;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(boxX, boxY, boxW, boxH, 10);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);

    let sum = dataPoints.reduce((a, b) => a + b, 0);
    let n = dataPoints.length;

    text('Sum = ' + sum.toFixed(0), boxX + 10, boxY + 10);
    text('n = ' + n, boxX + 10, boxY + 30);
    text('Mean = ' + sum.toFixed(0) + ' / ' + n, boxX + 10, boxY + 50);
    text('     = ' + mean.toFixed(2), boxX + 10, boxY + 70);
}

function drawInstructions() {
    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(11);
    text('Drag points to move | Click number line to add | Double-click point to remove', canvasWidth / 2, drawHeight - 5);
}

function calculateMean() {
    if (dataPoints.length === 0) return 50;
    let sum = dataPoints.reduce((a, b) => a + b, 0);
    return sum / dataPoints.length;
}

function calculateTilt(mean) {
    // Calculate "torque" on each side
    let leftTorque = 0;
    let rightTorque = 0;

    for (let val of dataPoints) {
        let distance = val - mean;
        if (distance < 0) {
            leftTorque += abs(distance);
        } else {
            rightTorque += distance;
        }
    }

    // The beam should be balanced when at the mean (torques equal)
    // For visual effect, we exaggerate small imbalances
    let imbalance = (rightTorque - leftTorque) / max(dataPoints.length, 1);
    return constrain(imbalance * 0.01, -0.3, 0.3);
}

function valueToX(val) {
    let lineStartX = margin + 30;
    let lineEndX = canvasWidth - margin - 30;
    return map(val, numberLineMin, numberLineMax, lineStartX, lineEndX);
}

function xToValue(x) {
    let lineStartX = margin + 30;
    let lineEndX = canvasWidth - margin - 30;
    return constrain(map(x, lineStartX, lineEndX, numberLineMin, numberLineMax), numberLineMin, numberLineMax);
}

function resetData() {
    // Initialize with 5 roughly symmetric points
    dataPoints = [20, 35, 50, 65, 80];
    beamTilt = 0;
}

function mousePressed() {
    // Check if clicking on a data point
    for (let i = 0; i < dataPoints.length; i++) {
        let x = valueToX(dataPoints[i]);
        let y = numberLineY - 55;
        if (dist(mouseX, mouseY, x, y) < pointRadius) {
            selectedPoint = i;
            isDragging = true;
            return;
        }
    }

    // Check if clicking near the number line to add a point
    if (mouseY > numberLineY - 20 && mouseY < numberLineY + 20 && mouseX > margin && mouseX < canvasWidth - margin) {
        let newVal = xToValue(mouseX);
        dataPoints.push(Math.round(newVal));
    }
}

function mouseDragged() {
    if (isDragging && selectedPoint >= 0) {
        dataPoints[selectedPoint] = Math.round(xToValue(mouseX));
    }
}

function mouseReleased() {
    isDragging = false;
    selectedPoint = -1;
}

function doubleClicked() {
    // Remove point if double-clicked
    for (let i = 0; i < dataPoints.length; i++) {
        let x = valueToX(dataPoints[i]);
        let y = numberLineY - 55;
        if (dist(mouseX, mouseY, x, y) < pointRadius) {
            if (dataPoints.length > 1) {
                dataPoints.splice(i, 1);
            }
            return;
        }
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
