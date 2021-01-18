import { useState } from 'react';
import Link from 'next/link';

import { LANGUAGES } from '../../constants/languages';
import { useRouter } from 'next/router';

const LanguageSelector: React.FC = () => {
  const router = useRouter();
  const { locale, locales } = router;

  const [droplistOpen, setDroplistOpen] = useState<boolean>(false);

  const handleLanguageChange = (newLang: 'ru' | 'en') => {
    router.push(newLang);
    setDroplistOpen(false);
  };

  return (
    <div className="language-selector">
      <p role="presentation" onClick={() => setDroplistOpen(!droplistOpen)}>
        {LANGUAGES[locale as 'ru' | 'en'].name}
      </p>
      {droplistOpen && (
        <div className="droplist-languages">
          {(locales as string[]).map((el) => (
            <Link key={el} href={LANGUAGES[el as 'ru' | 'en'].path}>
              <p
                role="presentation"
                onClick={() => handleLanguageChange(el as 'ru' | 'en')}
              >
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
