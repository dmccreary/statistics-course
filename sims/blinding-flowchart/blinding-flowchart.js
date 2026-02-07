// Blinding Types Flowchart MicroSim
// Shows information flow in different blinding scenarios
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 750;
let drawHeight = 350;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 15;
let defaultTextSize = 12;

// Blinding types
let blindingTypes = [
    {
        name: 'No Blinding',
        description: 'Everyone knows everything',
        subjectKnows: true,
        researcherKnows: true,
        biasRisk: 'High',
        biasColor: '#E53935',
        advantages: ['Simple to implement', 'No deception required'],
        disadvantages: ['Subject bias possible', 'Researcher bias possible', 'Placebo effect uncontrolled'],
        example: 'Exercise vs sedentary study (impossible to hide who exercises)'
    },
    {
        name: 'Single-Blind',
        description: 'Subjects don\'t know, researchers do',
        subjectKnows: false,
        researcherKnows: true,
        biasRisk: 'Medium',
        biasColor: '#FB8C00',
        advantages: ['Prevents subject expectation effects', 'Controls placebo effect'],
        disadvantages: ['Researcher may treat groups differently', 'May influence data collection'],
        example: 'Drug trial with placebo pill (patients don\'t know which pill)'
    },
    {
        name: 'Double-Blind',
        description: 'Neither subjects nor researchers know',
        subjectKnows: false,
        researcherKnows: false,
        biasRisk: 'Low',
        biasColor: '#43A047',
        advantages: ['Prevents subject bias', 'Prevents researcher bias', 'Gold standard for clinical trials'],
        disadvantages: ['Complex to implement', 'Not always possible', 'Requires separate data handler'],
        example: 'Drug trial where doctors and patients both receive coded treatments'
    }
];

// State
let selectedType = 1; // Default to single-blind
let hoveredType = -1;
let showExample = false;

// Layout positions
let sectionWidth;
let sectionHeight = 180;
let sectionY = 60;
let sectionPositions = [];

// Button
let exampleButtonX, exampleButtonY;
let buttonWidth = 100;
let buttonHeight = 28;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    updateLayout();

    describe('Flowchart comparing no blinding, single-blind, and double-blind experiments with information flow visualization.', LABEL);
}

function updateLayout() {
    sectionWidth = (canvasWidth - margin * 2 - 30) / 3;
    sectionPositions = [];

    for (let i = 0; i < 3; i++) {
        sectionPositions.push({
            x: margin + i * (sectionWidth + 15),
            y: sectionY
        });
    }
}

function draw() {
    updateCanvasSize();
    updateLayout();

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
    text('Blinding in Experiments', canvasWidth / 2, 10);
    textStyle(NORMAL);

    textSize(11);
    fill(100);
    text('Click a type to see details. Hover for advantages/disadvantages.', canvasWidth / 2, 32);

    // Draw blinding type sections
    for (let i = 0; i < blindingTypes.length; i++) {
        drawBlindingSection(i);
    }

    // Draw info panel if hovering
    if (hoveredType >= 0) {
        drawInfoPanel(hoveredType);
    }

    // Draw example if toggled
    if (showExample && selectedType >= 0) {
        drawExamplePanel();
    }

    // Draw controls
    drawControls();
}

function drawBlindingSection(index) {
    let type = blindingTypes[index];
    let pos = sectionPositions[index];
    let isSelected = (selectedType === index);
    let isHovered = (hoveredType === index);

    // Section background
    if (isSelected) {
        fill(240, 248, 255);
        stroke(100, 149, 237);
        strokeWeight(3);
    } else if (isHovered) {
        fill(250, 250, 255);
        stroke(150);
        strokeWeight(2);
    } else {
        fill(255);
        stroke(200);
        strokeWeight(1);
    }
    rect(pos.x, pos.y, sectionWidth, sectionHeight, 8);

    // Type name
    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(13);
    textStyle(BOLD);
    text(type.name, pos.x + sectionWidth / 2, pos.y + 10);
    textStyle(NORMAL);

    textSize(10);
    fill(100);
    text(type.description, pos.x + sectionWidth / 2, pos.y + 28);

    // Draw subject and researcher figures
    let figureY = pos.y + 65;
    let figureSpacing = sectionWidth / 3;

    // Subject figure
    drawFigure(pos.x + figureSpacing, figureY, 'Subject', type.subjectKnows);

    // Researcher figure
    drawFigure(pos.x + figureSpacing * 2, figureY, 'Researcher', type.researcherKnows);

    // Treatment info arrow/indicator
    drawTreatmentFlow(pos.x + sectionWidth / 2, figureY + 35, type.subjectKnows, type.researcherKnows);

    // Bias risk indicator
    let biasY = pos.y + sectionHeight - 35;
    fill(type.biasColor);
    noStroke();
    rect(pos.x + 20, biasY, sectionWidth - 40, 25, 12);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text('Bias Risk: ' + type.biasRisk, pos.x + sectionWidth / 2, biasY + 12);
    textStyle(NORMAL);
}

function drawFigure(x, y, label, knows) {
    // Head
    if (knows) {
        fill(255, 200, 150);
        stroke(200, 150, 100);
    } else {
        fill(200, 200, 200);
        stroke(150);
    }
    strokeWeight(1);
    ellipse(x, y, 25, 25);

    // Body
    fill(knows ? '#90CAF9' : '#BDBDBD');
    stroke(knows ? '#1976D2' : '#757575');
    rect(x - 12, y + 14, 24, 30, 3);

    // Knowledge indicator
    if (knows) {
        // Eye with pupil (knows)
        fill(255);
        noStroke();
        ellipse(x - 4, y - 2, 8, 8);
        ellipse(x + 4, y - 2, 8, 8);
        fill(30);
        ellipse(x - 4, y - 2, 4, 4);
        ellipse(x + 4, y - 2, 4, 4);
    } else {
        // Blindfold (doesn't know)
        fill(60);
        noStroke();
        rect(x - 14, y - 6, 28, 8, 2);
    }

    // Label
    fill(60);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(9);
    text(label, x, y + 48);

    // Knows indicator text
    fill(knows ? '#2E7D32' : '#D32F2F');
    textSize(8);
    textStyle(BOLD);
    text(knows ? 'KNOWS' : 'BLIND', x, y + 59);
    textStyle(NORMAL);
}

function drawTreatmentFlow(x, y, subjectKnows, researcherKnows) {
    // Treatment assignment indicator
    textAlign(CENTER, CENTER);
    textSize(8);

    // Info flow line from top (treatment assignment)
    stroke(100);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(x, y - 45, x, y - 25);
    drawingContext.setLineDash([]);

    // Treatment box
    fill(255, 248, 225);
    stroke('#B5651D');
    strokeWeight(1);
    rect(x - 25, y - 25, 50, 20, 3);

    fill('#B5651D');
    noStroke();
    textSize(8);
    text('Treatment', x, y - 15);

    // Arrows to figures based on knowledge
    stroke(subjectKnows ? '#2E7D32' : '#BDBDBD');
    strokeWeight(subjectKnows ? 2 : 1);
    if (!subjectKnows) drawingContext.setLineDash([4, 4]);
    line(x - 15, y, x - 35, y + 15);
    drawingContext.setLineDash([]);

    stroke(researcherKnows ? '#2E7D32' : '#BDBDBD');
    strokeWeight(researcherKnows ? 2 : 1);
    if (!researcherKnows) drawingContext.setLineDash([4, 4]);
    line(x + 15, y, x + 35, y + 15);
    drawingContext.setLineDash([]);
}

function drawInfoPanel(index) {
    let type = blindingTypes[index];
    let panelWidth = 200;
    let panelHeight = 130;
    let panelX = mouseX + 15;
    let panelY = mouseY - panelHeight / 2;

    // Keep panel on screen
    if (panelX + panelWidth > canvasWidth - 10) {
        panelX = mouseX - panelWidth - 15;
    }
    if (panelY < 10) panelY = 10;
    if (panelY + panelHeight > drawHeight - 10) panelY = drawHeight - panelHeight - 10;

    // Panel background
    fill(255, 255, 255, 250);
    stroke(100);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    // Advantages
    fill('#2E7D32');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(10);
    textStyle(BOLD);
    text('Advantages:', panelX + 10, panelY + 8);
    textStyle(NORMAL);

    textSize(9);
    fill(60);
    for (let i = 0; i < type.advantages.length; i++) {
        text('+ ' + type.advantages[i], panelX + 10, panelY + 23 + i * 12);
    }

    // Disadvantages
    let disY = panelY + 23 + type.advantages.length * 12 + 10;
    fill('#D32F2F');
    textStyle(BOLD);
    textSize(10);
    text('Disadvantages:', panelX + 10, disY);
    textStyle(NORMAL);

    textSize(9);
    fill(60);
    for (let i = 0; i < type.disadvantages.length; i++) {
        text('- ' + type.disadvantages[i], panelX + 10, disY + 15 + i * 12);
    }
}

function drawExamplePanel() {
    let type = blindingTypes[selectedType];
    let panelWidth = canvasWidth - margin * 2;
    let panelHeight = 50;
    let panelX = margin;
    let panelY = drawHeight - panelHeight - 10;

    fill(255, 248, 225);
    stroke('#B5651D');
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    fill('#B5651D');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Example of ' + type.name + ':', panelX + 10, panelY + 8);
    textStyle(NORMAL);

    fill(60);
    textSize(11);
    text(type.example, panelX + 10, panelY + 26, panelWidth - 20, 40);
}

function drawControls() {
    exampleButtonX = canvasWidth / 2 - buttonWidth / 2;
    exampleButtonY = drawHeight + 11;

    // Example toggle button
    if (showExample) {
        fill(181, 101, 29);
        stroke(139, 69, 19);
    } else {
        fill(100, 130, 180);
        stroke(70, 100, 150);
    }
    strokeWeight(1);
    rect(exampleButtonX, exampleButtonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(showExample ? 'Hide Example' : 'Show Example', exampleButtonX + buttonWidth / 2, exampleButtonY + buttonHeight / 2);

    // Legend
    fill(80);
    textSize(10);
    textAlign(LEFT, CENTER);
    let legendX = margin;

    // Knows legend
    fill('#2E7D32');
    ellipse(legendX + 5, exampleButtonY + buttonHeight / 2, 10, 10);
    fill(80);
    text('Knows treatment', legendX + 15, exampleButtonY + buttonHeight / 2);

    // Blind legend
    legendX += 110;
    fill('#757575');
    ellipse(legendX + 5, exampleButtonY + buttonHeight / 2, 10, 10);
    fill(80);
    text('Blinded', legendX + 15, exampleButtonY + buttonHeight / 2);
}

function mouseMoved() {
    hoveredType = -1;

    for (let i = 0; i < sectionPositions.length; i++) {
        let pos = sectionPositions[i];
        if (mouseX >= pos.x && mouseX <= pos.x + sectionWidth &&
            mouseY >= pos.y && mouseY <= pos.y + sectionHeight) {
            hoveredType = i;
            break;
        }
    }
}

function mousePressed() {
    // Check section clicks
    for (let i = 0; i < sectionPositions.length; i++) {
        let pos = sectionPositions[i];
        if (mouseX >= pos.x && mouseX <= pos.x + sectionWidth &&
            mouseY >= pos.y && mouseY <= pos.y + sectionHeight) {
            selectedType = i;
            return;
        }
    }

    // Check example button
    if (mouseX >= exampleButtonX && mouseX <= exampleButtonX + buttonWidth &&
        mouseY >= exampleButtonY && mouseY <= exampleButtonY + buttonHeight) {
        showExample = !showExample;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    updateLayout();
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = min(containerWidth, 800);
    if (canvasWidth < 650) canvasWidth = 650;
}
