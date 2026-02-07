// Goodness-of-Fit Test Simulator MicroSim
// Complete interactive GOF test with multiple examples
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 750;
let drawHeight = 480;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let margin = 15;

// Test data
let numCategories = 5;
let categories = ['Red', 'Orange', 'Yellow', 'Green', 'Blue'];
let observed = [24, 20, 18, 22, 16];
let proportions = [0.20, 0.25, 0.20, 0.15, 0.20];
let expected = [];

// Test parameters
let alpha = 0.05;
let testCompleted = false;
let chiSquare = 0;
let df = 0;
let pValue = 0;

// Category colors
let catColors = ['#E53935', '#FB8C00', '#FFEB3B', '#4CAF50', '#2196F3', '#9C27B0', '#795548', '#607D8B'];

// Sylvia theme
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';

// UI state
let editingObs = -1;
let editingProp = -1;
let inputBuffer = '';

// Preset examples
let presets = {
    'candy': {
        name: 'Candy Colors',
        categories: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        observed: [24, 20, 18, 22, 16],
        proportions: [0.20, 0.25, 0.20, 0.15, 0.20]
    },
    'dice': {
        name: 'Dice Fairness',
        categories: ['1', '2', '3', '4', '5', '6'],
        observed: [8, 12, 15, 11, 18, 16],
        proportions: [1/6, 1/6, 1/6, 1/6, 1/6, 1/6]
    },
    'birthdays': {
        name: 'Birth Days',
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        observed: [35, 48, 52, 49, 51, 55, 40],
        proportions: [1/7, 1/7, 1/7, 1/7, 1/7, 1/7, 1/7]
    },
    'mendel': {
        name: 'Mendel Peas',
        categories: ['Round Yellow', 'Round Green', 'Wrinkled Yellow', 'Wrinkled Green'],
        observed: [315, 108, 101, 32],
        proportions: [9/16, 3/16, 3/16, 1/16]
    }
};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    calculateExpected();
    describe('Interactive goodness-of-fit test simulator with preloaded examples', LABEL);
}

function calculateExpected() {
    let total = observed.reduce((a, b) => a + b, 0);
    expected = proportions.map(p => total * p);
    df = numCategories - 1;
}

function runTest() {
    calculateExpected();

    // Check conditions
    let allValid = expected.every(e => e >= 5);
    if (!allValid) {
        testCompleted = false;
        return;
    }

    // Calculate chi-square
    chiSquare = 0;
    for (let i = 0; i < numCategories; i++) {
        chiSquare += Math.pow(observed[i] - expected[i], 2) / expected[i];
    }

    // Calculate p-value using chi-square CDF approximation
    pValue = 1 - chiSquareCDF(chiSquare, df);

    testCompleted = true;
}

function chiSquareCDF(x, df) {
    // Approximation using regularized incomplete gamma function
    if (x <= 0) return 0;
    return gammaCDF(df / 2, x / 2);
}

function gammaCDF(a, x) {
    // Regularized incomplete gamma function approximation
    if (x < 0) return 0;
    if (x === 0) return 0;

    // Series expansion for small x
    if (x < a + 1) {
        let sum = 0;
        let term = 1 / a;
        sum = term;
        for (let n = 1; n < 100; n++) {
            term *= x / (a + n);
            sum += term;
            if (Math.abs(term) < 1e-10) break;
        }
        return sum * Math.exp(-x + a * Math.log(x) - lnGamma(a));
    } else {
        // Continued fraction for large x
        let f = 1 + x - a;
        let c = 1 / 1e-30;
        let d = 1 / f;
        let h = d;
        for (let n = 1; n < 100; n++) {
            let an = -n * (n - a);
            let bn = f + 2 * n;
            d = bn + an * d;
            if (Math.abs(d) < 1e-30) d = 1e-30;
            c = bn + an / c;
            if (Math.abs(c) < 1e-30) c = 1e-30;
            d = 1 / d;
            let delta = c * d;
            h *= delta;
            if (Math.abs(delta - 1) < 1e-10) break;
        }
        return 1 - Math.exp(-x + a * Math.log(x) - lnGamma(a)) * h;
    }
}

function lnGamma(z) {
    // Lanczos approximation for ln(Gamma(z))
    let g = 7;
    let c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
             771.32342877765313, -176.61502916214059, 12.507343278686905,
             -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if (z < 0.5) {
        return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z);
    }
    z -= 1;
    let x = c[0];
    for (let i = 1; i < g + 2; i++) {
        x += c[i] / (z + i);
    }
    let t = z + g + 0.5;
    return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
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
    textSize(16);
    text('Goodness-of-Fit Test Simulator', canvasWidth / 2, 8);

    // Left panel - Data entry
    drawDataPanel();

    // Right panel - Results
    drawResultsPanel();

    // Controls
    drawControls();
}

function drawDataPanel() {
    let panelLeft = margin;
    let panelWidth = canvasWidth * 0.42;
    let panelTop = 35;
    let panelHeight = 340;

    // Panel background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(panelLeft, panelTop, panelWidth, panelHeight, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text('Data Entry', panelLeft + 10, panelTop + 8);

    // Number of categories selector
    fill(80);
    textSize(10);
    text('Categories:', panelLeft + 10, panelTop + 28);

    for (let n = 3; n <= 8; n++) {
        let bx = panelLeft + 80 + (n - 3) * 28;
        fill(numCategories === n ? sylviaGreen : '#ddd');
        noStroke();
        rect(bx, panelTop + 24, 24, 18, 3);
        fill(numCategories === n ? 'white' : 'black');
        textAlign(CENTER, CENTER);
        textSize(10);
        text(n, bx + 12, panelTop + 33);
    }

    // Data table
    let tableTop = panelTop + 50;
    let colWidth = (panelWidth - 30) / 3;
    let rowHeight = 28;

    // Headers
    textAlign(CENTER, CENTER);
    textSize(10);
    fill(sylviaGreen);
    text('Category', panelLeft + 15 + colWidth * 0.5, tableTop + 10);
    text('Observed', panelLeft + 15 + colWidth * 1.5, tableTop + 10);
    text('Proportion', panelLeft + 15 + colWidth * 2.5, tableTop + 10);

    stroke(200);
    line(panelLeft + 10, tableTop + 22, panelLeft + panelWidth - 10, tableTop + 22);

    // Data rows
    for (let i = 0; i < numCategories; i++) {
        let y = tableTop + 25 + i * rowHeight;

        // Category name
        fill(catColors[i % catColors.length]);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        let catName = i < categories.length ? categories[i] : 'Cat ' + (i + 1);
        text(catName.substring(0, 12), panelLeft + 15 + colWidth * 0.5, y + 12);

        // Observed (editable)
        if (editingObs === i) {
            fill(255, 255, 200);
            stroke(sylviaAuburn);
            strokeWeight(2);
            rect(panelLeft + 15 + colWidth, y, colWidth - 5, rowHeight - 4, 3);
            fill('black');
            noStroke();
            text(inputBuffer + '_', panelLeft + 15 + colWidth * 1.5, y + 12);
        } else {
            fill(240);
            noStroke();
            rect(panelLeft + 15 + colWidth, y, colWidth - 5, rowHeight - 4, 3);
            fill(80);
            let obsVal = i < observed.length ? observed[i] : 0;
            text(obsVal, panelLeft + 15 + colWidth * 1.5, y + 12);
        }

        // Proportion (editable)
        if (editingProp === i) {
            fill(255, 255, 200);
            stroke(sylviaAuburn);
            strokeWeight(2);
            rect(panelLeft + 15 + colWidth * 2, y, colWidth - 5, rowHeight - 4, 3);
            fill('black');
            noStroke();
            text(inputBuffer + '_', panelLeft + 15 + colWidth * 2.5, y + 12);
        } else {
            fill(240);
            noStroke();
            rect(panelLeft + 15 + colWidth * 2, y, colWidth - 5, rowHeight - 4, 3);
            fill(80);
            let propVal = i < proportions.length ? proportions[i] : 0;
            text(propVal.toFixed(3), panelLeft + 15 + colWidth * 2.5, y + 12);
        }
    }

    // Totals row
    let totalY = tableTop + 25 + numCategories * rowHeight + 5;
    stroke(200);
    line(panelLeft + 10, totalY - 5, panelLeft + panelWidth - 10, totalY - 5);

    fill(80);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Total:', panelLeft + 15 + colWidth * 0.5, totalY + 8);

    let obsTotal = observed.slice(0, numCategories).reduce((a, b) => a + b, 0);
    let propTotal = proportions.slice(0, numCategories).reduce((a, b) => a + b, 0);
    text(obsTotal, panelLeft + 15 + colWidth * 1.5, totalY + 8);

    fill(Math.abs(propTotal - 1) < 0.001 ? sylviaGreen : '#C62828');
    text(propTotal.toFixed(3), panelLeft + 15 + colWidth * 2.5, totalY + 8);

    if (Math.abs(propTotal - 1) > 0.001) {
        fill('#C62828');
        textSize(9);
        text('(should = 1.000)', panelLeft + 15 + colWidth * 2.5, totalY + 22);
    }
}

function drawResultsPanel() {
    let panelLeft = canvasWidth * 0.45;
    let panelWidth = canvasWidth * 0.53;
    let panelTop = 35;

    // Panel background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(panelLeft, panelTop, panelWidth, 340, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text('Test Results', panelLeft + 10, panelTop + 8);

    // Run Test button
    fill(testCompleted ? '#4CAF50' : sylviaAuburn);
    rect(panelLeft + panelWidth - 90, panelTop + 5, 80, 22, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Run Test', panelLeft + panelWidth - 50, panelTop + 16);

    if (!testCompleted) {
        fill(150);
        textAlign(CENTER, CENTER);
        textSize(11);
        text('Click "Run Test" to perform the', panelLeft + panelWidth / 2, panelTop + 100);
        text('goodness-of-fit test', panelLeft + panelWidth / 2, panelTop + 115);
        return;
    }

    // Bar chart
    drawComparisonChart(panelLeft + 10, panelTop + 30, panelWidth - 20, 130);

    // Chi-square distribution
    drawChiSquareResult(panelLeft + 10, panelTop + 170, panelWidth - 20, 100);

    // Conclusion
    drawConclusion(panelLeft + 10, panelTop + 275, panelWidth - 20);
}

function drawComparisonChart(x, y, w, h) {
    // Mini bar chart
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text('Observed vs Expected', x + w / 2, y);

    let chartTop = y + 15;
    let chartBottom = y + h - 15;
    let chartLeft = x + 30;
    let chartRight = x + w - 10;
    let chartWidth = chartRight - chartLeft;

    let barWidth = (chartWidth - (numCategories + 1) * 5) / numCategories / 2;
    let maxVal = Math.max(...observed.slice(0, numCategories), ...expected.slice(0, numCategories)) * 1.2;

    for (let i = 0; i < numCategories; i++) {
        let bx = chartLeft + 5 + i * (barWidth * 2 + 10);

        // Observed bar
        let obsH = map(observed[i], 0, maxVal, 0, chartBottom - chartTop);
        fill(catColors[i % catColors.length]);
        noStroke();
        rect(bx, chartBottom - obsH, barWidth, obsH);

        // Expected bar
        let expH = map(expected[i], 0, maxVal, 0, chartBottom - chartTop);
        fill(255);
        stroke(catColors[i % catColors.length]);
        strokeWeight(2);
        rect(bx + barWidth + 2, chartBottom - expH, barWidth, expH);
    }

    // Axis
    stroke(100);
    strokeWeight(1);
    line(chartLeft, chartBottom, chartRight, chartBottom);
}

function drawChiSquareResult(x, y, w, h) {
    // Chi-square distribution curve
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text('Chi-Square Distribution (df = ' + df + ')', x + w / 2, y);

    let curveLeft = x + 30;
    let curveRight = x + w - 10;
    let curveTop = y + 18;
    let curveBottom = y + h - 25;

    // Find max density
    let maxDensity = 0;
    let maxX = df * 3;
    for (let xv = 0.1; xv <= maxX; xv += 0.1) {
        let d = chiSquarePDF(xv, df);
        if (d > maxDensity) maxDensity = d;
    }

    // Shade p-value region
    let critX = map(chiSquare, 0, maxX, curveLeft, curveRight);
    fill(255, 200, 200, 150);
    noStroke();
    beginShape();
    vertex(critX, curveBottom);
    for (let px = critX; px <= curveRight; px++) {
        let xv = map(px, curveLeft, curveRight, 0, maxX);
        let d = chiSquarePDF(xv, df);
        let py = map(d, 0, maxDensity * 1.2, curveBottom, curveTop);
        py = constrain(py, curveTop, curveBottom);
        vertex(px, py);
    }
    vertex(curveRight, curveBottom);
    endShape(CLOSE);

    // Draw curve
    stroke(sylviaGreen);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let px = curveLeft; px <= curveRight; px++) {
        let xv = map(px, curveLeft, curveRight, 0, maxX);
        let d = chiSquarePDF(xv, df);
        let py = map(d, 0, maxDensity * 1.2, curveBottom, curveTop);
        py = constrain(py, curveTop, curveBottom);
        vertex(px, py);
    }
    endShape();

    // Mark chi-square value
    stroke(sylviaAuburn);
    strokeWeight(2);
    line(critX, curveTop, critX, curveBottom);

    // Labels
    fill(sylviaAuburn);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(9);
    text('\u03C7\u00B2=' + chiSquare.toFixed(2), critX, curveBottom + 2);

    // Statistics box
    let statsX = x + w - 130;
    fill(255, 248, 225);
    stroke(sylviaAuburn);
    strokeWeight(1);
    rect(statsX, y + 20, 120, 55, 4);

    fill(80);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(10);
    text('\u03C7\u00B2 = ' + chiSquare.toFixed(3), statsX + 8, y + 28);
    text('df = ' + df, statsX + 8, y + 42);
    text('p-value = ' + pValue.toFixed(4), statsX + 8, y + 56);
}

function chiSquarePDF(x, df) {
    if (x <= 0) return 0;
    let k = df / 2;
    let coef = 1 / (Math.pow(2, k) * Math.exp(lnGamma(k)));
    return coef * Math.pow(x, k - 1) * Math.exp(-x / 2);
}

function drawConclusion(x, y, w) {
    let reject = pValue < alpha;

    fill(reject ? '#FFEBEE' : '#E8F5E9');
    stroke(reject ? '#C62828' : sylviaGreen);
    strokeWeight(2);
    rect(x, y, w, 55, 5);

    fill(reject ? '#C62828' : sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);

    if (reject) {
        text('Reject H\u2080 (p = ' + pValue.toFixed(4) + ' < \u03B1 = ' + alpha + ')', x + 10, y + 8);
        fill(80);
        textSize(10);
        text('There is convincing evidence that the distribution', x + 10, y + 25);
        text('differs from the hypothesized proportions.', x + 10, y + 38);
    } else {
        text('Fail to Reject H\u2080 (p = ' + pValue.toFixed(4) + ' > \u03B1 = ' + alpha + ')', x + 10, y + 8);
        fill(80);
        textSize(10);
        text('There is not convincing evidence that the distribution', x + 10, y + 25);
        text('differs from the hypothesized proportions.', x + 10, y + 38);
    }
}

function drawControls() {
    let y = drawHeight + 10;

    // Significance level
    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Significance Level (\u03B1):', 10, y + 12);

    let alphas = [0.10, 0.05, 0.01];
    for (let i = 0; i < alphas.length; i++) {
        let bx = 130 + i * 50;
        fill(alpha === alphas[i] ? sylviaAuburn : '#ddd');
        rect(bx, y + 2, 45, 20, 3);
        fill(alpha === alphas[i] ? 'white' : 'black');
        textAlign(CENTER, CENTER);
        text(alphas[i].toFixed(2), bx + 22, y + 12);
    }

    // Preset buttons
    textAlign(LEFT, CENTER);
    fill(80);
    text('Load Example:', 300, y + 12);

    let presetNames = ['candy', 'dice', 'birthdays', 'mendel'];
    let presetLabels = ['Candy', 'Dice', 'Birthdays', 'Mendel'];
    for (let i = 0; i < presetNames.length; i++) {
        let bx = 400 + i * 65;
        fill(catColors[i]);
        rect(bx, y + 2, 60, 20, 3);
        fill('white');
        textAlign(CENTER, CENTER);
        textSize(9);
        text(presetLabels[i], bx + 30, y + 12);
    }

    // Second row - conditions check
    let y2 = y + 28;
    calculateExpected();
    let conditionsMet = expected.slice(0, numCategories).every(e => e >= 5);

    fill(conditionsMet ? sylviaGreen : '#C62828');
    textAlign(LEFT, CENTER);
    textSize(9);
    text(conditionsMet ? '\u2713 All expected counts \u2265 5 (conditions met)' :
                         '\u2717 Some expected counts < 5 (conditions NOT met)', 10, y2 + 8);

    fill(100);
    text('Expected counts: [' + expected.slice(0, numCategories).map(e => e.toFixed(1)).join(', ') + ']', 280, y2 + 8);
}

function mousePressed() {
    let y = drawHeight + 10;

    // Run Test button
    let panelLeft = canvasWidth * 0.45;
    let panelWidth = canvasWidth * 0.53;
    if (mouseX >= panelLeft + panelWidth - 90 && mouseX <= panelLeft + panelWidth - 10 &&
        mouseY >= 40 && mouseY <= 62) {
        runTest();
        return;
    }

    // Category count buttons
    let panelLeftData = margin;
    for (let n = 3; n <= 8; n++) {
        let bx = panelLeftData + 80 + (n - 3) * 28;
        if (mouseX >= bx && mouseX <= bx + 24 && mouseY >= 59 && mouseY <= 77) {
            numCategories = n;
            // Ensure arrays are long enough
            while (observed.length < n) observed.push(10);
            while (proportions.length < n) proportions.push(1 / n);
            while (categories.length < n) categories.push('Cat ' + categories.length);
            calculateExpected();
            testCompleted = false;
            return;
        }
    }

    // Alpha buttons
    let alphas = [0.10, 0.05, 0.01];
    for (let i = 0; i < alphas.length; i++) {
        let bx = 130 + i * 50;
        if (mouseX >= bx && mouseX <= bx + 45 && mouseY >= y + 2 && mouseY <= y + 22) {
            alpha = alphas[i];
            if (testCompleted) runTest();
            return;
        }
    }

    // Preset buttons
    let presetNames = ['candy', 'dice', 'birthdays', 'mendel'];
    for (let i = 0; i < presetNames.length; i++) {
        let bx = 400 + i * 65;
        if (mouseX >= bx && mouseX <= bx + 60 && mouseY >= y + 2 && mouseY <= y + 22) {
            let preset = presets[presetNames[i]];
            categories = [...preset.categories];
            observed = [...preset.observed];
            proportions = [...preset.proportions];
            numCategories = categories.length;
            calculateExpected();
            testCompleted = false;
            return;
        }
    }

    // Check data table clicks
    let tableTop = 85;
    let colWidth = (canvasWidth * 0.42 - 30) / 3;
    let rowHeight = 28;

    for (let i = 0; i < numCategories; i++) {
        let rowY = tableTop + 25 + i * rowHeight;

        // Observed column
        let obsX = margin + 15 + colWidth;
        if (mouseX >= obsX && mouseX <= obsX + colWidth - 5 &&
            mouseY >= rowY && mouseY <= rowY + rowHeight - 4) {
            editingObs = i;
            editingProp = -1;
            inputBuffer = observed[i].toString();
            return;
        }

        // Proportion column
        let propX = margin + 15 + colWidth * 2;
        if (mouseX >= propX && mouseX <= propX + colWidth - 5 &&
            mouseY >= rowY && mouseY <= rowY + rowHeight - 4) {
            editingProp = i;
            editingObs = -1;
            inputBuffer = proportions[i].toFixed(3);
            return;
        }
    }

    // Click elsewhere to finish editing
    finishEditing();
}

function finishEditing() {
    if (editingObs >= 0) {
        let val = parseInt(inputBuffer);
        if (!isNaN(val) && val >= 0) {
            observed[editingObs] = val;
        }
        editingObs = -1;
    }
    if (editingProp >= 0) {
        let val = parseFloat(inputBuffer);
        if (!isNaN(val) && val >= 0 && val <= 1) {
            proportions[editingProp] = val;
        }
        editingProp = -1;
    }
    inputBuffer = '';
    calculateExpected();
    testCompleted = false;
}

function keyPressed() {
    if (editingObs >= 0 || editingProp >= 0) {
        if (keyCode === ENTER || keyCode === RETURN) {
            finishEditing();
        } else if (keyCode === BACKSPACE) {
            inputBuffer = inputBuffer.slice(0, -1);
        } else if (keyCode === ESCAPE) {
            editingObs = -1;
            editingProp = -1;
            inputBuffer = '';
        } else if ((key >= '0' && key <= '9') || key === '.') {
            if (inputBuffer.length < 8) {
                inputBuffer += key;
            }
        }
        return false;
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
