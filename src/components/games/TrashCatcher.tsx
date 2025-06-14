import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Timer, Star, Heart } from "lucide-react";

interface TrashCatcherProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface TrashItem {
  id: number;
  x: number;
  y: number;
  type: string;
  emoji: string;
  points: number;
  color: string;
}

interface Basket {
  x: number;
  width: number;
}

const TrashCatcher = ({ onComplete, onBack }: TrashCatcherProps) => {
  const [trashItems, setTrashItems] = useState<TrashItem[]>([]);
  const [basket, setBasket] = useState<Basket>({ x: 50, width: 12 });
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [itemsCaught, setItemsCaught] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const trashTypes = [
    { type: "plastic", emoji: "🥤", points: 10, color: "text-blue-500" },
    { type: "paper", emoji: "📄", points: 8, color: "text-yellow-500" },
    { type: "glass", emoji: "🍾", points: 15, color: "text-green-500" },
    { type: "metal", emoji: "🥫", points: 12, color: "text-gray-500" },
    { type: "organic", emoji: "🍌", points: 5, color: "text-brown-500" },
    { type: "battery", emoji: "🔋", points: 20, color: "text-red-500" },
  ];

  const generateTrash = useCallback(() => {
    const randomTrash = trashTypes[Math.floor(Math.random() * trashTypes.length)];
    const newTrash: TrashItem = {
      id: Date.now() + Math.random(),
      x: Math.random() * 90 + 5, // 5% to 95% of container width
      y: -5, // Start above the screen
      ...randomTrash
    };
    return newTrash;
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setScore(0);
    setLives(3);
    setItemsCaught(0);
    setTimeLeft(60);
    setTrashItems([]);
    setBasket({ x: 50, width: 12 });
  };

  const moveBasket = useCallback((direction: 'left' | 'right') => {
    setBasket(prev => ({
      ...prev,
      x: Math.max(6, Math.min(94 - prev.width, prev.x + (direction === 'left' ? -8 : 8)))
    }));
  }, []);

  // Touch controls for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX || !gameStarted || gameEnded) return;
    
    const touchCurrentX = e.touches[0].clientX;
    const diff = touchCurrentX - touchStartX;
    
    // Only move if significant swipe
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        moveBasket('right');
      } else {
        moveBasket('left');
      }
      setTouchStartX(touchCurrentX);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted || gameEnded) return;
      
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        moveBasket('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        moveBasket('right');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameEnded, moveBasket]);

  // Game timer
  useEffect(() => {
    if (gameStarted && !gameEnded && timeLeft > 0 && lives > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 || lives === 0) {
      setGameEnded(true);
    }
  }, [gameStarted, gameEnded, timeLeft, lives]);

  // Generate trash items
  useEffect(() => {
    if (gameStarted && !gameEnded) {
      const interval = setInterval(() => {
        if (Math.random() > 0.3) { // 70% chance to spawn trash
          setTrashItems(prev => [...prev, generateTrash()]);
        }
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameEnded, generateTrash]);

  // Move trash items down and check collisions
  useEffect(() => {
    if (gameStarted && !gameEnded) {
      const interval = setInterval(() => {
        setTrashItems(prev => {
          const updated = prev.map(item => ({ ...item, y: item.y + 2 }));
          
          // Check collisions with basket
          const { caught, remaining } = updated.reduce((acc, item) => {
            if (
              item.y >= 85 && item.y <= 95 && // Basket height range
              item.x >= basket.x && item.x <= basket.x + basket.width
            ) {
              acc.caught.push(item);
            } else if (item.y <= 100) { // Still on screen
              acc.remaining.push(item);
            } else {
              // Item fell off screen - lose a life
              setLives(l => l - 1);
            }
            return acc;
          }, { caught: [] as TrashItem[], remaining: [] as TrashItem[] });

          // Update score for caught items
          if (caught.length > 0) {
            const pointsGained = caught.reduce((sum, item) => sum + item.points, 0);
            setScore(s => s + pointsGained);
            setItemsCaught(c => c + caught.length);
          }

          return remaining;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameEnded, basket]);

  // End game and calculate final points
  useEffect(() => {
    if (gameEnded) {
      const finalPoints = Math.floor(score / 3); // Convert score to eco points
      setTimeout(() => onComplete(finalPoints), 2000);
    }
  }, [gameEnded, score, onComplete]);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-50 to-emerald-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <Button
                onClick={onBack}
                variant="outline"
                className="absolute top-4 left-4 border-gray-400"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>

              <div className="text-6xl mb-6">🗑️</div>
              <h1 className="text-3xl font-bold text-amber-700 mb-4">
                Atrapa la Basura
              </h1>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                ¡La basura está cayendo del cielo! Mueve tu canasta de reciclaje 
                para atrapar todos los desechos y mantener limpio el planeta.
              </p>
              
              <div className="bg-amber-100 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-amber-800 mb-2">Instrucciones:</h3>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li>• En computadora: Usa las flechas ← → o las teclas A/D</li>
                  <li>• En móvil: Desliza tu dedo izquierda/derecha en la pantalla</li>
                  <li>• Cada tipo de basura da diferentes puntos</li>
                  <li>• Si se te cae basura, pierdes una vida ❤️</li>
                  <li>• ¡Tienes 60 segundos y 3 vidas!</li>
                </ul>
              </div>

              <Button
                onClick={startGame}
                className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg"
              >
                ¡Empezar a Reciclar!
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-50 to-emerald-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-6">♻️</div>
              <h1 className="text-3xl font-bold text-emerald-700 mb-4">
                ¡Excelente Reciclaje!
              </h1>
              
              <div className="space-y-4 mb-6">
                <div className="bg-amber-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-800">{score} puntos</div>
                  <div className="text-amber-600">Puntuación Total</div>
                </div>
                
                <div className="bg-emerald-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-800">{itemsCaught} elementos</div>
                  <div className="text-emerald-600">Basura Reciclada</div>
                </div>
                
                <div className="bg-green-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-800">+{Math.floor(score / 3)} pts</div>
                  <div className="text-green-600">Puntos Ecológicos Ganados</div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                ¡Fantástico! Reciclaste {itemsCaught} elementos y ayudaste a mantener 
                el planeta limpio. ¡Cada pieza de basura reciclada marca la diferencia! 🌍
              </p>

              <Button
                onClick={onBack}
                className="bg-gradient-to-r from-emerald-400 to-green-400 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-3 px-8 rounded-full text-lg"
              >
                ¡Continuar Explorando!
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with stats */}
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-gray-400"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Salir
          </Button>
          
          <div className="flex space-x-4">
            <div className="bg-white/80 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-800">{score}</span>
            </div>
            
            <div className="bg-white/80 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Trash2 className="w-5 h-5 text-emerald-500" />
              <span className="font-bold text-gray-800">{itemsCaught}</span>
            </div>
            
            <div className="bg-white/80 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="font-bold text-gray-800">{lives}</span>
            </div>
            
            <div className="bg-white/80 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Timer className="w-5 h-5 text-purple-500" />
              <span className="font-bold text-gray-800">{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Game area */}
        <Card 
          className="bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-amber-200 shadow-xl h-96 relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <CardContent className="p-0 h-full relative">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-green-200 opacity-30"></div>
            
            {/* Falling trash items */}
            {trashItems.map((item) => (
              <div
                key={item.id}
                className={`absolute text-2xl ${item.color} transition-all duration-75`}
                style={{ 
                  left: `${item.x}%`, 
                  top: `${item.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {item.emoji}
              </div>
            ))}
            
            {/* Realistic Basket */}
            <div
              className="absolute bottom-4 transition-all duration-200"
              style={{ 
                left: `${basket.x}%`, 
                width: `${basket.width}%`,
                height: '40px',
                transform: 'translateX(-50%)'
              }}
            >
              {/* Basket body */}
              <div className="relative w-full h-full">
                {/* Basket rim */}
                <div className="absolute top-0 w-full h-2 bg-amber-800 rounded-full shadow-md"></div>
                {/* Basket main body */}
                <div className="absolute top-1 w-full h-full bg-gradient-to-b from-amber-600 to-amber-700 rounded-b-2xl shadow-lg border-2 border-amber-800">
                  {/* Basket weave pattern */}
                  <div className="absolute inset-2 opacity-30">
                    <div className="grid grid-cols-4 gap-1 h-full">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-amber-900 rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                  {/* Basket handles */}
                  <div className="absolute -left-2 top-2 w-2 h-4 bg-amber-800 rounded-full"></div>
                  <div className="absolute -right-2 top-2 w-2 h-4 bg-amber-800 rounded-full"></div>
                </div>
                {/* Basket shadow */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-black/20 rounded-full blur-sm"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 text-center space-y-2">
          <p className="text-amber-700 font-medium">
            💻 Usa las flechas ← → o A/D • 📱 Desliza izquierda/derecha
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="bg-white/80 px-2 py-1 rounded">🥤 = 10pts</span>
            <span className="bg-white/80 px-2 py-1 rounded">📄 = 8pts</span>
            <span className="bg-white/80 px-2 py-1 rounded">🍾 = 15pts</span>
            <span className="bg-white/80 px-2 py-1 rounded">🔋 = 20pts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrashCatcher;
