// Paired vs Independent Data Decision Flowchart MicroSim
// Interactive flowchart to help students choose the correct t-procedure
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 350;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 25;
let defaultTextSize = 14;

// Flowchart nodes
let nodes = [];
let currentNode = 0;
let hoveredNode = -1;
let quizMode = false;
let quizScenario = 0;
let userAnswer = null;
let showFeedback = false;

// Quiz scenarios
const scenarios = [
    {
        text: "Compare test scores of Ms. Smith's class vs Mr. Jones's class",
        answer: "independent",
        explanation: "Different students in each class - no natural pairing between individuals."
    },
    {
        text: "Measure students' anxiety before and after a relaxation exercise",
        answer: "paired",
        explanation: "Same students measured at two time points - paired by individual."
    },
    {
        text: "Compare reaction times of athletes vs. non-athletes",
        answer: "independent",
        explanation: "Two separate groups of people with no connection between them."
    },
    {
        text: "Twin study: compare blood pressure of twin A vs twin B",
        answer: "paired",
        explanation: "Twins are naturally paired - each pair shares genetic factors."
    },
    {
        text: "Compare fuel efficiency of cars using regular vs. premium gas (same cars tested with both)",
        answer: "paired",
        explanation: "Same cars tested under both conditions - paired by vehicle."
    },
    {
        text: "Compare heights of basketball players vs. soccer players",
        answer: "independent",
        explanation: "Different individuals in each group with no natural connection."
    },
    {
        text: "Compare typing speed on keyboards: each person tests keyboard A then keyboard B",
        answer: "paired",
        explanation: "Same people test both keyboards - differences control for individual skill."
    },
    {
        text: "Compare customer satisfaction at Store A vs Store B (different customers)",
        answer: "independent",
        explanation: "Different customers at each store - no pairing between respondents."
    }
];

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    initializeNodes();

    describe('Interactive decision flowchart helping students determine whether to use paired or independent samples t-procedures, with practice scenarios', LABEL);
}

function initializeNodes() {
    // Define flowchart nodes
    let centerX = canvasWidth / 2;

    nodes = [
        {
            id: 0,
            type: 'start',
            text: 'Comparing\ntwo groups?',
            x: centerX,
            y: 45,
            width: 120,
            height: 50,
            next: { yes: 1, no: null }
        },
        {
            id: 1,
            type: 'decision',
            text: 'Same individuals\nmeasured twice?',
            x: centerX,
            y: 120,
            width: 140,
            height: 55,
            next: { yes: 4, no: 2 }
        },
        {
            id: 2,
            type: 'decision',
            text: 'Deliberately\nmatched pairs?',
            x: centerX,
            y: 195,
            width: 130,
            height: 55,
            next: { yes: 4, no: 3 }
        },
        {
            id: 3,
            type: 'decision',
            text: 'Natural 1-to-1\nconnection?',
            x: centerX,
            y: 270,
            width: 130,
            height: 55,
            next: { yes: 4, no: 5 }
        },
        {
            id: 4,
            type: 'result-paired',
            text: 'PAIRED DATA\nUse paired t-test',
            x: centerX + 140,
            y: 195,
            width: 140,
            height: 55,
            next: null
        },
        {
            id: 5,
            type: 'result-independent',
            text: 'INDEPENDENT\nUse two-sample t',
            x: centerX,
            y: 335,
            width: 140,
            height: 50,
            next: null
        }
    ];
}

function draw() {
    updateCanvasSize();
    initializeNodes(); // Recalculate positions for responsive layout

    // Drawing area background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    textStyle(BOLD);
    text('Paired vs. Independent Samples Decision Guide', canvasWidth / 2, 5);
    textStyle(NORMAL);

    if (quizMode) {
        drawQuizMode();
    } else {
        drawFlowchart();
    }

    drawControls();
}

function drawFlowchart() {
    // Draw connections first (behind nodes)
    drawConnections();

    // Draw nodes
    for (let i = 0; i < nodes.length; i++) {
        drawNode(nodes[i], i === hoveredNode);
    }

    // Draw legend
    drawLegend();

    // Draw Sylvia hint box
    drawSylviaHint();
}

function drawConnections() {
    stroke(150);
    strokeWeight(2);

    // Node 0 to 1 (Yes)
    let n0 = nodes[0];
    let n1 = nodes[1];
    line(n0.x, n0.y + n0.height / 2, n0.x, n1.y - n1.height / 2);

    // Node 1 to 2 (No)
    let n2 = nodes[2];
    line(n1.x, n1.y + n1.height / 2, n1.x, n2.y - n2.height / 2);

    // Node 1 to 4 (Yes - paired)
    let n4 = nodes[4];
    stroke(sylviaGreen);
    line(n1.x + n1.width / 2, n1.y, n4.x - n4.width / 2, n4.y);
    drawArrowHead(n4.x - n4.width / 2, n4.y, -1, 0);

    // Node 2 to 3 (No)
    stroke(150);
    let n3 = nodes[3];
    line(n2.x, n2.y + n2.height / 2, n2.x, n3.y - n3.height / 2);

    // Node 2 to 4 (Yes - paired)
    stroke(sylviaGreen);
    line(n2.x + n2.width / 2, n2.y, n4.x - n4.width / 2, n4.y);

    // Node 3 to 4 (Yes - paired)
    line(n3.x + n3.width / 2, n3.y - 10, n4.x, n4.y + n4.height / 2);
    drawArrowHead(n4.x, n4.y + n4.height / 2, 0, 1);

    // Node 3 to 5 (No - independent)
    stroke(sylviaAuburn);
    let n5 = nodes[5];
    line(n3.x, n3.y + n3.height / 2, n3.x, n5.y - n5.height / 2);
    drawArrowHead(n3.x, n5.y - n5.height / 2, 0, -1);

    // Add Yes/No labels
    textSize(10);
    noStroke();

    // Yes labels (green)
    fill(sylviaGreen);
    textAlign(LEFT, CENTER);
    text('Yes', n1.x + n1.width / 2 + 5, n1.y - 10);
    text('Yes', n2.x + n2.width / 2 + 5, n2.y - 10);
    text('Yes', n3.x + n3.width / 2 + 5, n3.y - 10);

    // No labels (orange)
    fill(sylviaAuburn);
    textAlign(CENTER, CENTER);
    text('No', n1.x - 12, (n1.y + n1.height / 2 + n2.y - n2.height / 2) / 2);
    text('No', n2.x - 12, (n2.y + n2.height / 2 + n3.y - n3.height / 2) / 2);
    text('No', n3.x - 12, (n3.y + n3.height / 2 + n5.y - n5.height / 2) / 2);
}

function drawArrowHead(x, y, dx, dy) {
    let size = 8;
    fill(150);
    noStroke();
    if (dx !== 0) {
        triangle(x, y, x + dx * size, y - size / 2, x + dx * size, y + size / 2);
    } else {
        triangle(x, y, x - size / 2, y + dy * size, x + size / 2, y + dy * size);
    }
}

function drawNode(node, isHovered) {
    let col;
    if (node.type === 'result-paired') {
        col = sylviaGreen;
    } else if (node.type === 'result-independent') {
        col = sylviaAuburn;
    } else if (node.type === 'start') {
        col = '#5C6BC0';
    } else {
        col = '#78909C';
    }

    // Draw shape
    if (node.type === 'start' || node.type.startsWith('decision')) {
        // Diamond for decisions
        fill(isHovered ? lightenColor(col) : col);
        stroke(isHovered ? '#333' : col);
        strokeWeight(isHovered ? 3 : 2);

        if (node.type.startsWith('decision')) {
            beginShape();
            vertex(node.x, node.y - node.height / 2);
            vertex(node.x + node.width / 2, node.y);
            vertex(node.x, node.y + node.height / 2);
            vertex(node.x - node.width / 2, node.y);
            endShape(CLOSE);
        } else {
            rect(node.x - node.width / 2, node.y - node.height / 2, node.width, node.height, 10);
        }
    } else {
        // Rectangle for results
        fill(isHovered ? lightenColor(col) : col);
        stroke(isHovered ? '#333' : col);
        strokeWeight(isHovered ? 3 : 2);
        rect(node.x - node.width / 2, node.y - node.height / 2, node.width, node.height, 8);
    }

    // Text
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(node.type.startsWith('result') ? BOLD : NORMAL);

    let lines = node.text.split('\n');
    let lineHeight = 13;
    let startY = node.y - (lines.length - 1) * lineHeight / 2;
    for (let i = 0; i < lines.length; i++) {
        text(lines[i], node.x, startY + i * lineHeight);
    }
    textStyle(NORMAL);
}

function lightenColor(col) {
    let c = color(col);
    return color(
        min(255, red(c) + 40),
        min(255, green(c) + 40),
        min(255, blue(c) + 40)
    );
}

function drawLegend() {
    let legendX = margin + 10;
    let legendY = 35;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(legendX, legendY, 130, 70, 5);

    fill(30);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(10);
    textStyle(BOLD);
    text('Result Types:', legendX + 8, legendY + 5);
    textStyle(NORMAL);

    // Paired indicator
    fill(sylviaGreen);
    rect(legendX + 10, legendY + 22, 12, 12, 2);
    fill(60);
    textSize(9);
    text('Paired (differences)', legendX + 28, legendY + 24);

    // Independent indicator
    fill(sylviaAuburn);
    rect(legendX + 10, legendY + 40, 12, 12, 2);
    fill(60);
    text('Independent (2-sample)', legendX + 28, legendY + 42);

    textSize(8);
    fill(100);
    text('Hover nodes for examples', legendX + 8, legendY + 58);
}

function drawSylviaHint() {
    let hintX = canvasWidth - margin - 180;
    let hintY = 35;

    fill(sylviaCream);
    stroke(sylviaAuburn);
    strokeWeight(2);
    rect(hintX, hintY, 175, 75, 5);

    fill(sylviaAuburn);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(9);
    textStyle(BOLD);
    text("Sylvia's Tip:", hintX + 8, hintY + 6);
    textStyle(NORMAL);

    fill(60);
    textSize(8);
    let tip = "Ask yourself: 'Is there a natural one-to-one matching?' If each observation in Group 1 has a specific partner in Group 2, use paired!";
    text(wrapText(tip, 160), hintX + 8, hintY + 20);
}

function wrapText(txt, maxWidth) {
    let words = txt.split(' ');
    let lines = [];
    let currentLine = '';

    textSize(8);
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
    return lines.join('\n');
}

function drawQuizMode() {
    let scenario = scenarios[quizScenario];

    // Scenario box
    let boxX = margin + 50;
    let boxY = 50;
    let boxWidth = canvasWidth - 2 * boxX;

    fill(255);
    stroke(200);
    strokeWeight(2);
    rect(boxX, boxY, boxWidth, 80, 8);

    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Scenario ' + (quizScenario + 1) + ' of ' + scenarios.length, boxX + boxWidth / 2, boxY + 10);
    textStyle(NORMAL);

    textSize(13);
    fill(50);
    text(wrapTextCentered(scenario.text, boxWidth - 40), boxX + boxWidth / 2, boxY + 32);

    // Answer buttons
    let btnY = boxY + 100;
    let btnWidth = 180;
    let btnHeight = 50;

    // Paired button
    let pairedX = canvasWidth / 2 - btnWidth - 20;
    let pairedSelected = userAnswer === 'paired';
    let pairedCorrect = showFeedback && scenario.answer === 'paired';

    if (showFeedback) {
        fill(pairedCorrect ? sylviaGreen : (pairedSelected ? '#D32F2F' : 220));
    } else {
        fill(pairedSelected ? sylviaGreen : 220);
    }
    stroke(pairedSelected || pairedCorrect ? sylviaGreen : 180);
    strokeWeight(2);
    rect(pairedX, btnY, btnWidth, btnHeight, 8);

    fill(pairedSelected || pairedCorrect ? 255 : 60);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text('PAIRED', pairedX + btnWidth / 2, btnY + 15);
    textStyle(NORMAL);
    textSize(10);
    text('Same subjects, matched pairs', pairedX + btnWidth / 2, btnY + 35);

    // Independent button
    let indepX = canvasWidth / 2 + 20;
    let indepSelected = userAnswer === 'independent';
    let indepCorrect = showFeedback && scenario.answer === 'independent';

    if (showFeedback) {
        fill(indepCorrect ? sylviaGreen : (indepSelected ? '#D32F2F' : 220));
    } else {
        fill(indepSelected ? sylviaAuburn : 220);
    }
    stroke(indepSelected || indepCorrect ? (showFeedback ? sylviaGreen : sylviaAuburn) : 180);
    strokeWeight(2);
    rect(indepX, btnY, btnWidth, btnHeight, 8);

    fill(indepSelected || indepCorrect ? 255 : 60);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text('INDEPENDENT', indepX + btnWidth / 2, btnY + 15);
    textStyle(NORMAL);
    textSize(10);
    text('Separate groups', indepX + btnWidth / 2, btnY + 35);

    // Feedback area
    if (showFeedback) {
        let fbY = btnY + 70;
        let isCorrect = userAnswer === scenario.answer;

        fill(isCorrect ? '#E8F5E9' : '#FFEBEE');
        stroke(isCorrect ? sylviaGreen : '#D32F2F');
        strokeWeight(2);
        rect(boxX, fbY, boxWidth, 70, 8);

        fill(isCorrect ? sylviaGreen : '#D32F2F');
        noStroke();
        textAlign(CENTER, TOP);
        textSize(14);
        textStyle(BOLD);
        text(isCorrect ? 'Correct!' : 'Not quite...', boxX + boxWidth / 2, fbY + 8);
        textStyle(NORMAL);

        fill(50);
        textSize(11);
        text(wrapTextCentered(scenario.explanation, boxWidth - 30), boxX + boxWidth / 2, fbY + 28);

        // Next button
        fill(sylviaGreen);
        noStroke();
        rect(canvasWidth / 2 - 50, fbY + 75, 100, 30, 5);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(12);
        text(quizScenario < scenarios.length - 1 ? 'Next' : 'Restart', canvasWidth / 2, fbY + 90);
    }
}

function wrapTextCentered(txt, maxWidth) {
    let words = txt.split(' ');
    let lines = [];
    let currentLine = '';

    textSize(13);
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
    return lines.join('\n');
}

function drawControls() {
    let y = drawHeight + 15;

    // Mode toggle buttons
    fill(30);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Mode:', margin, y + 15);

    // Flowchart button
    let fcX = margin + 50;
    fill(!quizMode ? sylviaGreen : 220);
    stroke(!quizMode ? sylviaGreen : 180);
    strokeWeight(1);
    rect(fcX, y + 2, 90, 28, 5);
    fill(!quizMode ? 255 : 60);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Flowchart', fcX + 45, y + 16);

    // Quiz button
    let qX = fcX + 100;
    fill(quizMode ? sylviaAuburn : 220);
    stroke(quizMode ? sylviaAuburn : 180);
    strokeWeight(1);
    rect(qX, y + 2, 90, 28, 5);
    fill(quizMode ? 255 : 60);
    noStroke();
    textAlign(CENTER, CENTER);
    text('Practice Quiz', qX + 45, y + 16);

    // Instructions
    fill(80);
    textAlign(LEFT, CENTER);
    textSize(10);
    if (quizMode) {
        text('Read the scenario and decide: Paired or Independent?', margin + 260, y + 15);
    } else {
        text('Follow the flowchart questions to determine the correct procedure.', margin + 260, y + 15);
    }

    // Key takeaway
    fill(100);
    textAlign(CENTER, TOP);
    textSize(9);
    text('Key: Paired = analyze differences | Independent = compare two separate groups', canvasWidth / 2, y + 38);
}

function mousePressed() {
    // Check mode buttons
    let y = drawHeight + 15;
    let fcX = margin + 50;
    let qX = fcX + 100;

    if (mouseX >= fcX && mouseX <= fcX + 90 && mouseY >= y + 2 && mouseY <= y + 30) {
        quizMode = false;
        return;
    }
    if (mouseX >= qX && mouseX <= qX + 90 && mouseY >= y + 2 && mouseY <= y + 30) {
        quizMode = true;
        quizScenario = 0;
        userAnswer = null;
        showFeedback = false;
        return;
    }

    // Quiz mode interactions
    if (quizMode) {
        let boxX = margin + 50;
        let boxY = 50;
        let boxWidth = canvasWidth - 2 * boxX;
        let btnY = boxY + 100;
        let btnWidth = 180;
        let btnHeight = 50;

        // Paired button
        let pairedX = canvasWidth / 2 - btnWidth - 20;
        if (!showFeedback && mouseX >= pairedX && mouseX <= pairedX + btnWidth &&
            mouseY >= btnY && mouseY <= btnY + btnHeight) {
            userAnswer = 'paired';
            showFeedback = true;
            return;
        }

        // Independent button
        let indepX = canvasWidth / 2 + 20;
        if (!showFeedback && mouseX >= indepX && mouseX <= indepX + btnWidth &&
            mouseY >= btnY && mouseY <= btnY + btnHeight) {
            userAnswer = 'independent';
            showFeedback = true;
            return;
        }

        // Next button
        if (showFeedback) {
            let fbY = btnY + 70;
            if (mouseX >= canvasWidth / 2 - 50 && mouseX <= canvasWidth / 2 + 50 &&
                mouseY >= fbY + 75 && mouseY <= fbY + 105) {
                if (quizScenario < scenarios.length - 1) {
                    quizScenario++;
                } else {
                    quizScenario = 0;
                }
                userAnswer = null;
                showFeedback = false;
                return;
            }
        }
    }
}

function mouseMoved() {
    if (!quizMode) {
        hoveredNode = -1;
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            let d = dist(mouseX, mouseY, node.x, node.y);
            if (d < max(node.width, node.height) / 2) {
                hoveredNode = i;
                break;
            }
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    initializeNodes();
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = min(containerWidth, 750);
    if (canvasWidth < 600) canvasWidth = 600;
}
