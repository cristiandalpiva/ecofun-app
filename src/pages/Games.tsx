import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Zap, ArrowLeft, Home, Award, Users, Heart, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import EcoTetris from '@/components/games/EcoTetris';
import EcoQuiz from '@/components/games/EcoQuiz';
import RecycleMemory from '@/components/games/RecycleMemory';
import EcoPuzzle from '@/components/games/EcoPuzzle';
import TapGame from '@/components/games/TapGame';
import TrashCatcher from '@/components/games/TrashCatcher';
import PlantCare from '@/components/games/PlantCare';
import PlantQuiz from '@/components/games/PlantQuiz';
import AnimalQuiz from '@/components/games/AnimalQuiz';
import EndangeredAnimals from '@/components/games/EndangeredAnimals';
import EcoComparison from '@/components/games/EcoComparison';
import InteractiveStories from '@/components/games/InteractiveStories';
import LightOffGame from '@/components/games/LightOffGame';
import AventuraSubmarina from '@/components/games/AventuraSubmarina';
import GuardianesDelHabitat from '@/components/games/GuardianesDelHabitat';
import { toast } from "@/hooks/use-toast";

const Games = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState(() => {
    const saved = localStorage.getItem('ecoPoints');
    return saved ? parseInt(saved) : 0;
  });

  // Text-to-speech function
  const readText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const games = [
    {
      id: 'guardianes-del-habitat',
      title: 'Guardianes del Hábitat',
      description: 'Rescata animales resolviendo problemas ambientales',
      icon: '🌍',
      difficulty: 'Medio',
      points: '50-200 pts',
      category: 'Aventura',
      component: GuardianesDelHabitat
    },
    {
      id: 'aventura-submarina',
      title: 'Aventura Submarina',
      description: 'Recoge plástico del océano sin dañar a los peces',
      icon: '🤿',
      difficulty: 'Medio',
      points: '20-100 pts',
      category: 'Aventura',
      component: AventuraSubmarina
    },
    {
      id: 'eco-quiz',
      title: 'Quiz Ecológico',
      description: 'Pon a prueba tus conocimientos sobre el medio ambiente',
      icon: '🧠',
      difficulty: 'Fácil',
      points: '10-50 pts',
      category: 'Educativo',
      component: EcoQuiz
    },
    {
      id: 'eco-tetris',
      title: 'Eco Tetris',
      description: 'Organiza residuos reciclables en este divertido Tetris ecológico',
      icon: '🎮',
      difficulty: 'Medio',
      points: '20-100 pts',
      category: 'Reciclaje',
      component: EcoTetris
    },
    {
      id: 'recycle-memory',
      title: 'Memoria del Reciclaje',
      description: 'Encuentra las parejas de materiales reciclables',
      icon: '🧩',
      difficulty: 'Fácil',
      points: '15-60 pts',
      category: 'Reciclaje',
      component: RecycleMemory
    },
    {
      id: 'eco-puzzle',
      title: 'Rompecabezas Verde',
      description: 'Arma hermosas imágenes de la naturaleza',
      icon: '🧩',
      difficulty: 'Medio',
      points: '25-75 pts',
      category: 'Rompecabezas',
      component: EcoPuzzle
    },
    {
      id: 'tap-game',
      title: 'Cuida el Agua',
      description: 'Juego de reflejos con temática de conservación del agua',
      icon: '💧',
      difficulty: 'Fácil',
      points: '10-40 pts',
      category: 'Reflejos',
      component: TapGame
    },
    {
      id: 'light-off-game',
      title: 'Apagá la Luz',
      description: 'Apaga las luces que se prenden para ahorrar energía',
      icon: '💡',
      difficulty: 'Fácil',
      points: '15-50 pts',
      category: 'Reflejos',
      component: LightOffGame
    },
    {
      id: 'trash-catcher',
      title: 'Atrapa la Basura',
      description: 'Atrapa los residuos antes de que contaminen el océano',
      icon: '🌊',
      difficulty: 'Medio',
      points: '20-80 pts',
      category: 'Acción',
      component: TrashCatcher
    },
    {
      id: 'plant-care',
      title: 'Cuidado de Plantas',
      description: 'Cuida tu jardín virtual y aprende sobre las plantas',
      icon: '🌱',
      difficulty: 'Fácil',
      points: '15-50 pts',
      category: 'Plantas',
      component: PlantCare
    },
    {
      id: 'plant-quiz',
      title: 'Quiz de Plantas',
      description: 'Demuestra cuánto sabes sobre el reino vegetal',
      icon: '🌿',
      difficulty: 'Medio',
      points: '20-70 pts',
      category: 'Plantas',
      component: PlantQuiz
    },
    {
      id: 'animal-quiz',
      title: 'Quiz de Animales',
      description: 'Aprende sobre la fauna y su conservación',
      icon: '🦆',
      difficulty: 'Medio',
      points: '20-70 pts',
      category: 'Animales',
      component: AnimalQuiz
    },
    {
      id: 'endangered-animals',
      title: 'Animales en Peligro',
      description: 'Conoce y protege especies en peligro de extinción',
      icon: '🐅',
      difficulty: 'Medio',
      points: '25-80 pts',
      category: 'Animales',
      component: EndangeredAnimals
    },
    {
      id: 'eco-comparison',
      title: '¿Quién es más Ecológico?',
      description: 'Compara personajes y elige quién hace lo correcto',
      icon: '👥',
      difficulty: 'Medio',
      points: '30-120 pts',
      category: 'Comparación',
      component: EcoComparison
    },
    {
      id: 'interactive-stories',
      title: 'Cuentos Ecológicos Interactivos',
      description: 'Vive aventuras ecológicas y toma decisiones importantes',
      icon: '📚',
      difficulty: 'Medio',
      points: '30-150 pts',
      category: 'Historias',
      component: InteractiveStories
    }
  ];

  const handleGameComplete = (points: number) => {
    const newTotal = userPoints + points;
    setUserPoints(newTotal);
    localStorage.setItem('ecoPoints', newTotal.toString());
    
    toast({
      title: "¡Juego completado! 🎉",
      description: `Has ganado ${points} puntos. ¡Tu planta está creciendo! Total: ${newTotal} puntos`,
    });
    
    setSelectedGame(null);
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-800';
      case 'Medio': return 'bg-yellow-100 text-yellow-800';
      case 'Difícil': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Educativo': return '📚';
      case 'Reciclaje': return '♻️';
      case 'Rompecabezas': return '🧩';
      case 'Reflejos': return '⚡';
      case 'Acción': return '🎯';
      case 'Plantas': return '🌱';
      case 'Animales': return '🦎';
      case 'Aventura': return '🗺️';
      case 'Comparación': return '⚖️';
      case 'Historias': return '📖';
      default: return '🎮';
    }
  };

  // Obtener el nivel de la planta
  const getPlantLevel = () => {
    if (userPoints < 100) return { emoji: "🌰", stage: "Semilla" };
    if (userPoints < 300) return { emoji: "🌱", stage: "Brote" };
    if (userPoints < 600) return { emoji: "🌿", stage: "Plantita" };
    if (userPoints < 1000) return { emoji: "🪴", stage: "Planta" };
    if (userPoints < 1500) return { emoji: "🌳", stage: "Árbol" };
    return { emoji: "🌲", stage: "Bosque" };
  };

  const plantLevel = getPlantLevel();

  if (selectedGame) {
    const game = games.find(g => g.id === selectedGame);
    if (game) {
      const GameComponent = game.component;
      return (
        <GameComponent 
          onComplete={handleGameComplete}
          onBack={handleBackToGames}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header con navegación */}
        <div className="bg-white/90 backdrop-blur-sm border-2 border-green-200 rounded-lg shadow-lg mb-4 sm:mb-6 p-3 sm:p-4">
          <div className="flex flex-col space-y-4">
            {/* Primera fila: Título y botón de lectura */}
            <div className="flex items-center justify-between">
              <Link to="/" className="flex-shrink-0">
                <Button variant="outline" className="border-green-400 text-green-700 hover:bg-green-50 text-xs sm:text-sm">
                  <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Inicio</span>
                </Button>
              </Link>
              
              <div className="flex items-center space-x-2 flex-1 justify-center">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-800">
                  🎮 Juegos Ecológicos
                </h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => readText("Juegos Ecológicos. Haz crecer tu planta jugando y cuidando el medio ambiente")}
                  className="text-green-600 hover:text-green-800 p-1"
                >
                  <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>

              <div className="flex-shrink-0 w-16 sm:w-20"></div>
            </div>

            {/* Segunda fila: Tu planta y puntos */}
            <div className="flex items-center justify-center">
              <div className="bg-green-100 px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-2">
                <span className="text-xl sm:text-2xl">{plantLevel.emoji}</span>
                <div>
                  <p className="font-bold text-green-800 text-xs sm:text-sm">{plantLevel.stage}</p>
                  <p className="text-green-600 text-xs">{userPoints} puntos</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => readText(`Tu planta es ${plantLevel.stage} con ${userPoints} puntos`)}
                  className="text-green-600 hover:text-green-800 p-1"
                >
                  <Volume2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            {/* Tercera fila: Navegación adicional */}
            <div className="flex flex-wrap justify-center gap-2">
              <Link to="/achievements">
                <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-900 hover:bg-green-100 text-xs sm:text-sm">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Logros
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-900 hover:bg-green-100 text-xs sm:text-sm">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Comunidad
                </Button>
              </Link>
              <Link to="/suggestions">
                <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-900 hover:bg-green-100 text-xs sm:text-sm">
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Sugerencias
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
            <p className="text-lg sm:text-xl text-gray-600">
              ¡Haz crecer tu planta jugando y cuidando el medio ambiente!
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => readText("¡Haz crecer tu planta jugando y cuidando el medio ambiente!")}
              className="text-gray-600 hover:text-gray-800 p-1"
            >
              <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
          
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-200 max-w-sm sm:max-w-md mx-auto">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-center space-x-4">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-green-700">{userPoints}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Puntos Eco</p>
                </div>
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {games.map((game) => (
            <Card 
              key={game.id}
              className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-green-300 transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl"
              onClick={() => setSelectedGame(game.id)}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="text-center mb-3 sm:mb-4">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{game.icon}</div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <h3 className="text-base sm:text-xl font-bold text-gray-800">
                      {game.title}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        readText(`${game.title}. ${game.description}. Dificultad ${game.difficulty}. ${game.points}`);
                      }}
                      className="text-gray-600 hover:text-gray-800 p-1"
                    >
                      <Volume2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    {game.description}
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={`${getDifficultyColor(game.difficulty)} text-xs`}>
                      {game.difficulty}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {getCategoryIcon(game.category)} {game.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-green-600">
                      🌱 {game.points}
                    </span>
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm py-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGame(game.id);
                    }}
                  >
                    ¡Jugar Ahora!
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Card className="bg-green-100/80 backdrop-blur-sm border-2 border-green-300 max-w-xl sm:max-w-2xl mx-auto">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-2xl font-bold text-green-800">
                  🌱 ¡Haz crecer tu planta!
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => readText("¡Haz crecer tu planta! Cada juego que completes alimenta tu planta virtual. Observa cómo crece desde una semilla hasta convertirse en un hermoso bosque.")}
                  className="text-green-600 hover:text-green-800 p-1"
                >
                  <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
              <p className="text-green-700 mb-3 sm:mb-4 text-sm sm:text-base">
                Cada juego que completes alimenta tu planta virtual. Observa cómo crece desde una semilla hasta convertirse en un hermoso bosque.
              </p>
              <div className="flex justify-center space-x-1 sm:space-x-2">
                <span className="animate-bounce text-lg sm:text-xl">🌰</span>
                <span className="animate-bounce delay-100 text-lg sm:text-xl">🌱</span>
                <span className="animate-bounce delay-200 text-lg sm:text-xl">🌿</span>
                <span className="animate-bounce delay-300 text-lg sm:text-xl">🪴</span>
                <span className="animate-bounce delay-400 text-lg sm:text-xl">🌳</span>
                <span className="animate-bounce delay-500 text-lg sm:text-xl">🌲</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Games;
