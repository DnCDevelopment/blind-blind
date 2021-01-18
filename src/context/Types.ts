import {
  ICockpitCollections,
  ICockpitRunwaysAndLookbooks,
} from '../cockpitTypes';

//eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IContext {}

export interface IIndexContext {
  collectionsData: ICockpitCollections[];
  lookbooksData: ICockpitRunwaysAndLookbooks[];
  runwaysData: ICockpitRunwaysAndLookbooks[];
}
