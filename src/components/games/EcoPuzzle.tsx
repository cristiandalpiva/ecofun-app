import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shuffle, CheckCircle, Eye, EyeOff, Grid3X3, Grid2X2, List } from "lucide-react";

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
      name: "Reciclaje Básico",
      description: "Aprende sobre los diferentes materiales reciclables y su importancia.",
      educationalContent: "El reciclaje es fundamental para reducir los residuos. Cada material reciclable puede convertirse en nuevos productos: el papel se convierte en papel nuevo, el plástico en fibras textiles, y el vidrio puede reciclarse infinitas veces sin perder calidad.",
      completionMessage: "¡Excelente! Ahora sabes cómo identificar los diferentes materiales reciclables. Cada vez que reciclas, ayudas a conservar recursos naturales.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=400&fit=crop",
      difficulty: "Fácil",
      gridSize: 3,
      points: 50
    },
    {
      id: 1,
      name: "Paneles Solares",
      description: "Descubre cómo la energía solar puede iluminar nuestro futuro.",
      educationalContent: "Los paneles solares convierten la luz del sol en electricidad limpia. Una instalación solar doméstica puede generar toda la energía que necesita una casa y reducir las emisiones de CO2 hasta en 100,000 libras durante 20 años.",
      completionMessage: "¡Fantástico! Los paneles solares como estos pueden generar energía limpia durante más de 25 años, ayudando a combatir el cambio climático.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=400&fit=crop",
      difficulty: "Fácil",
      gridSize: 3,
      points: 50
    },
    {
      id: 2,
      name: "Jardín de Girasoles",
      description: "Un hermoso campo de girasoles que siguen al sol durante todo el día.",
      educationalContent: "Los girasoles son maestros de la eficiencia energética: rotan para seguir al sol maximizando la fotosíntesis. Sus semillas alimentan aves y sus raíces pueden absorber toxinas del suelo, limpiando el ambiente naturalmente.",
      completionMessage: "¡Increíble! Los girasoles no solo son hermosos, también son purificadores naturales del suelo y proveen alimento para la fauna silvestre.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      difficulty: "Medio",
      gridSize: 4,
      points: 75
    },
    {
      id: 3,
      name: "Tigre en Peligro",
      description: "Un majestuoso tigre en su hábitat natural, una especie que necesita nuestra protección.",
      educationalContent: "Los tigres son cazadores apex que mantienen el equilibrio en sus ecosistemas. Quedan menos de 4,000 tigres salvajes en el mundo. Cada tigre necesita un territorio de hasta 100 km² para sobrevivir y cazar adecuadamente.",
      completionMessage: "¡Perfecto! Los tigres como este son indicadores de la salud del ecosistema. Proteger su hábitat significa proteger bosques enteros.",
      image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=400&h=400&fit=crop",
      difficulty: "Medio",
      gridSize: 4,
      points: 75
    },
    {
      id: 4,
      name: "Planta Creciendo",
      description: "Una pequeña planta emergiendo de la tierra, símbolo de nueva vida y esperanza.",
      educationalContent: "Una sola semilla puede convertirse en un árbol que produzca oxígeno para dos personas durante toda su vida. Las plantas absorben CO2 del aire y lo convierten en oxígeno mediante la fotosíntesis, siendo fundamentales para la vida en la Tierra.",
      completionMessage: "¡Genial! Esta pequeña planta representa el poder de la naturaleza para regenerarse y limpiar nuestro aire.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      difficulty: "Medio",
      gridSize: 4,
      points: 75
    },
    {
      id: 5,
      name: "Persona Cuidando una Planta",
      description: "Una persona cuidando amorosamente una pequeña planta, mostrando la conexión humano-naturaleza.",
      educationalContent: "Cuando cuidamos plantas, no solo embellecemos nuestro entorno. Las plantas de interior purifican el aire, reducen el estrés y mejoran nuestra salud mental. Cuidar un jardín nos conecta con la naturaleza y nos enseña paciencia y responsabilidad.",
      completionMessage: "¡Excelente! El cuidado de las plantas nos enseña a ser responsables con la naturaleza y a valorar la vida en todas sus formas.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      difficulty: "Medio",
      gridSize: 4,
      points: 75
    },
    {
      id: 6,
      name: "Animales en Extinción",
      description: "Especies únicas que necesitan nuestra protección urgente para no desaparecer.",
      educationalContent: "Cada especie que se extingue rompe una cadena alimentaria y afecta todo el ecosistema. Más de 28,000 especies están en peligro de extinción. La conservación no solo salva animales, sino que preserva la biodiversidad necesaria para un planeta saludable.",
      completionMessage: "¡Increíble! Cada especie que proteges ayuda a mantener el equilibrio natural que necesitamos para un planeta saludable.",
      image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=400&fit=crop",
      difficulty: "Difícil",
      gridSize: 5,
      points: 100
    },
    {
      id: 7,
      name: "Basural Contaminante",
      description: "Un basural que muestra el impacto negativo de la mala gestión de residuos.",
      educationalContent: "Los basurales liberan gases tóxicos y contaminan el suelo y agua subterránea. Un solo basural puede contaminar el agua potable de miles de personas. La correcta separación y reciclaje de residuos puede reducir hasta 80% de lo que enviamos a basurales.",
      completionMessage: "¡Fantástico! Ahora entiendes por qué es tan importante reducir, reutilizar y reciclar para evitar la contaminación.",
      image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=400&fit=crop",
      difficulty: "Difícil",
      gridSize: 5,
      points: 100
    },
    {
      id: 8,
      name: "Incendios Forestales",
      description: "La devastación de los incendios forestales y su impacto en el ecosistema.",
      educationalContent: "Los incendios forestales pueden liberar tanto CO2 como millones de autos en un año. Destruyen hábitats, contaminan el aire y afectan el clima global. La prevención y el manejo sostenible de bosques son clave para reducir estos desastres naturales.",
      completionMessage: "¡Excelente! Entender los incendios forestales nos ayuda a valorar la importancia de cuidar nuestros bosques y prevenir estos desastres.",
      image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop",
      difficulty: "Medio",
      gridSize: 4,
      points: 75
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
    // Shuffle the pieces properly
    for (let i = shuffledPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPieces[i], shuffledPieces[j]] = [shuffledPieces[j], shuffledPieces[i]];
    }
    
    // Ensure we don't start with the puzzle already solved
    let attempts = 0;
    while (shuffledPieces.every((piece, index) => piece === index) && attempts < 10) {
      for (let i = shuffledPieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPieces[i], shuffledPieces[j]] = [shuffledPieces[j], shuffledPieces[i]];
      }
      attempts++;
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

    if (draggedPiece !== boardIndex) {
      setDraggedPiece(null);
      return;
    }

    const newBoardPieces = [...boardPieces];
    const newPieces = pieces.filter(p => p !== draggedPiece);
    
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
                  {Array.from({ length: totalPieces }, (_, index) => {
                    const piece = boardPieces[index];
                    return (
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
                    );
                  })}
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
