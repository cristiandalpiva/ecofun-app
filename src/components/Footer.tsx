
import { Leaf, Heart, Shield, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-green-600 to-blue-600 text-white mt-auto w-full max-w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo y descripción */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-xl sm:text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-300 to-green-200 bg-clip-text">
                EcoFun
              </div>
            </div>
            <p className="text-green-100 text-sm leading-relaxed">
              Plataforma educativa que enseña a cuidar el planeta de forma divertida y segura para toda la familia.
            </p>
            <div className="flex items-center space-x-2 text-sm text-green-200">
              <Shield className="w-4 h-4" aria-hidden="true" />
              <span>Contenido seguro para menores</span>
            </div>
          </div>

          {/* Enlaces útiles */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-white">Contenido</h4>
            <nav aria-label="Enlaces de contenido">
              <ul className="space-y-2 text-green-100">
                <li>
                  <Link
                    to="/educational-games"
                    className="hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 rounded block"
                  >
                    Juegos Educativos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/weekly-challenges"
                    className="hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 rounded block"
                  >
                    Retos Semanales
                  </Link>
                </li>
                <li>
                  <Link
                    to="/educational-content"
                    className="hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 rounded block"
                  >
                    Contenido Educativo
                  </Link>
                </li>
                <li>
                  <Link
                    to="/daily-tips"
                    className="hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 rounded block"
                  >
                    Consejos Diarios
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Información legal */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-white">Información</h4>
            <nav aria-label="Enlaces legales">
              <ul className="space-y-2 text-green-100">
                <li>
                  <a href="#privacidad" className="hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 rounded">
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a href="#terminos" className="hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 rounded">
                    Términos de Uso
                  </a>
                </li>
                <li>
                  <a href="#seguridad" className="hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 rounded">
                    Seguridad Infantil
                  </a>
                </li>
                <li>
                  <a href="#padres" className="hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 rounded">
                    Información para Padres
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contacto */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-white">Contacto</h4>
            <div className="space-y-3 text-green-100">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-green-200" aria-hidden="true" />
                <a href="mailto:hola@ecofun.app" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 rounded">
                  hola@ecofun.app
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-green-200" aria-hidden="true" />
                <span>Soporte familias</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-green-200" aria-hidden="true" />
                <span>Educación global</span>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-white/20 mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-green-100">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-300" aria-hidden="true" />
                <span>Hecho con amor por el planeta</span>
              </div>
              <div className="flex items-center space-x-1">
                <Leaf className="w-4 h-4 text-green-300" aria-hidden="true" />
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

