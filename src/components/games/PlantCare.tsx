
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Droplets, Sun, Scissors, Timer, Star, Bug, Sparkles } from "lucide-react";

interface PlantCareProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Plant {
  growth: number;
  health: number;
  water: number;
  sunlight: number;
  needsPruning: boolean;
  hasPests: boolean;
  fertilized: boolean;
}

interface Person {
  happiness: number;
  shade: number;
}

const PlantCare = ({ onComplete, onBack }: PlantCareProps) => {
  const [plant, setPlant] = useState<Plant>({
    growth: 20,
    health: 100,
    water: 50,
    sunlight: 50,
    needsPruning: false,
    hasPests: false,
    fertilized: false
  });
  const [person, setPerson] = useState<Person>({
    happiness: 30,
    shade: 0
  });
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutos
  const [score, setScore] = useState(0);
  const [showEducationalMessage, setShowEducationalMessage] = useState(false);

  const getPlantEmoji = () => {
    if (plant.hasPests) return "🦠";
    if (plant.growth < 30) return "🌱";
    if (plant.growth < 50) return "🌿";
    if (plant.growth < 70) return "🪴";
    if (plant.growth < 90) return "🌳";
    return "🌳";
  };

  const getPersonEmoji = () => {
    if (person.happiness < 30) return "😓";
    if (person.happiness < 60) return "😐";
    if (person.happiness < 80) return "🙂";
    if (person.happiness >= 100) return "😍";
    return "😎";
  };

  const startGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setShowEducationalMessage(false);
    setPlant({
      growth: 20,
      health: 100,
      water: 50,
      sunlight: 50,
      needsPruning: false,
      hasPests: false,
      fertilized: false
    });
    setPerson({
      happiness: 30,
      shade: 0
    });
    setTimeLeft(180);
    setScore(0);
  };

  const waterPlant = () => {
    if (plant.water < 100) {
      setPlant(prev => ({
        ...prev,
        water: Math.min(100, prev.water + 30),
        health: Math.min(100, prev.health + 8)
      }));
      setScore(prev => prev + 10);
    }
  };

  const giveSunlight = () => {
    if (plant.sunlight < 100) {
      setPlant(prev => ({
        ...prev,
        sunlight: Math.min(100, prev.sunlight + 25),
        health: Math.min(100, prev.health + 5)
      }));
      setScore(prev => prev + 8);
    }
  };

  const prunePlant = () => {
    if (plant.needsPruning) {
      setPlant(prev => ({
        ...prev,
        needsPruning: false,
        health: Math.min(100, prev.health + 15),
        growth: Math.min(100, prev.growth + 8)
      }));
      setScore(prev => prev + 25);
    }
  };

  const curePests = () => {
    if (plant.hasPests) {
      setPlant(prev => ({
        ...prev,
        hasPests: false,
        health: Math.min(100, prev.health + 20)
      }));
      setScore(prev => prev + 30);
    }
  };

  const addFertilizer = () => {
    if (!plant.fertilized) {
      setPlant(prev => ({
        ...prev,
        fertilized: true,
        growth: Math.min(100, prev.growth + 15),
        health: Math.min(100, prev.health + 10)
      }));
      setScore(prev => prev + 20);
      
      // Fertilizer effect lasts for a while
      setTimeout(() => {
        setPlant(prev => ({ ...prev, fertilized: false }));
      }, 30000);
    }
  };

  // Game timer and plant growth logic
  useEffect(() => {
    if (gameStarted && !gameEnded && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        
        // Plant growth and decay
        setPlant(prev => {
          let newPlant = { ...prev };
          
          // Decrease water and sunlight over time
          newPlant.water = Math.max(0, newPlant.water - 2.5);
          newPlant.sunlight = Math.max(0, newPlant.sunlight - 2);
          
          // Health depends on water, sunlight, and pests
          if (newPlant.hasPests) {
            newPlant.health = Math.max(0, newPlant.health - 5);
          } else if (newPlant.water < 20 || newPlant.sunlight < 20) {
            newPlant.health = Math.max(0, newPlant.health - 4);
          } else if (newPlant.water > 60 && newPlant.sunlight > 60) {
            newPlant.health = Math.min(100, newPlant.health + 2);
            
            // Faster growth with fertilizer
            const growthRate = newPlant.fertilized ? 1.2 : 0.8;
            newPlant.growth = Math.min(100, newPlant.growth + growthRate);
          }
          
          // Random events
          if (Math.random() < 0.03 && newPlant.growth > 40 && !newPlant.needsPruning) {
            newPlant.needsPruning = true;
          }
          
          if (Math.random() < 0.02 && !newPlant.hasPests && newPlant.health > 30) {
            newPlant.hasPests = true;
          }
          
          return newPlant;
        });
        
        // Update person's happiness based on shade from plant
        setPerson(prev => {
          const shadeAmount = Math.max(0, plant.growth - 40);
          const happinessIncrease = shadeAmount > 0 ? 1.5 : -0.8;
          const newHappiness = Math.max(0, Math.min(100, prev.happiness + happinessIncrease));
          
          return {
            ...prev,
            shade: shadeAmount,
            happiness: newHappiness
          };
        });
        
      }, 1000);
      
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameEnded(true);
    }
  }, [gameStarted, gameEnded, timeLeft, plant.growth, plant.fertilized]);

  // Check for victory condition
  useEffect(() => {
    if (person.happiness >= 100 && !gameEnded) {
      setGameEnded(true);
      setShowEducationalMessage(true);
    }
  }, [person.happiness, gameEnded]);

  // End game
  useEffect(() => {
    if (gameEnded && !showEducationalMessage) {
      const finalPoints = Math.floor((score + person.happiness + plant.growth) / 4);
      setTimeout(() => onComplete(finalPoints), 2000);
    }
  }, [gameEnded, showEducationalMessage, score, person.happiness, plant.growth, onComplete]);

  if (showEducationalMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-cyan-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-6">🌳🌍</div>
              <h1 className="text-3xl font-bold text-emerald-700 mb-6">
                ¡Misión Cumplida! 🎉
              </h1>
              
              <div className="bg-emerald-100 p-6 rounded-lg mb-6 text-left">
                <h3 className="font-bold text-emerald-800 mb-4 text-xl">¿Sabías que los árboles son súper importantes? 🌟</h3>
                <ul className="text-emerald-700 space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">🌬️</span>
                    <span><strong>Purifican el aire:</strong> Un árbol puede limpiar hasta 22 kg de CO₂ al año y nos da oxígeno fresco para respirar.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">☂️</span>
                    <span><strong>Nos dan sombra:</strong> Pueden reducir la temperatura hasta 5°C, ¡como un aire acondicionado natural!</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-brown-600 mt-1">🏠</span>
                    <span><strong>Hogar de animales:</strong> Miles de animales, aves e insectos viven en los árboles.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-cyan-600 mt-1">💧</span>
                    <span><strong>Protegen el agua:</strong> Sus raíces evitan que la tierra se erosione y filtran el agua de lluvia.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-600 mt-1">🎵</span>
                    <span><strong>Reducen el ruido:</strong> Actúan como barreras naturales contra el ruido de la ciudad.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-100 p-4 rounded-lg mb-6">
                <p className="text-amber-800 font-semibold">
                  🌱 <strong>¡Cada árbol cuenta!</strong> Si cada persona plantara un árbol, 
                  podríamos ayudar muchísimo a nuestro planeta. ¿Te animas a cuidar uno? 🌍
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-emerald-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-800">100%</div>
                  <div className="text-emerald-600">¡Persona completamente feliz!</div>
                </div>
                
                <div className="bg-green-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-800">+{Math.floor((score + person.happiness + plant.growth) / 4)} pts</div>
                  <div className="text-green-600">Puntos Ecológicos Ganados</div>
                </div>
              </div>

              <Button
                onClick={() => {
                  const finalPoints = Math.floor((score + person.happiness + plant.growth) / 4);
                  onComplete(finalPoints);
                }}
                className="bg-gradient-to-r from-emerald-400 to-green-400 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-3 px-8 rounded-full text-lg"
              >
                ¡Continuar Explorando!
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-cyan-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <Button
                onClick={onBack}
                variant="outline"
                className="absolute top-4 left-4 border-gray-400"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>

              <div className="text-6xl mb-6">🌱</div>
              <h1 className="text-3xl font-bold text-emerald-700 mb-4">
                Jardín de Sombra
              </h1>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Cuida tu planta para que crezca y dé sombra. ¡Haz feliz a la persona al 100%!
              </p>
              
              <div className="bg-emerald-100 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-emerald-800 mb-2">Instrucciones:</h3>
                <ul className="text-emerald-700 text-sm space-y-1">
                  <li>💧 Riega la planta cuando tenga poca agua</li>
                  <li>☀️ Dale sol para que crezca saludable</li>
                  <li>✂️ Pódala cuando lo necesite</li>
                  <li>🐛 Cura las plagas que aparezcan</li>
                  <li>🌱 Usa abono natural para crecimiento extra</li>
                  <li>🏆 Meta: ¡Persona 100% feliz!</li>
                </ul>
              </div>

              <Button
                onClick={startGame}
                className="bg-gradient-to-r from-emerald-400 to-green-400 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-3 px-8 rounded-full text-lg"
              >
                ¡Empezar a Cultivar!
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameEnded && !showEducationalMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-cyan-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-6">⏰</div>
              <h1 className="text-3xl font-bold text-emerald-700 mb-4">
                ¡Tiempo Agotado!
              </h1>
              
              <div className="space-y-4 mb-6">
                <div className="bg-emerald-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-800">{plant.growth.toFixed(0)}%</div>
                  <div className="text-emerald-600">Crecimiento de la Planta</div>
                </div>
                
                <div className="bg-cyan-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-800">{person.happiness.toFixed(0)}%</div>
                  <div className="text-cyan-600">Felicidad de la Persona</div>
                </div>
                
                <div className="bg-green-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-800">+{Math.floor((score + person.happiness + plant.growth) / 4)} pts</div>
                  <div className="text-green-600">Puntos Ecológicos Ganados</div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                ¡Buen trabajo! Tu planta creció {plant.growth.toFixed(0)}% y la persona está {person.happiness.toFixed(0)}% feliz. 
                ¡Sigue practicando para llegar al 100%! 🌱
              </p>

              <Button
                onClick={onBack}
                className="bg-gradient-to-r from-emerald-400 to-green-400 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-3 px-8 rounded-full text-lg"
              >
                ¡Intentar de Nuevo!
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-cyan-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-gray-400"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Salir
          </Button>
          
          <div className="flex space-x-4">
            <div className="bg-white/80 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-800">{score}</span>
            </div>
            
            <div className="bg-white/80 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Timer className="w-5 h-5 text-purple-500" />
              <span className="font-bold text-gray-800">{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Plant Care Panel */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-emerald-700 mb-4 text-center">Tu Planta</h3>
              
              {/* Plant visualization */}
              <div className="text-center mb-6">
                <div className="text-8xl mb-4 relative">
                  {getPlantEmoji()}
                  {plant.fertilized && <span className="absolute -top-2 -right-2 text-2xl">✨</span>}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Crecimiento:</span>
                    <span className="text-sm font-bold text-emerald-600">{plant.growth.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${plant.growth}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Plant stats */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm">💧 Agua:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${plant.water}%` }}
                      ></div>
                    </div>
                    <span className="text-xs w-8">{plant.water.toFixed(0)}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">☀️ Sol:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${plant.sunlight}%` }}
                      ></div>
                    </div>
                    <span className="text-xs w-8">{plant.sunlight.toFixed(0)}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">❤️ Salud:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${plant.health}%` }}
                      ></div>
                    </div>
                    <span className="text-xs w-8">{plant.health.toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <Button
                  onClick={waterPlant}
                  disabled={plant.water >= 100}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Droplets className="w-4 h-4 mr-2" />
                  Regar Planta
                </Button>
                
                <Button
                  onClick={giveSunlight}
                  disabled={plant.sunlight >= 100}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  <Sun className="w-4 h-4 mr-2" />
                  Dar Sol
                </Button>
                
                <Button
                  onClick={prunePlant}
                  disabled={!plant.needsPruning}
                  className="w-full bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
                >
                  <Scissors className="w-4 h-4 mr-2" />
                  {plant.needsPruning ? "¡Podar Ahora!" : "No Necesita Poda"}
                </Button>

                <Button
                  onClick={curePests}
                  disabled={!plant.hasPests}
                  className="w-full bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
                >
                  <Bug className="w-4 h-4 mr-2" />
                  {plant.hasPests ? "¡Curar Plagas!" : "Sin Plagas"}
                </Button>

                <Button
                  onClick={addFertilizer}
                  disabled={plant.fertilized}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {plant.fertilized ? "Abonada ✨" : "Agregar Abono Natural"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Person and Environment */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-cyan-200 shadow-xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-cyan-700 mb-4 text-center">Persona</h3>
              
              <div className="text-center mb-6">
                <div className="text-8xl mb-4">{getPersonEmoji()}</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Felicidad:</span>
                    <span className="text-sm font-bold text-cyan-600">{person.happiness.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${person.happiness}%` }}
                    ></div>
                  </div>
                  {person.happiness >= 100 && (
                    <div className="text-center text-green-600 font-bold text-sm">
                      ¡META ALCANZADA! 🎉
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-cyan-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">🌳 Sombra Recibida:</span>
                    <span className="text-sm font-bold text-cyan-800">{person.shade.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${person.shade}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-center p-4 bg-amber-100 rounded-lg">
                  <p className="text-sm text-amber-800">
                    {person.happiness >= 90 
                      ? "¡Estoy súper feliz con esta sombra perfecta!" 
                      : person.shade > 30 
                      ? "¡Qué deliciosa sombra! Me siento muy cómodo." 
                      : person.shade > 10
                      ? "Un poco de sombra, pero necesito más."
                      : "Hace mucho calor aquí sin sombra."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 text-center">
          <p className="text-emerald-700 font-medium">
            ¡Meta: Alcanza 100% de felicidad! Cuida tu planta para que dé la mejor sombra.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlantCare;
