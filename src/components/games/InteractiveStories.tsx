
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, BookOpen } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface InteractiveStoriesProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface StoryChoice {
  text: string;
  ecoPoints: number;
  consequence: string;
  nextScene: number | 'end';
}

interface StoryScene {
  id: number;
  title: string;
  description: string;
  image: string;
  choices: StoryChoice[];
}

interface Story {
  id: string;
  title: string;
  theme: string;
  description: string;
  icon: string;
  bgGradient: string;
  scenes: StoryScene[];
  finalMessage: string;
}

const InteractiveStories: React.FC<InteractiveStoriesProps> = ({ onComplete, onBack }) => {
  const [gameState, setGameState] = useState<'storySelect' | 'playing' | 'storyComplete'>('storySelect');
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);

  const stories: Story[] = [
    {
      id: "forest-adventure",
      title: "La Aventura del Bosque",
      theme: "Aprendizaje del Medio Ambiente",
      description: "Descubre los secretos del bosque y aprende sobre los ecosistemas",
      icon: "🌳",
      bgGradient: "from-green-200 to-emerald-100",
      scenes: [
        {
          id: 0,
          title: "Entrada al Bosque",
          description: "Estás explorando un hermoso bosque cuando encuentras basura tirada. Los animales parecen preocupados.",
          image: "🌲🦝🗑️",
          choices: [
            {
              text: "Recoger toda la basura y buscar un contenedor",
              ecoPoints: 10,
              consequence: "Los animales te agradecen y te muestran el camino a un río cristalino.",
              nextScene: 1
            },
            {
              text: "Recoger solo algunas cosas y continuar",
              ecoPoints: 5,
              consequence: "Ayudas un poco, pero algunos animales siguen preocupados.",
              nextScene: 1
            },
            {
              text: "Ignorar la basura y seguir caminando",
              ecoPoints: 0,
              consequence: "Los animales huyen asustados y el ambiente se vuelve más silencioso.",
              nextScene: 1
            }
          ]
        },
        {
          id: 1,
          title: "El Río Misterioso",
          description: "Llegas a un río donde hay peces saltando. Ves una fábrica cerca que está liberando humo.",
          image: "🏭💨🐟",
          choices: [
            {
              text: "Investigar la fábrica y hablar con los trabajadores sobre el impacto ambiental",
              ecoPoints: 15,
              consequence: "Descubres que pueden usar filtros para reducir la contaminación.",
              nextScene: 2
            },
            {
              text: "Tomar fotos del río contaminado para reportarlo",
              ecoPoints: 10,
              consequence: "Tu reporte ayuda a que las autoridades tomen medidas.",
              nextScene: 2
            },
            {
              text: "Buscar otro lugar para explorar",
              ecoPoints: 0,
              consequence: "Te alejas del problema, pero la contaminación continúa.",
              nextScene: 2
            }
          ]
        },
        {
          id: 2,
          title: "El Guardián del Bosque",
          description: "Un viejo búho sabio te habla sobre la importancia de proteger el bosque para las futuras generaciones.",
          image: "🦉🌿✨",
          choices: [
            {
              text: "Prometes convertirte en protector del bosque y enseñar a otros",
              ecoPoints: 20,
              consequence: "El búho te otorga el título de 'Guardián Junior del Bosque'.",
              nextScene: 'end'
            },
            {
              text: "Agradeces la lección y prometes ser más cuidadoso",
              ecoPoints: 10,
              consequence: "El búho sonríe y te da una semilla especial para plantar.",
              nextScene: 'end'
            }
          ]
        }
      ],
      finalMessage: "¡Has aprendido que cada pequeña acción cuenta para proteger nuestros ecosistemas! El bosque y sus habitantes dependen de decisiones responsables."
    },
    {
      id: "recycling-hero",
      title: "El Héroe del Reciclaje",
      theme: "Reciclaje y Reutilización",
      description: "Conviértete en un experto en reciclaje y ayuda a tu comunidad",
      icon: "♻️",
      bgGradient: "from-blue-200 to-green-100",
      scenes: [
        {
          id: 0,
          title: "La Escuela Desordenada",
          description: "Tu escuela tiene un problema: hay basura mezclada por todas partes y los contenedores están mal utilizados.",
          image: "🏫🗑️📚",
          choices: [
            {
              text: "Organizar una campaña de clasificación de residuos con tus compañeros",
              ecoPoints: 15,
              consequence: "Todos aprenden a separar correctamente y la escuela se ve más limpia.",
              nextScene: 1
            },
            {
              text: "Hablar con el director sobre implementar más contenedores",
              ecoPoints: 10,
              consequence: "El director acepta y compra contenedores de colores para cada tipo de residuo.",
              nextScene: 1
            },
            {
              text: "Solo clasificar tu propia basura",
              ecoPoints: 5,
              consequence: "Das el ejemplo, pero el problema general persiste.",
              nextScene: 1
            }
          ]
        },
        {
          id: 1,
          title: "El Taller de Creatividad",
          description: "Tienes muchos materiales 'basura' como botellas, cartones y latas. ¿Qué puedes hacer con ellos?",
          image: "🧴📦🥤",
          choices: [
            {
              text: "Crear un huerto vertical con las botellas y macetas con los cartones",
              ecoPoints: 20,
              consequence: "Tu proyecto inspira a toda la escuela a crear su propio huerto.",
              nextScene: 2
            },
            {
              text: "Hacer juguetes y decoraciones para donar",
              ecoPoints: 15,
              consequence: "Los niños de preescolar están felices con los nuevos juguetes reciclados.",
              nextScene: 2
            },
            {
              text: "Vender los materiales a un centro de reciclaje",
              ecoPoints: 8,
              consequence: "Ganas dinero y los materiales se reciclan correctamente.",
              nextScene: 2
            }
          ]
        },
        {
          id: 2,
          title: "El Desafío Final",
          description: "La ciudad te invita a participar en un concurso de reciclaje. Tienes una semana para demostrar tu impacto.",
          image: "🏆🌍🎯",
          choices: [
            {
              text: "Crear un plan para involucrar a toda tu comunidad",
              ecoPoints: 25,
              consequence: "Tu liderazgo resulta en una reducción del 50% de residuos en tu barrio.",
              nextScene: 'end'
            },
            {
              text: "Concentrarte en hacer el mejor proyecto individual",
              ecoPoints: 15,
              consequence: "Tu proyecto gana el concurso y te dan una beca para estudios ambientales.",
              nextScene: 'end'
            }
          ]
        }
      ],
      finalMessage: "¡Felicidades! Has aprendido que el reciclaje y la reutilización son formas poderosas de cuidar nuestro planeta. Cada material tiene una segunda oportunidad."
    },
    {
      id: "water-guardian",
      title: "Guardián del Agua",
      theme: "Cuidado del Agua",
      description: "Aprende a proteger y conservar el recurso más valioso del planeta",
      icon: "💧",
      bgGradient: "from-cyan-200 to-blue-100",
      scenes: [
        {
          id: 0,
          title: "La Sequía en el Pueblo",
          description: "Tu pueblo está experimentando una sequía. Las plantas se marchitan y las personas están preocupadas por el agua.",
          image: "🏘️🌵☀️",
          choices: [
            {
              text: "Proponer un sistema de recolección de agua de lluvia",
              ecoPoints: 20,
              consequence: "El pueblo construye tanques de almacenamiento y salva el verano.",
              nextScene: 1
            },
            {
              text: "Organizar una campaña de ahorro de agua en cada hogar",
              ecoPoints: 15,
              consequence: "Las familias reducen su consumo en un 40% con simples cambios.",
              nextScene: 1
            },
            {
              text: "Buscar nuevas fuentes de agua subterránea",
              ecoPoints: 10,
              consequence: "Encuentras agua, pero aprendes que es limitada y debe usarse con cuidado.",
              nextScene: 1
            }
          ]
        },
        {
          id: 1,
          title: "El Río Contaminado",
          description: "Descubres que el río local está contaminado con químicos de las granjas cercanas.",
          image: "🌊🏭⚠️",
          choices: [
            {
              text: "Colaborar con los granjeros para usar métodos orgánicos",
              ecoPoints: 25,
              consequence: "Los granjeros cambian sus prácticas y el río comienza a limpiarse.",
              nextScene: 2
            },
            {
              text: "Crear un sistema de filtración natural con plantas",
              ecoPoints: 20,
              consequence: "Tu bio-filtro funciona y sirve como modelo para otros ríos.",
              nextScene: 2
            },
            {
              text: "Reportar la contaminación a las autoridades",
              ecoPoints: 10,
              consequence: "Las autoridades investigan, pero el proceso es lento.",
              nextScene: 2
            }
          ]
        },
        {
          id: 2,
          title: "La Misión Oceánica",
          description: "Te invitan a participar en una expedición para proteger los océanos del mundo.",
          image: "🌊🐋🛳️",
          choices: [
            {
              text: "Liderar una campaña global contra los plásticos oceánicos",
              ecoPoints: 30,
              consequence: "Tu campaña inspira a millones de personas a reducir el uso de plástico.",
              nextScene: 'end'
            },
            {
              text: "Desarrollar tecnología para limpiar los océanos",
              ecoPoints: 25,
              consequence: "Tu invento ayuda a remover toneladas de basura del océano.",
              nextScene: 'end'
            }
          ]
        }
      ],
      finalMessage: "¡Increíble! Has aprendido que el agua es vida y que protegerla es responsabilidad de todos. Cada gota cuenta para el futuro del planeta."
    },
    {
      id: "animal-protector",
      title: "Protector de la Vida Silvestre",
      theme: "Respeto a Animales y Plantas",
      description: "Defiende a los seres vivos y aprende sobre la biodiversidad",
      icon: "🦋",
      bgGradient: "from-purple-200 to-pink-100",
      scenes: [
        {
          id: 0,
          title: "El Jardín en Peligro",
          description: "El jardín de tu abuela está perdiendo mariposas y abejas. Las plantas no están floreciendo como antes.",
          image: "🌺🦋🐝",
          choices: [
            {
              text: "Plantar flores nativas que atraigan polinizadores",
              ecoPoints: 20,
              consequence: "El jardín se llena de vida con mariposas y abejas felices.",
              nextScene: 1
            },
            {
              text: "Crear hoteles de insectos y refugios para animales pequeños",
              ecoPoints: 18,
              consequence: "Muchos insectos beneficiosos encuentran hogar en tu jardín.",
              nextScene: 1
            },
            {
              text: "Eliminar todos los pesticidas y usar métodos naturales",
              ecoPoints: 15,
              consequence: "Los insectos regresan gradualmente al jardín más saludable.",
              nextScene: 1
            }
          ]
        },
        {
          id: 1,
          title: "El Bosque Amenazado",
          description: "Una empresa quiere construir un centro comercial donde viven muchos animales salvajes.",
          image: "🏗️🦝🌲",
          choices: [
            {
              text: "Organizar una campaña para proteger el hábitat",
              ecoPoints: 25,
              consequence: "La comunidad se une y logra proteger el bosque como reserva natural.",
              nextScene: 2
            },
            {
              text: "Proponer un plan de construcción que respete la vida silvestre",
              ecoPoints: 20,
              consequence: "Se construye un centro comercial eco-amigable con corredores verdes.",
              nextScene: 2
            },
            {
              text: "Ayudar a reubicar a los animales a un lugar seguro",
              ecoPoints: 12,
              consequence: "Salvas a los animales, pero pierden su hogar natural.",
              nextScene: 2
            }
          ]
        },
        {
          id: 2,
          title: "La Expedición de Conservación",
          description: "Te invitan a unirte a una expedición para estudiar y proteger especies en peligro de extinción.",
          image: "🔬🐅📋",
          choices: [
            {
              text: "Desarrollar un programa de reproducción en cautiverio",
              ecoPoints: 30,
              consequence: "Tu programa salva a varias especies de la extinción.",
              nextScene: 'end'
            },
            {
              text: "Crear corredores biológicos para conectar hábitats",
              ecoPoints: 28,
              consequence: "Los animales pueden moverse libremente y las poblaciones se recuperan.",
              nextScene: 'end'
            },
            {
              text: "Educar a las comunidades locales sobre conservación",
              ecoPoints: 25,
              consequence: "Las personas se convierten en protectores activos de la vida silvestre.",
              nextScene: 'end'
            }
          ]
        }
      ],
      finalMessage: "¡Excepcional! Has aprendido que todos los seres vivos están conectados y que proteger la biodiversidad es proteger nuestro futuro."
    }
  ];

  const startStory = (story: Story) => {
    setCurrentStory(story);
    setCurrentScene(0);
    setEcoPoints(0);
    setStoryProgress(0);
    setGameState('playing');
  };

  const makeChoice = (choice: StoryChoice) => {
    setEcoPoints(prev => prev + choice.ecoPoints);
    
    if (choice.nextScene === 'end') {
      setGameState('storyComplete');
      setStoryProgress(100);
    } else {
      setCurrentScene(choice.nextScene);
      setStoryProgress((choice.nextScene + 1) / (currentStory?.scenes.length || 1) * 100);
    }

    toast({
      title: "Decisión tomada",
      description: choice.consequence,
      duration: 3000,
    });
  };

  const resetStory = () => {
    setGameState('playing');
    setCurrentScene(0);
    setEcoPoints(0);
    setStoryProgress(0);
  };

  const completeStory = () => {
    const finalPoints = Math.max(50, ecoPoints * 2);
    onComplete(finalPoints);
  };

  if (!currentStory && gameState !== 'storySelect') {
    setGameState('storySelect');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <Button variant="outline" onClick={onBack} size="sm">
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Volver</span>
              </Button>
              <h1 className="text-lg sm:text-2xl font-bold text-purple-700 flex items-center">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Cuentos Ecológicos
              </h1>
              {gameState === 'playing' && (
                <Button variant="outline" size="sm" onClick={resetStory}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              )}
            </div>

            {gameState === 'storySelect' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-purple-700 mb-2 sm:mb-4">
                    Elige tu Aventura Ecológica
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    Toma decisiones importantes y aprende sobre el cuidado del medio ambiente
                  </p>
                </div>
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  {stories.map((story) => (
                    <Card 
                      key={story.id}
                      className="cursor-pointer transition-all duration-300 hover:scale-105 bg-white border-2 border-purple-200 hover:border-purple-400 shadow-lg hover:shadow-xl"
                      onClick={() => startStory(story)}
                    >
                      <CardContent className="p-3 sm:p-4 text-center">
                        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{story.icon}</div>
                        <h3 className="text-sm sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2">
                          {story.title}
                        </h3>
                        <p className="text-xs text-purple-600 font-semibold mb-2">
                          {story.theme}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3">
                          {story.description}
                        </p>
                        <Button className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white text-xs sm:text-sm" size="sm">
                          ¡Comenzar Aventura!
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {gameState === 'playing' && currentStory && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-xl font-bold text-purple-700">
                    {currentStory.title}
                  </h3>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">
                      Puntos Eco: {ecoPoints}
                    </p>
                  </div>
                </div>
                
                <Progress value={storyProgress} className="h-2 sm:h-3" />

                <div className={`bg-gradient-to-b ${currentStory.bgGradient} p-4 sm:p-6 rounded-lg border-2 border-purple-300`}>
                  <div className="text-center mb-4">
                    <div className="text-3xl sm:text-4xl mb-3">
                      {currentStory.scenes[currentScene]?.image}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      {currentStory.scenes[currentScene]?.title}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-700">
                      {currentStory.scenes[currentScene]?.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {currentStory.scenes[currentScene]?.choices.map((choice, index) => (
                      <Button
                        key={index}
                        onClick={() => makeChoice(choice)}
                        variant="outline"
                        className="w-full text-left text-xs sm:text-sm p-3 sm:p-4 h-auto border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50"
                      >
                        <div className="flex justify-between items-center w-full">
                          <span>{choice.text}</span>
                          <span className="text-green-600 font-semibold ml-2">
                            +{choice.ecoPoints} 🌱
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {gameState === 'storyComplete' && currentStory && (
              <div className="text-center space-y-4 sm:space-y-6">
                <div className="text-4xl sm:text-6xl mb-4">{currentStory.icon}</div>
                <h2 className="text-xl sm:text-3xl font-bold text-purple-700">
                  ¡Historia Completada!
                </h2>
                <p className="text-sm sm:text-lg text-gray-700">
                  Has ganado {ecoPoints * 2} puntos por tus decisiones ecológicas
                </p>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 sm:p-6 rounded-lg">
                  <p className="text-xs sm:text-sm text-purple-800 font-semibold">
                    {currentStory.finalMessage}
                  </p>
                </div>
                <div className="space-y-3">
                  <Button 
                    onClick={completeStory}
                    className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-full text-sm sm:text-lg shadow-lg"
                  >
                    ¡Completar! (+{ecoPoints * 2} pts)
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                    <Button 
                      onClick={resetStory}
                      variant="outline"
                      className="border-2 border-purple-400 text-purple-600 hover:bg-purple-50 font-semibold py-2 px-4 sm:px-6 rounded-full text-sm"
                    >
                      Repetir Historia
                    </Button>
                    <Button 
                      onClick={() => setGameState('storySelect')}
                      variant="outline"
                      className="border-2 border-pink-400 text-pink-600 hover:bg-pink-50 font-semibold py-2 px-4 sm:px-6 rounded-full text-sm"
                    >
                      Elegir Otra Historia
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveStories;
