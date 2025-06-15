
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, Lightbulb, Zap } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface LightOffGameProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Light {
  id: number;
  isOn: boolean;
  x: number;
  y: number;
  timeOn: number;
}

const LightOffGame: React.FC<LightOffGameProps> = ({ onComplete, onBack }) => {
  const [lights, setLights] = useState<Light[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameWon, setGameWon] = useState(false);
  const [level, setLevel] = useState(1);
  const [energySaved, setEnergySaved] = useState(0);
  const [lightsOff, setLightsOff] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  const generateRandomLight = useCallback(() => {
    return {
      id: Math.random(),
      isOn: true,
      x: Math.random() * 80 + 10, // 10% to 90% of container width
      y: Math.random() * 70 + 15, // 15% to 85% of container height
      timeOn: 0
    };
  }, []);

  useEffect(() => {
    // Initialize first lights
    const initialLights: Light[] = [];
    for (let i = 0; i < Math.min(3, level + 1); i++) {
      initialLights.push(generateRandomLight());
    }
    setLights(initialLights);
  }, [level, generateRandomLight]);

  useEffect(() => {
    if (timeLeft > 0 && !gameWon) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        
        // Add new lights based on level
        if (Math.random() < (0.15 + level * 0.05)) {
          setLights(prev => {
            if (prev.length < level + 3) {
              return [...prev, generateRandomLight()];
            }
            return prev;
          });
        }

        // Update time for existing lights and remove old ones
        setLights(prev => 
          prev.map(light => ({ ...light, timeOn: light.timeOn + 1 }))
               .filter(light => light.timeOn < 8) // Remove lights after 8 seconds
        );

      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameWon) {
      handleGameEnd();
    }
  }, [timeLeft, gameWon, level, generateRandomLight]);

  const turnOffLight = (lightId: number) => {
    setLights(prev => {
      const lightToRemove = prev.find(light => light.id === lightId);
      if (!lightToRemove) return prev;

      const points = Math.max(10 - lightToRemove.timeOn, 1) * level;
      const energy = Math.round((8 - lightToRemove.timeOn) * 0.5 * level);
      
      setScore(prevScore => prevScore + points);
      setEnergySaved(prevEnergy => prevEnergy + energy);
      setLightsOff(prevCount => prevCount + 1);
      setCombo(prevCombo => {
        const newCombo = prevCombo + 1;
        setMaxCombo(prevMax => Math.max(prevMax, newCombo));
        return newCombo;
      });

      toast({
        title: "¡Luz apagada! 💡",
        description: `+${points} puntos, +${energy} kWh ahorrados`,
        duration: 1000,
      });

      return prev.filter(light => light.id !== lightId);
    });
  };

  const missedLight = () => {
    setCombo(0);
  };

  useEffect(() => {
    // Check for missed lights (remove lights that have been on too long)
    const missedLights = lights.filter(light => light.timeOn >= 8);
    if (missedLights.length > 0) {
      missedLight();
      toast({
        title: "¡Luz desperdiciada! ⚡",
        description: "Una luz se mantuvo encendida demasiado tiempo",
        variant: "destructive",
        duration: 1500,
      });
    }
  }, [lights]);

  const handleGameEnd = () => {
    setGameWon(true);
    const bonusPoints = Math.round(energySaved * 2 + maxCombo * 5);
    const finalScore = score + bonusPoints;
    
    toast({
      title: "¡Juego Completado! 🌟",
      description: `Has ahorrado ${energySaved} kWh de energía. Puntuación final: ${finalScore}`,
    });
  };

  const resetGame = () => {
    setLights([]);
    setScore(0);
    setTimeLeft(60);
    setGameWon(false);
    setLevel(1);
    setEnergySaved(0);
    setLightsOff(0);
    setCombo(0);
    setMaxCombo(0);
  };

  const nextLevel = () => {
    if (level < 5) {
      setLevel(prev => prev + 1);
      setTimeLeft(60);
      setLights([]);
      toast({
        title: `¡Nivel ${level + 1}! 🚀`,
        description: "Más luces aparecerán más rápido",
      });
    } else {
      handleGameEnd();
    }
  };

  const handleComplete = () => {
    const bonusPoints = Math.round(energySaved * 2 + maxCombo * 5);
    const finalScore = score + bonusPoints;
    onComplete(finalScore);
  };

  const getLightColor = (timeOn: number) => {
    if (timeOn < 2) return 'text-yellow-300';
    if (timeOn < 4) return 'text-orange-300';
    if (timeOn < 6) return 'text-red-400';
    return 'text-red-600';
  };

  const getLightSize = (timeOn: number) => {
    const baseSize = 32;
    const growth = timeOn * 4;
    return baseSize + growth;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gray-800/90 backdrop-blur-sm border-2 border-blue-400 shadow-xl">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <Button variant="outline" onClick={onBack} size="sm" className="border-blue-400 text-blue-400">
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Volver</span>
              </Button>
              <h1 className="text-lg sm:text-2xl font-bold text-blue-300 flex items-center">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Apagá la Luz
              </h1>
              <div className="text-right">
                <p className="text-sm sm:text-lg font-bold text-yellow-400">⏰ {timeLeft}s</p>
                <Button variant="outline" size="sm" onClick={resetGame} className="border-blue-400 text-blue-400">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {gameWon && (
              <Card className="bg-green-900/80 border-2 border-green-400 mb-4 sm:mb-6">
                <CardContent className="p-3 sm:p-4 text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-green-300 mb-2">🌟 ¡Misión Completada!</h3>
                  <p className="text-xs sm:text-sm text-green-200 mb-3 sm:mb-4">
                    Has contribuido al ahorro energético apagando {lightsOff} luces y ahorrando {energySaved} kWh.
                    ¡Cada luz apagada cuenta para el planeta! 🌍💡
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                    <div>
                      <p className="text-xl font-bold text-yellow-400">{lightsOff}</p>
                      <p className="text-xs text-gray-300">Luces Apagadas</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-blue-400">{maxCombo}</p>
                      <p className="text-xs text-gray-300">Mejor Racha</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleComplete}
                    className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base"
                  >
                    ¡Completar! (+{score + Math.round(energySaved * 2 + maxCombo * 5)} pts)
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Panel de estadísticas */}
              <div className="lg:col-span-1 space-y-3 sm:space-y-4">
                <Card className="bg-blue-900/50 border-2 border-blue-400">
                  <CardContent className="p-3 sm:p-4">
                    <h4 className="text-sm sm:text-base font-bold text-blue-300 mb-2">
                      <Zap className="w-4 h-4 inline mr-1" />
                      Nivel {level}
                    </h4>
                    <div className="text-lg sm:text-2xl font-bold text-yellow-400 mb-2">
                      {score} pts
                    </div>
                    <Progress 
                      value={(timeLeft / 60) * 100} 
                      className="h-2 sm:h-3 mb-2 bg-gray-700" 
                    />
                    <p className="text-xs text-blue-300">
                      Energía ahorrada: {energySaved} kWh
                    </p>
                    <p className="text-xs text-green-300">
                      Combo actual: {combo}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-900/50 border-2 border-yellow-400">
                  <CardContent className="p-3 sm:p-4">
                    <h4 className="text-sm sm:text-base font-bold text-yellow-300 mb-2">💡 Instrucciones</h4>
                    <ul className="text-xs text-yellow-200 space-y-1">
                      <li>• Haz clic en las luces para apagarlas</li>
                      <li>• Más rápido = más puntos</li>
                      <li>• No dejes que se mantengan encendidas</li>
                      <li>• Ahorra energía para el planeta</li>
                    </ul>
                  </CardContent>
                </Card>

                {level < 5 && timeLeft === 0 && (
                  <Button 
                    onClick={nextLevel}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold"
                  >
                    Nivel {level + 1} →
                  </Button>
                )}
              </div>

              {/* Área de juego */}
              <div className="lg:col-span-3">
                {!gameWon && (
                  <Card className="bg-gray-900/70 border-2 border-gray-600 h-96 sm:h-[500px] relative overflow-hidden">
                    <CardContent className="p-0 h-full relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
                        {/* Room background */}
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-700 to-transparent"></div>
                        
                        {/* Lights */}
                        {lights.map((light) => (
                          <div
                            key={light.id}
                            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110"
                            style={{
                              left: `${light.x}%`,
                              top: `${light.y}%`,
                            }}
                            onClick={() => turnOffLight(light.id)}
                          >
                            <Lightbulb 
                              className={`${getLightColor(light.timeOn)} drop-shadow-lg animate-pulse`}
                              style={{ 
                                width: `${getLightSize(light.timeOn)}px`, 
                                height: `${getLightSize(light.timeOn)}px`,
                                filter: 'drop-shadow(0 0 8px currentColor)'
                              }}
                            />
                            {/* Light glow effect */}
                            <div 
                              className="absolute inset-0 rounded-full opacity-30"
                              style={{
                                background: `radial-gradient(circle, ${
                                  light.timeOn < 2 ? '#fcd34d' :
                                  light.timeOn < 4 ? '#fb923c' :
                                  light.timeOn < 6 ? '#f87171' : '#dc2626'
                                } 0%, transparent 70%)`,
                                width: `${getLightSize(light.timeOn) * 2}px`,
                                height: `${getLightSize(light.timeOn) * 2}px`,
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'
                              }}
                            />
                          </div>
                        ))}

                        {/* Instructions overlay */}
                        {lights.length === 0 && timeLeft > 55 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-blue-300">
                              <Lightbulb className="w-16 h-16 mx-auto mb-4 text-yellow-400 animate-pulse" />
                              <p className="text-lg font-bold mb-2">¡Haz clic en las luces para apagarlas!</p>
                              <p className="text-sm">Ahorra energía y cuida el planeta 🌍</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Statistics bar */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600">
                <p className="text-lg font-bold text-yellow-400">{lightsOff}</p>
                <p className="text-xs text-gray-300">Luces Apagadas</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600">
                <p className="text-lg font-bold text-green-400">{energySaved}</p>
                <p className="text-xs text-gray-300">kWh Ahorrados</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600">
                <p className="text-lg font-bold text-blue-400">{combo}</p>
                <p className="text-xs text-gray-300">Racha Actual</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600">
                <p className="text-lg font-bold text-purple-400">{maxCombo}</p>
                <p className="text-xs text-gray-300">Mejor Racha</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LightOffGame;
