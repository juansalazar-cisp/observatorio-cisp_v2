import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Button, Chip, Grid, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import ArrowBackIcon      from '@mui/icons-material/ArrowBack';
import RouteIcon          from '@mui/icons-material/Route';
import PictureAsPdfIcon   from '@mui/icons-material/PictureAsPdf';
import DownloadIcon       from '@mui/icons-material/Download';
import AssessmentIcon     from '@mui/icons-material/Assessment';
import HandshakeIcon      from '@mui/icons-material/Handshake';
import GroupsIcon         from '@mui/icons-material/Groups';
import LandscapeIcon      from '@mui/icons-material/Landscape';
import AutoStoriesIcon    from '@mui/icons-material/AutoStories';
import CheckCircleIcon    from '@mui/icons-material/CheckCircle';
import PendingIcon        from '@mui/icons-material/Pending';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import { TT }                from '../../../../theme';
import { useIniciativaById } from '../../../../utils/iniciativasStore';

const galeriaModules = import.meta.glob(
  '../../../../assets/galeria/*.{png,jpg,jpeg,webp,PNG,JPG}',
  { eager: true }
);
const galeriaFotos = Object.values(galeriaModules).map((m) => m.default);

// ── Estado de evaluación ──────────────────────────────────
const estadoConfig = {
  'Cumplido':       { color: '#166534', bg: '#F0FDF4', icon: <CheckCircleIcon sx={{ fontSize: 15 }} /> },
  'En proceso':     { color: '#1D4ED8', bg: '#EFF6FF', icon: <PendingIcon    sx={{ fontSize: 15 }} /> },
  'Por iniciar':    { color: '#6B7280', bg: '#F9FAFB', icon: <RadioButtonUncheckedIcon sx={{ fontSize: 15 }} /> },
  'En riesgo':      { color: '#9A3412', bg: '#FFF7ED', icon: <PendingIcon    sx={{ fontSize: 15 }} /> },
};

const matrizEvaluacion = [
  {
    componente:    'Organización comunitaria',
    indicador:     'Número de asambleas y espacios de gobierno propio realizados',
    meta:          '12 encuentros',
    resultado:     '9 encuentros',
    porcentaje:    75,
    estado:        'En proceso',
    observaciones: 'Se reactivaron 3 cabildos en el período',
  },
  {
    componente:    'Formación y capacitación',
    indicador:     'Personas formadas en liderazgo y derecho propio',
    meta:          '60 personas',
    resultado:     '60 personas',
    porcentaje:    100,
    estado:        'Cumplido',
    observaciones: 'Incluye 40% de mujeres lideresas',
  },
  {
    componente:    'Territorio y medio ambiente',
    indicador:     'Hectáreas con planes de manejo comunitario',
    meta:          '500 ha',
    resultado:     '320 ha',
    porcentaje:    64,
    estado:        'En proceso',
    observaciones: 'Avance en zonas de protección hídrica',
  },
  {
    componente:    'Economía propia',
    indicador:     'Familias con proyectos de economía solidaria activos',
    meta:          '25 familias',
    resultado:     '10 familias',
    porcentaje:    40,
    estado:        'En riesgo',
    observaciones: 'Requiere acompañamiento adicional',
  },
  {
    componente:    'Memoria y cultura',
    indicador:     'Eventos culturales de recuperación de la memoria',
    meta:          '6 eventos',
    resultado:     '6 eventos',
    porcentaje:    100,
    estado:        'Cumplido',
    observaciones: 'Festival de la memoria realizado con 300 participantes',
  },
  {
    componente:    'Articulación institucional',
    indicador:     'Acuerdos o convenios firmados con entidades',
    meta:          '4 acuerdos',
    resultado:     '0 acuerdos',
    porcentaje:    0,
    estado:        'Por iniciar',
    observaciones: 'Proceso de consulta previa en curso',
  },
];

// ── Infografía placeholder ────────────────────────────────
function Infografia({ ini, foto }) {
  const color = ini.colorPrimario;
  const colorS = ini.colorSecundario;

  return (
    <Paper elevation={0} sx={{
      borderRadius: 4, overflow: 'hidden',
      border: `2px solid ${color}20`,
      background: `linear-gradient(145deg, ${TT.marino} 0%, #2a2e5a 100%)`,
      position: 'relative',
    }}>
      {/* Banda tricolor superior */}
      <Box sx={{ height: 6, background: `linear-gradient(90deg, ${TT.naranja} 0%, ${TT.verde} 50%, TT.purpura 100%)`,
        background: `linear-gradient(90deg, ${TT.naranja}, ${TT.verde}, ${TT.purpura})` }} />

      <Box sx={{ p: { xs: 3, md: 4 } }}>
        {/* Encabezado */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, mb: 3.5 }}>
          {foto && (
            <Box component="img" src={foto} alt=""
              sx={{ width: 80, height: 80, borderRadius: 2, objectFit: 'cover',
                border: `3px solid ${color}`, flexShrink: 0 }} />
          )}
          <Box>
            <Chip label={`#${String(ini.id).padStart(2,'0')} · ${ini.tipo}`} size="small"
              sx={{ mb: 1, bgcolor: `${color}30`, color: TT.crema, fontWeight: 700, fontSize: '0.65rem' }} />
            <Typography variant="h5" sx={{ fontFamily: '"Fraunces", serif', fontWeight: 700, color: '#fff',
              lineHeight: 1.2, mb: 0.5 }}>
              {ini.nombre}
            </Typography>
            <Typography variant="body2" sx={{ color: TT.crema, opacity: 0.85 }}>
              {ini.comunidad} · {ini.organizacion}
            </Typography>
          </Box>
        </Box>

        {/* Cuatro bloques de datos */}
        <Grid container spacing={1.5} sx={{ mb: 3 }}>
          {[
            { icono: <LandscapeIcon sx={{ fontSize: 18 }} />, etiqueta: 'Región',       valor: ini.region },
            { icono: <GroupsIcon    sx={{ fontSize: 18 }} />, etiqueta: 'Comunidad',    valor: ini.comunidad },
            { icono: <RouteIcon     sx={{ fontSize: 18 }} />, etiqueta: 'Línea',        valor: ini.linea },
            { icono: <HandshakeIcon sx={{ fontSize: 18 }} />, etiqueta: 'Organización', valor: ini.organizacion },
          ].map((item) => (
            <Grid key={item.etiqueta} size={{ xs: 6 }}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5, color: color }}>
                  {item.icono}
                  <Typography variant="caption" sx={{ color, fontWeight: 700, fontSize: '0.6rem',
                    textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {item.etiqueta}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600, lineHeight: 1.2,
                  fontSize: '0.78rem' }}>
                  {item.valor}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Descripción breve */}
        <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.06)',
          border: `1px solid ${color}30` }}>
          <Typography variant="caption" sx={{ color: TT.crema, lineHeight: 1.75, display: 'block',
            fontSize: '0.78rem', opacity: 0.9 }}>
            {ini.descripcion.slice(0, 200)}…
          </Typography>
        </Box>

        {/* ODS */}
        <Box sx={{ display: 'flex', gap: 0.75, mt: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '0.62rem' }}>
            ODS relacionados:
          </Typography>
          {ini.ods.map((o) => (
            <Chip key={o} label={o} size="small"
              sx={{ height: 18, fontSize: '0.6rem', bgcolor: `${colorS}30`, color: TT.crema, fontWeight: 700 }} />
          ))}
        </Box>
      </Box>

      {/* Marca de agua — ícono grande */}
      <RouteIcon sx={{ position: 'absolute', right: -20, bottom: -20,
        fontSize: 160, color: 'rgba(255,255,255,0.04)' }} />

      <Box sx={{ px: 4, pb: 2, pt: 0 }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem' }}>
          Infografía preliminar · será reemplazada por diseño definitivo
        </Typography>
      </Box>
    </Paper>
  );
}

// ── Botón PDF grande ──────────────────────────────────────
function BotonPDF({ titulo, subtitulo, color, url, icono }) {
  const disponible = Boolean(url);
  return (
    <Paper
      elevation={0}
      component={disponible ? 'a' : 'div'}
      href={disponible ? url : undefined}
      target="_blank" rel="noopener noreferrer"
      onClick={undefined}
      sx={{
        p: 3, borderRadius: 3, textAlign: 'center',
        border: `1.5px solid ${color}${disponible ? '40' : '20'}`,
        bgcolor: `${color}06`,
        opacity: disponible ? 1 : 0.75,
        textDecoration: 'none',
        cursor: disponible ? 'pointer' : 'default',
        transition: 'transform 0.18s, box-shadow 0.18s',
        display: 'block',
        ...(disponible && {
          '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 10px 28px ${color}20` },
        }),
      }}
    >
      <Box sx={{ width: 56, height: 56, borderRadius: 2, bgcolor: `${color}15`,
        border: `2px solid ${color}25`, mx: 'auto', mb: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icono}
      </Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, color, mb: 0.5, lineHeight: 1.2 }}>
        {titulo}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', mb: 2, lineHeight: 1.5 }}>
        {subtitulo}
      </Typography>
      <Chip
        label={disponible ? 'Descargar PDF' : 'Próximamente'}
        icon={disponible ? <DownloadIcon sx={{ fontSize: '0.8rem !important' }} /> : undefined}
        size="small"
        sx={{
          bgcolor: disponible ? `${color}15` : '#f5f5f5',
          color: disponible ? color : 'text.disabled',
          fontWeight: 700, fontSize: '0.7rem',
        }}
      />
    </Paper>
  );
}

export default function EntretejienodoCaminos() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const ini      = useIniciativaById(id);

  if (!ini) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography color="text.secondary">Iniciativa no encontrada</Typography>
      <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>Volver</Button>
    </Box>
  );

  const foto      = galeriaFotos[ini.imagenIndex] || null;
  const colorMod  = '#1C1F3A';

  return (
    <Box>
      {/* Botón volver */}
      <Button startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/iniciativas-comunitarias/iniciativa/${id}`)}
        sx={{ mb: 2.5, color: ini.colorPrimario, fontWeight: 700, borderRadius: 2 }}>
        Volver a la Iniciativa
      </Button>

      {/* ── Banner ─────────────────────────────────────────── */}
      <Paper elevation={0} sx={{
        mb: 5, borderRadius: 3, overflow: 'hidden', position: 'relative',
        background: `linear-gradient(135deg, ${colorMod}ee 0%, #2a2e5a 100%)`,
        minHeight: { xs: 140, md: 180 }, display: 'flex', alignItems: 'stretch',
      }}>
        {foto && (
          <Box component="img" src={foto} alt=""
            sx={{ width: { xs: 110, sm: 160, md: 210 }, flexShrink: 0, objectFit: 'cover', opacity: 0.65 }} />
        )}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(90deg, ${TT.naranja}, ${TT.verde}, ${TT.purpura})` }} />
        <Box sx={{ flex: 1, px: { xs: 2.5, md: 4 }, py: 3, position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <RouteIcon sx={{ color: '#fff', fontSize: 22 }} />
            </Box>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2,
              fontSize: { xs: '1.2rem', sm: '1.6rem', md: '1.9rem' } }}>
              Entretejiendo Caminos
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.88)' }}>
            {ini.nombre} · {ini.comunidad}
          </Typography>
        </Box>
      </Paper>

      {/* ── 1. Resumen con infografía ────────────────────────── */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, minHeight: 28, borderRadius: 2, bgcolor: ini.colorPrimario, flexShrink: 0, mt: 0.5 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Resumen de la Iniciativa
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              Ficha de identificación e infografía de la iniciativa
            </Typography>
          </Box>
        </Box>
        <Infografia ini={ini} foto={foto} />
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* ── 2. Seguimiento y evaluación ──────────────────────── */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, minHeight: 28, borderRadius: 2, bgcolor: TT.naranja, flexShrink: 0, mt: 0.5 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Seguimiento y Evaluación de la Iniciativa
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              Matriz de indicadores y estado de avance por componente
            </Typography>
          </Box>
        </Box>

        {/* Descripción */}
        <Paper elevation={0} sx={{ p: 2.5, mb: 3, borderRadius: 3,
          bgcolor: `${TT.naranja}06`, borderLeft: `4px solid ${TT.naranja}` }}>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
            El seguimiento y evaluación de la iniciativa se realiza de forma participativa,
            con la comunidad como protagonista del proceso de medición. Se evalúan seis
            componentes estratégicos: organización comunitaria, formación, territorio, economía
            propia, memoria cultural y articulación institucional. Cada componente cuenta con
            indicadores concretos, metas acordadas y mecanismos de verificación definidos
            colectivamente en minga.
          </Typography>
        </Paper>

        {/* Matriz */}
        <TableContainer component={Paper} elevation={0}
          sx={{ borderRadius: 3, border: `1px solid ${TT.naranja}20`, overflow: 'hidden' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ background: `linear-gradient(90deg, ${TT.marino} 0%, #2a2e5a 100%)` }}>
                {['Componente', 'Indicador', 'Meta', 'Resultado', 'Avance', 'Estado', 'Observaciones'].map((h) => (
                  <TableCell key={h} sx={{ color: '#fff', fontWeight: 700, fontSize: '0.72rem',
                    whiteSpace: 'nowrap', py: 1.5, borderBottom: 'none' }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {matrizEvaluacion.map((row, index) => {
                const ec = estadoConfig[row.estado] || estadoConfig['Por iniciar'];
                const pct = row.porcentaje;
                const barColor = pct === 100 ? TT.verde : pct >= 60 ? TT.naranja : pct >= 30 ? '#FFB600' : TT.rojo;
                return (
                  <TableRow key={row.componente}
                    sx={{ bgcolor: index % 2 === 0 ? '#fafaf7' : '#fff',
                      '&:hover': { bgcolor: `${TT.naranja}06` },
                      transition: 'background-color 0.15s' }}>
                    <TableCell sx={{ fontWeight: 700, color: TT.marino, fontSize: '0.78rem',
                      minWidth: 140, py: 1.75, borderBottom: `1px solid ${TT.naranja}10` }}>
                      {row.componente}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.75rem', color: 'text.secondary', minWidth: 200,
                      lineHeight: 1.4, borderBottom: `1px solid ${TT.naranja}10` }}>
                      {row.indicador}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'text.primary',
                      whiteSpace: 'nowrap', borderBottom: `1px solid ${TT.naranja}10` }}>
                      {row.meta}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.75rem', fontWeight: 600, color: TT.marino,
                      whiteSpace: 'nowrap', borderBottom: `1px solid ${TT.naranja}10` }}>
                      {row.resultado}
                    </TableCell>
                    {/* Barra de avance */}
                    <TableCell sx={{ minWidth: 100, borderBottom: `1px solid ${TT.naranja}10` }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ flex: 1, height: 6, borderRadius: 3, bgcolor: `${barColor}20`, overflow: 'hidden' }}>
                          <Box sx={{ width: `${pct}%`, height: '100%', bgcolor: barColor, borderRadius: 3,
                            transition: 'width 0.6s ease' }} />
                        </Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: barColor,
                          minWidth: 32, textAlign: 'right', fontSize: '0.7rem' }}>
                          {pct}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: `1px solid ${TT.naranja}10` }}>
                      <Chip
                        label={row.estado}
                        icon={<Box sx={{ color: `${ec.color} !important`, display: 'flex' }}>{ec.icon}</Box>}
                        size="small"
                        sx={{ height: 22, fontSize: '0.62rem', fontWeight: 700,
                          bgcolor: ec.bg, color: ec.color, border: `1px solid ${ec.color}25` }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.72rem', color: 'text.secondary', minWidth: 180,
                      lineHeight: 1.4, borderBottom: `1px solid ${TT.naranja}10` }}>
                      {row.observaciones}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 1, fontSize: '0.65rem' }}>
          Matriz con datos preliminares — será actualizada con la información del seguimiento en campo.
        </Typography>
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* ── 3. Documentos clave ──────────────────────────────── */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, minHeight: 28, borderRadius: 2, bgcolor: TT.verde, flexShrink: 0, mt: 0.5 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            Documentos de la Iniciativa
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <BotonPDF
              titulo="Ficha Técnica Inicial"
              subtitulo="Caracterización y planificación de la iniciativa al inicio del proceso"
              color={TT.verde}
              url={null}
              icono={<PictureAsPdfIcon sx={{ color: TT.verde, fontSize: 28 }} />}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <BotonPDF
              titulo="Informe Técnico Final"
              subtitulo="Resultados, logros, lecciones aprendidas y recomendaciones del proceso"
              color={TT.naranja}
              url={null}
              icono={<AssessmentIcon sx={{ color: TT.naranja, fontSize: 28 }} />}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
