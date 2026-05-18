import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Chip, Divider, Paper, Grid,
  Card, CardContent, CardActionArea,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MapIcon from '@mui/icons-material/Map';
import PeopleIcon from '@mui/icons-material/People';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TableChartIcon from '@mui/icons-material/TableChart';
import DownloadIcon from '@mui/icons-material/Download';

import { CISP } from '../../../../theme';
import { useOrgById } from '../../../../utils/orgData';
import MapaDeptoEstatico from '../../../../components/maps/MapaDeptoEstatico';
import fondo1 from '../../../../assets/fondo1.png';
import imaginario4 from '../../../../assets/imaginario4.png';

const regionColor = {
  andina:    CISP.verde_agua,
  caribe:    CISP.amarillo,
  pacifica:  CISP.rojo,
  amazonica: CISP.verde,
  orinoquia: CISP.vino,
};

// Contenidos provisionales por plan (se actualizarán con datos reales)
const contenidoTerritorial = {
  1: {
    contexto: `El Pueblo Nasa habita principalmente el departamento del Cauca, en la zona andina del suroccidente colombiano. Su territorio ancestral se extiende por las cordilleras Central y Occidental, entre los valles interandinos y las vertientes del Macizo Colombiano. Los municipios de Toribío, Jambaló, Caldono, Corinto, Miranda, Caloto y Santander de Quilichao concentran la mayor presencia del pueblo Nasa, distribuida en más de 100 resguardos indígenas legalmente constituidos.

Se estima una población de aproximadamente 250.000 personas, con una alta concentración en el norte y oriente del Cauca. Esta distribución define un territorio pluriétnico y multicultural donde el pueblo Nasa ejerce su autonomía a través de estructuras organizativas propias, conservando sus prácticas de gobierno local y gestión territorial.`,
    identidad: `El Pueblo Nasa se reconoce por su lengua propia, el Nasa Yuwe, hablada por una proporción significativa de su población, especialmente en zonas rurales y comunidades de la cordillera. Su cosmovisión se fundamenta en la relación profunda con la naturaleza y el territorio, expresada en el concepto de "Nasa Kiwe" (tierra de la gente).

La autoridad tradicional reside en los cabildos indígenas y en el Consejo Regional Indígena del Cauca (CRIC), fundado en 1971 y reconocido como uno de los movimientos indígenas más sólidos de América Latina. La minga como forma de trabajo colectivo, la tulpa como espacio de encuentro y transmisión de saberes, las prácticas de medicina tradicional y los rituales de armonización constituyen elementos centrales de su identidad y gobierno propio.`,
  },
};

const MODULO_COLOR = CISP.verde;

function SeccionHeader({ icono, titulo, descripcion }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: MODULO_COLOR, flexShrink: 0 }} />
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icono}
          <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>
            {titulo}
          </Typography>
        </Box>
        {descripcion && (
          <Typography variant="body2" color="text.secondary">{descripcion}</Typography>
        )}
      </Box>
    </Box>
  );
}

function TarjetaDescarga({ icono, titulo, subtitulo, disponible = false }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: `1.5px solid ${MODULO_COLOR}25`,
        borderRadius: 2.5,
        opacity: disponible ? 1 : 0.65,
        transition: 'transform 0.18s, box-shadow 0.18s',
        ...(disponible && { '&:hover': { transform: 'translateY(-3px)', boxShadow: `0 8px 24px ${MODULO_COLOR}25` } }),
      }}
    >
      <CardActionArea disabled={!disponible} sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, textAlign: 'center' }}>
          <Box
            sx={{
              width: 56, height: 56, borderRadius: 2,
              bgcolor: `${MODULO_COLOR}15`, border: `2px solid ${MODULO_COLOR}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {icono}
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: MODULO_COLOR, mb: 0.25 }}>
              {titulo}
            </Typography>
            <Typography variant="caption" color="text.disabled" sx={{ display: 'block', lineHeight: 1.3 }}>
              {subtitulo}
            </Typography>
          </Box>
          <Chip
            label={disponible ? 'Descargar' : 'Próximamente'}
            size="small"
            icon={disponible ? <DownloadIcon sx={{ fontSize: '0.7rem !important' }} /> : undefined}
            sx={{
              fontSize: '0.65rem', height: 20,
              bgcolor: disponible ? `${MODULO_COLOR}15` : '#f5f5f5',
              color: disponible ? MODULO_COLOR : 'text.disabled',
            }}
          />
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default function PlanMiTerritorio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plan = useOrgById(id);

  if (!plan) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="text.secondary">Plan no encontrado</Typography>
        <Button onClick={() => navigate('/visualizacion')} sx={{ mt: 2 }}>Volver</Button>
      </Box>
    );
  }

  const planColor = regionColor[plan.region] || CISP.verde_agua;
  const textos = contenidoTerritorial[plan.id] || {
    contexto: 'Información territorial en construcción para este plan de vida.',
    identidad: 'Información de identidad cultural en construcción para este plan de vida.',
  };

  return (
    <Box>
      {/* Navegación de retorno */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/mi-plan-de-vida/plan/${plan.id}`)}
        sx={{ mb: 3, color: MODULO_COLOR, fontWeight: 700 }}
      >
        Volver al Plan de Vida
      </Button>

      {/* Banner del módulo */}
      <Paper
        elevation={0}
        sx={{
          mb: 5, px: { xs: 3, md: 4 }, py: 3.5,
          borderRadius: 3, overflow: 'hidden',
          background: `linear-gradient(135deg, ${MODULO_COLOR}dd 0%, ${MODULO_COLOR}99 100%)`,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${fondo1})`,
            backgroundSize: 'cover', opacity: 0.1,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
          <Box
            component="img" src={imaginario4} alt=""
            sx={{ width: 60, opacity: 0.5, filter: 'brightness(10)', flexShrink: 0 }}
          />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Chip
                label={`Pueblo ${plan.pueblo}`}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.25)', color: '#fff', fontWeight: 700, fontSize: '0.7rem' }}
              />
              <Chip
                label={plan.departamento}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.7rem' }}
              />
            </Box>
            <Typography variant="h4"
              sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: '#fff', lineHeight: 1.2, mb: 0.5 }}>
              Mi Territorio
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', maxWidth: 600 }}>
              Información geoespacial, contexto territorial y poblacional, elementos de identidad y cifras clave del territorio {plan.pueblo} en {plan.departamento}.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* ── Mapa de ubicación ─────────────────────────────── */}
      <SeccionHeader
        icono={<MapIcon sx={{ color: MODULO_COLOR, fontSize: 22 }} />}
        titulo="Ubicación en Colombia"
        descripcion={`Localización del territorio ${plan.pueblo} en el departamento de ${plan.departamento}`}
      />

      <Box sx={{ mb: 6, maxWidth: 420, mx: 'auto' }}>
        <MapaDeptoEstatico departamento={plan.departamento} color={MODULO_COLOR} />
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* ── Contexto Territorial y Poblacional ───────────── */}
      <SeccionHeader
        icono={<MapIcon sx={{ color: MODULO_COLOR, fontSize: 22 }} />}
        titulo="Contexto Territorial y Poblacional"
      />

      <Paper
        elevation={0}
        sx={{
          mb: 6, p: { xs: 2.5, md: 3.5 },
          border: `1px solid ${MODULO_COLOR}20`,
          borderRadius: 3,
          bgcolor: `${MODULO_COLOR}05`,
          borderLeft: `4px solid ${MODULO_COLOR}`,
        }}
      >
        <Chip
          label="Texto provisional"
          size="small"
          sx={{ mb: 2, bgcolor: `${MODULO_COLOR}15`, color: MODULO_COLOR, fontWeight: 600, fontSize: '0.65rem' }}
        />
        {textos.contexto.split('\n\n').map((parrafo, i) => (
          <Typography
            key={i}
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.85, mb: i < textos.contexto.split('\n\n').length - 1 ? 2 : 0 }}
          >
            {parrafo}
          </Typography>
        ))}
      </Paper>

      <Divider sx={{ mb: 5 }} />

      {/* ── Elementos de Identidad ────────────────────────── */}
      <SeccionHeader
        icono={<PeopleIcon sx={{ color: MODULO_COLOR, fontSize: 22 }} />}
        titulo="Elementos de Identidad"
      />

      <Paper
        elevation={0}
        sx={{
          mb: 6, p: { xs: 2.5, md: 3.5 },
          border: `1px solid ${MODULO_COLOR}20`,
          borderRadius: 3,
          bgcolor: `${MODULO_COLOR}05`,
          borderLeft: `4px solid ${MODULO_COLOR}`,
        }}
      >
        <Chip
          label="Texto provisional"
          size="small"
          sx={{ mb: 2, bgcolor: `${MODULO_COLOR}15`, color: MODULO_COLOR, fontWeight: 600, fontSize: '0.65rem' }}
        />
        {textos.identidad.split('\n\n').map((parrafo, i) => (
          <Typography
            key={i}
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.85, mb: i < textos.identidad.split('\n\n').length - 1 ? 2 : 0 }}
          >
            {parrafo}
          </Typography>
        ))}
      </Paper>

      <Divider sx={{ mb: 5 }} />

      {/* ── Cifras Claves del Territorio ─────────────────── */}
      <SeccionHeader
        titulo="Cifras Claves del Territorio"
        descripcion="Recursos documentales y bases de datos sobre el territorio"
      />

      {/* Sub-sección: Fuentes secundarias */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
          <Box sx={{ width: 3, height: 22, borderRadius: 1, bgcolor: `${MODULO_COLOR}60` }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.secondary' }}>
            Fuentes secundarias
          </Typography>
        </Box>

        <Grid container spacing={2.5} sx={{ maxWidth: 480 }}>
          <Grid size={{ xs: 6 }}>
            <TarjetaDescarga
              icono={<AutoStoriesIcon sx={{ color: MODULO_COLOR, fontSize: 26 }} />}
              titulo="Cartillas"
              subtitulo="Documentos y cartillas en formato PDF"
              disponible={false}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TarjetaDescarga
              icono={<TableChartIcon sx={{ color: MODULO_COLOR, fontSize: 26 }} />}
              titulo="Bases de datos"
              subtitulo="Información descargable en Excel"
              disponible={false}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
