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
  id: string;
  row: number;
  col: number;
  imageUrl: string;
  isLocked: boolean;
}

const EcoPuzzle = ({ onComplete, onBack }: EcoPuzzleProps) => {
  const [selectedLevel, setSelectedLevel] = useState<PuzzleConfig | null>(null);
  const [selectedImage, setSelectedImage] = useState<PuzzleImage | null>(null);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [slots, setSlots] = useState<(PuzzlePiece | null)[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [correctPlacement, setCorrectPlacement] = useState<string | null>(null);

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

  useEffect(() => {
    if (correctPlacement) {
      const timer = setTimeout(() => {
        setCorrectPlacement(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [correctPlacement]);

  const initializePuzzle = () => {
    if (!selectedLevel || !selectedImage) return;

    const { rows, cols } = selectedLevel;
    const newPieces: PuzzlePiece[] = [];

    // Create all pieces
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newPieces.push({
          id: `${row}-${col}`,
          row,
          col,
          imageUrl: selectedImage.url,
          isLocked: false
        });
      }
    }

    // Shuffle pieces
    const shuffledPieces = [...newPieces].sort(() => Math.random() - 0.5);
    
    setPieces(shuffledPieces);
    setSlots(Array(selectedLevel.totalPieces).fill(null));
    setIsComplete(false);
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(false);
    setShowCelebration(false);
    setCorrectPlacement(null);

    console.log('Puzzle initialized with pieces:', newPieces.map(p => p.id));
  };

  const checkCompletion = () => {
    const allPiecesPlaced = slots.every(slot => slot !== null);
    
    if (allPiecesPlaced && !isComplete) {
      setIsComplete(true);
      setGameStarted(false);
      setShowCelebration(true);
      
      setTimeout(() => {
        onComplete(selectedLevel?.points || 0);
      }, 3000);
    }
  };

  const handleDragStart = (e: React.DragEvent, piece: PuzzlePiece) => {
    if (piece.isLocked) return;
    e.dataTransfer.setData('text/plain', piece.id);
    if (!gameStarted) setGameStarted(true);
    console.log('Drag start:', piece.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    
    const pieceId = e.dataTransfer.getData('text/plain');
    if (!pieceId) return;

    // Find the piece being dragged
    const draggedPiece = pieces.find(p => p.id === pieceId);
    if (!draggedPiece || draggedPiece.isLocked) return;

    const expectedRow = Math.floor(slotIndex / selectedLevel!.cols);
    const expectedCol = slotIndex % selectedLevel!.cols;
    const expectedId = `${expectedRow}-${expectedCol}`;
    
    console.log('Drop attempt:', { 
      pieceId, 
      slotIndex, 
      expectedId,
      isCorrect: pieceId === expectedId,
      slotEmpty: slots[slotIndex] === null
    });

    // Check if the piece is being placed in its correct position and slot is empty
    if (pieceId === expectedId && slots[slotIndex] === null) {
      // Lock the piece
      const lockedPiece = { ...draggedPiece, isLocked: true };
      
      // Update slots
      const newSlots = [...slots];
      newSlots[slotIndex] = lockedPiece;
      setSlots(newSlots);
      
      // Remove from pieces (move it to slot)
      setPieces(prev => prev.filter(p => p.id !== pieceId));
      
      // Show correct placement effect
      setCorrectPlacement(pieceId);
      
      setMoves(moves + 1);
      
      // Check completion
      setTimeout(() => {
        checkCompletion();
      }, 100);
    }
  };

  const getPieceStyle = (piece: PuzzlePiece, size: number) => {
    if (!selectedLevel) return {};
    
    const { rows, cols } = selectedLevel;
    
    return {
      backgroundImage: `url(${piece.imageUrl})`,
      backgroundSize: `${cols * size}px ${rows * size}px`,
      backgroundPosition: `-${piece.col * size}px -${piece.row * size}px`,
      backgroundRepeat: 'no-repeat'
    };
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
    setSlots([]);
    setIsComplete(false);
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(false);
    setShowCelebration(false);
    setCorrectPlacement(null);
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

  // Initialize puzzle if needed
  if (pieces.length === 0 && slots.every(s => s === null)) {
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

        {/* Game Board */}
        <div className="flex flex-col items-center space-y-8">
          {/* Puzzle Board */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-2 border-gray-300">
            <div 
              className="grid gap-1 bg-gray-200 p-2 rounded-lg border-4 border-gray-400"
              style={{ 
                gridTemplateColumns: `repeat(${selectedLevel.cols}, 1fr)`,
                gridTemplateRows: `repeat(${selectedLevel.rows}, 1fr)`,
                width: '400px',
                height: selectedLevel.level === 'hard' ? '320px' : '400px'
              }}
            >
              {Array.from({ length: selectedLevel.totalPieces }, (_, slotIndex) => {
                const piece = slots[slotIndex];
                const pieceWidth = (400 - 16) / selectedLevel.cols;
                const pieceHeight = (selectedLevel.level === 'hard' ? 320 : 400 - 16) / selectedLevel.rows;
                
                return (
                  <div
                    key={`slot-${slotIndex}`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, slotIndex)}
                    className={`relative transition-all duration-200 overflow-hidden rounded-md ${
                      piece
                        ? `shadow-md border-2 ${correctPlacement === piece.id ? 'border-green-400 animate-pulse bg-green-100' : 'border-emerald-500'}`
                        : 'border-2 border-dashed border-gray-400 hover:border-emerald-300 hover:bg-emerald-50/30 bg-gray-100'
                    } ${isComplete ? 'animate-pulse' : ''}`}
                    style={{ 
                      width: `${pieceWidth}px`,
                      height: `${pieceHeight}px`
                    }}
                  >
                    {piece && (
                      <div 
                        className="w-full h-full"
                        style={getPieceStyle(piece, pieceWidth)}
                      />
                    )}
                    {correctPlacement === piece?.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-green-400/20 rounded-md">
                        <CheckCircle className="w-8 h-8 text-green-600 animate-bounce" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Shuffle button */}
            <Button 
              onClick={initializePuzzle} 
              className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg"
              size="sm"
            >
              <Shuffle className="w-4 h-4 mr-1" />
              Mezclar
            </Button>
          </div>

          {/* Loose Pieces */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-2 border-gray-300 max-w-4xl">
            <h3 className="text-lg font-semibold text-emerald-700 mb-4 text-center">
              🧩 Piezas disponibles ({pieces.length})
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {pieces.map((piece) => (
                <div
                  key={`piece-${piece.id}`}
                  draggable={!piece.isLocked}
                  onDragStart={(e) => handleDragStart(e, piece)}
                  className={`w-20 h-20 cursor-move transition-all duration-200 hover:scale-110 border-2 border-emerald-300 rounded-md overflow-hidden shadow-lg hover:shadow-xl ${
                    piece.isLocked ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  style={{
                    aspectRatio: selectedLevel.level === 'hard' ? '4/5' : '1'
                  }}
                >
                  <div 
                    className="w-full h-full"
                    style={getPieceStyle(piece, 80)}
                  />
                </div>
              ))}
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
