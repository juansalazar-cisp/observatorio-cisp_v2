import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/obsevatorio-tejiendoterritorios/' : '/tejiendo-territorios/',
  define: {
    __LOCAL_BUILD__: false,
  },
}));
