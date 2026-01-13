import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Leaf, Mail, Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { z } from 'zod';

const signUpSchema = z.object({
  displayName: z.string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s'-]+$/, "Solo letras, números y espacios"),
  email: z.string()
    .trim()
    .email("Por favor ingresa un email válido")
    .max(255, "El email no puede exceder 255 caracteres"),
  password: z.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(72, "La contraseña no puede exceder 72 caracteres")
});

const signInSchema = z.object({
  email: z.string()
    .trim()
    .email("Por favor ingresa un email válido"),
  password: z.string()
    .min(1, "La contraseña es requerida")
});

const Auth = () => {
  const navigate = useNavigate();
  const { user, isLoading, signUp, signIn } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  useEffect(() => {
    if (user && !isLoading) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const validation = signInSchema.safeParse({
      email: loginEmail,
      password: loginPassword
    });

    if (!validation.success) {
      const newErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[`login_${err.path[0]}`] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setIsSubmitting(false);

    if (error) {
      toast.error('Error al iniciar sesión. Verifica tus credenciales.');
    } else {
      toast.success('¡Bienvenido de vuelta, EcoHéroe!');
      navigate('/');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = signUpSchema.safeParse({
      displayName: signUpName,
      email: signUpEmail,
      password: signUpPassword
    });

    if (!validation.success) {
      const newErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[`signup_${err.path[0]}`] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    const { error } = await signUp(signUpEmail, signUpPassword, signUpName);
    setIsSubmitting(false);

    if (error) {
      if (error.message.includes('already registered')) {
        toast.error('Este email ya está registrado. Intenta iniciar sesión.');
      } else {
        toast.error('Error al crear la cuenta. Intenta de nuevo.');
      }
    } else {
      toast.success('¡Cuenta creada! Ya puedes empezar tu aventura ecológica.');
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-cyan-100 flex items-center justify-center">
        <div className="animate-pulse text-green-600 text-lg">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-cyan-100 p-4">
      <div className="container mx-auto max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Button>
          </Link>
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg mb-4">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-green-700">EcoFun</h1>
          <p className="text-green-600">Tu aventura ecológica te espera</p>
        </div>

        {/* Auth Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl text-green-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
              ¡Únete a los EcoHéroes!
            </CardTitle>
            <CardDescription>
              Guarda tu progreso y compite con otros jugadores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="signup">Crear Cuenta</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="flex items-center">
                      <Mail className="w-4 h-4 mr-1 text-green-500" />
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className={errors.login_email ? 'border-red-500' : ''}
                      maxLength={255}
                    />
                    {errors.login_email && (
                      <p className="text-xs text-red-500">{errors.login_email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="flex items-center">
                      <Lock className="w-4 h-4 mr-1 text-green-500" />
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Tu contraseña"
                        className={errors.login_password ? 'border-red-500 pr-10' : 'pr-10'}
                        maxLength={72}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.login_password && (
                      <p className="text-xs text-red-500">{errors.login_password}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    {isSubmitting ? 'Entrando...' : 'Iniciar Sesión'}
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="flex items-center">
                      <User className="w-4 h-4 mr-1 text-green-500" />
                      Nombre de EcoHéroe
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      placeholder="Tu nombre de héroe"
                      className={errors.signup_displayName ? 'border-red-500' : ''}
                      maxLength={50}
                    />
                    {errors.signup_displayName && (
                      <p className="text-xs text-red-500">{errors.signup_displayName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="flex items-center">
                      <Mail className="w-4 h-4 mr-1 text-green-500" />
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className={errors.signup_email ? 'border-red-500' : ''}
                      maxLength={255}
                    />
                    {errors.signup_email && (
                      <p className="text-xs text-red-500">{errors.signup_email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="flex items-center">
                      <Lock className="w-4 h-4 mr-1 text-green-500" />
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        className={errors.signup_password ? 'border-red-500 pr-10' : 'pr-10'}
                        maxLength={72}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.signup_password && (
                      <p className="text-xs text-red-500">{errors.signup_password}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
                  </Button>

                  <p className="text-xs text-center text-gray-500 mt-4">
                    Al crear una cuenta, aceptas nuestra{' '}
                    <Link to="/child-safety" className="text-green-600 underline">
                      política de privacidad
                    </Link>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-3">Al crear tu cuenta podrás:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
              💾 Guardar tu progreso
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
              📱 Jugar en cualquier dispositivo
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">
              🏆 Competir en rankings
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
