import { TRANSLATE } from '../constants/languages';

export const footerMenu = (locale: 'ru' | 'en') => [
  {
    link: '/o-nas',
    title: TRANSLATE[locale].aboutUs,
  },
  {
    link: '/table-razmer',
    title: TRANSLATE[locale].sizeTable,
  },
  {
    link: '/informaciya-o-dostavke',
    title: TRANSLATE[locale].deliveryInfo,
  },
  {
    link: '/usloviya-soglasheniya',
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
