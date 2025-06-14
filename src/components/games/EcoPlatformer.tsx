
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, RotateCcw } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface EcoPlatformerProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Player {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  isJumping: boolean;
  direction: 'left' | 'right';
}

interface GameObject {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'collectible' | 'enemy' | 'platform' | 'goal';
  subtype?: string;
  collected?: boolean;
}

interface Level {
  id: number;
  name: string;
  theme: string;
  backgroundColor: string;
  objective: string;
  objects: GameObject[];
  platforms: GameObject[];
  collectibles: number;
}

const EcoPlatformer: React.FC<EcoPlatformerProps> = ({ onComplete, onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [player, setPlayer] = useState<Player>({
    x: 50,
    y: 350,
    velocityX: 0,
    velocityY: 0,
    isJumping: false,
    direction: 'right'
  });
  const [score, setScore] = useState(0);
  const [collectedItems, setCollectedItems] = useState(0);
  const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
  const [platforms, setPlatforms] = useState<GameObject[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const levels: Level[] = [
    {
      id: 1,
      name: "Ahorro Energético",
      theme: "💡",
      backgroundColor: "from-yellow-200 to-amber-200",
      objective: "Recoge 8 bombillas y apaga las que desperdician energía",
      collectibles: 8,
      objects: [
        { id: 1, x: 150, y: 320, width: 20, height: 20, type: 'collectible', subtype: 'bulb' },
        { id: 2, x: 250, y: 250, width: 20, height: 20, type: 'collectible', subtype: 'bulb' },
        { id: 3, x: 350, y: 180, width: 20, height: 20, type: 'collectible', subtype: 'bulb' },
        { id: 4, x: 450, y: 250, width: 20, height: 20, type: 'collectible', subtype: 'bulb' },
        { id: 5, x: 550, y: 150, width: 20, height: 20, type: 'collectible', subtype: 'bulb' },
        { id: 6, x: 650, y: 200, width: 20, height: 20, type: 'collectible', subtype: 'bulb' },
        { id: 7, x: 720, y: 280, width: 20, height: 20, type: 'collectible', subtype: 'bulb' },
        { id: 8, x: 600, y: 120, width: 20, height: 20, type: 'collectible', subtype: 'bulb' },
        { id: 9, x: 300, y: 300, width: 25, height: 25, type: 'enemy', subtype: 'waste' },
        { id: 10, x: 500, y: 200, width: 25, height: 25, type: 'enemy', subtype: 'waste' },
        { id: 11, x: 750, y: 320, width: 30, height: 40, type: 'goal' }
      ],
      platforms: [
        { id: 1, x: 200, y: 270, width: 100, height: 15, type: 'platform' },
        { id: 2, x: 330, y: 200, width: 80, height: 15, type: 'platform' },
        { id: 3, x: 480, y: 270, width: 120, height: 15, type: 'platform' },
        { id: 4, x: 620, y: 170, width: 90, height: 15, type: 'platform' },
        { id: 5, x: 700, y: 240, width: 80, height: 15, type: 'platform' }
      ]
    },
    {
      id: 2,
      name: "Ahorro de Agua",
      theme: "💧",
      backgroundColor: "from-cyan-200 to-blue-200",
      objective: "Cierra 6 llaves que gotean y evita las fugas",
      collectibles: 6,
      objects: [
        { id: 1, x: 180, y: 300, width: 20, height: 20, type: 'collectible', subtype: 'tap' },
        { id: 2, x: 280, y: 220, width: 20, height: 20, type: 'collectible', subtype: 'tap' },
        { id: 3, x: 400, y: 160, width: 20, height: 20, type: 'collectible', subtype: 'tap' },
        { id: 4, x: 520, y: 240, width: 20, height: 20, type: 'collectible', subtype: 'tap' },
        { id: 5, x: 650, y: 180, width: 20, height: 20, type: 'collectible', subtype: 'tap' },
        { id: 6, x: 720, y: 260, width: 20, height: 20, type: 'collectible', subtype: 'tap' },
        { id: 7, x: 350, y: 280, width: 25, height: 25, type: 'enemy', subtype: 'leak' },
        { id: 8, x: 550, y: 180, width: 25, height: 25, type: 'enemy', subtype: 'leak' },
        { id: 9, x: 750, y: 320, width: 30, height: 40, type: 'goal' }
      ],
      platforms: [
        { id: 1, x: 150, y: 320, width: 80, height: 15, type: 'platform' },
        { id: 2, x: 260, y: 240, width: 100, height: 15, type: 'platform' },
        { id: 3, x: 380, y: 180, width: 90, height: 15, type: 'platform' },
        { id: 4, x: 500, y: 260, width: 110, height: 15, type: 'platform' },
        { id: 5, x: 630, y: 200, width: 85, height: 15, type: 'platform' },
        { id: 6, x: 700, y: 280, width: 80, height: 15, type: 'platform' }
      ]
    },
    {
      id: 3,
      name: "Cuidado de Plantas",
      theme: "🌱",
      backgroundColor: "from-green-200 to-emerald-200",
      objective: "Planta 7 semillas y riega las plantas marchitas",
      collectibles: 7,
      objects: [
        { id: 1, x: 160, y: 310, width: 20, height: 20, type: 'collectible', subtype: 'seed' },
        { id: 2, x: 260, y: 230, width: 20, height: 20, type: 'collectible', subtype: 'seed' },
        { id: 3, x: 380, y: 170, width: 20, height: 20, type: 'collectible', subtype: 'seed' },
        { id: 4, x: 480, y: 250, width: 20, height: 20, type: 'collectible', subtype: 'seed' },
        { id: 5, x: 580, y: 160, width: 20, height: 20, type: 'collectible', subtype: 'seed' },
        { id: 6, x: 680, y: 220, width: 20, height: 20, type: 'collectible', subtype: 'seed' },
        { id: 7, x: 720, y: 280, width: 20, height: 20, type: 'collectible', subtype: 'seed' },
        { id: 8, x: 320, y: 290, width: 25, height: 25, type: 'enemy', subtype: 'pest' },
        { id: 9, x: 520, y: 190, width: 25, height: 25, type: 'enemy', subtype: 'pest' },
        { id: 10, x: 750, y: 320, width: 30, height: 40, type: 'goal' }
      ],
      platforms: [
        { id: 1, x: 140, y: 330, width: 90, height: 15, type: 'platform' },
        { id: 2, x: 240, y: 250, width: 95, height: 15, type: 'platform' },
        { id: 3, x: 360, y: 190, width: 100, height: 15, type: 'platform' },
        { id: 4, x: 460, y: 270, width: 85, height: 15, type: 'platform' },
        { id: 5, x: 560, y: 180, width: 90, height: 15, type: 'platform' },
        { id: 6, x: 660, y: 240, width: 85, height: 15, type: 'platform' },
        { id: 7, x: 700, y: 300, width: 80, height: 15, type: 'platform' }
      ]
    }
  ];

  const getCurrentLevel = () => levels.find(l => l.id === currentLevel)!;

  // Initialize level
  useEffect(() => {
    const level = getCurrentLevel();
    setGameObjects(level.objects.map(obj => ({ ...obj, collected: false })));
    setPlatforms(level.platforms);
    setCollectedItems(0);
    setTimeLeft(60);
    setPlayer({
      x: 50,
      y: 350,
      velocityX: 0,
      velocityY: 0,
      isJumping: false,
      direction: 'right'
    });
  }, [currentLevel]);

  // Game timer
  useEffect(() => {
    if (gameStarted && !gameCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      toast({
        title: "¡Tiempo agotado! ⏰",
        description: "¡Inténtalo de nuevo!",
        variant: "destructive"
      });
      setGameStarted(false);
    }
  }, [gameStarted, gameCompleted, timeLeft]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeysPressed(prev => new Set(prev).add(e.key));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeysPressed(prev => {
        const newSet = new Set(prev);
        newSet.delete(e.key);
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Collision detection
  const checkCollision = (rect1: any, rect2: any) => {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  };

  // Game loop
  const gameLoop = useCallback(() => {
    if (!gameStarted || gameCompleted) return;

    setPlayer(prevPlayer => {
      let newPlayer = { ...prevPlayer };
      
      // Handle input
      if (keysPressed.has('ArrowLeft') || keysPressed.has('a')) {
        newPlayer.velocityX = -3;
        newPlayer.direction = 'left';
      } else if (keysPressed.has('ArrowRight') || keysPressed.has('d')) {
        newPlayer.velocityX = 3;
        newPlayer.direction = 'right';
      } else {
        newPlayer.velocityX *= 0.8; // Friction
      }

      if ((keysPressed.has('ArrowUp') || keysPressed.has(' ') || keysPressed.has('w')) && !newPlayer.isJumping) {
        newPlayer.velocityY = -12;
        newPlayer.isJumping = true;
      }

      // Apply gravity
      newPlayer.velocityY += 0.6;

      // Update position
      newPlayer.x += newPlayer.velocityX;
      newPlayer.y += newPlayer.velocityY;

      // Boundary checking
      newPlayer.x = Math.max(0, Math.min(750, newPlayer.x));

      // Platform collision
      const playerRect = {
        x: newPlayer.x,
        y: newPlayer.y,
        width: 30,
        height: 30
      };

      let onPlatform = false;

      // Ground collision
      if (newPlayer.y >= 350) {
        newPlayer.y = 350;
        newPlayer.velocityY = 0;
        newPlayer.isJumping = false;
        onPlatform = true;
      }

      // Platform collision
      platforms.forEach(platform => {
        if (checkCollision(playerRect, platform) && newPlayer.velocityY > 0) {
          if (newPlayer.y < platform.y) {
            newPlayer.y = platform.y - 30;
            newPlayer.velocityY = 0;
            newPlayer.isJumping = false;
            onPlatform = true;
          }
        }
      });

      return newPlayer;
    });

    // Check collectible collisions
    setGameObjects(prevObjects => {
      const newObjects = [...prevObjects];
      let itemsCollected = 0;

      newObjects.forEach(obj => {
        if (obj.type === 'collectible' && !obj.collected) {
          const playerRect = { x: player.x, y: player.y, width: 30, height: 30 };
          if (checkCollision(playerRect, obj)) {
            obj.collected = true;
            itemsCollected++;
            setScore(prev => prev + 10);
            setCollectedItems(prev => prev + 1);
            
            const level = getCurrentLevel();
            toast({
              title: level.theme === "💡" ? "¡Bombilla recogida!" : 
                     level.theme === "💧" ? "¡Llave cerrada!" : "¡Semilla plantada!",
              description: "+10 puntos"
            });
          }
        }
        
        if (obj.type === 'enemy') {
          const playerRect = { x: player.x, y: player.y, width: 30, height: 30 };
          if (checkCollision(playerRect, obj)) {
            toast({
              title: "¡Cuidado!",
              description: "Evita los obstáculos",
              variant: "destructive"
            });
            setScore(prev => Math.max(0, prev - 5));
          }
        }

        if (obj.type === 'goal') {
          const playerRect = { x: player.x, y: player.y, width: 30, height: 30 };
          if (checkCollision(playerRect, obj) && collectedItems >= getCurrentLevel().collectibles) {
            if (currentLevel < 3) {
              setCurrentLevel(prev => prev + 1);
              toast({
                title: "¡Nivel completado! 🎉",
                description: `Avanzando al nivel ${currentLevel + 1}`,
              });
            } else {
              setGameCompleted(true);
              toast({
                title: "¡Juego completado! 🏆",
                description: "¡Eres un verdadero EcoHéroe!",
              });
            }
          }
        }
      });

      return newObjects;
    });

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameStarted, gameCompleted, player, platforms, collectedItems, currentLevel, keysPressed]);

  useEffect(() => {
    if (gameStarted) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameLoop, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setGameCompleted(false);
    setScore(0);
    setCurrentLevel(1);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setScore(0);
    setCurrentLevel(1);
  };

  const handleComplete = () => {
    const timeBonus = timeLeft * 2;
    const finalScore = score + timeBonus;
    onComplete(finalScore);
  };

  const renderObject = (obj: GameObject) => {
    if (obj.collected) return null;

    let emoji = '';
    let bgColor = '';

    switch (obj.type) {
      case 'collectible':
        if (obj.subtype === 'bulb') { emoji = '💡'; bgColor = 'bg-yellow-400'; }
        else if (obj.subtype === 'tap') { emoji = '🚰'; bgColor = 'bg-blue-400'; }
        else if (obj.subtype === 'seed') { emoji = '🌱'; bgColor = 'bg-green-400'; }
        break;
      case 'enemy':
        if (obj.subtype === 'waste') { emoji = '⚡'; bgColor = 'bg-red-400'; }
        else if (obj.subtype === 'leak') { emoji = '💧'; bgColor = 'bg-red-400'; }
        else if (obj.subtype === 'pest') { emoji = '🐛'; bgColor = 'bg-red-400'; }
        break;
      case 'goal':
        emoji = '🎯';
        bgColor = collectedItems >= getCurrentLevel().collectibles ? 'bg-green-500' : 'bg-gray-400';
        break;
    }

    return (
      <div
        key={obj.id}
        className={`absolute ${bgColor} rounded-lg flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white`}
        style={{
          left: obj.x,
          top: obj.y,
          width: obj.width,
          height: obj.height
        }}
      >
        {emoji}
      </div>
    );
  };

  if (!gameStarted) {
    const level = getCurrentLevel();
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-cyan-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <Button variant="outline" onClick={onBack} className="absolute top-4 left-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>

              <div className="text-6xl mb-6">{level.theme}</div>
              <h1 className="text-3xl font-bold text-emerald-700 mb-4">
                EcoAventuras Plataformas
              </h1>
              <h2 className="text-xl font-bold text-emerald-600 mb-4">
                Nivel {currentLevel}: {level.name}
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {level.objective}
              </p>
              
              <div className="bg-emerald-100 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-emerald-800 mb-2">Controles:</h3>
                <div className="text-emerald-700 text-sm space-y-1">
                  <p>• Flechas o WASD para mover</p>
                  <p>• Espacio o Flecha Arriba para saltar</p>
                  <p>• Recoge todos los objetos antes de llegar a la meta</p>
                </div>
              </div>

              <Button
                onClick={startGame}
                className="bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold py-3 px-8 rounded-full text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                ¡Comenzar Aventura!
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-cyan-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-6">🏆</div>
              <h1 className="text-3xl font-bold text-emerald-700 mb-4">
                ¡EcoHéroe Completado!
              </h1>
              <div className="text-5xl font-bold text-emerald-600 mb-4">{score} puntos</div>
              
              <Card className="bg-emerald-50 border-2 border-emerald-300 mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-emerald-800 mb-3">🌍 Mensaje Educativo</h3>
                  <p className="text-emerald-700 text-sm leading-relaxed">
                    ¡Increíble! Has demostrado ser un verdadero guardián del planeta. El ahorro de energía, 
                    el cuidado del agua y la protección de las plantas son acciones fundamentales para 
                    preservar nuestro medio ambiente. Cada pequeña acción cuenta: apagar luces innecesarias 
                    puede ahorrar hasta 75% de energía, cerrar una llave que gotea puede ahorrar 15,000 litros 
                    al año, y plantar un árbol puede absorber 22 kg de CO₂ anualmente. ¡Sigue siendo un EcoHéroe! 🌱
                  </p>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold px-8 py-3 rounded-full text-lg"
                >
                  ¡Completar! (+{score + timeLeft * 2} pts)
                </Button>
                
                <Button variant="outline" onClick={resetGame} className="ml-4">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Jugar de Nuevo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const level = getCurrentLevel();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${level.backgroundColor} p-4`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Salir
          </Button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800">
              Nivel {currentLevel}: {level.name} {level.theme}
            </h1>
            <p className="text-sm text-gray-600">{level.objective}</p>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-gray-800">⏰ {timeLeft}s</div>
            <div className="text-sm text-gray-600">
              {collectedItems}/{level.collectibles} • {score} pts
            </div>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-4">
          <CardContent className="p-3">
            <Progress value={(collectedItems / level.collectibles) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* Game Area */}
        <Card className="bg-gradient-to-b from-sky-100 to-green-100 border-2 border-gray-300 shadow-xl">
          <CardContent className="p-0">
            <div 
              ref={gameAreaRef}
              className="relative w-full h-96 overflow-hidden"
              style={{ background: 'linear-gradient(to bottom, #87CEEB, #98FB98)' }}
            >
              {/* Platforms */}
              {platforms.map(platform => (
                <div
                  key={platform.id}
                  className="absolute bg-amber-600 border-2 border-amber-800 rounded"
                  style={{
                    left: platform.x,
                    top: platform.y,
                    width: platform.width,
                    height: platform.height
                  }}
                />
              ))}

              {/* Game Objects */}
              {gameObjects.map(renderObject)}

              {/* Player */}
              <div
                className="absolute bg-blue-500 border-2 border-blue-700 rounded-full flex items-center justify-center text-lg transition-transform duration-100"
                style={{
                  left: player.x,
                  top: player.y,
                  width: 30,
                  height: 30,
                  transform: `scaleX(${player.direction === 'left' ? -1 : 1})`
                }}
              >
                🧑‍🌾
              </div>

              {/* Ground */}
              <div
                className="absolute bg-green-400 border-t-4 border-green-600"
                style={{
                  left: 0,
                  top: 380,
                  width: '100%',
                  height: 20
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-4 bg-white/80">
          <CardContent className="p-3 text-center">
            <p className="text-sm text-gray-600">
              Usa las flechas o WASD para moverte • Espacio para saltar • 
              Recoge {level.collectibles - collectedItems} objetos más y llega a la meta 🎯
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EcoPlatformer;
