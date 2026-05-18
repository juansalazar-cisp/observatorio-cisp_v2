import { useState, useEffect } from 'react';
import { useConfig } from '../utils/configData';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';

import imaginario1 from '../assets/imaginario1.png';
import fondo1 from '../assets/fondo1.png';
import iconosRedes from '../assets/iconos_redes.png';

const DRAWER_WIDTH = 258;

const navItems = [
  { label: 'Inicio',                   icon: <HomeIcon />,       path: '/',              color: '#218380' },
  { label: 'Visualización y Consulta', icon: <DashboardIcon />, path: '/visualizacion', color: '#218380' },
  { label: 'Reportes y Productos',     icon: <AssessmentIcon />, path: '/reportes',      color: '#218380' },
];

export default function MainLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { version } = useConfig();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Cabecera del sidebar con fondo y imaginario */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, #218380 0%, #1a6a68 100%)`,
          minHeight: 80,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        {/* Patrón de fondo sutil */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${fondo1})`,
            backgroundSize: 'cover',
            opacity: 0.12,
          }}
        />
        {/* Imaginario decorativo */}
        <Box
          component="img"
          src={imaginario1}
          alt=""
          aria-hidden="true"
          sx={{
            width: 44,
            height: 44,
            objectFit: 'contain',
            opacity: 0.55,
            filter: 'brightness(10)',
            flexShrink: 0,
            position: 'relative',
            zIndex: 1,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontFamily: '"Alegreya Sans", serif', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}
          >
            Observatorio
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', display: 'block', lineHeight: 1.3 }}>
            Planes de Vida · CISP
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Navegación */}
      <List sx={{ flex: 1, pt: 1, pb: 1 }}>
        {navItems.map((item) => {
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);
          return (
            <Tooltip key={item.path} title={item.label} placement="right" disableHoverListener={!isMobile}>
              <ListItemButton
                selected={isActive}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: `${item.color}18`,
                    borderLeft: `3px solid ${item.color}`,
                    pl: '13px',
                    '& .MuiListItemIcon-root': { color: item.color },
                    '& .MuiListItemText-primary': { color: item.color, fontWeight: 700 },
                  },
                  '&:hover': { backgroundColor: `${item.color}10` },
                }}
              >
                <ListItemIcon sx={{ minWidth: 38, color: isActive ? item.color : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: isActive ? 700 : 500 }}
                />
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      {/* Footer del sidebar: iconos de redes sociales */}
      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          px: 2,
          py: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.65rem', letterSpacing: 0.5 }}>
          CONTÁCTANOS
        </Typography>
        <Box
          component="img"
          src={iconosRedes}
          alt="Redes sociales y contacto"
          sx={{
            width: '100%',
            maxWidth: 200,
            objectFit: 'contain',
            opacity: 0.75,
            transition: 'opacity 0.2s',
            '&:hover': { opacity: 1 },
          }}
        />
        <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.6rem' }}>
          © {new Date().getFullYear()} CISP
        </Typography>
        <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.58rem', letterSpacing: 0.3 }}>
          v{version}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      {/* AppBar con patrón de fondo */}
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1, overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${fondo1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
          }}
        />
        <Toolbar sx={{ position: 'relative', zIndex: 1 }}>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
            <Box
              component="img"
              src={imaginario1}
              alt=""
              aria-hidden="true"
              sx={{
                width: 38,
                height: 38,
                objectFit: 'contain',
                opacity: 0.7,
                filter: 'brightness(10)',
                flexShrink: 0,
                display: { xs: 'none', sm: 'block' },
              }}
            />
            <Box>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontFamily: '"Alegreya Sans", serif',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  fontSize: { xs: '1rem', sm: '1.15rem' },
                }}
              >
                Observatorio de Planes de Vida
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.75, display: { xs: 'none', sm: 'block' } }}>
                Comitato Internazionale Per Lo Sviluppo Dei Popoli- CISP
              </Typography>
            </Box>
          </Box>

        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Contenido */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: '64px',
          backgroundColor: 'background.default',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
