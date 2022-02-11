import { createContext } from 'react';

import { ICheckoutContext } from './Types';

export const checkoutContext = createContext<ICheckoutContext | null>(null);
