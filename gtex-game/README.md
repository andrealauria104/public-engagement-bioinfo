# Signal Match - GTEx Tissue Expression Game

A small interactive game for public engagement: players are dealt a real marker gene each round, see its expression pattern on a live UMAP, and drag it onto an anatomically-arranged tissue diagram to score it against a real GTEx v8 dataset.

Each round deals a real HGNC gene symbol/name that is a genuine, validated marker for one of 10 tissues (e.g. `ALB`/Albumin for Liver, `MYH6` for Heart). The sample coordinates (UMAP) and expression values come from real GTEx v8 RNA-seq data - see [Data](#data) below.

## Run it

```bash
npm install
npm run dev      # local dev server with hot reload
npm run build     # production build -> dist/ (self-contained, works offline)
npm run preview   # serve the production build locally
```

## How it works

- **Gene tray** (left): the current round's gene, drag it onto the tissue map (mouse or touch - implemented with pointer events, not native HTML5 drag-and-drop, so it works on touchscreens). Tab + Enter also works for keyboard-only play.
- **Anatomy stage** (center): a hand-drawn body figure with 10 organ hotspots. A correct drop pulses the organ and reveals a density of "signal dots" scaled to that gene's real mean expression there; a miss shows a dashed outline on the organ where the gene actually belongs. A short synthesized chime/buzz plays on drop (Web Audio, no audio assets); the speaker icon in the header mutes it, remembered across reloads.
- **UMAP readout** (right): a live Plotly scatter plot recoloring by the current gene's expression across all real samples, so the visual result of a drop is backed by an actual expression pattern, not a canned animation.
- Ten rounds = ten tissues, one random marker gene per tissue, full coverage each playthrough. Ends on an accuracy summary with "play again."

## Data

`src/data/gtex_real.json` is a precomputed slice of real GTEx v8 RNA-seq data (~90 samples/tissue across the 10 target tissues, marker gene expression + a joint UMAP embedding), produced by [`gtex-data/src/exportGameData.R`](../gtex-data/src/exportGameData.R). That script:

- Validates every curated marker gene against real tissue-specificity (each must be the top-expressing tissue among the 10 targets) before exporting - one gene (`MYL2` for Heart) failed this check and was swapped for `TNNI3`.
- Subsamples ~90 samples/tissue and runs `uwot::umap` jointly across all of them for the 2D layout.
- Reads from `gtex-data/results/gtex.summarized.experiment.rds` (not checked in - see `gtex-data/` for the upstream preprocessing scripts and raw GTEx files, which are gitignored due to size).

`src/data/generateData.js` still contains the original deterministic synthetic generator (seeded PRNG, same shape) as an offline/dev fallback - `src/data/loadRealData.js` is what the app actually uses, merging the real JSON with the shared tissue color/organ metadata in `generateData.js`. See `draft/GTEX_DEMO_STRATEGY.md` (repo root) for the original data-format plan this followed.

## Stack

React 19 + Vite, Plotly.js for the UMAP plots, inline SVG for the anatomy diagram, no CSS framework (hand-written design tokens in `src/styles/tokens.css`). No backend - the production build is a static, offline-capable bundle.

## Accessibility / design notes

- Colorblind-safe palette throughout (Okabe-Ito signal colors, Paul Tol qualitative tissue palette, viridis for the continuous expression scale).
- Respects `prefers-reduced-motion`.
- Localized to English, Italian, and French (`src/i18n/`) - gene symbols/names are kept in English as standard scientific nomenclature.
