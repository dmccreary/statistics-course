// Factors and Levels Tree MicroSim
// Visualizes how factors and levels combine to create treatments
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 12;

// Tree structure data
let experiment = {
    name: "Study Methods Experiment",
    factor1: {
        name: "Study Technique",
        levels: ["Flashcards", "Practice Problems", "Reading Notes"]
    },
    factor2: {
        name: "Duration",
        levels: ["30 min", "60 min"]
    }
};

// Node positions (calculated in setup)
let nodes = [];
let treatments = [];

// Interaction state
let hoveredTreatment = -1;
let selectedTreatment = -1;

// Colors
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';
let lightBlue = '#64B5F6';
let lightOrange = '#FFB74D';
let creamBg = '#FFF8E1';

// Button
let resetButtonX, resetButtonY;
let buttonWidth = 80;
let buttonHeight = 28;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    calculateNodePositions();

    describe('Interactive tree diagram showing how factors and levels combine to create experimental treatments. Hover over treatments to highlight their path.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    fill(creamBg);
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill(245, 245, 250);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    textStyle(BOLD);
    text('Factors and Levels Tree', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Draw connections first (behind nodes)
    drawConnections();

    // Draw nodes
    drawNodes();

    // Draw treatments at bottom
    drawTreatments();

    // Draw info panel for selected treatment
    if (selectedTreatment >= 0) {
        drawInfoPanel();
    }

    // Draw controls
    drawControls();
}

function calculateNodePositions() {
    nodes = [];
    treatments = [];

    let levelHeight = 70;
    let startY = 50;

    // Root node
    nodes.push({
        x: canvasWidth / 2,
        y: startY,
        label: experiment.name,
        type: 'root',
        level: 0
    });

    // Factor 1 nodes (Study Techniques)
    let factor1Count = experiment.factor1.levels.length;
    let factor1Spacing = (canvasWidth - 100) / (factor1Count + 1);

    for (let i = 0; i < factor1Count; i++) {
        nodes.push({
            x: 50 + factor1Spacing * (i + 1),
            y: startY + levelHeight,
            label: experiment.factor1.levels[i],
            type: 'factor1',
            level: 1,
            index: i
        });
    }

    // Factor 2 nodes (Duration) - branching from each factor1
    let factor2Count = experiment.factor2.levels.length;
    let treatmentIndex = 0;

    for (let i = 0; i < factor1Count; i++) {
        let parentX = nodes[i + 1].x; // factor1 node
        let childSpacing = 50;

        for (let j = 0; j < factor2Count; j++) {
            let offsetX = (j - (factor2Count - 1) / 2) * childSpacing;
            nodes.push({
                x: parentX + offsetX,
                y: startY + levelHeight * 2,
                label: experiment.factor2.levels[j],
                type: 'factor2',
                level: 2,
                parentIndex: i,
                index: j
            });

            // Create treatment
            treatments.push({
                number: treatmentIndex + 1,
                technique: experiment.factor1.levels[i],
                duration: experiment.factor2.levels[j],
                factor1Index: i,
                factor2Index: j,
                nodeIndex: nodes.length - 1
            });
            treatmentIndex++;
        }
    }
}

function drawConnections() {
    strokeWeight(2);

    // Root to Factor 1 connections
    let rootNode = nodes[0];
    for (let i = 1; i <= experiment.factor1.levels.length; i++) {
        let factor1Node = nodes[i];

        let isHighlighted = false;
        if (hoveredTreatment >= 0 || selectedTreatment >= 0) {
            let t = selectedTreatment >= 0 ? treatments[selectedTreatment] : treatments[hoveredTreatment];
            isHighlighted = (t.factor1Index === i - 1);
        }

        if (isHighlighted) {
            stroke(sylviaGreen);
            strokeWeight(4);
        } else {
            stroke(180);
            strokeWeight(2);
        }

        line(rootNode.x, rootNode.y + 15, factor1Node.x, factor1Node.y - 15);
    }

    // Factor 1 to Factor 2 connections
    let factor2StartIndex = experiment.factor1.levels.length + 1;
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].type === 'factor2') {
            let parentNode = nodes[nodes[i].parentIndex + 1];

            let isHighlighted = false;
            if (hoveredTreatment >= 0 || selectedTreatment >= 0) {
                let t = selectedTreatment >= 0 ? treatments[selectedTreatment] : treatments[hoveredTreatment];
                isHighlighted = (t.factor1Index === nodes[i].parentIndex && t.factor2Index === nodes[i].index);
            }

            if (isHighlighted) {
                stroke(sylviaAuburn);
                strokeWeight(4);
            } else {
                stroke(180);
                strokeWeight(2);
            }

            line(parentNode.x, parentNode.y + 15, nodes[i].x, nodes[i].y - 12);
        }
    }
}

function drawNodes() {
    textAlign(CENTER, CENTER);
    textSize(11);

    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        let isHighlighted = false;

        if (hoveredTreatment >= 0 || selectedTreatment >= 0) {
            let t = selectedTreatment >= 0 ? treatments[selectedTreatment] : treatments[hoveredTreatment];
            if (node.type === 'root') {
                isHighlighted = true;
            } else if (node.type === 'factor1') {
                isHighlighted = (t.factor1Index === node.index);
            } else if (node.type === 'factor2') {
                isHighlighted = (t.factor1Index === node.parentIndex && t.factor2Index === node.index);
            }
        }

        // Determine colors based on type
        let fillColor, strokeColor;
        if (node.type === 'root') {
            fillColor = isHighlighted ? color(46, 125, 50) : color(sylviaGreen);
            strokeColor = color(27, 94, 32);
        } else if (node.type === 'factor1') {
            fillColor = isHighlighted ? color(66, 165, 245) : color(lightBlue);
            strokeColor = color(30, 136, 229);
        } else if (node.type === 'factor2') {
            fillColor = isHighlighted ? color(255, 167, 38) : color(lightOrange);
            strokeColor = color(245, 124, 0);
        }

        // Draw node shape
        if (node.type === 'root') {
            // Rectangle for root
            fill(fillColor);
            stroke(strokeColor);
            strokeWeight(isHighlighted ? 3 : 2);
            rectMode(CENTER);
            rect(node.x, node.y, 160, 30, 5);
            rectMode(CORNER);
        } else {
            // Oval for levels
            fill(fillColor);
            stroke(strokeColor);
            strokeWeight(isHighlighted ? 3 : 2);
            ellipse(node.x, node.y, node.label.length * 8 + 20, 28);
        }

        // Node label
        fill(node.type === 'root' ? 255 : 30);
        noStroke();
        textStyle(isHighlighted ? BOLD : NORMAL);
        text(node.label, node.x, node.y);
        textStyle(NORMAL);
    }

    // Draw factor labels
    textSize(10);
    fill(100);
    textAlign(LEFT, CENTER);

    // Factor 1 label
    let f1Node = nodes[1];
    text('Factor 1:', 10, f1Node.y);
    text(experiment.factor1.name, 10, f1Node.y + 12);

    // Factor 2 label
    for (let n of nodes) {
        if (n.type === 'factor2') {
            text('Factor 2:', 10, n.y);
            text(experiment.factor2.name, 10, n.y + 12);
            break;
        }
    }
}

function drawTreatments() {
    let treatmentY = drawHeight - 80;
    let treatmentWidth = 95;
    let treatmentHeight = 55;
    let totalWidth = treatments.length * (treatmentWidth + 10);
    let startX = (canvasWidth - totalWidth) / 2 + treatmentWidth / 2;

    textAlign(CENTER, CENTER);

    // Label
    textSize(11);
    fill(100);
    text('Treatments:', 40, treatmentY + treatmentHeight / 2);

    for (let i = 0; i < treatments.length; i++) {
        let t = treatments[i];
        let x = startX + i * (treatmentWidth + 10);
        let y = treatmentY;

        // Store position for hit detection
        t.x = x;
        t.y = y;
        t.width = treatmentWidth;
        t.height = treatmentHeight;

        let isHovered = (hoveredTreatment === i);
        let isSelected = (selectedTreatment === i);

        // Draw treatment box
        if (isSelected) {
            fill(181, 101, 29);
            stroke(139, 69, 19);
            strokeWeight(3);
        } else if (isHovered) {
            fill(205, 133, 63);
            stroke(139, 69, 19);
            strokeWeight(2);
        } else {
            fill(sylviaAuburn);
            stroke(139, 69, 19);
            strokeWeight(1);
        }

        rectMode(CENTER);
        rect(x, y + treatmentHeight / 2, treatmentWidth, treatmentHeight, 5);
        rectMode(CORNER);

        // Treatment text
        fill(255);
        noStroke();
        textSize(10);
        textStyle(BOLD);
        text('Treatment ' + t.number, x, y + 12);
        textStyle(NORMAL);
        textSize(9);
        text(t.technique, x, y + 28);
        text(t.duration, x, y + 42);

        // Draw connection to factor2 node
        let factor2Node = nodes[t.nodeIndex];

        let lineHighlighted = isHovered || isSelected;
        if (lineHighlighted) {
            stroke(sylviaAuburn);
            strokeWeight(3);
        } else {
            stroke(200);
            strokeWeight(1);
        }

        // Dashed line
        drawingContext.setLineDash(lineHighlighted ? [] : [4, 4]);
        line(x, y, factor2Node.x, factor2Node.y + 14);
        drawingContext.setLineDash([]);
    }
}

function drawInfoPanel() {
    let t = treatments[selectedTreatment];
    let panelWidth = 220;
    let panelHeight = 80;
    let panelX = canvasWidth - panelWidth - 15;
    let panelY = 35;

    // Panel background
    fill(255, 255, 255, 245);
    stroke(sylviaAuburn);
    strokeWeight(2);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    // Panel content
    fill(30);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Treatment ' + t.number + ' Details:', panelX + 10, panelY + 8);
    textStyle(NORMAL);
    textSize(11);
    text('Study Technique: ' + t.technique, panelX + 10, panelY + 28);
    text('Duration: ' + t.duration, panelX + 10, panelY + 44);

    fill(80);
    textSize(10);
    text('Students use this method for testing.', panelX + 10, panelY + 62);
}

function drawControls() {
    resetButtonX = canvasWidth / 2 - buttonWidth / 2;
    resetButtonY = drawHeight + 11;

    // Reset button
    fill(100, 130, 180);
    stroke(70, 100, 150);
    strokeWeight(1);
    rect(resetButtonX, resetButtonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Clear Selection', resetButtonX + buttonWidth / 2, resetButtonY + buttonHeight / 2);

    // Instructions
    fill(80);
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Hover over treatments to highlight their path. Click to select.', margin, resetButtonY + buttonHeight / 2);
}

function mouseMoved() {
    // Check if hovering over a treatment
    hoveredTreatment = -1;

    for (let i = 0; i < treatments.length; i++) {
        let t = treatments[i];
        if (mouseX >= t.x - t.width / 2 && mouseX <= t.x + t.width / 2 &&
            mouseY >= t.y && mouseY <= t.y + t.height) {
            hoveredTreatment = i;
            break;
        }
    }
}

function mousePressed() {
    // Check treatment clicks
    for (let i = 0; i < treatments.length; i++) {
        let t = treatments[i];
        if (mouseX >= t.x - t.width / 2 && mouseX <= t.x + t.width / 2 &&
            mouseY >= t.y && mouseY <= t.y + t.height) {
            selectedTreatment = (selectedTreatment === i) ? -1 : i;
            return;
        }
    }

    // Check reset button
    if (mouseX >= resetButtonX && mouseX <= resetButtonX + buttonWidth &&
        mouseY >= resetButtonY && mouseY <= resetButtonY + buttonHeight) {
        selectedTreatment = -1;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    calculateNodePositions();
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = min(containerWidth, 750);
    if (canvasWidth < 650) canvasWidth = 650;
}
