import { useState } from 'react'
import './App.css'

import {
  Player,
  Scoring,
} from './shared.types';

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

  return (
    <>
      <p>Current Player: {currentPlayer}</p>
      <button onClick={changePlayer}>Change Player</button>
      <Coins/>
    </>
  );
}

export default App
