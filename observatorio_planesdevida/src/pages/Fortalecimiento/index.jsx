import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import LabelIcon from '@mui/icons-material/Label';
import SearchIcon from '@mui/icons-material/Search';

import ModuloBanner from '../../components/common/ModuloBanner';
import SeccionEnDesarrollo from '../../components/common/SeccionEnDesarrollo';
import { CISP } from '../../theme';

import imaginario5 from '../../assets/imaginario5.png';
import fondo3 from '../../assets/fondo3.png';

const funcionalidades = [
  { titulo: 'Repositorio de materiales', icon: <FolderOpenIcon />, descripcion: 'Presentaciones, herramientas didácticas, instrumentos de trabajo y piezas audiovisuales.' },
  { titulo: 'Clasificación temática',    icon: <LabelIcon />,      descripcion: 'Organización por temáticas, tipo de material y líneas de fortalecimiento.' },
  { titulo: 'Búsqueda y recuperación',   icon: <SearchIcon />,     descripcion: 'Recuperación ágil de contenidos para facilitar su reutilización y evitar dispersión.' },
  { titulo: 'Acceso comunitario',        icon: <GroupsIcon />,     descripcion: 'Disponible para equipos técnicos y comunidades en sus procesos de formación.' },
];

export default function Fortalecimiento() {
  return (
    <Box>
      <ModuloBanner
        titulo="Fortalecimiento Comunitario"
        descripcion="Repositorio centralizado de recursos pedagógicos y metodológicos utilizados en los procesos de fortalecimiento de capacidades con las comunidades. Facilita el acceso, consulta y apropiación de herramientas formativas."
        color={CISP.rojo}
        icono={<GroupsIcon sx={{ fontSize: 40 }} />}
        imagen={imaginario5}
        fondo={fondo3}
      />

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Funcionalidades</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {funcionalidades.map((f) => (
          <Grid key={f.titulo} size={{ xs: 12, sm: 6 }}>
            <Card elevation={0} sx={{ border: `1px solid ${CISP.rojo}25`, height: '100%' }}>
              <CardContent sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ color: CISP.rojo, flexShrink: 0, mt: 0.5 }}>{f.icon}</Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: CISP.rojo, mb: 0.5 }}>{f.titulo}</Typography>
                  <Typography variant="body2" color="text.secondary">{f.descripcion}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <SeccionEnDesarrollo modulo="El repositorio de fortalecimiento" />
    </Box>
  );
}
