import { useI18n } from "../i18n/LanguageContext";

export default function RoundSummary({ score, history, onRestart }) {
  const { t, tTissue } = useI18n();
  const total = history.length;
  const misses = history.filter((h) => !h.correct);

  return (
    <div className="panel round-summary">
      <div className="eyebrow">{t("playthroughComplete")}</div>
      <h2>{t("correctOutOf", { score, total })}</h2>
      <p className="round-summary__lede">{score === total ? t("fullHouse") : t("tissueSpecificMsg")}</p>

      {misses.length > 0 && (
        <div className="round-summary__misses">
          <div className="eyebrow" style={{ marginBottom: 8 }}>{t("toReview")}</div>
          <ul>
            {misses.map((m, i) => (
              <li key={i}>
                {t("missItem", {
                  symbol: m.gene.symbol,
                  tissue: tTissue(m.correctTissue),
                  dropped: tTissue(m.droppedTissue),
                })}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="restart-btn" onClick={onRestart}>
        {t("playAgain")}
      </button>
    </div>
  );
}
