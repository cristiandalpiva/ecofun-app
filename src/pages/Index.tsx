
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CircleCheck, 
  Gamepad, 
  Puzzle, 
  CirclePlus,
  Lightbulb
} from "lucide-react";
import EcoMascot from "@/components/EcoMascot";
import EcoQuiz from "@/components/games/EcoQuiz";
import EcoPuzzle from "@/components/games/EcoPuzzle";
import RecycleMemory from "@/components/games/RecycleMemory";
import OnboardingModal from "@/components/OnboardingModal";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [points, setPoints] = useState(150);
  const [plantStage, setPlantStage] = useState(1);
  const [completedChallenges, setCompletedChallenges] = useState([0, 2]);
  const [badges, setBadges] = useState(["🌱", "💡"]);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const plantStages = [
    { name: "Semilla", emoji: "🌰", minPoints: 0 },
    { name: "Brote", emoji: "🌱", minPoints: 100 },
    { name: "Plantita", emoji: "🌿", minPoints: 300 },
    { name: "Planta", emoji: "🪴", minPoints: 600 },
    { name: "Árbol", emoji: "🌳", minPoints: 1000 }
  ];

  const dailyTips = [
    "💡 ¿Sabías que reciclar una lata de aluminio puede ahorrar energía para encender una TV por 3 horas?",
    "🌊 Una ducha de 5 minutos usa menos agua que llenar la bañera. ¡Pídele a un adulto que te ayude a medir el tiempo!",
    "🌱 Las plantas son como pequeñas fábricas que limpian el aire. ¡Cuida las que tienes en casa!",
    "⚡ Apagar las luces que no usas es como darle un descanso al planeta. ¡Pregunta a un adulto cuáles puedes apagar!",
    "♻️ Separar la basura ayuda a que los materiales tengan una segunda vida. ¡Es como magia para el planeta!",
    "🚶‍♀️ Caminar es genial para tu salud y para el aire que respiramos. ¡Siempre acompañado de un adulto!",
    "📄 Usar ambos lados del papel es como duplicar los árboles. ¡Cada hoja cuenta!"
  ];

  const [todaysTip] = useState(dailyTips[new Date().getDay()]);

  const weeklyAchievements = [
    { 
      id: 0, 
      title: "Apaga 3 luces que no uses", 
      description: "Durante la semana, apaga 3 veces las luces de habitaciones vacías (pregúntale a un adulto si tienes dudas)", 
      points: 50, 
      completed: true 
    },
    { 
      id: 1, 
      title: "Reutiliza papel 2 veces", 
      description: "Usa el otro lado de 2 hojas de papel para dibujar, hacer aviones o practicar escritura", 
      points: 30, 
      completed: false 
    },
    { 
      id: 2, 
      title: "Cuida una planta por 3 días", 
      description: "Riégala o ayuda a sembrar una semilla durante 3 días seguidos con ayuda de un adulto", 
      points: 40, 
      completed: true 
    },
    { 
      id: 3, 
      title: "Separa 5 residuos correctamente", 
      description: "Pon 5 cosas diferentes en su lugar correcto: papel, plástico, orgánico (pide ayuda si no sabes)", 
      points: 60, 
      completed: false 
    },
    { 
      id: 4, 
      title: "Camina 2 veces en la semana", 
      description: "Ve caminando a 2 lugares cercanos acompañado de mamá, papá o un adulto de confianza", 
      points: 35, 
      completed: false 
    },
  ];

  const games = [
    { id: "quiz", title: "EcoQuiz", description: "Responde preguntas ecológicas", icon: "🧠", color: "bg-green-400" },
    { id: "puzzle", title: "Puzzle Verde", description: "Arma paisajes naturales", icon: "🧩", color: "bg-blue-400" },
    { id: "memory", title: "Memoria Reciclaje", description: "Encuentra pares de basura iguales", icon: "♻️", color: "bg-yellow-400" },
  ];

  // Check if first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('ecoheroes-onboarding-complete');
    if (!hasVisited) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    localStorage.setItem('ecoheroes-onboarding-complete', 'true');
  };

  // Update plant stage based on points
  useEffect(() => {
    const newStage = plantStages.findIndex(stage => points >= stage.minPoints && points < (plantStages[plantStages.findIndex(s => s === stage) + 1]?.minPoints || Infinity));
    if (newStage !== -1 && newStage !== plantStage) {
      setPlantStage(newStage);
      if (newStage > plantStage) {
        toast({
          title: "¡Tu planta creció! 🌱",
          description: `Ahora tienes ${plantStages[newStage].name} ${plantStages[newStage].emoji}`,
        });
      }
    }
  }, [points]);

  const completeChallenge = (challengeId: number) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);
      const challenge = weeklyAchievements.find(c => c.id === challengeId);
      if (challenge) {
        setPoints(points + challenge.points);
        toast({
          title: "¡Felicitaciones! 🎉",
          description: `Completaste: ${challenge.title}. +${challenge.points} puntos`,
        });
        
        // Add new badge every 2 challenges
        if ((completedChallenges.length + 1) % 2 === 0) {
          const newBadges = ["🌍", "🌳", "🔋", "🚶‍♂️"];
          const nextBadge = newBadges[Math.floor((completedChallenges.length + 1) / 2) - 1];
          if (nextBadge && !badges.includes(nextBadge)) {
            setBadges([...badges, nextBadge]);
          }
        }
      }
    }
  };

  const uncompleteChallenge = (challengeId: number) => {
    if (completedChallenges.includes(challengeId)) {
      setCompletedChallenges(completedChallenges.filter(id => id !== challengeId));
      const challenge = weeklyAchievements.find(c => c.id === challengeId);
      if (challenge) {
        setPoints(Math.max(0, points - challenge.points));
        toast({
          title: "Reto desmarcado",
          description: `${challenge.title} fue desmarcado. -${challenge.points} puntos`,
        });
      }
    }
  };

  const playGame = (gameId: string) => {
    setCurrentGame(gameId);
  };

  const onGameComplete = (gamePoints: number) => {
    setPoints(points + gamePoints);
    setCurrentGame(null);
    toast({
      title: "¡Excelente! 🌟",
      description: `¡Ganaste ${gamePoints} puntos ecológicos!`,
    });
  };

  if (currentGame === "quiz") {
    return <EcoQuiz onComplete={onGameComplete} onBack={() => setCurrentGame(null)} />;
  }

  if (currentGame === "puzzle") {
    return <EcoPuzzle onComplete={onGameComplete} onBack={() => setCurrentGame(null)} />;
  }

  if (currentGame === "memory") {
    return <RecycleMemory onComplete={onGameComplete} onBack={() => setCurrentGame(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-yellow-100">
      <OnboardingModal isOpen={showOnboarding} onClose={handleOnboardingClose} />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <EcoMascot size="large" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">¡Hola, EcoHéroe!</h1>
              <p className="text-green-100 text-sm sm:text-base">{plantStages[plantStage].name} {plantStages[plantStage].emoji} • {points} puntos</p>
            </div>
          </div>
          <div className="flex space-x-2">
            {badges.map((badge, index) => (
              <div key={index} className="text-2xl sm:text-3xl animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Daily Tip */}
        <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 hover:border-yellow-400 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Lightbulb className="text-yellow-600 w-6 h-6 flex-shrink-0" />
              <div className="min-w-0">
                <h3 className="font-bold text-yellow-800 mb-1">Consejo del Día</h3>
                <p className="text-yellow-700 text-sm">{todaysTip}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Bar */}
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-200 hover:border-green-300 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-green-700">Progreso de tu Planta</span>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{plantStages[plantStage].emoji}</span>
                <span className="text-sm text-green-600">{plantStages[plantStage].name}</span>
              </div>
            </div>
            <Progress 
              value={plantStage < plantStages.length - 1 
                ? ((points - plantStages[plantStage].minPoints) / (plantStages[plantStage + 1].minPoints - plantStages[plantStage].minPoints)) * 100
                : 100
              } 
              className="h-3" 
            />
            {plantStage < plantStages.length - 1 && (
              <p className="text-xs text-gray-500 mt-1">
                {plantStages[plantStage + 1].minPoints - points} puntos para {plantStages[plantStage + 1].name}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Weekly Challenges */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-4 flex items-center">
            <CirclePlus className="mr-2" />
            Retos de la Semana
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {weeklyAchievements.map((challenge) => (
              <Card 
                key={challenge.id} 
                className={`transition-all duration-300 hover:scale-105 cursor-pointer border-2 shadow-lg group ${
                  completedChallenges.includes(challenge.id) 
                    ? 'bg-green-100 border-green-300 shadow-green-200 hover:bg-green-200 hover:border-green-400 hover:shadow-green-300' 
                    : 'bg-white border-gray-200 hover:border-green-400 hover:bg-green-50 hover:shadow-xl'
                }`}
                onClick={() => completedChallenges.includes(challenge.id) 
                  ? uncompleteChallenge(challenge.id) 
                  : completeChallenge(challenge.id)
                }
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-bold text-sm sm:text-base transition-colors duration-200 ${
                      completedChallenges.includes(challenge.id) 
                        ? 'text-green-800 group-hover:text-green-900' 
                        : 'text-gray-800 group-hover:text-green-700'
                    }`}>
                      {challenge.title}
                    </h3>
                    {completedChallenges.includes(challenge.id) ? (
                      <CircleCheck className="text-green-500 w-6 h-6 flex-shrink-0 group-hover:text-green-600" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex-shrink-0 group-hover:border-green-400 transition-colors duration-200"></div>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 group-hover:text-gray-700">{challenge.description}</p>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border border-yellow-300 group-hover:bg-yellow-200 transition-colors duration-200">
                    +{challenge.points} puntos
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Games Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 flex items-center">
            <Gamepad className="mr-2" />
            Juegos Ecológicos
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <Card 
                key={game.id}
                className="transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-gray-200 hover:border-blue-400 shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white hover:shadow-2xl group"
                onClick={() => playGame(game.id)}
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 ${game.color} rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    {game.icon}
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-200">{game.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 group-hover:text-gray-700">{game.description}</p>
                  <Button className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold px-4 sm:px-6 py-2 rounded-full shadow-lg transition-all duration-300 text-sm sm:text-base hover:scale-105 hover:shadow-xl">
                    ¡Jugar!
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        <Card className="bg-gradient-to-r from-purple-400 to-pink-400 text-white border-none shadow-xl hover:shadow-2xl hover:scale-102 transition-all duration-300">
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="text-3xl sm:text-4xl mb-3">🌟</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">¡Eres un verdadero EcoHéroe!</h3>
            <p className="text-purple-100 text-sm sm:text-base">Cada acción cuenta para cuidar nuestro planeta. ¡Sigue así!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
