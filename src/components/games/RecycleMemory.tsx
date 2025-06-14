
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EcoMascot from "@/components/EcoMascot";

interface RecycleMemoryProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface CardType {
  id: number;
  content: string;
  wasteType: string;
  flipped: boolean;
  matched: boolean;
}

interface DifficultyLevel {
  id: number;
  name: string;
  description: string;
  cardCount: number;
  theme: string;
  wasteTypes: Array<{ content: string; type: string; name: string }>;
}

const RecycleMemory = ({ onComplete, onBack }: RecycleMemoryProps) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel | null>(null);

  const difficultyLevels: DifficultyLevel[] = [
    {
      id: 1,
      name: "Fácil - Casa",
      description: "Residuos domésticos básicos",
      cardCount: 3,
      theme: "casa",
      wasteTypes: [
        { content: '🍎', type: 'organico', name: 'Manzana' },
        { content: '📄', type: 'papel', name: 'Papel' },
        { content: '🥤', type: 'plastico', name: 'Botella plástica' },
      ]
    },
    {
      id: 2,
      name: "Medio - Escuela",
      description: "Residuos escolares y educativos",
      cardCount: 5,
      theme: "escuela",
      wasteTypes: [
        { content: '📚', type: 'papel', name: 'Libro' },
        { content: '✏️', type: 'especial', name: 'Lápiz' },
        { content: '🍌', type: 'organico', name: 'Banana' },
        { content: '🥫', type: 'metal', name: 'Lata de comida' },
        { content: '🍾', type: 'vidrio', name: 'Botella de vidrio' },
      ]
    },
    {
      id: 3,
      name: "Difícil - Ciudad",
      description: "Residuos urbanos diversos",
      cardCount: 8,
      theme: "ciudad",
      wasteTypes: [
        { content: '🔋', type: 'especial', name: 'Batería' },
        { content: '💡', type: 'especial', name: 'Bombilla' },
        { content: '📦', type: 'papel', name: 'Cartón' },
        { content: '🧴', type: 'plastico', name: 'Envase plástico' },
        { content: '🍃', type: 'organico', name: 'Hojas' },
        { content: '⚙️', type: 'metal', name: 'Metal' },
        { content: '🪟', type: 'vidrio', name: 'Vidrio' },
        { content: '🩹', type: 'especial', name: 'Residuo sanitario' },
      ]
    }
  ];

  const selectLevel = (levelId: number) => {
    const level = difficultyLevels.find(l => l.id === levelId);
    if (level) {
      setSelectedLevel(levelId);
      setCurrentLevel(level);
      initializeGame(level);
    }
  };

  const initializeGame = (level: DifficultyLevel) => {
    const gameCards: CardType[] = [];
    level.wasteTypes.forEach((waste, index) => {
      gameCards.push({
        id: index * 2,
        content: waste.content,
        wasteType: waste.type,
        flipped: false,
        matched: false,
      });
      gameCards.push({
        id: index * 2 + 1,
        content: waste.content,
        wasteType: waste.type,
        flipped: false,
        matched: false,
      });
    });
    
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameComplete(false);
    setStartTime(Date.now());
  };

  const flipCard = (cardId: number) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    const newCards = cards.map(c => 
      c.id === cardId ? { ...c, flipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find(c => c.id === firstId);
      const secondCard = newCards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.content === secondCard.content) {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, matched: true }
              : c
          ));
          setMatches(matches + 1);
          setFlippedCards([]);
          
          if (matches + 1 === currentLevel!.wasteTypes.length) {
            setGameComplete(true);
          }
        }, 1000);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, flipped: false }
              : c
          ));
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  const handleComplete = () => {
    const basePoints = currentLevel!.id * 50;
    const timeBonus = Math.max(0, 120 - Math.floor((Date.now() - startTime) / 1000));
    const moveBonus = Math.max(0, 30 - moves);
    const totalPoints = basePoints + timeBonus + moveBonus;
    onComplete(totalPoints);
  };

  const resetGame = () => {
    if (currentLevel) {
      initializeGame(currentLevel);
    }
  };

  const backToLevels = () => {
    setSelectedLevel(null);
    setCurrentLevel(null);
    setCards([]);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameComplete(false);
  };

  const getWasteColor = (wasteType: string) => {
    switch (wasteType) {
      case 'organico': return 'from-green-300 to-green-400';
      case 'papel': return 'from-blue-300 to-blue-400';
      case 'plastico': return 'from-yellow-300 to-yellow-400';
      case 'vidrio': return 'from-teal-300 to-teal-400';
      case 'metal': return 'from-gray-300 to-gray-400';
      case 'especial': return 'from-red-300 to-red-400';
      default: return 'from-gray-200 to-gray-300';
    }
  };

  const getLevelBackground = (theme: string) => {
    switch (theme) {
      case 'casa': return 'from-pink-100 to-purple-100';
      case 'escuela': return 'from-blue-100 to-cyan-100';
      case 'ciudad': return 'from-gray-100 to-slate-100';
      default: return 'from-green-100 to-blue-100';
    }
  };

  // Level selection screen
  if (!selectedLevel) {
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
              <span className="font-semibold text-green-700">Memoria Reciclaje</span>
            </div>
          </div>

          <Card className="mb-6 bg-white/90 backdrop-blur-sm border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <h1 className="text-3xl font-bold text-green-700 mb-4">Elige tu Nivel</h1>
              <p className="text-gray-600">Cada nivel tiene diferentes tipos de residuos para aprender</p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            {difficultyLevels.map((level) => (
              <Card 
                key={level.id}
                className="cursor-pointer transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm border-2 border-green-200 hover:border-green-400 shadow-lg hover:shadow-xl"
                onClick={() => selectLevel(level.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">
                    {level.theme === 'casa' && '🏠'}
                    {level.theme === 'escuela' && '🏫'}
                    {level.theme === 'ciudad' && '🏙️'}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{level.name}</h3>
                  <p className="text-gray-600 mb-4">{level.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm text-blue-600">🃏 {level.cardCount} pares de cartas</p>
                    <p className="text-sm text-green-600">+{level.id * 50} puntos base</p>
                  </div>
                  <Button className="mt-4 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white">
                    Jugar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Game completion screen
  if (gameComplete) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${getLevelBackground(currentLevel!.theme)} p-4`}>
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-300 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <EcoMascot size="large" mood="excited" />
              </div>
              <h2 className="text-3xl font-bold text-green-700 mb-4">¡Excelente Memoria!</h2>
              <div className="text-6xl mb-4">♻️</div>
              <p className="text-xl text-gray-700 mb-2">
                ¡Completaste el nivel {currentLevel!.name}!
              </p>
              <p className="text-lg text-blue-600 mb-2">
                Intentos: {moves}
              </p>
              <p className="text-lg text-green-600 mb-6">
                Tiempo: {Math.floor((Date.now() - startTime) / 1000)} segundos
              </p>
              <div className="bg-yellow-100 p-4 rounded-lg mb-6">
                <p className="text-yellow-800 font-semibold">
                  💡 {currentLevel!.theme === 'casa' && '¡Separar residuos en casa es el primer paso para cuidar el planeta!'}
                  {currentLevel!.theme === 'escuela' && '¡En la escuela aprendemos a ser responsables con nuestros residuos!'}
                  {currentLevel!.theme === 'ciudad' && '¡Una ciudad limpia es responsabilidad de todos sus habitantes!'}
                </p>
              </div>
              <div className="space-y-3">
                <Button 
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg"
                >
                  ¡Genial!
                </Button>
                <div className="space-x-4">
                  <Button 
                    onClick={resetGame}
                    variant="outline"
                    className="border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-full"
                  >
                    Repetir nivel
                  </Button>
                  <Button 
                    onClick={backToLevels}
                    variant="outline"
                    className="border-2 border-purple-400 text-purple-600 hover:bg-purple-50 font-semibold py-3 px-6 rounded-full"
                  >
                    Otros niveles
                  </Button>
                  <Button 
                    onClick={onBack}
                    variant="outline"
                    className="border-2 border-green-400 text-green-600 hover:bg-green-50 font-semibold py-3 px-6 rounded-full"
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
  return (
    <div className={`min-h-screen bg-gradient-to-br ${getLevelBackground(currentLevel!.theme)} p-4`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={backToLevels}
            variant="outline"
            className="border-2 border-green-400 text-green-600 hover:bg-green-50"
          >
            ← Niveles
          </Button>
          <div className="flex items-center space-x-2">
            <EcoMascot size="small" mood="thinking" />
            <span className="font-semibold text-green-700">{currentLevel!.name}</span>
          </div>
        </div>

        {/* Stats */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-600">
                Pares encontrados: {matches}/{currentLevel!.wasteTypes.length}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                Intentos: {moves}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Game Instructions */}
        <Card className="mb-6 bg-yellow-50 border-2 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-center text-yellow-800 font-semibold">
              🔍 Encuentra los pares iguales de residuos {currentLevel!.theme === 'casa' ? 'del hogar' : currentLevel!.theme === 'escuela' ? 'de la escuela' : 'de la ciudad'}
            </p>
          </CardContent>
        </Card>

        {/* Memory Grid */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
          <CardContent className="p-6">
            <div className={`grid gap-3 max-w-lg mx-auto ${
              currentLevel!.cardCount === 3 ? 'grid-cols-3' :
              currentLevel!.cardCount === 5 ? 'grid-cols-4' :
              'grid-cols-4'
            }`}>
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => flipCard(card.id)}
                  className={`
                    aspect-square flex items-center justify-center text-2xl font-bold rounded-lg shadow-md cursor-pointer transition-all duration-300
                    ${card.matched 
                      ? `bg-gradient-to-br ${getWasteColor(card.wasteType)} border-2 border-green-400 scale-95` 
                      : card.flipped
                      ? `bg-gradient-to-br ${getWasteColor(card.wasteType)} border-2 border-blue-400`
                      : 'bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-400 hover:from-gray-300 hover:to-gray-400 hover:scale-105'
                    }
                  `}
                >
                  {card.flipped || card.matched ? card.content : '?'}
                </div>
              ))}
            </div>

            <div className="text-center mt-6 space-x-4">
              <Button
                onClick={resetGame}
                variant="outline"
                className="border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-full"
              >
                Reiniciar
              </Button>
              <Button
                onClick={backToLevels}
                variant="outline"
                className="border-2 border-purple-400 text-purple-600 hover:bg-purple-50 font-semibold py-2 px-6 rounded-full"
              >
                Cambiar nivel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecycleMemory;
