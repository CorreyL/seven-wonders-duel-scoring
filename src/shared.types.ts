export enum AppPages {
  ExpansionSelection = 0,
  WonderSelection = 1,
  Scoring = 2,
  Results = 3,
}

export enum Player {
  One = 1,
  Two = 2,
}

export type MilitaryScores = 0 | 2 | 5 | 10;

export type GrandTempleScores = 0 | 5 | 12 | 21;

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

export interface DivinityScores {
  [key: string]: number | boolean;
  aphrodite: boolean;
  astarte: number;
}

export interface ProgressScores {
  [key: string]: boolean | number;
  agriculture: boolean;
  mathematics: number;
  philosophy: boolean;
}

export type WonderKeys = 'appianWay'
  | 'circusMaximus'
  | 'colossus'
  | 'greatLibrary'
  | 'greatLighthouse'
  | 'hangingGardens'
  | 'mausoleum'
  | 'piraeus'
  | 'pyramids'
  | 'sphinx'
  | 'statueOfZeus'
  | 'templeOfArtemis'

export interface PlayerScores {
  [Player.One]: Scoring,
  [Player.Two]: Scoring,
}

export interface Scoring {
  civilian: DistinctScores;
  coins: number;
  divinity: DivinityScores;
  commercial: DistinctScores;
  guildBase: GuildBaseScores;
  military: MilitaryScores;
  science: DistinctScores;
  progress: ProgressScores;
  wonders: Set<WonderKeys>;
}

export interface PlayerOwnedWonders {
  [Player.One]: Set<WonderKeys>,
  [Player.Two]: Set<WonderKeys>,
}

export interface WondersContext {
  currentPlayer: Player;
  ownedWonders: Set<WonderKeys>;
  setOwnedWonders: React.Dispatch<React.SetStateAction<PlayerOwnedWonders>>;
}

export interface PlayerScores {
  [Player.One]: Scoring,
  [Player.Two]: Scoring,
}

export interface ScoringContext {
  currentPlayer: Player;
  playerScore: Scoring;
  setPlayerScores: React.Dispatch<React.SetStateAction<PlayerScores>>;
}

export interface ActiveExpansions {
  agora: boolean;
  pantheon: boolean;
}

export interface ExpansionsContext {
  activeExpansions: ActiveExpansions;
  setActiveExpansions: React.Dispatch<React.SetStateAction<ActiveExpansions>>;
}
