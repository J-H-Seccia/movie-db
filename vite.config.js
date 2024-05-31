import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode ('development', 'production', etc.)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/movie-db/',
    build: {
      outDir: 'movie-db'
    },
    define: {
      'process.env.SOME_KEY': JSON.stringify(env.SOME_KEY)
    },
    plugins: [react()]
  };
});
