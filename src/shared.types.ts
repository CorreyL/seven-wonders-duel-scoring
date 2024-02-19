export enum Player {
  One = 1,
  Two = 2,
}

export interface Scoring {
  civilian: Array<number>;
  coins: number;
}

export interface ScoringContext {
  playerScore: Scoring;
  setPlayerScore: React.Dispatch<React.SetStateAction<Scoring>>;
}
