import { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Chip, Divider,
  Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { OV } from '../../theme';
import BotonVolver from '../../components/BotonVolver';
import iconoPonencia   from '../../assets/icono_ponencia.png';
import iconoPonencia2  from '../../assets/icono_ponencia2.png';
import iconoPesos      from '../../assets/icono_pesos.png';
import iconoCiclo      from '../../assets/icono_ciclo.png';
import iconoArchivo    from '../../assets/icono_archivo.png';
import iconoBusqueda   from '../../assets/icono_busqueda.png';
import iconoAnuncio    from '../../assets/icono_anuncio.png';
import iconoBanderas   from '../../assets/icono_banderas.png';

const derechosVictimas = [
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

const etapas = [
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
    titulo: 'Indemnización',
    desc: 'Pago del monto de indemnización definido por el Gobierno Nacional según el hecho victimizante y la condición de vulnerabilidad.',
    icono: iconoPesos,
    actor: 'UARIV · Min. Hacienda',
    color: OV.rojo,
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

function TarjetaEtapa({ etapa }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Box
      onClick={() => setFlipped((f) => !f)}
      sx={{
        perspective: '900px',
        cursor: 'pointer',
        flexShrink: 0,
        width: { xs: 148, md: 'calc(16.66% - 10px)' },
        minWidth: 130,
        height: 210,
        userSelect: 'none',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.55s cubic-bezier(.4,0,.2,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── Frente ── */}
        <Box
          sx={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: 3,
            border: `2px solid ${etapa.color}22`,
            bgcolor: '#fff',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 0.75, p: 1.5,
            boxShadow: `0 2px 8px ${etapa.color}12`,
          }}
        >
          <Box sx={{
            width: 36, height: 36, borderRadius: '50%',
            bgcolor: etapa.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.75rem' }}>
              {etapa.num}
            </Typography>
          </Box>
          <Box component="img" src={etapa.icono} alt=""
            sx={{ width: 30, height: 30, objectFit: 'contain' }} />
          <Typography
            sx={{ fontWeight: 700, color: OV.grisOscuro, textAlign: 'center', lineHeight: 1.3, fontSize: '0.74rem' }}>
            {etapa.titulo}
          </Typography>
          <Typography
            sx={{ color: etapa.color, fontSize: '0.58rem', fontWeight: 600, textAlign: 'center', lineHeight: 1.4 }}>
            {etapa.actor}
          </Typography>
          <Typography sx={{ color: OV.grisMedio, fontSize: '0.57rem', mt: 0.5 }}>
            Toca para más info ▸
          </Typography>
        </Box>

        {/* ── Reverso ── */}
        <Box
          sx={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 3,
            bgcolor: etapa.color,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            p: 2,
          }}
        >
          <Typography
            sx={{ color: '#fff', textAlign: 'center', lineHeight: 1.65, fontSize: '0.74rem', fontWeight: 500 }}>
            {etapa.desc}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function ComprendiendoReparacion() {
  return (
    <Box>
      <BotonVolver to="/" />

      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Chip label="Marco normativo · Ley 1448 de 2011" size="small"
          sx={{ mb: 1.5, bgcolor: `${OV.rojo}12`, color: OV.rojo, fontWeight: 700 }} />
        <Typography variant="h4" sx={{ fontWeight: 700, color: OV.grisOscuro, mb: 1 }}>
          Comprendiendo la Reparación
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, lineHeight: 1.8 }}>
          La Ley 1448 de 2011 —Ley de Víctimas y Restitución de Tierras— es el principal instrumento normativo
          que establece las medidas de atención, asistencia y reparación integral a las víctimas del conflicto
          armado interno en Colombia.
        </Typography>
      </Box>

      {/* ── Derechos de las Víctimas ──────────────────── */}
      <Box sx={{ mb: 5 }}>
        {/* Encabezado de sección */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Box sx={{
            width: 48, height: 48, borderRadius: 2, bgcolor: `${OV.rojo}12`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.25,
          }}>
            <Box component="img" src={iconoPonencia} alt="" sx={{ width: 28, height: 28, objectFit: 'contain' }} />
          </Box>
          <Box>
            <Box sx={{ width: 40, height: 4, bgcolor: OV.rojo, borderRadius: 2, mb: 0.75 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: OV.grisOscuro, lineHeight: 1.2 }}>
              Derechos de las Víctimas
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
              Pilares del proceso de justicia transicional en Colombia
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2.5}>
          {derechosVictimas.map((d) => (
            <Grid key={d.titulo} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper elevation={0} sx={{
                borderRadius: 3, overflow: 'hidden',
                border: `1.5px solid ${d.color}22`, height: '100%',
                display: 'flex', flexDirection: 'column',
              }}>
                {/* Cabecera coloreada */}
                <Box sx={{
                  bgcolor: d.color, px: 2.5, py: 2,
                  display: 'flex', alignItems: 'center', gap: 1.5,
                }}>
                  <Box sx={{
                    width: 40, height: 40, borderRadius: 1.5,
                    bgcolor: 'rgba(255,255,255,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Box component="img" src={d.icono} alt=""
                      sx={{ width: 24, height: 24, objectFit: 'contain',
                        filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                    {d.titulo}
                  </Typography>
                </Box>
                {/* Cuerpo */}
                <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, flex: 1 }}>
                    {d.texto}
                  </Typography>
                  {d.esReparacion && (
                    <Chip
                      label="Incluye indemnización administrativa"
                      size="small"
                      sx={{ alignSelf: 'flex-start', bgcolor: `${OV.amarillo}25`, color: OV.amarilloOsc, fontWeight: 700, fontSize: '0.7rem' }}
                    />
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* ── Indemnización administrativa ─────────────── */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, height: 28, borderRadius: 2, bgcolor: OV.amarilloOsc }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
            La Indemnización Administrativa
          </Typography>
        </Box>

        <Paper elevation={0}
          sx={{ p: 3.5, borderRadius: 3, border: `1.5px solid ${OV.amarillo}50`,
            bgcolor: `${OV.amarillo}08`, mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Box component="img" src={iconoPesos} alt=""
              sx={{ width: 40, height: 40, objectFit: 'contain', flexShrink: 0, mt: 0.5 }} />
            <Typography variant="body1" sx={{ lineHeight: 1.85, color: OV.grisOscuro }}>
              La <strong>indemnización administrativa</strong> es una de las medidas de reparación contempladas en
              la Ley 1448. Consiste en un pago económico que el Estado entrega a las víctimas por los hechos
              victimizantes sufridos. El monto varía según el hecho, la vulnerabilidad de la víctima y los
              recursos disponibles del Fondo para la Reparación de las Víctimas.
            </Typography>
          </Box>
        </Paper>

        {/* Etapas — flip cards en una fila */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
          <Box component="img" src={iconoCiclo} alt=""
            sx={{ width: 24, height: 24, objectFit: 'contain' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
            Etapas del Proceso de Reparación
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            overflowX: 'auto',
            pb: 1.5,
            '&::-webkit-scrollbar': { height: 4 },
            '&::-webkit-scrollbar-track': { bgcolor: `${OV.grisMedio}20`, borderRadius: 2 },
            '&::-webkit-scrollbar-thumb': { bgcolor: OV.grisMedio, borderRadius: 2 },
          }}
        >
          {etapas.map((e) => <TarjetaEtapa key={e.num} etapa={e} />)}
        </Box>
      </Box>

      {/* ── Información sobre el Conflicto y la Victimización ── */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, height: 28, borderRadius: 2, bgcolor: OV.rojo }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
            Información sobre el Conflicto y la Victimización
          </Typography>
        </Box>

        {[
          {
            q: '¿Quién es considerado víctima según la Ley 1448?',
            a: 'Son víctimas las personas que individual o colectivamente hayan sufrido un daño por hechos ocurridos a partir del 1° de enero de 1985, como consecuencia de infracciones al DIH o de violaciones graves y manifiestas a las normas internacionales de DDHH.',
          },
          {
            q: '¿Cuáles son los hechos victimizantes reconocidos?',
            a: 'La ley reconoce múltiples hechos victimizantes: desplazamiento forzado, homicidio, desaparición forzada, secuestro, reclutamiento ilícito, tortura, lesiones personales, delitos contra la libertad e integridad sexual, entre otros.',
          },
          {
            q: '¿Qué es la UARIV y cuál es su papel?',
            a: 'La Unidad para la Atención y Reparación Integral a las Víctimas (UARIV) es la entidad responsable de coordinar las políticas de atención, asistencia y reparación a las víctimas en Colombia.',
          },
        ].map((item) => (
          <Accordion key={item.q} elevation={0}
            sx={{ mb: 1.5, border: `1.5px solid ${OV.grisMedio}50`, borderRadius: '10px !important' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: OV.rojo }} />}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: OV.grisOscuro }}>
                {item.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {item.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
