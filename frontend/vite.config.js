import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
      proxy: {
        // Tells Vite to intercept any request starting with /cdn/thumbnails
        '/cdn/thumbnails': {
          target: 'https://vakjdimqmnumcocjjjmg.supabase.co',
          changeOrigin: true,
          // Rewrites the local URL to the actual Supabase bucket URL before fetching
          rewrite: (path) => path.replace(/^\/cdn\/thumbnails/, '/storage/v1/object/public/map-thumbnails')
        }
      }
    }
})
