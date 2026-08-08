import { useI18n } from "../i18n/LanguageContext";

export default function Toast({ result, onNext }) {
  const { t, tTissue } = useI18n();

  if (!result) return null;

  const { gene, correct, correctTissue, droppedTissue, droppedMean, bestTissue, bestMean } = result;

  return (
    <div className={"toast" + (correct ? " toast--correct" : " toast--miss")} role="status">
      <div className="toast__body">
        <div className="toast__headline mono">
          {correct
            ? t("toastHeadlineCorrect", { symbol: gene.symbol, tissue: tTissue(correctTissue) })
            : t("toastHeadlineMiss", { symbol: gene.symbol, tissue: tTissue(droppedTissue) })}
        </div>
        <div className="toast__detail">
          {correct
            ? t("toastDetailCorrect", { tissue: tTissue(correctTissue), value: droppedMean.toFixed(2) })
            : t("toastDetailMiss", {
                symbol: gene.symbol,
                bestTissue: tTissue(bestTissue),
                bestMean: bestMean.toFixed(2),
                correctTissue: tTissue(correctTissue),
              })}
        </div>
      </div>
      <button className="toast__next" onClick={onNext} autoFocus>
        {t("nextGene")}
      </button>
    </div>
  );
}
