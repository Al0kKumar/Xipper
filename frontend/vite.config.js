import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'  // <-- Import the React plugin
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),  // <-- Add this line
    tailwindcss(),
  ],
})
