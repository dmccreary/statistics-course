// Survey Design Checklist Interactive MicroSim
// Students evaluate survey scenarios and identify problems
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 15;
let defaultTextSize = 14;

// Survey scenarios with problems
let scenarios = [
    {
        title: "Magazine Reader Survey",
        description: "A magazine wants to know readers' opinions about its new format. They include a survey card in the magazine asking readers to mail it back.",
        problems: {
            sampling: "Voluntary response sample",
            wording: null,
            coverage: "Only reaches current subscribers",
            nonresponse: "Only those with strong opinions respond"
        },
        correctIssues: ["voluntary", "nonresponse"],
        explanation: "This is a classic voluntary response bias scenario. Only readers who feel strongly (love it or hate it) will bother mailing the card back, giving unrepresentative results."
    },
    {
        title: "Teen Social Media Study",
        description: "A researcher studies teen social media use by surveying students at an elite private school in a wealthy neighborhood during lunch period.",
        problems: {
            sampling: "Convenience sample",
            wording: null,
            coverage: "Missing most teens (only one school)",
            nonresponse: null
        },
        correctIssues: ["convenience", "undercoverage"],
        explanation: "Elite private school students may have different social media habits than the general teen population. This is both a convenience sample and severe undercoverage."
    },
    {
        title: "Political Opinion Poll",
        description: "A political poll asks: 'Do you support the reckless spending bill that will burden future generations with massive debt?'",
        problems: {
            sampling: null,
            wording: "Loaded/leading question",
            coverage: null,
            nonresponse: null
        },
        correctIssues: ["loaded", "leading"],
        explanation: "The words 'reckless,' 'burden,' and 'massive debt' are emotionally charged and push respondents toward a negative answer regardless of their actual views on the policy."
    },
    {
        title: "Community Health Survey",
        description: "A health department conducts a phone survey on landlines only, in English only, during weekday business hours, about healthcare access in a diverse multilingual community.",
        problems: {
            sampling: null,
            wording: null,
            coverage: "Missing cell-only, non-English speakers",
            nonresponse: "Working adults can't answer during business hours"
        },
        correctIssues: ["undercoverage", "nonresponse", "timing"],
        explanation: "This survey has multiple undercoverage issues: young adults with only cell phones, non-English speakers, and working adults who aren't home during business hours. These groups may have the most healthcare access issues!"
    }
];

let currentScenarioIndex = 0;
let selectedIssues = [];
let showingFeedback = false;
let feedbackCorrect = false;

// Checklist items
let checklistItems = [
    { id: "convenience", label: "Convenience Sample", category: "Sampling" },
    { id: "voluntary", label: "Voluntary Response", category: "Sampling" },
    { id: "undercoverage", label: "Undercoverage", category: "Coverage" },
    { id: "nonresponse", label: "Nonresponse Bias", category: "Coverage" },
    { id: "timing", label: "Bad Timing/Access", category: "Coverage" },
    { id: "loaded", label: "Loaded Language", category: "Wording" },
    { id: "leading", label: "Leading Question", category: "Wording" },
    { id: "double", label: "Double-Barreled", category: "Wording" }
];

// Button positions
let checkButtonX, checkButtonY;
let nextButtonX, prevButtonX;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    describe('Interactive survey design evaluation tool. Students read survey scenarios, identify problems from a checklist, and receive feedback on their analysis.', LABEL);
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
    text('Survey Design Checklist', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Progress indicator
    fill(100);
    textSize(11);
    text('Scenario ' + (currentScenarioIndex + 1) + ' of ' + scenarios.length, canvasWidth / 2, 28);

    // Draw scenario
    drawScenario();

    // Draw checklist
    drawChecklist();

    // Draw feedback or instructions
    if (showingFeedback) {
        drawFeedback();
    } else {
        drawInstructions();
    }

    // Draw controls
    drawControls();
}

function drawScenario() {
    let scenario = scenarios[currentScenarioIndex];

    let boxX = margin;
    let boxY = 45;
    let boxWidth = canvasWidth - margin * 2;
    let boxHeight = 100;

    // Scenario box
    fill(255, 255, 255);
    stroke(150);
    strokeWeight(1);
    rect(boxX, boxY, boxWidth, boxHeight, 5);

    // Title
    fill(30, 60, 100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text(scenario.title, boxX + 10, boxY + 10);
    textStyle(NORMAL);

    // Description
    fill(40);
    textSize(12);
    text(scenario.description, boxX + 10, boxY + 32, boxWidth - 20, boxHeight - 40);
}

function drawChecklist() {
    let checklistX = margin;
    let checklistY = 155;
    let checklistWidth = canvasWidth - margin * 2;
    let checklistHeight = 180;

    // Checklist box
    fill(255, 255, 255);
    stroke(150);
    strokeWeight(1);
    rect(checklistX, checklistY, checklistWidth, checklistHeight, 5);

    // Title
    fill(30, 100, 60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Identify Problems (select all that apply):', checklistX + 10, checklistY + 8);
    textStyle(NORMAL);

    // Draw checklist items in columns
    let col1X = checklistX + 15;
    let col2X = checklistX + checklistWidth / 3 + 10;
    let col3X = checklistX + checklistWidth * 2 / 3 + 5;

    let itemY = checklistY + 35;
    let itemHeight = 28;

    // Column headers
    fill(80);
    textSize(10);
    textStyle(BOLD);
    text('Sampling Method', col1X, itemY - 15);
    text('Coverage Issues', col2X, itemY - 15);
    text('Question Wording', col3X, itemY - 15);
    textStyle(NORMAL);

    // Draw items by category
    let samplingItems = checklistItems.filter(i => i.category === 'Sampling');
    let coverageItems = checklistItems.filter(i => i.category === 'Coverage');
    let wordingItems = checklistItems.filter(i => i.category === 'Wording');

    // Sampling column
    for (let i = 0; i < samplingItems.length; i++) {
        drawChecklistItem(samplingItems[i], col1X, itemY + i * itemHeight);
    }

    // Coverage column
    for (let i = 0; i < coverageItems.length; i++) {
        drawChecklistItem(coverageItems[i], col2X, itemY + i * itemHeight);
    }

    // Wording column
    for (let i = 0; i < wordingItems.length; i++) {
        drawChecklistItem(wordingItems[i], col3X, itemY + i * itemHeight);
    }
}

function drawChecklistItem(item, x, y) {
    let isSelected = selectedIssues.includes(item.id);
    let boxSize = 18;

    // Checkbox
    if (isSelected) {
        fill(70, 150, 100);
        stroke(50, 120, 80);
    } else {
        fill(255);
        stroke(150);
    }
    strokeWeight(1);
    rect(x, y, boxSize, boxSize, 3);

    // Checkmark
    if (isSelected) {
        stroke(255);
        strokeWeight(2);
        line(x + 4, y + 9, x + 7, y + 13);
        line(x + 7, y + 13, x + 14, y + 5);
    }

    // Label
    fill(showingFeedback ? 150 : 40);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text(item.label, x + boxSize + 8, y + boxSize / 2);

    // Store position for click detection
    item.boxX = x;
    item.boxY = y;
    item.boxSize = boxSize;
}

function drawInstructions() {
    let instrY = 345;

    fill(100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    text('Read the scenario above and check all the problems you can identify.', canvasWidth / 2, instrY);
    text('Then click "Check Answers" to see if you found them all!', canvasWidth / 2, instrY + 16);
}

function drawFeedback() {
    let scenario = scenarios[currentScenarioIndex];

    let feedbackY = 345;
    let feedbackHeight = drawHeight - feedbackY - 10;

    // Feedback box
    if (feedbackCorrect) {
        fill(240, 255, 240);
        stroke(100, 180, 100);
    } else {
        fill(255, 248, 240);
        stroke(200, 150, 100);
    }
    strokeWeight(1);
    rect(margin, feedbackY, canvasWidth - margin * 2, feedbackHeight, 5);

    // Result header
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);

    if (feedbackCorrect) {
        fill(50, 130, 70);
        text('Correct! You identified all the key issues.', margin + 10, feedbackY + 10);
    } else {
        fill(180, 100, 50);
        text('Not quite! Let\'s review the issues:', margin + 10, feedbackY + 10);
    }
    textStyle(NORMAL);

    // Show correct answers
    fill(60);
    textSize(11);
    let correctLabels = scenario.correctIssues.map(id => {
        let item = checklistItems.find(i => i.id === id);
        return item ? item.label : id;
    });
    text('Key issues: ' + correctLabels.join(', '), margin + 10, feedbackY + 30);

    // Explanation
    fill(80);
    textSize(10);
    text(scenario.explanation, margin + 10, feedbackY + 50, canvasWidth - margin * 2 - 20, 80);

    // Score
    let foundCount = 0;
    for (let issue of scenario.correctIssues) {
        if (selectedIssues.includes(issue)) foundCount++;
    }

    fill(100);
    textAlign(RIGHT, TOP);
    textSize(10);
    text('You found ' + foundCount + ' of ' + scenario.correctIssues.length + ' issues', canvasWidth - margin - 10, feedbackY + 10);
}

function drawControls() {
    let buttonWidth = 100;
    let buttonHeight = 30;

    // Previous button
    prevButtonX = margin;
    let buttonY = drawHeight + 10;

    let canGoPrev = currentScenarioIndex > 0;
    if (canGoPrev) {
        fill(100, 120, 150);
        stroke(80, 100, 130);
    } else {
        fill(200);
        stroke(180);
    }
    strokeWeight(1);
    rect(prevButtonX, buttonY, 80, buttonHeight, 5);

    fill(canGoPrev ? 255 : 150);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('← Previous', prevButtonX + 40, buttonY + buttonHeight / 2);

    // Check Answers button
    checkButtonX = margin + 90;
    checkButtonY = buttonY;

    if (!showingFeedback) {
        fill(80, 150, 80);
        stroke(60, 120, 60);
    } else {
        fill(180);
        stroke(160);
    }
    strokeWeight(1);
    rect(checkButtonX, checkButtonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    text('Check Answers', checkButtonX + buttonWidth / 2, checkButtonY + buttonHeight / 2);

    // Try Again button (only when showing feedback)
    if (showingFeedback) {
        let tryAgainX = checkButtonX + buttonWidth + 10;
        fill(100, 80, 150);
        stroke(80, 60, 130);
        strokeWeight(1);
        rect(tryAgainX, buttonY, 80, buttonHeight, 5);

        fill(255);
        noStroke();
        text('Try Again', tryAgainX + 40, buttonY + buttonHeight / 2);
    }

    // Next button
    nextButtonX = canvasWidth - margin - 80;

    let canGoNext = currentScenarioIndex < scenarios.length - 1;
    if (canGoNext) {
        fill(100, 120, 150);
        stroke(80, 100, 130);
    } else {
        fill(200);
        stroke(180);
    }
    strokeWeight(1);
    rect(nextButtonX, buttonY, 80, buttonHeight, 5);

    fill(canGoNext ? 255 : 150);
    noStroke();
    text('Next →', nextButtonX + 40, buttonY + buttonHeight / 2);

    // Progress dots
    let dotY = buttonY + buttonHeight / 2;
    let dotStartX = canvasWidth / 2 - (scenarios.length * 15) / 2;

    for (let i = 0; i < scenarios.length; i++) {
        if (i === currentScenarioIndex) {
            fill(70, 130, 180);
        } else {
            fill(200);
        }
        noStroke();
        circle(dotStartX + i * 15, dotY, 8);
    }
}

function mousePressed() {
    let buttonHeight = 30;
    let buttonY = drawHeight + 10;

    // Check checklist items (only if not showing feedback)
    if (!showingFeedback) {
        for (let item of checklistItems) {
            if (item.boxX !== undefined) {
                if (mouseX >= item.boxX && mouseX <= item.boxX + item.boxSize + 80 &&
                    mouseY >= item.boxY && mouseY <= item.boxY + item.boxSize) {
                    toggleIssue(item.id);
                    return;
                }
            }
        }
    }

    // Previous button
    if (mouseX >= prevButtonX && mouseX <= prevButtonX + 80 &&
        mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
        if (currentScenarioIndex > 0) {
            currentScenarioIndex--;
            resetScenario();
        }
        return;
    }

    // Check Answers button
    if (!showingFeedback) {
        if (mouseX >= checkButtonX && mouseX <= checkButtonX + 100 &&
            mouseY >= checkButtonY && mouseY <= checkButtonY + buttonHeight) {
            checkAnswers();
            return;
        }
    }

    // Try Again button
    if (showingFeedback) {
        let tryAgainX = checkButtonX + 110;
        if (mouseX >= tryAgainX && mouseX <= tryAgainX + 80 &&
            mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
            resetScenario();
            return;
        }
    }

    // Next button
    if (mouseX >= nextButtonX && mouseX <= nextButtonX + 80 &&
        mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
        if (currentScenarioIndex < scenarios.length - 1) {
            currentScenarioIndex++;
            resetScenario();
        }
        return;
    }
}

function toggleIssue(issueId) {
    let index = selectedIssues.indexOf(issueId);
    if (index === -1) {
        selectedIssues.push(issueId);
    } else {
        selectedIssues.splice(index, 1);
    }
}

function checkAnswers() {
    let scenario = scenarios[currentScenarioIndex];

    // Check if all correct issues are selected and no extras
    let allCorrect = true;

    // Check all required issues are selected
    for (let issue of scenario.correctIssues) {
        if (!selectedIssues.includes(issue)) {
            allCorrect = false;
            break;
        }
    }

    // Check no extra incorrect issues selected
    if (allCorrect) {
        for (let selected of selectedIssues) {
            if (!scenario.correctIssues.includes(selected)) {
                allCorrect = false;
                break;
            }
        }
    }

    feedbackCorrect = allCorrect;
    showingFeedback = true;
}

function resetScenario() {
    selectedIssues = [];
    showingFeedback = false;
    feedbackCorrect = false;
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
