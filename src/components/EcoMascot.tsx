
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
      <div 
        className={`w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg flex items-center justify-center text-white font-bold border-4 border-white transition-all duration-300 ${
          isAnimating ? 'animate-bounce scale-110' : ''
        }`}
      >
        <div className="text-2xl">🌱</div>
      </div>
      <div className="absolute -top-1 -right-1 text-lg">
        {expressions[mood]}
      </div>
      {isAnimating && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 text-xs font-semibold text-green-600 shadow-lg animate-fade-in">
          ¡Hola!
        </div>
      )}
    </div>
  );
};

export default EcoMascot;
