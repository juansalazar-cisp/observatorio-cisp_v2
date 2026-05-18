import { useState, useEffect, useCallback } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon  from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CollectionsIcon  from '@mui/icons-material/Collections';

import { TT } from '../../theme';

// Carga automática — al agregar imágenes a src/assets/galeria/ aparecen sin tocar código
const galeriaModules = import.meta.glob(
  '../../assets/galeria/*.{png,jpg,jpeg,webp,PNG,JPG}',
  { eager: true }
);
const imagenes = Object.values(galeriaModules).map((m) => ({ src: m.default }));

const INTERVALO_MS = 4500;

export default function CarruselGaleria() {
  const [actual,   setActual]   = useState(0);
  const [animando, setAnimando] = useState(false);

  const ir = useCallback((indice) => {
    if (animando || imagenes.length === 0) return;
    setAnimando(true);
    setTimeout(() => {
      setActual((indice + imagenes.length) % imagenes.length);
      setAnimando(false);
    }, 220);
  }, [animando]);

  const siguiente = useCallback(() => ir(actual + 1), [actual, ir]);
  const anterior  = useCallback(() => ir(actual - 1), [actual, ir]);

  useEffect(() => {
    if (imagenes.length === 0) return;
    const t = setInterval(siguiente, INTERVALO_MS);
    return () => clearInterval(t);
  }, [siguiente]);

  // Sin imágenes
  if (imagenes.length === 0) {
    return (
      <Box sx={{ width: '100%', aspectRatio: '16/7', borderRadius: 3, bgcolor: `${TT.marino}08`,
        border: `2px dashed ${TT.naranja}30`, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
        <CollectionsIcon sx={{ fontSize: 48, color: TT.naranja, opacity: 0.35 }} />
        <Typography variant="body2" color="text.disabled">
          Agrega fotos en src/assets/galeria/
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative', width: '100%',
        borderRadius: 3, overflow: 'hidden',
        aspectRatio: '16/7', bgcolor: TT.marino,
        userSelect: 'none',
      }}
    >
      {/* Imagen activa */}
      <Box
        component="img"
        src={imagenes[actual].src}
        alt=""
        sx={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          display: 'block',
          opacity: animando ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Overlay inferior */}
      <Box
        sx={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
          background: `linear-gradient(to top, rgba(28,31,58,0.65) 0%, transparent 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Banda de color superior — identidad visual */}
      <Box
        sx={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(90deg, ${TT.naranja} 0%, ${TT.verde} 50%, ${TT.purpura} 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Flecha izquierda */}
      <IconButton
        onClick={anterior}
        size="small"
        sx={{
          position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)',
          color: '#fff', border: '1px solid rgba(255,255,255,0.25)',
          '&:hover': { bgcolor: `${TT.naranja}55` },
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      {/* Flecha derecha */}
      <IconButton
        onClick={siguiente}
        size="small"
        sx={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)',
          color: '#fff', border: '1px solid rgba(255,255,255,0.25)',
          '&:hover': { bgcolor: `${TT.naranja}55` },
        }}
      >
        <ChevronRightIcon />
      </IconButton>

      {/* Indicadores */}
      <Box
        sx={{
          position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 0.75,
        }}
      >
        {imagenes.map((_, i) => (
          <Box
            key={i}
            onClick={() => ir(i)}
            sx={{
              width: i === actual ? 28 : 8, height: 8,
              borderRadius: 4, cursor: 'pointer',
              bgcolor: i === actual ? TT.naranja : 'rgba(255,255,255,0.45)',
              border: `1px solid rgba(255,255,255,0.25)`,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Box>

      {/* Contador */}
      <Box
        sx={{
          position: 'absolute', top: 12, right: 14,
          bgcolor: 'rgba(28,31,58,0.5)', backdropFilter: 'blur(6px)',
          color: 'rgba(255,255,255,0.9)',
          px: 1.5, py: 0.5, borderRadius: 2,
          fontSize: '0.72rem', fontWeight: 700,
          fontFamily: '"Nunito Sans", sans-serif',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        {actual + 1} / {imagenes.length}
      </Box>
    </Box>
  );
}
