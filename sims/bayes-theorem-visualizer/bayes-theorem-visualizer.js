// Bayes' Theorem Visualizer MicroSim
// CANVAS_HEIGHT: 530
// Students analyze how the prior (base rate), sensitivity, and specificity of a
// test determine the probability of disease given a positive test.
// Bloom Level: Analyze (L4) - analyze
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 750;
let drawHeight = 430;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let margin = 20;
let defaultTextSize = 14;

// Sylvia theme colors
const sylviaGreen = '#2E7D32';
const sylviaGreenDark = '#1B5E20';
const sylviaAuburn = '#B5651D';
const sylviaCream = '#FFF8E1';
const neutralColor = '#546E7A';
const resultOrange = '#E65100';
// category colors
const diseaseRed = '#D32F2F';
const diseaseFaded = '#F4C7C3';
const healthyTeal = '#00897B';
const healthyFaded = '#B9E0DB';
const truePosGold = '#FFC107';
const falsePosOrange = '#FB8C00';

const POP = 1000;
const defaults = { prior: 2, sens: 95, spec: 90 };

// State (all three are whole-number percentages)
let prior = defaults.prior;
let sens = defaults.sens;
let spec = defaults.spec;
let view = 'icons';        // 'icons' or 'tree'
let grouped = false;       // group the icons by test result?
let groupT = 0;            // 0..1 animation between the two groupings

// canvas UI state
let uiButtons = [];
let uiSliders = [];
let uiHover = false;
let activeSlider = null;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textSize(defaultTextSize);
    describe('An icon array of 1,000 people colored by disease status, with bright outlined icons ' +
        'for positive tests. Sliders set the prior probability, sensitivity, and specificity, and a ' +
        'panel shows Bayes\' theorem with the current values and the probability of disease given ' +
        'a positive test.', LABEL);
}

// ---------- Bayes arithmetic ----------
function compute() {
    const p = prior / 100, se = sens / 100, sp = spec / 100;
    const r = {};
    r.p = p; r.se = se; r.sp = sp;
    r.fpRate = 1 - sp;                          // P(+ | no disease)
    r.jointTP = se * p;                         // P(+ and disease)
    r.jointFP = (1 - sp) * (1 - p);             // P(+ and no disease)
    r.pPos = r.jointTP + r.jointFP;             // P(+)
    r.posterior = r.jointTP / r.pPos;           // P(disease | +)

    // expected counts in a population of 1,000
    r.D = POP * p;
    r.H = POP - r.D;
    r.TP = r.D * se;
    r.FN = r.D - r.TP;
    r.FP = r.H * (1 - sp);
    r.TN = r.H - r.FP;

    // whole-person counts for the icon array (always sum to 1,000)
    r.iD = Math.round(r.D);
    r.iH = POP - r.iD;
    r.iTP = Math.round(r.TP);
    r.iFN = r.iD - r.iTP;
    r.iFP = Math.round(r.FP);
    r.iTN = r.iH - r.iFP;
    return r;
}

// counts: whole numbers when exact, otherwise one decimal place
function fmtCount(v) {
    const r = Math.round(v * 10) / 10;
    return Math.abs(r - Math.round(r)) < 1e-9 ? Math.round(r).toLocaleString('en-US') : r.toFixed(1);
}

function fmtPct(v) {
    return (100 * v).toFixed(1) + '%';
}

function draw() {
    updateCanvasSize();
    uiButtons = [];
    uiSliders = [];
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
    text('Bayes\' Theorem Visualizer', canvasWidth / 2, 10);
    textStyle(NORMAL);

    const target = grouped ? 1 : 0;
    if (groupT < target) groupT = min(1, groupT + 0.04);
    if (groupT > target) groupT = max(0, groupT - 0.04);

    const r = compute();
    const split = canvasWidth * 0.6;
    const px = margin, py = 40, pw = split - margin - 6, ph = drawHeight - 48;
    fill(255);
    stroke(210);
    strokeWeight(1);
    rect(px, py, pw, ph, 8);
    if (view === 'icons') drawIconArray(px, py, pw, ph, r);
    else drawTreeView(px, py, pw, ph, r);
    drawBayesPanel(split + 6, py, canvasWidth - margin - split - 6, ph, r);
    drawControls();
    cursor(uiHover ? HAND : ARROW);
}

// ---------- Icon array: 1,000 people ----------
function drawIconArray(x, y, w, h, r) {
    const rows = 25;
    const posCount = r.iTP + r.iFP;
    const cell = constrain(floor((w - 16) / 43), 5, 12);
    const gx = x + (w - 43 * cell) / 2 + cell / 2;
    const gy = y + 50;

    // Two blocks of columns with one empty column between them.
    // Grouping A: disease | no disease.  Grouping B: test positive | test negative.
    const startA2 = Math.ceil(r.iD / rows) + 1;
    const startB2 = Math.ceil(posCount / rows) + 1;

    const posOf = (block2Start, inSecond, k) => {
        const col = (inSecond ? block2Start : 0) + floor(k / rows);
        return { x: gx + col * cell, y: gy + (k % rows) * cell };
    };
    const e = groupT * groupT * (3 - 2 * groupT);
    const size = cell - 2;

    // draw one category of icons
    const drawSet = (count, fillCol, borderCol, a2, aStart, b2, bStart) => {
        for (let k = 0; k < count; k++) {
            const pa = posOf(startA2, a2, aStart + k);
            const pb = posOf(startB2, b2, bStart + k);
            const cx = lerp(pa.x, pb.x, e), cy = lerp(pa.y, pb.y, e);
            fill(fillCol);
            if (borderCol) { stroke(borderCol); strokeWeight(cell >= 9 ? 1.6 : 1); }
            else noStroke();
            rect(cx - size / 2, cy - size / 2, size, size, 2);
        }
    };
    // (count, fill, border, in 2nd block by status?, index there, in 2nd block by test?, index there)
    drawSet(r.iTN, healthyFaded, null, true, r.iFP, true, r.iFN);
    drawSet(r.iFN, diseaseFaded, null, false, r.iTP, true, 0);
    drawSet(r.iFP, healthyTeal, falsePosOrange, true, 0, false, r.iTP);
    drawSet(r.iTP, diseaseRed, truePosGold, false, 0, false, 0);

    // block labels
    noStroke();
    textStyle(BOLD);
    textAlign(LEFT, BOTTOM);
    let ts = w < 360 ? 10 : 12;
    textSize(ts);
    const lab1 = e < 0.5 ? 'Disease: ' + fmtCount(r.D) : 'Test +: ' + fmtCount(r.TP + r.FP);
    const lab2 = e < 0.5 ? 'No disease: ' + fmtCount(r.H) : 'Test −: ' + fmtCount(r.FN + r.TN);
    const x1 = gx - cell / 2;
    const start2 = lerp(startA2, startB2, e);
    const x2 = max(gx - cell / 2 + start2 * cell, x1 + textWidth(lab1) + 14);
    fill(e < 0.5 ? diseaseRed : resultOrange);
    text(lab1, x1, gy - cell / 2 - 3);
    fill(e < 0.5 ? healthyTeal : neutralColor);
    text(lab2, x2, gy - cell / 2 - 3);
    textStyle(NORMAL);

    fill(40);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(w < 360 ? 12 : 14);
    text('1,000 people' + (grouped ? ', grouped by test result' : ', grouped by disease status'), x + 10, y + 8);
    textStyle(NORMAL);

    // legend with counts and percentages
    const ly = gy + rows * cell + 4;
    const items = [
        { label: 'True positive', v: r.TP, fill: diseaseRed, border: truePosGold },
        { label: 'False negative', v: r.FN, fill: diseaseFaded, border: null },
        { label: 'False positive', v: r.FP, fill: healthyTeal, border: falsePosOrange },
        { label: 'True negative', v: r.TN, fill: healthyFaded, border: null }
    ];
    const colW = (w - 16) / 2;
    const lts = w < 360 ? 10 : 12;
    textSize(lts);
    for (let i = 0; i < 4; i++) {
        const it = items[i];
        const lx = x + 10 + (i % 2) * colW;
        const yy = ly + floor(i / 2) * 18 + 9;
        fill(it.fill);
        if (it.border) { stroke(it.border); strokeWeight(2); } else noStroke();
        rect(lx, yy - 6, 12, 12, 2);
        noStroke();
        fill(30);
        textAlign(LEFT, CENTER);
        text(it.label + ': ' + fmtCount(it.v) + ' (' + fmtPct(it.v / POP) + ')', lx + 18, yy + 1);
    }
    if (ly + 54 <= y + h) {
        // room under the legend for a note about rounding
        fill(neutralColor);
        textSize(w < 360 ? 10 : 12);
        textAlign(LEFT, TOP);
        text('Each icon is one whole person, so the icon counts are rounded.', x + 10, ly + 39);
    }
}

// ---------- Tree diagram view (natural frequencies) ----------
function drawTreeView(x, y, w, h, r) {
    const small = w < 430;
    // box widths for the three columns shrink with the panel so the branch labels stay visible
    let wRoot = 100, wMid = 104, wLeaf = 122;
    if (w < 370) { wRoot = 58; wMid = 66; wLeaf = 84; }
    else if (w < 430) { wRoot = 78; wMid = 84; wLeaf = 104; }
    const bh = 42;
    const colGap = (w - 24 - wRoot - wMid - wLeaf) / 2;
    const xRoot = x + 12 + wRoot / 2;
    const x1 = x + 12 + wRoot + colGap + wMid / 2;
    const x2 = x + w - 12 - wLeaf / 2;
    const top = y + 58, bottom = y + h - 78;
    const yMid = (top + bottom) / 2;
    const yL = [top, lerp(top, bottom, 1 / 3), lerp(top, bottom, 2 / 3), bottom];
    const y1 = [(yL[0] + yL[1]) / 2, (yL[2] + yL[3]) / 2];

    noStroke();
    fill(40);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(small ? 12 : 14);
    text('Tree diagram for 1,000 people', x + 10, y + 8);
    textStyle(NORMAL);

    // branches with probability labels
    const branch = (xa, ya, xb, yb, col, label) => {
        stroke(col);
        strokeWeight(3);
        line(xa, ya, xb, yb);
        const mx = (xa + xb) / 2, my = (ya + yb) / 2;
        noStroke();
        fill(255);
        rect(mx - 19, my - 10, 38, 20, 5);
        fill(col);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textSize(small ? 11 : 13);
        text(label, mx, my + 1);
        textStyle(NORMAL);
    };
    branch(xRoot + wRoot / 2, yMid, x1 - wMid / 2, y1[0], diseaseRed, prior + '%');
    branch(xRoot + wRoot / 2, yMid, x1 - wMid / 2, y1[1], healthyTeal, (100 - prior) + '%');
    branch(x1 + wMid / 2, y1[0], x2 - wLeaf / 2, yL[0], resultOrange, sens + '%');
    branch(x1 + wMid / 2, y1[0], x2 - wLeaf / 2, yL[1], neutralColor, (100 - sens) + '%');
    branch(x1 + wMid / 2, y1[1], x2 - wLeaf / 2, yL[2], resultOrange, (100 - spec) + '%');
    branch(x1 + wMid / 2, y1[1], x2 - wLeaf / 2, yL[3], neutralColor, spec + '%');

    // nodes
    const node = (cx, cy, bw, line1, line2, fillCol, borderCol, weight, ink) => {
        fill(fillCol);
        stroke(borderCol);
        strokeWeight(weight);
        rect(cx - bw / 2, cy - bh / 2, bw, bh, 8);
        noStroke();
        fill(ink);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        let ts = small ? 10 : 12;
        textSize(ts);
        while (textWidth(line1) > bw - 6 && ts > 8) { ts--; textSize(ts); }
        text(line1, cx, cy - 8);
        textStyle(NORMAL);
        ts = small ? 10 : 12;
        textSize(ts);
        while (textWidth(line2) > bw - 6 && ts > 8) { ts--; textSize(ts); }
        text(line2, cx, cy + 9);
    };
    node(xRoot, yMid, wRoot, 'Population', '1,000 people', 255, 120, 2, 30);
    node(x1, y1[0], wMid, 'Disease', fmtCount(r.D) + ' people', diseaseFaded, diseaseRed, 2, 30);
    node(x1, y1[1], wMid, 'No disease', fmtCount(r.H) + ' people', healthyFaded, healthyTeal, 2, 30);
    node(x2, yL[0], wLeaf, 'Test +: ' + fmtCount(r.TP), 'true positives', diseaseRed, truePosGold, 4, 255);
    node(x2, yL[1], wLeaf, 'Test −: ' + fmtCount(r.FN), 'false negatives', diseaseFaded, 200, 1, 90);
    node(x2, yL[2], wLeaf, 'Test +: ' + fmtCount(r.FP), 'false positives', healthyTeal, falsePosOrange, 4, 255);
    node(x2, yL[3], wLeaf, 'Test −: ' + fmtCount(r.TN), 'true negatives', healthyFaded, 200, 1, 90);

    // summary of the positive branches
    noStroke();
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    let ts = small ? 11 : 13;
    textSize(ts);
    fill(resultOrange);
    const l1 = 'Positive tests: ' + fmtCount(r.TP) + ' + ' + fmtCount(r.FP) + ' = ' + fmtCount(r.TP + r.FP);
    const l2 = 'With disease: ' + fmtCount(r.TP) + ' / ' + fmtCount(r.TP + r.FP) + ' = ' + fmtPct(r.posterior);
    text(l1, x + 12, y + h - 50);
    fill(30);
    text(l2, x + 12, y + h - 30);
    textStyle(NORMAL);
}

// ---------- Bayes' theorem calculation ----------
function drawBayesPanel(x, y, w, h, r) {
    fill(255);
    stroke(210);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    const small = w < 250;
    const lx = x + 10;
    let ty = y + 8;
    noStroke();
    textAlign(LEFT, TOP);

    fill(40);
    textStyle(BOLD);
    textSize(small ? 13 : 15);
    text('Bayes\' Theorem', lx, ty);
    ty += small ? 20 : 24;

    const fs = small ? 11 : 13;
    const lh = fs + 6;
    const fitLine = (str, col, bold) => {
        let s = fs;
        textStyle(bold ? BOLD : NORMAL);
        textSize(s);
        while (textWidth(str) > w - 20 && s > 8) { s--; textSize(s); }
        fill(col);
        text(str, lx, ty);
        ty += lh;
        textStyle(NORMAL);
    };

    fitLine('P(D | +) = P(+ | D) × P(D) / P(+)', sylviaGreenDark, true);
    ty += 4;
    fitLine('True positives: P(+ | D) × P(D)', neutralColor, false);
    fitLine('= ' + r.se.toFixed(2) + ' × ' + r.p.toFixed(2) + ' = ' + r.jointTP.toFixed(4), diseaseRed, true);
    fitLine('False positives: P(+ | no D) × P(no D)', neutralColor, false);
    fitLine('= ' + r.fpRate.toFixed(2) + ' × ' + (1 - r.p).toFixed(2) + ' = ' + r.jointFP.toFixed(4), healthyTeal, true);
    fitLine('All positives: P(+)', neutralColor, false);
    fitLine('= ' + r.jointTP.toFixed(4) + ' + ' + r.jointFP.toFixed(4) + ' = ' + r.pPos.toFixed(4), 30, true);
    ty += 4;
    fitLine('P(D | +) = ' + r.jointTP.toFixed(4) + ' / ' + r.pPos.toFixed(4), sylviaGreenDark, true);

    // headline result
    fill(resultOrange);
    textStyle(BOLD);
    textSize(small ? 30 : 38);
    text(fmtPct(r.posterior), lx, ty + 2);
    ty += small ? 40 : 50;
    textStyle(NORMAL);

    // comparison statements
    fill(30);
    textSize(small ? 11 : 13);
    const pct = fmtPct(r.posterior);
    let msg = (r.posterior < 0.5 ? 'Only ' : '') + pct + ' of positive tests are actually true positives.';
    if (r.FP > r.TP) {
        msg += ' The test catches ' + sens + '% of real cases, but the ' + fmtCount(r.H) +
            ' healthy people produce more false positives (' + fmtCount(r.FP) + ') than there are true positives (' +
            fmtCount(r.TP) + ').';
    } else {
        msg += ' Here true positives (' + fmtCount(r.TP) + ') outnumber false positives (' + fmtCount(r.FP) +
            '), so a positive result is more likely right than wrong.';
    }
    const lines = wrapLines(msg, w - 20);
    const mlh = small ? 14 : 16;
    for (let i = 0; i < lines.length; i++) {
        if (ty + (i + 1) * mlh > y + h - 4) break;
        text(lines[i], lx, ty + i * mlh);
    }
}

// ---------- Controls (drawn on the canvas) ----------
function drawControls() {
    // Row 1: three sliders, label above each track
    const colGap = 22;
    const colW = (canvasWidth - 2 * margin - 2 * colGap) / 3;
    const yLabel = drawHeight + 16, yTrack = drawHeight + 40;
    const small = canvasWidth < 640;
    const defs = [
        { id: 'prior', label: small ? 'Prior P(D)' : 'Prior P(Disease)', value: prior, min: 1, max: 50 },
        { id: 'sens', label: small ? 'Sensitivity' : 'Sensitivity P(+ | D)', value: sens, min: 70, max: 99 },
        { id: 'spec', label: small ? 'Specificity' : 'Specificity P(− | no D)', value: spec, min: 70, max: 99 }
    ];
    for (let i = 0; i < 3; i++) {
        const d = defs[i];
        const sx = margin + i * (colW + colGap);
        noStroke();
        fill(40);
        textAlign(LEFT, CENTER);
        let ts = small ? 12 : 14;
        textSize(ts);
        const lab = d.label + ': ' + d.value + '%';
        while (textWidth(lab) > colW && ts > 9) { ts--; textSize(ts); }
        text(lab, sx, yLabel);
        uiSlider(d.id, sx + 9, yTrack, colW - 18, d.value, d.min, d.max, 1);
    }

    // Row 2: view, grouping, reset
    const y2 = drawHeight + 62, bh = 30, gap = 10;
    const segW = small ? 88 : 108;
    let x = margin;
    uiButton('view-icons', x, y2, segW, bh, 'Icon Array', { selected: view === 'icons' });
    uiButton('view-tree', x + segW, y2, segW, bh, 'Tree Diagram', { selected: view === 'tree' });
    x += 2 * segW + gap;
    const wReset = small ? 60 : 76;
    const wGroup = min(230, canvasWidth - margin - x - wReset - gap);
    uiButton('group', x, y2, wGroup, bh, grouped ? 'Group by Disease Status' : 'Group by Test Result',
        { enabled: view === 'icons', fill: resultOrange });
    uiButton('reset', canvasWidth - margin - wReset, y2, wReset, bh, 'Reset', { fill: neutralColor });
}

function uiButton(id, x, y, w, h, label, opts) {
    opts = opts || {};
    const enabled = opts.enabled !== false;
    const hover = enabled && overRect(x, y, w, h);
    const base = color(opts.fill || sylviaGreen);
    const isSeg = opts.selected !== undefined;

    if (!enabled) { fill(228); stroke(200); }
    else if (isSeg && !opts.selected) { fill(hover ? '#E8F5E9' : 255); stroke(sylviaGreen); }
    else {
        fill(hover && !isSeg ? lerpColor(base, color(255), 0.22) : base);
        stroke(lerpColor(base, color(0), 0.3));
    }
    strokeWeight(1);
    rect(x, y, w, h, 6);

    noStroke();
    fill(!enabled ? 150 : (isSeg && !opts.selected ? sylviaGreenDark : 255));
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    let ts = 14;
    textSize(ts);
    while (textWidth(label) > w - 8 && ts > 9) { ts--; textSize(ts); }
    text(label, x + w / 2, y + h / 2 + 1);
    textStyle(NORMAL);

    uiButtons.push({ id: id, x: x, y: y, w: w, h: h, enabled: enabled });
    if (hover) uiHover = true;
}

function uiSlider(id, x, y, w, value, minV, maxV, step) {
    const t = (value - minV) / (maxV - minV);
    stroke(190);
    strokeWeight(1);
    fill(232);
    rect(x, y - 4, w, 8, 4);
    noStroke();
    fill(sylviaGreen);
    rect(x, y - 4, w * t, 8, 4);
    stroke(sylviaGreenDark);
    strokeWeight(1);
    fill(sylviaGreen);
    ellipse(x + w * t, y, 18, 18);
    uiSliders.push({ id: id, x: x, y: y, w: w, minV: minV, maxV: maxV, step: step });
    if (overRect(x - 10, y - 11, w + 20, 22)) uiHover = true;
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
    for (const s of uiSliders) {
        if (overRect(s.x - 10, s.y - 11, s.w + 20, 22)) {
            activeSlider = s.id;
            setSliderFromMouse(s);
            return;
        }
    }
}

function mouseDragged() {
    if (!activeSlider) return;
    for (const s of uiSliders) {
        if (s.id === activeSlider) setSliderFromMouse(s);
    }
}

function mouseReleased() {
    activeSlider = null;
}

function setSliderFromMouse(s) {
    const t = constrain((mouseX - s.x) / s.w, 0, 1);
    const v = constrain(Math.round(s.minV + t * (s.maxV - s.minV)), s.minV, s.maxV);
    if (s.id === 'prior') prior = v;
    if (s.id === 'sens') sens = v;
    if (s.id === 'spec') spec = v;
}

function handleButton(id) {
    if (id === 'view-icons') view = 'icons';
    else if (id === 'view-tree') view = 'tree';
    else if (id === 'group') grouped = !grouped;
    else if (id === 'reset') {
        prior = defaults.prior;
        sens = defaults.sens;
        spec = defaults.spec;
        grouped = false;
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
