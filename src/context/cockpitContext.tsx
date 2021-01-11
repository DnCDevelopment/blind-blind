import { createContext } from 'react';

import { IIndexContext } from './Types';

export const indexContext = createContext<IIndexContext | null>(null);
