import { Shield, Eye, Users, Heart, CheckCircle, AlertTriangle, Smartphone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import LogotipoEcoFun from "@/assets/LogotipoEcoFun.png";

const ChildSafety = () => {
  const platformInfo = [
    {
      icon: Eye,
      title: "Contenido Educativo",
      description: "Juegos y actividades diseñados para enseñar sobre ecología y sostenibilidad de forma divertida."
    },
    {
      icon: Users,
      title: "Comunidad en Desarrollo",
      description: "Estamos trabajando en funciones de comunidad con enfoque en rankings y desafíos grupales para fomentar el aprendizaje colaborativo."
    },
    {
      icon: Smartphone,
      title: "Acceso Gratuito",
      description: "La plataforma es gratuita y no incluye compras dentro de la aplicación."
    }
  ];

  const parentalGuidelines = [
    "Acompañe a su hijo durante las primeras sesiones de juego",
    "Establezca límites de tiempo de uso según la edad del niño",
    "Dialogue sobre los temas ecológicos que aprende en la plataforma",
    "Refuerce en casa los hábitos sostenibles que descubren en EcoFun",
    "Participe en los retos semanales como actividad familiar"
  ];

  const ageRecommendations = [
    {
      age: "4-6 años",
      description: "Juegos simples de clasificación y reconocimiento. Recomendamos supervisión constante y sesiones de 15-20 minutos."
    },
    {
      age: "7-9 años",
      description: "Acceso a todos los juegos y retos. Pueden jugar de forma más independiente con revisiones periódicas."
    },
    {
      age: "10-12 años",
      description: "Contenido educativo completo y desafíos avanzados. Mayor autonomía con diálogo sobre lo aprendido."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 via-green-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={LogotipoEcoFun} alt="EcoFun" className="h-8 sm:h-10" />
          </Link>
          <Link to="/">
            <Button variant="outline" className="text-emerald-700 border-emerald-300 hover:bg-emerald-50">
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-6">
            <Shield className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-4">
            Seguridad Infantil en EcoFun
          </h1>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto">
            La seguridad de los niños es nuestra máxima prioridad. Conoce todas las medidas 
            que implementamos para garantizar una experiencia educativa protegida.
          </p>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/90 border-emerald-200">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Heart className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-emerald-800 mb-3">
                    Nuestro Compromiso
                  </h2>
                  <p className="text-emerald-700 leading-relaxed">
                    En EcoFun, entendemos que los padres confían en nosotros al permitir que sus hijos 
                    utilicen nuestra plataforma. Por eso, hemos diseñado cada aspecto de EcoFun pensando 
                    primero en la seguridad y el bienestar de los menores. Cumplimos con las normativas 
                    internacionales de protección infantil en línea y mantenemos estándares éticos 
                    rigurosos en todo nuestro contenido.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Platform Info */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 text-center mb-8">
            Sobre la Plataforma
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {platformInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="bg-white/90 border-emerald-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                          {info.title}
                        </h3>
                        <p className="text-emerald-700 text-sm leading-relaxed">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Age Recommendations */}
      <section className="py-8 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 text-center mb-8">
            Recomendaciones por Edad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ageRecommendations.map((rec, index) => (
              <Card key={index} className="bg-gradient-to-br from-emerald-50 to-cyan-50 border-emerald-200">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                    <span className="text-2xl font-bold text-emerald-700">{rec.age.split('-')[0]}+</span>
                  </div>
                  <h3 className="text-xl font-bold text-emerald-800 mb-3">{rec.age}</h3>
                  <p className="text-emerald-700 text-sm leading-relaxed">{rec.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parental Guidelines */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-8 h-8 text-orange-500" />
                <h2 className="text-2xl font-bold text-orange-800">
                  Guía para Padres
                </h2>
              </div>
              <p className="text-orange-700 mb-6">
                Para maximizar los beneficios educativos y mantener una experiencia segura, 
                recomendamos a los padres:
              </p>
              <ul className="space-y-3">
                {parentalGuidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-orange-700">{guideline}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Report Section */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/90 border-emerald-200">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-8 h-8 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-emerald-800 mb-3">
                    ¿Encontraste algo preocupante?
                  </h2>
                  <p className="text-emerald-700 mb-4 leading-relaxed">
                    Aunque revisamos cuidadosamente todo nuestro contenido, valoramos la vigilancia 
                    de nuestra comunidad. Si encuentras algo que consideras inapropiado o tienes 
                    alguna preocupación sobre la seguridad, por favor contáctanos inmediatamente.
                  </p>
                  <a 
                    href="mailto:seguridad@ecofun.app"
                    className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-semibold transition-colors"
                  >
                    📧 seguridad@ecofun.app
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 px-4 mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-emerald-800 mb-4">
            ¿Listo para explorar EcoFun?
          </h2>
          <p className="text-emerald-700 mb-6">
            Descubre nuestra plataforma educativa diseñada para aprender cuidando el planeta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
                Comenzar a Jugar
              </Button>
            </Link>
            <Link to="/parents-info">
              <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-8 py-3">
                Información para Padres
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ChildSafety;
