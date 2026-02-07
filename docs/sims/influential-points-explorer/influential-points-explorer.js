// Influential Points Explorer MicroSim
// Interactive tool for understanding how individual points affect regression
// Students drag a "test" point to see how leverage, residuals, and influence change
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 600;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 14;

// Scatterplot dimensions
let plotLeft, plotTop, plotWidth, plotHeight;
let plotPadding = 45;

// Background data points (fixed)
let backgroundPoints = [];
let numBackgroundPoints = 10;

// The special "test" point that can be dragged
let testPoint = { x: 50, y: 50 };
let draggingTestPoint = false;

// Data ranges for the plot
let xMin = 0, xMax = 100;
let yMin = 0, yMax = 100;

// Regression results
let regWithTest = { slope: 0, intercept: 0, r2: 0 };
let regWithoutTest = { slope: 0, intercept: 0, r2: 0 };

// Statistics for the test point
let leverage = 0;
let residual = 0;
let influence = 0; // Cook's distance approximation

// UI state
let showComparisonLine = true;
let buttons = [];
let pointSlider = { x: 0, y: 0, width: 120, height: 16, value: 10 };

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

    // Generate initial background points
    generateBackgroundPoints();

    // Position test point in a moderately influential location
    testPoint = { x: 75, y: 70 };

    // Calculate initial regressions
    calculateRegressions();

    describe('Interactive exploration of influential points in regression. Students drag a test point to see how it affects the regression line, with real-time displays of leverage, residual, and influence measures.', LABEL);
}

function generateBackgroundPoints() {
    backgroundPoints = [];

    // Generate points with a positive linear relationship plus noise
    let baseSlope = 0.6;
    let baseIntercept = 20;

    for (let i = 0; i < numBackgroundPoints; i++) {
        // Spread x-values across the middle portion of the range
        let x = map(i, 0, numBackgroundPoints - 1, 20, 60);
        // Add some x jitter
        x += random(-5, 5);

        // Calculate y with relationship and noise
        let y = baseSlope * x + baseIntercept + random(-10, 10);

        // Clamp to valid range
        x = constrain(x, 5, 95);
        y = constrain(y, 5, 95);

        backgroundPoints.push({ x, y });
    }
}

function calculateRegressions() {
    // Calculate regression WITHOUT the test point
    if (backgroundPoints.length >= 2) {
        regWithoutTest = linearRegression(backgroundPoints);
    }

    // Calculate regression WITH the test point
    let allPoints = [...backgroundPoints, testPoint];
    if (allPoints.length >= 2) {
        regWithTest = linearRegression(allPoints);
    }

    // Calculate leverage (based on x-distance from mean)
    let meanX = backgroundPoints.reduce((sum, p) => sum + p.x, 0) / backgroundPoints.length;
    let ssX = backgroundPoints.reduce((sum, p) => sum + (p.x - meanX) ** 2, 0);

    // Leverage formula: h_i = 1/n + (x_i - mean_x)^2 / SS_x
    let n = backgroundPoints.length + 1;
    leverage = 1 / n + (testPoint.x - meanX) ** 2 / ssX;
    leverage = constrain(leverage, 0, 1);

    // Calculate residual (vertical distance from regression line WITH test point)
    let predictedY = regWithTest.slope * testPoint.x + regWithTest.intercept;
    residual = testPoint.y - predictedY;

    // Calculate influence as change in regression line when point is removed
    // Using the absolute change in slope plus change in intercept
    let slopeChange = Math.abs(regWithTest.slope - regWithoutTest.slope);
    let interceptChange = Math.abs(regWithTest.intercept - regWithoutTest.intercept) / 100;
    influence = slopeChange + interceptChange;

    // Normalize influence to roughly 0-1 scale
    influence = constrain(influence * 5, 0, 1);
}

function linearRegression(points) {
    let n = points.length;
    if (n < 2) return { slope: 0, intercept: 0, r2: 0 };

    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

    for (let p of points) {
        sumX += p.x;
        sumY += p.y;
        sumXY += p.x * p.y;
        sumX2 += p.x * p.x;
        sumY2 += p.y * p.y;
    }

    let meanX = sumX / n;
    let meanY = sumY / n;

    let denominator = sumX2 - n * meanX * meanX;
    if (Math.abs(denominator) < 0.0001) {
        return { slope: 0, intercept: meanY, r2: 0 };
    }

    let slope = (sumXY - n * meanX * meanY) / denominator;
    let intercept = meanY - slope * meanX;

    // Calculate R-squared
    let ssTotal = sumY2 - n * meanY * meanY;
    let ssResidual = 0;
    for (let p of points) {
        let predicted = slope * p.x + intercept;
        ssResidual += (p.y - predicted) ** 2;
    }

    let r2 = ssTotal > 0 ? 1 - ssResidual / ssTotal : 0;
    r2 = constrain(r2, 0, 1);

    return { slope, intercept, r2 };
}

function draw() {
    updateCanvasSize();

    // Calculate plot dimensions
    plotLeft = margin + plotPadding;
    plotTop = 35;
    plotWidth = canvasWidth * 0.55 - plotLeft;
    plotHeight = drawHeight - plotTop - 50;

    // Drawing area background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill('white');
    stroke('silver');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Influential Points Explorer', canvasWidth / 2, 8);

    // Draw the scatterplot
    drawScatterplot();

    // Draw the statistics panel
    drawStatisticsPanel();

    // Draw the leverage indicator
    drawLeverageIndicator();

    // Draw controls
    drawControls();
}

function drawScatterplot() {
    // Plot background
    fill(255);
    stroke(150);
    strokeWeight(1);
    rect(plotLeft, plotTop, plotWidth, plotHeight);

    // Gridlines
    stroke(230);
    strokeWeight(1);
    for (let i = 1; i < 5; i++) {
        let gx = map(i * 20, 0, 100, plotLeft, plotLeft + plotWidth);
        line(gx, plotTop, gx, plotTop + plotHeight);

        let gy = map(i * 20, 0, 100, plotTop + plotHeight, plotTop);
        line(plotLeft, gy, plotLeft + plotWidth, gy);
    }

    // Axes
    stroke(100);
    strokeWeight(2);
    line(plotLeft, plotTop + plotHeight, plotLeft + plotWidth, plotTop + plotHeight);
    line(plotLeft, plotTop, plotLeft, plotTop + plotHeight);

    // Axis labels
    fill(80);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    for (let i = 0; i <= 5; i++) {
        let val = i * 20;
        let tx = map(val, 0, 100, plotLeft, plotLeft + plotWidth);
        text(val, tx, plotTop + plotHeight + 5);
    }

    textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 5; i++) {
        let val = i * 20;
        let ty = map(val, 0, 100, plotTop + plotHeight, plotTop);
        text(val, plotLeft - 5, ty);
    }

    // Draw regression line WITHOUT test point (dashed, if toggle is on)
    if (showComparisonLine) {
        stroke(150);
        strokeWeight(2);
        setLineDash([6, 4]);

        let y0 = regWithoutTest.slope * 0 + regWithoutTest.intercept;
        let y100 = regWithoutTest.slope * 100 + regWithoutTest.intercept;

        let px0 = map(0, 0, 100, plotLeft, plotLeft + plotWidth);
        let py0 = map(y0, 0, 100, plotTop + plotHeight, plotTop);
        let px100 = map(100, 0, 100, plotLeft, plotLeft + plotWidth);
        let py100 = map(y100, 0, 100, plotTop + plotHeight, plotTop);

        // Clip to plot bounds
        py0 = constrain(py0, plotTop, plotTop + plotHeight);
        py100 = constrain(py100, plotTop, plotTop + plotHeight);

        line(px0, py0, px100, py100);
        setLineDash([]);
    }

    // Draw regression line WITH test point (solid)
    stroke(sylviaGreen);
    strokeWeight(2.5);

    let y0 = regWithTest.slope * 0 + regWithTest.intercept;
    let y100 = regWithTest.slope * 100 + regWithTest.intercept;

    let px0 = map(0, 0, 100, plotLeft, plotLeft + plotWidth);
    let py0 = map(y0, 0, 100, plotTop + plotHeight, plotTop);
    let px100 = map(100, 0, 100, plotLeft, plotLeft + plotWidth);
    let py100 = map(y100, 0, 100, plotTop + plotHeight, plotTop);

    py0 = constrain(py0, plotTop, plotTop + plotHeight);
    py100 = constrain(py100, plotTop, plotTop + plotHeight);

    line(px0, py0, px100, py100);

    // Draw background points
    for (let i = 0; i < backgroundPoints.length; i++) {
        let p = backgroundPoints[i];
        let px = map(p.x, 0, 100, plotLeft, plotLeft + plotWidth);
        let py = map(p.y, 0, 100, plotTop + plotHeight, plotTop);

        fill(100, 149, 237);
        stroke(50);
        strokeWeight(1);
        circle(px, py, 12);
    }

    // Draw the test point with influence-based color
    let testPx = map(testPoint.x, 0, 100, plotLeft, plotLeft + plotWidth);
    let testPy = map(testPoint.y, 0, 100, plotTop + plotHeight, plotTop);

    // Color based on influence level
    let pointColor = getInfluenceColor(influence);

    // Draw residual line
    let predictedY = regWithTest.slope * testPoint.x + regWithTest.intercept;
    let predictedPy = map(predictedY, 0, 100, plotTop + plotHeight, plotTop);

    stroke(sylviaAuburn);
    strokeWeight(1);
    setLineDash([3, 3]);
    line(testPx, testPy, testPx, predictedPy);
    setLineDash([]);

    // Draw test point
    fill(pointColor);
    stroke(50);
    strokeWeight(2);
    circle(testPx, testPy, 20);

    // Label the test point
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text('T', testPx, testPy);

    // Tooltip when hovering
    if (isOverTestPoint() && !draggingTestPoint) {
        fill(50, 50, 50, 230);
        noStroke();
        let tooltipText = 'Drag me!';
        let tooltipW = textWidth(tooltipText) + 16;
        rect(testPx - tooltipW / 2, testPy - 35, tooltipW, 20, 5);

        fill('white');
        textAlign(CENTER, CENTER);
        textSize(11);
        text(tooltipText, testPx, testPy - 25);
    }

    // Legend
    drawLegend();
}

function drawLegend() {
    let legendX = plotLeft + 5;
    let legendY = plotTop + 5;

    fill(255, 255, 255, 220);
    stroke(200);
    strokeWeight(1);
    rect(legendX, legendY, 120, showComparisonLine ? 50 : 30, 5);

    // Solid line legend
    stroke(sylviaGreen);
    strokeWeight(2);
    line(legendX + 10, legendY + 15, legendX + 35, legendY + 15);

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(9);
    text('With test point', legendX + 40, legendY + 15);

    // Dashed line legend (if visible)
    if (showComparisonLine) {
        stroke(150);
        strokeWeight(2);
        setLineDash([4, 3]);
        line(legendX + 10, legendY + 35, legendX + 35, legendY + 35);
        setLineDash([]);

        fill('black');
        noStroke();
        text('Without test point', legendX + 40, legendY + 35);
    }
}

function drawStatisticsPanel() {
    let panelX = canvasWidth * 0.58;
    let panelY = plotTop;
    let panelW = canvasWidth - panelX - margin;
    let panelH = 160;

    // Panel background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text('Test Point Statistics', panelX + panelW / 2, panelY + 8);

    // Divider
    stroke(220);
    line(panelX + 10, panelY + 28, panelX + panelW - 10, panelY + 28);

    // Position info
    fill('black');
    textAlign(LEFT, TOP);
    textSize(11);
    let infoY = panelY + 35;
    let lineHeight = 18;

    text('Position: (' + testPoint.x.toFixed(1) + ', ' + testPoint.y.toFixed(1) + ')', panelX + 10, infoY);
    infoY += lineHeight;

    // Residual with color
    fill(residual >= 0 ? sylviaGreen : '#D32F2F');
    text('Residual: ' + residual.toFixed(2), panelX + 10, infoY);
    infoY += lineHeight;

    // Leverage
    fill('black');
    text('Leverage: ' + leverage.toFixed(3), panelX + 10, infoY);
    infoY += lineHeight;

    // Influence with color
    let influenceColor = getInfluenceColor(influence);
    fill(influenceColor);
    text('Influence: ' + influence.toFixed(3), panelX + 10, infoY);
    infoY += lineHeight + 8;

    // Influence level indicator
    fill('black');
    textSize(10);
    let levelText = getInfluenceLevel(influence);
    text('Level: ' + levelText, panelX + 10, infoY);

    // Equations panel
    let eqPanelY = panelY + panelH + 10;
    let eqPanelH = 90;

    fill(255);
    stroke(200);
    rect(panelX, eqPanelY, panelW, eqPanelH, 8);

    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text('Regression Equations', panelX + panelW / 2, eqPanelY + 8);

    stroke(220);
    line(panelX + 10, eqPanelY + 28, panelX + panelW - 10, eqPanelY + 28);

    fill('black');
    textAlign(LEFT, TOP);
    textSize(10);

    let eqY = eqPanelY + 35;
    text('With point:', panelX + 10, eqY);
    fill(sylviaGreen);
    text('y = ' + regWithTest.slope.toFixed(3) + 'x + ' + regWithTest.intercept.toFixed(2), panelX + 10, eqY + 14);
    fill(100);
    text('R\u00B2 = ' + regWithTest.r2.toFixed(4), panelX + 10, eqY + 28);

    if (showComparisonLine) {
        eqY += 45;
        fill('black');
        text('Without:', panelX + 10, eqY);
        fill(100);
        text('y = ' + regWithoutTest.slope.toFixed(3) + 'x + ' + regWithoutTest.intercept.toFixed(2), panelX + 10, eqY + 14);
        text('R\u00B2 = ' + regWithoutTest.r2.toFixed(4), panelX + panelW / 2 + 5, eqY + 14);
    }
}

function drawLeverageIndicator() {
    let barX = plotLeft;
    let barY = plotTop + plotHeight + 20;
    let barW = plotWidth;
    let barH = 16;

    // Label
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('X-distance from mean:', barX, barY - 8);

    // Bar background
    fill(230);
    stroke(180);
    strokeWeight(1);
    rect(barX, barY, barW, barH, 4);

    // Calculate mean X of background points
    let meanX = backgroundPoints.reduce((sum, p) => sum + p.x, 0) / backgroundPoints.length;

    // Mean marker
    let meanPx = map(meanX, 0, 100, barX, barX + barW);
    fill(100);
    noStroke();
    rect(meanPx - 2, barY - 2, 4, barH + 4);

    textAlign(CENTER, BOTTOM);
    textSize(8);
    fill(100);
    text('mean', meanPx, barY - 2);

    // Test point position on bar
    let testPx = map(testPoint.x, 0, 100, barX, barX + barW);

    // Line from mean to test point
    let leverageColor = getInfluenceColor(leverage);
    stroke(leverageColor);
    strokeWeight(3);
    line(meanPx, barY + barH / 2, testPx, barY + barH / 2);

    // Test point marker
    fill(leverageColor);
    stroke(50);
    strokeWeight(1);
    circle(testPx, barY + barH / 2, 14);

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(8);
    text('T', testPx, barY + barH / 2);
}

function getInfluenceColor(inf) {
    if (inf < 0.2) {
        return sylviaGreen; // Low influence - green
    } else if (inf < 0.5) {
        return '#FFB300'; // Moderate influence - yellow/amber
    } else {
        return '#D32F2F'; // High influence - red
    }
}

function getInfluenceLevel(inf) {
    if (inf < 0.2) {
        return 'Low (green)';
    } else if (inf < 0.5) {
        return 'Moderate (yellow)';
    } else {
        return 'High (red)';
    }
}

function drawControls() {
    buttons = [];
    let controlY = drawHeight + 15;
    let btnHeight = 28;
    let x = 15;

    // Toggle comparison line button
    let toggleLabel = showComparisonLine ? 'Hide Comparison' : 'Show Comparison';
    drawButton(x, controlY, 120, btnHeight, toggleLabel, 'toggleComparison');
    x += 130;

    // Reset button
    drawButton(x, controlY, 60, btnHeight, 'Reset', 'reset');
    x += 70;

    // New Data button
    drawButton(x, controlY, 80, btnHeight, 'New Data', 'newData');
    x += 100;

    // Points slider
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Points:', x, controlY + btnHeight / 2);
    x += 50;

    pointSlider.x = x;
    pointSlider.y = controlY + btnHeight / 2 - 8;

    // Slider track
    fill(220);
    stroke(180);
    strokeWeight(1);
    rect(pointSlider.x, pointSlider.y, pointSlider.width, pointSlider.height, 8);

    // Slider fill
    let fillWidth = map(numBackgroundPoints, 5, 15, 0, pointSlider.width);
    fill(100, 149, 237);
    noStroke();
    rect(pointSlider.x, pointSlider.y, fillWidth, pointSlider.height, 8);

    // Slider handle
    fill(255);
    stroke(100);
    strokeWeight(2);
    circle(pointSlider.x + fillWidth, pointSlider.y + pointSlider.height / 2, 14);

    // Value display
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text(numBackgroundPoints, pointSlider.x + pointSlider.width + 10, controlY + btnHeight / 2);

    // Second row - instructions
    fill(100);
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Drag the test point (T) to explore how leverage and influence change.', 15, drawHeight + 55);

    // Sylvia tip
    fill('darkgreen');
    textSize(10);
    text('Tip: Moving the point far right increases leverage. Moving it away from the pattern increases residual.', 15, drawHeight + 75);
    text('High leverage + large residual = high influence on the regression line!', 15, drawHeight + 90);
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
    textSize(11);
    text(label, x + w / 2, y + h / 2);

    buttons.push({ x, y, w, h, action });
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function isOverTestPoint() {
    let testPx = map(testPoint.x, 0, 100, plotLeft, plotLeft + plotWidth);
    let testPy = map(testPoint.y, 0, 100, plotTop + plotHeight, plotTop);
    return dist(mouseX, mouseY, testPx, testPy) < 15;
}

function mousePressed() {
    // Check if clicking on test point
    if (isOverTestPoint()) {
        draggingTestPoint = true;
        return;
    }

    // Check slider
    if (mouseY >= pointSlider.y - 5 && mouseY <= pointSlider.y + pointSlider.height + 5 &&
        mouseX >= pointSlider.x && mouseX <= pointSlider.x + pointSlider.width) {
        updatePointSlider();
        return;
    }

    // Check buttons
    for (let btn of buttons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            handleButtonClick(btn.action);
            return;
        }
    }
}

function mouseDragged() {
    if (draggingTestPoint) {
        // Convert mouse position to data coordinates
        let newX = map(mouseX, plotLeft, plotLeft + plotWidth, 0, 100);
        let newY = map(mouseY, plotTop + plotHeight, plotTop, 0, 100);

        // Clamp to valid range
        testPoint.x = constrain(newX, 0, 100);
        testPoint.y = constrain(newY, 0, 100);

        // Recalculate regressions
        calculateRegressions();
        return;
    }

    // Check slider dragging
    if (mouseY >= pointSlider.y - 10 && mouseY <= pointSlider.y + pointSlider.height + 10 &&
        mouseX >= pointSlider.x - 10 && mouseX <= pointSlider.x + pointSlider.width + 10) {
        updatePointSlider();
    }
}

function mouseReleased() {
    draggingTestPoint = false;
}

function updatePointSlider() {
    let newVal = map(mouseX, pointSlider.x, pointSlider.x + pointSlider.width, 5, 15);
    newVal = round(constrain(newVal, 5, 15));

    if (newVal !== numBackgroundPoints) {
        numBackgroundPoints = newVal;
        generateBackgroundPoints();
        calculateRegressions();
    }
}

function handleButtonClick(action) {
    switch (action) {
        case 'toggleComparison':
            showComparisonLine = !showComparisonLine;
            break;
        case 'reset':
            testPoint = { x: 75, y: 70 };
            numBackgroundPoints = 10;
            generateBackgroundPoints();
            calculateRegressions();
            break;
        case 'newData':
            generateBackgroundPoints();
            calculateRegressions();
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
