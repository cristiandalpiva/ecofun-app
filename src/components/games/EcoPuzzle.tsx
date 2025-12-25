
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shuffle, CheckCircle, Sparkles, Trophy, Volume2 } from "lucide-react";

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
  educationalTopic: string;
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
  const [isComplete, setIsComplete] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [correctPlacement, setCorrectPlacement] = useState<string | null>(null);

  // Text-to-speech function
  const readText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

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
      id: 'monkey',
      name: 'Mono Divertido',
      description: 'Un mono sosteniendo una cáscara de banana',
      url: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=600&h=600&fit=crop',
      aspectRatio: '1:1',
      educationalTopic: 'Aprende sobre los primates y su alimentación'
    },
    {
      id: 'penguins',
      name: 'Pingüinos Polares',
      description: 'Dos pingüinos en su hábitat natural',
      url: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=600&h=600&fit=crop',
      aspectRatio: '1:1',
      educationalTopic: 'Descubre cómo viven los pingüinos en el Polo Sur'
    },
    {
      id: 'whale',
      name: 'Ballena Saltarina',
      description: 'Una ballena jorobada saltando en el océano',
      url: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=600&h=600&fit=crop',
      aspectRatio: '1:1',
      educationalTopic: 'Las ballenas son mamíferos marinos gigantes'
    },
    {
      id: 'deer',
      name: 'Ciervos del Bosque',
      description: 'Dos ciervos junto a árboles y montañas',
      url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=480&h=600&fit=crop',
      aspectRatio: '4:5',
      educationalTopic: 'Los ciervos viven en bosques y se alimentan de plantas'
    },
    {
      id: 'animals',
      name: 'Antílope y Cebra',
      description: 'Antílope marrón y cebra en la sabana',
      url: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=480&h=600&fit=crop',
      aspectRatio: '4:5',
      educationalTopic: 'Animales africanos que viven en la sabana'
    },
    {
      id: 'kitten',
      name: 'Gatito Gris',
      description: 'Un adorable gatito gris atigrado',
      url: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600&h=600&fit=crop',
      aspectRatio: '1:1',
      educationalTopic: 'Los gatos son mascotas que necesitan cuidado y amor'
    },
    {
      id: 'bees',
      name: 'Abejas Trabajadoras',
      description: 'Abejas volando y polinizando',
      url: 'https://images.unsplash.com/photo-1498936178812-4b2e558d2937?w=600&h=600&fit=crop',
      aspectRatio: '1:1',
      educationalTopic: 'Las abejas son importantes para las plantas y las flores'
    },
    {
      id: 'mountains',
      name: 'Montañas Verdes',
      description: 'Vista aérea de montañas verdes',
      url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=600&fit=crop',
      aspectRatio: '1:1',
      educationalTopic: 'Las montañas son ecosistemas únicos con flora especial'
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

    const shuffledPieces = [...newPieces].sort(() => Math.random() - 0.5);
    
    setPieces(shuffledPieces);
    setIsComplete(false);
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(false);
    setShowCelebration(false);
    setCorrectPlacement(null);
  };

  const checkCompletion = () => {
    const lockedPieces = pieces.filter(p => p.isLocked);
    const totalPieces = selectedLevel?.totalPieces || 0;
    
    if (lockedPieces.length === totalPieces) {
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
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    const pieceId = e.dataTransfer.getData('text/plain');
    if (!pieceId || pieceId !== targetId) return;

    const draggedPiece = pieces.find(p => p.id === pieceId);
    if (!draggedPiece || draggedPiece.isLocked) return;

    const slot = document.querySelector(`[data-target="${targetId}"]`);
    if (!slot || slot.hasChildNodes()) return;

    setPieces(prev => prev.map(p => 
      p.id === pieceId ? { ...p, isLocked: true } : p
    ));
    
    setCorrectPlacement(pieceId);
    setMoves(moves + 1);
    
    setTimeout(() => {
      checkCompletion();
    }, 100);
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-cyan-100 p-2 sm:p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-4 mb-6 sm:mb-8">
            <Button onClick={onBack} variant="outline" className="text-gray-600 hover:text-gray-800 w-fit">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-emerald-700">🧩 Rompecabezas Verde</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => readText("Rompecabezas Verde. Elige tu nivel de dificultad")}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">Elige tu nivel de dificultad</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {puzzleConfigs.map((config) => (
              <Card 
                key={config.level}
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white/90 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-400"
                onClick={() => setSelectedLevel(config)}
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">{config.emoji}</div>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-emerald-800">
                      {config.name}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        readText(`${config.name}. ${config.rows} por ${config.cols}, ${config.totalPieces} piezas. ${config.points} puntos`);
                      }}
                      className="text-emerald-600 hover:text-emerald-800 p-1"
                    >
                      <Volume2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    {config.rows} × {config.cols} = {config.totalPieces} piezas
                  </p>
                  <Badge className={`${config.color} border text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2 mb-3 sm:mb-4`}>
                    {config.totalPieces} piezas
                  </Badge>
                  <div className="text-emerald-600 font-bold text-lg sm:text-xl">
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-cyan-100 p-2 sm:p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <Button onClick={() => setSelectedLevel(null)} variant="outline" className="text-gray-600 hover:text-gray-800 w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cambiar Nivel
            </Button>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-emerald-700">🖼️ Elige tu Imagen</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => readText(`Elige tu imagen. Nivel ${selectedLevel.name} con ${selectedLevel.totalPieces} piezas`)}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">Nivel: {selectedLevel.emoji} {selectedLevel.name} ({selectedLevel.totalPieces} piezas)</p>
            </div>
            <div className="w-full sm:w-20"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {availableImages.map((image) => (
              <Card 
                key={image.id}
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white/90 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-400"
                onClick={() => setSelectedImage(image)}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className={`${selectedLevel.level === 'hard' ? 'aspect-[4/5]' : 'aspect-square'} rounded-lg overflow-hidden border-2 border-emerald-200 mb-3 sm:mb-4`}>
                    <img 
                      src={image.url} 
                      alt={image.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-emerald-800 text-base sm:text-lg">
                      {image.name}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        readText(`${image.name}. ${image.description}. ${image.educationalTopic}`);
                      }}
                      className="text-emerald-600 hover:text-emerald-800 p-1"
                    >
                      <Volume2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-600 mb-2">
                    {image.description}
                  </p>
                  <p className="text-xs text-blue-600 italic">
                    💡 {image.educationalTopic}
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
  if (pieces.length === 0) {
    initializePuzzle();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg border border-gray-200 space-y-3 sm:space-y-0">
          <Button onClick={resetGame} variant="outline" className="text-gray-600 hover:text-gray-800 w-full sm:w-auto">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cambiar Imagen
          </Button>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <h1 className="text-lg sm:text-xl font-bold text-emerald-700">
                🧩 {selectedImage.name}
              </h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => readText(`Jugando ${selectedImage.name}. ${selectedLevel.name} con ${selectedLevel.totalPieces} piezas. Tiempo ${formatTime(timeElapsed)}, ${moves} movimientos`)}
                className="text-emerald-600 hover:text-emerald-800 p-1"
              >
                <Volume2 className="w-3 h-3" />
              </Button>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              {selectedLevel.emoji} {selectedLevel.name} - {selectedLevel.totalPieces} piezas
            </p>
          </div>
          <div className="text-center sm:text-right text-xs sm:text-sm">
            <div className="text-gray-500">⏱️ {formatTime(timeElapsed)}</div>
            <div className="text-emerald-600 font-medium">🎯 {moves} movimientos</div>
          </div>
        </div>

        {/* Celebration */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="bg-white border-4 border-emerald-400 shadow-2xl animate-scale-in max-w-sm w-full">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="text-4xl sm:text-6xl mb-4 animate-bounce">🎉</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-emerald-700 mb-2">
                  ¡Felicitaciones!
                </h2>
                <p className="text-sm sm:text-lg text-gray-600 mb-4">
                  Completaste el rompecabezas en {formatTime(timeElapsed)} con {moves} movimientos
                </p>
                <div className="flex items-center justify-center space-x-2 text-lg sm:text-2xl">
                  <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
                  <span className="font-bold text-emerald-600">+{selectedLevel.points} puntos</span>
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Game Layout - Responsive */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 items-center lg:items-start justify-center">
          {/* Piezas disponibles - left side */}
          <div className="order-1 lg:order-1 bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-6 shadow-2xl border-2 border-gray-300 w-full max-w-sm lg:max-w-xs">
            <h3 className="text-sm sm:text-lg font-semibold text-emerald-700 mb-3 sm:mb-4 text-center">
              🧩 Piezas disponibles ({pieces.filter(p => !p.isLocked).length})
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2 justify-items-center">
              {pieces.filter(p => !p.isLocked).map((piece) => (
                <div
                  key={`piece-${piece.id}`}
                  draggable={!piece.isLocked}
                  onDragStart={(e) => handleDragStart(e, piece)}
                  className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 cursor-move transition-all duration-200 hover:scale-110 border-2 border-emerald-300 rounded-md overflow-hidden shadow-lg hover:shadow-xl"
                  style={{
                    aspectRatio: selectedLevel.level === 'hard' ? '4/5' : '1'
                  }}
                >
                  <div 
                    className="w-full h-full"
                    style={getPieceStyle(piece, window.innerWidth < 640 ? 48 : window.innerWidth < 1024 ? 64 : 80)}
                  />
                </div>
              ))}
            </div>
            
            <Button 
              onClick={initializePuzzle} 
              className="mt-3 sm:mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg text-xs sm:text-sm"
              size="sm"
            >
              <Shuffle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Mezclar
            </Button>
          </div>

          {/* Tablero del rompecabezas - right side */}
          <div className="order-2 lg:order-2 bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-6 shadow-2xl border-2 border-gray-300">
            <div 
              className="grid gap-1 bg-gray-200 p-2 rounded-lg border-4 border-gray-400 mx-auto"
              style={{ 
                gridTemplateColumns: `repeat(${selectedLevel.cols}, 1fr)`,
                gridTemplateRows: `repeat(${selectedLevel.rows}, 1fr)`,
                width: window.innerWidth < 640 ? '280px' : window.innerWidth < 1024 ? '320px' : '400px',
                height: selectedLevel.level === 'hard' ? 
                  (window.innerWidth < 640 ? '224px' : window.innerWidth < 1024 ? '256px' : '320px') : 
                  (window.innerWidth < 640 ? '280px' : window.innerWidth < 1024 ? '320px' : '400px')
              }}
            >
              {Array.from({ length: selectedLevel.totalPieces }, (_, slotIndex) => {
                const pieceWidth = (window.innerWidth < 640 ? 280 : window.innerWidth < 1024 ? 320 : 400 - 16) / selectedLevel.cols;
                const pieceHeight = (selectedLevel.level === 'hard' ? 
                  (window.innerWidth < 640 ? 224 : window.innerWidth < 1024 ? 256 : 320) : 
                  (window.innerWidth < 640 ? 280 : window.innerWidth < 1024 ? 320 : 400) - 16) / selectedLevel.rows;
                
                const expectedRow = Math.floor(slotIndex / selectedLevel.cols);
                const expectedCol = slotIndex % selectedLevel.cols;
                const expectedId = `${expectedRow}-${expectedCol}`;
                const piece = pieces.find(p => p.id === expectedId && p.isLocked);
                
                return (
                  <div
                    key={`slot-${slotIndex}`}
                    data-target={expectedId}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, expectedId)}
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
                        <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-600 animate-bounce" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reference image */}
        <div className="mt-6 sm:mt-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
            <h4 className="text-base sm:text-lg font-medium text-gray-700">Imagen de referencia:</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => readText(`Imagen de referencia: ${selectedImage.name}. ${selectedImage.educationalTopic}`)}
              className="text-gray-600 hover:text-gray-800 p-1"
            >
              <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
          <div className={`mx-auto rounded-lg overflow-hidden border-4 border-emerald-300 shadow-lg ${
            selectedLevel.level === 'hard' ? 'aspect-[4/5] max-w-[160px] sm:max-w-[200px] lg:max-w-[240px]' : 'aspect-square max-w-[140px] sm:max-w-[180px] lg:max-w-[200px]'
          }`}>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.name}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <p className="text-xs sm:text-sm text-blue-600 mt-2 italic max-w-md mx-auto">
            💡 {selectedImage.educationalTopic}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EcoPuzzle;
