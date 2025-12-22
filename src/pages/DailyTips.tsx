import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lightbulb, Calendar, RefreshCw, Heart, Share2, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DailyTips = () => {
  const allTips = [
    {
      id: 1,
      category: "Agua",
      emoji: "💧",
      title: "Cierra el grifo",
      tip: "Cierra el grifo mientras te cepillas los dientes. ¡Puedes ahorrar hasta 12 litros de agua cada vez!",
      funFact: "Un grifo abierto puede desperdiciar 6 litros de agua por minuto.",
      color: "blue"
    },
    {
      id: 2,
      category: "Energía",
      emoji: "💡",
      title: "Apaga las luces",
      tip: "Apaga las luces cuando salgas de una habitación. La luz natural es gratis y más saludable.",
      funFact: "Una bombilla encendida innecesariamente puede gastar el equivalente a cargar tu tablet 50 veces.",
      color: "yellow"
    },
    {
      id: 3,
      category: "Reciclaje",
      emoji: "♻️",
      title: "Separa los residuos",
      tip: "Aprende a separar correctamente: plástico, papel, vidrio y orgánicos. ¡Cada contenedor tiene su color!",
      funFact: "Reciclar una lata de aluminio ahorra energía suficiente para ver TV durante 3 horas.",
      color: "green"
    },
    {
      id: 4,
      category: "Naturaleza",
      emoji: "🌱",
      title: "Planta una semilla",
      tip: "Planta una semilla en una maceta. Puede ser de las frutas que comes. ¡Verás cómo crece día a día!",
      funFact: "Un solo árbol puede absorber hasta 22 kg de CO2 al año.",
      color: "emerald"
    },
    {
      id: 5,
      category: "Transporte",
      emoji: "🚲",
      title: "Usa la bicicleta",
      tip: "Para distancias cortas, camina o usa la bicicleta. Es bueno para ti y para el planeta.",
      funFact: "Ir en bici 10 km en vez de coche evita emitir 2.6 kg de CO2.",
      color: "orange"
    },
    {
      id: 6,
      category: "Comida",
      emoji: "🥗",
      title: "Come local",
      tip: "Los alimentos locales y de temporada viajan menos kilómetros y son más frescos.",
      funFact: "Una manzana importada puede haber viajado más de 3000 km hasta tu plato.",
      color: "pink"
    },
    {
      id: 7,
      category: "Reutilizar",
      emoji: "🛍️",
      title: "Usa bolsas reutilizables",
      tip: "Lleva siempre una bolsa de tela cuando vayas de compras. Dile adiós al plástico de un solo uso.",
      funFact: "Una bolsa de plástico tarda 500 años en descomponerse.",
      color: "purple"
    },
    {
      id: 8,
      category: "Agua",
      emoji: "🚿",
      title: "Duchas cortas",
      tip: "Intenta ducharte en 5 minutos o menos. Puedes poner tu canción favorita como temporizador.",
      funFact: "Una ducha de 10 minutos usa aproximadamente 200 litros de agua.",
      color: "cyan"
    },
    {
      id: 9,
      category: "Animales",
      emoji: "🐦",
      title: "Ayuda a las aves",
      tip: "Coloca un bebedero con agua fresca en tu balcón o jardín para los pájaros.",
      funFact: "Las aves ayudan a controlar plagas de insectos de forma natural.",
      color: "sky"
    },
    {
      id: 10,
      category: "Energía",
      emoji: "🔌",
      title: "Desconecta aparatos",
      tip: "Desconecta los cargadores cuando no los uses. Siguen consumiendo energía aunque no estén cargando nada.",
      funFact: "Los aparatos en 'standby' pueden representar hasta el 10% del consumo eléctrico de un hogar.",
      color: "amber"
    }
  ];

  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const [currentTipIndex, setCurrentTipIndex] = useState(() => {
    return getDayOfYear() % allTips.length;
  });
  const [savedTips, setSavedTips] = useState<number[]>([]);
  const [likedTips, setLikedTips] = useState<number[]>([]);

  const currentTip = allTips[currentTipIndex];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; badge: string; gradient: string }> = {
      blue: { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-300', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700', gradient: 'from-blue-500 to-cyan-500' },
      yellow: { bg: 'from-yellow-50 to-amber-50', border: 'border-yellow-300', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700', gradient: 'from-yellow-500 to-amber-500' },
      green: { bg: 'from-green-50 to-emerald-50', border: 'border-green-300', text: 'text-green-700', badge: 'bg-green-100 text-green-700', gradient: 'from-green-500 to-emerald-500' },
      emerald: { bg: 'from-emerald-50 to-teal-50', border: 'border-emerald-300', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700', gradient: 'from-emerald-500 to-teal-500' },
      orange: { bg: 'from-orange-50 to-amber-50', border: 'border-orange-300', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700', gradient: 'from-orange-500 to-amber-500' },
      pink: { bg: 'from-pink-50 to-rose-50', border: 'border-pink-300', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-700', gradient: 'from-pink-500 to-rose-500' },
      purple: { bg: 'from-purple-50 to-violet-50', border: 'border-purple-300', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700', gradient: 'from-purple-500 to-violet-500' },
      cyan: { bg: 'from-cyan-50 to-blue-50', border: 'border-cyan-300', text: 'text-cyan-700', badge: 'bg-cyan-100 text-cyan-700', gradient: 'from-cyan-500 to-blue-500' },
      sky: { bg: 'from-sky-50 to-blue-50', border: 'border-sky-300', text: 'text-sky-700', badge: 'bg-sky-100 text-sky-700', gradient: 'from-sky-500 to-blue-500' },
      amber: { bg: 'from-amber-50 to-orange-50', border: 'border-amber-300', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700', gradient: 'from-amber-500 to-orange-500' }
    };
    return colors[color] || colors.green;
  };

  const colorClasses = getColorClasses(currentTip.color);

  const goToPrevious = () => {
    setCurrentTipIndex((prev) => (prev === 0 ? allTips.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentTipIndex((prev) => (prev === allTips.length - 1 ? 0 : prev + 1));
  };

  const toggleSave = (id: number) => {
    setSavedTips(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const toggleLike = (id: number) => {
    setLikedTips(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Button>
            </Link>
          </div>

          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-amber-700 mb-2 sm:mb-4 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 sm:w-10 sm:h-10 mr-2 sm:mr-3" />
              Consejos Diarios
            </h1>
            <p className="text-sm sm:text-lg text-amber-600">
              Pequeñas acciones que hacen grandes diferencias
            </p>
            <div className="flex items-center justify-center mt-2 text-amber-500">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              <span className="text-xs sm:text-sm capitalize">{formattedDate}</span>
            </div>
          </div>

          {/* Consejo del Día */}
          <Card className={`bg-gradient-to-br ${colorClasses.bg} border-2 ${colorClasses.border} shadow-2xl mb-8 overflow-hidden`}>
            <div className={`bg-gradient-to-r ${colorClasses.gradient} p-4 text-white`}>
              <div className="flex items-center justify-between">
                <Badge className="bg-white/20 text-white">
                  <Lightbulb className="w-3 h-3 mr-1" />
                  Consejo del Día
                </Badge>
                <Badge className="bg-white/20 text-white">
                  {currentTip.category}
                </Badge>
              </div>
            </div>
            <CardContent className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{currentTip.emoji}</div>
                <h2 className={`text-2xl sm:text-3xl font-bold ${colorClasses.text} mb-4`}>
                  {currentTip.title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {currentTip.tip}
                </p>
                <div className="bg-white/70 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">💡 Dato curioso:</span> {currentTip.funFact}
                  </p>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex justify-center space-x-4 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`${likedTips.includes(currentTip.id) ? 'text-red-500 border-red-300' : ''}`}
                  onClick={() => toggleLike(currentTip.id)}
                >
                  <Heart className={`w-4 h-4 mr-2 ${likedTips.includes(currentTip.id) ? 'fill-red-500' : ''}`} />
                  Me gusta
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`${savedTips.includes(currentTip.id) ? 'text-yellow-600 border-yellow-300' : ''}`}
                  onClick={() => toggleSave(currentTip.id)}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${savedTips.includes(currentTip.id) ? 'fill-yellow-500' : ''}`} />
                  Guardar
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Navegación entre consejos */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Button 
              variant="outline" 
              onClick={goToPrevious}
              className="rounded-full w-12 h-12 p-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="flex space-x-2">
              {allTips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTipIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTipIndex 
                      ? 'bg-amber-500 w-4' 
                      : 'bg-amber-200 hover:bg-amber-300'
                  }`}
                />
              ))}
            </div>
            <Button 
              variant="outline" 
              onClick={goToNext}
              className="rounded-full w-12 h-12 p-0"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Todos los consejos */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200 shadow-xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-amber-700 mb-6 flex items-center">
                <RefreshCw className="w-6 h-6 mr-2" />
                Todos los Consejos
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {allTips.map((tip) => {
                  const tipColors = getColorClasses(tip.color);
                  return (
                    <button
                      key={tip.id}
                      onClick={() => setCurrentTipIndex(allTips.indexOf(tip))}
                      className={`p-4 rounded-lg border-2 text-left transition-all duration-300 hover:shadow-md ${
                        currentTipIndex === allTips.indexOf(tip)
                          ? `bg-gradient-to-r ${tipColors.bg} ${tipColors.border}`
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{tip.emoji}</div>
                        <div>
                          <h3 className={`font-semibold ${currentTipIndex === allTips.indexOf(tip) ? tipColors.text : 'text-gray-800'}`}>
                            {tip.title}
                          </h3>
                          <Badge className={tipColors.badge} variant="secondary">
                            {tip.category}
                          </Badge>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Link to="/">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg">
                ¡Aplicar Consejos!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTips;
