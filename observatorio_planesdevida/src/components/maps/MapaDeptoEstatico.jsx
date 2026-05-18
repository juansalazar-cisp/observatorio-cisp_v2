import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const GEO_URL = `${import.meta.env.BASE_URL}colombia-geo.json`;

function norm(str) {
  return (str || '').toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

export default function MapaDeptoEstatico({ departamento, color = '#218380' }) {
  const deptoNorm = norm(departamento);

  return (
    <Box>
      <Box
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: '#EAF4FB',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
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
                const isTarget = norm(rawName) === deptoNorm;
                const fill = isTarget ? color : '#D8D0D0';
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="#FFFFFF"
                    strokeWidth={0.8}
                    style={{
                      default: { fill, outline: 'none' },
                      hover:   { fill, outline: 'none' },
                      pressed: { fill, outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </Box>
      <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 0.75, textAlign: 'center' }}>
        {departamento} · Colombia
      </Typography>
    </Box>
  );
}
