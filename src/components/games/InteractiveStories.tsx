import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, BookOpen, AlertCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface InteractiveStoriesProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface StoryChoice {
  text: string;
  isCorrect: boolean;
  ecoPoints: number;
  consequence: string;
  educationalFeedback?: string;
  nextScene: number | 'end';
}

interface StoryScene {
  id: number;
  title: string;
  description: string;
  image: string;
  choices: StoryChoice[];
}

interface Story {
  id: string;
  title: string;
  theme: string;
  description: string;
  icon: string;
  bgGradient: string;
  scenes: StoryScene[];
  finalMessage: string;
}

const InteractiveStories: React.FC<InteractiveStoriesProps> = ({ onComplete, onBack }) => {
  const [gameState, setGameState] = useState<'storySelect' | 'playing' | 'storyComplete'>('storySelect');
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [correctChoices, setCorrectChoices] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastChoice, setLastChoice] = useState<StoryChoice | null>(null);

  const stories: Story[] = [
    {
      id: "forest-adventure",
      title: "Maya y el Bosque Encantado",
      theme: "Aprendizaje del Medio Ambiente",
      description: "Acompaña a Maya en su aventura por el bosque mientras aprende sobre los ecosistemas",
      icon: "🌳",
      bgGradient: "from-green-200 to-emerald-100",
      scenes: [
        {
          id: 0,
          title: "El Descubrimiento del Problema",
          description: "Maya, una niña curiosa de 10 años, entra por primera vez al bosque cerca de su casa. Su abuela le había contado historias mágicas sobre este lugar, pero al llegar encuentra algo inesperado: basura esparcida por todas partes. Los animales se ven tristes y el río que debería ser cristalino tiene un color extraño.",
          image: "🌲🦝😢",
          choices: [
            {
              text: "Maya decide recoger toda la basura que encuentra y buscar dónde desecharla correctamente",
              isCorrect: true,
              ecoPoints: 15,
              consequence: "¡Excelente decisión! Los animales se acercan a Maya con gratitud. Un búho sabio le explica que su acción ha salvado muchas vidas.",
              nextScene: 1
            },
            {
              text: "Maya piensa que no es su responsabilidad y decide explorar otras áreas del bosque",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Los animales huyen asustados al ver que Maya ignora el problema.",
              educationalFeedback: "💡 Consejo Ecológico: Todos somos responsables del cuidado del medio ambiente. Cada pequeña acción cuenta para proteger los ecosistemas. Cuando encontramos basura en la naturaleza, recogerla ayuda a proteger a los animales que pueden confundirla con comida o lastimarse con ella.",
              nextScene: 0
            },
            {
              text: "Maya toma fotos de la basura para mostrarle a sus amigos lo feo que se ve",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Aunque Maya documenta el problema, no toma acción directa para solucionarlo.",
              educationalFeedback: "💡 Consejo Ecológico: Documentar problemas ambientales es importante, pero siempre debemos combinar la concienciación con la acción directa. ¡Recoger la basura mientras tomamos las fotos es doblemente efectivo!",
              nextScene: 0
            }
          ]
        },
        {
          id: 1,
          title: "La Separación de Residuos",
          description: "Maya ha recogido mucha basura del bosque y ahora se encuentra frente a varios contenedores: uno azul para papel, uno amarillo para plástico, uno verde para vidrio y uno marrón para residuos orgánicos. Tiene en sus manos una botella de plástico, papeles sucios y restos de comida.",
          image: "♻️🗑️📦",
          choices: [
            {
              text: "Maya separa cuidadosamente cada residuo en su contenedor correspondiente",
              isCorrect: true,
              ecoPoints: 20,
              consequence: "¡Perfecto! Maya comprende la importancia del reciclaje. Los materiales podrán ser reutilizados para crear nuevos productos.",
              nextScene: 2
            },
            {
              text: "Maya lo pone todo junto en cualquier contenedor porque está cansada",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Maya pone toda la basura junta, complicando el proceso de reciclaje.",
              educationalFeedback: "💡 Consejo Ecológico: La separación correcta de residuos es fundamental para el reciclaje. Cuando mezclamos materiales, es muy difícil procesarlos y muchos terminan en vertederos en lugar de ser reutilizados. ¡Cada material separado correctamente puede tener una segunda vida!",
              nextScene: 1
            },
            {
              text: "Maya solo separa el plástico y el papel, pero deja los orgánicos con el vidrio",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Maya hace un esfuerzo parcial, pero la mezcla incorrecta sigue siendo problemática.",
              educationalFeedback: "💡 Consejo Ecológico: Los residuos orgánicos pueden contaminar otros materiales reciclables. Es importante separarlos todos correctamente. Los orgánicos pueden convertirse en compost, ¡que es un excelente fertilizante natural!",
              nextScene: 1
            }
          ]
        },
        {
          id: 2,
          title: "El Misterio del Río Contaminado",
          description: "Maya llega al río que era famoso por su agua pura, pero ahora está turbio y huele mal. Ve una fábrica a lo lejos que libera humo y desechos. Los peces ya no saltan como antes, y las plantas acuáticas se ven marchitas.",
          image: "🏭💨🐟",
          choices: [
            {
              text: "Maya va a la fábrica, habla con el gerente y le propone instalar filtros para limpiar el agua",
              isCorrect: true,
              ecoPoints: 25,
              consequence: "¡Brillante idea! El gerente se sorprende por la sabiduría de Maya y acepta instalar los filtros.",
              nextScene: 3
            },
            {
              text: "Maya decide buscar otro río más limpio para los animales",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Maya evita el problema en lugar de enfrentarlo.",
              educationalFeedback: "💡 Consejo Ecológico: Huir de los problemas ambientales no los soluciona. Los ecosistemas están interconectados, y la contaminación se extiende. Es mejor buscar soluciones que beneficien a todos los seres vivos del área.",
              nextScene: 2
            },
            {
              text: "Maya tira piedras al río para 'limpiarlo' removiendo el agua",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Las piedras no limpian el agua contaminada, solo la alteran más.",
              educationalFeedback: "💡 Consejo Ecológico: La contaminación del agua requiere soluciones técnicas como filtros, tratamiento de aguas residuales y control de emisiones en su origen. ¡Las soluciones reales a menudo requieren cooperación entre personas y organizaciones!",
              nextScene: 2
            }
          ]
        },
        {
          id: 3,
          title: "La Plantación de Árboles",
          description: "Con el río comenzando a limpiarse, Maya nota que faltan árboles en muchas áreas del bosque. Un guardabosques le explica que los árboles son los pulmones del planeta y ayudan a purificar el aire y el agua.",
          image: "🌱🌳🌿",
          choices: [
            {
              text: "Maya organiza una jornada de plantación con su escuela usando especies nativas de la región",
              isCorrect: true,
              ecoPoints: 30,
              consequence: "¡Excelente planificación! Las especies nativas crecen mejor y ayudan a restaurar el ecosistema original.",
              nextScene: 4
            },
            {
              text: "Maya planta cualquier árbol que encuentra en la tienda, sin investigar si es apropiado",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Maya planta árboles que no son adecuados para el ecosistema local.",
              educationalFeedback: "💡 Consejo Ecológico: Las especies invasoras pueden dañar los ecosistemas locales. Es importante plantar especies nativas que ya están adaptadas al clima y suelo de la región. ¡Estas especies también proporcionan mejor alimento y refugio para la fauna local!",
              nextScene: 3
            },
            {
              text: "Maya piensa que los árboles crecen solos y no hace nada",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Maya no comprende que los bosques dañados necesitan ayuda para regenerarse.",
              educationalFeedback: "💡 Consejo Ecológico: Los bosques perturbados a menudo necesitan ayuda humana para recuperarse. La reforestación acelera la recuperación del ecosistema y ayuda a combatir el cambio climático. ¡Un árbol puede absorber hasta 22 kg de CO2 al año!",
              nextScene: 3
            }
          ]
        },
        {
          id: 4,
          title: "La Sabiduría del Guardián del Bosque",
          description: "Al final de su aventura, Maya se encuentra con el Guardián del Bosque, un sabio búho centenario. El búho le explica que el bosque necesita guardianes jóvenes como ella, personas que entiendan que cada decisión afecta a todos los seres vivos.",
          image: "🦉✨🌿",
          choices: [
            {
              text: "Maya promete convertirse en la nueva Guardiana Junior y enseñar a otros niños sobre la naturaleza",
              isCorrect: true,
              ecoPoints: 35,
              consequence: "¡Magnífico! El búho otorga a Maya el título sagrado de 'Guardiana Junior del Bosque'.",
              nextScene: 'end'
            },
            {
              text: "Maya promete cuidar solo este bosque cuando venga de visita",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Maya limita su compromiso ambiental.",
              educationalFeedback: "💡 Consejo Ecológico: El cuidado del medio ambiente no tiene límites geográficos. Todo está conectado: el aire, el agua, los animales. Ser guardián de la naturaleza significa cuidarla en todos lados, todos los días.",
              nextScene: 4
            }
          ]
        }
      ],
      finalMessage: "Maya aprendió que ser guardiana de la naturaleza significa tomar decisiones responsables todos los días. Su aventura la convirtió en una verdadera protectora del medio ambiente."
    },
    {
      id: "recycling-hero",
      title: "Carlos, el Héroe del Reciclaje",
      theme: "Reciclaje y Reutilización",
      description: "Descubre cómo Carlos transforma su escuela y comunidad con el poder del reciclaje",
      icon: "♻️",
      bgGradient: "from-blue-200 to-green-100",
      scenes: [
        {
          id: 0,
          title: "El Problema en la Escuela",
          description: "Carlos llega a su escuela y se horroriza al ver montañas de basura mezclada en el patio. Botellas de plástico, papeles, restos de comida y materiales que podrían reutilizarse están todos revueltos. Los conserjes están abrumados y los estudiantes no saben cómo separar correctamente. Carlos sabe que puede marcar la diferencia, pero necesita un plan inteligente.",
          image: "🏫🗑️📚",
          choices: [
            {
              text: "Carlos organiza una gran campaña escolar para enseñar a todos cómo separar residuos correctamente, creando equipos de reciclaje por salón",
              isCorrect: true,
              ecoPoints: 20,
              consequence: "¡Excelente liderazgo! Carlos logra que toda la escuela participe. En una semana, la cantidad de residuos mal clasificados se reduce en un 80%. Los estudiantes se sienten orgullosos de su escuela limpia.",
              nextScene: 1
            },
            {
              text: "Carlos habla solo con el director para que compre más contenedores de basura",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Aunque el director compra contenedores, sin educación sobre su uso, el problema persiste. Carlos se da cuenta de que necesita involucrar a sus compañeros.",
              nextScene: 1
            },
            {
              text: "Carlos decide limpiar él solo durante los recreos",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Carlos se agota rápidamente y el problema es demasiado grande para una sola persona. Comprende que necesita trabajar en equipo para crear un cambio real.",
              nextScene: 1
            }
          ]
        },
        {
          id: 1,
          title: "El Taller de Transformación Creativa",
          description: "Con la escuela más limpia, Carlos encuentra una habitación llena de materiales 'inservibles': botellas plásticas, cajas de cartón, latas, periódicos viejos. En lugar de ver basura, Carlos ve oportunidades infinitas. Debe decidir qué proyecto tendrá el mayor impacto en su comunidad y demostrará el verdadero poder de la reutilización.",
          image: "🧴📦✨",
          choices: [
            {
              text: "Carlos crea un sistema de huertos verticales usando botellas plásticas y enseña a cultivar alimentos en espacios pequeños",
              isCorrect: true,
              ecoPoints: 25,
              consequence: "¡Innovación extraordinaria! El proyecto de Carlos alimenta a 20 familias de la comunidad y se convierte en modelo para otras escuelas. Demuestra que los 'desechos' pueden nutrir la vida.",
              nextScene: 2
            },
            {
              text: "Carlos vende todos los materiales a un centro de reciclaje para ganar dinero",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Aunque Carlos gana dinero, pierde la oportunidad de mostrar el poder transformador de la reutilización creativa. Se da cuenta de que el impacto social es más valioso.",
              nextScene: 2
            },
            {
              text: "Carlos hace decoraciones bonitas para vender en la feria escolar",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Las decoraciones son hermosas pero tienen poco impacto duradero. Carlos reflexiona sobre cómo sus creaciones podrían resolver problemas reales de la comunidad.",
              nextScene: 2
            }
          ]
        },
        {
          id: 2,
          title: "El Desafío del Campeón Ecológico",
          description: "La historia de Carlos llega a oídos del alcalde, quien lo invita a participar en el Gran Desafío Nacional de Reciclaje. Carlos tiene una semana para demostrar cómo una comunidad entera puede transformarse a través del reciclaje inteligente. Este es el momento que definirá su legado como héroe del reciclaje. ¿Qué estrategia elegirá?",
          image: "🏆🌍🎯",
          choices: [
            {
              text: "Carlos crea una red comunitaria donde cada barrio tiene líderes de reciclaje que se apoyan mutuamente y comparten recursos",
              isCorrect: true,
              ecoPoints: 30,
              consequence: "¡Estrategia maestra! Carlos establece un sistema sostenible que reduce los residuos de la ciudad en un 60%. Su modelo se implementa en todo el país. ¡Es un verdadero héroe nacional!",
              nextScene: 'end'
            },
            {
              text: "Carlos se concentra en ganar el concurso con el proyecto más espectacular posible",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Aunque Carlos impresiona a los jueces, su enfoque individual no crea un cambio duradero. Aprende que el verdadero heroísmo está en empoderar a otros para que también sean héroes.",
              nextScene: 'end'
            }
          ]
        }
      ],
      finalMessage: "Carlos descubrió que el verdadero poder del reciclaje no está solo en transformar materiales, sino en transformar mentalidades y comunidades enteras."
    },
    {
      id: "water-guardian",
      title: "Sofía, la Guardiana del Agua",
      theme: "Cuidado del Agua",
      description: "Únete a Sofía en su misión para proteger el recurso más valioso de la Tierra",
      icon: "💧",
      bgGradient: "from-cyan-200 to-blue-100",
      scenes: [
        {
          id: 0,
          title: "La Crisis del Pueblo Sediento",
          description: "Sofía vive en un hermoso pueblo que enfrenta la peor sequía en 50 años. Las plantas del jardín de su abuela se marchitan, las fuentes públicas están secas, y las familias hacen largas filas para conseguir agua. Sofía sabe que debe actuar rápido, pero también sabe que la solución debe ser inteligente y sostenible para proteger a su comunidad a largo plazo.",
          image: "🏘️🌵☀️",
          choices: [
            {
              text: "Sofía propone construir un sistema comunitario de recolección de agua de lluvia con tanques de almacenamiento para toda la familia",
              isCorrect: true,
              ecoPoints: 25,
              consequence: "¡Solución brillante! Sofía lidera la construcción de cisternas comunitarias. Cuando llega la temporada de lluvias, el pueblo almacena suficiente agua para todo el año. ¡Su pueblo se convierte en modelo de sostenibilidad!",
              nextScene: 1
            },
            {
              text: "Sofía organiza una campaña para que cada familia use menos agua en sus actividades diarias",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Aunque las familias reducen el consumo, esto no resuelve el problema de fondo. Sofía comprende que necesita una solución que genere más agua, no solo que ahorre la poca que tienen.",
              nextScene: 1
            },
            {
              text: "Sofía propone traer agua en camiones desde la ciudad más cercana",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Esta solución es cara y no sostenible. Sofía se da cuenta de que depender de recursos externos no es la respuesta. Debe encontrar una solución que empodere a su comunidad.",
              nextScene: 1
            }
          ]
        },
        {
          id: 1,
          title: "El Río en Peligro",
          description: "Gracias a su éxito anterior, Sofía es invitada a investigar por qué el río principal de la región está muriendo. Descubre que las granjas cercanas están usando químicos que contaminan el agua, matando peces y plantas. Los granjeros no saben que hay alternativas. Sofía debe encontrar una solución que ayude tanto al río como a los granjeros que dependen de sus cultivos.",
          image: "🌊🏭⚠️",
          choices: [
            {
              text: "Sofía colabora con los granjeros para implementar métodos de agricultura orgánica y crear sistemas de filtración natural",
              isCorrect: true,
              ecoPoints: 30,
              consequence: "¡Transformación extraordinaria! Sofía ayuda a crear granjas que prosperan sin químicos dañinos. El río se recupera, los cultivos son más saludables, y su método se replica en toda la región.",
              nextScene: 2
            },
            {
              text: "Sofía reporta a los granjeros a las autoridades para que los obliguen a parar",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Esta aproximación crea conflicto sin resolver el problema de fondo. Sofía aprende que la colaboración y la educación son más poderosas que la confrontación.",
              nextScene: 2
            },
            {
              text: "Sofía construye filtros aguas abajo para limpiar el río después de la contaminación",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Aunque los filtros ayudan, no solucionan la causa del problema. Sofía comprende que debe trabajar en prevención, no solo en remedios.",
              nextScene: 2
            }
          ]
        },
        {
          id: 2,
          title: "La Misión Oceánica Global",
          description: "La fama de Sofía como guardiana del agua llega a oídos de científicos internacionales, quienes la invitan a liderar una expedición para proteger los océanos del mundo. Sofía debe elegir una estrategia que pueda inspirar a millones de personas a unirse a su misión de proteger el agua del planeta. Esta decisión definirá su legado como guardiana global del agua.",
          image: "🌊🐋🛳️",
          choices: [
            {
              text: "Sofía crea una red global de jóvenes guardianes del agua que educan, innovan y protegen fuentes de agua en sus comunidades",
              isCorrect: true,
              ecoPoints: 35,
              consequence: "¡Impacto planetario! Sofía establece una red de 10,000 jóvenes guardianes en 50 países. Su movimiento salva millones de litros de agua y protege ecosistemas acuáticos en todo el mundo.",
              nextScene: 'end'
            },
            {
              text: "Sofía se enfoca en desarrollar una tecnología revolucionaria para limpiar los océanos",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Aunque la tecnología es impresionante, Sofía se da cuenta de que el cambio real requiere que millones de personas cambien sus hábitos diarios. La solución debe ser personal y colectiva.",
              nextScene: 'end'
            }
          ]
        }
      ],
      finalMessage: "Sofía aprendió que ser guardiana del agua significa entender que cada gota conecta a todos los seres vivos del planeta, y que protegerla es un acto de amor hacia las futuras generaciones."
    },
    {
      id: "animal-protector",
      title: "Diego, el Protector de la Vida Silvestre",
      theme: "Respeto a Animales y Plantas",
      description: "Acompaña a Diego en su misión para defender a los seres vivos y restaurar la armonía natural",
      icon: "🦋",
      bgGradient: "from-purple-200 to-pink-100",
      scenes: [
        {
          id: 0,
          title: "El Jardín Silencioso de la Abuela",
          description: "Diego visita el jardín de su abuela, que antes estaba lleno de mariposas coloridas y el zumbido alegre de las abejas. Ahora está extrañamente silencioso. Las flores se ven tristes, sin polinizadores que las visiten. Su abuela le explica que sin estos pequeños amigos, no habrá frutas ni nuevas flores. Diego sabe que debe actuar para devolver la vida a este jardín especial.",
          image: "🌺🦋💔",
          choices: [
            {
              text: "Diego investiga qué plantas nativas atraen polinizadores y crea un santuario especial con flores que florecen en diferentes épocas del año",
              isCorrect: true,
              ecoPoints: 20,
              consequence: "¡Decisión perfecta! En pocas semanas, el jardín se convierte en un paraíso de mariposas y abejas. Las plantas producen más frutas que nunca, y otros jardines del vecindario siguen el ejemplo de Diego.",
              nextScene: 1
            },
            {
              text: "Diego compra mariposas en una tienda para soltarlas en el jardín",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Las mariposas compradas no se adaptan al jardín y se van rápidamente. Diego aprende que los animales necesitan un hábitat adecuado, no solo ser trasladados a un lugar.",
              nextScene: 1
            },
            {
              text: "Diego usa fertilizantes químicos para hacer las plantas más atractivas",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Los químicos ahuyentan aún más a los polinizadores. Diego comprende que las soluciones naturales son las únicas que realmente funcionan para la vida silvestre.",
              nextScene: 1
            }
          ]
        },
        {
          id: 1,
          title: "La Batalla por el Bosque Ancestral",
          description: "Diego descubre que una empresa planea construir un centro comercial gigante exactamente donde vive una comunidad de animales salvajes: osos, venados, búhos, y cientos de especies que han llamado hogar a este bosque durante generaciones. Los animales no tienen voz en esta decisión, pero Diego sí. Debe encontrar una manera de proteger este santuario natural sin perjudicar las necesidades económicas de su comunidad.",
          image: "🏗️🐻🌲",
          choices: [
            {
              text: "Diego organiza una coalición de estudiantes, científicos y ciudadanos para proponer que el bosque se convierta en una reserva natural protegida con ecoturismo sostenible",
              isCorrect: true,
              ecoPoints: 30,
              consequence: "¡Victoria extraordinaria! La propuesta de Diego no solo salva el bosque, sino que crea empleos sostenibles para la comunidad. El ecoturismo genera más dinero que el centro comercial habría generado.",
              nextScene: 2
            },
            {
              text: "Diego propone reubicar a todos los animales a otro bosque lejano",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "La reubicación causa estrés extremo a los animales y muchos no sobreviven al cambio. Diego aprende que los animales tienen derecho a permanecer en sus hogares ancestrales.",
              nextScene: 2
            },
            {
              text: "Diego acepta el desarrollo pero pide que dejen algunos árboles para decoración",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Unos pocos árboles aislados no pueden sostener un ecosistema. Diego comprende que la conservación requiere proteger hábitats completos, no solo elementos individuales.",
              nextScene: 2
            }
          ]
        },
        {
          id: 2,
          title: "La Expedición de los Últimos Guardianes",
          description: "El éxito de Diego lo lleva a ser seleccionado para una expedición internacional que estudia especies en peligro crítico de extinción. En una remota selva, Diego se encuentra cara a cara con jaguares, guacamayas y plantas medicinales que podrían desaparecer para siempre. Debe diseñar una estrategia que no solo salve estas especies, sino que también empodere a las comunidades locales para convertirse en sus protectores permanentes.",
          image: "🔬🐅🌿",
          choices: [
            {
              text: "Diego crea un programa donde las comunidades locales se convierten en guardianes oficiales, combinando conocimiento ancestral con ciencia moderna para proteger especies mientras mejoran su calidad de vida",
              isCorrect: true,
              ecoPoints: 35,
              consequence: "¡Impacto revolucionario! El modelo de Diego se implementa globalmente. Las comunidades locales se convierten en los mejores protectores de la biodiversidad, y las especies en peligro comienzan a recuperarse.",
              nextScene: 'end'
            },
            {
              text: "Diego propone crear zoológicos especializados para proteger las especies en cautiverio",
              isCorrect: false,
              ecoPoints: 0,
              consequence: "Aunque bien intencionado, Diego aprende que los animales salvajes prosperan mejor en sus hábitats naturales protegidos, no en cautiverio. La verdadera conservación preserva ecosistemas completos.",
              nextScene: 'end'
            }
          ]
        }
      ],
      finalMessage: "Diego descubrió que proteger la vida silvestre significa reconocer que todos los seres vivos están interconectados, y que la verdadera protección viene de vivir en armonía con la naturaleza, no separados de ella."
    }
  ];

  const startStory = (story: Story) => {
    setCurrentStory(story);
    setCurrentScene(0);
    setEcoPoints(0);
    setCorrectChoices(0);
    setStoryProgress(0);
    setShowFeedback(false);
    setLastChoice(null);
    setGameState('playing');
  };

  const makeChoice = (choice: StoryChoice) => {
    setLastChoice(choice);
    
    if (choice.isCorrect) {
      setEcoPoints(prev => prev + choice.ecoPoints);
      setCorrectChoices(prev => prev + 1);
      setShowFeedback(true);
      
      setTimeout(() => {
        setShowFeedback(false);
        if (choice.nextScene === 'end') {
          setGameState('storyComplete');
          setStoryProgress(100);
        } else {
          setCurrentScene(choice.nextScene);
          setStoryProgress(((choice.nextScene as number) + 1) / (currentStory?.scenes.length || 1) * 100);
        }
      }, 3000);
    } else {
      setShowFeedback(true);
      toast({
        title: "¡Reflexiona sobre tu decisión!",
        description: "Esta no es la mejor opción para el medio ambiente. Lee el consejo educativo.",
        duration: 4000,
        variant: "destructive"
      });
    }
  };

  const resetStory = () => {
    setGameState('playing');
    setCurrentScene(0);
    setEcoPoints(0);
    setCorrectChoices(0);
    setStoryProgress(0);
    setShowFeedback(false);
    setLastChoice(null);
  };

  const completeStory = () => {
    const bonusPoints = correctChoices * 10;
    const finalPoints = ecoPoints + bonusPoints;
    onComplete(finalPoints);
  };

  const continuePlaying = () => {
    setShowFeedback(false);
    setLastChoice(null);
  };

  if (!currentStory && gameState !== 'storySelect') {
    setGameState('storySelect');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <Button variant="outline" onClick={onBack} size="sm">
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Volver</span>
              </Button>
              <h1 className="text-lg sm:text-2xl font-bold text-purple-700 flex items-center">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Cuentos Ecológicos Interactivos
              </h1>
              {gameState === 'playing' && (
                <Button variant="outline" size="sm" onClick={resetStory}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              )}
            </div>

            {gameState === 'storySelect' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-purple-700 mb-2 sm:mb-4">
                    Elige tu Historia Ecológica
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    Vive aventuras emocionantes y toma decisiones que marcan la diferencia para nuestro planeta
                  </p>
                </div>
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  {stories.map((story) => (
                    <Card 
                      key={story.id}
                      className="cursor-pointer transition-all duration-300 hover:scale-105 bg-white border-2 border-purple-200 hover:border-purple-400 shadow-lg hover:shadow-xl"
                      onClick={() => startStory(story)}
                    >
                      <CardContent className="p-3 sm:p-4 text-center">
                        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{story.icon}</div>
                        <h3 className="text-sm sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2">
                          {story.title}
                        </h3>
                        <p className="text-xs text-purple-600 font-semibold mb-2">
                          {story.theme}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3">
                          {story.description}
                        </p>
                        <Button className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white text-xs sm:text-sm" size="sm">
                          ¡Comenzar Historia!
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {gameState === 'playing' && currentStory && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-xl font-bold text-purple-700">
                    {currentStory.title}
                  </h3>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">
                      Puntos Eco: {ecoPoints}
                    </p>
                    <p className="text-xs text-blue-600">
                      Decisiones Correctas: {correctChoices}
                    </p>
                  </div>
                </div>
                
                <Progress value={storyProgress} className="h-2 sm:h-3" />

                {showFeedback && lastChoice ? (
                  <div className={`p-4 sm:p-6 rounded-lg border-2 ${lastChoice.isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                    <div className="text-center space-y-4">
                      <div className={`text-lg font-bold ${lastChoice.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        {lastChoice.isCorrect ? '¡Excelente Decisión Ecológica! ✅' : '¡Reflexiona sobre tu Decisión! ❌'}
                      </div>
                      <p className="text-sm sm:text-base text-gray-700">
                        {lastChoice.consequence}
                      </p>
                      {lastChoice.educationalFeedback && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-blue-800">
                              {lastChoice.educationalFeedback}
                            </p>
                          </div>
                        </div>
                      )}
                      {lastChoice.isCorrect ? (
                        <p className="text-xs text-green-600">Avanzando a la siguiente escena...</p>
                      ) : (
                        <Button 
                          onClick={continuePlaying}
                          className="bg-purple-500 hover:bg-purple-600 text-white"
                        >
                          Intentar de Nuevo
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={`bg-gradient-to-b ${currentStory.bgGradient} p-4 sm:p-6 rounded-lg border-2 border-purple-300`}>
                    <div className="text-center mb-4">
                      <div className="text-3xl sm:text-4xl mb-3">
                        {currentStory.scenes[currentScene]?.image}
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                        {currentStory.scenes[currentScene]?.title}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {currentStory.scenes[currentScene]?.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-center text-sm font-semibold text-purple-700 mb-4">
                        ¿Qué decisión tomas?
                      </p>
                      {currentStory.scenes[currentScene]?.choices.map((choice, index) => (
                        <Button
                          key={index}
                          onClick={() => makeChoice(choice)}
                          variant="outline"
                          className="w-full text-left text-xs sm:text-sm p-3 sm:p-4 h-auto border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50"
                        >
                          {choice.text}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {gameState === 'storyComplete' && currentStory && (
              <div className="text-center space-y-4 sm:space-y-6">
                <div className="text-4xl sm:text-6xl mb-4">{currentStory.icon}</div>
                <h2 className="text-xl sm:text-3xl font-bold text-purple-700">
                  ¡Historia Completada!
                </h2>
                <div className="space-y-2">
                  <p className="text-sm sm:text-lg text-gray-700">
                    Puntos por decisiones correctas: {ecoPoints}
                  </p>
                  <p className="text-sm sm:text-lg text-gray-700">
                    Bonificación por {correctChoices} decisiones ecológicas: {correctChoices * 10}
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-green-600">
                    Total: {ecoPoints + (correctChoices * 10)} puntos
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 sm:p-6 rounded-lg">
                  <p className="text-xs sm:text-sm text-purple-800 font-semibold">
                    {currentStory.finalMessage}
                  </p>
                </div>
                <div className="space-y-3">
                  <Button 
                    onClick={completeStory}
                    className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-full text-sm sm:text-lg shadow-lg"
                  >
                    ¡Completar! (+{ecoPoints + (correctChoices * 10)} pts)
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                    <Button 
                      onClick={resetStory}
                      variant="outline"
                      className="border-2 border-purple-400 text-purple-600 hover:bg-purple-50 font-semibold py-2 px-4 sm:px-6 rounded-full text-sm"
                    >
                      Repetir Historia
                    </Button>
                    <Button 
                      onClick={() => setGameState('storySelect')}
                      variant="outline"
                      className="border-2 border-pink-400 text-pink-600 hover:bg-pink-50 font-semibold py-2 px-4 sm:px-6 rounded-full text-sm"
                    >
                      Elegir Otra Historia
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveStories;
