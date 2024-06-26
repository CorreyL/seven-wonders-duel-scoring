import {
  useEffect,
  useState,
} from 'react'
import './ScoreApp.css'

import {
  ActiveExpansions,
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
  ActivatedExpansionsContext,
  OwnedWondersContext,
  PlayerScoringContext,
} from './context';

import {
  Expansions,
  OwnedWonders,
  Results,
  Scoring as ScoringPage,
} from './pages';

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
  divinity: {
    aphrodite: false,
    astarte: 0,
    ra: false,
  },
  grandTemple: 0,
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
    mysticism: 0,
    philosophy: false,
  },
  science: {
    1: 0,
    2: 0,
    3: 0,
  },
  wonders: new Set<WonderKeys>,
});

function ScoreApp() {
  const [ appPage, setAppPage ] = useState<AppPages>(AppPages.ExpansionSelection);
  const [ activeExpansions, setActiveExpansions ] = useState<ActiveExpansions>({
    agora: false,
    pantheon: false,
  });
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

  const maxWonders = (activeExpansions.pantheon && playerScores[currentPlayer].divinity.ra) ? 5 : 4;

  useEffect(() => {
    if (
      appPage !== AppPages.ExpansionSelection
      && playerOwnedWonders[currentPlayer].size < maxWonders
    ) {
      /**
       * @todo Add a modal indicating why the page automatically went
       * back to Wonder selection
       */
      setAppPage(AppPages.WonderSelection);
    }
  }, [appPage, currentPlayer, playerOwnedWonders, maxWonders]);

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

  const changePageComponent = (): JSX.Element => (
    <div
      className="page-change"
    >
      <button
        disabled={appPage === AppPages.ExpansionSelection}
        className="disabled:opacity-50"
        onClick={() => {changePage(-1)}}
      >
        Previous Page
      </button>
      <button
        disabled={
          appPage === AppPages.Results
          || (
            // If the player hasn't selected 4 wonders, they cannot progress
            // to the Scoring page
            appPage === AppPages.WonderSelection
            && playerOwnedWonders[currentPlayer].size < maxWonders
          )
        }
        className="disabled:opacity-50"
        onClick={() => {changePage(1)}}
      >
        Next Page
      </button>
    </div>
  );

  return (
    <>
      {changePageComponent()}
      {
        ![AppPages.Results, AppPages.ExpansionSelection].includes(appPage)
        && (
          <div>
            <p>Current Player: {currentPlayer}</p>
            <button onClick={changePlayer}>Change Player</button>
          </div>
        )
      }
      <ActivatedExpansionsContext.Provider value={{activeExpansions, setActiveExpansions}}>
        <OwnedWondersContext.Provider value={getCurrentPlayerOwnedWondersContext()}>
          <PlayerScoringContext.Provider value={getCurrentPlayerContext()}>
            {
              appPage === AppPages.ExpansionSelection
              && <Expansions/>
            }
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
            {
              appPage === AppPages.Results
              && (
                <Results
                  playerScores={playerScores}
                />
              )
            }
          </PlayerScoringContext.Provider>
        </OwnedWondersContext.Provider>
      </ActivatedExpansionsContext.Provider>
      {
        // Even on mobile devices, the results page takes up the whole screen,
        // and users won't need to scroll to the bottom of the results page
        appPage !== AppPages.Results
        && changePageComponent()
      }
    </>
  );
}

export default ScoreApp
