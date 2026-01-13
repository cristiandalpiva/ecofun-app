import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Sparkles, Bell, Clock, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import NotifyMeForm from '@/components/NotifyMeForm';

const Community = () => {
  const [isNotifyFormOpen, setIsNotifyFormOpen] = useState(false);
  const upcomingFeatures = [
    {
      title: "Ranking de EcoHéroes",
      description: "Compite con otros jugadores y sube en el ranking global",
      icon: "🏆",
      status: "En desarrollo"
    },
    {
      title: "Desafíos en Equipo",
      description: "Únete a equipos y completa misiones juntos",
      icon: "👥",
      status: "Próximamente"
    },
    {
      title: "Chat Comunitario",
      description: "Comparte consejos y experiencias con otros EcoHéroes",
      icon: "💬",
      status: "Próximamente"
    },
    {
      title: "Eventos Especiales",
      description: "Participa en eventos temáticos con recompensas exclusivas",
      icon: "🎉",
      status: "Próximamente"
    },
    {
      title: "Compartir Consejos",
      description: "Publica tus mejores consejos ecológicos para la comunidad",
      icon: "💡",
      status: "Próximamente"
    },
    {
      title: "Perfil Público",
      description: "Personaliza tu perfil y muestra tus logros",
      icon: "🌟",
      status: "Próximamente"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-700 mb-4 flex items-center justify-center">
              <Users className="w-10 h-10 mr-3" />
              Comunidad EcoFun
            </h1>
            <p className="text-lg text-purple-600">
              Conecta con otros EcoHéroes y comparte tu pasión por el planeta
            </p>
          </div>

          {/* Banner de Próximamente */}
          <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white border-0 shadow-2xl mb-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjEiIGN4PSIyMCIgY3k9IjIwIiByPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-8 h-8 mr-2 animate-pulse" />
                  <span className="text-2xl font-bold">¡Muy Pronto!</span>
                  <Sparkles className="w-8 h-8 ml-2 animate-pulse" />
                </div>
                <div className="text-6xl mb-4">🚀</div>
                <h2 className="text-3xl font-bold mb-4">
                  La Comunidad EcoFun está en camino
                </h2>
                <p className="text-lg text-white/90 max-w-2xl mb-6">
                  Estamos trabajando para crear el mejor espacio donde todos los EcoHéroes puedan conectarse, 
                  compartir logros y trabajar juntos por un planeta más verde.
                </p>
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-6 py-3">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Lanzamiento: Próximamente en 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notificación de suscripción */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-full p-3 mr-4">
                    <Bell className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">¿Quieres ser el primero en enterarte?</h3>
                    <p className="text-sm text-gray-600">Te avisaremos cuando la comunidad esté lista</p>
                  </div>
                </div>
                <Button 
                  onClick={() => setIsNotifyFormOpen(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Avisarme
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notify Me Form Modal */}
          <NotifyMeForm 
            isOpen={isNotifyFormOpen} 
            onClose={() => setIsNotifyFormOpen(false)} 
          />

          {/* Funcionalidades que vienen */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-indigo-200 shadow-xl mb-8">
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <Rocket className="w-6 h-6 text-indigo-600 mr-2" />
                <h2 className="text-2xl font-bold text-indigo-700">Funcionalidades en Desarrollo</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-gradient-to-b from-indigo-50 to-purple-50 border border-indigo-200"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{feature.icon}</div>
                      <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 cursor-default">
                        {feature.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mensaje motivacional */}
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">
                Mientras tanto, ¡sigue jugando!
              </h3>
              <p className="text-emerald-600 mb-4">
                Cada juego que completas hace crecer tu planta y te prepara para ser un líder de la comunidad
              </p>
              <Link to="/">
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold">
                  ¡Seguir Jugando!
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;
