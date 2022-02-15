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
  hasStocks: boolean;
}

export interface ICartContext {
  cart: (ICartGoodsItemProps | ICartVoucherItemProps)[];
  addItem: (item: ICartGoodsItemProps | ICartVoucherItemProps) => void;
  removeItem: (item: ICartGoodsItemProps | ICartVoucherItemProps) => void;
  clearCart: () => void;
}

export enum ECurrency {
  UAH,
  RUB,
  EUR,
  USD,
}

export interface ICurrencyContext {
  currency: ECurrency;
  currencyRate: number;
  setCurrency: Dispatch<SetStateAction<ECurrency>>;
  USDRate: number;
}

export interface ICheckoutContext {
  deliveryType: string;
  deliveryCost: number;
  currencyTotalCheckout: string;
}
