// Probability Distribution Bar Chart MicroSim
// Visualize the probability distribution for rolling a die
// Shows equal probabilities for each outcome
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 600;
let drawHeight = 350;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 14;

// Plot dimensions
let plotLeft, plotTop, plotWidth, plotHeight;
let plotPadding = 50;

// Die values and probabilities
let dieValues = [1, 2, 3, 4, 5, 6];
let probabilities = [1/6, 1/6, 1/6, 1/6, 1/6, 1/6];

// Hover state
let hoveredBar = -1;

// Display mode: 'fraction' or 'decimal'
let displayMode = 'fraction';

// UI elements
let buttons = [];

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
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textFont('Arial');
    textSize(defaultTextSize);

    describe('Probability distribution bar chart for rolling a fair six-sided die. Each bar represents the probability of rolling that number, with equal heights of 1/6 for each outcome.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Calculate plot dimensions
    plotLeft = plotPadding + 10;
    plotTop = 50;
    plotWidth = canvasWidth - plotPadding - 50;
    plotHeight = drawHeight - plotTop - 60;

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
    textSize(20);
    text('Probability Distribution: Rolling a Fair Die', canvasWidth / 2, 12);

    // Draw components
    drawBarChart();
    drawControls();
}

function drawBarChart() {
    // Plot background
    fill(255);
    stroke(150);
    strokeWeight(1);
    rect(plotLeft, plotTop, plotWidth, plotHeight);

    // Grid lines
    stroke(230);
    strokeWeight(1);

    // Horizontal grid lines (probability scale 0 to 0.3)
    let maxProb = 0.3;
    for (let i = 1; i <= 6; i++) {
        let prob = i * 0.05;
        let y = map(prob, 0, maxProb, plotTop + plotHeight, plotTop);
        line(plotLeft, y, plotLeft + plotWidth, y);
    }

    // Draw axes
    stroke(100);
    strokeWeight(2);
    line(plotLeft, plotTop + plotHeight, plotLeft + plotWidth, plotTop + plotHeight); // X-axis
    line(plotLeft, plotTop, plotLeft, plotTop + plotHeight); // Y-axis

    // Y-axis labels
    fill(80);
    noStroke();
    textSize(11);
    textAlign(RIGHT, CENTER);

    for (let i = 0; i <= 6; i++) {
        let prob = i * 0.05;
        let y = map(prob, 0, maxProb, plotTop + plotHeight, plotTop);
        if (displayMode === 'decimal') {
            text(prob.toFixed(2), plotLeft - 5, y);
        } else {
            // Show as fractions
            if (i === 0) {
                text('0', plotLeft - 5, y);
            } else if (i === 2) {
                text('1/10', plotLeft - 5, y);
            } else if (i === 4) {
                text('1/5', plotLeft - 5, y);
            } else if (i === 6) {
                text('3/10', plotLeft - 5, y);
            }
        }
    }

    // Y-axis title
    push();
    translate(15, plotTop + plotHeight / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    textSize(14);
    fill('black');
    text('Probability P(X = x)', 0, 0);
    pop();

    // Draw bars
    let barWidth = (plotWidth - 60) / 6;
    let barSpacing = 10;
    let startX = plotLeft + 30;

    hoveredBar = -1;

    for (let i = 0; i < 6; i++) {
        let x = startX + i * (barWidth + barSpacing);
        let barHeight = map(probabilities[i], 0, maxProb, 0, plotHeight);
        let y = plotTop + plotHeight - barHeight;

        // Check if mouse is hovering over this bar
        let isHovered = mouseX >= x && mouseX <= x + barWidth &&
                        mouseY >= y && mouseY <= plotTop + plotHeight;

        if (isHovered) {
            hoveredBar = i;
            fill(sylviaAuburn);
            stroke(sylviaGreenDark);
        } else {
            fill(sylviaGreen);
            stroke(sylviaGreenDark);
        }

        strokeWeight(2);
        rect(x, y, barWidth, barHeight, 3, 3, 0, 0);

        // X-axis label (die value)
        fill('black');
        noStroke();
        textAlign(CENTER, TOP);
        textSize(16);
        text(dieValues[i], x + barWidth / 2, plotTop + plotHeight + 8);

        // Probability label on top of bar
        textSize(11);
        textAlign(CENTER, BOTTOM);
        if (displayMode === 'fraction') {
            text('1/6', x + barWidth / 2, y - 3);
        } else {
            text('0.167', x + barWidth / 2, y - 3);
        }
    }

    // X-axis title
    fill('black');
    textAlign(CENTER, TOP);
    textSize(14);
    text('Value of X (Die Outcome)', plotLeft + plotWidth / 2, plotTop + plotHeight + 30);

    // Hover info box
    if (hoveredBar >= 0) {
        drawHoverInfo(hoveredBar);
    }

    // Draw the 1/6 reference line
    stroke(sylviaAuburn);
    strokeWeight(2);
    setLineDash([5, 5]);
    let refY = map(1/6, 0, maxProb, plotTop + plotHeight, plotTop);
    line(plotLeft, refY, plotLeft + plotWidth, refY);
    setLineDash([]);

    // Reference line label
    fill(sylviaAuburn);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('1/6 = 0.167', plotLeft + plotWidth + 5, refY);
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function drawHoverInfo(barIndex) {
    let boxWidth = 180;
    let boxHeight = 70;
    let boxX = canvasWidth - boxWidth - 20;
    let boxY = plotTop + 10;

    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(boxX, boxY, boxWidth, boxHeight, 8);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);

    let value = dieValues[barIndex];
    text('Die shows: ' + value, boxX + 12, boxY + 12);

    textSize(13);
    if (displayMode === 'fraction') {
        text('P(X = ' + value + ') = 1/6', boxX + 12, boxY + 32);
    } else {
        text('P(X = ' + value + ') = 0.1667', boxX + 12, boxY + 32);
    }

    fill(sylviaGreen);
    textSize(11);
    text('Each outcome is equally likely!', boxX + 12, boxY + 52);
}

function drawControls() {
    buttons = [];

    let btnY = drawHeight + 20;
    let btnHeight = 30;
    let btnSpacing = 15;
    let x = 20;

    // Display mode toggle buttons
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text('Display:', x, btnY + btnHeight / 2);
    x += 70;

    // Fraction button
    let fracActive = displayMode === 'fraction';
    drawButton(x, btnY, 80, btnHeight, 'Fractions', 'fraction', fracActive);
    x += 80 + btnSpacing;

    // Decimal button
    let decActive = displayMode === 'decimal';
    drawButton(x, btnY, 80, btnHeight, 'Decimals', 'decimal', decActive);

    // Info text
    fill(80);
    textSize(12);
    textAlign(LEFT, TOP);
    text('Hover over any bar to see exact probability.', 20, drawHeight + 60);

    // Sylvia quote
    fill(sylviaGreenDark);
    textSize(11);
    text('"A uniform distribution means every outcome has the same chance - like a fair die!" - Sylvia', 20, drawHeight + 78);
}

function drawButton(x, y, w, h, label, action, isActive) {
    let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

    if (isActive) {
        fill(sylviaGreen);
    } else if (isHover) {
        fill(sylviaGreenLight);
    } else {
        fill(220);
    }

    stroke(sylviaGreenDark);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    fill(isActive ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(label, x + w / 2, y + h / 2);

    buttons.push({x, y, w, h, action});
}

function mousePressed() {
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
    if (action === 'fraction' || action === 'decimal') {
        displayMode = action;
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
