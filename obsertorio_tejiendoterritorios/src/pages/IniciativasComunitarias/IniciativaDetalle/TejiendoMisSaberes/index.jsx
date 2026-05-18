import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Button, Chip, Grid,
  Card, CardContent, CardActionArea, Divider,
} from '@mui/material';
import ArrowBackIcon          from '@mui/icons-material/ArrowBack';
import AutoStoriesIcon        from '@mui/icons-material/AutoStories';
import LibraryBooksIcon       from '@mui/icons-material/LibraryBooks';
import PictureAsPdfIcon       from '@mui/icons-material/PictureAsPdf';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import NatureIcon             from '@mui/icons-material/Nature';
import FavoriteIcon           from '@mui/icons-material/Favorite';
import EmojiPeopleIcon        from '@mui/icons-material/EmojiPeople';
import BalanceIcon            from '@mui/icons-material/Balance';
import GavelIcon              from '@mui/icons-material/Gavel';
import DownloadIcon           from '@mui/icons-material/Download';

import { TT }                from '../../../../theme';
import { useIniciativaById } from '../../../../utils/iniciativasStore';

const galeriaModules = import.meta.glob(
  '../../../../assets/galeria/*.{png,jpg,jpeg,webp,PNG,JPG}',
  { eager: true }
);
const galeriaFotos = Object.values(galeriaModules).map((m) => m.default);

// ── Temáticas de la Estantería Virtual ───────────────────
const tematicas = [
  {
    titulo:      'Economías Propias',
    icono:       <NatureIcon sx={{ fontSize: 28, color: '#3E7F00' }} />,
    color:       '#3E7F00',
    descripcion: 'Exploración de los sistemas económicos indígenas basados en la reciprocidad, la minga y el intercambio comunitario. Aborda estrategias de autonomía económica, manejo de recursos naturales y emprendimientos desde la perspectiva del buen vivir y la soberanía alimentaria.',
    videoUrl:    null,
  },
  {
    titulo:      'Cuidado y Autocuidado',
    icono:       <FavoriteIcon sx={{ fontSize: 28, color: '#BF1600' }} />,
    color:       '#BF1600',
    descripcion: 'Prácticas de medicina tradicional, promotores de salud comunitaria y estrategias de bienestar integral desde la cosmovisión indígena. Incluye herramientas para el fortalecimiento de la salud física, emocional y espiritual de las comunidades.',
    videoUrl:    null,
  },
  {
    titulo:      'Identidad Cultural y Buen Vivir',
    icono:       <EmojiPeopleIcon sx={{ fontSize: 28, color: '#FF9331' }} />,
    color:       '#FF9331',
    descripcion: 'Recuperación y fortalecimiento de la identidad cultural a través de la lengua propia, los saberes ancestrales y las prácticas rituales que definen el ser indígena. Estrategias colectivas para el buen vivir desde la cosmovisión propia.',
    videoUrl:    null,
  },
  {
    titulo:      'Igualdad de Género',
    icono:       <BalanceIcon sx={{ fontSize: 28, color: '#7A3E9D' }} />,
    color:       '#7A3E9D',
    descripcion: 'Análisis de roles de género en las comunidades indígenas y estrategias para la participación equitativa de mujeres, hombres y personas diversas en los espacios de gobierno propio, trabajo comunitario y toma de decisiones colectivas.',
    videoUrl:    null,
  },
  {
    titulo:      'Derechos',
    icono:       <GavelIcon sx={{ fontSize: 28, color: '#1C1F3A' }} />,
    color:       '#1C1F3A',
    descripcion: 'Marco normativo nacional e internacional de los derechos de los pueblos indígenas. Herramientas para la defensa del territorio, la consulta previa, el acceso a la justicia y el ejercicio del derecho propio en armonía con el derecho positivo.',
    videoUrl:    null,
  },
];

function TarjetaTematica({ tema, colorBase }) {
  return (
    <Card elevation={0} sx={{
      height: '100%', border: `1.5px solid ${tema.color}20`, borderRadius: 3,
      display: 'flex', flexDirection: 'column',
      transition: 'transform 0.18s, box-shadow 0.18s',
      '&:hover': { transform: 'translateY(-3px)', boxShadow: `0 8px 24px ${tema.color}20` },
    }}>
      {/* Cabecera */}
      <Box sx={{
        px: 2.5, pt: 2.5, pb: 2,
        background: `linear-gradient(135deg, ${tema.color}18 0%, ${tema.color}08 100%)`,
        borderBottom: `2px solid ${tema.color}15`,
        display: 'flex', alignItems: 'center', gap: 1.5,
      }}>
        <Box sx={{
          width: 46, height: 46, borderRadius: 2, flexShrink: 0,
          bgcolor: `${tema.color}15`, border: `1.5px solid ${tema.color}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {tema.icono}
        </Box>
        <Typography variant="subtitle1"
          sx={{ fontFamily: '"Fraunces", serif', fontWeight: 700, color: tema.color, lineHeight: 1.2 }}>
          {tema.titulo}
        </Typography>
      </Box>

      <CardContent sx={{ flex: 1, px: 2.5, py: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, fontSize: '0.82rem' }}>
          {tema.descripcion}
        </Typography>
      </CardContent>

      {/* Botón video */}
      <Box sx={{ px: 2.5, pb: 2.5 }}>
        <Button variant="outlined" size="small"
          startIcon={<PlayCircleOutlinedIcon />}
          disabled={!tema.videoUrl}
          href={tema.videoUrl || undefined} target="_blank" rel="noopener noreferrer"
          sx={{
            borderColor: tema.color, color: tema.color, fontWeight: 700, borderRadius: 2,
            '&:hover': { bgcolor: `${tema.color}10` },
            '&.Mui-disabled': { borderColor: `${tema.color}30`, color: `${tema.color}50` },
          }}
        >
          Ver video
        </Button>
        {!tema.videoUrl && (
          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5, fontSize: '0.62rem' }}>
            Video próximamente
          </Typography>
        )}
      </Box>
    </Card>
  );
}

export default function TejiendoMisSaberes() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const ini      = useIniciativaById(id);

  if (!ini) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography color="text.secondary">Iniciativa no encontrada</Typography>
      <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>Volver</Button>
    </Box>
  );

  const foto  = galeriaFotos[ini.imagenIndex] || null;
  const color = ini.colorSecundario;

  return (
    <Box>
      {/* Botón volver */}
      <Button startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/iniciativas-comunitarias/iniciativa/${id}`)}
        sx={{ mb: 2.5, color, fontWeight: 700, borderRadius: 2 }}>
        Volver a la Iniciativa
      </Button>

      {/* Banner */}
      <Paper elevation={0} sx={{
        mb: 5, borderRadius: 3, overflow: 'hidden', position: 'relative',
        background: `linear-gradient(135deg, ${color}ee 0%, ${color}88 100%)`,
        minHeight: { xs: 140, md: 180 }, display: 'flex', alignItems: 'stretch',
      }}>
        {foto && (
          <Box component="img" src={foto} alt=""
            sx={{ width: { xs: 110, sm: 160, md: 210 }, flexShrink: 0, objectFit: 'cover', opacity: 0.75 }} />
        )}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(90deg, ${TT.naranja} 0%, ${TT.verde} 50%, ${TT.purpura} 100%)` }} />
        <Box sx={{ flex: 1, px: { xs: 2.5, md: 4 }, py: 3, position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AutoStoriesIcon sx={{ color: '#fff', fontSize: 22 }} />
            </Box>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2,
              fontSize: { xs: '1.2rem', sm: '1.6rem', md: '1.9rem' } }}>
              Tejiendo mis Saberes
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.88)' }}>
            {ini.nombre} · {ini.comunidad}
          </Typography>
        </Box>
      </Paper>

      {/* ── Colección de documentos ──────────────────────── */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
          <Box sx={{ width: 5, height: 28, borderRadius: 2, bgcolor: color }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Colección de Documentos</Typography>
        </Box>
        <Box sx={{ maxWidth: 220 }}>
          <Card elevation={0} sx={{ border: `1.5px solid ${color}25`, borderRadius: 2.5, opacity: 0.65 }}>
            <CardActionArea disabled sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, textAlign: 'center' }}>
                <Box sx={{ width: 52, height: 52, borderRadius: 2, bgcolor: `${color}15`,
                  border: `2px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PictureAsPdfIcon sx={{ color, fontSize: 26 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color, mb: 0.25 }}>
                    Biblioteca digital
                  </Typography>
                  <Typography variant="caption" color="text.disabled" sx={{ display: 'block', lineHeight: 1.3 }}>
                    Colección de documentos en PDF
                  </Typography>
                </Box>
                <Chip label="Próximamente" size="small"
                  sx={{ fontSize: '0.65rem', height: 20, bgcolor: '#f5f5f5', color: 'text.disabled' }} />
              </Box>
            </CardActionArea>
          </Card>
        </Box>
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* ── Estantería Virtual ───────────────────────────── */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Box sx={{ width: 5, height: 28, borderRadius: 2, bgcolor: TT.naranja }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Estantería Virtual</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, ml: 3.5 }}>
          5 temáticas de formación — cada módulo incluye contenido y acceso a video
        </Typography>

        <Grid container spacing={2.5}>
          {tematicas.map((tema) => (
            <Grid key={tema.titulo} size={{ xs: 12, sm: 6, lg: 4 }}>
              <TarjetaTematica tema={tema} colorBase={color} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
