import { createTheme } from '@mui/material/styles';

// ── Paleta Tejiendo Territorios ───────────────────────────
// Principal
// Naranja RGB(255,147,49)  Verde RGB(107,163,0)  Crema RGB(255,233,189)
// Secundaria
// Marino RGB(28,31,58)  Púrpura RGB(122,62,157)  Rojo RGB(191,22,0)

const TT = {
  naranja:  '#FF9331',  // principal — acción, énfasis
  verde:    '#6BA300',  // principal — naturaleza, confirmación
  crema:    '#FFE9BD',  // principal — fondos cálidos, suaves
  marino:   '#1C1F3A',  // secundario — texto oscuro, encabezados
  purpura:  '#7A3E9D',  // secundario — acento complementario
  rojo:     '#BF1600',  // secundario — alerta, advertencia
};

// Paleta CISP institucional (no modificar)
const CISP = {
  amarillo:   '#FFB600',
  rojo:       '#D2232A',
  verde_agua: '#218380',
  verde:      '#3E7F00',
  vino:       '#8F2D56',
  azul_claro: '#73D2DE',
};

const theme = createTheme({
  palette: {
    primary:    { main: TT.naranja,  contrastText: '#fff' },
    secondary:  { main: TT.verde,    contrastText: '#fff' },
    error:      { main: TT.rojo },
    info:       { main: TT.purpura },
    background: { default: '#FAFAF7', paper: '#FFFFFF' },
    text:       { primary: TT.marino, secondary: '#4A5568' },
    tt: TT,
    cisp: CISP,
  },
  typography: {
    fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    // Fraunces para títulos — carácter editorial con anclaje cultural
    h1: { fontFamily: '"Fraunces", serif', fontWeight: 700 },
    h2: { fontFamily: '"Fraunces", serif', fontWeight: 700 },
    h3: { fontFamily: '"Fraunces", serif', fontWeight: 600 },
    h4: { fontFamily: '"Fraunces", serif', fontWeight: 600 },
    h5: { fontFamily: '"Fraunces", serif', fontWeight: 600 },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    button:    { fontWeight: 700, textTransform: 'none' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: `0 2px 12px rgba(28,31,58,0.18)` },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: '0 2px 16px rgba(28,31,58,0.07)' },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600 } },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, fontWeight: 700, textTransform: 'none' },
      },
    },
  },
});

export default theme;
export { TT, CISP };
