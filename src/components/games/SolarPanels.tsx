import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Home, Sun, ArrowLeft, RotateCcw } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface SolarPanelsProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Panel {
  id: number;
  x: number;
  y: number;
  rotation: number;
  efficiency: number;
  isDragging: boolean;
}

interface Appliance {
  name: string;
  power: number;
  icon: string;
  active: boolean;
}

const SolarPanels: React.FC<SolarPanelsProps> = ({ onComplete, onBack }) => {
  const [panels, setPanels] = useState<Panel[]>([]);
  const [totalPower, setTotalPower] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // Increased time
  const [selectedPanel, setSelectedPanel] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const appliances: Appliance[] = [
    { name: "Luces", power: 150, icon: "💡", active: false }, // Reduced power requirements
    { name: "Refrigerador", power: 500, icon: "🧊", active: false },
    { name: "TV", power: 200, icon: "📺", active: false },
    { name: "Computadora", power: 250, icon: "💻", active: false },
    { name: "Lavadora", power: 600, icon: "👕", active: false }
  ];

  const requiredPower = appliances.reduce((sum, app) => sum + app.power, 0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameWon) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameWon) {
      toast({
        title: "¡Tiempo agotado! ⏰",
        description: "Intenta de nuevo para completar la instalación.",
      });
    }
  }, [timeLeft, gameWon]);

  useEffect(() => {
    const power = panels.reduce((sum, panel) => sum + (panel.efficiency * 400), 0); // Increased power per panel
    setTotalPower(power);
    
    if (power >= requiredPower && !gameWon) {
      setGameWon(true);
      toast({
        title: "¡Excelente instalación! ⚡",
        description: "Tu casa ahora funciona 100% con energía solar.",
      });
    }
  }, [panels, requiredPower, gameWon]);

  const addPanel = (x: number, y: number) => {
    if (panels.length >= 6) return; // Reduced max panels
    
    const sunlightFactor = Math.max(0.5, 1 - (y / 400)); // Better minimum efficiency
    const spacingFactor = panels.length === 0 ? 1 : 
      Math.min(...panels.map(p => Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2))) > 40 ? 1 : 0.8; // Reduced spacing requirement
    
    const newPanel: Panel = {
      id: Date.now(),
      x,
      y,
      rotation: 0,
      efficiency: Math.round((sunlightFactor * spacingFactor) * 100) / 100,
      isDragging: false
    };
    
    setPanels([...panels, newPanel]);
  };

  const handleMouseDown = (e: React.MouseEvent, panelId: number) => {
    e.stopPropagation();
    const panel = panels.find(p => p.id === panelId);
    if (!panel) return;

    setSelectedPanel(panelId);
    setPanels(prev => prev.map(p => 
      p.id === panelId ? { ...p, isDragging: true } : p
    ));

    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!gameAreaRef.current) return;
      
      const gameAreaRect = gameAreaRef.current.getBoundingClientRect();
      const newX = e.clientX - gameAreaRect.left - dragOffset.x;
      const newY = e.clientY - gameAreaRect.top - dragOffset.y;

      const constrainedX = Math.max(20, Math.min(newX, gameAreaRect.width - 20));
      const constrainedY = Math.max(10, Math.min(newY, gameAreaRect.height - 10));

      setPanels(prev => prev.map(p => 
        p.id === panelId 
          ? { 
              ...p, 
              x: constrainedX, 
              y: constrainedY,
              efficiency: Math.round((Math.max(0.5, 1 - (constrainedY / 400)) * 
                         (prev.length === 1 ? 1 : 
                          Math.min(...prev.filter(panel => panel.id !== panelId)
                            .map(panel => Math.sqrt((panel.x - constrainedX) ** 2 + (panel.y - constrainedY) ** 2))) > 40 ? 1 : 0.8)) * 100) / 100
            }
          : p
      ));
    };

    const handleMouseUp = () => {
      setPanels(prev => prev.map(p => ({ ...p, isDragging: false })));
      setSelectedPanel(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent, panelId: number) => {
    e.stopPropagation();
    const touch = e.touches[0];
    const panel = panels.find(p => p.id === panelId);
    if (!panel) return;

    setSelectedPanel(panelId);
    setPanels(prev => prev.map(p => 
      p.id === panelId ? { ...p, isDragging: true } : p
    ));

    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!gameAreaRef.current) return;
      
      const touch = e.touches[0];
      const gameAreaRect = gameAreaRef.current.getBoundingClientRect();
      const newX = touch.clientX - gameAreaRect.left - dragOffset.x;
      const newY = touch.clientY - gameAreaRect.top - dragOffset.y;

      const constrainedX = Math.max(20, Math.min(newX, gameAreaRect.width - 20));
      const constrainedY = Math.max(10, Math.min(newY, gameAreaRect.height - 10));

      setPanels(prev => prev.map(p => 
        p.id === panelId 
          ? { 
              ...p, 
              x: constrainedX, 
              y: constrainedY,
              efficiency: Math.round((Math.max(0.5, 1 - (constrainedY / 400)) * 
                         (prev.length === 1 ? 1 : 
                          Math.min(...prev.filter(panel => panel.id !== panelId)
                            .map(panel => Math.sqrt((panel.x - constrainedX) ** 2 + (panel.y - constrainedY) ** 2))) > 40 ? 1 : 0.8)) * 100) / 100
            }
          : p
      ));
    };

    const handleTouchEnd = () => {
      setPanels(prev => prev.map(p => ({ ...p, isDragging: false })));
      setSelectedPanel(null);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  const rotatePanel = (id: number) => {
    setPanels(panels.map(panel => 
      panel.id === id 
        ? { ...panel, rotation: (panel.rotation + 45) % 360 }
        : panel
    ));
  };

  const removePanel = (id: number) => {
    setPanels(panels.filter(panel => panel.id !== id));
  };

  const resetGame = () => {
    setPanels([]);
    setTotalPower(0);
    setGameWon(false);
    setTimeLeft(120);
    setSelectedPanel(null);
  };

  const handleComplete = () => {
    const timeBonus = Math.floor(timeLeft / 15); // Better time bonus
    const efficiencyBonus = totalPower > requiredPower * 1.2 ? 30 : 0;
    const points = 100 + timeBonus + efficiencyBonus;
    onComplete(points);
  };

  const getActiveAppliances = () => {
    return appliances.map(app => ({
      ...app,
      active: totalPower >= app.power
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-blue-100 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-xl">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <Button variant="outline" onClick={onBack} size={isMobile ? "sm" : "default"}>
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Volver</span>
              </Button>
              <h1 className="text-lg sm:text-2xl font-bold text-orange-700 flex items-center">
                <Sun className="mr-2" />
                <span className="hidden sm:inline">Instalación Solar</span>
                <span className="sm:hidden">Solar</span>
              </h1>
              <div className="text-right">
                <p className="text-sm sm:text-lg font-bold text-orange-600">⏰ {timeLeft}s</p>
                <Button variant="outline" size="sm" onClick={resetGame}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {gameWon && (
              <Card className="bg-green-100 border-2 border-green-300 mb-4 sm:mb-6">
                <CardContent className="p-3 sm:p-4 text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">🎉 ¡Casa Energizada!</h3>
                  <p className="text-xs sm:text-sm text-green-700 mb-3 sm:mb-4">
                    Los paneles solares son fundamentales para un futuro sostenible. Capturan la energía del sol, 
                    una fuente limpia e inagotable, reduciendo nuestra dependencia de combustibles fósiles. 
                    Una instalación solar doméstica puede reducir las emisiones de CO₂ en 3-4 toneladas al año, 
                    ¡equivalente a plantar 100 árboles! ☀️🌍
                  </p>
                  <Button 
                    onClick={handleComplete}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-semibold px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base"
                  >
                    ¡Completar! (+{100 + Math.floor(timeLeft / 15) + (totalPower > requiredPower * 1.2 ? 30 : 0)} pts)
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Área de instalación */}
              <div className="lg:col-span-2">
                <Card className="bg-gradient-to-b from-sky-200 to-green-200 border-2 border-blue-300">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h3 className="text-sm sm:text-base font-bold text-blue-800">Área de Instalación</h3>
                      <p className="text-xs sm:text-sm text-blue-600">{panels.length}/6 paneles</p>
                    </div>
                    <div 
                      ref={gameAreaRef}
                      className="relative w-full bg-gradient-to-b from-blue-100 to-green-100 border-2 border-dashed border-blue-400 rounded-lg overflow-hidden cursor-crosshair"
                      style={{ height: isMobile ? '250px' : '320px' }}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        addPanel(x, y);
                      }}
                    >
                      {/* Sol */}
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-2xl sm:text-4xl animate-pulse">☀️</div>
                      
                      {/* Casa */}
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
                        <Home className="w-8 h-8 sm:w-16 sm:h-16 text-amber-600" />
                      </div>
                      
                      {/* Efficiency indicator */}
                      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-xs text-blue-700 bg-white/80 p-1 sm:p-2 rounded">
                        💡 <span className="hidden sm:inline">Coloca paneles arriba para mejor eficiencia</span>
                        <span className="sm:hidden">Arriba = mejor</span>
                      </div>
                      
                      {/* Paneles */}
                      {panels.map((panel) => (
                        <div
                          key={panel.id}
                          className={`absolute cursor-move touch-none ${panel.isDragging ? 'z-50' : 'z-10'}`}
                          style={{
                            left: panel.x - (isMobile ? 15 : 20),
                            top: panel.y - (isMobile ? 8 : 10),
                            transform: `rotate(${panel.rotation}deg)`,
                            transition: panel.isDragging ? 'none' : 'all 0.2s ease'
                          }}
                          onMouseDown={(e) => handleMouseDown(e, panel.id)}
                          onTouchStart={(e) => handleTouchStart(e, panel.id)}
                          onClick={(e) => e.stopPropagation()}
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            rotatePanel(panel.id);
                          }}
                        >
                          <div className={`bg-gradient-to-r from-blue-800 to-blue-900 border-2 rounded-sm shadow-lg ${
                            selectedPanel === panel.id ? 'border-yellow-400 shadow-yellow-300' : 'border-gray-400'
                          } ${panel.isDragging ? 'scale-110 shadow-2xl' : ''}`}
                          style={{
                            width: isMobile ? '30px' : '40px',
                            height: isMobile ? '18px' : '24px'
                          }}>
                            <div className="grid grid-cols-3 grid-rows-2 h-full p-0.5">
                              {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-blue-700 rounded-xs"></div>
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-center text-blue-800 font-bold mt-1">
                            {Math.round(panel.efficiency * 100)}%
                          </div>
                        </div>
                      ))}
                      
                      <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-blue-600 text-center">
                        <span className="hidden sm:inline">Haz clic para agregar • Arrastra para mover • Doble clic para rotar</span>
                        <span className="sm:hidden">Toca para agregar • Arrastra para mover</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Panel de control */}
              <div className="space-y-3 sm:space-y-4">
                {/* Medidor de energía */}
                <Card className="bg-yellow-50 border-2 border-yellow-300">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm sm:text-base font-bold text-yellow-700">
                        <span className="hidden sm:inline">Energía Generada</span>
                        <span className="sm:hidden">Energía</span>
                      </h4>
                      <Zap className="text-yellow-600 w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="text-lg sm:text-2xl font-bold text-yellow-800 mb-2">
                      {Math.round(totalPower)}W
                    </div>
                    <Progress 
                      value={(totalPower / requiredPower) * 100} 
                      className="h-2 sm:h-3" 
                    />
                    <p className="text-xs text-yellow-600 mt-1">
                      Necesitas: {requiredPower}W
                    </p>
                  </CardContent>
                </Card>

                {/* Electrodomésticos */}
                <Card className="bg-amber-50 border-2 border-amber-300">
                  <CardContent className="p-3 sm:p-4">
                    <h4 className="text-sm sm:text-base font-bold text-amber-700 mb-2 sm:mb-3">Electrodomésticos</h4>
                    <div className="space-y-1 sm:space-y-2">
                      {getActiveAppliances().map((appliance, index) => (
                        <div 
                          key={index}
                          className={`flex items-center justify-between p-1 sm:p-2 rounded-lg transition-all ${
                            appliance.active 
                              ? 'bg-green-100 border border-green-300' 
                              : 'bg-gray-100 border border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <span className="text-sm sm:text-lg">{appliance.icon}</span>
                            <span className={`text-xs sm:text-sm font-medium ${
                              appliance.active ? 'text-green-700' : 'text-gray-500'
                            }`}>
                              {appliance.name}
                            </span>
                          </div>
                          <div className="text-xs text-right">
                            <div className={appliance.active ? 'text-green-600' : 'text-gray-400'}>
                              {appliance.power}W
                            </div>
                            {appliance.active && <div className="text-green-500">✓</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Consejos mejorados */}
                <Card className="bg-blue-50 border-2 border-blue-300">
                  <CardContent className="p-3 sm:p-4">
                    <h4 className="text-sm sm:text-base font-bold text-blue-700 mb-2">💡 Consejos</h4>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Solo necesitas {Math.ceil(requiredPower / 400)} paneles bien ubicados</li>
                      <li>• Coloca paneles en la parte superior</li>
                      <li>• Separa los paneles un poco</li>
                      {!isMobile && <li>• Doble clic para rotar hacia el sol</li>}
                      <li>• Cada panel genera hasta 400W</li>
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

export default SolarPanels;
