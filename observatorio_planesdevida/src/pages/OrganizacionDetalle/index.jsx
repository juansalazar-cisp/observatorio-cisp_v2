import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Chip, Divider, Paper, Grid, Card, CardContent,
  IconButton, Tooltip,
} from '@mui/material';
import ArrowBackIcon           from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon        from '@mui/icons-material/ArrowForward';
import LockIcon                from '@mui/icons-material/Lock';
import AdminPanelSettingsIcon  from '@mui/icons-material/AdminPanelSettings';

// Íconos dinámicos
import { CISP }          from '../../theme';
import { useOrgData }    from '../../utils/orgData';
import ICON_MAP           from '../../utils/iconMap';

const GroupsIcon = ICON_MAP['Groups'];
import imaginario1    from '../../assets/imaginario1.png';
import imaginario2    from '../../assets/imaginario2.png';
import imaginario4    from '../../assets/imaginario4.png';
import imaginario5    from '../../assets/imaginario5.png';
import imaginario8    from '../../assets/imaginario8.png';
import fondo1         from '../../assets/fondo1.png';


const regionLabel = {
  andina: 'Andina', caribe: 'Caribe', pacifica: 'Pacífica',
  amazonica: 'Amazónica', orinoquia: 'Orinoquía',
};

const modulos = [
  {
    titulo: 'Mi Territorio',
    slug: 'mi-territorio',
    imagen: imaginario4,
    disponible: true,
    descripcion: 'Información geoespacial, contexto territorial y poblacional, elementos de identidad y cifras clave del territorio.',
  },
  {
    titulo: 'Mi Plan de Vida',
    slug: 'mi-plan-de-vida-modulo',
    imagen: imaginario1,
    disponible: true,
    descripcion: 'Líneas de intervención, propuesta de formulación, aplicativo de innovación y documento final del Plan de Vida.',
  },
  {
    titulo: 'Fortalecimiento Comunitario',
    slug: 'fortalecimiento',
    imagen: imaginario5,
    disponible: true,
    descripcion: 'Biblioteca digital y aula virtual con cinco temáticas de formación para el fortalecimiento de capacidades.',
  },
  {
    titulo: 'Tejiendo Caminos',
    slug: 'tejiendo-caminos',
    imagen: imaginario2,
    disponible: true,
    descripcion: 'Dashboard organizativo y rutas de mejora para el fortalecimiento de la gestión comunitaria.',
  },
  {
    titulo: 'Archivo Vivo del Territorio',
    slug: 'archivo-vivo',
    imagen: imaginario8,
    disponible: true,
    descripcion: 'Memoria comunitaria, convenios y gestión documental del territorio.',
  },
];

function TarjetaModulo({ modulo, orgSlug, primario }) {
  const navigate = useNavigate();
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: `1px solid ${primario}25`,
        borderRadius: 3,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        opacity: modulo.disponible ? 1 : 0.72,
        transition: 'transform 0.2s, box-shadow 0.2s',
        ...(modulo.disponible && {
          '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 12px 32px ${primario}28` },
        }),
      }}
    >
      <Box
        sx={{
          px: 2.5, pt: 2.5, pb: 2,
          background: `linear-gradient(135deg, ${primario}18 0%, ${primario}08 100%)`,
          borderBottom: `2px solid ${primario}18`,
          display: 'flex', alignItems: 'center', gap: 2,
        }}
      >
        <Box
          sx={{
            width: 50, height: 50, borderRadius: '50%', flexShrink: 0,
            bgcolor: `${primario}15`, border: `2px solid ${primario}28`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Box component="img" src={modulo.imagen} alt={modulo.titulo} sx={{ width: '65%', opacity: 0.85 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: primario, lineHeight: 1.2 }}
          >
            {modulo.titulo}
          </Typography>
          {!modulo.disponible && (
            <Chip
              label="Próximamente"
              size="small"
              icon={<LockIcon sx={{ fontSize: '0.65rem !important' }} />}
              sx={{ height: 18, fontSize: '0.6rem', mt: 0.5, bgcolor: `${primario}12`, color: primario }}
            />
          )}
        </Box>
      </Box>

      <CardContent sx={{ flex: 1, px: 2.5, py: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.82rem' }}>
          {modulo.descripcion}
        </Typography>
      </CardContent>

      <Box sx={{ px: 2.5, pb: 2.5 }}>
        <Button
          variant={modulo.disponible ? 'outlined' : 'text'}
          size="small"
          endIcon={modulo.disponible ? <ArrowForwardIcon /> : null}
          disabled={!modulo.disponible}
          onClick={() => modulo.disponible && navigate(`/org/${orgSlug}/${modulo.slug}`)}
          sx={{
            borderColor: primario, color: primario, fontWeight: 700, borderRadius: 2,
            '&:hover': { bgcolor: `${primario}10`, borderColor: primario },
            '&.Mui-disabled': { color: `${primario}55`, borderColor: `${primario}28` },
          }}
        >
          {modulo.disponible ? 'Explorar' : 'En construcción'}
        </Button>
      </Box>
    </Card>
  );
}

export default function OrganizacionDetalle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const org = useOrgData(slug);

  if (!org) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="text.secondary">Organización no encontrada</Typography>
        <Button onClick={() => navigate('/visualizacion')} sx={{ mt: 2 }}>
          Volver a Visualización
        </Button>
      </Box>
    );
  }

  const primario   = org.colores.primario;
  const secundario = org.colores.secundario;
  const Icon       = ICON_MAP[org.icono] || GroupsIcon;

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/visualizacion')}
        sx={{ mb: 3, color: primario, fontWeight: 700 }}
      >
        Volver a Visualización
      </Button>

      {/* Encabezado */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          mb: 5,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${primario}22 0%, ${secundario}10 100%)`,
          border: `1px solid ${primario}25`,
          borderLeft: `5px solid ${primario}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${fondo1})`, backgroundSize: 'cover', opacity: 0.04 }} />
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
          {/* Ícono */}
          <Box
            sx={{
              width: 60, height: 60, borderRadius: 2, flexShrink: 0,
              background: `linear-gradient(135deg, ${primario} 0%, ${secundario} 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 16px ${primario}40`,
            }}
          >
            <Icon sx={{ color: '#fff', fontSize: 30 }} />
          </Box>

          {/* Info */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
              <Chip
                label={`#${String(org.id).padStart(2, '0')}`}
                size="small"
                sx={{ bgcolor: `${primario}20`, color: primario, fontWeight: 700, fontSize: '0.7rem' }}
              />
              <Chip
                label={regionLabel[org.region]}
                size="small"
                sx={{ bgcolor: `${primario}10`, color: primario, fontWeight: 600, fontSize: '0.7rem' }}
              />
              <Chip
                label={org.pueblo}
                size="small"
                sx={{ bgcolor: `${secundario}18`, color: secundario, fontWeight: 600, fontSize: '0.7rem' }}
              />
            </Box>

            <Typography
              variant="h4"
              sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: primario, mb: 0.5, lineHeight: 1.2 }}
            >
              {org.etiqueta}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 400, lineHeight: 1.4 }}>
              {org.nombre}
            </Typography>
          </Box>

          {/* Admin + Depto */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
            <Button
              size="small"
              startIcon={<AdminPanelSettingsIcon sx={{ fontSize: '1rem !important' }} />}
              onClick={() => navigate('/admin')}
              variant="outlined"
              sx={{
                borderColor: `${primario}50`, color: primario, fontWeight: 700, borderRadius: 2,
                fontSize: '0.75rem', px: 1.5,
                '&:hover': { bgcolor: `${primario}10`, borderColor: primario },
              }}
            >
              Administración
            </Button>
            <Typography variant="caption" color="text.disabled" fontWeight={600}>
              {org.departamento}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Divider sx={{ mb: 4 }} />

      {/* Módulos */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: primario }} />
        <Box>
          <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>
            Módulos del Plan de Vida
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Componentes del sistema de información de la organización
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {modulos.map((modulo) => (
          <Grid key={modulo.titulo} size={{ xs: 12, sm: 6, lg: 4 }}>
            <TarjetaModulo modulo={modulo} orgSlug={org.slug} primario={primario} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
