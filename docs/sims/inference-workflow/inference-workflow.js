// Statistical Inference Workflow MicroSim
// Interactive infographic showing how sampling distributions enable inference
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 800;
let drawHeight = 380;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 20;

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaGreenLight = '#4CAF50';
let sylviaAuburn = '#B5651D';
let sylviaAuburnLight = '#CD853F';
let sylviaCream = '#FFF8E1';
let sylviaHazel = '#8B7355';

// Animation state
let selectedPath = null; // 'confidence' or 'hypothesis'
let hoverElement = null;
let animationPhase = 0;

// Elements for hover detection
let elements = {};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    describe('Interactive infographic showing the statistical inference workflow connecting samples to populations through sampling distributions', LABEL);
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
    text('Statistical Inference Workflow', canvasWidth / 2, 10);

    animationPhase = (frameCount / 60) % 4; // Cycle every 4 seconds

    // Draw main components
    drawPopulationBox();
    drawSampleBox();
    drawSamplingDistributionBox();
    drawInferenceArrows();
    drawConnections();
    drawLegend();
    drawControls();
}

function drawPopulationBox() {
    let boxX = 50;
    let boxY = 50;
    let boxW = 180;
    let boxH = 120;

    let isHovered = hoverElement === 'population';
    let isHighlighted = selectedPath !== null;

    // Box
    fill(isHovered ? '#1B5E20' : sylviaGreen);
    stroke(sylviaGreen);
    strokeWeight(isHovered ? 3 : 2);
    rect(boxX, boxY, boxW, boxH, 10);

    // Title
    fill('white');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    text('POPULATION', boxX + boxW/2, boxY + 12);

    // Parameter symbols
    textSize(24);
    text('p  or  \u03BC', boxX + boxW/2, boxY + 42);

    // Description
    textSize(11);
    text('Unknown parameter', boxX + boxW/2, boxY + 78);
    text('What we want to learn about', boxX + boxW/2, boxY + 94);

    elements['population'] = {x: boxX, y: boxY, w: boxW, h: boxH};

    // Hover tooltip
    if (isHovered) {
        drawTooltip(boxX + boxW + 10, boxY,
            'Population Parameter',
            'The true value we want to estimate.\n' +
            'p = population proportion\n' +
            '\u03BC = population mean\n\n' +
            'We can never know this exactly!');
    }
}

function drawSampleBox() {
    let boxX = 50;
    let boxY = 220;
    let boxW = 180;
    let boxH = 120;

    let isHovered = hoverElement === 'sample';

    // Box
    fill(isHovered ? sylviaAuburnLight : sylviaAuburn);
    stroke(sylviaAuburn);
    strokeWeight(isHovered ? 3 : 2);
    rect(boxX, boxY, boxW, boxH, 10);

    // Title
    fill('white');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    text('SAMPLE (n)', boxX + boxW/2, boxY + 12);

    // Statistic symbols
    textSize(24);
    text('p\u0302  or  x\u0305', boxX + boxW/2, boxY + 42);

    // Description
    textSize(11);
    text('Observed statistic', boxX + boxW/2, boxY + 78);
    text('What we can measure', boxX + boxW/2, boxY + 94);

    elements['sample'] = {x: boxX, y: boxY, w: boxW, h: boxH};

    // Arrow from population to sample
    stroke(100);
    strokeWeight(2);
    let arrowX = boxX + boxW/2;
    line(arrowX, 170, arrowX, 220);
    // Arrow head
    noStroke();
    fill(100);
    triangle(arrowX, 220, arrowX - 6, 210, arrowX + 6, 210);

    // Label for sampling
    fill(80);
    textSize(10);
    textAlign(CENTER, CENTER);
    text('Random', arrowX + 30, 188);
    text('Sampling', arrowX + 30, 200);

    // Hover tooltip
    if (isHovered) {
        drawTooltip(boxX + boxW + 10, boxY,
            'Sample Statistic',
            'The value calculated from our data.\n' +
            'p\u0302 = sample proportion\n' +
            'x\u0305 = sample mean\n\n' +
            'This is what we actually observe!');
    }
}

function drawSamplingDistributionBox() {
    let boxX = canvasWidth/2 - 60;
    let boxY = 100;
    let boxW = 220;
    let boxH = 170;

    let isHovered = hoverElement === 'sampling_dist';

    // Box with gradient-like effect
    fill(sylviaCream);
    stroke(sylviaGreen);
    strokeWeight(isHovered ? 3 : 2);
    rect(boxX, boxY, boxW, boxH, 10);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('SAMPLING DISTRIBUTION', boxX + boxW/2, boxY + 10);

    // Draw mini normal curve
    let curveX = boxX + 30;
    let curveY = boxY + 50;
    let curveW = boxW - 60;
    let curveH = 70;

    // Filled curve
    fill(sylviaGreenLight);
    fill(red(color(sylviaGreenLight)), green(color(sylviaGreenLight)), blue(color(sylviaGreenLight)), 100);
    noStroke();
    beginShape();
    vertex(curveX, curveY + curveH);
    for (let px = 0; px <= curveW; px++) {
        let z = map(px, 0, curveW, -3, 3);
        let density = exp(-0.5 * z * z);
        let y = curveY + curveH - density * curveH * 0.9;
        vertex(curveX + px, y);
    }
    vertex(curveX + curveW, curveY + curveH);
    endShape(CLOSE);

    // Curve outline
    stroke(sylviaGreen);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let px = 0; px <= curveW; px++) {
        let z = map(px, 0, curveW, -3, 3);
        let density = exp(-0.5 * z * z);
        let y = curveY + curveH - density * curveH * 0.9;
        vertex(curveX + px, y);
    }
    endShape();

    // Labels on curve
    fill(sylviaGreen);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    text('Mean', boxX + boxW/2, curveY + curveH + 5);

    textSize(9);
    text('SE', boxX + boxW/2 - 30, curveY + curveH + 5);
    text('SE', boxX + boxW/2 + 30, curveY + curveH + 5);

    // Description
    fill(80);
    textSize(10);
    textAlign(CENTER, TOP);
    text('Theoretical distribution of all', boxX + boxW/2, boxY + 140);
    text('possible sample statistics', boxX + boxW/2, boxY + 152);

    elements['sampling_dist'] = {x: boxX, y: boxY, w: boxW, h: boxH};

    // CLT badge
    fill(sylviaGreen);
    noStroke();
    ellipse(boxX + boxW - 15, boxY + 15, 30, 30);
    fill('white');
    textSize(8);
    textAlign(CENTER, CENTER);
    text('CLT', boxX + boxW - 15, boxY + 15);

    // Hover tooltip
    if (isHovered) {
        drawTooltip(boxX + boxW + 10, boxY,
            'Sampling Distribution',
            'Shows how statistics vary across\n' +
            'all possible samples.\n\n' +
            'Key Properties:\n' +
            '- Center: equals parameter\n' +
            '- Spread: standard error\n' +
            '- Shape: approximately normal (CLT)');
    }
}

function drawInferenceArrows() {
    let sdBoxX = canvasWidth/2 - 60;
    let sdBoxY = 100;
    let sdBoxW = 220;
    let sdBoxH = 170;

    // Confidence Interval path
    let ciSelected = selectedPath === 'confidence';
    let ciHighlight = ciSelected || hoverElement === 'ci_arrow';

    // CI box
    let ciBoxX = canvasWidth - 200;
    let ciBoxY = 60;
    let ciBoxW = 160;
    let ciBoxH = 90;

    fill(ciHighlight ? '#e8f5e9' : '#f5f5f5');
    stroke(ciHighlight ? sylviaGreen : '#aaa');
    strokeWeight(ciHighlight ? 2 : 1);
    rect(ciBoxX, ciBoxY, ciBoxW, ciBoxH, 8);

    fill(ciHighlight ? sylviaGreen : '#666');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(13);
    text('Confidence Interval', ciBoxX + ciBoxW/2, ciBoxY + 12);

    textSize(10);
    fill(80);
    text('Estimate parameter', ciBoxX + ciBoxW/2, ciBoxY + 35);
    text('with range of', ciBoxX + ciBoxW/2, ciBoxY + 48);
    text('plausible values', ciBoxX + ciBoxW/2, ciBoxY + 61);

    elements['ci_arrow'] = {x: ciBoxX, y: ciBoxY, w: ciBoxW, h: ciBoxH};

    // Hypothesis Test path
    let htSelected = selectedPath === 'hypothesis';
    let htHighlight = htSelected || hoverElement === 'ht_arrow';

    // HT box
    let htBoxX = canvasWidth - 200;
    let htBoxY = 190;
    let htBoxW = 160;
    let htBoxH = 90;

    fill(htHighlight ? '#fff3e0' : '#f5f5f5');
    stroke(htHighlight ? sylviaAuburn : '#aaa');
    strokeWeight(htHighlight ? 2 : 1);
    rect(htBoxX, htBoxY, htBoxW, htBoxH, 8);

    fill(htHighlight ? sylviaAuburn : '#666');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(13);
    text('Hypothesis Test', htBoxX + htBoxW/2, htBoxY + 12);

    textSize(10);
    fill(80);
    text('Evaluate claims', htBoxX + htBoxW/2, htBoxY + 35);
    text('about parameter', htBoxX + htBoxW/2, htBoxY + 48);
    text('using sample evidence', htBoxX + htBoxW/2, htBoxY + 61);

    elements['ht_arrow'] = {x: htBoxX, y: htBoxY, w: htBoxW, h: htBoxH};

    // Draw arrows from sampling distribution
    let startX = sdBoxX + sdBoxW;
    let startY1 = sdBoxY + 40;
    let startY2 = sdBoxY + sdBoxH - 40;

    // CI arrow
    stroke(ciHighlight ? sylviaGreen : '#888');
    strokeWeight(ciHighlight ? 3 : 2);
    noFill();
    beginShape();
    vertex(startX, startY1);
    bezierVertex(startX + 40, startY1, ciBoxX - 40, ciBoxY + ciBoxH/2, ciBoxX, ciBoxY + ciBoxH/2);
    endShape();

    // Arrow head
    fill(ciHighlight ? sylviaGreen : '#888');
    noStroke();
    push();
    translate(ciBoxX, ciBoxY + ciBoxH/2);
    rotate(0);
    triangle(0, 0, -10, -5, -10, 5);
    pop();

    // HT arrow
    stroke(htHighlight ? sylviaAuburn : '#888');
    strokeWeight(htHighlight ? 3 : 2);
    noFill();
    beginShape();
    vertex(startX, startY2);
    bezierVertex(startX + 40, startY2, htBoxX - 40, htBoxY + htBoxH/2, htBoxX, htBoxY + htBoxH/2);
    endShape();

    // Arrow head
    fill(htHighlight ? sylviaAuburn : '#888');
    noStroke();
    push();
    translate(htBoxX, htBoxY + htBoxH/2);
    rotate(0);
    triangle(0, 0, -10, -5, -10, 5);
    pop();
}

function drawConnections() {
    let sampleBoxX = 50;
    let sampleBoxY = 220;
    let sampleBoxW = 180;

    let sdBoxX = canvasWidth/2 - 60;
    let sdBoxY = 100;
    let sdBoxH = 170;

    // Arrow from sample to sampling distribution
    let startX = sampleBoxX + sampleBoxW;
    let startY = sampleBoxY + 60;
    let endX = sdBoxX;
    let endY = sdBoxY + sdBoxH - 40;

    stroke('#888');
    strokeWeight(2);
    drawingContext.setLineDash([5, 3]);
    line(startX, startY, endX, endY);
    drawingContext.setLineDash([]);

    // Arrow head
    let angle = atan2(endY - startY, endX - startX);
    fill('#888');
    noStroke();
    push();
    translate(endX, endY);
    rotate(angle);
    triangle(0, 0, -10, -5, -10, 5);
    pop();

    // Label
    fill(80);
    noStroke();
    textSize(9);
    textAlign(CENTER, CENTER);
    let midX = (startX + endX) / 2;
    let midY = (startY + endY) / 2;
    text('Locates sample', midX, midY - 10);
    text('in distribution', midX, midY + 2);
}

function drawLegend() {
    let legendX = 50;
    let legendY = drawHeight - 30;

    fill(80);
    noStroke();
    textSize(10);
    textAlign(LEFT, CENTER);

    // Population color
    fill(sylviaGreen);
    rect(legendX, legendY - 6, 12, 12, 2);
    fill(80);
    text('Population/Parameter', legendX + 18, legendY);

    // Sample color
    fill(sylviaAuburn);
    rect(legendX + 140, legendY - 6, 12, 12, 2);
    fill(80);
    text('Sample/Statistic', legendX + 158, legendY);

    // Sampling distribution
    fill(sylviaCream);
    stroke(sylviaGreen);
    strokeWeight(1);
    rect(legendX + 270, legendY - 6, 12, 12, 2);
    fill(80);
    noStroke();
    text('Sampling Distribution', legendX + 288, legendY);
}

function drawControls() {
    let y = drawHeight + 15;

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Highlight Path:', 15, y + 10);

    // Show All button
    let btnX = 110;
    fill(selectedPath === null ? sylviaGreen : '#ddd');
    noStroke();
    rect(btnX, y + 2, 65, 20, 3);
    fill(selectedPath === null ? 'white' : 'black');
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Show All', btnX + 32, y + 12);
    elements['btn_all'] = {x: btnX, y: y + 2, w: 65, h: 20, action: () => { selectedPath = null; }};

    // Confidence Interval button
    btnX += 75;
    fill(selectedPath === 'confidence' ? sylviaGreen : '#ddd');
    rect(btnX, y + 2, 120, 20, 3);
    fill(selectedPath === 'confidence' ? 'white' : 'black');
    text('Confidence Interval', btnX + 60, y + 12);
    elements['btn_ci'] = {x: btnX, y: y + 2, w: 120, h: 20, action: () => { selectedPath = 'confidence'; }};

    // Hypothesis Test button
    btnX += 130;
    fill(selectedPath === 'hypothesis' ? sylviaAuburn : '#ddd');
    rect(btnX, y + 2, 110, 20, 3);
    fill(selectedPath === 'hypothesis' ? 'white' : 'black');
    text('Hypothesis Test', btnX + 55, y + 12);
    elements['btn_ht'] = {x: btnX, y: y + 2, w: 110, h: 20, action: () => { selectedPath = 'hypothesis'; }};

    // Instructions
    y += 30;
    fill(80);
    textSize(10);
    textAlign(LEFT, CENTER);
    text('Hover over components for details. Click path buttons to highlight different inference types.', 15, y + 10);
}

function drawTooltip(x, y, title, content) {
    let lines = content.split('\n');
    let maxWidth = 0;
    textSize(10);
    for (let line of lines) {
        maxWidth = max(maxWidth, textWidth(line));
    }
    maxWidth = max(maxWidth, textWidth(title) + 20);

    let tipWidth = maxWidth + 20;
    let tipHeight = 30 + lines.length * 14;

    // Constrain to canvas
    if (x + tipWidth > canvasWidth - 10) {
        x = canvasWidth - tipWidth - 10;
    }

    // Shadow
    fill(0, 0, 0, 30);
    noStroke();
    rect(x + 3, y + 3, tipWidth, tipHeight, 5);

    // Background
    fill(255);
    stroke(sylviaGreen);
    strokeWeight(1);
    rect(x, y, tipWidth, tipHeight, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textSize(11);
    textAlign(LEFT, TOP);
    text(title, x + 10, y + 8);

    // Content
    fill(80);
    textSize(10);
    let ty = y + 26;
    for (let line of lines) {
        text(line, x + 10, ty);
        ty += 14;
    }
}

function mouseMoved() {
    hoverElement = null;

    for (let key in elements) {
        let el = elements[key];
        if (mouseX >= el.x && mouseX <= el.x + el.w &&
            mouseY >= el.y && mouseY <= el.y + el.h) {
            hoverElement = key;
            break;
        }
    }
}

function mousePressed() {
    for (let key in elements) {
        let el = elements[key];
        if (el.action && mouseX >= el.x && mouseX <= el.x + el.w &&
            mouseY >= el.y && mouseY <= el.y + el.h) {
            el.action();
            return;
        }
    }
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
