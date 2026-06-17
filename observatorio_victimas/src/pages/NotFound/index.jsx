import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { OV } from '../../theme';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: 'center', py: 10 }}>
      <Typography
        variant="h1"
        sx={{ fontSize: '7rem', fontWeight: 900, lineHeight: 1, color: `${OV.grisMedio}40`, mb: 0 }}
      >
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 1, color: OV.grisOscuro, fontWeight: 700 }}>
        Página no encontrada
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3.5 }}>
        La ruta que buscas no existe en esta plataforma.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        sx={{ bgcolor: OV.rojo, color: '#fff', '&:hover': { bgcolor: OV.rojoOscuro }, px: 4, borderRadius: 2.5 }}
      >
        Volver al inicio
      </Button>
    </Box>
  );
}
