import {
  ICockpitCollections,
  ICockpitRunwaysAndLookbooks,
  ICockpitCarousel,
  ICockpitGoods,
  ICockpitCollectionsRaw,
  ICockpitSubCollectionRaw,
} from './cockpitTypes';
import { IGoodsSingleProps } from './components/Goods/Types';

export interface ILocaleProps {
  locale: 'ru' | 'en';
}

export interface IAppProps {
  props: {
    collections: ICockpitCollections[];
    runways: ICockpitRunwaysAndLookbooks[];
    lookbooks: ICockpitRunwaysAndLookbooks[];
  };
}

export interface IAppProps {
  props: {
    collections: ICockpitCollections[];
    runways: ICockpitRunwaysAndLookbooks[];
    lookbooks: ICockpitRunwaysAndLookbooks[];
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
