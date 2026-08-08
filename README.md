# RNA Tissue Explorer

Public engagement tools for exploring how gene expression varies across human tissues, built around GTEx-style data.

## What's here

- **[`gtex-game/`](gtex-game/)** — the current deliverable: **Signal Match**, an interactive React game where players match genes to the tissue they're expressed in, backed by a live UMAP visualization. This is what you want to run — see [`gtex-game/README.md`](gtex-game/README.md) for setup.
- **`gtex-demo/`** — the earlier single-file HTML/React prototype (search a gene, drag it onto a tissue list). Superseded by `gtex-game/`, kept for reference.
- **`draft/`** — the original build strategy document that both were built from.

## Quick start

```bash
cd gtex-game
npm install
npm run dev
```
