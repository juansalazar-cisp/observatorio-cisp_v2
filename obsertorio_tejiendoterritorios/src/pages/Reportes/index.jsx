import { Box, Typography, Paper, Chip } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { TT } from '../../theme';
import fondo4       from '../../assets/fondo4.png';
import ilustracion6 from '../../assets/ilustracion6.png';

export default function Reportes() {
  return (
    <Box>
      {/* Banner de sección */}
      <Paper
        elevation={0}
        sx={{
          mb: 4, px: { xs: 3, md: 4 }, py: 3,
          borderRadius: 3, overflow: 'hidden', position: 'relative',
          background: `linear-gradient(135deg, ${TT.purpura}ee 0%, ${TT.purpura}88 100%)`,
        }}
      >
        <Box
          component="img" src={fondo4} alt="" aria-hidden="true"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.08 }}
        />
        <Box
          component="img" src={ilustracion6} alt="" aria-hidden="true"
          sx={{ position: 'absolute', right: 20, bottom: -10, height: 100, objectFit: 'contain', opacity: 0.25 }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Chip label="Módulo" size="small" sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.25)', color: '#fff', fontWeight: 600, fontSize: '0.65rem' }} />
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
            Reportes y Productos
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.88)' }}>
            Documentos, cartillas y productos del proyecto
          </Typography>
        </Box>
      </Paper>

      {/* Contenido placeholder */}
      <Paper
        elevation={0}
        sx={{
          p: 6, borderRadius: 3,
          border: `2px dashed ${TT.purpura}35`,
          bgcolor: `${TT.purpura}05`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          minHeight: 320, gap: 2, textAlign: 'center',
        }}
      >
        <AssessmentIcon sx={{ fontSize: 64, color: TT.purpura, opacity: 0.3 }} />
        <Typography variant="h5" sx={{ color: 'text.secondary' }}>
          Módulo en construcción
        </Typography>
        <Typography variant="body2" color="text.disabled" maxWidth={420}>
          Aquí estarán disponibles los reportes, cartillas, bases de datos y productos del proyecto.
        </Typography>
        <Chip label="Próximamente" size="small" sx={{ bgcolor: `${TT.purpura}12`, color: TT.purpura, fontWeight: 600 }} />
      </Paper>
    </Box>
  );
}
