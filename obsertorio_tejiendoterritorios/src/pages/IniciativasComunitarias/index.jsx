import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Grid, Chip, Divider, Button,
  TextField, MenuItem, InputAdornment, IconButton, Tooltip,
} from '@mui/material';
import ArrowBackIcon   from '@mui/icons-material/ArrowBack';
import GroupsIcon      from '@mui/icons-material/Groups';
import SearchIcon      from '@mui/icons-material/Search';
import FilterListIcon  from '@mui/icons-material/FilterList';
import ClearIcon       from '@mui/icons-material/Clear';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { TT }             from '../../theme';
import MapaIniciativas    from '../../components/maps/MapaIniciativas';
import iniciativasDetalle from '../../data/iniciativasDetalle';
import fondo3             from '../../assets/fondo3.png';
import ilustracion9       from '../../assets/ilustracion9.png';

// Foto de galería para el resumen ejecutivo
const galeriaModules = import.meta.glob(
  '../../assets/galeria/*.{png,jpg,jpeg,webp,PNG,JPG}',
  { eager: true }
);
const galeriaFotos = Object.values(galeriaModules).map((m) => m.default);

const lineas    = ['Todas', 'Economías Propias', 'Territorio y Medio Ambiente', 'Cultura e Identidad', 'Gobernanza y Gobierno Propio', 'Salud y Bienestar'];
const tipos     = ['Todos', 'Acuerdo', 'Fortalecimiento'];
const regiones  = ['Todas', 'Andina', 'Caribe', 'Pacífica', 'Amazónica', 'Orinoquía'];

const lineaColor = {
  'Economías Propias':           TT.verde,
  'Territorio y Medio Ambiente': TT.naranja,
  'Cultura e Identidad':         TT.purpura,
  'Gobernanza y Gobierno Propio': TT.marino,
  'Salud y Bienestar':           TT.rojo,
};

export default function IniciativasComunitarias() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [linea,    setLinea]    = useState('Todas');
  const [tipo,     setTipo]     = useState('Todos');
  const [region,   setRegion]   = useState('Todas');

  const filtradas = useMemo(() => {
    const q = busqueda.toLowerCase();
    return iniciativasDetalle.filter((ini) => {
      const matchTexto  = !q || ini.nombre.toLowerCase().includes(q) || ini.organizacion.toLowerCase().includes(q) || ini.comunidad.toLowerCase().includes(q);
      const matchLinea  = linea  === 'Todas' || ini.linea  === linea;
      const matchTipo   = tipo   === 'Todos' || ini.tipo   === tipo;
      const matchRegion = region === 'Todas' || ini.region === region;
      return matchTexto && matchLinea && matchTipo && matchRegion;
    });
  }, [busqueda, linea, tipo, region]);

  const hayFiltros = busqueda || linea !== 'Todas' || tipo !== 'Todos' || region !== 'Todas';
  const limpiar    = () => { setBusqueda(''); setLinea('Todas'); setTipo('Todos'); setRegion('Todas'); };

  const fotoResumen = galeriaFotos[3] || galeriaFotos[0];

  return (
    <Box>
      {/* Botón volver */}
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}
        sx={{ mb: 2.5, color: TT.purpura, fontWeight: 700, borderRadius: 2 }}>
        Volver
      </Button>

      {/* Banner */}
      <Paper elevation={0} sx={{
        mb: 5, px: { xs: 3, md: 4 }, py: 3.5,
        borderRadius: 3, overflow: 'hidden', position: 'relative',
        background: `linear-gradient(135deg, ${TT.purpura}ee 0%, ${TT.purpura}88 100%)`,
      }}>
        <Box component="img" src={fondo3} alt="" aria-hidden="true"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.08 }} />
        <Box component="img" src={ilustracion9} alt="" aria-hidden="true"
          sx={{ position: 'absolute', right: 24, bottom: -8, height: 120, objectFit: 'contain', opacity: 0.22 }} />
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(90deg, ${TT.naranja} 0%, ${TT.verde} 50%, ${TT.purpura} 100%)` }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
            Iniciativas Comunitarias
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.88)' }}>
            Registro, consulta y análisis de las {iniciativasDetalle.length} iniciativas activas en el territorio
          </Typography>
        </Box>
      </Paper>

      {/* ── 1. Mapa — Incidencia territorial ──────────────── */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, minHeight: 32, borderRadius: 2, bgcolor: TT.naranja, flexShrink: 0, mt: 0.5 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Incidencia Territorial del Convenio
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Distribución de iniciativas por departamento — toca un departamento para ver el detalle
            </Typography>
          </Box>
        </Box>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <MapaIniciativas />
        </Box>
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* ── 2. Resumen ejecutivo ──────────────────────────── */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, minHeight: 32, borderRadius: 2, bgcolor: TT.verde, flexShrink: 0, mt: 0.5 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Resumen Ejecutivo de Iniciativas
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Contexto, alcance y resultados del proceso de iniciativas comunitarias
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
                Las iniciativas comunitarias constituyen el núcleo operativo del convenio, representando
                acciones concretas impulsadas desde los propios pueblos indígenas para el fortalecimiento
                de sus capacidades organizativas, territoriales y culturales. En total, se identificaron
                y acompañaron <strong>95 iniciativas</strong> distribuidas en cinco regiones de Colombia,
                articuladas alrededor de cinco líneas de intervención estratégicas.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
                Cada iniciativa responde a necesidades identificadas colectivamente por las comunidades
                en sus procesos de diagnóstico participativo. La distribución por tipo muestra un equilibrio
                entre iniciativas de acuerdo —orientadas a la concertación institucional y el ejercicio
                de derechos— e iniciativas de fortalecimiento, enfocadas en el desarrollo de capacidades
                internas, la recuperación de saberes y la dinamización de la economía propia desde
                la cosmovisión indígena.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
                Los resultados preliminares evidencian avances significativos en el fortalecimiento del
                gobierno propio, la visibilización de prácticas culturales y la generación de espacios
                de diálogo intercultural. El seguimiento a las trayectorias permite identificar lecciones
                aprendidas, buenas prácticas y recomendaciones para la política pública en materia
                de pueblos indígenas en Colombia.
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            {fotoResumen && (
              <Box
                component="img"
                src={fotoResumen}
                alt="Iniciativas comunitarias"
                sx={{
                  width: '100%', borderRadius: 3,
                  objectFit: 'cover', aspectRatio: '4/3',
                  boxShadow: `0 8px 32px rgba(28,31,58,0.15)`,
                  border: `3px solid ${TT.naranja}20`,
                }}
              />
            )}
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* ── 3. Lista de 95 iniciativas ────────────────────── */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, minHeight: 32, borderRadius: 2, bgcolor: TT.purpura, flexShrink: 0, mt: 0.5 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Lista de Iniciativas ({iniciativasDetalle.length})
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Haz clic en cualquier iniciativa para ver su ficha completa
            </Typography>
          </Box>
        </Box>

        {/* Filtros */}
        <Paper elevation={0} sx={{
          p: 2, mb: 3, borderRadius: 2.5,
          border: `1.5px solid ${TT.purpura}20`,
          display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center',
        }}>
          <FilterListIcon sx={{ color: TT.purpura, flexShrink: 0 }} />
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
            onChange={(e) => setTipo(e.target.value)} sx={{ flex: '1 1 140px', minWidth: 130 }}>
            {tipos.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>
          <TextField select size="small" label="Línea" value={linea}
            onChange={(e) => setLinea(e.target.value)} sx={{ flex: '1 1 200px', minWidth: 190 }}>
            {lineas.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
          </TextField>
          <TextField select size="small" label="Región" value={region}
            onChange={(e) => setRegion(e.target.value)} sx={{ flex: '1 1 130px', minWidth: 120 }}>
            {regiones.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
          </TextField>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
            <Chip label={`${filtradas.length} de ${iniciativasDetalle.length}`} size="small"
              sx={{ bgcolor: `${TT.purpura}12`, color: TT.purpura, fontWeight: 700 }} />
            {hayFiltros && (
              <Tooltip title="Limpiar filtros">
                <IconButton size="small" onClick={limpiar} sx={{ color: 'text.disabled' }}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Paper>

        {/* Lista */}
        {filtradas.length > 0 ? (
          <Paper elevation={0} sx={{ borderRadius: 3, border: `1px solid ${TT.purpura}15`, overflow: 'hidden' }}>
            {filtradas.map((ini, index) => {
              const lColor = lineaColor[ini.linea] || TT.naranja;
              const foto   = galeriaFotos[ini.imagenIndex] || null;
              return (
                <Box
                  key={ini.id}
                  onClick={() => navigate(`/iniciativas-comunitarias/iniciativa/${ini.id}`)}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 2,
                    px: 2.5, py: 1.75,
                    borderBottom: index < filtradas.length - 1 ? `1px solid ${TT.purpura}08` : 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                    '&:hover': { bgcolor: `${lColor}08` },
                  }}
                >
                  {/* Foto miniatura */}
                  <Box
                    sx={{
                      width: 44, height: 44, borderRadius: 1.5, flexShrink: 0,
                      overflow: 'hidden', bgcolor: `${lColor}15`,
                      border: `2px solid ${lColor}25`,
                    }}
                  >
                    {foto ? (
                      <Box component="img" src={foto} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <GroupsIcon sx={{ fontSize: 20, color: lColor, opacity: 0.5 }} />
                      </Box>
                    )}
                  </Box>

                  {/* Indicador de color de línea */}
                  <Box sx={{ width: 4, height: 36, borderRadius: 2, bgcolor: lColor, flexShrink: 0 }} />

                  {/* Nombre e info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{
                      fontWeight: 700, color: TT.marino, lineHeight: 1.3,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {ini.nombre}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem' }}>
                      {ini.comunidad} · {ini.organizacion}
                    </Typography>
                  </Box>

                  {/* Chips — ocultos en móvil */}
                  <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.75, flexShrink: 0 }}>
                    <Chip label={ini.tipo} size="small"
                      sx={{ height: 18, fontSize: '0.6rem', fontWeight: 600,
                        bgcolor: `${ini.colorPrimario}15`, color: ini.colorPrimario }} />
                    <Chip label={ini.linea} size="small"
                      sx={{ height: 18, fontSize: '0.6rem', bgcolor: `${lColor}10`, color: lColor, display: { xs: 'none', md: 'flex' } }} />
                  </Box>

                  <ArrowForwardIcon sx={{ fontSize: 16, color: 'text.disabled', flexShrink: 0 }} />
                </Box>
              );
            })}
          </Paper>
        ) : (
          <Box sx={{ py: 8, textAlign: 'center', border: `2px dashed ${TT.purpura}25`,
            borderRadius: 3, bgcolor: `${TT.purpura}04` }}>
            <SearchIcon sx={{ fontSize: 48, color: TT.purpura, opacity: 0.3, mb: 1 }} />
            <Typography variant="h6" color="text.secondary">Sin resultados</Typography>
            <Typography variant="body2" color="text.disabled">Ajusta los filtros para encontrar iniciativas</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
