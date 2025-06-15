
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, ArrowLeft, Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface GameProgress {
  unlockedHabitats: string[];
  completedHabitats: string[];
  earnedMedals: string[];
  totalScore: number;
}

interface HabitatSelectionProps {
  gameProgress: GameProgress;
  onHabitatSelect: (habitat: string) => void;
  onBack: () => void;
}

const HabitatSelection: React.FC<HabitatSelectionProps> = ({ 
  gameProgress, 
  onHabitatSelect, 
  onBack 
}) => {
  const habitats = [
    {
      id: 'selva',
      name: 'Selva Tropical',
      emoji: '🐒',
      description: 'Rescata al jaguar de los peligros de la deforestación',
      background: 'from-green-400 to-emerald-600',
      animal: 'Jaguar',
      threats: ['Deforestación', 'Trampas', 'Incendios']
    },
    {
      id: 'oceano',
      name: 'Océano Profundo',
      emoji: '🐠',
      description: 'Salva a la ballena de la contaminación marina',
      background: 'from-blue-400 to-cyan-600',
      animal: 'Ballena',
      threats: ['Redes de pesca', 'Plásticos', 'Derrames de petróleo']
    },
    {
      id: 'sabana',
      name: 'Sabana Africana',
      emoji: '🦁',
      description: 'Protege al león de la caza furtiva',
      background: 'from-yellow-400 to-orange-600',
      animal: 'León',
      threats: ['Caza furtiva', 'Sequía', 'Pérdida de territorio']
    },
    {
      id: 'montana',
      name: 'Montañas Nevadas',
      emoji: '🐻',
      description: 'Ayuda al oso polar con el cambio climático',
      background: 'from-slate-400 to-blue-600',
      animal: 'Oso Polar',
      threats: ['Deshielo', 'Contaminación', 'Escasez de alimento']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            🌍 Selecciona un Hábitat
          </h1>
          <p className="text-lg text-green-700 max-w-2xl mx-auto">
            Cada hábitat tiene un animal en peligro esperando tu ayuda. 
            Encuentra y resuelve las amenazas para salvarlos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {habitats.map((habitat) => {
            const isUnlocked = gameProgress.unlockedHabitats.includes(habitat.id);
            const isCompleted = gameProgress.completedHabitats.includes(habitat.id);

            return (
              <TooltipProvider key={habitat.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card 
                      className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 border-4 ${
                        isCompleted 
                          ? 'border-yellow-400 shadow-yellow-200 shadow-lg' 
                          : isUnlocked 
                            ? 'border-green-400 hover:border-green-500 shadow-lg hover:shadow-xl' 
                            : 'border-gray-300 opacity-60 cursor-not-allowed'
                      }`}
                      onClick={() => isUnlocked && onHabitatSelect(habitat.id)}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${habitat.background} opacity-20`} />
                      
                      {/* Estado visual */}
                      <div className="absolute top-3 right-3">
                        {isCompleted ? (
                          <Badge className="bg-yellow-500 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Completado
                          </Badge>
                        ) : isUnlocked ? (
                          <Badge className="bg-green-500 text-white">
                            <Unlock className="w-3 h-3 mr-1" />
                            Disponible
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-500 text-white">
                            <Lock className="w-3 h-3 mr-1" />
                            Bloqueado
                          </Badge>
                        )}
                      </div>

                      <CardContent className="relative p-6 text-center">
                        <div className={`text-6xl mb-4 ${!isUnlocked && 'grayscale'}`}>
                          {habitat.emoji}
                        </div>
                        
                        <h3 className={`text-xl font-bold mb-2 ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                          {habitat.name}
                        </h3>
                        
                        <p className={`text-sm mb-4 ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                          {habitat.description}
                        </p>

                        <div className="space-y-2">
                          <div className={`text-xs font-semibold ${isUnlocked ? 'text-purple-700' : 'text-gray-400'}`}>
                            Animal: {habitat.animal}
                          </div>
                          
                          {isUnlocked && (
                            <div className="space-y-1">
                              <div className="text-xs font-semibold text-red-600">Amenazas:</div>
                              <div className="flex flex-wrap gap-1 justify-center">
                                {habitat.threats.map((threat, index) => (
                                  <Badge key={index} variant="outline" className="text-xs border-red-300 text-red-600">
                                    {threat}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {!isUnlocked && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Lock className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isCompleted 
                        ? `¡Ya salvaste al ${habitat.animal}! Puedes volver a jugar.`
                        : isUnlocked 
                          ? `Rescatá al ${habitat.animal} completando este entorno.`
                          : "Completa el hábitat anterior para desbloquear este."
                      }
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <div className="bg-white/80 backdrop-blur-sm border-2 border-green-200 rounded-lg p-4 max-w-md mx-auto">
            <h3 className="font-bold text-green-800 mb-2">Progreso General</h3>
            <div className="flex justify-around text-sm">
              <div>
                <div className="text-lg font-bold text-green-600">{gameProgress.completedHabitats.length}/4</div>
                <div className="text-green-700">Hábitats</div>
              </div>
              <div>
                <div className="text-lg font-bold text-yellow-600">{gameProgress.earnedMedals.length}</div>
                <div className="text-yellow-700">Medallas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitatSelection;
