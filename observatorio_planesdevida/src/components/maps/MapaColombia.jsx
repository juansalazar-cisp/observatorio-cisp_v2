import { useState, useCallback } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// GeoJSON local en /public — sin dependencia de red
const GEO_URL = `${import.meta.env.BASE_URL}colombia-geo.json`;

// ── Datos por departamento ────────────────────────────────────────────────────
// Claves normalizadas (sin tildes, mayúsculas) para hacer match con NOMBRE_DPT
const datos = {
  'ANTIOQUIA':           { planes: 4,  comunidades: 18, pueblos: ['Emberá Katío', 'Emberá Chamí', 'Guna Tule', 'Senú'],                              estado: 'Activo' },
  'ATLANTICO':           { planes: 0,  comunidades: 0,  pueblos: [],                                                                                  estado: 'Sin registro' },
  'SANTAFE DE BOGOTA DC':{ planes: 1,  comunidades: 2,  pueblos: ['Muisca Urbano', 'Emberá'],                                                          estado: 'En formulación' },
  'BOLIVAR':             { planes: 0,  comunidades: 0,  pueblos: [],                                                                                  estado: 'Sin registro' },
  'BOYACA':              { planes: 1,  comunidades: 4,  pueblos: ["U'wa"],                                                                             estado: 'Activo' },
  'CALDAS':              { planes: 0,  comunidades: 0,  pueblos: [],                                                                                  estado: 'Sin registro' },
  'CAQUETA':             { planes: 1,  comunidades: 3,  pueblos: ['Coreguaje', 'Emberá'],                                                              estado: 'Activo' },
  'CAUCA':               { planes: 8,  comunidades: 24, pueblos: ['Nasa', 'Misak', 'Totoró', 'Kokonuko', 'Yanacona', 'Eperara Siapidara', 'Páez'],    estado: 'Activo' },
  'CESAR':               { planes: 2,  comunidades: 6,  pueblos: ['Kankuamo', 'Wiwa', 'Chimila'],                                                      estado: 'Activo' },
  'CORDOBA':             { planes: 2,  comunidades: 6,  pueblos: ['Zenú', 'Emberá Katío'],                                                             estado: 'Activo' },
  'CUNDINAMARCA':        { planes: 1,  comunidades: 2,  pueblos: ['Muisca'],                                                                           estado: 'En formulación' },
  'CHOCO':               { planes: 5,  comunidades: 15, pueblos: ['Emberá Katío', 'Emberá Dobidá', 'Wounaan', 'Chamí'],                                estado: 'Activo' },
  'HUILA':               { planes: 1,  comunidades: 3,  pueblos: ['Páez', 'Dujos'],                                                                    estado: 'En formulación' },
  'LA GUAJIRA':          { planes: 3,  comunidades: 14, pueblos: ['Wayuu', 'Wiwa', 'Kogui', 'Arhuaco'],                                                estado: 'Activo' },
  'MAGDALENA':           { planes: 1,  comunidades: 4,  pueblos: ['Chimila', 'Kogui'],                                                                 estado: 'En formulación' },
  'META':                { planes: 3,  comunidades: 9,  pueblos: ['Sikuani', 'Achagua', 'Jiw'],                                                        estado: 'Activo' },
  'NARINO':              { planes: 6,  comunidades: 20, pueblos: ['Awá', 'Pasto', 'Quillasinga', 'Eperara Siapidara', 'Cofán'],                        estado: 'Activo' },
  'NORTE DE SANTANDER':  { planes: 1,  comunidades: 3,  pueblos: ['Motilón Barí'],                                                                     estado: 'Activo' },
  'QUINDIO':             { planes: 0,  comunidades: 0,  pueblos: [],                                                                                  estado: 'Sin registro' },
  'RISARALDA':           { planes: 1,  comunidades: 3,  pueblos: ['Emberá Chamí'],                                                                     estado: 'Activo' },
  'SANTANDER':           { planes: 0,  comunidades: 0,  pueblos: [],                                                                                  estado: 'Sin registro' },
  'SUCRE':               { planes: 1,  comunidades: 3,  pueblos: ['Zenú'],                                                                             estado: 'En formulación' },
  'TOLIMA':              { planes: 1,  comunidades: 2,  pueblos: ['Pijao'],                                                                            estado: 'En formulación' },
  'VALLE DEL CAUCA':     { planes: 1,  comunidades: 2,  pueblos: ['Nasa Urbano', 'Emberá'],                                                            estado: 'En formulación' },
  'ARAUCA':              { planes: 1,  comunidades: 3,  pueblos: ["U'wa", 'Hitnu'],                                                                    estado: 'En formulación' },
  'CASANARE':            { planes: 0,  comunidades: 0,  pueblos: [],                                                                                  estado: 'Sin registro' },
  'PUTUMAYO':            { planes: 4,  comunidades: 11, pueblos: ['Inga', 'Kamëntsá', 'Siona', 'Cofán'],                                               estado: 'Activo' },
  'AMAZONAS':            { planes: 5,  comunidades: 12, pueblos: ['Tikuna', 'Yucuna', 'Andoke', 'Bora', 'Miraña', 'Ocaina', 'Muinane'],                estado: 'Activo' },
  'GUAINIA':             { planes: 2,  comunidades: 7,  pueblos: ['Curripaco', 'Puinave'],                                                             estado: 'Activo' },
  'GUAVIARE':            { planes: 3,  comunidades: 8,  pueblos: ['Guayabero', 'Nukak', 'Jiw'],                                                        estado: 'En revisión' },
  'VAUPES':              { planes: 7,  comunidades: 16, pueblos: ['Cubeo', 'Desano', 'Tukano', 'Wanano', 'Barasana', 'Makuna', 'Piratapuyo'],          estado: 'Activo' },
  'VICHADA':             { planes: 2,  comunidades: 8,  pueblos: ['Sikuani', 'Piaroa', 'Piapoco'],                                                     estado: 'En formulación' },
  'ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA': { planes: 0, comunidades: 0, pueblos: [], estado: 'Sin registro' },
};

// Normaliza: sin tildes, mayúsculas — hace el match con las claves del objeto
function norm(str) {
  return (str || '').toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

function colorPorPlanes(n) {
  if (!n || n === 0) return '#DDD5D5';
  if (n <= 2)        return '#F2D0D4';
  if (n <= 4)        return '#D4455A';
  if (n <= 6)        return '#BF1E2E';
  return '#8C1020';
}

const estadoChip = {
  'Activo':         { color: '#166534', bg: '#F0FDF4' },
  'En formulación': { color: '#92400E', bg: '#FEF3C7' },
  'En revisión':    { color: '#075985', bg: '#E0F2FE' },
  'Sin registro':   { color: '#857272', bg: '#F5F0F0' },
};

export default function MapaColombia() {
  const [tooltip, setTooltip] = useState(null);
  const [dialogo, setDialogo] = useState(null);

  const handleMove = useCallback((rawName, e) => {
    const svg = e.currentTarget.closest('svg');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setTooltip({ rawName, x: e.clientX - rect.left + 12, y: e.clientY - rect.top - 10 });
  }, []);

  const handleLeave  = useCallback(() => setTooltip(null), []);
  const handleClick  = useCallback((rawName) => { setTooltip(null); setDialogo(rawName); }, []);

  const keyDialogo   = dialogo ? norm(dialogo) : null;
  const dpto         = keyDialogo ? (datos[keyDialogo] ?? { planes: 0, comunidades: 0, pueblos: [], estado: 'Sin registro' }) : null;
  const chipColors   = dpto ? (estadoChip[dpto.estado] ?? estadoChip['Sin registro']) : null;

  return (
    <Box>
      {/* Leyenda */}
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 2, alignItems: 'center' }}>
        {[
          { color: '#DDD5D5', label: 'Sin registro' },
          { color: '#F2D0D4', label: '1–2 planes' },
          { color: '#D4455A', label: '3–4 planes' },
          { color: '#BF1E2E', label: '5–6 planes' },
          { color: '#8C1020', label: '7+ planes' },
        ].map(({ color, label }) => (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: color, border: '1px solid rgba(0,0,0,0.12)', flexShrink: 0 }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>{label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Mapa */}
      <Box sx={{
        position: 'relative',
        border: '1px solid', borderColor: 'divider',
        borderRadius: 2, overflow: 'hidden', bgcolor: '#EAF4FB',
      }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 3000, center: [-74, 4.5] }}
          width={700}
          height={980}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const rawName = geo.properties.NOMBRE_DPT || '';
                const key     = norm(rawName);
                const info    = datos[key] ?? { planes: 0 };
                const fill    = colorPorPlanes(info.planes);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="#FFFFFF"
                    strokeWidth={0.8}
                    style={{
                      default: { fill, outline: 'none', cursor: 'pointer' },
                      hover:   { fill, outline: 'none', cursor: 'pointer', opacity: 0.75 },
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

        {/* Tooltip flotante */}
        {tooltip && (
          <Box sx={{
            position: 'absolute',
            left: Math.min(tooltip.x, 480),
            top: Math.max(tooltip.y, 4),
            bgcolor: 'white', border: '1px solid', borderColor: 'divider',
            borderRadius: 1.5, px: 1.5, py: 0.75,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            pointerEvents: 'none', zIndex: 10,
          }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary', display: 'block' }}>
              {tooltip.rawName}
            </Typography>
            {(() => {
              const d = datos[norm(tooltip.rawName)];
              return d ? (
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {d.planes > 0
                    ? `${d.planes} plan${d.planes > 1 ? 'es' : ''} · ${d.comunidades} comunidades`
                    : 'Sin registro'}
                </Typography>
              ) : null;
            })()}
          </Box>
        )}
      </Box>

      <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 1, textAlign: 'right' }}>
        Haz clic en un departamento para ver el detalle
      </Typography>

      {/* ── Diálogo detalle ─────────────────────────────────────────────── */}
      <Dialog
        open={Boolean(dialogo)}
        onClose={() => setDialogo(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2, m: { xs: 1.5, sm: 2 } } }}
      >
        {dialogo && dpto && (
          <>
            <DialogTitle sx={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              gap: 1, pb: 1.5, pt: 2.5, px: 3,
              borderBottom: '1px solid', borderColor: 'divider',
            }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                  <LocationOnIcon sx={{ color: 'primary.main', fontSize: 15 }} />
                  <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.65rem' }}>
                    Departamento
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>
                  {dialogo}
                </Typography>
                <Chip
                  label={dpto.estado}
                  size="small"
                  sx={{ mt: 0.75, fontSize: '0.65rem', fontWeight: 600, height: 20, borderRadius: 1, bgcolor: chipColors.bg, color: chipColors.color }}
                />
              </Box>
              <IconButton size="small" onClick={() => setDialogo(null)} sx={{ flexShrink: 0, mt: -0.5 }}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ px: 3, py: 3 }}>
              {dpto.planes === 0 ? (
                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}>
                  No hay planes de vida registrados en este departamento actualmente.
                </Typography>
              ) : (
                <>
                  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Box sx={{ flex: 1, textAlign: 'center', p: 2, borderRadius: 2, bgcolor: '#F9E8EA', border: '1px solid #F2D0D4' }}>
                      <AccountTreeIcon sx={{ color: 'primary.main', fontSize: 20, mb: 0.5 }} />
                      <Typography sx={{ fontWeight: 800, color: 'primary.main', fontSize: '1.75rem', lineHeight: 1 }}>
                        {dpto.planes}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'primary.dark' }}>Planes de vida</Typography>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: 'center', p: 2, borderRadius: 2, bgcolor: '#F5F0F0', border: '1px solid', borderColor: 'divider' }}>
                      <GroupsIcon sx={{ color: 'text.secondary', fontSize: 20, mb: 0.5 }} />
                      <Typography sx={{ fontWeight: 800, color: 'text.primary', fontSize: '1.75rem', lineHeight: 1 }}>
                        {dpto.comunidades}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>Comunidades</Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', mb: 1.25 }}>
                    Pueblos indígenas
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {dpto.pueblos.map((p) => (
                      <Chip
                        key={p}
                        label={p}
                        size="small"
                        sx={{ fontSize: '0.72rem', height: 22, borderRadius: 1, bgcolor: 'white', border: '1px solid', borderColor: 'divider', color: 'text.secondary' }}
                      />
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
