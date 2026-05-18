import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, TextField, InputAdornment, Chip, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,
  Alert, Grid, Snackbar,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SearchIcon             from '@mui/icons-material/Search';
import TuneIcon               from '@mui/icons-material/Tune';
import RestoreIcon            from '@mui/icons-material/Restore';
import LockIcon               from '@mui/icons-material/Lock';
import LogoutIcon             from '@mui/icons-material/Logout';
import VisibilityIcon         from '@mui/icons-material/Visibility';
import VisibilityOffIcon      from '@mui/icons-material/VisibilityOff';
import CloseIcon              from '@mui/icons-material/Close';

import { TT }                           from '../../theme';
import usuarios                         from '../../data/usuariosIniciativas';
import { useIniciativas, updateIniciativa, resetIniciativa } from '../../utils/iniciativasStore';

const SESSION_KEY = 'tt_admin_ini_session';

// ── Login ─────────────────────────────────────────────────
function LoginDialog({ onSuccess, onClose }) {
  const [usuario, setUsuario]     = useState('');
  const [clave, setClave]         = useState('');
  const [showClave, setShowClave] = useState(false);
  const [error, setError]         = useState('');

  const handleLogin = () => {
    const user = usuarios.find((u) => u.usuario === usuario && u.clave === clave);
    if (user) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, usuario: user.usuario, rol: user.rol, orgId: user.orgId ?? null }));
      onSuccess(user);
    } else {
      setError('Usuario o clave incorrectos.');
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ pt: 3, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: `${TT.naranja}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LockIcon sx={{ color: TT.naranja, fontSize: 20 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>Acceso Administración</Typography>
            <Typography variant="caption" color="text.secondary">Tejiendo Territorios · CISP</Typography>
          </Box>
          <IconButton size="small" onClick={onClose} sx={{ color: 'text.disabled' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ pb: 1 }}>
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
        <TextField fullWidth label="Usuario" size="small" autoFocus value={usuario}
          onChange={(e) => { setUsuario(e.target.value); setError(''); }}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()} sx={{ mb: 2, mt: 1 }} />
        <TextField fullWidth label="Clave" size="small" type={showClave ? 'text' : 'password'}
          value={clave} onChange={(e) => { setClave(e.target.value); setError(''); }}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          slotProps={{ input: { endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setShowClave((p) => !p)}>
                {showClave ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
              </IconButton>
            </InputAdornment>
          )}}} />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
        <Button variant="outlined" onClick={onClose}
          sx={{ borderRadius: 2, borderColor: 'divider', color: 'text.secondary', flex: 1 }}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleLogin} disabled={!usuario || !clave}
          sx={{ borderRadius: 2, fontWeight: 700, bgcolor: TT.naranja, '&:hover': { bgcolor: '#e8821a' }, flex: 2 }}>
          Ingresar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Dialog edición ────────────────────────────────────────
function EditDialog({ ini, onClose, onSave }) {
  const [form, setForm] = useState({
    nombre:         ini.nombre,
    colorPrimario:  ini.colorPrimario,
    colorSecundario:ini.colorSecundario,
    descripcion:    ini.descripcion,
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Configurar iniciativa #{String(ini.id).padStart(2,'0')}</Typography>
        <Typography variant="caption" color="text.secondary">{ini.comunidad} · {ini.organizacion}</Typography>
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField fullWidth size="small" label="Nombre de la iniciativa"
              value={form.nombre} onChange={(e) => set('nombre', e.target.value)} />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.75, fontWeight: 600 }}>
              Color primario
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <input type="color" value={form.colorPrimario}
                onChange={(e) => set('colorPrimario', e.target.value)}
                style={{ width: 48, height: 40, border: '1px solid #ddd', borderRadius: 8, cursor: 'pointer', padding: 2 }} />
              <TextField size="small" value={form.colorPrimario}
                onChange={(e) => set('colorPrimario', e.target.value)}
                sx={{ flex: 1 }} inputProps={{ style: { fontSize: 13 } }} />
            </Box>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.75, fontWeight: 600 }}>
              Color secundario
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <input type="color" value={form.colorSecundario}
                onChange={(e) => set('colorSecundario', e.target.value)}
                style={{ width: 48, height: 40, border: '1px solid #ddd', borderRadius: 8, cursor: 'pointer', padding: 2 }} />
              <TextField size="small" value={form.colorSecundario}
                onChange={(e) => set('colorSecundario', e.target.value)}
                sx={{ flex: 1 }} inputProps={{ style: { fontSize: 13 } }} />
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField fullWidth multiline rows={4} label="Descripción"
              value={form.descripcion} onChange={(e) => set('descripcion', e.target.value)}
              inputProps={{ style: { fontSize: 13, lineHeight: 1.7 } }} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button onClick={onClose} sx={{ borderRadius: 2 }}>Cancelar</Button>
        <Button variant="contained" onClick={() => onSave(ini.id, form)}
          sx={{ borderRadius: 2, fontWeight: 700, bgcolor: TT.naranja, '&:hover': { bgcolor: '#e8821a' } }}>
          Guardar cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Página admin ──────────────────────────────────────────
export default function AdminIniciativas() {
  const navigate  = useNavigate();
  const [session, setSession] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch { return null; }
  });
  const [busqueda, setBusqueda] = useState('');
  const [editIni, setEditIni]   = useState(null);
  const [snack, setSnack]       = useState({ open: false, msg: '' });
  const iniciativas             = useIniciativas();
  const esGeneral               = session?.rol === 'admin_general';

  const filtradas = iniciativas.filter((ini) => {
    if (!esGeneral) return ini.id === session?.orgId;
    const q = busqueda.toLowerCase();
    return !q || ini.nombre.toLowerCase().includes(q) || ini.organizacion.toLowerCase().includes(q);
  });

  const handleSave = (id, form) => {
    updateIniciativa(id, form);
    setEditIni(null);
    setSnack({ open: true, msg: 'Cambios guardados' });
  };

  const handleReset = (id) => {
    resetIniciativa(id);
    setSnack({ open: true, msg: 'Iniciativa restablecida' });
  };

  if (!session) {
    return <LoginDialog onSuccess={(u) => setSession(u)} onClose={() => navigate(-1)} />;
  }

  return (
    <Box>
      {/* Encabezado */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Box sx={{ width: 50, height: 50, borderRadius: 2, bgcolor: `${TT.naranja}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <AdminPanelSettingsIcon sx={{ color: TT.naranja, fontSize: 26 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2 }}>Administración</Typography>
            <Chip label={esGeneral ? 'Admin general' : 'Admin iniciativa'} size="small"
              sx={{ bgcolor: `${TT.naranja}15`, color: TT.naranja, fontWeight: 700, fontSize: '0.68rem' }} />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Sesión: <strong>{session.usuario}</strong>
          </Typography>
        </Box>
        <Button size="small" startIcon={<LogoutIcon />} variant="outlined"
          onClick={() => { sessionStorage.removeItem(SESSION_KEY); setSession(null); }}
          sx={{ borderRadius: 2, borderColor: 'divider', color: 'text.secondary' }}>
          Cerrar sesión
        </Button>
      </Box>

      {/* Buscador */}
      {esGeneral && (
        <TextField size="small" placeholder="Buscar iniciativa u organización…"
          value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
          sx={{ mb: 2.5, width: { xs: '100%', sm: 400 } }}
          slotProps={{ input: { startAdornment: (
            <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} /></InputAdornment>
          )}}} />
      )}

      {/* Tabla */}
      <TableContainer component={Paper} elevation={0}
        sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2.5, overflow: 'hidden' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: `${TT.naranja}08` }}>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', width: 40 }}>#</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary' }}>Iniciativa</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', display: { xs: 'none', sm: 'table-cell' } }}>Comunidad</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary' }}>Colores</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textAlign: 'center' }}>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtradas.map((ini) => (
              <TableRow key={ini.id} sx={{ '&:hover': { bgcolor: `${TT.naranja}06` } }}>
                <TableCell sx={{ color: 'text.disabled', fontSize: '0.75rem', fontWeight: 600 }}>
                  {String(ini.id).padStart(2,'0')}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.82rem' }}>{ini.nombre}</Typography>
                  <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.68rem' }}>{ini.linea}</Typography>
                </TableCell>
                <TableCell sx={{ fontSize: '0.8rem', color: 'text.secondary', display: { xs: 'none', sm: 'table-cell' } }}>
                  {ini.comunidad}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.75 }}>
                    <Box sx={{ width: 18, height: 18, borderRadius: 1, bgcolor: ini.colorPrimario, border: '1.5px solid rgba(0,0,0,0.12)' }} />
                    <Box sx={{ width: 18, height: 18, borderRadius: 1, bgcolor: ini.colorSecundario, border: '1.5px solid rgba(0,0,0,0.12)' }} />
                  </Box>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                    <Tooltip title="Editar">
                      <IconButton size="small" onClick={() => setEditIni(ini)} sx={{ color: TT.naranja }}>
                        <TuneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Restablecer">
                      <IconButton size="small" onClick={() => handleReset(ini.id)} sx={{ color: 'text.disabled' }}>
                        <RestoreIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editIni && <EditDialog ini={editIni} onClose={() => setEditIni(null)} onSave={handleSave} />}

      <Snackbar open={snack.open} autoHideDuration={3500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" onClose={() => setSnack((s) => ({ ...s, open: false }))}
          sx={{ borderRadius: 2, fontWeight: 600 }}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
