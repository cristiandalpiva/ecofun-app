
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Volume2 } from "lucide-react";
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
  const [currentCategory, setCurrentCategory] = useState(0);

  const categories = [
    { name: "Cuidado del Agua", emoji: "💧", color: "bg-blue-100" },
    { name: "Reciclaje", emoji: "♻️", color: "bg-green-100" },
    { name: "Energía", emoji: "⚡", color: "bg-yellow-100" },
    { name: "Naturaleza", emoji: "🌱", color: "bg-green-100" },
    { name: "Transporte", emoji: "🚲", color: "bg-blue-100" }
  ];

  const questions = [
    // Categoría 1: Cuidado del Agua (5 preguntas)
    {
      category: 0,
      question: "¿Cuál es la mejor manera de ahorrar agua en casa?",
      options: ["Dejar el grifo abierto mientras me lavo los dientes", "Cerrar el grifo cuando no lo necesito", "Bañarme por mucho tiempo", "Usar más jabón para limpiar mejor"],
      correct: 1,
      explanation: "¡Muy bien! Cerrar el grifo mientras te lavas los dientes puede ahorrar hasta 20 litros de agua. ¡Es súper fácil de hacer! 💧",
      wrongExplanation: "Recuerda: cada gota cuenta. Cerrar el grifo cuando no lo usas es una forma súper fácil de cuidar el agua. ¡Tú puedes hacerlo! 💧"
    },
    {
      category: 0,
      question: "¿Cuánta agua se puede ahorrar con una ducha de 5 minutos?",
      options: ["La misma que una bañera llena", "Mucha menos que una bañera", "No se ahorra nada", "Solo un poquito"],
      correct: 1,
      explanation: "¡Correcto! Una ducha corta usa mucha menos agua que llenar la bañera. ¡Cada minuto menos cuenta! 🚿",
      wrongExplanation: "Una ducha rápida siempre usa menos agua que llenar toda la bañera. ¡Pide ayuda para medir el tiempo! 🚿"
    },
    {
      category: 0,
      question: "¿Qué podemos hacer con el agua de lluvia?",
      options: ["Tirarla porque está sucia", "Usarla para regar las plantas", "No se puede usar para nada", "Solo para lavar el auto"],
      correct: 1,
      explanation: "¡Excelente! El agua de lluvia es perfecta para regar plantas. ¡Es un regalo de la naturaleza! 🌧️",
      wrongExplanation: "El agua de lluvia es limpia y perfecta para regar nuestras plantas. ¡Es como reciclar el agua del cielo! 🌧️"
    },
    {
      category: 0,
      question: "¿Qué hacer si veo un grifo que gotea?",
      options: ["Ignorarlo porque no es mi problema", "Decirle a un adulto para que lo arregle", "Dejarlo así porque es poquita agua", "Ponerle un vaso debajo"],
      correct: 1,
      explanation: "¡Perfecto! Un grifo que gotea puede desperdiciar muchísima agua al día. ¡Siempre hay que arreglarlo! 🔧",
      wrongExplanation: "Una gotera pequeña puede desperdiciar litros y litros de agua. ¡Siempre pide ayuda para arreglarla! 🔧"
    },
    {
      category: 0,
      question: "¿Cuál es la mejor manera de lavar los platos para ahorrar agua?",
      options: ["Con el grifo abierto todo el tiempo", "Llenar un recipiente con agua jabonosa", "Con agua muy caliente siempre", "Sin jabón para no contaminar"],
      correct: 1,
      explanation: "¡Genial! Llenar un recipiente ahorra mucha más agua que tener el grifo abierto. ¡Eres súper inteligente! 🍽️",
      wrongExplanation: "Usar un recipiente con agua jabonosa es mucho más eficiente que tener el grifo corriendo. ¡Pruébalo! 🍽️"
    },

    // Categoría 2: Reciclaje (5 preguntas)
    {
      category: 1,
      question: "¿Dónde va una botella de plástico vacía?",
      options: ["En cualquier basurero", "En el contenedor especial para plásticos", "Tirarla en la calle", "Dejarla en el parque"],
      correct: 1,
      explanation: "¡Genial! Separar el plástico ayuda a que se pueda reciclar y se convierta en cosas nuevas y útiles. ♻️",
      wrongExplanation: "El plástico es especial y necesita ir en su contenedor correcto para poder reciclarse. ¡Así puede tener una segunda vida! ♻️"
    },
    {
      category: 1,
      question: "¿Qué puedo hacer con el papel que ya usé de un lado?",
      options: ["Tirarlo directo a la basura", "Quemarlo en el patio", "Usarlo del otro lado para dibujar o escribir", "Dejarlo tirado por ahí"],
      correct: 2,
      explanation: "¡Excelente idea! Usar el papel por ambos lados es súper inteligente. ¡Así ayudas a salvar árboles! 🌳",
      wrongExplanation: "¡No te preocupes! El papel tiene dos lados útiles. Antes de tirarlo, puedes usarlo para dibujar o hacer tareas del otro lado. 📝"
    },
    {
      category: 1,
      question: "¿Qué significa el símbolo de reciclaje con las tres flechas?",
      options: ["Que hay que tirarlo a la basura", "Que se puede reciclar y usar de nuevo", "Que está roto", "Que es muy caro"],
      correct: 1,
      explanation: "¡Correcto! Ese símbolo significa que ese material puede reciclarse y convertirse en algo nuevo. ¡Es como magia! ♻️",
      wrongExplanation: "Las tres flechas en círculo significan que ese material puede reciclarse. ¡Busca ese símbolo en las cosas! ♻️"
    },
    {
      category: 1,
      question: "¿Qué pasa con las latas de aluminio cuando las reciclamos?",
      options: ["Se convierten en basura", "Pueden convertirse en nuevas latas", "Desaparecen para siempre", "Se vuelven tóxicas"],
      correct: 1,
      explanation: "¡Increíble! Una lata de aluminio puede convertirse en una lata nueva infinitas veces. ¡Es súper poderosa! 🥫",
      wrongExplanation: "Las latas de aluminio son especiales porque pueden reciclarse una y otra vez sin perder calidad. ¡Son súper valiosas! 🥫"
    },
    {
      category: 1,
      question: "¿Qué podemos hacer con los envases de vidrio vacíos?",
      options: ["Romperlos para que ocupen menos espacio", "Lavarlos y reciclarlos", "Enterrarlos en el jardín", "Usarlos como juguetes"],
      correct: 1,
      explanation: "¡Perfecto! El vidrio se puede reciclar completamente y convertirse en nuevos envases. ¡Es fantástico! 🫙",
      wrongExplanation: "El vidrio limpio se puede reciclar al 100% y convertirse en nuevos envases. ¡Siempre hay que lavarlo primero! 🫙"
    },

    // Categoría 3: Energía (5 preguntas)
    {
      category: 2,
      question: "¿Qué debo hacer cuando salgo de una habitación?",
      options: ["Dejar todas las luces prendidas", "Apagar las luces que no necesito", "Prender más luces", "No importa lo que haga"],
      correct: 1,
      explanation: "¡Excelente! Apagar las luces cuando no las usamos ahorra energía y cuida el planeta. ¡Eres un súper ahorrador! 💡",
      wrongExplanation: "Apagar las luces cuando salimos es una forma súper fácil de cuidar la energía. ¡Es como darle un descanso al planeta! 💡"
    },
    {
      category: 2,
      question: "¿Cuál es la mejor fuente de luz durante el día?",
      options: ["Las luces eléctricas", "La luz del sol", "Las velas", "Las linternas"],
      correct: 1,
      explanation: "¡Genial! La luz del sol es gratis, natural y no contamina. ¡Es el mejor regalo de la naturaleza! ☀️",
      wrongExplanation: "El sol nos da luz gratis y limpia durante el día. ¡Aprovecha siempre la luz natural! ☀️"
    },
    {
      category: 2,
      question: "¿Qué pasa si dejamos los aparatos conectados sin usarlos?",
      options: ["No pasa nada", "Gastan energía aunque estén apagados", "Se mejoran solos", "Duran más tiempo"],
      correct: 1,
      explanation: "¡Muy bien! Muchos aparatos siguen gastando energía aunque parezcan apagados. ¡Desconectarlos es súper inteligente! 🔌",
      wrongExplanation: "Aunque parezcan apagados, muchos aparatos siguen 'comiendo' energía. ¡Desconectarlos ayuda mucho al planeta! 🔌"
    },
    {
      category: 2,
      question: "¿Cuál es una buena forma de secar la ropa?",
      options: ["Siempre en la secadora eléctrica", "Al sol y al aire libre cuando se puede", "Nunca secarla", "Con muchos ventiladores"],
      correct: 1,
      explanation: "¡Perfecto! El sol y el aire secan la ropa gratis y la dejan oliendo súper bien. ¡La naturaleza es increíble! 👕",
      wrongExplanation: "El sol y el viento son secadores naturales y gratis. ¡Además hacen que la ropa huela delicioso! 👕"
    },
    {
      category: 2,
      question: "¿Qué tipo de bombilla ahorra más energía?",
      options: ["Las bombillas viejas grandes", "Las bombillas LED", "Las que más luz dan", "No importa el tipo"],
      correct: 1,
      explanation: "¡Excelente! Las bombillas LED usan mucha menos energía y duran muchísimo más tiempo. ¡Son súper eficientes! 💡",
      wrongExplanation: "Las bombillas LED son como súper héroes de la energía: usan poquito y duran muchísimo. ¡Son las mejores! 💡"
    },

    // Categoría 4: Naturaleza (5 preguntas)
    {
      category: 3,
      question: "¿Qué necesitan las plantas para estar felices y crecer?",
      options: ["Solo mucha agua", "Agua, luz del sol y aire limpio", "Solo tierra", "Música muy fuerte todo el día"],
      correct: 1,
      explanation: "¡Correcto! Las plantas son como nosotros: necesitan agua, luz y aire limpio para estar sanas y felices. 🌱",
      wrongExplanation: "Las plantas son seres vivos como nosotros. Necesitan agua cuando tienen sed, luz del sol para su comida y aire limpio para respirar. 🌿"
    },
    {
      category: 3,
      question: "¿Por qué son importantes los árboles?",
      options: ["Solo para hacer sombra", "Nos dan oxígeno y limpian el aire", "Para que se vean bonitos", "No son importantes"],
      correct: 1,
      explanation: "¡Genial! Los árboles son como fábricas de aire limpio. ¡Nos dan el oxígeno que respiramos! 🌳",
      wrongExplanation: "Los árboles son nuestros mejores amigos: nos dan aire limpio, sombra, y hogar a muchos animales. ¡Son súper importantes! 🌳"
    },
    {
      category: 3,
      question: "¿Qué debemos hacer cuando vemos basura en la naturaleza?",
      options: ["Dejarla ahí porque no es nuestra", "Recogerla y tirarla en su lugar correcto", "Agregar más basura", "Esconderla debajo de las hojas"],
      correct: 1,
      explanation: "¡Excelente! Recoger basura ayuda a mantener limpia la casa de los animales y plantas. ¡Eres un héroe verde! 🗑️",
      wrongExplanation: "La naturaleza es el hogar de animales y plantas. Cuando recogemos basura, los ayudamos a vivir mejor. ¡Tú puedes ser su héroe! 🗑️"
    },
    {
      category: 3,
      question: "¿Cómo podemos ayudar a los animales silvestres?",
      options: ["Llevarlos a casa como mascotas", "Respetar su espacio y no tirar basura", "Darles comida humana", "Hacer mucho ruido para llamar su atención"],
      correct: 1,
      explanation: "¡Perfecto! Los animales silvestres son felices en su hogar natural. Respetarlos y no contaminar es la mejor ayuda. 🦋",
      wrongExplanation: "Los animales silvestres necesitan su espacio natural limpio y tranquilo. ¡La mejor ayuda es respetarlos desde lejos! 🦋"
    },
    {
      category: 3,
      question: "¿Qué pasa si cortamos flores de los parques sin permiso?",
      options: ["No pasa nada malo", "Las plantas se debilitan y otros no pueden disfrutarlas", "Crecen más rápido", "Se vuelven más bonitas"],
      correct: 1,
      explanation: "¡Muy bien! Las flores en su lugar natural alimentan a las abejas y alegran a todos. ¡Es mejor dejarlas crecer! 🌸",
      wrongExplanation: "Las flores en su lugar natural son comida para las abejas y alegría para todos. ¡Es mejor admirarlas y dejarlas crecer! 🌸"
    },

    // Categoría 5: Transporte (5 preguntas)
    {
      category: 4,
      question: "¿Cuál es una buena forma de moverme cerca de casa?",
      options: ["Caminar o andar en bici (siempre con un adulto)", "Pedir que me lleven en auto para distancias muy cortas", "Usar muchos vehículos a la vez", "No salir nunca de casa"],
      correct: 0,
      explanation: "¡Perfecto! Caminar y andar en bici es divertido y cuida el planeta. Recuerda: siempre con un adulto que te cuide. 🚲",
      wrongExplanation: "Caminar o andar en bici es súper divertido y cuida el aire que respiramos. ¡Solo recuerda hacerlo siempre con un adulto! 🚶‍♂️"
    },
    {
      category: 4,
      question: "¿Por qué es bueno usar menos el auto?",
      options: ["Porque es aburrido", "Porque contamina menos el aire", "Porque es muy caro", "No es bueno, hay que usarlo siempre"],
      correct: 1,
      explanation: "¡Correcto! Usar menos el auto significa aire más limpio para todos. ¡Cada viaje a pie o en bici cuenta! 🌬️",
      wrongExplanation: "Los autos producen gases que ensucian el aire. Caminar o usar bici cuando se puede ayuda a tener aire más limpio. 🌬️"
    },
    {
      category: 4,
      question: "¿Cuál es la mejor manera de ir al colegio si vivo cerca?",
      options: ["Siempre en auto aunque esté cerca", "Caminando con un adulto", "Corriendo solo", "En helicóptero"],
      correct: 1,
      explanation: "¡Genial! Caminar al colegio es ejercicio, cuida el ambiente y es divertido. ¡Siempre acompañade de un adulto! 🎒",
      wrongExplanation: "Caminar al colegio es súper bueno para tu salud y para el planeta. ¡Solo recuerda ir siempre con un adulto de confianza! 🎒"
    },
    {
      category: 4,
      question: "¿Qué podemos hacer cuando necesitamos ir lejos?",
      options: ["Usar transporte público cuando sea posible", "Cada persona usar su propio auto", "No ir nunca lejos", "Caminar aunque tome todo el día"],
      correct: 0,
      explanation: "¡Muy bien! El transporte público lleva muchas personas a la vez, así contamina menos por persona. ¡Es súper eficiente! 🚌",
      wrongExplanation: "El transporte público es como un auto gigante que lleva muchas personas juntas. ¡Así contamina menos por cada persona! 🚌"
    },
    {
      category: 4,
      question: "¿Qué tipo de vehículo contamina menos?",
      options: ["Los que usan mucha gasolina", "Los eléctricos o los que no usan combustible", "Los muy grandes", "Todos contaminan igual"],
      correct: 1,
      explanation: "¡Excelente! Los vehículos eléctricos y las bicicletas no producen gases tóxicos. ¡Son súper amigables con el ambiente! ⚡",
      wrongExplanation: "Los vehículos eléctricos y las bicicletas son como súper héroes del transporte: ¡no ensucian el aire! ⚡"
    }
  ];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const categoryQuestions = questions.filter(q => q.category === currentCategory);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === categoryQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < categoryQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else if (currentCategory < categories.length - 1) {
      setCurrentCategory(currentCategory + 1);
      setCurrentQuestion(0);
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
                {score >= 20 ? "🏆" : score >= 15 ? "🌟" : "🌱"}
              </div>
              <p className="text-xl text-gray-700 mb-4">
                Respondiste correctamente {score} de {questions.length} preguntas
              </p>
              <p className="text-lg text-green-600 mb-4">
                ¡Ganaste {score * 20} puntos ecológicos!
              </p>
              <p className="text-base text-gray-600 mb-6">
                {score >= 20 
                  ? "¡Eres un súper EcoExploradorx! Sabes mucho sobre cuidar nuestro planeta 🌍" 
                  : score >= 15 
                  ? "¡Muy bien! Ya sabes muchas formas de cuidar la naturaleza 🌿"
                  : "¡Buen trabajo! Cada día puedes aprender más sobre cómo cuidar nuestro hogar: la Tierra 🌱"
                }
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 hover:scale-105 transform transition-all duration-300 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-2xl"
                >
                  ¡Genial!
                </Button>
                <Button 
                  onClick={onBack}
                  variant="outline"
                  className="border-2 border-green-400 text-green-600 hover:bg-green-50 hover:border-green-500 hover:scale-105 transform transition-all duration-300 font-semibold py-3 px-8 rounded-full"
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

  const currentQ = categoryQuestions[currentQuestion];
  const totalProgress = ((currentCategory * 5 + currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Button 
            onClick={onBack}
            variant="outline"
            className="border-2 border-green-400 text-green-600 hover:bg-green-50 hover:border-green-500 hover:scale-105 transform transition-all duration-300 w-fit"
          >
            ← Volver
          </Button>
          <div className="flex items-center space-x-2">
            <EcoMascot size="small" mood="thinking" />
            <span className="font-semibold text-green-700">EcoQuiz</span>
          </div>
        </div>

        {/* Category Progress */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{categories[currentCategory].emoji}</span>
                <span className="text-sm font-semibold text-gray-600">
                  {categories[currentCategory].name}
                </span>
              </div>
              <span className="text-sm font-semibold text-green-600">
                Puntos: {score * 20}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">
                Pregunta {currentQuestion + 1} de {categoryQuestions.length} | Categoría {currentCategory + 1} de {categories.length}
              </span>
            </div>
            <Progress value={totalProgress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex-1">
                {currentQ.question}
              </h2>
              <Button
                variant="outline"
                size="icon"
                onClick={() => speak(currentQ.question)}
                className="ml-3 hover:scale-110 transform transition-all duration-300 hover:bg-blue-50"
                title="Escuchar pregunta"
              >
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left justify-start text-wrap h-auto hover:scale-102 transform transition-all duration-300 ${
                    showExplanation
                      ? index === currentQ.correct
                        ? 'bg-green-100 border-green-400 text-green-800 border-2 shadow-lg'
                        : selectedAnswer === index
                        ? 'bg-red-100 border-red-400 text-red-800 border-2'
                        : 'bg-gray-100 text-gray-600'
                      : 'bg-white hover:bg-green-50 border-2 border-gray-200 hover:border-green-400 hover:shadow-lg text-gray-800'
                  }`}
                  variant="outline"
                >
                  {option}
                </Button>
              ))}
            </div>

            {showExplanation && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-start justify-between">
                  <p className="text-blue-800 font-semibold flex-1">
                    {selectedAnswer === currentQ.correct 
                      ? currentQ.explanation
                      : currentQ.wrongExplanation
                    }
                  </p>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => speak(selectedAnswer === currentQ.correct ? currentQ.explanation : currentQ.wrongExplanation)}
                    className="ml-3 hover:scale-110 transform transition-all duration-300 hover:bg-blue-100"
                    title="Escuchar explicación"
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {showExplanation && (
              <div className="text-center">
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 hover:scale-105 transform transition-all duration-300 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl"
                >
                  {currentQuestion < categoryQuestions.length - 1 
                    ? 'Siguiente' 
                    : currentCategory < categories.length - 1 
                    ? 'Siguiente Categoría' 
                    : 'Ver Resultados'
                  }
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
