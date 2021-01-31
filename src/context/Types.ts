import {
  ICockpitCollections,
  ICockpitRunwaysAndLookbooks,
} from '../cockpitTypes';
import { ICartGoodsItemProps } from '../components/Cart/Types';

//eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IContext {}

export interface IIndexContext {
  collectionsData: ICockpitCollections[];
  lookbooksData: ICockpitRunwaysAndLookbooks[];
  runwaysData: ICockpitRunwaysAndLookbooks[];
}

export interface ICartContext {
  cart: ICartGoodsItemProps[];
  addItem: (item: ICartGoodsItemProps) => void;
  removeItem: (item: ICartGoodsItemProps) => void;
}
