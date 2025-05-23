import { useContext, useEffect, useState } from 'react';
import App, { AppContext } from 'next/app';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { AppInitialProps } from 'next/dist/next-server/lib/utils';
import NextNprogress from 'nextjs-progressbar';

import {
  ICartGoodsItemProps,
  ICartVoucherItemProps,
} from '../src/components/Cart/Types';
import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';
import ModalWindowStart from '../src/components/ModalWindowStart/ModalWindowStart';
import ArrowUp from '../src/components/ArrowUp/ArrowUp';

import { cartContext } from '../src/context/cartContext';
import { indexContext } from '../src/context/cockpitContext';
import { currencyContext } from '../src/context/currencyContext';
import {
  ICockpitCollectionsRaw,
  ICockpitGoodsRaw,
  ICockpitRunwaysAndLookbooksRaw,
} from '../src/cockpitTypes';
import { IAppProps } from '../src/pagesTypes';

import { getCockpitCollection } from '../src/utils/getCockpitData';
import { getCurrencyRate } from '../src/utils/getCurrencyRate';

import '../styles/main.scss';
import { ECurrency } from '../src/context/Types';

import '../styles/intlTelInput.css';

const MyApp = ({
  Component,
  pageProps,
  props: { collections, runways, hasStocks },
}: AppProps & IAppProps): JSX.Element => {
  const curCartContext = useContext(cartContext);

  const [cartState, setCartState] = useState(
    curCartContext ? curCartContext.cart : []
  );

  const [USDRate, changeUSDRate] = useState<number>(0);

  const [currency, setCurrency] = useState<ECurrency>(
    ('UAH' as unknown) as ECurrency
  );
  const [currencyRate, setCurrencyRate] = useState(0);

  const addItemToCart = (item: ICartGoodsItemProps | ICartVoucherItemProps) => {
    if (!('receiverName' in item)) {
      const existingItem = cartState.filter(
        (el) =>
          el.id === item.id &&
          !('receiverName' in el) &&
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
    if (!('receiverName' in item))
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
    if (typeof window !== 'undefined') {
      const storageCart = localStorage.getItem('cart');
      if (storageCart) {
        setCartState(JSON.parse(storageCart));
      }
      const storageCurrency = localStorage.getItem('currency');
      if (storageCurrency) {
        setCurrency(JSON.parse(storageCurrency as keyof ECurrency));
      }
    }
  }, []);

  useEffect(() => {
    if (!USDRate) getCurrencyRate('USD').then((res) => changeUSDRate(+res));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartState));
      localStorage.setItem('currency', JSON.stringify(currency));
    }
  }, [cartState, currency]);

  useEffect(() => {
    getCurrencyRate(currency.toString())
      .then((res) => {
        if (currency.toString() === 'RUB') {
          setCurrencyRate(() => 1 / 3);
        } else {
          setCurrencyRate(+res);
        }
      })
      .catch((err) => console.error(err));
  }, [currency]);

  return (
    <indexContext.Provider
      value={{
        collectionsData: collections,
        runwaysData: runways,
        hasStocks,
      }}
    >
      <currencyContext.Provider
        value={{
          currency,
          currencyRate,
          setCurrency,
          USDRate,
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
          <noscript
            dangerouslySetInnerHTML={{
            //   __html: `<iframe
            //   src="https://www.googletagmanager.com/ns.html?id=GTM-5XP658M"
            //   height="0"
            //   width="0"
            //   style="display:none;visibility:hidden"
            // ></iframe>`,
              __html: `<iframe 
              src="https://www.googletagmanager.com/ns.html?id=GTM-PFQSTLP"
              height="0" 
              width="0" 
              style="display:none;visibility:hidden"
              ></iframe>`,
            }}
          ></noscript>
          <Header />
          <ModalWindowStart />
          <NextNprogress
            color="#000"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
          ></NextNprogress>
          <main>
            <Component {...pageProps} />
          </main>
          <ArrowUp />
          <Footer />
        </cartContext.Provider>
      </currencyContext.Provider>
    </indexContext.Provider>
  );
};

MyApp.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps & IAppProps> => {
  const appProps = await App.getInitialProps(appContext);

  const { locale, defaultLocale } = appContext.router;

  const cockpitDataCollections = await getCockpitCollection(
    'Collections',
    'filter[inMenu]=true&sort[_o]=1'
  );
  const cockpitGoods = await getCockpitCollection('Goods');
  const cockpitDataRunways = await getCockpitCollection(
    'Runways',
    'filter[inMenu]=true'
  );

  const stockGoods = cockpitGoods.entries.filter(
    ({ stockPrice }: ICockpitGoodsRaw) => stockPrice
  );

  const runways: ICockpitRunwaysAndLookbooksRaw[] = cockpitDataRunways.entries.map(
    (el: ICockpitRunwaysAndLookbooksRaw) => {
      return {
        title: locale === defaultLocale ? el.title : el.title_en,
        link: '/blind-style' + el.link,
        inMenu: el.inMenu,
      };
    }
  );

  const collections = cockpitDataCollections.entries.map(
    (el: ICockpitCollectionsRaw) => {
      return {
        title: locale === defaultLocale ? el.title : el.title_en,
        link: `/collections${el.link}`,
        inMenu: el.inMenu,
        _id: el._id,
      };
    }
  );

  return {
    ...appProps,
    props: { collections, runways, hasStocks: !!stockGoods.length },
  };
};

export default MyApp;
