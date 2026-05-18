import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Chip, Divider, Paper, Grid, Card, CardContent, CardActionArea,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SchoolIcon from '@mui/icons-material/School';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import NatureIcon from '@mui/icons-material/Nature';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import BalanceIcon from '@mui/icons-material/Balance';
import GavelIcon from '@mui/icons-material/Gavel';

import { CISP } from '../../../../theme';
import { useOrgById } from '../../../../utils/orgData';
import fondo3 from '../../../../assets/fondo3.png';
import imaginario5 from '../../../../assets/imaginario5.png';

const MODULO_COLOR = CISP.rojo;

const regionColor = {
  andina: CISP.verde_agua, caribe: CISP.amarillo, pacifica: CISP.rojo,
  amazonica: CISP.verde, orinoquia: CISP.vino,
};

const tematicas = [
  {
    titulo: 'Economías Propias',
    icono: <NatureIcon sx={{ fontSize: 28, color: '#3E7F00' }} />,
    color: '#3E7F00',
    descripcion: 'Exploración de los sistemas económicos indígenas basados en la reciprocidad, la minga y el intercambio comunitario. Aborda estrategias de autonomía económica, manejo de recursos naturales y emprendimientos desde la perspectiva del buen vivir.',
    videoUrl: null,
  },
  {
    titulo: 'Cuidado y Autocuidado',
    icono: <FavoriteIcon sx={{ fontSize: 28, color: '#D2232A' }} />,
    color: '#D2232A',
    descripcion: 'Prácticas de medicina tradicional, promotores de salud comunitaria y estrategias de bienestar integral desde la cosmovisión indígena. Incluye herramientas para el fortalecimiento de la salud física, emocional y espiritual de las comunidades.',
    videoUrl: null,
  },
  {
    titulo: 'Identidad Cultural y Buen Vivir Comunitario',
    icono: <EmojiPeopleIcon sx={{ fontSize: 28, color: '#218380' }} />,
    color: '#218380',
    descripcion: 'Recuperación y fortalecimiento de la identidad cultural a través de la lengua propia, los saberes ancestrales y las prácticas rituales que definen el ser indígena. Estrategias colectivas para el buen vivir desde la cosmovisión propia.',
    videoUrl: null,
  },
  {
    titulo: 'Igualdad de Género',
    icono: <BalanceIcon sx={{ fontSize: 28, color: '#8F2D56' }} />,
    color: '#8F2D56',
    descripcion: 'Análisis de roles de género en las comunidades indígenas y estrategias para la participación equitativa de mujeres, hombres y personas diversas en los espacios de gobierno propio, trabajo comunitario y toma de decisiones colectivas.',
    videoUrl: null,
  },
  {
    titulo: 'Derechos',
    icono: <GavelIcon sx={{ fontSize: 28, color: '#FFB600' }} />,
    color: '#FFB600',
    descripcion: 'Marco normativo nacional e internacional de los derechos de los pueblos indígenas. Herramientas para la defensa del territorio, la consulta previa, el acceso a la justicia y el ejercicio del derecho propio en armonía con el derecho positivo.',
    videoUrl: null,
  },
];

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

function TarjetaBibliotecaDigital() {
  return (
    <Box sx={{ maxWidth: 200 }}>
      <Card
        elevation={0}
        sx={{
          border: `1.5px solid ${MODULO_COLOR}30`,
          borderRadius: 2.5,
          opacity: 0.65,
        }}
      >
        <CardActionArea disabled sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, textAlign: 'center' }}>
            <Box
              sx={{
                width: 56, height: 56, borderRadius: 2,
                bgcolor: `${MODULO_COLOR}15`, border: `2px solid ${MODULO_COLOR}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <PictureAsPdfIcon sx={{ color: MODULO_COLOR, fontSize: 26 }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: MODULO_COLOR, mb: 0.25 }}>
                Biblioteca digital
              </Typography>
              <Typography variant="caption" color="text.disabled" sx={{ display: 'block', lineHeight: 1.3 }}>
                Colección de documentos en PDF
              </Typography>
            </Box>
            <Chip
              label="Próximamente"
              size="small"
              sx={{ fontSize: '0.65rem', height: 20, bgcolor: '#f5f5f5', color: 'text.disabled' }}
            />
          </Box>
        </CardActionArea>
      </Card>
    </Box>
  );
}

function TarjetaTematica({ tema }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: `1.5px solid ${tema.color}25`,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.18s, box-shadow 0.18s',
        '&:hover': { transform: 'translateY(-3px)', boxShadow: `0 8px 24px ${tema.color}20` },
      }}
    >
      {/* Cabecera de color */}
      <Box
        sx={{
          px: 2.5, pt: 2.5, pb: 2,
          background: `linear-gradient(135deg, ${tema.color}18 0%, ${tema.color}08 100%)`,
          borderBottom: `2px solid ${tema.color}15`,
          display: 'flex', alignItems: 'center', gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 46, height: 46, borderRadius: 2, flexShrink: 0,
            bgcolor: `${tema.color}15`, border: `1.5px solid ${tema.color}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {tema.icono}
        </Box>
        <Typography
          variant="subtitle1"
          sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: tema.color, lineHeight: 1.2 }}
        >
          {tema.titulo}
        </Typography>
      </Box>

      <CardContent sx={{ flex: 1, px: 2.5, py: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, fontSize: '0.82rem' }}>
          {tema.descripcion}
        </Typography>
      </CardContent>

      {/* Botón de video */}
      <Box sx={{ px: 2.5, pb: 2.5 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<PlayCircleOutlinedIcon />}
          disabled={!tema.videoUrl}
          href={tema.videoUrl || undefined}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderColor: tema.color, color: tema.color, fontWeight: 700, borderRadius: 2,
            '&:hover': { bgcolor: `${tema.color}10` },
            '&.Mui-disabled': { borderColor: `${tema.color}35`, color: `${tema.color}55` },
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

export default function PlanFortalecimiento() {
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
        sx={{ mb: 3, color: MODULO_COLOR, fontWeight: 700 }}
      >
        Volver al Plan de Vida
      </Button>

      {/* Banner */}
      <Paper
        elevation={0}
        sx={{
          mb: 5, px: { xs: 3, md: 4 }, py: 3.5,
          borderRadius: 3, overflow: 'hidden',
          background: `linear-gradient(135deg, ${MODULO_COLOR}dd 0%, ${MODULO_COLOR}99 100%)`,
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${fondo3})`, backgroundSize: 'cover', opacity: 0.1 }} />
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
          <Box component="img" src={imaginario5} alt="" sx={{ width: 60, opacity: 0.5, filter: 'brightness(10)', flexShrink: 0 }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Chip label={`Pueblo ${plan.pueblo}`} size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.25)', color: '#fff', fontWeight: 700, fontSize: '0.7rem' }} />
              <Chip label={plan.departamento} size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.7rem' }} />
            </Box>
            <Typography variant="h4"
              sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: '#fff', lineHeight: 1.2, mb: 0.5 }}>
              Fortalecimiento Comunitario
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', maxWidth: 600 }}>
              Recursos pedagógicos y metodológicos para el fortalecimiento de capacidades del Pueblo {plan.pueblo}.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Biblioteca digital */}
      <Box sx={{ mb: 5 }}>
        <SeccionHeader
          icono={<LibraryBooksIcon sx={{ color: MODULO_COLOR, fontSize: 22 }} />}
          titulo="Biblioteca digital"
          descripcion="Colección de documentos, materiales y publicaciones de acceso libre"
        />
        <TarjetaBibliotecaDigital />
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* Biblioteca Aula Virtual */}
      <Box>
        <SeccionHeader
          icono={<SchoolIcon sx={{ color: MODULO_COLOR, fontSize: 22 }} />}
          titulo="Biblioteca Aula Virtual"
          descripcion="5 temáticas de formación para el fortalecimiento comunitario — cada módulo incluye contenido y acceso a video"
        />

        <Grid container spacing={3}>
          {tematicas.map((tema) => (
            <Grid key={tema.titulo} size={{ xs: 12, sm: 6, lg: 4 }}>
              <TarjetaTematica tema={tema} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
