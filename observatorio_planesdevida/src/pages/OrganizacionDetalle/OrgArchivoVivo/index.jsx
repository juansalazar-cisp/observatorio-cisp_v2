import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Chip, Divider, Paper, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import ArrowBackIcon      from '@mui/icons-material/ArrowBack';
import VideoLibraryIcon   from '@mui/icons-material/VideoLibrary';
import PlayCircleIcon     from '@mui/icons-material/PlayCircle';
import StorageIcon        from '@mui/icons-material/Storage';
import DescriptionIcon    from '@mui/icons-material/Description';
import PictureAsPdfIcon   from '@mui/icons-material/PictureAsPdf';
import OpenInNewIcon      from '@mui/icons-material/OpenInNew';
import AccessTimeIcon     from '@mui/icons-material/AccessTime';
import LinkIcon           from '@mui/icons-material/Link';

import { useOrgData }      from '../../../utils/orgData';
import instrumentosGestion from '../../../data/instrumentosGestion';
import fondo1              from '../../../assets/fondo1.png';
import imaginario8         from '../../../assets/imaginario8.png';

const regionLabel = { andina: 'Andina', caribe: 'Caribe', pacifica: 'Pacífica', amazonica: 'Amazónica', orinoquia: 'Orinoquía' };

const videosMemoria = [
  { id: 1, titulo: 'Historia y origen de la organización', duracion: '10:30', url: '#' },
  { id: 2, titulo: 'Prácticas culturales y tradiciones del territorio', duracion: '08:15', url: '#' },
  { id: 3, titulo: 'El territorio como eje de vida comunitaria', duracion: '12:40', url: '#' },
  { id: 4, titulo: 'Medicina tradicional y saberes ancestrales', duracion: '09:08', url: '#' },
  { id: 5, titulo: 'Gobierno propio y formas de autoridad', duracion: '11:53', url: '#' },
];

const categoriaColor = {
  'Archivo':        { bg: '#EFF6FF', color: '#1D4ED8' },
  'Gestión':        { bg: '#F0FDF4', color: '#166534' },
  'Preservación':   { bg: '#FFF7ED', color: '#9A3412' },
  'Inventario':     { bg: '#FDF4FF', color: '#7E22CE' },
  'Digitalización': { bg: '#F0FDFA', color: '#0F766E' },
  'Control':        { bg: '#FEF9C3', color: '#854D0E' },
};

function SeccionHeader({ icono, titulo, descripcion, color }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: color, flexShrink: 0 }} />
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icono}
          <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>{titulo}</Typography>
        </Box>
        {descripcion && <Typography variant="body2" color="text.secondary">{descripcion}</Typography>}
      </Box>
    </Box>
  );
}

export default function OrgArchivoVivo() {
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
  const colorDark = color;

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(`/org/${slug}`)} sx={{ mb: 3, color, fontWeight: 700 }}>
        Volver al Plan de Vida
      </Button>

      {/* Banner */}
      <Paper elevation={0} sx={{ mb: 5, px: { xs: 3, md: 4 }, py: 3.5, borderRadius: 3, overflow: 'hidden', background: `linear-gradient(135deg, ${color}dd 0%, ${org.colores.secundario}99 100%)`, position: 'relative' }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${fondo1})`, backgroundSize: 'cover', opacity: 0.1 }} />
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
          <Box component="img" src={imaginario8} alt="" sx={{ width: 60, opacity: 0.5, filter: 'brightness(10)', flexShrink: 0 }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Chip label={org.etiqueta} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.25)', color: '#fff', fontWeight: 700, fontSize: '0.7rem' }} />
              <Chip label={regionLabel[org.region]} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.7rem' }} />
            </Box>
            <Typography variant="h4" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: '#fff', lineHeight: 1.2, mb: 0.5 }}>Archivo Vivo del Territorio</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', maxWidth: 600 }}>
              Memoria territorial, historias emblemáticas y gestión documental de {org.etiqueta}.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Experiencia de Memoria */}
      <Box sx={{ mb: 5 }}>
        <SeccionHeader
          icono={<VideoLibraryIcon sx={{ color, fontSize: 22 }} />}
          titulo="Experiencia de Memoria Comunitaria"
          descripcion="Historias emblemáticas del territorio — links simulados, conexión a Drive pendiente"
          color={color}
        />
        <Paper elevation={0} sx={{ border: `1px solid ${color}40`, borderRadius: 3, overflow: 'hidden' }}>
          <Box sx={{ px: 2.5, py: 1.5, bgcolor: `${color}15`, borderBottom: `1px solid ${color}25` }}>
            <Chip label="Links simulados — pendiente conexión a Drive" size="small" sx={{ bgcolor: `${color}25`, color, fontWeight: 600, fontSize: '0.65rem' }} />
          </Box>
          <List disablePadding>
            {videosMemoria.map((video, index) => (
              <ListItem key={video.id} divider={index < videosMemoria.length - 1} sx={{ px: 2.5, py: 1.75, '&:hover': { bgcolor: `${color}08` } }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <PlayCircleIcon sx={{ color, fontSize: 28 }} />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{video.titulo}</Typography>}
                  secondary={<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}><AccessTimeIcon sx={{ fontSize: 12, color: 'text.disabled' }} /><Typography variant="caption" color="text.disabled">{video.duracion}</Typography></Box>}
                />
                <ListItemSecondaryAction>
                  <IconButton size="small" disabled sx={{ color, '&.Mui-disabled': { color: 'text.disabled' } }} title="Ver video">
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* Memoria de Convenio */}
      <Box sx={{ mb: 5 }}>
        <SeccionHeader icono={<StorageIcon sx={{ color, fontSize: 22 }} />} titulo="Memoria de Convenio" color={color} />
        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, border: `1.5px dashed ${color}50`, borderRadius: 3, bgcolor: `${color}06`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, textAlign: 'center', minHeight: 160, justifyContent: 'center' }}>
          <LinkIcon sx={{ fontSize: 44, color, opacity: 0.45 }} />
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 600 }}>Conexión a fuente externa pendiente</Typography>
          <Typography variant="body2" color="text.disabled" maxWidth={460}>
            Esta sección se conectará a la aplicación externa de gestión de convenios de {org.etiqueta}.
          </Typography>
          <Chip label="Próximamente" size="small" sx={{ bgcolor: `${color}15`, color, fontWeight: 600 }} />
        </Paper>
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* ABC Instrumentos */}
      <Box sx={{ mb: 5 }}>
        <SeccionHeader
          icono={<DescriptionIcon sx={{ color, fontSize: 22 }} />}
          titulo="ABC Instrumentos de Gestión Documental"
          descripcion="Documentos descargables — editable en src/data/instrumentosGestion.js"
          color={color}
        />
        <Paper elevation={0} sx={{ border: `1px solid ${color}30`, borderRadius: 3, overflow: 'hidden' }}>
          <List disablePadding>
            {instrumentosGestion.map((doc, index) => {
              const cat = categoriaColor[doc.categoria] || { bg: '#f5f5f5', color: '#555' };
              return (
                <ListItem key={doc.id} divider={index < instrumentosGestion.length - 1} sx={{ px: 2.5, py: 2, opacity: 0.75, '&:hover': { bgcolor: `${color}06` }, alignItems: 'flex-start' }}>
                  <ListItemIcon sx={{ minWidth: 40, mt: 0.25 }}>
                    <PictureAsPdfIcon sx={{ color: 'text.disabled', fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3, mb: 0.4 }}>{doc.titulo}</Typography>}
                    secondary={
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.4, mb: 0.5 }}>{doc.descripcion}</Typography>
                        <Chip label={doc.categoria} size="small" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 600, bgcolor: cat.bg, color: cat.color }} />
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton size="small" disabled sx={{ '&.Mui-disabled': { color: 'text.disabled' } }} title="Próximamente">
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}
