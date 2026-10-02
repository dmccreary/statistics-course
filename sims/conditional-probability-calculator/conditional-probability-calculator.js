// Conditional Probability Calculator MicroSim
// CANVAS_HEIGHT: 516
// Students enter probabilities or counts for A, B, and "A and B" and watch the
// conditional probability formula applied step by step, with a Venn diagram.
// Bloom Level: Apply (L3) - calculate
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 430;
let controlHeight = 86;
let canvasHeight = drawHeight + controlHeight;

let margin = 20;
let defaultTextSize = 14;

// Sylvia theme colors
const sylviaGreen = '#2E7D32';
const sylviaGreenDark = '#1B5E20';
const sylviaAuburn = '#B5651D';
const sylviaCream = '#FFF8E1';
const colorA = '#1565C0';        // event A: blue
const colorB = '#EF6C00';        // event B: orange
const colorAB = '#2E7D32';       // A and B: green
const resultOrange = '#E65100';
const errorRed = '#C62828';
const neutralColor = '#546E7A';

// Preset examples from the chapter. Counts are exact; probabilities are rounded to 4 places.
const presets = [
    {
        name: 'Cards', A: 'Heart', B: 'Red card',
        count: { a: '13', b: '26', ab: '13', n: '52' },
        prob: { a: '0.25', b: '0.5', ab: '0.25' }
    },
    {
        name: 'Medical Test', A: 'Disease', B: 'Positive test',
        count: { a: '200', b: '1170', ab: '190', n: '10000' },
        prob: { a: '0.02', b: '0.117', ab: '0.019' }
    },
    {
        name: 'Weather', A: 'Rain', B: 'Cloudy',
        count: { a: '150', b: '200', ab: '140', n: '365' },
        prob: { a: '0.4110', b: '0.5479', ab: '0.3836' }
    }
];

// State
let mode = 'prob';               // 'prob' or 'count'
let target = 'AgB';              // 'AgB' = P(A | B), 'BgA' = P(B | A)
let nameA = 'A', nameB = 'B';
let fields = {
    prob: { a: '', b: '', ab: '' },
    count: { a: '', b: '', ab: '', n: '' }
};
let activeField = null;          // key of the field being typed in

// canvas UI state
let uiButtons = [];
let uiHover = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textSize(defaultTextSize);
    describe('A calculator with input fields for the probability or count of event A, event B, and ' +
        'A and B together. A Venn diagram shows the two events, and a panel shows the conditional ' +
        'probability formula, the substituted values, and the result.', LABEL);
}

function fieldKeys() {
    return mode === 'prob' ? ['a', 'b', 'ab'] : ['a', 'b', 'ab', 'n'];
}

function fieldLabel(key) {
    if (mode === 'prob') {
        return { a: 'P(A)', b: 'P(B)', ab: 'P(A and B)' }[key];
    }
    return { a: 'Count of A', b: 'Count of B', ab: 'Count of A and B', n: 'Total (optional)' }[key];
}

// ---------- Parse, validate, and calculate ----------
function parseField(key) {
    const s = fields[mode][key];
    if (s === '' || s === '.') return null;
    const v = Number(s);
    return isNaN(v) ? null : v;
}

function evaluate() {
    const r = { a: parseField('a'), b: parseField('b'), ab: parseField('ab'), n: null, errors: [], result: null };
    const given = target === 'AgB' ? 'b' : 'a';
    const other = target === 'AgB' ? 'a' : 'b';
    const up = k => k.toUpperCase();

    if (mode === 'prob') {
        for (const k of ['a', 'b', 'ab']) {
            if (r[k] !== null && (r[k] < 0 || r[k] > 1)) {
                r.errors.push(fieldLabel(k) + ' must be between 0 and 1.');
            }
        }
        if (r.errors.length === 0 && r.ab !== null) {
            if ((r.a !== null && r.ab > r.a + 1e-12) || (r.b !== null && r.ab > r.b + 1e-12)) {
                r.errors.push('P(A and B) cannot be larger than P(A) or P(B).');
            }
        }
        if (r.errors.length === 0 && r.a !== null && r.b !== null && r.ab !== null && r.a + r.b - r.ab > 1 + 1e-9) {
            r.errors.push('P(A or B) = P(A) + P(B) - P(A and B) cannot be more than 1.');
        }
        if (r.errors.length === 0 && r[given] !== null && r[given] === 0) {
            r.errors.push('P(' + up(given) + ') must be greater than 0 to condition on ' + up(given) + '.');
        }
    } else {
        r.n = parseField('n');
        if (r.ab !== null) {
            if ((r.a !== null && r.ab > r.a) || (r.b !== null && r.ab > r.b)) {
                r.errors.push('The count of "A and B" cannot be larger than the count of A or of B.');
            }
        }
        if (r.errors.length === 0 && r.n !== null) {
            if ((r.a !== null && r.a > r.n) || (r.b !== null && r.b > r.n)) {
                r.errors.push('A count cannot be larger than the total.');
            } else if (r.a !== null && r.b !== null && r.ab !== null && r.a + r.b - r.ab > r.n) {
                r.errors.push('The count of "A or B" (A + B - both) cannot be more than the total.');
            } else if (r.n === 0) {
                r.errors.push('The total must be greater than 0.');
            }
        }
        if (r.errors.length === 0 && r[given] !== null && r[given] === 0) {
            r.errors.push('The count of ' + up(given) + ' must be greater than 0 to condition on ' + up(given) + '.');
        }
    }

    r.given = given;
    r.other = other;
    if (r.errors.length === 0 && r.ab !== null && r[given] !== null) {
        r.result = r.ab / r[given];      // P(other | given) = P(A and B) / P(given)
        if (r[other] !== null) {
            // unconditional probability of the other event, for comparison
            if (mode === 'prob') r.marginal = r[other];
            else if (r.n !== null) r.marginal = r[other] / r.n;
        }
    }
    return r;
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
    text('Conditional Probability Calculator', canvasWidth / 2, 10);
    textStyle(NORMAL);

    const r = evaluate();
    const split = canvasWidth * 0.47;
    drawInputs(margin, 40, split - margin - 6, 214, r);
    drawVenn(split + 6, 40, canvasWidth - margin - split - 6, 214, r);
    drawSteps(margin, 262, canvasWidth - 2 * margin, 160, r);
    drawControls();
    cursor(uiHover ? HAND : ARROW);
}

// ---------- Input fields ----------
function drawInputs(x, y, w, h, r) {
    fill(255);
    stroke(210);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    // event names
    noStroke();
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    let ts = 14;
    textSize(ts);
    if (nameA === 'A' && nameB === 'B') {
        fill(40);
        text('Enter values for events A and B', x + 10, y + 9);
    } else {
        const legend = 'A = ' + nameA + '     B = ' + nameB;
        while (textWidth(legend) > w - 20 && ts > 10) { ts--; textSize(ts); }
        fill(colorA);
        text('A = ' + nameA, x + 10, y + 9);
        fill(colorB);
        text('B = ' + nameB, x + 10 + textWidth('A = ' + nameA + '     '), y + 9);
    }
    textStyle(NORMAL);

    const keys = fieldKeys();
    const rowH = keys.length === 4 ? 34 : 40;
    const fw = min(120, w * 0.36), fh = 28;
    const fx = x + w - fw - 10;
    for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const fy = y + 36 + i * rowH;
        const isActive = activeField === k;
        const hover = overRect(fx, fy, fw, fh);
        if (hover) uiHover = true;

        noStroke();
        fill(k === 'a' ? colorA : (k === 'b' ? colorB : (k === 'ab' ? colorAB : 60)));
        textAlign(RIGHT, CENTER);
        textStyle(BOLD);
        let ls = w < 300 ? 12 : 14;
        textSize(ls);
        const label = fieldLabel(k) + ' =';
        while (textWidth(label) > fx - x - 16 && ls > 9) { ls--; textSize(ls); }
        text(label, fx - 8, fy + fh / 2 + 1);
        textStyle(NORMAL);

        // white field with green border
        fill(255);
        stroke(isActive ? sylviaGreenDark : sylviaGreen);
        strokeWeight(isActive ? 3 : 1.5);
        rect(fx, fy, fw, fh, 5);
        noStroke();
        fill(20);
        textAlign(LEFT, CENTER);
        textSize(16);
        const s = fields[mode][k];
        text(s, fx + 8, fy + fh / 2 + 1);
        if (isActive && frameCount % 60 < 32) {
            stroke(20);
            strokeWeight(1.5);
            const cx = fx + 9 + textWidth(s);
            line(cx, fy + 6, cx, fy + fh - 6);
            noStroke();
        }
        if (s === '' && !isActive) {
            fill(170);
            textSize(12);
            text(mode === 'prob' ? '0 to 1' : 'count', fx + 8, fy + fh / 2 + 1);
        }
        uiButtons.push({ id: 'field-' + k, x: fx, y: fy, w: fw, h: fh, enabled: true });
    }

    // error message or typing hint
    const my = y + 36 + keys.length * rowH + 2;
    noStroke();
    textAlign(LEFT, TOP);
    textSize(w < 300 ? 11 : 13);
    let msg, col;
    if (r.errors.length > 0) {
        msg = 'Check your inputs: ' + r.errors[0];
        col = errorRed;
        textStyle(BOLD);
    } else {
        msg = 'Click a box and type a value. Press Tab for the next box.';
        col = neutralColor;
    }
    fill(col);
    const lines = wrapLines(msg, w - 20);
    for (let i = 0; i < lines.length && i < 3; i++) text(lines[i], x + 10, my + i * 15);
    textStyle(NORMAL);
}

// ---------- Venn diagram (areas proportional when the values are known) ----------
function lensArea(r1, r2, d) {
    if (d >= r1 + r2) return 0;
    if (d <= Math.abs(r1 - r2)) return Math.PI * Math.min(r1, r2) * Math.min(r1, r2);
    const a1 = r1 * r1 * Math.acos((d * d + r1 * r1 - r2 * r2) / (2 * d * r1));
    const a2 = r2 * r2 * Math.acos((d * d + r2 * r2 - r1 * r1) / (2 * d * r2));
    const a3 = 0.5 * Math.sqrt((-d + r1 + r2) * (d + r1 - r2) * (d - r1 + r2) * (d + r1 + r2));
    return a1 + a2 - a3;
}

// Distance between centers that makes the overlap area equal to target
function solveDistance(r1, r2, targetArea) {
    let lo = Math.abs(r1 - r2), hi = r1 + r2;
    for (let i = 0; i < 50; i++) {
        const mid = (lo + hi) / 2;
        if (lensArea(r1, r2, mid) > targetArea) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
}

function drawVenn(x, y, w, h, r) {
    fill(255);
    stroke(210);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    const known = r.errors.length === 0 && r.a !== null && r.b !== null && r.ab !== null && r.a > 0 && r.b > 0;
    const cx = x + w / 2, cy = y + h / 2 + 4;
    const maxR = min(h * 0.33, w * 0.24);
    let rA = maxR * 0.85, rB = maxR * 0.85, d = maxR * 1.05;
    if (known) {
        const big = max(r.a, r.b);
        rA = maxR * Math.sqrt(r.a / big);
        rB = maxR * Math.sqrt(r.b / big);
        // overlap area in the same scale: area = PI * maxR^2 * (value / big)
        d = solveDistance(rA, rB, Math.PI * maxR * maxR * (r.ab / big));
    }
    // center the pair of circles horizontally
    const left = -rA, right = d + rB;
    const ax = cx - (left + right) / 2, bx = ax + d;

    // sample-space rectangle
    fill(250);
    stroke(190);
    strokeWeight(1);
    rect(x + 10, y + 30, w - 20, h - 62, 6);

    const givenIsB = target === 'AgB';
    const cA = color(colorA), cB = color(colorB);
    cA.setAlpha(givenIsB ? 70 : 150);
    cB.setAlpha(givenIsB ? 150 : 70);
    noStroke();
    fill(cA);
    ellipse(ax, cy, rA * 2, rA * 2);
    fill(cB);
    ellipse(bx, cy, rB * 2, rB * 2);

    // intersection in green: draw circle B clipped to circle A
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.arc(ax, cy, rA, 0, Math.PI * 2);
    drawingContext.clip();
    fill(colorAB);
    ellipse(bx, cy, rB * 2, rB * 2);
    drawingContext.restore();

    // outlines: the "given" event is the new sample space, so it gets a heavy outline
    noFill();
    stroke(colorA);
    strokeWeight(givenIsB ? 1.5 : 4);
    ellipse(ax, cy, rA * 2, rA * 2);
    stroke(colorB);
    strokeWeight(givenIsB ? 4 : 1.5);
    ellipse(bx, cy, rB * 2, rB * 2);

    // heading and labels
    noStroke();
    fill(40);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(w < 300 ? 12 : 14);
    text('Venn diagram', x + 10, y + 9);
    textAlign(RIGHT, TOP);
    textSize(w < 300 ? 10 : 12);
    fill(neutralColor);
    textStyle(NORMAL);
    text(known ? 'areas drawn to scale' : 'enter all three values to scale it', x + w - 10, y + 11);

    textStyle(BOLD);
    textSize(15);
    textAlign(CENTER, CENTER);
    fill(colorA);
    text('A', ax - rA - 12 > x + 16 ? ax - rA - 12 : x + 22, cy);
    fill(colorB);
    text('B', bx + rB + 12 < x + w - 16 ? bx + rB + 12 : x + w - 22, cy);
    textStyle(NORMAL);

    // caption: which circle is the new sample space
    fill(40);
    textStyle(BOLD);
    textSize(w < 300 ? 10 : 12);
    textAlign(CENTER, TOP);
    const cap = 'Given ' + (givenIsB ? 'B' : 'A') + ': the heavy circle is the new sample space; green is "A and B"';
    const capLines = wrapLines(cap, w - 20);
    for (let i = 0; i < capLines.length && i < 2; i++) text(capLines[i], x + w / 2, y + h - 30 + i * 13);
    textStyle(NORMAL);
}

// ---------- Step-by-step calculation ----------
function drawSteps(x, y, w, h, r) {
    fill(255, 255, 255, 235);
    stroke(r.result !== null ? sylviaGreen : 200);
    strokeWeight(r.result !== null ? 2 : 1);
    rect(x, y, w, h, 10);

    const g = r.given.toUpperCase(), o = r.other.toUpperCase();
    const gName = g === 'A' ? nameA : nameB, oName = o === 'A' ? nameA : nameB;
    const colG = g === 'A' ? colorA : colorB, colO = o === 'A' ? colorA : colorB;
    const small = canvasWidth < 600;
    const bodySize = small ? 14 : 17;
    const lx = x + 14;
    const stepX = lx + (small ? 52 : 62);

    noStroke();
    textAlign(LEFT, CENTER);

    // Step 1: formula with colored variables
    let ty = y + 24;
    stepLabel('Step 1', lx, ty);
    textSize(bodySize);
    textStyle(BOLD);
    drawSegments([
        ['P(', 30], [o, colO], [' | ', 30], [g, colG], [')  =  P(', 30],
        ['A and B', colorAB], [') / P(', 30], [g, colG], [')', 30]
    ], stepX, ty);
    textStyle(NORMAL);

    // Step 2: substitute the values as they are typed
    ty = y + 58;
    stepLabel('Step 2', lx, ty);
    textSize(bodySize);
    textStyle(BOLD);
    const sAB = fields[mode].ab === '' ? '?' : fields[mode].ab;
    const sG = fields[mode][r.given] === '' ? '?' : fields[mode][r.given];
    const sN = mode === 'count' ? fields.count.n : '';
    if (mode === 'count' && sN !== '' && sAB !== '?' && sG !== '?') {
        drawSegments([
            ['=  (', 30], [sAB + '/' + sN, colorAB], [') / (', 30], [sG + '/' + sN, colG],
            [')  =  ', 30], [sAB, colorAB], [' / ', 30], [sG, colG]
        ], stepX, ty);
    } else {
        drawSegments([['=  ', 30], [sAB, colorAB], [' / ', 30], [sG, colG]], stepX, ty);
    }
    textStyle(NORMAL);

    // Step 3: result and interpretation
    ty = y + 96;
    stepLabel('Step 3', lx, ty);
    if (r.result !== null) {
        textStyle(BOLD);
        textSize(small ? 22 : 28);
        fill(resultOrange);
        const resText = '=  ' + r.result.toFixed(3);
        text(resText, stepX, ty);
        const rw = textWidth(resText);
        textSize(small ? 13 : 15);
        fill(60);
        textStyle(NORMAL);
        text('(' + (100 * r.result).toFixed(1) + '%)', stepX + rw + 12, ty + 2);

        fill(30);
        textAlign(LEFT, TOP);
        textSize(small ? 12 : 14);
        let msg = 'Given ' + gName + ' occurs, ' + oName + ' has a ' + (100 * r.result).toFixed(1) + '% chance of occurring.';
        if (r.marginal !== undefined) {
            msg += ' Without the condition, P(' + o + ') = ' + r.marginal.toFixed(3) + '.';
        }
        const lines = wrapLines(msg, w - 28);
        for (let i = 0; i < lines.length && i < 2; i++) text(lines[i], lx, y + 120 + i * 17);
    } else {
        textSize(small ? 13 : 15);
        fill(r.errors.length > 0 ? errorRed : neutralColor);
        text(r.errors.length > 0 ? 'Fix the input error to see the result.'
            : 'Enter ' + (mode === 'prob' ? 'P(A and B) and P(' + g + ')' : 'the counts of "A and B" and of ' + g) +
            ' to see the result.', stepX, ty);
    }
}

function stepLabel(label, x, y) {
    noStroke();
    fill(neutralColor);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(canvasWidth < 600 ? 11 : 13);
    text(label, x, y);
    textStyle(NORMAL);
}

// Draw consecutive pieces of text in different colors on one line
function drawSegments(segs, x, y) {
    let cx = x;
    for (const s of segs) {
        fill(s[1]);
        text(s[0], cx, y);
        cx += textWidth(s[0]);
    }
}

// ---------- Controls (drawn on the canvas) ----------
function drawControls() {
    const y1 = drawHeight + 9, y2 = drawHeight + 48, bh = 30, gap = 8;
    const small = canvasWidth < 640;

    // Row 1: input mode and which conditional probability to find
    let x = margin;
    x = controlLabel('Inputs:', x, y1 + bh / 2, small);
    const segW = small ? 92 : 112;
    uiButton('mode-prob', x, y1, segW, bh, 'Probabilities', { selected: mode === 'prob' });
    uiButton('mode-count', x + segW, y1, segW * 0.72, bh, 'Counts', { selected: mode === 'count' });
    x += segW * 1.72 + gap + 10;
    x = controlLabel('Find:', x, y1 + bh / 2, small);
    const fW = small ? 68 : 84;
    uiButton('find-AgB', x, y1, fW, bh, 'P(A | B)', { selected: target === 'AgB' });
    uiButton('find-BgA', x + fW, y1, fW, bh, 'P(B | A)', { selected: target === 'BgA' });

    // Row 2: preset examples and clear
    x = margin;
    x = controlLabel('Examples:', x, y2 + bh / 2, small);
    const clearW = small ? 60 : 76;
    const avail = canvasWidth - margin - x - clearW - 3 * gap - 8;
    const pw = min(130, avail / 3);
    for (let i = 0; i < presets.length; i++) {
        uiButton('preset-' + i, x, y2, pw, bh, presets[i].name, { fill: sylviaAuburn });
        x += pw + gap;
    }
    uiButton('clear', canvasWidth - margin - clearW, y2, clearW, bh, 'Clear', { fill: neutralColor });
}

function controlLabel(label, x, y, small) {
    noStroke();
    fill(40);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(small ? 12 : 14);
    text(label, x, y);
    const w = textWidth(label);
    textStyle(NORMAL);
    return x + w + 8;
}

function uiButton(id, x, y, w, h, label, opts) {
    opts = opts || {};
    const hover = overRect(x, y, w, h);
    const base = color(opts.fill || sylviaGreen);
    const isSeg = opts.selected !== undefined;

    if (isSeg && !opts.selected) {
        fill(hover ? '#E8F5E9' : 255);
        stroke(sylviaGreen);
    } else {
        fill(hover && !isSeg ? lerpColor(base, color(255), 0.22) : base);
        stroke(lerpColor(base, color(0), 0.3));
    }
    strokeWeight(1);
    rect(x, y, w, h, 6);

    noStroke();
    fill(isSeg && !opts.selected ? sylviaGreenDark : 255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    let ts = 14;
    textSize(ts);
    while (textWidth(label) > w - 8 && ts > 9) { ts--; textSize(ts); }
    text(label, x + w / 2, y + h / 2 + 1);
    textStyle(NORMAL);

    uiButtons.push({ id: id, x: x, y: y, w: w, h: h, enabled: true });
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
    activeField = null;   // clicking elsewhere leaves the field
}

function handleButton(id) {
    if (id.startsWith('field-')) {
        activeField = id.substring(6);
        return;
    }
    activeField = null;
    if (id === 'mode-prob') mode = 'prob';
    else if (id === 'mode-count') mode = 'count';
    else if (id === 'find-AgB') target = 'AgB';
    else if (id === 'find-BgA') target = 'BgA';
    else if (id === 'clear') {
        fields = { prob: { a: '', b: '', ab: '' }, count: { a: '', b: '', ab: '', n: '' } };
        nameA = 'A';
        nameB = 'B';
    } else if (id.startsWith('preset-')) {
        const p = presets[int(id.substring(7))];
        fields = { prob: Object.assign({}, p.prob), count: Object.assign({}, p.count) };
        nameA = p.A;
        nameB = p.B;
        mode = 'count';
        target = 'AgB';
    }
}

function keyPressed() {
    if (!activeField) return;
    const keys = fieldKeys();
    let s = fields[mode][activeField];
    if (keyCode === BACKSPACE || keyCode === DELETE) {
        fields[mode][activeField] = s.slice(0, -1);
    } else if (keyCode === TAB) {
        const i = keys.indexOf(activeField);
        activeField = keys[(i + (keyIsDown(SHIFT) ? keys.length - 1 : 1)) % keys.length];
    } else if (keyCode === ENTER || keyCode === ESCAPE) {
        activeField = null;
    } else if (key >= '0' && key <= '9' && s.length < 8) {
        fields[mode][activeField] = s + key;
    } else if (key === '.' && mode === 'prob' && !s.includes('.') && s.length < 8) {
        fields[mode][activeField] = s + '.';
    } else {
        return;
    }
    return false;   // keep Tab, Backspace, etc. from scrolling or leaving the page
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
