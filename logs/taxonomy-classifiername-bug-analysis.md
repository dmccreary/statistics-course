# Taxonomy classifierName Bug Analysis

**Date:** 2026-02-07
**Issue:** Taxonomy IDs appearing instead of human-readable names in learning graph viewer and reports

---

## Problem Summary

When generating learning graphs, the `classifierName` field in `learning-graph.json` is often set to the taxonomy ID (e.g., "EDA1") instead of a human-readable name (e.g., "Exploratory Data Analysis I"). This causes:

1. **Graph Viewer Legend** - Shows "EDA1 (68)" instead of "Exploratory Data Analysis I (68)"
2. **Visual Distribution Report** - Shows "EDA1" in the bar chart instead of the category name
3. **Poor User Experience** - Users must mentally decode abbreviations

---

## Root Cause Analysis

### 1. csv-to-json.py (Lines 59-94)

**Problem:** Hardcoded `taxonomy_names` dictionary with limited predefined mappings.

```python
taxonomy_names = {
    'FOUND': 'Foundation Concepts',
    'DEF': 'Definitions',
    'CORE': 'Core Concepts',
    # ... limited set of generic IDs
}
```

**Fallback behavior (line 164):**
```python
classifier_name = taxonomy_names.get(tax_id, tax_id)  # Falls back to ID!
```

When a course uses custom taxonomy IDs like "EDA1", "REG", "HTPR" that aren't in the hardcoded dictionary, the code uses the ID as the classifierName.

### 2. taxonomy-distribution.py (Lines 91-94)

**Problem:** Visual distribution section uses taxonomy IDs instead of names.

```python
for tax, name, count, pct in taxonomy_data:
    bar_length = int(pct / 2)
    bar = "█" * bar_length
    f.write(f"{tax:6s} {bar} {count:3d} ({pct:5.1f}%)\n")  # Uses 'tax', not 'name'
```

The 6-character width is also insufficient for full names.

### 3. Missing taxonomy-names.json Creation Step

**Problem:** SKILL.md doesn't explicitly instruct creation of `taxonomy-names.json` from `concept-taxonomy.md`.

- Step 5 creates `concept-taxonomy.md` with human-readable names
- Step 6 adds TaxonomyID to CSV
- Step 9 runs csv-to-json.py, but no taxonomy-names.json is passed
- The hardcoded fallback kicks in

### 4. Data Flow Gap

```
concept-taxonomy.md (has full names)
        ↓
[MISSING: Extract names to taxonomy-names.json]
        ↓
csv-to-json.py (doesn't read names, uses hardcoded fallback)
        ↓
learning-graph.json (classifierName = ID, not name)
```

---

## Evidence from Statistics Course

### taxonomy-names.json EXISTS but isn't used:
```json
{
  "FOUND": "Foundations",
  "EDA1": "Univariate Analysis",
  "EDA2": "Bivariate Analysis",
  ...
}
```

### learning-graph.json had WRONG values:
```json
"EDA1": {
  "classifierName": "EDA1",  // WRONG - should be "Univariate Analysis"
  "color": "PeachPuff"
}
```

### Fixed manually to:
```json
"EDA1": {
  "classifierName": "Exploratory Data Analysis I",
  "color": "PeachPuff"
}
```

---

## Required Fixes

### Fix 1: Update csv-to-json.py

Make `taxonomy-names.json` a REQUIRED input (not optional) when custom taxonomies are used.

**Changes needed:**
1. Add parameter for taxonomy-names.json
2. Read names from file instead of hardcoded dictionary
3. WARN if any classifierName equals its taxonomy ID
4. Add validation that all used taxonomies have names

**Updated command:**
```bash
python csv-to-json.py learning-graph.csv learning-graph.json metadata.json taxonomy-names.json
```

### Fix 2: Update taxonomy-distribution.py

Use human-readable names in Visual Distribution section.

**Change line 94 from:**
```python
f.write(f"{tax:6s} {bar} {count:3d} ({pct:5.1f}%)\n")
```

**To:**
```python
# Truncate or pad name to fit, use name not ID
display_name = name[:20].ljust(20)  # 20 chars for readability
f.write(f"{display_name} {bar} {count:3d} ({pct:5.1f}%)\n")
```

### Fix 3: Update SKILL.md

Add explicit step to create `taxonomy-names.json` between Steps 5 and 6:

**New Step 5b: Create Taxonomy Names JSON**
```markdown
## Step 5b: Create Taxonomy Names JSON

Extract the taxonomy ID to name mapping from concept-taxonomy.md:

**Create file:** `taxonomy-names.json`

**Format:**
```json
{
  "FOUND": "Foundation Concepts",
  "EDA1": "Exploratory Data Analysis I",
  ...
}
```

This file is REQUIRED for csv-to-json.py to generate correct classifierName values.
```

### Fix 4: Update learning-graph-viewer.md

Add validation step that checks classifierName values BEFORE installation:

```markdown
### Step 0: Validate classifierName Values (REQUIRED)

Before installing the viewer, verify that learning-graph.json has proper classifierName values:

```bash
python -c "
import json
with open('docs/learning-graph/learning-graph.json') as f:
    data = json.load(f)
for gid, ginfo in data['groups'].items():
    name = ginfo.get('classifierName', '')
    if name == gid:
        print(f'❌ {gid}: classifierName equals ID - needs human-readable name')
    else:
        print(f'✅ {gid}: {name}')
"
```

If any classifierName equals its taxonomy ID, fix the learning-graph.json before proceeding.
```

---

## Files to Modify

| File | Location | Change |
|------|----------|--------|
| csv-to-json.py | /Users/dan/Documents/ws/claude-skills/skills/learning-graph-generator/ | Require taxonomy-names.json, add validation |
| taxonomy-distribution.py | /Users/dan/Documents/ws/claude-skills/skills/learning-graph-generator/ | Use names in visual distribution |
| SKILL.md | /Users/dan/Documents/ws/claude-skills/skills/learning-graph-generator/ | Add Step 5b for taxonomy-names.json creation |
| learning-graph-viewer.md | /Users/dan/Documents/ws/claude-skills/skills/book-installer/references/ | Add validation step before installation |

---

## Recommended Implementation Order

1. **Fix csv-to-json.py** - Core fix that prevents the bug
2. **Fix taxonomy-distribution.py** - Improves report readability
3. **Update SKILL.md** - Documents the required workflow
4. **Update learning-graph-viewer.md** - Adds validation safety net

---

## Testing

After fixes, verify:

1. Run `csv-to-json.py` with taxonomy-names.json → Check all classifierName values are human-readable
2. Run `taxonomy-distribution.py` → Check visual distribution uses names
3. Install graph viewer → Check legend shows readable names
4. Attempt without taxonomy-names.json → Should warn/error

---

## Prevention

Add this validation to csv-to-json.py output:

```python
# After creating groups, validate classifierNames
for gid, ginfo in groups.items():
    if ginfo['classifierName'] == gid:
        print(f"⚠️  WARNING: classifierName for '{gid}' equals taxonomy ID")
        print(f"   Provide taxonomy-names.json with human-readable names")
```

---

## Fixes Implemented

### 1. csv-to-json.py (v0.03)
- ✅ Added `taxonomy_names` parameter to accept taxonomy-names.json
- ✅ Merges user-provided names with defaults (user names take precedence)
- ✅ Warns when any classifierName equals its taxonomy ID
- ✅ Provides template for creating taxonomy-names.json when missing

### 2. taxonomy-distribution.py
- ✅ Visual distribution now uses human-readable names instead of taxonomy IDs
- ✅ Dynamic column width based on longest name (capped at 25 chars)

### 3. SKILL.md
- ✅ Added Step 5b: Create Taxonomy Names JSON
- ✅ Updated Step 9 to include taxonomy-names.json in command
- ✅ Added taxonomy-names.json to files created list

### 4. learning-graph-viewer.md
- ✅ Added Step 1b: Validate classifierName Values
- ✅ Includes Python validation script
- ✅ Documents common fixes for known taxonomy IDs
- ✅ Blocks installation until validation passes

### 5. Statistics Course Files Updated
- ✅ taxonomy-names.json - Updated with full human-readable names
- ✅ learning-graph.json - classifierName values corrected
- ✅ taxonomy-distribution.md - Regenerated with human-readable names in visual distribution

---

*Analysis and fixes by Claude Code - 2026-02-07*
