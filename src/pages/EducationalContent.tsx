
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function EducationalContent() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-100 to-blue-100">
      <header className="bg-gradient-to-r from-green-600 to-blue-600 py-4 px-4 sm:px-8 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white font-fredoka tracking-tight">
          EcoFun
        </Link>
        <nav>
          <Link to="/" className="text-white text-sm font-semibold hover:text-yellow-200 transition-all px-3">Inicio</Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-2 py-6 sm:px-6 sm:py-10">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-green-700 mb-3 sparkle text-center">Contenido Educativo</h1>
        <p className="text-base sm:text-xl text-blue-900 mb-5 sm:mb-7 text-center max-w-2xl">
          Descubre artículos, videos y curiosidades para cuidar el planeta. ¡Aprende y comparte nuevos hábitos ecológicos!
        </p>
        <section className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="rounded-2xl shadow-md bg-white p-4 sm:p-6 flex flex-col items-center hover:scale-105 transition border border-green-200 max-w-full">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
              className="w-40 h-40 mb-3 rounded-xl object-cover"
              alt="¿Por qué reciclar?"
              style={{background:'#f0fdf4'}} />
            <h2 className="font-bold text-base sm:text-lg text-green-800 mb-1 text-center">¿Por qué reciclar?</h2>
            <p className="text-sm sm:text-base text-gray-600 text-center mb-2">Conoce la importancia del reciclaje y formas fáciles de aplicarlo en tu día a día.</p>
            <a target="_blank" rel="noopener" href="https://www.wwf.org/"
               className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm font-semibold mt-auto">Leer más</a>
          </div>
          <div className="rounded-2xl shadow-md bg-white p-4 sm:p-6 flex flex-col items-center hover:scale-105 transition border border-blue-200 max-w-full">
            <img src="https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=400&q=80"
              className="w-40 h-40 mb-3 rounded-xl object-cover"
              alt="Ahorra energía en casa"
              style={{background:'#e0f2fe'}} />
            <h2 className="font-bold text-base sm:text-lg text-blue-800 mb-1 text-center">Video: Ahorra energía en casa</h2>
            <p className="text-sm sm:text-base text-gray-600 text-center mb-2">Trucos divertidos para reducir el consumo eléctrico y cuidar el medio ambiente.</p>
            <a target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=EtW2rrLHs08"
               className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-semibold mt-auto">Ver video</a>
          </div>
          <div className="rounded-2xl shadow-md bg-white p-4 sm:p-6 flex flex-col items-center hover:scale-105 transition border border-lime-200 max-w-full">
            <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80"
              className="w-40 h-40 mb-3 rounded-xl object-cover"
              alt="Cómo ahorrar agua"
              style={{background:'#f7fee7'}} />
            <h2 className="font-bold text-base sm:text-lg text-lime-800 mb-1 text-center">Trucos para ahorrar agua</h2>
            <p className="text-sm sm:text-base text-gray-600 text-center mb-2">Descubre formas sencillas para reducir el gasto de agua en casa.</p>
            <a target="_blank" rel="noopener" href="https://www.greenpeace.org/international/story/22789/water-saving-tips-home/"
               className="inline-block bg-lime-600 text-white px-4 py-2 rounded-lg hover:bg-lime-700 transition-colors text-xs sm:text-sm font-semibold mt-auto">Leer consejos</a>
          </div>
          <div className="rounded-2xl shadow-md bg-white p-4 sm:p-6 flex flex-col items-center hover:scale-105 transition border border-yellow-200 max-w-full">
            <img src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=400&q=80"
              className="w-40 h-40 mb-3 rounded-xl object-cover"
              alt="Curiosidades ecológicas"
              style={{background:'#fef9c3'}} />
            <h2 className="font-bold text-base sm:text-lg text-yellow-800 mb-1 text-center">Curiosidades ecológicas</h2>
            <p className="text-sm sm:text-base text-gray-600 text-center mb-2">Aprende datos sorprendentes sobre la naturaleza y la sostenibilidad.</p>
            <a target="_blank" rel="noopener" href="https://www.nationalgeographic.com/environment/"
               className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-xs sm:text-sm font-semibold mt-auto">Descubrir más</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
