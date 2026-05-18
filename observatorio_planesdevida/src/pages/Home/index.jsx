import { Box, Typography, Grid, Card, CardContent, CardActionArea, Chip, Divider, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';

import CarruselGaleria from '../../components/common/CarruselGaleria';
import { CISP } from '../../theme';
import enlacesInteres from '../../data/enlacesInteres';

import fondo1 from '../../assets/fondo1.png';
import imaginario3 from '../../assets/imaginario3.png';
import imaginario4 from '../../assets/imaginario4.png';
import imaginario7 from '../../assets/imaginario7.png';
import imaginario5 from '../../assets/imaginario5.png';

// Color por categoría de enlace
const colorCategoria = {
  'Estadísticas':   CISP.verde_agua,
  'Institucional':  CISP.verde,
  'Normativo':      CISP.rojo,
  'Organizaciones': CISP.vino,
  'Cooperación':    CISP.amarillo,
  'Internacional':  CISP.azul_claro,
};

const accesos = [
  {
    titulo: 'Visualización y Consulta',
    descripcion: 'Explora mapas interactivos, indicadores, tableros de control y filtros territoriales de los Planes de Vida.',
    color: CISP.verde_agua,
    imagen: imaginario3,
    path: '/visualizacion',
    etiqueta: 'Interfaz pública',
  },
  {
    titulo: 'Reportes y Productos',
    descripcion: 'Accede a informes técnicos, boletines, fichas territoriales y documentos de análisis generados por el Observatorio.',
    color: CISP.vino,
    imagen: imaginario7,
    path: '/reportes',
    etiqueta: 'Documentos',
  },
];

// ──────────────────────────────────────────────────────────
// Sección: Hero / Contexto del Observatorio
// ──────────────────────────────────────────────────────────
function SeccionContexto() {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        mb: 6,
      }}
    >
      {/* Fondo con patrón CISP */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${fondo1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(33,131,128,0.92) 0%, rgba(33,131,128,0.78) 60%, rgba(62,127,0,0.82) 100%)',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 3, md: 5 },
          px: { xs: 3, md: 6 },
          py: { xs: 4, md: 5 },
        }}
      >
        {/* Texto */}
        <Box sx={{ flex: 1 }}>
          <Chip
            label="Observatorio · CISP Colombia"
            size="small"
            sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700, border: '1px solid rgba(255,255,255,0.35)' }}
          />
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Alegreya Sans", serif',
              fontWeight: 700,
              color: '#fff',
              mb: 2,
              lineHeight: 1.2,
              textShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            Un espacio para la memoria y el futuro de los pueblos
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, maxWidth: 640 }}
          >
            El Observatorio de Planes de Vida es una plataforma de información y análisis que nace del compromiso
            del CISP con el fortalecimiento de la autonomía y el desarrollo propio de las comunidades indígenas de Colombia.
            Su propósito es centralizar, sistematizar y visibilizar la información relacionada con los Planes de Vida
            comunitarios, facilitando el acceso al conocimiento, el seguimiento territorial y la toma de decisiones
            desde una perspectiva intercultural y participativa.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, maxWidth: 640, mt: 2 }}
          >
            Este observatorio integra datos territoriales, organizativos y socioculturales provenientes de los nodos
            comunitarios, articulados con fuentes institucionales y académicas, para ofrecer una visión integral
            del estado y avance de los Planes de Vida en el territorio colombiano.
          </Typography>
        </Box>

        {/* Imaginario decorativo */}
        <Box sx={{ flexShrink: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
          <Box
            component="img"
            src={imaginario4}
            alt=""
            aria-hidden="true"
            sx={{ width: 200, opacity: 0.3, filter: 'brightness(10)' }}
          />
        </Box>
      </Box>
    </Box>
  );
}

// ──────────────────────────────────────────────────────────
// Sección: Definición de Planes de Vida
// ──────────────────────────────────────────────────────────
function SeccionDefinicion() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: { xs: 3, md: 5 },
        mb: 6,
        px: { xs: 0, md: 2 },
      }}
    >
      {/* Imaginario izquierdo */}
      <Box
        sx={{
          flexShrink: 0,
          width: { xs: 120, md: 160 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          src={imaginario5}
          alt=""
          aria-hidden="true"
          sx={{ width: '100%', opacity: 0.75 }}
        />
      </Box>

      {/* Texto */}
      <Box sx={{ flex: 1 }}>
        <Chip
          label="¿Qué es un Plan de Vida?"
          size="small"
          sx={{ mb: 1.5, bgcolor: `${CISP.amarillo}20`, color: CISP.amarillo, fontWeight: 700, border: `1px solid ${CISP.amarillo}40` }}
        />
        <Typography
          variant="h4"
          sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: CISP.verde_agua, mb: 2 }}
        >
          Planes de Vida: el horizonte propio de cada comunidad
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, mb: 2 }}>
          Los Planes de Vida son instrumentos de planificación y gobierno propio elaborados por las comunidades
          indígenas. A diferencia de los planes de desarrollo convencionales, estos documentos nacen desde la
          cosmovisión, los valores y las prioridades de cada pueblo, y expresan su visión de futuro colectivo,
          su relación con el territorio y sus proyectos de vida comunitaria.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
          Un Plan de Vida no es un documento estático: es un proceso vivo y participativo que recoge saberes
          ancestrales, identifica necesidades presentes y proyecta el camino que cada comunidad quiere recorrer.
          Incluye dimensiones territoriales, culturales, organizativas, económicas y espirituales, articuladas
          desde la propia lógica comunitaria y en diálogo con el entorno institucional y social.
        </Typography>
      </Box>
    </Box>
  );
}

// ──────────────────────────────────────────────────────────
// Sección: Enlaces de Interés
// ──────────────────────────────────────────────────────────
function SeccionEnlaces() {
  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: CISP.verde_agua }} />
        <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: CISP.verde_agua }}>
          Enlaces de Interés
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {enlacesInteres.map((enlace) => {
          const color = colorCategoria[enlace.categoria] ?? CISP.verde_agua;
          return (
            <Grid key={enlace.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  border: `1px solid ${color}25`,
                  borderTop: `3px solid ${color}`,
                  transition: 'transform 0.18s, box-shadow 0.18s',
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: `0 8px 24px ${color}22` },
                }}
              >
                <CardActionArea
                  component="a"
                  href={enlace.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                >
                  <CardContent sx={{ flex: 1, width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Chip
                        label={enlace.categoria}
                        size="small"
                        sx={{ bgcolor: `${color}18`, color, fontWeight: 700, fontSize: '0.68rem' }}
                      />
                      <OpenInNewIcon sx={{ fontSize: 16, color, opacity: 0.6 }} />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5, lineHeight: 1.3 }}>
                      {enlace.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {enlace.descripcion}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

// ──────────────────────────────────────────────────────────
// Sección: Carrusel de Galería
// ──────────────────────────────────────────────────────────
function SeccionGaleria() {
  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: CISP.vino }} />
        <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: CISP.vino }}>
          Galería del Observatorio
        </Typography>
      </Box>
      <CarruselGaleria />
    </Box>
  );
}

// ──────────────────────────────────────────────────────────
// Sección: Accesos principales
// ──────────────────────────────────────────────────────────
function SeccionAccesos() {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: CISP.amarillo }} />
        <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>
          Accesos directos
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {accesos.map((acceso) => (
          <Grid key={acceso.titulo} size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                border: `1px solid ${acceso.color}30`,
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 32px ${acceso.color}30`,
                },
              }}
              onClick={() => navigate(acceso.path)}
            >
              {/* Franja de color superior */}
              <Box
                sx={{
                  height: 6,
                  background: `linear-gradient(90deg, ${acceso.color} 0%, ${acceso.color}aa 100%)`,
                }}
              />

              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  gap: 3,
                  p: 3,
                  background: `linear-gradient(135deg, ${acceso.color}08 0%, transparent 100%)`,
                }}
              >
                {/* Imaginario */}
                <Box
                  sx={{
                    width: { xs: 90, sm: 110 },
                    height: { xs: 90, sm: 110 },
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    bgcolor: `${acceso.color}12`,
                    border: `2px solid ${acceso.color}25`,
                  }}
                >
                  <Box
                    component="img"
                    src={acceso.imagen}
                    alt={acceso.titulo}
                    sx={{ width: '68%', opacity: 0.85 }}
                  />
                </Box>

                {/* Texto */}
                <Box sx={{ flex: 1 }}>
                  <Chip
                    label={acceso.etiqueta}
                    size="small"
                    sx={{ mb: 1, bgcolor: `${acceso.color}18`, color: acceso.color, fontWeight: 700, fontSize: '0.68rem' }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: acceso.color, mb: 1, lineHeight: 1.2 }}
                  >
                    {acceso.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                    {acceso.descripcion}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={(e) => { e.stopPropagation(); navigate(acceso.path); }}
                    sx={{
                      bgcolor: acceso.color,
                      '&:hover': { bgcolor: acceso.color, filter: 'brightness(0.9)' },
                      borderRadius: 2,
                      fontWeight: 700,
                      px: 2.5,
                    }}
                  >
                    Ir al módulo
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ──────────────────────────────────────────────────────────
// Página principal
// ──────────────────────────────────────────────────────────
export default function Home() {
  return (
    <Box>
      <SeccionContexto />
      <Divider sx={{ mb: 6 }} />
      <SeccionDefinicion />
      <Divider sx={{ mb: 6 }} />
      <SeccionEnlaces />
      <Divider sx={{ mb: 6 }} />
      <SeccionGaleria />
      <Divider sx={{ mb: 6 }} />
      <SeccionAccesos />
    </Box>
  );
}
