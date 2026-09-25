import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/LanguageContext";

const SLIDES = [
  { title: "intro1Title", body: "intro1Body" },
  { title: "intro2Title", body: "intro2Body", source: "intro2Source" },
  { title: "intro3Title", steps: ["intro3Step1", "intro3Step2", "intro3Step3", "intro3Step4"] },
];

export default function IntroScreen({ onStart }) {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  const primaryRef = useRef(null);
  const isLast = step === SLIDES.length - 1;
  const slide = SLIDES[step];

  // Keep focus on the primary button so Enter advances (kiosk keyboards).
  useEffect(() => {
    primaryRef.current?.focus();
  }, [step]);

  return (
    <div className="panel intro-screen">
      <div key={step} className="intro-screen__slide">
        <div className="eyebrow">{t("introStep", { step: step + 1, total: SLIDES.length })}</div>
        <h2>{t(slide.title)}</h2>
        {slide.steps ? (
          <ol className="intro-screen__body intro-steps">
            {slide.steps.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ol>
        ) : (
          <p className="intro-screen__body">{t(slide.body)}</p>
        )}
        {slide.source && <p className="intro-screen__source">{t(slide.source)}</p>}
      </div>

      <div className="intro-dots" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <span key={s.title} className="intro-dot" data-active={i === step} />
        ))}
      </div>

      <div className="intro-screen__actions">
        {isLast ? (
          <span />
        ) : (
          <button className="intro-skip" onClick={onStart}>
            {t("introSkip")}
          </button>
        )}
        <div className="intro-screen__nav">
          {step > 0 && (
            <button className="intro-back" onClick={() => setStep((s) => s - 1)}>
              {t("introBack")}
            </button>
          )}
          <button
            ref={primaryRef}
            className="restart-btn intro-primary"
            onClick={isLast ? onStart : () => setStep((s) => s + 1)}
          >
            {isLast ? t("startGame") : t("introNext")}
          </button>
        </div>
      </div>
    </div>
  );
}
