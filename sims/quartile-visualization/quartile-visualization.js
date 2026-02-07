// Quartile Visualization MicroSim
// Shows how quartiles divide a distribution into four equal parts
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 200;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Data
let dataPoints = [];
let sampleSize = 20;
let q1, median, q3;

// UI elements
let sampleSlider;
let randomizeButton;
let modeButton;
let evenSpacing = false;

// Interaction
let hoveredRegion = -1;
let selectedQuartile = -1;

// Colors for quartile regions
let colors = ['#E57373', '#FFB74D', '#FFF176', '#81C784'];
let colorLabels = ['Below Q1 (25%)', 'Q1 to Median (25%)', 'Median to Q3 (25%)', 'Above Q3 (25%)'];

// Sylvia theme
let sylviaGreen = '#2E7D32';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    // Generate initial data
    generateData();

    // Create sample size slider
    sampleSlider = createSlider(10, 50, sampleSize, 1);
    sampleSlider.position(sliderLeftMargin, drawHeight + 10);
    sampleSlider.size(canvasWidth - sliderLeftMargin - 200);
    sampleSlider.input(generateData);

    // Create randomize button
    randomizeButton = createButton('Randomize');
    randomizeButton.position(canvasWidth - 180, drawHeight + 10);
    randomizeButton.mousePressed(generateData);

    // Create mode toggle button
    modeButton = createButton('Even Spacing');
    modeButton.position(canvasWidth - 90, drawHeight + 10);
    modeButton.mousePressed(toggleMode);

    describe('Interactive quartile visualization showing data divided into four equal parts with color-coded regions', LABEL);
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
    text('Understanding Quartiles', canvasWidth / 2, 8);

    // Draw visualization
    let lineY = 130;
    let lineStartX = margin + 40;
    let lineEndX = canvasWidth - margin - 40;

    // Detect hovered region
    detectHover(lineY, lineStartX, lineEndX);

    // Draw colored regions
    drawQuartileRegions(lineY, lineStartX, lineEndX);

    // Draw number line
    drawNumberLine(lineY, lineStartX, lineEndX);

    // Draw quartile markers
    drawQuartileMarkers(lineY, lineStartX, lineEndX);

    // Draw data points
    drawDataPoints(lineY, lineStartX, lineEndX);

    // Draw region labels
    drawRegionLabels(lineY, lineStartX, lineEndX);

    // Draw counts
    drawCounts(lineY);

    // Show calculation details if quartile selected
    if (selectedQuartile >= 0) {
        drawCalculationDetails();
    }

    // Control labels
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text('Sample Size: ' + sampleSize, 10, drawHeight + 25);
}

function generateData() {
    sampleSize = sampleSlider ? sampleSlider.value() : 20;
    dataPoints = [];

    if (evenSpacing) {
        // Evenly spaced data
        for (let i = 0; i < sampleSize; i++) {
            dataPoints.push(10 + (i * 80 / (sampleSize - 1)));
        }
    } else {
        // Random realistic data (slightly normal-ish)
        for (let i = 0; i < sampleSize; i++) {
            let val = randomGaussian(50, 20);
            val = constrain(val, 5, 95);
            dataPoints.push(val);
        }
    }

    dataPoints.sort((a, b) => a - b);
    calculateQuartiles();
}

function calculateQuartiles() {
    let n = dataPoints.length;

    // Find median
    if (n % 2 === 0) {
        median = (dataPoints[n/2 - 1] + dataPoints[n/2]) / 2;
    } else {
        median = dataPoints[Math.floor(n/2)];
    }

    // Find Q1 (median of lower half)
    let lowerHalf = dataPoints.slice(0, Math.floor(n/2));
    let lowerN = lowerHalf.length;
    if (lowerN % 2 === 0) {
        q1 = (lowerHalf[lowerN/2 - 1] + lowerHalf[lowerN/2]) / 2;
    } else {
        q1 = lowerHalf[Math.floor(lowerN/2)];
    }

    // Find Q3 (median of upper half)
    let upperStart = n % 2 === 0 ? n/2 : Math.floor(n/2) + 1;
    let upperHalf = dataPoints.slice(upperStart);
    let upperN = upperHalf.length;
    if (upperN % 2 === 0) {
        q3 = (upperHalf[upperN/2 - 1] + upperHalf[upperN/2]) / 2;
    } else {
        q3 = upperHalf[Math.floor(upperN/2)];
    }
}

function drawQuartileRegions(lineY, lineStartX, lineEndX) {
    let minVal = 0;
    let maxVal = 100;

    let boundaries = [minVal, q1, median, q3, maxVal];

    for (let i = 0; i < 4; i++) {
        let x1 = map(boundaries[i], minVal, maxVal, lineStartX, lineEndX);
        let x2 = map(boundaries[i+1], minVal, maxVal, lineStartX, lineEndX);

        // Highlight if hovered
        if (i === hoveredRegion) {
            fill(colors[i]);
        } else {
            // Slightly transparent
            let c = color(colors[i]);
            c.setAlpha(150);
            fill(c);
        }
        noStroke();
        rect(x1, lineY - 40, x2 - x1, 80);
    }
}

function drawNumberLine(lineY, lineStartX, lineEndX) {
    stroke(100);
    strokeWeight(2);
    line(lineStartX, lineY, lineEndX, lineY);

    // Tick marks
    textAlign(CENTER, TOP);
    textSize(10);
    fill(100);
    for (let val = 0; val <= 100; val += 20) {
        let x = map(val, 0, 100, lineStartX, lineEndX);
        stroke(100);
        strokeWeight(1);
        line(x, lineY - 5, x, lineY + 5);
        noStroke();
        text(val, x, lineY + 8);
    }
}

function drawQuartileMarkers(lineY, lineStartX, lineEndX) {
    let quartiles = [
        { val: q1, label: 'Q1', y: lineY - 50 },
        { val: median, label: 'Median', y: lineY - 65 },
        { val: q3, label: 'Q3', y: lineY - 50 }
    ];

    textAlign(CENTER, BOTTOM);
    textSize(12);

    for (let i = 0; i < quartiles.length; i++) {
        let q = quartiles[i];
        let x = map(q.val, 0, 100, lineStartX, lineEndX);

        // Vertical line
        stroke(sylviaGreen);
        strokeWeight(2);
        line(x, lineY - 40, x, lineY + 40);

        // Label
        fill(sylviaGreen);
        noStroke();
        text(q.label + ': ' + q.val.toFixed(1), x, q.y);
    }
}

function drawDataPoints(lineY, lineStartX, lineEndX) {
    for (let i = 0; i < dataPoints.length; i++) {
        let val = dataPoints[i];
        let x = map(val, 0, 100, lineStartX, lineEndX);

        // Determine which region
        let region;
        if (val < q1) region = 0;
        else if (val < median) region = 1;
        else if (val < q3) region = 2;
        else region = 3;

        fill(colors[region]);
        stroke(50);
        strokeWeight(1);
        circle(x, lineY, 10);
    }
}

function drawRegionLabels(lineY, lineStartX, lineEndX) {
    textAlign(CENTER, TOP);
    textSize(10);
    noStroke();

    let boundaries = [0, q1, median, q3, 100];
    for (let i = 0; i < 4; i++) {
        let x1 = map(boundaries[i], 0, 100, lineStartX, lineEndX);
        let x2 = map(boundaries[i+1], 0, 100, lineStartX, lineEndX);
        let centerX = (x1 + x2) / 2;

        fill(0);
        text('25%', centerX, lineY + 45);
    }
}

function drawCounts(lineY) {
    // Count points in each region
    let counts = [0, 0, 0, 0];
    for (let val of dataPoints) {
        if (val < q1) counts[0]++;
        else if (val < median) counts[1]++;
        else if (val < q3) counts[2]++;
        else counts[3]++;
    }

    // Display counts
    textAlign(RIGHT, TOP);
    textSize(11);
    fill('black');
    noStroke();

    let y = 35;
    for (let i = 0; i < 4; i++) {
        fill(colors[i]);
        rect(canvasWidth - 155, y + i * 16, 12, 12);
        fill('black');
        textAlign(LEFT, TOP);
        text(colorLabels[i] + ': ' + counts[i], canvasWidth - 140, y + i * 16);
    }
}

function drawCalculationDetails() {
    // Draw calculation box when quartile clicked
    let boxX = 10;
    let boxY = 35;
    let boxW = 150;
    let boxH = 60;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(boxX, boxY, boxW, boxH, 5);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);

    let labels = ['Q1', 'Median (Q2)', 'Q3'];
    let values = [q1, median, q3];
    text(labels[selectedQuartile] + ' = ' + values[selectedQuartile].toFixed(2), boxX + 10, boxY + 10);
    text('Position: ' + getPosition(selectedQuartile), boxX + 10, boxY + 30);
}

function getPosition(quartileIndex) {
    let n = dataPoints.length;
    if (quartileIndex === 0) return 'Lower half median';
    if (quartileIndex === 1) return 'Position ' + Math.ceil(n/2);
    return 'Upper half median';
}

function detectHover(lineY, lineStartX, lineEndX) {
    hoveredRegion = -1;
    if (mouseY > lineY - 40 && mouseY < lineY + 40) {
        let boundaries = [0, q1, median, q3, 100];
        for (let i = 0; i < 4; i++) {
            let x1 = map(boundaries[i], 0, 100, lineStartX, lineEndX);
            let x2 = map(boundaries[i+1], 0, 100, lineStartX, lineEndX);
            if (mouseX > x1 && mouseX < x2) {
                hoveredRegion = i;
                break;
            }
        }
    }
}

function mousePressed() {
    // Check if clicking on quartile markers
    let lineY = 130;
    let lineStartX = margin + 40;
    let lineEndX = canvasWidth - margin - 40;

    let quartileVals = [q1, median, q3];
    for (let i = 0; i < 3; i++) {
        let x = map(quartileVals[i], 0, 100, lineStartX, lineEndX);
        if (dist(mouseX, mouseY, x, lineY) < 20) {
            selectedQuartile = selectedQuartile === i ? -1 : i;
            return;
        }
    }
    selectedQuartile = -1;
}

function toggleMode() {
    evenSpacing = !evenSpacing;
    modeButton.html(evenSpacing ? 'Realistic Data' : 'Even Spacing');
    generateData();
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    if (sampleSlider) {
        sampleSlider.size(canvasWidth - sliderLeftMargin - 200);
    }
    if (randomizeButton) {
        randomizeButton.position(canvasWidth - 180, drawHeight + 10);
    }
    if (modeButton) {
        modeButton.position(canvasWidth - 90, drawHeight + 10);
    }
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
