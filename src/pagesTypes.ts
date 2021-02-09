import {
  ICockpitCollections,
  ICockpitRunwaysAndLookbooks,
  ICockpitCarousel,
  ICockpitGoods,
  ICockpitCollectionsRaw,
  ICockpitSubCollectionRaw,
  ICockpitPromocode,
} from './cockpitTypes';
import { IGoodsSingleProps } from './components/Goods/Types';

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
}

export interface ICollectionPageProps {
  collection: ICockpitCollectionsRaw | null;
  subCollections: ICockpitSubCollectionRaw[] | null;
}

export interface ISubCollectionPageProps {
  subCollectionProps: {
    id: string;
    title: string;
  } | null;
}

export interface IGoodsPageProps {
  goodsProps: IGoodsSingleProps;
}

export interface ICheckoutPageProps {
  promocodes: ICockpitPromocode[];
}
