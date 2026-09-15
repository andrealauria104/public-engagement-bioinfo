#
# Applications of dimensionality reduction algorithms
#
# Setup ----
suppressPackageStartupMessages(library(SummarizedExperiment))
suppressPackageStartupMessages(library(RNAseqRtools))
suppressPackageStartupMessages(library(scRNAseqRtools))
suppressPackageStartupMessages(library(uwot))
suppressPackageStartupMessages(library(plot3D))

# Read data 
gtex.summarized.experiment <- readRDS("results/gtex.summarized.experiment.rds")

# Color palette
pal.tissue <- c(
  "Brain" = "#0080FF",
  "Muscle" = "#FF9933",
  "Kidney" = "#00CC00",
  "Lung" = "#B266FF"
)

# Functions
prepareFilteredExprMat <- function(gtex.summarized.experiment, tissues, genes=NULL, pseudocount=1,n.subsample=NULL) {
  
  gtex.summarized.experiment.sel <- gtex.summarized.experiment[, gtex.summarized.experiment$SMTS %in% tissues ]
  
  if(!is.null(n.subsample)) {
    message("-- subsampling to: ", n.subsample)
    sample.id <- list()
    for(i in tissues) {
      sample.id[[i]] <- sample(as.character(gtex.summarized.experiment.sel$SAMPID[gtex.summarized.experiment.sel$SMTS == i]),n.subsample)
    }
    sample.id <- unlist(sample.id)
    gtex.summarized.experiment.sel <- gtex.summarized.experiment.sel[, gtex.summarized.experiment.sel$SAMPID %in% sample.id ]
  }
  
  if(!is.null(genes)) {
    gene.id <- rowData(gtex.summarized.experiment.sel)$Name[rowData(gtex.summarized.experiment.sel)$Description %in% genes]
    
    tpm.id <- assay(gtex.summarized.experiment.sel, "tpm")[
      gene.id,,drop=F
    ]
    tpm.id <- reshape2::melt(
      tpm.id,
      varnames = c("gene_id","sample_id")
    )
    tpm.id$tissue <- gtex.summarized.experiment.sel$SMTS[match(tpm.id$sample_id,gtex.summarized.experiment.sel$SAMPID)]
    tpm.id$gene_name <- rowData(gtex.summarized.experiment.sel)$Description[match(tpm.id$gene_id,rowData(gtex.summarized.experiment.sel)$Name)]
    tpm.id$log_value <- log2(tpm.id$value+pseudocount)
    
    if(!is.null(n.subsample)) {
      tpm.id <- tpm.id[tpm.id$sample_id %in% sample.id,]  
    }
    tpm.id <- reshape2::dcast(tpm.id[,c(2,4:6)], ...~gene_name,value.var = "log_value")
  } else {
    tpm.id <- NA
  }
  return(list("gtex.summarized.experiment.sel"=gtex.summarized.experiment.sel,"tpm.id"=tpm.id))
}

path.results <- "results/exampleDimensionalityReduction"
if(!dir.exists(path.results)) dir.create(path.results, recursive = T)

#
# Example 1: PCA on transcriptome profiles from Kidney and Muscle tissues ----
#
set.seed(1991)
example1.expr.mat <- prepareFilteredExprMat(
  gtex.summarized.experiment = gtex.summarized.experiment,
  tissues = c("Kidney","Muscle"),
  n.subsample = 10,
  genes = c("PUM2","APOL1","MYH2")
)

# 1D
example1.expr.1D.plt <- ggplot(example1.expr.mat$tpm.id,aes(x=APOL1, y=0, col=tissue)) +
  geom_point(size=3)+
  scale_x_continuous(limits = c(1,20)) +
  scale_color_manual(values = pal.tissue) +
  annotate("segment",x=1,xend=20, y=0, yend=0, size=.5) +
  # scale_y_continuous(limits = c(0,0), expand = c(0.1,0.1)) +
  theme(
    panel.background = element_blank(),
    axis.text = element_blank(),
    axis.title.x = element_text(size=8),
    axis.title.y = element_blank(),
    axis.ticks = element_blank(),
    legend.text = element_text(size=8),
    legend.title = element_text(size=8)
    )

outfile <- paste0(path.results,"/example1.expr.1D.plt.pdf")
message("-- saving to: ", outfile)
pdf(file=outfile, paper = "a4", width = unit(4,'cm'), height = unit(3,'cm'))
print(example1.expr.1D.plt)
dev.off()

# 2D
example1.expr.2D.plt <- ggplot(example1.expr.mat$tpm.id,aes(x=APOL1,y=MYH2,col=tissue)) +
  geom_point(size=2)+
  theme_classic() +
  scale_color_manual(values = pal.tissue) +
  theme(panel.background = element_blank(),
        axis.text = element_blank(),
        axis.ticks = element_blank(),
        axis.title = element_text(size=8),
        legend.text = element_text(size=8),
        legend.title = element_text(size=8))

outfile <- paste0(path.results,"/example1.expr.2D.plt.pdf")
message("-- saving to: ", outfile)
pdf(file=outfile, paper = "a4", width = unit(4,'cm'), height = unit(3,'cm'))
print(example1.expr.2D.plt)
dev.off()

# 3D
outfile <- paste0(path.results,"/example1.expr.3D.plt.pdf")
pdf(file = outfile, paper = "a4", w = unit(6, 'cm'), h = unit(5, 'cm'))
plot3D::scatter3D(
  x=example1.expr.mat$tpm.id$APOL1,
  y=example1.expr.mat$tpm.id$MYH2,
  z=example1.expr.mat$tpm.id$PUM2,
  colvar = as.integer(factor(example1.expr.mat$tpm.id$tissue)),
  col = pal.tissue[example1.expr.mat$tpm.id$tissue],
  colkey = list(at = 1:2,
                length = 0.5,
                width = 0.5,
                labels = levels(factor(example1.expr.mat$tpm.id$tissue)),
                addlines = FALSE,
                dist = -0.08,
                cex.axis = 0.5),
  xlab="APOL1",
  ylab="MYH2",
  zlab="PUM2",
  pch = 19,
  cex = 0.6,
  theta = 50,
  phi = 0,
  bty = "b",
  grid=F
  )
dev.off()

# PCA
keep <- rowMeans(assay(example1.expr.mat$gtex.summarized.experiment.sel,"tpm"))>0
example1.expr.mat$gtex.summarized.experiment.sel <- example1.expr.mat$gtex.summarized.experiment.sel[keep,]
vargenes <- RNAseqRtools::find.variable.genes(assay(example1.expr.mat$gtex.summarized.experiment.sel,"tpm"),n=2500)
pca <- RNAseqRtools::plotPCA(
  x = t(apply(assay(example1.expr.mat$gtex.summarized.experiment.sel,"tpm")[vargenes$genes,],1,function(x) log2(x+1))),
  experimental_info = colData(example1.expr.mat$gtex.summarized.experiment.sel),
  col_by = "SMTS",
  labels = F,
  pal = pal.tissue,
  legend_position = "right",
  scree_plot = T
)

outfile <- paste0(path.results,"/example1.expr.pca.plt.pdf")
message("-- saving to: ", outfile)
pdf(file=outfile, paper = "a4", width = unit(4,'cm'), height = unit(3,'cm'))
print(pca)
dev.off()

#
# Example 2: PCA, t-SNE and UMAP on transcriptome profiles from Brain, Kidney, Lung and Muscle tissues ----
#
set.seed(1991)
example2.expr.mat <- prepareFilteredExprMat(
  gtex.summarized.experiment = gtex.summarized.experiment,
  tissues = c("Brain","Kidney","Lung","Muscle")
)

keep <- rowMeans(assay(example2.expr.mat$gtex.summarized.experiment.sel,"tpm"))>0
example2.expr.mat$gtex.summarized.experiment.sel <- example2.expr.mat$gtex.summarized.experiment.sel[keep,]
vargenes <- RNAseqRtools::find.variable.genes(assay(example2.expr.mat$gtex.summarized.experiment.sel,"tpm"),n=2500)

# PCA
example2.pca <- RNAseqRtools::plotPCA(
  x = t(apply(assay(example2.expr.mat$gtex.summarized.experiment.sel,"tpm")[vargenes$genes,],1,function(x) log2(x+1))),
  experimental_info = colData(example2.expr.mat$gtex.summarized.experiment.sel),
  col_by = "SMTS",
  labels = F,
  pal = pal.tissue,
  legend_position = "right",
  scree_plot = T,
  point_size = 0.5
)
example2.pca$pca <- example2.pca$pca + guides(col=guide_legend(override.aes = list(size=2)))

outfile <- paste0(path.results,"/example2.expr.pca.plt.pdf")
message("-- saving to: ", outfile)
pdf(file=outfile, paper = "a4", width = unit(4,'cm'), height = unit(3,'cm'))
print(example2.pca)
dev.off()

# t-SNE
set.seed(1991)
example2.tsne <- scRNAseqRtools::getTSNE(
  x = apply(assay(example2.expr.mat$gtex.summarized.experiment.sel,"tpm")[vargenes$genes,],1,function(x) log2(x+1)),
  experimental_info = colData(example2.expr.mat$gtex.summarized.experiment.sel),
  col_by = "SMTS",
  pal = pal.tissue,
  point_size = 0.5
)
example2.tsne$plot <- example2.tsne$plot +
  theme_bw() + my_theme +
  theme(
    legend.position = "right",
    panel.grid.major = element_blank()
    ) +
  guides(col=guide_legend(override.aes = list(size=2)))

outfile <- paste0(path.results,"/example2.expr.tsne.plt.pdf")
message("-- saving to: ", outfile)
pdf(file=outfile, paper = "a4", width = unit(4,'cm'), height = unit(3,'cm'))
print(example2.tsne$plot)
dev.off()

# UMAP
set.seed(1991)
example2.umap <- uwot::umap(
  X = apply(assay(example2.expr.mat$gtex.summarized.experiment.sel,"tpm")[vargenes$genes,],1,function(x) log2(x+1)),
  pca = 50,
  n_neighbors = 15,
  min_dist = 0.1
)
example2.umap <- as.data.frame(example2.umap)
colnames(example2.umap) <- c("UMAP1","UMAP2")
example2.umap <- cbind(example2.umap,colData(example2.expr.mat$gtex.summarized.experiment.sel)[rownames(example2.umap),])

example2.umap.plt <- ggplot(
  example2.umap,
  aes(x=UMAP1,y=UMAP2,col=SMTS)
) +
  geom_point(size=.5) +
  theme_bw() + my_theme +
  theme(
    legend.position = "right",
    panel.grid.major = element_blank()
  ) +
  scale_color_manual(values = pal.tissue) +
  guides(col=guide_legend(override.aes = list(size=2)))

outfile <- paste0(path.results,"/example2.expr.umap.plt.pdf")
message("-- saving to: ", outfile)
pdf(file=outfile, paper = "a4", width = unit(4,'cm'), height = unit(3,'cm'))
print(example2.umap.plt)
dev.off()

#
# Example 3: PCA, t-SNE and UMAP on transcriptome profiles from all tissues ----
#
pal.tissue.full <- c(
  RColorBrewer::brewer.pal(9,"Set1"),
  RColorBrewer::brewer.pal(8,"Set2"),
  RColorBrewer::brewer.pal(8,"Dark2"),
  RColorBrewer::brewer.pal(8,"Blues")
)
names(pal.tissue.full) <- unique(gtex.summarized.experiment$SMTS)
pal.tissue.full[match(names(pal.tissue),names(pal.tissue.full))] <- pal.tissue

gtex.summarized.experiment.sel <- gtex.summarized.experiment
keep <- rowMeans(assay(gtex.summarized.experiment.sel,"tpm"))>0
gtex.summarized.experiment.sel <- gtex.summarized.experiment.sel[keep,]
vargenes <- RNAseqRtools::find.variable.genes(assay(gtex.summarized.experiment.sel,"tpm"),n=5000)

# PCA
example3.pca <- RNAseqRtools::plotPCA(
  x = t(apply(assay(gtex.summarized.experiment.sel,"tpm")[vargenes$genes,],1,function(x) log2(x+1))),
  experimental_info = colData(gtex.summarized.experiment.sel),
  col_by = "SMTS",
  labels = F,
  pal = pal.tissue.full,
  legend_position = "right",
  scree_plot = T,
  point_size = 0.5
)
example3.pca$pca <- example3.pca$pca + guides(col=guide_legend(override.aes = list(size=2)))

outfile <- paste0(path.results,"/example3.expr.pca.plt.pdf")
message("-- saving to: ", outfile)
pdf(file=outfile, paper = "a4", width = unit(6,'cm'), height = unit(3.8,'cm'))
print(example3.pca)
dev.off()

# t-SNE
set.seed(1991)
example3.tsne <- scRNAseqRtools::getTSNE(
  x = apply(assay(gtex.summarized.experiment.sel,"tpm")[vargenes$genes,],1,function(x) log2(x+1)),
  experimental_info = colData(gtex.summarized.experiment.sel),
  col_by = "SMTS",
  pal = pal.tissue.full,
  point_size = 0.5
)
example3.tsne$plot <- example3.tsne$plot +
  theme_bw() + my_theme +
  theme(
    legend.position = "right",
    panel.grid.major = element_blank()
  ) +
  guides(col=guide_legend(override.aes = list(size=2)))

outfile <- paste0(path.results,"/example3.expr.tsne.plt.pdf")
message("-- saving to: ", outfile)
pdf(file=outfile, paper = "a4", width = unit(6,'cm'), height = unit(3.8,'cm'))
print(example3.tsne$plot)
dev.off()

# UMAP
set.seed(1991)
example3.umap <- uwot::umap(
  X = apply(assay(gtex.summarized.experiment.sel,"tpm")[vargenes$genes,],1,function(x) log2(x+1)),
  pca = 100,
  n_neighbors = 15,
  min_dist = 0.1
)
example3.umap <- as.data.frame(example3.umap)
colnames(example3.umap) <- c("UMAP1","UMAP2")
example3.umap <- cbind(example3.umap,colData(gtex.summarized.experiment.sel)[rownames(example3.umap),])

example3.umap.plt <- ggplot(
  example3.umap,
  aes(x=UMAP1,y=UMAP2,col=SMTS)
) +
  geom_point(size=.5) +
  theme_bw() + my_theme +
  theme(
    legend.position = "right",
    panel.grid.major = element_blank()
  ) +
  scale_color_manual(
    values = pal.tissue.full
    ) +
  guides(col=guide_legend(override.aes = list(size=2)))

outfile <- paste0(path.results,"/example3.expr.umap.plt.pdf")
message("-- saving to: ", outfile)
pdf(file=outfile, paper = "a4", width = unit(6,'cm'), height = unit(3.8,'cm'))
print(example3.umap.plt)
dev.off()
