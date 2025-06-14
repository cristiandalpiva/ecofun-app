
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shuffle, RotateCw, CheckCircle } from "lucide-react";

interface EcoPuzzleProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

const EcoPuzzle = ({ onComplete, onBack }: EcoPuzzleProps) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [pieces, setPieces] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);

  const puzzles = [
    {
      id: 0,
      name: "Granja Divertida",
      description: "Animales felices en la granja",
      image: "🐷🐄🐔🌾🚜🏚️🦆🐑🌻",
      difficulty: "Fácil",
      gridSize: 3,
      points: 30
    },
    {
      id: 1,
      name: "Jardín de Mariposas",
      description: "Mariposas coloridas en el jardín",
      image: "🦋🌺🌻🌷🦋🌸🌼🌹🦋",
      difficulty: "Fácil",
      gridSize: 3,
      points: 35
    },
    {
      id: 2,
      name: "Fiesta de Frutas",
      description: "Deliciosas frutas de colores",
      image: "🍎🍊🍌🍓🍇🥝🍑🍍🥭",
      difficulty: "Medio",
      gridSize: 3,
      points: 40
    },
    {
      id: 3,
      name: "Safari Aventura",
      description: "Animales salvajes africanos",
      image: "🦁🌍🦒🐘🦓🌳🦏🦌🦮",
      difficulty: "Medio",
      gridSize: 3,
      points: 45
    },
    {
      id: 4,
      name: "Océano Mágico",
      description: "Criaturas marinas fascinantes",
      image: "🐠🌊🐙🦈🐚🏝️🦀🌺🐢",
      difficulty: "Medio",
      gridSize: 3,
      points: 50
    },
    {
      id: 5,
      name: "Bosque Encantado",
      description: "Bosque lleno de vida y magia",
      image: "🌲🦋🌸🐰🌿🍄🦜🌺🐿️",
      difficulty: "Difícil",
      gridSize: 3,
      points: 55
    },
    {
      id: 6,
      name: "Parque de Diversiones",
      description: "Día de aventura al aire libre",
      image: "🌈☀️🌳🦜🌸🏔️🦋🌻🎈",
      difficulty: "Difícil",
      gridSize: 4,
      points: 70
    },
    {
      id: 7,
      name: "Campamento Estrellado",
      description: "Noche mágica bajo las estrellas",
      image: "⭐🏕️🌙🔥🦉🌲🎒🗻✨🌌🚁🎁🌠🎭🎪🎨",
      difficulty: "Difícil",
      gridSize: 4,
      points: 80
    }
  ];

  const currentPuzzleData = puzzles[currentPuzzle];
  const gridSize = currentPuzzleData.gridSize;
  const totalPieces = gridSize * gridSize;

  useEffect(() => {
    shufflePuzzle();
  }, [currentPuzzle]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !isComplete) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, isComplete]);

  const shufflePuzzle = () => {
    const newPieces = Array.from({ length: totalPieces }, (_, i) => i);
    // Shuffle the array
    for (let i = newPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPieces[i], newPieces[j]] = [newPieces[j], newPieces[i]];
    }
    setPieces(newPieces);
    setIsComplete(false);
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(false);
  };

  const checkCompletion = (newPieces: number[]) => {
    const completed = newPieces.every((piece, index) => piece === index);
    if (completed && !isComplete) {
      setIsComplete(true);
      setGameStarted(false);
      setTimeout(() => {
        if (currentPuzzle < puzzles.length - 1) {
          setCurrentPuzzle(currentPuzzle + 1);
        } else {
          const totalPoints = puzzles.reduce((sum, puzzle) => sum + puzzle.points, 0);
          onComplete(totalPoints);
        }
      }, 2000);
    }
  };

  const handlePieceClick = (index: number) => {
    if (!gameStarted) setGameStarted(true);
    
    const emptyIndex = pieces.indexOf(totalPieces - 1);
    const canMove = (
      (Math.abs(index - emptyIndex) === 1 && Math.floor(index / gridSize) === Math.floor(emptyIndex / gridSize)) ||
      Math.abs(index - emptyIndex) === gridSize
    );

    if (canMove) {
      const newPieces = [...pieces];
      [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
      setPieces(newPieces);
      setMoves(moves + 1);
      checkCompletion(newPieces);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedPiece(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedPiece === null) return;

    if (!gameStarted) setGameStarted(true);

    const emptyIndex = pieces.indexOf(totalPieces - 1);
    
    // Check if we're dropping on the empty space
    if (dropIndex === emptyIndex) {
      // Check if the dragged piece is adjacent to empty space
      const canMove = (
        (Math.abs(draggedPiece - emptyIndex) === 1 && Math.floor(draggedPiece / gridSize) === Math.floor(emptyIndex / gridSize)) ||
        Math.abs(draggedPiece - emptyIndex) === gridSize
      );

      if (canMove) {
        const newPieces = [...pieces];
        [newPieces[draggedPiece], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[draggedPiece]];
        setPieces(newPieces);
        setMoves(moves + 1);
        checkCompletion(newPieces);
      }
    }

    setDraggedPiece(null);
  };

  const getPieceContent = (pieceNumber: number) => {
    if (pieceNumber === totalPieces - 1) return "";
    const imageArray = currentPuzzleData.image.split('');
    return imageArray[pieceNumber] || "🌿";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-green-100 text-green-800 border-green-300";
      case "Medio": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Difícil": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-cyan-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-emerald-700">🧩 Puzzle Verde</h1>
            <p className="text-sm text-gray-600">Rompecabezas {currentPuzzle + 1} de {puzzles.length}</p>
          </div>
          <div className="text-right text-sm">
            <div className="text-gray-500">Tiempo: {formatTime(timeElapsed)}</div>
            <div className="text-emerald-600 font-medium">Movimientos: {moves}</div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={((currentPuzzle + (isComplete ? 1 : 0)) / puzzles.length) * 100} className="h-2" />
          <p className="text-xs text-gray-500 mt-1 text-center">
            Progreso general: {currentPuzzle + (isComplete ? 1 : 0)}/{puzzles.length} puzzles completados
          </p>
        </div>

        {/* Puzzle Info */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-lg mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">{currentPuzzleData.name}</h2>
                <p className="text-sm text-gray-600">{currentPuzzleData.description}</p>
              </div>
              <div className="text-right">
                <Badge className={`${getDifficultyColor(currentPuzzleData.difficulty)} border text-xs mb-1`}>
                  {currentPuzzleData.difficulty}
                </Badge>
                <div className="text-xs text-emerald-600 font-medium">
                  +{currentPuzzleData.points} pts
                </div>
              </div>
            </div>

            {isComplete && (
              <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">
                    ¡Puzzle completado! 🎉 +{currentPuzzleData.points} puntos
                  </span>
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <Button
                onClick={shufflePuzzle}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <Shuffle className="w-4 h-4" />
                <span>Mezclar</span>
              </Button>
              <Button
                onClick={() => setCurrentPuzzle((currentPuzzle + 1) % puzzles.length)}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
                disabled={currentPuzzle === puzzles.length - 1}
              >
                <RotateCw className="w-4 h-4" />
                <span>Siguiente</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Puzzle Grid */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-xl">
          <CardContent className="p-4">
            <div 
              className={`grid gap-2 mx-auto max-w-sm`}
              style={{ 
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                aspectRatio: '1'
              }}
            >
              {pieces.map((piece, index) => (
                <div
                  key={index}
                  draggable={piece !== totalPieces - 1 && !isComplete}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  onClick={() => handlePieceClick(index)}
                  className={`
                    aspect-square rounded-lg border-2 transition-all duration-200 text-2xl sm:text-3xl font-bold
                    flex items-center justify-center cursor-pointer select-none
                    ${piece === totalPieces - 1 
                      ? 'bg-gray-100 border-gray-300' 
                      : 'bg-gradient-to-br from-emerald-50 to-cyan-50 border-emerald-300 hover:border-emerald-500 hover:scale-105 shadow-md hover:shadow-lg'
                    }
                    ${isComplete ? 'animate-pulse' : ''}
                    ${draggedPiece === index ? 'opacity-50 scale-95' : ''}
                  `}
                >
                  {getPieceContent(piece)}
                </div>
              ))}
            </div>

            {!gameStarted && !isComplete && (
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  💡 Arrastra las piezas al espacio vacío o haz clic en las piezas adyacentes
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 shadow-lg mt-4">
          <CardContent className="p-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Vista previa:</h3>
            <div 
              className={`grid gap-1 mx-auto max-w-24`}
              style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
            >
              {Array.from({ length: totalPieces - 1 }, (_, i) => (
                <div key={i} className="aspect-square bg-emerald-50 border border-emerald-200 rounded text-xs flex items-center justify-center">
                  {getPieceContent(i)}
                </div>
              ))}
              <div className="aspect-square bg-gray-100 border border-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EcoPuzzle;
