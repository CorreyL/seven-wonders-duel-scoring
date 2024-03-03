import { useState } from 'react'
import './App.css'

import {
  Player,
  PlayerScores,
  PlayerOwnedWonders,
  Scoring,
  ScoringContext,
  WondersContext,
  WonderKeys,
} from './shared.types';

import {
  PlayerScoringContext,
} from './context/Scoring';

import {
  Scoring as ScoringPage,
} from './pages';
import { OwnedWondersContext } from './context/Wonders';

const ScoringFactory = (): Scoring => ({
  civilian: {
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  },
  coins: 0,
  commercial: {
    3: 0,
  },
  guildBase: {
    builders: 0,
    moneylenders: 0,
    magistrates: 0,
    merchants: 0,
    scientists: 0,
    shipowners: 0,
    tactician: 0,
  },
  military: 0,
  progress: {
    agriculture: false,
    mathematics: 0,
    philosophy: false,
  },
  science: {
    1: 0,
    2: 0,
    3: 0,
  },
  wonders: {
    appianWay: { built: false, value: 3 },
    circusMaximus: { built: false, value: 3 },
    colossus: { built: false, value: 3 },
    greatLibrary: { built: false, value: 4 },
    greatLighthouse: { built: false, value: 4 },
    hangingGardens: { built: false, value: 3 },
    mausoleum: { built: false, value: 2 },
    piraeus: { built: false, value: 2 },
    pyramids: { built: false, value: 9 },
    sphinx: { built: false, value: 6 },
    statueOfZeus: { built: false, value: 3 },
    templeOfArtemis: { built: false, value: 0 },
  },
});

function App() {
  const [ currentPlayer, setCurrentPlayer ] = useState<Player>(Player.One);
  const [ playerScores, setPlayerScores ] = useState<PlayerScores>({
    [Player.One]: ScoringFactory(),
    [Player.Two]: ScoringFactory(),
  });
  const [ playerOwnedWonders, setPlayerOwnedWonders ] = useState<PlayerOwnedWonders>({
    [Player.One]: new Set<WonderKeys>(),
    [Player.Two]: new Set<WonderKeys>(),
  });

  const changePlayer = (): void => {
    setCurrentPlayer(currentPlayer === Player.One ? Player.Two : Player.One);
  };

  const getCurrentPlayerContext = (): ScoringContext => {
    return ({
      currentPlayer,
      playerScore: playerScores[currentPlayer],
      setPlayerScores,
    })
  };

  const getCurrentPlayerOwnedWondersContext = (): WondersContext => {
    return ({
      currentPlayer,
      ownedWonders: playerOwnedWonders[currentPlayer],
      setOwnedWonders: setPlayerOwnedWonders,
    });
  };

  return (
    <>
      <p>Current Player: {currentPlayer}</p>
      <button onClick={changePlayer}>Change Player</button>
      <OwnedWondersContext.Provider value={getCurrentPlayerOwnedWondersContext()}>
        <PlayerScoringContext.Provider value={getCurrentPlayerContext()}>
          <ScoringPage
            currentPlayer={currentPlayer}
            playerScores={playerScores}
          />
        </PlayerScoringContext.Provider>
      </OwnedWondersContext.Provider>
    </>
  );
}

export default App
