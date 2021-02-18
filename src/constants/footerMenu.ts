import { TRANSLATE } from '../constants/languages';

export const footerMenu = (locale: 'ru' | 'en') => [
  {
    link: '/',
    title: TRANSLATE[locale].aboutUs,
  },
  {
    link: '/',
    title: TRANSLATE[locale].sizeTable,
  },
  {
    link: '/',
    title: TRANSLATE[locale].deliveryInfo,
  },
  {
    link: '/',
    title: TRANSLATE[locale].returnAndExchange,
  },
  {
    link: '/',
    title: TRANSLATE[locale].contacts,
  },
  {
    link: '/',
    title: TRANSLATE[locale].giftCertificates,
  },
];
