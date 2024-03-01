import { useState } from 'react'
import './App.css'

import {
  DistinctScores,
  GuildBaseScores,
  Player,
  PlayerOwnedWonders,
  ProgressScores,
  Scoring,
  ScoringContext,
  WondersContext,
  WonderKeys,
} from './shared.types';

import {
  PlayerScoringContext,
} from './context/Scoring';

import Coins from './components/Score/Coins/coins';
import Civilian from './components/Score/Civilian';
import GuildBase from './components/Score/GuildBase';
import Military from './components/Score/Military';
import Progress from './components/Score/Progress';
import Science from './components/Score/Science';
import Commercial from './components/Score/Commercial';
import Score from './components/Score/Score';
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
  const [ playerOneScore, setPlayerOneScore ] = useState<Scoring>(ScoringFactory());
  const [ playerTwoScore, setPlayerTwoScore ] = useState<Scoring>(ScoringFactory());
  const [ playerOwnedWonders, setPlayerOwnedWonders ] = useState<PlayerOwnedWonders>({
    [Player.One]: new Set<WonderKeys>(),
    [Player.Two]: new Set<WonderKeys>(),
  });

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

  const getCurrentPlayerOwnedWondersContext = (): WondersContext => {
    return ({
      ownedWonders: playerOwnedWonders[currentPlayer],
      setOwnedWonders: setPlayerOwnedWonders,
    });
  };

  const calculateDistinctScoreTotal = (distinctScores: DistinctScores): number => {
    return Object.keys(distinctScores).reduce(
      (partialSum: number, key: string) => (
        (distinctScores[Number(key)] * Number(key)) + partialSum
      ),
      0,
    );
  };

  const calculateGuildBaseTotal = (guildBaseScores: GuildBaseScores): number => {
    return Object.keys(guildBaseScores).reduce(
      (partialSum: number, key: string) => (
        (guildBaseScores[key]) + partialSum
      ),
      0,
    );
  };

  const calculateProgressTokensTotal = (progress: ProgressScores): number => {
    const {
      agriculture,
      mathematics,
      philosophy,
    } = progress
    return (
      4 * Number(agriculture)
      + 3 * mathematics
      + 7 * Number(philosophy)
    );
  };

  return (
    <>
      <p>Current Player: {currentPlayer}</p>
      <button onClick={changePlayer}>Change Player</button>
      <OwnedWondersContext.Provider value={getCurrentPlayerOwnedWondersContext()}>
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
          <Score
            title="Commercial"
            score={calculateDistinctScoreTotal(getCurrentPlayerScore().commercial)}
            ScoreComponent={Commercial}
          />
          <Score
            title="Guild"
            score={calculateGuildBaseTotal(getCurrentPlayerScore().guildBase)}
            ScoreComponent={GuildBase}
          />
          <Score
            title="Progress"
            score={calculateProgressTokensTotal(getCurrentPlayerScore().progress)}
            ScoreComponent={Progress}
          />
        </PlayerScoringContext.Provider>
      </OwnedWondersContext.Provider>
    </>
  );
}

export default App
