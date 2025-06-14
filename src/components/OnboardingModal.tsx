
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EcoMascot from "@/components/EcoMascot";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "¡Bienvenido, EcoHéroe! 🌱",
      content: "Soy Verde, tu amigo ecológico. Juntos vamos a aprender a cuidar nuestro planeta de forma divertida.",
      mascotMood: "happy" as const
    },
    {
      title: "Completa Retos Semanales 📋",
      content: "Cada semana tendrás misiones sencillas como apagar luces o separar basura. ¡Siempre con ayuda de un adulto!",
      mascotMood: "thinking" as const
    },
    {
      title: "Juega y Aprende 🎮",
      content: "Resuelve puzzles, responde trivias y juega memoria. Cada juego te enseñará algo nuevo sobre el medio ambiente.",
      mascotMood: "excited" as const
    },
    {
      title: "Haz Crecer tu Planta 🌳",
      content: "Por cada reto completado y juego ganado, tu planta crecerá desde una semillita hasta convertirse en un gran árbol.",
      mascotMood: "happy" as const
    },
    {
      title: "¡Listos para Empezar! ✨",
      content: "Recuerda: siempre pide ayuda a un adulto cuando sea necesario. ¡Vamos a salvar el planeta juntos!",
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
      <DialogContent className="max-w-md mx-4 sm:mx-auto bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300 p-0">
        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <EcoMascot size="large" mood={steps[currentStep].mascotMood} />
            </div>
            
            <h2 className="text-xl font-bold text-green-700 mb-3">
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
                    index === currentStep ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between items-center">
              <Button
                onClick={prevStep}
                variant="outline"
                className={`border-green-400 text-green-600 hover:bg-green-50 ${
                  currentStep === 0 ? 'invisible' : ''
                }`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>

              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold px-6"
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
