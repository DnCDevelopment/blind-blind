import { TRANSLATE } from '../constants/languages';

export const footerMenu = (locale: 'ru' | 'en') => [
  {
    link: '/page/about',
    title: TRANSLATE[locale].aboutUs,
  },
  {
    link: '/',
    title: TRANSLATE[locale].sizeTable,
  },
  {
    link: '/page/delivery',
    title: TRANSLATE[locale].deliveryInfo,
  },
  {
    link: '/page/return-policy',
    title: TRANSLATE[locale].returnAndExchange,
  },
  {
    link: '/contacts',
    title: TRANSLATE[locale].contacts,
  },
  {
    link: '/voucher',
    title: TRANSLATE[locale].giftCertificates,
  },
];
