import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LANGUAGES } from '../../constants/languages';

const LanguageSelector: React.FC = () => {
  const router = useRouter();
  const { locale, locales, pathname, asPath } = router;

  const [droplistOpen, setDroplistOpen] = useState<boolean>(false);

  return (
    <div className="dropdown-selector">
      <p role="presentation" onClick={() => setDroplistOpen(!droplistOpen)}>
        {LANGUAGES[locale as 'ru' | 'en'].name}
      </p>
      {droplistOpen && (
        <div className="droplist">
          {(locales as string[]).map((el) => (
            <Link key={el} href={pathname} as={asPath} locale={el}>
              <p role="presentation" onClick={() => setDroplistOpen(false)}>
                {LANGUAGES[el as 'ru' | 'en'].name}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
