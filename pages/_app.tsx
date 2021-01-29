import App, { AppContext } from 'next/app';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { AppInitialProps } from 'next/dist/next-server/lib/utils';
import { useContext, useState } from 'react';

import {
  ICockpitCollectionsRaw,
  ICockpitRunwaysAndLookbooksRaw,
} from '../src/cockpitTypes';
import Header from '../src/components/Header/Header';
import { cartContext } from '../src/context/cartContext';
import { indexContext } from '../src/context/cockpitContext';

import { IAppProps } from '../src/pagesTypes';

import { getCockpitCollections } from '../src/utils/getCockpitData';

import '../styles/main.scss';

const MyApp = ({
  Component,
  pageProps,
  props: { collections, lookbooks, runways },
}: AppProps & IAppProps): JSX.Element => {
  const curCartContext = useContext(cartContext);
  const [cartState, setCartState] = useState(
    curCartContext ? curCartContext.cart : []
  );

  return (
    <indexContext.Provider
      value={{
        collectionsData: collections,
        lookbooksData: lookbooks,
        runwaysData: runways,
      }}
    >
      <cartContext.Provider
        value={{
          cart: cartState,
          addItem: (id) => {
            setCartState([...cartState, id]);
          },
        }}
      >
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
      </cartContext.Provider>
    </indexContext.Provider>
  );
};

MyApp.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps & IAppProps> => {
  const appProps = await App.getInitialProps(appContext);

  const { locale, defaultLocale } = appContext.router;

  const collectionNames = ['Collections', 'Runways', 'Lookbooks'];
  const [
    cockpitDataCollections,
    cockpitDataRunways,
    cockpitDataLookbooks,
  ] = await getCockpitCollections(collectionNames);

  const runways = cockpitDataRunways.entries.map(
    (el: ICockpitRunwaysAndLookbooksRaw) => {
      return {
        title: locale === defaultLocale ? el.title : el.title_en,
        link: locale === defaultLocale ? el.link : el.link_en,
      };
    }
  );

  const lookbooks = cockpitDataLookbooks.entries.map(
    (el: ICockpitRunwaysAndLookbooksRaw) => {
      return {
        title: locale === defaultLocale ? el.title : el.title_en,
        link: locale === defaultLocale ? el.link : el.link_en,
      };
    }
  );

  const collections = cockpitDataCollections.entries.map(
    (el: ICockpitCollectionsRaw) => {
      return {
        title: locale === defaultLocale ? el.title : el.title_en,
        link: `/collections${el.link}`,
        _id: el._id,
      };
    }
  );

  return {
    ...appProps,
    props: { collections, runways, lookbooks },
  };
};

export default MyApp;
