import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TreePine, Waves, Mountain, Sun, CheckCircle, AlertTriangle, Snowflake, TreePalm } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EndangeredAnimalsProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Animal {
  id: number;
  name: string;
  emoji: string;
  habitat: 'forest' | 'ocean' | 'mountain' | 'desert' | 'arctic' | 'jungle';
  dangerLevel: 'critical' | 'endangered' | 'vulnerable';
  threats: string[];
  conservation: string;
  population: string;
  placed: boolean;
}

interface Habitat {
  id: string;
  name: string;
  emoji: string;
  icon: any;
  color: string;
  description: string;
  animals: Animal[];
}

const EndangeredAnimals = ({ onComplete, onBack }: EndangeredAnimalsProps) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [draggedAnimal, setDraggedAnimal] = useState<Animal | null>(null);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showInfo, setShowInfo] = useState<Animal | null>(null);

  const animals: Animal[] = [
    // Nivel 1 - Animales básicos
    {
      id: 1,
      name: "Oso Panda Gigante",
      emoji: "🐼",
      habitat: 'forest',
      dangerLevel: 'vulnerable',
      threats: ["Pérdida de hábitat", "Fragmentación de bosques de bambú"],
      conservation: "Protección de reservas naturales y programas de reproducción en cautiverio",
      population: "Aproximadamente 1,864 en estado salvaje",
      placed: false
    },
    {
      id: 2,
      name: "Ballena Azul",
      emoji: "🐋",
      habitat: 'ocean',
      dangerLevel: 'endangered',
      threats: ["Colisiones con barcos", "Contaminación acústica", "Cambio climático"],
      conservation: "Rutas marítimas protegidas y reducción de contaminación oceánica",
      population: "Entre 10,000-25,000 individuos",
      placed: false
    },
    
    // Nivel 2
    {
      id: 3,
      name: "Tigre de Bengala",
      emoji: "🐅",
      habitat: 'jungle',
      dangerLevel: 'endangered',
      threats: ["Caza furtiva", "Conflicto humano-animal", "Pérdida de hábitat"],
      conservation: "Parques nacionales y programas anti-caza furtiva",
      population: "Menos de 2,500 en estado salvaje",
      placed: false
    },
    {
      id: 4,
      name: "Tortuga Marina",
      emoji: "🐢",
      habitat: 'ocean',
      dangerLevel: 'critical',
      threats: ["Plásticos en el océano", "Pesca accidental", "Desarrollo costero"],
      conservation: "Protección de playas de anidación y reducción de plásticos",
      population: "Varias especies en peligro crítico",
      placed: false
    },
    
    // Nivel 3
    {
      id: 5,
      name: "Leopardo de las Nieves",
      emoji: "🐆",
      habitat: 'mountain',
      dangerLevel: 'vulnerable',
      threats: ["Caza furtiva", "Pérdida de presas", "Cambio climático"],
      conservation: "Programas comunitarios y protección de territorios",
      population: "Entre 4,000-6,500 individuos",
      placed: false
    },
    {
      id: 6,
      name: "Rinoceronte Negro",
      emoji: "🦏",
      habitat: 'desert',
      dangerLevel: 'critical',
      threats: ["Caza por sus cuernos", "Pérdida de hábitat"],
      conservation: "Vigilancia intensiva y programas de reproducción",
      population: "Menos de 5,500 individuos",
      placed: false
    },
    
    // Nivel 4
    {
      id: 7,
      name: "Orangután de Sumatra",
      emoji: "🦧",
      habitat: 'jungle',
      dangerLevel: 'critical',
      threats: ["Deforestación", "Plantaciones de aceite de palma"],
      conservation: "Protección de bosques tropicales y rehabilitación",
      population: "Aproximadamente 14,000 individuos",
      placed: false
    },
    {
      id: 8,
      name: "Oso Polar",
      emoji: "🐻‍❄️",
      habitat: 'arctic',
      dangerLevel: 'vulnerable',
      threats: ["Derretimiento de hielo", "Cambio climático", "Contaminación"],
      conservation: "Protección de áreas árticas y acción climática urgente",
      population: "Aproximadamente 22,000-31,000 individuos",
      placed: false
    },
    
    // Nivel 5
    {
      id: 9,
      name: "Elefante Africano",
      emoji: "🐘",
      habitat: 'desert',
      dangerLevel: 'endangered',
      threats: ["Caza furtiva por marfil", "Conflicto humano-animal", "Fragmentación del hábitat"],
      conservation: "Patrullas anti-caza furtiva y corredores de vida silvestre",
      population: "Aproximadamente 415,000 individuos",
      placed: false
    },
    {
      id: 10,
      name: "Gorila de Montaña",
      emoji: "🦍",
      habitat: 'forest',
      dangerLevel: 'critical',
      threats: ["Caza furtiva", "Guerra civil", "Enfermedades humanas"],
      conservation: "Ecoturismo sostenible y protección comunitaria",
      population: "Más de 1,000 individuos",
      placed: false
    },
    
    // Nivel 6
    {
      id: 11,
      name: "Vaquita Marina",
      emoji: "🐬",
      habitat: 'ocean',
      dangerLevel: 'critical',
      threats: ["Pesca accidental", "Totoaba ilegal", "Contaminación"],
      conservation: "Prohibición de pesca en áreas protegidas",
      population: "Menos de 10 individuos",
      placed: false
    },
    {
      id: 12,
      name: "Jaguar",
      emoji: "🐆",
      habitat: 'jungle',
      dangerLevel: 'vulnerable',
      threats: ["Deforestación", "Caza de represalia", "Fragmentación del hábitat"],
      conservation: "Corredores ecológicos y programas de coexistencia",
      population: "Aproximadamente 173,000 individuos",
      placed: false
    }
  ];

  const habitats: Habitat[] = [
    {
      id: 'forest',
      name: 'Bosque Templado',
      emoji: '🌲',
      icon: TreePine,
      color: 'bg-green-100 border-green-400',
      description: 'Bosques templados para osos panda y gorilas',
      animals: []
    },
    {
      id: 'ocean',
      name: 'Océano',
      emoji: '🌊',
      icon: Waves,
      color: 'bg-blue-100 border-blue-400',
      description: 'Hábitat marino para ballenas, tortugas y vaquitas',
      animals: []
    },
    {
      id: 'mountain',
      name: 'Montaña',
      emoji: '🏔️',
      icon: Mountain,
      color: 'bg-gray-100 border-gray-400',
      description: 'Regiones montañosas para leopardos de las nieves',
      animals: []
    },
    {
      id: 'desert',
      name: 'Sabana/Desierto',
      emoji: '🏜️',
      icon: Sun,
      color: 'bg-yellow-100 border-yellow-400',
      description: 'Tierras áridas para rinocerontes y elefantes',
      animals: []
    },
    {
      id: 'arctic',
      name: 'Ártico',
      emoji: '🧊',
      icon: Snowflake,
      color: 'bg-cyan-100 border-cyan-400',
      description: 'Regiones polares para osos polares',
      animals: []
    },
    {
      id: 'jungle',
      name: 'Selva Tropical',
      emoji: '🌴',
      icon: TreePalm,
      color: 'bg-emerald-100 border-emerald-400',
      description: 'Selvas tropicales para tigres, orangutanes y jaguares',
      animals: []
    }
  ];

  const [gameAnimals, setGameAnimals] = useState<Animal[]>([]);
  const [gameHabitats, setGameHabitats] = useState<Habitat[]>(habitats);

  useEffect(() => {
    // Initialize first level
    nextLevel();
  }, []);

  const nextLevel = () => {
    const startIndex = currentLevel * 2;
    const levelAnimals = animals.slice(startIndex, startIndex + 2).map(animal => ({ ...animal, placed: false }));
    setGameAnimals(levelAnimals);
    setGameHabitats(habitats.map(h => ({ ...h, animals: [] })));
  };

  const handleDragStart = (animal: Animal) => {
    setDraggedAnimal(animal);
  };

  const handleDrop = (habitatId: string) => {
    if (!draggedAnimal) return;

    const isCorrect = draggedAnimal.habitat === habitatId;
    
    if (isCorrect) {
      setScore(score + 1);
      setGameHabitats(prev => prev.map(habitat => {
        if (habitat.id === habitatId) {
          return { ...habitat, animals: [...habitat.animals, { ...draggedAnimal, placed: true }] };
        }
        return habitat;
      }));
      
      setGameAnimals(prev => prev.filter(animal => animal.id !== draggedAnimal.id));
      
      toast({
        title: "¡Correcto! 🎉",
        description: `${draggedAnimal.name} está en su hábitat correcto`,
        duration: 2000,
      });

      // Check if level is complete
      if (gameAnimals.length === 1) {
        setTimeout(() => {
          if (currentLevel < 5) { // Ahora tenemos 6 niveles (0-5)
            setCurrentLevel(currentLevel + 1);
            nextLevel();
          } else {
            setGameComplete(true);
            setTimeout(() => onComplete(120), 2000); // Más puntos por más niveles
          }
        }, 1500);
      }
    } else {
      setMistakes(mistakes + 1);
      toast({
        title: "Incorrecto ❌",
        description: `${draggedAnimal.name} no vive en ${habitats.find(h => h.id === habitatId)?.name}`,
        duration: 2000,
      });
    }

    setDraggedAnimal(null);
  };

  const getDangerColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'endangered': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'vulnerable': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getDangerIcon = (level: string) => {
    switch (level) {
      case 'critical': return '🚨';
      case 'endangered': return '⚠️';
      case 'vulnerable': return '📢';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-purple-700">🐼 Salva la Fauna</h1>
            <p className="text-sm text-gray-600">Nivel {currentLevel + 1} de 6</p>
          </div>
          <div className="text-right text-sm">
            <div className="text-purple-600 font-medium">Correctos: {score}</div>
            <div className="text-red-500">Errores: {mistakes}</div>
          </div>
        </div>

        {/* Progress */}
        <Progress value={((currentLevel + 1) / 6) * 100} className="mb-6 h-2" />

        {!gameComplete ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Animals to Place */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">🦋 Animales en Peligro</h2>
              {gameAnimals.map(animal => (
                <Card 
                  key={animal.id}
                  className="cursor-grab active:cursor-grabbing bg-white border-2 border-purple-200 hover:border-purple-400 transition-all duration-200 hover:shadow-lg"
                  draggable
                  onDragStart={() => handleDragStart(animal)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{animal.emoji}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{animal.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={`${getDangerColor(animal.dangerLevel)} text-xs`}>
                            {getDangerIcon(animal.dangerLevel)} {animal.dangerLevel === 'critical' ? 'Crítico' : 
                             animal.dangerLevel === 'endangered' ? 'En Peligro' : 'Vulnerable'}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowInfo(animal)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Ver Info
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Habitats */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">🌍 Hábitats Naturales</h2>
              <div className="lg:grid lg:grid-cols-1 lg:gap-4 flex gap-4 overflow-x-auto pb-4 lg:pb-0 snap-x">
                {gameHabitats.map(habitat => {
                  const HabitatIcon = habitat.icon;
                  return (
                    <Card
                      key={habitat.id}
                      className={`${habitat.color} border-2 min-h-[120px] transition-all duration-200 w-72 lg:w-full flex-shrink-0 lg:flex-shrink snap-start`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(habitat.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <HabitatIcon className="w-6 h-6 text-gray-700" />
                          <div>
                            <h3 className="font-bold text-gray-800">{habitat.name} {habitat.emoji}</h3>
                            <p className="text-xs text-gray-600">{habitat.description}</p>
                          </div>
                        </div>
                        
                        {/* Placed Animals */}
                        <div className="flex flex-wrap gap-2">
                          {habitat.animals.map(animal => (
                            <div 
                              key={animal.id}
                              className="flex items-center space-x-2 bg-white/80 rounded-full px-3 py-1 border"
                            >
                              <span className="text-sm">{animal.emoji}</span>
                              <span className="text-xs font-medium">{animal.name}</span>
                              <CheckCircle className="w-3 h-3 text-green-600" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-green-700 mb-4">¡Misión Completada!</h2>
              <p className="text-lg text-gray-700 mb-6">
                Has ayudado a salvar {score} especies en peligro de extinción
              </p>
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-semibold">
                  🌍 Cada animal que protegemos es un paso hacia un planeta más biodiverso.
                  ¡Gracias por ser un defensor de la fauna!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Animal Info Modal */}
        {showInfo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="bg-white max-w-md w-full max-h-[80vh] overflow-y-auto">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{showInfo.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-800">{showInfo.name}</h3>
                  <Badge className={`${getDangerColor(showInfo.dangerLevel)} mt-2`}>
                    {getDangerIcon(showInfo.dangerLevel)} Estado: {
                      showInfo.dangerLevel === 'critical' ? 'En Peligro Crítico' : 
                      showInfo.dangerLevel === 'endangered' ? 'En Peligro' : 'Vulnerable'
                    }
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 flex items-center mb-2">
                      <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                      Principales Amenazas:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {showInfo.threats.map((threat, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          {threat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 flex items-center mb-2">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Esfuerzos de Conservación:
                    </h4>
                    <p className="text-sm text-gray-600">{showInfo.conservation}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">📊 Población:</h4>
                    <p className="text-sm text-gray-600">{showInfo.population}</p>
                  </div>
                </div>

                <Button
                  onClick={() => setShowInfo(null)}
                  className="w-full mt-6 bg-purple-500 hover:bg-purple-600"
                >
                  Cerrar
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default EndangeredAnimals;
