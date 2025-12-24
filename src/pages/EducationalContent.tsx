import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Calendar, ChevronDown, ChevronUp, Leaf, Droplets, Sun, Wind, TreePine, Fish, Volume2, VolumeX, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";

interface TopicContent {
  title: string;
  description: string;
  emoji: string;
  fullContent: string;
}

interface MonthlyContent {
  month: string;
  theme: string;
  emoji: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  topics: TopicContent[];
}

const EducationalContent = () => {
  const [expandedMonth, setExpandedMonth] = useState<number | null>(0);
  const [selectedTopic, setSelectedTopic] = useState<TopicContent | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, [speechSynthesis]);

  const readText = (text: string) => {
    if (!speechSynthesis) return;

    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    speechSynthesis.speak(utterance);
  };

  const stopReading = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  const closeTopic = () => {
    stopReading();
    setSelectedTopic(null);
  };

  const monthlyContent: MonthlyContent[] = [
    {
      month: "Enero",
      theme: "El Agua y su Importancia",
      emoji: "💧",
      icon: Droplets,
      color: "blue",
      topics: [
        { 
          title: "El Ciclo del Agua", 
          description: "Aprende cómo el agua viaja desde los océanos hasta las nubes y de vuelta", 
          emoji: "🌧️",
          fullContent: `El Ciclo del Agua: Un Viaje Increíble

El agua en nuestro planeta está en constante movimiento, realizando un viaje fascinante llamado ciclo del agua o ciclo hidrológico.

¿Cómo funciona?

1. Evaporación: El sol calienta el agua de los océanos, ríos y lagos. Esta agua se convierte en vapor y sube hacia el cielo, como cuando ves el vapor saliendo de una olla caliente.

2. Condensación: Cuando el vapor de agua sube muy alto donde hace frío, se convierte en pequeñas gotitas que forman las nubes. ¡Las nubes son millones de gotitas de agua flotando!

3. Precipitación: Cuando las nubes tienen muchas gotitas, estas caen como lluvia, nieve o granizo. Esto se llama precipitación.

4. Escorrentía y filtración: El agua que cae va a los ríos, lagos y océanos. Parte del agua se filtra en la tierra y llega a los acuíferos subterráneos.

¿Sabías que...?
- El agua que bebes hoy podría haber sido bebida por un dinosaurio hace millones de años.
- El 97% del agua de la Tierra está en los océanos y es salada.
- Solo el 3% es agua dulce, y la mayor parte está congelada en los polos.

El ciclo del agua nunca se detiene y es lo que hace posible la vida en nuestro planeta. Por eso es tan importante cuidar el agua y no contaminarla.`
        },
        { 
          title: "Ahorro de Agua en Casa", 
          description: "Trucos divertidos para no desperdiciar ni una gota", 
          emoji: "🚿",
          fullContent: `Ahorro de Agua en Casa: Pequeños Héroes del Agua

El agua es un recurso muy valioso y limitado. ¡Tú puedes ser un héroe del agua con estos trucos!

En el Baño:
- Cierra la llave mientras te cepillas los dientes. ¡Puedes ahorrar hasta 12 litros por minuto!
- Toma duchas cortas de 5 minutos en lugar de baños de tina.
- Si ves una llave goteando, avisa a un adulto para arreglarla.

En la Cocina:
- Ayuda a lavar los platos en una tina con agua en lugar de con la llave abierta.
- No dejes correr el agua mientras lavas frutas o verduras.
- Usa el agua de lavar verduras para regar las plantas.

En el Jardín:
- Riega las plantas temprano en la mañana o al atardecer cuando hace menos calor.
- Usa una regadera en lugar de manguera.
- Recoge agua de lluvia en cubetas para regar.

Datos Importantes:
- Una llave goteando puede desperdiciar 30 litros de agua al día.
- Una ducha de 10 minutos usa 200 litros de agua.
- Cada persona necesita solo 50 litros de agua al día para vivir bien.

Reto del Agua:
Intenta usar menos agua cada día y compara cuánta logras ahorrar. ¡Cada gota cuenta!`
        },
        { 
          title: "Animales Acuáticos", 
          description: "Conoce a los increíbles habitantes de ríos y océanos", 
          emoji: "🐠",
          fullContent: `Animales Acuáticos: Habitantes del Mundo Submarino

Bajo el agua existe un mundo lleno de criaturas fascinantes. ¡Vamos a conocerlas!

En el Océano:
- Ballenas: Son los animales más grandes del planeta. La ballena azul puede medir 30 metros, ¡más largo que una cancha de básquet!
- Delfines: Son muy inteligentes y les gusta jugar. Se comunican con silbidos y chasquidos.
- Tiburones: Aunque dan miedo, son muy importantes para mantener el equilibrio del océano.
- Pulpos: Tienen 3 corazones y 8 brazos. Son considerados los invertebrados más inteligentes.

En los Ríos y Lagos:
- Truchas: Les gusta el agua fría y limpia de los ríos de montaña.
- Nutrias: Son muy juguetones y usan piedras como herramientas para abrir conchas.
- Castores: Construyen represas con ramas y lodo. ¡Son los ingenieros de la naturaleza!

En los Arrecifes de Coral:
- Peces payaso: Viven entre las anémonas que los protegen con sus tentáculos venenosos.
- Caballitos de mar: Son los únicos animales donde el papá es quien tiene los bebés.
- Tortugas marinas: Pueden vivir más de 100 años y viajan miles de kilómetros.

¿Por qué debemos protegerlos?
La contaminación del agua, el plástico y el cambio climático amenazan a estos animales. Mantener el agua limpia es esencial para su supervivencia y la nuestra.`
        },
        { 
          title: "Contaminación del Agua", 
          description: "Por qué debemos mantener limpios nuestros ríos y mares", 
          emoji: "🌊",
          fullContent: `Contaminación del Agua: Un Problema que Podemos Resolver

El agua limpia es esencial para la vida, pero muchas veces la contaminamos sin darnos cuenta.

¿Qué contamina el agua?

Basura y Plásticos:
- Millones de toneladas de plástico llegan al océano cada año.
- Los animales marinos confunden el plástico con comida y pueden morir.
- Una botella de plástico tarda 450 años en descomponerse.

Productos Químicos:
- Detergentes y jabones que van por el desagüe.
- Pesticidas y fertilizantes de los cultivos que llegan a los ríos.
- Aceites y combustibles de autos y fábricas.

Aguas Residuales:
- El agua sucia de baños y cocinas que no se trata correctamente.
- Bacterias y virus que pueden causar enfermedades.

¿Cómo afecta a los seres vivos?
- Los peces y otros animales acuáticos enferman o mueren.
- Las plantas acuáticas no pueden crecer.
- Las personas pueden enfermarse si beben o se bañan en agua contaminada.

¡Tú puedes ayudar!
- Nunca tires basura en ríos, lagos o playas.
- Recoge plásticos cuando visites lugares con agua.
- Usa menos productos químicos en casa.
- Participa en jornadas de limpieza de ríos y playas.

Recuerda: El agua que contaminas hoy podría ser el agua que necesitarás beber mañana.`
        }
      ]
    },
    {
      month: "Febrero",
      theme: "Amor por los Animales",
      emoji: "🦋",
      icon: Fish,
      color: "pink",
      topics: [
        { 
          title: "Animales en Peligro", 
          description: "Conoce especies que necesitan nuestra ayuda para sobrevivir", 
          emoji: "🐼",
          fullContent: `Animales en Peligro de Extinción: ¡Salvemos a Nuestros Amigos!

Muchos animales están desapareciendo de nuestro planeta. Si no los protegemos, podrían extinguirse para siempre.

Animales en Peligro Crítico:

El Oso Polar:
- Vive en el Ártico, donde el hielo se está derritiendo por el cambio climático.
- Necesita el hielo para cazar focas, su alimento principal.
- Quedan aproximadamente 25,000 osos polares en el mundo.

El Orangután:
- Vive en las selvas de Indonesia y Malasia.
- Su hogar está siendo destruido para plantar palma aceitera.
- Son muy inteligentes y comparten el 97% de su ADN con nosotros.

El Rinoceronte:
- Los cazan ilegalmente por su cuerno.
- El rinoceronte de Java es uno de los más raros, quedan menos de 80.
- Un cuerno de rinoceronte no tiene propiedades mágicas, es solo queratina como nuestras uñas.

El Tigre:
- Había 100,000 tigres hace 100 años, hoy quedan menos de 4,000.
- Los cazan por su piel y partes de su cuerpo.
- Cada tigre tiene rayas únicas, como nuestras huellas digitales.

¿Por qué se extinguen los animales?
- Destrucción de sus hogares (bosques, selvas, océanos).
- Caza ilegal.
- Cambio climático.
- Contaminación.

¿Cómo podemos ayudar?
- Aprende sobre estos animales y comparte lo que sabes.
- No compres productos hechos con partes de animales.
- Apoya zoológicos y organizaciones que los protegen.
- Cuida el medio ambiente para proteger sus hogares.`
        },
        { 
          title: "Hábitats Naturales", 
          description: "Cada animal tiene un hogar especial, ¡descúbrelos!", 
          emoji: "🏔️",
          fullContent: `Hábitats Naturales: El Hogar de Cada Animal

Cada animal del mundo tiene un lugar especial donde vive, llamado hábitat. ¡Vamos a explorarlos!

La Selva Tropical:
- Es el hábitat más biodiverso del planeta.
- Animales: jaguares, tucanes, monos, serpientes, ranas coloridas.
- Llueve casi todos los días y hace mucho calor.
- Aunque cubre solo el 6% de la Tierra, tiene más de la mitad de todas las especies.

El Océano:
- Cubre el 71% de nuestro planeta.
- Animales: ballenas, tiburones, delfines, pulpos, medusas.
- Tiene zonas desde la superficie brillante hasta el fondo oscuro y frío.

El Desierto:
- Muy poca lluvia y temperaturas extremas.
- Animales: camellos, escorpiones, serpientes de cascabel, coyotes.
- Los animales del desierto pueden vivir sin beber agua por mucho tiempo.

El Bosque:
- Árboles grandes que pierden hojas en otoño.
- Animales: ciervos, osos, lobos, ardillas, búhos.
- Las estaciones cambian y los animales se adaptan.

La Tundra:
- Hace muchísimo frío casi todo el año.
- Animales: osos polares, zorros árticos, caribúes, focas.
- El suelo está congelado permanentemente.

Los Humedales:
- Zonas con agua dulce como pantanos y manglares.
- Animales: cocodrilos, garzas, ranas, nutrias.
- Son como filtros que limpian el agua naturalmente.

¿Por qué es importante proteger los hábitats?
Cuando destruimos un hábitat, todos los animales que viven ahí pierden su hogar, su comida y pueden desaparecer. Proteger los hábitats es proteger a miles de especies.`
        },
        { 
          title: "Cadena Alimenticia", 
          description: "Cómo los animales dependen unos de otros", 
          emoji: "🦁",
          fullContent: `La Cadena Alimenticia: ¿Quién Come a Quién?

En la naturaleza, todos los seres vivos están conectados por lo que comen. Esta conexión se llama cadena alimenticia.

Los Niveles de la Cadena:

1. Productores (Las Plantas):
- Usan la luz del sol para hacer su propio alimento.
- Son la base de toda la cadena alimenticia.
- Ejemplos: pasto, árboles, algas, flores.

2. Consumidores Primarios (Herbívoros):
- Comen solo plantas.
- Ejemplos: conejos, vacas, ciervos, orugas, peces pequeños.

3. Consumidores Secundarios (Carnívoros):
- Comen a los herbívoros.
- Ejemplos: serpientes, ranas, arañas, águilas.

4. Consumidores Terciarios (Superdepredadores):
- Están en la cima de la cadena, nadie los caza.
- Ejemplos: leones, tiburones, orcas, águilas calvas.

5. Descomponedores:
- Descomponen los restos de animales y plantas muertos.
- Devuelven los nutrientes a la tierra.
- Ejemplos: hongos, bacterias, lombrices.

Ejemplo de Cadena Alimenticia:
Pasto → Saltamontes → Rana → Serpiente → Águila → Bacterias

¿Qué pasa si falta un eslabón?
Imagina que desaparecen las ranas:
- Las serpientes no tendrían qué comer y morirían.
- Los saltamontes aumentarían demasiado y se comerían todo el pasto.
- Todo el ecosistema se desequilibraría.

Por eso cada animal, por pequeño que sea, es importante para el equilibrio de la naturaleza.`
        },
        { 
          title: "Cómo Ayudar a los Animales", 
          description: "Acciones que puedes hacer para protegerlos", 
          emoji: "🤝",
          fullContent: `Cómo Ayudar a los Animales: ¡Conviértete en Protector!

No necesitas ser adulto para ayudar a los animales. ¡Hay muchas cosas que puedes hacer desde ahora!

En tu Casa y Jardín:
- Pon un plato con agua para pájaros e insectos.
- Planta flores para atraer mariposas y abejas.
- No uses pesticidas que dañan a los insectos buenos.
- Si tienes mascotas, cuídalas con amor y responsabilidad.
- Adopta en lugar de comprar mascotas.

En tu Comunidad:
- No tires basura, especialmente plásticos que dañan a los animales.
- Si ves un animal herido, avisa a un adulto para llamar a rescate animal.
- Participa en campañas de limpieza de parques y bosques.
- Aprende sobre los animales de tu zona y comparte lo que sabes.

Con tus Decisiones:
- Reduce, reutiliza y recicla para generar menos basura.
- No compres productos hechos con partes de animales.
- Elige productos que no hayan sido probados en animales.
- Come menos carne para reducir la deforestación.

Apoyando Causas:
- Aprende sobre organizaciones que protegen animales.
- Haz dibujos o carteles para crear conciencia.
- Pide a tu escuela que organice actividades sobre protección animal.
- Celebra días especiales como el Día Mundial de los Animales.

Respetando la Naturaleza:
- Cuando visites bosques o playas, no molestes a los animales.
- Observa a los animales salvajes desde lejos.
- No alimentes a animales salvajes con comida humana.
- Deja los espacios naturales más limpios de como los encontraste.

Recuerda: Cada pequeña acción cuenta. ¡Tú puedes hacer la diferencia!`
        }
      ]
    },
    {
      month: "Marzo",
      theme: "Las Plantas y los Bosques",
      emoji: "🌳",
      icon: TreePine,
      color: "green",
      topics: [
        { 
          title: "Día del Árbol", 
          description: "Celebramos la importancia de plantar y cuidar árboles", 
          emoji: "🌲",
          fullContent: `Día del Árbol: Celebrando a Nuestros Gigantes Verdes

Los árboles son seres vivos increíbles que nos dan vida. ¡Vamos a conocerlos mejor!

¿Por qué son importantes los árboles?

Producen Oxígeno:
- Un árbol adulto produce el oxígeno que necesitan 4 personas para respirar.
- Los bosques son los pulmones del planeta.

Combaten el Cambio Climático:
- Absorben el dióxido de carbono (CO2) que calienta el planeta.
- Un árbol puede absorber hasta 22 kilos de CO2 al año.

Nos dan Alimentos:
- Frutas, nueces, semillas y muchos productos más.
- El chocolate, la canela y el café vienen de árboles.

Protegen el Suelo:
- Sus raíces evitan que la tierra se erosione.
- Ayudan a que el agua se filtre al subsuelo.

Son Hogar de Animales:
- Miles de especies viven en los árboles.
- Un solo árbol grande puede ser hogar de cientos de animales e insectos.

Árboles Asombrosos:
- El árbol más alto del mundo es una secuoya de 115 metros en California.
- El árbol más viejo tiene más de 5,000 años.
- El árbol más grande por volumen es el General Sherman, una secuoya gigante.

¿Cómo plantar un árbol?
1. Elige un lugar con suficiente espacio y luz.
2. Cava un hoyo dos veces más grande que la raíz.
3. Coloca el árbol y rellena con tierra.
4. Riega abundantemente.
5. Cuídalo durante sus primeros años.

¡Un árbol que plantes hoy puede vivir cientos de años y beneficiar a muchas generaciones!`
        },
        { 
          title: "Fotosíntesis Mágica", 
          description: "Cómo las plantas convierten luz en oxígeno", 
          emoji: "☀️",
          fullContent: `La Fotosíntesis: La Magia de las Plantas

Las plantas tienen un superpoder que ningún otro ser vivo tiene: pueden hacer su propia comida usando la luz del sol. Este proceso se llama fotosíntesis.

¿Qué necesitan las plantas?

1. Luz Solar:
- Es la energía que activa todo el proceso.
- Por eso las plantas buscan siempre la luz.

2. Agua:
- Las raíces la absorben del suelo.
- Viaja por el tallo hasta las hojas.

3. Dióxido de Carbono (CO2):
- Lo toman del aire por pequeños poros en las hojas llamados estomas.
- Es un gas que nosotros exhalamos al respirar.

4. Clorofila:
- Es el pigmento verde de las hojas.
- Captura la energía del sol.

¿Cómo funciona?
La clorofila en las hojas atrapa la luz del sol. Con esa energía, la planta combina el agua con el dióxido de carbono para crear glucosa (azúcar), que es su alimento. Como resultado, libera oxígeno al aire.

La Fórmula Mágica:
Agua + Dióxido de Carbono + Luz Solar = Glucosa + Oxígeno

¿Por qué es importante para nosotros?
- Produce el oxígeno que respiramos.
- Limpia el aire del CO2 contaminante.
- Es la base de toda la cadena alimenticia.
- Sin fotosíntesis, no existiría la vida como la conocemos.

Dato Curioso:
Las plantas producen más oxígeno del que necesitan, por eso hay suficiente para todos los animales del planeta. ¡Gracias, plantas!`
        },
        { 
          title: "Bosques del Mundo", 
          description: "Desde la selva tropical hasta los bosques de pinos", 
          emoji: "🌴",
          fullContent: `Bosques del Mundo: Viaje por los Diferentes Tipos de Bosques

Los bosques cubren aproximadamente el 31% de la superficie terrestre. ¡Vamos a explorar los diferentes tipos!

Selva Tropical:
- Ubicación: cerca del ecuador (Amazonas, Congo, Indonesia).
- Clima: caliente y muy húmedo todo el año.
- Características: árboles altísimos, muchas lluvias, hojas siempre verdes.
- Dato: El Amazonas produce el 20% del oxígeno mundial.

Bosque Templado:
- Ubicación: Europa, este de Estados Unidos, Chile, Japón.
- Clima: cuatro estaciones definidas.
- Características: árboles que pierden hojas en otoño (caducifolios).
- Animales: ciervos, osos, zorros, ardillas.

Bosque de Coníferas (Taiga):
- Ubicación: Canadá, Rusia, Escandinavia.
- Clima: inviernos muy fríos y largos.
- Características: pinos, abetos y otras coníferas que resisten el frío.
- Dato: Es el bosque más grande del mundo.

Bosque Mediterráneo:
- Ubicación: alrededor del Mar Mediterráneo, California, Chile.
- Clima: veranos secos y calientes, inviernos suaves.
- Características: árboles como encinas y alcornoques con hojas resistentes.

Manglar:
- Ubicación: costas tropicales.
- Características: árboles que crecen en agua salada.
- Importancia: protegen las costas de tormentas y son cuna de peces.

¿Por qué debemos proteger los bosques?
- Se están destruyendo 10 millones de hectáreas de bosque cada año.
- Perdemos especies de plantas y animales para siempre.
- Sin bosques, el cambio climático se acelera.
- Los bosques filtran el agua y evitan inundaciones.

¡Cada bosque es único y necesita nuestra protección!`
        },
        { 
          title: "Plantas Medicinales", 
          description: "Descubre las plantas que nos ayudan a estar sanos", 
          emoji: "🌿",
          fullContent: `Plantas Medicinales: La Farmacia de la Naturaleza

Desde hace miles de años, los humanos hemos usado plantas para curar enfermedades. Muchas medicinas modernas vienen de las plantas.

Plantas Medicinales Comunes:

Manzanilla:
- Usos: calma el estómago, ayuda a dormir, reduce la ansiedad.
- Se toma como té con las flores.
- También sirve para la piel irritada.

Menta:
- Usos: dolor de estómago, náuseas, refrescar el aliento.
- Se puede masticar o tomar como té.
- El aceite de menta ayuda con dolores de cabeza.

Sábila (Aloe Vera):
- Usos: quemaduras, heridas, piel seca.
- El gel de sus hojas es muy curativo.
- También se usa en champús y cremas.

Eucalipto:
- Usos: resfriados, tos, congestión nasal.
- Se inhala el vapor de sus hojas.
- Los koalas solo comen hojas de eucalipto.

Lavanda:
- Usos: relajación, dolor de cabeza, picaduras de insectos.
- Su aroma calma los nervios.
- Se usa en aceites y sachets.

Jengibre:
- Usos: náuseas, dolor de garganta, digestión.
- Se puede comer en comidas o tomar como té.
- Muy usado en la cocina asiática.

Importante:
- Siempre consulta con un adulto antes de usar plantas medicinales.
- Algunas plantas pueden ser tóxicas si no se usan correctamente.
- Las plantas medicinales complementan, no reemplazan, la medicina.

Dato Asombroso:
El 25% de los medicamentos modernos contienen ingredientes derivados de plantas. ¡La naturaleza es nuestra mejor farmacia!`
        }
      ]
    },
    {
      month: "Abril",
      theme: "Día de la Tierra",
      emoji: "🌍",
      icon: Leaf,
      color: "emerald",
      topics: [
        { 
          title: "Nuestro Planeta Azul", 
          description: "Por qué la Tierra es tan especial en el universo", 
          emoji: "🌎",
          fullContent: `Nuestro Planeta Azul: Un Hogar Único en el Universo

La Tierra es el único planeta conocido donde existe vida. ¡Es un lugar muy especial!

¿Por qué la Tierra es Azul?
- El 71% de su superficie está cubierta de agua.
- Vista desde el espacio, se ve mayormente azul por los océanos.
- Por eso también se le llama "El Planeta Azul".

Lo que hace única a la Tierra:

Distancia Perfecta del Sol:
- Está en la "zona habitable" donde no hace ni mucho frío ni mucho calor.
- El agua puede existir en estado líquido.
- Venus es muy caliente y Marte muy frío.

Atmósfera Protectora:
- Nos protege de la radiación dañina del sol.
- Mantiene el calor para que no sea muy frío de noche.
- Tiene el oxígeno que necesitamos para respirar.

Campo Magnético:
- Actúa como un escudo invisible.
- Desvía partículas peligrosas del sol.
- Crea las hermosas auroras boreales.

La Luna:
- Estabiliza la inclinación de la Tierra.
- Genera las mareas que son importantes para la vida marina.
- Es inusualmente grande comparada con la Tierra.

Datos Fascinantes:
- La Tierra tiene 4,500 millones de años de edad.
- Viajamos alrededor del sol a 107,000 km por hora.
- Un día terrestre dura 23 horas y 56 minutos exactamente.
- Hay aproximadamente 8.7 millones de especies viviendo aquí.

¿Por qué debemos cuidarla?
No tenemos otro planeta a donde ir. La Tierra es nuestro único hogar y debemos protegerla para nosotros y las generaciones futuras.`
        },
        { 
          title: "Capas de la Tierra", 
          description: "Viaja desde la corteza hasta el núcleo", 
          emoji: "🔬",
          fullContent: `Las Capas de la Tierra: Un Viaje al Centro del Planeta

Si pudieras cavar un túnel hasta el centro de la Tierra, atravesarías varias capas. ¡Vamos a explorarlas!

1. Corteza (0-70 km):
- Es la capa más delgada, como la cáscara de una manzana.
- Hay dos tipos: oceánica (bajo los océanos) y continental (los continentes).
- Aquí es donde vivimos y donde están las montañas y valles.
- Temperatura: de 0° a 500°C.

2. Manto (70-2,900 km):
- Es la capa más gruesa de la Tierra.
- Está formado por rocas muy calientes que se mueven muy lentamente.
- El movimiento del manto causa los terremotos y crea volcanes.
- Temperatura: de 500° a 4,000°C.

3. Núcleo Externo (2,900-5,100 km):
- Está hecho principalmente de hierro y níquel líquidos.
- Su movimiento genera el campo magnético de la Tierra.
- Temperatura: de 4,000° a 5,000°C.

4. Núcleo Interno (5,100-6,371 km):
- Es una bola sólida de hierro y níquel.
- Aunque es muy caliente, está sólido por la presión enorme.
- Temperatura: aproximadamente 5,500°C, ¡tan caliente como la superficie del sol!

Datos Curiosos:
- Si la Tierra fuera del tamaño de un huevo, la corteza sería más delgada que la cáscara.
- El núcleo tiene suficiente hierro para hacer 1 millón de Eiffels.
- Nadie ha llegado más allá de 12 km de profundidad.

¿Cómo sabemos todo esto?
Los científicos estudian las ondas de los terremotos que viajan por la Tierra y cambian según las capas que atraviesan.`
        },
        { 
          title: "Cambio Climático", 
          description: "Entendiendo cómo cambia nuestro clima", 
          emoji: "🌡️",
          fullContent: `El Cambio Climático: El Gran Desafío de Nuestra Era

El clima de la Tierra está cambiando más rápido que nunca, y los humanos somos la causa principal.

¿Qué es el Cambio Climático?
Es el aumento de la temperatura promedio de la Tierra y los cambios en los patrones del clima a largo plazo.

¿Por qué está pasando?

El Efecto Invernadero:
- Ciertos gases en la atmósfera atrapan el calor del sol.
- Normalmente, esto mantiene la Tierra cálida para la vida.
- Pero hemos añadido demasiados gases invernadero.

Gases de Efecto Invernadero:
- Dióxido de carbono (CO2): de quemar combustibles fósiles.
- Metano: de la ganadería y basureros.
- Óxido nitroso: de fertilizantes agrícolas.

¿Qué está causando?
- Aumento del nivel del mar por derretimiento de glaciares.
- Olas de calor más frecuentes e intensas.
- Tormentas y huracanes más fuertes.
- Sequías e inundaciones.
- Extinción de especies.
- Blanqueamiento de corales.

Datos Alarmantes:
- La temperatura global ha subido 1.1°C desde 1880.
- Los últimos 7 años han sido los más calientes registrados.
- El nivel del mar sube 3.3 mm cada año.

¿Qué podemos hacer?
- Usar menos energía y preferir energías renovables.
- Caminar, usar bicicleta o transporte público.
- Comer menos carne.
- Plantar árboles.
- Reducir, reutilizar y reciclar.
- Hablar con otros sobre el cambio climático.

¡Todavía podemos actuar para evitar los peores efectos!`
        },
        { 
          title: "Acciones por el Planeta", 
          description: "22 de Abril: actividades para celebrar la Tierra", 
          emoji: "🎉",
          fullContent: `Día de la Tierra: ¡Celebremos y Actuemos!

El 22 de abril celebramos el Día de la Tierra. Es una oportunidad para reflexionar y actuar por nuestro planeta.

Historia del Día de la Tierra:
- Se celebró por primera vez el 22 de abril de 1970.
- Fue idea del senador estadounidense Gaylord Nelson.
- 20 millones de personas participaron ese primer día.
- Hoy lo celebran más de 1,000 millones de personas en 193 países.

Actividades para Celebrar:

En Casa:
- Haz un "apagón": no uses electricidad por una hora.
- Prepara una comida con ingredientes locales y orgánicos.
- Crea arte con materiales reciclados.
- Planta una semilla o cuida una planta.

En la Comunidad:
- Organiza o únete a una limpieza de parque o playa.
- Planta árboles con vecinos y amigos.
- Haz una caminata por la naturaleza.
- Visita un jardín botánico o reserva natural.

En la Escuela:
- Haz una presentación sobre el medio ambiente.
- Organiza un intercambio de juguetes o libros usados.
- Crea carteles sobre cuidado ambiental.
- Inicia un jardín escolar o compostera.

Compromisos de Largo Plazo:
- Reduce tu uso de plásticos de un solo uso.
- Apaga las luces cuando no las necesites.
- Cierra la llave del agua mientras te lavas los dientes.
- Separa la basura para reciclar.
- Camina o usa bicicleta cuando puedas.

Recuerda:
El Día de la Tierra es todos los días. Cada acción que hagas para cuidar el planeta cuenta, sin importar lo pequeña que sea.

"No heredamos la Tierra de nuestros ancestros, la tomamos prestada de nuestros hijos." - Proverbio indígena`
        }
      ]
    },
    {
      month: "Mayo",
      theme: "Biodiversidad",
      emoji: "🦜",
      icon: Fish,
      color: "yellow",
      topics: [
        { 
          title: "¿Qué es la Biodiversidad?", 
          description: "La increíble variedad de vida en nuestro planeta", 
          emoji: "🌺",
          fullContent: `Biodiversidad: La Riqueza de la Vida

Biodiversidad significa "diversidad biológica", es decir, la variedad de seres vivos en la Tierra.

Niveles de Biodiversidad:

1. Diversidad de Especies:
- Hay aproximadamente 8.7 millones de especies en el planeta.
- Solo conocemos 1.2 millones, ¡quedan millones por descubrir!
- Incluye animales, plantas, hongos, bacterias y más.

2. Diversidad Genética:
- Diferencias dentro de cada especie.
- Por eso hay personas con ojos azules, verdes o cafés.
- Permite adaptarse a cambios ambientales.

3. Diversidad de Ecosistemas:
- Diferentes tipos de ambientes: bosques, océanos, desiertos, etc.
- Cada ecosistema tiene especies únicas.
- Todos están conectados entre sí.

¿Por qué es importante la biodiversidad?

Para la Naturaleza:
- Mantiene el equilibrio de los ecosistemas.
- Cada especie tiene un rol importante.
- La extinción de una especie afecta a muchas otras.

Para los Humanos:
- Alimentos: todas las frutas, verduras, carnes vienen de la biodiversidad.
- Medicinas: el 70% de medicamentos anticancerígenos vienen de plantas.
- Materiales: madera, algodón, lana, cuero.
- Aire y agua limpios.
- Polinización de cultivos.

Lugares con Mayor Biodiversidad:
- Selva Amazónica
- Arrecifes de coral
- Madagascar
- Indonesia
- Colombia

Amenazas a la Biodiversidad:
- Destrucción de hábitats
- Cambio climático
- Contaminación
- Especies invasoras
- Sobreexplotación

Actualmente, las especies se están extinguiendo 1,000 veces más rápido que lo natural. ¡Debemos actuar ya!`
        },
        { 
          title: "Ecosistemas", 
          description: "Comunidades de seres vivos que viven juntos", 
          emoji: "🏞️",
          fullContent: `Ecosistemas: Comunidades de Vida

Un ecosistema es un área donde plantas, animales y otros organismos interactúan entre sí y con su ambiente.

Componentes de un Ecosistema:

Factores Bióticos (vivos):
- Productores: plantas que hacen fotosíntesis.
- Consumidores: animales que comen plantas u otros animales.
- Descomponedores: hongos y bacterias que reciclan nutrientes.

Factores Abióticos (no vivos):
- Luz solar
- Agua
- Temperatura
- Suelo
- Aire

Tipos de Ecosistemas:

Ecosistemas Terrestres:
- Bosques: templados, tropicales, de coníferas.
- Praderas: sabanas, estepas.
- Desiertos: calientes y fríos.
- Tundra: regiones polares.
- Montañas: diferentes zonas según la altura.

Ecosistemas Acuáticos:
- Marinos: océanos, arrecifes, estuarios.
- De agua dulce: ríos, lagos, humedales.

Servicios de los Ecosistemas:
Son los beneficios que obtenemos de ellos:
- Purificación del aire y agua.
- Regulación del clima.
- Polinización de cultivos.
- Prevención de inundaciones.
- Producción de alimentos.
- Recreación y turismo.

Ecosistemas en Peligro:
- Los arrecifes de coral están blanqueándose.
- Los bosques tropicales se reducen cada año.
- Los humedales están siendo drenados.
- Los océanos se están acidificando.

¿Cómo protegerlos?
- Reducir contaminación.
- Crear áreas protegidas.
- Restaurar ecosistemas dañados.
- Usar recursos de forma sostenible.

Cada ecosistema es único e irremplazable.`
        },
        { 
          title: "Polinizadores", 
          description: "Abejas, mariposas y otros héroes del jardín", 
          emoji: "🐝",
          fullContent: `Los Polinizadores: Héroes Invisibles de la Naturaleza

Sin polinizadores, no tendríamos la mayoría de las frutas, verduras y flores que conocemos. ¡Son esenciales para la vida!

¿Qué es la Polinización?
Es el proceso donde el polen viaja de una flor a otra, permitiendo que las plantas produzcan semillas y frutos.

Principales Polinizadores:

Abejas:
- Son los polinizadores más importantes.
- Una abeja visita entre 50 y 1,000 flores por día.
- Hay más de 20,000 especies de abejas.
- Producen miel, cera y propóleo.

Mariposas:
- Les atraen flores coloridas y fragantes.
- Tienen una lengua larga para alcanzar el néctar.
- Las monarca viajan 4,000 km en su migración.

Colibríes:
- Sus picos largos llegan donde otros no pueden.
- Baten sus alas 80 veces por segundo.
- Prefieren flores rojas y naranjas.

Murciélagos:
- Polinizan flores que abren de noche.
- Importantes para el agave (del que se hace el tequila).
- También dispersan semillas.

Otros Polinizadores:
- Polillas
- Escarabajos
- Moscas
- Avispas
- Hormigas

Importancia para los Humanos:
- El 75% de los cultivos dependen de polinizadores.
- Un tercio de nuestra comida requiere polinización.
- Valen 235-577 mil millones de dólares anuales en agricultura.

Amenazas a los Polinizadores:
- Pesticidas tóxicos.
- Pérdida de hábitat.
- Enfermedades.
- Cambio climático.

¿Cómo Ayudarlos?
- Planta flores nativas en tu jardín.
- No uses pesticidas químicos.
- Deja un plato con agua para que beban.
- Construye hoteles para abejas solitarias.
- ¡No les tengas miedo, son pacíficos!`
        },
        { 
          title: "Especies Invasoras", 
          description: "Cuando un animal o planta llega donde no debería", 
          emoji: "🦎",
          fullContent: `Especies Invasoras: Cuando la Naturaleza se Desequilibra

Una especie invasora es un organismo que llega a un lugar donde no vivía naturalmente y causa daños al ecosistema local.

¿Cómo llegan las Especies Invasoras?

Accidentalmente:
- En el agua de lastre de los barcos.
- Escondidas en cargamentos de frutas o madera.
- Adheridas a la ropa o equipaje de viajeros.

Intencionalmente:
- Como mascotas que luego se liberan.
- Para controlar plagas (que luego se vuelven plagas).
- Como plantas decorativas que escapan de jardines.

Ejemplos Famosos:

Conejo en Australia:
- Trajeron 24 conejos en 1859 para cazar.
- Ahora hay más de 200 millones.
- Destruyen cultivos y vegetación nativa.

Sapo de Caña:
- Lo trajeron a Australia para controlar escarabajos.
- Ahora mata a animales nativos con su veneno.
- Se ha expandido por todo el país.

Pez León:
- Originario del Pacífico, ahora invade el Caribe.
- Probablemente escapó de acuarios durante huracanes.
- Come peces nativos y no tiene depredadores ahí.

Jacinto de Agua:
- Planta acuática muy bonita que cubre lagos enteros.
- Bloquea la luz y mata peces y otras plantas.
- Puede duplicar su tamaño en dos semanas.

¿Por qué son un Problema?
- Compiten con especies nativas por comida y espacio.
- Pueden traer enfermedades.
- Alteran la cadena alimenticia.
- Pueden causar extinciones.
- Cuestan miles de millones en daños cada año.

¿Qué Podemos Hacer?
- Nunca liberar mascotas exóticas en la naturaleza.
- Limpiar equipo de camping y pesca entre viajes.
- No transportar plantas o animales entre regiones.
- Reportar avistamientos de especies extrañas.`
        }
      ]
    },
    {
      month: "Junio",
      theme: "El Sol y la Energía",
      emoji: "☀️",
      icon: Sun,
      color: "orange",
      topics: [
        { 
          title: "Energía Solar", 
          description: "Cómo convertimos la luz del sol en electricidad", 
          emoji: "🔆",
          fullContent: `Energía Solar: El Poder del Sol

El Sol es la fuente de energía más grande que tenemos. Cada hora, el Sol envía a la Tierra suficiente energía para abastecer al mundo durante un año.

¿Qué es la Energía Solar?
Es la energía que obtenemos de la luz y el calor del Sol. Es limpia, renovable e inagotable.

Tipos de Energía Solar:

Fotovoltaica:
- Convierte la luz del sol directamente en electricidad.
- Usa paneles solares con celdas de silicio.
- Sirve para casas, edificios, calculadoras, satélites.

Térmica:
- Usa el calor del sol para calentar agua o aire.
- Calentadores solares para agua caliente.
- Cocinas solares que cocinan sin gas ni electricidad.

Termosolar (Concentrada):
- Grandes espejos concentran la luz en un punto.
- El calor intenso genera vapor que mueve turbinas.
- Produce electricidad a gran escala.

Ventajas de la Energía Solar:
- Es gratuita e inagotable.
- No contamina ni produce gases de efecto invernadero.
- Requiere poco mantenimiento.
- Puede instalarse en casi cualquier lugar.
- Los precios han bajado 90% en 10 años.

Desventajas:
- No funciona de noche o días muy nublados.
- Necesita baterías para almacenar energía.
- La fabricación de paneles usa recursos.

Datos Curiosos:
- El Sol tiene energía para 5 mil millones de años más.
- Un metro cuadrado recibe 1,000 watts de energía solar.
- La Estación Espacial Internacional funciona con energía solar.
- El desierto del Sahara podría generar electricidad para todo el mundo.

El futuro es brillante con la energía solar.`
        },
        { 
          title: "Solsticio de Verano", 
          description: "El día más largo del año y su importancia", 
          emoji: "📅",
          fullContent: `El Solsticio de Verano: El Día Más Largo

El solsticio de verano es un evento astronómico especial que ocurre cada año, marcando el inicio del verano.

¿Qué es un Solsticio?
La palabra viene del latín "sol" (sol) y "sistere" (detenerse). Es cuando el Sol parece "detenerse" en el cielo antes de cambiar de dirección.

¿Cuándo ocurre?
- Hemisferio Norte: alrededor del 21 de junio.
- Hemisferio Sur: alrededor del 21 de diciembre.
- En el hemisferio donde es verano, es el día más largo y la noche más corta.

¿Por qué sucede?
- La Tierra está inclinada 23.5 grados sobre su eje.
- Durante el solsticio de verano, tu hemisferio está inclinado hacia el Sol.
- El Sol alcanza su punto más alto en el cielo.

Fenómenos Especiales:

En el Polo Norte:
- El Sol no se pone durante semanas (Sol de Medianoche).
- Hay luz las 24 horas del día.

En el Trópico de Cáncer:
- El Sol está exactamente sobre nuestras cabezas al mediodía.
- Los objetos no proyectan sombra.

Celebraciones Ancestrales:
- Stonehenge: las piedras se alinean con el amanecer del solsticio.
- Culturas mayas, egipcias e incas celebraban este día.
- Fiestas de San Juan en muchos países.

Importancia Histórica:
- Marcaba el calendario agrícola para las cosechas.
- Era considerado un día mágico y sagrado.
- Señalaba el momento de máxima fertilidad de la tierra.

Datos Interesantes:
- En el Polo Norte, el día dura 24 horas.
- En el ecuador, el día siempre dura 12 horas.
- Después del solsticio, los días empiezan a acortarse gradualmente.

¡Aprovecha la luz del día más largo para disfrutar al aire libre!`
        },
        { 
          title: "Paneles Solares", 
          description: "Tecnología que aprovecha el poder del sol", 
          emoji: "🔋",
          fullContent: `Paneles Solares: Tecnología del Futuro

Los paneles solares son dispositivos que convierten la luz del sol en electricidad. ¡Cada vez están en más lugares!

¿Cómo funcionan?

Las Celdas Fotovoltaicas:
1. Están hechas principalmente de silicio, un material semiconductor.
2. Cuando la luz del sol golpea la celda, libera electrones.
3. Estos electrones crean una corriente eléctrica.
4. Un inversor convierte esa corriente para usarla en casa.

Partes de un Sistema Solar:
- Paneles: capturan la luz solar.
- Inversor: convierte la electricidad de corriente continua a alterna.
- Baterías: almacenan energía para usar de noche (opcional).
- Medidor: mide cuánta electricidad produces.

Tipos de Paneles:

Monocristalinos:
- Los más eficientes (20-22%).
- Color negro uniforme.
- Los más caros.

Policristalinos:
- Eficiencia media (15-17%).
- Color azul con fragmentos visibles.
- Más económicos.

De Capa Fina:
- Flexibles y ligeros.
- Menor eficiencia (10-13%).
- Útiles para superficies curvas.

Dónde se Usan:
- Techos de casas y edificios.
- Granjas solares en desiertos.
- Calculadoras y relojes.
- Satélites y estaciones espaciales.
- Autos solares experimentales.
- Cargadores portátiles.

Datos Interesantes:
- Un panel dura 25-30 años.
- China es el mayor productor de paneles solares.
- Los precios han bajado 99% desde 1976.
- En un día soleado, un panel de 1 metro cuadrado genera unos 150 watts.

Futuro de los Paneles Solares:
- Paneles transparentes para ventanas.
- Pintura solar para paredes.
- Carreteras solares.
- Mayor eficiencia con nuevos materiales.

La energía solar es clave para un futuro sostenible.`
        },
        { 
          title: "Ahorro de Energía en Verano", 
          description: "Mantente fresco sin gastar mucha electricidad", 
          emoji: "❄️",
          fullContent: `Ahorro de Energía en Verano: Fresco y Ecológico

En verano usamos más energía para mantenernos frescos. ¡Aquí tienes consejos para ahorrar!

Mantén tu Casa Fresca Naturalmente:

Ventilación Cruzada:
- Abre ventanas en lados opuestos de la casa.
- Deja que el aire fresco circule.
- Mejor por la mañana temprano o en la noche.

Usa Persianas y Cortinas:
- Ciérralas durante las horas más calientes (12-4 pm).
- Las cortinas claras reflejan el calor.
- Las cortinas térmicas son muy efectivas.

Plantas y Sombra:
- Los árboles pueden reducir la temperatura 5-10 grados.
- Plantas en ventanas dan sombra y frescura.
- Techos verdes absorben menos calor.

Uso Eficiente del Aire Acondicionado:

Si lo usas:
- Ponlo a 24-26°C, no más frío.
- Cada grado menos usa 7% más de energía.
- Mantén puertas y ventanas cerradas.
- Limpia los filtros regularmente.
- No lo dejes encendido si sales de casa.

Alternativas al Aire:
- Ventiladores usan 90% menos energía.
- Pon un recipiente con hielo frente al ventilador.
- Usa ropa ligera y de colores claros.
- Toma duchas frescas.

Otros Consejos:

Electrodomésticos:
- Cocina temprano o tarde, no al mediodía.
- Usa el horno menos, genera mucho calor.
- Apaga luces que no uses (también generan calor).
- Desconecta aparatos en standby.

Ropa y Ropa de Cama:
- Usa sábanas de algodón ligero.
- Ropa holgada de colores claros.
- Duerme en el piso más bajo (el calor sube).

Hidrátate:
- Bebe mucha agua fría.
- Come frutas con alto contenido de agua (sandía, pepino).

Con estos consejos ahorras dinero, energía y ayudas al planeta.`
        }
      ]
    },
    {
      month: "Julio",
      theme: "Los Océanos",
      emoji: "🌊",
      icon: Droplets,
      color: "cyan",
      topics: [
        { 
          title: "Día Mundial de los Océanos", 
          description: "Celebrando nuestros mares y su importancia", 
          emoji: "🐋",
          fullContent: `Día Mundial de los Océanos: Celebrando el Corazón Azul del Planeta

Cada 8 de junio celebramos el Día Mundial de los Océanos, establecido por las Naciones Unidas en 2008.

¿Por qué son importantes los océanos?

Regulan el Clima:
- Absorben el 30% del CO2 producido por humanos.
- Almacenan el 90% del calor extra causado por el cambio climático.
- Generan corrientes que distribuyen el calor alrededor del planeta.

Producen Oxígeno:
- El 50-80% del oxígeno que respiramos viene del océano.
- El fitoplancton marino es el mayor productor de oxígeno.
- Son más importantes que los bosques para el aire.

Proveen Alimentos:
- Miles de millones de personas dependen del pescado como proteína principal.
- La pesca emplea a 60 millones de personas.
- Algas, mariscos y otros productos marinos.

Biodiversidad:
- Hogar del 80% de toda la vida en la Tierra.
- Solo hemos explorado el 5% del océano.
- Nuevas especies se descubren constantemente.

Los 5 Océanos:
1. Pacífico: el más grande, cubre más área que toda la tierra.
2. Atlántico: el segundo más grande, conecta América con Europa y África.
3. Índico: el más cálido, lleno de corales.
4. Antártico: rodea la Antártida, muy frío.
5. Ártico: el más pequeño, cubierto de hielo.

Datos Fascinantes:
- El océano tiene en promedio 3,688 metros de profundidad.
- El punto más profundo, la Fosa de las Marianas, tiene 11,034 metros.
- Solo 3 personas han llegado al fondo (más que a la Luna).

Cómo Celebrar:
- Participa en limpiezas de playa.
- Reduce tu uso de plásticos.
- Aprende sobre la vida marina.
- Comparte información sobre los océanos.

Los océanos nos dan vida. Es hora de devolverles el favor.`
        },
        { 
          title: "Vida Marina", 
          description: "Desde el plancton hasta las ballenas", 
          emoji: "🐙",
          fullContent: `Vida Marina: El Universo Bajo el Agua

El océano está lleno de vida increíble, desde organismos microscópicos hasta los animales más grandes del planeta.

Zonas del Océano:

Zona de Luz (0-200m):
- Donde llega la luz del sol.
- Aquí vive la mayoría de las especies conocidas.
- Peces, corales, tortugas, delfines.

Zona de Penumbra (200-1,000m):
- Muy poca luz.
- Animales con ojos grandes o bioluminiscentes.
- Calamares, peces linterna.

Zona de Medianoche (1,000-4,000m):
- Oscuridad total, agua muy fría.
- Criaturas extrañas y adaptadas.
- Peces con luces propias.

Zona Abisal (4,000-6,000m):
- Presión extrema.
- Pepinos de mar, estrellas de mar.

Zona Hadal (+6,000m):
- Las fosas oceánicas más profundas.
- Muy poco conocida.

Criaturas Asombrosas:

Ballena Azul:
- El animal más grande que ha existido (30 metros).
- Su corazón es del tamaño de un auto.
- Come 4 toneladas de krill al día.

Pulpo:
- Tres corazones y sangre azul.
- Puede cambiar de color en milisegundos.
- Es muy inteligente, puede resolver problemas.

Medusa Inmortal:
- Puede rejuvenecerse y vivir para siempre.
- Cuando envejece, vuelve a ser joven.

Pez Abisal:
- Vive en oscuridad total.
- Produce su propia luz.
- Puede comer presas más grandes que él.

Coral:
- Parece planta pero es animal.
- Miles de pequeños pólipos viviendo juntos.
- Los arrecifes son como bosques submarinos.

¿Por qué proteger la vida marina?
- Regula el clima.
- Produce oxígeno.
- Es fuente de alimentos.
- Tiene potencial para nuevas medicinas.
- Es belleza natural irremplazable.`
        },
        { 
          title: "Plástico en el Mar", 
          description: "El problema de la contaminación oceánica", 
          emoji: "🥤",
          fullContent: `El Plástico en el Mar: Una Crisis Global

Cada año, entre 8 y 12 millones de toneladas de plástico llegan al océano. Es uno de los mayores problemas ambientales.

¿De dónde viene el plástico?
- 80% viene de fuentes terrestres.
- Basura en calles que llega a ríos y luego al mar.
- Plásticos abandonados en playas.
- Redes de pesca perdidas o abandonadas.

Tipos de Plástico en el Océano:

Macroplásticos:
- Botellas, bolsas, envases visibles.
- Redes de pesca fantasma.
- Pueden atrapar y matar animales.

Microplásticos:
- Fragmentos menores a 5mm.
- Vienen de plásticos grandes que se rompen.
- También de cosméticos, ropa sintética.
- Imposibles de limpiar completamente.

Nanoplásticos:
- Invisibles a simple vista.
- Entran en la cadena alimenticia.
- Se han encontrado en peces que comemos.

Impacto en los Animales:

- Más de 1 millón de aves marinas mueren por plástico cada año.
- 100,000 mamíferos marinos mueren atrapados o por ingesta.
- Las tortugas confunden bolsas con medusas.
- Los peces comen microplásticos y nosotros comemos peces.

Las Islas de Plástico:
- Grandes acumulaciones de basura flotante.
- La del Pacífico es 3 veces más grande que Francia.
- Son difíciles de limpiar porque el plástico está fragmentado.

¿Cuánto tarda en degradarse?
- Bolsa plástica: 20 años
- Vaso de plástico: 50 años
- Botella: 450 años
- Línea de pesca: 600 años

¿Qué podemos hacer?
- Rechazar plásticos de un solo uso.
- Usar bolsas reutilizables.
- Llevar tu propia botella de agua.
- Participar en limpiezas de playas.
- Reciclar correctamente.

El océano no puede limpiarse solo. Necesita nuestra ayuda.`
        },
        { 
          title: "Arrecifes de Coral", 
          description: "Las selvas tropicales del océano", 
          emoji: "🪸",
          fullContent: `Arrecifes de Coral: Ciudades Submarinas de Color

Los arrecifes de coral son uno de los ecosistemas más biodiversos y hermosos del planeta, pero están en grave peligro.

¿Qué son los Corales?
- Aunque parecen rocas o plantas, son animales.
- Formados por miles de pequeños organismos llamados pólipos.
- Tienen una relación simbiótica con algas que les dan color.
- Crecen muy lento: algunos solo 1 cm por año.

Tipos de Arrecifes:

Arrecifes de Franja:
- Crecen cerca de la costa.
- Los más jóvenes.

Arrecifes de Barrera:
- Separados de la costa por una laguna.
- La Gran Barrera de Coral en Australia es el más grande.

Atolones:
- Anillos de coral alrededor de una laguna.
- Se forman cuando una isla volcánica se hunde.

Importancia de los Arrecifes:

Para la Biodiversidad:
- Hogar del 25% de todas las especies marinas.
- Refugio, alimentación y reproducción.
- Miles de especies de peces, moluscos, crustáceos.

Para los Humanos:
- Protegen costas de tormentas y erosión.
- Fuente de alimentos para 500 millones de personas.
- Turismo genera miles de millones de dólares.
- Potencial para nuevos medicamentos.

Amenazas a los Corales:

Blanqueamiento:
- Cuando el agua se calienta, los corales expulsan sus algas.
- Pierden su color y pueden morir.
- El cambio climático es la principal causa.

Otras Amenazas:
- Acidificación del océano.
- Contaminación y sedimentos.
- Pesca destructiva.
- Turismo irresponsable.

Estado Actual:
- El 50% de los corales han muerto en los últimos 30 años.
- Podrían desaparecer para 2050 si no actuamos.

¿Cómo Ayudar?
- Reducir huella de carbono.
- Usar protector solar amigable con corales.
- No tocar los corales al bucear.
- Apoyar la conservación marina.`
        }
      ]
    },
    {
      month: "Agosto",
      theme: "El Aire y la Atmósfera",
      emoji: "💨",
      icon: Wind,
      color: "sky",
      topics: [
        { 
          title: "Composición del Aire", 
          description: "Oxígeno, nitrógeno y otros gases que respiramos", 
          emoji: "🌬️",
          fullContent: `La Composición del Aire: Lo que Respiramos

El aire es una mezcla de gases invisibles que rodea la Tierra. Sin él, la vida no sería posible.

¿De qué está hecho el aire?

Nitrógeno (78%):
- El gas más abundante.
- Es inerte, no reacciona fácilmente.
- Las plantas lo necesitan para crecer.
- Nosotros lo inhalamos y exhalamos sin usarlo.

Oxígeno (21%):
- Esencial para respirar.
- Lo producen las plantas y el fitoplancton.
- Lo usamos para convertir alimentos en energía.
- También permite que el fuego arda.

Argón (0.93%):
- Gas noble, no reacciona con nada.
- Se usa en bombillas y soldadura.

Dióxido de Carbono (0.04%):
- Las plantas lo usan para la fotosíntesis.
- Nosotros lo exhalamos al respirar.
- En exceso, causa el efecto invernadero.

Otros Gases:
- Vapor de agua (variable según humedad).
- Neón, helio, metano, ozono.
- Cantidades muy pequeñas pero importantes.

Capas de la Atmósfera:

Tropósfera (0-12 km):
- Donde vivimos y ocurre el clima.
- Contiene el 75% del aire.

Estratósfera (12-50 km):
- Contiene la capa de ozono.
- Los aviones vuelan en su parte baja.

Mesósfera (50-80 km):
- Aquí se queman los meteoritos.
- Muy fría: hasta -90°C.

Termósfera (80-700 km):
- Muy caliente pero muy delgada.
- Donde orbita la Estación Espacial.

Exósfera (+700 km):
- Se mezcla gradualmente con el espacio.

Datos Curiosos:
- El aire pesa: la atmósfera ejerce 1 kg de presión por cm².
- Sin atmósfera, la Tierra sería 33°C más fría.
- El color azul del cielo es porque el aire dispersa la luz azul.

El aire nos protege y nos da vida. ¡Debemos mantenerlo limpio!`
        },
        { 
          title: "Contaminación del Aire", 
          description: "Qué la causa y cómo nos afecta", 
          emoji: "🏭",
          fullContent: `Contaminación del Aire: Un Problema Invisible

La contaminación del aire es la presencia de sustancias dañinas en la atmósfera. Afecta nuestra salud y el medio ambiente.

Principales Contaminantes:

Material Particulado (PM):
- Pequeñas partículas sólidas o líquidas.
- PM2.5: tan pequeñas que entran a los pulmones.
- PM10: se quedan en nariz y garganta.
- Vienen de vehículos, industrias, incendios.

Dióxido de Nitrógeno (NO2):
- Principalmente de vehículos a motor.
- Causa smog y lluvia ácida.
- Irrita las vías respiratorias.

Dióxido de Azufre (SO2):
- De quemar carbón y petróleo.
- Causa lluvia ácida.
- Daña plantas y edificios.

Ozono Troposférico (O3):
- "Ozono malo" a nivel del suelo.
- Se forma por reacción de contaminantes con luz solar.
- Diferente del ozono "bueno" de la estratósfera.

Monóxido de Carbono (CO):
- Gas invisible y sin olor.
- Muy peligroso en espacios cerrados.
- Principalmente de vehículos y calefacción.

Fuentes de Contaminación:
- Transporte (autos, camiones, aviones).
- Industrias y fábricas.
- Generación de electricidad.
- Agricultura (quema de cultivos).
- Calefacción doméstica.
- Incendios forestales.

Efectos en la Salud:
- 7 millones de muertes prematuras al año.
- Enfermedades respiratorias y cardiovasculares.
- Cáncer de pulmón.
- Asma y alergias.
- Afecta el desarrollo de los niños.

Efectos Ambientales:
- Lluvia ácida daña bosques y lagos.
- Reducción de la visibilidad.
- Daño a cultivos.
- Contribuye al cambio climático.

¿Qué Podemos Hacer?
- Usar transporte público, bicicleta o caminar.
- Ahorrar energía en casa.
- No quemar basura.
- Plantar árboles.
- Apoyar energías limpias.

Respirar aire limpio es un derecho. Todos podemos contribuir.`
        },
        { 
          title: "La Capa de Ozono", 
          description: "El escudo protector de la Tierra", 
          emoji: "🛡️",
          fullContent: `La Capa de Ozono: Nuestro Escudo Invisible

La capa de ozono es una franja de gas en la estratósfera que nos protege de los rayos ultravioleta del Sol.

¿Qué es el Ozono?
- Es una molécula formada por 3 átomos de oxígeno (O3).
- En la estratósfera (15-35 km de altura), nos protege.
- A nivel del suelo, es un contaminante dañino.
- Tiene un olor característico (como después de una tormenta).

¿Por qué es importante?
- Absorbe el 97-99% de la radiación ultravioleta del Sol.
- Sin ella, los rayos UV causarían:
  - Cáncer de piel.
  - Cataratas en los ojos.
  - Daño al sistema inmunológico.
  - Muerte de fitoplancton marino.
  - Daño a plantas y cultivos.

El Agujero de Ozono:

Descubrimiento:
- En 1985, científicos descubrieron un agujero sobre la Antártida.
- Causado por productos químicos fabricados por humanos.

Los Culpables:
- CFCs (clorofluorocarbonos): usados en refrigeradores y aerosoles.
- Halones: usados en extintores.
- Una molécula de CFC puede destruir 100,000 moléculas de ozono.

El Protocolo de Montreal (1987):
- Acuerdo internacional para eliminar los CFCs.
- Uno de los tratados ambientales más exitosos.
- Firmado por 197 países.

Recuperación:
- El agujero está sanando lentamente.
- Se espera recuperación total para 2066.
- Ejemplo de que la acción global funciona.

Sustitutos de los CFCs:
- HFCs (hidrofluorocarbonos): no dañan el ozono pero causan efecto invernadero.
- Ahora se buscan alternativas más ecológicas.
- Refrigerantes naturales: propano, amoníaco, CO2.

Lecciones Aprendidas:
- Los problemas ambientales globales pueden resolverse.
- La cooperación internacional es posible.
- La ciencia guía las mejores decisiones.
- Nuestras acciones tienen consecuencias, buenas y malas.

La capa de ozono es una historia de éxito que nos da esperanza.`
        },
        { 
          title: "Árboles: Pulmones Verdes", 
          description: "Cómo los bosques limpian nuestro aire", 
          emoji: "🌲",
          fullContent: `Árboles: Los Pulmones Verdes del Planeta

Los árboles son esenciales para mantener el aire limpio y combatir el cambio climático. Son nuestros mejores aliados.

¿Cómo limpian el aire los árboles?

Absorben CO2:
- A través de la fotosíntesis, capturan dióxido de carbono.
- Un árbol adulto absorbe unos 22 kg de CO2 al año.
- El carbono se almacena en la madera, raíces y suelo.

Producen Oxígeno:
- Un árbol grande produce oxígeno para 4 personas.
- Un bosque de una hectárea produce oxígeno para 40 personas.

Filtran Contaminantes:
- Sus hojas atrapan partículas de polvo y hollín.
- Absorben gases contaminantes como ozono y dióxido de nitrógeno.
- Un árbol urbano puede filtrar 1.4 kg de contaminantes al año.

Regulan la Temperatura:
- La sombra puede reducir la temperatura 5-10°C.
- La evaporación del agua de las hojas enfría el aire.
- Reducen el "efecto isla de calor" en ciudades.

Otros Beneficios:

Para el Agua:
- Filtran el agua de lluvia antes de que llegue a ríos.
- Previenen erosión e inundaciones.
- Mantienen los acuíferos llenos.

Para la Biodiversidad:
- Hogar de millones de especies.
- Conectan ecosistemas.
- Proveen alimento a muchos animales.

Para los Humanos:
- Reducen el estrés y mejoran la salud mental.
- Producen frutas, nueces, medicinas.
- Embellecen ciudades y pueblos.

Los Bosques más Importantes:
- Amazonas: el pulmón más grande del planeta.
- Bosques boreales: almacenan más carbono que los tropicales.
- Manglares: protegen costas y son cuna de peces.

Problema Actual:
- Se pierden 10 millones de hectáreas de bosque al año.
- Equivale a 27 campos de fútbol por minuto.
- La deforestación causa el 10% de las emisiones de CO2.

Solución:
- Proteger bosques existentes.
- Plantar nuevos árboles.
- Restaurar bosques degradados.
- Consumir productos de bosques sostenibles.

Un mundo sin árboles es un mundo sin futuro.`
        }
      ]
    },
    {
      month: "Septiembre",
      theme: "Reciclaje y Residuos",
      emoji: "♻️",
      icon: Leaf,
      color: "lime",
      topics: [
        { 
          title: "Las 3R: Reducir, Reutilizar, Reciclar", 
          description: "La regla de oro del cuidado ambiental", 
          emoji: "🔄",
          fullContent: `Las 3R: Reducir, Reutilizar, Reciclar

Las 3R son la guía básica para manejar nuestros residuos de forma responsable. ¡El orden importa!

1. REDUCIR (La más importante)

¿Qué significa?
- Consumir menos, generar menos basura.
- Evitar lo que no necesitamos.
- Elegir productos con menos empaque.

Ejemplos:
- Comprar solo lo necesario.
- Evitar productos de un solo uso.
- Usar servilletas de tela en vez de papel.
- Imprimir solo cuando sea necesario.
- Rechazar bolsas plásticas.

2. REUTILIZAR (La segunda mejor opción)

¿Qué significa?
- Darle un nuevo uso a las cosas antes de tirarlas.
- Reparar en lugar de reemplazar.
- Compartir o donar lo que no usas.

Ejemplos:
- Usar frascos de vidrio para guardar cosas.
- Donar ropa y juguetes.
- Reparar aparatos electrónicos.
- Usar el reverso de las hojas de papel.
- Convertir botellas en macetas.

3. RECICLAR (Cuando no hay otra opción)

¿Qué significa?
- Transformar materiales usados en nuevos productos.
- Separar correctamente los residuos.
- Llevar reciclables a centros de acopio.

Materiales Reciclables:
- Papel y cartón.
- Plásticos (según su número).
- Vidrio.
- Metal (latas, aluminio).
- Algunos electrónicos.

Las Nuevas R:
Ahora se habla de más R:
- Rechazar: decir no a lo que no necesitas.
- Reparar: arreglar antes de tirar.
- Regalar: dar lo que ya no usas.
- Recuperar: rescatar materiales útiles.
- Responsabilidad: hacerte cargo de tu impacto.

Impacto de las 3R:
- Menos basura en vertederos.
- Menos contaminación.
- Ahorro de recursos naturales.
- Menos emisiones de CO2.
- Ahorro de dinero.

Recuerda: La mejor basura es la que no se genera.`
        },
        { 
          title: "Separación de Residuos", 
          description: "Cada basura en su contenedor correcto", 
          emoji: "🗑️",
          fullContent: `Separación de Residuos: El Primer Paso para Reciclar

Separar correctamente la basura es fundamental para que los materiales puedan reciclarse.

Tipos de Residuos y Contenedores:

Orgánicos (Verde/Marrón):
- Restos de comida.
- Cáscaras de frutas y verduras.
- Hojas y pasto.
- Pueden convertirse en composta.

Plásticos (Amarillo):
- Botellas de bebidas.
- Envases de productos de limpieza.
- Bolsas plásticas.
- Importante: limpiar antes de reciclar.

Papel y Cartón (Azul):
- Periódicos y revistas.
- Cajas de cartón.
- Cuadernos usados.
- No: papel encerado o con grasa.

Vidrio (Verde):
- Botellas y frascos.
- Separar por colores si es posible.
- No: espejos, focos, cristal de ventanas.

Metales:
- Latas de aluminio y acero.
- Tapas de frascos.
- Papel aluminio limpio.

Residuos No Reciclables (Gris/Negro):
- Papel higiénico usado.
- Pañales.
- Colillas de cigarro.
- Chicles.

Residuos Especiales:

Electrónicos (E-waste):
- Celulares, computadoras, pilas.
- Llevar a puntos de recolección especiales.
- Contienen materiales tóxicos y valiosos.

Peligrosos:
- Pinturas, solventes, aceites.
- Medicamentos vencidos.
- Baterías de auto.
- No tirar a la basura normal.

Consejos para Separar:
- Ten contenedores diferentes en casa.
- Limpia los envases antes de reciclar.
- Aplasta botellas para ahorrar espacio.
- Revisa las reglas de reciclaje de tu localidad.
- Enseña a tu familia a separar.

Errores Comunes:
- Poner reciclables sucios (contamina todo el lote).
- Mezclar tipos de plástico incompatibles.
- Incluir papel encerado o con grasa.
- Olvidar quitar tapas de materiales diferentes.

Separar es fácil cuando se hace costumbre.`
        },
        { 
          title: "Compostaje", 
          description: "Convierte residuos orgánicos en abono", 
          emoji: "🌱",
          fullContent: `Compostaje: Convierte tu Basura en Oro Negro

El compostaje es el proceso natural de descomposición de materia orgánica que produce un abono excelente para las plantas.

¿Qué es el Compost?
- Material oscuro, esponjoso y con olor a tierra.
- Rico en nutrientes para las plantas.
- Mejora la estructura del suelo.
- También se llama "oro negro" por su valor.

¿Qué se puede compostar?

Materiales Verdes (ricos en nitrógeno):
- Restos de frutas y verduras.
- Cáscaras de huevo trituradas.
- Posos de café y bolsas de té.
- Césped recién cortado.
- Residuos de plantas.

Materiales Marrones (ricos en carbono):
- Hojas secas.
- Cartón y papel sin tinta.
- Ramas pequeñas.
- Aserrín de madera natural.
- Paja.

¿Qué NO compostar?
- Carnes y pescados (atraen plagas).
- Lácteos y grasas.
- Plantas enfermas.
- Excrementos de mascotas carnívoras.
- Madera tratada químicamente.

Cómo hacer compost en casa:

1. Elige un lugar:
   - Contenedor o pila en el jardín.
   - Compostera para espacios pequeños.
   - Vermicompostera con lombrices.

2. Arma las capas:
   - Alterna materiales verdes y marrones.
   - Proporción ideal: 3 partes marrones, 1 parte verde.

3. Mantén las condiciones:
   - Humedad: como esponja exprimida.
   - Oxígeno: voltea regularmente.
   - Temperatura: el centro debe calentarse.

4. Espera:
   - En 2-6 meses tendrás compost listo.
   - Sabrás que está listo cuando huela a tierra.

Beneficios del Compostaje:
- Reduce la basura que va al vertedero 30-40%.
- Evita emisiones de metano.
- Produce abono gratuito.
- Mejora la salud del suelo.
- Cierra el ciclo de nutrientes.

Si tienes jardín o macetas, ¡el compostaje es para ti!`
        },
        { 
          title: "Vida sin Plástico", 
          description: "Alternativas para reducir el plástico", 
          emoji: "🛍️",
          fullContent: `Vida sin Plástico: Alternativas para un Futuro Limpio

Reducir el plástico es uno de los cambios más importantes que podemos hacer por el planeta.

El Problema del Plástico:
- Se producen 400 millones de toneladas al año.
- Solo el 9% se recicla.
- Tarda 500 años en degradarse.
- Está en los océanos, en animales, ¡hasta en nosotros!

Alternativas por Área:

En la Cocina:
- Bolsas reutilizables de tela para compras.
- Recipientes de vidrio o acero inoxidable.
- Envoltorios de cera de abeja en vez de plástico.
- Botellas y termos reutilizables.
- Popotes de bambú, metal o papel.

En el Baño:
- Cepillo de dientes de bambú.
- Shampoo y jabón en barra.
- Maquinilla de afeitar de metal.
- Hisopos de bambú o lavables.
- Cepillo para el pelo de madera.

En la Limpieza:
- Detergentes a granel o en pastillas.
- Esponjas de fibra natural.
- Trapos de tela en vez de toallas de papel.
- Productos caseros con vinagre y bicarbonato.

Para Niños:
- Juguetes de madera o segunda mano.
- Loncheras y contenedores reutilizables.
- Pañales de tela (si es posible).

Para Compras:
- Llevar tus propias bolsas siempre.
- Comprar a granel con tus recipientes.
- Elegir productos con menos empaque.
- Preferir envases de vidrio o cartón.

Pasos para Empezar:

Semana 1: Deja las bolsas plásticas.
Semana 2: Usa botella reutilizable.
Semana 3: Lleva tu propio recipiente para sobras.
Semana 4: Prueba productos de higiene sin plástico.

No se trata de ser perfectos:
- Cada pequeño cambio suma.
- Es mejor que millones hagamos algo imperfecto que nadie haga nada.
- Celebra tus logros y no te castigues por los errores.

Recuerda: El mejor residuo es el que no se genera.`
        }
      ]
    },
    {
      month: "Octubre",
      theme: "Animales y Naturaleza en Otoño",
      emoji: "🍂",
      icon: Leaf,
      color: "amber",
      topics: [
        { 
          title: "Migración de Aves", 
          description: "El increíble viaje de las aves en otoño", 
          emoji: "🦅",
          fullContent: `Migración de Aves: Un Viaje Asombroso

Cada otoño, miles de millones de aves emprenden uno de los viajes más increíbles de la naturaleza: la migración.

¿Qué es la Migración?
- Es el desplazamiento estacional de animales de un lugar a otro.
- Las aves viajan buscando climas más cálidos y comida.
- Regresan en primavera a sus zonas de reproducción.

¿Por qué migran?
- Escapar del frío invernal.
- Buscar alimento (insectos y plantas desaparecen en invierno).
- Encontrar mejores lugares para anidar.

Récords de Migración:

Charrán Ártico:
- El viaje más largo: 70,000 km al año.
- Viaja del Ártico a la Antártida y regresa.
- Ve más luz solar que cualquier otro animal.

Ganso Cabeza Barrada:
- Vuela sobre el Himalaya a 8,000 metros de altura.
- Casi sin oxígeno, atraviesa la montaña más alta.

Colibrí Garganta Rubí:
- Cruza el Golfo de México sin parar: 800 km.
- Pesa solo 3 gramos, menos que una moneda.

¿Cómo encuentran el camino?

Navegación Increíble:
- Usan el sol, las estrellas y el campo magnético de la Tierra.
- Reconocen paisajes y costas.
- Algunas siguen olores.
- Los jóvenes aprenden de los adultos.

Formación en V:
- Ahorran energía volando en formación.
- El líder rompe el viento para los demás.
- Se turnan para descansar.

Peligros en el Camino:
- Edificios con ventanas de vidrio.
- Cambio climático alterando rutas y tiempos.
- Pérdida de hábitats de descanso.
- Cazadores.

¿Cómo Ayudar?
- Poner calcomanías en ventanas para que las aves las vean.
- Apagar luces de edificios durante la migración.
- Preservar humedales y bosques (áreas de descanso).
- Plantar árboles nativos.

La migración es un espectáculo natural que debemos proteger.`
        },
        { 
          title: "Hibernación", 
          description: "Animales que duermen todo el invierno", 
          emoji: "🐻",
          fullContent: `Hibernación: El Largo Sueño del Invierno

Algunos animales tienen una estrategia increíble para sobrevivir el invierno: dormir durante meses. Esto se llama hibernación.

¿Qué es la Hibernación?
- Un estado de letargo profundo para ahorrar energía.
- El cuerpo reduce drásticamente sus funciones.
- El animal no come, bebe ni se mueve durante meses.

Cambios en el Cuerpo:

Temperatura:
- Baja casi al nivel del ambiente.
- Marmotas: de 37°C a 3°C.
- Murciélagos pueden llegar a -5°C sin congelarse.

Ritmo Cardíaco:
- Se reduce muchísimo.
- Ardillas: de 200 a 5 latidos por minuto.
- Osos: de 55 a 9 latidos por minuto.

Respiración:
- Muy lenta, a veces parece que no respiran.
- Algunas tortugas respiran por la piel.

Animales que Hibernan:

Verdaderos Hibernadores:
- Marmotas
- Lirones
- Murciélagos
- Ardillas de tierra
- Algunos hámsters

Hibernadores Ligeros:
- Osos (pueden despertar si hay peligro)
- Mapaches
- Zorrillos

Animales de Sangre Fría:
- Tortugas
- Serpientes
- Ranas (algunas se congelan y reviven en primavera)

Preparación para la Hibernación:
- Comen mucho en otoño para acumular grasa.
- Un oso puede ganar 20 kg por semana.
- Buscan refugios seguros: cuevas, madrigueras, troncos.
- La grasa les dará energía durante todo el invierno.

Curiosidades:
- Las osas dan a luz durante la hibernación.
- Los cachorros nacen pequeños y crecen con la leche de mamá dormida.
- Algunas ardillas se despiertan cada semana para ir al "baño".
- Los animales que hibernan viven más años.

La hibernación es una maravilla de adaptación a la naturaleza.`
        },
        { 
          title: "Hojas Cambiantes", 
          description: "Por qué las hojas cambian de color", 
          emoji: "🍁",
          fullContent: `Las Hojas Cambiantes: La Ciencia del Otoño

El otoño nos regala un espectáculo de colores cuando las hojas cambian de verde a amarillo, naranja y rojo. ¿Por qué sucede esto?

El Color Verde en Verano:
- Las hojas son verdes por la clorofila.
- La clorofila captura la luz del sol para la fotosíntesis.
- En primavera y verano, la clorofila se produce constantemente.
- El verde oculta otros colores que están en la hoja.

¿Por qué cambian en Otoño?

Los Días se Acortan:
- Menos luz solar significa menos fotosíntesis.
- El árbol deja de producir clorofila.
- El verde desaparece gradualmente.

Se Revelan Otros Pigmentos:

Carotenoides (Amarillo y Naranja):
- Estaban ahí todo el tiempo, ocultos por la clorofila.
- Son los mismos pigmentos de las zanahorias.
- Ejemplos: arces, abedules, álamos.

Antocianinas (Rojo y Púrpura):
- Se producen en otoño, no estaban ocultas.
- Necesitan noches frías y días soleados.
- Ejemplos: arces rojos, zumaque, cornejos.

El Proceso de Caída:

1. El árbol forma una capa de corcho entre la rama y la hoja.
2. Esto bloquea el flujo de agua y nutrientes.
3. La hoja muere y cae.
4. El árbol queda "sellado" para el invierno.

¿Por qué los Árboles Pierden Hojas?
- Conservar agua durante el invierno seco.
- Evitar daños por peso de nieve.
- Las hojas grandes se congelarían.
- Deshacerse de desechos acumulados.

Árboles Siempre Verdes:
- Coníferas como pinos y abetos no pierden hojas.
- Sus agujas tienen una capa de cera protectora.
- Pierden agujas gradualmente, no todas a la vez.

Mejores Lugares para Ver el Cambio:
- Nueva Inglaterra (Estados Unidos)
- Canadá
- Japón
- Europa Central

Los colores del otoño son la despedida del árbol antes del descanso invernal.`
        },
        { 
          title: "Preparándose para el Frío", 
          description: "Cómo la naturaleza se prepara para el invierno", 
          emoji: "🌰",
          fullContent: `Preparándose para el Frío: Estrategias de Supervivencia

El otoño es una época de preparación intensa. Plantas y animales tienen estrategias increíbles para sobrevivir el invierno.

Estrategias de los Animales:

Almacenar Comida:
- Ardillas esconden hasta 10,000 nueces por temporada.
- Solo encuentran el 70%, las olvidadas se convierten en árboles.
- Los carboneros almacenan semillas en grietas de corteza.

Engordar:
- Osos aumentan 20 kg por semana antes de hibernar.
- Las ballenas comen intensamente antes de migrar.
- La grasa aísla y da energía.

Cambiar de Pelaje:
- El pelaje de invierno es más grueso y denso.
- Liebres árticas cambian de marrón a blanco.
- Zorros árticos desarrollan pelaje en las patas.

Hacer Guaridas:
- Ratones y topos preparan nidos con materiales aislantes.
- Castores refuerzan sus represas y almacenan comida.

Estrategias de las Plantas:

Árboles Deciduos:
- Pierden hojas para conservar agua.
- Almacenan nutrientes en raíces y tronco.
- Producen sustancias anticongelantes en la savia.

Plantas Perennes:
- Mueren por encima pero las raíces sobreviven.
- Almacenan energía bajo tierra.
- Brotarán de nuevo en primavera.

Semillas:
- Muchas plantas mueren dejando semillas resistentes.
- Las semillas pueden soportar temperaturas extremas.
- Germinarán cuando las condiciones mejoren.

Insectos:
- Algunos migran (mariposas monarca).
- Otros hibernan como adultos, larvas o huevos.
- Las abejas se apiñan y generan calor vibrando.
- Las hormigas van profundo bajo tierra.

Humanos También se Preparan:
- Históricamente almacenábamos alimentos.
- Guardábamos leña y preparábamos ropa.
- Sellábamos casas contra el frío.

Señales del Otoño:
- Días más cortos.
- Temperaturas más bajas.
- Cambio de color en hojas.
- Migración de aves.

El otoño nos enseña sobre preparación, adaptación y los ciclos de la naturaleza.`
        }
      ]
    },
    {
      month: "Noviembre",
      theme: "Consumo Responsable",
      emoji: "🛒",
      icon: Leaf,
      color: "teal",
      topics: [
        { 
          title: "Compras Conscientes", 
          description: "Eligiendo productos que cuidan el planeta", 
          emoji: "🏷️",
          fullContent: `Compras Conscientes: Elige con el Planeta en Mente

Cada vez que compramos algo, estamos votando por el tipo de mundo que queremos. Las compras conscientes son una forma poderosa de crear cambio.

¿Qué son las Compras Conscientes?
- Pensar antes de comprar: ¿realmente lo necesito?
- Considerar el impacto ambiental del producto.
- Elegir opciones más sostenibles.
- Apoyar a empresas responsables.

Preguntas Antes de Comprar:

1. ¿Lo necesito realmente?
   - ¿O es un impulso?
   - ¿Tengo algo similar?
   - ¿Lo usaré frecuentemente?

2. ¿De qué está hecho?
   - ¿Materiales naturales o sintéticos?
   - ¿Es reciclable al final de su vida?
   - ¿Contiene tóxicos?

3. ¿Cómo se hizo?
   - ¿En condiciones laborales justas?
   - ¿Con respeto al medio ambiente?
   - ¿Cerca o lejos de aquí?

4. ¿Cuánto durará?
   - ¿Es desechable o duradero?
   - ¿Se puede reparar?
   - ¿La empresa ofrece refacciones?

Sellos y Certificaciones:
- Orgánico: sin pesticidas ni fertilizantes químicos.
- Comercio Justo: productores reciben precio justo.
- FSC: madera de bosques sostenibles.
- Energy Star: eficiencia energética.
- Libre de Crueldad: no probado en animales.

Dónde Comprar:
- Mercados locales: productos frescos, menos transporte.
- Tiendas de segunda mano: reutilizar es mejor que nuevo.
- Cooperativas: apoyan productores locales.
- Empresas B: comprometidas con impacto positivo.

Evitar:
- Compras impulsivas.
- Productos con mucho empaque.
- Artículos de un solo uso.
- Marcas con malas prácticas ambientales o laborales.

Recuerda:
"No necesitamos que un puñado de personas practiquen el consumo consciente perfectamente, sino que millones lo hagan imperfectamente."

Cada compra es una oportunidad de hacer el bien.`
        },
        { 
          title: "Huella de Carbono", 
          description: "El impacto de nuestras decisiones diarias", 
          emoji: "👣",
          fullContent: `Huella de Carbono: Midiendo Nuestro Impacto

La huella de carbono es la cantidad de gases de efecto invernadero que generamos con nuestras actividades diarias.

¿Qué es el Carbono?
- Cuando hablamos de huella de carbono, nos referimos al CO2 y otros gases.
- Estos gases atrapan el calor y causan el cambio climático.
- Se mide en toneladas de CO2 equivalente.

Promedio por Persona:
- Mundial: 4 toneladas de CO2 al año.
- Estados Unidos: 16 toneladas.
- Europa: 6-8 toneladas.
- Para frenar el cambio climático, deberíamos estar en 2 toneladas.

Fuentes de tu Huella de Carbono:

Transporte (29%):
- Un vuelo de ida y vuelta a Europa: 2 toneladas.
- Un auto promedio: 4.6 toneladas al año.
- Bicicleta o caminar: casi 0.

Alimentación (26%):
- Carne de res es lo que más contamina.
- 1 kg de carne = 60 kg de CO2.
- 1 kg de legumbres = 1 kg de CO2.

Hogar (21%):
- Calefacción y aire acondicionado.
- Electricidad.
- Electrodomésticos.

Productos y Servicios (24%):
- Ropa, electrónicos, muebles.
- Empaques y envíos.

Cómo Reducir tu Huella:

Alto Impacto:
- Volar menos: un vuelo menos al año ahorra 1.6 toneladas.
- Comer menos carne: una dieta vegetariana ahorra 0.8 toneladas.
- Usar transporte público o bicicleta.

Impacto Medio:
- Comprar energía renovable.
- Mejorar aislamiento del hogar.
- Comprar menos ropa nueva.

Impacto Diario:
- Apagar luces y aparatos.
- Reducir, reutilizar, reciclar.
- Comprar local.

Calculadoras de Huella:
- Hay herramientas en línea para calcular tu huella.
- Te ayudan a ver dónde puedes mejorar.
- Es un buen primer paso.

Compensación de Carbono:
- Después de reducir, puedes compensar lo que queda.
- Apoyando proyectos de reforestación o energía limpia.
- No es sustituto de reducir, pero ayuda.

Conocer tu huella es el primer paso para reducirla.`
        },
        { 
          title: "Comercio Justo", 
          description: "Productos que benefician a las comunidades", 
          emoji: "🤝",
          fullContent: `Comercio Justo: Justicia en Cada Compra

El comercio justo es un movimiento que busca mejores condiciones para productores en países en desarrollo.

El Problema del Comercio Convencional:
- Intermediarios se quedan con la mayor parte del dinero.
- Los productores apenas ganan para vivir.
- Condiciones de trabajo injustas o peligrosas.
- Trabajo infantil en algunos casos.
- Daño ambiental por presión de precios bajos.

¿Qué es el Comercio Justo?

Principios Fundamentales:
- Precio justo garantizado para productores.
- Relaciones comerciales estables y a largo plazo.
- Condiciones de trabajo dignas.
- Prohibición del trabajo infantil.
- Igualdad de género.
- Respeto al medio ambiente.

Prima de Comercio Justo:
- Dinero extra que va a la comunidad.
- Se invierte en escuelas, hospitales, pozos de agua.
- La comunidad decide cómo usarlo.

Productos de Comercio Justo:
- Café: el más conocido, de países como Colombia, Etiopía.
- Chocolate: del cacao de Ghana, Costa de Marfil.
- Té: de India, Sri Lanka.
- Bananas: de Ecuador, Perú.
- Artesanías: textiles, cerámica, joyería.
- Flores: de Kenia, Ecuador.
- Algodón: para ropa y telas.

Sellos a Buscar:
- Fairtrade International (el más conocido).
- World Fair Trade Organization.
- Fair for Life.

Impacto Real:
- 1.7 millones de agricultores y trabajadores beneficiados.
- 880 millones de dólares en primas comunitarias.
- Mejores escuelas y atención médica.
- Prácticas agrícolas más sostenibles.

Críticas y Limitaciones:
- Productos suelen costar un poco más.
- No todos los productores pueden certificarse.
- El sistema no es perfecto.

Pero el comercio justo es mucho mejor que el convencional.

Cómo Participar:
- Busca el sello en productos.
- Pregunta en tiendas por opciones de comercio justo.
- Comparte información con familia y amigos.
- Apoya tiendas especializadas.

Cada compra justa mejora la vida de alguien.`
        },
        { 
          title: "Black Friday Verde", 
          description: "Alternativas sostenibles al consumismo", 
          emoji: "💚",
          fullContent: `Black Friday Verde: Alternativas al Consumismo

El Black Friday se ha convertido en un día de compras masivas. Pero hay formas de participar sin dañar el planeta.

El Problema del Black Friday:

Consumo Excesivo:
- Compramos cosas que no necesitamos.
- Muchos productos terminan sin usar o en la basura.
- Generamos toneladas de residuos de empaques.

Impacto Ambiental:
- Transporte de millones de paquetes.
- Producción acelerada en fábricas.
- Más emisiones de CO2.

Estrés y Deuda:
- Compras impulsivas llevan a gastar de más.
- Peleas en tiendas por ofertas.

Alternativas Verdes:

No Compres Nada (Buy Nothing Day):
- Movimiento nacido en Canadá en 1992.
- Un día para reflexionar sobre el consumismo.
- Hacer otras actividades: pasear, leer, estar en familia.

Compra Local:
- Apoya negocios de tu comunidad.
- Menos transporte, más conexión personal.
- El dinero se queda en tu localidad.

Compra Experiencias:
- Regala clases, conciertos, viajes.
- Las experiencias nos hacen más felices que las cosas.
- No generan basura.

Compra Segunda Mano:
- Tiendas de segunda mano, apps, mercaditos.
- Productos únicos a buenos precios.
- Extiendes la vida útil de las cosas.

Haz Regalos:
- Algo hecho por ti tiene más valor.
- Galletas, mermeladas, bufandas tejidas.
- Arte, álbumes de fotos, cartas.

Dona:
- En lugar de comprar, dona a una causa.
- Muchas organizaciones necesitan apoyo.
- Regala una donación a nombre de alguien.

Si Decides Comprar:
- Haz una lista y cíñete a ella.
- Compra solo lo que realmente necesitas.
- Elige productos duraderos y de calidad.
- Busca marcas sostenibles.
- Evita el fast fashion.

Reflexión:
"La Tierra provee suficiente para satisfacer las necesidades de todos, pero no la avaricia de todos." - Mahatma Gandhi

Este Black Friday, elige conscientemente.`
        }
      ]
    },
    {
      month: "Diciembre",
      theme: "Navidad Sostenible",
      emoji: "🎄",
      icon: TreePine,
      color: "red",
      topics: [
        { 
          title: "Regalos Ecológicos", 
          description: "Ideas para regalar sin dañar el planeta", 
          emoji: "🎁",
          fullContent: `Regalos Ecológicos: El Arte de Dar con Conciencia

Los regalos navideños pueden ser una fuente de alegría sin generar montañas de basura. ¡Aquí tienes ideas!

Regala Experiencias:
- Clases de cocina, arte, música o baile.
- Entradas para conciertos, teatro, cine.
- Membresías de museos o parques.
- Viajes y escapadas.
- Días de spa o bienestar.
- Aventuras: escalada, kayak, paracaidismo.

Regala Tiempo:
- Cupones para cenas caseras hechas por ti.
- Tardes de cuidado de niños.
- Ayuda con proyectos del hogar.
- Sesiones de enseñanza de algo que sabes.
- Caminatas o excursiones juntos.

Regalos Hechos a Mano:
- Galletas, mermeladas, salsas.
- Bufandas, gorros tejidos.
- Álbumes de fotos personalizados.
- Velas de cera de soja.
- Jabones artesanales.
- Arte: pinturas, dibujos, poesía.

Regalos Sostenibles:
- Productos de comercio justo.
- Artículos reutilizables (botellas, bolsas).
- Plantas y semillas.
- Productos de belleza naturales.
- Ropa de marcas éticas.
- Libros (mejor de segunda mano).

Adopciones Simbólicas:
- Adoptar un animal en un zoológico o reserva.
- Apadrinar un árbol.
- Donar a nombre de alguien a una ONG.
- Regalar paneles solares a comunidades.

Regalos de Segunda Mano:
- Vintage está de moda.
- Libros usados son igual de buenos.
- Juguetes en buen estado.
- Ropa vintage única.

Envoltorios Ecológicos:
- Papel periódico o de revista.
- Tela furoshiki japonés (reutilizable).
- Bolsas de tela.
- Cajas reutilizadas decoradas.
- Sin envoltura: el regalo es visible.

Evita:
- Plásticos de un solo uso.
- Productos con mucho empaque.
- Cosas que sabes que no usarán.
- Regalos obligatorios sin sentido.

El mejor regalo es el que se da con amor y pensamiento, no con dinero.`
        },
        { 
          title: "Decoraciones Naturales", 
          description: "Adornos hechos con materiales reciclados", 
          emoji: "⭐",
          fullContent: `Decoraciones Naturales: Navidad con Creatividad Ecológica

Decorar para las fiestas no requiere comprar cosas nuevas de plástico. ¡La naturaleza y el reciclaje ofrecen opciones hermosas!

Materiales de la Naturaleza:

Piñas de Pino:
- Recógelas en un paseo por el bosque.
- Píntalas con colores navideños.
- Agrégales brillantina o nieve artificial.
- Úsalas como centros de mesa.

Ramas y Ramitas:
- Crea estrellas y coronas.
- Píntalas de dorado o plateado.
- Haz pequeños árboles de Navidad.

Hojas Secas:
- Préndalas para guirnaldas.
- Úsalas para decorar tarjetas.

Naranjas Secas:
- Córtalas en rodajas y sécalas al horno.
- Huelen delicioso y duran semanas.
- Agrégales clavos de olor.

Canela:
- Ramitas de canela atadas con listón.
- Aroma festivo natural.

Materiales Reciclados:

Papel y Cartón:
- Estrellas de origami.
- Copos de nieve recortados.
- Guirnaldas de papel.
- Cajas decoradas como casitas.

Frascos de Vidrio:
- Portavelas con velas flotantes.
- Bolas de nieve caseras.
- Jarrones para flores de temporada.

Tela y Fieltro:
- Calcetines navideños.
- Adornos de fieltro.
- Muñecos de nieve de calcetines viejos.

Tapas de Botellas:
- Muñecos de nieve diminutos.
- Coronas pequeñas.

El Árbol de Navidad:

Opciones Sostenibles:
- Árbol natural de granja sostenible (se replanta otro).
- Árbol en maceta que se puede plantar después.
- Árbol artificial de buena calidad que dures 10+ años.
- Árbol hecho de madera reciclada.
- ¡O creatividad: árbol de libros, escaleras, luces!

Luces:
- LED consumen 90% menos energía.
- Usa temporizador para apagarlas de noche.
- Luces solares para exteriores.

Al Terminar la Temporada:
- Guarda decoraciones para reutilizar.
- Composta lo que sea orgánico.
- Recicla papel y cartón.
- Dona lo que ya no quieras.

La Navidad sostenible es igual de mágica y mucho más significativa.`
        },
        { 
          title: "Cena Sostenible", 
          description: "Comida deliciosa que cuida el ambiente", 
          emoji: "🍽️",
          fullContent: `Cena Sostenible: Fiestas Deliciosas y Responsables

Las cenas navideñas pueden ser deliciosas y al mismo tiempo respetuosas con el planeta.

Planificación Inteligente:

Calcula Bien las Porciones:
- El desperdicio de comida en fiestas es enorme.
- Haz una lista de invitados y calcula cantidades.
- Es mejor que sobre un poco que tirar kilos de comida.

Compra Local y de Temporada:
- Menos transporte, más frescura.
- Apoya a productores locales.
- Frutas y verduras de temporada: calabaza, manzanas, nueces.

Menú Sostenible:

Menos Carne:
- La carne tiene la mayor huella de carbono.
- Considera un plato principal vegetariano.
- O reduce la cantidad de carne y aumenta las guarniciones.

Opciones Vegetarianas Festivas:
- Lasaña de verduras.
- Pastel de nueces y champiñones.
- Risotto de calabaza.
- Curry de verduras con arroz.

Mariscos Sostenibles:
- Busca sellos de pesca responsable.
- Prefiere especies locales y abundantes.
- Evita especies en peligro.

Guarniciones Estrella:
- Puré de papa con ajo asado.
- Verduras asadas con hierbas.
- Ensaladas frescas y coloridas.
- Pan artesanal local.

Postres:
- Frutas de temporada.
- Pasteles caseros.
- Galletas hechas en casa.
- Chocolate de comercio justo.

Durante la Cena:

Vajilla:
- Usa platos y cubiertos reutilizables.
- Si usas desechables, que sean compostables.
- Servilletas de tela.

Decoración de Mesa:
- Velas naturales.
- Flores o plantas.
- Piñas y elementos naturales.

Después de la Cena:

Las Sobras:
- Envía a invitados con sobras en recipientes reutilizables.
- Planea comidas con las sobras.
- Congela lo que no usarás pronto.

Residuos:
- Separa para reciclaje y composta.
- Los huesos van al caldo.
- Las cáscaras al compost.

Una cena sostenible es una celebración de la abundancia de la Tierra.`
        },
        { 
          title: "Propósitos Verdes", 
          description: "Metas ecológicas para el nuevo año", 
          emoji: "🌟",
          fullContent: `Propósitos Verdes: Metas para un Año Más Sostenible

El nuevo año es el momento perfecto para establecer hábitos más ecológicos. ¡Aquí tienes ideas para inspirarte!

Propósitos para Principiantes:

Reduce el Plástico:
- Usa bolsas reutilizables para compras.
- Lleva tu propia botella de agua.
- Di no a los popotes de plástico.

Ahorra Energía:
- Apaga luces al salir de una habitación.
- Desconecta aparatos que no uses.
- Usa focos LED.

Ahorra Agua:
- Duchas más cortas.
- Cierra la llave mientras te enjabonas o cepillas.
- Repara fugas.

Propósitos Intermedios:

Cambia tu Transporte:
- Camina o usa bicicleta para distancias cortas.
- Usa transporte público cuando puedas.
- Comparte auto con compañeros.

Mejora tu Alimentación:
- Come más vegetales y menos carne.
- Compra local y de temporada.
- Reduce el desperdicio de comida.

Consume Menos:
- Antes de comprar, pregunta si lo necesitas.
- Elige calidad sobre cantidad.
- Compra segunda mano cuando sea posible.

Propósitos Avanzados:

Cero Residuos:
- Intenta reducir tu basura progresivamente.
- Composta residuos orgánicos.
- Rechaza lo que no puedas reciclar.

Activismo:
- Únete a un grupo ambiental.
- Participa en limpiezas comunitarias.
- Habla con políticos sobre temas ambientales.

Educa:
- Comparte lo que aprendes con otros.
- Enseña a niños sobre el medio ambiente.
- Usa redes sociales para difundir información.

Cómo Mantener los Propósitos:

Empieza Pequeño:
- No intentes cambiar todo de golpe.
- Un hábito a la vez.
- Celebra pequeños logros.

Hazlo Divertido:
- Involucra a familia y amigos.
- Haz retos y competencias.
- Registra tu progreso.

Sé Amable Contigo:
- No te castigues si fallas.
- Lo importante es la intención y el esfuerzo.
- Mañana es un nuevo día.

Recuerda: No necesitamos unas pocas personas haciendo todo perfectamente, sino millones haciendo lo que puedan.

¡Feliz Año Nuevo Verde! 🌍💚`
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
      blue: { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' },
      pink: { bg: 'from-pink-50 to-rose-50', border: 'border-pink-200', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-700' },
      green: { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-100 text-green-700' },
      emerald: { bg: 'from-emerald-50 to-teal-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
      yellow: { bg: 'from-yellow-50 to-amber-50', border: 'border-yellow-200', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700' },
      orange: { bg: 'from-orange-50 to-amber-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
      cyan: { bg: 'from-cyan-50 to-blue-50', border: 'border-cyan-200', text: 'text-cyan-700', badge: 'bg-cyan-100 text-cyan-700' },
      sky: { bg: 'from-sky-50 to-blue-50', border: 'border-sky-200', text: 'text-sky-700', badge: 'bg-sky-100 text-sky-700' },
      lime: { bg: 'from-lime-50 to-green-50', border: 'border-lime-200', text: 'text-lime-700', badge: 'bg-lime-100 text-lime-700' },
      amber: { bg: 'from-amber-50 to-orange-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700' },
      teal: { bg: 'from-teal-50 to-cyan-50', border: 'border-teal-200', text: 'text-teal-700', badge: 'bg-teal-100 text-teal-700' },
      red: { bg: 'from-red-50 to-pink-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-700' }
    };
    return colors[color] || colors.green;
  };

  const currentMonth = new Date().getMonth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
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
            <h1 className="text-2xl sm:text-4xl font-bold text-indigo-700 mb-2 sm:mb-4 flex items-center justify-center">
              <BookOpen className="w-6 h-6 sm:w-10 sm:h-10 mr-2 sm:mr-3" />
              Contenido Educativo
            </h1>
            <p className="text-sm sm:text-lg text-indigo-600">
              Aprende sobre el medio ambiente mes a mes
            </p>
          </div>

          {/* Modal de Lectura */}
          {selectedTopic && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <Card className="bg-white max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <div className="sticky top-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{selectedTopic.emoji}</span>
                      <h2 className="text-lg sm:text-xl font-bold">{selectedTopic.title}</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => readText(selectedTopic.fullContent)}
                        className="bg-white/20 hover:bg-white/30 text-white border-0"
                      >
                        {isReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        <span className="ml-1 hidden sm:inline">{isReading ? 'Detener' : 'Escuchar'}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={closeTopic}
                        className="text-white hover:bg-white/20"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <ScrollArea className="h-[calc(90vh-80px)]">
                    <div className="p-4 sm:p-6">
                      <div className="prose prose-sm sm:prose max-w-none">
                        {selectedTopic.fullContent.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4 text-gray-700 leading-relaxed whitespace-pre-line">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Mes Actual Destacado */}
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 shadow-xl mb-6 sm:mb-8">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center">
                  <div className="text-3xl sm:text-5xl mr-3 sm:mr-4">{monthlyContent[currentMonth].emoji}</div>
                  <div>
                    <Badge className="bg-white/20 text-white mb-1 sm:mb-2 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      Mes Actual
                    </Badge>
                    <h2 className="text-lg sm:text-2xl font-bold">{monthlyContent[currentMonth].month}</h2>
                    <p className="text-indigo-100 text-sm">{monthlyContent[currentMonth].theme}</p>
                  </div>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                  onClick={() => setExpandedMonth(currentMonth)}
                >
                  Ver Contenido
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Calendario de Contenidos */}
          <div className="space-y-4">
            {monthlyContent.map((content, index) => {
              const colorClasses = getColorClasses(content.color);
              const isExpanded = expandedMonth === index;
              
              return (
                <Card 
                  key={content.month}
                  className={`bg-white/90 backdrop-blur-sm border-2 ${colorClasses.border} shadow-lg transition-all duration-300`}
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedMonth(isExpanded ? null : index)}
                      className={`w-full p-4 flex items-center justify-between hover:bg-gradient-to-r ${colorClasses.bg} transition-all duration-300 rounded-t-lg`}
                    >
                      <div className="flex items-center">
                        <div className="text-3xl mr-4">{content.emoji}</div>
                        <div className="text-left">
                          <h3 className={`font-bold ${colorClasses.text}`}>{content.month}</h3>
                          <p className="text-sm text-gray-600">{content.theme}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={colorClasses.badge}>
                          {content.topics.length} temas
                        </Badge>
                        {isExpanded ? (
                          <ChevronUp className={`w-5 h-5 ${colorClasses.text}`} />
                        ) : (
                          <ChevronDown className={`w-5 h-5 ${colorClasses.text}`} />
                        )}
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className={`p-4 bg-gradient-to-b ${colorClasses.bg} border-t ${colorClasses.border}`}>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {content.topics.map((topic, topicIndex) => (
                            <div 
                              key={topicIndex}
                              className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                              onClick={() => setSelectedTopic(topic)}
                            >
                              <div className="flex items-start">
                                <div className="text-2xl mr-3">{topic.emoji}</div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-800">{topic.title}</h4>
                                  <p className="text-sm text-gray-600 mb-2">{topic.description}</p>
                                  <div className="flex gap-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="text-xs"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedTopic(topic);
                                      }}
                                    >
                                      <BookOpen className="w-3 h-3 mr-1" />
                                      Leer
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="text-xs"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedTopic(topic);
                                        setTimeout(() => readText(topic.fullContent), 100);
                                      }}
                                    >
                                      <Volume2 className="w-3 h-3 mr-1" />
                                      Escuchar
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link to="/">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg">
                ¡Seguir Explorando!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalContent;
