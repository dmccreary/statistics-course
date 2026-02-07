// Experiment Planning Decision Flowchart MicroSim
// Guides students through experiment design decisions
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 15;
let defaultTextSize = 11;

// Flowchart nodes
let nodes = [
    {
        id: 'start',
        type: 'terminal',
        text: 'Define Research\nQuestion',
        x: 350,
        y: 35,
        details: 'Identify your response variable, factors, and levels. What outcome are you measuring? What variables are you manipulating?'
    },
    {
        id: 'variability',
        type: 'decision',
        text: 'Significant unit\nvariability?',
        x: 350,
        y: 105,
        details: 'Are your experimental units very different from each other in ways that could affect the outcome?'
    },
    {
        id: 'cr-design',
        type: 'process',
        text: 'Completely\nRandomized Design',
        x: 150,
        y: 105,
        details: 'Randomly assign all units to treatments. Simple and effective when units are similar.'
    },
    {
        id: 'measure',
        type: 'decision',
        text: 'Can you measure\nthe source?',
        x: 350,
        y: 175,
        details: 'Can you identify and measure the variable causing the unit variability?'
    },
    {
        id: 'increase-n',
        type: 'process',
        text: 'Increase\nSample Size',
        x: 550,
        y: 175,
        details: 'If you cannot block, use more experimental units to overcome individual variation.'
    },
    {
        id: 'two-treatments',
        type: 'decision',
        text: 'Exactly 2\ntreatments?',
        x: 350,
        y: 245,
        details: 'Are you comparing exactly two treatment conditions?'
    },
    {
        id: 'matched-pairs',
        type: 'process',
        text: 'Consider\nMatched Pairs',
        x: 150,
        y: 245,
        details: 'Pair similar units and assign one to each treatment. Very powerful for 2-treatment comparisons.'
    },
    {
        id: 'block-design',
        type: 'process',
        text: 'Randomized\nBlock Design',
        x: 550,
        y: 245,
        details: 'Group units into blocks by the measured variable, then randomize within blocks.'
    },
    {
        id: 'principles',
        type: 'process',
        text: 'Apply Three\nPrinciples',
        x: 350,
        y: 315,
        details: 'Control: Hold extraneous variables constant. Randomization: Use chance to assign. Replication: Use enough units.'
    },
    {
        id: 'blinding',
        type: 'decision',
        text: 'Blinding\npossible?',
        x: 350,
        y: 385,
        details: 'Can subjects and/or researchers be kept unaware of treatment assignment?'
    },
    {
        id: 'blind-yes',
        type: 'process',
        text: 'Single or\nDouble Blind',
        x: 150,
        y: 385,
        details: 'Implement appropriate blinding to reduce bias from expectations.'
    },
    {
        id: 'blind-no',
        type: 'process',
        text: 'Document\nLimitation',
        x: 550,
        y: 385,
        details: 'Note that blinding was not possible. Interpret results with this limitation in mind.'
    }
];

// Connections between nodes
let connections = [
    { from: 'start', to: 'variability' },
    { from: 'variability', to: 'cr-design', label: 'No', direction: 'left' },
    { from: 'variability', to: 'measure', label: 'Yes' },
    { from: 'measure', to: 'increase-n', label: 'No', direction: 'right' },
    { from: 'measure', to: 'two-treatments', label: 'Yes' },
    { from: 'two-treatments', to: 'matched-pairs', label: 'Yes', direction: 'left' },
    { from: 'two-treatments', to: 'block-design', label: 'No', direction: 'right' },
    { from: 'cr-design', to: 'principles', path: 'down-right' },
    { from: 'matched-pairs', to: 'principles', path: 'down-right' },
    { from: 'block-design', to: 'principles', path: 'down-left' },
    { from: 'increase-n', to: 'principles', path: 'down-left-long' },
    { from: 'principles', to: 'blinding' },
    { from: 'blinding', to: 'blind-yes', label: 'Yes', direction: 'left' },
    { from: 'blinding', to: 'blind-no', label: 'No', direction: 'right' }
];

// State
let selectedNode = null;
let hoveredNode = null;

// Node dimensions
let processWidth = 100;
let processHeight = 45;
let decisionSize = 65;
let terminalWidth = 100;
let terminalHeight = 40;

// Button
let exampleButtonX;
let buttonWidth = 120;
let buttonHeight = 28;
let showExample = false;

// Colors
let processColor = '#2E7D32';
let decisionColor = '#B5651D';
let terminalColor = '#8B7355';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    describe('Interactive flowchart guiding students through the decision-making process when designing an experiment.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    fill(252, 252, 255);
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
    text('Experiment Planning Flowchart', canvasWidth / 2, 5);
    textStyle(NORMAL);

    // Draw connections first
    drawConnections();

    // Draw nodes
    drawNodes();

    // Draw details panel
    if (selectedNode || hoveredNode) {
        drawDetailsPanel();
    }

    // Draw controls
    drawControls();
}

function drawConnections() {
    for (let conn of connections) {
        let fromNode = nodes.find(n => n.id === conn.from);
        let toNode = nodes.find(n => n.id === conn.to);

        if (!fromNode || !toNode) continue;

        // Calculate connection points
        let startX, startY, endX, endY;

        if (conn.direction === 'left') {
            startX = fromNode.x - getNodeWidth(fromNode) / 2;
            startY = fromNode.y;
            endX = toNode.x + getNodeWidth(toNode) / 2;
            endY = toNode.y;
        } else if (conn.direction === 'right') {
            startX = fromNode.x + getNodeWidth(fromNode) / 2;
            startY = fromNode.y;
            endX = toNode.x - getNodeWidth(toNode) / 2;
            endY = toNode.y;
        } else if (conn.path === 'down-right') {
            startX = fromNode.x;
            startY = fromNode.y + getNodeHeight(fromNode) / 2;
            endX = toNode.x - getNodeWidth(toNode) / 2;
            endY = toNode.y;
        } else if (conn.path === 'down-left') {
            startX = fromNode.x;
            startY = fromNode.y + getNodeHeight(fromNode) / 2;
            endX = toNode.x + getNodeWidth(toNode) / 2;
            endY = toNode.y;
        } else if (conn.path === 'down-left-long') {
            startX = fromNode.x;
            startY = fromNode.y + getNodeHeight(fromNode) / 2;
            endX = toNode.x + getNodeWidth(toNode) / 2;
            endY = toNode.y;
        } else {
            startX = fromNode.x;
            startY = fromNode.y + getNodeHeight(fromNode) / 2;
            endX = toNode.x;
            endY = toNode.y - getNodeHeight(toNode) / 2;
        }

        // Draw line
        stroke(150);
        strokeWeight(2);

        if (conn.path) {
            // Draw bent line
            let midY = (startY + endY) / 2;
            line(startX, startY, startX, midY);
            line(startX, midY, endX, midY);
            line(endX, midY, endX, endY);

            // Arrowhead
            drawArrowhead(endX, endY, conn.path.includes('left') ? 'left' : 'right');
        } else if (conn.direction) {
            // Horizontal line
            line(startX, startY, endX, endY);
            drawArrowhead(endX, endY, conn.direction);
        } else {
            // Vertical line
            line(startX, startY, endX, endY);
            drawArrowhead(endX, endY, 'down');
        }

        // Draw label
        if (conn.label) {
            fill(255);
            noStroke();
            let labelX = (startX + endX) / 2;
            let labelY = (startY + endY) / 2;

            if (conn.direction) {
                labelY -= 10;
            }

            rect(labelX - 12, labelY - 8, 24, 16, 3);
            fill(conn.label === 'Yes' ? '#2E7D32' : '#D32F2F');
            textAlign(CENTER, CENTER);
            textSize(10);
            textStyle(BOLD);
            text(conn.label, labelX, labelY);
            textStyle(NORMAL);
        }
    }
}

function drawArrowhead(x, y, direction) {
    let size = 8;
    fill(150);
    noStroke();

    if (direction === 'down') {
        triangle(x, y, x - size / 2, y - size, x + size / 2, y - size);
    } else if (direction === 'left') {
        triangle(x, y, x + size, y - size / 2, x + size, y + size / 2);
    } else if (direction === 'right') {
        triangle(x, y, x - size, y - size / 2, x - size, y + size / 2);
    }
}

function drawNodes() {
    for (let node of nodes) {
        let isSelected = (selectedNode === node);
        let isHovered = (hoveredNode === node);

        // Draw node based on type
        if (node.type === 'terminal') {
            drawTerminal(node, isSelected, isHovered);
        } else if (node.type === 'decision') {
            drawDecision(node, isSelected, isHovered);
        } else if (node.type === 'process') {
            drawProcess(node, isSelected, isHovered);
        }
    }
}

function drawTerminal(node, isSelected, isHovered) {
    let w = terminalWidth;
    let h = terminalHeight;

    if (isSelected) {
        fill(color(terminalColor));
        stroke(60);
        strokeWeight(3);
    } else if (isHovered) {
        fill(color(terminalColor + 'DD'));
        stroke(60);
        strokeWeight(2);
    } else {
        fill(terminalColor);
        stroke(80);
        strokeWeight(1);
    }

    rect(node.x - w / 2, node.y - h / 2, w, h, h / 2);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text(node.text, node.x, node.y);
    textStyle(NORMAL);
}

function drawDecision(node, isSelected, isHovered) {
    let s = decisionSize;

    if (isSelected) {
        fill(color(decisionColor));
        stroke(139, 69, 19);
        strokeWeight(3);
    } else if (isHovered) {
        fill(color(decisionColor + 'DD'));
        stroke(139, 69, 19);
        strokeWeight(2);
    } else {
        fill(decisionColor);
        stroke(139, 69, 19);
        strokeWeight(1);
    }

    // Diamond shape
    beginShape();
    vertex(node.x, node.y - s / 2);
    vertex(node.x + s / 2, node.y);
    vertex(node.x, node.y + s / 2);
    vertex(node.x - s / 2, node.y);
    endShape(CLOSE);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(9);
    text(node.text, node.x, node.y);
}

function drawProcess(node, isSelected, isHovered) {
    let w = processWidth;
    let h = processHeight;

    if (isSelected) {
        fill(color(processColor));
        stroke(27, 94, 32);
        strokeWeight(3);
    } else if (isHovered) {
        fill(color(processColor + 'DD'));
        stroke(27, 94, 32);
        strokeWeight(2);
    } else {
        fill(processColor);
        stroke(27, 94, 32);
        strokeWeight(1);
    }

    rect(node.x - w / 2, node.y - h / 2, w, h, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text(node.text, node.x, node.y);
    textStyle(NORMAL);
}

function getNodeWidth(node) {
    if (node.type === 'terminal') return terminalWidth;
    if (node.type === 'decision') return decisionSize;
    return processWidth;
}

function getNodeHeight(node) {
    if (node.type === 'terminal') return terminalHeight;
    if (node.type === 'decision') return decisionSize;
    return processHeight;
}

function drawDetailsPanel() {
    let node = selectedNode || hoveredNode;
    if (!node) return;

    let panelWidth = 200;
    let panelHeight = 80;
    let panelX = min(node.x + 60, canvasWidth - panelWidth - 10);
    let panelY = min(node.y - panelHeight / 2, drawHeight - panelHeight - 10);

    if (panelX < 10) panelX = 10;
    if (panelY < 10) panelY = 10;

    fill(255, 255, 255, 250);
    stroke(100);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    fill(30);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(10);
    textStyle(BOLD);

    let title = node.text.replace('\n', ' ');
    text(title, panelX + 8, panelY + 8);
    textStyle(NORMAL);

    textSize(9);
    fill(60);
    text(node.details, panelX + 8, panelY + 25, panelWidth - 16, panelHeight - 35);
}

function drawControls() {
    exampleButtonX = canvasWidth / 2 - buttonWidth / 2;
    let buttonY = drawHeight + 11;

    // Example button
    if (showExample) {
        fill(181, 101, 29);
        stroke(139, 69, 19);
    } else {
        fill(100, 130, 180);
        stroke(70, 100, 150);
    }
    strokeWeight(1);
    rect(exampleButtonX, buttonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(showExample ? 'Hide Example' : 'Show Example Path', exampleButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);

    // Legend
    let legendX = margin;
    fill(80);
    textSize(10);
    textAlign(LEFT, CENTER);

    // Terminal
    fill(terminalColor);
    noStroke();
    rect(legendX, buttonY + 5, 18, 18, 9);
    fill(80);
    text('Start/End', legendX + 25, buttonY + buttonHeight / 2);

    // Decision
    legendX += 80;
    fill(decisionColor);
    beginShape();
    vertex(legendX + 9, buttonY + 2);
    vertex(legendX + 18, buttonY + 14);
    vertex(legendX + 9, buttonY + 26);
    vertex(legendX, buttonY + 14);
    endShape(CLOSE);
    fill(80);
    text('Decision', legendX + 25, buttonY + buttonHeight / 2);

    // Process
    legendX += 80;
    fill(processColor);
    rect(legendX, buttonY + 5, 18, 18, 3);
    fill(80);
    text('Process', legendX + 25, buttonY + buttonHeight / 2);

    // Instructions
    textAlign(RIGHT, CENTER);
    fill(100);
    text('Click nodes for details', canvasWidth - margin, buttonY + buttonHeight / 2);
}

function getNodeAt(x, y) {
    for (let node of nodes) {
        let w = getNodeWidth(node);
        let h = getNodeHeight(node);

        if (node.type === 'decision') {
            // Diamond hit detection
            let dx = abs(x - node.x);
            let dy = abs(y - node.y);
            if (dx / (w / 2) + dy / (h / 2) <= 1) {
                return node;
            }
        } else {
            // Rectangle hit detection
            if (x >= node.x - w / 2 && x <= node.x + w / 2 &&
                y >= node.y - h / 2 && y <= node.y + h / 2) {
                return node;
            }
        }
    }
    return null;
}

function mouseMoved() {
    hoveredNode = getNodeAt(mouseX, mouseY);
}

function mousePressed() {
    let node = getNodeAt(mouseX, mouseY);
    if (node) {
        selectedNode = (selectedNode === node) ? null : node;
        return;
    }

    // Check example button
    let buttonY = drawHeight + 11;
    if (mouseX >= exampleButtonX && mouseX <= exampleButtonX + buttonWidth &&
        mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
        showExample = !showExample;
        // If showing example, select a path
        if (showExample) {
            selectedNode = nodes.find(n => n.id === 'start');
        } else {
            selectedNode = null;
        }
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

    // Adjust node positions proportionally
    let scale = canvasWidth / 700;
    for (let node of nodes) {
        // Re-center horizontally
        if (node.id === 'start' || node.id === 'variability' || node.id === 'measure' ||
            node.id === 'two-treatments' || node.id === 'principles' || node.id === 'blinding') {
            node.x = canvasWidth / 2;
        } else if (node.id === 'cr-design' || node.id === 'matched-pairs' || node.id === 'blind-yes') {
            node.x = canvasWidth * 0.22;
        } else if (node.id === 'increase-n' || node.id === 'block-design' || node.id === 'blind-no') {
            node.x = canvasWidth * 0.78;
        }
    }
}
