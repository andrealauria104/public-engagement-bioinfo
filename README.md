# Public Engagement Bioinfo

Interactive tools for public engagement built around bioinformatics data - making concepts like tissue-specific gene expression tangible for a general audience, not just domain experts.

## Projects

- **[`gtex-game/`](gtex-game/)** - **Signal Match**: an interactive React game where players match genes to the tissue they're expressed in, backed by a live UMAP visualization of real GTEx v8 expression data. See [`gtex-game/README.md`](gtex-game/README.md) for setup.
- **`gtex-data/`** - R preprocessing pipeline that turns raw GTEx v8 RNA-seq data into the small dataset `gtex-game` bundles (`gtex-data/src/exportGameData.R`). Raw/intermediate files (`data/`, `results/`) are gitignored - several GB, not meant for version control.
- **`site/`** - the landing page published at the site root, with a button for each app.

More projects will be added here as sibling folders as this collection grows.

## Live site

https://andrealauria104.github.io/public-engagement-bioinfo/

Published to GitHub Pages on pushes to `main` that touch `gtex-game/`, `site/` or the workflow, by `.github/workflows/deploy-pages.yml`. The landing page (`site/`) is at the root and each app is served under its folder name, e.g. Signal Match at `/gtex-game/`.

## Quick start

```bash
cd gtex-game
npm install
npm run dev
```
