
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
      mascotMood: "happy" as const
    },
    {
      title: "Completa Retos Semanales 📋",
      content: "Cada semana tendrás misiones sencillas como apagar luces o separar basura. ¡Siempre con ayuda de un adulto! Cada reto te dará puntos para crecer.",
      mascotMood: "thinking" as const
    },
    {
      title: "Juega y Aprende 🎮",
      content: "Resuelve puzzles, responde trivias, juega memoria, cierra llaves que gotean y atrapa basura. Cada juego te enseñará algo nuevo sobre el medio ambiente.",
      mascotMood: "excited" as const
    },
    {
      title: "Haz Crecer tu Planta 🌳",
      content: "Empezarás como una semilla y por cada reto completado y juego ganado, crecerás hasta convertirte en un gran árbol. ¡Cada 100 puntos subes de nivel!",
      mascotMood: "happy" as const
    },
    {
      title: "¡Listos para Empezar! ✨",
      content: "Recuerda: siempre pide ayuda a un adulto cuando sea necesario. Lee los consejos diarios y explora el contenido educativo. ¡Vamos a salvar el planeta juntos!",
      mascotMood: "excited" as const
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
      <DialogContent className="max-w-md mx-4 sm:mx-auto bg-gradient-to-br from-emerald-50 to-cyan-50 border-2 border-emerald-300 p-0">
        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="p-6 text-center">
            {/* Skip button - only show on first step */}
            {currentStep === 0 && (
              <div className="flex justify-end mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSkip}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <SkipForward className="w-4 h-4 mr-1" />
                  Saltar Tutorial
                </Button>
              </div>
            )}
            
            <div className="mb-4">
              <EcoMascot size="large" mood={steps[currentStep].mascotMood} plantStage={0} />
            </div>
            
            <h2 className="text-xl font-bold text-emerald-700 mb-3">
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
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between items-center">
              <Button
                onClick={prevStep}
                variant="outline"
                className={`border-emerald-400 text-emerald-600 hover:bg-emerald-50 ${
                  currentStep === 0 ? 'invisible' : ''
                }`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>

              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold px-6"
              >
                {currentStep === steps.length - 1 ? '¡Empezar!' : 'Siguiente'}
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
