# Signal Match — GTEx Tissue Expression Game

A small interactive game for public engagement: players are dealt a real marker gene each round, see its expression pattern on a live UMAP, and drag it onto an anatomically-arranged tissue diagram to score it against a GTEx-style dataset.

Each round deals a real HGNC gene symbol/name that is a genuine marker for one of 10 tissues (e.g. `ALB`/Albumin for Liver, `MYH6` for Heart). The underlying sample coordinates and expression values are **synthetic**, seeded so the same "dataset" is reproducible — see [Data](#data) below.

## Run it

```bash
npm install
npm run dev      # local dev server with hot reload
npm run build     # production build -> dist/ (self-contained, works offline)
npm run preview   # serve the production build locally
```

## How it works

- **Gene tray** (left): the current round's gene, drag it onto the tissue map (mouse or touch — implemented with pointer events, not native HTML5 drag-and-drop, so it works on touchscreens). Tab + Enter also works for keyboard-only play.
- **Anatomy stage** (center): a hand-drawn body figure with 10 organ hotspots. A correct drop pulses the organ and reveals a density of "signal dots" scaled to that gene's real mean expression there; a miss shows a dashed outline on the organ where the gene actually belongs.
- **UMAP readout** (right): a live Plotly scatter plot recoloring by the current gene's expression across all samples, so the visual result of a drop is backed by an actual (if synthetic) expression pattern, not just a canned animation.
- Ten rounds = ten tissues, one random marker gene per tissue, full coverage each playthrough. Ends on an accuracy summary with "play again."

## Data

`src/data/generateData.js` generates a deterministic synthetic dataset (seeded PRNG): 10 tissues × 5 marker genes each, 80 samples/tissue with UMAP-like clustered coordinates, expression values elevated for a gene's true tissue and low elsewhere. See `draft/GTEX_DEMO_STRATEGY.md` (repo root) for the original plan, including how to swap in real GTEx CSVs instead.

## Stack

React 19 + Vite, Plotly.js for the UMAP plots, inline SVG for the anatomy diagram, no CSS framework (hand-written design tokens in `src/styles/tokens.css`). No backend — the production build is a static, offline-capable bundle.

## Accessibility / design notes

- Colorblind-safe palette throughout (Okabe-Ito signal colors, Paul Tol qualitative tissue palette, viridis for the continuous expression scale).
- Respects `prefers-reduced-motion`.
- Localized to English, Italian, and French (`src/i18n/`) — gene symbols/names are kept in English as standard scientific nomenclature.
