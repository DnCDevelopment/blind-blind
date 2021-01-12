import {
  ICockpitCollections,
  ICockpitRunwaysAndLookbooks,
} from '../cockpitTypes';

export interface IContext {
  language: 'ru' | 'en';
  setLanguage: React.Dispatch<React.SetStateAction<'ru' | 'en'>>;
}

export interface IIndexContext {
  collectionsData: ICockpitCollections[];
  lookbooksData: ICockpitRunwaysAndLookbooks[];
  runwaysData: ICockpitRunwaysAndLookbooks[];
}
