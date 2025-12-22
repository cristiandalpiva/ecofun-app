
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Award, Star, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const Achievements = () => {
  // Leer puntos del localStorage para determinar progreso real
  const userPoints = parseInt(localStorage.getItem('ecoPoints') || '0');
  const hasPlayedGames = userPoints > 0;

  const achievements = [
    {
      id: 1,
      name: "Primer Paso",
      description: "Completa tu primer juego",
      icon: "🎯",
      points: 10,
      unlocked: hasPlayedGames,
      category: "Principiante"
    },
    {
      id: 2,
      name: "Eco Explorador",
      description: "Completa 5 juegos diferentes",
      icon: "🌱",
      points: 50,
      unlocked: userPoints >= 200,
      category: "Explorador"
    },
    {
      id: 3,
      name: "Guardián Verde",
      description: "Alcanza 500 puntos",
      icon: "🌿",
      points: 100,
      unlocked: userPoints >= 500,
      category: "Guardián"
    },
    {
      id: 4,
      name: "Maestro del Reciclaje",
      description: "Completa todos los juegos de reciclaje",
      icon: "♻️",
      points: 75,
      unlocked: false,
      category: "Especialista"
    },
    {
      id: 5,
      name: "Protector de la Fauna",
      description: "Salva 50 animales en los juegos",
      icon: "🦋",
      points: 80,
      unlocked: false,
      category: "Especialista"
    },
    {
      id: 6,
      name: "Héroe del Agua",
      description: "Completa misiones relacionadas con el agua",
      icon: "💧",
      points: 90,
      unlocked: false,
      category: "Héroe"
    },
    {
      id: 7,
      name: "EcoMaestro",
      description: "Alcanza 1000 puntos totales",
      icon: "👑",
      points: 200,
      unlocked: userPoints >= 1000,
      category: "Maestro"
    },
    {
      id: 8,
      name: "Coleccionista Completo",
      description: "Desbloquea todos los logros",
      icon: "🏆",
      points: 300,
      unlocked: false,
      category: "Leyenda"
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const unlockedCount = unlockedAchievements.length;
  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0);

  const categories = [
    { name: "Principiante", color: "bg-green-100 text-green-800", count: achievements.filter(a => a.category === "Principiante" && a.unlocked).length },
    { name: "Explorador", color: "bg-blue-100 text-blue-800", count: achievements.filter(a => a.category === "Explorador" && a.unlocked).length },
    { name: "Guardián", color: "bg-purple-100 text-purple-800", count: achievements.filter(a => a.category === "Guardián" && a.unlocked).length },
    { name: "Especialista", color: "bg-orange-100 text-orange-800", count: achievements.filter(a => a.category === "Especialista" && a.unlocked).length },
    { name: "Héroe", color: "bg-red-100 text-red-800", count: achievements.filter(a => a.category === "Héroe" && a.unlocked).length },
    { name: "Maestro", color: "bg-yellow-100 text-yellow-800", count: achievements.filter(a => a.category === "Maestro" && a.unlocked).length },
    { name: "Leyenda", color: "bg-pink-100 text-pink-800", count: achievements.filter(a => a.category === "Leyenda" && a.unlocked).length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
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
            <h1 className="text-4xl font-bold text-orange-700 mb-4 flex items-center justify-center">
              <Award className="w-10 h-10 mr-3" />
              Centro de Logros
            </h1>
            <p className="text-lg text-orange-600">
              Descubre todos tus logros y metas por alcanzar
            </p>
          </div>

          {/* Estadísticas */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-orange-600">{unlockedCount}/{achievements.length}</div>
                <div className="text-sm text-orange-700">Logros Desbloqueados</div>
                <Progress value={(unlockedCount / achievements.length) * 100} className="mt-2 h-2" />
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-yellow-600">{totalPoints}</div>
                <div className="text-sm text-yellow-700">Puntos de Logros</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-green-600">{categories.filter(c => c.count > 0).length}</div>
                <div className="text-sm text-green-700">Categorías Activas</div>
              </CardContent>
            </Card>
          </div>

          {/* Categorías */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-xl mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-orange-700 mb-4 flex items-center">
                <Target className="w-6 h-6 mr-2" />
                Categorías de Logros
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {categories.map((category) => (
                  <div key={category.name} className="text-center">
                    <Badge className={`${category.color} w-full justify-center mb-1`}>
                      {category.name}
                    </Badge>
                    <div className="text-sm text-gray-600">{category.count} logros</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lista de Logros */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-orange-700 mb-6 flex items-center">
                <Star className="w-6 h-6 mr-2" />
                Todos los Logros
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-b from-yellow-50 to-orange-50 border-yellow-300 shadow-lg' 
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-3xl mb-2 ${!achievement.unlocked && 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <h3 className={`font-bold mb-2 ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-sm mb-3 ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge 
                          className={
                            categories.find(c => c.name === achievement.category)?.color || 'bg-gray-100 text-gray-800'
                          }
                        >
                          {achievement.category}
                        </Badge>
                        <div className={`text-sm font-semibold ${achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'}`}>
                          +{achievement.points} pts
                        </div>
                      </div>
                      {achievement.unlocked && (
                        <div className="mt-2">
                          <Badge className="bg-green-100 text-green-800 border-green-300">
                            ✓ Desbloqueado
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Link to="/">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg">
                ¡Seguir Jugando!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
