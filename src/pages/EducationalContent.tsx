
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function EducationalContent() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-100 to-blue-100">
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
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-2 sparkle">Contenido Educativo</h1>
        <p className="text-lg sm:text-xl text-blue-900 mb-6 text-center max-w-2xl">
          Descubre artículos, videos y curiosidades sobre cómo cuidar el planeta. ¡Aprende y comparte nuevos hábitos ecológicos!
        </p>
        <section className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <div className="rounded-xl shadow-md bg-white p-4 flex flex-col items-center hover:scale-105 transition animate-scale-in">
            <img src="/placeholder.svg" className="w-20 h-20 mb-2 rounded-full" alt="Artículo" />
            <h2 className="font-bold text-lg text-green-800 mb-1">¿Por qué reciclar?</h2>
            <p className="text-sm text-gray-600 text-center mb-2">Conoce la importancia del reciclaje y formas fáciles de implementarlo en tu casa.</p>
            <a target="_blank" href="https://www.wwf.org/" className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold">Leer más</a>
          </div>
          <div className="rounded-xl shadow-md bg-white p-4 flex flex-col items-center hover:scale-105 transition animate-scale-in">
            <img src="/placeholder.svg" className="w-20 h-20 mb-2 rounded-full" alt="Video" />
            <h2 className="font-bold text-lg text-blue-800 mb-1">Video: Ahorra energía en casa</h2>
            <p className="text-sm text-gray-600 text-center mb-2">Trucos divertidos para reducir el consumo eléctrico.</p>
            <a target="_blank" href="https://www.youtube.com/watch?v=EtW2rrLHs08" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">Ver video</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
