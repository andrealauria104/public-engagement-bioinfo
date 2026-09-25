import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { STRINGS, TISSUE_IN, TISSUE_NAMES } from "./translations";
import { GENE_BLURBS } from "../data/geneBlurbs";

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

  const tTissueIn = useCallback(
    (tissueKey) => (TISSUE_IN[lang] || TISSUE_IN.en)[tissueKey] ?? tissueKey,
    [lang]
  );

  // Locale decimal separator: 11.31 in EN, 11,31 in IT/FR.
  const fmtNum = useCallback(
    (n, digits = 2) => new Intl.NumberFormat(lang, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n),
    [lang]
  );

  // Scores can be fractional (half credit): "7.5" in EN, "7,5" in IT/FR, "8" when whole.
  const fmtScore = useCallback((n) => new Intl.NumberFormat(lang, { maximumFractionDigits: 1 }).format(n), [lang]);

  const tGene = useCallback((symbol) => {
    const entry = GENE_BLURBS[symbol];
    return entry ? entry[lang] ?? entry.en : null;
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t, tTissue, tTissueIn, tGene, fmtNum, fmtScore }),
    [lang, setLang, t, tTissue, tTissueIn, tGene, fmtNum, fmtScore]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider");
  return ctx;
}
