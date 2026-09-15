# Public Engagement Bioinfo

Interactive tools for public engagement built around bioinformatics data — making concepts like tissue-specific gene expression tangible for a general audience, not just domain experts.

## Projects

- **[`gtex-game/`](gtex-game/)** — **Signal Match**: an interactive React game where players match genes to the tissue they're expressed in, backed by a live UMAP visualization of real GTEx v8 expression data. See [`gtex-game/README.md`](gtex-game/README.md) for setup.
- **`gtex-data/`** — R preprocessing pipeline that turns raw GTEx v8 RNA-seq data into the small dataset `gtex-game` bundles (`gtex-data/src/exportGameData.R`). Raw/intermediate files (`data/`, `results/`) are gitignored — several GB, not meant for version control.
- **`gtex-demo/`** — the earlier single-file HTML/React prototype that preceded Signal Match (search a gene, drag it onto a tissue list). Superseded, kept for reference.
- **`draft/`** — the original build strategy document `gtex-demo/` and `gtex-game/` were both built from.

More projects will be added here as sibling folders as this collection grows.

## Quick start

```bash
cd gtex-game
npm install
npm run dev
```
