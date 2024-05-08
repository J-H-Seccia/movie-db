/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'*/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})



/*// https://vitejs.dev/config/
export default defineConfig({
  base: '/movie-db/',
  build: {
    outDir: 'movie-db'
  },
  plugins: [reactRefresh()],
})  
*/