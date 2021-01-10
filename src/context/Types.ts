import { ICockpitCollections } from '../cockpitTypes';

export interface IContext {
  language: 'ru' | 'en';
  setLanguage: React.Dispatch<React.SetStateAction<'ru' | 'en'>>;
}

export interface ICollectionsContext {
  collectionsData: ICockpitCollections[];
}
