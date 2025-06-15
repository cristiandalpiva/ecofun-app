
import { useState, createContext, useContext } from "react";

const translations = {
  es: {
    "Juegos Educativos": "Juegos Educativos",
    "Explora nuestra colección de juegos para aprender sobre el planeta de forma divertida.": "Explora nuestra colección de juegos para aprender sobre el planeta de forma divertida.",
    "Retos Semanales": "Retos Semanales",
    "Participa en retos sostenibles y contribuye con la comunidad ecológica.": "Participa en retos sostenibles y contribuye con la comunidad ecológica.",
    "Contenido Educativo": "Contenido Educativo",
    "Lee artículos, mira videos y descubre consejos para cuidar el planeta.": "Lee artículos, mira videos y descubre consejos para cuidar el planeta.",
    "Consejos Diarios": "Consejos Diarios",
    "Descubre ideas simples para cuidar el medio ambiente cada día.": "Descubre ideas simples para cuidar el medio ambiente cada día.",
    // ... agrega más traducciones según necesidades ...
  },
  en: {
    "Juegos Educativos": "Educational Games",
    "Explora nuestra colección de juegos para aprender sobre el planeta de forma divertida.": "Explore our collection of games to learn about the planet in a fun way.",
    "Retos Semanales": "Weekly Challenges",
    "Participa en retos sostenibles y contribuye con la comunidad ecológica.": "Join sustainable challenges and help the eco community.",
    "Contenido Educativo": "Educational Content",
    "Lee artículos, mira videos y descubre consejos para cuidar el planeta.": "Read articles, watch videos and discover tips to care for the planet.",
    "Consejos Diarios": "Daily Tips",
    "Descubre ideas simples para cuidar el medio ambiente cada día.": "Find simple ideas to care for the environment every day.",
    // ... add more translations as needed ...
  },
};

type Lang = "es" | "en";

const TranslationContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "es", setLang: () => {} });

export function useTranslation() {
  const { lang } = useContext(TranslationContext);
  function t(text: string) {
    const tr = translations[lang][text];
    return tr ?? text;
  }
  return { t };
}

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (navigator.language.startsWith("es") ? "es" : "en"));
  return (
    <TranslationContext.Provider value={{ lang, setLang }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useLang() {
  const { lang, setLang } = useContext(TranslationContext);
  return { lang, setLang };
}
