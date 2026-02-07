// Residual Calculator MicroSim
// Interactive visualization of regression residuals
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 550;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Layout
let margin = 20;
let defaultTextSize = 14;

// Scatterplot dimensions
let plotLeft = 60;
let plotTop = 50;
let plotWidth = 340;
let plotHeight = 300;

// Data storage - start with 8 sample points
let dataPoints = [];
let selectedPointIndex = -1;

// Regression line parameters
let slope = 0;
let intercept = 0;

// UI state
let showAllResiduals = false;
let addingPoint = false;

// Animation
let animationProgress = 0;
let animating = false;

// Button definitions
let buttons = [];

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaGreenDark = '#1B5E20';
let sylviaGreenLight = '#4CAF50';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';
let residualGreen = '#4CAF50';
let residualRed = '#E53935';

// Sample dataset: Study Hours vs Test Scores
let sampleData = [
    { x: 1, y: 52 },
    { x: 2, y: 58 },
    { x: 3, y: 62 },
    { x: 4, y: 71 },
    { x: 5, y: 75 },
    { x: 6, y: 79 },
    { x: 7, y: 85 },
    { x: 8, y: 88 }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textFont('Arial');
    textSize(defaultTextSize);

    // Initialize with sample data
    resetData();

    describe('Interactive residual calculator showing a scatterplot with regression line and vertical residual lines. Click points to see detailed residual calculations.', LABEL);
}

function resetData() {
    dataPoints = sampleData.map(p => ({ ...p }));
    selectedPointIndex = -1;
    showAllResiduals = false;
    addingPoint = false;
    calculateRegression();
}

function calculateRegression() {
    let n = dataPoints.length;
    if (n < 2) {
        slope = 0;
        intercept = 0;
        return;
    }

    // Calculate means
    let sumX = 0, sumY = 0;
    for (let p of dataPoints) {
        sumX += p.x;
        sumY += p.y;
    }
    let meanX = sumX / n;
    let meanY = sumY / n;

    // Calculate slope and intercept using least squares
    let numerator = 0;
    let denominator = 0;
    for (let p of dataPoints) {
        numerator += (p.x - meanX) * (p.y - meanY);
        denominator += (p.x - meanX) * (p.x - meanX);
    }

    if (denominator === 0) {
        slope = 0;
        intercept = meanY;
    } else {
        slope = numerator / denominator;
        intercept = meanY - slope * meanX;
    }
}

function getPredictedY(x) {
    return slope * x + intercept;
}

function getResidual(point) {
    return point.y - getPredictedY(point.x);
}

function draw() {
    updateCanvasSize();
    buttons = [];

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
    text('Residual Calculator', canvasWidth / 2, 10);

    // Subtitle
    textSize(12);
    fill(100);
    text('Click a point to see its residual calculation', canvasWidth / 2, 32);

    // Draw components
    drawScatterplot();
    drawCalculationPanel();
    drawControls();

    // Update animation
    if (animating) {
        animationProgress = min(animationProgress + 0.05, 1);
        if (animationProgress >= 1) {
            animating = false;
        }
    }
}

function drawScatterplot() {
    // Plot background
    fill('white');
    stroke(200);
    strokeWeight(1);
    rect(plotLeft, plotTop, plotWidth, plotHeight, 5);

    if (dataPoints.length === 0) {
        fill(150);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(14);
        text('Click "Add Point" then click here to add data', plotLeft + plotWidth / 2, plotTop + plotHeight / 2);
        return;
    }

    // Calculate axis ranges with padding
    let xMin = Infinity, xMax = -Infinity;
    let yMin = Infinity, yMax = -Infinity;
    for (let p of dataPoints) {
        xMin = min(xMin, p.x);
        xMax = max(xMax, p.x);
        yMin = min(yMin, p.y);
        yMax = max(yMax, p.y);
    }

    let xPad = (xMax - xMin) * 0.15 || 1;
    let yPad = (yMax - yMin) * 0.15 || 5;
    xMin -= xPad;
    xMax += xPad;
    yMin -= yPad;
    yMax += yPad;

    let innerLeft = plotLeft + 35;
    let innerRight = plotLeft + plotWidth - 15;
    let innerTop = plotTop + 15;
    let innerBottom = plotTop + plotHeight - 30;

    // Draw grid lines
    stroke(240);
    strokeWeight(1);
    for (let i = 1; i < 5; i++) {
        let xPos = map(i / 5, 0, 1, innerLeft, innerRight);
        let yPos = map(i / 5, 0, 1, innerBottom, innerTop);
        line(xPos, innerTop, xPos, innerBottom);
        line(innerLeft, yPos, innerRight, yPos);
    }

    // Draw axes
    stroke(100);
    strokeWeight(1.5);
    line(innerLeft, innerBottom, innerRight, innerBottom); // X axis
    line(innerLeft, innerTop, innerLeft, innerBottom); // Y axis

    // Axis labels
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text('X (Hours Studied)', (innerLeft + innerRight) / 2, innerBottom + 15);

    push();
    translate(plotLeft + 8, (innerTop + innerBottom) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    text('Y (Test Score)', 0, 0);
    pop();

    // Tick marks and values
    textSize(9);
    for (let i = 0; i <= 4; i++) {
        let xVal = xMin + (xMax - xMin) * i / 4;
        let xPos = map(xVal, xMin, xMax, innerLeft, innerRight);
        stroke(150);
        line(xPos, innerBottom, xPos, innerBottom + 4);
        noStroke();
        fill(100);
        textAlign(CENTER, TOP);
        text(xVal.toFixed(1), xPos, innerBottom + 5);

        let yVal = yMin + (yMax - yMin) * i / 4;
        let yPos = map(yVal, yMin, yMax, innerBottom, innerTop);
        stroke(150);
        line(innerLeft - 4, yPos, innerLeft, yPos);
        noStroke();
        textAlign(RIGHT, CENTER);
        text(yVal.toFixed(0), innerLeft - 6, yPos);
    }

    // Draw regression line
    if (dataPoints.length >= 2) {
        let x1 = xMin;
        let x2 = xMax;
        let y1 = getPredictedY(x1);
        let y2 = getPredictedY(x2);

        // Clamp to visible area
        let px1 = map(x1, xMin, xMax, innerLeft, innerRight);
        let px2 = map(x2, xMin, xMax, innerLeft, innerRight);
        let py1 = map(y1, yMin, yMax, innerBottom, innerTop);
        let py2 = map(y2, yMin, yMax, innerBottom, innerTop);

        stroke(sylviaAuburn);
        strokeWeight(2);
        line(px1, py1, px2, py2);

        // Regression equation label
        fill(sylviaAuburn);
        noStroke();
        textAlign(LEFT, TOP);
        textSize(11);
        let eqStr = 'y = ' + slope.toFixed(2) + 'x + ' + intercept.toFixed(2);
        text(eqStr, innerRight - 100, innerTop + 5);
    }

    // Draw residual lines
    for (let i = 0; i < dataPoints.length; i++) {
        let p = dataPoints[i];
        let px = map(p.x, xMin, xMax, innerLeft, innerRight);
        let py = map(p.y, yMin, yMax, innerBottom, innerTop);
        let predictedY = getPredictedY(p.x);
        let pyHat = map(predictedY, yMin, yMax, innerBottom, innerTop);
        let residual = getResidual(p);

        let showThis = showAllResiduals || i === selectedPointIndex;

        if (showThis) {
            // Animate residual line for selected point
            let lineProgress = (i === selectedPointIndex && animating) ? animationProgress : 1;
            let currentPy = pyHat + (py - pyHat) * lineProgress;

            // Draw residual line
            stroke(residual >= 0 ? residualGreen : residualRed);
            strokeWeight(2);
            setLineDash([4, 4]);
            line(px, pyHat, px, currentPy);
            setLineDash([]);

            // Draw predicted point on line
            fill('white');
            stroke(sylviaAuburn);
            strokeWeight(1.5);
            circle(px, pyHat, 8);
        }
    }

    // Draw data points
    for (let i = 0; i < dataPoints.length; i++) {
        let p = dataPoints[i];
        let px = map(p.x, xMin, xMax, innerLeft, innerRight);
        let py = map(p.y, yMin, yMax, innerBottom, innerTop);
        let residual = getResidual(p);

        let isSelected = i === selectedPointIndex;
        let pointSize = isSelected ? 18 : 12;

        // Color based on residual sign
        if (showAllResiduals || isSelected) {
            fill(residual >= 0 ? residualGreen : residualRed);
        } else {
            fill(100, 149, 237);
        }

        stroke(isSelected ? 'black' : 50);
        strokeWeight(isSelected ? 2 : 1);
        circle(px, py, pointSize);

        // Point label
        fill('white');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(isSelected ? 10 : 8);
        text(i + 1, px, py);
    }

    // Show sum of residuals
    if (showAllResiduals && dataPoints.length >= 2) {
        let sumResiduals = 0;
        for (let p of dataPoints) {
            sumResiduals += getResidual(p);
        }

        fill(255, 255, 255, 230);
        stroke(sylviaGreen);
        strokeWeight(1);
        rect(innerLeft + 5, innerTop + 5, 120, 35, 5);

        fill(sylviaGreen);
        noStroke();
        textAlign(LEFT, TOP);
        textSize(10);
        text('Sum of Residuals:', innerLeft + 10, innerTop + 10);
        textSize(12);
        text(sumResiduals.toFixed(4), innerLeft + 10, innerTop + 23);
    }

    // Adding point mode indicator
    if (addingPoint) {
        fill(255, 255, 200);
        stroke(sylviaAuburn);
        strokeWeight(1);
        rect(plotLeft + plotWidth / 2 - 80, plotTop + plotHeight / 2 - 15, 160, 30, 5);

        fill(sylviaAuburn);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        text('Click to add a point', plotLeft + plotWidth / 2, plotTop + plotHeight / 2);
    }
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function drawCalculationPanel() {
    let panelLeft = plotLeft + plotWidth + 20;
    let panelTop = plotTop;
    let panelWidth = canvasWidth - panelLeft - 15;
    let panelHeight = plotHeight;

    // Panel background
    fill(sylviaCream);
    stroke(200);
    strokeWeight(1);
    rect(panelLeft, panelTop, panelWidth, panelHeight, 8);

    // Panel title
    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Calculation', panelLeft + panelWidth / 2, panelTop + 10);

    if (selectedPointIndex === -1) {
        fill(100);
        textSize(11);
        textAlign(CENTER, CENTER);
        text('Select a point\nto see its\nresidual\ncalculation', panelLeft + panelWidth / 2, panelTop + panelHeight / 2);
        return;
    }

    let p = dataPoints[selectedPointIndex];
    let yHat = getPredictedY(p.x);
    let residual = getResidual(p);

    let lineY = panelTop + 35;
    let lineHeight = 24;
    let indent = panelLeft + 10;

    // Point info
    fill('black');
    textAlign(LEFT, TOP);
    textSize(12);
    text('Point ' + (selectedPointIndex + 1) + ':', indent, lineY);
    lineY += lineHeight;

    // Actual values
    textSize(11);
    text('x = ' + p.x.toFixed(2), indent, lineY);
    lineY += lineHeight * 0.8;

    fill(100, 149, 237);
    text('y = ' + p.y.toFixed(2) + ' (actual)', indent, lineY);
    lineY += lineHeight * 1.2;

    // Predicted value calculation
    fill('black');
    text('Predicted:', indent, lineY);
    lineY += lineHeight * 0.8;

    fill(sylviaAuburn);
    textSize(10);
    text('y = ' + slope.toFixed(2) + 'x + ' + intercept.toFixed(2), indent, lineY);
    lineY += lineHeight * 0.8;

    text('y = ' + slope.toFixed(2) + '(' + p.x.toFixed(2) + ') + ' + intercept.toFixed(2), indent, lineY);
    lineY += lineHeight * 0.8;

    textSize(11);
    text('y = ' + yHat.toFixed(2), indent, lineY);
    lineY += lineHeight * 1.3;

    // Residual calculation
    fill('black');
    text('Residual:', indent, lineY);
    lineY += lineHeight * 0.8;

    fill(residual >= 0 ? residualGreen : residualRed);
    textSize(10);
    text('e = y - y', indent, lineY);
    lineY += lineHeight * 0.8;

    text('e = ' + p.y.toFixed(2) + ' - ' + yHat.toFixed(2), indent, lineY);
    lineY += lineHeight * 0.8;

    // Final residual value with emphasis
    textSize(14);
    textStyle(BOLD);
    text('e = ' + residual.toFixed(4), indent, lineY);
    textStyle(NORMAL);
    lineY += lineHeight * 1.3;

    // Interpretation
    fill(100);
    textSize(10);
    if (residual > 0) {
        text('Point is ABOVE', indent, lineY);
        lineY += lineHeight * 0.7;
        text('the regression line', indent, lineY);
        lineY += lineHeight * 0.7;
        text('(underpredicted)', indent, lineY);
    } else if (residual < 0) {
        text('Point is BELOW', indent, lineY);
        lineY += lineHeight * 0.7;
        text('the regression line', indent, lineY);
        lineY += lineHeight * 0.7;
        text('(overpredicted)', indent, lineY);
    } else {
        text('Point is ON', indent, lineY);
        lineY += lineHeight * 0.7;
        text('the regression line', indent, lineY);
    }
}

function drawControls() {
    let btnY = drawHeight + 15;
    let btnHeight = 30;
    let btnSpacing = 10;
    let x = 20;

    // Show All Residuals toggle
    drawToggleButton(x, btnY, 130, btnHeight, 'Show All Residuals', showAllResiduals, 'toggleShowAll');
    x += 130 + btnSpacing;

    // Add Point button
    drawButton(x, btnY, 90, btnHeight, addingPoint ? 'Cancel Add' : 'Add Point', 'addPoint', addingPoint);
    x += 90 + btnSpacing;

    // Remove Selected button
    let canRemove = selectedPointIndex !== -1 && dataPoints.length > 2;
    drawButton(x, btnY, 115, btnHeight, 'Remove Selected', 'removeSelected', false, !canRemove);
    x += 115 + btnSpacing;

    // Reset button
    drawButton(x, btnY, 70, btnHeight, 'Reset', 'reset');

    // Second row - Statistics
    let statsY = drawHeight + 55;

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);

    text('Points: ' + dataPoints.length, 20, statsY + 15);

    if (dataPoints.length >= 2) {
        text('Slope: ' + slope.toFixed(3), 90, statsY + 15);
        text('Intercept: ' + intercept.toFixed(3), 180, statsY + 15);

        // Sum of squared residuals
        let ssr = 0;
        for (let p of dataPoints) {
            ssr += getResidual(p) ** 2;
        }
        text('SSR: ' + ssr.toFixed(3), 300, statsY + 15);
    }

    // Instructions
    fill(100);
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Residual = Actual y - Predicted y. Green = above line (positive), Red = below line (negative)', canvasWidth / 2, drawHeight + controlHeight - 5);
}

function drawButton(x, y, w, h, label, action, isActive = false, isDisabled = false) {
    let isHover = !isDisabled && mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

    if (isDisabled) {
        fill(220);
        stroke(180);
    } else if (isActive) {
        fill(sylviaAuburn);
        stroke(sylviaAuburn);
    } else if (isHover) {
        fill(sylviaGreen);
        stroke(sylviaGreenDark);
    } else {
        fill(240);
        stroke(180);
    }
    strokeWeight(1);
    rect(x, y, w, h, 5);

    if (isDisabled) {
        fill(150);
    } else if (isHover || isActive) {
        fill('white');
    } else {
        fill('black');
    }
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(label, x + w / 2, y + h / 2);

    if (!isDisabled) {
        buttons.push({ x, y, w, h, action });
    }
}

function drawToggleButton(x, y, w, h, label, isOn, action) {
    let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

    // Button background
    fill(isOn ? sylviaGreen : (isHover ? 230 : 240));
    stroke(isOn ? sylviaGreenDark : 180);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Toggle indicator
    let toggleX = x + 8;
    let toggleY = y + h / 2;
    let toggleW = 24;
    let toggleH = 14;

    fill(isOn ? sylviaGreenDark : 200);
    noStroke();
    rect(toggleX, toggleY - toggleH / 2, toggleW, toggleH, 7);

    fill('white');
    let knobX = isOn ? toggleX + toggleW - 7 : toggleX + 7;
    circle(knobX, toggleY, 10);

    // Label
    fill(isOn ? 'white' : 'black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text(label, x + 38, y + h / 2);

    buttons.push({ x, y, w, h, action });
}

function mousePressed() {
    // Check buttons first
    for (let btn of buttons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w && mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            handleButtonClick(btn.action);
            return;
        }
    }

    // Check if clicking in scatterplot area
    let innerLeft = plotLeft + 35;
    let innerRight = plotLeft + plotWidth - 15;
    let innerTop = plotTop + 15;
    let innerBottom = plotTop + plotHeight - 30;

    if (mouseX >= innerLeft && mouseX <= innerRight && mouseY >= innerTop && mouseY <= innerBottom) {
        if (addingPoint && dataPoints.length > 0) {
            // Add new point
            let xMin = Infinity, xMax = -Infinity;
            let yMin = Infinity, yMax = -Infinity;
            for (let p of dataPoints) {
                xMin = min(xMin, p.x);
                xMax = max(xMax, p.x);
                yMin = min(yMin, p.y);
                yMax = max(yMax, p.y);
            }
            let xPad = (xMax - xMin) * 0.15 || 1;
            let yPad = (yMax - yMin) * 0.15 || 5;
            xMin -= xPad;
            xMax += xPad;
            yMin -= yPad;
            yMax += yPad;

            let newX = map(mouseX, innerLeft, innerRight, xMin, xMax);
            let newY = map(mouseY, innerBottom, innerTop, yMin, yMax);

            dataPoints.push({ x: newX, y: newY });
            calculateRegression();
            selectedPointIndex = dataPoints.length - 1;
            addingPoint = false;
            animating = true;
            animationProgress = 0;
            return;
        }

        // Check if clicking on a point
        let xMin = Infinity, xMax = -Infinity;
        let yMin = Infinity, yMax = -Infinity;
        for (let p of dataPoints) {
            xMin = min(xMin, p.x);
            xMax = max(xMax, p.x);
            yMin = min(yMin, p.y);
            yMax = max(yMax, p.y);
        }
        let xPad = (xMax - xMin) * 0.15 || 1;
        let yPad = (yMax - yMin) * 0.15 || 5;
        xMin -= xPad;
        xMax += xPad;
        yMin -= yPad;
        yMax += yPad;

        for (let i = 0; i < dataPoints.length; i++) {
            let p = dataPoints[i];
            let px = map(p.x, xMin, xMax, innerLeft, innerRight);
            let py = map(p.y, yMin, yMax, innerBottom, innerTop);

            if (dist(mouseX, mouseY, px, py) < 15) {
                selectedPointIndex = i;
                animating = true;
                animationProgress = 0;
                return;
            }
        }

        // Clicked in plot but not on a point - deselect
        selectedPointIndex = -1;
    }
}

function handleButtonClick(action) {
    switch (action) {
        case 'toggleShowAll':
            showAllResiduals = !showAllResiduals;
            break;
        case 'addPoint':
            addingPoint = !addingPoint;
            break;
        case 'removeSelected':
            if (selectedPointIndex !== -1 && dataPoints.length > 2) {
                dataPoints.splice(selectedPointIndex, 1);
                selectedPointIndex = -1;
                calculateRegression();
            }
            break;
        case 'reset':
            resetData();
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
    canvasWidth = max(550, containerWidth);

    // Adjust plot width based on canvas width
    plotWidth = canvasWidth - 230;
}
