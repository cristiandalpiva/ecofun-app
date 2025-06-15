
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shuffle, RotateCw, CheckCircle, Eye, EyeOff } from "lucide-react";

interface EcoPuzzleProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

const EcoPuzzle = ({ onComplete, onBack }: EcoPuzzleProps) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
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
      name: "Bosque Mágico",
      description: "Un hermoso bosque lleno de vida donde los animales viven en armonía con las plantas.",
      educationalContent: "Los bosques son el hogar de millones de especies. Cada árbol produce oxígeno que necesitamos para respirar y ayuda a limpiar el aire. ¡Un solo árbol grande puede producir oxígeno para 2 personas por día!",
      completionMessage: "¡Fantástico! Has completado el bosque mágico. Los bosques como este son súper importantes porque limpian el aire y nos dan oxígeno fresco para respirar.",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=400&fit=crop",
      difficulty: "Fácil",
      gridSize: 3,
      points: 50
    },
    {
      id: 1,
      name: "Jardín de Mariposas",
      description: "Un colorido jardín donde las mariposas vuelan entre flores hermosas y brillantes.",
      educationalContent: "Las mariposas son polinizadoras súper importantes. Cuando vuelan de flor en flor, ayudan a las plantas a crear semillas para nuevas plantas. ¡Las flores necesitan a las mariposas para reproducirse!",
      completionMessage: "¡Excelente! Las mariposas que acabas de ver ayudan a que crezcan las flores llevando polen de una flor a otra. ¡Son pequeñas jardineras voladoras!",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop",
      difficulty: "Fácil",
      gridSize: 3,
      points: 50
    },
    {
      id: 2,
      name: "Océano Cristalino",
      description: "Aguas azules y cristalinas donde viven peces de colores y corales hermosos.",
      educationalContent: "Los océanos son súper importantes porque producen más de la mitad del oxígeno que respiramos. Los peces y corales trabajan juntos para mantener el agua limpia y saludable.",
      completionMessage: "¡Increíble! Los océanos limpios como este nos dan oxígeno y son el hogar de miles de especies marinas. ¡Cuidar el océano es cuidar nuestro planeta!",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop",
      difficulty: "Fácil",
      gridSize: 3,
      points: 50
    },
    {
      id: 3,
      name: "Amigos del Bosque",
      description: "Lindos animalitos como ciervos y conejos que viven felices entre los árboles.",
      educationalContent: "Los animales del bosque son súper importantes porque cada uno tiene un trabajo especial. Los ciervos ayudan a esparcir semillas, y todos juntos mantienen el bosque saludable y equilibrado.",
      completionMessage: "¡Perfecto! Los animales del bosque como estos ciervos ayudan a plantar nuevos árboles llevando semillas en su pelaje a otros lugares.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop",
      difficulty: "Medio",
      gridSize: 4,
      points: 75
    },
    {
      id: 4,
      name: "Montañas Nevadas",
      description: "Hermosas montañas cubiertas de nieve que guardan agua fresca para todos los seres vivos.",
      educationalContent: "Las montañas son como grandes depósitos de agua. La nieve y el hielo se derriten lentamente y nos dan agua fresca todo el año. ¡Sin montañas no tendríamos suficiente agua dulce!",
      completionMessage: "¡Genial! Las montañas que armaste son súper importantes porque guardan agua en forma de nieve y hielo, y nos la dan poco a poco durante todo el año.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
      difficulty: "Medio",
      gridSize: 4,
      points: 75
    },
    {
      id: 5,
      name: "Río Serpenteante",
      description: "Un río que serpentea entre rocas y plantas, llevando agua fresca a todos los seres vivos.",
      educationalContent: "Los ríos son como las venas de nuestro planeta. Llevan agua fresca desde las montañas hasta el mar, y en su camino dan de beber a plantas, animales y personas.",
      completionMessage: "¡Excelente trabajo! Los ríos como este son súper importantes porque transportan agua fresca y limpia a todos los lugares donde se necesita.",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=400&fit=crop",
      difficulty: "Medio",
      gridSize: 4,
      points: 75
    },
    {
      id: 6,
      name: "Cascada Arcoíris",
      description: "Una hermosa cascada que forma un arcoíris cuando los rayos del sol tocan las gotas de agua.",
      educationalContent: "Las cascadas son súper especiales porque hacen que el agua se mueva y se llene de oxígeno, lo que ayuda a que los peces y plantas acuáticas estén más saludables. ¡Y a veces forman arcoíris mágicos!",
      completionMessage: "¡Increíble! Las cascadas como esta oxigenan el agua y crean pequeños ecosistemas únicos donde viven especies muy especiales.",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=400&fit=crop",
      difficulty: "Difícil",
      gridSize: 5,
      points: 100
    },
    {
      id: 7,
      name: "Praderas Verdes",
      description: "Extensas praderas verdes donde las vacas y otros animales pastan felizmente bajo el sol.",
      educationalContent: "Las praderas son ecosistemas súper importantes donde las hierbas y pastos crecen naturalmente. Los animales que pastan aquí ayudan a mantener el pasto saludable y fertilizan la tierra de forma natural.",
      completionMessage: "¡Fantástico! Las praderas como esta son fundamentales para la agricultura sustentable y ayudan a mantener el suelo fértil y saludable.",
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=400&fit=crop",
      difficulty: "Difícil",
      gridSize: 5,
      points: 100
    }
  ];

  const currentPuzzleData = puzzles[currentPuzzle];
  const gridSize = currentPuzzleData.gridSize;
  const totalPieces = gridSize * gridSize;

  useEffect(() => {
    initializePuzzle();
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
    const completed = newBoardPieces.every((piece, index) => piece === index);
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
      }, 4000);
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
    const row = Math.floor(pieceNumber / gridSize);
    const col = pieceNumber % gridSize;
    const pieceSize = 100 / gridSize;
    
    return {
      backgroundImage: `url(${currentPuzzleData.image})`,
      backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
      backgroundPosition: `-${col * pieceSize}% -${row * pieceSize}%`,
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
            Progreso: {currentPuzzle + (isComplete ? 1 : 0)}/{puzzles.length} puzzles completados
          </p>
        </div>

        {/* Educational Content */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-lg mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">{currentPuzzleData.name}</h2>
                <p className="text-sm text-gray-600">{currentPuzzleData.description}</p>
              </div>
              <div className="text-right">
                <Badge className={`${getDifficultyColor(currentPuzzleData.difficulty)} border text-xs mb-1`}>
                  {currentPuzzleData.difficulty} ({totalPieces} piezas)
                </Badge>
                <div className="text-xs text-emerald-600 font-medium">+{currentPuzzleData.points} pts</div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
              <p className="text-sm text-blue-800">
                💡 <strong>¿Sabías que...?</strong> {currentPuzzleData.educationalContent}
              </p>
            </div>

            {isComplete && (
              <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <span className="text-green-800 font-medium">¡Rompecabezas completado! 🎉</span>
                    <p className="text-sm text-green-700">{currentPuzzleData.completionMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <Button onClick={initializePuzzle} variant="outline" size="sm" className="flex items-center space-x-1">
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

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pieces Area */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-xl">
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-emerald-700 mb-3">🧩 Piezas ({pieces.length})</h3>
              <div
                className={`grid gap-2 min-h-[200px] p-3 bg-emerald-50 rounded-lg border-2 border-dashed border-emerald-300 ${
                  gridSize === 3 ? 'grid-cols-3' : gridSize === 4 ? 'grid-cols-4' : 'grid-cols-5'
                }`}
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

          {/* Board Area */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-xl">
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-emerald-700 mb-3">🎯 Tablero</h3>
              <div 
                className={`grid gap-1 mx-auto aspect-square max-w-sm p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300`}
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

          {/* Preview Area */}
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
                <div className="aspect-square max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-emerald-300">
                  <img 
                    src={currentPuzzleData.image} 
                    alt={currentPuzzleData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square max-w-sm mx-auto rounded-lg bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
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
  );
};

export default EcoPuzzle;
