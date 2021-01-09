import { useContext } from 'react';

import context from '../../context/context';

import { IContext } from '../../context/Types';

import { LANGUAGES } from '../../constants/languages';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useContext(context) as IContext;

  const languagesItems = Object.keys(LANGUAGES);

  const handleLanguageChange = () => {
    const languagesIndex = languagesItems.findIndex(
      (lang) => language === lang
    );

    setLanguage(
      languagesItems[
        languagesIndex == languagesItems.length - 1 ? 0 : languagesIndex + 1
      ]
    );
  };

  return (
    <div className="language-selector">
      <p role="presentation" onClick={handleLanguageChange}>
        {LANGUAGES[language as 'uk' | 'ru'].name}
      </p>
    </div>
  );
};

export default LanguageSelector;
