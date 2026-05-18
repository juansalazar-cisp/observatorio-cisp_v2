import { useState, useEffect, useCallback } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CollectionsIcon from '@mui/icons-material/Collections';

import fondo1 from '../../assets/fondo1.png';
import fondo2 from '../../assets/fondo2.png';
import fondo3 from '../../assets/fondo3.png';
import fondo4 from '../../assets/fondo4.png';
import { CISP } from '../../theme';

// Carga dinámica de la galería. Al poner imágenes en src/assets/galeria/ se cargan automáticamente.
const galeriaModules = import.meta.glob('../../assets/galeria/*.{png,jpg,jpeg,webp,PNG,JPG}', { eager: true });
const galeriaImagenes = Object.values(galeriaModules).map((m) => ({ src: m.default, alt: '' }));

const placeholders = [
  { src: fondo1, alt: 'Fondo patrón verde agua', esPlaceholder: true },
  { src: fondo2, alt: 'Fondo patrón amarillo',   esPlaceholder: true },
  { src: fondo3, alt: 'Fondo patrón rojo',        esPlaceholder: true },
  { src: fondo4, alt: 'Fondo patrón vino',         esPlaceholder: true },
];

const imagenes = galeriaImagenes.length > 0 ? galeriaImagenes : placeholders;
const INTERVALO_MS = 4500;

export default function CarruselGaleria() {
  const [actual, setActual] = useState(0);
  const [animando, setAnimando] = useState(false);

  const ir = useCallback((indice) => {
    if (animando) return;
    setAnimando(true);
    setTimeout(() => {
      setActual((indice + imagenes.length) % imagenes.length);
      setAnimando(false);
    }, 200);
  }, [animando]);

  const siguiente = useCallback(() => ir(actual + 1), [actual, ir]);
  const anterior  = useCallback(() => ir(actual - 1), [actual, ir]);

  // Avance automático
  useEffect(() => {
    const timer = setInterval(siguiente, INTERVALO_MS);
    return () => clearInterval(timer);
  }, [siguiente]);

  const esPlaceholder = imagenes[actual]?.esPlaceholder;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        aspectRatio: '16/7',
        bgcolor: '#1a1a1a',
        userSelect: 'none',
      }}
    >
      {/* Imagen activa */}
      <Box
        component="img"
        src={imagenes[actual].src}
        alt={imagenes[actual].alt}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: animando ? 0 : 1,
          transition: 'opacity 0.4s ease',
          display: 'block',
        }}
      />

      {/* Overlay degradado inferior */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '45%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Aviso cuando es placeholder */}
      {esPlaceholder && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            pointerEvents: 'none',
          }}
        >
          <CollectionsIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.5)' }} />
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, textAlign: 'center' }}>
            Agrega fotos en src/assets/galeria/
          </Typography>
        </Box>
      )}

      {/* Flecha izquierda */}
      <IconButton
        onClick={anterior}
        size="small"
        sx={{
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(4px)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.3)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.32)' },
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      {/* Flecha derecha */}
      <IconButton
        onClick={siguiente}
        size="small"
        sx={{
          position: 'absolute',
          right: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(4px)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.3)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.32)' },
        }}
      >
        <ChevronRightIcon />
      </IconButton>

      {/* Indicadores / puntos */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
        }}
      >
        {imagenes.map((_, i) => (
          <Box
            key={i}
            onClick={() => ir(i)}
            sx={{
              width: i === actual ? 24 : 8,
              height: 8,
              borderRadius: 4,
              bgcolor: i === actual ? CISP.amarillo : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </Box>

      {/* Contador */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 14,
          bgcolor: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(4px)',
          color: 'rgba(255,255,255,0.85)',
          px: 1.5,
          py: 0.5,
          borderRadius: 2,
          fontSize: '0.75rem',
          fontWeight: 600,
          fontFamily: '"Nunito Sans", sans-serif',
        }}
      >
        {actual + 1} / {imagenes.length}
      </Box>
    </Box>
  );
}
