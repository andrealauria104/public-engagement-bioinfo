import { useI18n } from "../i18n/LanguageContext";

export default function RoundSummary({ score, history, onRestart }) {
  const { t, tTissue, tTissueIn, fmtScore } = useI18n();
  const total = history.length;
  const misses = history.filter((h) => !h.correct && !h.partial);
  const closeCalls = history.filter((h) => h.partial);

  return (
    <div className="panel round-summary">
      <div className="eyebrow">{t("playthroughComplete")}</div>
      <h2>{t("correctOutOf", { score: fmtScore(score), total })}</h2>
      <p className="round-summary__lede">{score === total ? t("fullHouse") : t("tissueSpecificMsg")}</p>

      {closeCalls.length > 0 && (
        <div className="round-summary__misses">
          <div className="eyebrow" style={{ marginBottom: 8 }}>{t("closeCalls")}</div>
          <ul>
            {closeCalls.map((m, i) => (
              <li key={i}>
                {t("closeItem", {
                  symbol: m.gene.symbol,
                  inTissue: tTissueIn(m.correctTissue),
                  inDropped: tTissueIn(m.droppedTissue),
                })}
              </li>
            ))}
          </ul>
        </div>
      )}

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
