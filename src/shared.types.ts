export enum Player {
  One = 1,
  Two = 2,
}

export type MilitaryScores = 0 | 2 | 5 | 10;

interface CivilianScores {
  [key: number]: number;
}

export interface Scoring {
  civilian: CivilianScores;
  coins: number;
  military: MilitaryScores;
}

export interface ScoringContext {
  playerScore: Scoring;
  setPlayerScore: React.Dispatch<React.SetStateAction<Scoring>>;
}
