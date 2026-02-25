import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#f36f20',
        bg: '#0f0f0f'
      }
    }
  },
  plugins: [],
} satisfies Config
