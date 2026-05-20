# Vendor Content + Nav Header Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the visual gap at the top of the page caused by the standalone ribbon element, and populate three confirmed vendor cards in the marketplace section.

**Architecture:** Pure static HTML/CSS — no build step, no framework. All changes are direct edits to `index.html` and `assets/css/styles.css`. The gradient border-top technique uses CSS `background-clip` to paint the brand gradient inside the border area of the sticky nav, replacing the separate `.ribbon` div that previously sat above it.

**Tech Stack:** HTML5, CSS custom properties (already defined in `assets/css/tokens.css`)

---

### Task 1: Update `.nav` CSS to use gradient border-top

**Files:**
- Modify: `assets/css/styles.css` (`.nav` rule, ~lines 366–374)

- [ ] **Step 1: Replace the `.nav` background declaration**

Find the current `.nav` rule:
```css
.nav {
  position: sticky;
  top: 0;
  z-index: var(--z-nav);
  background: var(--paper);
  border-bottom: var(--border-thin);
  backdrop-filter: saturate(180%) blur(8px);
}
```

Replace with:
```css
.nav {
  position: sticky;
  top: 0;
  z-index: var(--z-nav);
  background:
    linear-gradient(var(--paper), var(--paper)) padding-box,
    var(--gradient-brand) border-box;
  border-top: 10px solid transparent;
  border-bottom: var(--border-thin);
  backdrop-filter: saturate(180%) blur(8px);
}
```

- [ ] **Step 2: Verify in browser**

Load `http://localhost:8000`. At the top of the page you should see:
- A 10px rainbow gradient stripe as the top edge of the nav (not a separate element above it)
- Nav background is still off-white in the content area
- When you scroll, the gradient stripe sticks with the nav

---

### Task 2: Remove standalone `.ribbon` div from `index.html`

**Files:**
- Modify: `index.html` (~line 29)

- [ ] **Step 1: Delete the ribbon div**

Find and remove this element (it sits between `<a class="skip-link">` and `<nav class="nav">`):
```html
<!-- Brand ribbon — recurring gradient stripe. Persists when hero
     becomes a poster image; reuse between sections as a divider. -->
<div class="ribbon" role="presentation" aria-hidden="true"></div>
```

Leave the `.ribbon` CSS class definition in `styles.css` untouched — it is still available for use as section dividers.

- [ ] **Step 2: Verify in browser**

Reload `http://localhost:8000`. The page should open with the nav flush at the top — no separate stripe element above it, no off-white gap between a gradient stripe and the hero.

---

### Task 3: Add `vendor-card__link` CSS class

**Files:**
- Modify: `assets/css/styles.css` (after `.vendor-card__desc` rule, ~line 677)

- [ ] **Step 1: Add the link style beneath `.vendor-card__desc`**

```css
.vendor-card__link {
  font-family: var(--font-body);
  font-size: var(--fs-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  align-self: flex-start;
  margin-top: var(--space-3);
}
```

---

### Task 4: Replace first three vendor placeholder cards

**Files:**
- Modify: `index.html` (`#vendors .vendors__grid`, ~lines 193–224)

- [ ] **Step 1: Replace the first three `<article>` elements**

The current vendors grid opens with six placeholder articles. Replace the **first three** with the following real cards (leave the last three placeholders untouched):

```html
<!-- Confirmed vendors -->
<article class="vendor-card">
  <span class="vendor-card__category">Activist</span>
  <h3 class="vendor-card__name">Sunflower Seeds Ukraine</h3>
  <p class="vendor-card__desc">Ukrainian community organization bringing solidarity, culture, and awareness to the mountain community.</p>
</article>

<article class="vendor-card">
  <span class="vendor-card__category">Food</span>
  <h3 class="vendor-card__name">MC2 Ice Cream Co.</h3>
  <p class="vendor-card__desc">Colorado-born gelato-style ice cream with a Guinness World Record 985-flavor range — rolling in via their mobile truck.</p>
  <a class="vendor-card__link" href="https://www.mc2icecreamco.com/" target="_blank" rel="noopener">Visit website &rarr;</a>
</article>

<article class="vendor-card">
  <span class="vendor-card__category">Food</span>
  <h3 class="vendor-card__name">Pancho's Birrias Y Mas</h3>
  <p class="vendor-card__desc">Authentic Mexican birria and more — slow-braised, boldly spiced street food.</p>
</article>
```

Note: real cards have **no** `vendor-card--placeholder` class, so names render in full ink color rather than muted gray.

- [ ] **Step 2: Verify in browser**

Reload `http://localhost:8000` and scroll to the Vendors section. You should see:
- Three real vendor cards (full-color names, no muted gray) followed by three TBA placeholders
- MC2 card has a clickable "Visit website →" link
- Category pills show "Activist", "Food", "Food" for the three confirmed cards

---

### Task 5: Commit

- [ ] **Step 1: Commit all changes**

```bash
cd "/Users/ezrashelton/Projects/peak2peak site"
git add assets/css/styles.css index.html
git commit -m "Add confirmed vendors and fix nav gradient border

Replace standalone ribbon element with a CSS gradient border-top on the
sticky nav, eliminating the pale gap at the top of the page. Add three
confirmed vendor cards: Sunflower Seeds Ukraine, MC2 Ice Cream Co., and
Pancho's Birrias Y Mas.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```
