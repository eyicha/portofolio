# Enchanted Portfolio Chronicles

Build my complete portfolio in ONE pass. Do not ask clarifying questions; where data is missing, use placeholders marked "TODO". Stack: React + TypeScript + Tailwind + React Router. Mobile-first, fully responsive. Single long-scroll home page, plus /project/:slug detail pages.



OWNER: Erisa Salsabila, Data Analyst & Backend Engineer, Software Engineering student at IPB University.



=== CONCEPT: "Storybook Fairy Tale" ===

The whole site is a fairy tale book. Visitor first sees a closed storybook, opens it like an invitation, and enters a fairy world where I am the fairy. Dreamy, soft, romantic, elegant. Content stays professional; the skin is enchanted.



I attached reference images. Copy their STYLE only (soft glossy pink, layered paper, ornate frames, vertical invitation-style layouts, script lettering, cherub and floral feeling, pastel clouds). Never use the people or photos in them.



=== PALETTE: PINK AND BABY BLUE, GREEN MINIMAL ===

Blush pink #FBD3E4, rose #F28DB8, deep rose #D6558F, soft mauve #B88AA8, baby blue #BFE0F7, periwinkle mist #C9D6F5, cream parchment #FFF4EA, ink plum #4A2C4A (text), white highlights. Sage #A9C9B0 ONLY as tiny leaf accents, under 3 percent of the page. Pink dominates, blue is the secondary. Page background: soft pastel sky gradient (baby blue to blush to cream) with faint clouds, drifting light dust and subtle paper grain.

Fonts (Google Fonts): Cormorant Garamond (headings), Pinyon Script (script accents), DM Sans (body).



=== OPENING SEQUENCE (first visit only, skippable) ===

1. Closed storybook cover centered on a pastel cloud sky, title in script: "Erisa's Fairy Tale", button "Open the book". NEVER auto start.

2. On click, the cover opens in 3D (rotateY hinge), pages flip once, and a pink-and-blue parchment invitation card with a wax seal and lace edge unfolds out of the book.

3. The invitation opens and zooms into the hero. Total under 5 seconds. "Skip" link always visible. Remember with sessionStorage. Respect prefers-reduced-motion (simple fade instead).



=== FAIRY CURSOR (desktop) ===

Custom cursor is a tiny glowing fairy with softly flapping wings (inline SVG). It leaves a trail of sparkle dust (pink, baby blue, white stars) wherever the mouse moves, fading out. Use a lightweight canvas, no heavy libs. On touch devices, tapping spawns a small sparkle burst. Reduced motion: static small sparkle cursor, no trail.



=== SCROLL MAGIC ===

Glittering swans (inline SVG, pearly pink-white gradient with shimmer) glide slowly across cloud dividers between sections and drift with parallax as the user scrolls. 3 to 4 swans total, gentle, never blocking content. Faint floating light dust. Section titles fade in like turning pages.



=== GLOBAL ===

- Sticky nav as a slim parchment ribbon: Story, Stack, Work, Honors, Contact (Contact scrolls to footer).

- Optional music toggle (bottom-right) for /music.mp3, NEVER autoplay.

- Section labels in small serif italic like "Chapter One", not mono caps.

- Shared footer "Contact": form (name, email, message) on a letter-paper card with envelope motif, front-end only. Email TODO, location "Bogor, West Java", links LinkedIn TODO, GitHub TODO, Instagram TODO. "© 2026 Erisa Salsabila".



=== HOME SECTIONS (in this order) ===

1. HERO, "Chapter One": long vertical storybook-page layout like my references, not a plain box. My photo from /images/erisa.png as a die-cut cutout, with soft translucent fairy wings drawn around/behind it as a decorative layer (keep it respectful and elegant, do not alter my face or clothing). Beside it a biodata card on layered parchment: Name: Erisa Salsabila / Role: Data Analyst & Backend Engineer / Campus: IPB University, Software Engineering / Base: TODO. Large script title "Hi, I'm Erisa", subtitle "I turn data into stories and build the systems behind them". Buttons "View Work" (scroll) and "Download CV" (TODO link).

2. ABOUT ME, "Chapter Two": short bio (TODO placeholder text), career direction (data analyst and backend engineer), plus one compact line about other experience with a "See LinkedIn" link (TODO) and one line mentioning my F&B crew internship as teamwork and working under pressure.

3. STACK AND TOOLS, "Chapter Three": two enchanted shelves, "Data Analyst" and "Backend Engineer", each with rounded icon tiles and labels (languages, frameworks, databases, tools). All items TODO, easy to edit in /src/data/stack.ts.

4. HOW I WORK, "Chapter Four": 4 to 5 steps as illustrated storybook page cards (e.g. Understand, Explore, Build, Test, Deliver). Short TODO copy.

5. PORTFOLIO, "Chapter Five": project cards as framed pastel storybook plates with a browser-style frame cover, title, year, role, stack chips, status. Click goes to /project/:slug. Data in /src/data/projects.ts with fields: slug, title, year, role, status, summary, problem, solution, features[], stack[], liveUrl, githubUrl, cover, screenshots[]. Create 4 placeholder projects marked TODO. Missing images show a pastel gradient with the filename. Detail page: overview, problem, solution, features, screenshots with lightbox, next project. Hide empty sections.

6. HONORS AND AWARDS, "Chapter Six": achievements as ribbon-and-medal style cards (title, event, year, placement). Data in /src/data/awards.ts, all TODO.

7. CERTIFICATIONS, "Chapter Seven": certificates as collectible invitation-card style cards with lightbox, images in /public/images/certs/n.png, data in /src/data/certs.ts, all TODO.

8. Closing page "The End? Not yet." leading into the footer contact.



=== STRICT ANTI-AI-SLOP RULES ===

- NO em dashes or en dashes anywhere in copy.

- NO emojis anywhere.

- NO dotted or dashed borders, no dotted dividers.

- NO heart icons or heart decorations.

- NO generic gradient blobs, glassmorphism card grids, "Hello World" or lorem ipsum, or filler phrases like "passionate", "cutting-edge", "seamless".

- Copy must be short, specific and human. Use TODO instead of inventing facts, metrics or tech.

- Decoration comes from paper layers, ornate frames, wax seals, ribbons, florals, clouds, swans, stars and sparkles only.



=== QUALITY ===

Clean component structure, all content in /src/data files, alt text on every image, semantic HTML, lazy-loaded images, good Lighthouse performance, no heavy animation libraries, respect prefers-reduced-motion.



reference in images that i attached

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://enchanted-portfolio-chronicles.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cde1606a-5983-4600-a502-cbe928ce5e4c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
