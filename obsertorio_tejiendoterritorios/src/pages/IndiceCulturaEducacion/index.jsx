import { Box, Typography, Paper, Chip } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { TT } from '../../theme';
import fondo4         from '../../assets/fondo4.png';
import ilustracion10  from '../../assets/ilustracion10.png';

export default function IndiceCulturaEducacion() {
  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          mb: 4, px: { xs: 3, md: 4 }, py: 3.5,
          borderRadius: 3, overflow: 'hidden', position: 'relative',
          background: `linear-gradient(135deg, ${TT.marino}ee 0%, #2a2e5a 100%)`,
        }}
      >
        <Box component="img" src={fondo4} alt="" aria-hidden="true"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.08 }} />
        <Box component="img" src={ilustracion10} alt="" aria-hidden="true"
          sx={{ position: 'absolute', right: 20, bottom: -10, height: 110, objectFit: 'contain', opacity: 0.25 }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Chip label="Sección" size="small" sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.25)', color: '#fff', fontWeight: 600, fontSize: '0.65rem' }} />
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
            Índice de Cultura y Educación
          </Typography>
          <Typography variant="body2" sx={{ color: TT.crema, opacity: 0.88 }}>
            Indicadores culturales y educativos de los pueblos indígenas
          </Typography>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: 6, borderRadius: 3, border: `2px dashed ${TT.marino}25`, bgcolor: `${TT.marino}04`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320, gap: 2, textAlign: 'center' }}>
        <AutoStoriesIcon sx={{ fontSize: 64, color: TT.marino, opacity: 0.25 }} />
        <Typography variant="h5" sx={{ color: 'text.secondary' }}>Módulo en construcción</Typography>
        <Typography variant="body2" color="text.disabled" maxWidth={420}>
          Aquí se presentarán los índices e indicadores sobre cultura y educación de las comunidades indígenas del proyecto.
        </Typography>
        <Chip label="Próximamente" size="small" sx={{ bgcolor: `${TT.marino}10`, color: TT.marino, fontWeight: 600 }} />
      </Paper>
    </Box>
  );
}
