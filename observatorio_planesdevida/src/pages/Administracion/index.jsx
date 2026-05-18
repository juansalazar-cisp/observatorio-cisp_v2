import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, TextField, InputAdornment, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip, Divider, Grid, Card, CardContent,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Alert, MenuItem, Select, FormControl, InputLabel,
  Snackbar,
} from '@mui/material';
import AdminPanelSettingsIcon  from '@mui/icons-material/AdminPanelSettings';
import SearchIcon              from '@mui/icons-material/Search';
import TuneIcon                from '@mui/icons-material/Tune';
import SettingsIcon            from '@mui/icons-material/Settings';
import FolderOpenIcon          from '@mui/icons-material/FolderOpen';
import PeopleIcon              from '@mui/icons-material/People';
import InfoIcon                from '@mui/icons-material/Info';
import LockIcon                from '@mui/icons-material/Lock';
import VisibilityIcon          from '@mui/icons-material/Visibility';
import VisibilityOffIcon       from '@mui/icons-material/VisibilityOff';
import LogoutIcon              from '@mui/icons-material/Logout';
import RestoreIcon             from '@mui/icons-material/Restore';
import CloseIcon               from '@mui/icons-material/Close';

import { CISP }       from '../../theme';
import usuarios       from '../../data/usuarios';
import { useOrgs, updateOrg, resetOrg } from '../../utils/orgData';
import { useConfig, updateConfig } from '../../utils/configData';
import ICON_MAP        from '../../utils/iconMap';

const SESSION_KEY = 'cisp_admin_session';

const regionLabel = {
  andina: 'Andina', caribe: 'Caribe', pacifica: 'Pacífica',
  amazonica: 'Amazónica', orinoquia: 'Orinoquía',
};

const estadoColor = {
  'Activo':            { bg: '#F0FDF4', color: '#166534' },
  'En formulación':    { bg: '#FEF9C3', color: '#854D0E' },
  'En actualización':  { bg: '#EFF6FF', color: '#1D4ED8' },
  'En revisión':       { bg: '#FFF7ED', color: '#9A3412' },
};

// Nombres de íconos disponibles ordenados alfabéticamente
const ICONOS_DISPONIBLES = Object.keys(ICON_MAP).sort();

const regionColor = {
  andina: CISP.verde_agua, caribe: CISP.amarillo, pacifica: CISP.rojo,
  amazonica: CISP.verde, orinoquia: CISP.vino,
};

// ── Login Dialog ──────────────────────────────────────────
function LoginDialog({ onSuccess, onClose }) {
  const [usuario, setUsuario]     = useState('');
  const [clave, setClave]         = useState('');
  const [showClave, setShowClave] = useState(false);
  const [error, setError]         = useState('');

  const handleLogin = () => {
    const user = usuarios.find((u) => u.usuario === usuario && u.clave === clave);
    if (user) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, nombre: user.nombre, rol: user.rol, orgId: user.orgId ?? null }));
      onSuccess(user);
    } else {
      setError('Usuario o clave incorrectos. Intenta de nuevo.');
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ pt: 3, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: `${CISP.verde_agua}15`, border: `2px solid ${CISP.verde_agua}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LockIcon sx={{ color: CISP.verde_agua, fontSize: 20 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, lineHeight: 1.2 }}>
              Acceso Administración
            </Typography>
            <Typography variant="caption" color="text.secondary">Observatorio de Planes de Vida · CISP</Typography>
          </Box>
          <IconButton size="small" onClick={onClose} sx={{ color: 'text.disabled', '&:hover': { color: 'text.primary' } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pb: 1 }}>
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
        <TextField
          fullWidth label="Usuario" size="small" autoFocus
          value={usuario} onChange={(e) => { setUsuario(e.target.value); setError(''); }}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          sx={{ mb: 2, mt: 1 }}
        />
        <TextField
          fullWidth label="Clave" size="small"
          type={showClave ? 'text' : 'password'}
          value={clave} onChange={(e) => { setClave(e.target.value); setError(''); }}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setShowClave((p) => !p)}>
                    {showClave ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
        <Button
          variant="outlined" size="large" onClick={onClose}
          sx={{ borderRadius: 2, borderColor: 'divider', color: 'text.secondary', flex: 1 }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained" size="large"
          onClick={handleLogin}
          disabled={!usuario || !clave}
          sx={{ borderRadius: 2, fontWeight: 700, bgcolor: CISP.verde_agua, '&:hover': { bgcolor: '#1a6a68' }, flex: 2 }}
        >
          Ingresar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Edit Org Dialog ───────────────────────────────────────
function EditOrgDialog({ org, onClose, onSave }) {
  const [form, setForm] = useState({
    icono: org.icono,
    colores: { primario: org.colores.primario, secundario: org.colores.secundario },
    textos: {
      contextoTerritorial: org.textos?.contextoTerritorial || '',
      elementosIdentidad:  org.textos?.elementosIdentidad  || '',
    },
    planDeVidaFinal: {
      nombre: org.planDeVidaFinal?.nombre || '',
      url:    org.planDeVidaFinal?.url    || '',
    },
  });

  const set = (path, value) => {
    const keys = path.split('.');
    setForm((prev) => {
      const next = { ...prev };
      if (keys.length === 1) next[keys[0]] = value;
      else if (keys.length === 2) next[keys[0]] = { ...prev[keys[0]], [keys[1]]: value };
      return next;
    });
  };

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
        <Typography variant="h6" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>
          Configurar: {org.etiqueta}
        </Typography>
        <Typography variant="caption" color="text.secondary">{org.nombre}</Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>

          {/* Ícono */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Ícono</InputLabel>
              <Select
                label="Ícono"
                value={form.icono}
                onChange={(e) => set('icono', e.target.value)}
                renderValue={(val) => {
                  const Icon = ICON_MAP[val];
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      {Icon && <Icon sx={{ fontSize: 20, color: 'text.secondary' }} />}
                      <Typography variant="body2">{val}</Typography>
                    </Box>
                  );
                }}
              >
                {ICONOS_DISPONIBLES.map((ic) => {
                  const Icon = ICON_MAP[ic];
                  return (
                    <MenuItem key={ic} value={ic}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        {Icon && <Icon sx={{ fontSize: 20, color: 'text.secondary' }} />}
                        <Typography variant="body2">{ic}</Typography>
                      </Box>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          {/* Colores */}
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.75, fontWeight: 600 }}>
              Color primario
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <input
                type="color"
                value={form.colores.primario}
                onChange={(e) => set('colores.primario', e.target.value)}
                style={{ width: 48, height: 40, border: '1px solid #ddd', borderRadius: 8, cursor: 'pointer', padding: 2 }}
              />
              <TextField
                size="small" value={form.colores.primario}
                onChange={(e) => set('colores.primario', e.target.value)}
                sx={{ flex: 1 }} inputProps={{ style: { fontSize: 13 } }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.75, fontWeight: 600 }}>
              Color secundario
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <input
                type="color"
                value={form.colores.secundario}
                onChange={(e) => set('colores.secundario', e.target.value)}
                style={{ width: 48, height: 40, border: '1px solid #ddd', borderRadius: 8, cursor: 'pointer', padding: 2 }}
              />
              <TextField
                size="small" value={form.colores.secundario}
                onChange={(e) => set('colores.secundario', e.target.value)}
                sx={{ flex: 1 }} inputProps={{ style: { fontSize: 13 } }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider><Typography variant="caption" color="text.disabled">Textos de secciones</Typography></Divider>
          </Grid>

          {/* Contexto Territorial */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth multiline rows={4}
              label="Contexto Territorial y Poblacional"
              value={form.textos.contextoTerritorial}
              onChange={(e) => set('textos.contextoTerritorial', e.target.value)}
              inputProps={{ style: { fontSize: 13, lineHeight: 1.7 } }}
            />
          </Grid>

          {/* Elementos de Identidad */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth multiline rows={4}
              label="Elementos de Identidad"
              value={form.textos.elementosIdentidad}
              onChange={(e) => set('textos.elementosIdentidad', e.target.value)}
              inputProps={{ style: { fontSize: 13, lineHeight: 1.7 } }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider><Typography variant="caption" color="text.disabled">Plan de Vida Final</Typography></Divider>
          </Grid>

          {/* Plan de vida final */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth size="small"
              label="Nombre del documento"
              placeholder="Plan de Vida Organización 2024"
              value={form.planDeVidaFinal.nombre}
              onChange={(e) => set('planDeVidaFinal.nombre', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth size="small"
              label="URL de descarga (PDF)"
              placeholder="https://... o ruta relativa"
              value={form.planDeVidaFinal.url}
              onChange={(e) => set('planDeVidaFinal.url', e.target.value)}
            />
          </Grid>
        </Grid>

        <Alert severity="info" sx={{ mt: 3, borderRadius: 2, fontSize: '0.78rem' }}>
          Los cambios se guardan en este navegador (localStorage) y se descargan como JSON. Son visibles en este navegador al recargar la página.
        </Alert>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button onClick={onClose} sx={{ borderRadius: 2 }}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={() => onSave(org.slug, form)}
          sx={{ borderRadius: 2, fontWeight: 700, bgcolor: CISP.verde_agua, '&:hover': { bgcolor: '#1a6a68' } }}
        >
          Guardar cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Página principal ──────────────────────────────────────
export default function Administracion() {
  const navigate = useNavigate();
  const [session, setSession] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); }
    catch { return null; }
  });
  const [busqueda, setBusqueda]       = useState('');
  const orgs   = useOrgs();
  const config = useConfig();
  const [editOrg, setEditOrg]         = useState(null);
  const [editVersion, setEditVersion] = useState(false);
  const [versionDraft, setVersionDraft] = useState('');
  const [snack, setSnack]             = useState({ open: false, msg: '', severity: 'success' });

  const esGeneral = session?.rol === 'admin_general';

  const handleOpenVersion = () => { setVersionDraft(config.version); setEditVersion(true); };

  const handleSaveVersion = () => {
    updateConfig({ version: versionDraft });
    setEditVersion(false);
    setSnack({ open: true, msg: 'Versión guardada', severity: 'success' });
  };

  const handleSaveEdit = (slug, form) => {
    updateOrg(slug, form);
    setEditOrg(null);
    setSnack({ open: true, msg: 'Cambios guardados', severity: 'success' });
  };

  const handleReset = (slug) => {
    resetOrg(slug);
    setSnack({ open: true, msg: 'Organización restablecida a valores originales', severity: 'info' });
  };

  // admin_general ve todas; admin_org solo ve la suya (comparado por id numérico)
  const orgsFiltradas = orgs.filter((o) => {
    if (!esGeneral) return o.id === session?.orgId;
    const q = busqueda.toLowerCase();
    return !q || o.etiqueta.toLowerCase().includes(q) || o.pueblo.toLowerCase().includes(q) || o.departamento.toLowerCase().includes(q);
  });

  if (!session) {
    return <LoginDialog onSuccess={(user) => setSession(user)} onClose={() => navigate(-1)} />;
  }

  const rolLabel = esGeneral ? 'Administrador general' : 'Administrador de organización';
  const rolColor = esGeneral ? CISP.verde_agua : CISP.vino;

  return (
    <Box>
      {/* Encabezado */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Box sx={{ width: 52, height: 52, borderRadius: 2, flexShrink: 0, bgcolor: `${rolColor}15`, border: `2px solid ${rolColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AdminPanelSettingsIcon sx={{ color: rolColor, fontSize: 28 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
            <Typography variant="h4" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, lineHeight: 1.2 }}>
              Administración
            </Typography>
            <Chip
              label={rolLabel}
              size="small"
              sx={{ bgcolor: `${rolColor}15`, color: rolColor, fontWeight: 700, fontSize: '0.68rem' }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Sesión iniciada como <strong>{session.nombre}</strong>
          </Typography>
        </Box>
        <Button
          size="small" startIcon={<LogoutIcon />} variant="outlined"
          onClick={() => { sessionStorage.removeItem(SESSION_KEY); setSession(null); }}
          sx={{ borderRadius: 2, borderColor: 'divider', color: 'text.secondary' }}
        >
          Cerrar sesión
        </Button>
      </Box>

      {/* Banner informativo para admin_org */}
      {!esGeneral && (
        <Alert
          severity="info"
          sx={{ mb: 4, borderRadius: 2 }}
          icon={<LockIcon />}
        >
          Tu acceso está limitado a la organización <strong>{orgsFiltradas[0]?.etiqueta ?? session.orgSlug}</strong>. Solo puedes editar la configuración de ese sitio.
        </Alert>
      )}

      {/* Configuración general — solo admin_general */}
      {esGeneral && (
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box sx={{ width: 4, height: 28, borderRadius: 2, bgcolor: CISP.verde_agua }} />
            <Typography variant="h6" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>Configuración general</Typography>
          </Box>
          <Grid container spacing={2.5}>
            {[
              { icono: <InfoIcon sx={{ fontSize: 24, color: CISP.verde_agua }} />, titulo: 'Información del observatorio', descripcion: 'Nombre, descripción y datos generales.', color: CISP.verde_agua },
              { icono: <FolderOpenIcon sx={{ fontSize: 24, color: CISP.amarillo }} />, titulo: 'Gestión de recursos', descripcion: 'Cartillas, bases de datos y archivos por organización.', color: CISP.amarillo },
              { icono: <PeopleIcon sx={{ fontSize: 24, color: CISP.vino }} />, titulo: 'Accesos y permisos', descripcion: 'Usuarios y niveles de acceso.', color: CISP.vino },
              { icono: <SettingsIcon sx={{ fontSize: 24, color: CISP.verde }} />, titulo: 'Módulos globales', descripcion: 'Activar o desactivar módulos de forma global.', color: CISP.verde },
            ].map((op) => (
              <Grid key={op.titulo} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Card elevation={0} sx={{ border: `1px solid ${op.color}20`, borderRadius: 2.5 }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: 2, mb: 1.5, bgcolor: `${op.color}12`, border: `1.5px solid ${op.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{op.icono}</Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: op.color, mb: 0.5 }}>{op.titulo}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5, display: 'block' }}>{op.descripcion}</Typography>
                    <Chip label="Próximamente" size="small" sx={{ mt: 1.5, fontSize: '0.6rem', height: 18, bgcolor: `${op.color}10`, color: op.color }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {esGeneral && <Divider sx={{ mb: 5 }} />}

      {/* Configuración general del sistema — solo admin_general */}
      {esGeneral && (
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box sx={{ width: 4, height: 28, borderRadius: 2, bgcolor: CISP.verde_agua }} />
            <Typography variant="h6" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>
              Configuración del sistema
            </Typography>
          </Box>

          <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2.5, overflow: 'hidden' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: `${CISP.verde_agua}08` }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary' }}>Parámetro</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary' }}>Valor actual</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textAlign: 'center', width: 100 }}>Editar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ '&:hover': { bgcolor: `${CISP.verde_agua}06` } }}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.82rem' }}>Versión</Typography>
                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.68rem' }}>
                      Mostrada en la barra lateral del observatorio
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {editVersion ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                          size="small"
                          value={versionDraft}
                          onChange={(e) => setVersionDraft(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveVersion()}
                          placeholder="1.0.0"
                          sx={{ width: 120 }}
                          autoFocus
                          inputProps={{ style: { fontSize: 13 } }}
                        />
                        <Button
                          size="small" variant="contained"
                          onClick={handleSaveVersion}
                          disabled={!versionDraft.trim()}
                          sx={{ borderRadius: 1.5, fontWeight: 700, bgcolor: CISP.verde_agua, '&:hover': { bgcolor: '#1a6a68' }, px: 2 }}
                        >
                          Guardar
                        </Button>
                        <Button
                          size="small"
                          onClick={() => setEditVersion(false)}
                          sx={{ borderRadius: 1.5, color: 'text.secondary' }}
                        >
                          Cancelar
                        </Button>
                      </Box>
                    ) : (
                      <Chip
                        label={`v${config.version}`}
                        size="small"
                        sx={{ bgcolor: `${CISP.verde_agua}15`, color: CISP.verde_agua, fontWeight: 700, fontSize: '0.75rem' }}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {!editVersion && (
                      <Tooltip title="Editar versión">
                        <IconButton size="small" onClick={handleOpenVersion} sx={{ color: CISP.verde_agua }}>
                          <TuneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>

          <Alert severity="info" sx={{ mt: 2, borderRadius: 2, fontSize: '0.78rem' }}>
            Los cambios se guardan en este navegador (localStorage) y se aplican inmediatamente en la barra lateral.
          </Alert>
        </Box>
      )}

      {esGeneral && <Divider sx={{ mb: 5 }} />}

      {/* Tabla de organizaciones */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Box sx={{ width: 4, height: 28, borderRadius: 2, bgcolor: rolColor }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700 }}>
              {esGeneral ? 'Organizaciones' : 'Mi organización'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {esGeneral
                ? `${orgs.length} organizaciones — edita ícono, colores y textos de cada sitio`
                : 'Edita la configuración visual y los textos de tu sitio'}
            </Typography>
          </Box>
        </Box>

        {/* Buscador solo para admin_general */}
        {esGeneral && (
          <TextField
            size="small" placeholder="Buscar organización, pueblo o departamento…"
            value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
            sx={{ mb: 2.5, width: { xs: '100%', sm: 380 } }}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} /></InputAdornment> } }}
          />
        )}

        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2.5, overflow: 'hidden' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: `${CISP.verde_agua}08` }}>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', width: 40 }}>#</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary' }}>Organización</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', display: { xs: 'none', sm: 'table-cell' } }}>Pueblo</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', display: { xs: 'none', md: 'table-cell' } }}>Región</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', display: { xs: 'none', md: 'table-cell' } }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary' }}>Colores</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textAlign: 'center' }}>Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orgsFiltradas.map((org) => {
                const ec       = estadoColor[org.estado] || estadoColor['En formulación'];
                const rc       = regionColor[org.region] || CISP.verde_agua;
                const puedeEditar = esGeneral || org.id === session?.orgId;
                return (
                  <TableRow
                    key={org.id}
                    sx={{
                      '&:hover': { bgcolor: `${puedeEditar ? rolColor : '#ccc'}06` },
                      transition: 'background-color 0.15s',
                      opacity: puedeEditar ? 1 : 0.5,
                    }}
                  >
                    <TableCell sx={{ color: 'text.disabled', fontSize: '0.75rem', fontWeight: 600 }}>
                      {String(org.id).padStart(2, '0')}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.82rem' }}>{org.etiqueta}</Typography>
                          <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.68rem' }}>{org.departamento}</Typography>
                        </Box>
                        {!esGeneral && org.id === session?.orgId && (
                          <Chip label="Mi org" size="small" sx={{ height: 16, fontSize: '0.58rem', bgcolor: `${rolColor}15`, color: rolColor, fontWeight: 700 }} />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.8rem', color: 'text.secondary', display: { xs: 'none', sm: 'table-cell' } }}>{org.pueblo}</TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Chip label={regionLabel[org.region]} size="small" sx={{ height: 18, fontSize: '0.62rem', fontWeight: 600, bgcolor: `${rc}15`, color: rc }} />
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Chip label={org.estado} size="small" sx={{ height: 18, fontSize: '0.62rem', fontWeight: 600, bgcolor: ec.bg, color: ec.color }} />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
                        <Box sx={{ width: 18, height: 18, borderRadius: 1, bgcolor: org.colores.primario, border: '1.5px solid rgba(0,0,0,0.12)' }} />
                        <Box sx={{ width: 18, height: 18, borderRadius: 1, bgcolor: org.colores.secundario, border: '1.5px solid rgba(0,0,0,0.12)' }} />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                        <Tooltip title={puedeEditar ? 'Editar configuración' : 'Sin permiso'}>
                          <span>
                            <IconButton
                              size="small"
                              onClick={() => puedeEditar && setEditOrg(org)}
                              disabled={!puedeEditar}
                              sx={{ color: rolColor, '&.Mui-disabled': { color: 'text.disabled' } }}
                            >
                              <TuneIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip title={puedeEditar ? 'Restablecer valores del JSON' : 'Sin permiso'}>
                          <span>
                            <IconButton
                              size="small"
                              onClick={() => puedeEditar && handleReset(org.slug)}
                              disabled={!puedeEditar}
                              sx={{ color: 'text.disabled', '&.Mui-disabled': { color: '#ddd' } }}
                            >
                              <RestoreIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
              {orgsFiltradas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4, color: 'text.disabled' }}>
                    {busqueda ? `Sin resultados para "${busqueda}"` : 'No hay organizaciones disponibles'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Edit dialog */}
      {editOrg && (
        <EditOrgDialog
          org={editOrg}
          onClose={() => setEditOrg(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* Feedback */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          sx={{ borderRadius: 2, fontWeight: 600 }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
