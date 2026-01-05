import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, Gamepad2, BookOpen, Brain, Heart, Users, Leaf, Star, Target, Globe } from "lucide-react";
import Footer from "@/components/Footer";
import LogotipoEcoFun from "@/assets/LogotipoEcoFun.png";

const ParentsInfo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-cyan-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={LogotipoEcoFun} alt="EcoFun" className="h-8 sm:h-10 w-auto" />
          </Link>
          <Link to="/">
            <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Información para Familias
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-800 mb-4">
            ¿Qué es EcoFun?
          </h1>
          <p className="text-lg sm:text-xl text-emerald-700 max-w-2xl mx-auto leading-relaxed">
            Una plataforma educativa diseñada para que los niños aprendan a cuidar el planeta 
            mientras se divierten de forma segura.
          </p>
        </div>

        {/* Main Description */}
        <Card className="mb-8 border-emerald-200 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-2">Nuestra Misión</h2>
                <p className="text-emerald-700 leading-relaxed">
                  EcoFun nació con el objetivo de crear conciencia ambiental en los más pequeños a través del juego 
                  y la diversión. Creemos que educar a las nuevas generaciones sobre la importancia de cuidar 
                  nuestro planeta es fundamental para construir un futuro sostenible.
                </p>
              </div>
            </div>
            <p className="text-emerald-700 leading-relaxed">
              Nuestra plataforma combina entretenimiento y educación de manera equilibrada, permitiendo que los niños 
              desarrollen hábitos ecológicos mientras disfrutan de juegos interactivos, retos semanales y contenido 
              educativo adaptado a su edad.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-6 text-center">
          ¿Qué encontrarán los niños en EcoFun?
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
          <Card className="border-emerald-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-emerald-800">Juegos Educativos</h3>
              </div>
              <p className="text-emerald-700 text-sm leading-relaxed">
                Más de 15 juegos interactivos que enseñan sobre reciclaje, cuidado del agua, 
                protección de animales y energías renovables de forma entretenida.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-bold text-emerald-800">Retos Semanales</h3>
              </div>
              <p className="text-emerald-700 text-sm leading-relaxed">
                Desafíos diarios y semanales que motivan a los niños a aplicar lo aprendido 
                en la vida real, como ahorrar agua o reciclar en casa.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-emerald-800">Contenido Educativo</h3>
              </div>
              <p className="text-emerald-700 text-sm leading-relaxed">
                Artículos, datos curiosos y materiales didácticos sobre ecología, 
                biodiversidad y cuidado del medio ambiente adaptados para niños.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-emerald-800">Planta Virtual</h3>
              </div>
              <p className="text-emerald-700 text-sm leading-relaxed">
                Sistema de gamificación donde los niños cultivan una planta virtual 
                que crece conforme aprenden y completan actividades ecológicas.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <Card className="mb-8 border-emerald-200 bg-gradient-to-r from-emerald-50 to-cyan-50">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-6 text-center">
              Beneficios para el desarrollo infantil
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800">Pensamiento crítico</h4>
                  <p className="text-sm text-emerald-700">Aprenden a tomar decisiones responsables</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800">Empatía ambiental</h4>
                  <p className="text-sm text-emerald-700">Desarrollan conexión con la naturaleza</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800">Motivación intrínseca</h4>
                  <p className="text-sm text-emerald-700">Sistema de logros que premia el aprendizaje</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800">Valores familiares</h4>
                  <p className="text-sm text-emerald-700">Fomenta actividades ecológicas en familia</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Section */}
        <Card className="mb-8 border-emerald-200 border-2 border-dashed">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-emerald-800">
                Compromiso con la seguridad
              </h2>
            </div>
            <ul className="space-y-3 text-emerald-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">✓</span>
                <span><strong>Sin publicidad:</strong> Experiencia limpia y libre de anuncios comerciales.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">✓</span>
                <span><strong>Contenido apropiado:</strong> Todo el material está diseñado y revisado para audiencias infantiles.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">✓</span>
                <span><strong>Sin interacción social:</strong> Los niños no pueden comunicarse con otros usuarios.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">✓</span>
                <span><strong>Privacidad protegida:</strong> No recopilamos datos personales de menores.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Age Range */}
        <div className="text-center bg-white/60 rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-3">
            Edad recomendada
          </h2>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-6 py-3 rounded-full text-lg font-semibold mb-3">
            🧒 5 a 12 años
          </div>
          <p className="text-emerald-700 max-w-lg mx-auto">
            Nuestros contenidos están adaptados para niños en edad escolar, con diferentes 
            niveles de dificultad para ajustarse a cada etapa de desarrollo.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-4">
            ¿Listos para explorar juntos?
          </h2>
          <p className="text-emerald-700 mb-6">
            Acompaña a tus hijos en esta aventura de aprendizaje ecológico.
          </p>
          <Link to="/">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
              <Leaf className="w-5 h-5 mr-2" />
              Comenzar a explorar
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ParentsInfo;
