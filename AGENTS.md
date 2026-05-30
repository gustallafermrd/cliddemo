# AGENTS.md

## Project overview
Static HTML/CSS/JS website (Spanish). No build step, frameworks, or package manager. Open `.html` files directly in a browser.

## Architecture
- Every page includes `styles.css` and `script.js`.
- Navigation menu is injected dynamically by `script.js` into `<ul id="nav-menu">` on each page. Do not edit nav links in HTML files — add them in the `navMenuTemplate` template literal in `script.js:4-15`.
- Some nav items are commented out in `script.js:16-18` (`objetivos.html`, `fundadoras.html`, `retos.html`). Uncomment and adjust as needed when those pages are created.

## External dependencies
- Google Fonts: Alexandria (weight 300,400,600,700) and Roboto (weight 700) loaded from `fonts.googleapis.com`.
- Footer and mascot images are hosted externally at `static.codia.ai`.
- Local images live in `/img/` (including `/img/slider/`).

## Editing conventions
- Site is entirely Spanish-language content.
- When adding a new page, copy an existing `.html` file as a template and preserve the shared `<head>`, `<script src="script.js">`, and `<ul id="nav-menu">` pattern.
- CSS is a single 1345-line file (`styles.css`) — avoid adding inline styles or page-specific stylesheets unless truly needed.
