
import { useState, useEffect } from "react";

interface EcoMascotProps {
  size?: "small" | "medium" | "large";
  mood?: "happy" | "excited" | "thinking";
}

const EcoMascot = ({ size = "medium", mood = "happy" }: EcoMascotProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    small: "w-12 h-12",
    medium: "w-16 h-16",
    large: "w-20 h-20"
  };

  const getMascotVariation = () => {
    switch (mood) {
      case 'thinking':
        return {
          seedColor: 'from-amber-600 to-amber-800',
          leafColor: 'text-green-300',
          leafRotation: '-rotate-6',
          bounce: false
        };
      case 'happy':
        return {
          seedColor: 'from-amber-700 to-amber-900',
          leafColor: 'text-green-400',
          leafRotation: '-rotate-12',
          bounce: true
        };
      case 'excited':
        return {
          seedColor: 'from-yellow-600 to-amber-800',
          leafColor: 'text-green-500',
          leafRotation: '-rotate-20',
          bounce: true
        };
      default:
        return {
          seedColor: 'from-amber-700 to-amber-900',
          leafColor: 'text-green-400',
          leafRotation: '-rotate-12',
          bounce: true
        };
    }
  };

  const variation = getMascotVariation();

  return (
    <div className={`${sizeClasses[size]} relative`}>
      {/* Semilla/base del personaje */}
      <div 
        className={`w-full h-full bg-gradient-to-br ${variation.seedColor} rounded-full shadow-lg flex items-center justify-center border-2 border-amber-800 transition-all duration-300 ${
          isAnimating && variation.bounce ? 'animate-bounce scale-110' : ''
        }`}
      >
        {/* Cara de la semilla */}
        <div className="text-yellow-200 font-bold text-lg">
          <div className="flex flex-col items-center">
            <div className="flex space-x-1 mb-1">
              <div className="w-1 h-1 bg-yellow-200 rounded-full"></div>
              <div className="w-1 h-1 bg-yellow-200 rounded-full"></div>
            </div>
            <div className="w-3 h-1 bg-yellow-200 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Brote que sale de la semilla */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-8 flex flex-col items-center">
          {/* Tallo */}
          <div className="w-1 h-4 bg-green-500 rounded-full"></div>
          {/* Hojas */}
          <div className="relative">
            <div className={`${variation.leafColor} text-lg transform ${variation.leafRotation} transition-all duration-300`}>
              {mood === 'excited' ? '🌿🌿' : '🌿'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mensaje animado */}
      {isAnimating && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 text-xs font-semibold text-green-600 shadow-lg animate-fade-in">
          {mood === 'thinking' ? '🤔' : mood === 'excited' ? '¡Genial!' : '¡Hola!'}
        </div>
      )}
    </div>
  );
};

export default EcoMascot;
