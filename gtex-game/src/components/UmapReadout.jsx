import { useEffect, useRef, useState } from "react";
import Plotly from "plotly.js-dist-min";
import { useI18n } from "../i18n/LanguageContext";
import InfoTip from "./InfoTip";

// Perceptually-uniform, colorblind-safe sequential scale (viridis) for the
// continuous expression readout -- distinct from the categorical tissue
// palette so the two panels never get visually confused.
const VIRIDIS = [
  [0, "#440154"],
  [0.25, "#3b528b"],
  [0.5, "#21918c"],
  [0.75, "#5ec962"],
  [1, "#fde725"],
];

// Median rather than mean, so a few stray samples don't drag a cluster's
// label off the cluster.
function median(values) {
  const v = [...values].sort((a, b) => a - b);
  const mid = v.length >> 1;
  return v.length % 2 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
}

export default function UmapReadout({ mode, samples, tissueOrder, tissueColors, gene, highlightedTissue }) {
  const ref = useRef(null);
  const isExpression = mode === "expression";
  const { t, tTissue, lang } = useI18n();
  // Cluster names are opt-in; not persisted, so each visitor starts clean.
  const [showNames, setShowNames] = useState(false);

  useEffect(() => {
    const div = ref.current;
    if (!div) return;

    const traces = isExpression
      ? [
          {
            type: "scattergl",
            mode: "markers",
            name: gene ? gene.symbol : "expression",
            x: samples.map((s) => s.x),
            y: samples.map((s) => s.y),
            text: samples.map((s, i) => (gene ? `${s.id}<br>${tTissue(s.tissue)}<br>${gene.symbol}: ${gene.data[i].toFixed(2)}` : s.id)),
            hoverinfo: "text",
            marker: {
              color: gene ? gene.data : samples.map(() => 0),
              colorscale: VIRIDIS,
              cmin: 0,
              cmax: gene ? Math.max(...gene.data) : 12,
              size: 7,
              opacity: 0.9,
              colorbar: { title: "log2(CPM+1)", thickness: 14, tickfont: { color: "#8b95a1", size: 12 }, titlefont: { color: "#8b95a1", size: 12 } },
              showscale: true,
            },
          },
        ]
      : tissueOrder.map((tissueKey) => {
          const pts = samples.filter((s) => s.tissue === tissueKey);
          const isHighlighted = highlightedTissue === tissueKey;
          const isDimmed = highlightedTissue && !isHighlighted;
          return {
            type: "scattergl",
            mode: "markers",
            name: tTissue(tissueKey),
            x: pts.map((s) => s.x),
            y: pts.map((s) => s.y),
            text: pts.map((s) => `${s.id}<br>${tTissue(s.tissue)}`),
            hoverinfo: "text",
            marker: {
              color: tissueColors[tissueKey],
              size: isHighlighted ? 7 : 6,
              opacity: isDimmed ? 0.15 : isHighlighted ? 0.95 : 0.75,
              line: isHighlighted ? { color: "#1e2733", width: 1 } : undefined,
            },
          };
        });

    // Optional tissue names written on each cluster (at its median, so a few outlier
    // samples elsewhere don't pull the name away) instead of a legend. A
    // text halo rather than a box keeps the points underneath visible.
    // Names near the left/right edge are anchored inward so they don't get
    // clipped, and multi-word names ("Tessuto adiposo") wrap onto two lines
    // so they don't reach the neighbouring cluster's name.
    const xs = samples.map((s) => s.x);
    const xMin = Math.min(...xs);
    const xSpan = Math.max(...xs) - xMin || 1;
    const annotations = isExpression || !showNames
      ? []
      : tissueOrder.map((tissueKey) => {
          const pts = samples.filter((s) => s.tissue === tissueKey);
          const isDimmed = highlightedTissue && highlightedTissue !== tissueKey;
          const x = median(pts.map((s) => s.x));
          const xFrac = (x - xMin) / xSpan;
          return {
            x,
            y: median(pts.map((s) => s.y)),
            xanchor: xFrac > 0.85 ? "right" : xFrac < 0.15 ? "left" : "center",
            text: tTissue(tissueKey).replace(/ /g, "<br>"),
            showarrow: false,
            font: { size: 11, color: "#1e2733", shadow: "auto" },
            opacity: isDimmed ? 0.35 : 1,
          };
        });

    const layout = {
      autosize: true,
      // No legend: the tissue colours are keyed by the dots on the anatomy
      // labels and named on the clusters themselves.
      showlegend: false,
      annotations,
      margin: { l: 46, r: 8, t: 8, b: 42 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      xaxis: { title: t("umap1"), color: "#8b95a1", gridcolor: "#d8e4ee", zeroline: false, tickfont: { size: 12 }, titlefont: { size: 13 } },
      yaxis: { title: t("umap2"), color: "#8b95a1", gridcolor: "#d8e4ee", zeroline: false, tickfont: { size: 12 }, titlefont: { size: 13 } },
      font: { color: "#1e2733", family: "Arial, Helvetica, sans-serif", size: 13 },
    };

    Plotly.react(div, traces, layout, { responsive: true, displayModeBar: false });
  }, [isExpression, samples, tissueOrder, tissueColors, gene, highlightedTissue, showNames, lang, t, tTissue]);

  useEffect(() => {
    const div = ref.current;
    if (!div) return;
    const resize = () => Plotly.Plots.resize(div);
    const observer = new ResizeObserver(resize);
    observer.observe(div);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="panel umap-panel">
      <div className="umap-panel__head">
        <div className="eyebrow">{isExpression ? `${t("expressionSignalTitle")}${gene ? ` — ${gene.symbol}` : ""}` : t("tissueClustersTitle")}</div>
        <div className="umap-panel__controls">
          {!isExpression && (
            <button
              className="names-toggle"
              aria-pressed={showNames}
              onClick={() => setShowNames((v) => !v)}
              title={t("showTissueNamesHint")}
            >
              {t("showTissueNames")}
            </button>
          )}
          <InfoTip label={t("aboutPlot")}>
            <p>{t(isExpression ? "umapExpressionInfoP1" : "umapTissueInfoP1")}</p>
            <p>{t(isExpression ? "umapExpressionInfoP2" : "umapTissueInfoP2")}</p>
          </InfoTip>
        </div>
      </div>
      <div ref={ref} className="umap-plot" />
    </div>
  );
}
