import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Button, Chip, Grid, Divider,
} from '@mui/material';
import ArrowBackIcon      from '@mui/icons-material/ArrowBack';
import LandscapeIcon      from '@mui/icons-material/Landscape';
import PictureAsPdfIcon   from '@mui/icons-material/PictureAsPdf';
import DownloadIcon       from '@mui/icons-material/Download';

import { TT }                    from '../../../../theme';
import { useIniciativaById }     from '../../../../utils/iniciativasStore';
import MapaRegionIniciativa      from '../../../../components/maps/MapaRegionIniciativa';

const galeriaModules = import.meta.glob(
  '../../../../assets/galeria/*.{png,jpg,jpeg,webp,PNG,JPG}',
  { eager: true }
);
const galeriaFotos = Object.values(galeriaModules).map((m) => m.default);

// Tarjeta de descarga PDF
function TarjetaPDF({ titulo, subtitulo, color, url }) {
  const disponible = Boolean(url);
  return (
    <Paper elevation={0} sx={{
      p: 2.5, borderRadius: 2.5,
      border: `1.5px solid ${color}25`,
      bgcolor: `${color}06`,
      display: 'flex', alignItems: 'center', gap: 2,
    }}>
      <Box sx={{
        width: 48, height: 48, borderRadius: 2,
        bgcolor: `${color}15`, border: `2px solid ${color}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <PictureAsPdfIcon sx={{ color, fontSize: 24 }} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 700, color, lineHeight: 1.2 }}>{titulo}</Typography>
        <Typography variant="caption" color="text.disabled">{subtitulo}</Typography>
      </Box>
      <Button
        size="small" variant="outlined"
        startIcon={disponible ? <DownloadIcon /> : undefined}
        disabled={!disponible}
        href={url || undefined} target="_blank" rel="noopener noreferrer"
        sx={{
          borderColor: color, color, borderRadius: 2, fontWeight: 700, flexShrink: 0,
          '&.Mui-disabled': { borderColor: `${color}30`, color: `${color}50` },
        }}
      >
        {disponible ? 'Descargar' : 'Próximamente'}
      </Button>
    </Paper>
  );
}

export default function TejiendoMiTerritorio() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const ini      = useIniciativaById(id);

  if (!ini) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography color="text.secondary">Iniciativa no encontrada</Typography>
      <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>Volver</Button>
    </Box>
  );

  const foto  = galeriaFotos[ini.imagenIndex] || null;
  const color = ini.colorPrimario;

  return (
    <Box>
      {/* Botón volver */}
      <Button startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/iniciativas-comunitarias/iniciativa/${id}`)}
        sx={{ mb: 2.5, color, fontWeight: 700, borderRadius: 2 }}>
        Volver a la Iniciativa
      </Button>

      {/* ── Banner ──────────────────────────────────────────── */}
      <Paper elevation={0} sx={{
        mb: 5, borderRadius: 3, overflow: 'hidden', position: 'relative',
        background: `linear-gradient(135deg, ${color}ee 0%, ${color}88 100%)`,
        minHeight: { xs: 140, md: 180 },
        display: 'flex', alignItems: 'stretch',
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
              <LandscapeIcon sx={{ color: '#fff', fontSize: 22 }} />
            </Box>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2,
              fontSize: { xs: '1.2rem', sm: '1.6rem', md: '1.9rem' } }}>
              Tejiendo mi Territorio
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.88)' }}>
            {ini.nombre} · {ini.comunidad} · {ini.departamento}
          </Typography>
        </Box>
      </Paper>

      {/* ── Mapa + Texto ─────────────────────────────────────── */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, minHeight: 28, borderRadius: 2, bgcolor: color, flexShrink: 0, mt: 0.5 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Ubicación Territorial
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              {ini.departamento} · Región {ini.region}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3} alignItems="flex-start">
          {/* Mapa */}
          <Grid size={{ xs: 12, md: 5 }}>
            <MapaRegionIniciativa
              departamento={ini.departamento}
              comunidad={ini.comunidad}
              color={color}
            />
          </Grid>

          {/* Texto detalle */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ pl: { md: 1 }, borderLeft: { md: `4px solid ${color}25` }, pl: { md: 3 } }}>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85, mb: 2 }}>
                El territorio del {ini.comunidad} se ubica en el departamento de {ini.departamento},
                en la región {ini.region} de Colombia. Este territorio constituye el espacio vital
                donde se desarrollan las prácticas culturales, espirituales y productivas que
                definen la identidad colectiva de la comunidad.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85, mb: 2 }}>
                La relación de la comunidad con su territorio es profunda e indisociable de su
                cosmovisión propia. Los municipios de {ini.municipios.slice(0, 3).join(', ')}
                {ini.municipios.length > 3 ? ' y otros' : ''} hacen parte del área de influencia
                del convenio, donde se implementan las acciones de la iniciativa.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
                En este territorio conviven los pueblos {ini.pueblos.join(', ')}, quienes
                comparten saberes, tradiciones y un profundo sentido de pertenencia al territorio
                ancestral que han habitado y cuidado durante generaciones.
              </Typography>

              {/* Chips de info */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2.5 }}>
                {ini.municipios.map((m) => (
                  <Chip key={m} label={m} size="small"
                    sx={{ bgcolor: `${color}10`, color, fontWeight: 600, fontSize: '0.68rem',
                      border: `1px solid ${color}25` }} />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* ── Realidades Territoriales ─────────────────────────── */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, minHeight: 28, borderRadius: 2, bgcolor: ini.colorSecundario, flexShrink: 0, mt: 0.5 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Realidades Territoriales
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              Diagnóstico y caracterización del territorio
            </Typography>
          </Box>
        </Box>

        <Paper elevation={0} sx={{
          p: { xs: 2.5, md: 3 }, borderRadius: 3, mb: 3,
          bgcolor: `${ini.colorSecundario}06`,
          borderLeft: `4px solid ${ini.colorSecundario}`,
        }}>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85, mb: 2 }}>
            Las realidades territoriales del {ini.comunidad} expresan la complejidad de un
            territorio vivo, en permanente tensión entre los procesos de desarrollo externos y
            la defensa del territorio ancestral. El diagnóstico participativo permitió identificar
            las principales problemáticas y potencialidades desde la propia perspectiva de la
            comunidad, articulando saberes ancestrales con análisis contemporáneos del territorio.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
            Este documento recoge la voz de los mayores, las mujeres, los jóvenes y los líderes
            comunitarios en torno a los desafíos que enfrenta el territorio: presiones externas
            sobre los recursos naturales, brechas en el acceso a servicios básicos y la necesidad
            urgente de fortalecer los mecanismos de gobierno propio que protejan la integridad
            territorial y cultural del pueblo.
          </Typography>
        </Paper>

        {/* PDF descargable */}
        <TarjetaPDF
          titulo="Realidades Territoriales — Documento diagnóstico"
          subtitulo="Caracterización del territorio y diagnóstico participativo"
          color={ini.colorSecundario}
          url={null}
        />
      </Box>
    </Box>
  );
}
