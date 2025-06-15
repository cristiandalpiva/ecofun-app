
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Target, HelpCircle, Lightbulb } from 'lucide-react';

interface HelpScreenProps {
  onBack: () => void;
}

const HelpScreen: React.FC<HelpScreenProps> = ({ onBack }) => {
  const tips = [
    {
      icon: '🔍',
      title: 'Busca lo Anormal',
      description: 'Las amenazas son cosas que NO deberían estar en la naturaleza',
      examples: ['Basura en el agua', 'Trampas en el bosque', 'Humo en el aire']
    },
    {
      icon: '👆',
      title: 'Haz Clic para Investigar',
      description: 'Cuando veas algo sospechoso, haz clic para investigar más de cerca',
      examples: ['Puntos rojos indican peligro', 'Los puntos verdes ya están resueltos']
    },
    {
      icon: '🧠',
      title: 'Piensa como un Guardián',
      description: 'Elige siempre la opción más responsable y ecológica',
      examples: ['Llama a expertos', 'Recicla y limpia', 'Protege a los animales']
    },
    {
      icon: '👀',
      title: 'Usa las Pistas',
      description: 'El botón "Mostrar Pistas" te ayuda a encontrar las amenazas',
      examples: ['Las amenazas parpadean en rojo', 'Hay exactamente 3 por hábitat']
    }
  ];

  const habitatGuides = [
    {
      habitat: 'Selva',
      emoji: '🐒',
      threats: ['Motosierras', 'Trampas para animales', 'Basura plástica'],
      tips: 'Busca objetos artificiales entre la vegetación natural'
    },
    {
      habitat: 'Océano',
      emoji: '🐠',
      threats: ['Redes abandonadas', 'Plásticos flotantes', 'Derrames de petróleo'],
      tips: 'Observa el agua en busca de contaminación y objetos extraños'
    },
    {
      habitat: 'Sabana',
      emoji: '🦁',
      threats: ['Cazadores furtivos', 'Pozos secos', 'Alambradas'],
      tips: 'Fíjate en actividades humanas que interrumpan la vida salvaje'
    },
    {
      habitat: 'Montaña',
      emoji: '🐻',
      threats: ['Deshielo', 'Basura en la nieve', 'Turismo irresponsable'],
      tips: 'Busca señales de cambio climático y contaminación'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Juego
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-4 flex items-center justify-center">
            <HelpCircle className="w-10 h-10 mr-3" />
            Centro de Ayuda
          </h1>
          <p className="text-lg text-blue-600">
            Aprende cómo ser el mejor Guardián del Hábitat
          </p>
        </div>

        {/* Consejos Principales */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {tips.map((tip, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{tip.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-800 mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-blue-700 mb-3">
                      {tip.description}
                    </p>
                    <div className="space-y-1">
                      {tip.examples.map((example, i) => (
                        <div key={i} className="text-sm text-blue-600 flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guía por Hábitat */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2" />
              Guía por Hábitat
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {habitatGuides.map((guide, index) => (
                <div key={index} className="border-2 border-green-100 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">{guide.emoji}</span>
                    <h3 className="text-lg font-bold text-gray-800">{guide.habitat}</h3>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="font-semibold text-red-700 mb-2">Amenazas Comunes:</h4>
                    <div className="flex flex-wrap gap-1">
                      {guide.threats.map((threat, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-red-300 text-red-600">
                          {threat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <div className="flex items-start">
                      <Lightbulb className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                      <p className="text-sm text-green-700">{guide.tips}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Controles del Juego */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-2" />
              Controles y Botones
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-2xl mb-2">👀</div>
                <h3 className="font-bold text-yellow-800 mb-1">Mostrar Pistas</h3>
                <p className="text-sm text-yellow-700">Hace que las amenazas parpadeen en rojo</p>
              </div>
              
              <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-2xl mb-2">!</div>
                <h3 className="font-bold text-red-800 mb-1">Amenaza</h3>
                <p className="text-sm text-red-700">Punto rojo que indica peligro ambiental</p>
              </div>
              
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-2xl mb-2">✓</div>
                <h3 className="font-bold text-green-800 mb-1">Resuelto</h3>
                <p className="text-sm text-green-700">Amenaza correctamente neutralizada</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Puntuación */}
        <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 max-w-2xl mx-auto">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">
              🏆 Sistema de Puntuación
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">+50</div>
                <div className="text-green-700">Respuesta Correcta</div>
              </div>
              <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                <div className="text-2xl font-bold text-red-600">-10</div>
                <div className="text-red-700">Respuesta Incorrecta</div>
              </div>
            </div>
            <p className="text-yellow-700 mt-4 text-sm">
              ¡Responde correctamente para maximizar tu puntuación y ayudar mejor a los animales!
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg"
          >
            ¡Entendido! Volver al Juego
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpScreen;
