# Tracker Update — Lineup, Speakers & Vendors — Design

**Date:** 2026-07-17
**Source of truth:** `2026 Peak to Peak People's Festival Master Tracker (1).xlsx` (37 confirmed) + owner's message (Chorale opener, Shad Murab & Tiffany Weber as speakers, speaker order still TBD).
**Scope:** Content-only edits to `index.html` (Lineup, Speakers, Workshops, Marketplace sections). No CSS/JS/structure changes.

---

## 1. Music (Lineup group 1) — reorder + add Chorale

New order (Chorale opens the festival):

| # | Name | Meta |
|---|------|------|
| 1 | Peak to Peak Chorale | Opens the festival · National anthem |
| 2 | Good for Nothin' Thunder Mountain Boys | Live set |
| 3 | Dakota Gray & Gracie G. | Live set |
| 4 | StrangeByrds | Live set |
| 5 | Windy Pines | Live set |

## 2. Speakers — remove 1, add 2, affiliations as meta

- **Remove:** James Coleman (backed out, not attending).
- Final list (no fixed order — schedule TBD):

| Name | Meta (affiliation) |
|------|--------------------|
| Congressman Joe Neguse | U.S. Representative |
| Chairman Shad Murab | Colorado Democratic Party |
| Tiffany Weber | Solidarity Warriors |

- Update the Speakers lede to note the speaking order/schedule is still being finalized.

## 3. Food/Drink — rename

- "Rotary Club" → **"Peak to Peak Rotary"**. Other five unchanged (MC2 Ice Cream Co., Pancho's Birrias Y Mas, Smokin' Wheels BBQ, Augustina's Winery, Very Nice).

## 4. Workshops & activations — fill placeholder

- Replace the "Activation TBA" item with **"Photo Booth"** (meta: "All day").

## 5. Marketplace / Vendors

- **Remove:** Remy Joy Art (declined).
- **Add:**

| Name | Category | Description |
|------|----------|-------------|
| TOTEMS & TAROT | Wellness | Tarot readings and mystical curiosities. |
| GCCC Pottery Studio | Artisan | Handmade ceramics from the Gilpin County Community Center pottery studio. |
| Mountain Mama Mirth | Vendor | *(generic — needs blurb)* Mountain maker joining the marketplace. |
| Bellwether | Vendor | *(generic — needs blurb)* Mountain maker joining the marketplace. |

- Keep Solidarity Warriors card (Tiffany Weber also appears as a speaker).

## 6. Community Orgs — add 7 (Gun Range omitted)

- **Keep existing:** Sunflower Seeds Ukraine, Solidarity Warriors, Gilpin County Democrats, Kobzar Ukrainian Heritage School, FGCCC, Triad Bright Futures, Teens Inc.
- **Add:**

| Name | Description |
|------|-------------|
| Canyon Cares | Mountain mutual-aid and neighbor-support organization. |
| Gilpin County Food Pantry | Local food pantry serving Gilpin County families. |
| Giffords Gun Owners for Safety | Gun owners advocating for responsible gun-safety policy. |
| No Animal Left Behind Search & Rescue | Volunteer animal search-and-rescue organization. |
| RMRR | *(generic — needs blurb)* Community organization joining the festival. |
| Initiative #85 | *(generic — needs blurb)* Colorado ballot-initiative campaign. |
| Healthcare Initiative | *(generic — needs blurb)* Healthcare ballot-initiative campaign. |

- **Omit:** Gilpin County Gun Range (attendance unconfirmed).
- Voter Registration & Grassfed Guardians remain Workshop items — no duplicate org cards.

## Open items (flagged for owner, not blocking)

Blurbs still needed for: **Mountain Mama Mirth, Bellwether, RMRR, Initiative #85, Healthcare Initiative** (currently generic placeholders).

## Verification

- Reload local server; confirm Lineup order, Speakers list, Workshops, and Marketplace render with no console errors.
- Confirm counts: Music 5, Speakers 3, Food/Drink 6, plus expanded community/vendor grid.
- Commit and push; hard-refresh live site to confirm deploy.
