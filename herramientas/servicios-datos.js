// =========================================================
// CONTENIDO DE LAS PÁGINAS DE SERVICIO
// Edita los textos aquí y luego ejecuta:
//   node herramientas/generar-servicios.js
// Se regeneran todas las páginas dentro de /servicios
// =========================================================

module.exports = [
  {
    slug: 'control-de-termitas',
    nombre: 'Termitas y plagas de la madera',
    titulo: 'Control de Termitas',
    icono: 'wood',
    imagen: 'termitas-madera.jpg',
    imagenAlt: 'Técnico aplicando tratamiento contra termitas en una estructura de madera',
    descripcionMeta: 'Tratamiento profesional contra termitas en Manzanillo. Eliminamos y prevenimos la infestación en estructuras, muebles y viviendas.',
    intro: 'Tratamiento profesional para eliminar y prevenir la infestación de termitas en estructuras, muebles y viviendas.',
    wa: 'Hola DAYPED, quiero solicitar un tratamiento contra termitas',
    pasos: [
      'Revisamos muros, marcos, muebles y cimientos para ubicar las colonias y medir el daño.',
      'Aplicamos el método adecuado para tu caso: inyección a la madera, barrera al suelo o cebos.',
      'Volvemos a revisar las zonas tratadas para confirmar que la actividad se detuvo.',
      'Te damos recomendaciones para proteger la madera y evitar nuevas colonias.'
    ],
    senales: [
      'Polvillo parecido al aserrín cerca de muebles, puertas o marcos.',
      'Madera que suena hueca o se deshace al presionarla.',
      'Pequeños túneles de tierra en muros, columnas o cimientos.',
      'Alas desprendidas cerca de ventanas y lámparas.'
    ],
    incluye: [
      'Inspección de la vivienda o instalación',
      'Identificación del tipo de termita',
      'Tratamiento en madera y puntos de entrada',
      'Revisión de seguimiento',
      'Recomendaciones preventivas por escrito'
    ],
    ideal: ['Casas', 'Departamentos', 'Hoteles', 'Mueblerías', 'Bodegas con tarimas'],
    faq: [
      { q: '¿Cuánto tiempo tarda el tratamiento?', a: 'Depende del tamaño del lugar y del nivel de infestación. En la inspección te damos el tiempo estimado y el plan de trabajo.' },
      { q: '¿Tengo que salir de mi casa?', a: 'En la mayoría de los casos no es necesario desalojar toda la vivienda. Te indicamos qué áreas evitar y por cuánto tiempo según el producto aplicado.' },
      { q: '¿Las termitas pueden regresar?', a: 'Sí, si las condiciones se mantienen (humedad, madera en contacto con el suelo). Por eso incluimos seguimiento y recomendaciones de prevención.' }
    ],
    otros: ['fumigacion-residencial-comercial', 'exclusion-y-prevencion', 'mantenimiento-preventivo']
  },
  {
    slug: 'fumigacion-residencial-comercial',
    nombre: 'Fumigación residencial y comercial',
    titulo: 'Fumigación Residencial y Comercial',
    icono: 'spray',
    imagen: 'fumigacion-residencial-comercial.jpg',
    imagenAlt: 'Técnico fumigando el interior de una vivienda',
    descripcionMeta: 'Fumigación de casas y negocios en Manzanillo contra cucarachas, hormigas y plagas rastreras. Cotiza por WhatsApp.',
    intro: 'Eliminamos cucarachas, hormigas, pulgas y otras plagas rastreras en casas, departamentos y negocios.',
    wa: 'Hola DAYPED, quiero cotizar una fumigación',
    pasos: [
      'Identificamos la plaga, los puntos de anidación y por dónde está entrando.',
      'Aplicamos gel, aspersión o polvos según la plaga y el tipo de espacio.',
      'Revisamos el resultado y reforzamos las zonas donde siga habiendo actividad.',
      'Te explicamos cómo mantener tu espacio libre de plagas entre servicios.'
    ],
    senales: [
      'Cucarachas visibles de día (señal de una población grande).',
      'Excremento en forma de puntitos negros en cajones y alacenas.',
      'Filas de hormigas hacia cocina o basura.',
      'Olor desagradable en zonas cerradas o húmedas.'
    ],
    incluye: [
      'Inspección del lugar',
      'Aplicación en interiores y exteriores',
      'Tratamiento de coladeras y zonas húmedas',
      'Indicaciones de reingreso seguro',
      'Recomendaciones de limpieza y prevención'
    ],
    ideal: ['Casas', 'Departamentos', 'Restaurantes', 'Oficinas', 'Comercios'],
    faq: [
      { q: '¿Es seguro para niños y mascotas?', a: 'Te indicamos las precauciones y el tiempo de espera antes de volver a usar cada área según el producto aplicado.' },
      { q: '¿Cada cuánto debo fumigar?', a: 'Depende del lugar y del riesgo. Para hogares suele bastar un servicio periódico; los negocios de alimentos requieren visitas más frecuentes.' },
      { q: '¿Trabajan fuera de horario para negocios?', a: 'Sí, podemos programar el servicio en el horario que menos afecte tu operación.' }
    ],
    otros: ['control-de-roedores', 'sanitizacion', 'mantenimiento-preventivo']
  },
  {
    slug: 'control-de-mosquitos-y-dengue',
    nombre: 'Control de mosquitos y dengue',
    titulo: 'Control de Mosquitos y Dengue',
    icono: 'drop',
    imagen: 'mosquitos-dengue.jpg',
    imagenAlt: 'Técnicos de DAYPED tomando muestras de agua en una pileta para detectar larvas de mosquito',
    descripcionMeta: 'Control de mosquitos en Manzanillo: buscamos y eliminamos criaderos con muestreo de larvas y termonebulización. Prevención de dengue, zika y chikungunya.',
    intro: 'No solo fumigamos: buscamos dónde nacen los mosquitos. Revisamos y muestreamos el agua estancada, eliminamos criaderos y termonebulizamos para bajar la población adulta.',
    wa: 'Hola DAYPED, quiero cotizar control de mosquitos',
    pasos: [
      'Recorremos el lugar, ubicamos todo lo que junta agua (piletas, tambos, llantas, rejillas, canales) y tomamos muestras para confirmar dónde hay larvas.',
      'Eliminamos o tratamos los criaderos y termonebulizamos patios, jardines e interiores para controlar a los mosquitos adultos.',
      'Volvemos a revisar los puntos tratados para confirmar que ya no hay larvas.',
      'Te dejamos indicaciones para que los criaderos no vuelvan, sobre todo en temporada de lluvias.'
    ],
    senales: [
      'Muchos mosquitos al amanecer o al atardecer.',
      'Agua estancada en tambos, piletas, llantas, cubetas o canaletas.',
      'Casos de dengue en la colonia o entre tus trabajadores.',
      'Terrenos con maleza, cacharros o drenaje pluvial cerca.'
    ],
    incluye: [
      'Recorrido de inspección de criaderos',
      'Muestreo de agua y revisión de larvas',
      'Tratamiento o eliminación de criaderos',
      'Termonebulización en exteriores e interiores',
      'Recomendaciones preventivas por escrito'
    ],
    ideal: ['Casas y fraccionamientos', 'Escuelas', 'Hoteles', 'Patios y predios', 'Bodegas y patios de contenedores'],
    faq: [
      { q: '¿Por qué no basta con fumigar?', a: 'La fumigación elimina a los mosquitos adultos, pero si quedan criaderos, en pocos días nacen nuevos. Por eso revisamos y tratamos el agua donde ponen sus huevos.' },
      { q: '¿Cuándo conviene hacerlo?', a: 'Antes y durante la temporada de lluvias, que es cuando más se reproducen. En lugares con agua almacenada conviene hacerlo de forma periódica.' },
      { q: '¿Atienden terrenos grandes?', a: 'Sí. Contamos con equipo de termonebulización para predios, patios, áreas verdes y bodegas.' }
    ],
    otros: ['insectos-voladores', 'fumigacion-residencial-comercial', 'mantenimiento-preventivo']
  },
  {
    slug: 'control-de-roedores',
    nombre: 'Control de roedores',
    titulo: 'Control de Roedores',
    icono: 'rat',
    imagen: 'roedores.jpg',
    imagenAlt: 'Técnica colocando una estación de control de roedores en un almacén',
    descripcionMeta: 'Control profesional de ratas y ratones en Manzanillo con estaciones de cebado, trampeo y monitoreo.',
    intro: 'Controlamos ratas y ratones con estaciones de cebado, trampeo y monitoreo para proteger tu espacio y tu mercancía.',
    wa: 'Hola DAYPED, quiero cotizar control de roedores',
    pasos: [
      'Ubicamos madrigueras, rutas de paso y accesos de los roedores.',
      'Instalamos estaciones de cebado seguras y trampas en puntos estratégicos.',
      'Revisamos las estaciones, registramos el consumo y ajustamos la estrategia.',
      'Indicamos qué accesos sellar y cómo evitar que regresen.'
    ],
    senales: [
      'Excremento pequeño y oscuro en rincones o anaqueles.',
      'Empaques, cables o madera roídos.',
      'Manchas de grasa en zócalos y paredes.',
      'Ruidos en techos o muros durante la noche.'
    ],
    incluye: [
      'Inspección y mapa de riesgo',
      'Estaciones de cebado con seguro',
      'Trampas mecánicas o de pegamento',
      'Monitoreo y registro de actividad',
      'Recomendaciones de exclusión'
    ],
    ideal: ['Bodegas', 'Restaurantes', 'Casas', 'Industria alimentaria', 'Patios de maniobra'],
    faq: [
      { q: '¿Las estaciones son seguras?', a: 'Sí, usamos estaciones cerradas con seguro para que solo el roedor tenga acceso al cebo.' },
      { q: '¿En cuánto tiempo se ven resultados?', a: 'Normalmente se nota una disminución en las primeras semanas; el monitoreo nos indica cuándo la actividad está controlada.' },
      { q: '¿Entregan registro de las estaciones?', a: 'Sí, en servicios para empresas entregamos el plano de estaciones y la bitácora de revisiones.' }
    ],
    otros: ['exclusion-y-prevencion', 'industrial-y-logistico', 'inspecciones-y-reportes']
  },
  {
    slug: 'chinches-y-aracnidos',
    nombre: 'Chinches y arácnidos',
    titulo: 'Control de Chinches y Arácnidos',
    icono: 'spider',
    imagen: 'chinches-aracnidos.jpg',
    imagenAlt: 'Técnica inspeccionando un colchón en busca de chinches',
    descripcionMeta: 'Eliminación de chinches de cama, alacranes y arañas en Manzanillo. Inspección de colchones, muebles y habitaciones.',
    intro: 'Eliminamos chinches de cama, alacranes y arañas con inspección detallada de colchones, muebles y habitaciones.',
    wa: 'Hola DAYPED, quiero cotizar control de chinches o arácnidos',
    pasos: [
      'Revisamos colchones, costuras, cabeceras, muebles y grietas para ubicar focos.',
      'Tratamos las zonas afectadas con productos y técnicas para cada plaga.',
      'Hacemos una segunda revisión para eliminar huevecillos o individuos restantes.',
      'Te damos indicaciones de lavado, orden y sellado para evitar reinfestación.'
    ],
    senales: [
      'Piquetes en línea o en grupo al despertar.',
      'Manchitas oscuras o de sangre en sábanas y colchón.',
      'Alacranes o arañas en rincones, closets o calzado.',
      'Telarañas frecuentes en techos y ventanas.'
    ],
    incluye: [
      'Inspección de habitaciones y muebles',
      'Tratamiento de colchones y estructuras',
      'Aplicación en grietas y zócalos',
      'Segunda visita de control',
      'Guía de prevención para el hogar'
    ],
    ideal: ['Casas', 'Hoteles', 'Hostales', 'Rentas vacacionales', 'Dormitorios'],
    faq: [
      { q: '¿Tengo que tirar mi colchón?', a: 'No siempre. Después de la inspección te decimos si el colchón puede tratarse o si conviene reemplazarlo.' },
      { q: '¿Por qué se necesitan dos visitas?', a: 'Los huevecillos de chinche pueden resistir la primera aplicación; la segunda visita elimina las nuevas eclosiones.' },
      { q: '¿Atienden hoteles?', a: 'Sí, trabajamos por habitación o por piso para no detener tu operación.' }
    ],
    otros: ['fumigacion-residencial-comercial', 'sanitizacion', 'mantenimiento-preventivo']
  },
  {
    slug: 'insectos-voladores',
    nombre: 'Monitoreo de insectos voladores',
    titulo: 'Monitoreo de Insectos Voladores',
    icono: 'fly',
    imagen: 'insectos-voladores.jpg',
    imagenAlt: 'Técnico revisando una lámpara atrapainsectos en una cocina industrial',
    descripcionMeta: 'Control y monitoreo de moscas y mosquitos en Manzanillo con lámparas y trampas para áreas de alimentos e industria.',
    intro: 'Controlamos moscas, mosquitos y palomillas con lámparas, trampas y monitoreo en áreas críticas.',
    wa: 'Hola DAYPED, quiero cotizar monitoreo de insectos voladores',
    pasos: [
      'Identificamos especies, zonas de entrada y focos de reproducción.',
      'Instalamos lámparas y trampas en los puntos adecuados y tratamos los focos.',
      'Revisamos las trampas, contamos capturas y cambiamos consumibles.',
      'Recomendamos mallas, cortinas de aire y manejo de residuos.'
    ],
    senales: [
      'Moscas constantes en cocina o área de producción.',
      'Mosquitos en zonas con agua estancada.',
      'Palomillas en almacenes de granos o harinas.',
      'Observaciones en auditorías sanitarias.'
    ],
    incluye: [
      'Diagnóstico de focos',
      'Instalación de lámparas o trampas',
      'Revisión y cambio de consumibles',
      'Registro de capturas',
      'Tratamiento de focos de reproducción'
    ],
    ideal: ['Restaurantes', 'Cocinas industriales', 'Plantas de alimentos', 'Hospitales', 'Almacenes'],
    faq: [
      { q: '¿Las lámparas se compran o se rentan?', a: 'Podemos manejar ambas opciones. Te lo detallamos en la cotización según tu caso.' },
      { q: '¿Cada cuánto se revisan?', a: 'Normalmente en cada visita programada; la frecuencia depende del tipo de instalación.' },
      { q: '¿Sirve para auditorías?', a: 'Sí, el registro de capturas forma parte de la evidencia que suelen pedir las auditorías sanitarias.' }
    ],
    otros: ['control-de-mosquitos-y-dengue', 'sanitizacion', 'mantenimiento-preventivo']
  },
  {
    slug: 'sanitizacion',
    nombre: 'Sanitización de espacios',
    titulo: 'Sanitización de Espacios',
    icono: 'sparkles',
    imagen: 'sanitizacion.jpg',
    imagenAlt: 'Técnico sanitizando un comedor con equipo de aspersión',
    descripcionMeta: 'Sanitización y desinfección de oficinas, comedores y áreas comunes en Manzanillo.',
    intro: 'Desinfectamos oficinas, comedores, áreas comunes y vehículos para reducir virus, bacterias y hongos.',
    wa: 'Hola DAYPED, quiero cotizar una sanitización',
    pasos: [
      'Revisamos el espacio, las superficies de mayor contacto y el uso del lugar.',
      'Aplicamos desinfectante por aspersión o nebulización con equipo profesional.',
      'Respetamos el tiempo de acción y ventilación antes del reingreso.',
      'Te sugerimos la frecuencia ideal según el flujo de personas.'
    ],
    senales: [
      'Casos de enfermedad entre empleados o usuarios.',
      'Áreas con mucho flujo de personas.',
      'Olores a humedad u hongos.',
      'Reapertura de espacios después de un cierre.'
    ],
    incluye: [
      'Evaluación del espacio',
      'Aplicación por aspersión o nebulización',
      'Atención a superficies de alto contacto',
      'Indicaciones de reingreso',
      'Constancia de servicio'
    ],
    ideal: ['Oficinas', 'Comedores', 'Escuelas', 'Consultorios', 'Vehículos'],
    faq: [
      { q: '¿Cuánto tiempo después puedo usar el espacio?', a: 'Te indicamos el tiempo de espera según el producto; suele ser corto y lo coordinamos para no afectar tu horario.' },
      { q: '¿Es lo mismo que fumigar?', a: 'No. La sanitización elimina microorganismos; la fumigación controla insectos y plagas. Podemos combinar ambos servicios.' },
      { q: '¿Entregan constancia?', a: 'Sí, entregamos constancia del servicio realizado.' }
    ],
    otros: ['fumigacion-residencial-comercial', 'insectos-voladores', 'mantenimiento-preventivo']
  },
  {
    slug: 'exclusion-y-prevencion',
    nombre: 'Exclusión y prevención',
    titulo: 'Exclusión y Prevención de Plagas',
    icono: 'lock',
    imagen: 'exclusion-prevencion.jpg',
    imagenAlt: 'Técnico sellando un acceso en el exterior de un edificio',
    descripcionMeta: 'Sellado de accesos y prevención de plagas en Manzanillo para que roedores e insectos no vuelvan a entrar.',
    intro: 'Sellamos accesos y corregimos puntos débiles para que roedores e insectos no vuelvan a entrar.',
    wa: 'Hola DAYPED, quiero cotizar exclusión y prevención de plagas',
    pasos: [
      'Recorremos el perímetro para detectar huecos, grietas y accesos.',
      'Sellamos con materiales adecuados: malla, sellador, cepillos de puerta y rejillas.',
      'Verificamos que no exista actividad nueva en las zonas selladas.',
      'Te entregamos una lista de mantenimiento para conservar la protección.'
    ],
    senales: [
      'Plagas que regresan después de fumigar.',
      'Huecos alrededor de tuberías y cables.',
      'Puertas con espacio en la parte inferior.',
      'Coladeras y respiraderos sin rejilla.'
    ],
    incluye: [
      'Inspección de perímetro',
      'Sellado de grietas y pasos de tubería',
      'Instalación de mallas y rejillas',
      'Cepillos o barredores de puerta',
      'Reporte de puntos corregidos'
    ],
    ideal: ['Casas', 'Restaurantes', 'Bodegas', 'Oficinas', 'Industria'],
    faq: [
      { q: '¿Por qué no basta con fumigar?', a: 'La fumigación elimina las plagas presentes; la exclusión evita que lleguen nuevas. Juntas dan resultados más duraderos.' },
      { q: '¿Qué materiales usan?', a: 'Selladores, mallas metálicas, rejillas y cepillos de puerta, según el punto a corregir.' },
      { q: '¿Se puede hacer junto con otro servicio?', a: 'Sí, es común combinarlo con control de roedores o fumigación.' }
    ],
    otros: ['control-de-roedores', 'control-de-termitas', 'mantenimiento-preventivo']
  },
  {
    slug: 'inspecciones-y-reportes',
    nombre: 'Inspecciones y reportes técnicos',
    titulo: 'Inspecciones y Reportes Técnicos',
    icono: 'clipboard',
    imagen: 'inspecciones-reportes.jpg',
    imagenAlt: 'Inspección técnica en una instalación industrial',
    descripcionMeta: 'Inspecciones de plagas y reportes técnicos en Manzanillo para auditorías, certificaciones y control interno.',
    intro: 'Hacemos diagnósticos documentados del estado de tus instalaciones para auditorías, certificaciones y control interno.',
    wa: 'Hola DAYPED, quiero cotizar una inspección con reporte técnico',
    pasos: [
      'Recorremos la instalación y evaluamos riesgos, plagas presentes y condiciones.',
      'Documentamos hallazgos con fotografías y ubicación en plano.',
      'Entregamos el reporte con nivel de riesgo y acciones recomendadas.',
      'Programamos revisiones para dar seguimiento a las correcciones.'
    ],
    senales: [
      'Se acerca una auditoría o certificación.',
      'Necesitas evidencia para tu cliente o corporativo.',
      'Cambiaste de proveedor de control de plagas.',
      'Quieres conocer el riesgo real de tu instalación.'
    ],
    incluye: [
      'Recorrido completo de la instalación',
      'Registro fotográfico',
      'Plano de dispositivos y hallazgos',
      'Reporte técnico con recomendaciones',
      'Revisión de seguimiento'
    ],
    ideal: ['Industria', 'Bodegas', 'Plantas de alimentos', 'Hoteles', 'Corporativos'],
    faq: [
      { q: '¿En qué formato entregan el reporte?', a: 'Lo entregamos en digital (PDF) con fotos, plano y recomendaciones.' },
      { q: '¿Sirve para auditorías?', a: 'Está pensado como evidencia para auditorías internas y de clientes. Dinos qué norma o formato te piden y lo adaptamos.' },
      { q: '¿Puedo contratar solo la inspección?', a: 'Sí, la inspección puede contratarse por separado.' }
    ],
    otros: ['industrial-y-logistico', 'mantenimiento-preventivo', 'control-de-roedores']
  },
  {
    slug: 'mantenimiento-preventivo',
    nombre: 'Mantenimiento preventivo',
    titulo: 'Mantenimiento Preventivo',
    icono: 'calendar',
    imagen: 'mantenimiento-preventivo.jpg',
    imagenAlt: 'Revisión preventiva en la cocina de un restaurante',
    descripcionMeta: 'Programas de control de plagas con visitas programadas en Manzanillo para hogares, negocios e industria.',
    intro: 'Visitas programadas para que tu espacio se mantenga protegido todo el año, sin esperar a que aparezca la plaga.',
    wa: 'Hola DAYPED, quiero cotizar un programa de mantenimiento preventivo',
    pasos: [
      'Evaluamos tu espacio y definimos la frecuencia de visitas adecuada.',
      'Aplicamos tratamientos preventivos y revisamos dispositivos en cada visita.',
      'Registramos cada servicio en bitácora para que tengas el historial.',
      'Ajustamos el programa según temporada y resultados.'
    ],
    senales: [
      'Tu negocio maneja alimentos o atiende público.',
      'Las plagas aparecen cada temporada de lluvias.',
      'Necesitas bitácora para inspecciones sanitarias.',
      'Prefieres prevenir antes que corregir.'
    ],
    incluye: [
      'Calendario de visitas',
      'Tratamientos preventivos',
      'Revisión de estaciones y trampas',
      'Bitácora de servicios',
      'Atención a llamados entre visitas'
    ],
    ideal: ['Restaurantes', 'Oficinas', 'Escuelas', 'Hoteles', 'Casas'],
    faq: [
      { q: '¿Cada cuánto son las visitas?', a: 'Depende del giro: puede ser mensual, bimestral o trimestral. Lo definimos después de la evaluación.' },
      { q: '¿Qué pasa si aparece una plaga entre visitas?', a: 'Nos avisas y programamos una visita de atención.' },
      { q: '¿Hay contrato mínimo?', a: 'Te lo detallamos en la cotización según el programa que elijas.' }
    ],
    otros: ['inspecciones-y-reportes', 'fumigacion-residencial-comercial', 'insectos-voladores']
  },
  {
    slug: 'industrial-y-logistico',
    nombre: 'Industrial y logístico',
    titulo: 'Control de Plagas Industrial y Logístico',
    icono: 'factory',
    imagen: 'industrial-logistico.jpg',
    imagenAlt: 'Técnico inspeccionando una bodega industrial',
    descripcionMeta: 'Control de plagas para bodegas, almacenes, patios y operaciones logísticas y portuarias en Manzanillo.',
    intro: 'Programas de control de plagas para bodegas, almacenes, patios de maniobra y operaciones logísticas y portuarias.',
    wa: 'Hola DAYPED, quiero cotizar control de plagas industrial',
    pasos: [
      'Evaluamos la instalación, la mercancía y los puntos críticos de riesgo.',
      'Instalamos y damos servicio a estaciones, trampas y tratamientos por zona.',
      'Llevamos bitácoras, planos de dispositivos y registros de cada visita.',
      'Proponemos mejoras de exclusión, orden y limpieza para reducir riesgos.'
    ],
    senales: [
      'Mercancía dañada o contaminada por plagas.',
      'Requisitos de clientes o auditorías.',
      'Roedores en patios, andenes o almacenes.',
      'Operación con contenedores y carga de distintos orígenes.'
    ],
    incluye: [
      'Diagnóstico de instalación',
      'Programa de control por zonas',
      'Plano de dispositivos',
      'Bitácoras y evidencias técnicas',
      'Visitas programadas'
    ],
    ideal: ['Bodegas', 'Almacenes', 'Patios de contenedores', 'Industria', 'Centros de distribución'],
    faq: [
      { q: '¿Trabajan en turnos nocturnos o fines de semana?', a: 'Sí, programamos las visitas para no afectar la operación.' },
      { q: '¿Qué documentación entregan?', a: 'Bitácoras de servicio, plano de dispositivos y reportes con evidencia fotográfica.' },
      { q: '¿Atienden varias instalaciones?', a: 'Sí, con el paquete DAYPED Integral coordinamos el servicio en varias sedes de la región.' }
    ],
    otros: ['control-de-roedores', 'inspecciones-y-reportes', 'insectos-voladores']
  }
];
