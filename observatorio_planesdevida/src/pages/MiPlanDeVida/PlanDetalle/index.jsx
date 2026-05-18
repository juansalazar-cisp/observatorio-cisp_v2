import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Chip, Divider, Paper, Grid, Card, CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockIcon from '@mui/icons-material/Lock';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { CISP } from '../../../theme';
import { useOrgById } from '../../../utils/orgData';
import imaginario1 from '../../../assets/imaginario1.png';
import imaginario2 from '../../../assets/imaginario2.png';
import imaginario4 from '../../../assets/imaginario4.png';
import imaginario5 from '../../../assets/imaginario5.png';
import imaginario8 from '../../../assets/imaginario8.png';

const regionLabel = {
  andina:    'Andina',
  caribe:    'Caribe',
  pacifica:  'Pacífica',
  amazonica: 'Amazónica',
  orinoquia: 'Orinoquía',
};

const regionColor = {
  andina:    CISP.verde_agua,
  caribe:    CISP.amarillo,
  pacifica:  CISP.rojo,
  amazonica: CISP.verde,
  orinoquia: CISP.vino,
};

const modulosPlan = [
  {
    titulo: 'Mi Territorio',
    slug: 'mi-territorio',
    color: CISP.verde,
    imagen: imaginario4,
    disponible: true,
    descripcion: 'Recolección, organización y visualización de la información general del territorio y de la comunidad. Integra contexto territorial, poblacional, identidad comunitaria y representación geoespacial.',
  },
  {
    titulo: 'Mi Plan de Vida',
    slug: 'mi-plan-de-vida-modulo',
    color: CISP.amarillo,
    imagen: imaginario1,
    disponible: true,
    descripcion: 'Consolida y gestiona la información del Plan de Vida de la comunidad, transformando este instrumento en información estructurada, sistemática y actualizable para su consulta y seguimiento.',
  },
  {
    titulo: 'Fortalecimiento Comunitario',
    slug: 'fortalecimiento',
    color: CISP.rojo,
    imagen: imaginario5,
    disponible: true,
    descripcion: 'Repositorio centralizado de recursos pedagógicos y metodológicos utilizados en los procesos de fortalecimiento de capacidades con las comunidades para su acceso y apropiación.',
  },
  {
    titulo: 'Tejiendo Caminos',
    slug: 'tejiendo-caminos',
    color: CISP.vino,
    imagen: imaginario2,
    disponible: true,
    descripcion: 'Análisis, diagnóstico y fortalecimiento organizativo de las comunidades. Identifica capacidades actuales y construye rutas de mejora a partir de diagnósticos organizativos.',
  },
  {
    titulo: 'Archivo Vivo del Territorio',
    slug: 'archivo-vivo',
    color: CISP.azul_claro,
    imagen: imaginario8,
    disponible: true,
    descripcion: 'Preservación, organización y activación de la memoria territorial, articulando narrativas propias, herramientas de planificación y mecanismos de gestión documental.',
  },
];

function TarjetaModuloPlan({ modulo, planId, planColor }) {
  const navigate = useNavigate();
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: `1px solid ${modulo.color}30`,
        borderRadius: 3,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        opacity: modulo.disponible ? 1 : 0.7,
        transition: 'transform 0.2s, box-shadow 0.2s',
        ...(modulo.disponible && {
          '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 12px 32px ${modulo.color}28` },
        }),
      }}
    >
      <Box
        sx={{
          px: 2.5, pt: 2.5, pb: 2,
          background: `linear-gradient(135deg, ${modulo.color}18 0%, ${modulo.color}08 100%)`,
          borderBottom: `2px solid ${modulo.color}20`,
          display: 'flex', alignItems: 'center', gap: 2,
        }}
      >
        <Box
          sx={{
            width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
            bgcolor: `${modulo.color}15`, border: `2px solid ${modulo.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Box component="img" src={modulo.imagen} alt={modulo.titulo} sx={{ width: '65%', opacity: 0.85 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: modulo.color, lineHeight: 1.2 }}
          >
            {modulo.titulo}
          </Typography>
          {!modulo.disponible && (
            <Chip
              label="Próximamente"
              size="small"
              icon={<LockIcon sx={{ fontSize: '0.65rem !important' }} />}
              sx={{ height: 18, fontSize: '0.6rem', mt: 0.5, bgcolor: `${modulo.color}12`, color: modulo.color }}
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
          onClick={() => modulo.disponible && navigate(`/mi-plan-de-vida/plan/${planId}/${modulo.slug}`)}
          sx={{
            borderColor: modulo.color, color: modulo.color, fontWeight: 700, borderRadius: 2,
            '&:hover': { bgcolor: `${modulo.color}10`, borderColor: modulo.color },
            '&.Mui-disabled': { color: `${modulo.color}60`, borderColor: `${modulo.color}30` },
          }}
        >
          {modulo.disponible ? 'Explorar' : 'En construcción'}
        </Button>
      </Box>
    </Card>
  );
}

export default function PlanDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plan = useOrgById(id);

  if (!plan) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="text.secondary">Plan no encontrado</Typography>
        <Button onClick={() => navigate('/visualizacion')} sx={{ mt: 2 }}>
          Volver a la galería
        </Button>
      </Box>
    );
  }

  const color = regionColor[plan.region] || CISP.verde_agua;

  return (
    <Box>
      {/* Navegación de retorno */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, color, fontWeight: 700 }}
      >
        Volver
      </Button>

      {/* Encabezado del plan */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          mb: 5,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${color}22 0%, ${color}08 100%)`,
          border: `1px solid ${color}25`,
          borderLeft: `5px solid ${color}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
          <Box
            sx={{
              width: 56, height: 56, borderRadius: 2, flexShrink: 0,
              bgcolor: `${color}15`, border: `2px solid ${color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <MenuBookIcon sx={{ color, fontSize: 28 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
              <Chip label={`Plan #${String(plan.id).padStart(2, '0')}`} size="small"
                sx={{ bgcolor: `${color}20`, color, fontWeight: 700, fontSize: '0.7rem' }} />
              <Chip label={regionLabel[plan.region]} size="small"
                sx={{ bgcolor: `${color}10`, color, fontWeight: 600, fontSize: '0.7rem' }} />
            </Box>
            <Typography variant="h4"
              sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color, mb: 0.5 }}>
              Pueblo {plan.pueblo}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
              {plan.organizacion} · {plan.departamento}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
            <Button
              size="small"
              startIcon={<AdminPanelSettingsIcon sx={{ fontSize: '1rem !important' }} />}
              onClick={() => navigate('/admin')}
              variant="outlined"
              sx={{
                borderColor: `${color}50`, color, fontWeight: 700, borderRadius: 2,
                fontSize: '0.75rem', px: 1.5,
                '&:hover': { bgcolor: `${color}10`, borderColor: color },
              }}
            >
              Administración
            </Button>
            <Chip
              label={plan.estado}
              size="small"
              sx={{
                fontWeight: 700,
                bgcolor: plan.estado === 'Activo' ? '#F0FDF4' : '#FEF9C3',
                color:   plan.estado === 'Activo' ? '#166534' : '#854D0E',
              }}
            />
            <Typography variant="caption" color="text.disabled" fontWeight={600}>
              Año: {plan.año}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Módulos del plan */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: color }} />
        <Box>
          <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>
            Módulos del Plan de Vida
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Explora los componentes del sistema de información de la comunidad
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {modulosPlan.map((modulo) => (
          <Grid key={modulo.titulo} size={{ xs: 12, sm: 6, lg: 4 }}>
            <TarjetaModuloPlan modulo={modulo} planId={plan.id} planColor={color} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
