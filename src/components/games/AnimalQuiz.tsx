
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Heart, CheckCircle, XCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface AnimalQuizProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Animal {
  id: number;
  name: string;
  image: string;
  description: string;
  habitat: string;
  diet: string;
  conservation: string;
}

const AnimalQuiz: React.FC<AnimalQuizProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameCompleted, setGameCompleted] = useState(false);

  const animals: Animal[] = [
    {
      id: 1,
      name: "León",
      image: "🦁",
      description: "Rey de la selva con melena dorada",
      habitat: "Sabana africana",
      diet: "Carnívoro",
      conservation: "Vulnerable"
    },
    {
      id: 2,
      name: "Elefante",
      image: "🐘",
      description: "Mamífero gigante con trompa larga",
      habitat: "Sabana y bosques",
      diet: "Herbívoro",
      conservation: "En peligro"
    },
    {
      id: 3,
      name: "Pingüino",
      image: "🐧",
      description: "Ave marina que no puede volar",
      habitat: "Regiones polares",
      diet: "Piscívoro",
      conservation: "Varias especies amenazadas"
    },
    {
      id: 4,
      name: "Panda",
      image: "🐼",
      description: "Oso blanco y negro que come bambú",
      habitat: "Montañas de China",
      diet: "Herbívoro (bambú)",
      conservation: "Vulnerable"
    },
    {
      id: 5,
      name: "Tigre",
      image: "🐅",
      description: "Felino rayado, el más grande del mundo",
      habitat: "Bosques asiáticos",
      diet: "Carnívoro",
      conservation: "En peligro"
    },
    {
      id: 6,
      name: "Koala",
      image: "🐨",
      description: "Marsupial que vive en eucaliptos",
      habitat: "Bosques de Australia",
      diet: "Herbívoro (eucalipto)",
      conservation: "Vulnerable"
    },
    {
      id: 7,
      name: "Jirafa",
      image: "🦒",
      description: "Animal más alto del mundo",
      habitat: "Sabana africana",
      diet: "Herbívoro",
      conservation: "Vulnerable"
    },
    {
      id: 8,
      name: "Delfín",
      image: "🐬",
      description: "Mamífero marino muy inteligente",
      habitat: "Océanos",
      diet: "Piscívoro",
      conservation: "Varias especies amenazadas"
    },
    {
      id: 9,
      name: "Lobo",
      image: "🐺",
      description: "Ancestro salvaje de los perros",
      habitat: "Bosques y tundra",
      diet: "Carnívoro",
      conservation: "Preocupación menor"
    },
    {
      id: 10,
      name: "Tortuga Marina",
      image: "🐢",
      description: "Reptil marino de caparazón duro",
      habitat: "Océanos tropicales",
      diet: "Omnívoro",
      conservation: "En peligro crítico"
    }
  ];

  const [questions, setQuestions] = useState<Array<{
    animal: Animal;
    options: string[];
    correct: string;
  }>>([]);

  useEffect(() => {
    // Generate 6 random questions
    const shuffledAnimals = [...animals].sort(() => Math.random() - 0.5).slice(0, 6);
    const newQuestions = shuffledAnimals.map(animal => {
      const wrongAnswers = animals
        .filter(a => a.id !== animal.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(a => a.name);
      
      const options = [animal.name, ...wrongAnswers].sort(() => Math.random() - 0.5);
      
      return {
        animal,
        options,
        correct: animal.name
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
        title: "¡Excelente! 🦁",
        description: `¡${questions[currentQuestion].animal.name} es correcto!`,
      });
    } else {
      toast({
        title: "¡Inténtalo de nuevo! 🤔",
        description: `Era ${questions[currentQuestion].correct}. ¡Sigue aprendiendo!`,
        variant: "destructive"
      });
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(20);
      } else {
        setGameCompleted(true);
      }
    }, 2500);
  };

  const handleComplete = () => {
    const basePoints = score * 25;
    const timeBonus = Math.floor(timeLeft / 4);
    const perfectBonus = score === questions.length ? 40 : 0;
    const totalPoints = basePoints + timeBonus + perfectBonus;
    onComplete(totalPoints);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-12 h-12 text-pink-600 animate-pulse mx-auto mb-4" />
          <p className="text-pink-700">Preparando el safari...</p>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🦁</div>
              <h2 className="text-3xl font-bold text-purple-800 mb-4">¡Safari Completado!</h2>
              <div className="text-5xl font-bold text-purple-600 mb-4">{score}/{questions.length}</div>
              <p className="text-xl text-purple-700 mb-6">{percentage}% de aciertos</p>
              
              <Card className="bg-purple-50 border-2 border-purple-300 mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-purple-800 mb-3">🐾 Mensaje de Conservación</h3>
                  <p className="text-purple-700 text-sm leading-relaxed">
                    Los animales salvajes enfrentan grandes desafíos por la pérdida de hábitat, la caza ilegal y el cambio climático. 
                    Muchas especies están en peligro de extinción. Proteger la vida silvestre es responsabilidad de todos. 
                    Podemos ayudar respetando sus hábitats, no comprando productos de animales en peligro, 
                    y apoyando organizaciones de conservación. ¡Cada animal tiene un papel importante en la naturaleza! 🌍❤️
                  </p>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-8 py-3 rounded-full text-lg"
                >
                  ¡Completar! (+{score * 25 + (score === questions.length ? 40 : 0)} pts)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <h1 className="text-2xl font-bold text-purple-700 flex items-center">
                <Heart className="mr-2" />
                Safari Animal
              </h1>
              <div className="text-right">
                <p className="text-lg font-bold text-purple-600">⏰ {timeLeft}s</p>
                <p className="text-sm text-purple-500">{score}/{questions.length}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-purple-600">Pregunta {currentQuestion + 1} de {questions.length}</span>
                <span className="text-sm text-purple-600">Puntuación: {score}</span>
              </div>
              <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
            </div>

            <div className="text-center mb-8">
              <div className="text-8xl mb-4">{currentQ.animal.image}</div>
              <h2 className="text-2xl font-bold text-purple-800 mb-2">¿Qué animal es este?</h2>
              <p className="text-purple-600 mb-2">{currentQ.animal.description}</p>
              <p className="text-sm text-purple-500">Hábitat: {currentQ.animal.habitat}</p>
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
                  buttonClass += "bg-white border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 hover:scale-105";
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
                <Card className="bg-purple-50 border-2 border-purple-300 max-w-md mx-auto">
                  <CardContent className="p-4">
                    <p className="text-sm text-purple-700 mb-1">
                      <strong>Dieta:</strong> {currentQ.animal.diet}
                    </p>
                    <p className="text-sm text-purple-700">
                      <strong>Estado:</strong> {currentQ.animal.conservation}
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

export default AnimalQuiz;
