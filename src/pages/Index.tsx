import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Menu, TreePine, Leaf, Award, Users, BookOpen, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

import AnimalQuiz from "@/components/games/AnimalQuiz";
import EcoQuiz from "@/components/games/EcoQuiz";
import EcoTetris from "@/components/games/EcoTetris";
import PlantCare from "@/components/games/PlantCare";
import PlantQuiz from "@/components/games/PlantQuiz";
import RecycleMemory from "@/components/games/RecycleMemory";
import SolarPanels from "@/components/games/SolarPanels";
import TapGame from "@/components/games/TapGame";
import TrashCatcher from "@/components/games/TrashCatcher";
import EcoPuzzle from "@/components/games/EcoPuzzle";
import EndangeredAnimals from "@/components/games/EndangeredAnimals";
import InteractiveStories from "@/components/games/InteractiveStories";
import EcoComparison from "@/components/games/EcoComparison";
import LightOffGame from "@/components/games/LightOffGame";
import AventuraSubmarina from "@/components/games/AventuraSubmarina";
import GuardianesDelHabitat from "@/components/games/GuardianesDelHabitat";

import EcoMascot from "@/components/EcoMascot";
import Footer from "@/components/Footer";
import OnboardingModal from "@/components/OnboardingModal";
import SuggestionForm from "@/components/SuggestionForm";

interface GameProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

type GameComponent = React.ComponentType<GameProps>;

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: "Fácil" | "Medio" | "Difícil";
  category: "Reciclaje" | "Naturaleza" | "Energía" | "Educación";
  component: GameComponent;
  estimatedTime: string;
  points: number;
}

const Index = () => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState(() => {
    const saved = localStorage.getItem('ecoPoints');
    return saved ? parseInt(saved) : 0;
  });
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if onboarding has been completed
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('ecoFunOnboardingCompleted');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  // Save points to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ecoPoints', userPoints.toString());
  }, [userPoints]);

  const games: Game[] = [
    {
      id: "guardianes-del-habitat",
      title: "Guardianes del Hábitat",
      description: "Rescata animales resolviendo problemas ambientales",
      icon: "🌍",
      difficulty: "Medio",
      category: "Naturaleza",
      component: GuardianesDelHabitat,
      estimatedTime: "15-25 min",
      points: 120
    },
    {
      id: "aventura-submarina",
      title: "Aventura Submarina",
      description: "Recoge plástico del océano sin dañar a los peces",
      icon: "🤿",
      difficulty: "Medio",
      category: "Reciclaje",
      component: AventuraSubmarina,
      estimatedTime: "5-10 min",
      points: 70
    },
    {
      id: "animal-quiz",
      title: "Safari Animal",
      description: "Identifica animales salvajes y aprende sobre ellos",
      icon: "🦁",
      difficulty: "Medio",
      category: "Educación",
      component: AnimalQuiz,
      estimatedTime: "5-8 min",
      points: 50
    },
    {
      id: "eco-quiz",
      title: "Quiz Ecológico",
      description: "Demuestra tus conocimientos sobre el medio ambiente",
      icon: "🌍",
      difficulty: "Medio",
      category: "Educación",
      component: EcoQuiz,
      estimatedTime: "8-12 min",
      points: 80
    },
    {
      id: "eco-tetris",
      title: "EcoTetris",
      description: "Tetris con elementos de reciclaje y sostenibilidad",
      icon: "♻️",
      difficulty: "Difícil",
      category: "Reciclaje",
      component: EcoTetris,
      estimatedTime: "10-15 min",
      points: 100
    },
    {
      id: "plant-care",
      title: "Cuidado de Plantas",
      description: "Cuida tu jardín virtual y aprende sobre el crecimiento",
      icon: "🌱",
      difficulty: "Fácil",
      category: "Naturaleza",
      component: PlantCare,
      estimatedTime: "3-5 min",
      points: 40
    },
    {
      id: "plant-quiz",
      title: "Adivina la Planta",
      description: "Identifica diferentes especies de plantas",
      icon: "🌿",
      difficulty: "Medio",
      category: "Naturaleza",
      component: PlantQuiz,
      estimatedTime: "6-10 min",
      points: 60
    },
    {
      id: "recycle-memory",
      title: "Memoria del Reciclaje",
      description: "Encuentra las parejas y aprende a reciclar correctamente",
      icon: "🗂️",
      difficulty: "Fácil",
      category: "Reciclaje",
      component: RecycleMemory,
      estimatedTime: "4-7 min",
      points: 45
    },
    {
      id: "eco-comparison",
      title: "¿Quién es más Ecológico?",
      description: "Compara personajes y elige quién hace lo correcto",
      icon: "👥",
      difficulty: "Medio",
      category: "Educación",
      component: EcoComparison,
      estimatedTime: "8-15 min",
      points: 90
    },
    {
      id: "tap-game",
      title: "Cuida el Agua",
      description: "Juego de reflejos con temática de conservación del agua",
      icon: "💧",
      difficulty: "Fácil",
      category: "Educación",
      component: TapGame,
      estimatedTime: "2-4 min",
      points: 30
    },
    {
      id: "light-off-game",
      title: "Apagá la Luz",
      description: "Apaga las luces que se prenden para ahorrar energía",
      icon: "💡",
      difficulty: "Fácil",
      category: "Energía",
      component: LightOffGame,
      estimatedTime: "3-5 min",
      points: 35
    },
    {
      id: "trash-catcher",
      title: "Atrapa Basura",
      description: "Atrapa la basura antes de que contamine el océano",
      icon: "🌊",
      difficulty: "Medio",
      category: "Reciclaje",
      component: TrashCatcher,
      estimatedTime: "5-8 min",
      points: 55
    },
    {
      id: "eco-puzzle",
      title: "Puzzle Verde",
      description: "Resuelve rompecabezas con hermosas imágenes de la naturaleza",
      icon: "🧩",
      difficulty: "Medio",
      category: "Educación",
      component: EcoPuzzle,
      estimatedTime: "8-15 min",
      points: 75
    },
    {
      id: "interactive-stories",
      title: "Cuentos Ecológicos",
      description: "Vive aventuras interactivas y toma decisiones por el planeta",
      icon: "📚",
      difficulty: "Medio",
      category: "Educación",
      component: InteractiveStories,
      estimatedTime: "10-20 min",
      points: 120
    },
    {
      id: "endangered-animals",
      title: "Salva la Fauna",
      description: "Coloca animales en peligro en sus hábitats naturales",
      icon: "🐼",
      difficulty: "Medio",
      category: "Naturaleza",
      component: EndangeredAnimals,
      estimatedTime: "10-15 min",
      points: 90
    }
  ];

  const handleGameComplete = (points: number) => {
    if (currentGame && !completedGames.includes(currentGame)) {
      setUserPoints(prev => prev + points);
      setCompletedGames(prev => [...prev, currentGame]);
      toast({
        title: "¡Juego Completado! 🎉",
        description: `Has ganado ${points} puntos. Tu planta está creciendo!`,
        duration: 3000,
      });
    }
    setCurrentGame(null);
  };

  const handleBackToMenu = () => {
    setCurrentGame(null);
  };

  const categories = ["Todos", "Reciclaje", "Naturaleza", "Energía", "Educación"];

  const filteredGames = selectedCategory === "Todos" 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  const getPlantLevel = () => {
    if (userPoints < 100) return { 
      level: 1, 
      stage: "Semilla", 
      emoji: "🌰", 
      progress: userPoints,
      description: "¡Tu aventura ecológica comienza aquí!",
      nextGoal: 100
    };
    if (userPoints < 300) return { 
      level: 2, 
      stage: "Brote", 
      emoji: "🌱", 
      progress: userPoints - 100,
      description: "¡Tu conciencia ecológica está germinando!",
      nextGoal: 300
    };
    if (userPoints < 600) return { 
      level: 3, 
      stage: "Plantita", 
      emoji: "🌿", 
      progress: userPoints - 300,
      description: "Creciendo fuerte con buenos hábitos verdes",
      nextGoal: 600
    };
    if (userPoints < 1000) return { 
      level: 4, 
      stage: "Planta", 
      emoji: "🪴", 
      progress: userPoints - 600,
      description: "¡Ya eres un verdadero guardián del planeta!",
      nextGoal: 1000
    };
    if (userPoints < 1500) return { 
      level: 5, 
      stage: "Árbol", 
      emoji: "🌳", 
      progress: userPoints - 1000,
      description: "¡Eres un ejemplo de vida sostenible!",
      nextGoal: 1500
    };
    return { 
      level: 6, 
      stage: "Bosque", 
      emoji: "🌲", 
      progress: 500,
      description: "¡Eres un EcoMaestro! Inspiras a toda la comunidad",
      nextGoal: 1500
    };
  };

  const plantLevel = getPlantLevel();
  const progressPercentage = plantLevel.level < 6 ? 
    (plantLevel.progress / (plantLevel.nextGoal - (plantLevel.level > 1 ? [0, 100, 300, 600, 1000][plantLevel.level - 2] : 0))) * 100 : 100;

  if (currentGame) {
    const game = games.find(g => g.id === currentGame);
    if (game) {
      const GameComponent = game.component;
      return <GameComponent onComplete={handleGameComplete} onBack={handleBackToMenu} />;
    }
  }

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    localStorage.setItem('ecoFunOnboardingCompleted', 'true');
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    localStorage.setItem('ecoFunOnboardingCompleted', 'true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-cyan-50">
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={handleOnboardingClose}
        onSkip={handleOnboardingSkip}
      />

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b-2 border-emerald-200 sticky top-0 z-50 shadow-lg">
        {/* MOBILE HEADER */}
        <div className="md:hidden flex items-center justify-between px-3 py-2">
          {/* SVG logo eliminado */}
          {/* El div contenedor y fondo colorido eliminado */}
          {/* Texto centrado */}
          <div className="flex-1 flex flex-col items-center justify-center px-2">
            <h1 className="text-xl font-black bg-gradient-to-r from-emerald-600 via-green-600 to-cyan-600 bg-clip-text text-transparent tracking-tight leading-none">
              EcoFun
            </h1>
            <p className="text-xs text-emerald-600 font-semibold leading-none">
              Aprende Jugando
            </p>
          </div>
          {/* Botón menú hamburguesa a la derecha */}
          <div className="flex-shrink-0 flex items-center">
            <Button
              variant="ghost"
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-8 w-8 text-emerald-700" />
            </Button>
          </div>
        </div>

        {/* DESKTOP HEADER */}
        <div className="hidden md:block">
          <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
            {/* Logo EcoFun */}
            <Link to="/" className="flex items-center space-x-3 flex-shrink-0 min-w-0">
              {/* Logo en horizontal, solo EcoFun */}
              <div className="flex flex-row items-center min-w-0 space-x-2">
                <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-emerald-600 via-green-600 to-cyan-600 bg-clip-text text-transparent tracking-tight truncate">
                  EcoFun
                </h1>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 flex-shrink min-w-0">
              <Link to="/games">
                <Button variant="ghost" className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 font-semibold">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Juegos
                </Button>
              </Link>
              <Link to="/achievements">
                <Button variant="ghost" className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 font-semibold">
                  <Award className="w-4 h-4 mr-2" />
                  Logros
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="ghost" className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 font-semibold">
                  <Users className="w-4 h-4 mr-2" />
                  Comunidad
                </Button>
              </Link>
              <Link to="/suggestions">
                <Button 
                  variant="ghost" 
                  className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 font-semibold"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Sugerencias
                </Button>
              </Link>
            </nav>

            {/* User Level (sólo emoji y puntos; en una línea y centrado verticalmente) */}
            <div className="hidden md:flex items-center space-x-2 flex-shrink-0">
              <span className="text-2xl">{plantLevel.emoji}</span>
              <span className="font-bold text-emerald-700 text-sm">{userPoints} pts</span>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden p-3 hover:bg-emerald-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-8 w-8 text-emerald-700" />
            </Button>
          </div>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-emerald-200 bg-white/95 rounded-b-lg">
              <div className="flex flex-col space-y-3">
                <div className="px-4 py-2 border-b border-emerald-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{plantLevel.emoji}</span>
                    <div>
                      <p className="font-bold text-emerald-700 text-sm">{plantLevel.stage}</p>
                      <p className="text-xs text-emerald-600">{userPoints} puntos</p>
                    </div>
                  </div>
                </div>
                <Link to="/games" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 justify-start font-semibold w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Juegos
                  </Button>
                </Link>
                <Link to="/achievements" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 justify-start font-semibold w-full">
                    <Award className="w-4 h-4 mr-2" />
                    Logros
                  </Button>
                </Link>
                <Link to="/community" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 justify-start font-semibold w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Comunidad
                  </Button>
                </Link>
                <Link to="/suggestions" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    variant="ghost" 
                    className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 justify-start font-semibold w-full"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Sugerencias
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-emerald-800 mb-4 sm:mb-6 leading-tight">
            ¡Haz Crecer tu Planta Cuidando el Planeta!
          </h2>
          <p className="text-lg sm:text-xl text-emerald-700 mb-6 sm:mb-8 leading-relaxed">
            Cada juego alimenta tu planta virtual. ¡Ve cómo crece desde una semilla hasta un hermoso bosque!
          </p>
          
          {/* Plant Progress */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-emerald-200 shadow-xl mb-8 sm:mb-12">
            <CardContent className="p-2 sm:p-6 w-full">
              <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-6 gap-4 sm:gap-0 flex-wrap max-w-full">
                {/* Semilla + etapa */}
                <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 max-w-full">
                  <div className="text-4xl sm:text-5xl flex-shrink-0">{plantLevel.emoji}</div>
                  <div className="text-left min-w-0 max-w-[80vw] sm:max-w-xs break-words">
                    <h3 className="text-lg sm:text-2xl font-bold text-emerald-700 truncate">{plantLevel.stage}</h3>
                    <p className="text-emerald-600 text-xs sm:text-base truncate">Nivel {plantLevel.level}</p>
                    {/* Ajuste para que el texto no se desborde */}
                    <p className="text-emerald-600 text-xs sm:text-sm italic break-words max-w-full whitespace-normal overflow-hidden">
                      {plantLevel.description}
                    </p>
                  </div>
                </div>
                {/* Progreso */}
                <div 
                  className="flex-1 w-full min-w-0 max-w-full sm:max-w-md"
                  style={{ maxWidth: "100vw", overflow: "hidden" }}
                >
                  <div className="flex justify-between items-center mb-2 w-full gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-semibold text-emerald-700 truncate block max-w-[100px] min-w-0 overflow-hidden">
                      {userPoints} puntos
                    </span>
                    {/* Ocultar "Meta:" en mobile, mostrar en sm+ */}
                    {plantLevel.level < 6 && (
                      <span className="hidden sm:inline text-xs sm:text-sm text-emerald-600 truncate text-right block max-w-[90px] min-w-0 overflow-hidden">
                        Meta: {plantLevel.nextGoal}
                      </span>
                    )}
                  </div>
                  <div className="w-full overflow-hidden" style={{ minWidth: 0, maxWidth: "100%" }}>
                    <Progress 
                      value={progressPercentage} 
                      className="h-3 bg-emerald-100 max-w-full overflow-hidden"
                    />
                  </div>
                  {plantLevel.level < 6 && (
                    <p className="text-xs text-emerald-600 mt-1 break-words max-w-full whitespace-normal overflow-hidden truncate block">
                      {plantLevel.nextGoal - userPoints} puntos para el siguiente nivel
                    </p>
                  )}
                </div>
                {/* Juegos completados */}
                <div className="flex flex-col items-center justify-center min-w-0">
                  <p className="text-xl sm:text-3xl font-bold text-emerald-600">{completedGames.length}</p>
                  <p className="text-xs sm:text-sm text-emerald-700 text-center">Juegos Completados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Games Section */}
      <section className="container mx-auto px-4 pb-8 sm:pb-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200
                ${selectedCategory === category 
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg scale-105' 
                  : 'border-2 border-emerald-300 text-emerald-700 hover:border-emerald-500 hover:bg-emerald-50'
                }
              `}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredGames.map((game) => (
            <Card 
              key={game.id}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white/90 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-400"
              onClick={() => setCurrentGame(game.id)}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                    {game.icon}
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-emerald-800 text-base sm:text-lg mb-1 sm:mb-2 group-hover:text-emerald-600 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-600 leading-relaxed mb-3 sm:mb-4">
                      {game.description}
                    </p>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                      <Badge 
                        variant="secondary"
                        className={`text-xs px-2 py-1 ${
                          game.difficulty === "Fácil" ? "bg-green-100 text-green-800 border-green-300" :
                          game.difficulty === "Medio" ? "bg-yellow-100 text-yellow-800 border-yellow-300" :
                          "bg-red-100 text-red-800 border-red-300"
                        }`}
                      >
                        {game.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-emerald-300 text-emerald-700">
                        {game.category}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-emerald-600">
                      <span>⏱️ {game.estimatedTime}</span>
                      <span className="font-semibold">🌱 +{game.points} pts</span>
                    </div>

                    {completedGames.includes(game.id) && (
                      <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white border-none text-xs">
                        ✓ Completado
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Suggestions Modal */}
      <SuggestionForm 
        isOpen={showSuggestions} 
        onClose={() => setShowSuggestions(false)} 
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
