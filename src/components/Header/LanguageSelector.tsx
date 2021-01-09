import { useContext, useState } from 'react';

import context from '../../context/context';

import { IContext } from '../../context/Types';

import { LANGUAGES } from '../../constants/languages';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useContext(context) as IContext;

  const languagesItems = Object.keys(LANGUAGES);

  const [droplistOpen, setDroplistOpen] = useState<boolean>(false);

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setDroplistOpen(false);
  };

  return (
    <div className="language-selector">
      <p role="presentation" onClick={() => setDroplistOpen(!droplistOpen)}>
        {LANGUAGES[language as 'uk' | 'ru'].name}
      </p>
      {droplistOpen && (
        <div className="droplist-languages">
          {languagesItems.map((el) => (
            <p
              key={el}
              role="presentation"
              onClick={() => handleLanguageChange(el)}
            >
              {LANGUAGES[el as 'uk' | 'ru'].name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
