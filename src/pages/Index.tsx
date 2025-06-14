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
  Lightbulb,
  BookOpen,
  Menu,
  X,
  HelpCircle,
  Users,
  MessageSquare,
  Volume2,
  VolumeX,
  Play,
  Pause
} from "lucide-react";
import EcoMascot from "@/components/EcoMascot";
import EcoQuiz from "@/components/games/EcoQuiz";
import EcoPuzzle from "@/components/games/EcoPuzzle";
import RecycleMemory from "@/components/games/RecycleMemory";
import OnboardingModal from "@/components/OnboardingModal";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [points, setPoints] = useState(150);
  const [plantStage, setPlantStage] = useState(1);
  const [completedChallenges, setCompletedChallenges] = useState([0, 2]);
  const [badges, setBadges] = useState(["🌱", "💡"]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showEducationalContent, setShowEducationalContent] = useState(false);
  const [currentEducationalTopic, setCurrentEducationalTopic] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  const plantStages = [
    { name: "Semilla", emoji: "🌰", minPoints: 0 },
    { name: "Brote", emoji: "🌱", minPoints: 100 },
    { name: "Plantita", emoji: "🌿", minPoints: 300 },
    { name: "Planta", emoji: "🪴", minPoints: 600 },
    { name: "Árbol", emoji: "🌳", minPoints: 1000 }
  ];

  const educationalTopics = [
    {
      id: 0,
      title: "Cuidado del Agua",
      icon: "💧",
      content: "El agua es muy importante para todos los seres vivos. ¡Imagínate que eres detective del agua! Tu misión es encontrar todas las formas de no desperdiciarla. Puedes cerrar la llave mientras te lavas los dientes, tomar duchas más cortas, y usar el agua de lluvia para regar las plantas. ¡Cada gota cuenta para nuestro planeta!",
      tip: "¿Sabías que una llave que gotea puede desperdiciar hasta 15 litros de agua al día? ¡Eso es como llenar 15 botellas de agua!"
    },
    {
      id: 1,
      title: "Protección de Animales",
      icon: "🐘",
      content: "Los animales son nuestros amigos del planeta y necesitan nuestra ayuda. Algunos animales como los elefantes, pandas y tortugas marinas están en peligro. Podemos ayudarlos no tirando basura en la naturaleza, respetando sus hogares y aprendiendo sobre ellos. ¡Puedes ser guardianes de los animales!",
      tip: "Las tortugas marinas confunden las bolsas de plástico con medusas y se las comen. ¡Por eso es importante reciclar el plástico!"
    },
    {
      id: 2,
      title: "Reducir la Contaminación",
      icon: "🌍",
      content: "La contaminación es como cuando ensuciamos nuestro planeta. Podemos ser superhéroes anti-contaminación usando menos plástico, caminando más en lugar de usar el auto, y separando bien la basura. Cada vez que reciclas o caminas, ¡estás luchando contra la contaminación!",
      tip: "Un auto produce aproximadamente su propio peso en contaminación cada año. ¡Caminar es súper poder para el planeta!"
    },
    {
      id: 3,
      title: "Cuidado de las Plantas",
      icon: "🌱",
      content: "Las plantas son como las fábricas de oxígeno del planeta. Nos dan el aire que respiramos y hacen que todo se vea hermoso. Podemos cuidarlas regándolas, no cortando flores sin permiso, y sembrando nuevas plantas. ¡Cada planta es un pequeño héroe verde!",
      tip: "Un árbol grande puede producir oxígeno para 2 personas durante todo un día. ¡Las plantas son nuestras mejores amigas!"
    },
    {
      id: 4,
      title: "Ahorro de Energía",
      icon: "💡",
      content: "La energía es como la comida de nuestras casas. Podemos ser detectives de la energía apagando las luces que no usamos, desconectando aparatos que no necesitamos, y usando la luz del sol siempre que podamos. ¡Ahorrar energía es como darle un abrazo al planeta!",
      tip: "Dejar un televisor encendido toda la noche gasta la misma energía que 100 focos LED. ¡Recuerda apagarlo antes de dormir!"
    }
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
    {
      id: 5,
      title: "Lee y escucha contenido educativo",
      description: "Explora y aprende sobre un tema ambiental con ayuda de un adulto. ¡Descubre datos increíbles!",
      points: 45,
      completed: false
    },
  ];

  const games = [
    { id: "quiz", title: "EcoQuiz", description: "Responde preguntas ecológicas", icon: "🧠", color: "bg-green-400" },
    { id: "puzzle", title: "Puzzle Verde", description: "Arma paisajes naturales", icon: "🧩", color: "bg-blue-400" },
    { id: "memory", title: "Memoria Reciclaje", description: "Encuentra pares de basura iguales", icon: "♻️", color: "bg-yellow-400" },
  ];

  const menuItems = [
    { 
      id: "about", 
      title: "Acerca de Nosotros", 
      icon: Users, 
      action: () => {
        toast({
          title: "Acerca de EcoFun",
          description: "Somos una plataforma educativa que enseña a cuidar el planeta de forma divertida.",
        });
        setShowMenu(false);
      }
    },
    { 
      id: "help", 
      title: "Ayuda", 
      icon: HelpCircle, 
      action: () => {
        toast({
          title: "¿Necesitas ayuda?",
          description: "Completa los retos semanales y juega para ganar puntos. ¡Pide ayuda a un adulto si tienes dudas!",
        });
        setShowMenu(false);
      }
    },
    { 
      id: "suggestion", 
      title: "Enviar Sugerencia", 
      icon: MessageSquare, 
      action: () => {
        toast({
          title: "¡Gracias por tu interés!",
          description: "Pronto podrás enviar tus sugerencias. ¡Seguimos mejorando EcoFun para ti!",
        });
        setShowMenu(false);
      }
    }
  ];

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

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

  const readText = (text: string) => {
    if (!speechSynthesis) {
      toast({
        title: "Audio no disponible",
        description: "Tu navegador no soporta la función de lectura de texto.",
      });
      return;
    }

    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => {
      setIsReading(false);
      toast({
        title: "Error de audio",
        description: "No se pudo reproducir el audio. Intenta de nuevo.",
      });
    };

    speechSynthesis.speak(utterance);
  };

  const completeChallenge = (challengeId: number) => {
    if (!completedChallenges.includes(challengeId)) {
      // Special handling for educational content challenge
      if (challengeId === 5) {
        setShowEducationalContent(true);
        return;
      }
      
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
          const newBadges = ["🌍", "🌳", "🔋", "🚶‍♂️", "📚"];
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

  const handleEducationalComplete = () => {
    setShowEducationalContent(false);
    setCompletedChallenges([...completedChallenges, 5]);
    setPoints(points + 45);
    toast({
      title: "¡Excelente! 📚",
      description: "Completaste el reto educativo. +45 puntos",
    });
    
    // Add educational badge
    if (!badges.includes("📚")) {
      setBadges([...badges, "📚"]);
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

  if (showEducationalContent) {
    const topic = educationalTopics[currentEducationalTopic];
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-50 to-yellow-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{topic.icon}</div>
                  <h1 className="text-2xl font-bold text-blue-700">{topic.title}</h1>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowEducationalContent(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ← Volver
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg relative">
                  <div className="flex items-start justify-between">
                    <p className="text-gray-700 leading-relaxed pr-4">{topic.content}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => readText(topic.content)}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 flex-shrink-0"
                      title="Escuchar contenido"
                    >
                      {isReading ? <Pause className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>
                
                <div className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-300 relative">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="text-yellow-600 w-5 h-5" />
                    <span className="font-semibold text-yellow-800">Dato Curioso</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => readText(topic.tip)}
                      className="text-yellow-600 hover:text-yellow-800 hover:bg-yellow-200 ml-auto"
                      title="Escuchar dato curioso"
                    >
                      {isReading ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-yellow-700 text-sm">{topic.tip}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <div className="flex space-x-2">
                  {currentEducationalTopic > 0 && (
                    <Button 
                      variant="outline"
                      onClick={() => setCurrentEducationalTopic(currentEducationalTopic - 1)}
                    >
                      ← Anterior
                    </Button>
                  )}
                  {currentEducationalTopic < educationalTopics.length - 1 && (
                    <Button 
                      variant="outline"
                      onClick={() => setCurrentEducationalTopic(currentEducationalTopic + 1)}
                    >
                      Siguiente →
                    </Button>
                  )}
                </div>
                
                <Button 
                  onClick={handleEducationalComplete}
                  className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold px-6 py-2 rounded-full"
                >
                  ¡Completar Reto! +45 pts
                </Button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Tema {currentEducationalTopic + 1} de {educationalTopics.length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-yellow-100 flex flex-col">
      <OnboardingModal isOpen={showOnboarding} onClose={handleOnboardingClose} />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-green-400 to-blue-400 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <div className="text-2xl sm:text-3xl font-bold text-white bg-white/20 px-3 py-2 rounded-full border-2 border-white/30 shadow-lg backdrop-blur-sm">
              <span className="text-yellow-300">Eco</span><span className="text-green-200">Fun</span>
            </div>
          </div>
          
          {/* Plant Info - Center */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <EcoMascot size="large" plantStage={plantStage} />
              <div className="text-center">
                <h1 className="text-lg sm:text-xl font-bold">¡Hola, EcoExploradorx!</h1>
                <p className="text-green-100 text-sm">{plantStages[plantStage].name} {plantStages[plantStage].emoji} • {points} puntos</p>
              </div>
            </div>
          </div>
          
          {/* Menu - Right */}
          <div className="flex-shrink-0 relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMenu(!showMenu)}
              className="text-white hover:bg-white/20"
            >
              {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
            
            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
          {/* Daily Tip */}
          <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-3">
                <Lightbulb className="text-yellow-600 w-6 h-6 flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-bold text-yellow-800 mb-1 text-lg">Consejo del Día</h3>
                  <p className="text-yellow-700 text-sm sm:text-base">{todaysTip}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Bar */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-200 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg sm:text-xl font-semibold text-green-700">Progreso de tu Planta</span>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl sm:text-3xl">{plantStages[plantStage].emoji}</span>
                  <span className="text-sm sm:text-base text-green-600 font-medium">{plantStages[plantStage].name}</span>
                </div>
              </div>
              <Progress 
                value={plantStage < plantStages.length - 1 
                  ? ((points - plantStages[plantStage].minPoints) / (plantStages[plantStage + 1].minPoints - plantStages[plantStage].minPoints)) * 100
                  : 100
                } 
                className="h-4" 
              />
              {plantStage < plantStages.length - 1 && (
                <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
                  {plantStages[plantStage + 1].minPoints - points} puntos para {plantStages[plantStage + 1].name}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Weekly Challenges */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-6 flex items-center justify-center">
              <CirclePlus className="mr-2" />
              Retos de la Semana
            </h2>
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {challenge.id === 5 && <BookOpen className="w-4 h-4 text-blue-600" />}
                        <h3 className={`font-bold text-sm sm:text-base transition-colors duration-200 ${
                          completedChallenges.includes(challenge.id) 
                            ? 'text-green-800 group-hover:text-green-900' 
                            : 'text-gray-800 group-hover:text-green-700'
                        }`}>
                          {challenge.title}
                        </h3>
                      </div>
                      {completedChallenges.includes(challenge.id) ? (
                        <CircleCheck className="text-green-500 w-6 h-6 flex-shrink-0 group-hover:text-green-600" />
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex-shrink-0 group-hover:border-green-400 transition-colors duration-200"></div>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 group-hover:text-gray-700">{challenge.description}</p>
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
            <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-6 flex items-center justify-center">
              <Gamepad className="mr-2" />
              Juegos Ecológicos
            </h2>
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          <Card className="bg-gradient-to-r from-purple-400 to-pink-400 text-white border-none shadow-xl">
            <CardContent className="p-4 sm:p-8 text-center">
              <div className="text-3xl sm:text-4xl mb-3">🌟</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">¡Eres un verdaderx EcoExploradorx!</h3>
              <p className="text-purple-100 text-sm sm:text-base">Cada acción cuenta para cuidar nuestro planeta. ¡Sigue así!</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
