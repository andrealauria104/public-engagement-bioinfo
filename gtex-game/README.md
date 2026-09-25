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

- **Intro**: three short click-through slides (genes vs. tissues, what GTEx is, how to play) with Next / Back / Skip, ending on a Start button. The language switch is already available here; "Play again" skips the intro.
- **Gene tray** (left): the current round's gene, drag it onto the tissue map (mouse or touch - implemented with pointer events, not native HTML5 drag-and-drop, so it works on touchscreens). Tab + Enter also works for keyboard-only play.
- **Anatomy stage** (center): a cartoon skeleton with 10 illustrated organ hotspots (placement in `src/components/anatomyLayout.js`). A correct drop pulses the organ and reveals a density of "signal dots" scaled to that gene's real mean expression there; a miss shows a dashed halo around the organ where the gene actually belongs. A short synthesized chime/buzz plays on drop (Web Audio, no audio assets); the speaker icon in the header mutes it, remembered across reloads.
- **UMAP readout** (right): a live Plotly scatter plot recoloring by the current gene's expression across all real samples, so the visual result of a drop is backed by an actual expression pattern, not a canned animation.
- Ten rounds = ten tissues, one random marker gene per tissue, full coverage each playthrough. Ends on an accuracy summary with "play again."

## Data

`src/data/gtex_real.json` is a precomputed slice of real GTEx v8 RNA-seq data (~90 samples/tissue across the 10 target tissues, marker gene expression + a joint UMAP embedding), produced by [`gtex-data/src/exportGameData.R`](../gtex-data/src/exportGameData.R). That script:

- Validates every curated marker gene against real tissue-specificity (each must be the top-expressing tissue among the 10 targets) before exporting - one gene (`MYL2` for Heart) failed this check and was swapped for `TNNI3`.
- Subsamples ~90 samples/tissue and runs `uwot::umap` jointly across all of them for the 2D layout.
- Reads from `gtex-data/results/gtex.summarized.experiment.rds` (not checked in - see `gtex-data/` for the upstream preprocessing scripts and raw GTEx files, which are gitignored due to size).

Please cite GTEx when reusing this data: The GTEx Consortium, "The GTEx Consortium atlas of genetic regulatory effects across human tissues", *Science* 369(6509):1318-1330 (2020), [doi:10.1126/science.aaz1776](https://doi.org/10.1126/science.aaz1776). The game credits it on the second intro slide.

> The Genotype-Tissue Expression (GTEx) Project was supported by the Common Fund of the Office of the Director of the National Institutes of Health, and by NCI, NHGRI, NHLBI, NIDA, NIMH, and NINDS. The data used in this game were obtained from the GTEx Portal (v8).

`src/data/generateData.js` still contains the original deterministic synthetic generator (seeded PRNG, same shape) as an offline/dev fallback - `src/data/loadRealData.js` is what the app actually uses, merging the real JSON with the shared tissue color/organ metadata in `generateData.js`.

## Artwork

The full-resolution organ and skeleton illustrations live in `assets-src/body_organs/` (Italian file names, outside `public/` so they are not shipped). The app uses web-sized copies in `src/assets/organs/`, named by tissue (`brain.png`, `kidney.png`, ..., `skeleton.png`): each is trimmed to its visible pixels and scaled to a 480 px longest side (skeleton: 1000 px). The organs, which use flat colours, are also reduced to a 256-colour palette (~5-10 KB each); the skeleton keeps full colour because its gradients band. To regenerate after editing a master (needs Pillow):

```python
from PIL import Image
im = Image.open("assets-src/body_organs/Cuore.png").convert("RGBA")
im = im.crop(im.getchannel("A").getbbox())
im.thumbnail((480, 480), Image.LANCZOS)
im.quantize(256, method=Image.FASTOCTREE, dither=Image.NONE).save("src/assets/organs/heart.png", optimize=True)
```

If an image's aspect ratio changes, update its `w`/`h` in `anatomyLayout.js`.

## Stack

React 19 + Vite, Plotly.js for the UMAP plots, an inline SVG anatomy stage layering PNG illustrations, no CSS framework (hand-written design tokens in `src/styles/tokens.css`). No backend - the production build is a static, offline-capable bundle.

## Accessibility / design notes

- Colorblind-safe palette throughout (Okabe-Ito signal colors, Paul Tol qualitative tissue palette, viridis for the continuous expression scale).
- Respects `prefers-reduced-motion`.
- Localized to English, Italian, and French (`src/i18n/`) - gene symbols/names are kept in English as standard scientific nomenclature.
