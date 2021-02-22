import {
  ICockpitCollections,
  ICockpitRunwaysAndLookbooks,
} from '../cockpitTypes';
import {
  ICartGoodsItemProps,
  ICartVoucherItemProps,
} from '../components/Cart/Types';

//eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IContext {}

export interface IIndexContext {
  collectionsData: ICockpitCollections[];
  runwaysData: ICockpitRunwaysAndLookbooks[];
}

export interface ICartContext {
  cart: (ICartGoodsItemProps | ICartVoucherItemProps)[];
  addItem: (item: ICartGoodsItemProps | ICartVoucherItemProps) => void;
  removeItem: (item: ICartGoodsItemProps | ICartVoucherItemProps) => void;
}
