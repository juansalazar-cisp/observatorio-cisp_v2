import { Box, Chip, Typography } from '@mui/material';

export default function ModuloBanner({ titulo, descripcion, color = '#218380', icono, imagen, fondo }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        mb: 4,
        overflow: 'hidden',
        position: 'relative',
        minHeight: 160,
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {/* Fondo con patrón */}
      {fondo && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${fondo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.18,
          }}
        />
      )}

      {/* Overlay de color */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: fondo
            ? `linear-gradient(135deg, ${color}dd 0%, ${color}99 100%)`
            : `linear-gradient(135deg, ${color}22 0%, ${color}08 100%)`,
          borderLeft: fondo ? 'none' : `5px solid ${color}`,
        }}
      />

      {/* Contenido */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 3, md: 4 },
          py: 3,
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flex: 1 }}>
          {icono && (
            <Box sx={{ color: fondo ? '#fff' : color, mt: 0.5, flexShrink: 0, fontSize: 40 }}>
              {icono}
            </Box>
          )}
          <Box>
            <Chip
              label="Módulo"
              size="small"
              sx={{
                mb: 1,
                bgcolor: fondo ? 'rgba(255,255,255,0.25)' : `${color}20`,
                color: fondo ? '#fff' : color,
                fontWeight: 700,
                fontSize: '0.7rem',
                border: fondo ? '1px solid rgba(255,255,255,0.4)' : 'none',
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Alegreya Sans", serif',
                fontWeight: 700,
                color: fondo ? '#fff' : color,
                mb: 1,
                textShadow: fondo ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
              }}
            >
              {titulo}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 620,
                color: fondo ? 'rgba(255,255,255,0.92)' : 'text.secondary',
              }}
            >
              {descripcion}
            </Typography>
          </Box>
        </Box>

        {/* Imaginario decorativo */}
        {imagen && (
          <Box
            component="img"
            src={imagen}
            alt=""
            aria-hidden="true"
            sx={{
              width: { xs: 80, md: 130 },
              height: { xs: 80, md: 130 },
              objectFit: 'contain',
              opacity: fondo ? 0.35 : 0.22,
              filter: fondo ? 'brightness(10)' : 'none',
              flexShrink: 0,
              display: { xs: 'none', sm: 'block' },
            }}
          />
        )}
      </Box>
    </Box>
  );
}
