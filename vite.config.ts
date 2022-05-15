import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [react(), tsConfigPaths(), checker({ typescript: true })],
  server: {
    port: 3200,
  },
});
