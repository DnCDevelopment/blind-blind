import { createContext } from 'react';

import { ICartContext } from './Types';

export const cartContext = createContext<ICartContext | null>(null);
