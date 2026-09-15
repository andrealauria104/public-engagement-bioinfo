import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { loadRealGtexData } from "./data/loadRealData";
import { useGameState } from "./hooks/useGameState";
import { playCorrectSound, playIncorrectSound } from "./audio/sfx";
import Header from "./components/Header";
import SpecimenTray from "./components/SpecimenTray";
import AnatomyStage from "./components/AnatomyStage";
import UmapReadout from "./components/UmapReadout";
import Toast from "./components/Toast";
import RoundSummary from "./components/RoundSummary";
import DragGhost from "./components/DragGhost";

const DATA = loadRealGtexData();
const MAX_SIGNAL = Math.max(...DATA.genes.map((g) => Math.max(...g.data)));
const MUTE_STORAGE_KEY = "signal-match-muted";

export default function App() {
  const { samples, genes, tissueColors, tissueOrder } = DATA;

  const game = useGameState({ genes, samples, tissueOrder });
  const { currentGene, currentGeneStats, roundNumber, roundLength, score, history, lastResult, phase, submitDrop, nextRound, restart } = game;

  const [drag, setDrag] = useState(null); // { gene, x, y }
  const [hoveredTissue, setHoveredTissue] = useState(null);
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem(MUTE_STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const draggingRef = useRef(false);

  useEffect(() => {
    try {
      localStorage.setItem(MUTE_STORAGE_KEY, muted ? "1" : "0");
    } catch {
      // ignore (private browsing / storage disabled)
    }
  }, [muted]);

  const handleDrop = useCallback(
    (tissue) => {
      if (!currentGene || lastResult) return;
      const result = submitDrop(tissue);
      if (!result) return;
      setHoveredTissue(null);
      if (!muted) {
        if (result.correct) playCorrectSound();
        else playIncorrectSound();
      }
    },
    [currentGene, lastResult, submitDrop, muted]
  );

  const onPointerDownCard = useCallback(
    (e, gene) => {
      if (lastResult) return;
      draggingRef.current = true;
      setDrag({ gene, x: e.clientX, y: e.clientY });

      const onMove = (ev) => {
        if (!draggingRef.current) return;
        setDrag((d) => (d ? { ...d, x: ev.clientX, y: ev.clientY } : d));
        const el = document.elementFromPoint(ev.clientX, ev.clientY);
        const organEl = el?.closest("[data-tissue]");
        setHoveredTissue(organEl?.getAttribute("data-tissue") ?? null);
      };

      const onUp = (ev) => {
        draggingRef.current = false;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        const el = document.elementFromPoint(ev.clientX, ev.clientY);
        const organEl = el?.closest("[data-tissue]");
        const tissue = organEl?.getAttribute("data-tissue");
        setDrag(null);
        setHoveredTissue(null);
        if (tissue) handleDrop(tissue);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [handleDrop, lastResult]
  );

  const handleOrganHover = useCallback((tissue) => {
    if (!draggingRef.current) setHoveredTissue(tissue);
  }, []);

  const resultState = useMemo(() => {
    if (!lastResult) return null;
    const hintTissue = lastResult.correct ? lastResult.correctTissue : lastResult.bestTissue;
    const intensity = lastResult.correct ? lastResult.droppedMean / MAX_SIGNAL : 0;
    return {
      status: lastResult.correct ? "correct" : "incorrect",
      tissue: lastResult.droppedTissue,
      hintTissue,
      intensity,
    };
  }, [lastResult]);

  return (
    <div className="app">
      <Header roundNumber={roundNumber} roundLength={roundLength} score={score} phase={phase} muted={muted} onToggleMuted={() => setMuted((m) => !m)} />

      <main className="app-main">
        {phase === "playing" ? (
          <>
            <SpecimenTray
              key={currentGene?.symbol}
              gene={currentGene}
              stats={currentGeneStats}
              onPointerDownCard={onPointerDownCard}
              disabled={!!lastResult}
              roundNumber={roundNumber}
              roundLength={roundLength}
              correctSoFar={!!lastResult?.correct}
            />

            <AnatomyStage
              hoveredTissue={hoveredTissue}
              resultState={resultState}
              onOrganActivate={handleDrop}
              onOrganHover={handleOrganHover}
              disabled={!!lastResult}
            />

            <UmapReadout
              mode="tissue"
              samples={samples}
              tissueOrder={tissueOrder}
              tissueColors={tissueColors}
              gene={currentGene}
              highlightedTissue={hoveredTissue}
            />
            <UmapReadout mode="expression" samples={samples} tissueOrder={tissueOrder} tissueColors={tissueColors} gene={currentGene} />
          </>
        ) : (
          <RoundSummary score={score} history={history} onRestart={restart} />
        )}
      </main>

      {lastResult && phase === "playing" && <Toast result={lastResult} onNext={nextRound} />}
      <DragGhost gene={drag?.gene} x={drag?.x ?? 0} y={drag?.y ?? 0} />
    </div>
  );
}
