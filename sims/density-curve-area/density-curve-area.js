// Density Curve Area Explorer MicroSim
// Shows that area under a density curve represents probability
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 300;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Curve parameters
let curveType = 'normal';
let curveMean = 50;
let curveSD = 15;

// Boundaries
let leftBound = 35;
let rightBound = 65;
let draggingLeft = false;
let draggingRight = false;

// UI elements
let curveSelect;
let showFullAreaCheckbox;
let resetButton;
let showFullArea = false;

// Sylvia theme
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    // Curve type selector
    curveSelect = createSelect();
    curveSelect.position(10, drawHeight + 10);
    curveSelect.option('Normal', 'normal');
    curveSelect.option('Uniform', 'uniform');
    curveSelect.option('Right-skewed', 'right-skewed');
    curveSelect.selected('normal');
    curveSelect.changed(() => curveType = curveSelect.value());

    // Show full area checkbox
    showFullAreaCheckbox = createCheckbox(' Show Full Area = 1', false);
    showFullAreaCheckbox.position(120, drawHeight + 10);
    showFullAreaCheckbox.changed(() => {
        showFullArea = showFullAreaCheckbox.checked();
        if (showFullArea) {
            leftBound = 0;
            rightBound = 100;
        } else {
            leftBound = 35;
            rightBound = 65;
        }
    });

    // Reset button
    resetButton = createButton('Reset');
    resetButton.position(canvasWidth - 70, drawHeight + 10);
    resetButton.mousePressed(() => {
        leftBound = 35;
        rightBound = 65;
        showFullArea = false;
        showFullAreaCheckbox.checked(false);
    });

    describe('Interactive density curve showing that area under the curve represents probability', LABEL);
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
    text('Area Under a Density Curve', canvasWidth / 2, 8);

    // Draw curve and shaded area
    let curveLeft = margin + 40;
    let curveRight = canvasWidth - margin - 40;
    let curveTop = 60;
    let curveBottom = 230;

    drawShadedArea(curveLeft, curveRight, curveTop, curveBottom);
    drawDensityCurve(curveLeft, curveRight, curveTop, curveBottom);
    drawBoundaryLines(curveLeft, curveRight, curveTop, curveBottom);
    drawAxis(curveLeft, curveRight, curveBottom);
    drawAreaDisplay(curveLeft, curveRight);

    // Instructions
    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Drag the vertical lines to change the shaded region', canvasWidth / 2, drawHeight - 5);
}

function densityValue(x, curveType) {
    if (curveType === 'normal') {
        // Standard normal PDF scaled
        let z = (x - curveMean) / curveSD;
        return Math.exp(-0.5 * z * z) / (curveSD * Math.sqrt(2 * Math.PI));
    } else if (curveType === 'uniform') {
        return (x >= 10 && x <= 90) ? 1 / 80 : 0;
    } else if (curveType === 'right-skewed') {
        // Exponential-like
        if (x < 10) return 0;
        let lambda = 0.05;
        return lambda * Math.exp(-lambda * (x - 10));
    }
    return 0;
}

function drawDensityCurve(left, right, top, bottom) {
    // Find max density for scaling
    let maxDensity = 0;
    for (let x = 0; x <= 100; x++) {
        maxDensity = Math.max(maxDensity, densityValue(x, curveType));
    }

    // Draw curve
    stroke(sylviaGreen);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = left; px <= right; px++) {
        let x = map(px, left, right, 0, 100);
        let density = densityValue(x, curveType);
        let y = map(density, 0, maxDensity * 1.1, bottom, top);
        vertex(px, y);
    }
    endShape();

    // Mark mean and SD for normal
    if (curveType === 'normal') {
        let meanX = map(curveMean, 0, 100, left, right);

        // Mean line
        stroke(100);
        strokeWeight(1);
        drawingContext.setLineDash([3, 3]);
        line(meanX, top, meanX, bottom);
        drawingContext.setLineDash([]);

        // SD markers
        for (let k = -2; k <= 2; k++) {
            let sdX = map(curveMean + k * curveSD, 0, 100, left, right);
            if (sdX > left && sdX < right && k !== 0) {
                stroke(180);
                strokeWeight(1);
                line(sdX, bottom - 10, sdX, bottom);
            }
        }
    }
}

function drawShadedArea(left, right, top, bottom) {
    // Find max density for scaling
    let maxDensity = 0;
    for (let x = 0; x <= 100; x++) {
        maxDensity = Math.max(maxDensity, densityValue(x, curveType));
    }

    // Shaded region
    let leftPx = map(leftBound, 0, 100, left, right);
    let rightPx = map(rightBound, 0, 100, left, right);

    fill(sylviaGreen);
    fill(46, 125, 50, 100); // Semi-transparent green
    noStroke();
    beginShape();
    vertex(leftPx, bottom);
    for (let px = leftPx; px <= rightPx; px++) {
        let x = map(px, left, right, 0, 100);
        let density = densityValue(x, curveType);
        let y = map(density, 0, maxDensity * 1.1, bottom, top);
        vertex(px, y);
    }
    vertex(rightPx, bottom);
    endShape(CLOSE);
}

function drawBoundaryLines(left, right, top, bottom) {
    let leftPx = map(leftBound, 0, 100, left, right);
    let rightPx = map(rightBound, 0, 100, left, right);

    // Left boundary
    stroke(sylviaAuburn);
    strokeWeight(3);
    line(leftPx, top, leftPx, bottom + 15);

    // Drag handle
    fill(sylviaAuburn);
    noStroke();
    triangle(leftPx - 8, bottom + 20, leftPx + 8, bottom + 20, leftPx, bottom + 10);

    // Label
    textAlign(CENTER, TOP);
    textSize(11);
    text(leftBound.toFixed(0), leftPx, bottom + 22);

    // Right boundary
    stroke(sylviaAuburn);
    strokeWeight(3);
    line(rightPx, top, rightPx, bottom + 15);

    // Drag handle
    fill(sylviaAuburn);
    noStroke();
    triangle(rightPx - 8, bottom + 20, rightPx + 8, bottom + 20, rightPx, bottom + 10);

    // Label
    text(rightBound.toFixed(0), rightPx, bottom + 22);
}

function drawAxis(left, right, y) {
    stroke(100);
    strokeWeight(2);
    line(left, y, right, y);

    textAlign(CENTER, TOP);
    textSize(10);
    fill(100);
    noStroke();
    for (let val = 0; val <= 100; val += 20) {
        let x = map(val, 0, 100, left, right);
        stroke(100);
        strokeWeight(1);
        line(x, y, x, y + 5);
        noStroke();
        text(val, x, y + 8);
    }
}

function drawAreaDisplay(left, right) {
    // Calculate area (numerical integration)
    let area = 0;
    let dx = 0.1;
    for (let x = leftBound; x < rightBound; x += dx) {
        area += densityValue(x, curveType) * dx;
    }

    // For uniform, use exact calculation
    if (curveType === 'uniform') {
        let l = Math.max(leftBound, 10);
        let r = Math.min(rightBound, 90);
        area = Math.max(0, (r - l) / 80);
    }

    // Display box
    let boxX = canvasWidth - 180;
    let boxY = 50;

    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(boxX, boxY, 160, 80, 5);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Shaded Area', boxX + 80, boxY + 10);

    textSize(24);
    fill(sylviaGreen);
    text(area.toFixed(4), boxX + 80, boxY + 32);

    textSize(14);
    fill(100);
    text('= ' + (area * 100).toFixed(2) + '%', boxX + 80, boxY + 60);
}

function mousePressed() {
    let left = margin + 40;
    let right = canvasWidth - margin - 40;
    let bottom = 230;

    let leftPx = map(leftBound, 0, 100, left, right);
    let rightPx = map(rightBound, 0, 100, left, right);

    if (dist(mouseX, mouseY, leftPx, bottom + 15) < 20) {
        draggingLeft = true;
    } else if (dist(mouseX, mouseY, rightPx, bottom + 15) < 20) {
        draggingRight = true;
    }
}

function mouseDragged() {
    let left = margin + 40;
    let right = canvasWidth - margin - 40;

    if (draggingLeft) {
        leftBound = constrain(map(mouseX, left, right, 0, 100), 0, rightBound - 1);
    } else if (draggingRight) {
        rightBound = constrain(map(mouseX, left, right, 0, 100), leftBound + 1, 100);
    }
}

function mouseReleased() {
    draggingLeft = false;
    draggingRight = false;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    if (resetButton) {
        resetButton.position(canvasWidth - 70, drawHeight + 10);
    }
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
