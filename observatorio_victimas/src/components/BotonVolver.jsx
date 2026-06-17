import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { OV } from '../theme';
import iconoFlecha from '../assets/icono_flecha.png';

export default function BotonVolver({ to }) {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => (to ? navigate(to) : navigate(-1))}
      sx={{
        display: 'inline-flex', alignItems: 'center', gap: 0.75,
        cursor: 'pointer', mb: 3,
        color: OV.grisOscuro, transition: 'color 0.15s',
        '&:hover': { color: OV.rojo },
      }}
    >
      <Box component="img" src={iconoFlecha} alt=""
        sx={{ width: 16, height: 16, objectFit: 'contain',
          transform: 'rotate(180deg)', filter: 'brightness(0) invert(0.35)' }} />
      <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>
        Volver
      </Typography>
    </Box>
  );
}
