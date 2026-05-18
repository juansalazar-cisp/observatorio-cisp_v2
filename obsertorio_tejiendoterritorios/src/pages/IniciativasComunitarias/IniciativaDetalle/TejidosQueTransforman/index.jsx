import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Button, Chip, Grid, Divider, IconButton,
} from '@mui/material';
import ArrowBackIcon      from '@mui/icons-material/ArrowBack';
import AutoAwesomeIcon    from '@mui/icons-material/AutoAwesome';
import PlayCircleIcon     from '@mui/icons-material/PlayCircle';
import PictureAsPdfIcon   from '@mui/icons-material/PictureAsPdf';
import DownloadIcon       from '@mui/icons-material/Download';
import OpenInNewIcon      from '@mui/icons-material/OpenInNew';
import AssessmentIcon     from '@mui/icons-material/Assessment';
import FlagIcon           from '@mui/icons-material/Flag';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckCircleIcon    from '@mui/icons-material/CheckCircle';

// Íconos de herramientas dinámicos
import TableChartIcon  from '@mui/icons-material/TableChart';
import DescriptionIcon from '@mui/icons-material/Description';
import ScheduleIcon    from '@mui/icons-material/Schedule';
import FolderOpenIcon  from '@mui/icons-material/FolderOpen';
import AnalyticsIcon   from '@mui/icons-material/Analytics';

import { TT }                 from '../../../../theme';
import { useIniciativaById }  from '../../../../utils/iniciativasStore';
import herramientas           from '../../../../data/herramientasIniciativa';
import hitosData              from '../../../../data/hitosIniciativa';

const galeriaModules = import.meta.glob(
  '../../../../assets/galeria/*.{png,jpg,jpeg,webp,PNG,JPG}',
  { eager: true }
);
const galeriaFotos = Object.values(galeriaModules).map((m) => m.default);

// Mapeo de nombre de ícono → componente
const ICON_MAP = {
  TableChart:  TableChartIcon,
  Description: DescriptionIcon,
  Schedule:    ScheduleIcon,
  FolderOpen:  FolderOpenIcon,
  Analytics:   AnalyticsIcon,
};

// Color por categoría de herramienta
const categoriaColor = {
  'Seguimiento': TT.naranja,
  'Registro':    TT.verde,
  'Archivo':     TT.purpura,
  'Evaluación':  '#1C1F3A',
};

// Formatea fecha 'YYYY-MM-DD' → 'Feb 2024'
function formatFecha(iso) {
  const [y, m] = iso.split('-');
  const meses  = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return `${meses[parseInt(m, 10) - 1]} ${y}`;
}

// ── Línea de tiempo ───────────────────────────────────────
function LineaTiempo({ color }) {
  const { hitos } = hitosData;

  const tipoIcon = (tipo) => {
    if (tipo === 'inicio') return <FlagIcon sx={{ fontSize: 18, color: '#fff' }} />;
    if (tipo === 'cierre') return <CheckCircleIcon sx={{ fontSize: 18, color: '#fff' }} />;
    return <RadioButtonCheckedIcon sx={{ fontSize: 18, color: '#fff' }} />;
  };

  const tipoBg = (tipo) => {
    if (tipo === 'inicio') return TT.verde;
    if (tipo === 'cierre') return TT.rojo;
    return color;
  };

  return (
    <Box sx={{ position: 'relative', pl: { xs: 5, sm: 7 } }}>
      {/* Línea vertical continua */}
      <Box sx={{
        position: 'absolute', left: { xs: 18, sm: 26 }, top: 16, bottom: 16,
        width: 2, bgcolor: `${color}25`, borderRadius: 2,
      }} />

      {hitos.map((hito, index) => {
        const bg = tipoBg(hito.tipo);
        return (
          <Box key={hito.id} sx={{ display: 'flex', gap: 2.5, mb: index < hitos.length - 1 ? 3 : 0,
            position: 'relative' }}>
            {/* Círculo del hito */}
            <Box sx={{
              position: 'absolute', left: { xs: -38, sm: -46 },
              width: 36, height: 36, borderRadius: '50%',
              bgcolor: bg, border: `3px solid #fff`,
              boxShadow: `0 2px 8px ${bg}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, zIndex: 1,
            }}>
              {tipoIcon(hito.tipo)}
            </Box>

            {/* Contenido */}
            <Paper elevation={0} sx={{
              flex: 1, p: 2.5, borderRadius: 2.5,
              border: `1.5px solid ${bg}20`,
              bgcolor: `${bg}06`,
              transition: 'box-shadow 0.18s',
              '&:hover': { boxShadow: `0 4px 16px ${bg}15` },
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                gap: 1, mb: 0.75, flexWrap: 'wrap' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: bg, lineHeight: 1.2 }}>
                  {hito.titulo}
                </Typography>
                <Chip label={formatFecha(hito.fecha)} size="small"
                  sx={{ height: 20, fontSize: '0.62rem', fontWeight: 700,
                    bgcolor: `${bg}15`, color: bg, flexShrink: 0 }} />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.82rem' }}>
                {hito.descripcion}
              </Typography>
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
}

export default function TejidosQueTransforman() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const ini      = useIniciativaById(id);

  if (!ini) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography color="text.secondary">Iniciativa no encontrada</Typography>
      <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>Volver</Button>
    </Box>
  );

  const foto     = galeriaFotos[ini.imagenIndex] || null;
  const colorMod = TT.rojo;

  return (
    <Box>
      {/* Botón volver */}
      <Button startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/iniciativas-comunitarias/iniciativa/${id}`)}
        sx={{ mb: 2.5, color: colorMod, fontWeight: 700, borderRadius: 2 }}>
        Volver a la Iniciativa
      </Button>

      {/* ── Banner ─────────────────────────────────────────── */}
      <Paper elevation={0} sx={{
        mb: 5, borderRadius: 3, overflow: 'hidden', position: 'relative',
        background: `linear-gradient(135deg, ${colorMod}ee 0%, ${colorMod}88 100%)`,
        minHeight: { xs: 140, md: 180 }, display: 'flex', alignItems: 'stretch',
      }}>
        {foto && (
          <Box component="img" src={foto} alt=""
            sx={{ width: { xs: 110, sm: 160, md: 210 }, flexShrink: 0, objectFit: 'cover', opacity: 0.75 }} />
        )}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(90deg, ${TT.naranja}, ${TT.verde}, ${TT.purpura})` }} />
        <Box sx={{ flex: 1, px: { xs: 2.5, md: 4 }, py: 3, position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AutoAwesomeIcon sx={{ color: '#fff', fontSize: 22 }} />
            </Box>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2,
              fontSize: { xs: '1.2rem', sm: '1.6rem', md: '1.9rem' } }}>
              Tejidos que Transforman
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.88)' }}>
            {ini.nombre} · {ini.comunidad}
          </Typography>
        </Box>
      </Paper>

      {/* ── 1. ¿Por qué y para qué? — Video ─────────────────── */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, minHeight: 28, borderRadius: 2, bgcolor: colorMod, flexShrink: 0, mt: 0.5 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              ¿Por qué y para qué mi Iniciativa?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              Video de presentación — URL pendiente
            </Typography>
          </Box>
        </Box>

        {/* Placeholder de video */}
        <Box sx={{
          width: '100%', maxWidth: 860, mx: 'auto', aspectRatio: '16/7',
          borderRadius: 3, overflow: 'hidden',
          bgcolor: TT.marino, position: 'relative',
          border: `2px solid ${colorMod}25`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 2,
        }}>
          {/* Gradiente radial decorativo */}
          <Box sx={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at center, ${colorMod}20 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          {/* Cuadrícula sutil */}
          <Box sx={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)',
            pointerEvents: 'none',
          }} />
          {/* Banda tricolor superior */}
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${TT.naranja}, ${TT.verde}, ${TT.purpura})` }} />

          <PlayCircleIcon sx={{ fontSize: 72, color: colorMod, opacity: 0.5, position: 'relative', zIndex: 1 }} />
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1, px: 3 }}>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, mb: 0.5 }}>
              Video de la Iniciativa
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)' }}>
              {ini.nombre}
            </Typography>
          </Box>
          <Chip label="URL del video pendiente" size="small"
            sx={{ position: 'relative', zIndex: 1, bgcolor: `${colorMod}25`,
              color: colorMod, fontWeight: 600, fontSize: '0.65rem',
              border: `1px solid ${colorMod}40` }} />
        </Box>
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* ── 2. Herramientas ──────────────────────────────────── */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, minHeight: 28, borderRadius: 2, bgcolor: TT.naranja, flexShrink: 0, mt: 0.5 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Herramientas
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              Documentos e instrumentos de apoyo para la gestión de la iniciativa
            </Typography>
          </Box>
        </Box>

        <Paper elevation={0} sx={{ borderRadius: 3, border: `1px solid ${TT.naranja}20`, overflow: 'hidden' }}>
          {herramientas.map((doc, index) => {
            const Icon       = ICON_MAP[doc.icono] || DescriptionIcon;
            const catColor   = categoriaColor[doc.categoria] || TT.naranja;
            const disponible = Boolean(doc.url);
            return (
              <Box key={doc.id} sx={{
                display: 'flex', alignItems: 'center', gap: 2,
                px: 2.5, py: 2,
                borderBottom: index < herramientas.length - 1 ? `1px solid ${TT.naranja}10` : 'none',
                opacity: disponible ? 1 : 0.82,
                transition: 'background-color 0.15s',
                '&:hover': { bgcolor: `${catColor}06` },
              }}>
                {/* Ícono */}
                <Box sx={{
                  width: 44, height: 44, borderRadius: 2, flexShrink: 0,
                  bgcolor: `${catColor}12`, border: `1.5px solid ${catColor}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon sx={{ color: catColor, fontSize: 22 }} />
                </Box>

                {/* Texto */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: TT.marino,
                    lineHeight: 1.3, mb: 0.3 }}>
                    {doc.titulo}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4,
                    display: 'block', fontSize: '0.72rem' }}>
                    {doc.descripcion}
                  </Typography>
                  <Chip label={doc.categoria} size="small" sx={{ mt: 0.5, height: 18, fontSize: '0.6rem',
                    fontWeight: 600, bgcolor: `${catColor}10`, color: catColor }} />
                </Box>

                {/* Botón descarga */}
                <IconButton
                  size="small"
                  href={doc.url || undefined}
                  target="_blank" rel="noopener noreferrer"
                  disabled={!disponible}
                  title={disponible ? 'Descargar documento' : 'Próximamente'}
                  sx={{ color: catColor, flexShrink: 0,
                    '&.Mui-disabled': { color: 'text.disabled' } }}
                >
                  {disponible ? <OpenInNewIcon fontSize="small" /> : <PictureAsPdfIcon fontSize="small" />}
                </IconButton>
              </Box>
            );
          })}
        </Paper>
        <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 1, fontSize: '0.65rem' }}>
          Para agregar documentos, edita el archivo src/data/herramientasIniciativa.js
        </Typography>
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* ── 3. Rememoro el proceso ───────────────────────────── */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 4 }}>
          <Box sx={{ width: 5, minHeight: 28, borderRadius: 2, bgcolor: TT.verde, flexShrink: 0, mt: 0.5 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Rememoro el Proceso
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              Línea de tiempo de la iniciativa · inicio: {formatFecha(hitosData.fechaInicio)}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4} alignItems="flex-start">
          {/* Informe final */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={0} sx={{
              p: 3, borderRadius: 3, textAlign: 'center',
              border: `1.5px solid ${TT.verde}25`,
              bgcolor: `${TT.verde}06`,
              height: '100%',
            }}>
              <Box sx={{ width: 60, height: 60, borderRadius: 2.5, bgcolor: `${TT.verde}15`,
                border: `2px solid ${TT.verde}25`, mx: 'auto', mb: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AssessmentIcon sx={{ color: TT.verde, fontSize: 30 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: TT.verde, mb: 1, lineHeight: 1.2 }}>
                Informe Final
              </Typography>
              <Typography variant="body2" color="text.secondary"
                sx={{ lineHeight: 1.75, mb: 2.5, fontSize: '0.82rem' }}>
                Documento que recoge los resultados, logros, dificultades y aprendizajes del proceso completo
                de la iniciativa desde su arranque hasta el cierre.
              </Typography>
              <Button
                variant="outlined" fullWidth
                startIcon={<DownloadIcon />}
                disabled
                sx={{
                  borderColor: TT.verde, color: TT.verde, borderRadius: 2, fontWeight: 700,
                  '&.Mui-disabled': { borderColor: `${TT.verde}35`, color: `${TT.verde}55` },
                }}
              >
                Descargar informe
              </Button>
              <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.75, fontSize: '0.65rem' }}>
                Próximamente
              </Typography>
            </Paper>
          </Grid>

          {/* Línea de tiempo */}
          <Grid size={{ xs: 12, md: 8 }}>
            <LineaTiempo color={ini.colorPrimario} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
