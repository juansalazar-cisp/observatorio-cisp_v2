import { Box, Typography, IconButton } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { TT } from '../../theme';

// Muestra un iframe si url está definida, o un placeholder visual si no.
// Props:
//   url        — string | null  → URL de YouTube embed (ej. https://www.youtube.com/embed/xxx)
//   titulo     — string         → texto descriptivo del video
//   color      — string         → color de acento (default TT.naranja)
//   aspectRatio — string        → default '16/9'

export default function VideoPlaceholder({ url = null, titulo = 'Video', color = TT.naranja, aspectRatio = '16/9' }) {
  if (url) {
    return (
      <Box
        sx={{
          width: '100%', aspectRatio,
          borderRadius: 3, overflow: 'hidden',
          bgcolor: '#000',
        }}
      >
        <Box
          component="iframe"
          src={url}
          title={titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sx={{ width: '100%', height: '100%', border: 0, display: 'block' }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%', aspectRatio,
        borderRadius: 3, overflow: 'hidden',
        bgcolor: TT.marino,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 1.5, position: 'relative',
        border: `2px solid ${color}25`,
      }}
    >
      {/* Gradiente decorativo */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at center, ${color}18 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      {/* Líneas decorativas */}
      <Box sx={{ position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)',
        pointerEvents: 'none' }}
      />
      <PlayCircleIcon sx={{ fontSize: 64, color, opacity: 0.6, position: 'relative', zIndex: 1 }} />
      <Typography
        variant="body2"
        sx={{ color: 'rgba(255,255,255,0.55)', fontWeight: 600, textAlign: 'center',
          px: 3, position: 'relative', zIndex: 1 }}
      >
        {titulo}
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: `${color}80`, position: 'relative', zIndex: 1 }}
      >
        Video próximamente
      </Typography>
    </Box>
  );
}
