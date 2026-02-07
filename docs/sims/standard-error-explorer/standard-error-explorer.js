// Standard Error and Sample Size Explorer MicroSim
// Interactive exploration of how sample size affects standard error
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 800;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 20;

// Mode: 'proportion' or 'mean'
let mode = 'proportion';

// Parameters for proportion mode
let p = 0.5;
let n = 50;

// Parameters for mean mode
let sigma = 15;

// UI state
let draggingN = false;
let draggingP = false;
let draggingSigma = false;

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

    describe('Interactive visualization showing how sample size affects the standard error of sampling distributions', LABEL);
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
    text('Standard Error and Sample Size Explorer', canvasWidth / 2, 8);

    // Draw main components
    drawCurveSection();
    drawFormulaSection();
    drawTableSection();
    drawControls();
}

function drawCurveSection() {
    let curveX = 40;
    let curveY = 50;
    let curveWidth = canvasWidth * 0.55;
    let curveHeight = 280;

    // Background
    fill(255);
    stroke(100);
    strokeWeight(1);
    rect(curveX - 30, curveY - 10, curveWidth + 40, curveHeight + 30, 5);

    // Calculate standard error
    let se;
    if (mode === 'proportion') {
        se = sqrt(p * (1 - p) / n);
    } else {
        se = sigma / sqrt(n);
    }

    // Draw the sampling distribution curve
    let centerX = curveX + curveWidth / 2;
    let centerY = curveY + curveHeight - 40;
    let maxHeight = curveHeight - 80;

    // Horizontal axis
    stroke(100);
    strokeWeight(1);
    line(curveX, centerY, curveX + curveWidth, centerY);

    // Draw the curve
    let mean = mode === 'proportion' ? p : 100; // Using 100 as reference mean for means
    let displaySD = se * (curveWidth / 0.6); // Scale for display

    // For visual purposes, constrain the display width
    displaySD = min(displaySD, curveWidth / 2.5);

    // Fill under curve
    fill(sylviaGreen);
    fill(red(color(sylviaGreen)), green(color(sylviaGreen)), blue(color(sylviaGreen)), 60);
    noStroke();
    beginShape();
    vertex(curveX, centerY);

    for (let px = curveX; px <= curveX + curveWidth; px++) {
        let xVal = map(px, curveX, curveX + curveWidth, -3, 3);
        let density = exp(-0.5 * xVal * xVal);
        let y = centerY - density * maxHeight;
        vertex(px, y);
    }
    vertex(curveX + curveWidth, centerY);
    endShape(CLOSE);

    // Draw curve outline
    stroke(sylviaGreen);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = curveX; px <= curveX + curveWidth; px++) {
        let xVal = map(px, curveX, curveX + curveWidth, -3, 3);
        let density = exp(-0.5 * xVal * xVal);
        let y = centerY - density * maxHeight;
        vertex(px, y);
    }
    endShape();

    // Draw shaded region for ± 1 SE
    let se1Left = map(-1, -3, 3, curveX, curveX + curveWidth);
    let se1Right = map(1, -3, 3, curveX, curveX + curveWidth);

    fill(sylviaAuburn);
    fill(red(color(sylviaAuburn)), green(color(sylviaAuburn)), blue(color(sylviaAuburn)), 100);
    noStroke();
    beginShape();
    vertex(se1Left, centerY);
    for (let px = se1Left; px <= se1Right; px++) {
        let xVal = map(px, curveX, curveX + curveWidth, -3, 3);
        let density = exp(-0.5 * xVal * xVal);
        let y = centerY - density * maxHeight;
        vertex(px, y);
    }
    vertex(se1Right, centerY);
    endShape(CLOSE);

    // Label the ± 1 SE region
    fill(sylviaAuburn);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    text('68% of samples', centerX, centerY - maxHeight/2 - 5);

    // Mean line
    stroke(sylviaGreen);
    strokeWeight(2);
    drawingContext.setLineDash([5, 3]);
    line(centerX, curveY, centerX, centerY);
    drawingContext.setLineDash([]);

    // Mean label
    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    if (mode === 'proportion') {
        text('μ = p = ' + p.toFixed(2), centerX, curveY + 5);
    } else {
        text('μ = μ = 100', centerX, curveY + 5);
    }

    // SE markers
    stroke(sylviaAuburn);
    strokeWeight(2);
    line(se1Left, centerY, se1Left, centerY + 15);
    line(se1Right, centerY, se1Right, centerY + 15);

    // SE labels
    fill(sylviaAuburn);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    text('-1 SE', se1Left, centerY + 18);
    text('+1 SE', se1Right, centerY + 18);

    // Double-headed arrow for SE
    let arrowY = centerY + 40;
    stroke(sylviaAuburn);
    strokeWeight(2);
    line(se1Left, arrowY, se1Right, arrowY);
    // Arrow heads
    line(se1Left, arrowY, se1Left + 8, arrowY - 4);
    line(se1Left, arrowY, se1Left + 8, arrowY + 4);
    line(se1Right, arrowY, se1Right - 8, arrowY - 4);
    line(se1Right, arrowY, se1Right - 8, arrowY + 4);

    fill(sylviaAuburn);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text('SE = ' + se.toFixed(4), centerX, arrowY + 5);

    // Key insight box
    let insightY = curveY + curveHeight - 15;
    fill(sylviaCream);
    stroke(sylviaGreen);
    strokeWeight(1);
    rect(curveX, insightY, curveWidth, 35, 3);

    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('As n increases, the curve becomes narrower (smaller SE)', curveX + curveWidth/2, insightY + 12);
    textSize(10);
    fill(80);
    text('To halve the SE, you must quadruple the sample size!', curveX + curveWidth/2, insightY + 26);
}

function drawFormulaSection() {
    let sectionX = canvasWidth * 0.58;
    let sectionY = 50;
    let sectionWidth = canvasWidth * 0.4 - 20;
    let sectionHeight = 150;

    // Background
    fill(255);
    stroke(100);
    strokeWeight(1);
    rect(sectionX, sectionY, sectionWidth, sectionHeight, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);
    text('Standard Error Formula', sectionX + 10, sectionY + 10);

    // Calculate SE
    let se;
    if (mode === 'proportion') {
        se = sqrt(p * (1 - p) / n);
    } else {
        se = sigma / sqrt(n);
    }

    // Formula display
    textSize(12);
    fill('black');

    let formulaY = sectionY + 40;

    if (mode === 'proportion') {
        // For proportions
        textAlign(LEFT, TOP);
        text('For sample proportion p\u0302:', sectionX + 15, formulaY);

        formulaY += 25;
        textSize(14);
        fill(sylviaAuburn);

        // SE formula
        text('\u03C3', sectionX + 20, formulaY);
        textSize(10);
        text('p\u0302', sectionX + 32, formulaY + 5);
        textSize(14);
        text(' = \u221A[ p(1-p) / n ]', sectionX + 45, formulaY);

        formulaY += 30;
        textSize(12);
        fill('black');
        text('= \u221A[ ' + p.toFixed(2) + '(' + (1-p).toFixed(2) + ') / ' + n + ' ]', sectionX + 20, formulaY);

        formulaY += 25;
        text('= \u221A[ ' + (p*(1-p)).toFixed(4) + ' / ' + n + ' ]', sectionX + 20, formulaY);

        formulaY += 25;
        fill(sylviaAuburn);
        textSize(14);
        text('= ' + se.toFixed(4), sectionX + 20, formulaY);

    } else {
        // For means
        textAlign(LEFT, TOP);
        text('For sample mean x\u0305:', sectionX + 15, formulaY);

        formulaY += 25;
        textSize(14);
        fill(sylviaAuburn);

        // SE formula
        text('\u03C3', sectionX + 20, formulaY);
        textSize(10);
        text('x\u0305', sectionX + 32, formulaY + 5);
        textSize(14);
        text(' = \u03C3 / \u221An', sectionX + 45, formulaY);

        formulaY += 30;
        textSize(12);
        fill('black');
        text('= ' + sigma + ' / \u221A' + n, sectionX + 20, formulaY);

        formulaY += 25;
        text('= ' + sigma + ' / ' + sqrt(n).toFixed(3), sectionX + 20, formulaY);

        formulaY += 25;
        fill(sylviaAuburn);
        textSize(14);
        text('= ' + se.toFixed(4), sectionX + 20, formulaY);
    }
}

function drawTableSection() {
    let sectionX = canvasWidth * 0.58;
    let sectionY = 210;
    let sectionWidth = canvasWidth * 0.4 - 20;
    let sectionHeight = 195;

    // Background
    fill(255);
    stroke(100);
    strokeWeight(1);
    rect(sectionX, sectionY, sectionWidth, sectionHeight, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);
    text('Sample Size Effect', sectionX + 10, sectionY + 10);

    // Table header
    let tableY = sectionY + 35;
    let col1 = sectionX + 20;
    let col2 = sectionX + 90;
    let col3 = sectionX + 160;

    textSize(11);
    fill(80);
    textAlign(CENTER, TOP);
    text('n', col1, tableY);
    text('SE', col2, tableY);
    text('Relative', col3, tableY);

    tableY += 18;

    // Table rows
    let sampleSizes = [10, 25, 50, 100, 200, 400];
    let baseSE;
    if (mode === 'proportion') {
        baseSE = sqrt(p * (1 - p) / sampleSizes[0]);
    } else {
        baseSE = sigma / sqrt(sampleSizes[0]);
    }

    for (let i = 0; i < sampleSizes.length; i++) {
        let ns = sampleSizes[i];
        let se;
        if (mode === 'proportion') {
            se = sqrt(p * (1 - p) / ns);
        } else {
            se = sigma / sqrt(ns);
        }
        let relative = se / baseSE;

        // Highlight current n
        if (ns === n) {
            fill(sylviaAuburn);
            fill(red(color(sylviaAuburn)), green(color(sylviaAuburn)), blue(color(sylviaAuburn)), 40);
            noStroke();
            rect(sectionX + 10, tableY - 2, sectionWidth - 20, 18, 2);
        }

        fill(ns === n ? sylviaAuburn : 'black');
        noStroke();
        textAlign(CENTER, TOP);
        textSize(11);
        text(ns, col1, tableY);
        text(se.toFixed(4), col2, tableY);
        text((relative * 100).toFixed(0) + '%', col3, tableY);

        tableY += 20;
    }

    // Note
    textSize(9);
    fill(80);
    textAlign(LEFT, TOP);
    text('* 4x sample size = 1/2 SE', sectionX + 15, tableY + 5);
}

function drawControls() {
    let y = drawHeight + 12;

    // Mode selector
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Mode:', 15, y + 10);

    // Proportion button
    let propBtn = {x: 60, y: y + 2, w: 80, h: 20};
    fill(mode === 'proportion' ? sylviaGreen : '#ddd');
    stroke(mode === 'proportion' ? sylviaGreen : '#aaa');
    strokeWeight(1);
    rect(propBtn.x, propBtn.y, propBtn.w, propBtn.h, 3);
    fill(mode === 'proportion' ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Proportion', propBtn.x + propBtn.w/2, propBtn.y + propBtn.h/2);
    buttons['modeP'] = {x: propBtn.x, y: propBtn.y, w: propBtn.w, h: propBtn.h, action: () => { mode = 'proportion'; }};

    // Mean button
    let meanBtn = {x: 148, y: y + 2, w: 60, h: 20};
    fill(mode === 'mean' ? sylviaGreen : '#ddd');
    stroke(mode === 'mean' ? sylviaGreen : '#aaa');
    strokeWeight(1);
    rect(meanBtn.x, meanBtn.y, meanBtn.w, meanBtn.h, 3);
    fill(mode === 'mean' ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Mean', meanBtn.x + meanBtn.w/2, meanBtn.y + meanBtn.h/2);
    buttons['modeM'] = {x: meanBtn.x, y: meanBtn.y, w: meanBtn.w, h: meanBtn.h, action: () => { mode = 'mean'; }};

    // Sample size slider
    let sliderX = 240;
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(12);
    text('n:', sliderX, y + 10);

    // Slider track
    let trackX = sliderX + 25;
    let trackW = 150;
    fill(220);
    noStroke();
    rect(trackX, y + 5, trackW, 10, 3);

    // Slider handle
    let handleX = map(n, 10, 500, trackX, trackX + trackW);
    fill(sylviaAuburn);
    ellipse(handleX, y + 10, 16, 16);

    buttons['nSlider'] = {x: trackX - 5, y: y, w: trackW + 10, h: 20, isSlider: true, param: 'n'};

    // N value display
    fill('black');
    textAlign(LEFT, CENTER);
    text(n, trackX + trackW + 10, y + 10);

    // Parameter slider (p or sigma)
    let paramX = 460;
    if (mode === 'proportion') {
        text('p:', paramX, y + 10);

        fill(220);
        noStroke();
        rect(paramX + 20, y + 5, 100, 10, 3);

        let pHandleX = map(p, 0.1, 0.9, paramX + 20, paramX + 120);
        fill(sylviaGreen);
        ellipse(pHandleX, y + 10, 16, 16);

        buttons['pSlider'] = {x: paramX + 15, y: y, w: 110, h: 20, isSlider: true, param: 'p'};

        fill('black');
        text(p.toFixed(2), paramX + 130, y + 10);
    } else {
        text('\u03C3:', paramX, y + 10);

        fill(220);
        noStroke();
        rect(paramX + 25, y + 5, 100, 10, 3);

        let sigmaHandleX = map(sigma, 5, 50, paramX + 25, paramX + 125);
        fill(sylviaGreen);
        ellipse(sigmaHandleX, y + 10, 16, 16);

        buttons['sigmaSlider'] = {x: paramX + 20, y: y, w: 110, h: 20, isSlider: true, param: 'sigma'};

        fill('black');
        text(sigma.toFixed(0), paramX + 135, y + 10);
    }

    // Reset button
    let resetX = canvasWidth - 65;
    fill(100);
    noStroke();
    rect(resetX, y + 2, 55, 20, 3);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Reset', resetX + 27, y + 12);
    buttons['reset'] = {x: resetX, y: y + 2, w: 55, h: 20, action: resetParams};

    // Second row - instructions
    y += 35;
    fill(80);
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Drag sliders to see how sample size (n) and population parameters affect the standard error of the sampling distribution.', 15, y + 10);
}

function resetParams() {
    n = 50;
    p = 0.5;
    sigma = 15;
}

function mousePressed() {
    // Check buttons
    for (let key in buttons) {
        let btn = buttons[key];
        if (!btn.isSlider && mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            if (btn.action) {
                btn.action();
            }
            return;
        }
    }

    // Check sliders
    if (buttons['nSlider'] && isInButton(buttons['nSlider'])) {
        draggingN = true;
    }
    if (buttons['pSlider'] && isInButton(buttons['pSlider'])) {
        draggingP = true;
    }
    if (buttons['sigmaSlider'] && isInButton(buttons['sigmaSlider'])) {
        draggingSigma = true;
    }
}

function isInButton(btn) {
    return mouseX >= btn.x && mouseX <= btn.x + btn.w &&
           mouseY >= btn.y && mouseY <= btn.y + btn.h;
}

function mouseDragged() {
    if (draggingN) {
        let btn = buttons['nSlider'];
        let trackX = 240 + 25;
        let trackW = 150;
        n = round(map(mouseX, trackX, trackX + trackW, 10, 500));
        n = constrain(n, 10, 500);
    }
    if (draggingP && mode === 'proportion') {
        let paramX = 460;
        p = map(mouseX, paramX + 20, paramX + 120, 0.1, 0.9);
        p = constrain(p, 0.1, 0.9);
        p = round(p * 20) / 20; // Round to 0.05
    }
    if (draggingSigma && mode === 'mean') {
        let paramX = 460;
        sigma = map(mouseX, paramX + 25, paramX + 125, 5, 50);
        sigma = constrain(sigma, 5, 50);
        sigma = round(sigma);
    }
}

function mouseReleased() {
    draggingN = false;
    draggingP = false;
    draggingSigma = false;
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
