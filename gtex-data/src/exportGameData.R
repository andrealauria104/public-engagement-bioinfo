# Export a small real-data slice of GTEx v8 for the "Signal Match" game.
#
# Reads the precomputed SummarizedExperiment (results/gtex.summarized.experiment.rds),
# validates the game's curated marker genes against real tissue-specificity,
# subsamples 10 target tissues, runs a joint UMAP, and writes
# gtex-game/src/data/gtex_real.json with { samples, genes } --
# tissue colors/organ mapping/order stay defined once in JS (generateData.js).
#
# Run from gtex-data/:  Rscript src/exportGameData.R

suppressMessages({
  library(SummarizedExperiment)
  library(uwot)
  library(jsonlite)
})

set.seed(42)

SAMPLES_PER_TISSUE <- 90
N_VARIABLE_GENES <- 2000
OUT_PATH <- "../gtex-game/src/data/gtex_real.json"

# tissue name used in the game -> real SMTS string in GTEx sample attributes
TARGET_TISSUES <- c(
  Liver    = "Liver",
  Brain    = "Brain",
  Heart    = "Heart",
  Kidney   = "Kidney",
  Lung     = "Lung",
  Pancreas = "Pancreas",
  Muscle   = "Muscle",
  Adipose  = "Adipose Tissue",
  Blood    = "Blood",
  Thyroid  = "Thyroid"
)

# curated marker genes, copied from gtex-game/src/data/generateData.js
MARKER_GENES <- list(
  Liver    = list(c("ALB", "Albumin"), c("APOB", "Apolipoprotein B"), c("CYP3A4", "Cytochrome P450 3A4"), c("TTR", "Transthyretin"), c("SERPINA1", "Alpha-1 Antitrypsin")),
  Brain    = list(c("GFAP", "Glial Fibrillary Acidic Protein"), c("SNAP25", "Synaptosome Assoc. Protein 25"), c("MBP", "Myelin Basic Protein"), c("SYT1", "Synaptotagmin 1"), c("RBFOX3", "RNA Binding Fox-1 Homolog 3")),
  Heart    = list(c("MYH6", "Myosin Heavy Chain 6"), c("TNNT2", "Troponin T2, Cardiac"), c("NPPA", "Natriuretic Peptide A"), c("ACTC1", "Actin, Cardiac Muscle 1"), c("TNNI3", "Troponin I3, Cardiac")),
  Kidney   = list(c("UMOD", "Uromodulin"), c("AQP2", "Aquaporin 2"), c("SLC12A1", "Na-K-Cl Cotransporter"), c("NPHS2", "Podocin"), c("CUBN", "Cubilin")),
  Lung     = list(c("SFTPC", "Surfactant Protein C"), c("SFTPB", "Surfactant Protein B"), c("SCGB1A1", "Secretoglobin 1A1"), c("NAPSA", "Napsin A"), c("AGER", "Advanced Glycosylation End-Product Receptor")),
  Pancreas = list(c("INS", "Insulin"), c("GCG", "Glucagon"), c("PRSS1", "Trypsinogen"), c("AMY2A", "Pancreatic Amylase"), c("SST", "Somatostatin")),
  Muscle   = list(c("ACTA1", "Actin, Skeletal Muscle"), c("MYH1", "Myosin Heavy Chain 1"), c("TTN", "Titin"), c("CKM", "Creatine Kinase, Muscle"), c("DES", "Desmin")),
  Adipose  = list(c("ADIPOQ", "Adiponectin"), c("LEP", "Leptin"), c("FABP4", "Fatty Acid Binding Protein 4"), c("PLIN1", "Perilipin 1"), c("UCP1", "Uncoupling Protein 1")),
  Blood    = list(c("HBB", "Hemoglobin Beta"), c("HBA1", "Hemoglobin Alpha 1"), c("GYPA", "Glycophorin A"), c("CD3D", "CD3d Molecule"), c("CD19", "CD19 Molecule")),
  Thyroid  = list(c("TG", "Thyroglobulin"), c("TPO", "Thyroid Peroxidase"), c("TSHR", "Thyroid Stimulating Hormone Receptor"), c("SLC5A5", "Sodium/Iodide Cotransporter"), c("PAX8", "Paired Box 8"))
)

cat("Loading SummarizedExperiment...\n")
se <- readRDS("results/gtex.summarized.experiment.rds")

col_smts <- colData(se)$SMTS
gene_symbol <- rowData(se)$Description

target_idx <- col_smts %in% TARGET_TISSUES
se10 <- se[, target_idx]
tissue_of_sample <- names(TARGET_TISSUES)[match(colData(se10)$SMTS, TARGET_TISSUES)]

cat("Samples per target tissue (all available):\n")
print(table(tissue_of_sample))

## ---- 1. Marker gene validation (against ALL available samples) ----------

log_tpm_all <- log2(assay(se10, "tpm") + 1)

validate_gene <- function(symbol, assigned_tissue) {
  rows <- which(gene_symbol == symbol)
  if (length(rows) == 0) {
    return(list(symbol = symbol, assigned = assigned_tissue, ok = FALSE, reason = "not found in gene table"))
  }
  # if a symbol maps to multiple Ensembl IDs, use the one with highest overall expression
  if (length(rows) > 1) {
    totals <- rowSums(log_tpm_all[rows, , drop = FALSE])
    rows <- rows[which.max(totals)]
  }
  vals <- log_tpm_all[rows, ]
  means <- tapply(vals, tissue_of_sample, mean)
  means <- means[names(TARGET_TISSUES)]
  best_tissue <- names(which.max(means))
  ok <- identical(best_tissue, assigned_tissue)
  sorted <- sort(means, decreasing = TRUE)
  runner_up <- if (ok) names(sorted)[2] else best_tissue
  list(
    symbol = symbol, assigned = assigned_tissue, ok = ok,
    assigned_mean = round(means[[assigned_tissue]], 2),
    top_tissue = best_tissue, top_mean = round(sorted[[1]], 2),
    runner_up = runner_up, runner_up_mean = round(sorted[[if (ok) 2 else 1]], 2)
  )
}

cat("\nValidating marker genes against real tissue specificity...\n")
results <- list()
for (tissue in names(MARKER_GENES)) {
  for (pair in MARKER_GENES[[tissue]]) {
    results[[length(results) + 1]] <- validate_gene(pair[1], tissue)
  }
}

report <- do.call(rbind, lapply(results, function(r) {
  data.frame(
    symbol = r$symbol, assigned = r$assigned, ok = r$ok,
    assigned_mean = ifelse(is.null(r$assigned_mean), NA, r$assigned_mean),
    top_tissue = ifelse(is.null(r$top_tissue), NA, r$top_tissue),
    top_mean = ifelse(is.null(r$top_mean), NA, r$top_mean),
    stringsAsFactors = FALSE
  )
}))
print(report, row.names = FALSE)

failed <- report[!report$ok, ]
if (nrow(failed) > 0) {
  cat("\n=== NEEDS REPLACEMENT ===\n")
  print(failed, row.names = FALSE)
  stop(sprintf(
    "%d marker gene(s) are not the top tissue for their assigned organ in real data. Pick replacement symbols and re-run.",
    nrow(failed)
  ))
}
cat("\nAll marker genes validated: each is the top-expressing tissue among the 10 targets.\n")

## ---- 2. Subsample 90 samples/tissue --------------------------------------

cat("\nSubsampling", SAMPLES_PER_TISSUE, "samples per tissue...\n")
keep_cols <- unlist(lapply(names(TARGET_TISSUES), function(tissue) {
  idx <- which(tissue_of_sample == tissue)
  n <- min(SAMPLES_PER_TISSUE, length(idx))
  if (n < SAMPLES_PER_TISSUE) {
    warning(sprintf("Tissue %s has only %d samples available (< %d requested); using all of them.", tissue, length(idx), SAMPLES_PER_TISSUE))
  }
  sample(idx, n)
}))

se_sub <- se10[, keep_cols]
tissue_sub <- tissue_of_sample[keep_cols]
cat("Exported samples per tissue:\n")
print(table(tissue_sub))

## ---- 3. Joint UMAP on top-variable genes ----------------------------------

cat("\nComputing log2(TPM+1) and selecting top", N_VARIABLE_GENES, "variable genes...\n")
log_tpm_sub <- log2(assay(se_sub, "tpm") + 1)
gene_var <- apply(log_tpm_sub, 1, var)
top_var_idx <- order(gene_var, decreasing = TRUE)[seq_len(N_VARIABLE_GENES)]

cat("Running UMAP on", ncol(log_tpm_sub), "samples x", length(top_var_idx), "genes...\n")
umap_input <- t(log_tpm_sub[top_var_idx, ])
set.seed(42)
umap_coords <- umap(umap_input, pca = 50, n_neighbors = 15, min_dist = 0.3, spread = 2)

## ---- 4. Marker gene expression for exported samples -----------------------

gene_records <- list()
for (tissue in names(MARKER_GENES)) {
  for (pair in MARKER_GENES[[tissue]]) {
    symbol <- pair[1]
    name <- pair[2]
    rows <- which(gene_symbol == symbol)
    if (length(rows) > 1) {
      totals <- rowSums(log_tpm_sub[rows, , drop = FALSE])
      rows <- rows[which.max(totals)]
    }
    vals <- round(log_tpm_sub[rows, ], 3)
    gene_records[[length(gene_records) + 1]] <- list(
      symbol = symbol, name = name, tissue = tissue,
      data = unname(vals)
    )
  }
}

## ---- 5. Assemble + write JSON --------------------------------------------

sample_records <- lapply(seq_len(ncol(se_sub)), function(i) {
  list(
    id = colData(se_sub)$SAMPID[i],
    tissue = tissue_sub[i],
    x = round(umap_coords[i, 1], 3),
    y = round(umap_coords[i, 2], 3)
  )
})

out <- list(samples = sample_records, genes = gene_records)

dir.create(dirname(OUT_PATH), recursive = TRUE, showWarnings = FALSE)
write_json(out, OUT_PATH, auto_unbox = TRUE, digits = 3)
cat("\nWrote", OUT_PATH, "--", length(sample_records), "samples,", length(gene_records), "genes.\n")
