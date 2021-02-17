import Link from 'next/link';
import { useRouter } from 'next/router';
import { TRANSLATE } from '../../constants/languages';

const LinkList: React.FC = () => {
  const { locale } = useRouter();

  return (
    <div className="link-list">
      <ul>
        <li>
          <Link href="/">{TRANSLATE[locale as 'ru' | 'en'].aboutUs}</Link>
        </li>
        <li>
          <Link href="/">{TRANSLATE[locale as 'ru' | 'en'].sizeTable}</Link>
        </li>
        <li>
          <Link href="/">{TRANSLATE[locale as 'ru' | 'en'].deliveryInfo}</Link>
        </li>
        <li>
          <Link href="/">
            {TRANSLATE[locale as 'ru' | 'en'].returnAndExchange}
          </Link>
        </li>
        <li>
          <Link href="/">{TRANSLATE[locale as 'ru' | 'en'].contacts}</Link>
        </li>
        <li>
          <Link href="/">
            {TRANSLATE[locale as 'ru' | 'en'].giftCertificates}
          </Link>
        </li>
        <li>
          <Link href="/">
            {TRANSLATE[locale as 'ru' | 'en'].pressInformationPage}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LinkList;
