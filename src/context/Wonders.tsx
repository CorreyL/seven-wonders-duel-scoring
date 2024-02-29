import { createContext } from 'react';
import { WondersContext } from '../shared.types';

export const OwnedWondersContext = createContext({} as WondersContext);
OwnedWondersContext.displayName = 'OwnedWondersContext';
