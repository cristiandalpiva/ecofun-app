
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, Users, CheckCircle, XCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface EcoComparisonProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Character {
  id: number;
  name: string;
  avatar: string;
  description: string;
  actions: string[];
  isEcoFriendly: boolean;
  explanation: string;
}

interface Scenario {
  id: number;
  title: string;
  situation: string;
  characters: [Character, Character];
  educationalTip: string;
}

const EcoComparison: React.FC<EcoComparisonProps> = ({ onComplete, onBack }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [gameWon, setGameWon] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const scenarios: Scenario[] = [
    {
      id: 1,
      title: "En la Escuela",
      situation: "Es hora del recreo y los niños van a almorzar. ¿Quién tiene hábitos más ecológicos?",
      characters: [
        {
          id: 1,
          name: "Ana",
          avatar: "👧",
          description: "Ana siempre trae su almuerzo en contenedores reutilizables",
          actions: [
            "🥪 Trae sándwich en contenedor de vidrio",
            "🍎 Fruta fresca sin empaque",
            "💧 Botella de agua reutilizable",
            "♻️ Separa sus residuos correctamente"
          ],
          isEcoFriendly: true,
          explanation: "Ana reduce residuos usando contenedores reutilizables y evita empaques innecesarios. ¡Es muy ecológica!"
        },
        {
          id: 2,
          name: "Bruno",
          avatar: "👦",
          description: "Bruno compra comida empaquetada en la cafetería",
          actions: [
            "🍟 Papas fritas en bolsa plástica",
            "🥤 Bebida en vaso desechable",
            "🍫 Dulces con muchos empaques",
            "🗑️ Tira todo en un solo basurero"
          ],
          isEcoFriendly: false,
          explanation: "Bruno genera muchos residuos con empaques desechables y no recicla. Puede mejorar sus hábitos."
        }
      ],
      educationalTip: "Usar contenedores reutilizables reduce hasta 90% de residuos en el almuerzo escolar."
    },
    {
      id: 2,
      title: "En Casa",
      situation: "Dos hermanas se preparan para salir. ¿Cuál es más consciente del medio ambiente?",
      characters: [
        {
          id: 3,
          name: "Clara",
          avatar: "👩",
          description: "Clara apaga todas las luces y desconecta aparatos",
          actions: [
            "💡 Apaga luces al salir de cada habitación",
            "🔌 Desconecta cargadores sin usar",
            "❄️ Ajusta termostato para ahorrar energía",
            "🚿 Ducha rápida (5 minutos)"
          ],
          isEcoFriendly: true,
          explanation: "Clara ahorra energía y agua, reduciendo significativamente su huella de carbono."
        },
        {
          id: 4,
          name: "Diana",
          avatar: "👱‍♀️",
          description: "Diana deja todo encendido 'por si acaso'",
          actions: [
            "💡 Deja luces encendidas en toda la casa",
            "📺 TV encendida aunque no la vea",
            "🔌 Cargadores conectados sin usar",
            "🛁 Ducha larga (20 minutos)"
          ],
          isEcoFriendly: false,
          explanation: "Diana desperdicia mucha energía y agua. Pequeños cambios harían gran diferencia."
        }
      ],
      educationalTip: "Apagar luces innecesarias puede reducir el consumo eléctrico del hogar hasta en 25%."
    },
    {
      id: 3,
      title: "De Compras",
      situation: "Dos amigos van al supermercado. ¿Quién compra de manera más sostenible?",
      characters: [
        {
          id: 5,
          name: "Eduardo",
          avatar: "🧑",
          description: "Eduardo planifica sus compras y trae bolsas reutilizables",
          actions: [
            "🛍️ Trae bolsas de tela reutilizables",
            "📝 Lista de compras para evitar desperdicio",
            "🥬 Prefiere productos locales y orgánicos",
            "📦 Evita productos con exceso de empaque"
          ],
          isEcoFriendly: true,
          explanation: "Eduardo reduce residuos plásticos y apoya la agricultura local sostenible."
        },
        {
          id: 6,
          name: "Felipe",
          avatar: "👨",
          description: "Felipe compra impulsivamente y usa bolsas plásticas",
          actions: [
            "🛒 Olvida traer bolsas reutilizables",
            "🛍️ Usa múltiples bolsas plásticas",
            "🍔 Compra comida procesada con mucho empaque",
            "🗑️ No se fija en el origen de productos"
          ],
          isEcoFriendly: false,
          explanation: "Felipe genera muchos residuos plásticos y no considera el impacto ambiental de sus compras."
        }
      ],
      educationalTip: "Una bolsa reutilizable puede reemplazar hasta 1,000 bolsas plásticas durante su vida útil."
    },
    {
      id: 4,
      title: "En el Parque",
      situation: "Dos familias disfrutan un día en el parque. ¿Cuál respeta más la naturaleza?",
      characters: [
        {
          id: 7,
          name: "Familia García",
          avatar: "👨‍👩‍👧‍👦",
          description: "La familia García cuida el medio ambiente en sus actividades",
          actions: [
            "🥪 Picnic con platos y cubiertos reutilizables",
            "🗑️ Recogen toda su basura y la separan",
            "🌸 No cortan flores ni dañan plantas",
            "🐦 Observan animales sin molestarlos"
          ],
          isEcoFriendly: true,
          explanation: "Los García disfrutan la naturaleza sin dañarla, siendo un ejemplo de turismo responsable."
        },
        {
          id: 8,
          name: "Familia López",
          avatar: "👨‍👩‍👦‍👦",
          description: "La familia López no se preocupa por su impacto ambiental",
          actions: [
            "🍽️ Usa platos y cubiertos desechables",
            "🗑️ Deja basura en el suelo",
            "🌺 Los niños cortan flores para llevarse",
            "🏃 Persiguen y molestan a los animales"
          ],
          isEcoFriendly: false,
          explanation: "Los López dañan el ecosistema del parque y no respetan la vida silvestre."
        }
      ],
      educationalTip: "Los espacios naturales tardan años en recuperarse del daño causado por visitantes irresponsables."
    },
    {
      id: 5,
      title: "En el Transporte",
      situation: "Dos estudiantes van a la universidad. ¿Cuál elige el transporte más ecológico?",
      characters: [
        {
          id: 9,
          name: "Gabriela",
          avatar: "👩‍🎓",
          description: "Gabriela usa transporte sostenible",
          actions: [
            "🚲 Va en bicicleta cuando el clima es bueno",
            "🚌 Usa transporte público los días lluviosos",
            "👫 Comparte auto con compañeros ocasionalmente",
            "🚶‍♀️ Camina distancias cortas"
          ],
          isEcoFriendly: true,
          explanation: "Gabriela reduce su huella de carbono usando transporte sustentable y manteniéndose activa."
        },
        {
          id: 10,
          name: "Héctor",
          avatar: "👨‍🎓",
          description: "Héctor siempre usa auto privado",
          actions: [
            "🚗 Maneja solo en auto grande todos los días",
            "⛽ No se preocupa por el consumo de gasolina",
            "🚫 Nunca usa transporte público",
            "😴 Prefiere comodidad sobre sostenibilidad"
          ],
          isEcoFriendly: false,
          explanation: "Héctor genera alta contaminación usando auto privado innecesariamente todos los días."
        }
      ],
      educationalTip: "Usar transporte público o bicicleta reduce las emisiones de CO₂ hasta en 80% comparado con auto privado."
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !gameWon) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameWon) {
      handleGameEnd();
    }
  }, [timeLeft, gameWon]);

  const makeChoice = (character: Character) => {
    setSelectedCharacter(character);
    setShowResult(true);

    if (character.isEcoFriendly) {
      const points = 20;
      setScore(prev => prev + points);
      setCorrectAnswers(prev => prev + 1);
      
      toast({
        title: "¡Correcto! 🌟",
        description: `+${points} puntos. ${character.explanation}`,
      });
    } else {
      toast({
        title: "¡Piénsalo mejor! 🤔",
        description: `${character.explanation}`,
        variant: "destructive"
      });
    }

    setTimeout(() => {
      setShowResult(false);
      setSelectedCharacter(null);
      
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(prev => prev + 1);
      } else {
        handleGameEnd();
      }
    }, 4000);
  };

  const handleGameEnd = () => {
    setGameWon(true);
    const finalScore = score + (correctAnswers * 10);
    
    toast({
      title: "¡Juego Completado! 🎉",
      description: `Has aprendido a identificar comportamientos ecológicos. Puntuación final: ${finalScore}`,
    });
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setScore(0);
    setTimeLeft(180);
    setGameWon(false);
    setShowResult(false);
    setSelectedCharacter(null);
    setCorrectAnswers(0);
  };

  const handleComplete = () => {
    const finalScore = score + (correctAnswers * 10);
    onComplete(finalScore);
  };

  const currentScenarioData = scenarios[currentScenario];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 p-2 sm:p-4">
      <div className="max-w-5xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <Button variant="outline" onClick={onBack} size="sm">
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Volver</span>
              </Button>
              <h1 className="text-lg sm:text-2xl font-bold text-green-700 flex items-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                ¿Quién es más Ecológico?
              </h1>
              <div className="text-right">
                <p className="text-sm sm:text-lg font-bold text-blue-600">⏰ {timeLeft}s</p>
                <Button variant="outline" size="sm" onClick={resetGame}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {gameWon && (
              <Card className="bg-green-100 border-2 border-green-300 mb-4 sm:mb-6">
                <CardContent className="p-3 sm:p-4 text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">🎉 ¡Misión Completada!</h3>
                  <p className="text-xs sm:text-sm text-green-700 mb-3 sm:mb-4">
                    Has desarrollado tu capacidad para identificar comportamientos ecológicos. 
                    Comparar opciones nos ayuda a tomar mejores decisiones para el planeta. 
                    ¡Ahora puedes ser un ejemplo para otros! 🌍✨
                  </p>
                  <Button 
                    onClick={handleComplete}
                    className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base"
                  >
                    ¡Completar! (+{score + (correctAnswers * 10)} pts)
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Panel de información */}
              <div className="lg:col-span-1 space-y-3 sm:space-y-4">
                <Card className="bg-blue-50 border-2 border-blue-300">
                  <CardContent className="p-3 sm:p-4">
                    <h4 className="text-sm sm:text-base font-bold text-blue-700 mb-2">Puntuación</h4>
                    <div className="text-lg sm:text-2xl font-bold text-blue-800 mb-2">
                      {score} pts
                    </div>
                    <Progress 
                      value={(currentScenario / scenarios.length) * 100} 
                      className="h-2 sm:h-3 mb-2" 
                    />
                    <p className="text-xs text-blue-600">
                      Escenario {currentScenario + 1} de {scenarios.length}
                    </p>
                    <p className="text-xs text-green-600 mt-2">
                      Correctas: {correctAnswers}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50 border-2 border-yellow-300">
                  <CardContent className="p-3 sm:p-4">
                    <h4 className="text-sm sm:text-base font-bold text-yellow-700 mb-2">💡 Consejo Eco</h4>
                    <p className="text-xs text-yellow-700">
                      {currentScenarioData?.educationalTip}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Área principal del juego */}
              <div className="lg:col-span-3">
                {!gameWon && (
                  <Card className="bg-gradient-to-b from-green-50 to-blue-50 border-2 border-green-300">
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-center mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                          {currentScenarioData?.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 mb-4">
                          {currentScenarioData?.situation}
                        </p>
                        
                        {!showResult && (
                          <p className="text-sm font-semibold text-green-700 mb-6">
                            Haz clic en el personaje que crees que es más ecológico:
                          </p>
                        )}
                      </div>

                      {showResult && selectedCharacter ? (
                        <div className="text-center space-y-4">
                          <div className={`text-2xl sm:text-3xl mb-4 ${selectedCharacter.isEcoFriendly ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedCharacter.isEcoFriendly ? (
                              <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                            ) : (
                              <XCircle className="w-16 h-16 mx-auto text-red-500" />
                            )}
                          </div>
                          <div className={`p-4 rounded-lg border-2 ${
                            selectedCharacter.isEcoFriendly ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'
                          }`}>
                            <h4 className={`text-lg font-bold mb-2 ${
                              selectedCharacter.isEcoFriendly ? 'text-green-800' : 'text-red-800'
                            }`}>
                              {selectedCharacter.isEcoFriendly ? '¡Correcto!' : '¡Reflexiona!'}
                            </h4>
                            <p className={`text-sm ${
                              selectedCharacter.isEcoFriendly ? 'text-green-700' : 'text-red-700'
                            }`}>
                              {selectedCharacter.explanation}
                            </p>
                          </div>
                          
                          {/* Mostrar comparación */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            {currentScenarioData.characters.map((character) => (
                              <Card 
                                key={character.id}
                                className={`border-2 ${
                                  character.isEcoFriendly 
                                    ? 'border-green-400 bg-green-50' 
                                    : 'border-red-300 bg-red-50'
                                }`}
                              >
                                <CardContent className="p-3">
                                  <div className="text-center mb-2">
                                    <div className="text-2xl mb-1">{character.avatar}</div>
                                    <h5 className="font-bold text-sm">{character.name}</h5>
                                    <div className="text-xs mt-1">
                                      {character.isEcoFriendly ? '✅ Ecológico' : '❌ No ecológico'}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          
                          <p className="text-xs text-gray-600 mt-4">
                            Continuando en unos segundos...
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          {currentScenarioData?.characters.map((character) => (
                            <Card 
                              key={character.id}
                              className="cursor-pointer transition-all duration-300 hover:scale-105 bg-white border-2 border-gray-300 hover:border-green-400 shadow-lg hover:shadow-xl"
                              onClick={() => makeChoice(character)}
                            >
                              <CardContent className="p-4 sm:p-6 text-center">
                                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">{character.avatar}</div>
                                <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                                  {character.name}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                                  {character.description}
                                </p>
                                <div className="space-y-1 sm:space-y-2">
                                  {character.actions.map((action, index) => (
                                    <div 
                                      key={index}
                                      className="text-xs sm:text-sm text-left p-2 bg-gray-50 rounded-lg"
                                    >
                                      {action}
                                    </div>
                                  ))}
                                </div>
                                <Button 
                                  className="mt-3 sm:mt-4 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white text-xs sm:text-sm"
                                  size="sm"
                                >
                                  Elegir a {character.name}
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EcoComparison;
