import { ICockpitCarousel } from './cockpitTypes';
import {
  ICockpitCollections,
  ICockpitRunwaysAndLookbooks,
} from './cockpitTypes';

export interface IIndexPageProps {
  collections: ICockpitCollections[];
  runways: ICockpitRunwaysAndLookbooks[];
  lookbooks: ICockpitRunwaysAndLookbooks[];
  carousel: ICockpitCarousel[];
}
