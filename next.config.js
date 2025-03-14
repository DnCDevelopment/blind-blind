const withReactSvg = require('next-react-svg');
const path = require('path');

module.exports = withReactSvg({
  images: {
    deviceSizes: [1200],
    domains: ['content.blind-blind.com'],
    formats: ['image/avif', 'image/webp'],
  },
  include: path.resolve(__dirname, 'src/assets/svg'),
  future: {
    webpack5: true,
  },
  webpack(config) {
    return config;
  },
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
    localeDetection: false,
  },
});
