import React, { createContext, useContext } from "react";
import { useLanguage as useBaseLanguage, LanguageProvider } from "../LanguageContext";
import { NexaThemeProvider } from "./NexaThemeContext";

import en from "./locales/en.json";
import ar from "./locales/ar.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import nl from "./locales/nl.json";
import it from "./locales/it.json";
import tr from "./locales/tr.json";
import ru from "./locales/ru.json";
import uk from "./locales/uk.json";
import ro from "./locales/ro.json";
import pl from "./locales/pl.json";

const nexaliveTranslations: Record<string, Record<string, string>> = {
  en, ar, fr, de, nl, it, tr, ru, uk, ro, pl
};

type NexaLiveLanguageContextType = ReturnType<typeof useBaseLanguage>;

const NexaLiveLanguageContext = createContext<NexaLiveLanguageContextType | undefined>(undefined);

function NexaLiveLanguageProviderInner({ children }: { children: React.ReactNode }) {
  const baseContext = useBaseLanguage();
  
  const t = (key: string) => {
    // Check if it's a NexaLive specific key
    if (nexaliveTranslations[baseContext.language] && nexaliveTranslations[baseContext.language][key]) {
      return nexaliveTranslations[baseContext.language][key];
    }
    // Fallback to English NexaLive
    if (nexaliveTranslations.en[key]) {
      return nexaliveTranslations.en[key];
    }
    // Fallback to base translations
    return baseContext.t(key);
  };

  return (
    <NexaLiveLanguageContext.Provider value={{ ...baseContext, t }}>
      {children}
    </NexaLiveLanguageContext.Provider>
  );
}

export function NexaLiveLanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <NexaThemeProvider>
        <NexaLiveLanguageProviderInner>
          {children}
        </NexaLiveLanguageProviderInner>
      </NexaThemeProvider>
    </LanguageProvider>
  );
}

export function useNexaLanguage() {
  const context = useContext(NexaLiveLanguageContext);
  if (context === undefined) {
    return useBaseLanguage(); // Fallback to base if not wrapped
  }
  return context;
}
