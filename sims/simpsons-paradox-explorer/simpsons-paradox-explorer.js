// Simpson's Paradox Explorer MicroSim
// CANVAS_HEIGHT: 562
// Students compare combined (aggregated) success rates with rates separated
// by subgroup and decide when the combined comparison is misleading.
// Bloom Level: Evaluate (L5) - evaluate
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 410;
let controlHeight = 152;
let canvasHeight = drawHeight + controlHeight;

let margin = 20;
let defaultTextSize = 14;

// Sylvia theme colors
const sylviaGreen = '#2E7D32';
const sylviaGreenDark = '#1B5E20';
const sylviaAuburn = '#B5651D';
const sylviaCream = '#FFF8E1';
const higherColor = '#2E7D32';   // green = higher rate
const lowerColor = '#C62828';    // red = lower rate
const tieColor = '#78909C';
const neutralColor = '#546E7A';
const observedBlue = '#1565C0';

// Preset scenarios: cells[group][subgroup] = { n: size, s: successes }
const presets = [
    {
        name: 'Hospitals (chapter example)',
        groups: ['Hospital A', 'Hospital B'], short: ['A', 'B'],
        subs: ['Easy cases', 'Hard cases'], lurking: 'case difficulty',
        rateName: 'survival rate', sizeLabel: 'Patients',
        cells: [[{ n: 900, s: 870 }, { n: 100, s: 10 }], [{ n: 100, s: 99 }, { n: 900, s: 180 }]]
    },
    {
        name: 'Tutoring Companies (Problem 2)',
        groups: ['Company A', 'Company B'], short: ['A', 'B'],
        subs: ['Well-prepared', 'Struggling'], lurking: 'student preparation',
        rateName: 'pass rate', sizeLabel: 'Students',
        cells: [[{ n: 500, s: 450 }, { n: 100, s: 30 }], [{ n: 100, s: 95 }, { n: 500, s: 325 }]]
    },
    {
        // Charig et al. (1986), BMJ 292:879-882: A = open surgery, B = percutaneous nephrolithotomy
        name: 'Kidney Stone Treatments (1986 study)',
        groups: ['Treatment A', 'Treatment B'], short: ['A', 'B'],
        subs: ['Small stones', 'Large stones'], lurking: 'stone size',
        rateName: 'success rate', sizeLabel: 'Patients',
        cells: [[{ n: 87, s: 81 }, { n: 263, s: 192 }], [{ n: 270, s: 234 }, { n: 80, s: 55 }]]
    },
    {
        name: 'College Admissions (made-up data)',
        groups: ['Men', 'Women'], short: ['Men', 'Women'],
        subs: ['Department 1', 'Department 2'], lurking: 'department',
        rateName: 'admission rate', sizeLabel: 'Applicants',
        cells: [[{ n: 800, s: 500 }, { n: 200, s: 50 }], [{ n: 200, s: 140 }, { n: 800, s: 240 }]]
    }
];

// State
let presetIndex = 0;
let cells = [];          // working copy of counts
let separated = false;   // false = combined view, true = separated by subgroup
let viewT = 0;           // 0..1 animation between the two views

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
    loadPreset(0);
    describe('Bar charts compare the success rates of two groups. A combined view shows one pair of ' +
        'bars; the separated view shows a pair of bars for each of two subgroups beside the combined ' +
        'pair, and a banner reports whether Simpson\'s Paradox is present.', LABEL);
}

function loadPreset(i) {
    presetIndex = i;
    cells = presets[i].cells.map(row => row.map(c => ({ n: c.n, s: c.s })));
    separated = false;
    viewT = 0;
}

// ---------- Analysis (all rates come from the integer counts) ----------
function sign(v) {
    return v > 1e-9 ? 1 : (v < -1e-9 ? -1 : 0);
}

function analyze() {
    const a = { rate: [[0, 0], [0, 0]], comb: [0, 0], combN: [0, 0], combS: [0, 0], share2: [0, 0] };
    for (let g = 0; g < 2; g++) {
        for (let k = 0; k < 2; k++) a.rate[g][k] = cells[g][k].s / cells[g][k].n;
        a.combN[g] = cells[g][0].n + cells[g][1].n;
        a.combS[g] = cells[g][0].s + cells[g][1].s;
        a.comb[g] = a.combS[g] / a.combN[g];
        a.share2[g] = cells[g][1].n / a.combN[g];   // share of the group in subgroup 2
    }
    // +1 means group 0 is higher, -1 means group 1 is higher, 0 is a tie
    a.sub = [sign(a.rate[0][0] - a.rate[1][0]), sign(a.rate[0][1] - a.rate[1][1])];
    a.all = sign(a.comb[0] - a.comb[1]);
    a.consistent = a.sub[0] !== 0 && a.sub[0] === a.sub[1];
    a.reversal = a.consistent && a.all === -a.sub[0];
    a.vanishes = a.consistent && a.all === 0;
    return a;
}

function pct(v) {
    return (v * 100).toFixed(1) + '%';
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
    text('Simpson\'s Paradox Explorer', canvasWidth / 2, 10);
    textStyle(NORMAL);

    const target = separated ? 1 : 0;
    if (viewT < target) viewT = min(1, viewT + 0.05);
    if (viewT > target) viewT = max(0, viewT - 0.05);

    const a = analyze();
    drawChart(a);
    drawVerdict(a);
    drawControls();
    drawDropdownList();
    cursor(uiHover ? HAND : ARROW);
}

// ---------- Bar chart ----------
function drawChart(a) {
    const p = presets[presetIndex];
    const gx = margin + 44, gy = 58, gw = canvasWidth - margin - gx, gh = 170;
    const ease = viewT * viewT * (3 - 2 * viewT);

    // axis and gridlines
    textSize(12);
    for (let v = 0; v <= 100; v += 25) {
        const y = gy + gh - (v / 100) * gh;
        stroke(v === 0 ? 120 : 215);
        strokeWeight(1);
        line(gx, y, gx + gw, y);
        noStroke();
        fill(90);
        textAlign(RIGHT, CENTER);
        text(v + '%', gx - 6, y);
    }
    push();
    translate(margin - 6, gy + gh / 2);
    rotate(-HALF_PI);
    noStroke();
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(13);
    text(p.rateName.charAt(0).toUpperCase() + p.rateName.slice(1), 0, 0);
    pop();

    // cluster centers: combined pair slides from the middle to the right
    const cSub1 = gx + gw * (1 / 6), cSub2 = gx + gw * (3 / 6);
    const cComb = lerp(gx + gw / 2, gx + gw * (5 / 6), ease);
    const barW = constrain(gw * 0.105, 34, 84);

    if (ease > 0.02) {
        drawCluster(cSub1, barW, gy, gh, p.subs[0],
            [a.rate[0][0], a.rate[1][0]], [cells[0][0], cells[1][0]], a.sub[0], ease, false);
        drawCluster(cSub2, barW, gy, gh, p.subs[1],
            [a.rate[0][1], a.rate[1][1]], [cells[0][1], cells[1][1]], a.sub[1], ease, false);
        // divider between the subgroup clusters and the combined cluster
        stroke(170, 255 * ease);
        strokeWeight(1);
        drawingContext.setLineDash([4, 4]);
        line(gx + gw * (4 / 6), gy - 6, gx + gw * (4 / 6), gy + gh + 52);
        drawingContext.setLineDash([]);
    }
    drawCluster(cComb, barW, gy, gh, 'Combined',
        [a.comb[0], a.comb[1]],
        [{ n: a.combN[0], s: a.combS[0] }, { n: a.combN[1], s: a.combS[1] }], a.all, 1, true);
}

// One pair of bars. winner: +1 first bar higher, -1 second bar higher, 0 tie.
function drawCluster(cx, barW, gy, gh, title, rates, counts, winner, alpha, bold) {
    const p = presets[presetIndex];
    const gap = 8;
    for (let g = 0; g < 2; g++) {
        const x = cx + (g === 0 ? -barW - gap / 2 : gap / 2);
        const h = rates[g] * gh * (bold ? 1 : alpha);
        const isHigh = (winner === 1 && g === 0) || (winner === -1 && g === 1);
        const col = color(winner === 0 ? tieColor : (isHigh ? higherColor : lowerColor));
        col.setAlpha(255 * alpha);
        fill(col);
        stroke(0, 60 * alpha);
        strokeWeight(1);
        rect(x, gy + gh - h, barW, h, 3, 3, 0, 0);

        noStroke();
        // percentage above the bar
        const ink = color(30);
        ink.setAlpha(255 * alpha);
        fill(ink);
        textAlign(CENTER, BOTTOM);
        textStyle(BOLD);
        textSize(barW < 44 ? 11 : 13);
        text(pct(rates[g]), x + barW / 2, gy + gh - h - 2);
        if (isHigh && alpha > 0.9) {
            fill(higherColor);
            textSize(11);
            text('HIGHER', x + barW / 2, gy + gh - h - 17);
        }
        // group label and counts under the bar
        fill(ink);
        textAlign(CENTER, TOP);
        textSize(barW < 44 ? 11 : 13);
        text(p.short[g], x + barW / 2, gy + gh + 4);
        textStyle(NORMAL);
        textSize(barW < 44 ? 10 : 12);
        text(counts[g].s + '/' + counts[g].n, x + barW / 2, gy + gh + 20);
    }
    const tcol = color(bold ? sylviaAuburn : observedBlue);
    tcol.setAlpha(255 * alpha);
    fill(tcol);
    noStroke();
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(canvasWidth < 560 ? 12 : 14);
    text(title, cx, gy + gh + 36);
    textStyle(NORMAL);
}

// ---------- Verdict banner and explanation ----------
function drawVerdict(a) {
    const p = presets[presetIndex];
    const x = margin, y = 286, w = canvasWidth - 2 * margin;
    const name = g => p.groups[g];
    const overallLeader = a.all === 1 ? 0 : 1;
    let banner, bannerCol, body, warn = false;

    if (!separated) {
        bannerCol = observedBlue;
        if (a.all === 0) {
            banner = 'Combined data: the two groups are tied at ' + pct(a.comb[0]) + '.';
        } else {
            banner = 'Combined data favor ' + name(overallLeader) + ' (' +
                pct(a.comb[overallLeader]) + ' vs ' + pct(a.comb[1 - overallLeader]) + ').';
        }
        body = 'Would you trust this comparison? The two groups may not have the same mix of ' +
            p.subs[0].toLowerCase() + ' and ' + p.subs[1].toLowerCase() +
            '. Click "Reveal Paradox" to separate the data by ' + p.lurking + '.';
    } else {
        const mix = 'Share of each group in "' + p.subs[1] + '": ' + name(0) + ' ' + pct(a.share2[0]) +
            ', ' + name(1) + ' ' + pct(a.share2[1]) + '.';
        if (a.reversal || a.vanishes) {
            const subLeader = a.sub[0] === 1 ? 0 : 1;
            warn = true;
            bannerCol = lowerColor;
            banner = 'Simpson\'s Paradox! BOTH subgroups favor ' + name(subLeader) + ', but ' +
                (a.reversal ? 'the combined data favor ' + name(1 - subLeader) + '.' : 'the combined rates are tied.');
            body = 'Why? The groups have different mixes. ' + mix + ' The group with more of the ' +
                'low-rate subgroup gets dragged down in the combined data. Because ' + p.lurking +
                ' affects the outcome, the fair comparison is within subgroups, which favors ' + name(subLeader) + '.';
        } else if (a.consistent) {
            const subLeader = a.sub[0] === 1 ? 0 : 1;
            bannerCol = higherColor;
            banner = 'No paradox: both subgroups and the combined data favor ' + name(subLeader) + '.';
            body = 'The combined comparison agrees with the subgroup comparisons. ' + mix +
                ' Try giving the two groups very different mixes of subgroups to see whether the combined result can flip.';
        } else {
            bannerCol = neutralColor;
            banner = 'No paradox: the subgroups do not agree on a single winner.';
            body = 'Simpson\'s Paradox needs every subgroup to favor the same group. Here ' +
                describeSub(a, 0) + ' and ' + describeSub(a, 1) + '. ' + mix;
        }
    }

    // banner
    fill(255);
    stroke(bannerCol);
    strokeWeight(2);
    rect(x, y, w, 30, 8);
    let tx = x + 12;
    if (warn) {
        // warning triangle
        fill('#FFB300');
        stroke(lowerColor);
        strokeWeight(1.5);
        triangle(x + 12, y + 23, x + 23, y + 6, x + 34, y + 23);
        noStroke();
        fill(lowerColor);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textSize(12);
        text('!', x + 23, y + 17);
        tx = x + 42;
    }
    noStroke();
    fill(bannerCol);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    let ts = 15;
    textSize(ts);
    while (textWidth(banner) > x + w - tx - 10 && ts > 10) { ts--; textSize(ts); }
    text(banner, tx, y + 16);
    textStyle(NORMAL);

    // explanation
    fill(40);
    textAlign(LEFT, TOP);
    textSize(canvasWidth < 640 ? 12 : 14);
    const lh = canvasWidth < 640 ? 16 : 18;
    const lines = wrapLines(body, w - 12);
    for (let i = 0; i < lines.length; i++) text(lines[i], x + 6, y + 38 + i * lh);
}

function describeSub(a, k) {
    const p = presets[presetIndex];
    if (a.sub[k] === 0) return '"' + p.subs[k] + '" is a tie';
    return '"' + p.subs[k] + '" favors ' + p.groups[a.sub[k] === 1 ? 0 : 1];
}

// ---------- Controls (drawn on the canvas) ----------
function drawControls() {
    const p = presets[presetIndex];
    const y1 = drawHeight + 8, h1 = 30, gap = 8;
    const avail = canvasWidth - 2 * margin - 2 * gap;
    const wDrop = avail * 0.46, wRev = avail * 0.28, wReset = avail * 0.26;

    uiDropdown(margin, y1, wDrop, h1);
    uiButton('reveal', margin + wDrop + gap, y1, wRev, h1,
        separated ? 'Show Combined' : 'Reveal Paradox', { fill: separated ? observedBlue : lowerColor });
    uiButton('reset', margin + wDrop + wRev + 2 * gap, y1, wReset, h1, 'Reset to Classic', { fill: neutralColor });

    // slider grid: one column for each group/subgroup cell
    const colGap = 16;
    const colW = (canvasWidth - 2 * margin - 3 * colGap) / 4;
    const small = colW < 140;
    let col = 0;
    for (let g = 0; g < 2; g++) {
        for (let k = 0; k < 2; k++) {
            const x = margin + col * (colW + colGap);
            const c = cells[g][k];
            noStroke();
            textAlign(LEFT, CENTER);
            // header
            fill(sylviaGreenDark);
            textStyle(BOLD);
            let ts = small ? 11 : 13;
            textSize(ts);
            const head = p.short[g] + ': ' + p.subs[k];
            while (textWidth(head) > colW && ts > 9) { ts--; textSize(ts); }
            text(head, x, drawHeight + 54);
            textStyle(NORMAL);
            // size slider
            fill(40);
            textSize(small ? 11 : 13);
            text(p.sizeLabel + ': ' + c.n, x, drawHeight + 73);
            uiSlider('n-' + g + '-' + k, x + 9, drawHeight + 90, colW - 18, c.n, 10, 1000, 10);
            // rate slider
            text('Rate: ' + pct(c.s / c.n), x, drawHeight + 113);
            uiSlider('r-' + g + '-' + k, x + 9, drawHeight + 130, colW - 18, 100 * c.s / c.n, 0, 100, 1);
            col++;
        }
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

function uiSlider(id, x, y, w, value, minV, maxV, step) {
    const t = constrain((value - minV) / (maxV - minV), 0, 1);
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
    ellipse(x + w * t, y, 16, 16);
    uiSliders.push({ id: id, x: x, y: y, w: w, minV: minV, maxV: maxV, step: step });
    if (!dropdownOpen && overRect(x - 9, y - 10, w + 18, 20)) uiHover = true;
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
    dropdown = { x: x, y: y, w: w, h: h, itemH: 28, listW: max(w, 290) };
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
    if (dropdownOpen) {
        const d = dropdown;
        const listH = presets.length * d.itemH;
        const ly = d.y - listH - 2;
        if (overRect(d.x, ly, d.listW, listH)) {
            loadPreset(constrain(floor((mouseY - ly) / d.itemH), 0, presets.length - 1));
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
        if (overRect(s.x - 9, s.y - 10, s.w + 18, 20)) {
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
    v = constrain(Math.round(v / s.step) * s.step, s.minV, s.maxV);
    const parts = s.id.split('-');
    const c = cells[int(parts[1])][int(parts[2])];
    if (parts[0] === 'n') {
        // change the subgroup size but keep its success rate
        const rate = c.s / c.n;
        c.n = v;
        c.s = Math.round(v * rate);
    } else {
        // change the success rate; successes stay a whole number
        c.s = Math.round(c.n * v / 100);
    }
}

function handleButton(id) {
    if (id === 'reveal') separated = !separated;
    else if (id === 'reset') loadPreset(0);
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
