import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, TextField, MenuItem, InputAdornment,
  Chip, Card, CardActionArea, Tooltip, IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ClearIcon from '@mui/icons-material/Clear';

import ModuloBanner from '../../components/common/ModuloBanner';
import { CISP } from '../../theme';
import { useOrgs } from '../../utils/orgData';
import fondo1 from '../../assets/fondo1.png';
import fondo2 from '../../assets/fondo2.png';
import fondo3 from '../../assets/fondo3.png';
import fondo4 from '../../assets/fondo4.png';
import imaginario1 from '../../assets/imaginario1.png';
import imaginario2 from '../../assets/imaginario2.png';
import imaginario3 from '../../assets/imaginario3.png';
import imaginario4 from '../../assets/imaginario4.png';
import imaginario5 from '../../assets/imaginario5.png';
import imaginario6 from '../../assets/imaginario6.png';
import imaginario7 from '../../assets/imaginario7.png';
import imaginario8 from '../../assets/imaginario8.png';
import imaginario1Banner from '../../assets/imaginario1.png';

// ── Mapeo visual por región ───────────────────────────────
const regionConfig = {
  andina:    { color: CISP.verde_agua, fondo: fondo1 },
  caribe:    { color: CISP.amarillo,   fondo: fondo2 },
  pacifica:  { color: CISP.rojo,       fondo: fondo3 },
  amazonica: { color: CISP.verde,      fondo: fondo1 },
  orinoquia: { color: CISP.vino,       fondo: fondo4 },
};

const regionLabel = {
  andina:    'Andina',
  caribe:    'Caribe',
  pacifica:  'Pacífica',
  amazonica: 'Amazónica',
  orinoquia: 'Orinoquía',
};

const estadoColor = {
  'Activo':            { bg: '#F0FDF4', color: '#166534', border: '#bbf7d0' },
  'En formulación':    { bg: '#FEF9C3', color: '#854D0E', border: '#fde68a' },
  'En actualización':  { bg: '#EFF6FF', color: '#1D4ED8', border: '#bfdbfe' },
  'En revisión':       { bg: '#FFF7ED', color: '#9A3412', border: '#fed7aa' },
};

const imaginarios = [
  imaginario1, imaginario2, imaginario3, imaginario4,
  imaginario5, imaginario6, imaginario7, imaginario8,
];

const estados = ['Todos', 'Activo', 'En formulación', 'En actualización', 'En revisión'];
const regiones = ['Todas', ...Object.entries(regionLabel).map(([k, v]) => ({ key: k, label: v }))];

// ── Tarjeta de Plan de Vida ───────────────────────────────
function TarjetaPlan({ plan }) {
  const navigate = useNavigate();
  const { color, fondo } = regionConfig[plan.region] || regionConfig.andina;
  const imaginario = imaginarios[(plan.id - 1) % imaginarios.length];
  const ec = estadoColor[plan.estado] || estadoColor['En formulación'];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2.5,
        overflow: 'hidden',
        border: `1.5px solid ${color}25`,
        transition: 'transform 0.18s, box-shadow 0.18s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 24px ${color}35`,
        },
      }}
    >
      <CardActionArea onClick={() => navigate(`/mi-plan-de-vida/plan/${plan.id}`)}>
        {/* Encabezado coloreado con imaginario */}
        <Box
          sx={{
            height: 110,
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${color}dd 0%, ${color}99 100%)`,
          }}
        >
          {/* Fondo con patrón */}
          <Box
            component="img"
            src={fondo}
            alt=""
            aria-hidden="true"
            sx={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', opacity: 0.12,
            }}
          />
          {/* Imaginario decorativo */}
          <Box
            component="img"
            src={imaginario}
            alt=""
            aria-hidden="true"
            sx={{
              position: 'absolute',
              bottom: -8, right: -8,
              width: 90, opacity: 0.25,
              filter: 'brightness(10)',
            }}
          />
          {/* Número de plan */}
          <Box
            sx={{
              position: 'absolute', top: 8, left: 10,
              bgcolor: 'rgba(255,255,255,0.25)',
              borderRadius: 1, px: 1, py: 0.25,
            }}
          >
            <Typography sx={{ color: '#fff', fontSize: '0.65rem', fontWeight: 800, lineHeight: 1 }}>
              #{String(plan.id).padStart(2, '0')}
            </Typography>
          </Box>
          {/* Región */}
          <Box sx={{ position: 'absolute', bottom: 8, left: 10 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>
              {regionLabel[plan.region]}
            </Typography>
          </Box>
        </Box>

        {/* Información */}
        <Box sx={{ px: 1.5, pt: 1.5, pb: 1.75, bgcolor: '#fff' }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 800, color: color, lineHeight: 1.2, mb: 0.3,
              fontSize: '0.82rem',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}
          >
            {plan.pueblo}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: 'block', lineHeight: 1.3, mb: 0.8,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              fontSize: '0.7rem',
            }}
          >
            {plan.departamento}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 0.5 }}>
            <Box
              sx={{
                px: 0.8, py: 0.2,
                borderRadius: 1,
                bgcolor: ec.bg,
                border: `1px solid ${ec.border}`,
                flexShrink: 0,
              }}
            >
              <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, color: ec.color, lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                {plan.estado}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '0.65rem', color: 'text.disabled', fontWeight: 600 }}>
              {plan.año}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}

// ── Barra de búsqueda y filtros ───────────────────────────
function BarraFiltros({ busqueda, setBusqueda, depto, setDepto, estado, setEstado, region, setRegion, total, filtrados, departamentos }) {
  const limpiar = () => { setBusqueda(''); setDepto('Todos'); setEstado('Todos'); setRegion('Todas'); };
  const hayFiltros = busqueda || depto !== 'Todos' || estado !== 'Todos' || region !== 'Todas';

  return (
    <Box
      sx={{
        mb: 3,
        p: { xs: 2, md: 2.5 },
        borderRadius: 2.5,
        border: `1.5px solid ${CISP.verde_agua}25`,
        bgcolor: '#fff',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1.5,
        alignItems: 'center',
      }}
    >
      <FilterListIcon sx={{ color: CISP.verde_agua, flexShrink: 0 }} />

      {/* Búsqueda por texto */}
      <TextField
        size="small"
        placeholder="Buscar pueblo u organización…"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        sx={{ flex: '1 1 220px', minWidth: 180 }}
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

      {/* Filtro departamento */}
      <TextField
        select
        size="small"
        label="Departamento"
        value={depto}
        onChange={(e) => setDepto(e.target.value)}
        sx={{ flex: '1 1 160px', minWidth: 150 }}
      >
        {departamentos.map((d) => (
          <MenuItem key={d} value={d}>{d}</MenuItem>
        ))}
      </TextField>

      {/* Filtro estado */}
      <TextField
        select
        size="small"
        label="Estado"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        sx={{ flex: '1 1 150px', minWidth: 140 }}
      >
        {estados.map((e) => (
          <MenuItem key={e} value={e}>{e}</MenuItem>
        ))}
      </TextField>

      {/* Filtro región */}
      <TextField
        select
        size="small"
        label="Región"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        sx={{ flex: '1 1 130px', minWidth: 120 }}
      >
        <MenuItem value="Todas">Todas</MenuItem>
        {Object.entries(regionLabel).map(([k, v]) => (
          <MenuItem key={k} value={k}>{v}</MenuItem>
        ))}
      </TextField>

      {/* Contador + limpiar */}
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

// ── Página Mi Plan de Vida ────────────────────────────────
export default function MiPlanDeVida() {
  const planesDeVida = useOrgs();
  const departamentos = useMemo(
    () => ['Todos', ...Array.from(new Set(planesDeVida.map((p) => p.departamento))).sort()],
    [planesDeVida]
  );
  const [busqueda, setBusqueda] = useState('');
  const [depto, setDepto]       = useState('Todos');
  const [estado, setEstado]     = useState('Todos');
  const [region, setRegion]     = useState('Todas');

  const planesFiltrados = useMemo(() => {
    const q = busqueda.toLowerCase();
    return planesDeVida.filter((p) => {
      const matchTexto = !q || p.pueblo.toLowerCase().includes(q) || p.organizacion.toLowerCase().includes(q);
      const matchDepto  = depto === 'Todos' || p.departamento === depto;
      const matchEstado = estado === 'Todos' || p.estado === estado;
      const matchRegion = region === 'Todas' || p.region === region;
      return matchTexto && matchDepto && matchEstado && matchRegion;
    });
  }, [busqueda, depto, estado, region]);

  return (
    <Box>
      <ModuloBanner
        titulo="Mi Plan de Vida"
        descripcion="Consolida, organiza y gestiona la información de los Planes de Vida de cada comunidad indígena — el principal instrumento de planificación y proyección del desarrollo propio. Consulta los 36 planes registrados."
        color={CISP.amarillo}
        icono={<MenuBookIcon sx={{ fontSize: 40 }} />}
        imagen={imaginario1Banner}
        fondo={fondo2}
      />

      {/* Encabezado */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
        <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: CISP.amarillo }} />
        <Box>
          <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>
            Planes de Vida registrados
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {planesDeVida.length} planes de comunidades indígenas colombianas
          </Typography>
        </Box>
      </Box>

      {/* Barra de búsqueda y filtros */}
      <BarraFiltros
        busqueda={busqueda} setBusqueda={setBusqueda}
        depto={depto}       setDepto={setDepto}
        estado={estado}     setEstado={setEstado}
        region={region}     setRegion={setRegion}
        total={planesDeVida.length}
        filtrados={planesFiltrados.length}
        departamentos={departamentos}
      />

      {/* Galería — 5 columnas en desktop */}
      {planesFiltrados.length > 0 ? (
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
          {planesFiltrados.map((plan) => (
            <TarjetaPlan key={plan.id} plan={plan} />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            py: 8, textAlign: 'center',
            border: `2px dashed ${CISP.amarillo}30`,
            borderRadius: 3,
            bgcolor: `${CISP.amarillo}05`,
          }}
        >
          <SearchIcon sx={{ fontSize: 48, color: CISP.amarillo, opacity: 0.4, mb: 1 }} />
          <Typography variant="h6" color="text.secondary">Sin resultados</Typography>
          <Typography variant="body2" color="text.disabled">
            Ajusta los filtros para encontrar planes de vida
          </Typography>
        </Box>
      )}
    </Box>
  );
}
