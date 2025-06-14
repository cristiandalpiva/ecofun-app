
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EcoMascot from "@/components/EcoMascot";

interface EcoPuzzleProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

const EcoPuzzle = ({ onComplete, onBack }: EcoPuzzleProps) => {
  const [puzzle, setPuzzle] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  // Initialize puzzle (3x3 grid with numbers 1-8 and empty space as 0)
  useEffect(() => {
    const initialPuzzle = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    const shuffled = shufflePuzzle([...initialPuzzle]);
    setPuzzle(shuffled);
    setStartTime(Date.now());
  }, []);

  const shufflePuzzle = (arr: number[]) => {
    const newArr = [...arr];
    for (let i = 0; i < 100; i++) {
      const emptyIndex = newArr.indexOf(0);
      const possibleMoves = getPossibleMoves(emptyIndex);
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      [newArr[emptyIndex], newArr[randomMove]] = [newArr[randomMove], newArr[emptyIndex]];
    }
    return newArr;
  };

  const getPossibleMoves = (emptyIndex: number) => {
    const moves = [];
    const row = Math.floor(emptyIndex / 3);
    const col = emptyIndex % 3;

    if (row > 0) moves.push(emptyIndex - 3); // Up
    if (row < 2) moves.push(emptyIndex + 3); // Down
    if (col > 0) moves.push(emptyIndex - 1); // Left
    if (col < 2) moves.push(emptyIndex + 1); // Right

    return moves;
  };

  const movePiece = (index: number) => {
    const emptyIndex = puzzle.indexOf(0);
    const possibleMoves = getPossibleMoves(emptyIndex);

    if (possibleMoves.includes(index)) {
      const newPuzzle = [...puzzle];
      [newPuzzle[emptyIndex], newPuzzle[index]] = [newPuzzle[index], newPuzzle[emptyIndex]];
      setPuzzle(newPuzzle);
      setMoves(moves + 1);

      // Check if solved
      const isSolved = newPuzzle.every((num, idx) => num === (idx + 1) % 9);
      if (isSolved) {
        setSolved(true);
      }
    }
  };

  const handleComplete = () => {
    const timeBonus = Math.max(0, 60 - Math.floor((Date.now() - startTime) / 1000));
    const moveBonus = Math.max(0, 50 - moves);
    const totalPoints = 100 + timeBonus + moveBonus;
    onComplete(totalPoints);
  };

  const resetPuzzle = () => {
    const initialPuzzle = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    const shuffled = shufflePuzzle([...initialPuzzle]);
    setPuzzle(shuffled);
    setMoves(0);
    setSolved(false);
    setStartTime(Date.now());
  };

  const pieceEmojis = ['', '🌱', '🌳', '🌍', '💧', '☀️', '🦋', '🌺', '🌿'];

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
              <div className="text-6xl mb-4">🧩</div>
              <p className="text-xl text-gray-700 mb-2">
                ¡Armaste el paisaje ecológico!
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
                <Button 
                  onClick={resetPuzzle}
                  variant="outline"
                  className="border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full mr-4"
                >
                  Jugar de nuevo
                </Button>
                <Button 
                  onClick={onBack}
                  variant="outline"
                  className="border-2 border-green-400 text-green-600 hover:bg-green-50 font-semibold py-3 px-8 rounded-full"
                >
                  Volver al inicio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
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
            <span className="font-semibold text-green-700">Puzzle Verde</span>
          </div>
        </div>

        {/* Stats */}
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

        {/* Puzzle Grid */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Arma el paisaje natural
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Toca las piezas para moverlas al espacio vacío
            </p>
            
            <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto mb-6">
              {puzzle.map((piece, index) => (
                <div
                  key={index}
                  onClick={() => movePiece(index)}
                  className={`
                    aspect-square flex items-center justify-center text-4xl font-bold rounded-lg shadow-md cursor-pointer transition-all duration-200
                    ${piece === 0 
                      ? 'bg-gray-200 border-2 border-dashed border-gray-400' 
                      : 'bg-gradient-to-br from-green-200 to-blue-200 hover:from-green-300 hover:to-blue-300 border-2 border-green-300 hover:scale-105'
                    }
                  `}
                >
                  {piece === 0 ? '' : pieceEmojis[piece]}
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
