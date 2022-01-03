module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          light: 'var(--color-primary-light)',
        },
        bg: {
          DEFAULT: 'var(--color-bg)',
          dark: 'var(--color-bg-dark)',
          darker: 'var(--color-bg-darker)',
          light: 'var(--color-bg-light)',
          lighter: 'var(--color-bg-lighter)',
          lightest: 'var(--color-bg-lightest)',
        },
        white: 'var(--color-white)',
      },
      ringColor: {
        DEFAULT: '#62a5dd',
        primary: 'var(--color-primary)'
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
  ],
};
