import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CircleCheck, 
  Gamepad, 
  Puzzle, 
  CirclePlus 
} from "lucide-react";
import EcoMascot from "@/components/EcoMascot";
import EcoQuiz from "@/components/games/EcoQuiz";
import EcoPuzzle from "@/components/games/EcoPuzzle";
import RecycleMemory from "@/components/games/RecycleMemory";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [points, setPoints] = useState(150);
  const [level, setLevel] = useState(2);
  const [completedChallenges, setCompletedChallenges] = useState([0, 2]);
  const [badges, setBadges] = useState(["🌱", "💡"]);

  const weeklyAchievements = [
    { 
      id: 0, 
      title: "Apaga luces que no uses", 
      description: "Cuando salgas de tu cuarto o no las necesites (pregúntale a un adulto si tienes dudas)", 
      points: 50, 
      completed: true 
    },
    { 
      id: 1, 
      title: "Reutiliza papel usado", 
      description: "Usa el otro lado para dibujar, hacer aviones de papel o practicar escritura", 
      points: 30, 
      completed: false 
    },
    { 
      id: 2, 
      title: "Cuida una planta", 
      description: "Riégala con ayuda de un adulto o ayuda a sembrar una semillita", 
      points: 40, 
      completed: true 
    },
    { 
      id: 3, 
      title: "Separa los residuos", 
      description: "Pon cada cosa en su lugar: papel, plástico, orgánico (pide ayuda si no sabes)", 
      points: 60, 
      completed: false 
    },
    { 
      id: 4, 
      title: "Camina con un adulto", 
      description: "Ve caminando a lugares cercanos acompañado de mamá, papá o un adulto de confianza", 
      points: 35, 
      completed: false 
    },
  ];

  const games = [
    { id: "quiz", title: "EcoQuiz", description: "Responde preguntas ecológicas", icon: "🧠", color: "bg-green-400" },
    { id: "puzzle", title: "Puzzle Verde", description: "Arma paisajes naturales", icon: "🧩", color: "bg-blue-400" },
    { id: "memory", title: "Memoria Reciclaje", description: "Basura en su lugar", icon: "♻️", color: "bg-yellow-400" },
  ];

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
      {/* Header */}
      <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <EcoMascot size="large" />
            <div>
              <h1 className="text-2xl font-bold">¡Hola, EcoHéroe!</h1>
              <p className="text-green-100">Nivel {level} • {points} puntos</p>
            </div>
          </div>
          <div className="flex space-x-2">
            {badges.map((badge, index) => (
              <div key={index} className="text-3xl animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Progress Bar */}
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-green-700">Progreso Semanal</span>
              <span className="text-sm text-green-600">{completedChallenges.length}/5 retos</span>
            </div>
            <Progress value={(completedChallenges.length / 5) * 100} className="h-3" />
          </CardContent>
        </Card>

        {/* Weekly Challenges */}
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
            <CirclePlus className="mr-2" />
            Retos de la Semana
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {weeklyAchievements.map((challenge) => (
              <Card 
                key={challenge.id} 
                className={`transition-all duration-300 hover:scale-105 cursor-pointer border-2 ${
                  completedChallenges.includes(challenge.id) 
                    ? 'bg-green-100 border-green-300 shadow-green-200' 
                    : 'bg-white border-gray-200 hover:border-green-300'
                } shadow-lg`}
                onClick={() => completeChallenge(challenge.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-800">{challenge.title}</h3>
                    {completedChallenges.includes(challenge.id) ? (
                      <CircleCheck className="text-green-500 w-6 h-6" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    +{challenge.points} puntos
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Games Section */}
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
            <Gamepad className="mr-2" />
            Juegos Ecológicos
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {games.map((game) => (
              <Card 
                key={game.id}
                className="transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-gray-200 hover:border-blue-300 shadow-lg bg-white/90 backdrop-blur-sm"
                onClick={() => playGame(game.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 ${game.color} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                    {game.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{game.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{game.description}</p>
                  <Button className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300">
                    ¡Jugar!
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        <Card className="bg-gradient-to-r from-purple-400 to-pink-400 text-white border-none shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-3">🌟</div>
            <h3 className="text-xl font-bold mb-2">¡Eres un verdadero EcoHéroe!</h3>
            <p className="text-purple-100">Cada acción cuenta para cuidar nuestro planeta. ¡Sigue así!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
