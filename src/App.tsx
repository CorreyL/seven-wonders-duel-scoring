import {
  useEffect,
  useRef,
  useState,
} from 'react'
import './App.css'

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
  Scoring as ScoringPage,
} from './pages';
import Results from './pages/Results';

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

function App() {
  const [ appPage, setAppPage ] = useState<number>(AppPages.ExpansionSelection);
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

  const connection = useRef();

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8080")

    // Connection opened
    socket.addEventListener("open", (event) => {
      // @ts-ignore
      connection.current = socket;
      socket.send(JSON.stringify(playerScores));
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data)
    });

    return () => {
      // @ts-ignore
      if (connection.current) {
        connection.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (
      appPage !== AppPages.ExpansionSelection
      && playerOwnedWonders[currentPlayer].size < 4
    ) {
      /**
       * @todo Add a modal indicating why the page automatically went
       * back to Wonder selection
       */
      setAppPage(AppPages.WonderSelection);
    }
  }, [appPage, currentPlayer, playerOwnedWonders]);

  useEffect(() => {
    console.log('broadcast change');
    // @ts-expect-error Test
    console.log(connection.current);
    // @ts-expect-error Test
    if (connection.current) {
      // @ts-expect-error Test
      connection.current.send(JSON.stringify(playerScores));
    }
  }, [playerScores]);

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
            && playerOwnedWonders[currentPlayer].size < 4
          )
        }
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

export default App
