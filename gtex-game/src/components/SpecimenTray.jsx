import { useState } from "react";
import { useI18n } from "../i18n/LanguageContext";
import InfoTip from "./InfoTip";

export default function SpecimenTray({ gene, stats, onPointerDownCard, disabled, roundNumber, roundLength, canReveal }) {
  const [open, setOpen] = useState(false);
  const { t, tTissue } = useI18n();

  if (!gene || !stats) return null;

  const sorted = [...stats.byTissue].sort((a, b) => b.mean - a.mean).slice(0, 5);
  const maxMean = sorted[0]?.mean || 1;

  return (
    <div className="panel specimen-tray">
      <div className="eyebrow">{t("geneLabel", { round: roundNumber, total: roundLength })}</div>

      <div className="gene-card" onPointerDown={(e) => !disabled && onPointerDownCard(e, gene)}>
        <span className="gene-card__grip" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <div className="gene-card__body">
          <div className="gene-card__symbol mono">{gene.symbol}</div>
          <div className="gene-card__name">{gene.name}</div>
        </div>
      </div>

      <div className="hint">{t("dragHint")}</div>

      <div className="reveal">
        <div className="reveal__head">
          <button
            className="reveal-toggle"
            disabled={!canReveal}
            aria-expanded={open}
            onClick={() => canReveal && setOpen((v) => !v)}
          >
            <span>{t("signalPreview")}</span>
            <span className="reveal-toggle__chevron" aria-hidden="true">▸</span>
          </button>
          <InfoTip label={t("aboutPlot")}>
            <p>{t("signalPreviewInfo")}</p>
          </InfoTip>
        </div>

        {!canReveal && <div className="reveal-hint">{t("revealHint")}</div>}

        {canReveal && open && (
          <div>
            {sorted.map(({ tissue, mean }) => (
              <div className="spark-row" key={tissue}>
                <span className="spark-row__label mono">{tTissue(tissue)}</span>
                <span className="spark-row__track">
                  <span className="spark-row__fill" style={{ width: `${(mean / maxMean) * 100}%` }} />
                </span>
                <span className="spark-row__value mono">{mean.toFixed(1)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <img className="tray-logo" src={`${import.meta.env.BASE_URL}logo-unito.png`} alt="Università di Torino" />
    </div>
  );
}
