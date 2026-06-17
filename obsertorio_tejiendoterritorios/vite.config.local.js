import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function removeModuleType() {
  return {
    name: 'remove-module-type',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html
          .replace(/ type="module"/g, '')
          .replace(/ crossorigin/g, '');
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), removeModuleType()],
  base: './',
  define: {
    __LOCAL_BUILD__: true,
  },
  build: {
    outDir: 'build_local',
    modulePreload: false,
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'App',
        inlineDynamicImports: true,
      },
    },
  },
});
