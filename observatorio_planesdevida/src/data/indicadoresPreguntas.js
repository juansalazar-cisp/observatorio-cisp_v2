// Cuestionario de Gestión de Indicadores — Plan de Vida
// 8 indicadores · 40 variables · escala 1-5

// ─── 4 dimensiones (para radar "Perfil por dimensión") ────────────────────────
export const DIMENSIONES = [
  { id: 'juridicos',       label: 'Jurídicos',        color: '#218380', indicadores: [0, 1] },
  { id: 'tecnicos',        label: 'Técnicos',          color: '#3E7F00', indicadores: [2, 3] },
  { id: 'financieros',     label: 'Financieros',       color: '#8F2D56', indicadores: [4, 5] },
  { id: 'socioculturales', label: 'Socio-culturales',  color: '#FF9331', indicadores: [6, 7] },
];

// ─── 8 indicadores (grupos de preguntas con intro) ───────────────────────────
export const INDICADORES = [
  {
    id: 0,
    dimension: 'JURÍDICOS',
    dimColor: '#218380',
    label: 'Formalización jurídica del proceso',
    descripcion:
      'Mide el porcentaje de oficialización y legalización de la propuesta para la construcción y actualización de los planes de vida y el desarrollo de las iniciativas de fortalecimiento o iniciativas de acuerdo.',
    preguntas: [0, 1, 2, 3, 4],
  },
  {
    id: 1,
    dimension: 'JURÍDICOS',
    dimColor: '#218380',
    label: 'Estabilidad jurídica',
    descripcion:
      'Mide el porcentaje de estabilidad jurídica para la construcción y actualización del Plan de Vida. Es entendido como soporte y garantía jurídica para la continuidad de los procesos de planificación y posterior ejecución del Plan de Vida.',
    preguntas: [5, 6, 7, 8, 9],
  },
  {
    id: 2,
    dimension: 'TÉCNICOS',
    dimColor: '#3E7F00',
    label: 'Integralidad de la ejecución',
    descripcion:
      'Mide el porcentaje de cumplimiento, coherencia y coordinación de las acciones proyectadas a desarrollar durante la ejecución del proyecto para la creación o actualización del Plan de Vida.',
    preguntas: [10, 11, 12, 13, 14],
  },
  {
    id: 3,
    dimension: 'TÉCNICOS',
    dimColor: '#3E7F00',
    label: 'Cobertura y gestión',
    descripcion:
      'Mide el alcance, gestión y articulación del Plan de Vida de la organización considerando dimensiones del desarrollo, componentes estratégicos, grupos poblacionales y alcance territorial en torno al direccionamiento de la vida comunitaria.',
    preguntas: [15, 16, 17, 18, 19],
  },
  {
    id: 4,
    dimension: 'FINANCIEROS',
    dimColor: '#8F2D56',
    label: 'Gestión y viabilidad financiera',
    descripcion:
      'Mide el nivel de organización, definición y sostenibilidad de los mecanismos presupuestales y financieros asociados a la implementación, seguimiento y actualización del Plan de Vida, considerando la existencia de proyecciones financieras, asignación de recursos, identificación de fuentes de financiación y capacidades de gestión económica.',
    preguntas: [20, 21, 22, 23, 24],
  },
  {
    id: 5,
    dimension: 'FINANCIEROS',
    dimColor: '#8F2D56',
    label: 'Estructuración presupuestal y financiera',
    descripcion:
      'Mide el nivel de gestión, identificación y viabilidad de recursos financieros requeridos para el desarrollo del proceso de construcción o actualización del Plan de Vida.',
    preguntas: [25, 26, 27, 28, 29],
  },
  {
    id: 6,
    dimension: 'SOCIO_CULTURALES',
    dimColor: '#FF9331',
    label: 'Participación comunitaria y organizacional',
    descripcion:
      'Mide el porcentaje de participación de grupos poblacionales que existen en la comunidad y que, por consiguiente, son relevantes en el proceso de construcción y actualización del Plan de Vida, considerando enfoques diferenciales.',
    preguntas: [30, 31, 32, 33, 34],
  },
  {
    id: 7,
    dimension: 'SOCIO_CULTURALES',
    dimColor: '#FF9331',
    label: 'Incorporación de saberes y prácticas culturales',
    descripcion:
      'Mide la incorporación de saberes tradicionales, prácticas culturales y elementos identitarios propios de la comunidad en el proceso de construcción o actualización del Plan de Vida.',
    preguntas: [35, 36, 37, 38, 39],
  },
];

// ─── 40 preguntas (variables) ─────────────────────────────────────────────────
export const PREGUNTAS = [
  // INDICADOR 1 — Formalización jurídica (Q1-Q5)
  {
    id: 0,
    texto: '¿La organización/asociación/resguardo/comunidad cuenta con certificado de existencia, Registro Único Tributario y representación legal actualizada?',
    opciones: [
      { valor: 5, label: 'Cuenta con todos los documentos legales' },
      { valor: 4, label: 'Los documentos existen pero requieren actualización' },
      { valor: 3, label: 'Existe documentación legal parcial' },
      { valor: 2, label: 'Solo cuenta con certificado de existencia' },
      { valor: 1, label: 'No cuenta con documentos legales actualizados' },
    ],
  },
  {
    id: 1,
    texto: '¿El proceso de construcción u actualización del Plan de Vida cuenta con un acto formal de inicio (acta, resolución, acuerdo u otro documento equivalente)?',
    opciones: [
      { valor: 5, label: 'Existe acto formal claro, válido y verificable' },
      { valor: 4, label: 'Existe acto formal con debilidades (incompleto, difícil de verificar)' },
      { valor: 3, label: 'Existe documento sin validez jurídica clara' },
      { valor: 2, label: 'Existe referencia informal de inicio' },
      { valor: 1, label: 'No existe ningún acto formal' },
    ],
  },
  {
    id: 2,
    texto: '¿El proceso de construcción u actualización del Plan de Vida cuenta con registros documentales con validez jurídica (actas firmadas, documentos verificables)?',
    opciones: [
      { valor: 5, label: 'Registros completos, firmados y verificables' },
      { valor: 4, label: 'Registros mayoritariamente válidos, con algunas falencias' },
      { valor: 3, label: 'Registros con algunos elementos de validez' },
      { valor: 2, label: 'Registros informales sin validez jurídica' },
      { valor: 1, label: 'No existen registros' },
    ],
  },
  {
    id: 3,
    texto: '¿Existen responsables dentro del proceso de actualización u construcción del Plan de Vida formalmente designados mediante actos o documentos?',
    opciones: [
      { valor: 5, label: 'Designación formal clara, completa y verificable' },
      { valor: 4, label: 'Designación formal con algunas debilidades' },
      { valor: 3, label: 'Designación parcial o sin soporte completo' },
      { valor: 2, label: 'Responsables definidos de manera informal' },
      { valor: 1, label: 'No existen responsables definidos' },
    ],
  },
  {
    id: 4,
    texto: '¿Las decisiones tomadas en el proceso de construcción u actualización del Plan de Vida son validadas en la organización mediante registros formales (actas, acuerdos u otros documentos)?',
    opciones: [
      { valor: 5, label: 'Validación formal, rigurosa y verificable' },
      { valor: 4, label: 'Validación formal pero no rigurosa' },
      { valor: 3, label: 'Validación parcial' },
      { valor: 2, label: 'Validación informal (sin registros físicos, digitales o socialización)' },
      { valor: 1, label: 'No se validan formalmente frente a la comunidad' },
    ],
  },
  // INDICADOR 2 — Estabilidad jurídica (Q6-Q10)
  {
    id: 5,
    texto: '¿El proceso de construcción o actualización del Plan de Vida cuenta con actos, acuerdos o soportes jurídicos que garanticen su continuidad en el tiempo?',
    opciones: [
      { valor: 5, label: 'La continuidad está claramente garantizada jurídicamente' },
      { valor: 4, label: 'Existen soportes jurídicos que favorecen continuidad' },
      { valor: 3, label: 'Hay algunos soportes, pero no garantizan continuidad' },
      { valor: 2, label: 'Existen intenciones informales sin respaldo jurídico' },
      { valor: 1, label: 'No existe ningún soporte que garantice continuidad' },
    ],
  },
  {
    id: 6,
    texto: '¿Qué tan probable es que el proceso del Plan de Vida sea desconocido, invalidado o interrumpido por actores internos o externos debido a debilidades jurídicas?',
    opciones: [
      { valor: 5, label: 'Muy baja o nula probabilidad de desconocimiento' },
      { valor: 4, label: 'Baja probabilidad de desconocimiento' },
      { valor: 3, label: 'Probabilidad media de desconocimiento' },
      { valor: 2, label: 'Alta probabilidad de desconocimiento' },
      { valor: 1, label: 'Muy alta probabilidad de desconocimiento' },
    ],
  },
  {
    id: 7,
    texto: '¿Los actos, decisiones y documentos del proceso del Plan de Vida son coherentes entre sí desde el punto de vista jurídico?',
    opciones: [
      { valor: 5, label: 'Total coherencia jurídica entre los actores' },
      { valor: 4, label: 'Coherencia general con mínimos ajustes' },
      { valor: 3, label: 'Algunas inconsistencias' },
      { valor: 2, label: 'Varias inconsistencias jurídicas' },
      { valor: 1, label: 'Hay contradicciones graves entre actos' },
    ],
  },
  {
    id: 8,
    texto: '¿En qué medida el proceso del Plan de Vida depende de personas específicas (autoridades tradicionales) en lugar de estar respaldado por decisiones o estructuras jurídicas y comunitarias?',
    opciones: [
      { valor: 5, label: 'Totalmente institucionalizado, sin dependencia individual' },
      { valor: 4, label: 'Mayormente respaldado por estructura jurídica' },
      { valor: 3, label: 'Dependencia mixta (personas y estructura)' },
      { valor: 2, label: 'Alta dependencia de personas específicas' },
      { valor: 1, label: 'Totalmente dependiente de personas específicas' },
    ],
  },
  {
    id: 9,
    texto: '¿El proceso del Plan de Vida cuenta con respaldo jurídico que lo proteja frente a cambios de autoridades, liderazgos o contextos políticos?',
    opciones: [
      { valor: 5, label: 'Alta protección jurídica frente a cambios' },
      { valor: 4, label: 'Protección adecuada' },
      { valor: 3, label: 'Protección parcial' },
      { valor: 2, label: 'Muy débil protección' },
      { valor: 1, label: 'Ninguna protección frente a cambios' },
    ],
  },
  // INDICADOR 3 — Integralidad de la ejecución (Q11-Q15)
  {
    id: 10,
    texto: '¿En qué medida se han cumplido las actividades planificadas para la creación o actualización del Plan de Vida, de acuerdo con lo programado?',
    opciones: [
      { valor: 5, label: 'Se han ejecutado todas las actividades según lo planificado' },
      { valor: 4, label: 'Se ha ejecutado la mayoría de las actividades' },
      { valor: 3, label: 'Se ha ejecutado parcialmente (alrededor de la mitad)' },
      { valor: 2, label: 'Se ha ejecutado una mínima parte de las actividades' },
      { valor: 1, label: 'No se han ejecutado las actividades planificadas' },
    ],
  },
  {
    id: 11,
    texto: '¿En qué medida las actividades desarrolladas en el proyecto son pertinentes, relevantes o útiles para la construcción o actualización del Plan de Vida de la organización?',
    opciones: [
      { valor: 5, label: 'Las actividades son 100% coherentes con el objetivo del Plan de Vida' },
      { valor: 4, label: 'Las actividades aportan a la construcción y actualización del Plan de Vida' },
      { valor: 3, label: 'Las actividades generan aportes parciales' },
      { valor: 2, label: 'Las actividades son coherentes pero no generan aportes efectivos' },
      { valor: 1, label: 'Las actividades no son coherentes ni pertinentes para el objetivo' },
    ],
  },
  {
    id: 12,
    texto: '¿Las actividades desarrolladas en el proceso de construcción o actualización del Plan de Vida están articuladas entre sí de forma coherente y no fragmentada?',
    opciones: [
      { valor: 5, label: 'Articulación completa y coherente (lógica común, desarrollo estructurado)' },
      { valor: 4, label: 'Buena articulación (mayoría de actividades relacionadas)' },
      { valor: 3, label: 'Articulación parcial (vacíos importantes o desconexiones)' },
      { valor: 2, label: 'Muy baja articulación (relaciones mínimas entre actividades)' },
      { valor: 1, label: 'Totalmente fragmentado (actividades desarrolladas de forma aislada)' },
    ],
  },
  {
    id: 13,
    texto: '¿El proceso de construcción o actualización del Plan de Vida utiliza herramientas metodológicas definidas (guías, talleres, instrumentos participativos, etc.) de manera adecuada?',
    opciones: [
      { valor: 5, label: 'Uso sistemático y robusto de herramientas' },
      { valor: 4, label: 'Uso adecuado en la mayoría de las etapas' },
      { valor: 3, label: 'Uso parcial de herramientas en algunas etapas' },
      { valor: 2, label: 'Uso limitado o informal de herramientas' },
      { valor: 1, label: 'Ausencia total de herramientas metodológicas' },
    ],
  },
  {
    id: 14,
    texto: '¿Las actividades desarrolladas en el proyecto permitieron la construcción o actualización efectiva del Plan de Vida de la organización?',
    opciones: [
      { valor: 5, label: 'Resultado efectivo y completo (construcción o actualización)' },
      { valor: 4, label: 'Resultado adecuado con aspectos a fortalecer' },
      { valor: 3, label: 'Resultado parcial (avances importantes pero incompleto)' },
      { valor: 2, label: 'Resultado limitado (avances mínimos)' },
      { valor: 1, label: 'Sin resultado' },
    ],
  },
  // INDICADOR 4 — Cobertura y gestión (Q16-Q20)
  {
    id: 15,
    texto: '¿En qué medida el Plan de Vida incluye los componentes estratégicos (territorio, cultura, economía, educación, gobernanza)?',
    opciones: [
      { valor: 5, label: 'Se incluyen todos los componentes estratégicos' },
      { valor: 4, label: 'Se incluyen la mayoría de los componentes definidos' },
      { valor: 3, label: 'Se incluyen varios componentes, pero con omisiones relevantes' },
      { valor: 2, label: 'Se identifican componentes de forma muy limitada y fragmentada' },
      { valor: 1, label: 'No se identifican componentes estratégicos' },
    ],
  },
  {
    id: 16,
    texto: '¿Cuántas dimensiones del desarrollo están incorporadas en el Plan de Vida?',
    opciones: [
      { valor: 5, label: 'Se integran todas las dimensiones de forma completa' },
      { valor: 4, label: 'Se identifican varias dimensiones de forma articulada' },
      { valor: 3, label: 'Se identifican dos dimensiones' },
      { valor: 2, label: 'Se identifica una sola dimensión' },
      { valor: 1, label: 'No se identifica ninguna dimensión' },
    ],
  },
  {
    id: 17,
    texto: '¿En qué medida el Plan de Vida contempla los diferentes grupos poblacionales definidos (edad, género, u otros)?',
    opciones: [
      { valor: 5, label: 'Se contemplan todos los grupos definidos de manera diferenciada' },
      { valor: 4, label: 'Se incluyen diversos grupos con cierto nivel de diferenciación' },
      { valor: 3, label: 'Se incluyen algunos grupos, sin diferenciación clara' },
      { valor: 2, label: 'Se menciona un grupo de forma general' },
      { valor: 1, label: 'No se identifican grupos poblacionales' },
    ],
  },
  {
    id: 18,
    texto: '¿El Plan de Vida contempla horizontes temporales diferenciados para sus acciones (corto, mediano y largo plazo)?',
    opciones: [
      { valor: 5, label: 'Se contemplan claramente corto, mediano y largo plazo de forma estructurada' },
      { valor: 4, label: 'Se identifican varios horizontes temporales con alguna organización' },
      { valor: 3, label: 'Se identifican dos horizontes temporales sin mayor diferenciación' },
      { valor: 2, label: 'Se plantea un único horizonte temporal' },
      { valor: 1, label: 'No se identifican horizontes temporales' },
    ],
  },
  {
    id: 19,
    texto: '¿El Plan de Vida cuenta con la identificación de actores claves?',
    opciones: [
      { valor: 5, label: 'Se identifican diversos actores de manera amplia y diferenciada' },
      { valor: 4, label: 'Se identifican varios actores con cierto nivel de diferenciación' },
      { valor: 3, label: 'Se identifican algunos actores sin diferenciación clara' },
      { valor: 2, label: 'Se identifica un actor de forma general' },
      { valor: 1, label: 'No se identifican actores' },
    ],
  },
  // INDICADOR 5 — Gestión y viabilidad financiera (Q21-Q25)
  {
    id: 20,
    texto: '¿Cómo se presenta el presupuesto en relación con las fases del Plan de Vida?',
    opciones: [
      { valor: 5, label: 'El presupuesto está completamente desagregado por fase' },
      { valor: 4, label: 'Se desagrega el presupuesto en la mayoría de las fases' },
      { valor: 3, label: 'Se desagrega el presupuesto en algunas fases' },
      { valor: 2, label: 'El presupuesto se presenta de forma global' },
      { valor: 1, label: 'No se presenta desagregación del presupuesto' },
    ],
  },
  {
    id: 21,
    texto: '¿Cómo están definidos los rubros de gastos dentro del presupuesto del Plan de Vida?',
    opciones: [
      { valor: 5, label: 'Los rubros de gasto están claramente definidos y estructurados' },
      { valor: 4, label: 'Se definen varios rubros de gastos de manera organizada' },
      { valor: 3, label: 'Se definen algunos rubros de gasto' },
      { valor: 2, label: 'Se presentan rubros de forma general' },
      { valor: 1, label: 'No se identifican rubros de gasto' },
    ],
  },
  {
    id: 22,
    texto: '¿En qué medida el presupuesto del Plan de Vida se ajusta y responde a las actividades y acciones definidas en su planificación?',
    opciones: [
      { valor: 5, label: 'El presupuesto está totalmente alineado y cubre integralmente todas las actividades' },
      { valor: 4, label: 'El presupuesto cubre la mayoría de las actividades con algunas brechas menores' },
      { valor: 3, label: 'El presupuesto cubre parcialmente las actividades definidas' },
      { valor: 2, label: 'El presupuesto tiene baja correspondencia con las actividades' },
      { valor: 1, label: 'No existe correspondencia entre el presupuesto y las actividades' },
    ],
  },
  {
    id: 23,
    texto: '¿Cómo se organiza el presupuesto del Plan de Vida en términos de periodos de tiempo?',
    opciones: [
      { valor: 5, label: 'El presupuesto está estructurado por periodos de manera clara y completa' },
      { valor: 4, label: 'El presupuesto se organiza en varios periodos' },
      { valor: 3, label: 'Se identifican algunos periodos sin mayor estructura' },
      { valor: 2, label: 'Se presenta un único periodo' },
      { valor: 1, label: 'No se presenta organización temporal del presupuesto' },
    ],
  },
  {
    id: 24,
    texto: '¿Cómo se relacionan los diferentes elementos del presupuesto entre sí dentro del Plan de Vida?',
    opciones: [
      { valor: 5, label: 'Existe una relación clara y consistente entre todos los elementos del presupuesto' },
      { valor: 4, label: 'La mayoría de los elementos del presupuesto están relacionados' },
      { valor: 3, label: 'Existen algunas relaciones, pero con vacíos importantes' },
      { valor: 2, label: 'Se presentan relaciones débiles o inconsistencias' },
      { valor: 1, label: 'No hay relación identificable entre elementos del presupuesto' },
    ],
  },
  // INDICADOR 6 — Estructuración presupuestal y financiera (Q26-Q30)
  {
    id: 25,
    texto: '¿La organización o comunidad identifica fuentes de financiación para el proceso de construcción o actualización del Plan de Vida?',
    opciones: [
      { valor: 5, label: 'Identificación clara y estructurada de múltiples fuentes, mecanismos y aliados' },
      { valor: 4, label: 'Se identifican varias fuentes con aproximaciones sobre mecanismos de apoyo' },
      { valor: 3, label: 'Se identifican algunas fuentes con aproximaciones básicas' },
      { valor: 2, label: 'Se identifican de manera preliminar o informal algunas fuentes' },
      { valor: 1, label: 'No se identifican fuentes de financiación' },
    ],
  },
  {
    id: 26,
    texto: '¿El proceso de construcción o actualización del Plan de Vida contempla diferentes fuentes de financiación para su desarrollo?',
    opciones: [
      { valor: 5, label: 'Estrategia diversificada y claramente definida de múltiples fuentes y aliados' },
      { valor: 4, label: 'Contempla diversas fuentes con alternativas identificadas' },
      { valor: 3, label: 'Se contemplan algunas fuentes adicionales, aunque de manera limitada' },
      { valor: 2, label: 'El proceso depende de una única fuente potencial identificada' },
      { valor: 1, label: 'No se contemplan fuentes de financiación' },
    ],
  },
  {
    id: 27,
    texto: '¿El proceso de construcción o actualización del Plan de Vida cuenta con recursos disponibles para el desarrollo de sus actividades?',
    opciones: [
      { valor: 5, label: 'Recursos suficientes y organizados para el desarrollo integral del proceso' },
      { valor: 4, label: 'Recursos suficientes para la mayoría de las actividades previstas' },
      { valor: 3, label: 'Algunos recursos para el desarrollo parcial de las actividades' },
      { valor: 2, label: 'Recursos mínimos e insuficientes para desarrollar adecuadamente las actividades' },
      { valor: 1, label: 'No se cuenta con recursos disponibles' },
    ],
  },
  {
    id: 28,
    texto: '¿La organización o comunidad cuenta con capacidades para gestionar apoyos financieros para el proceso?',
    opciones: [
      { valor: 5, label: 'Capacidades consolidadas para gestionar apoyos, establecer alianzas y movilizar recursos' },
      { valor: 4, label: 'Acciones periódicas de gestión con mecanismos definidos' },
      { valor: 3, label: 'Algunas acciones de gestión de manera parcial o con alcance limitado' },
      { valor: 2, label: 'Acciones mínimas o esporádicas sin resultados o mecanismos definidos' },
      { valor: 1, label: 'La organización no realiza acciones de gestión financiera' },
    ],
  },
  {
    id: 29,
    texto: '¿Las condiciones financieras actuales permiten desarrollar adecuadamente el proceso de construcción o actualización del Plan de Vida?',
    opciones: [
      { valor: 5, label: 'Condiciones financieras favorables que permiten desarrollar integralmente el proceso' },
      { valor: 4, label: 'Condiciones que permiten desarrollar la mayor parte de las actividades' },
      { valor: 3, label: 'Condiciones que permiten desarrollar parcialmente algunas actividades' },
      { valor: 2, label: 'Condiciones altamente limitadas que ponen en riesgo el proceso' },
      { valor: 1, label: 'Las condiciones actuales no permiten desarrollar el proceso' },
    ],
  },
  // INDICADOR 7 — Participación comunitaria y organizacional (Q31-Q35)
  {
    id: 30,
    texto: '¿Existe participación de las autoridades tradicionales de la organización en el proceso de construcción o actualización del Plan de Vida?',
    opciones: [
      { valor: 5, label: 'Las autoridades tradicionales participan activamente en todo el proceso' },
      { valor: 4, label: 'Participan activamente en la mayoría de las etapas' },
      { valor: 3, label: 'Participan parcialmente en algunas etapas' },
      { valor: 2, label: 'La participación es ocasional, limitada o únicamente informativa' },
      { valor: 1, label: 'No existe participación de las autoridades tradicionales' },
    ],
  },
  {
    id: 31,
    texto: '¿Se evidencia la participación de las mujeres de la comunidad u organización en la construcción o actualización del Plan de Vida?',
    opciones: [
      { valor: 5, label: 'Participación amplia y sostenida de mujeres en todo el proceso' },
      { valor: 4, label: 'Participación activa de mujeres en varias fases del proceso' },
      { valor: 3, label: 'Participación de mujeres en algunas actividades' },
      { valor: 2, label: 'Participación mínima y no sostenida' },
      { valor: 1, label: 'No se evidencia participación de mujeres' },
    ],
  },
  {
    id: 32,
    texto: '¿Se evidencia la participación de jóvenes de la organización en la construcción o actualización del Plan de Vida?',
    opciones: [
      { valor: 5, label: 'Participación amplia y sostenida de jóvenes en todo el proceso' },
      { valor: 4, label: 'Participación activa de jóvenes en varias fases del proceso' },
      { valor: 3, label: 'Participación de jóvenes en algunas actividades' },
      { valor: 2, label: 'Participación mínima y no sostenida' },
      { valor: 1, label: 'No se evidencia participación de jóvenes' },
    ],
  },
  {
    id: 33,
    texto: '¿Se evidencia la participación de adultos mayores en la construcción o actualización del Plan de Vida?',
    opciones: [
      { valor: 5, label: 'Participación amplia y sostenida de adultos mayores en todo el proceso' },
      { valor: 4, label: 'Participación activa de adultos mayores en varias fases' },
      { valor: 3, label: 'Participación de adultos mayores en algunas actividades' },
      { valor: 2, label: 'Participación mínima y no sostenida' },
      { valor: 1, label: 'No se evidencia participación de adultos mayores' },
    ],
  },
  {
    id: 34,
    texto: '¿Se evidencia la participación de líderes y lideresas comunitarias en el proceso de construcción o actualización del Plan de Vida?',
    opciones: [
      { valor: 5, label: 'Participación amplia y sostenida de líderes/lideresas en todo el proceso' },
      { valor: 4, label: 'Participación activa en varias fases del proceso' },
      { valor: 3, label: 'Participación en algunas actividades' },
      { valor: 2, label: 'Participación mínima y no sostenida' },
      { valor: 1, label: 'No se evidencia participación de líderes/lideresas' },
    ],
  },
  // INDICADOR 8 — Incorporación de saberes y prácticas culturales (Q36-Q40)
  {
    id: 35,
    texto: '¿El proceso de construcción o actualización del Plan de Vida incorpora saberes tradicionales de la comunidad?',
    opciones: [
      { valor: 5, label: 'Los saberes tradicionales orientan de manera integral y permanente el proceso' },
      { valor: 4, label: 'El proceso incorpora ampliamente saberes tradicionales en varias etapas' },
      { valor: 3, label: 'El proceso incorpora algunos saberes en determinadas actividades' },
      { valor: 2, label: 'La incorporación de saberes es mínima, ocasional o únicamente simbólica' },
      { valor: 1, label: 'El proceso no incorpora saberes tradicionales' },
    ],
  },
  {
    id: 36,
    texto: '¿El proceso de construcción o actualización del Plan de Vida incorpora prácticas culturales propias de la comunidad?',
    opciones: [
      { valor: 5, label: 'Las prácticas culturales orientan de manera integral y permanente el proceso' },
      { valor: 4, label: 'El proceso incorpora ampliamente prácticas culturales en diferentes etapas' },
      { valor: 3, label: 'El proceso incorpora algunas prácticas en determinados espacios o actividades' },
      { valor: 2, label: 'La incorporación es mínima, ocasional o únicamente simbólica' },
      { valor: 1, label: 'El proceso no incorpora prácticas culturales propias' },
    ],
  },
  {
    id: 37,
    texto: '¿En qué medida el proceso de construcción o actualización del Plan de Vida promueve la transmisión de conocimiento entre generaciones dentro de la comunidad?',
    opciones: [
      { valor: 5, label: 'Se promueve de manera estructural y permanente la transmisión intergeneracional' },
      { valor: 4, label: 'Se promueve ampliamente la transmisión intergeneracional en varias etapas' },
      { valor: 3, label: 'Se promueve de manera parcial en algunas actividades o espacios específicos' },
      { valor: 2, label: 'La transmisión intergeneracional es mínima, ocasional o simbólica' },
      { valor: 1, label: 'No se promueve la transmisión de conocimientos entre generaciones' },
    ],
  },
  {
    id: 38,
    texto: '¿El proceso de construcción o actualización del Plan de Vida incorpora elementos identitarios propios de la comunidad?',
    opciones: [
      { valor: 5, label: 'Los elementos identitarios orientan de manera integral el proceso' },
      { valor: 4, label: 'El proceso incorpora ampliamente elementos identitarios en diferentes etapas' },
      { valor: 3, label: 'El proceso incorpora algunos elementos identitarios en determinadas actividades' },
      { valor: 2, label: 'La incorporación de elementos identitarios es mínima u ocasional' },
      { valor: 1, label: 'El proceso no incorpora elementos identitarios propios' },
    ],
  },
  {
    id: 39,
    texto: '¿En qué medida el proceso de construcción o actualización del Plan de Vida reconoce la memoria colectiva de la comunidad?',
    opciones: [
      { valor: 5, label: 'La memoria colectiva orienta de manera integral todo el proceso' },
      { valor: 4, label: 'El proceso incorpora ampliamente la memoria colectiva en varias etapas' },
      { valor: 3, label: 'El proceso incorpora algunos elementos de la memoria colectiva en momentos específicos' },
      { valor: 2, label: 'La incorporación de la memoria colectiva es mínima, ocasional o simbólica' },
      { valor: 1, label: 'No se reconoce ni se incorpora la memoria colectiva en el proceso' },
    ],
  },
];

export const TOTAL_PREGUNTAS = PREGUNTAS.length; // 40
export const TOTAL_INDICADORES = INDICADORES.length; // 8

// Secuencia de pasos del wizard: intro por indicador + preguntas
export const WIZARD_STEPS = (() => {
  const steps = [];
  INDICADORES.forEach((ind) => {
    steps.push({ type: 'intro', indicador: ind });
    ind.preguntas.forEach((pIdx) => {
      steps.push({ type: 'question', preguntaIdx: pIdx });
    });
  });
  return steps;
})();

// ─── Utilidades ───────────────────────────────────────────────────────────────
export function calcularPuntajeIndicador(indicadorId, respuestas) {
  const ind = INDICADORES[indicadorId];
  if (!ind) return 0;
  const vals = ind.preguntas.map((i) => respuestas[i] ?? 0);
  const suma = vals.reduce((a, b) => a + b, 0);
  return vals.length > 0 ? +(suma / vals.length).toFixed(2) : 0;
}

export function calcularPuntajeDimension(dimId, respuestas) {
  const dim = DIMENSIONES.find((d) => d.id === dimId);
  if (!dim) return 0;
  const scores = dim.indicadores.map((i) => calcularPuntajeIndicador(i, respuestas));
  return +(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
}

export function calcularPuntajeGlobal(respuestas) {
  const vals = Object.values(respuestas);
  return vals.length > 0 ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : 0;
}

export function nivelDesempeno(score) {
  if (score >= 4.5) return { label: 'Óptimo',    color: '#3E7F00' };
  if (score >= 3.5) return { label: 'Adecuado',  color: '#218380' };
  if (score >= 2.5) return { label: 'Parcial',   color: '#FFB600' };
  if (score >= 1.5) return { label: 'Limitado',  color: '#FF9331' };
  return              { label: 'Crítico',   color: '#D2232A' };
}

export function storageKey(slug) { return `gestion_indicadores_${slug}`; }

export function cargarRespuestas(slug) {
  try {
    const raw = localStorage.getItem(storageKey(slug));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function guardarRespuestas(slug, data) {
  localStorage.setItem(storageKey(slug), JSON.stringify(data));
}
