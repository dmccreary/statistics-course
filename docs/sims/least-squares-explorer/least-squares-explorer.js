// Least Squares Explorer MicroSim
// Interactive visualization of how least squares regression minimizes squared residuals
// Students can drag data points and see the regression line and residual squares update in real-time
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 500;
let drawHeight = 350;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 14;

// Plot dimensions
let plotLeft, plotTop, plotWidth, plotHeight;
let plotPadding = 45;

// Data points - array of {x, y} objects
let dataPoints = [];
let numPoints = 10;
let draggingPoint = -1;
let hoveredPoint = -1;

// Regression calculations
let slope = 0;
let intercept = 0;
let meanX = 0;
let meanY = 0;
let sumSquaredResiduals = 0;

// Axis range
let xMin = 0, xMax = 100;
let yMin = 0, yMax = 100;

// UI State
let showSquares = true;
let buttons = [];

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaGreenDark = '#1B5E20';
let sylviaGreenLight = '#4CAF50';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';

// Colors for visualization
let residualColor;
let squareColor;
let lineColor;
let pointColor;
let pointHoverColor;
let meanPointColor;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textFont('Arial');
    textSize(defaultTextSize);

    // Initialize colors
    residualColor = color(255, 100, 100, 180);
    squareColor = color(255, 150, 150, 80);
    lineColor = color(sylviaGreen);
    pointColor = color(100, 149, 237);
    pointHoverColor = color(sylviaAuburn);
    meanPointColor = color(sylviaAuburn);

    // Generate initial data points
    generateDefaultPoints();
    calculateRegression();

    describe('Interactive least squares regression explorer. Students can drag data points to see how the regression line and sum of squared residuals change in real-time. Residual squares are visualized to show what the least squares method minimizes.', LABEL);
}

function generateDefaultPoints() {
    dataPoints = [];
    // Create points with a general positive trend plus noise
    let baseSlope = 0.6;
    let baseIntercept = 20;

    for (let i = 0; i < numPoints; i++) {
        let x = 10 + i * 8 + random(-3, 3);
        let noise = random(-15, 15);
        let y = baseSlope * x + baseIntercept + noise;

        // Keep within bounds
        x = constrain(x, 5, 95);
        y = constrain(y, 5, 95);

        dataPoints.push({x: x, y: y});
    }
}

function generateRandomPoints() {
    dataPoints = [];

    // Randomly choose a pattern
    let pattern = floor(random(4));

    for (let i = 0; i < numPoints; i++) {
        let x, y;

        switch(pattern) {
            case 0: // Positive correlation
                x = random(10, 90);
                y = 0.7 * x + random(-15, 15) + 10;
                break;
            case 1: // Negative correlation
                x = random(10, 90);
                y = -0.6 * x + 80 + random(-15, 15);
                break;
            case 2: // Weak correlation
                x = random(10, 90);
                y = 0.2 * x + 35 + random(-25, 25);
                break;
            case 3: // Scattered
                x = random(10, 90);
                y = random(15, 85);
                break;
        }

        // Keep within bounds
        x = constrain(x, 5, 95);
        y = constrain(y, 5, 95);

        dataPoints.push({x: x, y: y});
    }

    calculateRegression();
}

function calculateRegression() {
    if (dataPoints.length < 2) {
        slope = 0;
        intercept = 50;
        meanX = 50;
        meanY = 50;
        sumSquaredResiduals = 0;
        return;
    }

    // Calculate means
    let sumX = 0, sumY = 0;
    for (let pt of dataPoints) {
        sumX += pt.x;
        sumY += pt.y;
    }
    meanX = sumX / dataPoints.length;
    meanY = sumY / dataPoints.length;

    // Calculate slope using least squares formula
    // slope = sum((x - meanX)(y - meanY)) / sum((x - meanX)^2)
    let numerator = 0;
    let denominator = 0;

    for (let pt of dataPoints) {
        let dx = pt.x - meanX;
        let dy = pt.y - meanY;
        numerator += dx * dy;
        denominator += dx * dx;
    }

    if (denominator === 0) {
        slope = 0;
    } else {
        slope = numerator / denominator;
    }

    // Calculate intercept: intercept = meanY - slope * meanX
    intercept = meanY - slope * meanX;

    // Calculate sum of squared residuals
    sumSquaredResiduals = 0;
    for (let pt of dataPoints) {
        let predictedY = slope * pt.x + intercept;
        let residual = pt.y - predictedY;
        sumSquaredResiduals += residual * residual;
    }
}

function draw() {
    updateCanvasSize();

    // Calculate plot dimensions
    plotLeft = plotPadding;
    plotTop = 40;
    plotWidth = canvasWidth - plotPadding - 30;
    plotHeight = drawHeight - plotTop - 50;

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
    text('Least Squares Explorer', canvasWidth / 2, 8);

    // Draw components
    drawPlot();
    drawControls();

    // Update cursor
    if (draggingPoint >= 0 || hoveredPoint >= 0) {
        cursor('grab');
    } else {
        cursor(ARROW);
    }
}

function drawPlot() {
    // Plot background
    fill(255);
    stroke(150);
    strokeWeight(1);
    rect(plotLeft, plotTop, plotWidth, plotHeight);

    // Grid lines
    stroke(230);
    strokeWeight(1);

    // Vertical grid lines
    for (let i = 1; i < 5; i++) {
        let x = plotLeft + (plotWidth * i / 5);
        line(x, plotTop, x, plotTop + plotHeight);
    }

    // Horizontal grid lines
    for (let i = 1; i < 5; i++) {
        let y = plotTop + (plotHeight * i / 5);
        line(plotLeft, y, plotLeft + plotWidth, y);
    }

    // Draw axes
    stroke(100);
    strokeWeight(2);
    line(plotLeft, plotTop + plotHeight, plotLeft + plotWidth, plotTop + plotHeight); // X-axis
    line(plotLeft, plotTop, plotLeft, plotTop + plotHeight); // Y-axis

    // Axis labels
    fill(80);
    noStroke();
    textSize(10);

    // X-axis labels
    textAlign(CENTER, TOP);
    for (let i = 0; i <= 5; i++) {
        let val = xMin + (xMax - xMin) * i / 5;
        let x = plotLeft + (plotWidth * i / 5);
        text(Math.round(val), x, plotTop + plotHeight + 5);
    }

    // Y-axis labels
    textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 5; i++) {
        let val = yMin + (yMax - yMin) * i / 5;
        let y = plotTop + plotHeight - (plotHeight * i / 5);
        text(Math.round(val), plotLeft - 5, y);
    }

    // Axis titles
    fill('black');
    textSize(12);
    textAlign(CENTER, TOP);
    text('X', plotLeft + plotWidth / 2, plotTop + plotHeight + 18);

    push();
    translate(12, plotTop + plotHeight / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text('Y', 0, 0);
    pop();

    // Draw residual squares if enabled
    if (showSquares) {
        drawResidualSquares();
    }

    // Draw residual lines (always visible)
    drawResidualLines();

    // Draw regression line
    drawRegressionLine();

    // Draw mean point indicator
    drawMeanPoint();

    // Draw data points
    drawDataPoints();

    // Draw statistics display
    drawStatistics();
}

function drawResidualSquares() {
    for (let i = 0; i < dataPoints.length; i++) {
        let pt = dataPoints[i];
        let px = map(pt.x, xMin, xMax, plotLeft, plotLeft + plotWidth);
        let py = map(pt.y, yMin, yMax, plotTop + plotHeight, plotTop);

        let predictedY = slope * pt.x + intercept;
        let predPy = map(predictedY, yMin, yMax, plotTop + plotHeight, plotTop);

        let residualPixels = py - predPy;
        let squareSize = abs(residualPixels);

        // Draw square on the side of the point opposite to the line
        fill(squareColor);
        stroke(residualColor);
        strokeWeight(1);

        if (residualPixels > 0) {
            // Point is above line - draw square to the right
            rect(px, predPy, squareSize, squareSize);
        } else if (residualPixels < 0) {
            // Point is below line - draw square to the right, going up
            rect(px, py, squareSize, -residualPixels);
        }
    }
}

function drawResidualLines() {
    stroke(residualColor);
    strokeWeight(2);

    for (let pt of dataPoints) {
        let px = map(pt.x, xMin, xMax, plotLeft, plotLeft + plotWidth);
        let py = map(pt.y, yMin, yMax, plotTop + plotHeight, plotTop);

        let predictedY = slope * pt.x + intercept;
        let predPy = map(predictedY, yMin, yMax, plotTop + plotHeight, plotTop);

        line(px, py, px, predPy);
    }
}

function drawRegressionLine() {
    // Calculate line endpoints at plot boundaries
    let x1 = xMin;
    let y1 = slope * x1 + intercept;
    let x2 = xMax;
    let y2 = slope * x2 + intercept;

    // Convert to pixel coordinates
    let px1 = map(x1, xMin, xMax, plotLeft, plotLeft + plotWidth);
    let py1 = map(y1, yMin, yMax, plotTop + plotHeight, plotTop);
    let px2 = map(x2, xMin, xMax, plotLeft, plotLeft + plotWidth);
    let py2 = map(y2, yMin, yMax, plotTop + plotHeight, plotTop);

    // Clip to plot area
    px1 = constrain(px1, plotLeft, plotLeft + plotWidth);
    px2 = constrain(px2, plotLeft, plotLeft + plotWidth);
    py1 = constrain(py1, plotTop, plotTop + plotHeight);
    py2 = constrain(py2, plotTop, plotTop + plotHeight);

    stroke(lineColor);
    strokeWeight(3);
    line(px1, py1, px2, py2);
}

function drawMeanPoint() {
    let px = map(meanX, xMin, xMax, plotLeft, plotLeft + plotWidth);
    let py = map(meanY, yMin, yMax, plotTop + plotHeight, plotTop);

    // Draw crosshair at mean point
    stroke(meanPointColor);
    strokeWeight(2);
    setLineDash([4, 4]);

    // Vertical line through mean
    line(px, plotTop, px, plotTop + plotHeight);
    // Horizontal line through mean
    line(plotLeft, py, plotLeft + plotWidth, py);

    setLineDash([]);

    // Draw mean point marker
    fill(meanPointColor);
    stroke(50);
    strokeWeight(2);
    circle(px, py, 12);

    // Label
    fill(sylviaAuburn);
    noStroke();
    textAlign(LEFT, BOTTOM);
    textSize(10);
    text('(x\u0305, y\u0305)', px + 8, py - 3);
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function drawDataPoints() {
    hoveredPoint = -1;

    for (let i = 0; i < dataPoints.length; i++) {
        let pt = dataPoints[i];
        let px = map(pt.x, xMin, xMax, plotLeft, plotLeft + plotWidth);
        let py = map(pt.y, yMin, yMax, plotTop + plotHeight, plotTop);

        // Check for hover
        let d = dist(mouseX, mouseY, px, py);
        let isHovered = d < 15 && draggingPoint < 0;
        let isDragging = draggingPoint === i;

        if (isHovered && !isDragging) {
            hoveredPoint = i;
        }

        // Draw point
        if (isDragging) {
            fill(pointHoverColor);
            stroke(50);
            strokeWeight(3);
            circle(px, py, 20);
        } else if (isHovered) {
            fill(pointHoverColor);
            stroke(50);
            strokeWeight(2);
            circle(px, py, 18);
        } else {
            fill(pointColor);
            stroke(50);
            strokeWeight(1.5);
            circle(px, py, 14);
        }

        // Point number
        fill('white');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(9);
        text(i + 1, px, py);
    }
}

function drawStatistics() {
    // Statistics box
    let boxX = plotLeft + plotWidth - 180;
    let boxY = plotTop + 10;
    let boxW = 170;
    let boxH = 80;

    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(boxX, boxY, boxW, boxH, 8);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);

    let lineHeight = 16;
    let textX = boxX + 10;
    let textY = boxY + 8;

    // Equation of line
    fill(sylviaGreen);
    textSize(12);
    let slopeStr = slope >= 0 ? slope.toFixed(3) : '(' + slope.toFixed(3) + ')';
    text('y\u0302 = ' + intercept.toFixed(2) + ' + ' + slopeStr + 'x', textX, textY);

    textY += lineHeight + 4;

    // Mean point
    fill('black');
    textSize(10);
    text('Mean: (x\u0305, y\u0305) = (' + meanX.toFixed(1) + ', ' + meanY.toFixed(1) + ')', textX, textY);

    textY += lineHeight;

    // Sum of squared residuals
    fill(sylviaAuburn);
    textSize(11);
    text('Sum of Squared Residuals:', textX, textY);

    textY += lineHeight;
    textSize(14);
    text('SSR = ' + sumSquaredResiduals.toFixed(2), textX, textY);
}

function drawControls() {
    buttons = [];

    let btnY = drawHeight + 15;
    let btnHeight = 30;
    let btnSpacing = 10;
    let x = 15;

    // Reset Points button
    drawButton(x, btnY, 100, btnHeight, 'Reset Points', 'reset');
    x += 100 + btnSpacing;

    // Random Points button
    drawButton(x, btnY, 115, btnHeight, 'Random Points', 'random');
    x += 115 + btnSpacing;

    // Toggle Squares button
    let squaresLabel = showSquares ? 'Hide Squares' : 'Show Squares';
    drawButton(x, btnY, 110, btnHeight, squaresLabel, 'toggleSquares');
    x += 110 + btnSpacing;

    // Instructions
    fill('gray');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Drag points to see how the regression line adjusts to minimize squared residuals.', 15, drawHeight + 58);

    // Sylvia tip
    fill('darkgreen');
    textSize(11);
    text("Tip from Sylvia: \"The line always passes through (x\u0305, y\u0305) - that's the fulcrum!", 15, drawHeight + 75);
    text("Watch the SSR change as you move points. Least squares finds the minimum!\"", 15, drawHeight + 90);
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
    // Check buttons first
    for (let btn of buttons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            handleButtonClick(btn.action);
            return;
        }
    }

    // Check if clicking on a point to drag
    for (let i = 0; i < dataPoints.length; i++) {
        let pt = dataPoints[i];
        let px = map(pt.x, xMin, xMax, plotLeft, plotLeft + plotWidth);
        let py = map(pt.y, yMin, yMax, plotTop + plotHeight, plotTop);

        if (dist(mouseX, mouseY, px, py) < 15) {
            draggingPoint = i;
            return;
        }
    }
}

function mouseDragged() {
    if (draggingPoint >= 0) {
        // Convert mouse position to data coordinates
        let newX = map(mouseX, plotLeft, plotLeft + plotWidth, xMin, xMax);
        let newY = map(mouseY, plotTop + plotHeight, plotTop, yMin, yMax);

        // Constrain to plot area
        newX = constrain(newX, xMin + 2, xMax - 2);
        newY = constrain(newY, yMin + 2, yMax - 2);

        dataPoints[draggingPoint].x = newX;
        dataPoints[draggingPoint].y = newY;

        // Recalculate regression
        calculateRegression();
    }
}

function mouseReleased() {
    draggingPoint = -1;
}

function handleButtonClick(action) {
    switch(action) {
        case 'reset':
            generateDefaultPoints();
            calculateRegression();
            break;
        case 'random':
            generateRandomPoints();
            break;
        case 'toggleSquares':
            showSquares = !showSquares;
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
