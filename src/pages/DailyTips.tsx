
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function DailyTips() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-green-100">
      {/* HEADER SIMPLE */}
      <header className="bg-gradient-to-r from-blue-600 to-green-600 py-4 px-4 sm:px-8 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white font-fredoka tracking-tight">
          EcoFun
        </Link>
        <nav>
          <Link to="/" className="text-white text-sm font-semibold hover:text-green-200 transition-all px-3">Inicio</Link>
        </nav>
      </header>
      {/* CONTENIDO */}
      <main className="flex-1 flex flex-col items-center justify-center px-2 py-6 sm:px-4 sm:py-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-700 mb-2 sparkle text-center">Consejos Diarios</h1>
        <p className="text-base sm:text-xl text-green-900 mb-4 sm:mb-6 text-center max-w-xl">
          Acciones pequeñas logran grandes cambios para el planeta. ¡Súmate a estos tips diarios y comparte tu impacto!
        </p>
        <ul className="w-full max-w-md space-y-4 mt-4">
          <li className="bg-white rounded-lg shadow flex items-center gap-3 p-4">
            <img src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=60&q=80"
              alt="Apaga la luz"
              className="w-9 h-9 sm:w-12 sm:h-12 object-cover rounded-full"
            />
            <span className="text-green-700 text-base sm:text-lg font-bold">🌱</span>
            <span className="flex-1 text-sm sm:text-base">Apaga la luz cuando salgas de una habitación.</span>
          </li>
          <li className="bg-white rounded-lg shadow flex items-center gap-3 p-4">
            <img src="https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=60&q=80"
              alt="Ducha rápida"
              className="w-9 h-9 sm:w-12 sm:h-12 object-cover rounded-full"
            />
            <span className="text-blue-700 text-base sm:text-lg font-bold">🛁</span>
            <span className="flex-1 text-sm sm:text-base">Dúchate en menos de 5 minutos para ahorrar agua.</span>
          </li>
          <li className="bg-white rounded-lg shadow flex items-center gap-3 p-4">
            <img src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=60&q=80"
              alt="Botella reutilizable"
              className="w-9 h-9 sm:w-12 sm:h-12 object-cover rounded-full"
            />
            <span className="text-yellow-700 text-base sm:text-lg font-bold">🥤</span>
            <span className="flex-1 text-sm sm:text-base">Usa una botella reutilizable en vez de plásticos descartables.</span>
          </li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}
