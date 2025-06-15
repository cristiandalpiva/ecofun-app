
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function WeeklyChallenges() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-green-50">
      {/* HEADER SIMPLE */}
      <header className="bg-gradient-to-r from-blue-600 to-green-600 py-4 px-3 sm:px-8 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white font-fredoka tracking-tight">
          EcoFun
        </Link>
        <nav>
          <Link to="/" className="text-white text-sm font-semibold hover:text-green-200 transition-all px-3">Inicio</Link>
        </nav>
      </header>
      {/* CONTENIDO */}
      <main className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-700 mb-2 sparkle text-center">Retos Semanales</h1>
        <p className="text-base sm:text-xl text-green-900 mb-4 sm:mb-6 text-center max-w-2xl">
          ¡Conviértete en un héroe ecológico! Cada semana suma puntos completando pequeños retos que ayudan al planeta y descubre quién lidera la comunidad.
        </p>
        <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6 w-full max-w-xl mt-4 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 border-b pb-3">
            <div className="flex items-center gap-2">
              <img src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=60&q=80" className="rounded-xl w-10 h-10 object-cover" alt="Planta un árbol" />
              <span className="text-green-700 font-bold text-lg sm:text-xl">🌳 Planta un árbol</span>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">¡Lo logré!</button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 border-b pb-3">
            <div className="flex items-center gap-2">
              <img src="https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=60&q=80" className="rounded-xl w-10 h-10 object-cover" alt="Usa bici o camina" />
              <span className="text-blue-700 font-bold text-lg sm:text-xl">🚴‍♂️ Usa bici o camina</span>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">¡Ya cumplí!</button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <img src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=60&q=80" className="rounded-xl w-10 h-10 object-cover" alt="Separa la basura" />
              <span className="text-yellow-700 font-bold text-lg sm:text-xl">♻️ Separa la basura</span>
            </div>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors">¡Hecho!</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
