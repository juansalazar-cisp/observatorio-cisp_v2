import { Box, Typography, Chip, Divider, Tooltip, Stack } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArticleIcon from '@mui/icons-material/Article';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import BarChartIcon from '@mui/icons-material/BarChart';
import PsychologyIcon from '@mui/icons-material/Psychology';
import DownloadIcon from '@mui/icons-material/Download';
import LockIcon from '@mui/icons-material/Lock';

import ModuloBanner from '../../components/common/ModuloBanner';
import { CISP } from '../../theme';
import imaginario7 from '../../assets/imaginario7.png';
import fondo1 from '../../assets/fondo1.png';

// ── Categorías de productos ───────────────────────────────────────────────────
// archivo: ruta relativa desde /public/docs/ — null = próximamente
const categorias = [
  {
    id: 'informes',
    titulo: 'Informes Técnicos',
    descripcion:
      'Documentos de análisis y seguimiento técnico elaborados por el equipo del Observatorio, con información consolidada sobre el estado de los Planes de Vida y los territorios indígenas.',
    color: CISP.verde_agua,
    icon: ArticleIcon,
    archivo: null, // '/docs/informe-tecnico-2024.pdf'
    formato: 'PDF',
    fecha: '2024',
  },
  {
    id: 'boletines',
    titulo: 'Boletines Periódicos',
    descripcion:
      'Publicaciones periódicas con los principales hallazgos, avances y novedades del Observatorio. Diseñados para comunicar resultados de forma clara y accesible a diferentes públicos.',
    color: CISP.amarillo,
    icon: NewspaperIcon,
    archivo: null, // '/docs/boletin-2024-01.pdf'
    formato: 'PDF',
    fecha: '2024',
  },
  {
    id: 'fichas',
    titulo: 'Fichas Territoriales',
    descripcion:
      'Documentos de caracterización de cada territorio indígena: ubicación, área, población, comunidades, autoridades y elementos de identidad cultural. Una ficha por territorio.',
    color: CISP.verde,
    icon: FmdGoodIcon,
    archivo: null, // '/docs/fichas-territoriales-2024.pdf'
    formato: 'PDF',
    fecha: '2024',
  },
  {
    id: 'reportes',
    titulo: 'Reportes Temáticos',
    descripcion:
      'Análisis especializados sobre ejes temáticos transversales: articulación con los ODS, estado de formulación de planes, indicadores de fortalecimiento organizativo y dinámicas territoriales.',
    color: CISP.vino,
    icon: BarChartIcon,
    archivo: null, // '/docs/reporte-tematico-ods-2024.pdf'
    formato: 'PDF',
    fecha: '2024',
  },
  {
    id: 'analisis',
    titulo: 'Documentos de Análisis',
    descripcion:
      'Estudios de profundidad sobre tendencias, brechas y oportunidades identificadas en el sistema de información. Insumos para la toma de decisiones institucionales y comunitarias.',
    color: CISP.rojo,
    icon: PsychologyIcon,
    archivo: null, // '/docs/analisis-2024.pdf'
    formato: 'PDF',
    fecha: '2024',
  },
];

// ── Componente: botón alargado de descarga ────────────────────────────────────
function BotonDescarga({ categoria }) {
  const Icono = categoria.icon;
  const disponible = Boolean(categoria.archivo);

  const handleDescarga = () => {
    if (!disponible) return;
    const link = document.createElement('a');
    link.href = categoria.archivo;
    link.download = categoria.archivo.split('/').pop();
    link.click();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 2, md: 3 },
        px: { xs: 2.5, md: 3.5 },
        py: 2.5,
        borderRadius: 2.5,
        border: `1.5px solid ${categoria.color}30`,
        borderLeft: `5px solid ${categoria.color}`,
        bgcolor: '#fff',
        transition: 'box-shadow 0.2s, transform 0.15s',
        cursor: disponible ? 'pointer' : 'default',
        '&:hover': disponible
          ? { boxShadow: `0 6px 24px ${categoria.color}28`, transform: 'translateY(-2px)' }
          : { boxShadow: `0 2px 8px rgba(0,0,0,0.06)` },
      }}
      onClick={disponible ? handleDescarga : undefined}
    >
      {/* Ícono de categoría */}
      <Box
        sx={{
          width: { xs: 48, md: 56 },
          height: { xs: 48, md: 56 },
          flexShrink: 0,
          borderRadius: 2,
          bgcolor: `${categoria.color}12`,
          border: `1.5px solid ${categoria.color}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icono sx={{ fontSize: 26, color: categoria.color }} />
      </Box>

      {/* Texto */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Alegreya Sans", serif',
            fontWeight: 700,
            color: categoria.color,
            lineHeight: 1.2,
            mb: 0.5,
          }}
        >
          {categoria.titulo}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.6,
            display: { xs: 'none', sm: '-webkit-box' },
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {categoria.descripcion}
        </Typography>
      </Box>

      {/* Acción de descarga */}
      <Box sx={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
        <Chip
          label={categoria.formato}
          size="small"
          sx={{
            bgcolor: `${categoria.color}15`,
            color: categoria.color,
            fontWeight: 800,
            fontSize: '0.65rem',
            height: 20,
            letterSpacing: 0.5,
          }}
        />

        <Tooltip
          title={disponible ? `Descargar ${categoria.titulo}` : 'Documento en preparación'}
          placement="top"
          arrow
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              px: 2,
              py: 0.9,
              borderRadius: 2,
              bgcolor: disponible ? categoria.color : '#e0e0e0',
              color: disponible ? '#fff' : '#999',
              fontFamily: '"Nunito Sans", sans-serif',
              fontSize: '0.78rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              userSelect: 'none',
              transition: 'filter 0.15s',
              '&:hover': disponible ? { filter: 'brightness(0.9)' } : {},
            }}
          >
            {disponible
              ? <><DownloadIcon sx={{ fontSize: 16 }} /> Descargar</>
              : <><LockIcon sx={{ fontSize: 14 }} /> Próximamente</>
            }
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
}

// ── Página Reportes ───────────────────────────────────────────────────────────
export default function Reportes() {
  return (
    <Box>
      <ModuloBanner
        titulo="Reportes y Productos de Información"
        descripcion="Módulo orientado a la generación, sistematización y difusión de los productos de salida del Observatorio. Transforma datos en insumos que facilitan la toma de decisiones, el seguimiento territorial y la comunicación de resultados."
        color={CISP.verde_agua}
        icono={<AssessmentIcon sx={{ fontSize: 40 }} />}
        imagen={imaginario7}
        fondo={fondo1}
      />

      {/* Encabezado de sección */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: CISP.verde_agua }} />
        <Box>
          <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>
            Productos disponibles
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Selecciona un producto para descargarlo en formato PDF
          </Typography>
        </Box>
      </Box>

      {/* Botones alargados */}
      <Stack spacing={2} sx={{ mb: 5 }}>
        {categorias.map((cat) => (
          <BotonDescarga key={cat.id} categoria={cat} />
        ))}
      </Stack>

      <Divider sx={{ mb: 4 }} />

      {/* Nota informativa */}
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          border: `1px solid ${CISP.amarillo}40`,
          borderLeft: `4px solid ${CISP.amarillo}`,
          bgcolor: `${CISP.amarillo}06`,
          display: 'flex',
          gap: 2,
          alignItems: 'flex-start',
        }}
      >
        <DownloadIcon sx={{ color: CISP.amarillo, flexShrink: 0, mt: 0.2 }} />
        <Box>
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
            Sobre los documentos
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Los documentos se publican periódicamente a medida que el Observatorio consolida y valida la información.
            Para agregar archivos, colócalos en la carpeta <code>/public/docs/</code> y actualiza las rutas
            en el archivo <code>src/pages/Reportes/index.jsx</code>.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
