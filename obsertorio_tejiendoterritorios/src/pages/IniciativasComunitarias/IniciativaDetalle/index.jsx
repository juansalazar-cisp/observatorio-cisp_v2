import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Chip, Grid, Card, CardActionArea } from '@mui/material';
import ArrowBackIcon         from '@mui/icons-material/ArrowBack';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LandscapeIcon         from '@mui/icons-material/Landscape';
import AutoStoriesIcon       from '@mui/icons-material/AutoStories';
import PhotoLibraryIcon      from '@mui/icons-material/PhotoLibrary';
import RouteIcon             from '@mui/icons-material/Route';
import AutoAwesomeIcon       from '@mui/icons-material/AutoAwesome';

import { TT }                 from '../../../theme';
import { useIniciativaById }  from '../../../utils/iniciativasStore';

const galeriaModules = import.meta.glob(
  '../../../assets/galeria/*.{png,jpg,jpeg,webp,PNG,JPG}',
  { eager: true }
);
const galeriaFotos = Object.values(galeriaModules).map((m) => m.default);

const modulos = [
  {
    titulo: 'Tejiendo mi Territorio',
    icono:  LandscapeIcon,
    path:   'tejiendo-mi-territorio',
    color:  null, // usa colorPrimario de la iniciativa
  },
  {
    titulo: 'Tejiendo mis Saberes',
    icono:  AutoStoriesIcon,
    path:   'tejiendo-mis-saberes',
    color:  null, // usa colorSecundario
  },
  {
    titulo: 'Tejiendo mi Memoria',
    icono:  PhotoLibraryIcon,
    path:   'tejiendo-mi-memoria',
    color:  '#7A3E9D',
  },
  {
    titulo: 'Entretejiendo Caminos',
    icono:  RouteIcon,
    path:   'entretejiendo-caminos',
    color:  '#1C1F3A',
  },
  {
    titulo: 'Tejidos que Transforman',
    icono:  AutoAwesomeIcon,
    path:   'tejidos-que-transforman',
    color:  '#BF1600',
  },
];

export default function IniciativaDetalle() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const ini      = useIniciativaById(id);

  if (!ini) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h5" color="text.secondary">Iniciativa no encontrada</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>Volver</Button>
      </Box>
    );
  }

  const foto = galeriaFotos[ini.imagenIndex] || null;

  return (
    <Box>
      {/* Botón volver */}
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}
        sx={{ mb: 2.5, color: ini.colorPrimario, fontWeight: 700, borderRadius: 2 }}>
        Volver a Iniciativas
      </Button>

      {/* ── Banner / Título ──────────────────────────────── */}
      <Paper elevation={0} sx={{
        mb: 5, borderRadius: 3, overflow: 'hidden', position: 'relative',
        background: `linear-gradient(135deg, ${ini.colorPrimario}ee 0%, ${ini.colorPrimario}88 100%)`,
        minHeight: { xs: 160, md: 200 },
        display: 'flex', alignItems: 'stretch',
      }}>
        {/* Imagen de la iniciativa */}
        {foto && (
          <Box
            component="img" src={foto} alt=""
            sx={{
              width: { xs: 120, sm: 180, md: 240 }, flexShrink: 0,
              objectFit: 'cover', objectPosition: 'center',
              opacity: 0.75,
            }}
          />
        )}

        {/* Banda tricolor superior */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(90deg, ${TT.naranja} 0%, ${TT.verde} 50%, ${TT.purpura} 100%)` }} />

        {/* Contenido del banner */}
        <Box sx={{ flex: 1, px: { xs: 2.5, md: 4 }, py: 3, position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
            <Chip label={ini.tipo} size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.25)', color: '#fff', fontWeight: 700, fontSize: '0.68rem' }} />
            <Chip label={ini.linea} size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: '#fff', fontSize: '0.68rem' }} />
          </Box>
          <Typography variant="h4" sx={{
            color: '#fff', fontWeight: 700, lineHeight: 1.2, mb: 0.75,
            fontSize: { xs: '1.3rem', sm: '1.7rem', md: '2rem' },
          }}>
            {ini.nombre}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.88)', mb: 0.5 }}>
            {ini.comunidad} · {ini.organizacion} · Región {ini.region}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            #{String(ini.id).padStart(2,'0')} · {ini.departamento}
          </Typography>
        </Box>

        {/* Botón admin — esquina superior derecha */}
        <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<AdminPanelSettingsIcon sx={{ fontSize: '1rem !important' }} />}
            onClick={() => navigate('/admin-iniciativas')}
            sx={{
              color: '#fff', borderColor: 'rgba(255,255,255,0.4)',
              bgcolor: 'rgba(0,0,0,0.18)', backdropFilter: 'blur(4px)',
              fontWeight: 700, fontSize: '0.7rem', borderRadius: 2,
              '&:hover': { borderColor: '#fff', bgcolor: 'rgba(0,0,0,0.3)' },
            }}
          >
            Administración
          </Button>
        </Box>
      </Paper>

      {/* ── Descripción breve ─────────────────────────────── */}
      <Box sx={{ mb: 5, p: 3, borderRadius: 3, bgcolor: `${ini.colorPrimario}06`,
        borderLeft: `4px solid ${ini.colorPrimario}` }}>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
          {ini.descripcion}
        </Typography>
      </Box>

      {/* ── Módulos — 3 + 2 ───────────────────────────────── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ width: 5, height: 28, borderRadius: 2,
          background: `linear-gradient(180deg, ${ini.colorPrimario} 0%, ${ini.colorSecundario} 100%)` }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Módulos de la Iniciativa</Typography>
      </Box>

      {/* Primera fila: 3 tarjetas */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {modulos.slice(0, 3).map((mod) => {
          const Icon  = mod.icono;
          const color = mod.color || (mod.path === 'tejiendo-mis-saberes' ? ini.colorSecundario : ini.colorPrimario);
          return (
            <Grid key={mod.titulo} size={{ xs: 12, sm: 4 }}>
              <Card elevation={0} sx={{
                border: `1.5px solid ${color}25`, borderRadius: 3,
                transition: 'transform 0.18s, box-shadow 0.18s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 10px 28px ${color}20` },
              }}>
                <CardActionArea
                  onClick={() => navigate(`/iniciativas-comunitarias/iniciativa/${id}/${mod.path}`)}
                  sx={{ p: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 1.5 }}
                >
                  <Box sx={{
                    width: 52, height: 52, borderRadius: 2,
                    bgcolor: `${color}12`, border: `2px solid ${color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon sx={{ color, fontSize: 26 }} />
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color, lineHeight: 1.3, fontSize: '0.82rem' }}>
                    {mod.titulo}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Segunda fila: 2 tarjetas centradas */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        {modulos.slice(3).map((mod) => {
          const Icon  = mod.icono;
          const color = mod.color || ini.colorPrimario;
          return (
            <Box key={mod.titulo} sx={{ width: { xs: '100%', sm: 'calc(33.33% - 8px)' }, maxWidth: 320 }}>
              <Card elevation={0} sx={{
                border: `1.5px solid ${color}25`, borderRadius: 3,
                transition: 'transform 0.18s, box-shadow 0.18s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 10px 28px ${color}20` },
              }}>
                <CardActionArea
                  onClick={() => navigate(`/iniciativas-comunitarias/iniciativa/${id}/${mod.path}`)}
                  sx={{ p: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 1.5 }}
                >
                  <Box sx={{
                    width: 52, height: 52, borderRadius: 2,
                    bgcolor: `${color}12`, border: `2px solid ${color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon sx={{ color, fontSize: 26 }} />
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color, lineHeight: 1.3, fontSize: '0.82rem' }}>
                    {mod.titulo}
                  </Typography>
                </CardActionArea>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
