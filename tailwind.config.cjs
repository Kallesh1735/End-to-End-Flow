module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0B1120',
        'glass-1': 'rgba(255,255,255,0.04)',
        'glass-2': 'rgba(255,255,255,0.02)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
