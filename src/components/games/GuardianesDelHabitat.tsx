
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Star, Lock, Unlock, HelpCircle } from 'lucide-react';
import HabitatSelection from './guardianesDelHabitat/HabitatSelection';
import ExplorationScreen from './guardianesDelHabitat/ExplorationScreen';
import AnimalRescue from './guardianesDelHabitat/AnimalRescue';
import AchievementsScreen from './guardianesDelHabitat/AchievementsScreen';
import HelpScreen from './guardianesDelHabitat/HelpScreen';

interface GameProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

type GameScreen = 'menu' | 'habitat-selection' | 'exploration' | 'rescue' | 'achievements' | 'help';

interface GameProgress {
  unlockedHabitats: string[];
  completedHabitats: string[];
  earnedMedals: string[];
  totalScore: number;
}

const GuardianesDelHabitat: React.FC<GameProps> = ({ onComplete, onBack }) => {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('menu');
  const [selectedHabitat, setSelectedHabitat] = useState<string | null>(null);
  const [gameProgress, setGameProgress] = useState<GameProgress>(() => {
    const saved = localStorage.getItem('guardianesProgress');
    return saved ? JSON.parse(saved) : {
      unlockedHabitats: ['selva'], // Selva desbloqueada por defecto
      completedHabitats: [],
      earnedMedals: [],
      totalScore: 0
    };
  });

  const saveProgress = (progress: GameProgress) => {
    setGameProgress(progress);
    localStorage.setItem('guardianesProgress', JSON.stringify(progress));
  };

  const handleHabitatComplete = (habitat: string, score: number) => {
    const newProgress = {
      ...gameProgress,
      completedHabitats: [...gameProgress.completedHabitats, habitat],
      earnedMedals: [...gameProgress.earnedMedals, `${habitat}-guardian`],
      totalScore: gameProgress.totalScore + score
    };

    // Desbloquear siguiente hábitat
    const habitatOrder = ['selva', 'oceano', 'sabana', 'montana'];
    const currentIndex = habitatOrder.indexOf(habitat);
    if (currentIndex < habitatOrder.length - 1) {
      const nextHabitat = habitatOrder[currentIndex + 1];
      if (!newProgress.unlockedHabitats.includes(nextHabitat)) {
        newProgress.unlockedHabitats.push(nextHabitat);
      }
    }

    saveProgress(newProgress);
    setCurrentScreen('rescue');
  };

  const handleGameComplete = () => {
    const totalPoints = Math.max(50, gameProgress.totalScore);
    onComplete(totalPoints);
  };

  const renderContent = () => {
    switch (currentScreen) {
      case 'habitat-selection':
        return (
          <HabitatSelection
            gameProgress={gameProgress}
            onHabitatSelect={(habitat) => {
              setSelectedHabitat(habitat);
              setCurrentScreen('exploration');
            }}
            onBack={() => setCurrentScreen('menu')}
          />
        );
      case 'exploration':
        return (
          <ExplorationScreen
            habitat={selectedHabitat!}
            onComplete={(score) => handleHabitatComplete(selectedHabitat!, score)}
            onBack={() => setCurrentScreen('habitat-selection')}
            onHelp={() => setCurrentScreen('help')}
          />
        );
      case 'rescue':
        return (
          <AnimalRescue
            habitat={selectedHabitat!}
            onContinue={() => setCurrentScreen('habitat-selection')}
            onViewAchievements={() => setCurrentScreen('achievements')}
          />
        );
      case 'achievements':
        return (
          <AchievementsScreen
            gameProgress={gameProgress}
            onBack={() => setCurrentScreen('menu')}
          />
        );
      case 'help':
        return (
          <HelpScreen
            onBack={() => {
              if (selectedHabitat) {
                setCurrentScreen('exploration');
              } else {
                setCurrentScreen('menu');
              }
            }}
          />
        );
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-blue-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm border-4 border-green-300 shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-green-800 mb-4 flex items-center justify-center">
                    🌍 Guardianes del Hábitat
                  </h1>
                  <p className="text-lg text-green-700 mb-6">
                    ¡Rescata animales y protege sus hogares naturales!
                  </p>
                  <div className="text-6xl mb-4">🐒🐠🦁🐻</div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                    <h3 className="font-bold text-green-800 mb-2">Tu Progreso</h3>
                    <div className="flex justify-around text-sm">
                      <div>
                        <div className="text-2xl font-bold text-green-600">{gameProgress.completedHabitats.length}</div>
                        <div className="text-green-700">Hábitats Salvados</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-600">{gameProgress.earnedMedals.length}</div>
                        <div className="text-yellow-700">Medallas Ganadas</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{gameProgress.totalScore}</div>
                        <div className="text-blue-700">Puntos Totales</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <Button
                    onClick={() => setCurrentScreen('habitat-selection')}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-xl text-lg h-auto"
                  >
                    🎮 Jugar
                  </Button>
                  <Button
                    onClick={() => setCurrentScreen('achievements')}
                    variant="outline"
                    className="border-yellow-400 text-yellow-700 hover:bg-yellow-50 font-bold py-4 px-6 rounded-xl text-lg h-auto"
                  >
                    🏅 Logros
                  </Button>
                  <Button
                    onClick={() => setCurrentScreen('help')}
                    variant="outline"
                    className="border-blue-400 text-blue-700 hover:bg-blue-50 font-bold py-4 px-6 rounded-xl text-lg h-auto"
                  >
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Ayuda
                  </Button>
                  {gameProgress.completedHabitats.length === 4 && (
                    <Button
                      onClick={handleGameComplete}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl text-lg h-auto"
                    >
                      <Trophy className="w-5 h-5 mr-2" />
                      ¡Completar Juego!
                    </Button>
                  )}
                </div>

                <Button
                  onClick={onBack}
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a Juegos
                </Button>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return renderContent();
};

export default GuardianesDelHabitat;
