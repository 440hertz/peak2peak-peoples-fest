# Peak 2 Peak Peoples' Festival

A free one-day festival of music, art, and activism — September 19, 2026 at the Gilpin County Fairgrounds, Colorado.

This repository hosts the festival's website, deployed to GitHub Pages at <https://peak2peakpeoplesfest.com>.

## Stack

- Plain HTML, CSS, and JavaScript — no build step.
- Hosted on GitHub Pages with a custom domain.
- Contact form backed by [Formspree](https://formspree.io) (set up in a later phase).

## Project layout

```
.
├── index.html              Single-page site
├── 404.html                Custom not-found page
├── CNAME                   Custom-domain config for GitHub Pages
├── assets/
│   ├── css/
│   │   ├── tokens.css      Design tokens (colors, type, spacing)
│   │   └── styles.css      Base styles + section styles
│   ├── js/
│   │   └── main.js         (placeholder — small interactivity only)
│   └── images/             Photos, logos, og-image, favicon
└── README.md
```

## Local development

It's just static files — open `index.html` in a browser, or run any tiny static server:

```bash
# Python
python3 -m http.server 8000

# Node (if installed)
npx serve .
```

Then visit <http://localhost:8000>.

## Editing content

Most copy lives directly in `index.html`. Visual identity (colors, fonts, spacing) is centralized in `assets/css/tokens.css` — change values there to re-skin the entire site.

## Deployment

Pushing to `main` rebuilds the GitHub Pages site automatically. The custom domain is configured via the `CNAME` file plus DNS records (see `docs/dns.md` once added in the deploy phase).

## License

Content © Peak 2 Peak Peoples' Festival. Code released under the MIT license unless otherwise noted.
