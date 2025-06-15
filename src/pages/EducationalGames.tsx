
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function EducationalGames() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-blue-50">
      {/* HEADER SIMPLE */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 py-4 px-4 sm:px-8 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white font-fredoka tracking-tight">
          EcoFun
        </Link>
        <nav>
          <Link to="/" className="text-white text-sm font-semibold hover:text-yellow-200 transition-all px-3">Inicio</Link>
        </nav>
      </header>
      {/* CONTENIDO */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-2 sparkle">Juegos Educativos</h1>
        <p className="text-lg sm:text-xl text-blue-900 mb-6 text-center max-w-2xl">
          Explora nuestros juegos diseñados para aprender, divertirse y cuidar el planeta. ¡Desafía tus conocimientos ambientales con actividades interactivas!
        </p>
        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <div className="rounded-xl shadow-md bg-white p-4 flex flex-col items-center hover:scale-105 transition animate-scale-in">
            <img src="/placeholder.svg" className="w-20 h-20 mb-2 rounded-full wiggle" alt="Juego 1" />
            <h2 className="font-bold text-lg text-green-700 mb-1">EcoTetris</h2>
            <p className="text-sm text-gray-600 text-center mb-2">¡Pon a prueba tu agilidad mientras aprendes sobre reciclaje!</p>
            <Link to="/games" className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold">Jugar</Link>
          </div>
          <div className="rounded-xl shadow-md bg-white p-4 flex flex-col items-center hover:scale-105 transition animate-scale-in">
            <img src="/placeholder.svg" className="w-20 h-20 mb-2 rounded-full wiggle" alt="Juego 2" />
            <h2 className="font-bold text-lg text-green-700 mb-1">Aventura Submarina</h2>
            <p className="text-sm text-gray-600 text-center mb-2">¡Descubre los secretos del océano cuidando el ecosistema marino!</p>
            <Link to="/games" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">Jugar</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

