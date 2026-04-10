<<<<<<< HEAD
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
=======
import fs from 'node:fs/promises';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const projectRoot = path.resolve();
const clientAssetsRoot = 'C:/Users/lucas/Downloads/occhion_cliente';

function inferContentType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.svg':
      return 'image/svg+xml';
    case '.heic':
      return 'image/heic';
    case '.jpg':
    case '.jpeg':
    default:
      return 'image/jpeg';
  }
}

function clientAssetsPlugin() {
  return {
    name: 'client-assets-proxy',
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/client-assets/')) {
          return next();
        }

        const relativePath = decodeURIComponent(req.url.slice('/client-assets/'.length).split('?')[0]);
        const absolutePath = path.resolve(clientAssetsRoot, relativePath);
        const normalizedRoot = path.resolve(clientAssetsRoot);

        if (!absolutePath.startsWith(normalizedRoot)) {
          res.statusCode = 403;
          res.end('Forbidden');
          return;
        }

        try {
          const asset = await fs.readFile(absolutePath);
          res.setHeader('Content-Type', inferContentType(absolutePath));
          res.end(asset);
        } catch {
          res.statusCode = 404;
          res.end();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [clientAssetsPlugin(), react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    fs: {
      allow: [projectRoot, clientAssetsRoot],
    },
  },
>>>>>>> edacafd (feat: initial Occhion site (clean structure + catalog))
});
