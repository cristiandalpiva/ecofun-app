
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import EcoMascot from "@/components/EcoMascot";
import { ChevronRight, ChevronLeft, SkipForward } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSkip: () => void;
}

const OnboardingModal = ({ isOpen, onClose, onSkip }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "¡Bienvenido, EcoHéroe! 🌱",
      content: "Soy Verde, tu amigo ecológico. Juntos vamos a aprender a cuidar nuestro planeta de forma divertida. ¡Empezarás siendo una pequeña semilla!",
      mascotMood: "happy" as const,
      bgGradient: "from-emerald-400 via-green-400 to-cyan-400"
    },
    {
      title: "Completa Retos Semanales 📋",
      content: "Cada semana tendrás misiones sencillas como apagar luces o separar basura. ¡Siempre con ayuda de un adulto! Cada reto te dará puntos para crecer.",
      mascotMood: "thinking" as const,
      bgGradient: "from-blue-400 via-cyan-400 to-emerald-400"
    },
    {
      title: "Juega y Aprende 🎮",
      content: "Resuelve puzzles, responde trivias, juega memoria, cierra llaves que gotean y atrapa basura. Cada juego te enseñará algo nuevo sobre el medio ambiente.",
      mascotMood: "excited" as const,
      bgGradient: "from-purple-400 via-blue-400 to-cyan-400"
    },
    {
      title: "Haz Crecer tu Planta 🌳",
      content: "Empezarás como una semilla y por cada reto completado y juego ganado, crecerás hasta convertirte en un gran árbol. ¡Cada 100 puntos subes de nivel!",
      mascotMood: "happy" as const,
      bgGradient: "from-green-400 via-emerald-400 to-teal-400"
    },
    {
      title: "¡Listos para Empezar! ✨",
      content: "Recuerda: siempre pide ayuda a un adulto cuando sea necesario. Lee los consejos diarios y explora el contenido educativo. ¡Vamos a salvar el planeta juntos!",
      mascotMood: "excited" as const,
      bgGradient: "from-yellow-400 via-orange-400 to-red-400"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-md mx-4 sm:mx-auto bg-gradient-to-br ${steps[currentStep].bgGradient} border-2 border-white/30 p-0 shadow-2xl`}>
        <DialogTitle className="sr-only">Tutorial de Bienvenida - Paso {currentStep + 1}</DialogTitle>
        <DialogDescription className="sr-only">
          {steps[currentStep].content}
        </DialogDescription>
        <Card className="border-none shadow-none bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            {/* Skip button - only show on first step */}
            {currentStep === 0 && (
              <div className="flex justify-end mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSkip}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100/80"
                >
                  <SkipForward className="w-4 h-4 mr-1" />
                  Saltar Tutorial
                </Button>
              </div>
            )}
            
            <div className="mb-4">
              <EcoMascot size="large" mood={steps[currentStep].mascotMood} plantStage={0} />
            </div>
            
            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-700 via-green-700 to-cyan-700 bg-clip-text text-transparent mb-3">
              {steps[currentStep].title}
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              {steps[currentStep].content}
            </p>

            {/* Progress dots */}
            <div className="flex justify-center space-x-2 mb-6">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 scale-125 shadow-lg' 
                      : index < currentStep 
                        ? 'bg-emerald-400' 
                        : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between items-center">
              <Button
                onClick={prevStep}
                variant="outline"
                className={`border-2 border-emerald-400 text-emerald-600 hover:bg-emerald-50 font-semibold ${
                  currentStep === 0 ? 'invisible' : ''
                }`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>

              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-emerald-500 via-green-500 to-cyan-500 hover:from-emerald-600 hover:via-green-600 hover:to-cyan-600 text-white font-bold px-8 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {currentStep === steps.length - 1 ? '¡Empezar! 🚀' : 'Siguiente'}
                {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
