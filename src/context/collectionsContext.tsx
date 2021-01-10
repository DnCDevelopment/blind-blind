import { createContext } from 'react';

import { ICollectionsContext } from './Types';

const collectionsContext = createContext<ICollectionsContext | null>(null);

export default collectionsContext;
