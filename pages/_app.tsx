import { AppProps } from 'next/app';

import '../styles/main.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  return <Component {...pageProps} />;
};

export default MyApp;
