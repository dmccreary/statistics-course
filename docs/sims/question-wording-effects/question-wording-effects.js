// Question Wording Effects Simulator MicroSim
// Demonstrates how question wording affects survey responses
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 650;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 15;
let defaultTextSize = 14;

// Topics with three question versions each
let topics = [
    {
        name: "Environmental Policy",
        neutral: "What is your opinion on government environmental regulations?",
        positive: "Do you support protecting our children's future through environmental safeguards?",
        negative: "Do you support burdensome environmental regulations that hurt businesses?",
        keywords: {
            neutral: [],
            positive: ["protecting", "children's future", "safeguards"],
            negative: ["burdensome", "hurt businesses"]
        },
        baseSupport: 55,
        positiveBoost: 20,
        negativeBoost: -25
    },
    {
        name: "School Rules",
        neutral: "What is your opinion on the new school dress code policy?",
        positive: "Do you support guidelines that promote a focused learning environment?",
        negative: "Do you support restrictive rules that limit students' personal expression?",
        keywords: {
            neutral: [],
            positive: ["promote", "focused learning environment"],
            negative: ["restrictive", "limit", "personal expression"]
        },
        baseSupport: 50,
        positiveBoost: 18,
        negativeBoost: -22
    },
    {
        name: "Technology Use",
        neutral: "What is your opinion on phone policies in classrooms?",
        positive: "Do you support helping students focus by managing digital distractions?",
        negative: "Do you support banning students' personal devices and limiting their access to information?",
        keywords: {
            neutral: [],
            positive: ["helping", "focus", "managing"],
            negative: ["banning", "limiting", "access"]
        },
        baseSupport: 52,
        positiveBoost: 22,
        negativeBoost: -20
    },
    {
        name: "Free Speech",
        neutral: "What is your opinion on regulating online speech?",
        positive: "Do you support reducing harmful content and protecting vulnerable users online?",
        negative: "Do you support government censorship that restricts free expression online?",
        keywords: {
            neutral: [],
            positive: ["reducing harmful", "protecting", "vulnerable users"],
            negative: ["censorship", "restricts", "free expression"]
        },
        baseSupport: 48,
        positiveBoost: 25,
        negativeBoost: -30
    }
];

let currentTopicIndex = 0;
let currentVersion = 'neutral'; // 'neutral', 'positive', 'negative'
let surveyResults = null;
let showingComparison = false;

// Button positions
let topicButtonY;
let versionButtonY;
let sendButtonX, sendButtonY;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    describe('Interactive simulation showing how question wording affects survey responses. Students select different framings of the same question and observe how support levels change dramatically.', LABEL);
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
    text('Question Wording Effects', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Draw topic selector
    drawTopicSelector();

    // Draw question display
    drawQuestionDisplay();

    // Draw version selector
    drawVersionSelector();

    // Draw results
    if (surveyResults !== null) {
        if (showingComparison) {
            drawComparison();
        } else {
            drawResults();
        }
    }

    // Draw controls
    drawControls();
}

function drawTopicSelector() {
    let selectorY = 35;

    fill(60);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Select Topic:', margin, selectorY + 12);

    let buttonX = margin + 85;
    let buttonWidth = 120;
    let buttonHeight = 24;

    for (let i = 0; i < topics.length; i++) {
        let x = buttonX + i * (buttonWidth + 5);

        if (x + buttonWidth > canvasWidth - margin) {
            // Wrap to next row if needed
            break;
        }

        let isSelected = (i === currentTopicIndex);

        if (isSelected) {
            fill(70, 130, 180);
            stroke(50, 100, 150);
        } else {
            fill(220, 225, 230);
            stroke(180);
        }
        strokeWeight(1);
        rect(x, selectorY, buttonWidth, buttonHeight, 4);

        fill(isSelected ? 255 : 60);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        text(topics[i].name, x + buttonWidth / 2, selectorY + buttonHeight / 2);
    }

    topicButtonY = selectorY;
}

function drawQuestionDisplay() {
    let topic = topics[currentTopicIndex];
    let question = '';

    if (currentVersion === 'neutral') {
        question = topic.neutral;
    } else if (currentVersion === 'positive') {
        question = topic.positive;
    } else {
        question = topic.negative;
    }

    let boxX = margin;
    let boxY = 70;
    let boxWidth = canvasWidth - margin * 2;
    let boxHeight = 80;

    // Question box
    fill(255, 255, 255);
    stroke(150);
    strokeWeight(1);
    rect(boxX, boxY, boxWidth, boxHeight, 5);

    // Label
    fill(30, 60, 100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Survey Question (' + getVersionLabel() + '):', boxX + 10, boxY + 8);
    textStyle(NORMAL);

    // Question text with keyword highlighting
    let keywords = topic.keywords[currentVersion];
    drawHighlightedText(question, keywords, boxX + 10, boxY + 28, boxWidth - 20);
}

function drawHighlightedText(text, keywords, x, y, maxWidth) {
    textSize(13);
    textAlign(LEFT, TOP);

    // For simplicity, just draw the text with keywords noted below
    fill(30);
    text('"' + text + '"', x, y, maxWidth, 50);

    // Highlight keywords below
    if (keywords.length > 0) {
        let highlightY = y + 45;
        fill(currentVersion === 'positive' ? [60, 140, 80] : [180, 80, 80]);
        textSize(10);
        textStyle(ITALIC);
        text('Key framing words: ' + keywords.join(', '), x, highlightY);
        textStyle(NORMAL);
    }
}

function getVersionLabel() {
    if (currentVersion === 'neutral') return 'Neutral';
    if (currentVersion === 'positive') return 'Positive Frame';
    return 'Negative Frame';
}

function drawVersionSelector() {
    versionButtonY = 160;

    fill(60);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Question Framing:', margin, versionButtonY + 12);

    let buttonX = margin + 115;
    let buttonWidth = 110;
    let buttonHeight = 24;

    let versions = [
        { id: 'neutral', label: 'Neutral', color: [100, 120, 140] },
        { id: 'positive', label: 'Positive Frame', color: [60, 140, 80] },
        { id: 'negative', label: 'Negative Frame', color: [180, 80, 80] }
    ];

    for (let i = 0; i < versions.length; i++) {
        let v = versions[i];
        let x = buttonX + i * (buttonWidth + 10);
        let isSelected = (currentVersion === v.id);

        if (isSelected) {
            fill(v.color[0], v.color[1], v.color[2]);
            stroke(v.color[0] - 30, v.color[1] - 30, v.color[2] - 30);
        } else {
            fill(220, 225, 230);
            stroke(180);
        }
        strokeWeight(1);
        rect(x, versionButtonY, buttonWidth, buttonHeight, 4);

        fill(isSelected ? 255 : 60);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        text(v.label, x + buttonWidth / 2, versionButtonY + buttonHeight / 2);
    }
}

function drawResults() {
    let resultsY = 200;
    let resultsHeight = drawHeight - resultsY - 10;

    // Results panel
    fill(255, 255, 255, 250);
    stroke(150);
    strokeWeight(1);
    rect(margin, resultsY, canvasWidth - margin * 2, resultsHeight, 5);

    // Title
    fill(30, 100, 60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Simulated Survey Results (n=500)', margin + 10, resultsY + 8);
    textStyle(NORMAL);

    // Bar chart
    let barY = resultsY + 35;
    let barMaxWidth = (canvasWidth - margin * 4) * 0.6;
    let barHeight = 30;

    // Support bar
    let supportWidth = map(surveyResults.support, 0, 100, 0, barMaxWidth);
    fill(70, 150, 100);
    noStroke();
    rect(margin + 80, barY, supportWidth, barHeight, 3);

    fill(60);
    textAlign(RIGHT, CENTER);
    textSize(11);
    text('Support:', margin + 75, barY + barHeight / 2);

    fill(30);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(14);
    text(surveyResults.support.toFixed(0) + '%', margin + 85 + supportWidth + 5, barY + barHeight / 2);
    textStyle(NORMAL);

    // Oppose bar
    let opposeY = barY + barHeight + 10;
    let opposeWidth = map(surveyResults.oppose, 0, 100, 0, barMaxWidth);
    fill(180, 100, 100);
    noStroke();
    rect(margin + 80, opposeY, opposeWidth, barHeight, 3);

    fill(60);
    textAlign(RIGHT, CENTER);
    textSize(11);
    text('Oppose:', margin + 75, opposeY + barHeight / 2);

    fill(30);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(14);
    text(surveyResults.oppose.toFixed(0) + '%', margin + 85 + opposeWidth + 5, opposeY + barHeight / 2);
    textStyle(NORMAL);

    // Explanation
    let explainY = opposeY + barHeight + 20;
    fill(80);
    textSize(11);
    textAlign(LEFT, TOP);

    let explanation = getExplanation();
    text(explanation, margin + 10, explainY, canvasWidth - margin * 2 - 20, 60);

    // Compare all button hint
    fill(100);
    textSize(10);
    textAlign(CENTER, TOP);
    text('Click "Compare All" to see how all three framings affect responses', canvasWidth / 2, drawHeight - 30);
}

function drawComparison() {
    let topic = topics[currentTopicIndex];
    let resultsY = 200;
    let resultsHeight = drawHeight - resultsY - 10;

    // Results panel
    fill(255, 255, 255, 250);
    stroke(150);
    strokeWeight(1);
    rect(margin, resultsY, canvasWidth - margin * 2, resultsHeight, 5);

    // Title
    fill(80, 60, 100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Comparison: Same Topic, Different Wording', margin + 10, resultsY + 8);
    textStyle(NORMAL);

    // Three bars
    let barY = resultsY + 35;
    let barMaxWidth = (canvasWidth - margin * 4) * 0.55;
    let barHeight = 25;
    let barSpacing = 35;

    let versions = [
        { label: 'Neutral', support: topic.baseSupport, color: [100, 120, 140] },
        { label: 'Positive', support: topic.baseSupport + topic.positiveBoost, color: [60, 140, 80] },
        { label: 'Negative', support: topic.baseSupport + topic.negativeBoost, color: [180, 80, 80] }
    ];

    for (let i = 0; i < versions.length; i++) {
        let v = versions[i];
        let y = barY + i * barSpacing;

        // Label
        fill(60);
        textAlign(RIGHT, CENTER);
        textSize(10);
        text(v.label + ':', margin + 60, y + barHeight / 2);

        // Bar
        let barWidth = map(v.support, 0, 100, 0, barMaxWidth);
        fill(v.color[0], v.color[1], v.color[2]);
        noStroke();
        rect(margin + 65, y, barWidth, barHeight, 3);

        // Percentage
        fill(30);
        textAlign(LEFT, CENTER);
        textStyle(BOLD);
        textSize(12);
        text(v.support.toFixed(0) + '%', margin + 70 + barWidth + 5, y + barHeight / 2);
        textStyle(NORMAL);
    }

    // Difference calculation
    let diffY = barY + 3 * barSpacing + 10;
    fill(30, 60, 100);
    textSize(12);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    let swing = (topic.baseSupport + topic.positiveBoost) - (topic.baseSupport + topic.negativeBoost);
    text('Total swing from wording alone: ' + swing + ' percentage points!', margin + 10, diffY);
    textStyle(NORMAL);

    // Insight
    fill(80);
    textSize(11);
    text('The underlying opinion didn\'t change—only how we asked the question.', margin + 10, diffY + 20);
    text('This is why survey wording must be carefully evaluated for bias.', margin + 10, diffY + 35);
}

function getExplanation() {
    let topic = topics[currentTopicIndex];

    if (currentVersion === 'neutral') {
        return 'Neutral wording aims to present the topic without emotional language that might push respondents toward a particular answer.';
    } else if (currentVersion === 'positive') {
        return 'Positive framing uses words like "' + topic.keywords.positive.slice(0, 2).join('", "') + '" that appeal to values most people support, increasing apparent agreement.';
    } else {
        return 'Negative framing uses words like "' + topic.keywords.negative.slice(0, 2).join('", "') + '" that trigger resistance, decreasing apparent support for the same policy.';
    }
}

function drawControls() {
    let buttonWidth = 100;
    let buttonHeight = 30;

    sendButtonX = margin;
    sendButtonY = drawHeight + 10;

    // Send Survey button
    fill(80, 150, 80);
    stroke(60, 120, 60);
    strokeWeight(1);
    rect(sendButtonX, sendButtonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Send Survey', sendButtonX + buttonWidth / 2, sendButtonY + buttonHeight / 2);

    // Compare All button
    let compareX = sendButtonX + buttonWidth + 15;
    fill(100, 80, 150);
    stroke(80, 60, 120);
    strokeWeight(1);
    rect(compareX, sendButtonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    text('Compare All', compareX + buttonWidth / 2, sendButtonY + buttonHeight / 2);

    // Reset button
    let resetX = compareX + buttonWidth + 15;
    fill(180, 100, 80);
    stroke(150, 80, 60);
    strokeWeight(1);
    rect(resetX, sendButtonY, 80, buttonHeight, 5);

    fill(255);
    noStroke();
    text('Reset', resetX + 40, sendButtonY + buttonHeight / 2);

    // Instructions
    fill(80);
    textSize(10);
    textAlign(LEFT, CENTER);
    text('Select a topic and framing, then send the survey', resetX + 95, sendButtonY + buttonHeight / 2);
}

function mousePressed() {
    let buttonWidth = 120;
    let buttonHeight = 24;

    // Topic buttons
    if (mouseY >= topicButtonY && mouseY <= topicButtonY + buttonHeight) {
        let buttonX = margin + 85;
        for (let i = 0; i < topics.length; i++) {
            let x = buttonX + i * (buttonWidth + 5);
            if (mouseX >= x && mouseX <= x + buttonWidth) {
                currentTopicIndex = i;
                surveyResults = null;
                showingComparison = false;
                return;
            }
        }
    }

    // Version buttons
    buttonWidth = 110;
    if (mouseY >= versionButtonY && mouseY <= versionButtonY + buttonHeight) {
        let buttonX = margin + 115;
        let versions = ['neutral', 'positive', 'negative'];
        for (let i = 0; i < versions.length; i++) {
            let x = buttonX + i * (buttonWidth + 10);
            if (mouseX >= x && mouseX <= x + buttonWidth) {
                currentVersion = versions[i];
                surveyResults = null;
                showingComparison = false;
                return;
            }
        }
    }

    // Control buttons
    buttonWidth = 100;
    let buttonHeight2 = 30;

    // Send Survey
    if (mouseX >= sendButtonX && mouseX <= sendButtonX + buttonWidth &&
        mouseY >= sendButtonY && mouseY <= sendButtonY + buttonHeight2) {
        runSurvey();
        showingComparison = false;
        return;
    }

    // Compare All
    let compareX = sendButtonX + buttonWidth + 15;
    if (mouseX >= compareX && mouseX <= compareX + buttonWidth &&
        mouseY >= sendButtonY && mouseY <= sendButtonY + buttonHeight2) {
        showingComparison = true;
        surveyResults = { support: 0, oppose: 0 }; // Just to trigger results display
        return;
    }

    // Reset
    let resetX = compareX + buttonWidth + 15;
    if (mouseX >= resetX && mouseX <= resetX + 80 &&
        mouseY >= sendButtonY && mouseY <= sendButtonY + buttonHeight2) {
        surveyResults = null;
        showingComparison = false;
        return;
    }
}

function runSurvey() {
    let topic = topics[currentTopicIndex];

    let support = topic.baseSupport;
    if (currentVersion === 'positive') {
        support += topic.positiveBoost;
    } else if (currentVersion === 'negative') {
        support += topic.negativeBoost;
    }

    // Add some random variation
    support += random(-3, 3);
    support = constrain(support, 5, 95);

    surveyResults = {
        support: support,
        oppose: 100 - support
    };
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = min(containerWidth, 800);
    if (canvasWidth < 650) canvasWidth = 650;
}
