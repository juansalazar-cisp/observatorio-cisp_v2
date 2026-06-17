import { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Chip, Divider, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

import { OV } from '../../theme';

import iconoFoco       from '../../assets/icono_foco.png';
import iconoPonencia   from '../../assets/icono_ponencia.png';
import iconoPonencia2  from '../../assets/icono_ponencia2.png';
import iconoArchivo    from '../../assets/icono_archivo.png';
import iconoReunion    from '../../assets/icono_reunion.png';
import iconoBanderas   from '../../assets/icono_banderas.png';
import iconoColombia   from '../../assets/icono_colombia.png';
import iconoComunidad  from '../../assets/icono_comunidad.png';
import iconoPesos      from '../../assets/icono_pesos.png';
import iconoCiclo      from '../../assets/icono_ciclo.png';
import iconoTiempo     from '../../assets/icono_tiempo.png';
import iconoAnuncio    from '../../assets/icono_anuncio.png';
import iconoBusqueda   from '../../assets/icono_busqueda.png';
import iconoMundo      from '../../assets/icono_mundo.png';
import iconoEngranaje  from '../../assets/icono_engranaje.png';
import iconoPin        from '../../assets/icono_pin_georeferencia.png';
import iconoFlecha2    from '../../assets/icono_flecha2.png';

// ─────────────────────────────────────────────────────────
// DATOS
// ─────────────────────────────────────────────────────────

const DETALLE_TEXTO = `El Observatorio de Acceso a la Indemnización Administrativa es una plataforma de análisis territorial orientada a comprender las dinámicas de acceso de la población víctima a los procesos de indemnización administrativa. Su finalidad es generar evidencia técnica y territorial que permita identificar barreras, brechas, trayectorias críticas y capacidades institucionales relacionadas con el acceso al derecho a la reparación.

El observatorio integra información territorial, operativa, institucional y participativa mediante procesos de análisis multinivel, triangulación metodológica y visualización analítica. A través de dashboards, mapas, reportes y herramientas de visualización territorial, la plataforma facilita el seguimiento de dinámicas de acceso, la identificación de territorios críticos y el fortalecimiento de procesos de toma de decisiones basadas en evidencia.`;

const OBJETIVO_GENERAL = `Analizar las dinámicas de acceso a la indemnización administrativa mediante un enfoque territorial que permita identificar brechas, barreras y factores asociados al acceso, con el fin de generar evidencia para la toma de decisiones.`;

const OBJETIVOS_ESPECIFICOS = [
  {
    titulo: 'Caracterizar dinámicas de acceso',
    texto: 'Caracterizar las dinámicas de acceso a la indemnización administrativa, considerando las diferentes etapas del proceso, las trayectorias de acceso y las diferencias entre territorios y grupos poblacionales.',
    icono: iconoColombia,
  },
  {
    titulo: 'Analizar brechas y barreras',
    texto: 'Analizar las brechas, barreras y factores geográficos, administrativos, sociales y de información que inciden en las dificultades de acceso a la indemnización administrativa.',
    icono: iconoComunidad,
  },
  {
    titulo: 'Generar evidencia y recomendaciones',
    texto: 'Generar evidencia y recomendaciones orientadas a la priorización territorial, el fortalecimiento de la respuesta institucional y la toma de decisiones basadas en evidencia.',
    icono: iconoFoco,
  },
];

const HECHOS_VICTIMIZANTES = [
  {
    label: 'Desplazamiento forzado',
    icono: iconoPin,
    color: OV.grisOscuro,
    descripcion: 'Ocurre cuando una persona o familia es obligada a abandonar su lugar de residencia habitual por motivos relacionados con el conflicto armado, situaciones de violencia generalizada o violaciones de derechos humanos que alteren el orden público. Es el hecho victimizante con mayor número de víctimas registradas en el RUV.',
    norma: 'Ley 1448/2011 Art. 60; Decreto 4800/2011 Art. 155',
    monto: 'Hasta 27 SMMLV por hogar',
  },
  {
    label: 'Homicidio',
    icono: iconoReunion,
    color: OV.rojoOscuro,
    descripcion: 'Muerte violenta de una persona en el contexto y en razón del conflicto armado. Los familiares de la víctima directa —cónyuge, compañero/a permanente, hijos, padres u otros dependientes— son quienes tienen derecho a la reparación e indemnización ante la UARIV.',
    norma: 'Ley 1448/2011 Art. 38-49; Decreto 4800/2011',
    monto: 'Hasta 40 SMMLV por familia',
  },
  {
    label: 'Desaparición forzada',
    icono: iconoBusqueda,
    color: OV.rojo,
    descripcion: 'Privación de la libertad de una persona por parte de agentes del Estado o grupos armados al margen de la ley, seguida de la negativa a reconocer dicha privación o a revelar la suerte o paradero de la persona desaparecida, sustrayéndola de la protección de la ley.',
    norma: 'Ley 1448/2011 Art. 38; Ley 589/2000; Art. 165 C.P.',
    monto: 'Hasta 40 SMMLV por familia',
  },
  {
    label: 'Secuestro',
    icono: iconoTiempo,
    color: OV.amarilloOsc,
    descripcion: 'Privación ilegal de la libertad de una persona con el propósito de exigir por su liberación un provecho o utilidad, o para que se realice u omita algún acto, o con fines políticos o publicitarios, cometida por actores del conflicto armado.',
    norma: 'Ley 1448/2011 Art. 38; Código Penal Art. 168-170',
    monto: 'Hasta 40 SMMLV',
  },
  {
    label: 'Reclutamiento ilícito',
    icono: iconoComunidad,
    color: OV.grisOscuro,
    descripcion: 'Vinculación de niños, niñas y adolescentes a grupos armados organizados al margen de la ley, o a grupos que actúan bajo la dirección o con el apoyo del Estado. Constituye una grave violación de los derechos de la infancia y un crimen de guerra.',
    norma: 'Ley 1448/2011 Art. 38; Código Penal Art. 162; Convenio OIT 182',
    monto: 'Hasta 30 SMMLV',
  },
  {
    label: 'Tortura',
    icono: iconoArchivo,
    color: OV.rojoOscuro,
    descripcion: 'Todo acto por el cual se inflija intencionadamente a una persona dolores o sufrimientos graves, físicos o mentales, con el propósito de obtener información, imponer un castigo, intimidar o coaccionar, en el contexto del conflicto armado interno.',
    norma: 'Ley 1448/2011 Art. 38; Convenios de Ginebra; Art. 137 C.P.',
    monto: 'Hasta 30 SMMLV',
  },
  {
    label: 'Lesiones personales',
    icono: iconoMundo,
    color: OV.rojo,
    descripcion: 'Daño físico o psicológico causado a una persona como consecuencia de hechos ocurridos en el marco del conflicto armado que no resultan en la muerte. Incluye lesiones con incapacidad permanente (física o psíquica) y lesiones transitorias sin secuela permanente.',
    norma: 'Ley 1448/2011 Art. 38; Decreto 1290/2008',
    monto: 'Hasta 30 SMMLV (con incapacidad permanente)',
  },
  {
    label: 'Delitos contra la libertad sexual',
    icono: iconoBanderas,
    color: OV.amarilloOsc,
    descripcion: 'Actos de violencia sexual cometidos contra personas en el contexto y en razón del conflicto armado: violación, actos sexuales abusivos, acoso sexual y otras formas de violencia basada en género. Son reconocidos como crímenes de guerra y de lesa humanidad de especial atención diferencial.',
    norma: 'Ley 1448/2011 Art. 38; Auto 092/2008 CCC; Decreto 4800/2011',
    monto: 'Hasta 30 SMMLV',
  },
];

const VJRNR = [
  {
    titulo: 'Verdad',
    icono: iconoPonencia,
    color: OV.grisOscuro,
    texto: 'Derecho de las víctimas, sus familiares y la sociedad a conocer la verdad sobre los hechos, los motivos y las circunstancias en que se cometieron las violaciones y la identidad de los responsables.',
  },
  {
    titulo: 'Justicia',
    icono: iconoPonencia2,
    color: OV.rojoOscuro,
    texto: 'Derecho a que se haga justicia en el caso concreto, incluye el deber del Estado de investigar, juzgar y sancionar a los responsables de los crímenes.',
  },
  {
    titulo: 'Reparación',
    icono: iconoPesos,
    color: OV.rojo,
    texto: 'Derecho a ser reparada de manera adecuada, diferenciada, transformadora y efectiva por el daño sufrido. Comprende restitución, indemnización, rehabilitación, satisfacción y garantías de no repetición.',
    esReparacion: true,
  },
  {
    titulo: 'No Repetición',
    icono: iconoCiclo,
    color: OV.amarilloOsc,
    texto: 'Medidas que buscan prevenir la repetición de las violaciones de derechos humanos y del DIH, garantizando que los hechos victimizantes no vuelvan a ocurrir.',
  },
];

const MEDIDAS_REPARACION = [
  { label: 'Restitución',             icono: iconoFlecha2 },
  { label: 'Indemnización',          icono: iconoPesos },
  { label: 'Rehabilitación',          icono: iconoReunion },
  { label: 'Satisfacción',            icono: iconoBanderas },
  { label: 'Garantías de No Repetición', icono: iconoCiclo },
];

const ETAPAS_PROCESO = [
  {
    num: '01',
    titulo: 'Inscripción en el RUV',
    desc: 'La víctima o institución presenta la declaración ante el Ministerio Público. La UARIV verifica el cumplimiento de requisitos.',
    icono: iconoArchivo,
    actor: 'Víctima · Ministerio Público',
    color: OV.grisOscuro,
  },
  {
    num: '02',
    titulo: 'Valoración',
    desc: 'La UARIV analiza la declaración y verifica si el hecho es elegible para inclusión en el Registro Único de Víctimas.',
    icono: iconoBusqueda,
    actor: 'UARIV',
    color: OV.rojoOscuro,
  },
  {
    num: '03',
    titulo: 'Notificación',
    desc: 'La entidad comunica al solicitante la decisión de inclusión o no inclusión en el RUV, con los recursos procedentes.',
    icono: iconoAnuncio,
    actor: 'UARIV',
    color: OV.rojo,
  },
  {
    num: '04',
    titulo: 'Oferta institucional',
    desc: 'La víctima accede a las medidas de atención, asistencia y reparación según el hecho victimizante reconocido.',
    icono: iconoBanderas,
    actor: 'UARIV · Red institucional',
    color: OV.amarilloOsc,
  },
  {
    num: '05',
    titulo: 'Indemnización administrativa',
    desc: 'Pago del monto de indemnización definido por el Gobierno Nacional según el hecho victimizante y la condición de vulnerabilidad.',
    icono: iconoPesos,
    actor: 'UARIV · Min. Hacienda',
    color: OV.rojo,
    esenfasis: true,
  },
  {
    num: '06',
    titulo: 'Seguimiento',
    desc: 'Acompañamiento psicosocial posterior al cobro y seguimiento a las condiciones de la víctima en el proceso de restablecimiento.',
    icono: iconoCiclo,
    actor: 'UARIV · Aliados',
    color: OV.grisOscuro,
  },
];

const NAV_SECCIONES = [
  { titulo: 'Comprendiendo la Reparación', icono: iconoPonencia, color: OV.rojo,   path: '/comprendiendo-reparacion' },
  { titulo: 'Módulos de Análisis',         icono: iconoFoco,     color: OV.grisOscuro, path: '/modulos' },
  { titulo: 'Glosario y Recursos',         icono: iconoArchivo,  color: OV.amarilloOsc, path: '/glosario' },
];

const MODULOS_RAPIDOS = [
  { titulo: 'Radiografía del Acceso',              icono: iconoColombia,  color: OV.rojo,        path: '/modulos/radiografia-acceso' },
  { titulo: 'Barreras desde el Territorio',        icono: iconoComunidad, color: OV.rojoOscuro,  path: '/modulos/barreras-territorio' },
  { titulo: 'La Mirada desde las Víctimas',        icono: iconoReunion,   color: OV.amarilloOsc, path: '/modulos/mirada-victimas' },
  { titulo: 'Trayectorias de Contactabilidad',     icono: iconoPin,       color: OV.grisOscuro,  path: '/modulos/trayectorias-contactabilidad' },
  { titulo: 'Dinámicas Operativas Territoriales',  icono: iconoEngranaje, color: OV.rojo,        path: '/modulos/dinamicas-operativas' },
];

// ─────────────────────────────────────────────────────────
// COMPONENTE AUXILIAR — encabezado de sección
// ─────────────────────────────────────────────────────────
function SeccionHeader({ icono, titulo, subtitulo, color = OV.rojo }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
      <Box sx={{
        width: 48, height: 48, borderRadius: 2, bgcolor: `${color}12`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.25,
      }}>
        <Box component="img" src={icono} alt="" sx={{ width: 28, height: 28, objectFit: 'contain' }} />
      </Box>
      <Box>
        <Box sx={{ width: 40, height: 4, bgcolor: color, borderRadius: 2, mb: 0.75 }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: OV.grisOscuro, lineHeight: 1.2 }}>
          {titulo}
        </Typography>
        {subtitulo && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
            {subtitulo}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────
// PÁGINA PRINCIPAL
// ─────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const [dialogObservatorio, setDialogObservatorio] = useState(false);
  const [hechoSeleccionado, setHechoSeleccionado] = useState(null);

  return (
    <Box>

      {/* ══ 1. HERO ═══════════════════════════════════════ */}
      <Paper elevation={0} sx={{
        mb: 5, borderRadius: 3, overflow: 'hidden', position: 'relative',
        bgcolor: OV.grisOscuro,
        minHeight: { xs: 240, md: 300 },
        display: 'flex', alignItems: 'center',
      }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, bgcolor: OV.amarillo }} />
        <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, bgcolor: OV.rojo }} />
        <Box component="img" src={iconoBanderas} alt="" aria-hidden="true"
          sx={{ position: 'absolute', right: { xs: -20, md: 60 }, bottom: 0,
            height: { xs: 150, md: 240 }, objectFit: 'contain', opacity: 0.07 }} />
        <Box sx={{ position: 'relative', zIndex: 1, px: { xs: 3, md: 6 }, py: { xs: 4, md: 5 }, maxWidth: 700 }}>
          <Typography variant="h3"
            sx={{ color: '#fff', lineHeight: 1.2, mb: 2, fontWeight: 900,
              fontSize: { xs: '1.65rem', md: '2.1rem' } }}>
            Observatorio de Acceso a la Indemnización Administrativa
          </Typography>
          <Typography variant="body1"
            sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.85, fontSize: { xs: '0.88rem', md: '0.93rem' } }}>
            Plataforma de análisis territorial para comprender las dinámicas de acceso
            de la población víctima al proceso de indemnización administrativa en Colombia.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 4, height: 24, bgcolor: OV.amarillo, borderRadius: 1, flexShrink: 0 }} />
            <Typography variant="body2"
              sx={{ color: OV.amarillo, fontWeight: 800, fontStyle: 'italic', fontSize: '0.9rem' }}>
              "Reparar también es estar presentes"
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* ══ 2. DETALLE DEL OBSERVATORIO ═══════════════════ */}
      <Box sx={{ mb: 5 }}>
        <SeccionHeader
          icono={iconoFoco}
          titulo="Detalle del Observatorio"
          subtitulo="Finalidad, alcance y objetivos de la plataforma"
          color={OV.rojo}
        />

        <Paper elevation={0} sx={{
          borderRadius: 3, overflow: 'hidden',
          border: `1.5px solid ${OV.rojo}20`,
        }}>
          {/* Banda superior */}
          <Box sx={{ height: 5, background: `linear-gradient(90deg, ${OV.rojo} 0%, ${OV.amarillo} 100%)` }} />

          <Box sx={{ p: { xs: 2.5, md: 3.5 }, display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
            {/* Icono lateral */}
            <Box sx={{
              width: { md: 80 }, flexShrink: 0,
              display: 'flex', alignItems: 'flex-start', justifyContent: 'center', pt: 0.5,
            }}>
              <Box component="img" src={iconoFoco} alt=""
                sx={{ width: 64, height: 64, objectFit: 'contain', opacity: 0.85 }} />
            </Box>

            {/* Texto */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1"
                sx={{ color: OV.grisOscuro, lineHeight: 1.85, mb: 2, fontSize: '0.95rem' }}>
                El Observatorio de Acceso a la Indemnización Administrativa es una plataforma
                de análisis territorial orientada a comprender las dinámicas de acceso de la
                población víctima a los procesos de indemnización administrativa. Su finalidad
                es generar evidencia técnica y territorial que permita identificar barreras,
                brechas, trayectorias críticas y capacidades institucionales relacionadas con
                el acceso al derecho a la reparación.
              </Typography>

              {/* Objetivos resumidos */}
              <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
                {OBJETIVOS_ESPECIFICOS.map((obj) => (
                  <Grid key={obj.titulo} size={{ xs: 12, md: 4 }}>
                    <Box sx={{
                      p: 2, borderRadius: 2, bgcolor: `${OV.rojo}06`,
                      border: `1px solid ${OV.rojo}15`,
                      display: 'flex', gap: 1.5, alignItems: 'flex-start',
                    }}>
                      <Box component="img" src={obj.icono} alt=""
                        sx={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0, mt: 0.2 }} />
                      <Typography variant="body2"
                        sx={{ fontWeight: 700, color: OV.grisOscuro, fontSize: '0.8rem', lineHeight: 1.4 }}>
                        {obj.titulo}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Button
                variant="outlined"
                onClick={() => setDialogObservatorio(true)}
                sx={{
                  borderColor: OV.rojo, color: OV.rojo, fontWeight: 700, borderRadius: 2,
                  fontSize: '0.82rem',
                  '&:hover': { bgcolor: `${OV.rojo}08`, borderColor: OV.rojoOscuro },
                }}
              >
                Ver descripción completa y objetivos
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* ── Dialog Observatorio ─────────────────────────── */}
      <Dialog open={dialogObservatorio} onClose={() => setDialogObservatorio(false)}
        maxWidth="md" fullWidth
        PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden' } }}>
        <Box sx={{ height: 5, background: `linear-gradient(90deg, ${OV.rojo} 0%, ${OV.amarillo} 100%)` }} />
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pr: 2 }}>
          <Box component="img" src={iconoFoco} alt="" sx={{ width: 32, height: 32, objectFit: 'contain' }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: OV.grisOscuro, lineHeight: 1.2 }}>
              Detalle del Observatorio
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Descripción y objetivos
            </Typography>
          </Box>
          <IconButton onClick={() => setDialogObservatorio(false)} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {/* Descripción completa */}
          <Box sx={{ mb: 3 }}>
            <Chip label="Descripción" size="small"
              sx={{ mb: 1.5, bgcolor: `${OV.rojo}12`, color: OV.rojo, fontWeight: 700 }} />
            {DETALLE_TEXTO.split('\n\n').map((p, i) => (
              <Typography key={i} variant="body2" sx={{ lineHeight: 1.85, color: OV.grisOscuro, mb: 1.5 }}>
                {p}
              </Typography>
            ))}
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Objetivo general */}
          <Box sx={{ mb: 3 }}>
            <Chip label="Objetivo general" size="small"
              sx={{ mb: 1.5, bgcolor: `${OV.amarilloOsc}15`, color: OV.amarilloOsc, fontWeight: 700 }} />
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2,
              bgcolor: `${OV.amarillo}10`, border: `1px solid ${OV.amarillo}40` }}>
              <Typography variant="body2" sx={{ lineHeight: 1.85, color: OV.grisOscuro }}>
                {OBJETIVO_GENERAL}
              </Typography>
            </Paper>
          </Box>

          {/* Objetivos específicos */}
          <Box>
            <Chip label="Objetivos específicos" size="small"
              sx={{ mb: 1.5, bgcolor: `${OV.rojo}12`, color: OV.rojo, fontWeight: 700 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {OBJETIVOS_ESPECIFICOS.map((obj, i) => (
                <Box key={i} sx={{
                  p: 2.5, borderRadius: 2, border: `1px solid ${OV.grisMedio}35`,
                  display: 'flex', gap: 2, alignItems: 'flex-start',
                }}>
                  <Box sx={{
                    width: 36, height: 36, borderRadius: 2, bgcolor: `${OV.rojo}10`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Box component="img" src={obj.icono} alt=""
                      sx={{ width: 22, height: 22, objectFit: 'contain' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: OV.rojo, mb: 0.5 }}>
                      {obj.titulo}
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.8, color: OV.grisOscuro }}>
                      {obj.texto}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setDialogObservatorio(false)}
            variant="contained"
            sx={{ bgcolor: OV.rojo, color: '#fff', fontWeight: 700, borderRadius: 2,
              '&:hover': { bgcolor: OV.rojoOscuro } }}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* ══ 3. COMPRENDIENDO LA REPARACIÓN ════════════════ */}
      <Box sx={{ mb: 5 }}>
        <SeccionHeader
          icono={iconoPonencia}
          titulo="Comprendiendo la Reparación"
          subtitulo="Marco normativo, Ley 1448 de 2011 y decretos reglamentarios"
          color={OV.rojo}
        />

        {/* Intro */}
        <Paper elevation={0} sx={{
          p: { xs: 2.5, md: 3 }, mb: 3, borderRadius: 2.5,
          bgcolor: `${OV.rojo}06`, border: `1.5px solid ${OV.rojo}18`,
        }}>
          <Typography variant="body1" sx={{ lineHeight: 1.85, color: OV.grisOscuro }}>
            La <strong>Ley 1448 de 2011</strong> —Ley de Víctimas y Restitución de Tierras— constituye el
            principal instrumento normativo en Colombia para la atención, asistencia y reparación
            integral a las víctimas del conflicto armado interno, en el marco del reconocimiento del
            conflicto y del deber del Estado de proteger y restablecer los derechos de quienes han
            sido vulnerados.
          </Typography>
        </Paper>

        <Grid container spacing={2.5}>
          {[
            {
              titulo: '¿Quién es víctima?',
              icono: iconoReunion,
              color: OV.rojo,
              texto: 'Son víctimas las personas que individual o colectivamente hayan sufrido un daño por hechos ocurridos a partir del 1.° de enero de 1985, como consecuencia de infracciones al DIH o de violaciones graves a las normas internacionales de DDHH en el marco del conflicto armado.',
            },
            {
              titulo: 'Ley 1448 de 2011',
              icono: iconoPonencia,
              color: OV.rojoOscuro,
              texto: 'Establece las medidas de atención, asistencia y reparación integral a las víctimas. Define el marco institucional, las entidades responsables, los procedimientos de inclusión en el RUV y los mecanismos de reparación, en un horizonte temporal de diez años prorrogable.',
            },
            {
              titulo: 'Decretos reglamentarios',
              icono: iconoArchivo,
              color: OV.amarilloOsc,
              texto: 'El Decreto 4800 de 2011 reglamentó la Ley 1448 estableciendo los procedimientos de atención y reparación. El Decreto 4829 de 2011 reglamentó la restitución de tierras. Los decretos étnicos (4633, 4634 y 4635) establecen medidas diferenciales para comunidades indígenas, ROM y afrocolombianas.',
            },
          ].map((card) => (
            <Grid key={card.titulo} size={{ xs: 12, md: 4 }}>
              <Paper elevation={0} sx={{
                borderRadius: 3, overflow: 'hidden',
                border: `1.5px solid ${card.color}22`, height: '100%',
                display: 'flex', flexDirection: 'column',
              }}>
                <Box sx={{ bgcolor: card.color, px: 2.5, py: 2,
                  display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: 1.5,
                    bgcolor: 'rgba(255,255,255,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Box component="img" src={card.icono} alt=""
                      sx={{ width: 24, height: 24, objectFit: 'contain',
                        filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                    {card.titulo}
                  </Typography>
                </Box>
                <Box sx={{ p: 2.5, flex: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {card.texto}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="text" onClick={() => navigate('/comprendiendo-reparacion')}
            sx={{ color: OV.rojo, fontWeight: 700, gap: 0.75 }}>
            Ver sección completa
            <Box component="img" src={iconoFlecha2} alt=""
              sx={{ width: 16, height: 16, objectFit: 'contain' }} />
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[OV.amarillo, OV.rojo, OV.grisOscuro].map((c) => (
            <Box key={c} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: c }} />
          ))}
        </Box>
      </Divider>

      {/* ══ 4. CONFLICTO ARMADO Y VICTIMIZACIÓN ══════════ */}
      <Box sx={{ mb: 5 }}>
        <SeccionHeader
          icono={iconoBanderas}
          titulo="Conflicto Armado y Victimización en Colombia"
          subtitulo="Contexto y hechos victimizantes reconocidos"
          color={OV.grisOscuro}
        />

        <Paper elevation={0} sx={{
          p: { xs: 2.5, md: 3 }, mb: 3.5, borderRadius: 2.5,
          bgcolor: `${OV.grisOscuro}06`, border: `1.5px solid ${OV.grisMedio}35`,
        }}>
          <Typography variant="body1" sx={{ lineHeight: 1.85, color: OV.grisOscuro }}>
            Colombia vivió décadas de conflicto armado interno que dejó millones de víctimas.
            El Registro Único de Víctimas (RUV) concentra la información de personas que sufrieron
            hechos victimizantes reconocidos por la Ley 1448, ocurridos a partir del 1.° de enero
            de 1985 en el marco del conflicto. La magnitud, complejidad y dispersión territorial
            del fenómeno exige un análisis diferenciado que reconozca las particularidades de cada
            hecho, cada territorio y cada grupo poblacional.
          </Typography>
        </Paper>

        {/* Hechos victimizantes */}
        <Typography variant="subtitle1"
          sx={{ fontWeight: 700, color: OV.grisOscuro, mb: 2 }}>
          Hechos victimizantes reconocidos por la Ley 1448
        </Typography>

        <Grid container spacing={1.5}>
          {HECHOS_VICTIMIZANTES.map((hecho) => (
            <Grid key={hecho.label} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper elevation={0} onClick={() => setHechoSeleccionado(hecho)}
                sx={{
                  p: 2, borderRadius: 2.5, cursor: 'pointer',
                  border: `1.5px solid ${OV.grisMedio}35`,
                  display: 'flex', alignItems: 'center', gap: 1.5,
                  transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.15s',
                  '&:hover': {
                    borderColor: hecho.color,
                    boxShadow: `0 4px 16px ${hecho.color}18`,
                    transform: 'translateY(-2px)',
                  },
                }}>
                <Box sx={{
                  width: 38, height: 38, borderRadius: 2, bgcolor: `${hecho.color}12`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Box component="img" src={hecho.icono} alt=""
                    sx={{ width: 22, height: 22, objectFit: 'contain' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2"
                    sx={{ fontWeight: 600, color: OV.grisOscuro, lineHeight: 1.3, fontSize: '0.82rem' }}>
                    {hecho.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: hecho.color, fontWeight: 700, fontSize: '0.62rem' }}>
                    Ver información ▸
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ── Dialog Hecho Victimizante ───────────────────── */}
      <Dialog open={!!hechoSeleccionado} onClose={() => setHechoSeleccionado(null)}
        maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden' } }}>
        {hechoSeleccionado && (
          <>
            <Box sx={{ height: 5, bgcolor: hechoSeleccionado.color }} />
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pr: 2, pb: 1 }}>
              <Box sx={{
                width: 40, height: 40, borderRadius: 2, bgcolor: `${hechoSeleccionado.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Box component="img" src={hechoSeleccionado.icono} alt=""
                  sx={{ width: 24, height: 24, objectFit: 'contain' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ color: hechoSeleccionado.color, fontWeight: 700, display: 'block', lineHeight: 1 }}>
                  Hecho victimizante · Ley 1448
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: OV.grisOscuro, lineHeight: 1.2 }}>
                  {hechoSeleccionado.label}
                </Typography>
              </Box>
              <IconButton onClick={() => setHechoSeleccionado(null)} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers>
              <Typography variant="body2" sx={{ lineHeight: 1.85, color: OV.grisOscuro, mb: 2.5 }}>
                {hechoSeleccionado.descripcion}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{
                  p: 2, borderRadius: 2,
                  bgcolor: `${hechoSeleccionado.color}08`,
                  border: `1px solid ${hechoSeleccionado.color}25`,
                  display: 'flex', gap: 1.5, alignItems: 'flex-start',
                }}>
                  <Box component="img" src={iconoArchivo} alt=""
                    sx={{ width: 20, height: 20, objectFit: 'contain', flexShrink: 0, mt: 0.1 }} />
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: hechoSeleccionado.color, display: 'block', mb: 0.25 }}>
                      Marco normativo
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.82rem', lineHeight: 1.6 }}>
                      {hechoSeleccionado.norma}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{
                  p: 2, borderRadius: 2,
                  bgcolor: `${OV.amarillo}10`,
                  border: `1px solid ${OV.amarillo}40`,
                  display: 'flex', gap: 1.5, alignItems: 'center',
                }}>
                  <Box component="img" src={iconoPesos} alt=""
                    sx={{ width: 20, height: 20, objectFit: 'contain', flexShrink: 0 }} />
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: OV.amarilloOsc, display: 'block', mb: 0.25 }}>
                      Monto de indemnización aproximado
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: OV.grisOscuro, fontSize: '0.88rem' }}>
                      {hechoSeleccionado.monto}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
              <Button onClick={() => setHechoSeleccionado(null)} variant="contained"
                sx={{ bgcolor: hechoSeleccionado.color, color: '#fff', fontWeight: 700, borderRadius: 2,
                  '&:hover': { bgcolor: OV.rojoOscuro } }}>
                Cerrar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Divider sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[OV.rojo, OV.amarillo, OV.grisOscuro].map((c) => (
            <Box key={c} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: c }} />
          ))}
        </Box>
      </Divider>

      {/* ══ 5. LOS 5 MÓDULOS ══════════════════════════════ */}
      <Box sx={{ mb: 5 }}>
        <SeccionHeader
          icono={iconoFoco}
          titulo="Los 5 Módulos de Análisis"
          subtitulo="Gráficos e indicadores por departamento"
          color={OV.grisOscuro}
        />
        <Grid container spacing={2}>
          {MODULOS_RAPIDOS.map((mod) => (
            <Grid key={mod.titulo} size={{ xs: 12, sm: 6, md: 4 }}>
              <Paper elevation={0} onClick={() => navigate(mod.path)}
                sx={{
                  p: 2, borderRadius: 2.5, cursor: 'pointer',
                  border: `1.5px solid ${mod.color}20`,
                  display: 'flex', alignItems: 'center', gap: 2,
                  transition: 'transform 0.16s, box-shadow 0.16s',
                  '&:hover': { transform: 'translateX(4px)', boxShadow: `0 6px 18px ${mod.color}18` },
                }}>
                <Box sx={{
                  width: 44, height: 44, borderRadius: 2, bgcolor: `${mod.color}12`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Box component="img" src={mod.icono} alt=""
                    sx={{ width: 26, height: 26, objectFit: 'contain' }} />
                </Box>
                <Typography variant="body2"
                  sx={{ fontWeight: 700, color: OV.grisOscuro, lineHeight: 1.3 }}>
                  {mod.titulo}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  );
}
