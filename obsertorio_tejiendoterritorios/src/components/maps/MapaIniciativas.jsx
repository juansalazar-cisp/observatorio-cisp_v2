import { useState, useCallback } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import {
  Box, Typography, Dialog, DialogTitle, DialogContent,
  IconButton, Chip, Divider,
} from '@mui/material';
import CloseIcon      from '@mui/icons-material/Close';
import TimelineIcon   from '@mui/icons-material/Timeline';
import GroupsIcon     from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { TT } from '../../theme';
import { datosPorDepartamento } from '../../data/iniciativasDetalle';

const GEO_URL = `${import.meta.env.BASE_URL}colombia-geo.json`;

function norm(str) {
  return (str || '').toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

function colorPorIniciativas(n) {
  if (!n || n === 0) return '#E8EDF0';
  if (n <= 4)        return `${TT.crema}`;
  if (n <= 8)        return `${TT.naranja}88`;
  if (n <= 14)       return TT.naranja;
  return '#c96b10';
}

const leyenda = [
  { color: '#E8EDF0',          label: 'Sin registro' },
  { color: TT.crema,           label: '1–4 iniciativas' },
  { color: `${TT.naranja}88`,  label: '5–8 iniciativas' },
  { color: TT.naranja,         label: '9–14 iniciativas' },
  { color: '#c96b10',          label: '15+ iniciativas' },
];

export default function MapaIniciativas() {
  const [tooltip, setTooltip] = useState(null);
  const [dialogo, setDialogo] = useState(null);

  const handleMove = useCallback((rawName, e) => {
    const svg = e.currentTarget.closest('svg');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setTooltip({ rawName, x: e.clientX - rect.left + 12, y: e.clientY - rect.top - 10 });
  }, []);

  const handleLeave = useCallback(() => setTooltip(null), []);
  const handleClick = useCallback((rawName) => { setTooltip(null); setDialogo(rawName); }, []);

  const keyDialogo = dialogo ? norm(dialogo) : null;
  const info = keyDialogo ? (datosPorDepartamento[keyDialogo] ?? null) : null;

  return (
    <Box>
      {/* Leyenda */}
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 2, alignItems: 'center' }}>
        {leyenda.map(({ color, label }) => (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: color,
              border: '1px solid rgba(0,0,0,0.12)', flexShrink: 0 }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              {label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Mapa */}
      <Box sx={{
        position: 'relative',
        border: `1.5px solid ${TT.naranja}20`,
        borderRadius: 3, overflow: 'hidden',
        bgcolor: '#EBF4F0',
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
                const d       = datosPorDepartamento[key];
                const fill    = colorPorIniciativas(d?.iniciativas ?? 0);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="#fff"
                    strokeWidth={0.8}
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
            left: Math.min(tooltip.x, 480), top: Math.max(tooltip.y, 4),
            bgcolor: '#fff', border: `1px solid ${TT.naranja}30`,
            borderRadius: 2, px: 1.5, py: 0.75,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            pointerEvents: 'none', zIndex: 10,
          }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: TT.marino, display: 'block' }}>
              {tooltip.rawName}
            </Typography>
            {(() => {
              const d = datosPorDepartamento[norm(tooltip.rawName)];
              return d ? (
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {d.iniciativas} iniciativa{d.iniciativas !== 1 ? 's' : ''}
                </Typography>
              ) : (
                <Typography variant="caption" color="text.disabled">Sin registro</Typography>
              );
            })()}
          </Box>
        )}
      </Box>

      <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 1, textAlign: 'right' }}>
        Toca un departamento para ver el detalle de iniciativas
      </Typography>

      {/* Dialog detalle */}
      <Dialog open={Boolean(dialogo)} onClose={() => setDialogo(null)}
        maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3, m: { xs: 1.5, sm: 2 } } }}>
        {dialogo && (
          <>
            <DialogTitle sx={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              gap: 1, pb: 1.5, pt: 2.5, px: 3,
              borderBottom: '1px solid', borderColor: 'divider',
            }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                  <LocationOnIcon sx={{ color: TT.naranja, fontSize: 15 }} />
                  <Typography variant="caption" sx={{ color: TT.naranja, fontWeight: 600,
                    textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.65rem' }}>
                    Departamento
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: TT.marino, lineHeight: 1.2 }}>
                  {dialogo}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => setDialogo(null)} sx={{ flexShrink: 0, mt: -0.5 }}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ px: 3, py: 3 }}>
              {!info ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                  No hay iniciativas registradas en este departamento.
                </Typography>
              ) : (
                <>
                  {/* Indicadores */}
                  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Box sx={{ flex: 1, textAlign: 'center', p: 2, borderRadius: 2,
                      bgcolor: `${TT.naranja}10`, border: `1.5px solid ${TT.naranja}25` }}>
                      <TimelineIcon sx={{ color: TT.naranja, fontSize: 20, mb: 0.5 }} />
                      <Typography sx={{ fontWeight: 800, color: TT.naranja, fontSize: '1.75rem', lineHeight: 1 }}>
                        {info.iniciativas}
                      </Typography>
                      <Typography variant="caption" sx={{ color: TT.naranja }}>
                        Iniciativa{info.iniciativas !== 1 ? 's' : ''}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: 'center', p: 2, borderRadius: 2,
                      bgcolor: `${TT.verde}10`, border: `1.5px solid ${TT.verde}25` }}>
                      <GroupsIcon sx={{ color: TT.verde, fontSize: 20, mb: 0.5 }} />
                      <Typography sx={{ fontWeight: 800, color: TT.verde, fontSize: '1.75rem', lineHeight: 1 }}>
                        {info.pueblos.length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: TT.verde }}>Pueblo{info.pueblos.length !== 1 ? 's' : ''}</Typography>
                    </Box>
                  </Box>

                  {info.municipios.length > 0 && (
                    <>
                      <Divider sx={{ mb: 2 }} />
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary',
                        textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', mb: 1 }}>
                        Municipios
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
                        {info.municipios.map((m) => (
                          <Chip key={m} label={m} size="small"
                            sx={{ fontSize: '0.68rem', height: 22, bgcolor: '#fff',
                              border: `1px solid ${TT.naranja}30`, color: 'text.secondary' }} />
                        ))}
                      </Box>
                    </>
                  )}

                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary',
                    textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', mb: 1 }}>
                    Pueblos indígenas
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {info.pueblos.map((p) => (
                      <Chip key={p} label={p} size="small"
                        sx={{ fontSize: '0.68rem', height: 22, bgcolor: `${TT.verde}10`,
                          border: `1px solid ${TT.verde}25`, color: TT.verde, fontWeight: 600 }} />
                    ))}
                  </Box>
                </>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}
