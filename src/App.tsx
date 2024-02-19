import { useState } from 'react'
import './App.css'

import {
  Player,
  Scoring,
  ScoringContext,
} from './shared.types';

import {
  PlayerScoringContext,
} from './context/Scoring';

import Coins from './components/Score/Coins/coins';

const ScoringFactory = (): Scoring => ({
  coins: 0,
});

function App() {
  const [ currentPlayer, setCurrentPlayer ] = useState<Player>(Player.One);
  const [ playerOneScore, setPlayerOneScore ] = useState<Scoring>(ScoringFactory());
  const [ playerTwoScore, setPlayerTwoScore ] = useState<Scoring>(ScoringFactory());

  const changePlayer = (): void => {
    setCurrentPlayer(currentPlayer === Player.One ? Player.Two : Player.One);
  };

  const getCurrentPlayerContext = (): ScoringContext => {
    return (
      (currentPlayer === Player.One)
        ? { playerScore: playerOneScore, setPlayerScore: setPlayerOneScore, }
        : { playerScore: playerTwoScore, setPlayerScore: setPlayerTwoScore, }
    )
  };

  return (
    <>
      <p>Current Player: {currentPlayer}</p>
      <button onClick={changePlayer}>Change Player</button>
      <PlayerScoringContext.Provider value={getCurrentPlayerContext()}>
        <Coins/>
      </PlayerScoringContext.Provider>
    </>
  );
}

export default App
