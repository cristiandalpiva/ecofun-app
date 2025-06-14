
import { Leaf, Heart, Shield, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-green-600 to-blue-600 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-white bg-white/20 px-3 py-1 rounded-full border border-white/30">
                <span className="text-yellow-300">Eco</span><span className="text-green-200">Fun</span>
              </div>
            </div>
            <p className="text-green-100 text-sm leading-relaxed">
              Plataforma educativa que enseña a cuidar el planeta de forma divertida y segura para toda la familia.
            </p>
            <div className="flex items-center space-x-2 text-sm text-green-200">
              <Shield className="w-4 h-4" />
              <span>Contenido seguro para menores</span>
            </div>
          </div>

          {/* Enlaces útiles */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contenido</h4>
            <ul className="space-y-2 text-green-100">
              <li>
                <a href="#juegos" className="hover:text-white transition-colors text-sm">
                  Juegos Educativos
                </a>
              </li>
              <li>
                <a href="#retos" className="hover:text-white transition-colors text-sm">
                  Retos Semanales
                </a>
              </li>
              <li>
                <a href="#aprender" className="hover:text-white transition-colors text-sm">
                  Contenido Educativo
                </a>
              </li>
              <li>
                <a href="#consejos" className="hover:text-white transition-colors text-sm">
                  Consejos Diarios
                </a>
              </li>
            </ul>
          </div>

          {/* Información legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Información</h4>
            <ul className="space-y-2 text-green-100">
              <li>
                <a href="#privacidad" className="hover:text-white transition-colors text-sm">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#terminos" className="hover:text-white transition-colors text-sm">
                  Términos de Uso
                </a>
              </li>
              <li>
                <a href="#seguridad" className="hover:text-white transition-colors text-sm">
                  Seguridad Infantil
                </a>
              </li>
              <li>
                <a href="#padres" className="hover:text-white transition-colors text-sm">
                  Información para Padres
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contacto</h4>
            <div className="space-y-3 text-green-100">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-green-200" />
                <span>hola@ecofun.app</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-green-200" />
                <span>Soporte familias</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-green-200" />
                <span>Educación global</span>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-white/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-green-100">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-300" />
                <span>Hecho con amor por el planeta</span>
              </div>
              <div className="flex items-center space-x-1">
                <Leaf className="w-4 h-4 text-green-300" />
                <span>Educación sostenible</span>
              </div>
            </div>
            
            <div className="text-sm text-green-100 text-center md:text-right">
              <p>© {currentYear} EcoFun. Todos los derechos reservados.</p>
              <p className="text-xs text-green-200 mt-1">
                Plataforma educativa certificada para el aprendizaje seguro
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
