import { AppProps } from 'next/app';
import { useState } from 'react';

import '../styles/main.scss';

import context from '../src/context/context';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  const [language, setLanguage] = useState<string>('ru');

  return (
    <context.Provider value={{ language, setLanguage }}>
      <Component {...pageProps} />
    </context.Provider>
  );
};

export default MyApp;
