import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Grid, Chip, Divider, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction,
} from '@mui/material';
import HandshakeIcon      from '@mui/icons-material/Handshake';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PublicIcon         from '@mui/icons-material/Public';
import HelpOutlineIcon    from '@mui/icons-material/Help';
import AssessmentIcon     from '@mui/icons-material/Assessment';
import FolderOpenIcon     from '@mui/icons-material/FolderOpen';
import CloseIcon          from '@mui/icons-material/Close';
import PictureAsPdfIcon   from '@mui/icons-material/PictureAsPdf';
import OpenInNewIcon      from '@mui/icons-material/OpenInNew';
import DownloadIcon       from '@mui/icons-material/Download';
import ArrowBackIcon      from '@mui/icons-material/ArrowBack';

import { TT }            from '../../theme';
import VideoPlaceholder  from '../../components/common/VideoPlaceholder';
import documentosConvenio from '../../data/documentosConvenio';
import fondo1            from '../../assets/fondo1.png';
import ilustracion7      from '../../assets/ilustracion7.png';

// ── Colores por categoría de documento ───────────────────
const categoriaColor = {
  'Convenio':     { bg: '#EFF6FF', color: '#1D4ED8' },
  'Planificación':{ bg: '#F0FDF4', color: '#166534' },
  'Diagnóstico':  { bg: '#FFF7ED', color: '#9A3412' },
  'Normativo':    { bg: '#FDF4FF', color: '#7E22CE' },
  'Metodología':  { bg: '#F0FDFA', color: '#0F766E' },
};

// ── Encabezado de sección reutilizable ───────────────────
function SeccionHeader({ icono, titulo, descripcion, color }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
      <Box sx={{ width: 5, minHeight: 32, borderRadius: 2, bgcolor: color, flexShrink: 0, mt: 0.5 }} />
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {icono}
          <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{titulo}</Typography>
        </Box>
        {descripcion && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{descripcion}</Typography>
        )}
      </Box>
    </Box>
  );
}

// ── Dialog genérico con texto + PDF ──────────────────────
function DialogTextoPDF({ open, onClose, titulo, color, icono, texto, pdfUrl, pdfNombre }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: `${color}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {icono}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, flex: 1, lineHeight: 1.2 }}>{titulo}</Typography>
          <IconButton size="small" onClick={onClose} sx={{ color: 'text.disabled' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ pt: 2.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.85, mb: 3 }}>
          {texto}
        </Typography>
        {/* Tarjeta de descarga PDF */}
        <Paper
          elevation={0}
          sx={{
            p: 2, borderRadius: 2,
            border: `1.5px solid ${color}25`,
            bgcolor: `${color}06`,
            display: 'flex', alignItems: 'center', gap: 2,
          }}
        >
          <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: `${color}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <PictureAsPdfIcon sx={{ color, fontSize: 24 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color, lineHeight: 1.2 }}>
              {pdfNombre || titulo}
            </Typography>
            <Typography variant="caption" color="text.disabled">Documento PDF</Typography>
          </Box>
          <Button
            size="small"
            variant="outlined"
            startIcon={pdfUrl ? <DownloadIcon /> : undefined}
            disabled={!pdfUrl}
            href={pdfUrl || undefined}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              borderColor: color, color, borderRadius: 2, fontWeight: 700, flexShrink: 0,
              '&.Mui-disabled': { borderColor: `${color}30`, color: `${color}50` },
            }}
          >
            {pdfUrl ? 'Descargar' : 'Próximamente'}
          </Button>
        </Paper>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} sx={{ borderRadius: 2, color: 'text.secondary' }}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Dialog Documentos de Interés ─────────────────────────
function DialogDocumentos({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: `${TT.marino}12`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FolderOpenIcon sx={{ color: TT.marino, fontSize: 20 }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>Documentos de Interés</Typography>
          <IconButton size="small" onClick={onClose} sx={{ color: 'text.disabled' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ pt: 2, px: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.75, px: 1 }}>
          Colección de documentos de referencia relacionados con el convenio, el marco normativo y
          los procesos de acompañamiento territorial.
        </Typography>
        <List disablePadding>
          {documentosConvenio.map((doc, index) => {
            const cat       = categoriaColor[doc.categoria] || { bg: '#f5f5f5', color: '#555' };
            const disponible = Boolean(doc.url);
            return (
              <ListItem
                key={doc.id}
                divider={index < documentosConvenio.length - 1}
                sx={{
                  px: 1.5, py: 1.75, borderRadius: 2,
                  opacity: disponible ? 1 : 0.75,
                  '&:hover': { bgcolor: `${TT.naranja}06` },
                  alignItems: 'flex-start',
                }}
              >
                <ListItemIcon sx={{ minWidth: 38, mt: 0.25 }}>
                  <PictureAsPdfIcon sx={{ color: disponible ? TT.naranja : 'text.disabled', fontSize: 22 }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 0.4 }}>
                      {doc.titulo}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="caption" color="text.secondary"
                        sx={{ display: 'block', lineHeight: 1.5, mb: 0.5 }}>
                        {doc.descripcion}
                      </Typography>
                      <Chip
                        label={doc.categoria}
                        size="small"
                        sx={{ height: 18, fontSize: '0.6rem', fontWeight: 600, bgcolor: cat.bg, color: cat.color }}
                      />
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    size="small"
                    href={doc.url || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    disabled={!disponible}
                    title={disponible ? 'Abrir documento' : 'Próximamente'}
                    sx={{ color: TT.naranja, '&.Mui-disabled': { color: 'text.disabled' } }}
                  >
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 1.5, px: 1, fontSize: '0.65rem' }}>
          Para agregar o editar documentos, actualiza el archivo src/data/documentosConvenio.js
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} sx={{ borderRadius: 2, color: 'text.secondary' }}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Página principal ──────────────────────────────────────
export default function SobreElConvenio() {
  const [dialog, setDialog] = useState(null);
  const navigate = useNavigate();

  return (
    <Box>
      {/* Botón volver */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2.5, color: TT.verde, fontWeight: 700, borderRadius: 2 }}
      >
        Volver
      </Button>

      {/* Banner */}
      <Paper
        elevation={0}
        sx={{
          mb: 5, px: { xs: 3, md: 4 }, py: 3.5,
          borderRadius: 3, overflow: 'hidden', position: 'relative',
          background: `linear-gradient(135deg, ${TT.verde}ee 0%, ${TT.verde}88 100%)`,
        }}
      >
        <Box component="img" src={fondo1} alt="" aria-hidden="true"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.08 }} />
        <Box component="img" src={ilustracion7} alt="" aria-hidden="true"
          sx={{ position: 'absolute', right: 24, bottom: -8, height: 120, objectFit: 'contain', opacity: 0.22 }} />
        <Box
          sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4,
            background: `linear-gradient(90deg, ${TT.naranja} 0%, ${TT.verde} 50%, ${TT.purpura} 100%)` }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
            Sobre el Convenio
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.88)' }}>
            Información institucional, actores y marco del convenio
          </Typography>
        </Box>
      </Paper>

      {/* ── 1. Características del Convenio ─────────────── */}
      {/* Layout: video izquierda · texto derecha */}
      <Box sx={{ mb: 6 }}>
        <SeccionHeader
          icono={<HandshakeIcon sx={{ color: TT.verde, fontSize: 24 }} />}
          titulo="Características del Convenio"
          color={TT.verde}
        />
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <VideoPlaceholder
              titulo="Características del Convenio"
              color={TT.verde}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                p: { xs: 0, md: 1 },
                borderLeft: { md: `4px solid ${TT.verde}30` },
                pl: { md: 3 },
              }}
            >
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85, mb: 2 }}>
                El convenio marco establece un acuerdo de cooperación orientado a fortalecer las capacidades
                organizativas, culturales y de planificación de los pueblos indígenas en cinco regiones de
                Colombia. Sus características principales incluyen el enfoque territorial diferencial, la
                participación activa de las comunidades en la toma de decisiones y la articulación con los
                instrumentos de planificación propia.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
                El proceso se desarrolla a través de una metodología participativa que reconoce la diversidad
                cultural y garantiza el ejercicio del derecho a la consulta previa, libre e informada en todas
                las etapas de implementación.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* ── 2. Papel del Ministerio ──────────────────────── */}
      {/* Layout: texto izquierda · video derecha */}
      <Box sx={{ mb: 6 }}>
        <SeccionHeader
          icono={<AccountBalanceIcon sx={{ color: TT.naranja, fontSize: 24 }} />}
          titulo="Papel del Ministerio"
          color={TT.naranja}
        />
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                p: { xs: 0, md: 1 },
                borderRight: { md: `4px solid ${TT.naranja}30` },
                pr: { md: 3 },
              }}
            >
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85, mb: 2 }}>
                El Ministerio actúa como entidad rectora y cofinanciadora del convenio, garantizando el
                cumplimiento del marco normativo nacional relacionado con los derechos de los pueblos indígenas.
                Su rol comprende la supervisión técnica, el acompañamiento institucional y la articulación con
                las políticas públicas diferenciales para comunidades étnicas.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
                A través de sus dependencias especializadas, el Ministerio facilita los espacios de diálogo
                intercultural y asegura la coherencia entre los objetivos del convenio y las metas del Plan
                Nacional de Desarrollo en materia de pueblos indígenas.
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <VideoPlaceholder
              titulo="Papel del Ministerio"
              color={TT.naranja}
            />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* ── 3. Papel del CISP como ONG ───────────────────── */}
      {/* Layout: texto arriba · video abajo */}
      <Box sx={{ mb: 6 }}>
        <SeccionHeader
          icono={<PublicIcon sx={{ color: TT.purpura, fontSize: 24 }} />}
          titulo="Papel del CISP como ONG"
          color={TT.purpura}
        />
        <Box
          sx={{
            mb: 3, p: { xs: 2.5, md: 3 },
            borderRadius: 3,
            bgcolor: `${TT.purpura}06`,
            borderLeft: `4px solid ${TT.purpura}`,
          }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
                El CISP — Comitato Internazionale per lo Sviluppo dei Popoli — actúa como organización
                ejecutora del convenio, aportando su experiencia en cooperación internacional y su enfoque
                basado en derechos para el acompañamiento de comunidades indígenas en Colombia.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
                Como ONG especializada, el CISP lidera los procesos de fortalecimiento organizativo,
                coordina los equipos territoriales y garantiza la implementación metodológica del
                observatorio, asegurando la participación efectiva de las comunidades en todas
                las fases del proyecto.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <VideoPlaceholder
          titulo="Papel del CISP como ONG"
          color={TT.purpura}
          aspectRatio="16/6"
        />
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* ── 4. Tres botones de acceso ────────────────────── */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ width: 5, height: 28, borderRadius: 2, bgcolor: TT.marino }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Recursos del Convenio</Typography>
        </Box>

        <Grid container spacing={2}>

          {/* Botón 1: Preguntas frecuentes */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              elevation={0}
              onClick={() => setDialog('faq')}
              sx={{
                p: 3, borderRadius: 3, cursor: 'pointer', textAlign: 'center',
                border: `1.5px solid ${TT.verde}25`,
                transition: 'transform 0.18s, box-shadow 0.18s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 10px 28px ${TT.verde}20` },
              }}
            >
              <Box sx={{ width: 56, height: 56, borderRadius: 2, bgcolor: `${TT.verde}15`,
                border: `2px solid ${TT.verde}25`, mx: 'auto', mb: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HelpOutlineIcon sx={{ color: TT.verde, fontSize: 28 }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: TT.verde, mb: 0.5 }}>
                Preguntas Frecuentes
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
                Respuestas a las consultas más comunes sobre el convenio y sus procesos.
              </Typography>
            </Paper>
          </Grid>

          {/* Botón 2: Informes parciales */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              elevation={0}
              onClick={() => setDialog('informes')}
              sx={{
                p: 3, borderRadius: 3, cursor: 'pointer', textAlign: 'center',
                border: `1.5px solid ${TT.naranja}25`,
                transition: 'transform 0.18s, box-shadow 0.18s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 10px 28px ${TT.naranja}20` },
              }}
            >
              <Box sx={{ width: 56, height: 56, borderRadius: 2, bgcolor: `${TT.naranja}15`,
                border: `2px solid ${TT.naranja}25`, mx: 'auto', mb: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AssessmentIcon sx={{ color: TT.naranja, fontSize: 28 }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: TT.naranja, mb: 0.5 }}>
                Informes Parciales
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
                Avances y resultados de las fases de implementación del convenio.
              </Typography>
            </Paper>
          </Grid>

          {/* Botón 3: Documentos de interés */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              elevation={0}
              onClick={() => setDialog('documentos')}
              sx={{
                p: 3, borderRadius: 3, cursor: 'pointer', textAlign: 'center',
                border: `1.5px solid ${TT.marino}20`,
                transition: 'transform 0.18s, box-shadow 0.18s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 10px 28px ${TT.marino}15` },
              }}
            >
              <Box sx={{ width: 56, height: 56, borderRadius: 2, bgcolor: `${TT.marino}10`,
                border: `2px solid ${TT.marino}20`, mx: 'auto', mb: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FolderOpenIcon sx={{ color: TT.marino, fontSize: 28 }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: TT.marino, mb: 0.5 }}>
                Documentos de Interés
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
                Repositorio de documentos normativos, metodológicos y de referencia del proyecto.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* ── Dialogs ──────────────────────────────────────── */}
      <DialogTextoPDF
        open={dialog === 'faq'}
        onClose={() => setDialog(null)}
        titulo="Preguntas Frecuentes"
        color={TT.verde}
        icono={<HelpOutlineIcon sx={{ color: TT.verde, fontSize: 20 }} />}
        pdfNombre="Preguntas frecuentes del convenio"
        pdfUrl={null}
        texto="Este documento recoge las preguntas más comunes que surgen durante la implementación del convenio: ¿Quiénes pueden participar? ¿Cuáles son los tiempos del proyecto? ¿Cómo se definen las comunidades beneficiarias? ¿Qué mecanismos de participación existen? Descarga el documento completo para conocer todas las respuestas."
      />

      <DialogTextoPDF
        open={dialog === 'informes'}
        onClose={() => setDialog(null)}
        titulo="Informes Parciales"
        color={TT.naranja}
        icono={<AssessmentIcon sx={{ color: TT.naranja, fontSize: 20 }} />}
        pdfNombre="Informe parcial de avance"
        pdfUrl={null}
        texto="Los informes parciales documentan el avance de las actividades, el cumplimiento de metas y los resultados obtenidos en cada fase del convenio. Incluyen narrativa cualitativa, datos cuantitativos, lecciones aprendidas y recomendaciones para las etapas siguientes del proceso."
      />

      <DialogDocumentos
        open={dialog === 'documentos'}
        onClose={() => setDialog(null)}
      />
    </Box>
  );
}
