import Link from 'next/link';
import { useRouter } from 'next/router';

import { TRANSLATE } from '../../constants/languages';

const NotFound: React.FC = () => {
  const { locale } = useRouter();
  return (
    <div className="not-found">
      <h1>{TRANSLATE[locale as 'ru' | 'en'].notFoundTitle}</h1>
      <p>
        {TRANSLATE[locale as 'ru' | 'en'].notFoundDescription + ' '}
        {TRANSLATE[locale as 'ru' | 'en'].continueShopping[0] + ' '}
        <Link href="/">
          {TRANSLATE[locale as 'ru' | 'en'].continueShopping[1]}
        </Link>
        {' ' + TRANSLATE[locale as 'ru' | 'en'].continueShopping[2]}
      </p>
    </div>
  );
};

export default NotFound;
