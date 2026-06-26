import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(30 50% 50%)',
        background: 'hsl(20 10% 7%)',
        surface: 'hsl(20 10% 10%)',
        border: 'hsl(30 50% 50% / 0.2)',
        muted: 'hsl(35 20% 40%)',
        foreground: 'hsl(35 30% 90%)',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
