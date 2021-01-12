import { useContext, useState } from 'react';
import Link from 'next/link';

import context from '../../context/context';

import { IContext } from '../../context/Types';

import { LANGUAGES } from '../../constants/languages';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useContext(context) as IContext;

  const languagesItems = Object.keys(LANGUAGES);

  const [droplistOpen, setDroplistOpen] = useState<boolean>(false);

  const handleLanguageChange = (newLang: 'ru' | 'en') => {
    setLanguage(newLang);
    setDroplistOpen(false);
  };

  return (
    <div className="language-selector">
      <p role="presentation" onClick={() => setDroplistOpen(!droplistOpen)}>
        {LANGUAGES[language as 'ru' | 'en'].name}
      </p>
      {droplistOpen && (
        <div className="droplist-languages">
          {languagesItems.map((el) => (
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
