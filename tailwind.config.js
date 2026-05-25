/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        bg: '#f4f6fa',
        surface: '#ffffff',
        border: '#e4e8ef',
        primary: '#4f46e5',
        'primary-light': '#eef2ff',
        dark: '#111827',
        muted: '#6b7280',
        success: '#059669',
        warning: '#d97706',
        danger: '#dc2626',
      },
      boxShadow: {
        card: '0 1px 4px rgba(0,0,0,0.07)',
        modal: '0 20px 60px rgba(0,0,0,0.15)',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        slideUp: { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
      },
    },
  },
  plugins: [],
}
