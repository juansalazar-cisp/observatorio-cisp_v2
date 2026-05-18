import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Chip, Divider, Paper, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import ArrowBackIcon            from '@mui/icons-material/ArrowBack';
import LibraryBooksIcon         from '@mui/icons-material/LibraryBooks';
import SchoolIcon               from '@mui/icons-material/School';
import PictureAsPdfIcon         from '@mui/icons-material/PictureAsPdf';
import PlayCircleOutlinedIcon   from '@mui/icons-material/PlayCircleOutlined';
import NatureIcon               from '@mui/icons-material/Nature';
import FavoriteIcon             from '@mui/icons-material/Favorite';
import EmojiPeopleIcon          from '@mui/icons-material/EmojiPeople';
import BalanceIcon              from '@mui/icons-material/Balance';
import GavelIcon                from '@mui/icons-material/Gavel';

import { useOrgData } from '../../../utils/orgData';
import fondo3         from '../../../assets/fondo3.png';
import imaginario5    from '../../../assets/imaginario5.png';

const regionLabel = { andina: 'Andina', caribe: 'Caribe', pacifica: 'Pacífica', amazonica: 'Amazónica', orinoquia: 'Orinoquía' };

const tematicas = [
  { titulo: 'Economías Propias',   icono: <NatureIcon sx={{ fontSize: 26, color: '#3E7F00' }} />, color: '#3E7F00', descripcion: 'Sistemas económicos indígenas basados en la reciprocidad, la minga y el intercambio comunitario. Estrategias de autonomía económica y manejo de recursos desde la perspectiva del buen vivir.' },
  { titulo: 'Cuidado y Autocuidado', icono: <FavoriteIcon sx={{ fontSize: 26, color: '#D2232A' }} />, color: '#D2232A', descripcion: 'Medicina tradicional, promotores de salud comunitaria y bienestar integral desde la cosmovisión indígena. Herramientas para la salud física, emocional y espiritual.' },
  { titulo: 'Identidad Cultural y Buen Vivir Comunitario', icono: <EmojiPeopleIcon sx={{ fontSize: 26, color: '#218380' }} />, color: '#218380', descripcion: 'Recuperación de la identidad cultural a través de la lengua propia, saberes ancestrales y prácticas rituales. Estrategias para el buen vivir desde la cosmovisión propia.' },
  { titulo: 'Igualdad de Género',  icono: <BalanceIcon sx={{ fontSize: 26, color: '#8F2D56' }} />, color: '#8F2D56', descripcion: 'Participación equitativa de mujeres, hombres y personas diversas en los espacios de gobierno propio, trabajo comunitario y toma de decisiones colectivas.' },
  { titulo: 'Derechos',            icono: <GavelIcon sx={{ fontSize: 26, color: '#FFB600' }} />, color: '#FFB600', descripcion: 'Marco normativo de los derechos de los pueblos indígenas. Herramientas para la defensa del territorio, la consulta previa y el acceso a la justicia.' },
];

export default function OrgFortalecimiento() {
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
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${fondo3})`, backgroundSize: 'cover', opacity: 0.1 }} />
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
          <Box component="img" src={imaginario5} alt="" sx={{ width: 60, opacity: 0.5, filter: 'brightness(10)', flexShrink: 0 }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Chip label={org.etiqueta} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.25)', color: '#fff', fontWeight: 700, fontSize: '0.7rem' }} />
              <Chip label={regionLabel[org.region]} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.7rem' }} />
            </Box>
            <Typography variant="h4" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: '#fff', lineHeight: 1.2, mb: 0.5 }}>Fortalecimiento Comunitario</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', maxWidth: 600 }}>
              Recursos pedagógicos y metodológicos para el fortalecimiento de capacidades de {org.etiqueta}.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Biblioteca digital */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: color }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LibraryBooksIcon sx={{ color, fontSize: 22 }} />
            <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>Biblioteca digital</Typography>
          </Box>
        </Box>
        <Card elevation={0} sx={{ border: `1.5px solid ${color}30`, borderRadius: 2.5, opacity: 0.65, maxWidth: 180 }}>
          <CardActionArea disabled sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, textAlign: 'center' }}>
              <Box sx={{ width: 52, height: 52, borderRadius: 2, bgcolor: `${color}15`, border: `2px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PictureAsPdfIcon sx={{ color, fontSize: 24 }} />
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color, mb: 0.25 }}>Biblioteca digital</Typography>
              <Chip label="Próximamente" size="small" sx={{ fontSize: '0.65rem', height: 20, bgcolor: '#f5f5f5', color: 'text.disabled' }} />
            </Box>
          </CardActionArea>
        </Card>
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* Aula virtual */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: color }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SchoolIcon sx={{ color, fontSize: 22 }} />
            <Box>
              <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>Biblioteca Aula Virtual</Typography>
              <Typography variant="body2" color="text.secondary">5 temáticas de formación — contenido y acceso a video</Typography>
            </Box>
          </Box>
        </Box>
        <Grid container spacing={3}>
          {tematicas.map((tema) => (
            <Grid key={tema.titulo} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card elevation={0} sx={{ height: '100%', border: `1.5px solid ${tema.color}25`, borderRadius: 3, display: 'flex', flexDirection: 'column', transition: 'transform 0.18s, box-shadow 0.18s', '&:hover': { transform: 'translateY(-3px)', boxShadow: `0 8px 24px ${tema.color}20` } }}>
                <Box sx={{ px: 2.5, pt: 2.5, pb: 2, background: `linear-gradient(135deg, ${tema.color}18 0%, ${tema.color}08 100%)`, borderBottom: `2px solid ${tema.color}15`, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: 2, flexShrink: 0, bgcolor: `${tema.color}15`, border: `1.5px solid ${tema.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{tema.icono}</Box>
                  <Typography variant="subtitle1" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: tema.color, lineHeight: 1.2 }}>{tema.titulo}</Typography>
                </Box>
                <CardContent sx={{ flex: 1, px: 2.5, py: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, fontSize: '0.82rem' }}>{tema.descripcion}</Typography>
                </CardContent>
                <Box sx={{ px: 2.5, pb: 2.5 }}>
                  <Button variant="outlined" size="small" startIcon={<PlayCircleOutlinedIcon />} disabled
                    sx={{ borderColor: `${tema.color}35`, color: `${tema.color}55`, fontWeight: 700, borderRadius: 2 }}>
                    Ver video
                  </Button>
                  <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5, fontSize: '0.62rem' }}>Video próximamente</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
