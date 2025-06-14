
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
}

const EcoPuzzle = ({ onComplete, onBack }: EcoPuzzleProps) => {
  const [selectedPuzzle, setSelectedPuzzle] = useState<PuzzleOption | null>(null);
  const [puzzle, setPuzzle] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  const puzzleOptions: PuzzleOption[] = [
    {
      id: 'forest',
      title: 'Bosque Tropical',
      description: 'Arma este hermoso bosque lleno de vida',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&crop=center',
      difficulty: 'easy',
      pieceCount: 9
    },
    {
      id: 'ocean',
      title: 'Océano Cristalino',
      description: 'Descubre las maravillas del mar limpio',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop&crop=center',
      difficulty: 'medium',
      pieceCount: 16
    },
    {
      id: 'mountains',
      title: 'Montañas Verdes',
      description: 'Explora paisajes montañosos preservados',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center',
      difficulty: 'easy',
      pieceCount: 9
    },
    {
      id: 'garden',
      title: 'Jardín de Flores',
      description: 'Crea tu propio jardín lleno de colores',
      imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&crop=center',
      difficulty: 'medium',
      pieceCount: 16
    },
    {
      id: 'waterfall',
      title: 'Cascada Natural',
      description: 'Arma esta hermosa cascada en la naturaleza',
      imageUrl: 'https://images.unsplash.com/photo-1432889490240-84df33d47091?w=400&h=400&fit=crop&crop=center',
      difficulty: 'hard',
      pieceCount: 25
    },
    {
      id: 'wildlife',
      title: 'Vida Silvestre',
      description: 'Conoce a los animales en su hábitat',
      imageUrl: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=400&fit=crop&crop=center',
      difficulty: 'medium',
      pieceCount: 16
    },
    {
      id: 'farm',
      title: 'Granja Ecológica',
      description: 'Descubre una granja que cuida el ambiente',
      imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=400&fit=crop&crop=center',
      difficulty: 'easy',
      pieceCount: 9
    },
    {
      id: 'solar',
      title: 'Energía Solar',
      description: 'Aprende sobre energía limpia del sol',
      imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=400&fit=crop&crop=center',
      difficulty: 'medium',
      pieceCount: 16
    },
    {
      id: 'recycling',
      title: 'Centro de Reciclaje',
      description: 'Organiza el reciclaje para cuidar el planeta',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=400&fit=crop&crop=center',
      difficulty: 'hard',
      pieceCount: 25
    },
    {
      id: 'polar',
      title: 'Glaciar Ártico',
      description: 'Protege el hogar de los osos polares',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
      difficulty: 'hard',
      pieceCount: 25
    }
  ];

  const initializePuzzle = (puzzleOption: PuzzleOption) => {
    // Crear array ordenado de números (0 será el espacio vacío)
    const orderedPieces = Array.from({ length: puzzleOption.pieceCount }, (_, i) => i + 1);
    orderedPieces.push(0); // Agregar espacio vacío
    
    // Desordenar las piezas
    const shuffled = shufflePuzzle([...orderedPieces], puzzleOption.pieceCount);
    setPuzzle(shuffled);
    setStartTime(Date.now());
    setMoves(0);
    setSolved(false);
  };

  const shufflePuzzle = (arr: number[], totalPieces: number) => {
    const newArr = [...arr];
    const gridSize = Math.sqrt(totalPieces + 1);
    
    // Hacer movimientos válidos aleatorios para asegurar que el puzzle sea resoluble
    for (let i = 0; i < 200; i++) {
      const emptyIndex = newArr.indexOf(0);
      const possibleMoves = getPossibleMoves(emptyIndex, gridSize);
      if (possibleMoves.length > 0) {
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        [newArr[emptyIndex], newArr[randomMove]] = [newArr[randomMove], newArr[emptyIndex]];
      }
    }
    return newArr;
  };

  const getPossibleMoves = (emptyIndex: number, gridSize: number) => {
    const moves = [];
    const row = Math.floor(emptyIndex / gridSize);
    const col = emptyIndex % gridSize;

    if (row > 0) moves.push(emptyIndex - gridSize); // Arriba
    if (row < gridSize - 1) moves.push(emptyIndex + gridSize); // Abajo
    if (col > 0) moves.push(emptyIndex - 1); // Izquierda
    if (col < gridSize - 1) moves.push(emptyIndex + 1); // Derecha

    return moves;
  };

  const movePiece = (index: number) => {
    if (!selectedPuzzle) return;
    
    const emptyIndex = puzzle.indexOf(0);
    const gridSize = Math.sqrt(selectedPuzzle.pieceCount + 1);
    const possibleMoves = getPossibleMoves(emptyIndex, gridSize);

    if (possibleMoves.includes(index)) {
      const newPuzzle = [...puzzle];
      [newPuzzle[emptyIndex], newPuzzle[index]] = [newPuzzle[index], newPuzzle[emptyIndex]];
      setPuzzle(newPuzzle);
      setMoves(moves + 1);

      // Verificar si está resuelto
      const isComplete = newPuzzle.every((piece, idx) => {
        if (idx === newPuzzle.length - 1) return piece === 0; // Último debe ser espacio vacío
        return piece === idx + 1;
      });
      
      if (isComplete) {
        setSolved(true);
      }
    }
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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">🧩 Puzzle Fotográfico 🧩</h2>
              <p className="text-gray-600">Elige una imagen de la naturaleza para armar</p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {puzzleOptions.map((option) => (
              <Card 
                key={option.id}
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-gray-200 hover:border-green-400 shadow-lg bg-white/95 hover:bg-white group"
                onClick={() => {
                  setSelectedPuzzle(option);
                  initializePuzzle(option);
                }}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-full h-32 mb-4 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <img 
                      src={option.imageUrl} 
                      alt={option.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-green-700 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                  <div className="flex justify-center space-x-2">
                    <Badge className={`${getDifficultyColor(option.difficulty)} border`}>
                      {option.pieceCount} piezas
                    </Badge>
                    <Badge variant="outline" className="border-blue-300 text-blue-700">
                      {option.difficulty === 'easy' ? 'Fácil' : option.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de puzzle completado
  if (solved) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-green-300 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <EcoMascot size="large" mood="excited" />
              </div>
              <h2 className="text-3xl font-bold text-green-700 mb-4">¡Puzzle Completado!</h2>
              <div className="w-48 h-48 mx-auto mb-4 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={selectedPuzzle.imageUrl} 
                  alt={selectedPuzzle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xl text-gray-700 mb-2">
                ¡Armaste {selectedPuzzle.title}!
              </p>
              <p className="text-lg text-blue-600 mb-2">
                Movimientos: {moves}
              </p>
              <p className="text-lg text-green-600 mb-6">
                Tiempo: {Math.floor((Date.now() - startTime) / 1000)} segundos
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  ¡Genial!
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
                    Otro puzzle
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
  const gridSize = Math.sqrt(selectedPuzzle.pieceCount + 1);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={() => setSelectedPuzzle(null)}
            variant="outline"
            className="border-2 border-green-400 text-green-600 hover:bg-green-100 hover:border-green-500 transition-all duration-200"
          >
            ← Cambiar puzzle
          </Button>
          <div className="flex items-center space-x-2">
            <EcoMascot size="small" mood="thinking" />
            <span className="font-semibold text-green-700">{selectedPuzzle.title}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Imagen de referencia */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-bold text-center mb-3 text-blue-700">Imagen completa</h3>
              <div className="w-full aspect-square rounded-lg overflow-hidden shadow-md">
                <img 
                  src={selectedPuzzle.imageUrl} 
                  alt={selectedPuzzle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Puzzle jugable */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-gray-600">
                  Movimientos: {moves}
                </span>
                <span className="text-sm font-semibold text-blue-600">
                  Tiempo: {Math.floor((Date.now() - startTime) / 1000)}s
                </span>
              </div>
              
              <div 
                className="grid gap-1 w-full aspect-square mx-auto mb-4"
                style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
              >
                {puzzle.map((piece, index) => (
                  <div
                    key={index}
                    onClick={() => movePiece(index)}
                    className={`
                      aspect-square flex items-center justify-center font-bold rounded cursor-pointer transition-all duration-200 border-2
                      ${piece === 0 
                        ? 'bg-gray-100 border-dashed border-gray-400' 
                        : 'bg-white border-green-300 hover:border-green-500 hover:scale-105 hover:shadow-lg hover:bg-green-50'
                      }
                    `}
                    style={{
                      backgroundImage: piece === 0 ? 'none' : `url(${selectedPuzzle.imageUrl})`,
                      backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                      backgroundPosition: piece === 0 ? '0 0' : `${((piece - 1) % gridSize) * (100 / (gridSize - 1))}% ${Math.floor((piece - 1) / gridSize) * (100 / (gridSize - 1))}%`
                    }}
                  >
                    {piece === 0 && (
                      <div className="text-gray-400 text-xs">Vacío</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center">
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
        </div>
      </div>
    </div>
  );
};

export default EcoPuzzle;
