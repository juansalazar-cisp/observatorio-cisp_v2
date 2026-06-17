// ─── Hechos victimizantes reconocidos por la Ley 1448 ───────────────────────
// reparacionAdmin: true = hecho con ruta de indemnización vía administrativa
export const HECHOS = [
  {
    id: 'desplazamiento',
    label: 'Desplazamiento forzado',
    reparacionAdmin: true,
    descripcion:
      'Ocurre cuando una persona o grupo de personas se ve obligado a abandonar su lugar de residencia habitual como consecuencia del conflicto armado, amenazas, violencia generalizada o violaciones a DDHH.',
    norma: 'Art. 60–66 Ley 1448/2011',
  },
  {
    id: 'homicidio',
    label: 'Homicidio',
    reparacionAdmin: true,
    descripcion:
      'Muerte de una persona en el marco del conflicto armado. Genera derechos de reparación para el núcleo familiar de la víctima fallecida.',
    norma: 'Art. 3 Ley 1448/2011',
  },
  {
    id: 'desaparicion',
    label: 'Desaparición forzada',
    reparacionAdmin: true,
    descripcion:
      'Privación de la libertad de una persona por agentes estatales o grupos armados, seguida de la negativa a reconocer la detención o revelar el paradero de la víctima.',
    norma: 'Ley 589/2000 – Ley 1448/2011',
  },
  {
    id: 'secuestro',
    label: 'Secuestro',
    reparacionAdmin: true,
    descripcion:
      'Privación ilegal de la libertad de una persona con fines de obtener rescate, presión política o económica, cometida en el contexto del conflicto armado.',
    norma: 'Art. 3 Ley 1448/2011',
  },
  {
    id: 'reclutamiento',
    label: 'Reclutamiento ilícito',
    reparacionAdmin: true,
    descripcion:
      'Vinculación de menores de 18 años a grupos armados organizados al margen de la ley. Constituye un crimen de guerra en el DIH.',
    norma: 'Art. 3 Ley 1448/2011 – DIH',
  },
  {
    id: 'tortura',
    label: 'Tortura',
    reparacionAdmin: true,
    descripcion:
      'Infligir deliberadamente sufrimiento físico o mental a una persona. En el marco del conflicto armado es una violación grave al DIH y los DDHH.',
    norma: 'Art. 3 Ley 1448/2011 – Conv. ONU',
  },
  {
    id: 'lesiones',
    label: 'Lesiones personales',
    reparacionAdmin: true,
    descripcion:
      'Daño físico o psicológico causado a una persona que no resulta en la muerte, producto de acciones en el marco del conflicto armado.',
    norma: 'Art. 3 Ley 1448/2011',
  },
  {
    id: 'sexual',
    label: 'Delitos contra la libertad sexual',
    reparacionAdmin: true,
    descripcion:
      'Violencia sexual ejercida en el contexto del conflicto armado, incluyendo violación, esclavitud sexual y otras formas de violencia de género.',
    norma: 'Art. 3 Ley 1448/2011 – ONU 1820',
  },
];

// ─── Datos por departamento ──────────────────────────────────────────────────
// victimas: total RUV · reclamaron/noClamaron: indemnización · hechos: conteo por id
export const DATOS_DEPTO = {
  'ANTIOQUIA': {
    victimas: 1_621_904,
    reclamaron: 284_312,
    noReclamaron: 1_337_592,
    hechos: { desplazamiento: 1_100_200, homicidio: 190_400, desaparicion: 45_300, secuestro: 12_100, reclutamiento: 8_200, tortura: 6_700, lesiones: 22_000, sexual: 9_800 },
  },
  'BOLIVAR': {
    victimas: 571_300,
    reclamaron: 72_100,
    noReclamaron: 499_200,
    hechos: { desplazamiento: 380_000, homicidio: 88_000, desaparicion: 22_000, secuestro: 4_200, reclutamiento: 3_100, tortura: 2_900, lesiones: 8_800, sexual: 3_200 },
  },
  'NARINO': {
    victimas: 347_800,
    reclamaron: 41_200,
    noReclamaron: 306_600,
    hechos: { desplazamiento: 220_000, homicidio: 54_000, desaparicion: 18_000, secuestro: 3_800, reclutamiento: 4_200, tortura: 2_100, lesiones: 7_200, sexual: 4_100 },
  },
  'CHOCO': {
    victimas: 292_600,
    reclamaron: 28_900,
    noReclamaron: 263_700,
    hechos: { desplazamiento: 210_000, homicidio: 38_000, desaparicion: 14_000, secuestro: 2_200, reclutamiento: 3_800, tortura: 1_800, lesiones: 5_900, sexual: 3_400 },
  },
  'CAUCA': {
    victimas: 307_200,
    reclamaron: 35_800,
    noReclamaron: 271_400,
    hechos: { desplazamiento: 200_000, homicidio: 55_000, desaparicion: 16_000, secuestro: 3_100, reclutamiento: 5_200, tortura: 2_400, lesiones: 6_800, sexual: 3_900 },
  },
  'META': {
    victimas: 218_400,
    reclamaron: 32_100,
    noReclamaron: 186_300,
    hechos: { desplazamiento: 145_000, homicidio: 38_000, desaparicion: 12_000, secuestro: 4_800, reclutamiento: 2_900, tortura: 1_900, lesiones: 5_200, sexual: 2_100 },
  },
  'MAGDALENA': {
    victimas: 215_900,
    reclamaron: 28_400,
    noReclamaron: 187_500,
    hechos: { desplazamiento: 142_000, homicidio: 35_000, desaparicion: 10_000, secuestro: 3_400, reclutamiento: 2_400, tortura: 1_600, lesiones: 5_000, sexual: 2_000 },
  },
  'CESAR': {
    victimas: 194_700,
    reclamaron: 26_100,
    noReclamaron: 168_600,
    hechos: { desplazamiento: 128_000, homicidio: 31_000, desaparicion: 9_800, secuestro: 3_200, reclutamiento: 2_100, tortura: 1_500, lesiones: 4_600, sexual: 1_900 },
  },
  'NORTE DE SANTANDER': {
    victimas: 181_200,
    reclamaron: 24_300,
    noReclamaron: 156_900,
    hechos: { desplazamiento: 118_000, homicidio: 29_000, desaparicion: 9_200, secuestro: 2_800, reclutamiento: 2_000, tortura: 1_400, lesiones: 4_200, sexual: 1_700 },
  },
  'CORDOBA': {
    victimas: 175_300,
    reclamaron: 22_100,
    noReclamaron: 153_200,
    hechos: { desplazamiento: 115_000, homicidio: 27_000, desaparicion: 8_600, secuestro: 2_600, reclutamiento: 1_900, tortura: 1_300, lesiones: 4_000, sexual: 1_600 },
  },
  'PUTUMAYO': {
    victimas: 162_400,
    reclamaron: 19_800,
    noReclamaron: 142_600,
    hechos: { desplazamiento: 108_000, homicidio: 24_000, desaparicion: 7_800, secuestro: 2_400, reclutamiento: 2_800, tortura: 1_200, lesiones: 3_700, sexual: 2_100 },
  },
  'CAQUETA': {
    victimas: 145_800,
    reclamaron: 17_200,
    noReclamaron: 128_600,
    hechos: { desplazamiento: 96_000, homicidio: 22_000, desaparicion: 7_200, secuestro: 3_100, reclutamiento: 2_400, tortura: 1_100, lesiones: 3_400, sexual: 1_800 },
  },
  'SUCRE': {
    victimas: 132_100,
    reclamaron: 15_400,
    noReclamaron: 116_700,
    hechos: { desplazamiento: 88_000, homicidio: 19_000, desaparicion: 6_400, secuestro: 2_000, reclutamiento: 1_600, tortura: 900, lesiones: 2_900, sexual: 1_400 },
  },
  'TOLIMA': {
    victimas: 128_600,
    reclamaron: 16_100,
    noReclamaron: 112_500,
    hechos: { desplazamiento: 85_000, homicidio: 18_000, desaparicion: 6_200, secuestro: 2_800, reclutamiento: 1_400, tortura: 900, lesiones: 2_800, sexual: 1_200 },
  },
  'HUILA': {
    victimas: 112_400,
    reclamaron: 13_900,
    noReclamaron: 98_500,
    hechos: { desplazamiento: 74_000, homicidio: 16_000, desaparicion: 5_400, secuestro: 2_300, reclutamiento: 1_200, tortura: 800, lesiones: 2_400, sexual: 1_100 },
  },
  'SANTAFE DE BOGOTA DC': {
    victimas: 386_200,
    reclamaron: 61_800,
    noReclamaron: 324_400,
    hechos: { desplazamiento: 240_000, homicidio: 72_000, desaparicion: 28_000, secuestro: 8_400, reclutamiento: 3_200, tortura: 4_100, lesiones: 14_000, sexual: 6_800 },
  },
  'VALLE DEL CAUCA': {
    victimas: 268_900,
    reclamaron: 42_100,
    noReclamaron: 226_800,
    hechos: { desplazamiento: 172_000, homicidio: 48_000, desaparicion: 16_000, secuestro: 5_200, reclutamiento: 2_100, tortura: 2_800, lesiones: 9_200, sexual: 4_100 },
  },
  'CUNDINAMARCA': {
    victimas: 98_400,
    reclamaron: 12_100,
    noReclamaron: 86_300,
    hechos: { desplazamiento: 62_000, homicidio: 14_000, desaparicion: 4_800, secuestro: 2_100, reclutamiento: 900, tortura: 700, lesiones: 2_100, sexual: 900 },
  },
  'LA GUAJIRA': {
    victimas: 121_800,
    reclamaron: 10_400,
    noReclamaron: 111_400,
    hechos: { desplazamiento: 82_000, homicidio: 16_000, desaparicion: 5_200, secuestro: 1_800, reclutamiento: 1_400, tortura: 800, lesiones: 2_600, sexual: 1_400 },
  },
  'ARAUCA': {
    victimas: 88_200,
    reclamaron: 9_100,
    noReclamaron: 79_100,
    hechos: { desplazamiento: 58_000, homicidio: 12_000, desaparicion: 4_100, secuestro: 1_900, reclutamiento: 1_100, tortura: 600, lesiones: 1_900, sexual: 1_000 },
  },
  'ATLANTICO': {
    victimas: 82_600,
    reclamaron: 11_200,
    noReclamaron: 71_400,
    hechos: { desplazamiento: 54_000, homicidio: 11_000, desaparicion: 3_800, secuestro: 1_400, reclutamiento: 800, tortura: 500, lesiones: 1_700, sexual: 800 },
  },
  'BOYACA': {
    victimas: 68_100,
    reclamaron: 8_400,
    noReclamaron: 59_700,
    hechos: { desplazamiento: 44_000, homicidio: 9_000, desaparicion: 3_100, secuestro: 1_600, reclutamiento: 700, tortura: 500, lesiones: 1_400, sexual: 700 },
  },
  'VAUPES': {
    victimas: 18_400,
    reclamaron: 1_200,
    noReclamaron: 17_200,
    hechos: { desplazamiento: 12_000, homicidio: 2_800, desaparicion: 900, secuestro: 300, reclutamiento: 400, tortura: 200, lesiones: 400, sexual: 300 },
  },
  'GUAINIA': {
    victimas: 14_200,
    reclamaron: 900,
    noReclamaron: 13_300,
    hechos: { desplazamiento: 9_200, homicidio: 2_100, desaparicion: 700, secuestro: 200, reclutamiento: 300, tortura: 150, lesiones: 300, sexual: 200 },
  },
  'VICHADA': {
    victimas: 22_800,
    reclamaron: 1_800,
    noReclamaron: 21_000,
    hechos: { desplazamiento: 15_000, homicidio: 3_400, desaparicion: 1_100, secuestro: 400, reclutamiento: 500, tortura: 200, lesiones: 500, sexual: 300 },
  },
  'GUAVIARE': {
    victimas: 48_600,
    reclamaron: 4_200,
    noReclamaron: 44_400,
    hechos: { desplazamiento: 32_000, homicidio: 7_200, desaparicion: 2_400, secuestro: 900, reclutamiento: 900, tortura: 400, lesiones: 1_100, sexual: 600 },
  },
  'AMAZONAS': {
    victimas: 12_100,
    reclamaron: 700,
    noReclamaron: 11_400,
    hechos: { desplazamiento: 7_800, homicidio: 1_800, desaparicion: 600, secuestro: 200, reclutamiento: 300, tortura: 120, lesiones: 250, sexual: 180 },
  },
  'CASANARE': {
    victimas: 64_200,
    reclamaron: 7_800,
    noReclamaron: 56_400,
    hechos: { desplazamiento: 42_000, homicidio: 9_600, desaparicion: 3_200, secuestro: 1_400, reclutamiento: 800, tortura: 500, lesiones: 1_500, sexual: 700 },
  },
  'QUINDIO': {
    victimas: 42_100,
    reclamaron: 5_600,
    noReclamaron: 36_500,
    hechos: { desplazamiento: 27_000, homicidio: 6_200, desaparicion: 2_100, secuestro: 900, reclutamiento: 500, tortura: 300, lesiones: 1_000, sexual: 500 },
  },
  'RISARALDA': {
    victimas: 56_800,
    reclamaron: 7_200,
    noReclamaron: 49_600,
    hechos: { desplazamiento: 36_000, homicidio: 8_400, desaparicion: 2_800, secuestro: 1_100, reclutamiento: 700, tortura: 400, lesiones: 1_300, sexual: 600 },
  },
  'SANTANDER': {
    victimas: 104_200,
    reclamaron: 13_800,
    noReclamaron: 90_400,
    hechos: { desplazamiento: 68_000, homicidio: 15_000, desaparicion: 5_100, secuestro: 2_200, reclutamiento: 900, tortura: 700, lesiones: 2_200, sexual: 900 },
  },
  'CALDAS': {
    victimas: 74_600,
    reclamaron: 9_200,
    noReclamaron: 65_400,
    hechos: { desplazamiento: 48_000, homicidio: 11_000, desaparicion: 3_600, secuestro: 1_400, reclutamiento: 700, tortura: 500, lesiones: 1_600, sexual: 700 },
  },
  'ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA': {
    victimas: 2_100,
    reclamaron: 340,
    noReclamaron: 1_760,
    hechos: { desplazamiento: 1_200, homicidio: 400, desaparicion: 180, secuestro: 80, reclutamiento: 40, tortura: 30, lesiones: 80, sexual: 40 },
  },
};

// ─── Requerimientos documentales por departamento ────────────────────────────
export const DOCS_REQUERIDOS = [
  { id: 'cedula',        label: 'Cédula de ciudadanía' },
  { id: 'registro',      label: 'Registro civil / partida bautismal' },
  { id: 'declaracion',   label: 'Declaración de hechos victimizantes' },
  { id: 'resolución',    label: 'Resolución de inclusión en el RUV' },
  { id: 'certificado',   label: 'Certificado de vulnerabilidad' },
  { id: 'poder',         label: 'Poder notarial (reclamación por tercero)' },
];

// Qué documentos exige cada departamento (los que no están en la lista se asumen estándar)
export const DOCS_POR_DEPTO = {
  'CHOCO':           ['cedula', 'declaracion', 'resolución', 'certificado'],
  'NARINO':          ['cedula', 'declaracion', 'resolución', 'certificado', 'poder'],
  'VAUPES':          ['cedula', 'registro', 'declaracion', 'resolución', 'certificado'],
  'GUAINIA':         ['cedula', 'registro', 'declaracion', 'resolución', 'certificado'],
  'VICHADA':         ['cedula', 'registro', 'declaracion', 'resolución', 'certificado'],
  'AMAZONAS':        ['cedula', 'registro', 'declaracion', 'resolución', 'certificado'],
  'PUTUMAYO':        ['cedula', 'declaracion', 'resolución', 'certificado', 'poder'],
  'ARAUCA':          ['cedula', 'declaracion', 'resolución', 'certificado'],
  'GUAVIARE':        ['cedula', 'registro', 'declaracion', 'resolución', 'certificado'],
  'LA GUAJIRA':      ['cedula', 'registro', 'declaracion', 'resolución', 'certificado'],
  // Resto: documentación estándar
  DEFAULT:           ['cedula', 'declaracion', 'resolución'],
};
