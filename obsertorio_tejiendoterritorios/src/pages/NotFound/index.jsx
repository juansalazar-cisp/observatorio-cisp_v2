import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TT } from '../../theme';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: 'center', py: 10 }}>
      <Typography
        variant="h1"
        sx={{ fontSize: '7rem', fontWeight: 700, lineHeight: 1, color: `${TT.naranja}25`, mb: 0 }}
      >
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 1, color: TT.marino }}>
        Página no encontrada
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3.5 }}>
        La ruta que buscas no existe en esta plataforma.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        sx={{ bgcolor: TT.naranja, '&:hover': { bgcolor: '#e8821a' }, px: 4, borderRadius: 3 }}
      >
        Volver al inicio
      </Button>
    </Box>
  );
}
