// Slope-Intercept Explorer MicroSim
// Interactive visualization for understanding regression line parameters
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 550;
let drawHeight = 350;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Layout
let margin = 20;
let defaultTextSize = 14;

// Coordinate plane dimensions
let plotLeft, plotTop, plotWidth, plotHeight;

// Static reference data points (study hours vs exam scores)
let dataPoints = [
    { x: 2, y: 55 },
    { x: 3, y: 62 },
    { x: 4, y: 68 },
    { x: 5.5, y: 78 },
    { x: 6, y: 82 },
    { x: 7, y: 88 },
    { x: 8, y: 92 }
];

// Axis ranges
let xMin = 0, xMax = 10;
let yMin = 30, yMax = 100;

// User-controlled parameters
let userSlope = 1.0;
let userIntercept = 50;

// Best fit line parameters (calculated from data)
let bestSlope = 0;
let bestIntercept = 0;

// UI state
let showBestFit = false;
let slopeSlider = { x: 0, y: 0, width: 120, height: 12, dragging: false };
let interceptSlider = { x: 0, y: 0, width: 120, height: 12, dragging: false };
let showBestFitButton = { x: 0, y: 0, width: 0, height: 0 };
let buttons = [];

// Mouse tracking for prediction
let mouseXInPlot = false;
let predictionX = 5;
let predictionY = 0;

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaGreenDark = '#1B5E20';
let sylviaGreenLight = '#4CAF50';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textFont('Arial');
    textSize(defaultTextSize);

    // Calculate best fit line (Least Squares Regression Line)
    calculateBestFit();

    describe('Interactive slope-intercept explorer showing how changes to slope and y-intercept affect the regression line. Students can adjust sliders and see predictions update in real-time.', LABEL);
}

function calculateBestFit() {
    // Calculate LSRL using least squares method
    let n = dataPoints.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    for (let p of dataPoints) {
        sumX += p.x;
        sumY += p.y;
        sumXY += p.x * p.y;
        sumX2 += p.x * p.x;
    }

    let meanX = sumX / n;
    let meanY = sumY / n;

    bestSlope = (sumXY - n * meanX * meanY) / (sumX2 - n * meanX * meanX);
    bestIntercept = meanY - bestSlope * meanX;
}

function calculateSSR(slope, intercept) {
    // Calculate sum of squared residuals
    let ssr = 0;
    for (let p of dataPoints) {
        let predicted = intercept + slope * p.x;
        let residual = p.y - predicted;
        ssr += residual * residual;
    }
    return ssr;
}

function draw() {
    updateCanvasSize();

    // Calculate plot dimensions
    plotLeft = 55;
    plotTop = 50;
    plotWidth = canvasWidth - plotLeft - 20;
    plotHeight = drawHeight - plotTop - 40;

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
    text('Slope-Intercept Explorer', canvasWidth / 2, 10);

    // Subtitle with equation
    textSize(14);
    fill(sylviaGreen);
    let equationText = 'y = ' + userIntercept.toFixed(1) + ' + ' + userSlope.toFixed(1) + 'x';
    text(equationText, canvasWidth / 2, 32);

    // Draw components
    drawCoordinatePlane();
    drawUserLine();
    if (showBestFit) {
        drawBestFitLine();
    }
    drawDataPoints();
    drawRiseRunAnnotation();
    drawPredictionMarker();
    drawInfoPanel();
    drawControls();
}

function drawCoordinatePlane() {
    // Plot background
    fill('white');
    stroke(200);
    strokeWeight(1);
    rect(plotLeft, plotTop, plotWidth, plotHeight);

    // Grid lines
    stroke(230);
    strokeWeight(1);

    // Vertical grid lines
    for (let x = 0; x <= xMax; x += 2) {
        let px = map(x, xMin, xMax, plotLeft, plotLeft + plotWidth);
        line(px, plotTop, px, plotTop + plotHeight);
    }

    // Horizontal grid lines
    for (let y = yMin; y <= yMax; y += 10) {
        let py = map(y, yMin, yMax, plotTop + plotHeight, plotTop);
        line(plotLeft, py, plotLeft + plotWidth, py);
    }

    // Axes
    stroke(80);
    strokeWeight(2);
    // X-axis
    let xAxisY = map(yMin, yMin, yMax, plotTop + plotHeight, plotTop);
    line(plotLeft, xAxisY, plotLeft + plotWidth, xAxisY);
    // Y-axis
    line(plotLeft, plotTop, plotLeft, plotTop + plotHeight);

    // Axis labels
    fill('black');
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('Study Hours (x)', plotLeft + plotWidth / 2, plotTop + plotHeight + 22);

    push();
    translate(15, plotTop + plotHeight / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    text('Exam Score (y)', 0, 0);
    pop();

    // Tick marks and values
    textSize(10);
    textAlign(CENTER, TOP);
    for (let x = 0; x <= xMax; x += 2) {
        let px = map(x, xMin, xMax, plotLeft, plotLeft + plotWidth);
        stroke(80);
        strokeWeight(1);
        line(px, plotTop + plotHeight, px, plotTop + plotHeight + 4);
        noStroke();
        fill(80);
        text(x, px, plotTop + plotHeight + 6);
    }

    textAlign(RIGHT, CENTER);
    for (let y = yMin; y <= yMax; y += 10) {
        let py = map(y, yMin, yMax, plotTop + plotHeight, plotTop);
        stroke(80);
        strokeWeight(1);
        line(plotLeft - 4, py, plotLeft, py);
        noStroke();
        fill(80);
        text(y, plotLeft - 6, py);
    }
}

function drawUserLine() {
    // Calculate line endpoints
    let y1 = userIntercept + userSlope * xMin;
    let y2 = userIntercept + userSlope * xMax;

    // Clip to visible area
    let startX = xMin, endX = xMax;
    let startY = y1, endY = y2;

    // Convert to pixel coordinates
    let px1 = map(startX, xMin, xMax, plotLeft, plotLeft + plotWidth);
    let py1 = map(startY, yMin, yMax, plotTop + plotHeight, plotTop);
    let px2 = map(endX, xMin, xMax, plotLeft, plotLeft + plotWidth);
    let py2 = map(endY, yMin, yMax, plotTop + plotHeight, plotTop);

    // Draw line
    stroke(sylviaAuburn);
    strokeWeight(3);
    line(px1, py1, px2, py2);

    // Label the line
    fill(sylviaAuburn);
    noStroke();
    textSize(11);
    textAlign(LEFT, BOTTOM);
    let labelX = map(8.5, xMin, xMax, plotLeft, plotLeft + plotWidth);
    let labelY = map(userIntercept + userSlope * 8.5, yMin, yMax, plotTop + plotHeight, plotTop);
    labelY = constrain(labelY, plotTop + 15, plotTop + plotHeight - 5);
    text('Your Line', labelX, labelY - 5);
}

function drawBestFitLine() {
    // Calculate line endpoints
    let y1 = bestIntercept + bestSlope * xMin;
    let y2 = bestIntercept + bestSlope * xMax;

    // Convert to pixel coordinates
    let px1 = map(xMin, xMin, xMax, plotLeft, plotLeft + plotWidth);
    let py1 = map(y1, yMin, yMax, plotTop + plotHeight, plotTop);
    let px2 = map(xMax, xMin, xMax, plotLeft, plotLeft + plotWidth);
    let py2 = map(y2, yMin, yMax, plotTop + plotHeight, plotTop);

    // Draw dashed line
    stroke(sylviaGreen);
    strokeWeight(2);
    setLineDash([8, 4]);
    line(px1, py1, px2, py2);
    setLineDash([]);

    // Label
    fill(sylviaGreen);
    noStroke();
    textSize(11);
    textAlign(LEFT, TOP);
    let labelX = map(1, xMin, xMax, plotLeft, plotLeft + plotWidth);
    let labelY = map(bestIntercept + bestSlope * 1, yMin, yMax, plotTop + plotHeight, plotTop);
    labelY = constrain(labelY, plotTop + 5, plotTop + plotHeight - 15);
    text('Best Fit (LSRL)', labelX, labelY + 5);
}

function drawDataPoints() {
    for (let i = 0; i < dataPoints.length; i++) {
        let p = dataPoints[i];
        let px = map(p.x, xMin, xMax, plotLeft, plotLeft + plotWidth);
        let py = map(p.y, yMin, yMax, plotTop + plotHeight, plotTop);

        // Draw residual line if best fit is shown
        if (showBestFit) {
            let predicted = userIntercept + userSlope * p.x;
            let pyPred = map(predicted, yMin, yMax, plotTop + plotHeight, plotTop);

            stroke('#E57373');
            strokeWeight(1);
            setLineDash([3, 3]);
            line(px, py, px, pyPred);
            setLineDash([]);
        }

        // Draw point
        fill(100, 149, 237);
        stroke(50);
        strokeWeight(1.5);
        circle(px, py, 14);

        // Point label
        fill('white');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(9);
        text(i + 1, px, py);
    }
}

function drawRiseRunAnnotation() {
    // Show rise/run for slope visualization at a specific point
    let annotateX = 4;
    let run = 2; // Show change over 2 units

    let px1 = map(annotateX, xMin, xMax, plotLeft, plotLeft + plotWidth);
    let px2 = map(annotateX + run, xMin, xMax, plotLeft, plotLeft + plotWidth);

    let y1 = userIntercept + userSlope * annotateX;
    let y2 = userIntercept + userSlope * (annotateX + run);

    let py1 = map(y1, yMin, yMax, plotTop + plotHeight, plotTop);
    let py2 = map(y2, yMin, yMax, plotTop + plotHeight, plotTop);

    // Only show if line is visible in this region
    if (y1 < yMin - 20 || y1 > yMax + 20 || y2 < yMin - 20 || y2 > yMax + 20) {
        return;
    }

    // Draw run (horizontal)
    stroke('#666');
    strokeWeight(2);
    line(px1, py1, px2, py1);

    // Arrow for run
    fill('#666');
    noStroke();
    triangle(px2 - 6, py1 - 4, px2 - 6, py1 + 4, px2, py1);

    // Draw rise (vertical)
    stroke('#666');
    strokeWeight(2);
    line(px2, py1, px2, py2);

    // Arrow for rise
    if (userSlope >= 0) {
        triangle(px2 - 4, py2 + 6, px2 + 4, py2 + 6, px2, py2);
    } else {
        triangle(px2 - 4, py2 - 6, px2 + 4, py2 - 6, px2, py2);
    }

    // Labels
    fill('#666');
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    text('run=' + run, (px1 + px2) / 2, py1 + 3);

    let rise = userSlope * run;
    textAlign(LEFT, CENTER);
    text('rise=' + rise.toFixed(1), px2 + 5, (py1 + py2) / 2);
}

function drawPredictionMarker() {
    // Check if mouse is in plot area
    let inPlot = mouseX >= plotLeft && mouseX <= plotLeft + plotWidth &&
                 mouseY >= plotTop && mouseY <= plotTop + plotHeight;

    if (inPlot && !slopeSlider.dragging && !interceptSlider.dragging) {
        predictionX = map(mouseX, plotLeft, plotLeft + plotWidth, xMin, xMax);
        predictionX = constrain(predictionX, xMin, xMax);
        mouseXInPlot = true;
    } else {
        mouseXInPlot = false;
    }

    predictionY = userIntercept + userSlope * predictionX;

    // Draw prediction point on line
    let px = map(predictionX, xMin, xMax, plotLeft, plotLeft + plotWidth);
    let py = map(predictionY, yMin, yMax, plotTop + plotHeight, plotTop);

    // Clamp to visible area
    if (py >= plotTop && py <= plotTop + plotHeight) {
        // Vertical dashed line to x-axis
        stroke(sylviaAuburn);
        strokeWeight(1);
        setLineDash([4, 4]);
        line(px, py, px, plotTop + plotHeight);
        setLineDash([]);

        // Prediction point
        fill('#FFD700');
        stroke(sylviaAuburn);
        strokeWeight(2);
        circle(px, py, 12);

        // Prediction label
        fill(sylviaAuburn);
        noStroke();
        textSize(10);
        textAlign(LEFT, BOTTOM);

        let labelText = 'x=' + predictionX.toFixed(1) + ', y=' + predictionY.toFixed(1);
        let labelPx = px + 10;
        let labelPy = py - 5;

        // Keep label in bounds
        if (labelPx + 80 > plotLeft + plotWidth) {
            labelPx = px - 85;
            textAlign(RIGHT, BOTTOM);
        }
        text(labelText, labelPx, labelPy);
    }
}

function drawInfoPanel() {
    // Info panel in top-right corner
    let panelWidth = 150;
    let panelHeight = showBestFit ? 85 : 55;
    let panelX = plotLeft + plotWidth - panelWidth - 5;
    let panelY = plotTop + 5;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    fill('black');
    noStroke();
    textSize(11);
    textAlign(LEFT, TOP);

    let userSSR = calculateSSR(userSlope, userIntercept);
    text('Your SSR: ' + userSSR.toFixed(1), panelX + 8, panelY + 8);

    if (showBestFit) {
        let bestSSR = calculateSSR(bestSlope, bestIntercept);
        fill(sylviaGreen);
        text('Best SSR: ' + bestSSR.toFixed(1), panelX + 8, panelY + 25);

        fill(100);
        textSize(10);
        text('Best: y = ' + bestIntercept.toFixed(1) + ' + ' + bestSlope.toFixed(2) + 'x', panelX + 8, panelY + 45);

        // Comparison
        let diff = userSSR - bestSSR;
        fill(diff > 5 ? '#E57373' : sylviaGreen);
        text('Difference: ' + diff.toFixed(1), panelX + 8, panelY + 62);
    }
}

function drawControls() {
    buttons = [];
    let controlY = drawHeight + 15;
    let x = 20;

    // Slope slider
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Slope (b):', x, controlY + 8);

    slopeSlider.x = x + 65;
    slopeSlider.y = controlY;
    slopeSlider.width = 100;

    drawSlider(slopeSlider, userSlope, -3, 3, 'slope');

    textAlign(LEFT, CENTER);
    fill(sylviaAuburn);
    text(userSlope.toFixed(1), slopeSlider.x + slopeSlider.width + 8, controlY + 8);

    // Intercept slider
    let interceptX = slopeSlider.x + slopeSlider.width + 60;
    fill('black');
    textAlign(LEFT, CENTER);
    text('Intercept (a):', interceptX, controlY + 8);

    interceptSlider.x = interceptX + 85;
    interceptSlider.y = controlY;
    interceptSlider.width = 100;

    drawSlider(interceptSlider, userIntercept, -50, 150, 'intercept');

    fill(sylviaAuburn);
    textAlign(LEFT, CENTER);
    text(userIntercept.toFixed(0), interceptSlider.x + interceptSlider.width + 8, controlY + 8);

    // Second row
    let row2Y = drawHeight + 50;
    x = 20;

    // Show Best Fit toggle button
    let btnWidth = 120;
    let btnHeight = 28;
    showBestFitButton.x = x;
    showBestFitButton.y = row2Y;
    showBestFitButton.width = btnWidth;
    showBestFitButton.height = btnHeight;

    let isHover = mouseX >= x && mouseX <= x + btnWidth && mouseY >= row2Y && mouseY <= row2Y + btnHeight;
    fill(showBestFit ? sylviaGreen : (isHover ? 230 : 240));
    stroke(showBestFit ? sylviaGreenDark : 180);
    strokeWeight(1);
    rect(x, row2Y, btnWidth, btnHeight, 5);

    fill(showBestFit ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(showBestFit ? 'Hide Best Fit' : 'Show Best Fit', x + btnWidth / 2, row2Y + btnHeight / 2);

    buttons.push({ x, y: row2Y, w: btnWidth, h: btnHeight, action: 'toggleBestFit' });

    // Reset button
    x += btnWidth + 15;
    btnWidth = 70;
    isHover = mouseX >= x && mouseX <= x + btnWidth && mouseY >= row2Y && mouseY <= row2Y + btnHeight;
    fill(isHover ? sylviaGreen : 240);
    stroke(isHover ? sylviaGreenDark : 180);
    rect(x, row2Y, btnWidth, btnHeight, 5);

    fill(isHover ? 'white' : 'black');
    noStroke();
    text('Reset', x + btnWidth / 2, row2Y + btnHeight / 2);

    buttons.push({ x, y: row2Y, w: btnWidth, h: btnHeight, action: 'reset' });

    // Prediction display
    x += btnWidth + 30;
    fill(100);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);

    if (mouseXInPlot) {
        text('Move mouse in plot to see predictions', x, row2Y + btnHeight / 2);
    } else {
        text('Hover over plot to see predicted values', x, row2Y + btnHeight / 2);
    }

    // Instructions
    fill(100);
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Adjust sliders to change the regression line. SSR = Sum of Squared Residuals (lower is better).', canvasWidth / 2, drawHeight + controlHeight - 5);
}

function drawSlider(slider, value, minVal, maxVal, type) {
    // Slider track
    fill(220);
    stroke(180);
    strokeWeight(1);
    rect(slider.x, slider.y, slider.width, slider.height, 6);

    // Slider fill
    let fillRatio = map(value, minVal, maxVal, 0, 1);
    fill(100, 149, 237);
    noStroke();
    rect(slider.x, slider.y, slider.width * fillRatio, slider.height, 6);

    // Slider handle
    let handleX = slider.x + slider.width * fillRatio;
    fill(255);
    stroke(100);
    strokeWeight(2);
    circle(handleX, slider.y + slider.height / 2, 16);
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function mousePressed() {
    // Check sliders
    if (isInSlider(slopeSlider)) {
        slopeSlider.dragging = true;
        updateSlopeFromMouse();
        return;
    }

    if (isInSlider(interceptSlider)) {
        interceptSlider.dragging = true;
        updateInterceptFromMouse();
        return;
    }

    // Check buttons
    for (let btn of buttons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w && mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            handleButtonClick(btn);
            return;
        }
    }
}

function mouseDragged() {
    if (slopeSlider.dragging) {
        updateSlopeFromMouse();
    }
    if (interceptSlider.dragging) {
        updateInterceptFromMouse();
    }
}

function mouseReleased() {
    slopeSlider.dragging = false;
    interceptSlider.dragging = false;
}

function isInSlider(slider) {
    return mouseX >= slider.x - 8 && mouseX <= slider.x + slider.width + 8 &&
           mouseY >= slider.y - 8 && mouseY <= slider.y + slider.height + 8;
}

function updateSlopeFromMouse() {
    let ratio = (mouseX - slopeSlider.x) / slopeSlider.width;
    ratio = constrain(ratio, 0, 1);
    // Snap to 0.1 increments
    let newSlope = map(ratio, 0, 1, -3, 3);
    userSlope = round(newSlope * 10) / 10;
}

function updateInterceptFromMouse() {
    let ratio = (mouseX - interceptSlider.x) / interceptSlider.width;
    ratio = constrain(ratio, 0, 1);
    // Snap to integer values
    let newIntercept = map(ratio, 0, 1, -50, 150);
    userIntercept = round(newIntercept);
}

function handleButtonClick(btn) {
    switch (btn.action) {
        case 'toggleBestFit':
            showBestFit = !showBestFit;
            break;
        case 'reset':
            userSlope = 1.0;
            userIntercept = 50;
            showBestFit = false;
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
