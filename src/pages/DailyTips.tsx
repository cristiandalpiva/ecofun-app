
import Footer from "@/components/Footer";
import { useTranslation } from "@/trans";
const DailyTips = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-cyan-50">
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-3xl font-bold text-emerald-700 mb-4">{t("Consejos Diarios")}</h1>
        <p className="text-gray-700">{t("Descubre ideas simples para cuidar el medio ambiente cada día.")}</p>
      </main>
      <Footer />
    </div>
  );
};
export default DailyTips;
