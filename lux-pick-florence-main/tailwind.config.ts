import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white: '#FFFFFF',
          pink: '#FF66C4',
          pinkSoft: '#FFE3F2',
          black: '#111111',
          gray: '#F7F7F7',
          grayMid: '#E4E4E4',
          graySlate: '#6B6B6B',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        fadeUp: 'fadeUp 0.8s ease forwards',
      },
      boxShadow: {
        luxe: '0 20px 60px -15px rgba(17,17,17,0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
