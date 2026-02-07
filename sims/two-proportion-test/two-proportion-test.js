// Two-Proportion Test Calculator MicroSim
// Complete two-sample z-test for comparing proportions
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 900;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let margin = 20;
let defaultTextSize = 16;

// Input values
let n1 = 120, x1 = 45;   // Group 1
let n2 = 130, x2 = 68;   // Group 2
let alpha = 0.05;
let testType = 'two-sided'; // 'two-sided', 'left', 'right'

// Computed values
let pHat1, pHat2, pooledP, se, zScore, pValue;

// UI state
let showSteps = true;
let editingField = null;
let inputValue = '';

// Input field bounds
let inputBounds = {};

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaGreenLight = '#4CAF50';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);
    calculateValues();

    describe('Interactive two-proportion z-test calculator with visual comparison and step-by-step calculation', LABEL);
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
    textSize(18);
    text('Two-Proportion Z-Test Calculator', canvasWidth / 2, 8);

    // Draw components
    drawInputPanels();
    drawComparisonChart();
    drawCalculationPanel();
    drawNormalCurve();
    drawConclusionPanel();
    drawControls();
}

function calculateValues() {
    pHat1 = x1 / n1;
    pHat2 = x2 / n2;
    pooledP = (x1 + x2) / (n1 + n2);
    se = Math.sqrt(pooledP * (1 - pooledP) * (1/n1 + 1/n2));
    zScore = (pHat1 - pHat2) / se;

    if (testType === 'two-sided') {
        pValue = 2 * (1 - normalCDF(Math.abs(zScore)));
    } else if (testType === 'left') {
        pValue = normalCDF(zScore);
    } else {
        pValue = 1 - normalCDF(zScore);
    }
    pValue = Math.max(0, Math.min(1, pValue));
}

function normalCDF(z) {
    let a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
    let a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    let sign = z < 0 ? -1 : 1;
    z = Math.abs(z) / Math.sqrt(2);
    let t = 1.0 / (1.0 + p * z);
    let y = 1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-z*z);
    return 0.5 * (1.0 + sign * y);
}

function drawInputPanels() {
    // Group 1 panel
    drawGroupPanel(margin, 40, 170, 150, 'Group 1', 1, n1, x1, pHat1, '#2196F3');

    // Group 2 panel
    drawGroupPanel(margin + 185, 40, 170, 150, 'Group 2', 2, n2, x2, pHat2, '#FF9800');
}

function drawGroupPanel(x, y, w, h, label, groupNum, n, successes, pHat, color) {
    // Panel background
    fill(255, 255, 255, 240);
    stroke(color);
    strokeWeight(2);
    rect(x, y, w, h, 8);

    // Header
    fill(color);
    noStroke();
    rect(x, y, w, 28, 8, 8, 0, 0);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(13);
    text(label, x + w/2, y + 14);

    // Input fields
    textAlign(LEFT, TOP);
    textSize(12);

    // Sample size
    let fieldY = y + 40;
    fill(80);
    text('Sample size (n):', x + 10, fieldY);

    let nBounds = { x: x + 110, y: fieldY - 3, w: 50, h: 22, field: 'n' + groupNum };
    inputBounds['n' + groupNum] = nBounds;
    fill(editingField === 'n' + groupNum ? '#ffffcc' : 'white');
    stroke(editingField === 'n' + groupNum ? sylviaAuburn : '#ccc');
    strokeWeight(1);
    rect(nBounds.x, nBounds.y, nBounds.w, nBounds.h, 3);

    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    if (editingField === 'n' + groupNum) {
        text(inputValue + '|', nBounds.x + nBounds.w/2, nBounds.y + nBounds.h/2);
    } else {
        text(n.toString(), nBounds.x + nBounds.w/2, nBounds.y + nBounds.h/2);
    }

    // Successes
    fieldY += 30;
    textAlign(LEFT, TOP);
    textSize(12);
    fill(80);
    text('Successes (x):', x + 10, fieldY);

    let xBounds = { x: x + 110, y: fieldY - 3, w: 50, h: 22, field: 'x' + groupNum };
    inputBounds['x' + groupNum] = xBounds;
    fill(editingField === 'x' + groupNum ? '#ffffcc' : 'white');
    stroke(editingField === 'x' + groupNum ? sylviaAuburn : '#ccc');
    strokeWeight(1);
    rect(xBounds.x, xBounds.y, xBounds.w, xBounds.h, 3);

    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    if (editingField === 'x' + groupNum) {
        text(inputValue + '|', xBounds.x + xBounds.w/2, xBounds.y + xBounds.h/2);
    } else {
        text(successes.toString(), xBounds.x + xBounds.w/2, xBounds.y + xBounds.h/2);
    }

    // Computed proportion
    fieldY += 35;
    textAlign(LEFT, TOP);
    textSize(12);
    fill(80);
    text('p\u0302 = ', x + 10, fieldY);
    fill(color);
    textSize(14);
    text(pHat.toFixed(4), x + 35, fieldY - 1);

    // Visual bar
    fieldY += 25;
    fill(220);
    noStroke();
    rect(x + 10, fieldY, w - 20, 12, 3);
    fill(color);
    rect(x + 10, fieldY, (w - 20) * pHat, 12, 3);
}

function drawComparisonChart() {
    let chartX = margin + 370;
    let chartY = 40;
    let chartW = 180;
    let chartH = 150;

    // Panel
    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(chartX, chartY, chartW, chartH, 8);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(13);
    text('Proportion Comparison', chartX + chartW/2, chartY + 8);

    // Bar chart
    let barW = 50;
    let barMaxH = 90;
    let barY = chartY + 130;

    // Group 1 bar
    let bar1H = barMaxH * pHat1;
    fill('#2196F3');
    noStroke();
    rect(chartX + 30, barY - bar1H, barW, bar1H);
    fill(80);
    textSize(10);
    textAlign(CENTER, TOP);
    text('Group 1', chartX + 30 + barW/2, barY + 3);
    textAlign(CENTER, BOTTOM);
    text(pHat1.toFixed(3), chartX + 30 + barW/2, barY - bar1H - 3);

    // Group 2 bar
    let bar2H = barMaxH * pHat2;
    fill('#FF9800');
    rect(chartX + 100, barY - bar2H, barW, bar2H);
    fill(80);
    textSize(10);
    textAlign(CENTER, TOP);
    text('Group 2', chartX + 100 + barW/2, barY + 3);
    textAlign(CENTER, BOTTOM);
    text(pHat2.toFixed(3), chartX + 100 + barW/2, barY - bar2H - 3);

    // Difference annotation
    stroke(sylviaAuburn);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    let diffY = barY - Math.min(bar1H, bar2H);
    line(chartX + 55, diffY, chartX + 125, diffY);
    drawingContext.setLineDash([]);

    fill(sylviaAuburn);
    noStroke();
    textSize(9);
    textAlign(CENTER, TOP);
    let diff = pHat1 - pHat2;
    text('Diff: ' + (diff >= 0 ? '+' : '') + diff.toFixed(3), chartX + chartW/2, chartY + 35);
}

function drawCalculationPanel() {
    let panelX = margin;
    let panelY = 200;
    let panelW = 350;
    let panelH = 180;

    // Panel
    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(panelX, panelY, panelW, panelH, 8);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(13);
    text('Calculation Steps', panelX + panelW/2, panelY + 8);

    if (showSteps) {
        textAlign(LEFT, TOP);
        textSize(11);
        let yPos = panelY + 30;

        // Pooled proportion
        fill(80);
        text('Pooled p\u0302:', panelX + 15, yPos);
        fill('black');
        text('(' + x1 + '+' + x2 + ')/(' + n1 + '+' + n2 + ') = ' + pooledP.toFixed(4),
             panelX + 80, yPos);

        // Standard error
        yPos += 22;
        fill(80);
        text('SE:', panelX + 15, yPos);
        fill('black');
        text('\u221A[' + pooledP.toFixed(3) + '×' + (1-pooledP).toFixed(3) +
             '×(1/' + n1 + '+1/' + n2 + ')] = ' + se.toFixed(4), panelX + 40, yPos);

        // Z calculation
        yPos += 22;
        fill(80);
        text('z:', panelX + 15, yPos);
        fill('black');
        text('(' + pHat1.toFixed(4) + ' - ' + pHat2.toFixed(4) + ') / ' + se.toFixed(4) +
             ' = ' + zScore.toFixed(3), panelX + 30, yPos);

        // P-value
        yPos += 25;
        fill(80);
        text('P-value:', panelX + 15, yPos);
        fill(pValue < alpha ? '#F44336' : sylviaGreen);
        textSize(14);
        text(pValue.toFixed(4) + ' (' + (pValue * 100).toFixed(2) + '%)', panelX + 75, yPos - 2);

        // Conditions check
        yPos += 30;
        fill(80);
        textSize(10);
        text('Conditions:', panelX + 15, yPos);

        let cond1 = n1 * pooledP >= 10 && n1 * (1-pooledP) >= 10;
        let cond2 = n2 * pooledP >= 10 && n2 * (1-pooledP) >= 10;

        fill(cond1 ? '#4CAF50' : '#F44336');
        text((cond1 ? '\u2713' : '\u2717') + ' Group 1: np\u0302=' + (n1*pooledP).toFixed(1) +
             ', n(1-p\u0302)=' + (n1*(1-pooledP)).toFixed(1), panelX + 15, yPos + 15);

        fill(cond2 ? '#4CAF50' : '#F44336');
        text((cond2 ? '\u2713' : '\u2717') + ' Group 2: np\u0302=' + (n2*pooledP).toFixed(1) +
             ', n(1-p\u0302)=' + (n2*(1-pooledP)).toFixed(1), panelX + 15, yPos + 28);
    }
}

function drawNormalCurve() {
    let curveX = margin + 370;
    let curveY = 200;
    let curveW = 180;
    let curveH = 180;

    // Panel
    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(curveX, curveY, curveW, curveH, 8);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text('Test Statistic Distribution', curveX + curveW/2, curveY + 8);

    // Draw curve
    let left = curveX + 15;
    let right = curveX + curveW - 15;
    let top = curveY + 40;
    let bottom = curveY + 130;

    // Shade p-value region
    let shadeColor = pValue < alpha ? color(244, 67, 54, 150) : color(33, 150, 243, 100);
    noStroke();
    fill(shadeColor);

    if (testType === 'two-sided') {
        let posZ = Math.abs(zScore);
        // Left tail
        beginShape();
        vertex(left, bottom);
        for (let px = left; px <= right; px++) {
            let z = map(px, left, right, -3.5, 3.5);
            if (z <= -posZ) {
                let density = Math.exp(-0.5 * z * z);
                vertex(px, map(density, 0, 1.1, bottom, top));
            }
        }
        let negZX = map(-posZ, -3.5, 3.5, left, right);
        vertex(negZX, bottom);
        endShape(CLOSE);

        // Right tail
        beginShape();
        let posZX = map(posZ, -3.5, 3.5, left, right);
        vertex(posZX, bottom);
        for (let px = left; px <= right; px++) {
            let z = map(px, left, right, -3.5, 3.5);
            if (z >= posZ) {
                let density = Math.exp(-0.5 * z * z);
                vertex(px, map(density, 0, 1.1, bottom, top));
            }
        }
        vertex(right, bottom);
        endShape(CLOSE);
    } else if (testType === 'left') {
        beginShape();
        vertex(left, bottom);
        for (let px = left; px <= right; px++) {
            let z = map(px, left, right, -3.5, 3.5);
            if (z <= zScore) {
                let density = Math.exp(-0.5 * z * z);
                vertex(px, map(density, 0, 1.1, bottom, top));
            }
        }
        let zX = map(zScore, -3.5, 3.5, left, right);
        vertex(zX, bottom);
        endShape(CLOSE);
    } else {
        beginShape();
        let zX = map(zScore, -3.5, 3.5, left, right);
        vertex(zX, bottom);
        for (let px = left; px <= right; px++) {
            let z = map(px, left, right, -3.5, 3.5);
            if (z >= zScore) {
                let density = Math.exp(-0.5 * z * z);
                vertex(px, map(density, 0, 1.1, bottom, top));
            }
        }
        vertex(right, bottom);
        endShape(CLOSE);
    }

    // Axis
    stroke(100);
    strokeWeight(1);
    line(left, bottom, right, bottom);

    // Curve
    stroke(sylviaGreen);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let px = left; px <= right; px++) {
        let z = map(px, left, right, -3.5, 3.5);
        let density = Math.exp(-0.5 * z * z);
        vertex(px, map(density, 0, 1.1, bottom, top));
    }
    endShape();

    // Z marker
    let zX = map(constrain(zScore, -3.5, 3.5), -3.5, 3.5, left, right);
    stroke(sylviaAuburn);
    strokeWeight(2);
    line(zX, bottom, zX, top + 20);

    fill(sylviaAuburn);
    noStroke();
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text('z=' + zScore.toFixed(2), zX, top + 15);

    // Test type selector
    let radioY = curveY + 145;
    textSize(10);
    textAlign(LEFT, CENTER);

    let types = [
        { id: 'two-sided', label: 'p1\u2260p2' },
        { id: 'left', label: 'p1<p2' },
        { id: 'right', label: 'p1>p2' }
    ];

    for (let i = 0; i < types.length; i++) {
        let rx = curveX + 15 + i * 55;
        let isSelected = testType === types[i].id;

        stroke(sylviaGreen);
        strokeWeight(1);
        fill(isSelected ? sylviaGreen : 'white');
        ellipse(rx + 6, radioY, 10, 10);

        fill(80);
        noStroke();
        text(types[i].label, rx + 15, radioY);
    }

    this.testTypeRadios = types.map((t, i) => ({
        id: t.id, x: curveX + 15 + i * 55, y: radioY - 8, w: 50, h: 16
    }));
}

function drawConclusionPanel() {
    let panelX = margin + 565;
    let panelY = 40;
    let panelW = canvasWidth - panelX - margin;
    let panelH = 340;

    // Panel
    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(panelX, panelY, panelW, panelH, 8);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(13);
    text('Conclusion', panelX + panelW/2, panelY + 8);

    // Alpha display
    textSize(12);
    fill(80);
    text('\u03B1 = ' + alpha.toFixed(2), panelX + panelW/2, panelY + 30);

    // Decision
    let isSignificant = pValue < alpha;
    fill(isSignificant ? '#F44336' : sylviaGreen);
    textSize(14);
    text(isSignificant ? 'Reject H0' : 'Fail to Reject H0', panelX + panelW/2, panelY + 55);

    // Hypotheses
    fill(80);
    textSize(11);
    textAlign(LEFT, TOP);
    let hypY = panelY + 85;
    text('H0: p1 - p2 = 0', panelX + 15, hypY);
    let haSymbol = testType === 'two-sided' ? '\u2260' : (testType === 'left' ? '<' : '>');
    text('Ha: p1 - p2 ' + haSymbol + ' 0', panelX + 15, hypY + 18);

    // Conclusion statement
    let concY = panelY + 135;
    fill(80);
    textSize(10);
    textAlign(LEFT, TOP);

    let conclusion;
    if (isSignificant) {
        conclusion = 'At the \u03B1 = ' + alpha.toFixed(2) + ' significance level, there IS statistically significant evidence that the proportions differ between the two groups.';
    } else {
        conclusion = 'At the \u03B1 = ' + alpha.toFixed(2) + ' significance level, there is NOT sufficient evidence to conclude that the proportions differ between the two groups.';
    }

    // Word wrap
    let words = conclusion.split(' ');
    let line = '';
    let lineY = concY;
    for (let word of words) {
        let testLine = line + word + ' ';
        if (textWidth(testLine) > panelW - 30) {
            text(line, panelX + 15, lineY);
            line = word + ' ';
            lineY += 15;
        } else {
            line = testLine;
        }
    }
    text(line, panelX + 15, lineY);

    // Summary stats
    let sumY = panelY + 220;
    fill(100);
    textSize(10);
    text('Summary Statistics:', panelX + 15, sumY);

    sumY += 18;
    text('p\u03021 = ' + pHat1.toFixed(4), panelX + 15, sumY);
    text('p\u03022 = ' + pHat2.toFixed(4), panelX + 100, sumY);

    sumY += 15;
    text('Pooled p\u0302 = ' + pooledP.toFixed(4), panelX + 15, sumY);

    sumY += 15;
    text('z = ' + zScore.toFixed(3), panelX + 15, sumY);
    text('p-value = ' + pValue.toFixed(4), panelX + 85, sumY);
}

function drawControls() {
    let y = drawHeight + 12;

    // Show/Hide steps toggle
    let toggleX = 20;
    fill(showSteps ? sylviaGreen : '#666');
    noStroke();
    rect(toggleX, y, 90, 28, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(11);
    text(showSteps ? 'Hide Steps' : 'Show Steps', toggleX + 45, y + 14);

    // Alpha slider
    let alphaX = 130;
    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    text('\u03B1:', alphaX, y + 14);

    fill(220);
    rect(alphaX + 25, y + 8, 80, 12, 6);
    let alphaPos = map(alpha, 0.01, 0.10, alphaX + 25, alphaX + 105);
    fill(sylviaAuburn);
    ellipse(alphaPos, y + 14, 14, 14);

    fill(80);
    textAlign(LEFT, CENTER);
    text(alpha.toFixed(2), alphaX + 115, y + 14);

    // Example buttons
    let examples = [
        { name: 'Teaching Study', n1: 120, x1: 45, n2: 130, x2: 68 },
        { name: 'Drug Trial', n1: 200, x1: 160, n2: 200, x2: 140 },
        { name: 'Survey', n1: 500, x1: 275, n2: 500, x2: 260 }
    ];

    let exX = 280;
    for (let i = 0; i < examples.length; i++) {
        let bx = exX + i * 110;
        fill(sylviaGreen);
        noStroke();
        rect(bx, y, 100, 28, 4);

        fill('white');
        textAlign(CENTER, CENTER);
        textSize(10);
        text(examples[i].name, bx + 50, y + 14);
    }

    // Reset button
    let resetX = canvasWidth - 70;
    fill('#666');
    rect(resetX, y, 55, 28, 4);
    fill('white');
    textSize(11);
    text('Reset', resetX + 27, y + 14);

    // Store bounds
    this.toggleBounds = { x: toggleX, y: y, w: 90, h: 28 };
    this.alphaSliderBounds = { x: alphaX + 25, y: y + 4, w: 80, h: 20 };
    this.exampleBounds = examples.map((ex, i) => ({
        x: exX + i * 110, y: y, w: 100, h: 28, data: ex
    }));
    this.resetBounds = { x: resetX, y: y, w: 55, h: 28 };
}

function mousePressed() {
    // Check input fields
    for (let key in inputBounds) {
        if (isInBounds(mouseX, mouseY, inputBounds[key])) {
            editingField = key;
            inputValue = key.startsWith('n') ?
                (key === 'n1' ? n1 : n2).toString() :
                (key === 'x1' ? x1 : x2).toString();
            return;
        }
    }

    // Finish editing if clicking elsewhere
    if (editingField) {
        applyInput();
        editingField = null;
    }

    // Test type radios
    if (this.testTypeRadios) {
        for (let radio of this.testTypeRadios) {
            if (isInBounds(mouseX, mouseY, radio)) {
                testType = radio.id;
                calculateValues();
                return;
            }
        }
    }

    // Toggle button
    if (isInBounds(mouseX, mouseY, this.toggleBounds)) {
        showSteps = !showSteps;
        return;
    }

    // Example buttons
    if (this.exampleBounds) {
        for (let btn of this.exampleBounds) {
            if (isInBounds(mouseX, mouseY, btn)) {
                n1 = btn.data.n1;
                x1 = btn.data.x1;
                n2 = btn.data.n2;
                x2 = btn.data.x2;
                calculateValues();
                return;
            }
        }
    }

    // Reset button
    if (isInBounds(mouseX, mouseY, this.resetBounds)) {
        n1 = 120; x1 = 45;
        n2 = 130; x2 = 68;
        alpha = 0.05;
        testType = 'two-sided';
        showSteps = true;
        calculateValues();
    }
}

function mouseDragged() {
    // Alpha slider
    if (this.alphaSliderBounds && isInBounds(mouseX, mouseY, this.alphaSliderBounds)) {
        alpha = map(mouseX, this.alphaSliderBounds.x, this.alphaSliderBounds.x + this.alphaSliderBounds.w, 0.01, 0.10);
        alpha = constrain(alpha, 0.01, 0.10);
        calculateValues();
    }
}

function keyPressed() {
    if (editingField) {
        if (key >= '0' && key <= '9') {
            inputValue += key;
        } else if (keyCode === BACKSPACE) {
            inputValue = inputValue.slice(0, -1);
        } else if (keyCode === ENTER || keyCode === TAB) {
            applyInput();
            editingField = null;
        } else if (keyCode === ESCAPE) {
            editingField = null;
        }
        return false;
    }
    return true;
}

function applyInput() {
    let val = parseInt(inputValue);
    if (!isNaN(val) && val >= 0) {
        if (editingField === 'n1') {
            n1 = Math.max(10, Math.min(10000, val));
            if (x1 > n1) x1 = n1;
        } else if (editingField === 'n2') {
            n2 = Math.max(10, Math.min(10000, val));
            if (x2 > n2) x2 = n2;
        } else if (editingField === 'x1') {
            x1 = Math.min(n1, Math.max(0, val));
        } else if (editingField === 'x2') {
            x2 = Math.min(n2, Math.max(0, val));
        }
        calculateValues();
    }
}

function isInBounds(x, y, bounds) {
    return bounds && x >= bounds.x && x <= bounds.x + bounds.w &&
           y >= bounds.y && y <= bounds.y + bounds.h;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
