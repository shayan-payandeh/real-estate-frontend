/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');
const withMT = require('@material-tailwind/react/utils/withMT');

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: [
    './src/component/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // gridTemplateColumns: {
      //   fluid: 'repeat(auto-fit, minmax(10rem, 1fr))',
      // },
      colors: {
        primary: {
          // 900: withOpacity('--color-primary-900'),
          // 800: withOpacity('--color-primary-800'),
          // 700: withOpacity('--color-primary-700'),
          // 600: withOpacity('--color-primary-600'),
          500: withOpacity('--color-primary-500'),
          400: withOpacity('--color-primary-400'),
          300: withOpacity('--color-primary-300'),
          200: withOpacity('--color-primary-200'),
          100: withOpacity('--color-primary-100'),
          50: withOpacity('--color-primary-50'),
        },
        secondary: {
          900: withOpacity('--color-secondary-900'),
          800: withOpacity('--color-secondary-800'),
          700: withOpacity('--color-secondary-700'),
          600: withOpacity('--color-secondary-600'),
          500: withOpacity('--color-secondary-500'),
          400: withOpacity('--color-secondary-400'),
          300: withOpacity('--color-secondary-300'),
          200: withOpacity('--color-secondary-200'),
          100: withOpacity('--color-secondary-100'),
        },
        success: withOpacity('--color-success'),
        warning: withOpacity('--color-warning'),
        error: withOpacity('--color-error'),
      },
      fontFamily: {
        sans: ['var(--font-vazir)', ...fontFamily.sans],
      },
      container: {
        center: true,
      },
      boxShadow: {
        'input-focus': '0 12px 24px -8px rgb(var(--color-primary-300))',
      },

      fontSize: {
        // dynamicIcon: 'clamp(1.2rem, 0.9rem + 1.5vw, 1.5rem)',

        header: '',
        menuTitle: 'clamp(0.85rem, 0.8093rem + 0.2034vw, 1rem)',
        title: 'clamp(0.8125rem, 0.7916rem + 0.1045vw, 0.9rem)',
        context: 'clamp(0.84375rem, 0.8243rem + 0.097vw, 0.925rem)',
        propertyInfo: 'clamp(0.75rem, 0.625rem + 0.625vw, 0.875rem)',
        propertyInfoTitle: 'clamp(0.625rem, 0.4063rem + 1.0938vw, 0.84375rem)',
        sortTitle: 'clamp(0.625rem, 0.5679rem + 0.2857vw, 0.75rem)',
        // menu_mobile: 'clamp(0.8125rem, 0.7841rem + 0.142vw, 0.875rem)',
      },
    },
  },
  plugins: [],
};
