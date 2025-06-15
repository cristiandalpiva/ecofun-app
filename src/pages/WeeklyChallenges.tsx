
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function WeeklyChallenges() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-green-50">
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
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-2 sparkle">Retos Semanales</h1>
        <p className="text-lg sm:text-xl text-green-900 mb-6 text-center max-w-2xl">
          ¡Conviértete en un héroe ecológico! Cada semana suma puntos completando pequeños retos que ayudan al planeta y descubre quién lidera la comunidad.
        </p>
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl mt-4 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <span className="text-green-700 font-bold text-xl mb-2 sm:mb-0">🌳 Planta un árbol</span>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">¡Lo logré!</button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <span className="text-blue-700 font-bold text-xl mb-2 sm:mb-0">🚴‍♂️ Usa bici o camina</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">¡Ya cumplí!</button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <span className="text-yellow-700 font-bold text-xl mb-2 sm:mb-0">♻️ Separa la basura</span>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors">¡Hecho!</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
