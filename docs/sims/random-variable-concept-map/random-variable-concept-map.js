// Random Variable Concept Map MicroSim
// Interactive concept map showing relationships between random variable concepts
// Uses vis-network for force-directed graph layout
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 750;
let canvasHeight = 500;

// Node positions (pre-calculated for good layout)
let nodes = [
    { id: 0, label: 'Random\nVariable', x: 375, y: 60, group: 'core', def: 'A variable whose value is determined by the outcome of a random process' },
    { id: 1, label: 'Discrete\nRV', x: 180, y: 150, group: 'core', def: 'A random variable that takes on a countable number of values' },
    { id: 2, label: 'Probability\nDistribution', x: 570, y: 150, group: 'core', def: 'A complete description of all possible values and their probabilities' },
    { id: 3, label: 'Valid\nDistribution', x: 680, y: 230, group: 'formula', def: 'Probabilities must be 0-1 and sum to 1' },
    { id: 4, label: 'Expected\nValue E(X)', x: 375, y: 200, group: 'core', def: 'The long-run average value: E(X) = Sum of x * P(X=x)' },
    { id: 5, label: 'Variance\nVar(X)', x: 280, y: 280, group: 'formula', def: 'Average squared distance from mean: Var(X) = E(X²) - [E(X)]²' },
    { id: 6, label: 'Standard\nDeviation', x: 180, y: 360, group: 'formula', def: 'Square root of variance: SD(X) = sqrt(Var(X))' },
    { id: 7, label: 'Linear\nTransform', x: 470, y: 280, group: 'formula', def: 'Y = a + bX: E(Y) = a + bE(X), SD(Y) = |b|SD(X)' },
    { id: 8, label: 'Combining\nRVs', x: 375, y: 360, group: 'formula', def: 'For independent X,Y: Var(X±Y) = Var(X) + Var(Y)' },
    { id: 9, label: 'Binomial\nDistribution', x: 100, y: 450, group: 'dist', def: 'Count successes in n trials: X ~ Binomial(n,p)' },
    { id: 10, label: 'Geometric\nDistribution', x: 280, y: 450, group: 'dist', def: 'Trials until first success: X ~ Geometric(p)' },
    { id: 11, label: 'Binomial\nFormula', x: 100, y: 350, group: 'formula', def: 'P(X=k) = C(n,k) * p^k * (1-p)^(n-k)' },
    { id: 12, label: 'Binomial\nMean/SD', x: 30, y: 400, group: 'formula', def: 'Mean = np, SD = sqrt(np(1-p))' },
    { id: 13, label: 'Geometric\nMean', x: 360, y: 450, group: 'formula', def: 'Mean = 1/p' }
];

// Edges connecting nodes
let edges = [
    { from: 0, to: 1, label: 'is a type of' },
    { from: 0, to: 2, label: 'has a' },
    { from: 2, to: 3, label: 'must be' },
    { from: 0, to: 4, label: 'summarized by' },
    { from: 4, to: 5, label: 'spread by' },
    { from: 5, to: 6, label: 'sqrt gives' },
    { from: 4, to: 7, label: 'changes via' },
    { from: 5, to: 8, label: 'combines via' },
    { from: 1, to: 9, label: 'special case' },
    { from: 1, to: 10, label: 'special case' },
    { from: 9, to: 11, label: 'calculated by' },
    { from: 9, to: 12, label: 'has' },
    { from: 10, to: 13, label: 'has' }
];

// State
let hoveredNode = -1;
let selectedNode = -1;
let draggingNode = -1;
let offsetX = 0, offsetY = 0;

// Colors
let sylviaGreen = '#2E7D32';
let sylviaGreenDark = '#1B5E20';
let sylviaGreenLight = '#4CAF50';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';
let sylviaHazel = '#8B7355';

let groupColors = {
    'core': '#2E7D32',      // Sylvia green
    'formula': '#B5651D',   // Auburn
    'dist': '#8B7355'       // Hazel
};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textFont('Arial');

    // Scale node positions to canvas
    scaleNodesToCanvas();

    describe('Interactive concept map showing relationships between random variable concepts including probability distributions, expected value, variance, binomial and geometric distributions.', LABEL);
}

function scaleNodesToCanvas() {
    let scaleX = canvasWidth / 750;
    let scaleY = canvasHeight / 500;
    for (let node of nodes) {
        node.x = node.x * scaleX;
        node.y = node.y * scaleY;
    }
}

function draw() {
    updateCanvasSize();

    // Background
    background(250, 252, 255);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Random Variable Concept Map', canvasWidth / 2, 8);

    // Draw edges first (behind nodes)
    drawEdges();

    // Draw nodes
    drawNodes();

    // Draw info panel if node selected
    if (selectedNode >= 0) {
        drawInfoPanel();
    }

    // Legend
    drawLegend();
}

function drawEdges() {
    for (let edge of edges) {
        let fromNode = nodes[edge.from];
        let toNode = nodes[edge.to];

        // Draw edge line
        stroke(180);
        strokeWeight(1.5);
        line(fromNode.x, fromNode.y, toNode.x, toNode.y);

        // Draw edge label at midpoint
        let midX = (fromNode.x + toNode.x) / 2;
        let midY = (fromNode.y + toNode.y) / 2;

        // Only show label if not too crowded
        fill(120);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(8);

        // Offset label slightly perpendicular to edge
        let dx = toNode.x - fromNode.x;
        let dy = toNode.y - fromNode.y;
        let len = sqrt(dx * dx + dy * dy);
        if (len > 0) {
            let perpX = -dy / len * 8;
            let perpY = dx / len * 8;
            text(edge.label, midX + perpX, midY + perpY);
        }
    }
}

function drawNodes() {
    hoveredNode = -1;

    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        let nodeWidth = 70;
        let nodeHeight = 45;

        // Check hover
        let isHovered = mouseX >= node.x - nodeWidth / 2 &&
                        mouseX <= node.x + nodeWidth / 2 &&
                        mouseY >= node.y - nodeHeight / 2 &&
                        mouseY <= node.y + nodeHeight / 2;

        if (isHovered) hoveredNode = i;

        let isSelected = selectedNode === i;
        let isDragging = draggingNode === i;

        // Node background
        let col = groupColors[node.group];
        if (isSelected || isDragging) {
            fill(col);
        } else if (isHovered) {
            // Lighter version
            fill(red(color(col)) + 40, green(color(col)) + 40, blue(color(col)) + 40);
        } else {
            fill(col);
        }

        stroke(isSelected ? 'black' : 50);
        strokeWeight(isSelected ? 3 : 1.5);
        rectMode(CENTER);
        rect(node.x, node.y, nodeWidth, nodeHeight, 8);

        // Node label
        fill('white');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);

        // Split label by newline
        let lines = node.label.split('\n');
        let lineHeight = 12;
        let startY = node.y - (lines.length - 1) * lineHeight / 2;

        for (let j = 0; j < lines.length; j++) {
            text(lines[j], node.x, startY + j * lineHeight);
        }
    }

    // Change cursor if hovering
    if (hoveredNode >= 0) {
        cursor('pointer');
    } else {
        cursor(ARROW);
    }
}

function drawInfoPanel() {
    let node = nodes[selectedNode];
    let panelWidth = 250;
    let panelHeight = 80;
    let panelX = canvasWidth - panelWidth - 15;
    let panelY = 35;

    fill(255, 255, 255, 245);
    stroke(groupColors[node.group]);
    strokeWeight(2);
    rect(panelX, panelY, panelWidth, panelHeight, 8);

    // Title
    fill(groupColors[node.group]);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    text(node.label.replace('\n', ' '), panelX + 10, panelY + 8);

    // Definition
    fill('black');
    textSize(11);
    let def = node.def;

    // Word wrap
    let words = def.split(' ');
    let line = '';
    let y = panelY + 28;
    let maxWidth = panelWidth - 20;

    for (let word of words) {
        let testLine = line + word + ' ';
        if (textWidth(testLine) > maxWidth) {
            text(line, panelX + 10, y);
            line = word + ' ';
            y += 14;
        } else {
            line = testLine;
        }
    }
    text(line, panelX + 10, y);

    // Close hint
    fill(120);
    textSize(9);
    text('Click elsewhere to close', panelX + 10, panelY + panelHeight - 14);
}

function drawLegend() {
    let legendX = 15;
    let legendY = canvasHeight - 70;
    let boxSize = 14;
    let spacing = 70;

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Legend:', legendX, legendY);

    legendY += 20;

    // Core concepts
    fill(groupColors['core']);
    noStroke();
    rect(legendX, legendY - boxSize / 2, boxSize, boxSize, 3);
    fill('black');
    text('Core Concepts', legendX + boxSize + 5, legendY);

    // Formulas
    fill(groupColors['formula']);
    noStroke();
    rect(legendX + 100, legendY - boxSize / 2, boxSize, boxSize, 3);
    fill('black');
    text('Formulas', legendX + 100 + boxSize + 5, legendY);

    // Distributions
    fill(groupColors['dist']);
    noStroke();
    rect(legendX + 180, legendY - boxSize / 2, boxSize, boxSize, 3);
    fill('black');
    text('Distributions', legendX + 180 + boxSize + 5, legendY);

    // Instructions
    fill(100);
    textSize(9);
    text('Click a node to see its definition. Drag to rearrange.', legendX, legendY + 22);
}

function mousePressed() {
    // Check if clicking on a node
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        let nodeWidth = 70;
        let nodeHeight = 45;

        if (mouseX >= node.x - nodeWidth / 2 &&
            mouseX <= node.x + nodeWidth / 2 &&
            mouseY >= node.y - nodeHeight / 2 &&
            mouseY <= node.y + nodeHeight / 2) {

            if (selectedNode === i) {
                // Clicking same node - start dragging
                draggingNode = i;
                offsetX = node.x - mouseX;
                offsetY = node.y - mouseY;
            } else {
                // Select this node
                selectedNode = i;
            }
            return;
        }
    }

    // Clicked elsewhere - deselect
    selectedNode = -1;
}

function mouseDragged() {
    if (draggingNode >= 0) {
        nodes[draggingNode].x = mouseX + offsetX;
        nodes[draggingNode].y = mouseY + offsetY;

        // Keep in bounds
        nodes[draggingNode].x = constrain(nodes[draggingNode].x, 40, canvasWidth - 40);
        nodes[draggingNode].y = constrain(nodes[draggingNode].y, 40, canvasHeight - 40);
    }
}

function mouseReleased() {
    draggingNode = -1;
}

function windowResized() {
    let oldWidth = canvasWidth;
    let oldHeight = canvasHeight;

    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    // Scale node positions
    let scaleX = canvasWidth / oldWidth;
    let scaleY = canvasHeight / oldHeight;

    for (let node of nodes) {
        node.x *= scaleX;
        node.y *= scaleY;
    }
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
