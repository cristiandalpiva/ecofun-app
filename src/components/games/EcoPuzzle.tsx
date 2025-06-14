
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
  emoji: string;
  pieces: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  pieceCount: number;
}

const EcoPuzzle = ({ onComplete, onBack }: EcoPuzzleProps) => {
  const [selectedPuzzle, setSelectedPuzzle] = useState<PuzzleOption | null>(null);
  const [puzzle, setPuzzle] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  const puzzleOptions: PuzzleOption[] = [
    {
      id: 'forest',
      title: 'Bosque Mágico',
      description: 'Arma un hermoso bosque lleno de vida',
      emoji: '🌲',
      pieces: ['🌲', '🌳', '🦋', '🐿️', '🍄', '🌸', '🌿', '🦆', '☀️', '🌻'],
      difficulty: 'easy',
      pieceCount: 10
    },
    {
      id: 'ocean',
      title: 'Océano Limpio',
      description: 'Descubre las maravillas del mar sin contaminación',
      emoji: '🌊',
      pieces: ['🌊', '🐠', '🐙', '🐚', '⭐', '🪸', '🦀', '🐟', '🐡', '🦈', '🌊', '🐠', '🐙', '🐚', '⭐'],
      difficulty: 'medium',
      pieceCount: 15
    },
    {
      id: 'garden',
      title: 'Jardín Ecológico',
      description: 'Crea tu propio jardín sustentable',
      emoji: '🌺',
      pieces: ['🌺', '🌻', '🌷', '🌹', '🐝', '🦋', '🌿', '🪴', '🌱', '☀️'],
      difficulty: 'easy',
      pieceCount: 10
    },
    {
      id: 'renewable',
      title: 'Energías Verdes',
      description: 'Aprende sobre energías renovables',
      emoji: '💨',
      pieces: ['💨', '☀️', '⚡', '🔋', '🏭', '🌱', '💧', '🌍', '🔌', '♻️', '💨', '☀️', '⚡', '🔋', '🏭'],
      difficulty: 'medium',
      pieceCount: 15
    },
    {
      id: 'recycling',
      title: 'Centro de Reciclaje',
      description: 'Organiza una planta de reciclaje eficiente',
      emoji: '♻️',
      pieces: ['♻️', '🗑️', '📦', '🥫', '🍾', '📄', '🔄', '🌱', '🌍', '✨', '♻️', '🗑️', '📦', '🥫', '🍾', '📄', '🔄', '🌱', '🌍', '✨'],
      difficulty: 'hard',
      pieceCount: 20
    },
    {
      id: 'wildlife',
      title: 'Vida Silvestre',
      description: 'Protege a los animales en su hábitat natural',
      emoji: '🦁',
      pieces: ['🦁', '🐘', '🦒', '🐼', '🐯', '🦜', '🌳', '🌿', '🌺', '☀️', '🦁', '🐘', '🦒', '🐼', '🐯'],
      difficulty: 'medium',
      pieceCount: 15
    },
    {
      id: 'mountains',
      title: 'Montañas Verdes',
      description: 'Explora paisajes montañosos preservados',
      emoji: '⛰️',
      pieces: ['⛰️', '🏔️', '🌲', '🦅', '🌤️', '🏞️', '🌿', '🍃', '💧', '🌸'],
      difficulty: 'easy',
      pieceCount: 10
    },
    {
      id: 'farm',
      title: 'Granja Sostenible',
      description: 'Conoce una granja que cuida el medio ambiente',
      emoji: '🚜',
      pieces: ['🚜', '🌾', '🐄', '🐷', '🐔', '🌻', '🌽', '🥕', '🍅', '🏡', '🚜', '🌾', '🐄', '🐷', '🐔', '🌻', '🌽', '🥕', '🍅', '🏡'],
      difficulty: 'hard',
      pieceCount: 20
    },
    {
      id: 'city',
      title: 'Ciudad Verde',
      description: 'Construye una ciudad ecológica del futuro',
      emoji: '🏙️',
      pieces: ['🏙️', '🌳', '🚲', '🚌', '⚡', '🌱', '♻️', '💡', '🌍', '🌿', '🏙️', '🌳', '🚲', '🚌', '⚡'],
      difficulty: 'medium',
      pieceCount: 15
    },
    {
      id: 'polar',
      title: 'Polo Norte',
      description: 'Salva el hogar de los osos polares del calentamiento',
      emoji: '🐻‍❄️',
      pieces: ['🐻‍❄️', '🧊', '❄️', '🐧', '🐋', '🌨️', '🗻', '🌊', '🐟', '⭐', '🐻‍❄️', '🧊', '❄️', '🐧', '🐋', '🌨️', '🗻', '🌊', '🐟', '⭐'],
      difficulty: 'hard',
      pieceCount: 20
    }
  ];

  const initializePuzzle = (puzzleOption: PuzzleOption) => {
    const pieces = [...puzzleOption.pieces];
    // Add empty space
    pieces.push('');
    
    // Shuffle puzzle
    const shuffled = shufflePuzzle([...pieces]);
    setPuzzle(shuffled);
    setStartTime(Date.now());
    setMoves(0);
    setSolved(false);
  };

  const shufflePuzzle = (arr: string[]) => {
    const newArr = [...arr];
    for (let i = 0; i < 100; i++) {
      const emptyIndex = newArr.indexOf('');
      const possibleMoves = getPossibleMoves(emptyIndex, selectedPuzzle!.pieceCount);
      if (possibleMoves.length > 0) {
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        [newArr[emptyIndex], newArr[randomMove]] = [newArr[randomMove], newArr[emptyIndex]];
      }
    }
    return newArr;
  };

  const getPossibleMoves = (emptyIndex: number, totalPieces: number) => {
    const moves = [];
    const gridSize = Math.ceil(Math.sqrt(totalPieces + 1));
    const row = Math.floor(emptyIndex / gridSize);
    const col = emptyIndex % gridSize;

    if (row > 0) moves.push(emptyIndex - gridSize); // Up
    if (row < gridSize - 1) moves.push(emptyIndex + gridSize); // Down
    if (col > 0) moves.push(emptyIndex - 1); // Left
    if (col < gridSize - 1) moves.push(emptyIndex + 1); // Right

    return moves.filter(index => index < totalPieces + 1);
  };

  const movePiece = (index: number) => {
    if (!selectedPuzzle) return;
    
    const emptyIndex = puzzle.indexOf('');
    const possibleMoves = getPossibleMoves(emptyIndex, selectedPuzzle.pieceCount);

    if (possibleMoves.includes(index)) {
      const newPuzzle = [...puzzle];
      [newPuzzle[emptyIndex], newPuzzle[index]] = [newPuzzle[index], newPuzzle[emptyIndex]];
      setPuzzle(newPuzzle);
      setMoves(moves + 1);

      // Check if solved
      const correctOrder = [...selectedPuzzle.pieces, ''];
      const isSolved = newPuzzle.every((piece, idx) => piece === correctOrder[idx]);
      if (isSolved) {
        setSolved(true);
      }
    }
  };

  const handleComplete = () => {
    if (!selectedPuzzle) return;
    
    const timeBonus = Math.max(0, 180 - Math.floor((Date.now() - startTime) / 1000));
    const moveBonus = Math.max(0, selectedPuzzle.pieceCount * 3 - moves);
    const difficultyBonus = selectedPuzzle.difficulty === 'easy' ? 50 : selectedPuzzle.difficulty === 'medium' ? 75 : 100;
    const totalPoints = difficultyBonus + timeBonus + moveBonus;
    onComplete(totalPoints);
  };

  const resetPuzzle = () => {
    if (selectedPuzzle) {
      initializePuzzle(selectedPuzzle);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Puzzle selection screen
  if (!selectedPuzzle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button 
              onClick={onBack}
              variant="outline"
              className="border-2 border-green-400 text-green-600 hover:bg-green-50"
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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">🧩 Puzzle Verde 🧩</h2>
              <p className="text-gray-600">Elige uno de estos rompecabezas educativos para armar</p>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {puzzleOptions.map((option) => (
              <Card 
                key={option.id}
                className="cursor-pointer transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-green-300 shadow-lg bg-white/90"
                onClick={() => {
                  setSelectedPuzzle(option);
                  initializePuzzle(option);
                }}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-3">{option.emoji}</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{option.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                  <div className="flex justify-center space-x-2">
                    <Badge className={getDifficultyColor(option.difficulty)}>
                      {option.pieceCount} piezas
                    </Badge>
                    <Badge variant="outline">
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

  // Puzzle solved screen
  if (solved) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-300 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <EcoMascot size="large" mood="excited" />
              </div>
              <h2 className="text-3xl font-bold text-green-700 mb-4">¡Puzzle Completado!</h2>
              <div className="text-6xl mb-4">{selectedPuzzle.emoji}</div>
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
                  className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg"
                >
                  ¡Genial!
                </Button>
                <div className="space-x-4">
                  <Button 
                    onClick={resetPuzzle}
                    variant="outline"
                    className="border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full"
                  >
                    Jugar de nuevo
                  </Button>
                  <Button 
                    onClick={() => setSelectedPuzzle(null)}
                    variant="outline"
                    className="border-2 border-purple-400 text-purple-600 hover:bg-purple-50 font-semibold py-3 px-8 rounded-full"
                  >
                    Otro puzzle
                  </Button>
                  <Button 
                    onClick={onBack}
                    variant="outline"
                    className="border-2 border-green-400 text-green-600 hover:bg-green-50 font-semibold py-3 px-8 rounded-full"
                  >
                    Volver al inicio
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Game screen
  const gridSize = Math.ceil(Math.sqrt(selectedPuzzle.pieceCount + 1));
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={() => setSelectedPuzzle(null)}
            variant="outline"
            className="border-2 border-green-400 text-green-600 hover:bg-green-50"
          >
            ← Cambiar puzzle
          </Button>
          <div className="flex items-center space-x-2">
            <EcoMascot size="small" mood="thinking" />
            <span className="font-semibold text-green-700">{selectedPuzzle.title}</span>
          </div>
        </div>

        <Card className="mb-6 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-600">
                Movimientos: {moves}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                Tiempo: {Math.floor((Date.now() - startTime) / 1000)}s
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
              {selectedPuzzle.title}
            </h2>
            <p className="text-center text-gray-600 mb-6">
              {selectedPuzzle.description}
            </p>
            
            <div 
              className={`grid gap-2 max-w-lg mx-auto mb-6`}
              style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
            >
              {puzzle.map((piece, index) => (
                <div
                  key={index}
                  onClick={() => movePiece(index)}
                  className={`
                    aspect-square flex items-center justify-center text-2xl font-bold rounded-lg shadow-md cursor-pointer transition-all duration-200
                    ${piece === '' 
                      ? 'bg-gray-200 border-2 border-dashed border-gray-400' 
                      : 'bg-gradient-to-br from-green-200 to-blue-200 hover:from-green-300 hover:to-blue-300 border-2 border-green-300 hover:scale-105'
                    }
                  `}
                >
                  {piece}
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={resetPuzzle}
                variant="outline"
                className="border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-full"
              >
                Reiniciar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EcoPuzzle;
