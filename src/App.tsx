import { useState } from 'react'
import './App.css'

import {
  AppPages,
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
  OwnedWonders,
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
  wonders: new Set<WonderKeys>,
});

function App() {
  const [ appPage, setAppPage ] = useState<number>(AppPages.WonderSelection);
  const [ currentPlayer, setCurrentPlayer ] = useState<Player>(Player.One);
  const [ playerScores, setPlayerScores ] = useState<PlayerScores>({
    [Player.One]: ScoringFactory(),
    [Player.Two]: ScoringFactory(),
  });
  const [ playerOwnedWonders, setPlayerOwnedWonders ] = useState<PlayerOwnedWonders>({
    [Player.One]: new Set<WonderKeys>(),
    [Player.Two]: new Set<WonderKeys>(),
  });

  const changePage = (pageIncrement: number): void => {
    setAppPage((prevAppPage) => (prevAppPage + pageIncrement))
  };

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
      <div
        className="page-change"
      >
        <button
          disabled={appPage === AppPages.WonderSelection}
          onClick={() => {changePage(-1)}}
        >
          Previous Page
        </button>
        <button
          disabled={appPage === AppPages.Results}
          onClick={() => {changePage(1)}}
        >
          Next Page
        </button>
      </div>
      <p>Current Player: {currentPlayer}</p>
      <button onClick={changePlayer}>Change Player</button>
      <OwnedWondersContext.Provider value={getCurrentPlayerOwnedWondersContext()}>
        <PlayerScoringContext.Provider value={getCurrentPlayerContext()}>
          {
            appPage === AppPages.WonderSelection
            && <OwnedWonders/>
          }
          {
            appPage === AppPages.Scoring
            && (
              <ScoringPage
                currentPlayer={currentPlayer}
                playerScores={playerScores}
              />
            )
          }
        </PlayerScoringContext.Provider>
      </OwnedWondersContext.Provider>
    </>
  );
}

export default App
