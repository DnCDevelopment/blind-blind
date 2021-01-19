import {
  ICockpitCollections,
  ICockpitRunwaysAndLookbooks,
  ICockpitCarousel,
  ICockpitGood,
} from './cockpitTypes';

export interface IIndexPageProps {
  collections: ICockpitCollections[];
  runways: ICockpitRunwaysAndLookbooks[];
  lookbooks: ICockpitRunwaysAndLookbooks[];
  carousel: ICockpitCarousel[];
  goods: ICockpitGood[];
}

export interface ICollectionPageProps {
  collection_id: string | null;
}
