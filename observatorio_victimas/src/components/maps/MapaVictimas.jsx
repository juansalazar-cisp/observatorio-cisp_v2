import { useState, useCallback } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import {
  Box, Typography, Chip, Paper, Divider,
  Dialog, DialogTitle, DialogContent, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { OV } from '../../theme';
import { HECHOS, DATOS_DEPTO } from '../../data/radiografiaAcceso';
import geoLocal from '../../data/colombia-geo.json';

// En local (file://) fetch() está bloqueado por CORS; se usa el JSON bundleado.
// En producción (CPanel) se carga vía fetch normal.
const GEO_URL = __LOCAL_BUILD__ ? geoLocal : `${import.meta.env.BASE_URL}colombia-geo.json`;

function norm(str) {
  return (str || '').toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

function colorPorVictimas(n) {
  if (!n || n === 0)   return '#E8EDF0';
  if (n < 80_000)      return '#FECACA';
  if (n < 200_000)     return '#F87171';
  if (n < 400_000)     return '#DC2626';
  return '#7F1D1D';
}

const LEYENDA = [
  { color: '#E8EDF0', label: 'Sin datos' },
  { color: '#FECACA', label: '< 80 mil' },
  { color: '#F87171', label: '80–200 mil' },
  { color: '#DC2626', label: '200–400 mil' },
  { color: '#7F1D1D', label: '400 mil+' },
];

function fmt(n) {
  return n?.toLocaleString('es-CO') ?? '—';
}

// ─── Panel lateral de detalle ────────────────────────────────────────────────
function PanelDetalle({ rawName, onHechoClick }) {
  if (!rawName) {
    return (
      <Box sx={{
        height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 2, py: 6,
        border: `1.5px dashed ${OV.grisMedio}50`, borderRadius: 3,
      }}>
        <Box sx={{
          width: 56, height: 56, borderRadius: 2, bgcolor: `${OV.rojo}08`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: `${OV.rojo}20` }} />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 200, lineHeight: 1.6 }}>
          Selecciona un departamento en el mapa para ver el detalle
        </Typography>
      </Box>
    );
  }

  const key  = norm(rawName);
  const d    = DATOS_DEPTO[key];
  const docs = null; // no usado aquí

  if (!d) {
    return (
      <Box sx={{ p: 3, border: `1.5px solid ${OV.grisMedio}40`, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: OV.grisOscuro, mb: 1 }}>
          {rawName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No hay datos disponibles para este departamento.
        </Typography>
      </Box>
    );
  }

  const pct = d.victimas > 0
    ? Math.round((d.reclamaron / d.victimas) * 100)
    : 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Encabezado */}
      <Box sx={{
        px: 2.5, py: 2, borderRadius: 2.5,
        bgcolor: OV.grisOscuro, position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, bgcolor: OV.amarillo }} />
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
          Departamento seleccionado
        </Typography>
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800, lineHeight: 1.2 }}>
          {rawName}
        </Typography>
      </Box>

      {/* Métricas de víctimas */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: `1.5px solid ${OV.rojo}22`, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 900, color: OV.rojo, lineHeight: 1 }}>
            {fmt(d.victimas)}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            Víctimas en RUV
          </Typography>
        </Paper>
        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: `1.5px solid ${OV.amarilloOsc}30`, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 900, color: OV.amarilloOsc, lineHeight: 1 }}>
            {pct}%
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            Han reclamado
          </Typography>
        </Paper>
      </Box>

      {/* Barra de progreso reclamación */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
            Reclamaron: {fmt(d.reclamaron)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            No reclamaron: {fmt(d.noReclamaron)}
          </Typography>
        </Box>
        <Box sx={{ height: 8, borderRadius: 4, bgcolor: `${OV.grisMedio}30`, overflow: 'hidden' }}>
          <Box sx={{
            height: '100%', borderRadius: 4, bgcolor: OV.rojo,
            width: `${pct}%`, transition: 'width 0.6s ease',
          }} />
        </Box>
      </Box>

      <Divider />

      {/* Hechos victimizantes */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
          <Box sx={{ width: 4, height: 18, borderRadius: 1, bgcolor: OV.rojo }} />
          <Typography variant="body2" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
            Hechos victimizantes
          </Typography>
        </Box>
        <Chip
          label="Verde claro = ruta de reparación administrativa disponible"
          size="small"
          sx={{ mb: 1.5, bgcolor: '#DCFCE7', color: '#166534', fontWeight: 600, fontSize: '0.62rem' }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {HECHOS.map((h) => {
            const count = d.hechos[h.id] ?? 0;
            const max   = Math.max(...HECHOS.map((hh) => d.hechos[hh.id] ?? 0));
            const pctH  = max > 0 ? (count / max) * 100 : 0;
            return (
              <Box
                key={h.id}
                onClick={() => onHechoClick(h)}
                sx={{
                  px: 1.75, py: 1.25, borderRadius: 2,
                  border: `1.5px solid`,
                  borderColor: h.reparacionAdmin ? '#86EFAC' : `${OV.grisMedio}40`,
                  bgcolor: h.reparacionAdmin ? '#F0FDF4' : '#FAFAFA',
                  cursor: 'pointer', position: 'relative', overflow: 'hidden',
                  transition: 'box-shadow 0.15s',
                  '&:hover': { boxShadow: `0 2px 8px ${OV.rojo}20` },
                }}
              >
                {/* Barra de proporción */}
                <Box sx={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: `${pctH}%`, bgcolor: h.reparacionAdmin ? '#BBFBCE' : `${OV.grisMedio}18`,
                  borderRadius: 2,
                }} />
                <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    {h.reparacionAdmin && (
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#16A34A', flexShrink: 0 }} />
                    )}
                    <Typography variant="caption" sx={{ fontWeight: 700, color: OV.grisOscuro, fontSize: '0.74rem' }}>
                      {h.label}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: h.reparacionAdmin ? '#166534' : OV.grisMedio, fontSize: '0.74rem' }}>
                      {fmt(count)}
                    </Typography>
                    <Box sx={{
                      width: 16, height: 16, borderRadius: '50%',
                      bgcolor: h.reparacionAdmin ? '#DCFCE7' : `${OV.grisMedio}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: h.reparacionAdmin ? '#16A34A' : OV.grisMedio,
                      fontSize: '0.65rem', fontWeight: 900,
                    }}>
                      ?
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

// ─── Componente principal ────────────────────────────────────────────────────
export default function MapaVictimas() {
  const [tooltip,     setTooltip]     = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const [hechoDialog,  setHechoDialog]  = useState(null);

  const handleMove = useCallback((rawName, e) => {
    const svg = e.currentTarget.closest('svg');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setTooltip({ rawName, x: e.clientX - rect.left + 12, y: e.clientY - rect.top - 10 });
  }, []);

  const handleLeave = useCallback(() => setTooltip(null), []);
  const handleClick = useCallback((rawName) => {
    setTooltip(null);
    setSeleccionado(rawName);
  }, []);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.1fr' }, gap: 3, alignItems: 'start' }}>

      {/* ── Columna izquierda: mapa ── */}
      <Box>
        {/* Leyenda */}
        <Box sx={{ display: 'flex', gap: 1.25, flexWrap: 'wrap', mb: 1.5, alignItems: 'center' }}>
          {LEYENDA.map(({ color, label }) => (
            <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Box sx={{ width: 11, height: 11, borderRadius: 0.5, bgcolor: color,
                border: '1px solid rgba(0,0,0,0.12)', flexShrink: 0 }} />
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem' }}>
                {label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Mapa */}
        <Box sx={{
          position: 'relative', borderRadius: 3, overflow: 'hidden',
          border: `1.5px solid ${OV.rojo}20`, bgcolor: '#EAF4FB',
        }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 3000, center: [-74, 4.5] }}
            width={700} height={980}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const rawName = geo.properties.NOMBRE_DPT || '';
                  const key     = norm(rawName);
                  const d       = DATOS_DEPTO[key];
                  const fill    = colorPorVictimas(d?.victimas ?? 0);
                  const isSelected = seleccionado === rawName;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fill}
                      stroke={isSelected ? OV.amarillo : '#FFFFFF'}
                      strokeWidth={isSelected ? 2 : 0.8}
                      style={{
                        default: { fill, outline: 'none', cursor: 'pointer' },
                        hover:   { fill, outline: 'none', cursor: 'pointer', opacity: 0.72 },
                        pressed: { fill, outline: 'none' },
                      }}
                      onMouseMove={(e) => handleMove(rawName, e)}
                      onMouseLeave={handleLeave}
                      onClick={() => handleClick(rawName)}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>

          {/* Tooltip */}
          {tooltip && (
            <Box sx={{
              position: 'absolute',
              left: Math.min(tooltip.x, 360), top: Math.max(tooltip.y, 4),
              bgcolor: '#fff', border: `1px solid ${OV.rojo}30`,
              borderRadius: 1.5, px: 1.5, py: 0.75,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              pointerEvents: 'none', zIndex: 10,
            }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: OV.grisOscuro, display: 'block' }}>
                {tooltip.rawName}
              </Typography>
              {(() => {
                const d = DATOS_DEPTO[norm(tooltip.rawName)];
                return d ? (
                  <Typography variant="caption" color="text.secondary">
                    {fmt(d.victimas)} víctimas
                  </Typography>
                ) : (
                  <Typography variant="caption" color="text.disabled">Sin datos</Typography>
                );
              })()}
            </Box>
          )}
        </Box>

        <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 0.75, textAlign: 'right' }}>
          Clic en un departamento para ver el detalle →
        </Typography>
      </Box>

      {/* ── Columna derecha: panel ── */}
      <Box sx={{ position: 'sticky', top: 88 }}>
        <PanelDetalle rawName={seleccionado} onHechoClick={setHechoDialog} />
      </Box>

      {/* ── Dialog explicación hecho victimizante ── */}
      <Dialog
        open={Boolean(hechoDialog)}
        onClose={() => setHechoDialog(null)}
        maxWidth="xs" fullWidth
        PaperProps={{ sx: { borderRadius: 3, m: { xs: 1.5, sm: 2 } } }}
      >
        {hechoDialog && (
          <>
            <DialogTitle sx={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              gap: 1, pb: 1.5, pt: 2.5, px: 3,
              borderBottom: `1px solid`, borderColor: 'divider',
            }}>
              <Box>
                <Chip
                  label={hechoDialog.reparacionAdmin ? 'Reparación vía administrativa' : 'Hecho victimizante'}
                  size="small"
                  sx={{
                    mb: 0.75, fontWeight: 700, fontSize: '0.62rem',
                    bgcolor: hechoDialog.reparacionAdmin ? '#DCFCE7' : `${OV.grisMedio}20`,
                    color: hechoDialog.reparacionAdmin ? '#166534' : OV.grisOscuro,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 700, color: OV.grisOscuro, lineHeight: 1.2 }}>
                  {hechoDialog.label}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => setHechoDialog(null)} sx={{ flexShrink: 0, mt: -0.5 }}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ px: 3, py: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.85, mb: 2 }}>
                {hechoDialog.descripcion}
              </Typography>
              <Box sx={{ px: 2, py: 1.25, borderRadius: 2, bgcolor: `${OV.amarillo}12`,
                border: `1px solid ${OV.amarillo}40` }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: OV.amarilloOsc }}>
                  Marco normativo
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: OV.grisOscuro }}>
                  {hechoDialog.norma}
                </Typography>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}
