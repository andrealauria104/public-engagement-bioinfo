import { useMemo } from "react";
import { useI18n } from "../i18n/LanguageContext";

// Flat, faceless "paper doll" figure -- front-facing, symmetrical, in the
// register of a science-museum wall infographic rather than a medical
// illustration. Organs are hand-drawn shapes (not generic ellipses) sized
// and spaced so nothing touches, even though several genuinely overlap in
// real anatomy at this scale (liver/pancreas/kidneys are offset beyond
// strict anatomical position for legibility -- a standard simplification
// in educational diagrams).

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

/* ---------------- body figure (non-interactive) ---------------- */

function BodyFigure() {
  return (
    <g className="body-figure">
      {/* legs */}
      <ellipse className="body-part" cx="185" cy="478" rx="27" ry="98" />
      <ellipse className="body-part" cx="115" cy="478" rx="27" ry="98" />
      <ellipse className="body-part" cx="188" cy="636" rx="21" ry="92" />
      <ellipse className="body-part" cx="112" cy="636" rx="21" ry="92" />
      <ellipse className="body-part" cx="188" cy="734" rx="25" ry="13" />
      <ellipse className="body-part" cx="112" cy="734" rx="25" ry="13" />

      {/* arms -- shoulder to hand, roughly hip-height reach */}
      <ellipse className="body-part" cx="241" cy="205" rx="22" ry="62" transform="rotate(8 241 205)" />
      <ellipse className="body-part" cx="59" cy="205" rx="22" ry="62" transform="rotate(-8 59 205)" />
      <ellipse className="body-part" cx="247" cy="322" rx="19" ry="62" transform="rotate(-6 247 322)" />
      <ellipse className="body-part" cx="53" cy="322" rx="19" ry="62" transform="rotate(6 53 322)" />
      <circle className="body-part" cx="243" cy="396" r="16" />
      <circle className="body-part" cx="57" cy="396" r="16" />

      {/* torso */}
      <path
        className="body-part"
        d="M60,150 C48,190 52,270 92,328 C98,340 98,362 93,380
           L207,380 C202,362 202,340 208,328 C248,270 252,190 240,150
           C218,130 190,140 150,140 C110,140 82,130 60,150 Z"
      />

      {/* neck + head */}
      <rect className="body-part" x="132" y="106" width="36" height="34" rx="10" />
      <circle className="body-part" cx="150" cy="70" r="47" />
    </g>
  );
}

/* ---------------- organ shapes ---------------- */

function Brain() {
  return (
    <g transform="translate(150 66)">
      <path d="M-31,-6 C-33,-22 -16,-30 0,-28 C16,-30 33,-22 31,-6 C34,6 26,22 8,24 C2,27 -2,27 -8,24 C-26,22 -34,6 -31,-6 Z" />
      <path className="organ-detail" d="M0,-24 C0,-14 -4,-6 0,4 C4,12 2,18 -4,22" />
      <path className="organ-detail" d="M-20,-14 C-14,-10 -14,-2 -20,4" />
      <path className="organ-detail" d="M20,-14 C14,-10 14,-2 20,4" />
    </g>
  );
}

function Thyroid() {
  return (
    <g transform="translate(150 122)">
      <path d="M-3,0 C-3,-9 -16,-9 -16,0 C-16,9 -3,9 -3,0 Z" />
      <path d="M3,0 C3,-9 16,-9 16,0 C16,9 3,9 3,0 Z" />
      <rect x="-3" y="-3" width="6" height="6" rx="2" />
    </g>
  );
}

function Lungs() {
  const lobe = "M0,-40 C-22,-36 -30,-8 -27,18 C-25,34 -12,42 2,38 C10,20 9,-10 0,-40 Z";
  return (
    <g>
      <path className="organ-detail" d="M150,108 L150,132 M150,132 C142,138 134,144 128,152 M150,132 C158,138 166,144 172,152" />
      <g transform="translate(120 196)">
        <path d={lobe} />
      </g>
      <g transform="translate(180 196) scale(-1 1)">
        <path d={lobe} />
      </g>
    </g>
  );
}

function Heart() {
  return (
    <g transform="translate(140 224)">
      <path d="M0,12 C-8,-8 -34,-14 -34,10 C-34,28 -14,42 0,56 C14,42 34,28 34,10 C34,-14 8,-8 0,12 Z" />
    </g>
  );
}

function Blood() {
  return (
    <g>
      <path className="organ-detail" d="M150,108 C170,116 182,132 184,152" />
      <g transform="translate(184 152)">
        <path d="M0,-14 C8,-2 14,7 14,14 A14,14 0 0 1 -14,14 C-14,7 -8,-2 0,-14 Z" />
      </g>
    </g>
  );
}

function Liver() {
  return (
    <g transform="translate(190 268)">
      <path d="M-36,-16 C-14,-30 22,-28 34,-12 C42,-1 40,15 24,23 C10,30 -6,28 -18,20 C-24,16 -22,10 -30,4 C-42,-4 -42,-11 -36,-16 Z" />
    </g>
  );
}

function Pancreas() {
  return (
    <g transform="translate(138 292) rotate(-10)">
      <path d="M-32,2 C-24,-8 -4,-11 12,-6 C26,-2 34,3 31,9 C24,15 4,15 -12,10 C-24,7 -34,7 -32,2 Z" />
    </g>
  );
}

function Kidneys() {
  const bean = "M0,-17 C11,-17 17,-6 15,3 C20,10 15,20 5,19 C-3,18 -8,10 -5,3 C-12,-3 -9,-15 0,-17 Z";
  return (
    <g>
      <g transform="translate(97 332)">
        <path d={bean} />
      </g>
      <g transform="translate(203 332) scale(-1 1)">
        <path d={bean} />
      </g>
    </g>
  );
}

function Adipose() {
  return (
    <g transform="translate(224 352)">
      <path
        className="organ-patch"
        d="M-26,4 C-33,-8 -18,-20 -4,-15 C2,-24 20,-21 21,-9 C32,-9 34,7 22,11 C21,20 3,22 -6,15 C-18,20 -31,15 -26,4 Z"
      />
    </g>
  );
}

function Muscle() {
  return (
    <g transform="translate(241 205)">
      <path d="M-20,-32 C-4,-40 18,-32 20,-10 C22,10 12,34 -6,36 C-18,28 -24,6 -22,-14 C-21,-22 -22,-28 -20,-32 Z" />
      <path className="organ-detail" d="M-10,-24 C-2,-14 -2,10 -10,24" />
    </g>
  );
}

const ORGANS = [
  { tissue: "Brain", label: "Brain", Shape: Brain, cx: 150, cy: 66, bx: 34, by: 30 },
  { tissue: "Thyroid", label: "Thyroid", Shape: Thyroid, cx: 150, cy: 122, bx: 18, by: 11 },
  { tissue: "Lung", label: "Lung", Shape: Lungs, cx: 150, cy: 196, bx: 62, by: 42, labelDy: 46 },
  { tissue: "Heart", label: "Heart", Shape: Heart, cx: 140, cy: 234, bx: 20, by: 32, labelDx: -46, labelDy: -8 },
  { tissue: "Blood", label: "Blood", Shape: Blood, cx: 184, cy: 152, bx: 16, by: 16 },
  { tissue: "Liver", label: "Liver", Shape: Liver, cx: 190, cy: 268, bx: 40, by: 24 },
  { tissue: "Pancreas", label: "Pancreas", Shape: Pancreas, cx: 138, cy: 292, bx: 34, by: 14 },
  { tissue: "Kidney", label: "Kidney", Shape: Kidneys, cx: 150, cy: 332, bx: 58, by: 20, labelDy: 24 },
  { tissue: "Adipose", label: "Adipose", Shape: Adipose, cx: 224, cy: 352, bx: 24, by: 22 },
  { tissue: "Muscle", label: "Muscle", Shape: Muscle, cx: 241, cy: 205, bx: 22, by: 34 },
];

export default function AnatomyStage({ hoveredTissue, resultState, onOrganActivate, onOrganHover, disabled }) {
  const { t, tTissue } = useI18n();

  return (
    <div className="anatomy-stage" aria-label={t("tissueMapAria")}>
      <svg viewBox="0 0 300 772" className="anatomy-svg" role="group">
        {/* Widen the whole figure ~12% horizontally about the body's central
            axis (x=150) -- torso/limbs read as slightly broader and organs
            gain a bit more lateral breathing room. */}
        <g transform="translate(150 0) scale(1.12 1) translate(-150 0)">
        <BodyFigure />

        {ORGANS.map((organ) => {
          const { Shape } = organ;
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
              <Shape />
              {isCorrectHit && (
                <>
                  <circle cx={organ.cx} cy={organ.cy} r={Math.max(organ.bx, organ.by) + 4} className="success-ring" />
                  <SignalDots cx={organ.cx} cy={organ.cy} rx={organ.bx + 6} ry={organ.by + 6} count={dotCount} seed={organ.tissue} />
                </>
              )}
              <text
                x={organ.cx + (organ.labelDx ?? 0)}
                y={organ.cy + organ.by + (organ.labelDy ?? 16)}
                className="organ-label mono"
              >
                {label}
              </text>
            </g>
          );
        })}
        </g>
      </svg>
    </div>
  );
}

export { ORGANS };
