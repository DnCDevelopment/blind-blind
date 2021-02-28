import { Dispatch, SetStateAction } from 'react';

import {
  ICockpitCollections,
  ICockpitRunwaysAndLookbooks,
} from '../cockpitTypes';
import {
  ICartGoodsItemProps,
  ICartVoucherItemProps,
} from '../components/Cart/Types';

export interface IIndexContext {
  collectionsData: ICockpitCollections[];
  runwaysData: ICockpitRunwaysAndLookbooks[];
}

export interface ICartContext {
  cart: (ICartGoodsItemProps | ICartVoucherItemProps)[];
  addItem: (item: ICartGoodsItemProps | ICartVoucherItemProps) => void;
  removeItem: (item: ICartGoodsItemProps | ICartVoucherItemProps) => void;
  clearCart: () => void;
}

export interface ICurrencyContext {
  currency: 'UAH' | 'RUB' | 'EUR' | 'USD';
  currencyRate: number;
  setCurrency: Dispatch<SetStateAction<'UAH' | 'RUB' | 'EUR' | 'USD'>>;
}
