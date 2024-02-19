import { createContext } from 'react';
import { ScoringContext } from '../shared.types';

export const PlayerScoringContext = createContext({} as ScoringContext);
PlayerScoringContext.displayName = 'PlayerScoringContext';
