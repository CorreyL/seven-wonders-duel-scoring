export enum Player {
  One = 1,
  Two = 2,
}

export type MilitaryScores = 0 | 2 | 5 | 10;

/**
 * Interface for Scoring types that only have a limited number of score values
 * that can be added to the total
 */
export interface DistinctScores {
  [key: number]: number;
}

export interface GuildBaseScores {
  [key: string]: number;
  builders: number;
  moneylenders: number;
  magistrates: number;
  merchants: number;
  scientists: number;
  shipowners: number;
  tactician: number;
}

export interface ProgressScores {
  [key: string]: boolean | number;
  agriculture: boolean;
  mathematics: number;
  philosophy: boolean;
}

interface WonderValueAndTracker {
  built: boolean,
  value: number,
}

export interface WonderScores {
  [key: string]: WonderValueAndTracker;
  appianWay: WonderValueAndTracker;
  circusMaximus: WonderValueAndTracker;
  colossus: WonderValueAndTracker;
  greatLibrary: WonderValueAndTracker;
  greatLighthouse: WonderValueAndTracker;
  hangingGardens: WonderValueAndTracker;
  mausoleum: WonderValueAndTracker;
  piraeus: WonderValueAndTracker;
  pyramids: WonderValueAndTracker;
  sphinx: WonderValueAndTracker;
  statueOfZeus: WonderValueAndTracker;
  templeOfArtemis: WonderValueAndTracker;
}

export interface Scoring {
  civilian: DistinctScores;
  coins: number;
  commercial: DistinctScores;
  guildBase: GuildBaseScores;
  military: MilitaryScores;
  science: DistinctScores;
  progress: ProgressScores;
  wonders: WonderScores
}

export interface ScoringContext {
  playerScore: Scoring;
  setPlayerScore: React.Dispatch<React.SetStateAction<Scoring>>;
}
