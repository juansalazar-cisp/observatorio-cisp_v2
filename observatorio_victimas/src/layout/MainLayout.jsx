import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Box, CssBaseline, Divider, Drawer, Grid, IconButton,
  Link, List, ListItem, ListItemButton, Toolbar, Typography,
} from '@mui/material';
import MenuIcon  from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import logoBlanco    from '../assets/logo_en_blanco.png';
import iconoPonencia from '../assets/icono_ponencia.png';
import iconoFoco     from '../assets/icono_foco.png';
import iconoArchivo  from '../assets/icono_archivo.png';
import iconoFlecha   from '../assets/icono_flecha.png';
import iconoChat     from '../assets/icono_chat.png';
import { OV } from '../theme';

const navItems = [
  { label: 'Inicio',      iconPng: iconoFlecha,   path: '/' },
  { label: 'Reparación',  iconPng: iconoPonencia, path: '/comprendiendo-reparacion' },
  { label: 'Módulos',     iconPng: iconoFoco,     path: '/modulos' },
  { label: 'Glosario',    iconPng: iconoArchivo,  path: '/glosario' },
];

function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: OV.grisOscuro, color: '#fff', pt: 5, pb: 5, px: { xs: 2, md: 4 } }}
    >
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>

        {/* Logo + lema */}
        <Box sx={{
          display: 'flex', flexDirection: { xs: 'column', md: 'row' },
          gap: 3, mb: 4, alignItems: { md: 'center' },
        }}>
          <Box component="img" src={logoBlanco} alt="Logo CISP Colombia"
            sx={{ height: 52, objectFit: 'contain', flexShrink: 0 }} />
          <Box sx={{ pl: { md: 3 }, borderLeft: { md: `4px solid ${OV.amarillo}` } }}>
            <Typography variant="body1"
              sx={{ fontWeight: 800, color: OV.amarillo, fontStyle: 'italic',
                fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.4 }}>
              "Reparar también es estar presentes"
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 0.5 }}>
              Estrategia de Reparación Individual · CISP Colombia
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 4 }} />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="overline"
              sx={{ color: OV.amarillo, fontSize: '0.68rem', mb: 1.5, display: 'block' }}>
              Contacto
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box component="img" src={iconoChat} alt=""
                sx={{ width: 18, height: 18, objectFit: 'contain',
                  filter: 'brightness(0) invert(0.5)' }} />
              <Link href="mailto:reparacion.individual@cispcolombia.org"
                sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem',
                  textDecoration: 'none', '&:hover': { color: OV.amarillo } }}>
                reparacion.individual@cispcolombia.org
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="overline"
              sx={{ color: OV.amarillo, fontSize: '0.68rem', mb: 1.5, display: 'block' }}>
              Entidades
            </Typography>
            {[
              { label: 'unidadvictimas.gov.co', url: 'https://www.unidadvictimas.gov.co' },
              { label: 'cispalc.org',           url: 'https://www.cispalc.org' },
            ].map((e) => (
              <Link key={e.url} href={e.url} target="_blank" rel="noopener noreferrer"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5,
                  color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem',
                  textDecoration: 'none', mb: 0.5, '&:hover': { color: OV.amarillo } }}>
                {e.label}
                <OpenInNewIcon sx={{ fontSize: 12 }} />
              </Link>
            ))}
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="overline"
              sx={{ color: OV.amarillo, fontSize: '0.68rem', mb: 1.5, display: 'block' }}>
              Alianza
            </Typography>
            <Typography variant="body2"
              sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem', lineHeight: 1.7 }}>
              Unidad para las Víctimas<br />
              CISP — Comitato Internazionale<br />
              Per Lo Sviluppo Dei Popoli
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.08)', mb: 2 }} />

        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)' }}>
          © {new Date().getFullYear()} Observatorio de Acceso a la Reparación · Estrategia de Reparación Individual · CISP Colombia
        </Typography>
      </Box>
    </Box>
  );
}

export default function MainLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleNav = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      {/* ── AppBar oscura con logo blanco ──────────────── */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: OV.grisOscuro,
          borderBottom: `4px solid ${OV.amarillo}`,
          color: '#fff',
        }}
      >
        <Toolbar sx={{ gap: 2, minHeight: { xs: 60, sm: 68 } }}>

          {/* Logo blanco */}
          <Box component="img" src={logoBlanco} alt="Logo CISP Colombia"
            onClick={() => handleNav('/')}
            sx={{ height: 40, objectFit: 'contain', flexShrink: 0, cursor: 'pointer' }} />

          {/* Nombre */}
          <Box sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => handleNav('/')}>
            <Typography variant="h6" noWrap
              sx={{ fontWeight: 800, color: '#fff',
                fontSize: { xs: '0.85rem', sm: '0.98rem' }, lineHeight: 1.15 }}>
              Observatorio de Acceso a la Reparación
            </Typography>
            <Typography variant="caption"
              sx={{ color: 'rgba(255,255,255,0.55)', display: { xs: 'none', md: 'block' }, lineHeight: 1 }}>
              Estrategia de Reparación Individual · CISP Colombia
            </Typography>
          </Box>

          {/* Nav links — desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Box
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 0.75,
                    px: 1.75, py: 0.75, cursor: 'pointer', borderRadius: 1.5,
                    position: 'relative',
                    color: active ? OV.amarillo : 'rgba(255,255,255,0.8)',
                    fontWeight: active ? 800 : 600,
                    fontSize: '0.88rem',
                    transition: 'color 0.15s, background-color 0.15s',
                    '&:hover': { color: OV.amarillo, bgcolor: `${OV.amarillo}14` },
                    '&::after': active ? {
                      content: '""',
                      position: 'absolute',
                      bottom: -4, left: '12%', right: '12%',
                      height: 3, borderRadius: 2,
                      bgcolor: OV.amarillo,
                    } : {},
                  }}
                >
                  <Box component="img" src={item.iconPng} alt=""
                    sx={{
                      width: 18, height: 18, objectFit: 'contain',
                      filter: active
                        ? 'brightness(0) saturate(1) invert(82%) sepia(72%) saturate(800%) hue-rotate(5deg)'
                        : 'brightness(0) invert(1)',
                      opacity: active ? 1 : 0.75,
                    }} />
                  {item.label}
                </Box>
              );
            })}
          </Box>

          {/* Franja roja decorativa */}
          <Box sx={{
            width: 5, alignSelf: 'stretch', flexShrink: 0,
            background: `linear-gradient(180deg, ${OV.rojo} 0%, ${OV.rojoOscuro} 100%)`,
            borderRadius: 1,
            display: { xs: 'none', sm: 'block' },
          }} />

          {/* Hamburger — mobile */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { md: 'none' }, color: 'rgba(255,255,255,0.9)', ml: 0.5 }}
            aria-label="Abrir menú"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ── Drawer móvil ────────────────────────────────── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 270, bgcolor: OV.grisOscuro } }}
      >
        {/* Encabezado */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          px: 2.5, py: 2, borderBottom: `3px solid ${OV.amarillo}` }}>
          <Box component="img" src={logoBlanco} alt="Logo"
            sx={{ height: 36, objectFit: 'contain' }} />
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'rgba(255,255,255,0.7)' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Items */}
        <List sx={{ pt: 1.5 }}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  onClick={() => handleNav(item.path)}
                  sx={{
                    mx: 1.5, mb: 0.5, borderRadius: 2,
                    bgcolor: active ? `${OV.amarillo}18` : 'transparent',
                    borderLeft: active ? `4px solid ${OV.amarillo}` : '4px solid transparent',
                    gap: 1.5,
                    '&:hover': { bgcolor: `${OV.amarillo}12` },
                  }}
                >
                  <Box component="img" src={item.iconPng} alt=""
                    sx={{
                      width: 24, height: 24, objectFit: 'contain', flexShrink: 0,
                      filter: active
                        ? 'brightness(0) saturate(1) invert(82%) sepia(72%) saturate(800%) hue-rotate(5deg)'
                        : 'brightness(0) invert(1)',
                      opacity: active ? 1 : 0.6,
                    }} />
                  <Typography
                    sx={{
                      fontWeight: active ? 800 : 600,
                      fontSize: '0.92rem',
                      color: active ? OV.amarillo : 'rgba(255,255,255,0.85)',
                    }}
                  >
                    {item.label}
                  </Typography>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ mt: 'auto', px: 2.5, pb: 3 }}>
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
            Estrategia de Reparación Individual<br />CISP Colombia
          </Typography>
        </Box>
      </Drawer>

      {/* ── Contenido + Footer ──────────────────────────── */}
      <Box sx={{ flexGrow: 1, mt: { xs: '60px', sm: '68px' }, display: 'flex', flexDirection: 'column' }}>
        <Box component="main"
          sx={{
            flexGrow: 1,
            px: { xs: 2, md: 3.5 },
            pt: { xs: 2.5, md: 3.5 },
            pb: 4,
            backgroundColor: 'background.default',
          }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
