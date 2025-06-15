
import Footer from "@/components/Footer";
import { useTranslation } from "@/trans";
const EducationalContent = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-cyan-50">
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-3xl font-bold text-emerald-700 mb-4">{t("Contenido Educativo")}</h1>
        <p className="text-gray-700">{t("Lee artículos, mira videos y descubre consejos para cuidar el planeta.")}</p>
      </main>
      <Footer />
    </div>
  );
};
export default EducationalContent;
