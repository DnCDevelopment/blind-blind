import { createContext } from 'react';

import { ICurrencyContext } from './Types';

export const currencyContext = createContext<ICurrencyContext | null>(null);
