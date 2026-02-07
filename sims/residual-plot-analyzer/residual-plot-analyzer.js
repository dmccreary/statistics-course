// Residual Plot Analyzer MicroSim
// Evaluate whether a linear model is appropriate by analyzing residual plot patterns
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 650;
let drawHeight = 300;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Layout
let margin = 15;
let plotGap = 30;

// Scatterplot dimensions (left side)
let scatterLeft, scatterTop, scatterWidth, scatterHeight;

// Residual plot dimensions (right side)
let residualLeft, residualTop, residualWidth, residualHeight;

// Data
let dataPoints = [];
let numPoints = 25;
let highlightedPoint = -1;
let showConnectingLines = false;

// Regression values
let slope = 0;
let intercept = 0;
let residuals = [];

// Dataset types
let datasetTypes = ['Random (Good Fit)', 'Curved Pattern', 'Fan-Shaped'];
let currentDataset = 0;

// Quiz mode
let quizMode = false;
let quizAnswered = false;
let quizCorrect = false;

// Animation
let animating = false;
let animationProgress = 0;
let animationSpeed = 0.05;

// Buttons
let buttons = [];

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
    canvas.parent(document.querySelector('main'));

    textFont('Arial');

    generateData(currentDataset);

    describe('Residual plot analyzer showing a scatterplot with regression line on the left and corresponding residual plot on the right. Students can explore different data patterns and learn to identify when a linear model is appropriate.', LABEL);
}

function generateData(type) {
    dataPoints = [];

    // Generate x values
    let xValues = [];
    for (let i = 0; i < numPoints; i++) {
        xValues.push(10 + (i / numPoints) * 80);
    }

    switch(type) {
        case 0: // Random (Good Fit) - linear with random error
            for (let i = 0; i < numPoints; i++) {
                let x = xValues[i];
                let y = 20 + 0.7 * x + randomGaussian(0, 8);
                dataPoints.push({x: x, y: y});
            }
            break;

        case 1: // Curved Pattern - quadratic relationship
            for (let i = 0; i < numPoints; i++) {
                let x = xValues[i];
                let xNorm = (x - 50) / 40; // Normalize to roughly -1 to 1
                let y = 50 + 30 * xNorm - 25 * xNorm * xNorm + randomGaussian(0, 4);
                dataPoints.push({x: x, y: y});
            }
            break;

        case 2: // Fan-Shaped (Heteroscedastic)
            for (let i = 0; i < numPoints; i++) {
                let x = xValues[i];
                let spread = 2 + (x - 10) * 0.15; // Spread increases with x
                let y = 20 + 0.6 * x + randomGaussian(0, spread);
                dataPoints.push({x: x, y: y});
            }
            break;
    }

    calculateRegression();

    // Reset quiz state
    if (quizMode) {
        quizAnswered = false;
        quizCorrect = false;
    }

    // Trigger animation
    animating = true;
    animationProgress = 0;
}

function calculateRegression() {
    if (dataPoints.length < 2) return;

    // Calculate means
    let sumX = 0, sumY = 0;
    for (let p of dataPoints) {
        sumX += p.x;
        sumY += p.y;
    }
    let meanX = sumX / dataPoints.length;
    let meanY = sumY / dataPoints.length;

    // Calculate slope and intercept
    let numerator = 0, denominator = 0;
    for (let p of dataPoints) {
        numerator += (p.x - meanX) * (p.y - meanY);
        denominator += (p.x - meanX) ** 2;
    }

    slope = denominator !== 0 ? numerator / denominator : 0;
    intercept = meanY - slope * meanX;

    // Calculate residuals
    residuals = [];
    for (let p of dataPoints) {
        let predicted = intercept + slope * p.x;
        residuals.push({
            x: p.x,
            residual: p.y - predicted
        });
    }
}

function draw() {
    updateCanvasSize();

    // Calculate plot dimensions
    let availableWidth = canvasWidth - 3 * margin - plotGap;
    let plotWidth = availableWidth / 2;

    scatterLeft = margin;
    scatterTop = 40;
    scatterWidth = plotWidth;
    scatterHeight = drawHeight - scatterTop - 45;

    residualLeft = margin + plotWidth + plotGap;
    residualTop = scatterTop;
    residualWidth = plotWidth;
    residualHeight = scatterHeight;

    // Update animation
    if (animating) {
        animationProgress += animationSpeed;
        if (animationProgress >= 1) {
            animationProgress = 1;
            animating = false;
        }
    }

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
    textSize(18);
    text('Residual Plot Analyzer', canvasWidth / 2, 8);

    // Draw components
    drawScatterplot();
    drawResidualPlot();
    drawPatternDiagnosis();
    drawControls();

    // Draw connecting lines between plots
    if (showConnectingLines && !quizMode) {
        drawConnectingLines();
    }

    // Check for point hover
    checkPointHover();
}

function drawScatterplot() {
    // Background
    fill('white');
    stroke(200);
    strokeWeight(1);
    rect(scatterLeft, scatterTop, scatterWidth, scatterHeight, 5);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(12);
    text('Scatterplot with Regression Line', scatterLeft + scatterWidth / 2, scatterTop - 3);

    if (dataPoints.length === 0) return;

    // Calculate axis ranges
    let xMin = Math.min(...dataPoints.map(p => p.x));
    let xMax = Math.max(...dataPoints.map(p => p.x));
    let yMin = Math.min(...dataPoints.map(p => p.y));
    let yMax = Math.max(...dataPoints.map(p => p.y));

    // Add padding
    let xPad = (xMax - xMin) * 0.1 || 5;
    let yPad = (yMax - yMin) * 0.1 || 5;
    xMin -= xPad;
    xMax += xPad;
    yMin -= yPad;
    yMax += yPad;

    let innerLeft = scatterLeft + 35;
    let innerRight = scatterLeft + scatterWidth - 10;
    let innerTop = scatterTop + 10;
    let innerBottom = scatterTop + scatterHeight - 25;

    // Draw axes
    stroke(100);
    strokeWeight(1);
    line(innerLeft, innerBottom, innerRight, innerBottom);
    line(innerLeft, innerTop, innerLeft, innerBottom);

    // Axis labels
    fill(100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text('X', (innerLeft + innerRight) / 2, innerBottom + 10);

    push();
    translate(scatterLeft + 10, (innerTop + innerBottom) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    text('Y', 0, 0);
    pop();

    // Draw regression line (animated)
    if (animationProgress > 0.3) {
        let lineAlpha = map(animationProgress, 0.3, 0.6, 0, 255);
        stroke(sylviaAuburn);
        strokeWeight(2);

        let x1 = xMin;
        let y1 = intercept + slope * x1;
        let x2 = xMax;
        let y2 = intercept + slope * x2;

        let px1 = map(x1, xMin, xMax, innerLeft, innerRight);
        let py1 = map(y1, yMin, yMax, innerBottom, innerTop);
        let px2 = map(x2, xMin, xMax, innerLeft, innerRight);
        let py2 = map(y2, yMin, yMax, innerBottom, innerTop);

        // Clip to plot area
        py1 = constrain(py1, innerTop, innerBottom);
        py2 = constrain(py2, innerTop, innerBottom);

        line(px1, py1, px2, py2);
    }

    // Draw data points (animated)
    let pointsToShow = floor(dataPoints.length * min(animationProgress * 2, 1));

    for (let i = 0; i < pointsToShow; i++) {
        let p = dataPoints[i];
        let px = map(p.x, xMin, xMax, innerLeft, innerRight);
        let py = map(p.y, yMin, yMax, innerBottom, innerTop);

        // Highlight if hovered
        if (i === highlightedPoint) {
            fill(sylviaAuburn);
            stroke(sylviaGreenDark);
            strokeWeight(3);
            circle(px, py, 14);
        } else {
            fill(100, 149, 237);
            stroke(50);
            strokeWeight(1);
            circle(px, py, 10);
        }
    }

    // Store plot bounds for interaction
    scatterPlotBounds = {
        xMin, xMax, yMin, yMax,
        innerLeft, innerRight, innerTop, innerBottom
    };
}

let scatterPlotBounds = {};
let residualPlotBounds = {};

function drawResidualPlot() {
    // Background
    fill('white');
    stroke(200);
    strokeWeight(1);
    rect(residualLeft, residualTop, residualWidth, residualHeight, 5);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(12);
    text('Residual Plot', residualLeft + residualWidth / 2, residualTop - 3);

    if (residuals.length === 0) return;

    // Calculate axis ranges
    let xMin = Math.min(...residuals.map(r => r.x));
    let xMax = Math.max(...residuals.map(r => r.x));
    let resMin = Math.min(...residuals.map(r => r.residual));
    let resMax = Math.max(...residuals.map(r => r.residual));

    // Make residual range symmetric around zero
    let resAbs = Math.max(Math.abs(resMin), Math.abs(resMax));
    resMin = -resAbs * 1.2;
    resMax = resAbs * 1.2;

    // Add x padding
    let xPad = (xMax - xMin) * 0.1 || 5;
    xMin -= xPad;
    xMax += xPad;

    let innerLeft = residualLeft + 35;
    let innerRight = residualLeft + residualWidth - 10;
    let innerTop = residualTop + 10;
    let innerBottom = residualTop + residualHeight - 25;

    // Draw axes
    stroke(100);
    strokeWeight(1);
    line(innerLeft, innerBottom, innerRight, innerBottom);
    line(innerLeft, innerTop, innerLeft, innerBottom);

    // Draw zero line (horizontal reference)
    let zeroY = map(0, resMin, resMax, innerBottom, innerTop);
    stroke(sylviaGreen);
    strokeWeight(2);
    setLineDash([5, 5]);
    line(innerLeft, zeroY, innerRight, zeroY);
    setLineDash([]);

    // Label for zero line
    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(9);
    text('0', innerRight + 3, zeroY);

    // Axis labels
    fill(100);
    textAlign(CENTER, TOP);
    textSize(10);
    text('X', (innerLeft + innerRight) / 2, innerBottom + 10);

    push();
    translate(residualLeft + 8, (innerTop + innerBottom) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    text('Residual', 0, 0);
    pop();

    // Draw residual points (animated)
    let pointsToShow = floor(residuals.length * min(animationProgress * 2, 1));

    for (let i = 0; i < pointsToShow; i++) {
        let r = residuals[i];
        let px = map(r.x, xMin, xMax, innerLeft, innerRight);
        let py = map(r.residual, resMin, resMax, innerBottom, innerTop);

        // Color by positive/negative
        let isPositive = r.residual >= 0;

        // Highlight if hovered
        if (i === highlightedPoint) {
            fill(sylviaAuburn);
            stroke(sylviaGreenDark);
            strokeWeight(3);
            circle(px, py, 14);
        } else {
            fill(isPositive ? sylviaGreen : '#E57373');
            stroke(50);
            strokeWeight(1);
            circle(px, py, 10);
        }
    }

    // Store plot bounds for interaction
    residualPlotBounds = {
        xMin, xMax, resMin, resMax,
        innerLeft, innerRight, innerTop, innerBottom
    };
}

function drawConnectingLines() {
    if (dataPoints.length === 0 || residuals.length === 0) return;

    for (let i = 0; i < dataPoints.length; i++) {
        let p = dataPoints[i];
        let r = residuals[i];

        // Calculate positions in scatterplot
        let sx = map(p.x, scatterPlotBounds.xMin, scatterPlotBounds.xMax,
                     scatterPlotBounds.innerLeft, scatterPlotBounds.innerRight);
        let sy = map(p.y, scatterPlotBounds.yMin, scatterPlotBounds.yMax,
                     scatterPlotBounds.innerBottom, scatterPlotBounds.innerTop);

        // Calculate positions in residual plot
        let rx = map(r.x, residualPlotBounds.xMin, residualPlotBounds.xMax,
                     residualPlotBounds.innerLeft, residualPlotBounds.innerRight);
        let ry = map(r.residual, residualPlotBounds.resMin, residualPlotBounds.resMax,
                     residualPlotBounds.innerBottom, residualPlotBounds.innerTop);

        // Draw connecting line
        let alpha = i === highlightedPoint ? 200 : 50;
        stroke(100, 100, 100, alpha);
        strokeWeight(i === highlightedPoint ? 2 : 1);
        line(sx, sy, rx, ry);
    }
}

function drawPatternDiagnosis() {
    let diagY = drawHeight - 35;
    let diagHeight = 30;

    // Background
    fill(255, 255, 255, 230);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(margin, diagY, canvasWidth - 2 * margin, diagHeight, 8);

    noStroke();
    textAlign(CENTER, CENTER);

    if (quizMode && !quizAnswered) {
        // Quiz prompt
        fill('black');
        textSize(12);
        text('What pattern do you see? Click the correct answer above.', canvasWidth / 2, diagY + diagHeight / 2);
    } else {
        // Show diagnosis
        let diagnosis = getPatternDiagnosis();
        fill(diagnosis.color);
        textSize(13);
        text(diagnosis.icon + ' ' + diagnosis.text, canvasWidth / 2, diagY + diagHeight / 2);
    }
}

function getPatternDiagnosis() {
    switch(currentDataset) {
        case 0: // Good fit
            return {
                text: 'Good Fit: Random scatter around zero - linear model is appropriate',
                icon: '',
                color: sylviaGreen
            };
        case 1: // Curved
            return {
                text: 'Curved Pattern: Residuals show systematic curve - try a nonlinear model',
                icon: '',
                color: sylviaAuburn
            };
        case 2: // Fan-shaped
            return {
                text: 'Fan-Shaped: Spread increases with X (heteroscedasticity) - consider transformation',
                icon: '',
                color: '#E57373'
            };
        default:
            return {
                text: 'Select a dataset to analyze',
                icon: '',
                color: 'black'
            };
    }
}

function drawControls() {
    buttons = [];
    let btnY = drawHeight + 12;
    let btnHeight = 30;
    let btnSpacing = 10;

    // Row 1: Dataset selector
    let x = margin;

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Dataset:', x, btnY + btnHeight / 2);
    x += 60;

    for (let i = 0; i < datasetTypes.length; i++) {
        let label = datasetTypes[i];
        let btnWidth = textWidth(label) + 20;
        let isActive = (currentDataset === i) && !quizMode;

        drawDatasetButton(x, btnY, btnWidth, btnHeight, label, i, isActive);
        x += btnWidth + btnSpacing;
    }

    // Row 2: Action buttons
    let btnY2 = drawHeight + 52;
    x = margin;

    // Generate New Data button
    drawButton(x, btnY2, 130, btnHeight - 4, 'Generate New Data', 'generate');
    x += 140;

    // Toggle connecting lines
    drawToggleButton(x, btnY2, 150, btnHeight - 4, 'Show Connections', 'toggleLines', showConnectingLines);
    x += 160;

    // Quiz mode toggle
    drawToggleButton(x, btnY2, 90, btnHeight - 4, 'Quiz Mode', 'toggleQuiz', quizMode);
    x += 100;

    // Instructions
    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Hover over points to see correspondence between plots', canvasWidth / 2, drawHeight + controlHeight - 3);
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
    textSize(11);
    text(label, x + w / 2, y + h / 2);

    buttons.push({ x, y, w, h, action });
}

function drawToggleButton(x, y, w, h, label, action, isOn) {
    let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

    if (isOn) {
        fill(sylviaGreen);
        stroke(sylviaGreenDark);
    } else {
        fill(isHover ? 230 : 240);
        stroke(180);
    }
    strokeWeight(1);
    rect(x, y, w, h, 5);

    fill(isOn ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(label, x + w / 2, y + h / 2);

    buttons.push({ x, y, w, h, action });
}

function drawDatasetButton(x, y, w, h, label, datasetIndex, isActive) {
    let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

    if (quizMode && !quizAnswered) {
        // Quiz mode - all buttons look the same
        fill(isHover ? 230 : 250);
        stroke(180);
    } else if (isActive) {
        fill(sylviaGreen);
        stroke(sylviaGreenDark);
    } else {
        fill(isHover ? 230 : 250);
        stroke(180);
    }

    strokeWeight(1);
    rect(x, y, w, h, 5);

    fill(isActive && !quizMode ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(label, x + w / 2, y + h / 2);

    buttons.push({ x, y, w, h, action: 'dataset', datasetIndex });
}

function checkPointHover() {
    highlightedPoint = -1;

    // Check scatterplot
    if (mouseX >= scatterPlotBounds.innerLeft && mouseX <= scatterPlotBounds.innerRight &&
        mouseY >= scatterPlotBounds.innerTop && mouseY <= scatterPlotBounds.innerBottom) {

        for (let i = 0; i < dataPoints.length; i++) {
            let p = dataPoints[i];
            let px = map(p.x, scatterPlotBounds.xMin, scatterPlotBounds.xMax,
                         scatterPlotBounds.innerLeft, scatterPlotBounds.innerRight);
            let py = map(p.y, scatterPlotBounds.yMin, scatterPlotBounds.yMax,
                         scatterPlotBounds.innerBottom, scatterPlotBounds.innerTop);

            if (dist(mouseX, mouseY, px, py) < 10) {
                highlightedPoint = i;
                break;
            }
        }
    }

    // Check residual plot
    if (mouseX >= residualPlotBounds.innerLeft && mouseX <= residualPlotBounds.innerRight &&
        mouseY >= residualPlotBounds.innerTop && mouseY <= residualPlotBounds.innerBottom) {

        for (let i = 0; i < residuals.length; i++) {
            let r = residuals[i];
            let px = map(r.x, residualPlotBounds.xMin, residualPlotBounds.xMax,
                         residualPlotBounds.innerLeft, residualPlotBounds.innerRight);
            let py = map(r.residual, residualPlotBounds.resMin, residualPlotBounds.resMax,
                         residualPlotBounds.innerBottom, residualPlotBounds.innerTop);

            if (dist(mouseX, mouseY, px, py) < 10) {
                highlightedPoint = i;
                break;
            }
        }
    }
}

function mousePressed() {
    // Check buttons
    for (let btn of buttons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w && mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            handleButtonClick(btn);
            return;
        }
    }
}

function handleButtonClick(btn) {
    switch (btn.action) {
        case 'dataset':
            if (quizMode && !quizAnswered) {
                // Check if answer is correct
                quizAnswered = true;
                quizCorrect = (btn.datasetIndex === currentDataset);
            } else {
                currentDataset = btn.datasetIndex;
                generateData(currentDataset);
            }
            break;

        case 'generate':
            generateData(currentDataset);
            break;

        case 'toggleLines':
            showConnectingLines = !showConnectingLines;
            break;

        case 'toggleQuiz':
            quizMode = !quizMode;
            if (quizMode) {
                // Start quiz with random dataset
                currentDataset = floor(random(3));
                generateData(currentDataset);
                quizAnswered = false;
            }
            break;
    }
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
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
