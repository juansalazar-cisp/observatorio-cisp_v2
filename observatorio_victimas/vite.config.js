import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/observatorio-victimas/' : '/observatorio-victimas/',
  define: {
    __LOCAL_BUILD__: false,
  },
}));
