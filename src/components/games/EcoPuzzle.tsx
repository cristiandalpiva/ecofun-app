
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
      description: "Aprende sobre los diferentes contenedores de reciclaje y su importancia.",
      educationalContent: "Los contenedores de reciclaje están codificados por colores: azul para papel y cartón, amarillo para plásticos y latas, verde para vidrio, y marrón para residuos orgánicos. Separar correctamente los residuos puede reducir hasta 80% de lo que enviamos a vertederos.",
      completionMessage: "¡Excelente! Ahora sabes cómo identificar los diferentes contenedores de reciclaje. Cada vez que reciclas correctamente, ayudas a conservar recursos naturales.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=600&fit=crop",
      difficulty: "Fácil",
      gridSize: 3,
      points: 50
    },
    {
      id: 1,
      name: "Paneles Solares",
      description: "Descubre cómo la energía solar puede iluminar nuestro futuro sostenible.",
      educationalContent: "Los paneles solares convierten la luz del sol directamente en electricidad limpia mediante células fotovoltaicas. Una instalación solar doméstica puede generar toda la energía que necesita una casa y reducir las emisiones de CO2 hasta en 100,000 libras durante 20 años.",
      completionMessage: "¡Fantástico! Los paneles solares como estos pueden generar energía limpia durante más de 25 años, siendo una inversión clave para combatir el cambio climático.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=600&fit=crop",
      difficulty: "Fácil",
      gridSize: 3,
      points: 50
    },
    {
      id: 2,
      name: "Jardín de Girasoles",
      description: "Un hermoso campo de girasoles que siguen al sol durante todo el día.",
      educationalContent: "Los girasoles practican el heliotropismo, rotando para seguir al sol y maximizar la fotosíntesis. Sus semillas alimentan aves, sus raíces pueden absorber toxinas del suelo, y una hectárea de girasoles puede producir suficiente aceite para biodiesel ecológico.",
      completionMessage: "¡Increíble! Los girasoles no solo son hermosos, también son purificadores naturales del suelo y una fuente renovable de biocombustible.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
      difficulty: "Medio",
      gridSize: 4,
      points: 75
    },
    {
      id: 3,
      name: "Bosque Verde",
      description: "Un hermoso bosque que nos muestra la importancia de cuidar nuestros árboles.",
      educationalContent: "Los bosques absorben CO2 y producen el oxígeno que respiramos. Un solo árbol maduro puede producir oxígeno suficiente para dos personas durante un año completo. Los bosques también regulan el clima, previenen la erosión y son hogar de millones de especies.",
      completionMessage: "¡Perfecto! Los bosques como este son los pulmones de nuestro planeta. Cada árbol que protegemos ayuda a combatir el cambio climático.",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&h=600&fit=crop",
      difficulty: "Medio",
      gridSize: 4,
      points: 75
    },
    {
      id: 4,
      name: "Lago Cristalino",
      description: "Un lago rodeado de naturaleza que muestra la belleza del agua limpia.",
      educationalContent: "Los cuerpos de agua dulce como lagos y ríos contienen menos del 3% del agua mundial, pero son esenciales para toda la vida. Filtran contaminantes naturalmente y proporcionan hábitat para miles de especies. Proteger nuestras fuentes de agua es proteger la vida misma.",
      completionMessage: "¡Genial! Este lago representa la importancia del agua limpia para todos los seres vivos. Cada gota que cuidamos es vida que preservamos.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=600&fit=crop",
      difficulty: "Medio",
      gridSize: 4,
      points: 75
    },
    {
      id: 5,
      name: "Ballena Jorobada",
      description: "Una majestuosa ballena jorobada saltando en el océano.",
      educationalContent: "Las ballenas jorobadas pueden medir hasta 16 metros y son conocidas por sus complejas canciones que pueden escucharse a kilómetros de distancia. Son migradoras épicas que viajan hasta 25,000 km al año. Su recuperación de la casi extinción es una historia de éxito de la conservación marina.",
      completionMessage: "¡Increíble! Las ballenas como esta son ingenieros del ecosistema marino, ayudando a mantener el equilibrio oceánico con sus migraciones y comportamientos.",
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=600&h=600&fit=crop",
      difficulty: "Difícil",
      gridSize: 5,
      points: 100
    },
    {
      id: 6,
      name: "Pingüinos Antárticos",
      description: "Dos pingüinos en su hábitat natural, indicadores del cambio climático.",
      educationalContent: "Los pingüinos son indicadores clave del cambio climático. Su población refleja la salud del ecosistema polar. El derretimiento del hielo ártico afecta directamente su hábitat y fuentes de alimento. Proteger las regiones polares es crucial para estas especies únicas.",
      completionMessage: "¡Fantástico! Los pingüinos como estos nos alertan sobre los cambios en nuestro clima. Son centinelas naturales que nos ayudan a entender el impacto del calentamiento global.",
      image: "https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=600&h=600&fit=crop",
      difficulty: "Difícil",
      gridSize: 5,
      points: 100
    },
    {
      id: 7,
      name: "Flores Naranjas",
      description: "Hermosas flores naranjas que muestran la diversidad de la naturaleza.",
      educationalContent: "Las flores son fundamentales para la polinización y la biodiversidad. Una sola abeja puede visitar hasta 5,000 flores en un día. Sin polinizadores, perdríamos un tercio de nuestros alimentos. Las flores silvestres también purifican el suelo y proporcionan medicina natural.",
      completionMessage: "¡Excelente! Estas flores representan la increíble red de vida que conecta plantas, polinizadores y ecosistemas enteros. Cada flor es un eslabón vital en la cadena de la vida.",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&h=600&fit=crop",
      difficulty: "Medio",
      gridSize: 4,
      points: 75
    },
    {
      id: 8,
      name: "Ciervos en el Bosque",
      description: "Dos ciervos en su hábitat natural, mostrando la vida silvestre en armonía.",
      educationalContent: "Los ciervos son herbívoros clave que ayudan a mantener el equilibrio en los ecosistemas forestales. Su pastoreo controla el crecimiento de plantas y crea espacios para otras especies. Son también dispersores de semillas, ayudando a regenerar los bosques mientras se desplazan.",
      completionMessage: "¡Perfecto! Estos ciervos muestran cómo cada animal tiene un papel importante en mantener el equilibrio natural. Su presencia indica un ecosistema saludable y próspero.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=600&fit=crop",
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
    // Create array of piece numbers from 0 to totalPieces-1
    const allPieces = Array.from({ length: totalPieces }, (_, i) => i);
    
    // Shuffle the pieces
    const shuffledPieces = [...allPieces];
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
    
    // All pieces start in the pieces area
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
    // Only allow dropping a piece in its correct position
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
    
    // If there's already a piece in this position, return it to pieces
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

    // Find if this piece is currently on the board
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
    
    // Calculate the exact background position for each piece
    // Each piece should show exactly 1/gridSize of the image
    const pieceWidthPercent = 100 / gridSize;
    const pieceHeightPercent = 100 / gridSize;
    
    return {
      backgroundImage: `url(${currentPuzzleData.image})`,
      backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
      backgroundPosition: `-${col * pieceWidthPercent}% -${row * pieceHeightPercent}%`,
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
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
                  🧩 Piezas ({pieces.length} de {totalPieces})
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
                      className={`aspect-square rounded border-2 border-emerald-400 cursor-move transition-all duration-200 hover:scale-105 hover:shadow-lg overflow-hidden bg-white ${
                        draggedPiece === pieceNumber ? 'opacity-50 scale-95' : ''
                      }`}
                    >
                      <div 
                        className="w-full h-full"
                        style={getPieceStyle(pieceNumber)}
                      />
                    </div>
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
                        className={`aspect-square rounded border-2 transition-all duration-200 overflow-hidden ${
                          piece !== null
                            ? 'border-emerald-400 shadow-md bg-white'
                            : draggedOverIndex === index
                            ? 'border-green-500 bg-green-100 border-solid'
                            : 'border-gray-300 bg-gray-100 border-dashed'
                        } ${isComplete ? 'animate-pulse' : ''}`}
                      >
                        {piece !== null && (
                          <div 
                            className="w-full h-full"
                            style={getPieceStyle(piece)}
                          />
                        )}
                      </div>
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
