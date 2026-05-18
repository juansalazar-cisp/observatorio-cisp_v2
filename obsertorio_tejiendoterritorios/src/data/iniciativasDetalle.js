// Fuente de datos de las 95 iniciativas comunitarias.
// Cada entrada incluye: colores, imagen de galería, nombre, tipo, línea, comunidad, organización.
// Este archivo alimenta la lista de iniciativas Y las páginas individuales de cada una.

const lineaColores = {
  'Economías Propias':           { primario: '#FF9331', secundario: '#6BA300' },
  'Territorio y Medio Ambiente': { primario: '#6BA300', secundario: '#FF9331' },
  'Cultura e Identidad':         { primario: '#7A3E9D', secundario: '#FF9331' },
  'Gobernanza y Gobierno Propio':{ primario: '#1C1F3A', secundario: '#FF9331' },
  'Salud y Bienestar':           { primario: '#BF1600', secundario: '#6BA300' },
};

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
  { comunidad: 'Pueblo Nasa',    organizacion: 'CRIC',          region: 'Andina',    departamento: 'CAUCA'      },
  { comunidad: 'Pueblo Wayuu',   organizacion: 'OIW',           region: 'Caribe',    departamento: 'LA GUAJIRA' },
  { comunidad: 'Pueblo Emberá',  organizacion: 'OIA',           region: 'Pacífica',  departamento: 'CHOCO'      },
  { comunidad: 'Pueblo Kogui',   organizacion: 'CIT',           region: 'Caribe',    departamento: 'LA GUAJIRA' },
  { comunidad: 'Pueblo Arhuaco', organizacion: 'CIT',           region: 'Caribe',    departamento: 'MAGDALENA'  },
  { comunidad: 'Pueblo Zenú',    organizacion: 'AICO',          region: 'Caribe',    departamento: 'CORDOBA'    },
  { comunidad: 'Pueblo Pijao',   organizacion: 'CRIT',          region: 'Andina',    departamento: 'TOLIMA'     },
  { comunidad: 'Pueblo Sikuani', organizacion: 'CRIPC',         region: 'Orinoquía', departamento: 'VICHADA'    },
  { comunidad: 'Pueblo Uitoto',  organizacion: 'OPIAC',         region: 'Amazónica', departamento: 'AMAZONAS'   },
  { comunidad: 'Pueblo Tikuna',  organizacion: 'ACITAM',        region: 'Amazónica', departamento: 'AMAZONAS'   },
  { comunidad: 'Pueblo Yanacona',organizacion: 'UAESY',         region: 'Andina',    departamento: 'CAUCA'      },
  { comunidad: 'Pueblo Inga',    organizacion: 'TANDACHIRIDU',  region: 'Andina',    departamento: 'PUTUMAYO'   },
  { comunidad: 'Pueblo Muisca',  organizacion: 'CABILDO MUISCA',region: 'Andina',    departamento: 'CUNDINAMARCA'},
  { comunidad: 'Pueblo Wounaan', organizacion: 'OREWA',         region: 'Pacífica',  departamento: 'CHOCO'      },
  { comunidad: 'Pueblo Tule',    organizacion: 'COAPITOL',      region: 'Caribe',    departamento: 'CORDOBA'    },
];

const descripciones = [
  'Proceso participativo orientado al fortalecimiento de las capacidades organizativas y culturales de la comunidad, con énfasis en la transmisión de saberes entre generaciones y la recuperación de prácticas ancestrales desde la cosmovisión propia.',
  'Iniciativa colectiva que articula a líderes, mayores y jóvenes en torno a la planificación territorial desde la cosmovisión propia, garantizando la participación equitativa de todos los sectores de la comunidad.',
  'Acción concertada entre la comunidad y las instituciones para fortalecer los mecanismos de gobierno propio y el ejercicio de la autonomía indígena en el marco del derecho internacional y los derechos colectivos.',
  'Estrategia de desarrollo económico local basada en los principios de reciprocidad y solidaridad comunitaria, que busca la soberanía alimentaria y el manejo sostenible de los recursos naturales del territorio ancestral.',
  'Proceso de recuperación y valoración del patrimonio cultural inmaterial de la comunidad, incluyendo lengua, rituales, músicas y tradiciones que definen la identidad colectiva del pueblo y su relación con el territorio.',
];

// Municipios de referencia por departamento
const municipiosPorDepto = {
  'CAUCA':        ['Toribío', 'Jambaló', 'Caldono', 'Silvia', 'Popayán'],
  'LA GUAJIRA':   ['Riohacha', 'Maicao', 'Uribia', 'Manaure'],
  'CHOCO':        ['Quibdó', 'Istmina', 'Bagadó', 'Lloró'],
  'MAGDALENA':    ['Santa Marta', 'Ciénaga', 'Valledupar'],
  'CORDOBA':      ['Montería', 'San Andrés de Sotavento', 'Tierralta'],
  'TOLIMA':       ['Ibagué', 'Ortega', 'Chaparral', 'Ataco'],
  'VICHADA':      ['Puerto Carreño', 'Cumaribo', 'La Primavera'],
  'AMAZONAS':     ['Leticia', 'Puerto Nariño', 'La Pedrera'],
  'PUTUMAYO':     ['Mocoa', 'Puerto Asís', 'Sibundoy', 'Valle del Guamuez'],
  'CUNDINAMARCA': ['Bogotá', 'Soacha', 'Chía'],
};

// Pueblos indígenas por departamento
const pueblosPorDepto = {
  'CAUCA':        ['Nasa', 'Misak', 'Totoró', 'Yanacona', 'Kokonuko'],
  'LA GUAJIRA':   ['Wayuu', 'Kogui', 'Wiwa', 'Arhuaco'],
  'CHOCO':        ['Emberá Katío', 'Wounaan', 'Tule', 'Emberá Dobidá'],
  'MAGDALENA':    ['Arhuaco', 'Chimila', 'Kogui'],
  'CORDOBA':      ['Zenú', 'Emberá Katío', 'Tule'],
  'TOLIMA':       ['Pijao', 'Nasa'],
  'VICHADA':      ['Sikuani', 'Piaroa', 'Piapoco'],
  'AMAZONAS':     ['Tikuna', 'Uitoto', 'Yucuna', 'Andoke'],
  'PUTUMAYO':     ['Inga', 'Kamëntsá', 'Siona', 'Cofán'],
  'CUNDINAMARCA': ['Muisca'],
};

// Número de galería de imágenes (0-7 para 8 fotos disponibles)
const iniciativasDetalle = Array.from({ length: 95 }, (_, i) => {
  const cd     = comunidadesData[i % comunidadesData.length];
  const linea  = lineas[i % lineas.length];
  const cols   = lineaColores[linea];
  const nombre = nombresBase[i % nombresBase.length] + (i >= nombresBase.length ? ` — ${cd.comunidad}` : '');
  return {
    id:             i + 1,
    nombre,
    tipo:           i % 2 === 0 ? 'Acuerdo' : 'Fortalecimiento',
    linea,
    organizacion:   cd.organizacion,
    comunidad:      cd.comunidad,
    region:         cd.region,
    departamento:   cd.departamento,
    descripcion:    descripciones[i % descripciones.length],
    colorPrimario:  cols.primario,
    colorSecundario:cols.secundario,
    imagenIndex:    i % 8,          // índice de la foto de galería (0-7)
    municipios:     municipiosPorDepto[cd.departamento] || [],
    pueblos:        pueblosPorDepto[cd.departamento]    || [cd.comunidad],
    ods:            [`ODS ${(i % 17) + 1}`],
  };
});

export default iniciativasDetalle;

// Datos agregados por departamento para el mapa
export const datosPorDepartamento = iniciativasDetalle.reduce((acc, ini) => {
  const d = ini.departamento;
  if (!acc[d]) {
    acc[d] = { iniciativas: 0, municipios: ini.municipios, pueblos: ini.pueblos };
  }
  acc[d].iniciativas += 1;
  return acc;
}, {});
