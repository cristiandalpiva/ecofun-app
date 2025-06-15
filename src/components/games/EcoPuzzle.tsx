import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Pause, Play } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface EcoPuzzleProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Piece {
  id: number;
  isLocked: boolean;
}

interface PuzzleLevel {
  index: number;
  image: string;
  totalPieces: number;
}

const EcoPuzzle = ({ onComplete, onBack }: EcoPuzzleProps) => {
  const [puzzles, setPuzzles] = useState([
    {
      index: 0,
      image: "/images/eco-puzzle/forest.jpg",
      totalPieces: 9,
    },
    {
      index: 1,
      image: "/images/eco-puzzle/lake.jpg",
      totalPieces: 9,
    },
    {
      index: 2,
      image: "/images/eco-puzzle/recycle.jpg",
      totalPieces: 9,
    },
    {
      index: 3,
      image: "/images/eco-puzzle/solar.jpg",
      totalPieces: 9,
    },
  ]);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [slots, setSlots<(Piece | null)[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedPieceId, setSelectedPieceId] = useState<number | null>(null);

  useEffect(() => {
    if (gameStarted && !isComplete) {
      const intervalId = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [gameStarted, isComplete]);

  const puzzleGridSize = Math.sqrt(puzzles[currentPuzzleIndex].totalPieces);

  const initializePuzzle = () => {
    setGameStarted(true);
    const selectedLevel = puzzles[currentPuzzleIndex];
    const newPieces: Piece[] = [];
    for (let i = 0; i < selectedLevel.totalPieces; i++) {
      newPieces.push({
        id: i + 1,
        isLocked: false,
      });
    }

    const shuffledPieces = [...newPieces].sort(() => Math.random() - 0.5);
    
    setPieces(shuffledPieces);
    setSlots(Array(selectedLevel.totalPieces).fill(null));
    setIsComplete(false);
    setMoves(0);
    setTimeElapsed(0);
  };
  
  useEffect(() => {
    if (slots.length > 0 && slots.every(slot => slot !== null)) {
      setIsComplete(true);
    }
  }, [slots]);

  const handlePieceClick = (piece: Piece) => {
    if (isComplete || piece.isLocked) return;
    setSelectedPieceId(prevId => (prevId === piece.id ? null : piece.id));
  };

  const handleSlotClick = (slotIndex: number) => {
    if (isComplete || !selectedPieceId || slots[slotIndex]) return;

    const pieceToPlace = pieces.find(p => p.id === selectedPieceId);

    if (pieceToPlace) {
      if (pieceToPlace.id === slotIndex + 1) { // Correct piece
        const newSlots = [...slots];
        newSlots[slotIndex] = pieceToPlace;
        setSlots(newSlots);

        setPieces(prevPieces =>
          prevPieces.map(p =>
            p.id === selectedPieceId ? { ...p, isLocked: true } : p
          )
        );

        setSelectedPieceId(null);
        setMoves(m => m + 1);
      } else { // Wrong piece
        toast({
          title: "¡Pieza incorrecta!",
          description: "Esta pieza no va aquí.",
          variant: "destructive",
        });
        setSelectedPieceId(null); // Deselect on wrong move
      }
    }
  };

  const getPieceStyle = (piece: Piece) => {
    const puzzle = puzzles[currentPuzzleIndex];
    const gridSize = Math.sqrt(puzzle.totalPieces);
    return {
      width: '100%',
      paddingBottom: '100%',
      backgroundImage: `url(${puzzle.image})`,
      backgroundSize: `${gridSize * 100}%`,
      backgroundPosition: `${((piece.id - 1) % gridSize) * (100 / (gridSize - 1))}% ${Math.floor((piece.id - 1) / gridSize) * (100 / (gridSize - 1))}%`,
    };
  };

  const handleComplete = () => {
    const timeBonus = Math.max(0, 300 - timeElapsed);
    const moveBonus = Math.max(0, 100 - moves);
    const totalPoints = 50 + timeBonus + moveBonus;
    onComplete(totalPoints);
  };

 return (
   <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
     <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl border-2 border-gray-200">
       <CardContent className="p-6">
         <div className="flex items-center justify-between mb-6">
           <Button onClick={onBack} variant="outline">
             <ArrowLeft className="w-4 h-4 mr-2" />
             Volver
           </Button>
           <h1 className="text-2xl font-bold text-emerald-700">
             Rompecabezas Ecológico
           </h1>
           <div className="space-x-2">
             <Button
               onClick={() => setGameStarted(false)}
               variant="outline"
               size="sm"
             >
               <RotateCcw className="w-4 h-4 mr-2" />
               Reiniciar
             </Button>
             <Button
               onClick={() => setGameStarted(!gameStarted)}
               variant="outline"
               size="sm"
             >
               {gameStarted ? (
                 <>
                   <Pause className="w-4 h-4 mr-2" />
                   Pausar
                 </>
               ) : (
                 <>
                   <Play className="w-4 h-4 mr-2" />
                   Comenzar
                 </>
               )}
             </Button>
           </div>
         </div>

         {isComplete ? (
           <div className="text-center">
             <h2 className="text-2xl font-bold text-green-700 mb-4">
               ¡Rompecabezas Completado!
             </h2>
             <p className="text-gray-600 mb-2">
               ¡Felicitaciones! Has completado el rompecabezas en {moves} movimientos
               y {timeElapsed} segundos.
             </p>
             <Button onClick={handleComplete} className="bg-green-500 hover:bg-green-700 text-white">
               Completar (+50pts)
             </Button>
           </div>
         ) : !gameStarted ? (
           <div className="text-center">
             <h2 className="text-xl font-semibold text-gray-700 mb-4">
               Selecciona un nivel y comienza el rompecabezas
             </h2>
             <Button onClick={initializePuzzle} className="bg-blue-500 hover:bg-blue-700 text-white">
               Comenzar Juego
             </Button>
           </div>
         ) : (
           <div className="flex flex-col lg:flex-row items-start justify-center gap-6">
             {/* Estadísticas del juego - left side */}
             <div className="order-2 lg:order-2 bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-6 shadow-2xl border-2 border-gray-300 w-full max-w-sm lg:max-w-xs">
               <h3 className="text-sm sm:text-lg font-semibold text-blue-700 mb-3 sm:mb-4 text-center">
                 🧩 Estadísticas del juego
               </h3>
               <div className="space-y-2">
                 <p className="text-xs sm:text-sm text-gray-600">
                   Movimientos: <span className="font-medium">{moves}</span>
                 </p>
                 <p className="text-xs sm:text-sm text-gray-600">
                   Tiempo: <span className="font-medium">{timeElapsed} segundos</span>
                 </p>
               </div>
             </div>
 
            {/* Piezas disponibles - left side */}
            <div className="order-1 lg:order-1 bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-6 shadow-2xl border-2 border-gray-300 w-full max-w-sm lg:max-w-xs">
              <h3 className="text-sm sm:text-lg font-semibold text-emerald-700 mb-3 sm:mb-4 text-center">
                🧩 Piezas disponibles ({pieces.filter(p => !p.isLocked).length})
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-3 gap-1">
                {pieces.map(piece =>
                  !piece.isLocked ? (
                    <div
                      key={piece.id}
                      onClick={() => handlePieceClick(piece)}
                      className={`cursor-pointer transition-all duration-200 ${selectedPieceId === piece.id ? 'ring-4 ring-blue-500 scale-110' : 'hover:scale-110'}`}
                      style={getPieceStyle(piece)}
                    ></div>
                  ) : (
                    <div key={piece.id} className="w-full" style={{paddingBottom: '100%'}}></div>
                  )
                )}
              </div>
              <p className="text-xs text-center text-gray-500 mt-4">Haz clic en una pieza para seleccionarla, y luego en su lugar en el tablero.</p>
            </div>
 
            {/* Tablero del rompecabezas - right side */}
             <div className="order-3 lg:order-3">
               <h3 className="text-sm sm:text-lg font-semibold text-purple-700 mb-3 sm:mb-4 text-center">
                 🧩 Tablero
               </h3>
               <div
                 className="grid gap-1 bg-gray-200 p-2 rounded-lg border-4 border-gray-400 mx-auto"
                 style={{
                   gridTemplateColumns: `repeat(${puzzleGridSize}, 1fr)`,
                   width: '100%',
                   maxWidth: `${puzzleGridSize * 80}px`,
                 }}
               >
                 {slots.map((slot, index) => (
                   <div
                     key={index}
                     onClick={() => handleSlotClick(index)}
                     className="relative bg-gray-300/70 border border-gray-400/50 cursor-pointer"
                     style={{
                       paddingBottom: '100%',
                       backgroundImage: slot
                         ? `url(${puzzles[currentPuzzleIndex].image})`
                         : 'none',
                       backgroundSize: `${puzzleGridSize * 100}%`,
                       backgroundPosition: `${
                         ((slot ? slot.id - 1 : 0) % puzzleGridSize) *
                         (100 / (puzzleGridSize - 1))
                       }% ${
                         Math.floor((slot ? slot.id - 1 : 0) / puzzleGridSize) *
                         (100 / (puzzleGridSize - 1))
                       }%`,
                     }}
                   >
                     {!slot && selectedPieceId && (
                       <div className="absolute inset-0 bg-blue-300/30 hover:bg-blue-300/50 transition-colors"></div>
                     )}
                   </div>
                 ))}
               </div>
             </div>
           </div>
         )}
       </CardContent>
     </Card>
   </div>
 );
};

export default EcoPuzzle;
