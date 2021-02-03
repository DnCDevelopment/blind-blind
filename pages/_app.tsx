import App, { AppContext } from 'next/app';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { AppInitialProps } from 'next/dist/next-server/lib/utils';
import { useContext, useEffect, useState } from 'react';

import {
  ICockpitCollectionsRaw,
  ICockpitRunwaysAndLookbooksRaw,
} from '../src/cockpitTypes';
import { ICartGoodsItemProps } from '../src/components/Cart/Types';
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

  const addItemToCart = (item: ICartGoodsItemProps) => {
    const existingItem = cartState.filter(
      (el) =>
        el.id === item.id &&
        JSON.stringify(el.details) === JSON.stringify(item.details)
    );

    if (existingItem.length) {
      const newItem = existingItem[0];
      cartState.forEach((el) => {
        if (
          el.id === newItem.id &&
          JSON.stringify(el.details) === JSON.stringify(newItem.details)
        )
          el.amount += 1;
      });
      setCartState([...cartState]);
    } else {
      setCartState([...cartState, item]);
    }
  };

  const removeItemFromCart = (item: ICartGoodsItemProps) => {
    setCartState([
      ...cartState.filter(
        (el) =>
          !(
            el.id === item.id &&
            JSON.stringify(el.details) === JSON.stringify(item.details)
          )
      ),
    ]);
  };

  useEffect(() => {
    if (window !== undefined) {
      const storageCart = localStorage.getItem('cart');
      console.log('mount');
      if (storageCart) {
        setCartState(JSON.parse(storageCart));
      }
    }
  }, []);

  useEffect(() => {
    if (window !== undefined)
      localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);

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
          addItem: addItemToCart,
          removeItem: removeItemFromCart,
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
