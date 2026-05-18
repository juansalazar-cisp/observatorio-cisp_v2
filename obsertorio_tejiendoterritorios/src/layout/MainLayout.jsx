import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Box, CssBaseline, IconButton, Toolbar, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import MenuIcon         from '@mui/icons-material/Menu';
import HomeIcon         from '@mui/icons-material/Home';
import HandshakeIcon    from '@mui/icons-material/Handshake';
import TimelineIcon     from '@mui/icons-material/Timeline';
import GroupsIcon       from '@mui/icons-material/Groups';
import AutoStoriesIcon  from '@mui/icons-material/AutoStories';

import { TT } from '../theme';
import { useConfig } from '../utils/configData';

const TASKBAR_H = 62;

const taskbarItems = [
  { label: 'Inicio',                     icon: HomeIcon,        path: '/',                         color: TT.naranja },
  { label: 'Sobre el Convenio',          icon: HandshakeIcon,   path: '/sobre-el-convenio',        color: TT.verde },
  { label: 'Tejiendo Trayectorias',      icon: TimelineIcon,    path: '/tejiendo-trayectorias',    color: TT.naranja },
  { label: 'Iniciativas Comunitarias',   icon: GroupsIcon,      path: '/iniciativas-comunitarias', color: TT.purpura },
  { label: 'Índice Cultura y Educación', icon: AutoStoriesIcon, path: '/indice-cultura-educacion', color: TT.verde },
];

export default function MainLayout() {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const { version } = useConfig();
  const navigate    = useNavigate();
  const location    = useLocation();

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ bgcolor: TT.marino, borderBottom: `3px solid ${TT.naranja}` }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.4, flexShrink: 0 }}>
              {[TT.naranja, TT.verde, TT.purpura].map((c) => (
                <Box key={c} sx={{ width: 6, height: 32, borderRadius: 1, bgcolor: c }} />
              ))}
            </Box>
            <Box>
              <Typography variant="h6" noWrap
                sx={{ fontFamily: '"Fraunces", serif', fontWeight: 700, lineHeight: 1.1,
                  fontSize: { xs: '1rem', sm: '1.1rem' }, color: '#fff' }}>
                Tejiendo Territorios
              </Typography>
              <Typography variant="caption"
                sx={{ color: TT.crema, opacity: 0.8, display: { xs: 'none', sm: 'block' } }}>
                Comitato Internazionale Per Lo Sviluppo Dei Popoli · CISP
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 2, md: 3.5 },
          pt: { xs: 2, md: 3.5 },
          pb: `${TASKBAR_H + 48}px`,
          mt: '64px',
          backgroundColor: 'background.default',
          minHeight: `calc(100vh - 64px)`,
        }}
      >
        <Outlet />
      </Box>

      {/* Barra inferior tipo taskbar */}
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          height: TASKBAR_H,
          bgcolor: TT.marino,
          borderTop: `3px solid ${TT.naranja}30`,
          display: 'flex',
          alignItems: 'stretch',
          zIndex: (t) => t.zIndex.appBar,
          boxShadow: '0 -4px 20px rgba(28,31,58,0.25)',
        }}
      >
        {taskbarItems.map((item) => {
          const active = isActive(item.path);
          const Icon   = item.icon;
          return (
            <Box
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                flex: 1,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 0.4, cursor: 'pointer', position: 'relative',
                color: active ? item.color : 'rgba(255,255,255,0.45)',
                transition: 'color 0.18s, background-color 0.18s',
                '&:hover': { color: item.color, bgcolor: `${item.color}12` },
                '&::before': active ? {
                  content: '""',
                  position: 'absolute', top: 0, left: '20%', right: '20%',
                  height: 3, borderRadius: '0 0 3px 3px',
                  bgcolor: item.color,
                } : {},
              }}
            >
              <Icon sx={{ fontSize: { xs: 20, sm: 22 } }} />
              <Typography
                variant="caption"
                sx={{
                  fontSize: { xs: '0.55rem', sm: '0.62rem' },
                  fontWeight: active ? 700 : 500,
                  lineHeight: 1.2, textAlign: 'center',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
