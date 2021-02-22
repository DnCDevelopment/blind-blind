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
} from './cockpitTypes';
import { IGoodsSingleProps } from './components/Goods/Types';

export interface ILocaleProps {
  locale: 'ru' | 'en';
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
  locale: 'ru' | 'en';
}

export interface ICollectionPageProps {
  collection: ICockpitCollectionsRaw | null;
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
  collection: ICockpitCollectionsRaw;
}

export interface IGoodsPageProps {
  collection: {
    link: string;
    title: string;
  };
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
  };
}

export interface IBlindStylePageProps {
  runwayProps: ICockpitRunwaysAndLookbooks;
}

export interface ICelebritiesPageProps {
  celebrities: ICockpitCelebrity[];
}

export interface IContactsPageProps {
  contacts: ICockpitContacts;
  salesPlaces: ICockpitSalesPlace[];
}
