import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Button, Chip, Grid, Divider, LinearProgress,
} from '@mui/material';
import ArrowBackIcon    from '@mui/icons-material/ArrowBack';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon     from '@mui/icons-material/Download';
import BarChartIcon     from '@mui/icons-material/BarChart';
import RouteIcon        from '@mui/icons-material/Route';

import { TT }                from '../../../../theme';
import { useIniciativaById } from '../../../../utils/iniciativasStore';

const galeriaModules = import.meta.glob(
  '../../../../assets/galeria/*.{png,jpg,jpeg,webp,PNG,JPG}',
  { eager: true }
);
const galeriaFotos = Object.values(galeriaModules).map((m) => m.default);

// Tarjeta PDF reutilizable
function TarjetaPDF({ titulo, subtitulo, color, url }) {
  const disponible = Boolean(url);
  return (
    <Paper elevation={0} sx={{
      p: 2.5, borderRadius: 2.5, border: `1.5px solid ${color}25`, bgcolor: `${color}06`,
      display: 'flex', alignItems: 'center', gap: 2,
    }}>
      <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: `${color}15`, border: `2px solid ${color}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <PictureAsPdfIcon sx={{ color, fontSize: 24 }} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 700, color, lineHeight: 1.2 }}>{titulo}</Typography>
        <Typography variant="caption" color="text.disabled">{subtitulo}</Typography>
      </Box>
      <Button size="small" variant="outlined"
        startIcon={disponible ? <DownloadIcon /> : undefined}
        disabled={!disponible} href={url || undefined} target="_blank" rel="noopener noreferrer"
        sx={{
          borderColor: color, color, borderRadius: 2, fontWeight: 700, flexShrink: 0,
          '&.Mui-disabled': { borderColor: `${color}30`, color: `${color}50` },
        }}>
        {disponible ? 'Descargar' : 'Próximamente'}
      </Button>
    </Paper>
  );
}

// Barra de progreso con etiqueta
function BarraIndicador({ etiqueta, valor, color }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.82rem' }}>
          {etiqueta}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700, color, fontSize: '0.82rem' }}>
          {valor}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={valor}
        sx={{
          height: 8, borderRadius: 4,
          bgcolor: `${color}18`,
          '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 4 },
        }}
      />
    </Box>
  );
}

// Datos placeholder del dashboard — reemplazar con data real
const indicadoresMemoria = [
  { etiqueta: 'Relatos y testimonios recopilados',   valor: 68 },
  { etiqueta: 'Prácticas culturales documentadas',   valor: 55 },
  { etiqueta: 'Archivos digitalizados',              valor: 42 },
  { etiqueta: 'Eventos de memoria realizados',       valor: 80 },
  { etiqueta: 'Participantes en procesos de memoria',valor: 73 },
];

const resumenCards = [
  { etiqueta: 'Relatos recopilados', valor: '34', unidad: 'testimonios' },
  { etiqueta: 'Documentos digitalizados', valor: '127', unidad: 'archivos' },
  { etiqueta: 'Eventos de memoria', valor: '8', unidad: 'encuentros' },
  { etiqueta: 'Participantes', valor: '215', unidad: 'personas' },
];

export default function TejiendoMiMemoria() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const ini      = useIniciativaById(id);

  if (!ini) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography color="text.secondary">Iniciativa no encontrada</Typography>
      <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>Volver</Button>
    </Box>
  );

  const foto      = galeriaFotos[ini.imagenIndex] || null;
  const colorMod  = '#7A3E9D';   // color fijo del módulo Memoria

  return (
    <Box>
      {/* Botón volver */}
      <Button startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/iniciativas-comunitarias/iniciativa/${id}`)}
        sx={{ mb: 2.5, color: colorMod, fontWeight: 700, borderRadius: 2 }}>
        Volver a la Iniciativa
      </Button>

      {/* ── Banner ─────────────────────────────────────────── */}
      <Paper elevation={0} sx={{
        mb: 5, borderRadius: 3, overflow: 'hidden', position: 'relative',
        background: `linear-gradient(135deg, ${colorMod}ee 0%, ${colorMod}88 100%)`,
        minHeight: { xs: 140, md: 180 }, display: 'flex', alignItems: 'stretch',
      }}>
        {foto && (
          <Box component="img" src={foto} alt=""
            sx={{ width: { xs: 110, sm: 160, md: 210 }, flexShrink: 0, objectFit: 'cover', opacity: 0.75 }} />
        )}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(90deg, ${TT.naranja} 0%, ${TT.verde} 50%, ${TT.purpura} 100%)` }} />
        <Box sx={{ flex: 1, px: { xs: 2.5, md: 4 }, py: 3, position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <PhotoLibraryIcon sx={{ color: '#fff', fontSize: 22 }} />
            </Box>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2,
              fontSize: { xs: '1.2rem', sm: '1.6rem', md: '1.9rem' } }}>
              Tejiendo mi Memoria
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.88)' }}>
            {ini.nombre} · {ini.comunidad}
          </Typography>
        </Box>
      </Paper>

      {/* ── 1. La memoria como eje estructurante ────────────── */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, minHeight: 28, borderRadius: 2, bgcolor: colorMod, flexShrink: 0, mt: 0.5 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              La Memoria como Eje Estructurante del Territorio
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              Importancia de la memoria para la identidad y el territorio
            </Typography>
          </Box>
        </Box>

        <Paper elevation={0} sx={{
          p: { xs: 2.5, md: 3 }, mb: 3, borderRadius: 3,
          bgcolor: `${colorMod}06`, borderLeft: `4px solid ${colorMod}`,
        }}>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85, mb: 2 }}>
            La memoria colectiva del {ini.comunidad} no es un simple registro del pasado: es el eje que
            articula la identidad, orienta el presente y proyecta el futuro del pueblo. A través de la
            transmisión oral de los mayores, los rituales, los cantos y las prácticas cotidianas, la
            comunidad mantiene viva una memoria que es, al mismo tiempo, resistencia, pedagogía y
            proyecto político de vida.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85, mb: 2 }}>
            En el contexto del territorio ancestral, la memoria cumple una función estructurante:
            permite a la comunidad entender su relación con la tierra, con los seres del agua y el monte,
            y con los principios del gobierno propio que han guiado la vida comunitaria durante generaciones.
            Sin memoria, el territorio pierde su sentido y la identidad cultural se fragmenta.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
            Este módulo recoge los procesos de sistematización de la memoria comunitaria realizados
            en el marco de la iniciativa, integrando metodologías participativas con el enfoque
            del buen vivir propio del {ini.comunidad}.
          </Typography>
        </Paper>

        <TarjetaPDF
          titulo="La Memoria como Eje Estructurante"
          subtitulo="Documento de análisis y sistematización"
          color={colorMod}
          url={null}
        />
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* ── 2. Dashboard — Cómo gestiono mi memoria ─────────── */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, minHeight: 28, borderRadius: 2, bgcolor: TT.naranja, flexShrink: 0, mt: 0.5 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              ¿Cómo Gestiono mi Territorio y mi Memoria?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              Indicadores de avance en gestión de la memoria comunitaria — datos preliminares
            </Typography>
          </Box>
        </Box>

        {/* Tarjetas KPI */}
        <Grid container spacing={2} sx={{ mb: 3.5 }}>
          {resumenCards.map((card) => (
            <Grid key={card.etiqueta} size={{ xs: 6, sm: 3 }}>
              <Paper elevation={0} sx={{
                p: 2, borderRadius: 3, textAlign: 'center',
                border: `1.5px solid ${TT.naranja}20`, bgcolor: `${TT.naranja}06`,
              }}>
                <Typography sx={{ fontWeight: 800, color: TT.naranja, fontSize: '1.8rem', lineHeight: 1 }}>
                  {card.valor}
                </Typography>
                <Typography variant="caption" sx={{ color: TT.naranja, fontWeight: 600, display: 'block', mb: 0.25 }}>
                  {card.unidad}
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.65rem', lineHeight: 1.3 }}>
                  {card.etiqueta}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Gráfico de barras horizontal (placeholder con data real pendiente) */}
        <Paper elevation={0} sx={{
          p: { xs: 2.5, md: 3 }, borderRadius: 3,
          border: `1px solid ${TT.naranja}20`, bgcolor: '#fafaf7',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <BarChartIcon sx={{ color: TT.naranja, fontSize: 22 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Avance por componente de memoria
            </Typography>
            <Chip label="Datos preliminares" size="small"
              sx={{ ml: 'auto', bgcolor: `${TT.naranja}12`, color: TT.naranja, fontWeight: 600, fontSize: '0.62rem' }} />
          </Box>
          {indicadoresMemoria.map((ind) => (
            <BarraIndicador
              key={ind.etiqueta}
              etiqueta={ind.etiqueta}
              valor={ind.valor}
              color={TT.naranja}
            />
          ))}
          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 1.5, fontSize: '0.65rem' }}>
            Los porcentajes corresponden al avance respecto a la meta definida por la comunidad.
            Se actualizarán con la data real del proceso.
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* ── 3. El camino a transitar ─────────────────────────── */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, minHeight: 28, borderRadius: 2, bgcolor: TT.verde, flexShrink: 0, mt: 0.5 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              El Camino a Transitar
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              Ruta de mejora para la gestión de la memoria comunitaria
            </Typography>
          </Box>
        </Box>

        <Paper elevation={0} sx={{
          p: { xs: 2.5, md: 3 }, mb: 3, borderRadius: 3,
          display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'flex-start',
          bgcolor: `${TT.verde}06`, borderLeft: `4px solid ${TT.verde}`,
        }}>
          <Box sx={{ flex: 1, minWidth: 240 }}>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85, mb: 2 }}>
              La ruta de mejora en gestión de la memoria define los pasos concretos que la comunidad
              se propone recorrer para fortalecer sus procesos de documentación, preservación y
              transmisión del patrimonio inmaterial. Parte del reconocimiento de los avances ya
              alcanzados y traza un horizonte realista de acción colectiva.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
              Cada paso contempla responsables comunitarios, recursos necesarios y mecanismos de
              seguimiento acordados en minga. La ruta integra tanto los saberes ancestrales de los
              mayores como las herramientas digitales disponibles para la preservación contemporánea
              de la memoria del {ini.comunidad}.
            </Typography>
          </Box>

          {/* Tarjeta de descarga */}
          <Box sx={{ flexShrink: 0, width: { xs: '100%', sm: 200 } }}>
            <Paper elevation={0} sx={{
              border: `1.5px solid ${TT.verde}25`, borderRadius: 2.5,
            }}>
              <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, textAlign: 'center' }}>
                <Box sx={{ width: 52, height: 52, borderRadius: 2, bgcolor: `${TT.verde}15`,
                  border: `2px solid ${TT.verde}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <RouteIcon sx={{ color: TT.verde, fontSize: 26 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TT.verde, mb: 0.25 }}>
                    Ruta de mejora
                  </Typography>
                  <Typography variant="caption" color="text.disabled" sx={{ display: 'block', lineHeight: 1.3 }}>
                    Documento en PDF
                  </Typography>
                </Box>
                <Chip label="Próximamente" size="small"
                  sx={{ fontSize: '0.65rem', height: 20, bgcolor: '#f5f5f5', color: 'text.disabled' }} />
              </Box>
            </Paper>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
