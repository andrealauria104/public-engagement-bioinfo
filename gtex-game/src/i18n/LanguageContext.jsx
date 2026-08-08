import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { STRINGS, TISSUE_NAMES } from "./translations";

const LanguageContext = createContext(null);

function format(str, vars) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? vars[key] : match));
}

function detectInitialLanguage() {
  const stored = typeof window !== "undefined" ? window.localStorage.getItem("signal-match-lang") : null;
  if (stored && STRINGS[stored]) return stored;
  const nav = typeof navigator !== "undefined" ? navigator.language?.slice(0, 2) : "en";
  return STRINGS[nav] ? nav : "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLanguage);

  const setLang = useCallback((next) => {
    if (!STRINGS[next]) return;
    setLangState(next);
    window.localStorage.setItem("signal-match-lang", next);
  }, []);

  const t = useCallback(
    (key, vars) => {
      const dict = STRINGS[lang] || STRINGS.en;
      const str = dict[key] ?? STRINGS.en[key] ?? key;
      return format(str, vars);
    },
    [lang]
  );

  const tTissue = useCallback(
    (tissueKey) => {
      const dict = TISSUE_NAMES[lang] || TISSUE_NAMES.en;
      return dict[tissueKey] ?? tissueKey;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t, tTissue }), [lang, setLang, t, tTissue]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider");
  return ctx;
}
