import { Box, Button, Typography } from '@mui/material';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { useNavigate } from 'react-router-dom';

export default function SeccionEnDesarrollo({ modulo = 'este módulo' }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        gap: 2,
        textAlign: 'center',
      }}
    >
      <BuildCircleIcon sx={{ fontSize: 64, color: 'primary.main', opacity: 0.5 }} />
      <Typography variant="h5" color="text.secondary">
        {modulo} está en desarrollo
      </Typography>
      <Typography variant="body2" color="text.disabled" sx={{ maxWidth: 400 }}>
        Este espacio estará disponible próximamente con toda la funcionalidad del módulo.
      </Typography>
      <Button variant="outlined" color="primary" onClick={() => navigate('/')}>
        Volver al inicio
      </Button>
    </Box>
  );
}
