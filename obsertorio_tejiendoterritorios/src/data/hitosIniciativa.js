// Línea de tiempo de la iniciativa: fecha de inicio y 5 hitos de ejecución.
// Edita las fechas, títulos y descripciones para reflejar el proceso real de cada iniciativa.
// tipo: 'inicio' | 'hito' | 'cierre'

const hitosIniciativa = {
  fechaInicio: '2024-02-01',
  hitos: [
    {
      id: 1,
      tipo:        'inicio',
      titulo:      'Arranque del proceso',
      fecha:       '2024-02-01',
      descripcion: 'Asamblea comunitaria de socialización y validación de la iniciativa. Conformación del equipo coordinador y definición de la ruta de trabajo.',
    },
    {
      id: 2,
      tipo:        'hito',
      titulo:      'Diagnóstico participativo',
      fecha:       '2024-04-15',
      descripcion: 'Realización del diagnóstico territorial con la participación de mayores, mujeres, jóvenes y líderes. Identificación de potencialidades y necesidades prioritarias.',
    },
    {
      id: 3,
      tipo:        'hito',
      titulo:      'Formulación y concertación',
      fecha:       '2024-06-30',
      descripcion: 'Talleres de formulación participativa del plan de acción. Concertación de metas, responsables y cronograma con el gobierno propio.',
    },
    {
      id: 4,
      tipo:        'hito',
      titulo:      'Implementación de actividades',
      fecha:       '2024-09-01',
      descripcion: 'Ejecución de las actividades acordadas: formación, eventos culturales, fortalecimiento organizativo y gestión territorial.',
    },
    {
      id: 5,
      tipo:        'hito',
      titulo:      'Seguimiento y ajuste',
      fecha:       '2024-11-15',
      descripcion: 'Revisión colectiva de avances, ajuste de estrategias y retroalimentación comunitaria. Sistematización de lecciones aprendidas.',
    },
    {
      id: 6,
      tipo:        'cierre',
      titulo:      'Cierre y socialización',
      fecha:       '2025-01-30',
      descripcion: 'Evento de cierre y socialización de resultados con la comunidad, autoridades propias e instituciones aliadas. Entrega de productos finales.',
    },
  ],
};

export default hitosIniciativa;
