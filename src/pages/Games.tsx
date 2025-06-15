
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Zap, ArrowLeft, Home, Award, Users, Heart } from 'lucide-react';
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
import EcoPlatformer from '@/components/games/EcoPlatformer';
import EcoComparison from '@/components/games/EcoComparison';
import InteractiveStories from '@/components/games/InteractiveStories';
import LightOffGame from '@/components/games/LightOffGame';
import { toast } from "@/hooks/use-toast";

const Games = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState(() => {
    const saved = localStorage.getItem('ecoPoints');
    return saved ? parseInt(saved) : 0;
  });

  const games = [
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
      id: 'eco-platformer',
      title: 'Aventura Ecológica',
      description: 'Salta y corre mientras limpias el medio ambiente',
      icon: '🏃',
      difficulty: 'Medio',
      points: '25-90 pts',
      category: 'Aventura',
      component: EcoPlatformer
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header con navegación */}
        <div className="bg-white/90 backdrop-blur-sm border-2 border-green-200 rounded-lg shadow-lg mb-6 p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" className="border-green-400 text-green-700 hover:bg-green-50">
                  <Home className="w-4 h-4 mr-2" />
                  Inicio
                </Button>
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-green-800">
                🎮 Juegos Ecológicos
              </h1>
            </div>
            
            {/* Tu planta y puntos */}
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 px-4 py-2 rounded-lg flex items-center space-x-2">
                <span className="text-2xl">{plantLevel.emoji}</span>
                <div>
                  <p className="font-bold text-green-800 text-sm">{plantLevel.stage}</p>
                  <p className="text-green-600 text-xs">{userPoints} puntos</p>
                </div>
              </div>
            </div>
            
            {/* Navegación adicional */}
            <div className="flex flex-wrap gap-2">
              <Link to="/achievements">
                <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-900 hover:bg-green-100">
                  <Award className="w-4 h-4 mr-1" />
                  Logros
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-900 hover:bg-green-100">
                  <Users className="w-4 h-4 mr-1" />
                  Comunidad
                </Button>
              </Link>
              <Link to="/suggestions">
                <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-900 hover:bg-green-100">
                  <Heart className="w-4 h-4 mr-1" />
                  Sugerencias
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-xl text-gray-600 mb-6">
            ¡Haz crecer tu planta jugando y cuidando el medio ambiente!
          </p>
          
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-200 max-w-md mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-4">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold text-green-700">{userPoints}</p>
                  <p className="text-sm text-gray-600">Puntos Eco</p>
                </div>
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <Card 
              key={game.id}
              className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-green-300 transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl"
              onClick={() => setSelectedGame(game.id)}
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{game.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {game.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {game.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={getDifficultyColor(game.difficulty)}>
                      {game.difficulty}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {getCategoryIcon(game.category)} {game.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">
                      🌱 {game.points}
                    </span>
                    <Zap className="w-4 h-4 text-yellow-500" />
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold"
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

        <div className="text-center mt-12">
          <Card className="bg-green-100/80 backdrop-blur-sm border-2 border-green-300 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                🌱 ¡Haz crecer tu planta!
              </h3>
              <p className="text-green-700 mb-4">
                Cada juego que completes alimenta tu planta virtual. Observa cómo crece desde una semilla hasta convertirse en un hermoso bosque.
              </p>
              <div className="flex justify-center space-x-2">
                <span className="animate-bounce">🌰</span>
                <span className="animate-bounce delay-100">🌱</span>
                <span className="animate-bounce delay-200">🌿</span>
                <span className="animate-bounce delay-300">🪴</span>
                <span className="animate-bounce delay-400">🌳</span>
                <span className="animate-bounce delay-500">🌲</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Games;
