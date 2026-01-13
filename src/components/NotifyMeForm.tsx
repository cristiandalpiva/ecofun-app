import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Bell, Shield, Mail, User, Heart, CheckCircle2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

interface NotifyMeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const subscriptionSchema = z.object({
  parentName: z.string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/, "El nombre solo puede contener letras"),
  childName: z.string()
    .trim()
    .max(100, "El nombre no puede exceder 100 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]*$/, "El nombre solo puede contener letras")
    .optional()
    .or(z.literal('')),
  email: z.string()
    .trim()
    .email("Por favor ingresa un email válido")
    .max(255, "El email no puede exceder 255 caracteres"),
  parentalConsent: z.boolean().refine(val => val === true, {
    message: "Es necesario el consentimiento del padre/madre/tutor"
  }),
  privacyAccepted: z.boolean().refine(val => val === true, {
    message: "Debes aceptar la política de privacidad"
  })
});

const NotifyMeForm: React.FC<NotifyMeFormProps> = ({ isOpen, onClose }) => {
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [email, setEmail] = useState('');
  const [parentalConsent, setParentalConsent] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setParentName('');
    setChildName('');
    setEmail('');
    setParentalConsent(false);
    setPrivacyAccepted(false);
    setErrors({});
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const validationResult = subscriptionSchema.safeParse({
      parentName,
      childName,
      email,
      parentalConsent,
      privacyAccepted
    });

    if (!validationResult.success) {
      const newErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('community_subscriptions')
        .insert({
          email: validationResult.data.email.toLowerCase(),
          parent_name: validationResult.data.parentName,
          child_name: validationResult.data.childName || null,
          parental_consent: true,
          consent_date: new Date().toISOString()
        });

      if (error) {
        if (error.code === '23505') {
          toast.error("Este email ya está registrado para recibir notificaciones");
        } else {
          console.error('Subscription error:', error);
          toast.error("Hubo un error al registrar tu suscripción. Intenta de nuevo.");
        }
        return;
      }

      setIsSuccess(true);
      toast.success("¡Te avisaremos cuando la comunidad esté lista!");
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error("Hubo un error inesperado. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl text-green-700">¡Registro Exitoso!</DialogTitle>
              <DialogDescription className="text-gray-600 mt-2">
                Gracias por tu interés en la Comunidad EcoFun. Te enviaremos un email cuando estemos listos para lanzar.
              </DialogDescription>
            </DialogHeader>
            <Button 
              onClick={handleClose}
              className="mt-6 bg-gradient-to-r from-green-500 to-emerald-500"
            >
              ¡Entendido!
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center text-purple-700">
                <Bell className="w-5 h-5 mr-2" />
                Recibe Notificaciones
              </DialogTitle>
              <DialogDescription>
                Déjanos tu email y te avisaremos cuando la comunidad esté lista
              </DialogDescription>
            </DialogHeader>

            {/* Security Notice for Parents */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-800 text-sm">Aviso para Padres/Tutores</h4>
                  <p className="text-xs text-amber-700 mt-1">
                    EcoFun está diseñado para niños. Si eres menor de 13 años, un padre o tutor debe completar este formulario. 
                    Protegemos los datos según la normativa de protección de menores.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Parent/Guardian Name */}
              <div className="space-y-2">
                <Label htmlFor="parentName" className="flex items-center text-sm font-medium">
                  <User className="w-4 h-4 mr-1 text-purple-500" />
                  Nombre del Padre/Madre/Tutor *
                </Label>
                <Input
                  id="parentName"
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Nombre completo del adulto responsable"
                  className={errors.parentName ? 'border-red-500' : ''}
                  maxLength={100}
                />
                {errors.parentName && (
                  <p className="text-xs text-red-500">{errors.parentName}</p>
                )}
              </div>

              {/* Child Name (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="childName" className="flex items-center text-sm font-medium">
                  <Heart className="w-4 h-4 mr-1 text-pink-500" />
                  Nombre del EcoHéroe (opcional)
                </Label>
                <Input
                  id="childName"
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Nombre del niño/a"
                  className={errors.childName ? 'border-red-500' : ''}
                  maxLength={100}
                />
                {errors.childName && (
                  <p className="text-xs text-red-500">{errors.childName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center text-sm font-medium">
                  <Mail className="w-4 h-4 mr-1 text-blue-500" />
                  Email del Padre/Madre/Tutor *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@ejemplo.com"
                  className={errors.email ? 'border-red-500' : ''}
                  maxLength={255}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Parental Consent */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="parentalConsent"
                    checked={parentalConsent}
                    onCheckedChange={(checked) => setParentalConsent(checked as boolean)}
                    className={errors.parentalConsent ? 'border-red-500' : ''}
                  />
                  <Label 
                    htmlFor="parentalConsent" 
                    className="text-xs text-gray-700 cursor-pointer leading-relaxed"
                  >
                    <strong>Confirmo que soy mayor de edad</strong> y que soy el padre, madre o tutor legal autorizado para proporcionar esta información. Doy mi consentimiento para que EcoFun almacene estos datos con el fin de enviar notificaciones sobre la comunidad.
                  </Label>
                </div>
                {errors.parentalConsent && (
                  <p className="text-xs text-red-500 ml-6">{errors.parentalConsent}</p>
                )}

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacyAccepted"
                    checked={privacyAccepted}
                    onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                    className={errors.privacyAccepted ? 'border-red-500' : ''}
                  />
                  <Label 
                    htmlFor="privacyAccepted" 
                    className="text-xs text-gray-700 cursor-pointer leading-relaxed"
                  >
                    He leído y acepto la{' '}
                    <a href="/child-safety" target="_blank" className="text-purple-600 underline hover:text-purple-800">
                      política de privacidad y seguridad infantil
                    </a>
                    . Entiendo que puedo solicitar la eliminación de mis datos en cualquier momento.
                  </Label>
                </div>
                {errors.privacyAccepted && (
                  <p className="text-xs text-red-500 ml-6">{errors.privacyAccepted}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Registrando...
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4 mr-2" />
                    Avisarme
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-gray-500 mt-4">
                🔒 Tus datos están protegidos y nunca serán compartidos con terceros
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NotifyMeForm;
