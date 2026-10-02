// Randomization Balance Simulator MicroSim
// CANVAS_HEIGHT: 532
// Students randomly assign subjects to treatment and control groups and see how
// chance balances visible characteristics and a hidden variable, especially as
// the sample size grows.
// Bloom Level: Apply (L3) - apply
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 82;
let canvasHeight = drawHeight + controlHeight;

let margin = 20;
let defaultTextSize = 14;

// Sylvia theme colors
const sylviaGreen = '#2E7D32';
const sylviaGreenDark = '#1B5E20';
const sylviaAuburn = '#B5651D';
const sylviaCream = '#FFF8E1';
const treatColor = '#2E7D32';
const controlColor = '#1565C0';
const neutralColor = '#546E7A';
const hiddenGold = '#FFC107';

// Characteristics of each subject. share = fraction of the population with the trait.
const traits = [
    { key: 'older', label: 'Older', toggle: 'Age', share: 0.5 },
    { key: 'female', label: 'Female', toggle: 'Gender', share: 0.5 },
    { key: 'exper', label: 'Experienced', toggle: 'Experience', share: 0.4 },
    { key: 'hidden', label: 'Motivated (hidden)', toggle: null, share: 0.5 }
];

const sizes = [20, 50, 100, 200];
let sizeIndex = 1;
let N = sizes[sizeIndex];

let subjects = [];
let assigned = false;
let animT = 1;                 // 0..1 animation of subjects moving to their groups
let show = { older: true, female: true, exper: true };
let revealHidden = false;
let tracked = 'older';         // characteristic shown in the imbalance plot
let results = {};              // results[N][key] = list of gaps (Treatment % - Control %)
let lastStats = null;

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
    resetAll();
    describe('A population of subject icons is randomly split into a treatment group and a control ' +
        'group. A table compares the percentage of each characteristic in the two groups, and a plot ' +
        'shows how the gap between groups varies over many randomizations and shrinks as the sample ' +
        'size grows.', LABEL);
}

function resetAll() {
    results = {};
    for (const n of sizes) {
        results[n] = {};
        for (const t of traits) results[n][t.key] = [];
    }
    buildPopulation();
}

// Each trait is given to an exact share of the subjects, independently of the others
function buildPopulation() {
    N = sizes[sizeIndex];
    subjects = [];
    for (let i = 0; i < N; i++) subjects.push({ group: null, slot: 0 });
    for (const t of traits) {
        const count = Math.round(N * t.share);
        const idxs = shuffle([...Array(N).keys()]);
        for (let i = 0; i < N; i++) subjects[idxs[i]][t.key] = i < count;
    }
    assigned = false;
    animT = 1;
    lastStats = null;
}

// Completely randomized design: shuffle everyone, first half -> Treatment, rest -> Control
function randomizeOnce(animate) {
    const idxs = shuffle([...Array(N).keys()]);
    for (let i = 0; i < N; i++) subjects[idxs[i]].group = i < N / 2 ? 0 : 1;
    let k0 = 0, k1 = 0;
    for (const s of subjects) s.slot = s.group === 0 ? k0++ : k1++;
    assigned = true;
    lastStats = computeStats();
    for (const t of traits) results[N][t.key].push(lastStats[t.key].gap);
    animT = animate ? 0 : 1;
}

// Percentage of each group that has each trait, and the gap between the groups
function computeStats() {
    const st = {};
    for (const t of traits) {
        let ct = 0, cc = 0, nt = 0, nc = 0;
        for (const s of subjects) {
            if (s.group === 0) { nt++; if (s[t.key]) ct++; }
            else { nc++; if (s[t.key]) cc++; }
        }
        const pt = 100 * ct / nt, pc = 100 * cc / nc;
        st[t.key] = { t: pt, c: pc, gap: pt - pc };
    }
    return st;
}

function meanAbs(arr) {
    if (arr.length === 0) return null;
    let s = 0;
    for (const v of arr) s += Math.abs(v);
    return s / arr.length;
}

function shownTraits() {
    return traits.filter(t => t.key === 'hidden' ? revealHidden : show[t.key]);
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
    text('Randomization Balance Simulator', canvasWidth / 2, 10);
    textStyle(NORMAL);

    if (animT < 1) animT = min(1, animT + 0.03);

    // keep the tracked characteristic among the ones on screen
    const visible = shownTraits();
    if (visible.length > 0 && !visible.some(t => t.key === tracked)) tracked = visible[0].key;

    const leftW = canvasWidth * 0.56;
    drawGroups(margin, 40, leftW - margin);
    drawBalanceTable(leftW + 12, 40, canvasWidth - margin - leftW - 12);
    drawImbalancePlot(leftW + 12, 232, canvasWidth - margin - leftW - 12, 210);
    drawControls();
    cursor(uiHover ? HAND : ARROW);
}

// ---------- Population and groups ----------
function gridLayout(box, count) {
    const availW = box.w - 12, availH = box.h - 26;
    let cell = floor(sqrt(availW * availH / (count * 1.4)));
    cell = constrain(cell, 5, 26);
    let cols = max(1, floor(availW / cell));
    while (ceil(count / cols) * cell * 1.4 > availH && cell > 4) {
        cell--;
        cols = max(1, floor(availW / cell));
    }
    cols = min(cols, count);
    return {
        cell: cell, cols: cols,
        x0: box.x + 6 + (availW - cols * cell) / 2 + cell / 2,
        y0: box.y + 23 + cell * 0.7
    };
}

function slotPos(layout, k) {
    return {
        x: layout.x0 + (k % layout.cols) * layout.cell,
        y: layout.y0 + floor(k / layout.cols) * layout.cell * 1.4
    };
}

function drawGroups(x, y, w) {
    const pool = { x: x, y: y, w: w, h: 92 };
    const gw = (w - 10) / 2;
    const treat = { x: x, y: y + 100, w: gw, h: 164 };
    const ctrl = { x: x + gw + 10, y: y + 100, w: gw, h: 164 };

    drawBox(pool, 'Population: ' + N + ' subjects' + (assigned ? ' (all assigned)' : ' waiting'), neutralColor);
    drawBox(treat, 'Treatment group' + (assigned ? ' (n = ' + N / 2 + ')' : ''), treatColor);
    drawBox(ctrl, 'Control group' + (assigned ? ' (n = ' + N / 2 + ')' : ''), controlColor);

    const lp = gridLayout(pool, N);
    const lt = gridLayout(treat, N / 2);
    const lc = gridLayout(ctrl, N / 2);
    const e = animT * animT * (3 - 2 * animT);

    for (let i = 0; i < N; i++) {
        const s = subjects[i];
        const p0 = slotPos(lp, i);
        let px = p0.x, py = p0.y, cell = lp.cell;
        if (assigned) {
            const lg = s.group === 0 ? lt : lc;
            const p1 = slotPos(lg, s.slot);
            px = lerp(p0.x, p1.x, e);
            py = lerp(p0.y, p1.y, e);
            cell = lerp(lp.cell, lg.cell, e);
        }
        drawSubject(s, px, py, cell);
    }

    drawLegend(x, y + 270, w);
    drawMessage(x, y + 318, w, 90);
}

function drawBox(b, label, col) {
    fill(255);
    stroke(col);
    strokeWeight(2);
    rect(b.x, b.y, b.w, b.h, 8);
    noStroke();
    fill(col);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    let ts = 13;
    textSize(ts);
    while (textWidth(label) > b.w - 16 && ts > 9) { ts--; textSize(ts); }
    text(label, b.x + 8, b.y + 5);
    textStyle(NORMAL);
}

// Icon encodings: height = age, shape = gender, color = experience, gold dot = hidden variable
function drawSubject(s, x, y, cell) {
    const w = cell * 0.7;
    let h = cell * 0.95;
    if (show.older) h = s.older ? cell * 1.25 : cell * 0.75;
    let col = '#90A4AE';
    if (show.exper) col = s.exper ? sylviaAuburn : '#64B5F6';
    fill(col);
    stroke(60, 120);
    strokeWeight(cell > 10 ? 1 : 0.5);
    if (show.female && !s.female) rect(x - w / 2, y - h / 2, w, h, 1);
    else ellipse(x, y, w, h);
    if (revealHidden && s.hidden) {
        fill(hiddenGold);
        stroke(60);
        strokeWeight(cell > 10 ? 1 : 0.5);
        ellipse(x, y, max(3, w * 0.5), max(3, w * 0.5));
    }
}

function drawLegend(x, y, w) {
    const small = w < 380;
    noStroke();
    fill(60);
    textAlign(LEFT, CENTER);
    textSize(small ? 10 : 12);
    let lx = x, ly = y + 8;
    const items = [];
    if (show.older) items.push({ kind: 'age', label: 'tall = older' });
    if (show.female) items.push({ kind: 'gender', label: 'round = female, square = male' });
    if (show.exper) items.push({ kind: 'exper', label: 'brown = experienced' });
    if (revealHidden) items.push({ kind: 'hidden', label: 'gold dot = motivated' });
    if (items.length === 0) {
        fill(neutralColor);
        text('Turn on a characteristic below to see it on the icons.', x, ly);
        return;
    }
    for (const it of items) {
        const iw = 18 + textWidth(it.label) + 14;
        if (lx + iw > x + w + 4 && lx > x) { lx = x; ly += 18; }
        stroke(60, 120);
        strokeWeight(1);
        if (it.kind === 'age') { fill('#90A4AE'); ellipse(lx + 6, ly, 8, 15); }
        if (it.kind === 'gender') { fill('#90A4AE'); ellipse(lx + 3, ly, 8, 10); rect(lx + 9, ly - 5, 7, 10, 1); }
        if (it.kind === 'exper') { fill(sylviaAuburn); ellipse(lx + 6, ly, 9, 11); }
        if (it.kind === 'hidden') { fill('#90A4AE'); ellipse(lx + 6, ly, 10, 12); fill(hiddenGold); stroke(60); ellipse(lx + 6, ly, 5, 5); }
        noStroke();
        fill(60);
        text(it.label, lx + 19, ly + 1);
        lx += iw;
    }
}

function drawMessage(x, y, w, h) {
    let msg;
    const vis = shownTraits();
    if (!assigned) {
        msg = 'Click Randomize to let chance decide who gets the treatment. Then compare the two groups.';
    } else if (vis.length === 0) {
        msg = 'Turn on a characteristic (or reveal the hidden variable) to check how well the groups are balanced.';
    } else {
        let worst = vis[0];
        for (const t of vis) if (Math.abs(lastStats[t.key].gap) > Math.abs(lastStats[worst.key].gap)) worst = t;
        const g = Math.abs(lastStats[worst.key].gap);
        msg = 'Largest gap between the groups: ' + g.toFixed(0) + ' points (' + worst.label.replace(' (hidden)', '') + '). ';
        if (revealHidden) {
            const hg = Math.abs(lastStats.hidden.gap).toFixed(0);
            if (Number(hg) <= 10) {
                msg += 'Nobody used motivation to form the groups, yet chance split it almost evenly (' + hg +
                    '-point gap). Randomization balances unknown variables too.';
            } else {
                msg += 'Nobody used motivation to form the groups. This time chance left a ' + hg +
                    '-point gap in it. Randomization balances hidden variables on average, not perfectly every time.';
            }
        } else if (g <= 10) {
            msg += 'Chance alone made the groups similar. No characteristic was used to decide who went where.';
        } else {
            msg += 'Chance does not guarantee a perfect match, but it never systematically favors one group. Try a larger sample size.';
        }
    }
    fill(255, 255, 255, 235);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 8);
    noStroke();
    fill(40);
    textAlign(LEFT, TOP);
    let ts = canvasWidth < 640 ? 12 : 14;
    textSize(ts);
    let lines = wrapLines(msg, w - 20);
    if (lines.length * (ts + 4) > h - 12) { ts -= 1; textSize(ts); lines = wrapLines(msg, w - 20); }
    if (lines.length * (ts + 4) > h - 12) { ts -= 1; textSize(ts); lines = wrapLines(msg, w - 20); }
    for (let i = 0; i < lines.length; i++) text(lines[i], x + 10, y + 8 + i * (ts + 4));
}

// ---------- Balance table ----------
function drawBalanceTable(x, y, w) {
    const vis = shownTraits();
    const rowH = 26, headH = 44;
    const h = 186;
    fill(255);
    stroke(210);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    noStroke();
    fill(40);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(14);
    text('Balance check', x + 10, y + 7);
    textStyle(NORMAL);

    const cT = x + w * 0.56, cC = x + w * 0.76, cG = x + w - 8;
    textSize(w < 250 ? 10 : 12);
    textAlign(RIGHT, TOP);
    fill(treatColor);
    text('Treat.', cT, y + 28);
    fill(controlColor);
    text('Control', cC, y + 28);
    fill(60);
    text('Gap', cG, y + 28);

    if (vis.length === 0) {
        fill(neutralColor);
        textAlign(LEFT, TOP);
        textSize(12);
        const lines = wrapLines('No characteristics selected. Use the checkboxes below.', w - 20);
        for (let i = 0; i < lines.length; i++) text(lines[i], x + 10, y + headH + 6 + i * 16);
        return;
    }

    for (let i = 0; i < vis.length; i++) {
        const t = vis[i];
        const ry = y + headH + i * rowH;
        const isTracked = t.key === tracked;
        const hover = overRect(x + 4, ry, w - 8, rowH);
        if (isTracked || hover) {
            fill(isTracked ? '#FFF3E0' : '#F1F8E9');
            stroke(isTracked ? sylviaAuburn : 220);
            strokeWeight(1);
            rect(x + 4, ry, w - 8, rowH - 2, 5);
        }
        if (hover) uiHover = true;
        uiButtons.push({ id: 'track-' + t.key, x: x + 4, y: ry, w: w - 8, h: rowH, enabled: true });

        noStroke();
        fill(30);
        textAlign(LEFT, CENTER);
        let ts = w < 250 ? 11 : 13;
        textSize(ts);
        while (textWidth(t.label) > w * 0.40 && ts > 9) { ts--; textSize(ts); }
        text(t.label, x + 10, ry + rowH / 2);

        textSize(w < 250 ? 11 : 13);
        textAlign(RIGHT, CENTER);
        if (assigned && animT >= 1) {
            const st = lastStats[t.key];
            fill(treatColor);
            text(st.t.toFixed(0) + '%', cT, ry + rowH / 2);
            fill(controlColor);
            text(st.c.toFixed(0) + '%', cC, ry + rowH / 2);
            fill(30);
            textStyle(BOLD);
            text((st.gap > 0 ? '+' : '') + st.gap.toFixed(0), cG, ry + rowH / 2);
            textStyle(NORMAL);
        } else {
            fill(120);
            text('?', cT, ry + rowH / 2);
            text('?', cC, ry + rowH / 2);
            text('?', cG, ry + rowH / 2);
        }
    }

    noStroke();
    fill(neutralColor);
    textAlign(LEFT, TOP);
    textSize(w < 250 ? 11 : 12);
    const note = wrapLines('Gap = Treatment % minus Control %. Click a row to track it.', w - 18);
    for (let i = 0; i < note.length && i < 2; i++) text(note[i], x + 10, y + h - 33 + i * 14);
}

// ---------- Imbalance across many randomizations ----------
function drawImbalancePlot(x, y, w, h) {
    fill(255);
    stroke(210);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    const t = traits.find(tr => tr.key === tracked);
    const vals = results[N][tracked];
    const visible = shownTraits().some(tr => tr.key === tracked);

    noStroke();
    fill(40);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    let ts = 14;
    textSize(ts);
    const head = 'Gaps over many randomizations';
    while (textWidth(head) > w - 16 && ts > 10) { ts--; textSize(ts); }
    text(head, x + 10, y + 7);
    textStyle(NORMAL);
    textSize(12);
    fill(sylviaAuburn);
    text(visible ? t.label.replace(' (hidden)', '') + ', n = ' + N + ', runs: ' + vals.length : 'Select a characteristic', x + 10, y + 26);

    // plot frame
    const gx = x + 14, gy = y + 48, gw = w - 28, gh = h - 124;
    const lim = 70;
    const sx = v => gx + (constrain(v, -lim, lim) + lim) / (2 * lim) * gw;
    stroke(150);
    strokeWeight(1);
    line(gx, gy + gh, gx + gw, gy + gh);
    stroke(200);
    drawingContext.setLineDash([3, 3]);
    line(sx(0), gy, sx(0), gy + gh);
    drawingContext.setLineDash([]);
    noStroke();
    fill(70);
    textSize(12);
    textAlign(CENTER, TOP);
    for (const v of [-60, -30, 0, 30, 60]) text((v > 0 ? '+' : '') + v, sx(v), gy + gh + 3);
    text('gap (percentage points)', gx + gw / 2, gy + gh + 17);

    if (visible && vals.length > 0) {
        // spike plot: one bar for each distinct gap value
        const counts = {};
        let maxCount = 0;
        for (const v of vals) {
            const k = (Math.round(constrain(v, -lim, lim) * 10) / 10).toFixed(1);
            counts[k] = (counts[k] || 0) + 1;
            if (counts[k] > maxCount) maxCount = counts[k];
        }
        const stepPx = (200 / N) / (2 * lim) * gw;   // gaps move in steps of about 200/N points
        const bw = constrain(stepPx - 1, 2, 16);
        noStroke();
        fill(sylviaAuburn);
        for (const k in counts) {
            const bh = counts[k] / maxCount * (gh - 4);
            rect(sx(Number(k)) - bw / 2, gy + gh - bh, bw, bh);
        }
        // most recent run
        if (assigned) {
            const last = vals[vals.length - 1];
            fill(30);
            triangle(sx(last), gy + gh + 1, sx(last) - 5, gy + gh + 9, sx(last) + 5, gy + gh + 9);
        }
    } else {
        noStroke();
        textSize(12);
        fill(255);
        rect(gx + gw / 2 - textWidth('Randomize to add results') / 2 - 6, gy + gh / 2 - 10, textWidth('Randomize to add results') + 12, 20);
        fill(neutralColor);
        textAlign(CENTER, CENTER);
        text('Randomize to add results', gx + gw / 2, gy + gh / 2);
    }

    // typical gap by sample size
    const cy = y + h - 40;
    noStroke();
    fill(40);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(12);
    text('Typical gap by sample size', x + 10, cy - 4);
    textStyle(NORMAL);
    const cw = (w - 20) / 4;
    for (let i = 0; i < sizes.length; i++) {
        const n = sizes[i];
        const m = meanAbs(results[n][tracked]);
        const cx = x + 10 + i * cw;
        fill(n === N ? '#FFF3E0' : 248);
        stroke(n === N ? sylviaAuburn : 215);
        strokeWeight(1);
        rect(cx + 1, cy + 12, cw - 3, 24, 5);
        noStroke();
        fill(m === null ? 120 : 30);
        textAlign(CENTER, CENTER);
        textSize(cw < 58 ? 9 : (cw < 66 ? 11 : 12));
        text('n=' + n + ': ' + (m === null ? '?' : m.toFixed(1)), cx + cw / 2, cy + 25);
    }
}

// ---------- Controls (drawn on the canvas) ----------
function drawControls() {
    const y1 = drawHeight + 8, h1 = 30, gap = 8;
    const narrow = canvasWidth < 620;
    const wRand = narrow ? 86 : 104, wRun = narrow ? 104 : 124, wReset = narrow ? 56 : 68;

    let x = margin;
    uiButton('randomize', x, y1, wRand, h1, 'Randomize', { fill: sylviaGreen });
    x += wRand + gap;
    uiButton('run100', x, y1, wRun, h1, 'Run 100 More', { fill: sylviaAuburn });
    x += wRun + gap;
    uiButton('reset', x, y1, wReset, h1, 'Reset', { fill: neutralColor });
    x += wReset + gap + 6;

    // sample size slider with four stops
    noStroke();
    fill(40);
    textAlign(LEFT, CENTER);
    textSize(narrow ? 12 : 14);
    const label = 'Sample size: ' + N;
    text(label, x, y1 + h1 / 2);
    const sxStart = x + textWidth('Sample size: 200') + 16;
    uiSlider('size', sxStart, y1 + h1 / 2, canvasWidth - margin - 9 - sxStart, sizeIndex, 0, sizes.length - 1, 1);

    // Row 2: characteristic toggles
    const y2 = drawHeight + 48;
    let cx = margin;
    noStroke();
    fill(40);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(narrow ? 11 : 13);
    if (!narrow) {
        text('Show:', cx, y2 + 11);
        cx += textWidth('Show:') + 10;
    }
    textStyle(NORMAL);
    for (const t of traits) {
        if (!t.toggle) continue;
        cx += uiCheckbox('show-' + t.key, cx, y2, t.toggle, show[t.key], narrow) + (narrow ? 8 : 14);
    }
    uiCheckbox('hidden', cx + (narrow ? 0 : 8), y2, 'Reveal hidden variable', revealHidden, narrow);
}

function uiCheckbox(id, x, y, label, checked, narrow) {
    const box = 18;
    textSize(narrow ? 11 : 13);
    const w = box + 6 + textWidth(label);
    const hover = overRect(x - 2, y - 2, w + 4, box + 8);
    fill(255);
    stroke(checked ? sylviaGreen : 130);
    strokeWeight(2);
    rect(x, y + 2, box, box, 3);
    if (checked) {
        stroke(sylviaGreen);
        strokeWeight(3);
        line(x + 4, y + 11, x + 8, y + 15);
        line(x + 8, y + 15, x + 14, y + 7);
    }
    noStroke();
    fill(30);
    textAlign(LEFT, CENTER);
    text(label, x + box + 6, y + 12);
    uiButtons.push({ id: id, x: x - 2, y: y - 2, w: w + 4, h: box + 8, enabled: true });
    if (hover) uiHover = true;
    return w;
}

function uiButton(id, x, y, w, h, label, opts) {
    opts = opts || {};
    const enabled = opts.enabled !== false;
    const hover = enabled && overRect(x, y, w, h);
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

function uiSlider(id, x, y, w, value, minV, maxV, step) {
    const t = (value - minV) / (maxV - minV);
    stroke(190);
    strokeWeight(1);
    fill(232);
    rect(x, y - 4, w, 8, 4);
    noStroke();
    fill(sylviaGreen);
    rect(x, y - 4, w * t, 8, 4);
    // tick marks at each stop
    stroke(120);
    strokeWeight(1);
    for (let v = minV; v <= maxV; v += step) {
        const tx = x + w * (v - minV) / (maxV - minV);
        line(tx, y + 7, tx, y + 11);
    }
    stroke(sylviaGreenDark);
    fill(sylviaGreen);
    ellipse(x + w * t, y, 18, 18);
    uiSliders.push({ id: id, x: x, y: y, w: w, minV: minV, maxV: maxV, step: step });
    if (overRect(x - 10, y - 12, w + 20, 24)) uiHover = true;
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
        if (overRect(s.x - 10, s.y - 12, s.w + 20, 24)) {
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
    if (v !== sizeIndex) {
        sizeIndex = v;
        buildPopulation();   // new population; earlier results for other sizes are kept
    }
}

function handleButton(id) {
    if (id === 'randomize') {
        randomizeOnce(true);
    } else if (id === 'run100') {
        for (let i = 0; i < 100; i++) randomizeOnce(false);
    } else if (id === 'reset') {
        resetAll();
    } else if (id === 'hidden') {
        revealHidden = !revealHidden;
        if (revealHidden) tracked = 'hidden';
    } else if (id.startsWith('show-')) {
        const key = id.substring(5);
        show[key] = !show[key];
    } else if (id.startsWith('track-')) {
        tracked = id.substring(6);
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
