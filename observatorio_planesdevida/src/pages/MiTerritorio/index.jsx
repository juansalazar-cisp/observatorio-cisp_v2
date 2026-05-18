import {
  Box, Grid, Typography, Card, CardContent,
  Chip, Divider, Paper, Stack,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import TerrainIcon from '@mui/icons-material/Terrain';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LanguageIcon from '@mui/icons-material/Language';
import NatureIcon from '@mui/icons-material/Nature';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StraightenIcon from '@mui/icons-material/Straighten';
import GroupsIcon from '@mui/icons-material/Groups';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import HomeIcon from '@mui/icons-material/Home';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import GavelIcon from '@mui/icons-material/Gavel';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ForestIcon from '@mui/icons-material/Forest';
import WaterIcon from '@mui/icons-material/Water';

import ModuloBanner from '../../components/common/ModuloBanner';
import MapaColombia from '../../components/maps/MapaColombia';
import { CISP } from '../../theme';
import fondo1 from '../../assets/fondo1.png';
import imaginario4 from '../../assets/imaginario4.png';

// ── Placeholder fichas territoriales ─────────────────────
// Se reemplazará por datos dinámicos desde la BD al seleccionar un territorio

const contextoTerritorial = [
  { icon: <LocationOnIcon />,  label: 'Departamento',        valor: '—' },
  { icon: <LocationOnIcon />,  label: 'Municipio(s)',         valor: '—' },
  { icon: <StraightenIcon />,  label: 'Área total (ha)',      valor: '—' },
  { icon: <TerrainIcon />,     label: 'Región geográfica',    valor: '—' },
  { icon: <MapIcon />,         label: 'Resguardo/territorio', valor: '—' },
  { icon: <NatureIcon />,      label: 'Ecosistemas presentes',valor: '—' },
];

const contextoPoblacional = [
  { icon: <GroupsIcon />,         label: 'Población total',      valor: '—' },
  { icon: <ManIcon />,            label: 'Hombres',              valor: '—' },
  { icon: <WomanIcon />,          label: 'Mujeres',              valor: '—' },
  { icon: <HomeIcon />,           label: 'Número de familias',   valor: '—' },
  { icon: <FamilyRestroomIcon />, label: 'Jefes de hogar',       valor: '—' },
  { icon: <PeopleIcon />,         label: 'Comunidades internas', valor: '—' },
];

const elementosIdentidad = [
  {
    titulo: 'Pueblo indígena',
    descripcion: 'Nombre del pueblo o pueblos indígenas que habitan y reconocen este territorio como propio según sus usos y costumbres.',
    color: CISP.verde_agua,
    icon: <GroupsIcon sx={{ fontSize: 28 }} />,
    valor: '—',
  },
  {
    titulo: 'Lengua propia',
    descripcion: 'Idioma o idiomas ancestrales hablados por la comunidad. Elemento central de la identidad cultural y la transmisión del conocimiento.',
    color: CISP.amarillo,
    icon: <LanguageIcon sx={{ fontSize: 28 }} />,
    valor: '—',
  },
  {
    titulo: 'Autoridad tradicional',
    descripcion: 'Estructura de gobierno propio: cabildos, consejos mayores, capitanías u otras formas de autoridad reconocidas por la comunidad.',
    color: CISP.verde,
    icon: <GavelIcon sx={{ fontSize: 28 }} />,
    valor: '—',
  },
  {
    titulo: 'Marco normativo',
    descripcion: 'Normativa interna, usos y costumbres que rigen la vida comunitaria y el relacionamiento con el entorno institucional.',
    color: CISP.vino,
    icon: <AccountBalanceIcon sx={{ fontSize: 28 }} />,
    valor: '—',
  },
  {
    titulo: 'Memoria histórica',
    descripcion: 'Narrativas fundacionales, hitos históricos y procesos de resistencia que configuran la identidad territorial de la comunidad.',
    color: CISP.rojo,
    icon: <HistoryEduIcon sx={{ fontSize: 28 }} />,
    valor: '—',
  },
  {
    titulo: 'Relación con el territorio',
    descripcion: 'Formas simbólicas, espirituales y materiales de vinculación con la tierra, el agua, los bosques y los espacios sagrados.',
    color: CISP.azul_claro,
    icon: <ForestIcon sx={{ fontSize: 28 }} />,
    valor: '—',
  },
];

// ── Componente: tarjeta de contexto (territorial / poblacional) ───────────────
function TarjetaContexto({ titulo, color, icono, items }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: `1px solid ${color}25`,
        borderTop: `4px solid ${color}`,
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
          <Box
            sx={{
              width: 40, height: 40, borderRadius: '50%',
              bgcolor: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Box sx={{ color, fontSize: 20 }}>{icono}</Box>
          </Box>
          <Typography
            variant="h6"
            sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color }}
          >
            {titulo}
          </Typography>
        </Box>

        <Stack spacing={1.5}>
          {items.map((item) => (
            <Box
              key={item.label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 1.5, py: 1,
                borderRadius: 1.5,
                bgcolor: `${color}06`,
                border: `1px solid ${color}15`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                <Box sx={{ color, fontSize: 18, display: 'flex' }}>{item.icon}</Box>
                <Typography variant="body2">{item.label}</Typography>
              </Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: item.valor === '—' ? 'text.disabled' : color }}
              >
                {item.valor}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Typography
          variant="caption"
          color="text.disabled"
          sx={{ display: 'block', mt: 2, fontStyle: 'italic', textAlign: 'right' }}
        >
          Datos disponibles al seleccionar un territorio
        </Typography>
      </CardContent>
    </Card>
  );
}

// ── Componente: tarjeta de identidad ─────────────────────────────────────────
function TarjetaIdentidad({ elemento }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: `1px solid ${elemento.color}20`,
        borderRadius: 3,
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: `0 6px 20px ${elemento.color}20` },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box
            sx={{
              width: 52, height: 52, flexShrink: 0,
              borderRadius: 2,
              bgcolor: `${elemento.color}12`,
              border: `1.5px solid ${elemento.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Box sx={{ color: elemento.color }}>{elemento.icon}</Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: elemento.color, mb: 0.5 }}
            >
              {elemento.titulo}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 1.5 }}>
              {elemento.descripcion}
            </Typography>
            <Box
              sx={{
                display: 'inline-block',
                px: 1.5, py: 0.4,
                borderRadius: 1.5,
                bgcolor: `${elemento.color}10`,
                border: `1px dashed ${elemento.color}40`,
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: elemento.valor === '—' ? 'text.disabled' : elemento.color, fontWeight: 600 }}
              >
                {elemento.valor === '—' ? 'Por completar' : elemento.valor}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// ── Página Mi Territorio ──────────────────────────────────────────────────────
export default function MiTerritorio() {
  return (
    <Box>
      <ModuloBanner
        titulo="Mi Territorio"
        descripcion="Componente base del observatorio a nivel comunitario. Recolecta, organiza y visualiza la información general del territorio, integrando identidad comunitaria, ubicación geoespacial, narrativas propias y datos de fuentes secundarias."
        color={CISP.verde}
        icono={<MapIcon sx={{ fontSize: 40 }} />}
        imagen={imaginario4}
        fondo={fondo1}
      />

      {/* ── Sección 1: Mapa interactivo ─────────────────────────────── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: CISP.verde }} />
        <Box>
          <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>
            Identificación Espacial del Territorio
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Selecciona un departamento para explorar los territorios indígenas registrados
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 1,
          mb: 6,
          border: `1px solid ${CISP.verde}25`,
          borderRadius: 3,
          bgcolor: '#fff',
          overflow: 'hidden',
          maxWidth: 480,
          mx: 'auto',
        }}
      >
        <MapaColombia />
      </Paper>

      <Divider sx={{ mb: 5 }} />

      {/* ── Sección 2: Información de las Fichas ──────────────────────── */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: CISP.verde }} />
          <Box>
            <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>
              Información de las Fichas
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contexto territorial, poblacional y elementos de identidad comunitaria
            </Typography>
          </Box>
        </Box>

        <Chip
          label="Datos de referencia — se actualizarán al vincular la fuente de datos"
          size="small"
          sx={{ mb: 4, ml: { xs: 0, md: 3 }, bgcolor: `${CISP.amarillo}18`, color: '#7a5000', fontWeight: 600 }}
        />

        {/* Contexto territorial y poblacional */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TarjetaContexto
              titulo="Contexto Territorial"
              color={CISP.verde_agua}
              icono={<TerrainIcon />}
              items={contextoTerritorial}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TarjetaContexto
              titulo="Contexto Poblacional"
              color={CISP.verde}
              icono={<PeopleIcon />}
              items={contextoPoblacional}
            />
          </Grid>
        </Grid>

        {/* Elementos de identidad */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <AutoStoriesIcon sx={{ color: CISP.vino, fontSize: 24 }} />
            <Typography
              variant="h6"
              sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: CISP.vino }}
            >
              Elementos de Identidad
            </Typography>
          </Box>

          <Grid container spacing={2.5}>
            {elementosIdentidad.map((elemento) => (
              <Grid key={elemento.titulo} size={{ xs: 12, sm: 6, lg: 4 }}>
                <TarjetaIdentidad elemento={elemento} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Nota metodológica */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: `1px solid ${CISP.azul_claro}40`,
            borderLeft: `4px solid ${CISP.azul_claro}`,
            borderRadius: 2,
            bgcolor: `${CISP.azul_claro}06`,
            display: 'flex',
            gap: 2,
            alignItems: 'flex-start',
          }}
        >
          <WaterIcon sx={{ color: CISP.azul_claro, flexShrink: 0, mt: 0.2 }} />
          <Box>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
              Sobre las fichas territoriales
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              Las fichas de contexto territorial y poblacional se construyen con información generada por las propias
              comunidades, articulada con fuentes secundarias como el DANE, el IGAC y el Ministerio del Interior.
              Los datos se actualizan periódicamente mediante los procesos de validación comunitaria del observatorio.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
