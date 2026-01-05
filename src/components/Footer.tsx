import { Leaf, Heart, Shield, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import LogotipoEcoFun from "@/assets/LogotipoEcoFun.png";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-emerald-50 via-green-50 to-cyan-50 mt-auto shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.15)]">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo y descripción */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center">
              <img 
                src={LogotipoEcoFun} 
                alt="EcoFun" 
                className="h-10 lg:h-10 w-auto"
              />
            </div>
            <p className="text-emerald-700 text-base leading-relaxed">
              Plataforma educativa que enseña a cuidar el planeta de forma divertida y segura para toda la familia.
            </p>
            <div className="flex items-center space-x-2 text-base text-emerald-600">
              <Shield className="w-5 h-5" aria-hidden="true" />
              <span>Contenido seguro para menores</span>
            </div>
          </div>

          {/* Enlaces útiles */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-lg sm:text-xl font-semibold text-orange-500">Contenido</h4>
            <nav aria-label="Enlaces de contenido">
              <ul className="space-y-2 text-emerald-700">
                <li>
                  <Link to="/games" className="hover:text-emerald-900 transition-colors text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded">
                    Juegos Educativos
                  </Link>
                </li>
                <li>
                  <Link to="/weekly-challenges" className="hover:text-emerald-900 transition-colors text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded">
                    Retos Semanales
                  </Link>
                </li>
                <li>
                  <Link to="/educational-content" className="hover:text-emerald-900 transition-colors text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded">
                    Contenido Educativo
                  </Link>
                </li>
                <li>
                  <Link to="/daily-tips" className="hover:text-emerald-900 transition-colors text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded">
                    Consejos Diarios
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Información legal */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-lg sm:text-xl font-semibold text-orange-500">Información</h4>
            <nav aria-label="Enlaces legales">
              <ul className="space-y-2 text-emerald-700">
                <li>
                  <a href="#privacidad" className="hover:text-emerald-900 transition-colors text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded">
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a href="#terminos" className="hover:text-emerald-900 transition-colors text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded">
                    Términos de Uso
                  </a>
                </li>
                <li>
                  <a href="#seguridad" className="hover:text-emerald-900 transition-colors text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded">
                    Seguridad Infantil
                  </a>
                </li>
                <li>
                  <Link to="/parents-info" className="hover:text-emerald-900 transition-colors text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded">
                    Información para Padres
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contacto */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-lg sm:text-xl font-semibold text-orange-500">Contacto</h4>
            <div className="space-y-3 text-emerald-700">
              <div className="flex items-center space-x-2 text-base">
                <Mail className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                <a href="mailto:hola@ecofun.app" className="hover:text-emerald-900 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded">
                  hola@ecofun.app
                </a>
              </div>
              <div className="flex items-center space-x-2 text-base">
                <Phone className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                <span>Soporte familias</span>
              </div>
              <div className="flex items-center space-x-2 text-base">
                <MapPin className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                <span>Educación global</span>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-emerald-200 mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-base text-emerald-700">
              <div className="flex items-center space-x-1">
                <Heart className="w-5 h-5 text-red-500" aria-hidden="true" />
                <span>Hecho con amor por el planeta</span>
              </div>
              <div className="flex items-center space-x-1">
                <Leaf className="w-5 h-5 text-emerald-500" aria-hidden="true" />
                <span>Educación sostenible</span>
              </div>
            </div>
            
            <div className="text-base text-emerald-700 text-center md:text-right">
              <p>© {currentYear} EcoFun. Todos los derechos reservados.</p>
              <p className="text-sm text-emerald-600 mt-1">
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
