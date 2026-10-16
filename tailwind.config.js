/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens, resolved from the CSS custom properties in index.css.
        page: 'rgb(var(--page) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-soft': 'rgb(var(--surface-soft) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-soft': 'rgb(var(--ink-soft) / <alpha-value>)',
        'ink-faint': 'rgb(var(--ink-faint) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-deep': 'rgb(var(--accent-deep) / <alpha-value>)',
        'accent-soft': 'rgb(var(--accent-soft) / <alpha-value>)',
        'on-accent': 'rgb(var(--on-accent) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1.375rem',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        hero: 'var(--shadow-hero)',
      },
      maxWidth: {
        column: '30rem',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translate3d(0, 14px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        bloom: {
          from: { opacity: '0', transform: 'scale(0.94)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        sweep: {
          from: { opacity: '0', clipPath: 'inset(0 100% 0 0)' },
          to: { opacity: '1', clipPath: 'inset(0 0 0 0)' },
        },
      },
      animation: {
        rise: 'rise 0.62s cubic-bezier(0.22, 1, 0.36, 1) both',
        bloom: 'bloom 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        sweep: 'sweep 0.75s cubic-bezier(0.33, 1, 0.68, 1) both',
      },
    },
  },
  plugins: [],
};
