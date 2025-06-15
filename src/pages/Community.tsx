
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, MessageSquare, Heart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Community = () => {
  const topPlayers = [
    { name: "EcoMaestro92", points: 1250, level: "👑 Leyenda", badge: "🌍 Guardián Global" },
    { name: "PlantLover", points: 980, level: "🌟 Héroe", badge: "🌱 Jardinero Experto" },
    { name: "RecycleKing", points: 875, level: "🏆 Maestro", badge: "♻️ Rey del Reciclaje" },
    { name: "WaterSaver", points: 720, level: "🌿 Guardián", badge: "💧 Protector del Agua" },
    { name: "AnimalFriend", points: 650, level: "🌱 Explorador", badge: "🦋 Amigo de Animales" }
  ];

  const recentActivity = [
    { user: "EcoMaestro92", action: "completó", game: "Salva la Fauna", time: "Hace 2 horas", icon: "🦋" },
    { user: "PlantLover", action: "alcanzó", game: "500 puntos", time: "Hace 3 horas", icon: "🏆" },
    { user: "RecycleKing", action: "desbloqueó", game: "Maestro del Reciclaje", time: "Hace 5 horas", icon: "♻️" },
    { user: "WaterSaver", action: "completó", game: "Guardián del Agua", time: "Hace 1 día", icon: "💧" },
    { user: "AnimalFriend", action: "se unió a", game: "EcoFun", time: "Hace 2 días", icon: "🌱" }
  ];

  const challenges = [
    {
      title: "Semana del Reciclaje",
      description: "Completa 3 juegos de reciclaje esta semana",
      progress: 67,
      reward: "Badge especial + 100 puntos",
      deadline: "3 días restantes",
      icon: "♻️"
    },
    {
      title: "Protector de Animales",
      description: "Salva 25 animales en los juegos de fauna",
      progress: 40,
      reward: "Título 'Amigo de la Fauna'",
      deadline: "1 semana restante",
      icon: "🦋"
    },
    {
      title: "Eco Estudiante",
      description: "Completa todos los cuentos interactivos",
      progress: 25,
      reward: "200 puntos + badge de sabiduría",
      deadline: "2 semanas restantes",
      icon: "📚"
    }
  ];

  const ecoTips = [
    { tip: "Usa ambos lados del papel antes de reciclarlo", author: "EcoMaestro92", likes: 24 },
    { tip: "Apaga las luces cuando salgas de una habitación", author: "PlantLover", likes: 18 },
    { tip: "Lleva tu propia bolsa de tela cuando vayas de compras", author: "RecycleKing", likes: 31 },
    { tip: "Cierra el grifo mientras te cepillas los dientes", author: "WaterSaver", likes: 22 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
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

          {/* Estadísticas de la Comunidad */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">👥</div>
                <div className="text-xl font-bold text-purple-600">1,247</div>
                <div className="text-sm text-purple-700">EcoHéroes</div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">🎮</div>
                <div className="text-xl font-bold text-blue-600">15,892</div>
                <div className="text-sm text-blue-700">Juegos Completados</div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">🌱</div>
                <div className="text-xl font-bold text-green-600">89,234</div>
                <div className="text-sm text-green-700">Árboles Virtuales</div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-pink-200 shadow-xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">💡</div>
                <div className="text-xl font-bold text-pink-600">2,156</div>
                <div className="text-sm text-pink-700">Consejos Compartidos</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Ranking de Jugadores */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center">
                  <Trophy className="w-6 h-6 mr-2" />
                  Top EcoHéroes
                </h2>
                <div className="space-y-3">
                  {topPlayers.map((player, index) => (
                    <div key={player.name} className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <div className="text-2xl mr-3">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}°`}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{player.name}</div>
                        <div className="text-sm text-gray-600">{player.badge}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-purple-600">{player.points} pts</div>
                        <div className="text-sm">{player.level}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actividad Reciente */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-xl">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2" />
                  Actividad Reciente
                </h2>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                      <div className="text-xl mr-3">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-semibold text-blue-700">{activity.user}</span>
                          <span className="text-gray-600"> {activity.action} </span>
                          <span className="font-semibold text-gray-800">{activity.game}</span>
                        </div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Desafíos Comunitarios */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
                <Target className="w-6 h-6 mr-2" />
                Desafíos Comunitarios
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {challenges.map((challenge, index) => (
                  <div key={index} className="p-4 bg-gradient-to-b from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="text-center mb-3">
                      <div className="text-2xl mb-2">{challenge.icon}</div>
                      <h3 className="font-bold text-gray-800">{challenge.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progreso</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>
                    <div className="text-xs text-green-700 mb-2">
                      🎁 {challenge.reward}
                    </div>
                    <div className="text-xs text-orange-600">
                      ⏰ {challenge.deadline}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Consejos Eco */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-pink-200 shadow-xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-pink-700 mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-2" />
                Consejos EcoFriendly
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {ecoTips.map((tip, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                    <p className="text-sm text-gray-700 mb-2">💡 {tip.tip}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Por {tip.author}</span>
                      <div className="flex items-center text-red-500">
                        <Heart className="w-4 h-4 mr-1" />
                        <span className="text-xs">{tip.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <Button variant="outline" className="border-2 border-pink-400 text-pink-600 hover:bg-pink-50">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir tu Consejo
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Link to="/">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg">
                ¡Unirse a la Aventura!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
