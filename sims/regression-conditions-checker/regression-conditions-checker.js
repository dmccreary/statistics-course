// Regression Conditions Checker MicroSim
// Evaluate LINE conditions for regression inference
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 750;
let drawHeight = 480;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let margin = 10;

// Data and scenario
let currentScenario = 0;
let scenarios = [
    { name: 'Good Data (All Conditions Met)', type: 'good' },
    { name: 'Curved Relationship (Nonlinear)', type: 'curved' },
    { name: 'Fan Shape (Unequal Variance)', type: 'fan' },
    { name: 'Skewed Residuals (Non-normal)', type: 'skewed' },
    { name: 'Outliers Present', type: 'outliers' }
];

// Generated data
let data = [];
let residuals = [];
let predicted = [];
let slope = 0;
let intercept = 0;

// Student answers
let studentAnswers = {
    linearity: null,
    independence: null,
    normality: null,
    equalVariance: null
};

let showFeedback = false;
let correctAnswers = {};

// Sylvia theme
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    generateData();
    describe('Interactive regression conditions checker for LINE conditions', LABEL);
}

function generateData() {
    data = [];
    residuals = [];
    predicted = [];

    let n = 40;
    let scenario = scenarios[currentScenario];

    for (let i = 0; i < n; i++) {
        let x = random(2, 18);
        let y;

        switch (scenario.type) {
            case 'good':
                // Good linear data with constant variance, normal errors
                y = 10 + 2 * x + randomGaussian(0, 3);
                break;

            case 'curved':
                // Quadratic relationship
                y = 5 + 0.5 * x + 0.15 * x * x + randomGaussian(0, 2);
                break;

            case 'fan':
                // Increasing variance (fan shape)
                y = 10 + 2 * x + randomGaussian(0, 0.5 + 0.3 * x);
                break;

            case 'skewed':
                // Skewed errors (chi-square like)
                let error = (Math.pow(random(), 2) - 0.33) * 15;
                y = 10 + 2 * x + error;
                break;

            case 'outliers':
                // Normal with some outliers
                y = 10 + 2 * x + randomGaussian(0, 2);
                if (i < 3) {
                    // Add some outliers
                    y = 10 + 2 * x + (random() > 0.5 ? 15 : -15);
                }
                break;
        }

        data.push({ x: x, y: y });
    }

    // Sort by x for easier plotting
    data.sort((a, b) => a.x - b.x);

    // Calculate regression
    calculateRegression();

    // Set correct answers
    setCorrectAnswers();

    // Reset student answers
    studentAnswers = { linearity: null, independence: null, normality: null, equalVariance: null };
    showFeedback = false;
}

function calculateRegression() {
    let n = data.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    for (let pt of data) {
        sumX += pt.x;
        sumY += pt.y;
        sumXY += pt.x * pt.y;
        sumX2 += pt.x * pt.x;
    }

    slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    intercept = (sumY - slope * sumX) / n;

    // Calculate residuals
    residuals = [];
    predicted = [];
    for (let pt of data) {
        let pred = intercept + slope * pt.x;
        predicted.push(pred);
        residuals.push(pt.y - pred);
    }
}

function setCorrectAnswers() {
    let scenario = scenarios[currentScenario];

    switch (scenario.type) {
        case 'good':
            correctAnswers = { linearity: true, independence: true, normality: true, equalVariance: true };
            break;
        case 'curved':
            correctAnswers = { linearity: false, independence: true, normality: true, equalVariance: true };
            break;
        case 'fan':
            correctAnswers = { linearity: true, independence: true, normality: true, equalVariance: false };
            break;
        case 'skewed':
            correctAnswers = { linearity: true, independence: true, normality: false, equalVariance: true };
            break;
        case 'outliers':
            correctAnswers = { linearity: true, independence: true, normality: false, equalVariance: true };
            break;
    }
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
    textSize(14);
    text('Regression Conditions Checker (LINE)', canvasWidth / 2, 6);

    // Draw the four diagnostic plots in a 2x2 grid
    let plotW = (canvasWidth - margin * 3) / 2;
    let plotH = 180;

    // Top left: Scatterplot with regression line
    drawScatterplot(margin, 28, plotW, plotH);

    // Top right: Residual plot
    drawResidualPlot(margin * 2 + plotW, 28, plotW, plotH);

    // Bottom left: Histogram of residuals
    drawResidualHistogram(margin, 28 + plotH + 15, plotW, plotH);

    // Bottom right: Checklist
    drawChecklist(margin * 2 + plotW, 28 + plotH + 15, plotW, plotH);

    // Controls
    drawControls();
}

function drawScatterplot(x, y, w, h) {
    // Background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text('Scatterplot with Regression Line', x + w / 2, y + 5);

    // Plot area
    let plotLeft = x + 35;
    let plotRight = x + w - 15;
    let plotTop = y + 25;
    let plotBottom = y + h - 25;

    // Calculate ranges
    let xMin = Math.min(...data.map(d => d.x)) - 1;
    let xMax = Math.max(...data.map(d => d.x)) + 1;
    let yMin = Math.min(...data.map(d => d.y)) - 2;
    let yMax = Math.max(...data.map(d => d.y)) + 2;

    // Axes
    stroke(100);
    strokeWeight(1);
    line(plotLeft, plotBottom, plotRight, plotBottom);
    line(plotLeft, plotTop, plotLeft, plotBottom);

    // Draw regression line
    stroke(sylviaAuburn);
    strokeWeight(2);
    let y1 = map(intercept + slope * xMin, yMin, yMax, plotBottom, plotTop);
    let y2 = map(intercept + slope * xMax, yMin, yMax, plotBottom, plotTop);
    let x1 = map(xMin, xMin, xMax, plotLeft, plotRight);
    let x2 = map(xMax, xMin, xMax, plotLeft, plotRight);
    line(x1, y1, x2, y2);

    // Draw points
    fill(sylviaGreen);
    noStroke();
    for (let pt of data) {
        let px = map(pt.x, xMin, xMax, plotLeft, plotRight);
        let py = map(pt.y, yMin, yMax, plotBottom, plotTop);
        py = constrain(py, plotTop, plotBottom);
        ellipse(px, py, 5, 5);
    }

    // Labels
    fill(80);
    textSize(9);
    textAlign(CENTER, TOP);
    text('x', (plotLeft + plotRight) / 2, plotBottom + 3);
}

function drawResidualPlot(x, y, w, h) {
    // Background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text('Residual Plot (Check Linearity & Equal Variance)', x + w / 2, y + 5);

    // Plot area
    let plotLeft = x + 35;
    let plotRight = x + w - 15;
    let plotTop = y + 25;
    let plotBottom = y + h - 25;

    // Calculate ranges
    let xMin = Math.min(...data.map(d => d.x)) - 1;
    let xMax = Math.max(...data.map(d => d.x)) + 1;
    let resMax = Math.max(...residuals.map(r => Math.abs(r))) * 1.2;

    // Axes
    stroke(100);
    strokeWeight(1);
    line(plotLeft, plotBottom, plotRight, plotBottom);
    line(plotLeft, plotTop, plotLeft, plotBottom);

    // Zero line
    stroke(sylviaAuburn);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    let zeroY = map(0, -resMax, resMax, plotBottom, plotTop);
    line(plotLeft, zeroY, plotRight, zeroY);
    drawingContext.setLineDash([]);

    // Draw residual points
    fill(sylviaGreen);
    noStroke();
    for (let i = 0; i < data.length; i++) {
        let px = map(data[i].x, xMin, xMax, plotLeft, plotRight);
        let py = map(residuals[i], -resMax, resMax, plotBottom, plotTop);
        py = constrain(py, plotTop, plotBottom);
        ellipse(px, py, 5, 5);
    }

    // Labels
    fill(80);
    textSize(9);
    textAlign(CENTER, TOP);
    text('x', (plotLeft + plotRight) / 2, plotBottom + 3);
}

function drawResidualHistogram(x, y, w, h) {
    // Background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text('Histogram of Residuals (Check Normality)', x + w / 2, y + 5);

    // Plot area
    let histLeft = x + 35;
    let histRight = x + w - 15;
    let histTop = y + 25;
    let histBottom = y + h - 25;

    // Create histogram bins
    let resMin = Math.min(...residuals);
    let resMax = Math.max(...residuals);
    let range = resMax - resMin;
    let numBins = 12;
    let binWidth = range / numBins;
    let bins = new Array(numBins).fill(0);

    for (let r of residuals) {
        let binIndex = Math.floor((r - resMin) / binWidth);
        binIndex = constrain(binIndex, 0, numBins - 1);
        bins[binIndex]++;
    }

    let maxCount = Math.max(...bins);

    // Draw histogram bars
    let barW = (histRight - histLeft) / numBins;
    fill(sylviaGreen);
    fill(red(color(sylviaGreen)), green(color(sylviaGreen)), blue(color(sylviaGreen)), 180);
    noStroke();

    for (let i = 0; i < numBins; i++) {
        let barH = map(bins[i], 0, maxCount, 0, histBottom - histTop - 10);
        rect(histLeft + i * barW, histBottom - barH, barW - 2, barH);
    }

    // Axis
    stroke(100);
    strokeWeight(1);
    line(histLeft, histBottom, histRight, histBottom);

    // Labels
    fill(80);
    textSize(9);
    textAlign(CENTER, TOP);
    text('Residual', (histLeft + histRight) / 2, histBottom + 3);
}

function drawChecklist(x, y, w, h) {
    // Background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text('LINE Conditions Checklist', x + w / 2, y + 5);

    // Conditions list
    let conditions = [
        { key: 'linearity', label: 'L - Linearity', help: 'No pattern in residual plot' },
        { key: 'independence', label: 'I - Independence', help: '(Assume random sample)' },
        { key: 'normality', label: 'N - Normality of Residuals', help: 'Histogram roughly symmetric' },
        { key: 'equalVariance', label: 'E - Equal Variance', help: 'Consistent spread in residual plot' }
    ];

    let checkY = y + 28;
    let rowHeight = 35;

    for (let cond of conditions) {
        // Condition name
        fill(80);
        textAlign(LEFT, TOP);
        textSize(10);
        text(cond.label, x + 15, checkY);

        fill(120);
        textSize(8);
        text(cond.help, x + 15, checkY + 13);

        // Yes/No buttons
        let btnY = checkY + 3;
        let yesX = x + w - 85;
        let noX = x + w - 45;

        // Yes button
        let yesSelected = studentAnswers[cond.key] === true;
        let yesCorrect = showFeedback && correctAnswers[cond.key] === true;

        if (showFeedback && yesCorrect) {
            fill('#81C784');
        } else if (yesSelected) {
            fill(sylviaGreen);
        } else {
            fill('#E8F5E9');
        }
        stroke(sylviaGreen);
        strokeWeight(1);
        rect(yesX, btnY, 35, 22, 3);

        fill(yesSelected ? 'white' : sylviaGreen);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        text('Met', yesX + 17, btnY + 11);

        // No button
        let noSelected = studentAnswers[cond.key] === false;
        let noCorrect = showFeedback && correctAnswers[cond.key] === false;

        if (showFeedback && noCorrect) {
            fill('#81C784');
        } else if (noSelected) {
            fill('#C62828');
        } else {
            fill('#FFEBEE');
        }
        stroke('#C62828');
        strokeWeight(1);
        rect(noX, btnY, 35, 22, 3);

        fill(noSelected ? 'white' : '#C62828');
        noStroke();
        textSize(10);
        text('Not', noX + 17, btnY + 11);

        checkY += rowHeight;
    }

    // Check Answers button
    let allAnswered = Object.values(studentAnswers).every(v => v !== null);
    let btnY = y + h - 35;

    fill(allAnswered ? sylviaAuburn : '#ccc');
    noStroke();
    rect(x + w / 2 - 60, btnY, 120, 28, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(11);
    text(showFeedback ? 'Answers Shown' : 'Check Answers', x + w / 2, btnY + 14);

    // Score if feedback shown
    if (showFeedback) {
        let correct = 0;
        for (let key in correctAnswers) {
            if (studentAnswers[key] === correctAnswers[key]) correct++;
        }
        fill(correct === 4 ? sylviaGreen : sylviaAuburn);
        textSize(10);
        text(correct + '/4 correct', x + w / 2, btnY - 10);
    }
}

function drawControls() {
    let y = drawHeight + 10;

    // Scenario selector
    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Scenario:', 10, y + 15);

    // Scenario buttons
    for (let i = 0; i < scenarios.length; i++) {
        let bx = 75 + i * 130;
        let isSelected = currentScenario === i;

        fill(isSelected ? sylviaGreen : '#E0E0E0');
        rect(bx, y + 3, 125, 24, 4);

        fill(isSelected ? 'white' : 'black');
        textAlign(CENTER, CENTER);
        textSize(9);
        text(scenarios[i].name, bx + 62, y + 15);
    }

    // Generate New Data button
    fill(sylviaAuburn);
    rect(canvasWidth - 130, y + 3, 120, 24, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Generate New Data', canvasWidth - 70, y + 15);

    // Second row - hint
    let y2 = y + 35;
    fill(100);
    textAlign(LEFT, CENTER);
    textSize(9);
    text('Look for patterns: Curved patterns violate linearity. Fan shapes violate equal variance. Skewness violates normality.', 10, y2 + 8);
}

function mousePressed() {
    let y = drawHeight + 10;

    // Scenario buttons
    for (let i = 0; i < scenarios.length; i++) {
        let bx = 75 + i * 130;
        if (mouseX >= bx && mouseX <= bx + 125 && mouseY >= y + 3 && mouseY <= y + 27) {
            currentScenario = i;
            generateData();
            return;
        }
    }

    // Generate New Data button
    if (mouseX >= canvasWidth - 130 && mouseX <= canvasWidth - 10 &&
        mouseY >= y + 3 && mouseY <= y + 27) {
        generateData();
        return;
    }

    // Checklist buttons
    let checklistX = margin * 2 + (canvasWidth - margin * 3) / 2;
    let checklistY = 28 + 180 + 15;
    let conditions = ['linearity', 'independence', 'normality', 'equalVariance'];

    let checkY = checklistY + 28;
    let rowHeight = 35;
    let w = (canvasWidth - margin * 3) / 2;

    for (let i = 0; i < conditions.length; i++) {
        let btnY = checkY + 3 + i * rowHeight;
        let yesX = checklistX + w - 85;
        let noX = checklistX + w - 45;

        // Yes button
        if (mouseX >= yesX && mouseX <= yesX + 35 && mouseY >= btnY && mouseY <= btnY + 22) {
            studentAnswers[conditions[i]] = true;
            showFeedback = false;
            return;
        }

        // No button
        if (mouseX >= noX && mouseX <= noX + 35 && mouseY >= btnY && mouseY <= btnY + 22) {
            studentAnswers[conditions[i]] = false;
            showFeedback = false;
            return;
        }
    }

    // Check Answers button
    let allAnswered = Object.values(studentAnswers).every(v => v !== null);
    let btnY = checklistY + 180 - 35;

    if (allAnswered && mouseX >= checklistX + w / 2 - 60 && mouseX <= checklistX + w / 2 + 60 &&
        mouseY >= btnY && mouseY <= btnY + 28) {
        showFeedback = true;
        return;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
