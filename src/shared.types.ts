export enum Player {
  One = 1,
  Two = 2,
}

interface CivilianScores {
  [key: number]: number;
}

export interface Scoring {
  civilian: CivilianScores;
  coins: number;
}

export interface ScoringContext {
  playerScore: Scoring;
  setPlayerScore: React.Dispatch<React.SetStateAction<Scoring>>;
}
