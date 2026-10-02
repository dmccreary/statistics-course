// Study Type Comparison Tool MicroSim
// CANVAS_HEIGHT: 530
// Students classify study descriptions as observational studies or experiments,
// check the key design features, and compare what each design can conclude.
// Bloom Level: Analyze (L4) - analyze, classify
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 440;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;

let margin = 20;
let defaultTextSize = 14;

// Sylvia theme colors
const sylviaGreen = '#2E7D32';
const sylviaGreenDark = '#1B5E20';
const sylviaAuburn = '#B5651D';
const sylviaCream = '#FFF8E1';
const obsColor = '#1565C0';     // observational study
const expColor = '#2E7D32';     // experiment
const goodColor = '#2E7D32';
const badColor = '#C62828';
const neutralColor = '#546E7A';

const featureLabels = [
    'Researchers impose a treatment',
    'Random assignment to groups',
    'Two or more groups are compared'
];
const featureLabelsShort = ['Treatment imposed', 'Random assignment', 'Groups compared'];

// Study bank. type: 'obs' or 'exp'. features: [treatment imposed, random assignment, groups compared]
const studies = [
    {
        type: 'exp', features: [true, true, true],
        text: 'Researchers randomly assign some classrooms to use a new math curriculum while other classrooms keep the standard one. They compare test scores at the end of the year.',
        why: 'The researchers decided which classrooms got the new curriculum, and chance made the assignment. Imposing a treatment makes this an experiment.',
        conclude: 'If the new-curriculum classrooms score higher, the curriculum is the likely cause. Random assignment balanced the other factors.',
        question: 'Does the new math curriculum raise test scores?',
        obsDesign: 'Find schools that already chose the new curriculum and compare their scores with schools that did not.',
        expDesign: 'Randomly assign classrooms to the new or the standard curriculum, then compare scores.',
        trait: 'well-funded schools', groups: ['New curriculum', 'Standard']
    },
    {
        type: 'obs', features: [false, false, true],
        text: 'A hospital records which patients choose surgery and which choose medication for back pain, then follows up on their outcomes.',
        why: 'The patients chose their own treatment. The researchers only recorded what happened, so this is an observational study.',
        conclude: 'Treatment choice is associated with outcomes, but patients who choose surgery may differ in pain severity or overall health.',
        question: 'Does surgery relieve back pain better than medication?',
        obsDesign: 'Record which treatment each patient chooses, then compare the outcomes.',
        expDesign: 'Randomly assign patients to surgery or medication, then compare the outcomes.',
        trait: 'patients with severe pain', groups: ['Surgery', 'Medication']
    },
    {
        type: 'obs', features: [false, false, true],
        text: 'Scientists compare cancer rates between people who live near power lines and people who do not.',
        why: 'Nobody was assigned a place to live. The scientists compared groups that already existed, so this is an observational study.',
        conclude: 'Only an association can be found. People living near power lines may differ in income, housing, or other factors that affect health.',
        question: 'Does living near power lines raise cancer risk?',
        obsDesign: 'Compare cancer rates for people who already live near power lines and people who do not.',
        expDesign: 'Randomly assign people where to live. That is not ethical or practical, so an observational study is the realistic option.',
        trait: 'lower-income households', groups: ['Near lines', 'Far away']
    },
    {
        type: 'exp', features: [true, true, true],
        text: 'A tech company randomly shows half of its users a new interface design and the other half the old design, then measures engagement.',
        why: 'The company decided which design each user saw, and it used random assignment. That is an experiment.',
        conclude: 'If the new-design group is more engaged, the design caused it. Random assignment made the two groups of users comparable.',
        question: 'Does the new interface increase engagement?',
        obsDesign: 'Let users opt in to the new design, then compare them with users who stayed on the old one.',
        expDesign: 'Randomly show each user the new or the old design, then compare engagement.',
        trait: 'heavy users', groups: ['New design', 'Old design']
    },
    {
        type: 'exp', features: [true, true, true],
        text: 'Researchers recruit 200 students. They randomly assign 100 to listen to Mozart for 10 minutes before a test and the other 100 to sit in silence.',
        why: 'The researchers imposed the treatment (Mozart or silence) and used random assignment to form the groups. That is an experiment.',
        conclude: 'Any difference in test scores can be attributed to the music, because random assignment balanced the two groups.',
        question: 'Does listening to classical music improve test performance?',
        obsDesign: 'Ask students whether they listen to classical music before tests, then compare their scores.',
        expDesign: 'Randomly assign students to Mozart or silence before the same test, then compare scores.',
        trait: 'highly motivated students', groups: ['Mozart', 'Silence']
    },
    {
        type: 'obs', features: [false, false, false],
        text: 'Researchers survey 500 students about how many hours they study each week and record each student\'s grades.',
        why: 'The researchers only asked questions and recorded answers. No treatment was imposed and no groups were formed.',
        conclude: 'Study time and grades may be associated, but motivation or course difficulty could explain the link.',
        question: 'Does studying more raise grades?',
        obsDesign: 'Survey students about their weekly study hours and record their grades.',
        expDesign: 'Randomly assign students to study 2 hours or 6 hours a week, then compare grades.',
        trait: 'highly motivated students', groups: ['More study', 'Less study']
    },
    {
        type: 'obs', features: [false, false, true],
        text: 'Researchers track the health of people who choose to exercise regularly and people who choose not to exercise for ten years.',
        why: 'People decided for themselves whether to exercise. The researchers watched without interfering, so this is an observational study.',
        conclude: 'Exercise is associated with health, but people who choose to exercise may also eat better, smoke less, or have higher incomes.',
        question: 'Does regular exercise improve health?',
        obsDesign: 'Track people who choose to exercise and people who choose not to, then compare their health.',
        expDesign: 'Randomly assign volunteers to an exercise program or to no program, then compare their health.',
        trait: 'people with healthy diets', groups: ['Exercise', 'No exercise']
    },
    {
        type: 'exp', features: [true, true, true],
        text: 'One hundred athletes are randomly assigned: 50 drink an energy drink and 50 drink a placebo that tastes the same. Then everyone runs the same sprint test.',
        why: 'The researchers gave out the drinks and used random assignment, with a placebo group for comparison. That is an experiment.',
        conclude: 'If the energy drink group runs faster, the drink caused it. The placebo controls for the effect of simply expecting a boost.',
        question: 'Does the energy drink improve athletic performance?',
        obsDesign: 'Survey athletes about energy drink use, then compare the performance of users and non-users.',
        expDesign: 'Randomly assign athletes to the energy drink or a placebo, then compare sprint times.',
        trait: 'athletes who train hardest', groups: ['Energy drink', 'Placebo']
    },
    {
        type: 'obs', features: [false, false, true],
        text: 'A study finds that children who eat dinner with their families have higher grades than children who do not.',
        why: 'Families were not told how to eat dinner. The researchers observed existing behavior, so this is an observational study.',
        conclude: 'Family dinners are associated with higher grades, but parental involvement or family income could explain both.',
        question: 'Do family dinners improve grades?',
        obsDesign: 'Ask families how often they eat dinner together, then compare the children\'s grades.',
        expDesign: 'Randomly assign families to eat together or apart. That is impractical to enforce, so researchers rely on observational studies.',
        trait: 'highly involved parents', groups: ['Family dinners', 'No dinners']
    },
    {
        type: 'exp', features: [true, true, true],
        text: 'An agricultural researcher randomly chooses 20 of 40 plots to receive a new fertilizer. The other 20 plots get none. She compares the crop yields.',
        why: 'The researcher applied the fertilizer and let chance pick the plots. Imposing a treatment with random assignment is an experiment.',
        conclude: 'If the fertilized plots yield more, the fertilizer caused it. Random assignment balanced soil quality and sunlight across the groups.',
        question: 'Does the new fertilizer increase crop yield?',
        obsDesign: 'Compare yields on farms that already use the fertilizer with farms that do not.',
        expDesign: 'Randomly choose which plots get the fertilizer, then compare crop yields.',
        trait: 'plots with rich soil', groups: ['Fertilizer', 'No fertilizer']
    },
    {
        type: 'obs', features: [false, false, true],
        text: 'Researchers compare accident rates for drivers who use hands-free devices and drivers who use handheld phones.',
        why: 'Drivers chose their own devices. The researchers compared accident records without assigning anything.',
        conclude: 'Device type is associated with accident rates, but cautious drivers may be more likely to choose hands-free devices.',
        question: 'Are hands-free devices safer than handheld phones?',
        obsDesign: 'Compare accident rates for drivers who already use each kind of device.',
        expDesign: 'Randomly assign drivers to hands-free or handheld phones in a driving simulator, then compare errors.',
        trait: 'cautious drivers', groups: ['Hands-free', 'Handheld']
    },
    {
        type: 'obs', features: [false, false, true],
        text: 'Researchers find that people who sleep 8 or more hours score higher on memory tests than people who sleep less than 6 hours.',
        why: 'People slept as much as they normally do. Nobody was assigned a sleep schedule, so this is an observational study.',
        conclude: 'Sleep is associated with memory, but stress, age, or overall health could affect both sleep and memory.',
        question: 'Does more sleep improve memory?',
        obsDesign: 'Record how long people normally sleep, then compare their memory test scores.',
        expDesign: 'Randomly assign volunteers to sleep 8 hours or 5 hours in a sleep lab, then give the same memory test.',
        trait: 'people with low stress', groups: ['8+ hours', 'Under 6 hours']
    }
];

// Quiz state
let order = [];
let idx = 0;
let checks = [false, false, false];   // student's feature checklist
let answered = false;
let choice = null;                    // 'obs' or 'exp'
let scoreCorrect = 0;
let scoreAnswered = 0;
let finished = false;

// Compare mode state
let compareMode = false;
let animT = 0;                        // 0..1 progress of the assignment animation
let dots = [];                        // 24 subjects: { trait, obsGroup, expGroup }
const nDots = 24;

// canvas UI state
let uiButtons = [];
let uiHover = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textSize(defaultTextSize);
    startQuiz();
    describe('A study description card with a checklist of design features and two buttons to ' +
        'classify the study as an observational study or an experiment. A meter shows whether the ' +
        'study supports association only or cause and effect. A compare view animates subjects ' +
        'choosing their own groups versus being randomly assigned.', LABEL);
}

function startQuiz() {
    order = shuffle([...Array(studies.length).keys()]);
    idx = 0;
    scoreCorrect = 0;
    scoreAnswered = 0;
    finished = false;
    compareMode = false;
    loadStudy();
}

function loadStudy() {
    checks = [false, false, false];
    answered = false;
    choice = null;
    compareMode = false;
}

// Build the subjects for the compare animation
function buildDots() {
    dots = [];
    for (let i = 0; i < nDots; i++) dots.push({ trait: i < nDots / 2 });
    // Observational: subjects choose for themselves. Most subjects with the lurking
    // trait choose group 0 (9 of 12), and most without it choose group 1.
    const withTrait = shuffle(dots.filter(d => d.trait));
    const without = shuffle(dots.filter(d => !d.trait));
    withTrait.forEach((d, i) => { d.obsGroup = i < 9 ? 0 : 1; });
    without.forEach((d, i) => { d.obsGroup = i < 3 ? 0 : 1; });
    // Experiment: chance decides. Shuffle everyone, first half to group 0.
    const all = shuffle(dots.slice());
    all.forEach((d, i) => { d.expGroup = i < nDots / 2 ? 0 : 1; });
    dots = shuffle(dots);
    animT = 0;
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
    text('Study Type Comparison Tool', canvasWidth / 2, 10);
    textStyle(NORMAL);

    if (finished) {
        drawSummary();
    } else if (compareMode) {
        if (animT < 1) animT = min(1, animT + 0.012);
        drawCompare();
    } else {
        drawStudyCard();
        drawChecklist();
        drawMeterPanel();
        drawFeedback();
    }
    drawControls();
    cursor(uiHover ? HAND : ARROW);
}

// ---------- Classify mode ----------
function drawStudyCard() {
    const s = studies[order[idx]];
    const x = margin, y = 40, w = canvasWidth - 2 * margin, h = 88;
    fill(sylviaCream);
    stroke(sylviaAuburn);
    strokeWeight(2);
    rect(x, y, w, h, 10);

    noStroke();
    fill(sylviaAuburn);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(13);
    text('STUDY ' + (idx + 1) + ' OF ' + studies.length, x + 14, y + 8);
    textStyle(NORMAL);

    fill(30);
    let ts = canvasWidth < 600 ? 13 : 15;
    textSize(ts);
    let lines = wrapLines(s.text, w - 28);
    if (lines.length > 3) { ts -= 1; textSize(ts); lines = wrapLines(s.text, w - 28); }
    const lh = ts + 4;
    for (let i = 0; i < lines.length; i++) text(lines[i], x + 14, y + 27 + i * lh);
}

function checklistGeometry() {
    const mid = canvasWidth / 2;
    return { x: margin, y: 136, w: mid - margin - 6, h: 150, rowH: 34, rowY: 30 };
}

function drawChecklist() {
    const s = studies[order[idx]];
    const g = checklistGeometry();
    fill(255);
    stroke(210);
    strokeWeight(1);
    rect(g.x, g.y, g.w, g.h, 8);

    noStroke();
    fill(40);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(14);
    text(answered ? 'Key features (actual answers)' : 'Key features: check what you see', g.x + 12, g.y + 8);
    textStyle(NORMAL);

    for (let i = 0; i < 3; i++) {
        const ry = g.y + g.rowY + i * (g.rowH + 4);
        const hover = !answered && overRect(g.x + 6, ry, g.w - 12, g.rowH);
        if (answered) {
            const match = checks[i] === s.features[i];
            fill(match ? '#E8F5E9' : '#FFEBEE');
            noStroke();
            rect(g.x + 6, ry, g.w - 12, g.rowH, 6);
        } else if (hover) {
            fill('#E3F2FD');
            noStroke();
            rect(g.x + 6, ry, g.w - 12, g.rowH, 6);
            uiHover = true;
        }
        // checkbox
        const bx = g.x + 14, by = ry + g.rowH / 2 - 9;
        fill(255);
        stroke(checks[i] ? obsColor : 130);
        strokeWeight(2);
        rect(bx, by, 18, 18, 3);
        if (checks[i]) {
            stroke(obsColor);
            strokeWeight(3);
            line(bx + 4, by + 9, bx + 8, by + 13);
            line(bx + 8, by + 13, bx + 14, by + 5);
        }
        // label
        noStroke();
        fill(30);
        textAlign(LEFT, CENTER);
        let ts = 14;
        textSize(ts);
        const room = g.w - 46 - (answered ? 44 : 0);
        const lbl = textWidth(featureLabels[i]) > room ? featureLabelsShort[i] : featureLabels[i];
        while (textWidth(lbl) > room && ts > 10) { ts--; textSize(ts); }
        text(lbl, bx + 26, ry + g.rowH / 2 + 1);
        // actual answer
        if (answered) {
            textAlign(RIGHT, CENTER);
            textStyle(BOLD);
            textSize(13);
            fill(s.features[i] ? goodColor : neutralColor);
            text(s.features[i] ? 'YES' : 'NO', g.x + g.w - 14, ry + g.rowH / 2 + 1);
            textStyle(NORMAL);
        }
        if (!answered) uiButtons.push({ id: 'check-' + i, x: g.x + 6, y: ry, w: g.w - 12, h: g.rowH, enabled: true });
    }
}

function drawMeterPanel() {
    const s = studies[order[idx]];
    const mid = canvasWidth / 2;
    const x = mid + 6, y = 136, w = canvasWidth - margin - x, h = 150;
    fill(255);
    stroke(210);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    noStroke();
    fill(40);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(14);
    text('Conclusion strength meter', x + 12, y + 8);
    textStyle(NORMAL);

    drawMeter(x + 14, y + 44, w - 28, answered ? (s.type === 'exp' ? 0.9 : 0.12) : null);

    noStroke();
    textAlign(LEFT, TOP);
    textSize(canvasWidth < 640 ? 12 : 13);
    const lh = canvasWidth < 640 ? 15 : 16;
    if (answered) {
        fill(30);
        const lines = wrapLines(s.conclude, w - 24);
        for (let i = 0; i < lines.length && i < 4; i++) text(lines[i], x + 12, y + 82 + i * lh);
    } else {
        fill(neutralColor);
        const lines = wrapLines('Classify the study to see how strong a conclusion it can support.', w - 24);
        for (let i = 0; i < lines.length; i++) text(lines[i], x + 12, y + 82 + i * lh);
    }
}

// Meter from "association only" (left) to "cause and effect" (right).
// pos is 0..1, or null to hide the pointer.
function drawMeter(x, y, w, pos) {
    const h = 14;
    noStroke();
    for (let i = 0; i < w; i++) {
        fill(lerpColor(color('#90CAF9'), color('#2E7D32'), i / w));
        rect(x + i, y, 1.5, h);
    }
    noFill();
    stroke(120);
    strokeWeight(1);
    rect(x, y, w, h, 3);

    noStroke();
    fill(50);
    textSize(12);
    textAlign(LEFT, TOP);
    text('Association only', x, y + h + 3);
    textAlign(RIGHT, TOP);
    text('Cause and effect', x + w, y + h + 3);

    if (pos !== null) {
        const px = x + pos * w;
        fill(30);
        stroke(255);
        strokeWeight(1);
        triangle(px, y + 3, px - 8, y - 11, px + 8, y - 11);
    } else {
        fill(neutralColor);
        noStroke();
        textAlign(CENTER, BOTTOM);
        textStyle(BOLD);
        textSize(14);
        text('?', x + w / 2, y - 1);
        textStyle(NORMAL);
    }
}

function drawFeedback() {
    const s = studies[order[idx]];
    const x = margin, y = 294, w = canvasWidth - 2 * margin, h = 138;
    let border = 200, headCol = 60, heading, body;
    const typeName = s.type === 'exp' ? 'an experiment' : 'an observational study';
    if (!answered) {
        heading = 'Your turn';
        body = 'Read the study description. Check the key features you can find, then classify ' +
            'the study with the buttons below. Ask yourself: did the researchers decide who got ' +
            'the treatment, or did they just watch?';
    } else if (choice === s.type) {
        border = goodColor; headCol = goodColor;
        heading = 'Correct! This is ' + typeName + '.';
        body = s.why + ' Click "Compare Both Designs" to see this question studied both ways.';
    } else {
        border = badColor; headCol = badColor;
        heading = 'Not quite. This is ' + typeName + '.';
        body = s.why + ' Click "Compare Both Designs" to see this question studied both ways.';
    }

    fill(255, 255, 255, 235);
    stroke(border);
    strokeWeight(answered ? 2 : 1);
    rect(x, y, w, h, 10);

    noStroke();
    fill(headCol);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(16);
    text(heading, x + 14, y + 10);
    textStyle(NORMAL);
    fill(40);
    textSize(canvasWidth < 600 ? 13 : 15);
    const lh = canvasWidth < 600 ? 17 : 20;
    const lines = wrapLines(body, w - 28);
    for (let i = 0; i < lines.length; i++) text(lines[i], x + 14, y + 36 + i * lh);
}

// ---------- Compare mode: the same question studied both ways ----------
function drawCompare() {
    const s = studies[order[idx]];
    const x = margin, w = canvasWidth - 2 * margin;

    // research question card
    fill(sylviaCream);
    stroke(sylviaAuburn);
    strokeWeight(2);
    rect(x, 40, w, 50, 10);
    noStroke();
    fill(30);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    let ts = 15;
    textSize(ts);
    const q = 'Research question: ' + s.question;
    while (textWidth(q) > w - 24 && ts > 10) { ts--; textSize(ts); }
    text(q, x + 12, 47);
    textStyle(NORMAL);
    textSize(canvasWidth < 600 ? 11 : 13);
    fill(sylviaAuburn);
    ellipse(x + 18, 76, 11, 11);
    fill(60);
    textAlign(LEFT, CENTER);
    text('= ' + s.trait + ' (a lurking variable)', x + 28, 77);

    const colGap = 12;
    const colW = (w - colGap) / 2;
    drawDesignColumn(x, 98, colW, 334, 'obs', s);
    drawDesignColumn(x + colW + colGap, 98, colW, 334, 'exp', s);
}

function drawDesignColumn(x, y, w, h, kind, s) {
    const col = kind === 'obs' ? obsColor : expColor;
    fill(255);
    stroke(col);
    strokeWeight(2);
    rect(x, y, w, h, 10);

    noStroke();
    fill(col);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(15);
    text(kind === 'obs' ? 'As an Observational Study' : 'As an Experiment', x + w / 2, y + 8);
    textStyle(NORMAL);

    // design description
    fill(30);
    textAlign(LEFT, TOP);
    let ts = canvasWidth < 640 ? 11 : 13;
    textSize(ts);
    let lines = wrapLines(kind === 'obs' ? s.obsDesign : s.expDesign, w - 20);
    if (lines.length > 4) { ts -= 1; textSize(ts); lines = wrapLines(kind === 'obs' ? s.obsDesign : s.expDesign, w - 20); }
    for (let i = 0; i < lines.length && i < 5; i++) text(lines[i], x + 10, y + 30 + i * (ts + 3));

    // geometry for the pool and the two group boxes
    const dotR = constrain(floor((w - 40) / 12) - 3, 7, 12);
    const step = dotR + 3;
    const poolY = y + 114;
    const poolX = x + w / 2 - (12 * step) / 2 + step / 2;
    const boxY = y + 160, boxH = 62, boxGap = 10;
    const boxW = (w - 20 - boxGap) / 2;
    const boxX = [x + 10, x + 10 + boxW + boxGap];

    // assignment label with arrows
    noStroke();
    fill(col);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(canvasWidth < 640 ? 11 : 13);
    text(kind === 'obs' ? 'Subjects choose for themselves' : 'Random assignment: chance decides',
        x + w / 2, y + 147);
    textStyle(NORMAL);

    // group boxes
    for (let g = 0; g < 2; g++) {
        fill(250);
        stroke(col);
        strokeWeight(1);
        rect(boxX[g], boxY, boxW, boxH, 6);
        noStroke();
        fill(40);
        textAlign(CENTER, TOP);
        textStyle(BOLD);
        let gs = 12;
        textSize(gs);
        while (textWidth(s.groups[g]) > boxW - 8 && gs > 9) { gs--; textSize(gs); }
        text(s.groups[g], boxX[g] + boxW / 2, boxY + 5);
        textStyle(NORMAL);
    }

    // empty outlines mark where the subjects started (the pool of subjects)
    noFill();
    stroke(205);
    strokeWeight(1);
    for (let i = 0; i < dots.length; i++) {
        ellipse(poolX + (i % 12) * step, poolY + floor(i / 12) * step, dotR, dotR);
    }
    noStroke();
    fill(neutralColor);
    textAlign(CENTER, BOTTOM);
    textSize(11);
    text(dots.length + ' subjects', x + w / 2, poolY - dotR / 2 - 3);

    // subjects: move from the pool to their groups
    const slot = [0, 0];
    const traitCount = [0, 0], total = [0, 0];
    const perRow = max(1, min(6, floor((boxW - 12) / step)));
    for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const g = kind === 'obs' ? d.obsGroup : d.expGroup;
        const k = slot[g]++;
        total[g]++;
        if (d.trait) traitCount[g]++;
        const sxp = poolX + (i % 12) * step;
        const syp = poolY + floor(i / 12) * step;
        const rowsNeeded = ceil(12 / perRow);
        const gx0 = boxX[g] + boxW / 2 - (perRow * step) / 2 + step / 2;
        const tx = gx0 + (k % perRow) * step;
        const ty = boxY + 28 + floor(k / perRow) * min(step, (boxH - 34) / rowsNeeded);
        // staggered easing
        const local = constrain(animT * 1.8 - (i / dots.length) * 0.8, 0, 1);
        const e = local * local * (3 - 2 * local);
        fill(d.trait ? sylviaAuburn : '#CFD8DC');
        stroke(d.trait ? '#6D3A0B' : '#90A4AE');
        strokeWeight(1);
        ellipse(lerp(sxp, tx, e), lerp(syp, ty, e), dotR, dotR);
    }

    // results appear when the animation finishes
    if (animT >= 1) {
        const share = g => Math.round(100 * traitCount[g] / total[g]) + '%';
        noStroke();
        fill(sylviaAuburn);
        ellipse(x + 16, y + 234, 10, 10);
        fill(30);
        textAlign(LEFT, CENTER);
        textSize(canvasWidth < 640 ? 11 : 13);
        text('share: ' + share(0) + ' vs ' + share(1), x + 25, y + 235);

        fill(col);
        textAlign(LEFT, TOP);
        textStyle(BOLD);
        const verdict = kind === 'obs'
            ? 'The groups differ before the study starts, so the lurking variable could explain a difference in results.'
            : (abs(traitCount[0] - traitCount[1]) >= 4
                // an honest random split is sometimes uneven with only 12 subjects per group
                ? 'This random split came out uneven. That can happen with small groups, but chance does not favor either group. Click Replay.'
                : 'Chance spreads the lurking variable across both groups, so a difference in results points to the treatment.');
        const vts = canvasWidth < 640 ? 11 : 12;
        textSize(vts);
        const vl2 = wrapLines(verdict, w - 20);
        for (let i = 0; i < vl2.length && i < 3; i++) text(vl2[i], x + 10, y + 246 + i * (vts + 3));
        textStyle(NORMAL);

        drawMeter(x + 12, y + 304, w - 24, kind === 'obs' ? 0.12 : 0.9);
    }
}

// ---------- End-of-quiz summary ----------
function drawSummary() {
    const x = margin, y = 60, w = canvasWidth - 2 * margin, h = 350;
    fill(sylviaCream);
    stroke(sylviaAuburn);
    strokeWeight(2);
    rect(x, y, w, h, 12);

    noStroke();
    fill(sylviaGreenDark);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(22);
    text('All studies classified!', canvasWidth / 2, y + 26);
    fill(sylviaAuburn);
    textSize(40);
    text(scoreCorrect + ' / ' + scoreAnswered, canvasWidth / 2, y + 66);
    textStyle(NORMAL);
    fill(60);
    textSize(15);
    text('studies classified correctly', canvasWidth / 2, y + 118);

    fill(30);
    textAlign(LEFT, TOP);
    const tips = [
        'Experiment: the researchers impose a treatment. Random assignment lets it support cause-and-effect conclusions.',
        'Observational study: the researchers only observe. It can show an association, but confounding variables may explain it.',
        'Some questions cannot be studied with an experiment because assigning the treatment would be unethical or impractical.'
    ];
    let ty = y + 156;
    for (const t of tips) {
        const lines = wrapLines(t, w - 60);
        for (const ln of lines) { text(ln, x + 30, ty); ty += 20; }
        ty += 8;
    }
    fill(neutralColor);
    textAlign(CENTER, TOP);
    textSize(14);
    text('Click Reset to practice again with the studies in a new order.', canvasWidth / 2, y + h - 30);
}

// ---------- Controls (drawn on the canvas) ----------
function drawControls() {
    const y1 = drawHeight + 8, h1 = 34;
    const y2 = drawHeight + 51, h2 = 30;
    const gap = 10;
    const canClassify = !finished && !answered && !compareMode;
    const s = finished ? null : studies[order[idx]];

    // Row 1: classification buttons
    let x0 = margin;
    if (canvasWidth >= 600) {
        noStroke();
        fill(40);
        textAlign(LEFT, CENTER);
        textStyle(BOLD);
        textSize(14);
        text('This study is an:', margin, y1 + h1 / 2);
        textStyle(NORMAL);
        x0 = margin + 128;
    }
    const bw = (canvasWidth - margin - x0 - gap) / 2;
    const showObs = canClassify || (!finished && answered && s.type === 'obs');
    const showExp = canClassify || (!finished && answered && s.type === 'exp');
    uiButton('choose-obs', x0, y1, bw, h1, 'Observational Study', { enabled: showObs, clickable: canClassify, fill: obsColor });
    uiButton('choose-exp', x0 + bw + gap, y1, bw, h1, 'Experiment', { enabled: showExp, clickable: canClassify, fill: expColor });

    // Row 2
    const last = idx === studies.length - 1;
    const scoreText = 'Score: ' + scoreCorrect + ' / ' + scoreAnswered;
    textSize(14);
    textStyle(BOLD);
    const scoreW = textWidth(scoreText) + 6;
    textStyle(NORMAL);
    const avail = canvasWidth - 2 * margin - scoreW - 3 * gap;
    const wNext = avail * 0.27, wCmp = avail * 0.41, wReplay = avail * 0.17, wReset = avail * 0.15;
    let bx = margin;
    uiButton('next', bx, y2, wNext, h2, last ? 'See Results' : 'Next Study', { enabled: !finished });
    bx += wNext + gap;
    uiButton('compare', bx, y2, wCmp, h2, compareMode ? 'Back to the Study' : 'Compare Both Designs',
        { enabled: !finished && answered, fill: sylviaAuburn });
    bx += wCmp + gap;
    uiButton('replay', bx, y2, wReplay, h2, 'Replay', { enabled: compareMode && !finished, fill: obsColor });
    bx += wReplay + gap;
    uiButton('reset', bx, y2, wReset, h2, 'Reset', { fill: neutralColor });

    noStroke();
    fill(40);
    textAlign(RIGHT, CENTER);
    textSize(14);
    textStyle(BOLD);
    text(scoreText, canvasWidth - margin, y2 + h2 / 2);
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
    strokeWeight(1);
    rect(x, y, w, h, 6);

    noStroke();
    fill(enabled ? 255 : 150);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    let ts = 14;
    textSize(ts);
    while (textWidth(label) > w - 8 && ts > 9) { ts--; textSize(ts); }
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
    if (id.startsWith('check-')) {
        const i = int(id.substring(6));
        checks[i] = !checks[i];
    } else if (id.startsWith('choose-')) {
        if (answered || finished) return;
        choice = id.substring(7);
        answered = true;
        scoreAnswered++;
        if (choice === studies[order[idx]].type) scoreCorrect++;
    } else if (id === 'next') {
        if (idx < studies.length - 1) { idx++; loadStudy(); }
        else { finished = true; compareMode = false; }
    } else if (id === 'compare') {
        compareMode = !compareMode;
        if (compareMode) buildDots();
    } else if (id === 'replay') {
        buildDots();
    } else if (id === 'reset') {
        startQuiz();
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
