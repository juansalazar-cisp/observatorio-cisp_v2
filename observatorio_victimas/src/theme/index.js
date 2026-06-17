import { createTheme } from '@mui/material/styles';

// ── Paleta Institucional · Observatorio de Víctimas ──────
// Según Manual de Identidad Visual
// Amarillo Principal   #FEC707   RGB(255,200,0)
// Rojo Institucional   #CD1719   RGB(207,10,44)
// Gris Oscuro (texto)  #575756   RGB(87,87,78)
// Gris Medio (bordes)  #9D9D9C   RGB(157,157,156)
// Blanco (fondos)      #FFFFFF

const OV = {
  amarillo:    '#FEC707',  // principal — acción, énfasis, CTAs
  rojo:        '#CD1719',  // institucional — énfasis secundario
  grisOscuro:  '#575756',  // texto principal, fondos oscuros
  grisMedio:   '#9D9D9C',  // bordes, elementos deshabilitados
  blanco:      '#FFFFFF',
  fondoClaro:  '#F8F9FA',  // fondo de página
  rojoOscuro:  '#9B1215',  // variante oscura — profundidad
  amarilloOsc: '#C49A00',  // variante oscura del amarillo
};

const theme = createTheme({
  palette: {
    primary:    { main: OV.amarillo, contrastText: OV.grisOscuro },
    secondary:  { main: OV.rojo,     contrastText: '#fff' },
    text:       { primary: OV.grisOscuro, secondary: '#777777' },
    background: { default: OV.fondoClaro, paper: OV.blanco },
    divider:    OV.grisMedio + '55',
    ov: OV,
  },
  typography: {
    fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 900 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    button:    { fontWeight: 700, textTransform: 'none' },
    overline:  { fontWeight: 700, letterSpacing: '0.1em' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: '0 2px 8px rgba(87,87,86,0.12)' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: '0 2px 12px rgba(87,87,86,0.08)' },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 700 } },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 700, textTransform: 'none' },
        containedPrimary: {
          color: OV.grisOscuro,
          '&:hover': { backgroundColor: OV.amarilloOsc, color: '#fff' },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&::before': { display: 'none' },
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
export { OV };
