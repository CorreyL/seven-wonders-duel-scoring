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
  builders: number;
  moneylenders: number;
  magistrates: number;
  merchants: number;
  scientists: number;
  shipowners: number;
  tactician: number;
}

export interface Scoring {
  civilian: DistinctScores;
  coins: number;
  commercial: DistinctScores;
  guildBase: GuildBaseScores;
  military: MilitaryScores;
  science: DistinctScores;
}

export interface ScoringContext {
  playerScore: Scoring;
  setPlayerScore: React.Dispatch<React.SetStateAction<Scoring>>;
}
