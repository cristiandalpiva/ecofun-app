import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Lock, ShoppingCart, GraduationCap, Home, Star, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Footer from "@/components/Footer";

interface EcoBook {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: 'escuela' | 'familia';
  price: number;
  pages: number;
  topics: string[];
  featured?: boolean;
}

const EcoResources = () => {
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'escuela' | 'familia'>('todos');

  const ecoBooks: EcoBook[] = [
    {
      id: 'guia-docentes-reciclaje',
      title: 'Guía para Docentes: Reciclaje en el Aula',
      description: 'Actividades prácticas y lúdicas para enseñar reciclaje a niños de 6 a 12 años. Incluye planificaciones semanales y material imprimible.',
      emoji: '♻️',
      category: 'escuela',
      price: 9.99,
      pages: 85,
      topics: ['Reciclaje', 'Actividades grupales', 'Manualidades', 'Evaluaciones'],
      featured: true
    },
    {
      id: 'proyectos-ciencias-eco',
      title: 'Proyectos de Ciencias Ecológicas',
      description: 'Experimentos científicos sobre medio ambiente adaptados para primaria. Materiales sencillos y resultados sorprendentes.',
      emoji: '🔬',
      category: 'escuela',
      price: 12.99,
      pages: 120,
      topics: ['Experimentos', 'Ciclo del agua', 'Energía solar', 'Biodiversidad']
    },
    {
      id: 'cuentos-verdes-familia',
      title: 'Cuentos Verdes para la Familia',
      description: 'Colección de 15 cuentos ilustrados sobre ecología para leer en familia. Cada cuento incluye actividades de reflexión.',
      emoji: '📚',
      category: 'familia',
      price: 7.99,
      pages: 60,
      topics: ['Cuentos', 'Valores', 'Actividades familiares'],
      featured: true
    },
    {
      id: 'huerto-hogar',
      title: 'Mi Primer Huerto en Casa',
      description: 'Guía paso a paso para crear un huerto urbano con niños. Incluye calendario de siembra y recetas saludables.',
      emoji: '🌱',
      category: 'familia',
      price: 8.99,
      pages: 75,
      topics: ['Huerto urbano', 'Jardinería', 'Alimentación saludable']
    },
    {
      id: 'semana-tierra-escuela',
      title: 'Semana de la Tierra: Kit Escolar',
      description: 'Material completo para organizar una Semana de la Tierra en tu escuela. Carteles, actividades y ceremonias.',
      emoji: '🌍',
      category: 'escuela',
      price: 14.99,
      pages: 95,
      topics: ['Eventos escolares', 'Decoración', 'Actividades masivas']
    },
    {
      id: 'animales-peligro-cuaderno',
      title: 'Cuaderno de Animales en Peligro',
      description: 'Libro de actividades sobre especies amenazadas. Colorear, puzzles, datos curiosos y cómo ayudarlos.',
      emoji: '🐼',
      category: 'familia',
      price: 6.99,
      pages: 48,
      topics: ['Animales', 'Actividades', 'Colorear', 'Conservación']
    }
  ];

  const filteredBooks = selectedCategory === 'todos' 
    ? ecoBooks 
    : ecoBooks.filter(book => book.category === selectedCategory);

  const handlePurchase = (book: EcoBook) => {
    toast({
      title: "Próximamente 🚀",
      description: `La compra de "${book.title}" estará disponible pronto. ¡Estamos trabajando en integrar el sistema de pagos!`,
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b-2 border-emerald-200 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 transition-colors">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-semibold text-lg hidden sm:inline">Volver al Inicio</span>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-emerald-800 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Recursos Eco-Educativos
            </h1>
            <div className="w-24 hidden sm:block" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="text-5xl mb-4">📖</div>
          <h2 className="text-2xl sm:text-4xl font-bold text-emerald-800 mb-4">
            E-Books Educativos para Escuelas y Familias
          </h2>
          <p className="text-emerald-700 text-lg mb-6">
            Material didáctico descargable para enseñar ecología de forma divertida y efectiva.
          </p>
          
          {/* Payment Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-100 border-2 border-amber-300 rounded-full px-4 py-2 text-amber-800">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Próximamente: Compra con tarjeta vía Stripe</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            variant={selectedCategory === 'todos' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('todos')}
            className="rounded-full"
          >
            <Star className="w-4 h-4 mr-2" />
            Todos
          </Button>
          <Button
            variant={selectedCategory === 'escuela' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('escuela')}
            className="rounded-full"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Para Escuelas
          </Button>
          <Button
            variant={selectedCategory === 'familia' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('familia')}
            className="rounded-full"
          >
            <Home className="w-4 h-4 mr-2" />
            Para Familias
          </Button>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card 
              key={book.id} 
              className={`bg-white/80 backdrop-blur-sm border-2 hover:shadow-xl transition-all duration-300 ${
                book.featured ? 'border-emerald-400 ring-2 ring-emerald-200' : 'border-emerald-200'
              }`}
            >
              {book.featured && (
                <div className="absolute -top-2 -right-2 z-10">
                  <Badge className="bg-emerald-500 text-white shadow-lg">
                    ⭐ Destacado
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="text-4xl mb-3">{book.emoji}</div>
                <CardTitle className="text-lg text-emerald-800 leading-tight">{book.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className={`${
                    book.category === 'escuela' 
                      ? 'border-blue-300 text-blue-700 bg-blue-50' 
                      : 'border-pink-300 text-pink-700 bg-pink-50'
                  }`}>
                    {book.category === 'escuela' ? (
                      <><GraduationCap className="w-3 h-3 mr-1" /> Escuelas</>
                    ) : (
                      <><Home className="w-3 h-3 mr-1" /> Familias</>
                    )}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {book.pages} páginas
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-emerald-700 text-sm leading-relaxed">{book.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {book.topics.slice(0, 3).map((topic, i) => (
                    <Badge key={i} variant="outline" className="text-xs border-emerald-200 text-emerald-600">
                      {topic}
                    </Badge>
                  ))}
                  {book.topics.length > 3 && (
                    <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-600">
                      +{book.topics.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-emerald-100">
                  <div className="text-2xl font-bold text-emerald-700">
                    €{book.price.toFixed(2)}
                  </div>
                  <Button
                    onClick={() => handlePurchase(book)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Comprar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white/60 rounded-2xl p-6 sm:p-8 border-2 border-emerald-200">
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6" />
            ¿Por qué elegir nuestros recursos?
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">✅</div>
              <div>
                <h4 className="font-semibold text-emerald-700">Creados por educadores</h4>
                <p className="text-sm text-emerald-600">Diseñados por docentes con experiencia en educación ambiental</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">📱</div>
              <div>
                <h4 className="font-semibold text-emerald-700">Formato digital</h4>
                <p className="text-sm text-emerald-600">Descarga inmediata en PDF, compatible con todos los dispositivos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">💚</div>
              <div>
                <h4 className="font-semibold text-emerald-700">Impacto positivo</h4>
                <p className="text-sm text-emerald-600">Parte de los ingresos se destina a proyectos de reforestación</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EcoResources;
