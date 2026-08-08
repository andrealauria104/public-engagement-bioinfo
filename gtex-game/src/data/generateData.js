// Deterministic synthetic GTEx-like data: 10 tissues, 5 marker genes each,
// 80 samples/tissue with UMAP-like coordinates clustered by tissue.

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rng) {
  const u = 1 - rng();
  const v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

// Colorblind-safe qualitative palette (Paul Tol "Muted" set + one Okabe-Ito
// hue) -- distinguishable under protanopia, deuteranopia and tritanopia,
// unlike hue-wheel rainbow palettes.
const TISSUES = [
  { name: "Liver", color: "#882255", organ: "liver", markers: [["ALB", "Albumin"], ["APOB", "Apolipoprotein B"], ["CYP3A4", "Cytochrome P450 3A4"], ["TTR", "Transthyretin"], ["SERPINA1", "Alpha-1 Antitrypsin"]] },
  { name: "Brain", color: "#332288", organ: "brain", markers: [["GFAP", "Glial Fibrillary Acidic Protein"], ["SNAP25", "Synaptosome Assoc. Protein 25"], ["MBP", "Myelin Basic Protein"], ["SYT1", "Synaptotagmin 1"], ["RBFOX3", "RNA Binding Fox-1 Homolog 3"]] },
  { name: "Heart", color: "#CC6677", organ: "heart", markers: [["MYH6", "Myosin Heavy Chain 6"], ["TNNT2", "Troponin T2, Cardiac"], ["NPPA", "Natriuretic Peptide A"], ["ACTC1", "Actin, Cardiac Muscle 1"], ["MYL2", "Myosin Light Chain 2"]] },
  { name: "Kidney", color: "#44AA99", organ: "kidney", markers: [["UMOD", "Uromodulin"], ["AQP2", "Aquaporin 2"], ["SLC12A1", "Na-K-Cl Cotransporter"], ["NPHS2", "Podocin"], ["CUBN", "Cubilin"]] },
  { name: "Lung", color: "#88CCEE", organ: "lung", markers: [["SFTPC", "Surfactant Protein C"], ["SFTPB", "Surfactant Protein B"], ["SCGB1A1", "Secretoglobin 1A1"], ["NAPSA", "Napsin A"], ["AGER", "Advanced Glycosylation End-Product Receptor"]] },
  { name: "Pancreas", color: "#E69F00", organ: "pancreas", markers: [["INS", "Insulin"], ["GCG", "Glucagon"], ["PRSS1", "Trypsinogen"], ["AMY2A", "Pancreatic Amylase"], ["SST", "Somatostatin"]] },
  { name: "Muscle", color: "#999933", organ: "muscle", markers: [["ACTA1", "Actin, Skeletal Muscle"], ["MYH1", "Myosin Heavy Chain 1"], ["TTN", "Titin"], ["CKM", "Creatine Kinase, Muscle"], ["DES", "Desmin"]] },
  { name: "Adipose", color: "#DDCC77", organ: "adipose", markers: [["ADIPOQ", "Adiponectin"], ["LEP", "Leptin"], ["FABP4", "Fatty Acid Binding Protein 4"], ["PLIN1", "Perilipin 1"], ["UCP1", "Uncoupling Protein 1"]] },
  { name: "Blood", color: "#AA4499", organ: "blood", markers: [["HBB", "Hemoglobin Beta"], ["HBA1", "Hemoglobin Alpha 1"], ["GYPA", "Glycophorin A"], ["CD3D", "CD3d Molecule"], ["CD19", "CD19 Molecule"]] },
  { name: "Thyroid", color: "#117733", organ: "thyroid", markers: [["TG", "Thyroglobulin"], ["TPO", "Thyroid Peroxidase"], ["TSHR", "Thyroid Stimulating Hormone Receptor"], ["SLC5A5", "Sodium/Iodide Cotransporter"], ["PAX8", "Paired Box 8"]] },
];

export function generateGtexData(seed = 42) {
  const rng = mulberry32(seed);
  const samplesPerTissue = 80;
  const blobRadius = 8;
  const blobSpread = 1.15;

  const samples = [];
  const tissueColors = {};
  const tissueOrgan = {};

  TISSUES.forEach((t, ti) => {
    tissueColors[t.name] = t.color;
    tissueOrgan[t.name] = t.organ;
    const angle = (2 * Math.PI * ti) / TISSUES.length;
    const cx = blobRadius * Math.cos(angle);
    const cy = blobRadius * Math.sin(angle);
    for (let i = 0; i < samplesPerTissue; i++) {
      samples.push({
        id: `GTEX-${t.name.slice(0, 3).toUpperCase()}-${String(i + 1).padStart(3, "0")}`,
        tissue: t.name,
        x: cx + gaussian(rng) * blobSpread,
        y: cy + gaussian(rng) * blobSpread,
      });
    }
  });

  const genes = [];
  TISSUES.forEach((t) => {
    t.markers.forEach(([symbol, name]) => {
      const data = samples.map((s) => {
        const base = s.tissue === t.name ? 9.2 : 0.6;
        const noise = gaussian(rng) * (s.tissue === t.name ? 0.9 : 0.4);
        return clamp(base + noise, 0, 12);
      });
      genes.push({ symbol, name, tissue: t.name, data });
    });
  });

  return {
    samples,
    genes,
    tissueColors,
    tissueOrgan,
    tissueOrder: TISSUES.map((t) => t.name),
  };
}

export function meanMinMax(arr) {
  let min = Infinity;
  let max = -Infinity;
  let sum = 0;
  for (const v of arr) {
    if (v < min) min = v;
    if (v > max) max = v;
    sum += v;
  }
  return { min, max, mean: sum / arr.length };
}

export function meanByTissue(gene, samples, tissueOrder) {
  const sums = {};
  const counts = {};
  tissueOrder.forEach((t) => {
    sums[t] = 0;
    counts[t] = 0;
  });
  samples.forEach((s, i) => {
    sums[s.tissue] += gene.data[i];
    counts[s.tissue]++;
  });
  return tissueOrder.map((t) => ({ tissue: t, mean: sums[t] / counts[t] }));
}

export function bestTissueFor(gene, samples, tissueOrder) {
  const byTissue = meanByTissue(gene, samples, tissueOrder);
  return byTissue.reduce((best, cur) => (cur.mean > best.mean ? cur : best));
}
