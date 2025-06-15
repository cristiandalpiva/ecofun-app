
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, HelpCircle, Eye, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ExplorationScreenProps {
  habitat: string;
  onComplete: (score: number) => void;
  onBack: () => void;
  onHelp: () => void;
}

interface Threat {
  id: string;
  x: number;
  y: number;
  type: string;
  found: boolean;
  question: string;
  options: { text: string; correct: boolean; explanation: string }[];
}

interface HabitatData {
  name: string;
  animal: string;
  emoji: string;
  background: string;
  backgroundImage: string;
  threats: Threat[];
}

const ExplorationScreen: React.FC<ExplorationScreenProps> = ({ 
  habitat, 
  onComplete, 
  onBack, 
  onHelp 
}) => {
  const [threatsFound, setThreatsFound] = useState(0);
  const [currentThreat, setCurrentThreat] = useState<Threat | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [gameThreats, setGameThreats] = useState<Threat[]>([]);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const habitatData: Record<string, HabitatData> = {
    selva: {
      name: 'Selva Tropical',
      animal: 'Jaguar',
      emoji: '🐒',
      background: 'from-green-600 via-emerald-500 to-green-400',
      backgroundImage: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=600&fit=crop',
      threats: [
        {
          id: 'deforestacion',
          x: 15,
          y: 25,
          type: 'Motosierra',
          found: false,
          question: '¡Encontraste una motosierra abandonada! ¿Qué deberías hacer?',
          options: [
            { text: 'Llamar a los guardaparques', correct: true, explanation: '¡Excelente! Los guardaparques pueden investigar y prevenir la tala ilegal.' },
            { text: 'Usarla para cortar más árboles', correct: false, explanation: 'No, eso empeoraría la deforestación y dañaría el hábitat.' },
            { text: 'Ignorarla completamente', correct: false, explanation: 'Es importante reportar estos hallazgos para proteger el bosque.' }
          ]
        },
        {
          id: 'trampa',
          x: 70,
          y: 60,
          type: 'Trampa para animales',
          found: false,
          question: '¡Hay una trampa oculta entre la vegetación! ¿Cómo la neutralizas?',
          options: [
            { text: 'Desactivarla cuidadosamente', correct: true, explanation: '¡Correcto! Siempre con cuidado y reportando a las autoridades.' },
            { text: 'Colocar más trampas', correct: false, explanation: 'No, las trampas lastiman a los animales inocentes.' },
            { text: 'Dejarla para que alguien más la encuentre', correct: false, explanation: 'Es peligroso dejar trampas activas en el bosque.' }
          ]
        },
        {
          id: 'basura',
          x: 45,
          y: 80,
          type: 'Basura plástica',
          found: false,
          question: 'Encontraste basura plástica contaminando el suelo. ¿Qué haces?',
          options: [
            { text: 'Recogerla y reciclarla', correct: true, explanation: '¡Perfecto! Limpiar y reciclar protege el ecosistema.' },
            { text: 'Enterrarla en el suelo', correct: false, explanation: 'Enterrar plástico contamina el suelo y las raíces de las plantas.' },
            { text: 'Quemarla', correct: false, explanation: 'Quemar plástico libera gases tóxicos al aire.' }
          ]
        }
      ]
    },
    oceano: {
      name: 'Océano Profundo',
      animal: 'Ballena',
      emoji: '🐠',
      background: 'from-blue-600 via-cyan-500 to-blue-400',
      backgroundImage: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop',
      threats: [
        {
          id: 'red',
          x: 25,
          y: 40,
          type: 'Red de pesca abandonada',
          found: false,
          question: '¡Encontraste una red de pesca abandonada! ¿Qué hacés?',
          options: [
            { text: 'Llamar a guardaparques marinos', correct: true, explanation: '¡Excelente! Ellos pueden retirarla de forma segura.' },
            { text: 'Empujarla más al fondo', correct: false, explanation: 'No, eso la haría más peligrosa para la vida marina.' },
            { text: 'Ignorarla', correct: false, explanation: 'Las redes abandonadas siguen atrapando animales marinos.' }
          ]
        },
        {
          id: 'plastico',
          x: 60,
          y: 70,
          type: 'Isla de plástico',
          found: false,
          question: 'Hay una acumulación de plásticos flotando. ¿Cómo ayudas?',
          options: [
            { text: 'Organizar una limpieza marina', correct: true, explanation: '¡Genial! Las limpiezas comunitarias son muy efectivas.' },
            { text: 'Agregar más plástico', correct: false, explanation: 'Eso empeoraría la contaminación del océano.' },
            { text: 'Hundir los plásticos', correct: false, explanation: 'Los plásticos hundidos siguen contaminando el agua.' }
          ]
        },
        {
          id: 'petroleo',
          x: 80,
          y: 30,
          type: 'Derrame de petróleo',
          found: false,
          question: 'Detectaste un derrame de petróleo. ¿Cuál es tu acción?',
          options: [
            { text: 'Alertar a las autoridades ambientales', correct: true, explanation: '¡Correcto! Los derrames requieren equipos especializados.' },
            { text: 'Intentar limpiarlo con las manos', correct: false, explanation: 'Es peligroso y requiere equipamiento profesional.' },
            { text: 'Mezclarlo con el agua', correct: false, explanation: 'Eso esparce más la contaminación.' }
          ]
        }
      ]
    },
    sabana: {
      name: 'Sabana Africana',
      animal: 'León',
      emoji: '🦁',
      background: 'from-yellow-600 via-orange-500 to-yellow-400',
      backgroundImage: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop',
      threats: [
        {
          id: 'cazador',
          x: 20,
          y: 50,
          type: 'Cazador furtivo',
          found: false,
          question: '¡Avistaste a un cazador furtivo! ¿Qué haces?',
          options: [
            { text: 'Informar a los rangers inmediatamente', correct: true, explanation: '¡Perfecto! Los rangers están entrenados para manejar esta situación.' },
            { text: 'Confrontarlo directamente', correct: false, explanation: 'Es peligroso. Es mejor informar a las autoridades.' },
            { text: 'Tomar fotos para redes sociales', correct: false, explanation: 'Tu seguridad es primero. Informa a los profesionales.' }
          ]
        },
        {
          id: 'sequia',
          x: 75,
          y: 35,
          type: 'Pozo de agua seco',
          found: false,
          question: 'El pozo de agua está seco por la sequía. ¿Cómo ayudas?',
          options: [
            { text: 'Colaborar en proyectos de conservación de agua', correct: true, explanation: '¡Excelente! La conservación del agua es clave para la vida salvaje.' },
            { text: 'Usar toda el agua disponible', correct: false, explanation: 'Eso agotaría más los recursos hídricos.' },
            { text: 'Esperar que llueva', correct: false, explanation: 'Es mejor tomar acción proactiva para conservar agua.' }
          ]
        },
        {
          id: 'alambre',
          x: 50,
          y: 80,
          type: 'Cerca con alambre de púas',
          found: false,
          question: 'Una cerca bloquea el paso de los animales. ¿Qué propones?',
          options: [
            { text: 'Crear corredores de vida silvestre', correct: true, explanation: '¡Brillante! Los corredores permiten que los animales se muevan libremente.' },
            { text: 'Construir más cercas', correct: false, explanation: 'Eso fragmentaría más el hábitat natural.' },
            { text: 'Forzar a los animales a saltar', correct: false, explanation: 'Es peligroso y estresante para los animales.' }
          ]
        }
      ]
    },
    montana: {
      name: 'Montañas Nevadas',
      animal: 'Oso Polar',
      emoji: '🐻',
      background: 'from-slate-600 via-blue-500 to-slate-400',
      backgroundImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
      threats: [
        {
          id: 'deshielo',
          x: 30,
          y: 60,
          type: 'Área de deshielo',
          found: false,
          question: 'El hielo se está derritiendo rápidamente. ¿Cómo contribuyes a solucionarlo?',
          options: [
            { text: 'Promover energías renovables', correct: true, explanation: '¡Excelente! Las energías limpias reducen el calentamiento global.' },
            { text: 'Usar más combustibles fósiles', correct: false, explanation: 'Eso acelera el cambio climático y el deshielo.' },
            { text: 'Mudarse a otro lugar', correct: false, explanation: 'Es mejor enfrentar el problema y buscar soluciones.' }
          ]
        },
        {
          id: 'basura_nieve',
          x: 70,
          y: 25,
          type: 'Basura en la nieve',
          found: false,
          question: 'Hay basura contaminando la nieve pura. ¿Qué haces?',
          options: [
            { text: 'Limpiarla y llevarla a reciclar', correct: true, explanation: '¡Perfecto! Mantener limpios los ecosistemas es fundamental.' },
            { text: 'Cubrirla con más nieve', correct: false, explanation: 'No resuelve el problema, solo lo oculta temporalmente.' },
            { text: 'Dejarla para el deshielo', correct: false, explanation: 'Cuando se derrita, la contaminación será peor.' }
          ]
        },
        {
          id: 'turismo',
          x: 85,
          y: 70,
          type: 'Turismo irresponsable',
          found: false,
          question: 'Turistas están dañando el ecosistema. ¿Cómo educas sobre turismo responsable?',
          options: [
            { text: 'Promover ecoturismo y educación ambiental', correct: true, explanation: '¡Genial! La educación ayuda a cambiar comportamientos.' },
            { text: 'Prohibir todo el turismo', correct: false, explanation: 'El turismo responsable puede ser beneficioso para la conservación.' },
            { text: 'Ignorar el problema', correct: false, explanation: 'Es importante educar para proteger estos lugares.' }
          ]
        }
      ]
    }
  };

  const currentHabitat = habitatData[habitat];

  useEffect(() => {
    setGameThreats(currentHabitat.threats.map(t => ({ ...t, found: false })));
  }, [habitat]);

  const handleThreatClick = (threat: Threat) => {
    if (!threat.found) {
      setCurrentThreat(threat);
      setShowQuestion(true);
    }
  };

  const handleAnswerSelect = (option: { text: string; correct: boolean; explanation: string }) => {
    if (option.correct) {
      const updatedThreats = gameThreats.map(t => 
        t.id === currentThreat?.id ? { ...t, found: true } : t
      );
      setGameThreats(updatedThreats);
      setThreatsFound(prev => prev + 1);
      setScore(prev => prev + 50);

      if (threatsFound + 1 === 3) {
        setTimeout(() => {
          onComplete(score + 50);
        }, 2000);
      }
    } else {
      setScore(prev => Math.max(0, prev - 10));
    }
    
    setShowQuestion(false);
    setCurrentThreat(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${currentHabitat.backgroundImage})` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${currentHabitat.background} opacity-60`} />
      
      {/* UI Overlay */}
      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button onClick={onBack} variant="outline" className="bg-white/90">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          
          <div className="flex items-center space-x-4">
            <Button onClick={onHelp} variant="outline" className="bg-white/90">
              <HelpCircle className="w-4 h-4 mr-2" />
              Ayuda
            </Button>
            <Button 
              onClick={() => setShowHint(!showHint)} 
              variant="outline" 
              className="bg-yellow-100 border-yellow-400 text-yellow-800"
            >
              <Eye className="w-4 h-4 mr-2" />
              {showHint ? 'Ocultar Pistas' : 'Mostrar Pistas'}
            </Button>
          </div>
        </div>

        {/* Game Info */}
        <div className="flex items-center justify-center mb-6">
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-green-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl">{currentHabitat.emoji}</div>
                  <div className="font-bold text-green-800">{currentHabitat.name}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-600">{threatsFound}/3</div>
                  <div className="text-sm text-red-700">Amenazas Resueltas</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{score}</div>
                  <div className="text-sm text-blue-700">Puntos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exploration Area */}
        <div className="relative w-full h-96 mx-auto max-w-4xl">
          <div className="absolute inset-0 border-4 border-white/50 rounded-lg bg-white/10 backdrop-blur-sm">
            <div className="relative w-full h-full">
              {gameThreats.map((threat) => (
                <button
                  key={threat.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    threat.found
                      ? 'bg-green-500 text-white scale-110'
                      : showHint
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-red-600/80 hover:bg-red-500 text-white hover:scale-110'
                  } rounded-full w-8 h-8 flex items-center justify-center shadow-lg`}
                  style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
                  onClick={() => handleThreatClick(threat)}
                  disabled={threat.found}
                >
                  {threat.found ? '✓' : '!'}
                </button>
              ))}
            </div>
          </div>
          
          {showHint && (
            <div className="absolute -bottom-12 left-0 right-0">
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 mx-auto max-w-md">
                <div className="flex items-center justify-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    Busca cosas que no deberían estar en este hábitat natural
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="text-center mt-8">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-green-200 rounded-lg p-4 max-w-md mx-auto">
            <h3 className="font-bold text-green-800 mb-2">
              ¡Salva al {currentHabitat.animal}!
            </h3>
            <p className="text-sm text-green-700">
              Encuentra las {3 - threatsFound} amenazas restantes haciendo clic en el área de exploración
            </p>
          </div>
        </div>
      </div>

      {/* Question Dialog */}
      <Dialog open={showQuestion} onOpenChange={setShowQuestion}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span className="text-2xl">🚨</span>
              <span>Amenaza Detectada</span>
            </DialogTitle>
          </DialogHeader>
          
          {currentThreat && (
            <div className="space-y-4">
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <h3 className="font-bold text-red-800 mb-2">{currentThreat.type}</h3>
                <p className="text-red-700">{currentThreat.question}</p>
              </div>
              
              <div className="space-y-2">
                {currentThreat.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-4 hover:bg-green-50 hover:border-green-400"
                  >
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExplorationScreen;
