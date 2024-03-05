import {
  PlayerScores,
} from '../../shared.types';

import {
  calculateDistinctScoreTotal,
  calculateCoinsTotal,
  calculateGuildBaseTotal,
  calculateProgressTokensTotal,
  calculateWonderTotal,
  calculateTotalScore,
} from '../../utils';

import './results.css';

interface ResultsProps {
  playerScores: PlayerScores;
}

function Results({ playerScores }: ResultsProps) {
  const keyToScoringMethodMapping = {
    civilian: calculateDistinctScoreTotal,
    coins: calculateCoinsTotal,
    commercial: calculateDistinctScoreTotal,
    guildBase: calculateGuildBaseTotal,
    military: (value: number) => (value),
    progress: calculateProgressTokensTotal,
    science: calculateDistinctScoreTotal,
    wonders: calculateWonderTotal,
  };

  return (
    <div>
    </div>
  );
}

export default Results;