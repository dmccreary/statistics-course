// Sampling Distribution Calculator MicroSim
// Interactive tool for calculating probabilities with sampling distributions
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 800;
let drawHeight = 440;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 20;

// Mode: 'mean' or 'proportion'
let mode = 'mean';

// Parameters for mean mode
let popMean = 1200;
let popSD = 100;
let sampleN = 64;

// Parameters for proportion mode
let popProp = 0.52;

// Probability type: 'less', 'greater', 'between'
let probType = 'less';

// Cutoff values
let cutoff1 = 1175;
let cutoff2 = 1225;

// Calculation results
let standardError = 0;
let zScore1 = 0;
let zScore2 = 0;
let probability = 0;

// UI state
let activeInput = null;
let inputValues = {};

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';

// Button regions
let buttons = {};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    // Initialize input values
    resetInputs();
    calculateResults();

    describe('Sampling distribution probability calculator with step-by-step solutions', LABEL);
}

function resetInputs() {
    if (mode === 'mean') {
        inputValues = {
            popMean: popMean,
            popSD: popSD,
            sampleN: sampleN,
            cutoff1: cutoff1,
            cutoff2: cutoff2
        };
    } else {
        inputValues = {
            popProp: popProp,
            sampleN: sampleN,
            cutoff1: 0.50,
            cutoff2: 0.54
        };
    }
}

function calculateResults() {
    if (mode === 'mean') {
        popMean = inputValues.popMean;
        popSD = inputValues.popSD;
        sampleN = inputValues.sampleN;
        cutoff1 = inputValues.cutoff1;
        cutoff2 = inputValues.cutoff2;

        standardError = popSD / sqrt(sampleN);
        zScore1 = (cutoff1 - popMean) / standardError;
        zScore2 = (cutoff2 - popMean) / standardError;
    } else {
        popProp = inputValues.popProp;
        sampleN = inputValues.sampleN;
        cutoff1 = inputValues.cutoff1;
        cutoff2 = inputValues.cutoff2;

        standardError = sqrt(popProp * (1 - popProp) / sampleN);
        zScore1 = (cutoff1 - popProp) / standardError;
        zScore2 = (cutoff2 - popProp) / standardError;
    }

    // Calculate probability
    if (probType === 'less') {
        probability = normalCDF(zScore1);
    } else if (probType === 'greater') {
        probability = 1 - normalCDF(zScore1);
    } else {
        probability = normalCDF(zScore2) - normalCDF(zScore1);
    }
}

function normalCDF(z) {
    // Approximation of standard normal CDF
    let a1 =  0.254829592;
    let a2 = -0.284496736;
    let a3 =  1.421413741;
    let a4 = -1.453152027;
    let a5 =  1.061405429;
    let p  =  0.3275911;

    let sign = z < 0 ? -1 : 1;
    z = abs(z) / sqrt(2);

    let t = 1.0 / (1.0 + p * z);
    let y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * exp(-z * z);

    return 0.5 * (1.0 + sign * y);
}

function draw() {
    updateCanvasSize();

    // Background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Sampling Distribution Probability Calculator', canvasWidth / 2, 8);

    calculateResults();

    // Draw components
    drawInputSection();
    drawCurveSection();
    drawCalculationSteps();
    drawControls();
}

function drawInputSection() {
    let sectionX = 15;
    let sectionY = 40;
    let sectionWidth = 200;
    let sectionHeight = 200;

    // Background
    fill(255);
    stroke(100);
    strokeWeight(1);
    rect(sectionX, sectionY, sectionWidth, sectionHeight, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text('Input Parameters', sectionX + 10, sectionY + 8);

    let y = sectionY + 32;
    let inputX = sectionX + 100;
    let inputW = 80;

    textSize(11);
    fill('black');

    if (mode === 'mean') {
        // Population mean
        text('Pop. Mean (μ):', sectionX + 12, y + 4);
        drawInput('popMean', inputX, y, inputW, 20);
        y += 28;

        // Population SD
        text('Pop. SD (σ):', sectionX + 12, y + 4);
        drawInput('popSD', inputX, y, inputW, 20);
        y += 28;

        // Sample size
        text('Sample Size (n):', sectionX + 12, y + 4);
        drawInput('sampleN', inputX, y, inputW, 20);
        y += 35;

        // Cutoff value(s)
        if (probType === 'between') {
            text('Lower Bound:', sectionX + 12, y + 4);
            drawInput('cutoff1', inputX, y, inputW, 20);
            y += 28;
            text('Upper Bound:', sectionX + 12, y + 4);
            drawInput('cutoff2', inputX, y, inputW, 20);
        } else {
            text('Cutoff Value:', sectionX + 12, y + 4);
            drawInput('cutoff1', inputX, y, inputW, 20);
        }
    } else {
        // Population proportion
        text('Pop. Prop. (p):', sectionX + 12, y + 4);
        drawInput('popProp', inputX, y, inputW, 20);
        y += 28;

        // Sample size
        text('Sample Size (n):', sectionX + 12, y + 4);
        drawInput('sampleN', inputX, y, inputW, 20);
        y += 35;

        // Cutoff value(s)
        if (probType === 'between') {
            text('Lower Bound:', sectionX + 12, y + 4);
            drawInput('cutoff1', inputX, y, inputW, 20);
            y += 28;
            text('Upper Bound:', sectionX + 12, y + 4);
            drawInput('cutoff2', inputX, y, inputW, 20);
        } else {
            text('Cutoff Value:', sectionX + 12, y + 4);
            drawInput('cutoff1', inputX, y, inputW, 20);
        }
    }
}

function drawInput(key, x, y, w, h) {
    let isActive = activeInput === key;

    fill(isActive ? '#fff8e1' : 'white');
    stroke(isActive ? sylviaAuburn : '#ccc');
    strokeWeight(isActive ? 2 : 1);
    rect(x, y, w, h, 3);

    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);

    let displayVal = inputValues[key];
    if (typeof displayVal === 'number') {
        if (key === 'popProp' || key === 'cutoff1' && mode === 'proportion' || key === 'cutoff2' && mode === 'proportion') {
            displayVal = displayVal.toFixed(3);
        } else if (key === 'sampleN') {
            displayVal = displayVal.toString();
        } else {
            displayVal = displayVal.toFixed(1);
        }
    }

    text(displayVal, x + w/2, y + h/2);

    buttons[key] = {x: x, y: y, w: w, h: h, isInput: true};
}

function drawCurveSection() {
    let sectionX = 225;
    let sectionY = 40;
    let sectionWidth = canvasWidth - 240;
    let sectionHeight = 200;

    // Background
    fill(255);
    stroke(100);
    strokeWeight(1);
    rect(sectionX, sectionY, sectionWidth, sectionHeight, 5);

    // Title
    fill(sylviaAuburn);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    if (mode === 'mean') {
        text('Sampling Distribution of x\u0305', sectionX + 10, sectionY + 8);
    } else {
        text('Sampling Distribution of p\u0302', sectionX + 10, sectionY + 8);
    }

    // Draw the normal curve
    let curveX = sectionX + 50;
    let curveY = sectionY + 40;
    let curveWidth = sectionWidth - 70;
    let curveHeight = sectionHeight - 80;

    let center = mode === 'mean' ? popMean : popProp;

    // Calculate display range (show ± 4 SE)
    let rangeMin = center - 4 * standardError;
    let rangeMax = center + 4 * standardError;

    // Draw shaded region first
    noStroke();
    if (probType === 'less') {
        fill(sylviaAuburn);
        fill(red(color(sylviaAuburn)), green(color(sylviaAuburn)), blue(color(sylviaAuburn)), 120);
        beginShape();
        let c1X = map(cutoff1, rangeMin, rangeMax, curveX, curveX + curveWidth);
        vertex(curveX, curveY + curveHeight);
        for (let px = curveX; px <= c1X; px++) {
            let z = map(px, curveX, curveX + curveWidth, -4, 4);
            let density = exp(-0.5 * z * z);
            let y = curveY + curveHeight - density * curveHeight * 0.9;
            vertex(px, y);
        }
        vertex(c1X, curveY + curveHeight);
        endShape(CLOSE);
    } else if (probType === 'greater') {
        fill(sylviaAuburn);
        fill(red(color(sylviaAuburn)), green(color(sylviaAuburn)), blue(color(sylviaAuburn)), 120);
        beginShape();
        let c1X = map(cutoff1, rangeMin, rangeMax, curveX, curveX + curveWidth);
        vertex(c1X, curveY + curveHeight);
        for (let px = c1X; px <= curveX + curveWidth; px++) {
            let z = map(px, curveX, curveX + curveWidth, -4, 4);
            let density = exp(-0.5 * z * z);
            let y = curveY + curveHeight - density * curveHeight * 0.9;
            vertex(px, y);
        }
        vertex(curveX + curveWidth, curveY + curveHeight);
        endShape(CLOSE);
    } else {
        fill(sylviaAuburn);
        fill(red(color(sylviaAuburn)), green(color(sylviaAuburn)), blue(color(sylviaAuburn)), 120);
        beginShape();
        let c1X = map(cutoff1, rangeMin, rangeMax, curveX, curveX + curveWidth);
        let c2X = map(cutoff2, rangeMin, rangeMax, curveX, curveX + curveWidth);
        vertex(c1X, curveY + curveHeight);
        for (let px = c1X; px <= c2X; px++) {
            let z = map(px, curveX, curveX + curveWidth, -4, 4);
            let density = exp(-0.5 * z * z);
            let y = curveY + curveHeight - density * curveHeight * 0.9;
            vertex(px, y);
        }
        vertex(c2X, curveY + curveHeight);
        endShape(CLOSE);
    }

    // Draw curve outline
    stroke(sylviaGreen);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = curveX; px <= curveX + curveWidth; px++) {
        let z = map(px, curveX, curveX + curveWidth, -4, 4);
        let density = exp(-0.5 * z * z);
        let y = curveY + curveHeight - density * curveHeight * 0.9;
        vertex(px, y);
    }
    endShape();

    // Draw mean line
    let meanX = curveX + curveWidth / 2;
    stroke(sylviaGreen);
    strokeWeight(2);
    drawingContext.setLineDash([4, 3]);
    line(meanX, curveY, meanX, curveY + curveHeight);
    drawingContext.setLineDash([]);

    // Draw cutoff lines
    stroke(sylviaAuburn);
    strokeWeight(2);
    let c1X = map(cutoff1, rangeMin, rangeMax, curveX, curveX + curveWidth);
    c1X = constrain(c1X, curveX, curveX + curveWidth);
    line(c1X, curveY, c1X, curveY + curveHeight + 5);

    if (probType === 'between') {
        let c2X = map(cutoff2, rangeMin, rangeMax, curveX, curveX + curveWidth);
        c2X = constrain(c2X, curveX, curveX + curveWidth);
        line(c2X, curveY, c2X, curveY + curveHeight + 5);
    }

    // Axis
    stroke(100);
    strokeWeight(1);
    line(curveX, curveY + curveHeight, curveX + curveWidth, curveY + curveHeight);

    // Labels
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(9);

    // Mean label
    if (mode === 'mean') {
        text('μ = ' + popMean.toFixed(0), meanX, curveY + curveHeight + 8);
    } else {
        text('p = ' + popProp.toFixed(2), meanX, curveY + curveHeight + 8);
    }

    // Cutoff labels
    fill(sylviaAuburn);
    if (mode === 'mean') {
        text(cutoff1.toFixed(0), c1X, curveY + curveHeight + 20);
    } else {
        text(cutoff1.toFixed(2), c1X, curveY + curveHeight + 20);
    }

    if (probType === 'between') {
        let c2X = map(cutoff2, rangeMin, rangeMax, curveX, curveX + curveWidth);
        if (mode === 'mean') {
            text(cutoff2.toFixed(0), c2X, curveY + curveHeight + 20);
        } else {
            text(cutoff2.toFixed(2), c2X, curveY + curveHeight + 20);
        }
    }

    // Probability display
    fill(sylviaAuburn);
    textSize(16);
    textAlign(RIGHT, TOP);
    text('P = ' + probability.toFixed(4), sectionX + sectionWidth - 15, sectionY + 8);

    textSize(10);
    fill(80);
    text('(' + (probability * 100).toFixed(2) + '%)', sectionX + sectionWidth - 15, sectionY + 26);
}

function drawCalculationSteps() {
    let sectionX = 15;
    let sectionY = 250;
    let sectionWidth = canvasWidth - 30;
    let sectionHeight = drawHeight - sectionY - 10;

    // Background
    fill(255);
    stroke(100);
    strokeWeight(1);
    rect(sectionX, sectionY, sectionWidth, sectionHeight, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text('Step-by-Step Calculation', sectionX + 10, sectionY + 8);

    let y = sectionY + 30;
    let col1 = sectionX + 15;
    let col2 = sectionX + sectionWidth / 3;
    let col3 = sectionX + 2 * sectionWidth / 3;

    textSize(11);
    fill(sylviaGreen);
    text('Step 1: Find Standard Error', col1, y);
    text('Step 2: Calculate z-score(s)', col2, y);
    text('Step 3: Find Probability', col3, y);

    y += 22;
    fill('black');
    textSize(10);

    // Step 1
    if (mode === 'mean') {
        text('SE = σ / √n', col1, y);
        y += 16;
        text('SE = ' + popSD + ' / √' + sampleN, col1, y);
        y += 16;
        text('SE = ' + popSD + ' / ' + sqrt(sampleN).toFixed(3), col1, y);
        y += 16;
        fill(sylviaAuburn);
        text('SE = ' + standardError.toFixed(4), col1, y);
    } else {
        text('SE = √[p(1-p)/n]', col1, y);
        y += 16;
        text('SE = √[' + popProp.toFixed(2) + '×' + (1-popProp).toFixed(2) + '/' + sampleN + ']', col1, y);
        y += 16;
        text('SE = √[' + (popProp * (1-popProp)).toFixed(4) + '/' + sampleN + ']', col1, y);
        y += 16;
        fill(sylviaAuburn);
        text('SE = ' + standardError.toFixed(5), col1, y);
    }

    y = sectionY + 52;
    fill('black');

    // Step 2
    if (mode === 'mean') {
        text('z = (x\u0305 - μ) / SE', col2, y);
        y += 16;
        text('z = (' + cutoff1.toFixed(1) + ' - ' + popMean + ') / ' + standardError.toFixed(4), col2, y);
        y += 16;
        text('z = ' + (cutoff1 - popMean).toFixed(2) + ' / ' + standardError.toFixed(4), col2, y);
        y += 16;
        fill(sylviaAuburn);
        text('z = ' + zScore1.toFixed(4), col2, y);
    } else {
        text('z = (p\u0302 - p) / SE', col2, y);
        y += 16;
        text('z = (' + cutoff1.toFixed(3) + ' - ' + popProp.toFixed(2) + ') / ' + standardError.toFixed(5), col2, y);
        y += 16;
        fill(sylviaAuburn);
        text('z = ' + zScore1.toFixed(4), col2, y);
    }

    if (probType === 'between') {
        y += 22;
        fill('black');
        text('z₂ = ' + zScore2.toFixed(4), col2, y);
    }

    y = sectionY + 52;
    fill('black');

    // Step 3
    if (probType === 'less') {
        text('P(Z < ' + zScore1.toFixed(2) + ')', col3, y);
        y += 16;
        text('Using normal table or calculator:', col3, y);
        y += 16;
        fill(sylviaAuburn);
        textSize(14);
        text('P = ' + probability.toFixed(4), col3, y);
        textSize(10);
        y += 18;
        fill(80);
        text('= ' + (probability * 100).toFixed(2) + '% chance', col3, y);
    } else if (probType === 'greater') {
        text('P(Z > ' + zScore1.toFixed(2) + ') = 1 - P(Z < ' + zScore1.toFixed(2) + ')', col3, y);
        y += 16;
        text('= 1 - ' + normalCDF(zScore1).toFixed(4), col3, y);
        y += 16;
        fill(sylviaAuburn);
        textSize(14);
        text('P = ' + probability.toFixed(4), col3, y);
        textSize(10);
        y += 18;
        fill(80);
        text('= ' + (probability * 100).toFixed(2) + '% chance', col3, y);
    } else {
        text('P(' + zScore1.toFixed(2) + ' < Z < ' + zScore2.toFixed(2) + ')', col3, y);
        y += 16;
        text('= P(Z < ' + zScore2.toFixed(2) + ') - P(Z < ' + zScore1.toFixed(2) + ')', col3, y);
        y += 16;
        text('= ' + normalCDF(zScore2).toFixed(4) + ' - ' + normalCDF(zScore1).toFixed(4), col3, y);
        y += 16;
        fill(sylviaAuburn);
        textSize(14);
        text('P = ' + probability.toFixed(4), col3, y);
        textSize(10);
        y += 18;
        fill(80);
        text('= ' + (probability * 100).toFixed(2) + '% chance', col3, y);
    }
}

function drawControls() {
    let y = drawHeight + 15;

    // Mode toggle
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Mode:', 15, y + 10);

    // Mean button
    let btnX = 55;
    fill(mode === 'mean' ? sylviaGreen : '#ddd');
    noStroke();
    rect(btnX, y + 2, 60, 20, 3);
    fill(mode === 'mean' ? 'white' : 'black');
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Mean', btnX + 30, y + 12);
    buttons['modeMean'] = {x: btnX, y: y + 2, w: 60, h: 20, action: () => { mode = 'mean'; resetInputs(); }};

    // Proportion button
    btnX += 68;
    fill(mode === 'proportion' ? sylviaGreen : '#ddd');
    rect(btnX, y + 2, 75, 20, 3);
    fill(mode === 'proportion' ? 'white' : 'black');
    text('Proportion', btnX + 37, y + 12);
    buttons['modeProp'] = {x: btnX, y: y + 2, w: 75, h: 20, action: () => { mode = 'proportion'; resetInputs(); }};

    // Probability type
    btnX = 220;
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    text('Find P:', btnX, y + 10);

    // Less than
    btnX += 45;
    fill(probType === 'less' ? sylviaAuburn : '#ddd');
    noStroke();
    rect(btnX, y + 2, 70, 20, 3);
    fill(probType === 'less' ? 'white' : 'black');
    textAlign(CENTER, CENTER);
    text('Less than', btnX + 35, y + 12);
    buttons['probLess'] = {x: btnX, y: y + 2, w: 70, h: 20, action: () => { probType = 'less'; }};

    // Greater than
    btnX += 78;
    fill(probType === 'greater' ? sylviaAuburn : '#ddd');
    rect(btnX, y + 2, 85, 20, 3);
    fill(probType === 'greater' ? 'white' : 'black');
    text('Greater than', btnX + 42, y + 12);
    buttons['probGreater'] = {x: btnX, y: y + 2, w: 85, h: 20, action: () => { probType = 'greater'; }};

    // Between
    btnX += 93;
    fill(probType === 'between' ? sylviaAuburn : '#ddd');
    rect(btnX, y + 2, 65, 20, 3);
    fill(probType === 'between' ? 'white' : 'black');
    text('Between', btnX + 32, y + 12);
    buttons['probBetween'] = {x: btnX, y: y + 2, w: 65, h: 20, action: () => { probType = 'between'; }};

    // Example presets
    btnX = 540;
    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    text('Examples:', btnX, y + 10);

    btnX += 60;
    fill('#e3f2fd');
    stroke('#1976d2');
    strokeWeight(1);
    rect(btnX, y + 2, 75, 20, 3);
    fill('#1976d2');
    noStroke();
    textAlign(CENTER, CENTER);
    text('Light Bulbs', btnX + 37, y + 12);
    buttons['exampleBulbs'] = {x: btnX, y: y + 2, w: 75, h: 20, action: loadBulbExample};

    btnX += 83;
    fill('#fce4ec');
    stroke('#c2185b');
    strokeWeight(1);
    rect(btnX, y + 2, 55, 20, 3);
    fill('#c2185b');
    noStroke();
    text('Polling', btnX + 27, y + 12);
    buttons['examplePoll'] = {x: btnX, y: y + 2, w: 55, h: 20, action: loadPollExample};

    // Second row
    y += 30;
    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(9);
    text('Click on input boxes to edit values. Use the examples to see pre-loaded scenarios from the textbook.', 15, y + 10);
}

function loadBulbExample() {
    mode = 'mean';
    probType = 'less';
    inputValues = {
        popMean: 1200,
        popSD: 100,
        sampleN: 64,
        cutoff1: 1175,
        cutoff2: 1225
    };
}

function loadPollExample() {
    mode = 'proportion';
    probType = 'less';
    inputValues = {
        popProp: 0.52,
        sampleN: 400,
        cutoff1: 0.50,
        cutoff2: 0.54
    };
}

function mousePressed() {
    // Check buttons
    for (let key in buttons) {
        let btn = buttons[key];
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            if (btn.isInput) {
                activeInput = key;
            } else if (btn.action) {
                btn.action();
            }
            return;
        }
    }
    activeInput = null;
}

function keyPressed() {
    if (activeInput === null) return;

    let currentVal = inputValues[activeInput].toString();

    if (keyCode === BACKSPACE) {
        if (currentVal.length > 0) {
            currentVal = currentVal.slice(0, -1);
            if (currentVal === '' || currentVal === '-') currentVal = '0';
            inputValues[activeInput] = parseFloat(currentVal);
        }
        return false;
    } else if (keyCode === ENTER || keyCode === TAB) {
        activeInput = null;
        return false;
    } else if ((key >= '0' && key <= '9') || key === '.' || key === '-') {
        if (currentVal === '0' && key !== '.') {
            currentVal = key;
        } else {
            currentVal += key;
        }
        let parsed = parseFloat(currentVal);
        if (!isNaN(parsed)) {
            inputValues[activeInput] = parsed;
        }
        return false;
    }

    return true;
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
