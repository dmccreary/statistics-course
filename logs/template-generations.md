# Template Generation Log

**Date:** 2026-02-06
**Source:** `/Users/dan/Documents/ws/calculus/`
**Target:** `/Users/dan/Documents/ws/statistics-course/`

## Summary

Template resources were copied from the AP Calculus course to initialize the AP Statistics course infrastructure. No chapter content or MicroSims were copied.

## Files Created

### CSS & JavaScript

| File | Description |
|------|-------------|
| `docs/css/extra.css` | Logo styling, iframe containers, copy button for prompts, Delta mascot admonitions |
| `docs/js/extra.js` | Delta moment detection, copy-to-clipboard functionality for prompt admonitions |
| `docs/js/mathjax.js` | MathJax configuration for LaTeX math rendering |

### Plugins

| File | Description |
|------|-------------|
| `plugins/__init__.py` | Plugin initialization |
| `plugins/social_override.py` | Custom social media meta tag plugin for OpenGraph/Twitter cards |
| `setup.py` | Plugin entry point registration for MkDocs |

### Configuration

| File | Description |
|------|-------------|
| `package.json` | npm configuration with p5.js type definitions for MicroSim development |
| `.gitignore` | Excludes site/, .DS_Store, .cache, node_modules |

### Images

| File | Description |
|------|-------------|
| `docs/img/favicon.ico` | Site favicon |
| `docs/img/logo-192.png` | Header logo (placeholder - replace with statistics-specific logo) |
| `docs/img/license.png` | Creative Commons license badge |
| `docs/img/site.webmanifest` | PWA manifest for progressive web app support |

## Pre-existing Files

The following files were already present in the statistics course:

- `mkdocs.yml` - Already configured with correct references to CSS/JS files
- `docs/course-description.ms` - Course description file

## Build Verification

```
mkdocs build
INFO - Documentation built in 13.55 seconds
```

Build completed successfully with expected warnings about missing content files (chapters, sims, glossary, etc.).

## Next Steps

1. Run `pip install -e .` to enable the social_override plugin
2. Replace `docs/img/logo-192.png` with a statistics-specific logo
3. Create content files referenced in `mkdocs.yml` navigation
4. Update `appendices/timeline-of-calculus.md` reference to `timeline-of-statistics.md`
5. Add Google Analytics property ID when ready

## Features Enabled

- **MathJax** - LaTeX math rendering with `\(...\)` for inline and `\[...\]` for display
- **Delta Mascot** - Quote admonitions with "Delta" in title get special styling
- **Copy Button** - Prompt admonitions have a copy-to-clipboard button
- **Social Cards** - Custom OpenGraph/Twitter images via page frontmatter `image:` field
- **Code Highlighting** - Syntax highlighting with line numbers
- **Admonitions** - Callout boxes for notes, warnings, tips, etc.
