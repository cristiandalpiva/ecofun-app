import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Pause, Play } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface EcoTetrisProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Block {
  x: number;
  y: number;
  type: string;
}

interface Piece {
  blocks: Block[];
  type: string;
  color: string;
  icon: string;
  name: string;
}

const EcoTetris: React.FC<EcoTetrisProps> = ({ onComplete, onBack }) => {
  const BOARD_WIDTH = 10;
  const BOARD_HEIGHT = 20;
  const [board, setBoard] = useState<string[][]>(() => 
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(''))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextPiece, setNextPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [linesCleared, setLinesCleared] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(24);

  const ecoTetriminoes = [
    {
      shape: [[1, 1, 1, 1]], // I-piece
      type: 'tree',
      color: 'bg-green-500',
      icon: '🌳',
      name: 'Árbol'
    },
    {
      shape: [[1, 1], [1, 1]], // O-piece
      type: 'recycling',
      color: 'bg-blue-500',
      icon: '♻️',
      name: 'Reciclaje'
    },
    {
      shape: [[1, 1, 1], [0, 1, 0]], // T-piece
      type: 'wind',
      color: 'bg-cyan-500',
      icon: '💨',
      name: 'Energía Eólica'
    },
    {
      shape: [[1, 1, 1], [1, 0, 0]], // L-piece
      type: 'solar',
      color: 'bg-yellow-500',
      icon: '☀️',
      name: 'Energía Solar'
    },
    {
      shape: [[1, 1, 1], [0, 0, 1]], // J-piece
      type: 'water',
      color: 'bg-blue-600',
      icon: '💧',
      name: 'Agua Limpia'
    },
    {
      shape: [[1, 1, 0], [0, 1, 1]], // S-piece
      type: 'leaf',
      color: 'bg-green-400',
      icon: '🍃',
      name: 'Hoja Verde'
    },
    {
      shape: [[0, 1, 1], [1, 1, 0]], // Z-piece
      type: 'earth',
      color: 'bg-amber-600',
      icon: '🌍',
      name: 'Planeta Tierra'
    }
  ];

  const createPiece = useCallback((): Piece => {
    const pieceData = ecoTetriminoes[Math.floor(Math.random() * ecoTetriminoes.length)];
    const blocks: Block[] = [];
    const shape = pieceData.shape;
    
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          blocks.push({
            x: x + Math.floor(BOARD_WIDTH / 2) - Math.floor(shape[0].length / 2),
            y: y,
            type: pieceData.type
          });
        }
      }
    }

    return {
      blocks,
      type: pieceData.type,
      color: pieceData.color,
      icon: pieceData.icon,
      name: pieceData.name
    };
  }, []);

  const checkCollision = useCallback((piece: Piece, dx = 0, dy = 0): boolean => {
    return piece.blocks.some(block => {
      const newX = block.x + dx;
      const newY = block.y + dy;
      
      return (
        newX < 0 || 
        newX >= BOARD_WIDTH || 
        newY >= BOARD_HEIGHT || 
        (newY >= 0 && board[newY][newX] !== '')
      );
    });
  }, [board]);

  const placePiece = useCallback((piece: Piece) => {
    const newBoard = [...board];
    piece.blocks.forEach(block => {
      if (block.y >= 0) {
        newBoard[block.y][block.x] = piece.type;
      }
    });
    setBoard(newBoard);
  }, [board]);

  const clearLines = useCallback(() => {
    const newBoard = board.filter(row => row.some(cell => cell === ''));
    const clearedCount = BOARD_HEIGHT - newBoard.length;
    
    if (clearedCount > 0) {
      const emptyRows = Array(clearedCount).fill(null).map(() => Array(BOARD_WIDTH).fill(''));
      setBoard([...emptyRows, ...newBoard]);
      setLinesCleared(prev => prev + clearedCount);
      setScore(prev => prev + clearedCount * 100 * level);
      
      // Special eco messages for line clears
      const ecoMessages = [
        "¡Limpiaste el ambiente! 🌱",
        "¡Reciclaste perfectamente! ♻️",
        "¡Energía renovable activada! ⚡",
        "¡Planeta más limpio! 🌍"
      ];
      
      toast({
        title: ecoMessages[Math.floor(Math.random() * ecoMessages.length)],
        description: `+${clearedCount * 100 * level} puntos`,
      });
    }
  }, [board, level]);

  const rotatePiece = useCallback((piece: Piece): Piece => {
    if (piece.type === 'recycling') return piece; // O-piece doesn't rotate
    
    const centerX = Math.round(piece.blocks.reduce((sum, block) => sum + block.x, 0) / piece.blocks.length);
    const centerY = Math.round(piece.blocks.reduce((sum, block) => sum + block.y, 0) / piece.blocks.length);
    
    const rotatedBlocks = piece.blocks.map(block => ({
      x: centerX - (block.y - centerY),
      y: centerY + (block.x - centerX),
      type: block.type
    }));
    
    return { ...piece, blocks: rotatedBlocks };
  }, []);

  const movePiece = useCallback((dx: number, dy: number) => {
    if (!currentPiece || gameOver || isPaused) return;
    
    const newPiece = {
      ...currentPiece,
      blocks: currentPiece.blocks.map(block => ({
        ...block,
        x: block.x + dx,
        y: block.y + dy
      }))
    };
    
    if (!checkCollision(newPiece)) {
      setCurrentPiece(newPiece);
    } else if (dy > 0) {
      // Piece hit bottom or another piece
      placePiece(currentPiece);
      clearLines();
      
      // Check if game over
      if (currentPiece.blocks.some(block => block.y <= 0)) {
        setGameOver(true);
        return;
      }
      
      setCurrentPiece(nextPiece);
      setNextPiece(createPiece());
    }
  }, [currentPiece, gameOver, isPaused, checkCollision, placePiece, clearLines, nextPiece, createPiece]);

  const handleRotate = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    
    const rotated = rotatePiece(currentPiece);
    if (!checkCollision(rotated)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, gameOver, isPaused, rotatePiece, checkCollision]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        movePiece(-1, 0);
        break;
      case 'ArrowRight':
        event.preventDefault();
        movePiece(1, 0);
        break;
      case 'ArrowDown':
        event.preventDefault();
        movePiece(0, 1);
        break;
      case 'ArrowUp':
      case ' ':
        event.preventDefault();
        handleRotate();
        break;
      case 'p':
      case 'P':
        event.preventDefault();
        setIsPaused(prev => !prev);
        break;
    }
  }, [movePiece, handleRotate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!currentPiece && !gameOver) {
      setCurrentPiece(createPiece());
      setNextPiece(createPiece());
    }
  }, [currentPiece, gameOver, createPiece]);

  useEffect(() => {
    if (linesCleared >= 20) {
      setGameWon(true);
      setGameOver(true);
    }
  }, [linesCleared]);

  useEffect(() => {
    setLevel(Math.floor(linesCleared / 5) + 1);
  }, [linesCleared]);

  useEffect(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    
    if (!gameOver && !isPaused) {
      const speed = Math.max(100, 1000 - (level - 1) * 100);
      gameLoopRef.current = setInterval(() => {
        movePiece(0, 1);
      }, speed);
    }
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameOver, isPaused, level, movePiece]);

  const resetGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill('')));
    setCurrentPiece(null);
    setNextPiece(null);
    setScore(0);
    setLinesCleared(0);
    setLevel(1);
    setGameOver(false);
    setGameWon(false);
    setIsPaused(false);
  };

  const handleComplete = () => {
    const levelBonus = level * 50;
    const lineBonus = linesCleared * 10;
    const totalPoints = score + levelBonus + lineBonus;
    onComplete(totalPoints);
  };

  const getCellStyle = (cellType: string) => {
    const piece = ecoTetriminoes.find(p => p.type === cellType);
    return piece ? piece.color : 'bg-gray-300';
  };

  const getCellIcon = (cellType: string) => {
    const piece = ecoTetriminoes.find(p => p.type === cellType);
    return piece ? piece.icon : '';
  };

  useEffect(() => {
    const boardEl = boardContainerRef.current;
    if (!boardEl) return;

    const resizeObserver = new ResizeObserver(() => {
      if (boardEl) {
        const newCellSize = boardEl.offsetWidth / BOARD_WIDTH;
        setCellSize(newCellSize);
      }
    });

    resizeObserver.observe(boardEl);
    return () => resizeObserver.disconnect();
  }, []);

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    // Add current piece to display
    if (currentPiece && !gameOver) {
      currentPiece.blocks.forEach(block => {
        if (block.y >= 0 && block.y < BOARD_HEIGHT && block.x >= 0 && block.x < BOARD_WIDTH) {
          displayBoard[block.y][block.x] = currentPiece.type;
        }
      });
    }
    
    return displayBoard.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={x}
            style={{ width: cellSize, height: cellSize, fontSize: cellSize / 2 }}
            className={`border border-gray-400 flex items-center justify-center ${
              cell ? getCellStyle(cell) : 'bg-gray-100'
            }`}
          >
            {cell && getCellIcon(cell)}
          </div>
        ))}
      </div>
    ));
  };

  if (gameWon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-300 shadow-2xl">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-green-700 mb-4">¡EcoTetris Completado!</h2>
              <div className="text-6xl mb-4">🌍♻️</div>
              <p className="text-xl text-gray-700 mb-4">
                ¡Limpiaste 20 líneas y salvaste el planeta!
              </p>
              <div className="bg-green-100 p-4 rounded-lg mb-6">
                <p className="text-green-800 font-semibold mb-2">
                  🌱 ¡Mensaje Ecológico!
                </p>
                <p className="text-green-700 text-sm">
                  Como en este juego, en la vida real también podemos "limpiar líneas" cuidando nuestro planeta. 
                  Cada acción cuenta: reciclar, usar energías renovables, ahorrar agua y cuidar la naturaleza. 
                  ¡Juntos podemos construir un futuro más verde y sostenible! 🌍💚
                </p>
              </div>
              <div className="space-y-3">
                <Button 
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg"
                >
                  ¡Completar! (+{score + level * 50 + linesCleared * 10} pts)
                </Button>
                <div className="space-x-4">
                  <Button 
                    onClick={resetGame}
                    variant="outline"
                    className="border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-full"
                  >
                    Jugar de nuevo
                  </Button>
                  <Button 
                    onClick={onBack}
                    variant="outline"
                    className="border-2 border-green-400 text-green-600 hover:bg-green-50 font-semibold py-3 px-6 rounded-full"
                  >
                    Volver al inicio
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <h1 className="text-2xl font-bold text-green-700">🌍 EcoTetris</h1>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsPaused(!isPaused)}
                  disabled={gameOver}
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={resetGame}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {gameOver && !gameWon && (
              <Card className="bg-red-100 border-2 border-red-300 mb-6">
                <CardContent className="p-4 text-center">
                  <h3 className="text-xl font-bold text-red-800 mb-2">¡Juego Terminado!</h3>
                  <p className="text-red-700 mb-4">¡La contaminación llegó al límite! Intenta de nuevo.</p>
                  <Button 
                    onClick={resetGame}
                    className="bg-gradient-to-r from-red-400 to-orange-400 hover:from-red-500 hover:to-orange-500 text-white font-semibold px-6 py-2 rounded-full"
                  >
                    Nuevo Juego
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Game Board */}
              <div className="lg:col-span-3">
                <Card className="bg-gray-50 border-2 border-gray-300">
                  <CardContent className="p-2 sm:p-4">
                    <div className="flex justify-center">
                      <div ref={boardContainerRef} className="w-full max-w-xs">
                        <div className="inline-block border-4 border-gray-600 bg-white">
                          {renderBoard()}
                        </div>
                      </div>
                    </div>
                    
                    {isPaused && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Card className="bg-white p-6 text-center">
                          <h3 className="text-xl font-bold mb-2">Juego Pausado</h3>
                          <Button onClick={() => setIsPaused(false)}>
                            Continuar
                          </Button>
                        </Card>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Mobile Controls */}
                <div className="mt-4 lg:hidden">
                  <Card className="bg-blue-50 border-2 border-blue-300">
                    <CardContent className="p-2">
                      <h4 className="font-bold text-blue-700 mb-2 text-center">Controles</h4>
                      <div className="flex justify-around items-center">
                        <Button onMouseDown={() => movePiece(-1, 0)} className="p-4 text-2xl rounded-full">←</Button>
                        <div className="flex flex-col gap-2">
                          <Button onMouseDown={handleRotate} className="p-4 text-2xl rounded-full">↑</Button>
                          <Button onMouseDown={() => movePiece(0, 1)} className="p-4 text-2xl rounded-full">↓</Button>
                        </div>
                        <Button onMouseDown={() => movePiece(1, 0)} className="p-4 text-2xl rounded-full">→</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Controls */}
                <Card className="mt-4 bg-blue-50 border-2 border-blue-300 hidden lg:block">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-blue-700 mb-2">🎮 Controles</h4>
                    <div className="text-sm text-blue-600 space-y-1">
                      <p>• ← → Mover pieza</p>
                      <p>• ↓ Caída rápida</p>
                      <p>• ↑ / Espacio: Rotar</p>
                      <p>• P: Pausar</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Side Panel */}
              <div className="space-y-4">
                {/* Score */}
                <Card className="bg-green-50 border-2 border-green-300">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-green-700 mb-2">📊 Puntuación</h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-green-600">Puntos: {score}</p>
                      <p className="text-blue-600">Líneas: {linesCleared}/20</p>
                      <p className="text-purple-600">Nivel: {level}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Piece */}
                {nextPiece && (
                  <Card className="bg-yellow-50 border-2 border-yellow-300">
                    <CardContent className="p-4">
                      <h4 className="font-bold text-yellow-700 mb-2">🔮 Siguiente</h4>
                      <div className="text-center">
                        <div className="text-3xl mb-2">{nextPiece.icon}</div>
                        <p className="text-xs text-yellow-600">{nextPiece.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Eco Tips */}
                <Card className="bg-amber-50 border-2 border-amber-300">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-amber-700 mb-2">🌱 EcoConsejos</h4>
                    <div className="text-xs text-amber-600 space-y-1">
                      <p>• Cada línea limpiada es como reciclar</p>
                      <p>• Las piezas representan elementos de la naturaleza</p>
                      <p>• ¡Organiza y cuida el planeta!</p>
                      <p>• Meta: Limpiar 20 líneas</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Piece Legend */}
                <Card className="bg-purple-50 border-2 border-purple-300">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-purple-700 mb-2">🧩 Elementos</h4>
                    <div className="space-y-1 text-xs">
                      {ecoTetriminoes.map((piece, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span>{piece.icon}</span>
                          <span className="text-purple-600">{piece.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EcoTetris;
