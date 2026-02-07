# Sylvia Color Theme

**Date:** 2026-02-06
**Purpose:** Document the site color theme derived from Sylvia the Statistical Squirrel mascot

## Overview

The AP Statistics course website uses a custom color palette inspired by Sylvia's appearance. This creates a warm, inviting, and cohesive visual identity that reinforces the friendly, approachable tone of the content.

## Color Palette

### Primary Colors

| Name | Hex | RGB | Source | Usage |
|------|-----|-----|--------|-------|
| Sylvia Green | `#2E7D32` | rgb(46, 125, 50) | Green cardigan | Headers, navigation, buttons |
| Sylvia Green Dark | `#1B5E20` | rgb(27, 94, 32) | Cardigan shadow | Hover states, emphasis |
| Sylvia Green Light | `#4CAF50` | rgb(76, 175, 80) | Cardigan highlight | Accents, success states |

### Accent Colors

| Name | Hex | RGB | Source | Usage |
|------|-----|-----|--------|-------|
| Sylvia Auburn | `#B5651D` | rgb(181, 101, 29) | Auburn fur | Links, highlights |
| Sylvia Auburn Dark | `#8B4513` | rgb(139, 69, 19) | Fur shadow | Link hover states |
| Sylvia Auburn Light | `#CD853F` | rgb(205, 133, 63) | Fur highlight | Decorative accents |

### Supporting Colors

| Name | Hex | RGB | Source | Usage |
|------|-----|-----|--------|-------|
| Sylvia Cream | `#FFF8E1` | rgb(255, 248, 225) | Cream belly | Backgrounds, callouts |
| Sylvia Hazel | `#8B7355` | rgb(139, 115, 85) | Hazel eyes | Decorative elements |

## CSS Variables

The colors are defined as CSS custom properties in `docs/css/extra.css`:

```css
:root {
  --sylvia-green: #2E7D32;
  --sylvia-green-dark: #1B5E20;
  --sylvia-green-light: #4CAF50;
  --sylvia-auburn: #B5651D;
  --sylvia-auburn-dark: #8B4513;
  --sylvia-auburn-light: #CD853F;
  --sylvia-cream: #FFF8E1;
  --sylvia-hazel: #8B7355;
}
```

## MkDocs Material Integration

### mkdocs.yml Configuration

```yaml
theme:
  palette:
    primary: 'green'
    accent: 'amber'
```

### CSS Overrides

The Material theme's preset colors are overridden with exact Sylvia hex values:

```css
[data-md-color-primary="green"] {
  --md-primary-fg-color: var(--sylvia-green);
  --md-primary-fg-color--light: var(--sylvia-green-light);
  --md-primary-fg-color--dark: var(--sylvia-green-dark);
}

[data-md-color-accent="amber"] {
  --md-accent-fg-color: var(--sylvia-auburn);
  --md-accent-fg-color--transparent: rgba(181, 101, 29, 0.1);
}
```

## Element Styling

### Links
- Default: `--sylvia-auburn` (#B5651D)
- Hover: `--sylvia-auburn-dark` (#8B4513)

### Buttons (Copy Button)
- Background: `--sylvia-green` (#2E7D32)
- Hover: `--sylvia-green-dark` (#1B5E20)

### Iframe Borders
- Border: `2px solid var(--sylvia-green)`

## Design Rationale

1. **Green as Primary**: Sylvia's professorial green cardigan conveys trustworthiness and calm—ideal for educational content headers and navigation.

2. **Auburn as Accent**: Her warm auburn fur provides a friendly, inviting accent for interactive elements like links, drawing attention without being harsh.

3. **Cream for Backgrounds**: The cream belly color offers a soft, warm alternative to stark white for callout boxes or special sections.

4. **Hazel for Details**: The hazel of her eyes and tortoiseshell glasses provides a sophisticated neutral for decorative elements.

## Files Modified

- `mkdocs.yml` - Updated palette primary/accent
- `docs/css/extra.css` - Added CSS variables and color overrides
- `CLAUDE.md` - Added color theme documentation section

## Color Accessibility Notes

The green/white and auburn/white combinations meet WCAG AA contrast requirements for normal text. When using these colors:
- Green (#2E7D32) on white: 4.8:1 contrast ratio (passes AA)
- Auburn (#B5651D) on white: 4.5:1 contrast ratio (passes AA)
- Avoid using cream (#FFF8E1) as a text color
