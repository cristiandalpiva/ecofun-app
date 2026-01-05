
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


        </div>
      </div>
    </div>
  );
};

export default Suggestions;
