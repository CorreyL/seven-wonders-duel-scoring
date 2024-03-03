import {
  DistinctScores,
  GuildBaseScores,
  Player,
  PlayerScores,
  ProgressScores,
  WonderKeys,
} from '../../shared.types';

import Coins from '../../components/Score/Coins/coins';
import Civilian from '../../components/Score/Civilian';
import GuildBase from '../../components/Score/GuildBase';
import Military from '../../components/Score/Military';
import Progress from '../../components/Score/Progress';
import Science from '../../components/Score/Science';
import Commercial from '../../components/Score/Commercial';
import Score from '../../components/Score/Score';
import Wonder from '../../components/Score/Wonder';

import './Scoring.css';

interface ScoringProps {
  currentPlayer: Player,
  playerScores: PlayerScores,
}

function Scoring({
  currentPlayer,
  playerScores,
}: ScoringProps) {
  const calculateDistinctScoreTotal = (distinctScores: DistinctScores): number => {
    return Object.keys(distinctScores).reduce(
      (partialSum: number, key: string) => (
        (distinctScores[Number(key)] * Number(key)) + partialSum
      ),
      0,
    );
  };

  const calculateCoinsTotal = (coins: number): number => {
    return Math.floor(coins / 3)
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

  const calculateWonderTotal = (wonders: Set<WonderKeys>): number => {
    const wonderKeyToValueMap = {
      appianWay: 3,
      circusMaximus: 3,
      colossus: 3,
      greatLibrary: 4,
      greatLighthouse: 4,
      hangingGardens: 3,
      mausoleum: 2,
      piraeus: 2,
      pyramids: 9,
      sphinx: 6,
      statueOfZeus: 3,
      templeOfArtemis: 0,
    };
    return (
      Array
        .from(wonders)
        .reduce(
          (prevScore, wonderKey) => (
            prevScore + wonderKeyToValueMap[wonderKey]
          ),
          0,
        )
    );
  };

  const calculateTotalScore = (): number => {
    return (
      calculateDistinctScoreTotal(playerScores[currentPlayer].civilian)
      + calculateCoinsTotal(playerScores[currentPlayer].coins)
      + playerScores[currentPlayer].military
      + calculateDistinctScoreTotal(playerScores[currentPlayer].science)
      + calculateDistinctScoreTotal(playerScores[currentPlayer].commercial)
      + calculateGuildBaseTotal(playerScores[currentPlayer].guildBase)
      + calculateProgressTokensTotal(playerScores[currentPlayer].progress)
      + calculateWonderTotal(playerScores[currentPlayer].wonders)
    );
  };

  return (
    <div
      className="scores"
    >
      {
        /**
         * @todo Render total score at the top of the app, regardless of
         * scroll position
         *
         * In this same bar, add a button to expand or collapse all Score
         * components
         */
      }
      <div>Total Score: {calculateTotalScore()}</div>
      <Score
        title="Civilian"
        score={calculateDistinctScoreTotal(playerScores[currentPlayer].civilian)}
        ScoreComponent={Civilian}
      />
      <Score
        title="Coins"
        score={calculateCoinsTotal(playerScores[currentPlayer].coins)}
        ScoreComponent={Coins}
      />
      <Score
        title="Military"
        score={playerScores[currentPlayer].military}
        ScoreComponent={Military}
      />
      <Score
        title="Science"
        score={calculateDistinctScoreTotal(playerScores[currentPlayer].science)}
        ScoreComponent={Science}
      />
      <Score
        title="Commercial"
        score={calculateDistinctScoreTotal(playerScores[currentPlayer].commercial)}
        ScoreComponent={Commercial}
      />
      <Score
        title="Guild"
        score={calculateGuildBaseTotal(playerScores[currentPlayer].guildBase)}
        ScoreComponent={GuildBase}
      />
      <Score
        title="Progress"
        score={calculateProgressTokensTotal(playerScores[currentPlayer].progress)}
        ScoreComponent={Progress}
      />
      <Score
        title="Wonder"
        score={calculateWonderTotal(playerScores[currentPlayer].wonders)}
        ScoreComponent={Wonder}
      />
      <div>Total Score: {calculateTotalScore()}</div>
    </div>
  );
}

export default Scoring;
