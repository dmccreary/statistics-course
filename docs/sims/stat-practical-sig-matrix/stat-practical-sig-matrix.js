// Statistical vs Practical Significance Decision Matrix MicroSim
// A 2x2 matrix helping students distinguish between statistical and practical significance
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 380;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 14;

// Matrix layout
let matrixX, matrixY;
let matrixWidth = 500;
let matrixHeight = 280;
let cellWidth, cellHeight;

// Quadrant data
let quadrants = [
    {
        title: "Trivial Effect",
        color: [255, 152, 0], // Orange
        example: "Diet pill: 0.5 lb loss",
        stats: "p < 0.001, n = 10,000",
        detail: "The effect is real but too small to matter. Large sample sizes can detect tiny, meaningless differences. This is statistically significant but NOT practically significant.",
        row: 0, col: 0
    },
    {
        title: "Meaningful Discovery!",
        color: [76, 175, 80], // Green
        example: "New treatment: 40% symptom reduction",
        stats: "p = 0.02, n = 150",
        detail: "The best outcome! The effect is both real (statistically significant) and large enough to matter (practically significant). This is what researchers hope to find.",
        row: 0, col: 1
    },
    {
        title: "Nothing Here",
        color: [158, 158, 158], // Gray
        example: "No difference detected",
        stats: "p = 0.45, n = 50",
        detail: "No effect was detected, and even if one exists, it's too small to be practically important. Nothing to act on here.",
        row: 1, col: 0
    },
    {
        title: "Need More Data",
        color: [255, 193, 7], // Yellow
        example: "Promising 25% improvement",
        stats: "p = 0.12, n = 30",
        detail: "The effect LOOKS meaningful, but we don't have enough evidence to be sure it's real. A larger sample might detect this effect if it truly exists.",
        row: 1, col: 1
    }
];

// State
let selectedQuadrant = null;
let hoveredQuadrant = null;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    // Calculate matrix position
    matrixX = (canvasWidth - matrixWidth) / 2;
    matrixY = 80;
    cellWidth = matrixWidth / 2;
    cellHeight = matrixHeight / 2;

    describe('Interactive 2x2 decision matrix showing the relationship between statistical significance and practical significance. Click quadrants to see detailed explanations of each scenario.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    fill(250, 250, 255);
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill(245, 245, 250);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Update matrix position for responsive layout
    matrixX = (canvasWidth - matrixWidth) / 2;
    if (matrixX < 20) matrixX = 20;

    // Title
    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text('Statistical vs. Practical Significance Matrix', canvasWidth / 2, 10);
    textStyle(NORMAL);

    // Subtitle
    fill(80);
    textSize(12);
    text('Click each quadrant to learn more', canvasWidth / 2, 35);

    // Draw the matrix
    drawMatrix();

    // Draw axis labels
    drawAxisLabels();

    // Draw detail panel if quadrant is selected
    if (selectedQuadrant !== null) {
        drawDetailPanel();
    }

    // Draw instructions in control area
    drawControls();
}

function drawMatrix() {
    // Check for hover
    hoveredQuadrant = null;
    if (mouseX >= matrixX && mouseX <= matrixX + matrixWidth &&
        mouseY >= matrixY && mouseY <= matrixY + matrixHeight) {
        let col = floor((mouseX - matrixX) / cellWidth);
        let row = floor((mouseY - matrixY) / cellHeight);
        col = constrain(col, 0, 1);
        row = constrain(row, 0, 1);
        hoveredQuadrant = quadrants.find(q => q.row === row && q.col === col);
    }

    // Draw each quadrant
    for (let q of quadrants) {
        let x = matrixX + q.col * cellWidth;
        let y = matrixY + q.row * cellHeight;

        // Background
        let c = q.color;
        if (selectedQuadrant === q) {
            fill(c[0], c[1], c[2], 255);
        } else if (hoveredQuadrant === q) {
            fill(c[0], c[1], c[2], 200);
        } else {
            fill(c[0], c[1], c[2], 150);
        }

        stroke(100);
        strokeWeight(selectedQuadrant === q ? 3 : 1);
        rect(x, y, cellWidth, cellHeight);

        // Title
        fill(selectedQuadrant === q ? 255 : 30);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(14);
        textStyle(BOLD);
        text(q.title, x + cellWidth / 2, y + 15);
        textStyle(NORMAL);

        // Example
        textSize(11);
        fill(selectedQuadrant === q ? 240 : 60);
        text(q.example, x + cellWidth / 2, y + 40);

        // Stats
        textSize(10);
        fill(selectedQuadrant === q ? 220 : 80);
        text(q.stats, x + cellWidth / 2, y + 58);

        // Click hint
        if (hoveredQuadrant === q && selectedQuadrant !== q) {
            fill(30, 30, 30, 180);
            textSize(10);
            text('Click for details', x + cellWidth / 2, y + cellHeight - 20);
        }
    }
}

function drawAxisLabels() {
    // Y-axis label (Statistically Significant?)
    push();
    fill(30, 60, 100);
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);

    // Left side labels
    translate(matrixX - 35, matrixY + matrixHeight / 2);
    rotate(-PI / 2);
    text('Statistically Significant?', 0, 0);
    pop();

    // Y-axis values
    fill(60);
    textSize(11);
    textAlign(RIGHT, CENTER);
    textStyle(NORMAL);
    text('Yes', matrixX - 10, matrixY + cellHeight / 2);
    text('No', matrixX - 10, matrixY + cellHeight + cellHeight / 2);

    // X-axis label (Practically Significant?)
    fill(30, 60, 100);
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text('Practically Significant?', matrixX + matrixWidth / 2, matrixY + matrixHeight + 35);

    // X-axis values
    fill(60);
    textSize(11);
    textStyle(NORMAL);
    text('No', matrixX + cellWidth / 2, matrixY + matrixHeight + 15);
    text('Yes', matrixX + cellWidth + cellWidth / 2, matrixY + matrixHeight + 15);
}

function drawDetailPanel() {
    let q = selectedQuadrant;
    let panelY = drawHeight - 55;
    let panelHeight = 50;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(q.color[0], q.color[1], q.color[2]);
    strokeWeight(2);
    rect(margin, panelY, canvasWidth - margin * 2, panelHeight, 5);

    // Detail text
    fill(40);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);

    // Word wrap the detail text
    let maxWidth = canvasWidth - margin * 2 - 20;
    let wrappedText = wrapText(q.detail, maxWidth);
    text(wrappedText, margin + 10, panelY + 8);
}

function wrapText(txt, maxWidth) {
    let words = txt.split(' ');
    let lines = [];
    let currentLine = '';

    textSize(11);
    for (let word of words) {
        let testLine = currentLine + (currentLine ? ' ' : '') + word;
        if (textWidth(testLine) > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) lines.push(currentLine);

    return lines.slice(0, 3).join('\n'); // Limit to 3 lines
}

function drawControls() {
    // Reset button
    let btnX = canvasWidth / 2 - 50;
    let btnY = drawHeight + 10;
    let btnW = 100;
    let btnH = 30;

    // Button hover check
    let isHover = mouseX >= btnX && mouseX <= btnX + btnW &&
                  mouseY >= btnY && mouseY <= btnY + btnH;

    fill(isHover ? [70, 130, 180] : [100, 150, 200]);
    stroke(80, 120, 160);
    strokeWeight(1);
    rect(btnX, btnY, btnW, btnH, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('Reset View', btnX + btnW / 2, btnY + btnH / 2);
}

function mousePressed() {
    // Check matrix clicks
    if (mouseX >= matrixX && mouseX <= matrixX + matrixWidth &&
        mouseY >= matrixY && mouseY <= matrixY + matrixHeight) {
        let col = floor((mouseX - matrixX) / cellWidth);
        let row = floor((mouseY - matrixY) / cellHeight);
        col = constrain(col, 0, 1);
        row = constrain(row, 0, 1);

        let clicked = quadrants.find(q => q.row === row && q.col === col);
        if (clicked) {
            selectedQuadrant = (selectedQuadrant === clicked) ? null : clicked;
        }
        return;
    }

    // Check reset button
    let btnX = canvasWidth / 2 - 50;
    let btnY = drawHeight + 10;
    let btnW = 100;
    let btnH = 30;

    if (mouseX >= btnX && mouseX <= btnX + btnW &&
        mouseY >= btnY && mouseY <= btnY + btnH) {
        selectedQuadrant = null;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = min(containerWidth, 750);
    if (canvasWidth < 600) canvasWidth = 600;
}
