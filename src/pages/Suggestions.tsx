
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, MessageSquare, ThumbsUp, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const Suggestions = () => {
  const [newSuggestion, setNewSuggestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('juegos');

  const categories = ['juegos', 'educación', 'interfaz', 'comunidad', 'otros'];

  const suggestions = [
    {
      id: 1,
      title: "Juego de Energías Renovables",
      description: "Un juego donde puedas construir tu propia ciudad sostenible con paneles solares, molinos de viento y otras energías limpias.",
      author: "EcoMaestro92",
      category: "juegos",
      votes: 45,
      status: "En Desarrollo",
      date: "Hace 3 días"
    },
    {
      id: 2,
      title: "Sistema de Intercambio de Consejos",
      description: "Una función donde los usuarios puedan intercambiar consejos ecológicos y ganar puntos por ayudar a otros.",
      author: "PlantLover",
      category: "comunidad",
      votes: 32,
      status: "Evaluando",
      date: "Hace 1 semana"
    },
    {
      id: 3,
      title: "Modo Oscuro para la App",
      description: "Agregar un tema oscuro para reducir el consumo de batería y ser más amigable con los ojos durante la noche.",
      author: "RecycleKing",
      category: "interfaz",
      votes: 28,
      status: "Planificado",
      date: "Hace 2 semanas"
    },
    {
      id: 4,
      title: "Quiz sobre Cambio Climático",
      description: "Un quiz educativo que enseñe sobre las causas y efectos del cambio climático con datos actuales.",
      author: "WaterSaver",
      category: "educación",
      votes: 38,
      status: "Implementado",
      date: "Hace 1 mes"
    },
    {
      id: 5,
      title: "Jardín Virtual Personal",
      description: "Un espacio donde cada usuario pueda mantener su propio jardín virtual, plantando árboles por cada juego completado.",
      author: "AnimalFriend",
      category: "juegos",
      votes: 52,
      status: "En Desarrollo",
      date: "Hace 2 meses"
    }
  ];

  const handleSubmitSuggestion = () => {
    if (newSuggestion.trim()) {
      toast({
        title: "¡Sugerencia Enviada! 💡",
        description: "Gracias por ayudarnos a mejorar EcoFun. Revisaremos tu idea pronto.",
        duration: 3000,
      });
      setNewSuggestion('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Implementado': return 'bg-green-100 text-green-800 border-green-300';
      case 'En Desarrollo': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Planificado': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Evaluando': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'juegos': return 'bg-purple-100 text-purple-800';
      case 'educación': return 'bg-green-100 text-green-800';
      case 'interfaz': return 'bg-blue-100 text-blue-800';
      case 'comunidad': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
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
            <h1 className="text-4xl font-bold text-rose-700 mb-4 flex items-center justify-center">
              <Heart className="w-10 h-10 mr-3" />
              Centro de Sugerencias
            </h1>
            <p className="text-lg text-rose-600">
              Comparte tus ideas para hacer EcoFun aún mejor
            </p>
          </div>

          {/* Formulario de Nueva Sugerencia */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-rose-200 shadow-xl mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-rose-700 mb-4 flex items-center">
                <MessageSquare className="w-6 h-6 mr-2" />
                Comparte tu Idea
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Categoría
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={`capitalize ${
                          selectedCategory === category 
                            ? 'bg-rose-500 hover:bg-rose-600' 
                            : 'border-rose-300 text-rose-600 hover:bg-rose-50'
                        }`}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tu Sugerencia
                  </label>
                  <textarea
                    value={newSuggestion}
                    onChange={(e) => setNewSuggestion(e.target.value)}
                    placeholder="Describe tu idea para mejorar EcoFun... ¡Queremos escucharte!"
                    className="w-full p-3 border-2 border-rose-200 rounded-lg focus:border-rose-400 focus:outline-none resize-none"
                    rows={4}
                  />
                </div>

                <Button 
                  onClick={handleSubmitSuggestion}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold"
                  disabled={!newSuggestion.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Sugerencia
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Sugerencias */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-rose-200 shadow-xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-rose-700 mb-6 flex items-center">
                <ThumbsUp className="w-6 h-6 mr-2" />
                Sugerencias de la Comunidad
              </h2>
              
              <div className="space-y-4">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-800">{suggestion.title}</h3>
                      <Badge className={getStatusColor(suggestion.status)}>
                        {suggestion.status}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{suggestion.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge className={getCategoryColor(suggestion.category)}>
                          {suggestion.category}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          Por {suggestion.author}
                        </span>
                        <span className="text-sm text-gray-500">
                          {suggestion.date}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {suggestion.votes}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-rose-200 shadow-xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">💡</div>
                <div className="text-xl font-bold text-rose-600">127</div>
                <div className="text-sm text-rose-700">Sugerencias Totales</div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">✅</div>
                <div className="text-xl font-bold text-green-600">23</div>
                <div className="text-sm text-green-700">Implementadas</div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">🚀</div>
                <div className="text-xl font-bold text-blue-600">15</div>
                <div className="text-sm text-blue-700">En Desarrollo</div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link to="/">
              <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg">
                ¡Seguir Explorando!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
