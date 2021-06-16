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

import { cartContext } from '../src/context/cartContext';
import { indexContext } from '../src/context/cockpitContext';
import { currencyContext } from '../src/context/currencyContext';
import { UTM_TAGS } from '../src/constants/utmTags';

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

import ArrowSVG from '../src/assets/svg/arrow.svg';

const MyApp = ({
  Component,
  pageProps,
  props: { collections, runways, hasStocks },
}: AppProps & IAppProps): JSX.Element => {
  const curCartContext = useContext(cartContext);

  const [cartState, setCartState] = useState(
    curCartContext ? curCartContext.cart : []
  );
  const [isArrowVisible, changeArrowVisability] = useState(false);

  const [USDRate, changeUSDRate] = useState<number>(0);

  const [currency, setCurrency] = useState<ECurrency>(
    ('UAH' as unknown) as ECurrency
  );
  const [currencyRate, setCurrencyRate] = useState(0);

  const handleScrollTop = () =>
    typeof window !== 'undefined' &&
    window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      UTM_TAGS.forEach((tag) => {
        const value = urlParams.get(tag);
        if (value) {
          document.cookie = `${tag}=${value}; path=/;`;
        }
      });

      navigator.geolocation.getCurrentPosition((position) => {
        const {
          coords: { latitude, longitude },
        } = position;
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        )
          .then((res) => res.json())
          .then((result) => {
            document.cookie = `user_geo=${result.countryName}, ${result.city}; path=/;`;
          })
          .catch(console.error);
      });
    }

    const scrollHandler = () => {
      typeof window !== 'undefined' &&
        changeArrowVisability(() => window.scrollY > 0);
    };

    typeof window !== 'undefined' &&
      window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => {
      typeof window !== 'undefined' &&
        window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

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
    if (!USDRate) getCurrencyRate('USD').then((res) => changeUSDRate(res));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartState));
      localStorage.setItem('currency', JSON.stringify(currency));
    }
  }, [cartState, currency]);

  useEffect(() => {
    if (currency.toString() === 'RUB') return setCurrencyRate(() => 1 / 3);
    getCurrencyRate(currency.toString())
      .then((res) => setCurrencyRate(res))
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
          <Header />
          <NextNprogress
            color="#000"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
          ></NextNprogress>
          <main>
            <Component {...pageProps} />
          </main>
          <button
            className={`arrow-up ${isArrowVisible ? 'arrow-up-visible' : ''}`}
            onClick={handleScrollTop}
          >
            <ArrowSVG />
          </button>
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
