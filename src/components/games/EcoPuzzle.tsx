
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shuffle, RotateCw, CheckCircle, Eye, EyeOff, Grid3X3, Grid2X2, List } from "lucide-react";

interface EcoPuzzleProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

const EcoPuzzle = ({ onComplete, onBack }: EcoPuzzleProps) => {
  const [selectedPuzzle, setSelectedPuzzle] = useState<number | null>(null);
  const [pieces, setPieces] = useState<number[]>([]);
  const [boardPieces, setBoardPieces] = useState<(number | null)[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const puzzles = [
    {
      id: 0,
      name: "Gato Dormilón",
      description: "Un adorable gatito durmiendo plácidamente en un cojín colorido.",
      educationalContent: "Los gatos duermen entre 12-16 horas al día porque son cazadores naturales que necesitan conservar energía. En la naturaleza, esto les ayuda a mantener el equilibrio del ecosistema controlando poblaciones de roedores.",
      completionMessage: "¡Excelente! Los gatos como este ayudan a mantener el equilibrio natural cazando ratones y otros pequeños animales.",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop",
      difficulty: "Fácil",
      gridSize: 3,
      points: 50
    },
    {
      id: 1,
      name: "Cachorro Juguetón",
      description: "Un tierno cachorro de labrador jugando felizmente en el jardín.",
      educationalContent: "Los perros son compañeros leales que también ayudan en la conservación. Algunos perros especiales trabajan detectando especies en peligro de extinción y ayudando a los científicos a proteger la vida silvestre.",
      completionMessage: "¡Fantástico! Los perros pueden ser grandes aliados en la protección del medio ambiente cuando son entrenados adecuadamente.",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
      difficulty: "Fácil",
      gridSize: 3,
      points: 50
    },
    {
      id: 2,
      name: "Panda Gigante",
      description: "Un hermoso panda gigante comiendo bambú en su hábitat natural.",
      educationalContent: "Los pandas gigantes son una especie protegida que come principalmente bambú. Gracias a los esfuerzos de conservación, su población ha aumentado de 1,000 a más de 1,800 pandas en vida silvestre.",
      completionMessage: "¡Increíble! Los pandas como este han sido salvados de la extinción gracias a programas de conservación y protección de su hábitat.",
      image: "https://images.unsplash.com/photo-1539685043687-c946862e8b8b?w=400&h=400&fit=crop",
      difficulty: "Fácil",
      gridSize: 3,
      points: 50
    },
    {
      id: 3,
      name: "Mariposas Coloridas",
      description: "Hermosas mariposas de colores brillantes volando entre flores silvestres.",
      educationalContent: "Las mariposas son polinizadores esenciales que ayudan a las plantas a reproducirse. Una sola mariposa puede visitar hasta 1,000 flores en un día, transportando polen y ayudando a crear nuevas plantas.",
      completionMessage: "¡Perfecto! Las mariposas que acabas de completar son pequeñas trabajadoras que mantienen nuestros jardines y bosques llenos de flores.",
      image: "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=400&h=400&fit=crop",
      difficulty: "Medio",
      gridSize: 4,
      points: 75
    },
    {
      id: 4,
      name: "Tortugas Marinas",
      description: "Majestuosas tortugas marinas nadando en aguas cristalinas del océano.",
      educationalContent: "Las tortugas marinas han existido por más de 100 millones de años. Ayudan a mantener los arrecifes de coral saludables y las praderas marinas equilibradas, pero necesitan playas limpias para poner sus huevos.",
      completionMessage: "¡Genial! Las tortugas marinas como estas son guardianas de los océanos, pero necesitan nuestro cuidado para sobrevivir.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
      difficulty: "Medio",
      gridSize: 4,
      points: 75
    },
    {
      id: 5,
      name: "Jardín de Girasoles",
      description: "Un campo dorado lleno de girasoles grandes y brillantes mirando hacia el sol.",
      educationalContent: "Los girasoles siempre giran para seguir al sol durante el día. Sus semillas alimentan a muchos pájaros y sus raíces ayudan a limpiar el suelo de contaminantes. ¡Un girasol puede producir hasta 2,000 semillas!",
      completionMessage: "¡Excelente trabajo! Los girasoles no solo son hermosos, también limpian el ambiente y alimentan a muchos animales.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      difficulty: "Medio",
      gridSize: 4,
      points: 75
    },
    {
      id: 6,
      name: "Familia de Elefantes",
      description: "Una hermosa familia de elefantes caminando juntos por la sabana africana.",
      educationalContent: "Los elefantes son arquitectos de la naturaleza. Crean caminos que otros animales usan, dispersan semillas en sus deposiciones creando nuevos bosques, y excavan pozos de agua que salvan vidas durante las sequías.",
      completionMessage: "¡Increíble! Los elefantes como estos son fundamentales para mantener el equilibrio en su hábitat y ayudar a que crezcan nuevas plantas.",
      image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=400&h=400&fit=crop",
      difficulty: "Difícil",
      gridSize: 5,
      points: 100
    },
    {
      id: 7,
      name: "Pingüinos en la Antártida",
      description: "Adorables pingüinos emperadores cuidando a sus crías en el hielo antártico.",
      educationalContent: "Los pingüinos emperadores son termómetros vivientes del cambio climático. Pueden bucear hasta 500 metros de profundidad y aguantar la respiración por 20 minutos. Su supervivencia depende del hielo marino estable.",
      completionMessage: "¡Fantástico! Los pingüinos que acabas de armar nos recuerdan la importancia de cuidar los polos y luchar contra el cambio climático.",
      image: "https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=400&h=400&fit=crop",
      difficulty: "Difícil",
      gridSize: 5,
      points: 100
    }
  ];

  const currentPuzzleData = selectedPuzzle !== null ? puzzles[selectedPuzzle] : null;
  const gridSize = currentPuzzleData?.gridSize || 3;
  const totalPieces = gridSize * gridSize;

  useEffect(() => {
    if (selectedPuzzle !== null) {
      initializePuzzle();
    }
  }, [selectedPuzzle]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !isComplete && selectedPuzzle !== null) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, isComplete, selectedPuzzle]);

  const initializePuzzle = () => {
    const shuffledPieces = Array.from({ length: totalPieces }, (_, i) => i);
    // Shuffle the pieces
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
    setShowPreview(false);
    setDraggedOverIndex(null);
  };

  const checkCompletion = (newBoardPieces: (number | null)[]) => {
    // Check if ALL pieces are placed AND in correct positions
    const allPiecesPlaced = newBoardPieces.every(piece => piece !== null);
    const allPiecesCorrect = newBoardPieces.every((piece, index) => piece === index);
    
    if (allPiecesPlaced && allPiecesCorrect && !isComplete) {
      setIsComplete(true);
      setGameStarted(false);
      setTimeout(() => {
        onComplete(currentPuzzleData?.points || 0);
      }, 3000);
    }
  };

  const handleDragStart = (e: React.DragEvent, pieceNumber: number) => {
    setDraggedPiece(pieceNumber);
    e.dataTransfer.effectAllowed = 'move';
    if (!gameStarted) setGameStarted(true);
  };

  const handleDragOver = (e: React.DragEvent, boardIndex: number) => {
    e.preventDefault();
    // Only allow drop if the piece belongs to this position
    if (draggedPiece === boardIndex) {
      e.dataTransfer.dropEffect = 'move';
      setDraggedOverIndex(boardIndex);
    } else {
      e.dataTransfer.dropEffect = 'none';
      setDraggedOverIndex(null);
    }
  };

  const handleDragLeave = () => {
    setDraggedOverIndex(null);
  };

  const handleDropOnBoard = (e: React.DragEvent, boardIndex: number) => {
    e.preventDefault();
    setDraggedOverIndex(null);
    
    if (draggedPiece === null) return;

    // Only allow dropping if the piece matches the correct position
    if (draggedPiece !== boardIndex) {
      setDraggedPiece(null);
      return;
    }

    const newBoardPieces = [...boardPieces];
    const newPieces = pieces.filter(p => p !== draggedPiece);
    
    // If there's already a piece in this board position, return it to the pieces area
    if (newBoardPieces[boardIndex] !== null) {
      newPieces.push(newBoardPieces[boardIndex] as number);
    }
    
    newBoardPieces[boardIndex] = draggedPiece;
    
    setBoardPieces(newBoardPieces);
    setPieces(newPieces);
    setMoves(moves + 1);
    setDraggedPiece(null);
    
    checkCompletion(newBoardPieces);
  };

  const handleDropOnPieces = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedPiece === null) return;

    // If dragging from board back to pieces area
    const pieceIndexInBoard = boardPieces.indexOf(draggedPiece);
    if (pieceIndexInBoard !== -1) {
      const newBoardPieces = [...boardPieces];
      const newPieces = [...pieces, draggedPiece];
      
      newBoardPieces[pieceIndexInBoard] = null;
      
      setBoardPieces(newBoardPieces);
      setPieces(newPieces);
      setMoves(moves + 1);
    }
    
    setDraggedPiece(null);
  };

  const getPieceStyle = (pieceNumber: number) => {
    if (!currentPuzzleData) return {};
    
    const row = Math.floor(pieceNumber / gridSize);
    const col = pieceNumber % gridSize;
    const pieceSize = 100 / gridSize;
    
    return {
      backgroundImage: `url(${currentPuzzleData.image})`,
      backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
      backgroundPosition: `-${col * pieceSize}% -${row * pieceSize}%`,
      backgroundRepeat: 'no-repeat',
    };
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

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return <Grid2X2 className="w-4 h-4" />;
      case "Medio": return <Grid3X3 className="w-4 h-4" />;
      case "Difícil": return <List className="w-4 h-4" />;
      default: return <Grid2X2 className="w-4 h-4" />;
    }
  };

  const getCompletionPercentage = () => {
    const placedPieces = boardPieces.filter(piece => piece !== null).length;
    return Math.round((placedPieces / totalPieces) * 100);
  };

  // If no puzzle is selected, show puzzle selection screen
  if (selectedPuzzle === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-cyan-100 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button onClick={onBack} variant="outline" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-emerald-700">🧩 Elige tu Puzzle Verde</h1>
              <p className="text-sm text-gray-600">Selecciona el rompecabezas que quieres resolver</p>
            </div>
            <div className="w-20"></div>
          </div>

          {/* Puzzle Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {puzzles.map((puzzle) => (
              <Card 
                key={puzzle.id}
                className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white/90 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-400"
                onClick={() => setSelectedPuzzle(puzzle.id)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Image Preview */}
                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-emerald-200">
                      <img 
                        src={puzzle.image} 
                        alt={puzzle.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Puzzle Info */}
                    <div>
                      <h3 className="font-bold text-emerald-800 text-lg mb-1">
                        {puzzle.name}
                      </h3>
                      <p className="text-sm text-emerald-600 leading-relaxed mb-3">
                        {puzzle.description}
                      </p>
                    </div>

                    {/* Difficulty and Stats */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge 
                          className={`${getDifficultyColor(puzzle.difficulty)} border text-xs flex items-center space-x-1`}
                        >
                          {getDifficultyIcon(puzzle.difficulty)}
                          <span>{puzzle.difficulty}</span>
                        </Badge>
                        <span className="text-xs text-emerald-600 font-semibold">
                          🏆 {puzzle.points} pts
                        </span>
                      </div>
                      
                      <div className="text-center">
                        <span className="text-xs text-gray-600">
                          {puzzle.gridSize}×{puzzle.gridSize} piezas ({puzzle.gridSize * puzzle.gridSize} total)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Game view
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-cyan-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => setSelectedPuzzle(null)} variant="outline" className="text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cambiar Puzzle
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-emerald-700">🧩 {currentPuzzleData?.name}</h1>
            <p className="text-sm text-gray-600">{currentPuzzleData?.gridSize}×{currentPuzzleData?.gridSize} piezas</p>
          </div>
          <div className="text-right text-sm">
            <div className="text-gray-500">Tiempo: {formatTime(timeElapsed)}</div>
            <div className="text-emerald-600 font-medium">Movimientos: {moves}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso</span>
            <span className="text-sm font-medium text-emerald-600">{getCompletionPercentage()}%</span>
          </div>
          <Progress value={getCompletionPercentage()} className="h-2" />
        </div>

        {/* Educational Content */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-lg mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">{currentPuzzleData?.name}</h2>
                <p className="text-sm text-gray-600">{currentPuzzleData?.description}</p>
              </div>
              <div className="text-right">
                <Badge className={`${getDifficultyColor(currentPuzzleData?.difficulty || "")} border text-xs mb-1 flex items-center space-x-1`}>
                  {getDifficultyIcon(currentPuzzleData?.difficulty || "")}
                  <span>{currentPuzzleData?.difficulty} ({totalPieces} piezas)</span>
                </Badge>
                <div className="text-xs text-emerald-600 font-medium">+{currentPuzzleData?.points} pts</div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
              <p className="text-sm text-blue-800">
                💡 <strong>¿Sabías que...?</strong> {currentPuzzleData?.educationalContent}
              </p>
            </div>

            {isComplete && (
              <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <span className="text-green-800 font-medium">¡Rompecabezas completado! 🎉</span>
                    <p className="text-sm text-green-700">{currentPuzzleData?.completionMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <Button onClick={initializePuzzle} variant="outline" size="sm" className="flex items-center space-x-1">
                <Shuffle className="w-4 h-4" />
                <span>Mezclar</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pieces Area */}
          <div className="lg:col-span-4">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-xl">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-emerald-700 mb-3 flex items-center">
                  🧩 Piezas ({pieces.length})
                </h3>
                <div
                  className={`grid gap-2 min-h-[300px] p-3 bg-emerald-50 rounded-lg border-2 border-dashed border-emerald-300`}
                  style={{ gridTemplateColumns: `repeat(${Math.min(gridSize, 4)}, 1fr)` }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDropOnPieces}
                >
                  {pieces.map((pieceNumber) => (
                    <div
                      key={`piece-${pieceNumber}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, pieceNumber)}
                      className={`aspect-square rounded border-2 border-emerald-400 cursor-move transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                        draggedPiece === pieceNumber ? 'opacity-50 scale-95' : ''
                      }`}
                      style={getPieceStyle(pieceNumber)}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-2 text-center">
                  Arrastra cada pieza a su lugar correcto en el tablero
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Board Area */}
          <div className="lg:col-span-4">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-xl">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-emerald-700 mb-3">🎯 Tablero</h3>
                <div 
                  className="grid gap-1 mx-auto aspect-square max-w-md p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
                  style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
                >
                  {boardPieces.map((piece, index) => (
                    <div
                      key={`board-${index}`}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDropOnBoard(e, index)}
                      className={`aspect-square rounded border-2 transition-all duration-200 ${
                        piece !== null
                          ? 'border-emerald-400 shadow-md'
                          : draggedOverIndex === index
                          ? 'border-green-500 bg-green-100 border-solid'
                          : 'border-gray-300 bg-gray-100 border-dashed'
                      } ${isComplete ? 'animate-pulse' : ''}`}
                      style={piece !== null ? getPieceStyle(piece) : {}}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-2 text-center">
                  Solo puedes colocar cada pieza en su lugar correcto
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-4">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-emerald-700">👁️ Vista Previa</h3>
                  <Button
                    onClick={() => setShowPreview(!showPreview)}
                    variant="outline"
                    size="sm"
                  >
                    {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                
                {showPreview ? (
                  <div className="aspect-square max-w-md mx-auto rounded-lg overflow-hidden border-2 border-emerald-300">
                    <img 
                      src={currentPuzzleData?.image} 
                      alt={currentPuzzleData?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square max-w-md mx-auto rounded-lg bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Eye className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Haz clic para ver<br />la imagen completa</p>
                    </div>
                  </div>
                )}
                
                <p className="text-xs text-gray-600 mt-2 text-center">
                  {showPreview ? 'Imagen de referencia' : 'Usa la vista previa si necesitas ayuda'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoPuzzle;
