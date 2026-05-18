import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, Chip, Divider, Paper,
  TextField, MenuItem, InputAdornment, Tooltip, IconButton, CardActionArea,
} from '@mui/material';
import DashboardIcon   from '@mui/icons-material/Dashboard';
import SearchIcon      from '@mui/icons-material/Search';
import FilterListIcon  from '@mui/icons-material/FilterList';
import ClearIcon       from '@mui/icons-material/Clear';
import BarChartIcon    from '@mui/icons-material/BarChart';

import ModuloBanner  from '../../components/common/ModuloBanner';
import MapaColombia  from '../../components/maps/MapaColombia';
import { CISP }      from '../../theme';
import fondo1        from '../../assets/fondo1.png';
import imaginario3   from '../../assets/imaginario3.png';
import organizaciones from '../../data/organizaciones';
import { useOrgs } from '../../utils/orgData';
import ICON_MAP       from '../../utils/iconMap';

const regionLabel = {
  andina:    'Andina',
  caribe:    'Caribe',
  pacifica:  'Pacífica',
  amazonica: 'Amazónica',
  orinoquia: 'Orinoquía',
};

// Valores únicos para filtros
const pueblosUnicos = [
  'Todos',
  ...Array.from(new Set(organizaciones.map((o) => o.pueblo))).sort(),
];

// ── Tarjeta de organización ───────────────────────────────
function TarjetaOrganizacion({ org }) {
  const navigate = useNavigate();
  const primario = org.colores.primario;
  const secundario = org.colores.secundario;
  const Icon = ICON_MAP[org.icono] || GroupsIcon;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2.5,
        overflow: 'hidden',
        border: `1.5px solid ${primario}30`,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.18s, box-shadow 0.18s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 8px 28px ${primario}40` },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/org/${org.slug}`)}
        sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        {/* Encabezado coloreado */}
        <Box
          sx={{
            height: 108,
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${primario} 0%, ${secundario} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${fondo1})`,
              backgroundSize: 'cover', opacity: 0.08,
            }}
          />
          <Box
            sx={{
              position: 'absolute', top: 8, left: 10,
              bgcolor: 'rgba(255,255,255,0.22)', borderRadius: 1, px: 1, py: 0.25,
            }}
          >
            <Typography sx={{ color: '#fff', fontSize: '0.65rem', fontWeight: 800, lineHeight: 1 }}>
              #{String(org.id).padStart(2, '0')}
            </Typography>
          </Box>
          <Icon sx={{ fontSize: 44, color: 'rgba(255,255,255,0.92)', position: 'relative', zIndex: 1 }} />
          <Box sx={{ position: 'absolute', bottom: 8, left: 10 }}>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.85)', fontSize: '0.62rem',
                fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase',
              }}
            >
              {regionLabel[org.region]}
            </Typography>
          </Box>
        </Box>

        {/* Información */}
        <Box sx={{ px: 1.5, pt: 1.5, pb: 1.75, bgcolor: '#fff', flex: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 800, color: primario, lineHeight: 1.25, mb: 0.4,
              fontSize: '0.8rem',
              display: '-webkit-box', WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}
          >
            {org.etiqueta}
          </Typography>
          <Typography
            variant="caption" color="text.secondary"
            sx={{ display: 'block', lineHeight: 1.3, mb: 0.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.7rem' }}
          >
            {org.pueblo}
          </Typography>
          <Typography
            variant="caption" color="text.disabled"
            sx={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.68rem' }}
          >
            {org.departamento}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}

// ── Barra de filtros ──────────────────────────────────────
function BarraFiltros({ busqueda, setBusqueda, pueblo, setPueblo, region, setRegion, total, filtrados }) {
  const limpiar = () => { setBusqueda(''); setPueblo('Todos'); setRegion('Todas'); };
  const hayFiltros = busqueda || pueblo !== 'Todos' || region !== 'Todas';

  return (
    <Box
      sx={{
        mb: 3, p: { xs: 2, md: 2.5 },
        borderRadius: 2.5, border: `1.5px solid ${CISP.verde_agua}25`,
        bgcolor: '#fff', display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center',
      }}
    >
      <FilterListIcon sx={{ color: CISP.verde_agua, flexShrink: 0 }} />

      <TextField
        size="small"
        placeholder="Buscar organización, pueblo o departamento…"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        sx={{ flex: '1 1 240px', minWidth: 200 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        select size="small" label="Pueblo"
        value={pueblo} onChange={(e) => setPueblo(e.target.value)}
        sx={{ flex: '1 1 150px', minWidth: 140 }}
      >
        {pueblosUnicos.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
      </TextField>

      <TextField
        select size="small" label="Región"
        value={region} onChange={(e) => setRegion(e.target.value)}
        sx={{ flex: '1 1 130px', minWidth: 120 }}
      >
        <MenuItem value="Todas">Todas</MenuItem>
        {Object.entries(regionLabel).map(([k, v]) => (
          <MenuItem key={k} value={k}>{v}</MenuItem>
        ))}
      </TextField>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
        <Chip
          label={`${filtrados} de ${total}`}
          size="small"
          sx={{ bgcolor: `${CISP.verde_agua}15`, color: CISP.verde_agua, fontWeight: 700 }}
        />
        {hayFiltros && (
          <Tooltip title="Limpiar filtros">
            <IconButton size="small" onClick={limpiar} sx={{ color: 'text.disabled' }}>
              <ClearIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}

// ── Página principal ──────────────────────────────────────
export default function VisualizacionConsulta() {
  const [busqueda, setBusqueda] = useState('');
  const [pueblo, setPueblo]     = useState('Todos');
  const [region, setRegion]     = useState('Todas');
  const orgs = useOrgs();

  const orgsFiltradas = useMemo(() => {
    const q = busqueda.toLowerCase();
    return orgs.filter((o) => {
      if (!o.activo) return false;
      const matchTexto = !q ||
        o.nombre.toLowerCase().includes(q) ||
        o.etiqueta.toLowerCase().includes(q) ||
        o.pueblo.toLowerCase().includes(q) ||
        o.departamento.toLowerCase().includes(q);
      const matchPueblo = pueblo === 'Todos' || o.pueblo === pueblo;
      const matchRegion = region === 'Todas' || o.region === region;
      return matchTexto && matchPueblo && matchRegion;
    });
  }, [busqueda, pueblo, region]);

  return (
    <Box>
      <ModuloBanner
        titulo="Visualización y Consulta"
        descripcion="Explora la información consolidada de los Planes de Vida de comunidades indígenas en Colombia. Haz clic sobre cualquier departamento para ver planes registrados, comunidades y pueblos indígenas."
        color={CISP.verde_agua}
        icono={<DashboardIcon sx={{ fontSize: 40 }} />}
        imagen={imaginario3}
        fondo={fondo1}
      />

      {/* Mapa interactivo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: CISP.verde_agua }} />
        <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>
          Mapa de Planes de Vida por departamento
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2, mb: 6,
          border: `1px solid ${CISP.verde_agua}25`,
          borderRadius: 3, bgcolor: '#fff', overflow: 'hidden',
          maxWidth: 700, mx: 'auto',
        }}
      >
        <MapaColombia />
      </Paper>

      <Divider sx={{ mb: 5 }} />

      {/* Dashboard */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: CISP.verde_agua }} />
        <Box>
          <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Indicadores y métricas consolidadas del observatorio
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          mb: 6, p: 6,
          border: `1.5px dashed ${CISP.verde_agua}40`,
          borderRadius: 3, bgcolor: `${CISP.verde_agua}05`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: 220, gap: 1.5,
        }}
      >
        <BarChartIcon sx={{ fontSize: 56, color: CISP.verde_agua, opacity: 0.35 }} />
        <Typography variant="h6" color="text.secondary" sx={{ fontFamily: '"Alegreya Sans", serif' }}>
          Dashboard en construcción
        </Typography>
        <Typography variant="body2" color="text.disabled" textAlign="center" maxWidth={400}>
          Aquí se integrarán gráficas e indicadores con los datos del observatorio.
        </Typography>
      </Paper>

      <Divider sx={{ mb: 5 }} />

      {/* Organizaciones */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
        <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: CISP.verde_agua }} />
        <Box>
          <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>
            Organizaciones
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {orgs.filter((o) => o.activo).length} organizaciones indígenas registradas
          </Typography>
        </Box>
      </Box>

      <BarraFiltros
        busqueda={busqueda} setBusqueda={setBusqueda}
        pueblo={pueblo}     setPueblo={setPueblo}
        region={region}     setRegion={setRegion}
        total={orgs.filter((o) => o.activo).length}
        filtrados={orgsFiltradas.length}
      />

      {orgsFiltradas.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
              lg: 'repeat(5, 1fr)',
            },
            gap: 2,
          }}
        >
          {orgsFiltradas.map((org) => (
            <TarjetaOrganizacion key={org.id} org={org} />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            py: 8, textAlign: 'center',
            border: `2px dashed ${CISP.verde_agua}25`,
            borderRadius: 3, bgcolor: `${CISP.verde_agua}04`,
          }}
        >
          <SearchIcon sx={{ fontSize: 48, color: CISP.verde_agua, opacity: 0.35, mb: 1 }} />
          <Typography variant="h6" color="text.secondary">Sin resultados</Typography>
          <Typography variant="body2" color="text.disabled">
            Ajusta los filtros para encontrar organizaciones
          </Typography>
        </Box>
      )}
    </Box>
  );
}
