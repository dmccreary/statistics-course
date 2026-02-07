# Learning Graph Viewer Installation Log

**Date:** 2026-02-07
**Skill:** book-installer → learning-graph-viewer
**Project:** AP Statistics Intelligent Textbook

---

## Summary

Installed the interactive Learning Graph Viewer MicroSim to visualize the 300-concept learning graph for AP Statistics. During installation, discovered and fixed an issue where taxonomy classifierNames were set to IDs instead of human-readable names.

---

## Prerequisites Verified

| Requirement | Status |
|-------------|--------|
| `docs/learning-graph/learning-graph.json` exists | ✅ (52KB, 300 nodes) |
| JSON has metadata with title | ✅ "AP Statistics Learning Graph" |
| MkDocs project structure | ✅ |

---

## Files Created

| File | Purpose |
|------|---------|
| `docs/sims/graph-viewer/main.html` | Main viewer HTML application |
| `docs/sims/graph-viewer/script.js` | vis-network visualization logic |
| `docs/sims/graph-viewer/local.css` | Styling with Sylvia green theme (#2E7D32) |
| `docs/sims/graph-viewer/index.md` | Documentation page with embedded iframe |

---

## Files Modified

### mkdocs.yml

Added navigation entry for the graph viewer:

```yaml
- MicroSims:
  - List of MicroSims: sims/index.md
  - Learning Graph Viewer: sims/graph-viewer/index.md   # NEW
  - Addition Rule Visualizer: sims/addition-rule-visualizer/index.md
  # ... rest of MicroSims
```

### docs/learning-graph/learning-graph.json

**Issue Found:** Most taxonomy groups had `classifierName` set to the taxonomy ID instead of a human-readable name.

**Before:**
```json
"EDA1": {
  "classifierName": "EDA1",
  "color": "PeachPuff"
}
```

**After:**
```json
"EDA1": {
  "classifierName": "Exploratory Data Analysis I",
  "color": "PeachPuff"
}
```

**All 14 taxonomy categories updated:**

| Taxonomy ID | classifierName (Updated) |
|-------------|--------------------------|
| FOUND | Foundation Concepts |
| EDA1 | Exploratory Data Analysis I |
| EDA2 | Exploratory Data Analysis II |
| REG | Regression & Correlation |
| STUDY | Study Design |
| PROB | Probability |
| RAND | Random Variables |
| SAMP | Sampling Distributions |
| CIPR | Confidence Intervals |
| HTPR | Hypothesis Testing |
| TMEA | Inference for Means |
| CHISQ | Chi-Square Tests |
| REGF | Regression Inference |
| COMM | Communication & Synthesis |

---

## Viewer Features

The installed graph viewer provides:

- **Search**: Type-ahead search with dropdown results showing category badges
- **Category Filtering**: Checkboxes to show/hide taxonomy groups, with "Check All" / "Uncheck All" buttons
- **Statistics Panel**: Real-time counts of visible nodes, edges, and foundational concepts
- **Interactive Graph**:
  - vis-network with forceAtlas2Based physics solver
  - Auto-stops physics after 5 seconds
  - Re-enables physics on node drag
  - Node highlighting shows connected concepts (dims others for 3 seconds)
  - Pan/zoom navigation
- **Collapsible Sidebar**: Toggle button for full-screen graph viewing

---

## Technical Details

### Dependencies

- vis-network.js (CDN: `https://unpkg.com/vis-network/standalone/umd/vis-network.min.js`)

### Data Path

The script loads the learning graph from:
```javascript
fetch('../../learning-graph/learning-graph.json')
```

### Color Theme

Uses Sylvia the Statistical Squirrel's green theme:
- Header: `#2E7D32` (Sylvia green)
- Focus ring: `rgba(46, 125, 50, 0.1)`
- Stats numbers: `#2E7D32`
- Graph background: `aliceblue`

---

## Verification

**URL to test:**
```
http://127.0.0.1:8000/statistics-course/sims/graph-viewer/main.html
```

Or navigate via MkDocs: **MicroSims → Learning Graph Viewer**

---

## Session Notes

1. Initial installation completed successfully with all 4 files created
2. User reported legend showing taxonomy IDs instead of readable names
3. Investigation revealed `classifierName` values in learning-graph.json were set to IDs
4. Fixed by updating all 14 groups with proper human-readable names
5. The learning-graph-generator skill should be updated to ensure proper classifierNames are set during initial generation

---

## Related Skills

- `learning-graph-generator` - Creates the learning-graph.json file
- `book-installer` - Parent skill that routes to this installation
