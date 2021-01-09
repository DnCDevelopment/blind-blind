import { createContext } from 'react';

import { IContext } from './Types';

const context = createContext<IContext | null>(null);

export default context;
