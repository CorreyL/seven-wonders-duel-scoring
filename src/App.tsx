import { useState } from 'react'
import './App.css'

import {
  Player,
} from './shared.types';

import Coins from './components/Score/Coins/coins';

function App() {
  const [ currentPlayer, setCurrentPlayer ] = useState<Player>(Player.One);

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
