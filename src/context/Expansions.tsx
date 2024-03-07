import { createContext } from 'react';
import { ExpansionsContext } from '../shared.types';

export const ActivatedExpansionsContext = createContext({} as ExpansionsContext);
ActivatedExpansionsContext.displayName = 'ExpansionsContext';

export default ActivatedExpansionsContext;
