# Twin Cities Animal Rescue Website

A four-page website built for coursework in SOPH-0047 (Web Development). The project began with semantic HTML structure, accessible navigation, media integration, and form validation, and has since grown to include a full CSS visual design system and a mobile-first, responsive layout. This repo is used across multiple assignments in the course, so it evolves incrementally rather than being tied to a single deliverable.

## Selected Client

**Twin Cities Animal Rescue** — a community nonprofit focused on increasing awareness and collecting volunteer, foster, and adoption interest.

## Pages

- `index.html` — Mission statement, impact stats, "How You Can Help," and a pet spotlight
- `services.html` — Adoption process, foster program, and volunteer roles
- `about.html` — Organization story, core values, partner acknowledgments, and a director message (audio and video)
- `contact.html` — Service area, office hours, and a volunteer/foster/adoption interest form

## Media

Images, audio, and video are stored in the `images/`, `audio/`, and `videos/` folders and sourced from the client's provided media assets.

## Design System

- **Colors:** deep teal (`#1F5C56`), warm amber (`#E8A33D`), off-white (`#F7F4EF`), and charcoal (`#26302E`) — teal and off-white carry the trustworthy, established feel the client needs; amber calls out links, buttons, and section accents to point visitors toward action.
- **Typography:** two font families — a serif for headings, a sans-serif for body text and form fields — to keep the page approachable while still giving each section a clear hierarchy.
- **Layout:** built mobile-first with Flexbox. The base styles are single-column and stacked; one media query at `700px` switches the nav to a horizontal row and lays out the impact stats, feature section, and volunteer role cards side by side once there's enough screen width.

## Technologies

- HTML5 (semantic elements, ARIA labeling)
- CSS3 (custom properties, Flexbox, responsive media queries)
- Built and tested in GitHub Codespaces

## Author

Christian Talavera

## Course

Sophia Learning — SOPH-0047
