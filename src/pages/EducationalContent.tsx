import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Calendar, ChevronDown, ChevronUp, Leaf, Droplets, Sun, Wind, TreePine, Fish } from 'lucide-react';
import { Link } from 'react-router-dom';

const EducationalContent = () => {
  const [expandedMonth, setExpandedMonth] = useState<number | null>(0);

  const monthlyContent = [
    {
      month: "Enero",
      theme: "El Agua y su Importancia",
      emoji: "💧",
      icon: Droplets,
      color: "blue",
      topics: [
        { title: "El Ciclo del Agua", description: "Aprende cómo el agua viaja desde los océanos hasta las nubes y de vuelta", emoji: "🌧️" },
        { title: "Ahorro de Agua en Casa", description: "Trucos divertidos para no desperdiciar ni una gota", emoji: "🚿" },
        { title: "Animales Acuáticos", description: "Conoce a los increíbles habitantes de ríos y océanos", emoji: "🐠" },
        { title: "Contaminación del Agua", description: "Por qué debemos mantener limpios nuestros ríos y mares", emoji: "🌊" }
      ]
    },
    {
      month: "Febrero",
      theme: "Amor por los Animales",
      emoji: "🦋",
      icon: Fish,
      color: "pink",
      topics: [
        { title: "Animales en Peligro", description: "Conoce especies que necesitan nuestra ayuda para sobrevivir", emoji: "🐼" },
        { title: "Hábitats Naturales", description: "Cada animal tiene un hogar especial, ¡descúbrelos!", emoji: "🏔️" },
        { title: "Cadena Alimenticia", description: "Cómo los animales dependen unos de otros", emoji: "🦁" },
        { title: "Cómo Ayudar a los Animales", description: "Acciones que puedes hacer para protegerlos", emoji: "🤝" }
      ]
    },
    {
      month: "Marzo",
      theme: "Las Plantas y los Bosques",
      emoji: "🌳",
      icon: TreePine,
      color: "green",
      topics: [
        { title: "Día del Árbol", description: "Celebramos la importancia de plantar y cuidar árboles", emoji: "🌲" },
        { title: "Fotosíntesis Mágica", description: "Cómo las plantas convierten luz en oxígeno", emoji: "☀️" },
        { title: "Bosques del Mundo", description: "Desde la selva tropical hasta los bosques de pinos", emoji: "🌴" },
        { title: "Plantas Medicinales", description: "Descubre las plantas que nos ayudan a estar sanos", emoji: "🌿" }
      ]
    },
    {
      month: "Abril",
      theme: "Día de la Tierra",
      emoji: "🌍",
      icon: Leaf,
      color: "emerald",
      topics: [
        { title: "Nuestro Planeta Azul", description: "Por qué la Tierra es tan especial en el universo", emoji: "🌎" },
        { title: "Capas de la Tierra", description: "Viaja desde la corteza hasta el núcleo", emoji: "🔬" },
        { title: "Cambio Climático", description: "Entendiendo cómo cambia nuestro clima", emoji: "🌡️" },
        { title: "Acciones por el Planeta", description: "22 de Abril: actividades para celebrar la Tierra", emoji: "🎉" }
      ]
    },
    {
      month: "Mayo",
      theme: "Biodiversidad",
      emoji: "🦜",
      icon: Fish,
      color: "yellow",
      topics: [
        { title: "¿Qué es la Biodiversidad?", description: "La increíble variedad de vida en nuestro planeta", emoji: "🌺" },
        { title: "Ecosistemas", description: "Comunidades de seres vivos que viven juntos", emoji: "🏞️" },
        { title: "Polinizadores", description: "Abejas, mariposas y otros héroes del jardín", emoji: "🐝" },
        { title: "Especies Invasoras", description: "Cuando un animal o planta llega donde no debería", emoji: "🦎" }
      ]
    },
    {
      month: "Junio",
      theme: "El Sol y la Energía",
      emoji: "☀️",
      icon: Sun,
      color: "orange",
      topics: [
        { title: "Energía Solar", description: "Cómo convertimos la luz del sol en electricidad", emoji: "🔆" },
        { title: "Solsticio de Verano", description: "El día más largo del año y su importancia", emoji: "📅" },
        { title: "Paneles Solares", description: "Tecnología que aprovecha el poder del sol", emoji: "🔋" },
        { title: "Ahorro de Energía en Verano", description: "Mantente fresco sin gastar mucha electricidad", emoji: "❄️" }
      ]
    },
    {
      month: "Julio",
      theme: "Los Océanos",
      emoji: "🌊",
      icon: Droplets,
      color: "cyan",
      topics: [
        { title: "Día Mundial de los Océanos", description: "Celebrando nuestros mares y su importancia", emoji: "🐋" },
        { title: "Vida Marina", description: "Desde el plancton hasta las ballenas", emoji: "🐙" },
        { title: "Plástico en el Mar", description: "El problema de la contaminación oceánica", emoji: "🥤" },
        { title: "Arrecifes de Coral", description: "Las selvas tropicales del océano", emoji: "🪸" }
      ]
    },
    {
      month: "Agosto",
      theme: "El Aire y la Atmósfera",
      emoji: "💨",
      icon: Wind,
      color: "sky",
      topics: [
        { title: "Composición del Aire", description: "Oxígeno, nitrógeno y otros gases que respiramos", emoji: "🌬️" },
        { title: "Contaminación del Aire", description: "Qué la causa y cómo nos afecta", emoji: "🏭" },
        { title: "La Capa de Ozono", description: "El escudo protector de la Tierra", emoji: "🛡️" },
        { title: "Árboles: Pulmones Verdes", description: "Cómo los bosques limpian nuestro aire", emoji: "🌲" }
      ]
    },
    {
      month: "Septiembre",
      theme: "Reciclaje y Residuos",
      emoji: "♻️",
      icon: Leaf,
      color: "lime",
      topics: [
        { title: "Las 3R: Reducir, Reutilizar, Reciclar", description: "La regla de oro del cuidado ambiental", emoji: "🔄" },
        { title: "Separación de Residuos", description: "Cada basura en su contenedor correcto", emoji: "🗑️" },
        { title: "Compostaje", description: "Convierte residuos orgánicos en abono", emoji: "🌱" },
        { title: "Vida sin Plástico", description: "Alternativas para reducir el plástico", emoji: "🛍️" }
      ]
    },
    {
      month: "Octubre",
      theme: "Animales y Naturaleza en Otoño",
      emoji: "🍂",
      icon: Leaf,
      color: "amber",
      topics: [
        { title: "Migración de Aves", description: "El increíble viaje de las aves en otoño", emoji: "🦅" },
        { title: "Hibernación", description: "Animales que duermen todo el invierno", emoji: "🐻" },
        { title: "Hojas Cambiantes", description: "Por qué las hojas cambian de color", emoji: "🍁" },
        { title: "Preparándose para el Frío", description: "Cómo la naturaleza se prepara para el invierno", emoji: "🌰" }
      ]
    },
    {
      month: "Noviembre",
      theme: "Consumo Responsable",
      emoji: "🛒",
      icon: Leaf,
      color: "teal",
      topics: [
        { title: "Compras Conscientes", description: "Eligiendo productos que cuidan el planeta", emoji: "🏷️" },
        { title: "Huella de Carbono", description: "El impacto de nuestras decisiones diarias", emoji: "👣" },
        { title: "Comercio Justo", description: "Productos que benefician a las comunidades", emoji: "🤝" },
        { title: "Black Friday Verde", description: "Alternativas sostenibles al consumismo", emoji: "💚" }
      ]
    },
    {
      month: "Diciembre",
      theme: "Navidad Sostenible",
      emoji: "🎄",
      icon: TreePine,
      color: "red",
      topics: [
        { title: "Regalos Ecológicos", description: "Ideas para regalar sin dañar el planeta", emoji: "🎁" },
        { title: "Decoraciones Naturales", description: "Adornos hechos con materiales reciclados", emoji: "⭐" },
        { title: "Cena Sostenible", description: "Comida deliciosa que cuida el ambiente", emoji: "🍽️" },
        { title: "Propósitos Verdes", description: "Metas ecológicas para el nuevo año", emoji: "🌟" }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
      blue: { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' },
      pink: { bg: 'from-pink-50 to-rose-50', border: 'border-pink-200', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-700' },
      green: { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-100 text-green-700' },
      emerald: { bg: 'from-emerald-50 to-teal-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
      yellow: { bg: 'from-yellow-50 to-amber-50', border: 'border-yellow-200', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700' },
      orange: { bg: 'from-orange-50 to-amber-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
      cyan: { bg: 'from-cyan-50 to-blue-50', border: 'border-cyan-200', text: 'text-cyan-700', badge: 'bg-cyan-100 text-cyan-700' },
      sky: { bg: 'from-sky-50 to-blue-50', border: 'border-sky-200', text: 'text-sky-700', badge: 'bg-sky-100 text-sky-700' },
      lime: { bg: 'from-lime-50 to-green-50', border: 'border-lime-200', text: 'text-lime-700', badge: 'bg-lime-100 text-lime-700' },
      amber: { bg: 'from-amber-50 to-orange-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700' },
      teal: { bg: 'from-teal-50 to-cyan-50', border: 'border-teal-200', text: 'text-teal-700', badge: 'bg-teal-100 text-teal-700' },
      red: { bg: 'from-red-50 to-pink-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-700' }
    };
    return colors[color] || colors.green;
  };

  const currentMonth = new Date().getMonth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Button>
            </Link>
          </div>

          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-indigo-700 mb-2 sm:mb-4 flex items-center justify-center">
              <BookOpen className="w-6 h-6 sm:w-10 sm:h-10 mr-2 sm:mr-3" />
              Contenido Educativo
            </h1>
            <p className="text-sm sm:text-lg text-indigo-600">
              Aprende sobre el medio ambiente mes a mes
            </p>
          </div>

          {/* Mes Actual Destacado */}
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 shadow-xl mb-6 sm:mb-8">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center">
                  <div className="text-3xl sm:text-5xl mr-3 sm:mr-4">{monthlyContent[currentMonth].emoji}</div>
                  <div>
                    <Badge className="bg-white/20 text-white mb-1 sm:mb-2 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      Mes Actual
                    </Badge>
                    <h2 className="text-lg sm:text-2xl font-bold">{monthlyContent[currentMonth].month}</h2>
                    <p className="text-indigo-100 text-sm">{monthlyContent[currentMonth].theme}</p>
                  </div>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                  onClick={() => setExpandedMonth(currentMonth)}
                >
                  Ver Contenido
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Calendario de Contenidos */}
          <div className="space-y-4">
            {monthlyContent.map((content, index) => {
              const colorClasses = getColorClasses(content.color);
              const isExpanded = expandedMonth === index;
              
              return (
                <Card 
                  key={content.month}
                  className={`bg-white/90 backdrop-blur-sm border-2 ${colorClasses.border} shadow-lg transition-all duration-300`}
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedMonth(isExpanded ? null : index)}
                      className={`w-full p-4 flex items-center justify-between hover:bg-gradient-to-r ${colorClasses.bg} transition-all duration-300 rounded-t-lg`}
                    >
                      <div className="flex items-center">
                        <div className="text-3xl mr-4">{content.emoji}</div>
                        <div className="text-left">
                          <h3 className={`font-bold ${colorClasses.text}`}>{content.month}</h3>
                          <p className="text-sm text-gray-600">{content.theme}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={colorClasses.badge}>
                          {content.topics.length} temas
                        </Badge>
                        {isExpanded ? (
                          <ChevronUp className={`w-5 h-5 ${colorClasses.text}`} />
                        ) : (
                          <ChevronDown className={`w-5 h-5 ${colorClasses.text}`} />
                        )}
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className={`p-4 bg-gradient-to-b ${colorClasses.bg} border-t ${colorClasses.border}`}>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {content.topics.map((topic, topicIndex) => (
                            <div 
                              key={topicIndex}
                              className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-start">
                                <div className="text-2xl mr-3">{topic.emoji}</div>
                                <div>
                                  <h4 className="font-semibold text-gray-800">{topic.title}</h4>
                                  <p className="text-sm text-gray-600">{topic.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link to="/">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg">
                ¡Seguir Explorando!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalContent;
