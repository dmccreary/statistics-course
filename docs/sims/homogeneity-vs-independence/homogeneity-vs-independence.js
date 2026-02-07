// Homogeneity vs Independence Comparison MicroSim
// Side-by-side comparison of these two chi-square test types
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 750;
let drawHeight = 430;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let margin = 15;

// Current view mode
let currentView = 'both'; // 'both', 'homogeneity', 'independence'
let showQuiz = false;
let quizScenario = 0;
let quizAnswer = '';
let quizSubmitted = false;

// Sylvia theme
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';
let homogeneityColor = '#1976D2';
let independenceColor = '#4CAF50';

// Quiz scenarios
let scenarios = [
    {
        text: "Researchers survey students from 3 different universities about their preferred study method (library, dorm, cafe). They want to know if the distribution of study preferences is the same across all universities.",
        answer: 'homogeneity',
        explanation: "This is a HOMOGENEITY test because there are 3 separate populations (universities) and one categorical variable (study preference) measured in each."
    },
    {
        text: "A polling organization surveys 500 randomly selected adults, asking both their age group (18-35, 36-55, 56+) and their opinion on a policy (support, oppose, neutral). They want to know if age and opinion are related.",
        answer: 'independence',
        explanation: "This is an INDEPENDENCE test because there is ONE sample of 500 adults, and TWO categorical variables (age group and opinion) are measured on each person."
    },
    {
        text: "A company tests three different packaging designs by showing each design to a separate random sample of consumers and recording whether they would buy the product (yes/no).",
        answer: 'homogeneity',
        explanation: "This is a HOMOGENEITY test because there are 3 separate groups (one for each design) and the same categorical response (buy/don't buy) is measured in each."
    },
    {
        text: "Researchers collect data on 1000 hospital patients, recording both their insurance type (private, public, none) and treatment outcome (improved, unchanged, worsened). They want to test if insurance and outcome are associated.",
        answer: 'independence',
        explanation: "This is an INDEPENDENCE test because there is ONE sample of patients, and TWO categorical variables (insurance and outcome) are recorded for each patient."
    },
    {
        text: "An education researcher takes random samples of 200 students from urban schools, 200 from suburban schools, and 200 from rural schools, asking each student whether they plan to attend college (yes/no/undecided).",
        answer: 'homogeneity',
        explanation: "This is a HOMOGENEITY test because there are 3 separate populations (school locations) sampled independently, comparing the distribution of the same response variable."
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    describe('Interactive comparison of chi-square tests for homogeneity and independence', LABEL);
}

function draw() {
    updateCanvasSize();

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
    textSize(16);
    text('Homogeneity vs Independence: Know the Difference!', canvasWidth / 2, 8);

    if (showQuiz) {
        drawQuizMode();
    } else {
        drawComparisonMode();
    }

    drawControls();
}

function drawComparisonMode() {
    let panelWidth = (canvasWidth - margin * 3) / 2;
    let panelTop = 35;
    let panelHeight = 380;

    // Draw homogeneity panel
    if (currentView === 'both' || currentView === 'homogeneity') {
        let panelLeft = currentView === 'both' ? margin : canvasWidth / 4;
        let pWidth = currentView === 'both' ? panelWidth : canvasWidth / 2;
        drawHomogeneityPanel(panelLeft, panelTop, pWidth, panelHeight);
    }

    // Draw independence panel
    if (currentView === 'both' || currentView === 'independence') {
        let panelLeft = currentView === 'both' ? margin * 2 + panelWidth : canvasWidth / 4;
        let pWidth = currentView === 'both' ? panelWidth : canvasWidth / 2;
        drawIndependencePanel(panelLeft, panelTop, pWidth, panelHeight);
    }

    // Draw shared elements indicator
    if (currentView === 'both') {
        drawSharedElements();
    }
}

function drawHomogeneityPanel(x, y, w, h) {
    // Panel background
    fill(232, 244, 253);
    stroke(homogeneityColor);
    strokeWeight(2);
    rect(x, y, w, h, 8);

    // Header
    fill(homogeneityColor);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Test for HOMOGENEITY', x + w / 2, y + 10);

    // Key question
    fill(255);
    stroke(homogeneityColor);
    strokeWeight(1);
    rect(x + 10, y + 35, w - 20, 40, 5);

    fill(homogeneityColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('"Is the distribution the same', x + w / 2, y + 48);
    text('across different groups?"', x + w / 2, y + 62);

    // Sampling diagram
    drawHomogeneitySampling(x + 10, y + 85, w - 20, 120);

    // Example
    fill(homogeneityColor);
    textAlign(LEFT, TOP);
    textSize(11);
    text('Example:', x + 15, y + 215);

    fill(80);
    textSize(10);
    let exText = "Survey students from 3 schools\nabout college plans.\nDo schools have the same\ndistribution of responses?";
    text(exText, x + 15, y + 230);

    // Key features
    fill(homogeneityColor);
    textSize(11);
    text('Key Features:', x + 15, y + 295);

    fill(80);
    textSize(10);
    text('\u2022 Multiple populations', x + 15, y + 310);
    text('\u2022 Separate random samples', x + 15, y + 325);
    text('\u2022 One categorical variable', x + 15, y + 340);
    text('\u2022 Compare distributions', x + 15, y + 355);
}

function drawIndependencePanel(x, y, w, h) {
    // Panel background
    fill(232, 245, 233);
    stroke(independenceColor);
    strokeWeight(2);
    rect(x, y, w, h, 8);

    // Header
    fill(independenceColor);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Test for INDEPENDENCE', x + w / 2, y + 10);

    // Key question
    fill(255);
    stroke(independenceColor);
    strokeWeight(1);
    rect(x + 10, y + 35, w - 20, 40, 5);

    fill(independenceColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('"Are the two variables', x + w / 2, y + 48);
    text('associated or independent?"', x + w / 2, y + 62);

    // Sampling diagram
    drawIndependenceSampling(x + 10, y + 85, w - 20, 120);

    // Example
    fill(independenceColor);
    textAlign(LEFT, TOP);
    textSize(11);
    text('Example:', x + 15, y + 215);

    fill(80);
    textSize(10);
    let exText = "Survey 500 adults about\nexercise frequency AND stress.\nAre these variables\nassociated?";
    text(exText, x + 15, y + 230);

    // Key features
    fill(independenceColor);
    textSize(11);
    text('Key Features:', x + 15, y + 295);

    fill(80);
    textSize(10);
    text('\u2022 One population', x + 15, y + 310);
    text('\u2022 Single random sample', x + 15, y + 325);
    text('\u2022 Two categorical variables', x + 15, y + 340);
    text('\u2022 Test association', x + 15, y + 355);
}

function drawHomogeneitySampling(x, y, w, h) {
    // Multiple groups visual
    let boxW = w / 4;
    let boxH = h * 0.4;

    // Three population boxes
    for (let i = 0; i < 3; i++) {
        let bx = x + 10 + i * (boxW + 10);
        let by = y + 5;

        // Population box
        fill(homogeneityColor);
        fill(red(color(homogeneityColor)), green(color(homogeneityColor)), blue(color(homogeneityColor)), 100);
        stroke(homogeneityColor);
        strokeWeight(2);
        rect(bx, by, boxW, boxH, 4);

        // Label
        fill(homogeneityColor);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(9);
        text('Pop ' + (i + 1), bx + boxW / 2, by + boxH / 2);

        // Arrow down
        stroke(homogeneityColor);
        strokeWeight(2);
        line(bx + boxW / 2, by + boxH + 5, bx + boxW / 2, by + boxH + 20);
        triangle(bx + boxW / 2, by + boxH + 25, bx + boxW / 2 - 5, by + boxH + 18, bx + boxW / 2 + 5, by + boxH + 18);

        // Sample
        noStroke();
        fill(homogeneityColor);
        ellipse(bx + boxW / 2, by + boxH + 40, 30, 30);
        fill(255);
        textSize(8);
        text('Sample', bx + boxW / 2, by + boxH + 40);
    }

    // Single variable measured
    fill(homogeneityColor);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(9);
    text('Same variable measured in each', x + w / 2, y + h - 20);
}

function drawIndependenceSampling(x, y, w, h) {
    // Single population with two variables
    let popW = w * 0.4;
    let popH = h * 0.4;

    // One population box
    let bx = x + w / 2 - popW / 2;
    let by = y + 5;

    fill(independenceColor);
    fill(red(color(independenceColor)), green(color(independenceColor)), blue(color(independenceColor)), 100);
    stroke(independenceColor);
    strokeWeight(2);
    rect(bx, by, popW, popH, 4);

    fill(independenceColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text('One Population', bx + popW / 2, by + popH / 2);

    // Arrow down
    stroke(independenceColor);
    strokeWeight(2);
    line(bx + popW / 2, by + popH + 5, bx + popW / 2, by + popH + 20);
    triangle(bx + popW / 2, by + popH + 25, bx + popW / 2 - 5, by + popH + 18, bx + popW / 2 + 5, by + popH + 18);

    // Sample
    noStroke();
    fill(independenceColor);
    ellipse(bx + popW / 2, by + popH + 45, 45, 35);
    fill(255);
    textSize(9);
    text('Sample', bx + popW / 2, by + popH + 45);

    // Two arrows branching out
    let sampleY = by + popH + 45;
    stroke(independenceColor);
    strokeWeight(2);

    // Left branch - Variable 1
    line(bx + popW / 2 - 20, sampleY + 18, bx + popW / 2 - 40, sampleY + 35);
    noStroke();
    fill(independenceColor);
    rect(bx + popW / 2 - 70, sampleY + 38, 60, 22, 3);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(8);
    text('Variable 1', bx + popW / 2 - 40, sampleY + 49);

    // Right branch - Variable 2
    stroke(independenceColor);
    line(bx + popW / 2 + 20, sampleY + 18, bx + popW / 2 + 40, sampleY + 35);
    noStroke();
    fill(independenceColor);
    rect(bx + popW / 2 + 10, sampleY + 38, 60, 22, 3);
    fill(255);
    text('Variable 2', bx + popW / 2 + 40, sampleY + 49);
}

function drawSharedElements() {
    // Box for shared elements at bottom
    let boxY = drawHeight - 50;
    let boxW = 280;
    let boxX = canvasWidth / 2 - boxW / 2;

    fill(255, 248, 225);
    stroke(sylviaAuburn);
    strokeWeight(2);
    rect(boxX, boxY, boxW, 40, 5);

    fill(sylviaAuburn);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text('Both tests use the SAME:', boxX + boxW / 2, boxY + 5);

    fill(80);
    textSize(9);
    text('\u2022 Chi-square formula: \u03C7\u00B2 = \u03A3(O-E)\u00B2/E', boxX + boxW / 2, boxY + 18);
    text('\u2022 Expected count: E = (row total \u00D7 col total) / grand total', boxX + boxW / 2, boxY + 30);
}

function drawQuizMode() {
    let scenario = scenarios[quizScenario];

    // Scenario box
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(margin, 40, canvasWidth - margin * 2, 120, 5);

    fill(80);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text('Scenario ' + (quizScenario + 1) + ' of ' + scenarios.length + ':', margin + 15, 50);

    textSize(11);
    // Word wrap the scenario text
    let words = scenario.text.split(' ');
    let line = '';
    let lineY = 70;
    let maxWidth = canvasWidth - margin * 2 - 30;

    for (let word of words) {
        let testLine = line + word + ' ';
        if (textWidth(testLine) > maxWidth) {
            text(line, margin + 15, lineY);
            line = word + ' ';
            lineY += 16;
        } else {
            line = testLine;
        }
    }
    text(line, margin + 15, lineY);

    // Answer buttons
    let btnY = 180;

    // Homogeneity button
    fill(quizAnswer === 'homogeneity' ? homogeneityColor : (quizSubmitted && scenario.answer === 'homogeneity' ? '#81C784' : '#E3F2FD'));
    stroke(homogeneityColor);
    strokeWeight(2);
    rect(canvasWidth / 2 - 180, btnY, 160, 50, 8);

    fill(quizAnswer === 'homogeneity' ? 'white' : homogeneityColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('Homogeneity', canvasWidth / 2 - 100, btnY + 25);

    // Independence button
    fill(quizAnswer === 'independence' ? independenceColor : (quizSubmitted && scenario.answer === 'independence' ? '#81C784' : '#E8F5E9'));
    stroke(independenceColor);
    strokeWeight(2);
    rect(canvasWidth / 2 + 20, btnY, 160, 50, 8);

    fill(quizAnswer === 'independence' ? 'white' : independenceColor);
    noStroke();
    text('Independence', canvasWidth / 2 + 100, btnY + 25);

    // Submit button
    if (quizAnswer && !quizSubmitted) {
        fill(sylviaAuburn);
        rect(canvasWidth / 2 - 60, btnY + 70, 120, 35, 5);
        fill('white');
        textSize(12);
        text('Check Answer', canvasWidth / 2, btnY + 87);
    }

    // Feedback
    if (quizSubmitted) {
        let correct = quizAnswer === scenario.answer;

        fill(correct ? '#E8F5E9' : '#FFEBEE');
        stroke(correct ? sylviaGreen : '#C62828');
        strokeWeight(2);
        rect(margin, btnY + 70, canvasWidth - margin * 2, 100, 5);

        fill(correct ? sylviaGreen : '#C62828');
        noStroke();
        textAlign(LEFT, TOP);
        textSize(12);
        text(correct ? 'Correct!' : 'Not quite...', margin + 15, btnY + 80);

        fill(80);
        textSize(10);
        // Word wrap explanation
        words = scenario.explanation.split(' ');
        line = '';
        lineY = btnY + 100;
        maxWidth = canvasWidth - margin * 2 - 30;

        for (let word of words) {
            let testLine = line + word + ' ';
            if (textWidth(testLine) > maxWidth) {
                text(line, margin + 15, lineY);
                line = word + ' ';
                lineY += 14;
            } else {
                line = testLine;
            }
        }
        text(line, margin + 15, lineY);

        // Next button
        if (quizScenario < scenarios.length - 1) {
            fill(sylviaGreen);
            rect(canvasWidth / 2 - 50, btnY + 180, 100, 30, 5);
            fill('white');
            textAlign(CENTER, CENTER);
            text('Next \u25B6', canvasWidth / 2, btnY + 195);
        } else {
            fill(80);
            textAlign(CENTER, CENTER);
            textSize(11);
            text('Quiz complete! Click "Show Comparison" to review.', canvasWidth / 2, btnY + 190);
        }
    }
}

function drawControls() {
    let y = drawHeight + 10;

    // View toggle buttons
    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('View:', 10, y + 15);

    // Both button
    fill(currentView === 'both' && !showQuiz ? sylviaGreen : '#ddd');
    rect(50, y + 5, 80, 22, 4);
    fill(currentView === 'both' && !showQuiz ? 'white' : 'black');
    textAlign(CENTER, CENTER);
    text('Compare Both', 90, y + 16);

    // Homogeneity only
    fill(currentView === 'homogeneity' && !showQuiz ? homogeneityColor : '#ddd');
    rect(140, y + 5, 85, 22, 4);
    fill(currentView === 'homogeneity' && !showQuiz ? 'white' : 'black');
    text('Homogeneity', 182, y + 16);

    // Independence only
    fill(currentView === 'independence' && !showQuiz ? independenceColor : '#ddd');
    rect(235, y + 5, 85, 22, 4);
    fill(currentView === 'independence' && !showQuiz ? 'white' : 'black');
    text('Independence', 277, y + 16);

    // Quiz mode toggle
    fill(showQuiz ? sylviaAuburn : '#888');
    rect(340, y + 5, 90, 22, 4);
    fill('white');
    text(showQuiz ? 'Show Comparison' : 'Practice Quiz', 385, y + 16);

    // Instructions
    let y2 = y + 35;
    fill(100);
    textAlign(LEFT, CENTER);
    textSize(9);

    if (showQuiz) {
        text('Read each scenario and decide which test type applies. Click to select, then check your answer!', 10, y2 + 5);
    } else {
        text('The key difference: Homogeneity has SEPARATE SAMPLES from multiple populations. Independence has ONE SAMPLE with two variables.', 10, y2 + 5);
    }
}

function mousePressed() {
    let y = drawHeight + 10;

    // View buttons
    if (mouseY >= y + 5 && mouseY <= y + 27) {
        if (mouseX >= 50 && mouseX <= 130) {
            currentView = 'both';
            showQuiz = false;
            return;
        }
        if (mouseX >= 140 && mouseX <= 225) {
            currentView = 'homogeneity';
            showQuiz = false;
            return;
        }
        if (mouseX >= 235 && mouseX <= 320) {
            currentView = 'independence';
            showQuiz = false;
            return;
        }
        if (mouseX >= 340 && mouseX <= 430) {
            showQuiz = !showQuiz;
            if (showQuiz) {
                quizScenario = 0;
                quizAnswer = '';
                quizSubmitted = false;
            }
            return;
        }
    }

    // Quiz mode interactions
    if (showQuiz) {
        let btnY = 180;

        // Homogeneity button
        if (mouseX >= canvasWidth / 2 - 180 && mouseX <= canvasWidth / 2 - 20 &&
            mouseY >= btnY && mouseY <= btnY + 50 && !quizSubmitted) {
            quizAnswer = 'homogeneity';
            return;
        }

        // Independence button
        if (mouseX >= canvasWidth / 2 + 20 && mouseX <= canvasWidth / 2 + 180 &&
            mouseY >= btnY && mouseY <= btnY + 50 && !quizSubmitted) {
            quizAnswer = 'independence';
            return;
        }

        // Submit button
        if (quizAnswer && !quizSubmitted &&
            mouseX >= canvasWidth / 2 - 60 && mouseX <= canvasWidth / 2 + 60 &&
            mouseY >= btnY + 70 && mouseY <= btnY + 105) {
            quizSubmitted = true;
            return;
        }

        // Next button
        if (quizSubmitted && quizScenario < scenarios.length - 1 &&
            mouseX >= canvasWidth / 2 - 50 && mouseX <= canvasWidth / 2 + 50 &&
            mouseY >= btnY + 180 && mouseY <= btnY + 210) {
            quizScenario++;
            quizAnswer = '';
            quizSubmitted = false;
            return;
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
