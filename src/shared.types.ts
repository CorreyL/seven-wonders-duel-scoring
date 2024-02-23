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

export interface Scoring {
  civilian: DistinctScores;
  coins: number;
  military: MilitaryScores;
  science: DistinctScores;
}

export interface ScoringContext {
  playerScore: Scoring;
  setPlayerScore: React.Dispatch<React.SetStateAction<Scoring>>;
}
