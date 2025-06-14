
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Lock } from "lucide-react";
import EcoMascot from "@/components/EcoMascot";

interface EcoPuzzleProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface PuzzleOption {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
  pieceCount: number;
  educationalMessage: string;
  requiredPuzzles: string[];
}

interface PuzzlePiece {
  id: number;
  position: number;
  isPlaced: boolean;
}

const EcoPuzzle = ({ onComplete, onBack }: EcoPuzzleProps) => {
  const [selectedPuzzle, setSelectedPuzzle] = useState<PuzzleOption | null>(null);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [placedPieces, setPlacedPieces] = useState<{ [key: number]: number }>({});
  const [solved, setSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [completedPuzzles, setCompletedPuzzles] = useState<string[]>(() => {
    const saved = localStorage.getItem('completed-puzzles');
    return saved ? JSON.parse(saved) : [];
  });

  const puzzleOptions: PuzzleOption[] = [
    {
      id: 'solar-panels',
      title: 'Energía Solar',
      description: 'Paneles solares generando energía limpia',
      imageUrl: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=400&fit=crop&crop=center',
      difficulty: 'easy',
      pieceCount: 9,
      educationalMessage: '¡Increíble! Los paneles solares convierten la luz del sol en electricidad limpia. Una sola hora de sol puede generar energía para todo un año en la Tierra. ¡El sol es nuestro amigo más poderoso!',
      requiredPuzzles: []
    },
    {
      id: 'recycling',
      title: 'Reciclaje en Acción',
      description: 'Personas separando residuos correctamente',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=center',
      difficulty: 'easy',
      pieceCount: 9,
      educationalMessage: '¡Excelente! Separar correctamente los residuos ayuda a que los materiales tengan una segunda vida. Cada botella reciclada puede convertirse en ropa, alfombras o incluso nuevas botellas. ¡Tú puedes ser parte del cambio!',
      requiredPuzzles: []
    },
    {
      id: 'clean-water',
      title: 'Agua Limpia',
      description: 'Lago cristalino rodeado de naturaleza',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center',
      difficulty: 'medium',
      pieceCount: 16,
      educationalMessage: '¡Fantástico! El agua limpia es esencial para toda la vida en la Tierra. Cada gota cuenta: cerrar el grifo mientras te cepillas los dientes puede ahorrar hasta 8 litros de agua. ¡Seamos guardianes del agua!',
      requiredPuzzles: ['solar-panels']
    },
    {
      id: 'forest-protection',
      title: 'Bosque Protegido',
      description: 'Bosque verde con luz solar filtrándose',
      imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=400&fit=crop&crop=center',
      difficulty: 'medium',
      pieceCount: 16,
      educationalMessage: '¡Maravilloso! Los bosques son los pulmones de nuestro planeta. Un solo árbol puede producir oxígeno para dos personas durante un día completo. ¡Cuidar los árboles es cuidar nuestra respiración!',
      requiredPuzzles: ['recycling']
    },
    {
      id: 'organic-garden',
      title: 'Huerto Orgánico',
      description: 'Jardín con vegetales cultivados sin químicos',
      imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&crop=center',
      difficulty: 'hard',
      pieceCount: 25,
      educationalMessage: '¡Espectacular! Los huertos orgánicos no usan químicos dañinos y producen alimentos más saludables. Cultivar tus propias verduras reduce la contaminación del transporte y te conecta con la naturaleza. ¡Cada semilla es una esperanza!',
      requiredPuzzles: ['clean-water', 'forest-protection']
    },
    {
      id: 'renewable-energy',
      title: 'Energías Renovables',
      description: 'Molinos de viento generando energía limpia',
      imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=400&fit=crop&crop=center',
      difficulty: 'hard',
      pieceCount: 25,
      educationalMessage: '¡Extraordinario! Los molinos de viento convierten la fuerza del aire en electricidad sin contaminar. El viento es infinito y gratuito. ¡Aprovechemos la fuerza de la naturaleza para cuidar nuestro hogar!',
      requiredPuzzles: ['solar-panels', 'clean-water']
    },
    {
      id: 'electric-transport',
      title: 'Transporte Ecológico',
      description: 'Bicicletas y transporte sostenible',
      imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop&crop=center',
      difficulty: 'medium',
      pieceCount: 16,
      educationalMessage: '¡Genial! Usar bicicleta o caminar no solo cuida el planeta, también te mantiene saludable. Por cada kilómetro en bicicleta en vez de auto, evitas contaminar el aire que respiramos. ¡Pedalear es poder!',
      requiredPuzzles: ['recycling', 'forest-protection']
    },
    {
      id: 'wildlife-conservation',
      title: 'Conservación Animal',
      description: 'Animales en su hábitat natural protegido',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&crop=center',
      difficulty: 'hard',
      pieceCount: 25,
      educationalMessage: '¡Impresionante! Proteger los animales y sus hogares es esencial para la vida en la Tierra. Cada especie tiene un papel importante en la naturaleza. ¡Todos los seres vivos merecemos un hogar seguro!',
      requiredPuzzles: ['organic-garden', 'electric-transport']
    }
  ];

  // Save completed puzzles to localStorage
  useEffect(() => {
    localStorage.setItem('completed-puzzles', JSON.stringify(completedPuzzles));
  }, [completedPuzzles]);

  const initializePuzzle = (puzzleOption: PuzzleOption) => {
    const newPieces = Array.from({ length: puzzleOption.pieceCount }, (_, i) => ({
      id: i,
      position: i,
      isPlaced: false
    }));
    
    // Shuffle pieces
    const shuffledPieces = [...newPieces].sort(() => Math.random() - 0.5);
    
    setPieces(shuffledPieces);
    setPlacedPieces({});
    setStartTime(Date.now());
    setMoves(0);
    setSolved(false);
  };

  const handleDragStart = (e: React.DragEvent, pieceId: number) => {
    setDraggedPiece(pieceId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetPosition: number) => {
    e.preventDefault();
    
    if (draggedPiece === null) return;
    
    // Check if the piece belongs to this position
    if (draggedPiece === targetPosition) {
      const newPlacedPieces = { ...placedPieces };
      newPlacedPieces[targetPosition] = draggedPiece;
      setPlacedPieces(newPlacedPieces);
      
      // Update pieces to mark as placed
      setPieces(prev => prev.map(piece => 
        piece.id === draggedPiece ? { ...piece, isPlaced: true } : piece
      ));
      
      setMoves(moves + 1);
      
      // Check if puzzle is complete
      if (Object.keys(newPlacedPieces).length === selectedPuzzle?.pieceCount) {
        setSolved(true);
        // Mark puzzle as completed
        if (selectedPuzzle && !completedPuzzles.includes(selectedPuzzle.id)) {
          setCompletedPuzzles([...completedPuzzles, selectedPuzzle.id]);
        }
      }
    }
    
    setDraggedPiece(null);
  };

  const handleComplete = () => {
    if (!selectedPuzzle) return;
    
    const timeBonus = Math.max(0, 300 - Math.floor((Date.now() - startTime) / 1000));
    const moveBonus = Math.max(0, selectedPuzzle.pieceCount * 2 - moves);
    const difficultyBonus = selectedPuzzle.difficulty === 'easy' ? 50 : selectedPuzzle.difficulty === 'medium' ? 75 : 100;
    const totalPoints = difficultyBonus + Math.floor(timeBonus / 5) + moveBonus;
    onComplete(totalPoints);
  };

  const resetPuzzle = () => {
    if (selectedPuzzle) {
      initializePuzzle(selectedPuzzle);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getProgress = () => {
    if (!selectedPuzzle) return 0;
    return (Object.keys(placedPieces).length / selectedPuzzle.pieceCount) * 100;
  };

  const getMascotMood = () => {
    const progress = getProgress();
    if (progress === 0) return 'thinking';
    if (progress < 50) return 'happy';
    if (progress < 100) return 'excited';
    return 'excited';
  };

  const isPuzzleUnlocked = (puzzle: PuzzleOption) => {
    return puzzle.requiredPuzzles.every(reqId => completedPuzzles.includes(reqId));
  };

  // Pantalla de selección de puzzle
  if (!selectedPuzzle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button 
              onClick={onBack}
              variant="outline"
              className="border-2 border-green-400 text-green-600 hover:bg-green-100 hover:border-green-500 transition-all duration-200"
            >
              ← Volver
            </Button>
            <div className="flex items-center space-x-2">
              <EcoMascot size="small" mood="thinking" />
              <span className="font-semibold text-green-700">Elige tu Puzzle</span>
            </div>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl mb-6">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">🧩 Puzzle Ecológico 🧩</h2>
              <p className="text-gray-600">Completa puzzles para desbloquear nuevos desafíos</p>
              <p className="text-sm text-blue-600 mt-2">Completados: {completedPuzzles.length}/{puzzleOptions.length}</p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {puzzleOptions.map((option) => {
              const isUnlocked = isPuzzleUnlocked(option);
              const isCompleted = completedPuzzles.includes(option.id);
              
              return (
                <Card 
                  key={option.id}
                  className={`transition-all duration-300 border-2 shadow-lg ${
                    isUnlocked 
                      ? `cursor-pointer hover:scale-105 hover:shadow-2xl border-gray-200 hover:border-green-400 bg-white/95 hover:bg-white group ${isCompleted ? 'ring-2 ring-green-400' : ''}` 
                      : 'cursor-not-allowed bg-gray-100 border-gray-300 opacity-60'
                  }`}
                  onClick={() => {
                    if (isUnlocked) {
                      setSelectedPuzzle(option);
                      initializePuzzle(option);
                    }
                  }}
                >
                  <CardContent className="p-4 text-center relative">
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                        <Lock className="w-8 h-8 text-gray-600" />
                      </div>
                    )}
                    {isCompleted && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        ✓
                      </div>
                    )}
                    <div className="w-full h-32 mb-4 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <img 
                        src={option.imageUrl} 
                        alt={option.title}
                        className={`w-full h-full object-cover transition-transform duration-300 ${isUnlocked ? 'group-hover:scale-110' : ''}`}
                      />
                    </div>
                    <h3 className={`font-bold text-lg mb-2 transition-colors ${
                      isUnlocked 
                        ? `text-gray-800 group-hover:text-green-700 ${isCompleted ? 'text-green-700' : ''}` 
                        : 'text-gray-500'
                    }`}>
                      {option.title}
                    </h3>
                    <p className={`text-sm mb-3 ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                      {option.description}
                    </p>
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-center space-x-2">
                        <Badge className={`${getDifficultyColor(option.difficulty)} border`}>
                          {option.pieceCount} piezas
                        </Badge>
                        <Badge variant="outline" className="border-blue-300 text-blue-700">
                          {option.difficulty === 'easy' ? 'Fácil' : option.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                        </Badge>
                      </div>
                      {!isUnlocked && option.requiredPuzzles.length > 0 && (
                        <p className="text-xs text-gray-500 mt-2">
                          Completa: {option.requiredPuzzles.map(id => 
                            puzzleOptions.find(p => p.id === id)?.title
                          ).join(', ')}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de puzzle completado
  if (solved) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-green-300 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <EcoMascot size="large" mood="excited" />
              </div>
              <h2 className="text-3xl font-bold text-green-700 mb-4">¡Puzzle Completado! 🎉</h2>
              <div className="w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={selectedPuzzle.imageUrl} 
                  alt={selectedPuzzle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {selectedPuzzle.title}
              </h3>
              
              {/* Educational Message */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border-2 border-green-200 mb-6">
                <div className="text-2xl mb-3">🌱</div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {selectedPuzzle.educationalMessage}
                </p>
              </div>

              <div className="flex justify-center space-x-4 text-sm text-gray-600 mb-6">
                <span>Movimientos: {moves}</span>
                <span>•</span>
                <span>Tiempo: {Math.floor((Date.now() - startTime) / 1000)}s</span>
              </div>

              {/* Check if new puzzles were unlocked */}
              {(() => {
                const newlyUnlocked = puzzleOptions.filter(puzzle => 
                  puzzle.requiredPuzzles.includes(selectedPuzzle.id) && 
                  isPuzzleUnlocked(puzzle) &&
                  !completedPuzzles.includes(puzzle.id)
                );
                
                return newlyUnlocked.length > 0 && (
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
                    <h4 className="text-lg font-bold text-yellow-800 mb-2">🔓 ¡Nuevos Puzzles Desbloqueados!</h4>
                    <div className="space-y-1">
                      {newlyUnlocked.map(puzzle => (
                        <p key={puzzle.id} className="text-yellow-700 font-semibold">
                          • {puzzle.title}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })()}

              <div className="space-y-3">
                <Button 
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  ¡Continuar!
                </Button>
                <div className="space-x-4">
                  <Button 
                    onClick={resetPuzzle}
                    variant="outline"
                    className="border-2 border-blue-400 text-blue-600 hover:bg-blue-100 hover:border-blue-500 font-semibold py-3 px-8 rounded-full transition-all duration-200"
                  >
                    Jugar de nuevo
                  </Button>
                  <Button 
                    onClick={() => setSelectedPuzzle(null)}
                    variant="outline"
                    className="border-2 border-purple-400 text-purple-600 hover:bg-purple-100 hover:border-purple-500 font-semibold py-3 px-8 rounded-full transition-all duration-200"
                  >
                    Elegir otro puzzle
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Pantalla del juego
  const gridSize = Math.sqrt(selectedPuzzle.pieceCount);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={() => setSelectedPuzzle(null)}
            variant="outline"
            className="border-2 border-green-400 text-green-600 hover:bg-green-100 hover:border-green-500 transition-all duration-200"
          >
            ← Cambiar puzzle
          </Button>
          <div className="flex items-center space-x-4">
            <EcoMascot size="medium" mood={getMascotMood()} />
            <div className="text-center">
              <h3 className="font-bold text-green-700">{selectedPuzzle.title}</h3>
              <p className="text-sm text-blue-600">{Math.round(getProgress())}% completado</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowHelp(!showHelp)}
            variant="outline"
            className="border-2 border-blue-400 text-blue-600 hover:bg-blue-100 hover:border-blue-500 transition-all duration-200"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Ayuda
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Piezas disponibles */}
          <Card className="lg:col-span-1 bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-bold text-center mb-4 text-purple-700">Piezas Disponibles</h3>
              <div className="grid grid-cols-2 gap-2">
                {pieces.filter(piece => !piece.isPlaced).map((piece) => (
                  <div
                    key={piece.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, piece.id)}
                    className="aspect-square bg-white border-2 border-gray-300 rounded-lg cursor-move hover:border-blue-400 hover:shadow-lg transition-all duration-200 overflow-hidden"
                    style={{
                      backgroundImage: `url(${selectedPuzzle.imageUrl})`,
                      backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                      backgroundPosition: `${(piece.id % gridSize) * (100 / (gridSize - 1))}% ${Math.floor(piece.id / gridSize) * (100 / (gridSize - 1))}%`
                    }}
                  >
                    <div className="w-full h-full bg-black bg-opacity-20 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{piece.id + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Área de construcción del puzzle */}
          <Card className="lg:col-span-2 bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-green-700">Área de Construcción</h3>
                <div className="flex space-x-4 text-sm">
                  <span className="text-gray-600">Movimientos: {moves}</span>
                  <span className="text-blue-600">
                    Tiempo: {Math.floor((Date.now() - startTime) / 1000)}s
                  </span>
                </div>
              </div>
              
              <div 
                className="grid gap-1 w-full max-w-md mx-auto aspect-square"
                style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
              >
                {Array.from({ length: selectedPuzzle.pieceCount }, (_, index) => (
                  <div
                    key={index}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className="aspect-square border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden"
                  >
                    {placedPieces[index] !== undefined ? (
                      <div 
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url(${selectedPuzzle.imageUrl})`,
                          backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                          backgroundPosition: `${(index % gridSize) * (100 / (gridSize - 1))}% ${Math.floor(index / gridSize) * (100 / (gridSize - 1))}%`
                        }}
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">{index + 1}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <Button
                  onClick={resetPuzzle}
                  variant="outline"
                  className="border-2 border-blue-400 text-blue-600 hover:bg-blue-100 hover:border-blue-500 font-semibold py-2 px-6 rounded-full transition-all duration-200"
                >
                  Reiniciar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Imagen de ayuda */}
          <Card className={`lg:col-span-1 bg-white/90 backdrop-blur-sm border-2 border-yellow-200 shadow-lg transition-all duration-300 ${showHelp ? 'opacity-100' : 'opacity-50'}`}>
            <CardContent className="p-4">
              <h3 className="font-bold text-center mb-3 text-yellow-700">Imagen Completa</h3>
              <div className="w-full aspect-square rounded-lg overflow-hidden shadow-md">
                <img 
                  src={selectedPuzzle.imageUrl} 
                  alt={selectedPuzzle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-600 text-center mt-2">
                Arrastra las piezas al área de construcción
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EcoPuzzle;
