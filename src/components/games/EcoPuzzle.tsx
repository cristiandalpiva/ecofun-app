import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shuffle, CheckCircle, Sparkles, Trophy } from "lucide-react";

interface EcoPuzzleProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface PuzzleConfig {
  level: 'easy' | 'medium' | 'hard';
  name: string;
  rows: number;
  cols: number;
  totalPieces: number;
  points: number;
  emoji: string;
  color: string;
}

interface PuzzleImage {
  id: string;
  name: string;
  description: string;
  url: string;
  aspectRatio: string;
}

interface PuzzlePiece {
  id: number;
  correctPosition: number;
  currentPosition: number | null;
  imageUrl: string;
  row: number;
  col: number;
}

const EcoPuzzle = ({ onComplete, onBack }: EcoPuzzleProps) => {
  const [selectedLevel, setSelectedLevel] = useState<PuzzleConfig | null>(null);
  const [selectedImage, setSelectedImage] = useState<PuzzleImage | null>(null);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [boardPieces, setBoardPieces] = useState<(number | null)[]>([]);
  const [draggedPieceId, setDraggedPieceId] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const puzzleConfigs: PuzzleConfig[] = [
    {
      level: 'easy',
      name: 'Fácil',
      rows: 3,
      cols: 3,
      totalPieces: 9,
      points: 50,
      emoji: '🟢',
      color: 'bg-green-100 text-green-800 border-green-300'
    },
    {
      level: 'medium',
      name: 'Medio',
      rows: 4,
      cols: 4,
      totalPieces: 16,
      points: 75,
      emoji: '🟡',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300'
    },
    {
      level: 'hard',
      name: 'Difícil',
      rows: 4,
      cols: 5,
      totalPieces: 20,
      points: 100,
      emoji: '🔴',
      color: 'bg-red-100 text-red-800 border-red-300'
    }
  ];

  const puzzleImages: PuzzleImage[] = [
    {
      id: 'forest',
      name: 'Bosque Verde',
      description: 'Un hermoso bosque lleno de vida',
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&h=600&fit=crop',
      aspectRatio: '1:1'
    },
    {
      id: 'ocean',
      name: 'Océano Cristalino',
      description: 'Aguas azules del océano',
      url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&h=600&fit=crop',
      aspectRatio: '1:1'
    },
    {
      id: 'mountain',
      name: 'Montañas Verdes',
      description: 'Paisaje montañoso con vegetación',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
      aspectRatio: '1:1'
    },
    {
      id: 'deer',
      name: 'Ciervo en el Bosque',
      description: 'Un ciervo majestuoso en su hábitat',
      url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=480&h=600&fit=crop',
      aspectRatio: '4:5'
    },
    {
      id: 'whale',
      name: 'Ballena Saltando',
      description: 'Una ballena jorobada en el océano',
      url: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=480&h=600&fit=crop',
      aspectRatio: '4:5'
    }
  ];

  const getAvailableImages = () => {
    if (!selectedLevel) return [];
    
    if (selectedLevel.level === 'hard') {
      return puzzleImages.filter(img => img.aspectRatio === '4:5');
    }
    return puzzleImages.filter(img => img.aspectRatio === '1:1');
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !isComplete) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, isComplete]);

  const initializePuzzle = () => {
    if (!selectedLevel || !selectedImage) return;

    const newPieces: PuzzlePiece[] = [];
    const { rows, cols, totalPieces } = selectedLevel;

    // Create pieces in order
    for (let i = 0; i < totalPieces; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      
      newPieces.push({
        id: i,
        correctPosition: i,
        currentPosition: null,
        imageUrl: selectedImage.url,
        row,
        col
      });
    }

    // Shuffle pieces for display
    const shuffledPieces = [...newPieces];
    for (let i = shuffledPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPieces[i], shuffledPieces[j]] = [shuffledPieces[j], shuffledPieces[i]];
    }

    setPieces(shuffledPieces);
    setBoardPieces(Array(totalPieces).fill(null));
    setIsComplete(false);
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(false);
    setShowCelebration(false);

    console.log('Puzzle initialized with pieces:', shuffledPieces.map(p => ({ id: p.id, correctPosition: p.correctPosition })));
  };

  const checkCompletion = (newBoardPieces: (number | null)[]) => {
    const allPiecesPlaced = newBoardPieces.every(piece => piece !== null);
    const allPiecesCorrect = newBoardPieces.every((pieceId, boardIndex) => {
      return pieceId === boardIndex;
    });
    
    console.log('Checking completion:', { allPiecesPlaced, allPiecesCorrect });
    
    if (allPiecesPlaced && allPiecesCorrect && !isComplete) {
      setIsComplete(true);
      setGameStarted(false);
      setShowCelebration(true);
      
      setTimeout(() => {
        onComplete(selectedLevel?.points || 0);
      }, 3000);
    }
  };

  const handleDragStart = (e: React.DragEvent, pieceId: number) => {
    console.log('Drag start:', pieceId);
    setDraggedPieceId(pieceId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', pieceId.toString());
    if (!gameStarted) setGameStarted(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnBoard = (e: React.DragEvent, boardIndex: number) => {
    e.preventDefault();
    
    const pieceId = parseInt(e.dataTransfer.getData('text/plain'));
    console.log('Drop on board:', { pieceId, boardIndex });

    if (isNaN(pieceId)) return;

    const newBoardPieces = [...boardPieces];
    
    // If there's already a piece on the board at this position, return it to loose pieces
    if (newBoardPieces[boardIndex] !== null) {
      const existingPieceId = newBoardPieces[boardIndex]!;
      const existingPiece = {
        id: existingPieceId,
        correctPosition: existingPieceId,
        currentPosition: null,
        imageUrl: selectedImage!.url,
        row: Math.floor(existingPieceId / selectedLevel!.cols),
        col: existingPieceId % selectedLevel!.cols
      };
      setPieces(prev => [...prev, existingPiece]);
    }
    
    // Place the dragged piece on the board
    newBoardPieces[boardIndex] = pieceId;
    
    // Remove the piece from loose pieces
    setPieces(prev => prev.filter(p => p.id !== pieceId));
    
    setBoardPieces(newBoardPieces);
    setMoves(moves + 1);
    setDraggedPieceId(null);
    
    checkCompletion(newBoardPieces);
  };

  const handleDropOnPieces = (e: React.DragEvent) => {
    e.preventDefault();
    
    const pieceId = parseInt(e.dataTransfer.getData('text/plain'));
    console.log('Drop on pieces area:', pieceId);

    if (isNaN(pieceId)) return;

    // Find if the piece is currently on the board
    const pieceIndexInBoard = boardPieces.indexOf(pieceId);
    if (pieceIndexInBoard !== -1) {
      // Remove piece from board and add back to loose pieces
      const newBoardPieces = [...boardPieces];
      newBoardPieces[pieceIndexInBoard] = null;
      
      const draggedPieceData = {
        id: pieceId,
        correctPosition: pieceId,
        currentPosition: null,
        imageUrl: selectedImage!.url,
        row: Math.floor(pieceId / selectedLevel!.cols),
        col: pieceId % selectedLevel!.cols
      };
      
      setPieces(prev => [...prev, draggedPieceData]);
      setBoardPieces(newBoardPieces);
      setMoves(moves + 1);
    }
    
    setDraggedPieceId(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetGame = () => {
    setSelectedLevel(null);
    setSelectedImage(null);
    setPieces([]);
    setBoardPieces([]);
    setIsComplete(false);
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(false);
    setShowCelebration(false);
  };

  // Get piece style for loose pieces
  const getPieceStyle = (piece: PuzzlePiece) => {
    if (!selectedLevel) return {};
    
    const { rows, cols } = selectedLevel;
    const pieceSize = 80;
    
    return {
      backgroundImage: `url(${piece.imageUrl})`,
      backgroundSize: `${cols * pieceSize}px ${rows * pieceSize}px`,
      backgroundPosition: `-${piece.col * pieceSize}px -${piece.row * pieceSize}px`,
      backgroundRepeat: 'no-repeat'
    };
  };

  // Get piece style for board pieces
  const getBoardPieceStyle = (pieceId: number) => {
    if (!selectedLevel || !selectedImage) return {};
    
    const { rows, cols } = selectedLevel;
    const boardWidth = 400;
    const boardHeight = selectedLevel.level === 'hard' ? 320 : 400;
    const pieceWidth = boardWidth / cols;
    const pieceHeight = boardHeight / rows;
    
    // Calculate row and col from pieceId
    const row = Math.floor(pieceId / cols);
    const col = pieceId % cols;
    
    return {
      backgroundImage: `url(${selectedImage.url})`,
      backgroundSize: `${boardWidth}px ${boardHeight}px`,
      backgroundPosition: `-${col * pieceWidth}px -${row * pieceHeight}px`,
      backgroundRepeat: 'no-repeat'
    };
  };

  // Level selection screen
  if (!selectedLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-cyan-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button onClick={onBack} variant="outline" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-emerald-700">🧩 Rompecabezas Verde</h1>
              <p className="text-gray-600">Elige tu nivel de dificultad</p>
            </div>
            <div className="w-20"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {puzzleConfigs.map((config) => (
              <Card 
                key={config.level}
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white/90 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-400"
                onClick={() => setSelectedLevel(config)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{config.emoji}</div>
                  <h3 className="text-2xl font-bold text-emerald-800 mb-2">
                    {config.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {config.rows} × {config.cols} = {config.totalPieces} piezas
                  </p>
                  <Badge className={`${config.color} border text-lg px-4 py-2 mb-4`}>
                    {config.totalPieces} piezas
                  </Badge>
                  <div className="text-emerald-600 font-bold text-xl">
                    🏆 {config.points} puntos
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Image selection screen
  if (!selectedImage) {
    const availableImages = getAvailableImages();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-cyan-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button onClick={() => setSelectedLevel(null)} variant="outline" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cambiar Nivel
            </Button>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-emerald-700">🖼️ Elige tu Imagen</h1>
              <p className="text-gray-600">Nivel: {selectedLevel.emoji} {selectedLevel.name} ({selectedLevel.totalPieces} piezas)</p>
            </div>
            <div className="w-20"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableImages.map((image) => (
              <Card 
                key={image.id}
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white/90 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-400"
                onClick={() => setSelectedImage(image)}
              >
                <CardContent className="p-4">
                  <div className={`aspect-square ${selectedLevel.level === 'hard' ? 'aspect-[4/5]' : 'aspect-square'} rounded-lg overflow-hidden border-2 border-emerald-200 mb-4`}>
                    <img 
                      src={image.url} 
                      alt={image.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <h3 className="font-bold text-emerald-800 text-lg mb-2">
                    {image.name}
                  </h3>
                  <p className="text-sm text-emerald-600">
                    {image.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (pieces.length === 0) {
    initializePuzzle();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <Button onClick={resetGame} variant="outline" className="text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cambiar Imagen
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-emerald-700">
              🧩 {selectedImage.name}
            </h1>
            <p className="text-sm text-gray-600">
              {selectedLevel.emoji} {selectedLevel.name} - {selectedLevel.totalPieces} piezas
            </p>
          </div>
          <div className="text-right text-sm">
            <div className="text-gray-500">⏱️ {formatTime(timeElapsed)}</div>
            <div className="text-emerald-600 font-medium">🎯 {moves} movimientos</div>
          </div>
        </div>

        {/* Celebration */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <Card className="bg-white border-4 border-emerald-400 shadow-2xl animate-scale-in">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <h2 className="text-3xl font-bold text-emerald-700 mb-2">
                  ¡Felicitaciones!
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  Completaste el rompecabezas en {formatTime(timeElapsed)} con {moves} movimientos
                </p>
                <div className="flex items-center justify-center space-x-2 text-2xl">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                  <span className="font-bold text-emerald-600">+{selectedLevel.points} puntos</span>
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Game layout */}
        <div className="flex justify-center">
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 border-gray-300" 
               style={{ width: '900px', height: '650px' }}>
            
            {/* Central board */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-lg border-4 border-gray-400 shadow-inner"
                 style={{ width: '400px', height: selectedLevel.level === 'hard' ? '320px' : '400px' }}>
              <div 
                className="grid gap-1 w-full h-full p-2"
                style={{ 
                  gridTemplateColumns: `repeat(${selectedLevel.cols}, 1fr)`,
                  gridTemplateRows: `repeat(${selectedLevel.rows}, 1fr)`
                }}
              >
                {Array.from({ length: selectedLevel.totalPieces }, (_, boardIndex) => {
                  const pieceId = boardPieces[boardIndex];
                  
                  return (
                    <div
                      key={`board-${boardIndex}`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDropOnBoard(e, boardIndex)}
                      className={`transition-all duration-200 overflow-hidden rounded-md ${
                        pieceId !== null
                          ? 'shadow-md border-2 border-emerald-300'
                          : 'border-2 border-dashed border-gray-400 hover:border-emerald-300 hover:bg-emerald-50/30'
                      } ${isComplete ? 'animate-pulse' : ''}`}
                      style={{ aspectRatio: selectedLevel.level === 'hard' ? '4/5' : '1' }}
                    >
                      {pieceId !== null && (
                        <div 
                          className="w-full h-full cursor-move"
                          style={getBoardPieceStyle(pieceId)}
                          draggable
                          onDragStart={(e) => handleDragStart(e, pieceId)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scattered pieces around */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="w-full h-full relative pointer-events-auto"
                onDragOver={handleDragOver}
                onDrop={handleDropOnPieces}
              >
                {pieces.map((piece, index) => {
                  // Position pieces around the board
                  const angle = (index / pieces.length) * 2 * Math.PI;
                  const radius = 280;
                  const x = 450 + radius * Math.cos(angle) - 40;
                  const y = 325 + radius * Math.sin(angle) - 40;
                  
                  return (
                    <div
                      key={`piece-${piece.id}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, piece.id)}
                      className={`absolute w-20 h-20 cursor-move transition-all duration-200 hover:scale-110 hover:z-10 border-2 border-emerald-300 rounded-md overflow-hidden shadow-lg hover:shadow-xl ${
                        draggedPieceId === piece.id ? 'opacity-50 scale-95' : ''
                      }`}
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        transform: `rotate(${Math.random() * 60 - 30}deg)`,
                        aspectRatio: selectedLevel.level === 'hard' ? '4/5' : '1'
                      }}
                    >
                      <div 
                        className="w-full h-full"
                        style={getPieceStyle(piece)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shuffle button */}
            <Button 
              onClick={initializePuzzle} 
              className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg"
              size="sm"
            >
              <Shuffle className="w-4 h-4 mr-1" />
              Mezclar
            </Button>

            {/* Remaining pieces counter */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border">
              <span className="text-sm font-medium text-emerald-700">
                🧩 {pieces.length} piezas restantes
              </span>
            </div>
          </div>
        </div>

        {/* Reference image */}
        <div className="mt-8 text-center">
          <h4 className="text-lg font-medium text-gray-700 mb-4">Imagen de referencia:</h4>
          <div className={`mx-auto rounded-lg overflow-hidden border-4 border-emerald-300 shadow-lg ${
            selectedLevel.level === 'hard' ? 'aspect-[4/5] max-w-[240px]' : 'aspect-square max-w-[200px]'
          }`}>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.name}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoPuzzle;
