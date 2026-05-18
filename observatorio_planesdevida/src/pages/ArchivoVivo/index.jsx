import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ClassIcon from '@mui/icons-material/Class';
import InventoryIcon from '@mui/icons-material/Inventory';

import ModuloBanner from '../../components/common/ModuloBanner';
import SeccionEnDesarrollo from '../../components/common/SeccionEnDesarrollo';
import { CISP } from '../../theme';

import imaginario8 from '../../assets/imaginario8.png';
import fondo1 from '../../assets/fondo1.png';

const componentes = [
  { titulo: 'Narrativas comunitarias', icon: <AutoStoriesIcon />, descripcion: 'Relatos y textos que recogen las formas de relación cultural y simbólica con el territorio.' },
  { titulo: 'Registros audiovisuales', icon: <PhotoCameraIcon />, descripcion: 'Fotografías y registros visuales producidos por las comunidades.' },
  { titulo: 'Clasificación documental',icon: <ClassIcon />,       descripcion: 'Cuadros de clasificación y tablas de retención que estructuran el archivo comunitario.' },
  { titulo: 'Gestión y conservación',  icon: <InventoryIcon />,  descripcion: 'Almacenamiento, recuperación y disposición de información con trazabilidad garantizada.' },
];

export default function ArchivoVivo() {
  return (
    <Box>
      <ModuloBanner
        titulo="Archivo Vivo del Territorio"
        descripcion="Espacio dinámico orientado a la preservación, organización y activación de la memoria territorial. Articula narrativas propias, registros audiovisuales y gestión documental técnica, reconociendo a las comunidades como productoras activas de conocimiento."
        color={CISP.azul_claro}
        icono={<FolderSpecialIcon sx={{ fontSize: 40 }} />}
        imagen={imaginario8}
        fondo={fondo1}
      />

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Componentes del módulo</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {componentes.map((c) => (
          <Grid key={c.titulo} size={{ xs: 12, sm: 6 }}>
            <Card elevation={0} sx={{ border: `1px solid ${CISP.azul_claro}50`, height: '100%' }}>
              <CardContent sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ color: CISP.azul_claro, flexShrink: 0, mt: 0.5 }}>{c.icon}</Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: CISP.azul_claro, mb: 0.5 }}>{c.titulo}</Typography>
                  <Typography variant="body2" color="text.secondary">{c.descripcion}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <SeccionEnDesarrollo modulo="El archivo documental territorial" />
    </Box>
  );
}
