// Boxplot Builder MicroSim
// Interactive tool for constructing and understanding boxplots
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 750;
let drawHeight = 350;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Data
let dataPoints = [];
let sortedData = [];
let min, max, q1, median, q3, iqr;

// UI elements
let generateButton;
let distributionSelect;
let showLabelsCheckbox;
let showTableCheckbox;
let stepButton;
let showLabels = true;
let showTable = true;

// Animation state
let buildStep = 5; // 0-5: steps in building boxplot
let animating = false;

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';
let boxColor;

// Dragging
let selectedPoint = -1;
let isDragging = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);
    boxColor = color(sylviaGreen);
    boxColor.setAlpha(180);

    // Generate initial data
    generateData('symmetric');

    // Create Generate button
    generateButton = createButton('Generate');
    generateButton.position(10, drawHeight + 10);
    generateButton.mousePressed(() => generateData(distributionSelect.value()));

    // Create distribution select
    distributionSelect = createSelect();
    distributionSelect.position(80, drawHeight + 10);
    distributionSelect.option('symmetric');
    distributionSelect.option('right-skewed');
    distributionSelect.option('left-skewed');
    distributionSelect.selected('symmetric');

    // Step button
    stepButton = createButton('Build Step-by-Step');
    stepButton.position(200, drawHeight + 10);
    stepButton.mousePressed(startStepAnimation);

    // Labels checkbox
    showLabelsCheckbox = createCheckbox(' Labels', true);
    showLabelsCheckbox.position(340, drawHeight + 10);
    showLabelsCheckbox.changed(() => showLabels = showLabelsCheckbox.checked());

    // Table checkbox
    showTableCheckbox = createCheckbox(' Table', true);
    showTableCheckbox.position(410, drawHeight + 10);
    showTableCheckbox.changed(() => showTable = showTableCheckbox.checked());

    describe('Interactive boxplot builder where students can manipulate data points and see the boxplot update in real-time', LABEL);
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
    text('Boxplot Builder', canvasWidth / 2, 8);

    // Calculate statistics
    calculateStatistics();

    // Draw data points (top section)
    drawDataPoints();

    // Draw boxplot (middle section)
    drawBoxplot();

    // Draw five-number summary table
    if (showTable) {
        drawSummaryTable();
    }

    // Draw step indicator if animating
    if (buildStep < 5) {
        drawStepIndicator();
    }

    // Instructions
    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Drag points to adjust values | Click number line to add | Double-click to remove', canvasWidth / 2, drawHeight - 5);
}

function generateData(distribution) {
    dataPoints = [];
    let n = 12;

    if (distribution === 'symmetric') {
        for (let i = 0; i < n; i++) {
            dataPoints.push(randomGaussian(50, 15));
        }
    } else if (distribution === 'right-skewed') {
        for (let i = 0; i < n; i++) {
            let val = 20 + Math.pow(random(), 0.5) * 60;
            dataPoints.push(val);
        }
    } else if (distribution === 'left-skewed') {
        for (let i = 0; i < n; i++) {
            let val = 80 - Math.pow(random(), 0.5) * 60;
            dataPoints.push(val);
        }
    }

    dataPoints = dataPoints.map(v => constrain(v, 5, 95));
    buildStep = 5; // Show full boxplot
}

function calculateStatistics() {
    if (dataPoints.length === 0) return;

    sortedData = [...dataPoints].sort((a, b) => a - b);
    min = sortedData[0];
    max = sortedData[sortedData.length - 1];

    let n = sortedData.length;

    // Median
    if (n % 2 === 0) {
        median = (sortedData[n/2 - 1] + sortedData[n/2]) / 2;
    } else {
        median = sortedData[Math.floor(n/2)];
    }

    // Q1
    let lowerHalf = sortedData.slice(0, Math.floor(n/2));
    let lowerN = lowerHalf.length;
    if (lowerN % 2 === 0) {
        q1 = (lowerHalf[lowerN/2 - 1] + lowerHalf[lowerN/2]) / 2;
    } else {
        q1 = lowerHalf[Math.floor(lowerN/2)];
    }

    // Q3
    let upperStart = n % 2 === 0 ? n/2 : Math.floor(n/2) + 1;
    let upperHalf = sortedData.slice(upperStart);
    let upperN = upperHalf.length;
    if (upperN % 2 === 0) {
        q3 = (upperHalf[upperN/2 - 1] + upperHalf[upperN/2]) / 2;
    } else {
        q3 = upperHalf[Math.floor(upperN/2)];
    }

    iqr = q3 - q1;
}

function drawDataPoints() {
    let lineY = 80;
    let lineStartX = margin + 50;
    let lineEndX = canvasWidth - margin - 50;

    // Number line
    stroke(100);
    strokeWeight(2);
    line(lineStartX, lineY, lineEndX, lineY);

    // Tick marks
    textAlign(CENTER, TOP);
    textSize(10);
    for (let val = 0; val <= 100; val += 10) {
        let x = map(val, 0, 100, lineStartX, lineEndX);
        stroke(100);
        strokeWeight(1);
        line(x, lineY - 5, x, lineY + 5);
        noStroke();
        fill(100);
        text(val, x, lineY + 8);
    }

    // Data points
    for (let i = 0; i < dataPoints.length; i++) {
        let x = map(dataPoints[i], 0, 100, lineStartX, lineEndX);
        let y = lineY - 25;

        if (i === selectedPoint && isDragging) {
            fill(sylviaAuburn);
            stroke(50);
        } else {
            fill(sylviaGreen);
            stroke(50);
        }
        strokeWeight(1);
        circle(x, y, 16);

        // Show value
        fill('white');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(8);
        text(Math.round(dataPoints[i]), x, y);
    }

    // Label
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Data Points (n=' + dataPoints.length + ')', lineStartX, lineY - 50);
}

function drawBoxplot() {
    let boxY = 180;
    let boxHeight = 40;
    let lineStartX = margin + 50;
    let lineEndX = canvasWidth - margin - 50;

    // Number line for boxplot
    stroke(100);
    strokeWeight(1);
    line(lineStartX, boxY + 50, lineEndX, boxY + 50);

    // Tick marks
    textAlign(CENTER, TOP);
    textSize(10);
    for (let val = 0; val <= 100; val += 10) {
        let x = map(val, 0, 100, lineStartX, lineEndX);
        stroke(100);
        line(x, boxY + 45, x, boxY + 55);
        noStroke();
        fill(100);
        text(val, x, boxY + 58);
    }

    if (buildStep < 1) return; // Step 0: Just sorted data

    let minX = map(min, 0, 100, lineStartX, lineEndX);
    let maxX = map(max, 0, 100, lineStartX, lineEndX);
    let q1X = map(q1, 0, 100, lineStartX, lineEndX);
    let q3X = map(q3, 0, 100, lineStartX, lineEndX);
    let medianX = map(median, 0, 100, lineStartX, lineEndX);

    // Step 2+: Draw median line
    if (buildStep >= 2) {
        stroke(sylviaAuburn);
        strokeWeight(3);
        line(medianX, boxY - boxHeight/2, medianX, boxY + boxHeight/2);

        if (showLabels) {
            fill(sylviaAuburn);
            noStroke();
            textAlign(CENTER, BOTTOM);
            textSize(11);
            text('Median', medianX, boxY - boxHeight/2 - 5);
            text(median.toFixed(1), medianX, boxY - boxHeight/2 - 18);
        }
    }

    // Step 3+: Draw box
    if (buildStep >= 3) {
        fill(boxColor);
        stroke(sylviaGreen);
        strokeWeight(2);
        rect(q1X, boxY - boxHeight/2, q3X - q1X, boxHeight);

        if (showLabels) {
            fill(sylviaGreen);
            noStroke();
            textAlign(CENTER, BOTTOM);
            textSize(11);
            text('Q1: ' + q1.toFixed(1), q1X, boxY - boxHeight/2 - 5);
            text('Q3: ' + q3.toFixed(1), q3X, boxY - boxHeight/2 - 5);

            textAlign(CENTER, TOP);
            text('IQR = ' + iqr.toFixed(1), (q1X + q3X)/2, boxY + boxHeight/2 + 5);
        }
    }

    // Step 4+: Draw whiskers
    if (buildStep >= 4) {
        stroke(50);
        strokeWeight(2);
        // Left whisker
        line(minX, boxY, q1X, boxY);
        line(minX, boxY - 10, minX, boxY + 10);
        // Right whisker
        line(q3X, boxY, maxX, boxY);
        line(maxX, boxY - 10, maxX, boxY + 10);

        if (showLabels) {
            fill(50);
            noStroke();
            textAlign(CENTER, TOP);
            textSize(11);
            text('Min: ' + min.toFixed(1), minX, boxY + 15);
            text('Max: ' + max.toFixed(1), maxX, boxY + 15);
        }
    }

    // Label
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Boxplot', lineStartX, boxY - 55);
}

function drawSummaryTable() {
    let tableX = canvasWidth - 180;
    let tableY = 35;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(tableX, tableY, 170, 100, 5);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);

    text('Five-Number Summary:', tableX + 10, tableY + 8);
    textSize(10);
    text('Min:     ' + (min ? min.toFixed(1) : '-'), tableX + 15, tableY + 28);
    text('Q1:      ' + (q1 ? q1.toFixed(1) : '-'), tableX + 15, tableY + 43);
    text('Median:  ' + (median ? median.toFixed(1) : '-'), tableX + 15, tableY + 58);
    text('Q3:      ' + (q3 ? q3.toFixed(1) : '-'), tableX + 15, tableY + 73);
    text('Max:     ' + (max ? max.toFixed(1) : '-'), tableX + 15, tableY + 88);
}

function drawStepIndicator() {
    let steps = ['Sort Data', 'Find Median', 'Find Q1 & Q3', 'Draw Box', 'Add Whiskers'];
    fill(sylviaAuburn);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);
    text('Step ' + buildStep + ': ' + steps[buildStep - 1], 10, 35);
}

function startStepAnimation() {
    buildStep = 0;
    animateNextStep();
}

function animateNextStep() {
    if (buildStep < 5) {
        buildStep++;
        setTimeout(animateNextStep, 1000);
    }
}

function mousePressed() {
    let lineY = 80;
    let lineStartX = margin + 50;
    let lineEndX = canvasWidth - margin - 50;

    // Check if clicking on a data point
    for (let i = 0; i < dataPoints.length; i++) {
        let x = map(dataPoints[i], 0, 100, lineStartX, lineEndX);
        let y = lineY - 25;
        if (dist(mouseX, mouseY, x, y) < 10) {
            selectedPoint = i;
            isDragging = true;
            return;
        }
    }

    // Check if clicking on number line to add point
    if (mouseY > lineY - 10 && mouseY < lineY + 20 && mouseX > lineStartX && mouseX < lineEndX) {
        let newVal = map(mouseX, lineStartX, lineEndX, 0, 100);
        dataPoints.push(constrain(newVal, 5, 95));
        buildStep = 5;
    }
}

function mouseDragged() {
    if (isDragging && selectedPoint >= 0) {
        let lineStartX = margin + 50;
        let lineEndX = canvasWidth - margin - 50;
        let newVal = map(mouseX, lineStartX, lineEndX, 0, 100);
        dataPoints[selectedPoint] = constrain(newVal, 5, 95);
        buildStep = 5;
    }
}

function mouseReleased() {
    isDragging = false;
    selectedPoint = -1;
}

function doubleClicked() {
    let lineY = 80;
    let lineStartX = margin + 50;
    let lineEndX = canvasWidth - margin - 50;

    for (let i = 0; i < dataPoints.length; i++) {
        let x = map(dataPoints[i], 0, 100, lineStartX, lineEndX);
        let y = lineY - 25;
        if (dist(mouseX, mouseY, x, y) < 10 && dataPoints.length > 3) {
            dataPoints.splice(i, 1);
            buildStep = 5;
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
