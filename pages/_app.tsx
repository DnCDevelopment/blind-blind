import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import context from '../src/context/context';

import { LANGUAGES } from '../src/constants/languages';

import '../styles/main.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const router = useRouter();

  useEffect(() => {
    const curLang = Object.keys(LANGUAGES).find(
      (key) => LANGUAGES[key].path === router.pathname
    );

    setLanguage(curLang as 'ru' | 'en');
  }, [router.pathname]);

  return (
    <context.Provider value={{ language, setLanguage }}>
      <Component {...pageProps} />
    </context.Provider>
  );
};

export default MyApp;
