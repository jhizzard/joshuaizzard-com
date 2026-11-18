# DESIGN.md: joshuaizzard.com (Josh's own site)

Prepared Wed Nov 18 2026 by JHIZ-Services-2026-11-18 (Claude Opus 5.5) for the design sitting with Josh, Thu Nov 19.
Every agent reads this file before any UI code. Josh judges. The agent never calls this work beautiful.
Root files and design/ are not served by the Next.js build.

## What the page must do
To be settled with Josh in the sitting: who reads it, and the one thing they do next. The site must be unique and obviously human, never a stock agent page (his rule of Nov 13).

## Direction
PROPOSAL, Josh decides in the sitting: "workshop wall". The things he has made and run, pinned up as real objects, in his own words.

## The object
PROPOSAL, Josh decides in the sitting: real photographs of real work he owns: a live TermDeck screen running his agents, and a real printed programme of a Nashville Chopin event he organized. Never a photograph or line that implies he performs (he has not played for more than 20 years). Question for the sitting: the live site title today reads "Concert pianist. Hedge fund manager. CEO. Developer."; Josh decides whether that line stays.

## References
Six candidates saved in design/references/ (each at 1300 and 390). Josh picks three.
1. craig-mod : copy the one clear ask of a one-person business, with one line on what it is.
2. inn-little-washington : copy "the owner is the photograph", with one outside mark of trust beside him.
3. thos-moser-story : copy the archival photograph and the plain founding facts: who, when, why.
4. practical-typography : copy a page of well-set words that carries itself, ordered by weight and space.
5. klim : copy one photograph of a real object paired with one typeface.
6. pentagram : copy a sentence the visitor completes, a quiet thing to touch.

## Limits
- One font family, carried by the page: chosen in the sitting; files shipped with the page. Monospace only for numbers.
- Six sizes at 1300 and at 390.
- Four text colours, each with a job.
- One accent, only for the single most important thing on a screen.
- Body lines under 72 characters.

## Banned
The full list in the jonathan-design-spec skill applies. Special to this site: no theme switch; no sparkle icon (his rule of Nov 16).

## Removal
One line per removal, logged in the sitting.

## Layout sketch
Written in the sitting, desktop and phone, before any code.

## The guts
A redesign never touches these files. The list is also in design/guts.txt.
- src/app/api/contact/route.ts : the contact form's sending route
- src/components/ContactForm.tsx : the contact form and its checks
- src/app/robots.ts, src/app/sitemap.ts : search files
- src/app/layout.tsx : the Person data and site metadata (words and facts unchanged)
- src/content/blog/ : the written posts

## Sitting log
<time> ET, Josh: "<one-line reaction>" -> <what changed>

## Numbers
The measure-page output for 1300 and 390 goes here after the sitting.
