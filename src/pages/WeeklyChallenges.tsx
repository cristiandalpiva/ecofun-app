import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Target, Calendar, Gift, Clock, Trophy, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const WeeklyChallenges = () => {
  const currentWeek = {
    number: 12,
    theme: "Protectores del Océano",
    emoji: "🌊",
    startDate: "16 Dic",
    endDate: "22 Dic"
  };

  const weeklyChallenge = {
    title: "Limpia el Océano",
    description: "Completa juegos relacionados con el agua y el océano para ganar recompensas especiales",
    totalGoal: 5,
    currentProgress: 0,
    reward: "Badge exclusivo 'Guardián del Mar' + 200 puntos",
    timeRemaining: "6 días restantes"
  };

  const dailyChallenges = [
    {
      day: "Lunes",
      title: "Atrapa 20 plásticos",
      game: "Aventura Submarina",
      completed: false,
      points: 30,
      icon: "🤿"
    },
    {
      day: "Martes",
      title: "Cuida el Agua",
      game: "Cuida el Agua",
      completed: false,
      points: 25,
      icon: "💧"
    },
    {
      day: "Miércoles",
      title: "Salva 5 peces",
      game: "Atrapa Basura",
      completed: false,
      points: 35,
      icon: "🐟"
    },
    {
      day: "Jueves",
      title: "Quiz del Mar",
      game: "Quiz Ecológico",
      completed: false,
      points: 40,
      icon: "🌍"
    },
    {
      day: "Viernes",
      title: "Memoria Marina",
      game: "Memoria del Reciclaje",
      completed: false,
      points: 30,
      icon: "🗂️"
    },
    {
      day: "Sábado",
      title: "Historia del Océano",
      game: "Cuentos Ecológicos",
      completed: false,
      points: 50,
      icon: "📚"
    },
    {
      day: "Domingo",
      title: "Reto Final",
      game: "Guardianes del Hábitat",
      completed: false,
      points: 70,
      icon: "🌍"
    }
  ];

  const previousWeeks = [
    { week: 11, theme: "Semana del Reciclaje", emoji: "♻️", participated: false },
    { week: 10, theme: "Protectores de la Fauna", emoji: "🦋", participated: false },
    { week: 9, theme: "Energía Sostenible", emoji: "⚡", participated: false }
  ];

  const completedCount = dailyChallenges.filter(c => c.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
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

          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-blue-700 mb-2 sm:mb-4 flex items-center justify-center">
              <Target className="w-6 h-6 sm:w-10 sm:h-10 mr-2 sm:mr-3" />
              Retos Semanales
            </h1>
            <p className="text-sm sm:text-lg text-blue-600">
              ¡Completa retos cada semana y gana recompensas exclusivas!
            </p>
          </div>

          {/* Semana Actual */}
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-xl mb-6 sm:mb-8">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center">
                  <div className="text-3xl sm:text-5xl mr-3 sm:mr-4">{currentWeek.emoji}</div>
                  <div>
                    <Badge className="bg-white/20 text-white mb-1 sm:mb-2 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      Semana {currentWeek.number}
                    </Badge>
                    <h2 className="text-lg sm:text-2xl font-bold">{currentWeek.theme}</h2>
                    <p className="text-blue-100 text-sm">{currentWeek.startDate} - {currentWeek.endDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-semibold text-sm sm:text-base">{weeklyChallenge.timeRemaining}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reto Principal de la Semana */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-xl mb-8">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
                <h2 className="text-2xl font-bold text-blue-700">Reto Principal</h2>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{weeklyChallenge.title}</h3>
                <p className="text-gray-600 mb-4">{weeklyChallenge.description}</p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-blue-700 font-semibold">Progreso</span>
                    <span className="text-blue-700">{weeklyChallenge.currentProgress}/{weeklyChallenge.totalGoal} retos</span>
                  </div>
                  <Progress value={(weeklyChallenge.currentProgress / weeklyChallenge.totalGoal) * 100} className="h-3" />
                </div>
                <div className="flex items-center text-green-600">
                  <Gift className="w-5 h-5 mr-2" />
                  <span className="font-semibold">{weeklyChallenge.reward}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Retos Diarios */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-indigo-200 shadow-xl mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Flame className="w-6 h-6 text-orange-500 mr-2" />
                  <h2 className="text-2xl font-bold text-indigo-700">Retos Diarios</h2>
                </div>
                <Badge className="bg-indigo-100 text-indigo-700">
                  {completedCount}/{dailyChallenges.length} completados
                </Badge>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {dailyChallenges.map((challenge, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      challenge.completed 
                        ? 'bg-gradient-to-b from-green-50 to-emerald-50 border-green-300' 
                        : 'bg-gradient-to-b from-gray-50 to-slate-50 border-gray-200'
                    }`}
                  >
                    <div className="text-center">
                      <Badge className={`mb-2 ${challenge.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {challenge.day}
                      </Badge>
                      <div className={`text-3xl mb-2 ${!challenge.completed && 'opacity-50'}`}>
                        {challenge.icon}
                      </div>
                      <h3 className={`font-bold text-sm mb-1 ${challenge.completed ? 'text-gray-800' : 'text-gray-500'}`}>
                        {challenge.title}
                      </h3>
                      <p className={`text-xs mb-2 ${challenge.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                        {challenge.game}
                      </p>
                      <div className={`text-sm font-semibold ${challenge.completed ? 'text-yellow-600' : 'text-gray-400'}`}>
                        +{challenge.points} pts
                      </div>
                      {challenge.completed && (
                        <Badge className="mt-2 bg-green-100 text-green-700 border-green-300">
                          ✓ Completado
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Semanas Anteriores */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">Semanas Anteriores</h2>
              <div className="space-y-3">
                {previousWeeks.map((week) => (
                  <div 
                    key={week.week}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                  >
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{week.emoji}</div>
                      <div>
                        <p className="font-semibold text-gray-800">Semana {week.week}</p>
                        <p className="text-sm text-gray-600">{week.theme}</p>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100 cursor-default">
                      No participaste
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Link to="/">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg">
                ¡Empezar Retos!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChallenges;
