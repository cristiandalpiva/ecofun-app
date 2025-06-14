
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Droplets, Timer, Star } from "lucide-react";

interface TapGameProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Tap {
  id: number;
  x: number;
  y: number;
  isOpen: boolean;
  waterDrops: number;
}

const TapGame = ({ onComplete, onBack }: TapGameProps) => {
  const [taps, setTaps] = useState<Tap[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [waterSaved, setWaterSaved] = useState(0);

  const generateTap = useCallback(() => {
    const newTap: Tap = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // 10% to 90% of container width
      y: Math.random() * 70 + 15, // 15% to 85% of container height
      isOpen: true,
      waterDrops: 0
    };
    return newTap;
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setScore(0);
    setWaterSaved(0);
    setTimeLeft(60);
    
    // Generate initial taps
    const initialTaps = Array.from({ length: 3 }, () => generateTap());
    setTaps(initialTaps);
  };

  const closeTap = (tapId: number) => {
    setTaps(prevTaps => 
      prevTaps.map(tap => 
        tap.id === tapId 
          ? { ...tap, isOpen: false }
          : tap
      )
    );
    setScore(prev => prev + 10);
    setWaterSaved(prev => prev + 15); // 15 litros ahorrados por llave cerrada
  };

  // Game timer
  useEffect(() => {
    if (gameStarted && !gameEnded && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameEnded(true);
    }
  }, [gameStarted, gameEnded, timeLeft]);

  // Add water drops to open taps
  useEffect(() => {
    if (gameStarted && !gameEnded) {
      const interval = setInterval(() => {
        setTaps(prevTaps => 
          prevTaps.map(tap => 
            tap.isOpen 
              ? { ...tap, waterDrops: tap.waterDrops + 1 }
              : tap
          )
        );
      }, 500);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameEnded]);

  // Generate new taps periodically
  useEffect(() => {
    if (gameStarted && !gameEnded) {
      const interval = setInterval(() => {
        setTaps(prevTaps => {
          // Remove closed taps older than 3 seconds
          const activeTaps = prevTaps.filter(tap => tap.isOpen);
          
          // Add new tap if we have less than 4 active taps
          if (activeTaps.length < 4 && Math.random() > 0.3) {
            return [...activeTaps, generateTap()];
          }
          return activeTaps;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameEnded, generateTap]);

  // End game and calculate final points
  useEffect(() => {
    if (gameEnded) {
      const finalPoints = Math.floor(score / 2); // Convert score to eco points
      setTimeout(() => onComplete(finalPoints), 2000);
    }
  }, [gameEnded, score, onComplete]);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-50 to-emerald-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-cyan-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <Button
                onClick={onBack}
                variant="outline"
                className="absolute top-4 left-4 border-gray-400"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>

              <div className="text-6xl mb-6">💧</div>
              <h1 className="text-3xl font-bold text-cyan-700 mb-4">
                Cierra las Llaves
              </h1>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                ¡Las llaves están goteando y desperdiciando agua! Tu misión es cerrarlas 
                rápidamente para ahorrar agua. Cada llave cerrada ahorra 15 litros.
              </p>
              
              <div className="bg-cyan-100 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-cyan-800 mb-2">Instrucciones:</h3>
                <ul className="text-cyan-700 text-sm space-y-1">
                  <li>• Haz clic en las llaves abiertas para cerrarlas</li>
                  <li>• Cada llave cerrada = 10 puntos + 15 litros ahorrados</li>
                  <li>• ¡Tienes 60 segundos para ahorrar toda el agua posible!</li>
                </ul>
              </div>

              <Button
                onClick={startGame}
                className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg"
              >
                ¡Empezar a Ahorrar Agua!
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-50 to-emerald-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-cyan-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-6">🌊</div>
              <h1 className="text-3xl font-bold text-cyan-700 mb-4">
                ¡Excelente Trabajo!
              </h1>
              
              <div className="space-y-4 mb-6">
                <div className="bg-cyan-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-800">{score} puntos</div>
                  <div className="text-cyan-600">Puntuación Total</div>
                </div>
                
                <div className="bg-blue-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-800">{waterSaved} litros</div>
                  <div className="text-blue-600">Agua Ahorrada</div>
                </div>
                
                <div className="bg-emerald-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-800">+{Math.floor(score / 2)} pts</div>
                  <div className="text-emerald-600">Puntos Ecológicos Ganados</div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                ¡Increíble! Ahorraste {waterSaved} litros de agua. Eso es suficiente para que una persona 
                beba agua durante {Math.floor(waterSaved / 2)} días. 🏆
              </p>

              <Button
                onClick={onBack}
                className="bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold py-3 px-8 rounded-full text-lg"
              >
                ¡Continuar Explorando!
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with stats */}
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
              <Droplets className="w-5 h-5 text-cyan-500" />
              <span className="font-bold text-gray-800">{waterSaved}L</span>
            </div>
            
            <div className="bg-white/80 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Timer className="w-5 h-5 text-red-500" />
              <span className="font-bold text-gray-800">{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Game area */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-cyan-200 shadow-xl h-96 relative overflow-hidden">
          <CardContent className="p-0 h-full relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-400"></div>
            </div>
            
            {/* Taps */}
            {taps.map((tap) => (
              <div
                key={tap.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${tap.x}%`, top: `${tap.y}%` }}
              >
                {tap.isOpen ? (
                  <button
                    onClick={() => closeTap(tap.id)}
                    className="relative bg-gray-400 hover:bg-gray-500 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🚰</span>
                    </div>
                    
                    {/* Water drops */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                      {Array.from({ length: Math.min(tap.waterDrops, 5) }).map((_, index) => (
                        <div
                          key={index}
                          className="text-cyan-400 text-sm animate-bounce"
                          style={{ 
                            animationDelay: `${index * 0.2}s`,
                            marginTop: `${index * 8}px`
                          }}
                        >
                          💧
                        </div>
                      ))}
                    </div>
                  </button>
                ) : (
                  <div className="bg-gray-600 rounded-full p-3 shadow-lg opacity-50">
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🔒</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
        
        <div className="mt-4 text-center">
          <p className="text-cyan-700 font-medium">
            ¡Haz clic en las llaves abiertas para cerrarlas y ahorrar agua!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TapGame;
