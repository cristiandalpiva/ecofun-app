
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

  const expressions = {
    happy: "😊",
    excited: "🤩",
    thinking: "🤔"
  };

  return (
    <div className={`${sizeClasses[size]} relative`}>
      {/* Semilla/base del personaje */}
      <div 
        className={`w-full h-full bg-gradient-to-br from-amber-700 to-amber-900 rounded-full shadow-lg flex items-center justify-center border-2 border-amber-800 transition-all duration-300 ${
          isAnimating ? 'animate-bounce scale-110' : ''
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
            <div className="text-green-400 text-lg transform -rotate-12">🌿</div>
          </div>
        </div>
      </div>
      
      {/* Expresión */}
      <div className="absolute -top-1 -right-1 text-lg">
        {expressions[mood]}
      </div>
      
      {/* Mensaje animado */}
      {isAnimating && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 text-xs font-semibold text-green-600 shadow-lg animate-fade-in">
          ¡Hola!
        </div>
      )}
    </div>
  );
};

export default EcoMascot;
