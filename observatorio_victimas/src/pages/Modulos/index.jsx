import { Box, Typography, Paper, Grid, Chip } from '@mui/material';
import { useNavigate }  from 'react-router-dom';

import { OV } from '../../theme';
import BotonVolver from '../../components/BotonVolver';
import iconoColombia  from '../../assets/icono_colombia.png';
import iconoFlecha2   from '../../assets/icono_flecha2.png';
import iconoComunidad from '../../assets/icono_comunidad.png';
import iconoReunion   from '../../assets/icono_reunion.png';
import iconoPin       from '../../assets/icono_pin_georeferencia.png';
import iconoEngranaje from '../../assets/icono_engranaje.png';

const modulos = [
  {
    num: '01',
    titulo: 'Radiografía del Acceso',
    descripcion: 'Mapa por departamentos con cantidad de víctimas, hechos victimizantes y estado de reclamación. Resalta con color los hechos para reparación vía administrativa con iconos y popups explicativos.',
    icono: iconoColombia,
    color: OV.rojo,
    path: '/modulos/radiografia-acceso',
    tags: ['Mapa interactivo', 'Hechos victimizantes', 'Departamentos'],
  },
  {
    num: '02',
    titulo: 'Barreras desde el Territorio',
    descripcion: 'Tarjetas explicativas de barreras geográficas, administrativas, sociales y de información. Dashboard dinámico con el comportamiento de estas barreras en los departamentos.',
    icono: iconoComunidad,
    color: OV.rojoOscuro,
    path: '/modulos/barreras-territorio',
    tags: ['Barreras', 'Dashboard', 'Territorial'],
  },
  {
    num: '03',
    titulo: 'La Mirada desde las Víctimas',
    descripcion: 'Dashboard con información sobre las barreras y el proceso de reparación desde la perspectiva directa de las víctimas: percepciones, experiencias y valoraciones.',
    icono: iconoReunion,
    color: OV.amarilloOsc,
    path: '/modulos/mirada-victimas',
    tags: ['Perspectiva víctimas', 'Percepciones', 'Dashboard'],
  },
  {
    num: '04',
    titulo: 'Trayectorias de Contactabilidad y Localización',
    descripcion: 'Análisis de las trayectorias de contactabilidad y localización de víctimas: qué canales funcionan y cuáles son los obstáculos para establecer comunicación.',
    icono: iconoPin,
    color: OV.grisOscuro,
    path: '/modulos/trayectorias-contactabilidad',
    tags: ['Contactabilidad', 'Localización', 'Trayectorias'],
  },
  {
    num: '05',
    titulo: 'Dinámicas Operativas Territoriales',
    descripcion: 'Análisis de las dinámicas operativas institucionales en los territorios: capacidad de atención, cobertura de puntos de servicio y flujos del proceso de reparación.',
    icono: iconoEngranaje,
    color: OV.rojo,
    path: '/modulos/dinamicas-operativas',
    tags: ['Operativo', 'Institucional', 'Territorio'],
  },
];

export default function Modulos() {
  const navigate = useNavigate();

  return (
    <Box>
      <BotonVolver to="/" />
      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Chip label="Análisis por departamento" size="small"
          sx={{ mb: 1.5, bgcolor: `${OV.grisOscuro}10`, color: OV.grisOscuro, fontWeight: 700 }} />
        <Typography variant="h4" sx={{ fontWeight: 700, color: OV.grisOscuro, mb: 1 }}>
          Módulos de Análisis
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680, lineHeight: 1.8 }}>
          Cinco módulos con gráficos, mapas e indicadores por departamento para visualizar el estado
          del acceso a la reparación administrativa en todo el territorio nacional.
        </Typography>
      </Box>

      {/* ── Listado de módulos ────────────────────────── */}
      <Grid container spacing={3}>
        {modulos.map((mod) => (
          <Grid key={mod.num} size={{ xs: 12 }}>
            <Paper
              elevation={0}
              onClick={() => navigate(mod.path)}
              sx={{
                borderRadius: 3, overflow: 'hidden',
                border: `1.5px solid ${mod.color}22`,
                cursor: 'pointer', height: '100%',
                display: 'flex', flexDirection: 'column',
                transition: 'transform 0.18s, box-shadow 0.18s',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 12px 32px ${mod.color}22` },
              }}
            >
              {/* Cabecera */}
              <Box sx={{
                px: 3, py: 2.5,
                bgcolor: mod.color,
                display: 'flex', alignItems: 'center', gap: 2, position: 'relative', overflow: 'hidden',
              }}>
                {/* Número decorativo */}
                <Typography variant="h2"
                  sx={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,0.12)',
                    lineHeight: 1, position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}>
                  {mod.num}
                </Typography>

                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Box component="img" src={mod.icono} alt=""
                    sx={{ width: 30, height: 30, objectFit: 'contain',
                      filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.65)', fontWeight: 600, display: 'block' }}>
                    Módulo {mod.num}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                    {mod.titulo}
                  </Typography>
                </Box>

                {/* Franja amarilla si el módulo es rojo */}
                {(mod.color === OV.rojo || mod.color === OV.rojoOscuro) && (
                  <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, bgcolor: OV.amarillo }} />
                )}
              </Box>

              {/* Contenido */}
              <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" color="text.secondary"
                  sx={{ lineHeight: 1.8, flex: 1, mb: 2 }}>
                  {mod.descripcion}
                </Typography>

                <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 2 }}>
                  {mod.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small"
                      sx={{ bgcolor: `${mod.color}10`, color: mod.color, fontWeight: 700, fontSize: '0.62rem' }} />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: mod.color }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, fontSize: '0.72rem' }}>
                    Explorar módulo
                  </Typography>
                  <Box component="img" src={iconoFlecha2} alt=""
                    sx={{ width: 14, height: 14, objectFit: 'contain' }} />
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
