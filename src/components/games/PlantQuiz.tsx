
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle, Leaf } from "lucide-react";

interface PlantQuizProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

const PlantQuiz = ({ onComplete, onBack }: PlantQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gamePhase, setGamePhase] = useState<'playing' | 'finished'>('playing');

  const questions = [
    {
      question: "¿Qué necesitan las plantas para hacer fotosíntesis?",
      image: "🌱",
      options: ["Solo agua", "Luz solar, agua y dióxido de carbono", "Solo tierra", "Solo aire"],
      correct: 1,
      explanation: "Las plantas necesitan luz solar, agua y dióxido de carbono para producir su propio alimento."
    },
    {
      question: "¿Cuál de estas es una planta carnívora?",
      image: "🪴",
      options: ["Rosa", "Venus atrapamoscas", "Margarita", "Tulipán"],
      correct: 1,
      explanation: "La Venus atrapamoscas es una planta carnívora que atrapa y digiere insectos."
    },
    {
      question: "¿Qué parte de la planta absorbe el agua del suelo?",
      image: "🌿",
      options: ["Las hojas", "Las flores", "Las raíces", "El tallo"],
      correct: 2,
      explanation: "Las raíces son las encargadas de absorber agua y nutrientes del suelo."
    },
    {
      question: "¿Cuál es el árbol más alto del mundo?",
      image: "🌲",
      options: ["Roble", "Pino", "Secuoya gigante", "Eucalipto"],
      correct: 2,
      explanation: "Las secuoyas gigantes pueden crecer más de 100 metros de altura."
    },
    {
      question: "¿Qué gas producen las plantas durante la fotosíntesis?",
      image: "🍃",
      options: ["Dióxido de carbono", "Oxígeno", "Nitrógeno", "Hidrógeno"],
      correct: 1,
      explanation: "Las plantas producen oxígeno como subproducto de la fotosíntesis, que es vital para nosotros."
    },
    {
      question: "¿Cuál de estos NO es un tipo de hoja?",
      image: "🌾",
      options: ["Hoja simple", "Hoja compuesta", "Hoja perenne", "Hoja cuadrada"],
      correct: 3,
      explanation: "Las hojas pueden ser simples, compuestas o perennes, pero no existe la 'hoja cuadrada' como tipo."
    },
    {
      question: "¿Qué planta se usa para hacer chocolate?",
      image: "🍫",
      options: ["Café", "Cacao", "Vainilla", "Caña de azúcar"],
      correct: 1,
      explanation: "El chocolate se hace de los granos del árbol de cacao."
    },
    {
      question: "¿Cuál de estas plantas puede vivir en el desierto?",
      image: "🌵",
      options: ["Helecho", "Cactus", "Musgo", "Nenúfar"],
      correct: 1,
      explanation: "Los cactus están adaptados para vivir en desiertos con poca agua."
    },
    {
      question: "¿Qué parte de la planta produce las semillas?",
      image: "🌸",
      options: ["Las hojas", "Las flores", "El tallo", "Las raíces"],
      correct: 1,
      explanation: "Las flores se convierten en frutos que contienen las semillas."
    },
    {
      question: "¿Cuál de estas plantas es venenosa?",
      image: "☠️",
      options: ["Lavanda", "Menta", "Hiedra venenosa", "Albahaca"],
      correct: 2,
      explanation: "La hiedra venenosa puede causar erupciones en la piel. ¡Nunca toques plantas que no conoces!"
    },
    {
      question: "¿Qué árbol pierde todas sus hojas en otoño?",
      image: "🍂",
      options: ["Pino", "Abeto", "Roble", "Ciprés"],
      correct: 2,
      explanation: "Los robles son árboles caducifolios que pierden sus hojas en otoño."
    },
    {
      question: "¿Cuál es la flor nacional de México?",
      image: "🌺",
      options: ["Rosa", "Dahlia", "Girasol", "Orquídea"],
      correct: 1,
      explanation: "La dahlia es la flor nacional de México y viene en muchos colores hermosos."
    },
    {
      question: "¿Qué planta crece más rápido en el mundo?",
      image: "🎋",
      options: ["Pasto", "Bambú", "Maíz", "Frijol"],
      correct: 1,
      explanation: "El bambú puede crecer hasta 1 metro por día, ¡es increíblemente rápido!"
    },
    {
      question: "¿Cuál de estas plantas es comestible?",
      image: "🥬",
      options: ["Poinsettia", "Espinaca", "Adelfa", "Ricino"],
      correct: 1,
      explanation: "La espinaca es una planta muy nutritiva que podemos comer. ¡Como Popeye!"
    },
    {
      question: "¿Qué planta se usa para hacer papel?",
      image: "📄",
      options: ["Algodón", "Árboles", "Cactus", "Flores"],
      correct: 1,
      explanation: "El papel se hace principalmente de la madera de los árboles."
    },
    {
      question: "¿Cuál de estas plantas puede purificar el aire?",
      image: "💨",
      options: ["Pothos", "Cactus del desierto", "Diente de león", "Todas las anteriores"],
      correct: 3,
      explanation: "¡Todas las plantas purifican el aire! Absorben CO2 y producen oxígeno."
    },
    {
      question: "¿Qué planta aromática se usa para hacer té relajante?",
      image: "🫖",
      options: ["Manzanilla", "Chili", "Ajo", "Cebolla"],
      correct: 0,
      explanation: "La manzanilla es conocida por sus propiedades relajantes y se usa para hacer té."
    },
    {
      question: "¿Cuál de estas plantas trepa?",
      image: "🧗‍♀️",
      options: ["Girasol", "Hiedra", "Cactus", "Diente de león"],
      correct: 1,
      explanation: "La hiedra es una planta trepadora que se adhiere a paredes y árboles."
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
      setScore(score + 10);
    }
    
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        nextQuestion();
      } else {
        endGame();
      }
    }, 2500);
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(20);
  };

  const endGame = () => {
    setGamePhase('finished');
    const finalPoints = Math.floor(score * 1.5);
    setTimeout(() => onComplete(finalPoints), 2000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(20);
    setGamePhase('playing');
  };

  if (gamePhase === 'finished') {
    const finalPoints = Math.floor(score * 1.5);
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-lime-100 p-4 flex items-center justify-center">
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-300 shadow-2xl max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-green-700 mb-4">¡Excelente trabajo!</h2>
            <div className="space-y-3 mb-6">
              <p className="text-lg">Puntuación: <span className="font-bold text-green-600">{score}/{questions.length * 10}</span></p>
              <p className="text-sm text-gray-600">
                Respondiste correctamente {score / 10} de {questions.length} preguntas
              </p>
              <Badge className="bg-green-100 text-green-800 border border-green-300">
                +{finalPoints} puntos ecológicos
              </Badge>
            </div>
            <div className="space-y-3">
              <Button
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-2 rounded-full"
              >
                🌱 Jugar de Nuevo
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
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-lime-100 p-4">
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
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-700">Adivina la Planta</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Puntos: {score}</div>
            <div className="text-sm font-medium text-green-600">
              Tiempo: {timeLeft}s
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
            <span>{Math.round(progress)}% completado</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl mb-6">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">{currentQ.image}</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{currentQ.question}</h2>
              {showResult && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Explicación:</strong> {currentQ.explanation}
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
                  buttonClass += "bg-white border-gray-200 hover:border-green-400 hover:bg-green-50 text-gray-800";
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
            value={(timeLeft / 20) * 100} 
            className="h-2"
            style={{
              background: timeLeft <= 5 ? '#fee2e2' : '#f0fdf4'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlantQuiz;
