import {
  ICockpitCollections,
  ICockpitRunwaysAndLookbooks,
  ICockpitCarousel,
  ICockpitGoods,
  ICockpitCollectionsRaw,
  ICockpitSubCollectionRaw,
  ICockpitCelebrity,
  ICockpitContacts,
  ICockpitSalesPlace,
  ICockpitGoodsEntries,
} from './cockpitTypes';
import { IGoodsSingleProps } from './components/Goods/Types';

export interface ILocaleProps {
  locale: 'ru' | 'en';
}

export interface ISalesPageProps extends ILocaleProps {
  goods: ICockpitGoodsEntries;
}

export interface IAppProps {
  props: {
    collections: ICockpitCollections[];
    runways: ICockpitRunwaysAndLookbooks[];
  };
}

export interface IIndexPageProps {
  carousel: ICockpitCarousel[];
  goods: ICockpitGoods[];
  celebrities: ICockpitCelebrity[];
  locale: 'ru' | 'en';
}

export interface ICollectionPageProps {
  collection: ICockpitCollectionsRaw | null;
  goods: ICockpitGoodsEntries;
  subCollections: ICockpitSubCollectionRaw[] | null;
}

export interface ISubCollectionPageProps {
  subCollectionProps: {
    id: string;
    title: string;
    description: string;
    link: string;
    collection: {
      title: string;
      link: string;
    };
  } | null;
  locale: 'ru' | 'en';
  goods: ICockpitGoodsEntries;
}

export interface IGoodsPageProps {
  goodsProps: IGoodsSingleProps;
  locale: 'ru' | 'en';
  subCollection: {
    link: string;
    title: string;
  };
}

export interface IInfomationPageProps {
  pageProps: {
    link: string;
    content: string;
    seoDescription: string;
    title: string;
  };
  locale: 'ru' | 'en';
}

export interface IBlindStylePageProps {
  runwayProps: ICockpitRunwaysAndLookbooks;
  locale: 'ru' | 'en';
}

export interface ICelebritiesPageProps {
  celebrities: ICockpitCelebrity[];
  locale: 'ru' | 'en';
}

export interface IContactsPageProps {
  contacts: ICockpitContacts;
  salesPlaces: ICockpitSalesPlace[];
  locale: 'ru' | 'en';
}
