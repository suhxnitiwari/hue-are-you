# Hue Are You?

*Find your color season and the colors that suit you best.*

**Live:** [Take the quiz →](https://suhxnitiwari.github.io/hue-are-you/)

## What it is

Answer 11 quick questions about your undertone, hair, eyes and contrast, and you'll land in one of the 12 color seasons with a palette you can actually shop with.

- **12 seasons,** each with a 20-color palette, colors to skip, and suggested neutrals, metals and lip shades. Tap any swatch to copy its hex code.
- **Close-call detection:** if you sit between two seasons, it tells you and suggests trying both.
- **Drape test:** add a selfie and click through colors to see each one next to your face, the way a color analyst holds fabric up to you.
- **Download your palette** as a 1080×1350 PNG sized for sharing.
- **Share links:** `#soft-autumn` opens that season's page directly.

## How it's built

**Scoring as a point in 3D space.** Every answer adds points on three axes: cool ↔ warm, deep ↔ light, and soft ↔ bright. Each axis total is scaled into a −1 to 1 range (dividing by half the maximum possible score, since real answers rarely all point the same way). Each of the 12 seasons has a target point in that same space, and the quiz ranks every season by weighted Euclidean distance from you. Temperature carries 1.2× weight because it's the main split between seasons. If the runner-up is within 0.25 of the winner, you get the close-call note.

**Rendered in the browser.** The downloadable palette is drawn on a Canvas with rounded swatches and hex labels. Swatch label color is picked automatically from each color's perceived brightness (weighted RGB), so the text stays readable on light and dark swatches alike.

**Private by default.** There's no backend and no tracking. The drape-test selfie is shown through a local object URL, is never uploaded, and is gone when you close the tab.

## Design choices

- **Built to include every skin tone.** The traditional season system was built mostly around lighter skin. Here skin depth gets only a small weight, and the quiz says so on that question. Undertone, hair, eyes and contrast drive the result, so people of any skin depth can land in any season.
- Questions use everyday tests instead of jargon: which jewelry flatters you, what the sun does to your skin, how much contrast you'd see in a black-and-white photo.
- Fraunces and Inter type, a warm off-white background, and light and dark mode.

## Tech stack

HTML, CSS, vanilla JavaScript, Canvas API, GitHub Pages. No framework and no build step.

## Run it locally

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
```

## Project structure

```
index.html   page layout
style.css    styles (light and dark mode)
data.js      quiz questions and season palettes, including each season's target point
app.js       quiz flow, scoring, results, drape test, PNG export
```

## Roadmap

- [ ] Automatic undertone estimate from the selfie (sampling skin pixels in LAB color space)
- [ ] Compare two seasons side by side in the drape test
- [ ] Outfit and makeup inspiration for each season
- [ ] Test the quiz with people of many skin tones and tune the weights

Built by [Suhani Tiwari](https://suhanitiwari.com).
