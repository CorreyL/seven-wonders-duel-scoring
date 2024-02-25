import { useState } from 'react'
import './App.css'

import {
  DistinctScores,
  Player,
  Scoring,
  ScoringContext,
} from './shared.types';

import {
  PlayerScoringContext,
} from './context/Scoring';

import Coins from './components/Score/Coins/coins';
import Civilian from './components/Score/Civilian';
import Military from './components/Score/Military';
import Science from './components/Score/Science';
import Score from './components/Score/Score';

const ScoringFactory = (): Scoring => ({
  civilian: {
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  },
  coins: 0,
  military: 0,
  science: {
    1: 0,
    2: 0,
    3: 0,
  },
  commercial: {
    3: 0,
  },
});

function App() {
  const [ currentPlayer, setCurrentPlayer ] = useState<Player>(Player.One);
  const [ playerOneScore, setPlayerOneScore ] = useState<Scoring>(ScoringFactory());
  const [ playerTwoScore, setPlayerTwoScore ] = useState<Scoring>(ScoringFactory());

  const changePlayer = (): void => {
    setCurrentPlayer(currentPlayer === Player.One ? Player.Two : Player.One);
  };

  const getCurrentPlayerScore = (): Scoring => {
    return (
      (currentPlayer === Player.One)
        ? playerOneScore
        : playerTwoScore
    );
  };

  const getCurrentPlayerContext = (): ScoringContext => {
    return (
      (currentPlayer === Player.One)
        ? { playerScore: playerOneScore, setPlayerScore: setPlayerOneScore, }
        : { playerScore: playerTwoScore, setPlayerScore: setPlayerTwoScore, }
    )
  };

  const calculateDistinctScoreTotal = (distinctScores: DistinctScores): number => {
    return Object.keys(distinctScores).reduce(
      (partialSum: number, key: string) => (
        (distinctScores[Number(key)] * Number(key)) + partialSum
      ),
      0,
    );
  }

  return (
    <>
      <p>Current Player: {currentPlayer}</p>
      <button onClick={changePlayer}>Change Player</button>
      <PlayerScoringContext.Provider value={getCurrentPlayerContext()}>
        <Score
          title="Civilian"
          score={calculateDistinctScoreTotal(getCurrentPlayerScore().civilian)}
          ScoreComponent={Civilian}
        />
        <Score
          title="Coins"
          score={Math.floor(getCurrentPlayerScore().coins / 3)}
          ScoreComponent={Coins}
        />
        <Score
          title="Military"
          score={getCurrentPlayerScore().military}
          ScoreComponent={Military}
        />
        <Score
          title="Science"
          score={calculateDistinctScoreTotal(getCurrentPlayerScore().science)}
          ScoreComponent={Science}
        />
      </PlayerScoringContext.Provider>
    </>
  );
}

export default App
