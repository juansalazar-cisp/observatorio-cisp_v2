import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Chip, Divider, Paper, Grid, Card, CardActionArea } from '@mui/material';
import ArrowBackIcon    from '@mui/icons-material/ArrowBack';
import MapIcon          from '@mui/icons-material/Map';
import PeopleIcon       from '@mui/icons-material/People';
import AutoStoriesIcon  from '@mui/icons-material/AutoStories';
import TableChartIcon   from '@mui/icons-material/TableChart';

import { CISP }            from '../../../theme';
import { useOrgData }      from '../../../utils/orgData';
import MapaDeptoEstatico   from '../../../components/maps/MapaDeptoEstatico';
import fondo1              from '../../../assets/fondo1.png';
import imaginario4         from '../../../assets/imaginario4.png';

const regionLabel = {
  andina: 'Andina', caribe: 'Caribe', pacifica: 'Pacífica',
  amazonica: 'Amazónica', orinoquia: 'Orinoquía',
};

function SeccionHeader({ icono, titulo, color }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: color, flexShrink: 0 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icono}
        <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>{titulo}</Typography>
      </Box>
    </Box>
  );
}

function TarjetaDescarga({ icono, titulo, subtitulo }) {
  return (
    <Card elevation={0} sx={{ border: `1.5px solid #ccc`, borderRadius: 2.5, opacity: 0.65 }}>
      <CardActionArea disabled sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, textAlign: 'center' }}>
          <Box sx={{ width: 52, height: 52, borderRadius: 2, bgcolor: '#f5f5f5', border: '1.5px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icono}
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.25 }}>{titulo}</Typography>
            <Typography variant="caption" color="text.disabled" sx={{ display: 'block', lineHeight: 1.3 }}>{subtitulo}</Typography>
          </Box>
          <Chip label="Próximamente" size="small" sx={{ fontSize: '0.65rem', height: 20, bgcolor: '#f5f5f5', color: 'text.disabled' }} />
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default function OrgMiTerritorio() {
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
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${fondo1})`, backgroundSize: 'cover', opacity: 0.1 }} />
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
          <Box component="img" src={imaginario4} alt="" sx={{ width: 60, opacity: 0.5, filter: 'brightness(10)', flexShrink: 0 }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Chip label={org.etiqueta} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.25)', color: '#fff', fontWeight: 700, fontSize: '0.7rem' }} />
              <Chip label={regionLabel[org.region]} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.7rem' }} />
            </Box>
            <Typography variant="h4" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: '#fff', lineHeight: 1.2, mb: 0.5 }}>Mi Territorio</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', maxWidth: 600 }}>
              Información geoespacial, contexto territorial y elementos de identidad de {org.etiqueta}.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Mapa */}
      <SeccionHeader icono={<MapIcon sx={{ color, fontSize: 22 }} />} titulo="Ubicación en Colombia" color={color} />
      <Box sx={{ mb: 6, maxWidth: 420, mx: 'auto' }}>
        {org.departamento !== 'Por definir'
          ? <MapaDeptoEstatico departamento={org.departamento} color={color} />
          : (
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: `1.5px dashed ${color}40`, borderRadius: 2, bgcolor: `${color}05` }}>
              <MapIcon sx={{ fontSize: 48, color, opacity: 0.3, mb: 1 }} />
              <Typography variant="body2" color="text.disabled">Departamento por definir</Typography>
            </Paper>
          )
        }
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* Contexto Territorial */}
      <SeccionHeader icono={<MapIcon sx={{ color, fontSize: 22 }} />} titulo="Contexto Territorial y Poblacional" color={color} />
      <Paper elevation={0} sx={{ mb: 6, p: { xs: 2.5, md: 3.5 }, border: `1px solid ${color}20`, borderRadius: 3, bgcolor: `${color}05`, borderLeft: `4px solid ${color}` }}>
        <Chip label="Texto provisional" size="small" sx={{ mb: 2, bgcolor: `${color}15`, color, fontWeight: 600, fontSize: '0.65rem' }} />
        {(org.textos?.contextoTerritorial || '').split('\n\n').map((p, i) => (
          <Typography key={i} variant="body1" color="text.secondary" sx={{ lineHeight: 1.85, mb: 1.5 }}>{p}</Typography>
        ))}
      </Paper>

      <Divider sx={{ mb: 5 }} />

      {/* Elementos de Identidad */}
      <SeccionHeader icono={<PeopleIcon sx={{ color, fontSize: 22 }} />} titulo="Elementos de Identidad" color={color} />
      <Paper elevation={0} sx={{ mb: 6, p: { xs: 2.5, md: 3.5 }, border: `1px solid ${color}20`, borderRadius: 3, bgcolor: `${color}05`, borderLeft: `4px solid ${color}` }}>
        <Chip label="Texto provisional" size="small" sx={{ mb: 2, bgcolor: `${color}15`, color, fontWeight: 600, fontSize: '0.65rem' }} />
        {(org.textos?.elementosIdentidad || '').split('\n\n').map((p, i) => (
          <Typography key={i} variant="body1" color="text.secondary" sx={{ lineHeight: 1.85, mb: 1.5 }}>{p}</Typography>
        ))}
      </Paper>

      <Divider sx={{ mb: 5 }} />

      {/* Cifras Claves */}
      <SeccionHeader titulo="Cifras Claves del Territorio" color={color} />
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
          <Box sx={{ width: 3, height: 22, borderRadius: 1, bgcolor: `${color}60` }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.secondary' }}>Fuentes secundarias</Typography>
        </Box>
        <Grid container spacing={2.5} sx={{ maxWidth: 480 }}>
          <Grid size={{ xs: 6 }}>
            <TarjetaDescarga icono={<AutoStoriesIcon sx={{ color, fontSize: 24 }} />} titulo="Cartillas" subtitulo="Documentos en PDF" />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TarjetaDescarga icono={<TableChartIcon sx={{ color, fontSize: 24 }} />} titulo="Bases de datos" subtitulo="Información en Excel" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
