import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const previewHost = process.env.PREVIEW_HOST;

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT ?? 5173),
    allowedHosts: previewHost ? [previewHost] : [],
  },
});
