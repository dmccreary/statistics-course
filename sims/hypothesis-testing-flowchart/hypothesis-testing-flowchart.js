// Hypothesis Testing Decision Flowchart MicroSim
// Interactive workflow for hypothesis testing procedure
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 800;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let margin = 20;
let defaultTextSize = 16;

// Workflow state
let currentStep = 0;
let selectedPath = null; // 'reject' or 'fail'

// Example scenario
let scenario = {
    context: 'A company claims 75% of orders arrive on time. A sample of 400 orders shows 288 arrived on time.',
    n: 400,
    x: 288,
    p0: 0.75,
    pHat: 0.72,
    se: 0.0217,
    z: -1.38,
    pValue: 0.168,
    alpha: 0.05
};

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaGreenLight = '#4CAF50';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';

// Flowchart nodes
let nodes = [];
let connections = [];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);
    initializeFlowchart();

    describe('Interactive hypothesis testing decision flowchart with step-by-step guidance', LABEL);
}

function initializeFlowchart() {
    let centerX = canvasWidth / 2;

    nodes = [
        {
            id: 0,
            type: 'start',
            label: 'State Hypotheses',
            detail: 'H0: p = 0.75\nHa: p ≠ 0.75',
            x: centerX,
            y: 55,
            w: 160,
            h: 50
        },
        {
            id: 1,
            type: 'process',
            label: 'Check Conditions',
            detail: 'Random sample? ✓\nnp0 = 300 ≥ 10 ✓\nn(1-p0) = 100 ≥ 10 ✓',
            x: centerX,
            y: 130,
            w: 160,
            h: 50
        },
        {
            id: 2,
            type: 'decision',
            label: 'Conditions Met?',
            detail: 'All three conditions must be satisfied to proceed',
            x: centerX,
            y: 205,
            w: 140,
            h: 60
        },
        {
            id: 3,
            type: 'process',
            label: 'Calculate Test Statistic',
            detail: 'z = (0.72 - 0.75) / 0.0217\nz = -1.38',
            x: centerX,
            y: 290,
            w: 180,
            h: 50
        },
        {
            id: 4,
            type: 'process',
            label: 'Find P-Value',
            detail: 'Two-sided: p-value = 0.168',
            x: centerX,
            y: 365,
            w: 150,
            h: 50
        },
        {
            id: 5,
            type: 'decision',
            label: 'p-value < α?',
            detail: 'Compare p-value (0.168) to α (0.05)',
            x: centerX,
            y: 440,
            w: 130,
            h: 60
        },
        {
            id: 6,
            type: 'result-reject',
            label: 'Reject H0',
            detail: 'Statistically significant evidence for Ha',
            x: centerX - 140,
            y: 520,
            w: 120,
            h: 45
        },
        {
            id: 7,
            type: 'result-fail',
            label: 'Fail to Reject H0',
            detail: 'Insufficient evidence for Ha',
            x: centerX + 140,
            y: 520,
            w: 150,
            h: 45
        }
    ];

    connections = [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3, label: 'Yes' },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
        { from: 5, to: 6, label: 'Yes' },
        { from: 5, to: 7, label: 'No' }
    ];

    // Calculate path based on scenario
    selectedPath = scenario.pValue < scenario.alpha ? 'reject' : 'fail';
}

function draw() {
    updateCanvasSize();
    initializeFlowchart(); // Recalculate positions

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
    text('Hypothesis Testing Decision Flowchart', canvasWidth / 2, 8);

    // Draw flowchart
    drawConnections();
    drawNodes();
    drawInfoPanel();
    drawControls();
}

function drawConnections() {
    strokeWeight(2);

    for (let conn of connections) {
        let fromNode = nodes[conn.from];
        let toNode = nodes[conn.to];

        // Determine if this connection is on the active path
        let isActive = false;
        if (currentStep > conn.from) {
            if (conn.to === 6 && selectedPath === 'reject') isActive = true;
            else if (conn.to === 7 && selectedPath === 'fail') isActive = true;
            else if (conn.to !== 6 && conn.to !== 7) isActive = true;
        }

        stroke(isActive ? sylviaGreen : '#ccc');

        let startY = fromNode.y + fromNode.h / 2;
        let endY = toNode.y - toNode.h / 2;

        // Draw arrow
        if (conn.to === 6) {
            // Left branch
            line(fromNode.x, startY, fromNode.x, startY + 20);
            line(fromNode.x, startY + 20, toNode.x, startY + 20);
            line(toNode.x, startY + 20, toNode.x, endY);
            drawArrowhead(toNode.x, endY, 'down', isActive);
        } else if (conn.to === 7) {
            // Right branch
            line(fromNode.x, startY, fromNode.x, startY + 20);
            line(fromNode.x, startY + 20, toNode.x, startY + 20);
            line(toNode.x, startY + 20, toNode.x, endY);
            drawArrowhead(toNode.x, endY, 'down', isActive);
        } else {
            // Straight down
            line(fromNode.x, startY, toNode.x, endY);
            drawArrowhead(toNode.x, endY, 'down', isActive);
        }

        // Connection label
        if (conn.label) {
            fill(isActive ? sylviaGreen : '#999');
            noStroke();
            textSize(10);
            textAlign(CENTER, CENTER);
            if (conn.to === 6) {
                text(conn.label, fromNode.x - 50, startY + 10);
            } else if (conn.to === 7) {
                text(conn.label, fromNode.x + 50, startY + 10);
            } else {
                text(conn.label, fromNode.x + 25, (startY + endY) / 2);
            }
        }
    }
}

function drawArrowhead(x, y, direction, isActive) {
    fill(isActive ? sylviaGreen : '#ccc');
    noStroke();
    if (direction === 'down') {
        triangle(x - 6, y - 8, x + 6, y - 8, x, y);
    }
}

function drawNodes() {
    for (let node of nodes) {
        let isActive = currentStep >= node.id;
        let isCurrentStep = currentStep === node.id;

        // Node styling based on type
        if (node.type === 'start') {
            drawRoundedRect(node, isActive, isCurrentStep, sylviaGreen);
        } else if (node.type === 'process') {
            drawProcessRect(node, isActive, isCurrentStep, '#2196F3');
        } else if (node.type === 'decision') {
            drawDiamond(node, isActive, isCurrentStep, '#FFC107');
        } else if (node.type === 'result-reject') {
            let show = selectedPath === 'reject' && currentStep >= node.id;
            drawResultRect(node, show, isCurrentStep, sylviaGreen);
        } else if (node.type === 'result-fail') {
            let show = selectedPath === 'fail' && currentStep >= node.id;
            drawResultRect(node, show, isCurrentStep, '#FF9800');
        }
    }
}

function drawRoundedRect(node, isActive, isCurrent, color) {
    stroke(isActive ? color : '#ccc');
    strokeWeight(isCurrent ? 4 : 2);
    fill(isActive ? color : '#f5f5f5');
    rect(node.x - node.w/2, node.y - node.h/2, node.w, node.h, 25);

    fill(isActive ? 'white' : '#999');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(node.label, node.x, node.y);
}

function drawProcessRect(node, isActive, isCurrent, color) {
    stroke(isActive ? color : '#ccc');
    strokeWeight(isCurrent ? 4 : 2);
    fill(isActive ? '#e3f2fd' : '#f5f5f5');
    rect(node.x - node.w/2, node.y - node.h/2, node.w, node.h, 5);

    fill(isActive ? '#1565C0' : '#999');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(node.label, node.x, node.y);
}

function drawDiamond(node, isActive, isCurrent, color) {
    stroke(isActive ? color : '#ccc');
    strokeWeight(isCurrent ? 4 : 2);
    fill(isActive ? '#fff8e1' : '#f5f5f5');

    push();
    translate(node.x, node.y);
    beginShape();
    vertex(0, -node.h/2);
    vertex(node.w/2, 0);
    vertex(0, node.h/2);
    vertex(-node.w/2, 0);
    endShape(CLOSE);
    pop();

    fill(isActive ? '#F57F17' : '#999');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(node.label, node.x, node.y);
}

function drawResultRect(node, isActive, isCurrent, color) {
    stroke(isActive ? color : '#ccc');
    strokeWeight(isCurrent ? 4 : 2);
    fill(isActive ? color : '#f5f5f5');
    rect(node.x - node.w/2, node.y - node.h/2, node.w, node.h, 8);

    fill(isActive ? 'white' : '#999');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(node.label, node.x, node.y);
}

function drawInfoPanel() {
    let panelX = canvasWidth - 220;
    let panelY = 50;
    let panelW = 200;
    let panelH = 250;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(panelX, panelY, panelW, panelH, 8);

    // Current step info
    if (currentStep < nodes.length) {
        let node = nodes[Math.min(currentStep, nodes.length - 1)];

        fill('black');
        noStroke();
        textAlign(CENTER, TOP);
        textSize(13);
        text('Step ' + (currentStep + 1) + ' of 8', panelX + panelW/2, panelY + 10);

        textSize(14);
        fill(sylviaGreen);
        text(node.label, panelX + panelW/2, panelY + 35);

        // Detail text
        fill(80);
        textSize(11);
        textAlign(LEFT, TOP);
        let lines = node.detail.split('\n');
        for (let i = 0; i < lines.length; i++) {
            text(lines[i], panelX + 15, panelY + 65 + i * 18);
        }

        // Hover tip
        fill(sylviaAuburn);
        textSize(10);
        textAlign(CENTER, TOP);
        text('(Hover nodes for details)', panelX + panelW/2, panelY + panelH - 60);
    }

    // Example scenario summary
    textAlign(LEFT, TOP);
    fill(100);
    textSize(9);
    text('Example Scenario:', panelX + 10, panelY + panelH - 45);
    text('n=400, x=288, p0=0.75', panelX + 10, panelY + panelH - 30);
    text('p-hat=0.72, z=-1.38, p=0.168', panelX + 10, panelY + panelH - 15);
}

function drawControls() {
    let y = drawHeight + 12;

    // Step navigation
    let prevX = 20;
    let nextX = 110;
    let resetX = canvasWidth - 70;

    // Previous button
    fill(currentStep > 0 ? sylviaGreen : '#ccc');
    noStroke();
    rect(prevX, y, 75, 28, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(12);
    text('< Previous', prevX + 37, y + 14);

    // Next button
    fill(currentStep < 7 ? sylviaGreen : '#ccc');
    rect(nextX, y, 75, 28, 4);
    fill('white');
    text('Next >', nextX + 37, y + 14);

    // Step indicator
    fill(80);
    textSize(11);
    text('Step ' + (currentStep + 1) + ' / 8', 210, y + 14);

    // Quick jump buttons
    let jumpX = 280;
    fill(sylviaAuburn);
    rect(jumpX, y, 80, 28, 4);
    fill('white');
    text('Skip to End', jumpX + 40, y + 14);

    // New scenario toggle
    let scenX = 380;
    fill('#666');
    rect(scenX, y, 100, 28, 4);
    fill('white');
    text('New Example', scenX + 50, y + 14);

    // Reset button
    fill('#666');
    rect(resetX, y, 55, 28, 4);
    fill('white');
    text('Reset', resetX + 27, y + 14);

    // Store bounds
    this.prevBounds = { x: prevX, y: y, w: 75, h: 28 };
    this.nextBounds = { x: nextX, y: y, w: 75, h: 28 };
    this.skipBounds = { x: jumpX, y: y, w: 80, h: 28 };
    this.scenarioBounds = { x: scenX, y: y, w: 100, h: 28 };
    this.resetBounds = { x: resetX, y: y, w: 55, h: 28 };
}

function mousePressed() {
    // Navigation buttons
    if (isInBounds(mouseX, mouseY, this.prevBounds) && currentStep > 0) {
        currentStep--;
        return;
    }

    if (isInBounds(mouseX, mouseY, this.nextBounds) && currentStep < 7) {
        currentStep++;
        return;
    }

    if (isInBounds(mouseX, mouseY, this.skipBounds)) {
        currentStep = 7;
        return;
    }

    if (isInBounds(mouseX, mouseY, this.scenarioBounds)) {
        // Generate new random scenario
        generateNewScenario();
        currentStep = 0;
        return;
    }

    if (isInBounds(mouseX, mouseY, this.resetBounds)) {
        currentStep = 0;
        scenario = {
            context: 'A company claims 75% of orders arrive on time. A sample of 400 orders shows 288 arrived on time.',
            n: 400,
            x: 288,
            p0: 0.75,
            pHat: 0.72,
            se: 0.0217,
            z: -1.38,
            pValue: 0.168,
            alpha: 0.05
        };
        selectedPath = 'fail';
        initializeFlowchart();
        return;
    }

    // Click on nodes to jump to that step
    for (let node of nodes) {
        if (mouseX >= node.x - node.w/2 && mouseX <= node.x + node.w/2 &&
            mouseY >= node.y - node.h/2 && mouseY <= node.y + node.h/2) {
            currentStep = node.id;
            return;
        }
    }
}

function generateNewScenario() {
    let scenarios = [
        { n: 500, x: 275, p0: 0.50, context: 'Testing if a coin is fair with 500 flips' },
        { n: 200, x: 50, p0: 0.20, context: 'Testing if defect rate differs from 20%' },
        { n: 1000, x: 520, p0: 0.50, context: 'Testing if more than half prefer Brand A' },
        { n: 300, x: 240, p0: 0.75, context: 'Testing if satisfaction rate is 75%' }
    ];

    let s = scenarios[Math.floor(Math.random() * scenarios.length)];
    scenario.n = s.n;
    scenario.x = s.x;
    scenario.p0 = s.p0;
    scenario.context = s.context;
    scenario.pHat = s.x / s.n;
    scenario.se = Math.sqrt((s.p0 * (1 - s.p0)) / s.n);
    scenario.z = (scenario.pHat - s.p0) / scenario.se;
    scenario.pValue = 2 * (1 - normalCDF(Math.abs(scenario.z)));
    selectedPath = scenario.pValue < scenario.alpha ? 'reject' : 'fail';

    initializeFlowchart();
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

function isInBounds(x, y, bounds) {
    return bounds && x >= bounds.x && x <= bounds.x + bounds.w &&
           y >= bounds.y && y <= bounds.y + bounds.h;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    initializeFlowchart();
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
