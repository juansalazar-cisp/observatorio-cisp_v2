import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import RouteIcon from '@mui/icons-material/Route';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CompareIcon from '@mui/icons-material/Compare';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VerifiedIcon from '@mui/icons-material/Verified';

import ModuloBanner from '../../components/common/ModuloBanner';
import SeccionEnDesarrollo from '../../components/common/SeccionEnDesarrollo';
import { CISP } from '../../theme';

import imaginario2 from '../../assets/imaginario2.png';
import fondo4 from '../../assets/fondo4.png';

const componentes = [
  { titulo: 'Diagnóstico organizativo', icon: <AnalyticsIcon />,   descripcion: 'Caracterización de la gestión interna, procesos organizativos y prácticas documentales.' },
  { titulo: 'Análisis comparativo',     icon: <CompareIcon />,     descripcion: 'Contraste entre estado actual y estado ideal de fortalecimiento comunitario.' },
  { titulo: 'Rutas de mejora',          icon: <TrendingUpIcon />,  descripcion: 'Orientaciones que priorizan acciones y estrategias para el cierre de brechas.' },
  { titulo: 'Validación comunitaria',   icon: <VerifiedIcon />,    descripcion: 'Las comunidades consultan resultados, validan información y se apropian de las rutas.' },
];

export default function TejiendoCaminos() {
  return (
    <Box>
      <ModuloBanner
        titulo="Tejiendo Caminos"
        descripcion="Herramienta de análisis y proyección orientada al diagnóstico y fortalecimiento organizativo. Identifica capacidades instaladas, necesidades de fortalecimiento y construye rutas de mejora desde una lógica participativa y basada en evidencia."
        color={CISP.vino}
        icono={<RouteIcon sx={{ fontSize: 40 }} />}
        imagen={imaginario2}
        fondo={fondo4}
      />

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Componentes del módulo</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {componentes.map((c) => (
          <Grid key={c.titulo} size={{ xs: 12, sm: 6 }}>
            <Card elevation={0} sx={{ border: `1px solid ${CISP.vino}25`, height: '100%' }}>
              <CardContent sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ color: CISP.vino, flexShrink: 0, mt: 0.5 }}>{c.icon}</Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: CISP.vino, mb: 0.5 }}>{c.titulo}</Typography>
                  <Typography variant="body2" color="text.secondary">{c.descripcion}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <SeccionEnDesarrollo modulo="El módulo de diagnóstico organizativo" />
    </Box>
  );
}
