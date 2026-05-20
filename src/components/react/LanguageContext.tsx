import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ar" | "ru" | "uk" | "ro" | "pl" | "it" | "tr" | "fr" | "de" | "nl";
export type SiteId = "texafab" | "fincore" | "dubai-stroy" | "nextrev" | "exchange";

export const languageNames: Record<Language, string> = {
  en: "English",
  ar: "العربية",
  fr: "Français",
  de: "Deutsch",
  nl: "Nederlands",
  it: "Italiano",
  tr: "Türkçe",
  ru: "Русский",
  uk: "Українська",
  ro: "Română",
  pl: "Polski",
};

export const rtlLanguages: Language[] = ["ar"];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  isRTL: boolean;
  siteId: SiteId;
  setSiteId: (id: SiteId) => void;
}

// Language context with default fallback support
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

import en from "../../locales/en.json";
import ar from "../../locales/ar.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";
import nl from "../../locales/nl.json";
import it from "../../locales/it.json";
import tr from "../../locales/tr.json";
import ru from "../../locales/ru.json";
import uk from "../../locales/uk.json";
import ro from "../../locales/ro.json";
import pl from "../../locales/pl.json";

const translations: Record<Language, Record<string, string>> = {
  en, ar, fr, de, nl, it, tr, ru, uk, ro, pl
};

const LANGUAGE_STORAGE_KEY = "texacore-language";
const SITE_STORAGE_KEY = "texacore-site";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved && Object.keys(languageNames).includes(saved)) {
        return saved as Language;
      }
    }
    return "en";
  });
  
  const [siteId, setSiteIdState] = useState<SiteId>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(SITE_STORAGE_KEY);
      if (saved && ["texafab", "fincore", "dubai-stroy", "nextrev", "exchange"].includes(saved)) {
        return saved as SiteId;
      }
    }
    return "texafab";
  });

  const dir = rtlLanguages.includes(language) ? "rtl" : "ltr";

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  };

  const toggleLanguage = () => {
    const langs = Object.keys(languageNames) as Language[];
    const currentIndex = langs.indexOf(language);
    const nextIndex = (currentIndex + 1) % langs.length;
    setLanguage(langs[nextIndex]);
  };

  // Apply RTL/LTR direction immediately on mount and on changes
  useEffect(() => {
    // Apply to document root
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    document.documentElement.setAttribute("dir", dir);
    
    // Also apply to body for better RTL support
    document.body.dir = dir;
    document.body.setAttribute("dir", dir);
    document.body.style.direction = dir;
    document.body.style.textAlign = dir === "rtl" ? "right" : "left";
    
    // Add class for CSS targeting
    if (dir === "rtl") {
      document.documentElement.classList.add("rtl");
      document.documentElement.classList.remove("ltr");
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.documentElement.classList.add("ltr");
      document.documentElement.classList.remove("rtl");
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }, [dir, language]);

  const t = (key: string) => {
    return translations[language][key] || translations.en[key] || key;
  };
  
  const setSiteId = (id: SiteId) => {
    setSiteIdState(id);
    if (typeof window !== "undefined") {
      localStorage.setItem(SITE_STORAGE_KEY, id);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, dir, isRTL: dir === "rtl", siteId, setSiteId }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Return default values when outside provider (for storyboards and isolated rendering)
    return {
      language: "en" as Language,
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (key: string) => translations.en[key] || key,
      dir: "ltr" as const,
      isRTL: false,
      siteId: "texafab" as SiteId,
      setSiteId: () => {},
    };
  }
  return context;
}
