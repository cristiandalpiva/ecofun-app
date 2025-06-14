
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface RecycleBenchProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface RecyclableItem {
  id: number;
  type: string;
  icon: string;
  name: string;
  x: number;
  y: number;
  collected: boolean;
  points: number;
}

interface BenchPart {
  name: string;
  icon: string;
  requiredItems: { type: string; quantity: number }[];
  completed: boolean;
  description: string;
}

const RecycleBench: React.FC<RecycleBenchProps> = ({ onComplete, onBack }) => {
  const [items, setItems] = useState<RecyclableItem[]>([]);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [benchParts, setBenchParts] = useState<BenchPart[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [score, setScore] = useState(0);

  const recyclableTypes = [
    { type: 'plastic_bottle', icon: '🍶', name: 'Botella Plástica', points: 10 },
    { type: 'aluminum_can', icon: '🥤', name: 'Lata de Aluminio', points: 15 },
    { type: 'cardboard', icon: '📦', name: 'Cartón', points: 8 },
    { type: 'glass_bottle', icon: '🍾', name: 'Botella de Vidrio', points: 12 },
    { type: 'newspaper', icon: '📰', name: 'Periódico', points: 5 },
    { type: 'metal_scrap', icon: '🔩', name: 'Chatarra Metálica', points: 20 },
  ];

  const benchComponents: BenchPart[] = [
    {
      name: 'Asiento',
      icon: '🪑',
      requiredItems: [
        { type: 'plastic_bottle', quantity: 8 },
        { type: 'cardboard', quantity: 4 }
      ],
      completed: false,
      description: 'Base del asiento hecha con botellas plásticas compactadas'
    },
    {
      name: 'Respaldo',
      icon: '📐',
      requiredItems: [
        { type: 'aluminum_can', quantity: 6 },
        { type: 'metal_scrap', quantity: 2 }
      ],
      completed: false,
      description: 'Estructura del respaldo con latas y metal reciclado'
    },
    {
      name: 'Patas',
      icon: '🦵',
      requiredItems: [
        { type: 'glass_bottle', quantity: 4 },
        { type: 'metal_scrap', quantity: 3 }
      ],
      completed: false,
      description: 'Soporte resistente con vidrio y estructura metálica'
    },
    {
      name: 'Acabados',
      icon: '✨',
      requiredItems: [
        { type: 'newspaper', quantity: 10 },
        { type: 'cardboard', quantity: 3 }
      ],
      completed: false,
      description: 'Protección y decoración con papel reciclado'
    }
  ];

  useEffect(() => {
    setBenchParts(benchComponents);
    generateItems();
    setInventory({
      plastic_bottle: 0,
      aluminum_can: 0,
      cardboard: 0,
      glass_bottle: 0,
      newspaper: 0,
      metal_scrap: 0,
    });
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameComplete) {
      toast({
        title: "¡Tiempo agotado! ⏰",
        description: "No pudiste completar el banco a tiempo.",
      });
    }
  }, [timeLeft, gameComplete]);

  useEffect(() => {
    checkBenchCompletion();
  }, [inventory]);

  const generateItems = () => {
    const newItems: RecyclableItem[] = [];
    const gameArea = { width: 600, height: 400 };
    
    // Generate random items across the collection area
    for (let i = 0; i < 25; i++) {
      const randomType = recyclableTypes[Math.floor(Math.random() * recyclableTypes.length)];
      newItems.push({
        id: i,
        type: randomType.type,
        icon: randomType.icon,
        name: randomType.name,
        points: randomType.points,
        x: Math.random() * (gameArea.width - 40),
        y: Math.random() * (gameArea.height - 40),
        collected: false,
      });
    }
    
    setItems(newItems);
  };

  const collectItem = (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    if (!item || item.collected) return;

    setItems(prev => prev.map(i => 
      i.id === itemId ? { ...i, collected: true } : i
    ));

    setInventory(prev => ({
      ...prev,
      [item.type]: (prev[item.type] || 0) + 1
    }));

    setScore(prev => prev + item.points);

    toast({
      title: `¡Recogiste ${item.name}! ♻️`,
      description: `+${item.points} puntos`,
    });
  };

  const checkBenchCompletion = () => {
    const updatedParts = benchParts.map(part => {
      const canComplete = part.requiredItems.every(req => 
        (inventory[req.type] || 0) >= req.quantity
      );
      return { ...part, completed: canComplete };
    });

    setBenchParts(updatedParts);

    if (updatedParts.every(part => part.completed) && !gameComplete) {
      setGameComplete(true);
      toast({
        title: "¡Banco Completado! 🎉",
        description: "¡Creaste un hermoso banco con materiales reciclados!",
      });
    }
  };

  const buildBenchPart = (partIndex: number) => {
    const part = benchParts[partIndex];
    if (!part.completed) return;

    // Consume required materials
    const newInventory = { ...inventory };
    part.requiredItems.forEach(req => {
      newInventory[req.type] -= req.quantity;
    });
    setInventory(newInventory);

    // Mark part as built
    setBenchParts(prev => prev.map((p, i) => 
      i === partIndex ? { ...p, completed: false } : p
    ));

    setScore(prev => prev + 50);

    toast({
      title: `¡${part.name} Construido! 🔨`,
      description: `+50 puntos. ${part.description}`,
    });
  };

  const resetGame = () => {
    setItems([]);
    setInventory({
      plastic_bottle: 0,
      aluminum_can: 0,
      cardboard: 0,
      glass_bottle: 0,
      newspaper: 0,
      metal_scrap: 0,
    });
    setBenchParts(benchComponents);
    setGameComplete(false);
    setTimeLeft(180);
    setScore(0);
    generateItems();
  };

  const handleComplete = () => {
    const timeBonus = Math.floor(timeLeft / 10);
    const totalPoints = score + timeBonus + 200; // Completion bonus
    onComplete(totalPoints);
  };

  const getCompletedParts = () => {
    return benchComponents.filter((_, index) => 
      !benchParts[index].completed && 
      benchComponents[index].requiredItems.every(req => 
        (inventory[req.type] || 0) < req.quantity
      )
    ).length;
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-300 shadow-2xl">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-green-700 mb-4">¡Banco Ecológico Completado!</h2>
              <div className="text-6xl mb-4">🪑♻️</div>
              <p className="text-xl text-gray-700 mb-6">
                ¡Construiste un hermoso banco con materiales reciclados!
              </p>
              
              <div className="bg-green-100 p-6 rounded-lg mb-6 text-left">
                <h3 className="text-green-800 font-bold mb-4 text-center">🌍 ¿Por qué es importante reciclar?</h3>
                <div className="space-y-3 text-green-700">
                  <p><strong>🔄 Reutilización:</strong> Los materiales reciclados pueden tener una segunda vida útil, como este banco hecho con botellas, latas y cartón.</p>
                  <p><strong>🌳 Menos basura:</strong> Cada objeto reciclado es un objeto menos en los vertederos, reduciendo la contaminación del suelo y agua.</p>
                  <p><strong>⚡ Ahorro de energía:</strong> Reciclar aluminio usa 95% menos energía que crear aluminio nuevo desde cero.</p>
                  <p><strong>🌱 Creatividad:</strong> El reciclaje nos enseña a ser creativos y ver el potencial en objetos que otros descartan.</p>
                  <p><strong>🏛️ Espacios públicos:</strong> Bancos reciclados embellecen parques y plazas, creando espacios más acogedores para todos.</p>
                </div>
              </div>
              
              <div className="bg-blue-100 p-4 rounded-lg mb-6">
                <p className="text-blue-800 font-semibold">
                  💡 En la vida real, muchas ciudades tienen proyectos similares donde transforman residuos en mobiliario urbano, 
                  demostrando que la basura de hoy puede ser el tesoro de mañana. ¡Tú también puedes hacer la diferencia!
                </p>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg"
                >
                  ¡Completar! (+{score + Math.floor(timeLeft / 10) + 200} pts)
                </Button>
                <div className="space-x-4">
                  <Button 
                    onClick={resetGame}
                    variant="outline"
                    className="border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-full"
                  >
                    Construir otro banco
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <h1 className="text-2xl font-bold text-green-700">♻️ Banco Ecológico</h1>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">⏰ {timeLeft}s</p>
                <p className="text-sm text-green-600">Puntos: {score}</p>
                <Button variant="outline" size="sm" onClick={resetGame}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Instructions */}
            <Card className="mb-6 bg-yellow-50 border-2 border-yellow-200">
              <CardContent className="p-4 text-center">
                <p className="text-yellow-800 font-semibold">
                  🏗️ Recolecta materiales reciclados de la plaza y construye un banco ecológico
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Collection Area */}
              <div className="lg:col-span-3">
                <Card className="bg-gradient-to-b from-green-50 to-blue-50 border-2 border-green-300">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-green-700 mb-4">🗂️ Área de Recolección - Plaza de la Ciudad</h3>
                    <div 
                      className="relative w-full h-96 bg-gradient-to-br from-green-200 to-blue-200 border-2 border-dashed border-green-400 rounded-lg overflow-hidden"
                      style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)' }}
                    >
                      {/* Decorative elements */}
                      <div className="absolute top-4 left-4 text-2xl">🌳</div>
                      <div className="absolute top-4 right-4 text-2xl">🌸</div>
                      <div className="absolute bottom-4 left-4 text-2xl">🌿</div>
                      <div className="absolute bottom-4 right-4 text-2xl">🦋</div>
                      
                      {/* Recyclable items */}
                      {items.map((item) => (
                        !item.collected && (
                          <div
                            key={item.id}
                            onClick={() => collectItem(item.id)}
                            className="absolute cursor-pointer transform hover:scale-110 transition-all duration-200 bg-white/80 rounded-full p-2 shadow-lg hover:shadow-xl border-2 border-green-400"
                            style={{
                              left: item.x,
                              top: item.y,
                            }}
                            title={`${item.name} (+${item.points} pts)`}
                          >
                            <span className="text-xl">{item.icon}</span>
                          </div>
                        )
                      ))}
                      
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-green-700 text-center bg-white/80 px-2 py-1 rounded">
                        Haz clic en los objetos para recogerlos
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Inventory */}
                <Card className="bg-blue-50 border-2 border-blue-300">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-blue-700 mb-3">🎒 Inventario</h4>
                    <div className="space-y-2">
                      {recyclableTypes.map((type) => (
                        <div key={type.type} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span>{type.icon}</span>
                            <span className="text-blue-600">{type.name}</span>
                          </div>
                          <span className="font-bold text-blue-800">
                            {inventory[type.type] || 0}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Bench Progress */}
                <Card className="bg-amber-50 border-2 border-amber-300">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-amber-700 mb-3">🏗️ Progreso del Banco</h4>
                    <div className="space-y-3">
                      {benchParts.map((part, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span>{part.icon}</span>
                              <span className="text-sm font-medium text-amber-700">{part.name}</span>
                            </div>
                            {part.completed && (
                              <Button
                                size="sm"
                                onClick={() => buildBenchPart(index)}
                                className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1"
                              >
                                Construir
                              </Button>
                            )}
                          </div>
                          <div className="text-xs text-amber-600 space-y-1">
                            {part.requiredItems.map((req, reqIndex) => (
                              <div key={reqIndex} className="flex justify-between">
                                <span>{recyclableTypes.find(t => t.type === req.type)?.icon} {req.quantity}</span>
                                <span className={
                                  (inventory[req.type] || 0) >= req.quantity 
                                    ? 'text-green-600 font-bold' 
                                    : 'text-red-500'
                                }>
                                  {inventory[req.type] || 0}/{req.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <Progress 
                        value={(getCompletedParts() / benchComponents.length) * 100} 
                        className="h-2" 
                      />
                      <p className="text-xs text-amber-600 mt-1 text-center">
                        {getCompletedParts()}/{benchComponents.length} partes completadas
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card className="bg-green-50 border-2 border-green-300">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-green-700 mb-2">💡 Consejos</h4>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Recolecta todos los materiales antes de construir</li>
                      <li>• Algunos materiales son más raros que otros</li>
                      <li>• El banco necesita todas sus partes para estar completo</li>
                      <li>• ¡Cada pieza reciclada ayuda al planeta!</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecycleBench;
