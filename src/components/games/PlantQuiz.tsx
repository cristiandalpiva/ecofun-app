
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Leaf, CheckCircle, XCircle } from "lucide-react";

interface PlantQuizProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Question {
  id: number;
  image: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  fact: string;
}

const PlantQuiz = ({ onComplete, onBack }: PlantQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      image: "🌹",
      question: "¿Qué planta es esta?",
      options: ["Rosa", "Tulipán", "Clavel", "Girasol"],
      correct: 0,
      explanation: "Esta es una rosa, una de las flores más populares del mundo.",
      fact: "Las rosas han sido cultivadas por más de 5,000 años y simbolizan el amor y la belleza."
    },
    {
      id: 2,
      image: "🌻",
      question: "¿Cómo se llama esta planta amarilla?",
      options: ["Margarita", "Girasol", "Diente de león", "Narciso"],
      correct: 1,
      explanation: "Es un girasol, conocido por seguir la dirección del sol.",
      fact: "Los girasoles pueden crecer hasta 3 metros de altura y sus semillas son muy nutritivas."
    },
    {
      id: 3,
      image: "🌵",
      question: "¿Qué tipo de planta es esta?",
      options: ["Helecho", "Cactus", "Bambú", "Orquídea"],
      correct: 1,
      explanation: "Es un cactus, una planta suculenta adaptada a climas secos.",
      fact: "Los cactus pueden almacenar agua en sus tallos y sobrevivir sin lluvia durante meses."
    },
    {
      id: 4,
      image: "🌺",
      question: "¿Cómo se llama esta flor tropical?",
      options: ["Hibisco", "Violeta", "Azucena", "Pensamiento"],
      correct: 0,
      explanation: "Es un hibisco, una flor tropical muy colorida.",
      fact: "El hibisco es la flor nacional de Malasia y se usa para hacer té medicinal."
    },
    {
      id: 5,
      image: "🌷",
      question: "¿Qué planta bulbosa es esta?",
      options: ["Rosa", "Tulipán", "Lirio", "Azalea"],
      correct: 1,
      explanation: "Es un tulipán, originario de Asia Central.",
      fact: "Holanda es famosa por sus campos de tulipanes, aunque la planta es originalmente de Turquía."
    },
    {
      id: 6,
      image: "🌿",
      question: "¿Qué tipo de hoja verde es esta?",
      options: ["Menta", "Albahaca", "Perejil", "Cilantro"],
      correct: 0,
      explanation: "Es menta, una hierba aromática muy refrescante.",
      fact: "La menta se usa en medicina tradicional para aliviar problemas digestivos."
    },
    {
      id: 7,
      image: "🌱",
      question: "¿En qué etapa de crecimiento está esta planta?",
      options: ["Flor", "Brote/Germinación", "Fruto", "Semilla"],
      correct: 1,
      explanation: "Es un brote o germinación, la primera etapa visible del crecimiento.",
      fact: "Durante la germinación, la semilla utiliza sus nutrientes almacenados para crecer."
    },
    {
      id: 8,
      image: "🍄",
      question: "Aunque no es una planta, ¿cómo se llama este organismo?",
      options: ["Hongo/Seta", "Musgo", "Liquen", "Alga"],
      correct: 0,
      explanation: "Es un hongo o seta, que pertenece a un reino diferente al de las plantas.",
      fact: "Los hongos no pueden hacer fotosíntesis y obtienen nutrientes descomponiendo materia orgánica."
    },
    {
      id: 9,
      image: "🌾",
      question: "¿Qué tipo de cereal es este?",
      options: ["Trigo", "Avena", "Cebada", "Centeno"],
      correct: 0,
      explanation: "Es trigo, uno de los cereales más importantes del mundo.",
      fact: "El trigo alimenta a más del 35% de la población mundial y es base del pan."
    },
    {
      id: 10,
      image: "🌳",
      question: "¿Qué parte del árbol proporciona oxígeno?",
      options: ["Tronco", "Raíces", "Hojas", "Corteza"],
      correct: 2,
      explanation: "Las hojas realizan la fotosíntesis y producen oxígeno.",
      fact: "Un árbol maduro puede producir oxígeno suficiente para dos personas durante un día."
    },
    {
      id: 11,
      image: "🌸",
      question: "¿Cómo se llama esta delicada flor rosada?",
      options: ["Flor de cerezo", "Magnolia", "Peonía", "Camelia"],
      correct: 0,
      explanation: "Es una flor de cerezo, símbolo de la primavera en Japón.",
      fact: "El festival del cerezo en flor (Hanami) es una tradición japonesa de más de 1,000 años."
    },
    {
      id: 12,
      image: "🌼",
      question: "¿Qué flor silvestre es esta?",
      options: ["Margarita", "Diente de león", "Violeta", "Trébol"],
      correct: 0,
      explanation: "Es una margarita, una flor simple pero hermosa.",
      fact: "Las margaritas simbolizan la inocencia y pureza en muchas culturas."
    },
    {
      id: 13,
      image: "🥀",
      question: "¿En qué estado se encuentra esta flor?",
      options: ["Floreciendo", "Marchita", "En capullo", "Germinando"],
      correct: 1,
      explanation: "La flor está marchita, al final de su ciclo de vida.",
      fact: "Las flores marchitas pueden convertirse en compost y nutrir nuevas plantas."
    },
    {
      id: 14,
      image: "🍃",
      question: "¿Qué proceso realizan estas hojas verdes?",
      options: ["Respiración", "Fotosíntesis", "Digestión", "Circulación"],
      correct: 1,
      explanation: "Las hojas realizan fotosíntesis, convirtiendo luz solar en energía.",
      fact: "La fotosíntesis produce todo el oxígeno que respiramos en la Tierra."
    },
    {
      id: 15,
      image: "🌲",
      question: "¿Qué tipo de árbol es este de forma triangular?",
      options: ["Pino/Conífera", "Roble", "Sauce", "Manzano"],
      correct: 0,
      explanation: "Es un pino o conífera, que mantiene sus hojas todo el año.",
      fact: "Las coníferas son algunos de los árboles más antiguos del mundo, pueden vivir miles de años."
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && timeLeft > 0 && !showResult) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft, showResult]);

  const handleTimeUp = () => {
    setShowResult(true);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        nextQuestion();
      } else {
        finishQuiz();
      }
    }, 3000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || showResult) return;
    
    if (!gameStarted) setGameStarted(true);
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        nextQuestion();
      } else {
        finishQuiz();
      }
    }, 3000);
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
  };

  const finishQuiz = () => {
    const finalPoints = Math.round((score / questions.length) * 60);
    setTimeout(() => {
      onComplete(finalPoints);
    }, 1000);
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-cyan-100 p-4">
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
          <div className="text-center">
            <h1 className="text-xl font-bold text-green-700 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-2 shadow-md">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              Adivina la Planta
            </h1>
            <p className="text-sm text-gray-600">Pregunta {currentQuestion + 1} de {questions.length}</p>
          </div>
          <div className="text-right text-sm">
            <div className="text-gray-500">Tiempo: {timeLeft}s</div>
            <div className="text-green-600 font-medium">Puntos: {score}</div>
          </div>
        </div>

        {/* Progress */}
        <Progress value={progress} className="mb-6 h-2" />

        {/* Question Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
          <CardContent className="p-6">
            {/* Question Image and Text */}
            <div className="text-center mb-6">
              <div className="text-8xl mb-4 animate-pulse">{currentQ.image}</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {currentQ.question}
              </h2>
              <Badge variant="outline" className="border-green-300 text-green-700">
                Identificación de Plantas
              </Badge>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`
                    p-4 text-left justify-start h-auto transition-all duration-300
                    ${!showResult 
                      ? 'bg-gray-50 hover:bg-green-50 border-2 border-gray-200 hover:border-green-300 text-gray-700'
                      : selectedAnswer === index
                        ? index === currentQ.correct
                          ? 'bg-green-100 border-2 border-green-400 text-green-800'
                          : 'bg-red-100 border-2 border-red-400 text-red-800'
                        : index === currentQ.correct
                          ? 'bg-green-100 border-2 border-green-400 text-green-800'
                          : 'bg-gray-100 border-2 border-gray-200 text-gray-600'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold
                      ${!showResult 
                        ? 'border-gray-400 text-gray-600'
                        : selectedAnswer === index
                          ? index === currentQ.correct
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-red-500 bg-red-500 text-white'
                          : index === currentQ.correct
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-gray-400 text-gray-600'
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium">{option}</span>
                    {showResult && index === currentQ.correct && (
                      <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                    )}
                    {showResult && selectedAnswer === index && index !== currentQ.correct && (
                      <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                    )}
                  </div>
                </Button>
              ))}
            </div>

            {/* Result Explanation */}
            {showResult && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <div className="flex items-start space-x-3">
                  <div className="text-blue-600">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-800 mb-1">{currentQ.explanation}</p>
                    <p className="text-sm text-blue-700">💡 {currentQ.fact}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Timer Bar */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Tiempo restante</span>
                <span className="text-sm font-medium text-gray-700">{timeLeft}s</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    timeLeft > 10 ? 'bg-green-500' : 
                    timeLeft > 5 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(timeLeft / 30) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlantQuiz;
