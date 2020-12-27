// import App from "next/app";
import Head from 'next/head';
import { AppProps } from 'next/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  return (
    <>
      <Head>
        {/* <link rel="preload" href="./../styles/fonts/gilroy.css" /> */}
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
