import { useCallback, useMemo, useState } from "react";
import { bestTissueFor, meanByTissue } from "../data/generateData";

function shuffle(arr, rng = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function dealRound(tissueOrder, genesByTissue) {
  return shuffle(tissueOrder).map((tissue) => {
    const pool = genesByTissue[tissue];
    return pool[Math.floor(Math.random() * pool.length)];
  });
}

const ROUND_LENGTH = 10;

export function useGameState({ genes, samples, tissueOrder }) {
  const genesByTissue = useMemo(() => {
    const map = {};
    tissueOrder.forEach((t) => (map[t] = []));
    genes.forEach((g) => map[g.tissue].push(g));
    return map;
  }, [genes, tissueOrder]);

  const [deck, setDeck] = useState(() => dealRound(tissueOrder, genesByTissue));
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [phase, setPhase] = useState("playing"); // "playing" | "summary"

  const currentGene = deck[roundIndex] ?? null;

  const currentGeneStats = useMemo(() => {
    if (!currentGene) return null;
    const byTissue = meanByTissue(currentGene, samples, tissueOrder);
    const best = bestTissueFor(currentGene, samples, tissueOrder);
    return { byTissue, best };
  }, [currentGene, samples, tissueOrder]);

  const submitDrop = useCallback(
    (droppedTissue) => {
      if (!currentGene || phase !== "playing") return null;
      const stats = meanByTissue(currentGene, samples, tissueOrder);
      const best = stats.reduce((a, b) => (b.mean > a.mean ? b : a));
      const correct = droppedTissue === currentGene.tissue;
      const droppedMean = stats.find((s) => s.tissue === droppedTissue)?.mean ?? 0;

      const result = {
        gene: currentGene,
        droppedTissue,
        correctTissue: currentGene.tissue,
        correct,
        droppedMean,
        bestTissue: best.tissue,
        bestMean: best.mean,
      };

      setLastResult(result);
      setHistory((h) => [...h, result]);
      if (correct) setScore((s) => s + 1);

      return result;
    },
    [currentGene, phase, samples, tissueOrder]
  );

  const nextRound = useCallback(() => {
    setLastResult(null);
    setRoundIndex((idx) => {
      const next = idx + 1;
      if (next >= ROUND_LENGTH) {
        setPhase("summary");
        return idx;
      }
      return next;
    });
  }, []);

  const restart = useCallback(() => {
    setDeck(dealRound(tissueOrder, genesByTissue));
    setRoundIndex(0);
    setScore(0);
    setHistory([]);
    setLastResult(null);
    setPhase("playing");
  }, [tissueOrder, genesByTissue]);

  return {
    currentGene,
    currentGeneStats,
    roundNumber: roundIndex + 1,
    roundLength: ROUND_LENGTH,
    score,
    history,
    lastResult,
    phase,
    submitDrop,
    nextRound,
    restart,
  };
}
