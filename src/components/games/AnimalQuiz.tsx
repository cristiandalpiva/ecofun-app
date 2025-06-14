
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle, Binoculars } from "lucide-react";

interface AnimalQuizProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

const AnimalQuiz = ({ onComplete, onBack }: AnimalQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);
  const [gamePhase, setGamePhase] = useState<'playing' | 'finished'>('playing');

  const questions = [
    {
      question: "¿Cuál es el animal más grande del mundo?",
      image: "🐋",
      options: ["Elefante africano", "Ballena azul", "Jirafa", "Tiburón blanco"],
      correct: 1,
      explanation: "La ballena azul puede medir hasta 30 metros de largo y es el animal más grande que ha existido."
    },
    {
      question: "¿Qué animal puede cambiar de color?",
      image: "🦎",
      options: ["Iguana", "Salamandra", "Camaleón", "Gecko"],
      correct: 2,
      explanation: "Los camaleones cambian de color para comunicarse y regular su temperatura corporal."
    },
    {
      question: "¿Cuál de estos animales hiberna en invierno?",
      image: "🐻",
      options: ["Lobo", "Oso pardo", "Ciervo", "Zorro"],
      correct: 1,
      explanation: "Los osos pardos hibernan durante el invierno para conservar energía cuando hay menos comida."
    },
    {
      question: "¿Qué animal es conocido por su memoria excepcional?",
      image: "🐘",
      options: ["Delfín", "Chimpancé", "Elefante", "Pulpo"],
      correct: 2,
      explanation: "Los elefantes tienen memoria extraordinaria y pueden recordar a otros elefantes por décadas."
    },
    {
      question: "¿Cuál es el ave que no puede volar?",
      image: "🐧",
      options: ["Pingüino", "Colibrí", "Águila", "Loro"],
      correct: 0,
      explanation: "Los pingüinos no pueden volar, pero son excelentes nadadores y pueden 'volar' bajo el agua."
    },
    {
      question: "¿Qué animal es el más rápido en tierra?",
      image: "🐆",
      options: ["León", "Guepardo", "Caballo", "Antílope"],
      correct: 1,
      explanation: "El guepardo puede correr hasta 120 km/h, convirtiéndolo en el animal terrestre más rápido."
    },
    {
      question: "¿Cuántos corazones tiene un pulpo?",
      image: "🐙",
      options: ["1", "2", "3", "4"],
      correct: 2,
      explanation: "Los pulpos tienen 3 corazones: dos bombean sangre a las branquias y uno al resto del cuerpo."
    },
    {
      question: "¿Qué animal construye presas en los ríos?",
      image: "🦫",
      options: ["Nutria", "Castor", "Rata almizclera", "Visón"],
      correct: 1,
      explanation: "Los castores son ingenieros naturales que construyen presas para crear estanques profundos."
    },
    {
      question: "¿Cuál de estos animales es venenoso?",
      image: "🐸",
      options: ["Rana verde", "Rana dardo dorada", "Sapo común", "Salamandra"],
      correct: 1,
      explanation: "La rana dardo dorada es uno de los animales más venenosos del mundo."
    },
    {
      question: "¿Qué animal puede regenerar sus extremidades?",
      image: "🦎",
      options: ["Gecko", "Lagartija", "Estrella de mar", "Todas las anteriores"],
      correct: 3,
      explanation: "Muchos animales pueden regenerar partes del cuerpo: lagartijas (cola), estrellas de mar (brazos)."
    },
    {
      question: "¿Cuál es el mamífero que vuela?",
      image: "🦇",
      options: ["Ardilla voladora", "Murciélago", "Lemur volador", "Petauro"],
      correct: 1,
      explanation: "Los murciélagos son los únicos mamíferos con vuelo verdadero."
    },
    {
      question: "¿Qué animal tiene la lengua más larga en proporción a su cuerpo?",
      image: "🦌",
      options: ["Jirafa", "Oso hormiguero", "Camaleón", "Colibrí"],
      correct: 2,
      explanation: "La lengua del camaleón puede ser hasta 2.5 veces la longitud de su cuerpo."
    },
    {
      question: "¿Cuál de estos animales es nocturno?",
      image: "🦉",
      options: ["Águila", "Búho", "Halcón", "Buitre"],
      correct: 1,
      explanation: "Los búhos son aves nocturnas con excelente visión y audición para cazar en la oscuridad."
    },
    {
      question: "¿Qué animal puede vivir más tiempo sin agua?",
      image: "🐪",
      options: ["Elefante", "Camello", "Rinoceronte", "Hipopótamo"],
      correct: 1,
      explanation: "Los camellos pueden sobrevivir hasta 10 días sin agua gracias a sus adaptaciones."
    },
    {
      question: "¿Cuál es el pez más grande del océano?",
      image: "🦈",
      options: ["Tiburón blanco", "Tiburón ballena", "Manta raya", "Atún rojo"],
      correct: 1,
      explanation: "El tiburón ballena puede medir hasta 18 metros, pero solo come plancton y peces pequeños."
    },
    {
      question: "¿Qué animal construye el nido más elaborado?",
      image: "🕷️",
      options: ["Araña tejedora", "Pájaro tejedor", "Abeja", "Termita"],
      correct: 1,
      explanation: "Los pájaros tejedores construyen nidos increíblemente complejos con forma de cesta."
    },
    {
      question: "¿Cuál de estos animales es un marsupial?",
      image: "🦘",
      options: ["Conejo", "Canguro", "Liebre", "Capibara"],
      correct: 1,
      explanation: "Los canguros son marsupiales: las crías nacen muy pequeñas y crecen en la bolsa de la madre."
    },
    {
      question: "¿Qué animal tiene la mordida más fuerte?",
      image: "🐊",
      options: ["Tiburón blanco", "Cocodrilo del Nilo", "León", "Hipopótamo"],
      correct: 1,
      explanation: "El cocodrilo del Nilo tiene la mordida más fuerte con una fuerza de más de 1,500 kg/cm²."
    },
    {
      question: "¿Cuál de estos animales es considerado el más inteligente?",
      image: "🐬",
      options: ["Delfín", "Perro", "Gato", "Caballo"],
      correct: 0,
      explanation: "Los delfines tienen autoconciencia, usan herramientas y pueden reconocerse en espejos."
    },
    {
      question: "¿Qué animal puede sobrevivir en el espacio?",
      image: "🌌",
      options: ["Cucaracha", "Tardígrado", "Escorpión", "Ninguno"],
      correct: 1,
      explanation: "Los tardígrados son casi indestructibles y pueden sobrevivir en el vacío del espacio."
    }
  ];

  useEffect(() => {
    if (gamePhase === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gamePhase === 'playing') {
      handleTimeout();
    }
  }, [timeLeft, gamePhase]);

  const handleTimeout = () => {
    setShowResult(true);
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        nextQuestion();
      } else {
        endGame();
      }
    }, 2000);
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 15);
    }
    
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        nextQuestion();
      } else {
        endGame();
      }
    }, 3000);
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(25);
  };

  const endGame = () => {
    setGamePhase('finished');
    const finalPoints = Math.floor(score * 1.2);
    setTimeout(() => onComplete(finalPoints), 2000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(25);
    setGamePhase('playing');
  };

  if (gamePhase === 'finished') {
    const finalPoints = Math.floor(score * 1.2);
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-amber-100 p-4 flex items-center justify-center">
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-orange-300 shadow-2xl max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-orange-700 mb-4">¡Safari completado!</h2>
            <div className="space-y-3 mb-6">
              <p className="text-lg">Puntuación: <span className="font-bold text-orange-600">{score}/{questions.length * 15}</span></p>
              <p className="text-sm text-gray-600">
                Identificaste correctamente {score / 15} de {questions.length} animales
              </p>
              <Badge className="bg-orange-100 text-orange-800 border border-orange-300">
                +{finalPoints} puntos ecológicos
              </Badge>
            </div>
            <div className="space-y-3">
              <Button
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-white font-semibold py-2 rounded-full"
              >
                🦁 Nuevo Safari
              </Button>
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full text-gray-600 hover:text-gray-800"
              >
                ← Volver al Menú
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-amber-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div className="flex items-center space-x-2">
            <Binoculars className="w-5 h-5 text-orange-600" />
            <span className="font-semibold text-orange-700">Safari Animal</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Puntos: {score}</div>
            <div className="text-sm font-medium text-orange-600">
              Tiempo: {timeLeft}s
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Animal {currentQuestion + 1} de {questions.length}</span>
            <span>{Math.round(progress)}% explorado</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-xl mb-6">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">{currentQ.image}</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{currentQ.question}</h2>
              {showResult && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>🔍 Dato curioso:</strong> {currentQ.explanation}
                  </p>
                </div>
              )}
            </div>

            <div className="grid gap-3">
              {currentQ.options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
                
                if (showResult) {
                  if (index === currentQ.correct) {
                    buttonClass += "bg-green-100 border-green-400 text-green-800";
                  } else if (index === selectedAnswer && index !== currentQ.correct) {
                    buttonClass += "bg-red-100 border-red-400 text-red-800";
                  } else {
                    buttonClass += "bg-gray-100 border-gray-300 text-gray-600";
                  }
                } else {
                  buttonClass += "bg-white border-gray-200 hover:border-orange-400 hover:bg-orange-50 text-gray-800";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {showResult && index === currentQ.correct && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {showResult && index === selectedAnswer && index !== currentQ.correct && (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Timer Bar */}
        <div className="mb-4">
          <Progress 
            value={(timeLeft / 25) * 100} 
            className="h-2"
            style={{
              background: timeLeft <= 7 ? '#fee2e2' : '#fff7ed'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimalQuiz;
