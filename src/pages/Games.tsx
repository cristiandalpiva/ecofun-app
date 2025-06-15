
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, GamepadIcon, Clock, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Games = () => {
  const gameCategories = [
    {
      name: "Reciclaje",
      icon: "♻️",
      color: "bg-green-100 text-green-800",
      games: ["EcoTetris", "Memoria del Reciclaje", "Atrapa Basura"]
    },
    {
      name: "Naturaleza", 
      icon: "🌿",
      color: "bg-emerald-100 text-emerald-800",
      games: ["Cuidado de Plantas", "Adivina la Planta", "Salva la Fauna"]
    },
    {
      name: "Energía",
      icon: "☀️", 
      color: "bg-yellow-100 text-yellow-800",
      games: ["Paneles Solares"]
    },
    {
      name: "Educación",
      icon: "📚",
      color: "bg-blue-100 text-blue-800", 
      games: ["Safari Animal", "Quiz Ecológico", "Puzzle Verde", "Toca Verde", "Cuentos Ecológicos"]
    }
  ];

  const achievements = [
    { name: "Primer Juego", icon: "🏆", description: "Completa tu primer juego" },
    { name: "EcoMaestro", icon: "👑", description: "Alcanza 1000 puntos" },
    { name: "Coleccionista", icon: "🎯", description: "Completa todos los juegos" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-cyan-50">
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
            <h1 className="text-4xl font-bold text-emerald-700 mb-4 flex items-center justify-center">
              <GamepadIcon className="w-10 h-10 mr-3" />
              Centro de Juegos EcoFun
            </h1>
            <p className="text-lg text-emerald-600">
              Descubre todos nuestros juegos educativos sobre el medio ambiente
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-xl">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-emerald-700 mb-4 flex items-center">
                  <Trophy className="w-6 h-6 mr-2" />
                  Categorías de Juegos
                </h2>
                <div className="space-y-4">
                  {gameCategories.map((category) => (
                    <div key={category.name} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{category.icon}</span>
                        <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.games.map((game) => (
                          <Badge key={game} className={category.color}>
                            {game}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-xl">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-emerald-700 mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-2" />
                  Estadísticas de Juego
                </h2>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-600">12</div>
                    <div className="text-sm text-emerald-700">Juegos Disponibles</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">4</div>
                      <div className="text-xs text-blue-700">Categorías</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">∞</div>
                      <div className="text-xs text-purple-700">Diversión</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-2 border-emerald-200 shadow-xl mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-emerald-700 mb-4">Logros Disponibles</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.name} className="text-center p-4 bg-gradient-to-b from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h3 className="font-bold text-gray-800">{achievement.name}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link to="/">
              <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg">
                ¡Empezar a Jugar!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
