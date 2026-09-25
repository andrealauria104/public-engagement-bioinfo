import { useI18n } from "../i18n/LanguageContext";

export default function Toast({ result, onNext }) {
  const { t, tTissue, tTissueIn, tGene, fmtNum } = useI18n();

  if (!result) return null;

  const { gene, correct, partial, correctTissue, droppedTissue, droppedMean, bestTissue, bestMean } = result;
  const outcome = correct ? "correct" : partial ? "partial" : "miss";
  const blurb = tGene(gene.symbol);

  let headline;
  let detail;
  if (correct) {
    headline = t("toastHeadlineCorrect", { symbol: gene.symbol, inTissue: tTissueIn(correctTissue) });
    detail = t("toastDetailCorrect", { inTissue: tTissueIn(correctTissue), value: fmtNum(droppedMean) });
  } else if (partial) {
    headline = t("toastHeadlinePartial", { symbol: gene.symbol, inTissue: tTissueIn(droppedTissue) });
    detail = t("toastDetailPartial", {
      inTissue: tTissueIn(droppedTissue),
      value: fmtNum(droppedMean),
      inCorrectTissue: tTissueIn(correctTissue),
      bestMean: fmtNum(bestMean),
    });
  } else {
    headline = t("toastHeadlineMiss", { symbol: gene.symbol, tissue: tTissue(droppedTissue) });
    detail = t("toastDetailMiss", {
      symbol: gene.symbol,
      inBestTissue: tTissueIn(bestTissue),
      bestMean: fmtNum(bestMean),
      correctTissue: tTissue(correctTissue),
    });
  }

  return (
    <div className={`toast toast--${outcome}`} role="status">
      <div className="toast__body">
        <div className="toast__headline mono">{headline}</div>
        <div className="toast__detail">{detail}</div>
        {blurb && <p className="toast__blurb">{blurb}</p>}
      </div>
      <button className="toast__next" onClick={onNext} autoFocus>
        {t("nextGene")}
      </button>
    </div>
  );
}
