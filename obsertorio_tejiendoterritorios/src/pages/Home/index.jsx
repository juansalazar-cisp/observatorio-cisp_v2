import { Box, Typography, Paper, Grid, Chip, Divider } from '@mui/material';
import HandshakeIcon    from '@mui/icons-material/Handshake';
import TimelineIcon     from '@mui/icons-material/Timeline';
import GroupsIcon       from '@mui/icons-material/Groups';
import AutoStoriesIcon  from '@mui/icons-material/AutoStories';
import ForestIcon       from '@mui/icons-material/Forest';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate }  from 'react-router-dom';

import { TT }            from '../../theme';
import CarruselGaleria   from '../../components/common/CarruselGaleria';

import fondo1        from '../../assets/fondo1.png';
import fondo5        from '../../assets/fondo5.png';
import ilustracion1  from '../../assets/ilustracion1.png';
import ilustracion2  from '../../assets/ilustracion2.png';
import ilustracion3  from '../../assets/ilustracion3.png';
import ilustracion4  from '../../assets/ilustracion4.png';
import ilustracion5  from '../../assets/ilustracion5.png';
import ilustracion6  from '../../assets/ilustracion6.png';

// ── Tarjetas de acceso ──────────────────────────────────
const accesos = [
  {
    titulo:      'Sobre el Convenio',
    descripcion: 'Conoce los objetivos, la cobertura y los actores del convenio que hace posible este observatorio.',
    icono:       HandshakeIcon,
    color:       TT.verde,
    ilustracion: ilustracion3,
    path:        '/sobre-el-convenio',
  },
  {
    titulo:      'Tejiendo Trayectorias',
    descripcion: 'Seguimiento a los procesos y trayectorias organizativas de los pueblos indígenas del proyecto.',
    icono:       TimelineIcon,
    color:       TT.naranja,
    ilustracion: ilustracion4,
    path:        '/tejiendo-trayectorias',
  },
  {
    titulo:      'Iniciativas Comunitarias',
    descripcion: 'Registro, consulta y análisis de las iniciativas comunitarias activas en el territorio.',
    icono:       GroupsIcon,
    color:       TT.purpura,
    ilustracion: ilustracion5,
    path:        '/iniciativas-comunitarias',
  },
  {
    titulo:      'Índice de Cultura y Educación',
    descripcion: 'Indicadores culturales y educativos que evidencian la vitalidad de los pueblos indígenas.',
    icono:       AutoStoriesIcon,
    color:       TT.marino,
    ilustracion: ilustracion6,
    path:        '/indice-cultura-educacion',
  },
];

// ── Tipos de iniciativa ─────────────────────────────────
const iniciativas = [
  {
    titulo:      'Iniciativas de Acuerdo',
    icono:       HandshakeIcon,
    color:       TT.verde,
    ilustracion: ilustracion2,
    descripcion: 'Las iniciativas de acuerdo son procesos colectivos de concertación entre comunidades, organizaciones indígenas e instituciones, orientados a establecer compromisos y marcos de acción compartida para el fortalecimiento del gobierno propio y la defensa del territorio. Estas iniciativas articulan la palabra de los mayores, la visión de los jóvenes y las decisiones de las asambleas comunitarias en documentos vivos de planificación territorial.',
  },
  {
    titulo:      'Iniciativas de Fortalecimiento',
    icono:       ForestIcon,
    color:       TT.naranja,
    ilustracion: ilustracion1,
    descripcion: 'Las iniciativas de fortalecimiento son acciones concretas impulsadas desde las propias comunidades para fortalecer sus capacidades organizativas, culturales y productivas. Abarcan procesos de formación, recuperación de saberes ancestrales, dinamización de la economía propia y construcción de herramientas de planificación y seguimiento que respondan a los principios del buen vivir y la autonomía indígena.',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box>

      {/* ── Hero / Presentación ──────────────────────────── */}
      <Paper
        elevation={0}
        sx={{
          mb: 5, borderRadius: 4, overflow: 'hidden',
          position: 'relative',
          background: `linear-gradient(140deg, #0d3b2e 0%, #1a5c3a 60%, ${TT.verde}cc 100%)`,
          minHeight: { xs: 280, md: 340 },
          display: 'flex', alignItems: 'center',
        }}
      >
        {/* Textura de fondo */}
        <Box component="img" src={fondo1} alt="" aria-hidden="true"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.07 }} />

        {/* Banda tricolor superior */}
        <Box sx={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 5,
          background: `linear-gradient(90deg, ${TT.naranja} 0%, ${TT.verde} 50%, ${TT.purpura} 100%)`,
        }} />

        {/* Ilustración decorativa */}
        <Box component="img" src={ilustracion1} alt="" aria-hidden="true"
          sx={{
            position: 'absolute', right: { xs: -30, md: 40 }, bottom: 0,
            height: { xs: 180, md: 290 }, objectFit: 'contain', opacity: 0.2,
          }} />

        {/* Texto */}
        <Box sx={{ position: 'relative', zIndex: 1, px: { xs: 3, md: 5 }, py: { xs: 4, md: 5 }, maxWidth: 680 }}>
          <Chip
            label="Observatorio Tejiendo Territorios"
            size="small"
            sx={{ mb: 2, bgcolor: `${TT.naranja}30`, color: TT.crema, fontWeight: 700, fontSize: '0.68rem', border: `1px solid ${TT.naranja}50` }}
          />
          <Typography variant="h3"
            sx={{ color: '#fff', lineHeight: 1.15, mb: 2, fontSize: { xs: '1.7rem', md: '2.2rem' } }}>
            Presentación del Observatorio
          </Typography>
          <Typography variant="body1"
            sx={{ color: TT.crema, lineHeight: 1.85, opacity: 0.92, fontSize: { xs: '0.88rem', md: '0.95rem' } }}>
            Una herramienta estratégica que sugiere la recolección, consolidación, análisis y presentación de
            información territorial, organizacional y estratégica para orientar el fortalecimiento organizativo,
            el control interno y la articulación interinstitucional e intercultural para el desarrollo de los
            pueblos indígenas en Colombia. Su alcance está dirigido a evidenciar el desarrollo de iniciativas
            comunitarias, la producción, uso y gestión de la información, los diálogos horizontales y los
            procesos de acompañamiento en función de contribuir a la planeación, deliberación, incidencia y
            promoción de las comunidades indígenas en el país.
          </Typography>
        </Box>
      </Paper>

      {/* ── Qué es una Iniciativa ───────────────────────── */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, height: 32, borderRadius: 2, background: `linear-gradient(180deg, ${TT.verde} 0%, ${TT.naranja} 100%)` }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              ¿Qué es una Iniciativa?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dos tipos de iniciativas orientan el trabajo del observatorio
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2.5}>
          {iniciativas.map((ini) => {
            const Icon = ini.icono;
            return (
              <Grid key={ini.titulo} size={{ xs: 12, md: 6 }}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 3.5, overflow: 'hidden',
                    border: `1.5px solid ${ini.color}20`,
                    height: '100%', display: 'flex', flexDirection: 'column',
                  }}
                >
                  {/* Cabecera */}
                  <Box
                    sx={{
                      px: 3, py: 2.5, position: 'relative', overflow: 'hidden',
                      background: `linear-gradient(135deg, ${ini.color}dd 0%, ${ini.color}88 100%)`,
                      display: 'flex', alignItems: 'center', gap: 2,
                    }}
                  >
                    <Box component="img" src={ini.ilustracion} alt="" aria-hidden="true"
                      sx={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                        height: 70, objectFit: 'contain', opacity: 0.22 }} />

                    {/* Fondo de textura sutil */}
                    <Box component="img" src={fondo5} alt="" aria-hidden="true"
                      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.07 }} />

                    <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, position: 'relative', zIndex: 1 }}>
                      <Icon sx={{ color: '#fff', fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6"
                      sx={{ fontWeight: 700, color: '#fff', lineHeight: 1.2, position: 'relative', zIndex: 1 }}>
                      {ini.titulo}
                    </Typography>
                  </Box>

                  {/* Texto */}
                  <Box sx={{ p: 3, flex: 1 }}>
                    <Chip
                      label="Texto provisional"
                      size="small"
                      sx={{ mb: 1.5, bgcolor: `${ini.color}10`, color: ini.color, fontWeight: 600, fontSize: '0.62rem' }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.85 }}>
                      {ini.descripcion}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* ── Galería ──────────────────────────────────────── */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
          <Box sx={{ width: 5, height: 28, borderRadius: 2, bgcolor: TT.purpura }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Galería
          </Typography>
        </Box>
        <CarruselGaleria />
      </Box>

      <Divider sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          {[TT.naranja, TT.verde, TT.purpura, TT.marino].map((c) => (
            <Box key={c} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: c }} />
          ))}
        </Box>
      </Divider>

      {/* ── Tarjetas de acceso ───────────────────────────── */}
      <Box sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, height: 32, borderRadius: 2, background: `linear-gradient(180deg, ${TT.purpura} 0%, ${TT.naranja} 100%)` }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Explora el observatorio
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Accede a cada uno de los módulos de la plataforma
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2.5}>
          {accesos.map((ac) => {
            const Icon = ac.icono;
            return (
              <Grid key={ac.titulo} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Paper
                  elevation={0}
                  onClick={() => navigate(ac.path)}
                  sx={{
                    borderRadius: 3.5, overflow: 'hidden',
                    border: `1.5px solid ${ac.color}22`,
                    cursor: 'pointer', height: '100%',
                    display: 'flex', flexDirection: 'column',
                    transition: 'transform 0.18s, box-shadow 0.18s',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: `0 14px 36px ${ac.color}22`,
                    },
                  }}
                >
                  {/* Cabecera con ilustración */}
                  <Box
                    sx={{
                      height: 110, position: 'relative', overflow: 'hidden',
                      background: `linear-gradient(135deg, ${ac.color}ee 0%, ${ac.color}88 100%)`,
                    }}
                  >
                    <Box component="img" src={ac.ilustracion} alt="" aria-hidden="true"
                      sx={{ position: 'absolute', right: -5, bottom: -8,
                        height: 95, objectFit: 'contain', opacity: 0.28 }} />
                    <Box
                      sx={{
                        position: 'absolute', bottom: 12, left: 16,
                        width: 42, height: 42, borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ color: '#fff', fontSize: 22 }} />
                    </Box>
                  </Box>

                  {/* Contenido */}
                  <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle1"
                      sx={{ fontWeight: 700, color: ac.color, lineHeight: 1.2, mb: 0.75 }}>
                      {ac.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary"
                      sx={{ lineHeight: 1.7, flex: 1, fontSize: '0.8rem', mb: 1.5 }}>
                      {ac.descripcion}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: ac.color }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.7rem' }}>
                        Explorar
                      </Typography>
                      <ArrowForwardIcon sx={{ fontSize: 14 }} />
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
