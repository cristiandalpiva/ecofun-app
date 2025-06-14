
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Leaf, CheckCircle, XCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface PlantQuizProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Plant {
  id: number;
  name: string;
  image: string;
  description: string;
  habitat: string;
  uses: string;
}

const PlantQuiz: React.FC<PlantQuizProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameCompleted, setGameCompleted] = useState(false);

  const plants: Plant[] = [
    {
      id: 1,
      name: "Rosa",
      image: "🌹",
      description: "Flor ornamental con espinas",
      habitat: "Jardines y parques",
      uses: "Decoración y perfumería"
    },
    {
      id: 2,
      name: "Girasol",
      image: "🌻",
      description: "Flor que sigue al sol",
      habitat: "Campos abiertos",
      uses: "Aceite y alimento"
    },
    {
      id: 3,
      name: "Cactus",
      image: "🌵",
      description: "Planta suculenta con espinas",
      habitat: "Desiertos",
      uses: "Decoración y medicina"
    },
    {
      id: 4,
      name: "Tulipán",
      image: "🌷",
      description: "Flor de bulbo con pétalos coloridos",
      habitat: "Jardines templados",
      uses: "Decoración"
    },
    {
      id: 5,
      name: "Bambú",
      image: "🎋",
      description: "Planta de crecimiento rápido",
      habitat: "Zonas húmedas",
      uses: "Construcción y textiles"
    },
    {
      id: 6,
      name: "Pino",
      image: "🌲",
      description: "Árbol conífero perenne",
      habitat: "Montañas y bosques",
      uses: "Madera y papel"
    },
    {
      id: 7,
      name: "Palma",
      image: "🌴",
      description: "Árbol tropical con hojas grandes",
      habitat: "Costas tropicales",
      uses: "Aceite y fibras"
    },
    {
      id: 8,
      name: "Hongo",
      image: "🍄",
      description: "Organismo que descompone materia",
      habitat: "Lugares húmedos",
      uses: "Alimentación y medicina"
    }
  ];

  const [questions, setQuestions] = useState<Array<{
    plant: Plant;
    options: string[];
    correct: string;
  }>>([]);

  useEffect(() => {
    // Generate 5 random questions
    const shuffledPlants = [...plants].sort(() => Math.random() - 0.5).slice(0, 5);
    const newQuestions = shuffledPlants.map(plant => {
      const wrongAnswers = plants
        .filter(p => p.id !== plant.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(p => p.name);
      
      const options = [plant.name, ...wrongAnswers].sort(() => Math.random() - 0.5);
      
      return {
        plant,
        options,
        correct: plant.name
      };
    });
    
    setQuestions(newQuestions);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer("");
    }
  }, [timeLeft, showResult, gameCompleted]);

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "¡Correcto! 🌿",
        description: `¡${questions[currentQuestion].plant.name} es correcto!`,
      });
    } else {
      toast({
        title: "Incorrecto 🤔",
        description: `Era ${questions[currentQuestion].correct}. ¡Sigue intentando!`,
        variant: "destructive"
      });
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(15);
      } else {
        setGameCompleted(true);
      }
    }, 2000);
  };

  const handleComplete = () => {
    const basePoints = score * 20;
    const timeBonus = Math.floor(timeLeft / 3);
    const perfectBonus = score === questions.length ? 30 : 0;
    const totalPoints = basePoints + timeBonus + perfectBonus;
    onComplete(totalPoints);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-green-700">Preparando el quiz...</p>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-cyan-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🌿</div>
              <h2 className="text-3xl font-bold text-green-800 mb-4">¡Quiz Completado!</h2>
              <div className="text-5xl font-bold text-green-600 mb-4">{score}/{questions.length}</div>
              <p className="text-xl text-green-700 mb-6">{percentage}% de aciertos</p>
              
              <Card className="bg-green-50 border-2 border-green-300 mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-green-800 mb-3">🌱 Mensaje Educativo</h3>
                  <p className="text-green-700 text-sm leading-relaxed">
                    Las plantas son esenciales para la vida en la Tierra. Producen el oxígeno que respiramos, 
                    purifican el aire, proporcionan alimentos y medicinas, y son la base de todos los ecosistemas. 
                    Conocer las diferentes especies nos ayuda a valorar la biodiversidad y a proteger nuestro entorno natural. 
                    ¡Cada planta tiene una función única en la naturaleza! 🌍
                  </p>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white font-semibold px-8 py-3 rounded-full text-lg"
                >
                  ¡Completar! (+{score * 20 + (score === questions.length ? 30 : 0)} pts)
                </Button>
                
                <Button variant="outline" onClick={onBack} className="ml-4">
                  Volver al Menú
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-cyan-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <h1 className="text-2xl font-bold text-green-700 flex items-center">
                <Leaf className="mr-2" />
                Quiz de Plantas
              </h1>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">⏰ {timeLeft}s</p>
                <p className="text-sm text-green-500">{score}/{questions.length}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-green-600">Pregunta {currentQuestion + 1} de {questions.length}</span>
                <span className="text-sm text-green-600">Puntuación: {score}</span>
              </div>
              <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
            </div>

            <div className="text-center mb-8">
              <div className="text-8xl mb-4">{currentQ.plant.image}</div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">¿Qué planta es esta?</h2>
              <p className="text-green-600 mb-2">{currentQ.plant.description}</p>
              <p className="text-sm text-green-500">Hábitat: {currentQ.plant.habitat}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {currentQ.options.map((option, index) => {
                let buttonClass = "p-4 text-lg font-semibold border-2 transition-all duration-300 ";
                
                if (showResult) {
                  if (option === currentQ.correct) {
                    buttonClass += "bg-green-100 border-green-400 text-green-800";
                  } else if (option === selectedAnswer && option !== currentQ.correct) {
                    buttonClass += "bg-red-100 border-red-400 text-red-800";
                  } else {
                    buttonClass += "bg-gray-100 border-gray-300 text-gray-600";
                  }
                } else {
                  buttonClass += "bg-white border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 hover:scale-105";
                }

                return (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{option}</span>
                      {showResult && option === currentQ.correct && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {showResult && option === selectedAnswer && option !== currentQ.correct && (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>
            
            {showResult && (
              <div className="text-center mt-6">
                <Card className="bg-green-50 border-2 border-green-300 max-w-md mx-auto">
                  <CardContent className="p-4">
                    <p className="text-sm text-green-700">
                      <strong>Usos:</strong> {currentQ.plant.uses}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlantQuiz;
