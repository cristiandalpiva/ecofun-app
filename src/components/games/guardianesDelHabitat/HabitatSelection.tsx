
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lock, CheckCircle, Star } from 'lucide-react';

interface HabitatSelectionProps {
  gameProgress: {
    unlockedHabitats: string[];
    completedHabitats: string[];
    earnedMedals: string[];
    totalScore: number;
  };
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
      animal: 'Jaguar',
      emoji: '🐆',
      image: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=300&fit=crop',
      description: 'Rescata al jaguar de la deforestación y la caza furtiva',
      difficulty: 'Medio',
      threats: ['Deforestación', 'Caza furtiva', 'Fragmentación'],
      background: 'from-green-400 to-emerald-600'
    },
    {
      id: 'oceano',
      name: 'Océano Profundo',
      animal: 'Ballena',
      emoji: '🐋',
      image: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=400&h=300&fit=crop',
      description: 'Salva a la ballena de la contaminación marina',
      difficulty: 'Medio',
      threats: ['Contaminación plástica', 'Pesca excesiva', 'Ruido submarino'],
      background: 'from-blue-400 to-cyan-600'
    },
    {
      id: 'sabana',
      name: 'Sabana Africana',
      animal: 'León',
      emoji: '🦁',
      image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=300&fit=crop',
      description: 'Protege al león del conflicto humano-vida silvestre',
      difficulty: 'Medio',
      threats: ['Pérdida de territorio', 'Conflicto con humanos', 'Sequías'],
      background: 'from-yellow-400 to-orange-600'
    },
    {
      id: 'montana',
      name: 'Montañas Nevadas',
      animal: 'Oso Polar',
      emoji: '🐻‍❄️',
      image: 'https://images.unsplash.com/photo-1438565434616-3ef039228b15?w=400&h=300&fit=crop',
      description: 'Ayuda al oso polar contra el cambio climático',
      difficulty: 'Difícil',
      threats: ['Derretimiento de hielo', 'Cambio climático', 'Pérdida de presas'],
      background: 'from-slate-400 to-blue-600'
    }
  ];

  const isUnlocked = (habitatId: string) => gameProgress.unlockedHabitats.includes(habitatId);
  const isCompleted = (habitatId: string) => gameProgress.completedHabitats.includes(habitatId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-green-400 text-green-700 hover:bg-green-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Menú
          </Button>
          
          <h1 className="text-3xl font-bold text-green-800">
            🌍 Selecciona un Hábitat
          </h1>
          
          <div className="text-right">
            <p className="text-sm text-gray-600">Progreso Total</p>
            <p className="text-xl font-bold text-green-700">
              {gameProgress.completedHabitats.length}/4
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {habitats.map((habitat) => {
            const unlocked = isUnlocked(habitat.id);
            const completed = isCompleted(habitat.id);
            
            return (
              <Card 
                key={habitat.id}
                className={`relative overflow-hidden border-4 transition-all duration-300 ${
                  unlocked 
                    ? 'border-green-300 hover:border-green-400 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl' 
                    : 'border-gray-300 opacity-60'
                } ${completed ? 'ring-4 ring-yellow-400' : ''}`}
                onClick={() => unlocked && onHabitatSelect(habitat.id)}
              >
                {/* Imagen de fondo del hábitat */}
                <div 
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${habitat.image})` }}
                >
                  {/* Overlay con gradiente */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${habitat.background} opacity-80`}></div>
                  
                  {/* Estado del hábitat */}
                  <div className="absolute top-4 right-4">
                    {completed && (
                      <Badge className="bg-yellow-500 text-white">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Completado
                      </Badge>
                    )}
                    {!unlocked && (
                      <Badge className="bg-gray-500 text-white">
                        <Lock className="w-4 h-4 mr-1" />
                        Bloqueado
                      </Badge>
                    )}
                  </div>
                  
                  {/* Emoji del animal */}
                  <div className="absolute bottom-4 left-4">
                    <div className="text-6xl animate-bounce">
                      {habitat.emoji}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {habitat.name}
                    </h3>
                    <p className="text-lg font-semibold text-blue-700 mb-2">
                      Rescatar: {habitat.animal}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {habitat.description}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-bold text-red-700 mb-2">Amenazas a resolver:</h4>
                    <div className="flex flex-wrap gap-2">
                      {habitat.threats.map((threat, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-red-300 text-red-700">
                          {threat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={
                      habitat.difficulty === 'Fácil' ? 'bg-green-100 text-green-800' :
                      habitat.difficulty === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {habitat.difficulty}
                    </Badge>
                    
                    {completed && (
                      <div className="flex items-center text-yellow-600">
                        <Star className="w-4 h-4 mr-1" />
                        <span className="text-sm font-bold">¡Héroe del Hábitat!</span>
                      </div>
                    )}
                  </div>

                  {unlocked && !completed && (
                    <Button 
                      className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        onHabitatSelect(habitat.id);
                      }}
                    >
                      🎮 ¡Iniciar Misión!
                    </Button>
                  )}
                  
                  {completed && (
                    <Button 
                      className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        onHabitatSelect(habitat.id);
                      }}
                    >
                      🔄 Jugar de Nuevo
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Card className="bg-blue-50 border-2 border-blue-200 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-3">
                ℹ️ ¿Cómo jugar?
              </h3>
              <p className="text-blue-700 text-sm">
                Cada hábitat presenta diferentes amenazas ambientales. Resuelve los problemas para salvar al animal en peligro. 
                Completa un hábitat para desbloquear el siguiente. ¡Conviértete en un verdadero Guardián del Hábitat!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HabitatSelection;
