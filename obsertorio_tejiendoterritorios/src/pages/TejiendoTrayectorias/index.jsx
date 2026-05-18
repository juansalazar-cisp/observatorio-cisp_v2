import { useState, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Grid, Chip, Divider, Button,
  TextField, MenuItem, InputAdornment, IconButton, Tooltip,
  Popover, Card, CardMedia, CardContent,
} from '@mui/material';
import ArrowBackIcon      from '@mui/icons-material/ArrowBack';
import TimelineIcon       from '@mui/icons-material/Timeline';
import HandshakeIcon      from '@mui/icons-material/Handshake';
import ForestIcon         from '@mui/icons-material/Forest';
import SearchIcon         from '@mui/icons-material/Search';
import FilterListIcon     from '@mui/icons-material/FilterList';
import ClearIcon          from '@mui/icons-material/Clear';
import BarChartIcon       from '@mui/icons-material/BarChart';
import DashboardIcon      from '@mui/icons-material/Dashboard';
import PublicIcon          from '@mui/icons-material/Public';
import GroupsIcon          from '@mui/icons-material/Groups';
import ArrowForwardIcon    from '@mui/icons-material/ArrowForward';

import { TT }         from '../../theme';
import iniciativas    from '../../data/iniciativas';
import fondo2         from '../../assets/fondo2.png';
import ilustracion8   from '../../assets/ilustracion8.png';

// Carga dinámica de fotos de galería
const galeriaModules = import.meta.glob(
  '../../assets/galeria/*.{png,jpg,jpeg,webp,PNG,JPG}',
  { eager: true }
);
const galeriaFotos = Object.values(galeriaModules).map((m) => m.default);

function fotoParaIniciativa(id) {
  if (galeriaFotos.length === 0) return null;
  return galeriaFotos[(id - 1) % galeriaFotos.length];
}

// ── Paleta de líneas ──────────────────────────────────────
const lineaColor = {
  'Economías Propias':          TT.verde,
  'Territorio y Medio Ambiente': TT.naranja,
  'Cultura e Identidad':         TT.purpura,
  'Gobernanza y Gobierno Propio': TT.marino,
  'Salud y Bienestar':           TT.rojo,
};

const tipoColor = {
  'Acuerdo':        TT.verde,
  'Fortalecimiento': TT.naranja,
};

// ── Encabezado de sección ─────────────────────────────────
function SeccionHeader({ icono, titulo, descripcion, color }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
      <Box sx={{ width: 5, minHeight: 32, borderRadius: 2, bgcolor: color, flexShrink: 0, mt: 0.5 }} />
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {icono}
          <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{titulo}</Typography>
        </Box>
        {descripcion && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{descripcion}</Typography>
        )}
      </Box>
    </Box>
  );
}

// ── Tarjeta de hover (Popover) ────────────────────────────
function TarjetaIniciativa({ iniciativa }) {
  const foto  = fotoParaIniciativa(iniciativa.id);
  const color = lineaColor[iniciativa.linea] || TT.naranja;
  const tc    = tipoColor[iniciativa.tipo]   || TT.verde;
  return (
    <Card elevation={0} sx={{ width: 300, borderRadius: 3, overflow: 'hidden', border: `1.5px solid ${color}25` }}>
      {foto ? (
        <CardMedia component="img" image={foto} alt="" sx={{ height: 130, objectFit: 'cover', objectPosition: 'center' }} />
      ) : (
        <Box sx={{ height: 130, bgcolor: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TimelineIcon sx={{ fontSize: 40, color, opacity: 0.3 }} />
        </Box>
      )}
      {/* Banda de color */}
      <Box sx={{ height: 3, bgcolor: color }} />
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 0.75, mb: 1.25, flexWrap: 'wrap' }}>
          <Chip label={iniciativa.tipo} size="small"
            sx={{ height: 18, fontSize: '0.6rem', fontWeight: 700, bgcolor: `${tc}15`, color: tc }} />
          <Chip label={iniciativa.linea} size="small"
            sx={{ height: 18, fontSize: '0.6rem', fontWeight: 600, bgcolor: `${color}12`, color }} />
        </Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 0.5, color: TT.marino }}>
          {iniciativa.nombre}
        </Typography>
        <Typography variant="caption" sx={{ color: TT.naranja, fontWeight: 600, display: 'block', mb: 1 }}>
          {iniciativa.comunidad} · {iniciativa.organizacion}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6, display: 'block' }}>
          {iniciativa.descripcion.slice(0, 160)}…
        </Typography>
      </CardContent>
    </Card>
  );
}

// ── Fila compacta en la lista ─────────────────────────────
function FilaIniciativa({ iniciativa, onHover, onLeave }) {
  const color = lineaColor[iniciativa.linea] || TT.naranja;
  const ref   = useRef(null);
  return (
    <Box
      ref={ref}
      onMouseEnter={() => onHover(ref.current, iniciativa)}
      onMouseLeave={onLeave}
      sx={{
        px: 1.75, py: 1.25,
        borderRadius: 2,
        cursor: 'default',
        transition: 'background-color 0.15s',
        '&:hover': { bgcolor: `${color}0d` },
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3, color: TT.marino, mb: 0.25,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {iniciativa.nombre}
      </Typography>
      <Typography variant="caption" sx={{ color, fontWeight: 600, fontSize: '0.65rem' }}>
        {iniciativa.organizacion}
      </Typography>
    </Box>
  );
}

// ── Indicador de dashboard ────────────────────────────────
function IndicadorCard({ valor, etiqueta, color, icono }) {
  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: `1.5px solid ${color}20`, textAlign: 'center' }}>
      <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: `${color}12`, mx: 'auto', mb: 1.5,
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icono}
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 800, color, lineHeight: 1, mb: 0.5 }}>{valor}</Typography>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, lineHeight: 1.3, display: 'block' }}>
        {etiqueta}
      </Typography>
    </Paper>
  );
}

// ── Página ────────────────────────────────────────────────
const lineas    = ['Todas', 'Economías Propias', 'Territorio y Medio Ambiente', 'Cultura e Identidad', 'Gobernanza y Gobierno Propio', 'Salud y Bienestar'];
const tipos     = ['Todos', 'Acuerdo', 'Fortalecimiento'];

export default function TejiendoTrayectorias() {
  const navigate = useNavigate();

  // Filtros
  const [busqueda, setBusqueda] = useState('');
  const [linea, setLinea]       = useState('Todas');
  const [tipo, setTipo]         = useState('Todos');

  // Hover popover
  const [popover, setPopover] = useState({ anchor: null, iniciativa: null });
  const timerRef = useRef(null);

  const handleHover = useCallback((anchor, iniciativa) => {
    clearTimeout(timerRef.current);
    setPopover({ anchor, iniciativa });
  }, []);

  const handleLeave = useCallback(() => {
    timerRef.current = setTimeout(() => setPopover({ anchor: null, iniciativa: null }), 120);
  }, []);

  const handlePopoverEnter = useCallback(() => clearTimeout(timerRef.current), []);
  const handlePopoverLeave = useCallback(() => {
    timerRef.current = setTimeout(() => setPopover({ anchor: null, iniciativa: null }), 120);
  }, []);

  // Filtrado
  const filtradas = useMemo(() => {
    const q = busqueda.toLowerCase();
    return iniciativas.filter((ini) => {
      const matchTexto = !q || ini.nombre.toLowerCase().includes(q) || ini.organizacion.toLowerCase().includes(q) || ini.comunidad.toLowerCase().includes(q);
      const matchLinea = linea === 'Todas' || ini.linea === linea;
      const matchTipo  = tipo  === 'Todos' || ini.tipo  === tipo;
      return matchTexto && matchLinea && matchTipo;
    });
  }, [busqueda, linea, tipo]);

  const hayFiltros = busqueda || linea !== 'Todas' || tipo !== 'Todos';
  const limpiar    = () => { setBusqueda(''); setLinea('Todas'); setTipo('Todos'); };

  // Resúmenes para dashboard
  const totalAcuerdo        = iniciativas.filter((i) => i.tipo === 'Acuerdo').length;
  const totalFortalecimiento = iniciativas.filter((i) => i.tipo === 'Fortalecimiento').length;
  const totalLineas         = new Set(iniciativas.map((i) => i.linea)).size;

  return (
    <Box>
      {/* Botón volver */}
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}
        sx={{ mb: 2.5, color: TT.naranja, fontWeight: 700, borderRadius: 2 }}>
        Volver
      </Button>

      {/* Banner */}
      <Paper elevation={0} sx={{
        mb: 5, px: { xs: 3, md: 4 }, py: 3.5,
        borderRadius: 3, overflow: 'hidden', position: 'relative',
        background: `linear-gradient(135deg, ${TT.naranja}ee 0%, ${TT.naranja}88 100%)`,
      }}>
        <Box component="img" src={fondo2} alt="" aria-hidden="true"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.08 }} />
        <Box component="img" src={ilustracion8} alt="" aria-hidden="true"
          sx={{ position: 'absolute', right: 24, bottom: -8, height: 120, objectFit: 'contain', opacity: 0.22 }} />
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(90deg, ${TT.naranja} 0%, ${TT.verde} 50%, ${TT.purpura} 100%)` }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
            Tejiendo Trayectorias
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.88)' }}>
            Seguimiento a las trayectorias e iniciativas de los pueblos indígenas del proyecto
          </Typography>
        </Box>
      </Paper>

      {/* ── 1. Definición ──────────────────────────────────── */}
      <Box sx={{ mb: 6 }}>
        <SeccionHeader
          icono={<TimelineIcon sx={{ color: TT.naranja, fontSize: 24 }} />}
          titulo="Definición de Iniciativa"
          descripcion="Dos tipos de iniciativas orientan el seguimiento en este módulo"
          color={TT.naranja}
        />
        <Grid container spacing={2.5}>
          {/* Iniciativa de Acuerdo */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: `1.5px solid ${TT.verde}20`, height: '100%' }}>
              <Box sx={{ px: 3, py: 2.5, bgcolor: `${TT.verde}12`, borderBottom: `2px solid ${TT.verde}20`,
                display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: TT.verde,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <HandshakeIcon sx={{ color: '#fff', fontSize: 20 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: TT.verde }}>
                  Iniciativa de Acuerdo
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.85 }}>
                  Las iniciativas de acuerdo son procesos colectivos de concertación entre comunidades,
                  organizaciones indígenas e instituciones, orientados a establecer compromisos y marcos
                  de acción compartida. Articulan la palabra de los mayores, la visión de los jóvenes
                  y las decisiones de las asambleas comunitarias para el fortalecimiento del gobierno propio
                  y la defensa del territorio.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          {/* Iniciativa de Interés / Fortalecimiento */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: `1.5px solid ${TT.naranja}20`, height: '100%' }}>
              <Box sx={{ px: 3, py: 2.5, bgcolor: `${TT.naranja}10`, borderBottom: `2px solid ${TT.naranja}20`,
                display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: TT.naranja,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ForestIcon sx={{ color: '#fff', fontSize: 20 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: TT.naranja }}>
                  Iniciativa de Fortalecimiento
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.85 }}>
                  Las iniciativas de fortalecimiento son acciones concretas impulsadas desde las propias
                  comunidades para fortalecer sus capacidades organizativas, culturales y productivas.
                  Abarcan procesos de formación, recuperación de saberes ancestrales, dinamización de la
                  economía propia y construcción de herramientas de planificación que responden a los
                  principios del buen vivir y la autonomía indígena.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* ── 2. Dashboard ───────────────────────────────────── */}
      <Box sx={{ mb: 6 }}>
        <SeccionHeader
          icono={<DashboardIcon sx={{ color: TT.purpura, fontSize: 24 }} />}
          titulo="Dashboard — Resumen de Iniciativas e Indicadores"
          color={TT.purpura}
        />

        {/* Texto de contexto */}
        <Paper elevation={0} sx={{ p: 3, mb: 3.5, borderRadius: 3, bgcolor: `${TT.purpura}06`,
          borderLeft: `4px solid ${TT.purpura}` }}>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
            Este dashboard consolida los indicadores clave del seguimiento a las iniciativas comunitarias:
            número total de iniciativas, distribución por tipo (Acuerdo / Fortalecimiento), líneas de
            intervención activas y relación con los Objetivos de Desarrollo Sostenible (ODS). Los datos
            provienen del sistema de registro del observatorio y se actualizan conforme avanzan los
            procesos territoriales. <strong>La visualización completa estará disponible una vez integrada
            la fuente de datos.</strong>
          </Typography>
        </Paper>

        {/* Indicadores de resumen */}
        <Grid container spacing={2} sx={{ mb: 3.5 }}>
          <Grid size={{ xs: 6, sm: 3 }}>
            <IndicadorCard valor={95} etiqueta="Total Iniciativas"
              color={TT.naranja} icono={<TimelineIcon sx={{ color: TT.naranja, fontSize: 22 }} />} />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <IndicadorCard valor={totalAcuerdo} etiqueta="Iniciativas de Acuerdo"
              color={TT.verde} icono={<HandshakeIcon sx={{ color: TT.verde, fontSize: 22 }} />} />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <IndicadorCard valor={totalFortalecimiento} etiqueta="Fortalecimiento"
              color={TT.purpura} icono={<ForestIcon sx={{ color: TT.purpura, fontSize: 22 }} />} />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <IndicadorCard valor={totalLineas} etiqueta="Líneas de Intervención"
              color={TT.marino} icono={<BarChartIcon sx={{ color: TT.marino, fontSize: 22 }} />} />
          </Grid>
        </Grid>

        {/* Placeholder charts */}
        <Grid container spacing={2}>
          {[
            { titulo: 'Por tipo de iniciativa',       color: TT.verde   },
            { titulo: 'Por línea de intervención',    color: TT.naranja },
            { titulo: 'Relación con ODS',             color: TT.purpura },
          ].map((ch) => (
            <Grid key={ch.titulo} size={{ xs: 12, sm: 4 }}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1.5px dashed ${ch.color}30`,
                bgcolor: `${ch.color}04`, minHeight: 180,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                <BarChartIcon sx={{ fontSize: 44, color: ch.color, opacity: 0.3 }} />
                <Typography variant="body2" sx={{ color: ch.color, fontWeight: 600, textAlign: 'center' }}>
                  {ch.titulo}
                </Typography>
                <Chip label="Datos pendientes" size="small"
                  sx={{ bgcolor: `${ch.color}10`, color: ch.color, fontWeight: 600, fontSize: '0.62rem' }} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ── Acceso a Iniciativas Comunitarias ─────────────── */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
        <Paper
          elevation={0}
          sx={{
            maxWidth: 520, width: '100%',
            borderRadius: 4, overflow: 'hidden',
            border: `1.5px solid ${TT.purpura}25`,
            textAlign: 'center',
          }}
        >
          {/* Cabecera */}
          <Box
            sx={{
              px: 4, py: 3,
              background: `linear-gradient(135deg, ${TT.purpura}dd 0%, ${TT.purpura}99 100%)`,
              position: 'relative', overflow: 'hidden',
            }}
          >
            <Box sx={{ width: 56, height: 56, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.2)',
              mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GroupsIcon sx={{ color: '#fff', fontSize: 30 }} />
            </Box>
          </Box>

          {/* Contenido */}
          <Box sx={{ px: 4, py: 3.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: TT.purpura, mb: 1.25 }}>
              Iniciativas Comunitarias
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
              Accede al registro completo de iniciativas comunitarias activas, consulta su estado
              de avance, los actores involucrados y los resultados obtenidos en cada territorio.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/iniciativas-comunitarias')}
              sx={{
                bgcolor: TT.purpura, fontWeight: 700, borderRadius: 2.5, px: 4,
                boxShadow: `0 4px 16px ${TT.purpura}40`,
                '&:hover': { bgcolor: '#6a3489', boxShadow: `0 6px 20px ${TT.purpura}55` },
              }}
            >
              Ver Iniciativas Comunitarias
            </Button>
          </Box>
        </Paper>
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* ── 3. Consulta de 95 iniciativas ─────────────────── */}
      <Box>
        <SeccionHeader
          icono={<FilterListIcon sx={{ color: TT.verde, fontSize: 24 }} />}
          titulo={`Consulta de Iniciativas (${iniciativas.length})`}
          descripcion="Pasa el cursor sobre una iniciativa para ver su ficha completa"
          color={TT.verde}
        />

        {/* Filtros */}
        <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 2.5,
          border: `1.5px solid ${TT.verde}20`, display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
          <FilterListIcon sx={{ color: TT.verde, flexShrink: 0 }} />
          <TextField
            size="small" placeholder="Buscar por nombre, organización o comunidad…"
            value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
            sx={{ flex: '1 1 220px', minWidth: 180 }}
            slotProps={{ input: { startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              </InputAdornment>
            )}}}
          />
          <TextField select size="small" label="Tipo" value={tipo}
            onChange={(e) => setTipo(e.target.value)} sx={{ flex: '1 1 150px', minWidth: 140 }}>
            {tipos.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>
          <TextField select size="small" label="Línea" value={linea}
            onChange={(e) => setLinea(e.target.value)} sx={{ flex: '1 1 200px', minWidth: 190 }}>
            {lineas.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
          </TextField>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
            <Chip label={`${filtradas.length} de ${iniciativas.length}`} size="small"
              sx={{ bgcolor: `${TT.verde}15`, color: TT.verde, fontWeight: 700 }} />
            {hayFiltros && (
              <Tooltip title="Limpiar filtros">
                <IconButton size="small" onClick={limpiar} sx={{ color: 'text.disabled' }}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Paper>

        {/* Listado en 3 columnas */}
        {filtradas.length > 0 ? (
          <Grid container spacing={1.5}>
            {filtradas.map((ini) => (
              <Grid key={ini.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <FilaIniciativa
                  iniciativa={ini}
                  onHover={handleHover}
                  onLeave={handleLeave}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ py: 8, textAlign: 'center', border: `2px dashed ${TT.verde}25`,
            borderRadius: 3, bgcolor: `${TT.verde}04` }}>
            <SearchIcon sx={{ fontSize: 48, color: TT.verde, opacity: 0.3, mb: 1 }} />
            <Typography variant="h6" color="text.secondary">Sin resultados</Typography>
            <Typography variant="body2" color="text.disabled">
              Ajusta los filtros para encontrar iniciativas
            </Typography>
          </Box>
        )}
      </Box>

      {/* Popover de tarjeta al hacer hover */}
      <Popover
        open={Boolean(popover.anchor)}
        anchorEl={popover.anchor}
        onClose={() => setPopover({ anchor: null, iniciativa: null })}
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
        transformOrigin={{ vertical: 'center', horizontal: 'left' }}
        disableRestoreFocus
        sx={{ pointerEvents: 'none', '& .MuiPopover-paper': { pointerEvents: 'auto', borderRadius: 3, ml: 1 } }}
        PaperProps={{
          onMouseEnter: handlePopoverEnter,
          onMouseLeave: handlePopoverLeave,
        }}
      >
        {popover.iniciativa && <TarjetaIniciativa iniciativa={popover.iniciativa} />}
      </Popover>
    </Box>
  );
}
