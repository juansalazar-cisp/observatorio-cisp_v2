import { createTheme } from '@mui/material/styles';

// Paleta CISP
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
    primary:   { main: CISP.verde_agua, contrastText: '#fff' },
    secondary: { main: CISP.amarillo,  contrastText: '#1A1A1A' },
    error:     { main: CISP.rojo },
    success:   { main: CISP.verde },
    info:      { main: CISP.azul_claro },
    background: { default: '#F4F6F5', paper: '#FFFFFF' },
    text:       { primary: '#1A1A1A', secondary: '#4A5568' },
    cisp: CISP,
  },
  typography: {
    fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Alegreya Sans", serif', fontWeight: 700 },
    h2: { fontFamily: '"Alegreya Sans", serif', fontWeight: 700 },
    h3: { fontFamily: '"Alegreya Sans", serif', fontWeight: 600 },
    h4: { fontFamily: '"Alegreya Sans", serif', fontWeight: 600 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    button:    { fontWeight: 700, textTransform: 'none' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: '0 2px 8px rgba(33,131,128,0.18)' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
  },
});

export default theme;
export { CISP };
