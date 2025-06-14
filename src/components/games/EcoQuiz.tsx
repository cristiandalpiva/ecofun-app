
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
      question: "¿Cuál es la mejor manera de ahorrar agua?",
      options: ["Dejar el grifo abierto", "Cerrar el grifo al lavarse los dientes", "Bañarse por horas", "Usar más jabón"],
      correct: 1,
      explanation: "¡Correcto! Cerrar el grifo puede ahorrar hasta 20 litros de agua por minuto. 💧"
    },
    {
      question: "¿Qué podemos hacer con el papel usado?",
      options: ["Tirarlo a la basura", "Quemarlo", "Reciclarlo o reutilizarlo", "Dejarlo en el suelo"],
      correct: 2,
      explanation: "¡Excelente! Reciclar papel ayuda a salvar árboles y reduce la contaminación. 🌳"
    },
    {
      question: "¿Cuál de estos es mejor para el medio ambiente?",
      options: ["Caminar o andar en bicicleta", "Usar el auto para distancias cortas", "Dejar las luces encendidas", "Tirar basura en la calle"],
      correct: 0,
      explanation: "¡Perfecto! Caminar y andar en bici no contamina y es bueno para tu salud. 🚲"
    },
    {
      question: "¿Dónde va el plástico?",
      options: ["En cualquier basurero", "En el contenedor de reciclaje", "En el suelo", "En el agua"],
      correct: 1,
      explanation: "¡Genial! El plástico reciclado puede convertirse en nuevos productos útiles. ♻️"
    },
    {
      question: "¿Qué necesitan las plantas para crecer?",
      options: ["Solo agua", "Agua, luz solar y aire limpio", "Solo tierra", "Música fuerte"],
      correct: 1,
      explanation: "¡Correcto! Las plantas necesitan agua, luz solar y aire limpio para crecer sanas. 🌱"
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
              <p className="text-lg text-green-600 mb-6">
                ¡Ganaste {score * 20} puntos ecológicos!
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
                  {questions[currentQuestion].explanation}
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
