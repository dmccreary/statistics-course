// Audience Communication Matcher MicroSim
// Drag-and-drop matching game for tailoring statistical communication to different audiences
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 750;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 14;

// Audiences
let audiences = [
    { name: 'Statistics Professor', short: 'Professor', x: 0, y: 0, width: 0, height: 50, matched: null },
    { name: 'Business Manager', short: 'Manager', x: 0, y: 0, width: 0, height: 50, matched: null },
    { name: 'Newspaper Reader', short: 'Reader', x: 0, y: 0, width: 0, height: 50, matched: null },
    { name: 'AP Exam Grader', short: 'Grader', x: 0, y: 0, width: 0, height: 50, matched: null }
];

// Scenarios with explanations (multiple rounds)
let scenarios = [
    {
        finding: 'A study comparing two teaching methods found a mean difference of 8 points (p = 0.02, 95% CI: 2.1 to 13.9 points)',
        explanations: [
            { text: 'We rejected H₀: μ₁ = μ₂ at α = 0.05 using a two-sample t-test. The 95% CI for μ₁ - μ₂ is (2.1, 13.9).', correctAudience: 0 },
            { text: 'Students using the new method scored 8 points higher on average. We\'re 95% confident the true improvement is between 2 and 14 points. This suggests the investment may be worthwhile.', correctAudience: 1 },
            { text: 'New teaching method boosts test scores! Students improved by about 8 points compared to traditional methods.', correctAudience: 2 },
            { text: 'Since p = 0.02 < 0.05, we reject H₀ and conclude there is convincing evidence of a difference in mean scores. The new method produced scores averaging 8 points higher.', correctAudience: 3 }
        ]
    },
    {
        finding: 'Survey of 400 customers found 65% prefer the new product design (95% CI: 60% to 70%)',
        explanations: [
            { text: 'The one-proportion z-interval for p yields (0.60, 0.70). Since the interval doesn\'t contain 0.50, we have evidence of a majority preference.', correctAudience: 0 },
            { text: 'Nearly two-thirds of customers prefer the new design. With 95% confidence, between 60% and 70% of all customers will prefer it. This supports moving forward with the redesign.', correctAudience: 1 },
            { text: 'Customers love the new look! About 65% prefer the redesigned product to the old version.', correctAudience: 2 },
            { text: 'We are 95% confident that the true proportion of all customers who prefer the new design is between 0.60 and 0.70. Since this interval is entirely above 0.50, there is convincing evidence that a majority prefers the new design.', correctAudience: 3 }
        ]
    },
    {
        finding: 'Clinical trial shows new treatment reduced symptoms by 35% (n = 200, p = 0.001, Cohen\'s d = 0.72)',
        explanations: [
            { text: 'The treatment effect was significant (t = 5.12, df = 198, p = 0.001) with a medium-to-large effect size (d = 0.72). Power analysis suggests adequate sample size.', correctAudience: 0 },
            { text: 'The new treatment reduced symptoms by 35% compared to placebo. This is a clinically meaningful improvement that could benefit patients, with strong statistical evidence supporting its effectiveness.', correctAudience: 1 },
            { text: 'New treatment cuts symptoms by more than a third! Researchers found significant improvement in patients using the new therapy.', correctAudience: 2 },
            { text: 'Since p = 0.001 < α = 0.05, we reject the null hypothesis. There is convincing evidence that the treatment reduces symptoms. The 35% reduction and effect size of d = 0.72 suggest this difference is both statistically and practically significant.', correctAudience: 3 }
        ]
    }
];

let currentScenario = 0;
let cards = [];
let draggedCard = null;
let dragOffset = { x: 0, y: 0 };
let score = 0;
let attempts = 0;
let showFeedback = false;
let feedbackMessage = '';
let feedbackCorrect = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    initializeRound();

    describe('Drag-and-drop matching game where students match statistical explanations to appropriate audiences. Different audiences require different communication styles, from technical jargon to plain language.', LABEL);
}

function initializeRound() {
    let scenario = scenarios[currentScenario];

    // Shuffle explanations
    cards = [];
    let shuffled = [...scenario.explanations];
    shuffleArray(shuffled);

    for (let i = 0; i < shuffled.length; i++) {
        cards.push({
            ...shuffled[i],
            x: margin + 20,
            y: 150 + i * 60,
            width: 320,
            height: 55,
            isPlaced: false,
            placedOn: null
        });
    }

    // Reset audience matches
    for (let a of audiences) {
        a.matched = null;
    }

    showFeedback = false;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function draw() {
    updateCanvasSize();
    updateLayout();

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
    text('Match the Explanation to the Audience', canvasWidth / 2, 10);
    textStyle(NORMAL);

    // Finding statement
    let scenario = scenarios[currentScenario];
    fill(60);
    textSize(11);
    textAlign(CENTER, TOP);
    textStyle(ITALIC);
    text('Finding: ' + truncateText(scenario.finding, canvasWidth - 60), canvasWidth / 2, 35);
    textStyle(NORMAL);

    // Instructions
    fill(100);
    textSize(10);
    text('Drag each explanation card to the appropriate audience box', canvasWidth / 2, 55);

    // Draw audience drop zones
    drawAudienceZones();

    // Draw explanation cards (unplaced first, then dragged on top)
    for (let card of cards) {
        if (card !== draggedCard && !card.isPlaced) {
            drawCard(card);
        }
    }

    // Draw placed cards
    for (let card of cards) {
        if (card !== draggedCard && card.isPlaced) {
            drawCard(card);
        }
    }

    // Draw dragged card on top
    if (draggedCard) {
        drawCard(draggedCard);
    }

    // Draw feedback if showing
    if (showFeedback) {
        drawFeedback();
    }

    // Draw score
    fill(30, 60, 100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text('Score: ' + score + '/' + attempts, margin, drawHeight - 30);

    // Round indicator
    textAlign(RIGHT, TOP);
    text('Round: ' + (currentScenario + 1) + '/' + scenarios.length, canvasWidth - margin, drawHeight - 30);

    // Draw controls
    drawControls();
}

function updateLayout() {
    // Audience zones on the right
    let zoneStartX = canvasWidth - margin - 200;
    let zoneStartY = 85;
    let zoneHeight = 75;
    let zoneWidth = 190;

    for (let i = 0; i < audiences.length; i++) {
        audiences[i].x = zoneStartX;
        audiences[i].y = zoneStartY + i * (zoneHeight + 8);
        audiences[i].width = zoneWidth;
        audiences[i].height = zoneHeight;
    }
}

function drawAudienceZones() {
    for (let i = 0; i < audiences.length; i++) {
        let a = audiences[i];

        // Zone background
        let hasCard = a.matched !== null;
        if (hasCard && showFeedback) {
            let card = cards.find(c => c.placedOn === i);
            if (card && card.correctAudience === i) {
                fill(200, 255, 200);
                stroke(76, 175, 80);
            } else {
                fill(255, 200, 200);
                stroke(244, 67, 54);
            }
        } else {
            fill(hasCard ? [230, 240, 250] : [240, 245, 250]);
            stroke(hasCard ? [100, 150, 200] : [180, 180, 180]);
        }

        strokeWeight(2);
        rect(a.x, a.y, a.width, a.height, 5);

        // Audience label
        fill(30, 60, 100);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(11);
        textStyle(BOLD);
        text(a.name, a.x + a.width / 2, a.y + 5);
        textStyle(NORMAL);

        // Drop hint if empty
        if (!hasCard) {
            fill(150);
            textSize(9);
            text('Drop explanation here', a.x + a.width / 2, a.y + 25);
        }
    }
}

function drawCard(card) {
    let x = card.x;
    let y = card.y;

    // Card shadow
    fill(0, 0, 0, 20);
    noStroke();
    rect(x + 3, y + 3, card.width, card.height, 5);

    // Card background
    if (card === draggedCard) {
        fill(255, 255, 230);
        stroke(200, 180, 100);
    } else if (showFeedback && card.isPlaced) {
        if (card.correctAudience === card.placedOn) {
            fill(230, 255, 230);
            stroke(76, 175, 80);
        } else {
            fill(255, 230, 230);
            stroke(244, 67, 54);
        }
    } else {
        fill(255, 255, 255);
        stroke(150);
    }

    strokeWeight(card === draggedCard ? 2 : 1);
    rect(x, y, card.width, card.height, 5);

    // Card text
    fill(50);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(9);

    let wrapped = wrapText(card.text, card.width - 15);
    text(wrapped, x + 8, y + 8);
}

function wrapText(txt, maxWidth) {
    let words = txt.split(' ');
    let lines = [];
    let currentLine = '';

    textSize(9);
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

    return lines.slice(0, 4).join('\n');
}

function truncateText(txt, maxWidth) {
    textSize(11);
    if (textWidth(txt) <= maxWidth) return txt;

    while (textWidth(txt + '...') > maxWidth && txt.length > 0) {
        txt = txt.slice(0, -1);
    }
    return txt + '...';
}

function drawFeedback() {
    let correctCount = 0;
    for (let card of cards) {
        if (card.isPlaced && card.correctAudience === card.placedOn) {
            correctCount++;
        }
    }

    let boxX = margin + 20;
    let boxY = drawHeight - 60;
    let boxWidth = 320;
    let boxHeight = 45;

    if (correctCount === 4) {
        fill(200, 255, 200);
        stroke(76, 175, 80);
    } else {
        fill(255, 240, 200);
        stroke(255, 152, 0);
    }

    strokeWeight(2);
    rect(boxX, boxY, boxWidth, boxHeight, 5);

    fill(40);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);

    if (correctCount === 4) {
        textStyle(BOLD);
        text('Perfect! All 4 matched correctly!', boxX + boxWidth / 2, boxY + boxHeight / 2);
        textStyle(NORMAL);
    } else {
        text(correctCount + '/4 correct. Green = correct, Red = incorrect', boxX + boxWidth / 2, boxY + boxHeight / 2);
    }
}

function drawControls() {
    let btnY = drawHeight + 20;

    // Check Answers button
    let checkX = canvasWidth / 2 - 140;
    let btnW = 120;
    let btnH = 35;

    let allPlaced = cards.every(c => c.isPlaced);
    let checkHover = mouseX >= checkX && mouseX <= checkX + btnW &&
                     mouseY >= btnY && mouseY <= btnY + btnH;

    fill(allPlaced ? (checkHover ? [60, 120, 60] : [76, 175, 80]) : [180, 180, 180]);
    stroke(allPlaced ? [50, 100, 50] : [150, 150, 150]);
    strokeWeight(1);
    rect(checkX, btnY, btnW, btnH, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('Check Answers', checkX + btnW / 2, btnY + btnH / 2);

    // Next Round button
    let nextX = canvasWidth / 2 + 20;
    let nextHover = mouseX >= nextX && mouseX <= nextX + btnW &&
                    mouseY >= btnY && mouseY <= btnY + btnH;

    fill(showFeedback ? (nextHover ? [50, 100, 150] : [70, 130, 180]) : [180, 180, 180]);
    stroke(showFeedback ? [40, 80, 120] : [150, 150, 150]);
    rect(nextX, btnY, btnW, btnH, 5);

    fill(255);
    text(currentScenario < scenarios.length - 1 ? 'Next Round' : 'Play Again', nextX + btnW / 2, btnY + btnH / 2);

    // Reset button
    let resetX = canvasWidth / 2 - 40;
    let resetY = btnY + 42;
    let resetHover = mouseX >= resetX && mouseX <= resetX + 80 &&
                     mouseY >= resetY && mouseY <= resetY + 25;

    fill(resetHover ? [150, 150, 180] : [180, 180, 200]);
    stroke(140);
    rect(resetX, resetY, 80, 25, 3);

    fill(60);
    textSize(10);
    text('Reset Cards', resetX + 40, resetY + 12);
}

function mousePressed() {
    // Check card drag start
    for (let i = cards.length - 1; i >= 0; i--) {
        let card = cards[i];
        if (mouseX >= card.x && mouseX <= card.x + card.width &&
            mouseY >= card.y && mouseY <= card.y + card.height) {
            draggedCard = card;
            dragOffset.x = mouseX - card.x;
            dragOffset.y = mouseY - card.y;

            // Remove from audience if placed
            if (card.isPlaced) {
                audiences[card.placedOn].matched = null;
                card.isPlaced = false;
                card.placedOn = null;
            }

            // Move to end of array (draw on top)
            cards.splice(i, 1);
            cards.push(card);

            showFeedback = false;
            return;
        }
    }

    // Check buttons
    let btnY = drawHeight + 20;
    let btnW = 120;
    let btnH = 35;

    // Check Answers button
    let checkX = canvasWidth / 2 - 140;
    if (mouseX >= checkX && mouseX <= checkX + btnW &&
        mouseY >= btnY && mouseY <= btnY + btnH) {
        let allPlaced = cards.every(c => c.isPlaced);
        if (allPlaced && !showFeedback) {
            showFeedback = true;
            let correctCount = cards.filter(c => c.correctAudience === c.placedOn).length;
            score += correctCount;
            attempts += 4;
        }
        return;
    }

    // Next Round button
    let nextX = canvasWidth / 2 + 20;
    if (mouseX >= nextX && mouseX <= nextX + btnW &&
        mouseY >= btnY && mouseY <= btnY + btnH) {
        if (showFeedback) {
            if (currentScenario < scenarios.length - 1) {
                currentScenario++;
            } else {
                currentScenario = 0;
                score = 0;
                attempts = 0;
            }
            initializeRound();
        }
        return;
    }

    // Reset button
    let resetX = canvasWidth / 2 - 40;
    let resetY = btnY + 42;
    if (mouseX >= resetX && mouseX <= resetX + 80 &&
        mouseY >= resetY && mouseY <= resetY + 25) {
        initializeRound();
        return;
    }
}

function mouseDragged() {
    if (draggedCard) {
        draggedCard.x = mouseX - dragOffset.x;
        draggedCard.y = mouseY - dragOffset.y;
    }
}

function mouseReleased() {
    if (draggedCard) {
        // Check if dropped on an audience zone
        let placed = false;
        for (let i = 0; i < audiences.length; i++) {
            let a = audiences[i];
            if (mouseX >= a.x && mouseX <= a.x + a.width &&
                mouseY >= a.y && mouseY <= a.y + a.height) {
                // Check if zone is empty
                if (a.matched === null) {
                    draggedCard.x = a.x + 5;
                    draggedCard.y = a.y + 22;
                    draggedCard.width = a.width - 10;
                    draggedCard.isPlaced = true;
                    draggedCard.placedOn = i;
                    a.matched = draggedCard;
                    placed = true;
                }
                break;
            }
        }

        // If not placed on a zone, return to left side
        if (!placed) {
            let index = cards.indexOf(draggedCard);
            let unplacedCards = cards.filter(c => !c.isPlaced);
            let cardIndex = unplacedCards.indexOf(draggedCard);

            draggedCard.x = margin + 20;
            draggedCard.y = 150 + cardIndex * 60;
            draggedCard.width = 320;
            draggedCard.isPlaced = false;
            draggedCard.placedOn = null;
        }

        draggedCard = null;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    initializeRound();
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = min(containerWidth, 850);
    if (canvasWidth < 700) canvasWidth = 700;
}
