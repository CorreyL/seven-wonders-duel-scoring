import {
  useContext,
  useEffect,
} from 'react';
import {
  Player,
  PlayerScores,
} from '../../shared.types';

import { ActivatedExpansionsContext } from '../../context';

import {
  calculateDistinctScoreTotal,
  calculateDivinityScores,
  calculateCoinsTotal,
  calculateGuildBaseTotal,
  calculateProgressTokensTotal,
  calculateWonderTotal,
  calculateTotalScore,
} from '../../utils';

import Coins from '../../components/Score/Coins/coins';
import Civilian from '../../components/Score/Civilian';
import Divinity from '../../components/Score/Divinity';
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
  const {
    activeExpansions,
  } = useContext(ActivatedExpansionsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <div
        className="score-bar"
      >
        Total Score: {calculateTotalScore(playerScores, currentPlayer)}
      </div>
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
      {
        !activeExpansions.pantheon
        && (
          <Score
            title="Guild"
            score={calculateGuildBaseTotal(playerScores[currentPlayer].guildBase)}
            ScoreComponent={GuildBase}
          />
        )
      }
      {
        activeExpansions.pantheon
        && (
          <Score
            title="Divinity"
            score={calculateDivinityScores(playerScores[currentPlayer].divinity)}
            ScoreComponent={Divinity}
          />
        )
      }
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
    </div>
  );
}

export default Scoring;
