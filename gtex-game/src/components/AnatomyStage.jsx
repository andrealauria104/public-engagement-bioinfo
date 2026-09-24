import { useMemo } from "react";
import { useI18n } from "../i18n/LanguageContext";

import { ORGAN_LAYOUT, VIEW_H, VIEW_W } from "./anatomyLayout";
import skeletonImg from "../assets/organs/skeleton.png";
import brainImg from "../assets/organs/brain.png";
import thyroidImg from "../assets/organs/thyroid.png";
import lungImg from "../assets/organs/lung.png";
import heartImg from "../assets/organs/heart.png";
import bloodImg from "../assets/organs/blood.png";
import liverImg from "../assets/organs/liver.png";
import pancreasImg from "../assets/organs/pancreas.png";
import kidneyImg from "../assets/organs/kidney.png";
import adiposeImg from "../assets/organs/adipose.png";
import muscleImg from "../assets/organs/muscle.png";

// Flat illustrated organs laid over a cartoon skeleton, in the register of a
// science-museum wall infographic. The artwork stays full colour; game state
// (hover, correct, miss, hint) is shown on a halo ellipse behind each organ,
// which is also the click target. Placement lives in anatomyLayout.js.
// Masters: assets-src/body_organs/ (see README).

const ORGAN_IMAGES = {
  Brain: brainImg,
  Thyroid: thyroidImg,
  Lung: lungImg,
  Heart: heartImg,
  Blood: bloodImg,
  Liver: liverImg,
  Pancreas: pancreasImg,
  Kidney: kidneyImg,
  Adipose: adiposeImg,
  Muscle: muscleImg,
};

const HALO_PAD = 3;

const ORGANS = ORGAN_LAYOUT.map((o) => ({
  ...o,
  src: ORGAN_IMAGES[o.tissue],
  cx: o.x + o.w / 2,
  cy: o.y + o.h / 2,
  bx: o.w / 2 + HALO_PAD,
  by: o.h / 2 + HALO_PAD,
}));

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return h;
}

function SignalDots({ cx, cy, rx, ry, count, seed }) {
  const rng = useMemo(() => mulberry32(seedFromString(seed)), [seed]);
  const dots = useMemo(
    () =>
      Array.from({ length: count }, () => {
        const a = rng() * Math.PI * 2;
        const r = Math.sqrt(rng());
        return {
          x: cx + Math.cos(a) * rx * r,
          y: cy + Math.sin(a) * ry * r,
          d: 1.4 + rng() * 1.8,
          delay: rng() * 0.4,
        };
      }),
    [rng, count, cx, cy, rx, ry]
  );
  return (
    <g className="signal-dots">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.d} className="signal-dot" style={{ animationDelay: `${d.delay}s` }} />
      ))}
    </g>
  );
}

export default function AnatomyStage({ hoveredTissue, resultState, onOrganActivate, onOrganHover, disabled, tissueColors }) {
  const { t, tTissue } = useI18n();

  return (
    <div className="anatomy-stage" aria-label={t("tissueMapAria")}>
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="anatomy-svg" role="group">
        <image href={skeletonImg} x="0" y="0" width={VIEW_W} height={VIEW_H} className="body-figure" />

        {ORGANS.map((organ) => {
          const label = tTissue(organ.tissue);
          const isHovered = hoveredTissue === organ.tissue;
          const isCorrectHit = resultState?.status === "correct" && resultState.tissue === organ.tissue;
          const isHint = resultState && resultState.hintTissue === organ.tissue && !isCorrectHit;
          const isMiss = resultState?.status === "incorrect" && resultState.tissue === organ.tissue;

          const className = [
            "organ-hotspot",
            isHovered ? "is-hovered" : "",
            isCorrectHit ? "is-correct" : "",
            isHint ? "is-hint" : "",
            isMiss ? "is-miss" : "",
          ]
            .filter(Boolean)
            .join(" ");

          const dotCount = isCorrectHit ? Math.round(5 + (resultState.intensity ?? 0) * 26) : 0;

          return (
            <g
              key={organ.tissue}
              className={className}
              data-tissue={organ.tissue}
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-label={t("placeGeneAria", { label })}
              onClick={() => !disabled && onOrganActivate(organ.tissue)}
              onKeyDown={(e) => {
                if (disabled) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOrganActivate(organ.tissue);
                }
              }}
              onPointerEnter={() => onOrganHover?.(organ.tissue)}
              onPointerLeave={() => onOrganHover?.(null)}
              onFocus={() => onOrganHover?.(organ.tissue)}
              onBlur={() => onOrganHover?.(null)}
            >
              <ellipse cx={organ.cx} cy={organ.cy} rx={organ.bx} ry={organ.by} className="organ-halo" />
              <image href={organ.src} x={organ.x} y={organ.y} width={organ.w} height={organ.h} className="organ-img" />
              {isCorrectHit && (
                <>
                  <circle cx={organ.cx} cy={organ.cy} r={Math.max(organ.bx, organ.by) + 4} className="success-ring" />
                  <SignalDots cx={organ.cx} cy={organ.cy} rx={organ.bx + 6} ry={organ.by + 6} count={dotCount} seed={organ.tissue} />
                </>
              )}
              <text
                x={organ.lx ?? organ.cx}
                y={organ.ly ?? organ.y + organ.h + 12}
                textAnchor={organ.anchor ?? "middle"}
                className="organ-label mono"
              >
                {/* Tissue-colour key dot: ties the label to the UMAP legend colour. */}
                {tissueColors?.[organ.tissue] && (
                  <tspan className="organ-label-dot" style={{ fill: tissueColors[organ.tissue] }}>
                    {"● "}
                  </tspan>
                )}
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export { ORGANS };
