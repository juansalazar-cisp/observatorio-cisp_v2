import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Chip, Divider, Paper, Card, CardActionArea } from '@mui/material';
import ArrowBackIcon        from '@mui/icons-material/ArrowBack';
import AccountTreeIcon      from '@mui/icons-material/AccountTree';
import EditNoteIcon         from '@mui/icons-material/EditNote';
import LightbulbIcon        from '@mui/icons-material/Lightbulb';
import MenuBookIcon         from '@mui/icons-material/MenuBook';
import PictureAsPdfIcon     from '@mui/icons-material/PictureAsPdf';
import OpenInNewIcon        from '@mui/icons-material/OpenInNew';
import DownloadIcon         from '@mui/icons-material/Download';

import { useOrgData } from '../../../utils/orgData';
import fondo2         from '../../../assets/fondo2.png';
import imaginario1    from '../../../assets/imaginario1.png';

const regionLabel = { andina: 'Andina', caribe: 'Caribe', pacifica: 'Pacífica', amazonica: 'Amazónica', orinoquia: 'Orinoquía' };

function SeccionHeader({ icono, titulo, color }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: color, flexShrink: 0 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icono}
        <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>{titulo}</Typography>
      </Box>
    </Box>
  );
}

function TarjetaDescargaPdf({ icono, titulo, subtitulo, color }) {
  return (
    <Card elevation={0} sx={{ border: `1.5px solid ${color}30`, borderRadius: 2.5, opacity: 0.65, width: 150 }}>
      <CardActionArea disabled sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, textAlign: 'center' }}>
          <Box sx={{ width: 52, height: 52, borderRadius: 2, bgcolor: `${color}15`, border: `2px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icono}
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color, mb: 0.25, fontSize: '0.8rem' }}>{titulo}</Typography>
            <Typography variant="caption" color="text.disabled" sx={{ display: 'block', lineHeight: 1.3 }}>{subtitulo}</Typography>
          </Box>
          <Chip label="Próximamente" size="small" sx={{ fontSize: '0.65rem', height: 20, bgcolor: '#f5f5f5', color: 'text.disabled' }} />
        </Box>
      </CardActionArea>
    </Card>
  );
}

function SeccionConDescarga({ icono, titulo, descripcion, color }) {
  return (
    <Box sx={{ mb: 5 }}>
      <SeccionHeader icono={icono} titulo={titulo} color={color} />
      <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, border: `1px solid ${color}20`, borderRadius: 3, bgcolor: `${color}05`, borderLeft: `4px solid ${color}`, display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1, minWidth: 240 }}>
          <Chip label="Texto provisional" size="small" sx={{ mb: 1.5, bgcolor: `${color}15`, color, fontWeight: 600, fontSize: '0.65rem' }} />
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>{descripcion}</Typography>
        </Box>
        <TarjetaDescargaPdf icono={<PictureAsPdfIcon sx={{ color, fontSize: 24 }} />} titulo={titulo} subtitulo="Documento en PDF" color={color} />
      </Paper>
    </Box>
  );
}

export default function OrgMiPlanDeVida() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const org = useOrgData(slug);

  if (!org) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h5" color="text.secondary">Organización no encontrada</Typography>
      <Button onClick={() => navigate('/visualizacion')} sx={{ mt: 2 }}>Volver</Button>
    </Box>
  );

  const color = org.colores.primario;

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(`/org/${slug}`)} sx={{ mb: 3, color, fontWeight: 700 }}>
        Volver al Plan de Vida
      </Button>

      {/* Banner */}
      <Paper elevation={0} sx={{ mb: 5, px: { xs: 3, md: 4 }, py: 3.5, borderRadius: 3, overflow: 'hidden', background: `linear-gradient(135deg, ${color}ee 0%, ${org.colores.secundario}99 100%)`, position: 'relative' }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${fondo2})`, backgroundSize: 'cover', opacity: 0.1 }} />
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
          <Box component="img" src={imaginario1} alt="" sx={{ width: 60, opacity: 0.5, filter: 'brightness(10)', flexShrink: 0 }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Chip label={org.etiqueta} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.25)', color: '#fff', fontWeight: 700, fontSize: '0.7rem' }} />
              <Chip label={regionLabel[org.region]} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.7rem' }} />
            </Box>
            <Typography variant="h4" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: '#fff', lineHeight: 1.2, mb: 0.5 }}>Mi Plan de Vida</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', maxWidth: 600 }}>
              Instrumento de planificación y proyección del desarrollo propio de {org.etiqueta}.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Plan de vida final */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ width: 4, height: 32, borderRadius: 2, bgcolor: color }} />
          <Typography variant="h5" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>Plan de vida final</Typography>
        </Box>
        <TarjetaDescargaPdf
          icono={<MenuBookIcon sx={{ color, fontSize: 26 }} />}
          titulo={org.planDeVidaFinal?.nombre || 'Plan de vida final'}
          subtitulo="Documento completo en PDF"
          color={color}
          disponible={Boolean(org.planDeVidaFinal?.url)}
          href={org.planDeVidaFinal?.url || undefined}
        />
      </Box>

      <Divider sx={{ mb: 5 }} />

      <SeccionConDescarga
        icono={<AccountTreeIcon sx={{ color, fontSize: 22 }} />}
        titulo="Líneas de intervención"
        descripcion={`Las líneas de intervención del Plan de Vida de ${org.etiqueta} definen los ejes estratégicos de acción colectiva para el fortalecimiento del gobierno propio, la autonomía territorial y el bienestar integral de la comunidad. Cada línea articula objetivos, actividades y responsables desde una visión de largo plazo.`}
        color={color}
      />

      <Divider sx={{ mb: 5 }} />

      <SeccionConDescarga
        icono={<EditNoteIcon sx={{ color, fontSize: 22 }} />}
        titulo="Propuesta de formulación o actualización del Plan de Vida"
        descripcion={`Documento metodológico que recoge el proceso participativo de formulación o actualización del Plan de Vida de ${org.etiqueta}. Incluye el diagnóstico participativo, la visión de futuro construida colectivamente y las estrategias acordadas en los espacios de gobierno propio.`}
        color={color}
      />

      <Divider sx={{ mb: 5 }} />

      {/* Aplicativo de Innovación */}
      <Box sx={{ mb: 5 }}>
        <SeccionHeader icono={<LightbulbIcon sx={{ color, fontSize: 22 }} />} titulo="Aplicativo de Innovación" color={color} />
        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, border: `1px solid ${color}25`, borderRadius: 3, bgcolor: `${color}05`, display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box sx={{ flex: 1, minWidth: 240 }}>
            <Chip label="Conexión pendiente" size="small" sx={{ mb: 1.5, bgcolor: `${color}15`, color, fontWeight: 600, fontSize: '0.65rem' }} />
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
              Plataforma interactiva para el seguimiento en tiempo real de los compromisos del Plan de Vida de {org.etiqueta}. El enlace de acceso estará disponible próximamente.
            </Typography>
          </Box>
          <Box>
            <Button variant="outlined" size="large" endIcon={<OpenInNewIcon />} disabled
              sx={{ borderColor: `${color}40`, color, fontWeight: 700, borderRadius: 2, px: 3, '&.Mui-disabled': { borderColor: `${color}30`, color: `${color}55` } }}>
              Abrir aplicativo
            </Button>
            <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.75, textAlign: 'center' }}>Próximamente</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
