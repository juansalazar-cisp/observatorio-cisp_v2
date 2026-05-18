import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Chip, Divider, Paper, List, ListItem,
  ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import LinkIcon from '@mui/icons-material/Link';
import StorageIcon from '@mui/icons-material/Storage';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { CISP } from '../../../../theme';
import { useOrgById } from '../../../../utils/orgData';
import instrumentosGestion from '../../../../data/instrumentosGestion';
import fondo1 from '../../../../assets/fondo1.png';
import imaginario8 from '../../../../assets/imaginario8.png';

const MODULO_COLOR = CISP.azul_claro;
const MODULO_COLOR_DARK = '#3a9eaa'; // versión más oscura para texto sobre fondos claros

// Videos simulados — URLs a reemplazar con links reales de Drive
const videosMemoria = [
  { id: 1, titulo: 'Historia de Resistencia del Pueblo Nasa en el Cauca', duracion: '14:22', url: '#' },
  { id: 2, titulo: 'La Minga como Práctica de Trabajo Comunitario', duracion: '09:15', url: '#' },
  { id: 3, titulo: 'El Río como Eje de Vida: Territorio y Cosmovisión', duracion: '11:40', url: '#' },
  { id: 4, titulo: 'Medicina Tradicional y Plantas Sagradas del Pueblo Nasa', duracion: '16:08', url: '#' },
  { id: 5, titulo: 'La Tulpa: Espacio de Encuentro y Transmisión de Saberes', duracion: '07:53', url: '#' },
  { id: 6, titulo: 'Autonomía y Gobierno Propio: Historia del CRIC', duracion: '20:30', url: '#' },
];

const categoriaColor = {
  'Archivo':        { bg: '#EFF6FF', color: '#1D4ED8' },
  'Gestión':        { bg: '#F0FDF4', color: '#166534' },
  'Preservación':   { bg: '#FFF7ED', color: '#9A3412' },
  'Inventario':     { bg: '#FDF4FF', color: '#7E22CE' },
  'Digitalización': { bg: '#F0FDFA', color: '#0F766E' },
  'Control':        { bg: '#FEF9C3', color: '#854D0E' },
};

function SeccionHeader({ icono, titulo, descripcion }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: MODULO_COLOR, flexShrink: 0 }} />
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icono}
          <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>
            {titulo}
          </Typography>
        </Box>
        {descripcion && (
          <Typography variant="body2" color="text.secondary">{descripcion}</Typography>
        )}
      </Box>
    </Box>
  );
}

export default function PlanArchivoVivo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plan = useOrgById(id);

  if (!plan) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="text.secondary">Plan no encontrado</Typography>
        <Button onClick={() => navigate('/visualizacion')} sx={{ mt: 2 }}>Volver</Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/mi-plan-de-vida/plan/${plan.id}`)}
        sx={{ mb: 3, color: MODULO_COLOR_DARK, fontWeight: 700 }}
      >
        Volver al Plan de Vida
      </Button>

      {/* Banner */}
      <Paper
        elevation={0}
        sx={{
          mb: 5, px: { xs: 3, md: 4 }, py: 3.5,
          borderRadius: 3, overflow: 'hidden',
          background: `linear-gradient(135deg, ${MODULO_COLOR}dd 0%, ${MODULO_COLOR}88 100%)`,
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${fondo1})`, backgroundSize: 'cover', opacity: 0.1 }} />
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
          <Box component="img" src={imaginario8} alt="" sx={{ width: 60, opacity: 0.5, filter: 'brightness(10)', flexShrink: 0 }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Chip label={`Pueblo ${plan.pueblo}`} size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.3)', color: '#1a5a65', fontWeight: 700, fontSize: '0.7rem' }} />
              <Chip label={plan.departamento} size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#1a5a65', fontSize: '0.7rem' }} />
            </Box>
            <Typography variant="h4"
              sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: '#0f3a45', lineHeight: 1.2, mb: 0.5 }}>
              Archivo Vivo del Territorio
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(0,50,65,0.75)', maxWidth: 600 }}>
              Memoria territorial, historias emblemáticas y gestión documental del Pueblo {plan.pueblo}.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* ── Experiencia de Memoria Comunitaria ─────────────── */}
      <Box sx={{ mb: 5 }}>
        <SeccionHeader
          icono={<VideoLibraryIcon sx={{ color: MODULO_COLOR_DARK, fontSize: 22 }} />}
          titulo="Experiencia de Memoria Comunitaria"
          descripcion="Historias emblemáticas del territorio — videos alojados en Drive (links simulados, conexión pendiente)"
        />

        <Paper
          elevation={0}
          sx={{
            border: `1px solid ${MODULO_COLOR}40`,
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ px: 2.5, py: 1.5, bgcolor: `${MODULO_COLOR}15`, borderBottom: `1px solid ${MODULO_COLOR}25` }}>
            <Chip
              label="Links simulados — pendiente conexión a Drive"
              size="small"
              sx={{ bgcolor: `${MODULO_COLOR}25`, color: MODULO_COLOR_DARK, fontWeight: 600, fontSize: '0.65rem' }}
            />
          </Box>
          <List disablePadding>
            {videosMemoria.map((video, index) => (
              <ListItem
                key={video.id}
                divider={index < videosMemoria.length - 1}
                sx={{
                  px: 2.5, py: 1.75,
                  '&:hover': { bgcolor: `${MODULO_COLOR}08` },
                  transition: 'background-color 0.15s',
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <PlayCircleIcon sx={{ color: MODULO_COLOR_DARK, fontSize: 28 }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.3 }}>
                      {video.titulo}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
                      <AccessTimeIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
                      <Typography variant="caption" color="text.disabled">{video.duracion}</Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    size="small"
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    disabled={video.url === '#'}
                    sx={{ color: MODULO_COLOR_DARK, '&.Mui-disabled': { color: 'text.disabled' } }}
                    title="Ver video"
                  >
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* ── Memoria de Convenio ───────────────────────────── */}
      <Box sx={{ mb: 5 }}>
        <SeccionHeader
          icono={<StorageIcon sx={{ color: MODULO_COLOR_DARK, fontSize: 22 }} />}
          titulo="Memoria de Convenio"
          descripcion="Información consolidada de los convenios y acuerdos territoriales"
        />

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            border: `1.5px dashed ${MODULO_COLOR}50`,
            borderRadius: 3,
            bgcolor: `${MODULO_COLOR}06`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5,
            textAlign: 'center', minHeight: 160, justifyContent: 'center',
          }}
        >
          <LinkIcon sx={{ fontSize: 44, color: MODULO_COLOR, opacity: 0.45 }} />
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 600 }}>
            Conexión a fuente externa pendiente
          </Typography>
          <Typography variant="body2" color="text.disabled" maxWidth={480}>
            Esta sección se conectará a la aplicación externa de gestión de convenios. Una vez disponible el enlace, aquí se mostrará la información consolidada de los convenios del Pueblo {plan.pueblo}.
          </Typography>
          <Chip
            label="Próximamente"
            size="small"
            sx={{ bgcolor: `${MODULO_COLOR}15`, color: MODULO_COLOR_DARK, fontWeight: 600 }}
          />
        </Paper>
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* ── ABC Instrumentos de Gestión Documental ─────────── */}
      <Box sx={{ mb: 5 }}>
        <SeccionHeader
          icono={<DescriptionIcon sx={{ color: MODULO_COLOR_DARK, fontSize: 22 }} />}
          titulo="ABC Instrumentos de Gestión Documental"
          descripcion="Lista de documentos descargables — editable en src/data/instrumentosGestion.js"
        />

        <Paper
          elevation={0}
          sx={{ border: `1px solid ${MODULO_COLOR}30`, borderRadius: 3, overflow: 'hidden' }}
        >
          <List disablePadding>
            {instrumentosGestion.map((doc, index) => {
              const cat = categoriaColor[doc.categoria] || { bg: '#f5f5f5', color: '#555' };
              const disponible = Boolean(doc.url);
              return (
                <ListItem
                  key={doc.id}
                  divider={index < instrumentosGestion.length - 1}
                  sx={{
                    px: 2.5, py: 2,
                    opacity: disponible ? 1 : 0.75,
                    '&:hover': { bgcolor: `${MODULO_COLOR}06` },
                    transition: 'background-color 0.15s',
                    alignItems: 'flex-start',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, mt: 0.25 }}>
                    <PictureAsPdfIcon sx={{ color: disponible ? MODULO_COLOR_DARK : 'text.disabled', fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.3, mb: 0.4 }}>
                        {doc.titulo}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.4, mb: 0.5 }}>
                          {doc.descripcion}
                        </Typography>
                        <Chip
                          label={doc.categoria}
                          size="small"
                          sx={{
                            height: 18, fontSize: '0.6rem', fontWeight: 600,
                            bgcolor: cat.bg, color: cat.color,
                          }}
                        />
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      size="small"
                      href={doc.url || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      disabled={!disponible}
                      sx={{
                        color: MODULO_COLOR_DARK,
                        '&.Mui-disabled': { color: 'text.disabled' },
                      }}
                      title={disponible ? 'Descargar PDF' : 'Próximamente'}
                    >
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Paper>
        <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
          Para agregar o editar documentos, actualiza el archivo <strong>src/data/instrumentosGestion.js</strong>
        </Typography>
      </Box>
    </Box>
  );
}
