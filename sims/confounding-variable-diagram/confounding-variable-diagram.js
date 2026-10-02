// Confounding Variable Visualizer MicroSim
// CANVAS_HEIGHT: 530
// Students analyze how a confounding variable C creates an apparent X-Y
// relationship, then hold C constant to see the direct effect that remains.
// Bloom Level: Analyze (L4) - analyze
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 420;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;

let margin = 20;
let defaultTextSize = 14;

// Sylvia theme colors
const sylviaGreen = '#2E7D32';
const sylviaGreenDark = '#1B5E20';
const sylviaAuburn = '#B5651D';
const sylviaCream = '#FFF8E1';
const observedBlue = '#1565C0';   // observed X-Y relationship
const confoundRed = '#C62828';    // confounded pathway
const neutralColor = '#546E7A';
const cLevelColors = ['#FFB74D', '#EF6C00', '#8E0000'];  // low, medium, high C

// Preset scenarios. Strengths are illustrative settings for the simulation,
// not estimates from real studies.
const presets = [
    { name: 'Coffee & Heart Disease', x: 'Coffee drinking', y: 'Heart disease risk', c: 'Smoking', direct: 0.0, cx: 0.7, cy: 0.7 },
    { name: 'Ice Cream & Drowning', x: 'Ice cream sales', y: 'Drownings', c: 'Hot weather', direct: 0.0, cx: 0.8, cy: 0.6 },
    { name: 'Books & Income', x: 'Books owned', y: 'Income', c: 'Education', direct: 0.0, cx: 0.6, cy: 0.7 },
    { name: 'Acorns & Birds', x: 'Acorns collected', y: 'Birds spotted', c: 'Sunny weather', direct: 0.0, cx: 0.7, cy: 0.6 },
    { name: 'Breakfast & Test Scores', x: 'Eating breakfast', y: 'Test scores', c: 'Sleep habits', direct: 0.3, cx: 0.6, cy: 0.6 }
];

// State
let presetIndex = 0;
let direct = 0.0;      // true direct effect of X on Y
let strengthCX = 0.7;  // strength of C -> X
let strengthCY = 0.7;  // strength of C -> Y
let revealed = false;  // confounder shown?
let holdC = false;     // remove confounding (hold C constant)?
let adjT = 0;          // 0..1 animation toward the adjusted scatterplot

// Simulated data
const nPoints = 300;
const noiseY = 0.6;
let zc = [], e1 = [], e2 = [];
let stats = null;

// canvas UI state
let uiButtons = [];
let uiSliders = [];
let uiHover = false;
let activeSlider = null;
let dropdown = null;
let dropdownOpen = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textSize(defaultTextSize);
    newNoise();
    loadPreset(0);
    describe('A causal diagram with nodes X, Y and a hidden confounder C beside a scatterplot of ' +
        'simulated data. Revealing the confounder colors the points by the level of C, and holding C ' +
        'constant shows how much of the X-Y relationship remains.', LABEL);
}

function newNoise() {
    zc = []; e1 = []; e2 = [];
    for (let i = 0; i < nPoints; i++) {
        zc.push(randomGaussian());
        e1.push(randomGaussian());
        e2.push(randomGaussian());
    }
}

function loadPreset(i) {
    presetIndex = i;
    const p = presets[i];
    direct = p.direct;
    strengthCX = p.cx;
    strengthCY = p.cy;
    revealed = false;
    holdC = false;
    adjT = 0;
}

// ---------- Statistics (all computed from the simulated sample) ----------
function mean(a) {
    let s = 0;
    for (const v of a) s += v;
    return s / a.length;
}

function covariance(a, b) {
    const ma = mean(a), mb = mean(b);
    let s = 0;
    for (let i = 0; i < a.length; i++) s += (a[i] - ma) * (b[i] - mb);
    return s / (a.length - 1);
}

function correlation(a, b) {
    return covariance(a, b) / Math.sqrt(covariance(a, a) * covariance(b, b));
}

// Build X and Y from the structural model, then compute observed and
// adjusted (C held constant) relationships.
function computeStats() {
    const X = [], Y = [];
    const sx = Math.sqrt(1 - strengthCX * strengthCX);
    for (let i = 0; i < nPoints; i++) {
        const x = strengthCX * zc[i] + sx * e1[i];
        X.push(x);
        Y.push(direct * x + strengthCY * zc[i] + noiseY * e2[i]);
    }
    const mX = mean(X), mY = mean(Y), mC = mean(zc);
    const varC = covariance(zc, zc);
    const bXC = covariance(X, zc) / varC;   // slope of X on C
    const bYC = covariance(Y, zc) / varC;   // slope of Y on C

    // Residuals: the part of X and Y NOT explained by C
    const rX = [], rY = [];
    for (let i = 0; i < nPoints; i++) {
        rX.push(mX + (X[i] - mX) - bXC * (zc[i] - mC));
        rY.push(mY + (Y[i] - mY) - bYC * (zc[i] - mC));
    }

    // tertile cut points for coloring points by level of C
    const sorted = zc.slice().sort((a, b) => a - b);
    const cut1 = sorted[Math.floor(nPoints / 3)];
    const cut2 = sorted[Math.floor(2 * nPoints / 3)];

    return {
        X: X, Y: Y, rX: rX, rY: rY, cut1: cut1, cut2: cut2,
        rObserved: correlation(X, Y),
        slopeObserved: covariance(X, Y) / covariance(X, X),
        rAdjusted: correlation(rX, rY),
        slopeAdjusted: covariance(rX, rY) / covariance(rX, rX)
    };
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
    text('Confounding Variable Visualizer', canvasWidth / 2, 10);
    textStyle(NORMAL);

    // animate toward the adjusted (C held constant) view
    const target = holdC ? 1 : 0;
    if (adjT < target) adjT = min(1, adjT + 0.04);
    if (adjT > target) adjT = max(0, adjT - 0.04);

    stats = computeStats();

    const split = canvasWidth * 0.45;
    drawCausalDiagram(margin, 42, split - margin - 6, 256);
    drawScatter(split + 6, 42, canvasWidth - margin - split - 6, 256);
    drawExplanation(margin, 306, canvasWidth - 2 * margin, 106);
    drawControls();
    drawDropdownList();
    cursor(uiHover ? HAND : ARROW);
}

// ---------- Causal diagram ----------
function drawCausalDiagram(px, py, pw, ph) {
    const p = presets[presetIndex];
    fill(255);
    stroke(210);
    strokeWeight(1);
    rect(px, py, pw, ph, 8);

    const bw = min(132, pw * 0.39), bh = 46;
    const xX = px + 10 + bw / 2, xY = px + pw - 10 - bw / 2;
    const yXY = py + ph - 62, xC = px + pw / 2, yC = py + 52;

    // X -> Y link
    const x1 = xX + bw / 2 + 3, x2 = xY - bw / 2 - 3;
    noStroke();
    textAlign(CENTER, TOP);
    textSize(13);
    if (!revealed) {
        drawArrow(x1, yXY, x2, yXY, observedBlue, 1.5 + 6 * min(1, abs(stats.rObserved)));
        fill(observedBlue);
        textStyle(BOLD);
        text('X causes Y?', px + pw / 2, yXY + bh / 2 + 6);
        textStyle(NORMAL);
        text('observed r = ' + nf2(stats.rObserved), px + pw / 2, yXY + bh / 2 + 23);
    } else {
        if (direct > 0.001) {
            drawArrow(x1, yXY, x2, yXY, observedBlue, 1.5 + 6 * direct);
        } else {
            stroke(170);
            strokeWeight(2);
            drawingContext.setLineDash([5, 5]);
            line(x1, yXY, x2, yXY);
            drawingContext.setLineDash([]);
            noStroke();
        }
        fill(observedBlue);
        textStyle(BOLD);
        text('direct effect: ' + nf2(direct), px + pw / 2, yXY + bh / 2 + 6);
        textStyle(NORMAL);
        if (direct <= 0.001) text('(X does not cause Y)', px + pw / 2, yXY + bh / 2 + 23);

        // confounded pathway: C -> X and C -> Y
        const fade = holdC ? 90 : 255;
        const red = color(confoundRed);
        red.setAlpha(fade);
        if (strengthCX > 0.001) drawArrow(xC - bw / 4, yC + bh / 2 + 2, xX, yXY - bh / 2 - 4, red, 1.5 + 6 * strengthCX);
        if (strengthCY > 0.001) drawArrow(xC + bw / 4, yC + bh / 2 + 2, xY, yXY - bh / 2 - 4, red, 1.5 + 6 * strengthCY);
        noStroke();
        fill(red);
        textSize(13);
        textStyle(BOLD);
        const midY = (yC + bh / 2 + yXY - bh / 2) / 2;
        textAlign(RIGHT, CENTER);
        text(nf2(strengthCX), (xC - bw / 4 + xX) / 2 - 12, midY);
        textAlign(LEFT, CENTER);
        text(nf2(strengthCY), (xC + bw / 4 + xY) / 2 + 12, midY);
        textStyle(NORMAL);

        drawNode(xC, yC, bw, bh, 'C', p.c, confoundRed);
        if (holdC) {
            noStroke();
            fill(confoundRed);
            textAlign(CENTER, BOTTOM);
            textSize(12);
            textStyle(BOLD);
            text('held constant', xC, yC - bh / 2 - 3);
            textStyle(NORMAL);
        }
    }

    if (!revealed) {
        // placeholder for the hidden variable
        fill(250);
        stroke(170);
        strokeWeight(2);
        drawingContext.setLineDash([6, 5]);
        rect(xC - bw / 2, yC - bh / 2, bw, bh, 9);
        drawingContext.setLineDash([]);
        noStroke();
        fill(neutralColor);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textSize(22);
        text('?', xC, yC + 1);
        textStyle(NORMAL);
        textSize(13);
        const hint = wrapLines('Is a hidden variable behind this relationship?', pw - 30);
        for (let i = 0; i < hint.length; i++) text(hint[i], px + pw / 2, yC + bh / 2 + 16 + i * 17);
    }

    drawNode(xX, yXY, bw, bh, 'X', p.x, observedBlue);
    drawNode(xY, yXY, bw, bh, 'Y', p.y, observedBlue);
}

function drawNode(cx, cy, w, h, letter, name, col) {
    fill(255);
    stroke(col);
    strokeWeight(2);
    rect(cx - w / 2, cy - h / 2, w, h, 9);

    fill(col);
    noStroke();
    ellipse(cx - w / 2 + 17, cy, 24, 24);
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(14);
    text(letter, cx - w / 2 + 17, cy + 1);

    fill(30);
    textSize(w < 125 ? 11 : 13);
    const lines = wrapLines(name, w - 40);
    const lh = 15;
    const y0 = cy - ((lines.length - 1) * lh) / 2;
    for (let i = 0; i < lines.length; i++) text(lines[i], cx + 13, y0 + i * lh + 1);
    textStyle(NORMAL);
}

// Arrow color is passed in (p5.js stroke() does not return the current color)
function drawArrow(x1, y1, x2, y2, col, weight) {
    const a = atan2(y2 - y1, x2 - x1);
    const s = 9 + weight;
    stroke(col);
    strokeWeight(weight);
    line(x1, y1, x2 - (s - 2) * cos(a), y2 - (s - 2) * sin(a));
    fill(col);
    noStroke();
    triangle(x2, y2,
        x2 - s * cos(a - 0.42), y2 - s * sin(a - 0.42),
        x2 - s * cos(a + 0.42), y2 - s * sin(a + 0.42));
}

// ---------- Scatterplot of the simulated data ----------
function drawScatter(px, py, pw, ph) {
    const p = presets[presetIndex];
    fill(255);
    stroke(210);
    strokeWeight(1);
    rect(px, py, pw, ph, 8);

    // plot frame
    const gx = px + 34, gy = py + 30, gw = pw - 48, gh = ph - 74;
    stroke(150);
    strokeWeight(1);
    line(gx, gy, gx, gy + gh);
    line(gx, gy + gh, gx + gw, gy + gh);

    const xLo = -3.2, xHi = 3.2, yLo = -4.2, yHi = 4.2;
    const sx = v => gx + (constrain(v, xLo, xHi) - xLo) / (xHi - xLo) * gw;
    const sy = v => gy + gh - (constrain(v, yLo, yHi) - yLo) / (yHi - yLo) * gh;

    // points move from observed positions to C-adjusted positions
    const ease = adjT * adjT * (3 - 2 * adjT);
    const px2 = [], py2 = [];
    noStroke();
    for (let i = 0; i < nPoints; i++) {
        const xv = lerp(stats.X[i], stats.rX[i], ease);
        const yv = lerp(stats.Y[i], stats.rY[i], ease);
        px2.push(xv);
        py2.push(yv);
        let col;
        if (revealed) {
            const level = zc[i] < stats.cut1 ? 0 : (zc[i] < stats.cut2 ? 1 : 2);
            col = color(cLevelColors[level]);
        } else {
            col = color(observedBlue);
        }
        col.setAlpha(170);
        fill(col);
        ellipse(sx(xv), sy(yv), 6, 6);
    }

    // least-squares line through the points as currently plotted
    const slope = covariance(px2, py2) / covariance(px2, px2);
    const icpt = mean(py2) - slope * mean(px2);
    stroke(observedBlue);
    strokeWeight(3);
    const lx1 = -2.9, lx2 = 2.9;
    line(sx(lx1), sy(icpt + slope * lx1), sx(lx2), sy(icpt + slope * lx2));

    // headline statistic
    noStroke();
    fill(observedBlue);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(13);
    const showAdj = adjT > 0.5;
    const head = showAdj
        ? 'C held constant:  slope ' + nf2(stats.slopeAdjusted) + ',  r = ' + nf2(stats.rAdjusted)
        : 'Observed:  slope ' + nf2(stats.slopeObserved) + ',  r = ' + nf2(stats.rObserved);
    text(head, px + 10, py + 8);
    textStyle(NORMAL);

    // axis labels (variable names, low -> high; simulated standardized values)
    fill(60);
    textSize(12);
    textAlign(CENTER, TOP);
    text(p.x + (showAdj ? ' (adjusted for C)' : ''), gx + gw / 2, gy + gh + 5);
    push();
    translate(px + 16, gy + gh / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text(p.y, 0, 0);
    pop();

    // legend
    textSize(12);
    textAlign(LEFT, CENTER);
    const ly = py + ph - 13;
    if (revealed) {
        let lx = px + 10;
        fill(60);
        text(p.c + ':', lx, ly);
        lx += textWidth(p.c + ':') + 8;
        const names = ['low', 'medium', 'high'];
        for (let k = 0; k < 3; k++) {
            fill(cLevelColors[k]);
            ellipse(lx + 4, ly, 9, 9);
            fill(60);
            text(names[k], lx + 12, ly);
            lx += textWidth(names[k]) + 24;
        }
    } else {
        fill(neutralColor);
        text('Simulated data: each dot is one individual', px + 10, ly);
    }
}

// ---------- Explanation text ----------
function drawExplanation(x, y, w, h) {
    const p = presets[presetIndex];
    // difference of the displayed (rounded) values so the arithmetic on screen adds up
    const extra = Number(nf2(stats.slopeObserved)) - Number(nf2(stats.slopeAdjusted));
    const noConfounding = strengthCX < 0.001 || strengthCY < 0.001;
    let heading, body, col;

    if (!revealed) {
        col = observedBlue;
        heading = 'What you observe';
        body = p.x + ' and ' + p.y.toLowerCase() + ' rise together in this simulated data (r = ' +
            nf2(stats.rObserved) + '). It is tempting to conclude that X causes Y. ' +
            'Click "Reveal Confounder" to see what else could explain the pattern.';
    } else if (!holdC) {
        col = confoundRed;
        heading = 'Confounder revealed: ' + p.c;
        if (noConfounding) {
            body = 'A confounder must be associated with BOTH variables. With the C → ' +
                (strengthCX < 0.001 ? 'X' : 'Y') + ' strength at 0, ' + p.c.toLowerCase() +
                ' cannot create a false X–Y link, so the observed slope (' + nf2(stats.slopeObserved) +
                ') is close to the direct effect (' + nf2(stats.slopeAdjusted) + ').';
        } else {
            body = p.c + ' is associated with both X and Y, which opens a second path between them ' +
                '(red arrows). Of the observed slope ' + nf2(stats.slopeObserved) + ', about ' + nf2(extra) +
                ' comes from that path, and only ' + nf2(stats.slopeAdjusted) +
                ' is left once C is accounted for. Click "Hold C Constant" to see it.';
        }
    } else {
        col = sylviaGreenDark;
        heading = 'Holding ' + p.c.toLowerCase() + ' constant';
        body = 'After removing the part of X and Y explained by C, the slope changes from ' +
            nf2(stats.slopeObserved) + ' to ' + nf2(stats.slopeAdjusted) + ' (r from ' +
            nf2(stats.rObserved) + ' to ' + nf2(stats.rAdjusted) + '). ';
        if (noConfounding) {
            body += 'Almost nothing changed, so C was not confounding this relationship.';
        } else if (direct < 0.001) {
            body += 'The direct effect is set to 0.00, so the small leftover slope is just random ' +
                'sampling variation. The apparent relationship was created by the confounder.';
        } else {
            body += 'That is close to the direct effect you set (' + nf2(direct) + '). The rest of ' +
                'the apparent relationship was created by the confounder.';
        }
    }

    fill(255, 255, 255, 235);
    stroke(col);
    strokeWeight(2);
    rect(x, y, w, h, 10);

    noStroke();
    fill(col);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(15);
    text(heading, x + 12, y + 8);
    textStyle(NORMAL);
    fill(40);
    textSize(canvasWidth < 640 ? 12 : 14);
    const lh = canvasWidth < 640 ? 16 : 18;
    const lines = wrapLines(body, w - 24);
    for (let i = 0; i < lines.length; i++) text(lines[i], x + 12, y + 30 + i * lh);
}

// ---------- Controls (drawn on the canvas) ----------
function drawControls() {
    const y1 = drawHeight + 8, h1 = 30, gap = 8;
    const avail = canvasWidth - 2 * margin - 4 * gap;
    const wDrop = avail * 0.30, wRev = avail * 0.23, wHold = avail * 0.22, wNew = avail * 0.14, wReset = avail * 0.11;

    let x = margin;
    uiDropdown(x, y1, wDrop, h1);
    x += wDrop + gap;
    uiButton('reveal', x, y1, wRev, h1, revealed ? 'Hide Confounder' : 'Reveal Confounder', { fill: confoundRed });
    x += wRev + gap;
    uiButton('hold', x, y1, wHold, h1, holdC ? 'Release C' : 'Hold C Constant', { enabled: revealed, fill: sylviaGreen });
    x += wHold + gap;
    uiButton('new', x, y1, wNew, h1, 'New Data', { fill: observedBlue });
    x += wNew + gap;
    uiButton('reset', x, y1, wReset, h1, 'Reset', { fill: neutralColor });

    // Sliders: three columns, label above each track
    const colGap = 24;
    const colW = (canvasWidth - 2 * margin - 2 * colGap) / 3;
    const yLabel = drawHeight + 60, yTrack = drawHeight + 86;
    const defs = [
        { id: 'direct', label: 'Direct effect X → Y', value: direct, enabled: true },
        { id: 'cx', label: 'C → X strength', value: strengthCX, enabled: revealed },
        { id: 'cy', label: 'C → Y strength', value: strengthCY, enabled: revealed }
    ];
    for (let i = 0; i < 3; i++) {
        const d = defs[i];
        const sx = margin + i * (colW + colGap);
        noStroke();
        fill(d.enabled ? 40 : 120);
        textAlign(LEFT, CENTER);
        textSize(canvasWidth < 600 ? 12 : 14);
        text(d.label + ': ' + nf2(d.value), sx, yLabel);
        uiSlider(d.id, sx + 9, yTrack, colW - 18, d.value, 0, 0.9, 0.05, d.enabled);
    }
}

function uiButton(id, x, y, w, h, label, opts) {
    opts = opts || {};
    const enabled = opts.enabled !== false;
    const hover = enabled && !dropdownOpen && overRect(x, y, w, h);
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

    uiButtons.push({ id: id, x: x, y: y, w: w, h: h, enabled: enabled });
    if (hover) uiHover = true;
}

function uiSlider(id, x, y, w, value, minV, maxV, step, enabled) {
    const t = (value - minV) / (maxV - minV);
    stroke(190);
    strokeWeight(1);
    fill(232);
    rect(x, y - 4, w, 8, 4);
    noStroke();
    fill(enabled ? sylviaGreen : 200);
    rect(x, y - 4, w * t, 8, 4);
    stroke(enabled ? sylviaGreenDark : 180);
    strokeWeight(1);
    fill(enabled ? sylviaGreen : 215);
    ellipse(x + w * t, y, 18, 18);
    uiSliders.push({ id: id, x: x, y: y, w: w, minV: minV, maxV: maxV, step: step, enabled: enabled });
    if (enabled && !dropdownOpen && overRect(x - 10, y - 12, w + 20, 24)) uiHover = true;
}

// Scenario selector drawn on the canvas; the option list opens upward
function uiDropdown(x, y, w, h) {
    const hover = overRect(x, y, w, h);
    fill(255);
    stroke(dropdownOpen || hover ? sylviaGreen : 150);
    strokeWeight(dropdownOpen ? 2 : 1);
    rect(x, y, w, h, 6);
    noStroke();
    fill(30);
    textAlign(LEFT, CENTER);
    let ts = 14;
    textSize(ts);
    const label = presets[presetIndex].name;
    while (textWidth(label) > w - 30 && ts > 9) { ts--; textSize(ts); }
    text(label, x + 8, y + h / 2 + 1);
    fill(80);
    triangle(x + w - 18, y + h / 2 - 3, x + w - 8, y + h / 2 - 3, x + w - 13, y + h / 2 + 4);
    dropdown = { x: x, y: y, w: w, h: h, itemH: 28, listW: max(w, 210) };
    if (hover) uiHover = true;
}

function drawDropdownList() {
    if (!dropdownOpen || !dropdown) return;
    const d = dropdown;
    const listH = presets.length * d.itemH;
    const ly = d.y - listH - 2;
    fill(255);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(d.x, ly, d.listW, listH, 6);
    for (let i = 0; i < presets.length; i++) {
        const iy = ly + i * d.itemH;
        const hover = overRect(d.x, iy, d.listW, d.itemH);
        noStroke();
        if (hover || i === presetIndex) {
            fill(hover ? '#C8E6C9' : '#E8F5E9');
            rect(d.x + 2, iy + 2, d.listW - 4, d.itemH - 4, 4);
        }
        if (hover) uiHover = true;
        fill(30);
        textAlign(LEFT, CENTER);
        textSize(14);
        text(presets[i].name, d.x + 10, iy + d.itemH / 2 + 1);
    }
}

function overRect(x, y, w, h) {
    return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

function nf2(v) {
    const s = (Math.abs(v) < 0.005 ? 0 : v).toFixed(2);
    return s;
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
    // open dropdown list gets the click first
    if (dropdownOpen) {
        const d = dropdown;
        const listH = presets.length * d.itemH;
        const ly = d.y - listH - 2;
        if (overRect(d.x, ly, d.listW, listH)) {
            const i = constrain(floor((mouseY - ly) / d.itemH), 0, presets.length - 1);
            loadPreset(i);
            newNoise();
        }
        dropdownOpen = false;
        return;
    }
    if (dropdown && overRect(dropdown.x, dropdown.y, dropdown.w, dropdown.h)) {
        dropdownOpen = true;
        return;
    }
    for (const b of uiButtons) {
        if (b.enabled && overRect(b.x, b.y, b.w, b.h)) {
            handleButton(b.id);
            return;
        }
    }
    for (const s of uiSliders) {
        if (s.enabled && overRect(s.x - 10, s.y - 12, s.w + 20, 24)) {
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
    let v = s.minV + t * (s.maxV - s.minV);
    v = Math.round(v / s.step) * s.step;
    v = Math.round(constrain(v, s.minV, s.maxV) * 100) / 100;
    if (s.id === 'direct') direct = v;
    if (s.id === 'cx') strengthCX = v;
    if (s.id === 'cy') strengthCY = v;
}

function handleButton(id) {
    if (id === 'reveal') {
        revealed = !revealed;
        if (!revealed) holdC = false;
    } else if (id === 'hold') {
        holdC = !holdC;
    } else if (id === 'new') {
        newNoise();
    } else if (id === 'reset') {
        loadPreset(presetIndex);
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
