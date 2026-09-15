#
# Pre-process GTEx data in a SummarizedExperiment object
# 
# Setup ----
suppressPackageStartupMessages(library(SummarizedExperiment))
suppressPackageStartupMessages(library(edgeR))

path.gene.tpm <- "data/GTEx_Analysis_2017-06-05_v8_RNASeQCv1.1.9_gene_tpm.gct.gz"
path.gene.counts <- "data/GTEx_Analysis_2017-06-05_v8_RNASeQCv1.1.9_gene_reads.gct.gz"
path.sample.attributes <- "data/GTEx_Analysis_v8_Annotations_SampleAttributesDS.txt"

# Read data ----
message("-- reading: ", path.gene.counts)
gene.counts <- read.delim(path.gene.counts, skip = 2)
colnames(gene.counts) <- gsub("\\.","\\-",colnames(gene.counts))

message("-- reading: ", path.gene.tpm)
gene.tpm <- read.delim(path.gene.tpm, skip = 2)
colnames(gene.tpm) <- gsub("\\.","\\-",colnames(gene.tpm))

message("-- reading: ", path.sample.attributes)
sample.attributes <- read.delim(path.sample.attributes)

# counts
counts <- as.matrix(gene.counts[,-c(1:2)])
rownames(counts) <- gene.counts[,1]

# tpm
tpm <- as.matrix(gene.tpm[,-c(1:2)])
rownames(tpm) <- gene.tpm[,1]

# normalized counts (TMM, upperquartile)
keep <- rowSums(counts>=30)>=floor(quantile(1:ncol(counts),seq(0,1,.1))["20%"])
y.filt <- edgeR::DGEList(counts=counts[keep,])
y.filt <- edgeR::calcNormFactors(y.filt,method="TMM") # upperquartile
y <- edgeR::DGEList(counts=counts)
y$samples$norm.factors <- y.filt$samples$norm.factors
log.norm.counts <- edgeR::cpm(y, normalized.lib.sizes=TRUE, log=TRUE)

# gene metadata
rowDataDf <- gene.tpm[,1:2]
rownames(rowDataDf) <- gene.tpm[,1]
rowDataDf$expr.filter.keep <- keep

# sample metadata
colDataDf <- sample.attributes[which(sample.attributes$SAMPID %in% colnames(tpm)),]
rownames(colDataDf) <- colDataDf[,1]
colDataDf <- colDataDf[match(colnames(tpm),colDataDf$SAMPID),]

# Checks ----
message("-- check metadata matching: counts")
# check
print(identical(rownames(colDataDf),colnames(counts)))
print(identical(colDataDf$SAMPID,colnames(counts)))
# check
print(identical(rownames(rowDataDf),rownames(counts)))
print(identical(rowDataDf$Name,rownames(counts)))

message("-- check metadata matching: tpm")
# check
print(identical(rownames(colDataDf),colnames(tpm)))
print(identical(colDataDf$SAMPID,colnames(tpm)))
# check
print(identical(rownames(rowDataDf),rownames(tpm)))
print(identical(rowDataDf$Name,rownames(tpm)))

message("-- check metadata matching: log.norm.counts")
# check
print(identical(rownames(colDataDf),colnames(log.norm.counts)))
print(identical(colDataDf$SAMPID,colnames(log.norm.counts)))
# check
print(identical(rownames(rowDataDf),rownames(log.norm.counts)))
print(identical(rowDataDf$Name,rownames(log.norm.counts)))

# Create SummarizedExperiment object ----
gtex.summarized.experiment <- SummarizedExperiment::SummarizedExperiment(
  assays = list(
    "counts" = counts,
    "tpm" = tpm,
    "log.norm.counts" = log.norm.counts
    ),
  rowData = rowDataDf,
  colData = colDataDf
)

outfile <- "results/gtex.summarized.experiment.rds"
message("-- saving to: ", outfile)
saveRDS(gtex.summarized.experiment, file = outfile)
