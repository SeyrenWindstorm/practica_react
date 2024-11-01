import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/apiC': 'http://localhost:8071', // Redirige las solicitudes de /apiC al backend
      '/apiR': 'http://localhost:8001', // Redirige las solicitudes de /apiR al backend
      '/apiL': 'http://localhost:8018'
    },
  },
});