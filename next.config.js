const withReactSvg = require('next-react-svg');
const path = require('path');

module.exports = withReactSvg({
  images: {
    deviceSizes: [1800],
    domains: ['content.blind-blind.com']
  },
  include: path.resolve(__dirname, 'src/assets/svg'),
  webpack(config) {
    return config;
  },
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
  }
});
