# Hue Are You? 🎨

Find your color season and the colors that suit you best.

**[Take the quiz →](https://suhxnitiwari.github.io/hue-are-you/)**

Answer 11 quick questions about your undertone, hair, eyes and contrast. You'll get one of the 12 color seasons, plus a palette you can use when shopping.

## Features

- **11-question quiz** that scores you on three axes: cool ↔ warm, deep ↔ light, soft ↔ bright
- **12 seasons**, each with a 20-color palette, colors to skip, and suggested neutrals, metals and lip shades
- **Close-call detection**: if you fall between two seasons, it tells you
- **Drape test**: add a selfie and click through colors to see how each one looks next to your face
- **Download your palette** as a shareable PNG
- **Share links**: `#soft-autumn` opens that season's page directly

## Privacy

Everything runs in your browser. There's no backend, no tracking, and your selfie is **never uploaded**. It's displayed with a local object URL and goes away when you close the tab.

## Inclusivity

The traditional season system was built mostly around lighter skin tones. This quiz gives skin depth only a small weight. Undertone, hair, eyes and contrast drive the result, so people with any skin depth can land in any season.

## How the scoring works

Every answer adds points on the three axes. The totals are scaled to a −1 to 1 range, and each season has a target point in that 3D space (see `SEASONS` in `data.js`). Your result is the season closest to you. Temperature gets a little extra weight because it's the main split between seasons.

## Run it

It's plain HTML, CSS and JS with no build step. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
```

## Deploy

Push to GitHub, then go to **Settings → Pages → Deploy from branch → `main` / root**.

## Roadmap

- [ ] Automatic undertone estimate from the selfie (sampling skin pixels in LAB color space)
- [ ] Compare two seasons side by side in the drape test
- [ ] Outfit and makeup inspiration for each season
- [ ] Test the quiz with people of many skin tones and tune the weights

## Project structure

```
index.html   page layout
style.css    styles (supports light and dark mode)
data.js      quiz questions and season palettes
app.js       quiz flow, scoring, results, drape test, PNG export
```
