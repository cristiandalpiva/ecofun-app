
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function EducationalGames() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-gradient-to-r from-green-600 to-blue-600 py-4 px-4 sm:px-8 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white font-fredoka tracking-tight">
          EcoFun
        </Link>
        <nav>
          <Link to="/" className="text-white text-sm font-semibold hover:text-yellow-200 transition-all px-3">Inicio</Link>
        </nav>
      </header>
      <main className="flex-1 w-full flex flex-col items-center px-4 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-3 sparkle text-center">Juegos Educativos</h1>
        <p className="text-lg sm:text-xl text-blue-900 mb-7 text-center max-w-2xl">
          Explora y juega aprendiendo a cuidar nuestro planeta. Cada juego es una nueva aventura ecológica. ¡Desafía tu ingenio y sé parte del cambio!
        </p>
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-all border border-green-200">
            <img
              src="/placeholder.svg"
              className="w-24 h-24 rounded-full border-4 border-green-100 object-cover mb-3 wiggle"
              alt="EcoTetris"
              style={{ background: "#ecfeec" }}
            />
            <h2 className="font-extrabold text-xl text-green-700 mb-1">EcoTetris</h2>
            <p className="text-base text-gray-600 text-center mb-3">
              ¡Pon a prueba tu agilidad y aprende sobre reciclaje mientras juegas!
            </p>
            <Link
              to="/games"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 font-semibold transition-colors shadow"
            >
              Jugar
            </Link>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-all border border-blue-200">
            <img
              src="/placeholder.svg"
              className="w-24 h-24 rounded-full border-4 border-blue-100 object-cover mb-3 wiggle"
              alt="Aventura Submarina"
              style={{ background: "#e0f2fe" }}
            />
            <h2 className="font-extrabold text-xl text-blue-700 mb-1">Aventura Submarina</h2>
            <p className="text-base text-gray-600 text-center mb-3">
              Explora el océano, descubre animales increíbles y cuida el ecosistema marino.
            </p>
            <Link
              to="/games"
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-semibold transition-colors shadow"
            >
              Jugar
            </Link>
          </div>
        </div>
        <div className="w-full max-w-4xl mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-all border border-yellow-200">
            <img
              src="/placeholder.svg"
              className="w-24 h-24 rounded-full border-4 border-yellow-100 object-cover mb-3 wiggle"
              alt="Guardianes del Hábitat"
              style={{ background: "#fef9c3" }}
            />
            <h2 className="font-extrabold text-xl text-yellow-700 mb-1">Guardianes del Hábitat</h2>
            <p className="text-base text-gray-600 text-center mb-3">
              Ayuda a proteger distintos hábitats y salva especies en peligro.
            </p>
            <Link
              to="/games"
              className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 font-semibold transition-colors shadow"
            >
              Jugar
            </Link>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-all border border-lime-200">
            <img
              src="/placeholder.svg"
              className="w-24 h-24 rounded-full border-4 border-lime-100 object-cover mb-3 wiggle"
              alt="EcoQuiz"
              style={{ background: "#f7fee7" }}
            />
            <h2 className="font-extrabold text-xl text-lime-700 mb-1">EcoQuiz</h2>
            <p className="text-base text-gray-600 text-center mb-3">
              Contesta preguntas ecológicas y conviértete en un experto ambiental.
            </p>
            <Link
              to="/games"
              className="bg-lime-600 text-white px-5 py-2 rounded-lg hover:bg-lime-700 font-semibold transition-colors shadow"
            >
              Jugar
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
