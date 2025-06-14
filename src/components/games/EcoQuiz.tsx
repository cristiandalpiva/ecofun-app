import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import EcoMascot from "@/components/EcoMascot";

interface EcoQuizProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

const EcoQuiz = ({ onComplete, onBack }: EcoQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const questions = [
    {
      question: "¿Cuál es la mejor manera de ahorrar agua en casa?",
      options: ["Dejar el grifo abierto mientras me lavo los dientes", "Cerrar el grifo cuando no lo necesito", "Bañarme por mucho tiempo", "Usar más jabón para limpiar mejor"],
      correct: 1,
      explanation: "¡Muy bien! Cerrar el grifo mientras te lavas los dientes puede ahorrar hasta 20 litros de agua. ¡Es súper fácil de hacer! 💧",
      wrongExplanation: "Recuerda: cada gota cuenta. Cerrar el grifo cuando no lo usas es una forma súper fácil de cuidar el agua. ¡Tú puedes hacerlo! 💧"
    },
    {
      question: "¿Qué puedo hacer con el papel que ya usé de un lado?",
      options: ["Tirarlo directo a la basura", "Quemarlo en el patio", "Usarlo del otro lado para dibujar o escribir", "Dejarlo tirado por ahí"],
      correct: 2,
      explanation: "¡Excelente idea! Usar el papel por ambos lados es súper inteligente. ¡Así ayudas a salvar árboles! 🌳",
      wrongExplanation: "¡No te preocupes! El papel tiene dos lados útiles. Antes de tirarlo, puedes usarlo para dibujar o hacer tareas del otro lado. 📝"
    },
    {
      question: "¿Cuál es una buena forma de moverme cerca de casa?",
      options: ["Caminar o andar en bici (siempre con un adulto)", "Pedir que me lleven en auto para distancias muy cortas", "Dejar las luces prendidas cuando salgo", "Tirar papeles en las plantas"],
      correct: 0,
      explanation: "¡Perfecto! Caminar y andar en bici es divertido y cuida el planeta. Recuerda: siempre con un adulto que te cuide. 🚲",
      wrongExplanation: "Caminar o andar en bici es súper divertido y cuida el aire que respiramos. ¡Solo recuerda hacerlo siempre con un adulto! 🚶‍♂️"
    },
    {
      question: "¿Dónde va una botella de plástico vacía?",
      options: ["En cualquier basurero", "En el contenedor especial para plásticos", "Tirarla en la calle", "Dejarla en el parque"],
      correct: 1,
      explanation: "¡Genial! Separar el plástico ayuda a que se pueda reciclar y se convierta en cosas nuevas y útiles. ♻️",
      wrongExplanation: "El plástico es especial y necesita ir en su contenedor correcto para poder reciclarse. ¡Así puede tener una segunda vida! ♻️"
    },
    {
      question: "¿Qué necesitan las plantas para estar felices y crecer?",
      options: ["Solo mucha agua", "Agua, luz del sol y aire limpio", "Solo tierra", "Música muy fuerte todo el día"],
      correct: 1,
      explanation: "¡Correcto! Las plantas son como nosotros: necesitan agua, luz y aire limpio para estar sanas y felices. 🌱",
      wrongExplanation: "Las plantas son seres vivos como nosotros. Necesitan agua cuando tienen sed, luz del sol para su comida y aire limpio para respirar. 🌿"
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const handleComplete = () => {
    const points = score * 20;
    onComplete(points);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-300 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <EcoMascot size="large" mood="excited" />
              </div>
              <h2 className="text-3xl font-bold text-green-700 mb-4">¡Quiz Completado!</h2>
              <div className="text-6xl mb-4">
                {score >= 4 ? "🏆" : score >= 3 ? "🌟" : "🌱"}
              </div>
              <p className="text-xl text-gray-700 mb-4">
                Respondiste correctamente {score} de {questions.length} preguntas
              </p>
              <p className="text-lg text-green-600 mb-4">
                ¡Ganaste {score * 20} puntos ecológicos!
              </p>
              <p className="text-base text-gray-600 mb-6">
                {score >= 4 
                  ? "¡Eres un súper EcoHéroe! Sabes mucho sobre cuidar nuestro planeta 🌍" 
                  : score >= 3 
                  ? "¡Muy bien! Ya sabes muchas formas de cuidar la naturaleza 🌿"
                  : "¡Buen trabajo! Cada día puedes aprender más sobre cómo cuidar nuestro hogar: la Tierra 🌱"
                }
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg"
                >
                  ¡Genial!
                </Button>
                <Button 
                  onClick={onBack}
                  variant="outline"
                  className="border-2 border-green-400 text-green-600 hover:bg-green-50 font-semibold py-3 px-8 rounded-full"
                >
                  Volver al inicio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={onBack}
            variant="outline"
            className="border-2 border-green-400 text-green-600 hover:bg-green-50"
          >
            ← Volver
          </Button>
          <div className="flex items-center space-x-2">
            <EcoMascot size="small" mood="thinking" />
            <span className="font-semibold text-green-700">EcoQuiz</span>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-sm font-semibold text-green-600">
                Puntos: {score * 20}
              </span>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="space-y-3 mb-6">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left justify-start text-wrap h-auto ${
                    showExplanation
                      ? index === questions[currentQuestion].correct
                        ? 'bg-green-100 border-green-400 text-green-800 border-2'
                        : selectedAnswer === index
                        ? 'bg-red-100 border-red-400 text-red-800 border-2'
                        : 'bg-gray-100 text-gray-600'
                      : 'bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300 text-gray-800'
                  }`}
                  variant="outline"
                >
                  {option}
                </Button>
              ))}
            </div>

            {showExplanation && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800 text-center font-semibold">
                  {selectedAnswer === questions[currentQuestion].correct 
                    ? questions[currentQuestion].explanation
                    : questions[currentQuestion].wrongExplanation
                  }
                </p>
              </div>
            )}

            {showExplanation && (
              <div className="text-center">
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full"
                >
                  {currentQuestion < questions.length - 1 ? 'Siguiente' : 'Ver Resultados'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EcoQuiz;
