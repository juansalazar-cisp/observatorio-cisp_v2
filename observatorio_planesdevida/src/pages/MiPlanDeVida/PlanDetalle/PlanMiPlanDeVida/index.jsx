import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Chip, Divider, Paper, Grid, Card, CardActionArea,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { CISP } from '../../../../theme';
import { useOrgById } from '../../../../utils/orgData';
import fondo2 from '../../../../assets/fondo2.png';
import imaginario1 from '../../../../assets/imaginario1.png';

const MODULO_COLOR = CISP.amarillo;

const regionColor = {
  andina:    CISP.verde_agua,
  caribe:    CISP.amarillo,
  pacifica:  CISP.rojo,
  amazonica: CISP.verde,
  orinoquia: CISP.vino,
};

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

function TarjetaDescarga({ icono, titulo, subtitulo, disponible = false, href }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: `1.5px solid ${MODULO_COLOR}30`,
        borderRadius: 2.5,
        opacity: disponible ? 1 : 0.65,
        transition: 'transform 0.18s, box-shadow 0.18s',
        ...(disponible && {
          '&:hover': { transform: 'translateY(-3px)', boxShadow: `0 8px 24px ${MODULO_COLOR}30` },
        }),
      }}
    >
      <CardActionArea
        disabled={!disponible}
        component={disponible ? 'a' : 'div'}
        href={disponible ? href : undefined}
        target={disponible ? '_blank' : undefined}
        rel="noopener noreferrer"
        sx={{ p: 2.5 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, textAlign: 'center' }}>
          <Box
            sx={{
              width: 56, height: 56, borderRadius: 2,
              bgcolor: `${MODULO_COLOR}18`, border: `2px solid ${MODULO_COLOR}30`,
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
              bgcolor: disponible ? `${MODULO_COLOR}18` : '#f5f5f5',
              color: disponible ? MODULO_COLOR : 'text.disabled',
            }}
          />
        </Box>
      </CardActionArea>
    </Card>
  );
}

function SeccionConDescarga({ icono, titulo, descripcion, tituloDescarga, subtituloDescarga }) {
  return (
    <Box sx={{ mb: 5 }}>
      <SeccionHeader icono={icono} titulo={titulo} />
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          border: `1px solid ${MODULO_COLOR}20`,
          borderRadius: 3,
          bgcolor: `${MODULO_COLOR}05`,
          borderLeft: `4px solid ${MODULO_COLOR}`,
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{ flex: 1, minWidth: 240 }}>
          <Chip
            label="Texto provisional"
            size="small"
            sx={{ mb: 1.5, bgcolor: `${MODULO_COLOR}15`, color: MODULO_COLOR, fontWeight: 600, fontSize: '0.65rem' }}
          />
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
            {descripcion}
          </Typography>
        </Box>
        <Box sx={{ flexShrink: 0, width: 140 }}>
          <TarjetaDescarga
            icono={<PictureAsPdfIcon sx={{ color: MODULO_COLOR, fontSize: 26 }} />}
            titulo={tituloDescarga}
            subtitulo={subtituloDescarga}
            disponible={false}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default function PlanMiPlanDeVida() {
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

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/mi-plan-de-vida/plan/${plan.id}`)}
        sx={{ mb: 3, color: MODULO_COLOR, fontWeight: 700 }}
      >
        Volver al Plan de Vida
      </Button>

      {/* Banner */}
      <Paper
        elevation={0}
        sx={{
          mb: 5, px: { xs: 3, md: 4 }, py: 3.5,
          borderRadius: 3, overflow: 'hidden',
          background: `linear-gradient(135deg, ${MODULO_COLOR}ee 0%, ${MODULO_COLOR}99 100%)`,
          position: 'relative',
        }}
      >
        <Box
          sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${fondo2})`, backgroundSize: 'cover', opacity: 0.1 }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
          <Box component="img" src={imaginario1} alt="" sx={{ width: 60, opacity: 0.5, filter: 'brightness(10)', flexShrink: 0 }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Chip label={`Pueblo ${plan.pueblo}`} size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.3)', color: '#333', fontWeight: 700, fontSize: '0.7rem' }} />
              <Chip label={plan.departamento} size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#444', fontSize: '0.7rem' }} />
            </Box>
            <Typography variant="h4"
              sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: '#2d2d2d', lineHeight: 1.2, mb: 0.5 }}>
              Mi Plan de Vida
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)', maxWidth: 600 }}>
              Instrumento de planificación, orientación y proyección del desarrollo propio del Pueblo {plan.pueblo}.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Plan de vida final — destacado al inicio */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: MODULO_COLOR }} />
          <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>
            Plan de vida final
          </Typography>
        </Box>
        <Box sx={{ maxWidth: 200 }}>
          <TarjetaDescarga
            icono={<MenuBookIcon sx={{ color: MODULO_COLOR, fontSize: 28 }} />}
            titulo="Plan de vida final"
            subtitulo="Documento completo en PDF"
            disponible={false}
          />
        </Box>
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* Líneas de intervención */}
      <SeccionConDescarga
        icono={<AccountTreeIcon sx={{ color: MODULO_COLOR, fontSize: 22 }} />}
        titulo="Líneas de intervención"
        descripcion="Las líneas de intervención del Plan de Vida del Pueblo Nasa definen los ejes estratégicos de acción colectiva para el fortalecimiento del gobierno propio, la autonomía territorial, la economía comunitaria y el bienestar integral. Cada línea articula objetivos, actividades y responsables desde una visión de largo plazo orientada por los principios del Nasa Kiwe."
        tituloDescarga="Líneas de intervención"
        subtituloDescarga="Documento en PDF"
      />

      <Divider sx={{ mb: 5 }} />

      {/* Propuesta de formulación */}
      <SeccionConDescarga
        icono={<EditNoteIcon sx={{ color: MODULO_COLOR, fontSize: 22 }} />}
        titulo="Propuesta de formulación o actualización del Plan de Vida"
        descripcion="Documento metodológico que recoge el proceso participativo de formulación o actualización del Plan de Vida de la comunidad. Incluye el diagnóstico participativo, la visión de futuro construida colectivamente, las estrategias y las metas de mediano y largo plazo acordadas en las mingas de pensamiento y en los espacios de gobierno propio."
        tituloDescarga="Propuesta de formulación"
        subtituloDescarga="Documento en PDF"
      />

      <Divider sx={{ mb: 5 }} />

      {/* Aplicativo de Innovación */}
      <Box sx={{ mb: 5 }}>
        <SeccionHeader
          icono={<LightbulbIcon sx={{ color: MODULO_COLOR, fontSize: 22 }} />}
          titulo="Aplicativo de Innovación"
          descripcion="Herramienta digital para el seguimiento, análisis y actualización participativa del Plan de Vida"
        />
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            border: `1px solid ${MODULO_COLOR}25`,
            borderRadius: 3,
            bgcolor: `${MODULO_COLOR}05`,
            display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center',
          }}
        >
          <Box sx={{ flex: 1, minWidth: 240 }}>
            <Chip
              label="Conexión pendiente"
              size="small"
              sx={{ mb: 1.5, bgcolor: `${MODULO_COLOR}15`, color: MODULO_COLOR, fontWeight: 600, fontSize: '0.65rem' }}
            />
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
              El aplicativo de innovación es una plataforma interactiva que permite a la comunidad hacer seguimiento en tiempo real a los compromisos del Plan de Vida, registrar avances y generar reportes de gestión desde el territorio. El enlace de acceso estará disponible próximamente.
            </Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              size="large"
              endIcon={<OpenInNewIcon />}
              disabled
              sx={{
                borderColor: MODULO_COLOR, color: MODULO_COLOR, fontWeight: 700,
                borderRadius: 2, px: 3,
                '&.Mui-disabled': { borderColor: `${MODULO_COLOR}40`, color: `${MODULO_COLOR}60` },
              }}
            >
              Abrir aplicativo
            </Button>
            <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.75, textAlign: 'center' }}>
              Próximamente
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
