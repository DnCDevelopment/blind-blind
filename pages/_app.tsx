import App, { AppContext } from 'next/app';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { AppInitialProps } from 'next/dist/next-server/lib/utils';
import { useContext, useEffect, useState } from 'react';

import {
  ICockpitCollectionsRaw,
  ICockpitRunwaysAndLookbooksRaw,
} from '../src/cockpitTypes';
import {
  ICartGoodsItemProps,
  ICartVoucherItemProps,
} from '../src/components/Cart/Types';
import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';
import { cartContext } from '../src/context/cartContext';
import { indexContext } from '../src/context/cockpitContext';

import { IAppProps } from '../src/pagesTypes';

import { getCockpitCollections } from '../src/utils/getCockpitData';

import '../styles/main.scss';

const MyApp = ({
  Component,
  pageProps,
  props: { collections, runways },
}: AppProps & IAppProps): JSX.Element => {
  const curCartContext = useContext(cartContext);
  const [cartState, setCartState] = useState(
    curCartContext ? curCartContext.cart : []
  );

  const addItemToCart = (item: ICartGoodsItemProps | ICartVoucherItemProps) => {
    if ('details' in item) {
      const existingItem = cartState.filter(
        (el) =>
          el.id === item.id &&
          'details' in el &&
          JSON.stringify(el.details) === JSON.stringify(item.details)
      );

      if (existingItem.length) {
        const newItem = existingItem[0] as ICartGoodsItemProps;
        cartState.forEach((el) => {
          if (
            el.id === newItem.id &&
            JSON.stringify((el as ICartGoodsItemProps).details) ===
              JSON.stringify(newItem.details)
          )
            el.amount += 1;
        });
        setCartState([...cartState]);
        return;
      }
    }
    setCartState([...cartState, item]);
  };

  const removeItemFromCart = (
    item: ICartGoodsItemProps | ICartVoucherItemProps
  ) => {
    if ('details' in item)
      setCartState([
        ...cartState.filter(
          (el) =>
            !(
              el.id === item.id &&
              JSON.stringify((el as ICartGoodsItemProps).details) ===
                JSON.stringify(item.details)
            )
        ),
      ]);
    else setCartState([...cartState.filter((el) => el.id !== item.id)]);
  };

  const clearCart = () => setCartState([]);

  useEffect(() => {
    if (window !== undefined) {
      const storageCart = localStorage.getItem('cart');
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
        runwaysData: runways,
      }}
    >
      <cartContext.Provider
        value={{
          cart: cartState,
          addItem: addItemToCart,
          removeItem: removeItemFromCart,
          clearCart: clearCart,
        }}
      >
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </cartContext.Provider>
    </indexContext.Provider>
  );
};

MyApp.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps & IAppProps> => {
  const appProps = await App.getInitialProps(appContext);

  const { locale, defaultLocale } = appContext.router;

  const collectionNames = ['Collections', 'Runways'];
  const [
    cockpitDataCollections,
    cockpitDataRunways,
  ] = await getCockpitCollections(collectionNames);

  const runways = cockpitDataRunways.entries.map(
    (el: ICockpitRunwaysAndLookbooksRaw) => {
      return {
        title: locale === defaultLocale ? el.title : el.title_en,
        link: '/blind-style' + el.link,
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
    props: { collections, runways },
  };
};

export default MyApp;
