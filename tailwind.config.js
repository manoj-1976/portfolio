
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eefff9',
          100: '#c6ffe9',
          200: '#85ffd1',
          300: '#3dfcb2',
          400: '#00eb8d', // Main primary color (slightly adjusted from original)
          500: '#00cc7d',
          600: '#00a368',
          700: '#007f53',
          800: '#006443',
          900: '#005239',
          950: '#002e20',
        },
        dark: {
          950: '#0a0a0a', // Darkest (background for sections)
          900: '#111111', // Main background
          800: '#1a1a1a', // Card backgrounds
          700: '#2a2a2a', // Borders
          600: '#3a3a3a', // Lighter borders
          500: '#5a5a5a', // Disabled text
          400: '#8a8a8a', // Muted text
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 235, 141, 0.15)',
        'glow-lg': '0 0 30px rgba(0, 235, 141, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dots': 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%232a2a2a\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
      },
    },
  },
  plugins: [],
};
