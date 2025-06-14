
import { useState, useEffect } from "react";

interface EcoMascotProps {
  size?: "small" | "medium" | "large";
  mood?: "happy" | "excited" | "thinking";
  plantStage?: number;
}

const EcoMascot = ({ size = "medium", mood = "happy", plantStage = 1 }: EcoMascotProps) => {
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

  const plantStages = [
    { emoji: "🌰", color: "from-amber-700 to-amber-900", shadowColor: "shadow-amber-200" },
    { emoji: "🌱", color: "from-green-400 to-green-600", shadowColor: "shadow-green-200" },
    { emoji: "🌿", color: "from-green-500 to-green-700", shadowColor: "shadow-green-300" },
    { emoji: "🪴", color: "from-green-600 to-green-800", shadowColor: "shadow-green-400" },
    { emoji: "🌳", color: "from-green-700 to-green-900", shadowColor: "shadow-green-500" }
  ];

  const currentPlant = plantStages[plantStage] || plantStages[0];

  const getMoodMessage = () => {
    switch (mood) {
      case 'thinking':
        return '🤔';
      case 'excited':
        return '¡Genial!';
      default:
        return '¡Hola!';
    }
  };

  const getAnimationIntensity = () => {
    switch (mood) {
      case 'excited':
        return 'animate-bounce scale-110';
      case 'thinking':
        return 'scale-105';
      default:
        return 'animate-bounce scale-105';
    }
  };

  return (
    <div className={`${sizeClasses[size]} relative`}>
      {/* Planta animada según el estadio */}
      <div 
        className={`w-full h-full bg-gradient-to-br ${currentPlant.color} rounded-full ${currentPlant.shadowColor} shadow-lg flex items-center justify-center border-2 border-green-800 transition-all duration-300 ${
          isAnimating ? getAnimationIntensity() : ''
        }`}
      >
        {/* Emoji de la planta según el estadio */}
        <div className={`text-3xl ${size === 'large' ? 'text-4xl' : size === 'small' ? 'text-xl' : 'text-2xl'} transition-all duration-300 ${
          isAnimating ? 'scale-110' : ''
        }`}>
          {currentPlant.emoji}
        </div>
      </div>
      
      {/* Efectos de partículas para estadios avanzados */}
      {plantStage >= 2 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs opacity-70 animate-bounce" style={{ animationDelay: '0.5s' }}>
            ✨
          </div>
          {plantStage >= 4 && (
            <>
              <div className="absolute top-1 right-0 text-xs opacity-70 animate-bounce" style={{ animationDelay: '1s' }}>
                🌸
              </div>
              <div className="absolute top-1 left-0 text-xs opacity-70 animate-bounce" style={{ animationDelay: '1.5s' }}>
                🦋
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Mensaje animado con posicionamiento mejorado */}
      {isAnimating && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 text-xs font-semibold text-green-600 shadow-lg animate-fade-in z-10 whitespace-nowrap max-w-screen border border-green-200">
          {getMoodMessage()}
          {/* Flecha apuntando hacia abajo */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
};

export default EcoMascot;
