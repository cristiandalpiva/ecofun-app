import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";

interface AventuraSubmarinaProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface GameObject {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'plastic' | 'fish';
  speed: number;
  collected?: boolean;
}

const AventuraSubmarina = ({ onComplete, onBack }: AventuraSubmarinaProps) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [playerX, setPlayerX] = useState(350);
  const [objects, setObjects] = useState<GameObject[]>([]);
  const [gameLevel, setGameLevel] = useState(1);

  const [gameWidth, setGameWidth] = useState(700);
  const gameHeight = 400;
  const playerWidth = 60;
  const playerHeight = 40;

  // Responsive game width
  useEffect(() => {
    const updateWidth = () => {
      const containerWidth = Math.min(window.innerWidth - 32, 700);
      setGameWidth(containerWidth);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Generar objetos (plástico y peces)
  const generateObject = useCallback(() => {
    const isPlastic = Math.random() > 0.3; // 70% plástico, 30% peces
    const newObject: GameObject = {
      id: Math.random(),
      x: Math.random() * (gameWidth - 40),
      y: -40,
      width: isPlastic ? 30 : 35,
      height: isPlastic ? 20 : 25,
      type: isPlastic ? 'plastic' : 'fish',
      speed: 1 + Math.random() * 2 + gameLevel * 0.5,
      collected: false,
    };
    return newObject;
  }, [gameLevel]);

  // Inicializar juego
  const initializeGame = () => {
    setScore(0);
    setLives(3);
    setTimeLeft(60);
    setPlayerX(350);
    setObjects([]);
    setGameLevel(1);
    setGameStarted(true);
    setGameEnded(false);
    setPaused(false);
  };

  // Mover jugador
  const movePlayer = useCallback((direction: 'left' | 'right') => {
    if (!gameStarted || paused || gameEnded) return;
    
    setPlayerX(prev => {
      if (direction === 'left') {
        return Math.max(0, prev - 20);
      } else {
        return Math.min(gameWidth - playerWidth, prev + 20);
      }
    });
  }, [gameStarted, paused, gameEnded]);

  // Detectar colisiones
  const checkCollision = (obj: GameObject, px: number, py: number) => {
    return (
      px < obj.x + obj.width &&
      px + playerWidth > obj.x &&
      py < obj.y + obj.height &&
      py < obj.y + obj.height &&
      py + playerHeight > obj.y
    );
  };

  // Game loop
  useEffect(() => {
    if (!gameStarted || paused || gameEnded) return;

    const gameLoop = setInterval(() => {
      // Mover objetos
      setObjects(prevObjects => {
        return prevObjects
          .map(obj => ({ ...obj, y: obj.y + obj.speed }))
          .filter(obj => obj.y < gameHeight + 50);
      });

      // Generar nuevos objetos
      if (Math.random() < 0.03) {
        setObjects(prev => [...prev, generateObject()]);
      }

      // Verificar colisiones
      setObjects(prevObjects => {
        const playerY = gameHeight - 80;
        return prevObjects.map(obj => {
          if (!obj.collected && checkCollision(obj, playerX, playerY)) {
            if (obj.type === 'plastic') {
              setScore(prev => prev + 10);
              return { ...obj, collected: true };
            } else if (obj.type === 'fish') {
              setLives(prev => prev - 1);
              return { ...obj, collected: true };
            }
          }
          return obj;
        });
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameStarted, paused, gameEnded, playerX, generateObject]);

  // Timer
  useEffect(() => {
    if (!gameStarted || paused || gameEnded) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameEnded(true);
          const finalScore = score;
          let points = 0;
          if (finalScore >= 200) points = 100;
          else if (finalScore >= 150) points = 80;
          else if (finalScore >= 100) points = 60;
          else if (finalScore >= 50) points = 40;
          else points = 20;
          
          setTimeout(() => onComplete(points), 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, paused, gameEnded, score, onComplete]);

  // Verificar game over
  useEffect(() => {
    if (lives <= 0 && !gameEnded) {
      setGameEnded(true);
      const finalScore = score;
      let points = Math.max(10, Math.floor(finalScore / 5));
      setTimeout(() => onComplete(points), 2000);
    }
  }, [lives, gameEnded, score, onComplete]);

  // Controles de teclado
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        movePlayer('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        movePlayer('right');
      } else if (e.key === ' ') {
        e.preventDefault();
        setPaused(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer]);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-200 via-blue-300 to-blue-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button onClick={onBack} variant="outline" className="text-blue-700 hover:text-blue-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-3xl font-bold text-blue-800">🌊 Aventura Submarina</h1>
            <div className="w-20"></div>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-6">🤿</div>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                ¡Limpia el Océano!
              </h2>
              <p className="text-blue-700 mb-6 text-lg">
                Sumérgete en el océano y recoge todo el plástico que puedas, 
                pero ten cuidado de no lastimar a los peces.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-blue-800 mb-3">📋 Instrucciones:</h3>
                <div className="text-left text-blue-700 space-y-2">
                  <p>• Usa las flechas ← → o A/D para moverte</p>
                  <p>• 🗑️ Recoge plástico = +10 puntos</p>
                  <p>• 🐟 Tocar peces = -1 vida</p>
                  <p>• Tienes 60 segundos y 3 vidas</p>
                  <p>• Presiona ESPACIO para pausar</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm">
                  💡 <strong>¿Sabías que...?</strong> Cada año, 8 millones de toneladas de plástico 
                  terminan en nuestros océanos. Eso equivale a tirar un camión de basura lleno 
                  de plástico al mar cada minuto. ¡Tu ayuda es importante para proteger la vida marina!
                </p>
              </div>

              <Button 
                onClick={initializeGame}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-4"
              >
                <Play className="w-6 h-6 mr-2" />
                ¡Comenzar Aventura!
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 via-blue-400 to-blue-900 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header del juego */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <Button onClick={onBack} variant="outline" className="text-blue-700 hover:text-blue-900 text-sm">
            <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Salir</span>
          </Button>
          
          <div className="flex items-center space-x-2 sm:space-x-6 text-white text-sm sm:text-base">
            <div className="text-center">
              <p className="text-xs sm:text-sm">Puntos</p>
              <p className="text-lg sm:text-2xl font-bold">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-xs sm:text-sm">Vidas</p>
              <p className="text-lg sm:text-2xl font-bold text-red-300">{'❤️'.repeat(lives)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs sm:text-sm">Tiempo</p>
              <p className="text-lg sm:text-2xl font-bold">{timeLeft}s</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button 
              onClick={() => setPaused(!paused)} 
              variant="outline"
              size="sm"
              className="text-blue-700 hover:text-blue-900"
            >
              {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </Button>
            <Button onClick={initializeGame} variant="outline" size="sm" className="text-blue-700 hover:text-blue-900">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Área de juego */}
        <Card className="bg-white/10 backdrop-blur-sm border-2 border-blue-300 shadow-xl">
          <CardContent className="p-2 sm:p-4">
            <div 
              className="relative bg-gradient-to-b from-blue-300 to-blue-800 rounded-lg overflow-hidden mx-auto"
              style={{ width: gameWidth, height: gameHeight, maxWidth: '100%' }}
            >
              {paused && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="text-white text-4xl font-bold">PAUSADO</div>
                </div>
              )}
              
              {gameEnded && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
                  <div className="text-center text-white">
                    <h2 className="text-3xl font-bold mb-2">
                      {lives <= 0 ? '¡Juego Terminado!' : '¡Tiempo Agotado!'}
                    </h2>
                    <p className="text-xl mb-4">Puntuación: {score}</p>
                    <p className="text-lg">
                      {score >= 150 ? '¡Excelente trabajo limpiando el océano! 🌊' :
                       score >= 100 ? '¡Buen trabajo! El océano está más limpio gracias a ti 🐟' :
                       score >= 50 ? '¡Cada esfuerzo cuenta! Sigue protegiendo la vida marina 🌊' :
                       '¡No te rindas! Cada pieza de plástico que recoges hace la diferencia 💪'}
                    </p>
                  </div>
                </div>
              )}

              {/* Burbujas de fondo */}
              <div className="absolute w-2 h-2 bg-white/30 rounded-full animate-ping" style={{ left: '10%', top: '20%', animationDelay: '0s' }}></div>
              <div className="absolute w-3 h-3 bg-white/20 rounded-full animate-ping" style={{ left: '70%', top: '40%', animationDelay: '1s' }}></div>
              <div className="absolute w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ left: '30%', top: '60%', animationDelay: '2s' }}></div>
              <div className="absolute w-2 h-2 bg-white/25 rounded-full animate-ping" style={{ left: '80%', top: '15%', animationDelay: '0.5s' }}></div>

              {/* Objetos del juego */}
              {objects.map(obj => (
                <div
                  key={obj.id}
                  className={`absolute transition-opacity duration-200 ${obj.collected ? 'opacity-0' : ''}`}
                  style={{
                    left: obj.x,
                    top: obj.y,
                    width: obj.width,
                    height: obj.height,
                  }}
                >
                  {obj.type === 'plastic' ? (
                    <div className="w-full h-full bg-yellow-400 rounded border-2 border-yellow-600 flex items-center justify-center text-xs">
                      🗑️
                    </div>
                  ) : (
                    <div className="w-full h-full bg-orange-400 rounded-full border-2 border-orange-600 flex items-center justify-center text-xs">
                      🐟
                    </div>
                  )}
                </div>
              ))}

              {/* Jugador (submarinista) - Nuevo diseño */}
              <div
                className="absolute bottom-20 transition-all duration-100"
                style={{
                  left: playerX,
                  width: playerWidth,
                  height: playerHeight,
                }}
              >
                <div className="w-full h-full relative">
                  {/* Cuerpo del buzo */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-blue-700 rounded-t-lg border-2 border-blue-900"></div>
                  {/* Tanque de oxígeno */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 translate-x-3 w-3 h-5 bg-gray-400 rounded border border-gray-600"></div>
                  {/* Máscara/cabeza */}
                  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-200 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                    <div className="w-2 h-1 bg-black rounded-full"></div>
                  </div>
                  {/* Aletas */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-x-4 w-3 h-2 bg-blue-500 rounded-full"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-x-1 w-3 h-2 bg-blue-500 rounded-full"></div>
                  {/* Brazos */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 -translate-x-3 w-2 h-3 bg-blue-600 rounded"></div>
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-x-1 w-2 h-3 bg-blue-600 rounded"></div>
                </div>
              </div>

              {/* Fondo del océano */}
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-green-800 to-green-600">
                <div className="absolute bottom-2 left-10 text-green-300">🪸</div>
                <div className="absolute bottom-3 left-32 text-green-400">🌿</div>
                <div className="absolute bottom-1 right-20 text-green-300">🪸</div>
                <div className="absolute bottom-4 right-40 text-green-400">🌿</div>
              </div>
            </div>

            {/* Controles móviles */}
            <div className="flex justify-center mt-4 space-x-4">
              <Button
                onTouchStart={() => movePlayer('left')}
                onMouseDown={() => movePlayer('left')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-3 text-lg"
              >
                ←
              </Button>
              <Button
                onTouchStart={() => movePlayer('right')}
                onMouseDown={() => movePlayer('right')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-3 text-lg"
              >
                →
              </Button>
            </div>

            <p className="text-center text-blue-200 text-xs sm:text-sm mt-2">
              Usa los botones o las flechas del teclado para moverte
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AventuraSubmarina;
