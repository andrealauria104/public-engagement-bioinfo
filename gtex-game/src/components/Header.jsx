import { useState } from "react";
import { useI18n } from "../i18n/LanguageContext";
import { LANGUAGES } from "../i18n/translations";

export default function Header({ roundNumber, roundLength, score, phase, muted, onToggleMuted }) {
  const [showInfo, setShowInfo] = useState(false);
  const { lang, setLang, t } = useI18n();

  return (
    <header className="app-header">
      <div className="app-header__title">
        <h1>{t("appTitle")}</h1>
        <span className="app-header__sub mono">{t("appSubtitle")}</span>
      </div>

      <div className="app-header__status mono" aria-live="polite">
        {phase === "playing" ? (
          <>
            <span>{t("round", { round: roundNumber, total: roundLength })}</span>
            <span className="app-header__dot" aria-hidden="true">·</span>
            <span>{t("score", { score })}</span>
          </>
        ) : (
          <span>{t("finalScore", { score, total: roundLength })}</span>
        )}
      </div>

      <div className="lang-switch" role="group" aria-label={t("languageLabel")}>
        {LANGUAGES.map(({ code, label }) => (
          <button
            key={code}
            className="lang-switch__btn"
            aria-pressed={lang === code}
            onClick={() => setLang(code)}
          >
            {label}
          </button>
        ))}
      </div>

      <button className="mute-btn" aria-pressed={muted} onClick={onToggleMuted} title={t(muted ? "unmuteSound" : "muteSound")}>
        {muted ? "🔇" : "🔊"}
        <span className="sr-only">{t(muted ? "unmuteSound" : "muteSound")}</span>
      </button>

      <button className="info-btn" aria-expanded={showInfo} onClick={() => setShowInfo((v) => !v)}>
        ?
        <span className="sr-only">{t("howToPlay")}</span>
      </button>

      {showInfo && (
        <div className="info-popover" role="note">
          <p>{t("infoP1")}</p>
          <p>{t("infoP2")}</p>
        </div>
      )}
    </header>
  );
}
