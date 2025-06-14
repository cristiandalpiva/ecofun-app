import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
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
  onGround: boolean;
}

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Collectible {
  id: number;
  x: number;
  y: number;
  emoji: string;
  collected: boolean;
}

interface Enemy {
  id: number;
  x: number;
  y: number;
  velocityX: number;
  emoji: string;
}

interface Level {
  name: string;
  description: string;
  emoji: string;
  bgGradient: string;
  platforms: Platform[];
  collectibles: Collectible[];
  enemies: Enemy[];
  targetScore: number;
  educationalMessage: string;
}

const EcoPlatformer: React.FC<EcoPlatformerProps> = ({ onComplete, onBack }) => {
  const [gameState, setGameState] = useState<'levelSelect' | 'playing' | 'levelComplete' | 'gameOver'>('levelSelect');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [player, setPlayer] = useState<Player>({ x: 50, y: 50, velocityX: 0, velocityY: 0, onGround: false });
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameLoopId, setGameLoopId] = useState<NodeJS.Timeout | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const levels: Level[] = [
    {
      name: "Bosque Limpio",
      description: "Recoge basura en el bosque",
      emoji: "🌳",
      bgGradient: "from-green-200 to-emerald-100",
      platforms: [
        { x: 0, y: 0, width: 800, height: 20 },
        { x: 0, y: 0, width: 20, height: 400 },
        { x: 780, y: 0, width: 20, height: 400 },
        { x: 100, y: 100, width: 200, height: 20 },
        { x: 400, y: 150, width: 200, height: 20 },
        { x: 200, y: 250, width: 200, height: 20 },
        { x: 500, y: 300, width: 200, height: 20 },
      ],
      collectibles: [
        { id: 1, x: 150, y: 150, emoji: "🗑️", collected: false },
        { id: 2, x: 450, y: 200, emoji: "📦", collected: false },
        { id: 3, x: 250, y: 300, emoji: "🥤", collected: false },
        { id: 4, x: 550, y: 350, emoji: "📄", collected: false },
        { id: 5, x: 700, y: 50, emoji: "🧴", collected: false },
      ],
      enemies: [
        { id: 1, x: 300, y: 50, velocityX: 1, emoji: "🦝" },
        { id: 2, x: 600, y: 200, velocityX: -1, emoji: "🦊" },
      ],
      targetScore: 5,
      educationalMessage: "¡Mantener los bosques limpios ayuda a proteger los hábitats de muchos animales y plantas! Cada pieza de basura que recoges marca la diferencia."
    },
    {
      name: "Playa Ecológica",
      description: "Limpia la playa de plásticos",
      emoji: "🏖️",
      bgGradient: "from-blue-200 to-yellow-100",
      platforms: [
        { x: 0, y: 0, width: 800, height: 20 },
        { x: 0, y: 0, width: 20, height: 400 },
        { x: 780, y: 0, width: 20, height: 400 },
        { x: 100, y: 80, width: 150, height: 20 },
        { x: 350, y: 120, width: 150, height: 20 },
        { x: 600, y: 160, width: 150, height: 20 },
        { x: 200, y: 200, width: 150, height: 20 },
        { x: 450, y: 240, width: 150, height: 20 },
        { x: 100, y: 280, width: 150, height: 20 },
        { x: 350, y: 320, width: 150, height: 20 },
      ],
      collectibles: [
        { id: 1, x: 120, y: 130, emoji: "🧶", collected: false },
        { id: 2, x: 400, y: 170, emoji: "🥤", collected: false },
        { id: 3, x: 650, y: 210, emoji: "🧴", collected: false },
        { id: 4, x: 250, y: 250, emoji: "👜", collected: false },
        { id: 5, x: 500, y: 290, emoji: "🔋", collected: false },
        { id: 6, x: 150, y: 330, emoji: "🥫", collected: false },
        { id: 7, x: 400, y: 370, emoji: "📱", collected: false },
      ],
      enemies: [
        { id: 1, x: 300, y: 50, velocityX: 1.5, emoji: "🦀" },
        { id: 2, x: 500, y: 150, velocityX: -1.5, emoji: "🦑" },
        { id: 3, x: 200, y: 250, velocityX: 1.5, emoji: "🦞" },
      ],
      targetScore: 7,
      educationalMessage: "Los plásticos en el océano pueden tardar cientos de años en descomponerse y dañan a la vida marina. ¡Gracias por ayudar a mantener nuestras playas limpias!"
    },
    {
      name: "Ciudad Verde",
      description: "Recicla en la ciudad",
      emoji: "🏙️",
      bgGradient: "from-gray-200 to-blue-100",
      platforms: [
        { x: 0, y: 0, width: 800, height: 20 },
        { x: 0, y: 0, width: 20, height: 400 },
        { x: 780, y: 0, width: 20, height: 400 },
        { x: 100, y: 70, width: 100, height: 20 },
        { x: 250, y: 110, width: 100, height: 20 },
        { x: 400, y: 150, width: 100, height: 20 },
        { x: 550, y: 190, width: 100, height: 20 },
        { x: 700, y: 230, width: 80, height: 20 },
        { x: 550, y: 270, width: 100, height: 20 },
        { x: 400, y: 310, width: 100, height: 20 },
        { x: 250, y: 350, width: 100, height: 20 },
        { x: 100, y: 390, width: 100, height: 20 },
      ],
      collectibles: [
        { id: 1, x: 120, y: 120, emoji: "📰", collected: false },
        { id: 2, x: 270, y: 160, emoji: "🥫", collected: false },
        { id: 3, x: 420, y: 200, emoji: "🧃", collected: false },
        { id: 4, x: 570, y: 240, emoji: "📦", collected: false },
        { id: 5, x: 720, y: 280, emoji: "🔋", collected: false },
        { id: 6, x: 570, y: 320, emoji: "💡", collected: false },
        { id: 7, x: 420, y: 360, emoji: "📱", collected: false },
        { id: 8, x: 270, y: 400, emoji: "🧴", collected: false },
        { id: 9, x: 120, y: 440, emoji: "🥤", collected: false },
      ],
      enemies: [
        { id: 1, x: 200, y: 50, velocityX: 2, emoji: "🚗" },
        { id: 2, x: 400, y: 100, velocityX: -2, emoji: "🚚" },
        { id: 3, x: 600, y: 150, velocityX: 2, emoji: "🚌" },
        { id: 4, x: 300, y: 200, velocityX: -2, emoji: "🚲" },
      ],
      targetScore: 9,
      educationalMessage: "En las ciudades, el reciclaje adecuado reduce la cantidad de residuos que van a los vertederos y ahorra recursos naturales. ¡Cada objeto reciclado es un paso hacia una ciudad más sostenible!"
    }
  ];

  // Initialize level
  useEffect(() => {
    if (gameState === 'playing') {
      const level = levels[currentLevel];
      setPlatforms(level.platforms);
      setCollectibles(level.collectibles);
      setEnemies(level.enemies);
      setScore(0);
      setTimeLeft(60);
      setPlayer({ x: 50, y: 50, velocityX: 0, velocityY: 0, onGround: false });
      
      // Start game loop
      const gameLoop = setInterval(() => {
        updateGameState();
      }, 1000 / 60); // 60 FPS
      
      setGameLoopId(gameLoop);
      
      // Start timer
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            if (gameLoopId) clearInterval(gameLoopId);
            setGameState('gameOver');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Add keyboard event listeners
      window.addEventListener('keydown', handleKeyPress);
      
      return () => {
        clearInterval(gameLoop);
        clearInterval(timer);
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [gameState, currentLevel]);

  const updateGameState = () => {
    // Update player position
    setPlayer(prev => {
      let newX = prev.x + prev.velocityX;
      let newY = prev.y + prev.velocityY;
      let newVelocityY = prev.velocityY - 0.5; // Gravity
      let onGround = false;
      
      // Check platform collisions
      for (const platform of platforms) {
        // Check if player is on platform
        if (newX + 15 > platform.x && newX - 15 < platform.x + platform.width &&
            newY <= platform.y + platform.height && newY - 5 >= platform.y) {
          onGround = true;
          newY = platform.y + platform.height;
          newVelocityY = 0;
        }
        
        // Check if player hits platform from below
        if (newX + 15 > platform.x && newX - 15 < platform.x + platform.width &&
            newY + 30 >= platform.y && newY < platform.y) {
          newVelocityY = -1;
          newY = platform.y - 30;
        }
        
        // Check if player hits platform from sides
        if (newY + 30 > platform.y && newY < platform.y + platform.height) {
          // From left
          if (newX + 15 >= platform.x && newX < platform.x) {
            newX = platform.x - 15;
          }
          // From right
          if (newX - 15 <= platform.x + platform.width && newX > platform.x + platform.width) {
            newX = platform.x + platform.width + 15;
          }
        }
      }
      
      // Check collectible collisions
      setCollectibles(prev => {
        let updated = false;
        const newCollectibles = prev.map(item => {
          if (!item.collected && 
              Math.abs(newX - item.x) < 20 && 
              Math.abs(newY - item.y) < 30) {
            updated = true;
            setScore(s => {
              const newScore = s + 1;
              if (newScore >= levels[currentLevel].targetScore) {
                if (gameLoopId) clearInterval(gameLoopId);
                setGameState('levelComplete');
              }
              return newScore;
            });
            return { ...item, collected: true };
          }
          return item;
        });
        
        if (updated) {
          toast({
            title: "¡Objeto recogido! ♻️",
            description: "Sigue así, estás ayudando al planeta.",
            duration: 1500,
          });
        }
        
        return newCollectibles;
      });
      
      // Check enemy collisions
      for (const enemy of enemies) {
        if (Math.abs(newX - enemy.x) < 25 && 
            Math.abs(newY - enemy.y) < 25) {
          setLives(l => {
            const newLives = l - 1;
            if (newLives <= 0) {
              if (gameLoopId) clearInterval(gameLoopId);
              setGameState('gameOver');
            } else {
              toast({
                title: "¡Cuidado! ⚠️",
                description: `Te quedan ${newLives} vidas.`,
                duration: 1500,
              });
              // Reset player position after hit
              newX = 50;
              newY = 50;
              newVelocityY = 0;
            }
            return newLives;
          });
          break;
        }
      }
      
      // Update enemy positions
      setEnemies(prev => prev.map(enemy => {
        let newX = enemy.x + enemy.velocityX;
        
        // Bounce enemies off platforms edges
        for (const platform of platforms) {
          if (newX >= platform.x + platform.width || newX <= platform.x) {
            return { ...enemy, velocityX: -enemy.velocityX };
          }
        }
        
        // Bounce enemies off walls
        if (newX >= 780 || newX <= 20) {
          return { ...enemy, velocityX: -enemy.velocityX };
        }
        
        return { ...enemy, x: newX };
      }));
      
      // Keep player within bounds
      newX = Math.max(20, Math.min(newX, 780));
      
      // If player falls off the bottom
      if (newY < 0) {
        setLives(l => {
          const newLives = l - 1;
          if (newLives <= 0) {
            if (gameLoopId) clearInterval(gameLoopId);
            setGameState('gameOver');
          } else {
            toast({
              title: "¡Te caíste! ⚠️",
              description: `Te quedan ${newLives} vidas.`,
              duration: 1500,
            });
          }
          return newLives;
        });
        return { x: 50, y: 50, velocityX: 0, velocityY: 0, onGround: false };
      }
      
      // Apply friction when on ground
      const newVelocityX = onGround ? prev.velocityX * 0.8 : prev.velocityX;
      
      return { 
        x: newX, 
        y: newY, 
        velocityX: Math.abs(newVelocityX) < 0.1 ? 0 : newVelocityX, 
        velocityY: newVelocityY, 
        onGround 
      };
    });
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState !== 'playing') return;
    
    switch (event.key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
        movePlayer('left');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        movePlayer('right');
        break;
      case 'ArrowUp':
      case ' ':
      case 'w':
      case 'W':
        if (player.onGround) {
          jump();
        }
        break;
    }
  }, [gameState, player.onGround]);

  // Mobile control functions
  const handleMobileControl = (action: 'left' | 'right' | 'jump') => {
    if (gameState !== 'playing') return;
    
    switch (action) {
      case 'left':
        movePlayer('left');
        break;
      case 'right':
        movePlayer('right');
        break;
      case 'jump':
        if (player.onGround) {
          jump();
        }
        break;
    }
  };

  const movePlayer = (direction: 'left' | 'right') => {
    setPlayer(prev => ({
      ...prev,
      velocityX: direction === 'left' ? -3 : 3
    }));
  };

  const jump = () => {
    setPlayer(prev => ({
      ...prev,
      velocityY: 10,
      onGround: false
    }));
  };

  const startLevel = (levelIndex: number) => {
    setCurrentLevel(levelIndex);
    setLives(3);
    setGameState('playing');
  };

  const resetLevel = () => {
    if (gameLoopId) clearInterval(gameLoopId);
    setGameState('playing');
  };

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setGameState('playing');
    }
  };

  const completeGame = () => {
    onComplete(150);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <Button variant="outline" onClick={onBack} size={isMobile ? "sm" : "default"}>
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Volver</span>
              </Button>
              <h1 className="text-lg sm:text-2xl font-bold text-green-700 flex items-center">
                🎮 EcoAventuras
              </h1>
              <div className="text-right">
                <p className="text-sm sm:text-lg font-bold text-green-600">⏰ {timeLeft}s</p>
                <Button variant="outline" size="sm" onClick={resetLevel}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {gameState === 'levelSelect' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-2 sm:mb-4">Elige tu Misión Ecológica</h2>
                  <p className="text-sm sm:text-base text-gray-600">Completa los 3 niveles para convertirte en un verdadero EcoHéroe</p>
                </div>
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
                  {levels.map((level, index) => (
                    <Card 
                      key={index}
                      className="cursor-pointer transition-all duration-300 hover:scale-105 bg-white border-2 border-green-200 hover:border-green-400 shadow-lg hover:shadow-xl"
                      onClick={() => startLevel(index)}
                    >
                      <CardContent className="p-3 sm:p-4 text-center">
                        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{level.emoji}</div>
                        <h3 className="text-sm sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2">{level.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{level.description}</p>
                        <Button className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white text-xs sm:text-sm" size={isMobile ? "sm" : "default"}>
                          ¡Jugar!
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {gameState === 'playing' && (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-xl font-bold text-green-700">{levels[currentLevel].name}</h3>
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <span className="text-xs sm:text-sm font-semibold text-blue-600">Objetos: {score}/{levels[currentLevel].targetScore}</span>
                    <span className="text-xs sm:text-sm font-semibold text-green-600">Vidas: {lives}</span>
                  </div>
                </div>
                
                <Progress 
                  value={(score / levels[currentLevel].targetScore) * 100} 
                  className="h-2 sm:h-3" 
                />

                <div 
                  ref={gameAreaRef}
                  className={`relative bg-gradient-to-b ${levels[currentLevel].bgGradient} border-2 border-green-400 rounded-lg overflow-hidden`}
                  style={{ 
                    width: '100%', 
                    height: isMobile ? '300px' : '400px',
                    maxWidth: '800px',
                    margin: '0 auto'
                  }}
                >
                  {/* Player */}
                  <div
                    className="absolute transition-all duration-100 ease-linear"
                    style={{
                      left: `${(player.x / 800) * 100}%`,
                      bottom: `${(player.y / 400) * 100}%`,
                      width: isMobile ? '20px' : '30px',
                      height: isMobile ? '20px' : '30px',
                      transform: 'translate(-50%, 0)'
                    }}
                  >
                    <div className="text-lg sm:text-xl">🚶‍♂️</div>
                  </div>

                  {/* Platforms */}
                  {platforms.map((platform, index) => (
                    <div
                      key={index}
                      className="absolute bg-green-600 rounded"
                      style={{
                        left: `${(platform.x / 800) * 100}%`,
                        bottom: `${(platform.y / 400) * 100}%`,
                        width: `${(platform.width / 800) * 100}%`,
                        height: `${(platform.height / 400) * 100}%`
                      }}
                    />
                  ))}

                  {/* Collectibles */}
                  {collectibles.map((item) => (
                    <div
                      key={item.id}
                      className="absolute animate-bounce"
                      style={{
                        left: `${(item.x / 800) * 100}%`,
                        bottom: `${(item.y / 400) * 100}%`,
                        fontSize: isMobile ? '16px' : '20px',
                        transform: 'translate(-50%, 0)'
                      }}
                    >
                      {item.emoji}
                    </div>
                  ))}

                  {/* Enemies */}
                  {enemies.map((enemy) => (
                    <div
                      key={enemy.id}
                      className="absolute"
                      style={{
                        left: `${(enemy.x / 800) * 100}%`,
                        bottom: `${(enemy.y / 400) * 100}%`,
                        fontSize: isMobile ? '16px' : '20px',
                        transform: 'translate(-50%, 0)'
                      }}
                    >
                      {enemy.emoji}
                    </div>
                  ))}
                </div>

                {/* Mobile Controls */}
                {isMobile && (
                  <div className="flex justify-center space-x-4 mt-4 bg-gray-100 p-4 rounded-lg">
                    <Button
                      variant="outline"
                      size="lg"
                      onTouchStart={() => handleMobileControl('left')}
                      onMouseDown={() => handleMobileControl('left')}
                      className="flex-1 max-w-20 h-12 bg-blue-500 hover:bg-blue-600 text-white border-blue-600"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onTouchStart={() => handleMobileControl('jump')}
                      onMouseDown={() => handleMobileControl('jump')}
                      className="flex-1 max-w-20 h-12 bg-green-500 hover:bg-green-600 text-white border-green-600"
                    >
                      <ChevronUp className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onTouchStart={() => handleMobileControl('right')}
                      onMouseDown={() => handleMobileControl('right')}
                      className="flex-1 max-w-20 h-12 bg-blue-500 hover:bg-blue-600 text-white border-blue-600"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </div>
                )}

                {/* Desktop Instructions */}
                {!isMobile && (
                  <div className="text-center text-xs sm:text-sm text-gray-600 bg-gray-100 p-2 sm:p-3 rounded-lg">
                    Usa las flechas del teclado o WASD para moverte. Espacio para saltar.
                  </div>
                )}

                {/* Mobile Instructions */}
                {isMobile && (
                  <div className="text-center text-xs text-gray-600 bg-gray-100 p-2 rounded-lg">
                    Usa los botones táctiles para moverte y saltar.
                  </div>
                )}
              </div>
            )}

            {gameState === 'levelComplete' && (
              <div className="text-center space-y-4 sm:space-y-6">
                <div className="text-4xl sm:text-6xl mb-4">{levels[currentLevel].emoji}</div>
                <h2 className="text-xl sm:text-3xl font-bold text-green-700">¡Nivel Completado!</h2>
                <p className="text-sm sm:text-lg text-gray-700">
                  ¡Excelente trabajo en {levels[currentLevel].name}!
                </p>
                <div className="bg-gradient-to-r from-green-100 to-blue-100 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-green-800 font-semibold">
                    {levels[currentLevel].educationalMessage}
                  </p>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {currentLevel < levels.length - 1 ? (
                    <Button 
                      onClick={nextLevel}
                      className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-full text-sm sm:text-lg shadow-lg"
                    >
                      Siguiente Nivel
                    </Button>
                  ) : (
                    <Button 
                      onClick={completeGame}
                      className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-full text-sm sm:text-lg shadow-lg"
                    >
                      ¡Completar Juego! (+150 pts)
                    </Button>
                  )}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                    <Button 
                      onClick={resetLevel}
                      variant="outline"
                      className="border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 sm:px-6 rounded-full text-sm"
                    >
                      Repetir Nivel
                    </Button>
                    <Button 
                      onClick={() => setGameState('levelSelect')}
                      variant="outline"
                      className="border-2 border-purple-400 text-purple-600 hover:bg-purple-50 font-semibold py-2 px-4 sm:px-6 rounded-full text-sm"
                    >
                      Elegir Nivel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {gameState === 'gameOver' && (
              <div className="text-center space-y-4 sm:space-y-6">
                <div className="text-4xl sm:text-6xl mb-4">😅</div>
                <h2 className="text-xl sm:text-3xl font-bold text-red-700">¡Inténtalo de Nuevo!</h2>
                <p className="text-sm sm:text-lg text-gray-700">
                  No te rindas, ¡los EcoHéroes nunca se dan por vencidos!
                </p>
                <div className="space-y-2 sm:space-y-3">
                  <Button 
                    onClick={resetLevel}
                    className="bg-gradient-to-r from-red-400 to-orange-400 hover:from-red-500 hover:to-orange-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-full text-sm sm:text-lg shadow-lg"
                  >
                    Reintentar Nivel
                  </Button>
                  <Button 
                    onClick={() => setGameState('levelSelect')}
                    variant="outline"
                    className="border-2 border-purple-400 text-purple-600 hover:bg-purple-50 font-semibold py-2 px-4 sm:px-6 rounded-full text-sm"
                  >
                    Elegir Otro Nivel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EcoPlatformer;
