import { useState } from 'react';
import { Box, Typography, Paper, Grid, Chip, Divider, Link, InputBase } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { OV } from '../../theme';
import BotonVolver   from '../../components/BotonVolver';
import iconoArchivo  from '../../assets/icono_archivo.png';
import iconoBanderas from '../../assets/icono_banderas.png';
import iconoMundo    from '../../assets/icono_mundo.png';
import iconoChat     from '../../assets/icono_chat.png';
import iconoAnuncio  from '../../assets/icono_anuncio.png';
import iconoBusqueda from '../../assets/icono_busqueda.png';

const terminos = [
  { termino: 'RUV',                   definicion: 'Registro Único de Víctimas. Base de datos administrada por la UARIV que contiene la información de todas las personas reconocidas como víctimas del conflicto armado en Colombia.' },
  { termino: 'UARIV',                 definicion: 'Unidad para la Atención y Reparación Integral a las Víctimas. Entidad gubernamental responsable de coordinar, liderar e implementar las políticas de atención, asistencia y reparación integral a las víctimas.' },
  { termino: 'Hecho victimizante',    definicion: 'Acontecimiento sufrido por la víctima como consecuencia directa de infracciones al DIH o de violaciones a las normas internacionales de DDHH, reconocido por la Ley 1448 de 2011.' },
  { termino: 'Indemnización',         definicion: 'Compensación económica que el Estado colombiano otorga a las víctimas del conflicto armado como parte de las medidas de reparación, sin necesidad de acudir a la vía judicial.' },
  { termino: 'Ley 1448 de 2011',      definicion: 'Ley de Víctimas y Restitución de Tierras. Marco normativo que establece medidas de atención, asistencia y reparación integral a las víctimas del conflicto armado interno en Colombia.' },
  { termino: 'DIH',                   definicion: 'Derecho Internacional Humanitario. Conjunto de normas que, por razones humanitarias, tratan de limitar los efectos de los conflictos armados.' },
  { termino: 'Reparación integral',   definicion: 'Conjunto de medidas (restitución, indemnización, rehabilitación, satisfacción y garantías de no repetición) orientadas a restablecer la situación anterior a la violación de derechos.' },
  { termino: 'Contactabilidad',       definicion: 'Capacidad de la entidad para establecer comunicación efectiva con la víctima a efectos de notificarle sobre el estado de sus trámites y el acceso a medidas de reparación.' },
  { termino: 'Barrera de acceso',     definicion: 'Obstáculos de tipo geográfico, administrativo, social o de información que dificultan o impiden que las víctimas accedan al proceso de reclamación y cobro de la indemnización.' },
  { termino: 'SNARIV',               definicion: 'Sistema Nacional de Atención y Reparación Integral a las Víctimas. Conjunto de entidades públicas del nivel gubernamental y estatal que formulan o ejecutan acciones orientadas a la atención y reparación.' },
  { termino: 'Decreto 4800 de 2011',  definicion: 'Decreto reglamentario de la Ley 1448. Establece las disposiciones para la correcta implementación de las medidas de asistencia, atención y reparación contempladas en la Ley de Víctimas.' },
  { termino: 'Fondo para la Reparación', definicion: 'Administrado por la UARIV. Sus recursos provienen de bienes extintos de grupos armados, aportes del Presupuesto General de la Nación y cooperación internacional.' },
];

const enlaces = [
  {
    nombre: 'Unidad para las Víctimas (UARIV)',
    descripcion: 'Entidad del Gobierno Nacional responsable de la atención y reparación integral a las víctimas del conflicto armado.',
    url: 'https://www.unidadvictimas.gov.co',
    icono: iconoBanderas,
    color: OV.rojo,
  },
  {
    nombre: 'Centro Nacional de Memoria Histórica',
    descripcion: 'Entidad estatal especial que recopila, preserva y divulga la memoria histórica del conflicto armado en Colombia.',
    url: 'https://centrodememoriahistorica.gov.co',
    icono: iconoArchivo,
    color: OV.rojoOscuro,
  },
  {
    nombre: 'CISP América Latina',
    descripcion: 'Comitato Internazionale Per Lo Sviluppo Dei Popoli — Oficina para América Latina y el Caribe.',
    url: 'https://www.cispalc.org',
    icono: iconoMundo,
    color: OV.grisOscuro,
  },
];

export default function Glosario() {
  const [busqueda, setBusqueda] = useState('');
  const terminosFiltrados = terminos.filter((t) => {
    const q = busqueda.toLowerCase();
    return t.termino.toLowerCase().includes(q) || t.definicion.toLowerCase().includes(q);
  });

  return (
    <Box>
      <BotonVolver to="/" />

      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Chip label="Términos y recursos" size="small"
          sx={{ mb: 1.5, bgcolor: `${OV.amarillo}20`, color: OV.amarilloOsc, fontWeight: 700 }} />
        <Typography variant="h4" sx={{ fontWeight: 700, color: OV.grisOscuro, mb: 1 }}>
          Glosario y Recursos
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680, lineHeight: 1.8 }}>
          Términos clave del proceso de reparación administrativa y enlaces a entidades de referencia.
        </Typography>
      </Box>

      {/* ── Glosario ─────────────────────────────────── */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
          <Box component="img" src={iconoArchivo} alt=""
            sx={{ width: 28, height: 28, objectFit: 'contain' }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: OV.grisOscuro }}>Glosario de Términos</Typography>
        </Box>

        {/* Filtro de búsqueda */}
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1.25,
          px: 2, py: 1.25, mb: 3,
          border: `1.5px solid ${OV.grisMedio}60`, borderRadius: 2.5,
          bgcolor: '#fff', maxWidth: 480,
          '&:focus-within': { borderColor: OV.amarilloOsc },
          transition: 'border-color 0.15s',
        }}>
          <Box component="img" src={iconoBusqueda} alt=""
            sx={{ width: 18, height: 18, objectFit: 'contain', opacity: 0.45, flexShrink: 0 }} />
          <InputBase
            placeholder="Buscar término o definición…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            fullWidth
            sx={{ fontSize: '0.88rem', color: OV.grisOscuro }}
          />
          {busqueda && (
            <Typography
              variant="caption"
              onClick={() => setBusqueda('')}
              sx={{ color: OV.grisMedio, cursor: 'pointer', flexShrink: 0, fontWeight: 600,
                '&:hover': { color: OV.rojo } }}
            >
              ✕
            </Typography>
          )}
        </Box>

        {terminosFiltrados.length === 0 ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No se encontraron términos para <strong>"{busqueda}"</strong>.
            </Typography>
          </Box>
        ) : (
        <Grid container spacing={2}>
          {terminosFiltrados.map((t) => (
            <Grid key={t.termino} size={{ xs: 12, md: 6 }}>
              <Paper elevation={0}
                sx={{ p: 2.5, borderRadius: 2.5, border: `1.5px solid ${OV.grisMedio}40`, height: '100%' }}>
                <Chip label={t.termino} size="small"
                  sx={{ mb: 1, bgcolor: `${OV.amarillo}18`, color: OV.grisOscuro,
                    fontWeight: 800, fontSize: '0.68rem' }} />
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                  {t.definicion}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        )}
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* ── Alcance del convenio ─────────────────────── */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, height: 28, borderRadius: 2, bgcolor: OV.amarilloOsc }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: OV.grisOscuro }}>Alcance del Convenio</Typography>
        </Box>

        <Paper elevation={0}
          sx={{ p: 3.5, borderRadius: 3, border: `1.5px solid ${OV.amarillo}50`,
            bgcolor: `${OV.amarillo}08` }}>
          <Typography variant="body1" sx={{ lineHeight: 1.85, color: OV.grisOscuro }}>
            El convenio tiene un <strong>alcance operativo y territorial</strong> enfocado en los departamentos
            con mayor concentración de víctimas y con mayores dificultades de acceso al proceso de reparación
            administrativa. Las actividades del observatorio buscan documentar, analizar y visibilizar las
            brechas en el acceso a la indemnización para orientar intervenciones que mejoren el alcance
            territorial de la UARIV y sus aliados institucionales.
          </Typography>
        </Paper>
      </Box>

      {/* ── Contacto y soporte ───────────────────────── */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, height: 28, borderRadius: 2, bgcolor: OV.rojo }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: OV.grisOscuro }}>Canal de Soporte</Typography>
        </Box>

        <Paper elevation={0}
          sx={{ p: 3, borderRadius: 3, border: `1.5px solid ${OV.rojo}20`,
            display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ width: 46, height: 46, borderRadius: 2, bgcolor: `${OV.rojo}12`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Box component="img" src={iconoChat} alt=""
              sx={{ width: 26, height: 26, objectFit: 'contain' }} />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, color: OV.grisOscuro, mb: 0.25 }}>
              Canal oficial de soporte
            </Typography>
            <Link href="mailto:reparacion.individual@cispcolombia.org"
              sx={{ color: OV.rojo, fontWeight: 600, fontSize: '0.9rem',
                textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              reparacion.individual@cispcolombia.org
            </Link>
          </Box>
        </Paper>
      </Box>

      {/* ── Recursos y enlaces ───────────────────────── */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box component="img" src={iconoMundo} alt=""
            sx={{ width: 26, height: 26, objectFit: 'contain' }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: OV.grisOscuro }}>Recursos y Entidades</Typography>
        </Box>

        <Grid container spacing={2.5}>
          {enlaces.map((e) => (
            <Grid key={e.nombre} size={{ xs: 12, md: 4 }}>
              <Paper elevation={0}
                sx={{ p: 3, borderRadius: 3, border: `1.5px solid ${e.color}22`, height: '100%',
                  display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: `${e.color}10`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Box component="img" src={e.icono} alt=""
                      sx={{ width: 24, height: 24, objectFit: 'contain' }} />
                  </Box>
                  <Box sx={{ width: 36, height: 4, borderRadius: 2, bgcolor: e.color }} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: e.color, mb: 0.75 }}>
                  {e.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary"
                  sx={{ lineHeight: 1.7, flex: 1, mb: 2, fontSize: '0.82rem' }}>
                  {e.descripcion}
                </Typography>
                <Link href={e.url} target="_blank" rel="noopener noreferrer"
                  sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: e.color,
                    textDecoration: 'none', fontWeight: 700, fontSize: '0.78rem',
                    '&:hover': { textDecoration: 'underline' } }}>
                  Visitar sitio
                  <OpenInNewIcon sx={{ fontSize: 13 }} />
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
