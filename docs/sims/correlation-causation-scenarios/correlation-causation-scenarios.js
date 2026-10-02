// Correlation vs Causation Scenarios MicroSim
// CANVAS_HEIGHT: 540
// Students classify real-world correlations as "X causes Y", "Y causes X",
// or "a third variable causes both" and get immediate feedback.
// Bloom Level: Apply (L3) - classify
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;

let margin = 20;
let defaultTextSize = 15;

// Sylvia theme colors
const sylviaGreen = '#2E7D32';
const sylviaGreenDark = '#1B5E20';
const sylviaAuburn = '#B5651D';
const sylviaCream = '#FFF8E1';
const goodColor = '#2E7D32';
const badColor = '#C62828';
const neutralColor = '#546E7A';
const observedBlue = '#1565C0';

// Scenario bank. answer: 'XY' (X causes Y), 'YX' (Y causes X), 'Z' (third variable)
const scenarios = [
    {
        x: 'Ice cream sales', y: 'Drowning deaths', z: 'Hot summer weather', answer: 'Z',
        text: 'In months when ice cream sales are high, drowning deaths are also high.',
        why: 'Hot weather drives both: it sends people out to buy ice cream AND into the water to swim. Banning ice cream would not prevent a single drowning.'
    },
    {
        x: 'Books owned', y: 'Income', z: 'Education level', answer: 'Z',
        text: 'People who own more books tend to have higher incomes.',
        why: 'More education tends to lead to both a bigger bookshelf and a bigger paycheck. Buying a pile of books will not raise your salary.'
    },
    {
        x: 'Shoe size', y: 'Reading ability', z: 'Age', answer: 'Z',
        text: 'Among elementary school children, kids with bigger shoe sizes read better.',
        why: 'Older children have bigger feet AND more years of reading practice. Age drives both variables. Big shoes do not teach anyone to read.'
    },
    {
        x: 'Firefighters sent', y: 'Fire damage', z: 'Size of the fire', answer: 'Z',
        text: 'The more firefighters that are sent to a fire, the more damage the fire does.',
        why: 'Bigger fires call for more firefighters and also cause more damage. The size of the fire drives both. Sending fewer firefighters would not reduce the damage.'
    },
    {
        x: 'Coffee drinking', y: 'Heart disease', z: 'Smoking', answer: 'Z',
        text: 'In an observational study that did not record smoking, coffee drinkers had more heart disease.',
        why: 'Smokers are more likely to drink coffee, and smoking causes heart disease. Unless the study accounts for smoking, coffee gets blamed for what smoking did.'
    },
    {
        x: 'Acorns collected', y: 'Birds spotted', z: 'Sunny weather', answer: 'Z',
        text: 'On days when Acorn Archie collects more acorns, he also spots more birds in the trees.',
        why: 'Sunny days bring out both the acorns and the birds. Archie is not attracting birds. He is just observing them on nice days.'
    },
    {
        x: 'Cigarettes per day', y: 'Lung cancer risk', answer: 'XY',
        text: 'People who smoke more cigarettes per day have a higher risk of lung cancer.',
        why: 'This one is real cause and effect. Decades of evidence from many kinds of studies show that smoking causes lung cancer.'
    },
    {
        x: 'Outdoor temperature', y: 'Ice cream sales', answer: 'XY',
        text: 'On hotter days, an ice cream shop sells more ice cream.',
        why: 'Heat makes people want something cold, so higher temperatures drive sales. Selling more ice cream certainly does not heat up the day.'
    },
    {
        x: 'Fertilizer amount', y: 'Plant height', answer: 'XY',
        text: 'In an experiment, plants randomly assigned to get more fertilizer grew taller.',
        why: 'Random assignment balanced the other factors across the groups, so the fertilizer itself is the best explanation for the extra growth.'
    },
    {
        x: 'Police officers', y: 'Crime rate', answer: 'YX',
        text: 'Cities with more police officers per person tend to have higher crime rates.',
        why: 'The arrow most plausibly runs backward: cities with more crime hire more officers. The police force is a response to crime, not its cause.'
    },
    {
        x: 'Doctor visits', y: 'Poor health', answer: 'YX',
        text: 'People who visit the doctor more often tend to be in poorer health.',
        why: 'Being sick is what sends people to the doctor. The visits are a result of poor health, not the cause of it.'
    },
    {
        x: 'Hours of tutoring', y: 'Low grades', answer: 'YX',
        text: 'Students who get the most tutoring tend to have lower grades than students who get none.',
        why: 'Struggling students are the ones who sign up for tutoring. Low grades lead to tutoring, not the other way around.'
    },
    {
        x: 'Windmill spin speed', y: 'Wind speed', answer: 'YX',
        text: 'The faster the windmills spin, the stronger the wind blows.',
        why: 'Windmills do not make wind. Stronger wind (Y) is what makes the blades spin faster (X).'
    }
];

const answerNames = { XY: 'X causes Y', YX: 'Y causes X', Z: 'Third Variable' };

// Hints shown after a wrong choice (keyed by what the student picked)
const wrongHints = {
    XY: 'If you magically changed only X, would Y really have to change? Look for another explanation.',
    YX: 'Would changing only Y really force X to change? Think about which one comes first.',
    Z: 'A hidden variable is not the best explanation here. Could one of these variables directly affect the other?'
};

// Quiz state
let order = [];          // shuffled scenario indices
let idx = 0;             // position in order
let selected = null;     // last choice for this scenario
let solved = false;      // answered correctly
let revealed = false;    // answer revealed with the Reveal button
let attemptsThis = 0;    // number of guesses on this scenario
let scoreFirstTry = 0;   // correct on the first try
let scoreAttempted = 0;  // scenarios answered or revealed
let finished = false;
let slideT = 1;          // 0..1 slide-in animation for the scenario card

// canvas UI state
let uiButtons = [];
let uiHover = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textSize(defaultTextSize);
    startQuiz();
    describe('Classification practice: a scenario card describes two correlated variables, X and Y. ' +
        'The student chooses X causes Y, Y causes X, or Third Variable, and a causal diagram and ' +
        'explanation show whether the choice is correct.', LABEL);
}

function startQuiz() {
    order = shuffle([...Array(scenarios.length).keys()]);
    idx = 0;
    scoreFirstTry = 0;
    scoreAttempted = 0;
    finished = false;
    loadScenario();
}

function loadScenario() {
    selected = null;
    solved = false;
    revealed = false;
    attemptsThis = 0;
    slideT = 0;
}

function draw() {
    updateCanvasSize();
    uiButtons = [];
    uiHover = false;

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);
    // Control area
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    noStroke();
    fill(sylviaGreenDark);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(canvasWidth < 520 ? 17 : 20);
    text('Correlation vs. Causation Scenarios', canvasWidth / 2, 10);
    textStyle(NORMAL);

    if (slideT < 1) slideT = min(1, slideT + 0.06);

    if (finished) {
        drawSummary();
    } else {
        drawScenarioCard();
        drawDiagram();
        drawFeedback();
    }
    drawControls();
    cursor(uiHover ? HAND : ARROW);
}

// ---------- Scenario card (slides in from the right) ----------
function drawScenarioCard() {
    const s = scenarios[order[idx]];
    const ease = 1 - pow(1 - slideT, 3);
    const x = margin + (1 - ease) * canvasWidth;
    const y = 40, w = canvasWidth - 2 * margin, h = 94;

    fill(sylviaCream);
    stroke(sylviaAuburn);
    strokeWeight(2);
    rect(x, y, w, h, 10);

    noStroke();
    fill(sylviaAuburn);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(13);
    text('SCENARIO ' + (idx + 1) + ' OF ' + scenarios.length, x + 14, y + 9);
    textStyle(NORMAL);

    // scenario statement, vertically centered in the space under the label
    fill(30);
    textSize(canvasWidth < 560 ? 15 : 17);
    const lines = wrapLines(s.text, w - 28);
    const lh = 21;
    const y0 = y + 28 + max(0, (h - 34 - lines.length * lh) / 2);
    for (let i = 0; i < lines.length; i++) {
        text(lines[i], x + 14, y0 + i * lh);
    }
}

// ---------- Causal diagram ----------
function drawDiagram() {
    const s = scenarios[order[idx]];
    const bw = min(210, canvasWidth * 0.3), bh = 54;
    const yXY = 262, yZ = 176;
    const xX = margin + 10 + bw / 2;
    const xY = canvasWidth - margin - 10 - bw / 2;
    const xZ = canvasWidth / 2;

    // Which pathway to show, and in what color
    let shown = null, col = neutralColor;
    if (solved || revealed) { shown = s.answer; col = goodColor; }
    else if (selected) { shown = selected; col = badColor; }

    const x1 = xX + bw / 2, x2 = xY - bw / 2;

    // Observed association: dashed line between X and Y
    stroke(shown === 'XY' || shown === 'YX' ? 200 : observedBlue);
    strokeWeight(2);
    drawingContext.setLineDash([7, 6]);
    line(x1 + 4, yXY, x2 - 4, yXY);
    drawingContext.setLineDash([]);

    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(13);
    if (shown === 'XY' || shown === 'YX') {
        fill(col);
        textStyle(BOLD);
        text('causes', (x1 + x2) / 2, yXY - 9);
        textStyle(NORMAL);
    } else {
        fill(observedBlue);
        let lbl = shown === 'Z' ? 'correlated, but no direct cause' : 'correlated: they move together';
        if (textWidth(lbl) > x2 - x1 - 12) lbl = shown === 'Z' ? 'no direct cause' : 'correlated';
        text(lbl, (x1 + x2) / 2, yXY + 24);
    }

    // Selected / correct pathway
    if (shown === 'XY') drawArrow(x1 + 4, yXY, x2 - 4, yXY, col, 4);
    if (shown === 'YX') drawArrow(x2 - 4, yXY, x1 + 4, yXY, col, 4);
    if (shown === 'Z') {
        drawArrow(xZ - bw / 2 + 12, yZ + bh / 2, xX + 10, yXY - bh / 2 - 4, col, 4);
        drawArrow(xZ + bw / 2 - 12, yZ + bh / 2, xY - 10, yXY - bh / 2 - 4, col, 4);
        const zName = (solved || revealed) ? s.z : 'A hidden variable?';
        drawNode(xZ, yZ, bw, bh, 'Z', zName, col);
    }

    drawNode(xX, yXY, bw, bh, 'X', s.x, observedBlue);
    drawNode(xY, yXY, bw, bh, 'Y', s.y, observedBlue);

    if (!shown) {
        noStroke();
        fill(neutralColor);
        textAlign(CENTER, CENTER);
        textSize(14);
        text('What best explains the link between X and Y?', canvasWidth / 2, 176);
    }
}

function drawNode(cx, cy, w, h, letter, name, col) {
    fill(255);
    stroke(col);
    strokeWeight(2);
    rect(cx - w / 2, cy - h / 2, w, h, 10);

    // letter badge
    fill(col);
    noStroke();
    ellipse(cx - w / 2 + 20, cy, 28, 28);
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(15);
    text(letter, cx - w / 2 + 20, cy + 1);

    // variable name (wrapped to at most two lines)
    fill(30);
    textSize(canvasWidth < 560 ? 12 : 14);
    const lines = wrapLines(name, w - 48);
    const lh = 17;
    const y0 = cy - ((lines.length - 1) * lh) / 2;
    for (let i = 0; i < lines.length; i++) {
        text(lines[i], cx + 16, y0 + i * lh + 1);
    }
    textStyle(NORMAL);
}

// Arrow color is passed in (p5.js stroke() does not return the current color)
function drawArrow(x1, y1, x2, y2, col, weight) {
    stroke(col);
    strokeWeight(weight);
    line(x1, y1, x2, y2);
    const a = atan2(y2 - y1, x2 - x1);
    const s = 13;
    fill(col);
    noStroke();
    triangle(x2, y2,
        x2 - s * cos(a - 0.4), y2 - s * sin(a - 0.4),
        x2 - s * cos(a + 0.4), y2 - s * sin(a + 0.4));
}

// ---------- Feedback panel ----------
function drawFeedback() {
    const s = scenarios[order[idx]];
    const x = margin, y = 308, w = canvasWidth - 2 * margin, h = 134;

    let border = 200, heading = '', headCol = 60, body = '';
    if (solved) {
        border = goodColor; headCol = goodColor;
        heading = 'Correct! ' + answerLabel(s);
        body = s.why;
    } else if (revealed) {
        border = sylviaAuburn; headCol = sylviaAuburn;
        heading = 'Answer: ' + answerLabel(s);
        body = s.why;
    } else if (selected) {
        border = badColor; headCol = badColor;
        heading = 'Not quite: "' + answerNames[selected] + '" is not the best explanation.';
        body = wrongHints[selected] + ' Try again, or click Reveal Answer.';
    } else {
        heading = 'Your turn';
        body = 'Pick the explanation that best fits this scenario. Sylvia\'s test: "If I magically ' +
            'changed just one variable, would the other one have to change?"';
    }

    fill(255, 255, 255, 235);
    stroke(border);
    strokeWeight(solved || revealed || selected ? 2 : 1);
    rect(x, y, w, h, 10);

    noStroke();
    fill(headCol);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(canvasWidth < 560 ? 14 : 16);
    const hl = wrapLines(heading, w - 28);
    for (let i = 0; i < hl.length; i++) text(hl[i], x + 14, y + 10 + i * 20);
    textStyle(NORMAL);

    fill(40);
    textSize(canvasWidth < 560 ? 14 : 15);
    const lines = wrapLines(body, w - 28);
    const y0 = y + 14 + hl.length * 20;
    for (let i = 0; i < lines.length; i++) text(lines[i], x + 14, y0 + i * 20);
}

function answerLabel(s) {
    if (s.answer === 'Z') return 'Third variable (Z = ' + s.z + ')';
    return answerNames[s.answer];
}

// ---------- End-of-quiz summary ----------
function drawSummary() {
    const x = margin, y = 60, w = canvasWidth - 2 * margin, h = 360;
    fill(sylviaCream);
    stroke(sylviaAuburn);
    strokeWeight(2);
    rect(x, y, w, h, 12);

    noStroke();
    fill(sylviaGreenDark);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(22);
    text('Practice complete!', canvasWidth / 2, y + 28);

    fill(sylviaAuburn);
    textSize(40);
    text(scoreFirstTry + ' / ' + scenarios.length, canvasWidth / 2, y + 72);
    textStyle(NORMAL);
    fill(60);
    textSize(15);
    text('scenarios classified correctly on the first try', canvasWidth / 2, y + 124);

    fill(30);
    textSize(15);
    textAlign(LEFT, TOP);
    const tips = [
        'Before you accept "X causes Y", check the other explanations:',
        '1. Could Y be causing X instead (reverse causation)?',
        '2. Could a third variable Z be causing both X and Y?',
        '3. Was this a randomized experiment, or just an observation?'
    ];
    let ty = y + 170;
    for (const t of tips) {
        const lines = wrapLines(t, w - 60);
        for (const ln of lines) { text(ln, x + 30, ty); ty += 21; }
        ty += 5;
    }

    fill(neutralColor);
    textAlign(CENTER, TOP);
    textSize(14);
    text('Click Reset to practice again with the scenarios in a new order.', canvasWidth / 2, y + h - 34);
}

// ---------- Controls (drawn on the canvas) ----------
function drawControls() {
    const y1 = drawHeight + 8, h1 = 34;
    const y2 = drawHeight + 51, h2 = 30;
    const answering = !finished && !solved && !revealed;

    // Row 1: classification buttons
    let x0 = margin;
    if (canvasWidth >= 560) {
        noStroke();
        fill(40);
        textAlign(LEFT, CENTER);
        textStyle(BOLD);
        textSize(14);
        text('Best explanation:', margin, y1 + h1 / 2);
        textStyle(NORMAL);
        x0 = margin + 132;
    }
    const gap = 10;
    const bw = (canvasWidth - margin - x0 - 2 * gap) / 3;
    const ids = ['XY', 'YX', 'Z'];
    for (let i = 0; i < 3; i++) {
        const id = ids[i];
        let fillCol = observedBlue;
        if (!answering && !finished && scenarios[order[idx]].answer === id) fillCol = goodColor;
        uiButton('choose-' + id, x0 + i * (bw + gap), y1, bw, h1, answerNames[id], {
            enabled: answering || (!finished && scenarios[order[idx]].answer === id),
            clickable: answering,
            fill: fillCol,
            active: !finished && selected === id
        });
    }

    // Row 2: reveal / next / reset / score
    const last = idx === scenarios.length - 1;
    let bx = margin;
    uiButton('reveal', bx, y2, 122, h2, 'Reveal Answer', { enabled: answering, fill: sylviaAuburn });
    bx += 132;
    uiButton('next', bx, y2, 122, h2, last ? 'See Results' : 'Next Scenario', { enabled: !finished });
    bx += 132;
    uiButton('reset', bx, y2, 70, h2, 'Reset', { fill: neutralColor });
    bx += 80;

    noStroke();
    fill(40);
    textAlign(RIGHT, CENTER);
    textSize(14);
    textStyle(BOLD);
    const label = (canvasWidth - margin - bx > 190 ? 'First-try score: ' : 'Score: ') +
        scoreFirstTry + ' / ' + scoreAttempted;
    text(label, canvasWidth - margin, y2 + h2 / 2);
    textStyle(NORMAL);
}

function uiButton(id, x, y, w, h, label, opts) {
    opts = opts || {};
    const enabled = opts.enabled !== false;
    const clickable = enabled && opts.clickable !== false;
    const hover = clickable && overRect(x, y, w, h);
    const base = color(opts.fill || sylviaGreen);

    if (!enabled) { fill(228); stroke(200); }
    else {
        fill(hover ? lerpColor(base, color(255), 0.22) : base);
        stroke(lerpColor(base, color(0), 0.3));
    }
    strokeWeight(opts.active ? 3 : 1);
    rect(x, y, w, h, 6);

    noStroke();
    fill(enabled ? 255 : 150);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    let ts = 14;
    textSize(ts);
    while (textWidth(label) > w - 10 && ts > 10) { ts--; textSize(ts); }
    text(label, x + w / 2, y + h / 2 + 1);
    textStyle(NORMAL);

    uiButtons.push({ id: id, x: x, y: y, w: w, h: h, enabled: clickable });
    if (hover) uiHover = true;
}

function overRect(x, y, w, h) {
    return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

function wrapLines(str, maxW) {
    const words = str.split(' ');
    const lines = [];
    let cur = '';
    for (const wd of words) {
        const test = cur ? cur + ' ' + wd : wd;
        if (cur && textWidth(test) > maxW) { lines.push(cur); cur = wd; }
        else cur = test;
    }
    if (cur) lines.push(cur);
    return lines;
}

// ---------- Interaction ----------
function mousePressed() {
    for (const b of uiButtons) {
        if (b.enabled && overRect(b.x, b.y, b.w, b.h)) {
            handleButton(b.id);
            return;
        }
    }
}

function handleButton(id) {
    if (id.startsWith('choose-')) {
        choose(id.substring(7));
    } else if (id === 'reveal') {
        if (!solved && !revealed) {
            revealed = true;
            if (attemptsThis === 0) scoreAttempted++;
        }
    } else if (id === 'next') {
        if (idx < scenarios.length - 1) { idx++; loadScenario(); }
        else finished = true;
    } else if (id === 'reset') {
        startQuiz();
    }
}

function choose(choice) {
    if (solved || revealed || finished) return;
    const s = scenarios[order[idx]];
    selected = choice;
    attemptsThis++;
    if (attemptsThis === 1) scoreAttempted++;
    if (choice === s.answer) {
        solved = true;
        if (attemptsThis === 1) scoreFirstTry++;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = max(containerWidth, 360);
}
