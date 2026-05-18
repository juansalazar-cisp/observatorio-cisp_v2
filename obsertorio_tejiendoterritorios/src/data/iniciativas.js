// Datos de las 95 iniciativas del proyecto Tejiendo Territorios.
// Reemplaza cada entrada con la información real cuando esté disponible.
// Campos: id, nombre, tipo, linea, organizacion, comunidad, region, descripcion, ods

const lineas = [
  'Economías Propias',
  'Territorio y Medio Ambiente',
  'Cultura e Identidad',
  'Gobernanza y Gobierno Propio',
  'Salud y Bienestar',
];

const nombresBase = [
  'Plan de revitalización de la lengua propia',
  'Minga de pensamiento territorial',
  'Guardia indígena comunitaria',
  'Escuela intercultural de liderazgo',
  'Sistema propio de salud y medicina tradicional',
  'Mapa participativo de usos del territorio',
  'Fondo rotatorio de economía comunitaria',
  'Mercado intercultural de saberes y productos',
  'Protocolo de protección del río y fuentes hídricas',
  'Diplomado en derecho propio y justicia indígena',
  'Semillero de jóvenes líderes indígenas',
  'Plan de siembra y manejo de chagra sagrada',
  'Red de madres parteras y promotoras de salud',
  'Casa de pensamiento indígena',
  'Observatorio de derechos territoriales',
  'Festival cultural de identidad y patrimonio',
  'Escuela de economía propia y soberanía alimentaria',
  'Manejo integral del páramo y ecosistemas',
  'Proceso de consulta previa libre e informada',
  'Tejido de saberes ancestrales y memoria oral',
  'Fortalecimiento del cabildo y gobierno propio',
  'Recuperación de semillas nativas y agrobiodiversidad',
  'Plan de prevención y atención en salud',
  'Construcción colectiva del plan de vida',
  'Red de comunicación intercultural comunitaria',
];

const comunidadesData = [
  { comunidad: 'Pueblo Nasa',    organizacion: 'CRIC',   region: 'Andina'    },
  { comunidad: 'Pueblo Wayuu',   organizacion: 'OIW',    region: 'Caribe'    },
  { comunidad: 'Pueblo Emberá',  organizacion: 'OIA',    region: 'Pacífica'  },
  { comunidad: 'Pueblo Kogui',   organizacion: 'CIT',    region: 'Caribe'    },
  { comunidad: 'Pueblo Arhuaco', organizacion: 'CIT',    region: 'Caribe'    },
  { comunidad: 'Pueblo Zenú',    organizacion: 'AICO',   region: 'Caribe'    },
  { comunidad: 'Pueblo Pijao',   organizacion: 'CRIT',   region: 'Andina'    },
  { comunidad: 'Pueblo Sikuani', organizacion: 'CRIPC',  region: 'Orinoquía' },
  { comunidad: 'Pueblo Uitoto',  organizacion: 'OPIAC',  region: 'Amazónica' },
  { comunidad: 'Pueblo Tikuna',  organizacion: 'ACITAM', region: 'Amazónica' },
  { comunidad: 'Pueblo Yanacona','organizacion': 'UAESY', region: 'Andina'   },
  { comunidad: 'Pueblo Inga',    organizacion: 'TANDACHIRIDU', region: 'Andina' },
  { comunidad: 'Pueblo Muisca',  organizacion: 'CABILDO MUISCA', region: 'Andina' },
  { comunidad: 'Pueblo Wounaan', organizacion: 'OREWA',  region: 'Pacífica'  },
  { comunidad: 'Pueblo Tule',    organizacion: 'COAPITOL', region: 'Caribe'  },
];

const descripciones = [
  'Proceso participativo orientado al fortalecimiento de las capacidades organizativas y culturales de la comunidad, con énfasis en la transmisión de saberes entre generaciones y la recuperación de prácticas ancestrales.',
  'Iniciativa colectiva que articula a líderes, mayores y jóvenes en torno a la planificación territorial desde la cosmovisión propia, garantizando la participación equitativa de todos los sectores comunitarios.',
  'Acción concertada entre la comunidad y las instituciones para fortalecer los mecanismos de gobierno propio y el ejercicio de la autonomía indígena en el marco del derecho internacional.',
  'Estrategia de desarrollo económico local basada en los principios de reciprocidad y solidaridad comunitaria, que busca la soberanía alimentaria y el manejo sostenible de los recursos naturales del territorio.',
  'Proceso de recuperación y valoración del patrimonio cultural inmaterial de la comunidad, incluyendo lengua, rituales, músicas y tradiciones que definen la identidad colectiva del pueblo.',
];

const odsRelacion = [
  ['ODS 1', 'ODS 10'], ['ODS 2', 'ODS 12'], ['ODS 3', 'ODS 13'],
  ['ODS 4', 'ODS 11'], ['ODS 5', 'ODS 16'], ['ODS 6', 'ODS 15'],
  ['ODS 8', 'ODS 17'], ['ODS 10', 'ODS 11'], ['ODS 13', 'ODS 15'],
  ['ODS 16', 'ODS 17'],
];

const iniciativas = Array.from({ length: 95 }, (_, i) => {
  const cd = comunidadesData[i % comunidadesData.length];
  return {
    id:           i + 1,
    nombre:       nombresBase[i % nombresBase.length] + (i >= nombresBase.length ? ` — ${cd.comunidad}` : ''),
    tipo:         i % 2 === 0 ? 'Acuerdo' : 'Fortalecimiento',
    linea:        lineas[i % lineas.length],
    organizacion: cd.organizacion,
    comunidad:    cd.comunidad,
    region:       cd.region,
    descripcion:  descripciones[i % descripciones.length],
    ods:          odsRelacion[i % odsRelacion.length],
  };
});

export default iniciativas;
