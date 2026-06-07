# encoreshao.github.io

Personal portfolio site for [Encore Shao](https://github.com/encoreshao) — Engineer Manager & AI Researcher based in Shanghai.

Live at **[encoreshao.github.io](https://encoreshao.github.io)**

## Overview

A terminal-style single-page portfolio built with vanilla HTML, CSS, and JavaScript. No frameworks or build tools — just static files deployed via GitHub Pages.

The UI mimics a code editor: a file tree on the left lets visitors navigate between sections (about, open source projects, products, skills, notes), with each selection rendering a "README pane" on the right.

## Structure

```
.
├── index.html          # Single-page app markup
├── css/
│   └── style.css       # All styles (design tokens, layout, responsive, easter eggs)
├── js/
│   └── script.js       # Typing animation, tree navigation, easter eggs
└── img/
    ├── encore.jpeg     # Profile photo
    ├── favicon.png
    └── cover.jpg
```

## Features

- Typing animation on page load
- File tree navigation with keyboard support (`j`/`k` to move, `Enter` to open)
- GitHub public API integration — live repo and follower counts
- VS Code-style status bar with branch switcher and git log drawer
- **Easter eggs:**
  - Konami code (`↑ ↑ ↓ ↓ ← → ← → B A`) — secret overlay
  - Press `H` or double-click the status bar — Phosphor CRT / hacker mode with matrix rain
  - Double-click the `>` prompt — interactive terminal console (`help`, `matrix`, `coffee`, `github`, `weather`, `bugs`, `sudo`)
  - Coffee meter in the status bar — click to caffeinate, overflow triggers crash animation
  - Scramble-text hover effects on select elements
  - Footer avatar soundboard (click for synth sounds)

## Tech

| Layer | Choice |
|-------|--------|
| Markup | Semantic HTML5 |
| Styles | Custom CSS with design tokens, CSS Grid, CSS animations |
| Scripts | Vanilla ES5-compatible JS (IIFE) |
| Fonts | Fira Code (mono) + Outfit (display) via Google Fonts |
| Animations | Lottie via `@lottiefiles/dotlottie-wc` web component |
| Hosting | GitHub Pages |

## Local Development

No build step needed — open `index.html` directly in a browser, or serve it with any static file server:

```bash
npx serve .
# or
python3 -m http.server
```

## About

- GitHub: [@encoreshao](https://github.com/encoreshao)
- Portfolio: [icmoc.com](https://icmoc.com)
- LinkedIn: [linkedin.com/in/encoreshao](https://www.linkedin.com/in/encoreshao/)
- Email: encore.shao@gmail.com
