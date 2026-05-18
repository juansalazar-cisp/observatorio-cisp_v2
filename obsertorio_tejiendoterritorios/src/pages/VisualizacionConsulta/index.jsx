import { Box, Typography, Paper, Chip } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { TT } from '../../theme';
import fondo3       from '../../assets/fondo3.png';
import ilustracion5 from '../../assets/ilustracion5.png';

export default function VisualizacionConsulta() {
  return (
    <Box>
      {/* Banner de sección */}
      <Paper
        elevation={0}
        sx={{
          mb: 4, px: { xs: 3, md: 4 }, py: 3,
          borderRadius: 3, overflow: 'hidden', position: 'relative',
          background: `linear-gradient(135deg, ${TT.verde}ee 0%, ${TT.verde}88 100%)`,
        }}
      >
        <Box
          component="img" src={fondo3} alt="" aria-hidden="true"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.08 }}
        />
        <Box
          component="img" src={ilustracion5} alt="" aria-hidden="true"
          sx={{ position: 'absolute', right: 20, bottom: -10, height: 100, objectFit: 'contain', opacity: 0.25 }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Chip label="Módulo" size="small" sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.25)', color: '#fff', fontWeight: 600, fontSize: '0.65rem' }} />
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
            Visualización y Consulta
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.88)' }}>
            Explora los territorios y organizaciones del proyecto
          </Typography>
        </Box>
      </Paper>

      {/* Dashboard placeholder */}
      <Paper
        elevation={0}
        sx={{
          p: 6, borderRadius: 3,
          border: `2px dashed ${TT.verde}35`,
          bgcolor: `${TT.verde}05`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          minHeight: 320, gap: 2, textAlign: 'center',
        }}
      >
        <MapIcon sx={{ fontSize: 64, color: TT.verde, opacity: 0.3 }} />
        <Typography variant="h5" sx={{ color: 'text.secondary' }}>
          Módulo en construcción
        </Typography>
        <Typography variant="body2" color="text.disabled" maxWidth={420}>
          Aquí se integrarán los mapas, filtros y herramientas de consulta territorial del proyecto.
        </Typography>
        <Chip label="Próximamente" size="small" sx={{ bgcolor: `${TT.verde}12`, color: TT.verde, fontWeight: 600 }} />
      </Paper>
    </Box>
  );
}
