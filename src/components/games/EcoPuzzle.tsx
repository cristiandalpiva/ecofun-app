
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

  const puzzles = [
    {
      id: 0,
      name: "Bosque Encantado",
      description: "Un hermoso bosque lleno de vida y biodiversidad que nos enseña sobre la importancia de los ecosistemas forestales.",
      educationalContent: "Los bosques son fundamentales para la vida en la Tierra. Producen oxígeno, absorben CO2 y albergan el 80% de la biodiversidad terrestre.",
      completionMessage: "¡Excelente! Los bosques como este absorben hasta 6 toneladas de CO2 por año. Cada árbol que protegemos es un paso hacia un planeta más saludable.",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=400&fit=crop",
      difficulty: "Fácil",
      gridSize: 3,
      points: 40
    },
    {
      id: 1,
      name: "Océano Cristalino",
      description: "Las aguas cristalinas de nuestro océano nos muestran la importancia de mantener limpios estos ecosistemas acuáticos.",
      educationalContent: "Los océanos producen más del 50% del oxígeno que respiramos y absorben el 30% del CO2 que producimos. ¡Son vitales para nuestro clima!",
      completionMessage: "¡Fantástico! Los océanos limpios como este sustentan la vida de millones de especies y regulan el clima mundial.",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop",
      difficulty: "Fácil",
      gridSize: 3,
      points: 40
    },
    {
      id: 2,
      name: "Montañas Majestuosas",
      description: "Las montañas nos enseñan sobre la formación geológica y su rol como reservas de agua dulce para el planeta.",
      educationalContent: "Las montañas almacenan agua en forma de nieve y hielo, proporcionando agua dulce a más de la mitad de la humanidad.",
      completionMessage: "¡Increíble! Las montañas como estas son las 'torres de agua' del mundo, esenciales para el ciclo hidrológico global.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
      difficulty: "Medio",
      gridSize: 3,
      points: 50
    },
    {
      id: 3,
      name: "Flores Silvestres",
      description: "Un campo de flores nos demuestra la importancia de los polinizadores y la biodiversidad de plantas nativas.",
      educationalContent: "Las flores y sus polinizadores son responsables de 1 de cada 3 bocados de comida que consumimos. ¡Sin abejas no habría muchas frutas!",
      completionMessage: "¡Perfecto! Ecosistemas como este sustentan a los polinizadores que hacen posible el 75% de nuestros cultivos alimentarios.",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop",
      difficulty: "Medio",
      gridSize: 3,
      points: 50
    },
    {
      id: 4,
      name: "Río Serpenteante",
      description: "Los ríos son las arterias de nuestro planeta, transportando nutrientes y sosteniendo ecosistemas únicos.",
      educationalContent: "Los ríos transportan sedimentos que fertilizan tierras, conectan ecosistemas y proporcionan agua dulce a billones de seres vivos.",
      completionMessage: "¡Excelente! Los ríos saludables como este son esenciales para mantener el equilibrio de los ecosistemas terrestres.",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=400&fit=crop",
      difficulty: "Medio",
      gridSize: 3,
      points: 50
    },
    {
      id: 5,
      name: "Vida Silvestre",
      description: "Los animales en su hábitat natural nos recuerdan la importancia de conservar espacios protegidos para la fauna.",
      educationalContent: "La vida silvestre mantiene el equilibrio de los ecosistemas. Cada especie tiene un rol único e irreemplazable en la cadena alimentaria.",
      completionMessage: "¡Magnífico! La conservación de hábitats como este protege especies que han evolucionado durante millones de años.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop",
      difficulty: "Difícil",
      gridSize: 4,
      points: 70
    },
    {
      id: 6,
      name: "Cascada Natural",
      description: "Las cascadas representan el poder del agua y su capacidad de moldear paisajes a lo largo del tiempo.",
      educationalContent: "Las cascadas generan iones negativos que purifican el aire y crean microclimas únicos que sustentan especies especializadas.",
      completionMessage: "¡Increíble! Las cascadas como esta crean ecosistemas únicos y ayudan a oxigenar los cuerpos de agua.",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=400&fit=crop",
      difficulty: "Difícil",
      gridSize: 4,
      points: 70
    },
    {
      id: 7,
      name: "Bosque de Pinos",
      description: "Los bosques de coníferas son ecosistemas resistentes que nos enseñan sobre adaptación y supervivencia.",
      educationalContent: "Los bosques de coníferas almacenan enormes cantidades de carbono y proporcionan madera sostenible cuando se manejan responsablemente.",
      completionMessage: "¡Fantástico! Los bosques de coníferas como este son fundamentales para combatir el cambio climático y conservar suelos.",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=400&fit=crop",
      difficulty: "Difícil",
      gridSize: 4,
      points: 80
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnBoard = (e: React.DragEvent, boardIndex: number) => {
    e.preventDefault();
    if (draggedPiece === null) return;

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
                  {currentPuzzleData.difficulty}
                </Badge>
                <div className="text-xs text-emerald-600 font-medium">+{currentPuzzleData.points} pts</div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
              <p className="text-sm text-blue-800">
                💡 <strong>Dato Ecológico:</strong> {currentPuzzleData.educationalContent}
              </p>
            </div>

            {isComplete && (
              <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <span className="text-green-800 font-medium">¡Puzzle completado! 🎉</span>
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
              <h3 className="text-lg font-bold text-emerald-700 mb-3">🧩 Piezas</h3>
              <div
                className="grid grid-cols-3 gap-2 min-h-[200px] p-3 bg-emerald-50 rounded-lg border-2 border-dashed border-emerald-300"
                onDragOver={handleDragOver}
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
                Arrastra las piezas al tablero
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
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropOnBoard(e, index)}
                    className={`aspect-square rounded border-2 transition-all duration-200 ${
                      piece !== null
                        ? 'border-emerald-400 shadow-md'
                        : 'border-gray-300 bg-gray-100 border-dashed'
                    } ${isComplete ? 'animate-pulse' : ''}`}
                    style={piece !== null ? getPieceStyle(piece) : {}}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">
                Coloca las piezas en orden
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
