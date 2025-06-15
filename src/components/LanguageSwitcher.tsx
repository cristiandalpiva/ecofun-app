
import { useLang } from "@/trans";

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="fixed top-2 right-4 z-50 flex items-center space-x-2 bg-white/90 rounded px-2 py-1 shadow border border-emerald-200">
      <button
        className={`font-bold px-2 py-1 rounded ${lang === "es" ? "text-emerald-700 bg-emerald-50" : "text-gray-400"}`}
        aria-label="Español"
        onClick={() => setLang("es")}
      >
        ES
      </button>
      <span>|</span>
      <button
        className={`font-bold px-2 py-1 rounded ${lang === "en" ? "text-emerald-700 bg-emerald-50" : "text-gray-400"}`}
        aria-label="English"
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}
