import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        'brand-primary': {
          DEFAULT: '#1A56DB',
          dark: '#1140A6',
          light: '#EBF2FF',
        },
        'brand-accent': {
          DEFAULT: '#0EA5E9',
          light: '#E0F4FE',
        },
        'brand-navy': '#0D1F3C',
        'brand-slate': '#4A6080',
        'brand-muted': '#8AA0BC',
        'brand-off-white': '#F7F9FC',
        'brand-border': '#D1DEEF',
        'brand-success': '#16A34A',
        'brand-error': '#DC2626',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
