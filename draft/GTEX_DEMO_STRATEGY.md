# GTEx Public Engagement Demo — Build Strategy

## Overview

Build an interactive React web app showcasing gene expression and tissue clustering. Users select genes, drag them onto tissue clusters, and see color-coded expression heatmaps on a UMAP plot. **No backend required — single HTML file runs in any browser.**

---

## Architecture

### **Frontend (Browser)**
- **React** — UI state, interactivity, component lifecycle
- **Plotly.js** — UMAP scatter plot with dynamic coloring
- **Fuse.js** — Instant fuzzy gene search (autocomplete)
- **React Beautiful DnD** — Drag-and-drop gene onto clusters
- **Recharts** — Gene expression bar chart by tissue

### **Data**
- **data.json** — Bundled with the app
  - `samples`: {id, x, y, tissue} (n=800, 10 tissues)
  - `genes`: {symbol, expression_vector} (n=50 marker genes)
  - `tissueColors`: {tissue: hex color}

### **Output**
- Single `index.html` file (self-contained bundle)
- Opens in any browser, works offline
- No server, no backend, no internet required

---

## Build Phases

### **Phase 1: Data Prep (5–10 min)**

**Option A: Synthetic Data (Start Now)**
```
Claude Code task:
"Generate synthetic GTEx data:
- 800 samples across 10 tissues (Liver, Brain, Heart, Kidney, Lung, Pancreas, Muscle, Adipose, Blood, Thyroid)
- UMAP coordinates (x, y) clustered by tissue
- 50 marker genes per tissue (tissue-specific high expression)
- Expression values: log2(CPM + 1), range [0, 12]
- Output: data.json with structure {samples, genes, tissueColors}"
```

**Option B: Real GTEx Data (Your Data)**
```
Provide to Claude Code:
- samples.csv: id, tissue
- expression.csv: genes (rows) × samples (columns), log-normalized values
- umap.csv: sample_id, x, y

Claude Code:
"Parse CSVs, normalize expression [0, 12], assign colors by tissue, export data.json"
```

**Output file**: `src/data.json`

---

### **Phase 2: React Component Scaffold (5 min)**

Claude Code creates project structure:
```
gtex-demo/
├── src/
│   ├── App.jsx              # Main layout, state management
│   ├── components/
│   │   ├── UmapPlot.jsx     # Plotly scatter plot
│   │   ├── GenePicker.jsx   # Searchable dropdown
│   │   ├── GeneCard.jsx     # Stats card + bar chart
│   │   └── TissueDropZone.jsx  # Drag target feedback
│   ├── data.json            # Bundled data
│   ├── index.css            # Styles
│   └── index.jsx            # React entry point
├── package.json
└── vite.config.js           # Build config
```

---

### **Phase 3: Component Implementation (20–30 min)**

#### **UmapPlot.jsx**
```jsx
- Plotly scatter plot (x, y coords)
- Color by tissue (default) or by gene expression (on selection)
- Expression gradient: blue (low) → red (high)
- Hover tooltip: sample ID, tissue, expression value
- Update on gene selection
```

#### **GenePicker.jsx**
```jsx
- Autocomplete dropdown (Fuse.js)
- Searchable by gene symbol
- On selection: trigger gene-selected event
- Shows selected gene in a badge
```

#### **GeneCard.jsx**
```jsx
- Displays selected gene: name, symbol
- Expression stats: min, mean, max
- Bar chart (Recharts): expression by tissue (top 10)
- Drag handle: user can drag gene onto plot clusters
```

#### **App.jsx (State Logic)**
```jsx
State:
- selectedGene: {symbol, data, ...}
- hoveredTissue: null (on drag-over cluster)
- expressionMode: 'tissue' | 'gene'

Actions:
- onGeneSelected(gene) → recolor plot, show gene card
- onDragStart(gene) → prepare drag
- onDragOver(tissue) → highlight tissue cluster
- onDrop(tissue) → show expression stats for that tissue
- onReset() → clear selection, return to tissue colors
```

---

### **Phase 4: Interaction Logic (15–20 min)**

1. **Gene Selection**
   - User types gene name in picker → Fuse.js filters
   - Click result → set `selectedGene` state
   - Plot recolors: scatter points by expression intensity (gradient)
   - Gene card appears with stats

2. **Drag-and-Drop**
   - User drags gene badge onto plot
   - On drag-over cluster: highlight that tissue
   - On drop: 
     - Show tissue name + mean expression for that gene
     - Highlight cluster in the plot
     - Display pop-up: *"Gene X is highly expressed in Tissue Y (mean: 8.2)"*

3. **Reset**
   - Button to clear selection
   - Plot returns to tissue-colored mode
   - Gene card disappears

4. **Pedagogy Callout**
   - Static text at top: *"Gene expression varies by tissue. Drag a gene onto a cluster to see how much it's 'turned on' in that tissue."*

---

### **Phase 5: Build & Package (5 min)**

Claude Code:
```bash
npm install
npm run build
```

**Output**: `dist/index.html` — self-contained single file

---

## Run on Claude Code

```bash
# 1. Start Claude Code session
claude code

# 2. Create project
mkdir gtex-demo && cd gtex-demo

# 3. Generate data
# Claude: "Generate synthetic GTEx data (see Phase 1)"
# Output: src/data.json

# 4. Build React scaffolding
# Claude: "Create React project with Vite, install Plotly, Fuse, React Beautiful DnD"

# 5. Build components
# Claude: "Implement UmapPlot, GenePicker, GeneCard per Phase 4 spec"

# 6. Wire interactivity
# Claude: "Implement App.jsx state logic + event handlers (Phase 4)"

# 7. Build
npm run build

# 8. Test
# Open dist/index.html in browser
```

---

## Data Format: data.json

```json
{
  "samples": [
    {
      "id": "GTEX-001",
      "x": -2.5,
      "y": 1.3,
      "tissue": "Liver"
    },
    {
      "id": "GTEX-002",
      "x": -2.4,
      "y": 1.5,
      "tissue": "Liver"
    },
    ...
  ],
  "genes": [
    {
      "symbol": "APOB",
      "name": "Apolipoprotein B",
      "data": [8.5, 8.2, 0.1, 0.2, 0.0, ..., 2.3]
    },
    {
      "symbol": "ALB",
      "name": "Albumin",
      "data": [9.1, 8.9, 0.0, 0.1, 0.0, ..., 1.5]
    },
    ...
  ],
  "tissueColors": {
    "Liver": "#FF6B6B",
    "Brain": "#4ECDC4",
    "Heart": "#45B7D1",
    "Kidney": "#96CEB4",
    "Lung": "#FFEAA7",
    "Pancreas": "#DDA15E",
    "Muscle": "#BC6C25",
    "Adipose": "#D8B4B8",
    "Blood": "#C084FC",
    "Thyroid": "#A78BFA"
  }
}
```

---

## Deliverable

- **dist/index.html** — Open in Chrome/Firefox/Safari at event
- No server, no backend, no internet required
- Responsive layout for desktop + tablet touch
- ~2–5 MB bundle size (Plotly included)

---

## Pedagogy Message

*"Gene expression varies by tissue. Each point is a sample; color shows how much a gene is expressed. Drag a gene onto a cluster to see: 'This gene is highly expressed in Liver but not in Brain.'"*

---

## Timeline

| Phase | Time | Owner |
|-------|------|-------|
| Data prep | 5–10 min | Claude Code |
| Scaffold | 5 min | Claude Code |
| Components | 20–30 min | Claude Code |
| Interactivity | 15–20 min | Claude Code |
| Build & test | 5 min | Claude Code |
| **Total** | **~60 min** | |

---

## Next Steps

1. **Decide**: Synthetic or real GTEx data?
2. **Provide** (if real data): samples.csv, expression.csv, umap.csv
3. **Start Claude Code session** with this strategy
4. **Assign task**: "Build GTEx public engagement demo per GTEX_DEMO_STRATEGY.md"
