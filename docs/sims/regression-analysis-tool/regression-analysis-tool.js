// Regression Analysis Tool MicroSim
// Complete linear regression analysis with equation, residuals, predictions, and interpretation
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 500;
let drawHeight = 550;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout
let margin = 15;
let defaultTextSize = 12;

// Scatterplot dimensions
let plotLeft, plotTop, plotWidth, plotHeight;

// Residual plot dimensions
let residualPlotTop, residualPlotHeight;

// Stats panel dimensions
let statsLeft, statsTop, statsWidth, statsHeight;

// Prediction panel dimensions
let predPanelLeft, predPanelTop, predPanelWidth, predPanelHeight;

// Real-world datasets with variable names and units
const datasets = {
    'Study Hours vs Test Score': {
        xLabel: 'Study Hours',
        yLabel: 'Test Score',
        xUnit: 'hours',
        yUnit: 'points',
        context: 'studying and test performance',
        data: [
            {x: 1, y: 52}, {x: 2, y: 58}, {x: 2.5, y: 64}, {x: 3, y: 68},
            {x: 4, y: 73}, {x: 4.5, y: 78}, {x: 5, y: 82}, {x: 6, y: 85},
            {x: 7, y: 91}, {x: 8, y: 94}
        ]
    },
    'Height vs Weight': {
        xLabel: 'Height',
        yLabel: 'Weight',
        xUnit: 'inches',
        yUnit: 'pounds',
        context: 'height and weight relationship',
        data: [
            {x: 60, y: 105}, {x: 62, y: 115}, {x: 64, y: 128}, {x: 65, y: 135},
            {x: 66, y: 142}, {x: 68, y: 155}, {x: 70, y: 168}, {x: 71, y: 175},
            {x: 73, y: 188}, {x: 75, y: 200}
        ]
    },
    'Temperature vs Ice Cream Sales': {
        xLabel: 'Temperature',
        yLabel: 'Ice Cream Sales',
        xUnit: 'degrees F',
        yUnit: 'dollars',
        context: 'temperature and ice cream sales',
        data: [
            {x: 55, y: 120}, {x: 60, y: 195}, {x: 65, y: 285}, {x: 68, y: 340},
            {x: 72, y: 410}, {x: 75, y: 465}, {x: 80, y: 530}, {x: 85, y: 595},
            {x: 88, y: 640}, {x: 92, y: 705}
        ]
    },
    'Car Age vs Price': {
        xLabel: 'Car Age',
        yLabel: 'Price',
        xUnit: 'years',
        yUnit: 'dollars (x1000)',
        context: 'car depreciation',
        data: [
            {x: 1, y: 28}, {x: 2, y: 24}, {x: 3, y: 21}, {x: 4, y: 18},
            {x: 5, y: 15}, {x: 6, y: 13}, {x: 7, y: 11}, {x: 8, y: 9},
            {x: 10, y: 6}, {x: 12, y: 4}
        ]
    },
    'Advertising vs Revenue': {
        xLabel: 'Advertising Spend',
        yLabel: 'Revenue',
        xUnit: 'dollars (x1000)',
        yUnit: 'dollars (x10000)',
        context: 'advertising investment and revenue',
        data: [
            {x: 5, y: 22}, {x: 10, y: 31}, {x: 15, y: 42}, {x: 18, y: 48},
            {x: 22, y: 55}, {x: 25, y: 62}, {x: 30, y: 71}, {x: 35, y: 78},
            {x: 40, y: 86}, {x: 50, y: 98}
        ]
    }
};

// Current state
let currentDataset = 'Study Hours vs Test Score';
let showResidualPlot = false;
let highlightInfluential = false;
let predictionValue = '';
let predictionResult = null;
let isExtrapolation = false;
let editingPrediction = false;

// Calculated regression values
let slope = 0;
let intercept = 0;
let rValue = 0;
let rSquared = 0;
let meanX = 0;
let meanY = 0;
let residuals = [];
let influentialPoints = [];

// UI state
let buttons = [];
let dropdownOpen = false;
let dropdownOptions = Object.keys(datasets);
let dropdownRect = {x: 0, y: 0, w: 0, h: 0};

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
    textSize(defaultTextSize);

    // Calculate initial regression
    calculateRegression();

    describe('Complete regression analysis tool showing scatterplot with regression line, residual plot, statistics panel, and prediction calculator. Students can explore different datasets, make predictions, and see auto-generated interpretations.', LABEL);
}

function calculateRegression() {
    let dataset = datasets[currentDataset];
    let data = dataset.data;
    let n = data.length;

    // Calculate means
    let sumX = 0, sumY = 0;
    for (let point of data) {
        sumX += point.x;
        sumY += point.y;
    }
    meanX = sumX / n;
    meanY = sumY / n;

    // Calculate slope and intercept using least squares
    let sumXY = 0, sumX2 = 0, sumY2 = 0;
    for (let point of data) {
        let dx = point.x - meanX;
        let dy = point.y - meanY;
        sumXY += dx * dy;
        sumX2 += dx * dx;
        sumY2 += dy * dy;
    }

    slope = sumXY / sumX2;
    intercept = meanY - slope * meanX;

    // Calculate correlation coefficient
    rValue = sumXY / Math.sqrt(sumX2 * sumY2);
    rSquared = rValue * rValue;

    // Calculate residuals
    residuals = [];
    for (let i = 0; i < data.length; i++) {
        let predicted = slope * data[i].x + intercept;
        residuals.push({
            x: data[i].x,
            actual: data[i].y,
            predicted: predicted,
            residual: data[i].y - predicted,
            index: i
        });
    }

    // Identify influential points (using leverage and standardized residual)
    // Simple approach: points with |standardized residual| > 2
    let residualSD = Math.sqrt(residuals.reduce((sum, r) => sum + r.residual * r.residual, 0) / (n - 2));
    influentialPoints = [];
    for (let i = 0; i < residuals.length; i++) {
        let leverage = 1/n + Math.pow(data[i].x - meanX, 2) / sumX2;
        let stdResidual = residuals[i].residual / (residualSD * Math.sqrt(1 - leverage));
        if (Math.abs(stdResidual) > 2 || leverage > 3/n) {
            influentialPoints.push(i);
        }
    }
}

function draw() {
    updateCanvasSize();

    // Calculate layout based on canvas width
    calculateLayout();

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
    textSize(18);
    text('Regression Analysis Tool', canvasWidth / 2, 8);

    // Draw main scatterplot with regression line
    drawScatterplot();

    // Draw residual plot if enabled
    if (showResidualPlot) {
        drawResidualPlot();
    }

    // Draw statistics panel
    drawStatsPanel();

    // Draw prediction panel
    drawPredictionPanel();

    // Draw interpretation at bottom
    drawInterpretation();

    // Draw controls
    drawControls();

    // Draw dropdown on top if open
    if (dropdownOpen) {
        drawDropdownMenu();
    }
}

function calculateLayout() {
    // Left side: scatterplot and residual plot
    plotLeft = margin + 35;
    plotTop = 35;
    plotWidth = canvasWidth * 0.52 - margin;

    if (showResidualPlot) {
        plotHeight = 200;
        residualPlotTop = plotTop + plotHeight + 25;
        residualPlotHeight = 120;
    } else {
        plotHeight = 300;
        residualPlotTop = 0;
        residualPlotHeight = 0;
    }

    // Right side: stats and prediction panels
    statsLeft = plotLeft + plotWidth + 15;
    statsTop = plotTop;
    statsWidth = canvasWidth - statsLeft - margin;
    statsHeight = 180;

    predPanelLeft = statsLeft;
    predPanelTop = statsTop + statsHeight + 10;
    predPanelWidth = statsWidth;
    predPanelHeight = showResidualPlot ? 90 : 120;
}

function drawScatterplot() {
    let dataset = datasets[currentDataset];
    let data = dataset.data;

    // Plot background
    fill('white');
    stroke(150);
    strokeWeight(1);
    rect(plotLeft, plotTop, plotWidth, plotHeight, 5);

    // Calculate axis ranges with padding
    let xMin = Math.min(...data.map(p => p.x));
    let xMax = Math.max(...data.map(p => p.x));
    let yMin = Math.min(...data.map(p => p.y));
    let yMax = Math.max(...data.map(p => p.y));

    let xPad = (xMax - xMin) * 0.15;
    let yPad = (yMax - yMin) * 0.15;
    xMin -= xPad; xMax += xPad;
    yMin -= yPad; yMax += yPad;

    let innerLeft = plotLeft + 35;
    let innerRight = plotLeft + plotWidth - 10;
    let innerTop = plotTop + 15;
    let innerBottom = plotTop + plotHeight - 25;

    // Gridlines
    stroke(235);
    strokeWeight(1);
    for (let i = 1; i < 5; i++) {
        let gx = map(i/5, 0, 1, innerLeft, innerRight);
        let gy = map(i/5, 0, 1, innerBottom, innerTop);
        line(gx, innerTop, gx, innerBottom);
        line(innerLeft, gy, innerRight, gy);
    }

    // Axes
    stroke(100);
    strokeWeight(1.5);
    line(innerLeft, innerBottom, innerRight, innerBottom);
    line(innerLeft, innerTop, innerLeft, innerBottom);

    // Axis labels
    fill(80);
    noStroke();
    textSize(9);
    textAlign(CENTER, TOP);

    // X-axis ticks
    for (let i = 0; i <= 4; i++) {
        let val = xMin + (xMax - xMin) * i / 4;
        let tx = map(val, xMin, xMax, innerLeft, innerRight);
        stroke(100);
        strokeWeight(1);
        line(tx, innerBottom, tx, innerBottom + 3);
        noStroke();
        text(val.toFixed(1), tx, innerBottom + 5);
    }

    // Y-axis ticks
    textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 4; i++) {
        let val = yMin + (yMax - yMin) * i / 4;
        let ty = map(val, yMin, yMax, innerBottom, innerTop);
        stroke(100);
        strokeWeight(1);
        line(innerLeft - 3, ty, innerLeft, ty);
        noStroke();
        text(val.toFixed(0), innerLeft - 5, ty);
    }

    // Axis titles
    fill('black');
    textSize(10);
    textAlign(CENTER, TOP);
    text(dataset.xLabel + ' (' + dataset.xUnit + ')', (innerLeft + innerRight) / 2, innerBottom + 14);

    push();
    translate(plotLeft + 8, (innerTop + innerBottom) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    text(dataset.yLabel, 0, 0);
    pop();

    // Draw regression line
    stroke(sylviaAuburn);
    strokeWeight(2);
    let lineY1 = slope * xMin + intercept;
    let lineY2 = slope * xMax + intercept;
    let lineX1 = map(xMin, xMin, xMax, innerLeft, innerRight);
    let lineX2 = map(xMax, xMin, xMax, innerLeft, innerRight);
    let lineYScreen1 = map(lineY1, yMin, yMax, innerBottom, innerTop);
    let lineYScreen2 = map(lineY2, yMin, yMax, innerBottom, innerTop);

    // Clip to plot area
    lineYScreen1 = constrain(lineYScreen1, innerTop, innerBottom);
    lineYScreen2 = constrain(lineYScreen2, innerTop, innerBottom);

    line(lineX1, lineYScreen1, lineX2, lineYScreen2);

    // Draw data points
    for (let i = 0; i < data.length; i++) {
        let px = map(data[i].x, xMin, xMax, innerLeft, innerRight);
        let py = map(data[i].y, yMin, yMax, innerBottom, innerTop);

        let isInfluential = influentialPoints.includes(i);

        if (highlightInfluential && isInfluential) {
            // Draw warning ring around influential points
            stroke('#FF6B6B');
            strokeWeight(3);
            noFill();
            circle(px, py, 20);

            fill('#FF6B6B');
            stroke(50);
            strokeWeight(1);
            circle(px, py, 12);
        } else {
            fill(sylviaGreen);
            stroke(50);
            strokeWeight(1);
            circle(px, py, 12);
        }
    }

    // Draw prediction point if exists
    if (predictionResult !== null) {
        let px = map(predictionResult.x, xMin, xMax, innerLeft, innerRight);
        let py = map(predictionResult.y, yMin, yMax, innerBottom, innerTop);

        // Prediction lines
        stroke(isExtrapolation ? '#FF6B6B' : sylviaAuburn);
        strokeWeight(1);
        setLineDash([5, 3]);
        line(px, innerBottom, px, py);
        line(innerLeft, py, px, py);
        setLineDash([]);

        // Prediction point
        fill(isExtrapolation ? '#FF6B6B' : sylviaAuburn);
        stroke('white');
        strokeWeight(2);
        beginShape();
        vertex(px, py - 8);
        vertex(px + 7, py + 5);
        vertex(px - 7, py + 5);
        endShape(CLOSE);
    }
}

function drawResidualPlot() {
    let dataset = datasets[currentDataset];
    let data = dataset.data;

    // Plot background
    fill('white');
    stroke(150);
    strokeWeight(1);
    rect(plotLeft, residualPlotTop, plotWidth, residualPlotHeight, 5);

    // Title
    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    text('Residual Plot', plotLeft + 5, residualPlotTop + 3);

    // Calculate ranges
    let xMin = Math.min(...data.map(p => p.x));
    let xMax = Math.max(...data.map(p => p.x));
    let resMin = Math.min(...residuals.map(r => r.residual));
    let resMax = Math.max(...residuals.map(r => r.residual));
    let resPad = Math.max(Math.abs(resMin), Math.abs(resMax)) * 0.2;
    resMin = Math.min(resMin - resPad, -resPad);
    resMax = Math.max(resMax + resPad, resPad);

    let innerLeft = plotLeft + 35;
    let innerRight = plotLeft + plotWidth - 10;
    let innerTop = residualPlotTop + 18;
    let innerBottom = residualPlotTop + residualPlotHeight - 20;
    let zeroLine = map(0, resMin, resMax, innerBottom, innerTop);

    // Zero reference line
    stroke(sylviaAuburn);
    strokeWeight(1);
    setLineDash([5, 3]);
    line(innerLeft, zeroLine, innerRight, zeroLine);
    setLineDash([]);

    // Axes
    stroke(100);
    strokeWeight(1);
    line(innerLeft, innerTop, innerLeft, innerBottom);
    line(innerLeft, innerBottom, innerRight, innerBottom);

    // Y-axis label
    fill(80);
    noStroke();
    textSize(8);
    textAlign(RIGHT, CENTER);
    text(resMax.toFixed(1), innerLeft - 3, innerTop + 5);
    text(resMin.toFixed(1), innerLeft - 3, innerBottom - 5);
    text('0', innerLeft - 3, zeroLine);

    // X-axis label
    textAlign(CENTER, TOP);
    textSize(9);
    text(dataset.xLabel, (innerLeft + innerRight) / 2, innerBottom + 3);

    // Draw residual points
    for (let i = 0; i < residuals.length; i++) {
        let r = residuals[i];
        let px = map(r.x, xMin, xMax, innerLeft, innerRight);
        let py = map(r.residual, resMin, resMax, innerBottom, innerTop);

        let isInfluential = influentialPoints.includes(i);

        if (highlightInfluential && isInfluential) {
            fill('#FF6B6B');
        } else {
            fill(r.residual >= 0 ? sylviaGreen : '#E57373');
        }
        stroke(50);
        strokeWeight(1);
        circle(px, py, 8);
    }
}

function drawStatsPanel() {
    let dataset = datasets[currentDataset];

    // Panel background
    fill(sylviaCream);
    stroke(200);
    strokeWeight(1);
    rect(statsLeft, statsTop, statsWidth, statsHeight, 8);

    // Header
    fill(sylviaGreen);
    noStroke();
    rect(statsLeft, statsTop, statsWidth, 22, 8, 8, 0, 0);

    fill('white');
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Statistics Summary', statsLeft + statsWidth / 2, statsTop + 11);

    // Stats content
    fill('black');
    textAlign(LEFT, TOP);
    textSize(10);
    let lineHeight = 16;
    let startY = statsTop + 30;
    let col1 = statsLeft + 8;
    let col2 = statsLeft + statsWidth / 2 + 5;

    // Regression equation
    fill(sylviaGreenDark);
    textSize(11);
    let slopeSign = slope >= 0 ? '+' : '';
    text('y = ' + slope.toFixed(3) + 'x ' + slopeSign + intercept.toFixed(2), col1, startY);

    textSize(10);
    fill('black');
    startY += lineHeight + 5;

    // Two-column layout
    text('r = ' + rValue.toFixed(4), col1, startY);
    text('R' + String.fromCharCode(178) + ' = ' + (rSquared * 100).toFixed(1) + '%', col2, startY);

    startY += lineHeight;
    text('Slope = ' + slope.toFixed(4), col1, startY);
    text('Intercept = ' + intercept.toFixed(2), col2, startY);

    startY += lineHeight;
    text('Mean x = ' + meanX.toFixed(2), col1, startY);
    text('Mean y = ' + meanY.toFixed(2), col2, startY);

    startY += lineHeight;
    text('n = ' + datasets[currentDataset].data.length, col1, startY);

    // Interpretation of R-squared
    startY += lineHeight + 5;
    fill(sylviaHazel);
    textSize(9);
    let pctExplained = (rSquared * 100).toFixed(1);
    let interp = pctExplained + '% of variation in ' + dataset.yLabel.toLowerCase();
    text(interp, col1, startY);
    text('is explained by ' + dataset.xLabel.toLowerCase(), col1, startY + 12);

    // Influential points warning
    if (influentialPoints.length > 0) {
        startY += 28;
        fill('#FF6B6B');
        textSize(9);
        text('* ' + influentialPoints.length + ' influential point(s) detected', col1, startY);
    }
}

function drawPredictionPanel() {
    // Panel background
    fill('white');
    stroke(200);
    strokeWeight(1);
    rect(predPanelLeft, predPanelTop, predPanelWidth, predPanelHeight, 8);

    // Header
    fill(sylviaAuburn);
    noStroke();
    rect(predPanelLeft, predPanelTop, predPanelWidth, 20, 8, 8, 0, 0);

    fill('white');
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Prediction Calculator', predPanelLeft + predPanelWidth / 2, predPanelTop + 10);

    let dataset = datasets[currentDataset];

    // Input label
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(10);
    let inputY = predPanelTop + 35;
    text(dataset.xLabel + ':', predPanelLeft + 8, inputY);

    // Input field
    let inputX = predPanelLeft + 8;
    let inputW = predPanelWidth - 85;
    let inputH = 22;
    inputY = predPanelTop + 45;

    fill(editingPrediction ? '#FFFDE7' : 'white');
    stroke(editingPrediction ? sylviaAuburn : 150);
    strokeWeight(editingPrediction ? 2 : 1);
    rect(inputX, inputY, inputW, inputH, 4);

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    if (editingPrediction) {
        text(predictionValue + '|', inputX + 5, inputY + inputH / 2);
    } else if (predictionValue !== '') {
        text(predictionValue, inputX + 5, inputY + inputH / 2);
    } else {
        fill(180);
        text('Enter value...', inputX + 5, inputY + inputH / 2);
    }

    // Calculate button
    let btnX = inputX + inputW + 5;
    let btnW = 65;
    let isHover = mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= inputY && mouseY <= inputY + inputH;

    fill(isHover ? sylviaAuburn : sylviaGreen);
    stroke(50);
    strokeWeight(1);
    rect(btnX, inputY, btnW, inputH, 4);

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Calculate', btnX + btnW / 2, inputY + inputH / 2);

    buttons.push({action: 'calculate', x: btnX, y: inputY, w: btnW, h: inputH});

    // Result display
    if (predictionResult !== null) {
        let resultY = inputY + inputH + 8;

        fill(isExtrapolation ? '#FFF3E0' : sylviaCream);
        stroke(isExtrapolation ? '#FF6B6B' : sylviaGreen);
        strokeWeight(1);
        rect(predPanelLeft + 5, resultY, predPanelWidth - 10, 28, 4);

        fill(isExtrapolation ? '#FF6B6B' : sylviaGreenDark);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);

        let resultText = 'Predicted ' + dataset.yLabel + ': ' + predictionResult.y.toFixed(2);
        text(resultText, predPanelLeft + predPanelWidth / 2, resultY + 10);

        if (isExtrapolation) {
            fill('#FF6B6B');
            textSize(8);
            text('Warning: Extrapolation beyond data range!', predPanelLeft + predPanelWidth / 2, resultY + 22);
        }
    }
}

function drawInterpretation() {
    let dataset = datasets[currentDataset];
    let interpY = showResidualPlot ? residualPlotTop + residualPlotHeight + 8 : plotTop + plotHeight + 15;
    let interpHeight = drawHeight - interpY - 5;

    // Background
    fill(255, 255, 255, 200);
    stroke(200);
    strokeWeight(1);
    rect(margin, interpY, canvasWidth - margin * 2, interpHeight, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    text('Interpretation Template:', margin + 8, interpY + 5);

    // Auto-generated interpretation
    fill('black');
    textSize(10);
    let textY = interpY + 20;
    let textX = margin + 8;
    let maxWidth = canvasWidth - margin * 2 - 16;

    // Build interpretation text
    let direction = slope > 0 ? 'positive' : 'negative';
    let strength = '';
    let absR = Math.abs(rValue);
    if (absR >= 0.8) strength = 'strong';
    else if (absR >= 0.5) strength = 'moderate';
    else if (absR >= 0.3) strength = 'weak';
    else strength = 'very weak';

    let slopeInterp = 'For each additional ' + dataset.xUnit.replace(/s$/, '') + ' of ' +
                      dataset.xLabel.toLowerCase() + ', ' + dataset.yLabel.toLowerCase() +
                      ' is predicted to ' + (slope > 0 ? 'increase' : 'decrease') +
                      ' by ' + Math.abs(slope).toFixed(2) + ' ' + dataset.yUnit + '.';

    let rSquaredInterp = 'The model explains ' + (rSquared * 100).toFixed(1) +
                         '% of the variability in ' + dataset.yLabel.toLowerCase() + '.';

    // Wrap and draw text
    textWrap(WORD);
    text('There is a ' + strength + ' ' + direction + ' linear relationship between ' +
         dataset.xLabel.toLowerCase() + ' and ' + dataset.yLabel.toLowerCase() +
         ' (r = ' + rValue.toFixed(3) + '). ' + slopeInterp + ' ' + rSquaredInterp,
         textX, textY, maxWidth, interpHeight - 25);
}

function drawControls() {
    buttons = [];
    let controlY = drawHeight + 12;

    // Dataset dropdown
    dropdownRect = {x: margin, y: controlY, w: 180, h: 26};

    fill('white');
    stroke(150);
    strokeWeight(1);
    rect(dropdownRect.x, dropdownRect.y, dropdownRect.w, dropdownRect.h, 4);

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    // Truncate long dataset names
    let displayName = currentDataset.length > 22 ? currentDataset.substring(0, 20) + '...' : currentDataset;
    text(displayName, dropdownRect.x + 8, dropdownRect.y + dropdownRect.h / 2);

    // Dropdown arrow
    fill(100);
    let arrowX = dropdownRect.x + dropdownRect.w - 15;
    let arrowY = dropdownRect.y + dropdownRect.h / 2;
    if (dropdownOpen) {
        triangle(arrowX - 4, arrowY + 2, arrowX + 4, arrowY + 2, arrowX, arrowY - 3);
    } else {
        triangle(arrowX - 4, arrowY - 2, arrowX + 4, arrowY - 2, arrowX, arrowY + 3);
    }

    // Toggle buttons row
    let btnX = dropdownRect.x + dropdownRect.w + 10;
    let btnY = controlY;
    let btnH = 26;

    // Show Residual Plot toggle
    drawToggleButton(btnX, btnY, 100, btnH, 'Residuals', showResidualPlot, 'toggleResidual');
    btnX += 108;

    // Highlight Influential toggle
    drawToggleButton(btnX, btnY, 100, btnH, 'Influential', highlightInfluential, 'toggleInfluential');
    btnX += 108;

    // Export Analysis button (if space)
    if (btnX + 80 < canvasWidth - margin) {
        drawActionButton(btnX, btnY, 80, btnH, 'Export', 'export');
    }

    // Second row - instructions
    let row2Y = controlY + 35;
    fill(100);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Select a dataset, toggle residual/influential views, and use the prediction calculator.', margin, row2Y);

    // Sylvia tip
    fill(sylviaGreenDark);
    textSize(10);
    let tipY = row2Y + 18;
    text('Sylvia says: "Check those residuals - random scatter means a good fit!"', margin, tipY);
}

function drawToggleButton(x, y, w, h, label, isOn, action) {
    let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

    if (isOn) {
        fill(sylviaGreen);
        stroke(sylviaGreenDark);
    } else {
        fill(isHover ? 240 : 255);
        stroke(150);
    }
    strokeWeight(1);
    rect(x, y, w, h, 4);

    fill(isOn ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text((isOn ? 'Hide ' : 'Show ') + label, x + w / 2, y + h / 2);

    buttons.push({action: action, x: x, y: y, w: w, h: h});
}

function drawActionButton(x, y, w, h, label, action) {
    let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

    fill(isHover ? sylviaAuburn : sylviaGreen);
    stroke(50);
    strokeWeight(1);
    rect(x, y, w, h, 4);

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(label, x + w / 2, y + h / 2);

    buttons.push({action: action, x: x, y: y, w: w, h: h});
}

function drawDropdownMenu() {
    let menuX = dropdownRect.x;
    let menuY = dropdownRect.y + dropdownRect.h;
    let menuW = dropdownRect.w + 30;
    let optionH = 24;

    // Menu background with shadow
    fill(255);
    stroke(150);
    strokeWeight(1);
    rect(menuX, menuY, menuW, dropdownOptions.length * optionH, 0, 0, 4, 4);

    // Menu options
    for (let i = 0; i < dropdownOptions.length; i++) {
        let optY = menuY + i * optionH;
        let isHover = mouseX >= menuX && mouseX <= menuX + menuW &&
                      mouseY >= optY && mouseY <= optY + optionH;

        if (isHover) {
            fill(sylviaCream);
            noStroke();
            rect(menuX + 1, optY, menuW - 2, optionH);
        }

        fill(dropdownOptions[i] === currentDataset ? sylviaGreen : 'black');
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(10);
        text(dropdownOptions[i], menuX + 8, optY + optionH / 2);
    }
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function mousePressed() {
    // Close dropdown if clicking elsewhere
    if (dropdownOpen) {
        let menuX = dropdownRect.x;
        let menuY = dropdownRect.y + dropdownRect.h;
        let menuW = dropdownRect.w + 30;
        let optionH = 24;
        let menuH = dropdownOptions.length * optionH;

        // Check if clicking on an option
        if (mouseX >= menuX && mouseX <= menuX + menuW &&
            mouseY >= menuY && mouseY <= menuY + menuH) {
            for (let i = 0; i < dropdownOptions.length; i++) {
                let optY = menuY + i * optionH;
                if (mouseY >= optY && mouseY <= optY + optionH) {
                    currentDataset = dropdownOptions[i];
                    calculateRegression();
                    predictionValue = '';
                    predictionResult = null;
                    break;
                }
            }
        }
        dropdownOpen = false;
        return;
    }

    // Check dropdown toggle
    if (mouseX >= dropdownRect.x && mouseX <= dropdownRect.x + dropdownRect.w &&
        mouseY >= dropdownRect.y && mouseY <= dropdownRect.y + dropdownRect.h) {
        dropdownOpen = true;
        return;
    }

    // Check prediction input field
    let inputX = predPanelLeft + 8;
    let inputY = predPanelTop + 45;
    let inputW = predPanelWidth - 85;
    let inputH = 22;

    if (mouseX >= inputX && mouseX <= inputX + inputW &&
        mouseY >= inputY && mouseY <= inputY + inputH) {
        editingPrediction = true;
        return;
    } else if (editingPrediction) {
        editingPrediction = false;
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

function handleButtonClick(action) {
    if (action === 'toggleResidual') {
        showResidualPlot = !showResidualPlot;
    } else if (action === 'toggleInfluential') {
        highlightInfluential = !highlightInfluential;
    } else if (action === 'calculate') {
        calculatePrediction();
    } else if (action === 'export') {
        exportAnalysis();
    }
}

function calculatePrediction() {
    let xVal = parseFloat(predictionValue);
    if (isNaN(xVal)) {
        predictionResult = null;
        return;
    }

    let dataset = datasets[currentDataset];
    let data = dataset.data;
    let xMin = Math.min(...data.map(p => p.x));
    let xMax = Math.max(...data.map(p => p.x));

    // Check for extrapolation
    isExtrapolation = xVal < xMin || xVal > xMax;

    // Calculate predicted y
    let yVal = slope * xVal + intercept;
    predictionResult = {x: xVal, y: yVal};
}

function exportAnalysis() {
    let dataset = datasets[currentDataset];
    let output = [];

    output.push('REGRESSION ANALYSIS REPORT');
    output.push('='.repeat(40));
    output.push('');
    output.push('Dataset: ' + currentDataset);
    output.push('X Variable: ' + dataset.xLabel + ' (' + dataset.xUnit + ')');
    output.push('Y Variable: ' + dataset.yLabel + ' (' + dataset.yUnit + ')');
    output.push('');
    output.push('REGRESSION EQUATION');
    output.push('-'.repeat(20));
    let slopeSign = intercept >= 0 ? '+' : '';
    output.push('y = ' + slope.toFixed(4) + 'x ' + slopeSign + ' ' + intercept.toFixed(4));
    output.push('');
    output.push('STATISTICS');
    output.push('-'.repeat(20));
    output.push('Correlation (r): ' + rValue.toFixed(4));
    output.push('R-squared: ' + (rSquared * 100).toFixed(2) + '%');
    output.push('Slope: ' + slope.toFixed(4));
    output.push('Y-intercept: ' + intercept.toFixed(4));
    output.push('Mean X: ' + meanX.toFixed(4));
    output.push('Mean Y: ' + meanY.toFixed(4));
    output.push('Sample size (n): ' + dataset.data.length);
    output.push('');
    output.push('INTERPRETATION');
    output.push('-'.repeat(20));

    let direction = slope > 0 ? 'positive' : 'negative';
    let strength = '';
    let absR = Math.abs(rValue);
    if (absR >= 0.8) strength = 'strong';
    else if (absR >= 0.5) strength = 'moderate';
    else if (absR >= 0.3) strength = 'weak';
    else strength = 'very weak';

    output.push('There is a ' + strength + ' ' + direction + ' linear relationship');
    output.push('between ' + dataset.xLabel.toLowerCase() + ' and ' + dataset.yLabel.toLowerCase() + '.');
    output.push('');
    output.push('For each additional ' + dataset.xUnit.replace(/s$/, '') + ' of ' + dataset.xLabel.toLowerCase() + ',');
    output.push(dataset.yLabel.toLowerCase() + ' is predicted to ' + (slope > 0 ? 'increase' : 'decrease'));
    output.push('by ' + Math.abs(slope).toFixed(2) + ' ' + dataset.yUnit + '.');
    output.push('');
    output.push('The model explains ' + (rSquared * 100).toFixed(1) + '% of the variability');
    output.push('in ' + dataset.yLabel.toLowerCase() + '.');

    if (influentialPoints.length > 0) {
        output.push('');
        output.push('WARNING: ' + influentialPoints.length + ' influential point(s) detected.');
        output.push('Consider examining these observations carefully.');
    }

    // Copy to clipboard or display
    let text = output.join('\n');

    // Try to copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Analysis copied to clipboard!');
        }).catch(() => {
            alert('Analysis:\n\n' + text);
        });
    } else {
        alert('Analysis:\n\n' + text);
    }
}

function keyPressed() {
    if (!editingPrediction) return true;

    if (keyCode === ENTER) {
        calculatePrediction();
        editingPrediction = false;
        return false;
    }

    if (keyCode === ESCAPE) {
        editingPrediction = false;
        return false;
    }

    if (keyCode === BACKSPACE) {
        predictionValue = predictionValue.slice(0, -1);
        return false;
    }

    return true;
}

function keyTyped() {
    if (!editingPrediction) return true;

    // Allow numbers, decimal point, and minus sign
    if ((key >= '0' && key <= '9') || key === '.' || key === '-') {
        if (key === '.' && predictionValue.includes('.')) return false;
        if (key === '-' && predictionValue.length > 0) return false;
        predictionValue += key;
        return false;
    }

    return true;
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
