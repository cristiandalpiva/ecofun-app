
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, ArrowRight } from 'lucide-react';

interface AnimalRescueProps {
  habitat: string;
  onContinue: () => void;
  onViewAchievements: () => void;
}

const AnimalRescue: React.FC<AnimalRescueProps> = ({ 
  habitat, 
  onContinue, 
  onViewAchievements 
}) => {
  const animalData: Record<string, { name: string; emoji: string; message: string; medal: string; description: string; background: string }> = {
    selva: {
      name: 'Jaguar',
      emoji: '🐆',
      message: '¡Salvaste al Jaguar!',
      medal: 'Guardián de la Selva',
      description: 'Has protegido la selva tropical y sus habitantes. El jaguar puede seguir siendo el rey de su territorio.',
      background: 'from-green-400 to-emerald-600'
    },
    oceano: {
      name: 'Ballena',
      emoji: '🐋',
      message: '¡Salvaste a la Ballena!',
      medal: 'Protector del Océano',
      description: 'Has limpiado el océano y salvado a la majestuosa ballena. Los mares están más seguros gracias a ti.',
      background: 'from-blue-400 to-cyan-600'
    },
    sabana: {
      name: 'León',
      emoji: '🦁',
      message: '¡Salvaste al León!',
      medal: 'Guardián de la Sabana',
      description: 'Has protegido al rey de la sabana. El león y su manada pueden vivir en paz.',
      background: 'from-yellow-400 to-orange-600'
    },
    montana: {
      name: 'Oso Polar',
      emoji: '🐻‍❄️',
      message: '¡Salvaste al Oso Polar!',
      medal: 'Protector del Ártico',
      description: 'Has ayudado a combatir el cambio climático. El oso polar tiene esperanza para el futuro.',
      background: 'from-slate-400 to-blue-600'
    }
  };

  const animal = animalData[habitat];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm border-4 border-yellow-400 shadow-2xl">
        <CardContent className="p-8 text-center">
          {/* Celebración */}
          <div className="mb-8">
            <div className="text-8xl mb-4 animate-bounce">
              {animal.emoji}
            </div>
            
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              {animal.message}
            </h1>
            
            <div className="flex justify-center space-x-2 mb-6">
              <span className="text-2xl animate-pulse">🎉</span>
              <span className="text-2xl animate-pulse delay-100">✨</span>
              <span className="text-2xl animate-pulse delay-200">🌟</span>
              <span className="text-2xl animate-pulse delay-300">🎊</span>
              <span className="text-2xl animate-pulse delay-400">🎉</span>
            </div>
          </div>

          {/* Medalla */}
          <div className={`bg-gradient-to-br ${animal.background} p-6 rounded-xl mb-6 text-white`}>
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 mr-3" />
              <h2 className="text-2xl font-bold">¡Nueva Medalla Ganada!</h2>
            </div>
            
            <Badge className="bg-yellow-500 text-white text-lg px-4 py-2 mb-4">
              <Star className="w-5 h-5 mr-2" />
              {animal.medal}
            </Badge>
            
            <p className="text-lg">
              {animal.description}
            </p>
          </div>

          {/* Información del rescate */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-green-800 mb-3">
              Lo que lograste:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-green-700">Amenazas Resueltas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1</div>
                <div className="text-blue-700">Animal Salvado</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">1</div>
                <div className="text-purple-700">Hábitat Protegido</div>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={onContinue}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-xl text-lg h-auto"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Continuar Aventura
            </Button>
            
            <Button
              onClick={onViewAchievements}
              variant="outline"
              className="border-yellow-400 text-yellow-700 hover:bg-yellow-50 font-bold py-4 px-6 rounded-xl text-lg h-auto"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Ver Medallas
            </Button>
          </div>

          {/* Mensaje motivacional */}
          <div className="mt-6 text-sm text-gray-600 italic">
            "Cada animal que salvas hace la diferencia. ¡Sigue protegiendo nuestro planeta!"
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnimalRescue;
