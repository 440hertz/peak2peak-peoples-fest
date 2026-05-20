# Vendor Content + Nav Header Fix
_Spec date: 2026-05-20_

## Scope
Two independent changes to `index.html` and `assets/css/styles.css`.

---

## 1. Nav gradient border-top (header fix)

**Problem:** At page-top the visual stack is gradient ribbon → off-white nav → gradient hero, creating an unwanted pale band between two colorful areas.

**Fix:** Remove the standalone `.ribbon` element from the top of `index.html`. Give `.nav` a 10 px gradient `border-top` using CSS `background-clip` so the brand gradient lives on the nav itself and persists when the nav is sticky.

### CSS change — `.nav` in `styles.css`
```css
.nav {
  /* replace: background: var(--paper); */
  background:
    linear-gradient(var(--paper), var(--paper)) padding-box,
    var(--gradient-brand) border-box;
  border-top: 10px solid transparent;
  border-bottom: var(--border-thin);
  /* rest unchanged */
}
```

### HTML change — `index.html`
Remove:
```html
<div class="ribbon" role="presentation" aria-hidden="true"></div>
```

The `.ribbon` CSS class definition stays in `styles.css` — it is still used (or planned) as a section divider elsewhere.

---

## 2. Confirmed vendor cards

Replace the first three placeholder `<article>` elements in `#vendors .vendors__grid` with real vendor cards. Keep the remaining three as TBA placeholders.

Card order (confirmed first, TBA last):

| # | Name | Category | Description |
|---|------|----------|-------------|
| 1 | Sunflower Seeds Ukraine | Activist | Ukrainian community organization bringing solidarity, culture, and awareness to the mountain community. |
| 2 | MC2 Ice Cream Co. | Food | Colorado-born gelato-style ice cream with a Guinness World Record 985-flavor range — rolling in via their mobile truck. |
| 3 | Pancho's Birrias Y Mas | Food | Authentic Mexican birria and more — slow-braised, boldly spiced street food. |
| 4–6 | Vendor TBA | (original placeholders) | Confirmed soon — vendor list updated as applications come in. |

Real vendor cards get no `vendor-card--placeholder` class (so the name renders in full ink color, not muted gray).

MC2 gets a "Visit website →" text link (`<a>`) at the bottom of its card pointing to `https://www.mc2icecreamco.com/`. No other vendor cards receive links (no URLs confirmed for the other two).

---

## Out of scope
- Grassfed Guardians already listed under Workshops & Activations; no vendor card needed.
- No style changes to the vendor card component itself.
- No changes to any other section.
