(function () {
    'use strict';

    // ── Configuration ──────────────────────────────────────────────────────────
    const N_POINTS = 300;   // data points per generation
    const MEAN     = 50;    // fixed mean (center of 0–100 axis)
    const NUM_BINS = 20;    // histogram buckets
    const X_MIN    = 0;
    const X_MAX    = 100;
    const BIN_W    = (X_MAX - X_MIN) / NUM_BINS; // 5 units per bin

    let currentSD = 8;

    // ── Normal Distribution Sampler (Box-Muller transform) ─────────────────────
    function randNormal(mean, sd) {
        let u, v;
        do { u = Math.random(); } while (u === 0);
        do { v = Math.random(); } while (v === 0);
        return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }

    // ── Build Histogram Bin Counts ─────────────────────────────────────────────
    function generateBins(sd) {
        const counts = new Array(NUM_BINS).fill(0);
        for (let i = 0; i < N_POINTS; i++) {
            const x = randNormal(MEAN, sd);
            if (x >= X_MIN && x < X_MAX) {
                const idx = Math.min(Math.floor((x - X_MIN) / BIN_W), NUM_BINS - 1);
                counts[idx]++;
            }
        }
        return counts;
    }

    // X-axis labels: left edge of each bin ("0", "5", "10", … "95")
    const binLabels = Array.from({ length: NUM_BINS }, (_, i) =>
        String(X_MIN + i * BIN_W)
    );

    // ── Custom Plugin: SD Width Overlay ────────────────────────────────────────
    //
    // Draws on top of the bars:
    //   • Semi-transparent shaded band from mean−σ to mean+σ (±1 SD zone)
    //   • Dashed vertical lines at mean±σ
    //   • Solid vertical mean line
    //   • Double-headed arrow bracket from mean to mean+σ (width = 1 SD)
    //   • Text label "1 SD = X.X" centered above the bracket
    //
    const sdOverlayPlugin = {
        id: 'sdOverlay',
        afterDraw(chart) {
            const { ctx, chartArea, scales } = chart;
            if (!chartArea || !scales.x) return;

            const { left, right, top, bottom } = chartArea;

            // Map a data-space x value to canvas pixel using bar scale geometry.
            // getPixelForValue(i) returns the pixel at the CENTER of bar i.
            // leftPx is the pixel at the left edge of the first bar (x = X_MIN).
            const barWidthPx = scales.x.getPixelForValue(1) - scales.x.getPixelForValue(0);
            const leftPx     = scales.x.getPixelForValue(0) - barWidthPx / 2;
            const toPx       = (x) => leftPx + ((x - X_MIN) / BIN_W) * barWidthPx;

            const pxMean = toPx(MEAN);
            const pxLo   = toPx(MEAN - currentSD);
            const pxHi   = toPx(MEAN + currentSD);

            // Clamp pixels to the chart area
            const clampX = (px) => Math.max(left, Math.min(right, px));
            const cLo    = clampX(pxLo);
            const cHi    = clampX(pxHi);

            const arrowColor = '#1a4e8a';
            const arrowY     = top - 22;

            ctx.save();

            if (currentSD === 0) {
                // SD = 0: all readings identical — draw only the mean line and a label
                ctx.strokeStyle = 'rgba(26, 106, 184, 0.85)';
                ctx.lineWidth   = 2;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(pxMean, top); ctx.lineTo(pxMean, bottom);
                ctx.stroke();

                const labelText = 'SD = 0 (no spread) — all values are identical';
                ctx.font         = 'bold 12px Arial';
                ctx.textAlign    = 'center';
                ctx.textBaseline = 'bottom';
                const tw = ctx.measureText(labelText).width;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.fillRect(pxMean - tw / 2 - 3, arrowY - 18, tw + 6, 14);
                ctx.fillStyle = arrowColor;
                ctx.fillText(labelText, pxMean, arrowY - 5);
            } else {
                // 1. Semi-transparent ±1 SD shaded band
                ctx.fillStyle = 'rgba(26, 106, 184, 0.13)';
                ctx.fillRect(cLo, top, cHi - cLo, bottom - top);

                // 2. Dashed boundary lines at mean ± σ
                ctx.strokeStyle = 'rgba(26, 106, 184, 0.65)';
                ctx.lineWidth   = 1.5;
                ctx.setLineDash([5, 4]);
                ctx.beginPath();
                ctx.moveTo(cLo, top);    ctx.lineTo(cLo, bottom);
                ctx.moveTo(cHi, top);    ctx.lineTo(cHi, bottom);
                ctx.stroke();

                // 3. Solid mean line
                ctx.setLineDash([]);
                ctx.strokeStyle = 'rgba(26, 106, 184, 0.85)';
                ctx.lineWidth   = 2;
                ctx.beginPath();
                ctx.moveTo(pxMean, top); ctx.lineTo(pxMean, bottom);
                ctx.stroke();

                // 4. SD bracket: double-headed arrow from mean to mean+σ
                //    Drawn ~22 px above the chartArea top (inside layout padding).
                const ah = 5; // arrowhead half-height

                ctx.strokeStyle = arrowColor;
                ctx.fillStyle   = arrowColor;
                ctx.lineWidth   = 2;
                ctx.setLineDash([]);

                // Horizontal shaft
                ctx.beginPath();
                ctx.moveTo(pxMean, arrowY);
                ctx.lineTo(pxHi,   arrowY);
                ctx.stroke();

                // Vertical tick marks at both ends
                ctx.beginPath();
                ctx.moveTo(pxMean, arrowY - 5); ctx.lineTo(pxMean, arrowY + 5);
                ctx.moveTo(pxHi,   arrowY - 5); ctx.lineTo(pxHi,   arrowY + 5);
                ctx.stroke();

                // Left arrowhead at mean (pointing left — outward)
                ctx.beginPath();
                ctx.moveTo(pxMean,            arrowY);
                ctx.lineTo(pxMean + ah * 1.6, arrowY - ah);
                ctx.lineTo(pxMean + ah * 1.6, arrowY + ah);
                ctx.closePath(); ctx.fill();

                // Right arrowhead at mean+σ (pointing right — outward)
                ctx.beginPath();
                ctx.moveTo(pxHi,            arrowY);
                ctx.lineTo(pxHi - ah * 1.6, arrowY - ah);
                ctx.lineTo(pxHi - ah * 1.6, arrowY + ah);
                ctx.closePath(); ctx.fill();

                // Label "1 SD = X.X" centered above the bracket
                const labelText = `1 SD = ${currentSD.toFixed(1)}`;
                const midX      = (pxMean + pxHi) / 2;
                ctx.font         = 'bold 12px Arial';
                ctx.textAlign    = 'center';
                ctx.textBaseline = 'bottom';

                // White background rectangle behind text for readability
                const tw = ctx.measureText(labelText).width;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.fillRect(midX - tw / 2 - 3, arrowY - 18, tw + 6, 14);

                ctx.fillStyle = arrowColor;
                ctx.fillText(labelText, midX, arrowY - 5);
            }

            ctx.restore();
        }
    };

    // ── Chart Initialization ───────────────────────────────────────────────────
    const chartCtx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(chartCtx, {
        type: 'bar',
        data: {
            labels: binLabels,
            datasets: [{
                label: 'Count of Readings',
                data: generateBins(currentSD),
                backgroundColor: 'rgba(54, 162, 235, 0.65)',
                borderColor:     'rgba(54, 162, 235, 0.95)',
                borderWidth:     1,
                barPercentage:      1.0,
                categoryPercentage: 1.0,
            }]
        },
        options: {
            responsive:          true,
            maintainAspectRatio: false,
            animation: { duration: 350 },
            // Top padding creates space for the SD bracket annotation
            layout: { padding: { top: 50, right: 10, bottom: 4, left: 4 } },
            plugins: {
                legend: { display: false },
                title: { display: false },
                tooltip: {
                    callbacks: {
                        title: (items) => {
                            const lo = Number(items[0].label);
                            return `Value: ${lo}–${lo + BIN_W}`;
                        },
                        label: (item) => `Count: ${item.raw}`
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text:    'Experimental Value',
                        font:    { size: 13, weight: 'bold' }
                    },
                    ticks: {
                        // Show labels every 4th bin: 0, 20, 40, 60, 80
                        callback: (_, idx) => idx % 4 === 0 ? binLabels[idx] : null,
                        maxRotation: 0,
                        minRotation: 0,
                    },
                    grid: { display: false }
                },
                y: {
                    title: {
                        display: true,
                        text:    'Count of Readings',
                        font:    { size: 13, weight: 'bold' }
                    },
                    beginAtZero: true,
                    ticks: { precision: 0 },
                    grid:  { color: 'rgba(0, 0, 0, 0.07)' }
                }
            }
        },
        plugins: [sdOverlayPlugin]
    });

    // ── Controls ───────────────────────────────────────────────────────────────
    function refresh() {
        chart.data.datasets[0].data = generateBins(currentSD);
        chart.update();
    }

    document.getElementById('regenBtn').addEventListener('click', refresh);

    document.getElementById('sdSlider').addEventListener('input', function () {
        currentSD = parseFloat(this.value);
        document.getElementById('sd-val').textContent = currentSD.toFixed(1);
        refresh();
    });

}());
