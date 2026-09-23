import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { chatProxyPlugin } from './server/chatProxyPlugin'
import { cspPlugin } from './server/cspPlugin'

export default defineConfig({
  plugins: [react(), chatProxyPlugin(), cspPlugin()],
})
