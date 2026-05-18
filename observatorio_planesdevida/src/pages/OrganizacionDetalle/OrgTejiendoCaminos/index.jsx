import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Chip, Divider, Paper, Card, CardActionArea } from '@mui/material';
import ArrowBackIcon      from '@mui/icons-material/ArrowBack';
import BarChartIcon       from '@mui/icons-material/BarChart';
import RouteIcon          from '@mui/icons-material/Route';
import PictureAsPdfIcon   from '@mui/icons-material/PictureAsPdf';

import { useOrgData } from '../../../utils/orgData';
import fondo4         from '../../../assets/fondo4.png';
import imaginario2    from '../../../assets/imaginario2.png';

const regionLabel = { andina: 'Andina', caribe: 'Caribe', pacifica: 'Pacífica', amazonica: 'Amazónica', orinoquia: 'Orinoquía' };

export default function OrgTejiendoCaminos() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const org = useOrgData(slug);

  if (!org) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h5" color="text.secondary">Organización no encontrada</Typography>
      <Button onClick={() => navigate('/visualizacion')} sx={{ mt: 2 }}>Volver</Button>
    </Box>
  );

  const color = org.colores.primario;

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(`/org/${slug}`)} sx={{ mb: 3, color, fontWeight: 700 }}>
        Volver al Plan de Vida
      </Button>

      {/* Banner */}
      <Paper elevation={0} sx={{ mb: 5, px: { xs: 3, md: 4 }, py: 3.5, borderRadius: 3, overflow: 'hidden', background: `linear-gradient(135deg, ${color}dd 0%, ${org.colores.secundario}99 100%)`, position: 'relative' }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${fondo4})`, backgroundSize: 'cover', opacity: 0.1 }} />
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
          <Box component="img" src={imaginario2} alt="" sx={{ width: 60, opacity: 0.5, filter: 'brightness(10)', flexShrink: 0 }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Chip label={org.etiqueta} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.25)', color: '#fff', fontWeight: 700, fontSize: '0.7rem' }} />
              <Chip label={regionLabel[org.region]} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.7rem' }} />
            </Box>
            <Typography variant="h4" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: '#fff', lineHeight: 1.2, mb: 0.5 }}>Tejiendo Caminos</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', maxWidth: 600 }}>
              Diagnóstico organizativo y rutas de fortalecimiento para {org.etiqueta}.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Dashboard */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: color }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BarChartIcon sx={{ color, fontSize: 22 }} />
          <Box>
            <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>Dashboard organizativo</Typography>
            <Typography variant="body2" color="text.secondary">Indicadores de capacidad organizativa y resultados del diagnóstico</Typography>
          </Box>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ mb: 6, p: 6, border: `1.5px dashed ${color}40`, borderRadius: 3, bgcolor: `${color}05`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 220, gap: 1.5 }}>
        <BarChartIcon sx={{ fontSize: 56, color, opacity: 0.35 }} />
        <Typography variant="h6" color="text.secondary" sx={{ fontFamily: '"Alegreya Sans", serif' }}>Dashboard en construcción</Typography>
        <Typography variant="body2" color="text.disabled" textAlign="center" maxWidth={400}>
          Aquí se integrarán los indicadores del diagnóstico organizativo de {org.etiqueta}.
        </Typography>
      </Paper>

      <Divider sx={{ mb: 5 }} />

      {/* Rutas de mejora */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: color }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <RouteIcon sx={{ color, fontSize: 22 }} />
          <Box>
            <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>Rutas de mejora</Typography>
            <Typography variant="body2" color="text.secondary">Plan de acción para el fortalecimiento organizativo</Typography>
          </Box>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, border: `1px solid ${color}20`, borderRadius: 3, bgcolor: `${color}05`, borderLeft: `4px solid ${color}`, display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1, minWidth: 240 }}>
          <Chip label="Texto provisional" size="small" sx={{ mb: 2, bgcolor: `${color}15`, color, fontWeight: 600, fontSize: '0.65rem' }} />
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85, mb: 2 }}>
            Las rutas de mejora constituyen el instrumento central para el fortalecimiento organizativo de {org.etiqueta}. A partir de los diagnósticos realizados se identifican las áreas prioritarias de intervención y se trazan líneas de acción concretas para avanzar hacia una gestión más sólida y autónoma.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
            Cada ruta contempla metas, responsables, indicadores y plazos de seguimiento definidos por y para la comunidad, articulados con los principios del gobierno propio de {org.pueblo}.
          </Typography>
        </Box>
        <Card elevation={0} sx={{ border: `1.5px solid ${color}30`, borderRadius: 2.5, opacity: 0.65, flexShrink: 0, width: 150 }}>
          <CardActionArea disabled sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, textAlign: 'center' }}>
              <Box sx={{ width: 52, height: 52, borderRadius: 2, bgcolor: `${color}15`, border: `2px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PictureAsPdfIcon sx={{ color, fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color, mb: 0.25, fontSize: '0.8rem' }}>Rutas de mejora</Typography>
                <Typography variant="caption" color="text.disabled" sx={{ display: 'block', lineHeight: 1.3 }}>Documento en PDF</Typography>
              </Box>
              <Chip label="Próximamente" size="small" sx={{ fontSize: '0.65rem', height: 20, bgcolor: '#f5f5f5', color: 'text.disabled' }} />
            </Box>
          </CardActionArea>
        </Card>
      </Paper>
    </Box>
  );
}
