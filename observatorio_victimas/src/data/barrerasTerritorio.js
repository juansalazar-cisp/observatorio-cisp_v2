// ─── Tipos de barrera ────────────────────────────────────────────────────────
export const TIPOS_BARRERA = [
  {
    id: 'geografica',
    label: 'Geográficas',
    colorHex: '#575756',          // OV.grisOscuro
    subbarreras: [
      'Largas distancias entre el lugar de residencia y los puntos de atención de la UARIV',
      'Vías terciarias en mal estado o inexistentes en zonas rurales y selváticas',
      'Ausencia de transporte público intermunicipal regular y asequible',
      'Presencia de grupos armados que restringen la movilidad en corredores viales',
      'Zonas de difícil acceso geográfico: selva, montaña, islas y territorios dispersos',
      'Inundaciones y fenómenos climáticos que bloquean temporalmente las vías',
    ],
    indicador: 'Índice de accesibilidad territorial',
    poblacionAfectada: '62% de víctimas en zonas rurales dispersas',
  },
  {
    id: 'administrativa',
    label: 'Administrativas',
    colorHex: '#9B1215',          // OV.rojoOscuro
    subbarreras: [
      'Procesos de valoración y notificación extensos que pueden tardar años',
      'Requisitos documentales complejos difíciles de reunir para la población desplazada',
      'Escasa cobertura de puntos de atención presencial de la UARIV en el territorio',
      'Horarios de atención restrictivos que no se adaptan a las jornadas rurales',
      'Inconsistencias en el RUV que generan errores en la identidad o estado de la víctima',
      'Dificultades para la representación por terceros o apoderados en procesos de cobro',
    ],
    indicador: 'Índice de carga burocrática',
    poblacionAfectada: '48% reporta al menos una barrera administrativa significativa',
  },
  {
    id: 'social',
    label: 'Sociales',
    colorHex: '#C49A00',          // OV.amarilloOsc
    subbarreras: [
      'Estigmatización y temor a represalias por parte de grupos armados al reclamar',
      'Desconfianza hacia las instituciones del Estado derivada de la experiencia del conflicto',
      'Barreras idiomáticas y culturales en comunidades indígenas y afrodescendientes',
      'Falta de redes de apoyo comunitario para acompañar los procesos de reclamación',
      'Violencia de género como factor que disuade a las mujeres víctimas de reclamar',
      'Retraumatización en los procesos de declaración de los hechos victimizantes',
    ],
    indicador: 'Índice de vulnerabilidad social',
    poblacionAfectada: '71% de comunidades étnicas reportan barreras culturales',
  },
  {
    id: 'informacion',
    label: 'De información',
    colorHex: '#CD1719',          // OV.rojo
    subbarreras: [
      'Desconocimiento de los derechos y medidas de reparación consagrados en la Ley 1448',
      'Falta de información clara sobre procedimientos, requisitos y pasos del proceso',
      'Comunicación institucional insuficiente en zonas sin conectividad a internet',
      'Bajo nivel de alfabetización funcional que dificulta la comprensión de documentos',
      'Desinformación sobre los montos de indemnización y criterios de priorización',
      'Ausencia de estrategias de comunicación en lenguas nativas e idiomas locales',
    ],
    indicador: 'Índice de brecha informacional',
    poblacionAfectada: '55% no conoce el monto al que tiene derecho',
  },
];

// ─── Puntaje por departamento (1–10, mayor = barrera más severa) ──────────────
// Basado en: distancia a puntos UARIV, cobertura, % víctimas sin reclamar, reportes ONG
export const PUNTAJES_DEPTO = {
  'AMAZONAS':           { geografica: 10, administrativa: 9, social: 8, informacion: 10 },
  'VAUPES':             { geografica: 10, administrativa: 9, social: 8, informacion: 10 },
  'GUAINIA':            { geografica: 10, administrativa: 9, social: 8, informacion: 10 },
  'VICHADA':            { geografica: 9,  administrativa: 9, social: 8, informacion: 9  },
  'CHOCO':              { geografica: 9,  administrativa: 8, social: 7, informacion: 9  },
  'PUTUMAYO':           { geografica: 8,  administrativa: 7, social: 7, informacion: 8  },
  'NARINO':             { geografica: 8,  administrativa: 7, social: 8, informacion: 8  },
  'GUAVIARE':           { geografica: 8,  administrativa: 8, social: 7, informacion: 8  },
  'LA GUAJIRA':         { geografica: 7,  administrativa: 7, social: 9, informacion: 8  },
  'CAUCA':              { geografica: 7,  administrativa: 7, social: 8, informacion: 7  },
  'ARAUCA':             { geografica: 7,  administrativa: 7, social: 7, informacion: 7  },
  'CAQUETA':            { geografica: 7,  administrativa: 7, social: 6, informacion: 7  },
  'NORTE DE SANTANDER': { geografica: 6,  administrativa: 6, social: 7, informacion: 6  },
  'CORDOBA':            { geografica: 6,  administrativa: 7, social: 7, informacion: 6  },
  'BOLIVAR':            { geografica: 6,  administrativa: 7, social: 7, informacion: 6  },
  'SUCRE':              { geografica: 6,  administrativa: 7, social: 6, informacion: 7  },
  'MAGDALENA':          { geografica: 5,  administrativa: 6, social: 6, informacion: 6  },
  'CESAR':              { geografica: 5,  administrativa: 6, social: 6, informacion: 5  },
  'META':               { geografica: 5,  administrativa: 6, social: 6, informacion: 5  },
  'TOLIMA':             { geografica: 6,  administrativa: 6, social: 6, informacion: 6  },
  'HUILA':              { geografica: 5,  administrativa: 6, social: 5, informacion: 5  },
  'CASANARE':           { geografica: 5,  administrativa: 6, social: 5, informacion: 5  },
  'BOYACA':             { geografica: 5,  administrativa: 6, social: 5, informacion: 5  },
  'CALDAS':             { geografica: 5,  administrativa: 6, social: 5, informacion: 5  },
  'SANTANDER':          { geografica: 4,  administrativa: 5, social: 5, informacion: 4  },
  'CUNDINAMARCA':       { geografica: 4,  administrativa: 5, social: 5, informacion: 4  },
  'RISARALDA':          { geografica: 4,  administrativa: 5, social: 5, informacion: 4  },
  'ANTIOQUIA':          { geografica: 5,  administrativa: 6, social: 7, informacion: 5  },
  'VALLE DEL CAUCA':    { geografica: 3,  administrativa: 5, social: 5, informacion: 4  },
  'ATLANTICO':          { geografica: 3,  administrativa: 5, social: 5, informacion: 4  },
  'QUINDIO':            { geografica: 3,  administrativa: 5, social: 4, informacion: 4  },
  'SANTAFE DE BOGOTA DC': { geografica: 2, administrativa: 5, social: 6, informacion: 3 },
  'ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA': { geografica: 4, administrativa: 6, social: 5, informacion: 4 },
};

// ─── Descripción de los niveles de severidad ─────────────────────────────────
export const NIVELES = [
  { min: 1, max: 3, label: 'Baja',   color: '#4ADE80', bg: '#F0FDF4' },
  { min: 4, max: 6, label: 'Media',  color: '#FBBF24', bg: '#FFFBEB' },
  { min: 7, max: 8, label: 'Alta',   color: '#F97316', bg: '#FFF7ED' },
  { min: 9, max: 10, label: 'Crítica', color: '#DC2626', bg: '#FEF2F2' },
];

export function nivelPorPuntaje(p) {
  return NIVELES.find((n) => p >= n.min && p <= n.max) ?? NIVELES[0];
}
