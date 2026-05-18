import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Box, Typography } from '@mui/material';

const GEO_URL = `${import.meta.env.BASE_URL}colombia-geo.json`;

function norm(str) {
  return (str || '').toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

// Centro y zoom por departamento — ajustado para enfocar cada territorio
const deptoConfig = {
  'CAUCA':         { scale: 8000,  center: [-76.5,  2.3]  },
  'LA GUAJIRA':    { scale: 8500,  center: [-72.5, 11.3]  },
  'CHOCO':         { scale: 8000,  center: [-77,    6.2]   },
  'MAGDALENA':     { scale: 9000,  center: [-74,   10.0]   },
  'CORDOBA':       { scale: 9500,  center: [-75.5,  8.5]  },
  'TOLIMA':        { scale: 10000, center: [-75.2,  3.8]  },
  'VICHADA':       { scale: 5500,  center: [-69,    4.5]   },
  'AMAZONAS':      { scale: 6500,  center: [-71,   -2.0]   },
  'PUTUMAYO':      { scale: 9000,  center: [-76,    0.5]   },
  'CUNDINAMARCA':  { scale: 11000, center: [-74,    4.6]  },
  'NARINO':        { scale: 9000,  center: [-77.5,  1.5]  },
  'ANTIOQUIA':     { scale: 8000,  center: [-75.5,  7.0]  },
  'BOLIVAR':       { scale: 8500,  center: [-74.5,  9.0]  },
  'HUILA':         { scale: 10000, center: [-75.5,  2.5]  },
  'META':          { scale: 7000,  center: [-73,    3.5]   },
  'GUAVIARE':      { scale: 6500,  center: [-72,    2.5]   },
  'VAUPES':        { scale: 6000,  center: [-70,    1.0]   },
  'GUAINIA':       { scale: 6000,  center: [-68,    3.0]   },
};

const DEFAULT_CONFIG = { scale: 4000, center: [-74, 4.5] };

export default function MapaRegionIniciativa({ departamento, color = '#FF9331', comunidad }) {
  const key    = norm(departamento);
  const config = deptoConfig[key] || DEFAULT_CONFIG;

  return (
    <Box>
      <Box sx={{
        borderRadius: 3, overflow: 'hidden',
        bgcolor: '#EBF5EE',
        border: `1.5px solid ${color}25`,
        boxShadow: `0 4px 20px ${color}15`,
      }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: config.scale, center: config.center }}
          width={700} height={700}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const rawName  = geo.properties.NOMBRE_DPT || '';
                const isTarget = norm(rawName) === key;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isTarget ? color : '#D0DDD5'}
                    stroke="#fff"
                    strokeWidth={isTarget ? 1.5 : 0.6}
                    style={{
                      default: { fill: isTarget ? color : '#D0DDD5', outline: 'none' },
                      hover:   { fill: isTarget ? color : '#D0DDD5', outline: 'none' },
                      pressed: { fill: isTarget ? color : '#D0DDD5', outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, justifyContent: 'center' }}>
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color, flexShrink: 0 }} />
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          {comunidad && `${comunidad} · `}{departamento} · Colombia
        </Typography>
      </Box>
    </Box>
  );
}
