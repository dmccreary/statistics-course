// Four-Step Process Interactive Flowchart MicroSim
// Guide students through the STATE, PLAN, DO, CONCLUDE process for inference
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 750;
let drawHeight = 470;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 14;

// Steps data
let steps = [
    {
        name: 'STATE',
        color: [46, 125, 50], // Sylvia Green
        shortDesc: 'Define the problem',
        hypoContent: {
            title: 'Hypothesis Test',
            items: [
                'State the null hypothesis H₀',
                'State the alternative hypothesis Hₐ',
                'Define the parameter in context',
                'Identify the significance level α'
            ]
        },
        ciContent: {
            title: 'Confidence Interval',
            items: [
                'Define the parameter of interest',
                'Specify the confidence level',
                'State what you want to estimate',
                'Identify the population'
            ]
        }
    },
    {
        name: 'PLAN',
        color: [25, 118, 210], // Blue
        shortDesc: 'Check conditions',
        hypoContent: {
            title: 'Hypothesis Test',
            items: [
                'Name the procedure to use',
                'Random: Data from random sample/experiment?',
                'Independent: Is n < 10% of population?',
                'Normal: Is sampling distribution normal?'
            ]
        },
        ciContent: {
            title: 'Confidence Interval',
            items: [
                'Name the procedure to use',
                'Random: Random sample or assignment?',
                'Independent: 10% condition satisfied?',
                'Normal: np ≥ 10, n(1-p) ≥ 10 or n ≥ 30?'
            ]
        }
    },
    {
        name: 'DO',
        color: [245, 124, 0], // Orange
        shortDesc: 'Calculate',
        hypoContent: {
            title: 'Hypothesis Test',
            items: [
                'Calculate the test statistic',
                'Show the formula with values',
                'Find the p-value',
                'State: P-value = P(test stat | H₀ true)'
            ]
        },
        ciContent: {
            title: 'Confidence Interval',
            items: [
                'Calculate the point estimate',
                'Find the critical value z* or t*',
                'Calculate the margin of error',
                'Interval: estimate ± margin of error'
            ]
        }
    },
    {
        name: 'CONCLUDE',
        color: [123, 31, 162], // Purple
        shortDesc: 'State your conclusion',
        hypoContent: {
            title: 'Hypothesis Test',
            items: [
                'Compare p-value to α',
                'Decision: Reject or fail to reject H₀',
                '"There is (not) convincing evidence..."',
                'State conclusion in CONTEXT'
            ]
        },
        ciContent: {
            title: 'Confidence Interval',
            items: [
                'State the interval bounds',
                '"We are X% confident that..."',
                'Interpret in CONTEXT',
                'The true [parameter] is between...'
            ]
        }
    }
];

// State
let selectedStep = null;
let hoveredStep = null;
let mode = 'hypo'; // 'hypo' or 'ci'

// Step box dimensions
let stepWidth = 140;
let stepHeight = 70;
let stepGap = 25;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    describe('Interactive flowchart showing the four-step process for statistical inference (State, Plan, Do, Conclude). Toggle between hypothesis test and confidence interval modes. Click each step for detailed guidance.', LABEL);
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

    // Title
    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text('The Four-Step Process for Inference', canvasWidth / 2, 10);
    textStyle(NORMAL);

    // Mode indicator
    textSize(12);
    fill(80);
    text('Mode: ' + (mode === 'hypo' ? 'Hypothesis Test' : 'Confidence Interval'), canvasWidth / 2, 35);

    // Check hover
    checkHover();

    // Draw the flowchart
    drawFlowchart();

    // Draw detail panel
    drawDetailPanel();

    // Draw mnemonic
    drawMnemonic();

    // Draw controls
    drawControls();
}

function checkHover() {
    hoveredStep = null;

    let startX = (canvasWidth - (stepWidth * 4 + stepGap * 3)) / 2;
    let y = 80;

    for (let i = 0; i < 4; i++) {
        let x = startX + i * (stepWidth + stepGap);
        if (mouseX >= x && mouseX <= x + stepWidth &&
            mouseY >= y && mouseY <= y + stepHeight) {
            hoveredStep = i;
            break;
        }
    }
}

function drawFlowchart() {
    let startX = (canvasWidth - (stepWidth * 4 + stepGap * 3)) / 2;
    let y = 80;

    // Draw connecting arrows
    stroke(150);
    strokeWeight(2);
    for (let i = 0; i < 3; i++) {
        let x1 = startX + (i + 1) * (stepWidth + stepGap) - stepGap;
        let x2 = startX + (i + 1) * (stepWidth + stepGap);
        let midY = y + stepHeight / 2;

        line(x1, midY, x2 - 8, midY);

        // Arrow head
        fill(150);
        noStroke();
        triangle(x2 - 8, midY - 5, x2 - 8, midY + 5, x2, midY);
        stroke(150);
    }

    // Draw step boxes
    for (let i = 0; i < 4; i++) {
        let step = steps[i];
        let x = startX + i * (stepWidth + stepGap);
        let isSelected = selectedStep === i;
        let isHovered = hoveredStep === i;

        // Box shadow
        fill(0, 0, 0, 20);
        noStroke();
        rect(x + 3, y + 3, stepWidth, stepHeight, 8);

        // Box
        if (isSelected) {
            fill(step.color[0], step.color[1], step.color[2]);
            stroke(step.color[0] * 0.7, step.color[1] * 0.7, step.color[2] * 0.7);
            strokeWeight(3);
        } else if (isHovered) {
            fill(step.color[0], step.color[1], step.color[2], 200);
            stroke(step.color[0] * 0.8, step.color[1] * 0.8, step.color[2] * 0.8);
            strokeWeight(2);
        } else {
            fill(step.color[0], step.color[1], step.color[2], 180);
            stroke(step.color[0] * 0.7, step.color[1] * 0.7, step.color[2] * 0.7);
            strokeWeight(1);
        }
        rect(x, y, stepWidth, stepHeight, 8);

        // Step name
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(16);
        textStyle(BOLD);
        text(step.name, x + stepWidth / 2, y + 25);
        textStyle(NORMAL);

        // Short description
        textSize(10);
        text(step.shortDesc, x + stepWidth / 2, y + 48);

        // Click hint on hover
        if (isHovered && !isSelected) {
            fill(255, 255, 200, 220);
            stroke(200, 180, 100);
            strokeWeight(1);
            rect(x + 10, y + stepHeight + 5, stepWidth - 20, 18, 3);
            fill(100);
            noStroke();
            textSize(9);
            text('Click for details', x + stepWidth / 2, y + stepHeight + 14);
        }
    }
}

function drawDetailPanel() {
    let panelX = margin + 10;
    let panelY = 175;
    let panelWidth = canvasWidth - margin * 2 - 20;
    let panelHeight = 220;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 8);

    if (selectedStep !== null) {
        let step = steps[selectedStep];
        let content = mode === 'hypo' ? step.hypoContent : step.ciContent;

        // Header with step color
        fill(step.color[0], step.color[1], step.color[2], 50);
        noStroke();
        rect(panelX, panelY, panelWidth, 35, 8, 8, 0, 0);

        // Step name
        fill(step.color[0], step.color[1], step.color[2]);
        textAlign(LEFT, CENTER);
        textSize(14);
        textStyle(BOLD);
        text('Step: ' + step.name + ' - ' + content.title, panelX + 15, panelY + 17);
        textStyle(NORMAL);

        // Checklist items
        fill(50);
        textSize(13);
        let itemY = panelY + 55;
        let checkSize = 16;

        for (let i = 0; i < content.items.length; i++) {
            // Checkbox
            stroke(step.color[0], step.color[1], step.color[2]);
            strokeWeight(2);
            noFill();
            rect(panelX + 20, itemY - 8, checkSize, checkSize, 3);

            // Item text
            fill(50);
            noStroke();
            textAlign(LEFT, CENTER);
            text(content.items[i], panelX + 45, itemY);

            itemY += 35;
        }

        // Tip box
        let tipY = panelY + panelHeight - 45;
        fill(255, 248, 225);
        stroke(255, 193, 7);
        strokeWeight(1);
        rect(panelX + 10, tipY, panelWidth - 20, 35, 5);

        fill(100);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(11);
        textStyle(ITALIC);
        text(getStepTip(selectedStep), panelX + 20, tipY + 17);
        textStyle(NORMAL);

    } else {
        // No step selected
        fill(120);
        textAlign(CENTER, CENTER);
        textSize(14);
        text('Click a step above to see detailed guidance', panelX + panelWidth / 2, panelY + panelHeight / 2 - 10);

        fill(150);
        textSize(12);
        textStyle(ITALIC);
        text('Each step has specific requirements for AP Statistics success', panelX + panelWidth / 2, panelY + panelHeight / 2 + 15);
        textStyle(NORMAL);
    }
}

function getStepTip(stepIndex) {
    let tips = {
        hypo: [
            'Sylvia says: "Make sure your hypotheses are about population PARAMETERS, not sample statistics!"',
            'Sylvia says: "Checking conditions is like checking your parachute—do it BEFORE you jump!"',
            'Sylvia says: "Show your work! Partial credit is better than no credit."',
            'Sylvia says: "Never say \'accept the null hypothesis\'—always say \'fail to reject.\'"'
        ],
        ci: [
            'Sylvia says: "Be specific about what you\'re estimating—state the parameter clearly!"',
            'Sylvia says: "If conditions aren\'t met, your confidence interval may not be trustworthy."',
            'Sylvia says: "Remember: estimate ± (critical value × standard error)"',
            'Sylvia says: "Interpret in context! Don\'t just give numbers—explain what they mean."'
        ]
    };
    return tips[mode][stepIndex];
}

function drawMnemonic() {
    let y = drawHeight - 40;

    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(BOLD);
    text('Remember: "Some People Don\'t Care" → State, Plan, Do, Conclude', canvasWidth / 2, y);
    textStyle(NORMAL);

    textSize(10);
    fill(100);
    text('(But AP graders DEFINITELY care if you skip a step!)', canvasWidth / 2, y + 18);
}

function drawControls() {
    let btnY = drawHeight + 20;

    // Mode toggle buttons
    let toggleStartX = canvasWidth / 2 - 160;
    let btnWidth = 150;
    let btnHeight = 40;

    // Hypothesis Test button
    let hypoHover = mouseX >= toggleStartX && mouseX <= toggleStartX + btnWidth &&
                    mouseY >= btnY && mouseY <= btnY + btnHeight;

    fill(mode === 'hypo' ? [70, 130, 180] : (hypoHover ? [150, 180, 200] : [200, 210, 220]));
    stroke(mode === 'hypo' ? [40, 80, 120] : [150, 150, 150]);
    strokeWeight(mode === 'hypo' ? 2 : 1);
    rect(toggleStartX, btnY, btnWidth, btnHeight, 5, 0, 0, 5);

    fill(mode === 'hypo' ? 255 : 60);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('Hypothesis Test', toggleStartX + btnWidth / 2, btnY + btnHeight / 2);

    // Confidence Interval button
    let ciX = toggleStartX + btnWidth + 10;
    let ciHover = mouseX >= ciX && mouseX <= ciX + btnWidth &&
                  mouseY >= btnY && mouseY <= btnY + btnHeight;

    fill(mode === 'ci' ? [70, 130, 180] : (ciHover ? [150, 180, 200] : [200, 210, 220]));
    stroke(mode === 'ci' ? [40, 80, 120] : [150, 150, 150]);
    strokeWeight(mode === 'ci' ? 2 : 1);
    rect(ciX, btnY, btnWidth, btnHeight, 0, 5, 5, 0);

    fill(mode === 'ci' ? 255 : 60);
    noStroke();
    text('Confidence Interval', ciX + btnWidth / 2, btnY + btnHeight / 2);

    // Instructions
    fill(100);
    textSize(10);
    text('Toggle mode to see step details for each procedure type', canvasWidth / 2, btnY + btnHeight + 18);
}

function mousePressed() {
    // Check step clicks
    let startX = (canvasWidth - (stepWidth * 4 + stepGap * 3)) / 2;
    let y = 80;

    for (let i = 0; i < 4; i++) {
        let x = startX + i * (stepWidth + stepGap);
        if (mouseX >= x && mouseX <= x + stepWidth &&
            mouseY >= y && mouseY <= y + stepHeight) {
            selectedStep = (selectedStep === i) ? null : i;
            return;
        }
    }

    // Check mode buttons
    let btnY = drawHeight + 20;
    let toggleStartX = canvasWidth / 2 - 160;
    let btnWidth = 150;
    let btnHeight = 40;

    if (mouseY >= btnY && mouseY <= btnY + btnHeight) {
        if (mouseX >= toggleStartX && mouseX <= toggleStartX + btnWidth) {
            mode = 'hypo';
        } else if (mouseX >= toggleStartX + btnWidth + 10 && mouseX <= toggleStartX + btnWidth * 2 + 10) {
            mode = 'ci';
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
    canvasWidth = min(containerWidth, 850);
    if (canvasWidth < 700) canvasWidth = 700;
}
