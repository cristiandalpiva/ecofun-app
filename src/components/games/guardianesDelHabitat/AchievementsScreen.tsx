
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Star, Award } from 'lucide-react';

interface GameProgress {
  unlockedHabitats: string[];
  completedHabitats: string[];
  earnedMedals: string[];
  totalScore: number;
}

interface AchievementsScreenProps {
  gameProgress: GameProgress;
  onBack: () => void;
}

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ 
  gameProgress, 
  onBack 
}) => {
  const medals = [
    {
      id: 'selva-guardian',
      name: 'Guardián de la Selva',
      description: 'Salvó al jaguar de la deforestación',
      emoji: '🐆',
      habitat: 'selva',
      earned: gameProgress.earnedMedals.includes('selva-guardian'),
      rarity: 'Común',
      rarityColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'oceano-guardian',
      name: 'Protector del Océano',
      description: 'Rescató a la ballena de la contaminación marina',
      emoji: '🐋',
      habitat: 'oceano',
      earned: gameProgress.earnedMedals.includes('oceano-guardian'),
      rarity: 'Común',
      rarityColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'sabana-guardian',
      name: 'Guardián de la Sabana',
      description: 'Protegió al león de la caza furtiva',
      emoji: '🦁',
      habitat: 'sabana',
      earned: gameProgress.earnedMedals.includes('sabana-guardian'),
      rarity: 'Común',
      rarityColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'montana-guardian',
      name: 'Protector del Ártico',
      description: 'Ayudó al oso polar con el cambio climático',
      emoji: '🐻‍❄️',
      habitat: 'montana',
      earned: gameProgress.earnedMedals.includes('montana-guardian'),
      rarity: 'Común',
      rarityColor: 'bg-slate-100 text-slate-800'
    },
    {
      id: 'eco-novato',
      name: 'Eco-Novato',
      description: 'Completó su primer hábitat',
      emoji: '🌱',
      habitat: 'general',
      earned: gameProgress.completedHabitats.length >= 1,
      rarity: 'Común',
      rarityColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'rescatista',
      name: 'Rescatista Experto',
      description: 'Salvó animales de 2 hábitats diferentes',
      emoji: '🚑',
      habitat: 'general',
      earned: gameProgress.completedHabitats.length >= 2,
      rarity: 'Raro',
      rarityColor: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'guardian-maestro',
      name: 'Guardián Maestro',
      description: 'Protegió todos los hábitats del planeta',
      emoji: '🌍',
      habitat: 'general',
      earned: gameProgress.completedHabitats.length === 4,
      rarity: 'Legendario',
      rarityColor: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
    },
    {
      id: 'puntuacion-alta',
      name: 'Súper Puntuador',
      description: 'Obtuvo más de 150 puntos en total',
      emoji: '💯',
      habitat: 'general',
      earned: gameProgress.totalScore >= 150,
      rarity: 'Raro',
      rarityColor: 'bg-purple-100 text-purple-800'
    }
  ];

  const earnedMedals = medals.filter(medal => medal.earned);
  const totalMedals = medals.length;
  const completionPercentage = (earnedMedals.length / totalMedals) * 100;

  const rarityStats = {
    'Común': earnedMedals.filter(m => m.rarity === 'Común').length,
    'Raro': earnedMedals.filter(m => m.rarity === 'Raro').length,
    'Legendario': earnedMedals.filter(m => m.rarity === 'Legendario').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-700 mb-4 flex items-center justify-center">
            <Trophy className="w-10 h-10 mr-3" />
            Colección de Medallas
          </h1>
          <p className="text-lg text-orange-600">
            ¡Tu libro de stickers ecológicos! Cada medalla cuenta una historia de conservación.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-yellow-300 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-yellow-600">{earnedMedals.length}/{totalMedals}</div>
              <div className="text-sm text-yellow-700">Medallas Ganadas</div>
              <Progress value={completionPercentage} className="mt-2 h-2" />
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-300 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">🌟</div>
              <div className="text-2xl font-bold text-green-600">{rarityStats['Común']}</div>
              <div className="text-sm text-green-700">Medallas Comunes</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-300 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">💎</div>
              <div className="text-2xl font-bold text-purple-600">{rarityStats['Raro']}</div>
              <div className="text-sm text-purple-700">Medallas Raras</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-orange-300 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">👑</div>
              <div className="text-2xl font-bold text-orange-600">{rarityStats['Legendario']}</div>
              <div className="text-sm text-orange-700">Medallas Legendarias</div>
            </CardContent>
          </Card>
        </div>

        {/* Colección de Medallas */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-yellow-300 shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-orange-700 mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2" />
              Tu Colección
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {medals.map((medal) => (
                <div 
                  key={medal.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    medal.earned 
                      ? 'bg-gradient-to-b from-yellow-50 to-orange-50 border-yellow-300 shadow-lg transform hover:scale-105' 
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-4xl mb-3 ${!medal.earned && 'grayscale'}`}>
                      {medal.emoji}
                    </div>
                    
                    <h3 className={`font-bold mb-2 ${medal.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                      {medal.name}
                    </h3>
                    
                    <p className={`text-sm mb-3 ${medal.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                      {medal.description}
                    </p>
                    
                    <Badge className={medal.rarityColor}>
                      {medal.rarity}
                    </Badge>
                    
                    {medal.earned && (
                      <div className="mt-2">
                        <Badge className="bg-green-100 text-green-800 border-green-300">
                          <Star className="w-3 h-3 mr-1" />
                          Desbloqueada
                        </Badge>
                      </div>
                    )}
                    
                    {!medal.earned && (
                      <div className="mt-2 text-xs text-gray-500">
                        {medal.habitat === 'general' 
                          ? 'Completa más desafíos'
                          : `Completa el hábitat: ${medal.habitat}`
                        }
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progreso General */}
        <div className="text-center mt-8">
          <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                🌍 Tu Impacto Ambiental
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600">{gameProgress.completedHabitats.length}</div>
                  <div className="text-green-700">Ecosistemas Protegidos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">{gameProgress.completedHabitats.length * 3}</div>
                  <div className="text-blue-700">Amenazas Resueltas</div>
                </div>
              </div>
              <p className="text-green-700 mt-4 text-sm">
                "Cada medalla representa una diferencia real que puedes hacer en el mundo"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AchievementsScreen;
